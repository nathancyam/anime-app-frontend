/**
 * Created by nathanyam on 20/07/2016.
 */

"use strict";

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TorrentFilter from '../../../app/components/TorrentServer/TorrentFilters';
import sinon from 'sinon';

describe('TorrentFilter <TorrentFilter />', () => {
  it('should call the callback when the input field changes', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<TorrentFilter filterNameValue="test" onFilterByName={spy} />);
    expect(wrapper.find('input').props().value).equal('test');
    wrapper.find('input').simulate('change', 'test');
    expect(spy.calledOnce).equal(true);
    expect(spy.calledWith('test')).equal(true);
  });
});
