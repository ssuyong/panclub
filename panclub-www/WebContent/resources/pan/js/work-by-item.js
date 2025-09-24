

$( function() {
    $( "#tabs" ).tabs();
  } );

/*
$('#tabs').click('tabsselect', function (event, ui) {
	var selectedTab = $("#tabs").tabs('option', 'active');
	//AUIGrid.resize(myGridID_wh);
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemId = $("#itemId").val();
	var itemNo = $("#itemNo").val();
	
	var srchSYmd = $("#srchSYmd").val();
    var srchEYmd = $("#srchEYmd").val();
    var srchIgnorYmd = $("#srchIgnorYmd").val();
    var srchItemId = $("#srchItemId").val();
    var srchItemNo = $("#srchItemNo").val();
    
    var srchActYN="N"   //검색조건 변경하고 조회한 경우 탭 클릭시 조회를 새로..
    if (sYmd != srchSYmd || eYmd != srchEYmd || ymdIgnoreYN != srchIgnorYmd || itemId != srchItemId || itemNo != srchItemNo) {
		srchActYN = 'Y';
	}
	console.log("1 srchActYN:"+srchActYN);
	
	    
    if(selectedTab == 0){        
        AUIGrid.resize(myGridID_rl);
        if (srchActYN == 'Y') { findDataToServer_rl("/logis/rl-item-list"); }
    }else if(selectedTab == 1){
    	AUIGrid.resize(myGridID_wh);
    	if (srchActYN == 'Y') { findDataToServer_wh("/logis/wh-item-list"); }
    }else if(selectedTab == 2){        
        AUIGrid.resize(myGridID_pl);
    }else if(selectedTab == 3){        
        AUIGrid.resize(myGridID_su);
    }else if(selectedTab == 4){        
        AUIGrid.resize(myGridID_od);
    }else if(selectedTab == 5){        
        AUIGrid.resize(myGridID_et);
    };
});
*/
/* Begin : Date Picker Date Range*/
var today = new Date();
let year2Ago = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
let year1Ago = new Date(today.getTime() - (365*24*60*60*1000)); // 2년전부 오늘까지
let month3Ago = new Date(today.getTime() - (90*24*60*60*1000)); // 2년전부 오늘까지
let week1Ago =  new Date(today.getTime() - (7*24*60*60*1000)); // 1주일전 
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        date: week1Ago,
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
var myGridID_rl;
var myGridID_wh;
var myGridID_pl;
var myGridID_su;
var myGridID_od;
var myGridID_et;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid_rl();
	createAUIGrid_wh();
	createAUIGrid_pl();
	createAUIGrid_su();
	createAUIGrid_od();
	createAUIGrid_et();
	
	//findDataToServer_rl("/logis/rl-item-list");

	$("#btnFind").click(function(){
		var selectedTab = $("#tabs").tabs('option', 'active');
		//console.log("selectedTab:"+selectedTab);
		//AUIGrid.resize(myGridID_wh);
	    if(selectedTab == 0){        
	        AUIGrid.resize(myGridID_rl);
	        findDataToServer_rl("/logis/rl-item-list");
	    }else if(selectedTab == 1){
	    	AUIGrid.resize(myGridID_wh);
	    	findDataToServer_wh("/logis/wh-item-list");
	    }else if(selectedTab == 2){        
	        AUIGrid.resize(myGridID_pl);
	        findDataToServer_pl("/order/place-item-list");
	    }else if(selectedTab == 3){        
	        AUIGrid.resize(myGridID_su);
	        findDataToServer_su("/logis/storage-use-req-list");
	    }else if(selectedTab == 4){        
	        AUIGrid.resize(myGridID_od);
	        findDataToServer_od("/order/order-item-list"); 
	    }else if(selectedTab == 5){        
	        AUIGrid.resize(myGridID_et);
	        findDataToServer_et("/order/esti-item-list"); 
    	};
	});
	
	$("#tabRl").click(function(){
		 AUIGrid.resize(myGridID_rl);
         findDataToServer_rl("/logis/rl-item-list"); 
	});
	
	$("#tabWh").click(function(){
		AUIGrid.resize(myGridID_wh);
        findDataToServer_wh("/logis/wh-item-list"); 
	});
		
	$("#tabPl").click(function(){
		AUIGrid.resize(myGridID_pl);
        findDataToServer_pl("/order/place-item-list"); 
	});

	$("#tabSu").click(function(){
		AUIGrid.resize(myGridID_su);
        findDataToServer_su("/logis/storage-use-req-list"); 
	});

	$("#tabOd").click(function(){
		AUIGrid.resize(myGridID_od);
        findDataToServer_od("/order/order-item-list"); 
	});

	$("#tabEt").click(function(){
		AUIGrid.resize(myGridID_et);
        findDataToServer_et("/order/esti-item-list"); 
	});

	//
	$("#btnFind").click();
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	

