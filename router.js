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

refresh page, console.log the result of executing route.page(), should get a div with the text 'stories'. 
   
*/
import Stories from './pages/stories.js'     //importing the Stories() function.  

const router = new Navigo(null, true, '#')   //initialized router with arguments and put in variable called router.
console.log(router) 

export default class RouterHandler {      //dedicated class to create individual routes. exporting class to app.js 
  constructor() {
    this.createRoutes()                     //constructor will run method that creates routes. method declares routes within the app
  }  
  
  createRoutes() {                        //take an array of routes. each route consist of an object. 
    const routes = [
      { path: '/', page: Stories }     //object has property path for root page. also property for page (info displayed when user visits)
    ]                                  //because of function import, can now link the Stories() function here. 
    
    routes.forEach(route => {         //iterating over the routes array. for each route, call method router.on() 
      router.on(route.path, () => {   //pass in the path property. 2nd argument, a callback function, displays what will be on page 
         console.log(route.page())    //accesses the page property, which value is the Stories() function. Stories() function returns a div 
      }).resolve()                    //chaining on resolve(), need for async/promise management
    })
  }
}



//created html, css, added link to router via html, created router.js, create folder with name pages. import/export stories function