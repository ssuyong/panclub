
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID1;
var keyValueList1;

$(document).ready(function() {

	var keyValueList1 = findDataToServer1("/base/code-list");
	var keyValueList3 = findDataToServer3("/base/cust-list", "N");
	var keyValueList5 = findDataToServer4("/biz/staff-list", "N");


	createAUIGrid(keyValueList1, keyValueList3, keyValueList5);
	createDetailAUIGrid1(keyValueList3);


	findDataToServer("/base/sr-list", 1)


	$("#btnReg").click(function() {
		updateDataToServer("/base/srAdd");
		updateDataToServer1("/base/srCustAdd")
	});



});

window.onbeforeunload = function() {

};



function createAUIGrid(keyValueList1, keyValueList3, keyValueList5) {

	var keyValueList2 = JSON.parse(keyValueList1);
	var keyValueList7 = JSON.parse(keyValueList3);
	var keyValueList6 = JSON.parse(keyValueList5);

	var columnLayout = [
		{ dataField: "srIdx", headerText: "SRIDX" ,visible: false },
		{
			dataField: "srType", headerText: "영업대표그룹구분",
			sortType: 1,
			editable: true,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;

				for (var i = 0, len = keyValueList2.length; i < len; i++) {
					if (keyValueList2[i]["code"] == value) {
						retStr = keyValueList2[i]["value"];
						break;
					}
				}
				return retStr;
			},


			editRenderer: {
				type: "DropDownListRenderer",
				list: keyValueList2,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			}
		},
		{ dataField: "srCode", headerText: "영업대표코드", editable: false },
		{ dataField: "srName", headerText: "영업대표명", editable: false },
		/*
		{
			dataField: "srName", headerText: "SR명",
			sortType: 1,
			editable: false,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;

				for (var i = 0, len = keyValueList6.length; i < len; i++) {
					if (keyValueList6[i]["code"] == value) {
						retStr = keyValueList6[i]["value"];
						break;
					}
				}
				for (var i = 0, len = keyValueList7.length; i < len; i++) {
					if (keyValueList7[i]["code"] == value) {
						retStr = keyValueList7[i]["value"];
						break;
					}
				}
				return retStr;
			}
		},*/
		{ dataField: "regUserId", headerText: "등록자" ,editable: false ,visible: false},
		{ dataField: "created", headerText: "등록일"  ,editable: false ,visible: false},
		{ dataField: "uptUserId", headerText: "수정자"  ,editable: false ,visible: false},
		{ dataField: "modified", headerText: "수정일"  ,editable: false ,visible: false}
	];

	var auiGridProps = {
		editable: true,
		showStateColumn: true,
		rowIdField: "srIdx",
		showAutoNoDataMessage : false, 
	};

	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);

	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);

	AUIGrid.bind(myGridID, "cellClick", auiGridSelectionChangeHandler);
/*
	AUIGrid.bind(myGridID, "cellEditBegin", function(event) {
		// rowIdField 설정 값 얻기
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

		if (event.dataField == "srCode" || event.dataField == "srName") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
			}
		}

		return true; // 다른 필드들은 편집 허용
	})
*/

	var dialog;
	dialog = $("#dialog-form").dialog({
		autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: "40%",
		modal: true,
		headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap") },
		buttons: {
			"확인": updateGridRow,
			"취소": function(event) {
				dialog.dialog("close");
			}
		},
		close: function() {
			$("#srChoice tbody tr td").empty();
		}
	});

	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {
		currentRowIndex = event.rowIndex; // // 에디팅 시작 시 해당 행 인덱스 보관
		if (event.dataField == 'srCode' || event.dataField == 'srName') { //관리자(부서)코드 칼럼 
			if (event.item.srType == '' || event.item.srType == null) {
				alert("SR구분을 선택하세요");
				return;
			}

			dialog.dialog("open");
			if (event.item.srType == 'SR1') {
				findDataToServer4("/biz/staff-list", "Y");

			} else if (event.item.srType == 'SR2' || event.item.srType == 'SR3') {
				findDataToServer3("/base/cust-list", "Y");

			}


		}
		return false; // false 반환하면 그리드 내장 에디터 표시 안함.(더 이상 진행 안함)
	});
}

var currentRowIndex;

function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');


	var item = {};
	item.srCode = mCode; // $("#name").val();
	item.srName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);

	var dialog;
	dialog = $("#dialog-form");
	dialog.dialog("close");
}

