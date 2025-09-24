
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
	$("#receiverInfo").css("display","none");
	$("#senderInfo").css("display","none");
	
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	
		//창고목록
	commonFindStor("/base/storage-list", 1,'storCode','','','', 'Y', 'Y');


	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
	    window.close();    //2023.10.04 popup 시
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});

	//주문인 경우
	let orderGroupId = $("#orderGroupId").val();
	if (orderGroupId !=''){		
		findOrderGroup('/order/order-group-list');
	}	  
	
	if(lcd =='ㄱ121') //출고요청시 
	{
		$("#storCode").val(2); // 출고대기 창고의
		$("#rackCode").val(1); //1번랙 
		$("#rackName").val('출고대기랙'); //텍스트 출고대기랙 으로 초기화
	}
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 60, editable : false }
		//,{ dataField : "placeCustCode",      headerText : "발주처코드", editable : false }
		//,{ dataField : "placeCustName",      headerText : "발주처명", width : 100, editable : false }
		//,{ dataField : "storageCode",      headerText : "사용창고코드", width : 100, editable : false }
		//,{ dataField : "storageName",      headerText : "창고명", width : 100, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false
			,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '필수입력값입니다.'
		    }  } 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		,{ dataField : "itemName", headerText : "품명", width: 140, editable : false  } 
		,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "orderCnt",      headerText : "주문수량", width : 60, editable : false  ,dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		,{ dataField : "availableRlCnt",      headerText : "출고가능수량", editable : false , dataType: "numeric", formatString: "#,##0"  , style:"right"  }
		,{ dataField : "rlReqCnt",     headerText : "출고요청수량" ,dataType: "numeric", formatString: "#,##0"  ,style:"right  auigrid-must-col-style" }
		,{ dataField : "salePrice",     headerText : "판매단가", editable : false ,dataType: "numeric", formatString: "#,##0"  , style:"right " }
		,{ dataField : "sumPrice",     headerText : "합계", editable : false ,dataType: "numeric", formatString: "#,##0"  , style:"right" }
		,{ dataField : "memo1",     headerText : "비고1", editable : false }
		,{ dataField : "memo2",     headerText : "비고2" , editable : false}
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
		
		showStateColumn : true,
		
		//footer 노출
		showFooter: true,

		selectionMode: "multipleCells",
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
	//AUIGrid.setFooter(myGridID, footerLayout);

	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
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
	
};

