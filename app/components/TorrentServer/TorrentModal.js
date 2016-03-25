/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';
import { Modal } from 'react-bootstrap';

export default ({ anime, modal, onHideModal, onAssignToAnime }) => {
  const _onAssignToAnime = (event) => {
    event.preventDefault();
    onAssignToAnime(modal.get('data'), anime.get('_id'));
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
                  type="button"
                  className="list-group-item"
                  onClick={_onAssignToAnime}
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

