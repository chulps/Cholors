var cholors = []
var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

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
	$(td).html('[' + cnt + '] ' + '<span class="hexcode">' + randomColor + '</span><span class="x_controls"><span class="x_lock"><input type="checkbox" aria-label="..."> Lock</span><a href="javascript:void(0);" class="x_different">Different</a><a href="javascript:void(0);" class="x_copy">Copy</a><a href="javascript:void(0);" class="x_delete">X</a></span>');
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

$("#anc_roll").click(function () {
	$("td").each(function () {
		setRandomColor(this);
		cnt++
	});	
});

$("#anc_add").click(function () {
	var color = getRandomColor();
	$('#tbl1 tr').last().after('<tr><td style="background-color:' + color + '"> [' + cnt + '] ' +'<span class="hexcode">' + color + '</span><span class="x_controls"><span class="x_lock"><input type="checkbox" aria-label="..."> Lock</span><a href="javascript:void(0);" class="x_different">Different</a><a href="javascript:void(0);" class="x_copy">Copy</a><a href="javascript:void(0);" class="x_delete">X</a></span></td></tr>');
	cnt++;
});

$("#anc_rem").click(function () {
	if ($('#tbl1 tr').size() > 1) {
		$('#tbl1 tr:last-child').remove();
	} else {
		alert('One row should be present in table');
	}
});

$('#tbl1').on('click', '.x_delete', function(e){
   	if ($('#tbl1 tr').size() > 1) {
		$(this).closest('tr').remove();
		} else {
		alert('One row should be present in table');
	}
});

$('#tbl1').on('click', '.x_different', function(){
	$(this).closest('td').css("background-color", getRandomColor());	
});

$("#anc_auto").click(function () {
	setInterval(function () {
		$("td").each(function () {
			setRandomColor(this);
		});
	}, 2000);
});

$("#anc_stop").click(function () {
	var found;
	for (i = 0; i < 10000; i++) {
		window.clearInterval(i);
	}

});

$("#anc_copy").click(function () {
	selectElementContents( document.getElementsByClass('tbl1') );
	function selectElementContents(el) {
		var body = document.body,
			range, sel;
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
	alert("All Cholors copied to clipboard!");

});


