import React, { useRef, useState, useCallback, useEffect } from "react";
import "./InlineEdit.scss";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useOnFocusOut from "../../hooks/useOnFocusOut";
import useKeypress from "../../hooks/useKeypress";

const InlineEdit = (props) => {
  const { text, setText } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  useOnClickOutside(wrapperRef, (event) => {
    if (isInputActive) {
      if (event.target.value !== text) {
        setText(inputValue);
      }
      setIsInputActive(false);
    }
  });

  useOnFocusOut(inputRef, (event) => {
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

  const onEsc = useCallback(() => {
    if (esc) {
      if (inputRef.current.value !== text) {
        setText(text);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [esc, text, setText]);

  useEffect(() => {
    if (isInputActive) {
      onEnter();
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]);

  return (
    <div className="inline-container" ref={wrapperRef}>
      <div
        className={`inline-div ${!isInputActive ? "active" : "hidden"}`}
        ref={textRef}
        onClick={() => {
          setIsInputActive(true);
        }}
      >
        {text}
      </div>
      <input
        ref={inputRef}
        className={`inline-input ${!isInputActive ? "hidden" : "active"}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => {
          setIsInputActive(true);
        }}
      />
    </div>
  );
};

export default InlineEdit;
