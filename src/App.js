import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaArrowDown, FaArrowUp, FaPause, FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [remainingTime, setRemainingTime] = useState(sessionLength * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [period, setPeriod] = useState("session");

  const sound = useRef();

  ////////////////////////////
  // Custom Hook useInterval//
  ////////////////////////////

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  ///////////////////////////////////////
  ///////////////////////////////////////
  ///////////////////////////////////////
  useInterval(
    () => {
      if (!isPaused && remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      }
      if (remainingTime === 0) {
        setPeriod(period === "session" ? "break" : "session");
        setRemainingTime(
          period === "session" ? breakLength * 60 : sessionLength * 60
        );
        sound.current.currentTime = 0;
        sound.current.play();
      }
    },
    !isPaused ? 1000 : null
  );
  useEffect(() => {
    setRemainingTime(remainingTime);
  }, [remainingTime]);

  const displayTime = () => {
    let mins = Math.floor(remainingTime / 60);
    let secs = remainingTime - mins * 60;
    return `${mins < 10 ? `0${mins.toString()}` : mins.toString()} : ${
      secs < 10 ? `0${secs.toString()}` : secs.toString()
    }`;
  };

  return (
    <main className="bg-dark">
      <section className="container">
        <div className="row d-flex align-items-center height-100">
          <article className="bg-light col-lg-9 height-64 mx-auto text-capitalize text-dark rounded">
            <h3 className="text-center mt-4">25 + 5 Clock</h3>
            <div className="row justify-content-around mt-2">
              <div className="col-5">
                <p className="text-center">break length</p>
                <div className="row justify-content-around">
                  <button
                    className="col-4 btn btn-dark"
                    onClick={() => {
                      if (breakLength >= 60) {
                        setBreakLength(60);
                        setRemainingTime(
                          period === "break" ? breakLength * 60 : remainingTime
                        );
                      } else {
                        setBreakLength(breakLength + 1);
                        setRemainingTime(
                          period === "break"
                            ? (breakLength + 1) * 60
                            : remainingTime
                        );
                      }
                    }}
                  >
                    <FaArrowUp className="text-light mx-auto" />
                  </button>
                  <p className="col-4 h3 text-center">{breakLength}</p>
                  <button
                    className="col-4 btn btn-dark"
                    onClick={() => {
                      if (breakLength <= 1) {
                        setBreakLength(1);
                        setRemainingTime(
                          period === "session"
                            ? breakLength * 60
                            : remainingTime
                        );
                      } else {
                        setBreakLength(breakLength - 1);
                        setRemainingTime(
                          period === "session"
                            ? (breakLength - 1) * 60
                            : remainingTime
                        );
                      }
                    }}
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
              <div className="col-5">
                <p className="text-center">session length</p>
                <div className="row justify-content-around">
                  <button
                    className="col-4 btn btn-dark"
                    onClick={() => {
                      if (sessionLength >= 60) {
                        setSessionLength(60);
                        setRemainingTime(sessionLength * 60);
                      } else {
                        setSessionLength(sessionLength + 1);
                        setRemainingTime((sessionLength + 1) * 60);
                      }
                    }}
                  >
                    <FaArrowUp className="text-light mx-auto" />
                  </button>
                  <p className="col-4 h3 text-center">{sessionLength}</p>
                  <button
                    className="col-4 btn btn-dark"
                    onClick={() => {
                      if (sessionLength <= 1) {
                        setSessionLength(1);
                        setRemainingTime(sessionLength * 60);
                      } else {
                        setSessionLength(sessionLength - 1);
                        setRemainingTime((sessionLength - 1) * 60);
                      }
                    }}
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-4 ">
              <h5 className="col-12 text-center mb-1 mx-auto">{period}</h5>
              <h4 className="col display-4 text-center">{displayTime()}</h4>
            </div>
            <div className="row mt-3 mb-4 mx-auto justify-content-center">
              <div className="col-lg-8 justify-content-around row">
                <button
                  className="btn btn-dark mx-3 col-3"
                  onClick={() => {
                    setIsPaused(false);
                  }}
                >
                  <FaPlay />
                </button>
                <button
                  className="btn btn-dark mx-3 col-3"
                  onClick={() => {
                    setIsPaused(true);
                    console.log(isPaused);
                  }}
                >
                  <FaPause />
                </button>
                <button
                  className="btn btn-dark mx-3 col-3"
                  onClick={() => {
                    setBreakLength(5);
                    setSessionLength(25);
                    setRemainingTime(sessionLength * 60);
                    setIsPaused(true);
                  }}
                >
                  <GrPowerReset />
                </button>
              </div>
            </div>
            <audio
              ref={sound}
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
              type="audio"
            />
          </article>
        </div>
      </section>
    </main>
  );
};

export default App;
