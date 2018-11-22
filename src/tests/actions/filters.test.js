import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../../actions/filters';
import moment from 'moment';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should generate setTextFilter action object with passed value',()=>{
    const action = setTextFilter('abc');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        val: 'abc'
    });
});

test('should generate setText filter action object with no arguments',()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        val: ""
    });
});

test('should generate sortByAmount action object',()=>{
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

describe("sortByDate", () => {  /// This one will show the function if error in the jest error log
    test("should generate action object for sort by date", () => {
      expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" });
    });
  });