"use strict"
// html element 
const containerEl = document.getElementById("container")
const submitbuttonEl = document.getElementById("submit-btn")
const cardsEl = document.getElementById("cards");
const nameEl = document.getElementById("name");
const adressEl = document.getElementById("adress");
const emailEl = document.getElementById("email");
const jewelEl = document.getElementById("jewelry");
const electronicEl = document.getElementById("electronics")
const womensEl = document.getElementById("womens");
const cartEl = document.getElementById("cart-counter");
const deliveryEl = document.getElementById("delivery")
const formEl = document.getElementById("form");



fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        const categorybtn = document.getElementsByClassName("catergory-button");
        for (let i = 0; i < categorybtn.length; i++) {
            categorybtn[i].addEventListener("click", function () {
                store(data, this.getAttribute("data-category"));
            });
        }
        store(data, "all");
    });






function store(data, selectedCategory) {



    const item = data.filter(item => {
        if (selectedCategory === "all") {
            return true;
        } else if (selectedCategory === item.category) {
            return true;
        }
        return false;
    });

    console.log(item)

    cardsEl.innerHTML = "";


    for (let i = 0; i < item.length; i++) {




        cardsEl.innerHTML += `
        <article class="card">
        <h2 class="title">${item[i].title}</h2>
        <img src="${item[i].image}" alt="img" class="images">
        <p class="descri">${item[i].description}</p>
        <br>
        <p>  ${"ID: " + item[i].id}</p>   
        <p class="catergory">${item[i].category}</p>
        <p class="price"> ${" Price: " + item[i].price + " $"}</p>
        <p class="rating"> ${" Rating: " + item[i].rating.rate}</p>
        <br>
        <p class="rating"> ${" Rating vote: " + item[i].rating.count}</p>
        <br>
        
        <input type="button" value="add to cart "  class="btn" onClick="addToCart('${item[i].id}','${item[i].title.replace("'","")}',
        '${item[i].price}','${item[i].image}'  )">

    </article>
    `

    }






}


// skapar en array för  allt som lägs in shopping cart

let arrayItems = JSON.parse(localStorage.getItem("items")) || []

console.log(arrayItems);


function addToCart(id, title, price, image, ) {

    arrayItems.push({
        id,
        title,
        price,
        image

    });





    //sätter in världen in local storage när man pushar in föremål i arrayen

    localStorage.setItem("items", JSON.stringify(arrayItems));


    cartcount();


    totalsum = 0;
    arrayItems.forEach(element => {


        totalsum += parseFloat(element.price);



    })

}

// function för cart counter
function cartcount() {



    for (let i = 0; i < arrayItems.length; i++) {

        cartEl.innerHTML = arrayItems.length;
    }
}

// aktiverar cart count så den visas driekt på sidan
cartcount();



let totalsum = 0;


//funktioner  

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

        }

    );


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



    localStorage.clear();
    setTimeout(() => {
        document.location.reload();
    }, 600);


}