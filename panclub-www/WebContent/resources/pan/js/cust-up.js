
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID2;

function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){
	

		
	/*$("#bizNo").keyup (function(){
		var content = $("#bizNo").val().length;
		if (content >12 || content <12 || content ==  ''  ){
			 $("#bizNo").css("border","1px solid red");
		}	else{ $("#bizNo").css("border","1px solid #C8C8C8");
			
		}	
	});*/
	
	


	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);



	//등록버튼 활성화, 수정/삭제 활성화
	//document.getElementById('btnUpt').classList.toggle('disabled'); 
	//document.getElementById('btnDel').classList.toggle('disabled');
					
					
	//관리자팝업
	var dialog;
	dialog = $( "#dialog-form" ).dialog({
	    autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "40%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap2") },
		buttons: {
			"확인": updateGridRow,
			"취소": function (event) {
				dialog.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	
	// AUIGrid 그리드를 생성합니다.
	createMgrAUIGrid();

	// Details 그리드를 생성합니다.
	createAdmAUIGrid();

	
	// 에디팅 시작 이벤트 바인딩
	AUIGrid.bind(myGridID2, "cellDoubleClick", function (event) {
		currentRowIndex = event.rowIndex; // // 에디팅 시작 시 해당 행 인덱스 보관
		//setFieldToEditWindow(event.item); //그리드의 데이터 팝업에 바인딩
		//console.log("key value:"+event.item.admType);
		if (event.dataField == 'admCode' || event.dataField == 'admName') { //관리자(부서)코드 칼럼 
		    //관리유형 선택여부 체크
		    //console.log("admType:"+event.item.admType);
		    if (event.item.admType == '') {
				alert("관리유형을 선택하세요");
				return;
			}
			dialog.dialog("open");
			
			if (event.item.admType == '1') { //부서원
				findAdmStaff(currentRowIndex,event.item.admType);
			} else if (event.item.admType == '2') {  //부서
				findAdmDept(currentRowIndex,event.item.admType);
			} else if (event.item.admType == '3') {  //지점
				findAdmBranch(currentRowIndex,event.item.admType);
			} else if (event.item.admType == '4') {  //거래처
				findAdmCust(currentRowIndex,event.item.admType);
			}
		}
		return false; // false 반환하면 그리드 내장 에디터 표시 안함.(더 이상 진행 안함)
	});
	
	
	$("#btnReg").click(function(){
		//alert("등록버튼");
	//	updateDataToServer("/base/custAdd", "ADD");
	reqSend("ADD");
	});
	$("#btnUpt").click(function(){
		//alert("등록버튼");
		//updateDataToServer("/base/custAdd", "UPT");
		reqSend("UPT");
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("거래처가 삭제되면 복구가 불가능 합니다.거래처를 삭제하시겠습니까?")){
			//updateDataToServer("/base/custAdd", "DEL");
			reqSend("DEL");
		}
	});
		
	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("./data/normal_500.json");
	
	let custCode = $("#custCode").val();
	console.log("custcodea:"+custCode);
	if (custCode !=''){
		//alert("custcode:"+custCode);
		findCustMst('/base/cust-list');
	}	  
});

// Master 그리드 를 생성합니다.
function createMgrAUIGrid() {
	//console.log("hi");
	// AUIGrid 칼럼 설정
	var columnLayout = [		 
	 { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false  }
	,{ dataField : "mgrIdx",      headerText : "담당자idx", width : 140, editable : false, visible : false  }
	,{ dataField : "name",      headerText : "담당자명*", width : 140
		/*
		,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
	        show : true,
	        tooltipHtml : '필수입력값입니다.'
	    } */
	 } 
	,{ dataField : "position", headerText : "직책*", width: 120  } 
	,{ dataField : "role",      headerText : "직무", width : 120   }
	,{ dataField : "phone1",     headerText : "전화번호1*" }
	,{ dataField : "phone2",     headerText : "전화번호2" }
	,{ dataField : "email",     headerText : "이메일"  }
	,{ dataField : "aos_aosid",     headerText : "AOS ID", width : 120     }
	,{ dataField : "validYN",   headerText : "유효여부",
		style : "aui-grid-user-custom",
		//headerTooltip : {
		//	show : true,
		//	tooltipHtml : "In Charge 가 Anna 인 경우 사용자가 수정 못하게 막음.<br/>(선택적 체크박스 수정 여부 판단)"
		//},
		styleFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
			if(value == "Y") {
				return "my-inactive-style";
			} else if(value == "N") {
				return "my-active-style";
			}
			return "";
		},
		renderer : {
			type : "CheckBoxEditRenderer",
			showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue : "Y", // true, false 인 경우가 기본
			unCheckValue : "N",
			
			//사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
			checkableFunction :  function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
				// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
				if(item.charge == "Anna") {
					return false;
				}
				return true;
			}
		}
	 }
	,{ dataField : "memo",      headerText : "비고"    }
	];
	


	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "singleRow",
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		showRowCheckColumn: false,
		showAutoNoDataMessage : false, 
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);

	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);

	// 선택 변경 이벤트 바인딩
	//AUIGrid.bind(myGridID, "selectionChange", auiGridSelectionChangeHandler);
};

