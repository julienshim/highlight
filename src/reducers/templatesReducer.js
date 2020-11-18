const templatesReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_TEMPLATES":
      return action.templates;
    case "REMOVE_TEMPLATE":
      return state.filter((template, templateIndex) => templateIndex !== action.template_id);
    case "ADD_TEMPLATE":
      return [
        {
          title: action.title,
          scenarios: action.scenarios,
        },
        ...state,
      ];
    case "EDIT_TEMPLATE":
      return state.map((template, templateIndex) => templateIndex === action.template_id ? {
        title: action.title,
        scenarios: action.scenarios
      } : template)
    default:
      return state;
  }
};

export default templatesReducer;
