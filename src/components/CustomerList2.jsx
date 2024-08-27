/* eslint-disable react/prop-types */

import { Component } from "react";
import axios from 'axios';

class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers:[],
            selectedCustomerId: null
        };
    }

    // this is ran after the component mounts (loaded)
    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        axios.get("http://127.0.0.1:5000/customers")
            .then(response => {
                console.log(response);
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    selectCustomer = (customerId) => {
        // updates selectedCustomerId state in CustomerList and App

        this.setState({ selectedCustomerId: customerId});

        // run onCustomerSelect from App component
        this.props.onCustomerSelect(customerId);
    }

    deleteCustomer = (customerId) => {
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(()=> {
                this.fetchCustomers();
            })
            .catch(error => {
                console.error("Error deleting customer", error);
            });
    }

    render() {

        const {customers} = this.state;

        return (
            <div className="customer-list">
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id} onClick={() => this.selectCustomer(customer.id)}>
                            <b>{customer.name}</b><br/>
                            {customer.email}<br/>
                            {customer.phone}<br/>
                            <button onClick={() => this.deleteCustomer(customer.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default CustomerList;