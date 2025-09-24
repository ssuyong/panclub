
let logisCodeList = [];
/* Begin : Date Picker Date Range*/
var today = new Date();
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
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
/* End : Date Picker Date Range*/
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	logisCodeListFind();	  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	branchCodeSelect("/base/code-list");
	
	 
	$.each(logisCodeList, function(index, item) {
        $('#rcvLogisCode').append($('<option>', {
            value: item,
            text: item
        }));
    });
	 
	 
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
		
		
		
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var placeReqNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var orderGroupId = info[4];
        var custCode = info[5];
        var custOrderNo = info[6];
        
        var chkN = info[7];
        var chkY = info[8];
        var chkP = info[9];
        var chkF = info[10];
        
        var branchCode = info[11];
        var ymdIgnoreYN = info[12];
        
  		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
        var chk = info[13];
        let rcvCustCode = info[14];
        let carNo = info[15];
       
  		//var chkN = "N";
  		//var chkY = "N";
  		//var chkP = "N";
  		//var chkF = "N";
		if ($('input:checkbox[name=chkN]').is(':checked') == true){			chkN = "Y";		}	
		if ($('input:checkbox[name=chkY]').is(':checked') == true){			chkY = "Y";		}
		if ($('input:checkbox[name=chkP]').is(':checked') == true){			chkP = "Y";		}
		if ($('input:checkbox[name=chkF]').is(':checked') == true){			chkF = "Y";		}
		
        if ( typeof orderNo == 'undefined'){ orderNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	    if (typeof chk == 'undefined') { chk = '' }
	    
        //console.log("sYmd:"+sYmd);
        $("#placeReqNo").val(placeReqNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
        $("#orderGroupId").val(orderGroupId);
        $("#custCode").val(custCode);
        $("#custOrderNo").val(custOrderNo);
		$("input:radio[name='chk'][value='" + chk + "']").prop('checked', true);
		if (chkN == 'Y') {			$('#chkN').prop('checked', true);		}else{			$('#chkN').prop('checked', false);		}
		if (chkY == 'Y') {			$('#chkY').prop('checked', true);		}else{			$('#chkY').prop('checked', false);		}
		if (chkP == 'Y') {			$('#chkP').prop('checked', true);		}else{			$('#chkP').prop('checked', false);		}
		if (chkF == 'Y') {			$('#chkF').prop('checked', true);		}else{			$('#chkF').prop('checked', false);		}

		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		$("#branchCode").val(branchCode);		
		
		$("#rcvCustCode").val(rcvCustCode);		
		$("#carNo").val(carNo);		
		//console.log("hash chkY: "+chkY);
		  //Grid  checkBox reset
	   
        findDataToServer("/order/place-req-item-list",page);
        
        
  	}

  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var placeReqNo_val = $("#placeReqNo").val(); 
		var orderGroupId_val = $("#orderGroupId").val(); 
		var custCode_val = $("#custCode").val(); 
		var custOrderNo_val = $("#custOrderNo").val(); 
		var chkN = "N";
		if ($('input:checkbox[name=chkN]').is(':checked') == true){			chkN = "Y";		}	
		var chkY = "N";
		if ($('input:checkbox[name=chkY]').is(':checked') == true){			chkY = "Y";		}	
		var chkP = "N";
		if ($('input:checkbox[name=chkP]').is(':checked') == true){			chkP = "Y";		}
		var chkF = "N";
		if ($('input:checkbox[name=chkF]').is(':checked') == true){			chkF = "Y";		}	
		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}
		var branchCode = $("#branchCode").val();
		
		var rcvCustCode = $("#rcvCustCode").val();
		var carNo = $("#carNo").val();
		
		var chk_val = $(':radio[name="chk"]:checked').val();							
									
		document.location.hash = '#info'+currentPage+"!"+placeReqNo_val+"!"+sYmd+"!"+eYmd+"!"+orderGroupId_val+"!"+custCode_val+"!"+custOrderNo_val+"!"+chkN+"!"+chkY+"!"+chkP+"!"+chkF+"!"+ymdIgnoreYN+"!"+branchCode
												+"!"+chk_val+"!"+rcvCustCode+"!"+carNo;
		
		findDataToServer("/order/place-req-item-list", 1);
	});

	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/order/place-req-item-list", 1);
	}
		
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	
// 칼럼 레이아웃 작성
var columnLayout = [ 
		 { dataField : "idx",      headerText : "idx", width : 100, editable : false, visible : false }
		,{ dataField : "placeReqNo",      headerText : "요청번호", width : 100, editable : false }
		,{ dataField : "reqSeq",      headerText : "요청순번", width : 60, editable : false }
		,{ dataField : "placeDmdYmd",      headerText : "발주처발주요청일", width : 110, editable : false }
		,{ dataField : "whSchYmd",      headerText : "입고예정일", width : 80, editable : false ,visible : false}
		,{ dataField : "reqChkYmd",      headerText : "요청확인일", width : 80, editable : false }
		//,{ dataField : "statusCode",      headerText : "상태코드", width : 100, editable : false }
		,{ dataField : "statusName",      headerText : "상태", width : 50, editable : false }
		,{ dataField : "placeCustCode",      headerText : "발주처", width : 60, editable : false }
		,{ dataField : "placeCustName",      headerText : "발주처명", width : 120, editable : false, style : "left" }
		,{ dataField : "orderReqPlaceCustCode",      headerText : "요청발주처", width : 60, editable : false }
		,{ dataField : "orderReqPlaceCustName",      headerText : "요청발주처명", width : 120, editable : false, style : "left" }
		,{ dataField : "rcvLogisCode",     headerText : "수령물류센터", width : 100 , editable : false ,
		renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
		            type : "DropDownListRenderer",
		            list :logisCodeList
		      }}
		//,{ dataField : "makerName",      headerText : "메이커명", width : 100, editable : false }
		,{ dataField : "rcvCustCode",      headerText : "납품처코드", editable : false ,visible : false}
		,{ dataField : "rcvCustName",      headerText : "납품처명", width : 120, editable : false }
		,{ dataField : "carNo",      headerText : "차량번호", width : 80, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 70, editable : false }
		,{ dataField : "makerName",  headerText : "제조사", width : 50} 
		,{ dataField : "itemNo",      headerText : "품번", width : 120, editable : false }
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }  
		,{ dataField : "itemName", headerText : "품명", width: 140, editable : false  , style : "left"} 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "cnt",     headerText : "발주요청수량", width: 80, style : "right" }
		//,{ dataField : "whUnitPrice", headerText : "입고가", width: 120 }
		//,{ dataField : "whSumPrice", headerText : "합계", width: 120 , style : "right" }
		,{ dataField : "unitPrice", headerText : "발주단가", width: 120, dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right" }
		,{ dataField : "sumPrice", headerText : "합계", width: 120 , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right" , editable : false}
		,{ dataField : "memo1",      headerText : "비고1", width : 120, editable : false, style : "left" }
		,{ dataField : "placeNo",      headerText : "발주번호", width : 100, editable : false ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}   }
		,{ dataField : "custOrderNo",     headerText : "발주처주문번호", width : 100 , editable : false }
		,{ dataField : "branchCode",     headerText : "관리지점", width : 100 , editable : false }
		
		,{ dataField : "orderGroupId",     headerText : "주문그룹ID",width : 100 , editable : false,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
		,{ dataField : "orderNo",     headerText : "주문번호",width : 100 , editable : false ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
		,{ dataField : "orderSeq",     headerText : "주문순번", width : 60, editable : false }
		,{ dataField : "regUserId",     headerText : "요청자", editable : false }
		,{ dataField : "chkUserId",     headerText : "처리자" , editable : false}		
];

var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			editable : true,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			// 엑스트라 체크박스 표시 설정
			showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			showRowAllCheckBox: true,
			
			selectionMode : "multipleCells",
			// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
			rowIdField : "idx",			
			
			showAutoNoDataMessage : false,
			
			showFooter: true,
			
			
		/*	rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.statusName == "발주") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}*/
		
		
		
			/*
			
			
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
	
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	AUIGrid.setFooter(myGridID, footerLayout);
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
	
	AUIGrid.bind(myGridID, ["cellEditBegin"], function (event) {
	// Country 가 "Korea", "UK" 인 경우, Name, Product 수정 못하게 하기
		if (event.dataField == "cnt" || event.dataField == "unitPrice") {
			if (event.item.placeNo != null) {
				return false; // false 반환. 기본 행위인 편집 불가
			}
		}
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		//console.log("columnIndex:"+event.columnIndex);  
		/*
		if (event.columnIndex == 1) {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderNo_val = $("#orderNo").val(); 
				
			document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd;
			//
	     	
	     	//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-up');
		    document.body.appendChild(f);
		    f.submit();
		}		
		*/
		if (event.dataField == 'placeNo'){
		/*
		let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'placeNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/place-up');
		    document.body.appendChild(f);
		    f.submit();
		*/
		var placeNo = event.item.placeNo
		var url =  '/order/place-up?placeNo=' + placeNo ;
		var newWindow = window.open(url, '_blank');
			 newWindow.focus();
		}
		if (event.dataField == 'orderGroupId'){
	/*
		let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderGroupId');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-group-item-list');
		    document.body.appendChild(f);
		    f.submit();
		*/
		var orderGroupId = event.item.orderGroupId
		var url =  '/order/order-group-item-list?orderGroupId=' + orderGroupId ;
		var newWindow = window.open(url, '_blank');
			 newWindow.focus();
		}
		if (event.dataField == 'orderNo'){
		/*
		let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-up');
		    document.body.appendChild(f);
		    f.submit();
		*/ 
		var orderNo = event.item.orderNo
		var url =  '/order/order-up?orderNo=' + orderNo ;
		var newWindow = window.open(url, '_blank');
			 newWindow.focus();
		}  
	});
		
}


