"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLoading = _interopRequireDefault(require("react-loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var styles = {
  container: {
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 4
  },
  action: {
    marginLeft: 6,
    color: '#626466'
  },
  button: {
    color: '#626466',
    border: '1px solid #rgba(0,0,0,0.02)',
    cursor: 'pointer'
  }
};

var ToolBar = function ToolBar(props) {
  var title = props.title,
      actions = props.actions;
  return _react["default"].createElement("div", {
    style: styles.container
  }, _react["default"].createElement("div", {
    style: styles.actions
  }, actions.map(function (action) {
    var a = action;

    if (_typeof(action) === 'object') {
      var label = action.label,
          _props = _objectWithoutProperties(action, ["label"]);

      a = _react["default"].createElement("button", _extends({
        style: styles.button
      }, _props), label);
    }

    return _react["default"].createElement("div", {
      style: styles.action
    }, a);
  })));
};

ToolBar.defaultProps = {
  title: null,
  actions: []
};
var _default = ToolBar;
exports["default"] = _default;