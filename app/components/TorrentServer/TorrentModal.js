/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';
import { Modal } from 'react-bootstrap';

export default ({ anime, showModal, hideModal }) => {
  let boolShowModal = false;
  if (showModal === 'show') {
    boolShowModal = true;
  }

  return (
    <Modal show={boolShowModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add To Anime</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-group">
          {
            anime.map(el => {
              return <button type="button" className="list-group-item">{el.get('title')}</button>;
            })
          }
        </div>
      </Modal.Body>
    </Modal>
  );
};

