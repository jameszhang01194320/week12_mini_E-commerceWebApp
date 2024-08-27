(Amended) Mini Project: ReactE-commerceWebApplication
________________________________________

________________________________________
Project Requirements
This project will require your newly acquired frontend skills as well as the API you created for Backend Core. Please copy your API file and include it in this project folder so it is included in your Github repo. Remember your Flask API runs on http://127.0.0.1:5000, this is the url you will be making your API requests to + the endpoint you are trying to access. If you do not already have Flask CORS installed to set up in your API you will need this package to make it accessible by your react app. 

To successfully build our e-commerce application and achieve the learning objectives, we need to establish clear project requirements. These requirements outline the key features and functionalities that our application must encompass. Below, you'll find a comprehensive list of project requirements based on our learning objectives:
1.	 Welcome Page: Create a styled page the users are met with when they arrive at your website (You could even display your products here if you like).
2.	Routing and Navigation: The website should have a Nav-Bar so users can navigate between (Sign-Up, Login, Create Products, Show Products pages) 
Implement routing using React Router to create routes for different sections and pages of the application.
Define route paths and components to be rendered when specific URLs are accessed.
Use navigation links or buttons to allow users to navigate between different parts of the application.
3.	Customer  Management: Create React components and functionality for managing Customers:
Create Customer Form (Sign Up): Develop a form component to capture and submit essential customer information, including name, email, and phone number and use this information to make an API call to create a user in your backend.
Read Customer Details (Login): Create a component to display customer details retrieved from the backend based on their unique identifier (ID). Reminder you don't have a login endpoint from your backend core API, you can either build one to connect to or use your GET customers endpoint that relies on knowing the customers ID. When logged in you can have a display message appear saying "Welcome <user's name>!" Or some indication that the user has logged in successfully.
4.	Product Catalog: Create React components and functionality for managing Products:
List Products: Create a component to display a list of all available products in the e-commerce platform, providing essential product information.
Create Product Form: Develop a form component for adding a new product to the e-commerce database. Capture essential product details, such as the product name and price.
5.	Component Creation and Organization:
Create either functional or class components to build the user interface of the e-commerce application.
Organize components into a logical folder structure for better code organization and maintainability.
Use React hooks such as useState, useEffect, and useContext as appropriate to manage component state and side effects.
6.	Forms and Form Handling:
Develop forms using React components to capture user inputs for creating, updating, or interacting with customer data, product data, and orders.
Implement form validation to ensure that user inputs meet specified criteria, such as required fields, proper formatting, and validation messages.
Utilize React state and hooks to manage form data and user input changes.
Implement form submission handlers to send data to the backend API that you created in Backend Core for processing.
7.	Event Handling:
Set up event handlers to respond to user interactions and events within the application.
Implement event listeners for actions like button clicks, form submissions, and user interactions with UI elements where necessary.
Use event handling to trigger actions like submitting forms.
8.	Integration with React-Bootstrap:
Incorporate React-Bootstrap components and utilities to enhance the user interface of the application where you see fit.
Use React-Bootstrap components such as buttons, forms, modals, alerts, and navigation elements to improve the visual design and functionality.
Apply Bootstrap styles and CSS classes to achieve a visually appealing and responsive layout
9.	Error Handling:
Implement error handling mechanisms to gracefully handle errors that may occur during data retrieval, form submission, or API interactions.
Display informative error messages to users when errors occur, helping them understand the nature of the issue and how to resolve it.
Use try-catch blocks or error-handling functions to capture and manage exceptions and errors.