// AUIGrid 를 생성합니다.
function createAUIGrid_rl() {
	
	// 칼럼 레이아웃 작성
	var columnLayout = [ 
		 { dataField : "no",    headerText : "출고번호", width : 140} 
		,{ dataField : "ymd",   headerText : "출고일자", width: 120} 
		,{ dataField : "custCode",     headerText : "출고처코드", width : 80     }
		,{ dataField : "custName",     headerText : "출고처명", width : 140  , style : "left" }
		,{ dataField : "claimType",      headerText : "청구구분", width : 60 }
		,{ dataField : "makerName",      headerText : "제조사", width : 120, style : "left" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80} 
		,{ dataField : "itemNo",      headerText : "품번", width : 140} 
		,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명" , style:"left", width: 200} 
		,{ dataField : "cnt",     headerText : "수량" , style:"right" ,width : 70}
		,{ dataField : "unitPrice",     headerText : "단가" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "금액" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "참고" , style : "left" }
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, 
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }				
	];
 
 	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}	
	];
	
	
	var auiGridProps = {			
			//editable : true,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			//usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			//pageRowCount: 2000,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			showFooter: true,
			showAutoNoDataMessage : false,
			
			/*
			
			// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
			rowIdField : "mgrIdx",
			
			
			//softRemoveRowMode 적용을 원래 데이터에만 적용 즉, 새 행인 경우 적용 안시킴
			softRemovePolicy :"exceptNew",
			
			// 칼럼 끝에서 오른쪽 이동 시 다음 행, 처음 칼럼으로 이동할지 여부
			wrapSelectionMove : true,
			
			// 읽기 전용 셀에 대해 키보드 선택이 건너 뛸지 여부 (기본값 : false)
			skipReadonlyColumns : true,
			
			// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
			enterKeyColumnBase : true,
			
			// selectionChange 이벤트 발생 시 간소화된 정보만 받을지 여부
			// 이 속성은 선택한 셀이 많을 때 false 설정하면 퍼포먼스에 영향을 미칩니다.
			// selectionChange 이벤트 바인딩 한 경우 true 설정을 권합니다.
			simplifySelectionEvent : true */
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID_rl = AUIGrid.create("#grid_wrap_rl", columnLayout, auiGridProps);
	
	var rowPos = 'first';
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID_rl, "pageChange", function (event) {
		currentPage = event.currentPage;
	});		
	
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동 2023.07.14 bk
	AUIGrid.bind(myGridID_rl, "cellDoubleClick", function (event) {
		//console.log("click:"+event.dataField);
		if (event.dataField == "orderGroupId") {   
			var orderGroupId = event.item.orderGroupId
			var url = '/order/order-dtl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		}		
	});
		
	AUIGrid.setFooter(myGridID_rl, footerLayout);
}

// AUIGrid 를 생성합니다.
function createAUIGrid_wh() {
	
	// 칼럼 레이아웃 작성
	var columnLayout = [ 
		 { dataField : "no",    headerText : "입고번호", width : 140} 
		,{ dataField : "ymd",   headerText : "입고일자", width: 120} 
		,{ dataField : "custCode",     headerText : "입고처코드", width : 80     }
		,{ dataField : "custName",     headerText : "입고처명", width : 140, style : "left"   }
		,{ dataField : "makerName",      headerText : "제조사", width : 120, style : "left" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80} 
		,{ dataField : "itemNo",      headerText : "품번", width : 140} 
		,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명" , style:"left", width: 200} 
		,{ dataField : "cnt",     headerText : "수량" , style:"right" ,width : 70}
		,{ dataField : "unitPrice",     headerText : "단가" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "금액" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "참고" , style : "left"}
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, 
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }				
	];
 
 	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}	
	];
	
	
	var auiGridProps = {			
			usePaging: false,
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false,
	};
	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID_wh = AUIGrid.create("#grid_wrap_wh", columnLayout, auiGridProps);
	
	var rowPos = 'first';
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID_wh, "pageChange", function (event) {
		currentPage = event.currentPage;
	});		

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동 2023.07.14 bk
	AUIGrid.bind(myGridID_wh, "cellDoubleClick", function (event) {
		//console.log("click:"+event.dataField);
		if (event.dataField == "orderGroupId") {   
			var orderGroupId = event.item.orderGroupId
			var url = '/order/order-dtl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		}		
	});		
			
	AUIGrid.setFooter(myGridID_wh, footerLayout);
}

