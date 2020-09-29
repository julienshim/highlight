import React, { useContext } from "react";
import CardsContext from "../../context/cards-context";

const Card = (props) => {
  const { card } = props;
  const { dispatch } = useContext(CardsContext);
  const {
    book,
    deck,
    korean,
    english,
    pronunciation,
    hanja,
    onmaster,
    card_id,
  } = card;

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
      <td>{book}</td>
      <td>{deck}</td>
      <td>{korean}</td>
      <td>{english}</td>
      <td>{pronunciation}</td>
      <td>{hanja}</td>
      <td>{onmaster}</td>
      <td>edit</td>
      <td>
        <button onClick={() => deleteCard(card_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Card;
