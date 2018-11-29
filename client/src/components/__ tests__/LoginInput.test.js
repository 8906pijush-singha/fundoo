import React from 'react';
import '../../setupTests'
// import Login from '../../screen/login';
import { shallow } from 'enzyme';
import LoginInput from '../login_input';
// import Button from '../../components/login_input'
const component = shallow(<LoginInput />);



describe('<Login /> Component', () => {
    it('should render without throwing an error', () => {
        expect(true).toBe(true);
    })
    it('renders a email input', () => {
        expect(true).toBe(true);
        expect(component.find('#email').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(true).toBe(true);
        expect(component.find('#password').length).toEqual(1)
    })

})
// describe password input testing
describe('Password input', () => {
    it('Should respond to change event and change state of the Login Component', () => {
        const form = component.find('#password');
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
        const form=component.find("#email");
        form.props().onChange({
            target:{
                name:"email",
                value:"abc.123@gmail.com"
            }
        });
        expect(component.state("email")).toEqual("abc.123@gmail.com");
    })
})

// describe("validate function", ()=>{
//     it('validate function should work',()=>{
//         const form=component.find("#btnLogin");
//         console.log(form.props())
//     })
// })

// describe('Test Button component', () => {
//     it('Test click event', () => {
//     //   const mockCallBack = jest.fn();
//     //   const btn=component.find("#btnLogin");
//     //   const button = shallow((<btn onClick={mockCallBack}>Ok!</btn>));
//     const btn=component.find("#btnLogin")
//     btn.props().onClick({
//         target:{
//             name:"email",
//             value:"abc.123@gmail.com"
//         }
//     });
//         btn.simulate('click');
//       expect(mockCallBack.mock.calls.length).toEqual(1);
//     });
//   });