import React from "react";
import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp, FaPause, FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [remainingTime, setRemainingTime] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const getTime = () => {
      if (sessionLength) {
        let time = sessionLength * 60;
        setInterval(() => time--, 1000);
        let secs = time % sessionLength;
        let mins = Math.floor(sessionLength / 60);
        setRemainingTime(`${mins}:${secs}`);
      }
      if (!sessionLength) {
        let etime = breakLength * 60;
        setInterval(() => etime--, 1000);
        let secs = etime % sessionLength;
        let mins = Math.floor(sessionLength / 60);
        setRemainingTime(`${mins}:${secs}`);
      }
    };
    getTime();
  }, [setRemainingTime]);

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
                      } else {
                        setBreakLength(breakLength + 1);
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
                      } else {
                        setBreakLength(breakLength - 1);
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
                      } else {
                        setSessionLength(sessionLength + 1);
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
                      } else {
                        setSessionLength(sessionLength - 1);
                      }
                    }}
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <h5 className="col-12 text-center  mx-auto">
                {sessionLength ? "session" : "break"}
              </h5>
              <h4 className="col display-4 text-center">{remainingTime}</h4>
            </div>
            <div className="row mt-3 mx-auto justify-content-center">
              <div className="col-lg-8 justify-content-around row">
                <button
                  className="btn btn-dark mx-3 col-3"
                  onClick={() => {
                    setIsPaused(false);
                  }}
                >
                  <FaPlay />
                </button>
                <button className="btn btn-dark mx-3 col-3">
                  <FaPause
                    onClick={() => {
                      setIsPaused(true);
                    }}
                  />
                </button>
                <button
                  className="btn btn-dark mx-3 col-3"
                  onClick={() => {
                    setBreakLength(5);
                    setSessionLength(25);
                    setRemainingTime("25:00");
                  }}
                >
                  <GrPowerReset />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default App;
