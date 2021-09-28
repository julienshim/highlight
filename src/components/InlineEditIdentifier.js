import React, { useRef, useState, useCallback, useEffect } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeypress from '../hooks/useKeypress';

const InlineEditTitle = (props) => {
  const { text, setText, type } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');
  const tab = useKeypress('Tab');

  let placeholder = '';

  if (type === 'refId') {
    placeholder = 'Please enter a participant ID';
  }

  if (type === 'participantName') {
    placeholder = "Please enter participant's name";
  }

  if (type === 'studyName') {
    placeholder = 'Please enter the study name';
  }

  useOnClickOutside(wrapperRef, (event) => {
    if (isInputActive) {
      if (event.target.value !== text) {
        setText(inputValue);
      }
      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    if (enter) {
      if (inputRef.current.value !== text) {
        setText(inputValue);
      }
      if (inputRef.current.value === '') {
        setText(placeholder);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [enter, inputValue, setText, text]);

  const onTab = useCallback(() => {
    if (tab) {
      if (inputRef.current.value !== text) {
        setText(inputValue);
      }
      if (inputRef.current.value === '') {
        setText(placeholder);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [tab, inputValue, setText, text]);

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
      className={`inline-container inline-title${
        type === 'participantName' ? ' fw-700' : ''
      }`}
      ref={wrapperRef}
    >
      <div
        ref={textRef}
        onClick={() => {
          setIsInputActive(true);
          inputRef.current.focus();
        }}
        onKeyUp={() => {
          setIsInputActive(true);
          inputRef.current.focus();
        }}
        role="button"
        tabIndex={0}
        className={`inline-div ${!isInputActive ? 'active' : 'hidden'}`}
      >
        {text}
      </div>
      <input
        type="text"
        ref={inputRef}
        className={`inline-input ${!isInputActive ? 'hidden' : 'active'}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        // onFocus={() => {
        //   setIsInputActive(true);
        // }}
      />
    </div>
  );
};

export default InlineEditTitle;