function findDataToServer(url,page) {
	
	var list = [];
	//var sYmd = $("#sYmd").val();
	//var eYmd = $("#eYmd").val();
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var placeReqNo = $("#placeReqNo").val(); 
	
	var orderGroupId = $("#orderGroupId").val(); 
	var custCode = $("#custCode").val(); 
	var custOrderNo = $("#custOrderNo").val(); 
	
	/*
	var chkN  = "N";
	if ($('#chkN ').is(':checked') == true){
		chkN = "미확인";};
	var chkY  = "N";
	if ($('#chkY ').is(':checked') == true){
		chkY = "확인";};
	var chkP  = "N";
	if ($('#chkP ').is(':checked') == true){
		chkP = "발주";};
	var chkF  = "N";
	if ($('#chkF ').is(':checked') == true){
		chkF = "완료";};*/
		
	
	//console.log("find chkY:"+chkY);	
	//if (spaceDel(estiNo)=='' && spaceDel(itemName)=='') {
	//	alert("부품번호 또는 부품명에 검색어를 입력하세요.");
	//	return false;
	//}

	var branchCode = $("#branchCode").val();
	var chk = $(':radio[name="chk"]:checked').val();

	let rcvCustCode = $("#rcvCustCode").val();
	let carNo = $("#carNo").val();
	let rcvLogisCode = $("#rcvLogisCode").val();
	
	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!placeReqNo || placeReqNo.trim() == '' ) && (!orderGroupId || orderGroupId.trim() == '')  && (!custOrderNo || custOrderNo.trim() == '') 
	   && (!custCode || custCode.trim() == '') && (!branchCode || branchCode.trim() == '')
	    ) {
	    //  alert("조회 조건을 하나 이상 입력해주세요.(발주요청번호,발주처주문번호,주문그룹ID)");
	   	 $("#iDiv_noSrchPop").text("ⓘ 조회 조건을 하나 이상 입력해주세요.(발주요청번호,발주처주문번호,주문그룹ID)");
	      $("#iDiv_noSrchPop").css("display","block");
	      return false;
	   }
	}
		
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"placeReqNo":placeReqNo,
			"orderGroupId":orderGroupId,
			"placeCustCode":custCode,
			"custOrderNo":custOrderNo,
			
			//"chkN":chkN,
		//	"chkY":chkY,
			//"chkP":chkP,
		//	"chkF":chkF,
			"branchCode": branchCode,
			"chk": chk,
			"ymdIgnoreYN": ymdIgnoreYN,
			"rcvCustCode": rcvCustCode,
			"carNo": carNo,
			"rcvLogisCode": rcvLogisCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){ 
			
			//AUIGrid.clearSelection(myGridID);
			//AUIGrid.clearGridData(myGridID);
			//console.log("clear");
			//return;
//location.reload(true);
			// AUIGrid.setAllCheckedRows(myGridID, true); 	  
			if (data.placeReqItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.placeReqItemList.length;i++){
					list.push({
						 idx: i
						,placeReqNo: data.placeReqItemList[i].placeReqNo 
						,reqSeq: data.placeReqItemList[i].reqSeq 
						,placeDmdYmd: data.placeReqItemList[i].placeDmdYmd 
						//,whSchYmd: data.placeReqItemList[i].whSchYmd
						//,statusCode: data.placeReqItemList[i].statusCode 
						,statusName: data.placeReqItemList[i].statusName 
						,placeCustCode: data.placeReqItemList[i].placeCustCode 
						,placeCustName: data.placeReqItemList[i].placeCustName 
						,makerName: data.placeReqItemList[i].makerName 
						,itemId: data.placeReqItemList[i].itemId 
						,itemNo: data.placeReqItemList[i].itemNo
						,itemName: data.placeReqItemList[i].itemName 
						//,itemNameEn: data.placeReqItemList[i].itemNameEn 
						,cnt: data.placeReqItemList[i].cnt 
						//,whUnitPrice: data.placeReqItemList[i].whUnitPrice 
						//,whSumPrice: data.placeReqItemList[i].whSumPrice 
						,unitPrice: data.placeReqItemList[i].unitPrice 
						,sumPrice: data.placeReqItemList[i].sumPrice 
						,placeNo: data.placeReqItemList[i].placeNo
						,custOrderNo: data.placeReqItemList[i].custOrderNo
						,orderGroupId: data.placeReqItemList[i].orderGroupId
						,orderNo: data.placeReqItemList[i].orderNo
						,orderSeq: data.placeReqItemList[i].orderSeq
						,regUserId: data.placeReqItemList[i].regUserId
						,chkUserId: data.placeReqItemList[i].chkUserId
						,reqChkYmd: data.placeReqItemList[i].reqChkYmd 
						,memo1: data.placeReqItemList[i].memo1 
						,branchCode: data.placeReqItemList[i].branchCode
						,rcvLogisCode : (data.placeReqItemList[i].rcvLogisCode ?? '')
						,rcvCustCode : data.placeReqItemList[i].rcvCustCode 
						,rcvCustName : data.placeReqItemList[i].rcvCustName 
						,carNo : data.placeReqItemList[i].carNo 
						,orderReqPlaceCustCode : data.placeReqItemList[i].orderReqPlaceCustCode 
						,orderReqPlaceCustName : data.placeReqItemList[i].orderReqPlaceCustName 
						,className : data.placeReqItemList[i].className 
						,factoryNo : data.placeReqItemList[i].factoryNo 
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID, Number(page));
			     }
			     //AUIGrid.clearSelection(myGridID);
			   //  allChecked = !allChecked;
		     	//AUIGrid.setAllCheckedRows(myGridID, false);
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

// 발주 등록 
function place() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var rowItem;
	var reqArr = "";
	var seqArr = "";
	
	var errCnt = 0;
	var errCnt2 = 0;  
	var stdCustCode = ""; //발주처다른경우 체크용도. 기준 발주처(최조 발주처)
	var stdCustName = "";
	//var errArr = "";
	var custArr = [];
	var j = 1
	var errCustName = "";
	var inArr = "Y";  // 배열등록대상
	//console.log("len:"+checkedItems.length);
	
	var orderArr = "";
	var orderSeqArr = "";
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.placeReqNo;
		seqArr = seqArr + "^" +rowItem.item.reqSeq;
		orderArr = orderArr + "^" +rowItem.item.orderNo;
		orderSeqArr = orderSeqArr + "^" +rowItem.item.orderSeq;
		if ( i == 0 ) {
			stdCustCode = rowItem.item.placeCustCode;
			stdCustName = rowItem.item.placeCustName;
			//errArr = stdCustName;
			custArr[0] = stdCustName;
		}
		inArr = "Y"
		if (stdCustCode != rowItem.item.placeCustCode ) {
			errCustName = rowItem.item.placeCustName;
			errCnt2 = errCnt2 + 1;
			//errArr = errArr + "/" + errCustName;
			//return "auigrid-err-row-style";
			
			//console.log("errCustName:"+errCustName);
			
			for (var k=0, len2 = custArr.length; k < len2; k++) {
				//console.log("cusArr:"+custArr[k] + "--" + errCustName);
				if ( custArr[k] == errCustName) 	{
					inArr = 'N';
				}	
			}
			if (inArr == 'Y') {
				custArr[j] = errCustName; 
				j = j + 1;
			}
		}
		if (isEmpty(rowItem.item.reqChkYmd) == true ||  isEmpty(rowItem.item.placeNo) == false) { 
				errCnt = errCnt + 1;}
		//console.log("i:"+i);
		}
		
	
	
	//  Begin : 대상 체크
	/*
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		
		//발주등록대상인지..
		if ((isEmpty(item.reqChkYmd) == true ||  isEmpty(item.placeNo) == false) && AUIGrid.isCheckedRowById(myGridID, rowIndex) == true ) {  //요청확인 && 요청확인일존재 && 발주번호공백 && 체크
			errCnt = errCnt + 1;
			return "auigrid-err-row-style";
		}
		
		//발주처가 다른지 체크		
		if ( isEmpty(item.reqChkYmd) == false && isEmpty(item.placeNo) == true && AUIGrid.isCheckedRowById(myGridID, rowIndex) == true ) {  //요청확인 && 요청확인일존재 && 발주번호공백 && 체크
			console.log("rowIdx:"+rowIndex);
			console.log("stdCustCode:"+stdCustCode);
			if (stdCustCode == '') { //기준 발주처코드가 없는 경우 입력
				stdCustCode = item.placeCustCode;
			} else { 
				if ( stdCustCode != item.placeCustCode) {  //기준발주처코드와 다른 경우
					console.log("stdCustCode : " + stdCustCode)
					console.log("item.placeCustCode : " + item.placeCustCode)
					errCnt2 = errCnt2 + 1;
					return "auigrid-err-row-style";					
				}				
			}
		}		
		
		return "";	
	});		
	AUIGrid.update(myGridID);
	*/
	

	if (errCnt > 0) {
		alert("요청확인이 안되었거나 이미 발주된 품목이 존재합니다!!");
		return;
	}
	
	if (errCnt2 > 0) {
		//alert("발주처가 다른 경우 발주등록을 할 수 없습니다!!\n\n건수: "+errCnt2+"\n\n발주처: "+errArr);
		errCustNameArr="";
		for (var l=0, len3 = custArr.length; l < len3; l++) {
			errCustNameArr = errCustNameArr + "/"+custArr[l];
		}
		alert("발주처가 다른 경우 발주등록을 할 수 없습니다!!\n\n선택된 발주처: "+errCustNameArr);
		return;
	}
	// End : 대상체크	
	
	
	
	//var estiNo = $("#estiNo").val();
	//post형식으로 페이지 데이터 조회
	let f = document.createElement('form');
    
	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'reqArr');
	obj.setAttribute('value', reqArr);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'seqArr');
	obj.setAttribute('value', seqArr);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'orderArr');
	obj.setAttribute('value', orderArr);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'orderSeqArr');
	obj.setAttribute('value', orderSeqArr);
	f.appendChild(obj);
	    
	f.setAttribute('method', 'post');
	f.setAttribute('action', '/order/place-up');
	document.body.appendChild(f);
	f.submit();	
}

