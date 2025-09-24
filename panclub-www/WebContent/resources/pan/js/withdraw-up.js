/*
var datepicker1 = new tui.DatePicker('#wrapper1', {
	date: new Date(),
	language: 'ko',
	input: {
		element: '#datepicker-input1',
		format: 'yyyy-MM-dd'
	}
});*/

//출금일자 미래시점으로 안잡히게 설정 
var today  = new Date (); 
today.setHours(0,0,0,0);

var datepicker1 = new tui.DatePicker('#wrapper1', {
	date: today,
	language: 'ko',
	input: {
		element: '#datepicker-input1',
		format: 'yyyy-MM-dd'
	},
    selectableRanges: [
        [null, today]
    ]
});


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

var myGridID;
var myGridID1;
var myGridID2;

$(document).ready(function() {
	

	 var wdReqNoStr = getParameterByName("wdReqNo");
    if (wdReqNoStr != null && wdReqNoStr != "") {
        var wdReqNoArr = wdReqNoStr.split('&wdReqNo=');
       // console.log(wdReqNoArr);
        // wdReqNoArr 배열을 필요에 따라 처리
    }


	findSrchCode2("/biz/payment");


	$("#btnReg").click(function() {
		updateDataToServer("/base/withdrawAdd");
	});

	$("#btnClose").click(function() {
		parent.jQuery.fancybox.close();
		parent.location.reload();
	});


	$("#btnRegDialog1").click(function() {
		getCheckedRowItems();
		$("#dialog-form-wdReq").dialog("close");
	});
	$("#btnRegDialog2").click(function() {
		getCheckedRowItems2();
		$("#dialog-form-clReq").dialog("close");
	});
	$("#btnFnDialog2").click(function() {
		//findClReq("/order/cl-req-list",1);
		findClReq("/order/cl-group-list",1);  //청구그룹조회
	});
	$("#btnCloseDialog1").click(function() {
		$("#dialog-form-wdReq").dialog("close");
	});
	$("#btnCloseDialog2").click(function() {
		$("#dialog-form-clReq").dialog("close");
	});

	$("#radio1").click();
	$("#radio8").click();

	$("input[name='payType']").change(function() {
		formClear2();

	});


	let wdNo = $("#wdNo_upt").text();

	if (wdNo != '') {
		findWdInfo('/base/withdraw-list');
	}
/*
	$("#supPrice").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#vat").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#wdMoney").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#fee").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#dcMoney").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
*/
$("#wdMoney").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#custType").change(function() {
    	var selectedValue = $(this).val();
    	getData(selectedValue);
  	});

	$("#cashRectNo-input").css("display", "none");
});


