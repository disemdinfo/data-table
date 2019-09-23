import React from 'react';
import PropTypes from 'prop-types';
import DataTable from './DataTable';
import { onExportCsv } from './utils';

const styles = {
    button: {
        // color:'#626466',        
        border: '1px solid #rgba(0,0,0,0.02)',                
        cursor: 'pointer',
    }
};

const ExportDataTable = ({ rows, columns, actions, ...props }) => (    
    <DataTable
      {...props}
      rows={rows}
      columns={columns}      
      actions={[<button onClick={() => onExportCsv({ rows, columns })} style={styles.button}>exportar</button>].concat(actions)}
    /> 
);

ExportDataTable.propTypes = {
  columns: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
};

ExportDataTable.defaultProps = {
  columns: {},
  rows: [],
  actions: [],
};

export default ExportDataTable;
