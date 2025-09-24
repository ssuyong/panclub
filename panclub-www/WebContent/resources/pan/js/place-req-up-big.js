/*
변경사항

.jsp- 팝업뜨는 jsp
 - 그리드명 변경 및 width height 변경
.jsp - 부모창 
 - 버튼에 id 부여 후 클릭 시 onClick 이벤트로 변경
 - 아래를 팝업뜨는 곳에서 부모창으로 이동
    <!-- Begin : Toast Date Picker  -->
	<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
	<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.js"></script>
	<!-- End : Toast Date Picker  -->
	
.js 팝업뜨는 js
- myGridID -> myGridID_placerequp
- createAUIGrid -> createAUIGrid_placerequp   
- parent.facybox.reload -> location.reload로 변경. 닫기버튼, 처리후 완료 시
 
*/

// 그리드 생성 후 해당 ID 보관 변수
var myGridID_placerequp;



var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#placeDmdYmd',
        format: 'yyyy-MM-dd'
    }                              
});
    
   
var datepicker2 = new tui.DatePicker('#wrapper2', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#whSchYmd',
        format: 'yyyy-MM-dd'
    }
});
    
//alert("bbb"); 
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	console.log("hi");

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	
	var keyValueList3 = findDataToServer3("/base/cust-list", "N");
		
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid_plrequp(keyValueList3);	
	
		 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
		//console.log("닫기");
		//parent.jQuery.fancybox.close();
		location.reload(true);
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
		// 윈도우 리사이징 이벤트
	//window.onresize = function () {
		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID_placerequp !== "undefined") {
			AUIGrid.resize(myGridID_placerequp);
		}
	//};

});

// Master 그리드 를 생성합니다.
function createAUIGrid_plrequp(keyValueList3) {
	var keyValueList4 = JSON.parse(keyValueList3);
	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false }
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 100, editable : false }
		//,{ dataField : "placeCustCode",      headerText : "발주처코드", width : 80, editable : false }
		//,{ dataField : "placeCustName",      headerText : "발주처명", width : 140, editable : false, style:"left" }
		,{ dataField: "placeCustCode", headerText: "발주처",	 width : 140,	   sortType: 1,		   cellMerge: true,		   editable: true,  style : "left auigrid-must-col-style", 
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;
				for (var i = 0, len = keyValueList4.length; i < len; i++) {
					if (keyValueList4[i]["code"] == value) {
						retStr = keyValueList4[i]["value"];
						break;
					}
				}
				return retStr;
			},
			editRenderer: {
				type: "DropDownListRenderer",
				list: keyValueList4,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			}
		}		
		//,{ dataField : "placeCustCode",     headerText : "발주처코드"  ,editable : false }
		//,{ dataField : "placeCustName",      headerText : "발주처명"  , style:"left"   ,editable : false
		
		/*,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");
					 $("#grid-custCode1").val("placeCustCode");
					$("#grid-custName1").val("placeCustName");
					
					var dialogCust;
					dialogCust = $( "#dialog-form-cust" ).dialog({
					    //autoOpen: false,
					    height: 700,
					    //minWidth: 500,
					    width: "70%",
					    modal: true,
					    headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_plrequp_item") },
						position:[400,400],
						buttons: {
							"확인": function(event) {
								updateGridRowCust("placeCustCode", "placeCustName", 'Y');
							},
							"취소": function (event) {
								dialogCust.dialog("close");
							}
						},
					    close: function() {
					     // $( "#users tbody tr td" ).empty();	   	
					    }
					});	
					createGridCust(columnLayoutCust);
					dialogCust.dialog("open");
				}
			}  */
		 //}
		
		,{ dataField : "itemId",      headerText : "부품ID", width : 100, editable : false }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false
			,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '필수입력값입니다.'
		    }  } 
		,{ dataField : "itemName", headerText : "품명", width: 120, editable : false   , style:"left"} 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "orderCnt",      headerText : "주문수량", width : 120, editable : false  , style:"right"  }
		,{ dataField : "salePrice",      headerText : "주문할인단가", dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right" , editable : false    }
		,{ dataField : "availableCnt",     headerText : "발주가능수량" , dataType: "numeric", editable : false, style : "right" }
		,{ dataField : "cnt",     headerText : "발주수량" , dataType: "numeric", style : "right auigrid-must-col-style"}
		,{ dataField : "unitPrice",     headerText : "발주단가", dataType: "numeric",formatString: "#,##0"  , style:"right  auigrid-must-col-style" }
		,{ dataField : "sumPrice",     headerText : "합계", editable : false, dataType: "numeric",formatString: "#,##0"  , style:"right" }
		,{ dataField : "memo1",     headerText : "비고1" , style:"left  auigrid-opt-col-style"}
		,{ dataField : "memo2",     headerText : "비고2", style:"left  auigrid-opt-col-style"}
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "singleRow",
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

		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			
			//if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
			//	return false;
			//}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			//if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
			//	return false; // false 반환하면 disabled 처리됨
			//}
			return true;
		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap_plrequp 에 그리드 생성
	myGridID_placerequp = AUIGrid.create("#grid_wrap_plrequp", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID_placerequp, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID_placerequp, "cellEditEnd", auiCellEditingHandler);

	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID_placerequp, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID_placerequp, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		console.log("aa");
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID_placerequp, "ready", auiGridCompleteHandler);
	
};

