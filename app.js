import RouterHandler from './router.js'  //importing RouteHandler class
//import './store.js'   //temporary importing store for testing. 

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