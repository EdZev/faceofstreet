import onChange from 'on-change';
import {
  renderDistricts,
  renderModal,
  renderPause,
  renderError,
} from './render';

export default (state, fields) => {
  const watchedObject = onChange(state, (path) => {
    switch (path) {
      case 'districts':
        renderDistricts(state, fields);
        break;
      case 'modalImg':
        renderModal(state, fields);
        break;
      case 'animation':
        renderPause(state, fields);
        break;
      case 'error':
        renderError(fields);
        break;
      default:
        throw new Error('No such path of state is defined');
    }
  });
  return watchedObject;
};
