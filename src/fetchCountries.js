export function fetchCountries(findedCountryName) {
    return fetch(
        `https://restcountries.com/v2/name/${findedCountryName}?fields=name,capital,population,flags,languages`)
        .then((response) => {
            if (!response.ok) {
            throw new Error(response.status);
            }
        return response.json();
        })
    .catch(error => console.err(error));
}