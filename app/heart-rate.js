import { HeartRateSensor } from 'heart-rate';
import { $$, show, hideAll } from './helpers';

const heartRateSensor = new HeartRateSensor();
const heartRateDisplay = $$('heart-rate-display');
const heartRateLowDisplay = $$('animate-heart-rate-low');
const heartRateMediumDisplay = $$('animate-heart-rate-medium');
const heartRateHighDisplay = $$('animate-heart-rate-high');
const heartRateMaxDisplay = $$('animate-heart-rate-max');
const heartRateDisplays = [heartRateLowDisplay, heartRateMediumDisplay, heartRateHighDisplay, heartRateMaxDisplay];
const maxHeartRate = 150;
const highHeartRate = 120;
const mediumHeartRate = 90;

heartRateSensor.addEventListener('reading', () => {
  const heartRate = heartRateSensor.heartRate;
  
  heartRateDisplay.text = heartRate;

  hideAll(heartRateDisplays);
  
  if (heartRate >= maxHeartRate) {
    show(heartRateMaxDisplay)
  } else if (heartRate >= highHeartRate) {
    show(heartRateHighDisplay)
  } else if (heartRate >= mediumHeartRate) {
    show(heartRateMediumDisplay);
  } else {
    show(heartRateLowDisplay);
  }
});

heartRateSensor.start();
hideAll(heartRateDisplays);