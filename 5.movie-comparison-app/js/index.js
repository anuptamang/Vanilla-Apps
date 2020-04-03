const url = 'https://www.omdbapi.com/';

const fetchData = async (searchTerm) => {
  const response = await axios.get(url, {
    params: {
      apikey: '50fc315c',
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
}

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const searchResults = document.querySelector('.dropdown-content');

const onInput = async event => {
  const movies = await fetchData(event.target.value);
  getMovies(movies);
  if (event.target.value === '') {
    searchResults.innerHTML = '';
    dropdown.classList.remove('is-active');
  }
}

input.addEventListener('input', debounce(onInput, 500));

function getMovies(data) {
  for (let movie of data) {
    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    dropdown.classList.add('is-active')

    a.innerHTML = `
      <img src="${movie.Poster}" alt=""/>
      <h4>${movie.Title}</h4>
    `
    searchResults.appendChild(a)
  }
}
