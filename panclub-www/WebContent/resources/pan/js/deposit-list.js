
var today = new Date();
let yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000)); // 2년전부 오늘까지
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
	}
});


// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}



$(document).ready(function() {
	
	createAUIGrid();
	AUIGrid.setFooter(myGridID, footerLayout);

	findDataToServer("/base/deposit-list", 1);
	 
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];  
        var depositNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var custCode = info[4];
        
        var accCode = info[5];
        var cardCom = info[6];
        var payCode = info[7];
        var carNo = info[8];
        var cashRectYN = info[9];
        var clGroupId = info[10];
        var orderGroupId = info[11];
        var ymdIgnoreYN = info[12];
     	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
        
        if ( typeof depositNo == 'undefined'){ depositNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        
         if ( typeof accCode == 'undefined'){ accCode = ''	}
         if ( typeof cardCom == 'undefined'){ cardCom = ''	}
         if ( typeof payCode == 'undefined'){ payCode = ''	}
         if ( typeof carNo == 'undefined'){ carNo = ''	}

         if ( typeof cashRectYN == 'undefined'){ cashRectYN = ''	}
         if ( typeof clGroupId == 'undefined'){ clGroupId = ''	}
         if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
         if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	
        //console.log("sYmd:"+sYmd);
        $("#depositNo").val(depositNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#custCode").val(custCode);
		
		$("#accCode").val(accCode);
		$("#cardCom").val(cardCom);
		$("#payCode").val(payCode);
		$("#carNo").val(carNo);

		$("#cashRectYN").val(cashRectYN);
		$("#clGroupId").val(clGroupId);
		$("#orderGroupId").val(orderGroupId);
	
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		
       findDataToServer("/base/deposit-list", page);
  	}
  	

	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	findSrchCode1("/base/code-list", 1) // 계정
	findSrchCode2("/base/cust-list") // 카드사
	findSrchCode3("/biz/payment", 1) //계좌
	findSrchCode4("/base/code-list", 1) // 입금구분
	//findDataToServer("/base/deposit-list", 1)

	//createAUIGrid(columnLayout);
	//createAUIGrid();
	//AUIGrid.setFooter(myGridID, footerLayout);

	$("#btndepFind").click(function() {
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var depositNo_val = $("#depositNo").val();
		var custCode_val = $("#custCode").val();
		
		var accCode_val = $("#accCode").val();
		var cardCom_val = $("#cardCom").val();
		var payCode_val = $("#payCode").val();
		var carNo_val = $("#carNo").val();
		
		var cashRectYN_val = $("#cashRectYN").val();
		var clGroupId_val = $("#clGroupId").val();
		var orderGroupId_val = $("#orderGroupId").val();
		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		
		document.location.hash = '#info'+currentPage+"!"+depositNo_val+"!"+sYmd+"!"+eYmd+"!"+custCode_val+"!"+accCode_val+"!"+cardCom_val+"!"
											+payCode_val+"!"+carNo_val+"!"+cashRectYN_val+"!"+clGroupId_val+"!"+orderGroupId_val+"!"+ymdIgnoreYN;
		findDataToServer("/base/deposit-list", 1);

	});
	$("#btndepReg").click(function() {
		depositReg();
		
	});
	$("#btndepSave").click(function() {
		updateDataToServer("/base/depositDel");
		
	});

});


window.onbeforeunload = function() {

};


