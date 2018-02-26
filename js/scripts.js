function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
		}
	return color;
}

function setRandomColor() {
	$("td").css("background-color", getRandomColor());
}

var cnt = 1;

$("#anc_roll").click(function(){
	setRandomColor();	
});

$("#anc_add").click(function(){
	var color = getRandomColor()
	$('#tbl1 tr').last().after('<tr><td style="background-color:' + color + '">' + '[' + cnt + '] - ' + color + '</td></tr>');
	cnt++;
});

$("#anc_rem").click(function(){
if($('#tbl1 tr').size()>1){
$('#tbl1 tr:last-child').remove();
}else{
alert('One row should be present in table');
}
	if($('#tbl1 tr').size()>1){
	$('#tbl1 tr:last-child').remove();
	}else{
	alert('There has to be at least one color');
	}
});
