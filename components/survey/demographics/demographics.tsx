import styles from '@styles/survey/Survey.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { demographicQuestions } from 'site.config.json';
import { SurveyContext } from '../surveyContext';

const allKeys = demographicQuestions.map((question) => question.key);

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

  return (
    <div className={styles.showMetaDataPage}>
      <h2>
        Hvala za vaše odgovore. Prosimo, da nam poveste še nekaj o sebi. (WIP)
      </h2>

      {demographicQuestions.map(({ key, options }) => (
        <div key={key}>
          <div className={styles.question}>{key}</div>
          <div className={styles.pairOption + ' ' + styles.pairOptionSmall}>
            {options.map((option) => (
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
      ))}
    </div>
  );
}
