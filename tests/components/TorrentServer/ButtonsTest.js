/**
 * Created by nathanyam on 20/07/2016.
 */

"use strict";

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AddToAnimeButton, AddToCollectionButton, ResumeButton } from '../../../app/components/TorrentServer/Buttons';
import sinon from 'sinon';
import Immutable from 'immutable';

describe('AddToAnimeButton', () => {
  it('should show nothing text if hasEpisode prop is true', () => {
    const wrapper = shallow(<AddToAnimeButton hasEpisode={true} />);
    expect(wrapper.text()).equal('');
  });

  it('should show the "Pick Anime to Add" text and call the callback when clicked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<AddToAnimeButton hasEpisode={false} onClick={spy} />);
    expect(wrapper.find('button').text()).contains('Pick Anime to Add');
    wrapper.find('button').simulate('click', 'test');
    expect(spy.calledOnce).equal(true);
    expect(spy.calledWith('test')).equal(true);
  });
});

describe('AddToCollectionButton', () => {
  it('should show the "in collection" text if hasEpisode prop is true', () => {
    const wrapper = shallow(<AddToCollectionButton hasEpisode={true} />);
    expect(wrapper.find('button').text()).equal('In Collection');
  });

  it('should show the assign episode text and call the callback when clicked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<AddToCollectionButton hasEpisode={false} onAddEpisodeToCollection={spy} />);
    expect(wrapper.find('button').text()).contains('Auto assign episode');
    expect(wrapper.find('i.fa.fa-plus')).to.have.length(1);
    wrapper.find('button').simulate('click', 'test');
    expect(spy.calledOnce).equal(true);
    expect(spy.calledWith('test')).equal(true);
  });
});

describe('ResumeButton', () => {
  it('should show that the torrent is completed', () => {
    const wrapper = shallow(<ResumeButton torrent={Immutable.fromJS({
      percentDone: 1
    })}/>);
    expect(wrapper.text()).equal('Completed');
  });

  it('should show the right icon based on the torrent status', () => {
    const pauseWrapper = shallow(<ResumeButton torrent={Immutable.fromJS({
      percentDone: 0.5,
      status: 4
    })}/>);

    const startWrapper = shallow(<ResumeButton torrent={Immutable.fromJS({
      percentDone: 0.5,
      status: 3
    })}/>);

    expect(startWrapper.find('button').text()).contain('Resume');
  });

  it('should call the callback on click', () => {
    const spy = sinon.spy();
    const startWrapper = shallow(<ResumeButton torrent={Immutable.fromJS({
      percentDone: 0.5,
      status: 3
    })} onClick={spy}/>);

    startWrapper.find('button').simulate('click', 'test');
    expect(spy.calledOnce).equal(true);
    expect(spy.calledWith('test')).equal(true);
  });
});
