import { $, $$, hide, show, hideAll, showAll } from './helpers';
import { settings, onSettingsUpdate, getSelectListValue } from './settings';

const background = $$('background');
const bodies = $('body');
const mouths = $('mouth');
const hats = $('hat');
const hatPrimaryParts = $('hat-primary');
const hatSecondaryParts = $('hat-secondary');
const glasses = $('glasses');

const updateUiFromSettings = () => {
  background.style.fill = settings.colorBackground || '#4D86FF';

  bodies.forEach(body => {
    body.style.fill = settings.colorBitkin || '#FFCC33';
  });
  
  hideAll(mouths);
  
  const mouthSelection = getSelectListValue(settings.mouthSelection) || 'mouth-cat';
  
  showAll($(mouthSelection));

  hideAll(hats);
  
  const hatSelection =  getSelectListValue(settings.hatSelection) || 'none';
  
  if (hatSelection !== 'none') {
    showAll($(hatSelection));
  }
  
  hatPrimaryParts.forEach(part => {
    part.style.fill = settings.hatPrimaryColor || 'black';
  });
  
  hatSecondaryParts.forEach(part => {
    part.style.fill = settings.hatSecondaryColor || 'lightgray';
  });
  
  hideAll(glasses);
  
  const glassesSelection = getSelectListValue(settings.glassesSelection) || 'none';
  
  if (glassesSelection !== 'none') {
    showAll($(glassesSelection));
  }
};

updateUiFromSettings();

onSettingsUpdate(() => {
  updateUiFromSettings();
});