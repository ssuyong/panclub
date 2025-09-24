
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
//$(window).load(function(){
		  
	// AUIGrid 그리드를 생성합니다.
	//$("#grid_wrap").css("display","contents");
	
	createAUIGrid(columnLayout);
	$("#grid_wrap").css("display","contents");
	//AUIGrid.resize(myGridID, "1400", "650");
	//AUIGrid.resize(myGridID);
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var itmeNo = info[1];
        var itemName = info[2];
        var storCode = info[3];
        
        if ( typeof itmeNo == 'undefined'){ itmeNo = ''	}
        if ( typeof itemName == 'undefined'){ itemName = ''	}
        if ( typeof storCode == 'undefined'){ storCode = ''	}
        
		$("#itmeNo").val(itmeNo);
		$("#itemName").val(itemName);
		$("#storCode").val(storCode);
		
        findDataToServer("/logis/stock-item-list",page);
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
		var itmeNo_val = $("#itmeNo").val();
		var itemName_val = $("#itemName").val();
		var storCode_val = $("#storCode").val();
		//var sYmd = document.getElementById("startpicker-input").value;
		//var eYmd = document.getElementById("endpicker-input").value;
		
		
		document.location.hash = '#info'+currentPage+"!"+itmeNo_val+"!"+itemName_val+"!"+storCode_val;
		
		findDataToServer("/logis/stock-item-list", 1);
	});
	
	setBarcodeProp('textMulti' , true);
	 


});


// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	//	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField : "classCode",    headerText : "구분코드", width : 80, editable: false, visible: false} 
	,{ dataField : "className",    headerText : "구분", width : 80, editable: false} 
	,{ dataField : "itemId",    headerText : "부품ID", width : 80} 
	,{ dataField : "itemNo",     headerText : "품번", width : 120     }
	,{ dataField : "factoryNo",     headerText : "공장품번", width : 120 , editable: false    }
	,{ dataField : "itemName",   headerText : "상품명" , style : "left" , width : 120}
	,{ dataField : "makerCode",   headerText : "제조사코드", width : 68, visible : false }
	,{ dataField : "makerName",      headerText : "제조사명"  , width : 80, style : "left"   }
	,{ dataField : "stockQty",      headerText : "재고수량", width : 56 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
	,{ dataField : "workableQty",      headerText : "판매가능수량", width : 84 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
	,{ dataField : "costPrice",      headerText : "입고단가"  ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", width : 68 }
	,{ dataField : "centerPrice",      headerText : "센터가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 68}
	,{ dataField : "salePrice",      headerText : "판매단가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 68}
	,{ dataField : "locaMemo",    headerText : "재고위치", width : 300, style : "left", 
		renderer: { // HTML 템플릿 렌더러 사용
			type: "TemplateRenderer"
		}
	}
	,{ dataField : "uptDate",    headerText : "최종시각", width : 120, style : "left" }
	,{ dataField : "wrMemo",    headerText : "최종입출고", width : 300, style : "left", 
		renderer: { // HTML 템플릿 렌더러 사용
			type: "TemplateRenderer"
		} }    
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
			
			showRowCheckColumn : true, 
			rowCheckToRadio : true,
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
			rowStyleFunction: function (rowIndex, item) {
				if (item.classCode != "GN") {
					return "auigrid-nogn-row-style";
				}
				return "";
			}
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
		AUIGrid.setFooter(myGridID, footerLayout); //2023.07.10 bk
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

		var storCode = event.item.storCode;
		var itemId = event.item.itemId;
		
		if (event.dataField == 'itemId') {   //칼럼이 재고수량이후부터
			$.fancybox.open({
			  href : '/logis/stock-wr-list?storCode='+storCode+'&itemId='+itemId   , // 불러 올 주소
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

	var bulkSrchType= $(':radio[name="bulkSrchType"]:checked').val();  
	var item_bulk = $("#item_bulk").val();
    var item_bulk_rows = item_bulk.split('\n').length;
    var item_bulk_maxRows = 101;
    var totalCount = 0;
    	
	item_bulk = item_bulk.replace("","");
	item_bulk = item_bulk.replace(/\n/g, '힣');  //라인피드의 구분을 '힣'으로 변경
	
    if (spaceDel(item_bulk)=='') {
		alert("대량 조회를 위한 검색어를 입력하세요.")
		return false;
	}
    if (item_bulk_rows>item_bulk_maxRows) {
    	alert("대량검색은 최대 100개 까지만 가능합니다.")
		return false;
    }
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			 "bulkSrchType":bulkSrchType
			,"itemBulk":item_bulk
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.stockItemList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				let factoryNo = ''; //2024.07.24 hsg
					
				for(i=0;i<data.stockItemList.length;i++){
					if (data.stockItemList[i].classCode == 'GN') { //2024.07.24 hsg
						factoryNo = '';
					} else {
						factoryNo = data.stockItemList[i].factoryNo;
					}
					list.push({
						itemId: data.stockItemList[i].itemId 
						,itemNo: data.stockItemList[i].itemNo 
						,itemName: data.stockItemList[i].itemName 
						,makerCode: data.stockItemList[i].makerCode 
						,makerName: data.stockItemList[i].makerName
						,stockQty: data.stockItemList[i].stockQty 
						,centerPrice: data.stockItemList[i].centerPrice 
						,costPrice: data.stockItemList[i].costPrice 
						,salePrice: data.stockItemList[i].salePrice 
						,locaMemo: data.stockItemList[i].locaMemo 
						,uptDate: data.stockItemList[i].uptYmd + ' ' + data.stockItemList[i].uptHms
						,wrMemo: data.stockItemList[i].wrMemo 
						
						,workableQty: data.stockItemList[i].workableQty  //231004 yoonsang
						//,inspecMemo: data.stockItemList[i].inspecMemo 
						,classCode : data.stockItemList[i].classCode   //2024.07.24 hsg
						,className : data.stockItemList[i].className   //2024.07.24 hsg					
						,factoryNo : factoryNo   //2024.07.24 hsg						
						
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
	$.ajax({ url : '/permissionCheckYN' , 
		dataType : 'json',
		type : 'POST',
		
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
				checkCode : 'EH009_01'
		},
		success : (result)=>{ 
			 
			if(result)
			{
				stockUpt();
			}
			else 
			{
				alert('권한이 없습니다. 필요시 연구소로 문의해주세요.');
			}
		},
		error : (e)=>{
		}
		})
});

function stockUpt() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var itemId = "";
	var rowItem;
	var len = checkedItems.length;
	/*
	if (len <= 0) {
		alert("부품을 선택하세요!");
		return;
	}
	*/
	
	for (var i = 0; i < len; i++) {
		rowItem = checkedItems[i];	
		itemId = rowItem.item.itemId;
		
	}	
		//console.log("itemId:"+itemId);
	$.fancybox.open({
		//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
		href: '/logis/stock-up?itemId='+itemId, // 불러 올 주소
		type: 'iframe',
		width: '80%',
		height: '80%',
		padding: 0,
		fitToView: false,
		autoSize: false
		, modal: true
	});
}


function popLink(url){
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var itemId = "";
	var rowItem;
	var len = checkedItems.length;
	
	if (len <= 0) {
		alert("부품을 선택하세요!");
		return;
	}
	
	rowItem = checkedItems[0];		
	itemId = rowItem.item.itemId;		
	
	//var sYmd = document.getElementById("startpicker-input").value;
	//var eYmd = document.getElementById("endpicker-input").value;
		
	let uWidth = (screen.width - 10);
	let uHeight = (screen.height - 200);
	let options = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width="+uWidth+", height="+uHeight+", top=0,left=0";
	//console.log("itemId:"+itemId);
	//window.open(url+'?itemId='+itemId+'&sYmd='+sYmd+'&eYmd='+eYmd, '_blank', options);
	window.open(url+'?itemId='+itemId, '_blank', options);
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