function auiCellEditingHandler(event) {
	if (event.dataField == 'rlReqCnt' ) {
		var sumPrice = event.item.rlReqCnt * event.item.salePrice; 
		AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);	
	}
	
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
			
			
		if (event.item.rlReqCnt > event.item.availableRlCnt) {
			alert("출고요청수량이 출고가능수량보다 많습니다!");
			item = {
				rlReqCnt: event.item.availableRlCnt,
				sumPrice: event.item.availableRlCnt * event.item.salePrice
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
    
	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "salePrice", "rlReqCnt"], "품번, 수량, 견적단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "rlReqCnt", "salePrice"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
		
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
					orderYmd = data.orderGroupList[i].orderYmd;
					regUserName = data.orderGroupList[i].regUserName;
					
					pcReqYN = data.orderGroupList[i].pcReqYN;
					receiverCustName = data.orderGroupList[i].receiverCustName;
					receiverName = data.orderGroupList[i].receiverName;
					receiverTel = data.orderGroupList[i].receiverTel;
					pcReqReceiverAddr = data.orderGroupList[i].pcReqReceiverAddr;
					
					senderCustName = data.orderGroupList[i].senderCustName;
					senderName = data.orderGroupList[i].senderName;
					senderTel = data.orderGroupList[i].senderTel;
					senderAddr1 = data.orderGroupList[i].senderAddr1;
					
					///$("#orderGroupId").val(orderGroupId);
					$("#orderTypeName").text(orderTypeName); 
					$("#custCode").val(custCode); 
					$("#custName").val(custName); 
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone); 
					$("#supplyCustCode").val(supplyCustCode); 
					$("#supplyCustName").val(supplyCustName); 
					$("#supplyCustMgrName").val(supplyCustMgrName); 
					$("#supplyCustMgrPhone").val(supplyCustMgrPhone); 
					$("#carNo").text(carNo); 
					$("#vinNo").text(vinNo); 
					//$("#colorCode").val(colorCode); 
					$("#makerName_carType").text(makerCode + ' ' + carType); 
					//$("#carType").val(carType); 
					//$("#dcRate").val(dcRate); 
					//$("#dcDspType").val(dcDspType); 
					//$("#agencyFeeRate").val(agencyFeeRate); 
					//$("#marginRate").val(marginRate); 
					//$("#memo1").val(memo1); 
					//$("#memo2").val(memo2);
					$("#orderYmd").text(orderYmd); 
					$("#regUserName").text(regUserName);
					
					$("#dataComCode").val(data.orderGroupList[i].comCode);  //2023.07.14 by dataCheck
					//console.log("dcom:"+data.orderGroupList[i].comCode);
					if(data.orderGroupList[i].pcReqDeliWay == '방문수령')
					{
						$(':radio[name="rlWay"]:input[value="내사"]').prop('checked',true)
					}
					else if(data.orderGroupList[i].pcReqDeliWay == '택배')
					{
						$(':radio[name="rlWay"]:input[value="택배"]').prop('checked',true)
					}else if(data.orderGroupList[i].pcReqDeliWay == '화물')
					{
						$(':radio[name="rlWay"]:input[value="화물"]').prop('checked',true)
					}else if(data.orderGroupList[i].pcReqDeliWay == '일반배송')
					{
						$(':radio[name="rlWay"]:input[value="일반배송"]').prop('checked',true) 
					}else if(data.orderGroupList[i].pcReqDeliWay == '퀵/용차')
					{
						$(':radio[name="rlWay"]:input[value="퀵/용차"]').prop('checked',true) 
					}
					//$("#memo").val(data.orderGroupList[i].pcReqReceiverAddr || ''); 240827 yoonsang
					console.log("pcReqYN : " + pcReqYN);
					if(pcReqYN == 'Y'){
						$("#receiverInfo").css("display","block");
						$("#senderInfo").css("display","block");
						$("#receiverCustName").val(receiverCustName);
						$("#receiverName").val(receiverName);
						$("#receiverTel").val(receiverTel);
						$("#receiverAddr1").val(pcReqReceiverAddr);
						$("#memo").val(data.orderGroupList[i].memo1);
						
						$("#senderCustName").val(senderCustName);
						$("#senderName").val(senderName);
						$("#senderTel").val(senderTel);
						$("#senderAddr1").val(senderAddr1);
					}else{
						$("#receiverInfo").css("display","none");
						$("#senderInfo").css("display","none");
					}
				}		
				//findOrderGroupItem('/order/orderGroupItemList');				
				findOrderGroupItem('/order/rlReqItemTgList');
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
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
		 
			if (data.orderGroupItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderGroupItemList.length;i++){
				    list.push({						  
						 orderNo: data.orderGroupItemList[i].orderNo 
						,orderSeq: data.orderGroupItemList[i].orderSeq 
						//,placeCustCode: data.orderGroupItemList[i].placeCustCode 
						//,placeCustName: data.orderGroupItemList[i].placeCustName
						,itemId: data.orderGroupItemList[i].itemId 
						,itemNo: data.orderGroupItemList[i].itemNo 
						,itemName: data.orderGroupItemList[i].itemName
						,itemNameEn: data.orderGroupItemList[i].itemNameEn 
						,orderCnt: data.orderGroupItemList[i].orderCnt 
						,availableRlCnt: data.orderGroupItemList[i].availableRlCnt 
						,rlReqCnt: data.orderGroupItemList[i].availableRlCnt
						,salePrice: data.orderGroupItemList[i].salePrice 
						,sumPrice: data.orderGroupItemList[i].availableRlCnt * data.orderGroupItemList[i].salePrice 
						,memo1: data.orderGroupItemList[i].memo 						
						,memo2: data.orderGroupItemList[i].memo2 
						//,storageCode: data.orderGroupItemList[i].storageCode
						//,storageName: data.orderGroupItemList[i].storageName
												
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
function rlReqSend(url){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var rlMgr = $('#rlMgr').val();
 	var memo = $('#memo').val();
 	var dmdYmd = $('#dmdYmd').val();
    var lastPickParts = $("#lastPickParts").val();
    var dmdTime= $(':radio[name="dmdTime"]:checked').val();
    var rlWay= $(':radio[name="rlWay"]:checked').val();
    
    var storCode = $('#storCode').val();
    var rackCode = $('#rackCode').val();
    
    var stdClType = $('#stdClType').val(); //230705
    //var storageCode = "";
    //var custCode = "";
    
    //필수값
    if (rackCode == '') {
		alert("출고랙을 선택하세요");
		return;
	}
    
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	

	var rowItem;
	var reqArr = ""
	var rseArr = ""
	var ordArr = ""
	var seqArr = "";
	var cntArr = "";
	var mm1Arr = "";
	var mm2Arr = "";
	var errCnt = 0;	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		rlReqNo = rowItem.item.rlReqNo;
		reqSeq = rowItem.item.reqSeq;
		orderNo = rowItem.item.orderNo;
		orderSeq = rowItem.item.orderSeq;
		rlReqCnt = rowItem.item.rlReqCnt;
		if(rlReqCnt == 0){
			errCnt = errCnt +1;
			break;		
		}
		
		memo1 = rowItem.item.memo1;
		memo2 = rowItem.item.memo2;
		
		if (typeof rlReqNo == 'undefined' || rlReqNo == null) {			rlReqNo = "";		}
		if (typeof reqSeq == 'undefined' || reqSeq == null) {			reqSeq = "";		}
		if (typeof orderNo == 'undefined' || orderNo == null) {			orderNo = "";		}
		if (typeof orderSeq == 'undefined' || orderSeq == null) {			orderSeq = "";		}
		if (typeof rlReqCnt == 'undefined' || rlReqCnt == null) {			rlReqCnt = "";		}
		if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
		if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
		
		if (i == 0) {
			reqArr = rlReqNo;
			rseArr = reqSeq;
			ordArr = orderNo;		
			seqArr = orderSeq;
			cntArr = rlReqCnt;
			mm1Arr = memo1;
			mm2Arr = memo2;			
		}else{
			reqArr = reqArr + "^" +rlReqNo;
			rseArr = rseArr + "^" +reqSeq;
			ordArr = ordArr + "^" +orderNo;		
			seqArr = seqArr + "^" +orderSeq;
			cntArr = cntArr + "^" +rlReqCnt;
			mm1Arr = mm1Arr + "^" +memo1;
			mm2Arr = mm2Arr + "^" +memo2;
		}
				
		
	}
	if (errCnt > 0) {
		alert("출고요청수량이 '0' 입니다.")
		return;
	}

	var data = {};
    data.workingType = "ADD";
    //master
	data.orderGroupId = orderGroupId;
	data.rlMgr = rlMgr;
	data.memo = memo;
	data.dmdYmd = dmdYmd;
	data.dmdTime = dmdTime;
	data.lastPickParts = lastPickParts;
	data.rlWay = rlWay;
	
	
	//sub
	data.reqArr = reqArr;   //요천번호 
	data.rseArr = rseArr;    //요청순번
	data.ordArr = ordArr;    //주문번호
	data.seqArr = seqArr;    //주문순번
	data.cntArr = cntArr;    //발주수량
	data.mm1Arr = mm1Arr;    //메모1
	data.mm2Arr = mm2Arr;    //메모2
	
	data.stdClType = stdClType; 
    var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	
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
			"rlMgr" : rlMgr,
			"memo1" : memo,
			"dmdYmd" : dmdYmd,
			"dmdTime" : dmdTime,
			"lastPickParts" : lastPickParts,
			"rlWay" : rlWay,			
			//"storageCode" : storageCode,
			//"custCode" : custCode,
						
			"reqArr" : reqArr,   //요천번호 
			"rseArr" : rseArr,    //요청순번
			"ordArr" : ordArr,    //주문번호
			"seqArr" : seqArr,    //주문순번
			//"cusArr" : cusArr,    //발주거래처코드
			"cntArr" : cntArr    //발주수량
			,"mm1Arr" : mm1Arr    //메모1
			,"mm2Arr" : mm2Arr    //메모2	   
			,"storageCode" : storCode
			,"rackCode" : rackCode
			,"stdClType" : stdClType
			,"dataComCode" : dataComCode  //2023.07.14 			
		},
	    success: function(data) {
			alert(data.result_code+": "+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}  
		
//함수호출하는데 함수가 없어서 일단 빈껍데기 만들어서 에러 지움		
function resetRackInfo()
{
	
}