
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridIDImportCalc;


function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard

}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	var keyValueList3 = findDataToServer3("/base/cust-list", "N");
	
	// AUIGrid 그리드를 생성합니다.
	//createAUIGrid();
	createAUIGrid(keyValueList3);	
		
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
	
	$("#btnReg").click(function(){
		//alert("등록버튼");
		//updateDataToServer("/order/estiAdd", "ADD");
		placeApply('/order/orderStockCheckAdd','Y')
	});
	$("#btnClose").click(function(){
		
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	
	
	//주문인 경우
	let orderNo = $("#orderNo").val();
	if (orderNo !=''){		

		findOrder('/order/order-list');
	}	  
	
});

function findDataToServer3(url, listYN) {
	$(".ui-dialog-titlebar-close").html("X");
	var list = []; //자바스크립트 배열선언
	var listS;
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"placeYN":"Y" 
			,"orderBy": "custName"
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
					if (data.custList[i].custType == "C3") {
						code = data.custList[i].custCode;
						value = data.custList[i].custName;
						if (i==0){ //첫라인에 공백나오게 처리하기 위한 용도.
							list[j] = { "code": "", "value": "" };
							j = j + 1;
						}
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

// Master 그리드 를 생성합니다.
function createAUIGrid(keyValueList3) {
	var keyValueList4 = JSON.parse(keyValueList3);
	
	let updatedList = [];
	let matchedItem = null;
	
	for (let i = 0, len = keyValueList4.length; i < len; i++) {
	    if (keyValueList4[i]["code"] == "ㄱ121") {
	        matchedItem = keyValueList4[i];
	    } else {
	        updatedList.push(keyValueList4[i]);
	    }
	}
	
	// Add the matched item at the beginning of the updated list
	if (matchedItem) {
	    updatedList.splice(1, 0, matchedItem);
	}
	

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "temp",      headerText : "temp", width : 50, editable : false , visible : false }
		,{ dataField : "idx",      headerText : "idx", width : 50, editable : false , visible : false}
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 70, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "itemNo",      headerText : "품번*", width : 100, editable : false
			,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '필수입력값입니다.'
		    }  } 
		,{ dataField : "itemName", headerText : "품명", width: 140, editable : false ,style : "left" } 
		,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false ,  visible : false, }
		,{ dataField : "orderCnt",      headerText : "주문수량", width : 120,   editable : false   }
		,{ dataField : "placeCnt",     headerText : "발주수량", editable : false,   visible : false }
		,{ dataField : "whReqCnt",     headerText : "창고요청", editable : false,   visible : false }
		,{ dataField : "whStockCnt",     headerText : "창고보유", editable : false, width:60,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null;  }}
		,{ dataField : "shareStockQty",     headerText : "위탁공유재고", editable : false , width:60,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		 }		
		,{ dataField : "centerPrice",    headerText : "센터가", editable : false , width:70  ,dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		,{ dataField : "unitPrice",    headerText : "주문단가", editable : false , width:70  ,dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		//,{ dataField : "placeCustCode",     headerText : "발주거래처코드", editable : false }
		//,{ dataField : "placeCustName",     headerText : "발주거래처명" , editable : false}
		,{ dataField: "placeCustCode", headerText: "발주처",		   sortType: 1,		   cellMerge: true,		   editable: true,  style : "left", 
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;
				for (var i = 0, len = updatedList.length; i < len; i++) {
					if (updatedList[i]["code"] == value) {
						retStr = updatedList[i]["value"];
						break;
					}
				}
				return retStr;
			},
			editRenderer: {
				type: "DropDownListRenderer",
				list: updatedList,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			}
		}
		,{ dataField : "glogen",     headerText : "글로젠" , postfix: "%", width:60}
		,{ dataField : "partsmall",     headerText : "파츠몰" , postfix: "%" , width:60}
		,{ dataField : "halla",     headerText : "한라" , postfix: "%", width:60 }
		,{ dataField : "sk",     headerText : "SK"   , postfix: "%", width:60}
		,{ dataField : "center1",     headerText : "센터1"   , postfix: "%", width:60}
		,{ dataField : "center2",     headerText : "센터2"   , postfix: "%", width:60, visible : false}		
		,{ dataField : "deko",      headerText : "DEKO"   , postfix: "%" , width:60 }
		,{ dataField : "eapsEU",      headerText : "EAPS"    , postfix: "%", width:60 }
		,{ dataField : "eapsUSA",      headerText : "EAPS(미국)"     , postfix: "%", width:60, visible : false}		
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,
	
		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		// 엑스트라 체크박스 체커블 함수
		
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			//if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
			//	return false;
			//}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			//if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
			//	return false; // false 반환하면 disabled 처리됨
			//}
			return true;
		}		
	};

	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

		// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		var orderNo = event.item.orderNo;
		var orderSeq = event.item.orderSeq;
		var itemId = event.item.itemId;
		var custCode = '';
  
		//if (event.columnIndex == 9) {   
