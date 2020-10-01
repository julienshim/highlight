import React, { useRef, useState } from "react";
import './InlineEdit.scss';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useOnFocusOut from "../../hooks/useOnFocusOut";


const InlineEdit = (props) => {
  const { text, setText } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  useOnClickOutside(wrapperRef, () => {
    if(isInputActive) {
      setText(inputValue);
      setIsInputActive(false);
    }
  })

  useOnFocusOut(inputRef, () => {
    if(isInputActive) {
      setText(inputValue);
      setIsInputActive(false);
    }
  });

  return (
    <div style={{position: "relative", width: "150px"}} ref={wrapperRef}>
      <span
        style={{position: "absolute", top: "0", left: "0"}}
        className={!isInputActive ? "active" : "hidden"}
        ref={textRef}
        onClick={() => {
          setIsInputActive(true)
          inputRef.current.focus()
          }}
      >
        {text}
      </span>
      <input
        style={{position: "absolute", top: "0", left: "0"}}
        ref={inputRef}
        tabIndex="0"
        className={isInputActive ? "active" : "hidden"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => {
          setIsInputActive(true)
          inputRef.current.focus()
        }}
      />
    </div>
  );
};

export default InlineEdit;
