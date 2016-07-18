/**
 * Created by nathanyam on 18/07/2016.
 */

"use strict";

import React from 'react';
import { shallow } from 'enzyme';
import EpisodeList from '../../../app/components/Anime/Item/EpisodeList';
import Immutable from 'immutable';
import { expect } from 'chai';

describe('Anime Item', () => {
  describe('<EpisodeList />', () => {
    it('should show the episode details', () => {
      const episodes = Immutable.fromJS([
        {
          fileName: '[Test] Example - 01.mkv',
          number: '01'
        },
        {
          fileName: '[Test] Example - 02.mkv',
          number: '02'
        },
        {
          fileName: '[Test] Example - 03.mkv',
          number: '03'
        }
      ]);
      const wrapper = shallow(<EpisodeList episodes={episodes} />);
      expect(wrapper.find('tbody tr')).to.have.length(3);
      expect(wrapper.find('tbody td').at(0).text()).equal('[Test] Example - 01.mkv');
      expect(wrapper.find('tbody td').at(1).text()).equal('01');
      expect(wrapper.find('tbody td').at(2).text()).equal('[Test] Example - 02.mkv');
      expect(wrapper.find('tbody td').at(3).text()).equal('02');
      expect(wrapper.find('tbody td').at(4).text()).equal('[Test] Example - 03.mkv');
      expect(wrapper.find('tbody td').at(5).text()).equal('03');
    });
  });
});