//		if (event.dataField == "whStockCnt") {
//			//findStockChk('/order/order-stock-chk-list',orderNo, orderSeq);  ////불필요한 팝업이라 주석처리
//		}
			
		//20231117 supi 창고보유에 대한 부분   숫자 누르면 창뜨게 추가 자세한 부분은 common-pan > 
		if (event.dataField == "whStockCnt") {	   
			
			//findStockCnt('/order/stock-chk-list',itemId);  //불필요한 팝업이라 주석처리
			findStockCnt('/logis/stock-rack-list',itemId);
			
		}		
	  
	 
		else if (event.dataField == "shareStockQty") { //	   
			findStockShare('/base/stock-share-list',itemId,custCode);  
		}	
	});
	
};

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
		
		if (event.dataField == 'glogen' || event.dataField == 'partsmall' || event.dataField == 'halla' || event.dataField == 'sk' || event.dataField == 'center1' 
		|| event.dataField == 'center2' || event.dataField == 'deko' || event.dataField == 'eapsEU' || event.dataField == 'eapsUSA'){
			
			var placeArr = [];
			var maxi = 0;
			
			placeArr[0] = event.item.glogen;
			placeArr[1] = event.item.partsmall;
			placeArr[2] = event.item.halla;
			placeArr[3] = event.item.sk;
			placeArr[4] = event.item.center1;
			placeArr[5] = event.item.center2;
			placeArr[6] = event.item.deko;
			placeArr[7] = event.item.eapsEU;
			placeArr[8] = event.item.eapsUSA;	
			
			for (var i = 0; i < placeArr.length; i++) {
				if (i == 0 ){
					maxi = 0;
					maxDC = placeArr[i];
				}else{
					if (Number(maxDC) < Number(placeArr[i])) {
						maxi = i;
						maxDC = placeArr[i];		
					}	
				} 				
			}  
			
			if (maxDC ==0){ // 0번것이 디폴트로 들어가는것 방지. 2023.07.12 
				maxi = 999; 
			}
			var placeCustCode = "";
			if (maxi ==0) {
				placeCustCode = $("#glogenCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "ㄱ001" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "글로젠" }, event.rowIndex);
			} else if (maxi ==1) {
				placeCustCode = $("#partsmallCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "ㅍ008" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "파츠몰" }, event.rowIndex);
			} else if (maxi ==2) {
				placeCustCode = $("#hallaCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "ㅎ001" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "한라" }, event.rowIndex);
			} else if (maxi ==3) {
				placeCustCode = $("#skCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "ㅎ001" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "SK" }, event.rowIndex);
			} else if (maxi ==4) {
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "?" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "센터1" }, event.rowIndex);
			} else if (maxi ==5) {
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "?" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "센터2" }, event.rowIndex);
			} else if (maxi ==6) {
				placeCustCode = $("#dekoCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "D001" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "DEKO" }, event.rowIndex);
			} else if (maxi ==7) {
				placeCustCode = $("#eapsCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "E002" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "EAPS(유럽)" }, event.rowIndex);
			} else if (maxi ==8) {
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "E001" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "EAPS(미국)" }, event.rowIndex);
			}
			AUIGrid.updateRow(myGridID, { "placeCustCode": placeCustCode }, event.rowIndex);
		}		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	
	

		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;

