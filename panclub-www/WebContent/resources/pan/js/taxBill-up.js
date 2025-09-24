
var datepicker1 = new tui.DatePicker('#wrapper1', {
	date: new Date(),
	 language: 'ko',
	input: {
		element: '#datepicker-input1',
		format: 'yyyy-MM-dd'
	}
});
/*
var today = new Date();
var firstDay = new Date(today); //2023.08.31 bk
firstDay.setDate(1); //2023.08.31 bk
var datepicker1 = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        //date: today,
        date: firstDay, //2023.08.24 bk
    	input: '#startpicker-input',
        container: '#startpicker-container'
    },
    endpicker: {
        date: today,
        input: '#endpicker-input',
        container: '#endpicker-container'
    }
});
*/
$(document).ready(function() {
	
	//사업자등록번호 사업주명 회사명 주 연락처 필수값


	$("#btnReg").click(function() {
		updateDataToServer("/base/taxBillAdd");
	});

	$("#btnClose").click(function() {
		parent.jQuery.fancybox.close();
	});


	$("input[name='bizType']").change(function() {
		var type;
		if ($("input[name='bizType']:checked").val() == "사업자") { type = 1 }
		if ($("input[name='bizType']:checked").val() == "개인") { type = 2 }
		click_bizType(type);


	});

	$("input[name='taxTypeName']").change(function() {
		formClear2();

	});


	$("#radio1").click();
	$("#radio3").click();
		



	$("#btnRegDialog1").click(function() {
		findCustInfo("/base/cust-list", 2);
		$("#dialog-form-fCust").dialog("close");
	});
	$("#btnCloseDialog1").click(function() {
		$("#dialog-form-fCust").dialog("close");		
	});
	
	
	$("#supPrice").val($("#supPriceSave").val());
	$("#vat").val($("#supPriceSave").val()*0.1);
	$("#totalPrice").val(parseInt($("#supPriceSave").val()*1.1));

	
	let taxBillNo = $("#taxBillNo_upt").text();

	if (taxBillNo != '') {

		findTaxInfo('/base/taxBill-list', taxBillNo);
	}
	
	$("#expType").val($("#expTypeVal").val());
	
	
	if($("#clType").val()=="일반" || $("#clType").val()=="일반(전환)"){
		$("#custType").val($("#clType").val());
		getData($("#clType").val());

		
	}else if($("#summary").val()!=""){
		$("#custType").val("일반");
		getData("일반");			
	}
	
	$("#custType").change(function() {
    	var selectedValue = $(this).val();
    	getData(selectedValue);
    	
  });
	
	
	
});


// 데이터 서버로 보내기

function updateDataToServer(url) {

	var workingType;


	var bizType1 = $("input[name='bizType']:checked").val();
	var taxTypeName1 = $("input[name='taxTypeName']:checked").val();
	var clType1 = $("input[name='clType']:checked").val();


	var taxBillNo;

	var taxBillDate = document.getElementById("datepicker-input1").value;
	var bizType = bizType1;
	var custName = $("#custName").val();
	var custCode = $("#custCode").val();
	var ceoName = $("#ceoName").val();
	var bizNo;
	var address = $("#address").val();
	var phone = $("#phone").val();
	var fax = $("#fax").val();
	var taxEmail = $("#taxEmail").val();

	var itemName = $("#itemName").val();
	var supPrice = $("#supPrice").val();
	var vat = $("#vat").val();
	var totalPrice = $("#totalPrice").val();

	var clType = clType1;
	var memo = $("#memo").val();
	var taxTypeCode;
	var taxTypeName = taxTypeName1;

	var clGroupId = $("#clGroupId").val(); //230706

	var expType = $("#expType").val();
	
	var clgArr = $("#clgArr").val();   //20231115 yoonsang
	
	let summary = $("#summary").val();   //20240201 yoonsang
	let seq = $("#seq").val();   //20240201 yoonsang
	
	if (bizType1 == "사업자") {
		custName = $("#custName").val();
		bizNo = $("#bizNo1").val();
	}
	if (bizType1 == "개인") {
		custName = $("#pName").val();
		bizNo = $("#bizNo2").val();
		ceoName = $("#pName").val();
	}
	if (taxTypeName1 == "과세") {
		taxTypeCode = "A"
	}
	if (taxTypeName1 == "영세" || taxTypeName1 == "면세") {
		taxTypeCode = "B"
	}

	if ($("#taxBillNo_upt").text() != '') {
		workingType = "UPT";
		taxBillNo = $("#taxBillNo_upt").text();
	} else {
		workingType = "ADD";
		taxBillNo = createNo();
	}


	//사업자등록번호 사업주명 회사명 주 연락처 필수값
	if (bizNo == '') { alert("사업자번호나 주민등록번호는 필수 입력해야 합니다."); return; }
	if (ceoName == '') { alert("대표자명은 필수 입력해야 합니다."); return; }
	if (taxEmail == '') { alert("메일주소는 필수 입력해야 합니다."); $("#taxEmail").focus(); return; }
	if (totalPrice == '') { alert("합계금액은 필수 입력해야 합니다."); $("#totalPrice").focus(); return; }


	var data = {};

	data.workingType = workingType;
	data.taxBillNo = taxBillNo;
	data.taxBillDate = taxBillDate;
	data.bizType = bizType;
	data.custCode = custCode;
	data.custName = custName;
	data.ceoName = ceoName;
	data.bizNo = bizNo;
	data.address = address;
	data.phone = phone;
	data.fax = fax;
	data.taxEmail = taxEmail;

	data.itemName = itemName;
	data.supPrice = supPrice.replace(/,/g, '');
	data.vat = vat.replace(/,/g, '');
	data.totalPrice = totalPrice.replace(/,/g, '');
	data.clType = clType;
	data.memo = memo;
	data.taxTypeCode = taxTypeCode;
	data.taxTypeName = taxTypeName;

	data.clGroupId = clGroupId;

	data.expType = expType;
	data.clgArr = clgArr;
	data.summary = summary;
	data.seq = seq;

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
			parent.jQuery.fancybox.close();
			parent.location.reload();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};



