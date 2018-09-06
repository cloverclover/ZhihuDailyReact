import '../common/fetch';
import {filterImage} from '../common/filter';
import { baseUrl } from './common';

const GET_STORY_EXTRA_SUCCESS = 'GET_STORY_EXTRA_SUCCESS';
const GET_LONG_COMMENTS_SUCCESS = 'GET_LONG_COMMENTS_SUCCESS';
const GET_SHORT_COMMENTS_SUCCESS = 'GET_SHORT_COMMENTS_SUCCESS';
//action creator

function getStoryExtraSuccess(data) {
    return {
        type: GET_STORY_EXTRA_SUCCESS,
        storyExtra: data
    }
}
function getLongCommentsSuccess(data) {
    return {
        type: GET_LONG_COMMENTS_SUCCESS,
        longComments: data.comments
    }
}
function getShortCommentsSuccess(data) {
    return {
        type: GET_SHORT_COMMENTS_SUCCESS,
        shortComments: data.comments
    }
}

export function getStoryExtra(id) {
    return function (dispatch, getState) {
        fetch(baseUrl + '/api/4/story-extra/' + id)
        .then(response => response.json())
        .then(
            res => {
                dispatch(getStoryExtraSuccess(res));
            }
        )
        .catch();
    }
}
export function getLongComments(id) {
    return function(dispatch, getState) {
        fetch(baseUrl + '/api/4/story/' + id + '/long-comments')
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            res => {
                dispatch(getLongCommentsSuccess(res))
                dispatch(getShortComments(id));
            }
        )
        .catch();
    }
}
export function getShortComments(id) {
    return function(dispatch, getState) {
        fetch(baseUrl + '/api/4/story/' + id + '/short-comments')
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            res => {
                dispatch(getShortCommentsSuccess(res))
            }
        )
        .catch();
    }
}

let initialState = {
    storyExtra: {
        longComments: 0,
        popularity: 0,
        shortComments: 0,
        comments: 0
    },
    longComments: [],
    shortComments: []
}

//reducer
export function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_STORY_EXTRA_SUCCESS: 
            return {
                storyExtra: {
                    longComments: action.storyExtra.long_comments,
                    popularity: action.storyExtra.popularity,
                    shortComments: action.storyExtra.short_comments,
                    comments: action.storyExtra.comments
                },
                longComments: state.longComments,
                shortComments: state.shortComments
            };
        case GET_LONG_COMMENTS_SUCCESS:
            return {
                storyExtra: state.storyExtra,
                longComments: action.longComments,
                shortComments: state.shortComments
            };
        case GET_SHORT_COMMENTS_SUCCESS:
            return {
                storyExtra: state.storyExtra,
                longComments: state.longComments,
                shortComments: action.shortComments
            }
        default:
            return state;
    }
}