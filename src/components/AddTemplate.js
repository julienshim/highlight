import React, { useState, useContext } from "react";
import {useHistory} from 'react-router-dom';
import TemplatesContext from "../context/templates-context";
import InlineEditTitle from "./InlineEditTitle";
import InlineEditSubtitle from "./InlineEditSubtitle";
import InlineEditContent from "./InlineEditContent";

const AddTemplate = () => {
  // eslint-disable-next-line no-unused-vars
  const { templates, dispatch } = useContext(TemplatesContext);
  const history = useHistory();

  const [title, setTitle] = useState("Enter new title");
  const [scenarios, setScenarios] = useState([
    {
      subtitle: "Enter new subtitle",
      entries: [{ content: "Enter new text", comment: "" }],
    },
  ]);

  const addTemplate = (event) => {
    event.preventDefault();
    console.log({title, scenarios})
    dispatch({
      type: "ADD_TEMPLATE",
      title: title === "" ? "Enter new title" : title,
      scenarios:
        scenarios.length === 0
          ? [
              {
                subtitle: "Enter new subtitle",
                entries: [{ content: "Enter new text", comment: "" }],
              },
            ]
          : scenarios,
    });
    history.push('/templates');
  };

  const handleScenarioChange = (newText, scenarioIndex, entryIndex, type) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].entries[entryIndex][type] = newText;
    setScenarios(newScenarios);
  };

  const handleSubtitleChange = (newText, scenariosIndex) => {
    const newScenarios = [...scenarios];
    newScenarios[scenariosIndex].subtitle = newText;
    setScenarios(newScenarios);
  };

  const handleAddNewContent = (scenarioIndex) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].entries = [
      ...newScenarios[scenarioIndex].entries,
      { content: "Enter new text", comment: "" },
    ];
    setScenarios(newScenarios);
  };

  const handleDeleteCurrentScenario = (scenarioIndex) => {
    const newScenarios = scenarios.filter(
      (scenario, index) => index !== scenarioIndex
    );
    setScenarios(newScenarios);
  };

  const handleDeleteCurrentContent = (scenarioIndex, entryIndex) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].entries = newScenarios[
      scenarioIndex
    ].entries.filter((entry, index) => index !== entryIndex);
    setScenarios(newScenarios);
  };

  const handleAddNewScenario = () => {
    setScenarios([
      ...scenarios,
      {
        subtitle: "Enter new subtitle",
        entries: [{ content: "Enter new text", comment: "" }],
      },
    ]);
  };

  return (
    <div>
      <h1 style={{ color: "var(--english-violet" }}>Create a New Template</h1>
      <form onSubmit={addTemplate}>
        <InlineEditTitle text={title} setText={setTitle} />
        {scenarios.map((scenario, scenarioIndex) => {
          const { subtitle, entries } = scenario;
          return (
            <div
              key={`scenario-${scenarioIndex}`}
              style={{
                borderLeft: "3px solid var(--blue-munsell)",
                marginLeft: "24px",
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
                      key={`entry${entryIndex}`}
                      style={{
                        borderLeft: "3px solid var(--cadet-grey)",
                        marginLeft: "48px",
                      }}
                    >
                      <InlineEditContent
                        text={content}
                        setText={handleScenarioChange}
                        deleteText={handleDeleteCurrentContent}
                        scenarioIndex={scenarioIndex}
                        entryIndex={entryIndex}
                        type={"content"}
                      />
                    </div>
                  );
                })}
                <p
                  style={{
                    display: "inline-block",
                    padding: "6px 4px",
                    fontWeight: "bold",
                    marginLeft: "48px",
                    border: "3px solid var(--cadet-grey)",
                  }}
                  onClick={() => handleAddNewContent(scenarioIndex)}
                >
                  + New Line
                </p>
              </div>
            </div>
          );
        })}
        <div>
          <p
            style={{
              display: "inline-block",
              padding: "6px 4px",
              fontWeight: "bold",
              marginLeft: "24px",
              border: "3px solid var(--blue-munsell)",
            }}
            onClick={handleAddNewScenario}
          >
            + New Section
          </p>
        </div>
        <input className="submitButton" type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddTemplate;
