const searchMeal = document.getElementById("input");

function fetchMeal() {
  if (searchMeal.value) {
    let URL = `https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;
    fetch(URL)
      .then((res) => res.json())
      .then((meals) => displayFood(meals.meals));
    document.getElementById("noMeal").style.display = "none";
  } else {
    alert("Type some food!!!");
    document.getElementById("noMeal").style.display = "block";
  }
}

function displayFood(meals) {
  for (const meal of meals) {
    console.log(meal);
    document.querySelector(".meal-wrapper").innerHTML += `
    <div class="meal-box border border-gray-700 rounded-xl">
    <img
      src=${meal.strMealThumb}
      alt=${meal.strMeal}
      class="rounded h-[200px] w-full object-cover"
    />
    <div class="p-3">
      <h2 class="heading">${meal.strMeal}</h2>
      <p class="paragraph">
        ${meal.strInstructions.slice(0, 100)} ...
      </p>
      <p class="tags my-3"><span>${meal.strArea}</span>, <span>${
      meal.strCategory
    }</span></p>
      <a href=${
        meal.strYoutube
      } target="_blank" class="btn bg-orange-400">Watch</a>
      <button class="btn" onclick="loadMealDetails('${
        meal.idMeal
      }')">View Recipe</button>
     </div>
    </div>
    `;
  }
}

function loadMealDetails(id) {
  //   console.log(id);
  let URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => showMealDetails(data.meals[0]));
}

function showMealDetails(meal) {
  //   console.log(meal);
  const details = document.getElementById("details");
  details.classList.add("visible");
  details.classList.remove("invisible");

  details.innerHTML = `
  <div class="bg-white w-64 p-6 rounded shadow-lg w-[70%] h-[600px]">
    <h2 class="text-xl font-bold mb-4">${meal.strMeal}</h2>
    <p class="mb-4">${meal.strInstructions}</p>
    <a
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
    href=${meal.strYoutube} target="_blank">
        Watch Video
     </a>
     <a class="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded ml-1 cursor" onclick="closeDetails()">Close</a>
    </div>
      `;
}

function closeDetails() {
  const details = document.getElementById("details");
  details.classList.add("invisible");
  details.classList.remove("visible");
}

document.getElementById("submit").addEventListener("click", () => {
  document.querySelector(".meal-wrapper").innerHTML = "";
  fetchMeal();
  console.log("test");
});
