import React from 'react';
import '../../setupTests'
// import Login from '../../screen/login';
import { shallow } from 'enzyme';
import ForgotInput from '../forgotInput';
const component = shallow(<ForgotInput />);



describe('<Login /> Component', () => {
    it('should render without throwing an error', () => {
        expect(true).toBe(true);
    })
    it('renders a email input', () => {
        expect(true).toBe(true);
        expect(component.find('#emailfogt').length).toEqual(1)
    })

})

// describe email input testing
describe("Email input", ()=>{
    it('shuold respond to change event and change state of the login component',()=>{
        const form=component.find("#emailfogt");
        form.props().onChange({
            target:{
                name:"email",
                value:"abc.123@gmail.com"
            }
        });
        expect(component.state("email")).toEqual("abc.123@gmail.com");
    })
})