// AUIGrid 를 생성합니다.
function createAUIGrid() {

	var columnLayout = [
		{ dataField: "depositNo", headerText: "입금번호",width:120
		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
		, { dataField: "depositDate", headerText: "입금일자" }
		, { dataField: "custCode", headerText: "거래처코드", visible: false }
		, { dataField: "custName", headerText: "거래처", width:120 }
		, { dataField: "makerName", headerText: "제조사"}
		, { dataField: "carNo", headerText: "차량번호" , width:120}
		, { dataField: "accCode", headerText: "계정코드", visible: false }
		, { dataField: "accName", headerText: "계정" }
		, { dataField: "payType", headerText: "입금구분코드", visible: false }
		, { dataField: "payTypeName", headerText: "입금구분" }
		, { dataField: "cashRectYN", headerText: "현금영수증" }
		, { dataField: "countY", headeDrText: "Y갯수", visible: false }
		, { dataField: "cashRectM", headeDrText: "현금영수증입금액", visible: false }
		, { dataField: "cashRectNo", headerText: "현금영수증 고유번호", editable: true , visible: false}
		, { dataField: "cardCom", headerText: "카드사코드", visible: false }
		, { dataField: "cardComName", headerText: "카드사" }
		, { dataField: "cdAllowNo", headerText: "카드승인번호" }
		, { dataField: "payCode", headerText: "계좌코드", visible: false }
		, { dataField: "payName", headerText: "계좌" ,width:180}
		, { dataField: "payAccNo", headerText: "계좌번호", visible: false }
		, { dataField: "supPrice", headerText: "공급가액", visible: false }
		, { dataField: "vat", headerText: "부가세", visible: false }
		, { dataField: "depositMoney", headerText: "입금액" , dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
		, { dataField: "memo", headerText: "비고" ,width:150}
		, { dataField: "cashM", headerText: "현금금액", visible: false }
		, { dataField: "cardM", headerText: "카드금액", visible: false }
		, { dataField: "accM", headerText: "예금금액", visible: false }
		, { dataField: "cardSubM", headerText: "카드대금금액", visible: false }
		, { dataField: "cardFee", headerText: "카드수수료", dataType: "numeric" ,formatString: "#,##0"  , style:"right" }
		, { dataField: "remitFee", headerText: "송금수수료", visible: false }
		, { dataField: "dcMoney", headerText: "할인액" , dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
		, { dataField: "clGroupId", headerText: "청구그룹ID" ,width:120
		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
		, { dataField: "orderGroupId", headerText: "주문그룹ID" ,width:120
		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
		, { dataField: "clGroupCustName", headerText: "청구그룹납품처"   ,width:80 }
		, { dataField: "srCode", headerText: "관리그룹"   ,width:80 }
		, { dataField: "connectCdPay", headerText: "카드대금연결" , visible: false}
		

		, { dataField: "regUserId", headerText: "등록자" }
		, { dataField: "created", headerText: "등록일"}
		, { dataField: "depositDead", headerText: "마감일", visible: false}
		, { dataField: "uptUserId", headerText: "수정자"}
		, { dataField: "modified", headerText: "수정일"}
	];


	var auiGridProps = {
		editable: false,

		usePaging: true,

		pageRowCount: 50,

		showPageRowSelect: true,

		showStateColumn: true,

		showFooter: true,

		enableFilter: true,

		footerRowCount: 5,

		// 기본 푸터 높이
		footerHeight: 24,

		selectionMode: "multipleCells",
		rowIdField: "depositNo",
		
			// 엑스트라 체크박스 표시 설정
			showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			showRowAllCheckBox: true,
			showAutoNoDataMessage : false,
			
	};




	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	

	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});

	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {

		var depositNo = event.item.depositNo;
		var depositDead = event.item.depositDead; 
		
		//console.log ("depositNo" +depositNo);
		//console.log ("event" +event.columnIndex);
		
		if (event.columnIndex == 1 || event.columnIndex == 0) {
			//var url = '/base/deposit-up?depositNo=' + depositNo + '&depositDead=' + depositDead;
			//console.log("URL: " + url);
			$.fancybox.open({
				//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
				href: '/base/deposit-up?depositNo=' + depositNo+ '&depositDead='+depositDead, // 불러 올 주소
				type: 'iframe',
				width: '80%',
				height: '90%',
				padding: 0,
				fitToView: false,
				autoSize: false
				, modal: true
				});
			
		}
		//open clgroup 2023.07.31
		//2023.10.12 clgroupid 더블클릭 수정 
		//if (event.columnIndex == 30 ) {
			if(event.dataField == "clGroupId"){
			//console.log("clgroupid"+event.item.clGroupId);
			var clGroupId = event.item.clGroupId
				if (clGroupId.includes(',')) {
					return;
   			 } else {
        		window.open('/order/cl-req-item-list?clGroupId=' + clGroupId, '_blank');
    		}			
	}
		//open orderGroup 2023.10.05		
		if (event.dataField == "orderGroupId") {
		//	console.log("clgroupid"+event.item.clGroupId);
			var orderGroupId = event.item.orderGroupId
				if (orderGroupId.includes(',')) {
					return;
   			 } else {
        		window.open('/order/order-group-item-list?orderGroupId=' + orderGroupId, '_blank');
    		}			
	}

		
	});

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}

var footerLayout = [];

footerLayout[0] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "현금합계"
}, {
	positionField: "depositMoney", dataField: "cashM",
	operation: "SUM", formatString: "#,##0", style:"right"

}];
footerLayout[1] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "카드합계"
}, {
	positionField: "depositMoney", dataField: "cardM",
	operation: "SUM", formatString: "#,##0", style:"right"

}];

