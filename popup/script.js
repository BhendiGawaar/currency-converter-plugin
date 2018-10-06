
function getConversion(req){

	var fromSelect = document.getElementById("CURR_FR");
	var toSelect = document.getElementById("CURR_TO");
	
	var curr_fr = fromSelect.options[fromSelect.selectedIndex].value;
	var curr_to = toSelect.options[toSelect.selectedIndex].value;
	var curr_id = curr_fr+"_"+curr_to;
	localStorage.setItem('curr_id',curr_id);
	var url='http://free.currencyconverterapi.com/api/v6/convert?q='+curr_fr+'_'+curr_to+'&compact=y';
	//console.log(url);
	sendRequest(url,updateConversionHandler);
}

function updateConversionHandler(req){
	var txtResult = document.getElementById("CURR_VAL");
	var txtInput = document.getElementById("CURR_FR_VAL")
	var curr_id = localStorage.getItem('curr_id');
	var unit = JSON.parse(req.responseText)[curr_id].val;
	//console.log(unit);
	
    var currFrVal = parseFloat(txtInput.value);
    //txtResult.val = numeral(currFrVal * unit).format("0,0.00[0]");
    if(isNaN(currFrVal))
	   	txtResult.value = "Please enter valid Amount";
    else
	    txtResult.value = currFrVal * unit;
	
	localStorage.removeItem(curr_id);
}


function sendRequest(url, callback){
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.onreadystatechange = function()
		{
			if (req.readyState == 4 && req.status == 200) {
				callback(req);
			  }	
		};
	req.send();
}

function currencyListHandler(req) {
	var fromSelect = document.getElementById("CURR_FR");
	var toSelect = document.getElementById("CURR_TO");
	
	var currencyList = JSON.parse(req.responseText).results;
	
	for (var item in currencyList) {
		
		//console.log(currencyList[item].currencyName);
		option = document.createElement('option');
		option.setAttribute('value', currencyList[item].id);
		option.appendChild(document.createTextNode(currencyList[item].currencyName));
		fromSelect.appendChild(option);
		
		option2 = document.createElement('option');
		option2.setAttribute('value', currencyList[item].id);
		option2.appendChild(document.createTextNode(currencyList[item].currencyName));
		toSelect.appendChild(option2);
		}

}

function init(){//fetching list of currencies on init, too lazy to type ;)
	var txtResult = document.getElementById("CURR_VAL");
	sendRequest('https://free.currencyconverterapi.com/api/v6/currencies', currencyListHandler);
}

document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementById('btnConvert').addEventListener('click', getConversion);
	init();
});
