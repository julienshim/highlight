import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../context/notes-context';
import TemplatesContext from '../context/templates-context';
import NotesEditDiv from './NotesEditDiv';

const Notes = () => {
  // eslint-disable-next-line no-unused-vars
  const { notes, dispatchNotes } = useContext(NotesContext);
  // eslint-disable-next-line no-unused-vars
  const { templates, dispatchTemplates } = useContext(TemplatesContext);

  const addIcon = (
    <svg
      className="add-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" />
    </svg>
  );

  return (
    <div>
      <h1>Notes</h1>
      <h3>Add Note</h3>
      {templates !== 0 ? (
        <div>
          <Link to="/notes/add">
            <p style={{ fontSize: '1.5rem' }}>
              <span>{addIcon}</span>Create a New Note
            </p>
          </Link>
        </div>
      ) : (
        <div>
          <p style={{ color: 'var(--dogwood-rose)', fontWeight: 'bold' }}>
            Before you can create a new note. You must create a template first.
          </p>
        </div>
      )}
      <h3>Saved Notes</h3>
      {notes.length === 0 && (
        <div>
          <p style={{ color: 'var(--dogwood-rose)', fontWeight: 'bold' }}>
            No saved notes found.
          </p>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {notes.map((note, noteIndex) => {
          const { refId, body } = note;
          const { title } = body;
          return (
            <div
              className="card-container"
              key={`note-${noteIndex * Date.now()}`}
              style={{
                width: '250px',
                height: '250px',
                border: '1px solid var(--blue-munsell)',
                margin: '6px',
              }}
            >
              <div
                className="card-div"
                style={{ position: 'relative', height: '100%' }}
              >
                <div style={{}}>
                  <h3
                    style={{
                      padding: '12px 12px',
                      margin: '0',
                      backgroundColor: 'var(--blue-munsell)',
                      color: 'white',
                      height: '25px',
                    }}
                  >
                    {refId}
                  </h3>
                  <div>
                    <p style={{ padding: '6px 12px', margin: '6px 0' }}>
                      {title}
                    </p>
                  </div>
                </div>
                <NotesEditDiv
                  noteIndex={noteIndex}
                  dispatchNotes={dispatchNotes}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
