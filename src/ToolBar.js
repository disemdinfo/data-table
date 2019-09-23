import React from 'react';
import ReactLoading from 'react-loading';

const styles = {
  container: {
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end' ,
    width: '100%',
    marginBottom: 4    
  },
  action: {
    marginLeft: 6,           
    color:'#626466',    
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
    <div style={styles.container}>        
        <div style={styles.actions}>
            {actions.map((action) => {
                let a = action;
                if(typeof action === 'object'){
                    const { label, ...props } = action;
                    a = <button style={styles.button} {...props}>{label}</button>
                }
                return <div style={styles.action}>{a}</div>
            })}
        </div>      
    </div>
  );
};

ToolBar.defaultProps = {  
  title: null,
  actions: []
};

export default ToolBar;
