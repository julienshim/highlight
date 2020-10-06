import React, { useContext, useState, useEffect } from "react";
import CardsContext from "../../context/cards-context";
import InlineEdit from "../InlineEdit/InlineEdit";

const Card = (props) => {
  const { card } = props;

  const { dispatch } = useContext(CardsContext);

  const [ book, setBook ] = useState(card.book);
  const [ deck, setDeck ] = useState(card.deck);
  const [ korean, setKorean ] = useState(card.korean);
  const [ english, setEnglish ] = useState(card.english);
  const [ pronunciation, setPronunciation ] = useState(card.pronunciation);
  const [ hanja, setHanja ] = useState(card.hanja);
  const [ onmaster, setOnMaster ] = useState(card.onmaster);

  useEffect(() => {
    updateCard(card.card_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, deck, korean, english, pronunciation, hanja, onmaster]);

  const updateCard = async (card_id) => {
    try {
      const body = {book, deck, korean, english, pronunciation, hanja, onmaster};
      const uri = `http://localhost:5000/cards/update/${card_id}`
      const options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      }
      const response  = await fetch(uri, options);
      console.log(response)
      if (response) {
        dispatch({type: "EDIT_CARD", book, deck, korean, english, pronunciation, hanja, onmaster})
      }
    } catch (err) {
      console.error(err.message);
    }
  }

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

  return (
    <tr>
      <td><InlineEdit text={book} setText={setBook}/></td>
      <td><InlineEdit text={deck} setText={setDeck}/></td>
      <td><InlineEdit text={korean} setText={setKorean}/></td>
      <td><InlineEdit text={english} setText={setEnglish}/></td>
      <td><InlineEdit text={pronunciation} setText={setPronunciation}/></td>
      <td><InlineEdit text={hanja} setText={setHanja}/></td>
      <td><input type="checkbox" checked={onmaster} onChange={() => setOnMaster(!onmaster)}/></td>
      <td>
        <button onClick={() => deleteCard(card.card_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Card;
