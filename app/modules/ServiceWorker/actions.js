import AuthService from '../../services/AuthService';

export const SW_REGISTRATION = 'sw/REGISTRATION';
export const SW_SAVE_AUTH_KEYS = 'sw/SAVE_AUTH_KEYS';
export const SW_PUSH_NOTIFICATION_ENABLE = 'sw/PUSH_NOTIFICATION_ENABLE';
export const SW_SAVE_AUTH_KEYS_SUCCESS = 'sw/SAVE_AUTH_KEYS_SUCCESS';
export const SW_SAVE_AUTH_KEYS_FAILED = 'sw/SAVE_AUTH_KEYS_FAILED';
export const SW_SAVE_SUBSCRIPTION_OBJECT = 'sw/SW_SAVE_SUBSCRIPTION_OBJECT';

if (typeof window !== 'undefined') {
  Notification.requestPermission(result => {
    if (result === 'granted') {
    }
  });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function handleWorker(worker, dispatch) {
  const payload = {
    type: 'info',
    msg: {
      text: 'A new version is available',
      actions: [
        {
          name: 'Refresh',
          callback: () => worker.postMessage({ action: 'skip_waiting' })
        }
      ]
    }
  };

  if (worker.state === 'installed') {
    dispatch({ type: 'SW_INSTALLED', payload });
  }

  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      dispatch({ type: 'SW_INSTALLED', payload });
    }
  });
}

export function saveServiceWorkerRegistrationObject(registrationObj) {
  return dispatch => {
    dispatch({
      type: SW_REGISTRATION,
      payload: {
        registrationObj,
      }
    });

    dispatch(bindServiceWorkerEventListeners());
    dispatch(confirmSubscription());
  }
}

export function confirmSubscription() {
  return async (dispatch, getState) => {
    const reg = getState().serviceWorker.registrationObj;
    const subscription = await reg.pushManager.getSubscription();
    if (subscription) {
      dispatch({ type: SW_SAVE_SUBSCRIPTION_OBJECT, payload: { subscription } });
    }
  };
}

export function saveAuthKeys(keys) {
  return async (dispatch, getState) => {
    try {
      (new AuthService()).saveSettings({ settings: { keys }});
      dispatch({ type: SW_SAVE_AUTH_KEYS_SUCCESS });
    } catch (error) {
      dispatch({ type: SW_SAVE_AUTH_KEYS_FAILED });
    }
  };
}

export function enableWebPushNotifications() {
  return (dispatch, getState) => {
    const reg = getState().serviceWorker.registrationObj;
    const applicationServerPublicKey = getState().serviceWorker.applicationServerPublicKey;

    reg.pushManager.getSubscription()
      .then(subscription => {
        if (!subscription) {
          const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey,
          })
            .then(subscription => {
              const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
              const key = rawKey ?
                btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
                '';
              const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
              const authSecret = rawAuthSecret ?
                btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) :
                '';

              const endpoint = subscription.endpoint;
              dispatch({ type: SW_SAVE_SUBSCRIPTION_OBJECT, payload: { subscription } });
              dispatch(saveAuthKeys({ key, authSecret, endpoint }));
            });
        }
      });
  };
}

export function bindServiceWorkerEventListeners() {
  return (dispatch, getState) => {
    const reg = getState().serviceWorker.registrationObj;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      debugger;
      window.location.reload();
    });

    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      return handleWorker(reg.waiting, dispatch);
    }

    if (reg.installing) {
      return handleWorker(reg.installing, dispatch);
    }

    reg.addEventListener('updatefound', () => handleWorker(reg.installing, dispatch));
  };
}
