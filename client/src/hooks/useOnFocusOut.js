import { useEffect } from "react";

const useOnFocusOut = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || !ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("focusout", listener);

    return () => {
      document.removeEventListener("focusout", listener);
    };
  }, [ref, handler]);
};

export default useOnFocusOut;
