
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#dmdYmd',
        format: 'yyyy-MM-dd'
    }
});
    
   
    
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	
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
		window.close();    //2023.10.04 popup 시
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

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 60, editable : false }
		//,{ dataField : "rlYmd",      headerText : "출고일자", width : 100, editable : false }
		//,{ dataField : "rlNo",      headerText : "출고번호", width : 100, editable : false }
		//,{ dataField : "rlSeq",      headerText : "출고순번", width : 60, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 100, editable : false} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명", width: 180, editable : false, style : "left"   } 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "rlCnt",      headerText : "출고수량"  , width : 60, editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		,{ dataField : "availableRiCnt",      headerText : "반입가능수량", editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right"   }		
		,{ dataField : "reqCnt",     headerText : "요청수량"  , width : 60, dataType: "numeric", formatString: "#,##0"  , style:"right auigrid-must-col-style"  }
		,{ dataField : "unitPrice",     headerText : "출고단가"  , width : 80,editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		,{ dataField : "sumPrice",     headerText : "합계"  , width : 80, editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		,{ dataField : "placeCustName",     headerText : "발주처명", editable : false }
		,{ dataField : "storageName",     headerText : "창고명", editable : false }
		,{ dataField : "memo1",     headerText : "비고1", editable : false, style : "left"  }
		//,{ dataField : "memo2",     headerText : "비고2" , editable : false, style : "left" }
		//,{ dataField : "riReqNo",     headerText : "반입요청번호" , editable : false ,visible : false }
	];
	
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
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID, footerLayout);


	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
};

function auiCellEditingHandler(event) {
	if (event.dataField == 'reqCnt' ) {
		var sumPrice = event.item.reqCnt * event.item.unitPrice; 
		AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);	
	}
	
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		if (event.item.reqCnt > event.item.availableRiCnt) {
			alert("요청수량이 반입가능수량보다 많습니다!");
			item = {
				reqCnt: event.item.availableRiCnt,
				sumPrice: event.item.availableRiCnt * event.item.unitPrice
			};
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		}
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};

		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;

//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
 	var mName = mCodeSel.attr('mname');
 	
 	
 	
 	
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
    var memo1 = $("#memo").val(); 
    //var memo2 = $("#memo2").val(); 
   
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
    //data.memo2 = memo2; 
    
  
    
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
					
					//$("#orderGroupId").val(orderGroupId);
					//$("#orderType").val(orderType);
					$("#orderTypeName").text(orderTypeName);   
					$("#custCode").val(custCode); 
					$("#custName").val(custName); 
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone); 
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
					$("#dataComCode").val(data.orderGroupList[i].comCode);  //2023.07.18 by dataCheck
				}		
				//findOrderGroupItem('/order/orderGroupItemList');
				findOrderGroupItem('/order/riReqItemTgList');  //2023.12.19 				
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
	            alert('조회에 실패했습니다. 추후 다시 시도해or.n'+x.responseText+')');
	        }
		}
	});
}