// 관리자 그리드 생성
function createAdmAUIGrid() {
	var columnLayout = [
	 	 { dataField : "",    headerText : "IDX", width : 50, visible : false }
	 	,{ dataField : "admIdx",    headerText : "관리자IDX", width : 140, visible : false } 
		,{ dataField : "admType",   headerText : "관리유형*", width: 120,
			renderer : {
				type : "DropDownListRenderer",
				list : admTypeList,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			}  } 
		,{ dataField : "admCode",     headerText : "관리자코드*", width : 120     }
		,{ dataField : "admName",   headerText : "관리자명*" } 
		,{ dataField : "memo",      headerText : "비고"  }
	];

	// 그리드 속성 설정
	var gridPros = {
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		showRowCheckColumn: false		
	};

	// 실제로 #grid_wrap2 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, gridPros);
}


//SR그리드생성


function createAdmAUIGrid() {

	// AUIGrid 칼럼 설정
	//var admTypeList =  [{"code":"1", "value":"부서원"},{"code":"2", "value":"부서"},{"code":"3", "value":"지점"},{"code":"4", "value":"거래처"}];
	//var admTypeList =  [{"code":"1", "value":"부서원"},{"code":"2", "value":"부서"},{"code":"3", "value":"지점"}];
	var admTypeList =  [{"code":"1", "value":"사원"}];
	var columnLayout = [
	 	 { dataField : "idx",    headerText : "IDX", width : 50, visible : false }
	 	,{ dataField : "admIdx",    headerText : "관리자IDX", width : 140, visible : false } 
		,{ dataField : "admType",   headerText : "관리유형*", width: 120,
			renderer : {
				type : "DropDownListRenderer",
				list : admTypeList,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			}  } 
		,{ dataField : "admCode",     headerText : "관리자코드*", width : 120     }
		,{ dataField : "admName",   headerText : "관리자명*" } 
		,{ dataField : "memo",      headerText : "비고"  }
	];

	// 그리드 속성 설정
	var gridPros = {
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		showRowCheckColumn: false		
	};

	// 실제로 #grid_wrap2 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, gridPros);
}

//SR테이블	

	




	
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;

//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
 	var mName = mCodeSel.attr('mname');
 	
 	//console.log("mCode"+mCode);
 	//console.log("mName"+mName);
 	
	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID2, item, currentRowIndex);
	
	var dialog;
	dialog = $( "#dialog-form" );	
	dialog.dialog("close");
}

// 행 추가, 삽입
function addRow1(grid,rowPos) {
	var item = new Object();

	item.idx = '',
	item.mgrIdx = '', 
	item.name = '', 
	item.position = '', 
	item.role = '', 
	item.phone1 = '', 
	item.phone2 = '', 
	item.email = '', 
	item.validYN = ''
	,item.aos_aosid = ''
	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID, item, rowPos);	
};


// 행 추가, 삽입
function addRow2(grid,rowPos) {
	var item = new Object();

	item.idx = '',
	item.admIdx = '', 
	item.admType = '', 
	item.admCode = '', 
	item.admName = '',
	item.memo = ''	
	
	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID2, item, rowPos);	
};

//var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	//if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
	//	ymdIgnoreYN = "Y";


