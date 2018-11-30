
import React from 'react';
import '../../setupTests'
import { shallow } from 'enzyme';
import ResetPassword from '../../screen/resetPassword';

const component = shallow(<ResetPassword />);

describe('ResetPassword Component',()=>{
    it('should render without throwing an error',()=>{
        expect(true).toBe(true)
    })
    it('form should exists while rendering',()=>{
        expect(component.find(".App2").exists()).toBe(true);
    })
})