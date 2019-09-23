import React from 'react';
import PropTypes from 'prop-types';
import DataTable from './DataTable';
import ToolBar from './ToolBar';
import { onExportCsv } from './utils';

const ExportDataTable = ({ rows, columns, actions, ...props }) => (    
    <div>      
      <DataTable
        {...props}
        rows={rows}
        columns={columns}              
        toolbar={<ToolBar actions={[{ label: 'Exportar', onClick: () => onExportCsv({ rows, columns }) }].concat(actions)}/>}
      /> 
    </div>
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
