import React, { useEffect, useRef, useState } from 'react';
import './App.css';
export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  const [split,setsplit] = useState(false)
  const [time,settime] = useState([])

  useEffect(() => {

      if(isRunning){
          intervalIdRef.current = setInterval(() => {
              setElapsedTime(Date.now() - startTimeRef.current);
          }, 10);
      }

      return () => {
          clearInterval(intervalIdRef.current);
      }
  }, [isRunning]);

  function start(){
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop(){
      setIsRunning(false);
  }

  function reset(){
      setElapsedTime(0);
      setIsRunning(false);
  }
  function Split(){
    setsplit(true)
    settime([...time,formatTime()])
    
  }
  function clear(){
    settime([])
    setsplit(false)
  }
  function formatTime(){

      let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
      let seconds = Math.floor(elapsedTime / (1000) % 60);
      let milliseconds = Math.floor((elapsedTime % 1000) / 10);

      minutes = String(minutes).padStart(2, "0");
      seconds = String(seconds).padStart(2, "0");
      milliseconds = String(milliseconds).padStart(2, "0");

      return `${minutes}:${seconds}:${milliseconds}`;
  }

  return(
    <>
      <div className="stopwatch">
          <div className="display">{formatTime()}</div>
          <div className="controls">
              <button onClick={start} className="start-button">Start</button>
              <button onClick={stop} className="stop-button">Stop</button>
              <button onClick={reset} className="reset-button">Reset</button>
              <button onClick={Split} className="reset-button">Split</button>
          
          </div>
      </div>
      { split ?
          <div className='split'>
            <div className='top'>
              <h1>Split Time:</h1>
            </div>
            {time.map((item)=> { return(<h1 className='time' key={item}>{item}</h1>) }
            )}
            <button onClick={clear}>Clear</button>
          </div>
          : null
        }
      </>
  );
}