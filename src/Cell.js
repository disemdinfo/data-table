import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import { renderCell } from './utils';

const styles = {
  column: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    fontSize: 12,
    color: '#626466',
  }  
};

function getAlign(type){
  const t = (type || '').toUpperCase();  
  if(['INTEGER','DECIMAL','NUMBER'].includes(t)) return 'right';
  if(['BOOLEAN','DATE','DATETIME','TIME'].includes(t)) return 'center';
  return 'left';
}

function getJustifyContent(align){    
    if (align === 'center') return 'center';
    if (align === 'right') return 'flex-end';
    return 'flex-start'  
}

function getStyle({ column, columnKey, row, rowIndex, value, onClick  }) {
  const { type, styleRenderer } = column;  
  let style = { ...styles.column, ...column.style };  
  if (styleRenderer) style = { ...style, ...styleRenderer({ value, column, columnKey, row, rowIndex }) };
  if (onClick) style = { ...style, cursor: 'pointer' };

  const align = column.align || getAlign(type);
  style = { ...style, justifyContent: getJustifyContent(align) }  

  return style;
}

const TableCell = ({ columnKey, rowIndex, column, row, ...props }) => {
  const onClick = column.onClick || props.onClick;
  const value = renderCell({ column, row });
  return (
    <Cell
      {...props}
      style={getStyle({ column, row, value, rowIndex, columnKey, onClick })}
      onClick={() => (onClick ? onClick({ row, rowIndex, column, columnKey }) : null)}
    >
      {value}
    </Cell>
  );
};

TableCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
};

TableCell.defaultProps = {
  column: {},
  row: {},
};

export default TableCell;
