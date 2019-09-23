"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DataTable = _interopRequireDefault(require("./DataTable"));

var _ToolBar = _interopRequireDefault(require("./ToolBar"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ExportDataTable = function ExportDataTable(_ref) {
  var rows = _ref.rows,
      columns = _ref.columns,
      actions = _ref.actions,
      props = _objectWithoutProperties(_ref, ["rows", "columns", "actions"]);

  return _react["default"].createElement("div", null, _react["default"].createElement(_DataTable["default"], _extends({}, props, {
    rows: rows,
    columns: columns,
    toolbar: _react["default"].createElement(_ToolBar["default"], {
      actions: [{
        label: 'Exportar',
        onClick: function onClick() {
          return (0, _utils.onExportCsv)({
            rows: rows,
            columns: columns
          });
        }
      }].concat(actions)
    })
  })));
};

ExportDataTable.propTypes = {
  columns: _propTypes["default"].object.isRequired,
  rows: _propTypes["default"].array.isRequired
};
ExportDataTable.defaultProps = {
  columns: {},
  rows: [],
  actions: []
};
var _default = ExportDataTable;
exports["default"] = _default;