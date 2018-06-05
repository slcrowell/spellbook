const button = document.querySelector('button');
button.addEventListener('click', function() {
    const heading = document.getElementById('head1');
    heading.textContent = 'Changed';
});

const form = document.querySelector('form');
const submitButton = form[1];

changeText = function() {
    const heading = document.getElementById('head1');
    heading.textContent = form[0].value;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    changeText();
}, false);

//submitButton.addEventListener('click', changeText);