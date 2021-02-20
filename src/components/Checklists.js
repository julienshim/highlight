import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ChecklistsContext from '../context/checklists-context';
// import ChecklistsEditDiv from './ChecklistsEditDiv';

const Checklists = () => {
  // eslint-disable-next-line no-unused-vars
  const { checklists, dispatchChecklists } = useContext(ChecklistsContext);

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
      <h1>Checklists</h1>
      <h3>Add Checklist</h3>
      <div>
        <Link to="/checklists/add">
          <p style={{ fontSize: '1.5rem' }}>
            <span>{addIcon}</span>Create a New Checklist
          </p>
        </Link>
      </div>
      <h3>Saved Checklists</h3>
      {checklists.length === 0 && (
        <div>
          <p style={{ color: 'var(--dogwood-rose)', fontWeight: 'bold' }}>
            No saved checklists found.
          </p>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }} />
    </div>
  );
};

export default Checklists;
