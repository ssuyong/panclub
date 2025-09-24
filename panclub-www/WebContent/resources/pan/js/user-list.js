// 그리드 생성 후 해당 ID 보관 변수

var myGridID; //정동근추가

var utList = ["시스템관리자", "일반관리자"];



$(document).ready(function() { // script가 html 로드 후 실행하게 해주는 구문 정동근
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);

	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)

	if (document.location.hash) {
		var HashLocationName = document.location.hash;
		HashLocationName = decodeURI(HashLocationName.replace('#info', '')); //decodeURI 한글깨짐처리 

		var info = HashLocationName.split("!");

		scrollYN = "Y";
		//fnViewType(info[11]);
		//f_category_sub(info[0],info[1],info[2],info[3],info[4],info[5],info[6],info[7],info[8],info[9],info[10],info[11],info[12],info[13]);

		var page = info[0];
		var userId = info[1];
		var userName = info[2];

		//console.log("HashLocationName:"+HashLocationName);
		$("#userId").val(userId);
		$("#userName").val(userName);

		findDataToServer("/biz/user-list", page);
		checkChk();
	} else {

	}

	//valid YN 조회


	//부서팝업 정동근 추가
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
			$("#users tbody tr td").empty();
		}
	});


	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {
		currentRowIndex = event.rowIndex; // // 에디팅 시작 시 해당 행 인덱스 보관
		//setFieldToEditWindow(event.item); //그리드의 데이터 팝업에 바인딩
		//console.log("key value:"+event.item.admType);
		if (event.dataField == 'divisionCode' || event.dataField == 'divisionName') { //관리자(부서)코드 칼럼 
			//관리유형 선택여부 체크
			//console.log("admType:"+event.item.admType);
			//if (event.item.admType == '') {
			//alert("관리유형을 선택하세요");
			//return;

			dialog.dialog("open");
			//console.log('a = ' + currentRowIndex)
			findAdmDivision(currentRowIndex, event.item.admType);

		}
		return true; // false 반환하면 그리드 내장 에디터 표시 안함.(더 이상 진행 안함)
	});


	$("#btnFind").click(function() {
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var userId_val = $("#userId").val();
		var userName_val = $("#userName").val();
		document.location.hash = '#info' + currentPage + "!" + userId_val + "!" + userName_val;
		//
		findDataToServer("/biz/user-list", 1);
			checkChk();
	});

	$("#btnReg").click(function() {
		//alert("저장버튼");
		updateDataToServer("/biz/userAdd", "workingType");

	});


   $(".input").on("keyup",function(key){
        if(key.keyCode==13) {
			var currentPage = 1;
			var userId_val = $("#userId").val();
			var userName_val = $("#userName").val();
			document.location.hash = '#info' + currentPage + "!" + userId_val + "!" + userName_val;
			//
			findDataToServer("/biz/user-list", 1);
				checkChk();
	
	
         
        }
    });




});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};



