import React from 'react';
import selectExpenses from '../selectors/expenses';
import selectExpensestotal from '../selectors/expenses-total';
import {connect} from 'react-redux';
import numeral from 'numeral';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => (

     <h1>Viewing {expenseCount} {expenseCount === 1 ? "expense" : "expenses"} totalling {numeral(expensesTotal/100).format('$0,0.00')}</h1>

);
const mapStateToProps = (state) => { return { expenseCount: selectExpenses(state.expenses,state.filters).length, expensesTotal: selectExpensestotal(selectExpenses(state.expenses,state.filters))  }};

export default connect(mapStateToProps)(ExpensesSummary);