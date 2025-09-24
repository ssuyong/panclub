
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID2;


$(document).ready(function(){
//$(window).load(function(){

	createAUIGrid(columnLayout);
	createAUIGrid2(columnLayout2);


	findDataToServer("/logis/cCustSaleDcRate-list", "CUST-LIST");
	findDataToServer("/logis/cCustSaleDcRate-list", "BASE-LIST"); //기본 할인율 마진율 가져오기

	
	$("#btnReg").click(function() {
		updateDataToServer("/logis/cCustSaleDcRateAdd");
		
	});
	


});


// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	//	saveColumnLayout();
};


var keyValueList3 = findSrchMakerCode("/base/code-list");
var keyValueList4 = JSON.parse(keyValueList3);

	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField : "custCode_origin",    headerText : "거래처코드_origin" , visible : false,editable: false} 
	,{ dataField : "custCode",    headerText : "거래처코드" ,editable: false} 
	,{ dataField : "custName",     headerText : "거래처명" ,editable : true
		
		,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");
					
					if(event.item.custCode != event.item.custCode_origin){
					$("#grid_wrap").val("custCode");
					$("#grid_wrap").val("custName");
					var dialogCust;
					dialogCust = $( "#dialog-form-cust" ).dialog({
					    //autoOpen: false,
					    height: 700,
					    //minWidth: 500,
					    width: "70%",
					    modal: true,
					    headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position:[400,400],
						buttons: {
							"확인": function(event) {
								updateGridRowCust("custCode", "custName", 'Y');
							},
							"취소": function (event) {
								dialogCust.dialog("close");
							}
						},
					    close: function() {
					     // $( "#users tbody tr td" ).empty();	   	
					    }
					});	
					createGridCust(columnLayoutCust,'','','Y');  // 2023.07.24 hsg  - onGrid=Y
					//createGridCust(columnLayoutCust)
					dialogCust.dialog("open");
					}
					}
			}
	}
];

var columnLayout2 = [ 
	{ dataField : "makerCode_origin",    headerText : "제조사코드" , visible : false ,editable: false} 
	,{ dataField : "makerCode",    headerText : "제조사코드" ,editable: false} 
	,{ dataField : "makerName",     headerText : "제조사명" ,editable: true
		,sortType: 1,			
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
		},
	 }
	,{ dataField : "dcRate",   headerText : "할인율" , dataType: "numeric" ,formatString: "#,##0"
	,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18	,allowNegative         : true   	}}
	,{ dataField : "marginRate",   headerText : "마진율" , dataType: "numeric"  ,editable: true
	,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18	,allowNegative         : true  }  }
];
const columnLayout_base = [ 
	{ dataField : "makerCode_origin",    headerText : "제조사코드" , visible : false ,editable: false} 
	,{ dataField : "makerCode",    headerText : "제조사코드" ,editable: false} 
	,{ dataField : "makerName",     headerText : "제조사명" ,editable: false
		,sortType: 1,			
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
 
	 }
	,{ dataField : "dcRate",   headerText : "할인율" , dataType: "numeric" ,formatString: "#,##0"
	,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18	,allowNegative         : true   	}}
	,{ dataField : "marginRate",   headerText : "마진율" , dataType: "numeric"  ,editable: true
	,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18	,allowNegative         : true   	} }
];
 
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
		editable: true,

		// 상태 칼럼 사용
		//showStateColumn : true
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,
		//enableCellMerge: true,
		enableFilter: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		//rowIdField: "insurIdx",
		showAutoNoDataMessage : false,

		rowIdField: "custCode_origin", 
		
		softRemoveRowMode : false
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});
	

	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {
		
	});
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	AUIGrid.bind(myGridID, "cellEditBegin", function (event) {
		
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
	
	});
	
	AUIGrid.bind(myGridID, "cellClick", auiGridSelectionChangeHandler);
		
}

