import React, { useState, useEffect, useRef } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const nameHandle = (val) => {
    // name = val.target.value;
    setName(val.target.value);
  };

  const timeHandle = (val) => {
    // date = val.target.value;
    setDate(val.target.value);
  };

  const startTimer = () => {
    interval = setInterval(() => {
      // const now = new Date().getTime();
      // const distance = countdownDate - now;
      const current = new Date(date).getTime();
      const now = new Date().getTime();
      const distance = current - now;
      // console.log(distance);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop our timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("name:", name);
    console.log("date:", date);
    startTimer();
    // setName(val.target.value);
    // setDate(val.target.value);
  };

  useEffect(() => {
    // startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, [date]);

  return (
    <div className="input-field">
      <p>Name:</p>
      <input type="text" onChange={nameHandle} />
      <p>Choose a date: </p>
      <input type="datetime-local" onChange={timeHandle} />
      <button className="count-btn" onClick={handleOnSubmit}>
        Countdown!
      </button>
      <section className="timer-container">
        <section className="timer">
          <div className="heading">
            <span className="timer-icon">
              <i className="far fa-clock"></i>
            </span>
            <h2>Countdown Timer</h2>
            <p>Name</p>
          </div>
          <div className="countdown-container">
            <section>
              <p>{timerDays}</p>
              <p>
                <small>Days</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <p>
                <small>Hours</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <p>
                <small>Minutes</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <p>
                <small>Seconds</small>
              </p>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Form;
