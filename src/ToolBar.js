import React from 'react';
import ReactLoading from 'react-loading';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 4,
    color:'#626466',
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end' ,
    width: '100%',      
  },
  title: {
    width: '100%',
    //marginLeft: 6,           
    //color:'#626466',    
  },
  action: {
    marginLeft: 6,               
  },
  button: {
    color:'#626466',        
    border: '1px solid #rgba(0,0,0,0.02)',                
    cursor: 'pointer',
}
};

const ToolBar = (props) => {
  const { title, actions } = props;  
  
  return (
    <div style={styles.container} id="toolbar">
        <div style={styles.title}>{title}</div>
        <div style={styles.actions}>
            {actions.map((action, i) => <div key={i} style={styles.action}>{action}</div>)}
        </div>      
    </div>
  );
};

ToolBar.defaultProps = {  
  title: null,
  actions: []
};

export default ToolBar;
