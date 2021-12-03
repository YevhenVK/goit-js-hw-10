import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    bodyContainer: document.querySelector('body'),
    wordFinder: document.querySelector('#search-box'),
    coutryList: document.querySelector('.country-list'),
    coutryInfo: document.querySelector('.country-info'),
};
refs.wordFinder.addEventListener('input', debounce(onGetWord, DEBOUNCE_DELAY));


function onGetWord(event) {
    const countryName = event.target.value;
    let findedCountryName = countryName.trim();
    if (!findedCountryName) {
        refs.coutryList.innerHTML = "";
    } {
        fetchCountries(findedCountryName)
        .then(countries => {
            if (countries.length > 10) {
               return Notify.info("Too many matches found. Please enter a more specific name.");
            }
            if (countries.length >= 2 && countries.length <= 10) {
                return renderCountryList(countries);
            } else {
                renderCountryListInfo(countries);
            }
            
        })
        .catch(error => Notify.failure("Oops, there is no country with that name"));
    };
};


function renderCountryList(countries) {
    const infoMarkup = countries
    .map((country) => {
        return `
        <li class="country-list__item">
          <div class="country-info__item">
            <img class="country-info_image" src="${country.flags.svg}" width="100px" height="70px" alt="${country.name.official}"/>
            <h2 class="country-name"> ${country.name.official}</h2>
          </div>
        </li>`;
    })
    .join("");
    refs.coutryList.innerHTML = infoMarkup;
};

function renderCountryListInfo(countries) {
    const justCoutryLists = countries
    .map((country) => {
        return `
        <li class="country-list__item">
          <div class="country-info__item">
            <img class="country-info_image" src="${country.flags.svg}" width="100px" height="70px" alt="${country.name.official}"/>
            <h2 class="country-name"> ${country.name.official}</h2>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>
          </div>
        </li>`;
    })
    .join("");

    refs.coutryList.innerHTML = justCoutryLists;
};