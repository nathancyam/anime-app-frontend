import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../../../app/components/Notifications/Alert';
import { expect } from 'chai';

describe('<Alert />', () => {
  it('should show an error message', () => {
    const wrapper = shallow(<Alert type="error" msg="Failed to show content"/>);
    expect(wrapper.find('.alert').hasClass('alert-danger')).to.equal(true);
    expect(wrapper.text()).to.contain("Error! Failed to show content");
  });

  it('should show a success message', () => {
    const wrapper = shallow(<Alert type="success" msg="Successful transaction"/>);
    expect(wrapper.find('.alert').hasClass('alert-success')).to.equal(true);
    expect(wrapper.text()).to.contain("Success! Successful transaction");
  });

  it('should show an info message', () => {
    const wrapper = shallow(<Alert type="info" msg="Info transaction"/>);
    expect(wrapper.find('.alert').hasClass('alert-info')).to.equal(true);
    expect(wrapper.text()).to.contain("Info transaction");
  });

  it('should show a warning message', () => {
    const wrapper = shallow(<Alert type="warn" msg="Warning transaction"/>);
    expect(wrapper.find('.alert').hasClass('alert-warning')).to.equal(true);
    expect(wrapper.text()).to.contain("Warning transaction");
  });
});
