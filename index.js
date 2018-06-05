const form = document.querySelector('form');

changeText = function() {
    const spell = form.spellName.value;
    const spellsDiv = document.querySelector('#spells')
    spellsDiv.innerHTML += `<li>${spell}</li>`
    form.spellName.reset();
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    changeText();
}, false);