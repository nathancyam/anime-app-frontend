/**
 * Created by nathanyam on 18/07/2016.
 */

"use strict";

import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';
import { expect } from 'chai';
import AnimeNewsNetwork from '../../../app/components/Anime/Ann';

const ann = Immutable.fromJS({
  genres: ['Fantasy', 'MMO'],
  themes: ['Mature'],
  cast: [
    {
      character: 'Momonga',
      seiyuu: 'Satoshi Hino'
    }
  ],
  plot_summary: 'Skeletons'
});

describe('Ann Component', () => {
  describe('<AnimeNewsNetwork />', () => {
    it('should show the loading animation', () => {
      const loading = {
        count() {
          return 0;
        }
      };
      const wrapper = shallow(<AnimeNewsNetwork result={loading} />);
      expect(wrapper.find('.fa-spin')).to.have.length(1);
    });

    it('should show the ANN details', () => {
      const wrapper = shallow(<AnimeNewsNetwork result={ann} />);
      expect(wrapper.find('.genres').text()).to.contain('Fantasy');
      expect(wrapper.find('.genres').text()).to.contain('MMO');
      expect(wrapper.find('.themes').text()).to.contain('Mature');
      expect(wrapper.find('.plot-summary').text()).equal('Skeletons');
      expect(wrapper.find('.cast-table tbody td').at(0).text()).equal('Momonga');
      expect(wrapper.find('.cast-table tbody td').at(1).text()).equal('Satoshi Hino');
    });
  });
});
