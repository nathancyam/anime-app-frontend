import Reflux from 'reflux';
import Immutable from 'immutable';

let notifications = new Immutable.List([]);

export var Actions = Reflux.createActions([
  'showNotification',
  'getAllNotifications'
]);

let NotificationStore = Reflux.createStore({
  listenables: [Actions],

  getAllNotifications() {
    this.trigger(notifications);
  },

  onShowNotification(notification) {
    debugger;
  }
});

export default NotificationStore;
