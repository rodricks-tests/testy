"use client";

import React, { useState } from "react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

export default () => {
  const handleSave = async (markdown: string) => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert("Markdown copied to clipboard!");
    } catch (err) {
      console.error("Clipboard error:", err);
      alert("Failed to copy.");
    }
  };

  const [text, setText] = useState("# Hello Editor");
  return (
    <div>
      <div className="w-full px-2 ">
        <p className="mb-2">Note: Edit, copy and paste you text in to the form</p>
        <button
          className="bg-green-500 p-2 text-white font-bold rounded-sm text-sm cursor-pointer mb-2"
          onClick={() => handleSave(text)}
        >
          {" "}
          Copy To Clipboard
        </button>
      </div>

      <MdEditor
        modelValue={text}
        onChange={setText}
        language="en-US"
        onSave={handleSave}
      />
    </div>
  );
};
