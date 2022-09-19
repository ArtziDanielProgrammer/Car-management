import {observer} from 'mobx-react';
import myCarStore from '../Mobx/Cars';

import '../Styles/ShowChosenCar.css';

import {Link} from 'react-router-dom';

const ShowChosenCar : React.FC = () => {



  var arrSentence = [
     'Details of the selected car' ,
     `The name of the car is ${myCarStore.CarChosen.nameCar}`,
     `The name of the company is ${myCarStore.CarChosen.ContentName}`,
     'The car was created in the United States',
     'The car was not created in the United States',
     'The car is first hand owned',
     'The car is not first hand'

  ]

  var msg : any ;

  const createSpeech = () => {
      msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[3];
      msg.volume = 1;
      msg.rate = 1;
      msg.pitch = 1;
      msg.lang = "en";
  }

  const toSay = (text:any) => {
      speechSynthesis.cancel();
      msg.text = text;
      speechSynthesis.speak(msg);
  }
  // Create p according to boolean value

  let pCreated;
  if(myCarStore.CarChosen.isOriginUSA)
  {
    pCreated = <p id='pDetails1' onClick={()=>toSay(arrSentence[3])}>
            The car was created in the United States
            </p>
  }
  else
  {
    pCreated = <p id="pDetails1" onClick={()=>toSay(arrSentence[4])}>
            The car was not created in the United States
            </p>
  }

  let pHand;
  if(myCarStore.CarChosen.firstHand)
  {
    pHand = <p id='pDetails2' onClick={()=>toSay(arrSentence[5])}>
            The car is first hand owned
            </p>
  }
  else
  {
    pHand = <p id='pDetails2' onClick={()=>toSay(arrSentence[6])}>
             The car is not first hand
            </p>
  }



  return (
    <div id='ShowChosenCarDiv'>
        {createSpeech()}
        <h1 onClick={()=>toSay(arrSentence[0])}>Details of the selected car</h1>
        
        {myCarStore.getCar(myCarStore.CarShowNowId)}
        <p onClick={()=>toSay(arrSentence[1])}>
        The name of the car is &nbsp;
        <span>
        {myCarStore.CarChosen.nameCar}
            </span>
        </p>

        {pCreated}

        {pHand}

        <p onClick={()=>toSay(arrSentence[2])}>
        The name of the company is &nbsp;
        <span>
        {myCarStore.CarChosen.ContentName}
            </span>
        </p>

        <br />
        <br />
        <Link to='/'>
        <button id='mainButton'>
            <div>
            Main
            </div>
            
        </button>
        </Link>

        <br />
        
        <Link to ='/'>
        <button id='removeButton' onClick={()=>myCarStore.removeCar(myCarStore.CarChosen.id!)}>
            <div>
            Remove Car
            </div>
            
        </button>
        </Link>
    </div>
  )
}

export default  observer(ShowChosenCar)