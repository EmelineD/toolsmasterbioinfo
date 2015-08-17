var listUE7 = [];
var listidUE7= [];
var listUE8 = [];
var listidUE8= [];
var listUE9 = [];
var listidUE9= [];
var listUE10 = [];
var listidUE10= [];
var locTalence = [];
var locCarreire = [];
var listlect = [];
var listbat = [];
var listbatmodify = [];
var myCalendar;

function initCalendar() {
	//création des listes de cours
	var sem;
	var acro;
	var idue;
	for (var c in course_data){
		if (course_data[c].visibility==="visible"){
			acro=course_data[c].acronym;
			idue=course_data[c].id
			ue=idue+"-"+acro
			if (course_data[c].link){
				var link=course_data[c].link;
				sem=course_data[link].semester
				ue=idue;
			}
			else{
				sem=course_data[c].semester
			}
			if (sem == 7){
				listUE7.push(ue);
				listUE7.sort();
			}
			else if(sem == 8){
				listUE8.push(ue);
				listUE8.sort();
			}
			else if(sem == 9){
				listUE9.push(ue);
				listUE9.sort();
			}
			else if(sem == 10){
				listUE10.push(ue);
				listUE10.sort();
			}	
		}		
	}
	//création de la liste des professeurs
	var lectselect='';
	for (var lec in lecturers){
			var namelec= lecturers[lec].name;
			listlect.push(namelec)
	}
	listlect.sort();
	for (var llec in listlect){
		lectselect +='<option value="'+listlect[llec]+'">'+listlect[llec]+'</option>';
	}
	document.getElementById("lecturer").innerHTML+=lectselect;

	//remplissage des listes de dates
	var yearselect;
	var monthselect;
	var dayselect;
	var hourselect;
	var minselect;
	var year=[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
	for (var y=0;y<year.length;y++){
		yearselect+='<option value="'+year[y]+'">'+year[y]+'</option>';
	}

	var month=["01","02","03","04","05","06","07","08","09","10","11","12"];
	for (var mo=0;mo<month.length;mo++){
		monthselect+='<option value="'+month[mo]+'">'+month[mo]+'</option>';
	}
	var day=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
	for (var d=0;d<day.length;d++){
		dayselect+='<option value="'+day[d]+'">'+day[d]+'</option>';
	}
	var hour=["00","08","09","10","11","12","13","14","15","16","17","18","19"]
	for (var h=0;h<hour.length;h++){
		hourselect+='<option value="'+hour[h]+'">'+hour[h]+'</option>';
	}
	var minute=["00","15","30","45"]
	for (var min=0;min<minute.length;min++){
		minselect+='<option value="'+minute[min]+'">'+minute[min]+'</option>';
	}
	document.getElementById("startYearevent").innerHTML+=yearselect;
	document.getElementById("startMonthevent").innerHTML+=monthselect;
	document.getElementById("startDayevent").innerHTML+=dayselect;
	document.getElementById("startHourevent").innerHTML+=hourselect;
	document.getElementById("startMinevent").innerHTML+=minselect;
	document.getElementById("endYearevent").innerHTML+=yearselect;
	document.getElementById("endMonthevent").innerHTML+=monthselect;
	document.getElementById("endDayevent").innerHTML+=dayselect;
	document.getElementById("endHourevent").innerHTML+=hourselect;
	document.getElementById("endMinevent").innerHTML+=minselect;
	document.getElementById("startYear").innerHTML+=yearselect;
	document.getElementById("startMonth").innerHTML+=monthselect;
	document.getElementById("startDay").innerHTML+=dayselect;
	document.getElementById("startHour").innerHTML+=hourselect;
	document.getElementById("startMin").innerHTML+=minselect;
	document.getElementById("endYear").innerHTML+=yearselect;
	document.getElementById("endMonth").innerHTML+=monthselect;
	document.getElementById("endDay").innerHTML+=dayselect;
	document.getElementById("endHour").innerHTML+=hourselect;
	document.getElementById("endMin").innerHTML+=minselect;

	//mise à la date du jour
	var date = new Date();
	startYearevent.value=date.getFullYear().toString();
	startMonthevent.value=("0" + (date.getMonth()+1)).slice(-2);
	startDayevent.value=("0" + (date.getDate())).slice(-2);
	endYearevent.value=date.getFullYear().toString();
	endMonthevent.value=month[date.getMonth()];
	endDayevent.value=("0" + (date.getDate())).slice(-2);
	startYear.value=date.getFullYear().toString();
	startMonth.value=("0" + (date.getMonth()+1)).slice(-2);
	startDay.value=("0" + (date.getDate())).slice(-2);
	endYear.value=date.getFullYear().toString();
	endMonth.value=month[date.getMonth()];
	endDay.value=("0" + (date.getDate())).slice(-2);

	//création de la liste des lieux
	var locselect='';
	for (var l in locations){
		var nameloc= locations[l].name;
		locselect +='<option value="'+nameloc+'">'+nameloc+'</option>';
		if(locations[l].type !=="bat"){
			listbat.push(nameloc);
		}
	}
	document.getElementById("location").innerHTML+=locselect;
	document.getElementById("locationevent").innerHTML+=locselect;

	//création de la liste des groupes
	var groupselect='';
	for (var g in groups){
		for (var n=0;n<groups[g].length;n++){
			var namegroup= groups[g][n].name;
			groupselect +='<option value="'+namegroup+'">'+namegroup+'</option>';
		}
	}
	document.getElementById("groups").innerHTML+=groupselect;

	//création de la liste des parcours
	var parselect='';
	for (var g in parcours){
		for (var n=0;n<parcours[g].length;n++){
			var namepar= parcours[g][n].name;
			var typepar= parcours[g][n].value;
			parselect +=' <input type="checkbox" name="'+namepar+'" id="'+namepar+'" value="'+typepar+'" /> <label for="'+namepar+'">'+namepar+'</label>';
		}
	}	
	document.getElementById("parcours").innerHTML+=parselect;
	getCalendarJSON();
}

function getCalendarJSON(){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
        	myCalendar = JSON.parse(xhr.responseText); // Données textuelles récupérées
	    		updateCalendarDisplay(myCalendar);
    	}
		
	};
	xhr.open("GET", "src/calendar_json.js", true);
	xhr.send(null);
}

