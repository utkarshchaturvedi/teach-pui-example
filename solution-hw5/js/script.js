
//Creating classes for Glaze types and Pack sizes with constructors 

class glaze{

    glazeType;
    glazePrice;
    
    constructor (glazeType, glazePrice){
        this.glazeType = glazeType;
        this.glazePrice = glazePrice;
    }
}


class Pack{

    packSize;
    packPrice;

    constructor (packSize, packPrice){
        this.packSize = packSize;
        this.packPrice = packPrice;
    }
}


//Creating objects of the class 'Glaze' and 'Pack' with values as prescribed in the HW doc

let keepOriginal = new glaze('Keep original', 0);
let sugarMilk = new glaze('Sugar milk', 0);
let vanillaMilk =  new glaze('Vanilla Milk', 0.5);
let doubleChocolate = new glaze('Double chocolate', 1.50);

let size1 = new Pack(1,1);
let size3 = new Pack(3,3);
let size6 = new Pack(6,5);
let size12 = new Pack(12,10)

//Creating arrays with objects for glazes and sizes

let allGlazes = [keepOriginal, sugarMilk, vanillaMilk, doubleChocolate];
let allPacks = [size1, size3, size6, size12];

let glazeSelect = document.getElementById("glazing");
let packSelect = document.getElementById("packsize");


//Fill up Glaze dropdown array with a for loop

for(i=0; i< allGlazes.length; i++){
    let selected = document.createElement("option");
    selected.innerHTML = allGlazes[i].glazeType;
    glazeSelect.appendChild(selected);
}

//Fill up Pack dropdown array with a for loop

for(i=0; i< allPacks.length; i++){
    let selected = document.createElement("option");
    selected.innerHTML = allPacks[i].packSize;
    packSelect.appendChild(selected);
}

let basePrice= 2.49;

//Function to update price
function priceUpdate(element) {
    const price = document.getElementById("price");
    let newPrice = ((basePrice + allGlazes[glazeSelect.selectedIndex].glazePrice)*allPacks[packSelect.selectedIndex].packPrice).toFixed(2);
    console.log(newPrice)
    // Change the price in html with the newPrice
    price.innerHTML = "$" + newPrice;
}





//Dynamically changing content (HW4)


let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}


const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

document.querySelector(".title-wrapper h1").innerText= rollType + " Cinnamon Roll";
document.querySelector(".product-image-large").src= "Assets/" + rolls[rollType].imageFile;
document.querySelector("#price").innerText="$"+ rolls[rollType].basePrice;

function addToCart(){
    let RollInfo= new Roll(rollType, allGlazes[glazeSelect.selectedIndex].glazeType, allPacks[packSelect.selectedIndex].packSize, rolls[rollType].basePrice);
    cart.push(RollInfo);
    console.log(cart);
}
