import reducer from '../../../app/modules/AnimeCollection/reducer';
import * as Actions from '../../../app/modules/AnimeCollection/actions';
import { SAVED_ANIME } from '../../../app/modules/AnimeItem/actions';
import Immutable from 'immutable';
import { expect } from 'chai';

describe('Anime Collection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .to.deep.equal(Immutable.fromJS({
        isFetching: false,
        anime: []
    }));
  });

  it('should mark the fetching state', () => {
    const state = reducer(undefined, {
      type: Actions.FETCH_ANIME
    });

    expect(state.get('isFetching')).to.be.true;
  });

  it('should save an anime', () => {
    const state = reducer(Immutable.fromJS({
      isFetching: false,
      anime: [
        {
          _id: 'asdf',
          title: 'Nisekoi',
          isWatching: false
        },
        {
          _id: 'fdsa',
          title: 'Girlish Number',
          isWatching: true
        }
      ]
    }), {
      type: SAVED_ANIME,
      anime: Immutable.fromJS({
        _id: 'fdsa',
        title: 'Girlish Number',
        isWatching: false
      })
    });

    const result = state.get('anime').find(el => el.get('_id') === 'fdsa');
    expect(result.get('isWatching')).to.be.false;
  })
});

