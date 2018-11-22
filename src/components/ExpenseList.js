import React from 'react';
import ExpenseListItem from './ExpenseListItem';
import {connect} from 'react-redux';
import selectExpenses from '../selectors/expenses';

/// <ExpenseListItem {...item} />   spread operator passes all of the items from an object to the child
export const ExpenseList = (props) => (
    <div>
        <h1>Expense List:</h1>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) 
            : (
                props.expenses.map((item) => (
                    <ExpenseListItem key = {item.id} {...item} />))
            )
        }
        
    </div>
);

const mapStateToProps = (state)=>{ return { expenses: selectExpenses(state.expenses,state.filters)}}; //basically returns state into props

/// This is one of those wrapper components... two arguments, one to add state to props and one with component... returns a component that is conencted to redux with potentially a subset of the state
export default connect(mapStateToProps)(ExpenseList);