function createAUIGrid2(columnLayout) {
	
	var auiGridProps = {			
		editable: true, 
		// 상태 칼럼 사용
		//showStateColumn : true
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,
		//enableCellMerge: true,
		enableFilter: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		//rowIdField: "insurIdx",
		showAutoNoDataMessage : false,
		rowIdField: "makerCode_origin", 
		softRemoveRowMode : false
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, auiGridProps);
	AUIGrid.create("#grid_wrap_default", columnLayout_base, auiGridProps);
	
	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID2, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});

	var currentPage = 1;
	AUIGrid.bind(myGridID2, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
	
	AUIGrid.bind(myGridID2, "cellEditBegin", function (event) {
		
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");
		if (event.dataField == "makerName") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) { 
				return true;
			} else {
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
			}
		}
		return true; // 다른 필드들은 편집 허용
	
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID2, "cellDoubleClick", function (event) {

	});	

	AUIGrid.bind(myGridID2, "cellEditEnd", function(event) {
	 	 
		
		if (event.dataField == "makerName") {
			if(!(AUIGrid.isUniqueValue(myGridID2 , "makerCode" , event.item.makerName)))
			{
				alert("중복된 제조사명을 선택하셨습니다");
				AUIGrid.updateRow(myGridID2, { "makerName": '' }, event.rowIndex);
				return;
			}
			AUIGrid.updateRow(myGridID2, { "makerCode": event.item.makerName }, event.rowIndex);
			AUIGrid.updateRow(myGridID2, { "makerCode_origin": event.item.makerName }, event.rowIndex);		
		}		
	});	
		
}



function addRow(grid,rowPos) {
	var item = new Object();

	AUIGrid.addRow(grid, item, rowPos);	
};
function removeRow(grid) {


	AUIGrid.removeRow(grid, "selectedIndex");
};



/*외주창고목록찾기 */
function findSrchCCust(url) {
	var list = []; //자바스크립트 배열선언
	var listS;

	var consignYN = 'Y'
	var checkType = 'CUST-LIST'
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			consignYN : consignYN
			,checkType: checkType
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.storageList.length == 0){
						
			}else{
				var j = 0;				
				for(i=0;i<data.storageList.length;i++){
					custCode = data.storageList[i].consignCustCode;
					custName = data.storageList[i].consignCustName; 
					
					list[j] = { "code": custCode, "value": custName };
					j = j + 1;
					
				}
			}

			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!		
			
		},
		error:function(x,e){
			if(x.status==0){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
	        }else if(x.status==404){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
	        }else if(x.status==500){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
	        }else if(e=='parsererror'){
	            alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
	        }else if(e=='timeout'){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
	        }else {
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
	        }
		}
	});
	
	return listS;
	
}


