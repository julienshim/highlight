import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import NotesContext from "../context/notes-context";

const Notes = () => {
  // eslint-disable-next-line no-unused-vars
  const { notes, dispatchNotes } = useContext(NotesContext);
  const history = useHistory();

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z" />
    </svg>
  );

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
      <div>
        <Link to="/notes/add">
          <h2>
            <span>{addIcon}</span>Create a New Note
          </h2>
        </Link>
      </div>
      <h3>Saved Notes</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes.map((note, noteIndex) => {
          const { refId, body } = note;
          const { title } = body;
          return (
            <div
              className="card-container"
              key={`note-${noteIndex}`}
              style={{
                width: "250px",
                border: "1px solid var(--blue-munsell)",
                margin: "6px",
              }}
            >
              <div
                className="card-div"
                style={{ position: "relative", height: "100%" }}
              >
                <div style={{}}>
                  <h3
                    style={{
                      padding: "12px 12px",
                      margin: "0",
                      backgroundColor: "var(--blue-munsell)",
                      color: "white",
                    }}
                  >
                    {refId}
                  </h3>
                  <div>
                    <p style={{ padding: "6px 12px", margin: "6px 0" }}>
                      {title}
                    </p>
                  </div>
                </div>
                <div
                  className="edit-div"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "var(--cadet-grey)",
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{}}
                      onClick={() => history.push(`/notes/update/${noteIndex}`)}
                    >
                      {editIcon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
