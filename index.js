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
const app = {
    init: function() {
        const form = document.querySelector('form');
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.handleSubmit(ev);
        });
    },
    
    removeFromList: function(spell) {
        for(let school in spellList) {
            if(spellList[school].indexOf(spell) != -1) {
                spellList[school].splice(spellList[school].indexOf(spell), 1);
            }
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
            level: f.level.value,
        };
        
        spellList[school].push(spell);

        for(let schoolSpellList in spellList) {
            this.renderList(schoolSpellList);
        };

        f.reset();
    },

    renderList: function(school) {
        
        const list = document.querySelector(`#${school}`);
        
        while(list.childElementCount > 0) {
            list.removeChild(list.lastElementChild);
        }

        spellList[school].forEach((spell) => {
            list.appendChild(this.renderItem(spell));
        });
    }
}

app.init();