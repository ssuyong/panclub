
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
			  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var custCode = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var mainYN = info[4];
        
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof mainYN == 'undefined'){ mainYN = ''	}
	
        //console.log("sYmd:"+sYmd);
        $("#custCode").val(custCode);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		if (mainYN === "Y") {
		    $('#mainYN').prop('checked', true);
		  } else {
		    $('#mainYN').prop('checked', false);
		  }
		
        findDataToServer("/biz/transaction-list",page);
  	}
  	
  	$("#btnPrint").click(function() {	
	 print();	
	});
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var custCode_val = $("#custCode").val();
		var mainYN_val = ($('#mainYN').is(':checked') ? "Y" : "N");
		
		document.location.hash = '#info'+currentPage+"!"+custCode_val+"!"+sYmd+"!"+eYmd+"!"+mainYN_val ;
		 findDataToServer("/biz/transaction-list",page);
		//findDataToServer("/biz/cust-ledg", 1);
		// findCustMst('/base/cust-list');
	});
	
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	
// 칼럼 레이아웃 작성
/*
var columnLayout = [ 
	 { dataField : "stdYmd",    headerText : "일자", width : 140} 
	,{ dataField : "summary",    headerText : "적요", width : 140} 
	,{ dataField : "rlAmt",   headerText : "출고", width: 140, dataType: "numeric" , formatString: "#,##0", style: "right"  } 
	,{ dataField : "depositAmt",     headerText : "입금", width : 140, dataType: "numeric", formatString: "#,##0", style: "right"        }
	,{ dataField : "dpDcAmt",     headerText : "입금할인", width : 140 , dataType: "numeric", formatString: "#,##0", style: "right"    }
	,{ dataField : "whAmt",   headerText : "입고", width : 140, dataType: "numeric", formatString: "#,##0", style: "right"    }
	,{ dataField : "wdAmt",   headerText : "출금" , width : 140, dataType: "numeric", formatString: "#,##0", style: "right"    }
	,{ dataField : "wdDcAmt",   headerText : "출금할인",  width : 140,dataType: "numeric", formatString: "#,##0", style: "right"    }
	,{ dataField : "balanceAmt",      headerText : "잔액"  , width : 140, dataType: "numeric", formatString: "#,##0", style: "right"     }
];*/
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{  headerText : "기본정보", 
		children: [
			{ dataField: "stdYmd",        headerText: "일자"      , width: 86 , editable: false  },
			//{ dataField: "stdYmd",        headerText: "거래처출고일자"      , width: 120 , editable: false  },
			{ dataField: "ledgType",        headerText: "구분"      , width: 60 , visible: false}, 		
			{ dataField: "ledgCateg",        headerText: "구분"      , width: 68   },
			{ dataField: "custCode",        headerText: "거래처코드"      , width: 120 , visible: false  }, 
			{ dataField: "custName",        headerText: "거래처명"      , width: 120 , style : "left"}, 
        	{ dataField: "summary2",      headerText: "적요" ,      width: 120  , editable: false    
        	 		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},    
        	{ dataField: "summary",      headerText: "적요" ,      width: 86  , editable: false ,visible: false},    
        	{ dataField: "seq",      headerText: "순번" ,      width: 40  , editable: false},        		 	     	
        ]
    },   
     {  headerText : "부품", 
		children: [
			{ dataField : "className",      headerText : "구분", width : 80, editable : false },
			{ dataField: "itemId",        headerText: "부품ID"  , width : 86,editable: false    },
			{ dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    },
        	{ dataField: "itemNo",         headerText: "부품번호", width : 120, editable: false },
        	{ dataField: "factoryNo", headerText: "공장품번", width: 120 },
        	{ dataField: "itemName",         headerText: "부품명", width : 140, editable: false   , style : "left" },
        ]
    },
			{ dataField: "cnt",        headerText: "수량"  , width : 40, dataType: "numeric", formatString: "#,##0", style: "right", editable: false    },
        	{ dataField: "centerPrice",         headerText: "표준단가", width : 86, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false },
        	{ dataField: "unitPrice",         headerText: "단가", width : 86, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false },
        	{ dataField: "sumPrice",         headerText: "공급가액", width : 86, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false   },
        	{ dataField: "taxPrice",         headerText: "세액", width : 86, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false   },
        	{ dataField: "sumPriceTax",      headerText: "합계금액", width : 86, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false }  ,
        	{ dataField: "withdrawStatus",      headerText: "출금상태", width : 86,editable: false }  ,
        	{ dataField: "custOrderNo",      headerText: "거래처주문번호", width : 100, editable: false }  ,
        	{ dataField: "memo",      headerText: "비고", width : 140, editable: false, style : "left" }  ,
        	{ dataField: "orderGroupId",      headerText: "주문그룹ID", width : 86, editable: false
        	, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }  ,
        	{ dataField: "rcvCustCode",      headerText: "주문처", width : 120, editable: false, style : "left" }  ,
        	//{ dataField: "clType",      headerText: "일반/보험", width : 60, editable: false }  ,
        	//{ dataField: "carType",      headerText: "차종", width : 60, editable: false }  , 	
        	{ dataField: "carNo",      headerText: "차량번호", width : 68, editable: false }  ,
        	{ dataField: "userName",      headerText: "작성자", width : 80, editable: false }  ,
			{ dataField: "mainCustCode",        headerText: "대표거래처코드"      , width: 120  } 	,
			{ dataField: "mainCustName",        headerText: "대표거래처명"      , width: 120 } 	
    
    
    
];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	// 푸터 설정
	var footerLayout = [{
		labelText: "누계",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {
		dataField: "cnt",
		positionField: "cnt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "sumPrice",
		positionField: "sumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "taxPrice",
		positionField: "taxPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
		//,labelFunction: function (value, columnValues, footerValues) {  //2024.06.13 sg. 공급가액합계*0.1=부가세->2024.06.26 주석처리
		//	var newValue = footerValues[2]*0.1;
		//	return newValue;
		//}
	}, {
		dataField: "sumPriceTax",
		positionField: "sumPriceTax",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
		//,labelFunction: function (value, columnValues, footerValues) {  //2024.06.13 sg. 합계금액 = 공급가액합계+(공급가액합계*0.1)->2024.06.26 주석처리
		//	var newValue = footerValues[2] + footerValues[3];
		//	return newValue;
		//}
	}, {
		dataField: "wdAmt",
		positionField: "wdAmt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "wdDcAmt",
		positionField: "wdDcAmt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}
	
	];
	
	var auiGridProps = {			
			//editable : true,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			//footer 노출
			showFooter: true,
			
			// 필터 사용
			// enableFilter: true,
			
			// 그룹핑 패널 사용
			useGroupingPanel: false,
			
			// 차례로 country, product, name 순으로 그룹핑을 합니다.
			// 즉, 각 나라별, 각 제품을 구매한 사용자로 그룹핑			
			
			// 그룹핑 후 셀 병합 실행
			enableCellMerge: true,
			// enableCellMerge 할 때 실제로 rowspan 적용 시킬지 여부
			// 만약 false 설정하면 실제 병합은 하지 않고(rowspan 적용 시키지 않고) 최상단에 값만 출력 시킵니다.
			cellMergeRowSpan: true,

			// 브랜치에 해당되는 행을 출력 여부
			showBranchOnGrouping: false,
			
			// 최초 보여질 때 모두 열린 상태로 출력 여부
			displayTreeOpen: true,
			showAutoNoDataMessage : false, 
			
			// addcheckbox  2023.06.29 bk
			showRowCheckColumn: false,
	
			// 엑스트라 체크박스 표시 설정
			showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			showRowAllCheckBox: true,
				
			
			// 그리드 ROW 스타일 함수 정의
			rowStyleFunction: function (rowIndex, item) {

				if (item._$isGroupSumField) { // 그룹핑으로 만들어진 합계 필드인지 여부

					// 그룹핑을 더 많은 필드로 하여 depth 가 많아진 경우는 그에 맞게 스타일을 정의하십시오.
					// 현재 3개의 스타일이 기본으로 정의됨.(AUIGrid_style.css)
					switch (item._$depth) {  // 계층형의 depth 비교 연산
						case 2:
							return "aui-grid-row-depth3-style";
						case 3:
							return "aui-grid-row-depth2-style";
						case 4:
							return "aui-grid-row-depth3-style";
						default:
							return "aui-grid-row-depth-default-style";
					}
				}

				return null;
			} // end of rowStyleFunction
		
			
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
	
	var rowPos = 'first';
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);

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
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		//console.log("columnIndex:"+event.columnIndex);  
		if (event.columnIndex == 5) {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var summary = event.item.summary;
			var ledgType = event.item.ledgType;
			var pageMoveYN = "Y";	
			//console.log ("summary" +summary);	
			//console.log ("ledgCateg" +ledgCateg);	
			//return;
				//window.location.href = '/logis/rl-item-list?rlNo=' ;
			if (ledgType == '출고') {   
				$.fancybox.open({
				  href : '/logis/rl-item-list?rlNo='+summary+ "&pageMoveYN=" + pageMoveYN, // 불러 올 주소
				  type : 'iframe',
				  width : '90%',
				  height : '90%',
				  padding :0,
				  fitToView: false,
				  autoSize : false,
				  modal :true
				});
			}	
			if (ledgType == '입고') {   
				$.fancybox.open({
				  href : '/logis/wh-item-list?whNo='+summary+ "&pageMoveYN=" + pageMoveYN    , // 불러 올 주소
				  type : 'iframe',
				  width : '90%',
				  height : '90%',
				  padding :0,
				  fitToView: false,
				  autoSize : false,
				  modal :true
					});					
				}	
				if (ledgType == '출고(반입)') {   
				$.fancybox.open({
				  href : '/logis/ri-item-list?riNo='+summary+ "&pageMoveYN=" + pageMoveYN    , // 불러 올 주소
				  type : 'iframe',
				  width : '90%',
				  height : '90%',
				  padding :0,
				  fitToView: false,
				  autoSize : false,
				  modal :true
				});					
			}	
			if (ledgType == '입고(반출)') {   
				$.fancybox.open({
				  href : '/logis/ro-item-list?roNo='+summary+ "&pageMoveYN=" + pageMoveYN    , // 불러 올 주소
				  type : 'iframe',
				  width : '90%',
				  height : '90%',
				  padding :0,
				  fitToView: false,
				  autoSize : false,
				  modal :true
				});					
			}	
			if (ledgType == '입고(운송비)'){
		let f = document.createElement('form');	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'placeNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/place-up');
		    document.body.appendChild(f);
		    f.submit();
			}
		}  
			if (event.columnIndex == 18) {   
			//주문그룹 이동 0829
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var summary = event.item.summary;
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

	var custCode = $("#custCode").val(); 
	var clType = $("#clType").val(); 
	var ledgType = $("#ledgType").val(); 

	

	/*
	if (spaceDel(custCode)=='' ) {
		alert("거래처를 입력하세요.");
		return false;
	}*/
	
	var placeYmdYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=placeYmdYN]').is(':checked') == true){
		placeYmdYN = "Y";
	} //placeRIYmd as reference date 20230630 bk 	
	var custOrderNo = $("#custOrderNo").val(); 
	var itemId = $("#itemId").val(); 
	var itemNo = $("#itemNo").val(); 
	var orderGroupId = $("#orderGroupId").val(); 
	var carNo = $("#carNo").val(); 
	var withdrawStatus= $("#withdrawStatus").val(); 
	
	var mainYN =   "N";
	if ($('input:checkbox[name=mainYN]').is(':checked') == true){
		mainYN = "Y";
	} //main custCode ; 
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"custCode":custCode,
			"clType":clType,
			"ledgType":ledgType,
			"placeYmdYN": placeYmdYN, 
			"workingType":"WHLIST",
			"custOrderNo": custOrderNo, 
			"itemId": itemId,
			"itemNo": itemNo,
			"orderGroupId": orderGroupId,
			"carNo": carNo,
			"withdrawStatus": withdrawStatus,
			"mainYN" : mainYN
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.transactionList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				for(i=0;i<data.transactionList.length;i++){
					list.push({
						 stdYmd: data.transactionList[i].stdYmd 
						,summary: data.transactionList[i].summary 
						,custCode: data.transactionList[i].custCode 
						,ledgType: data.transactionList[i].ledgType
						,custName: data.transactionList[i].custName 
						,regYmd: data.transactionList[i].regYmd 
						,regHms: data.transactionList[i].regHms 
						,seq: data.transactionList[i].seq 
						,cnt: data.transactionList[i].cnt
						,unitPrice: data.transactionList[i].unitPrice
						,sumPrice: data.transactionList[i].sumPrice
						,taxPrice: data.transactionList[i].taxPrice
						,sumPriceTax: data.transactionList[i].sumPriceTax
						,itemId: data.transactionList[i].itemId
						,itemNo: data.transactionList[i].itemNo
						,itemName: data.transactionList[i].itemName
						,memo: data.transactionList[i].memo
						,carNo: data.transactionList[i].carNo
						,carType: data.transactionList[i].makerCode + data.transactionList[i].carType
						,orderGroupId: data.transactionList[i].orderGroupId
						,clType: data.transactionList[i].clType
						,regUserId: data.transactionList[i].regUserId
						,userName: data.transactionList[i].userName
						,custOrderNo: data.transactionList[i].custOrderNo
						,ledgCateg: data.transactionList[i].ledgType
						,rcvCustCode: data.transactionList[i].rcvCustCode
						,centerPrice: data.transactionList[i].centerPrice
						,withdrawStatus: data.transactionList[i].withdrawStatus
						,makerCode: data.transactionList[i].makerCode
						
						,summary2: data.transactionList[i].summary2 // 240116 yoonsang 추가
						,mainCustCode: data.transactionList[i].mainCustCode // 240805 yoonsang 추가
						,mainCustName: data.transactionList[i].mainCustName // 240805 yoonsang 추가
						
						,makerName: data.transactionList[i].makerName
						,className: data.transactionList[i].className
						,factoryNo: data.transactionList[i].factoryNo
						
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



//프린트
//인쇄버튼 클릭 
$("#print").click(function() {
	var  custCode = $("#custCode").val();
	//var printMemoYN = "";
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var printType = $(':radio[name="printType"]:checked').val();
	
	window.location.href = "/biz/cust-ledge-print?custCode="+custCode+"&sYmd="+sYmd+"&eYmd="+eYmd+"&printType="+printType;
	
});
//품목내역 인쇄 클릭 
$("#printDtl").click(function() {
	var  custCode = $("#custCode").val();
	//var printMemoYN = "";
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var printType = $(':radio[name="printType"]:checked').val();
	
	window.location.href = "/biz/cust-ledge-dtl-print?custCode="+custCode+"&sYmd="+sYmd+"&eYmd="+eYmd+"&printType="+printType;
	
});


//이미지 다운로드 버튼 클릭
$("#btnDownload").click(function() {
	var  custCode = $("#custCode").val();
	var imgYN = "Y";	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var printType = $(':radio[name="printType"]:checked').val();
	
	window.location.href = "/biz/cust-ledge-print?custCode="+custCode+"&sYmd="+sYmd
														+"&eYmd="+eYmd+"&printType="+printType+"&imgYN="+imgYN;
	
});


function print() {
	
	var dialogPrint;
	dialogPrint = $( "#dialogPrint-form" ).dialog({
	    autoOpen: false,
	    height: 300,
	    //minWidth: 500,
	    width: "30%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser, */
	         "닫기": function() {
	        	 dialogPrint.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      //$( "#batchFile" ).val("");	   	
	    }
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogPrint.dialog( "open" );
}

//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj, name) {

	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
	rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;

	//console.log("row1:"+rowItem.itemNo);
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	$(obj).val(rowItem.custCode);
	$("#" + name + "").val(rowItem.custName);

	var dialogCust;
	dialogCust = $("#dialog-form-cust");
	dialogCust.dialog("close");

}	

//wdReqadd 2023.06.29


function wdReq(){
 
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("출금요청할 입고를 선택하세요!");
		return;
	}

	var rowItem;
	var jobArr = ""
	var sumPrice = 0;
	var custCode = "";
	var custName = "";
	var mainCustCode = "";
	var mainCustName = "";
	
	var errCnt = 0;
	var errCnt2 = 0;  
	var custArr = [];
	var j = 1
	var errCustName = "";
	var inArr = "Y";  // 배열등록대상
	
	var ledgArr = ""
	var seqArr = ""

	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		jobArr = jobArr + "^" +rowItem.item.summary;
		sumPrice = sumPrice + rowItem.item.sumPriceTax;	
		ledgArr = ledgArr+ "^" +rowItem.item.ledgType; //ledgetypecateg 
		seqArr = seqArr+ "^" +rowItem.item.seq; //
		if (i==0){
			custCode = rowItem.item.custCode;
			custName = rowItem.item.custName;
			mainCustCode = rowItem.item.mainCustCode;
			mainCustName = rowItem.item.mainCustName;
			custArr[0] = custName;
		}
			inArr = "Y"
			//if (custCode != rowItem.item.custCode ) {				//240805 yoonsang 대표거래처코드로 비교
			if (mainCustCode != rowItem.item.mainCustCode ) {	
			errCustName = rowItem.item.custName;
			errCnt2 = errCnt2 + 1;
  			for (var k=0, len2 = custArr.length; k < len2; k++) {
				//console.log("cusArr:"+custArr[k] + "--" + errCustName);
				if ( custArr[k] == errCustName) 	{
					inArr = 'N';
				}	
			}
			if  (inArr == 'Y') {
				custArr[j] = errCustName; 
				j = j + 1;
			}
		}		
		 if (rowItem.item.ledgType == '출고'|| rowItem.item.ledgType === '출고(반입)') {
        errCnt = errCnt + 1;
    	}
	}
			
	sumPrice = Math.round(sumPrice); //소수점 반올림처리 2023.07.26 bk
	
	if (errCnt2 > 0) {
		
		errCustNameArr="";
		for (var l=0, len3 = custArr.length; l < len3; l++) {
			errCustNameArr = errCustNameArr + "/"+custArr[l];
		}
		alert("발주처가 다른 경우 출금요청을 할 수 없습니다!!\n\n선택된 발주처: "+errCustNameArr);
		return;
		
	}
	
	if (errCnt > 0) {
		alert("출고는 출금요청을 할 수 없습니다!!")
		return;}
		
	// console.log("seqArr:"+seqArr);
	/*
	$.fancybox.open({
	  href : '/biz/wd-req-up?wdReqType=입고출금&custCode='+custCode+'&custName='+encodeURIComponent(custName)+'&sumPrice='+sumPrice
	  				+'&jobArr='+encodeURIComponent(jobArr) +'&ledgArr='+encodeURIComponent(ledgArr)+'&seqArr='+encodeURIComponent(seqArr)  , // 불러 올 주소
	  type : 'iframe',
	  width : '60%',
	  height : '60%',
	  padding :0,
	  fitToView: false,
	  autoSize : false,
	  modal :true
	});
	*/
	window.open('','frmList','menubar = yes,scrollbars=yes,toolbar=yes,resizable=yes,width=1200,height=300,left=150,top=150');
	var fm = document.createElement("form");
	fm.name = "frmLink";
	fm.method = "POST";
	fm.action = "/biz/wd-req-up";
	fm.target = "frmList";
	
	var input1 = document.createElement("input");
	input1.type = "hidden";
	input1.name = "wdReqType";
	input1.value =  "입고출금";
	fm.insertBefore(input1,null);

	var input2 = document.createElement("input");
	input2.type = "hidden";
	input2.name = "custCode";
	//input2.value =  custCode;
	input2.value =  mainCustCode;
	fm.insertBefore(input2,null);

	var input3 = document.createElement("input");
	input3.type = "hidden";
	input3.name = "custName";
	//input3.value =  custName;
	input3.value =  mainCustName;
	fm.insertBefore(input3,null);
	
	var input4 = document.createElement("input");
	input4.type = "hidden";
	input4.name = "sumPrice";
	input4.value =  sumPrice;
	fm.insertBefore(input4,null);
	
	var input5 = document.createElement("input");
	input5.type = "hidden";
	input5.name = "jobArr";
	input5.value =  jobArr;
	fm.insertBefore(input5,null);
	
	var input6 = document.createElement("input");
	input6.type = "hidden";
	input6.name = "ledgArr";
	input6.value =  ledgArr;
	fm.insertBefore(input6,null);
	
	var input7 = document.createElement("input");
	input7.type = "hidden";
	input7.name = "seqArr";
	input7.value =  seqArr;
	fm.insertBefore(input7,null);
	
	
	
	

    document.body.insertBefore(fm,null);
    fm.submit();
}  