function findSrchMakerCode(url) {
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
					if (data.codeList[i].mCode == "1000") {
						code = data.codeList[i].code;
						codeName = data.codeList[i].codeName;

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


function updateDataToServer(url) {
	
 
	
	const defaultDcData =  AUIGrid.getEditedRowItems("#grid_wrap_default");  // 디폴트 할인율은 추가삭제가 없으므로 수정된 행데이터만 받아옴
	const custGridData = AUIGrid.getGridData(myGridID);
	const selectCustDcData = AUIGrid.getGridData(myGridID2);
	const selectCustCode = $("#selectCustCode").val();
	
	const  isValid = AUIGrid.validateGridData(myGridID, ["custCode"], "위탁업체코드는 반드시 유효한 값을 직접 입력해야 합니다."); 
	const  isValid2 = AUIGrid.validateGridData(myGridID2, ["makerCode", "dcRate"], "제조사코드, 할인율은 반드시 유효한 값을 직접 입력해야 합니다.") ;
						
	if(!isValid || !isValid2) return; // 거래처명 팝업을 통해서 거래처코드를 등록 안하면 통과 불가능, 거래처의 할인율입력시에도 제조사명 셀렉트박스를 통해서 제조사코드를 입력 안하면 불가능
	 
	
	// 변동된 거래처 정보 전달,  변경된 기본+선택된 거래처들의 할인율과 마진율 전달
	
	let custCodeArr = ''; //거래처코드만 있으면 거래처명은 알수있으니 거래처 코드만 string화 해서 전달
	for(let i = 0 ; i < custGridData.length ; i++)
	{
		if(i > 0) custCodeArr += '^';
		custCodeArr += custGridData[i].custCode;
	}
	
	//디폴트 할인데이터 
	let def_MakerCodeArr = '';
	let def_dcArr = '';
	let def_marginArr = '';
	for(let i = 0 ; i < defaultDcData.length ; i++)
	{
		if(i>0) 
		{
			def_MakerCodeArr +='^';
			def_dcArr +='^';
			def_marginArr +='^';
		}
		def_MakerCodeArr += defaultDcData[i].makerCode;
		def_dcArr += (defaultDcData[i].dcRate) ?? 0;
		def_marginArr += (defaultDcData[i].marginRate) ?? 0; 
	}
	//선택된 거래처의 할인 데이터
	let sel_MakerCodeArr = '';
	let sel_dcArr = '';
	let sel_marginArr = '';
	for(let i = 0 ; i < selectCustDcData.length ; i++)
	{
		if(i>0) 
		{
			sel_MakerCodeArr +='^';
			sel_dcArr +='^';
			sel_marginArr +='^';
		}
		sel_MakerCodeArr += selectCustDcData[i].makerCode;
		sel_dcArr += (selectCustDcData[i].dcRate) ?? 0;
		sel_marginArr += (selectCustDcData[i].marginRate) ?? 0 ; 
	}
	
	
	const data = {selectCustCode , custCodeArr ,
				def_MakerCodeArr , def_dcArr ,def_marginArr , 
				sel_MakerCodeArr ,  sel_dcArr,  sel_marginArr};
 
  
	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data,
		success: function(data) { 
			
			if(data.db_resultCode == 'OK')
			{
				alert(data.db_resultMsg);	//저장 성공시 디폴트 기본 할인율 그리드와 거래처 리스트 갱신후 선택된 거래처 할인율 그리드 재통신으로 셋팅 확인시켜줌
				findDataToServer("/logis/cCustSaleDcRate-list", "CUST-LIST");
				findDataToServer("/logis/cCustSaleDcRate-list", "BASE-LIST");  
			 
				
				AUIGrid.clearGridData("#grid_wrap2");
					 	$("#selCustCode").text('');
					 	$("#selCustName").text('');
				
			}
			
		},
		error: function(request, status, error) {
			//alert("code:" + request.status + "\n" + "error:" + error);
		 
			//alert(data.result_code + ":" + data.result_msg);

		}
	});

//	var addList = AUIGrid.getAddedRowItems(myGridID);
//	var updateList = AUIGrid.getEditedRowColumnItems(myGridID);
//	var updateItem = AUIGrid.getEditedRowItems(myGridID);
//	var removeList = AUIGrid.getRemovedItems(myGridID);
//	
//	var addList2 = AUIGrid.getAddedRowItems(myGridID2);
//	var updateList2 = AUIGrid.getEditedRowColumnItems(myGridID2);
//	var updateItem2 = AUIGrid.getEditedRowItems(myGridID2);
//	var removeList2 = AUIGrid.getRemovedItems(myGridID2);
//	
//	var selectCustCode = $("#selectCustCode").val();
//
//
//	var isValid = AUIGrid.validateGridData(myGridID, ["custCode"], "위탁업체코드는 반드시 유효한 값을 직접 입력해야 합니다.");
//
//	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["custCode"], "위탁업체코드는 반드시 유효한 값을 직접 입력해야 합니다.");
//	
//	var isValid2 = AUIGrid.validateGridData(myGridID2, ["makerCode", "dcRate"], "제조사코드, 할인율은 반드시 유효한 값을 직접 입력해야 합니다.");
//
//	var isValidChanged2 = AUIGrid.validateChangedGridData(myGridID2, ["makerCode", "dcRate"], "제조사코드, 할인율은 반드시 유효한 값을 직접 입력해야 합니다.");
// 	
//  
//  	
//	if (isValid == false || isValidChanged == false || isValid2 == false || isValidChanged2 == false) {
//		return;
//	}
//
//
//	var data = {};
//
//	if (addList.length > 0) {
//		data.addList = addList;
//	} else data.addList = [];
//
//	if (updateList.length > 0) {
//		data.uptItem = updateItem
//		data.uptList = updateList;
//	} else {data.uptItem = [];
//			data.uptList = [];
//	}
//
//	if (removeList.length > 0) data.delList = removeList;
//	else data.delList = [];
//	
//	if (addList2.length > 0) {
//		data.addList2 = addList2;
//	} else data.addList2 = [];
//
//	if (updateList2.length > 0) {
//		data.uptItem2 = updateItem2
//		data.uptList2 = updateList2;
//	} else {data.uptItem2 = [];
//			data.uptList2 = [];
//	}
//
//	if (removeList2.length > 0) data.delList2 = removeList2;
//	else data.delList2 = [];
//	
//	data.selectCustCode = selectCustCode;
//	
//
//	$.ajax({
//		url: url,
//		dataType: "json",
//		type: "POST",
//		contentType: "application/json; charset=utf-8",
//		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
//		data: JSON.stringify(data),
//		success: function(data) {
//			alert(data.result_code + ":" + data.result_msg);
//			location.reload();
//		},
//		error: function(request, status, error) {
//			//alert("code:" + request.status + "\n" + "error:" + error);
//			alert(data.result_code + ":" + data.result_msg);
//
//		}
//	});

};

