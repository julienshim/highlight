import React, { useRef, useState, useCallback, useEffect } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useKeypress from "../hooks/useKeypress";

const InlineEditTitle = (props) => {
  const { text, setText, scenarioIndex } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const placeholder = "Enter new title";

  useOnClickOutside(wrapperRef, (event) => {
    if (isInputActive) {
      if (event.target.value !== text) {
        setText(inputValue, scenarioIndex);
      }
      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    if (enter) {
      if (inputRef.current.value !== text) {
        setText(inputValue, scenarioIndex);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [enter, inputValue, setText, text, scenarioIndex]);

  const onEsc = useCallback(() => {
    if (esc) {
      if (inputRef.current.value !== text) {
        setText(inputValue, scenarioIndex);
      }
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [esc, text, setText, inputValue, scenarioIndex]);

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      onEnter();
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]);

  return (
    <div className="inline-container inline-title" ref={wrapperRef}>
      <div
        ref={textRef}
        onClick={() => {
          setIsInputActive(true);
          inputRef.current.focus()
        }}
        className={`inline-div ${!isInputActive ? "active" : "hidden"}`}
      >
        {text}
      </div>
      <input
        style={{ width: (((inputValue.length > placeholder.length ? inputValue.length : placeholder.length + 7) * .1) * 7.7) + "ch"}}
        type="text"
        ref={inputRef}
        className={`inline-input ${!isInputActive ? "hidden" : "active"}`}
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
