var t1='';
function calender(arr){
	var me =this;
	var newDate = new Date();
	var currDate = newDate.getDate(),currDay  = newDate.getDay(),currMonth = newDate.getMonth(),temp = newDate.setDate(1);
	var currentDate = new Date(),d2 = Math.round(currentDate.getTime() / 1000);
	me.show =function(e){
	var e= e || window.event
	$n.stopPropagation(e)
	if(!me.contId){
		

		me.contId= arr.contId;
		me.tabClass= arr.tabClass;
		me.tabId= arr.tabId;
		var weekDays =['S','M','T','W','TH','F','S']
		var navArr=['&laquo;','&#60','','&#62','&raquo;'];
		//alert(navArr)
		var eventArr= ['me.prevYear','me.prevMonth','me.prevMonth','nextMonth','nextYear']
		me.obj = $n('<div>');		
		me.obj.css({'position' : 'absolute'});
		me.obj.attr('id',me.contId)
		me.obj.attr('class','test')
		var body =$n(document.body);
		body.append(me.obj.currObj());
		me.obj.hide();
		
		me.ul=$n('<ul>');
		for(k=0;k<5;k++){
			me.li=$n('<li>');
			me.li.html(navArr[k]);
			
			if(navArr[k]==''){
				me.li.addClass('yr nav')
			}
			else{me.li.addClass('nav')}
			me.ul.append(me.li.currObj());
		}
		me.obj.append(me.ul.currObj())
		me.li = $n('#'+me.obj.attr('id')+' li')
		me.li.eq(0).addEvent('click',me.prevYear)
		me.li.eq(1).addEvent('click',me.prevMonth)
		me.li.eq(3).addEvent('click',me.nextMonth)
		me.li.eq(4).addEvent('click',me.nextYear)
		me.tbs = $n('<table>');	
		var tbody = $n('<tbody>');	
		me.tbs.attr('cellspacing', '0');
		me.tbs.attr('id', me.tabId)
		me.tbs.addClass(me.tabClass)
		var row = $n("<tr>");
		tbody.append(row.currObj());
		for(m=0;m<7;m++){
			var th = $n("<th>");
			th.html(weekDays[m])
			row.append(th.currObj());
		}
		for(i=1;i<=6;i++){	//table created one time starts
			var row = $n("<tr>");
			for(j=0;j<7;j++){
				var td1 = $n("<td>");
				row.append(td1.currObj());
			}
			tbody.append(row.currObj());
		}
		me.tbs.append(tbody.currObj());
		me.obj.append(me.tbs.currObj())				//table created one time ends
		

		me.tbs.addEvent('click',function(e){			
			me.dateFiller(e)
		});

	}	
	

		me.currEl= arr.currEl;me.activeF=arr.activeF;me.activeB=arr.activeB;me.sep = arr.sep;me.format =arr.format;me.totalDays = arr.totalDays;me.parentCont= me.calenCont;me.display= me.li.eq(2);me.showDate = $n('#'+arr.showDate);me.monthArr = [31,28,31,30,31,30,31,31,30,31,30,31];me.monthName =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];me.Days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		endDate = new Date(),end = endDate.setDate(endDate.getDate()+me.totalDays),backDate = new Date(),
		endB = backDate.setDate(backDate.getDate()-me.totalDays);	
		me.contObj = me.obj;
		var pos=$n('#'+me.currEl).position();
		me.contObj.css({'left':pos.left+'px', 'top':pos.top +20+'px'});
		var	temp = me.obj;
		if(t1!==''&& t1!=me.obj)t1.hide();
		me.obj.toggle();
		t1 = temp;
		
		me.update(currMonth);	//populate calender		
		me.dateFiller=function(e){
			me.targ;
			me.e = !e ? window.event : e;
			var targ = (e.target) ? e.target : e.srcElement;
			var disp = $n('#'+me.tbs.attr('id')+' td')			
			me.targ = $n(targ);
			
			if(me.targ.hasClass('act') || me.targ.hasClass('currDate')){
				for(h=0;h<disp.length;h++){
					if(disp.eq(h).hasClass('currDate') =='currDate'){
						disp.eq(h).changeClass('act');
						me.targ.changeClass('currDate');

					}
				else{
					me.targ.changeClass('currDate');
				}
			}	 
			var yr = newDate.getFullYear(),dat = targ.innerHTML,mon = parseInt(newDate.getMonth()+1)
				if(me.format == 'ymd'){

					me.showDate.val( yr+ me.sep + mon + me.sep + dat)
					me.contObj.hide();
					
				}
				else if(me.format == 'mdy'){
					me.showDate.val(mon+ me.sep + dat +  me.sep + yr)
					me.showDate.setFocus();
					me.contObj.hide();
				}
				else if(me.format == 'dmy'){
					me.showDate.val(dat+ me.sep +mon+ me.sep +yr)
					me.contObj.hide();
				}
			}
		}
		
		
		
		document.onclick=function(e){
			
			if (!e) var e = window.event;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;
			while(targ.parentNode){
				targ = targ.parentNode;
				if(targ.id==me.contId)
						return false;
			}
			me.contObj.hide()						
		}
	}
	me.isLeap = function(year){								// check leap year
		if(year%400 ==0 || (year%100 != 0 && year%4 == 0)){
			return me.monthArr[1]=29;
		}
		else{
			return me.monthArr[1]=28;
		}
	}
	me.splitDate=function(dateObj){
		var dateObj = dateObj.toString();
		dateObj = dateObj.split(" ")
		return dateObj;
	}
	me.currDay=function(t){
		for(i=0;i<me.Days.length;i++){						// find day for 1 date of every month
			if(me.Days[i] == t[0]){
				return currDay  = i;
			}
		}
	}
	var demo = new Date()
	var d1 = Math.round(demo.getTime() / 1000);		
	me.update = function(currVal){
		var disp = $n('#'+me.obj.attr('id')+' td')		
		var t = me.splitDate(newDate);
		currDay = me.currDay(t);
		var mm = newDate.getMonth();
		var yrr = newDate.getFullYear();
		me.display.html(me.monthName[mm] + " " + newDate.getFullYear());								// display current month & year
		for(i=0;i<42;i++){																			// empty table to refill it starts
			disp.html("");																	// appy to all objects						
			disp.eq(i).changeClass('disable'); 						//  set class blank if already not set
		}	
/* empty table to refill it ends*/
		for(k=0;k<me.monthName.length;k++){						
			me.monthName[k] == t[1] ? currVal = k :''; 				
		}
			for(j=0;j<me.monthArr[currVal];j++){						//loop through month
			var d = demo.setDate(j+1);
			var d = demo.setMonth(currVal);
			var d = demo.setYear(newDate.getFullYear());		
			disp.eq(j+currDay).html(j+1);		
			var d1 = Math.round(demo.getTime() / 1000);		
			disp.eq(j+currDay).changeClass('act');
			if(me.activeF){
				disp.eq(j+currDay).changeClass('disable');
				if(demo>=currentDate){
					if(demo<=endDate){
						disp.eq(j+currDay).changeClass('act');
					}
				}
			}			
			if(me.activeB){
				disp.eq(j+currDay).changeClass('disable');
				demo<=currentDate ?(demo>=backDate ?disp.eq(j+currDay).changeClass('act'):''):'';		// keep dates active for 90 days
			}
			if(me.showDate.attr('value')!=''){
					var ddd = me.showDate.attr('value');
					ddd = ddd.split(me.sep)
					var yr = newDate.getDate()
					if(me.format =='mdy'){
						var dateIn = ddd[1];
						var MonIn = ddd[0];
						var YrIn = ddd[2];	
					}
					if(me.format == 'ymd'){
						var dateIn = ddd[2];
						var MonIn = ddd[1];
						var YrIn = ddd[0];	
					
					}
					else if(me.format == 'dmy'){
						var dateIn = ddd[1];
						var MonIn = ddd[0];
						var YrIn = ddd[2];	
					}
					if(MonIn == mm+1 && dateIn==disp.eq(j+currDay).html()&& YrIn == yrr){
						disp.eq(j+currDay).changeClass('currDate')
					}
			}
			else{
				if(disp.eq(j+currDay).html()==currentDate.getDate()){		
					var d1 = Math.round(demo.getTime() / 1000);		
					d1==d2 ? disp.eq(j+currDay).changeClass('currDate'):'';
				}
			}
		}
	}				
	me.nextMonth= function(){	
		var currMonth = newDate.getMonth();
		me.isLeap(newDate.getFullYear());
		newDate.setMonth(currMonth+1);
		currMonth = newDate.getMonth();					
		me.update(currMonth)
		var t = me.splitDate(newDate);
		currDay= me.currDay(t)			// getting a day for the 1st of the current month					
	}
	me.prevMonth= function(){	
		var currYear = newDate.getFullYear();
		me.isLeap(currYear);
		var currMonth = newDate.getMonth();
		newDate.setMonth(currMonth-1)
		currMonth = newDate.getMonth();		
		me.update(currMonth);
		var t = me.splitDate(newDate);
		currDay= me.currDay(t)			// getting a day for the 1st of the current month
	}
	me.nextYear =function(){
	var currMonth = newDate.getMonth();
		var currYr = newDate.getFullYear();
		newDate.setYear(currYr+1);	
		newDate.setMonth(currMonth);					
		currYr = newDate.getFullYear()
		var t = me.splitDate(newDate)
		me.display.html(t[1] + " " + t[3]);
		currYr = t[3]
		me.isLeap(currYr);
		me.update(currMonth)
	}
	me.prevYear =function(){
		var currMonth = newDate.getMonth();
		var currYr = newDate.getFullYear();
		newDate.setYear(currYr-1);	
		currYr = newDate.getFullYear();
		newDate.setMonth(currMonth);					
		var t = me.splitDate(newDate);
		me.display.html(t[1] + " " + t[3]);
		currYr = t[3]
		me.isLeap(currYr);
		me.update(currMonth)
	}


}