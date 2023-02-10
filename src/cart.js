"use stritct";


// html element 

const cartEl = document.getElementById("cart-counter")
const cartsectionEl = document.getElementById("cartsection");
const labelEl = document.getElementById("label-cart");
const totalamountEl = document.getElementById("total-price")
const nameEl = document.getElementById("name");
const adressEl = document.getElementById("adress");
const emailEl = document.getElementById("email");
const deliveryEl = document.getElementById("delivery")
const submitbuttonEl = document.getElementById("submit-btn")
const formEl = document.getElementById("form")


let arrayItems = JSON.parse(localStorage.getItem("items")) || []






// counting total cost for all the products in the cart
totalsum = 0;
arrayItems.forEach(element => {


    totalsum += parseFloat(element.price);



})

console.log("totalsum " + totalsum.toFixed(2) + " $")


/* function for cart count when u add to cart it  put number on cart icon 
wasmainly done in index js but has to be here in order for it to work for both pages in local storage */
function cartcount() {



    for (let i = 0; i < arrayItems.length; i++) {

        cartEl.innerHTML = arrayItems.length;
    }
}

//  invokes the  function here
cartcount();

// if stament for if array is not empty show total cost else show empty

if (arrayItems.length !== 0) {

    totalamountEl.innerHTML += ` 

    <h2 class="total-price">${"Total cost : " + totalsum.toFixed(2)   + " $ "}</h2>
    
    `


} else {

    totalamountEl.innerHTML += ` 

 
    
    `


}



//genrating cart items and dispalying theme in here frabbed from local storage from when order was made in main page'


const generateCartItems = () => {

    if (arrayItems.length !== 0) {

        for (let i = 0; i < arrayItems.length; i++) {
            cartsectionEl.innerHTML += `
           
            <article class="card">
            <h3 class="title">${arrayItems[i].title}</h3>
            <img src="${arrayItems[i].image}" alt="img" class="images">
            <br>
            <br>
            <p>  ${"ID: " + arrayItems[i].id}</p>   
            <br>
            <p class="price"> ${" Price: " + arrayItems[i].price + " $"}</p>
            <br>
            <br>
            <img  onclick="removeitem(${[i].id})" src="trash-can.png" alt="icon of trash can" class="delete-icon">
            <br>

        </article>
        `
            console.log(arrayItems)
        }


    } else {

        cartsectionEl.innerHTML = ``

        labelEl.innerHTML = `
        
        <h2> Cart is Empty</h2>
        <a a href="index.html">
        <button class="home-btn">Back to Home </button>
        </a>
        
        
        `
    }
}
// inovkes the  fucntion
generateCartItems();




// this function remoevs items from the art 

const removeitem = (index) => {

    console.log(index)


    arrayItems.splice(index, 1)

    localStorage.setItem("items", JSON.stringify(arrayItems));
    location.reload()
    console.log("selected item is running");
}


function additem() {


    console.log("nu körs add item metoden")
    //hämta in data

    const name = nameEl.value.trim(); // trim 
    const adress = adressEl.value.trim();
    const email = emailEl.value.trim();
    const delivery = deliveryEl.value.trim();



    const idproducts = arrayItems.map(item => {
        return {
            "stringValue": item.id

        }


    });


    if (!name || !email || !adress || !delivery) {


        return;
    }

    let body = JSON.stringify(


        {


            "fields": {
                "email": {
                    "stringValue": email
                },
                "adress": {
                    "stringValue": adress
                },
                "shipping": {
                    "stringValue": delivery
                },
                "Name": {
                    "stringValue": name
                },
                "idproduct": {
                    "arrayValue": {

                        "values": idproducts





                    }
                }
            }
        }
    )







    //skicka fetch anropp med post metoden


    fetch("https://firestore.googleapis.com/v1/projects/ashkans-da1e8/databases/(default)/documents/shop", {


            method: "POST",
            headers: {

                "Content-type": "application/json"
            },
            body: body

        })
        .then(res => res.json())
        .then(data => console.log(data));
    console.log(body)



    confirmationtext();

    localStorage.clear();
    setTimeout(() => {
        document.location.reload();
    }, 2500);


}

// fucntion to write confimation after the pruchase have been made
function confirmationtext() {

    formEl.innerHTML =
        " <p class='confirmation-text'> <strong> <br> <br> Your Order has been conformed thx for shopping at Ash's fakestore! </strong> </p> <br> <br> <br> "
}


submitbuttonEl.addEventListener("click", additem)