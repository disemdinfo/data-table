'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLoading = require('react-loading');

var _reactLoading2 = _interopRequireDefault(_reactLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    width: '100%'
  },
  action: {
    marginLeft: 6
  }
};

var ToolBar = function ToolBar(props) {
  var title = props.title,
      actions = props.actions;

  return _react2.default.createElement(
    'div',
    { style: styles.container, id: 'toolbar' },
    _react2.default.createElement(
      'div',
      { style: styles.title },
      title
    ),
    _react2.default.createElement(
      'div',
      { style: styles.actions },
      actions.map(function (action, i) {
        return _react2.default.createElement(
          'div',
          { key: i, style: styles.action },
          action
        );
      })
    )
  );
};

ToolBar.defaultProps = {
  title: null,
  actions: []
};

exports.default = ToolBar;