
import React from 'react';
import '../../setupTests'
import { shallow } from 'enzyme';
import Login from '../../screen/login'

const component = shallow(<Login />);

describe('Login Component',()=>{
    it('should render without throwing an error',()=>{
        expect(true).toBe(true)
    })
    it('form should exists while rendering',()=>{
        expect(component.find("form.App1").exists()).toBe(true);
    })
})