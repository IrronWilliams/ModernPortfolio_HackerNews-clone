/*ADDING PAGES 

creating pages that correspond to different paths is difficult in normal javascript. will rely upon a 3rd party library to obtain this 
functionality. specifically bring in a 3rd party package that will allow me to us a router with a simple interface to create routes that
correspond with each of the links (top, new, ask, show, favorites) in effort to navigate around the app. add external script on html file.
place the link to the library navigo underneath the script linking to the javascript file. will use a cdn to link to the library. 
will need to create a router to use this package. begin by creating a new js file called router.js.  

the setActiveLink() function adds a white line to the header when user is on a route that corresponds to a link. per html file, each of
the links in the header have a class=header-link. (  <a href="#/" class="header-link">Top</a>  ). using document.querySelectAll()
to find all of the links with the header-link class. the links will be returned in a nodelist. iterate over the nodelist, and for each 
link get the href that the link is pointing to (ie, href=#/ask) using getAttribute() and put in a variable called linkPath. 
get the current path from window.location.hash. compare the 2 variables. if the currentPath === linkPath then can add the active class. 
otherwise/if not equal, remove the active class. this provides visual way to display to user where they are/which route they are in
within the app. */

import RouterHandler from './router.js'  //importing RouteHandler class

/*whenever i have a hash router (#), whenever using a # in the url that changes, can detect the change with the onhashchange property. 
the following will console log the word change when user goes from 1 route to another. */
window.onhashchange = () => {
  setActiveLink()    //calling function
}

function setActiveLink() {
  const links = document.querySelectorAll('.header-link') //finding all links on the index.html with header-link class. returns a nodelist with all of the links.
  links.forEach(link => { //iterating over nodelist and for each link can get href that link is pointing to using getAttribute. 
     const linkPath = link.getAttribute('href') 
     const currentPath = window.location.hash   //getting current path 
     if (currentPath === linkPath) {           //if variables are equal add active class if not, remove active class 
       link.classList.add('active')   
     } else {
       link.classList.remove('active')          
     }
  }) 
}

class App {
  constructor() {
    new RouterHandler()                //instantiating RouteHandler
  }  
}

new App()                            //instantiating App class