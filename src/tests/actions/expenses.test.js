import {startEditExpense, startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense} from '../../actions/expenses';
import {expenses} from '../fixtures/expenses';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);
const uid = '12352asdvxr32';
const defaultAuthState = {auth: {uid}};
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, amount, note, createdAt})=>{
        expensesData[id] = { description, note, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual(
    {
        type: 'REMOVE_EXPENSE', 
        id: '123abc'
    }
    );
});

test ('should setup edit expense action', ()=>{
    const action = editExpense('1234a',
    {
        note: 'def'
    }
    );
    expect(action).toEqual(
        {
            type: 'EDIT_EXPENSE',
            id: '1234a',
            updates: {
                note: 'def'
            }
        }
    )
});

test('should setup add expense action object with provided vals', ()=>{
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});


test('should add expense to database and store', (done)=>{
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: "Mouse",
        amount: 3000,
        note: "This one is better",
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done)=>{
    const store = createMockStore(defaultAuthState);
    const defaultExpenseData = {
        description : '',
        note : '',
        amount : 0,
        createdAt : 0
      };
    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(defaultExpenseData);
        done();
    });
});


test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done)=>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expense from firebase', (done)=>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startRemoveExpense({id: expenses[2].id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[2].id
        });
        return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should edit expense on firebase', (done)=>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {amount: 21045}; 
    store.dispatch(startEditExpense(id, updates)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});