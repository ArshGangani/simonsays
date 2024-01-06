let currSeq=[];
let userSeq=[];
let level=0;
let game=false;
let highestScore=0;
let btns = ["green","red","yellow","blue"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress",(e)=>{
    if(game==false) {
        game=true;
        console.log("game started");
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("btncolor");
    setTimeout(()=>{
        btn.classList.remove("btncolor");
    },250)
}

function userFlash(btn) {
    btn.classList.add("usercolor");
    setTimeout(()=>{
        btn.classList.remove("usercolor");
    },250)
}

function levelUp() {
    level++;
    h2.innerText = "Level " + level;
    let n = Math.floor(Math.random()*4);
    let randcolor = btns[n];
    let randbtn = document.querySelector(`.${randcolor}`)
    currSeq.push(n);
    btnFlash(randbtn);
}

function check(idx) {
    console.log(currSeq[idx]);
    console.log(userSeq[idx]);

    if(currSeq[idx]==userSeq[idx]) {
        if(currSeq.length == userSeq.length) {
            setTimeout(levelUp,1000);
            userSeq = [];
        }
    } else {
        if(level>0) {
            h2.innerHTML = `Game Over! Your score is <b>${level-1}<b> <br> Press any key to start`;
            if(highestScore<(level-1)) highestScore=level-1;
            let hs = document.querySelector(".score");
            hs.innerHTML = `Your best score is ${highestScore}`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(()=>{
                document.querySelector("body").style.backgroundColor = "white";
            },250);
            reset();
        }
    }
}

function clickbtn() {
    if(game) {

        let btn = this;
        userFlash(btn);
        userSeq.push(parseInt(btn.innerText)-1);
        check(userSeq.length-1);
    }
}

let boxes=document.querySelectorAll(".box");
for(btn of boxes) {
    btn.addEventListener("click",clickbtn);
}

function reset() {
    game=false;
    currSeq=[];
    userSeq=[];
    level=0;
}