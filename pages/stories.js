import view from '../utils/view.js' //going out of pages directory with ../, then go to utils directory, then to view.js

export default function Stories(path) { //adding parameter path for the routes added for new, ask, show
  //return `<div>stories</div>`  //this returns the html. 
  //view.innerHTML = `<div>stories</div>`//returns the innerHtml of the div, the text 'stories' on the page. 'stories' is the route 
  view.innerHTML = `<div>${path}</div>` //interpolate the path that i am getting from createRoutes() function via router.js. will display the corresponding path, ie /new, /ask
}


