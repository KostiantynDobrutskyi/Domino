var sliderSize = document.querySelector(".size"),
    sliderRotateSpeed = document.querySelector(".rotate"),
    domino = document.querySelector(".dominoe"),
    dominoPart = document.querySelectorAll(".dominoe-part"),
    cloneElem = document.querySelectorAll(".clone-elem"),
    dominoPositionTop = document.querySelector(".domino-top"),
    dominoPositionBottom = document.querySelector(".domino-bottom"),
    btnReset = document.querySelector(".reset"),
    rotateRight = document.getElementById("rotateRight"),
    rotateLeft = document.getElementById("rotateLeft"),
    object = {};


createObjectSquare();
randomDominoIsDone();
dominoPartChild(1);


//---------------------------------Domino size--------------------------
function dominoPartChild(point) {
    for (var i = 0; i < dominoPart.length; i++) {
        for (var j = 0; j < dominoPart[i].children.length; j++) {
            heightSquare(dominoPart[i].children[j], point)
        }
    }
}

function heightSquare(figure, point) {
    var width = 12,
        newWidth = width * point;
    figure.style.height = newWidth + "px";
    figure.style.width = newWidth + "px";
}

function sizeDomino(domino, point) {

    var height = 180,
        newHeight = height * point,
        width = newHeight / 2;
    domino.style.height = newHeight + "px";
    domino.style.width = width + "px";

}

sliderSize.addEventListener("change", function () {
    var point = sliderSize.value;
    sizeDomino(domino, point);
    dominoPartChild(point);
});

//------------------------------------Domino random square-----------------------------


function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function createObjectSquare() {
    for (var i = 0; i < cloneElem[0].children.length; i++) {
        object[i] = cloneElem[0].children[i];
    }
}

function randomDomino(position, number) {
    while (position.firstChild) {
        position.removeChild(position.firstChild);
    }
    for (var key in object) {
        if (+key === number) {
            position.appendChild(object[key]);
        }
    }
}

function randomDominoIsDone() {
    randomDomino(dominoPositionTop, randomInteger(0, 6));
    randomDomino(dominoPositionBottom, randomInteger(0, 6))
}


//--------------------------------------Domino Reset---------------------------------
btnReset.addEventListener("click", function () {
    sliderSize.value = 1;
    sliderRotateSpeed.value = 0;
    randomDominoIsDone();
    rotateDominoSpeed(0);
    dominoPartChild(1);
    sizeDomino(domino, 1);
    rotateRight.classList.remove("activeBtn");
    rotateLeft.classList.remove("activeBtn");
});


//----------------------------------------- Rotate Dominoe---------------------------

function rotateDominoSpeed(point) {
       if(point>0){
           domino.style.animationDuration = 11-point + "s";
       }
       else {
           domino.style.animationDuration = 0 + "s";
       }
}


sliderRotateSpeed.addEventListener("change", function () {
    var point = sliderRotateSpeed.value;
    rotateDominoSpeed(point);
});

rotateRight.addEventListener("click", function () {
    sliderRotateSpeed.value = 1;
    rotateDominoSpeed(1);
    domino.classList.add("rightR");
    domino.classList.remove("leftR");
    rotateRight.classList.add("activeBtn");
    rotateLeft.classList.remove("activeBtn");
});

rotateLeft.addEventListener("click", function () {
    sliderRotateSpeed.value = 1;
    rotateDominoSpeed(1);
    domino.classList.remove("rightR");
    domino.classList.add("leftR");
    rotateRight.classList.remove("activeBtn");
    rotateLeft.classList.add("activeBtn");
});



