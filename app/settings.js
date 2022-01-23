import { readFileSync, writeFileSync } from 'fs';
import { me } from 'appbit';
import { actions, dispatch, listen } from '../common/messaging';

const SETTINGS_TYPE = 'cbor';
const SETTINGS_FILE = 'settings.cbor';

let localSettings;

try {
  const savedSettings = readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  
  // console.log('LOADING', JSON.stringify(savedSettings, null, 2));
  
  localSettings = savedSettings;
} catch (e) {
  localSettings = {};
}

export const settings = localSettings;

me.addEventListener('unload', () => {
  // console.log('SAVING', JSON.stringify(settings, null, 2));
  
  writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
});

const callbacks = [];

export const onSettingsUpdate = (callback) => {
  callbacks.push(callback);
};

listen(actions.updateSettings, (key, value) => {
  settings[key] = value;
  
  callbacks.forEach(callback => {
    callback();
  });
});

listen(actions.syncSettings, (syncedSettings) => {
  // console.log('SYNCING', JSON.stringify(syncedSettings, null, 2));
  
  Object.keys(syncedSettings).forEach(setting => {
    settings[setting] = syncedSettings[setting];
  })
  
  callbacks.forEach(callback => {
    callback();
  });
});

const trySyncSettings = (delay = 5000, attempts = 5, attempt = 1) => {
  const result = dispatch(actions.requestSyncSettings);
  
  if (!result.success && attempt <= attempts) {
    setTimeout(() => {
      trySyncSettings(delay, attempts, attempt + 1);
    }, delay);
  }
};

trySyncSettings();

export const getSelectListValue = (list) => {
  const valueObj = list && list.values[0];
  
  return valueObj && valueObj.value;
};