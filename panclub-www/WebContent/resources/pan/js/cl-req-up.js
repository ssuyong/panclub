
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

    
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		
	/*	 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
		console.log("닫기");
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});
	*/
	$("#btnClose").click(function(){
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	
	//주문인 경우
	let orderGroupId = $("#orderGroupId").val();
	if (orderGroupId !=''){		
		findOrderGroup('/order/order-group-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	var clTypeList = ["", "보험", "일반"];

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "clType",      headerText : "청구구분", width : 80, editable : false, visible : false,
			 renderer: {
				type: "DropDownListRenderer",
				list: clTypeList,
				disabledFunction: function (rowIndex, columnIndex, value, item, dataField) {
					// 행 아이템의 position 이 이사 라면 비활성화 처리
					if ((item.clType == "보험" || item.clType == "일반") && isEmpty(item.orderNo) == false  ) {
						return true;
					}
					return false;
				}
			} }
		,{ dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 56, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 100, editable : false}
		,{ dataField : "itemNo",      headerText : "품번*", width : 140 , style : "left"
			//,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
			//        show : true,
			//        tooltipHtml : '필수입력값입니다.'
			//    }
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
						createItemGrid(columnLayoutItem);
						dialogItem.dialog("open");
					}
				}  
		} 
		,{ dataField : "itemName", headerText : "품명", width: 160, editable : false , style : "left"  } 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "cnt",     headerText : "수량*", width : 56,  dataType: "numeric",  formatString: "#,##0"  , style:"right" }
		,{ dataField : "unitPrice",     headerText : "단가*", width : 100,  dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "합계", width : 100, editable : false, dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right" }
		,{ dataField : "memo1",     headerText : "비고1", editable : false, style : "left"  }
		,{ dataField : "memo2",     headerText : "비고2" , editable : false, style : "left" }
	];

// 푸터 설정
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {
		dataField: "cnt",
		positionField: "cnt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "unitPrice",
		positionField: "unitPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	},{
		dataField: "salePrice",
		positionField: "salePrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "sumPrice",
		positionField: "sumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}];
		
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false, 
		
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);

	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		console.log("aa");
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	
};

function auiCellEditingHandler(event) { 
	
	if (event.dataField == 'itemNo'){
		//setStartSpinner();
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		addRow(myGridID,'last');  //부품찾은 후 행추가
		
		findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	    fn_dcProc();
	    
	}else if (event.dataField == 'cnt' || event.dataField == 'unitPrice' ) {
		fn_dcProc();
	}

};

		
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



// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	
	var estiNo = $("#estiNo").val();  
    var estiType = $(':radio[name="estiType"]:checked').val();
    var custCode = $("#custCode").val(); 
    var custMgrName = $("#custMgrName").val(); 
    var custMgrPhone = $("#custMgrPhone").val(); 
    var supplyCustCode = $("#supplyCustCode").val(); 
    var supplyCustMgrName = $("#supplyCustMgrName").val(); 
    var supplyCustMgrPhone = $("#supplyCustMgrPhone").val(); 
    var carNo = $("#carNo").val(); 
    var vinNo = $("#vinNo").val(); 
    var makerCode = $("#makerCode").val(); 
    var colorCode = $("#colorCode").val(); 
    var carType = $("#carType").val(); 
    var dcRate = $("#dcRate").val(); 
    var dcDspType =  $(':radio[name="dcDspType"]:checked').val();
    var agencyFeeRate = $("#agencyFeeRate").val(); 
    var marginRate = $("#marginRate").val(); 
    var memo1 = $("#memo1").val(); 
    var memo2 = $("#memo2").val(); 
   
    //필수값 체크
    if (custCode == '') {	alert("판매거래처코드는 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	}

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);    
    
	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "salePrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "cnt", "salePrice"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
		
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}
	
	var data = {};
	
	if(addList.length > 0) data.estiItemAdd = addList;
	else data.estiItemAdd = [];
	
	if(updateList.length > 0) data.estiItemUpdate = updateList;
	else data.estiItemUpdate = [];
	
	if(removeList.length > 0) data.estiItemRemove = removeList;
	else data.estiItemRemove = [];

    data.workingType = workingType;
	data.estiNo = estiNo;  
    data.estiType = estiType; 
    data.custCode = custCode; 
    data.custMgrName = custMgrName; 
    data.custMgrPhone = custMgrPhone; 
    data.supplyCustCode = supplyCustCode; 
    data.supplyMgrName = supplyCustMgrName; 
    data.supplyMgrPhone = supplyCustMgrPhone; 
    data.carNo = carNo; 
    data.vinNo = vinNo; 
    data.makerCode = makerCode; 
    data.colorCode = colorCode; 
    data.carType = carType; 
    data.dcRate = dcRate; 
    data.dcDspType = dcDspType; 
    data.agencyFeeRate = agencyFeeRate; 
    data.marginRate = marginRate; 
    data.memo1 = memo1; 
    data.memo2 = memo2; 
    
    //console.log("data:"+JSON.stringify(data));
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert("성공:"+data.success);
	        console.log("data.estiNo:"+data.estiNo);
	        alert(data.result_code+":"+data.result_msg);
	        //alert(data.estiNo)
	        //location.reload();
	        
	    
	        //post형식으로 페이지 데이터 조회
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'estiNo');
		    obj.setAttribute('value', data.estiNo);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/esti-up');
		    document.body.appendChild(f);
		    f.submit();
		
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};


