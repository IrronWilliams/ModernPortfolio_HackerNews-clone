import Story from '../components/Story.js'//going out of components directory with ../, then to components dir, Story.js
import view from '../utils/view.js' //going out of pages directory with ../, then go to utils directory, then to view.js
import baseUrl from '../utils/baseUrl.js' //interpolating value in response variable
import checkFavorite from '../utils/checkFavorite.js' //importing to see if checked favorites are in favorites array. 
import store from '../store.js' //importing for adding/removing favorites


export default async function Stories(path) { //parameter path for the routes. receives path data from router callback via router.js
  //const state = store.getState() //used for favorites. statement not destructured. calling reducer to determine if a given story is within the favorites array in the global state
  const { favorites } = store.getState() //destructuring favorites property. calling reducer to determine if a given story is within the favorites array in the global state 
  console.log(favorites) //checking add/remove favorites functionality. favorited story will be added to array and removed from array 
  const stories = await getStories(path) //calling getStories() to get the return stories. await due to async function with getStories()
  //console.log(stories)                   //returns a big array of objects. and each object contains a bunch of info such ad id, title                     
  //view.innerHTML = `<div>${path}</div>`   
  const hasStories = stories.length > 0 //determines if array has content/stories. 


 view.innerHTML = `<div>
    ${hasStories ? stories.map((story, i) => 
    Story({ ...story, index: i + 1, isFavorite: checkFavorite(favorites, story) })).join('') : 'No stories'}
    </div>`

  /*registering a click event that will handle event for each of the individual favorite spans. getting all spans where class=favorite and 
  adding click events to all of them. 
  updated span on story.js by adding a data attribute. can now grab the story.  */
  document.querySelectorAll('.favorite').forEach(favoriteButton => {  //add event listener for each span 
    favoriteButton.addEventListener('click', async function() {
      const story = JSON.parse(this.dataset.story) //grabbing story by referring to the favorite element. reversing json and turning back into object 
      const isFavorited = checkFavorite(favorites, story) //calling checkFavorite and passing favorites array and story. will determine what action needs to be taken
      if (isFavorited) {  //if story is already in favorites remove story from array. 
        store.dispatch({ type: "REMOVE_FAVORITE", payload: { favorite: story } })  
      } else {
        store.dispatch({ type: "ADD_FAVORITE", payload: { favorite: story } })    
      }
      //store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: story } }) //more concise code with ternary
      await Stories(path) //recall stories function to display the new data and set view.Html. do this by awaiting stories() and provide path. 
    })  
  }) 

}
      
async function getStories(path) {
  const isHomeRoute = path === '/'    //checking if on the home route 
  const isNewRoute = path === '/new' //checking if path router = '/new'. if true, then path = newest (endpoint on api)
  if (isHomeRoute) {             //if on home route, then set the path to /news. '/' corresponds to the /news route from the api endpoint
    path = '/news'   
  } else if (isNewRoute) { //extending conditional to correspond with the path newest. 
    path = '/newest' 
  }
  //const response = await fetch(`https://node-hnapi.herokuapp.com${path}`) //chain on path conditionally setting. assign to response variable. now using baseUrl
  const response = await fetch(`${baseUrl}${path}`) //interpolating baseUrl from utils folder. chaining on path conditionally. 
  const stories = await response.json() //resolving response with json data. awaiting promise 
  return stories 
}