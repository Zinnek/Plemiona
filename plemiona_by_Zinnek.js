javascript:
doc = document;
if (window.frames.length > 0)
	doc = document.main;
	url = document.URL;
	var start = url.indexOf("village");
	var end = url.indexOf('%26', start);
	var id;
	if (end > 0)
		id = url.substring(start, end);
	else
		id = url.substring(start);
	if (url.indexOf('screen=overview_villages') == -1)
		location.search = '?screen=overview_villages&mode=prod&' + id;
	else {
		table = doc.getElementById("production_table");
		cell = table.rows[0].cells[1].innerHTML;
		if (cell.indexOf('">Wioska</a>') > -1) {
			var rowsy = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
			for (j = 1; j < rowsy; j++) {
				// Spichlerz
				innerHTML = table.rows[j].cells[3].innerHTML;
				res=innerHTML;
				res = res.replace('<span class="grey">.</span>', ' ');
				res = res.replace('<span class="grey">.</span>', ' ');
				res = res.replace('<span class="grey">.</span>', ' ');
				res = res.replace('<span class="res wood">', ' ');
				res = res.replace('<span class="res stone">', ' ');
				res = res.replace('<span class="res iron">', ' ');
				res = res.replace(/\s/g,'')
				res = res.split("</span>");
				if(res[2].slice(-1) == "<"){
					res[2] = res[2].slice(0,-1)
				}
				var max = Math.max.apply(Math,res);
				innerHTML = table.rows[j].cells[4].innerHTML;
				resmax=innerHTML;
				var resprocent = (max/resmax)*100;
				var resprocent_floor = Math.floor(resprocent);
				if(resprocent_floor < 50){
					var rescolor = '#4CAF50';
				}else{
					if(resprocent_floor < 70){
						var rescolor = '#FFD700';
					}else{
						if(resprocent_floor < 90){
							var rescolor = '#FF8C00';
						}else{
							var rescolor = '#FF4500';
						}
					}
				}
				table.rows[j].cells[4].innerHTML = '<div>' + resmax
				+'<div style="margin-top: 5px;color: #000!important;background-color: #f1f1f1!important;">'
					+'<div style="color: #000!important;background-color: ' + rescolor + '!important;text-align: center!important;width:' + resprocent + '%">' + resprocent_floor + '%</div></div>'
				+'</div>';
				// Zagroda
				innerHTML = table.rows[j].cells[6].innerHTML;
				zagr=innerHTML;
				zagr = zagr.split("/");
				if(zagr[1].slice(-1) == "<"){
					zagr[1] = zagr[1].slice(0,-1)
				}
				var procent = (zagr[0]/zagr[1])*100;
				var procent_floor = Math.floor(procent);
				var red = Math.floor((255*procent)/100);
				var green = Math.floor((255*(100-procent))/100);
				if(procent_floor < 50){
					var color = '#4CAF50';
				}else{
					if(procent_floor < 70){
						var color = '#FFD700';
					}else{
						if(procent_floor < 90){
							var color = '#FF8C00';
						}else{
							var color = '#FF4500';
						}
					}
				}
				table.rows[j].cells[6].innerHTML = '<div>' +zagr[0] + '/' + zagr[1] 
				+'<div style="margin-top: 5px;color: #000!important;background-color: #f1f1f1!important;">'
					+'<div style="color: #000!important;background-color: ' + color + '!important;text-align: center!important;width:' + procent + '%">' + procent_floor + '%</div></div>'
				+'</div>';
			}	
		}
	}
end();
