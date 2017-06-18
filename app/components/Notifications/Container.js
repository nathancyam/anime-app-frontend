import React, { PropTypes } from 'react';
import Alert from './Alert';
import './styles.scss';

const NotificationShape = PropTypes.shape({
  type: PropTypes.oneOf(['error', 'success', 'info', 'warn']),
  msg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
});

const propTypes = {
  notifications: PropTypes.arrayOf(NotificationShape)
};

function Container({ notifications }) {
  return (
    <div className="notifications">
      <ul>
        {notifications.map((notification, index) => (
          <li key={`notify_${index}`} >
            <Alert {...notification} />
          </li>
        ))}
      </ul>
    </div>
  );
}

Container.propTypes = propTypes;

export default Container;
