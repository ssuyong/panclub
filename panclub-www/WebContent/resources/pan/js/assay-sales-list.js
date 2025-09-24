
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
    }
});
/* End : Date Picker Date Range*/

// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){

	//관리지점코드에 셋팅
	branchCodeSelect("/base/code-list")
				  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var custCode_val = ""; //$("#custCode").val(); 
				
		document.location.hash = '#info'+currentPage+"!"+custCode_val+"!"+sYmd+"!"+eYmd;
		
		findDataToServer("/stats/assay-sales-list", 1);
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
	 { dataField : "orderYmd",     headerText : "주문일자", width : 80 }
	,{ dataField : "custCode",     headerText : "거래처코드", width : 80     }
	,{ dataField : "custName",     headerText : "거래처명", width : 100  }
	,{ dataField : "branchCode",     headerText : "관리지점", width : 56  }
	,{ dataField : "carNo",     headerText : "차량번호", width : 80  }
	
	//,{ dataField : "orderGroupId",     headerText : "주문그룹ID", width : 100     }
	, { dataField : "orderGroupId",    headerText : "주문그룹ID", width : 140, cellMerge: true	 ,
		styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	//,{ dataField : "clType",     headerText : "청구요청유형", width : 96     }
	,{ headerText : "주문", 
		children: [
			 { dataField : "orderAmt",      headerText : "주문액" , width : 100     , dataType: "numeric",			formatString: "#,##0"  , style : "right" }
			//,{ dataField : "costAmt",      headerText : "주문원가"  , width : 100 , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			//,{ dataField : "orderProfitAmt",      headerText : "주문이익액" , width : 100     , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			//,{ dataField : "orderProfitRate",      headerText : "주문이익율" , width : 100     , dataType: "numeric",			formatString: "#,##0.#0"  , style : "right" }
			,{ dataField : "expectPlaceAmt",      headerText : "예정발주금액"  , width : 100 , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			,{ dataField : "expectPlaceProfitAmt",      headerText : "예상발주이익액" , width : 100     , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			,{ dataField : "expectPlaceProfitRate",      headerText : "예상발주이익율" , width : 100     , dataType: "numeric",			formatString: "#,##0.#0"  , style : "right" }
		 ]
	 }  
	,{ headerText : "출고(반입반영)", 
		children: [ 
			{ dataField : "rlAmt",      headerText : "출고액" , width : 100     , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			,{ dataField : "rlCostAmt",      headerText : "출고원가"  , width : 100 , dataType: "numeric",			formatString: "#,##0" , style : "right"			,
					styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (item.nonWhPriceChkCnt > 0) {	return "auigrid-color-style-expect";	}	return null;	}  }
			,{ dataField : "rlProfitAmt",      headerText : "출고이익액" , width : 100     , dataType: "numeric",			formatString: "#,##0" , style : "right"  ,
					styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (item.nonWhPriceChkCnt > 0) {	return "auigrid-color-style-expect";	}	return null;	}}
			,{ dataField : "rlProfitRate",      headerText : "출고이익율" , width : 100     , dataType: "numeric",			formatString: "#,##0.#0" , style : "right",
					styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (item.nonWhPriceChkCnt > 0) {	return "auigrid-color-style-expect";	}	return null;	}  }
			,{ dataField : "nonWhPriceChkCnt",      headerText : "입고단가미확인수량" , width : 100     , dataType: "numeric",			 style : "right"  , visible : false}
		 ]
	 }  
	,{ headerText : "청구", 
		children: [
			{ dataField : "clAmt",      headerText : "청구액" , width : 100     , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			,{ dataField : "clCostAmt",      headerText : "청구원가" , width : 100     , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			,{ dataField : "clProfitAmt",      headerText : "청구이익액" , width : 100     , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
			,{ dataField : "clProfitRate",      headerText : "청구이익율" , width : 100     , dataType: "numeric",			formatString: "#,##0.#0"  , style : "right" }
			,{ dataField : "clConfYN",     headerText : "기결여부", width : 100     }
			,{ dataField : "depositAmt",      headerText : "입금액"  , width : 100 , dataType: "numeric",			formatString: "#,##0" , style : "right"  }
		 ]
	 }  
];
 

// 푸터 설정
var footerLayout = [
	 {	labelText: "∑",	positionField: "#base",	style: "aui-grid-my-column"	}
	,{	dataField: "orderAmt",	positionField: "orderAmt",	operation: "SUM",	formatString: "#,###", style : "right"	}
	//,{	dataField: "costAmt",	positionField: "costAmt",	operation: "SUM",	formatString: "#,###"	}
	//,{	dataField: "orderProfitAmt",	positionField: "orderProfitAmt",	operation: "SUM",	formatString: "#,###"	}
	//,{	dataField: "orderProfitRate",	positionField: "orderProfitRate", formatString: "#,###.##"	,
	//		labelFunction: function (value, columnValues, footerValues) {
	//		var newValue = (footerValues[3] / footerValues[1]) * 100.00 ; 
	//		return newValue;
	//	}
	// }
	,{	dataField: "expectPlaceAmt",	positionField: "expectPlaceAmt",	operation: "SUM",	formatString: "#,###"	, style : "right"}
	,{	dataField: "expectPlaceProfitAmt",	positionField: "expectPlaceProfitAmt",	operation: "SUM",	formatString: "#,###", style : "right"	}
	,{	dataField: "expectPlaceProfitRate",	positionField: "expectPlaceProfitRate", formatString: "#,###.##"	, style : "right",
			labelFunction: function (value, columnValues, footerValues) {
			var newValue = (footerValues[3] / footerValues[1]) * 100.00 ; 
			return newValue;
		}
	 }

	,{	dataField: "rlAmt",	positionField: "rlAmt",	operation: "SUM",	formatString: "#,###", style : "right"	}
	,{	dataField: "rlCostAmt",	positionField: "rlCostAmt",	operation: "SUM",	formatString: "#,###"	, style : "right"}
	,{	dataField: "rlProfitAmt",	positionField: "rlProfitAmt",	operation: "SUM",	formatString: "#,###"	, style : "right"}
	,{	dataField: "rlProfitRate",	positionField: "rlProfitRate", formatString: "#,###.##"	, style : "right",
			labelFunction: function (value, columnValues, footerValues) {
			var newValue = (footerValues[7] / footerValues[5]) * 100.00 ; 
			return newValue;
		}
	 }

	,{	dataField: "clAmt",	positionField: "clAmt",	operation: "SUM",	formatString: "#,##0", style : "right"	}
	,{	dataField: "clCostAmt",	positionField: "clCostAmt",	operation: "SUM",	formatString: "#,###"	, style : "right"}
	,{	dataField: "clProfitAmt",	positionField: "clProfitAmt",	operation: "SUM",	formatString: "#,###"	, style : "right"}
	,{	dataField: "clProfitRate",	positionField: "clProfitRate", formatString: "#,###.##", style : "right"	,
			labelFunction: function (value, columnValues, footerValues) {
			var newValue = (footerValues[11] / footerValues[9]) * 100.00 ; 
			return newValue;
		}
	 }

	,{	dataField: "depositAmt",	positionField: "depositAmt",	operation: "SUM",	formatString: "#,###"	, style : "right"}
	

	
];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			//editable : true,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 1000,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			showAutoNoDataMessage : false,
			// 푸터 보이게 설정
			showFooter : true,
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
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	// 푸터 레이아웃 세팅
   	AUIGrid.setFooter(myGridID, footerLayout);
		
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
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동 2023.07.14 bk
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		//console.log("columnIndex:"+event.columnIndex);  
		if (event.dataField == "orderGroupId") {   
			var orderGroupId = event.item.orderGroupId
			//console.log ("orderGroupId"+orderGroupId);	
			//var url = '/order/order-group-item-list?orderGroupId=' + orderGroupId;
			var url = '/order/order-dtl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			 newWindow.focus();
		}		
	});
		
}


