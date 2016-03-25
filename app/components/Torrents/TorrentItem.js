import React, { Component, PropTypes } from 'react';

const TorrentStatus = ({ status }) => {
  let faClass = "fa";

  switch (status) {
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
};

TorrentStatus.PropTypes = {
  status: PropTypes.string
};

const TorrentInfo = ({ torrent, label, value }) => {
  if (!value) {
    value = label.toLowerCase();
  }
  return <p>{label}: {torrent.get(value)}</p>;
};

const TorrentStats = ({ torrent }) => {
  return (
    <div className="row">
      <div className="col-xs-6 col-sm-3">
        <TorrentInfo torrent={torrent} label="Leeches" />
      </div>
      <div className="col-xs-6 col-sm-3">
        <TorrentInfo torrent={torrent} label="Seeds" />
      </div>
      <div className="col-xs-6 col-sm-3">
        <TorrentInfo torrent={torrent} label="File Size" value="readableSize" />
      </div>
      <div className="col-xs-6 col-sm-3">
        <TorrentInfo torrent={torrent} label="Downloads" />
      </div>
    </div>
  );
};

export default class TorrentItem extends Component {

  /**
   * @param {Event} event
   */
  onAddTorrent(event) {
    event.preventDefault();
    this.props.onAddTorrent(this.props.torrent);
  }

  render() {
    const { torrent } = this.props;

    return (
      <div className="row torrent-item">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <h4>{torrent.get('name')}</h4>
              <small>{torrent.get('href')}</small>
            </div>
          </div>
          <TorrentStats torrent={torrent} />
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <button className="btn btn-primary"
                      onClick={this.onAddTorrent.bind(this)}>
                <TorrentStatus status={torrent.get('status')} />
              </button>
              <button className="btn btn-primary">
                <i className="fa fa-plus" /> Add To Anime
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TorrentItem.propTypes = {
  torrent: PropTypes.object,
  onAddTorrent: PropTypes.func
};
