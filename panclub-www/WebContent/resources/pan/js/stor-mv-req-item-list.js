
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

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
		 

	//요청번호가  존재하는 경우 
	let reqNo = $("#reqNo").text();
	if (reqNo !=''){
		findReq('/logis/stor-mv-req-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "storMvReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "reqSeq",      headerText : "요청순번*", width : 100, editable : false }
		,{ dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false }
		,{ dataField : "orderSeq",      headerText : "주문순번*", width : 100, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 140, editable : false }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false} 
		,{ dataField : "itemName", headerText : "품명", width: 120, editable : false  } 
		,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "orderCnt",      headerText : "주문수량", width : 120, editable : false   }
		,{ dataField : "reqCnt",     headerText : "이동요청수량" }
		,{ dataField : "rlSbCnt",     headerText : "출고대기수량" }
		,{ dataField : "mvCnt",     headerText : "이동수량" }
		,{ dataField : "unitPrice",     headerText : "단가", editable : false }
		,{ dataField : "sumPrice",     headerText : "합계", editable : false }
		,{ dataField : "memo1",     headerText : "비고1", editable : false }
		,{ dataField : "memo2",     headerText : "비고2" , editable : false}
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
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,

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
	
};

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
		
		if (event.dataField == 'mvCnt' ){
			AUIGrid.updateRow(myGridID, { "sumPrice": event.item.unitPrice * event.item.mvCnt }, event.rowIndex);
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
 	
 	//console.log(mCode);
 	//console.log(mName);
 	
	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
	
	//var dialog;
	//dialog = $( "#dialog-form" );	
	//dialog.dialog("close");
}




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
	

