
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){
	  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
    	//fnViewType(info[11]);
        //f_category_sub(info[0],info[1],info[2],info[3],info[4],info[5],info[6],info[7],info[8],info[9],info[10],info[11],info[12],info[13]);
        
        var page = info[0];
        var itemId = info[1];
        var itemNo = info[2];

        $("#itemId").val(itemId);
		$("#itemNo").val(itemNo);
		
        findDataToServer("/logis/outer-non-dsp-list",page); //안되면 staff-list 에서 찾을 수 있는가 확인해봐야함
    }
    
     else {	
  	}
  	
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var itemId_val = $("#itemId").val(); 
		var itemNo_val = $("#itemNo").val();
		document.location.hash = '#info'+currentPage+"!"+itemId_val+"!"+itemNo_val;

		findDataToServer("/logis/outer-non-dsp-list", 1);
	});
	
	$("#btnReg").click(function(){
		updateDataToServer("/logis/outerNonDspAdd", "workingType");
	});

});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false }	
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }	 
		,{ dataField : "itemId",      headerText : "부품ID", width : 100, editable : false }
		,{ dataField : "makerName",      headerText : "제조사명"  , width : 70, style : "left"   }
		,{ 
			dataField : "itemNo",      headerText : "품번", width : 200 , style:"left" , enableDrag :false , style:"auigrid-must-col-style" 
			,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '필수입력값입니다.'
		    }
		    ,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");
					$("#pop_itemNo").val();

					var dialogItem;
					dialogItem = $( "#dialog-form-item" ).dialog({
					    //autoOpen: false,
					    height: 700,
					    //minWidth: 500,
					    width: "70%",
					    modal: true,
					    headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position:[400,400],
						buttons: {
							"확인": updateGridRow			,
							"취소": function (event) {
								dialogItem.dialog("close");
							}
						},
					    close: function() {
					     // $( "#users tbody tr td" ).empty();	   	
					    }
					});	
					createItemGrid(columnLayoutItem,'Y');
					dialogItem.dialog("open");					
				}
			}  
		 } 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }  
		,{ dataField : "itemName", headerText : "품명", width: 300, editable : true, style:"left"  } 
		,{ dataField : "centerPrice",     headerText : "센터가", width : 120,dataType: "numeric", formatString: "#,##0"  , style:"right"   , editable : false 	}	     
		//,{ dataField : "stockQty",     headerText : "재고수량", width : 120,dataType: "numeric", formatString: "#,##0"  , style:"right"   , editable : false 	}
		,{ dataField : "memo1",     headerText : "비고", width: 300,  style:"left auigrid-opt-col-style"}
		,{ dataField : "uptUserId", headerText : "등록자", width: 100, editable : true, editable : false  } 
		,{ dataField : "uptUserName", headerText : "등록명", width: 100, editable : true, editable : false  }
		,{ dataField : "modified", headerText : "등록일시", width: 200, editable : true, editable : false  }
	];
	

	// 그리드 속성 설정
	var gridPros = {

		editable : true,			
		
		// singleRow 선택모드
		selectionMode: "multiRow",
		
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		enableDrag: true,
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		enableMultipleDrag: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		enableDragByCellDrag: false,
		// 드랍 가능 여부 (기본값 : true)
		enableDrop: true,
		
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		//showRowCheckColumn: true, //체크박스 표시 설정
		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
						
		// 엑스트라 체크박스 표시 설정
		//showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,

        sortableByFormatValue :true,
			
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	addRow(myGridID,'last');  //첫행 자동 추가  
	
	
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	//AUIGrid.bind(myGridID, "cellEditBegin", auiCellEditingBeginHandler);

	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	// 셀 선택변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var allItems = AUIGrid.getGridData(myGridID);
       AUIGrid.removeRow(myGridID, allItems .length+1);
       //fn_dcProc();
      
	});	
	AUIGrid.bind(myGridID, "addRowFinish", function( event ) {
	});

	AUIGrid.bind(myGridID, "pasteBegin", function(event) {
	});

	//품번 붙여넣기 완료한 경우. 
	AUIGrid.bind(myGridID, "pasteEnd", function(event) {
		console.log("1");
		AUIGrid.setSelectionByIndex(0, 0); // 0, 0 으로 선택자 이동시킴.
 	
     	var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		var rowId;
		var j=0;
		var rowIndexes = [];
		
		for (var i = 0, len = allItems .length; i < len; i++) {
			//console.log("i:");
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			itemNo = AUIGrid.getCellValue(myGridID, i, "itemNo");
			itemId = AUIGrid.getCellValue(myGridID, i, "itemId");
		}
		AUIGrid.removeRow(myGridID, rowIndexes);		//2023.07.03 comment. ctrl+v 시 row삭제오류  ->다시 원복		
		//fn_dcProc();		
	});

	AUIGrid.bind(myGridID, "addRow", function( event ) {

	});
	
  	
  	AUIGrid.bind(myGridID, "cellDoubleClick", function( event ) {
	
      if (event.dataField == 'itemNo'){		
		
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		findItem('/base/item-list', 0,event.rowIndex,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		
	    //fn_dcProc();
	   }
	});
  
	// keyDown 이벤트 바인딩
	AUIGrid.bind(myGridID, "keyDown", function (event) {
		if (event.keyCode == 45) { // Insert 키
			return false; // 기본 행위 안함.
		}
	});	

};


