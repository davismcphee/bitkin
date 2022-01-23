import document from 'document';

export const $ = (...args) => args.length > 1 
  ? args[0].getElementsByClassName(...args.slice(1)) 
  : document.getElementsByClassName(...args);

export const $$ = (...args) => args.length > 1
  ? args[0].getElementById(...args.slice(1))
  : document.getElementById(...args);

export const hide = (el) => {
  el.style.display = 'none';
};

export const show = (el) => {
  el.style.display = 'inline';
};

export const hideAll = (els) => {
  els.forEach(hide);
};

export const showAll = (els) => {
  els.forEach(show);
};