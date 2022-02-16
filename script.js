
const container = document.querySelector('#characters');

axios.get('https://bobsburgers-api.herokuapp.com/characters')
  .then(function (response) {

    // an array of character objects will be stored in this variable. 
    let characters = response.data;

    // let's create an array with just the names of the characters (strings only)
    // we will use this array of strings to  populate the autocomplete.
    // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const characterNames = characters.map( character => character.name)

    // create the autocomplete using the character data. 
    const autoCompleteJS = new autoComplete({
      placeHolder: "Search for Characters...",
          data: {
              src: characterNames
          }
      });
      // whenever a character is selected, 
      // find the character in the characters array,
      // and pass the data along for rendering
      autoCompleteJS.input.addEventListener("selection",  (event) => {
        // using the array filter to locate the character 
        // whose name matches the autocomplete. 
        // see also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        const [selected] = characters.filter( 
            character => character.name == event.detail.selection.value 
          ) ;
        renderCharacter(selected); 
      }); 
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


  const renderCharacter  = (character) => {

    // reset the contents of the container to remove previous result.
    container.innerHTML = '';
    
    // create a template for character details.
    // popuate it with data 
    let characterDetails = document.createElement('div');
    characterDetails.classList.add('characterDetails'); 
    characterDetails.innerHTML = 
      `<img src="${character.image}">
      <p>${character.name}</p>`;

    // add everything to the page.
    container.appendChild(characterDetails); 


  }