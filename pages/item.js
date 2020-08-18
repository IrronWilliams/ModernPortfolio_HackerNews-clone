import Story from '../components/Story.js' //importing to use in get Item() function
import Comment from '../components/Comment.js' //used to replace json.stringify 
import view from '../utils/view.js' //importing view to use in Item() function
import baseUrl from '../utils/baseUrl.js' //using in response variable


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
    initially used ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comments'} to display comment. 
    json.stringify was replaced with comments component. 

    */
    view.innerHTML = `
    <div>
      ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map(comment => Comment(comment)).join('') : 'No comments'}
    `  
  }

  async function getStory() {
    const storyId = window.location.hash.split('?id=')[1] //accessing the second element in array
    const response = await fetch(`${baseUrl}/item/${storyId}`) //concatenate the string with storyId
    const story = await response.json() 
    console.log(story) 
    return story
  }