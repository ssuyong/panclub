

/* Begin : Date Picker Date Range*/
var today = new Date();
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        date: today,
    	input: '#startpicker-input',
        container: '#startpicker-container'
    },
    endpicker: {
        date: today,
        input: '#endpicker-input',
        container: '#endpicker-container'
    }/*,
    selectableRanges: [
        [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
    ]*/
});
/* End : Date Picker Date Range*/



// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	
	//관리지점코드에 셋팅
	branchCodeSelect("/base/code-list");

	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var orderGroupId = info[1];
        var orderNo = info[2];
        var sYmd = info[3];
        var eYmd = info[4];
        var ymdIgnoreYN = info[5];
        var custCode = info[6];
        var carNo = info[7];
 
 		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		var custCode = $("#custCode").val(); 
		var carNo = $("#carNo").val();  
		   
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
        if ( typeof orderNo == 'undefined'){ orderNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        
        if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof carNo == 'undefined'){ carNo = ''	}
	
        //console.log("sYmd:"+sYmd);
        $("#orderNo").val(orderNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		$("#custCode").val(custCode);
		$("#carNo").val(carNo);
		
        findDataToServer("/order/order-group-list",page);
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var orderGroupId_val = $("#orderGroupId").val(); 
		var orderNo_val = $("#orderNo").val();
		 
 		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		var custCode = $("#custCode").val(); 
		var carNo = $("#carNo").val();  
						
		document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+carNo;
		
		findDataToServer("/order/order-group-list", 1);
	});
	
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	
// 칼럼 레이아웃 작성
var columnLayout = [
	{ dataField: "regYmd", headerText: "주문일", width: 80, editable: false }
	, { dataField: "orderGroupId", headerText: "주문그룹ID", width: 86, editable: false }
	, { dataField: "itemId", headerText: "부품ID", width: 100, editable: false }
	, { dataField: "itemNo", headerText: "품번", width: 120 }
	, { dataField: "itemName", headerText: "품명", width: 160, editable: false, style: "left" }
	, { dataField: "orderCnt", headerText: "주문수량", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", style: "right" }
	, {
		headerText: "요청 ",
		children: [
			 {
				dataField: "stockReqCnt", headerText: "창고사용", width: 56,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "plReqCnt", headerText: "발주", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "storMvReqCnt", headerText: "이동", width: 50, visible: false,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "rlReqCnt", headerText: "출고", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "riCnt", headerText: "반입", editable: false, width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "roCnt", headerText: "반출", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
		]
	}
	, {
		headerText: "처리 ",
		children: [
			 {
				dataField: "stockUseCnt", headerText: "창고사용", width: 56,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "placeCnt", headerText: "발주", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "realReleaseCnt", headerText: "출고", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "reinCnt", headerText: "반입", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "reoutCnt", headerText: "반출", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
			, {
				dataField: "finalCnt", headerText: "최종", width: 50,
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }
			}
		]
	}
	, { dataField: "placeCustName", headerText: "발주처", style: "left", editable: false }
	, { dataField: "unitPrice", headerText: "단가", dataType: "numeric", formatString: "#,##0", style: "right",  editable: false, width: 80 }
	, { dataField: "supplyCustName", headerText: "납품처", style: "left", editable: false }
	, { dataField: "salePrice", headerText: "판매가", dataType: "numeric", formatString: "#,##0", style: "right", editable: false, width: 80 }
		
];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			//editable : true,			
			// 셀 병합 실행
			enableCellMerge: true,
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			enableFilter: true,
			filterLayerWidth: 280,
			filterLayerHeight: 340,

			
			// 셀 병합 정책
			// "default"(기본값) : null 을 셀 병합에서 제외하여 병합을 실행하지 않습니다.
			// "withNull" : null 도 하나의 값으로 간주하여 다수의 null 을 병합된 하나의 공백으로 출력 시킵니다.
			// "valueWithNull" : null 이 상단의 값과 함께 병합되어 출력 시킵니다.
			//cellMergePolicy: "withNull",

			// 셀머지된 경우, 행 선택자(selectionMode : singleRow, multipleRows) 로 지정했을 때 병합 셀도 행 선택자에 의해 선택되도록 할지 여부
			rowSelectionWithMerge: true,

	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});
	
	// 에디팅 시작 이벤트 바인딩
	// 에디팅 정상 종료 직전 이벤트 바인딩
	// 에디팅 정상 종료 이벤트 바인딩
	// 에디팅 취소 이벤트 바인딩
	//AUIGrid.bind(myGridID, ["cellEditBegin", "cellEditEndBefore", "cellEditEnd", "cellEditCancel"], auiCellEditingHandler);
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
	
	
	// 필터링 이벤트 바인딩
		AUIGrid.bind(myGridID, "filtering", function (evt) {
			var filterInfo = evt.filterCache;
			var str = "filtering Event Info<br/>";
			var length = 0;
			for (var n in filterInfo) {
				length++;
				str += n + " : " + JSON.stringify(filterInfo[n]) + "<br/>";
			}
			if (length <= 0)
				str = "필터링 되지 않음";

			document.getElementById("ellapse").innerHTML = str;
		});
	
		// 값에 따라 필터링을 지정합니다.
	function setFilterByValues() {

		AUIGrid.setFilterByValues(myGridID, "name", ["Anna", "Emma"]);

	}
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		//console.log("columnIndex:"+event.columnIndex);  
		if (event.columnIndex == 0) {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderNo_val = $("#orderNo").val(); 
			var orderGroupId_val = $("#orderGroupId").val();
				
			document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd;
			//
	     	
	     	//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderGroupId');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-group-item-list');
		    document.body.appendChild(f);
		    f.submit();
		}		
	});
		
}


