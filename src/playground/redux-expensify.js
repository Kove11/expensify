import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';


//ADD EXPENSE
const addExpense = (
    {description = '', note = '',amount = 0, createdAt = 0 } = {} ) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }

});

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({  /// these generator functions generate an action to send to the reducer to act apon the state
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
//SET_TEXT_FILTER

const setTextFilter = (val = '') => ({
    type: 'SET_TEXT_FILTER',
    val
});
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
// Expenses Reducer

const expensesReducerDefState = [];
const expensesReducer = (state = expensesReducerDefState, action) => {  ///create a reducer that sets the default state if run for first time, or updates the state based on actions
    switch (action.type){
        case 'ADD_EXPENSE':
            return [...state,action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates /// this will add all the properties from expense and then those from action.updates, overriding with the action.updates where there are duplicates
                    }
                }
                else{
                    return expense;
                }
            });
        
        default:
            return state;
    }
};

// Filters Reducer

const filtersReducerDefState = {
    text: "",
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text: action.val}
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'}
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'}
        case 'SET_START_DATE':
            return {...state, startDate: action.startDate}
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate}
        default: 
            return state;
    }
};


// Get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=>{ // filter returns values in array that match the following conditions
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; // first part returns true if not a number ( so ignore the start date filter if not defined)
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = (expense.description.toLowerCase()).includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if (sortBy === 'date'){
            return a.createAt < b.createAt ? 1: -1;
        }
        else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1: -1;
        }
    });
}

//Store Creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});




const expenseOne = store.dispatch(addExpense({
    description: 'Rent',
    amount: 100,
    createdAt: -1000
}));
const expenseTwo = store.dispatch(addExpense({
    description: 'Coffee',
    amount: 300,
    createdAt: 1000
}));
const expenseThree = store.dispatch(addExpense({
    description: 'Turnips',
    amount: 1,
    createdAt: 9000
}));

// store.dispatch(removeExpense({id:expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1000));
// store.dispatch(setTextFilter('cof'));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());



// const demoState = {
//     expenses: [{
//         id: 'ytsadSADcz',
//         description: 'January Rent',
//         note: 'This was the final payment for that address',
//         amount: 54500,
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'date', //date or amount
//         startDate: undefined,
//         endDate: undefined
//     }
// };