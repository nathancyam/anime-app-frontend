import React from 'react';
import NotificationStore, { Actions } from '../../stores/NotificationStore';

export default class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.onNotificationUpdate = this.onNotificationUpdate.bind(this);
    this.state = { notifications: [] };
  }

  componentDidMount() {
    this.unsubscribe = NotificationStore.listen(this.onNotificationUpdate.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onNotificationUpdate(notifications) {
    this.setState({ notifications });
  }

  render() {
    return (
      <div id="notifications">
      </div>
    );
  }
}