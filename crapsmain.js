class Dice{
	constructor(){	
		this.die1 = undefined;
		this.die2 = undefined;
		this.dieFaces = ["⚀","⚁","⚂","⚃","⚄","⚅"]
		this.pointNums = [4,5,6,8,9,10]
		this.setNums = [true, true, true, true, true, true, true, true, true, true, true, true]
		this.alloutcomes = {
			                 //2
		                     11:[ceScenario, horn, hornHigh, redHops, crapcheck, highLowYo, highLow, threewaycraps],
		                     //3
			                 12:[ceScenario, horn, hornHigh, redHops, crapcheck, threewaycraps],
			                 21:[ceScenario, horn, hornHigh, redHops, crapcheck, threewaycraps],
			                 //easy 4
			                 13:[placeBet],
			                 31:[placeBet],
			                 //hard 4
			                 22:[placeBet, hardway],
			                 //5
		                     14:[placeBet],
		                     41:[placeBet],
		                     23:[placeBet],
		                     32:[placeBet],
		                     //easy 6
		                     15:[placeBet],
		                     51:[placeBet],
		                     24:[placeBet],
		                     42:[placeBet],
		                     //hard 6
		                     33:[placeBet, hardway],
		                     //7     
		                     16:[anyseven],
		                     61:[anyseven],
		                     25:[anyseven],
		                     52:[anyseven],
		                     34:[anyseven],
		                     43:[anyseven],
		                     //easy 8
		                     26:[placeBet],
		                     62:[placeBet],
		                     35:[placeBet],
		                     53:[placeBet],
		                     //hard 8
		                     44:[placeBet, hardway],
		                     //9
		                     36:[placeBet],
		                     63:[placeBet],
		                     45:[placeBet],
		                     54:[placeBet],
		                     //easy 10
		                     46:[placeBet],
		                     64:[placeBet],
		                     //hard 10
		                     55:[placeBet, hardway],
		                     //11
		                     56:[ceScenario, horn, hornHigh, redHops, highLowYo],
		                     65:[ceScenario, horn, hornHigh, redHops, highLowYo],
		                     //12
		                     66: [ceScenario, horn, hornHigh, redHops, crapcheck, highLowYo, highLow, threewaycraps]
		               }
		this.selectedOutcomes = undefined
		this.currentRoll = undefined
	}
	createSelectedOutcomes(){
		this.selectedOutcomes = {}
		for(let i=0; i < Object.keys(this.alloutcomes).length; i++){
			var key = Object.keys(this.alloutcomes)[i];
			var rollVal = parseInt(key.toString()[0])+parseInt(key.toString()[1]);
			//skip numbers that we have opted out of
			switch(rollVal){
				case 2:
					if(!settings['include2']){
						continue;
					}
						break;
				case 3:
					if(!settings['include3']){
						continue;
					}
					break;
				case 4:
					if(!settings['include4']){
						continue;
					}
					break;
				case 5:
					if(!settings['include5']){
						continue;
					}
					break;
				case 6:
					if(!settings['include6']){
						continue;
					}
					break;
				case 7:
					if(!settings['include7']){
						continue;
					}
					break;
				case 8:
					if(!settings['include8']){
						continue;
					}
					break;
				case 9:
					if(!settings['include9']){
						continue;
					}
					break;
				case 10:
					if(!settings['include10']){
						continue;
					}
					break;
				case 11:
					if(!settings['include11']){
						continue;
					}
					break;
				case 12:
					if(!settings['include12']){
						continue;
					}
					break;
			}
			//having skipped numbers we don't want, iterate functions on the numbers we do want and skip
			//the functions we do *not* want
			for(let j=0; j < this.alloutcomes[key].length; j++){
				switch(this.alloutcomes[key][j].name){
					case 'placeBet':
						if(!settings['includepb']){
							continue;
						}
						break;
					case 'hardway':
						if(!settings['includehw']){
							continue;
						}
						break;
					case 'horn':
						if(!settings['includehorn']){
							continue;
						}
						break;
					case 'hornHigh':
						if(!settings['includehornhigh']){
							continue;
						}
						break;
					case 'highLow':
						if(!settings['includepb']){
							continue;
						}
						break;
					case 'highLowYo':
						if(!settings['includepb']){
							continue;
						}
						break;
					case 'crapcheck':
						if(!settings['includece']){
							continue;
						}
						break;
					case 'anyseven':
						if(!settings['includeas']){
							continue;
						}
						break;
					}
				//we skipped the numbers we don't want and the functions we don't want. Add whatever is left.
				if(key in this.selectedOutcomes){
					this.selectedOutcomes[key].push(this.alloutcomes[key][j]);
				}
				else{
					this.selectedOutcomes[key]=[this.alloutcomes[key][j]];
				}
			}
		}
	}
	roll(){
		var keys = Object.keys(this.selectedOutcomes);
		this.currentRoll = keys[keys.length * Math.random() << 0];
		this.die1 = parseInt(this.currentRoll.toString()[0]);
		this.die2 = parseInt(this.currentRoll.toString()[1]);
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
	'pbMin':5,
	'pbMax':500,
	'include2': true,
	'include3': true,
	'include4': true,
	'include5': true,
	'include6': true,
	'include7': false,
	'include8': true,
	'include9': true,
	'include10': true,
	'include11': true,
	'include12': true,
	'includepb': true,
	'includehw': true,
	'includehorn': true,
	'includehornhigh': true,
	'includeredbets': true,
	'includece': true,
	'includeac': true,
	'includeas': true,
	'includehl': true,
	'includehly': true,
	'includetwc':true
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
	}
	setQA("High Low for "+bet, payout);
	payKey = "29:2, 14.5x (30:1 on 1/2 of the bet, minus a loser to keep up)</br>"
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
var funcsMenu = [
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

function functionFilter(func){
	/*
		'includepb': true,
	'includehw': true,
	'includehorn': true,
	'includehornhigh': true,
	'includeredbets': true,
	'includece': true,
	'includeac': true,
	'includeas': true,
	'includehl': true,
	'includehly': true,
	'includetwc':true*/
	if(func.name == 'placeBet'){
		return(settings['includepb'])
	}
	if(func.name == 'hardway'){
		return(settings['includehw'])
	}
	if(func.name == 'horn'){
		return(settings['includehorn'])
	}
	if(func.name == 'hornHigh'){
		return(settings['includehornhigh'])
	}
	if(func.name == 'redHops'){
		return(settings['includeredbets'])
	}
	if(func.name == 'ceScenario'){
		return(settings['includece'])
	}
	if(func.name == 'crapcheck'){
		return(settings['includeac'])
	}
	if(func.name == 'anyseven'){
		return(settings['includeas'])
	}
	if(func.name == 'highLow'){
		return(settings['includehl'])
	}
	if(func.name == 'highLowYo'){
		return(settings['includehly'])
	}
	if(func.name == 'threewaycraps'){
		return(settings['includetwc'])
	}

}
function roll() {
	readSettings();
	if(Object.keys(dice.selectedOutcomes).length == 0){
		alert("Impossible settings! no possible rolls to fulfill them.")
		return;
	}
	dice.roll();
	document.getElementById("dice").innerHTML = dice.displayDice;
	funcList = dice.selectedOutcomes[dice.currentRoll]
	funcList[Math.floor(Math.random()*funcList.length)](dice.rollValue);
	writeLocalStorage();
}

//function to read settings off page and apply them to the settings object
function readSettings(){
	var updateRequired = false;
	for(var item in settings){
		if(typeof settings[item] === 'boolean'){
			if(settings[item] != document.getElementById(item).checked){
				updateRequired = true;
			}
			settings[item] = document.getElementById(item).checked;
		} else {
			settings[item] = document.getElementById(item).value;
		}
	}
	if(updateRequired){
		dice.createSelectedOutcomes();
	}
}

//load settings from localstorage
function readLocalStorage(){
	for (var setting in settings){
		attempt = localStorage.getItem(setting);
		if(attempt !== null){
			if(attempt == "true"){
				settings[setting] = true;
			}
			else if(attempt == "false"){
				settings[setting] = false;
			}
			else{
				settings[setting] = attempt
			}
		}
	}
}

//write settings to localstorage
function writeLocalStorage(){
	for (var setting in settings){
		localStorage.setItem(setting, settings[setting]);

	}
}
function initPage() {
	readLocalStorage();

	for(var item in settings){
		if(typeof settings[item] === 'boolean'){
			document.getElementById(item).checked = settings[item];
		} else {
			document.getElementById(item).value = settings[item];
		}
	}
	dice = new Dice();
	dice.createSelectedOutcomes();
	roll();
}

function tryAnswer(event) {
    if (event.keyCode == 13) {
        answerAttempt = document.getElementById('answerBox').value;
        document.getElementById('answerBox').value = '';
        if(answer == answerAttempt){
        	document.getElementById("cheat").innerHTML= "Correct! Answer is "+answerAttempt
        	setTimeout(roll, 1750)
        } else {
        	document.getElementById("cheat").innerHTML = "Incorrect, answer is not "+answerAttempt
        }
	}
}

function setPoints(status){
	var points = ["include4","include5","include6","include8","include9","include10"]
	for(var point in points){
		document.getElementById(points[point]).checked = status;
	}
}
function setCrapYo(status){
	var points = ["include2","include3","include11","include12"]
	for(var point in points){
		document.getElementById(points[point]).checked = status;
	}
}

function cheat(){
	document.getElementById("cheat").innerHTML= "Answer is "+answer;
}
function showKey(){
	document.getElementById("key").innerHTML= "Pay key:</br>"+payKey;
}	