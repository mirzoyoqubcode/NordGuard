import React, { useState, useEffect, useRef } from "react";
import styles from "./Details.module.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Details = () => {
  const { t, i18n } = useTranslation();

  // State variables to hold transaction data and current index
  const [transactions, setTransactions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(99.7); // Initialize accuracy rate

  // Ref for the timer
  const timerRef = useRef(null);
  const isEndReachedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/latest_transactions"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching latest transactions:", error);
      }
    };

    fetchData(); // Fetch data initially
    return () => clearTimeout(timerRef.current); // Cleanup timer on unmount
  }, []); // Fetch data only once on component mount

  useEffect(() => {
    const updateTransaction = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % transactions.length;
        if (nextIndex === 0) {
          // If next index is 0, it means we have reached the end
          isEndReachedRef.current = true;
          clearTimeout(timerRef.current);
        }
        return nextIndex;
      });

      if (!isEndReachedRef.current) {
        timerRef.current = setTimeout(updateTransaction, 10); // Update every 10 mc
      }
    };

    // Start updating transactions
    if (transactions.length > 0) {
      updateTransaction();
    }

    return () => clearTimeout(timerRef.current); // Cleanup timer on unmount or when transactions change
  }, [transactions]); // Update transactions when the data changes

  // Calculate accuracy based on correct predictions
  useEffect(() => {
    const correctCount = transactions.reduce(
      (count, transaction) =>
        transaction.label === "correct" ? count + 1 : count,
      0
    );
    const totalTransactions = transactions.length;
    const accuracyRate = ((correctCount / totalTransactions) * 100).toFixed(2);
    setAccuracy(accuracyRate);
  }, [transactions]); // Recalculate accuracy when transactions change

  const transaction = transactions[currentIndex];

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
        <div className={styles.details}>
          <div className={styles.details_info}>
            {/* Accuracy display */}
            <div className={styles.info_d}>
              <h1>{t("check")}</h1>
              <h2>{t("check_info")}</h2>
            </div>
            <div>
              <h1 className={styles.percentage}>{accuracy}%</h1>
              <p>{t("acc")}</p>
            </div>
          </div>

          {/* Transaction details */}
          <div className={styles.btn_details}>
            <article>{t("id")}</article>
            <article className={styles.correct}>{t("correct")}</article>
            <article>{t("fraud")}</article>
          </div>
          <div className={styles.btn_details1}>
            <div>
              <article className={styles.some_id}>{transaction?.transaction_id}</article>
            </div>

            <div>
              <article className={styles.outer}>
                <div className={styles.inner}>{t("ModelPrediction")}</div>{" "}
                <p>{transaction?.prediction === 1 ? t("Yes") : t("No")}</p>
              </article>
              <article className={styles.outer}>
                <div className={styles.inner}>{t("RealData")}</div>
                <p>{transaction?.actual === 1 ? t("Yes") : t("No")}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