/*footerLayout[2] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "예금합계"
}, {
	dataField: "accM",
	operation: "SUM"

}
	, {
	dataField: "cardSubM",
	operation: "SUM"

}
	, {
	positionField: "depositMoney",
	dataField: "accM",
	formatString: "#,##0", style:"right",
	labelFunction: function(value, columnValues, footerValues) {


		var newValue = footerValues[1] - footerValues[2];

		return newValue;
	}
}];*/
footerLayout[2] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "예금합계"
}, {
	positionField: "depositMoney", dataField: "accM",
	operation: "SUM", formatString: "#,##0", style:"right"

}];

footerLayout[3] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "현금영수증합계"
}, {
	positionField: "depositMoney", dataField: "cashRectM",
	operation: "SUM", formatString: "#,##0",style:"right"

},
{
	positionField: "cashRectYN", dataField: "countY",
	operation: "SUM", formatString: "#,##0", postfix: " 건"

}];
footerLayout[4] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "총계"
}, {
	positionField: "depositMoney", dataField: "depositMoney",
	operation: "SUM", formatString: "#,##0", style:"right"

}];
/*
footerLayout[4] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "총계"
}, {
	positionField: "cardFee", dataField: "cardFee",
	operation: "SUM", formatString: "#,##0", style:"right"

}, {
	positionField: "dcMoney", dataField: "dcMoney",
	operation: "SUM", formatString: "#,##0", style:"right"

}
	, {
	dataField: "depositMoney",
	operation: "SUM"

}
	, {
	dataField: "cardSubM",
	operation: "SUM"

}
	, {
	positionField: "depositMoney",
	dataField: "depositMoney",
	formatString: "#,##0", style:"right",
	labelFunction: function(value, columnValues, footerValues) {


		var newValue = footerValues[3] - footerValues[4]

		return newValue;
	}
}];*/
/*
footerLayout[4] = [{
	positionField: "depositNo",
	style: "my-footer-style",
	labelText: "총계"
},	 {
	positionField: "depositMoney",
	dataField: "depositMoney",
	operation: "SUM",  formatString: "#,##0", style:"right",
}];
*/
function findDataToServer(url, page) {
	//console.log("hi");
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	var list = [];
	var accCode = $("#accCode").val(); //검색조건 입력
	var custCode = $("#custCode").val();
	var cardCom = $("#cardCom").val();
	var payCode = $("#payCode").val();
	var payType = $("#payType").val();
	var claimReqNo = $("#claimReqNo").val();
	var carNo = $("#carNo").val();

	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y"; 
	}
	var cashRectYN = $("#cashRectYN").val();
	var clGroupId = $("#clGroupId").val();
	var depositNo = $("#depositNo").val();
	var orderGroupId = $("#orderGroupId").val();

	let memo = $("#memo").val(); //20240425 yoonsang 메모검색추가
	
