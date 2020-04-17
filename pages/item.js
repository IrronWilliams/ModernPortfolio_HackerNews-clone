import Story from '../components/Story.js' //importing to use in get Item() function
import view from '../utils/view.js' //importing view to use in Item() function
import baseUrl from '../utils/baseUrl.js' //using in response variable

/*
export default function Item() {
    getStory()                           //calling function
    view.innerHTML = `<div>item</div>`  //the html on the page = item.
}
*/

/*expanding Item() function to display the getStory() content in html 
export default async function Item() {
    const story = await getStory() 
    //console.log(story.comments)
    const hasComments = story.comments.length > 0 

    
    view.innerHTML = `
    <div>
      ${Story(story)}
    </div>
    <hr/>
  ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comments'}
  `  
  }
*/


/*setting up error handling. will have a problem because cannot access story and hasComments variables due to block-scoping. will error
export default async function Item() {
    try { 
       const story = await getStory()   
       const hasComments = story.comments.length > 0 
    } catch(error) {
        console.error(error) 
    } 
    
    view.innerHTML = `
    <div>
      ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comments'}
    `  
  }

*/

/* block-scoping addressed in following code

need to resolve the getStory() function so need to make item() an async function, await getStory() and put the result in a story variable.
within the view.innerHtml, want to display the story individually. can reuse the story component. instead of having hard coded text item, 
import the story function from story.js. within the view, can now call the story() function by interpolating the function call and passing
the story data. 

when user clicks on link with number of comments, user will see the story on top separated by horizontal line with story comments below the
line. 

add an <hr> to create the line
underneath the div. then map over the comments array 

applying error handling to address the situation if an incorrect item id is provided. in absence of error handling, if an incorrect id is 
provided, the app will kinda break by not returning anything. need to provide user with an error message if f the fetch() request does not 
return successfully.

to fix this block-scoping issue, outside of try/catch create story and hasComments variables with let. and reinitialize them when i 
get the story and hasComments values in try{}. now blocks-scoping issue has been resolved, can now alert user that there is an error. 
can do this by adding a piece of local state called hasError. when catch/block runs, can set hasError to true, by default it will be false. 
in the event there is an error, display to user there is a problem. want to set view.html conditionally. if there is an error, set 
view.html to the following text in a div and set the class to error to give text a red color. 

*/
export default async function Item() {  //addressing block-scoping issues by creating variables with let 
    let story = null                    //set to null because will be updated with an object
    let hasComments = false   
    let hasError = false                 
      
    try { 
       story = await getStory()   
       hasComments = story.comments.length > 0  //checking if story has comments and putting in variable. will be used in view.innerHtml
    } catch(error) {
       hasError = true  
       console.error(error) 
    } 
    
    if (hasError) {
       view.innerHTML = `<div class="error">Error fetching story</div>` 
    }
    
    /*using ternary and mapping over each comment and using json.stringify to throw comment data on the page and join() method to remove
    commas after each comment. otherwise if there are no comments, display message no comments. 
    
    the <hr/> creates a line underneath the story. 
    
    */
    view.innerHTML = `
    <div>
      ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comments'}
    `  
  }

  /*purpose of getStory() is to retrieve the story data. 1st step is to get the story id. obtaining info about the current route rom the 
  window.location property. the location property is an object with a bunch of data, including the hash(#) property. the routes begin 
  with a #. console.log(window.location.hash) returns the remainder of the url -> #/item?id=21702424. i can use the hash info string to  
  split where i see the text id. can use the split() method. split() operates on a string and returns an array. pass in argument where 
  i want to split the string. here, i want to split the string where it begins with ?id=. 
    const storyId = window.location.hash.split('?id=') -> returns an array ["#/item", "21702424"]

  can access the 2nd element in the array by using the [] syntax at the end and entering 1.   
  const storyId = window.location.hash.split('?id=')[1]  -> returns the string of the id 21702424

  can use the string 21702424 with the help of the api to fetch an individual story. to do this, need to know the route im making a get
  request to. the route for individual stories is '/item/itemId'. from the stories.js page, want to reuse the base url and make a fetch()
  request where the route begins with /item/ and concatenate the string with storyId. 
    fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`) 

  need to resolve the promise made by fetch(). can resolve the promise by making the getStory() function an async function. also need to 
  await the fetch() call and put the response in a response variable. then response.json, await it and put in a story variable. return
  story. 
   */
  async function getStory() {
    const storyId = window.location.hash.split('?id=')[1] //accessing the second element in array
    //const response = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`) //concatenate the string with storyId. replaced by using baseUrl
    const response = await fetch(`${baseUrl}/item/${storyId}`)
    const story = await response.json() 
    console.log(story) 
    return story
  }