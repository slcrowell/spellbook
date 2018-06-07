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
let renderAll = true;
const app = {
    init: function() {
        const form = document.querySelector('form');
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleSubmit(ev);
        });
        const buttons = document.querySelectorAll('button');
        for(let i = 1; i < buttons.length - 1; i++) {
            buttons[i].addEventListener('click', () => {
                const list = document.getElementById(`spells`);
        
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
    },
    
    removeFromList: function(spell) {
        for(let school in spellList) {
            if(spellList[school].indexOf(spell) != -1) {
                spellList[school].splice(spellList[school].indexOf(spell), 1);
                break;
            } 
        }

        this.clearList();
            if(renderAll) {
                this.renderAllSpells();
            } else {
                this.renderList(school);
            }
        
    },

    renderProperty: function(name, value) {
        const el = document.createElement('span');
        el.classList.add(name);
        el.textContent = value;
        el.setAttribute('title', value);
        return el;
    },
    
    renderItem: function(spell) {
        // ['name', 'level']
        const properties = Object.keys(spell);

        // collect an array of <span> elements
        const childElements = properties.map((prop) => {
            return this.renderProperty(prop, spell[prop]);
        });

        const item = document.createElement('li');
        item.classList.add('spell');

        // append each <span> to the <li>
        childElements.forEach(function(el) {
            item.appendChild(el);
        });

        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.style.background = 'transparent';
        button.style.border = 'transparent';
        button.style.fontFamily = 'Homemade Apple';
        button.addEventListener('click', () => {
            this.removeFromList(spell); 
        });
        item.appendChild(button);
        item.style.fontFamily = 'Homemade Apple'
        return item;
    },

    handleSubmit: function(ev) {
        const f = ev.target;
        const school = f.querySelector('select').options[f.querySelector('select').selectedIndex].value;
        const spell = {
            name: f.spellName.value,
            schooling: f.querySelector('select').options[f.querySelector('select').selectedIndex].value,
            level: f.level.value,
        };
        
        spellList[school].push(spell);

        const list = document.getElementById(`spells`);

        this.clearList();

        this.renderAllSpells();

        this.renderAll = true;
        
        f.reset();
    },

    clearList: function() {
        const list = document.getElementById(`spells`);

        while(list.firstElementChild) {
            list.removeChild(list.lastElementChild);
        }
    },

    renderAllSpells: function() {
        const list = document.getElementById(`spells`);

        for(let schoolSpellList in spellList) {
            this.renderList(schoolSpellList);
        };
    },

    renderList: function(school) {
        
        const list = document.getElementById(`spells`);
        
        spellList[school].forEach((spell) => {
            list.appendChild(this.renderItem(spell));
        });
    }
}

app.init();