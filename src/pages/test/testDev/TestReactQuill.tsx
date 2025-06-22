import { useRef, useState, useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styleQuillCustom from "./scss/TestReactQuill.module.scss";

import envKeys from "../../../config/envKeys";

const QuillEditor = () => {
  const [value, setValue] = useState("");
  const quillRef = useRef<any>(null);

  const handleImageUpload = useCallback(() => {
    try {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        try {


          const file = input.files?.[0];
          if (file) {
            try {
              const toastDismissId = toast.loading('Loading...');

              console.log("Selected file:", file);

              const formData = new FormData();
              formData.append('file', file);

              const config = {
                method: 'post',
                url: `${envKeys.API_URL}/api/uploads/crudS3/uploadFile`,
                data: formData,
                withCredentials: true,
              };

              const response = await axios.request(config);

              toast.success('Audio uploaded successfully!', {
                id: 'audio-upload',
              });

              toast.dismiss(toastDismissId);

              console.log("Image upload response:", response.data);
              console.log("Image upload response:", response.data.fileName);

              let finalImageUrl = `${envKeys.API_URL}/api/uploads/crudS3/getFile?fileName=${response.data.fileName}`;

              const quill = quillRef.current?.getEditor?.();
              const range = quill?.getSelection?.();
              if (range) {
                quill.insertEmbed(range.index, "image", finalImageUrl);
              }
            } catch (err) {
              console.error("Image upload failed:", err);
            }
          }
        } catch (error) {
          console.error("Error handling file input change:", error);
        }
      };
    } catch (error) {
      console.error("Error in handleImageUpload:", error);
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }, { size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }, { align: [] }],
          ["link", "image", "video", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [handleImageUpload]
  );

  const formats = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike",
    "color", "background",
    "script", "super", "sub",
    "list", "bullet", "indent",
    "direction", "align",
    "link", "image", "video", "code-block",
  ];

  return (
    <div>
      <div className={styleQuillCustom.quillCusomContainer}>
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Start writing here..."
        />
      </div>
    </div>
  );
};

export default QuillEditor;
