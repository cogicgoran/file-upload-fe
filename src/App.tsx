import { ChangeEvent, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [inputFiles, setInputFiles] = useState<Array<File>>([]);
  const [previewFiles, setPreviewFiles] = useState<Array<{ src: string }>>([]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const preview = [];
    const inputFiles = [];

    if (event.currentTarget.files) {
      for (const file of event.currentTarget.files) {
        preview.push({ src: URL.createObjectURL(file) });
        inputFiles.push(file);
      }
    }
    setPreviewFiles(preview);
    setInputFiles(inputFiles);
  }

  function handleUpload() {
    const formData = new FormData();
    previewFiles
    inputFiles.forEach((file) => {
      formData.append('files', file);
    });
    axios.post('http://localhost:3000/upload', formData)
  }

  return (
    <>
      <div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', 'alignItems': 'center', gap: '8px', backgroundColor: '#778', padding: '8px' }}>
          <a href='#uploadFiles'>Upload files</a>
          <a href='#yourFiles'>Your files</a>
        </nav>
        <div
          id='uploadFiles'
          style={{ padding: '8px', backgroundColor: '#433' }}>
          <input type="file" onChange={handleChange} multiple />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '240px' }}>
            {previewFiles.map((fileData) => {
              return <div style={{ padding: '2px' }}>
                <img style={{ width: '100%', height: '100%' }} src={fileData.src} />
              </div>
            })}
          </div>
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div
          id='yourFiles'
          style={{ padding: '8px', backgroundColor: '#797' }}>
        </div>
      </div>
    </>
  )
}

export default App
