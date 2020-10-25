const cardsReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_CARDS":
      return action.cards;
    case "REMOVE_CARD":
      return state.filter((card) => card.card_id !== action.card_id);
    case "ADD_CARD":
      return [
        ...state,
        {
          card_id: action.card_id,
          deck: action.deck,
          korean: action.korean,
          english: action.english,
          hanja: action.hanja,
          onmaster: action.onMaster,
        },
      ];
    case "EDIT_CARD":
      return state.map((card => card.card_id === action.card_id ? {
        card_id: action.card_id,
        deck: action.deck,
        korean: action.korean,
        english: action.english,
        hanja: action.hanja,
        onmaster: action.onMaster,
      } : card))
    default:
      return state;
  }
};

export default cardsReducer;
