const URL_FETCH_CATEGORIES = 'https://api.chucknorris.io/jokes/categories'

const BASE_URL = 'https://api.chucknorris.io/jokes/'
const METHOD = 'GET'
const CONTENT_TYPE = 'application/json'
const MODE = 'cors'

let formSearchJoke = document.querySelector('#joke--search-term')
let formInput = document.querySelector('.joke--search-box')

let jokeParagraph = document.querySelector('#joke')

formSearchJoke.addEventListener('submit', function(e){
  e.preventDefault();
  const resultadoSearch = getSearchJoke(formInput.value).then((resposta) => {
      return resposta.result
    }
  ).then(data => {
    data.forEach(element => {
      jokeParagraph.innerHTML = `" ${element.value}. "`
    })
  })
})


async function getSearchJoke(term){
  try { 
    const response = await fetch(`${BASE_URL}search?query=${term}`, {
      method: METHOD,
      mode: MODE,
      headers: {
        'Content-Type': CONTENT_TYPE
      },

    })
    return await response.json()
  } catch (error){
    console.log(error)
  }
}


async function getJoke(category){
  const joke = await getRandomJokeFromCategory(category)
  let imgNode = document.querySelector('#avatar')

  imgNode.src = joke.icon_url
  jokeParagraph.innerHTML = `" ${joke.value}. "`
}

async function getRandomJoke(){
  try {
    const response = await fetch(`${BASE_URL}random`, {
      method: METHOD,
      mode: MODE,
      headers: {
        'Content-Type': CONTENT_TYPE
      },

    }) //.then(res => console.log(res.json()))
    return await response.json()
  } catch (error){
    console.log(error)
  }
}

async function getRandomJokeFromCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}random?category=${category}`, {
      method: METHOD,
      mode: MODE,
      headers: {
        'Content-Type': CONTENT_TYPE
      },
    }) //.then(res => console.log(res.json()))
    return await response.json()
  } catch(error){
    console.log(error)
  } 
}

getJoke('animal')