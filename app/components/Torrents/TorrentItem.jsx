import React from 'react';
import { Actions } from '../../stores/TorrentStore';

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

    switch (torrent.status) {
      case 'adding':
        faClass = "fa fa-circle-o-notch fa-spin";
        break;
      case 'added':
        faClass = "fa fa-check";
        break;
      case 'error':
        faClass = "fa fa-times";
        break;
      default:
        faClass = "fa fa-plus";
        break;
    }

    return (
      <div className="row torrent-item">
        <div className="col-xs-12 col-md-4 name">{torrent.name}</div>
        <div className="col-xs-12 col-md-4 link">{torrent.href}</div>
        <div className="col-xs-12 col-md-4">
          <button className="btn btn-primary"
            onClick={this.onAddTorrent}>
            <i className={faClass}></i>
          </button>
        </div>
      </div>
    );
  }
}

TorrentItem.propTypes = {
  torrent: React.PropTypes.object
};
