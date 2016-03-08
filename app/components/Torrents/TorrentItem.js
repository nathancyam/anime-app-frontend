import React from 'react';
import { Actions } from '../../stores/TorrentStore';

class TorrentStatus extends React.Component {
  render() {
    let faClass = "fa";

    switch (this.props.status) {
      case 'adding':
        faClass = `${faClass} fa-circle-o-notch fa-spin`;
        break;
      case 'added':
        faClass = `${faClass} fa-check`;
        break;
      case 'error':
        faClass = `${faClass} fa-times`;
        break;
      default:
        faClass = `${faClass} fa-plus`;
        break;
    }
    return <i className={faClass} />;
  }
}


export default class TorrentItem extends React.Component {

  onAddTorrent(event) {
    event.preventDefault();
    this.props.onAddTorrent(this.props.torrent);
  }

  render() {
    const { torrent, onAddTorrent } = this.props;

    return (
      <div className="row torrent-item">
        <div className="col-xs-12 col-md-4 name">{torrent.get('name')}</div>
        <div className="col-xs-12 col-md-4 link">{torrent.get('href')}</div>
        <div className="col-xs-12 col-md-4">
          <button className="btn btn-primary"
            onClick={this.onAddTorrent.bind(this)}>
            <TorrentStatus status={torrent.get('status')} />
          </button>
        </div>
      </div>
    );
  }
}

TorrentItem.propTypes = {
  torrent: React.PropTypes.object
};
