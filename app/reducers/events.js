import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import update from 'react-addons-update'; // ES6
import Api from '../lib/api';


export const selected_event = createReducer({},{
  [types.SELECT_EVENT](state,action){
    return action.event
  } 
});

export const events = createReducer(
null,
{
  [types.SET_NEW_EVENTS](state, action) {
    return [action.event,...state.slice(0)]
  },
  [types.FETCH_EVENTS](state,action){
    return action.events
  }
}
);
