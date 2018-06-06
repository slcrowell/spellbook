const spellList = [];
const app = {
    init: function() {
      const form = document.querySelector('form');
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        this.handleSubmit(ev);
      });
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
  
      return item;
    },
  
    handleSubmit: function(ev) {
      const f = ev.target;
  
      const spell = {
        name: f.spellName.value,
        level: f.level.value,
      };
      
      spellList.push(spell);
  
      this.renderList();
      f.reset();
    },

    renderList: function() {
        const list = document.querySelector('#spells');
        spellList.forEach((spell) => {
            list.appendChild(this.renderItem(spell));
        });
    }
  }
  
  app.init();