import React, { useState, useRef, useEffect } from 'react';
import { PlayBtnFill, PauseBtnFill } from 'react-bootstrap-icons';
export default function AudioPlayer(props) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.readyState]);

  const calculateTime = secs => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10
      ? `0${minutes}`
      : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10
      ? `0${seconds}`
      : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width',
    `${progressBar.current.value / duration * 100}%`);
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div className='player'>
      <audio ref={audioPlayer}
        src={props.src}>
        </audio>
      <button className='circle' onClick={togglePlayPause}>
        {isPlaying
          ? <PauseBtnFill className='pause'/>
          : <PlayBtnFill className='play' />}
      </button>

      <div className='current'>{calculateTime(currentTime)}</div>
      <div>
        <input type="range" className='progress'
          defaultValue="0" ref={progressBar} onChange={changeRange} />
      </div>
      <div className='duration'>
        {(duration && !isNaN(duration)) && calculateTime(duration)}
      </div>
    </div>
  );
}
