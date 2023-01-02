import styles from '@styles/survey/Survey.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import config from 'site.config';
import { SurveyContext } from '../surveyContext';

const { demographicQuestions } = config;

const allKeys = demographicQuestions.map((question) => question.key);
const arrayOf10 = [...Array(10).keys()].map((n) => (n + 1).toString());

export default function Demographics() {
  const { setMetaDataPageDone, setDemographics } = useContext(SurveyContext);

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const allAnswered = useMemo(
    () => allKeys.every((key) => answers[key] !== undefined),
    [answers]
  );

  useEffect(() => {
    if (allAnswered) {
      setDemographics(answers);
      setMetaDataPageDone(true);
    }
  }, [allAnswered, answers, setMetaDataPageDone, setDemographics]);

  const { questionsWithOptions, questionsWithoutOptions } = useMemo(() => {
    const questionsWithOptions = demographicQuestions.filter(
      (question) => question.options
    );
    const questionsWithoutOptions = demographicQuestions.filter(
      (question) => !question.options
    );
    return { questionsWithOptions, questionsWithoutOptions };
  }, []);

  return (
    <div className={styles.showMetaDataPage}>
      <h2>
        Hvala za vaše odgovore. Prosimo, da nam poveste še nekaj o sebi. (WIP)
      </h2>

      {questionsWithOptions.map(({ key, options }) => {
        return (
          <div key={key}>
            <div className={styles.question}>{key}</div>
            <div className={styles.pairOption + ' ' + styles.pairOptionSmall}>
              {options!.map((option) => (
                <button
                  onClick={() => setAnswers({ ...answers, [key]: option })}
                  key={option}
                  className={
                    answers[key] === option ? styles.selected : undefined
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className={styles.question}>
        <strong>Označi kako močno se strinjaš s temi trditvami (1-10)</strong>
      </div>

      {questionsWithoutOptions.map(({ key }) => {
        return (
          <div key={key}>
            <div className={styles.question}>{key}</div>
            <div className={styles.pairOption + ' ' + styles.pairOptionSmall}>
              {arrayOf10.map((option) => (
                <button
                  onClick={() => setAnswers({ ...answers, [key]: option })}
                  key={option}
                  className={
                    answers[key] === option ? styles.selected : undefined
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