//console.log ("djflsj");
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"accCode": accCode,
			"custCode": custCode,
			"cardCom": cardCom,
			"payCode": payCode,
			"payType": payType,
			"claimReqNo": claimReqNo,
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN,
			"workingType": "LIST",
			"carNo": carNo, 
			"cashRectYN": cashRectYN, 
			"clGroupId":clGroupId,
			"depositNo":depositNo,
			"orderGroupId": orderGroupId, //2023.10.05 
			"memo": memo //20240425 
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.depositList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				$("#iDiv_noDataPop").css("display","block");			
				AUIGrid.clearGridData(myGridID);
			} else {

				for (i = 0; i < data.depositList.length; i++) {
					
					list.push({
						depositNo: data.depositList[i].depositNo,
						depositDate: data.depositList[i].depositDate,
						custCode: data.depositList[i].custCode,
						custName: data.depositList[i].custName,
						carNo: data.depositList[i].carNo,
						accCode: data.depositList[i].accCode,
						accName: data.depositList[i].accName,
						payType: data.depositList[i].payType,
						payTypeName: data.depositList[i].payTypeName,
						cashRectYN: data.depositList[i].cashRectYN,

						countY: data.depositList[i].countY,
						cashRectM: data.depositList[i].cashRectM,

						cashRectNo: data.depositList[i].cashRectNo,
						cardCom: data.depositList[i].cardCom,
						cardComName: data.depositList[i].cardComName,
						payCode: data.depositList[i].payCode,
						payName: data.depositList[i].payName,
						payAccNo: data.depositList[i].payAccNo,
						cdAllowNo: data.depositList[i].cdAllowNo,
						supPrice: data.depositList[i].supPrice,
						vat: data.depositList[i].vat,
						depositMoney: data.depositList[i].depositMoney,

						cashM: data.depositList[i].cashM,
						cardM: data.depositList[i].cardM,
						accM: data.depositList[i].accM,
						cardSubM: data.depositList[i].cardSubM,

						cardFee: data.depositList[i].cardFee,
						remitFee: data.depositList[i].remitFee,
						dcMoney: data.depositList[i].dcMoney,
						claimReqNo: data.depositList[i].claimReqNo,
						connectCdPay: data.depositList[i].connectCdPay,
						memo: data.depositList[i].memo,
						regUserId: data.depositList[i].regUserId,
						created: data.depositList[i].created,
						uptUserId: data.depositList[i].uptUserId,
						modified: data.depositList[i].modified,
						depositDead : data.depositList[i].depositDead,
						clGroupId : data.depositList[i].clGroupId,
						cashRectYN : data.depositList[i].cashRectYN,
						clGroupCustName : data.depositList[i].clGroupCustName,
						orderGroupId : data.depositList[i].orderGroupId, //2023.10.05

						makerName : data.depositList[i].makerName, //2023.10.11
						srCode : data.depositList[i].srCode //2023.10.11
					});
					
					dpDead = data.depositList[0].depositDead; 
					$("#dpDead").val(dpDead); 

				}

				AUIGrid.setGridData("#grid_wrap", list);
				//console.log("list page:"+page);
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID, Number(page));
				}
			}
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


}




function findSrchCode1(url, type) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			mCode: "3000"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				//alert("자료가 없습니다.");
			} else {
				var j = 0;
				for (i = 0; i < data.codeList.length; i++) {
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;
					if (type == 1) {
						$("#accCode").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
					} if (type == 2) {
						list[j] = { "code": code, "value": codeName };
						j = j + 1;
					}


				}

			}
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

	return list;

}

function findSrchCode2(url) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			custType: "C5"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			var j = 0;
			if (data.custList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				for (i = 0; i < data.custList.length; i++) {
					custCode = data.custList[i].custCode;
					custName = data.custList[i].custName;
					$("#cardCom").append("<option value='" + custCode + "' >" + custName + "</option>");


				}

			}
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

	return list;

}


