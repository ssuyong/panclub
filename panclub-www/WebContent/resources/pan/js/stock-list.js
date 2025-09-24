
var today = new Date();
let yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000)); // 2년전부 오늘까지
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
	startpicker: {
		//date: today,
		input: '#startpicker-input',
		container: '#startpicker-container'
	},
	endpicker: {
		//date: today,
		input: '#endpicker-input',
		container: '#endpicker-container'
	}
});

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
        var stockYm = info[1];
        var itmeNo = info[2];
        var itemName = info[3];
        var storCode = info[4];
        
        //console.log("HashLocationName:"+HashLocationName);
        $("#stockYm").val(stockYm);
		$("#itmeNo").val(itmeNo);
		$("#itemName").val(itemName);
		$("#storCode").val(storCode);
		
        findDataToServer("/logis/stock-list",page);
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  	/*
    $('#makerCode').chosen({
		  no_results_text: "검색 결과가 없습니다"
		  , width: "200px"
	});
	*/

	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var stockYm_val = $("#stockYm").val();
		var itmeNo_val = $("#itmeNo").val();
		var itemName_val = $("#itemName").val();
		var storCode_val = $("#storCode").val();
		
		document.location.hash = '#info'+currentPage+"!"+stockYm_val+"!"+itmeNo_val+"!"+itemName_val+"!"+storCode_val;
		
		findDataToServer("/logis/stock-list", 1);
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
	{ dataField : "itemId",    headerText : "부품ID", width : 80} 
	,{ dataField : "itemNo",     headerText : "품번", width : 120     }
	,{ dataField : "factoryNo",     headerText : "공장품번", width : 120, visible: false   }
	,{ dataField : "itemName",   headerText : "상품명"  }
	,{ dataField : "itemNameEn",   headerText : "영문상품명"  }
	,{ dataField : "makerCode",   headerText : "제조사코드" , visible: false }
	,{ dataField : "makerName",      headerText : "제조사명"  , width : 80  }
	,{ dataField : "storCode",    headerText : "창고코드", width : 140, visible: false } 
	,{ dataField : "storName",    headerText : "창고명", width : 140}
	,{ dataField : "rackCode",    headerText : "랙코드", width : 140, visible: false } 
	,{ dataField : "rackName",    headerText : "랙이름", width : 140} 
	
	,{ dataField : "centerPrice",      headerText : "센터가" , visible: false ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" }
	,{ dataField : "inPrice",      headerText : "입고단가" , visible: false ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" }
	,{ dataField : "salePrice",      headerText : "판매단가", visible: false ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" }
	
	,{ dataField : "stockQty",      headerText : "재고수량", width : 60}
	,{ dataField : "whQty",      headerText : "입고수량", width : 60}
	,{ dataField : "rlQty",      headerText : "출고수량", width : 60}
	,{ dataField : "whAmt",      headerText : "입고금액" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 80}
	,{ dataField : "stockAmt",      headerText : "재고금액" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 80}
	,{ dataField : "rlAmt",      headerText : "출고금액" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", width : 80}
	,{ dataField : "created",      headerText : "최초등록", visible: false }
	,{ dataField : "modified",      headerText : "최종수정일"}
	,{ dataField : "uptUserId",      headerText : "최종수정자" , width : 80}
			
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
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
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
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		var stockYm = event.item.stockYm;
		var storCode = event.item.storCode;
		var itemId = event.item.itemId;
		
		if (event.columnIndex > 15) {   //칼럼이 재고수량이후부터
			$.fancybox.open({
			  href : '/logis/stock-wr-list?stockYm='+stockYm+'&storCode='+storCode+'&itemId='+itemId   , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
		}		
	});
	

		
}


function findDataToServer(url,page) {
	var list = [];
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var stockYm = $("#stockYm").val();
	var storCode = $("#storCode").val();
	
	var makerCode = $("#makerCode").val();
	var itemId = $("#itemId").val();
	if(itemId == ''){itemId = 0;}
	
	var itemNo = $("#itemNo").val();
	var itemName = $("#itemName").val();
	var classCode = $("#classCode").val();
	if(classCode == "정품"){classCode = "GN"}
	else if(classCode == "애프터마켓"){classCode = "AM"}
	else if(classCode == "재제조"){classCode = "RM"}
	else if(classCode == "기타"){classCode = "ET"}
	var storName = $("#storName").val();
	
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	
	console.log("sYmd : " + sYmd)
	console.log("eYmd : " + eYmd)
	
	/*
	if (spaceDel(itemNo)=='' && spaceDel(itemName)=='' && spaceDel(stockYm)=='' && spaceDel(storCode)=='') {
		alert("부품번호 또는 부품명에 검색어를 입력하세요.");
		return false;
	}*/

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"storCode":storCode,
			"itemNo":itemNo,
			"itemName":itemName,
			"stockYm":stockYm,

			"makerCode":makerCode,
			"classCode":classCode,
			"storName":storName,
			"itemId":itemId
			
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.stockList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.stockList.length;i++){
					list.push({
						itemId: data.stockList[i].itemId 
						,itemNo: data.stockList[i].itemNo 
						,factoryNo: data.stockList[i].factoryNo
						,itemName: data.stockList[i].itemName 
						,itemNameEn: data.stockList[i].itemNameEn 
						,makerCode: data.stockList[i].makerCode 
						,makerName: data.stockList[i].makerName
						,storCode: data.stockList[i].storCode 
						,storName: data.stockList[i].storName 
						,rackCode: data.stockList[i].rackCode 
						,rackName: data.stockList[i].rackName 
						,centerPrice: data.stockList[i].centerPrice 
						,inPrice: data.stockList[i].inPrice 
						,salePrice: data.stockList[i].salePrice 
						,stockQty: data.stockList[i].stockQty 
						,whQty: data.stockList[i].whQty 
						,rlQty: data.stockList[i].rlQty 
						,whAmt: data.stockList[i].whAmt 
						,stockAmt: data.stockList[i].stockQty * data.stockList[i].salePrice
						,rlAmt: data.stockList[i].rlAmt 
						,created: data.stockList[i].created 
						,modified: data.stockList[i].modified 
						,uptUserId: data.stockList[i].uptUserId 
						
						
						
						
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

$("#btnUpt").click(function() {
	stockUpt();
});

function stockUpt() {

	$.fancybox.open({
		//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
		href: '/logis/stock-up', // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false
		, modal: true
	});
}
