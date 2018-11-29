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
    it('Should respond to change event and change state of the Login Component', () => {
        const form = component.find('#passwordReg');
        console.log(form.props());

        form.props().onChange({
            target: {
                name: 'password',
                value: 'abcd1234@'
            }
        });
        expect(component.state('password')).toEqual('abcd1234@');
    })
})
// describe email input testing
describe("Email input", ()=>{
    it('shuold respond to change event and change state of the login component',()=>{
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