function auiCellEditingHandler(event) {
	
		//이겅
	if (event.dataField == 'placeCustName'){
		//setStartSpinner();
		//$("#srchEqualItemNo").val(event.value); 
		$("#pop_cust_srch").val(event.value);
		//$("#pop_itemName").val();
		//ddRow(myGridID_placerequp,'last');  //부품찾은 후 행추가
		//createGridCust(columnLayoutCust, obj, name);
		$("#grid-custCode1").val("placeCustCode");
		$("#grid-custName1").val("placeCustName");
		
		findCust(this,'',0,'Y');
		//findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	    fn_dcProc();
		//setStopSpinner();
	    	
	}	
	
	if (event.dataField == 'cnt' || event.dataField == 'unitPrice' ) {
		var sumPrice = event.item.cnt * event.item.unitPrice; 
		AUIGrid.updateRow(myGridID_placerequp, { "sumPrice": sumPrice }, event.rowIndex);	
	}
	
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		if (event.item.cnt > event.item.orderCnt  || event.item.cnt > event.item.availableCnt) {
			alert("발주수량이 주문수량 또는 발주가능수량보다 많습니다!");
			item = {
				cnt: event.item.availableCnt,
				sumPrice : event.item.availableCnt * event.item.unitPrice
			};
			AUIGrid.updateRow(myGridID_placerequp, item, "selectedIndex");
		}
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	

function updateGridRowCust(obj,name, gridYN) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridID_placerequpCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	console.log("gridYN : " + gridYN)
	if (gridYN == 'Y') {	
		item = {
						placeCustCode: rowItem.custCode,
						placeCustName: rowItem.custName,
					};
		  console.log("Selected item:"+ rowItem);
		 AUIGrid.updateRow(myGridID_placerequp, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.custCode);
			$("#"+name+"").val(rowItem.custName);
	}
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");	
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

	AUIGrid.updateRow(myGridID_placerequp, item, currentRowIndex);
	
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
  	var addList = AUIGrid.getAddedRowItems(myGridID_placerequp);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID_placerequp); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID_placerequp);    
    
	var isValid1 = AUIGrid.validateGridData(myGridID_placerequp, ["itemNo", "salePrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID_placerequp, ["itemNo", "cnt", "salePrice"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
		
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
	var addedRowItems = AUIGrid.getAddedRowItems(myGridID_placerequp);
	 
	// 수정된 행 아이템들(배열) : 진짜 수정된 필드만 얻음.
	var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID_placerequp);
	
	// 수정된 행 아이템들(배열) : 수정된 필드와 수정안된 필드 모두를 얻음.
	//var editedRowItems = AUIGrid.getEditedRowItems(myGridID_placerequp); 
	
	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID_placerequp);
	
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

	AUIGrid.removeRow(myGridID_placerequp, "selectedIndex");
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
					makerName = data.orderGroupList[i].makerName;
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
					
					//$("#orderGroupId").text(orderGroupId);
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
					$("#makerName_carType").text(makerCode + ' ' + carType); 
					//$("#carType").text(carType); 
					//$("#dcRate").val(dcRate); 
					//$("#dcDspType").val(dcDspType); 
					//$("#agencyFeeRate").val(agencyFeeRate); 
					//$("#marginRate").val(marginRate); 
					//$("#memo1").val(memo1); 
					//$("#memo2").val(memo2); 
					$("#orderYmd").text(orderYmd); 
					$("#regUserName").text(regUserName);
					
					$("#dataComCode").val(data.orderGroupList[i].comCode);  //2023.07.17 by dataCheck
				}		
				//findOrderGroupItem('/order/orderGroupItemList');			
				findOrderGroupItem('/order/plReqItemTgList');  //2023.12.19 	
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
	var workingType = "LIST";      // "PR_TARGET"
	
	var ordArr  = $("#ordArr").val();
	var seqArr  = $("#seqArr").val();
   // console.log("a:"+ordArr);
   // console.log("a:"+seqArr);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"orderGroupId":orderGroupId,
			"ordArr":ordArr,
			"seqArr":seqArr,
			
			"workingType":workingType			
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
						,placeCustCode: data.orderGroupItemList[i].placeCustCode 
						,placeCustName: data.orderGroupItemList[i].placeCustName
						,itemId: data.orderGroupItemList[i].itemId 
						,itemNo: data.orderGroupItemList[i].itemNo 
						,itemName: data.orderGroupItemList[i].itemName
						,itemNameEn: data.orderGroupItemList[i].itemNameEn 
						,orderCnt: data.orderGroupItemList[i].orderCnt 
						,availableCnt: data.orderGroupItemList[i].availableCnt 
						,cnt: data.orderGroupItemList[i].availableCnt
						,unitPrice: data.orderGroupItemList[i].placeUnitPrice 
						,sumPrice: data.orderGroupItemList[i].orderCnt * data.orderGroupItemList[i].placeUnitPrice
						,memo1: data.orderGroupItemList[i].memo 						
						,memo2: data.orderGroupItemList[i].memo2 
						,salePrice: data.orderGroupItemList[i].salePrice
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap_plrequp", list);
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
		
		
///발주요청전송
function placeReqSend(url){
 
 	var orderGroupId = $('#orderGroupId').val();
 	var placeMgr = $('#placeMgr').val();
 	var memo = $('#memo').val();
 	var placeDmdYmd = $('#placeDmdYmd').val();
 	var whSchYmd = $('#whSchYmd').val();

 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID_placerequp);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	
	//기발주 체크
	var rowItem;
	var errCnt = 0;
	var errCnt2 = 0;
	AUIGrid.setProp(myGridID_placerequp, "rowStyleFunction", function (rowIndex, item) {
		if ( isEmpty(item.placeCustCode) ==true && AUIGrid.isCheckedRowById(myGridID_placerequp, item.idx) == true ) { //rowIndex -> item.idx. 2024.04.12
			errCnt = errCnt + 1;
		}
		return "";	
	});

	if (errCnt > 0) {
		alert("발주처가 등록이 안된건은 발주요청할 수 없습니다.")
		return;
	}
	//console.log("checkedItems"+checkedItems.length) ;
	
	var rowItem;
	var reqArr = ""
	var rseArr = ""
	var ordArr = ""
	var seqArr = "";
	var cusArr = ""; //발주처코드
	var cntArr = ""; //발주수량
	var uniPriArr = "";   //발주단가
	var memo1Arr = "";
	var memo2Arr = "";	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i]; 
		
		placeReqNo = rowItem.item.placeReqNo;
		reqSeq = rowItem.item.reqSeq;
		orderNo = rowItem.item.orderNo;
		orderSeq = rowItem.item.orderSeq;
		placeCustCode = rowItem.item.placeCustCode;
		placeCnt = rowItem.item.cnt;
		if(placeCnt == 0){
			errCnt2 = errCnt2 +1;
			break;		
		}
		placeUnitPrice = rowItem.item.unitPrice; 
		memo1 = rowItem.item.memo1;
		memo2 = rowItem.item.memo2;
		
		if (typeof placeReqNo == 'undefined' || placeReqNo == null) {			placeReqNo = "";		}
		if (typeof reqSeq == 'undefined' || reqSeq == null) {			reqSeq = "";		}
		if (typeof orderNo == 'undefined' || orderNo == null) {			orderNo = "";		}
		if (typeof orderSeq == 'undefined' || orderSeq == null) {			orderSeq = "";		}
		if (typeof placeCustCode == 'undefined' || placeCustCode == null) {			placeCustCode = "";		}
		if (typeof placeCnt == 'undefined' || placeCnt == null) {			placeCnt = "";		}
		if (typeof placeUnitPrice == 'undefined' || placeUnitPrice == null) {			placeUnitPrice = "";		}
		if (typeof memo1 == 'undefined' || memo1 == null) {			memo1 = "";		}
		if (typeof memo2 == 'undefined' || memo2 == null) {			memo2 = "";		}
		
		
		if (i == 0) {
			reqArr = placeReqNo;
			rseArr = reqSeq;
			ordArr = orderNo;		
			seqArr = orderSeq;
			cusArr = placeCustCode;   
			cntArr = placeCnt;
			uniPriArr = placeUnitPrice;
			memo1Arr = memo1;
			memo2Arr = memo2;								
		}else{
			reqArr = reqArr + "^" +placeReqNo;
			rseArr = rseArr + "^" +reqSeq;
			ordArr = ordArr + "^" +orderNo;		
			seqArr = seqArr + "^" +orderSeq;
			cusArr = cusArr + "^" +placeCustCode;
			cntArr = cntArr + "^" +placeCnt;
			uniPriArr = uniPriArr + "^" +placeUnitPrice;
			memo1Arr = memo1Arr + "^" +memo1;
			memo2Arr = memo2Arr + "^" +memo2;
		}
			//console.log("reqArr"+reqArr.length);
		/*
		reqArr = reqArr + "^" +rowItem.item.placeReqNo;
		rseArr = rseArr + "^" +rowItem.item.reqSeq;
		ordArr = ordArr + "^" +rowItem.item.orderNo;		
		seqArr = seqArr + "^" +rowItem.item.orderSeq;
		cusArr = cusArr + "^" +rowItem.item.placeCustCode;
		cntArr = cntArr + "^" +rowItem.item.placeCnt;
		*/
	}
	if (errCnt2 > 0) {
		alert("발주수량이 '0' 입니다.")
		return;
	}

	var data = {};
    data.workingType = "ADD";
    //master
	data.orderGroupId = orderGroupId;
	data.placeMgr = placeMgr;
	data.memo = memo;
	data.placeDmdYmd = placeDmdYmd;
	data.whSchYmd = whSchYmd;
	
	//sub
	data.reqArr = reqArr;   //요천번호 
	data.rseArr = rseArr;    //요청순번
	data.ordArr = ordArr;    //주문번호
	data.seqArr = seqArr;    //주문순번
	data.cusArr = cusArr;    //발주거래처코드
	data.cntArr = cntArr;    //발주수량
	data.uniPriArr = uniPriArr;    //발주단가
	data.memo1Arr = memo1Arr;    //메모1
	data.memo2Arr = memo2Arr;    //메모2
	
	
	if (placeCustCode == '') {alert('발주처를 입력해주세요');
	return;}
   
    //console.log("url:"+url);
    //console.log("JSON.stringify(data):"+JSON.stringify(data));
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
			"placeMgr" : placeMgr,
			"memo" : memo,
			"placeDmdYmd" : placeDmdYmd,
			"whSchYmd" : whSchYmd,
						
			"reqArr" : reqArr,   //요천번호 
			"rseArr" : rseArr,    //요청순번
			"ordArr" : ordArr,    //주문번호
			"seqArr" : seqArr,    //주문순번
			"cusArr" : cusArr,    //발주거래처코드
			"cntArr" : cntArr    //발주수량    
			,"uniPriArr" : uniPriArr    //발주단가
			,"memo1Arr" : memo1Arr    //메모1
			,"memo2Arr" : memo2Arr    //메모2			
			,"dataComCode" : dataComCode  //2023.07.17 			
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
		

function findDataToServer3(url, listYN) {
	$(".ui-dialog-titlebar-close").html("X");
	var list = []; //자바스크립트 배열선언
	var listS;
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"placeYN":"Y" 
			,"orderBy": "custName"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				arr_text = "<select id='mCode' style='padding:7px 20px;' >";
				for (i = 0; i < data.custList.length; i++) {
					if (data.custList[i].custType == "C3") {
						code = data.custList[i].custCode;
						value = data.custList[i].custName;
						list[j] = { "code": code, "value": value };
						j = j + 1;
						arr_text = arr_text + "<option value=" + code + " mname=" + value + ">" + code + "-" + value + "</option>";
					}
				}
				arr_text = arr_text + "</select>";
				if (listYN == "Y") { $("#srChoice tbody tr td").append(arr_text); };
			}
			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!
		},
		error: function(x, e) {
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
			} else if (x.status == 404) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
			} else if (x.status == 500) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
			} else if (e == 'parsererror') {
				alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
			} else if (e == 'timeout') {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
			} else {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n' + x.responseText + ')');
			}
		}
	});
	return listS; // 리턴을 바깥에서 해야함
}
	