import React from 'react';
import axios from 'axios';

function Vote() {
  const vote = async (candidate) => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/vote', { candidate }, {
      headers: { Authorization: token }
    });
    alert('Vote casted!');
  };

  return (
    <div>
      <h2>Vote</h2>
      <button onClick={() => vote('A')}>Candidate A</button>
      <button onClick={() => vote('B')}>Candidate B</button>
    </div>
  );
}

export default Vote;