function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
		}
	return color;
}


function setRandomColor(td) {
  
  var randomColor = getRandomColor();
  
  
  $(td).css('background-color', randomColor);
  $(td).html(randomColor);
  
}

var cnt = 1;

function hexc(colorval) {
  var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete(parts[0]);
  for (var i = 1; i <= 3; ++i) {
    parts[i] = parseInt(parts[i]).toString(16);
    if (parts[i].length === 1) parts[i] = '0' + parts[i];
  }
  
	return '[' + cnt + '] - ' + '#' + parts.join('');
}



$("#anc_roll").click(function(){
	
	$("td").each(function() {
  	
  	setRandomColor(this);
	});
});

$("#anc_add").click(function(){
	var color = getRandomColor();
	$('#tbl1 tr').last().after('<tr><td style="background-color:' + color + '">' + color + '</td></tr>');	
	cnt++;
});

						
								
								
						











$("#anc_rem").click(function(){
if($('#tbl1 tr').size()>1){
$('#tbl1 tr:last-child').remove();
}else{
alert('One row should be present in table');
}
	
});



$("#anc_auto").click(function(){
	setInterval(function() {
      $("td").each(function() {
  	setRandomColor(this);
	});

}, 2500);

});

$("#anc_stop").click(function(){
	    var found;
    for(i=0; i<10000; i++)
    {
        window.clearInterval(i);
    }

});

$("#anc_copy").click(function(){
	selectElementContents( document.getElementById('tbl1') );
	function selectElementContents(el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
		document.execCommand("Copy");
}	
	alert("Cholors copied!");

});




