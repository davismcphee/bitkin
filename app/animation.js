import { $, $$, hide, show, hideAll } from './helpers';

const stateDefault = $$('state-default');
const nonDefaultStates = $('state');
const swapStateTimeout = 1000;

hideAll(nonDefaultStates);

const swapState = (state) => {
  hide(stateDefault);
  show(state); 
  state.animate('load');
  
  setTimeout(() => {
    show(stateDefault)
    hide(state);
    stateDefault.animate('load');
  }, swapStateTimeout);
}

let stateIndex = 0;

$(stateDefault, 'body')[0].addEventListener('click', () => {
  if (stateIndex >= nonDefaultStates.length) {
    stateIndex = 0;
  }
  
  swapState(nonDefaultStates[stateIndex]);
  stateIndex++;
});