function updateCalendarDisplay() {
	document.getElementById("listForModifycal").innerHTML='';
	document.getElementById("listForDeletioncal").innerHTML='';
	var listmodify='';
	  for(var n in myCalendar){
  		listmodify+='<input type="radio" name="titlecalmod" id="'+myCalendar[n]["summary"]+'-'+myCalendar[n]["date_start"]+'-'+myCalendar[n]["date_end"]+'" class="titlecalmod"/> <label for="'+myCalendar[n]["summary"]+'-'+myCalendar[n]["date_start"]+'-'+myCalendar[n]["date_end"]+'">'+myCalendar[n]["summary"]+'-'+myCalendar[n]["date_start"]+'-'+myCalendar[n]["date_end"]+'</label><br />'; 
  		// document.getElementById("listForDeletion").innerHTML+='<input type="radio" name="titlenewsdel" id="'+myNews[n]["title"]+'" class="titlenewsdel"/> <label for="'+myNews[n]["title"]+'">'+myNews[n]["title"]+'</label><br />'; 
	}
	document.getElementById("listForModifycal").innerHTML+=listmodify;
}

function selectUE(){
	var sem=document.getElementById('semester').value;
	sem=parseInt(sem);
	var listUE;
	if (sem == 7){
		listUE=listUE7;
	}
	else if(sem == 8){
		listUE=listUE8;
	}
	else if(sem == 9){
		listUE=listUE9;
	}
	else if(sem == 10){
		listUE=listUE10;
	}
	var html ='<h3>UE</h3>     <select name="uesemester" id="uesemester"">';
	for (var m=0;m<listUE.length;m++){
		html += '<option value="'+listUE[m]+'">'+listUE[m]+'</option>';
	}
	html += '</select>';
	document.getElementById("ue").innerHTML = html;
}

function selectRoom(){
	var loc=document.getElementById('location').value;
	for (var l=0;l<listbat.length;l++){
		if (loc===listbat[l]){
			var html=' ';
		}
		else{
			var html='<h3>Room</h3>     <input type="text" name="room" id="room" required/>';;
		}
		document.getElementById("rooms").innerHTML=html;
	}
}

function selectRoomEvent(){
	var loc=document.getElementById('locationevent').value;
	for (var l=0;l<listbat.length;l++){
		if (loc===listbat[l]){
			var html=' ';
		}
		else{
			var html='<h3>Room</h3>     <input type="text" name="roomevent" id="roomevent" required/>';;
		}
		document.getElementById("roomsevent").innerHTML=html;
	}
}

