import React from 'react';
import {shallow} from 'enzyme';
import { AddExpensePage} from '../../components/AddExpensePage';
import { expenses } from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach(()=>{  // lets us reuse these chunks of code before each test is run... setting variables to fresh verisons each time since these 3 are reused in each of these tests
     addExpense = jest.fn();
     history = { push: jest.fn() };
     wrapper = shallow(<AddExpensePage addExpense = {addExpense} history = {history} />);
});

test('should render AddExpensePage correctly', ()=>{
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]); 
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});