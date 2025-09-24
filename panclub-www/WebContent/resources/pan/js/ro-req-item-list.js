
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
	let roReqNo = $("#roReqNo").text();
	if (roReqNo !=''){		
		//console.log("storageUseReqNo ::"+ storageUseReqNo);		
		findReq('/logis/ro-req-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "roReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 60, editable : false }
		,{ dataField : "claimType",      headerText : "청구구분", width : 60, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 140, editable : false}
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
		,{ dataField : "itemName", 		headerText : "품명", width: 140  , style:"left", editable : false  } 
		,{ dataField : "itemNameEn", 	headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "placeCnt",     headerText : "발주수량", style:"right" ,width : 60, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right" }
		,{ dataField : "roReqCnt",     headerText : "요청수량", style:"right" ,width : 60, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right" }
		,{ dataField : "rlStandByQty",     headerText : "출고랙재고수량", style:"right" ,width :120, editable : false  }
		,{ dataField : "roCnt",     headerText : "반출수량", style:"right" ,width : 60, dataType: "numeric",formatString: "#,##0"  , style:"right auigrid-must-col-style" }
		,{ dataField : "salePrice",     headerText : "반출단가",style:"right" ,width : 60, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right " }
		,{ dataField : "sumPrice",     headerText : "합계", style:"right" ,width : 60, editable : false , dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "rlStandByRackCode",     headerText : "대기랙코드" , editable : false, visible : false }
		,{ dataField : "rlStandByRackName",     headerText : "대기랙명" , editable : false, visible : false }
		,{ dataField : "placeCustCode",     headerText : "발주거래처코드" , editable : false}
		,{ dataField : "placeCustName",     headerText : "발주처명" , editable : false}
		, { dataField: "orderReqPlaceCustCode", headerText: "주문요청발주처코드", editable: false , visible: false }
		, { dataField: "orderReqPlaceCustName", headerText: "주문요청발주처", editable: false }
		,{ dataField: "toOrderReqPlaceYN", headerText: "주문요청발주처로반출" , width: 160}
		//,{ dataField : "storageCode",     headerText : "창고사용코드" , editable : false}
		//,{ dataField : "storageName",     headerText : "창고명" , editable : false}
		,{ dataField : "rlStandByStorCode",     headerText : "출고예정창고" , editable : false, visible : false }
		,{ dataField : "rlStandByStorName",     headerText : "출고예정창고" , editable : false}
		,{ dataField : "memo1",     headerText : "비고1", editable : false }
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID", width : 100, editable : false }
		//,{ dataField : "riNo",     headerText : "반입번호" ,width : 100, editable : false}
		,{ dataField : "roNo",     headerText : "반출번호" ,width : 100, editable : false}
		,{ dataField : "orderNo",     headerText : "주문번호" , editable : false ,visible:false }
		,{ dataField : "orderSeq",     headerText : "주문순번" , editable : false  ,visible:false}
		,{ dataField : "placeNo",     headerText : "발주번호" , editable : false ,visible:false }
		,{ dataField : "placeSeq",     headerText : "발주순번" , editable : false  ,visible:false}
	
	];
	
	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "placeCnt",		positionField: "placeCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "roReqCnt",		positionField: "roReqCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "roCnt",		positionField: "roCnt",		operation: "SUM",		formatString: "#,##0"	}, 
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
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,
		independentAllCheckBox: true,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.roNo != "" && item.roNo !=null) { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.roNo != "" && item.roNo !=null) { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	AUIGrid.setFooter(myGridID, footerLayout);
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
		if (event.checked) {
			// name 의 값들 얻기
			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "roNo");
			// Anna 제거하기
			uniqueValues.splice(!uniqueValues.indexOf(""), 2);
			AUIGrid.setCheckedRowsByValue(event.pid, "roNo", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "roNo", []);
		}
	});
	
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	//AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

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
	if (event.dataField == 'roCnt' ) {
		var sumPrice = event.item.roCnt * event.item.salePrice; 
		AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);	
	}
	
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		if (event.item.roCnt > event.item.roReqCnt) {
			alert("반출수량이 반출요청수량보다 많습니다!");
			item = {
				roCnt: event.item.roReqCnt,
				sumPrice: event.item.roReqCnt * event.item.salePrice
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
	var roReqNo = $("#roReqNo").text();
//	console.log("roReqNo:"+roReqNo);
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
			"roReqNo":roReqNo,
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
				var url = "";
				let tagArea = document.getElementById('attaFileOri');
				
				//console.log("len:"+data.reqList.length);	
				for(i=0;i<data.reqList.length;i++){
					roReqNo = data.reqList[i].roReqNo;
					receiver = data.reqList[i].receiver;
				    memo1 = data.reqList[i].memo1; 
					dmdYmd = data.reqList[i].dmdYmd; 
					dmdTime = data.reqList[i].dmdTime; 
					orderGroupId = data.reqList[i].orderGroupId;
					//attaFileOri = data.reqList[i].attaFileOri;
					if(data.reqList[i].attaFileOri !=null && data.reqList[i].attaFileOri !=''){
						var attaList = data.reqList[i].attaFileOri.split(",");
						var attaList2 = data.reqList[i].attaFile.split(",");
						for (var j = 0; j < attaList.length; j++) {
							//20241023 supi 반출요청 첨부파일인거 같은데 현재 주석화 되어 안쓰고 있는거 같지만 url은 변수포함으로 해둠 다시사용시 확인할것
							url = "<a href='"+fileRootUrl + data.reqList[i].comCode + "/ro/" + attaList2[j] + "'>"+attaList[j]+"</a><br/>"; // 2023.10.18. 4car로 변경
							$("#attaFileOri").append(url);
						}
						
					}
					
					roWay = data.reqList[i].roWay;
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
					
					storageCode  = data.reqList[i].storageCode;
					storageName  = data.reqList[i].storageName;
					rackCode  = data.reqList[i].rackCode;
					rackName  = data.reqList[i].rackName;					
					
					$("#roReqNo").text(roReqNo);
					$("#roMgr").val(receiver); 
					$("#memo1").val(memo1); 
					$("#dmdYmd").text(dmdYmd); 
					$("#dmdTime").text(dmdTime);
					$("#orderGroupIdDsp").text(orderGroupId); 
					//$("#attaFileOri").text(attaFileOri);
					//$("#attaFileOri").text(url);
					$("#roWay").val(roWay);
					$("#regUserName").text(regUserId);
					$("#regYmd").text(regYmd);
					$("#carNo").text(carNo);
					$("#vinNo").text(vinNo);
					$("#orderTypeName").text(orderTypeName);
					$("#makerName_carType").text(makerCode + ' ' + carType); 
					
					$("#custCode").val(custCode);
					$("#custName").val(custName);
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone);

					$("#storageCode").val(storageCode);
					$("#storageName").val(storageName);
					$("#rackCode").val(rackCode);
					$("#rackName").val(rackName);
										
				}		
				findReqItem('/logis/ro-req-item-list');				
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
	var roReqNo = $("#roReqNo").text();
	//console.log("aa:"+storageUseReqNo);
	
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
			"roReqNo":roReqNo,
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
						roReqNo: data.reqItemList[i].roReqNo
						,reqSeq: data.reqItemList[i].reqSeq  
						,claimType: data.reqItemList[i].claimType	
						,itemId: data.reqItemList[i].itemId 
						,itemNo: data.reqItemList[i].itemNo 
						,itemName: data.reqItemList[i].itemName
						,itemNameEn: data.reqItemList[i].itemNameEn 
						,placeCnt: data.reqItemList[i].placeCnt
						,roReqCnt: data.reqItemList[i].roReqCnt
						,roCnt: data.reqItemList[i].roReqCnt 
						,salePrice: data.reqItemList[i].salePrice
						,sumPrice: data.reqItemList[i].roReqCnt * data.reqItemList[i].salePrice
						,placeCustCode: data.reqItemList[i].placeCustCode
						,placeCustName: data.reqItemList[i].placeCustName
						//,storageCode: data.reqItemList[i].storageCode 
						//,storageName: data.reqItemList[i].storageName
						,memo1: data.reqItemList[i].memo1 						
						,orderGroupId: data.reqItemList[i].orderGroupId
						//,riNo: data.reqItemList[i].riNo
						,roNo: data.reqItemList[i].roNo
						,orderNo: data.reqItemList[i].orderNo
						,orderSeq: data.reqItemList[i].orderSeq
						,placeNo: data.reqItemList[i].placeNo
						,placeSeq: data.reqItemList[i].placeSeq
						
						,rlStandByQty: data.reqItemList[i].rlStandByQty
						,rlStandByStorCode: data.reqItemList[i].rlStandByStorCode
						,rlStandByStorName: data.reqItemList[i].rlStandByStorName
						,rlStandByRackCode: data.reqItemList[i].rlStandByRackCode
						,rlStandByRackName: data.reqItemList[i].rlStandByRackName

						,toOrderReqPlaceYN: data.reqItemList[i].toOrderReqPlaceYN
						,orderReqPlaceCustCode: data.reqItemList[i].orderReqPlaceCustCode
						,orderReqPlaceCustName: data.reqItemList[i].orderReqPlaceCustName
						
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
		
		
// 반출처리
function roProc(url, workingType){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var roMgr = $('#roMgr').val();
 	var memo = $('#memo1').val();
 	var roWay = $('#roWay').val();
 	var storageCode = "";
 	var custCode = "";//check placeCustCode 2023.08.01 bk 
 	var sumPrice = 0;
 	let salePriceArr ="";
 	let toOrderReqPlaceYNArr ="";
 	
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	
	var plArr = "";
	var plSeqArr = "";
	var odArr = "";
	var odSeqArr = "";
	
	var reqArr = "";
	var seqArr = "";
	//var scdArr = "";   // 창고코드배열 
	var cntArr
	var mm1Arr = "";
	//var mm2Arr = "";
	var errCnt = 0;		
	var errCnt1 = 0;
	
	var errCnt2 = 0;
	
	var storageCode = $("#storageCode").val();
	var rackCode = $("#rackCode").val();
	
	let gvComCode = $("#gvComCode").val();  //230921
	if(gvComCode=='null'){gvComCode = ''}

	for (var i = 0, len = checkedItems.length; i < len; i++) {   
		rowItem = checkedItems[i];
		
		plNo = rowItem.item.placeNo;
		plSeq = rowItem.item.placeSeq;
		odNo = rowItem.item.orderNo;
		odSeq = rowItem.item.orderSeq;
		
		roReqNo = rowItem.item.roReqNo;
		roSeq = rowItem.item.reqSeq;
		//storageCode = rowItem.item.storageCode;
		roCnt = rowItem.item.roCnt;
		memo1 = rowItem.item.memo1;
		sumPrice = sumPrice + rowItem.item.sumPrice;	
		salePrice = rowItem.item.salePrice;	
		toOrderReqPlaceYN = rowItem.item.toOrderReqPlaceYN;	

		//memo2 = rowItem.item.memo2;
		if(roCnt == 0){
			errCnt = errCnt +1;
			break;		
		}		

		rlStandByQty = rowItem.item.rlStandByQty;
		if(roCnt > rlStandByQty){
			errCnt1 = errCnt1 +1;
			break;		
		}	
				
		if (typeof plNo == 'undefined' || plNo == null) {			plNo = "";		}
		if (typeof plSeq == 'undefined' || plSeq == null) {			plSeq = "";		}
		if (typeof odNo == 'undefined' || odNo == null) {			odNo = "";		}
		if (typeof odSeq == 'undefined' || odSeq == null) {			odSeq = "";		}
		
		if (typeof roReqNo == 'undefined' || roReqNo == null) {			roReqNo = "";		}
		if (typeof roSeq == 'undefined' || roSeq == null) {			roSeq = "";		}
		//if (typeof storageCode == 'undefined' || storageCode == null) {			storageCode = "";		}
		if (typeof roCnt == 'undefined' || roCnt == null) {			roCnt = "";		}
		if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
		//if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
		if (typeof salePrice == 'undefined' || salePrice == null) {			salePrice = "";		}
		if (typeof toOrderReqPlaceYN == 'undefined' || toOrderReqPlaceYN == null) {			toOrderReqPlaceYN = "";		}
		
		if (i == 0) {
			plArr = plNo;		
			plSeqArr = plSeq;
			odArr = odNo;		
		    odSeqArr = odSeq;
			
			reqArr = roReqNo;		
			seqArr = roSeq;
			//scdArr = storageCode;
			cntArr = roCnt;
			mm1Arr = memo1;			
			custCode = rowItem.item.placeCustCode;			
			//mm2Arr = memo2;
			salePriceArr = rowItem.item.salePrice;			
			toOrderReqPlaceYNArr = rowItem.item.toOrderReqPlaceYN;			
		}else{
			if (custCode != rowItem.item.placeCustCode ) {
				errCnt2 = errCnt2 + 1;
			}	
			plArr = plArr + "^" +plNo;		
			plSeqArr = plSeqArr + "^" +plSeq;
			odArr = odArr + "^" +odNo;		
			odSeqArr = odSeqArr + "^" +odSeq;
			
			
			reqArr = reqArr + "^" +roReqNo;		
			seqArr = seqArr + "^" +roSeq;
			//scdArr = scdArr + "^" +storageCode;
			cntArr = cntArr + "^" +roCnt;
			mm1Arr = mm1Arr + "^" +memo1;
			//mm2Arr = mm2Arr + "^" +memo2;
			salePriceArr = salePriceArr + "^" + rowItem.item.salePrice;
			toOrderReqPlaceYNArr = toOrderReqPlaceYNArr + "^" + rowItem.item.toOrderReqPlaceYN;
		}

	}
	if (errCnt > 0) {
		alert("반출요청수량이 '0' 입니다.")
		return;
	}

	if (errCnt1 > 0) {
		alert("출고예정랙의 재고수량이 출고요청수량 미만입니다.\n출고예정랙의 재고수량을 확인하세요.	")
		return;
	}
	
	if (errCnt2 > 0) {
		alert("발주처가 다른 경우 각각 반출처리를 해야합니다.")
		return;
	}
	
	var data = {};
	/*
    data.workingType = workingType;
    //master
	data.orderGroupId = orderGroupId;
	data.storageCode = storageCode;
	data.custCode = custCode;
	data.memo1 = memo;
	data.roWay = roWay;
	data.roMgr = roMgr;
	
	//sub
	data.plArr = plArr;    //번호
	data.plSeqArr = plSeqArr;    //순번
	data.odArr = odArr;    //번호
	data.odSeqArr = odSeqArr;    //순번
	data.reqArr = reqArr;    //번호
	data.seqArr = seqArr;    //순번
	//data.scdArr = scdArr;    //창고코드
	data.cntArr = cntArr;  
	data.mm1Arr = mm1Arr;    //메모1코드
	//data.mm2Arr = mm2Arr;    //메모2코드
    //console.log("url:"+url);
    */
    //console.log("JSON.stringify(data):"+JSON.stringify(data));
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
			"storageCode" : storageCode,
			"custCode" : custCode,

			"memo1" : memo,
			"roWay" : roWay,
			"roMgr" : roMgr,
			"price" : sumPrice,
						
			"odArr" : odArr,    //번호
			"odSeqArr" : odSeqArr,    //순번
			"plArr" : plArr,    //번호
			"plSeqArr" : plSeqArr,    //순번
			"reqNoArr" : reqArr,    //번호
			"reqSeqArr" : seqArr,    //순번
			//"storCdArr" : scdArr,    //    			
			"roCntArr" : cntArr,    //
			"memo1Arr" : mm1Arr,    //
			//"memo2Arr" : mm2Arr,    //
			
			"rackCode" : rackCode,
			"gvComCode" : gvComCode,
			"salePriceArr" : salePriceArr,
			"toOrderReqPlaceYNArr" : toOrderReqPlaceYNArr
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
	
	//프린트		           
		
function print() {
	
	var roReqNo = $("#roReqNo").text();
	
	let gvComCode = $("#gvComCode").val();
	if(gvComCode=='null'){gvComCode = ''}
	
	window.open ("/logis/ro-req-item-list-print?roReqNo="+roReqNo +"&gvComCode="+gvComCode,"_blank");
	
};	

// 반출요청 취소처리
function roReqProc(url, workingType){
 
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
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		roReqNo = rowItem.item.roReqNo;
		roSeq = rowItem.item.reqSeq;

		if (typeof roReqNo == 'undefined' || roReqNo == null) {			roReqNo = "";		}
		if (typeof roSeq == 'undefined' || roSeq == null) {			roSeq = "";		}
		
		if (i == 0) {
			reqArr = roReqNo;		
			seqArr = roSeq;
		}else{
			reqArr = reqArr + "^" +roReqNo;		
			seqArr = seqArr + "^" +roSeq;
		}

	}

	var data = {};
    
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
			"gvComCode" : gvComCode
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
			
