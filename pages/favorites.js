import view from '../utils/view.js' 
import checkFavorite from '../utils/checkFavorite.js' 
import store from '../store.js' 
import Story from '../components/Story.js' 


// view.innerHTML = `<div>Favorites</div>` //used to test if page was working. should see the text Favorites on the page
export default function Favorites() {
  const { favorites } = store.getState()   
  const hasFavorites = favorites.length > 0   
    
  view.innerHTML = `<div>
    ${hasFavorites ? favorites.map(story => Story({
        ...story,
        isFavorite: checkFavorite(favorites, story)
    })).join('') : "Add some favorites!"}
  </div>`  
}