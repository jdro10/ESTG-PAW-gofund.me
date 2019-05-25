function seePassword() {
	var x = document.getElementById("confPass");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

function passwordMatch(){
	var pwo = document.getElementById('password');
	var pwc = document.getElementById('confPass');

	if(pwo.value !== pwc.value){
		alert('Passwords não coincidem!');
		pwc.value = "";
	}else{
		alert('Registo bem sucedido!');
	}
}

function redirectToCampaignForMe(){
	location.href = "/CampaignPageForMe";
}

function redirectToCampaignForFriend(){
	location.href = "/CampaignPageForFriend";
}

function redirectToCampaignForInst(){
	location.href = "/CampaignPageForInst";
}

function redirectToMenu(){
	location.href = "/LoginPage";
}

function redirectToUserPage(){
	location.href = "/userDetails";
}

function redirectToSearchPage(){
	location.href = "/searchDonations";
}

function getSearchValue(){
	var res = document.getElementById("search").value , url = "http://localhost:8080/searchDonations?name=" + encodeURIComponent(res);
	document.location.href = url;
}

function addTitle(){
	var index = location.href;

	if(index === "http://localhost:8080/CampaignPageForMe"){
		document.getElementById("mainTitle").innerHTML = "Fundraise for me";
	}
	else if(index === "http://localhost:8080/CampaignPageForFriend"){
		document.getElementById("mainTitle").innerHTML = "Fundraise for friend";
	}
	else if(index === "http://localhost:8080/CampaignPageForInst"){
		document.getElementById("mainTitle").innerHTML = "Fundraise for charity";
	}
}