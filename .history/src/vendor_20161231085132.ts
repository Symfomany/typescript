import { phrase, Demo } from './Demo';
// import * as sass from './sass/main.scss';
import * as $ from 'jquery';
import { chunk } from 'lodash'; // library external

export const demo = { phrase, Demo };
export const chunky = chunk;
export const jQuery = $;