// 칼럼 레이아웃 작성
var columnLayout = [
	{ dataField: "userId_origin", headerText: "사용자ID원본", visible: false, width: 0 }
	, { dataField: "userId", headerText: "사용자ID" }
	, { dataField: "userName", headerText: "사용자이름" }
	, { dataField: "comCode", headerText: "회사코드" ,width: 120  ,  visible: false }
	, { dataField: "comName", headerText: "회사명",width: 150 ,  visible: false  }
	, { dataField: "pwdEnc", headerText: "패스워드",width: 120}
	, { dataField: "divisionCode", headerText: "부서코드",  visible: false} 
	, { dataField: "divisionName", headerText: "부서이름",  visible: false}
	 ,{ dataField: "userTypeCode", 
		headerText: "사용자구분코드", 
		width: 150, 
		renderer:{
		type: "DropDownListRenderer",
		list: utList
		}}
		//, { dataField: "userTypeCode", 
		//headerText: "사용자구분코드", 
		//width: 150}
	, { dataField: "userTypeName", headerText: "사용자구분이름", visible: false }
	, {
		dataField: "validYN", headerText: "사용유무",
		style: "aui-grid-user-custom",
		width: 120,
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
	, { dataField: "created", headerText: "등록일" }
	, { dataField: "modified", headerText: "수정일" }
];



// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {

	var auiGridProps = {

		editable: true,

		// 상태 칼럼 사용
		showStateColumn: true,

		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		enableFilter: true,

		selectionMode: "multipleCells",

		// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
		rowIdField: "userId_origin",
		showAutoNoDataMessage : false, 

		/*
		
		
		//softRemoveRowMode 적용을 원래 데이터에만 적용 즉, 새 행인 경우 적용 안시킴
		softRemovePolicy :"exceptNew",
		
		// 칼럼 끝에서 오른쪽 이동 시 다음 행, 처음 칼럼으로 이동할지 여부
		wrapSelectionMove : true,
		
		// 읽기 전용 셀에 대해 키보드 선택이 건너 뛸지 여부 (기본값 : false)
		skipReadonlyColumns : true,
		
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enterKeyColumnBase : true,
		
		// selectionChange 이벤트 발생 시 간소화된 정보만 받을지 여부
		// 이 속성은 선택한 셀이 많을 때 false 설정하면 퍼포먼스에 영향을 미칩니다.
		// selectionChange 이벤트 바인딩 한 경우 true 설정을 권합니다.
		simplifySelectionEvent : true */
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
		//var rowIdField = AUIGrid.getProp(event.pid, "userId_origin");

		if (event.dataField == "userId") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item["userId_origin"])) {
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

}

