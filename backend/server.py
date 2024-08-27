import mysql.connector
from mysql.connector import Error
from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from flask_cors import CORS
import hashlib

# Flask application setup
app = Flask(__name__)
ma = Marshmallow(app)
CORS(app)

# Define the Customer schema
class CustomerSchema(ma.Schema):
    id = fields.String(required=False)
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    password = fields.String(required=True)  # 添加 password 字段

    class Meta:
        fields = ("id", "name", "email", "phone", "password")


customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

# Database connection parameters
db_name = "ecom"
user = "root"
password = "abc123"
host = "localhost"

def get_db_connection():
    try:
        # Attempting to establish a connection
        conn = mysql.connector.connect(
            database=db_name,
            user=user,
            password=password,
            host=host
        )

        # Check if the connection is successful
        if conn.is_connected():
            print("Connected to MySQL database successfully")
            return conn

    except Error as e:
        # Handling any connection errors
        print(f"Error: {e}")
        return None


@app.route('/')
def home():
    return "Hello, this is the home page!"

#  login route
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            database="ecom",
            user="root",
            password="abc123",
            host="localhost"
        )
        if conn.is_connected():
            return conn
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return None

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # No encryption.
        cursor.execute("SELECT * FROM customers WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        if user:
            return jsonify({"message": "Login successful", "user": user}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()





@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')

    # 对密码进行加密
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # 插入新用户
        query = "INSERT INTO Customers (name, email, phone, password) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, email, phone, password))
        conn.commit()

        return jsonify({"status": "success", "message": "User registered successfully"}), 201

    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()





@app.route('/customers', methods=['GET'])
def get_customers():
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all customers
        query = "SELECT * FROM Customers"

        # Executing the query
        cursor.execute(query)

        # Fetching the results and preparing for JSON response
        customers = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return customers_schema.jsonify(customers)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/customers/<int:id>', methods=['GET'])
def get_customer(id):
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all customers
        customer_to_get = (id, )

        # Check if the customer exists in the database
        cursor.execute("SELECT * FROM Customers WHERE id = %s", customer_to_get)

        # Fetching the results and preparing for JSON response
        customer = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return customers_schema.jsonify(customer)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/customers', methods=['POST'])
def add_customer():
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        customer_data = customer_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # New customer details
        new_customer = (customer_data['name'], customer_data['email'], customer_data['phone'], customer_data['password'])

        # SQL query to add new customer
        query = "INSERT INTO Customers (name, email, phone, password) VALUES (%s, %s, %s, %s)"

        # Executing the query
        cursor.execute(query, new_customer)
        conn.commit()

        # Successful addition of the new customer
        return jsonify({"message": "New customer added successfully"}), 201

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        customer_data = customer_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # Updated customer details
        updated_customer = (customer_data['name'], customer_data['email'], customer_data['phone'], customer_data['password'], id)

        # SQL query to update the customer's details
        query = "UPDATE Customers SET name = %s, email = %s, phone = %s, password = %s WHERE id = %s"

        # Executing the query
        cursor.execute(query, updated_customer)
        conn.commit()

        # Successful update of the new customer
        return jsonify({"message": "Customer details updated successfully"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()
        customer_to_remove = (id, )

        # Check if the customer exists in the database
        cursor.execute("SELECT * FROM Customers WHERE id = %s", customer_to_remove)
        customer = cursor.fetchone()
        if not customer:
            return jsonify({"error": "Customer not found"}), 404

        # If customer exists, proceed to delete
        query = "DELETE FROM Customers WHERE id = %s"
        cursor.execute(query, customer_to_remove)
        conn.commit()

        # Successful delete of customer
        return jsonify({"message": "Customer removed successfully"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    stock_quantity = data.get('stock_quantity')

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # 插入新产品
        query = "INSERT INTO Products (name, description, price, stock_quantity) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, description, price, stock_quantity))
        conn.commit()

        return jsonify({"status": "success", "message": "Product created successfully"}), 201

    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/products', methods=['GET'])
def get_products():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL查询，获取所有产品
        query = "SELECT * FROM Products"
        cursor.execute(query)
        products = cursor.fetchall()

        return jsonify(products), 200

    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL查询，获取指定ID的产品
        cursor.execute("SELECT * FROM Products WHERE id = %s", (id,))
        product = cursor.fetchone()

        if not product:
            return jsonify({"error": "Product not found"}), 404

        return jsonify(product), 200

    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    stock_quantity = data.get('stock_quantity')

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # 更新产品详情
        query = "UPDATE Products SET name = %s, description = %s, price = %s, stock_quantity = %s WHERE id = %s"
        cursor.execute(query, (name, description, price, stock_quantity, id))
        conn.commit()

        return jsonify({"message": "Product updated successfully"}), 200

    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # 检查产品是否存在
        cursor.execute("SELECT * FROM Products WHERE id = %s", (id,))
        product = cursor.fetchone()
        if not product:
            return jsonify({"error": "Product not found"}), 404

        # 删除产品
        query = "DELETE FROM Products WHERE id = %s"
        cursor.execute(query, (id,))
        conn.commit()

        return jsonify({"message": "Product removed successfully"}), 200

    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()



if __name__ == '__main__':
    app.run(debug=True)