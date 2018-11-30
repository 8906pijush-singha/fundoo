import React from 'react';
import '../../setupTests'
// import Login from '../../screen/login';
import { shallow } from 'enzyme';
import ResetPasswordInput from '../resetPasswordInput';
const component = shallow(<ResetPasswordInput />);



describe('<ResetPasswordInput /> Component', () => {
    it('should render without throwing an error', () => {
        expect(true).toBe(true);
    })
    it('renders a password input', () => {
        expect(true).toBe(true);
        expect(component.find('#password').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(true).toBe(true);
        expect(component.find('#confPassword').length).toEqual(1)
    })

})

// describe password input testing
describe("password input", ()=>{
    it('shuold respond to change event and change state of the login component',()=>{
        const form=component.find("#password");
        form.props().onChange({
            target:{
                name:"password",
                value:"abcd1234@"
            }
        });
        expect(component.state("password")).toEqual("abcd1234@");
    })
})
// describe password input testing
describe("password input", ()=>{
    it('shuold respond to change event and change state of the login component',()=>{
        const form=component.find("#confPassword");
        form.props().onChange({
            target:{
                name:"confirmPassword",
                value:"abcd1234@"
            }
        });
        expect(component.state("confirmPassword")).toEqual("abcd1234@");
    })
})