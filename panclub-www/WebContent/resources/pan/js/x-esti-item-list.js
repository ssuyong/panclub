// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridIDItem;
var myGridIDCust;
var myGridIDCustMgr;
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
}

$(document).ready(function(){
	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	//관리지점코드에 셋팅
  	branchCodeSelect("/base/code-list")
  	
	createAUIGrid();	

	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
   		document.location.hash = '#info'+currentPage+"!"+srchDateType+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+estiNo+"!"+carNo+"!"+itemNo+"!"+delUserName+"!"
   		+itemId+"!"+branchCode+"!"+regUserName;

     
        var page = info[0];
        var srchDateType = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var ymdIgnoreYN = info[4];
  		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		var custCode = info[5];
		var estiNo = info[6];
		var carNo = info[7];
		var itemNo = info[8];
		var delUserName = info[9];
		var itemId = info[10];
		var branchCode = info[11];
		var regUserName = info[12];
		       
        if ( typeof srchDateType == 'undefined'){ srchDateType = '삭제일'	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	    if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	    if ( typeof custCode == 'undefined'){ custCode = ''	}
	    if ( typeof estiNo == 'undefined'){ estiNo = ''	}
	    if ( typeof carNo == 'undefined'){ carNo = ''	}
		if ( typeof itemNo == 'undefined'){ itemNo = ''	}
		if ( typeof delUserName == 'undefined'){ delUserName = ''	}
		if ( typeof itemId == 'undefined'){ itemId = ''	}
		if ( typeof branchCode == 'undefined'){ branchCode = ''	}
		if ( typeof regUserName == 'undefined'){ regUserName = ''	}

        $("#srchDateType").val(srchDateType);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		$("#custCode").val(custCode);
		$("#estiNo").val(estiNo);
		$("#carNo").val(carNo);		
		$("#itemNo").val(itemNo);
		$("#delUserName").val(delUserName);
		$("#itemId").val(itemId);
		$("#branchCode").val(branchCode);
		$("#regUserName").val(regUserName);

        findEstiItem('/order/esti-item-list');		
  	}
  	

	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		let srchDateType = $("#srchDateType").val();
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		 
 		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		var custCode = $("#custCode").val(); 
		var carNo = $("#carNo").val();  
		let estiNo = $("#estiNo").val();
		
		var itemNo = $("#itemNo").val();
		var itemId = $("#itemId").val();
		var branchCode = $("#branchCode").val();
		var regUserName = $("#regUserName").val();
		let delUserName = $("#delUserName").val();
		
		document.location.hash = '#info'+currentPage+"!"+srchDateType+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+estiNo+"!"+carNo+"!"+itemNo+"!"+delUserName+"!"+itemId+"!"+branchCode+"!"+regUserName;
		
		findEstiItem('/order/esti-item-list');				
	});
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 50  }		 
		,{ dataField : "deleted",   headerText : "삭제일시", width : 150 }
		,{ dataField : "delUserName",   headerText : "삭제자", width : 70 }
		,{ dataField : "restoreYN",   headerText : "복원", width : 70 }
		,{ dataField : "estiYmd",  headerText : "견적일", width : 70 }
		,{ dataField : "estiNo",   headerText : "견적번호", width : 100 }
		,{ dataField : "estiSeq",  headerText : "견적순번", width : 70, dataType: "numeric" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",   headerText : "부품ID", width : 140}
		,{ dataField : "makerName",  headerText : "제조사", width : 50} //2023.10.17
		,{ dataField : "itemNo",      headerText : "품번", width : 140 , style:"left" 		 } 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
		,{ dataField : "itemName", headerText : "품명", width: 160, editable : true, style:"left"  } 
		,{ dataField : "cnt",      headerText : "수량", width : 70, dataType: "numeric",formatString: "#,##0"  , style:"right " }
		,{ dataField : "unitPrice",     headerText : "단가", dataType: "numeric",formatString: "#,##0"  , style:"right"  }	     
		,{ dataField : "salePrice",     headerText : "할인단가", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		,{ dataField : "taxPrice",     headerText : "세액", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		,{ dataField : "sumPrice",     headerText : "합계", editable : false , dataType: "numeric",formatString: "#,##0" , style:"right" }
		,{ dataField : "ceilUnit",     headerText : "올림단위", width: 56, dataType: "numeric",formatString: "#,##0" , style:"right", editable : false }
		,{ dataField : "memo",     headerText : "비고"  , style:"left"}
		,{ dataField : "placeCustCode",     headerText : "예정발주처코드" }
		,{ dataField : "placeCustName",      headerText : "예정발주처명"  , style:"left "	 }
		,{ dataField : "placeUnitPrice",      headerText : "발주단가" , dataType: "numeric",formatString: "#,##0"   , style:"right"}		
		,{ dataField : "rcvlogisCode",	     headerText : "수령물류센터",		 width : 120		}
	];
	
	// 그리드 속성 설정
	var gridPros = {

		editable : false,			

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
		showRowCheckColumn: true, //체크박스 표시 설정
        // 전체 선택 체크박스가 독립적인 역할을 할지 여부
		independentAllCheckBox: true,
		
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enterKeyColumnBase: true,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
						
		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		
		// 푸터를 상단에 출력시킴(기본값: "bottom")
		showFooter: false,

       sortableByFormatValue :true,
			
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.restoreYN == "O") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},
		
	   // 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.restoreYN == "O") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}		
	};

	// 실제로 #grid_wrap 에 그리드 생성

	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);


	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) { // 2023.10.13 
	    if (event.checked) {
	        var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "idx");
	        uniqueValues.splice(!uniqueValues.indexOf(""), 0);
	        AUIGrid.setCheckedRowsByValue(event.pid, "idx", uniqueValues);
	    } else {
	        AUIGrid.setCheckedRowsByValue(event.pid, "idx", []);
	    }
    });
    
};

// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {

	let allItemDelYN = 'N';  //전체아이템 삭제여부
	if (workingType == 'UPT') { //수정인 경우 주문순번에 값이 없으면 기존 디테일 전제 삭제후 등록
		var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		var rowId;
		let allNew = true;
		for (var i = 0, len = allItems.length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			estiSeq = AUIGrid.getCellValue(myGridID, i, "estiSeq");
			//console.log("estise:"+estiSeq);
			if (estiSeq !='' && estiSeq !== undefined){  //공백이 아닌 경우 
				allNew = false;
			}
		}
		
		if (allNew == true){
			
			if(!confirm("기존 등록된 품목이 전체 삭제됩니다. 수정하시겠습니까?")){
				return;
			}
			allItemDelYN = 'Y';
			
		}
	}

	document.getElementById('btnReg').classList.toggle('disabled');
	setStartSpinner();
	 
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
   
    var taxType = $("#taxType").val();
    var salePrice = $("#salePrice").val();
    var taxPrice = $("#taxPrice").val();
    var sumPriceKor = $("#sumPriceKor").val();    
    
	var branchCode = $("#branchCode").val();    
	if (branchCode == '' || branchCode == '' ) {
		if (!confirm("관리지점이 선택되지 않았습니다. 등록하시겠습니까?")){
			document.getElementById('btnReg').classList.toggle('disabled');
			setStopSpinner();	$("#branchCode").focus();		return;
		}	
	}

    //필수값 체크
    var custName = $("#custName").val();  
    if (custCode == '' || custName == '' ) {
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();	alert("주문처 거래처코드와 거래처명은 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	
	}
	
	fn_delBlankRowAll(myGridID, "itemId");  //itemId가 공백인것은 상태값 초기화하여 저장안되게 처리.

	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "unitPrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 입력해야 합니다.");
		
	//if (isValid1 == false || isValidChanged1 == false) {
	if (isValidChanged1 == false) {
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();
		return;
	}
	
	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);    
    
    
	if (!estiNo || estiNo.trim() == '') {
		if (addList.length === 0) {
			document.getElementById('btnReg').classList.toggle('disabled');
			setStopSpinner();
			alert("부품을 적어도 1개 이상 입력을 해야합니다");return;
		}
	}	
	
	var data = {};
	
	if(addList.length > 0) data.estiItemAdd = addList;
	else data.estiItemAdd = [];
	
	if(updateList.length > 0) data.estiItemUpdate = updateList;
	else data.estiItemUpdate = [];
	
	if(removeList.length > 0) data.estiItemRemove = removeList;
	else data.estiItemRemove = [];
	//console.log("add:"+addList);
	//return 
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
    
    salePrice = salePrice.replace(/,/gi, "");
    taxPrice = taxPrice.replace(/,/gi, "");
    
    data.taxType = taxType;
    data.salePrice = Number(salePrice);
    data.taxPrice = Number(taxPrice);
    data.sumPriceKor = sumPriceKor;    
    
    data.branchCode = branchCode;
    
    data.allItemDelYN = allItemDelYN;  
  
    //console.log("estiadd:"+JSON.stringify(data));
    //return;
   	if(dblRegClkChk()) return;  //Reg Double click Check 2023.11.10.
   	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    async: false,
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
			setStopSpinner();
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
			setStopSpinner();
			document.getElementById('btnReg').classList.toggle('disabled');
			//$("#btnReg").prop("disabled", false);
	        alert("code:"+request.status+"\n"+"error:"+error);
	        dblRegClkBln = false;
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



