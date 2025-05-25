// --- GESTION DES REPAS ---

const mealForm = document.getElementById("meal-form");
const mealList = document.getElementById("meal-list");

let meals = [];

mealForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("meal-name").value;
  const perAdult = parseFloat(document.getElementById("quantity-adult").value);
  const perChild = parseFloat(document.getElementById("quantity-child").value);

  meals.push({ name, perAdult, perChild });
  updateMealList();

  mealForm.reset();
});

function updateMealList() {
  mealList.innerHTML = "";

  let totalAdults = 0;
  let totalChildren = 0;

  // Comptage des adultes et enfants présents
  guests.forEach((guest) => {
    if (guest.present) {
      totalAdults += guest.adults;
      totalChildren += guest.children;
    }
  });

  meals.forEach((meal, index) => {
    const totalQty =
      meal.perAdult * totalAdults + meal.perChild * totalChildren;

    const li = document.createElement("li");
    li.innerHTML = `
      ${meal.name} — Total : <strong>${totalQty.toFixed(1)}</strong> portions 
      <button onclick="removeMeal(${index})">Supprimer</button>
    `;
    mealList.appendChild(li);
  });
}

function removeMeal(index) {
  meals.splice(index, 1);
  updateMealList();
}
// GESTION DES REPAS
const mealForm = document.getElementById('meal-form');
const mealList = document.getElementById('meal-list');

let meals = [];

function getGuestCounts() {
  const guests = JSON.parse(localStorage.getItem('guests')) || [];
  let totalAdults = 0;
  let totalChildren = 0;
  guests.forEach(g => {
    if (g.present) {
      totalAdults += g.adults;
      totalChildren += g.children;
    }
  });
  return { totalAdults, totalChildren };
}

function updateMealList() {
  mealList.innerHTML = '';
  const { totalAdults, totalChildren } = getGuestCounts();

  meals.forEach((meal, index) => {
    const total = (meal.perAdult * totalAdults) + (meal.perChild * totalChildren);
    const li = document.createElement('li');
    li.textContent = `${meal.name} — Total : ${total.toFixed(2)}`;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Supprimer';
    delBtn.onclick = () => {
      meals.splice(index, 1);
      updateMealList();
    };
    li.appendChild(delBtn);
    mealList.appendChild(li);
  });
}

mealForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('meal-name').value;
  const perAdult = parseFloat(document.getElementById('quantity-adult').value);
  const perChild = parseFloat(document.getElementById('quantity-child').value);

  meals.push({ name, perAdult, perChild });
  mealForm.reset();
  updateMealList();
});
