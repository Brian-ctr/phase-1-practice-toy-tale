const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', () => {
  fetchToys();
  const toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewToy(event.target);
  });
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((toys) => toys.forEach(renderToy));
}

function renderToy(toy) {
  const toyCollection = document.querySelector('#toy-collection');
  const toyCard = document.createElement('div');
  toyCard.className = 'card';
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id="${toy.id}">Like <3</button>
  `;
  const likeButton = toyCard.querySelector('.like-btn');
  likeButton.addEventListener('click', (event) => {
    increaseLikes(event.target);
  });
  toyCollection.appendChild(toyCard);
}

function addNewToy(form) {
  const name = form.name.value;
  const image = form.image.value;
  const likes = 0;
  const toy = { name, image, likes };
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toy),
  })
    .then((response) => response.json())
    .then((toy) => {
      renderToy(toy);
      form.reset();
    });
}

function increaseLikes(button) {
  const id = button.dataset.id;
  const likesElement = button.previousElementSibling;
  const likes = parseInt(likesElement.textContent);
  const newLikes = likes + 1;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: newLikes }),
  })
    .then((response) => response.json())
    .then((toy) => {
      likesElement.textContent = `${toy.likes} Likes`;
    });
}

