import React, { useContext, useRef } from 'react'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Display from './Components/Display'
import {PlayerContext} from './Context/PlayerContext';

const App = () => {

  // const audioRef = useContext("PlayerContext");
  const {audioRef,track} = useContext(PlayerContext);

  return (
    <div className='bg-black h-screen'>
      <div className='h-[90%] flex'>
      
      <Sidebar/>
      <Display/>
      </div>
      <Player/>
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App