// 발주 요청 확인
function reqChk(url, workingType) {
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	if (!confirm("처리하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var reqArr = "";
	var rseArr = "";
	var cntArr = "";
	var uniPriArr = "";
	let rcvLogisCodeArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.placeReqNo;
		rseArr = rseArr + "^" +rowItem.item.reqSeq;
		cntArr = cntArr + "^" +rowItem.item.cnt;
		uniPriArr = uniPriArr + "^" +rowItem.item.unitPrice;
		rcvLogisCodeArr += "^" +rowItem.item.rcvLogisCode;
	}
	
	//대상 체크
	var errCnt = 0;
	var errCnt2 = 0;
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		
		if (workingType == 'CHK' && item.reqChkYmd != '' && AUIGrid.isCheckedRowById(myGridID, item.idx) == true ) {  //요청확인 && 요청확인일존재 && 체크
			errCnt = errCnt + 1;
			return "auigrid-err-row-style";
		}
		
		if (workingType == 'CANCEL' && isEmpty(item.placeNo) == false && AUIGrid.isCheckedRowById(myGridID, item.idx) == true ) {  //요청취소 && 발주번호존재 && 체크
			errCnt2 = errCnt2 + 1;
			return "auigrid-err-row-style";
		}
		
	});		
	AUIGrid.update(myGridID);

	if (errCnt > 0) {
		alert("이미 요청확인된 품목이 존재합니다!!")
		return;
	}
	
	if (errCnt2 > 0) {
		alert("발주된 품목은 요청취소가 불가합니다!!")
		return;
	}

	var data = {};
	data.workingType = workingType;
    //data.workingType = "CHK";
	
	//sub
	data.reqArr = reqArr;   //요천번호 
	data.rseArr = rseArr;    //요청순번
	data.cntArr = cntArr;    //요청순번
	data.uniPriArr = uniPriArr;    //요청순번
    
    
    
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"reqArr" : reqArr,   //요천번호 
			"rseArr" : rseArr,    //요청순번
			"cntArr" : cntArr,    
			"uniPriArr" : uniPriArr,
			rcvLogisCodeArr
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

//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj, name) {

	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
	rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;

	//console.log("row1:"+rowItem.itemNo);
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	$(obj).val(rowItem.custCode);
	$("#" + name + "").val(rowItem.custName);

	var dialogCust;
	dialogCust = $("#dialog-form-cust");
	dialogCust.dialog("close");

}

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

function auiCellEditingHandler(event) {

	if (event.dataField == 'cnt' || event.dataField == 'unitPrice' ) {
		var sumPrice = event.item.cnt * event.item.unitPrice; 
		//AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);
		//console.log("sumPrice:"+sumPrice);
		fn_dcProc();	
	}
};
function logisCodeListFind() // 수령물류센터 코드 받아오는 통신
{
	$.ajax({
		type: "POST",
		url: "/base/code-list",
		dataType: "json",
		data: {
			mCode : '9030',
			validYN :'Y'
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		
		success: function(data) {   
			for(let i = 0 ; i < data.codeList.length ; i++)
			{
				logisCodeList.push(data.codeList[i].codeName); // 디테일 auigrid용 리스트 배열에 추가 
			} 
		},
		error: function(e){
			
		}
		
	})
	
}
