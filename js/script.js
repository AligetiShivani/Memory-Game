const cards=document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard=false;
let cardOne, cardTwo;

function flipCard(){
    if(lockBoard){
        return;
    }
    if( this==cardOne){
        return;
    }
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard =true;
        cardOne=this;
    }
    else{
        hasFlippedCard=false;
        cardTwo =this;
        checkForMatch();
    }
}

function checkForMatch(){
    if(cardOne.dataset.framework === cardTwo.dataset.framework){
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
    }
    else{
        lockBoard=true;
        setTimeout(()=>{
            cardOne.classList.remove('flip');
            cardTwo.classList.remove('flip');
            lockBoard=false;
        },500);
    }

}
function resetBoard(){
    [hasFlippedCard, lockBoard]=[false, false];
    [cardOne, cardTwo]=[null,null];
}
(function shuffle(){
    cards.forEach(i =>{
        let randomPos=Math.floor(Math.random()*12);
        i.style.order= randomPos;
    });
})();
cards.forEach(i => i.addEventListener('click', flipCard))