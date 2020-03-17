//import dependency to work async/await/ promises/ fetch in IE
import "isomorphic-fetch";
import '../scss/main.scss';

const allCases = document.querySelector('.all-cases');
const allDeaths = document.querySelector('.all-deaths');
const allRecovered = document.querySelector('.all-recovered');

const nepalCases = document.querySelector('.nepal-cases');
const nepalDeaths = document.querySelector('.nepal-deaths');
const nepalRecovered = document.querySelector('.nepal-recovered');

const deCases = document.querySelector('.de-cases');
const deDeaths = document.querySelector('.de-deaths');
const deRecovered = document.querySelector('.de-recovered');

async function getAllCases() {
    let response = await fetch(`https://corona.lmao.ninja/all`);
    let data = await response.json()
    return data;
}

async function getAllCountries(country) {
    let response = await fetch(`https://corona.lmao.ninja/countries/${country}`);
    let data = await response.json()
    return data;
}

async function getByTypes(type) {
    let response = await fetch(`https://corona.lmao.ninja/countries?sort=${type}`);
    let data = await response.json()
    return data;
}

getAllCases()
    .then(data => {
        showAllCases(data.cases, allCases);
        showAllCases(data.deaths, allDeaths);
        showAllCases(data.recovered, allRecovered);
    });

getAllCountries('Nepal')
    .then(data => {
        showAllCases(data.cases, nepalCases);
        showAllCases(data.deaths, nepalDeaths);
        showAllCases(data.recovered, nepalRecovered);
    });

getAllCountries('Germany')
    .then(data => {
        showAllCases(data.cases, deCases);
        showAllCases(data.deaths, deDeaths);
        showAllCases(data.recovered, deRecovered);
    });

getByTypes('cases')
    .then(data => {
        console.log(data)
        // showAllCases(data.cases, nepalCases);
        // showAllCases(data.deaths, nepalDeaths);
        // showAllCases(data.recovered, nepalRecovered);
    });

function showAllCases(data, element) {
    element.innerText = data;
}