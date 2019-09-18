import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';

const styles = {
  container: {
    color: '#626466',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'stretch',    
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
    height: '100%',    
  },
  search: {
    container:
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',        
        height: '100%',
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
      color: '#626466',
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
    const { children, column, width, height, onSearch } = this.props;
    const { sorted, search, searchValue, headerStyle } = column;
    const sortable = column.sortable !== false;
    const sortIcon = sortable && sorted !== undefined ? sorted ? ' ↑' : ' ↓' : '';
    const onClick = sortable ? this.onSort : null;        
    
    return (
      <div style={{ ...styles.container, ...headerStyle, height }}>
        <Cell style={styles.label}>          
          <span onClick={onClick} style={{ cursor: sortable ? 'pointer' : null }}>{children}</span> {sortIcon}
        </Cell>  
        {search &&
        <div style={styles.search.container}>     
          <input
            onChange={e => onSearch({ value: e.target.value, column })}
            value={searchValue || ''}
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
  onSort: PropTypes.func,  
  onSearch: PropTypes.func,
};

Header.defaultProps = {  
  column: {},
  width: null,
  height: null,
  onSort: null,  
  onSearch: null,
};

export default Header;