/* 2024.11.19 sg -주석
// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	
	//console.log("hi");
	var custCode = $("#custCode").val();  
    var custName = $("#custName").val(); 
    var formalName = $("#formalName").val(); 
    var bizNo = $("#bizNo").val(); 
    var bzType = $("#bzType").val(); 
    var bzItems = $("#bzItems").val(); 
    var custType = $("#custType").val(); 
    var ceoName = $("#ceoName").val(); 
    var custAddress1 = $("#custAddress1").val(); 
    var custAddress2 = $("#custAddress2").val(); 
    var phone = $("#phone").val(); 
    var cleanedPhone = phone.replace(/[^0-9]/g, '');
    var fax = $("#fax").val(); 
    var taxType = $("#taxType").val(); 
    var cashType = $("#cashType").val(); 
    var balanceDspType = $("#balanceDspType").val(); 
    var payDay = $("#payDay").val(); 
    var payType = $("#payType").val(); 
    var accNum = $("#accNum").val(); 
    var validYN = $("#validYN").val(); 
   
   // var dcRate = $("#dcRate").val(); 
   // var bonusRate = $("#bonusRate").val();  
   // var grade = $("#grade").val(); 
   // var srMarginRate = $("#srMarginRate").val(); 
    var releasePriceType = $("#releasePriceType").val(); 
    var warehousePriceType = $("#warehousePriceType").val(); 
    var marginRate = $("#marginRate").val(); 
    var warehouseRate = $("#warehouseRate").val(); 
    var releaseLimit = $("#releaseLimit").val(); 
    var depositLimitDay = $("#depositLimitDay").val(); 
    var memo = $("#memo").val(); 
  	// var admGroupCode = $("#admGroupCode").val(); 
   // var admEmpNo = $("#admEmpNo").val(); 
    var taxMobile = $("#taxMobile").val(); 
    var taxEmail = $("#taxEmail").val(); 
   // var outsideCode = $("#outsideCode").val();         
    var placeYN  = "N";
	if ($('#placeYN ').is(':checked') == true){
		placeYN = "Y";};
	 var supplyYN   = "N";
	if ($('#supplyYN  ').is(':checked') == true){
		supplyYN  = "Y";}
		
	var centerYN = $(':radio[name="centerYN"]:checked').val();
	//console.log("11111111"+ centerYN);
 	var mainCustCode = $("#mainCustCode").val(); 
    var linkTkKey = $("#linkTkKey").val(); 
    	
    var paymentDay = $("#paymentDay").val(); 	//20231212 yoonsang
    let aos_inscd = $("#aos_inscd").val();  //2024.08.06
    let aos_insnm = $("#aos_insnm").val();  //2024.08.06
    
    //필수값 체크
    if (custCode == '') {	alert("거래처코드는 필수 입력해야 합니다.");		 $("#custCode").focus();		return;	}
    if (custName == '') {	alert("거래처명(약명)은 필수 입력해야 합니다."); $("#custName").focus();		return;	}
    if (formalName == '') {	alert("거래처명(정식명)은 필수 입력해야 합니다.");    $("#formalName").focus();		return;	}
    if (cleanedPhone.length < 8 ) {	alert("전화번호는 필수 입력해야 합니다.(최소8자리)");    $("#phone").focus();		return;	}
    if (custType != 'C2' && bizNo == ''){ alert("법인의 경우 사업자번호는 필수 입력해야 합니다.");  $("#bizNo").focus();		return;		}  //개인인 경우만 사업자번호 미등록가능
    if (custType == 'C1'&& supplyYN   == "Y"&&bzType == ''){ alert("업태는 필수 입력해야 합니다.");   $("#bzType").focus();		return;		}   
    if (custType == 'C1'&& supplyYN   == "Y"&&bzItems == ''){ alert("종목은 필수 입력해야 합니다."); $("#bzItems").focus();		return;		}   
    if (custType == 'C1'&& supplyYN   == "Y"&&ceoName == ''){ alert("대표자명은  필수 입력해야 합니다.");   $("#ceoName").focus();		return;		}   
    if (custAddress1 == ''){ alert("사업장주소는 필수 입력해야 합니다.");    $("#custAddress1").focus();		return;		}   
     if (custType == 'C1'&& supplyYN   == "Y"&&taxEmail == ''){ alert("세금계산서 이메일은 필수 입력해야 합니다.");   $("#taxEmail").focus();		return;		}   
   // console.log ("rr"+ $(':radio[name="centerYN"]:checked').val());
    if ($('#placeYN ').is(':checked') == true && ($(':radio[name="centerYN"]:checked').val() =='' ||  $(':radio[name="centerYN"]:checked').val() ==undefined ))
    { alert("발주업체의 경우 센터/외부 선택을 해야합니다.");   $(':radio[name="centerYN"]').focus();		return;	}
	

     
  

	//if (custCode == '' || custName == '' || formalName == '') {
	//	alert("거래처코드, 거래처명(약명), 거래처명(정식명)은 필수 입력해야 합니다.")
	//	$("#custCode").focus();
	//	return; 
	//}

	
	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);
    
 	// 추가된 행 아이템들(배열)
  	var addList2 = AUIGrid.getAddedRowItems(myGridID2);                   
	// 수정된 행 아이템들(배열)
	var updateList2 = AUIGrid.getEditedRowColumnItems(myGridID2); 
	// 삭제된 행 아이템들(배열)
	var removeList2 = AUIGrid.getRemovedItems(myGridID2);
   // console.log("addList:"+addList);
    
    var i, len, name, rowItem;
	var str = "";
	
	var isValid1 = AUIGrid.validateGridData(myGridID, ["name", "position", "phone1"], "담당자명, 직책, 전화번호1 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["name", "position", "phone1"], "담당자명, 직책, 전화번호1 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	
	var isValid2 = AUIGrid.validateGridData(myGridID2, ["admType", "admCode", "admName"], "필수 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged2 = AUIGrid.validateChangedGridData(myGridID2, ["admType", "admCode", "admName"], "관리유형, 관리코드, 관리명은 반드시 유효한 값을 직접 입력해야 합니다.");
		
	//console.log("isValid:"+isValid);
	if (isValid1 == false || isValidChanged1 == false || isValid2 == false || isValidChanged2 == false) {
		return;    
	}
	
	var data = {};
	
	if(addList.length > 0) data.mgrAdd = addList;
	else data.mgrAdd = [];
	//
	//console.log("data3:"+JSON.stringify(data));
	if(updateList.length > 0) data.mgrUpdate = updateList;
	else data.mgrUpdate = [];
	     //console.log("data4:"+JSON.stringify(data));
	if(removeList.length > 0) data.mgrRemove = removeList;
	else data.mgrRemove = [];

	if(addList2.length > 0) data.admAdd = addList2;
	else data.admAdd = [];
	
	if(updateList2.length > 0) data.admUpdate = updateList2;
	else data.admUpdate = [];
	
	if(removeList2.length > 0) data.admRemove = removeList2;
	else data.admRemove = [];
	
  //  var data = { custCode:'001001'};
    //data.push({"custCode":"001001"});
    
    //data['custCode'] = '001001';
    //data.custCode = "001001";

	data.workingType = workingType;
	data.custCode = custCode;  
    data.custName = custName; 
    data.formalName = formalName; 
    data.bizNo = bizNo; 
    data.bzType = bzType; 
    data.bzItems = bzItems; 
    data.custType = custType; 
    data.ceoName = ceoName; 
    data.custAddress1 = custAddress1; 
    data.custAddress2 = custAddress2; 
    data.phone = phone; 
    data.fax = fax; 
    data.taxType = taxType; 
    data.cashType = cashType; 
    data.balanceDspType = balanceDspType; 
    data.payDay = payDay; 
    data.payType = payType; 
    data.accNum = accNum; 
    data.validYN = validYN; 
    
   // data.dcRate = dcRate; 
  //  data.bonusRate = bonusRate;  
   // data.grade = grade; 
    //data.srMarginRate = srMarginRate; 
    data.releasePriceType = releasePriceType; 
    data.warehousePriceType = warehousePriceType; 
    data.marginRate = marginRate; 
    data.warehouseRate = warehouseRate; 
    data.releaseLimit = releaseLimit; 
    data.depositLimitDay = depositLimitDay; 
    data.memo = memo; 
    //data.admGroupCode = admGroupCode; 
  //  data.admEmpNo = admEmpNo;                
    data.taxMobile = taxMobile; 
    data.taxEmail = taxEmail; 
    data.placeYN = placeYN; 
    data.supplyYN = supplyYN; 
    data.centerYN = centerYN; 

    data.mainCustCode = mainCustCode; 
    data.linkTkKey = linkTkKey; 
    data.paymentDay = paymentDay; 	//20231212 yoonsang
    data.aos_inscd = aos_inscd;   //20240806
    data.aos_insnm = aos_insnm;   //20240806
        
    console.log("url:"+url);    
    console.log("data:"+JSON.stringify(data));
  return;
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
	        //location.reload();         
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

// 거래처 조회
function findCustMst(url,srchCode) {
    
    //var custCode = $("#custCode").val();
    let custCode = '';   
	if(srchCode == 1){  //2024.11.19 sg .페이지에서 코드로 검색하는 경우
		custCode = $("#custCodeSrch").val();
		$("#custCodeSrch").val('');
	}else{
		custCode = $("#custCode").val();
	}
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"custCode":custCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			if (data.custList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{				
				for(i=0;i<data.custList.length;i++){
					//	console.log("ffffffffff" + data.custList[i].centerYN);
					
				    custType = data.custList[i].custType; 
					custCode = data.custList[i].custCode; 
					formalName = data.custList[i].formalName; 
					custName = data.custList[i].custName;
					bizNo = data.custList[i].bizNo; 
					ceoName = data.custList[i].ceoName; 
					custAddress1 = data.custList[i].custAddress1; 
					custAddress2 = data.custList[i].custAddress2; 
					phone = data.custList[i].phone; 
					fax = data.custList[i].fax; 
					admGroupCode = data.custList[i].admGroupCode; 
					admEmpName = data.custList[i].admEmpName; 
					bzType = data.custList[i].bzType; 
					bzItem = data.custList[i].bzItem; 
					releasePriceType = data.custList[i].releasePriceType; 
					bzItems = data.custList[i].bzItems; 
					warehousePriceType = data.custList[i].warehousePriceType; 
					taxType = data.custList[i].taxType; 
					taxEmail  = data.custList[i].taxEmail; 
					cashType = data.custList[i].cashType; 
					releaseLimit = data.custList[i].releaseLimit; 
					outsideCode = data.custList[i].outsideCode; 
					regUserName = data.custList[i].regUserName; 
					created = data.custList[i].created; 
					uptUserName = data.custList[i].uptUserName; 
					modified = data.custList[i].modified;
					memo = data.custList[i].memo;  
					balanceDspType = data.custList[i].balanceDspType;
					admGroupSepName = data.custList[i].admGroupSepName;
					srCustShareRate = data.custList[i].srCustShareRate;
					placeYN= data.custList[i].placeYN;
					supplyYN= data.custList[i].supplyYN;
					payDay= data.custList[i].payDay;		
					payType= data.custList[i].payType;			
					validYN= data.custList[i].validYN;				
					releaseLimit= data.custList[i].releaseLimit;				
					depositLimitDay= data.custList[i].depositLimitDay;	
					taxMobile= data.custList[i].taxMobile;	
					accNum = data.custList[i].accNum;
					centerYN = data.custList[i].centerYN;
					mainCustCode = data.custList[i].mainCustCode;
					mainCustName = data.custList[i].mainCustName;

					linkGvKey = data.custList[i].linkGvKey;
					linkTkKey = data.custList[i].linkTkKey;
					attaFileOri = data.custList[i].attaFileOri;
					paymentDay = data.custList[i].paymentDay;
					aos_inscd = data.custList[i].aos_inscd;
					aos_insnm = data.custList[i].aos_insnm;					
					
					var url = "";
					//let tagArea = document.getElementById('attaFileOri');
					$("#attaFileOri").empty();  //2024.11.19 sg -코드검색기능 추가로 인해 reset  필요
					if (data.custList[i].attaFileOri != null && data.custList[i].attaFileOri != '') {
					    var attaList2 = data.custList[i].attaFile.split(",");
					    
					    if (attaList2.length > 1) {
					        var attaList = data.custList[i].attaFileOri.split(",");
					        for (var j = 0; j < attaList2.length; j++) {
					            var url = "<a href='"+fileRootUrl + data.custList[i].comCode + "/cust/" + attaList2[j] + "'>" + attaList[j] + "</a><br/>"; // 2023.10.18. 4car로 변경
					            $("#attaFileOri").append(url);
					        }
					    } else {
					        var url = "<a href='"+fileRootUrl + data.custList[i].comCode + "/cust/" + attaList2[0] + "'>" + data.custList[i].attaFileOri + "</a><br/>"; // 2023.10.18. 4car로 변경
					        $("#attaFileOri").append(url);
					    }
					}
					//console.log("111111"+data.custList[i].supplyYN)	
					
					 if (data.custList[i].admGroupSepName && data.custList[i].admGroupSepName.indexOf(' ') !== -1){					
					const names =data.custList[i].admGroupSepName.split(' ');
					const sr1 = names[0];
					const sr2 = names[1];					
					//console.log ("sr1 "+sr1)
					$("#sr1").val(sr1)
					$("#sr2").val(sr2)
				} else if (data.custList[i].admGroupSepName){
					 $("#sr1").val(data.custList[i].admGroupSepName);
					 $("#srbox").css("display", "none");
				}
						
			
				if (data.custList[i].srCustShareRate && data.custList[i].srCustShareRate.indexOf(' ') !== -1){					
					const rates =data.custList[i].srCustShareRate.split(' ');					
					const sr1Rate = rates[0] + "%";
					const sr2Rate = rates[1] + "%";				
				//	console.log ("sr1Rate "+sr1Rate)
					$("#sr1Rate").val(sr1Rate)
					$("#sr2Rate").val(sr2Rate)
				} else if (data.custList[i].srCustShareRate){
					 $("#sr1Rate").val(data.custList[i].srCustShareRate);
					$("#srbox").css("display", "none");
				}
		
					if(data.custList[i].placeYN == "Y"){
						 $('#placeYN').prop('checked', true);
						  centerChk.style.display = "block";
					}else{
						 $('#placeYN').prop('checked', false);
					}
					if(data.custList[i].supplyYN == "Y"){
						$('#supplyYN').prop('checked', true);
					}else{
						 $('#supplyYN').prop('checked', false);
					}
					
					if( data.custList[i].centerYN == "Y"){
						 $('#centerChk input[value="Y"]').prop('checked', true);
					} else if( data.custList[i].centerYN == "N"){
						 $('#centerChk input[value="N"]').prop('checked', true);
					}
					
	
					
					$("#custType").val(custType); 
					$("#custCode").val(custCode); 
					$("#formalName").val(formalName); 
					$("#custName").val(custName);
					$("#bizNo").val(bizNo); 
					$("#ceoName").val(ceoName); 
					$("#custAddress1").val(custAddress1); 
					$("#phone").val(phone); 
					//$("#admGroupCode").val(admGroupCode); 
					$("#admEmpName").val(admEmpName); 
					$("#bzType").val(bzType); 
					$("#bzItem").val(bzItem); 
					$("#releasePriceType").val(releasePriceType); 
					$("#bzItems").val(bzItems); 
					$("#warehousePriceType").val(warehousePriceType); 
					$("#fax").val(fax); 
					$("#taxType").val(taxType); 
					$("#taxEmail").val(taxEmail); 
					$("#cashType").val(cashType); 
					$("#releaseLimit").val(releaseLimit); 
					//$("#outsideCode").val(outsideCode); 
					$("#regUserName").val(regUserName); 
					$("#created").val(created); 
					$("#uptUserName").val(uptUserName); 
					$("#modified").val(modified);
					$("#memo").val(memo);
					$("#balanceDspType").val(balanceDspType);  
					$("#admGroupSepName").val(admGroupSepName);  
					$("#srCustShareRate").val(srCustShareRate);  
					$("#custAddress2").val(custAddress2);  
					$("#payDay").val(payDay);  
					$("#accNum").val(accNum);  
					$("#validYN").val(validYN);  
					$("#releaseLimit").val(releaseLimit);  
					$("#depositLimitDay").val(depositLimitDay);  
					$("#taxMobile").val(taxMobile);  
					$("#mainCustCode").val(mainCustCode);  
					$("#mainCustName").val(mainCustName);  
					
					$("#linkGvKey").val(linkGvKey);  
					$("#linkTkKey").val(linkTkKey);  
					//$("#attaFileOri").val(attaFileOri);  
		
					$("#paymentDay").val(paymentDay);  
					$("#salePriceType").val(data.custList[i].salePriceType);  
		
                    $("#aos_inscd").val(aos_inscd);   //20240806
                    $("#aos_insnm").val(aos_insnm);   //20240806
                    								
					//거래처코드 비활성화
					$('#custCode').attr('disabled', true); 
					//등록버튼 비활성화, 수정/삭제 활성화
					//document.getElementById('btnReg').classList.toggle('disabled'); 
					//document.getElementById('btnUpt').classList.toggle('disabled'); 
					//document.getElementById('btnDel').classList.toggle('disabled');
					
					if(srchCode == 1){ //2024.11.19 sg .페이지에서 코드로 검색하는 경우.원래 위의 3개 코드
						$('#btnReg').attr('disabled', true); 
						$('#btnUpt').attr('disabled', false);
						$('#btnDel').attr('disabled', false);
					}
					else{
						document.getElementById('btnReg').classList.toggle('disabled'); 
						document.getElementById('btnUpt').classList.toggle('disabled'); 
						document.getElementById('btnDel').classList.toggle('disabled');
					}
					$("#srTable").css("display", "block");
					
					
				}		
				findCustMstMgr('/base/cust-mgr-list');
				findCustAdm('/base/cust-adm-list');
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


//거래처관리자(거래처의 직원) 조회
function findCustMstMgr(url) {
	var list = [];
	var custCode = $("#custCode").val();
	
	var name = $("#custMgrSrch").val();	//20231211 yoonsang 추가

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"custCode":custCode
			,"name":name	//20231211 yoonsang 추가
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.custMgrList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.custMgrList.length;i++){
				    list.push({
						 idx: data.custMgrList[i].mgrIdx
						,mgrIdx: data.custMgrList[i].mgrIdx 
						,name: data.custMgrList[i].name
						,custName: data.custMgrList[i].custName 
						,position: data.custMgrList[i].position
						,role: data.custMgrList[i].role 
						,phone1: data.custMgrList[i].phone1 
						,phone2: data.custMgrList[i].phone2 
						,email: data.custMgrList[i].email 
						,validYN: data.custMgrList[i].validYN 
						,memo: data.custMgrList[i].memo
						,aos_aosid: data.custMgrList[i].aos_aosid   //20240806
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



function removeRow1() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID, "selectedIndex");      
};
	
function removeRow2() {

	//var rowPos = document.getElementById("removeSelect").value;

	AUIGrid.removeRow(myGridID2, "selectedIndex");
};



//거래처코드 사용여부 체크 및 최종거래처코드
function codeValidCheck() {
	//console.log("event:"+event.keyCode);
	var custCode = $("#custCode").val();
   // console.log("vlid:"+custCode);
	$.ajax(	{
		type : "POST",
		url : "/base/cust-list",
		dataType : "json",
		data: {
			"workingType":"LC",
			"custCode":custCode			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			//console.log("result len:"+data.custList.length);
			if (data.custList.length == 0){
				$("#lastCustCode").val("코드가 없습니다");							
			}else{
				for(i=0;i<data.custList.length;i++){
					//console.log("result:"+data.custList[i].custCode);
					$("#lastCustCode").val(data.custList[i].custCode);
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

function custCatChk(){
if ($("#custType").val()=="C1"||$("#custType").val()=="C4" ||$("#custType").val()=="C5" ){
	  $('#custCat :input').attr('disabled', true);
	}else{
		$('#custCat :input').removeAttr('disabled');
	}
}		
	
function custChk(){
if ($("#supplyYN").is(':checked')==true && $("#placeYN").is(':checked')==false){
	  $('#placeCust :input').attr('disabled', true);
	  centerChk.style.display = "none";
	}else if ($("#supplyYN").is(':checked')==true &&$("#placeYN").is(':checked')==true){
		$('#placeCust :input').removeAttr('disabled');
		 centerChk.style.display = "block";
	}
	else{
		$('#placeCust :input').removeAttr('disabled');
		centerChk.style.display = "block";
	}
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
/* 중복코드 주석처리 20230718 bk
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
}*/

