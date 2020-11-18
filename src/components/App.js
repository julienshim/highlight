import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { sampleNote, sampleTemplate } from "../sampleData";

// components
import Dashboard from "./Dashboard";
import Templates from "./Templates";
import AddTemplate from "./AddTemplate";
import EditTemplate from "./EditTemplate";
import Notes from "./Notes";
import AddNote from "./AddNote";
import EditNote from "./EditNote";

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
    component: () => <Dashboard />,
  },
  // This is for github-pages
  {
    path: "/highlight",
    exact: true,
    component: () => <Dashboard />,
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
    exact: true,
    component: () => <Notes />,
  },
  {
    path: "/notes/add",
    exact: true,
    component: () => <AddNote />,
  },
  {
    path: "/notes/update/:id",
    exact: true,
    component: () => <EditNote />,
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
    let templatesData = [];

    if (localStorage.getItem("templates") === null) {
      templatesData = sampleTemplate;
      localStorage.setItem("templates", JSON.stringify(sampleTemplate));
    } else {
      templatesData = JSON.parse(localStorage.getItem("templates"));
    }
    dispatchTemplates({ type: "POPULATE_TEMPLATES", templates: templatesData });
  };

  const getNotes = () => {
    let notesData = [];

    if (localStorage.getItem("notes") === null) {
      notesData = sampleNote;
      localStorage.setItem("notes", JSON.stringify(sampleNote));
    } else {
      notesData = JSON.parse(localStorage.getItem("notes"));
    }
    dispatchNotes({ type: "POPULATE_NOTES", notes: notesData });
  };

  useEffect(() => {
    getTemplates();
    getNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  },[templates])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes])

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div
          style={{
            padding: "32px 24px 10px 24px",
            minWidth: "100px",
            backgroundColor: "#ccc",
            // background: "var(--english-violet)",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <h3>Highlight</h3>
            </li>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/templates">Templates</Link>
            </li>
          </ul>
        </div>

        <div style={{ padding: "24px 48px", width: "100%" }}>
          <NotesContext.Provider value={{ notes, dispatchNotes }}>
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
