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
   			var group=myCalendar[i]["group"];
   			var contentmodify=myCalendar[i]["description"]

   			var titleparse=myCalendar[i].ID.split('');
   			if(titleparse[0]==="C"){
   				var optionsmodify='';
		    	optionsmodify='<h3>Summary</h3>     <input type="text" name="title" id="title" value="'+myCalendar[i]["summary"]+'"/><br><br>';
		    	optionsmodify+='<h3>Lecturer</h3>     <select name="lecturermodify" id="lecturermodify"></select><br><br>';
		    	optionsmodify+='<h3>Start</h3><select name="start" id="startYearModify"></select><select name="start" id="startMonthModify"></select><select name="start" id="startDayModify"></select>-<select name="start" id="startHourModify"></select>h<select name="start" id="startMinModify"></select><br>'
		    	optionsmodify+='<h3>End</h3><select name="end" id="endYearModify"></select><select name="end" id="endMonthModify"></select><select name="end" id="endDayModify"></select>-<select name="end" id="endHourModify"></select>h<select name="end" id="endMinModify"></select><br>'
		    	optionsmodify+='<div id="locations"><h3>Location</h3><select name="locationmodify" id="locationmodify" onChange="selectRoomModify()"></select><span id="roomsmodify"></span></div>';
		    	optionsmodify+='<span id="students"><h3>Students</h3><select name="groupsmodify" id="groupsmodify"></select></span><br><br><br>'
		    	optionsmodify+='<h3>Notes</h3><textarea name="notes" id="contentmodify" rows="10" cols="50" required>'+contentmodify+'</textarea>'
		    	optionsmodify+='<input type="submit" onclick="modifyNewsfromJSON()" value="Modify" />';
		    }
   			if(titleparse[0]==="E"){
   				var optionsmodify='';
		    	optionsmodify='<h3>Summary</h3>     <input type="text" name="title" id="title" value="'+myCalendar[i]["summary"]+'"/><br><br>';
		    	optionsmodify+='<h3>Lecturer</h3><input type="text" name="lecturer" id="lecturerevent" required/><br><br>';
		    	optionsmodify+='<h3>Start</h3><select name="start" id="startYearModify"></select><select name="start" id="startMonthModify"></select><select name="start" id="startDayModify"></select>-<select name="start" id="startHourModify"></select>h<select name="start" id="startMinModify"></select><br>'
		    	optionsmodify+='<h3>End</h3><select name="end" id="endYearModify"></select><select name="end" id="endMonthModify"></select><select name="end" id="endDayModify"></select>-<select name="end" id="endHourModify"></select>h<select name="end" id="endMinModify"></select><br>'
		    	optionsmodify+='<div id="locations"><h3>Location</h3><select name="locationmodify" id="locationmodify" onChange="selectRoomModify()"></select><span id="roomsmodify"></span></div>';
		    	optionsmodify+='<span id="students"><h3>Students</h3><select name="yearstudymodify" id="yearstudymodify"></select><span id="parcoursmodify"></span><br><br>'
		    	optionsmodify+='<h3>Notes</h3><textarea name="notes" id="contentmodify" rows="10" cols="50" required>'+contentmodify+'</textarea>'
		    	optionsmodify+='<input type="submit" onclick="modifyNewsfromJSON()" value="Modify" />';
		    }
		    document.getElementById("CalendarforModify").innerHTML=optionsmodify
		    // updateDateModify(yearstart,monthstart,daystart,hourstart,minstart,yearend,monthend,dayend,hourend,minend);
		    // updateLocationModify(loc);
		    initmodifyCalendar(lect,yearstart,monthstart,daystart,hourstart,minstart,yearend,monthend,dayend,hourend,minend,loc,group,titleparse);
		}
	}
	// updateNewsDisplay();
}

function initmodifyCalendar(lect,yearstart,monthstart,daystart,hourstart,minstart,yearend,monthend,dayend,hourend,minend,loc,group,titleparse) {
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
	if (loc[0]===""){
		loc.splice(0,1,"Autre-Aucun");
	}
	for (var l in locations){
		var nameloc= locations[l].name;
		if (nameloc===loc[1] || nameloc===loc[0]){
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
		if (loc[1]===listbatmodify[l] || loc[0]===listbatmodify[l]){
			var html=' ';
		}
	}
	if (html!==' '){
			var html='<h3>Room</h3>     <input type="text" name="room" id="room" value="'+loc[0].substring(4)+'" required/>';
		}
		
	document.getElementById("roomsmodify").innerHTML=html;

	if (titleparse[0]==="E"){

	//création de la liste des années
	var yearselectmodify='';
	if (titleparse[1]==="0"){
		yearselectmodify+='<option value="All" selected>All</option>'
	}
	else{
		yearselectmodify+='<option value="All">All</option>'
	}
	if (titleparse[1]==="1"){
		yearselectmodify+='<option value="M1" selected>M1</option>'
	}
	else{
		yearselectmodify+='<option value="M1">M1</option>'
	}
	if (titleparse[1]==="2"){
		yearselectmodify+='<option value="M2" selected>M2</option>'
	}
	else{
		yearselectmodify+='<option value="M2">M2</option>'
	}
	document.getElementById("yearstudymodify").innerHTML+=yearselectmodify;

	//création de la liste des parcours
	var parselectmodify='';
	for (var g in parcours){
		var namepar= parcours[g].name;
		var typepar= parcours[g].value;
		parselectmodify +=' <input type="checkbox" name="'+namepar+'" id="'+namepar+'" value="'+typepar+'" checked /> <label for="'+namepar+'">'+namepar+'</label>';
		}
	document.getElementById("parcoursmodify").innerHTML+=parselectmodify;
	}

	if (titleparse[0]==="C"){
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

		//création de la liste des groupes
		var groupselectmodify='';
		
		for (var g in groups){
			var namegroup= groups[g].name;
			if (namegroup===group){
				groupselectmodify +='<option value="'+namegroup+'" selected>'+namegroup+'</option>';
			}
			else{
				groupselectmodify +='<option value="'+namegroup+'">'+namegroup+'</option>';
			}
		}
		document.getElementById("groupsmodify").innerHTML+=groupselectmodify;
	}
}



function selectRoomModify(){
	var locmodify=document.getElementById('locationmodify').value;
	for (var l=0;l<listbatmodify.length;l++){
		if (locmodify===listbatmodify[l]){
			var html=' ';
		}
	}
	if (html!==' '){
			var html='<h3>Room</h3>     <input type="text" name="room" id="room" required/>';
		}

	document.getElementById("roomsmodify").innerHTML=html;
}