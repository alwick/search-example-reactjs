import {combineReducers} from 'redux';
import {SEARCHING,SEARCH_SUCCESS,SEARCHING_FAIL} from './applicationActions';

function results(state = [], action = null) {
    switch(action.type) {
        case SEARCHING:
        case SEARCHING_FAIL:
            return [];
        case SEARCH_SUCCESS:
            return action.results;
        default:
            return state;
    }
}

function searching(state = false, action = null) {
    switch(action.type) {
        case SEARCHING:
            return true;
        case SEARCH_SUCCESS:
        case SEARCHING_FAIL:
            return false;
        default:
            return state;
    }
}

const application = combineReducers({
    results, searching
});
export default application;
