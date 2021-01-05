import React from 'react';

const SaveButton = (props) => {
    const { isSaved } = props;

    const savedStyle = { 
        backgroundColor: "var(--english-violet)",
        color: "white"
      }
    return (
        <input className="submit-button" style={isSaved ? savedStyle : {}} type="submit" value={isSaved ? "Changes Saved" : "Save"} />
    )
};

export default SaveButton;