// auto create hypen  0720 bk
$('#bizNo').on('keyup', function(){
        var num = $('#bizNo').val();
        num.trim(); 
        this.value = AutoHypen(num) ;
});		

function AutoHypen(companyNum){
      companyNum = companyNum.replace(/[^0-9]/g, '');
      var tempNum = '';   

      if(companyNum.length < 4){
        return companyNum;
      }
      else if(companyNum.length < 6){
        tempNum += companyNum.substr(0,3);
        tempNum += '-';
        tempNum += companyNum.substr(3,2);
        return tempNum;
      }
      else if(companyNum.length < 11){
        tempNum += companyNum.substr(0,3);
        tempNum += '-';
        tempNum += companyNum.substr(3,2);
        tempNum += '-';
        tempNum += companyNum.substr(5);
        return tempNum;
      }
      else{        
        tempNum += companyNum.substr(0,3);
        tempNum += '-';
        tempNum += companyNum.substr(3,2);
        tempNum += '-';
        tempNum += companyNum.substr(5);
        return tempNum;
      }
   }
   
   function copyClipboard() {
	 var linkGvKey = document.getElementById("linkGvKey");
	  	linkGvKey.select();
  		navigator.clipboard.writeText(linkGvKey.value);
}



function reqSend(workingType) {
	var form  = $("#frmCust")[0];
	//console.log("custCode2"+custCode2);
	/*if (custCode2 !=''){
		var workingType = "UPT";
	}else{
		var workingType = "ADD";
	}	*/  	
	var formData  = new FormData(form);

	//var workingType = "UPT";
	var custCode = $("#custCode").val();  
    var custName = $("#custName").val(); 
    var formalName = $("#formalName").val(); 
    var bizNo = $("#bizNo").val(); 
    var bzType = $("#bzType").val(); 
    var bzItems = $("#bzItems").val(); 
    var custType = $("#custType").val(); 
    var ceoName = $("#ceoName").val(); 
    var custAddress1 = $("#custAddress1").val(); 
    var custAddress2 = $("#custAddress2").val(); 
    var phone = $("#phone").val(); 
    
    var cleanedPhone = phone.replace(/[^0-9]/g, '');
    
    var fax = $("#fax").val(); 
    var taxType = $("#taxType").val(); 
    var cashType = $("#cashType").val(); 
    var balanceDspType = $("#balanceDspType").val(); 
    var payDay = $("#payDay").val(); 
    var payType = $("#payType").val(); 
    var accNum = $("#accNum").val(); 
    var validYN = $("#validYN").val(); 
   
   // var dcRate = $("#dcRate").val(); 
   // var bonusRate = $("#bonusRate").val();  
   // var grade = $("#grade").val(); 
   // var srMarginRate = $("#srMarginRate").val(); 
    var releasePriceType = $("#releasePriceType").val(); 
    var warehousePriceType = $("#warehousePriceType").val(); 
    var marginRate = $("#marginRate").val(); 
    var warehouseRate = $("#warehouseRate").val(); 
    var releaseLimit = $("#releaseLimit").val(); 
    var depositLimitDay = $("#depositLimitDay").val(); 
    var memo = $("#memo").val(); 
    var admGroupCode = $("#admGroupCode").val(); 
    var admEmpNo = $("#admEmpNo").val(); 
    var taxMobile = $("#taxMobile").val(); 
    var taxEmail = $("#taxEmail").val(); 
    //var outsideCode = $("#outsideCode").val();         
    var placeYN  = "N";
	if ($('#placeYN ').is(':checked') == true){
		placeYN = "Y";};
	 var supplyYN   = "N";
	if ($('#supplyYN  ').is(':checked') == true){
		supplyYN  = "Y";}
		
	var centerYN = $(':radio[name="centerYN"]:checked').val();
	//console.log("11111111"+ centerYN);
 	var mainCustCode = $("#mainCustCode").val(); 
    var linkTkKey = $("#linkTkKey").val();
     
    var paymentDay = $("#paymentDay").val(); 	//20231212 yoonsang
    let aos_inscd  = $("#aos_inscd").val();   //20240806
    let aos_insnm  = $("#aos_insnm").val();   //20240806
    
    //console.log("aos_inscd : "+ aos_inscd)
    //console.log("aos_insnm : "+ aos_insnm)
    
    
     //필수값 체크
    if (custCode == '') {	alert("거래처코드는 필수 입력해야 합니다.");		 $("#custCode").focus();		return;	}
    if (custName == '') {	alert("거래처명(약명)은 필수 입력해야 합니다."); $("#custName").focus();		return;	}
    if (formalName == '') {	alert("거래처명(정식명)은 필수 입력해야 합니다.");    $("#formalName").focus();		return;	}
    if (cleanedPhone.length < 8 ) {	alert("전화번호는 필수 입력해야 합니다.(최소8자리)");    $("#phone").focus();		return;	}
    if (custType != 'C2' && bizNo == ''){ alert("법인의 경우 사업자번호는 필수 입력해야 합니다.");  $("#bizNo").focus();		return;		}  //개인인 경우만 사업자번호 미등록가능
    if (supplyYN == ''){ alert("거래구분을 선택해주세요");  $("#bizNo").focus();		return;		}  //개인인 경우만 사업자번호 미등록가능
    if (custType == 'C1'&& supplyYN   == "Y"&&bzType == ''){ alert("업태는 필수 입력해야 합니다.");   $("#bzType").focus();		return;		}   
    if (custType == 'C1'&& supplyYN   == "Y"&&bzItems == ''){ alert("종목은 필수 입력해야 합니다."); $("#bzItems").focus();		return;		}   
    if (custType == 'C1'&& supplyYN   == "Y"&&ceoName == ''){ alert("대표자명은  필수 입력해야 합니다.");   $("#ceoName").focus();		return;		}   
    if (custAddress1 == ''){ alert("사업장주소는 필수 입력해야 합니다.");    $("#custAddress1").focus();		return;		}   
     if (custType == 'C1'&& supplyYN   == "Y"&&taxEmail == ''){ alert("세금계산서 이메일은 필수 입력해야 합니다.");   $("#taxEmail").focus();		return;		}   
 //   console.log ("rr"+ $(':radio[name="centerYN"]:checked').val());
    if ($('#placeYN ').is(':checked') == true && ($(':radio[name="centerYN"]:checked').val() =='' ||  $(':radio[name="centerYN"]:checked').val() ==undefined ))
    { alert("발주업체의 경우 센터/외부 선택을 해야합니다.");   $(':radio[name="centerYN"]').focus();		return;	}
    

	var addList = AUIGrid.getAddedRowItems(myGridID);
	
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID);
	//console.log("updateList"+JSON.stringify(updateList)); 
	
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);
    
 	// 추가된 행 아이템들(배열)
  	var addList2 = AUIGrid.getAddedRowItems(myGridID2);                   
	// 수정된 행 아이템들(배열)
	var updateList2 = AUIGrid.getEditedRowColumnItems(myGridID2); 
	// 삭제된 행 아이템들(배열)
	var removeList2 = AUIGrid.getRemovedItems(myGridID2);
   // console.log("addList:"+addList);
	formData.append("workingType", workingType);
	formData.append("custCode", custCode);
	formData.append("custName", custName);
	formData.append("formalName", formalName);
	formData.append("bizNo", bizNo);
	formData.append("bzType", bzType);
	formData.append("bzItems", bzItems);
	formData.append("custType", custType);
	formData.append("ceoName", ceoName);
	formData.append("custAddress1", custAddress1);
	formData.append("custAddress2", custAddress2);
	//formData.append("outsideCode", outsideCode);
	formData.append("phone", phone);
	formData.append("fax", fax);
	formData.append("taxType", taxType);
	formData.append("cashType", cashType);
	formData.append("balanceDspType", balanceDspType);
	formData.append("payDay", payDay);
	formData.append("payType", payType);
	formData.append("accNum", accNum);
	formData.append("validYN", validYN);
	formData.append("releasePriceType", releasePriceType);
	formData.append("warehousePriceType", warehousePriceType);
	formData.append("marginRate", marginRate);
	formData.append("warehouseRate", warehouseRate);
	formData.append("releaseLimit", releaseLimit);
	formData.append("depositLimitDay", depositLimitDay);
	formData.append("memo", memo);
	//formData.append("admGroupCode", admGroupCode);
	//formData.append("admEmpNo", admEmpNo);
	formData.append("taxMobile", taxMobile);
	formData.append("taxEmail", taxEmail);
	formData.append("placeYN", placeYN);
	formData.append("supplyYN", supplyYN);
	formData.append("centerYN", centerYN);
	formData.append("mainCustCode", mainCustCode);
	formData.append("linkTkKey", linkTkKey);

	formData.append("paymentDay", paymentDay);	//20231212 yoonsang
	
	formData.append("addList", JSON.stringify(addList));
	formData.append("updateList", JSON.stringify(updateList));
	formData.append("removeList", JSON.stringify(removeList));
	formData.append("addList2", JSON.stringify(addList2));
	formData.append("updateList2", JSON.stringify(updateList2));
	formData.append("removeList2", JSON.stringify(removeList2));
	formData.append("salePriceType", $("#salePriceType").val());
	
	formData.append("aos_inscd", aos_inscd);	//20240806
	formData.append("aos_insnm", aos_insnm);	//20240806
/* 
 */         
  
 
		$.ajax({
		method: 'POST',
		enctype: 'multipart/form-data',
		url: "/base/custInfoAdd",
		data: formData,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		beforeSend: function() {	
		},
		success: function(data) {
	 		
			//에러코드 무시하고 처리되었음으로 뜨던 부분 수정
			if(data.result_code == 'Err')
			{
				alert(data.result_msg);
			}
			else
			{
				alert("OK" + ":" + "처리되었습니다");
			
			//updateDataToServer("/base/custAdd", workingType);
			//location.reload(true);
			findCustMst('/base/cust-list');  //2024.11.19 sg-위에거에서 변경
		}
		
	}});
}
		
   