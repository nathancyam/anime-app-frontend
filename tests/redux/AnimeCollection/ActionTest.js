import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import * as Actions from '../../../app/modules/AnimeCollection/actions';
import ServiceLocator from '../../../app/services';

const mockStore = configureMockStore([ thunkMiddleware ]);

describe('AnimeCollectionReducer', () => {
  let store;
  let stub;

  beforeEach(() => {
    stub = sinon.stub(ServiceLocator, 'make');
    store = mockStore(Immutable.fromJS({ anime: [] }));
  });

  afterEach(() => {
    ServiceLocator.make.restore();
  });

  it('creates RECIEVED_ANIME when fetching has been completed', () => {
    const result = Immutable.fromJS([
      {
        _id: 'asdf',
        title: 'Amagi Brilliant Park'
      },
      {
        _id: 'qwerty',
        title: 'Nisekoi'
      }
    ]);

    stub.returns({
      getAnime() {
        return Promise.resolve(result)
      }
    });

    const expectedActions = [
      { type: Actions.RECEIVED_ANIME, anime: result }
    ];

    return store.dispatch(Actions.fetchAnime())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  })
});
