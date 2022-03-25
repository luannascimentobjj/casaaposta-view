import React from 'react';
import '../styles.css';
import Odd from './Odd';

const OddsList = ({ odds, setOdds }) => {

    const handleRemoveOdds = (id) => {
      setOdds(odds.filter((odd) => odd.id !== id));
    };
  
    return (
      <React.Fragment>
        <div className="book-list">
          {odds.length ? (
            odds.map((odd) => (
                <Odd key={odd.id} {...odd} handleRemoveOdds={handleRemoveOdds} />
            ))
          ) : (
            <p className="message">No books available. Please add some books.</p>
          )}
        </div>
      </React.Fragment>
    );
  };
  
  export default OddsList;