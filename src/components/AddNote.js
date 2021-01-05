import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NotesContext from "../context/notes-context";
import TemplatesContext from "../context/templates-context";
import InlineEditTitle from "./InlineEditTitle";


const AddNote = () => {
  // eslint-disable-next-line no-unused-vars
  const { notes, dispatchNotes } = useContext(NotesContext);
  // eslint-disable-next-line no-unused-vars
  const { templates, dispatchTemplates } = useContext(TemplatesContext);
  const history = useHistory();

  const [refId, setRefId] = useState("Unidentified");
  const [body, setBody] = useState({});

  useEffect(() => {
    setBody(templates[0]);
  }, [templates]);

  const addNote = (event) => {
    event.preventDefault();
    dispatchNotes({
      type: "ADD_NOTE",
      refId: refId === "" ? "Unidentified" : refId,
      header: "",
      body,
      footer: "",
      summary: ""
    });
    history.push("/notes/update/0");
  };

  const handleSelectChange = (event) => {
    const targetIndex = event.target.options.selectedIndex;
    const templateIndex = event.target.options[targetIndex].dataset.ref;
    setBody(templates[templateIndex]);
  };

  return (
    <div>
      <h1 style={{ color: "var(--english-violet" }}>Create a New Note</h1>
      <InlineEditTitle text={refId} setText={setRefId} />
      <div>
        <select
          value={body.title}
          onChange={handleSelectChange}
          style={{
            outline: "none",
            border: "1px solid var(--english-violet)",
            cursor: "pointer"
          }}
        >
          {templates.map((template, templateIndex) => {
            const { title } = template;
            return (
              <option
                data-ref={templateIndex}
                key={`template${templateIndex}`}
                value={title}
              >
                {title}
              </option>
            );
          })}
        </select>
      </div>
      <form onSubmit={addNote}>
        <input className="submit-button" style={{cursor: "pointer"}} type="submit" value="Create" />
      </form>
    </div>
  );
};

export default AddNote;
