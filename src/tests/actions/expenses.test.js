import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

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
    const expenseData = {
        description: "Rent",
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('should setup addExense action object with default vals',()=>{
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            description: "",
            note: "",
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});