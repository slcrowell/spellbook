const schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
const description = ['Blocking, banishing, protecting', 'Producing things/creatures out of thin air', 'Understanding the past, present and future', 'Entrancing and beguiling people/creatures',
                    'Harnessing the power of the elements', 'Deception and trickery', 'Dealing with life, death and undeath', 'Changing energy and matter'];
const button = document.querySelector('button');
const resetText = document.getElementById('resetText');
const resetFull = document.getElementById('resetFull');
const form = document.querySelector('form');
const schoolTB = form[0];
const descipTB = form[1];
const createForm = document.getElementById('new');
const newSchool = createForm[0];
const newDescrip = createForm[1];


button.addEventListener('click', function() {
    const heading = document.getElementById('1');
    heading.textContent = 'Changed';
});

resetTextFunc = function() {
    let heading = document.getElementById('0');
    for(let i = 0; i < schools.length; i++) {
        heading.textContent = schools[i];
        heading = document.getElementById('d' + i);
        heading.textContent = description[i];
        heading = document.getElementById(i + 1);
    }
    schoolTB.value = ''; 
    descipTB.value = '';
    newSchool.value = '';
    newDescrip.value = '';
}
resetText.addEventListener('click', resetTextFunc)

resetFull.addEventListener('click', function() {
    const div = document.querySelector('div');
    for(let i = 8; i < schools.length; i++) {
        div.removeChild(document.getElementById(i));
        div.removeChild(document.getElementById('d' + i));

        form.querySelector('div').removeChild(document.querySelector('label'));
    }
    schools.splice(8);
    description.splice(8);
    resetTextFunc();
})

changeText = function() {
    let heading = document.getElementById(document.querySelector('input[name = "spellbook"]:checked').value);
    if(schoolTB.value != '') {
        heading.textContent = schoolTB.value;
    }
    
    heading = document.getElementById('d' + document.querySelector('input[name = "spellbook"]:checked').value);
    if(descipTB.value != '') {
        heading.textContent = descipTB.value;
    }
}

newSchoolFunc = function() {
    const newHead = document.createElement('h1');
    const newH3 = document.createElement('h3');
    const div = document.querySelector('div');
    schools.push(newSchool.value);
    description.push(newDescrip.value);
    newHead.textContent = newSchool.value;
    newHead.setAttribute('id', '' + schools.length - 1);
    newH3.textContent = newDescrip.value;
    newH3.setAttribute('id', 'd' + newHead.id);
    div.appendChild(newHead);
    div.appendChild(newH3);

    const newRB = document.createElement('input');
    newRB.setAttribute('type', 'radio');
    newRB.setAttribute('name', 'spellbook');
    newRB.setAttribute('value', schools.length - 1);

    const label = document.createElement('label');
    label.appendChild(newRB);
    label.appendChild(document.createTextNode(' ' + newSchool.value));
    label.appendChild(document.createElement('br'));
    form.querySelector('div').appendChild(label);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    changeText();
}, false);

createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    newSchoolFunc();
})