// 추가, 수정, 삭제 된 아이템들 확인하기
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
	
	
	// 하단에 정보 출력.
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length); 
	
	
	if(str == "")
		str = "변경 사항 없음";
	
	alert(str);
}




function removeRow() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID, "selectedIndex");
};
	

//  조회
function findOrderGroup(url) {
	var orderGroupId = $("#orderGroupId").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"orderGroupId":orderGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderGroupList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderGroupList.length;i++){
					orderGroupId = data.orderGroupList[i].orderGroupId;
					orderType = data.orderGroupList[i].orderType;
				    releaseReqYmd = data.orderGroupList[i].releaseReqYmd; 
					custCode = data.orderGroupList[i].custCode; 
					custName = data.orderGroupList[i].custName; 
					custMgrName = data.orderGroupList[i].custMgrName;
					custMgrPhone = data.orderGroupList[i].custMgrPhone; 
					supplyCustCode = data.orderGroupList[i].supplyCustCode; 
					supplyCustName = data.orderGroupList[i].supplyCustName; 
					supplyCustMgrName = data.orderGroupList[i].supplyCustMgrName; 
					supplyCustMgrPhone = data.orderGroupList[i].supplyCustMgrPhone; 
					carNo = data.orderGroupList[i].carNo; 
					vinNo = data.orderGroupList[i].vinNo; 
					colorCode = data.orderGroupList[i].colorCode; 
					makerCode = data.orderGroupList[i].makerCode; 
					carType = data.orderGroupList[i].carType; 
					dcRate = data.orderGroupList[i].dcRate; 
					dcDspType = data.orderGroupList[i].dcDspType; 
					agencyFeeRate = data.orderGroupList[i].agencyFeeRate; 
					marginRate = data.orderGroupList[i].marginRate; 
					memo1 = data.orderGroupList[i].memo1; 
					memo2 = data.orderGroupList[i].memo2; 
					
					orderTypeName = data.orderGroupList[i].orderTypeName;
					regUserName = data.orderGroupList[i].regUserName;
					orderYmd = data.orderGroupList[i].orderYmd;
					
					insure1Code = data.orderGroupList[i].insure1Code;
					insure1Name = data.orderGroupList[i].insure1Name;
    				insure1MgrName = data.orderGroupList[i].insure1MgrName;
    				insure1MgrPhone = data.orderGroupList[i].insure1MgrPhone;
    				insure2Code = data.orderGroupList[i].insure2Code;
    				insure2Name = data.orderGroupList[i].insure2Name;
    				insure2MgrName = data.orderGroupList[i].insure2MgrName;
    				insure2MgrPhone = data.orderGroupList[i].insure2MgrPhone;
    				
    				insure1AcceptNo = data.orderGroupList[i].insure1AcceptNo;
    				insure1AcciRate = data.orderGroupList[i].insure1AcciRate;
    				insure2AcceptNo = data.orderGroupList[i].insure2AcceptNo;
    				insure2AcciRate = data.orderGroupList[i].insure2AcciRate;
    				
					//$("#orderGroupId").text(orderGroupId);
					//$("#orderType").val(orderType); 
					$("#orderTypeName").text(orderTypeName);  
					//$("#custCode").val(custCode); 
					//$("#custName").val(custName); 
					//$("#custMgrName").val(custMgrName);
					//$("#custMgrPhone").val(custMgrPhone); 
					//$("#supplyCustCode").val(supplyCustCode); 
					//$("#supplyCustName").val(supplyCustName); 
					//$("#supplyCustMgrName").val(supplyCustMgrName); 
					//$("#supplyCustMgrPhone").val(supplyCustMgrPhone); 
					$("#carNo").text(carNo); 
					$("#vinNo").text(vinNo); 
					//$("#colorCode").val(colorCode); 
					//$("#makerCode").val(makerCode); 
					//$("#carType").val(carType);
					$("#makerName_carType").text(makerCode + ' ' + carType);   
					//$("#dcRate").val(dcRate); 
					//$("#dcDspType").val(dcDspType); 
					//$("#agencyFeeRate").val(agencyFeeRate); 
					//$("#marginRate").val(marginRate); 
					//$("#memo1").val(memo1); 
					//$("#memo2").val(memo2); 
					$("#orderYmd").text(orderYmd); 
					$("#regUserName").text(regUserName);
					
					if ( insure1Code != '') {	$("#insure1Info").text(insure1Name + '/' + insure1AcceptNo + '/' + insure1AcciRate);	}
					if ( insure2Code != '') {	$("#insure2Info").text(insure2Name + '/' + insure2AcceptNo + '/' + insure2AcciRate);	}
					
					/*
					if (isEmpty(insure1Code) == true) {
						alert("보험사 정보가 등록안된 주문은 청구요청을 할 수 없습니다.");
						parent.jQuery.fancybox.close();
						return;
					}
					*/
				}		
				//findOrderGroupItem('/order/orderGroupItemList');
				findOrderGroupItem('/order/clReqItemTgList');  //2023.12.19 			
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

