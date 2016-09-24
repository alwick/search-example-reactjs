import superagent from 'superagent';

export const SEARCHING = "application.SEARCHING";
export const SEARCH_SUCCESS = "application.SEARCHING_SUCCESS";
export const SEARCHING_FAIL = "application.SEARCHING_FAIL";

export function onSearch( criteria ) {
    return (dispatch) => {
        dispatch(searching());

        return superagent.get('api/search').query({criteria: criteria}).end((err, res) => {
            if(!err) {
                dispatch(searchSuccess(res.body));
            }
            else {
                dispatch(searchFailed('Could not perform search', res));
            }
        });
    };
}

function searching() {
    return {
        type: SEARCHING
    };
}

function searchSuccess(body) {
    return {
        type: SEARCH_SUCCESS,
        results: body
    };
}

function searchFailed(reason, result) {
    return {
        type: SEARCHING_FAIL,
        reason: reason,
        error: result
    };
}