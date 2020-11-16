import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import templateData from "../templateData";

// components
import Home from "./Home";
import Templates from "./Templates";
import AddTemplate from "./AddTemplate";
// import UpdateTemplate from "./UpdateTemplate";
import Notes from "./Notes";

// reducers
import templatesReducer from "../reducers/templatesReducer";

// context
import TemplatesContext from "../context/templates-context";

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
  // {
  //   path: "/templates/update/:id",
  //   exact: true,
  //   component: () => <UpdateTemplate />,
  // },
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
  const [templates, dispatch] = useReducer(templatesReducer, []);

  const getTemplates = () => {
    dispatch({ type: "POPULATE_TEMPLATES", templates: templateData });
  };

  useEffect(() => {
    // console.log(templateData)
    getTemplates();
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
          <TemplatesContext.Provider value={{ templates, dispatch }}>
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
        </div>
      </div>
    </Router>
  );
}
