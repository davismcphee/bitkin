import { settingsStorage } from 'settings';
import { app } from "peer";
import { actions, dispatch, listen } from '../common/messaging';

settingsStorage.addEventListener('change', e => {
  if (e.oldValue !== e.newValue) {
    dispatch(actions.updateSettings, e.key, JSON.parse(e.newValue));
  }
});

const syncSettings = () => {
  const settings = {};
  
  for (let i = 0; i < settingsStorage.length; i++) {
    const key = settingsStorage.key(i);
    
    settings[key] = JSON.parse(settingsStorage.getItem(key));
  }
  
  dispatch(actions.syncSettings, settings);
};

listen(actions.requestSyncSettings, syncSettings);

syncSettings();