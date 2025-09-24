
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
$(document).ready(function() {
	
	findSrchCode3("/biz/payment", 1) //계좌 카드사
	findSrchCode4("/base/code-list", 1) // 입금구분


	createAUIGrid();
	AUIGrid.setFooter(myGridID, footerLayout);
	findDataToServer("/base/withdraw-list", 1);
		if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var wdReqNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var custCode = info[4];
        var ymdIgnoreYN = info[5];
        var payCode1 = info[6];
        var payCode2 = info[7];
        var payType = info[8];
        var memo = info[9];
        
   		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		      
        if ( typeof wdReqNo == 'undefined'){ wdReqNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof payCode1 == 'undefined'){ payCode1 = ''	}
	    if ( typeof payCode2 == 'undefined'){ payCode2 = ''	}
	    if ( typeof payType == 'undefined'){ payType = ''	}
	    if ( typeof memo == 'undefined'){ memo = ''	}
	    
        //console.log("sYmd:"+sYmd);
        $("#wdReqNo").val(wdReqNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#custCode").val(custCode);
		$("#payCode1").val(payCode1);
		$("#payCode2").val(payCode2);
		$("#payType").val(payType);
		$("#memo").val(memo);
		
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		
        findDataToServer("/base/withdraw-list", page);
  	}

	$("#btndepFind").click(function() {
		
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var wdReqNo_val = $("#wdReqNo").val();
		var custCode_val = $("#custCode").val();
		var payCode1_val = $("#payCode1").val();
		var payCode2_val = $("#payCode2").val();
		var payType_val = $("#payType").val();
		var memo_val = $("#memo").val();
 		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
						
		document.location.hash = '#info'+currentPage+"!"+wdReqNo_val+"!"+sYmd+"!"+eYmd+"!"+custCode_val
																	+"!"+ymdIgnoreYN+"!"+payCode1_val+"!"+payCode2_val+"!"+payType_val+"!"+memo_val;
		findDataToServer("/base/withdraw-list", 1);

	});
	$("#btndepReg").click(function() {
		withdrawReg();
	});
	$("#btndepSave").click(function() {
		updateDataToServer("/base/withdrawDel");
	});

});


window.onbeforeunload = function() {

};


