
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

/*
var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#useDmdYmd',
        format: 'yyyy-MM-dd'
    }
});
    
   
var datepicker2 = new tui.DatePicker('#wrapper2', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#moveSchYmd',
        format: 'yyyy-MM-dd'
    }
});
*/    
    
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
	*/
	var pageMoveYN = $("#pageMoveYN").val();
	 
	 function disableButtons() {
        $("#btnReg").prop("disabled", true);
        $("#btnDel").prop("disabled", true);
        $("#btnDateChange").prop("disabled", true);
    }
	 if (pageMoveYN == "Y") {
        disableButtons();
    }
	$("#btnClose").click(function(){
		//console.log("닫기");
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	/*
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});
	*/
	$("#btnDel").click(function(){
		if (confirm("삭제되면 복구가 불가능 합니다. 삭제하시겠습니까?")){
			updateDataToServer("/logis/whAdd", "DEL");
		}
	});
	

	//입고번호가  존재하는 경우 
	let whNo = $("#whNo").text();
	if (whNo !=''){		
		//console.log("whNo ::"+ whNo);
		
		findReq('/logis/wh-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [
		{ dataField: "idx", headerText: "idx", width: 100, editable: false, visible: false }		 
		 ,{ dataField : "whNo",      headerText : "입고번호", width : 100, editable : false }
		,{ dataField : "whSeq",      headerText : "입고순번", width : 60, editable : false }
		,{ dataField : "placeYmd",      headerText : "발주일자", width : 100, editable : false }
		,{ dataField : "placeNo",      headerText : "발주번호", width : 100, editable : false }
		,{ dataField : "custOrderNo",      headerText : "거래처오더번호", width : 100, editable : false }
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID", width : 100, editable : false }	
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 80, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
		,{ dataField : "itemNo",      headerText : "품번", width : 140, editable : false} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
		,{ dataField : "itemName", headerText : "품명", width: 200, editable : false  } 
		
		
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "placeCnt",      headerText : "발주수량", width : 60, dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false  }
		,{ dataField : "whCnt",     headerText : "입고수량",  width : 60,dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		,{ dataField : "whUnitPrice",     headerText : "입고가", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		,{ dataField : "whSumPrice",     headerText : "합계(VAT제외)", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		,{ dataField : "placeRegUserId",     headerText : "요청자", editable : false }
		,{ dataField : "whRegUserId",     headerText : "처리자" , editable : false}
		,{ dataField : "payStatus",     headerText : "결제상태" , editable : false}
		,{ dataField : "memo1",     headerText : "비고1" , editable : false, style : "left" }
	];
	
	// 푸터 설정
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {		dataField: "placeCnt",		positionField: "placeCnt",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}, 
	   {		dataField: "whCnt",		positionField: "whCnt",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}, 
	   {		dataField: "whUnitPrice",		positionField: "whUnitPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}, 
	   {		dataField: "whSumPrice",		positionField: "whSumPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}
	   
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		rowIdField: "idx",
		editable : true,			

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		showStateColumn : true,
		
		//footer 노출
		showFooter: true,
		//independentAllCheckBox: true,
		
		// 셀 선택모드 (기본값: singleCell)
		//selectionMode: "multipleCells",

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
	
	/*
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
		if (event.checked) {
			// name 의 값들 얻기
			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "whNo");
			// Anna 제거하기
			uniqueValues.splice(!uniqueValues.indexOf(""), 1);
			AUIGrid.setCheckedRowsByValue(event.pid, "whNo", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "whNo", []);
		}
	});
	*/

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
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
		
		if (event.dataField == 'glogen' || event.dataField == 'partsmall' || event.dataField == 'halla' || event.dataField == 'sk' || event.dataField == 'center1' 
		|| event.dataField == 'center2' || event.dataField == 'deko' || event.dataField == 'eapsEU' || event.dataField == 'eapsUSA'){
			
			/*
			var glogen = event.item.glogen;
			var partsmall = event.item.partsmall;
			var halla = event.item.halla;
			var sk = event.item.sk;
			var center1 = event.item.center1;
			var center2 = event.item.center2;
			var deko = event.item.deko;
			var eapsEU = event.item.eapsEU;
			var eapsUSA = event.item.eapsUSA;	
			
			var maxCol = "";			 
			if (glogen>=partsmall) {
				maxCol = "glogen";
			} else if () {
				
			}
			*/
			var placeArr = [];
			var maxi = 0;
			
			placeArr[0] = event.item.glogen;
			placeArr[1] = event.item.partsmall;
			placeArr[2] = event.item.halla;
			placeArr[3] = event.item.sk;
			placeArr[4] = event.item.center1;
			placeArr[5] = event.item.center2;
			placeArr[6] = event.item.deko;
			placeArr[7] = event.item.eapsEU;
			placeArr[8] = event.item.eapsUSA;	
			
			for (var i = 0; i < placeArr.length; i++) {
				if (i == 0 ){
					maxi = 0;
					maxDC = placeArr[i];
				}else{
					if (maxDC < placeArr[i]) {
						maxi = i;
						maxDC = placeArr[i];		
					}	
				} 				
			}  
			
			if (maxi ==0) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "ㄱ001" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "글로젠" }, event.rowIndex);
			} else if (maxi ==1) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "ㅍ008" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "파츠몰" }, event.rowIndex);
			} else if (maxi ==2) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "ㄱ001" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "한라" }, event.rowIndex);
			} else if (maxi ==3) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "ㅎ001" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "SK" }, event.rowIndex);
			} else if (maxi ==4) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "?" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "센터1" }, event.rowIndex);
			} else if (maxi ==5) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "?" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "센터2" }, event.rowIndex);
			} else if (maxi ==6) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "D001" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "DEKO" }, event.rowIndex);
			} else if (maxi ==7) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "E002" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "EAPS(유럽)" }, event.rowIndex);
			} else if (maxi ==8) {
				AUIGrid.updateRow(myGridID, { "placeCustCode": "E001" }, event.rowIndex);
				AUIGrid.updateRow(myGridID, { "placeCustName": "EAPS(미국)" }, event.rowIndex);
			}

			//$("#pop_itemNo").val(event.value);
			//$("#pop_itemName").val();
			//findItem('/base/item-list');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
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


