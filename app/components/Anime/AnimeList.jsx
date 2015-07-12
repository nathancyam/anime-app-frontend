import React from 'react';
import AnimeItem from './AnimeItem';
import AnimeStore, { Actions } from '../../stores/AnimeStore';

export default class AnimeList extends React.Component {

  constructor(props) {
    super(props);
    this.onAnimeListChange = this.onAnimeListChange.bind(this);
    this.state = {list: []};
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeListChange.bind(this));
    Actions.getAll();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onAnimeListChange(list) {
    this.setState({ list });
  }

  onFilterByName(event) {
    if (event.target.value === '') {
      Actions.reset();
    } else {
      Actions.filterByName(event.target.value);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row anime-filters">
            <div className="col-xs-12">
              <form>
                <div className="form-group">
                  <input className="form-control" type="text"
                    placeholder="Filter By Name"
                    onChange={this.onFilterByName} />
                </div>
              </form>
            </div>
          </div>
          <div className="row anime-row">
          {
            this.state.list.map((el, index) => {
              return <AnimeItem
                anime={el}
                mediaRoot="http://anime.itsme.dio" />
            })
          }
          </div>
        </div>
      </div>
    );
  }
}
