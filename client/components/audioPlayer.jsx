// import React from 'react';
// // import Button from 'react-bootstrap/Button';
// import { PlayBtnFill, PauseBtnFill } from 'react-bootstrap-icons';

// const AudioPlayer = () => {
//   const [isPlaying, setIsPlaying] = React.useState(false);
//   // const [duration, setDuration] = React.useState(0);

//   const audioPlayer = React.useRef(); // for audio component

//   const togglePlayPause = () => {
//     const prevValue = isPlaying;

//     setIsPlaying(!prevValue);
//     if (prevValue) {
//       audioPlayer.current.play();
//     } else {
//       audioPlayer.current.pause();
//     }
//   };

//   return (
//     <div>
//       <audio ref={audioPlayer}></audio>
//       <button size='sm' onClick={togglePlayPause}>
//         {isPlaying
//           ? <PauseBtnFill />
//           : <PlayBtnFill />
//         }
//       </button>
//     {/* duration */}

//     </div>
//   );
// };
// export { AudioPlayer };
