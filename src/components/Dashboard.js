import React, { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <div>
        <h1>Highlight</h1>
      </div>
      <p>
        Highlight allows users to create notes faster by avoiding repetivitive
        typing of same information.
      </p>
      <h2>Getting Started</h2>
      <h3>Templates</h3>
      <p>Click on 'Templates' in the left sidebar to view 'Saved Templates' or 'Create a New Template'. Templates are structured as follows:</p>
      <ul>
        <li>Template Title</li>
        <li>Section Subtitle</li>
        <li>Line Text</li>
      </ul>
      <p>Users can add multiple sections, and multiple lines of text in each section.</p>
      <h3>Notes</h3>
      <p>Click on 'Notes' in the left sidebar to view 'Saved Notes' or 'Create a New Note'. Notes are structured as follows:</p>
      <ul>
        <li>Note Identifier</li>
        <li>Template Selection</li>
      </ul>
      <p>Users can then click line subtitles or lines of text and comment in the yellow input boxes. A summary of clicked on and commented text will automatically generate at the bottom of the note.</p>
      <h2>Updates</h2>
    </Fragment>
  );
};

export default Home;
