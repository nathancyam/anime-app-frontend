import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const NotificationType = PropTypes.oneOf(['error', 'success', 'info', 'warn']);

export const NotificationShape = PropTypes.shape({
  type: NotificationType,
  msg: PropTypes.string,
});
