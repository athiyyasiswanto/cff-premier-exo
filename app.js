"use strict";

// const request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     `http://transport.opendata.ch/v1/stationboard?station=Yverdon-les-bains&limit=10`
//   );
//   request.send();

//   request.addEventListener("load", e => {

// console.log(request)


//   })






// La première ligne const board = document.querySelector("#board"); 
// sélectionne l'élément HTML avec l'ID "board". Car on met les infos dedans
const board = document.querySelector("#board");
board.innerHTML = ""; // innerhtml vide les contenus dans board

//Elle demande les données de la station de train 
//Yverdon-les-bains pour les 10 prochains départs, la limite est 10
const getTable = () => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://transport.opendata.ch/v1/stationboard?station=Yverdon-les-bains&limit=10`
  );
  request.send();

//Lorsque la réponse est reçue, un événement "load" est déclenché et la 
//fonction anonyme associée à ce dernier est appelée. 
//Cette fonction parse les données reçues en utilisant JSON.parse() 
//et appelle la fonction renderTable(data.stationboard) avec les données parsées.

  request.addEventListener("load", (e) => {
    const data = JSON.parse(request.responseText);
    renderTable(data.stationboard);
    console.log(data.stationboard);
  
  });
};


const renderTable = (table) => {
  const html = table
    .map((station) => {
      const time = station.stop.departure.substr(11, 5); // mettre à l'heure, on avance de 11, on prend les 5 suivants
      return `<article>
       <div class="time">${time}</div>
        <div class="category" data-category="${station.category}">${station.category}</div>
        <div class="destination">${station.to}</div>
      </article>`;
    })
    .join("");
  board.insertAdjacentHTML("afterbegin", html);
};

getTable();

