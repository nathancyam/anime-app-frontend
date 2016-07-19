/**
 * Created by nathanyam on 19/07/2016.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TorrentModal from '../../../app/components/TorrentServer/TorrentModal';
import sinon from 'sinon';
import { Modal } from 'react-bootstrap';
import Immutable from 'immutable';

describe('Torrent Modal <TorrentModal />', () => {
  it('should show the title', () => {
    const wrapper = shallow(
      <TorrentModal
        anime={Immutable.fromJS([
          {
            _id: 1234,
            title: 'Nisekoi'
          },
          {
            _id: 1235,
            title: 'Bakemonogatari'
          },
        ])}
        modal={
          Immutable.fromJS({
            state: true,
            data: {
              name: 'TestTitle'
            }
          })
        }
      />
    );

    expect(wrapper.find(Modal.Title)).to.have.length(1);
    expect(wrapper.find(Modal.Title).html()).contains('Add TestTitle to Anime');
  });

  it('should the list of anime to add', () => {
    const wrapper = shallow(
      <TorrentModal
        anime={Immutable.fromJS([
          {
            _id: 1234,
            title: 'Nisekoi'
          },
          {
            _id: 1235,
            title: 'Bakemonogatari'
          },
        ])}
        modal={
          Immutable.fromJS({
            state: true,
            data: {
              name: 'TestTitle'
            }
          })
        }
      />
    );

    expect(wrapper.find('.list-group > button')).to.have.length(2);
    expect(wrapper.find('.list-group > button').at(0).text()).equal('Nisekoi');
    expect(wrapper.find('.list-group > button').at(1).text()).equal('Bakemonogatari');
  });

  it('should call the assign to anime callback and the hide callback after selection', () => {
    const spy = sinon.spy();
    const hideModelSpy = sinon.spy();
    const modal = Immutable.fromJS({
      state: true,
      data: {
        name: 'TestTitle'
      }
    });
    const wrapper = shallow(
      <TorrentModal
        anime={Immutable.fromJS([
          {
            _id: 1234,
            title: 'Nisekoi'
          },
          {
            _id: 1235,
            title: 'Bakemonogatari'
          },
        ])}
        modal={modal}
        onAssignToAnime={spy}
        onHideModal={hideModelSpy}
      />
    );

    wrapper.find('button').at(0).simulate('click', { preventDefault() {} });
    expect(spy.calledOnce).equal(true);
    expect(hideModelSpy.calledOnce).equal(true);
    expect(spy.calledWith(modal.get('data'), 1234)).equal(true);
  });
});