//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
 	var mName = mCodeSel.attr('mname');
 	
	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
}

// 행 추가, 삽입
function addRow(grid,rowPos) {
	var item = new Object();

	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID, item, rowPos);	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	
	var orderNo = $("#orderNo").val();  
    var orderType = $(':radio[name="orderType"]:checked').val();
    var custCode = $("#custCode").val(); 
    var custMgrName = $("#custMgrName").val(); 
    var custMgrPhone = $("#custMgrPhone").val(); 
    var supplyCustCode = $("#supplyCustCode").val(); 
    var supplyCustMgrName = $("#supplyCustMgrName").val(); 
    var supplyCustMgrPhone = $("#supplyCustMgrPhone").val(); 
    var carNo = $("#carNo").val(); 
    var vinNo = $("#vinNo").val(); 
    var makerCode = $("#makerCode").val(); 
    var colorCode = $("#colorCode").val(); 
    var carType = $("#carType").val(); 
    var dcRate = $("#dcRate").val(); 
    var dcDspType =  $(':radio[name="dcDspType"]:checked').val();
    var agencyFeeRate = $("#agencyFeeRate").val(); 
    var marginRate = $("#marginRate").val(); 
    var memo1 = $("#memo1").val(); 
    var memo2 = $("#memo2").val(); 
   
    //필수값 체크
    if (custCode == '') {	alert("판매거래처코드는 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	}

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);    
    
	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "salePrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "cnt", "salePrice"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
		
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}
	
	var data = {};
	
	if(addList.length > 0) data.orderItemAdd = addList;
	else data.orderItemAdd = [];
	
	if(updateList.length > 0) data.orderItemUpdate = updateList;
	else data.orderItemUpdate = [];
	
	if(removeList.length > 0) data.orderItemRemove = removeList;
	else data.orderItemRemove = [];

    data.workingType = workingType;
	data.orderNo = orderNo;  
    data.orderType = orderType; 
    data.custCode = custCode; 
    data.custMgrName = custMgrName; 
    data.custMgrPhone = custMgrPhone; 
    data.supplyCustCode = supplyCustCode; 
    data.supplyMgrName = supplyCustMgrName; 
    data.supplyMgrPhone = supplyCustMgrPhone; 
    data.carNo = carNo; 
    data.vinNo = vinNo; 
    data.makerCode = makerCode; 
    data.colorCode = colorCode; 
    data.carType = carType; 
    data.dcRate = dcRate; 
    data.dcDspType = dcDspType; 
    data.agencyFeeRate = agencyFeeRate; 
    data.marginRate = marginRate; 
    data.memo1 = memo1; 
    data.memo2 = memo2; 
    
  
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        
	        //post형식으로 페이지 데이터 조회
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderNo');
		    obj.setAttribute('value', data.orderNo);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-up');
		    document.body.appendChild(f);
		    f.submit();
		
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};


// 추가, 수정, 삭제 된 아이템들 확인하기
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
	
	if(addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for(i=0, len=addedRowItems.length; i<len; i++) {
			rowItem = addedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for(i=0, len=editedRowItems.length; i<len; i++) {
			rowItem = editedRowItems[i]; // 행아이템
			
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for(i=0, len=removedRowItems.length; i<len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	
	// 하단에 정보 출력.
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length); 
	
	
	if(str == "")
		str = "변경 사항 없음";
	
	alert(str);
}




function removeRow() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID, "selectedIndex");
};
	

