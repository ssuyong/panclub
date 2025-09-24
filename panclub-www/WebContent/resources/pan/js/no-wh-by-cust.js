// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID2;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();

	// Details 그리드를 생성합니다.
	createDetailAUIGrid();

	// 마스터 그리드 데이터 요청
	requestMyData("/logis/wh-list", myGridID);
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "custCode",      headerText : "발주처코드", width : 80  }
	   ,{ dataField : "custName",      headerText : "발주처명", width : 200, style : "left" }	   
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
	 	{ dataField: "idx", headerText: "idx", width: 50, editable: false, visible: false }
		, { dataField: "placeYmd", headerText: "발주일자", width: 80, editable: false }
		, { dataField: "whSchYmd", headerText: "입고예상일", editable: false }//0705 BK 입고예상일
		, { dataField: "placeNo", headerText: "발주번호", editable: false, width: 90,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		  } 
		, { dataField: "placeSeq", headerText: "발주순번", editable: false, width: 60	  } 
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		, { dataField: "itemId", headerText: "부품ID", width: 60, editable: false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		, { dataField: "itemNo", headerText: "품번", width: 90, editable: false }
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		, { dataField: "itemName", headerText: "품명", width: 120, editable: false, style: "left" }
		, { dataField: "cnt", headerText: "수량", width: 40, dataType: "numeric", formatString: "#,##0", style: "right", editable: false }
		, { dataField: "placeRegUserName", headerText: "요청자명", width: 68,editable: false }
		, { dataField: "memo1", headerText: "비고1", style: "left",width: 120, editable: false }
		, { dataField: "memo2", headerText: "비고2", style: "left",width: 120, editable: false }
		, { dataField: "ref1", headerText: "참고1", style: "left",width: 120, editable: false }
		, { dataField: "ref2", headerText: "참고2", style: "left",width: 120, editable: false }
		, { dataField: "custOrderNo", headerText: "거래처주문번호", width: 100, editable: false }
		, { dataField: "placeHms", headerText: "발주시간", width: 68, editable: false }
		, { dataField: "orderGroupId", headerText: "주문그룹ID", editable: false, width: 90,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		  }
		, {	dataField: "orderNo", headerText: "주문번호", editable: false, width: 90, visible:false,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link"; } return null; }
		  }
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
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "menuCode",
		rowIdField: "idx",
		//showRowCheckColumn: true,
		selectionMode: "multipleRows"		
		//footer 노출
		,showFooter: true
		
		// 엑스트라 체크박스 표시 설정
		,showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true
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

		if (event.dataField == 'placeNo') {
			var placeNo = event.value;
			var url = '/order/place-up?placeNo=' + placeNo;
			 var options = 'width=800,height=500'; 
			var newWindow = window.open(url, '_blank',options);
			 newWindow.focus();
			}
		/*
		if (event.dataField == 'orderGroupId') {
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

		}*/
		if (event.dataField == 'orderGroupId'){
			var orderGroupId = event.item.orderGroupId
			var url =  '/order/order-group-item-list?orderGroupId=' + orderGroupId ;
			var newWindow = window.open(url, '_blank');
				 newWindow.focus();
		}
		
		if (event.dataField == 'orderNo') {
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
		requestMyData2("/logis/wh-item-list", myGridID2, custCode);
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
			workingType : "NO_WH"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.whList.length == 0){
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.whList.length;i++){
					list.push({
						 custCode: data.whList[i].custCode 
						,custName: data.whList[i].custName
						,cnt: data.whList[i].cnt
					
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
			 "workingType" : "PLACE_LIST"
			,"custCode" : custCode
			,"whStatus" :  '미입고'
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.whItemList.length == 0){			
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.whItemList.length;i++){
					list.push({
						idx: i
						, placeYmd: data.whItemList[i].placeYmd
						, custCode: data.whItemList[i].custCode
						, custName: data.whItemList[i].custName
						, placeNo: data.whItemList[i].placeNo
						, placeSeq: data.whItemList[i].placeSeq
						, custOrderNo: data.whItemList[i].custOrderNo
						, makerName: data.whItemList[i].makerName
						, itemId: data.whItemList[i].itemId
						, itemNo: data.whItemList[i].itemNo
						, itemName: data.whItemList[i].itemName
						, itemNameEn: data.whItemList[i].itemNameEn
						, saleUnitPrice: data.whItemList[i].saleUnitPrice
						, cnt: data.whItemList[i].cnt
						, whCnt: data.whItemList[i].whCnt
						, whUnitPrice: data.whItemList[i].whUnitPrice
						, whSumPrice: data.whItemList[i].whSumPrice
						, placeRegUserId: data.whItemList[i].placeRegUserId
						, whRegUserId: data.whItemList[i].whRegUserId
						, whStatus: data.whItemList[i].whStatus
						, whUnitPriceReg: data.whItemList[i].whUnitPriceReg
						, buyChk: data.whItemList[i].buyChk
						, withdrawStatus: data.whItemList[i].withdrawStatus
						, reout: data.whItemList[i].reout
						, memo1: data.whItemList[i].memo1
						, memo2: data.whItemList[i].memo2

						, storageCode: data.whItemList[i].storageCode
						, storageName: data.whItemList[i].storageName
						, rackCode: data.whItemList[i].rackCode
						, rackName: data.whItemList[i].rackName

						, orderGroupId: data.whItemList[i].orderGroupId
						, orderNo: data.whItemList[i].orderNo
						, orderSeq: data.whItemList[i].orderSeq

						, whSeq: data.whItemList[i].whSeq
						, priceChkYmd: data.whItemList[i].priceChkYmd
						, placeUnitPrice: data.whItemList[i].placeUnitPrice
						, rcvCustCode: data.whItemList[i].rcvCustCode
						, rcvCustName: data.whItemList[i].rcvCustName
						, branchCode: data.whItemList[i].branchCode
					
						, placeRegUserName: data.whItemList[i].placeRegUserName
						, whRegUserName: data.whItemList[i].whRegUserName
						, inDead: data.whItemList[i].inDead
						
						, availableWhCnt: data.whItemList[i].availableWhCnt
						, whSchYmd: data.whItemList[i].whSchYmd //0705 BK 입고예상일
						
						,printCnt :   data.whItemList[i].printCnt //0707 프린트 횟수
						,printUser: data.whItemList[i].printUser //0707
						,placeHms: data.whItemList[i].placeHms //0714 bk 
						
						,rlUnitPrice: data.whItemList[i].rlUnitPrice						

						,ref1: data.whItemList[i].ref1		//0822 bk				
						,ref2: data.whItemList[i].ref2		//0822 bk	
							
						 	
						,className: data.whItemList[i].className		
						,factoryNo: data.whItemList[i].factoryNo		
					
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





// 발주입고로 넘기는 경우. 2024.04.12   
function whUp() {
	let checkedItems = AUIGrid.getCheckedRowItems(myGridID2);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	let rowItem;
	let placeArr = "";
	let placeSeqArr = "";
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		placeArr = placeArr + "^" +rowItem.item.placeNo;
		placeSeqArr = placeSeqArr + "^" +rowItem.item.placeSeq;
	}
	
	//post형식으로 페이지 데이터 조회
	let f = document.createElement('form');
    
	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'placeArr');
	obj.setAttribute('value', placeArr);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'placeSeqArr');
	obj.setAttribute('value', placeSeqArr);
	f.appendChild(obj);
	
	f.setAttribute('method', 'post');
	f.setAttribute('action', '/logis/wh-up');
	document.body.appendChild(f);
	
	f.target = "_blank";
	f.submit();	
}
