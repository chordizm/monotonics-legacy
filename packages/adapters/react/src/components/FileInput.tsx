import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";

export type FileInputProps = {
  label?: string;
  accept?: string[];
  multiple?: boolean;
  value?: File[];
  onChange?: (value: File[] | File) => void;
};

export const FileInput = (props: FileInputProps) => {
  const { label, accept, multiple, value: files, onChange } = props;
  return (
    <Dropzone
      accept={accept}
      onDrop={(files) => {
        onChange?.(multiple ? files : files[0]);
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {files && files.length > 0 ? (
        <div style={{ width: "100%", height: "100%" }}>
          {files?.map((file) => (
            <div key={file.name}>{file.name}</div>
          ))}
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          {label ?? "Drop file here"}
        </div>
      )}
    </Dropzone>
  );
};
