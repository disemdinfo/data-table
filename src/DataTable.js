import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, ColumnGroup, Column } from 'fixed-data-table-2';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import clone from 'lodash/clone';
import Container from './Container';
import Header from './Header';
import Cell from './Cell';
import { getColumns, filter, sort, renderCell } from './utils';

import './data-table.css';

function prepareColumn(column, key) {
  return { 
    ...column,  
    key,      
    type: column.type || 'STRING',
    width: column.width || 100,
    flexGrow: !column.width ? 1 : null,
  };
}

function prepareColumns(c) {
  const colums = {};

  Object.keys(c).filter(key => c[key].hide !== true).forEach((key) => {
    const column = c[key];    
    colums[key] = prepareColumn(column, key);
  });

  return colums;
}

function prepareGroupColumns(c) {
  const colums = {};

  Object.keys(c).filter(key => c[key].hide !== true).forEach((key) => {
    let column = c[key];   

    if (column.columns) {
      column.columns = prepareColumns(column.columns);
    } else {
      column = { columns: { [key]: prepareColumn(column, key) } };
    }

    colums[key] = column;
  });

  return colums;
}

function getState(props) {
  const { rows, actions, exportCsv, count } = props;

  const hasGroup = Object.keys(props.columns).some(key => props.columns[key].columns);
  const columns = clone(hasGroup ? prepareGroupColumns(props.columns) : prepareColumns(props.columns));

  return {
    columns,
    startColumns: columns,
    rows,
    startRows: rows.slice(),
    config: {
      hasGroup,      
    },
  };
}
class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);

    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);            
    this.renderGroup = this.renderGroup.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { rows, columns } = nextProps;

    if (columns !== this.props.columns) {
      this.setState(getState(nextProps));
    }

    if (rows !== this.props.rows) {
      this.setState(getState(nextProps));
    }
  }

  onSearch({ value, column }) {
    const { startRows } = this.state;
    const columns = getColumns(this.state.columns);
    column.searchValue = value;
    const filteredColumns = Object.keys(columns).filter(key => columns[key].searchValue).map(key => columns[key]);

    const data = filter(startRows.slice(), filteredColumns);
    this.setState({ rows: data });
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
    if(label){
      headerStyle = {
        ...headerStyle,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRightStyle: 'solid',
        borderLeftStyle: 'solid',
        borderColor: '#d3d3d3',
      }
    }    

    return (
      <ColumnGroup
        {...props}
        header={<Header column={{ label, headerStyle }}>{label}</Header>}
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
    const { label } = column;

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
        footer={({ columnKey }) => (
          column.sum &&
          <Cell
            total
            column={column}
            row={{ [columnKey]: rows.reduce((a, b) => a + b[columnKey], 0) }}
          />
        )}
      />
    );
  }

  renderColumns() {
    const { columns, config: { hasGroup } } = this.state;
    const render = hasGroup ? this.renderGroup : this.renderColumn;

    return Object.keys(columns).map(key => render(columns[key]));
  }

  render() {
    const { height, maxHeight, ...props } = this.props;
    const { contentHeight } = this.state;        
    return (
      <Container 
        {...props}
        height={height || (contentHeight < maxHeight ? contentHeight : maxHeight)}        
        >
        <AutoSizer key="table">
          {({ width }) => (          
              <Table
                {...this.props}
                width={width}
                rowsCount={this.state.rows.length}
                onContentHeightChange={contentHeight => this.setState({ contentHeight })}                
              >
                {this.renderColumns()}
              </Table>          
          )}
        </AutoSizer>
      </Container>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
};

DataTable.defaultProps = {
  columns: {},
  rows: [],
  maxHeight: 850,  
  headerHeight: 70,
  rowHeight: 40,
  groupHeaderHeight: 40,
  onClick: null,  
};

export default DataTable;