function click_bizType(bizType) {
	if (bizType == 1) {
		$("#cust").css("display", "block");
		$("#person").css("display", "none");
	} else if ((bizType == 2)) {
		$("#cust").css("display", "none");
		$("#person").css("display", "block");
	}
}


function formClear3() {
	$('#custName').val('');
	$('#custCode').val('');
	$('#ceoName').val('');
	$('#bizNo1').val('');
	$('#pName').val('');
	$('#bizNo2').val('');
	$('#bizNo2').val('');
	$('#address').val('');
	$('#phone').val('');
	$('#fax').val('');
	$('#taxEmail').val('');

}

function formClear2() {

	$('#supPrice').val('');
	$('#vat').val('');
	$('#totalPrice').val('');

}


function createNo() {
	var lastNo = findLastNo();
	let datePart = lastNo.substring(0, 8);
	let count = lastNo.substring(8);
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
	let newNo = datePart + threeDigit;

	return newNo;
}

function findLastNo() {
	var No;
	var url = "/base/taxBill-list";
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.taxBillList.length == 0) {
				No = "11112233001"
			} else {
				No = data.taxBillList[data.taxBillList.length - 1].taxBillNo;
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
	var value1;
	var value2;


	if ($("input[name='taxTypeName']:checked").val() == "과세") {

		if ($("#supPrice").val() != "") { value1 = $("#supPrice").val() }

		value2 = $("#totalPrice").val()
		valueInt1 = parseInt(value1);
		valueInt2 = parseInt(value2);

		if (type == 1) {
			vat1 = parseInt(value1 * 0.1);
			$('#vat').val(vat1);
			$('#totalPrice').val(valueInt1 + vat1);
		} if (type == 2) {
			vat1 = parseInt(parseInt(value2 * 10) / 110);
			$('#vat').val(vat1);
			$('#supPrice').val(valueInt2 - vat1);
		}

	} else {
		if (type == 1) {
			value1 = $("#supPrice").val();
			$('#totalPrice').val(value1);
		}
		if (type == 2) {
			value2 = $("#totalPrice").val();
			$('#supPrice').val(value2);
		}

	}

}


