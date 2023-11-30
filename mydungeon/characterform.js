var character = {
  	raceid : 4,
  	subraceid : 8,
}

var abilities = [
    "str",
    "dex",
    "con",
    "int",
    "wis",
    "cha"
]

function init() {
    var formContainer = document.createElement("form");
    formContainer.setAttribute("method","post");
    formContainer.setAttribute("action","submit.php");
    formContainer.id = "FormContainer";
    document.getElementById("Wrapper").appendChild(formContainer);
    
    document.addEventListener("click",SelectOption);
    
    document.getElementById("FormContainer").appendChild(Options(raceArray,"name",1,"race",false));
    for (var i = 1; i < raceArray.length + 1; i++) {
        document.getElementById("race/" + i).appendChild(Options(subraceArray,"name",2,"subrace",["raceid",i]));
    }
    
    document.getElementById("FormContainer").appendChild(Abilities());
}

function Options(array,nameindex,size,id,condition,title,source) {
    
    var optionContainer = document.createElement("div");
    optionContainer.classList = "optionContainer" + size;
    optionContainer.id = id;
    
    var number = 0;
    for (var i = 0; i < array.length; i++) {
        if (!condition || array[i][condition[0]] == condition[1]) {
            number += 1;

            var option = document.createElement("div");

            option.classList = id + " selectable option" + size;
            option.id = id + "/" + number;
            option.innerHTML = array[i][nameindex];

            optionContainer.appendChild(option);
        }
    }
    
    return optionContainer;
    
}

function SelectOption(e) {
    if (e.srcElement.classList.contains("selectable")) {
        var length = e.srcElement.parentElement.getElementsByClassName("selected").length;
        for (var i = 0; i < length; i++) {
            e.srcElement.parentElement.getElementsByClassName("selected")[0].classList.remove("selected");
        }
	  	length = e.srcElement.getElementsByClassName("selected").length;
	  	for (var i = 0; i < length; i++) {
            e.srcElement.parentElement.getElementsByClassName("selected")[0].classList.remove("selected");
        }
	  	if (e.srcElement.getElementsByClassName("selectable").length > 0) {
		  	e.srcElement.getElementsByClassName("selectable")[0].classList.add("selected");
		}
        e.srcElement.classList.toggle("selected");
    } else if (e.srcElement.classList.contains("abilitiesSwitch")) {
        var values = [character.abilities[e.srcElement.value],character.abilities[e.srcElement.value + 1]];
        character.abilities[e.srcElement.value] = values[1];
        character.abilities[e.srcElement.value + 1] = values[0]
    }
   	else if (e.srcElement.classList.contains("abilitiesReroll")) {
        rollAbilities();
    }
    UpdateStats();
}

function rollAbilities() {
  	character.abilities = [];
  	for (var i = 0; i < 6; i++) {
			var rolls = [];
	  	for (var ix = 0; ix < 4; ix++) {
		  	rolls.push(Math.ceil(Math.random() * 6));
	  	}
	  	rolls.sort(function(a, b){return a - b});
	  	rolls[0] = 0;
	  	var value = rolls[1] + rolls[2] + rolls[3];
	  	character.abilities.push(value);
  	}
}

function Abilities() {
    var abilitiesContainer = document.createElement("div");
    abilitiesContainer.classList = "abilitiesContainer";
    abilitiesContainer.id = "abilities";
    
    character.abilities = [];
    
    for (var i = 0; i < 11; i++) {
        var abilitiesColumn = document.createElement("div");
        
        if (i % 2 == 0) {
            
            abilitiesColumn.classList = "abilitiesColumn";
            abilitiesColumn.id = "abilitiesColumn" + i;
            
            var rolls = [];
            for (var ix = 0; ix < 4; ix++) {
                rolls.push(Math.ceil(Math.random() * 6));
            }
            rolls.sort(function(a, b){return a - b});
            rolls[0] = 0;
            var value = rolls[1] + rolls[2] + rolls[3];
            
            abilitiesColumn.innerHTML = abilities[i/2];
            
            var abilitiesValue = document.createElement("div");
            abilitiesValue.classList = "abilitiesValue";
            abilitiesValue.id = "abilities" + abilities[i/2];
            abilitiesValue.innerHTML = value;
            
            character.abilities.push(value);
		  	character.abilitiesExtra = [0,0,0,0,0,0];
		  
		  	abilitiesColumn.append(abilitiesValue);
		  
		  	var abilitiesElement = document.createElement("div");
	  		abilitiesElement.classList = "abilitiesSumModifier abilitiesElement";
	  		abilitiesElement.innerHTML = "+" + subraceArray[character.subraceid][abilities[i/2]];
	  	
	 		abilitiesColumn.append(abilitiesElement);
	  	
	  		var abilitiesElement2 = document.createElement("div");
	  		abilitiesElement2.classList = "abilitiesSum abilitiesElement";
	  		abilitiesElement2.innerHTML = character.abilities[i/2]*1 + (subraceArray[character.subraceid - 1][abilities[i/2]]*1 + raceArray[character.raceid - 1][abilities[i/2]]*1);
	  	
	 		abilitiesColumn.append(abilitiesElement2);
        
        } else {
            
            abilitiesColumn.classList = "abilitiesSwitch";
            abilitiesColumn.value = (i - 1) / 2;
            abilitiesColumn.id = "abilitiesSwitch" + (i - 1) / 2;
            abilitiesColumn.innerHTML = "-";
            
        }
        
        abilitiesContainer.appendChild(abilitiesColumn);
	  	
    }
  	var rerollButton = document.createElement("div");
    rerollButton.classList = "button1 abilitiesReroll";
  	rerollButton.innerHTML = "Reroll";
  	abilitiesContainer.appendChild(rerollButton);
    return abilitiesContainer;
}

function UpdateStats() {
    for (var i = 0; i < document.getElementsByClassName("race").length; i++) {
        if (document.getElementsByClassName("race")[i].classList.contains("selected")) {
            character.raceid = i + 1;
            break;
        }
    }
    for (var i = 0; i < document.getElementsByClassName("subrace").length; i++) {
        if (document.getElementsByClassName("subrace")[i].classList.contains("selected")) {
            character.subraceid = i + 1;
            break;
        }
    }
    for (var i = 0; i < document.getElementsByClassName("abilitiesValue").length; i++) {
        document.getElementsByClassName("abilitiesValue")[i].innerHTML = character.abilities[i];
    }
  	for (var i = 0; i < document.getElementsByClassName("abilitiesSumModifier").length; i++) {
        document.getElementsByClassName("abilitiesSumModifier")[i].innerHTML = 
		  "+" + 
		  (subraceArray[character.subraceid - 1][abilities[i]]*1 + raceArray[character.raceid - 1][abilities[i]]*1);
    }
  	character.abilitiesExtra = [0,0,0,0,0,0];
  	for (var i = 0; i < document.getElementsByClassName("abilitiesSum").length; i++) {
        document.getElementsByClassName("abilitiesSum")[i].innerHTML = character.abilities[i]*1 + subraceArray[character.subraceid - 1][abilities[i]]*1 + raceArray[character.raceid - 1][abilities[i]]*1;
	  	character.abilitiesExtra[i] += subraceArray[character.subraceid - 1][abilities[i]]*1 + raceArray[character.raceid - 1][abilities[i]]*1;
    }
}

init();