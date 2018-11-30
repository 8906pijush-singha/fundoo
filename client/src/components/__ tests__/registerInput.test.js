import React from 'react';
import '../../setupTests'
// import Login from '../../screen/login';
import { shallow } from 'enzyme';
import RegisterInput from '../register_input';
// import Button from '../../components/login_input'
const component = shallow(<RegisterInput />);



describe('<Login /> Component', () => {
    it('should render without throwing an error', () => {
        expect(true).toBe(true);
    })
    it('renders a email input', () => {
        expect(true).toBe(true);
        expect(component.find('#emailReg').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(true).toBe(true);
        expect(component.find('#passwordReg').length).toEqual(1)
    })

})
// describe password input testing
describe('Password input', () => {
    it('Password should respond to change event and change state of the Login Component', () => {
        const form = component.find('#passwordReg');

        form.props().onChange({
            target: {
                name: 'password',
                value: 'abcd1234@'
            }
        });
        expect(component.state('password')).toEqual('abcd1234@');
    })
})
describe('Confirm Password input', () => {
    it('Confirm password should respond to change event and change state of the Login Component', () => {
        const form = component.find('#passwordConf');

        form.props().onChange({
            target: {
                name: 'confirmPassword',
                value: 'abcd1234@'
            }
        });
        expect(component.state('password')).toEqual('abcd1234@');
    })
})
// describe email input testing
describe("Email input", ()=>{
    it('Email shuold respond to change event and change state of the login component',()=>{
        const form=component.find("#emailReg");
        form.props().onChange({
            target:{
                name:"email",
                value:"abc.123@gmail.com"
            }
        });
        expect(component.state("email")).toEqual("abc.123@gmail.com");
    })
})
describe("First name input", ()=>{
    it('first name shuold respond to change event and change state of the login component',()=>{
        const form=component.find("#firstName");
        form.props().onChange({
            target:{
                name:"firstName",
                value:"pijush"
            }
        });
        expect(component.state("firstName")).toEqual("pijush");
    })
})

describe("Last name input", ()=>{
    it('Last name shuold respond to change event and change state of the login component',()=>{
        const form=component.find("#lastName");
        form.props().onChange({
            target:{
                name:"lastName",
                value:"singha"
            }
        });
        expect(component.state("lastName")).toEqual("singha");
    })
})