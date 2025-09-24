
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

var today = new Date(); 
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
 

$(document).ready(function(){
 	createAUIGrid(columnLayout);
	$("#grid_wrap").css("display","contents");
 
 	findSrchCode("/base/code-list")
	$("#btnFind").click(function(){
		findDataToServer("item-ord-rnk");
	});
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{
		headerText: "부품 ",
			children: [
				 { dataField : "makerCode",headerText : "브랜드", width : 100 }
				,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
				,{ dataField: "itemId",        headerText: "부품ID"  , width : 86,editable: false    }
				,{ dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    }
				,{ dataField : "itemNo",   headerText : "부품번호" , style : "left" , width : 200} 
				,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
				,{ dataField : "itemName", headerText : "명칭"  , width : 300, style : "left"   }
				,{ dataField : "centerPrice",  headerText : "센터가", width : 200 ,dataType: "numeric" ,formatString: "#,##0" , style : "right"  }	
			]
	}		
	,{
		headerText: "주문업체수",
			children: [
				  { dataField : "cQty",  headerText : "업체수", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  }	
				 ,{ dataField : "cRank",  headerText : "순위", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  }	
			]
	}		
	,{
		headerText: "주문건수",
			children: [
				  { dataField : "oQty",  headerText : "건수", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  }	
				 ,{ dataField : "oRank",  headerText : "순위", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  }	
			]
	}		
	,{
		headerText: "주문수량",
			children: [
				  { dataField : "iQty",  headerText : "수량", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  }	
				 ,{ dataField : "iRank",  headerText : "순위", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  }	
			]
	}		

	 
   /* 
   	,{ dataField : "inspecMemo",    headerText : "최종실사", width : 300, style : "left", 
		renderer: { // HTML 템플릿 렌더러 사용
			type: "TemplateRenderer"
		}}
		*/
];
 	
var footerLayout = [{
		labelText: "합계",
		positionField: "itemName",
		style: "aui-grid-my-column"
	}, {
		dataField: "cQty",
		positionField: "cQty",
		operation: "SUM",
		formatString: "#,##0"
	}, {
		dataField: "oQty",
		positionField: "oQty",
		operation: "SUM",
		formatString: "#,##0"
	}, {
		dataField: "iQty",
		positionField: "iQty",
		operation: "SUM",
		formatString: "#,##0"		
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
			//groupingFields: ["itemNo","comName","itemName","makerName",],
		  
	 
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

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
	
	const workingType = 'PRD_ORI_RNK';
	//20240802 supi 개행을 구분자'힣'으로 변환후 해당 구분자로 잘라서 배열로 만듬 이후 배열 아이템이 공백인 ''인것은 제외
	let serchItem = $("#item_bulk").val().replace(/\n/g, '힣').split('힣').filter((row)=>row!='');
	//serchItem = serchItem.replace("","");
	//serchItem = serchItem.replace(/\n/g, '힣');  
	//var serchItemList = serchItem.split('\n');
	
	//var startYmSerch = $("#startYmSerch").val().replace('-','');
	//var endYmSerch = $("#endYmSerch").val().replace('-','');
	let startYmSerch = document.getElementById("startpicker-input").value;
	let endYmSerch = document.getElementById("endpicker-input").value;
	let makerCode = $("#makerCodeReg").val(); 
	let centerPrice = $("#centerPrice").val();
	
	if (centerPrice === null || centerPrice === undefined || centerPrice === '') { centerPrice = 0;}
	
	//var isInputVoid = true; 	 
	
	//serchItem 배열 길이가 100을 넘으면 불가능
	if(serchItem.length > 100)
	{
		alert("대량검색은 최대 100개 까지만 가능합니다.")
		return false;
	}
	//배열을 다시 구분자로 조립
	serchItem = serchItem.join('힣');
	
	/*
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
	*/
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			 workingType,serchItem,startYmSerch,endYmSerch,makerCode,centerPrice
		},
		async: false,
		 traditional: true,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){	 
			
			if(data.itemOrdRnk.length ==0)		{
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
			}	else			{ 
				for(i=0;i<data.itemOrdRnk.length;i++){				

					list.push({
						makerCode: data.itemOrdRnk[i].makerCode  
						,itemNo: data.itemOrdRnk[i].itemNo 
						,itemName: data.itemOrdRnk[i].itemName 
						,centerPrice: data.itemOrdRnk[i].centerPrice
						,cQty: data.itemOrdRnk[i].cQty
						,oQty: data.itemOrdRnk[i].oQty
						,iQty: data.itemOrdRnk[i].iQty
						,cRank: data.itemOrdRnk[i].cRank
						,oRank: data.itemOrdRnk[i].oRank						
						,iRank: data.itemOrdRnk[i].iRank
						
						,className: data.itemOrdRnk[i].className
						,makerName: data.itemOrdRnk[i].makerName
						,itemId: data.itemOrdRnk[i].itemId
						,factoryNo: data.itemOrdRnk[i].factoryNo
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
 
