
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID1;
var myGridID2;

$(document).ready(function() {

	createAUIGrid(columnLayout);
	createDetailAUIGrid1(columnLayout1);
	createDetailAUIGrid2(columnLayout2);

	findDataToServer("/base/dept-list")
	
	$("#btnReg").click(function(){
		updateDataToServer1("/base/deptAdd", "workingType");
	});


});

window.onbeforeunload = function() {

};


var columnLayout = [
	{ dataField: "dept1Code_origin", headerText: "#지점코드" , visible:false},
	{ dataField: "dept1Code", headerText: "지점코드" ,editable : true},
	{ dataField: "dept1Name", headerText: "지점명" }
];
var columnLayout1 = [
	{ dataField: "dept2Code_origin", headerText: "#부서코드" , visible:false},
	{ dataField: "dept2Code", headerText: "부서코드" ,editable : true},
	{ dataField: "dept2Name", headerText: "부서명" }
];
var columnLayout2 = [
	{ dataField: "dept3Code_origin", headerText: "#파트코드" , visible:false},
	{ dataField: "dept3Code", headerText: "파트코드" ,editable : true},
	{ dataField: "dept3Name", headerText: "파트명" }
];

 
function createAUIGrid(columnLayout) {

	var auiGridProps = {
		editable : true,
		showStateColumn: true,
		rowIdField: "dept1Code_origin",
		showAutoNoDataMessage : false,  
	};

	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);

	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);

	AUIGrid.bind(myGridID, "selectionChange", auiGridSelectionChangeHandler);
	AUIGrid.bind(myGridID, "cellEditBegin", function (event) {
			// rowIdField 설정 값 얻기
				var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

				if (event.dataField == "dept1Code") {
				// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
				if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
					return true;
				} else {
					return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
				}}
				
			return true; // 다른 필드들은 편집 허용
			})


}

function createDetailAUIGrid1(columnLayout1) {

	var auiGridProps1 = {
		editable : true,
		showStateColumn: true,
		rowIdField: "dept2Code_origin",
		showAutoNoDataMessage : false,  
	};

	myGridID1 = AUIGrid.create("#grid_wrap1", columnLayout1, auiGridProps1);

	//AUIGrid.bind(myGridID1, "ready", auiGridCompleteHandler1);

	AUIGrid.bind(myGridID1, "selectionChange", auiGridSelectionChangeHandler1);
	AUIGrid.bind(myGridID1, "cellEditBegin", function (event) {
			// rowIdField 설정 값 얻기
				var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

				if (event.dataField == "dept2Code") {
				// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
				if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
					return true;
				} else {
					return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
				}}
				
			return true; // 다른 필드들은 편집 허용
			})



}

function createDetailAUIGrid2(columnLayout2) {

	var auiGridProps2 = {
		editable : true,
		showStateColumn: true,
		rowIdField: "dept3Code_origin",
		showAutoNoDataMessage : false,  
	};

	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout2, auiGridProps2);
	AUIGrid.bind(myGridID2, "selectionChange", auiGridSelectionChangeHandler2);
	AUIGrid.bind(myGridID2, "cellEditBegin", function (event) {
			// rowIdField 설정 값 얻기
				var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");

				if (event.dataField == "dept3Code") {
				// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
				if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
					return true;
				} else {
					return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
				}}
				
			return true; // 다른 필드들은 편집 허용
			});



}

