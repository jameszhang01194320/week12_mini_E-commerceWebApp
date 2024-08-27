import { Component } from 'react';
import CustomerList from "./components/CustomerList";
import CustomerForm from './components/CustomerForm';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCustomerId: null
    };
  }

  handleCustomerSelect = (customerId) => {
    this.setState({selectedCustomerId: customerId});
  }

  updateCustomerList = () => {
    // this.customerListRef is equal to the CustomerList component
    // fetchCustomers() exists in CustomerList
    this.customerListRef.fetchCustomers();
  }

  render() {

    const { selectedCustomerId } = this.state;

    return (
      <div className="app-container">
        <h1>Our Customers</h1>

        <CustomerForm customerId={selectedCustomerId}
          onUpdateCustomerList={this.updateCustomerList} />

        {/* this makes a new property called customerListRef which is set to equal
            the CustomerList component */}
        <CustomerList ref={customerListComp => this.customerListRef = customerListComp}
          onCustomerSelect={this.handleCustomerSelect}/>
      </div>
    );
  }
}

export default App;
