import React from 'react';
import ReactLoading from 'react-loading';

const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loading: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
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
    color:'#FFF',
    color:'#626466',    
  }
};

const Loading = () => <div style={styles.loading}><ReactLoading type="spin" color="#626466" height={50} width={50} /></div>

const Container = (props) => {
  const { children, width, height, style, loading, actions } = props;  
  console.log('actions', actions)
  return (
    <div style={{ ...style, width, height }}>             
      {loading ? 
        <Loading /> : 
        <div>
          <div style={styles.actions}>
            {actions.map(action => <div style={styles.action}>{action}</div>)}
          </div>
          {children}
        </div>
      }
    </div>
  );
};

Container.defaultProps = {
  width: '100%',
  style: styles.container,
  loading: false,
  actions: []
};

export default Container;
