/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

const propTypes = {
  anime: PropTypes.object.required,
  modal: PropTypes.object,
  onHideModal: PropTypes.func,
  onAssignToAnime: PropTypes.func
};

function TorrentModel ({ anime, modal, onHideModal, onAssignToAnime }) {
  const _onAssignToAnime = (animeId) => {
    return event => {
      event.preventDefault();
      onAssignToAnime(modal.get('data'), animeId);
      onHideModal();
    };
  };
  
  let isShown = modal.has('state')
    ? modal.get('state')
    : 'hide';

  isShown = isShown !== 'hide';

  const torrentTitle = modal.has('data')
    ? modal.getIn(['data', 'name'])
    : '';

  return (
    <Modal show={isShown} onHide={onHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add {torrentTitle} to Anime</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-group">
          {
            anime.map(el => {
              return (
                <button
                  key={`anime_${el.get('_id')}`}
                  type="button"
                  className="list-group-item"
                  onClick={_onAssignToAnime(el.get('_id'))}
                >
                  {el.get('title')}
                </button>
              );
            })
          }
        </div>
      </Modal.Body>
    </Modal>
  );
};

TorrentModel.propTypes = propTypes;

export default TorrentModel;
