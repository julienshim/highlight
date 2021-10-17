import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TemplatesContext from '../context/templates-context';
// import InlineEditSubtitle from './InlineEditSubtitle';
// import InlineEditContent from './InlineEditContent';
// import AddBulkLines from './AddBulkLines';
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';
// import AddSectionButton from './AddSectionButton';

const EditTemplate = () => {
  // eslint-disable-next-line no-unused-vars
  const { templates, dispatchTemplates } = useContext(TemplatesContext);
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState('Untitled');
  const [scenarios, setScenarios] = useState([
    {
      subtitle: 'Unsubtitled',
      subtitleComments: '',
      entries: [{ content: 'Untexted', contentComments: '' }],
    },
  ]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(false);
  }, [title, scenarios]);

  useEffect(() => {
    if (templates[id]) {
      setTitle(templates[id].title);
      setScenarios(templates[id].scenarios);
    }
  }, [id, templates]);

  const handleAddTemplate = (event) => {
    event.preventDefault();
    dispatchTemplates({
      type: 'EDIT_TEMPLATE',
      template_id: parseInt(id, 10),
      title: title === '' ? 'Untitled' : title,
      scenarios:
        scenarios.length === 0
          ? [
              {
                subtitle: 'Unsubtitled',
                subtitleComments: '',
                entries: [{ content: 'Untexted', contentComments: '' }],
              },
            ]
          : scenarios,
    });
    setIsSaved(true);
    // history.push("/templates");
  };

  // const handleContentChange = (newText, scenarioIndex, entryIndex) => {
  //   const newScenarios = [...scenarios];
  //   newScenarios[scenarioIndex].entries[entryIndex].content = newText;
  //   setScenarios(newScenarios);
  // };

  // const handleSubtitleChange = (newText, scenariosIndex) => {
  //   const newScenarios = [...scenarios];
  //   newScenarios[scenariosIndex].subtitle = newText;
  //   setScenarios(newScenarios);
  // };

  // const handleAddNewContent = (scenarioIndex, contentArr) => {
  //   const newScenarios = [...scenarios];
  //   const processedContent =
  //     contentArr === null
  //       ? [{ content: 'Untexted', contentComments: '' }]
  //       : contentArr.map((content) => {
  //           const tmp = { content, contentComments: '' };
  //           return tmp;
  //         });
  //   newScenarios[scenarioIndex].entries = [
  //     ...newScenarios[scenarioIndex].entries,
  //     ...processedContent,
  //   ];
  //   setScenarios(newScenarios);
  // };

  // const handleDeleteCurrentScenario = (scenarioIndex) => {
  //   const newScenarios = scenarios.filter(
  //     (scenario, index) => index !== scenarioIndex
  //   );
  //   setScenarios(newScenarios);
  // };

  // const handleDeleteCurrentContent = (scenarioIndex, entryIndex) => {
  //   const newScenarios = [...scenarios];
  //   newScenarios[scenarioIndex].entries = newScenarios[
  //     scenarioIndex
  //   ].entries.filter((entry, index) => index !== entryIndex);
  //   setScenarios(newScenarios);
  // };

  // const handleAddNewScenario = () => {
  //   setScenarios([
  //     ...scenarios,
  //     {
  //       subtitle: 'Unsubtitled',
  //       subtitleComments: '',
  //       entries: [{ content: 'Untexted', contentComments: '' }],
  //     },
  //   ]);
  // };

  const handleDeleteTemplate = () => {
    dispatchTemplates({
      type: 'REMOVE_TEMPLATE',
      template_id: parseInt(id, 10),
    });
    history.push('/templates');
  };

  const generateValues = (arr) => {
    return arr
      .map((scenario, scenarioIndex) => {
        const { subtitle } = scenario;
        return `## ${subtitle}`;
      })
      .join('\n');
  };

  const editIcon = (
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
      className="feather feather-edit"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const previewIcon = (
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
      className="feather feather-eye"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  return (
    <div>
      <div className="title title-page">Editing {title} Template</div>
      <div
        style={{
          display: 'flex',
          width: '63px',
          justifyContent: 'space-between',
        }}
      >
        {editIcon}
        {previewIcon}
      </div>

      {/* {scenarios.map((scenario, scenarioIndex) => {
        console.log(scenarios);
        const { subtitle, entries } = scenario;
        return (
          <div
            key={`scenario-${scenarioIndex * Date.now()}`}
            style={{
              marginLeft: '24px',
            }}
          >
            <InlineEditSubtitle
              text={subtitle}
              setText={handleSubtitleChange}
              scenarioIndex={scenarioIndex}
              deleteText={handleDeleteCurrentScenario}
            />
            <div>
              {entries.map((entry, entryIndex) => {
                const { content } = entry;
                return (
                  <div
                    key={`entry${entryIndex * Date.now()}`}
                    style={{
                      marginLeft: '48px',
                    }}
                  >
                    <InlineEditContent
                      text={content}
                      setText={handleContentChange}
                      deleteText={handleDeleteCurrentContent}
                      scenarioIndex={scenarioIndex}
                      entryIndex={entryIndex}
                    />
                  </div>
                );
              })}
              <AddBulkLines
                scenarioIndex={scenarioIndex}
                handleAddNewContent={handleAddNewContent}
              />
            </div>
          </div>
        );
      })} 
      <div>
        <AddSectionButton handleAddNewScenario={handleAddNewScenario} />
      </div> */}
      <textarea value={generateValues(scenarios)} />
      <form onSubmit={handleAddTemplate}>
        <SaveButton isSaved={isSaved} />
      </form>
      <DeleteButton deleteAction={handleDeleteTemplate} type="template" />
    </div>
  );
};

export default EditTemplate;
