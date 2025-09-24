

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
/*
var datepicker1 = new tui.DatePicker('#wrapper1', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#popPlWhYmd',
		format: 'yyyy-MM-dd'
	}
});
*/
/* End : Date Picker Date Range*/


// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
		  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	//set branch 2023.06.30
  	branchCodeSelect("/base/code-list")		
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var roNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        
        if ( typeof roNo == 'undefined'){ roNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	
        $("#roNo").val(roNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
       // findDataToServer("/logis/ro-list",page);
       //findRegItem('/logis/ro-item-list');	
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var roNo_val = $("#roNo").val(); 
				
		document.location.hash = '#info'+currentPage+"!"+roNo_val+"!"+sYmd+"!"+eYmd;
		
	//findDataToServer("/logis/ro-list", 1);
	 findRegItem('/logis/ro-item-list');	
	});
	
		$("#btnReg").click(function(){
		//alert("저장버튼");
		updateDataToServer("/logis/roItemAdd", "workingType");

	});
	
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField: "idx", headerText: "idx", width: 50, editable: false, visible: false }
	,{ dataField : "roNo",   headerText : "반출번호", width: 100,
	styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}, editable: false}
	,{ dataField : "roSeq",      headerText : "반출순번", width : 100, editable : false ,visible: false} 
	 ,{ dataField : "roYmd",    headerText : "반출일자", width : 100, editable: false}
	 ,{ dataField : "placeWhYmd",      headerText : "발주처입고일자", width : 100, editable : false } 
	, { dataField : "placeDmdYmd",    headerText : "발주일자", width : 100, editable: false} 
	,{ dataField : "placeCustCode",     headerText : "발주처코드", width : 80, visible: false  , editable: false}
	,{ dataField : "placeCustName",     headerText : "발주처" , style:"left" , width : 140, editable: false}
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField : "itemId",     headerText : "부품ID", style:"left"  , editable: false}
	,{ dataField: "makerCode",        headerText: "제조사"  , width : 50,editable: false    }
	,{ dataField : "itemNo",   headerText : "부품번호" ,width : 100 , style:"left", editable: false}
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
	,{ dataField : "itemName",   headerText : "부품명" , style:"left", editable: false}
	,{ dataField : "cnt",   headerText : "수량" , dataType: "numeric",formatString: "#,##0"  , style:"right", editable: false}
	,{ dataField : "roSumPrice",   headerText : "공급가액" , dataType: "numeric",formatString: "#,##0"  , style:"right", editable: false}
	,{ dataField : "taxPrice",   headerText : "세액", dataType: "numeric",formatString: "#,##0"  , style:"right", editable: false, visible: false}
	,{ dataField : "sumPriceTax",   headerText : "합계금액(포함)", dataType: "numeric",formatString: "#,##0"  , style:"right", editable: false}
	,{ dataField : "penaltyPrice",   headerText : "페널티금액 (포함)" , dataType: "numeric",formatString: "#,##0"  , style:"right"}
	,{ dataField : "custOrderNo",   headerText : "오더번호" , style:"left"  , width : 130}
	,{ dataField : "custRoNo",   headerText : "발주처 반출번호" , style:"left" , width : 130}
	,{ dataField : "orderGroupId",     headerText : "주문그룹ID", width : 100 ,
	styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}, editable: false }
	,{ dataField : "branchCode",   headerText : "관리지점" , width: 100}//2023.06.30 bk
	,{ dataField : "supplyCustName",   headerText : "주문처" ,width : 100 , editable: false}
	,{ dataField : "carNo",   headerText : "차량번호" ,width : 100 , editable: false}
	,{ dataField : "regUserId",   headerText : "요청자" ,width : 100 , editable: false}
];

