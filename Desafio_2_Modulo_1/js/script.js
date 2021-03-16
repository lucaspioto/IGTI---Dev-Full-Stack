let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoritesCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
    tabCountries = document.querySelector('#tabCountries');
    tabFavorites = document.querySelector('#tabFavorites');
    countCountries = document.querySelector('#countCountries');
    countFavorites = document.querySelector('#countFavorites');

    totalPopulationList = document.querySelector('#totalPopulationList');
    totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

    numberFormat = Intl.NumberFormat('pt-BR');

    fecthCountries();
});

async function fecthCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    allCountries = json.map(country => {
        const { numericCode, translations, population, flag, nativeName } = country;

        return {
            id: numericCode,
            name: translations.br,
            population,
            formattedPopulation: formatNumber(population),
            flag,
            nativeName,
        };
    });
    render();
}

const render = () => {
    renderCountryList();
    renderFavorites();
    renderSumary();

    handleCountryButtons();
}

const renderCountryList = () => {
    let countriesHTML = '<div>';
    allCountries.forEach(country => {
        const { name, nativeName, flag, id, population, formattedPopulation } = country;

        const countryHTML = `
                <div class = 'country' >
                    <div>
                        <a id = "${id}" class = 'btn' > + </a>
                    </div>
                    <div>
                        <img src = "${flag}" alt = "${name}">
                    </div>
                    <div>
                        <ul>
                            <li>Nome: ${name}</li>
                            <li>Nome Nativo: ${nativeName}</li>
                            <li>População: ${formattedPopulation}</li>
                        </ul>
                    </div>
                </div>
                `;

        countriesHTML += countryHTML;
    });

    countriesHTML += '</div>'
    tabCountries.innerHTML = countriesHTML;
};

const renderFavorites = () => {
    let favoritesHTML = '<div>';

    favoritesCountries.forEach(country => {
        const { name, nativeName, flag, id, population, formattedPopulation } = country;

        const favoriteCountryHTML = `
                <div class = 'country' >
                    <div>
                        <a id = "${id}" class = "btn -fav"> x </a>
                    </div>
                    <div>
                        <img src = "${flag}" alt = "${name}">
                    </div>
                    <div>
                        <ul>
                            <li>Nome: ${name}</li>
                            <li>Nome Nativo: ${nativeName}</li>
                            <li>População: ${formattedPopulation}</li>
                        </ul>
                    </div>
                </div>
                `;

        favoritesHTML += favoriteCountryHTML;

    });

    favoritesHTML += '</div>';
    tabFavorites.innerHTML = favoritesHTML;
};

const renderSumary = () => {
    countCountries.textContent = allCountries.length;
    countFavorites.textContent = favoritesCountries.length;

    const totalPopulation = allCountries.reduce((acc, curr) => {
        return acc + curr.population;
    }, 0);

    const totalFavorites = favoritesCountries.reduce((acc, curr) => {
        return acc + curr.population;
    }, 0);

    totalPopulationList.textContent = formatNumber(totalPopulation);
    totalPopulationFavorites.textContent = formatNumber(totalFavorites);
};

const handleCountryButtons = () => {
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

    countryButtons.forEach(button => {
        button.addEventListener('click', () => addToFavorites(button.id));
    });

    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => removeFromFavorites(button.id));
    });
};

const addToFavorites = (id) => {
    countryToAdd = allCountries.find(country => country.id === id);

    favoritesCountries = [...favoritesCountries, countryToAdd];

    favoritesCountries.sort((a, b) => {
        return a.name.localeCompare(b.name)
    });

    allCountries = allCountries.filter(country => country.id !== id);
    render()
};

const removeFromFavorites = (id) => {
    countryToRemove = favoritesCountries.find(country => country.id === id);

    allCountries = [...allCountries, countryToRemove];

    allCountries.sort((a, b) => {
        return a.name.localeCompare(b.name)
    });

    favoritesCountries = favoritesCountries.filter(country => country.id !== id);
    console.log(favoritesCountries.length);
    console.log(allCountries.length);
    render()
};

const formatNumber = (number) => numberFormat.format(number);