// AUIGrid 를 생성합니다.
function createAUIGrid() {

	var columnLayout = [
		{ dataField: "wdNo", headerText: "출금번호"
		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
		, { dataField: "wdDate", headerText: "출금일자" }
		, { dataField: "custCode", headerText: "거래처코드", visible: false }
		, { dataField: "custName", headerText: "거래처",width:200}
		, { dataField: "accCode", headerText: "계정코드", visible: false }
		, { dataField: "accName", headerText: "계정"}
		, { dataField: "payType", headerText: "출금구분코드", visible: false }
		, { dataField: "payTypeName", headerText: "출금구분"}
		, { dataField: "payCode", headerText: "카드/계좌코드", visible: false }
		, { dataField: "payCodeName", headerText: "카드/계좌"}
		, { dataField: "payAccNo", headerText: "계좌번호"}
		, { dataField: "supPrice", headerText: "공급가액" , dataType: "numeric",formatString: "#,##0"  , style:"right" , visible: false}
		, { dataField: "vat", headerText: "부가세" , dataType: "numeric",formatString: "#,##0"  , style:"right" , visible: false}
		, { dataField: "wdMoney", headerText: "출금액" , dataType: "numeric",formatString: "#,##0"  , style:"right" }
		, { dataField: "fee", headerText: "송금수수료" , dataType: "numeric",formatString: "#,##0"  , style:"right" }
		, { dataField: "dcMoney", headerText: "할인액" , dataType: "numeric",formatString: "#,##0"  , style:"right" }

		, { dataField: "wdReqNo", headerText: "출금요청번호"
			, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
		, { dataField: "clReqNo", headerText: "청구그룹번호"
		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}  }
		, { dataField: "cashRectYN", headerText: "현금영수증" }
		, { dataField: "countY", headerText: "Y갯수", visible: false }
		, { dataField: "cashRectM", headerText: "현금영수증입금액", visible: false }
		, { dataField: "cashRectNo", headerText: "현금영수증 고유번호", editable: true , visible: false}
		, { dataField: "memo", headerText: "비고" }

		, { dataField: "cashM", headerText: "현금금액" , dataType: "numeric",formatString: "#,##0"  , style:"right" , visible: false}
		, { dataField: "cardM", headerText: "카드금액" , dataType: "numeric",formatString: "#,##0"  , style:"right" , visible: false}
		, { dataField: "accM", headerText: "예금금액" , dataType: "numeric",formatString: "#,##0"  , style:"right" , visible: false}
		, { dataField: "regUserId", headerText: "등록자" }
		, { dataField: "created", headerText: "등록일" }
		, { dataField: "uptUserId", headerText: "수정자" }
		, { dataField: "modified", headerText: "수정일" }
		, { dataField: "withdrawDead", headerText: "마감일", visible: false }
	];


	var auiGridProps = {
		editable: false,

		usePaging: true,

		pageRowCount: 50,

		showPageRowSelect: true,

		showStateColumn: true,

		showFooter: true,

		footerRowCount: 5,

		// 기본 푸터 높이
		footerHeight: 24,

		selectionMode: "multipleCells",
		rowIdField: "wdNo",
		showAutoNoDataMessage : false,  //No Data display
		
		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,
		
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
	//console.log("event"+event.columnIndex);
		var wdNo = event.item.wdNo;
		var wdReqNo = event.item.wdReqNo;
		
		if (event.columnIndex == 1 || event.columnIndex == 0) {
			$.fancybox.open({
				//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
				href: '/base/withdraw-up?wdNo=' + wdNo, // 불러 올 주소
				type: 'iframe',
				width: '80%',
				height: '90%',
				padding: 0,
				fitToView: false,
				autoSize: false
				, modal: true
			});
		}
		if (event.columnIndex == 16) {   
			$.fancybox.open({
			  href : '/biz/wd-req-dtl-list?wdReqNo='+wdReqNo  , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
		}
		//open clgroup 2023.09.12
		if (event.columnIndex == 17 ) {
		//	console.log("clgroupid"+event.item.clGroupId);
			var clGroupId = event.item.clReqNo
				if (clGroupId.includes(',')) {
					return;
   			 } else {
        		window.open('/order/cl-req-item-list?clGroupId=' + clGroupId, '_blank');
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
	positionField: "wdNo",
	style: "my-footer-style",
	labelText: "현금합계"
}, {
	positionField: "wdMoney", dataField: "cashM",
	operation: "SUM", formatString: "#,##0", style:"right"

}];
footerLayout[1] = [{
	positionField: "wdNo",
	style: "my-footer-style",
	labelText: "카드합계"
}, {
	positionField: "wdMoney", dataField: "cardM",
	operation: "SUM", formatString: "#,##0",style:"right"

}];
footerLayout[2] = [{
	positionField: "wdNo",
	style: "my-footer-style",
	labelText: "예금합계"
}, {
	positionField: "wdMoney", dataField: "accM",
	operation: "SUM", formatString: "#,##0",style:"right"

}];
footerLayout[3] = [{
	positionField: "wdNo",
	style: "my-footer-style",
	labelText: "현금영수증합계"
}, {
	positionField: "wdMoney", dataField: "cashRectM",
	operation: "SUM", formatString: "#,##0",style:"right"

},
{
	positionField: "cashRectYN", dataField: "countY",
	operation: "SUM", formatString: "#,##0", postfix: " 건"

}];
footerLayout[4] = [{
	positionField: "wdNo",
	style: "my-footer-style",
	labelText: "총계"
}, {
	positionField: "wdMoney", dataField: "wdMoney",
	operation: "SUM", formatString: "#,##0", style:"right"

}
	, {
	positionField: "fee", dataField: "fee",
	operation: "SUM", formatString: "#,##0",style:"right"

}
	, {
	positionField: "dcMoney", dataField: "dcMoney",
	operation: "SUM", formatString: "#,##0",style:"right"

}
];





function findDataToServer(url, page) {
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	var list = [];
	var custCode = $("#custCode").val();
	var payCode1 = $("#payCode1").val();
	var payCode2 = $("#payCode2").val();
	var payType = $("#payType").val();
	var wdReqNo = $("#wdReqNo").val();
	var memo = $("#memo").val();

	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}

	var cashRectYN = $("#cashRectYN").val(); //현금영수증 발행여부
	//console.log("cashRectYN"+cashRectYN);
	//return;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			custCode: custCode,
			payCode1: payCode1,
			payCode2: payCode2,
			payType: payType,
			wdReqNo: wdReqNo,
			sYmd: sYmd,
			eYmd: eYmd,
			ymdIgnoreYN: ymdIgnoreYN,
			cashRectYN: cashRectYN,
			memo: memo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.withdrawList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				$("#iDiv_noDataPop").css("display","block");			
			} else {

				for (i = 0; i < data.withdrawList.length; i++) {
					list.push({
						wdNo: data.withdrawList[i].wdNo,
						wdDate: data.withdrawList[i].wdDate,
						custCode: data.withdrawList[i].custCode,
						custName: data.withdrawList[i].custName,
						accCode: data.withdrawList[i].accCode,
						accName: data.withdrawList[i].accName,
						payType: data.withdrawList[i].payType,
						payTypeName: data.withdrawList[i].payTypeName,
						payCode: data.withdrawList[i].payCode,
						payCodeName: data.withdrawList[i].payCodeName,
						payAccNo: data.withdrawList[i].payAccNo,

						supPrice: data.withdrawList[i].supPrice,
						vat: data.withdrawList[i].vat,
						wdMoney: data.withdrawList[i].wdMoney,
						fee: data.withdrawList[i].fee,
						dcMoney: data.withdrawList[i].dcMoney,

						cashM: data.withdrawList[i].cashM,
						cardM: data.withdrawList[i].cardM,
						accM: data.withdrawList[i].accM,

						wdReqNo: data.withdrawList[i].wdReqNo,
						memo: data.withdrawList[i].memo,
						withdrawDead: data.withdrawList[i].withdrawDead ,
						clReqNo: data.withdrawList[i].clReqNo,

						countY: data.withdrawList[i].countY,
						cashRectYN: data.withdrawList[i].cashRectYN,
						cashRectM: data.withdrawList[i].cashRectM,
						cashRectNo: data.withdrawList[i].cashRectNo,

						regUserId: data.withdrawList[i].regUserId,
						created: data.withdrawList[i].created,
						uptUserId: data.withdrawList[i].uptUserId,
						modified: data.withdrawList[i].modified


					});


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



function findSrchCode3(url, type) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
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
					accNo = data.paymentList[i].accoutNo;
					//console.log(accNo);
					if (type == 1 && data.paymentList[i].payType == "계좌") {
						$("#payCode2").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
					}
					if (type == 1 && data.paymentList[i].payType == "카드사") {
						$("#payCode1").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
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


function withdrawReg() {

	$.fancybox.open({
		//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
		href: '/base/withdraw-up', // 불러 올 주소
		type: 'iframe',
		width: '80%',
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

    if (removeList.length > 0) {
        data.wdRemoveList = removeList;
    } else {
        data.wdRemoveList = [];
    }

   if (removeList.length > 0) {
    var minWdDate = removeList[0].wdDate;
    var withdrawDead = removeList[0].withdrawDead;

    for (var i = 1; i < removeList.length; i++) {
        var currentItem = removeList[i];
        if (currentItem.wdDate < minWdDate) {
            minWdDate = currentItem.wdDate;
            withdrawDead = currentItem.withdrawDead;
        }
    }


    if (withdrawDead >= minWdDate) {
        alert("출금일자는 이미 마감된 일자입니다.");
        return;
    }
}

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


// 현금영수증 2023.09.08
function cashChk(url, workingType) {

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
				jobArr +=rowItem.item.wdNo;
			}else{jobArr = jobArr + "^" +rowItem.item.wdNo;}
	}
	
	//대상 체크
	var errCnt = 0;
	var errCnt1 = 0;
		
		if ( rowItem.item.cashRectYN == 'Y' )  {  
			errCnt = errCnt + 1;
		}			
		if ( rowItem.item.payType == 'CD')  {  
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
	
	//	console.log("jobArr"+jobArr);
	//	return; 

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