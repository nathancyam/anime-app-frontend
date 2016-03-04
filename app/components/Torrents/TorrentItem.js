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
    return <i className={faClass}></i>;
  }
}


export default class TorrentItem extends React.Component {
  constructor(props) {
    super(props);
    this.onAddTorrent = this.onAddTorrent.bind(this);
  }

  onAddTorrent() {
    Actions.addTorrent(this.props.torrent);
  }

  render() {
    const torrent = this.props.torrent;
    let faClass;

    return (
      <div className="row torrent-item">
        <div className="col-xs-12 col-md-4 name">{torrent.name}</div>
        <div className="col-xs-12 col-md-4 link">{torrent.href}</div>
        <div className="col-xs-12 col-md-4">
          <button className="btn btn-primary"
            onClick={this.onAddTorrent}>
            <TorrentStatus status={torrent.status} />
          </button>
        </div>
      </div>
    );
  }
}

TorrentItem.propTypes = {
  torrent: React.PropTypes.object
};
