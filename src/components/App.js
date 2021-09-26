import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { sampleNote, sampleTemplate, sampleChecklist } from '../sampleData';

// components
import Templates from './Templates';
import AddTemplate from './AddTemplate';
import EditTemplate from './EditTemplate';
import Notes from './Notes';
import AddNote from './AddNote';
import EditNote from './EditNote';
import Checklists from './Checklists';
import AddChecklist from './AddChecklist';
import EditChecklist from './EditChecklist';

// reducers
import templatesReducer from '../reducers/templatesReducer';
import notesReducer from '../reducers/notesReducer';
import checklistsReducer from '../reducers/checklistsReducer';

// context
import TemplatesContext from '../context/templates-context';
import NotesContext from '../context/notes-context';
import ChecklistsContext from '../context/checklists-context';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Notes />,
  },
  {
    path: '/templates',
    exact: true,
    component: () => <Templates />,
  },
  {
    path: '/templates/add',
    exact: true,
    component: () => <AddTemplate />,
  },
  {
    path: '/templates/update/:id',
    exact: true,
    component: () => <EditTemplate />,
  },
  {
    path: '/notes',
    exact: true,
    component: () => <Notes />,
  },
  {
    path: '/notes/add',
    exact: true,
    component: () => <AddNote />,
  },
  {
    path: '/notes/update/:id',
    exact: true,
    component: () => <EditNote />,
  },
  {
    path: '/checklists',
    exact: true,
    component: () => <Checklists />,
  },
  {
    path: '/checklists/add',
    exact: true,
    component: () => <AddChecklist />,
  },
  {
    path: '/checklists/update/:id',
    exact: true,
    component: () => <EditChecklist />,
  },
  {
    path: '*',
    component: () => <div>404</div>,
  },
];

export default function App() {
  const [templates, dispatchTemplates] = useReducer(templatesReducer, []);
  const [notes, dispatchNotes] = useReducer(notesReducer, []);
  const [checklists, dispatchChecklists] = useReducer(checklistsReducer, []);

  const getTemplates = () => {
    let templatesData = [];

    if (localStorage.getItem('templates') === null) {
      templatesData = sampleTemplate;
      localStorage.setItem('templates', JSON.stringify(sampleTemplate));
    } else {
      templatesData = JSON.parse(localStorage.getItem('templates'));
    }
    dispatchTemplates({ type: 'POPULATE_TEMPLATES', templates: templatesData });
  };

  const getNotes = () => {
    let notesData = [];

    if (localStorage.getItem('notes') === null) {
      notesData = sampleNote;
      localStorage.setItem('notes', JSON.stringify(sampleNote));
    } else {
      notesData = JSON.parse(localStorage.getItem('notes'));
    }
    dispatchNotes({ type: 'POPULATE_NOTES', notes: notesData });
  };

  const getChecklists = () => {
    let checklistsData = [];

    if (localStorage.getItem('checklists') === null) {
      checklistsData = sampleChecklist;
      localStorage.setItem('checklists', JSON.stringify(sampleChecklist));
    } else {
      checklistsData = JSON.parse(localStorage.getItem('checklists'));
    }
    dispatchChecklists({
      type: 'POPULATE_CHECKLISTS',
      checklists: checklistsData,
    });
  };

  useEffect(() => {
    getTemplates();
    getNotes();
    getChecklists();
  }, []);

  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('checklists', JSON.stringify(checklists));
  }, [checklists]);

  return (
    <Router basename="/highlight">
      {/* <div style={{ display: "flex", minHeight: "100vh" }}> */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 24px',
            backgroundColor: '#ccc',
            // background: "var(--english-violet)",
          }}
        >
          <h3>Highlight</h3>
          <ul
            style={{
              display: 'flex',
              paddingTop: '6px',
              justifyContent: 'space-between',
              width: '325px',
              listStyleType: 'none',
            }}
          >
            <li>
              <Link to="/checklists">Checklists</Link>
            </li>
            <li>
              <Link to="/templates">Templates</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
          </ul>
        </div>

        <div style={{ padding: '24px 48px' }}>
          <NotesContext.Provider value={{ notes, dispatchNotes }}>
            <TemplatesContext.Provider value={{ templates, dispatchTemplates }}>
              <ChecklistsContext.Provider
                value={{ checklists, dispatchChecklists }}
              >
                <Switch>
                  {routes.map((route, index) => (
                    <Route
                      key={`route-${index * Date.now()}`}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </ChecklistsContext.Provider>
            </TemplatesContext.Provider>
          </NotesContext.Provider>
        </div>
      </div>
    </Router>
  );
}
