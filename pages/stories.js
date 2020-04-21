import Story from '../components/Story.js'//going out of components directory with ../, then to components dir, Story.js
import view from '../utils/view.js' //going out of pages directory with ../, then go to utils directory, then to view.js
import baseUrl from '../utils/baseUrl.js' //interpolating value in response variable
import checkFavorite from '../utils/checkFavorite.js' //importing to see if checked favorites are in favorites array. 
import store from '../store.js' //importing for adding/removing favorites

/*code used to check innerHtml working for the div and the paths from router callback
export default function Stories(path) { //adding parameter path for the routes added for new, ask, show. receives path data from router callback via router.js
  //return `<div>stories</div>`  //this returns the html. 
  //view.innerHTML = `<div>stories</div>`//returns the innerHtml of the div, the text 'stories' on the page. 'stories' is the route 
  view.innerHTML = `<div>${path}</div>` //viewing innerHtml of the div by interpolating the path received from router callback. will display the corresponding path, ie /new, /ask when clicking link in toolbar
}
*/

/*
this stage begins to add the appropriate stories based upon the content that needs to be shown for each page (top, new, ask, show).  
need to figure out how to get the appropriate date for each route from the api. will get all of the stories live from the api endpoint:
  https://node-hnapi.herokuapp.com

my endpoints are top, new, ask, show. i want to use the base url to get the appropriate content for each story. i will dynamically change
the stories that i am getting directly within the stories page based off the path. for the page / (forward slash), this will be the top
route. to get the top articles, will need to use the api with the route /news. for the /news route, this corresponds to the /newest route
from the api. the /ask page will correspond to /ask. the /show route will correspond to /show. there is also a /jobs route that can be 
added to app at another time. these are the routes that i will need to make get requests to in order to get the appropriate content/stories. 
  / (Top) -> /news
  /new (New) -> /newest
  /ask (Ask) -> /ask
  /show (Show) -> /show 

i am dynamically updating the content on each page by using the view reference in the stories.js file. in order to display anything, need
to have the data. before setting innerHtml, need to get the stories. begin by creating a getStories function. this function will receive
the path and based off of it, make the appropriate request for the data i need from the api endpoint. outside of getStories function, call
getStories and pass in the path the Stories() function is getting. 

next step is finding a way to conditionally set the path including in the api based off the path within the app, so that i am always get
the right content. for example, i want check to see if i am on the home route. since getStories(path) receives path as a parameter, 
i can check if path === '/'. i can store this comparison in a variable called isHomeRoute. if isHomeRoute is true, then set the path to 
/news. need the endpoint /news to get the top articles. considering this, how do i construct the request with the fetch api to be able
to fetch the appropriate top articles from the /news endpoint? can use the fetch() function which is available on the window. then copy
the base url in the beginning of the path. then using temperate literals, chain on at the end the path that i am conditionally setting 
from the if statement:
  fetch(`https://node-hnapi.herokuapp.com${path}`)

considering fetch() returns a promise, will need to resolve this. can make getStories() an async function to resolve and get the data and 
await the fetch() request i am making. put the fetch data in a variable called response:
  const response = await fetch(`https://node-hnapi.herokuapp.com${path}`)

with the response want to resolve it as json data:
  response.json()

will be getting json data and putting in the app, so want to await this promise and get back stories. 
  const stories = await response.json()

return stories at the end:
  return stories

going back to the stories() function, how do i get the return stories data from the getStories() function? since i have an async function
with getStories(), i also have to await getStories(), only then will i get the stories data. within the stories() function, can create a 
local variable called stories
  const stories = await getStories(path)
  
since i cannot use await w/o async, i also need to prepend the stories() function with async. 

have confirmed the home route is working properly. can extend the conditional. i want the '/new' route to correspond with the path /newest. 
can check to see if isNewRoute (the path router is giving me) = /new, then add an else if and set path to the appropriate route. which is
  path = '/newest'

now need to take the array of story data and throw it on the page. 1st check to see if there are stories by checking array for content 
prior to iterating over it and displaying content in the browser. begin by creating a variable hasStories that will hold on to a boolean. 
then take the stories array and check its length to see if its 0. if greater than 0, means there are stories to display. then for the 
content i am providing as html, can put within a div and add a ternary expression and interpolate the expression where i check to see if 
i have stories. if so take the stories array and iterate over it with map(). then for each story to put on page, use json.stringify.
if there are not stories, provide default text, no stories. 
  ${hasStories ? stories.map(story => JSON.stringify(story)) : 'No stories'}

to format the stories on the page, need to create a component. components are functions that can be reused throughout the app. in this 
case, components will help me style and add functionality to each of the stories, rather than have them be just a blob of data. the page
directory usually consist of components. in addition to the pages directory, will also have a components directory. within components 
directory, create file called Story.js. it is javascript convention to have the stories file in the pages directory to be lowercase. but
for components, the files are uppercase. 

instead of dumping the stories data on the page with JSON.stringify, can pass the story data to a new function within the Story
component. go to the Story.js file, create a function called Story() which will receive a parameter called story and return a div
with the text story. return `<div>story</div>.  make sure to make the function available to the rest of app with export default. 

go back to the stories.js page (pages directory) and import Story from components/Story.js directory. then replace json.stringify with
story() function call. 

go back to Story.js and begin formatting the story by returning a div with all of the information that i need. start by making the div 
class=story. then have a span which will tell me what number the story is. data from api not providing info on what order in the list
each story is. to begin counting the stories at number 1, i can go back to the stories page (stories.js). i can get access to the current
position of the array/the index of the element that i am iterating over by adding an additional parameter to the map() function. this 
is the index parameter and i want to make it available to the function call, wherever i am creating the story. so how to do that? 

i am providing the parameter story as an object. to add the index to the existing story data, i can create an inline object where i can 
spread in all of the other story properties that i need to make available to the function with the object spread. using the index, since
its 0 based, i can create a property on story called index and set it equal to i+1. this will give me the equivalent from counting from 1
all the way to the end. 

  prior to index
   view.innerHTML = `<div>
    ${hasStories ? stories.map(story => Story(story)).join('') : 'No stories'}
  </div>` 

  with additional index parameter
  view.innerHTML = `<div>
    ${hasStories ? stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : 'No stories'}
  </div>`


*/

