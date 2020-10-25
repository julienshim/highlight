import React, { Fragment, useState, useContext } from "react";
import CardsContext from "../../context/cards-context";
import "./AddCardForm.scss";

const AddCardForm = () => {
  const { cards, dispatch } = useContext(CardsContext);

  const [deck, setDeck] = useState("");
  const [korean, setKorean] = useState("");
  const [english, setEnglish] = useState("");
  const [hanja, setHanja] = useState("");
  const [onMaster, setOnMaster] = useState(false);

  const addCard = async (e) => {
    e.preventDefault();
    try {
      const body = {
        deck,
        korean,
        english,
        hanja,
        onMaster: !onMaster ? false : true,
      };
      const uri = "http://localhost:5000/cards/add";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(uri, options);
      const jsonData = await response.json();
      if (response) {
        dispatch({
          type: "ADD_CARD",
          card_id: jsonData.card_id,
          deck,
          korean,
          english,
          hanja,
          onMaster: !onMaster ? false : true,
        });
      }
      setDeck(Math.ceil(cards.length / 30));
      setKorean("");
      setEnglish("");
      setHanja("");
      setOnMaster(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form onSubmit={addCard}>
        <table>
          <tbody>
            <tr style={{ backgroundColor: "red" }}>
              <td>
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={deck}
                    onChange={(e) => setDeck(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={korean}
                    onChange={(e) => setKorean(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <div className="inline-container">
                  <input
                    className="form-input"
                    type="text"
                    value={hanja}
                    onChange={(e) => setHanja(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={onMaster}
                    onChange={() => setOnMaster(!onMaster)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <button>Add</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Fragment>
  );
};

export default AddCardForm;
