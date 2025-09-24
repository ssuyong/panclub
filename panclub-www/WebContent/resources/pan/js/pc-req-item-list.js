
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
		 
	$("#btnReg").click(function(){
		//updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
	//	parent.location.reload();
	
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
	$("#btnAccept").click(function(){ // 마스터접수
		this.blur(); 
		updateDataToServer3('/order/pcReqAdd' , "ACCEPT_MASTER"); 
	});
	$("#btnRejectCancel").click(function(){ //거부취소
		RejectCancel(); 
	})
	$("#btnReAccept").click(()=>{ //주문등록창을 꺼버린 처리상태의 주문을 재등록
		ReAccept();
	})
	
	//요청번호가  존재하는 경우 
	let pcReqNo = $("#pcReqNo").text();
	if (pcReqNo !=''){		 				
		findReq("/order/pc-req-list")
	}	  
	
	AUIGrid.bind(myGridID, "cellEditEnd", function( event ) { // 수량변경에 음수불가와 랙수량보다 높은값 입력금지라는 제약조건을 바인딩함
	     const item = event.item;
		  if(item.qty < 0)
  		  {
			AUIGrid.updateRow(myGridID,{qty : event.oldValue}, event.rowIndex); 
			alert("0보다 작은 수량은 입력할수 없습니다.") 
		  }
  		  else if(item.qty > parseInt(item.stockQty))
  		  {
			AUIGrid.updateRow(myGridID,{qty : event.oldValue}, event.rowIndex); 
			alert("랙의 수량보다 높은 수량을 선택할수 없습니다.") 
  	 	  }  
	}); 
	$("#buttonPrint").click(()=>{ //인쇄버튼 이벤트
		pagePrintEvent();
	});
	$("#barcodeLabelPrint").click(()=>{ //인쇄버튼 이벤트
		barcodePrintItem();
	});
	
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "pcReqNo",      headerText : "요청번호", width : 120, editable : false, cellMerge: true , mergeRef: "pcReqNo",	mergePolicy: "restrict" }
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 100, editable : false, cellMerge: true , mergeRef: "pcReqNo",	mergePolicy: "restrict" }
		,{ dataField : "procStep",      headerText : "접수상태", width : 80, editable : false , cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{ dataField : "procUserName",     headerText : "처리자" , editable : false , width : 80}
		,{ dataField : "rcvCustName",     headerText : "납품 거래처명", width : 140 , editable : false}
		,{ dataField : "className",    headerText : "구분", width : 80, editable: false} 
		,{ dataField : "itemId",      headerText : "부품ID", width : 100, editable : false , cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"}
		,{ dataField : "itemNo",      headerText : "품번", width : 140, editable : false , cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict"} 
	    ,{ dataField : "factoryNo",     headerText : "공장품번", width : 120 , editable: false    }
		,{ dataField : "itemName", 		headerText : "품명", width: 140  , style:"left", editable : false , cellMerge: true , mergeRef: "itemId" ,	mergePolicy: "restrict"} 
		,{ dataField : "makerCode",   headerText : "제조사코드", width : 100, visible: false }
		,{ dataField : "makerName",      headerText : "제조사명"  , width : 120, style : "left"   }
		,{ dataField : "cnt",     headerText : "요청수량", style:"right" ,width : 60, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"   , cellMerge: true , mergeRef: "reqSeq",	mergePolicy: "restrict"}
		,{ dataField : "storageCode",     headerText : "창고코드", style:"left" ,width : 60, editable : false  }
		,{ dataField : "storageName",     headerText : "창고명", style:"left" ,width : 160, editable : false }
		,{ dataField : "rackCode",     headerText : "랙코드", style:"left" ,width : 60, editable : false }
		,{ dataField : "rackName",     headerText : "랙명", style:"left" ,width : 160, editable : false  }
	
		,{ dataField : "stockQty",     headerText : "가능수량", style:"right" ,width : 60, editable : false , dataType: "numeric" }
		,{ dataField : "qty",     headerText : "선택수량", style:"right auigrid-must-col-style" ,width : 60, editable : true , dataType: "numeric" ,styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) {
			if (value != "0") {
				return "my-cell-style";
			}
			return null;
		}}
		,{ dataField : "centerPrice",      headerText : "센터가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 120 }
		,{ dataField : "outSalePrice",      headerText : "판매가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 120 }
		//,{ dataField : "salePrice",     headerText : "주문단가", width : 100, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"  ,}
		//,{ dataField : "sumPrice",     headerText : "공급가액", width : 100, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"  }
		,{ dataField : "rejectMemo",     headerText : "거부사유", width : 200 , style:"left auigrid-must-col-style",    editRenderer : {
            type : "InputEditRenderer" 
   		   } , editable : true}
		,{ dataField : "rcvLogisCode",     headerText : "수령물류센터", editable : false}
		,{ dataField : "inMemo1",     headerText : "메모", width : 200 , editable : false}
		
		,{ dataField : "gvPlaceNo",     headerText : "요청업체 발주번호" , editable : false , width : 120}
		,{ dataField : "gvPlaceSeq",     headerText : "요청업체 발주순번" ,      editable : false , width : 100}
		,{ dataField : "dlvType",     headerText : "배송유형" ,      editable : false , width : 100}
		,{ dataField : "orderNo",     headerText : "주문처리번호" ,      editable : false , width : 100,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
		,{ dataField : "orderStatus",     headerText : "주문처리상태" ,      editable : false , width : 100}
	
	];
	
	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "salePrice",		positionField: "salePrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
	
	// 그리드 속성 설정
	var gridPros = {
		enableCellMerge: true,
		// singleRow 선택모드
		selectionMode: "multiRow",
		editable : true,			
		enableClipboard:true,
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",

		// 엑스트라 체크박스 표시 설정
		//showRowCheckColumn: true,

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
		
		
		showRowCheckColumn: true, //체크박스 표시 설정 
		showRowAllCheckBox: true,
//		independentAllCheckBox: true,
		
//		rowCheckableFunction: function (rowIndex, isChecked, item) {
//				if(item.procStep != "" && item.procStep != "거부" && item.procStep != null) { 
//					return false;
//				}
//				return true;
//			},
//		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
//			 if(item.procStep != "" && item.procStep != "거부" && item.procStep != null) { 
//				return false;  
//			}
//			return true;
//		}
//		
		
	};
	

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	
	// 전체 체크박스 클릭 이벤트 바인딩
//	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
//		if (event.checked) {
//		 
//			let uniqueValues =['','거부','접수','처리'] ;// ['' , '거부'];
//	 
//			AUIGrid.setCheckedRowsByValue(event.pid, "procStep", uniqueValues);
//		} else {
//			AUIGrid.setCheckedRowsByValue(event.pid, "procStep", []);
//		}
//	});
	
	
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
	
	
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
	 
		//console.log("columnIndex:"+event.dataField);  
		if (event.dataField == "orderNo") {   
			const orderNo = event.item.orderNo; 
			 
			 
			 
			 window.open('/order/order-list#info1!' + orderNo+'!'+$("#regYmd").text()+'!'+$("#regYmd").text()+'!Y!!!', '_blank');
		};
 
	})
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
			"workingType" : "LIST",
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
				 
				
				if(data.pcReqList[0].procState == '미완료')  //디테일 처리가 0개이며 접수도 안된상태
				{
					$("#btnConfirm").hide();
					$("#btnReject").hide();
					$("#btnAccept").show();
				}
				else if(data.pcReqList[0].procState == '완료') //모든 디테일의 처리가 완료되었을때는 완료,거부,접수 안보여줌
				{
					$("#btnConfirm").hide();
					$("#btnReject").hide();
					$("#btnAccept").hide();
				}
				else // 접수거나 일부완료일땐 완료와 거부만
				{
					$("#btnConfirm").show();
					$("#btnReject").show();
					$("#btnAccept").hide();
				}	
									
				for(i=0;i<data.pcReqList.length;i++){ 
					 regYmd = data.pcReqList[i].regYmd 
					pcReqNo= data.pcReqList[i].pcReqNo 
					gvComCode= data.pcReqList[i].gvCustName 
					gvPlacNo= data.pcReqList[i].gvPlacNo
					gvMgr= data.pcReqList[i].gvMgr 
					gvMemo= data.pcReqList[i].gvMemo 
					//procStep= data.pcReqList[i].procStep 
					procUserId= data.pcReqList[i].procUserId 
					procDate= data.pcReqList[i].procDate 
				//	rejectMemo= data.pcReqList[i].rejectMemo 
					regUserId =data.pcReqList[i].regUserId 
					uptUserId= data.pcReqList[i].uptUserId
					uptYmd= data.pcReqList[i].uptYmd
					uptHms= data.pcReqList[i].uptHmsg
					gvCustName= data.pcReqList[i].gvCustName
					regUserName= data.pcReqList[i].regUserName
					
					$("#regYmd").text(regYmd);
					$("#gvComCode").text(gvComCode);
					$("#gvPlacNo").text(gvPlacNo);
					$("#gvMgr").text(gvMgr);
					$("#gvMemo").text(gvMemo);
				//	$("#procStep").text(procStep);
					$("#procDate").text(procDate);
			//		$("#rejectMemo").val(rejectMemo);
					$("#regUserId").text(regUserId);
					$("#uptUserId").text(uptUserId);
					$("#uptYmd").text(uptYmd);
					$("#gvCustName").text(gvCustName);
					$("#regUserName").text(regUserName);			

					deliWay= data.pcReqList[i].deliWay
					deliPayType= data.pcReqList[i].deliPayType == '선불' ? '선불 (월정산 포함)' :
								 data.pcReqList[i].deliPayType == '착불' ? '착불 (수취자 부담)' : 
								 data.pcReqList[i].deliPayType == '직접배차' ? '직접배차 (주문자 부담)' : ''
					senderCustName= data.pcReqList[i].senderCustName
					senderName= data.pcReqList[i].senderName
					senderTel= data.pcReqList[i].senderTel
					senderAddr1= data.pcReqList[i].senderAddr1
					receiverCustName= data.pcReqList[i].receiverCustName
					receiverName= data.pcReqList[i].receiverName
					receiverTel= data.pcReqList[i].receiverTel
					receiverAddr1= data.pcReqList[i].receiverAddr1
					rcvlogisCode= data.pcReqList[i].rcvlogisCode
										
					$("#deliWay").text(deliWay);		
						
					$("#senderCustName").text(senderCustName);		
					$("#senderName").text(senderName);		
					$("#senderTel").text(senderTel);		
					$("#senderAddr1").text(senderAddr1);		
					$("#receiverCustName").text(receiverCustName);		
					$("#receiverName").text(receiverName);		
					$("#receiverTel").text(receiverTel);		
					$("#receiverAddr1").text(receiverAddr1);		
					 	
					
//					if(procStep != '' && procStep != '요청')
//					{
//						$("#btnConfirm").addClass('disabled'); 
//						$("#btnReject").addClass('disabled'); 
//					}
					if(deliWay == '방문수령')
					{
						$("#deliLabel").text("방문처"); 
						$("#deliType").text(rcvlogisCode);	
					}
					else
					{
						$("#deliLabel").text("비용"); 
						$("#deliType").text(deliPayType);	
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
			"pcReqNo":pcReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){ 
			//console.log(data);
			if (data.reqItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{					
				var totalSalePrice = 0;
				//console.log(data);
				let btnRejectCancel;
				let btnReAccept;
				
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
						//,salePrice: data.reqItemList[i].salePrice
					//	,sumPrice: data.reqItemList[i].sumPrice
						,centerPrice: data.reqItemList[i].centerPrice
						,outSalePrice: data.reqItemList[i].outSalePrice
						,rcvCustName: data.reqItemList[i].rcvCustName

						,dlvType: data.reqItemList[i].dlvType //0904 dlvType 
						
						,storageName: data.reqItemList[i].storageName
						,storageCode: data.reqItemList[i].storageCode
						,rackName: data.reqItemList[i].rackName
						,rackCode: data.reqItemList[i].rackCode
						,stockQty: data.reqItemList[i].stockQty
						,qty : 0
						,procStep: (data.reqItemList[i].procStep=='접수'?'처리':data.reqItemList[i].procStep)// 접수로 나오는 부분 클라이언트에서 '처리'로 표시 
						,rejectMemo : data.reqItemList[i].rejectMemo
						,orderNo : data.reqItemList[i].orderNo
						,orderStatus : data.reqItemList[i].orderStatus
						,procUserName : data.reqItemList[i].procUserName
						,rcvLogisCode : data.reqItemList[i].rcvLogisCode
					
						,className : data.reqItemList[i].className   //2024.07.25 hsg					
						,factoryNo : data.reqItemList[i].factoryNo   //2024.07.25 hsg		
						,makerCode: data.reqItemList[i].makerCode  //2024.07.25 hsg		
						,makerName: data.reqItemList[i].makerName	 //2024.07.25 hsg		
					});				
					
					// 주문 상세내역에서 디테일중 '거부'상태가 1개라도 있을경우 거부 취소버튼 활성화
					if(data.reqItemList[i].procStep == '거부')
					{
						if(btnRejectCancel == null)
						{
							btnRejectCancel = $("#btnRejectCancel");
							btnRejectCancel.show();
						}
					}
					
					// 주문상세내역에서 디테일중 '접수' 혹은 '처리'상태인데 주문처리번호나 발주번호가 없는경우 주문을 재등록하는 버튼 활성화
					if((data.reqItemList[i].procStep == '접수' || data.reqItemList[i].procStep == '처리' ) && 
						data.reqItemList[i].gvPlaceNo == '' && data.reqItemList[i].orderNo == '')
					{
						 
						btnReAccept= $("#btnReAccept");
						btnReAccept.show();
					}	
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
function print_() {
	var riReqNo = $("#riReqNo").text();
	window.open ("/logis/ri-req-item-list-print?riReqNo="+riReqNo,"_blank");
}

// 주문접수 0823 bk
function order(reqSeqArr) {
	
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
	const reqSeqArr_ = reqSeqArr.replaceAll('^','!');
	
	 setTimeout(function() {
	 window.open("/order/order-up?pcReqNo="+pcReqNo +"&pcYN="+pcYN + "&reqSeqArr="+reqSeqArr_, "_blank");
    }, 200); 
}

// ACCEPT / REJECT 
function updateDataToServer( url, workingType ) {
	
	
	
//	document.getElementById('btnReject').classList.toggle('disabled');
//	document.getElementById('btnConfirm').classList.toggle('disabled');
	
	var pcReqNo = $("#pcReqNo").text();
//	var rejectMemo = $("#rejectMemo").val();
	//var workingType = "REJECT"

//	if (workingType == "REJECT" && (rejectMemo == '' || rejectMemo == null)) {
//		document.getElementById('btnConfirm').classList.toggle('disabled');
//		document.getElementById('btnReject').classList.toggle('disabled');
//		alert("거부사유는 필수 입력해야 합니다.");
//		 $("#rejectMemo").focus();
//		 return; 
//	}
	    
	var data = {};
	
    data.workingType = workingType;
    data.pcReqNo = pcReqNo;
//	data.rejectMemo = rejectMemo;  
   
   
   //순번, 랙코드, 수량
   data.pcReqSeqArr = '';
   data.pcRackCodeArr = ''; 
   if(workingType =='ACCEPT') data.pcRackqtyArr = '';
  
   let checkQty = {}; // 수락을 누를때 모든 품목의 수량을 요청수량보다 적거나 많지 않게 입력했는지 검사를 위한 변수
   let seqCount = 0;
   
   //체크된것만 하도록 변경
   const ctReqItemData = AUIGrid.getCheckedRowItems(myGridID); // AUIGrid.getGridData(myGridID);
   
   if(workingType =='ACCEPT')
	{
		for(const reqItem of ctReqItemData)
		{
			if(reqItem.item.procStep == '거부')
			{
				alert("거부된 부품은 거부취소후 처리해주세요 : "+(reqItem.rowIndex+1)+"번째 부품");
				return;
			}
		}
		
	}
   
  
   if(ctReqItemData.length == 0){alert("부품을 체크해주세요"); 
//		document.getElementById('btnConfirm').classList.toggle('disabled');
//		document.getElementById('btnReject').classList.toggle('disabled');
   return; } 

//   if(workingType =='ACCEPT')  //거부시 개별거부 가능으로 변경
//   {
		for(let i = 0 ; i < ctReqItemData.length  ; i++ )
		{
		  	
		
			if(workingType =='ACCEPT') // 수락인경우만 체크집계
			{
				if(checkQty[ctReqItemData[i].item.reqSeq] == null)  //수량 체크를 위해 객체에 저장
				{
					checkQty[ctReqItemData[i].item.reqSeq] = {};
					checkQty[ctReqItemData[i].item.reqSeq].qty = ctReqItemData[i].item.qty;
					checkQty[ctReqItemData[i].item.reqSeq].cnt = ctReqItemData[i].item.cnt;
				    seqCount ++;
				}
				else 
					checkQty[ctReqItemData[i].item.reqSeq].qty += ctReqItemData[i].item.qty;
			}
			
			if(workingType == 'ACCEPT' && ctReqItemData[i].item.qty == 0 )  
			{
//				document.getElementById('btnConfirm').classList.toggle('disabled');
//				document.getElementById('btnReject').classList.toggle('disabled');
				alert("수량이 0개인 부품이 있습니다 : "+(ctReqItemData[i].rowIndex+1)+"번째 부품"); 
				return;
			} 
			//continue;  // 체크되니 항목이라도 수량이 0이면 무시 => 수량0개가 체크되면 경고메세지로 변경되서 코드수정
			
			if(i>0 && data.pcReqSeqArr != '')
			{
			   data.pcReqSeqArr += '^';
			   data.pcRackCodeArr += '^';
			   if(workingType =='ACCEPT') data.pcRackqtyArr += '^';
			}
			
			data.pcReqSeqArr += ctReqItemData[i].item.reqSeq;
			data.pcRackCodeArr += ctReqItemData[i].item.rackCode;
			if(workingType =='ACCEPT') data.pcRackqtyArr += ctReqItemData[i].item.qty;   
			
			 
			
	} 
		//수락이 아닌경우 seqCount이 0 이므로 반복문 무시됨
		
	   const keys = Object.keys(checkQty); //선택된 순번 키들의 배열저장
	   for(let i = 0 ; i < seqCount ; i ++)  //수락을 누르는순간 수량 체크
	   {
	        
			let string_i = keys[i];
			
			//최종수량이 요구수량보다 적어도 되는식으로 요청사항변경으로 주석처리
//	         if(checkQty[string_i].qty < checkQty[string_i].cnt )
//	         {
//					document.getElementById('btnConfirm').classList.toggle('disabled');
//					document.getElementById('btnReject').classList.toggle('disabled');
//					alert("요청수량보다 적은 수량을 선택하셨습니다");
//					return;
//			 }
//			 else 
			 if(checkQty[string_i].qty > checkQty[string_i].cnt )
			 {
//					document.getElementById('btnConfirm').classList.toggle('disabled');
//					document.getElementById('btnReject').classList.toggle('disabled');
					alert("요청수량보다 많은 수량을 선택하셨습니다");
					return;
			 }
	   }
  
  	data.salePriceType = $("#salePriceType").val();
  	
  	//거부시 거부사유 입력 체크
  	if(workingType == 'REJECT')
  	{
		let rejectMemoArr = ''; 
	
		for(const ctReqItem of ctReqItemData)
		{
			if((ctReqItem.item.rejectMemo ?? '') == '')
			{
				alert("거부사유를 입력해주세요 : "+(ctReqItem.rowIndex+1)+"번째 부품");
				return;
			}
			if(rejectMemoArr != '') rejectMemoArr += '^';
			rejectMemoArr += (ctReqItem.item.rejectMemo.replace('^','')); // 구분값을 ^로 주는데 만약 거부사유에 ^가 있으면 지워버림
			
		}
		data.rejectMemoArr = rejectMemoArr;	 
  	}
    //console.log("data:"+JSON.stringify(data)); 
    const reqSeqArr = data.pcReqSeqArr;
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    async : false,
	    success: function(data) {
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);			
			if(data.result_code == "Err")
			{
//				document.getElementById('btnConfirm').classList.toggle('disabled');
//				document.getElementById('btnReject').classList.toggle('disabled');
			}
			else if ((workingType != "REJECT") && (data.result_code != "Err")) {  //접수이면서 오류가 아닌 경우
				//console.log("data.autoPcProcYN: "+data.autoPcProcYN);
				if (data.autoPcProcYN == 'Y') {  //주문자동생성인 경우  2024.01.17
					alert("자동연동 대상업체입니다. 요청업체로 자동 입고처리가 되었습니다.)");
					parent.jQuery.fancybox.close();
				//	location.reload(true);					
				}else{
					order(reqSeqArr);  //주문
				}
			}
			else if ((workingType != "ACCEPT") && (data.result_code != "Err")) {
				parent.jQuery.fancybox.close();
			//	location.reload(true);
			}			        
	    },
	    error:function(request, status, error){
//			document.getElementById('btnConfirm').classList.toggle('disabled');
//			document.getElementById('btnReject').classList.toggle('disabled');
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

 
function pagePrintEvent()
{
		const pcReqNo = $("#pcReqNo").text();  //요청번호
		const gvComCode = $("#gvComCode").text(); // 요청업체
		const gvMgr = $("#gvMgr").text();  //요청담당
		const regYmd = $("#regYmd").text(); //요청일자
		const gvPlacNo = $("#gvPlacNo").text(); //요청업체 발주번호
		const gvMemo = $("#gvMemo").text(); //요청메모
		const checkItemPrintYN = $('input[name="checkItemPrintYN"]').is(":checked"); //체크부품만 인쇄할지 여부 
		const deliWay = $("#deliWay").text();
		const deliType = $("#deliType").text();
		
		//20240626 supi 용인요청사항으로 출력물에 인쇄정보추가
		const senderCustName = $("#senderCustName").html();
		const senderName = $("#senderName").html();
		const senderTel = $("#senderTel").html();
		const senderAddr1 = $("#senderAddr1").html();
		const receiverCustName = $("#receiverCustName").html();
		const receiverName = $("#receiverName").html();
		const receiverTel = $("#receiverTel").html();
		const receiverAddr1 = $("#receiverAddr1").html();
 
		
		 
		const itemList = [];//pcReqNo , gvComCode , gvMgr , regYmd , gvPlacNo , gvMemo};
		
		
 
		//체크품목만 인쇄하기 체크박스 체크 여부에 따라 분기해서 itemList에 데이터를 저장
		const rowItems = checkItemPrintYN?AUIGrid.getCheckedRowItems(myGridID) : AUIGrid.getGridData(myGridID); 
		
		if(checkItemPrintYN && rowItems.length ==0) //체크된 부품을 체크 한 상태에서 아이템리스트가 0개
		{
			alert("체크된 부품이 없습니다");
			return;
		}
 
		for(let i = 0 ; i < rowItems.length ; i ++)
		{
			const row = checkItemPrintYN?rowItems[i].item:rowItems[i];
			
			itemList.push({
				index: row.reqSeq,
				procStep: row.procStep ?? '',
				itemId: row.itemId,
				itemNo: row.itemNo,
				itemName: row.itemName,
				reqQty: row.cnt,
				qty: (row.procStep!=''||row.storageName =='')?'': row.qty,   // 처리상태가 공백인 경우 창고와 랙정보,선택수량의 정보르 공백으로 체워줌
				storName: (row.procStep!=''||row.storageName =='')?'':row.storageName+'('+row.storageCode+')',  
				rackName: (row.procStep!=''||row.storageName =='')?'': row.rackName+'('+row.rackCode+')',
				custName : row.rcvCustName ?? ''
				,rcvLogisCode : row.rcvLogisCode
			}) 
		}
		
		//data객체에 얻은 데이터들을 모두저장
		const data = {pcReqNo , gvComCode , gvMgr , regYmd , gvPlacNo , gvMemo , itemList , deliWay ,deliType ,senderCustName ,senderName ,  senderTel ,senderAddr1 , receiverCustName , receiverName , receiverTel , receiverAddr1};
	  
		//로컬스토리지에 'pcReqPrintInfo/'+요청번호의 String키로 위에서 얻은 데이터를 json형식으로 변환해서 저장
		localStorage.setItem("pcReqPrintInfo/"+pcReqNo, JSON.stringify(data));
		//인쇄페이지를 열되 페이지에서 참조할수 있도록 요청번호를 url에 전달
		window.open("pc-req-item-list-print?reqNo="+pcReqNo ,"_blank", "menubar=no, toolbar=no");
}
//주문요청 상세내역이 종료될때 로컬스토리지에서 동일 요청번호의 데이터가 있다면 제거해줌
window.addEventListener('beforeunload', ()=> {
	const reqNo = $("#pcReqNo").text();
	localStorage.removeItem("pcReqPrintInfo/"+reqNo);
});


function updateDataToServer3( url, workingType ) {
	const pcReqNo = $("#pcReqNo").text();
	const data = {pcReqNo , workingType}

 
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
		
			parent.jQuery.fancybox.close();
			alert("주문요청 접수완료");
		},
		error:function(request, status, error){
//			document.getElementById('btnConfirm').classList.toggle('disabled');
//			document.getElementById('btnReject').classList.toggle('disabled');
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	 });
}
 
 
function RejectCancel() 
{
	const reqItems =  AUIGrid.getCheckedRowItems(myGridID);
	
	let reqSeqArr = '';
	
	for(const reqItem of reqItems)
	{
		if((reqItem.item.procStep ?? '') != '거부')
		{
			alert("거부상태가 아닌 부품은 체크해제후 거부취소해주세요 : "+(reqItem.rowIndex+1) + " 번째 부품");
			return;
		}
		if(reqSeqArr != '') reqSeqArr += '^';
		reqSeqArr += reqItem.item.reqSeq;
	}
	
	const data = {workingType:'REJECT_CANCEL' ,pcReqNo:reqItems[0].item.pcReqNo , reqSeqArr};
	
	
	$.ajax({
	    url : '/order/pcReqAdd',
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
			if(data.result_code != 'OK')
			{
				alert(data.result_msg);
				return;
			}
			
			parent.jQuery.fancybox.close();
			alert("거부취소 완료");
		},
		error:function(request, status, error){
//			document.getElementById('btnConfirm').classList.toggle('disabled');
//			document.getElementById('btnReject').classList.toggle('disabled');
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	 });
}

function ReAccept() // 처리되엇지만 주문등록이 누락된 경우 주문 재등록 가능하도록
{
	const reqItems =  AUIGrid.getGridData(myGridID);
	let reqSeqArr = '';
	
	for(reqItem of reqItems)
	{
		//요청디테일이 처리되었지만 주문번호도 발주번호도 존재하지 않는 경우 => 주문등록이 누락된 상태 혹은 주문접수상세내역에서 주문등록하지 않고 다른 방식으로 등록한 상태
		if((reqItem.procStep == '접수' || reqItem.procStep == '처리') && reqItem.orderNo == '' && reqItem.gvPlaceNo == '') 
		{
			if(reqSeqArr != '') reqSeqArr += '!';
			reqSeqArr += reqItem.reqSeq; 
		}
	}
	order(reqSeqArr);
}

 
setItemBarcodeScanFun((item)=>
{
	const itemData = {itemId:item.itemId ,
				 itemNo:item.itemNo ,
				 itemName:item.itemName ,
				 rackCode:item.rackCode ,
				 rackName:item.rackName ,
				 storCode:item.storCode ,
				 storName:item.storName ,
				 stockQty:item.stockQty ,
				 
				 };
	 	 
	const GridId =  '#grid_wrap';
	const auiGridData = AUIGrid.getRowsByValue(GridId , 'itemId' , itemData.itemId); //상세내역 그리드 내에서 itemId가 스캔데이터와 일치하는 행들을 배열로 가져옴
	
//	let qtyArr = {}; // 순번이 키인 [요청수량 , 선택수량 합]을 저장 = 특정 순번의 요청수량을 스캔 결과의 부품행의 합이 못넘도록 확인하기 위해 저장
//	auiGridData.forEach((obj)=>{
//	    if(qtyArr[obj.reqSeq] == null) qtyArr[obj.reqSeq] = [obj.cnt , obj.qty];
//	    else qtyArr[obj.reqSeq][1] += obj.qty;
//	})
	
	//두개의 객체를 가지는 배열로 
	//첫번째 객체는 순번이 키이고 값은 [요청수량, 해당순번의 선택수량 합]의 배열을 가지고
	//두번째 객체는 아이탬id_랙코드가 키이고 값은 [가능수량 , 해당 id와 랙코드의 선택수량 합]의 배열을 가짐
	const qtyArr = auiGridData.reduce((qtyObject , row)=>{
	    
	    if(qtyObject[0][row.reqSeq] == null) qtyObject[0][row.reqSeq] = [row.cnt , row.qty];
	    else qtyObject[0][row.reqSeq][1]+= row.qty;
	
	    if(row.rackCode == '') {}
	    else if(qtyObject[1][`${row.itemId}_${row.rackCode}`] == null) qtyObject[1][`${row.itemId}_${row.rackCode}`] = [row.stockQty , row.qty];
	    else qtyObject[1][`${row.itemId}_${row.rackCode}`][1] += row.qty;
	    return qtyObject;
	} , [{},{}])
	

	//수량을 증가시킬 행을 찾는데.
	//위에서 이미 아이디로 한번 걸러진 배열에서 랙코드,창고코드가 일치하면서 선택수량이 가능수량보다 낮고 qtyArr에 자신의 순번을 키로 넣어서 순번의 요청수량을 초과하지 않은 행을 찾음
	const targetRow = auiGridData.find((row)=>{ 
		if(row.rackCode == itemData.rackCode &&
		   row.storageCode == itemData.storCode &&
		   row.stockQty > row.qty &&
		   qtyArr[0][row.reqSeq][0] > qtyArr[0][row.reqSeq][1] &&// 자신의 순번의 선택된 수량의 합이 요구수량보다 낮은 것
		   qtyArr[1][`${row.itemId}_${row.rackCode}`][0] >qtyArr[1][`${row.itemId}_${row.rackCode}`][1] //자신의 부품아이디와 랙코드가 동일한 행의 선택수량의 합이 랙의 가능수량보다 적을때
		   )
		   return true;
	})
	 
	
	if(targetRow) // 수량을 증가시틸 대상을 찾은경우
	{
		const targetIndex = AUIGrid.getRowIndexesByValue(GridId , '_$uid' , targetRow._$uid); // 그리드행의 _$uid를 통해 해당 인덱스 추출
		AUIGrid.updateRow(GridId , {qty:targetRow.qty+1}, targetIndex[0]); // 해당인덱스의 선택수량을 +1 시켜줌
		AUIGrid.addCheckedRowsByValue(GridId ,  '_$uid' , targetRow._$uid); 
		barcodeScanSuccessCountUp();
	}
	else // 수량을 증가시킬 대상을 찾지 못할경우 
	{
		if(!Object.keys(qtyArr[1]).includes(`${itemData.itemId}_${itemData.rackCode}`)) //스캔부품의 아이디와 랙이 일치하는것이 없음
		{
			itemBarcodeScanfailPopup('바코드 스캔한 부품은 요청품목이 아닙니다. 아이디나 랙을 확인해주세요',itemData);
		}
		else if(qtyArr[1][`${itemData.itemId}_${itemData.rackCode}`][0] <= qtyArr[1][`${itemData.itemId}_${itemData.rackCode}`][1]) // 해당 아이디_랙의 선택수량합이 가능수량과 같거나 높음
		{
			itemBarcodeScanfailPopup('해당 부품은 더이상 선택수량을 증가시킬수 없습니다(선택수량이 가능수량과 동일하거나 높습니다)',itemData); 
		}
		else //아이디와 랙이 일치하고 가능수량이 존재하는데 타겟을 못잡는다는것은 요철수량을 오버한다는뜻 
		{
			itemBarcodeScanfailPopup('해당 부품은 이미 요청수량이 모두 선택하셨습니다.',itemData);
		}
	}
});

  