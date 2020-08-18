
import Stories from './pages/stories.js'     //importing the Stories() function. 
import Item from './pages/item.js'
import Favorites from './pages/favorites.js'

const router = new Navigo(null, true, '#')   //initialize router with arguments and put in variable called router.
console.log(router) 

export default class RouterHandler {      //dedicated class to create individual routes. exporting class to app.js 
  constructor() {
    this.createRoutes()                     //constructor will run method that creates routes. method declares routes within the app
  }  
  
  createRoutes() {                        //take an array of routes. each route consist of an object. 
    const routes = [
      { path: '/', page: Stories },     //object has property path for root page. also property for page (info displayed when user visits)
                                       //because of function import, can now link the Stories() function here. 
      { path: '/new', page: Stories }, //Stories is a function from stories.js. Stories() will be called in the router callback
      { path: '/ask', page: Stories },
      { path: '/show', page: Stories },
      { path: '/item', page: Item },
      { path: '/favorites', page: Favorites } 

    ]

   /*destructuring the route object immediately within the parameters to create more concise code. there is one parameter for the forEach() 
  callback. to destructure it successfully, need to add a set of (). within parenthesis create a set of {}, because destructuring an object.  
  then grab the path property and page property. can replace route.path with just path and route.page with just page. */
  routes.forEach(({ path, page }) => {    //iterating over the routes array. for each route, call method router.on() 
    router.on(path, () => {       //pass in the path property for 1st argument. 2nd argument, a callback, displays what will be on page
     page(path)               //router callback displays each page by calling stories() function in each route. passing callback
  }).resolve()     //the current path that program is on, which comes from route.path. the Stories() function can now receive this data. 
 })

  }
}



