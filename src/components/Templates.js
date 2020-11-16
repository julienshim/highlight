import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import TemplatesContext from "../context/templates-context";

const Templates = () => {
  const { templates, dispatch } = useContext(TemplatesContext);
  const history = useHistory();

  const deleteTemplate = (templateIndex) => {
    dispatch({
      type: 'REMOVE_TEMPLATE',
      template_id: templateIndex
    })
  }

  return (
    <div>
      <h1>Templates</h1>
      <div>
        <Link to="/templates/add">Create a New Template</Link>
      </div>
      <h2>Saved Templates</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {templates.map((template, templateIndex) => {
          const { title, scenarios } = template;
          return (
            <div
              className="card"
              key={`template-${templateIndex}`}
              style={{ flexGrow: "1" }}
            >
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3
                    style={{
                      padding: "12px 12px",
                      margin: "0",
                    }}
                  >
                    {title}
                  </h3>
                  <span
                    onClick={() => deleteTemplate(templateIndex)}
                  >
                    delete
                  </span>
                </div>
                <div>
                  {scenarios.map((scenario, scenarioIndex) => (
                    <p key={`scenario-${scenarioIndex}`}style={{ padding: "3px 12px" }}>{scenario.subtitle}</p>
                  ))}
                </div>
              </div>
              <div
                style={{
                  color: "red",
                  backgroundColor: "green",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
