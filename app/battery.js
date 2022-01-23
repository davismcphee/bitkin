import { battery } from "power";
import { $$ } from './helpers';

const batteryDisplay = $$('animate-battery');
const batteryDisplayHeight = 32;

const updateBatteryDisplay = () => {
  const height = Math.ceil(batteryDisplayHeight * (battery.chargeLevel / 100));

  batteryDisplay.height = height;
};

battery.addEventListener('change', e => {
  updateBatteryDisplay();
});

updateBatteryDisplay();