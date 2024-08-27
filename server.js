import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json()); // 解析 JSON 请求体

// 配置 MySQL 数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123', 
    database: 'ecom' 
});

// 处理客户注册的 POST 请求
app.post('/customers', (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const sql = "INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, phone, password], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Customer registered successfully" });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