//품목 조회
function findOrderGroupItem(url) {
	var list = [];
	var orderGroupId = $("#orderGroupId").val();
	var workingType = "LIST";   //"RI_TARGET";
	
	var ordArr  = $("#ordArr").val();
	var seqArr  = $("#seqArr").val();
	
  
  
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
				alert("반입가능한 부품이 없습니다.");
				
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderGroupItemList.length;i++){
				    list.push({						  
						 orderNo: data.orderGroupItemList[i].orderNo 
						,orderSeq: data.orderGroupItemList[i].orderSeq 
						//,rlYmd: data.orderGroupItemList[i].rlYmd 
						//,rlNo: data.orderGroupItemList[i].rlNo
						//,rlSeq: data.orderGroupItemList[i].rlSeq
						,itemId: data.orderGroupItemList[i].itemId 
						,itemNo: data.orderGroupItemList[i].itemNo 
						,itemName: data.orderGroupItemList[i].itemName
						,itemNameEn: data.orderGroupItemList[i].itemNameEn 
						,rlCnt: data.orderGroupItemList[i].realReleaseCnt 
						,availableRiCnt: data.orderGroupItemList[i].availableRiCnt 
						,reqCnt: data.orderGroupItemList[i].availableRiCnt
						,unitPrice: data.orderGroupItemList[i].unitPrice 
						,sumPrice: data.orderGroupItemList[i].availableRiCnt * data.orderGroupItemList[i].unitPrice
						,memo1: data.orderGroupItemList[i].memo 						
						//,memo2: data.orderGroupItemList[i].memo2
						
						,placeCustName: data.orderGroupItemList[i].placeCustName
						,storageName: data.orderGroupItemList[i].storageName
						//,riReqNo: data.orderGroupItemList[i].riReqNo
						
						,makerName: data.orderGroupItemList[i].makerName
						,className: data.orderGroupItemList[i].className
						,factoryNo: data.orderGroupItemList[i].factoryNo
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
		
		
///요청전송
function reqSend(url){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var receiver = $('#receiver').val();
 	var memo = $('#memo').val();
 	var dmdYmd = $('#dmdYmd').val();
    var dmdTime= $(':radio[name="dmdTime"]:checked').val();
    var riWay= $(':radio[name="riWay"]:checked').val();
   	if (riWay =='기타') {
		riWay = $("#riWayEtc").val();
	}

    //var storageCode = "";
    //var custCode = "";
    
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	//var rlArr = ""
	//var seqArr = ""
	var odArr = "";
	var odSeqArr = "";
	var mm1Arr = "";
	//var mm2Arr = ""; 
	var cntArr = "";
	var errCnt = 0;	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		odNo = rowItem.item.orderNo;
		odSeq = rowItem.item.orderSeq;
		//rlNo = rowItem.item.rlNo;
		//rlSeq = rowItem.item.rlSeq;
		memo1 = rowItem.item.memo1;
		//memo2 = rowItem.item.memo2;
		reqCnt = rowItem.item.reqCnt;
		if(reqCnt == 0){
			errCnt = errCnt +1;
			break;		
		}
		
		if (typeof odNo == 'undefined' || odNo == null) {			odNo = "";		}
		if (typeof odSeq == 'undefined' || odSeq == null) {			odSeq = "";		}
		//if (typeof rlNo == 'undefined' || rlNo == null) {			rlNo = "";		}
		//if (typeof rlSeq == 'undefined' || rlSeq == null) {			rlSeq = "";		}
		if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
		//if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
		if (typeof reqCnt == 'undefined' || reqCnt == null) {			reqCnt = "";		}
		
		if (i == 0) {
			odArr = odNo;
			odSeqArr = odSeq;
			//rlArr = rlNo;
			//seqArr = rlSeq;
			mm1Arr = memo1;		
			//mm2Arr = memo2;
			cntArr = reqCnt;			
		}else{
			odArr = odArr + "^" +odNo;
			odSeqArr = odSeqArr + "^" +odSeq;
			//rlArr = rlArr + "^" +rlNo;
			//seqArr = seqArr + "^" +rlSeq;
			mm1Arr = mm1Arr + "^" +memo1;		
			//mm2Arr = mm2Arr + "^" +memo2;
			cntArr = cntArr + "^" +reqCnt;
		}
						
	}
	if (errCnt > 0) {
		alert("반입요청수량이 '0' 입니다.")
		return;
	}
    
    var data = new FormData();
   // var attaFile = $("#attaFile")[0];
    //var attaFile = $("input[name='attaFile']");
    //var files = attaFile[0].files;
    
    
    data.append("workingType", "ADD");
    data.append("orderGroupId", orderGroupId);
    data.append("receiver", receiver);
    data.append("memo1", memo);
    data.append("dmdYmd", dmdYmd);
    
    data.append("dmdTime", dmdTime);
    data.append("riWay", riWay);
    //data.append("attaFile", files[0]);
    //data.append("storageCode", storageCode);
    //data.append("custCode", custCode);
    //sub
    data.append("odArr", odArr);
    data.append("odSeqArr", odSeqArr);
    //data.append("rlArr", rlArr);
    //data.append("seqArr", seqArr);
    data.append("cntArr", cntArr);
    data.append("mm1Arr", mm1Arr);
    //data.append("mm2Arr", mm2Arr);
    
    //2023.07.18  hsg -검증데이터존재여부
    var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	data.append("dataComCode", dataComCode);
	        
    $.ajax({
        data : data,
        type : "POST",
        url : url,
        async: false,
        cache : false,
        contentType : false,
        //enctype: 'multipart/form-data',
        processData : false,
        success : function(data) {
        	//toastr.success("업로드 중~"); 
            //editor.insertImage(welEditable, data.url);
            //alert("업로드 중입니다.");
        	
        	
        	
        	//setTimeout(function() {  // 이미지 불러올때 작은사이즈 부터 불러오는 오류가 있어서 시간을 딜레이시킴. 10000 이하로 하는 경우 순서가 얽혔음. 추가로 엉키면 너 늘려야 할듯
        		alert(data.result_code+":"+data.result_msg);
		        //창닫고. 부모창reload
				//parent.jQuery.fancybox.close();
				//parent.location.reload(true);
				location.reload(true);

        	//}, 10000);
        	
        	
            
            

        }
    });

}  
		
