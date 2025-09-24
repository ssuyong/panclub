/*
var today = new Date();
let yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000)); // 2년전부 오늘까지
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
	startpicker: {
		date: today,
		autoClose : false,
		input: '#startpicker-input',
		container: '#startpicker-container'
	},
	endpicker: {
		date: today,
		input: '#endpicker-input',
		container: '#endpicker-container'
	}
});
*/
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
  	findSrchOutStor("/base/storage-list")
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
	$("#btnbulkSrch_sectionOnOff").click(function(){  // 다중조회 버튼에 대한 이벤트
		var button = $("#btnbulkSrch_sectionOnOff");
		if(button.html() == "다중조회 On")
		{
			button.html("다중조회 Off");
			button.attr('class','btn btn-secondary');
			$("#idDiv_bulkSrch_section").css('display','block');
			$("#idDiv_nomalSrch_section").css('display','none');
			
			 
		}
		else
		{
			button.html("다중조회 On");
			button.attr('class','btn btn-primary');
			$("#idDiv_bulkSrch_section").css('display','none'); 
			$("#idDiv_nomalSrch_section").css('display','block'); 
			
		}
		 
		 
		 
		
	})


});


// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "custCode",   headerText : "외주업체코드" , style : "left" , width : 80, visible : false }
	,{ dataField : "custName",   headerText : "외주업체명" , style : "left" , width : 200, visible : false}
	,{ dataField : "classCode",    headerText : "구분코드", width : 80, editable: false, visible: false} 
	,{ dataField : "className",    headerText : "구분", width : 80, editable: false} 
	,{ dataField : "itemId",    headerText : "부품ID", width : 120} 
	,{ dataField : "itemNo",     headerText : "품번", width : 150     }
	,{ dataField : "factoryNo",     headerText : "공장품번", width : 120 , editable: false    }
	,{ dataField : "itemName",   headerText : "부품명" , style : "left" , width : 300}
	,{ dataField : "makerCode",   headerText : "제조사코드", width : 100 }
	,{ dataField : "makerName",      headerText : "제조사명"  , width : 120, style : "left"   }
	,{ dataField : "stockQty",      headerText : "재고수량", width : 100 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
	,{ dataField : "workableQty",      headerText : "판매가능수량", width : 84 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", visible : false}
	,{ dataField : "costPrice",      headerText : "입고단가"  ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", width : 68, visible : false }
	,{ dataField : "centerPrice",      headerText : "센터가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 100}
	,{ dataField : "centerSumPrice",      headerText : "센터금액" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 100}
	,{ dataField : "salePrice",      headerText : "판매단가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 100 , visible : lcd == 'ㅋ004'}
	,{ dataField : "locaMemo",    headerText : "외주창고명", width : 400, style : "left", 
		renderer: { // HTML 템플릿 렌더러 사용
			type: "TemplateRenderer"
		}
	}
	,{ dataField : "uptDate",    headerText : "최종시각", width : 120, style : "left", visible: false }
	,{ dataField : "wrMemo",    headerText : "최종입출고", width : 300, style : "left", visible: false  ,
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

	}, {
		dataField: "stockQty",
		positionField: "stockQty",
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
	var storCode = $("#storCode").val();
	var makerCode = $("#makerCodeReg").val();
	var itemId = $("#itemId").val();
	if(itemId == ''){itemId = 0;}
	
	var itemNo= '';
	var itemName= '';
	var classCode = $("#classCode").val();
	if(classCode == "정품"){classCode = "GN"}
	else if(classCode == "애프터마켓"){classCode = "AM"}
	else if(classCode == "재제조"){classCode = "RM"}
	else if(classCode == "기타"){classCode = "ET"}
	var storName = $("#storName").val();
	var checkType = 'OUT'
	var outStorCode = $("#outStorName").val();
	var itemBulk='';
	
	var button = $("#btnbulkSrch_sectionOnOff");
	if(button.html() == "다중조회 On")
	{
		itemNo = $("#itemNo").val();
		itemName = $("#itemName").val();
	}
	else
	{
		itemBulk = $("#item_bulk").val();
		itemBulk = itemBulk.replace("","");
		itemBulk = itemBulk.replace(/\n/g, '힣');  
	}
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
			"workingType": "OUT_LIST",
			"storCode":storCode,
			"itemNo":itemNo,
			"itemName":itemName,
			"makerCode":makerCode,
			"classCode":classCode,
			"storName":storName,
			"itemId":itemId,
			"checkType":checkType,
			"outStorCode":outStorCode,
			"itemBulk":itemBulk,
			"bulkSrchType":(itemBulk==''?'': $(':radio[name="bulkSrchType"]:checked').val())  // 라디오 버튼에 따라 id or 품번 검색 선택
			
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
						,centerSumPrice: ((data.stockItemList[i].centerPrice)*(data.stockItemList[i].stockQty)) 
						,costPrice: data.stockItemList[i].costPrice 
						,salePrice: data.stockItemList[i].salePrice 
						,locaMemo: data.stockItemList[i].locaMemo 
						,uptDate: data.stockItemList[i].uptYmd + ' ' + data.stockItemList[i].uptHms
						,wrMemo: data.stockItemList[i].wrMemo 
						
						,workableQty: data.stockItemList[i].workableQty //231004 yoonsang 
						,custCode :  data.stockItemList[i].custCode //2023.10.13
						,custName :  data.stockItemList[i].custName //2023.10.13
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


$("#btnUpt").click(function() {
	stockUpt();
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
	/*
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
	*/
	var itemId = 0;
	var itemNo = "";
	var selectedItems = AUIGrid.getSelectedItems(myGridID);
	if (selectedItems[0] !== undefined) {
    	itemNo = AUIGrid.getCellValue(myGridID, selectedItems[0].rowIndex, "itemNo");
    	itemId = AUIGrid.getCellValue(myGridID, selectedItems[0].rowIndex, "itemId");
    }
    //selectedItems[0].rowIndex;
    //var status =  AUIGrid.isRemovedByRowIndex(selectedItems[0].rowIndex);
	if (itemNo =='' || itemNo == null)	{
		alert("대상 부품번호를 선택하세요");
		return;
	}
		
	//var sYmd = document.getElementById("startpicker-input").value;
	//var eYmd = document.getElementById("endpicker-input").value;
		
	let uWidth = (screen.width - 10);
	let uHeight = (screen.height - 200);
	let options = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width="+uWidth+", height="+uHeight+", top=0,left=0";
	//console.log("itemId:"+itemId);
	//window.open(url+'?itemId='+itemId+'&sYmd='+sYmd+'&eYmd='+eYmd, '_blank', options);
	window.open(url+'?ymdIgnoreYN=Y&itemId='+itemId, '_blank', options);
}

/*외주창고목록찾기 */
function findSrchOutStor(url) {
	var list = [];
	var consignYN = 'Y'
	var checkType = 'OUT'
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			consignYN : consignYN
			,checkType: checkType
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.storageList.length == 0){
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			}else{
				//$("#makerCode").append("<option  value='' >---</option>");
				for(i=0;i<data.storageList.length;i++){
					storageCode = data.storageList[i].storageCode;
					storageName = data.storageList[i].storageName; 
					//$("#outStorName").append("<option value='"+storageCode+"' >"+storageCode+" : "+storageName+"</option>");
					$("#outStorName").append("<option value='"+storageName+"' >"+storageName+"</option>");
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
