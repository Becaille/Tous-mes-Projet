'use strict';


// AVEC LA SOURIS AU CLICK 


document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById("square1").addEventListener('click', function(){
       new Audio('mp3/Big-Rack-Tom.mp3').play();
    });
    document.getElementById("square2").addEventListener('click', function(){
       new Audio('mp3/Crash.mp3').play();
    });
    document.getElementById("square3").addEventListener('click', function(){
       new Audio('mp3/Floor-Tom.mp3').play();
    });
    document.getElementById("square4").addEventListener('click', function(){
       new Audio('mp3/Hi-Hat-Closed.mp3').play();
    });
    document.getElementById("square5").addEventListener('click', function(){
       new Audio('mp3/Kick.mp3').play();
    });
    document.getElementById("square6").addEventListener('click', function(){
       new Audio('mp3/rhodes.mp3').play();
    });
    document.getElementById("square7").addEventListener('click', function(){
       new Audio('mp3/Small-Rack-Tom.mp3').play();
    });
    document.getElementById("square8").addEventListener('click', function(){
       new Audio('mp3/Snare.mp3').play();
    });
    document.getElementById("square9").addEventListener('click', function(){
       new Audio('mp3/string.mp3').play();
    });
    
    // AVEC LE CLAVIER AU TOUCHE > AZERTYUIO <

document.addEventListener('keydown', logKey);
    function logKey(e) {
        switch (e.keyCode) {
            case 65:
                new Audio('mp3/Big-Rack-Tom.mp3').play();
                break;
            case 90:
                new Audio('mp3/Crash.mp3').play();
                break;
            case 69:
                new Audio('mp3/Floor-Tom.mp3').play();
                break;
            case 82:
                new Audio('mp3/Hi-Hat-Closed.mp3').play();
                break;
            case 84:
                new Audio('mp3/Kick.mp3').play();
                break;
            case 89:
                new Audio('mp3/rhodes.mp3').play();
                break;
            case 85:
                new Audio('mp3/Small-Rack-Tom.mp3').play();
                break;
            case 73:
                new Audio('mp3/Snare.mp3').play();
                break;
            case 79:
                new Audio('mp3/string.mp3').play();
                break;
            default:
                console.log("Indisponible")
        };
    };
    

});


// AVEC LE CLAVIER AU TOUCHE > AZERTYUIO <


