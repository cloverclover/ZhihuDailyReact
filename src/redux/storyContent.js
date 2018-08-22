import {filterImage} from '../common/filter';

const GET_STORY_CONTENT_REQUEST = 'GET_STORY_CONTENT_REQUEST';
const GET_STORY_CONTENT_SUCCESS = 'GET_STORY_CONTENT_SUCCESS';

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

export function getStoryContent(id) {
    return function(dispatch, getState) {
        dispatch(getStoryContentRequest());
        fetch('http://localhost:8086' + '/api/4/news/' + id)
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
        .then(
            json => {
                dispatch(getStoryContentSuccess(json));
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
    },
    hotStory:{

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
                isLoading: false,
                story: {
                    body: action.story.body,
                    title: action.story.title,
                    image: action.story.image,
                    images: action.story.images,
                    share_url: action.story.share_url,
                    section: action.story.section,
                    id: action.story.id,
                    image_source: action.story.image_source,
                    css: action.story.css
                },
                hotStory: state.hotStory
            };
        default:
            return state;
    }
}











