let elMultiplier = document.querySelector("#multiplier");
function Card (_suit,_role,_parent){
    this.suit = _suit;
    this.role = _role;
    //0-9 normal
    //10-11 skip
    //12 +2
    //13 +4
    //14 change
}
function Deck(){
    this.cards = [];
    for(let y =1; y<=4;y++) {
        for(let x=0;x<15;x++){
            this.cards[this.cards.length] = new Card(y,x);
        }
        for (let x=1;x<13;x++) {
            this.cards[this.cards.length] = new Card(y,x);
        }
    }
    this.shuffle = function(){
            for(let x =0; x<108;x++){
                let random = Math.floor(Math.random()*108);
                let temp = this.cards[random];
                this.cards[random] = this.cards[x];
                this.cards[x] = temp;
            }
    };

    for(let x=0; x<3;x++){
        this.shuffle();
    }
}

function Player(_parent,_isBot){
    this.isBot = _isBot;
    this.parent = _parent;
    this.hand = [];
    this.value = 0;
    this.updateMoney = function(_amt){
        elMoney.textContent = `$${this.money+_amt}`;
        this.money = parseInt(elMoney.textContent.substring(1));
        this.updateDisplay();
    };
    if(!this.isBot){
        this.money = parseInt(elMoney.textContent.substring(1));
    }
    this.calcValue = function(){
        this.value = 0;
        for(let x=0; x<this.hand.length;x++){
            this.value += this.hand[x].role;
        }
    };

    this.updateInfo = function(){
        let elInfo = document.querySelector("#playerInfo");
        elInfo.innerHTML ="";
        let elMoney = document.createElement("div");
        elMoney.classList.add("info");
        elMoney.textContent = `$${this.money}`;
        let elHand = document.createElement("div");
        elHand.classList.add("info");
        elHand.textContent = `Hand: ${this.hand.length}`;
        let elValue = document.createElement("div");
        elValue.classList.add("info");
        elValue.textContent = `Value: ${this.value}`;
        elInfo.appendChild(elMoney);
        elInfo.appendChild(elHand);
        elInfo.appendChild(elValue);
    };

    this.updateDisplay = function(){
        this.parent.player.updateHand();
        this.parent.player.updateInfo();
        this.parent.bot.updateBot();
    };

    this.updateHand = function(){
        let elHand = document.querySelector("#hand");
        this.hand.sort(function(a,b){
            return ((a.suit*200)+a.role+((a.role>=13)?(a.role===13)?1000:2000:0))-((b.suit*200)+b.role+((b.role>=13)?(b.role===13)?1000:2000:0));
        });
        elHand.innerHTML="";
        let player = this;
        for(let x=0; x<this.hand.length;x++){
            let elCard = document.createElement("div");
            elCard.textContent = this.hand[x].role;
            elCard.classList.add("play");
            elCard.classList.add("card");
            if(this.hand[x].role<13) {
                elCard.style.backgroundColor = this.parent.suitColor[this.hand[x].suit];
            }
            else{
                elCard.style.backgroundColor="white";
            }
            elCard.addEventListener("click",function(){
                player.playMove(player.hand[x]);
            });
            elHand.appendChild(elCard);
        }
    };

    this.draw = function(){
        this.hand[this.hand.length] = this.parent.deck.cards[0];
        this.parent.deck.cards.shift();
        this.calcValue();
        this.updateDisplay();
        if(this.parent.deck.cards.length<=0){
            this.parent.deck = new Deck();
            this.parent.deck.shuffle(3);
        }
    };

    this.play = function(_card){
        this.parent.card = _card;
        this.hand.splice(this.hand.indexOf(_card),1);
        this.parent.updateCard();
        this.calcValue();
        this.updateDisplay();
    };
    this.checkWin =function(){
        if(this.hand.length<1){
                elBet.style.display = "block";
            if(this.isBot){
                this.parent.player.updateMoney(-1*this.parent.player.value*this.parent.multiplier);
                if(this.parent.player.money>0){
                    elResult.innerHTML = `<h2>You Lost</h2><br><p>You have lost $${this.parent.player.value * this.parent.multiplier}</p>`;
                    elEnd.innerHTML="<p>Click start to play again</p>";
                }
                else {
                    elResult.textContent = "Thank you for playing";
                    elEnd.textContent = "You have no more money";
                    elStart.disabled=true;
                }
            }
            else{
                elResult.innerHTML = `<h2>You Won</h2><p>You have won $${this.parent.bot.value*this.parent.multiplier}</p>`;
                elEnd.innerHTML="<p>Click start to play again</p>";
                this.updateMoney(this.parent.bot.value*this.parent.multiplier);
            }
            this.updateDisplay();
        }
        return this.hand.length<1;
    };

    this.checkCard = function(_card) {
        return (_card.suit === this.parent.card.suit || _card.role === this.parent.card.role||_card.role>=13);
    };

    this.checkMove = function(){
        let canPlay = false;
        for(let x=0;x<this.hand.length;x++){
            if(this.checkCard(this.hand[x]))
                canPlay = true;
        }
        return canPlay;
    };

    this.drawMove = function(){
        if(this.checkMove()===false){
            this.draw();
            console.log("Player has drawn a card and ends their turn");
            this.parent.bot.botMove();
        }
    };

    this.playMove = function(_card){
        if(this.checkCard(_card)) {
            this.play(_card);
            console.log(`Player played ${_card.suit} ${_card.role}`);
            if(!this.checkWin()) {
                switch(_card.role){
                    case 10:
                    case 11:
                        this.drawMove();
                        break;
                    case 12:
                        this.parent.bot.draw();
                        this.parent.bot.draw();
                        break;
                    case 13:
                        for(let x=0;x<4;x++) {
                            this.parent.bot.draw();
                        }
                    case 14:
                        this.changeColour();
                        break;
                }
                if((_card.role===12||_card.role<10)){
                    this.parent.bot.botMove();
                }
            }
        }
    };
    this.changeColour =function(){
        let player = this;
        let elChange = document.querySelector("#mask");
        let elChoices = document.querySelectorAll("[class = colours]");
        elChange.style.display ="block";
        for(let x=0;x<elChoices.length;x++){
            elChoices[x].style.backgroundColor = player.parent.suitColor[x+1];
            elChoices[x].addEventListener("click",function(){
                player.parent.card.suit = x+1;
                player.parent.updateCard();
                player.parent.bot.botMove();
                elChange.style.display = "none";
            });
          }
    };
    this.botMove = function(){
        if(this.checkMove()){
            let x =0;
            while(x<this.hand.length&&this.checkCard(this.hand[x])===false){
                x+=1;
            }
            let card = this.hand[x];
            this.play(card);
            console.log(`Bot played ${card.suit} ${card.role}`);
            if(!this.checkWin()) {
                switch(card.role){
                    case 10:
                    case 11:
                        console.log("bot goes again");
                        this.botMove();
                        break;
                    case 12:
                        console.log("player draws 2");
                        this.parent.player.draw();
                        this.parent.player.draw();
                        break;
                    case 13:
                        console.log("players draw 4");
                        for(let x=0;x<4;x++) {
                            this.parent.player.draw();
                        }
                    case 14:
                        console.log("colour change");
                        console.log(this);
                        this.parent.card.suit = card.suit;
                        this.parent.updateCard();
                        break;
                }
                if(!(card.role===10||card.role===11)){
                    this.parent.player.drawMove();
                }
            }
        }
        else{
            console.log("Bot has drawn a card and ends their turn");
            this.draw();
            this.parent.player.drawMove();
        }
    };
    this.updateBot = function(){
        let elBot = document.querySelector("#computerInfo");
        elBot.innerHTML = `Hand: ${this.hand.length}    Value:${this.value}`;
    };
}
function Game() {
    this.suitColor = ["undefined", "orange", "lime", "cyan", "purple"];
    this.updateCard = function () {
        let elCard = document.querySelector("#board");
        elCard.style.display = "block";
        elCard.textContent = this.card.role;
        elCard.classList.add("card");
        elCard.style.backgroundColor = this.suitColor[this.card.suit];
    };

    this.start = function () {
        this.multiplier = parseInt(elMultiplier.value);
        this.deck = new Deck();
        this.player = new Player(this, false);
        this.bot = new Player(this, true);
        for (let x = 0; x < 8; x++) {
            this.player.draw();
            this.bot.draw();
        }
        this.card = this.deck.cards[0];
        this.deck.cards.shift();
        this.updateCard();
        this.player.drawMove();
    };
    this.start();
}
