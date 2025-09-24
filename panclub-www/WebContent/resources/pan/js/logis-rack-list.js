// 그리드 생성 후 해당 ID 보관 변수

var myGridID; //정동근추가



// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function() { // script가 html 로드 후 실행하게 해주는 구문 정동근
	//findDataToServer2("/base/storage-list", 1);
	keyValueList1 = findBaseCode("/base/code-list", "9030");

	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(keyValueList1);

	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if (document.location.hash) {
		var HashLocationName = document.location.hash;
		HashLocationName = decodeURI(HashLocationName.replace('#info', '')); //decodeURI 한글깨짐처리 

		var info = HashLocationName.split("!");

		scrollYN = "Y";

		var logisCode = info[0];
		var logisRackId = info[1];
		var logisRackName = info[2];
		
		if (typeof logisCode == 'undefined') { logisCode = '' }
		if (typeof logisRackId == 'undefined') { logisRackId = '' }
		if (typeof logisRackName == 'undefined') { logisRackName = '' }
		
		$("#logisCode").val(logisCode);
		$("#logisRackId").val(logisRackId);
		$("#logisRackName").val(logisRackName);
		
		findDataToServer("/logis/logis-rack-list", 1);
	}

	$("#btnFind").click(function() {
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var logisCode_val = $("#logisCode").val();
		var logisRackId_val = $("#logisRackId").val();
		var logisRackName_val = $("#logisRackName").val();
		
		document.location.hash = '#info' + logisCode_val + "!" + logisRackId_val + "!" + logisRackName_val;

		findDataToServer("/logis/logis-rack-list", 1);
	});

	$("#btnReg").click(function() {
		//alert("저장버튼");
		updateDataToServer("/logis/logisRackAdd", "workingType");
	});

	$("#btnPrint").click(function() {
		printBarcode();
	});
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};


// AUIGrid 를 생성합니다.
function createAUIGrid(keyValueList1) {

	var keyValueList2 = JSON.parse(keyValueList1);
	for (let i = 0; i < keyValueList2.length; i++) {
		keyValueList2[i].value = `${keyValueList2[i].value}(${keyValueList2[i].code})`;
	}

	// 칼럼 레이아웃 작성
	var columnLayout = [
		{ dataField: "logisRackId_origin", headerText: "기본랙ID원본", visible: false }
		, { dataField: "logisRackId", headerText: "기본랙ID", editable: false }
		//, { dataField: "logisCode", headerText: "물류센터코드", width: 90}
		, {
			dataField: "logisCode", headerText: "물류센터",
			sortType: 1,
			cellMerge: true,
			editable: true,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;
				var code;

				for (var i = 0, len = keyValueList2.length; i < len; i++) {
					if (keyValueList2[i]["code"] == value) {
						//code = value;
						//retStr = keyValueList2[i]["value"] + "(" + "코드:" + code + ")";
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
			},
		}
		, { dataField: "logisRackName", headerText: "기본랙명" }
		, { dataField: "memo", headerText: "비고" }
		, {
			dataField: "validYN", headerText: "사용유무", width: 60,
			style: "aui-grid-user-custom",

			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if (value == "Y") {
					return "my-inactive-style";
				} else if (value == "N") {
					return "my-active-style";
				}
				return "";
			},
			renderer: {
				type: "CheckBoxEditRenderer",
				showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
				checkValue: "Y", // true, false 인 경우가 기본
				unCheckValue: "N",

				//사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
				checkableFunction: function(rowIndex, columnIndex, value, isChecked, item, dataField) {
					// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
					if (item.charge == "Anna") {
						return false;
					}
					return true;
				}
			}
		}
		, { dataField: "regUserId", headerText: "등록자", editable: false, width: 160 }
		, { dataField: "uptUserId", headerText: "수정자", editable: false, width: 160 }
	];

	var auiGridProps = {

		editable: true,

		// 상태 칼럼 사용
		showStateColumn: true,

		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 500,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		selectionMode: "multipleCells",

		// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
		rowIdField: "logisRackId_origin",

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,


	};


	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);

	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell;


	});

	// 에디팅 시작 이벤트 바인딩 정동근

	AUIGrid.bind(myGridID, "cellEditBegin", function(event) {
		// rowIdField 설정 값 얻기
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

		if (event.dataField == "rackCode") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
			}
		}
		return true; // 다른 필드들은 편집 허용
	});

	// 에디팅 정상 종료 직전 이벤트 바인딩          
	// 에디팅 정상 종료 이벤트 바인딩
	// 에디팅 취소 이벤트 바인딩
	//AUIGrid.bind(myGridID, ["cellEditBegin", "cellEditEndBefore", "cellEditEnd", "cellEditCancel"], auiCellEditingHandler);

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	AUIGrid.bind(myGridID, "cellEditEnd", function(event) {
		if (event.dataField == "logisName") {
			AUIGrid.updateRow(myGridID, { "logisCode": event.item.logisName }, event.rowIndex);					
		}		
	});	
	
}


