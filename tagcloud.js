function addSpan(){
	document.getElementById("container").innerHTML =""; //gets rid of previous cloud tags
	max = getMax();
	for(var i=0; i<uniq_arr.length; i++){
		document.getElementById("container").innerHTML += "<span style='font-size:"+(15+(Math.round((freq_arr[i]/max)*20)))+"pt' onclick='returnOccur()'>"+uniq_arr[i]+" </span>";
	}	
}


function getMax(){
	max=0;
	for(var i=0; i<freq_arr.length; i++){
		if(freq_arr[i]>max){
			max=freq_arr[i];
		}
	}
	return max;
}

function makeCloud(){
	mystr = document.getElementById("tags").innerHTML;
	words_arr = mystr.split(" ");
	
	words = mystr.split(" ").sort();
	
	uniq_arr = []; //contains unique tags
	freq_arr = []; //contains frequency of each tag, last step

	previous="";
	

	//loop through sorted words array
	//if current word is not the same as previous word, then add to uniq_arr and assign frequency 1 in parallel
	//otherwise, add one to the frequency of the word
	//assign current word as previous 
	for(var i=0; i<words.length; i++){ 
		if(words[i]!==previous){ 
			uniq_arr.push(words[i]);
			freq_arr.push(1);
		}
		else{ 
			freq_arr[freq_arr.length-1]++;
		}
		previous = words[i]; 
	}
	
	addSpan();
}


function saveCloud(){ //make cookie
	s = document.getElementById("tags").innerHTML; //get !!current!! textArea html
	
	cookiedate = new Date(2020,10,24,12);	
	document.cookie = "cname = "+s+"; expires = "+cookiedate.toUTCString();
	//alert(s);
	cookies = document.cookie;

	cookies_arr = document.cookie.split("; ");
	var cookie = cookies_arr[0]; //this cookie is "cname = blah blah blah"
	
	cookies_cont = cookie.split("="); //cookies_cont[1] is now the content of cookies separated by spaces
	//alert(cookies_cont[1]);
	
	cname = cookies_cont[0];
}

function getCookie(cname){
	var nameEQ = cname + "=";
	var ca = document.cookie.split(";");
	for(var i=0; i<ca.length; i++){
		var c = ca[i];
		while(c.charAt(0)==" ")
			c = c.substring(1,c.length);
		if(c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null; //if cookie is not found
}

function loadCloud(){ 
	//alert(cookies_cont[1]);
	cook = getCookie(cname); 
	document.getElementById("tags").innerHTML = cook;
	//alert(cook);
}

function clearArea(){
	document.getElementById("tags").innerHTML="";
}

function res(){
	var ta = document.getElementById("tags");
	if(ta.value=="" || ta.value != ta.defaultValue){
		ta.value = ta.defaultValue;
	}
}

function returnOccur(){
	e = event.target.innerHTML;
	te = e.trim(); 
	
	for(var i=0; i<uniq_arr.length; i++){
		if(uniq_arr[i]==te){
			alert(uniq_arr[i]+": "+ freq_arr[i]+" occurrences");
		}
	}
}