// 주문 조회
function findOrder(url) {
	var orderNo = $("#orderNo").val(); //text();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"orderNo":orderNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderList.length;i++){
				    orderType = data.orderList[i].orderType; 
					custCode = data.orderList[i].custCode; 
					custName = data.orderList[i].custName; 
					custMgrName = data.orderList[i].custMgrName;
					custMgrPhone = data.orderList[i].custMgrPhone; 
					supplyCustCode = data.orderList[i].supplyCustCode; 
					supplyCustName = data.orderList[i].supplyCustName; 
					supplyCustMgrName = data.orderList[i].supplyCustMgrName; 
					supplyCustMgrPhone = data.orderList[i].supplyCustMgrPhone; 
					carNo = data.orderList[i].carNo; 
					vinNo = data.orderList[i].vinNo; 
					colorCode = data.orderList[i].colorCode; 
					makerCode = data.orderList[i].makerCode; 
					makerName = data.orderList[i].makerName;
					carType = data.orderList[i].carType; 
					dcRate = data.orderList[i].dcRate; 
					dcDspType = data.orderList[i].dcDspType; 
					agencyFeeRate = data.orderList[i].agencyFeeRate; 
					marginRate = data.orderList[i].marginRate; 
					memo1 = data.orderList[i].memo1; 
					memo2 = data.orderList[i].memo2;
					regUserName = data.orderList[i].regUserName;  
					orderYmd = data.orderList[i].orderYmd;
					orderTypeName = data.orderList[i].orderTypeName;
				    placeCustArr = data.orderList[i].placeCustArr;
				 
				    $("#orderNoDsp").text(orderNo); 
					$("#orderType").text(orderType); 
					$("#regUserName").text(regUserName); 
					$("#orderYmd").text(orderYmd); 
					$("#orderTypeName").text(orderTypeName); 
					$("#carNo").text(carNo);
					$("#vinNo").text(vinNo); 
					$("#makerName_carType").text(makerName + ' ' + carType );
					
					var placeCustArrSplit = placeCustArr.split("^");
					$("#glogenCode").val(placeCustArrSplit[0]);
					$("#partsmallCode").val(placeCustArrSplit[1]);
					$("#hallaCode").val(placeCustArrSplit[2]);
					$("#skCode").val(placeCustArrSplit[3]);
					$("#dekoCode").val(placeCustArrSplit[4]);
					$("#eapsCode").val(placeCustArrSplit[5]);
					
				}		
				findOrderItemStock('/order/order-stock-check-item-list');				
			}
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
}

