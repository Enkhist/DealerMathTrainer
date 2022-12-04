class Dice{
	constructor(){	
		this.die1 = undefined;
		this.die2 = undefined;
		this.dieFaces = ["⚀","⚁","⚂","⚃","⚄","⚅"]
		this.pointNums = [4,5,6,8,9,10]
		this.roll()
	}
	roll(){
		this.die1 = Math.floor(Math.random()*6)+1;
		this.die2 = Math.floor(Math.random()*6)+1;
	}
	get displayDice(){
		return this.dieFaces[this.die1-1] + this.dieFaces[this.die2-1];
	}
	get rollValue(){
		return this.die1+this.die2
	}
	get isCraps(){
		if(this.rollValue == 2 || this.rollValue == 3 || this.rollValue == 12)
		{
			return true;
		}
		else{
			return false;
		}
	}
	get isPointNum(){
		if(this.pointNums.includes(this.rollValue)){
			return true;
		}
		else{
			return false;
		}
	}
	get isHard(){
		if(this.die1 == this.die2 && this.isPointNum){
			return true;
		} else {
			return false;
		}

	}
}

//returns random number between min and max that fits unit
function randUnit(min, max, unit){
	//min and max number of units in this bad boy
	var unitMin = Math.ceil(min/unit);
	var unitMax = Math.floor(max/unit);
	rand = Math.random()
	ret = ((unit*unitMin)+(Math.round(rand*(unitMax-unitMin))*unit))
	return ret
}

var question = undefined;
var answer = undefined;
var payKey = undefined;

var settings = {
	'caMin':1,
	'caMax':100,
	'pbMin':1,
	'pbMax':500,
	'includeCraps':true,
	'includePoints':true,
	'includeSevens':false
};
dice = new Dice();

//setQA
function setQA(q, a){
	question = q;
	answer = a;
	document.getElementById("quizQuestion").innerHTML = question;
	document.getElementById("cheat").innerHTML="";
	document.getElementById("key").innerHTML="";
	
}
/*
Views
2  -Horn, horn highs, craps aces, c&e
3  -horn, horn highs, crap ace deuce, c&e
4  -hop 4, place pay, come pay, line pay, hard way
5  -hop 5, place pay, come pay, line pay
6  -hop 6, place pay, come pay, line pay, hard way
7  -any 7, any down behind, dont pass line
8  -hop 8, place pay, come pay, line pay, hard way
9  -hop 9, place pay, come pay, line pay
10 -hop 10, place pay, come pay, line pay, hard way
11 -horn, horn high, eleven, c&e
12 - horn, horn highs, crap 12, c&e
*/

function ceScenario(roll){
	//high side scenario
	bet = randUnit(settings['caMax'], settings['caMax'], 1);
	if(roll==2|roll==12|roll==3){
		payout = bet*3;
	}
	else if(roll==11){
		payout = bet*7;
	}
	setQA("C&E payout for "+bet, payout);
	payKey = "3:1 on a craps, 7:1 on a yo"
}