function createAUIGrid_pl() {
	
	// 칼럼 레이아웃 작성
	var columnLayout = [ 
		 { dataField : "no",    headerText : "발주번호", width : 140} 
		,{ dataField : "ymd",   headerText : "발주일자", width: 120} 
		,{ dataField : "custCode",     headerText : "발주처코드", width : 80     }
		,{ dataField : "custName",     headerText : "발주처명", width : 140, style : "left"   }
		,{ dataField : "makerName",      headerText : "제조사", width : 120, style : "left" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80} 
		,{ dataField : "itemNo",      headerText : "품번", width : 140} 
		,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명" , style:"left", width: 200} 
		,{ dataField : "cnt",     headerText : "수량" , style:"right" ,width : 70}
		,{ dataField : "unitPrice",     headerText : "단가" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "금액" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "참고" , style : "left"}
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, 
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }				
	];
 
 	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}	
	];
	
	
	var auiGridProps = {			
			usePaging: false,
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false,
	};
	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID_pl = AUIGrid.create("#grid_wrap_pl", columnLayout, auiGridProps);
	
	var rowPos = 'first';
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID_pl, "pageChange", function (event) {
		currentPage = event.currentPage;
	});		

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동 2023.07.14 bk
	AUIGrid.bind(myGridID_pl, "cellDoubleClick", function (event) {
		if (event.dataField == "orderGroupId") {   
			var orderGroupId = event.item.orderGroupId
			var url = '/order/order-dtl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		}		
	});		
			
	AUIGrid.setFooter(myGridID_pl, footerLayout);
}

function createAUIGrid_su() {
	
	// 칼럼 레이아웃 작성
	var columnLayout = [ 
		 { dataField : "no",    headerText : "창고사용번호", width : 140} 
		,{ dataField : "ymd",   headerText : "창고사용일자", width: 120} 
		,{ dataField : "custCode",     headerText : "거래처코드", width : 80     }
		,{ dataField : "custName",     headerText : "거래처명", width : 140, style : "left"   }
		,{ dataField : "makerName",      headerText : "제조사", width : 120, style : "left" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80} 
		,{ dataField : "itemNo",      headerText : "품번", width : 140} 
		,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명" , style:"left", width: 200} 
		,{ dataField : "cnt",     headerText : "수량" , style:"right" ,width : 70}
		,{ dataField : "unitPrice",     headerText : "단가" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "금액" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "참고" , style : "left"}
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, 
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }				
	];
 
 	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}	
	];
	
	
	var auiGridProps = {			
			usePaging: false,
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false,
	};
	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID_su = AUIGrid.create("#grid_wrap_su", columnLayout, auiGridProps);
	
	var rowPos = 'first';
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID_su, "pageChange", function (event) {
		currentPage = event.currentPage;
	});		

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동 2023.07.14 bk
	AUIGrid.bind(myGridID_su, "cellDoubleClick", function (event) {
		if (event.dataField == "orderGroupId") {   
			var orderGroupId = event.item.orderGroupId
			var url = '/order/order-dtl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		}		
	});		
			
	AUIGrid.setFooter(myGridID_su, footerLayout);
}

