import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, ColumnGroup, Column } from 'fixed-data-table-2';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ReactLoading from 'react-loading';
import clone from 'lodash/clone';
import Header from './Header';
import Cell from './Cell';
import { getColumns, filter, sort } from './utils';
import './data-table.css';

function prepareColumn({ columns, column, key, params, tableWidth }) {
  return {
    ...column,
    key,
    columnKey: key,
    type: column.type || 'STRING',
    width: column.width || (tableWidth ? tableWidth / Object.keys(columns).length : 100),
    flexGrow: !column.width ? 1 : null,
    headerStyle: { ...params.headerStyle, ...column.headerStyle },
    style: { ...params.style, ...column.style },
  };
}

function prepareColumns({ columns, ...params }) {
  const cols = {};

  Object.keys(columns).filter(key => columns[key].hide !== true).forEach((key) => {
    const column = columns[key];
    cols[key] = prepareColumn({ columns, column, key, ...params });
  });

  return cols;
}

function prepareGroupColumns({ columns, ...params }) {
  const cols = {};
  Object.keys(columns).filter(key => columns[key].hide !== true).forEach((key) => {
    let column = columns[key];

    if (column.columns) {
      column.columns = prepareColumns({ columns: column.columns, ...params });
    } else {
      column = { columns: { [key]: prepareColumn({ columns, column, key, ...params }) } };
    }

    cols[key] = prepareColumn({ columns, column, key, ...params });
  });
  return cols;
}



const Loading = () => <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}><ReactLoading type="spin" color="#626466" height={50} width={50} /></div>;

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.startRows = props.rows;
    
    this.state = this.getState(props);
    
    const { getRows } = props;
    if (getRows) getRows(this.state.rows);

    this.onSearch = this.onSearch.bind(this);
    this.getFilteredRows = this.getFilteredRows.bind(this);
    this.onSort = this.onSort.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { rows, getRows, columns } = nextProps;

    if (columns !== this.props.columns) {
      this.setState(this.getState(nextProps));
    }

    if (rows !== this.props.rows) {
      this.setState(this.getState(nextProps), () => (getRows ? getRows(this.state.rows) : null));
    }
  }

  getState(params) {
    const { rows, columns } = params;
    const hasGroup = Object.keys(columns).some(key => columns[key].columns);
    const cols = clone(hasGroup ? prepareGroupColumns({ columns, params }) : prepareColumns({ columns, params }));
  
    return {
      columns: cols,
      rows: this.getFilteredRows({ columns: cols }),
      config: {
        hasGroup,
      },
    };
  }

  getFilteredRows({ value, column, columns }) {
    const { startRows } = this;
    const cols = getColumns(columns);
    if(column) column.searchValue = value;
    const filteredColumns = Object.keys(cols).filter(key => cols[key].searchValue).map(key => cols[key]);
    const data = filter(startRows.slice(), filteredColumns);
    return data;
  }

  onSearch({ value, column }) {
    const { getRows } = this.props;
    const { columns } = this.state;
    const data = this.getFilteredRows({ value, column, columns });
    this.setState({ rows: data }, () => (getRows ? getRows(this.state.rows) : null));
  }

  onSort(column) {
    if (column.sortable === false) return;

    const { columns, rows } = this.state;

    column.sorted = !column.sorted;
    Object.keys(columns).forEach((key) => {
      if (columns[key] !== column) columns[key].sorted = undefined;
    });

    this.setState({ rows: sort(rows, column.key, column.sorted) });
  }

  renderGroup({ columns, label, headerStyle, ...props }) {
    return (
      <ColumnGroup
        {...props}
        header={<Header column={{ headerStyle }} group>{label}</Header>}
      >
        {Object.keys(columns).map((key) => {
          const column = columns[key];
          return this.renderColumn(column);
        })}
      </ColumnGroup>
    );
  }

  renderColumn(column) {
    const { rows } = this.state;
    const { label, footer } = column;

    return (
      <Column
        {...column}
        header={
          <Header
            column={column}
            onSearch={this.onSearch}
            onSort={this.onSort}
          >
            {label}
          </Header>
        }
        cell={({ rowIndex, ...cellProps }) => (
          <Cell
            {...cellProps}
            rowIndex={rowIndex}
            row={rows[rowIndex]}
            column={column}
            onClick={this.props.onClick}
          />
        )}
        footer={({ columnKey }) => (footer ? <Cell column={{ ...column, cellRenderer: null }} row={{ [columnKey]: footer({ columnKey, rows }) }} /> : null)}
      />
    );
  }

  renderColumns() {
    const { columns, config: { hasGroup } } = this.state;
    const render = hasGroup ? this.renderGroup : this.renderColumn;

    return Object.keys(columns).map(key => render(columns[key]));
  }

  render() {
    const { width, height, maxHeight, toolbar, loading } = this.props;
    const { contentHeight } = this.state;

    return (
      <div style={{ width, marginLeft: 'auto', marginRight: 'auto' }}>
        {toolbar}
        <div style={{ height: height || (contentHeight < maxHeight ? contentHeight : maxHeight) }} >
          {loading ? <Loading /> :
          <AutoSizer key="table">
              {({ width }) => (
              <Table
                  {...this.props}
                  width={width}
                  rowsCount={this.state.rows.length}
                  onContentHeightChange={h => this.setState({ contentHeight: h })}
                >
                  {this.renderColumns()}
                </Table>
              )}
            </AutoSizer>}
        </div>
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  maxHeight: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.string,
  toolbar: PropTypes.node,
  loading: PropTypes.bool,
  getRows: PropTypes.func,
};

DataTable.defaultProps = {
  columns: {},
  rows: [],
  maxHeight: 850,
  headerHeight: 70,
  rowHeight: 40,
  groupHeaderHeight: 40,
  width: '100%',  
  toolbar: null,
  loading: false,
  getRows: null,
  onClick: null,
};

export default DataTable;
