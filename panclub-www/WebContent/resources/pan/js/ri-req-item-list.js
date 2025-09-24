
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
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
		
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});

	//요청번호가  존재하는 경우 
	let riReqNo = $("#riReqNo").text();
	if (riReqNo !=''){		
				
		findReq('/logis/ri-req-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "riReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 60, editable : false }
		,{ dataField : "claimType",      headerText : "청구구분", width : 60, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 140, editable : false} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", 		headerText : "품명", width: 140  , style:"left", editable : false  } 
		,{ dataField : "itemNameEn", 	headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "rlCnt",     headerText : "출고수량", style:"right" ,width : 60, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right" }
		,{ dataField : "riReqCnt",     headerText : "요청수량", style:"right" ,width : 60, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"  }
		,{ dataField : "riCnt",     headerText : "반입수량", style:"right" ,width : 60 , dataType: "numeric",formatString: "#,##0"  , style:"right auigrid-must-col-style"  }
		,{ dataField : "salePrice",     headerText : "출고단가", editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"  ,}
		,{ dataField : "sumPrice",     headerText : "공급가액", editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"  }
		,{ dataField : "placeCustCode",     headerText : "발주거래처코드" , editable : false}
		,{ dataField : "placeCustName",     headerText : "발주처명" , editable : false}
		,{ dataField : "storageCode",     headerText : "창고사용코드" , editable : false}
		,{ dataField : "storageName",     headerText : "창고명" , editable : false}
		,{ dataField : "consignStorYN",     headerText : "수탁창고" , width : 60, editable : false}
		,{ dataField : "memo1",     headerText : "비고1", editable : false }
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID", width : 100, editable : false }
		//,{ dataField : "rlNo",     headerText : "출고번호" ,width : 100, editable : false}
		,{ dataField : "riNo",     headerText : "반입번호" ,width : 100, editable : false}
		,{ dataField : "orderNo",     headerText : "주문번호" , editable : false ,visible:false }
		,{ dataField : "orderSeq",     headerText : "주문순번" , editable : false ,visible:false}
	
	];
	
	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "rlCnt",		positionField: "rlCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "riReqCnt",		positionField: "riReqCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "riCnt",		positionField: "riCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "salePrice",		positionField: "salePrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

        // 전체 선택 체크박스가 독립적인 역할을 할지 여부
		independentAllCheckBox: true,
		
		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,

		selectionMode: "multipleCells",
		showAutoNoDataMessage : false, 
		
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.riNo != "" && item.riNo !=null) { // 기 반입처리된 경우  체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.riNo != "" && item.riNo !=null) { // 기 반입처리된 경우 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}			
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

	
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {		
		if (event.checked) {
			// name 의 값들 얻기
			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "riNo");
			// 반입번호가 존재하는것 제거하기
			//uniqueValues.splice(!uniqueValues.indexOf(""), 1);
			uniqueValues.splice(!uniqueValues.indexOf(""), 1);
			AUIGrid.setCheckedRowsByValue(event.pid, "riNo", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "riNo", []);
		}
	});
	
	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	
};

function auiCellEditingHandler(event) {
	if (event.dataField == 'riCnt' ) {
		var sumPrice = event.item.riCnt * event.item.salePrice; 
		AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);	
	}
	
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		if (event.item.riCnt > event.item.riReqCnt) {
			alert("반입수량이 반입요청수량보다 많습니다!");
			item = {
				riCnt: event.item.riReqCnt,
				sumPrice: event.item.riReqCnt * event.item.salePrice
			};
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		}
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	


		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;




// 마스터 조회
function findReq(url) {
	var riReqNo = $("#riReqNo").text();
	var gvComCode = $("#gvComCode").val();//230921
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
			"riReqNo":riReqNo,
			"gvComCode":gvComCode
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
				
					
				for(i=0;i<data.reqList.length;i++){
					riReqNo = data.reqList[i].riReqNo;
					receiver = data.reqList[i].receiver;
				    memo1 = data.reqList[i].memo1; 
					dmdYmd = data.reqList[i].dmdYmd; 
					dmdTime = data.reqList[i].dmdTime; 
					orderGroupId = data.reqList[i].orderGroupId;
					attaFileOri = data.reqList[i].attaFileOri;
					riWay = data.reqList[i].riWay;
					regUserId = data.reqList[i].regUserId;
					regYmd = data.reqList[i].regYmd;
					carNo = data.reqList[i].carNo;
					vinNo = data.reqList[i].vinNo;
					orderTypeName = data.reqList[i].orderTypeName;
					makerCode = data.reqList[i].makerCode;
					carType = data.reqList[i].carType;
					
					custCode = data.reqList[i].saleCustCode; 
					custName = data.reqList[i].saleCustName;
					custMgrName = data.reqList[i].custMgrName;
					custMgrPhone = data.reqList[i].custMgrPhone;
					
					$("#riReqNo").text(riReqNo);
					$("#receiver").val(receiver); 
					$("#memo1").val(memo1); 
					$("#dmdYmd").text(dmdYmd); 
					$("#dmdTime").text(dmdTime);
					$("#orderGroupIdDsp").text(orderGroupId); 
					//$("#attaFileOri").val(attaFileOri);
					$("#riWay").text(riWay);
					$("#regUserName").text(regUserId);
					$("#estiYmd").text(regYmd);
					$("#carNo").text(carNo);
					$("#vinNo").text(vinNo);
					$("#orderTypeName").text(orderTypeName);
					$("#makerName_carType").text(makerCode + ' ' + carType); 
					
					$("#custCode").val(custCode);
					$("#custName").val(custName);
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone);
					
				}		
				findReqItem('/logis/ri-req-item-list');				
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
	var riReqNo = $("#riReqNo").text();
	var gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
   
   
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"riReqNo":riReqNo,
			"gvComCode":gvComCode
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
						riReqNo: data.reqItemList[i].riReqNo
						,reqSeq: data.reqItemList[i].reqSeq  
						,claimType: data.reqItemList[i].claimType	
						,itemId: data.reqItemList[i].itemId 
						,itemNo: data.reqItemList[i].itemNo 
						,itemName: data.reqItemList[i].itemName
						,itemNameEn: data.reqItemList[i].itemNameEn 
						,rlCnt: data.reqItemList[i].rlCnt
						,riReqCnt: data.reqItemList[i].riReqCnt
						,riCnt: data.reqItemList[i].riReqCnt 
						,salePrice: data.reqItemList[i].salePrice
						,sumPrice: data.reqItemList[i].riReqCnt * data.reqItemList[i].salePrice
						,placeCustCode: data.reqItemList[i].placeCustCode
						,placeCustName: data.reqItemList[i].placeCustName
						,storageCode: data.reqItemList[i].storageCode 
						,storageName: data.reqItemList[i].storageName
						,memo1: data.reqItemList[i].memo1 						
						,orderGroupId: data.reqItemList[i].orderGroupId
						//,rlNo: data.reqItemList[i].rlNo
						,riNo: data.reqItemList[i].riNo
						,orderNo: data.reqItemList[i].orderNo
						,orderSeq: data.reqItemList[i].orderSeq
						,consignStorYN: data.reqItemList[i].consignStorYN    //2023.09.21
						
						,makerName: data.reqItemList[i].makerName
						,className: data.reqItemList[i].className
						,factoryNo: data.reqItemList[i].factoryNo
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
		
		
// 반입처리
function riProc(url,workingType){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var memo = $('#memo1').val();
 	var riMgr = $('#receiver').val();
 	var sumPrice = 0;
 	//var storageCode = "";
 	var custCode =  $('#custCode').val();
 	var storageCode = $("#popStorageCode").val();
	var rackCode = $("#popRackCode").val();
	
	if (rackCode == '') {
		alert("입고할 랙을 선택하세요.");
		return;
	}
		
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var gvComCode = $("#gvComCode").val();  //230921
	if(gvComCode=='null'){gvComCode = ''}


	var rowItem;
	var odNoArr = "";
	var odSeqArr = "";
	var reqArr = "";
	var seqArr = "";
	//var scdArr = "";   // 창고코드배열 
	var cntArr
	var mm1Arr = "";
	//var mm2Arr = "";
	var errCnt = 0;	
	/////////////////////////////////
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		odNo = rowItem.item.orderNo;
		odSeq = rowItem.item.orderSeq;
		riReqNo = rowItem.item.riReqNo;
		riSeq = rowItem.item.reqSeq;
		//storageCode = rowItem.item.storageCode;
		riCnt = rowItem.item.riCnt;
		if(riCnt == 0){
			errCnt = errCnt +1;
			break;		
		}
		memo1 = rowItem.item.memo1;
		//memo2 = rowItem.item.memo2;
		sumPrice = sumPrice + rowItem.item.sumPrice;			
		
		if (typeof odNo == 'undefined' || odNo == null) {			odNo = "";		}
		if (typeof odSeq == 'undefined' || odSeq == null) {			odSeq = "";		}
		if (typeof riReqNo == 'undefined' || riReqNo == null) {			riReqNo = "";		}
		if (typeof riSeq == 'undefined' || riSeq == null) {			riSeq = "";		}
		//if (typeof storageCode == 'undefined' || storageCode == null) {			storageCode = "";		}
		if (typeof riCnt == 'undefined' || riCnt == null) {			riCnt = "";		}
		if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
		//if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
		
		if (i == 0) {
			odNoArr = odNo;		
			odSeqArr = odSeq;
			reqArr = riReqNo;		
			seqArr = riSeq;
			//scdArr = storageCode;
			cntArr = riCnt;
			mm1Arr = memo1;						
			//mm2Arr = memo2;
		}else{
			odNoArr = odNoArr + "^" +odNo;		
			odSeqArr = odSeqArr + "^" +odSeq;
			reqArr = reqArr + "^" +riReqNo;		
			seqArr = seqArr + "^" +riSeq;
			//scdArr = scdArr + "^" +storageCode;
			cntArr = cntArr + "^" +riCnt;
			mm1Arr = mm1Arr + "^" +memo1;
			//mm2Arr = mm2Arr + "^" +memo2;
		}

	}
	if (errCnt > 0) {
		alert("반입요청수량이 '0' 입니다.")
		return;
	}
	/*
	var data = {};
    data.workingType = workingType;
    //master
	data.orderGroupId = orderGroupId;
	data.memo1 = memo;
	data.sumPrice = sumPrice;
	data.riMgr = riMgr;
	//data.storageCode = storageCode;
	//data.custCode = custCode;
	
	//sub
	data.odNoArr = odNoArr;    //번호
	data.odSeqArr = odSeqArr;    //순번
	data.reqArr = reqArr;    //번호
	data.seqArr = seqArr;    //순번
	//data.scdArr = scdArr;    //창고코드
	data.cntArr = cntArr;  
	data.mm1Arr = mm1Arr;    //메모1코드
	//data.mm2Arr = mm2Arr;    //메모2코드
	*/

    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"orderGroupId" : orderGroupId,
			"memo1" : memo,
			"price" : sumPrice,
			"riMgr" : riMgr,
			//"storageCode" : storageCode,
			"custCode" : custCode,
						
			"odNoArr" : odNoArr,    //번호
			"odSeqArr" : odSeqArr,    //순번
			"reqNoArr" : reqArr,    //번호
			"reqSeqArr" : seqArr,    //순번
			//"storCdArr" : scdArr,    //    			
			"riCntArr" : cntArr,    //
			"memo1Arr" : mm1Arr,    //
			//"memo2Arr" : mm2Arr,    //
			"storageCode": storageCode,
			"rackCode": rackCode,
			"gvComCode": gvComCode
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload => 부모창에서 재조회후 팝업 닫기
	        window.parent.$("#btnFind").trigger('click'); //내역 재조회
			parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			//location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}  
		
		
//프린트		           
function print() {
	var riReqNo = $("#riReqNo").text();
	let gvComCode = $("#gvComCode").val();  //230921
	if(gvComCode=='null'){gvComCode = ''}
	window.open ("/logis/ri-req-item-list-print?riReqNo="+riReqNo+"&gvComCode=" + gvComCode ,"_blank");
}

// 반입처리 버튼 클릭 시 팝업
function riProcPop(url,workingType) {

 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var errCnt = 0;	
	var storCodeMulti = '';
	var prev_consignStorYN = '';
	
	let gvComCode = $("#gvComCode").val();  //230921
	if(gvComCode=='null'){gvComCode = ''}
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		riCnt = rowItem.item.riCnt;
		if(riCnt == 0){
			errCnt = errCnt +1;
			break;		
		}
		storCode = rowItem.item.storageCode;
		if (i==0) {
			storCodeMulti = storCode;
		}else{
			storCodeMulti = storCodeMulti + ',' + storCode;
		}
		
		if (i > 0 && prev_consignStorYN != rowItem.item.consignStorYN) {
			alert("수탁창고에서 나간 부품은 자사창고와 같이 반입처리를 할 수 없습니다. ")
			return;
		}else{
			prev_consignStorYN	= rowItem.item.consignStorYN;
		}
		
		
	}

	if (errCnt > 0) {
		alert("반입수량이 '0' 입니다.")
		return;
	}
	 
	//창고목록 
   	//2023-12-19 supi 원래 common-pan에 있는 공용 통신이었으나 다른 기능에 영향주지 않도록 분리됨 
	if (storCodeMulti === undefined) {
		storCodeMulti = '';
	} 
	$.ajax({
		type: "POST",
		url: "/base/storage-list",  //"/base/storage-list"
		dataType: "json",
		data: {
			"validYN" : 'Y',
			"rlStandByYN" : 'Y'
			,"storCodeMulti" : storCodeMulti
			,"gvComCode" : gvComCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			$("#popStorageCode").empty();
			//console.log("len:"+data.storageList.length);
			if (data.storageList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				//console.log("len:"+data.storageList.length);
				$("#popStorageCode").append("<option value='' txtVal='' ></option>");
				for (i = 0; i < data.storageList.length; i++) {   //1.수탁창고대상이 아니면 모든 창고 노출(출고대기) 2. 통신으로 받아온 창고가 3개(출고대기포함)이면 전부 노출 3. 이외의 경우 자신의 대상 위탁창고만 표시
					if(prev_consignStorYN != 'Y' || data.storageList.length>3 || storCodeMulti.indexOf(data.storageList[i].storageCode)>-1)
						$("#popStorageCode").append("<option value="+data.storageList[i].storageCode+" txtVal="+data.storageList[i].storageName+" >"+data.storageList[i].storageName+"</option>");
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
 
	
	$(".ui-dialog-titlebar-close").html("X");
	
	var dialogItem;
	dialogItem = $("#dialog-form").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: 400,
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			"확인": function(event) {
				riProc(url,workingType);
			},
			"취소": function(event) {
				dialogItem.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	
		}
	});

	return;
}		

// 반입요청취소
function riReqProc(url,workingType){
 
 	var orderGroupId = $('#orderGroupId').val();

 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var reqArr = "";
	var seqArr = "";
	
	let gvComCode = $("#gvComCode").val();  //230921
	if(gvComCode=='null'){gvComCode = ''}
	
	/////////////////////////////////
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		riReqNo = rowItem.item.riReqNo;
		riSeq = rowItem.item.reqSeq;
		
		if (typeof riReqNo == 'undefined' || riReqNo == null) {			riReqNo = "";		}
		if (typeof riSeq == 'undefined' || riSeq == null) {			riSeq = "";		}
		
		if (i == 0) {
			reqArr = riReqNo;		
			seqArr = riSeq;
		}else{
			reqArr = reqArr + "^" +riReqNo;		
			seqArr = seqArr + "^" +riSeq;
		}
	}

	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"orderGroupId" : orderGroupId,
			"reqArr" : reqArr,    //번호
			"rseArr" : seqArr,    //순번
			"gvComCode" : gvComCode	//230313   
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload => 내역 재조회후 팬시박스 닫기
	        window.parent.$("#btnFind").trigger('click'); //내역 재조회
			parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			//location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}  

// 입고창고 변경시 랙 초기화
function resetRackInfo() {
	$("#popRackCode").val("");
	$("#popRackName").val("");
 
}