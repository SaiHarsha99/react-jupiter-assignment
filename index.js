import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';

const App = () => {
  const [dataarr, setDatarr] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [isnextpage, setisnextpage] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://612c49f2ab461c00178b5c4c.mockapi.io/api/jm/intv/contacts-${page}`
      )
      .then((res) => {
        setDatarr(res.data.data);
        setisnextpage(res.data.next);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [page]);

  const handlePagination = () => {
    setPage(page + 1);
  };

  const handleSort = () => {
    let data = dataarr
    data.sort((a,b) => {return a.first_name<b.first_name ? -1 : 1})
    setDatarr([...data])
  }

  return (
    <>
      {!error && dataarr.length == 0 && 'Loading'}
      {!error
        ? dataarr.map((x) => {
            return (
              <div>
                <span>
                  {x.first_name} {x.last_name}
                </span>
                <img src={x.image} height="50" width="50" />
              </div>
            );
          })
        : error}
      {isnextpage && (
        <div>
          <button onClick={handlePagination}>Next</button>
          <button onClick={handleSort}>Sort</button>
        </div>
      )}
    </>
  );
};

render(<App />, document.getElementById('root'));