export default async function Stories(path) { //parameter path for the routes. receives path data from router callback via router.js
  //const state = store.getState() //used for favorites. statement not destructured. calling reducer to determine if a given story is within the favorites array in the global state
  const { favorites } = store.getState() //destructuring favorites property. calling reducer to determine if a given story is within the favorites array in the global state 
  console.log(favorites) //checking add/remove favorites functionality. favorited story will be added to array and removed from array 
  const stories = await getStories(path) //calling getStories() to get the return stories. await due to async function with getStories()
  //console.log(stories)                   //returns a big array of objects. and each object contains a bunch of info such ad id, title                     
  //view.innerHTML = `<div>${path}</div>`   
  const hasStories = stories.length > 0 //determines if array has content/stories. 
  
  /*if hasStories is true, iterate over array and put story on page using json.stringify. replacing with story() function call (a component).  
  view.innerHTML = `<div>
    ${hasStories ? stories.map(story => JSON.stringify(story)) : 'No stories'} /
  </div>` 
  */

  /*putting content on page with story function call. when mapping over something, need to join the mapped content together with .join() 
  method. this removes the commas between the content.  statement does not include index parameter
  
   view.innerHTML = `<div>
    ${hasStories ? stories.map(story => Story(story)).join('') : 'No stories'}
  </div>`
  */
 
  /*adding additional index parameter (i) to the story object. creating an inline object where i spread in all of the other story 
  properties that i need to make available to the function with the object spread. using the index, since its 0 based, creating a 
  property on story called index and set it equal to i+1. this will give me the equivalent from counting from 1 all the way to the end.
  
  for the 'add to favorites' functionality, imported checkFavorites. can now use directly in the html markup where i am iterating over 
  each stories array with map. updating the html markup by adding another property to each story called isFavorite. the isFavorite 
  property will take the results of checkFavorite() which will accept the favorites array from state and the individual story i am 
  iterating over.  this was markup prior to update:

  view.innerHTML = `<div>
    ${hasStories ? stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : 'No stories'}
  </div>`
  
  */
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
      await Stories(path) //recall stories function to display the new data and set view.innerHtml.  
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