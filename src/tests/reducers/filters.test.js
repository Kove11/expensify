import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter vals', ()=>{
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', ()=>{
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', ()=>{
    const currentState = {
        sortBy: 'amount'
    };
    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter to value', ()=>{
    const currentState = {
        text: "foo"
    };
    const action = {type:'SET_TEXT_FILTER', val: 'bar'};
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('bar');
});

test('should set startDate filter val', ()=>{
    const currentState = {
        startDate: moment(0)
    };
    const action = {type: 'SET_START_DATE', startDate:moment(9000)};
    const state = filtersReducer(currentState,action);
    expect(state.startDate).toEqual(moment(9000));
});

test('should set endDate filter val', ()=>{
    const currentState = {
        endDate: moment(0)
    };
    const action = {type: 'SET_END_DATE', endDate:moment(9000)};
    const state = filtersReducer(currentState,action);
    expect(state.endDate).toEqual(moment(9000));
});