function findSrchCode3(url, type) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			payType: "계좌"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.paymentList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				var j = 0;
				for (i = 0; i < data.paymentList.length; i++) {
					code = data.paymentList[i].payCode;
					codeName = data.paymentList[i].name;
					//console.log(accNo);
					if (type == 1) {
						$("#payCode").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
					} 
				}
			}
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
	return list;

}


function findSrchCode4(url, type) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			mCode: "3010"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				var j = 0;
				for (i = 0; i < data.codeList.length; i++) {
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;
					if (type == 1) {
						$("#payType").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
					} if (type == 2) {
						list[j] = { "code": code, "value": codeName };
						j = j + 1;
					}

				}
			}
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

	return list;

}


function depositReg() {
		var depositDead = 	$("#dpDead").val();
		var regPopYN = 	'Y';
		//console.log ("depositDead"+dpDead);
	$.fancybox.open({
		//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
		href: '/base/deposit-up?depositDead=' + depositDead + '&regPopYN=' + regPopYN , // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false
		, modal: true
	});
}

function removeRow() {

	alert("행삭제 후 저장버튼을 누르셔야 삭제가 됩니다.");
	AUIGrid.removeRow(myGridID, "selectedIndex");
};

//삭제
function updateDataToServer(url) {

	var removeList = AUIGrid.getRemovedItems(myGridID);

	var data = {};

	if (removeList.length > 0) data.depositRemoveList = removeList;
	else data.depositRemoveList = [];
	
	 if (removeList.length > 0) {
	    var minDepositDate = removeList[0].depositDate;
	    var depositDead = removeList[0].depositDead;
	
	    for (var i = 1; i < removeList.length; i++) {
	        var currentItem = removeList[i];
	        if (currentItem.depositDate < minDepositDate) {
	            minDepositDate = currentItem.depositDate;
	            depositDead = currentItem.depositDead;
	        }
	        if(currentItem.connectCdPay != ''){	
				alert("카드대금이 입금된 입금은 삭제할 수 없습니다.");
        		return;
			}
	    }
  
      if (depositDead >= minDepositDate) {
        alert("입금일자는 이미 마감된 일자입니다.");
        return;
    }
  

  }
  // console.log("minDepositDate: " + minDepositDate);
    //console.log("depositDead: " + depositDead);
  // console.log(minDepositDate > depositDead);
//return;

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
			location.reload();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};



function myCustomFilter1() {

	// 사용자 필터링 설정
	AUIGrid.setFilter(myGridID, "accCode", function(dataField, value, item) {
		// 이름이 "Anna" 이고, 제품을 "Galaxy Note3" 구매자만 필터링하기
		if (item.accCode == "A" && item.payType == "CD" && (item.connectCdPay == null || item.connectCdPay == "")) {
			return true;
		}
		return false;
	});
};

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


// 현금영수증
function cashChk(url, workingType) {
	//exportTo('xlsx');
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	if (!confirm("처리하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var jobArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];		
			if(i==0){
				jobArr +=rowItem.item.depositNo;
			}else{jobArr = jobArr + "^" +rowItem.item.depositNo;}
	}
	
	//대상 체크
	var errCnt = 0;
	var errCnt1 = 0;
		//console.log("tem.cashRectYN"+item.cashRectYN)
		if ( rowItem.item.cashRectYN == 'Y' )  {  
			errCnt = errCnt + 1;
		}			
		if ( rowItem.item.payType == 'CD' || rowItem.item.accCode == 'N' )  {  
			errCnt1 = errCnt1 + 1;
		}	

	if (errCnt > 0) {
		alert("이미 현금영수증이 발행된 품목이 존재합니다!!")
		return;
	}
	if (errCnt1 > 0) {
		alert("카드대금은 현금영수증 발급이 불가합니다")
		return;
	}
	
//return;

	var data = {};
	data.workingType = workingType;
    //data.workingType = "CHK";
	
	//sub
	data.jobArr = jobArr;   //요천번호 
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data: JSON.stringify(data),
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