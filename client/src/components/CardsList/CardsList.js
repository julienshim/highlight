import React, { Fragment, useContext } from "react";
import Card from "../Card/Card";
import CardsContext from "../../context/cards-context";
import "./CardsList.scss";

const ListCards = () => {
  const { cards } = useContext(CardsContext);
  return (
    <Fragment>
      <h1>Vocabulary List</h1>
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Deck</th>
            <th>Korean</th>
            <th>English</th>
            <th>Pronunciation</th>
            <th>Hanja</th>
            <th>onMaster</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <Card
              key={`card-${card.card_id}`}
              card={card}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListCards;
