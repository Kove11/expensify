import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) =>{
    // props.dispatch(addExpense(expense)); // old way to do it before using mapDispatchToProps
    this.props.startAddExpense(expense); // mapDispatchToProps basically wraps all function in a dispatch call
    this.props.history.push('/');
  };
  render(){
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
        onSubmit = {this.onSubmit}
        />
      </div>
    );
  }
}



  const mapDispatchToProps =(dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
    });
  
export default connect(undefined, mapDispatchToProps)(AddExpensePage);