"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLoading = _interopRequireDefault(require("react-loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 4,
    color: '#626466'
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%'
  },
  title: {
    width: '100%' //marginLeft: 6,           
    //color:'#626466',    

  },
  action: {
    marginLeft: 6
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
    style: styles.container,
    id: "toolbar"
  }, _react["default"].createElement("div", {
    style: styles.title
  }, title), _react["default"].createElement("div", {
    style: styles.actions
  }, actions.map(function (action, i) {
    return _react["default"].createElement("div", {
      key: i,
      style: styles.action
    }, action);
  })));
};

ToolBar.defaultProps = {
  title: null,
  actions: []
};
var _default = ToolBar;
exports["default"] = _default;