//견적품목 조회
function findOrderItemStock(url) {
	var list = [];
	var orderNo = $("#orderNo").val();
	var seqArr = $("#seqArr").val();
   
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"orderNo":orderNo,
			"seqArr":seqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderStockItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderStockItemList.length;i++){
				    list.push({
						 idx: data.orderStockItemList[i].orderSeq
						,orderSeq: data.orderStockItemList[i].orderSeq 
						,itemId: data.orderStockItemList[i].itemId 
						,itemNo: data.orderStockItemList[i].itemNo 
						,itemName: data.orderStockItemList[i].itemName
						,itemNameEn: data.orderStockItemList[i].itemNameEn 
						,orderCnt: data.orderStockItemList[i].orderCnt 
						,placeCnt: data.orderStockItemList[i].placeCnt 
						,whReqCnt: data.orderStockItemList[i].whReqCnt
						,whStockCnt: data.orderStockItemList[i].whStockCnt
						,centerPrice: data.orderStockItemList[i].centerPrice	 						
						,glogen: data.orderStockItemList[i].glogen 
						,partsmall: data.orderStockItemList[i].partsmall
						,halla: data.orderStockItemList[i].halla 
						,sk: data.orderStockItemList[i].sk 
						,center1: data.orderStockItemList[i].center1 
						,center2: data.orderStockItemList[i].center2
						,deko: data.orderStockItemList[i].deko
						,eapsEU: data.orderStockItemList[i].eapsEU
						,eapsUSA: data.orderStockItemList[i].eapsUSA
						,placeCustCode: data.orderStockItemList[i].placeCustCode
						,placeCustName: data.orderStockItemList[i].placeCustName
						
						,shareStockQty: data.orderStockItemList[i].shareStockQty
						,unitPrice: data.orderStockItemList[i].unitPrice		//2023.08.18 hsg
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
			}
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
}


function click_orderType(orderType) {
	if (orderType == 1){
		$("#supplyCustCode").val("");
		$("#supplyCustName").val("");
		$("#supplyCustAdmName").val("");
		$("#supplyCustAdmPhone").val("");
		$("#supplyInfo-title").css("display","none");
		$("#supplyInfo-input").css("display","none");
	}else{
		$("#supplyInfo-title").css("display","block");
		$("#supplyInfo-input").css("display","block");
	}	
}




// 적용		
function placeApply(url, tempAdd) {
	
	AUIGrid.updateRow(myGridID, { "temp": "1" }, event.rowIndex);

	
	if ( tempAdd === undefined ){  // 적용인 경우 
		var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
		if (checkedItems.length <= 0) {
			alert("적용할 품목을 선택하세요!");
			return;
		}else{
			
			//체크된 row 강제로 수정 만듬
			/*
			var items2editing = [];
			for (var i = 0, len = checkedItems.length; i < len; i++) {
				rowItem = checkedItems[i];		
				//reqArr = reqArr + "^" +rowItem.item.placeReqNo;
				
				//items2editing[rowItem.rowIndex] = {
				items2editing[i] = {
					temp: i,
				};
			}
			//for (var i = 0, len = 10; i < len; i++) {
			//	items2editing[i] = {
			//		temp: i,
			//	};
			//}
		 
		    
			AUIGrid.updateRowsById(myGridID, items2editing);
			*/
			var rowIndexes = [];
			var items = [];
			var allItems = AUIGrid.getGridData(myGridID);
			var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
			var rowId;
			var j=0;
			for (var i = 0, len = allItems .length; i < len; i++) {
				rowItem = allItems[i];
				rowId = rowItem[rowIdField];
				checked = AUIGrid.isCheckedRowById(myGridID, rowId);

				if ( checked === true ){  //체크된 경우 
					rowIndexes[j] = i;
					j = j + 1;
					
					var item = {
						 temp: i 
						};
					items.push(item);
				}		
			}
			
			AUIGrid.updateRows(myGridID, items, rowIndexes); // 3개 업데이트
			
		}
		
		tempAdd = "N";
	}
	
	
	var orderNo = $("#orderNo").val();

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var editedRowItems = AUIGrid.getEditedRowItems(myGridID);
	//var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);    
    
	//체크되 row만
	if (tempAdd == 'N') {
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		var addList = addedRowItems.filter(item => AUIGrid.isCheckedRowById(myGridID, item[rowIdField]));
		var updateList = editedRowItems.filter(item => AUIGrid.isCheckedRowById(myGridID, item[rowIdField]));
		var removeList = removedRowItems.filter(item => AUIGrid.isCheckedRowById(myGridID, item[rowIdField]));
	}else{
		var addList = addedRowItems;
		var updateList = editedRowItems;
		var removeList = removedRowItems;
	}

	var data = {};
	
	
	if(addList.length > 0) data.orderStockAdd = addList;
	else data.orderStockAdd = [];
	
	if(updateList.length > 0) data.orderStockUpdate = updateList;
	else data.orderStockUpdate = [];
	
	if(removeList.length > 0) data.orderStockRemove = removeList;
	else data.orderStockRemove = [];

	
    data.workingType = "ADD";
	data.orderNo = orderNo;  
	data.seqArr = seqArr;
    data.tempAdd = tempAdd;   // 임시저장인 경우
	
    
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        if (tempAdd!='Y'){ 
	        //창닫고. 부모창reload
				parent.jQuery.fancybox.close();
				parent.location.reload(true);
	        }
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN: 견적-창고수량 확인 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

var columnLayoutStockChk = [ 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false }
		,{ dataField : "orderSeq",      headerText : "주문순번*", width : 50, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 140, editable : false }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false } 
		,{ dataField : "itemName", headerText : "품명", width: 120, editable : false  } 
		,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "stockQty",     headerText : "재고수량", datype: "numeric" }
		,{ dataField : "useCnt",     headerText : "견적적요", datype: "numeric" }
		,{ dataField : "storageCode",     headerText : "창고코드", datype: "" }
		,{ dataField : "storageName",     headerText : "창고명", datype: "" }
];
 
 	
// 정보 조회
function findStockChk(url,orderNo,orderSeq) {
    
	var dialogStockChk;
	dialogStockChk = $( "#dialog-form-stockchk" ).dialog({
	    //autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "90%",
	    modal: true,
	    headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position:[400,400],
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogStockChk.dialog("close");
			}
		},
	    close: function() {
	     // $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	

	//alert("조건에 맞는 자료가 없습니다.");
	// 그리드 생성 후 해당 ID 보관 변수
	var myGridIDStockChk;
	// AUIGrid 그리드를 생성합니다.

	dialogStockChk.dialog("open");
				
	createGridStockChk(columnLayoutStockChk);
				
	var list = [];
	orderNo = $("#orderNo").val();
	$("#orderSeq").val(orderSeq);
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"orderNo":orderNo,
			"orderSeq":orderSeq
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderStorageUseList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderStorageUseList.length;i++){
				    list.push({
						 idx: data.orderStorageUseList[i].estiSeq
						,orderSeq: data.orderStorageUseList[i].orderSeq 
						,itemId: data.orderStorageUseList[i].itemId 
						,itemNo: data.orderStorageUseList[i].itemNo 
						,itemName: data.orderStorageUseList[i].itemName
						,itemNameEn: data.orderStorageUseList[i].itemNameEn 
						,stockQty : data.orderStorageUseList[i].stockQty
						,useCnt: data.orderStorageUseList[i].useCnt
						,storageCode: data.orderStorageUseList[i].storageCode
						,storageName: data.orderStorageUseList[i].storageName  
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap_stockchk", list);
			}

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
}


 
function createGridStockChk(columnLayoutStockChk) {
	
	var auiGridProps = {			
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			//pageRowCount: 50,
            editable : true ,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			//rowIdField: "idx",
			
			selectionMode : "multipleCells",
			
						// 엑스트라 체크박스 표시 설정
			showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			showRowAllCheckBox: true,

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDStockChk = AUIGrid.create("#grid_wrap_stockchk", columnLayoutStockChk, auiGridProps);

}

// 창고재고사용수량 적용		
function stockApply(url) {
	
	var orderNo = $("#orderNo").val();
	var orderSeq = $("#orderSeq").val();


	var checkedItems = AUIGrid.getCheckedRowItems(myGridIDStockChk);
	if (checkedItems.length <= 0) {
		alert("적용대상을 선택하세요!");
		return;
	}
	
	var rowItem;
	var qtyArr = "";  //재고수량
	var cntArr = "";  //견적적용
	var scdArr = "";  //창고코드
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		qtyArr = qtyArr + "^" +rowItem.item.stockQty;
		cntArr = cntArr + "^" +rowItem.item.useCnt;
		scdArr = scdArr + "^" +rowItem.item.storageCode;
	}
	
	var data = {};
    data.workingType = "ADD";
	data.orderNo = orderNo;
	data.orderSeq = orderSeq;
	data.qtyArr = qtyArr;
	data.cntArr = cntArr;  
	data.scdArr = scdArr;
	
    
  
    //return;
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
	    },
	    error:function(request, status, error){ 
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
}
	

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: 창고수량 확인 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

		