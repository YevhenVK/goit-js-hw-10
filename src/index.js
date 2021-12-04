import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    wordFinder: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
};
refs.wordFinder.addEventListener('input', debounce(onGetWord, DEBOUNCE_DELAY));


function onGetWord(event) {
    const countryName = event.target.value;
    let findedCountryName = countryName.trim();
    if (!findedCountryName) {
        refs.countryList.innerHTML = "";
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
            <img class="country-info__image" src="${country.flags.svg}" width="100px" height="70px" alt="${country.name.official}"/>
            <h2 class="country-name"> ${country.name.official}</h2>
          </div>
        </li>`;
    })
    .join("");
    refs.countryList.innerHTML = infoMarkup;
};

function renderCountryListInfo(countries) {
    const justCountryLists = countries
    .map((country) => {
        return `
        <li class="country-list__item">
          <div class="country-info__item">
            <img class="country-info__image" src="${country.flags.svg}" width="100px" height="70px" alt="${country.name.official}"/>
            <h2 class="country-name"> ${country.name.official}</h2>
            </div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>
        </li>`;
    })
    .join("");

    refs.countryList.innerHTML = justCountryLists;
};