function findDataToServer(url, workingType) {
	var list = [];
	var selectCustCode = $("#selectCustCode").val();
	var data = {};
	
	 
	data.workingType = workingType
	data.selectCustCode = selectCustCode
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType" : workingType,
			"selectCustCode" : selectCustCode
		},
		//async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) { 
			if (data.cCustSaleDcRateList.length == 0) {
				if(workingType == "CUST-LIST"){
					AUIGrid.clearGridData(myGridID);
				}
				else if(workingType == "MAKER-LIST"){
					AUIGrid.clearGridData(myGridID2);
					$("#selCustCode").text(selectCustCode);
					$("#selCustName").text((AUIGrid.getItemsByValue(myGridID , "custCode" ,selectCustCode))[0].custName);
				}
				else if(workingType =='BASE-LIST'){
					AUIGrid.clearGridData("#grid_wrap_default");
				}
				//alert("조건에 맞는 자료가 없습니다.");
			} else {
				
				if(workingType == "CUST-LIST"){
					for (i = 0; i < data.cCustSaleDcRateList.length; i++) {
						list.push({						
							custCode_origin: data.cCustSaleDcRateList[i].custCode,
							custCode: data.cCustSaleDcRateList[i].custCode,
							custName: data.cCustSaleDcRateList[i].custName
	
						});

					}
					
					AUIGrid.setGridData("#grid_wrap", list);
					
				}				
				else if(workingType == "MAKER-LIST" || workingType =='BASE-LIST'){
			 
					for (i = 0; i < data.cCustSaleDcRateList.length; i++) {
						list.push({						
							makerCode_origin: data.cCustSaleDcRateList[i].makerCode,
							makerCode: data.cCustSaleDcRateList[i].makerCode,
							makerName: data.cCustSaleDcRateList[i].makerCode,
							dcRate: data.cCustSaleDcRateList[i].dcRate,						
							marginRate : data.cCustSaleDcRateList[i].marginRate	
						});

					}
					if(workingType == "MAKER-LIST")
					{
						AUIGrid.setGridData("#grid_wrap2", list);
					 	$("#selCustCode").text(selectCustCode);
					 	$("#selCustName").text((AUIGrid.getItemsByValue(myGridID , "custCode" ,selectCustCode))[0].custName);
					 	 
					}
					else if(workingType =='BASE-LIST')
						AUIGrid.setGridData("#grid_wrap_default", list);
						
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

var timerId = null;

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
		//document.getElementById("custCode").innerHTML = event.item.custName;
		
		$("#selectCustCode").val(event.item.custCode);
		
		
		if($("#selectCustCode").val() != ''){
			findDataToServer("/logis/cCustSaleDcRate-list","MAKER-LIST");
						
		}else{
			AUIGrid.clearGridData(myGridID2);
		}
		


		// rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
		//requestMyData("./data/getJsonDetails.php?id=" + custId, myGridID2);


	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
	
};


function updateGridRowCust(obj,name, gridYN) {
 
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
 
	if (gridYN == 'Y') {	
		item = {
						placeCustCode: rowItem.custCode,
						placeCustName: rowItem.custName,
					};
		  
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.custCode);
			$("#"+name+"").val(rowItem.custName);
	}
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");	
	dialogCust.dialog("close");	
	 
	
}


//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
 
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
 	var mName = mCodeSel.attr('mname');
 	
  
 	
 	
	var item = {};
	item.admCode = mCode; 
	item.admName = mName; 

	AUIGrid.updateRow(myGridID, item, currentRowIndex);

}

function auiCellEditingHandler(event) { 
 
	if (event.dataField == 'custName'){

		$("#grid-custCode1").val("custCode");
		$("#grid-custName1").val("custName");
		
		//findCust(this,'',0,'Y');
		findCust(event,'',0,'','Y');
		//addRow(myGridID, "last")
		//findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	    fn_dcProc();
		//setStopSpinner();
	    
	}
	 
	if (event.type == "cellEditBegin") {
		
	} else if (event.type == "cellEditEnd") {

		
	} else if (event.type == "cellEditCancel") {
	}
	
	
	
};
