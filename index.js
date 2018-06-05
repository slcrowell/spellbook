const form = document.querySelector('form');
const schools = ["evocation", "enchantment", "conjuration", "transmutation", "divination", "illusion", "abjuration", "necromancy"]
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffa500', '#aa00ff', '#ffff00', '#ffffff', '#000000']

addSpell = function() {
    const spellsDiv = document.querySelector('#spells');
    const label = document.createElement('l1');
    label.appendChild(document.createTextNode(`${form.spellName.value} requires level ${form.spellLevel.value}`));
    label.appendChild(document.createElement('br')); 
    console.log(schools.indexOf(form.school.value.toLowerCase()));   
    if(schools.indexOf(form.school.value) != -1) {
        label.style.color = colors[schools.indexOf(form.school.value)];
    }
    spellsDiv.appendChild(label);
    form.spellName.value = '';
    form.spellLevel.value = '';
    form.school.value = '';
};


form.addEventListener('submit', function(e) {
    e.preventDefault();
    addSpell();
}, false);