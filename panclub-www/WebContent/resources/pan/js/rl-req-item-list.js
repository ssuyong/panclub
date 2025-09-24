
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
const setTimeoutDelay = 250;
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
let rlComCode;   
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
		 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer4('/logis/rlReqUpt');
	});
	$("#btnClose").click(function(){
		//console.log("닫기");
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
	let rlReqNo = $("#rlReqNo").text();
	if (rlReqNo !=''){		
		//console.log("storageUseReqNo ::"+ storageUseReqNo);		
		findReq('/logis/rl-req-list');
		
		if($("#orderTypeName").text() ==='대행'){
			$("#supplyInfo-title").css("display","block");
			$("#supplyInfo-input").css("display","block");			
		}
		
	}	  
	$("#barcodeLabelPrint").click(()=>{ //인쇄버튼 이벤트
		barcodePrintItem();
	});
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "rlReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "rlNo",     headerText : "출고번호" ,width : 100, editable : false}  //20240507 supi 처리완료되어 출고번호가 생긴 행도 체크 가능하게 되서 구분을 쉽게 하기 위해 앞으로 옴검
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 60, editable : false }
		,{ dataField : "claimType",      headerText : "청구구분", width : 60, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 140, editable : false} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", 		headerText : "품명", width: 140  , style:"left", editable : false  } 
		,{ dataField : "itemNameEn", 	headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "orderCnt",      headerText : "주문수량", style:"right", width : 60, editable : false   }
		,{ dataField : "rlReqCnt",     headerText : "요청수량", style:"right" ,width : 60, editable : false  }
		,{ dataField : "rlStandByQty",     headerText : "출고랙재고수량", style:"right" ,width :120, editable : false  }
		,{ dataField : "rlCnt",     headerText : "출고수량*" ,width : 70  , style : "right  auigrid-must-col-style"}
		,{ dataField : "barcodeScanQty",     headerText : "바코드스캔수량", style:"right" ,width :120, editable : false  }
		,{ dataField : "salePrice",     headerText : "판매단가" , dataType: "numeric",formatString: "#,##0"  , style:"right"  , editable : false }
		,{ dataField : "sumPrice",     headerText : "공급가액" , dataType: "numeric",formatString: "#,##0"  , style:"right"   , editable : false }
		,{ dataField : "rlStandByStorCode",     headerText : "출고예정창고" , editable : false, visible : false }
		,{ dataField : "rlStandByStorName",     headerText : "출고대기창고" , editable : false}
		,{ dataField : "rlStandByRackCode",     headerText : "대기랙코드" , editable : false, visible : false }
		,{ dataField : "rlStandByRackName",     headerText : "대기랙명" , editable : false, visible : false }
		,{ dataField : "placeCustCode",     headerText : "발주거래처코드" , editable : false}
		,{ dataField : "placeCustName",     headerText : "발주처명" , editable : false}
		,{ dataField : "reqPlaceCustCode",     headerText : "요청발주거래처코드" , editable : false}
		,{ dataField : "reqPlaceCustName",     headerText : "요청발주처명" , editable : false}
		,{ dataField : "storageCode",     headerText : "창고사용코드" , editable : false}
		,{ dataField : "storageName",     headerText : "창고명" , editable : false}
		,{ dataField : "memo1",     headerText : "비고1", editable : false }
		,{ dataField : "memo2",     headerText : "비고2" , editable : false}
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID", width : 100, editable : false }
		,{ dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 60, editable : false ,visible:false}
		
	];
	
	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "orderCnt",		positionField: "orderCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlReqCnt",		positionField: "rlReqCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlCnt",		positionField: "rlCnt",		operation: "SUM",		formatString: "#,##0"	}, 
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
		//showRowCheckColumn: true,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		showStateColumn : true,
		
		//footer 노출
		showFooter: true,
//		independentAllCheckBox: true,
		
		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false, 
		
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
//		rowCheckableFunction: function (rowIndex, isChecked, item) {
//			if (item.rlNo != "" && item.rlNo !=null) { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
//				return false;
//			}
//			return true;
//		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
//		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
//			if (item.rlNo != "" && item.rlNo !=null) { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
//				return false; // false 반환하면 disabled 처리됨
//			}
//			return true;
//		}		
	};

	
	//var auiGridProps = {};
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

	// 셀 선택변경 이벤트 바인딩
	AUIGrid.setFooter(myGridID, footerLayout);		
	
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		//fn_dcProc();
		
	});
	
	
