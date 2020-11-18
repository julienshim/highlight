import React, { useRef, useCallback, useState, useEffect } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useKeypress from "../hooks/useKeypress";

const CommentSubtitle = (props) => {
  const { text, setText, scenarioIndex, subtitle } = props;

  const [isInputActive, setIsInputActive] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const placeholder = "Enter comments here...";

  const commentButton = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
    >
      <path d="M10 13h-4v-1h4v1zm2.318-4.288l3.301 3.299-4.369.989 1.068-4.288zm11.682-5.062l-7.268 7.353-3.401-3.402 7.267-7.352 3.402 3.401zm-6 8.916v.977c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-20h14.056l1.977-2h-18.033v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.843l-2 2.023z" />
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
      setInputValue(text);
      document.activeElement.blur();
      setIsInputActive(false);
    }
  }, [esc, text]);

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
      // inputRef.current.focus();
    }
  }, [onEnter, onEsc, isInputActive]);

  return (
    <div
      className="inline-container inline-subtitle"
      style={{ display: "flex", margin: 0 }}
      ref={wrapperRef}
    >
      <div
        className="commentButton"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (!inputValue) {
            setHasText(!hasText);
            setIsInputActive(true);
          }
        }}
      >
        {commentButton}
      </div>
      <div style={{ padding: "12px" }}>
        <div
          className={`inline-div`}
          ref={textRef}
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (!inputValue) {
              setHasText(!hasText);
              setIsInputActive(true);
            }
          }}
        >
          {subtitle}
        </div>
        {hasText && (
          <input
            style={{
              width:
                (inputValue.length > placeholder.length
                  ? inputValue.length + 7
                  : placeholder.length + 7) *
                  0.1 *
                  7.7 +
                "ch",
            }}
            ref={inputRef}
            className={`inline-input highlighter`}
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

export default CommentSubtitle;
