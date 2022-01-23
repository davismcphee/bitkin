import clock from 'clock';
import { today } from "user-activity";
import { $$, show, hide, hideAll } from './helpers';

const stepsContainer = $$('steps-container');
const caloriesContainer = $$('calories-container');
const distanceContainer = $$('distance-container');
const activeMinutesContainer = $$('active-minutes-container');
const floorsContainer = $$('floors-container');
const allContainers = [stepsContainer, caloriesContainer, distanceContainer, activeMinutesContainer, floorsContainer];

hideAll(allContainers);
show(stepsContainer);

allContainers.forEach(container => {
  container.addEventListener('click', () => {
    hide(container);
    
    const index = allContainers.indexOf(container);
    
    if (index === allContainers.length - 1) {
      show(allContainers[0]);
    } else {
      show(allContainers[index + 1]);
    }
  });
});

const stepsDisplay = $$('steps-display');
const caloriesDisplay = $$('calories-display');
const distanceDisplay = $$('distance-display');
const activeMinutesDisplay = $$('active-minutes-display');
const floorsDisplay = $$('floors-display');

clock.addEventListener('tick', () => {
  const steps = today.adjusted.steps || 0;
  
  stepsDisplay.text = steps.toLocaleString();
  
  const calories = today.adjusted.calories || 0;
  
  caloriesDisplay.text = calories.toLocaleString();
  
  const distance = today.adjusted.distance || 0;
  
  distanceDisplay.text = distance.toLocaleString();
  
  const activeMinutes = today.adjusted.activeZoneMinutes && today.adjusted.activeZoneMinutes.total || 0;
  
  activeMinutesDisplay.text = activeMinutes.toLocaleString();
  
  const floors = today.adjusted.elevationGain || 0;
  
  floorsDisplay.text = floors.toLocaleString();
});