import database from '../firebase/firebase';
// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
});

export const startAddExpense = (expenseData = {}) =>{  // we use this to basically return a function to the props which then dispatches the addExpense action with the returned data (or in this case, just the key)
  return (dispatch, getState) => {  // creates an asyncronous action
    const uid = getState().auth.uid;
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
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{
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

// Remove expense from DB
export const startRemoveExpense = ({id} = {}) =>{
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
      dispatch(removeExpense({ id }));
    });
  }
};
// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//EDIT EXPENSE IN DB
export const startEditExpense = (id,updates) =>{
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(()=>{ ///returns a promise that can be chained off of
      dispatch(editExpense(id,updates));
    });
  }
}

//SET_EXPENSES
export const setExpenses = ((expenses)=> ({
  type: 'SET_EXPENSES',
  expenses
})); // dispatched from startSetExpenses

// export const startSetExpenses; // async
export const startSetExpenses = () => {
  return (dispatch, getState)=>{ // returns a function to redux
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot)=>{ /// returns a promise
      const expenses = [];
      snapshot.forEach((child)=>{
        expenses.push({
          id: child.key,
          ...child.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
}
}