const form = document.querySelector('form');

addSpell = function() {
    const spellsDiv = document.querySelector('#spells');

    spellsDiv.appendChild(addLabel());
    form.spellName.value = '';
    form.spellLevel.value = '';
};

addLabel = function() {
    const label = document.createElement('l1');

    label.appendChild(addNameSpan());
    label.appendChild(document.createTextNode(' requires level '));    
    label.appendChild(addLevelSpan());
    label.appendChild(document.createElement('br'));
    return label;
}

addNameSpan = function() {
    const spellSpan = document.createElement('span');
    spellSpan.appendChild(document.createTextNode(`${form.spellName.value}`));
    spellSpan.style.fontFamily = 'UnifrakturCook, sans-serif';
    spellSpan.setAttribute('class', 'spellName');
    return spellSpan;
}

addLevelSpan = function() {
    const levelSpan = document.createElement('span');
    levelSpan.appendChild(document.createTextNode(`${form.spellLevel.value}`))
    levelSpan.style.fontFamily = 'Indie Flower, sans-serif';
    levelSpan.setAttribute('class', 'spellLevel');
    return levelSpan;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addSpell();
}, false);