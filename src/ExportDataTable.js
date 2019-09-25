import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import DataTable from './DataTable';
import ToolBar from './ToolBar';
import { onExportCsv } from './utils';

class ExportDataTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      rowsExport: props.rows,
    }

  }
  render(){
    const { rows, columns, title, actions, ...props } = this.props;
    const { rowsExport } = this.state;
    
    return(    
      <div>      
        <DataTable
          {...props}
          rows={rows}
          columns={columns}              
          getRows={r => this.setState({ rowsExport: r })}
          toolbar={
            <ToolBar 
            title={title} 
            actions={[{ 
              label: 'Exportar', 
              onClick: () => onExportCsv({ rows: rowsExport, columns })
            }].concat(actions)}/>
          }
        /> 
      </div>
  )}
};

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
