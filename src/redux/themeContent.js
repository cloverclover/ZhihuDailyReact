import {filterImage} from '../common/filter';
import { baseUrl } from './common';

const GET_THEME_CONTENT_SUCCESS = 'GET_THEME_CONTENT_SUCCESS';
const GET_THEME_CONTENT_REQUEST = 'GET_THEME_CONTENT_REQUEST';

function getThemeContentRequest() {
    return {
        type: GET_THEME_CONTENT_REQUEST
    }
}
function getThemeContentSuccess(data) {
    return {
        type: GET_THEME_CONTENT_SUCCESS,
        themeContent: data
    }
}

export function getThemeContent(id) {
    return function(dispatch, getState) {
        dispatch(getThemeContentRequest());
        fetch(baseUrl + '/api/4/theme/' + id)
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            json => {
                dispatch(getThemeContentSuccess(json))
            }
        )
        .catch();
    }
}

let initialState = {
    isLoading: true,
    name: '',
    description: '',
    background: '',
    image_source: '',
    stories: [],
    editors: []
}

export function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_THEME_CONTENT_REQUEST:
            return {
                isLoading: true,
                name: state.name,
                description: state.description,
                background: state.background,
                image_source: state.image_source,
                stories: state.stories,
                editors: state.editors
            }
        case GET_THEME_CONTENT_SUCCESS:
            return {
                isLoading: false,
                name: action.themeContent.name,
                description: action.themeContent.description,
                background: action.themeContent.background,
                image_source: action.themeContent.image_source,
                stories: action.themeContent.stories,
                editors: action.themeContent.editors
            };
        default:
            return state;
    }
}