function createDetailAUIGrid1(keyValueList3) {

	var keyValueList4 = JSON.parse(keyValueList3);


	var columnLayout1 = [
		{ dataField: "srCustIdx", headerText: "관리거래처IDX", visible: false },
		{ dataField: "custCode", headerText: "거래처코드", editable: false },
		{
			dataField: "custName", headerText: "거래처명",
			sortType: 1,
			cellMerge: true,
			editable: true,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;

				for (var i = 0, len = keyValueList4.length; i < len; i++) {
					if (keyValueList4[i]["code"] == value) {
						retStr = keyValueList4[i]["value"];
						break;
					}
				}
				return retStr;
			},


			editRenderer: {
				type: "DropDownListRenderer",
				list: keyValueList4,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			}

		},
		{ dataField: "srType", headerText: "sr구분", editable: false, visible: false },
		{ dataField: "srCode", headerText: "sr코드", editable: false, visible: false },
		{ dataField: "custShareRate", headerText: "거래처분배율" },
		{ dataField: "regUserId", headerText: "등록자", editable: false ,visible: false},
		{ dataField: "created", headerText: "등록일", editable: false ,visible: false},
		{ dataField: "uptUserId", headerText: "수정자", editable: false ,visible: false},
		{ dataField: "modified", headerText: "수정일", editable: false ,visible: false},
	];

	var auiGridProps1 = {
		editable: true,
		showStateColumn: true,
		rowIdField: "srCustIdx",	
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
	};
	myGridID1 = AUIGrid.create("#grid_wrap1", columnLayout1, auiGridProps1);
	
	AUIGrid.bind(myGridID1, "cellEditBegin", function(event) {
		// rowIdField 설정 값 얻기
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

		if (event.dataField == "custName") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
			}
		}

		return true; // 다른 필드들은 편집 허용
	})

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

			if (data.srList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {

				for (i = 0; i < data.srList.length; i++) {
					list.push({
						srIdx: data.srList[i].srIdx,
						comCode: data.srList[i].comCode,
						srCode: data.srList[i].srCode,
						//srName: data.srList[i].srCode,
						srName: data.srList[i].srName,
						srType: data.srList[i].srType,
						srType_origin: data.srList[i].srType,

						regUserId: data.srList[i].regUserId,
						created: data.srList[i].created,
						uptUserId: data.srList[i].uptUserId,
						modified: data.srList[i].modified

					});


				}

				AUIGrid.setGridData("#grid_wrap", list);
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

function findDataToServer1(url) {
	var list = []; //자바스크립트 배열선언
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.codeList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				for (i = 0; i < data.codeList.length; i++) {
					if (data.codeList[i].mCode == "2100") {
						code = data.codeList[i].code;
						codeName = data.codeList[i].codeName;

						//list[j] = {custName};					
						list[j] = { "code": code, "value": codeName };
						j = j + 1;
					}
				}

			}

			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!




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

	return listS; // 리턴을 바깥에서 해야함 

}

function findDataToServer2(url, item) {
	var list = [];
	var rowItem = item;

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {

		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.srCustList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
			} else {
				for (i = 0; i < data.srCustList.length; i++) {
					if (data.srCustList[i].srCode == rowItem.srCode) {
						list.push({
							srCustIdx: data.srCustList[i].srCustIdx,
							custCode: data.srCustList[i].custCode,
							custName: data.srCustList[i].custCode,
							srType: data.srCustList[i].srType,
							srCode: data.srCustList[i].srCode,
							custShareRate: data.srCustList[i].custShareRate,

							regUserId: data.srCustList[i].regUserId,
							created: data.srCustList[i].created,
							uptUserId: data.srCustList[i].uptUserId,
							modified: data.srCustList[i].modified

						});

					}

				}
			}
			AUIGrid.setGridData("#grid_wrap1", list);


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

function findDataToServer3(url, listYN) {
	$(".ui-dialog-titlebar-close").html("X");
	var list = []; //자바스크립트 배열선언
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				arr_text = "<select id='mCode' style='padding:7px 20px;' >";
				for (i = 0; i < data.custList.length; i++) {
					//if (data.custList[i].custType == "C3") {
					if (data.custList[i].custType != "C4" && data.custList[i].custType != "C5" && data.custList[i].custType != "C1") { //2023.07.13 hsg
						code = data.custList[i].custCode;
						value = data.custList[i].custName;
						list[j] = { "code": code, "value": value };
						j = j + 1;
						arr_text = arr_text + "<option value=" + code + " mname=" + value + ">" + code + "-" + value + "</option>";
					}
				}
				arr_text = arr_text + "</select>";

				if (listYN == "Y") { $("#srChoice tbody tr td").append(arr_text); };

			}

			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!




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

	return listS; // 리턴을 바깥에서 해야함 

}

function findDataToServer4(url, listYN) {
	var list = []; //자바스크립트 배열선언
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {
			if (data.staffList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				arr_text = "<select id='mCode' style='padding:7px 20px;' >";
				for (i = 0; i < data.staffList.length; i++) {

					code = data.staffList[i].empNo;
					value = data.staffList[i].name;

					list[j] = { "code": code, "value": value };
					j = j + 1;
					arr_text = arr_text + "<option value=" + code + " mname=" + value + ">" + code + "-" + value + "</option>";

				}
				arr_text = arr_text + "</select>";

				if (listYN == "Y") { $("#srChoice tbody tr td").append(arr_text); };
			}

			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!




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

	return listS; // 리턴을 바깥에서 해야함 

}
// Details 데이터 요청 지연 타임아웃
var timerId = null;

// 마스터 그리드선택 변경 이벤트 핸들러
// 마스터 그리드에서 행을 선택한 경우 해당 행의 고객 ID(custId) 에 맞는
// 데이터를 요청하여 디테일 그리드에 표시합니다.

function auiGridSelectionChangeHandler(event) {
	//document.getElementById("srCode").innerHTML = event.item.srCode;
	// 200ms 보다 빠르게 그리드 선택자가 변경된다면 데이터 요청 안함
	if (timerId) {
		clearTimeout(timerId);
	}
	

	timerId = setTimeout(function() {
		// 선택 대표 셀 정보 
		//var primeCell = event.primeCell;

		// 대표 셀에 대한 전체 행 아이템
		//document.getElementById("srCode").innerHTML = primeCell.item.srCode;
		document.getElementById("srCodeSave").innerHTML = event.item.srCode;
		document.getElementById("srTypeSave").innerHTML = event.item.srType;

		findDataToServer2("/base/srCust-list", event.item);


		// rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
		//requestMyData("./data/getJsonDetails.php?id=" + custId, myGridID2);


	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
};

//처음 페이지에서 자동 선택
/*
function auiGridCompleteHandler(event) {

	//AUIGrid.selectRowsByRowId(myGridID, 1,1);

}
*/



function addRow(grid, rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID, item, rowPos);
};
function removeRow() {


	AUIGrid.removeRow(myGridID, "selectedIndex");
};
function addRow1(grid, rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID1, item, rowPos);
};
function removeRow1() {


	AUIGrid.removeRow(myGridID1, "selectedIndex");
};

function addRow2(grid, rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID2, item, rowPos);
};
function removeRow2() {


	AUIGrid.removeRow(myGridID2, "selectedIndex");
};


function updateDataToServer(url) {

	var addList = AUIGrid.getAddedRowItems(myGridID);
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID);
	var updateItem = AUIGrid.getEditedRowItems(myGridID);
	var removeList = AUIGrid.getRemovedItems(myGridID);


	var isValid = AUIGrid.validateGridData(myGridID, ["srCode", "srName", "srType"], "SR코드, SR명, SR구분은 반드시 유효한 값을 직접 입력해야 합니다.");

	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["srCode", "srName", "srType"], "SR코드, SR명, SR구분은 반드시 유효한 값을 직접 입력해야 합니다.");


	if (isValid == false || isValidChanged == false) {
		return;
	}


	var data = {};

	if (addList.length > 0) {
		data.srAdd = addList;
	} else data.srAdd = [];

	if (updateList.length > 0) {
		data.srUpdateItem = updateItem
		data.srUpdate = updateList;
	} else data.srUpdate = [];

	if (removeList.length > 0) data.srRemove = removeList;
	else data.srRemove = [];

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};



function updateDataToServer1(url) {

	var srTypeSave = $("#srTypeSave").text();
	var srCodeSave = $("#srCodeSave").text();


	var addList1 = AUIGrid.getAddedRowItems(myGridID1);
	var updateList1 = AUIGrid.getEditedRowColumnItems(myGridID1);
	var removeList1 = AUIGrid.getRemovedItems(myGridID1);

	var isValid1 = AUIGrid.validateGridData(myGridID1, ["custName"], "거래처명은 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID1, ["custName"], "거래처명은 반드시 유효한 값을 직접 입력해야 합니다.");

	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}

	var data = {};

	if (addList1.length > 0) {
		data.srCustAdd = addList1;
		data.srType = srTypeSave;
		data.srCode = srCodeSave;
	}
	else data.srCustAdd = [];

	if (updateList1.length > 0) data.srCustUpdate = updateList1;
	else data.srCustUpdate = [];

	if (removeList1.length > 0) data.srCustRemove = removeList1;
	else data.srCustRemove = [];



	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};






