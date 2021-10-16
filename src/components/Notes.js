import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NotesContext from '../context/notes-context';
// import NotesEditDiv from './NotesEditDiv';

const Notes = () => {
  const { notes } = useContext(NotesContext);
  const history = useHistory();

  const addIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-plus-circle"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );

  const formatParticipantName = (fullN) => {
    const [firstN, lastN] = fullN.split(' ');
    return `${lastN}, ${firstN[0]}.`;
  };

  return (
    <div>
      <div
        className="title-page-container"
        style={{
          width: '110px',
        }}
      >
        <div className="title title-page">Notes</div>
        <div>
          <Link to="/notes/add">{addIcon}</Link>
        </div>
      </div>
      {/* If no notes */}
      {notes.length === 0 ? (
        <div className="warning mt-40">No saved notes found.</div>
      ) : (
        <div className="mt-40">
          {notes.map((study, studyId) => {
            const { studyName, participants } = study;
            return (
              <div>
                <div className="title">{studyName}</div>
                <div className="participants-container mt-40">
                  {participants.map((participant, participantIndex) => {
                    return (
                      <div
                        className="card-container"
                        key={`participant-${participantIndex * Date.now()}`}
                        onClick={() =>
                          history.push(
                            `/notes/update/${studyId}/${participantIndex}`
                          )
                        }
                        onKeyUp={() =>
                          history.push(
                            `/notes/update/${studyId}/${participantIndex}`
                          )
                        }
                        role="button"
                        tabIndex={0}
                      >
                        <div className="card-subcontainer">
                          {formatParticipantName(participant.participantName)}
                        </div>
                        <div className="card-subcontainer">
                          {participant.refId}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notes;
