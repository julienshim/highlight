import React, { useEffect, useReducer } from "react";
import "./App.scss";

// components
import AddCardForm from "../AddCardForm/AddCardForm";
import CardsList from "../CardsList/CardsList";

// reducers
import cardsReducer from "../../reducers/cardsReducers";

// context
import CardsContext from "../../context/cards-context";

function App() {
  const [cards, dispatch] = useReducer(cardsReducer, []);

  const getCards = async () => {
    try {
      const uri = "http://localhost:5000/cards/";
      const response = await fetch(uri);
      const jsonData = await response.json();
      dispatch({ type: "POPULATE_CARDS", cards: jsonData });
    } catch (err) {
      console.error(err.messsage);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        dispatch,
      }}
    >
      <AddCardForm />
      <CardsList />
    </CardsContext.Provider>
  );
}

export default App;
