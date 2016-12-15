
var MainTable, Count, Pos1, Pos2, Min1i, Min2i, Parent, Binary, Lbl;



function Init(size) {

	MainTable = $("<table />");

	Pos1 = $("<tr />");
	Pos1.append("<td class='title'>pos1</td>");
	Pos2 = $("<tr />");
	Pos2.append("<td class='title'>pos2</td>");


	Count = $("<tr />");
	Count.append("<td class='title'>count</td>");
	Parent = $("<tr />");
	Parent.append("<td class='title'>parent</td>");
	Binary = $("<tr />");
	Binary.append("<td class='title'>binary</td>");
	Lbl = $("<tr />");
	Lbl.append("<td class='title'></td>");

	Min1i = $("<tr />");
	Min1i.append("<td class='title'>min1i</td>");
	Min2i = $("<tr />");
	Min2i.append("<td class='title'>min2i</td>");

	$.each([Pos1,Pos2,Count,Parent,Binary,Min1i,Min2i,Lbl], function() {
		var row = $(this);
		for (var i = 0; i < size; ++i) {
			var cell = $("<td />");
			cell.addClass("mem");
			if (i > size / 2 - 1) cell.addClass("ext");
			row.append(cell);
		}
		$(MainTable).append(row);
	});

	Binary.find("td:not(.title)").text('0');

	var i=0;
	Lbl.find("td:not(.title)").each(function() {
		$(this).text(i++);
		$(this).addClass('lbl');
	});

	$.each([Pos1, Pos2, Min1i, Min2i], function() {
		$(this).find("td:not(.title)").addClass('ptr');
	});

	$("#stage").append(MainTable);

	var controls = $("<div id='controls' />");
	var prev = $("<a href='javascript:void(0)' />");
	prev.text("prev");
	var reset = $("<a href='javascript:void(0)' />");
	reset.text("reset");
	var pause = $("<a href='javascript:void(0)' />");
	pause.text("pause");
	var play = $("<a href='javascript:void(0)' />");
	play.text("play");
	var next = $("<a href='javascript:void(0)' />");
	next.text("next");
	var end = $("<a href='javascript:void(0)' />");
	end.text("end");

	controls.append(prev);
	controls.append(reset);
	controls.append(pause);
	controls.append(play);
	controls.append(next);
	controls.append(end);

	prev.click(function() {
		Qprev();
	});
	reset.click(function() {
		Qreset();
	});
	pause.click(function() {
		Qpause();
	});
	play.click(function() {
		Qplay();
	});
	next.click(function() {
		Qnext();
	});
	end.click(function() {
		Qend();
	});

	$("#stage").append(controls);


}

function SetCount(idx, val, type) {
	switch (type) {
		case 0:
		case 1:
			Count.find("td:nth-child("+(idx+2)+")").text(val);
			Count.find("td:nth-child("+(idx+2)+")").text(val);
			break;
		case 2:
			queue(function() {
				Count.find("td:nth-child("+(idx+2)+")").text(val);
			});
			break;
	}
}
function SetParent(idx, val) {
	queue(function() {
		Parent.find("td:nth-child("+(idx+2)+")").text(val);
	});
}
function SetBinary(idx, val) {
	queue(function() {
		Binary.find("td:nth-child("+(idx+2)+")").text(val);
	});
}

function SetPos1(idx) {
	queue(function() {
		Pos1.find(".active").removeClass("active").text("");
		if (idx == -1) return;
		Pos1.find("td:nth-child("+(idx+2)+")").addClass("active").html("&darr;");
	});
}
function SetPos2(idx) {
	queue(function() {
		Pos2.find(".active").removeClass("active").text("");
		Pos2.find("td:nth-child("+(idx+2)+")").addClass("active").html("&darr;");
	});
}
function SetMin1i(idx) {
	queue(function() {
		Min1i.find(".active").removeClass("active").text("");
		Min1i.find("td:nth-child("+(idx+2)+")").addClass("active").html("&uarr;");
	});
}
function SetMin2i(idx) {
	queue(function() {
		Min2i.find(".active").removeClass("active").text("");
		Min2i.find("td:nth-child("+(idx+2)+")").addClass("active").html("&uarr;");
	});
}

