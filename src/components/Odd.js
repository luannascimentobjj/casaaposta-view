import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../styles.css';
import { useNavigate  } from 'react-router-dom';

const Odd = ({
  id,
  bookname,
  author,
  price,
  quantity,
  date,
  handleRemoveOdds
}) => {
  const history = useNavigate();
  return (
    <Card style={{ width: '18rem', background : "#fff" }} className="book">
      <Card.Body>
        <Card.Title className="book-title">{bookname}</Card.Title>
        <div className="book-details">
          <div>Author: {author}</div>
          <div>Quantity: {quantity} </div>
          <div>Price: {price} </div>
          <div>Date: {new Date(date).toDateString()}</div>
        </div>
        <Button variant="primary" onClick={() => history(`/edit/${id}`)}>
  Edit
</Button>{' '}
        <Button variant="danger" onClick={() => handleRemoveOdds(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Odd;