import React, { PropTypes } from 'react';

export const NotificationType = PropTypes.oneOf(['error', 'success', 'info', 'warn']);

export const NotificationShape = PropTypes.shape({
  type: NotificationType,
  msg: PropTypes.string,
});
