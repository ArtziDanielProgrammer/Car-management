import React, { useState } from 'react';
import './App.css';

import myCarStore from './Mobx/Cars'
import AddCars from './Components/AddCars';
import ShowChosenCar from './Components/ShowChosenCar';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './Components/Main';

import './Styles/StyleSong.css';
import song from './Song/song.mp3';
import useSound from 'use-sound';

import { observer } from "mobx-react";

function App() {

  const [songToPlay] = useState(song);
  const [playSong, {stop}] = useSound(songToPlay,{volume:0.25,loop:true})
  const [notCanClick, setnotCanClick] = useState(false)
  
  const startSong = () =>
  {
    if(!notCanClick)
    {
      setnotCanClick(true);

      playSong();
    }
  }

  const stopSong = () => {
    stop();
    setnotCanClick(false);
  }
  
  const clickDiv = () => {
    if(!notCanClick)
    {
      var divSound = document.getElementsByClassName("divSound")[0] as HTMLDivElement;
      divSound.style.pointerEvents = "none";
      playSong();
    }
    
  }
  return (
    <div className="App" onClick={()=>clickDiv}>

    <div className='divSound'>
      <button onClick={()=>startSong()}>play</button>
      <button onClick={()=>stopSong()}>Stop</button>
    </div>

     <Router>
       <Routes>
         <Route path='/' element={<Main/>}></Route>
         <Route path='addCars' element={<AddCars/>}></Route>
         {
           myCarStore.getCars.map((car)=>
           {
             return (
               <Route path={car.id?.toString()} element={<ShowChosenCar/>}></Route>
             )
           })
         }
       </Routes>
     </Router>
    </div>
  );
}

export default observer(App);
