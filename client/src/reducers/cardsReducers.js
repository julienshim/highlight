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
          book: action.book,
          deck: action.deck,
          korean: action.deck,
          english: action.english,
          pronunciation: action.pronunciation,
          hanja: action.hanja,
          onmaster: action.onMaster,
        },
      ];
    default:
      return state;
  }
};

export default cardsReducer;
