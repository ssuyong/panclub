
// 그리드 생성 후 해당 ID 보관 변수
let myGridID;
//let isErpComCode = false;

$(document).ready(function(){
//$(window).load(function(){
		

	// AUIGrid 그리드를 생성합니다.
	//$("#grid_wrap").css("display","contents");
	
	//getErpYN();
	createAUIGrid(columnLayout);
	$("#grid_wrap").css("display","contents");
	//AUIGrid.resize(myGridID, "1400", "650");
	//AUIGrid.resize(myGridID);
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        let HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        const info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        const page = info[0];
        const itmeNo = info[1];
        const itemName = info[2];
        const storCode = info[3];
        
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
		let currentPage = 1;
		const itmeNo_val = $("#itmeNo").val();
		const itemName_val = $("#itemName").val();
		const storCode_val = $("#storCode").val();
		//var sYmd = document.getElementById("startpicker-input").value;
		//var eYmd = document.getElementById("endpicker-input").value;
		
		
		document.location.hash = '#info'+currentPage+"!"+itmeNo_val+"!"+itemName_val+"!"+storCode_val;
		
		findDataToServer("/logis/stock-item-list", 1);
	});
	
	
	$('select[id=deliWay]').bind('change', function(event) {
		const deliway = $("#deliWay").val()
		 
		if(deliway == '방문수령' && deliway != '일반배송')
		{
			$("#senderDiv").hide();
			$("#receiverDiv").hide();
			$("#payTypeLabel").hide();
			$("#payTypeDiv").hide();
			$("#rcvlogisCodeLabel").show();
			$("#rcvlogisCodeDiv").show();
		}
		else if(deliway == '일반배송' && deliway != '방문수령')
		{
			$("#senderDiv").hide();
			$("#receiverDiv").hide();
			$("#payTypeLabel").hide();
			$("#payTypeDiv").hide();
			$("#rcvlogisCodeLabel").hide();
			$("#rcvlogisCodeDiv").hide();
		}
		else
		{
			$("#senderDiv").show();
			$("#receiverDiv").show();
			$("#payTypeLabel").show();
			$("#payTypeDiv").show();
			$("#rcvlogisCodeLabel").hide();
			$("#rcvlogisCodeDiv").hide();
		}

		
	})
	
        
    $("input[name='bulkSrchType']").change(function() {
		//console.log("chane in");
		toggleDivs();
	});

	
});



// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	//	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
let columnLayout = [ 
	{ dataField : "classCode",    headerText : "구분코드", width : 80, editable: false, visible: false} 
	,{ dataField : "className",    headerText : "구분", width : 80, editable: false} 
	,{ dataField : "itemId",    headerText : "부품ID", width : 90, editable: false} 
	,{ dataField : "itemNo",     headerText : "품번", width : 120 , editable: false    }
	,{ dataField : "factoryNo",     headerText : "공장품번", width : 120 , editable: false    }
	,{ dataField : "itemName",   headerText : "상품명" , style : "left", editable: false, width : 150 , }
	,{ dataField : "makerCode",   headerText : "제조사코드", width : 100 , editable: false, visible: false}
	,{ dataField : "makerName",      headerText : "제조사명"  , width : 120, style : "left" , editable: false  }
	,{ dataField : "stockQty",      headerText : "재고수량", width : 90 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right",visible:false, editable: false}
	,{ dataField : "workableQty",      headerText : "판매가능수량", width : 90 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right",visible:false}
	, {
			headerText: "주문가능수량 ",
			children: [
				{ dataField: "qtyNew", headerText: "신품", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  ,  
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}, editable: false}
				, { dataField: "qtyUsed", headerText: "중고", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  ,  
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}, editable: false}
				, { dataField: "qtyRefur", headerText: "리퍼", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  ,  
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}, editable: false}
			]
		}
	, {
			headerText: "회수가능수량 ",
			children: [
				{ dataField: "qtyCtNew", headerText: "신품", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  ,  
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}, editable: false}
				, { dataField: "qtyCtUsed", headerText: "중고", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  ,  
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}, editable: false}
				, { dataField: "qtyCtRefur", headerText: "리퍼", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  ,  
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}, editable: false}
			//	, { dataField: "qtyCtBad", headerText: "불량", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false}
			]
		}
	,{ dataField : "costPrice",      headerText : "입고단가"  ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", width : 68 ,visible:false, editable: false}
	,{ dataField : "centerPrice",      headerText : "센터가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 120 }
	,{ dataField : "outSalePrice",      headerText : "판매가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 120 }
	,{ dataField : "saleRate",      headerText : "할인율" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 60 }
	,{ dataField : "salePrice",      headerText : "판매단가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 68 ,visible:false, editable: false}

	,{ dataField: "gvQty", headerText: "요청수량", width: 60, dataType: "numeric", formatString: "#,##0", style: "right   auigrid-must-col-style"}
	,{ dataField: "gvMemo1", headerText: "요청사항1", style: "left   auigrid-opt-col-style",width: 200}

	,{ dataField : "locaMemo",    headerText : "재고위치", width : 300, style : "left", editable: false }
	
	,{ dataField : "otherSaleType",    headerText : "다른할인율적용", width : 300, style : "left", editable: false ,visible:false}
	
	,{ dataField : "uptDate",    headerText : "최종시각", width : 120, style : "left" ,visible:false, editable: false}
	,{ dataField : "wrMemo",    headerText : "최종입출고", width : 300,visible:false, style : "left", editable: false, 
		renderer: { // HTML 템플릿 렌더러 사용
			type: "TemplateRenderer"
		} 
	
	  }    
	,{ dataField: "stockRackCode", headerText: "랙코드", style: "left   auigrid-opt-col-style",width: 200, editable: false ,visible:false}
   /* 
   	,{ dataField : "inspecMemo",    headerText : "최종실사", width : 300, style : "left", 
		renderer: { // HTML 템플릿 렌더러 사용
			type: "TemplateRenderer"
		}}
		*/
];
 	let footerLayout = [{
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
	
	const auiGridProps = {			
			editable : true,			
			
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
			// row Styling 함수
			rowStyleFunction: function (rowIndex, item) {
				if (item.classCode != "GN") {
					return "auigrid-nogn-row-style";
				}
				if (item.stockRackCode == "ㅇ499") {
					return "auigrid-ost-row-style";
				}
				if(item.stockRackCode == "ㅂ022"){
					return "auigrid-ost2-row-style";					
				}
				if(item.stockRackCode == "ㅇ479"){
					return "auigrid-ost3-row-style";					
				}
				
				return "";
			}
			
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	let rowPos = 'first';

	 
		AUIGrid.setFooter(myGridID, footerLayout); //2023.07.10 bk
	// 에디팅 시작 이벤트 바인딩
	// 에디팅 정상 종료 직전 이벤트 바인딩
	// 에디팅 정상 종료 이벤트 바인딩
	// 에디팅 취소 이벤트 바인딩
	//AUIGrid.bind(myGridID, ["cellEditBegin", "cellEditEndBefore", "cellEditEnd", "cellEditCancel"], auiCellEditingHandler);
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	let currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		let storCode = event.item.storCode;
		let itemId = event.item.itemId;
		
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
	
	let list = [];

	let bulkSrchType= $(':radio[name="bulkSrchType"]:checked').val();  
	let item_bulk = $("#item_bulk").val();
    let item_bulk_rows = item_bulk.split('\n').length;
    let item_bulk_maxRows = 101;
    let totalCount = 0;
    let makerCode = $("#makerCode").val();
    	
	item_bulk = item_bulk.replace("","");
	item_bulk = item_bulk.replace(/\n/g, '힣');  //라인피드의 구분을 '힣'으로 변경
	
    if (spaceDel(item_bulk)=='' && makerCode == '') {
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
			"workingType": "SALE_LIST",
			"checkType": "ALL",
			 "bulkSrchType":bulkSrchType
			,"itemBulk":item_bulk
			,"makerCode" : makerCode
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
					
				let locaMemoVis = false;
				let factoryNo = ''; //2024.07.24 hsg
				for(i=0;i<data.stockItemList.length;i++){
					
					if (data.stockItemList[i].classCode == 'GN') { //2024.07.24 hsg
						factoryNo = '';
					} else {
						factoryNo = data.stockItemList[i].factoryNo;
					}		
					console.log("otherSaleType : " + data.stockItemList[i].otherSaleType);			
					console.log("saleRate : " + data.stockItemList[i].saleRate);			
					console.log("stockRackCode : " + data.stockItemList[i].stockRackCode);			
					
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

						//20240808 supi 프로시저에서 계산으로 변경
						,qtyNew: data.stockItemList[i].qtyNew //231102 yoonsang
						,qtyUsed: data.stockItemList[i].qtyUsed  //231102 yoonsang
						,qtyRefur: data.stockItemList[i].qtyRefur  //231102 yoonsang
						
						,qtyCtNew: data.stockItemList[i].qtyCtNew  //240108 supi
						,qtyCtUsed: data.stockItemList[i].qtyCtUsed  //240108 supi
						,qtyCtRefur: data.stockItemList[i].qtyCtRefur  //240108 supi
			//			,qtyCtBad: data.stockItemList[i].qtyCtBad  //231102 yoonsang
						//,inspecMemo: data.stockItemList[i].inspecMemo 
						,outSalePrice : data.stockItemList[i].outSalePrice
						 
						,classCode : data.stockItemList[i].classCode   //2024.07.24 hsg
						,className : data.stockItemList[i].className   //2024.07.24 hsg					
						,factoryNo : factoryNo   //2024.07.24 hsg
						,otherSaleType : data.stockItemList[i].otherSaleType    // 250516 yoonsang
						,saleRate : data.stockItemList[i].saleRate    // 250526 yoonsang
						,stockRackCode : data.stockItemList[i].stockRackCode    // 250526 yoonsang
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				    if(data.stockItemList[i].locaMemo != '')
					   locaMemoVis = true;
				}		
			 
				if((!locaMemoVis) && AUIGrid.getColumnCount("#grid_wrap") == 22 )
				 	AUIGrid.removeColumn("#grid_wrap",19);
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
	let list = [];
	
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
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	let itemId = "";
	let rowItem;
	let len = checkedItems.length;
	/*
	if (len <= 0) {
		alert("부품을 선택하세요!");
		return;
	}
	*/
	
	for (let i = 0; i < len; i++) {
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
	
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	let itemId = "";
	let rowItem;
	let len = checkedItems.length;
	
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




//주문요청. 2023.11.15
function pcReqAdd() {
	
 
	if(dblRegClkChk()) return;
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	const deliWay = $("#deliWay").val();
	const deliPayType = $("#deliPayType").val();
	const rcvlogisCode = $("#rcvlogisCode").val(); 
	 
	if(deliWay == '')
	{
		alert("수령방법을 선택하세요.")
		$("#deliWay").focus();
		 dblRegClkBln = false;
		return;
	}
	if(deliWay == '방문수령' )
	{
		if(rcvlogisCode == '')
		{
			alert("방문처를 선택하세요.")
			$("#rcvlogisCode").focus();
		 	dblRegClkBln = false;
			return;
		}
	}
	else
	{
		if(deliPayType == '' && deliWay != '일반배송')
		{
			alert("비용을 선택하세요.")
			$("#deliPayType").focus();
		 	dblRegClkBln = false;
			return;
		}
	}
 
	let rowItem;
	console.log("rowItem : " + rowItem);
	
	let gvMemo1;
	let gvQty;
	let itemId;
	let itemIdArr = "";
	let gvQtyArr = "";
	let gvMemo1Arr = "";
	let saleRate;
	let saleRateArr="";
	
	let stockRackCode;
	let stockRackCodeArr="";
	
	

	for (let i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];

		itemId = rowItem.item.itemId;
		gvQty = rowItem.item.gvQty;
		gvMemo1 = rowItem.item.gvMemo1;
		saleRate = rowItem.item.saleRate
		stockRackCode = rowItem.item.stockRackCode
		console.log("saleRate2 : " + saleRate);

		if (typeof itemId == 'undefined' || itemId == null) { itemId = ""; }
		if (typeof gvQty == 'undefined' || gvQty == null) { gvQty = ""; }
		if (typeof gvMemo1 == 'undefined' || gvMemo1 == null) { gvMemo1 = ""; }
		if (typeof saleRate == 'undefined' || saleRate == null) { saleRate = ""; }
		if (typeof stockRackCode == 'undefined' || stockRackCode == null) { stockRackCode = ""; }

		if (i == 0) {
			itemIdArr = itemId;
			gvQtyArr = gvQty;
			gvMemo1Arr = gvMemo1;
			saleRateArr = saleRate;
			stockRackCodeArr = stockRackCode;
			
		} else {
			itemIdArr = itemIdArr + "^" + itemId;
			gvQtyArr = gvQtyArr + "^" + gvQty;
			gvMemo1Arr = gvMemo1Arr + "^" + gvMemo1;
			saleRateArr = saleRateArr + "^" + saleRate;
			stockRackCodeArr = stockRackCodeArr + "^" + stockRackCode;
		}

	}

	let gvMgr = $("#gvMgr").val();
	let gvMemo = $("#gvMemo").val();	
 
	let senderCustName = $("#senderCustName").val();
	let senderName = $("#senderName").val();
	let senderTel = $("#senderTel").val();
	let senderAddr1 = $("#senderAddr1").val();
	let receiverCustName = $("#receiverCustName").val();
	let receiverName = $("#receiverName").val();
	let receiverTel = $("#receiverTel").val();
	let receiverAddr1 = $("#receiverAddr1").val();
	
	
	let data = {};
	data.workingType = "ADD_NOPL";
	data.gvMgr  = gvMgr;
	data.gvMemo = gvMemo;
	data.itemIdArr = itemIdArr;
	data.gvQtyArr = gvQtyArr;
	data.gvMemo1Arr =  gvMemo1Arr;
	data.deliWay = deliWay;
	data.deliPayType = deliWay == '방문수령' ? '' : deliPayType;
	data.senderCustName = senderCustName;
	data.senderName = senderName;
	data.senderTel = senderTel;
	data.senderAddr1 = senderAddr1;
	data.receiverCustName = receiverCustName;
	data.receiverName = receiverName;
	data.receiverTel = receiverTel;
	data.receiverAddr1 = receiverAddr1;
	data.rcvlogisCode = deliWay == '방문수령' ? rcvlogisCode : '';
	data.saleRateArr = saleRateArr;
	data.stockRackCodeArr = stockRackCodeArr;
	
	console.log("stockRackCodeArr22 : " + stockRackCodeArr);
 
	
	$.ajax({
		url: "/order/pcReqAdd",
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			if(data.result_code == 'Err'){
				alert(data.result_code + ":" + data.result_msg);
			}else{
				if (confirm("등록되었습니다.주문요청내역으로 이동하시겠습니까?")){
					location.href = "/order/out-pc-req-list?pcReqNo="+data.pcReqNo;
				}else{
					location.reload(true);
				}
				
			}
		},
		error: function(request, status, error) {
			dblRegClkBln = false;
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
	
	/*
	$.ajax({
		url: "/order/pcReqAdd",
		dataType: "json",
		type: "POST",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
			"workingType": "ADD_NOPL",
			"gvMgr": gvMgr,
			"gvMemo": gvMemo,

			"itemIdArr": itemIdArr,
			"gvQtyArr": gvQtyArr,
			"gvMemo1Arr": gvMemo1Arr
		},
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
	*/
}
 


//레이어팝업 오픈
function popUpOpen(popupName,w, h   , position =null) {
	
	
 
	const dialogPrint = $(popupName ).dialog({
	    autoOpen: false,
	    height: h,
	    //minWidth: 500,
	    width: w,
	    modal: true,
	   position: (position==null ? { my: "center", at: "center", of: window } : { my: "right", at: "left", of: $("#dialogPrint-form") })
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogPrint.dialog( "open" );
}

const STOCK_REQ_TYPE = {PC:'pc' , CT :'ct'} //주문요청과 회수요청이 같은 팝업을 사용함에 따라 타입을 두가지 이외는 안들어가도록 만듬
 
// 주문요청 버튼 클릭 시 팝업 . 2023.11.15
$("#btnPcReq").click(()=>{reqFunction(STOCK_REQ_TYPE.PC);});
$("#btnCtReq").click(()=>{reqFunction(STOCK_REQ_TYPE.CT);});

function reqFunction(reqType) {
	 
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID); //재고조회상에서 체크된 행들의 아이템을 가져옴
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	//console.log("checkedItems.item : " + checkedItems.item);
	
	let qty = 0;
    let valQty = 0;
	let rowItemA; 
	let isReqTypePc = reqType==STOCK_REQ_TYPE.PC;
	let list = []; // 요청 팝업에서 사용할 데이터들을 저장할 배열
 
	for (let i = 0, len = checkedItems.length; i < len; i++) {  // 요청버튼을 눌렀을때 가능수량보다 많은지 또, 수량을 선택 안했는지 검사
		rowItemA = checkedItems[i];
		//itemId = rowItemA.item.itemId;
		qty = rowItemA.item.gvQty;
		//console.log("gvQty:"+rowItemA.item.qtyNew);
		valQty =isReqTypePc?(rowItemA.item.qtyNew + rowItemA.item.qtyUsed + rowItemA.item.qtyRefur):(rowItemA.item.qtyCtNew + rowItemA.item.qtyCtUsed + rowItemA.item.qtyCtRefur) ;
		
		
		if ($.isNumeric(qty) == false || qty <=0 ){
			alert((reqType==STOCK_REQ_TYPE.PC?'요청':'회수')+"수량은 1개 이상이어야 합니다. "+parseInt(checkedItems[i].rowIndex+1)+"번째 품목");
			return;
		}
		//console.log("v:"+valQty);
		if (qty > valQty ){
			alert((isReqTypePc?'요청':'회수')+"수량이 "+(isReqTypePc?"판매":"회수")+"가능수량보다 많습니다. "+parseInt(checkedItems[i].rowIndex+1)+"번째 품목");
			return;
		}
				
	}
	 
	
	for(let i = 0 ; i < checkedItems.length ; i++)  // 체크된 행들을 이후 요청창의 그리드에 쓸수 있도록 list 배열에 저장
	{ 
		list.push(
			checkedItems[i].item
		);
		console.log("checkedItems[i].item : " + checkedItems[i].item);
	}
 
 
 	const fun = (list , isSelfReq)=>{  //익명함수로 요청팝업에 그려질 list배열과 계열사일때만 보여질 랙선택 버튼및 선택된 렉이 보여질지 여부를 받는 상수함수를 만듬
 	AUIGrid.destroy("#req_grid_wrap"); 
	setReqColumnLayout(isSelfReq);  
	AUIGrid.create("#req_grid_wrap", reqColumnLayout , {width:1150 , autoGridHeight:true});
	AUIGrid.setColumnPropByDataField("#req_grid_wrap", "qtyHeader", {headerText: (isReqTypePc?"주문가능수량":"회수가능수량"), });

	//AUIGrid.setColumnProp("#req_grid_wrap" , 8,{dataField : (isReqTypePc?"qtyNew":"qtyCtNew")});
	//AUIGrid.setColumnProp("#req_grid_wrap" , 9,{dataField : (isReqTypePc?"qtyUsed":"qtyCtUsed")});
	//AUIGrid.setColumnProp("#req_grid_wrap" , 10,{dataField : (isReqTypePc?"qtyRefur":"qtyCtRefur")});
	//AUIGrid.setGridData("#req_grid_wrap", list  );

	let newColumnIndex = AUIGrid.getColumnIndexByDataField("#req_grid_wrap" ,"qtyNew");
	let usedColumnIndex ;
	let refurColumnIndex ;

	if(newColumnIndex == -1)
	{
		newColumnIndex = AUIGrid.getColumnIndexByDataField("#req_grid_wrap" ,"qtyCtNew")
		usedColumnIndex = AUIGrid.getColumnIndexByDataField("#req_grid_wrap" ,"qtyCtUsed")
		refurColumnIndex = AUIGrid.getColumnIndexByDataField("#req_grid_wrap" ,"qtyCtRefur")
	}
	else
	{
		usedColumnIndex = AUIGrid.getColumnIndexByDataField("#req_grid_wrap" ,"qtyUsed")
		refurColumnIndex = AUIGrid.getColumnIndexByDataField("#req_grid_wrap" ,"qtyRefur")
	}
	AUIGrid.setColumnProp("#req_grid_wrap" , newColumnIndex,{dataField : (isReqTypePc?"qtyNew":"qtyCtNew")});
	AUIGrid.setColumnProp("#req_grid_wrap" , usedColumnIndex,{dataField : (isReqTypePc?"qtyUsed":"qtyCtUsed")});
	AUIGrid.setColumnProp("#req_grid_wrap" , refurColumnIndex,{dataField : (isReqTypePc?"qtyRefur":"qtyCtRefur")});
	AUIGrid.setGridData("#req_grid_wrap", list);
	}
 
	 // 계열사 요청 동시 즉시 완료 기능 x로 결정나서 주석처리
//	if(reqType==STOCK_REQ_TYPE.CT && isErpComCode) // 회수요청이면서 계열사일때만 랙선택쪽으로 
//	{
//		let ctItemIdArr = '';
//		
//		for(let i = 0 ; i <list.length ; i++) // 계열사의 경우 아이템 id배열을 가져와서 '^'를 구분자로 저장
//		{
//			ctItemIdArr+= list[i].itemId;
//			if(i+1 <list.length)
//				ctItemIdArr+='^';
//		}
//	
//		ctStoRackListSet(list, ctItemIdArr , fun);  // 부품별 창고,랙 이름및 코드를 알수있는 통신을 하는 함수에 그리드를 그릴 list와 부품아이디배열 , fun함수를 매개변수로 보냄
//	} 
//	else
		fun(list,false); //위에서 선언및 초기화한 fun 함수를 호출하여 요청팝업의 그리드에 데이터를 체워넣음
 

	const dialogPcReq = $("#dialog-form").dialog({ //팝업창을 열어줌
		title : (isReqTypePc?"주문요청":"회수요청"),
		height: 550,
		width: 1200,
		modal: true,
		headerHeight: 40,
		position: { my: "center", at: "center", of: window },
		buttons: {
			"확인": (isReqTypePc?pcReqAdd:ctReqAdd), //위에서 정한 주문인지 회수인지에 따라 호출함수 분기
			"취소": function(event) {
				dialogPcReq.dialog("close"); // 취소시 팝업닫음
			}
		},
		close: function() {
			//창 꺼지면 입력창 초기화 부분 누락되서 추가
			$('#gvMgr').val('');
			$('#deliWay').val('');
			$('#deliPayType').val('');
			$('#senderCustName').val('');
			$('#senderName').val('');
			$('#senderTel').val('');
			$('#senderAddr1').val('');
			$('#receiverCustName').val('');
			$('#receiverName').val('');
			$('#receiverTel').val('');
			$('#receiverAddr1').val('');
			$('#gvMemo').val('');
		}
	});
	
	
	if(isReqTypePc) 
	{
		$("#PcReqDiv").show();
		$("#payTypeLabel_prepayment").show(); 
		
	}
	else 
	{	
		$("#PcReqDiv").hide(); // 회수인 경우 수령방법~받는이까지의 html태그부분 숨김
		$("#payTypeLabel_prepayment").hide();  // 회수인경우 선불입력 숨김
	}
	return;
};

//let storQtyList = {};  창고선택 리스트
//let rackQtyList = {}; //랙별 수량 보관용 변수
let reqColumnLayout; // 요청의 그리드 레이아웃인데 바로 아래 함수로 초기화 가능. 왜 초기화가 함수로 되어있냐 하면 계열사여부에 따라 레이아웃이 달라지기 때문임

function setReqColumnLayout(isStor)
{
	reqColumnLayout = [ 
	{ dataField : "className",      headerText : "구분", width : 80, editable : false }	
	,{ dataField : "itemId",    headerText : "부품ID", width : 80, editable: false} 
	,{ dataField : "itemNo",     headerText : "품번", width : 140 , editable: false    }
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
	,{ dataField : "itemName",   headerText : "상품명" , style : "center", editable: false, width : 200 , }
	,{ dataField : "makerName",      headerText : "제조사명"  , width : 100, style : "center" , editable: false  }
	,{ dataField : "centerPrice",      headerText : "센터가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 100 }
	,{ dataField : "outSalePrice",      headerText : "판매가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 100 }
	,{ dataField : "saleRate",      headerText : "할인율" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false,width: 60 }
	,{	headerText: "판매가능수량 ",
		dataField: "qtyHeader",
		children: [
	      { dataField: "qtyNew", headerText: "신품", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false}
		, { dataField: "qtyUsed", headerText: "중고", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false}
		, { dataField: "qtyRefur", headerText: "리퍼", width: 40 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", editable: false}
		]
	}
	,{ dataField: "gvQty", headerText: "요청수량", width: 60, dataType: "numeric", formatString: "#,##0", style: "right   auigrid-must-col-style"}
	,{ dataField: "gvMemo1", headerText: "요청사항", style: "left   auigrid-opt-col-style",width: 300}
	,{ dataField: "stockRackCode", headerText: "랙코드", style: "left   auigrid-opt-col-style",width: 200, editable: false ,visible:false}
	];

//창고선택 레이아웃 랙선택으로 변경으로 주석
//	if(isStor)
//		reqColumnLayout.splice(6,0,{ dataField : "storQty",      headerText : "창고선택(코드) [수량]"  , width : 260 , renderer: {
//				type: "DropDownListRenderer",
//				listFunction: function (rowIndex, columnIndex, item) {
//				//	console.log(item.reqSeq);
//					return storQtyList[item.itemId];
//				}
//			}
//		});

//////계열사 즉시완료 x로 주석처리
//	if(isStor)  // 계열사인 경우 랙선택과 선택된 랙이라는 컬럼이 추가됨
//	{
//		reqColumnLayout.splice(6,0,{  // 랙선택으로 진행할경우 추가 팝업이 뜨면서 해당 행의 부품의 랙중 즉시 회수할 부품의 랙과 수량을 선택, 
//		editable: false,
//	 	dataField : "undefined",
//		headerText: "랙 선택", 
//		width: 140, 
//		renderer: {
//			labelText : "선택 하기",
//			type: "ButtonRenderer",
//			onClick: function (event) {    
//		 		//console.log(event);
//				 
//				const dialogRackSelect = $("#dialog-rackSelect").dialog({ 
//				title : "랙 선택 (부품번호:"+event.item.itemNo+" / 부품명:"+event.item.itemName+" / 요청수량:"+event.item.gvQty+")",  //편의성을 위해 타이틀에 어떤 부품의 랙을 선택중인지 부품정보와 요청수량을 타이틀로 보여줌
//				minHeight: 200,
//				width: 700,
//				modal: true,
//				headerHeight: 40,
//				position: { my: "center", at: "center", of: window },
//				
//				close: function() {
//				},
//				buttons: {
//					"확인": (e)=>{  
//						const selectRackItem = AUIGrid.getGridData("#grid_wrap-rackSelect");
//						 
//						let selectRactText = "";
//						let sumQty = 0;
//						
//						for(let i = 0 ; i < selectRackItem.length ; i++)  //선택된 랙 수량을 회수 접수 상세내역의 선택된 랙에 텍스트로 넣어주는 코드 형식은  랙이름[코드]:수량 / 랙이름2[코드2]:수량2
//						{
//							if(selectRackItem[i].selectQty == '' ) continue;
//							else if(selectRackItem[i].selectQty == 0 ) continue;
//							else if(selectRactText != "") selectRactText += " / ";
//							selectRactText += selectRackItem[i].rackName+"["+selectRackItem[i].rackCode+"]:"+selectRackItem[i].selectQty;
//							sumQty += selectRackItem[i].selectQty;
//						} 
//						if(parseInt(event.item.gvQty) < sumQty) //선택한 랙의 수량의 합이 요청수량보다 많을경우. 프로시저에서도 막고 있지만 1차적으로 클라이언트에서도 방지
//						{
//							alert("요청수량보다 수량을 많이 입력하셨습니다");
//							return;
//						} 
//						AUIGrid.updateRow("#req_grid_wrap", {selectRack: selectRactText}, event.rowIndex);
//						dialogRackSelect.dialog("close");
//					},
//					"취소": (e)=> { 
//						dialogRackSelect.dialog("close");
//					}
//				},
//				open:function (type, data) { 
//				// Dialog의 Title Bar 제거
//				   const auiGridProcps = { 
//						editable: true,
//						autoGridHeight:true,
//						showFooter: true,   
//						enableClipboard:false // 랙별로 수량입력하는거라 복붙할 이유 없으므로 아에 막음
//				   }
//				   let auiList = rackQtyList[event.item.itemId];  // 랙별 갯수가 저장되어있는 변수에서 랙별 선택 그리드에 뿌려줄수 있도록 현재 선택된 itemid의 랙정보 데이터를 가져와서 저장
//				   let selectQty =  selectRackQtyTextParse(event.item.selectRack); // 이전 입력저장한 랙별 수량 텍스트를 파싱해서 selectQty에 저장
//				   
//				   for(let i = 0 ; i < auiList.length ; i++) // 파싱된 데이터를 이용하여 레이어에 뿌려줄수 있도록 selectQty에 auiList의 랙 코드를 키로 하여 수량을 가져옴 만약 데이터가 없으면 공백으로 함
//				   {
//						auiList[i].selectQty = selectQty[auiList[i].rackCode]!=null?selectQty[auiList[i].rackCode]:'';
//				   } 
//				    
//				   
//	               //$(this).dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
//	               $(this).dialog().parents(".ui-dialog").find(".ui-dialog-titlebar-close").remove();
//	               AUIGrid.create("#grid_wrap-rackSelect", rackSelectColumnLayout, auiGridProcps);
//	               AUIGrid.setFooter("#grid_wrap-rackSelect", rackSelectFooterLayout);
//	               AUIGrid.bind("#grid_wrap-rackSelect", "cellEditEnd", function( event ) {  // 수량셀에 제약조건으로 음수불가와 랙수량보다 못넣도록 바인딩
//						const item = event.item;
//						if(item.selectQty < 0)
//  				       	{
//							AUIGrid.updateRow("#grid_wrap-rackSelect",{selectQty : event.oldValue}, event.rowIndex); 
//							alert("0보다 작은 수량은 입력할수 없습니다.") 
//						}
//  				        else if(item.selectQty > parseInt(item.stockQty))
//  				        {
//							AUIGrid.updateRow("#grid_wrap-rackSelect",{selectQty : event.oldValue}, event.rowIndex); 
//							alert("랙의 수량보다 높은 수량을 선택할수 없습니다.") 
//  				       	} 
//					}); 
//	               AUIGrid.setGridData("#grid_wrap-rackSelect" ,auiList); 
//	               
//	         	} 
//				}); 
//				
//			},
//		}
//	});
//	reqColumnLayout.splice(7,0,{ dataField : "selectRack",      headerText : "선택된 랙"  , width : 360 ,editable: false  });
//	}
} 

//// 계열사 즉시완료 x 로 주석
//const rackSelectColumnLayout = [   // 랙선택 팝업의 레이아웃
//	 { dataField : "rackCode",    headerText : "랙코드", width : 100,editable: false}  
//	,{ dataField : "rackName",   headerText : "랙이름" , width : 300 ,editable: false} 
//	,{ dataField : "stockQty",      headerText : "수량"  , width : 100,editable: false}
//	,{ dataField : "selectQty",      headerText : "수량 선택"  , width : 100 , dataType : "numeric" , formatString : "###0",
//		editRenderer : {
//			type : "NumberStepRenderer",
//			textAlign : "center"
//		}
//	}	 
//]; 
//let rackSelectFooterLayout = [{ // 랙선텍팝업의 푸터
//		labelText: "합계",
//		positionField: "rackCode",
//		style: "aui-grid-my-column"
//	}, {
//		dataField: "selectQty",
//		positionField: "selectQty",
//		operation: "SUM",
//		formatString: "#,##0"
//		,style:"center"
//
//	} 
//	];
 
 function ctReqAdd() {  // 회수요청 팝업의 '확인'에 대한 이벤트 주요 기능은 회수요청 마스터 및 디테일 등록(계열사의 경우 등록과 동시에 완료)
	if(dblRegClkChk()) return; //더블클릭 방지
	const checkedItems = AUIGrid.getCheckedRowItems(myGridID); // 재고조회에서 선택됫던 리스트에 데이터 가져옴
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	let rowItem;
	
	let gvMemo1;
	let gvQty;
	let itemId;
	let itemIdArr = "";
	let qtyArr = "";
	let memo1Arr = "";

	for (let i = 0, len = checkedItems.length; i < len; i++) { // 선택된 부품들을 반복문 돌면서 itemid, qty , memo(아이디,수량,요청사항)을 가져와서 텍스르로 만듬(구분자 '^')
		rowItem = checkedItems[i];

		itemId = rowItem.item.itemId;
		gvQty = rowItem.item.gvQty;
		gvMemo1 = rowItem.item.gvMemo1;

		if (typeof itemId == 'undefined' || itemId == null) { itemId = ""; }
		if (typeof gvQty == 'undefined' || gvQty == null) { gvQty = ""; }
		if (typeof gvMemo1 == 'undefined' || gvMemo1 == null) { gvMemo1 = ""; }

		if (i == 0) {
			itemIdArr = itemId;
			qtyArr = gvQty;
			memo1Arr = gvMemo1;
		} else {
			itemIdArr = itemIdArr + "^" + itemId;
			qtyArr = qtyArr + "^" + gvQty;
			memo1Arr = memo1Arr + "^" + gvMemo1;
		}

	}

	let reqMgr = $("#gvMgr").val();
	let reqMemo = $("#gvMemo").val();	  
	
	const deliWay = $("#deliWay").val();
	const deliPayType = deliWay == '방문수령' ? '' : $("#deliPayType").val();
	const rcvlogisCode = deliWay == '방문수령' ? $("#rcvlogisCode").val() : ''; 
	
	if(deliWay == '')
	{
		alert("수령방법을 선택하세요.")
		$("#deliWay").focus();
		 dblRegClkBln = false;
		return;
	}
	if(deliWay == '방문수령')
	{
		if(rcvlogisCode == '')
		{
			alert("방문처를 선택하세요.")
			$("#rcvlogisCode").focus();
		 	dblRegClkBln = false;
			return;
		}
	}
	else
	{
		if(deliPayType == ''  && deliWay != '일반배송' )
		{
			alert("비용을 선택하세요.")
			$("#deliPayType").focus();
		 	dblRegClkBln = false;
			return;
		}
	}
	
	
	  
///// 계열사 즉시완료 코드	
//	let selectIdx ='';
//	let selectRackArr ='';
//	let selectQtyArr = ''; 
//	 
//	const gridData = AUIGrid.getGridData("#req_grid_wrap"); // 회수요청 팝업의 데이터를 가져옴
//	
//		
//	for(let i=0 ; i < gridData.length ; i++)  //회수요청 팝업의 데이터에서 선택된 렉과 수량을 텍스트로 만듬 (계열사 전용)
//	{
//		const rackArrObj = selectRackQtyTextParse(gridData[i].selectRack);
//		const rackArrObjKeys =  Object.keys(rackArrObj);
//		
//		for(let j = 0 ; j < rackArrObjKeys.length ; j++)
//		{
//			if(i!=0 || j !=0) // 시작이 아니면 구분자 넣어줌
//			{  
//				selectIdx += '^';
//				selectRackArr += '^';
//				selectQtyArr += '^';
//			} 
//			selectIdx += nTxtRmv(i+1) ;
//			selectRackArr +=nTxtRmv(rackArrObjKeys[j]) ;
//			selectQtyArr  += nTxtRmv(rackArrObj[rackArrObjKeys[j]]);
//				
//		} 
//	} 
	  
 
	$.ajax({
		url: "/order/ctReqAdd",
		dataType: "json",
		type: "POST",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
			reqMgr,
			reqMemo,
			itemIdArr,
			qtyArr,
			memo1Arr,
			deliWay,
			deliPayType,
			rcvlogisCode
			
//			itemSeqArr : selectIdx,
//			itemRackArr : selectRackArr,
//			itemQtyArr : selectQtyArr  
		},
		success: function(data) {
			
			//console.log(data);
			
			if(data.db_resultCode == 'Err') // 긴 트랜잭션을 지나다 보니 err로 나올경우 메세지와 롤백함
			{
				alert(data.db_resultMsg)
				dblRegClkBln = false;
			}
			else if (confirm("등록되었습니다.회수요청내역으로 이동하시겠습니까?")){
				location.href = "/order/out-ct-req-list"
			}else{
				location.reload(true);
			}
		
		},
		error: function(request, status, error) {
			dblRegClkBln = false;
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
	
	 
}

/////// 계열사 즉시완료x 로 결정나서 창고 가져오는 통신 제외
// 아이템 아이디배열 텍스트(구분자 '^')를 보내서 해당 아이디들의 랙,창고의 이름 코드 수량을 가져오는 통신
//function ctStoRackListSet(list,ctItemIdArr,fun)   
//{
// 
//	$.ajax(	{
//		type : "POST",
//		url : "/order/ctStoRackList",
//		dataType : "json",
//		data: { 
//			ctItemIdArr 
//		},
//		async: false,
//		//contentType: "application/json; charset=utf-8",
//		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
//		success:function(data){
//			if(data == null ) return;
//			if(data.ctStoRackList == null) return;
//			
//			 
//			// storQtyList={};  창고선택용
//			rackQtyList={};
//			//let storQty ={};  
//	 		
//	 		//주석들은 창고선택때 쓰던 코드 혹시 나중에 변동 사항 생길수도 있어서 남겨둠
//			for(let i = 0 ; i < data.ctStoRackList.length ; i++) // 통신으로 받아온 데이터 랙,창고코드로 rackQtyList에 아이템 아이디를 키로 하는 객체를 만들고 키에 대한 값은 해당 아이템 아이디의 랙정보를 배열로 가지는 데이터를 만듬
//			{
//				const itemId = data.ctStoRackList[i].itemId;
////				const storageCode = data.ctStoRackList[i].storageCode
//			  
//			 
////				if(storQty[itemId] == null) 
////					storQty[itemId] = {};
////				
////				if(storQty[itemId][storageCode] == null)
////					storQty[itemId][storageCode] = {storageCode , storageName : data.ctStoRackList[i].storageName , stockQty :  parseInt(data.ctStoRackList[i].stockQty)};
////				else
////					storQty[itemId][storageCode].stockQty +=  parseInt(data.ctStoRackList[i].stockQty);
//				if(rackQtyList[itemId] == null)  //렉 선택용 팝업 데이터 리스트객체에 [순번]을 키로 랙코드,랙이름,수량이 담긴 객체의 배열을 만들어서 기록 
//					rackQtyList[itemId] =[];
//				rackQtyList[itemId].push({rackCode:data.ctStoRackList[i].rackCode , rackName : data.ctStoRackList[i].rackName , stockQty : data.ctStoRackList[i].stockQty});
//			} 
//			 
////			for(let i = 0 ; i < list.length ; i++) // 각 부품의 storQty 키에 위에 2차원 객체를 참조하여 자신의 순번의 객체중 0번째 객체를 찾아서 해당 정보를 '창고이름(창고코드) [수향]'으로 넣는다
////			{ 
////				const storKeys = Object.keys(storQty[list[i].itemId]);
////				const item = storQty[list[i].itemId][storKeys[0]];
////				list[i].storQty = item.storageName + '('+item.storageCode+') '+'['+item.stockQty+']';
////				
////				for(j = 0 ; j < storKeys.length ; j++)  // 2차원 객체 storQty를 이용하여 storQtyList라는 AUIGrid에서 쓸 드랍박스 리스트를 순번을 키값으로 값은 각 창고정보를 string 배열을 가지는 객체정보를 형성 
////				{
////					const inputItem = storQty[list[i].itemId][storKeys[j]];
////					const inputText =  inputItem.storageName + '('+inputItem.storageCode+') '+'['+inputItem.stockQty+']';
////					if(storQtyList[list[i].itemId] == null)
////						storQtyList[list[i].itemId] = [];
////					storQtyList[list[i].itemId].push(inputText); 
////				} 
////			}
//			  
//		 
//			//P(자회사)만 2번째 매개변수 true
//			fun(list,true);  
//			 
//			
//		},
//		error:function(x,e){
//			if(x.status==0){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
//	        }else if(x.status==404){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
//	        }else if(x.status==500){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
//	        }else if(e=='parsererror'){
//	            alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
//	        }else if(e=='timeout'){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
//	        }else {
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
//	        }
//		}
//	});
//}     
 
//function selectRackQtyTextParse(text)  // 랙정보 텍스트를 파싱하는 함수 "랙이름[랙코드]:수량/랙이름2[랙코드]:수량" 라는 텍스트를 랙코드를 키값으로 하고 수량을 값으로 하는 객체로 변환해서 반환
//{
//	let selectQty = {};
//	if(text != null)
//	{
//		const selectRackArr = text.split(" / ");
//		for(let i = 0 ; i < selectRackArr.length ; i++)   // 선택된 렉 택스트를 파싱해서 selectQty에 selectQty[렉코드] = 수량 형식으로 저장
//		{
//			const rackData = selectRackArr[i].split("]:");
//			selectQty[rackData[0].split("[")[1]] =  rackData[1]; // selectQty[랙코드] = 선택수량이 되도록 지정
//							 
//		}
//						
//	} 
//	return selectQty
//} 

function nTxtRmv(text) // null데이터로 인한 undefined 텍스트 제거용 함수 의도치 않게 undefined로 그리드에 값이 체워지는것을 막기 위해 제작
{
	if(text == null)
		return '';
	else 
		return text;
		
}
//계열사인지 통신해서 isErpComCode 에 저장하는 함수  // 계열사 요청 동시 즉시 완료 기능 x로 결정나서 주석처리
//function getErpYN ()
//{
// 
//	$.ajax(	{
//		type : "POST",
//		url : "/getErpYN",
//		dataType : "json",
//		data: {  
//		},
//		async: false,
//		//contentType: "application/json; charset=utf-8",
//		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
//		success:function(data){ 
//		 	isErpComCode = data; 
//		},
//		error:function(x,e){
//			if(x.status==0){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
//	        }else if(x.status==404){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
//	        }else if(x.status==500){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
//	        }else if(e=='parsererror'){
//	            alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
//	        }else if(e=='timeout'){
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
//	        }else {
//	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
//	        }
//		}
//	});
// }


function companyMapOpen()
{
	const rcvlogisCode = $("#rcvlogisCode").val();
	if(!rcvlogisCode)
	{
		alert("방문처를 선택해주세요")
		return;
	}
	popUpOpen("#dialog-companyMap", 610,690)
	const map = {companyMap_Junggok :'중곡' ,companyMap_Namyang :'남양' ,companyMap_Cheongna2:'청라' ,companyMap_Busan:'부산'}
	
	for(mapText in map)
	{
		if(map[mapText] == rcvlogisCode) //현재 선택된 방문처가 map키와 같을때  
			$(`#${mapText}`).show(); 
		else
			$(`#${mapText}`).hide();
	} 
}

function toggleDivs() {
	//console.log("fuction in")
    if ($('#makerCodeRadio').is(':checked')) {
            $('#textAreaDiv').hide();
            $('#selectBoxDiv').show();
            txtAreaReset();
    } else {
        $('#textAreaDiv').show();
        $('#selectBoxDiv').hide();
        $('#makerCode').val("");
    }
}
 