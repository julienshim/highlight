import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TemplatesContext from "../context/templates-context";
import InlineEditTitle from "./InlineEditTitle";
import InlineEditSubtitle from "./InlineEditSubtitle";
import InlineEditContent from "./InlineEditContent";
import AddBulkLines from "./AddBulkLines";


const AddTemplate = () => {
  // eslint-disable-next-line no-unused-vars
  const { templates, dispatchTemplates } = useContext(TemplatesContext);
  const history = useHistory();

  const [title, setTitle] = useState("Untitled");
  const [scenarios, setScenarios] = useState([
    {
      subtitle: "Unsubtitled",
      subtitleComments: "",
      entries: [
        { content: "Untexted", contentComments: "" },
      ],
    },
  ]);

  const addTemplate = (event) => {
    event.preventDefault();
    dispatchTemplates({
      type: "ADD_TEMPLATE",
      title: title === "" ? "Untitled" : title,
      scenarios:
        scenarios.length === 0
          ? [
              {
                subtitle: "Unsubtitled",
                subtitleComments: "",
                entries: [{ content: "Untexted", contentComments: "" }],
              },
            ]
          : scenarios,
    });
    history.push("/templates");
  };

  const handleContentChange = (newText, scenarioIndex, entryIndex) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].entries[entryIndex].content = newText;
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
      { content: "Untexted", contentComments: "" },
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
        subtitle: "Unsubtitled",
        subtitleComments: "",
        entries: [
          { content: "Untexted", contentComments: "" },
        ]
      },
    ]);
  };

  return (
    <div>
      <h1 style={{ color: "var(--english-violet" }}>Create a New Template</h1>
      <InlineEditTitle text={title} setText={setTitle} />
      {scenarios.map((scenario, scenarioIndex) => {
        const { subtitle, entries } = scenario;
        return (
          <div
            key={`scenario-${scenarioIndex}`}
            style={{
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
                      marginLeft: "48px",
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
              <AddBulkLines scenarioIndex={scenarioIndex} handleAddNewContent={handleAddNewContent}/>
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
            marginLeft: "72px",
            border: "3px solid var(--blue-munsell)",
          }}
          onClick={handleAddNewScenario}
        >
          + New Section
        </p>
      </div>
      <form onSubmit={addTemplate}>
        <input className="submitButton" type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddTemplate;
