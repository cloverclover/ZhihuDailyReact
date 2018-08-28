import { combineReducers } from 'redux';
import {reducer as story} from './story';
import {reducer as dataConfig} from './dataconfig';
import {reducer as storyContent} from './storyContent';
import {reducer as theme} from './theme';
import {reducer as themeContent} from './themeContent';
import {reducer as comment} from './comment';

export default combineReducers({
    story,
    dataConfig,
    storyContent,
    theme,
    themeContent,
    comment
})