//견적품목 조회
function findEstiItem(url) {
	let srchDateType = $("#srchDateType").val();	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var list = [];
	var itemId = $("#itemId").val();
	if(itemId == '' ||itemId == null ){
		itemId=0;
	}
	var itemNo = $("#itemNo").val();
	let estiNo = $("#estiNo").val();
	var carNo = $("#carNo").val();
	var custCode = $("#custCode").val(); 
	var branchCode = $("#branchCode").val();
	var regUserName = $("#regUserName").val(); 
	var delUserName = $("#regUserName").val();
	
	var workingType = "DELETED_LIST";
    var ymdIgnoreYN  = "N";
	if ($('#ymdIgnoreYN ').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
    
   	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!itemNo || itemNo.trim() == '' ) && (!estiNo || estiNo.trim() == '') 
	       && (!carNo || carNo.trim() == '') && (!itemId || itemId.trim() == '' || itemId == 0) && (!branchCode || branchCode.trim() == '') 
	       && (!regUserName || regUserName.trim() == '') && (!custCode || custCode.trim() == '') && (!delUserName || delUserName.trim() == '') ) {		
	      alert("조회 조건을 하나 이상 입력해주세요.");
	      return false;
	   }
	}

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType,
			"srchDateType": srchDateType,
			"sYmd": sYmd,
			"eYmd": eYmd,
			"estiNo":estiNo,
			"itemId":itemId,
			"itemNo":itemNo,
			"ymdIgnoreYN": ymdIgnoreYN,
			"carNo": carNo
			,"custCode":custCode
			,"branchCode" : branchCode 
			,"regUserName" : regUserName
			,"delUserName" : delUserName			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.estiItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				data.estiItemList.sort((a,b)=>a.deleted-b.deleted);	//2024.06.18 sg	
				for(i=0;i<data.estiItemList.length;i++){
					
					list.push({
						 idx: data.estiItemList[i].idx
						,deleted: data.estiItemList[i].deleted 
						,delUserName: data.estiItemList[i].delUserName 
						,estiNo: data.estiItemList[i].estiNo 
						,estiSeq: data.estiItemList[i].estiSeq 
						,itemId: data.estiItemList[i].itemId 
						,itemNo: data.estiItemList[i].itemNo 
						,itemName: data.estiItemList[i].itemName
						,cnt: data.estiItemList[i].cnt 
						,salePrice: data.estiItemList[i].salePrice 
						,sumPrice: data.estiItemList[i].salePrice * data.estiItemList[i].cnt
						,supplyPrice: data.estiItemList[i].supplyPrice 						
						,supplySumPrice: data.estiItemList[i].supplySumPrice 
						,importPrice: data.estiItemList[i].importPrice 
						,memo: data.estiItemList[i].memo 
						,placeUnitPrice: data.estiItemList[i].placeUnitPrice
						,placeCustCode: data.estiItemList[i].placeCustCode
						,placeCustName: data.estiItemList[i].placeCustName
						,unitPrice:  data.estiItemList[i].unitPrice
						,orderNo:  data.estiItemList[i].orderNo
						,orderSeq:  data.estiItemList[i].orderSeq
						,dcExceptYN:  data.estiItemList[i].dcExceptYN
						,ceilUnit:  data.estiItemList[i].ceilUnit 
						,taxPrice:  data.estiItemList[i].taxPrice
						,makerName: data.estiItemList[i].makerName
						,rcvlogisCode: data.estiItemList[i].rcvlogisCode
						
						,restoreYN: data.estiItemList[i].restoreYN
						,estiYmd: data.estiItemList[i].estiYmd
						
						,className: data.estiItemList[i].className
						,factoryNo: data.estiItemList[i].factoryNo
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


function click_EstiType(estiType) {
	if (estiType == 1){
		$("#supplyCustCode").val("");
		$("#supplyCustName").val("");
		$("#supplyCustAdmName").val("");
		$("#supplyCustAdmPhone").val("");
		$("#supplyInfo-title").css("display","none");
		$("#supplyInfo-input").css("display","none");
	}else{
		$("#supplyInfo-title").css("display","block");
		$("#supplyInfo-input").css("display","block");
	}	
}



function restore() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	if (!confirm("처리하시겠습니까?")){
		return;
	}	

	var rowItem;
	//let estiArr = "";
	//let seqArr = "";
	let idxArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		//estiArr = estiArr + "^" +rowItem.item.estiNo;
		//seqArr = seqArr + "^" +rowItem.item.estiSeq;
		idxArr = idxArr + "^" +rowItem.item.idx;		
	}
	
	/*
	//post형식으로 페이지 데이터 조회
	let f = document.createElement('form');
    
	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'estiArr');
	obj.setAttribute('value', estiArr);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'seqArr');
	obj.setAttribute('value', seqArr);
	f.appendChild(obj);
	    
	f.setAttribute('method', 'post');
	f.setAttribute('action', '/order/estiItemRestore');
	document.body.appendChild(f);
	f.submit();	
	*/

    
	$.ajax({
	    url : '/order/estiItemRestore',
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"delItemIdxArr" : idxArr
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

