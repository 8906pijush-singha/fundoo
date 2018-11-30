
import React from 'react';
import '../../setupTests'
import { shallow } from 'enzyme';
import Forgot from '../../screen/forgotPassword';

const component = shallow(<Forgot />);

describe('Login Component',()=>{
    it('should render without throwing an error',()=>{
        expect(true).toBe(true)
    })
    it('form should exists while rendering',()=>{
        expect(component.find("form.App2").exists()).toBe(true);
    })
})