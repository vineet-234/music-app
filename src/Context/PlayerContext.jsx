import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { Await } from "react-router-dom";

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{

    const audioRef= useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track,setTrack] = useState(songsData[0]);
    const [playstatus,setPlaystatus] = useState(false);
    const [time,setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlaystatus(true);
    }
    const pause = () => {
        audioRef.current.pause();
        setPlaystatus(false);
    }
    const playWithid= async (id)=> {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlaystatus(true);
    }

    const previous = async ()=> {
        if(track.id >0){
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setPlaystatus(true);
        }
    }
    const next = async ()=> {
        if(track.id <songsData.length-1){
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlaystatus(true);
        }
    }

    const seekSong = async (e)=> {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/seekBg.current.clientWidth)*audioRef.current.duration);
    }

    useEffect(()=> {
        setTimeout(()=> {
            audioRef.current.ontimeupdate = ()=> {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
                setTime({
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    } 
                })
            }
        },1000);
    },[audioRef])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        playstatus,setPlaystatus,
        time,setTime,
        play,
        pause,
        playWithid,
        previous,next,
        seekSong,
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;