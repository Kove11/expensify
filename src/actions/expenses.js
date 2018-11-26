import database from '../firebase/firebase';
// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
});


export const startAddExpense = (expenseData = {}) =>{  // we use this to basically return a function to the props which then dispatches the addExpense action with the returned data (or in this case, just the key)
  return (dispatch) => {  // creates an asyncronous action
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {
      description,
      note,
      amount,
      createdAt
    };
    return database.ref('expenses').push(expense).then((ref)=>{
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    })
  };
};
// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});