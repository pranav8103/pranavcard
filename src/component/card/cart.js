import React, { useEffect, useState } from "react";
import "./cart.css";

const Cart = () => {
  const [warsData, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data.results);
        setDisplayedData(data.results.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const removeCard = (indexToRemove) => {
    setDisplayedData(
      displayedData.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="container">
      {displayedData.map((item, index) => (
        <div className="Star-Wars" key={index}>
          <img
            src={`images/star-wars.jpeg`}
            alt={item.name}
            className="poster"
          />
          <div className="wars-details">
            <div className="box">
              <h4 className="name">{item.name}</h4>
              <p className="height">{item.height} cm</p>
            </div>
            <div className="film-names">
              <h1>{item.films.length} Films</h1>
            </div>
            {displayedData.length > 3 && (
              <div className="close-icon" onClick={() => removeCard(index)}>
                X
              </div>
            )}
          </div>
        </div>
      ))}
      {warsData.length > displayedData.length && (
        <div className="button-container">
          <button
            onClick={() =>
              setDisplayedData(warsData.slice(0, displayedData.length + 1))
            }
          >
            Add Card
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;