function createAUIGrid_od() {	
	
	var columnLayout = [ 
		 { dataField : "no",    headerText : "주문번호", width : 140} 
		,{ dataField : "ymd",   headerText : "주문일자", width: 120} 
		,{ dataField : "custCode",     headerText : "거래처코드", width : 80     }
		,{ dataField : "custName",     headerText : "거래처명", width : 140  , style : "left" }
		,{ dataField : "clType",      headerText : "청구구분", width : 60 }
		,{ dataField : "makerName",      headerText : "제조사", width : 120, style : "left" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80} 
		,{ dataField : "itemNo",      headerText : "품번", width : 140} 
		,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명" , style:"left", width: 200} 
		,{ dataField : "cnt",     headerText : "수량" , style:"right" ,width : 70}
		,{ dataField : "unitPrice",     headerText : "단가" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "금액" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "참고" , style : "left" }
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, 
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }				
	];
 
 	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}	
	];
	
	
	var auiGridProps = {			
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false
	};
	
	myGridID_od = AUIGrid.create("#grid_wrap_od", columnLayout, auiGridProps);
	
	var rowPos = 'first';
	
	var currentPage = 1;
	AUIGrid.bind(myGridID_od, "pageChange", function (event) {
		currentPage = event.currentPage;
	});		
	
	AUIGrid.bind(myGridID_od, "cellDoubleClick", function (event) {
		if (event.dataField == "orderGroupId") {   
			var orderGroupId = event.item.orderGroupId
			var url = '/order/order-dtl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		}		
	});
		
	AUIGrid.setFooter(myGridID_od, footerLayout);
}

function createAUIGrid_et() {
	
	var columnLayout = [ 
		 { dataField : "no",    headerText : "견적번호", width : 140} 
		,{ dataField : "ymd",   headerText : "견적일자", width: 120} 
		,{ dataField : "custCode",     headerText : "거래처코드", width : 80     }
		,{ dataField : "custName",     headerText : "거래처명", width : 140, style : "left"   }
		,{ dataField : "makerName",      headerText : "제조사", width : 120, style : "left" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80} 
		,{ dataField : "itemNo",      headerText : "품번", width : 140} 
		,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명" , style:"left", width: 200} 
		,{ dataField : "cnt",     headerText : "수량" , style:"right" ,width : 70}
		,{ dataField : "unitPrice",     headerText : "단가" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "금액" , width : 90, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "memo1",     headerText : "참고", style : "left" }
		,{ dataField : "orderGroupId",      headerText : "주문관리ID", width : 100, 
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }				
	];
 
 	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}	
	];
	
	
	var auiGridProps = {			
			usePaging: false,
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false,
	};
	
	myGridID_et = AUIGrid.create("#grid_wrap_et", columnLayout, auiGridProps);
	
	AUIGrid.bind(myGridID_et, "pageChange", function (event) {
		currentPage = event.currentPage;
	});		

	AUIGrid.bind(myGridID_et, "cellDoubleClick", function (event) {
		if (event.dataField == "orderGroupId") {   
			var orderGroupId = event.item.orderGroupId
			var url = '/order/order-dtl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		}		
	});		
			
	AUIGrid.setFooter(myGridID_et, footerLayout);
}


