"use strict"

//sökvägen till webbtjänst för att göra tillgänglig från alla metoder

let url = "https://studenter.miun.se/~chjo2104/writeable/projekt_webservice_vt22-christinejohanson/menuapi.php";
let url2 = "https://studenter.miun.se/~chjo2104/writeable/projekt_webservice_vt22-christinejohanson/bookingapi.php";
/*mot local host
let url2 = "http://localhost/projekt_webservice_vt22-christinejohanson/bookingapi.php";
let url = "http://localhost/projekt_webservice_vt22-christinejohanson/menuapi.php";*/

//variabler för menu
const menunameInput = document.getElementById("menuname");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const submitButton = document.getElementById("submitMenu");

//variabler för bokning
const bookingnameInput = document.getElementById("bookingname");
const submitBtn = document.getElementById("submit");

/*if sats o eventlistener på knappen skapa bokning */
if (submitBtn) {
    submitBtn.addEventListener("click", updateBooking);
}
//it eventlistener på knappen lägg till på menyn. 
if (submitButton) {
    submitButton.addEventListener("click", createMenu);
}

//kör funktion när sidan blivit laddad 
window.onload = init;
//funktioner som körs
function init() {
    //läsa in menu och booking
    getBooking();
    getMenu();
}

/* functions för bokning osv */
//läsa in bokningar från webbtjänst
function getBooking() {
    fetch(url2)
        //kolla så ok svar 200 från restwebbtjänst
        .then(response => {
            if (response.status != 200) {
                //om det inte är 200 så stannar det här. kod fortsätter ej köras
                return
            }
            //200 i respons
            return response.json()
                //skapa funktion för att skriva ut på skärm
                .then(data => writeBookings(data))
                .catch(err => console.log(err))
        })
}

//skriva ut bokningar med lista 
function writeBookings(bookings) {
    //vart den ska skrivas ut
    const trEl = document.getElementById("bookList2");
    trEl.innerHTML = "";
    //vilken array som ska loopas igenom(bookings) o vad elementet ska heta
    bookings.forEach(booking => {
        trEl.innerHTML += `<tr>
        <td id="bookingname${booking.id}" contenteditable>${booking.name}</td>
        <td id="email${booking.id}" contenteditable>${booking.email}</td>
        <td id="date${booking.id}" contenteditable>${booking.date}</td>
        <td id="time${booking.id}" contenteditable>${booking.time}</td>
        <td id="persons${booking.id}" contenteditable>${booking.persons}</td>
        <td><button data-id="${booking.id}" class="updateBooking">Uppdatera</button></td>
        <td><button data-id="${booking.id}" class="deleteBooking">Radera</button></td></tr>`;
    });
    //läs in alla
    let deleteEl = document.getElementsByClassName("deleteBooking");
    let updateEl = document.getElementsByClassName("updateBooking");

    for (let i = 0; i < deleteEl.length; i++) {
        deleteEl[i].addEventListener("click", deleteBooking);
        updateEl[i].addEventListener("click", updateBooking);
    }
}

//uppdatera bokning 
function updateBooking(event) {
    //läs in värden
    let id = event.target.dataset.id;
    let name = document.getElementById("bookingname" + id).innerHTML;
    let email = document.getElementById("email" + id).innerHTML;
    let date = document.getElementById("date" + id).innerHTML;
    let time = document.getElementById("time" + id).innerHTML;
    let persons = document.getElementById("persons" + id).innerHTML;

    let jsonStr = JSON.stringify({
        name: name,
        email: email,
        date: date,
        time: time,
        persons: persons,
        id: id
    });
    //fetchmetod PUT
    fetch(url2, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })

        .then(response => response.json())
        .then(data => {
            //för att kunna skriva ut fel/rättmeddlande på adminsidan
            let messageEl = document.getElementById("message");
            messageEl.innerHTML = "Bokningen blev uppdaterad";
            getBooking()
        })
        .catch(err => console.log(err))
}


