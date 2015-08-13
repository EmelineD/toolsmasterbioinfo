	var myNews;
	//fonction de recherche des éléments
	function initNews() {

	// var title=document.getElementById("title").value;
	// var intro=document.getElementById("intro").value;
	// var content=document.getElementById("content").value;

	var icons_name=[];
	var icons_type=[];
	for (var n in img){
		icons_name.push(img[n].name);
		icons_type.push(img[n].type)
	}
	for (var t in icons_name ){
		if(icons_type[t]=="biology"){
			var ident="biology";
		}
		else if(icons_type[t]=="teaching"){
			var ident="teaching";
		}
		else{
			var ident="misc";
		}
		document.getElementById(ident).innerHTML+='<input type="radio" name="imgident" value="' + t + '" id="' + icons_name[t] +'" class="imgselected" /> <img src="img/'+icons_name[t]+'_thumb.jpg">';
	}

	var date = new Date();
	var pday = ("0" + (date.getDate())).slice(-2);
	var pmonth = ("0" + (date.getMonth()+1)).slice(-2);
	var pyear = date.getFullYear().toString();

	document.getElementById("pubdate").innerHTML+='<input type="number" min="2015" max="2030" value="'+pyear+'" id="publiyear"/> <input type="number" min="1" max="12" value="'+pmonth+'" id="publimonth"/> <input type="number" min="1" max="31" value="'+pday+'" id="publiday" />';

	getNewsJSON();
	}

function getNewsJSON(){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
        	myNews = JSON.parse(xhr.responseText); // Données textuelles récupérées
	    		updateNewsDisplay(myNews);
    	}
		
	};
	// xhr.open("GET", "http://master-bioinfo-bordeaux.github.io/data/news.json", true);
	xhr.open("GET", "news_json.js", true);
	xhr.send(null);
}

function updateNewsDisplay() {
	document.getElementById("listForModify").innerHTML='';
	document.getElementById("listForDeletion").innerHTML='';
	  for(var n in myNews){
  		document.getElementById("listForModify").innerHTML+='<input type="radio" name="titlenewsmod" id="'+myNews[n]["title"]+'" class="titlenewsmod"/> <label for="'+myNews[n]["title"]+'">'+myNews[n]["title"]+'</label><br />'; 
  		document.getElementById("listForDeletion").innerHTML+='<input type="radio" name="titlenewsdel" id="'+myNews[n]["title"]+'" class="titlenewsdel"/> <label for="'+myNews[n]["title"]+'">'+myNews[n]["title"]+'</label><br />'; 
	}

}

function createNews(){

	var newNews={};

	var author=document.getElementById("author").value;
	newNews.title=document.getElementById("title").value;
	var intro=document.getElementById("intro").value;
	var content=document.getElementById("content").value;
	newNews.content=intro+'<-more->'+content;

  	var selectedimg = document.getElementsByClassName("imgselected");
	for (var i = 0; i< selectedimg.length; i++)
	{
	   if (selectedimg[i].checked){
	   	newNews.img=selectedimg[i].name;
	   }
	}

	var yearpubli=document.getElementById("publiyear").value;
	var monthpubli=document.getElementById("publimonth").value;
	var daypubli=document.getElementById("publiday").value;
	newNews.publidate=yearpubli+monthpubli+daypubli;

	var datecrea = new Date();
	var cday = ("0" + (datecrea.getDate())).slice(-2);
	var cmonth = ("0" + (datecrea.getMonth()+1)).slice(-2);
	var cyear = datecrea.getFullYear().toString();
	var chour = ("0" + (datecrea.getHours())).slice(-2);
	var cmin = ("0" + (datecrea.getMinutes())).slice(-2);
	var csec = ("0" + (datecrea.getSeconds())).slice(-2);
	var creadate = cyear+cmonth+cday+"T"+chour+cmin+csec;
	newNews.id = creadate+"@"+author;

	JSON.stringify(newNews);
	updateNewsDisplay();
}

function modifyNews(){
  		var nbtitles = document.getElementsByClassName("titlenewsmod");

		for (var i = 0; i< nbtitles.length; i++)
		{
		    if (nbtitles[i].checked)
		    {
		    	var content = myNews[i]["contents"].split('<!--more-->'); //à changer sur le json définitif
		    	console.log(content)
				document.getElementById("NewsforModify").innerHTML='<h3>Title</h3>     <input type="text" name="title" id="title" value="'+nbtitles[i].id+'"/><br><br>';
				document.getElementById("NewsforModify").innerHTML+='<h3>Introduction</h3>     <input type="text" name="intro" id="intro" value="'+content[0]+'"/><br><br>';
				document.getElementById("NewsforModify").innerHTML+='<h3>Content</h3><textarea name="content" id="content" rows="10" cols="50" >'+content[1]+'</textarea>';
				document.getElementById("NewsforModify").innerHTML+='<input type="submit" onclick="modifyNewsfromJSON()" value="Modify" />';
	        }
		}
		updateNewsDisplay();
}


function deleteNews(){
  		var nbtitles = document.getElementsByClassName("titlenewsdel");
		for (var i = 0; i< nbtitles.length; i++)
		{
		    if (nbtitles[i].checked)
		    {
		        myNews.splice(i,1);
	        }
		}
		getNewsJSON();
}