// 마스터 조회
function findReq(url) {
	var reqNo = $("#reqNo").text();
	//console.log("srno:"+storageUseReqNo);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"reqNo":reqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
				console.log("len:"+data.reqList.length);	
				for(i=0;i<data.reqList.length;i++){
					reqNo = data.reqList[i].reqNo;
					sBranchCode = data.reqList[i].sBranchCode;
				    memo1 = data.reqList[i].memo1; 
					eBranchCode = data.reqList[i].eBranchCode;
				    memo2 = data.reqList[i].memo2; 
					dmdYmd = data.reqList[i].dmdYmd; 
					schYmd = data.reqList[i].schYmd; 
					orderGroupId = data.reqList[i].orderGroupId;
					mvWay = data.reqList[i].mvWay;
					
					$("#reqNo").text(reqNo);
					$("#sBranchCode").val(sBranchCode); 
					$("#memo1").val(memo1); 
					$("#eBranchCode").val(eBranchCode); 
					$("#memo2").val(memo2); 
					$("#dmdYmd").val(dmdYmd); 
					$("#schYmd").val(schYmd);
					$("#orderGroupId").val(orderGroupId); 
					$("#mvWay").val(mvWay);
				}		
				findReqItem('/logis/stor-mv-req-item-list');				
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
function findReqItem(url) {
	var list = [];
	var reqNo = $("#reqNo").text();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"reqNo":reqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.reqItemList.length;i++){
				    list.push({						  
						 reqNo: data.reqItemList[i].reqNo
						,reqSeq: data.reqItemList[i].reqSeq  
						,orderNo: data.reqItemList[i].orderNo  
						,orderSeq: data.reqItemList[i].orderSeq 
						,itemId: data.reqItemList[i].itemId 
						,itemNo: data.reqItemList[i].itemNo 
						,itemName: data.reqItemList[i].itemName
						,itemNameEn: data.reqItemList[i].itemNameEn 
						,orderCnt: data.reqItemList[i].cnt 
						,reqCnt: data.reqItemList[i].reqCnt
						,rlSbCnt: data.reqItemList[i].rlSbCnt
						,mvCnt: data.reqItemList[i].mvCnt
						,salePrice: data.reqItemList[i].salePrice 
						,sumPrice: data.reqItemList[i].useCnt * data.reqItemList[i].salePrice
						,memo1: data.reqItemList[i].memo1 						
						,memo2: data.reqItemList[i].memo2 
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
		
		
///요청전송
function reqSend(url){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var sBranchCode = $('#sBranchCode').val();
 	var memo1 = $('#memo1').val();
 	var eBranchCode = $('#eBranchCode').val();
 	var memo2 = $('#memo2').val();
 	var dmdYmd = $('#dmdYmd').val();
 	var schYmd = $('#schYmd').val();
 	var mvWay = $('#mvWay').val();

 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var reqArr = "";
	var rseArr = "";
	var reqCntArr = "";   
	var mvCntArr = "";
	var smemo1Arr = "";
	var smemo2Arr = "";
	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		reqNo = rowItem.item.reqNo;
		reqSeq = rowItem.item.reqSeq;
		reqCnt = rowItem.item.reqCnt;
		mvCnt = rowItem.item.mvCnt;
		smemo1 = rowItem.item.memo1;
		smemo2 = rowItem.item.memo2;		
		
		if (typeof orderNo == 'undefined' || orderNo == null) {			orderNo = "";		}
		if (typeof orderSeq == 'undefined' || orderSeq == null) {			orderSeq = "";		}
		if (typeof reqCnt == 'undefined' || reqCnt == null) {			reqCnt = "0";		}
		if (typeof mvCnt == 'undefined' || mvCnt == null) {			mvCnt = "0";		}
		if (typeof smemo1 == 'undefined' || smemo1 == null) {			smemo1 = " ";		}
		if (typeof smemo2 == 'undefined' || smemo2 == null) {			smemo2 = " ";		}
		
		if (i == 0) {
			reqArr = reqNo;		
			rseArr = reqSeq;
			reqCntArr = reqCnt;
			mvCntArr = mvCnt;
			smemo1Arr = smemo1;						
			smemo2Arr = smemo2;
		}else{
			reqArr = reqArr + "^" +reqNo;		
			rseArr = rseArr + "^" +reqSeq;
			reqCntArr = reqCntArr + "^" +reqCnt;
			mvCntArr = mvCntArr + "^" +mvCnt;
			smemo1Arr = smemo1Arr + "^" +smemo1;
			smemo2Arr = smemo2Arr + "^" +smemo2;
		}

	}

	var data = {};
    data.workingType = "ADD";
    //master
	data.orderGroupId = orderGroupId;
	data.sBranchCode = sBranchCode;
	data.memo1 = memo1;
	data.eBranchCode = eBranchCode;
	data.memo2 = memo2;
	data.dmdYmd = dmdYmd;
	data.schYmd = schYmd;
	data.mvWay = mvWay;
	
	//sub
	data.reqArr = reqArr;    //주문번호
	data.rseArr = rseArr;    //주문순번
	data.cntArr = reqCntArr;
	data.mvCntArr = mvCntArr;  
	data.smemo1Arr = smemo1Arr;    //메모1코드
	data.smemo2Arr = smemo2Arr;    //메모2코드
    //console.log("url:"+url);
   // console.log("JSON.stringify(data):"+JSON.stringify(data));
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "ADD",
			"orderGroupId" : orderGroupId,
			"sBranchCode" : sBranchCode,
			"memo1" : memo1,
			"eBranchCode" : eBranchCode,
			"memo2" : memo2,
			"dmdYmd" : dmdYmd,
			"schYmd" : schYmd,
			"mvWay" : mvWay,
						
			"reqArr" : reqArr,    //
			"rseArr" : rseArr,    //
			"cntArr" : cntArr,    //    			
			"mvCntArr" : mvCntArr,    //
			"smemo1Arr" : smemo1Arr,    //
			"smemo2Arr" : smemo2Arr,    //
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			parent.location.reload(true);
			//location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}  
		
// 창고사용 확인
function reqChk(url) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var rowItem;
	var reqArr = "";
	var rseArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.storageUseReqNo;
		rseArr = rseArr + "^" +rowItem.item.reqSeq;
	}
	
	var data = {};
    data.workingType = "CHK";
	
	//sub
	data.reqArr = reqArr;   //요천번호 
	data.rseArr = rseArr;    //요청순번
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "CHK",
			"reqArr" : reqArr,   //요천번호 
			"rseArr" : rseArr,    //요청순번
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}
