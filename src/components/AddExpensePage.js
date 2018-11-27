import React from 'react';
import {
  connect
}

  from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {
  startAddExpense
}

  from '../actions/expenses';
export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    // props.dispatch(addExpense(expense)); // old way to do it before using mapDispatchToProps
    this.props.startAddExpense(expense); // mapDispatchToProps basically wraps all function in a dispatch call
    this.props.history.push('/');
  }
    ;
  render() {
    return (<div> <div className="page-header"> <div className="content-container"> <h1 className="page-header__title">Add Expense</h1> </div> </div> <div className="content-container"> <ExpenseForm onSubmit={
      this.onSubmit
    }
    /> </div> </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
}

);
export default connect(undefined, mapDispatchToProps)(AddExpensePage);