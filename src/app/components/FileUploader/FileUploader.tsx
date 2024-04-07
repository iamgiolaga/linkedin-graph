import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import { generateGraph } from "@/app/utils/generateGraph";
import type { FileUploaderProps } from "./FileUploader.types";
import { computeFrequencies } from "@/app/utils/computeFrequencies";
import { validateContent } from "@/app/utils/validateContent";

export const FileUploader: React.FC<FileUploaderProps> = ({ setGraph }) => {
  const handleDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const csvStr = new TextDecoder("utf-8").decode(
          reader.result as ArrayBuffer
        );

        const { data: connections } = Papa.parse(csvStr, { header: false });

        const isValidContent = validateContent(connections);

        if (!isValidContent) {
          throw new Error("File not supported");
        }

        const frequencies = computeFrequencies(connections as string[][]);

        const graph = generateGraph(frequencies);
        setGraph(graph);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