function findDataToServer(url) {
	var list = [];
	var list1 = [];


	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {

		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.deptList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				for (i = 0; i < data.deptList.length; i++) {
					if (data.deptList[i].dept1Code != "") {
					list.push({
						dept1Code_origin: data.deptList[i].dept1Code,
						dept1Code: data.deptList[i].dept1Code,
						dept1Name: data.deptList[i].dept1Name,
						dept2Code_origin: data.deptList[i].dept2Code,
						dept2Code: data.deptList[i].dept2Code,
						dept2Name: data.deptList[i].dept2Name,
						dept3Code_origin: data.deptList[i].dept3Code,
						dept3Code: data.deptList[i].dept3Code,
						dept3Name: data.deptList[i].dept3Name

					});
					}else{
						
					}
				}
				//지점코드가 중복인 리스트 제거 filter
				list1 = list.filter((evt1, i) => {
					return (
						list.findIndex((evt2, j) => {
							return evt1.dept1Code_origin === evt2.dept1Code_origin;
						}) === i
					)
				})

				AUIGrid.setGridData("#grid_wrap", list1);
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

function findDataToServer1(url, item) {
	var list = [];
	var list1 = [];
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

			if (data.deptList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				for (i = 0; i < data.deptList.length; i++) {
					if (data.deptList[i].dept1Code == rowItem.dept1Code) {
						if (data.deptList[i].dept2Code != "") {
						list.push({
							dept1Code_origin: data.deptList[i].dept1Code,
							dept1Code: data.deptList[i].dept1Code,
							dept1Name: data.deptList[i].dept1Name,
							dept2Code_origin: data.deptList[i].dept2Code,
							dept2Code: data.deptList[i].dept2Code,
							dept2Name: data.deptList[i].dept2Name,
							dept3Code_origin: data.deptList[i].dept3Code,
							dept3Code: data.deptList[i].dept3Code,
							dept3Name: data.deptList[i].dept3Name

						});
						}else{
							AUIGrid.clearGridData(myGridID1);
						}
					}

				}
				list1 = list.filter((evt1, i) => {
					return (
						list.findIndex((evt2, j) => {
							return evt1.dept2Code_origin === evt2.dept2Code_origin;
						}) === i
					)
				})
			}
			AUIGrid.setGridData("#grid_wrap1", list1);

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

function findDataToServer2(url, item) {
	var list = [];
	var list1 = [];
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

			if (data.deptList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				for (i = 0; i < data.deptList.length; i++) {
					if (data.deptList[i].dept1Code == rowItem.dept1Code && data.deptList[i].dept2Code == rowItem.dept2Code) {
						if (data.deptList[i].dept3Code != "") {
							list.push({
								dept1Code_origin: data.deptList[i].dept1Code,
								dept1Code: data.deptList[i].dept1Code,
								dept1Name: data.deptList[i].dept1Name,
								dept2Code_origin: data.deptList[i].dept2Code,
								dept2Code: data.deptList[i].dept2Code,
								dept2Name: data.deptList[i].dept2Name,
								dept3Code_origin: data.deptList[i].dept3Code,
								dept3Code: data.deptList[i].dept3Code,
								dept3Name: data.deptList[i].dept3Name

							});
						} else {
							AUIGrid.clearGridData(myGridID2);

						}
					}

				}
				list1 = list.filter((evt1, i) => {
					return (
						list.findIndex((evt2, j) => {
							return evt1.dept3Code_origin === evt2.dept3Code_origin;
						}) === i
					)
				})
			}
			AUIGrid.setGridData("#grid_wrap2", list1);


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

// Details 데이터 요청 지연 타임아웃
var timerId = null;

// 마스터 그리드선택 변경 이벤트 핸들러
// 마스터 그리드에서 행을 선택한 경우 해당 행의 고객 ID(custId) 에 맞는
// 데이터를 요청하여 디테일 그리드에 표시합니다.
function auiGridSelectionChangeHandler(event) {
	AUIGrid.clearGridData(myGridID2);

	// 200ms 보다 빠르게 그리드 선택자가 변경된다면 데이터 요청 안함
	if (timerId) {
		clearTimeout(timerId);
	}

	timerId = setTimeout(function() {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell;

		// 대표 셀에 대한 전체 행 아이템
		document.getElementById("dName1").innerHTML = primeCell.item.dept1Name;
		document.getElementById("dCode1").innerHTML = primeCell.item.dept1Code;

		findDataToServer1("/base/dept-list", primeCell.item);


		// rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
		//requestMyData("./data/getJsonDetails.php?id=" + custId, myGridID2);


	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
};
function auiGridSelectionChangeHandler1(event) {
	
	if (timerId) {
		clearTimeout(timerId);
	}

	timerId = setTimeout(function() {
		var primeCell = event.primeCell;
		
		document.getElementById("dName2").innerHTML = primeCell.item.dept2Name;
		document.getElementById("dCode2").innerHTML = primeCell.item.dept2Code;
	
		
		findDataToServer2("/base/dept-list", primeCell.item);


	}, 200);
};
function auiGridSelectionChangeHandler2(event) {
	if (timerId) {
		clearTimeout(timerId);
	}

	timerId = setTimeout(function() {
		var primeCell = event.primeCell;
		
		document.getElementById("dName3").innerHTML = primeCell.item.dept3Name;
		document.getElementById("dCode3").innerHTML = primeCell.item.dept3Code;
	



	}, 200);
};

/*처음 페이지에서 자동 선택
function auiGridCompleteHandler(event) {
	
AUIGrid.selectRowsByRowId(myGridID, "001");
	
	
}
function auiGridCompleteHandler1(event) {
	
AUIGrid.selectRowsByRowId(myGridID1, "001");
	
}
*/

function addRow(grid,rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID, item, rowPos);	
};
function removeRow() {


	AUIGrid.removeRow(myGridID, "selectedIndex");
};
function addRow1(grid,rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID1, item, rowPos);	
};
function removeRow1() {


	AUIGrid.removeRow(myGridID1, "selectedIndex");
};

function addRow2(grid,rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID2, item, rowPos);	
};
function removeRow2() {


	AUIGrid.removeRow(myGridID2, "selectedIndex");
};


function updateDataToServer1( url, workingType ) {
	
	var dCode1 = $("#dCode1").text();
	var dCode2 = $("#dCode2").text();
	var dCode3 = $("#dCode3").text();
	var dName1 = $("#dName1").text();
	var dName2 = $("#dName2").text();
	var dName3 = $("#dName3").text();
	
	//var primeCell = event.primeCell;
		
 	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
  	var addList1 = AUIGrid.getAddedRowItems(myGridID1);                   
  	var addList2 = AUIGrid.getAddedRowItems(myGridID2);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID); 
	var updateList1 = AUIGrid.getEditedRowColumnItems(myGridID1); 
	var updateList2 = AUIGrid.getEditedRowColumnItems(myGridID2); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);
	var removeList1 = AUIGrid.getRemovedItems(myGridID1);
	var removeList2 = AUIGrid.getRemovedItems(myGridID2);
    
	
	var isValid = AUIGrid.validateGridData(myGridID, ["dept1Code", "dept1Name"], "부서코드, 지점명은 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["dept1Code", "dept1Name"], "지점코드, 지점명은 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValid1 = AUIGrid.validateGridData(myGridID1, ["dept2Code", "dept2Name"], "부서코드, 부서명은 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID1, ["dept2Code", "dept2Name"], "부서코드, 부서명은 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValid2 = AUIGrid.validateGridData(myGridID2, ["dept3Code", "dept3Name"], "파트코드, 파트명은 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged2 = AUIGrid.validateChangedGridData(myGridID2, ["dept3Code", "dept3Name"], "파트코드, 파트명은 반드시 유효한 값을 직접 입력해야 합니다.");
		
	if (isValid == false || isValidChanged == false || isValid1 == false || isValidChanged1 == false || isValid2 == false || isValidChanged2 == false) {
		return;
	}
	
	
	var data = {};
	
	//console.log(addList.length);
	//console.log("data.result_code" + data.result_code);

	if(addList.length > 0) data.deptAdd = addList;
	else data.deptAdd = [];
	
	if(updateList.length > 0) data.deptUpdate = updateList;
	else data.deptUpdate = [];
	
	if(removeList.length > 0) data.deptRemove = removeList;
	else data.deptRemove = [];
	
	if(addList1.length > 0) data.dept1Add = addList1;
	else data.dept1Add = [];
	
	if(updateList1.length > 0) data.dept1Update = updateList1;
	else data.dept1Update = [];
	
	if(removeList1.length > 0) data.dept1Remove = removeList1;
	else data.dept1Remove = [];
	
	if(addList2.length > 0) data.dept2Add = addList2;
	else data.dept2Add = [];
	
	if(updateList2.length > 0) data.dept2Update = updateList2;
	else data.dept2Update = [];
	
	if(removeList2.length > 0) data.dept2Remove = removeList2;
	else data.dept2Remove = [];

	
	
	data.workingType = workingType;
	data.dept1Code = dCode1;	
	data.dept2Code = dCode2;
	data.dept3Code = dCode3;
	
	data.dept1Name = dName1;	
	data.dept2Name = dName2;
	data.dept3Name = dName3;

	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);
	        location.reload();
	       //AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	       // 모두 초기화.
			AUIGrid.resetUpdatedItems(myGridID2, "a");
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};











