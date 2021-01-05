import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import TemplatesContext from "../context/templates-context";

const Templates = () => {
  // eslint-disable-next-line no-unused-vars
  const { templates, dispatchTemplates } = useContext(TemplatesContext);
  const history = useHistory();

  const editIcon = (
    <svg
      className="edit-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z" />
    </svg>
  );

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

  const trashIcon = (
    <svg className="trash-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
  )

  return (
    <div>
      <h1>Templates</h1>
      <h3>Add Template</h3>
      <div>
        <Link to="/templates/add">
          <h2>
            <span>{addIcon}</span>Create a New Template
          </h2>
        </Link>
      </div>
      <h3>Saved Templates</h3>
      {(templates.length === 0) && (
        <div>
          <p style={{ color: "var(--dogwood-rose)", fontWeight: "bold" }}>
            No saved templates found.
          </p>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {templates.map((template, templateIndex) => {
          const { title, scenarios } = template;
          return (
            <div
              className="card-container"
              key={`template-${templateIndex}`}
              style={{
                width: "250px",
                border: "1px solid var(--english-violet)",
                margin: "6px",
              }}
            >
              <div
                className="card-div"
                style={{ position: "relative", height: "100%" }}
              >
                <div style={{}}>
                  <h3
                    style={{
                      padding: "12px 12px",
                      margin: "0",
                      backgroundColor: "var(--english-violet)",
                      color: "white",
                    }}
                  >
                    {title}
                  </h3>
                  <div>
                    {scenarios.map((scenario, scenarioIndex) => (
                      <p
                        key={`scenario-${scenarioIndex}`}
                        style={{ padding: "6px 12px", margin: "6px 0" }}
                      >
                        {scenario.subtitle}
                      </p>
                    ))}
                  </div>
                </div>
                <div
                  className="edit-div"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "var(--cadet-grey)",
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        margin: "0 24px"
                      }}
                      onClick={() =>
                        history.push(`/templates/update/${templateIndex}`)
                      }
                    >
                      {editIcon}
                    </div>
                    <div style={{cursor: "pointer", margin: "0 24px"}}>{trashIcon}</div>
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
