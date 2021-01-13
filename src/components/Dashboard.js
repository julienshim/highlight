import React, { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <div>
        <h1>Highlight</h1>
      </div>
      <p>
        Highlight allows users to create notes faster by avoiding repetitive
        typing of same information.
      </p>
      <h2>Getting Started</h2>
      <h3>Templates</h3>
      <p>By clicking on 'Templates' on the top navigation bar, users can view 'Saved Templates' or 'Create a New Template'. Templates are structured as follows:</p>
      <ul>
        <li>Template Title</li>
        <li>Section Subtitle</li>
        <li>Line Text</li>
      </ul>
      <p>Users can multiple sections, as well as add multiple lines of text in each section.</p>
      <h3>Notes</h3>
      <p>By clicking on 'Notes' on the top navigation bar, users can view 'Saved Notes' or 'Create a New Note'. Notes are structured as follows:</p>
      <ul>
        <li>Note Identifier</li>
        <li>Template Selection</li>
      </ul>
      <p>Users can then click line subtitles or lines of text and comment in the yellow input boxes. A summary of clicked on and commented text will automatically generate at the bottom of the note. Summaries are structued as follows depending if an item is commented on:</p>
        <ul>
          <li>{"<Header>"}</li>
          <li>{"<Subtitle>: <Subtitle Comment> <Line Text> - <Line Text Comment>"}</li>
          <li>{"<Footer>"}</li>
        </ul>
        <p>Comments are unpunctuated for flexibility on user's preferences with separaters.</p>
      <h2>Updates</h2>
    </Fragment>
  );
};

export default Home;
