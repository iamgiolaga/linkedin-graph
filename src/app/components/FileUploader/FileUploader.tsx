import React, { useCallback, useMemo, useState } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import { generateGraph } from "@/app/utils/generateGraph";
import type { FileUploaderProps } from "./FileUploader.types";
import { computeFrequencies } from "@/app/utils/computeFrequencies";
import { validateContent } from "@/app/utils/validateContent";
import * as S from "./FileUploader.styles";

export const FileUploader: React.FC<FileUploaderProps> = ({ setGraph }) => {
  const [filename, setFilename] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        setIsUploading(false);
        setIsDropped(true);
        setFilename(file.name);
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

  const handleDragEnter = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDropAccepted = useCallback(() => {
    setIsDragging(false);
    setIsUploading(true);
  }, []);

  const formatDropAreaContent = () => {
    if (isDragging) {
      return <S.DropAreaText>Drop the file here</S.DropAreaText>;
    }

    if (isUploading) {
      return (
        <S.LoaderWrapper>
          <S.Loader size={30} />
        </S.LoaderWrapper>
      );
    }

    if (isDropped) {
      return <S.DropAreaText>{filename}</S.DropAreaText>;
    }

    return (
      <S.DropAreaText>
        Drag and drop the file here or click to select a file
      </S.DropAreaText>
    );
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDropAccepted={handleDropAccepted}
    >
      {({ getRootProps, getInputProps }) => (
        <S.DropArea isDragging={isDragging}>
          <S.DropAreaContentWrapper {...getRootProps()}>
            <input {...getInputProps()} />
            {formatDropAreaContent()}
          </S.DropAreaContentWrapper>
        </S.DropArea>
      )}
    </Dropzone>
  );
};
