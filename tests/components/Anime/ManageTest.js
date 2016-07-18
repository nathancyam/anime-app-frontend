/**
 * Created by nathanyam on 18/07/2016.
 */

"use strict";
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Manage from '../../../app/components/Anime/Item/Manage';
import sinon from 'sinon';
import Immutable from 'immutable';

const defaultAnime = Immutable.fromJS({
  _id: 1234,
  is_watching: true,
  is_complete: true,
  designated_subgroup: 'TestSub'
});

describe('Anime Item', () => {
  describe('<Manage />', () => {
    it('should show the watching font-awesome button', () => {
      const wrapper = mount(<Manage anime={defaultAnime} />);
      expect(wrapper.find('.fa.fa-eye')).to.have.length(1);
      expect(wrapper.find('.fa.fa-eye-slash')).to.have.length(0);
    });

    it('should not show the watching font-awesome button', () => {
      const anime = defaultAnime.set('is_watching', false);
      const wrapper = mount(<Manage anime={anime} />);
      expect(wrapper.find('.fa.fa-eye')).to.have.length(0);
      expect(wrapper.find('.fa.fa-eye-slash')).to.have.length(1);
    });

    it('should show the complete font-awesome button', () => {
      const wrapper = mount(<Manage anime={defaultAnime} />);
      expect(wrapper.find('.fa.fa-check')).to.have.length(1);
      expect(wrapper.find('.fa.fa-times')).to.have.length(0);
    });

    it('should show the complete font-awesome button', () => {
      const anime = defaultAnime.set('is_complete', false);
      const wrapper = mount(<Manage anime={anime} />);
      expect(wrapper.find('.fa.fa-check')).to.have.length(0);
      expect(wrapper.find('.fa.fa-times')).to.have.length(1);
    });

    it('should have the subgroup as the default value', () => {
      const wrapper = shallow(<Manage anime={defaultAnime} />);
      expect(wrapper.find('input').props().defaultValue).equal('TestSub');
    });

    it('should fire the subgroup click callback', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Manage
          anime={defaultAnime}
          onAnimePropertyChange={spy}
        />
      );

      wrapper.find('.subgroup-btn').simulate('click');
      expect(spy.calledWith(1234, 'designated_subgroup', 'TestSub'));
    });

    it('should fire the watching click callback', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Manage
          anime={defaultAnime}
          onAnimePropertyChange={spy}
        />
      );

      wrapper.find('.fa-eye').simulate('click');
      expect(spy.calledWith(1234, 'is_watching', false));
    });

    it('should fire the complete click callback', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Manage
          anime={defaultAnime}
          onAnimePropertyChange={spy}
        />
      );

      wrapper.find('.fa-check').simulate('click');
      expect(spy.calledWith(1234, 'is_complete', false));
    });
  });
});
