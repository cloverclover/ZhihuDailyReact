import {getStory} from './story';

import {convertToString, convertToTime} from '../common/time';

const SET_NEWS_URL = 'SET_NEWS_URL';
const SET_NEXT_DATE = 'SET_NEXT_DATE';
const SET_PREVIOUS_DATE = 'SET_PREVIOUS_DATE';
const SET_IS_TODAY = 'SET_IS_TODAY';
//action creator
function setNewsUrl(url) {
    return {
        type: SET_NEWS_URL,
        newsUrl: url
    }
}
function setNextDateSync() {
    return {
        type: SET_NEXT_DATE
    }
}
function setPreviousDateSync() {
    return {
        type: SET_PREVIOUS_DATE
    }
}
function setIsToday(isToday) {
    return {
        type: SET_IS_TODAY,
        isToday: isToday
    }
}
export function setNextDate() {
    return function(dispatch, getState) {
        dispatch(setNextDateSync());
        dispatch(getStory());
        if (getState().dataConfig.date == convertToString(new Date())) {
            dispatch(setIsToday(true));
        } else {
            dispatch(setIsToday(false));
        }
    }
}
export function setPreviousDate() {
    return function(dispatch, getState) {
        dispatch(setPreviousDateSync());
        dispatch(getStory());
        if(getState().dataConfig.date == convertToString(new Date())) {
            console.log('isToday')
            dispatch(setIsToday(true));
        } else {
            dispatch(setIsToday(false));
        }
    }
}

let initialState = {
    newsUrl: '',
    date: convertToString(new Date()),
    isToday: true
}
//reducer
export function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_NEWS_URL:
            return {
                newsUrl: action.newsUrl,
                date: state.date,
                isToday: state.isToday
            };
        case SET_NEXT_DATE:
            return {
                newsUrl: state.newsUrl,
                date: convertToString((function () {
                    let date = convertToTime(state.date);
                    date.setDate(date.getDate() + 1);
                    return date;
                })()),
                isToday: state.isToday
            };
        case SET_PREVIOUS_DATE: 
            return {
                newsUrl: state.newsUrl,
                date: convertToString((function() {
                    let date = convertToTime(state.date);
                    date.setDate(date.getDate() - 1);
                    return date;
                })()),
                isToday: state.isToday
            };
        case SET_IS_TODAY:
            return {
                newsUrl: state.newsUrl,
                date: state.date,
                isToday: action.isToday
            }
        default:
            return state;
    }
}