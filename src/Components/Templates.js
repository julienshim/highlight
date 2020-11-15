import React, { useState } from "react";
import templateData from "../templateData";
import { Link } from "react-router-dom";

const Templates = () => {
  const [templates, setTemplates] = useState(templateData);
  return (
    <div>
      <h1>Templates</h1>
      <div>
        <Link to="/templates/add">Create a New Template</Link>
      </div>
      <div>
        <h2>Saved Templates</h2>
        {templates.map((template, index) => (
          <div key={`template-${index}`}>{template.study}</div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
