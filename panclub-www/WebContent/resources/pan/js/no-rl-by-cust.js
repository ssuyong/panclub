// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID2;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();

	// Details 그리드를 생성합니다.
	createDetailAUIGrid();

	// 마스터 그리드 데이터 요청
	requestMyData("/logis/rl-req-list", myGridID);
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "custCode",      headerText : "주문처코드", width : 80  }
	   ,{ dataField : "custName",      headerText : "주문처명", width : 200, style : "left" }	   
	   ,{ dataField : "cnt",      headerText : "아이템수", width : 80 , style : "right", dataType: "numeric", formatString: "#,##0", style: "right",}	   
	];

	// 푸터 설정
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"		, style: "right"
	}];

	
	// 그리드 속성 설정
	var gridPros = {
		// singleRow 선택모드
		selectionMode: "singleRow",

		rowIdField: "custCode",

		showRowCheckColumn: false		
		
		//footer 노출
		,showFooter: true	
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
		
	//선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", auiGridSelectionChangeHandler);
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);	
};

// 관리자 그리드 생성
function createDetailAUIGrid() {

	var columnLayout = [
		{ dataField : "rlReqNo",      headerText : "요청번호", width : 100, editable : false }
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
		,{ dataField : "salePrice",     headerText : "판매단가" , dataType: "numeric",formatString: "#,##0"  , style:"right"  , editable : false }
		,{ dataField : "sumPrice",     headerText : "공급가액" , dataType: "numeric",formatString: "#,##0"  , style:"right"   , editable : false }
		,{ dataField : "rlStandByStorName",     headerText : "출고대기창고" , editable : false}
		,{ dataField : "placeCustCode",     headerText : "발주거래처코드" , editable : false}
		,{ dataField : "placeCustName",     headerText : "발주처명" , editable : false}
		,{ dataField : "storageCode",     headerText : "창고사용코드" , editable : false}
		,{ dataField : "storageName",     headerText : "창고명" , editable : false}
		,{ dataField : "memo1",     headerText : "비고1", editable : false }
		,{ dataField : "memo2",     headerText : "비고2" , editable : false}
		, { dataField: "orderGroupId", headerText: "주문그룹ID", editable: false, width: 90,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		  }
		, {	dataField: "orderNo", headerText: "주문번호", editable: false, width: 90,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		  }
	];

	// 푸터 설정
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
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "menuCode",
		//showRowCheckColumn: true,
		selectionMode: "multipleRows"		
		//footer 노출
		,showFooter: true
	};

	// 실제로 #grid_wrap2 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap_detail", columnLayout, gridPros);
	
	// 헤더렌더러 체크박스 클릭 핸들러
	function myHeaderCheckClick(event) {
		//alert("columnIndex : " + event.columnIndex + ", checked : " + event.checked);
	};

	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID2, footerLayout);
	
	AUIGrid.bind(myGridID2, "cellDoubleClick", function(event) {

		if (event.dataField == 'orderGroupId') {
			/*주문그룹id 현재창에서 변경하는 코드 요청으로 새창으로 열기로 수정되서 일단 주석처리
			let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'orderGroupId');
			obj.setAttribute('value', event.value);

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/order/order-group-item-list');
			document.body.appendChild(f);
			f.submit();
			*/
			
			var orderGroupId = event.item.orderGroupId ; 
			window.open('/order/order-group-item-list?orderGroupId=' + orderGroupId, '_blank'); //새창으로 열기 

		}
		else if (event.dataField == 'orderNo') {
		 	/*주문번호 현재창에서 변경하는 코드 요청으로 새창으로 열기로 수정되서 일단 주석처리
			let f = document.createElement('form');

			let obj;
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'orderNo');
			obj.setAttribute('value', event.value);

			f.appendChild(obj);
			f.setAttribute('method', 'post');
			f.setAttribute('action', '/order/order-up');
			document.body.appendChild(f);
			f.submit();
			*/
			var orderNo = event.item.orderNo ; 
			window.open('/order/order-up?orderNo=' + orderNo, '_blank'); //새창으로 열기 
		}
	})
	
}
	


