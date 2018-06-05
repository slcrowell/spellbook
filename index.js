const button = document.querySelector('button');
button.addEventListener('click', function() {
    const heading = document.getElementById('1');
    heading.textContent = 'Changed';
});

const form = document.querySelector('form');
const submitButton = form[1];

changeText = function() {
    const heading = document.getElementById(document.querySelector('input[name = "spellbook"]:checked').value);
    heading.textContent = form[0].value;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    changeText();
}, false);