var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "roSumPrice",		positionField: "roSumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "taxPrice",		positionField: "taxPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPriceTax",		positionField: "sumPriceTax",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "penaltyPrice",		positionField: "penaltyPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
 
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			editable : true,
			rowIdField: "idx",			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false,
			
			// 엑스트라 체크박스 표시 설정
			showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			//enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			showRowAllCheckBox: true,
			 
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
	AUIGrid.setFooter(myGridID, footerLayout);
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		var roNo = event.item.roNo;
		//console.log("storageUseReqNo:"+storageUseReqNo);  
		if (event.dataField == 'roNo') {   
			$.fancybox.open({
			  href : '/logis/ro-item-list?roNo='+roNo    , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
		}
		
		/*
		if (event.dataField == 'orderGroupId'){
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
		
		}
		*/
		AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

			var orderGroupId = event.item.orderGroupId;
			if (event.dataField == 'orderGroupId') {
				//window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId;
				var orderGroupId = event.item.orderGroupId;
				var url = '/order/order-group-item-list?orderGroupId=' + orderGroupId
				var newWindow = window.open(url, '_blank');
				 newWindow.focus();
			}		
					
		});				
		
				
	});
	
		
}


//요청 품목 조회
function findRegItem(url) {
	//console.log("initem");
	var list = [];
	var roNo = $("#roNo").val();
	//console.log("roNo:"+roNo);
	var orderGroupId = $("#orderGroupId").val();
	var custCode = $("#custCode").val();
	var itemNo = $("#itemNo").val();
	var custOrderNo = $("#custOrderNo").val();
	var workingType = "LIST";
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
   // console.log("a:"+ordArr);
   // console.log("a:"+seqArr);
 // console.log("custCode:"+custCode);
 // console.log("itemNo:"+itemNo);
  //console.log("custOrderNo:"+custOrderNo);
  var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
  var  custRoNo = $("#custRoNo").val(); // 2023.08.01 bk
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	} //2023.08.16 bk


	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType,
			"roNo":roNo,
			"orderGroupId":orderGroupId,
			"custCode":custCode,
			"itemNo":itemNo,
			"custOrderNo":custOrderNo,
			"sYmd":sYmd,
			"eYmd":eYmd,		
			"branchCode":branchCode, // 2023.06.30 bk 
			"custRoNo":custRoNo // 2023.06.30 bk 
			,"ymdIgnoreYN":ymdIgnoreYN
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
		 
			if (data.roItemList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.roItemList.length;i++){
				    list.push({
						idx: i						  
						,roNo: data.roItemList[i].roNo
						,roSeq: data.roItemList[i].roSeq  
						,makerCode: data.roItemList[i].makerCode 
						,itemId: data.roItemList[i].itemId 
						,itemNo: data.roItemList[i].itemNo 
						,itemName: data.roItemList[i].itemName
						,itemNameEn: data.roItemList[i].itemNameEn 
						,reqCnt: data.roItemList[i].reqCnt 
						,roCnt: data.roItemList[i].cnt
						,roUnitPrice: data.roItemList[i].roUnitPrice 
						,roSumPrice: data.roItemList[i].cnt *  data.roItemList[i].roUnitPrice
						,reqRegUserId: data.roItemList[i].reqRegUserId 
						,roRegUserId: data.roItemList[i].regUserId
						,memo1: data.roItemList[i].memo1 
						,roReqNo: data.roItemList[i].roReqNo 
						,orderGroupId: data.roItemList[i].orderGroupId 						
						,placeCustCode: data.roItemList[i].placeCustCode 
						,placeCustName: data.roItemList[i].placeCustName 
						,roYmd: data.roItemList[i].roYmd 
						,itemNo: data.roItemList[i].itemNo 
						,itemName: data.roItemList[i].itemName 
						,itemId: data.roItemList[i].itemId 
						,cnt: data.roItemList[i].cnt 
						,taxPrice: data.roItemList[i].cnt *  data.roItemList[i].roUnitPrice*0.1
						,sumPriceTax: data.roItemList[i].cnt *  data.roItemList[i].roUnitPrice*1.1
						,placeDmdYmd: data.roItemList[i].placeDmdYmd 
						,custOrderNo: data.roItemList[i].custOrderNo 
						,supplyCustName: data.roItemList[i].supplyCustCode 
						,carNo: data.roItemList[i].carNo 
						,penaltyPrice: data.roItemList[i].penaltyPrice 
						,branchCode: data.roItemList[i].branchCode //2023.06.30 bk
						,placeWhYmd: data.roItemList[i].placeWhYmd //2023.07.10 bk
						,custRoNo: data.roItemList[i].custRoNo //2023.07.10 bk
						
						,className: data.roItemList[i].className 
						,factoryNo: data.roItemList[i].factoryNo 
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



function updateGridRowCust(obj,name) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	//console.log("row1:"+rowItem.itemNo);
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	$(obj).val(rowItem.custCode);
	$("#"+name+"").val(rowItem.custName);
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
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




// 데이터 서버로 보내기 페널티 입력 
function updateDataToServer( url, workingType ) {
	
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	
	
    if (  updateList.length == 0 ){
		alert("변경사항이 없습니다.");
		return false;
	}

	//console.log("updateList"+updateList.length);

		
	
	var data = {};
	
	if(updateList.length > 0) data.roItemUpdate = updateList;
	else data.roItemUpdate = [];

	data.workingType = workingType;
	//console.log("data:"+updateList[0].penaltyPrice);
	//console.log("workingType:"+workingType);
	//console.log("data:"+addList[0].pwdEnc);
	
	 //console.log("json:"+JSON.stringify(data));
	 //return;
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	       	alert(data.result_msg);	       
	        alert(data.result_code+":"+data.result_msg);
	        location.reload();
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};


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

		//alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");
	} else {
		//alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
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
/*
function openDialog1(){
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	var rowItem;
	var roNo;
	var roSeq;
	var roNoArr;
	var roSeqArr;
	var rowId;
	var placeWhYmd
	var checked;
	var diffIdx;
	
	var custCodeStd = "";
	var custNameStd = "";
	var custCodeNow = "";
	var rowIdField = AUIGrid.getProp(myGridID, "idx");
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		if (i == 0) {
			custCodeStd = rowItem.item.placeCustCode;
			custNameStd = rowItem.item.placeCustName;
		}else {
			custCodeNow = rowItem.item.placeCustCode;
			diffIdx = rowItem.item.idx;
		}
		
		if (i != 0 && custCodeStd != custCodeNow) {

			rowId = rowItem[rowIdField];
			checked = AUIGrid.isCheckedRowById(myGridID, rowId);
			
			alert("동일한 발주처만 선택하세요.");
			return;
		}
		roNo = rowItem.item.roNo;
		roSeq = rowItem.item.roSeq;
	
		if (typeof roNo == 'undefined' || roNo == null) {			roNo = "";		}
		if (typeof roSeq == 'undefined' || roSeq == null) {			roSeq = "";		}
		
		
		if (i == 0) {
			roNoArr = roNo;						
			roSeqArr = roSeq;
		}else{
			roNoArr = roNoArr + "^" +roNo;		
			roSeqArr = roSeqArr + "^" +roSeq;
			
		}
	}
	
	$("#popCustName").val(custNameStd);
	$("#popCustCode").val(custCodeStd);
	$("#popRoNoArr").val(roNoArr);
	$("#popRoSeqArr").val(roSeqArr);
	var dialogChangeDate;
	dialogChangeDate = $("#dialog-form1").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: 400,
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			//"확인": changePlRlYmd(whNoArr,whSeqArr,placeRlYmd),
			"확인": changePlWhYmd,
			"취소": function(event) {
				dialogChangeDate.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	

		}
	});
		
}

function changePlWhYmd(){
	var roNoArr = $("#popRoNoArr").val();
	var roSeqArr = $("#popRoSeqArr").val();
	var placeWhYmd = $("#popPlWhYmd").val();
	var workingType = "CHANGE_PL_WH_DATE"
	
	
	var data = {};
	
    data.roNoArr = roNoArr;
	data.roSeqArr = roSeqArr;
	data.placeWhYmd = placeWhYmd;
	data.workingType = workingType;
	
	$.ajax({
	    url : "/logis/changePlWhYmd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : data,
	    
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
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
*/