function createCalendarCourse(){

	var newCourse={};

	//création de l'ID
		//extraction de l'année (M1 ou M2) via le semestre
		var sem=document.getElementById("semester").value;
		if (sem===7 || sem===8){
			var year=1;
		}
		else{
			var year=2;
		}
		//extraction de l'auteur de la news (à changer par utilisateur GitHub)
		var author=document.getElementById("author").value;
		//extraction de la date de création
		var datecrea = new Date();
		var cday = ("0" + (datecrea.getDate())).slice(-2);
		var cmonth = ("0" + (datecrea.getMonth()+1)).slice(-2);
		var cyear = datecrea.getFullYear().toString();
		var chour = ("0" + (datecrea.getHours())).slice(-2);
		var cmin = ("0" + (datecrea.getMinutes())).slice(-2);
		var csec = ("0" + (datecrea.getSeconds())).slice(-2);
		var creadate = cyear+cmonth+cday+"T"+chour+cmin+csec;
		//extraction de la somme des valeurs des parcours ayant ce cours
	var summary=document.getElementById("uesemester").value; //extraction de l'UE entière
	var ue= summary.split("-"); //séparation pour obtenir l'ID et l'acronyme de l'UE 
	var stu= course_data[ue[0]].students; //sauvegarde de l'ID puis recherche des étudiants pour cette UE
	var stusplit = stu.split(","); //séparation des différents groupes
	var parc=[];
	for (var i in stusplit){
		var parca = stusplit[i].split("[");	
		parc.push(parca[0]); //récupération des noms de groupes seuls
	}
	var sum=0;
	for(var p in parc){
		console.log(p);
		sum=sum+parcours["Parcours"][p].value; //addition des valeurs des groupes
	}
	var sumsum=(sum.toString(16))
	if (sumsum==="f"){
		sumsum="F" //passage de la valeur en hexadecimal
	}
		//ajout dans l'objet de l'ID et du summary
		newCourse.id = "C"+year+sumsum+creadate+"@"+author;
		newCourse.summary=summary

	//extraction de la date de début et de la date de fin du cours
	var yearstart=document.getElementById("startYear").value;
	var monthstart=document.getElementById("startMonth").value;
	var daystart=document.getElementById("startDay").value;
	var hourstart=document.getElementById("startHour").value;
	var minstart=document.getElementById("startMin").value;
	if ((hourstart===00 && minstart===00) || (allday.checked) ){
		var hourstart="00";
		var minstart="00";
		var yearend=yearstart;
		var monthend=monthstart;
		var dayend=daystart;
		var hourend=23;
		var minend=59;
	}
	else{
		var yearend=document.getElementById("endYear").value;
		var monthend=document.getElementById("endMonth").value;
		var dayend=document.getElementById("endDay").value;
		var hourend=document.getElementById("endHour").value;
		var minend=document.getElementById("endMin").value;		
	}
	newCourse.date_start=yearstart+monthstart+daystart+"T"+hourstart+minstart;
	newCourse.date_end=yearend+monthend+dayend+"T"+hourend+minend;

	//extraction des groupes d'étudiants concernés (hors parcours)
	newCourse.group=document.getElementById("groups").value;

	//extracteur du professeur 
	newCourse.lecturer=document.getElementById("lecturer").value;

	//extraction du lieu du cours
	var bat=document.getElementById("location").value;
	if (locations[bat].type!=="bat"){
		newCourse.location=bat;
	}
	else{
		var room=document.getElementById("room").value;
		newCourse.location="room"+room+"@"+bat;
	}

	//extraction de la description du cours
	newCourse.description=document.getElementById("content").value;

	//passage de l'objet js en JSON
	JSON.stringify(newCourse);

}