//	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
//		if (event.checked) {
//			// name 의 값들 얻기
//			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "rlNo");
//			// Anna 제거하기
//			uniqueValues.splice(!uniqueValues.indexOf(""), 1);
//			AUIGrid.setCheckedRowsByValue(event.pid, "rlNo", uniqueValues);
//		} else {
//			AUIGrid.setCheckedRowsByValue(event.pid, "rlNo", []);
//		}
//	});
	
	/*

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
	if (event.dataField == 'rlCnt' ) {
		var sumPrice = event.item.rlCnt * event.item.salePrice; 
		AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);	
	}
	
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		if (event.item.rlCnt > event.item.rlReqCnt) {
			alert("출고수량이 출고요청수량보다 많습니다!");
			item = {
				rlCnt: event.item.rlReqCnt,
				sumPrice: event.item.rlReqCnt * event.item.salePrice
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
	var rlReqNo = $("#rlReqNo").text();
	var gvComCode = $("#gvComCode").val() || '';
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
			"rlReqNo":rlReqNo,
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
				masterData = data.reqList[0];
				$("#rlReqNo").text(masterData.rlReqNo);
				
				$("#rlMgr").val(masterData.rlMgr); 
				$("#memo1").val(masterData.memo1); 
				$("#dmdYmd").text(masterData.dmdYmd); 
				$("#dmdTime").text(masterData.dmdTime);
				$("#orderGroupIdDsp").text(masterData.orderGroupId); 
				$("#lastPickParts").text(masterData.lastPickParts);
				$("#rlWay").val(masterData.rlWay);
				$("#orderTypeName").text(masterData.orderTypeName);
				$("#carNo").text(masterData.carNo);
				$("#vinNo").text(masterData.vinNo);
				$("#regUserName").text(masterData.regUserId);
				$("#estiYmd").text(masterData.regYmd);
				$("#makerName_carType").text(masterData.makerCode + ' ' + masterData.carType); 
				
				$("#custCode").val(masterData.saleCustCode);
				$("#custName").val(masterData.saleCustName);
				$("#custMgrName").val(masterData.custMgrName);
				$("#custMgrPhone").val(masterData.custMgrPhone);
				
				$("#storageCode").val(masterData.storageCode);
				$("#storageName").val(masterData.storageName);
				$("#rackCode").val(masterData.rackCode);
				$("#rackName").val(masterData.rackName);
				//$("#stdClType").val(stdClType);
				
				$("#supplyCustCode").val(masterData.supplyCustCode);
				$("#supplyCustName").val(masterData.supplyCustName);
				$("#supplyMgrName").val(masterData.supplyMgrName);
				$("#supplyMgrPhone").val(masterData.supplyMgrPhone);
				$("#btnAccept").html(masterData.isAccept=='Y'?'접수취소':'접수');
				
				$("#page-title").text('출고요청 상세내역'+(masterData.comName?'('+masterData.comName+')':'' ));
				rlComCode = masterData.comCode;
				     
						
				findReqItem('/logis/rl-req-item-list');				
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
	var rlReqNo = $("#rlReqNo").text();
	var gvComCode = $("#gvComCode").val() || '';
	//console.log("aa:"+storageUseReqNo);
	
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
   // console.log("a:"+ordArr);
   // console.log("a:"+seqArr);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"rlReqNo":rlReqNo,
			"gvComCode":gvComCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			AUIGrid.setGridData("#grid_wrap", data.reqItemList);
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


//출고 처리	
function rlProcAdd()
{
	//if(dblRegClkChk()) return;
	
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	const rlRow = checkedItems.find(row=>row.item.rlNo != '')
	if(rlRow) 
	{
		alert(`이미 출고처리된 부품이 존재합니다 : 순번 ${rlRow.item.reqSeq}번째`);
		return;
	}
	
	const rlCntZero = checkedItems.find(row=>row.item.rlCnt == 0) 
	if(rlCntZero)
	{
		alert("출고요청수량이 '0' 입니다.");
		return;
	}
	//rlCnt > rlStandByQty
	const rlCntOver = checkedItems.find(row=>row.item.rlCnt > row.item.rlStandByQty) 
	if(rlCntOver)
	{
		alert("출고예정랙의 재고수량이 출고요청수량 미만입니다.\n출고예정랙의 재고수량을 확인하세요.");
		return;
	}
	
	const orderGroupId = $('#orderGroupIdDsp').text();
	const memo = $('#memo1').val();
	const rlMgr = $("#rlMgr").val(); 	
	const rlWay = $("#rlWay").val(); 
	const sumPrice = checkedItems.reduce((a,c)=>{
						return a+=c.item.sumPrice;
					},0)
	const price = checkedItems.reduce((a,c)=>{
						return a+=c.item.salePrice;
					},0)
	
	const storageCode = $("#storageCode").val();
	const rackCode = $("#rackCode").val();  
	const stdClType = $("#stdClType").val();  
	const gvComCode = $("#gvComCode").val() || '';  
	const custCode = $("#custCode").val();
 
	const data = {
							workingType : 'ADD' ,
							orderGroupId ,
							memo ,
							rlMgr , 
							rlWay ,
							sumPrice ,
							custCode ,
							storageCode ,
							rackCode , 
							price ,
							stdClType ,
							gvComCode ,
			}

	$.ajax({
	    url : '/logis/rlAdd',
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data  ,
	    success: function(result) {
			if(result.result_code == 'OK')
			{	
				const rlNo = result.rlno;
				const itemInfo = checkedItems.map(row=>{
															return {
																		workingType : 'ADD' ,
																		rlNo , 
																		reqNoArr : row.item.rlReqNo || '', 
																		reqSeqArr : row.item.reqSeq || '', 
																		rlCntArr : row.item.rlCnt || '',
																		rlUnitPriceArr : row.item.salePrice || '',
																		memo1Arr : row.item.memo1 || '', 
																		memo2Arr : row.item.memo2 || '',
																		gvComCode ,
																		comCode : rlComCode,
															}			
										})
				parent.ProgressManager.open(itemInfo.length)
				rlProcItemAdd(itemInfo , 0)
			}
			else
			{
				alert(`${result.result_msg}`);
				return;
			}
		    console.log(result);
	    },
	    error:function(request, status, error){ 
	    }
	});
}
//요청 취소 CANCEL
function rlProcCancel()
{
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	const rlRow = checkedItems.find(row=>row.item.rlNo != '')
	if(rlRow) 
	{
		alert(`이미 출고처리된 부품이 존재합니다 : 순번 ${rlRow.item.reqSeq}번째`);
		return;
	}
	const gvComCode = $("#gvComCode").val() || ''; 
	const itemInfo = checkedItems.map(row=>{
															return {
																		workingType : 'CANCEL' , 
																		reqNoArr : row.item.rlReqNo || '', 
																		reqSeqArr : row.item.reqSeq || '', 
																		rlCntArr : row.item.rlCnt || '',
																		rlUnitPriceArr : row.item.salePrice || '',
																		memo1Arr : row.item.memo1 || '', 
																		memo2Arr : row.item.memo2 || '',
																		gvComCode ,
																		comCode : rlComCode,
															}			
										})
										
 
	parent.ProgressManager.open(itemInfo.length)
	rlProcItemAdd(itemInfo , 0)
}

//디테일 처리
function rlProcItemAdd(itemInfo , index , err = [])
{
	 
	const data = itemInfo[index];
	$.ajax({
	    url : '/logis/rlItemAdd',
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data  ,
	    success: function(result) {
			parent.ProgressManager.next();
			const nextIndex = index+1;
			if(result.result_code == 'Err') err.push(result)
			
			if(itemInfo.length > nextIndex)
			{
				setTimeout(()=>{
					rlProcItemAdd(itemInfo,nextIndex);
				} , setTimeoutDelay);
			}
			else
			{
				let msg = '처리완료';
				if(err.length >0)
				{
					msg = err.reduce((a,c)=>{
				            a+=c.result_msg+'\n'
				            return a
				    } ,'')
				}
				parent.ProgressManager.end(msg , 
					()=>{
					window.parent.$("#btnFind").trigger('click'); //내역 재조회
					parent.jQuery.fancybox.close();
				});
			}
	    },
	    error:function(request, status, error){ 
	    }
	});
}	
		

		
//프린트		
		
	function print_() {
	
	if($("#iInput_printAccept").prop('checked'))  //인쇄시 자동접수 체크된 경우 
	{
		rlReqAccept('ACCEPT');
	}
	
	
	var rlReqNo = $("#rlReqNo").text();
	var printMemoYN = "Y";
	var printDcYN = "";
	/*
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}*/
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	var printYN = "Y";
	//console.log ("printDcYN" +printDcYN);
	
	
	//인쇄시 품번에 따라 정렬 체크박스에 대한 코드
	var itemNoOderBy = '';
	
	if($('input:checkbox[name=itemNoOderByAscYN]').is(':checked'))
	{
		 itemNoOderBy = "ASC";
	}
	
	var gvComCode = $("#gvComCode").val();  
	if(gvComCode=='null'){gvComCode = ''}
	
	
	window.open ("/logis/rl-req-item-list-print?rlReqNo="+rlReqNo+"&memoYN="+printMemoYN+"&printDcYN=" + printDcYN+"&printYN=" + printYN+"&itemNoOderBy="+itemNoOderBy+"&gvComCode="+gvComCode,"_blank");
	
}	;
		
		




$("#btnDownload").click(function() {
	//var estiNo = $("#estiNo").val();
	var printMemoYN = "";
	var imgYN = "Y";

	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}


	window.location.href = "/logis/rl-req-item-list-print"
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
	//console.log("클릴잉");
});

//UPDATE rlReqMemo 2023.07.04 bk
function updateDataToServer4(url) {


	var rlReqNo = $("#rlReqNo").text();
    var rlMgr = $("#rlMgr").val(); 
    var memo1 = $("#memo1").val(); 
    var rlWay = $("#rlWay").val(); 
    
    var gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	console.log("gvComCode : " + gvComCode)
  

	var data = {};
	data.workingType = "MEMO_UPT";
	data.rlReqNo = rlReqNo;  
    data.rlMgr = rlMgr; 
    data.memo1 = memo1; 
    data.rlWay = rlWay; 
    data.gvComCode = gvComCode; 
   

   //return;
	
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "MEMO_UPT",
			"rlReqNo" : rlReqNo,
			"rlMgr" : rlMgr,
			"memo1" : memo1,
			"rlWay" : rlWay,				 			
			"gvComCode" : gvComCode				 			
		}, success: function(data) {
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
	
};

setItemBarcodeScanFun((item)=>{
	const itemData = {itemId:item.itemId ,
				 itemNo:item.itemNo ,
				 itemName:item.itemName ,
				 rackCode:item.rackCode ,
				 rackName:item.rackName ,
				 storCode:item.storCode ,
				 storName:item.storName ,
				 stockQty:item.stockQty ,
				 
				 };
				 
	
	const GridId = '#grid_wrap'; 
	const auiGridData = AUIGrid.getRowsByValue(GridId , 'itemId' , itemData.itemId); //상세내역 그리드 내에서 itemId가 스캔데이터와 일치하는 행들을 배열로 가져옴
 
 	if(auiGridData.length == 0)
 	{
		itemBarcodeScanfailPopup('스캔한 부품과 동일한 부품ID가 요청에 존재하지 않습니다',itemData);
		return;
	}
	
 	const targetRow = auiGridData.find((row)=>{if(row.rlNo == '') return true;})
 	
 	if(!targetRow)
 	{
		itemBarcodeScanfailPopup('미처리된 출고요청이 없습니다.',itemData);
		return;
	}
	 
 	if((targetRow?.barcodeScanQty || 0) >= targetRow.rlReqCnt)
 	{
		itemBarcodeScanfailPopup('스캔한 부품의 스캔한 수량을 더이상 증가시킬수 없습니다(수량확인)',itemData);
		return;
	}
 	const targetIndex = AUIGrid.getRowIndexesByValue(GridId , '_$uid' , targetRow._$uid); // 그리드행의 _$uid를 통해 해당 인덱스 추출
 	AUIGrid.updateRow(GridId , {barcodeScanQty:(targetRow?.barcodeScanQty || 0)+1}, targetIndex[0]); 
 	barcodeScanSuccessCountUp();
 	if((targetRow?.barcodeScanQty || 0)+1 == targetRow.rlReqCnt)
		AUIGrid.addCheckedRowsByValue(GridId ,  '_$uid' , targetRow._$uid);
	
});
		
//접수,접수취소 버튼 이벤트
$("#btnAccept").on("click",function(){
	const buttonText = $(this).html(); 
	
	
	if(buttonText == '접수') // 접수처리
	{
		//접수처리 통신
		rlReqAccept('ACCEPT');
	}
	else if(buttonText == '접수취소')  //접수취소 권한 CA001_01
	{
		//접수취소통신
		rlReqAccept('ACCEPT_CANCEL');
	}
})

//마스터접수 관련 처리
function rlReqAccept(workingType) 
{
	const rlReqNo = $("#rlReqNo").text(); 
	
	$.ajax({
	    url : '/logis/rlReqUpt',
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"rlReqNo" : rlReqNo,
			"gvComCode" : 	$("#gvComCode").val() 			
		}, success: function(data) {
	     	
	       	if(data.result_code =='OK')
	       	{
				$("#btnAccept").html(workingType=='ACCEPT'?'접수취소':'접수');
			//	window.parent.$("#btnFind").trigger('click'); //내역 재조회  => 20240715 supi 이영훈팀장님 요청으로 접수해도 재조회 x
			}
			else 
			{
				alert(data.result_msg);
			}
	        },	
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}



  
