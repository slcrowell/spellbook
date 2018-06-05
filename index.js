const schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
const description = ['Blocking, banishing, protecting', 'Producing things/creatures out of thin air', 'Understanding the past, present and future', 'Entrancing and beguiling people/creatures',
                    'Harnessing the power of the elements', 'Deception and trickery', 'Dealing with life, death and undeath', 'Changing energy and matter'];
const button = document.querySelector('button');
const reset = document.getElementById('reset');
const form = document.querySelector('form');

button.addEventListener('click', function() {
    const heading = document.getElementById('1');
    heading.textContent = 'Changed';
});

reset.addEventListener('click', function() {
    let heading = document.getElementById('0');
    for(let i = 0; i < 7; i++) {
        heading.textContent = schools[i];
        heading = document.getElementById('d' + i);
        heading.textContent = description[i];
        heading = document.getElementById(i + 1);
    }
    form[0].value = ''; 
    form[1].value = '';
})

changeText = function() {
    let heading = document.getElementById(document.querySelector('input[name = "spellbook"]:checked').value);
    if(form[0].value != '') {
        heading.textContent = form[0].value;
    }
    
    heading = document.getElementById('d' + document.querySelector('input[name = "spellbook"]:checked').value);
    if(form[1].value != '') {
        heading.textContent = form[1].value;
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    changeText();
}, false);