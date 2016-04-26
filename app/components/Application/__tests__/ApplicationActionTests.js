import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../applicationActions';
import superagent from 'superagent';
import expect from 'expect'; // You can use any testing library

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Application Actions', () => {
    it('Creates SEARCH_SUCCESS when fetching query has been done successfully', () => {
        expect
            .spyOn(superagent, 'get')
            .andCall( function(resp) {
                return {
                    query: function(cb) {
                        return {
                            end: function(cb) {
                                return cb(null,{ body: ['do something'] });
                            }
                        }
                    }
                }
            })

        const expectedActions = [
            { type: actions.SEARCHING },
            { type: actions.SEARCH_SUCCESS, results: ['do something']  }
        ];
        const store = mockStore({ results: [], isSearching: null });

        store.dispatch(actions.onSearch("foo"));
        expect(store.getActions()).toEqual(expectedActions);
    });
    
    it('Creates SEARCHING_FAIL when fetching query has failed', () => {
        expect
            .spyOn(superagent, 'get')
            .andCall( function(resp) {
                return {
                    query: function(cb) {
                        return {
                            end: function(cb) {
                                return cb("Error Reason",{ body: [] });
                            }
                        }
                    }
                }
            })

        const expectedActions = [
            { type: actions.SEARCHING },
            { type: actions.SEARCHING_FAIL, reason: 'Could not perform search', error: { body: [] }  }
        ];
        const store = mockStore({ results: [], isSearching: null });

        store.dispatch(actions.onSearch("foo"));
        expect(store.getActions()).toEqual(expectedActions);
    });
});