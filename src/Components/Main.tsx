import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myCarStore from '../Mobx/Cars';
import ShowCars from "./ShowCars";

import '../Styles/Main.css'

const Main: React.FC = () => {
  const [companyNameSearch, setCompanyNameSearch] = useState("");
  useEffect(() => {
    myCarStore.showCarsFiilter("start");
  }, [])
  
  return (
    <div className="main">

      <div className="ActionBar">
        <br />
        <div id="actionTop">
        <Link to="/addCars">
          <button>Add Car</button>
        </Link>

        <button onClick={()=>myCarStore.showCarsFiilter('firstHand')}>
        Show only first hand
        </button>

        <button onClick={()=>myCarStore.showCarsFiilter('isOriginUSA')}>
        Show only created in the United States
        </button>
      </div>
      <br />
      <div id='actionBottom'>
      <input type="text" onChange={(e)=>setCompanyNameSearch(e.target.value)} placeholder="Enter name"/>
        <button onClick={()=>myCarStore.showCarsFiilter('ContentName',companyNameSearch)}>
        Show cars according to the company name
        </button>
      </div>
      <br />
      </div>


     

      <br />
      <br />
      <ShowCars/>

    </div>
  );
};

export default Main;
