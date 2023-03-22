import { FC, useCallback, useEffect, useRef, useState } from "react";
import cls from "./ProgressBar.module.css";

export const ProgressBar: FC = () => {
  const [isProgress, setIsProgress] = useState<number>(0);

  const idBarRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadProgress = useCallback(() => {
    const progressStatus = () => {
      if (isProgress >= 100 && idBarRef.current !== null) {
        clearInterval(idBarRef.current);
      } else {
        setIsProgress((prev) => prev + 1);
      }
    };

    idBarRef.current = setInterval(progressStatus, 60);
  }, [isProgress]);

  const startProgress = () => {
    if (isProgress === 100) {
      setIsProgress(0);
      loadProgress();
    } else {
      clearInterval(idBarRef.current as NodeJS.Timeout);
      loadProgress();
    }
  };

  const stopProgress = () => {
    if (isProgress !== 0) {
      clearInterval(idBarRef.current as NodeJS.Timeout);
    }
  };

  useEffect(() => {
    loadProgress();

    return () => {
      clearInterval(idBarRef.current as NodeJS.Timeout);
    };
  }, [isProgress, loadProgress]);

  return (
    <section className={cls.section}>
      <div className={cls.loader}>
        <span className={cls.count}>{isProgress + "%"}</span>
        <div className={cls.wrapper}>
          <div
            className={cls.progress}
            style={{ width: `${isProgress}%` }}
          ></div>
        </div>
        <div className={cls.btnContainer}>
          <button className={cls.btnStart} onClick={startProgress}>
            Start
          </button>
          <button className={cls.btnStop} onClick={stopProgress}>
            Stop
          </button>
        </div>
      </div>
    </section>
  );
};
