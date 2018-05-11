function openNav() {
    document.getElementById("mySideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}

function toggleDropDown(dropDown) {
    var dropDownContent =  dropDown.nextElementSibling;
    if (dropDownContent.style.display === 'none') {
        dropDownContent.style.display = 'block';
    } else {
        dropDownContent.style.display = 'none'
    }
}

function presetChanged(selected, id) {
    document.getElementById(id).value = selected.value;
}

function openDropDown(id) {
    openNav();
    document.getElementById(id).style.display = 'block';
}