/*
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
	       // console.log("data.estiNo:"+data.estiNo);
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
*/

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
	

// 마스터 조회
function findReq(url) {
	var whNo = $("#whNo").text();
	//console.log("srno:"+storageUseReqNo);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"whNo":whNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.whList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
				//console.log("data:"+JSON.stringify(data));	
				for(i=0;i<data.whList.length;i++){
					whNo = data.whList[i].whNo;
					regUserName = data.whList[i].regUserName;
				    custName = data.whList[i].custName; 
					//price = (data.whList[i].price*1.1).toLocaleString() ; 
					price = data.whList[i].sumPrice.toLocaleString(); 
					payStatus = data.whList[i].payStatus; 
					payAmt = data.whList[i].payAmt;
					
					$("#whNo").text(whNo);
					$("#regUserName").text(regUserName); 
					$("#custName").text(custName); 
					$("#price").text(price); 
					$("#payStatus").text(payStatus);
					$("#payAmt").text(payAmt); 
					
				}		
				findRegItem('/logis/wh-item-list');				
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

//요청 품목 조회
function findRegItem(url) {
	//console.log("initem");
	var list = [];
	var whNo = $("#whNo").text();
	//console.log("aa:"+storageUseReqNo);
	var workingType = "LIST";
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
   // console.log("a:"+ordArr);
   // console.log("a:"+seqArr);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType,
			"whNo":whNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){ 
			if (data.whItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.whItemList.length;i++){
				    list.push({
					    idx: i							  
						 ,whNo: data.whItemList[i].whNo
						,whSeq: data.whItemList[i].whSeq  
						,placeYmd: data.whItemList[i].placeYmd  
						,placeNo: data.whItemList[i].placeNo 
						,custOrderNo: data.whItemList[i].custOrderNo 
						,orderGroupId: data.whItemList[i].orderGroupId 
						,makerCode: data.whItemList[i].makerCode 
						,itemId: data.whItemList[i].itemId 
						,itemNo: data.whItemList[i].itemNo 
						,itemName: data.whItemList[i].itemName
						,itemNameEn: data.whItemList[i].itemNameEn 
						,placeCnt: data.whItemList[i].placeCnt 
						,whCnt: data.whItemList[i].cnt
						,whUnitPrice: data.whItemList[i].whUnitPrice 
						,whSumPrice: data.whItemList[i].whSumPrice
						,placeRegUserId: data.whItemList[i].placeRegUserId 
						,whRegUserId: data.whItemList[i].regUserId
						,payStatus: data.whItemList[i].payStatus 						
						,memo1: data.whItemList[i].memo1 
						
						,makerName: data.whItemList[i].makerName 
						,className: data.whItemList[i].className 
						,factoryNo: data.whItemList[i].factoryNo 
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
		
		
///창고사용요청전송
function storageUseReqSend(url){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var storageMgr = $('#storageMgr').val();
 	var memo1 = $('#memo1').val();
 	var useDmdYmd = $('#useDmdYmd').val();
 	var moveSchYmd = $('#moveSchYmd').val();

 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var ordArr = "";
	var seqArr = "";
	var scdArr = "";   // 창고코드배열 
	var cntArr
	var mm1Arr = "";
	var mm2Arr = "";
	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		orderNo = rowItem.item.orderNo;
		orderSeq = rowItem.item.orderSeq;
		storageCode = rowItem.item.storageCode;
		storageUseCnt = rowItem.item.storageUseCnt;
		memo1 = rowItem.item.memo1;
		memo2 = rowItem.item.memo2;		
		
		if (typeof orderNo == 'undefined' || orderNo == null) {			orderNo = "";		}
		if (typeof orderSeq == 'undefined' || orderSeq == null) {			orderSeq = "";		}
		if (typeof storageCode == 'undefined' || storageCode == null) {			storageCode = "";		}
		if (typeof storageUseCnt == 'undefined' || storageUseCnt == null) {			storageUseCnt = "";		}
		if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
		if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
		
		if (i == 0) {
			ordArr = orderNo;		
			seqArr = orderSeq;
			scdArr = storageCode;
			cntArr = storageUseCnt;
			mm1Arr = memo1;						
			mm2Arr = memo2;
		}else{
			ordArr = ordArr + "^" +orderNo;		
			seqArr = seqArr + "^" +orderSeq;
			scdArr = scdArr + "^" +storageCode;
			cntArr = cntArr + "^" +storageUseCnt;
			mm1Arr = mm1Arr + "^" +memo1;
			mm2Arr = mm2Arr + "^" +memo2;
		}

	}

	var data = {};
    data.workingType = "ADD";
    //master
	data.orderGroupId = orderGroupId;
	data.storageMgr = storageMgr;
	data.memo1 = memo1;
	data.useDmdYmd = useDmdYmd;
	data.moveSchYmd = moveSchYmd;
	
	//sub
	data.ordArr = ordArr;    //주문번호
	data.seqArr = seqArr;    //주문순번
	data.scdArr = scdArr;    //창고코드
	data.cntArr = cntArr;  
	data.mm1Arr = mm1Arr;    //메모1코드
	data.mm2Arr = mm2Arr;    //메모2코드
    //console.log("url:"+url);
   // console.log("JSON.stringify(data):"+JSON.stringify(data));
    
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
			"storageMgr" : storageMgr,
			"memo1" : memo1,
			"useDmdYmd" : useDmdYmd,
			"moveSchYmd" : moveSchYmd,
						
			"ordArr" : ordArr,    //주문번호
			"seqArr" : seqArr,    //주문순번
			"scdArr" : scdArr,    //    			
			"cntArr" : cntArr,    //
			"mm1Arr" : mm1Arr,    //
			"mm2Arr" : mm2Arr,    //
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			parent.location.reload(true);
			//location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}  
		
// 창고사용 확인
function reqChk(url) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var rowItem;
	var reqArr = "";
	var rseArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.storageUseReqNo;
		rseArr = rseArr + "^" +rowItem.item.reqSeq;
	}
	
	var data = {};
    data.workingType = "CHK";
	
	//sub
	data.reqArr = reqArr;   //요천번호 
	data.rseArr = rseArr;    //요청순번
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "CHK",
			"reqArr" : reqArr,   //요천번호 
			"rseArr" : rseArr,    //요청순번
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}

function updateDataToServer( url, workingType ) {
	//document.getElementById('btnReg').classList.toggle('disabled');
	$("#btnDel").toggle('disabled');
    var whNo = $("#whNo").text();
    var rowItem;
	var seqArr = "";
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		whSeq = rowItem.item.whSeq;
		
		if (typeof whSeq == 'undefined' || whSeq == null) {			whSeq = "";		}

		
		if (i == 0) {
			seqArr = whSeq;
		}else{
			seqArr = seqArr + "^" +whSeq;
		}

	}
	
	/*
	document.getElementById('btnReg').classList.toggle('disabled');
			setStopSpinner();	$("#branchCode").focus();
	 */
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : {
			"workingType" : workingType,		
			"whNo" : whNo,
			"whSeqArr" : seqArr		
		},
	    success: function(data) {
			setStopSpinner();
	        alert(data.result_code+":"+data.result_msg);
	        parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};
		
		