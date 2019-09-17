import React, { Component } from 'react';
import PropTypes from 'prop-types';

const searchHeight = 30;
const styles = {
  container: {
    // background: '#FFFFFF',
    // color: 'rgba(0,0,0,0.54)',
    background: '#1976d2',
    color: '#FFFFFF',
    // color: '#626466',
    textAlign: 'center',
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderWidth: [0, 1, 0, 0],
    borderColor: 'rgba(0,0,0,0.02)',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    // padding: 8,
  },
  hide: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 5,
    color: 'rgba(0,0,0,0.2)',
    fontSize: 14,
  },
  search: {
    container:
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: searchHeight,
      },

    input: {
      width: '90%',
      height: 18,
      border: 1,
      borderColor: 'rgba(0, 0, 0, 0.14)',
      borderStyle: 'solid',
      borderRadius: 4,
    },

  },
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);    
  }

  onSort(e) {
    e.preventDefault();

    if (this.props.onSort) {
      this.props.onSort(this.props.column);
    }
  }

  render() {
    const {
      children,
      column,
      width,
      height,
      onSearch,
      config,
      style,
    } = this.props;

    const labelHeight = config.hasSearch ? height - searchHeight : height;

    const sortable = column.sortable !== false;
    const sortIcon = column.sorted !== undefined && sortable ? column.sorted ? ' ↑' : ' ↓' : '';

    const onClick = sortable ? this.onSort : null;
    const labelStyle = { padding: 8, cursor: sortable ? 'pointer' : null };

    const label = <span onClick={onClick} style={labelStyle}>{children}</span>;
    const search = column.search === true;
    const searchValue = column.searchValue || '';

    return (
      <div style={{ ...styles.container, ...style, height }}>
        <div style={{ ...styles.label, width, height: labelHeight }}>          
          {label}
          {sortIcon}
        </div>
        {search &&
        <div style={styles.search.container}>
          <input
            onChange={e => onSearch({ value: e.target.value, column })}
            value={searchValue}
            style={styles.search.input}
          />
        </div>}
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  config: PropTypes.object.isRequired,
  onSort: PropTypes.func,  
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  style: {},
  config: {},
  column: {},
  onSort: null,  
  onSearch: null,
  width: null,
  height: null,
};

export default Header;