function findTaxInfo(url, taxBillNo) {
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST",
			"taxBillNo": taxBillNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.taxBillList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
			} else {
				if (data.taxBillList[0].bizType == "사업자") {
					$("#radio1").click();
					$('#custName').val(data.taxBillList[0].custName);
					$('#bizNo1').val(data.taxBillList[0].bizNo);
				}
				if (data.taxBillList[0].bizType == "개인") {
					$("#radio2").click();
					$('#pName').val(data.taxBillList[0].custName);
					$('#bizNo2').val(data.taxBillList[0].bizNo);
				}
				if (data.taxBillList[0].taxTypeName == "과세") {
					$("#radio3").click();
				}
				if (data.taxBillList[0].taxTypeName == "영세") {
					$("#radio4").click();
				}
				if (data.taxBillList[0].taxTypeName == "면세") {
					$("#radio5").click();
				}
				if (data.taxBillList[0].clType == "청구") {
					$("#radio7").click();
				}
				if (data.taxBillList[0].clType == "영수") {
					$("#radio8").click();
				}

				$('#datepicker-input1').val(data.taxBillList[0].taxBillDate);
				$('#custCode').val(data.taxBillList[0].custCode);

				$('#ceoName').val(data.taxBillList[0].ceoName);

				$('#address').val(data.taxBillList[0].address);
				$('#phone').val(data.taxBillList[0].phone);
				$('#fax').val(data.taxBillList[0].fax);
				$('#taxEmail').val(data.taxBillList[0].taxEmail);
				$('#itemName').val(data.taxBillList[0].itemName);
				
				$('#supPrice').val(data.taxBillList[0].supPrice);	
				$('#vat').val(data.taxBillList[0].vat);
				$('#totalPrice').val(data.taxBillList[0].totalPrice);
				
				$('#memo').val(data.taxBillList[0].memo);
				
				
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


function openFCustDialog() {

	$('#custCodeSelect').select2({ dropdownParent: $("#dialog-form-fCust") });


	$("#dialog-form-fCust").dialog({
		//autoOpen: false,
		height: 400,
		//minWidth: 500,
		width: "50%",
		modal: true,
		headerHeight: 40,
		left: "50%",
    	marginleft: "-20%",
		buttons: {

		},
		close: function() {

		}
	});

	$("#dialog-form-fCust").dialog("open");

	findCustInfo("/base/cust-list", 1);

}


function findCustInfo(url, value) {
	var list = [];
	var selectedCode = $("#custCodeSelect").val();

    $("#custCodeSelect").empty();
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				$("#dialog-form-fCust").dialog("close");
			} else {
				if (value == 1) {
					for (i = 0; i < data.custList.length; i++) {
						custCode = data.custList[i].custCode;
						custName = data.custList[i].custName;
						//$("#insurCode").append("<option value='"+custName+"' >"+custName+"</option>");
						$("#custCodeSelect").append("<option value='" + custCode + "' >" + custName + "</option>");
					}
				}

				if (value == 2) {

					for (i = 0; i < data.custList.length; i++) {
						
						if (data.custList[i].custCode == selectedCode) {

							$('#custCode').val(data.custList[i].custCode);
							$('#custName').val(data.custList[i].custName);

							$('#ceoName').val(data.custList[i].ceoName);
							$('#bizNo1').val(data.custList[i].bizNo);

							$('#address').val(data.custList[i].custAddress1);
							/*현재 거래처정보에 전화번호 팩스가 형식에 안맞게 저장되있어서 api로 넘길때 오류가남 카윈은 안가져옴 */
							//$('#phone').val(data.custList[i].phone);
							//$('#fax').val(data.custList[i].fax);
							$('#taxEmail').val(data.custList[i].taxEmail);
							return;
						}
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


function getData(selectedValue){
	if(selectedValue == "보험1" && $("input[name='bizType']:checked").val() == "사업자"){
		findCustData($('#insure1Code').val(),1);
		$('#supPrice').val(parseFloat($('#insure1CollAmt').val()).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#vat').val(parseFloat($('#insure1CollAmt').val()*0.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#totalPrice').val(parseFloat($('#insure1CollAmt').val()*1.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		
	}
	else if(selectedValue == "보험2" && $("input[name='bizType']:checked").val() == "사업자"){
		findCustData($('#insure2Code').val(),1);
		$('#supPrice').val(parseFloat($('#insure2CollAmt').val()).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#vat').val(parseFloat($('#insure2CollAmt').val()*0.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#totalPrice').val(parseFloat($('#insure2CollAmt').val()*1.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
	}
	else if((selectedValue == "일반" || selectedValue == "일반(전환)") && $("input[name='bizType']:checked").val() == "사업자"){		
		findCustData($('#custCode2').val(),1);
		$('#supPrice').val(parseFloat($('#clAmt').val()/1.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#vat').val(parseFloat($('#clAmt').val()/1.1*0.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#totalPrice').val(parseFloat($('#clAmt').val()).toLocaleString(undefined, { maximumFractionDigits: 0 }));
	}
	else if((selectedValue == "일반" || selectedValue == "일반(전환)") && $("input[name='bizType']:checked").val() == "개인"){
		findCustData($('#custCode2').val(),2);
		$('#supPrice').val(parseFloat($('#clAmt').val()/1.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#vat').val(parseFloat($('#clAmt').val()/1.1*0.1).toLocaleString(undefined, { maximumFractionDigits: 0 }));
		$('#totalPrice').val(parseFloat($('#clAmt').val()).toLocaleString(undefined, { maximumFractionDigits: 0 }));
	}
	else {
		formClear3();
	}		
	
}
function findCustData(custCode,type){
	
	$.ajax({
		type: "POST",
		url: "/base/cust-list",
		dataType: "json",
		data: {
			"workingType": "LIST",
			"custCode": custCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			if(type==1){
				$('#custName').val(data.custList[0].custName);
				$('#custCode').val(data.custList[0].custCode);
				$('#ceoName').val(data.custList[0].ceoName);
				$('#bizNo1').val(data.custList[0].bizNo);
				$('#address').val(data.custList[0].custAddress1);
				/*현재 거래처정보에 전화번호 팩스가 형식에 안맞게 저장되있어서 api로 넘길때 오류가남 카윈은 안가져옴 */
				//$('#phone').val(data.custList[0].phone);
				//$('#fax').val(data.custList[0].fax);			
				$('#taxEmail').val(data.custList[0].taxEmail);			
			}else if(type==2){
				$('#pName').val(data.custList[0].custName);
				$('#bizNo2').val(data.custList[0].bizNo);
				$('#phone').val(data.custList[0].phone);
				$('#taxEmail').val(data.custList[0].taxEmail);	
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

