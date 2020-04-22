/*
since executing the external script, now have access to script within app globally. 
    <script src="//unpkg.com/navigo@6"></script>

to create a router with the help of navigo, need to initialize a router:
    new Navigo()

will use a #(hash) router where each route is prepended with a # mark. to create that, need to provide the arguments null, true and #.  
put the created router in a variable called router:
    const router = new Navigo(null, true, '#') 

to create individual routes, create a dedicated class called RouterHandler. need to declare what routes are within the app as indicated
by the links on html file. the class will consist of a constructor which will run a method that will create the routes. the method will be
called createRoutes(). createRoutes() will take an array of routes and each route will consist of an object. on the object will consist 
of a couple of properties. 

the 1st object property will include a path for the root path, or '/'. also need a page, which is what will be displayed when user visits 
this particular root, '/', path. for the page, need to have a javascript file to display the contents. so for all the pages, will create 
a folder with name pages. for most every route where displaying different stories, want to re-use the same page which will be called 
the stories page.  within the pages folder, create stories.js file. since using module type via html file, on the stories.js file, create a 
basic function called stories(). export the function from the stories.js file using export default. on the router.js file, import the 
default export. since function has been imported, can now link the stories() function:
    const routes = [
      { path: '/', page: Stories }

using the navigo router to be able to create each route, need to iterate over the routes array with forEach(). forEach() route, call the 
method router.on(). router.on() allows me to declare a given path. the router detects that i have gone to a certain path. provide/pass in
the path property provided on each route from route.path. when on a given path need to tell router what to do/what to display. the 2nd 
argument allows me to determine what i want to display/show via a callback function. within the call back function, want to take the page,
which is just a function. get this from route.page() and execute it like a function. lastly, chain on the method resolve() at the end of 
the router.   

to instantiate the RouterHandler class, also want to export default the class. the app.js file is where the class will be instantiated. 
within app.js, import RouterHandler and instantiate it within the constructor.  

refresh page, console.log the result of executing route.page(), should get an html div with the text 'stories'. this is whats returned 
because currently the Stories() function (stories.js) is returning ->  return `<div>stories</div>` 

instead of returning the html, from the Stories() function, i want to display it in the browser (on page). to do this, there is a router
outlet div on the html file, <div id="router-outlet"></div>.  i want to use this div and set its innerHTML to the html that i want to 
display, via Stories() function. to begin, create a reusable reference to the router outlet. start this process by creating a folder called
utils (short for utilities). within utils, make a file called view.js. the view file will manage what the user sees. to be able to update
the view.js file, make it available to rest of app with export default and find the element with querySelector and find element with id 
router-outlet. this will allow me to update the innerHTML of the view, therefore the page. 
      export default document.querySelector('#router-outlet')

back to stories page (stories.js), import view.js from the utils folder.  need to go out of the pages directory/folder. to do that say
../  once out of pages directory, can go into utils directory to get file view.js:
      import view from '../utils/view.js'

instead of returning html, can view the innerHtml of the div by setting it equal to the html i want to display. refresh the page. will 
see the text 'stories' on the page. 'stories' is the route: 
       view.innerHTML = `<div>stories</div>`

back to router.js, remove console.log(route.page()) and add the rest of routes for top, new, ask, show, favorites. all of these routes
will be using the stories page. next step is to create routes within the routes array, which will all link to the stories page. for paths
will be to /new, /ask, /show. 

within the router callback, where i am displaying each page, by calling each function stories in each route, i can pass to it the given
path that i am on (get current path from route.path). can receive this data within stories function from the stories.js file. within the 
stories function parameter, can add a parameter called path. instead of just displaying the text 'stories' for each route, can interpolate
the path that i am getting. 

at this point, now have routes for application and ready to display stories within each page. notes continued on stories.js


   
*/
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

    /*code used for the root path only
    routes.forEach(route => {         //iterating over the routes array. for each route, call method router.on() 
      router.on(route.path, () => {   //pass in the path property. 2nd argument, a callback function, displays what will be on page 
         console.log(route.page())    //accesses the page property, which value is the Stories() function. Stories() function returns a div 
      }).resolve()                    //chaining on resolve(), need for async/promise management
    })
    */
  
   /* 
  //non-destructured code for when routes for new, ask, show were added. all routes will be using the stories page. 
   routes.forEach(route => {      //iterating over the routes array. for each route, call method router.on() 
    router.on(route.path, () => {  //pass in the path property for 1st argument. 2nd argument, a callback, displays what will be on page 
       route.page(route.path)   //router callback displays each page by calling stories() function in each route. passing callback
    }).resolve()               //the current path that program is on, which comes from route.path. the Stories() function can now receive this data. 
  })
  */

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



