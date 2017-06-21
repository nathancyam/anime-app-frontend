import { SW_REGISTRATION, SW_PUSH_NOTIFICATION, SW_SAVE_AUTH_KEYS, SW_SAVE_SUBSCRIPTION_OBJECT } from './actions';
const applicationServerPublicKey = 'BMPIBWMqfOs_EPcFRwAUJg4V0kRqOnHW5LnznlUvH_O9A0kpg0nJJEzMYoeLDaS0USznOEnuIP_1lrvgF3SuPYw';

export default function (state = { applicationServerPublicKey, registrationObj: null, keys: {} }, action) {
  switch (action.type) {
    case SW_REGISTRATION: {
      const { registrationObj } = action.payload;
      return {
        ...state,
        registrationObj,
      }
    }

    case SW_SAVE_AUTH_KEYS: {
      const { keys } = action.payload;
      return {
        ...state,
        keys,
      };
    }

    case SW_SAVE_SUBSCRIPTION_OBJECT: {
      return {
        ...state,
        subscription: action.payload.subscription
      };
    }

    default:
      return state;
  }
}
