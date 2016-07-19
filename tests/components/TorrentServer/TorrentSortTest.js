/**
 * Created by nathanyam on 19/07/2016.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TorrentSort from '../../../app/components/TorrentServer/TorrentSort';
import sinon from 'sinon';

describe('TorrentItem Component <TorrentSort />', () => {

  it('should show the filterable options', () => {
    const wrapper = shallow(
      <TorrentSort
        fields={['percent_done', 'name', 'peers_connected']}
        currentField="percent_done"
        currentOrder="asc"
      />
    );

    expect(wrapper.find('.field-select > option')).to.have.length(3);
    expect(wrapper.find('.field-select').props().value).equal('percent_done');
    expect(wrapper.find('.field-select > option').at(0).text()).equal('Percent Done');
    expect(wrapper.find('.field-select > option').at(1).text()).equal('Name');
    expect(wrapper.find('.field-select > option').at(2).text()).equal('Peers Connected');
  });

  it('should show the ascending/descending order', () => {
    const wrapper = shallow(
      <TorrentSort
        fields={['percent_done', 'name', 'peers_connected']}
        currentField="percent_done"
        currentOrder="asc"
      />
    );

    expect(wrapper.find('.order-select > option')).to.have.length(2);
    expect(wrapper.find('.order-select > option').at(0).text()).equal('Ascending');
    expect(wrapper.find('.order-select > option').at(1).text()).equal('Descending');
  });

  it('should call the on change field callback', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <TorrentSort
        fields={['percent_done', 'name', 'peers_connected']}
        currentField="percent_done"
        currentOrder="asc"
        onChangeField={spy}
      />
    );

    wrapper.find('.field-select').simulate('change', { target: { value: 'name '}});
    expect(spy.calledOnce).equal(true);
  });

  it('should call the on change order callback', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <TorrentSort
        fields={['percent_done', 'name', 'peers_connected']}
        currentField="percent_done"
        currentOrder="asc"
        onChangeOrder={spy}
      />
    );

    wrapper.find('.order-select').simulate('change', { target: { value: 'name '}});
    expect(spy.calledOnce).equal(true);
  });
});
