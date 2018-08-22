import {filterImage} from '../common/filter';

const GET_THEME_SUCCESS = 'GET_THEME_SUCCESS';
//action creator
function getThemeSuccess(data) {
    return {
        type: GET_THEME_SUCCESS,
        theme: data
    }
}

export function getTheme() {
    return function(dispatch, getState) {
        fetch('http://localhost:8086' + '/api/4/themes')
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            json => {
                dispatch(getThemeSuccess(json.others));
            }
        )
    }
}


let initialState = {
    theme: [
        /*{
            id: 0,
            name: '',
            description: '',
            thumbnail: ''
        }*/
    ]
}
//reducer
export function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_THEME_SUCCESS:
            return {
                theme: action.theme
            };
        default:
            return state;
    }
}