function findDataToServer(url, page) {
	

	var list = [];

	var userId = $("#userId").val();
	var userName = $("#userName").val();

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"userId": userId,
			"userName": userName,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.userList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.userList.length; i++) {
					
					list.push({
						userId_origin: data.userList[i].userId
						, userId: data.userList[i].userId
						, userName: data.userList[i].userName
						, comCode: data.userList[i].comCode
						, comName: data.userList[i].comName
						, pwdEnc: data.userList[i].pwdEnc
						, divisionCode: data.userList[i].divisionCode
						, divisionName: data.userList[i].divisionName
						, userTypeCode: data.userList[i].userTypeCode
                        , userTypeName: data.userList[i].userTypeName
						, validYN: data.userList[i].validYN
						, created: data.userList[i].created
						, modified: data.userList[i].modified
						
					});

					//firstGrid_mst.setData(list); // 그리드에 데이터 설정

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
 
// 데이터 서버로 보내기
function updateDataToServer(url, workingType) {
 

	// 추가된 행 아이템들(배열)
	var addList = AUIGrid.getAddedRowItems(myGridID);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);

	//console.log("addList"+addList.length);

	var isValid1 = AUIGrid.validateGridData(myGridID, ["userId", "userName", "pwdEnc"], "사용자ID, 사용자이름, 패스워드 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["userId", "userName", "pwdEnc"], "사용자ID, 사용자이름, 패스워드 필드는 반드시 유효한 값을 직접 입력해야 합니다.");

	//console.log("isValid:"+isValid);
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}

	var data = {};

	if (addList.length > 0) data.userAdd = addList;
	else data.userAdd = [];
	//
	//console.log("data3:"+JSON.stringify(data));
	if (updateList.length > 0) data.userUpdate = updateList;
	else data.userUpdate = [];
	//console.log("data4:"+JSON.stringify(data));
	if (removeList.length > 0) data.userRemove = removeList;
	else data.userRemove = [];

	data.workingType = workingType;
	//console.log("data:"+addList[0].userName);
	//console.log("data:"+addList[0].userId);
	//console.log("data:"+addList[0].pwdEnc);
    //alert("aa");
	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			// alert("성공:"+data.success);
			//location.reload();
			alert(data.result_code + ":" + data.result_msg);
			location.reload();
			//AUIGrid.removeSoftRows(myGridID); // 삭제 표시된 행(소프트 삭제) 그리드에서 제거
		    //AUIGrid.resetUpdatedItems(myGridID); // 현재 수정 정보 초기화
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

	if (typeof (Storage) != "undefined") { // Check browser support
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

function checkItems() {

	// 추가된 행 아이템들(배열)
	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);

	// 수정된 행 아이템들(배열) : 진짜 수정된 필드만 얻음.
	var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID);

	// 수정된 행 아이템들(배열) : 수정된 필드와 수정안된 필드 모두를 얻음.
	//var editedRowItems = AUIGrid.getEditedRowItems(myGridID); 

	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);

	var i, len, name, rowItem;
	var str = "";

	if (addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for (i = 0, len = addedRowItems.length; i < len; i++) {
			rowItem = addedRowItems[i]; // 행아이템
			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	if (editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for (i = 0, len = editedRowItems.length; i < len; i++) {
			rowItem = editedRowItems[i]; // 행아이템

			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	if (removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for (i = 0, len = removedRowItems.length; i < len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length);


	if (str == "")
		str = "변경 사항 없음";

	alert(str);
}


// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;


//다이얼로그창 선택하는 경우 그리드에 디스플레이 정동근 추가
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');

	//console.log(currentRowIndex);
	//console.log(decodeURI(mName));

	var item = {};
	item.divisionCode = mCode; // $("#name").val();
	item.divisionName = decodeURI(mName); //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);

	var dialog;
	dialog = $("#dialog-form");


	dialog.dialog("close");
}


//부서 팝업 정동근 추가!
function findAdmDivision(currentRowIndex, admType) {
	var url = "";
	//if (admType == '부서원') {
	//	url = '/biz/staff-list';
	//} else { //부서
	url = '/biz/dept-list';
	//}

	var list = [];
	var userId = $("#userId").val();
	var arr_text = "";

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"userId": userId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.deptList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				arr_text = "<select id='mCode' style='padding:7px 20px;' >";

				for (i = 0; i < data.deptList.length; i++) {

					deptCode = data.deptList[i].code;
					deptName = data.deptList[i].name;
					//console.log(deptName)
					//$("#users tbody tr td").append( "<option>" +staffName + "</option>");
					arr_text = arr_text + "<option value=" + deptCode + " mname=" + encodeURI(deptName) + ">" + deptName + "</option>";
				}
				arr_text = arr_text + "</select>";

				$("#users tbody tr td").append(arr_text);
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




$("#validChk").change(function () {
checkChk()
});

$("#nvalidChk").change(function () {
checkChk2()
});




function checkChk() {
	
	if ($('input[id="validChk"]').is(":checked") == true) {
		//console.log('체크된 상태');
		if ($('input[id="nvalidChk"]').is(":checked") == true) {
			clearMyFilterAll();
		} else {
			myCustomFilter1();
		}
	}	else { // 사용 체크 푼경우
		//console.log('체크 안 된 상태');
		if ($('input[id="nvalidChk"]').is(":checked") == true) {  // [사용안함 ] 체크한 경우
			 myCustomFilter2();
		} else {
			clearMyFilterAll();
		}
	}

}

function checkChk2() {
	
	if ($('input[id="nvalidChk"]').is(":checked") == true) {
		//console.log('체크된 상태');
		if ($('input[id="validChk"]').is(":checked") == true) {
			clearMyFilterAll();
		} else {	
			myCustomFilter2();
		}	
	} else { // []사용안함] 체크 푼경우
		//console.log('체크 안 된 상태');
		if ($('input[id="validChk"]').is(":checked") == true) {  // [사용 ] 체크한 경우
			 myCustomFilter1();
		} else {
			clearMyFilterAll();
		}
	}

}



//valid YN 기준으로 필터링 설정 
function myCustomFilter1() {

	AUIGrid.setFilter(myGridID, "validYN", function(dataField, value, item) {
		if (item.validYN == "Y") {
			return true;
		}
		return false;
	});
}

function myCustomFilter2() {

	AUIGrid.setFilter(myGridID, "validYN", function(dataField, value, item) {
		if (item.validYN == "N") {
			return true;
		}
		return false;
	});
}

//  필터링 모두 해제
function clearMyFilterAll() {
	AUIGrid.clearFilterAll(myGridID);
};
