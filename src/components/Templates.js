import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TemplatesContext from '../context/templates-context';

const Templates = () => {
  // eslint-disable-next-line no-unused-vars
  const { templates, dispatchTemplates } = useContext(TemplatesContext);
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

  return (
    <div>
      <div
        className="title-page-container"
        style={{
          width: '110px',
        }}
      >
        <div className="title title-page">Templates</div>
        <div>
          <Link to="/notes/add">{addIcon}</Link>
        </div>
      </div>
      {/* If no templates */}
      {templates.length === 0 ? (
        <div className="warning mt-40">No saved templates.found.</div>
      ) : (
        <div className="mt-40">
          {templates.map((template, templateIndex) => {
            const { title } = template;
            return (
              <div
                className="card-container"
                key={`participant-${templateIndex * Date.now()}`}
                onClick={() =>
                  history.push(`/templates/update/${templateIndex}`)
                }
                onKeyUp={() =>
                  history.push(`/templates/update/${templateIndex}`)
                }
                role="button"
                tabIndex={0}
              >
                <div className="card-subcontainer-max-t">{title}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Templates;
