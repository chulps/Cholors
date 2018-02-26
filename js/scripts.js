function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
		}
	return color;
}

//lets simplify. break down into simplest-case functions and then compose them.
//lets make this guy do one job - he takes *one* td, and he sets a random color on it's background
//and puts the color hex in the html
function setRandomColor(td) {
  //this is going to set all td's in document to the same color because jquery's $().css(...)
  //applies the same provided properties to *all* elements the selctor returns, and $('td') will
  //return all td's in the doc.
  //lets just remove it
  //$("td").css("background-color", getRandomColor());
  var randomColor = getRandomColor();
  
  //note here that we are passing td, not 'td' - td here is the *actual* td element, which was a param
  //for setRandomColor(td)
  $(td).css('background-color', randomColor);
  $(td).html(randomColor);
  //we won't actually need any of this...
  //but declaring the var colorX here, and then directly changing colorX somewhere else in another
  //function (i.e. in hexc()) is a bad practice - it makes it unclear where the change is coming from.
  //this is called 'implicit side effect`, best to avoid it generally
  //var colorX = '';
	//$('td').html(function() {
  //  var x = $(this).css('backgroundColor');
  //  hexc(x);
  //  $("td").html(colorX);
  //})
  
  //just to show you, now that hexc() returns a value (see changes below), we'd do it like this:
	//$('td').html(function() {
  //  var x = $(this).css('backgroundColor');
  //  $("td").html(hexc(x));
  //}) 
}

function hexc(colorval) {
  var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete(parts[0]);
  for (var i = 1; i <= 3; ++i) {
    parts[i] = parseInt(parts[i]).toString(16);
    if (parts[i].length == 1) parts[i] = '0' + parts[i];
  }
  //try to avoid writing functions that change a variable outside of the function. instead, return a value
  //from the function, and assign/use that value where desired by calling this function from that place
  
  //colorX = '#' + parts.join('');
	return '#' + parts.join('');
}

var cnt = 1;

$("#anc_roll").click(function(){
	//.each will call the function passed to it once for *each* element that the $('td') selector gets 
	$("td").each(function() {
  	//here, `this` refers to the element this inner function is being called against
    //it's kind of weird, just a jquery quirk. we'll pass `this`, i.e. the td element,
    //to our setRandomColor() function that handles just a single td
  	setRandomColor(this);
	});
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
