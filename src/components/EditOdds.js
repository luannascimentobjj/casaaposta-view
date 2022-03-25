import React from 'react';
import OddsForm from './OddsForm';
import { useParams } from 'react-router-dom';

const EditOdd = ({ history, odds, setOdds }) => {
  const { id } = useParams();
  const oddToEdit = odds.find((odd) => odd.id === id);

  const handleOnSubmit = (odd) => {
    const filteredOdds = odds.filter((odd) => odd.id !== id);
    setOdds([odd, ...filteredOdds]);
    history.push('/');
  };

  return (
    <div>
      <OddsForm odd={oddToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditOdd;