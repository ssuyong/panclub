
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

/*
var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#useDmdYmd',
        format: 'yyyy-MM-dd'
    }
});
    
   
var datepicker2 = new tui.DatePicker('#wrapper2', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#moveSchYmd',
        format: 'yyyy-MM-dd'
    }
});
*/
var datepicker1 = new tui.DatePicker('#wrapper1', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#popRoYmd',
		format: 'yyyy-MM-dd'
	}
});   
    
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		
	var pageMoveYN = $("#pageMoveYN").val();
	//console.log("pageMoveYN"+pageMoveYN);
	function disableButtons() {
		$("#btnReg").prop("disabled", true);
		$("#btnDel").prop("disabled", true);
		$("#btnDateChange").prop("disabled", true);
	}
	if (pageMoveYN == "Y") {
		disableButtons();
	}
 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/logis/roAdd", "UPT");
	});
	$("#btnClose").click(function(){
		//console.log("닫기");
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.출고를 삭제하시겠습니까?")){
			updateDataToServer("/logis/roAdd", "DEL");
		}
	});
	$("#btnDateChange").click(function(){
		openDialogChangeRoYmd();
	});

	//반출번호가  존재하는 경우 
	let roNo = $("#roNo").text();
	if (roNo !=''){		
		//console.log("rlNo ::"+ rlNo);
		
		findReq('/logis/ro-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "roNo",      headerText : "반출번호", width : 100, editable : false }
		,{ dataField : "roSeq",      headerText : "반출순번", width : 60, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 120, editable : false} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명", width: 180, editable : false , style:"left" } 
		,{ dataField : "itemNameEn", headerText : "영문품명", width: 140, editable : false , style:"left"  }
		,{ dataField : "reqCnt",      headerText : "요청수량", width : 60,dataType: "numeric",formatString: "#,##0"  , style:"right", editable : false  }
		,{ dataField : "roCnt",     headerText : "반출수량" , width : 60 ,dataType: "numeric",formatString: "#,##0"  , style:"right", editable : false}
		,{ dataField : "roUnitPrice",     headerText : "반출가", editable : false , width : 80, dataType: "numeric",formatString: "#,##0"  , style:"right", editable : false}
		,{ dataField : "roSumPrice",     headerText : "합계", editable : false , width : 80, dataType: "numeric",formatString: "#,##0"  , style:"right", editable : false}
		,{ dataField : "placeCustCode",     headerText : "발주처코드" , width : 60, editable : false}
		,{ dataField : "placeCustName",     headerText : "발주처명" , editable : false}
		,{ dataField : "memo1",     headerText : "비고1" , editable : false}
		,{ dataField : "roRegUserId",     headerText : "처리자" , width : 80, editable : false}
		,{ dataField : "roReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, editable : false ,
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "singleRow",
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		//showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		//enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		//showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: false,
		showAutoNoDataMessage : false, 

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
		console.log("aa");
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
	 
		var orderGroupId = event.item.orderGroupId;
		if (event.dataField == 'orderGroupId') {
			//window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId;
			var orderGroupId = event.item.orderGroupId;
			var url = '/order/order-group-item-list?orderGroupId=' + orderGroupId
			var newWindow = window.open(url, '_blank');
			 newWindow.focus();
		}		
				
	});	
	
	
};

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	
	

		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;



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





