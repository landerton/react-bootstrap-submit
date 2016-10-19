require('babel-register');
var jsdom = require('jsdom');
var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');
var chaiJsx = require('chai-jsx');

chai.use(chaiEnzyme());
chai.use(chaiJsx);

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

global.window.URL = {
  createObjectURL: function createObjectURL(arg) {
    return 'data://' + arg.name;
  }
};