// 그리드 ready 이벤트 핸들러
function auiGridCompleteHandler(event) {

	// 마스터 그리드가 로딩 완료된 시점에 마스터코드를 고정. 
	var userId = "";
	mCode = $("#dInfo_userId").text();
	AUIGrid.selectRowsByRowId(myGridID, userId);

}
	
	
// Details 데이터 요청 지연 타임아웃
var timerId = null;

// 마스터 그리드선택 변경 이벤트 핸들러
// 마스터 그리드에서 행을 선택한 경우 해당 행의 마스터코드(mCode) 에 맞는 데이터를 요청하여 디테일 그리드에 표시합니다.
function auiGridSelectionChangeHandler(event) {
	
	// 200ms 보다 빠르게 그리드 선택자가 변경된다면 데이터 요청 안함
	if (timerId) {
		clearTimeout(timerId);
	}

	timerId = setTimeout(function () {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell;

		// 대표 셀에 대한 전체 행 아이템
		var rowItem = primeCell.item;
		
		var custCode = rowItem.custCode; // 선택한 행의 고객 ID 값
		var custName = rowItem.custName;
		
		// 디테일 정보 표시
		document.getElementById("dInfo_custCode").innerHTML = custCode;
		document.getElementById("dInfo_custName").innerHTML = custName;

		// rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
		requestMyData2("/logis/rl-req-item-list", myGridID2, custCode);
	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
};

// 데이터 요청 Ajax
function requestMyData(url, gridId) {
	var list = [];
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			workingType : "NO_RL"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqList.length == 0){
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.reqList.length;i++){
					list.push({
						 custCode: data.reqList[i].custCode 
						,custName: data.reqList[i].custName
						,cnt: data.reqList[i].cnt
					
					});
				}	
				 AUIGrid.setGridData(gridId, list);
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


function requestMyData2(url, gridId,custCode) {
	var list = [];	
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			 "workingType" : "LIST"
			,"custCode" : custCode
			,"procStatus" :  '미출고'
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
		 
			if (data.reqItemList.length == 0){			
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.reqItemList.length;i++){
					list.push({
						rlReqNo: data.reqItemList[i].rlReqNo
						,reqSeq: data.reqItemList[i].reqSeq  
						,claimType: data.reqItemList[i].claimType					//
						,itemId: data.reqItemList[i].itemId 
						,itemNo: data.reqItemList[i].itemNo 
						,itemName: data.reqItemList[i].itemName
						,itemNameEn: data.reqItemList[i].itemNameEn 
						,orderCnt: data.reqItemList[i].orderCnt						//
						,rlReqCnt: data.reqItemList[i].rlReqCnt						//
						,rlCnt: data.reqItemList[i].rlCnt						//
						,salePrice: data.reqItemList[i].salePrice						//
						,sumPrice: data.reqItemList[i].sumPrice						//
						,placeCustCode: data.reqItemList[i].placeCustCode
						,placeCustName: data.reqItemList[i].placeCustName
						,storageCode: data.reqItemList[i].storageCode 
						,storageName: data.reqItemList[i].storageName
						,memo1: data.reqItemList[i].memo1 						
						,memo2: data.reqItemList[i].memo2 
						,orderGroupId: data.reqItemList[i].orderGroupId
						,orderNo: data.reqItemList[i].orderNo  
						,orderSeq: data.reqItemList[i].orderSeq 
						,rlNo: data.reqItemList[i].rlNo
						,rlStandByQty: data.reqItemList[i].rlStandByQty
						,rlStandByStorCode: data.reqItemList[i].rlStandByStorCode
						,rlStandByStorName: data.reqItemList[i].rlStandByStorName
						,rlStandByRackCode: data.reqItemList[i].rlStandByRackCode
						,rlStandByRackName: data.reqItemList[i].rlStandByRackName
						
						,className: data.reqItemList[i].className
						,makerName: data.reqItemList[i].makerName
						,factoryNo: data.reqItemList[i].factoryNo
					
					});
				}		
				 AUIGrid.setGridData(gridId, list);
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



