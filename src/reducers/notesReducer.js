const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    case 'REMOVE_NOTE':
      return state.filter(
        (notes, notesIndex) => notesIndex !== action.note_refId
      );
    case 'ADD_NOTE':
      return [
        {
          refId: action.refId,
          header: action.header,
          body: action.body,
          footer: action.footer,
        },
        ...state,
      ];
    case 'EDIT_NOTE':
      return state.map((note, noteIndex) =>
        noteIndex === action.note_id
          ? {
              refId: action.refId,
              header: action.header,
              body: action.body,
              footer: action.footer,
              summary: action.summary,
            }
          : note
      );
    default:
      return state;
  }
};

export default notesReducer;
