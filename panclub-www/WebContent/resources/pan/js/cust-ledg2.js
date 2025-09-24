
/* Begin : Date Picker Date Range*/
var today = new Date();
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
var firstDay = new Date(today); //2023.08.24 bk
firstDay.setDate(1); //2023.08.24 bk
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        //date: today,
        date: firstDay, //2023.08.24 bk
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
		
        findDataToServer("/biz/cust-ledg2",page);
        findCustMst('/base/cust-list');
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
		var mainYN_val =   "N";
			if ($('input:checkbox[name=mainYN]').is(':checked') == true){
				mainYN_val = "Y";
			} //main custCode ; 
					
		document.location.hash = '#info'+currentPage+"!"+custCode_val+"!"+sYmd+"!"+eYmd+"!"+mainYN_val;
		
		findDataToServer("/biz/cust-ledg2", 1);
		 //findCustMst('/base/cust-list');
		 	if (custCode_val !='') {
			findCustMst('/base/cust-list');
		} //2023.06.30 bk
		 
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
			{ dataField: "stdYearMonth",        headerText: "연월"      , width: 140 , editable: false  },
			{ dataField: "stdYmd",        headerText: "일자"      , width: 140 , editable: false  },
			{ dataField: "ledgType",        headerText: "타입"      , width: 140 , visible: false },
			{ dataField: "ledgCateg",        headerText: "타입"      , width: 140 , visible: false  },
        	{ dataField: "summary",      headerText: "적요" ,      width: 140  , editable: false    
        	 		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},      	     	
        ]
    },    
    {  headerText : "매출", 
		children: [
			{ dataField: "rlAmt",        headerText: "출고"  , width : 140, dataType: "numeric", formatString: "#,##0", style: "right", editable: false    },
        	{ dataField: "depositAmt",         headerText: "입금", width : 140, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false },
        	{ dataField: "dpDcAmt",         headerText: "입금할인", width : 140, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false   },
        	{ dataField: "creditAmt",      headerText: "외상매출금 잔액", width : 140, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false }
        ]
    },
    {  headerText : "매입", 
		children: [
			{ dataField: "whAmt",        headerText: "입고" , width : 140, dataType: "numeric", formatString: "#,##0", style: "right", editable: false   },
        	{ dataField: "wdAmt",         headerText: "출금", width : 140, dataType: "numeric", formatString: "#,##0", style: "right", editable: false  },
        	{ dataField: "wdDcAmt",      headerText: "출금할인", width : 140, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false   },
        	{ dataField: "payableAmt",      headerText: "외상매입금 잔액" , width : 140, dataType: "numeric", formatString: "#,##0", style: "right", editable: false      }
        ]
    },
    {  headerText : "기말잔액", 
		children: [
			{ dataField: "balanceAmt",        headerText: "잔액"  , width : 140, dataType: "numeric", formatString: "#,##0", style: "right"  , editable: false   },
        ]
    }
];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	// 푸터 설정
	var footerLayout = [{
		labelText: "누계",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {
		dataField: "rlAmt",
		positionField: "rlAmt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "depositAmt",
		positionField: "depositAmt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "dpDcAmt",
		positionField: "dpDcAmt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "whAmt",
		positionField: "whAmt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
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
	, {
		dataField: "creditAmt",
		positionField: "creditAmt",
		expFunction: function (columnValues) {
			 return columnValues[columnValues.length - 1];  },
		formatString: "#,##0"
		,style: "right"
	}
	, {
		dataField: "payableAmt",
		positionField: "payableAmt",
		expFunction: function (columnValues) {
			 return columnValues[columnValues.length - 1];  },
		formatString: "#,##0"
		,style: "right"
	}
	, {
		dataField: "balanceAmt",
		positionField: "balanceAmt",
		expFunction: function (columnValues) {
			 return columnValues[columnValues.length - 1];  },
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
			pageRowCount: 100,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			//footer 노출
			showFooter: true,
			
			// 필터 사용
			// enableFilter: true,
			
			// 그룹핑 패널 사용
			useGroupingPanel: false,
			showAutoNoDataMessage : false, 
			
			// 차례로 country, product, name 순으로 그룹핑을 합니다.
			// 즉, 각 나라별, 각 제품을 구매한 사용자로 그룹핑
			groupingFields: ["stdYearMonth"],
			
				// 합계(소계) 설정
			groupingSummary: {
				// 합계 필드는 price 1개에 대하여 실시 합니다.
				dataFields: ["rlAmt", "depositAmt", "dpDcAmt","whAmt","wdAmt", "wdDcAmt","creditAmt","balanceAmt","payableAmt"],
			
			// 그룹핑 썸머리 행의 구체적 설정
				rows: [{
					// 사용자 정의 계산 함수
					// items (Array) : 소계의 대상이 되는 행들
					// dataField (String) : 소계 대상 필드 (데모 상에서는 "price", "color", "date" 가 대상임)
					expFunction: function (items, dataField) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
						var sum = 0;
						//var count = 0;
						if (items.length <= 0) return sum;

						// 합계 필드 3개 설정했기에 3개를 나눠서 실행
						switch (dataField) {
							case "rlAmt": // 합계 계산
								items.forEach(function (item) {
									sum += Number(item.rlAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");
							case "depositAmt": // 합계 계산
								items.forEach(function (item) {
									sum += Number(item.depositAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");
							case "dpDcAmt": // 합계 계산
								items.forEach(function (item) {
									sum += Number(item.dpDcAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");	
							case "whAmt": // 합계 계산
								items.forEach(function (item) {
									sum += Number(item.whAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");	
							case "wdAmt": // 합계 계산
								items.forEach(function (item) {
									sum += Number(item.wdAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");	
							case "wdDcAmt": // 합계 계산
								items.forEach(function (item) {
									sum += Number(item.wdDcAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");		
							
							
							case "creditAmt": // 합계 계산
								items.forEach(function (item) {
									sum = Number(item.creditAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");
								
							case "payableAmt": // 합계 계산
								items.forEach(function (item) {
									sum = Number(item.payableAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");
						
							case "balanceAmt": // 합계 계산
								items.forEach(function (item) {
									sum = Number(item.balanceAmt);
								});
								return AUIGrid.formatNumber(sum, "#,##0");		
							
						}
					}
				}],


			},
				
			
			// 그룹핑 후 셀 병합 실행
			enableCellMerge: true,
			// enableCellMerge 할 때 실제로 rowspan 적용 시킬지 여부
			// 만약 false 설정하면 실제 병합은 하지 않고(rowspan 적용 시키지 않고) 최상단에 값만 출력 시킵니다.
			cellMergeRowSpan: true,

			// 브랜치에 해당되는 행을 출력 여부
			showBranchOnGrouping: false,
			
			// 최초 보여질 때 모두 열린 상태로 출력 여부
			displayTreeOpen: true,
			
				
			
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
		if (event.columnIndex == 4) {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var summary = event.item.summary;
			var ledgCateg = event.item.ledgCateg;
			var pageMoveYN = "Y";	//페이지 이동여부
			//console.log ("summary" +summary);	
			//console.log ("ledgCateg" +ledgCateg);	
			//return;
				//window.location.href = '/logis/rl-item-list?rlNo=' ;
			if (ledgCateg == '출고') {   
				$.fancybox.open({
				  href : '/logis/rl-item-list?rlNo='+summary+'&claimType='+'일반'+ "&pageMoveYN=" + pageMoveYN, // 불러 올 주소
				  type : 'iframe',
				  width : '90%',
				  height : '90%',
				  padding :0,
				  fitToView: false,
				  autoSize : false,
				  modal :true
				});
			}	
			if (ledgCateg == '입고') {   
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
				if (ledgCateg == '반입') {   
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
			if (ledgCateg == '반출') {   
				$.fancybox.open({
				  href : '/logis/ro-item-list?roNo='+summary + "&pageMoveYN=" + pageMoveYN   , // 불러 올 주소
				  type : 'iframe',
				  width : '90%',
				  height : '90%',
				  padding :0,
				  fitToView: false,
				  autoSize : false,
				  modal :true
				});					
			}	
		if (ledgCateg == '운송비'){
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
	
	if (spaceDel(custCode)=='' ) {
		alert("거래처를 입력하세요.");
		return false;
	}
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
			"mainYN":mainYN
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.custLedgList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				location.href;	
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				for(i=0;i<data.custLedgList.length;i++){
					list.push({
						 stdYmd: data.custLedgList[i].stdYmd 
						,summary: data.custLedgList[i].summary 
						,rlAmt: data.custLedgList[i].rlAmt 
						,depositAmt: data.custLedgList[i].depositAmt
						,dpDcAmt: data.custLedgList[i].dpDcAmt 
						,whAmt: data.custLedgList[i].whAmt 
						,wdAmt: data.custLedgList[i].wdAmt 
						,wdDcAmt: data.custLedgList[i].wdDcAmt 
						,balanceAmt: data.custLedgList[i].balanceAmt
						,creditAmt: data.custLedgList[i].creditAmt
						,payableAmt: data.custLedgList[i].payableAmt
						,ledgType: data.custLedgList[i].ledgType
						,stdYearMonth: data.custLedgList[i].stdYearMonth
						,ledgCateg: data.custLedgList[i].ledgCateg
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

function findCustMst(url) {
    //console.log("custfind in");
	var custCode = $("#custCode").val();
    //console.log("cust:"+custCode);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"custCode":custCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.custList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{				
				for(i=0;i<data.custList.length;i++){
					//	console.log("ffffffffff" + data.custList[i].centerYN);
					
				    custType = data.custList[i].custType; 
					custCode = data.custList[i].custCode; 
					formalName = data.custList[i].formalName; 
					custName = data.custList[i].custName;
					bizNo = data.custList[i].bizNo; 
					ceoName = data.custList[i].ceoName; 
					custAddress1 = data.custList[i].custAddress1; 
					custAddress2 = data.custList[i].custAddress2; 
					phone = data.custList[i].phone; 
					fax = data.custList[i].fax; 
					admGroupCode = data.custList[i].admGroupCode; 
					admEmpName = data.custList[i].admEmpName; 
					bzType = data.custList[i].bzType; 
					bzItem = data.custList[i].bzItem; 
					releasePriceType = data.custList[i].releasePriceType; 
					bzItems = data.custList[i].bzItems; 
					warehousePriceType = data.custList[i].warehousePriceType; 
					taxType = data.custList[i].taxType; 
					taxEmail  = data.custList[i].taxEmail; 
					cashType = data.custList[i].cashType; 
					releaseLimit = data.custList[i].releaseLimit; 
					outsideCode = data.custList[i].outsideCode; 
					regUserName = data.custList[i].regUserName; 
					created = data.custList[i].created; 
					uptUserName = data.custList[i].uptUserName; 
					modified = data.custList[i].modified;
					memo = data.custList[i].memo;  
					balanceDspType = data.custList[i].balanceDspType;
					admGroupSepName = data.custList[i].admGroupSepName;
					srCustShareRate = data.custList[i].srCustShareRate;
					placeYN= data.custList[i].placeYN;
					supplyYN= data.custList[i].supplyYN;
					payDay= data.custList[i].payDay;		
					payType= data.custList[i].payType;			
					validYN= data.custList[i].validYN;				
					releaseLimit= data.custList[i].releaseLimit;				
					depositLimitDay= data.custList[i].depositLimitDay;	
					taxMobile= data.custList[i].taxMobile;	
					accNum = data.custList[i].accNum;
					centerYN = data.custList[i].centerYN;
					
					//console.log("111111"+data.custList[i].supplyYN)	
					
					 if (data.custList[i].admGroupSepName && data.custList[i].admGroupSepName.indexOf(' ') !== -1){					
					const names =data.custList[i].admGroupSepName.split(' ');
					const sr1 = names[0];
					const sr2 = names[1];					
					//console.log ("sr1 "+sr1)
					$("#sr1").val(sr1)
					$("#sr2").val(sr2)
				} else if (data.custList[i].admGroupSepName){
					 $("#sr1").val(data.custList[i].admGroupSepName);
					 $("#srbox").css("display", "none");
				}
										
					$("#custType").val(custType); 
					$("#custCode2").val(custCode); 
					$("#formalName").val(formalName); 
					$("#custName").val(custName);
					$("#bizNo").val(bizNo); 
					$("#ceoName").val(ceoName); 
					$("#custAddress1").val(custAddress1); 
					$("#phone").val(phone); 
					$("#admGroupCode").val(admGroupCode); 
					$("#admEmpName").val(admEmpName); 
					$("#bzType").val(bzType); 
					$("#bzItem").val(bzItem); 
					$("#releasePriceType").val(releasePriceType); 
					$("#bzItems").val(bzItems); 
					$("#warehousePriceType").val(warehousePriceType); 
					$("#fax").val(fax); 
					$("#taxType").val(taxType); 
					$("#taxEmail").val(taxEmail); 
					$("#cashType").val(cashType); 
					$("#releaseLimit").val(releaseLimit); 
					$("#outsideCode").val(outsideCode); 
					$("#regUserName").val(regUserName); 
					$("#created").val(created); 
					$("#uptUserName").val(uptUserName); 
					$("#modified").val(modified);
					$("#memo").val(memo);
					$("#balanceDspType").val(balanceDspType);  
					$("#admGroupSepName").val(admGroupSepName);  
					$("#srCustShareRate").val(srCustShareRate);  
					$("#custAddress2").val(custAddress2);  
					$("#payDay").val(payDay);  
					$("#accNum").val(accNum);  
					$("#validYN").val(validYN);  
					$("#releaseLimit").val(releaseLimit);  
					$("#depositLimitDay").val(depositLimitDay);  
					$("#taxMobile").val(taxMobile);  
		
		
								
					//거래처코드 비활성화
					$('#custCode2').attr('disabled', true); 
					//등록버튼 비활성화, 수정/삭제 활성화

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

//프린트
//인쇄버튼 클릭 
$("#print").click(function() {
	var  custCode = $("#custCode").val();
	//var printMemoYN = "";
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var printType = $(':radio[name="printType"]:checked').val();
	var mainYN =   "N";
	if ($('input:checkbox[name=mainYN]').is(':checked') == true){
		mainYN = "Y";
	} //main custCode ; 
	
	window.location.href = "/biz/cust-ledge-print?custCode="+custCode+"&sYmd="+sYmd+"&eYmd="+eYmd+"&printType="+printType+"&mainYN="+mainYN;
	
});
//품목내역 인쇄 클릭 
$("#printDtl").click(function() {
	var  custCode = $("#custCode").val();
	//var printMemoYN = "";
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var printType = $(':radio[name="printType"]:checked').val();
	var mainYN =   "N";
	if ($('input:checkbox[name=mainYN]').is(':checked') == true){
		mainYN = "Y";
	} //main custCode ; 
	
	window.location.href = "/biz/cust-ledge-dtl-print?custCode="+custCode+"&sYmd="+sYmd+"&eYmd="+eYmd+"&printType="+printType+"&mainYN="+mainYN;
	
});


//이미지 다운로드 버튼 클릭
$("#btnDownload").click(function() {
	var  custCode = $("#custCode").val();
	var imgYN = "Y";	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var printType = $(':radio[name="printType"]:checked').val();
	var mainYN =   "N";
	if ($('input:checkbox[name=mainYN]').is(':checked') == true){
		mainYN = "Y";
	} //main custCode ; 
	
	window.location.href = "/biz/cust-ledge-print?custCode="+custCode+"&sYmd="+sYmd
														+"&eYmd="+eYmd+"&printType="+printType+"&imgYN="+imgYN+"&mainYN="+mainYN;
	
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
	$(obj).val(rowItem.custCode);
	$("#" + name + "").val(rowItem.custName);

	var dialogCust;
	dialogCust = $("#dialog-form-cust");
	dialogCust.dialog("close");

}