//radera en bokning
function deleteBooking(event) {
    //lagra i en variabel
    let id = event.target.dataset.id;
    //fetch anrop till webbtjänst med get parameter.
    fetch(url2 + "?id=" + id, {
        //måste skicka med metoden delete istälelt för get som är default
        "method": "DELETE"
    })
        .then(response => response.json())
        //anropa bokningar på nytt för att få listan uppdaterad. 
        .then(data => getBooking())
        .catch(err => console.log(err))
    let messageEl = document.getElementById("message");
    messageEl.innerHTML = "Bokningen blev raderad";
}

//MENY FUNKTIONER
//läsa in menu från webbtjänst
function getMenu() {
    fetch(url)
        //kolla så ok svar 200 från restwebbtjänst
        .then(response => {
            if (response.status != 200) {
                //om det inte är 200 så stannar det här. kod fortsätter ej köras
                return
            }
            //200 i respons
            return response.json()
                //skapa funktion för att skriva ut på skärm
                .then(data => writeMenu(data))
                .catch(err => console.log(err))
        })
}

function writeMenu(menus) {

    //vart menu ska skrivas ut
    const trElement = document.getElementById("courseList2");

    /* tar bort innerhtml rensning. */
    trElement.innerHTML = "";
    //vilken array som ska loopas igenom(menus) o vad elementet ska heta
    menus.forEach(menu => {
        trElement.innerHTML += `<tr>
            <td id="menuname${menu.id}" contenteditable>${menu.name}</td>
            <td id="description${menu.id}" contenteditable>${menu.description}</td>
            <td id="price${menu.id}" contenteditable>${menu.price}</td>
            <td id="category${menu.id}" contenteditable>${menu.category}</td>
            <td><button data-id="${menu.id}" class="updateMenu">Uppdatera</button></td>
            <td><button data-id="${menu.id}" class="deleteMenu">Radera</button></td></tr>`;
        //Här blir det då samma klass namn också. Så deleteMenu och updateMenu passar bra istället.
    });
    //variabler och läser in alla

    let deletemenuEl = document.getElementsByClassName("deleteMenu");
    let updatemenuEl = document.getElementsByClassName("updateMenu");
    for (let i = 0; i < deletemenuEl.length; i++) {
        deletemenuEl[i].addEventListener("click", deleteMenu);
        updatemenuEl[i].addEventListener("click", updateMenu);
    }
}

//lägga till en menu
function createMenu(event) {
    //hindra standardbeteende o sidan laddas om
    event.preventDefault();

    //lagrar i nya variabler
    let name = menunameInput.value;
    let description = descriptionInput.value;
    let price = priceInput.value;
    let category = categoryInput.value;

    //nytt js objekt som vi kan konvertera till json
    let jsonStr = JSON.stringify({

        name: name,
        description: description,
        price: price,
        category: category,

    });

    //fetchanrop med inställningar
    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })

        .then(response => response.json())
        //o så ladda igen o rensa
        .then(data => eraseForm())
        .catch(err => console.log(err))
    let messageEl = document.getElementById("message");
    messageEl.innerHTML = "Ny meny tillagd";
}

//för att uppdatera o tömma formuläret
function eraseForm() {
    menunameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    categoryInput.value = "";

    //anropa för att ladda igen
    getMenu();
}

//för att uppdatera menyn
function updateMenu(event) {
    //läs in värden
    let id = event.target.dataset.id;
    let name = document.getElementById("menuname" + id).innerHTML;
    let description = document.getElementById("description" + id).innerHTML;
    let price = document.getElementById("price" + id).innerHTML;
    let category = document.getElementById("category" + id).innerHTML;

    let jsonStr = JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
        id: id
    });
    //fetchmetod PUT
    fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })

        .then(response => response.json())
        .then(data => {
            //för att kunna skriva ut fel/rättmeddlande på adminsidan
            let messageEl = document.getElementById("message");
            messageEl.innerHTML = "Menyn blev uppdaterad";
            getMenu()
        })
        .catch(err => console.log(err))
}

//radera en menu
function deleteMenu(event) {
    let id = event.target.dataset.id;

    fetch(url + "?id=" + id, {
        method: "DELETE"

    })
        .then(response => response.json())
        .then(data => getMenu())
        .catch(err => console.log(err))
    let messageEl = document.getElementById("message");
    messageEl.innerHTML = "Menyn blev raderad";
}

