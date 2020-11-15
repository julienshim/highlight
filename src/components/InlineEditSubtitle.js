import React, { useRef, useState, useCallback, useEffect } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useKeypress from "../hooks/useKeypress";

const InlineEditSubtitle = (props) => {
  const { text, setText, scenarioIndex } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const placeholder = "Enter new subtitle";
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
  }, [esc, text, setText, scenarioIndex, inputValue]);

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      onEnter();
      onEsc();
      // inputRef.current.focus();
    }
  }, [onEnter, onEsc, isInputActive]);

  return (
    <div className="inline-container inline-subtitle" style={{ display: "flex", margin: 0 }} ref={wrapperRef}>
      <div className="deleteButton deleteSubtitleButton ">{deleteButton}</div>
      <div style={{ padding: "12px" }}>
        <div
          className={`inline-div ${!isInputActive ? "active" : "hidden"}`}
          ref={textRef}
          onClick={() => {
            setIsInputActive(true);
          }}
        >
          {text || placeholder}
        </div>
        <input
          style={{ width: (((inputValue.length > placeholder.length ? inputValue.length : placeholder.length + 7) * .1) * 7.7) + "ch" }}
          ref={inputRef}
          className={`inline-input ${!isInputActive ? "hidden" : "active"}`}
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

export default InlineEditSubtitle;
