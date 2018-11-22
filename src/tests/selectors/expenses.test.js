import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import {expenses} from '../fixtures/expenses';


const defFilters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

test('should filter by text value', () => {
    const filters = { 
        ...defFilters,
        text: 'e'
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[1]]);
});

test('should filter by StartDate', ()=>{
    const filters = {
        ...defFilters,
        startDate: moment(0)
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2],expenses[0]]);
});

test('should filter by EndDate', ()=>{
    const filters = {
        ...defFilters,
        endDate: moment(0).subtract(1,'days')
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1]]);
});

test ('sort by date', ()=> {
    const filters = {
        ...defFilters,
        sortBy: 'date'
    }
    const result = selectExpenses(expenses,filters);
    expect(result).toEqual([expenses[2],expenses[0],expenses[1]]);
});

test ('sort by amount', ()=> {
    const filters = {
        ...defFilters,
        sortBy: 'amount'
    }
    const result = selectExpenses(expenses,filters);
    expect(result).toEqual([expenses[1],expenses[2],expenses[0]]);
});