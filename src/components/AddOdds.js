import React from 'react';
import OddsForm from './OddsForm';
import '../styles.css';

const AddOdds = ({ history, odds, setOdds }) => {
    const handleOnSubmit = (odd) => {
      setOdds([odd, ...odds]);
      history.push('/');
    };
  
    return (
      <React.Fragment>
        <OddsForm handleOnSubmit={handleOnSubmit} />
      </React.Fragment>
    );
  };

export default AddOdds;