function createCalendarEvent(){

	var newEvent={};

	//création de l'ID
		//extraction de l'auteur de l'event (à remplacer par l'utilisateur GitHub)
		var author=document.getElementById("authorevent").value;
		//extraction de la date de création
		var datecrea = new Date();
		var cday = ("0" + (datecrea.getDate())).slice(-2);
		var cmonth = ("0" + (datecrea.getMonth()+1)).slice(-2);
		var cyear = datecrea.getFullYear().toString();
		var chour = ("0" + (datecrea.getHours())).slice(-2);
		var cmin = ("0" + (datecrea.getMinutes())).slice(-2);
		var csec = ("0" + (datecrea.getSeconds())).slice(-2);
		var creadate = cyear+cmonth+cday+"T"+chour+cmin+csec;
		//extraction de l'année concernée (M1 ou M2)
		var year = document.getElementById("yearstudy").value;
		//extraction des parcours concernés
		var sum=0;
	var checkboxes = document.getElementById("parcours").getElementsByTagName("input"); //extraction des différents input de l'ID (ici que checkboxes)
	for (var i = 0, iMax = checkboxes.length; i < iMax; ++i) {
   		var check = checkboxes[i]; //séparation de chacune des checkboxes
   		if (check.type == "checkbox" && check.checked) {
   			sumnum=parseInt(check.value) 
   			sum=sum+sumnum; //si coché, extraction de la valeur du parcours puis addition de cette valeur avec la somme des précédentes
   		}
   	}
	var sumsum=(sum.toString(16)) //passage en hexadécimal
	if (sumsum==="f"){
		sumsum="F" 
	}
		//creation de l'ID à partir des données extraites
		newEvent.id = "E"+year+sumsum+creadate+"@"+author;

	//extraction du titre
	newEvent.summary=document.getElementById("summaryevent").value;

	//extraction de la date de début et de fin de l'event
	var yearstart=document.getElementById("startYearevent").value;
	var monthstart=document.getElementById("startMonthevent").value;
	var daystart=document.getElementById("startDayevent").value;
	var hourstart=document.getElementById("startHourevent").value;
	var minstart=document.getElementById("startMinevent").value;
	if ((hourstart===00 && minstart===00) || (allday.checked) ){
		var hourstart="00";
		var minstart="00";
		var yearend=yearstart;
		var monthend=monthstart;
		var dayend=daystart;
		var hourend=23;
		var minend=59;
	}
	else{
		var yearend=document.getElementById("endYearevent").value;
		var monthend=document.getElementById("endMonthevent").value;
		var dayend=document.getElementById("endDayevent").value;
		var hourend=document.getElementById("endHourevent").value;
		var minend=document.getElementById("endMinevent").value;		
	}
	newEvent.date_start=yearstart+monthstart+daystart+"T"+hourstart+minstart;
	newEvent.date_end=yearend+monthend+dayend+"T"+hourend+minend;

	//extraction de la personne faisant l'événement
	newEvent.lecturer=document.getElementById("lecturerevent").value;

	//extraction du lieu 
	var bat=document.getElementById("locationevent").value;
	if (locations[bat].type!=="bat"){
		newEvent.location=bat;
	}
	else{
		var room=document.getElementById("room").value;
		newEvent.location="room"+room+"@"+bat;
	}

	//extraction de la description
	newEvent.description=document.getElementById("contentevent").value;

	//extraction des étudiants concernés
		//extraction de l'année concernée
		newEvent.year=document.getElementById("yearstudy").value;
		//extraction du(des) parcours concerné(s)
	var checkboxes = document.getElementById("parcours").getElementsByTagName("input");//extraction des différents input de l'ID (ici que checkboxes)
	var partot=[];
	for (var i = 0, iMax = checkboxes.length; i < iMax; ++i) {
  		var check = checkboxes[i]; //séparation de chacune des checkboxes
  		if (check.type == "checkbox" && check.checked) {
  			partot.push(check.name);
  		}
  	}
  	newEvent.students=partot.toString();

   	//extraction de l'obligation ou non d'assister à l'event
   	newEvent.presence=document.getElementById("choice").value;

   	console.log(newEvent);

   	JSON.stringify(newEvent);
   }

