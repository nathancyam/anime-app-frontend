/**
 * Created by nathanyam on 17/07/2016.
 */

"use strict";

import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';
import sinon from 'sinon';
import { expect } from 'chai';
import { Link } from 'react-router';
import ListItem, { AnimeStatus } from '../../../app/components/Anime/ListItem';

describe('Anime ListItem Component', () => {
  const anime = Immutable.fromJS({
    _id: '1234',
    title: 'Test Title',
    image_url: '/media/123.jpg'
  });

  function makeComponent(spy = sinon.spy()) {
    return shallow(<ListItem anime={anime} onDeleteAnime={spy} />);
  }

  describe('<ListItem />', () => {
    it('has a link to the anime item', () => {
      const wrapper = makeComponent();
      expect(wrapper.find(Link).props().to).equal('/anime/1234');
    });

    it('should have an image URL', () => {
      const wrapper = makeComponent();
      expect(wrapper.find('img').props().src).equal('/media/123.jpg');
    });

    it('should have a title', () => {
      const wrapper = makeComponent();
      expect(wrapper.find('.title').text()).equal('Test Title');
    });

    it('should called the delete callback', () => {
      const spy = sinon.spy();
      const wrapper = makeComponent(spy);
      wrapper.find('.btn.btn-danger').simulate('click', { preventDefault() {} });
      expect(spy.calledOnce).equal(true);
      expect(spy.calledWith('1234')).equal(true);
    });
  });

  describe('<AnimeStatus />', () => {
    const anime = Immutable.fromJS({
      _id: '1234',
      title: 'Test Title',
      image_url: '/media/123.jpg'
    });

    function makeComponent(anime) {
      return shallow(
        <AnimeStatus
          anime={anime}
          statusProperties={{
            'is_watching': 'fa-eye',
            'is_complete': 'fa-check'
          }}
        />
      );
    }

    it('should show the correct icons', () => {
      const notWatching = anime.set('is_watching', false);
      const watching = anime.set('is_watching', true);
      const notComplete = anime.set('is_complete', false);
      const complete = anime.set('is_complete', true);

      const notWatchingWrapper = makeComponent(notWatching);
      const watchingWrapper = makeComponent(watching);
      const notCompleteWrapper = makeComponent(notComplete);
      const completeWrapper = makeComponent(complete);

      expect(notWatchingWrapper.find('.fa-eye')).to.have.length(0);
      expect(watchingWrapper.find('.fa-eye')).to.have.length(1);
      expect(notCompleteWrapper.find('.fa-check')).to.have.length(0);
      expect(completeWrapper.find('.fa-check')).to.have.length(1);
    });
  });
});
