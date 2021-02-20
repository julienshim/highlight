import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TemplatesContext from '../context/templates-context';
import TemplatesEditDiv from './TemplatesEditDiv';

const Templates = () => {
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
      <h1>Templates</h1>
      <h3>Add Template</h3>
      <div>
        <Link to="/templates/add">
          <p style={{ fontSize: '1.5rem' }}>
            <span>{addIcon}</span>Create a New Template
          </p>
        </Link>
      </div>
      <h3>Saved Templates</h3>
      {templates.length === 0 && (
        <div>
          <p style={{ color: 'var(--dogwood-rose)', fontWeight: 'bold' }}>
            No saved templates found.
          </p>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {templates.map((template, templateIndex) => {
          const { title, scenarios } = template;
          return (
            <div
              className="card-container"
              key={`template-${templateIndex * Date.now()}`}
              style={{
                width: '250px',
                height: '250px',
                border: '1px solid var(--english-violet)',
                margin: '6px',
              }}
            >
              <div
                className="card-div"
                style={{ position: 'relative', height: '100%' }}
              >
                <div>
                  <h3
                    style={{
                      padding: '12px 12px',
                      margin: '0',
                      backgroundColor: 'var(--english-violet)',
                      color: 'white',
                      height: '25px',
                    }}
                  >
                    {title.length <= 25 ? title : `${title.slice(0, 20)}...`}
                  </h3>
                  <div>
                    {scenarios
                      .filter((scenario, scenarioIndex) => scenarioIndex < 4)
                      .map((scenario, scenarioIndex) => (
                        <p
                          key={`scenario-${scenarioIndex * Date.now()}`}
                          style={{ padding: '6px 12px', margin: '6px 0' }}
                        >
                          {scenario.subtitle}
                        </p>
                      ))}
                    {scenarios.length >= 5 && (
                      <p style={{ padding: '6px 12px', margin: '6px 0' }}>
                        + {scenarios.length - 4} more scenario
                        {scenarios.length - 4 === 1 ? '' : 's'}
                      </p>
                    )}
                    <TemplatesEditDiv
                      templateIndex={templateIndex}
                      dispatchTemplates={dispatchTemplates}
                    />
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

export default Templates;
