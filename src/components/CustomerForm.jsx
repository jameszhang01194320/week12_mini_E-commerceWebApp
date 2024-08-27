/* eslint-disable react/prop-types */

import { Component } from "react";
import axios from 'axios';

class CustomerForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            errors: {},
            selectedCustomerId: null
        }
    }

    componentDidUpdate(prevProps){
        // if we selected a different customer
        if(prevProps.customerId !== this.props.customerId) {
            this.setState({selectedCustomerId: this.props.customerId})

            if(this.props.customerId){
                axios.get(`http://127.0.0.1:5000/customers/${this.props.customerId}`)
                    .then(response => {
                        // this is wrong in the coding exercise, it doesn't use data[0]
                        const customerData = response.data[0];

                        // this changes the values of the input boxes to the customer's
                        // data from the database
                        this.setState({
                            name: customerData.name,
                            email: customerData.email,
                            phone: customerData.phone
                        })
                    })
                    .catch(error => {
                        console.error("Error fetching customer's data:", error);
                    })

            } else {
                this.setState({
                    name: "",
                    email: "",
                    phone: ""
                })
            }
        }
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value});
    }

    validateForm = () => {
        const {name, email, phone} = this.state;
        const errors = {};

        if (!name) errors.name = "Name is required";
        if (!email) errors.email = "Email is required";
        if (!phone) errors.phone = "Phone is required";

        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();

        if(Object.keys(errors).length === 0) {

            //pulling the data from state which was gathered from the form
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            }

            const apiUrl = this.state.selectedCustomerId
                ? `http://127.0.0.1:5000/customers/${this.state.selectedCustomerId}`
                : `http://127.0.0.1:5000/customers`;

            const httpMethod = this.state.selectedCustomerId ? axios.put : axios.post;

            httpMethod(apiUrl, customerData)
                .then(()=>{
                    // this is where we run updateCustomerList in App
                    // which then calls fetchCustomers() from CustomerList
                    this.props.onUpdateCustomerList();

                    this.setState({
                        name: "",
                        email: "",
                        phone: "",
                        errors: {},
                        selectedCustomerId: null
                    })
                })
                .catch(error => {
                    console.error("Error submitting form", error);
                })
        } else {
            // if key and variable are the same you don't have to put it twice
            this.setState({ errors });
        }
    }

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Edit Customer</h3>
                <label>
                    Name:<br/>
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                </label>
                <br />
                <label>
                    Email:<br/>
                    <input type="email" name="email" value={email} onChange={this.handleChange} />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </label>
                <br />
                <label>
                    Phone:<br/>
                    <input type="tel" name="phone" value={phone} onChange={this.handleChange} />
                    {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default CustomerForm;