function findDataToServer(url,page) {
	$("#iDiv_noDataPop").css("display","none");
	var list = [];
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var custCode = "";
	var branchCode = "";
	branchCode = $("#branchCode").val();
	var carNo = "";
	carNo = $("#carNo").val();
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType" : "BY_OD",
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"custCode":custCode
			,"branchCode":branchCode
			,"carNo": carNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.assaySalesList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				$("#iDiv_noDataPop").css("display","block");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.assaySalesList.length;i++){
					list.push({
						 orderYmd: data.assaySalesList[i].orderYmd
						,custCode: data.assaySalesList[i].custCode 
						,custName: data.assaySalesList[i].custName 
						,orderGroupId: data.assaySalesList[i].orderGroupId 
						,clType: data.assaySalesList[i].clType						
						//,costAmt: data.assaySalesList[i].costAmt
						,orderAmt: data.assaySalesList[i].orderAmt
						//,orderProfitAmt: data.assaySalesList[i].orderProfitAmt
						//,orderProfitRate: data.assaySalesList[i].orderProfitRate
						,rlAmt: data.assaySalesList[i].rlAmt
						,rlProfitAmt: data.assaySalesList[i].rlProfitAmt
						,rlProfitRate: data.assaySalesList[i].rlProfitRate
						,clAmt: data.assaySalesList[i].clAmt
						,clProfitAmt: data.assaySalesList[i].clProfitAmt
						,clProfitRate: data.assaySalesList[i].clProfitRate
						,depositAmt: data.assaySalesList[i].depositAmt
						,clConfYN: data.assaySalesList[i].clConfYN
						,rlCostAmt: data.assaySalesList[i].rlCostAmt
						,clCostAmt: data.assaySalesList[i].clCostAmt
						,expectPlaceAmt: data.assaySalesList[i].expectPlaceAmt  //2023.08.01 hsg
						,expectPlaceProfitAmt: data.assaySalesList[i].expectPlaceProfitAmt //2023.08.01 hsg
						,expectPlaceProfitRate: data.assaySalesList[i].expectPlaceProfitRate //2023.08.01 hsg
						,nonWhPriceChkCnt: data.assaySalesList[i].nonWhPriceChkCnt //2023.08.09 hsg 
						
						,carNo: data.assaySalesList[i].carNo //2023.10.10 hsg
						,branchCode: data.assaySalesList[i].branchCode //2023.10.10 hsg
						
					});			   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
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