function findDataToServer_rl(url) {
    AUIGrid.clearGridData(myGridID_rl);
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	setStartSpinner();
	
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemId = $("#itemId").val();
	var itemNo = $("#itemNo").val();
	
	if ((!itemId || itemId.trim() == '' || itemId==0 ) && (!itemNo || itemNo.trim() == '') ) {
		  setStopSpinner();
	      //alert("부품ID 또는 품명을 입력하세요.");
	      $("#iDiv_noSrchPop").text("ⓘ 부품ID 또는 품번을 입력하고 조회하세요");
	      $("#iDiv_noSrchPop").css("display","block");
	      return false;
	   }
	var workingType = "WORK_LIST";

    //마지막조회조건 기억하고 있다가 탭클릭시 비교해서 다시select
    //$("#srchSYmd").val(sYmd);
    //$("#srchEYmd").val(eYmd);
   // $("#srchIgnorYmd").val(ymdIgnoreYN);
   // $("#srchItemId").val(itemId);
   // $("#srchItemNo").val(itemNo);
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType
			,"sYmd":sYmd
			,"eYmd":eYmd
			,"ymdIgnoreYN":ymdIgnoreYN
			,"itemId":itemId
			,"itemNo":itemNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 setStopSpinner();
			if (data.rlItemList.length == 0){				
				//alert("조건에 맞는 자료가 없습니다.");
				//AUIGrid.clearGridData(myGridID_rl);
				$("#iDiv_noDataPop").css("display","block");											
			}else{
					
				for(i=0;i<data.rlItemList.length;i++){
				    list.push({						  
						 no: data.rlItemList[i].rlNo
						,ymd: data.rlItemList[i].rlYmd  
						,custCode: data.rlItemList[i].custCode 
						,custName: data.rlItemList[i].custName
						,claimType: data.rlItemList[i].claimType
						,orderGroupId: data.rlItemList[i].orderGroupId 
						,makerName: data.rlItemList[i].makerCode +'-'+data.rlItemList[i].makerName
						,itemId: data.rlItemList[i].itemId 
						,itemNo: data.rlItemList[i].itemNo 
						,itemName: data.rlItemList[i].itemName
						,cnt: data.rlItemList[i].cnt
						,unitPrice: data.rlItemList[i].rlUnitPrice 
						,sumPrice: data.rlItemList[i].cnt * data.rlItemList[i].rlUnitPrice
						,memo1: data.rlItemList[i].memo1 
						
						,className: data.rlItemList[i].className 
						,factoryNo: data.rlItemList[i].factoryNo 
					});
					//console.log(data.rlItemList[i].itemId);
					/*
					if(data.rlItemList[i].itemId > 0 ){
						$("#itemId").val( data.rlItemList[i].itemId );
						$("#itemNo").val( data.rlItemList[i].itemNo );
						$("#itemName").val( data.rlItemList[i].itemName );
						$("#makerName").val( data.rlItemList[i].makerCode +'-'+data.rlItemList[i].makerName);
					}
					*/
				}		
				AUIGrid.setGridData("#grid_wrap_rl", list);
			}
		},
		error:function(x,e){
			 setStopSpinner();
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


function findDataToServer_wh(url) {
    AUIGrid.clearGridData(myGridID_wh);
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	setStartSpinner();
	
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemId = $("#itemId").val();
	var itemNo = $("#itemNo").val();
	
	if ((!itemId || itemId.trim() == '' || itemId==0 ) && (!itemNo || itemNo.trim() == '') ) {
		  setStopSpinner();
	      //alert("부품ID 또는 품명을 입력하세요.");
	      $("#iDiv_noSrchPop").text("ⓘ 부품ID 또는 품번을 입력하고 조회하세요");
	      $("#iDiv_noSrchPop").css("display","block");
	      return false;
	   }
	var workingType = "WORK_LIST";
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType
			,"sYmd":sYmd
			,"eYmd":eYmd
			,"ymdIgnoreYN":ymdIgnoreYN
			,"itemId":itemId
			,"itemNo":itemNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			setStopSpinner();
			//console.log("data.whItemList.length:"+data.whItemList.length);
			if (data.whItemList.length == 0){
				$("#iDiv_noDataPop").css("display","block");											
			}else{
					
				for(i=0;i<data.whItemList.length;i++){
				    list.push({						  
						 no: data.whItemList[i].whNo
						,ymd: data.whItemList[i].whYmd  
						,custCode: data.whItemList[i].custCode 
						,custName: data.whItemList[i].custName
						//,claimType: data.whItemList[i].claimType
						,orderGroupId: data.whItemList[i].orderGroupId 
						,makerName: data.whItemList[i].makerCode +'-'+data.whItemList[i].makerName
						,itemId: data.whItemList[i].itemId 
						,itemNo: data.whItemList[i].itemNo 
						,itemName: data.whItemList[i].itemName
						,cnt: data.whItemList[i].cnt
						,unitPrice: data.whItemList[i].whUnitPrice 
						,sumPrice: data.whItemList[i].cnt * data.whItemList[i].whUnitPrice
						,memo1: data.whItemList[i].memo1 
						
						,className: data.whItemList[i].className 
						,factoryNo: data.whItemList[i].factoryNo 
					});
				}		
				AUIGrid.setGridData("#grid_wrap_wh", list);
			}
		},
		error:function(x,e){
			 setStopSpinner();
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

function findDataToServer_pl(url) {
	
    AUIGrid.clearGridData(myGridID_pl);
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	setStartSpinner();
	
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemId = $("#itemId").val();
	var itemNo = $("#itemNo").val();
	
	if ((!itemId || itemId.trim() == '' || itemId==0 ) && (!itemNo || itemNo.trim() == '') ) {
		  setStopSpinner();
	      //alert("부품ID 또는 품명을 입력하세요.");
	      $("#iDiv_noSrchPop").text("ⓘ 부품ID 또는 품번을 입력하고 조회하세요");
	      $("#iDiv_noSrchPop").css("display","block");
	      return false;
	   }
	var workingType = "WORK_LIST";
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType
			,"sYmd":sYmd
			,"eYmd":eYmd
			,"ymdIgnoreYN":ymdIgnoreYN
			,"itemId":itemId
			,"itemNo":itemNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			setStopSpinner();
			if (data.placeItemList.length == 0){				
				$("#iDiv_noDataPop").css("display","block");											
			}else{
					
				for(i=0;i<data.placeItemList.length;i++){
				    list.push({						  
						 no: data.placeItemList[i].placeNo
						,ymd: data.placeItemList[i].regYmd  
						,custCode: data.placeItemList[i].custCode 
						,custName: data.placeItemList[i].custName
						//,claimType: data.whItemList[i].claimType
						,orderGroupId: data.placeItemList[i].orderGroupId 
						,makerName: data.placeItemList[i].makerCode +'-'+data.placeItemList[i].makerName
						,itemId: data.placeItemList[i].itemId 
						,itemNo: data.placeItemList[i].itemNo 
						,itemName: data.placeItemList[i].itemName
						,cnt: data.placeItemList[i].cnt
						,unitPrice: data.placeItemList[i].unitPrice 
						,sumPrice: data.placeItemList[i].cnt * data.placeItemList[i].unitPrice
						,memo1: data.placeItemList[i].memo1 
						
						,className: data.placeItemList[i].className 
						,factoryNo: data.placeItemList[i].factoryNo 
					});
				}		
				AUIGrid.setGridData("#grid_wrap_pl", list);
			}
		},
		error:function(x,e){
			 setStopSpinner();
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


function findDataToServer_su(url) {
	
    AUIGrid.clearGridData(myGridID_su);
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	setStartSpinner();
	
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemId = $("#itemId").val();
	var itemNo = $("#itemNo").val();
	
	if ((!itemId || itemId.trim() == '' || itemId==0 ) && (!itemNo || itemNo.trim() == '') ) {
		  setStopSpinner();
	      //alert("부품ID 또는 품명을 입력하세요.");
	      $("#iDiv_noSrchPop").text("ⓘ 부품ID 또는 품번을 입력하고 조회하세요");
	      $("#iDiv_noSrchPop").css("display","block");
	      return false;
	   }
	var workingType = "WORK_LIST";
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType
			,"sYmd":sYmd
			,"eYmd":eYmd
			,"ymdIgnoreYN":ymdIgnoreYN
			,"itemId":itemId
			,"itemNo":itemNo
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			setStopSpinner();
			if (data.reqList.length == 0){				
				$("#iDiv_noDataPop").css("display","block");											
			}else{
					
				for(i=0;i<data.reqList.length;i++){
				    list.push({						  
						 no: data.reqList[i].storageUseReqNo
						,ymd: data.reqList[i].chkYmd  
						,custCode: data.reqList[i].custCode 
						,custName: data.reqList[i].custName
						//,claimType: data.whItemList[i].claimType
						,orderGroupId: data.reqList[i].orderGroupId 
						,makerName: data.reqList[i].makerCode +'-'+data.reqList[i].makerName
						,itemId: data.reqList[i].itemId 
						,itemNo: data.reqList[i].itemNo 
						,itemName: data.reqList[i].itemName
						,cnt: data.reqList[i].cnt
						,unitPrice: data.reqList[i].unitPrice 
						,sumPrice: data.reqList[i].cnt * data.reqList[i].unitPrice
						,memo1: data.reqList[i].memo1 
						
						,className: data.reqList[i].className 
						,factoryNo: data.reqList[i].factoryNo 
					});
				}		
				AUIGrid.setGridData("#grid_wrap_su", list);
			}
		},
		error:function(x,e){
			 setStopSpinner();
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
	
//order	
function findDataToServer_od(url) {
	
    AUIGrid.clearGridData(myGridID_od);
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	setStartSpinner();
	
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemId = $("#itemId").val();
	var itemNo = $("#itemNo").val();
	
	if ((!itemId || itemId.trim() == '' || itemId==0 ) && (!itemNo || itemNo.trim() == '') ) {
		  setStopSpinner();
	      //alert("부품ID 또는 품명을 입력하세요.");
	      $("#iDiv_noSrchPop").text("ⓘ 부품ID 또는 품번을 입력하고 조회하세요");
	      $("#iDiv_noSrchPop").css("display","block");
	      return false;
	   }
	var workingType = "WORK_LIST";
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType
			,"sYmd":sYmd
			,"eYmd":eYmd
			,"ymdIgnoreYN":ymdIgnoreYN
			,"itemId":itemId
			,"itemNo":itemNo
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			setStopSpinner();
			if (data.orderItemList.length == 0){				
				$("#iDiv_noDataPop").css("display","block");											
			}else{
					
				for(i=0;i<data.orderItemList.length;i++){
				    list.push({						  
						 no: data.orderItemList[i].orderNo
						,ymd: data.orderItemList[i].orderYmd  
						,custCode: data.orderItemList[i].custCode 
						,custName: data.orderItemList[i].custName
						//,claimType: data.whItemList[i].claimType
						,orderGroupId: data.orderItemList[i].orderGroupId 
						,makerName: data.orderItemList[i].makerCode +'-'+data.orderItemList[i].makerName
						,itemId: data.orderItemList[i].itemId 
						,itemNo: data.orderItemList[i].itemNo 
						,itemName: data.orderItemList[i].itemName
						,cnt: data.orderItemList[i].cnt
						,unitPrice: data.orderItemList[i].salePrice 
						,sumPrice: data.orderItemList[i].cnt * data.orderItemList[i].salePrice
						,memo1: data.orderItemList[i].memo1 
						
						,className: data.orderItemList[i].className 
						,factoryNo: data.orderItemList[i].factoryNo 
					});
				}		
				AUIGrid.setGridData("#grid_wrap_od", list);
			}
		},
		error:function(x,e){
			 setStopSpinner();
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

//estimate	
function findDataToServer_et(url) {
	
    AUIGrid.clearGridData(myGridID_et);
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	setStartSpinner();
	
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var itemId = $("#itemId").val();
	var itemNo = $("#itemNo").val();
	
	if ((!itemId || itemId.trim() == '' || itemId==0 ) && (!itemNo || itemNo.trim() == '') ) {
		  setStopSpinner();
	      //alert("부품ID 또는 품명을 입력하세요.");
	      $("#iDiv_noSrchPop").text("ⓘ 부품ID 또는 품번을 입력하고 조회하세요");
	      $("#iDiv_noSrchPop").css("display","block");
	      return false;
	}
	
	//2024.03.06 hsg
	if (itemId.trim() == '') {
		itemId= 0;
	}
	   
	var workingType = "WORK_LIST";
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType
			,"sYmd":sYmd
			,"eYmd":eYmd
			,"ymdIgnoreYN":ymdIgnoreYN
			,"itemId":itemId
			,"itemNo":itemNo
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			setStopSpinner();
			if (data.estiItemList.length == 0){				
				$("#iDiv_noDataPop").css("display","block");											
			}else{
					
				for(i=0;i<data.estiItemList.length;i++){
				    list.push({						  
						 no: data.estiItemList[i].estiNo
						,ymd: data.estiItemList[i].estiYmd  
						,custCode: data.estiItemList[i].custCode 
						,custName: data.estiItemList[i].custName
						//,claimType: data.whItemList[i].claimType
						,orderGroupId: data.estiItemList[i].orderGroupId 
						,makerName: data.estiItemList[i].makerCode +'-'+data.estiItemList[i].makerName
						,itemId: data.estiItemList[i].itemId 
						,itemNo: data.estiItemList[i].itemNo 
						,itemName: data.estiItemList[i].itemName
						,cnt: data.estiItemList[i].cnt
						,unitPrice: data.estiItemList[i].salePrice 
						,sumPrice: data.estiItemList[i].cnt * data.estiItemList[i].salePrice
						,memo1: data.estiItemList[i].memo1 
						
						,className: data.estiItemList[i].className 
						,factoryNo: data.estiItemList[i].factoryNo
					});
				}		
				AUIGrid.setGridData("#grid_wrap_et", list);
			}
		},
		error:function(x,e){
			 setStopSpinner();
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

	