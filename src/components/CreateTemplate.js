import React, { useState } from "react";
import InlineEditTitle from "./InlineEditTitle";
import InlineEditSubtitle from "./InlineEditSubtitle";
import InlineEditContent from "./InlineEditContent";

const CreateTemplate = () => {
  const [title, setTitle] = useState("");
  const [scenarios, setScenarios] = useState([
    {
      subtitle: "",
      entries: [{ content: "", comment: "" }],
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      title,
      scenarios,
    });
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
      { content: "", comment: "" },
    ];
    setScenarios(newScenarios);
  };

  const handleDeleteCurrentContent = (scenarioIndex, entryIndex) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].entries = newScenarios[scenarioIndex].entries.filter((entry, index) => index !== entryIndex);
    setScenarios(newScenarios);
  };

  const handleAddNewScenario = () => {
    setScenarios([
      ...scenarios,
      {
        subtitle: "",
        entries: [{ content: "", comment: "" }],
      },
    ]);
  };

  return (
    <div>
      <h1 style={{ color: "var(--english-violet" }}>Create a New Template</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default CreateTemplate;
