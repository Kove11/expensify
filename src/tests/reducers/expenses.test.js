import expensesReducer from '../../reducers/expenses';
import {expenses, testExpense} from '../fixtures/expenses';


test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by ID', ()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([
        expenses[0], expenses[2]
    ]);
});

test('should not remove any expense if ID not found', ()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});

test('should add expense', ()=>{
    const action = {
        type: 'ADD_EXPENSE',
        expense:testExpense
    };
    expect(expensesReducer(expenses,action)).toEqual([...expenses, testExpense]);
});

test('should successfully edit an expense', ()=>{
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description: "Updated description", 
            amount: '999'
        }
    };
    const state = expensesReducer(expenses,action);
    expect(state[0]).toEqual({...expenses[0], ...action.updates}); 
});

test('should not edit expense if id not found', ()=>{
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: "Updated description", 
            amount: '999'
        }
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});

test('should set expenses', ()=>{
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[1]]);
});