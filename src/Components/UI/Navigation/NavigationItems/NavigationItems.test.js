import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter:new Adapter()});
    let wrapper;
beforeEach(()=>{
    wrapper= shallow(<NavigationItems/>);
})
describe('<NavigationItems/>',()=>{
    it('should render two elements if the user is not authenticated',()=>{
    
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three elements if the user is authenticated',()=>{
       wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});