var button = document.getElementById ('counter');
var counter = 0;

button.onclick = function () {
    // make a request to the counter endpoint
    // var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    
    //Render the variable in the correct span
    counter = counter + 1;
    var span = documnet.getElementById('count');
    span.innerHTML = counter.toString();
};