window.addEventListener("load", (event) => {
    let hammerPivot = document.querySelector(".hammer-pivot");
    let uLetter = document.querySelector(".U");

    setInterval(() => {
        hammerAngle += angleDelta;
        hammerPivot.style.rotate = `${hammerAngle}deg`;
        if(hammerAngle >= 30)
        {
            angleDelta = -1.5;
        }
        else if(hammerAngle <= -50)
        {
            angleDelta = 4;
        }

        if(hammerAngle > 20)
        {
            uLetter.style.transform = "translate(18px, -6px)";
        }
        else if(hammerAngle < 20){
            uLetter.style.transform = "translate(18px, -12px)";
        }
    }, 10);
});

let hammerAngle = 0;
let angleDelta = 4;