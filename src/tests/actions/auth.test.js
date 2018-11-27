import {login,logout} from '../../actions/auth';


test('should generate login action object' , ()=>{
    const action = login('abcd231');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'abcd231'
    });
});

test('should generate login logout action object' , ()=>{
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});