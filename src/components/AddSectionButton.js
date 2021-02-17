import React from 'react';

const AddSectionButton = (props) => {
  const { handleAddNewScenario } = props;
  return (
    <div
      className="add-section-button"
      style={{
        display: 'inline-block',
        boxSizing: 'border-box',
        fontSize: '0.8rem',
        padding: '12px 24px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginLeft: '72px',
        border: '2px solid var(--blue-munsell)',
      }}
      onClick={() => handleAddNewScenario()}
      onKeyUp={() => handleAddNewScenario()}
      role="button"
      tabIndex={0}
    >
      New Section
    </div>
  );
};

export default AddSectionButton;
