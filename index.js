class App {
    constructor() {
        const form = document.querySelector('form');
        this.spellList = {
            abjuration: [],
            conjuration: [],
            divination: [],
            enchantment: [],
            evocation: [],
            illusion: [],
            necromancy: [],
            transmutation: [],
        };
        this.favorites = [];
        this.renderAll = true;
        this.template = document.querySelector('.spellTemplate');
        this.list = document.getElementById(`spells`);

        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleSubmit(ev);
        });
        const buttons = document.querySelectorAll('.school');
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => {
                this.clearList();
                this.renderAll = false;
                this.renderList(buttons[i].id);
            });
        }

        document.getElementById('allSpells').addEventListener('click', () => {
            this.renderAll = true;
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
        
        this.spellList[school].push(spell);

        this.clearList();

        this.renderAllSpells();

        this.renderAll = true;
        
        f.reset();
    }

    
    renderAllSpells() {
        for(let schoolSpellList in this.spellList) {
            this.renderList(schoolSpellList);
        };
    }

    renderList(school) {
        this.spellList[school].forEach((spell) => {
            this.list.appendChild(this.renderItem(spell));
        });
    }

    clearList() {
        while(this.list.firstElementChild) {
            this.list.removeChild(this.list.lastElementChild);
        }
    }
    
    removeFromList(spell) {
        for(let school in this.spellList) {
            if(this.spellList[school].indexOf(spell) != -1) {
                this.spellList[school].splice(this.spellList[school].indexOf(spell), 1);
                break;
            } 
        }

        if(this.favorites.indexOf(spell) != -1) {
            this.favorites.splice(this.favorites.indexOf(spell), 1);
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

        const item = this.template.cloneNode(true);
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
            if(this.favorites.indexOf(spell) == -1) {
                this.favorites.push(spell);
            } else {
                this. favorites.splice(favorites.indexOf(spell), 1);
            }
            
        });

        item.querySelector('button.down').addEventListener('click', this.moveDown.bind(this, spell, item));

        item.querySelector('button.up').addEventListener('click', this.moveUp.bind(this, spell, item));

     

        return item;
    }

    moveDown(spell, item) {
        // Find it in the array
        const i = this.spellList[spell.schooling].indexOf(spell)

        // Only move it if it's not already last
        if (i < this.spellList[spell.schooling].length - 1) {
            // Move it on the page
            this.list.insertBefore(item.nextSibling, item)

            // Move it in the array
            const nextSpell = this.spellList[spell.schooling][i + 1]
            this.spellList[spell.schooling][i + 1] = spell
            this.spellList[spell.schooling][i] = nextSpell
        }
    }

    moveUp(spell, item) {
        // Find it in the array
        const i = this.spellList[spell.schooling].indexOf(spell)

        // Only move it if it's not already first
        if (i > 0) {
            // Move it on the page
            this.list.insertBefore(item, item.previousSibling)

            // Move it in the array
            const previousSpell = this.spellList[spell.schooling][i - 1]
            this.spellList[spell.schooling][i - 1] = spell
            this.spellList[spell.schooling][i] = previousSpell
        }
    }

    displayFavorites() {
        this.clearList();
        this.favorites.forEach((spell) => {
            this.list.appendChild(this.renderItem(spell));
        });
    }
}

const app = new App();