function modifyCalendar(){
   	var nbtitles = document.getElementsByClassName("titlecalmod");
   	for (var i = 0; i<= nbtitles.length; i++)
   	{
   		if (nbtitles[i].checked)
   		{
   			var yearstart=myCalendar[i].date_start.substring(0,4);
   			var monthstart=myCalendar[i].date_start.substring(4,6);
   			var daystart=myCalendar[i].date_start.substring(6,8);
   			var hourstart="00";
   			var minstart="00";
   			if (myCalendar[i].date_start.charAt(8)==="T"){
   				daystart=myCalendar[i].date_start.substring(6,8);
   				hourstart=myCalendar[i].date_start.substring(9,11);	
   				minstart=myCalendar[i].date_start.substring(11);
   			}
   			var yearend=myCalendar[i].date_end.substring(0,4);
   			var monthend=myCalendar[i].date_end.substring(4,6);
   			var dayend=myCalendar[i].date_end.substring(6,8);
   			var hourend="00";
   			var minend="00";
   			if (myCalendar[i].date_end.charAt(8)==="T"){
   				dayend=myCalendar[i].date_end.substring(6,8);
   				hourend=myCalendar[i].date_end.substring(9,11);	
   				minend=myCalendar[i].date_end.substring(11)
   			}
   			var loc=myCalendar[i].location.split('@');
   			var lect=myCalendar[i]["lecturer"];

   			var titleparse=myCalendar[i].ID.split('');
   			if(titleparse[0]==="C"){
   				var optionsmodify='';
		    	optionsmodify='<h3>Summary</h3>     <input type="text" name="title" id="title" value="'+myCalendar[i]["summary"]+'"/><br><br>';
		    	optionsmodify+='<h3>Lecturer</h3>     <select name="lecturermodify" id="lecturermodify"></select><br><br>';
		    	optionsmodify+='<h3>Start</h3><select name="start" id="startYearModify"></select><select name="start" id="startMonthModify"></select><select name="start" id="startDayModify"></select>-<select name="start" id="startHourModify"></select>h<select name="start" id="startMinModify"></select><br>'
		    	optionsmodify+='<h3>End</h3><select name="end" id="endYearModify"></select><select name="end" id="endMonthModify"></select><select name="end" id="endDayModify"></select>-<select name="end" id="endHourModify"></select>h<select name="end" id="endMinModify"></select><br>'
		    	optionsmodify+='<div id="locations"><h3>Location</h3><select name="locationmodify" id="locationmodify" onChange="selectRoomModify()"></select><span id="roomsmodify"></span></div>';
		    	optionsmodify+='<input type="submit" onclick="modifyNewsfromJSON()" value="Modify" />';
		    }
		    document.getElementById("CalendarforModify").innerHTML=optionsmodify
		    // updateDateModify(yearstart,monthstart,daystart,hourstart,minstart,yearend,monthend,dayend,hourend,minend);
		    // updateLocationModify(loc);
		    initmodifyCalendar(lect,yearstart,monthstart,daystart,hourstart,minstart,yearend,monthend,dayend,hourend,minend,loc);
		}
	}
	// updateNewsDisplay();
}

