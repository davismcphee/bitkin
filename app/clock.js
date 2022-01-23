import clock from 'clock';
import { preferences } from 'user-settings';
import { zeroPad } from '../common/utils';
import { $$ } from './helpers';
import { settings, onSettingsUpdate, getSelectListValue } from './settings';

const timeDisplay = $$('time-display');
const dateDisplay = $$('date-display');
let lastTickDate = new Date();

clock.granularity = 'seconds';

export const updateClockDisplay = () => {
  let hours = lastTickDate.getHours();
  
  if (preferences.clockDisplay === '12h') {
    hours = hours % 12 || 12;
  } else {
    hours = zeroPad(hours);
  }
  
  const mins = zeroPad(lastTickDate.getMinutes());
  const seconds = zeroPad(lastTickDate.getSeconds());
  
  timeDisplay.text = getSelectListValue(settings.showSeconds)
    ? `${hours}:${mins}:${seconds}`
    : `${hours}:${mins}`;
  
  const month = zeroPad(lastTickDate.getMonth() + 1);
  const date = zeroPad(lastTickDate.getDate());
  
  dateDisplay.text = `${month}/${date}`;
};

// export const updateClockSettings = () => {
//   clock.granularity = getSelectListValue(settings.showSeconds) ? 'seconds' : 'minutes';
// };

clock.addEventListener('tick', ({ date }) => {
  lastTickDate = date;
  
  updateClockDisplay();
});

// updateClockSettings();
updateClockDisplay();

onSettingsUpdate(() => {
  // updateClockSettings();
  updateClockDisplay();
});