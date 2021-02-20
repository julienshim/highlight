import React, { useRef, useState, useCallback, useEffect } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeypress from '../hooks/useKeypress';

const InlineEditContent = (props) => {
  const { text, setText, deleteText, scenarioIndex, entryIndex } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');
  const tab = useKeypress('Tab');

  const placeholder = 'Untexted';
  const deleteButton = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
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

  const onTab = useCallback(() => {
    if (tab) {
      if (inputRef.current.value !== text) {
        setText(inputValue, scenarioIndex);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [tab, inputValue, setText, text, scenarioIndex]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(text);
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [esc, text]);

  useEffect(() => {
    if (text) {
      setInputValue(text);
    }
  }, [text, setInputValue]);

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

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
      style={{ display: 'flex', margin: 0 }}
      ref={wrapperRef}
    >
      <div
        className="deleteButton deleteContentButton"
        onClick={() => deleteText(scenarioIndex, entryIndex)}
        onKeyUp={() => deleteText(scenarioIndex, entryIndex)}
        role="button"
        tabIndex={0}
      >
        {deleteButton}
      </div>
      <div style={{ padding: '12px' }}>
        <div
          className={`inline-div ${!isInputActive ? 'active' : 'hidden'}`}
          ref={textRef}
          onClick={() => {
            setIsInputActive(true);
          }}
          onKeyUp={() => {
            setIsInputActive(true);
          }}
          role="button"
          tabIndex={0}
        >
          {text || placeholder}
        </div>
        <input
          style={{
            width:
              `${(inputValue.length > placeholder.length
                ? inputValue.length + 7
                : placeholder.length + 7) *
                0.1 *
                7.7}ch`,
          }}
          ref={inputRef}
          className={`inline-input ${!isInputActive ? 'hidden' : 'active'}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            setIsInputActive(true);
          }}
        />
      </div>
    </div>
  );
};

export default InlineEditContent;