// 데이터 서버로 보내기
function updateDataToServer(url) {


	var workingType;
	var accCode1 = $("input[name='accCode']:checked").val();
	var payType1 = $("input[name='payType']:checked").val();
	var accCode2;
	var payType2;

	if (accCode1 == "물품대") { accCode2 = "A" }
	if (accCode1 == "반환금") { accCode2 = "R" }


	if (payType1 == "현금") { payType2 = "CA" }
	if (payType1 == "카드") { payType2 = "CD" }
	if (payType1 == "예금") { payType2 = "DP" }

	var wdNo;

	if ($("#wdNo_upt").text() != '') {
		workingType = "UPT";
		wdNo = $("#wdNo_upt").text();
	} else {
		workingType = "ADD";
		wdNo = createWdNo();
	}
    
    var wdDate = document.getElementById("datepicker-input1").value;
	var custCode = $("#custCode").val();
	var accCode = accCode2;
	var payType = payType2;

	var payCode;
	if (payType2 == "CD") {
		payCode = $("#payCode1").val();
	}
	if (payType2 == "DP") {
		payCode = $("#payCode2").val();
	}
	
	//var wdMoney = cf_getNumberOnly($("#wdMoney").val());
	//var wdMoney = parseInt($("#wdMoney").val());
	var wdMoney = parseFloat($("#wdMoney").val().replace(/,/g, ""));
	var supPrice = Math.round(wdMoney / 1.1);
	var vat = Math.round(wdMoney / 1.1 / 10);

	/*if (supPrice =='' || supPrice == null){
		//supPrice = $("#wdMoney").val() / 1.1
		 supPrice = Math.round($("#wdMoney").val() / 1.1);
	}
	if (vat =='' || vat == null){
		//vat = $("#wdMoney").val() / 1.1/10
		vat = Math.round($("#wdMoney").val() / 1.1 / 10);
	}
	*/
	
	
	var fee = cf_getNumberOnly($("#fee").val());
	var dcMoney = cf_getNumberOnly($("#dcMoney").val());

	var wdReqNo = $("#wdReqNo").val();
	var memo = $("#memo").val();

	var cashM;
	var cardM;
	var accM;

	var clReqNo = $("#clReqNo").val();//반환금때문에 청구요청번호 추가
	//console.log("clReqNo : " + clReqNo)
	
	if (payType2 == "CA") {
		cashM = cf_getNumberOnly($("#wdMoney").val());
	}
	if (payType2 == "CD") {
		cardM = cf_getNumberOnly($("#wdMoney").val());
	}
	if (payType2 == "DP") {
		accM = cf_getNumberOnly($("#wdMoney").val());
	}
	
		
	var cashRectYN1 = $("input[name='cashRectYN']:checked").val(); //현금영수증 사용여부
	var cashRectYN2;
	if (cashRectYN1 == "미사용") { cashRectYN2 = "N" }
	if (cashRectYN1 == "사용") { cashRectYN2 = "Y" }
	var cashRectYN = cashRectYN2;
	var cashRectNo = $("#cashRectNo").val();
	
	var countY; //현금영수증 발행건수 
	var cashRectM; //현금영수증 발행금액 
	if (cashRectYN2 == "Y") {
		countY = 1;
		cashRectM = wdMoney
	}
	


	if (wdDate == '') { alert("출금일은 필수 입력해야 합니다."); $("#wdDate").focus(); return; }
	if (accCode == '') { alert("계정은 필수 입력해야 합니다."); $("#accCode").focus(); return; }
	if (payType == '') { alert("출금 구분은 필수 입력해야 합니다."); $("#payType").focus(); return; }
	if (custCode == '') { alert("거래처는 필수 입력해야 합니다."); $("#custCode").focus(); return; }
	if (wdMoney == '') { alert("출금액은 필수 입력해야 합니다."); $("#wdMoney").focus(); return; }
	

	var data = {};

	data.workingType = workingType;
	data.wdNo = wdNo;
	data.wdDate = wdDate;
	data.custCode = custCode;
	data.accCode = accCode;
	data.payType = payType;
	data.payCode = payCode;

	data.supPrice = supPrice;    
	data.vat = vat;
	data.wdMoney = wdMoney;
	data.fee = fee;
	data.dcMoney = dcMoney;

	data.wdReqNo = wdReqNo;
	data.memo = memo;

	data.cashM = cashM;
	data.cardM = cardM;
	data.accM = accM;

	data.clReqNo = clReqNo;

	data.countY = countY;
	data.cashRectYN = cashRectYN;
	data.cashRectM = cashRectM;
	data.cashRectNo = cashRectNo;
	
//	console.log ("data"+JSON.stringify(data));
//	return;


	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			result = data.result;
			if (result == 1) {
				alert("성공 : 처리되었습니다.");
				parent.jQuery.fancybox.close();
				parent.location.reload(true);	
			} else if (result >= -3 && result < 1){
				alert("실패 : DB등록 오류(code: "+result+")");
			}	else{
				 alert("실패 : 출금일자는 이미 마감된 일자입니다.");
			}
			//alert(data.result_code + ":" + data.result_msg);
			location.reload();
			parent.location.reload();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};



