// Get data from the api
async function getBeers() {
      const api = await fetch('saxq');
      return api.json();
};

//Render each beer into a card
function renderBeers(beer) {
      //Loops for the beer recipe to get multiple ingredients
      let beerMesh = '';
      for (let i = 0; i < beer.method.mash_temp.length; i++) {
            beerMesh += `<font size="+1.5"><b>Temp:</b></font><br>
                 ${beer.method.mash_temp[i].temp.value}\ Degree\
                 ${beer.method.mash_temp[i].temp.unit}<br>
                 <font size="+1.5"><b>Duration:</b></font><br>
                 ${beer.method.mash_temp[i].duration}\ minutes<br><br>
                 `
      };

      let beerIngredientsMalt = '';
      for (let i = 0; i < beer.ingredients.malt.length; i++) {
            beerIngredientsMalt += `
                  ${beer.ingredients.malt[i].name}:<br>
                  ${beer.ingredients.malt[i].amount.value}
                  ${beer.ingredients.malt[i].amount.unit}<br><br>
                  `
      };

      let beerIngredientsHops = '';
      for (let i = 0; i < beer.ingredients.hops.length; i++) {
            beerIngredientsHops += `
                  ${beer.ingredients.hops[i].name}:<br>
                  ${beer.ingredients.hops[i].amount.value}
                  ${beer.ingredients.hops[i].amount.unit}<br>
                  <font size="+1.5"><b>Add:</b></font>
                  ${beer.ingredients.hops[i].add}<br>
                  <font size="+1.5"><b>Attribute:</b></font>
                  ${beer.ingredients.hops[i].attribute}<br><br>
                  `
      };

      const beerDetails = `
    <font size="+2"><b>First brewed:</b></font><br>${beer.first_brewed}
    <br><br>
    <font size="+2"><b>About me:</b></font><br>${beer.description}
    <br><br>
    <font size="+2"><b>Food pairing:</b></font><br>${beer.food_pairing}
    <br><br>
    <font size="+2"><b>Contributed by:</b></font><br>${beer.contributed_by}
    `;

      const beerRecipe = `
    <font size="+2"><b class=Abv title='Alcohol by Volume (ABV)
    ABV is the most common measurement of alcohol content in beer; it simply indicates how much of the total volume of liquid in a beer is made up of alcohol'>Abv:</b></font>\n${beer.abv}
    <br>
    <font size="+2"><b title='International Bitterness Units, a scale to gauge the level of a beer's bitterness. More specifically, IBUs measure the parts per million of isohumulone from hops in a beer, which gives beer bitterness.'>Ibu:</b></font>\n\n${beer.ibu}
    <br>
    <font size="+2"><b title='Final gravity measures the attenuation of the beer, which is the reduction of the wort's density caused by the fermentation of sugars into alcohol and carbon dioxide.'>Final gravity:</b></font>\ ${beer.target_fg}
    <br>
    <font size="+2"><b title='
    Original Gravity (OG), sometimes called original extract, is a measure of the solids content originally in the wort, before alcoholic fermentation has commenced to produce the beer.'>Original gravity:</b></font>\ ${beer.target_og}
    <br>
    <font size="+2"><b title='Color Units Ebc (European Brewery Convention) refer to the color of a beer measured in a technical manner'>Ebc:</b></font>\ ${beer.ebc}
    <br>
    <font size="+2"><b title='
    Standard Reference Method (Srm) is the method for color assessment of wort or beer as published in the recommended methods of the American Society of Brewing Chemists.'>Srm:</b></font>\ ${beer.srm}
    <br>
    <font size="+2"><b title='
    pH is an important factor in brewing quality beer. The pH levels during various stages of the brewing process affect extract potential, beer color, hot-break formation, foam stability, hop oil extraction, hop bitterness and lauterability of the beer.'>Ph:</b></font>\ ${beer.ph}
    <br>
    <font size="+2"><b title='Attenuation is the degree to which yeast ferments the sugar in a wort or must.'>Attenuation level:</b></font>\ ${beer.attenuation_level}
    <br>
    <font size="+2"><b>Volume:</b></font>\ ${beer.volume.value}\ ${beer.volume.unit}
    <br>
    <font size="+2"><b>Boil volume:</b></font>\ ${beer.boil_volume.value}\ ${beer.boil_volume.unit}
    <br><br>
    <font size="+2"><b>Method:</b></font><br><li><font size="+1.5"><b>Fermentation:</b></font></li>${beer.method.fermentation.temp.value}\ Degree\ ${beer.method.fermentation.temp.unit}<br><br>
     <li><font size="+1.5"><b>Mash:</b></font><br></li>\ ${beerMesh}
     <font size="+2"><b>Twist:</b></font><br>${beer.method.twist}
     <br><br>
     <font size="+2"><b>Ingredients:</b></font>
     <br>
     <li><font size="+1.5"><b>Malt</b></font></li>${beerIngredientsMalt}
     <br>
     <li><font size="+1.5"><b>Hops:</b></font></li><br>${beerIngredientsHops}
     <font size="+2"><b>Yeast:</b></font><br> ${beer.ingredients.yeast}
     <br><br>
     <font size="+2"><b>Brewers tips:</b></font><br> ${beer.brewers_tips}
    `;

      //The structure of each card
      let card = document.createElement('div');
      card.setAttribute('class', 'card');
      let cardInner = document.createElement('div');
      cardInner.setAttribute('class', 'card__inner');
      let cardFaceFront = document.createElement('div');
      cardFaceFront.setAttribute('class', 'card__face card__face--front');
      let cardFaceBack = document.createElement('div');
      cardFaceBack.setAttribute('class', 'card__face card__face--back');
      let cardContent = document.createElement('div');
      cardContent.setAttribute('class', 'card__content');
      let cardHeader = document.createElement('div');
      cardHeader.setAttribute('class', 'card__header');
      let cardBody = document.createElement('div');
      cardBody.setAttribute('class', 'card__body');
      let img = document.createElement('img');
      img.setAttribute('src', beer.image_url);
      img.setAttribute('class', 'beer-img');
      let h1 = document.createElement('h1');
      h1.setAttribute('id', 'tagline');
      h1.innerText = beer.tagline;
      let h2 = document.createElement('h2');
      h2.innerText = beer.name;
      let h3 = document.createElement('h3');
      h3.innerText = beer.tagline;
      let p1 = document.createElement('p1');
      p1.setAttribute('class', 'alcPre');
      p1.innerHTML = beerRecipe;

      //Buttons and events
      let recipeBtn = document.createElement('button');
      recipeBtn.setAttribute('class', 'get_recipe');
      recipeBtn.innerText = "View Recipe";
      recipeBtn.addEventListener('mouseover', () => {
            p1.innerHTML = beerRecipe
      });

      let beerBtn = document.createElement('button');
      beerBtn.setAttribute('class', 'get_recipe');
      beerBtn.innerText = "View Beer";
      beerBtn.addEventListener('mouseover', () => {
            p1.innerHTML = beerDetails
      });

      cardInner.addEventListener('click', () => {
            p1.innerHTML = beerDetails;
            cardInner.classList.toggle('is-flipped');
            function scrollUp() {
                  cardFaceBack.scrollTop = 0;
            }
            setTimeout(scrollUp, 1000)
      });

      let scrollUpBeer = document.createElement('button');
      scrollUpBeer.setAttribute('class', 'go_up');
      scrollUpBeer.innerText = 'Go up';
      scrollUpBeer.addEventListener('mouseover', () => {
            cardFaceBack.scrollTop = 0
      });

      //Appending the card and data
      divCollect.append(card);
      card.append(cardInner);
      cardInner.append(cardFaceFront, cardFaceBack);
      cardFaceFront.append(h2, img, h1);
      cardFaceBack.append(cardContent);
      cardContent.append(cardHeader, cardBody, scrollUpBeer);
      cardHeader.append(recipeBtn, beerBtn);
      cardBody.append(p1);
      return card.id;
}

