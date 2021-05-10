const input = document.getElementById("country-input");
const btn = document.getElementById("btn");
const table = document.getElementById("table");
const row = document.getElementById("first-row");
const ctx = document.getElementById("chart").getContext("2d");

//get data function
function getData(e) {
  const country = input.value;
  if (input.value !== "") {
    apiData()
      .then((res) => res.json)
      .then((data) => {
        const tr = document.createElement("tr");
        if (
          (row.innerHTML = `
        <td>World-Wide</td>
        `)
        ) {
          document.querySelector("#table").style.display = "block";
          row.innerHTML = `
          <td>Global Cases</td>
          <td>${data.Global.NewConfirmed}</td>
          <td>${data.Global.TotalConfirmed}</td>
          <td>${data.Global.NewDeaths}</td>
          <td>${data.Global.TotalDeaths}</td>
          <td>${data.Global.NewRecovered}</td>
          <td>${data.Global.TotalRecovered}</td>
         `;
        }
        data.Countries.forEach((place) => {
          if (place.Country.toLowerCase() === country.toLowerCase()) {
            tr.innerHTML = `
            <td>${place.Country}</td>
            <td>${place.NewConfirmed}</td>
            <td>${place.TotalConfirmed}</td>
            <td>${place.NewDeaths}</td>
            <td>${place.TotalDeaths}</td>
            <td>${place.NewRecovered}</td>
            <td>${place.TotalRecovered}</td>
            `;
            table.appendChild(tr);
            input.value = "";
          }
        });
      })
      .catch((e) => console.log(e));
  } else {
    alert("Please enter any country name");
  }
  e.preventDefault();
}
//api process function
async function apiData() {
  try {
    const api = await fetch("https://api.covid19api.com/summary");
    const json = await api.json();
    return { json };
  } catch (error) {
    alert("Failed to load data", error);
  }
}

//event listeners
btn.addEventListener("click", getData);