function initmodifyCalendar(lect,yearstart,monthstart,daystart,hourstart,minstart,yearend,monthend,dayend,hourend,minend,loc) {
	//remplissage des lecturers
	var lectselect='';
	for (var llec in listlect){
		if (listlect[llec]===lect){
			lectselect +='<option value="'+listlect[llec]+'" selected>'+listlect[llec]+'</option>';
		}
		else{
		lectselect +='<option value="'+listlect[llec]+'">'+listlect[llec]+'</option>';
		}
	}
	document.getElementById("lecturermodify").innerHTML+=lectselect;

	//remplissage des listes de dates
	var yearselectstart;
	var monthselectstart;
	var dayselectstart;
	var hourselectstart;
	var minselectstart;
	var yearselectend;
	var monthselectend;
	var dayselectend;
	var hourselectend;
	var minselectend;

	var year=["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"]
	for (var y=0;y<year.length;y++){
		if (year[y]===yearstart){
			yearselectstart+='<option value="'+year[y]+'" selected>'+year[y]+'</option>';
		}
		else {
			yearselectstart+='<option value="'+year[y]+'">'+year[y]+'</option>';
		}
		if (year[y]===yearend){
			yearselectend+='<option value="'+year[y]+'" selected>'+year[y]+'</option>';
		}
		else{
			yearselectend+='<option value="'+year[y]+'">'+year[y]+'</option>';
		}
	}

	var month=["01","02","03","04","05","06","07","08","09","10","11","12"];
	for (var mo=0;mo<month.length;mo++){
		if (month[mo]===monthstart){
			monthselectstart+='<option value="'+month[mo]+'" selected>'+month[mo]+'</option>';
		}
		else{
			monthselectstart+='<option value="'+month[mo]+'">'+month[mo]+'</option>';
		}
		if (month[mo]===monthend){
			monthselectend+='<option value="'+month[mo]+'" selected>'+month[mo]+'</option>';
		}
		else{
			monthselectend+='<option value="'+month[mo]+'">'+month[mo]+'</option>';
		}
	}

	var day=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
	for (var d=0;d<day.length;d++){
		if (day[d]===daystart){
			dayselectstart+='<option value="'+day[d]+'" selected>'+day[d]+'</option>';
		}
		else {
			dayselectstart+='<option value="'+day[d]+'">'+day[d]+'</option>';
		}
		if (day[d]===dayend){
			dayselectend+='<option value="'+day[d]+'" selected>'+day[d]+'</option>';
			}
		else {
			dayselectend+='<option value="'+day[d]+'">'+day[d]+'</option>';
		}
	}

	var hour=["00","08","09","10","11","12","13","14","15","16","17","18","19"]
	for (var h=0;h<hour.length;h++){
		if (hour[h]===hourstart){
			hourselectstart+='<option value="'+hour[h]+'" selected>'+hour[h]+'</option>';
		}
		else{
			hourselectstart+='<option value="'+hour[h]+'">'+hour[h]+'</option>'
		}
		if (hour[h]===hourend){
			hourselectend+='<option value="'+hour[h]+'" selected>'+hour[h]+'</option>';
		}
		else{
			hourselectend+='<option value="'+hour[h]+'">'+hour[h]+'</option>';
		}
	}
	var minute=["00","15","30","45"]
	for (var min=0;min<minute.length;min++){
		if (minute[min]===minstart){
			minselectstart+='<option value="'+minute[min]+'" selected>'+minute[min]+'</option>';
		}
		else{
			minselectstart+='<option value="'+minute[min]+'">'+minute[min]+'</option>';
		}
		if (minute[min]===minend){
			minselectend+='<option value="'+minute[min]+'" selected>'+minute[min]+'</option>';
		}
		else{
			minselectend+='<option value="'+minute[min]+'">'+minute[min]+'</option>';
		}
	}
	document.getElementById("startYearModify").innerHTML+=yearselectstart;
	document.getElementById("startMonthModify").innerHTML+=monthselectstart;
	document.getElementById("startDayModify").innerHTML+=dayselectstart;
	document.getElementById("startHourModify").innerHTML+=hourselectstart;
	document.getElementById("startMinModify").innerHTML+=minselectstart;
	document.getElementById("endYearModify").innerHTML+=yearselectend;
	document.getElementById("endMonthModify").innerHTML+=monthselectend;
	document.getElementById("endDayModify").innerHTML+=dayselectend;
	document.getElementById("endHourModify").innerHTML+=hourselectend;
	document.getElementById("endMinModify").innerHTML+=minselectend;

	//création de la liste des lieux
	var locselectmodify='';
	for (var l in locations){
		var nameloc= locations[l].name;
		if (nameloc===loc[1]){
			locselectmodify +='<option value="'+nameloc+'" selected>'+nameloc+'</option>';
		}
		else{
		locselectmodify +='<option value="'+nameloc+'">'+nameloc+'</option>';
		}
		if(locations[l].type !=="bat"){
			listbatmodify.push(nameloc);
		}
	}
	document.getElementById("locationmodify").innerHTML+=locselectmodify;
	for (var l=0;l<listbatmodify.length;l++){
		if (loc[1]===listbatmodify[l]){
			var html=' ';
		}
		else{
			var html='<h3>Room</h3>     <input type="text" name="room" id="room" value="'+loc[0].substring(4)+'" required/>';
		}
	}
	document.getElementById("roomsmodify").innerHTML=html;


	// //création de la liste des groupes
	// var groupselect='';
	// for (var g in groups){
	// 	for (var n=0;n<groups[g].length;n++){
	// 		var namegroup= groups[g][n].name;
	// 		groupselect +='<option value="'+namegroup+'">'+namegroup+'</option>';
	// 	}
	// }
	// document.getElementById("groups").innerHTML+=groupselect;

	// //création de la liste des parcours
	// var parselect='';
	// for (var g in parcours){
	// 	for (var n=0;n<parcours[g].length;n++){
	// 		var namepar= parcours[g][n].name;
	// 		var typepar= parcours[g][n].value;
	// 		parselect +=' <input type="checkbox" name="'+namepar+'" id="'+namepar+'" value="'+typepar+'" /> <label for="'+namepar+'">'+namepar+'</label>';
	// 	}
	// }	
	// document.getElementById("parcours").innerHTML+=parselect;
	// getCalendarJSON();
}



function selectRoomModify(){
	var locmodify=document.getElementById('locationmodify').value;
	for (var l=0;l<listbatmodify.length;l++){
		if (locmodify!==listbatmodify[l]){
			var html='<h3>Room</h3>     <input type="text" name="room" id="room" required/>';
		}
		else{
			var html=' ';
		}
		console.log(html);
	}
	document.getElementById("roomsmodify").innerHTML=html;
}

function deleteNews(){
  		var nbtitles = document.getElementsByClassName("titlecaldel");
		for (var i = 0; i< nbtitles.length; i++)
		{
		    if (nbtitles[i].checked)
		    {
		        myCalendar.splice(i,1);
	        }
		}
		getCalendarJSON();
}
