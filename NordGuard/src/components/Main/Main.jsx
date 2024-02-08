import React, { useCallback, useState } from "react";
import styles from "./Main.module.scss";
import { useDropzone } from "react-dropzone";
import Modal from "../Modal/Modal";
import ReactLoading from "react-loading";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";

const Main = ({ type, color }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState("Analyzing ...");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Check if any files were dropped
    if (acceptedFiles.length > 0) {
      // Get the first accepted file
      const file = acceptedFiles[0];

      // Check if the file type is valid
      if (isValidFileType(file)) {
        // Set the selected file when a valid file is dropped
        setSelectedFile(file);
      } else {
        console.error("Unsupported file type");
      }
    }
  }, []);

  const isValidFileType = (file) => {
    const acceptedTypes = [".csv", ".xlsx", ".xls"];
    const acceptedMimeTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    // Check file extension
    const fileName = file.name.toLowerCase();
    const hasValidExtension = acceptedTypes.some((ext) =>
      fileName.endsWith(ext)
    );

    // Check MIME type
    const hasValidMimeType = acceptedMimeTypes.includes(file.type);

    return hasValidExtension || hasValidMimeType;
  };

  const sendFileToBackend = async () => {
    if (selectedFile) {
      setIsLoading(true);
      setModalOpen(true);

      try {
        setDisplayText("Processing file ...");

        // Create form data
        const formData = new FormData();
        formData.append('file', selectedFile);

        // API endpoint
        const apiUrl = "http://127.0.0.1:5000/upload";  // Assuming backend is running on the same server

        // Make API call
        setDisplayText("Analyzing ...");
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        console.log("Response status from backend:", response.status);

        if (response.status === 200) {
          setDisplayText("Fetching results ...");
          const result = await response.json();

          // Check if the predictions are available and not empty
          if (result && result['predictions']) {
            // Save the predictions as a CSV file
            savePredictionsAsCSV(result['predictions']);
          }

          setDisplayText("Results are ready!");
        } else {
          console.error("Error from backend:", response);

          // Additional logs for debugging
          console.error("Backend response text:", await response.text());
          console.error("Backend response headers:", response.headers);

          setDisplayText("Error occurred during analysis");
        }
      } catch (error) {
        console.error("Error while processing file content:", error);
        // setDisplayText(error.message);
      } finally {
        setIsLoading(false);
        setModalOpen(true);
      }
    } else {
      console.warn("No file selected");
    }
  };

  const savePredictionsAsCSV = (predictions) => {
    // Convert predictions to CSV format
    const csvContent = Papa.unparse(predictions);

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `predictions_${new Date().toISOString()}.csv`;
    link.click();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <div className={styles.navbar}>
          <div className={styles.navbar_title}>
            <h1>NordGuard</h1>
            <p>{t("frauddetect")}</p>
          </div>
          <div className={styles.lang}>
            <p
              onClick={() => i18n.changeLanguage("en")}
              className={styles.language}
            >
              <img
                src="https://flagcdn.com/w20/us.png"
                srcSet="https://flagcdn.com/w40/us.png 2x"
                width="20"
                alt="United States"
              />
              ENG
            </p>
            <p
              onClick={() => i18n.changeLanguage("ru")}
              className={styles.language}
            >
              <img
                src="https://flagcdn.com/w20/ru.png"
                srcSet="https://flagcdn.com/w40/ru.png 2x"
                width="20"
                alt="Russia"
              />
              RUS
            </p>
            <p
              onClick={() => i18n.changeLanguage("uz")}
              className={styles.language}
            >
              <img
                src="https://flagcdn.com/w20/uz.png"
                srcSet="https://flagcdn.com/w40/uz.png 2x"
                width="20"
                alt="Germany"
              />
              UZ
            </p>
          </div>
        </div>

        <div className={styles.wrapper_drag_drop}>
          <div className={styles.drag_drop} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>{t("drop")}</p>
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
                    strokeWidth="14.9167"
                    strokeLinecap="round"
                  />
                  <path
                    d="M67.125 67.125L96.9583 67.125"
                    stroke="#CDD1D7"
                    strokeWidth="14.9167"
                    strokeLinecap="round"
                  />
                  <path
                    d="M67.125 126.792L96.9583 126.792"
                    stroke="#CDD1D7"
                    strokeWidth="14.9167"
                    strokeLinecap="round"
                  />
                  <path
                    d="M141.708 96.9583V111.875C141.708 132.97 141.708 143.518 135.155 150.072C128.601 156.625 118.054 156.625 96.9583 156.625H82.0416C60.9463 156.625 50.3986 156.625 43.8451 150.072C37.2917 143.518 37.2917 132.97 37.2917 111.875V67.125C37.2917 46.0296 37.2917 35.482 43.8451 28.9285C50.3986 22.375 60.9463 22.375 82.0417 22.375V22.375"
                    stroke="#CDD1D7"
                    strokeWidth="14.9167"
                  />
                  <path
                    d="M134.25 22.375L134.25 67.125"
                    stroke="#CDD1D7"
                    strokeWidth="14.9167"
                    strokeLinecap="round"
                  />
                  <path
                    d="M156.625 44.75L111.875 44.75"
                    stroke="#CDD1D7"
                    strokeWidth="14.9167"
                    strokeLinecap="round"
                  />
                </svg>
                <p>{t("drop")}</p>
              </p>
            )}
          </div>
          <div className={styles.wrapper_btn}>
            <button
              className={styles.btn_start}
              onClick={sendFileToBackend}
              disabled={isLoading}
            >
              {t("start")}
            </button>
            {isModalOpen && (
              <Modal onClose={() => setModalOpen(false)}>
                <div>
                  {isLoading ? (
                    <div className={styles.loading}>
                      {" "}
                      <ReactLoading
                        type={"spokes"}
                        color={"#262434"}
                        height={"100px"}
                        width={"100px"}
                      />
                      <p className={styles.analyzing}>{displayText}</p>
                    </div>
                  ) : (
                    <p className={styles.ready}>{displayText}</p>
                  )}
                </div>
                <div className={styles.title_loading}>
                  <h1>NordGuard</h1>
                  <p>Fraud detection</p>
                </div>
              </Modal>
            )}
            <div className={styles.select_type}>
              <p>{t("select")}:</p>
              <select>
                <option value=".csv">.csv</option>
                <option value=".xlsx">.xlsx</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
