//import dependency to work async/await/ promises/ fetch in IE
import 'isomorphic-fetch';

import '../scss/main.scss';

const allCases = selector('.all-cases');
const allDeaths = selector('.all-deaths');
const allRecovered = selector('.all-recovered');

const nepalCases = selector('.nepal-cases');
const nepalDeaths = selector('.nepal-deaths');
const nepalRecovered = selector('.nepal-recovered');

const uaCases = selector('.ua-cases');
const uaDeaths = selector('.ua-deaths');
const uaRecovered = selector('.ua-recovered');

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

getData('https://corona.lmao.ninja/all').then((data) => {
  showAllCases(data.cases, allCases);
  showAllCases(data.deaths, allDeaths);
  showAllCases(data.recovered, allRecovered);
});

getData(`https://corona.lmao.ninja/countries/Nepal`).then((data) => {
  showAllCases(data.cases, nepalCases);
  showAllCases(data.deaths, nepalDeaths);
  showAllCases(data.recovered, nepalRecovered);
});

getData(`https://corona.lmao.ninja/countries/Ukraine`).then((data) => {
  showAllCases(data.cases, uaCases);
  showAllCases(data.deaths, uaDeaths);
  showAllCases(data.recovered, uaRecovered);
});

function showAllCases(data, element) {
  element.innerText = data;
}

function selector(name) {
  return document.querySelector(name);
}
