const checklistsReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_CHECKLISTS':
      return action.checklists;
    case 'REMOVE_CHECKLIST':
      return state.filter(
        (checklist, checklistIndex) => checklistIndex !== action.checklist_id
      );
    case 'ADD_CHECKLIST':
      return [
        {
          title: action.title,
          scenarios: action.scenarios,
        },
        ...state,
      ];
    case 'EDIT_CHECKLIST':
      return state.map((checklist, checklistIndex) =>
        checklistIndex === action.checklist_id
          ? {
              title: action.title,
              scenarios: action.scenarios,
            }
          : checklist
      );
    default:
      return state;
  }
};

export default checklistsReducer;
