import React from 'react'
import { useState } from 'react'
import myCarStore  from '../Mobx/Cars'

import {observer} from 'mobx-react'

import '../Styles/AddCar.css'


// imgs for Catalog
import audiQ8  from '../Img/Cars/audiQ8.jpg'
import bmv128ti  from '../Img/Cars/bmv128ti.jpg'
import bugatti  from '../Img/Cars/bugatti.jpg'
import jaguarFType  from '../Img/Cars/jaguarF-Type.jpg'
import mercedesBenz  from '../Img/Cars/mercedes-benz.jpg'
import {FcPieChart,FcReading , FcRating, FcReddit,
         FcAdvance} from 'react-icons/fc';

import {Navigate} from 'react-router-dom'

const AddCars : React.FC = () => {

  const [canMove, setCanMove] = useState(false);
  const [signRadiosCreate, setSignRadiosCreate] = useState(false)
  const [signRadiosFirst, setSignRadiosFirst] = useState(false)
  const [numOption, setNumOption] = useState(1)


  const setCreate = (radio:any)=>
  {
    if(radio.target.value === "yes")
    {
      myCarStore.isOrignUsa = true;
      setSignRadiosCreate(true);
    }
    else{
      myCarStore.isOrignUsa = false;
      setSignRadiosCreate(false);
    }
  }

  const setFirstHand = (radio:any)=>
  {
    if(radio.target.value === "yes")
    {
      myCarStore.firstHand = true;
      setSignRadiosFirst(true);
    }
    else{
      myCarStore.firstHand = false;
      setSignRadiosFirst(false);
    }
  }

  const changeOption = () =>
  {
    if(numOption === 1 )
    {

      setNumOption(2);
      document.getElementsByClassName('optionToggle')[1].id = 'optionTurnOn';
      document.getElementsByClassName('optionToggle')[0].id = 'optionTurnOff';
      ((document.getElementsByClassName('divOptions')[0]) as HTMLDivElement).style.display = 'none';
      ((document.getElementsByClassName('divOptions')[1]) as HTMLDivElement).style.display = 'inline-block';
    }

    else {
      setNumOption(1);
      document.getElementsByClassName('optionToggle')[0].id = 'optionTurnOn';
      document.getElementsByClassName('optionToggle')[1].id = 'optionTurnOff';
      ((document.getElementsByClassName('divOptions')[1]) as HTMLDivElement).style.display = 'none';
      ((document.getElementsByClassName('divOptions')[0]) as HTMLDivElement).style.display = 'inline-block';    }
  }


  var numSlide_ImgShow = 0;

  const showMySlideImg = (numAction:number) =>
  {

    numSlide_ImgShow += numAction;

    var slide_buttons = document.getElementsByClassName('btn_Slide');
    var slide_Imgs = document.getElementsByClassName('mySlideImg');

    if(numSlide_ImgShow === (slide_Imgs.length - 1))
    {
      (slide_buttons[0] as HTMLButtonElement).style.display = "block";
      (slide_buttons[1] as HTMLButtonElement).style.display = "none";

      slide_buttons[0].id = "btn_Slide_Left";
      slide_buttons[1].id = "btn_Slide_Right";

    }

    else if(numSlide_ImgShow === 0)
    {
      (slide_buttons[0] as HTMLButtonElement).style.display = "none";
      (slide_buttons[1] as HTMLButtonElement).style.display = "block";

      slide_buttons[0].id = "btn_Slide_Left";
      slide_buttons[1].id = "btn_Slide_Right";

    }

    else {
      (slide_buttons[0] as HTMLButtonElement).style.display = "block";
      (slide_buttons[1] as HTMLButtonElement).style.display = "block";

      slide_buttons[0].id = "btn_Slide_LeftWithRight";
      slide_buttons[1].id = "btn_Slide_RightWithLeft";

    }

    for (let index = 0; index < slide_Imgs.length; index++) {
      (slide_Imgs[index] as HTMLDivElement).style.display = "none";
      
    }

    (slide_Imgs[numSlide_ImgShow] as HTMLDivElement).style.display = "block";
  }

  const addCar = () => 
  {

    if(myCarStore.newCarName.trim().length === 0 || myCarStore.ContentName.trim().length === 0)
      alert('You must fill in all the fields !');
    else
    {
      if(!myCarStore.addCar(myCarStore.newCarName, myCarStore.isOrignUsa, myCarStore.firstHand, myCarStore.ContentName))
      {
        alert("Error - The car already exists");
      }
      else{
        setCanMove(true);
      }     
    }
  }

  const moveMain = () =>
  {
    if(canMove)
      return <Navigate to='/'></Navigate>
  }
  return (
    <div id='addCarDiv'>

      {moveMain()}
        <h1>Add Car : </h1>
        <input type="text" onChange={(e)=>myCarStore.newCarName = e.target.value} placeholder='Name Car : '/>
        <input type="text" onChange={(e)=>myCarStore.ContentName = e.target.value} placeholder='Company Car : '/>


        <p className='Description'>The car was create in the United States : </p>
        <div id='radiosCreate' onChange={setCreate}>
        <label htmlFor="create" className='customRadio'>
          Yes
          <input type="radio" id ='create' name='radiosCreate' value='yes' checked={signRadiosCreate} onChange={()=>{}} />
          <span className='MyCheck'></span>
        </label>

        <label htmlFor="notCreate" className='customRadio'>
          No
          <input type="radio" id ='notCreate' name='radiosCreate' value='no' checked={!signRadiosCreate} onChange={()=>{}} />
          <span className='MyCheck'></span>
        </label>
        </div>
        <br />

        <p className='Description'>The car is first hand owned :</p>
        <div id='radiosFirstHand' onChange={setFirstHand}>
        <label htmlFor="firstHand" className='customRadio'>
          Yes
          <input type="radio" id ='firstHand' name='radiosfirstHand' value='yes' checked={signRadiosFirst} onChange={()=>{}}/>
          <span className='MyCheck'></span>
        </label>

        <label htmlFor="notFirstHand" className='customRadio'>
          No
          <input type="radio" id ='notFirstHand' name='radiosfirstHand' value='no' checked={!signRadiosFirst} onChange={()=>{}} />
          <span className='MyCheck'></span>
        </label>
        </div>



<div id='option1' className='divOptions'>
<p className='DescriptionOpt'>Catalog of cars :</p>
<div id='CatalogCars'>

<div className='mySlideImg'>
  <img src={audiQ8} alt="audi Q8" className='img_Slide' />
  <div className='mySlideTitle SlideTitleLeft'>
    <i><FcRating/></i>
    <span>
    Audi q8
    </span>
  </div>
</div>

<div className='mySlideImg'>
  <img src={bmv128ti} alt="bmv128 ti" className='img_Slide' />
  <div className='mySlideTitle SlideTitleCenter'>
    <i><FcPieChart/></i>
    <span>
    BMV 128 - ti
      </span> 
  </div>
</div>

<div className='mySlideImg'>
  <img src={bugatti} alt="bugatti" className='img_Slide' />
  <div className='mySlideTitle SlideTitleCenter'>
    <i><FcReading/></i>
   <span>
   Bugatti
   </span>
  </div>
</div>

<div className='mySlideImg'>
  <img src={jaguarFType} alt="Jaguar F - Type" className='img_Slide' />
  <div className='mySlideTitle SlideTitleCenter'>
    <i><FcReading/></i>
    <span>
    Jaguar F - Type
    </span> 
  </div>
</div>

<div className='mySlideImg'>
  <img src={mercedesBenz} alt="Mercedes Benz" className='img_Slide' />
  <div className='mySlideTitle SlideTitleLeft'>
    <i><FcReddit/></i>
    <span>
    Mercedes Benz
    </span>
  </div>
</div>

<button className='btn_Slide' id='btn_Slide_Left' onClick={()=> showMySlideImg(-1)}>
  <i className='iconSlide'>
    <FcAdvance/>
  </i> 
</button>
<button className='btn_Slide' id='btn_Slide_Right' onClick={()=> showMySlideImg(1)}> 
<i className='iconSlide'>
    <FcAdvance/>
  </i> 
</button>

</div>
</div>

<div id='option2' className='divOptions'>
<p className='DescriptionOpt'>Countries with The Best Quality Cars :</p>

<div id='CountriesCars'>
<dl>
  <dt>
  Germany - 
  </dt>
  <dd>
 Their bestselling cars are from Volkswagen, <br /> with Mercedes-Benz following close behind.  
  </dd>

  <dt>
  Italy -  
  </dt>

  <dd>
  If you’re looking for more of an everyday car,<br /> Fiat can help, and even used to own Ferrari back in 2016.
  </dd>
  
  <dt>
  USA - 
  </dt>
  <dd>
  If you’re after modern sophistication (and an electric car) <br /> then look no further than Tesla, which is based in California.  
  </dd>
</dl>

</div>
</div>

<p id='toggleCar'>
          <span className='optionToggle' id='optionTurnOn'>Catalog</span>

          <label className='optionsLabel'>
            <input type="checkbox" onClick={()=>changeOption()}/>
            <span className='optionsSlider optionsRound'></span>
          </label>

          <span className='optionToggle' id='optionTurnOff'>Countries</span>
        </p>


        <br />
        <br />
        <br />
        <button id ='buttonAdd' onClick={()=>addCar()}>
        
        <div>
        Add
        </div>
        
        </button>
        <br />
    </div>
  )
}

export default observer(AddCars);