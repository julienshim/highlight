import React, { Fragment, useState } from "react";

const DeleteButton = (props) => {
  const { handleDeleteTemplate } = props;
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <Fragment>
      {!isConfirming ? (
        <p
          className="delete-button"
          style={{
            marginTop: "50px",
            cursor: "pointer",
            color: "var(--dogwood-rose)",
          }}
          onClick={() => setIsConfirming(true)}
        >
          Delete Template
        </p>
      ) : (
        <div style={{ marginTop: "50px" }}>
          <p
            style={{
              fontWeight: "bold",
              color: "var(--dogwood-rose)",
            }}
          >
            Delete this template?
          </p>
          <div style={{ display: "flex", cursor: "pointer" }}>
            <p
              className="confirm-button"
              style={{
                padding: "12px 24px",
                fontSize: "0.8rem",
                margin: "0 3px",
                backgroundColor: "var(--cadet-grey)",
              }}
              onClick={() => setIsConfirming(false)}
            >
              Cancel
            </p>
            <p
              className="confirm-button"
              style={{
                padding: "12px 24px",
                fontSize: "0.8rem",
                margin: "0 3px",
                color: "white",
                backgroundColor: "var(--dogwood-rose)",
              }}
              onClick={() => handleDeleteTemplate()}
            >
              Yes, delete it.
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DeleteButton;
