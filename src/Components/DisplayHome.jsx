import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import { songsData } from '../assets/assets'
import SongItem from './SongItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar/>
      <div className='my-4 '>
        <h1 className='my-5 font-bold text-2xl'>featured charts</h1>
        <div className="flex overflow-auto">{albumsData.map((items,index)=>(<AlbumItem key={index} name={items.name} desc={items.desc} id={items.id} image={items.image}/>))}</div> 
      </div>
      <div className='my-4'>
        <h1 className='my-5 font-bold text-2xl'>Todays hits</h1>
        <div className="flex overflow-auto">{songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}</div> 
      </div>
    </>
  )
}

export default DisplayHome
