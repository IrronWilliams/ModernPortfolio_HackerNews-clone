import view from '../utils/view.js' //going out of pages directory with ../, then go to utils directory, then to view.js

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


*/

export default async function Stories(path) { //parameter path for the routes. receives path data from router callback via router.js 
  const stories = await getStories(path) //calling getStories() to get the return stories. await due to async function with getStories()
  //console.log(stories)                   //returns a big array of objects. and each object contains a bunch of info such ad id, title                     
  //view.innerHTML = `<div>${path}</div>`   
  const hasStories = stories.length > 0
                    
  view.innerHTML = `<div>
    ${hasStories ? stories.map(story => JSON.stringify(story)) : 'No stories'}
  </div>` 
}

async function getStories(path) {
  const isHomeRoute = path === '/'    //checking if on the home route 
  const isNewRoute = path === '/new' //checking if path router = '/new'. if true, then path = newest (endpoint on api)
  if (isHomeRoute) {             //if on home route, then set the path to /news. '/' corresponds to the /news route from the api endpoint
    path = '/news'   
  } else if (isNewRoute) { //extending conditional to correspond with the path newest. 
    path = '/newest' 
  }
  const response = await fetch(`https://node-hnapi.herokuapp.com${path}`) //chain on path conditionally setting. assign to response variable 
  const stories = await response.json() //resolving response with json data. awaiting promise 
  return stories 
}