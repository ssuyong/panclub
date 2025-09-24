
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

function dealWithKeyboard(event) {

}

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
	
	/*	 
	$("#btnReg").click(function(){
		//updateDataToServer("/order/estiAdd", "ADD");
	});
	*/
	
	$('select[id=deliWay]').bind('change', function(event) {
		const deliway = $("#deliWay").val()
	 
		if(deliWay == '방문수령' && deliway != '일반배송'  )
		{
			$("#senderDiv").hide();
			$("#receiverDiv").hide();
			$("#payTypeLabel").hide();
			$("#payTypeDiv").hide();
			$("#rcvlogisCodeLabel").show();
			$("#rcvlogisCodeDiv").show();
		}
		else if(deliway == '일반배송' && deliway != '방문수령')
		{
			$("#senderDiv").hide();
			$("#receiverDiv").hide();
			$("#payTypeLabel").hide();
			$("#payTypeDiv").hide();
			$("#rcvlogisCodeLabel").hide();
			$("#rcvlogisCodeDiv").hide();
		}
		else
		{
			$("#senderDiv").show();
			$("#receiverDiv").show();
			$("#payTypeLabel").show();
			$("#payTypeDiv").show();
			$("#rcvlogisCodeLabel").hide();
			$("#rcvlogisCodeDiv").hide();
		}

		
	})
	
	$("#btnClose").click(function(){
		//parent.location.reload();
		parent.jQuery.fancybox.close();
	});
	$("#btnDel").click(function(){
	});
	$("#btnConfirm").click(function(){
		this.blur(); 
		updateDataToServer( '/order/pcReqAdd', "ACCEPT" ); 
		//order();
		//parent.jQuery.fancybox.close();
	});
	$("#btnReject").click(function(){ //반려 
		this.blur(); 
		updateDataToServer('/order/pcReqAdd' , "REJECT");
		//parent.jQuery.fancybox.close();
	});
	//요청번호가  존재하는 경우 
	let pcReqNo = $("#pcReqNo").text();
	if (pcReqNo !=''){		 				
		findReq("/order/out-pc-req-list")
	}	  
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "gvComCode",      headerText : "요청업체코드", width : 100, editable : false ,visible:true}
		,{ dataField : "pcReqNo",      headerText : "요청번호", width : 150, editable : false }
		,{ dataField : "procStep",      headerText : "처리상태", width : 80, editable : false }
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 100, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }	 
		,{ dataField : "itemId",      headerText : "부품ID", width : 150, editable : false }
		,{ dataField : "makerName",      headerText : "제조사명"  , width : 120, style : "left"   }
		,{ dataField : "itemNo",      headerText : "품번", width : 200, editable : false} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", 		headerText : "품명", width: 300  , style:"left", editable : false  } 
		,{ dataField : "centerPrice",      headerText : "센터가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 120 }
		,{ dataField : "outSalePrice",      headerText : "판매가" ,  
		 headerTooltip : {  
        		show : true,
       			 tooltipHtml : '판매가는 상황에 따라 변동될수 있습니다'
  		  } ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 120 }
		,{ dataField : "cnt",     headerText : "요청수량", style:"right" ,width : 100, editable :true , dataType: "numeric",formatString: "#,##0" , style: "right   auigrid-must-col-style" }
		,{ dataField : "gvMemo1",     headerText : "비고1", style:"left" ,width : 400, editable : true , style: "left   auigrid-opt-col-style" }
		
		,{ dataField : "salePrice",     headerText : "주문단가", width : 100, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"  , visible : false}
		,{ dataField : "sumPrice",     headerText : "공급가액", width : 100, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right" , visible : false }
		,{ dataField : "inMemo1",     headerText : "메모", width : 200 , editable : false, visible : false }
		,{ dataField : "rcvCustName",     headerText : "납품 거래처명", width : 140 , editable : false, visible : false }
		,{ dataField : "gvPlaceNo",     headerText : "요청업체 발주번호" , editable : false , width : 120, visible : false }
		,{ dataField : "gvPlaceSeq",     headerText : "요청업체 발주순번" ,      editable : false , width : 100, visible : false }
		,{ dataField : "dlvType",     headerText : "배송유형" ,      editable : false , width : 100, visible : false }
	
	];
	
	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}
		//, 
		//{		dataField: "salePrice",		positionField: "salePrice",		operation: "SUM",		formatString: "#,##0"	}, 
		//{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	
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
		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
        // 전체 선택 체크박스가 독립적인 역할을 할지 여부
		//independentAllCheckBox: true,
		
		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		//showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,

		selectionMode: "multipleCells",
		showAutoNoDataMessage : false, 
		
 
		independentAllCheckBox: true,
		
		rowCheckableFunction: function (rowIndex, isChecked, item) {
				if(item.procStep != "" && item.procStep != null) { 
					return false;
				}
				return true;
			},
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			 if(item.procStep != "" && item.procStep != null) { 
				return false;  
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
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
		if (event.checked) {
		 
			let uniqueValues = [''];
	 
			AUIGrid.setCheckedRowsByValue(event.pid, "procStep", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "procStep", []);
		}
	});
};