function findDataToServer(url,page) {
	var list = [];
	//var sYmd = $("#sYmd").val();
	//var eYmd = $("#eYmd").val();
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemNo = $("#itemNo").val();  
	var regUserName = $("#regUserName").val();  
	var placeCustCode = $("#placeCustCode").val(); 
	var supplyCustCode = $("#supplyCustCode").val(); 
	var branchCode = $("#branchCode").val();
	/*
	var reqIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=reqIgnoreYN]').is(':checked') == true){
		reqIgnoreYN = "Y";
	}
	*/
	
		if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!itemNo || itemNo.trim() == '' ) && (!regUserName || regUserName.trim() == '')
	   	 && (!placeCustCode || placeCustCode.trim() == '') && (!supplyCustCode || supplyCustCode.trim() == '')&& (!branchCode || branchCode.trim() == '')) {
	      alert("조회 조건을 하나 이상 입력해주세요.");
	      return false;
	   }
	}


	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			
			"itemNo":itemNo,
			"regUserName":regUserName,
			"placeCustCode" : placeCustCode ,
			"supplyCustCode" : supplyCustCode ,
			"branchCode" : branchCode	
				
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderGroupList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
				for(i=0;i<data.orderGroupList.length;i++){	
				orderTypeNm= '';
					if (data.orderGroupList[i].orderType =="1" ){
						 orderTypeNm = '직영'	
						 } else{
							orderTypeNm = '대행'	
						}
					list.push({
						 regYmd : data.orderGroupList[i].regYmd  //여기부터 작업
						,carNo: data.orderGroupList[i].carNo 
						,custCode: data.orderGroupList[i].custCode 
						,supplyCustName: data.orderGroupList[i].supplyCustName 
						,custName: data.orderGroupList[i].custName
						,orderType: data.orderGroupList[i].orderType 
						,orderTypeName: orderTypeNm 
						,claimType: data.orderGroupList[i].claimType
						,orderNo: data.orderGroupList[i].orderNo 
						,claimYN: data.orderGroupList[i].claimYN 
						,collectYN: data.orderGroupList[i].collectYN 
						,sumPrice: _cf_comma(data.orderGroupList[i].salePrice +data.orderGroupList[i].taxPrice ) 
						,salePrice:  _cf_comma(data.orderGroupList[i].salePrice) 
						,taxPrice:  _cf_comma(data.orderGroupList[i].taxPrice) 
						,itemCnt: data.orderGroupList[i].itemCnt 
						,regUserName: data.orderGroupList[i].regUserName 
						,regYmd: data.orderGroupList[i].regYmd 
						,uptUserName: data.orderGroupList[i].uptUserName 
						,uptYmd: data.orderGroupList[i].uptYmd
						,branchCode: data.orderGroupList[i].branchCode
						,branchName: data.orderGroupList[i].branchName
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID, Number(page));
			     }
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


// 데이터 요청 Ajax
function findSrchCode(url) {
	var list = [];
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			mCode : "1000"
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.codeList.length == 0){
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			}else{
				//$("#makerCode").append("<option  value='' >---</option>");
				for(i=0;i<data.codeList.length;i++){
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName; 
					$("#makerCode").append("<option value='"+code+"' >"+code+" : "+codeName+"</option>");
				}
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

$(document).keydown(function(e) {
  if (e.which == 120) {
    $('#btnFind').click();}
	});

//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj,name) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	//console.log("row1:"+rowItem.itemNo);
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	$(obj).val(rowItem.custCode);
	$("#"+name+"").val(rowItem.custName);
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");
	
}
	
//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	item = {
		itemId: rowItem.itemId,
		itemNo: rowItem.itemNo,
		itemName: rowItem.itemName,
		itemNameEn: rowItem.itemNameEn,
		salePrice: rowItem.salePrice
		, unitPrice: rowItem.salePrice
		, cnt: 1
		, saleUnitPrice: rowItem.salePrice 
		, sumPrice: rowItem.salePrice * 1
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}
			