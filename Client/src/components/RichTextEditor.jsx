import { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const isInitialMount = useRef(true);

  const handleChange = (content) => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setInput((prev) => ({
      ...prev,
      description: content,
    }));
  };

  return (
    <ReactQuill
      theme="snow"
      value={input?.description || ""}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;