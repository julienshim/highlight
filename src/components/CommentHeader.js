import React, { useRef, useCallback, useState, useEffect } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeypress from '../hooks/useKeypress';

const CommentHeader = (props) => {
  const { text, setText } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');
  const tab = useKeypress('Tab');

  const placeholder = 'Enter comments here...';

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
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [enter, inputValue, setText, text]);

  const onTab = useCallback(() => {
    if (tab) {
      if (inputRef.current.value !== text) {
        setText(inputValue);
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
      onEnter();
      onEsc();
      onTab();
    }
  }, [onEnter, onEsc, onTab, isInputActive]);

  return (
    <div ref={wrapperRef} className="mt-40">
      <textarea
        style={{ width: '100%', boxSizing: 'border-box' }}
        ref={inputRef}
        className="highlighter"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setIsInputActive(true);
          setInputValue(e.target.value);
        }}
      />
    </div>
  );
};

export default CommentHeader;