function findDataToServer(url, page) {

	var list = [];

	//let logisCode = $("#logisCode").val();
	let logisRackId = $("#logisRackId").val();
	let logisRackName = $("#logisRackName").val();

    if (logisRackId == undefined || logisRackId === "") { logisRackId = 0;}
     
	//현재 선택된 창고명을 가져와서 그 이름의 값에 담긴 창고코드 데이터를 가져옴
	const logisCodeSel = $('#logisCode [value="' + $("#logisText").val() + '"]');
	const logisCode = logisCodeSel.data('logiscode');

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"logisCode": logisCode,
			"logisRackId": logisRackId,
			"logisRackName": logisRackName
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.logisRackList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.logisRackList.length; i++) {
					comCode = data.logisRackList[i].comCode;
					$("#comCode").val(comCode);
					list.push({
						logisRackId_origin: data.logisRackList[i].logisRackId
						, logisRackId: data.logisRackList[i].logisRackId
						, logisCode: data.logisRackList[i].logisCode
						, logisName: data.logisRackList[i].logisName
						, logisRackName: data.logisRackList[i].logisRackName
						, memo: data.logisRackList[i].memo
						, validYN: data.logisRackList[i].validYN
						, regUserId: data.logisRackList[i].regUserId
						, uptUserId: data.logisRackList[i].uptUserId
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

// 데이터 서버로 보내기
function updateDataToServer(url, workingType) {

	// 추가된 행 아이템들(배열)
	var addList = AUIGrid.getAddedRowItems(myGridID);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);

	//var isValid1 = AUIGrid.validateGridData(myGridID, ["storageName", "rackCode", "rackName"], "창고명, 코드, 랙 이름 필드는 반드시 값을 직접 입력해야 합니다.");
	//var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["storageName","rackCode", "rackName"], "창고명, 코드, 랙 이름 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValid1 = AUIGrid.validateGridData(myGridID, ["logisCode", "logisRackName"], "물류센터명, 기본랙명 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["logisCode", "logisRackName"], "물류센터명, 기본랙명 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}

	var data = {};

	if (addList.length > 0) {
		for (logisRack of addList) {
			logisRack.logisRackName = logisRack.logisRackName.toUpperCase();
		}
		data.logisRackAdd = addList;
	}
	else data.logisRackAdd = [];

	if (updateList.length > 0) {
		for (logisRack of updateList) {
			logisRack.logisRackName = logisRack.logisRackName.toUpperCase();
		}
		data.logisRackUpdate = updateList;
	}
	else data.logisRackUpdate = [];

	if (removeList.length > 0) data.logisRackRemove = removeList;
	else data.logisRackRemove = [];

	data.workingType = workingType;

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			// alert("성공:"+data.success);
			alert(data.result_msg);

			if (data.result_code == "OK") { //처리 성공한 겨우
				AUIGrid.removeSoftRows(myGridID); // 삭제 표시된 행(소프트 삭제) 그리드에서 제거
				AUIGrid.resetUpdatedItems(myGridID); // 현재 수정 정보 초기화
			} else {
				AUIGrid.resetUpdatedItems(myGridID);
			}
			location.reload();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};

// AUIGrid 의 현재 칼럼 레이아웃을 얻어 보관합니다.
// 데모에서는 HTML5의 localStrage 를 사용하여 보관합니다.
// 만약 DB 상에 보관하고자 한다면 해당 정보를 Ajax 요청으로 코딩하십시오.
function saveColumnLayout() {

	// 칼럼 레이아웃 정보 가져오기
	var columns = AUIGrid.getColumnLayout(myGridID);

	if (typeof (Rack) != "undefined") { // Check browser support
		var columnStr = JSON.stringify(columns);
		var rowPos = AUIGrid.getRowPosition(myGridID); // 수직 스크롤 값
		var hPos = AUIGrid.getProp(myGridID, "hScrollPosition"); // 수평 스크롤 값(픽셀)

		localStorage.setItem("auigridLayout", columnStr);
		localStorage.setItem("auigridRow", rowPos);
		localStorage.setItem("auigridCol", hPos);

		//alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");
	} else {
		//alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
};


// PDF 내보내기(Export), AUIGrid.pdfkit.js 파일을 추가하십시오.

// 행 추가, 삽입
function addRow(rowPos) {

	//var rowPos = document.getElementById("addSelect").value;

	var item = new Object();
	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	AUIGrid.addRow(myGridID, item, rowPos);
};

// 행 삭제
function removeRow() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID, "selectedIndex");
};


function findBaseCode(url, mCode) {

	var list = [];
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			mCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				const selectBox = $("#logisCode");
				selectBox.append(`<option value=''></option>`)

				for (i = 0; i < data.codeList.length; i++) {
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;
					list[j] = { "code": code, "value": codeName };
					selectBox.append(`<option value='${codeName} (${code})' data-logiscode=${code}></option>`);  //조회조건 dp
					j = j + 1;
				}
			}

			listS = JSON.stringify(list)
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


function errRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function(rowIndex, item) {


		var idxSplit = idxArr.split("^");
		for (var h in idxSplit) {
			if (item.rackCode == idxSplit[h]) {
				return "auigrid-err-row-style";
			}
		}

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};

/*
function findDataToServer2(url, page) {
	
	var list = [];
	var listS;
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
			
			// selectBox.innerHTML = "";
			
			if (data.storageList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				const selectBox = $("#storageCode");
				selectBox.append(`<option value=''></option>`)
//				 var blankOption = document.createElement("option");
//						  blankOption.value = "";
//						  blankOption.text = "";
//						  selectBox.appendChild(blankOption);
				for (i = 0; i < data.storageList.length; i++) {
					
//					var option = document.createElement("option");
//					
//					option.value = data.storageList[i].storageName + " ("+  data.storageList[i].storageCode + ")";
//					option.storagCode = data.storageList[i].storageCode;	 
//					option.value = data.storageList[i].storageCode;	
//					option.text  =data.storageList[i].storageName + " ("+  data.storageList[i].storageCode + ")";
				 
				 	
					   //데이터리스트에 값으로 노출되는 창고이름(코드)로 추가되고 숨겨진 데이터로 창고코드로 추가(검색용)
					 selectBox.append(`<option value='${data.storageList[i].storageName} (${data.storageList[i].storageCode})' data-storagecode=${data.storageList[i].storageCode}></option>`);
				}

			}
				 listS = data.storageList;
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
*/

function errRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function(rowIndex, item) {


		var idxSplit = idxArr.split("^");
		for (var h in idxSplit) {
			if (item.rackCode == idxSplit[h]) {
				return "auigrid-err-row-style";
			}
		}

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};

//qr코드 출력
function printBarcode() {
	var barcode = "";
	var reqArr = "";
	var reqArr2 = "";
	var comCode = "";


	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		barcode = rowItem.item.barcode;
		rackName = "[" + rowItem.item.storageName2 + "]" + rowItem.item.rackName;

		if (i == 0) {
			reqArr = barcode;
			reqArr2 = rackName

		} else {
			reqArr = reqArr + "^" + barcode;
			reqArr2 = reqArr2 + "^" + rackName;
		}

	}
	comCode = $("#comCode").val();
	//console.log ("reqArr:" +reqArr) ;

	//window.open ("/base/rack-list-print?reqArr="+encodeURIComponent(reqArr),"_blank");
	var url = "/base/rack-list-print?reqArr=" + encodeURIComponent(reqArr) + "&reqArr2=" + encodeURIComponent(reqArr2) + "&comCode=" + comCode;
	window.open(url, "_blank", "width=600,height=400");
}


function barcodePrintRack() {
	barcodePrintItem();
}
function rackItemMove() {
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length != 1) {
		alert("이동할 랙을 하나 선택해주세요.");
		return;
	}
	let selectRack = '';
	for (row of checkedItems) {
		if (selectRack != '') selectRack += ',';
		selectRack += row.item.rackCode;
	}
	window.open(window.location.origin + '/logis/stock-wr-up?selectRack=' + selectRack);
}
