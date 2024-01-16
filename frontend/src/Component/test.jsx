import React, { useEffect, useRef, useState } from 'react';

function TestComponent() {
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [isTextPasted, setIsTextPasted] = useState(false);
  const textareaRef = useRef(null);

  const handleClipboardCopy = () => {
   console.log("You can't copy in this page")
  };

  const handleClipboardPaste = () => {
    console.log("yes")
    setIsTextPasted(true);
  };

  useEffect(() => {
    // Monitor clipboard changes
    document.addEventListener('paste', handleClipboardPaste);
    document.addEventListener('copy',handleClipboardCopy)

    // navigator.clipboard.readText().then((text) => {
    //   textareaRef.current.focus();
    //   console.log(text);
    //   handleClipboardCopy(); // Handle initial clipboard content
    // });

    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener('paste', handleClipboardPaste);
    };
  }, []);

  useEffect(() => {
    // Check for rapid pasting
    if (isTextCopied && isTextPasted) {
      // Raise a flag or trigger additional checks for potential plagiarism
      console.log('Potential plagiarism detected: rapid copying and pasting');
      // Implement your plagiarism handling logic here
    }
  }, [isTextCopied, isTextPasted]);

  return <textarea ref={textareaRef}  />;
}

export default TestComponent;
