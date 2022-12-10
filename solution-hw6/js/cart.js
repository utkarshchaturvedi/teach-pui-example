let cart = JSON.parse(localStorage.getItem('cart'));

//creating a Roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatedPrice = this.calculatedPrice;
    }
}

//Objects for glazing prices
let glazingPrices= {
    'Keep Original': 0, 
    'Sugar Milk': 0,
    'Vanilla Milk': 0.50, 
    'Double Chocolate': 1.50
};

//Objects for pack size prices
let packSizePrices = {
    '1': 1, 
    '3': 3, 
    '6': 5, 
    '12': 10
}

//Initializing glazing and pack prices
let glazePrice = 0; 
let packPrice = 1;

//function to update the total price
function updateCartPrice() {
    let totalPrice = 0;
    for (i=0; i<cart.length; i++) {
        totalPrice = totalPrice + parseFloat(cart[i].calculatedPrice);
    }
    const cartPriceElem = document.querySelector('#total-price');
    cartPriceElem.innerText = "$" + totalPrice.toFixed(2);
}

//function to delete the roll 
function deleteItem(cartItemElem, roll) {
    cartItemElem.remove();
    //setting an index for element to be removed
    let i = cart.indexOf(roll);
    cart.splice(i, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    //Call function to update cart price 
    updateCartPrice();
    //console.log('Updated Cart', cart);
}


//A for loop to add items to the cart
for (i=0; i<cart.length; i++) {
    const template = document.querySelector('#item-template');
    const clone = template.content.cloneNode(true);
    cartItemElem = clone.querySelector('.cart-item');

    //Function to delete a roll item
    const btnDelete = cartItemElem.querySelector('.delete');
    btnDelete.addEventListener('click',()=> {  deleteItem(cartItemElem, roll); } );

    let roll = cart[i];

    //Appending the roll element to the cart list
    const cartListElement = document.querySelector('.cart-list');
    cartListElement.append(cartItemElem);

    //Updating roll data
    const rollImageElem = cartItemElem.querySelector('.cart-image');
    rollImageElem.src = "Assets/" + rolls[cart[i].type].imageFile;

    const rollTypeElem = cartItemElem.querySelector('#roll-name');
    rollTypeElem.innerText = cart[i].type + ' ' + "Cinnamon Roll";

    const glazingElem = cartItemElem.querySelector('#glazing');
    glazingElem.innerText = "Glazing" + ' ' + cart[i].glazing;

    const packSizeElem = cartItemElem.querySelector('#pack-size');
    packSizeElem.innerText = "Pack Size: " + cart[i].size; 

    let rollPrice = (cart[i].basePrice + glazingPrices[cart[i].glazing])*packSizePrices[cart[i].size];
    cart[i].calculatedPrice = rollPrice.toFixed(2);
    console.log(rollPrice);
    const rollPriceElement = cartItemElem.querySelector('#roll-price');
    rollPriceElement.innerText = "$" + cart[i].calculatedPrice;
}
  
// update total price for the bill
updateCartPrice();