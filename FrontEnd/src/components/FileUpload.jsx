import * as React from 'react';
import { FileUploader } from 'baseui/file-uploader';

export default function FileUpload() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [files, setFiles] = React.useState([]);
  console.log(setErrorMessage);
  return (
    <FileUploader
      errorMessage={errorMessage}
      onDrop={(acceptedFiles, rejectedFiles) => {
        console.log(acceptedFiles, rejectedFiles);
        setFiles([...files, acceptedFiles]);
      }}
    />
  );
}