//품목 조회
function findOrderGroupItem(url) {
	var list = [];
	var orderGroupId = $("#orderGroupId").val();
	var workingType = "LIST";    //"CL_TARGET";  //청구대상
	
	var ordArr  = $("#ordArr").val();
	var seqArr  = $("#seqArr").val();
    console.log("workingType:"+workingType);
   // console.log("a:"+seqArr);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"orderGroupId":orderGroupId,
			"ordArr":ordArr,
			"seqArr":seqArr		
			,"workingType":workingType	
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderGroupItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				var clType = "";
				var clTypeInsure = "";	
				var clTypeGeneral = "";
				for(i=0;i<data.orderGroupItemList.length;i++){
				    list.push({						  
						 orderNo: data.orderGroupItemList[i].orderNo 
						,orderSeq: data.orderGroupItemList[i].orderSeq 
						,itemId: data.orderGroupItemList[i].itemId 
						,itemNo: data.orderGroupItemList[i].itemNo 
						,itemName: data.orderGroupItemList[i].itemName
						,itemNameEn: data.orderGroupItemList[i].itemNameEn 
						,cnt: data.orderGroupItemList[i].cnt 
						,unitPrice: data.orderGroupItemList[i].unitPrice 
						,sumPrice: data.orderGroupItemList[i].cnt * data.orderGroupItemList[i].unitPrice
						,memo1: data.orderGroupItemList[i].memo 						
						,memo2: data.orderGroupItemList[i].memo2
						
						,clType: data.orderGroupItemList[i].clType 
					});
					
					//청구유형 노출용도
					clType = data.orderGroupItemList[i].clType;
					if (clType == '보험' && clTypeInsure == '') {		clTypeInsure = '보험';					}
					if (clType == '일반' && clTypeGeneral == '') {		clTypeGeneral = '일반';					}
				}
				//청구유형
				var clTypeInfo = "";
				if (clTypeInsure != '' && clTypeGeneral != '') {	clTypeInfo = clTypeInsure + '+' + clTypeGeneral; }
				if (clTypeInsure != '' && clTypeGeneral == '') {	clTypeInfo = clTypeInsure; }
				if (clTypeInsure == '' && clTypeGeneral != '') {	clTypeInfo = clTypeGeneral; }
				$("#clTypeInfo").text(clTypeInfo);
		
				AUIGrid.setGridData("#grid_wrap", list);
			}
			fn_dcProc();
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
		
		
///요청전송
function reqSend(url){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var clType  = $('#clType').text();    
 	
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = ""
	var seqArr = ""
	var mm1Arr = "";
	var mm2Arr = ""; 
	var cntArr = "";
	var itemArr = "";
	var unitPriceArr = "";
	var clTypeArr = "";
	
	var insure1DcRateArr='0';
	var insure1ClPriArr='0';
	var insure2DcRateArr='0';
	var insure2ClPriArr='0';
	var centerPriArr='0'; 
	var sPriArr='0'; 
	 
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		orderNo = rowItem.item.orderNo;
		orderSeq = rowItem.item.orderSeq;
		memo1 = rowItem.item.memo1;
		memo2 = rowItem.item.memo2;
		clCnt = rowItem.item.cnt;
		itemId = rowItem.item.itemId;
		unitPrice = rowItem.item.unitPrice;
		clType  = rowItem.item.clType;
		
		if (isEmpty(itemId) == false) {
			//clType = rowItem.item.clType;
			
			/*디테일에서는 필요없음.
			//청구구분이 선택안된 경우
			if (isEmpty(clType) == true) {
				alert("청구구분을 선택안한 품목이 있습니다.");	 
	    		return;
	    	}
	    	*/
			//console.log("clType: "+clType); 
			//console.log("itemId:+"+itemId);
			//console.log("itemId:+"+isEmpty(itemId));
			if (isEmpty(itemId) == false) {
				if (typeof orderNo == 'undefined' || orderNo == null) {			orderNo = "";		}
				if (typeof orderSeq == 'undefined' || orderSeq == null) {			orderSeq = "";		}
				if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
				if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
				if (typeof clCnt == 'undefined' || clCnt == null) {			clCnt = "";		}
				if (typeof itemId == 'undefined' || itemId == null) {			itemId = "";		}
				if (typeof unitPrice == 'undefined' || unitPrice == null) {			unitPrice = "";		}
				if (typeof clType == 'undefined' || clType == null) {			clType = "";		}
				
				if (i == 0) {
					ordArr = orderNo;
					seqArr = orderSeq;
					mm1Arr = memo1;		
					mm2Arr = memo2;
					cntArr = clCnt;			
					itemArr = itemId;
					unitPriceArr = unitPrice;
					clTypeArr = clType;
					
					//insure1DcRateArr='';
					//insure1ClPriArr='';
					//insure2DcRateArr='';
					//insure2ClPriArr='';
					//centerPriArr='';
				}else{
					ordArr = ordArr + "^" +orderNo;
					seqArr = seqArr + "^" +orderSeq;
					mm1Arr = mm1Arr + "^" +memo1;		
					mm2Arr = mm2Arr + "^" +memo2;
					cntArr = cntArr + "^" +clCnt;
					itemArr = itemArr + "^" +itemId;
					unitPriceArr = unitPriceArr + "^" +unitPrice;
					clTypeArr = clTypeArr + "^" + clType;
					
					insure1DcRateArr= insure1DcRateArr + "^0"; 
					insure1ClPriArr= insure1ClPriArr + "^0";
					insure2DcRateArr= insure2DcRateArr + "^0";
					insure2ClPriArr= insure2ClPriArr + "^0";
					centerPriArr= centerPriArr + "^0";					
					sPriArr= sPriArr + "^0"; 

										
				}
			}	
		}						
	}
    
	/*
	var data = {};
    data.workingType = "ADD";
    //master
	data.orderGroupId = orderGroupId;
	
	//sub
	data.ordArr = ordArr;    //주문번호
	data.seqArr = seqArr;    //주문순번
	data.cntArr = cntArr;    //수량
	data.itemArr = itemArr;    //수량
	data.mm1Arr = mm1Arr;    //수량
	data.mm2Arr = mm2Arr;    //수량
	data.uPriArr = unitPriceArr;    //수량
	data.clTypeArr = clTypeArr; //청구구분
	*/
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "ADD",
			"orderGroupId" : orderGroupId,
			"clType" : clType,
						
			"ordArr" : ordArr,    //주문번호
			"seqArr" : seqArr,    //주문순번
			"itemArr" : itemArr,    //발주거래처코드
			"cntArr" : cntArr,    //발주수량    			
			"mm1Arr" : mm1Arr,   //요천번호 
			"mm2Arr" : mm2Arr,    //요청순번
			"uPriArr" : unitPriceArr
			//,"clTypeArr" : clTypeArr
			,"insure1DcRateArr": insure1DcRateArr 
			,"insure1ClPriArr": insure1ClPriArr
			,"insure2DcRateArr":  insure2DcRateArr
			,"insure2ClPriArr":  insure2ClPriArr
			,"centerPriArr":  centerPriArr
			,"sPriArr":  sPriArr
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			parent.location.href = "/order/cl-req-item-list?orderGroupId="+orderGroupId+"&clReqNo="+data.clReqNo;
			//location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}  
	
	
// 행 추가, 삽입
function addRow(grid,rowPos) {
	//console.log("addRow in");
	var item = new Object();
	var gridData = AUIGrid.getGridData(myGridID);
	
	AUIGrid.addRow(myGridID, item, rowPos);	
};		
