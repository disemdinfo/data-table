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
      exportedRows: props.rows,
    }

  }
  render(){
    const { rows, columns, title, actions, ExportComponet, getRows, ...props } = this.props;    
    
    return(    
      <div>  
          
        <DataTable
          {...props}
          rows={rows}
          columns={columns}              
          getRows={exportedRows => this.setState({ exportedRows }, () => getRows(exportedRows))}
          toolbar={
            <ToolBar 
            title={title} 
            actions={[ExportComponet ? <ExportComponet onClick={() => onExportCsv({ rows: this.state.exportedRows, columns })} /> : null].concat(actions)}/>
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
