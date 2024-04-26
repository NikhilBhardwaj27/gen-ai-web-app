import { FileUploaderProps } from "@/types";
import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";
import { FilePondFile } from "filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";


// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageEdit,
);

const FileUploader = (props: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFile = (fileItems: FilePondFile[]) => {
    const files = fileItems.map((fileItem: any) => fileItem.file);
    setFiles(files);
    props.onUploadComplete(files);
  };

  return (
    <>
      <FilePond
        files={files}
        onupdatefiles={handleFile}
        allowMultiple={true}
        dropOnPage
        name="files"
        dropValidation
        maxFiles={16}
        maxTotalFileSize="3MB"
        acceptedFileTypes={props.fileTypes}
        
      />
    </>
  );
};

export default FileUploader;
