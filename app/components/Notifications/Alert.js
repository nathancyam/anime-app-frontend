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
  msg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])
};

function RichAlert({ type, msg }) {
  const { heading, alertType } = AlertMapping[type];

  return (
    <div className={`alert alert-dismissible alert-${alertType}`}>
      <strong>{heading}</strong>
      <div>
        <span className="msg-text">{msg.text}</span>
        {msg.actions.map((action, index) => (
          <button
            key={`notification_action_${index}`}
            className="btn btn-default"
            onClick={action.callback}>
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Alert({ type, msg }) {
  const { heading, alertType } = AlertMapping[type];

  return (
    <div className={`alert alert-dismissible alert-${alertType}`}>
      <strong>{heading}</strong> {msg}
    </div>
  );
}

Alert.propTypes = propTypes;

function renderAlertMessage(props) {
  if (typeof props.msg === 'string') {
    return Alert(props);
  }

  return RichAlert(props);
}


export default renderAlertMessage;
