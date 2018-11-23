import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';


test('should render expense summary with 1 item', ()=>{
    const wrapper = shallow(<ExpensesSummary expensesTotal={9434} expenseCount={1}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense summary with 2 items', ()=>{
    const wrapper = shallow(<ExpensesSummary  expenseCount={2} expensesTotal={9434}/>);
    expect(wrapper).toMatchSnapshot();
});