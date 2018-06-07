const spellList = {
    abjuration: [],
    conjuration: [],
    divination: [],
    enchantment: [],
    evocation: [],
    illusion: [],
    necromancy: [],
    transmutation: [],
};
const favorites = [];
let renderAll = true;
const template = document.querySelector('.spellTemplate');
const list = document.getElementById(`spells`);

class App {
    constructor() {
        const form = document.querySelector('form');
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleSubmit(ev);
        });
        const buttons = document.querySelectorAll('.school');
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => {
                this.clearList();
                renderAll = false;
                this.renderList(buttons[i].id);
            });
        }

        document.getElementById('allSpells').addEventListener('click', () => {
            renderAll = true;
            this.clearList();
            this.renderAllSpells();
        });

        document.getElementById('favs').addEventListener('click', () => {
            this.displayFavorites();
        });
    }

    handleSubmit(ev) {
        const f = ev.target;
        const school = f.querySelector('select').options[f.querySelector('select').selectedIndex].value;
        const spell = {
            name: f.spellName.value,
            level: f.level.value,
            schooling: school,
        };
        
        spellList[school].push(spell);

        this.clearList();

        this.renderAllSpells();

        this.renderAll = true;
        
        f.reset();
    }

    
    renderAllSpells() {
        for(let schoolSpellList in spellList) {
            this.renderList(schoolSpellList);
        };
    }

    renderList(school) {
        spellList[school].forEach((spell) => {
            list.appendChild(this.renderItem(spell));
        });
    }

    clearList() {
        while(list.firstElementChild) {
            list.removeChild(list.lastElementChild);
        }
    }
    
    removeFromList(spell) {
        for(let school in spellList) {
            if(spellList[school].indexOf(spell) != -1) {
                spellList[school].splice(spellList[school].indexOf(spell), 1);
                break;
            } 
        }

        if(favorites.indexOf(spell) != -1) {
            favorites.splice(favorites.indexOf(spell), 1);
        }

        this.clearList();

        if(renderAll) {
            this.renderAllSpells();
        } else {
            this.renderList(school);
        }
        
    }
    
    renderItem(spell) {
        const properties = Object.keys(spell);

        const item = template.cloneNode(true);
        item.classList.remove('spellTemplate');
        item.classList.add('spell');

        properties.forEach((property) => {
            if(property == 'favorite') {
                item.classList.add('fav');
            } else {
                const el =  item.querySelector(`.${property}`);
                el.textContent = spell[property];
                el.setAttribute('title', spell[property])
                item.classList.remove('fav');
            } 
         })

        item.querySelector('button.delete') .addEventListener('click', () => {
            this.removeFromList(spell);
        });
        
        item.querySelector('button.fav').addEventListener('click', () => {
            spell.favorite = item.classList.toggle('fav');
            if(favorites.indexOf(spell) == -1) {
                favorites.push(spell);
            } else {
                favorites.splice(favorites.indexOf(spell), 1);
            }
            
        });

        item.querySelector('button.down').addEventListener('click', this.moveDown.bind(this, spell, item));

        item.querySelector('button.up').addEventListener('click', this.moveUp.bind(this, spell, item));

     

        return item;
    }

    moveDown(spell, item) {
        // Find it in the array
        const i = spellList[spell.schooling].indexOf(spell)

        // Only move it if it's not already last
        if (i < spellList[spell.schooling].length - 1) {
            // Move it on the page
            list.insertBefore(item.nextSibling, item)

            // Move it in the array
            const nextSpell = spellList[spell.schooling][i + 1]
            spellList[spell.schooling][i + 1] = spell
            spellList[spell.schooling][i] = nextSpell
        }
    }

    moveUp(spell, item) {
        // Find it in the array
        const i = spellList[spell.schooling].indexOf(spell)

        // Only move it if it's not already first
        if (i > 0) {
            // Move it on the page
            list.insertBefore(item, item.previousSibling)

            // Move it in the array
            const previousSpell = spellList[spell.schooling][i - 1]
            spellList[spell.schooling][i - 1] = spell
            spellList[spell.schooling][i] = previousSpell
        }
    }

    displayFavorites() {
        this.clearList();
        favorites.forEach((spell) => {
            list.appendChild(this.renderItem(spell));
        });
    }
}

const app = new App();