function auiCellEditingHandler(event) {
	
};	


		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;




// 마스터 조회
function findReq(url) {
	var pcReqNo = $("#pcReqNo").text()
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType" : "LIST_OUT",
			"pcReqNo":pcReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.pcReqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{					
				
				
				
				for(i=0;i<data.pcReqList.length;i++){
					 regYmd = data.pcReqList[i].regYmd; 
					pcReqNo= data.pcReqList[i].pcReqNo; 
					gvComCode= data.pcReqList[i].gvCustName; 
					gvPlacNo= data.pcReqList[i].gvPlacNo;
					gvMgr= data.pcReqList[i].gvMgr; 
					gvMemo= data.pcReqList[i].gvMemo; 
				//	procStep= data.pcReqList[i].procStep; 
					procUserId= data.pcReqList[i].procUserId; 
					procDate= data.pcReqList[i].procDate; 
					rejectMemo= data.pcReqList[i].rejectMemo; 
					regUserId =data.pcReqList[i].regUserId; 
					uptUserId= data.pcReqList[i].uptUserId;
					uptYmd= data.pcReqList[i].uptYmd;
					uptHms= data.pcReqList[i].uptHmsg;
					gvCustName= data.pcReqList[i].gvCustName;
					regUserName= data.pcReqList[i].regUserName;

					//2023.12.11. 아래 10개
					deliWay = data.pcReqList[i].deliWay;
					deliPayType = data.pcReqList[i].deliPayType || '군자'; // 위탁업체에서 선택박스 변경시 초기화값 이상해지는 부분을 이쪽에서 초기화
					senderCustName = data.pcReqList[i].senderCustName;
					senderName = data.pcReqList[i].senderName;
					senderTel = data.pcReqList[i].senderTel;
					senderAddr1 = data.pcReqList[i].senderAddr1;
					receiverCustName = data.pcReqList[i].receiverCustName;
					receiverName = data.pcReqList[i].receiverName;
					receiverTel = data.pcReqList[i].receiverTel;
					receiverAddr1 = data.pcReqList[i].receiverAddr1;		
					rcvlogisCode = data.pcReqList[i].rcvlogisCode || '군자';		// 위탁업체에서 선택박스 변경시 초기화값 이상해지는 부분을 이쪽에서 초기화
					
										
					$("#regYmd").text(regYmd);
					$("#gvComCode").text(gvComCode);
					$("#gvPlacNo").text(gvPlacNo);
					$("#gvMgr").val(gvMgr); //$("#gvMgr").text(gvMgr);
					$("#gvMemo").val(gvMemo); //$("#gvMemo").text(gvMemo);
				//	$("#procStep").text(procStep);
					$("#procDate").text(procDate ?? '');
					$("#rejectMemo").val(rejectMemo);
					$("#regUserId").text(regUserId);
					$("#uptUserId").text(uptUserId);
					$("#uptYmd").text(uptYmd);
					$("#gvCustName").text(gvCustName);
					$("#regUserName").text(regUserName);
					
					$("#deliWay").val(deliWay);	
					$("#deliPayType").val(deliPayType);
					$("#senderCustName").val(senderCustName);
					$("#senderName").val(senderName);
					$("#senderTel").val(senderTel);
					$("#senderAddr1").val(senderAddr1);
					$("#receiverCustName").val(receiverCustName);
					$("#receiverName").val(receiverName);
					$("#receiverTel").val(receiverTel);
					$("#receiverAddr1").val(receiverAddr1);
					$("#rcvlogisCode").val(rcvlogisCode);
					
					
					if(deliWay == '방문수령' && deliWay != '일반배송' )
					{
						$("#senderDiv").hide();
						$("#receiverDiv").hide();
						$("#payTypeLabel").hide();
						$("#payTypeDiv").hide();
						$("#rcvlogisCodeLabel").show();
						$("#rcvlogisCodeDiv").show();
					}
					else if(deliWay == '일반배송' && deliWay != '방문수령')
					{
						$("#senderDiv").hide();
						$("#receiverDiv").hide();
						$("#payTypeLabel").hide();
						$("#payTypeDiv").hide();
						$("#rcvlogisCodeLabel").hide();
						$("#rcvlogisCodeDiv").hide();
					}
					else
					{
						$("#senderDiv").show();
						$("#receiverDiv").show();
						$("#payTypeLabel").show();
						$("#payTypeDiv").show();
						$("#rcvlogisCodeLabel").hide();
						$("#rcvlogisCodeDiv").hide();
					}
																								
				}		
				findReqItem('/order/pc-req-item-list');				
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
	var pcReqNo = $("#pcReqNo").text();
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType" : "LIST_OUT",
			"pcReqNo":pcReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			if (data.reqItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{					
				var totalSalePrice = 0;
			//	console.log(data)
				for(i=0;i<data.reqItemList.length;i++){
					totalSalePrice += data.reqItemList[i].salePrice;
				    list.push({						  
						pcReqNo: data.reqItemList[i].pcReqNo
						,reqSeq: data.reqItemList[i].reqSeq  
						,gvComCode: data.reqItemList[i].gvComCode	
						,gvPlaceNo: data.reqItemList[i].gvPlaceNo 
						,gvPlaceSeq: data.reqItemList[i].gvPlaceSeq 
						,inMemo1: data.reqItemList[i].inMemo1
						,regUserId: data.reqItemList[i].regUserId
						,created: data.reqItemList[i].created
						,uptUserId: data.reqItemList[i].uptUserId
						,modified: data.reqItemList[i].modified
					
						,itemId: data.reqItemList[i].itemId
						,itemNo: data.reqItemList[i].itemNo
						,itemName: data.reqItemList[i].itemName
						,cnt: data.reqItemList[i].cnt
						,salePrice: data.reqItemList[i].salePrice
						,sumPrice: data.reqItemList[i].sumPrice
						,rcvCustName: data.reqItemList[i].rcvCustName

						,dlvType: data.reqItemList[i].dlvType //0904 dlvType
						,gvMemo1: data.reqItemList[i].gvMemo1 //2023.11.21  
						,procStep: (data.reqItemList[i].procStep=='접수'?'처리':data.reqItemList[i].procStep) // 접수로 나오는 부분 클라이언트에서 '처리'로 표시 
						,centerPrice: data.reqItemList[i].centerPrice
						,outSalePrice: data.reqItemList[i].outSalePrice
						
						,makerName: data.reqItemList[i].makerName						
						,className: data.reqItemList[i].className						
						,factoryNo: data.reqItemList[i].factoryNo						
					});					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
				formatSalePrice = totalSalePrice.toLocaleString();
				$("#salePrice").val(formatSalePrice)
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
		
		

		
//프린트		           
function print() {
	var riReqNo = $("#riReqNo").text();
	window.open ("/logis/ri-req-item-list-print?riReqNo="+riReqNo,"_blank");
}

// 주문접수 0823 bk
function order() {
	
	var pcReqNo = $("#pcReqNo").text();
	//console.log("pcReqNo"+pcReqNo);
	var pcYN = "Y"; 
	//post형식으로 페이지 데이터 조회
	/*
	let f = document.createElement('form');
	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'text');
	obj.setAttribute('name', 'pcReqNo');
	obj.setAttribute('value', pcReqNo);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'text');
	obj.setAttribute('name', 'seqArr');
	obj.setAttribute('value', seqArr);
	f.appendChild(obj);
	    
	f.setAttribute('method', 'post');
	f.setAttribute('action', '/order/order-up');
	document.body.appendChild(f);
	//f.submit(); */
	 setTimeout(function() {
	 window.open("/order/order-up?pcReqNo="+pcReqNo +"&pcYN="+pcYN, "_blank");
    }, 200); 
}

// ACCEPT / REJECT 
function updateDataToServer( url, workingType ) {
	document.getElementById('btnReject').classList.toggle('disabled');
	document.getElementById('btnConfirm').classList.toggle('disabled');
	
	var pcReqNo = $("#pcReqNo").text();
	var rejectMemo = $("#rejectMemo").val();
	//var workingType = "REJECT"

	if (workingType == "REJECT" && (rejectMemo == '' || rejectMemo == null)) {
		document.getElementById('btnReject').classList.toggle('disabled');
		alert("거부사유는 필수 입력해야 합니다.");
		 $("#rejectMemo").focus();
		 return; 
	}
	    
	var data = {};
	
    data.workingType = workingType;
    data.pcReqNo = pcReqNo;
	data.rejectMemo = rejectMemo;  
   
  //  console.log("data:"+JSON.stringify(data));
  //  return;
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
				if ((workingType != "REJECT") && (data.result_code != "Err")) {
					order();
				}
				if ((workingType != "ACCEPT") && (data.result_code != "Err")) {
					parent.jQuery.fancybox.close();
					location.reload(true);
				}			        
	    },
	    error:function(request, status, error){
			document.getElementById('btnReg').classList.toggle('disabled');
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

document.getElementById("btnReg").onclick = function () {
	pcReqAdd("UPT_NOPL"); 
}	

document.getElementById("btnCancel").onclick = function () {
	pcReqAdd("CANCEL"); 
}	

function pcReqAdd(workingType) {	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0 ) {
		if ( workingType=='CANCEL') {
			alert("품목을 선택하세요!");		
			return;
		}
		if ( workingType=='UPT_NOPL') {
			if (!confirm("품목을 선택하지 않았습니다. 저장 대상에 품목의 수량과 메모는 제외하시나요?"))		
				return;
		}
	} 
	for(let i = 0 ; i < checkedItems.length ; i ++)
	{
		if(checkedItems[i].item.procStep != '') 
		{
			alert((checkedItems[i].rowIndex+1) + '번째 요청이 '+checkedItems[i].item.procStep+' 상태이므로 요청취소가 불가능합니다. \n체크된 부품을 확인해주세요.')
			return;
		}
		
	}
	
 

	var rowItem;
	
	var gvComCode = "";
	var pcReqNo = "";
	var pcReqNoDtl = "";
	var reqSeq = "";
	var gvMemo1;
	var gvQty;
	var itemId;
	var gvComCodeArr = "";
	var pcReqNoArr = "";
	var reqSeqArr = "";
	var itemIdArr = "";
	var gvQtyArr = "";
	var gvMemo1Arr = "";
	pcReqNo = $("#pcReqNo").text();
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];

		gvComCode = rowItem.item.gvComCode;
		pcReqNoDtl = rowItem.item.pcReqNo;
		reqSeq = rowItem.item.reqSeq;
		itemId = rowItem.item.itemId;
		gvQty = rowItem.item.cnt;
		gvMemo1 = rowItem.item.gvMemo1;

		if (typeof gvComCode == 'undefined' || gvComCode == null) { gvComCode = ""; }
		if (typeof pcReqNoDtl == 'undefined' || pcReqNoDtl == null) { pcReqNoDtl = ""; }
		if (typeof reqSeq == 'undefined' || reqSeq == null) { reqSeq = ""; }
		if (typeof itemId == 'undefined' || itemId == null) { itemId = ""; }
		if (typeof gvQty == 'undefined' || gvQty == null) { gvQty = ""; }
		if (typeof gvMemo1 == 'undefined' || gvMemo1 == null) { gvMemo1 = ""; }

		if (i == 0) {
			gvComCodeArr = gvComCode;
			pcReqNoArr = pcReqNoDtl;
			reqSeqArr = reqSeq;
			itemIdArr = itemId;
			gvQtyArr = gvQty;
			gvMemo1Arr = gvMemo1;
		} else {
			gvComCodeArr = gvComCodeArr + "^" + gvComCode;
			pcReqNoArr = pcReqNoArr + "^" + pcReqNo;
			reqSeqArr = reqSeqArr + "^" + reqSeq;
			itemIdArr = itemIdArr + "^" + itemId;
			gvQtyArr = gvQtyArr + "^" + gvQty;
			gvMemo1Arr = gvMemo1Arr + "^" + gvMemo1;
		}

	}

	var gvMgr = $("#gvMgr").val();
	var gvMemo = $("#gvMemo").val();	
	var deliWay = $("#deliWay").val();  // 2023.12.11.
	var deliPayType = $("#deliPayType").val();
	var senderCustName = $("#senderCustName").val();
	var senderName = $("#senderName").val();
	var senderTel = $("#senderTel").val();
	var senderAddr1 = $("#senderAddr1").val();
	var receiverCustName = $("#receiverCustName").val();
	var receiverName = $("#receiverName").val();
	var receiverTel = $("#receiverTel").val();
	var receiverAddr1 = $("#receiverAddr1").val();
	const rcvlogisCode = $("#rcvlogisCode").val();	
	
	var data = {};
	data.workingType = workingType;   // "CANCEL";
	data.pcReqNo = pcReqNo;
	data.gvMgr  = gvMgr;
	data.gvMemo = gvMemo;
	data.itemIdArr = itemIdArr;
	data.gvQtyArr = gvQtyArr;
	data.gvMemo1Arr =  gvMemo1Arr;
	data.deliWay = deliWay;
	data.deliPayType = deliWay == '방문수령' ? '': deliPayType;
	data.senderCustName = senderCustName;
	data.senderName = senderName;
	data.senderTel = senderTel;
	data.senderAddr1 = senderAddr1;
	data.receiverCustName = receiverCustName;
	data.receiverName = receiverName;
	data.receiverTel = receiverTel;
	data.receiverAddr1 = receiverAddr1;
	data.pcReqNoArr = pcReqNoArr;
	data.reqSeqArr = reqSeqArr;
	data.gvComCodeArr = gvComCodeArr;
	data.rcvlogisCode =  deliWay == '방문수령' ? rcvlogisCode: '' ;
	
 
	$.ajax({
		url: "/order/pcReqAdd",
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
			//location.reload(true);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});      
};
