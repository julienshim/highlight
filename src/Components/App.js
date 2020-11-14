import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Templates from "./Templates";
import CreateTemplate from "./CreateTemplate";
import Notes from './Notes';

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
    component: () => <CreateTemplate />,
  },
  {
    path: "/notes",
    component: () => <Notes />,
  },
  {
    path: "/",
    component: () => <div>404</div>,
  },
];

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            padding: "10px",
            minWidth: "200px",
            background: "#f0f0f0",
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

        <div style={{padding: "10px", width: "100%" }}>
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
        </div>
      </div>
    </Router>
  );
}
