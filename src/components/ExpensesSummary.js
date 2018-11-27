import React from 'react';
import selectExpenses from '../selectors/expenses';
import selectExpensestotal from '../selectors/expenses-total';
import {connect} from 'react-redux';
import numeral from 'numeral';
import {Link} from 'react-router-dom';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => (
<div className='page-header'>
     <div className = "content-container">
          <h1 className = "page-header__title">Viewing <span>{expenseCount} </span> {expenseCount === 1 ? "expense" : "expenses"} totalling <span>{numeral(expensesTotal/100).format('$0,0.00')}</span></h1>
          <div className="page-header__actions">
               <Link className="button" to="/create">Add Expense</Link>
          </div>
     </div>
</div>
);
const mapStateToProps = (state) => { return { expenseCount: selectExpenses(state.expenses,state.filters).length, expensesTotal: selectExpensestotal(selectExpenses(state.expenses,state.filters))  }};

export default connect(mapStateToProps)(ExpensesSummary);