function placeBet(roll){
	//test place bet payouts, assuming an autobuy at $20 on the 10, 4
	if(roll == 4||roll == 10){
		bet = randUnit(settings['pbMin'], settings['pbMax'], 5);
		if(bet>=20){
			payout = bet*2;
		} else {
			payout = bet*1.8;
		}
		setQA("Place bet payout for "+bet, payout);
		payKey = "9:5 or 1.8x if not bought</br>"+
		         "2:1 or 2x if bought[don't forget to ask for commission!]"
	}
	else if(roll == 9||roll == 5){
		bet = randUnit(settings['pbMin'], settings['pbMax'], 5);
		payout = Math.ceil(bet*1.4);
		setQA("Place bet payout for "+bet, payout);
		payKey = "7:5 or 1.4x if not bought</br>"+
		         "3:2 or 1.5x if bought [who would buy this?]"
	}
	else if(roll == 6||roll == 8){
		bet = randUnit(settings['pbMin'], settings['pbMax'], 6);
		payout = Math.floor(bet/6)*7;
		setQA("Place bet payout for "+bet, payout);
		payKey = "7:6"
		payKey = "7:6 if not bought</br>"+
		         "6:5 or 1.2 if bought [who would buy this?]"
	}
}
function horn(roll){
	bet = randUnit(settings['caMin'], settings['caMax'], 4);
	if(roll==2||roll==12){
		payout = Math.floor(bet/4)*27;
	}	
	else if(roll==3||roll==11){
		payout = bet*3
	}
	setQA("Horn payout for "+bet, payout);
	payKey = "27:4, 6.75x, or 7x-1/4x the bet on the high side</br>"+
	         "3x the bet on the low side."
}
function hornHigh(roll){
	var highs={
		2:"Aces",
		3:"Ace-Deuce",
		11:"Yo",
		12:"Twelve"}
	var hhlist = [2,3,11,12];

	bet = randUnit(settings['caMin'], settings['caMax'], 5);
	selectedHornHigh = hhlist[Math.floor(Math.random()*hhlist.length)];

	if(roll == 11|roll == 3){
		if(roll == selectedHornHigh){
			payout = Math.floor(bet/5)*27;
		} else {
			payout = Math.floor(bet/5)*11;
		}
	} else if(roll == 12|roll == 2){
		if(roll == selectedHornHigh){
			payout = Math.floor(bet/5)*57;
		} else {
			payout = Math.floor(bet/5)*26;
		}
	}
	setQA("Horn High "+highs[selectedHornHigh]+" payout for "+bet, payout);
	payKey = "[57:5 / 11.4x] high side winner</br>"+
	         "[26:5 / 5.2x] high side loser</br>"+
	         "[27:5 / 5.4x] low side winner</br>"+
	         "[11:5 / 2.2x] high side loser</br>"
}
function hardway(roll){
	bet = randUnit(settings['caMin'], settings['caMax'], 1);
	if(roll == 6|roll == 8)
	{
		payout = bet*9
	} else if(roll == 4|roll == 10){
		payout = bet * 7
	}
	setQA("Hard "+roll+" payout for "+bet, payout);
	payKey = "9:1 on 6/8</br>"+
	         "7:1 on 4/10"
}
function anyseven(roll){
	bet = randUnit(settings['caMin'], settings['caMax'], 1);
	payout = bet*4
	setQA("Any seven for "+bet, payout);
	payKey = "4:1"
}

function highLowYo(roll){
	bet = randUnit(settings['caMin'], settings['caMax'], 3);
	if(roll == 12||roll == 2){
		payout = Math.floor(bet/3)*28;
	} else if(roll == 11){
		payout = Math.floor(bet/3)*13;
	}
	setQA("High Low Yo for "+bet, payout);
	payKey = "28:3, 9 1/3x (30:1 on 1/3 of the bet, minus two losers to keep up) on high side,</br>"+
			 "13:3, 4 1/3x (15:1 on 1/3 of the bet, minus two losers to keep up) on low side";
}

function highLow(roll){
	bet = randUnit(settings['caMin'], settings['caMax'], 2);
	if(roll == 12||roll == 2){
		payout = Math.floor(bet/2)*29;
	} else if(roll == 11){
		payout = Math.floor(bet/2)*14;
	}
	setQA("High Low for "+bet, payout);
	payKey = "29:2, 14.5x (30:1 on 1/2 of the bet, minus a loser to keep up) on high side,</br>"+
			 "14:2, 7x (15:1 on 1/2 of the bet, minus a loser to keep up) on low side";
}

function threewaycraps(roll){
	bet = randUnit(settings['caMin'], settings['caMax'], 3);
	if(roll == 12||roll == 2){
		payout = Math.floor(bet/3)*28;
	} else if(roll == 3){
		payout = Math.floor(bet/3)*13;
	}
	setQA("Three way craps for "+bet, payout);
	payKey = "28:3, 9 1/3x (30:1 on 1/3 of the bet, minus two losers to keep up) on high side,</br>"+
			 "13:3, 4 1/3x (15:1 on 1/3 of the bet, minus two losers to keep up) on low side";
}

