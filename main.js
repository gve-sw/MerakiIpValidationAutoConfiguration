document.getElementById("btn").addEventListener('click', () => {


	function modifyDOM() {
	     const TOKEN = ''; //Fill with your Meraki organization token
             const ORGID = ;	//Fill with your Meraki organization id 	
	     //This block gets the ip pool from JSON file	
	     const url = chrome.runtime.getURL('iplist.json');
             let req = new XMLHttpRequest();
             req.open('GET', url, false);
	     req.send();
	     let iplist = JSON.parse(req.responseText).ip;
		 

             //Sends Meraki Api get request to get all IP that organisation has already assigned
	     let xhr = new XMLHttpRequest();
	     xhr.open('GET', 'https://api.meraki.com/api/v0/organizations/${ORGID}/deviceStatuses', false);
	     xhr.setRequestHeader('X-Cisco-Meraki-API-Key', TOKEN);
	     xhr.send();
             let res = xhr.responseText;
	     js = JSON.parse(res);

             //Finds the field on the Meraki Dashboard Interface Editor web page to fill Ip adress
	    let input = document.body.querySelector('[name="interface_ip"]');
	  
		
            //Finds which Ip adress from the IP pool is not assigned yet, fill the field with it
	    for(let i = 0; i < iplist.length; i++) {

	    	let flag = 0;
	    	for(let j = 0; j < js.length; j++){

	    		if(iplist[i] == js[j]["publicIp"]){
	    			flag = 1;
				}
			}
	    	if (flag == 0){
				input.value = iplist[i];
			}else{
	    		flag = 0;
			}

		}




		return document.body.innerHTML;
	}





	chrome.tabs.executeScript( { code: '(' + modifyDOM + ')();' }, (results) => { } );
});


