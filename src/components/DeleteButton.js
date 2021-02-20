import React, { Fragment, useState } from 'react';

const DeleteButton = (props) => {
  const { deleteAction, type } = props;
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <Fragment>
      {!isConfirming ? (
        <div
          className="delete-button"
          style={{
            marginTop: '50px',
            cursor: 'pointer',
            color: 'var(--dogwood-rose)',
          }}
          onClick={() => setIsConfirming(true)}
          onKeyUp={() => setIsConfirming(true)}
          role="button"
          tabIndex={0}
        >
          Delete {type.slice(0, 1).toUpperCase() + type.slice(1)}
        </div>
      ) : (
        <div style={{ marginTop: '50px' }}>
          <p
            style={{
              fontWeight: 'bold',
              color: 'var(--dogwood-rose)',
            }}
          >
            Delete this {type}?
          </p>
          <div style={{ display: 'flex', cursor: 'pointer' }}>
            <div
              className="confirm-button"
              style={{
                padding: '12px 24px',
                fontSize: '0.8rem',
                margin: '0 3px',
                backgroundColor: 'var(--cadet-grey)',
              }}
              onClick={() => setIsConfirming(false)}
              onKeyUp={() => setIsConfirming(false)}
              role="button"
              tabIndex={0}
            >
              Cancel
            </div>
            <div
              className="confirm-button"
              style={{
                padding: '12px 24px',
                fontSize: '0.8rem',
                margin: '0 3px',
                color: 'white',
                backgroundColor: 'var(--dogwood-rose)',
              }}
              onClick={() => deleteAction()}
              onKeyUp={() => deleteAction()}
              role="button"
              tabIndex={0}
            >
              Yes, delete it.
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DeleteButton;
