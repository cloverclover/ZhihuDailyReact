import '../common/fetch';
import {filterImage, filterTag, filterDefaultCss} from '../common/filter';

import {getStoryExtra} from './comment';
import { baseUrl } from './common';

const GET_STORY_CONTENT_REQUEST = 'GET_STORY_CONTENT_REQUEST';
const GET_STORY_CONTENT_SUCCESS = 'GET_STORY_CONTENT_SUCCESS';
const GET_CSS_SUCCESS = 'GET_CSS_SUCCESS';

//action creator
function getStoryContentRequest() {
    return {
        type: GET_STORY_CONTENT_REQUEST
    }
}
function getStoryContentSuccess(data) {
    return {
        type: GET_STORY_CONTENT_SUCCESS,
        story: data
    }
}
function getCssSuccess(data) {
    return {
        type: GET_CSS_SUCCESS,
        css: data
    }
}

export function getStoryContent(id) {
    return function(dispatch, getState) {
        dispatch(getStoryContentRequest());
        fetch(baseUrl + '/api/4/news/' + id)
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            json => {
                dispatch(getStoryContentSuccess(json));
                dispatch(getCss(json.css[0]));
                dispatch(getStoryExtra(id));
            }
        )
        .catch();
    }
}

export function getCss(url) {
    return function(dispatch, getState) {
        url = baseUrl + url.replace(/http:\/\/.*com/, '');
        fetch(url)
        .then(response => response.text())
        .then(res => filterDefaultCss(res))
        .then(
            res => {
                dispatch(getCssSuccess(res))
            }
        )
        .catch();

    }
}



let initialState = {
    isLoading: true,
    story:{
        /*
        {
            body: '',
            title: '',
            image: '',
            share_url: '',
            section: {//所属栏目信息
                thumbnail: '',
                id: '',
                name: ''
            },
            id: 0
        }
        */
    }
}
//reducer
export function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_STORY_CONTENT_REQUEST: 
            return {
                story: state.story,
                isLoading: true
            }
        case GET_STORY_CONTENT_SUCCESS:
            return {
                isLoading: true,
                story: {
                    body: filterTag(action.story.body, ['img-place-holder', 'headline']),
                    title: action.story.title,
                    image: action.story.image,
                    images: action.story.images,
                    share_url: action.story.share_url,
                    section: action.story.section,
                    id: action.story.id,
                    image_source: action.story.image_source,
                    css: state.story.css
                }
            };
        case GET_CSS_SUCCESS: 
            return {
                isLoading: false,
                story: {
                    body: state.story.body,
                    title: state.story.title,
                    image: state.story.image,
                    images: state.story.images,
                    share_url: state.story.share_url,
                    section: state.story.section,
                    id: state.story.id,
                    image_source: state.story.image_source,
                    css: action.css
                }
            }
        default:
            return state;
    }
}











