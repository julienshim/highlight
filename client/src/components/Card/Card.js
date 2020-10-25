import React, { useContext, useState, useEffect, useCallback } from "react";
import CardsContext from "../../context/cards-context";
import InlineEdit from "../InlineEdit/InlineEdit";
import "./Card.scss";

const Card = (props) => {
  const { card } = props;

  const { dispatch } = useContext(CardsContext);

  const [deck, setDeck] = useState(card.deck);
  const [korean, setKorean] = useState(card.korean);
  const [english, setEnglish] = useState(card.english);
  const [hanja, setHanja] = useState(card.hanja || '');
  const [onmaster, setOnMaster] = useState(card.onmaster);

  const updateCard = useCallback(async (card_id) => {
    try {
      const body = {
        deck,
        korean,
        english,
        hanja,
        onmaster,
      };
      const uri = `http://localhost:5000/cards/update/${card_id}`;
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const response = await fetch(uri, options);
      if (response) {
        dispatch({
          type: "EDIT_CARD",
          deck,
          korean,
          english,
          hanja,
          onmaster,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  },[deck, korean, english, hanja, onmaster, dispatch]);

  const deleteCard = async (card_id) => {
    try {
      const uri = `http://localhost:5000/cards/delete/${card_id}`;
      const options = {
        method: "DELETE",
      };
      const response = await fetch(uri, options);
      if (response) {
        dispatch({ type: "REMOVE_CARD", card_id });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    updateCard(card.card_id);
  }, [card.card_id, updateCard]);

  return (
    <tr>
      <td>
        <InlineEdit text={deck} setText={setDeck} />
      </td>
      <td>
        <InlineEdit text={korean} setText={setKorean} />
      </td>
      <td>
        <InlineEdit text={english} setText={setEnglish} />
      </td>
      <td>
        <InlineEdit text={hanja} setText={setHanja} />
      </td>
      <td>
        <div className="inline-container">
          <input
            type="checkbox"
            checked={onmaster}
            onChange={() => setOnMaster(!onmaster)}
          />
        </div>
      </td>

      <td>
        <div className="inline-container">
          <button onClick={() => deleteCard(card.card_id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default Card;
