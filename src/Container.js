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
  }
};

const Loading = () => <div style={styles.loading}><ReactLoading type="spin" color="#626466" height={50} width={50} /></div>

const Container = (props) => {
  const { children, width, height, style, loading, toolbar } = props;  
  return (
    <div style={{ ...style, width, height }}>             
      {loading ? 
        <Loading /> : 
        <div>
          {toolbar}
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
};

export default Container;
