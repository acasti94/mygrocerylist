import { LocalDB } from 'https://cdn.skypack.dev/peadb';
import shortid from 'https://cdn.skypack.dev/shortid';
import canvasConfetti from 'https://cdn.skypack.dev/canvas-confetti';

const db = new LocalDB('grocery-list-db')
const groceries = db.getAll() || []

const groceryList = document.getElementById('groceryList')
const newGroceryInput = document.getElementById('newGrocery')
const addBtn = document.getElementById('addBtn')

const createGroceryElement = groceryName => {
    const groceryElement = document.createElement('li')
    groceryElement.innerText = groceryName.value
    groceryElement.classList.add('groceryItem')
    groceryElement.addEventListener('click', () => {
        groceryElement.remove()
        db.delete(groceryName.key)
        canvasConfetti({
            particleCount: 300,
            spread: 1000,
            origin: {
              y: 0
            }
          });

    })
    return groceryElement
}

const addGrocery = newGrocery => {
    groceryList.appendChild(createGroceryElement(newGrocery))
}

addBtn.addEventListener('click', e => {
    e.preventDefault()
    const value = newGroceryInput.value
    const key = shortid.generate()
    if (value) {
        addGrocery({ key, value })
        db.set(key, value)
        newGroceryInput.value = null
    }
})

groceries.map(grocery=>addGrocery(grocery))