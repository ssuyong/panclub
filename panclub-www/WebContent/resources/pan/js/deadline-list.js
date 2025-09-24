var today = new Date();
let yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000)); // 2년전부 오늘까지


var datepicker1 = new tui.DatePicker('#wrapper1', {
	//date: new Date(),
	language: 'ko',
	//date: new Date(),
	input: {
		element: '#datepicker-input1',
		format: 'yyyy-MM-dd'
	}
});

var datepicker2 = new tui.DatePicker('#wrapper2', {
	//date: new Date(),
	language: 'ko',
	//date: new Date(),
	input: {
		element: '#datepicker-input2',
		format: 'yyyy-MM-dd'
	}
});

var datepicker3 = new tui.DatePicker('#wrapper3', {
	//date: new Date(),
	language: 'ko',
	//date: new Date(),
	input: {
		element: '#datepicker-input3',
		format: 'yyyy-MM-dd'
	}
});

var datepicker4 = new tui.DatePicker('#wrapper4', {
	//date: new Date(),
	language: 'ko',
	//date: new Date(),
	input: {
		element: '#datepicker-input4',
		format: 'yyyy-MM-dd'
	}
});

//재고원가 한달전
var dt = new Date();
const year = dt.getFullYear(); // 년
const month = dt.getMonth();   // 월
const day = dt.getDate();      // 일

var mt = new Date(year, month - 1, day);

var datepicker5 = new tui.DatePicker('#wrapper5', {
	date: mt, //new Date()-31,
	type: 'month',
	language: 'ko',
	input: {
		element: '#datepicker-input5',
		format: 'yyyy-MM'
	}
});

// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var keyValueList1;
$(document).ready(function() {

	createAUIGrid();

	findDataToServer("/base/deadline-list", 1);

	$("#btnDeadlineReg").click(function() {
		updateDataToServer("/base/deadlineAdd");
	});

});


window.onbeforeunload = function() {

};


// AUIGrid 를 생성합니다.
function createAUIGrid() {

	var columnLayout = [
		{ dataField: "deadIdx", headerText: "마감일Idx", editable: false, visible: false }
		, { dataField: "inDead", headerText: "입고마감", editable: false }
		, { dataField: "outDead", headerText: "출고마감", editable: false }
		, { dataField: "depositDead", headerText: "입금마감", editable: false }
		, { dataField: "withdrawDead", headerText: "출금마감", editable: false }
		, { dataField: "memo", headerText: "메모", editable: true , visible: false}];


	var auiGridProps = {
		editable: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		rowIdField: "deadIdx",
		showAutoNoDataMessage : false, 
	};


	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);

	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}

function findDataToServer(url, page) {
	var list = [];
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {

		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.deadlineList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {

				for (i = 0; i < data.deadlineList.length; i++) {
					
					 inDead = data.deadlineList[i].inDead; 
					 outDead = data.deadlineList[i].outDead; 
					 depositDead = data.deadlineList[i].depositDead; 
					 withdrawDead = data.deadlineList[i].withdrawDead; 
					 $("#datepicker-input1").val(inDead); 
					 $("#datepicker-input2").val(outDead); 
					 $("#datepicker-input3").val(depositDead); 
					 $("#datepicker-input4").val(withdrawDead); 
		 					 
					list.push({
						deadIdx: data.deadlineList[i].deadIdx,
						inDead: data.deadlineList[i].inDead,
						outDead: data.deadlineList[i].outDead,
						depositDead: data.deadlineList[i].depositDead,
						withdrawDead: data.deadlineList[i].withdrawDead,
						memo: data.deadlineList[i].memo												

					});


				}

				AUIGrid.setGridData("#grid_wrap", list);
				//console.log("list page:"+page);
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID, Number(page));
				}
			}
		},
		error: function(x, e) {
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
			} else if (x.status == 404) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
			} else if (x.status == 500) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
			} else if (e == 'parsererror') {
				alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
			} else if (e == 'timeout') {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
			} else {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n' + x.responseText + ')');
			}
		}
	});


}

function updateDataToServer(url) {

	//var updateList = AUIGrid.getEditedRowColumnItems(myGridID);
	var iDead = document.getElementById("datepicker-input1").value;
	var oDead = document.getElementById("datepicker-input2").value;
	var dDead = document.getElementById("datepicker-input3").value;
	var wDead = document.getElementById("datepicker-input4").value;


	var data = {};
	data.inDead = iDead;
	data.outDead = oDead;
	data.depositDead = dDead;
	data.withdrawDead = wDead;


	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
			location.reload(); 
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};


$("#btnStockYM").click(function() {
	
	var stdYM = document.getElementById("datepicker-input5").value;
	
	if (!confirm("재고생성 기준월 "+stdYM+" 로 생성하시겠습니가?")){
		return;
	}
	/*
	var data = {};
    data.workingType = "FIX_PROC";
	data.stdYM = stdYM;
	*/
	
 	$.ajax({
	    url : "/logis/stockYmAdd",
	    dataType : "json",
	    type : "POST",
	   // contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data: {
			"workingType":"FIX_PROC",
			"stdYM":stdYM
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	    },
	    error:function(request, status, error){ 
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
});


