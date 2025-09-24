// 그리드 생성 후 해당 ID 보관 변수

var myGridID; //정동근추가
var myGridIDItem;


// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function() { // script가 html 로드 후 실행하게 해주는 구문 정동근
	findDataToServer2("/base/storage-list", 1);
	keyValueList1 = findDataToServer1("/base/storage-list", 1);
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(keyValueList1);
//	findDataToServer("/base/rack-list", 1);


	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var storageCode = info[0];
        var rackCode = info[1];
        var rackName = info[2];
        var barcode = info[3];
		       
        if ( typeof storageCode == 'undefined'){ storageCode = ''	}
        if ( typeof rackCode == 'undefined'){ rackCode = ''	}
        if ( typeof rackName == 'undefined'){ rackName = ''	}
	    if ( typeof barcode == 'undefined'){ barcode = ''	}
	    
        $("#storageCode").val(storageCode);
		$("#rackCode").val(rackCode);
		$("#rackName").val(rackName);
		$("#barcode").val(barcode);
		
        findDataToServer("/base/rack-list", 1);
  	}
  	
	$("#btnFind").click(function() {
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var storageCode_val = $("#storageCode").val();
		var rackCode_val = $("#rackCode").val();
		var rackName_val = $("#rackName").val();
		var barcode_val = $("#barcode").val();
		document.location.hash = '#info' + storageCode_val + "!" + rackCode_val + "!" + rackName_val + "!" + barcode_val;

		findDataToServer("/base/rack-list", 1);
	});

	$("#btnReg").click(function() {
		//alert("저장버튼");
		updateDataToServer("/base/rackAdd", "workingType");

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
		{ dataField: "rackCode_origin", headerText: "코드원본", visible: false }
		, { dataField: "storageCode", headerText: "창고코드", width: 90, editable: false , visible: false}
		, {
			dataField: "storageName", headerText: "창고명",
			sortType: 1,
			cellMerge: true,
			editable: true, style : "left",
			renderer: {
					type: "IconRenderer",
					iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
					iconHeight: 16,
					iconPosition: "aisleRight",
					iconTableRef: { // icon 값 참조할 테이블 레퍼런스
						"default": "/resources/img/content_paste_search_black_24dp.svg" // default
					},
					onClick: function (event) {
						let dialogLogisStor;
						dialogLogisStor = $("#dialog-form-logisStor").dialog({
						    height: 700,
						    
						    width: "70%",
						    modal: true,
						    headerHeight: 40,
							position:[400,400],
							buttons: {
								"확인": function(event) {
										updateGridRowLogisStor("storageCode", "storageName", 'Y');
								},
								"취소": function (event) {
									dialogLogisStor.dialog("close");
								}
							},
						    close: function() {
						    }
						});	
						createGridLogisStor(columnLayoutLogisStor,'','','Y');
						dialogLogisStor.dialog("open");
					}
				}
		}  //230215 장윤상추가
		, { dataField: "rackCode", headerText: "랙 코드", width: 90, editable: false }
		, { dataField: "logisRackId", headerText: "기본랙ID", width: 90, editable: false }
		, { dataField: "rackName", headerText: "랙 이름", style : "left"
			,renderer: {
					type: "IconRenderer",
					iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
					iconHeight: 16,
					iconPosition: "aisleRight",
					iconTableRef: { // icon 값 참조할 테이블 레퍼런스
						"default": "/resources/img/content_paste_search_black_24dp.svg" // default
					},
					onClick: function (event) {
						let dialogLogisRack;
						dialogLogisRack = $("#dialog-form-logisRack").dialog({
						    height: 700,
						    width: "70%",
						    modal: true,
						    headerHeight: 40,
							position:[400,400],
							buttons: {
								"확인": function(event) {
										updateGridRowLogisRack("logisRackId", "rackName", 'Y');
								},
								"취소": function (event) {
									dialogLogisRack.dialog("close");
								}
							},
						    close: function() {
						    }
						});	
						createGridLogisRack(columnLayoutLogisRack,'','','Y');
						dialogLogisRack.dialog("open");
					}
				}     
			}
		, { dataField: "barcode", headerText: "바코드" }		//230215 장윤상추가	
		, { dataField: "memo", headerText: "비고", style : "left"  }
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
		, { dataField: "regUserId", headerText: "등록자", editable: false , width: 160}
		, { dataField: "uptUserId", headerText: "수정자", editable: false, width: 160 }
		, { dataField: "storageName2", headerText: "창고명", editable: false, width: 160, visible: false }

	];

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

		selectionMode: "multipleCells",

		// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
		rowIdField: "rackCode_origin",
		
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
	/*
  	AUIGrid.bind(myGridID, "cellDoubleClick", function( event ) {
      if (event.dataField == 'rackName'){
			$("#pop_logisRack_srch").val(event.value);
			//findLogisRack('/logis/logis-rack-list', 0,event.rowIndex,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
			findLogisRack(event,'',0,'','Y');
	   }
	});
	*/
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}

