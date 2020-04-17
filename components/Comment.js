/*
need to format the comments on the items page because they are still blobs of data. to add some structure to the comments instead of just
throwing them on the page via items.js page with json.stringify, can create a dedicated comments component. within components folder, 
create a new file called comments.js. within comments, create a function that will receive individual comment data. initially return 
html with a div with a class=nested-comments-0. within div, have a comment header between paragraph tags, a class=comment-header. within
paragraph tag, will have comment.user, comment_time_ago, comment.content. console.log comment to confirm access to data. make this 
available to items-page with export default. the use of comment component tidies up the appearance of the data on the page by using 
comment() function. 

in addition to user, time, content, there is also a property called level that is returned. level property speaks to the nested comments.
a comment can have its own comments. a comment can have a comments property, which is an array of objects and each of those objects being
nested comments. if a comment has a nested comments, how do i display them in an area that is a little inset that's pushed to the side so 
its clear that these are responses to the original comment or to other comments within the thread. can address this on the comments.js file.  

within comments need to find a way to continue generating comments if i know there are nested comments. need to make use of a complex 
programming concept called recursion. this means i am going to get my first set of comments with the comment() function but need to keep
calling it if i am able to detect if there are nested comments. to approach this, need to check if there are nested comments. within the
comment() function, add new variable hasNestedComments where i need to take each comment that im getting in the function and check to see
if i have an array of comment.comments and check if the arrays length is >0. if there are comments, this will resolve to true. 
  const hasNestedComments = comment.comments.length > 0

within the return markup, can add a conditional with a ternary that says if there are nested comments, then take comment.comments and
continue to map over each comment. but whats different here is that i am going to call the function from within itself. this is the 
benefit of having a named function declaration. i want to call the comment() function again, once i am already inside of it. the 
otherwise will be an empty string because i do not want to have text saying 'no nested comments' on the page. 

i can make the nested comments more inset or more prominent. using class <div class="nested-comments-0"> treats all nested
comments equally in terms of inset, moving comments by a certain spaces to the right. can provide functionality to change the class
for each nested level of comments (different inset for nested comments, 1-4). this will apply different classes based upon the css style 
file (.nested-comments-0, .nested-comments-2). to make the comments more prominent/readable, can use the level property from comment and 
update the div with to dynamically change the inset based upon the comment level:
  <div class="nested-comments-${comment.level}">

can now see much more clearly the threads within the story. 
*/


export default function Comment(comment) {
    //   console.log(comment) 
      const hasNestedComments = comment.comments.length > 0 
    
      return `
        <div class="nested-comments-${comment.level}">
          <p class="comment-header">
            ${comment.user} | ${comment.time_ago}
          </p>
          ${comment.content}
          ${hasNestedComments ? comment.comments.map(comment => Comment(comment)).join("") : ""}
        </div>
      `  
    }