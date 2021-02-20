import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

const TemplatesEditDiv = (props) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const { templateIndex, dispatchTemplates } = props;

  const history = useHistory();

  const handleDeleteTemplate = (elementIndex) => {
    dispatchTemplates({
      type: 'REMOVE_TEMPLATE',
      template_id: elementIndex,
    });
    history.push('/templates');
    setIsConfirming(false);
  };

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

  const trashIcon = (
    <svg
      className="trash-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
    </svg>
  );

  return (
    <div
      className="edit-div"
      style={{
        position: 'absolute',
        left: 0,
        top: 49,
        width: '100%',
        height: 'calc(100% - 49px)',
      }}
    >
      <div
        style={{
          backgroundColor: '#ccc',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {!isConfirming ? (
          <Fragment>
            <div
              style={{
                cursor: 'pointer',
                margin: '0 24px',
              }}
              onClick={() => history.push(`/templates/update/${templateIndex}`)}
              onKeyUp={() => history.push(`/templates/update/${templateIndex}`)}
              role="button"
              tabIndex={0}
            >
              {editIcon}
            </div>
            <div
              style={{ cursor: 'pointer', margin: '0 24px' }}
              onClick={() => setIsConfirming(true)}
              onKeyUp={() => setIsConfirming(true)}
              role="button"
              tabIndex={0}
            >
              {trashIcon}
            </div>
          </Fragment>
        ) : (
          <div>
            <p
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'var(--dogwood-rose)',
              }}
            >
              Delete this template?
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
                onClick={() => handleDeleteTemplate(templateIndex)}
                onKeyUp={() => handleDeleteTemplate(templateIndex)}
                role="button"
                tabIndex={0}
              >
                Yes, delete it.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesEditDiv;