function click_payType(payType) {
	if (payType == 1) {//현금
		$("#fee-input").css("display", "block");

		$("#payCode1").prop("disabled", true);
		$("#payCode2").prop("disabled", true);
		$("#supPrice").prop("disabled", true);
		$("#vat").prop("disabled", true);
		
		$("#cashRectRadio").css("display", "block");
		
	} else if ((payType == 2)) {//카드
		$("#fee-input").css("display", "none");

		$("#payCode1").prop("disabled", false);
		$("#cdAllowNo").prop("disabled", false);
		$("#payCode2").prop("disabled", true);
		$("#supPrice").prop("disabled", false);
		$("#vat").prop("disabled", true);
		
		$("#cashRectRadio").css("display", "none");
	
	} else {//예금 
		$("#fee-input").css("display", "block");
		$("#payCode1").prop("disabled", true);
		$("#cdAllowNo").prop("disabled", true);
		$("#payCode2").prop("disabled", false);
		$("#supPrice").prop("disabled", true);
		$("#vat").prop("disabled", true);
		$("#cashRectRadio").css("display", "block");
	
	}
}

function click_accType(accType) {
	if (accType == 1) {//물품대
		$("#returnM").css("display", "none");
		$("#wdReqNo").prop("disabled", false);
	
	} else if ((accType == 2)) {//반환금 
		$("#returnM").css("display", "block");
		$("#wdReqNo").prop("disabled", true);
	
	}
}

function click_cashRectYN(cashRectYN) { //현금영수증 사용여부 
	if (cashRectYN == 1) {
		$("#cashRectNo-input").css("display", "none");
	} else {
		$("#cashRectNo-input").css("display", "block");
	}
}


