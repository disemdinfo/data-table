"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Label = function Label(_ref) {
  var children = _ref.children,
      onSort = _ref.onSort,
      column = _ref.column;
  var styles = {
    label: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 13,
      height: '100%',
      padding: 8
    }
  };
  var sorted = column.sorted;
  var sortable = column.sortable !== false;
  var sortIcon = onSort && sortable && sorted !== undefined ? sorted ? ' ↑' : ' ↓' : '';
  var onClick = sortable ? onSort : null;
  return _react["default"].createElement("div", {
    style: styles.label
  }, _react["default"].createElement("span", {
    onClick: onClick,
    style: {
      textAlign: 'center',
      cursor: sortable ? 'pointer' : null
    }
  }, children), " ", sortIcon);
};

var Input = function Input(_ref2) {
  var column = _ref2.column,
      onSearch = _ref2.onSearch;
  var styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    input: {
      width: '90%',
      marginTop: 2,
      marginBottom: 2,
      border: 1,
      borderColor: 'rgba(0, 0, 0, 0.14)',
      borderStyle: 'solid',
      borderRadius: 4,
      padding: 2,
      color: '#626466'
    }
  };
  return _react["default"].createElement("div", {
    style: styles.container
  }, _react["default"].createElement("input", {
    onChange: function onChange(e) {
      return onSearch({
        value: e.target.value,
        column: column
      });
    },
    value: column.searchValue || '',
    style: styles.input
  }));
};

var Container = function Container(_ref3) {
  var children = _ref3.children,
      height = _ref3.height,
      headerStyle = _ref3.headerStyle;
  var styles = {
    container: {
      color: '#626466',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'stretch',
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      borderWidth: [0, 1, 0, 0],
      borderColor: 'rgba(0,0,0,0.02)'
    }
  };
  return _react["default"].createElement("div", {
    style: _objectSpread({}, styles.container, {}, headerStyle, {
      height: height
    })
  }, children);
};

var Cell = function Cell(_ref4) {
  var children = _ref4.children,
      column = _ref4.column,
      height = _ref4.height,
      onSort = _ref4.onSort,
      onSearch = _ref4.onSearch;
  var search = column.search,
      headerStyle = column.headerStyle;
  return _react["default"].createElement(Container, {
    height: height,
    headerStyle: headerStyle
  }, _react["default"].createElement(Label, {
    column: column,
    onSort: onSort
  }, children), search && _react["default"].createElement(Input, {
    column: column,
    onSearch: onSearch
  }));
};

var GroupCell = function GroupCell(_ref5) {
  var children = _ref5.children,
      column = _ref5.column,
      height = _ref5.height;
  var headerStyle = column.headerStyle;

  if (children) {
    headerStyle = _objectSpread({}, headerStyle, {
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderRightStyle: 'solid',
      borderLeftStyle: 'solid',
      borderColor: '#d3d3d3'
    });
  }

  return _react["default"].createElement(Container, {
    height: height,
    headerStyle: headerStyle
  }, _react["default"].createElement(Label, {
    column: column
  }, children));
};

var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, props));
    _this.onSort = _this.onSort.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Header, [{
    key: "onSort",
    value: function onSort(e) {
      e.preventDefault();

      if (this.props.onSort) {
        this.props.onSort(this.props.column);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          column = _this$props.column,
          height = _this$props.height,
          onSearch = _this$props.onSearch,
          group = _this$props.group;
      return group ? _react["default"].createElement(GroupCell, {
        column: column,
        height: height
      }, children) : _react["default"].createElement(Cell, {
        column: column,
        height: height,
        onSort: this.onSort,
        onSearch: onSearch
      }, children);
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  children: _propTypes["default"].node.isRequired,
  column: _propTypes["default"].object.isRequired,
  height: _propTypes["default"].number,
  onSort: _propTypes["default"].func,
  onSearch: _propTypes["default"].func
};
Header.defaultProps = {
  column: {},
  height: null,
  onSort: null,
  onSearch: null
};
var _default = Header;
exports["default"] = _default;