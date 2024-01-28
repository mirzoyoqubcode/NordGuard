import React, { useCallback, useState } from "react";
import styles from "./Main.module.scss";
import { useDropzone } from "react-dropzone";
import Papa from 'papaparse';

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Set the selected file when a file is dropped
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const sendFileToAPI = async () => {
    if (selectedFile) {
      const apiUrl = "http://46.101.254.252:2000/predict"
      try {
      const fileReader = new FileReader();

      fileReader.onload = async (event) => {
        try {
          // Read the file content
          const fileContent = event.target.result;

          // Convert the CSV content to JSON using PapaParse
          let jsonData = await csvToJson(fileContent);

          // console.log("JSON data before sending:", jsonData.slice(0, 10));
          // jsonData = jsonData.slice(0, 10);

          const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({ data: jsonData }),
          headers: {
            'Content-Type': 'application/json',
          },
          });

          console.log("Received response from backend:", response.status);

          if (response.ok) {
            const result = await response.json();

            // Check if the predictions are available and not empty
            if (result && result.length > 0) {
              // Save the predictions as a CSV file
              savePredictionsAsCSV(result);
            }
          } else {
              console.log("Error from API:", response);
          }
          } catch (error) {
            console.log("Error while processing file content:", error);
          }
      };

      fileReader.readAsText(selectedFile);
        } catch (error) {
      console.log("Error while reading file:", error);
        }
  } else {
    console.warn("No file selected");
      }
    };

  // Function to convert CSV content to JSON using PapaParse
  const csvToJson = async (csvContent) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error.message);
        },
      });
    });
  };

  const savePredictionsAsCSV = (predictions) => {
    // Convert predictions to CSV format
    const csvContent = Papa.unparse(predictions);

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'predictions.csv';
    link.click();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>NordGuard</h1>
        <p>Fraud detection</p>
        <div className={styles.wrapper_drag_drop}>
          <div className={styles.drag_drop} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="179"
                  height="179"
                  viewBox="0 0 179 179"
                  fill="none"
                >
                  <path
                    d="M67.125 96.9583L111.875 96.9583"
                    stroke="#CDD1D7"
                    stroke-width="14.9167"
                    stroke-linecap="round"
                  />
                  <path
                    d="M67.125 67.125L96.9583 67.125"
                    stroke="#CDD1D7"
                    stroke-width="14.9167"
                    stroke-linecap="round"
                  />
                  <path
                    d="M67.125 126.792L96.9583 126.792"
                    stroke="#CDD1D7"
                    stroke-width="14.9167"
                    stroke-linecap="round"
                  />
                  <path
                    d="M141.708 96.9583V111.875C141.708 132.97 141.708 143.518 135.155 150.072C128.601 156.625 118.054 156.625 96.9583 156.625H82.0416C60.9463 156.625 50.3986 156.625 43.8451 150.072C37.2917 143.518 37.2917 132.97 37.2917 111.875V67.125C37.2917 46.0296 37.2917 35.482 43.8451 28.9285C50.3986 22.375 60.9463 22.375 82.0417 22.375V22.375"
                    stroke="#CDD1D7"
                    stroke-width="14.9167"
                  />
                  <path
                    d="M134.25 22.375L134.25 67.125"
                    stroke="#CDD1D7"
                    stroke-width="14.9167"
                    stroke-linecap="round"
                  />
                  <path
                    d="M156.625 44.75L111.875 44.75"
                    stroke="#CDD1D7"
                    stroke-width="14.9167"
                    stroke-linecap="round"
                  />
                </svg>
                <p>Drop .csv file here</p>
              </p>
            )}
          </div>
          <div className={styles.wrapper_btn}>
            <button className={styles.btn_start} onClick={sendFileToAPI}>
            Start analyzing
            </button>
            <div className={styles.select_type}>
              <p>Select Filetype:</p>
              <select>
                <option value=".csv">.csv</option>
                <option value=".pdf">.pdf</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Main;