//catch all function for the individual red hops
function redHops(roll){
	var reds={
		2:"Aces",
		3:"Ace-Deuce",
		11:"Yo",
		12:"Twelve"}
	bet = randUnit(settings['caMin'], settings['caMax'], 1);
	if(roll == 2||roll == 12){
		payout = bet*30;
	}
	else if (roll == 3||roll==11){
		payout = bet*15;
	}
	setQA(reds[roll]+" for "+bet, payout);
	payKey = "[Keys for the red hops]</br>"+
	         "30:1 on Craps Ace and Craps 12 bet</br>"+
	         "15:1 on Craps Ace-Deuce and Yo bet"

}

function crapcheck(roll)
{
	bet = randUnit(settings['caMin'], settings['caMax'], 1);
	if(roll == 2|roll == 3| roll == 12){
		payout = bet * 7
	}
	setQA("Any craps for "+bet, payout);
	payKey = "7:1 on 2</br>"+
	      "7:1 on 3</br>"+
	      "7:1 on 11</br>"+
	      "7:1 on 12"
}

/*
function hops(roll)
{
	bet = randUnit(settings['caMin'], settings['caMax'], 1);
	if(dice.isHard){
		payout = bet*30;
	} else {
		payout = bet*15;
	}
	setQA("[this exact hop] for "+bet, payout);
}
*/
var funcs = [
	[ceScenario, horn, hornHigh, redHops, crapcheck, highLowYo, highLow, threewaycraps],//2
	[ceScenario, horn, hornHigh, redHops, crapcheck, threewaycraps],//3
	[placeBet],//4
	[placeBet],//5
	[placeBet],//6
	[anyseven],//7
	[placeBet],//8
	[placeBet],//9
	[placeBet],//10
	[ceScenario, horn, hornHigh, redHops, highLowYo],//11,
	[ceScenario, horn, hornHigh, redHops, crapcheck, highLowYo, highLow, threewaycraps]//12];
]
function roll() {
	readSettings();
	do{
		var goodRoll = true;
		dice.roll();
		if(!settings['includePoints']){
			if(dice.isPointNum){
				goodRoll = false
			}
		}
		if(!settings['includeCraps']){
			if(dice.isCraps){
				goodRoll = false
			}
		}
		if(!settings['includeSevens']){
			if(dice.rollValue == 7){
				goodRoll = false
			}
		}
	} while(!goodRoll)
	payKey = ""
	document.getElementById("dice").innerHTML = dice.displayDice;
	numberFuncs = [...funcs[dice.rollValue-2]];
	if(dice.isPointNum){
		if(dice.isHard){
			numberFuncs.push(hardway)
		}
	}
	numberFuncs[Math.floor(Math.random()*numberFuncs.length)](dice.rollValue);
}

//function to read settings off page and apply them to the settings object
function readSettings(){
	for(var item in settings){
		if(typeof settings[item] === 'boolean'){
			settings[item] = document.getElementById(item).checked;
		} else {
			settings[item] = document.getElementById(item).value;
		}
	}

}
function initPage() {
	for(var item in settings){
		if(typeof settings[item] === 'boolean'){
			document.getElementById(item).checked = settings[item];
		} else {
			document.getElementById(item).value = settings[item];
		}
	}
	dice = new Dice();
	roll();
}

function tryAnswer(event) {
    if (event.keyCode == 13) {
        answerAttempt = document.getElementById('answerBox').value;
        if(answer == answerAttempt){
        	alert("correct!");
        	document.getElementById('answerBox').value = '';
        	roll();
        }
	}
}

function cheat(){
	document.getElementById("cheat").innerHTML= "Answer is "+answer;
}
function showKey(){
	document.getElementById("key").innerHTML= "Pay key:</br>"+payKey;
}	