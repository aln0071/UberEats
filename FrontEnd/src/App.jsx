import React, { useEffect } from 'react';
import './App.css';

const getApi = () => {
  const url = 'http://localhost:3001';
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="App">
      <h1> Hello, World! </h1>
    </div>
  );
};

export default App;
