import Reflux from 'reflux';
import Immutable from 'immutable';

let socket = io();
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

socket.on('torrent_add_success', (data) => {
  debugger;
  console.log(data);
  Actions.showNotification(data);
});

export default NotificationStore;
