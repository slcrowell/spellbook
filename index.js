const button = document.querySelector('button');
const reset = document.getElementById('reset');

button.addEventListener('click', function() {
    const heading = document.getElementById('1');
    heading.textContent = 'Changed';
});

reset.addEventListener('click', function() {
    let heading = document.getElementById('0');
    for(let i = 0; i < 7; i++) {
        heading.textContent = 'Spellbook ' + i;
        heading = document.getElementById(i + 1);
    }
})

const form = document.querySelector('form');
const submitButton = form[1];

changeText = function() {
    const heading = document.getElementById(document.querySelector('input[name = "spellbook"]:checked').value);
    if(form[0].value === '') {
        return;
    }
    heading.textContent = form[0].value;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    changeText();
}, false);