import React, { useRef, useCallback, useState, useEffect } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeypress from '../hooks/useKeypress';

const CommentContent = (props) => {
  const { text, setText, scenarioIndex, entryIndex, content } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');
  const tab = useKeypress('Tab');

  const placeholder = 'Enter comments here...';

  const commentButton = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-message-square"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  useOnClickOutside(wrapperRef, (event) => {
    if (isInputActive) {
      if (event.target.value !== text) {
        setText(inputValue, scenarioIndex, entryIndex);
      }
      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    if (enter) {
      if (inputRef.current.value !== text) {
        setText(inputValue, scenarioIndex, entryIndex);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [enter, inputValue, setText, text, scenarioIndex, entryIndex]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(text);
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [esc, text]);

  const onTab = useCallback(() => {
    if (tab) {
      if (inputRef.current.value !== text) {
        setText(inputValue, scenarioIndex, entryIndex);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [tab, inputValue, setText, text, scenarioIndex, entryIndex]);

  useEffect(() => {
    if (text) {
      setInputValue(text);
      setHasText(true);
    }
  }, [text, setInputValue]);

  useEffect(() => {
    if (isInputActive) {
      onEnter();
      onEsc();
      onTab();
    }
  }, [onEnter, onTab, onEsc, isInputActive]);

  return (
    <div
      className="inline-container inline-content"
      style={{ display: 'flex' }}
      ref={wrapperRef}
    >
      <div
        className="comment-button"
        onClick={() => {
          if (!inputValue) {
            setHasText(!hasText);
            setIsInputActive(true);
          }
        }}
        onKeyUp={() => {
          if (!inputValue) {
            setHasText(!hasText);
            setIsInputActive(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {commentButton}
      </div>
      <div style={{ width: '100%' }}>
        <div
          className="inline-div"
          ref={textRef}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (!inputValue) {
              setHasText(!hasText);
              setIsInputActive(true);
            }
          }}
          onKeyUp={() => {
            if (!inputValue) {
              setHasText(!hasText);
              setIsInputActive(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {content}
        </div>
        {hasText && (
          <input
            ref={inputRef}
            className="inline-input highlighter"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => {
              setIsInputActive(true);
              setInputValue(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CommentContent;
