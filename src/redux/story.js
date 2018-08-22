import {filterImage} from '../common/filter';

const GET_STORY_REQUEST = 'GET_STORY_REQUEST';
const GET_STORY_SUCCESS = 'GET_STORY_SUCCESS';
const GET_STORY_FAIL = 'GET_STORY_FAIL';
const GET_HOT_STORY_SUCCESS = 'GET_HOT_STORY_SUCCESS';

//action creator
function getStoryRequest() {
    return {
        type: GET_STORY_REQUEST
    }
}
function getStorySuccess(data) {
    return {
        type: GET_STORY_SUCCESS,
        date: data.date,
        stories: data.stories
    }
}
function getStoryFail(error) {
    return {
        type: GET_STORY_FAIL,
        error: error
    }
}
export function getStory() {
    const baseUrl = 'http://localhost:8086';
    return function (dispatch, getState) {
        let date = getState().dataConfig.date;
        dispatch(getStoryRequest());
        fetch(baseUrl + '/api/4/news/before/' + date)
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            json => {
                dispatch(getStorySuccess(json))
            }
        ).catch(
            () => {
                dispatch(getStoryFail())
            }
        )
    }
}
function getHotStorySuccess(data) {
    return {
        type: GET_HOT_STORY_SUCCESS,
        hotStories: data.recent
    }
}
export function getHotStory() {

    return function(dispatch, getState) {
        fetch('http://localhost:8086' + '/api/3/news/hot')
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            json => {
                dispatch(getHotStorySuccess(json))
            }
        )
        .catch();
    }
}



let initialState = {
    date: '',
    stories: [
        /*{
            title: '深夜食堂 · 我的张曼妮',
            images: [
                'http://p4.zhimg.com/7b/c8/7bc8ef5947b069513c51e4b9521b5c82.jpg'
            ],
            id: 1747159
        }*/
    ],
    hotStories: [
        /*
        {
            title: '',
            thumbnail: '',
            url: '',
            news_id: 0
        }
        */
    ]
}
//reducer
export function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_STORY_REQUEST:
            return state;
        case GET_STORY_SUCCESS:
            return {
                date: action.date,
                stories: action.stories,
                hotStories: state.hotStories
            };
        case GET_STORY_FAIL:
            return state;
        case GET_HOT_STORY_SUCCESS:
            return {
                date: state.date,
                stories: state.stories,
                hotStories: action.hotStories
            }
        default:
            return state;
    }
}