function findDataToServer(url) {
	let list = [];
	let itemId = $("#itemId").val(); 
	let itemNo = $("#itemNo").val();
	
	if (itemId === "" || itemId === null || itemId === 0){
		itemId = 0;
	}
	if (itemNo === "" || itemNo === null){
		itemNo = "";
	}
	//console.log("url:"+url);
	//console.log("itemId:"+itemId);
	//console.log("itemNo:"+itemNo);
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"itemId":itemId,
			"itemNo":itemNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.stockItemOuterNonDspList.length == 0){
				$("#iDiv_noDataPop").css("display","none");			
			}else{
				 
				for(i=0;i<data.stockItemOuterNonDspList.length;i++){
					//console.log(new Date(data.stockWrItemList[i].chkDate));
				    list.push({
						 idx:  data.stockItemOuterNonDspList[i].itemId
						,itemId: data.stockItemOuterNonDspList[i].itemId 
						,itemNo: data.stockItemOuterNonDspList[i].itemNo 
						,itemName: data.stockItemOuterNonDspList[i].itemName
						//,stockQty: data.stockItemOuterNonDspList[i].stockQty 
						,centerPrice: data.stockItemOuterNonDspList[i].centerPrice 
						,uptUserId: data.stockItemOuterNonDspList[i].uptUserId
						,uptUserName: data.stockItemOuterNonDspList[i].uptUserName
						,modified: data.stockItemOuterNonDspList[i].modified
						,memo1:  data.stockItemOuterNonDspList[i].memo1
						,makerName:  data.stockItemOuterNonDspList[i].makerName
						,className:  data.stockItemOuterNonDspList[i].className
						,factoryNo:  data.stockItemOuterNonDspList[i].factoryNo
						
					});
					
				}		
				
				AUIGrid.setGridData("#grid_wrap", list); 
				
				//숨겨진 input인 wrSeq(처리순번)이 있는경우 해당순번에 체크박스 체크해줌
				AUIGrid.setCheckedRowsByValue("#grid_wrap","wrSeq",$("#wrSeq").val()); 
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


// AUIGrid 의 현재 칼럼 레이아웃을 얻어 보관합니다.
// 데모에서는 HTML5의 localStrage 를 사용하여 보관합니다.
// 만약 DB 상에 보관하고자 한다면 해당 정보를 Ajax 요청으로 코딩하십시오.
function saveColumnLayout() {

	// 칼럼 레이아웃 정보 가져오기
	var columns = AUIGrid.getColumnLayout(myGridID);

	if (typeof (Storage) != "undefined") { // Check browser support
		var columnStr = JSON.stringify(columns);
		var rowPos = AUIGrid.getRowPosition(myGridID); // 수직 스크롤 값
		var hPos = AUIGrid.getProp(myGridID, "hScrollPosition"); // 수평 스크롤 값(픽셀)

		localStorage.setItem("auigridLayout", columnStr);
		localStorage.setItem("auigridRow", rowPos);
		localStorage.setItem("auigridCol", hPos);

		//alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");Ch
	} else {
		//alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
};

// 행 추가, 삽입
function addRow(grid,rowPos) {
	
	var item = new Object();
	var gridData = AUIGrid.getGridData(myGridID);
	
    item.dspNo = gridData.length+1;
 //   item.chkUserId = ''; // 처리아이디가 ''이 아니면 체크박스 체크 불가능한데 ''로 초기화 부분이 누락되서 추가 엿다가 체크불가가사라져서 주석처리

	AUIGrid.addRow(myGridID, item, rowPos);	
};



function addRow1(grid,rowPos) {
	var item = new Object();
	AUIGrid.addRow(myGridID, item, rowPos);	
};

function removeRow1() {
	AUIGrid.removeRow(myGridID, "selectedIndex");
};


//수정 삭제 해보자!!!!!!!!!!!!!!!
function updateDataToServer( url, workingType ) {
	
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);

	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemId", "itemNo"], "부품ID,품번 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemId", "itemNo"], "부품ID,품번 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}
	
	var data = {};
	
	if(addList.length > 0) data.stockItemOuterNonDspAdd = addList;
	else data.stockItemOuterNonDspAdd = [];
	if(updateList.length > 0) data.stockItemOuterNonDspUpdate = updateList;
	else data.stockItemOuterNonDspUpdate = [];
	if(removeList.length > 0) data.stockItemOuterNonDspRemove = removeList;
	else data.stockItemOuterNonDspRemove = [];

	data.workingType = workingType;
        
    console.log("url:"+url);    
    console.log("data:"+JSON.stringify(data));
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);
	        location.reload();
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

function checkItems() {
	
	// 추가된 행 아이템들(배열)
	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);
	 
	// 수정된 행 아이템들(배열) : 진짜 수정된 필드만 얻음.
	var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID);
	
	// 수정된 행 아이템들(배열) : 수정된 필드와 수정안된 필드 모두를 얻음.
	//var editedRowItems = AUIGrid.getEditedRowItems(myGridID); 
	
	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);
	
	var i, len, name, rowItem;
	var str = "";
	
	if(addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for(i=0, len=addedRowItems.length; i<len; i++) {
			rowItem = addedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for(i=0, len=editedRowItems.length; i<len; i++) {
			rowItem = editedRowItems[i]; // 행아이템
			
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for(i=0, len=removedRowItems.length; i<len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length); 
	
	
	if(str == "")
		str = "변경 사항 없음";
	
	alert(str);
}

//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	item = {
		itemId: rowItem.itemId,
		itemNo: rowItem.itemNo,
		itemName: rowItem.itemName,
		centerPrice: rowItem.centerPrice
		
		, makerName: rowItem.makerName
		, className: rowItem.className
		, factoryNo: rowItem.factoryNo
	};


	AUIGrid.updateRow(myGridID, item, "selectedIndex");	
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");

}

		
		
function auiCellEditingHandler(event) { 

	if (event.dataField == 'itemNo'){
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		if(event.oldValue == null || event.oldValue == '') {  //2024.03.21 supi 값이 없는 경우만 행추가
			addRow(myGridID,'last');  //부품찾은 후 행추가
		}
		
		findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	}
};		