function State(table) {
	this.mainTable = $("<table />");
	this.mainTable.html(table.html());
}

Q = [];
C = 0;
QT = false;
Playing = false;
function queue(f) {
 var state = new State(MainTable);
 Q.push(state);
 f()
}
function finishQ() {
 var state = new State(MainTable);
 Q.push(state);
 gotoState(0);
}
function gotoState(i) {
	var state = Q[i];
	MainTable.html(state.mainTable.html());
}
function Qplay() {
	Playing = true;
	nextQ();
}
function Qpause() {
	Playing = false;
	if (QT)
		clearTimeout(QT);
}
function Qreset() {
	Playing = false;
	C = 0;
	gotoState(0);
}
function Qnext() {
	if (C < Q.length - 1) {
	 C++;
	 gotoState(C);
	}
}
function Qprev() {
	 C--;
	 gotoState(C);
}
function Qend() {
	 Qpause();
	 C = Q.length - 1;
	 gotoState(C);
}
function nextQ() {
 QT = setTimeout(function() {
	 Qnext();
	 if (Playing && C < Q.length)
		 nextQ();
 }, 500);
}


$(document).ready(function() {
Init(19);
SetCount(0, 1, 0);
SetCount(1, 4, 0);
SetCount(2, 4, 0);
SetCount(3, 2, 0);
SetCount(4, 1, 0);
SetCount(5, 1, 0);
SetCount(6, 1, 0);
SetCount(7, 1, 0);
SetCount(8, 1, 0);
SetCount(9, '-', 1);
SetCount(10, '-', 1);
SetCount(11, '-', 1);
SetCount(12, '-', 1);
SetCount(13, '-', 1);
SetCount(14, '-', 1);
SetCount(15, '-', 1);
SetCount(16, '-', 1);
SetCount(17, '-', 1);
SetPos1(8)
SetPos2(9)
SetMin1i(8)
SetPos1(7)
SetMin2i(7)
SetPos1(6)
SetCount(9, 2, 2)
SetParent(8, 9)
SetParent(7, 9)
SetBinary(7, 1);

SetMin1i(6)
SetPos1(5)
SetMin2i(5)
SetPos1(4)
SetCount(10, 2, 2)
SetParent(6, 10)
SetParent(5, 10)
SetBinary(5, 1);

SetMin1i(4)
SetPos1(3)
SetMin2i(9)
SetPos2(10)
SetCount(11, 3, 2)
SetParent(4, 11)
SetParent(9, 11)
SetBinary(9, 1);

SetMin1i(10)
SetPos2(11)
SetMin2i(3)
SetPos1(2)
SetCount(12, 4, 2)
SetParent(10, 12)
SetParent(3, 12)
SetBinary(3, 1);

SetMin1i(11)
SetPos2(12)
SetMin2i(12)
SetPos2(13)
SetCount(13, 7, 2)
SetParent(11, 13)
SetParent(12, 13)
SetBinary(12, 1);

SetMin1i(2)
SetPos1(1)
SetMin2i(1)
SetPos1(0)
SetCount(14, 8, 2)
SetParent(2, 14)
SetParent(1, 14)
SetBinary(1, 1);

SetMin1i(0)
SetPos1(-1)
SetMin2i(13)
SetPos2(14)
SetCount(15, 8, 2)
SetParent(0, 15)
SetParent(13, 15)
SetBinary(13, 1);

SetMin1i(14)
SetPos2(15)
SetMin2i(15)
SetPos2(16)
SetCount(16, 16, 2)
SetParent(14, 16)
SetParent(15, 16)
SetBinary(15, 1);


finishQ();

});