//
function auiCellEditingHandler(event) { 
	if (event.dataField == 'rackName'){ 
		$("#grid-logisRackId").val("logisRackId");
		$("#grid-logisRackName").val("rackName"); 
		if(auigridRackBarcodeScan(event)) return	
		findLogisRack(event,'',0,'','Y');
	}
};
	
	
function findDataToServer(url, page) {
	
	var list = [];
	 
	var rackCode = $("#rackCode").val(); 
	var rackName = $("#rackName").val(); 
	var barcode = $("#barcode").val(); 	
	
	//현재 선택된 창고명을 가져와서 그 이름의 값에 담긴 창고코드 데이터를 가져옴
	const storCode = $('#storageCode [value="'+$("#storageText").val()+'"]');
	const storageCode = storCode.data('storagecode');

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"storageCode":storageCode,
			"rackCode":rackCode,
			"rackName":rackName,
			"barcode":barcode

		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.rackList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.rackList.length; i++) {
					comCode =  data.rackList[i].comCode;
					$("#comCode").val(comCode);
					list.push({
						rackCode_origin: data.rackList[i].rackCode
						, storageCode: data.rackList[i].storageCode
						, storageName: data.rackList[i].storageName
						, rackCode: data.rackList[i].rackCode
						, rackName: data.rackList[i].rackName
						, barcode: data.rackList[i].barcode
						, validYN: data.rackList[i].validYN
						, regUserId: data.rackList[i].regUserId
						, uptUserId: data.rackList[i].uptUserId
						, storageName2: data.rackList[i].storageName
						, logisRackId : data.rackList[i].logisRackId  //2024.06.11 hsg
						, memo : data.rackList[i].memo  //2024.06.11 hsg
					});

					//firstGrid_mst.setData(list); // 그리드에 데이터 설정

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
	var isValid1 = AUIGrid.validateGridData(myGridID, ["storageName", "rackName"], "창고명, 코드, 랙 이름 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["storageName","rackName"], "창고명, 코드, 랙 이름 필드는 반드시 유효한 값을 직접 입력해야 합니다.");

	
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}



	var data = {};

	if (addList.length > 0)
	{
		for(rack of addList)
		{
			rack.rackName = rack.rackName.toUpperCase();
		}
		data.rackAdd = addList;
	} 
	else data.rackAdd = [];
	//
	
	if (updateList.length > 0)
	{
		for(rack of updateList)
		{
			rack.rackName = rack.rackName.toUpperCase();
		}
		data.rackUpdate = updateList;
	} 
	else data.rackUpdate = [];
	
	if (removeList.length > 0) data.rackRemove = removeList;
	else data.rackRemove = [];

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
			
			if ( data.result_code == "OK") { //처리 성공한 겨우
                
	        	AUIGrid.removeSoftRows(myGridID); // 삭제 표시된 행(소프트 삭제) 그리드에서 제거
				AUIGrid.resetUpdatedItems(myGridID); // 현재 수정 정보 초기화
	        	
	        }else{
				AUIGrid.resetUpdatedItems(myGridID);	
				//errRowStyleFunction(data.errIdx);
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


function findDataToServer1(url, page) {
	
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

			if (data.storageList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				var j = 0;
				for (i = 0; i < data.storageList.length; i++) {

					storageCode = data.storageList[i].storageCode;
					storageName = data.storageList[i].storageName;

					//list[j] = {custName};					
					list[j] = { "code": storageCode, "value": storageName };
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
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		
		
		var idxSplit = idxArr.split("^");  
		for ( var h in idxSplit ) {
			if (item.rackCode == idxSplit[h]) {
				return "auigrid-err-row-style";
			}
		}

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};


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


function errRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		
		
		var idxSplit = idxArr.split("^");  
		for ( var h in idxSplit ) {
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
function printBarcode(){
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
		rackName =  "["+rowItem.item.storageName2+"]" + rowItem.item.rackName ;
		
		if (i == 0) {
			reqArr = barcode;		
			reqArr2 = rackName	
		
		}else{
			reqArr = reqArr + "^" +barcode;		
			reqArr2 = reqArr2 + "^" +rackName;		
		}

	}
	comCode =  $("#comCode").val(); 

	var url = "/base/rack-list-print?reqArr=" + encodeURIComponent(reqArr) + "&reqArr2=" + encodeURIComponent(reqArr2)+ "&comCode=" + comCode;
	window.open(url, "_blank","width=600,height=400");
}


function barcodePrintRack()
{ 
	barcodePrintItem();
}
function rackItemMove()
{
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if(checkedItems.length != 1)
	{
		alert("이동할 랙을 하나 선택해주세요.");
		return;
	} 
	let selectRack = '';
	for(row of checkedItems)
	{
		if(selectRack != '') selectRack += ',';
		selectRack += row.item.rackCode;
	}  
	window.open(window.location.origin+'/logis/stock-wr-up?selectRack='+selectRack);
}


////////////////////////////////////////////////////////////////////////////////////////////
//물류센터별 기본랙 찾기. 2024.06.10
// 칼럼 레이아웃 작성
var columnLayoutLogisRack = [
	  { dataField: "logisRackId", headerText: "기본랙ID", editable: false }
	, { dataField: "logisCode", headerText: "물류센터",		editable: false	}
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

var columnLayoutLogisStor = [
	  { dataField: "storageCode", headerText: "창고코드", editable: false }
	, { dataField: "logisCode", headerText: "물류센터코드",		editable: false	}
	, { dataField: "logisName", headerText: "물류센터",		editable: false	}
	, { dataField: "storageName", headerText: "창고명" }
	, { dataField: "memo", headerText: "비고" }
	, {	dataField: "validYN", headerText: "사용유무", width: 60	}
	, { dataField: "regUserId", headerText: "등록자", editable: false, width: 160 }
	, { dataField: "uptUserId", headerText: "수정자", editable: false, width: 160 }
];
	

function createGridLogisRack(columnLayoutLogisRack, obj, name,onGrid ) {
	
	wvar_obj = obj;
	wvar_name = name;
	wvar_onGrid = onGrid;
	
	var auiGridProps = {
		usePaging: true,
		enableFocus: true,
		showPageRowSelect: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage: false,
		editable :false
	};

	myGridIDLogisRack = AUIGrid.create("#grid_wrap_logisRack", columnLayoutLogisRack, auiGridProps);
	
	AUIGrid.bind(myGridIDLogisRack, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	AUIGrid.bind(myGridIDLogisRack, "cellDoubleClick", function(event) {
		var rowItem, rowInfoObj
		var selectedItems = AUIGrid.getSelectedItems(myGridIDLogisRack);
		rowInfoObj = selectedItems[0];
		rowItem = rowInfoObj.item;
		
		if (onGrid == 'Y' ) {  //그리드에서 팝업한 경우
			//var pop_LogisRackId = $("#pop_logisRackId").val();
			item = {
				logisRackId: rowItem.logisRackId,
				rackName: rowItem.logisRackName,
			};
			//document.getElementById("pop_logisRackId").value = "";
			document.getElementById("pop_logisRack_srch").value = "";
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		} else { 
			//updateGridRowCust("placeCustCode", "placeCustName", 'Y'); //230720 yoonsang 추가
			$(obj).val(rowItem.logisRackId);
			$("#" + name + "").val(rowItem.logisRackName);
		}

		var dialogLogisRack;
		dialogLogisRack = $("#dialog-form-logisRack").dialog({
			height: 700,
			width: "70%",
			modal: true,
			headerHeight: 40,
			position: [400, 400],
			buttons: {
				//"확인": updateGridRow,
				"확인": function(event) {
							updateGridRowLogisRack(obj, name);
						}, //	
				"취소": function(event) {
					dialogLogisRack.dialog("close");
				}
			},
			close: function() {
			}
		});

		dialogLogisRack.dialog("close");
	});

	AUIGrid.bind(myGridIDLogisRack, "keyDown", function(event) {
		
		if (event.keyCode == 13) { // Insert 키
			var rowItem, rowInfoObj
			var selectedItems = AUIGrid.getSelectedItems(myGridIDLogisRack);
			rowInfoObj = selectedItems[0];
			rowItem = rowInfoObj.item;
			$(obj).val(rowItem.logisRackId);
			$("#" + name + "").val(rowItem.logisRackName);

			var dialogLogisRack;
			dialogLogisRack = $("#dialog-form-logisRack").dialog({
				height: 700,
				width: "70%",
				modal: true,
				headerHeight: 40,
				position: [400, 400],
				buttons: {
					//"확인": updateGridRow,
					"확인": function(event) {
							updateGridRowLogisRack(obj, name);
						}, //	
					"취소": function(event) {
						dialogLogisRack.dialog("close");
					}
				},
				close: function() {
				}
			});
			dialogLogisRack.dialog("close");
			return false; // 기본 행위 안함.
		}
	});
}

function createGridLogisStor(columnLayoutLogisStor, obj, name,onGrid ) {
	
	wvar_obj = obj;
	wvar_name = name;
	wvar_onGrid = onGrid;
	
	var auiGridProps = {
		usePaging: true,
		enableFocus: true,
		showPageRowSelect: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage: false,
		editable :false
	};

	myGridIDLogisStor = AUIGrid.create("#grid_wrap_logisStor", columnLayoutLogisStor, auiGridProps);
	
	AUIGrid.bind(myGridIDLogisStor, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	AUIGrid.bind(myGridIDLogisStor, "cellDoubleClick", function(event) {
		var rowItem, rowInfoObj
		var selectedItems = AUIGrid.getSelectedItems(myGridIDLogisStor);
		rowInfoObj = selectedItems[0];
		rowItem = rowInfoObj.item;
		
		if (onGrid == 'Y' ) {  //그리드에서 팝업한 경우
			//var pop_LogisRackId = $("#pop_logisRackId").val();
			item = {
				storageCode: rowItem.storageCode,
				storageName: rowItem.storageName,
			};
			//document.getElementById("pop_logisRackId").value = "";
			document.getElementById("pop_logisStor_srch").value = "";
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		} else { 
			//updateGridRowCust("placeCustCode", "placeCustName", 'Y'); //230720 yoonsang 추가
			$(obj).val(rowItem.storageCode);
			$("#" + name + "").val(rowItem.storageName);
		}

		var dialogLogisStor;
		dialogLogisStor = $("#dialog-form-logisStor").dialog({
			height: 700,
			width: "70%",
			modal: true,
			headerHeight: 40,
			position: [400, 400],
			buttons: {
				//"확인": updateGridRow,
				"확인": function(event) {
							updateGridRowLogisStor(obj, name);
						}, //	
				"취소": function(event) {
					dialogLogisStor.dialog("close");
				}
			},
			close: function() {
			}
		});

		dialogLogisStor.dialog("close");
	});

	AUIGrid.bind(myGridIDLogisStor, "keyDown", function(event) {
		
		if (event.keyCode == 13) { // Insert 키
			var rowItem, rowInfoObj
			var selectedItems = AUIGrid.getSelectedItems(myGridIDLogisStor);
			rowInfoObj = selectedItems[0];
			rowItem = rowInfoObj.item;
			$(obj).val(rowItem.storageCode);
			$("#" + name + "").val(rowItem.storageName);

			var dialogLogisStor;
			dialogLogisStor = $("#dialog-form-logisStor").dialog({
				height: 700,                  
				width: "70%",
				modal: true,
				headerHeight: 40,
				position: [400, 400],
				buttons: {
					//"확인": updateGridRow,
					"확인": function(event) {
							updateGridRowLogisStor(obj, name);
						}, //	
					"취소": function(event) {
						dialogLogisStor.dialog("close");
					}
				},
				close: function() {
				}
			});
			dialogLogisStor.dialog("close");
			return false; // 기본 행위 안함.
		}
	});
}
	
	
//function findLogisRack(url, page, rowIndex, popYN, isPopOpen , workingType = 'LIST') {	
function findLogisRack(obj, name, page, popYN,onGrid){	
	var list = [];
	$("#" + name + "").val("");
	let logisRackSrch = "";


	if (event.keyCode == 13 ) {		
		if (popYN == 'Y'){
			$("#pop_logisRack_srch").val();
		} else{
			$("#pop_logisRack_srch").val(obj.value);
		}

		logisRackSrch = "";
		logisRackSrch = $("#pop_logisRack_srch").val();
			
		$.ajax({
			type: "POST",
			url: "/logis/logis-rack-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"logisRackName": logisRackSrch
				,"validYN":'Y'	
			},
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {
					
				if (data.logisRackList.length != 1) { //데이터가 1건이 아닌경우 
					//거래처
					var dialogLogisRack;
					dialogLogisRack = $("#dialog-form-logisRack").dialog({
						height: 700,
						width: "50%",
						modal: true,
						headerHeight: 40,
						position: [400, 400],
						buttons: {
							"확인": function(event) {
								updateGridRowLogisRack(obj, name);
							}, //		,
							"취소": function(event) {
								dialogLogisRack.dialog("close");
							}
						},open: function(){
								$("#grid_wrap_logisRack").focus();
								$("#pop_logisRack_srch").focus();
							},
						close: function() {
						}
					});
					// 그리드 생성 후 해당 ID 보관 변수
					var myGridIDLogisRack;
					// AUIGrid 그리드를 생성합니다.
					createGridLogisRack(columnLayoutLogisRack, obj, name,onGrid);
					if (popYN == 'Y') {
					} else {
						dialogLogisRack.dialog("open");
					}				

					for (i = 0; i < data.logisRackList.length; i++) {
						list.push({
						 logisRackId: data.logisRackList[i].logisRackId
						, logisCode: data.logisRackList[i].logisCode
						, logisName: data.logisRackList[i].logisName
						, logisRackName: data.logisRackList[i].logisRackName
						, memo: data.logisRackList[i].memo
						, validYN: data.logisRackList[i].validYN
						, regUserId: data.logisRackList[i].regUserId
						, uptUserId: data.logisRackList[i].uptUserId
						});
					}
					AUIGrid.setGridData("#grid_wrap_logisRack", list);		
					// 해당 페이지로 이동
					if (page > 1) {
						AUIGrid.movePageTo(myGridIDLogisRack, Number(page));
					}
				} else { //데이터가 1건인 경우 

					if(onGrid != 'Y'){
						if(popYN == 'Y'){
							var dialogLogisRack;
							dialogLogisRack = $("#dialog-form-logisRack").dialog({
							height: 700,
							width: "50%",
							modal: true,
							headerHeight: 40,
							position: [400, 400],
							buttons: {
								"확인": function(event) {
									updateGridRowLogisRack(obj, name);
								}, //		,
								"취소": function(event) {
									dialogLogisRack.dialog("close");
								}
							},
							close: function() {
							}
							});
						    // 그리드 생성 후 해당 ID 보관 변수
							var myGridIDLogisRack;
							createGridLogisRack(columnLayoutLogisRack, obj, name,onGrid);
							for (i = 0; i < data.logisRackList.length; i++) {
								list.push({
									 logisRackId: data.logisRackList[i].logisRackId
									, logisCode: data.logisRackList[i].logisCode
									, logisName: data.logisRackList[i].logisName
									, logisRackName: data.logisRackList[i].logisRackName
									, memo: data.logisRackList[i].memo
									, validYN: data.logisRackList[i].validYN
									, regUserId: data.logisRackList[i].regUserId
									, uptUserId: data.logisRackList[i].uptUserId
								});	
							}	
							AUIGrid.setGridData("#grid_wrap_logisRack", list);		
							if (page > 1) {
								AUIGrid.movePageTo(myGridIDLogisRack, Number(page));
							}
						}else{
							for (i = 0; i < data.logisRackList.length; i++) {
									obj.value = data.logisRackList[i].logisRackId;
									$("#" + name + "").val(data.logisRackList[i].logisRackName);
							}							
						}							
					}if(onGrid == 'Y'){
						for (i = 0; i < data.logisRackList.length; i++) {
							item = {
								 logisRackId: data.logisRackList[i].logisRackId
								//, logisCode: data.logisRackList[i].logisCode
								//, logisName: data.logisRackList[i].logisName
								, logisRackName: data.logisRackList[i].logisRackName
								//, memo: data.logisRackList[i].memo
								//, validYN: data.logisRackList[i].validYN
								//, regUserId: data.logisRackList[i].regUserId
								//, uptUserId: data.logisRackList[i].uptUserId
							};
							AUIGrid.updateRow(myGridID, item, "selectedIndex");
						}
					}					
				}
				$(".ui-dialog-titlebar-close").html("X");
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
	}else{//엔터키를 안쳤을경우
					
		if (onGrid == 'Y'){
			$("#pop_logisRack_srch").val(obj.value);
			let logisRackSrch = "";
			logisRackSrch = $("#pop_logisRack_srch").val();
		
			$.ajax({
				type: "POST",
				url: "/logis/logis-rack-list",
				dataType: "json",
				data: {
					"workingType": "LIST",
					"logisRackName": logisRackSrch
					,"validYN": "Y"
				},
				async: false,
				//contentType: "application/json; charset=utf-8",
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				success: function(data) {
					if (data.logisRackList.length != 1) { //데이터가 1건이 아닌경우 
						//거래처
						if (onGrid == 'Y'){
							var dialogLogisRack;
							dialogLogisRack = $("#dialog-form-logisRack").dialog({
								height: 700,
								width: "50%",
								modal: true,
								headerHeight: 40,
								position: [400, 400],
								buttons: {
									"확인": function(event) {
										updateGridRowLogisRack(obj, name);
									}, //		,
									"취소": function(event) {
										dialogLogisRack.dialog("close");
									}
								},
								close: function() {
								}
							});
							// 그리드 생성 후 해당 ID 보관 변수
							var myGridIDLogisRack;
							// AUIGrid 그리드를 생성합니다.
							createGridLogisRack(columnLayoutLogisRack, obj, name,onGrid);
							dialogLogisRack.dialog("open");
						}
										
						for (i = 0; i < data.logisRackList.length; i++) {
							list.push({
								 logisRackId: data.logisRackList[i].logisRackId
								, logisCode: data.logisRackList[i].logisCode
								, logisName: data.logisRackList[i].logisName
								, logisRackName: data.logisRackList[i].logisRackName
								, memo: data.logisRackList[i].memo
								, validYN: data.logisRackList[i].validYN
								, regUserId: data.logisRackList[i].regUserId
								, uptUserId: data.logisRackList[i].uptUserId
							});
						}
						AUIGrid.setGridData("#grid_wrap_logisRack", list);		
						// 해당 페이지로 이동
						if (page > 1) {
							AUIGrid.movePageTo(myGridIDLogisRack, Number(page));
						}
					} else { //데이터가 1건인 경우 

						if(onGrid == 'Y'){
							for (i = 0; i < data.logisRackList.length; i++) {
								item = {
									logisRackId: data.logisRackList[i].logisRackId,
									logisRackName: data.logisRackList[i].logisRackName,
								};
								AUIGrid.updateRow(myGridID, item, "selectedIndex");
							}
						}					
					}
					$(".ui-dialog-titlebar-close").html("X");
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
	}
}

function findLogisStor(obj, name, page, popYN,onGrid){	
	var list = [];
	$("#" + name + "").val("");
	let logisStorSrch = "";


	if (event.keyCode == 13 ) {		
		if (popYN == 'Y'){
			$("#pop_logisStor_srch").val();
		} else{
			$("#pop_logisStor_srch").val(obj.value);
		}

		logisStorSrch = "";
		logisStorSrch = $("#pop_logisStor_srch").val();
			
		$.ajax({
			type: "POST",
			url: "/base/storage-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"storageName": logisStorSrch
				,"validYN":'Y'	
			},
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {
					
				if (data.storageList.length != 1) { //데이터가 1건이 아닌경우 
					//거래처
					var dialogLogisStor;
					dialogLogisStor = $("#dialog-form-logisStor").dialog({
						height: 700,
						width: "50%",
						modal: true,
						headerHeight: 40,
						position: [400, 400],
						buttons: {
							"확인": function(event) {
								updateGridRowLogisStor(obj, name);
							}, //		,
							"취소": function(event) {
								dialogLogisStor.dialog("close");
							}
						},open: function(){
								$("#grid_wrap_logisStor").focus();
								$("#pop_logisStor_srch").focus();
							},
						close: function() {
						}
					});
					// 그리드 생성 후 해당 ID 보관 변수
					var myGridIDLogisStor;
					// AUIGrid 그리드를 생성합니다.
					createGridLogisStor(columnLayoutLogisStor, obj, name,onGrid);
					if (popYN == 'Y') {
					} else {
						dialogLogisStor.dialog("open");
					}				

					for (i = 0; i < data.storageList.length; i++) {
						list.push({
						 storageCode: data.storageList[i].storageCode
						, logisCode: data.storageList[i].logisCode
						, logisName: data.storageList[i].logisName
						, storageName: data.storageList[i].storageName
						, memo: data.storageList[i].memo1
						, validYN: data.storageList[i].validYN
						, regUserId: data.storageList[i].regUserId
						, uptUserId: data.storageList[i].uptUserId
						});
					}
					AUIGrid.setGridData("#grid_wrap_logisStor", list);		
					// 해당 페이지로 이동
					if (page > 1) {
						AUIGrid.movePageTo(myGridIDLogisStor, Number(page));
					}
				} else { //데이터가 1건인 경우 

					if(onGrid != 'Y'){
						if(popYN == 'Y'){
							var dialogLogisStor;
							dialogLogisStor = $("#dialog-form-logisStor").dialog({
							height: 700,
							width: "50%",
							modal: true,
							headerHeight: 40,
							position: [400, 400],
							buttons: {
								"확인": function(event) {
									updateGridRowLogisStor(obj, name);
								}, //		,
								"취소": function(event) {
									dialogLogisStor.dialog("close");
								}
							},
							close: function() {
							}
							});
						    // 그리드 생성 후 해당 ID 보관 변수
							var myGridIDLogisStor;
							createGridLogisStor(columnLayoutLogisStor, obj, name,onGrid);
							for (i = 0; i < data.logisRackList.length; i++) {
								list.push({
									 storageCode: data.storageList[i].storageCode
									, logisCode: data.storageList[i].logisCode
									, logisName: data.storageList[i].logisName
									, storageName: data.storageList[i].storageName
									, memo: data.storageList[i].memo1
									, validYN: data.storageList[i].validYN
									, regUserId: data.storageList[i].regUserId
									, uptUserId: data.storageList[i].uptUserId
								});	
							}	
							AUIGrid.setGridData("#grid_wrap_logisStor", list);		
							if (page > 1) {
								AUIGrid.movePageTo(myGridIDLogisStor, Number(page));
							}
						}else{
							for (i = 0; i < data.storageList.length; i++) {
									obj.value = data.storageList[i].storageCode;
									$("#" + name + "").val(data.storageList[i].storageName);
							}							
						}							
					}if(onGrid == 'Y'){
						for (i = 0; i < data.storageList.length; i++) {
							item = {
								 storageCode: data.storageList[i].storageCode						
								, storageName: data.storageList[i].storageName
							
							};
							AUIGrid.updateRow(myGridID, item, "selectedIndex");
						}
					}					
				}
				$(".ui-dialog-titlebar-close").html("X");
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
	}else{//엔터키를 안쳤을경우
					
		if (onGrid == 'Y'){
			$("#pop_logisStor_srch").val(obj.value);
			let logisStorSrch = "";
			logisStorSrch = $("#pop_logisStor_srch").val();
		
			$.ajax({
				type: "POST",
				url: "/base/storage-list",
				dataType: "json",
				data: {
					"workingType": "LIST",
					"storageName": logisStorSrch
					,"validYN": "Y"
				},
				async: false,
				//contentType: "application/json; charset=utf-8",
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				success: function(data) {
					if (data.logisStorList.length != 1) { //데이터가 1건이 아닌경우 
						//거래처
						if (onGrid == 'Y'){
							var dialogLogisStor;
							dialogLogisStor = $("#dialog-form-logisStor").dialog({
								height: 700,
								width: "50%",
								modal: true,
								headerHeight: 40,
								position: [400, 400],
								buttons: {
									"확인": function(event) {
										updateGridRowLogisStor(obj, name);
									}, //		,
									"취소": function(event) {
										dialogLogisStor.dialog("close");
									}
								},
								close: function() {
								}
							});
							// 그리드 생성 후 해당 ID 보관 변수
							var myGridIDLogisStor;
							// AUIGrid 그리드를 생성합니다.
							createGridLogisStor(columnLayoutLogisStor, obj, name,onGrid);
							dialogLogisStor.dialog("open");
						}
										
						for (i = 0; i < data.storageList.length; i++) {
							list.push({
								 storageCode: data.storageList[i].storageCode
								, logisCode: data.storageList[i].logisCode
								, logisName: data.storageList[i].logisName
								, storageName: data.storageList[i].storageName
								, memo: data.storageList[i].memo1
								, validYN: data.storageList[i].validYN
								, regUserId: data.storageList[i].regUserId
								, uptUserId: data.storageList[i].uptUserId
							});
						}
						AUIGrid.setGridData("#grid_wrap_logisStor", list);		
						// 해당 페이지로 이동
						if (page > 1) {
							AUIGrid.movePageTo(myGridIDLogisStor, Number(page));
						}
					} else { //데이터가 1건인 경우 

						if(onGrid == 'Y'){
							for (i = 0; i < data.storageList.length; i++) {
								item = {
									storageCode: data.storageList[i].storageCode,
									storageName: data.storageList[i].storageName,
								};
								AUIGrid.updateRow(myGridID, item, "selectedIndex");
							}
						}					
					}
					$(".ui-dialog-titlebar-close").html("X");
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
	}
}

function updateGridRowLogisRack(obj,name, gridYN) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDLogisRack);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	
	if (gridYN == 'Y') {	
		item = {
				logisRackId: rowItem.logisRackId,
				rackName: rowItem.logisRackName,
		};
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	} else {
		$(obj).val(rowItem.logisRackId);
		$("#"+name+"").val(rowItem.logisRackName);
	}
	
	var dialogLogisRack;
	dialogLogisRack = $( "#dialog-form-logisRack");			
	dialogLogisRack.dialog("close");	
}

$("#btnLogisRackFind").click(function() {
    var logisRackSrch = $("#pop_logisRack_srch").val();
	var list = [];
    $.ajax({
        	type: "POST",
			url: "/logis/logis-rack-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"logisRackName": logisRackSrch
				,"validYN" : 'Y' 
			},
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            if (data.logisRackList.length == 0) {
                alert("조건에 맞는 자료가 없습니다.");
                AUIGrid.clearGridData(myGridIDLogisRack);
            } else {
            	for (i = 0; i < data.logisRackList.length; i++) {
					list.push({
						 logisRackId: data.logisRackList[i].logisRackId
						, logisCode: data.logisRackList[i].logisCode
						, logisName: data.logisRackList[i].logisName
						, logisRackName: data.logisRackList[i].logisRackName
						, memo: data.logisRackList[i].memo
						, validYN: data.logisRackList[i].validYN
						, regUserId: data.logisRackList[i].regUserId
						, uptUserId: data.logisRackList[i].uptUserId
					});	
				}	
                AUIGrid.setGridData("#grid_wrap_logisRack", list);                
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
});

function updateGridRowLogisStor(obj,name, gridYN) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDLogisStor);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	
	if (gridYN == 'Y') {	
		item = {
				storageCode: rowItem.storageCode,
				storageName: rowItem.logisRackName,
		};
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	} else {
		$(obj).val(rowItem.storageCode);
		$("#"+name+"").val(rowItem.storageName);
	}
	
	var dialogLogisStor;
	dialogLogisStor = $( "#dialog-form-logisStor");			
	dialogLogisStor.dialog("close");	
}

$("#btnLogisStorFind").click(function() {
    var logisStorSrch = $("#pop_logisStor_srch").val();
	var list = [];
    $.ajax({
        	type: "POST",
			url: "/base/storage-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"storageName": logisStorSrch
				,"validYN" : 'Y' 
			},
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            if (data.storageList.length == 0) {
                alert("조건에 맞는 자료가 없습니다.");
                AUIGrid.clearGridData(myGridIDLogisStor);
            } else {
            	for (i = 0; i < data.storageList.length; i++) {
					list.push({
						 storageCode: data.storageList[i].storageCode
						, logisCode: data.storageList[i].logisCode
						, logisName: data.storageList[i].logisName
						, storageName: data.storageList[i].storageName
						, memo: data.storageList[i].memo1
						, validYN: data.storageList[i].validYN
						, regUserId: data.storageList[i].regUserId
						, uptUserId: data.storageList[i].uptUserId
					});	
				}	
                AUIGrid.setGridData("#grid_wrap_logisStor", list);                
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
});


////////////////////////////////////////////////////////////////////////////////////////////
