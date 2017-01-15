import React, { PropTypes } from 'react';
import { NotificationType } from './Shapes';

const AlertMapping = {
  error: { heading: 'Error!', alertType: 'danger' },
  success: { heading: 'Success!', alertType: 'success' },
  info: { heading: '', alertType: 'info' },
  warn: { heading: '', alertType: 'warning' },
};

const propTypes = {
  type: NotificationType.isRequired,
  msg: PropTypes.string.isRequired,
};

function Alert({ type, msg }) {
  const { heading, alertType } = AlertMapping[type];

  return (
    <div className={`alert alert-dismissible alert-${alertType}`}>
      <strong>{heading}</strong> {msg}
    </div>
  );
}

Alert.propTypes = propTypes;

export default Alert;
