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

var cnt = 1;

function hexc(colorval) {
  var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete(parts[0]);
  for (var i = 1; i <= 3; ++i) {
    parts[i] = parseInt(parts[i]).toString(16);
    if (parts[i].length === 1) parts[i] = '0' + parts[i];
  }
  //try to avoid writing functions that change a variable outside of the function. instead, return a value
  //from the function, and assign/use that value where desired by calling this function from that place
  
  //colorX = '#' + parts.join('');
	return '[' + cnt + '] - ' + '#' + parts.join('');
}



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




