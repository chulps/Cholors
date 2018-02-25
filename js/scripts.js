$(document).ready(function(){

function getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++) {
color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

function setRandomColor() {
$("table").find("td").css("background-color", getRandomColor());
console.log(color);
}
	
	

var cnt = 1;

$("#anc_roll").click(function(){
	setRandomColor();
});

$("#anc_add").click(function(){
	$('#tbl1 tr').last().after('<tr><td style="background-color:' + getRandomColor() + '">' + getRandomColor() + '[' +cnt+ ']</td></tr>');
	cnt++;
});

$("#anc_rem").click(function(){
if($('#tbl1 tr').size()>1){
$('#tbl1 tr:last-child').remove();
}else{
alert('One row should be present in table');
}
});

});

