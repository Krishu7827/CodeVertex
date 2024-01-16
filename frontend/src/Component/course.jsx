// Course.js
import React from 'react';

const Course = ({ title, price, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Course;
