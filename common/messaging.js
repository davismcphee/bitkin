import { peerSocket } from 'messaging';

export const actions = {
  updateSettings: 'UPDATE_SETTINGS',
  requestSyncSettings: 'REQUEST_SYNC_SETTINGS',
  syncSettings: 'SYNC_SETTINGS',
};

export const dispatch = (action, ...args) => {
//   console.log(`Dispatching ${action}: ${JSON.stringify(args)}`);
  
  try {
    if (peerSocket.readyState === peerSocket.OPEN) {
      peerSocket.send({ action, args });

      // console.log(`Dispatched ${action}`);

      return {
        success: true,
        error: null,
      }
    } else {
      const error = `No peer socket connection. Unable to dispatch action '${action}'.`;
      
      console.log(error);
      
      return {
        success: false,
        error: new Error(error),
      }
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
};

let listenerId = 0;
const listeners = {};

peerSocket.addEventListener('message', ({ data: { action, args } }) => {
  // console.log(`Received ${action}: ${JSON.stringify(args)}`);
  
  const actionListeners = listeners[action];
  
  if (!actionListeners) {
    return;
  }
  
  Object.keys(actionListeners).forEach(listener => {
    actionListeners[listener](...args);
  });
});

export const listen = (action, listener) => {
  if (!listeners[action]) {
    listeners[action] = {};
  }
  
  const id = ++listenerId;
  
  listeners[action][id] = listener;
  
  return {
    stop() {
      const actionListeners = listeners[action];
      
      delete actionListeners[id];
      
      if (!Object.keys(actionListeners).length) {
        delete listeners[action];
      }
      
      // console.log(`Stopped ${action}`);
    }
  }
};