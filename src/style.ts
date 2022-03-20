import {BODY} from './constants';

/**
 * Using .ts to be able to share constants across files
 */
const {style} = document.body;

style.margin = '0';
style.fontFamily = `'Be Vietnam Pro', Verdana, sans-serif`;
style.backgroundColor = `${BODY.BACK_COLOR}`;

style.userSelect = 'none';
style.webkitUserSelect = 'none';
