import { combineReducers } from 'redux';
import { reducer as deviceList } from './device-list';

export default combineReducers({
  deviceList,
});
