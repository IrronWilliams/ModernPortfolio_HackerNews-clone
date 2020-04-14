/*ADDING PAGES 

creating pages that correspond to different paths is difficult in normal javascript. will rely upon a 3rd party library to obtain this 
functionality. specifically bring in a 3rd party package that will allow me to us a router with a simple interface to create routes that
correspond with each of the links (top, new, ask, show, favorites) in effort to navigate around the app. add external script on html file.
place the link to the library navigo underneath the script linking to the javascript file. will use a cdn to link to the library. 
will need to create a router to use this package. begin by creating a new js file called router.js.  





*/



import RouterHandler from './router.js'  //importing RouteHandler class

class App {
  constructor() {
    new RouterHandler()                //instantiating RouteHandler
  }  
}

new App()                            //instantiating App class