const expensesReducerDefState = [];

export default (state = expensesReducerDefState, action) => {  ///create a reducer that sets the default state if run for first time, or updates the state based on actions
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
        case 'SET_EXPENSES':
            return action.expenses
        
        default:
            return state;
    }
};

