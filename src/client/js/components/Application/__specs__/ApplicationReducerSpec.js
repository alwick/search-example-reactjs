import expect from 'expect';
import reducer from '../applicationReducer';
import * as types from '../applicationActions';

describe('Application reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            searching: false,
            results: []
        });
    });

    it('Should handle SEARCHING', () => {
        expect(
            reducer({}, {
                type: types.SEARCHING
            })
        ).toEqual({
            searching: true,
            results: []
        });
    });

    it('Should handle SEARCH_SUCCESS', () => {
        expect(
            reducer({}, {
                type: types.SEARCH_SUCCESS,
                results: ['Text1', 'Text2']
            })
        ).toEqual({
            searching: false,
            results: ['Text1', 'Text2']
        });

        expect(
            reducer({searching: true, results: ['Old Results']}, {
                type: types.SEARCH_SUCCESS,
                results: ['Text1', 'Text2']
            })
        ).toEqual({
            searching: false,
            results: ['Text1', 'Text2']
        });
    });

    it('Should handle SEARCHING_FAIL', () => {
        expect(
            reducer({}, {
                type: types.SEARCHING_FAIL,
                reason: 'Could not perform search',
                error: []
            })
        ).toEqual({
            searching: false,
            results: []
        });

        expect(
            reducer({searching: true, results: ['Old Results']}, {
                type: types.SEARCHING_FAIL,
                reason: 'Could not perform search',
                error: []
            })
        ).toEqual({
            searching: false,
            results: []
        });
    });
});