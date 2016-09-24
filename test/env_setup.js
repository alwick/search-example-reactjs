import {jsdom} from 'jsdom';
import config from 'config';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.document.location.href = 'http://fake.com';
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.window.__CONFIG__ = config;