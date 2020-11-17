import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import templateData from "../templateData";
import noteData from "../noteData";

// components
import Home from "./Home";
import Templates from "./Templates";
import AddTemplate from "./AddTemplate";
import EditTemplate from "./EditTemplate";
import Notes from "./Notes";

// reducers
import templatesReducer from "../reducers/templatesReducer";
import notesReducer from "../reducers/notesReducer";

// context
import TemplatesContext from "../context/templates-context";
import NotesContext from "../context/notes-context";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/templates",
    exact: true,
    component: () => <Templates />,
  },
  {
    path: "/templates/add",
    exact: true,
    component: () => <AddTemplate />,
  },
  {
    path: "/templates/update/:id",
    exact: true,
    component: () => <EditTemplate />,
  },
  {
    path: "/notes",
    component: () => <Notes />,
  },
  {
    path: "*",
    component: () => <div>404</div>,
  },
];

export default function App() {
  const [templates, dispatchTemplates] = useReducer(templatesReducer, []);
  const [notes, dispatchNotes] = useReducer(notesReducer, []);

  const getTemplates = () => {
    dispatchTemplates({ type: "POPULATE_TEMPLATES", templates: templateData });
  };

  const getNotes = () => {
    dispatchNotes({ type: "POPULATE_NOTES", notes: noteData});
  }

  useEffect(() => {
    // console.log(templateData)
    getTemplates();
    getNotes();
  }, []);

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div
          style={{
            padding: "10px",
            minWidth: "200px",
            background: "var(--english-violet)",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Shorthand App</Link>
            </li>
            <li>
              <Link to="/templates">Templates</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
          </ul>
        </div>

        <div style={{ padding: "24px 48px", width: "100%" }}>
          <NotesContext.Provider value={{ notes, dispatchNotes}}>
          <TemplatesContext.Provider value={{ templates, dispatchTemplates }}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </TemplatesContext.Provider>
          </NotesContext.Provider>
        </div>
      </div>
    </Router>
  );
}