// 마스터 조회
function findReq(url) {
	var roNo = $("#roNo").text();
	//console.log("srno:"+storageUseReqNo);
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	let workingType = 'LIST';
	if(gvComCode !=''){
		workingType = 'LIST-ALL';
	}
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":workingType,
			"roNo":roNo,
			"gvComCode":gvComCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.roList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
			}else{
				for(i=0;i<data.roList.length;i++){
					roNo = data.roList[i].roNo;
					//regUserId = data.riList[i].regUserId;
				    custName = data.roList[i].custName; 
					roWay = data.roList[i].roWay; 
					carNo = data.roList[i].carNo; 
					regYmd = data.roList[i].regYmd; 
					roMgr = data.roList[i].roMgr; 
					reqUserName = data.roList[i].reqUserName; 
					memo1 = data.roList[i].memo1; 
					custRoNo = data.roList[i].custRoNo; 
					
					$("#roNo").text(roNo);
					//$("#regUserId").text(regUserId); 
					$("#custName").text(custName); 
					$("#roWay").val(roWay);
					$("#carNo").text(carNo);
					$("#roYmd").text(regYmd);
					$("#roMgr").val(roMgr);
					$("#reqRegUserId").text(reqUserName);
					$("#memo1").val(memo1);
					$("#custRoNo").val(custRoNo);
				}		
				findRegItem('/logis/ro-item-list');				
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

//요청 품목 조회
function findRegItem(url) {
	//console.log("initem");
	var list = [];
	var roNo = $("#roNo").text();
	//console.log("aa:"+storageUseReqNo);
	var workingType = "LIST";
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
   // console.log("a:"+ordArr);
   // console.log("a:"+seqArr);
   
    let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
 
   
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType,
			"roNo":roNo,
			"gvComCode":gvComCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.roItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.roItemList.length;i++){
				    list.push({						  
						 roNo: data.roItemList[i].roNo
						,roSeq: data.roItemList[i].roSeq  
						,makerCode: data.roItemList[i].makerCode 
						,itemId: data.roItemList[i].itemId 
						,itemNo: data.roItemList[i].itemNo 
						,itemName: data.roItemList[i].itemName
						,itemNameEn: data.roItemList[i].itemNameEn 
						,reqCnt: data.roItemList[i].reqCnt 
						,roCnt: data.roItemList[i].cnt
						,roUnitPrice: data.roItemList[i].roUnitPrice 
						,roSumPrice: data.roItemList[i].cnt *  data.roItemList[i].roUnitPrice
						,reqRegUserId: data.roItemList[i].reqRegUserId 
						,roRegUserId: data.roItemList[i].regUserId
						,memo1: data.roItemList[i].memo1 
						,roReqNo: data.roItemList[i].roReqNo 
						,orderGroupId: data.roItemList[i].orderGroupId 
						
						,placeCustCode: data.roItemList[i].placeCustCode 
						,placeCustName: data.roItemList[i].placeCustName 
						
						,className: data.roItemList[i].className 
						,makerName: data.roItemList[i].makerName 
						,factoryNo: data.roItemList[i].factoryNo 
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

function updateDataToServer( url, workingType ) {
		
	var roMgr = $("#roMgr").val();  
	var roWay = $("#roWay").val();  
    var memo1 = $("#memo1").val(); 
    var roNo = $("#roNo").text(); 
    var custRoNo = $("#custRoNo").val();
    
    let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
    
	var data = {};

	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : {
			"workingType" : workingType,		
			"roMgr" : roMgr,		
			"roWay" : roWay,		
			"roNo" : roNo,		
			"memo1" : memo1,		
			"custRoNo" : custRoNo,		
			"gvComCode" : gvComCode		
		},
	    success: function(data) {
	        //alert("성공:"+data.success);
	       // console.log("data.estiNo:"+data.estiNo);
	        alert(data.result_code+":"+data.result_msg);
	        parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	        
	    
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

function openDialogChangeRoYmd(){
	
	var custName = $("#custName").text(); 
	var roNo = $("#roNo").text();
	var roYmd = $("#roYmd").text();
	
	$("#popCustName").val(custName);
	$("#popRoNo").val(roNo);
	$("#popRoYmd").val(roYmd);
	
	var dialogChangeDate;
	dialogChangeDate = $("#dialog-form-changeRoYmd").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: 400,
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			//"확인": changePlRlYmd(whNoArr,whSeqArr,placeRlYmd),
			"확인": changeRoYmd,
			"취소": function(event) {
				dialogChangeDate.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	

		}
	});
		
}

function changeRoYmd(){
	var roNo = $("#popRoNo").val();
	var roYmd = $("#popRoYmd").val();
	var workingType = "CHANGE_RO_DATE"
	
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	
	
	var data = {};
	
    data.roNo = roNo;
	data.roYmd = roYmd;
	data.workingType = workingType;
	data.gvComCode = gvComCode;
	
	$.ajax({
	    url : "/logis/changeRoYmd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : data,
	    
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}
		
	