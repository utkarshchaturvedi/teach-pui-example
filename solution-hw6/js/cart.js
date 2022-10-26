//HW5


//Set to store rolls . Use local storage
let cart = new Set();
const cartList = new Set;
if(localStorage.getItem("cart")) productList = Array.from(JSON.parse(localStorage.getItem("cart"))); 


//Objects for glazing prices
const glazingPrices= {
    'Original': 0, 'Sugar Milk': 0, 'Vanilla Milk': 0.50, 'Double Chocolate': 1.50
};

//Objects for pack size prices
const packSizePrices = {
    '1': 1, '3': 3, '6': 5, '12': 10
}


//creating a Roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.element = null;
        const newPrice = (this.basePrice + parseFloat(glazingPrices[this.glazing])) * parseFloat(packSizePrices[this.size]);
        this.totalPrice = parseFloat(newPrice.toFixed(2));
    }
}

//Function to save to local storage
function saveToLocalStorage() {
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cartStorage", cartString);
    console.log(cartString);
}

function retrieveFromLocalStorage() {
    const cartString = localStorage.getItem("cartStorage");
    const cartArray = JSON.parse(cartString);
    cart = cartArray;
    console.log(cart);
}

if(localStorage.getItem("cartStorage")!= null){
    retrieveFromLocalStorage();
}



//function to add a new object of class Roll

function addNewItem(rollType, rollGlazing, packSize, basePrice) {
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cartList.add(roll);
    return roll;
}

const originalroll = addNewItem(
    'Original',
    'Sugar Milk',
    "1",
    2.49,
  )

const walnutroll = addNewItem(
    'Walnut',
    'Vanilla Milk',
    "12",
    3.49
)

const raisinroll = addNewItem(
    'Raisin',
    'Sugar Milk',
    "3",
    2.99
)

const appleroll = addNewItem(
    'Apple',
    'Original',
    "3",
    3.49
)


function calculatePrice(roll) {
    let glazingPrice = Object.keys(glazing).find((key) => glazing[key] === roll.glazing);
    let packPrice = Object.keys(packSizePrices).find((key) => packSizePrices[key] === roll.packSize);
    //const newPrice = (roll.basePrice + glazingPrice) * packPrice;
    const newPrice = (roll.basePrice + parseFloat(glazingPrices[roll.glazing])) * parseFloat(packSizePrices[roll.size]);
    roll.totalPrice = parseFloat(newPrice.toFixed(2));
    console.log(roll.totalPrice);
}



//Creating a loop to add new items to cart

for(const roll of cartList) {
    console.log(roll);
    createElement(roll);
}


//Creating a function to add items to cart page with a Template

function createElement(roll) {
    const template = document.querySelector('#item-template');
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector('.cart-item');
    //Appendiung the roll element to the cart list
    const cartListElement = document.querySelector('.cart-list');
    cartListElement.append(roll.element);

    //delete roll function
    const btnDelete = roll.element.querySelector('.delete');
    btnDelete.addEventListener('click',()=> { deleteItem(roll) } );


    updateElement(roll);
    calculatePrice(roll);
    cartTotal();

}

//Function to update cartItems

function updateElement(roll){
    const rollImageElem = roll.element.querySelector('.cart-image');
    rollImageElem.src = "Assets/" + rolls[roll.type].imageFile;

    const rollTypeElem = roll.element.querySelector('#roll-name');
    rollTypeElem.innerText = roll.type + ' ' + "Cinnamon Roll";

    const glazingElem = roll.element.querySelector('#glazing');
    glazingElem.innerText = "Glazing" + ' ' + roll.glazing;

    const packSizeElem = roll.element.querySelector('#pack-size');
    packSizeElem.innerText = "Pack Size: " + roll.size; 

    const rollPriceElem = roll.element.querySelector('#roll-price');
    rollPriceElem.innerText = '$' + roll.totalPrice;
}


//Calculate cartTotal
function cartTotal(){
    const cartTotalPrice = document.querySelector('#totalPrice');
    let priceTotal = 0;
    for (const roll of cartList) {
        priceTotal += roll.totalPrice;
    }
    //console.log(priceTotal);
    cartTotalPrice.innerText = '$' + ' ' + (priceTotal.toFixed(2));
}


//Delete function
function deleteItem(roll) {
    roll.element.remove();
    cart.splice(cart.indexOf(roll), 1);
    cartList.delete(roll);
    saveToLocalStorage();
    console.log(cart);
    cartTotal();
}

