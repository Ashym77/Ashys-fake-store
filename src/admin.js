"use strict";

// html element

const nameEl = document.getElementById("admin-name");
const addressEl = document.getElementById("admin-adress");
const emailEl1 = document.getElementById("admin-email");
const idEl1 = document.getElementById("admin-id")
const containersEl = document.getElementById("container");
const admindeliveryEl = document.getElementById("admin-delivery");
const cartEl = document.getElementById("cart-counter");


//fetch för skriva ut all datafrån min databas

fetch("https://firestore.googleapis.com/v1/projects/ashkans-da1e8/databases/(default)/documents/shop")
  .then(res => res.json())
  .then(data => admingpage(data));



function admingpage(orders) {


  console.log(orders);

  const order = orders.documents

  for (let item of order) {
    containersEl.innerHTML += `
        <article class="card">
        <ul class="admin-list">
        
        <p class="order-id"> ${"order ID:"+ item.name  }</p>
        <br>
        <li> ${"Name: "+ item.fields.Name.stringValue}</li>
        <li> ${"Adress "+ item.fields.adress.stringValue}</li>
        <li>${"Email: " + item.fields.email.stringValue}</li>
        <li>${"Shiping option: " + item.fields.shipping.stringValue}</li>
      <li>${"product id's: " +(item.fields.idproduct.arrayValue.values.map(values=>values.stringValue)) }</li>
      

        
        </ul>
        <input type="button" value=" delete order" class="delete-btn" " onClick="deleteuser('${item.name}')">
        <input type="submit" value="uppdate order" class="update-btn" onClick="updateuser('${item.name}')">
       
        
    

        
       
    </article>
    `

  }





}

//fetch för delete en order

function deleteuser(name) {



  console.log("user delete function active");
  console.log(name)


  fetch("https://firestore.googleapis.com/v1/" + name, {

      method: "DELETE"




    })
    .then(res => res.json())
    .then(data => console.log(data));




  setTimeout(() => {
    document.location.reload();
  }, 700);


}




//fetch för uppdatera order


function updateuser(name) {


  let namn = nameEl.value;
  let adress = addressEl.value;
  let email = emailEl1.value;
  let id = idEl1.value;
  let admindelivery = admindeliveryEl.value;

/*detta gör så att formen måste fyllas i för kunna skicka tyvär lyckades 
jag inte få ut att man kunde ändra fällt men kommer jobba vidare på det senare
så jag skrev ut med alert för tillfället


*/

  if (!namn || !email || !adress || !admindelivery || !id) {

    alert("please fill all the field in the form above for updating. email field must contain @ ")
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
          "stringValue": admindelivery
        },
        "Name": {
          "stringValue": namn
        },
        "idproduct": {
          "arrayValue": {
            "values": id.split(",").map(id => ({
              "stringValue": id.trim()

            }))
          }
        }
      }
    }



  )



  console.log("nu körs uppdatering metoden");

  fetch("https://firestore.googleapis.com/v1/" + name, {

      method: "PATCH",
      headers: {

        "Content-type": "application/json"


      },

      body: body




    }).then(res => res.json())
    .then(data => console.log(data));
  console.log(body)
  console.log("nukörs uppdate")

  setTimeout(() => {
    document.location.reload();
  }, 2000);


}

// min array som jag hämtar data ifrån local storage där produkterna finns
let arrayItems = JSON.parse(localStorage.getItem("items")) || []

// funktion för räkna varorr i korgen varge gång man klicka på en vara

function cartcount() {



  for (let i = 0; i < arrayItems.length; i++) {

    cartEl.innerHTML = arrayItems.length;
  }
}

// för att det ska skrivas ut 
cartcount();