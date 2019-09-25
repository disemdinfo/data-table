"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fixedDataTable = require("fixed-data-table-2");

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _clone = _interopRequireDefault(require("lodash/clone"));

var _Container = _interopRequireDefault(require("./Container"));

var _Header = _interopRequireDefault(require("./Header"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _utils = require("./utils");

require("./data-table.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function prepareColumn(_ref) {
  var columns = _ref.columns,
      column = _ref.column,
      key = _ref.key,
      props = _ref.props,
      tableWidth = _ref.tableWidth;
  return _objectSpread({}, column, {
    key: key,
    columnKey: key,
    type: column.type || 'STRING',
    width: column.width || (tableWidth ? tableWidth / Object.keys(columns).length : 100),
    flexGrow: !column.width ? 1 : null,
    headerStyle: _objectSpread({}, props.headerStyle, {}, column.headerStyle),
    style: _objectSpread({}, props.style, {}, column.style)
  });
}

function prepareColumns(_ref2) {
  var columns = _ref2.columns,
      props = _objectWithoutProperties(_ref2, ["columns"]);

  var cols = {};
  Object.keys(columns).filter(function (key) {
    return columns[key].hide !== true;
  }).forEach(function (key) {
    var column = columns[key];
    cols[key] = prepareColumn(_objectSpread({
      columns: columns,
      column: column,
      key: key
    }, props));
  });
  return cols;
}

function prepareGroupColumns(_ref3) {
  var columns = _ref3.columns,
      props = _objectWithoutProperties(_ref3, ["columns"]);

  var cols = {};
  Object.keys(columns).filter(function (key) {
    return columns[key].hide !== true;
  }).forEach(function (key) {
    var column = columns[key];

    if (column.columns) {
      column.columns = prepareColumns(_objectSpread({
        columns: column.columns
      }, props));
    } else {
      column = {
        columns: _defineProperty({}, key, prepareColumn(_objectSpread({
          columns: columns,
          column: column,
          key: key
        }, props)))
      };
    }

    cols[key] = prepareColumn(_objectSpread({
      columns: columns,
      column: column,
      key: key
    }, props));
  });
  return cols;
}

function getState(props) {
  var rows = props.rows,
      columns = props.columns;
  var hasGroup = Object.keys(columns).some(function (key) {
    return columns[key].columns;
  });
  var cols = (0, _clone["default"])(hasGroup ? prepareGroupColumns({
    columns: columns,
    props: props
  }) : prepareColumns({
    columns: columns,
    props: props
  }));
  return {
    columns: cols,
    startColumns: cols,
    rows: rows,
    startRows: rows.slice(),
    config: {
      hasGroup: hasGroup
    }
  };
}

var DataTable =
/*#__PURE__*/
function (_Component) {
  _inherits(DataTable, _Component);

  function DataTable(props) {
    var _this;

    _classCallCheck(this, DataTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataTable).call(this, props));
    var getRows = props.getRows;
    _this.state = getState(props);
    if (getRows) getRows(_this.state.rows);
    _this.onSearch = _this.onSearch.bind(_assertThisInitialized(_this));
    _this.onSort = _this.onSort.bind(_assertThisInitialized(_this));
    _this.renderGroup = _this.renderGroup.bind(_assertThisInitialized(_this));
    _this.renderColumn = _this.renderColumn.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DataTable, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var rows = nextProps.rows,
          getRows = nextProps.getRows,
          columns = nextProps.columns;

      if (columns !== this.props.columns) {
        this.setState(getState(nextProps));
      }

      if (rows !== this.props.rows) {
        this.setState(getState(nextProps), function () {
          return getRows ? getRows(_this2.state.rows) : null;
        });
      }
    }
  }, {
    key: "onSearch",
    value: function onSearch(_ref4) {
      var _this3 = this;

      var value = _ref4.value,
          column = _ref4.column;
      var getRows = this.props.getRows;
      var startRows = this.state.startRows;
      var columns = (0, _utils.getColumns)(this.state.columns);
      column.searchValue = value;
      var filteredColumns = Object.keys(columns).filter(function (key) {
        return columns[key].searchValue;
      }).map(function (key) {
        return columns[key];
      });
      var data = (0, _utils.filter)(startRows.slice(), filteredColumns);
      this.setState({
        rows: data
      }, function () {
        return getRows ? getRows(_this3.state.rows) : null;
      });
    }
  }, {
    key: "onSort",
    value: function onSort(column) {
      if (column.sortable === false) return;
      var _this$state = this.state,
          columns = _this$state.columns,
          rows = _this$state.rows;
      column.sorted = !column.sorted;
      Object.keys(columns).forEach(function (key) {
        if (columns[key] !== column) columns[key].sorted = undefined;
      });
      this.setState({
        rows: (0, _utils.sort)(rows, column.key, column.sorted)
      });
    }
  }, {
    key: "renderGroup",
    value: function renderGroup(_ref5) {
      var _this4 = this;

      var columns = _ref5.columns,
          label = _ref5.label,
          headerStyle = _ref5.headerStyle,
          props = _objectWithoutProperties(_ref5, ["columns", "label", "headerStyle"]);

      return _react["default"].createElement(_fixedDataTable.ColumnGroup, _extends({}, props, {
        header: _react["default"].createElement(_Header["default"], {
          column: {
            headerStyle: headerStyle
          },
          group: true
        }, label)
      }), Object.keys(columns).map(function (key) {
        var column = columns[key];
        return _this4.renderColumn(column);
      }));
    }
  }, {
    key: "renderColumn",
    value: function renderColumn(column) {
      var _this5 = this;

      var rows = this.state.rows;
      var label = column.label,
          _footer = column.footer;
      return _react["default"].createElement(_fixedDataTable.Column, _extends({}, column, {
        header: _react["default"].createElement(_Header["default"], {
          column: column,
          onSearch: this.onSearch,
          onSort: this.onSort
        }, label),
        cell: function cell(_ref6) {
          var rowIndex = _ref6.rowIndex,
              cellProps = _objectWithoutProperties(_ref6, ["rowIndex"]);

          return _react["default"].createElement(_Cell["default"], _extends({}, cellProps, {
            rowIndex: rowIndex,
            row: rows[rowIndex],
            column: column,
            onClick: _this5.props.onClick
          }));
        },
        footer: function footer(_ref7) {
          var columnKey = _ref7.columnKey,
              rows = _ref7.rows;
          return _react["default"].createElement(_Cell["default"], {
            column: column,
            row: _defineProperty({}, columnKey, _footer({
              columnKey: columnKey,
              rows: rows
            })) //row={{ [columnKey]: rows.reduce((a, b) => a + b[columnKey], 0) }}

          });
        }
      }));
    }
  }, {
    key: "renderColumns",
    value: function renderColumns() {
      var _this$state2 = this.state,
          columns = _this$state2.columns,
          hasGroup = _this$state2.config.hasGroup;
      var render = hasGroup ? this.renderGroup : this.renderColumn;
      return Object.keys(columns).map(function (key) {
        return render(columns[key]);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props = this.props,
          height = _this$props.height,
          maxHeight = _this$props.maxHeight,
          props = _objectWithoutProperties(_this$props, ["height", "maxHeight"]);

      var contentHeight = this.state.contentHeight;
      return _react["default"].createElement(_Container["default"], _extends({}, props, {
        height: height || (contentHeight < maxHeight ? contentHeight : maxHeight)
      }), _react["default"].createElement(_AutoSizer["default"], {
        key: "table" //onResize={({ width }) => this.setState({ tableWidth: width })}

      }, function (_ref9) {
        var width = _ref9.width;
        return _react["default"].createElement(_fixedDataTable.Table, _extends({}, _this6.props, {
          width: width,
          rowsCount: _this6.state.rows.length,
          onContentHeightChange: function onContentHeightChange(h) {
            return _this6.setState({
              contentHeight: h
            });
          }
        }), _this6.renderColumns());
      }));
    }
  }]);

  return DataTable;
}(_react.Component);

DataTable.propTypes = {
  columns: _propTypes["default"].object.isRequired,
  rows: _propTypes["default"].array.isRequired,
  onClick: _propTypes["default"].func,
  maxHeight: _propTypes["default"].number,
  height: _propTypes["default"].number
};
DataTable.defaultProps = {
  columns: {},
  rows: [],
  maxHeight: 850,
  headerHeight: 70,
  rowHeight: 40,
  groupHeaderHeight: 40,
  onClick: null
};
var _default = DataTable;
exports["default"] = _default;