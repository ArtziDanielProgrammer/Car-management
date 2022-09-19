import myCarStore from '../Mobx/Cars';
import React, { ReactElement } from 'react'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import '../Styles/ShowCar.css'

const ShowCars : React.FC = () => {
  
  let pOrigin:ReactElement;
  const  checkOrigin = (isOrignUSA:boolean) =>
  {

    if(isOrignUSA)
    pOrigin = <p> The car was created in the United States</p>
    else
    pOrigin = <p> The car was not created in the United States</p>
  }
  
  return (
    <div className='CarShowMain'>

        {myCarStore.FillterCars.map((car:{nameCar:string,
                                      isOriginUSA:boolean,
                                      firstHand:boolean,
                                      ContentName:string,
                                      id?:number;})=>{
                                        

           return (
            <Link to={`/${car.id}`} className='LinkCarShow Links' key={car.id}>
            <div className='CarShow' onClick={()=>myCarStore.CarShowNowId=car.id!} key={car.id}>
              <p>The name of the car - {car.nameCar}</p>
              {
                checkOrigin(car.isOriginUSA)
              }
              {pOrigin}
              <p>The name of the company - {car.ContentName}</p>
              <br />
            </div>
          </Link>
               
           )
        })}

    </div>
  )
}

export default  observer(ShowCars);