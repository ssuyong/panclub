
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){
	  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);

	
  	
  
	$("#btnFind").click(function(){
		
		findDataToServer("/stats/stor-stock-rpt", 1);
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
	 { dataField : "storageCode",    headerText : "창고코드",width: 80}, 
	 { dataField : "storageName",    headerText : "창고명",width: 200, style : "left" }, 
	 { dataField : "storType",    headerText : "창고구분",width: 80},
	 { dataField : "itemQty",    headerText : "아이템수",width: 80, style : "right" , dataType: "numeric",formatString: "#,##0" },
	 { dataField : "stockQty",    headerText : "재고수량",width: 80, style : "right" , dataType: "numeric",formatString: "#,##0" },
	 
	 { dataField : "sumCenterPrice",    headerText : "센터가합계", width: 100, style : "right" , dataType: "numeric",formatString: "#,##0" },
	 { dataField : "consignYN",    headerText : "수탁창고여부", width: 100},
	 { dataField : "consignCustCode",    headerText : "수탁업체코드", width: 100},
	 { dataField : "consignCustName",    headerText : "수탁업체명", width: 200, style : "left" },
	 { dataField : "consignCoworkCustCode",    headerText : "수탁협력사코드", width: 100},
	 { dataField : "consignCoworkCustName",    headerText : "수탁협력사명",width: 200, style : "left" },
	 { dataField : "validYN",    headerText : "사용여부", width: 100},
	 { dataField : "workableYN",    headerText : "판매가능창고여부", width: 120},
	 { dataField : "rlStandByYN",    headerText : "출고대기창고여부", width: 120},
	 { dataField : "consignViewYN",    headerText : "외부비노출여부", width: 120}
	 
];
 
// 푸터 설정
var footerLayout = [{
	labelText: "∑",
	positionField: "#base",
	style: "aui-grid-my-column"
}, {
	dataField: "itemQty",
	positionField: "itemQty",
	operation: "SUM",
	formatString: "#,##0"
	,style: "right"
}, {
	dataField: "stockQty",
	positionField: "stockQty",
	operation: "SUM",
	formatString: "#,##0"
	,style: "right"
}, {
	dataField: "sumCenterPrice",
	positionField: "sumCenterPrice",
	operation: "SUM",
	formatString: "#,##0"
	,style: "right"
}
];
	
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			editable : false,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 100,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			//showPageRowSelect: true,
			
			enableFilter: true,


			//showStateColumn : true,
			
			//rowIdField : "empNo_origin",
			showAutoNoDataMessage : false, 
			
			//footer 노출
			showFooter: true,
			
			selectionMode : "multipleCells",
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
		
}

var storTypeList = ["신품", "중고", "리퍼"	,"불량" , '분실',"폐기"]; // 230215 장윤상추가 // 240902 supi 분실추가, 폐기추가 2024.10.15 sg

var selectBox = document.getElementById ("storType");
	for(var i = 0 ; i<storTypeList.length; i++){
			var option = document.createElement("option");
			option.text = storTypeList[i];
			selectBox.add(option);
	}



function findDataToServer(url,page) {
	let list = [];
	let storageCode = $("#storageCode").val(); 
	let storageName = $("#storageName").val(); 
	let storType = $("#storType").val(); 
	let validYN = $("#validYN").val(); 
	let rlStandByYN = $("#rlStandByYN").val(); 
	let workableYN = $("#workableYN").val();
	let consignYN = $("#consignYN").val();
	let consignViewYN = $("#consignViewYN").val();  
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"RPT",
			"storageCode":storageCode,
			"storageName":storageName,
			"storType":storType,
			"validYN":validYN
			,"rlStandByYN":rlStandByYN
			,"workableYN":workableYN
			,"consignYN":consignYN			
			,"consignViewYN":consignViewYN		
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		
		success:function(data){
			
			if (data.storStockRpt.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.storStockRpt.length;i++){
				//	console.log("finYmd" + data.staffList[i].finYmd)
					list.push({
						 storageCode: data.storStockRpt[i].storageCode,
						 storageName: data.storStockRpt[i].storageName,
						 storType: data.storStockRpt[i].storType, 
						 itemQty: data.storStockRpt[i].itemQty, 
						 stockQty: data.storStockRpt[i].stockQty,						 
						  
						 sumCenterPrice: data.storStockRpt[i].sumCenterPrice, 
						 consignYN: data.storStockRpt[i].consignYN,
						 consignCustCode: data.storStockRpt[i].consignCustCode,
						 consignCustName: data.storStockRpt[i].consignCustName,					   
						 consignCoworkCustCode: data.storStockRpt[i].consignCoworkCustCode, 
						 consignCoworkCustName: data.storStockRpt[i].consignCoworkCustName, 
						 validYN: data.storStockRpt[i].validYN, 
						 workableYN: data.storStockRpt[i].workableYN, 
						 rlStandByYN: data.storStockRpt[i].rlStandByYN
						 ,consignViewYN: data.storStockRpt[i].consignViewYN
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