//Calling the fetch on the API and applying the render function on each beer
async function Render() {
      const allBeers = await getBeers();
      const beerAbvToCardIdArray = [];
      allBeers.forEach(beer => {
            const cardId = renderBeers(beer);
            beerAbvToCardIdArray.push({ abv: beer.abv, cardId: cardId });
            divToClass(beer.abv)
            filterSelection("all")
      });
      return beerAbvToCardIdArray;
}

//Filter buttons for selected Alcohol volume
function filterSelection(c) {
      var x, i;
      x = document.getElementsByClassName("filterDiv");
      if (c == "all") c = "";
      // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
      for (i = 0; i < x.length; i++) {
            w3RemoveClass(x[i], "show");
            if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
      }
}

function w3AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                  element.className += " " + arr2[i];
            }
      }
}

function w3RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                  arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
      }
      element.className = arr1.join(" ");
}
function filterBtns() {
      for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                  let current = document.getElementsByClassName("active");
                  current[0].className = current[0].className.replace(" active", "");
                  this.className += " active";
            });
      }
}

//Arrange each beer in the appropriate group according to its alcohol level
function divToClass(abv) {
      if (abv <= 5) {
            document.querySelector('.card').setAttribute('class', 'filterDiv AbvUpTo5')
      } else if (abv > 5 && abv < 10) {
            document.querySelector('.card').setAttribute('class', 'filterDiv Abv5-10')
      } else if (abv >= 10) {
            document.querySelector('.card').setAttribute('class', 'filterDiv Abv10AndUp')
      }
}



// MAIN
const divCollect = document.querySelector('#beer-collection');
const beerAbvToCardId = Render();
const btnContainer = document.getElementById("myBtnContainer");
const btns = btnContainer.getElementsByClassName("btn");
const allCards = document.querySelectorAll('.card')
let innerCard = document.querySelector("#beer-collection > div:nth-child(1) > div")
filterBtns()