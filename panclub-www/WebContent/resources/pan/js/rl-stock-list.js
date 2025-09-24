
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;


var today = new Date(); 
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
	type: 'month',
	format: 'yyyy-MM',
    startpicker: {
        date: today,
    	input: '#startYmSerch',
        container: '#startpicker-container'
    },
    endpicker: {
        date: today,
        input: '#endYmSerch',
        container: '#endpicker-container',
        
    }/*,
    selectableRanges: [
        [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
    ]*/
});
 

$(document).ready(function(){
 
//	 ymSerchSelect("rl-stock-YmCode");
	 
	createAUIGrid(columnLayout);
	$("#grid_wrap").css("display","contents");
 

	$("#btnFind").click(function(){
		 
		findDataToServer("rl-stock-list");
		 
		 
	});
	


});


// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	//	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField : "itemNo",   headerText : "부품코드" , style : "left" , width : 300}
	,{ dataField : "itemName",      headerText : "부품명칭"  , width : 300, style : "left"   }
	,{ dataField : "makerName",   headerText : "브랜드", width : 150 }
	
	,{ dataField : "comName",    headerText : "회사명", width : 150} 
	,{ dataField : "stdYm",     headerText : "기준년월", width : 150     }
	,{ dataField : "saleQty",      headerText : "출고수량", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right"} 
	
 
   /* 
   	,{ dataField : "inspecMemo",    headerText : "최종실사", width : 300, style : "left", 
		renderer: { // HTML 템플릿 렌더러 사용
			type: "TemplateRenderer"
		}}
		*/
];
 	var footerLayout = [{
		labelText: "합계",
		positionField: "custCode",
		style: "aui-grid-my-column"
	}, {
		dataField: "costPrice",
		positionField: "costPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "centerPrice",
		positionField: "centerPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "salePrice",
		positionField: "salePrice",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}
	
	];
 
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			//editable : true,		
			
			// 최초 보여질 때 모두 열린 상태로 출력 여부	
			displayTreeOpen: true,
			// 그룹핑 후 셀 병합 실행
			enableCellMerge: true,
			// 브랜치에 해당되는 행을 출력 여부
			showBranchOnGrouping: false,
			groupingFields: ["itemNo","comName","itemName","makerName",],
		  
	 
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			showAutoNoDataMessage : false,
			
			//showRowCheckColumn : true, 
			//rowCheckToRadio : true,
			showFooter: true,
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
 
		AUIGrid.setFooter(myGridID, footerLayout); //2023.07.10 bk
	 
		
}

// db에서 입력된 품번리스트를 검색해서 출고 부품을 조회하는 통신기능
function findDataToServer(url) {
	var list = [];
	
	var serchItem = $("#item_bulk").val();
	var serchItemList = serchItem.split('\n');
	var startYmSerch = $("#startYmSerch").val().replace('-','');
	var endYmSerch = $("#endYmSerch").val().replace('-','');
	 
	var isInputVoid = true; 
	 
	
	if(serchItemList.length > 101)
	{
		alert("대량검색은 최대 100개 까지만 가능합니다.")
		return false;
	}
	
	for(var i = 0 ; i < serchItemList.length ; i++)
	{
		if(serchItemList[i] != '')
		{
			isInputVoid = false;
		}
	}
	
	if(isInputVoid)
	{
		alert("대량 조회를 위한 검색어를 입력하세요.");
		return false;
	}
	//  logis/rl-stock-list
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			 serchItemList,startYmSerch,endYmSerch
		},
		async: false,
		 traditional: true,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
	 
			
			if(data.saleItemQty.length ==0)
			{
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
			}
			else
			{ 
				var ym= "";
				for(i=0;i<data.saleItemQty.length;i++){
					 
					 
					 // 가져온 데이터에서 ym에 같은 부품의 데이터가 여러날짜가 있을경우 시작일~마지막일로 해주는 코드
					 var startYm = data.saleItemQty[i].startYm;    
					 startYm = startYm.slice(0,4) +"."+startYm.slice(4,6);
					 var endYm = data.saleItemQty[i].endYm;
					 endYm = endYm.slice(0,4) +"."+endYm.slice(4,6);
					 ym = startYm;
					 
					if(ym != endYm) 
						ym = ym+"~"+endYm;
					
					
					list.push({
						comName: data.saleItemQty[i].comName  
						,stdYm: ym
						,itemNo: data.saleItemQty[i].itemNo 
						,makerName: data.saleItemQty[i].makerName 
						,itemName: data.saleItemQty[i].itemName
						,saleQty: data.saleItemQty[i].saleQty  
					 
						
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
//				 if (page > 1) {
//			     	AUIGrid.movePageTo(myGridID, Number(page));
//			     }
//			
			
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

// 윈도우 리사이징 이벤트
window.onresize = function () {

	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
	if (typeof myGridID !== "undefined") {
		//$("#grid_wrap").css("display","contents");
		//AUIGrid.resize(myGridID);
		
		//AUIGrid.resize(myGridID, "1200", "650");
	}
};

//대량조회 reset 클릭
function txtAreaReset() {
	//console.log("fn_bulkSrchResetClick");
	$("#item_bulk").val("");
	return;
}
 
