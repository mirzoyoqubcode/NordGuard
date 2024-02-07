import React from "react";
import styles from "./Details.module.scss";
import { useTranslation } from "react-i18next";
const Details = () => {
  const { t } = useTranslation();
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
                srcset="https://flagcdn.com/w40/us.png 2x"
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
                srcset="https://flagcdn.com/w40/ru.png 2x"
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
                srcset="https://flagcdn.com/w40/uz.png 2x"
                width="20"
                alt="Germany"
              />
              UZ
            </p>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.details_info}>
            <div className={styles.info_d}>
              <h1>{t("check")}</h1>
              <h2>{t("check_info")}</h2>
            </div>
            <div>
              <h1 className={styles.percentage}>99.7%</h1>
              <p>{t("acc")}</p>
            </div>
          </div>

          <div className={styles.btn_details}>
            <article>{t("id")}</article>
            <article className={styles.correct}>{t("correct")}</article>
            <article>{t("fraud")}</article>
          </div>
          <div className={styles.btn_details1}>
            <div>
              <article className={styles.some_id}>Some ID</article>
            </div>

            <div>
              <article className={styles.outer}>
                <div className={styles.inner}>{t("ModelPrediction")}</div>{" "}
                <p> Yes / No</p>
              </article>
              <article className={styles.outer}>
                <div className={styles.inner}>{t("RealData")}</div>
                <p> Yes / No</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
