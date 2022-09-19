import {makeAutoObservable} from 'mobx'

interface Car {
    nameCar:string,
    isOriginUSA:boolean,
    firstHand:boolean,
    ContentName:string,

    id?:number;
}

const addCar = (cars:Car[], newCar:Car ) : Car[] =>
[
    ...cars,
    {
        nameCar:newCar.nameCar,
        isOriginUSA:newCar.isOriginUSA,
        firstHand:newCar.firstHand,
        ContentName:newCar.ContentName,
        id:Math.max(0,Math.max(...cars.map( ({id}) => id!)))+1
    }
]

const removeCar = (cars:Car[] , id:number) : Car[]=>
{
    cars = cars.filter((car)=>car.id !== id);
    return cars;
}

const showCar = (cars:Car[],kindFilter:string , ContentNameFilter?:string ) : Car [] => 
{
    switch(kindFilter) {
        case 'firstHand':
            cars = cars.filter((car)=>car.firstHand);
            return cars;

        case 'ContentName':
            cars = cars.filter((car)=>car.ContentName ===  ContentNameFilter)
            return cars;
        
        case 'isOriginUSA' :
            cars = cars.filter((car)=>car.isOriginUSA)
            return cars;

        default :
        return cars;
    }
}


const getCar = (cars:Car[],idCar:number) : Car=>
{
    return cars.filter((car)=>car.id === idCar)[0]
}

// const orderCars = (cars:Car[],typeOrder:string,orderUpDown:string) =>
// {
//     cars.forEach(car => {
//         ca
//     });
// }

class CarStore {
    newCarName : string = "";
    isOrignUsa : boolean = false;
    firstHand : boolean = false;
    ContentName : string = "";

    CarShowNowId : number = 1;
    CarChosen : Car = {nameCar:"",
    isOriginUSA:true,
    firstHand:true,
    ContentName:"",
    id:0
     } ;

    CarShow : Car = {nameCar:"",
    isOriginUSA:true,
    firstHand:true,
    ContentName:"",
    id:0
     } ;
     
    Cars : Car[] = [];

    Cars_ToShow : Car[] = [];

    constructor()
    {
        makeAutoObservable(this);
    }

    // addCar = (newNameCar:string , isOriginUSA:boolean, firstHand:boolean, ContentName:string) => {

    //     this.Cars = addCar(this.Cars,{
    //         nameCar:newNameCar,
    //         isOriginUSA:isOriginUSA,
    //         firstHand: firstHand,
    //         ContentName:ContentName,
    //         });

    // // return defualt value for another add
    // this.newCarName = "";
    // this.isOrignUsa= false;
    // this.firstHand = false;
    // this.ContentName= "";


    // }


    addCar = (newNameCar:string , isOriginUSA:boolean, firstHand:boolean, ContentName:string) : boolean=> {

        for (let index = 0; index < this.Cars.length; index++) {
            if(this.Cars[index].nameCar === newNameCar
                && this.Cars[index].ContentName === ContentName)
            {
                return false;
            }
        }

        this.Cars = addCar(this.Cars,{
            nameCar:newNameCar,
            isOriginUSA:isOriginUSA,
            firstHand: firstHand,
            ContentName:ContentName,
            });

    // return defualt value for another add
    this.newCarName = "";
    this.isOrignUsa= false;
    this.firstHand = false;
    this.ContentName= "";

    return true;

    }


    removeCar = (id:number)=>
    {
        this.Cars = removeCar(this.Cars,id);
    
    }

    get getCars () : Car[] {
        return this.Cars;
    }

    showCarsFiilter = (kindFilter : string, ContentNameFilter?:string) =>{
        if(ContentNameFilter)
        {
            this.Cars_ToShow =  showCar(this.Cars,kindFilter,ContentNameFilter);
        }

        else
            this.Cars_ToShow = showCar(this.Cars,kindFilter);
    }

    getCar = (idCar:number) =>
    {
        this.CarChosen = getCar(this.Cars,idCar);
    }

    get FillterCars () : Car[] {
        return this.Cars_ToShow;
    }
}

const myCarStore = new CarStore();
export default myCarStore;