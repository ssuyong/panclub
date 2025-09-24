
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridIDImportCalc;
var myGridIDStockChk;


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
	

	//제조사코드에 셋팅
  //	makerCodeSelect("/base/code-list")
  	
	//등록버튼 활성화, 수정/삭제 활성화
	//document.getElementById('btnUpt').classList.toggle('disabled'); 
	//document.getElementById('btnDel').classList.toggle('disabled');
					
	/*				
	//아이템팝업
	var dialogItem;
	dialogItem = $( "#dialog-form" ).dialog({
	   // autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "80%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogItem.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});	


	//거래처팝업
	var dialogCust;
	dialogCust = $( "#dialog-form" ).dialog({
	    autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "80%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogCust.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	
	//거래처담당자팝업
	var dialogCustMgr;
	dialogCustMgr = $( "#dialog-form" ).dialog({
	    autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "80%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogCustMgr.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});		
	*/	
	// AUIGrid 그리드를 생성합니다.
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
		placeApply('/order/stockCheckAdd','Y')
	});
	$("#btnClose").click(function(){
		
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});


	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("./data/normal_500.json");
	
	//견적인 경우
	let estiNo =  $("#estiNo").val(); // $("#estiNo").text();

	if (estiNo !=''){
		$("#esti-dsp").css("display","block");
		$("#order-dsp").css("display","none");
		//alert("custcode:"+custCode);
		findEsti('/order/esti-list');
	}	  
	
	//주문인 경우
	let orderNo = $("#orderNo").val();
	if (orderNo !=''){		
		$("#esti-dsp").css("display","none");
		$("#order-dsp").css("display","block");
		//alert("custcode:"+custCode);
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
	
	// Print the updated list
	for (let i = 0; i < updatedList.length; i++) {
	    console.log("keyValueList4= :" + updatedList[i]["code"]);
	}
	
	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "temp",      headerText : "temp", width : 50, editable : false , visible : false }
		,{ dataField : "idx",      headerText : "idx", width : 50, editable : false , visible : false }
		,{ dataField : "estiSeq",      headerText : "견적순번", width : 70, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "itemNo",      headerText : "품번", width : 100, editable : false, style : "left"			} 
		,{ dataField : "itemName", headerText : "품명", width: 140, editable : false ,style : "left" } 
		,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false ,  visible : false, }
		,{ dataField : "estiCnt",      headerText : "견적수량", width:60, editable : false }
		,{ dataField : "placeCnt",     headerText : "발주수량", editable : false , width:60 , visible : false}
		,{ dataField : "whReqCnt",     headerText : "창고요청", editable : false , width:60 , visible : false}
		,{ dataField : "whStockCnt",     headerText : "창고보유", editable : false , width:60,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		}
		,{ dataField : "shareStockQty",     headerText : "위탁공유재고", editable : false , width:60,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		 }
		,{ dataField : "centerPrice",    headerText : "센터가", editable : false , width:70  ,dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		,{ dataField : "unitPrice",    headerText : "견적단가", editable : false , width:70  ,dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		//,{ dataField : "placeCustCode",     headerText : "발주처코드", editable : false, width:80 }
		//,{ dataField : "placeCustName",     headerText : "발주처명" , editable : false, width:100}
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
		,{ dataField : "halla",     headerText : "한라" , postfix: "%" , width:60}
		,{ dataField : "sk",     headerText : "SK"   , postfix: "%", width:60  ,visible : false }
		,{ dataField : "center1",     headerText : "센터"   , postfix: "%", width:60}
		,{ dataField : "center2",     headerText : "임의"   , postfix: "%", width:60}		
		,{ dataField : "deko",      headerText : "DEKO"   , postfix: "%" , width:60 }
		,{ dataField : "eapsEU",      headerText : "EAPS"    , postfix: "%" , width:70}
		,{ dataField : "eapsUSA",      headerText : "EAPS(미국)"     , postfix: "%", width:70,  visible : false }		
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
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID, footerLayout);




		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	
	// 셀 더블클릭 이벤트 바인딩 : 재고확인 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		var estiNo = event.item.estiNo;
		var estiSeq = event.item.estiSeq;
		var itemId = event.item.itemId;
		var custCode = '';
		  
		//if (event.columnIndex == 10) {
			
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
			
			/*
			var glogen = event.item.glogen;
			var partsmall = event.item.partsmall;
			var halla = event.item.halla;
			var sk = event.item.sk;
			var center1 = event.item.center1;
			var center2 = event.item.center2;
			var deko = event.item.deko;
			var eapsEU = event.item.eapsEU;
			var eapsUSA = event.item.eapsUSA;	
			
			var maxCol = "";			 
			if (glogen>=partsmall) {
				maxCol = "glogen";
			} else if () {
				
			}
			*/

			
			var placeArr = [];
			var maxi = 0;
			/*
			placeArr[0] = event.item.glogen;
			placeArr[1] = event.item.partsmall;
			placeArr[2] = event.item.halla;
			placeArr[3] = event.item.sk;
			placeArr[4] = event.item.center1;
			placeArr[5] = event.item.center2;
			placeArr[6] = event.item.deko;
			placeArr[7] = event.item.eapsEU;
			placeArr[8] = event.item.eapsUSA;
			*/
				
			var glogen = event.item.glogen;
			var partsmall = event.item.partsmall;
			var halla = event.item.halla;
			var sk = event.item.sk;
			var center1 = event.item.center1;
			var center2 = event.item.center2;
			var deko = event.item.deko;
			var eapsEU = event.item.eapsEU;
			var eapsUSA = event.item.eapsUSA;
							
			if (glogen == '')    {				glogen = 0;			}
			if (partsmall == '') {				partsmall = 0;		}
			if (halla == '')     {				halla = 0;			}
			if (sk == '')        {				sk = 0;			    }
			if (center1 == '')   {				center1 = 0;		}
			if (center2 == '')   {				center2 = 0;		}
			if (deko == '')      {				deko = 0;			}
			if (eapsEU == '')    {				eapsEU = 0;			}
			if (eapsUSA == '')   {				eapsUSA = 0;		}
			
			placeArr[0] = glogen;
			placeArr[1] = partsmall;
			placeArr[2] = halla;
			placeArr[3] = sk;
			placeArr[4] = center1;
			placeArr[5] = center2;
			placeArr[6] = deko;
			placeArr[7] = eapsEU;
			placeArr[8] = eapsUSA;
			
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
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "?" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "SK" }, event.rowIndex);
			} else if (maxi ==4) {				
				//placeCustCode = $("#glogenCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "?" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "센터1" }, event.rowIndex);
			} else if (maxi ==5) {
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "?" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "센터2" }, event.rowIndex);
			} else if (maxi ==6) {
				placeCustCode = $("#dekoCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "ㄷ130" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "DEKO" }, event.rowIndex);
			} else if (maxi ==7) {
				placeCustCode = $("#eapsCode").val();
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "ㅇ015" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "EAPS(유럽)" }, event.rowIndex);
			} else if (maxi ==8) {
				//AUIGrid.updateRow(myGridID, { "placeCustCode": "o015" }, event.rowIndex);
				//AUIGrid.updateRow(myGridID, { "placeCustName": "EAPS(미국)" }, event.rowIndex);
			}
			
			AUIGrid.updateRow(myGridID, { "placeCustCode": placeCustCode }, event.rowIndex);
			//$("#pop_itemNo").val(event.value);
			//$("#pop_itemName").val();
			//findItem('/base/item-list');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
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
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
	
	//var dialog;
	//dialog = $( "#dialog-form" );	
	//dialog.dialog("close");
}

