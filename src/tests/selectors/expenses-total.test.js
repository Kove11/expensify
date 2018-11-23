import selectExpensestotal from '../../selectors/expenses-total';
import {expenses} from '../fixtures/expenses';

test('should sum up multiple expenses', ()=>{
    expect(selectExpensestotal(expenses)).toBe(114195);
});

test('should sum up a single expenses', ()=>{
    expect(selectExpensestotal([expenses[2]])).toBe(4500);
});

test('should sum up an empty expense array', ()=>{
    expect(selectExpensestotal([])).toBe(0);
});


