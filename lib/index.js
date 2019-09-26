'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onExportCsv = exports.ToolBar = exports.DataTable = undefined;

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _ExportDataTable = require('./ExportDataTable');

var _ExportDataTable2 = _interopRequireDefault(_ExportDataTable);

var _ToolBar = require('./ToolBar');

var _ToolBar2 = _interopRequireDefault(_ToolBar);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import React from 'react';
//import ReactDOM from 'react-dom';
exports.DataTable = _DataTable2.default;
exports.ToolBar = _ToolBar2.default;
exports.onExportCsv = _utils.onExportCsv;

//ReactDOM.render(<DataTable columns={{ a: { label: 'A' } }} rows={[{ a: 'xxx' }, { a: 'yyy' }]} />, document.getElementById('root'));

// "@babel/cli": "^7.6.0",
// "@babel/core": "^7.6.0",
// "@babel/preset-env": "^7.6.0",
// "@babel/preset-react": "^7.0.0",