// 행 추가, 삽입
function addRow(grid,rowPos) {
	var item = new Object();

	/*
	item.idx = '',
	item.mgrIdx = '', 
	item.name = '', 
	item.position = '', 
	item.role = '', 
	item.phone1 = '', 
	item.phone2 = '', 
	item.email = '', 
	item.validYN = ''
	*/
	
	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID, item, rowPos);	
	
	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	
	var estiNo = $("#estiNo").val();  
    var estiType = $(':radio[name="estiType"]:checked').val();
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
	
	if(addList.length > 0) data.estiItemAdd = addList;
	else data.estiItemAdd = [];
	
	if(updateList.length > 0) data.estiItemUpdate = updateList;
	else data.estiItemUpdate = [];
	
	if(removeList.length > 0) data.estiItemRemove = removeList;
	else data.estiItemRemove = [];

    data.workingType = workingType;
	data.estiNo = estiNo;  
    data.estiType = estiType; 
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
	        //alert("성공:"+data.success);
	        
	        alert(data.result_code+":"+data.result_msg);
	        //alert(data.estiNo)
	        //location.reload();
	        
	    
	        //post형식으로 페이지 데이터 조회
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'estiNo');
		    obj.setAttribute('value', data.estiNo);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/esti-up');
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
	

// 견적 조회
function findEsti(url) {
	var estiNo = $("#estiNo").val(); //text();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"estiNo":estiNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.estiList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.estiList.length;i++){
				    estiType = data.estiList[i].estiType; 
					custCode = data.estiList[i].custCode; 
					custName = data.estiList[i].custName; 
					custMgrName = data.estiList[i].custMgrName;
					custMgrPhone = data.estiList[i].custMgrPhone; 
					supplyCustCode = data.estiList[i].supplyCustCode; 
					supplyCustName = data.estiList[i].supplyCustName; 
					supplyCustMgrName = data.estiList[i].supplyCustMgrName; 
					supplyCustMgrPhone = data.estiList[i].supplyCustMgrPhone; 
					carNo = data.estiList[i].carNo; 
					vinNo = data.estiList[i].vinNo; 
					colorCode = data.estiList[i].colorCode; 
					makerCode = data.estiList[i].makerCode; 
					makerName = data.estiList[i].makerName;
					carType = data.estiList[i].carType; 
					dcRate = data.estiList[i].dcRate; 
					dcDspType = data.estiList[i].dcDspType; 
					agencyFeeRate = data.estiList[i].agencyFeeRate; 
					marginRate = data.estiList[i].marginRate; 
					memo1 = data.estiList[i].memo1; 
					memo2 = data.estiList[i].memo2;
					regUserName = data.estiList[i].regUserName;  
					estiYmd = data.estiList[i].estiYmd;
					estiTypeName = data.estiList[i].estiTypeName;
					placeCustArr = data.estiList[i].placeCustArr;
				 
				    $("#estiNoDsp").text(estiNo); 
					$("#estiType").text(estiType); 
					$("#regUserName").text(regUserName); 
					$("#estiYmd").text(estiYmd); 
					$("#estiTypeName").text(estiTypeName); 
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
					
					/*	
					$("#supplyCustName").val(supplyCustName); 
					$("#supplyCustMgrName").val(supplyCustMgrName); 
					$("#supplyCustMgrPhone").val(supplyCustMgrPhone); 
					$("#carNo").val(carNo); 
					$("#vinNo").val(vinNo); 
					$("#colorCode").val(colorCode); 
					$("#makerCode").val(makerCode); 
					$("#carType").val(carType); 
					$("#dcRate").val(dcRate); 
					$("#dcDspType").val(dcDspType); 
					$("#agencyFeeRate").val(agencyFeeRate); 
					$("#marginRate").val(marginRate); 
					$("#memo1").val(memo1); 
					$("#memo2").val(memo2); 
					*/
					//등록버튼 비활성화, 수정/삭제 활성화
					//document.getElementById('btnReg').classList.toggle('disabled'); 
					//document.getElementById('btnUpt').classList.toggle('disabled'); 
					//document.getElementById('btnDel').classList.toggle('disabled');				
					
				}		
				findEstiItemStock('/order/stock-check-item-list');				
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
function findEstiItemStock(url) {
	var list = [];
	var estiNo = $("#estiNo").val();
	var seqArr = $("#seqArr").val();
    
   // var data = [];
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"estiNo":estiNo,
			"seqArr":seqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.estiStockItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
				for(i=0;i<data.estiStockItemList.length;i++){
				    list.push({
						 idx: data.estiStockItemList[i].estiSeq
						,estiSeq: data.estiStockItemList[i].estiSeq 
						,itemId: data.estiStockItemList[i].itemId 
						,itemNo: data.estiStockItemList[i].itemNo 
						,itemName: data.estiStockItemList[i].itemName
						,itemNameEn: data.estiStockItemList[i].itemNameEn 
						,estiCnt: data.estiStockItemList[i].estiCnt 
						,placeCnt: data.estiStockItemList[i].placeCnt 
						,whReqCnt: data.estiStockItemList[i].whReqCnt
						,whStockCnt: data.estiStockItemList[i].whStockCnt 	
						,centerPrice: data.estiStockItemList[i].centerPrice					
						,glogen: data.estiStockItemList[i].glogen 
						,partsmall: data.estiStockItemList[i].partsmall
						,halla: data.estiStockItemList[i].halla 
						,sk: data.estiStockItemList[i].sk 
						,center1: data.estiStockItemList[i].center1 
						,center2: data.estiStockItemList[i].center2
						,deko: data.estiStockItemList[i].deko
						,eapsEU: data.estiStockItemList[i].eapsEU
						,eapsUSA: data.estiStockItemList[i].eapsUSA
						,placeCustCode: data.estiStockItemList[i].placeCustCode
						,placeCustName: data.estiStockItemList[i].placeCustName
						
						,shareStockQty: data.estiStockItemList[i].shareStockQty
						,unitPrice: data.estiStockItemList[i].unitPrice		//2023.08.18 hsg
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


function click_EstiType(estiType) {
	if (estiType == 1){
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



// 체크된 아이템 얻기
function order() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	var str = "";
	var rowItem;
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		seqArr = seqArr + "^" +rowItem.item.estiSeq;		
		//str += "row : " + rowItem.rowIndex + ", id :" + rowItem.item.id + ", name : " + rowItem.item.name + "\n";
	}
	//alert(str);
	//location.href = "/_order/_orderAdd?reqNo_array="+reqNo_array+"&seqNo_array="+seqNo_array+"&eventNo_array="+eventNo_array;
	
	var estiNo = $("#estiNo").val();
	//post형식으로 페이지 데이터 조회
	let f = document.createElement('form');
    
	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'estiNo');
	obj.setAttribute('value', estiNo);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'seqArr');
	obj.setAttribute('value', seqArr);
	f.appendChild(obj);
	    
	f.setAttribute('method', 'post');
	f.setAttribute('action', '/order/order-up');
	document.body.appendChild(f);
	f.submit();	
}



function stockCheck(){
 
 	var estiNo = $('#estiNo').val();

 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		seqArr = seqArr + "^" +rowItem.item.estiSeq;		
	}

	$.fancybox.open({
	  href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
	  type : 'iframe',
	  width : '90%',
	  height : '90%',
	  padding :0,
	  fitToView: false,
	  autoSize : false
	});
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
	
	//return

	
	/*
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	var rowItem;
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		seqArr = seqArr + "^" +rowItem.item.estiSeq;		
	}
	*/
	//var estiNo = $("#estiNo").text();  
	var estiNo = $("#estiNo").val();

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var editedRowItems = AUIGrid.getEditedRowItems(myGridID);
	//var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);    
    
	//var isValid1 = AUIGrid.validateGridData(myGridID, ["placeCustCode", "placeCustName"], "발주거래처를 입력해야 합니다.");
	//var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["placeCustCode", "placeCustName"], "발주거래처를 입력해야 합니다.");
		
	//if (isValid1 == false || isValidChanged1 == false) {
	//	return;
	//}
	
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
	
	if(addList.length > 0) data.estiStockAdd = addList;
	else data.estiStockAdd = [];
	
	if(updateList.length > 0) data.estiStockUpdate = updateList;
	else data.estiStockUpdate = [];
	
	if(removeList.length > 0) data.estiStockRemove = removeList;
	else data.estiStockRemove = [];

    data.workingType = "ADD";
	data.estiNo = estiNo;  
	data.seqArr = seqArr;
	data.tempAdd = tempAdd;   // 임시저장인 경우
    //data.comCode = "TEST";
   
    
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
		,{ dataField : "estiSeq",      headerText : "견적순번*", width : 50, editable : false }
		,{ dataField : "itemId",      headerText : "상품ID", width : 140, editable : false }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false } 
		,{ dataField : "itemName", headerText : "품명", width: 120, editable : false  } 
		,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "stockQty",     headerText : "재고수량", datype: "numeric" }
		,{ dataField : "useCnt",     headerText : "견적적요", datype: "numeric" }
		,{ dataField : "storageCode",     headerText : "창고코드", datype: "" }
		,{ dataField : "storageName",     headerText : "창고명", datype: "" }
];
 
 	
// 정보 조회
function findStockChk(url,estiNo,estiSeq) {
    
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
	estiNo = $("#estiNo").val();
	$("#estiSeq").val(estiSeq);
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"estiNo":estiNo,
			"estiSeq":estiSeq
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.estiStorageUseList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.estiStorageUseList.length;i++){
				    list.push({
						 idx: data.estiStorageUseList[i].estiSeq
						,estiSeq: data.estiStorageUseList[i].estiSeq 
						,itemId: data.estiStorageUseList[i].itemId 
						,itemNo: data.estiStorageUseList[i].itemNo 
						,itemName: data.estiStorageUseList[i].itemName
						,itemNameEn: data.estiStorageUseList[i].itemNameEn 
						,stockQty : data.estiStorageUseList[i].stockQty
						,useCnt: data.estiStorageUseList[i].useCnt
						,storageCode: data.estiStorageUseList[i].storageCode
						,storageName: data.estiStorageUseList[i].storageName  
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
	
	var estiNo = $("#estiNo").val();
	var estiSeq = $("#estiSeq").val();


	var checkedItems = AUIGrid.getCheckedRowItems(myGridIDStockChk);
	if (checkedItems.length <= 0) {
		alert("적용대상을 선택하세요!!");
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
	data.estiNo = estiNo;
	data.estiSeq = estiSeq;
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