function findSrchCode1(url, radioVal) {
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
			if (data.custList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {

				if (radioVal == "물품대") {

					for (i = 0; i < data.custList.length; i++) {
						custCode = data.custList[i].custCode;
						custName = data.custList[i].custName;
						//$("#insurCode").append("<option value='"+custName+"' >"+custName+"</option>");
						$("#custCode").append("<option value='" + custCode + "' >" + custName + "</option>");
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

}

function findSrchCode2(url) {
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
				for (i = 0; i < data.paymentList.length; i++) {

					if (data.paymentList[i].payType == '카드사') {
						code = data.paymentList[i].payCode;
						codeName = data.paymentList[i].name;
						$("#payCode1").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
					}
					if (data.paymentList[i].payType == '계좌') {
						code = data.paymentList[i].payCode;
						codeName = data.paymentList[i].name;
						accNo = data.paymentList[i].accoutNo;
						$("#payCode2").append("<option value='" + code + "' >" + code + " : " + codeName + " - " + accNo + "</option>");
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

}



function formClear2() {

	$('#payCode1').val('Default Value');
	$('#payCode2').val('Default Value');
	$('#supPrice').val('');
	$('#vat').val('');
	$('#depositMoney').val('');
	$('#dcMoney').val('');
	$('#memo').val('');
	$('#fee').val('');

}


function createWdNo() {
	var lastWdNo = findLastWdNo();
	let datePart = lastWdNo.substring(0, 8);
	let count = lastWdNo.substring(8);
	let now = new Date();
	let currentDate = now.toISOString().slice(0, 10);
	let currentDate2 = currentDate.split("-").join("")


	if (datePart != currentDate2) {
		datePart = currentDate2;
		count = 1;
	} else {
		count++
	}

	let threeDigit = String(count).padStart(3, '0');
	let newWdNo = datePart + threeDigit;

	return newWdNo;
}

function findLastWdNo() {
	var No;
	var url = "/base/withdraw-list";
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"orderBy" : "finWdNo"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.withdrawList.length == 0) {
				No = "11112233001"
			} else {
				No = data.withdrawList[data.withdrawList.length - 1].wdNo;
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

	return No;

}

function vatCal(type) {

	let vat1;
	let valueInt1;
	let valueInt2;

	if ($("input[name='payType']:checked").val() == "카드") {
		if ($("#supPrice").val() != "") { var value1 = cf_getNumberOnly($("#supPrice").val()) }

		var value2 = cf_getNumberOnly($("#wdMoney").val())
		valueInt1 = parseInt(value1);
		valueInt2 = parseInt(value2);



		if (type == 1) {
			vat1 = parseInt(value1 * 0.1);
			$('#vat').val(comma(vat1));
			$('#wdMoney').val(comma(valueInt1 + vat1));
		} if (type == 2) {
			vat1 = parseInt(parseInt(value2 * 10) / 110);
			$('#vat').val(comma(vat1));
			$('#supPrice').val(comma(valueInt2 - vat1));
		}
	}


}

function getCheckedRowItems() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID1);

	if (checkedItems.length <= 0) {
		alert("출금요청을 선택해주세요");
		return;
	}

	var rowItem = checkedItems[0].item;
	$("#wdReqNo").val(rowItem.wdReqNo);
	$("#wdMoney").val(comma(rowItem.wdReqAmt));

	if ($("input[name='payType']:checked").val() == "카드") {
		var value = rowItem.wdReqAmt;
		$("#wdMoney").val(comma(value));
		$("#vat").val(comma(parseInt(parseInt(value * 10) / 110)));
		$("#supPrice").val(comma(value - parseInt(parseInt(value * 10) / 110)));
	} else {
		$("#wdMoney").val(comma(rowItem.wdReqAmt));
	}

}

function getCheckedRowItems2() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID2);

	if (checkedItems.length <= 0) {
		alert("청구요청을 선택해주세요");
		return;
	}

	var rowItem = checkedItems[0].item;
	//$("#clReqNo").val(rowItem.clReqNo);
	$("#clReqNo").val(rowItem.clGroupId);
	$("#insure1Code_save").val(rowItem.insure1Code);
	$("#insure1Name_save").val(rowItem.insure1Name);
	$("#insure2Code_save").val(rowItem.insure2Code);
	$("#insure2Name_save").val(rowItem.insure2Name);


}


function findWdInfo(url) {
	var wdNo = $("#wdNo_upt").text();
	//console.log("wdNo : " +wdNo)
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST",
			"wdNo": wdNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			//console.log("data.withdrawList.length : " + data.withdrawList.length)

			if (data.withdrawList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
			} else {
				//console.log("data.withdrawList[0].payType : " +data.withdrawList[0].payType)
				if (data.withdrawList[0].payType == "CA") {
					$("#radio6").click();
					click_payType(1);
				}
				if (data.withdrawList[0].payType == "CD") {
					$("#radio7").click();
					click_payType(2);
				}
				if (data.withdrawList[0].payType == "DP") {
					$("#radio8").click();
					click_payType(3);
				}
					if (data.withdrawList[0].accCode == "R") {
					$("#radio2").click();
					click_accType(2);
				}
				if (data.withdrawList[0].accCode == "A") {
					$("#radio1").click();
					click_accType(1);
				}
				
			if (data.withdrawList[0].cashRectYN == "N") {
					$("#radio9").click();
					click_cashRectYN(1);
					$("#cashRectNo-input").css("display", "none");
				}
				if (data.withdrawList[0].cashRectYN == "Y") {     
					$("#radio10").click();
					click_cashRectYN(2);
					$("#cashRectNo-input").css("display", "block");
				}
				
				
				var feeIn;
				var supPriceIn;
				var vatIn;
				var wdMoneyIn;
				var dcMoneyIn;
				
				//console.log("data.withdrawList[0].fee : "+data.withdrawList[0].fee )

				if (data.withdrawList[0].fee == null) { feeIn = '';
				//console.log("null in") 
				}
				else { feeIn = comma(data.withdrawList[0].fee) }

				if (data.withdrawList[0].supPrice == null) { supPriceIn = '' }
				else { supPriceIn = comma(data.withdrawList[0].supPrice) }

				if (data.withdrawList[0].vat == null) { vatIn = '' }
				else { vatIn = comma(data.withdrawList[0].vat) }

				if (data.withdrawList[0].wdMoney == null) { wdMoneyIn = '' }
				else { wdMoneyIn = comma(data.withdrawList[0].wdMoney) }

				if (data.withdrawList[0].dcMoney == null) { dcMoneyIn = '' }
				else { dcMoneyIn = comma(data.withdrawList[0].dcMoney) }
				
		


				$('#datepicker-input1').val(data.withdrawList[0].wdDate);
				$('#custCode').val(data.withdrawList[0].custCode);
				$('#custName').val(data.withdrawList[0].custName);
				$('#wdReqNo').val(data.withdrawList[0].wdReqNo);
				$('#payCode1').val(data.withdrawList[0].payCode);
				$('#payCode2').val(data.withdrawList[0].payCode);
				$('#fee').val(feeIn);
				$('#supPrice').val(supPriceIn);
				$('#vat').val(vatIn);
				$('#wdMoney').val(wdMoneyIn);
				$('#dcMoney').val(dcMoneyIn);
				$('#memo').val(data.withdrawList[0].memo);
				$('#memo').val(data.withdrawList[0].memo);
				$('#cashRectNo').val(data.withdrawList[0].cashRectNo);
				$('#clReqNo').val(data.withdrawList[0].clReqNo);

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



function openWdReqDialog() {

	if ($("#custCode").val() == "") {
		alert("거래처부터 선택해주세요");
	} else {

		var wdReqDialog;
		wdReqDialog = $("#dialog-form-wdReq").dialog({
			//autoOpen: false,
			height: 700,
			//minWidth: 500,
			width: "80%",
			modal: true,
			headerHeight: 40,
			position: { my: "center", at: "center", of: window },
			buttons: {

			},
			close: function() {

			}
		});


		wdReqDialog.dialog("open");


		createWdReqGrid();

		findDataToServer_wdReq("/biz/wd-req-list", 1)
	}

}



function createWdReqGrid() {

	var columnLayout = [

		{ dataField: "wdReqNo", headerText: "출금요청번호" },
		{ dataField: "custCode", headerText: "거래처코드", },
		{ dataField: "custName", headerText: "거래처", },
		{ dataField: "wdReqType", headerText: "출고요청타입" },
		{ dataField: "wdReqYmd", headerText: "출금요청일" },
		{ dataField: "wdReqAmt", headerText: "출금요청금액", dataType: "numeric", formatString: "#,##0", style: "right" },
		{ dataField: "memo1", headerText: "메모" },
		{ dataField: "regUserId", headerText: "작성자" },
		{ dataField: "uptUserId", headerText: "수정자" },

	];

	var auiGridProps = {

		usePaging: true,
		pageRowCount: 20,
		showPageRowSelect: true,

		//showStateColumn: true,
		selectionMode: "multipleCells",
	};

	// 체크박스 칼럼 렌더러 표시 설정
	auiGridProps.showRowCheckColumn = true;

	auiGridProps.showStateColumn = true;

	// 체크박스 대신 라디오버튼 출력함
	auiGridProps.rowCheckToRadio = true;

	myGridID1 = AUIGrid.create("#grid_wrap1", columnLayout, auiGridProps);


	AUIGrid.bind(myGridID1, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID1, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

}


function createClReqGrid() {

	var columnLayout = [

		{  headerText : "기본정보", 
		children: [
			{ dataField: "regYmd",        headerText: "생성일"              },
			{ dataField: "clType",        headerText: "청구구분"},
        	{ dataField: "clGroupId",      headerText: "청구그룹ID",     width: 100 
        		 , styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
        	//{ dataField: "clReqNo",      headerText: "요청번호",     width: 100 
        	//	 , styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
        	{ dataField: "orderGroupId",      headerText: "주문그룹ID",    width: 100  },
        	{ dataField: "custName",      headerText: "주문처",    width: 140 , style : "left" },
        	{ dataField: "carNo",         headerText: "차번",      width: 80       },
        	{ dataField: "carType",         headerText: "차종",      width: 80       },
        	{ dataField: "regUserName",         headerText: "담당자명",      width: 80, visible: false       },
        ]
    },
    {  headerText : "보험사1", 
		children: [
			{ dataField: "insure1Code",        headerText: "코드",visible: false              },    
			{ dataField: "insure1Name",        headerText: "보험사"              },    
        	{ dataField: "insure1AcceptNo",         headerText: "접수번호",      width: 120   ,visible: false    },
        	{ dataField: "insure1AcciRate",      headerText: "과실" , style : "right" },
        	{ dataField: "insure1CollAmt",      headerText: "수금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"   },
        ]
    },
    {  headerText : "보험사2", 
		children: [
			{ dataField: "insure2Code",        headerText: "코드",visible: false              },
			{ dataField: "insure2Name",        headerText: "보험사"              },
        	{ dataField: "insure2AcceptNo",         headerText: "접수번호",      width: 120 ,visible: false      },
        	{ dataField: "insure2AcciRate",      headerText: "과실" , style : "right"},
        	{ dataField: "insure2CollAmt",      headerText: "수금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"   },
        ]
    }

	];

	var auiGridProps = {

		usePaging: true,
		pageRowCount: 20,
		showPageRowSelect: true,

		//showStateColumn: true,
		selectionMode: "multipleCells",
	};

	// 체크박스 칼럼 렌더러 표시 설정
	auiGridProps.showRowCheckColumn = true;

	auiGridProps.showStateColumn = true;

	// 체크박스 대신 라디오버튼 출력함
	auiGridProps.rowCheckToRadio = true;

	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, auiGridProps);


	AUIGrid.bind(myGridID2, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID2, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

}

function findDataToServer_wdReq(url, page) {
	var list = [];


	var cdCode = $("#custCode").val();
	var payStatus = "미출금";
	//console.log ("cdCode"+cdCode);
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"cdCode": cdCode,
			"payStatus": payStatus
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.reqList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				$("#dialog-form-wdReq").dialog("close");
			} else {

				for (i = 0; i < data.reqList.length; i++) {

					list.push({
						wdReqNo: data.reqList[i].wdReqNo,
						custCode: data.reqList[i].custCode,
						custName: data.reqList[i].custName,
						wdReqType: data.reqList[i].wdReqType,
						wdReqYmd: data.reqList[i].wdReqYmd,
						wdReqAmt: data.reqList[i].wdReqAmt,
						memo1: data.reqList[i].memo1,
						regUserId: data.reqList[i].regUserId,
						uptUserId: data.reqList[i].uptUserId,
					});


				}

				AUIGrid.setGridData("#grid_wrap1", list);
				//console.log("list page:"+page);
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID1, Number(page));
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


function inputNumberFormat(obj) {
	obj.value = comma(obj.value);
}


function inputNumberFormat(obj) {
	obj.value = comma(uncomma(obj.value));
}


//콤마찍기
function comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
	str = String(str);
	//return str.replace(/[^\d]+/g, '');
	return str.replace(/[^\d-]+/g, '');
}

//저장할때 숫자만 리턴
function cf_getNumberOnly(str) {
	var len = str.length;
	var sReturn = "";
	
	 let isNegative = str.startsWith('-');


	for (var i = 0; i < len; i++) {
		if ((str.charAt(i) >= "0") && (str.charAt(i) <= "9")) {
			sReturn += str.charAt(i);
		}
	}
	
	if (isNegative) {
        sReturn = '-' + sReturn;
    }
	
	return sReturn;
}



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function openClReqDialog() {

	var clReqDialog;
	clReqDialog = $("#dialog-form-clReq").dialog({
		//autoOpen: false,
		height: 700,
		//minWidth: 500,
		width: "90%",
		modal: true,
		headerHeight: 40,
		position: { my: "center", at: "center", of: window },
		buttons: {

		},
		close: function() {

		}
	});


	clReqDialog.dialog("open");


	createClReqGrid();

	//findDataToServer_wdReq("/biz/wd-req-list", 1)
	

}
/*
function findClReq(url,page){
	var list = [];
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	
	
	var clReqNo = $("#clReqNo2").val(); 
	var carNo = $("#carNo").val(); 
	var custCode = $("#custCode2").val(); 
	var insure1Code = $("#insure1Code").val(); 
	var insure1ＭgrName = $("#insure1ＭgrName").val();
	var orderGroupId = $("#orderGroupId").val();
	//var clGroupId = $("#clGroupId").val();
	var regUserName = $("#regUserName").val();  
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"clReqNo":clReqNo,
			"carNo":carNo,
			"custCode":custCode,
			"insure1Code":insure1Code,
			"insure1ＭgrName":insure1ＭgrName,
			"orderGroupId":orderGroupId,
			//"clGroupId":clGroupId,
			"regUserName":regUserName
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID2);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.reqList.length;i++){
					list.push({
						 regYmd: data.reqList[i].regYmd 
						,carNo: data.reqList[i].carNo 
						,clReqNo: data.reqList[i].clReqNo 
						,orderGroupId: data.reqList[i].orderGroupId
						,custName: data.reqList[i].custName
						,clType: data.reqList[i].clType 
						,procStep: data.reqList[i].procStep 
						,billPubli: data.reqList[i].billPubli
						,insure1Code: data.reqList[i].insure1Code 
						,insure1Name: data.reqList[i].insure1Name 
						,insure1AcceptNo: data.reqList[i].insure1AcceptNo 
						,insure1AcciRate: data.reqList[i].insure1AcciRate
						,insure2Code: data.reqList[i].insure2Code 
						,insure2Name: data.reqList[i].insure2Name 
						,insure2AcceptNo: data.reqList[i].insure2AcceptNo 
						,insure2AcciRate: data.reqList[i].insure2AcciRate
						,insure1CollAmt: data.reqList[i].insure1CollAmt
						,insure2CollAmt: data.reqList[i].insure2CollAmt
						,capitalAmt: data.reqList[i].capitalAmt 
						,primeAmt: data.reqList[i].primeAmt	
						,saleAmt: data.reqList[i].saleAmt
						,clAmt: data.reqList[i].clAmt
						,collectAmt: data.reqList[i].collectAmt						
						,chkYN: data.reqList[i].chkYN
						,confYN: data.reqList[i].confYN						
						,clGroupId: data.reqList[i].clGroupId
						,clReqType: data.reqList[i].clReqType
						,carType : data.reqList[i].carType 
						,regUserName : data.reqList[i].regUserName
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap2", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID, Number(page));
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
*/

function getData(selectedValue){
	if(selectedValue == "보험1" && $("#insure1Code_save").val() != ""){
		//console.log("Code : " + $("#insure1Code_save").val());
		//console.log("Name : " + $("#insure1Name_save").val());
		
		$('#custCode').val($("#insure1Code_save").val());
		$('#custName').val($("#insure1Name_save").val());
	}
	else if(selectedValue == "보험2" && $("#insure2Code_save").val() != ""){
		//console.log("Code2 : " + $("#insure2Code_save").val());
		//console.log("Name2 : " + $("#insure2Name_save").val());
		
		$('#custCode').val($("#insure2Code_save").val());
		$('#custName').val($("#insure2Name_save").val());
	}
	else {
		$('#custCode').val("");
		$('#custName').val("");
	}		
	
}
//청구요청 조회 -> 청구그룹 조회
function findClReq(url,page){ 
	var list = [];
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
		
	var carNo = $("#carNo").val(); 
	var custCode = $("#custCode2").val(); 
	var insure1Code = $("#insure1Code").val(); 
	var insure1ＭgrName = $("#insure1ＭgrName").val();
	var orderGroupId = $("#orderGroupId").val();
	var clGroupId = $("#clGroupId").val();
	var regUserName = $("#regUserName").val();  
	var clDateType = "생성일";
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"carNo":carNo,
			"custCode":custCode,
			"insure1Code":insure1Code,
			"insure1ＭgrName":insure1ＭgrName,
			"orderGroupId":orderGroupId,
			"clGroupId":clGroupId,
			"regUserName":regUserName,
			"clDateType": clDateType
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.clGroupList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID2);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				for(i=0;i<data.clGroupList.length;i++){
					var clTypeChk = data.clGroupList[i];
						var insure2ClAmt  = data.clGroupList[i].insure2ClAmt;
					var insure1ClAmt  = data.clGroupList[i].insure1ClAmt;
					var clAmt  = data.clGroupList[i].clAmt;
					
					var insure2CollAmt = data.clGroupList[i].insure2CollAmt;
					var insure1CollAmt = data.clGroupList[i].insure1CollAmt;
					var collectAmt = data.clGroupList[i].collectAmt;
					
					var insure2Rate;
					var insure1Rate;
					var collectRate;			
					if(insure2ClAmt ==0 ){
							insure2Rate = 0;
					}else if (insure2CollAmt ==0){
							insure2Rate = 0;
					}else{
						 insure2Rate = (insure2CollAmt / insure2ClAmt*100).toFixed(2);
					}			
					if(insure1ClAmt ==0 ){
							insure1Rate = 0;
					}else if (insure1CollAmt ==0){
							insure1Rate = 0;
					}else{
						 insure1Rate = (insure1CollAmt / insure1ClAmt*100).toFixed(2);
					}
					
						if(clAmt ==0 ){
							collectRate = 0;
					}else if (collectAmt ==0){
							collectRate = 0;
					}else{
						 collectRate = (collectAmt / clAmt*100).toFixed(2);
					}
				
					list.push({
						 regYmd: data.clGroupList[i].regYmd 
						,carNo: data.clGroupList[i].carNo 
						,clGroupId: data.clGroupList[i].clGroupId 
						,orderGroupId: data.clGroupList[i].orderGroupId
						,clReqYmd : data.clGroupList[i].clReqYmd
						,custName: data.clGroupList[i].custName
						,clType: data.clGroupList[i].clType 
						,procStep: data.clGroupList[i].procStep 
						,billPubli: data.clGroupList[i].billPubli
						,insure1Name: data.clGroupList[i].insure1Name 
						,insure1Code: data.clGroupList[i].insure1Code 
						,insure1AcceptNo: data.clGroupList[i].insure1AcceptNo 
						,insure1AcciRate: Math.round(data.clGroupList[i].insure1AcciRate)  +"%"
						,insure1MgrName : data.clGroupList[i].insure1MgrName
						,insure1ClAmt : data.clGroupList[i].insure1ClAmt												
						,insure2Name: data.clGroupList[i].insure2Name 
						,insure2Code: data.clGroupList[i].insure2Code 
						,insure2AcceptNo: data.clGroupList[i].insure2AcceptNo  
						,insure2AcciRate: Math.round(data.clGroupList[i].insure2AcciRate)+"%"
						,insure2MgrName : data.clGroupList[i].insure2MgrName
						,insure2ClAmt : data.clGroupList[i].insure2ClAmt						
						,insure1CollAmt: data.clGroupList[i].insure1CollAmt 
						,insure2CollAmt: data.clGroupList[i].insure2CollAmt
						,capitalAmt: data.clGroupList[i].capitalAmt 
						,primeAmt: data.clGroupList[i].primeAmt						
						,saleAmt: data.clGroupList[i].saleAmt +data.clGroupList[i].taxAmt
						,clAmt: data.clGroupList[i].clAmt
						,collectAmt: data.clGroupList[i].collectAmt
						,riAmt: data.clGroupList[i].riAmt
						,extraAmt: data.clGroupList[i].extraAmt				
						,makerCode:data.clGroupList[i].makerCode+ " "+data.clGroupList[i].carType		
						,confYN: data.clGroupList[i].confYN 					
						,custCode2: data.clGroupList[i].custCode 
						,branchCode: data.clGroupList[i].branchCode 					
						,insure2Rate: insure2Rate + '%'
						,insure1Rate: insure1Rate + '%'
						,collectRate: collectRate + '%'
						,branchCode: data.clGroupList[i].branchCode 							
						,uptYmd : data.clGroupList[i].uptYmd
						,chkDate : data.clGroupList[i].chkDate2			
						,expType : data.clGroupList[i].expType			
						,clRlYmd : data.clGroupList[i].clRlYmd		//230802	
						,clReqType : data.clGroupList[i].clReqType		//230808						
						,insure1ＭgrName : data.clGroupList[i].insure1ＭgrName		//230822	
						,insure2ＭgrName : data.clGroupList[i].insure2ＭgrName		//230822	
					});
				}							
				 AUIGrid.setGridData("#grid_wrap2", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID, Number(page));
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




