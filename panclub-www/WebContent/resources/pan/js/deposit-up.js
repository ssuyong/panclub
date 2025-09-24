//입금일자 미래시점으로 안잡히게 설정
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

var myGridID;
var myGridID1;
var myGridID2;

var queryParams = new URLSearchParams(window.location.search);
var depositDead = queryParams.get('depositDead');
var regPopYN = queryParams.get('regPopYN');
//console.log ("depositDead22222"+depositDead)


var cashRectYN_checked = $("input[name='cashRectYN']:checked").val();

$(document).ready(function() {
	
	

	findSrchCode1("/base/cust-list");
	findSrchCode2("/biz/payment",regPopYN);

	$("#btnReg").click(function() {
		uptCdPay("/base/depositCdPay");
		updateDataToServer("/base/depositAdd");
		
	});
	$("#btnRegDialog").click(function() {
		getCheckedRowItems();
		$("#dialog-form-clReq").dialog("close");
		//console.log("check in")
	}); //등록
	$("#btnClose").click(function() {
		parent.jQuery.fancybox.close();
		parent.location.reload();
	});//닫기

	$("#btnCloseDialog").click(function() {

		$("#dialog-form-clReq").dialog("close");
	});

	$("#btnRegDialog1").click(function() {
		saveCdPayList();
		$("#dialog-form-cdPay").dialog("close");
	});

	$("#btnCloseDialog1").click(function() {
		$("#dialog-form-cdPay").dialog("close");
	});


	$("#btnRegDialog2").click(function() {
		//getCheckedRowItems2(); 2023.07.27 bk 
		getCheckedRowItems3();
		$("#dialog-form-clReq2").dialog("close");
	}); 

	$("#btnCloseDialog2").click(function() {
		$("#dialog-form-clReq2").dialog("close");
	});
	
	$("#radio1").click();
	$("#radio8").click();
	$("#radio9").click();

	$("input[name='accCode']").change(function() {
		var fd = findLastDepositNo();
	//	console.log("fd : " + fd)
		formClear1();

	});
	$("input[name='payType']").change(function() {
		formClear2();

	});

	$("input[name='cashRectYN']").change(function() {
		formClear3();

	});


	let depositNo = $("#depositNo_upt").text();

	if (depositNo != '') {
		findDepositInfo('/base/deposit-list');
	}

	$("#depositMoney").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#supPrice").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#vat").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#dcMoney").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#cardFee").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	$("#remitFee").bind('keyup keydown', function() {
		inputNumberFormat(this);
	});
	


});

  
// 데이터 서버로 보내기
function updateDataToServer(url) {
	
	var workingType = '';
	var accCode1 = $("input[name='accCode']:checked").val();
	var payType1 = $("input[name='payType']:checked").val();
	var accCode2;
	var payType2;

	if (accCode1 == "물품대") { accCode2 = "A" }
	if (accCode1 == "기타수입") { accCode2 = "E" }
	if (accCode1 == "카드대금") { accCode2 = "N" }
	if (accCode1 == "대여금/차입금") { accCode2 = "O" }
	if (accCode1 == "보험") { accCode2 = "Z" }

	if (payType1 == "현금") { payType2 = "CA" }
	if (payType1 == "카드") { payType2 = "CD" }
	if (payType1 == "예금") { payType2 = "DP" }

	var depositNo = '';

		var depositNoElement = document.getElementById("depositNo_upt");
		var depositNo = depositNoElement.textContent.trim();
		
		if (depositNo) {
			 	workingType = "UPT";
			 	depositNo = depositNo;
		} else {
		  workingType = "ADD";
		  depositNo = createDepositNo();
		}
		//console.log ("workingType" +workingType);
		//console.log("depositNo" +depositNo);

//return;
	var depositDate = document.getElementById("datepicker-input1").value;
	var custCode = $("#custCode").val();
	var carNo = $("#carNo").val();
	var accCode = accCode2;
	var payType = payType2;

	var cashRectYN1 = $("input[name='cashRectYN']:checked").val();
	var cashRectYN2;

	if (cashRectYN1 == "미사용") { cashRectYN2 = "N" }
	if (cashRectYN1 == "사용") { cashRectYN2 = "Y" }

	var cashRectYN = cashRectYN2;
	var cashRectNo = $("#cashRectNo").val();
	var cardCom = $("#payCode1").val();
	var payCode = $("#payCode2").val();
	var cdAllowNo = $("#cdAllowNo").val();
	var supPrice = cf_getNumberOnly($("#supPrice").val());
	var vat = cf_getNumberOnly($("#vat").val());
	var depositMoney = cf_getNumberOnly($("#depositMoney").val());
	var cardFee = cf_getNumberOnly($("#cardFee").val());
	var remitFee = cf_getNumberOnly($("#remitFee").val());
	var dcMoney = cf_getNumberOnly($("#dcMoney").val());
	var claimReqNo = $("#claimReqNo").val();
	var memo = $("#memo").val();
	//var clGroupId = $("#clGroupId").val();

	var countY;
	var cashRectM;
	var cashM;
	var cardM;
	var accM;
	var cardSubM;
	var jobArr  ='';
	var depositArr = '';

	if (cashRectYN2 == "Y") {
		countY = 1;
		cashRectM = cf_getNumberOnly($("#depositMoney").val());
	}
	if (payType2 == "CA") {
		cashM = cf_getNumberOnly($("#depositMoney").val());
	}
	if (payType2 == "CD") {
		cardM = cf_getNumberOnly($("#depositMoney").val());
	}
	if (payType2 == "DP") {
		accM = cf_getNumberOnly($("#depositMoney").val());
	}
	if (accCode2 == "N") {
		cardSubM = cf_getNumberOnly($("#depositMoney").val());
	}

	if(accCode1 =="보험"){
		jobArr = $("#clGroupId2").val();
		//console.log("jobArr22", jobArr);
		if (jobArr === null || jobArr === undefined || jobArr.trim() === '') {
			jobArr = '';
		}
		var count = jobArr.split("^").length;

		var container = document.getElementById("depContainer");

		var inputs = container.getElementsByTagName("input");
		for (var j = 0; j < inputs.length; j++) {
			var inputValue = inputs[j].value;
			if (j == 0) {
				depositArr += inputValue;
			} else {
				depositArr += "^" + inputValue;
			}
		}
						
	}

	if(accCode1 =="물품대"){
		jobArr = $("#clGroupId4").val();
		//console.log("jobArr22", jobArr);
		if (jobArr === null || jobArr === undefined || jobArr.trim() === '') {
			jobArr = '';
		}
		var count = jobArr.split("^").length;
		var container = document.getElementById("depContainer");
		var inputs = container.getElementsByTagName("input");
		for (var j = 0; j < inputs.length; j++) {
			var inputValue = inputs[j].value;
			if (j == 0) {
				depositArr += inputValue;
			} else {
				depositArr += "^" + inputValue;
			}
		}
				
	}
	
	
	//console.log("jobarr"+jobArr);
	//console.log ("count"+count);
	//console.log("depositArr"+depositArr);
	//console.log ("fffff"+$("#clGroupId2").val());
	
	//return;

	var removeList = AUIGrid.getRemovedItems(myGridID);


	if (depositDate == '') { alert("입금일은 필수 입력해야 합니다."); $("#depositDate").focus(); return; }
	if (accCode == '') { alert("계정은 필수 입력해야 합니다."); $("#accCode").focus(); return; }
	if (payType == '') { alert("입금 구분은 필수 입력해야 합니다."); $("#payType").focus(); return; }
	if (custCode == '') { alert("거래처는 필수 입력해야 합니다."); $("#custCode").focus(); return; }
	if (depositMoney == '') { alert("입금액은 필수 입력해야 합니다."); $("#depositMoney").focus(); return; }
	
	/*
	if (depositDead>= depositDate){
		alert("입금일자는 마감된 일자입니다."); $("#depositDate").focus();return; 
	};*/
	//console.log("payType"+payType);
 	//if (accCode1 == "물품대" && payType== 'DP'){ alert("계좌번호는 필수 입력해야 합니다."); $("#payCode2").focus(); return;}
 	
	var data = {};
	/*
	
		if (removeList.length > 0) data.depositRemoveList = removeList;
		else data.orderItemRemove = [];
	*/

	data.workingType = workingType;
	data.depositNo = depositNo;
	data.depositDate = depositDate;
	data.custCode = custCode;
	data.carNo = carNo;
	data.accCode = accCode;
	data.payType = payType;
	data.cashRectYN = cashRectYN;
	data.cashRectNo = cashRectNo;
	data.cardCom = cardCom;
	data.payCode = payCode;
	data.cdAllowNo = cdAllowNo;
	data.supPrice = supPrice;
	data.vat = vat;
	data.depositMoney = depositMoney;
	data.cardFee = cardFee;
	data.remitFee = remitFee;
	data.dcMoney = dcMoney;
	data.claimReqNo = claimReqNo;
	data.memo = memo;

	data.countY = countY;
	data.cashRectM = cashRectM;
	data.cashM = cashM;
	data.cardM = cardM;
	data.accM = accM;
	data.cardSubM = cardSubM;
	//data.clGroupId = clGroupId;
	data.jobArr = jobArr;
	data.depositArr = depositArr;


	//console.log("jobArr"+jobArr);
	//console.log("depositArr"+depositArr);

	

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

function click_accCode(accType) {
	//console.log ("accTypeaccType"+accType);
	if (accType == 1) {
		$("#cashRadio").css("display", "block");
		$("#cardRadio").css("display", "block");
		$("#depositRadio").css("display", "block");
		$("#custList").css("display", "block");
		$("#carInfo-input").css("display", "none");
		$("#cardInfo-input").css("display", "block");
		$("#accList").css("display", "block");
		$("#fee-input").css("display", "none");
		$("#money-input").css("display", "block");
		$("#cashRectRadio").css("display", "block");
		$("#cashRectNo-input").css("display", "block");
		$("#memo-input").css("display", "block");
		$("#memo23-input").css("display", "none");
		$("#divCdPay").css("display", "none");
		$("#depContainer").css("display", "block");
	} else if (accType == 2) {
		$("#cashRadio").css("display", "block");
		$("#cardRadio").css("display", "none");
		$("#depositRadio").css("display", "block");
		$("#custList").css("display", "block");
		$("#carInfo-input").css("display", "none");
		$("#cardInfo-input").css("display", "none");
		$("#accList").css("display", "block");
		$("#fee-input").css("display", "none");
		$("#money-input").css("display", "block");
		$("#cashRectRadio").css("display", "none");
		$("#cashRectNo-input").css("display", "none");
		$("#memo-input").css("display", "block");
		$("#memo23-input").css("display", "none");
		$("#divCdPay").css("display", "none");
		$("#depContainer").css("display", "none");
	} else if (accType == 3) {
		$("#cashRadio").css("display", "none");
		$("#cardRadio").css("display", "none");
		$("#depositRadio").css("display", "block");
		$("#custList").css("display", "block");
		$("#carInfo-input").css("display", "none");
		$("#cardInfo-input").css("display", "none");
		$("#accList").css("display", "block");
		$("#fee-input").css("display", "block");
		$("#money-input").css("display", "block");
		$("#cashRectRadio").css("display", "none");
		$("#cashRectNo-input").css("display", "none");
		$("#memo-input").css("display", "block");
		$("#memo23-input").css("display", "block");
		$("#divCdPay").css("display", "block");

		$("#cardFee").prop("disabled", false);
		$("#remitFee").prop("disabled", true);
		$("#supPrice").prop("disabled", true);
		$("#vat").prop("disabled", true);
		$("#dcMoney").prop("disabled", true);
		$("#memo2").prop("disabled", true);
		$("#memo3").prop("disabled", true);
		$("#memo4").prop("disabled", true);
		$("#depContainer").css("display", "none");
	} else if (accType == 4) {
		$("#cashRadio").css("display", "block");
		$("#cardRadio").css("display", "none");
		$("#depositRadio").css("display", "block");
		$("#custList").css("display", "block");
		$("#carInfo-input").css("display", "none");
		$("#cardInfo-input").css("display", "none");
		$("#accList").css("display", "block");
		$("#fee-input").css("display", "block");
		$("#money-input").css("display", "block");
		$("#cashRectRadio").css("display", "none");
		$("#cashRectNo-input").css("display", "none");
		$("#memo-input").css("display", "block");
		$("#memo23-input").css("display", "none");
		$("#divCdPay").css("display", "none");


		$("#cardFee").prop("disabled", true);
		$("#remitFee").prop("disabled", false);
		$("#supPrice").prop("disabled", true);
		$("#vat").prop("disabled", true);
		$("#dcMoney").prop("disabled", true);
		$("#depContainer").css("display", "none");
	} else {
		$("#cashRadio").css("display", "block");
		$("#cardRadio").css("display", "none");
		$("#depositRadio").css("display", "block");
		$("#custList").css("display", "block");
		$("#carInfo-input").css("display", "block");
		$("#cardInfo-input").css("display", "none");
		$("#accList").css("display", "block");
		$("#fee-input").css("display", "none");
		$("#money-input").css("display", "block");
		$("#cashRectRadio").css("display", "block");
		$("#cashRectNo-input").css("display", "block");
		$("#memo-input").css("display", "block");
		$("#memo23-input").css("display", "none");
		$("#divCdPay").css("display", "none");
		$("#supPrice").prop("disabled", true);
		$("#vat").prop("disabled", true);
		$("#dcMoney").prop("disabled", true);
			$("#depContainer").css("display", "block");
	}
}

function click_payType(payType) {
	if (payType == 1) {
		if ($("input[name='accCode']:checked").val() == "물품대") {
			$("#cashRectRadio").css("display", "block");
			$("#cashRectNo-input").css("display", "block");
		}

		$("#payCode1").prop("disabled", true);
		$("#cdAllowNo").prop("disabled", true);
		$("#payCode2").prop("disabled", true);
		$("#supPrice").prop("disabled", true);
		$("#vat").prop("disabled", true);
	} else if ((payType == 2)) {
		if ($("input[name='accCode']:checked").val() == "물품대") {
			$("#cashRectRadio").css("display", "none");
			$("#cashRectNo-input").css("display", "none");
		}

		$("#payCode1").prop("disabled", false);
		$("#cdAllowNo").prop("disabled", false);
		$("#payCode2").prop("disabled", true);
		$("#supPrice").prop("disabled", false);
		$("#vat").prop("disabled", true);
	} else {
		if ($("input[name='accCode']:checked").val() == "물품대") {
			$("#cashRectRadio").css("display", "block");
			$("#cashRectNo-input").css("display", "block");
		}
		$("#payCode1").prop("disabled", true);
		$("#cdAllowNo").prop("disabled", true);
		$("#payCode2").prop("disabled", false);
		$("#supPrice").prop("disabled", true);
		$("#vat").prop("disabled", true);
	}
}


function click_cashRectYN(cashRectYN) {
	if (cashRectYN == 1) {
		$("#cashRectNo").prop("disabled", true);
	} else {
		$("#cashRectNo").prop("disabled", false);
	}
}

function findSrchCode1(url) {

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
			if (data.custList.length == 0) {
			} else {

				for (i = 0; i < data.custList.length; i++) {
					custCode = data.custList[i].custCode;
					custName = data.custList[i].custName;
					//$("#insurCode").append("<option value='"+custName+"' >"+custName+"</option>");
					$("#payCode1").append("<option value='" + custCode + "' >" + custName + "</option>");
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


function findSrchCode2(url,regPopYN) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			regPopYN:regPopYN
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

function openClReqDialog() {

	var ClReqDialog;
	ClReqDialog = $("#dialog-form-clReq").dialog({
		//autoOpen: false,
		height: 700,
		//minWidth: 500,
		width: "80%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {

		},
		close: function() {

		}
	});



	ClReqDialog.dialog("open");

	createClReqGrid();

	findDataToServer_clReq("/order/cl-group-list", 1)
}


function createClReqGrid() {

	var columnLayout = [
		{
			headerText: "기본정보",
			children: [
				{ dataField: "regYmd", headerText: "생성일" },
				{ dataField: "clGroupId", headerText: "청구그룹 ID" },
				{ dataField: "carNo", headerText: "차번", width: 100 },
				{ dataField: "makerCode", headerText: "차종", width: 80 },
				{ dataField: "orderGroupId", headerText: "주문그룹ID", visible: false },
				{ dataField: "supCustName", headerText: "주문처" , visible: false}
			]  
		},
		{
			headerText: "청구처리구분",
			children: [
				{ dataField: "clType", headerText: "청구구분", visible: false },
				{ dataField: "procStep", headerText: "청구구분", width: 80 },
				{ dataField: "billPubli", headerText: "발행", visible: false }
			]
		},
		{
			headerText: "보험사1",
			children: [
				{ dataField: "insure1Name", headerText: "보험사1" },
				{ dataField: "insure1ReceNo", headerText: "접수번호", width: 120, visible: false },
				{ dataField: "insure1AcciRate", headerText: "과실", width: 50 },
				{ dataField: "insure1ClAmt",      headerText: "청구금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"   },
				{ dataField: "insure1CollAmt", headerText: "보험사1수금", dataType: "numeric" ,formatString: "#,##0"  , style:"right" }
			]
		},
		{
			headerText: "보험사2",
			children: [
				{ dataField: "insure2Name", headerText: "보험사2" },
				{ dataField: "insure2ReceNo", headerText: "접수번호", width: 120, visible: false },
				{ dataField: "insure2AcciRate", headerText: "과실", width: 50 },
				{ dataField: "insure2ClAmt",      headerText: "청구금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"  },
				{ dataField: "insure2CollAmt", headerText: "보험사2수금", dataType: "numeric" ,formatString: "#,##0"  , style:"right" }
				,{ dataField: "confYN", headerText: "기결" }
			]
		},
		/*
		{
			headerText: "수금",
			children: [
				,
				,
				{ dataField: "capitalAmt", headerText: "캐피탈", dataType: "numeric" ,formatString: "#,##0"  , style:"right", width: 120 },
			]
		},
		*/
		{
			headerText: "금액확인",
			children: [
				{ dataField: "riAmt", headerText: "원가", visible: false },
				{ dataField: "extraExpence", headerText: "판매가", width: 120, visible: false },
				{ dataField: "clAmt", headerText: "청구금액", width: 120, dataType: "numeric" ,formatString: "#,##0"  , style:"right" },
				{ dataField: "collectAmt", headerText: "수금액", width: 120, dataType: "numeric" ,formatString: "#,##0"  , style:"right" },
			]
		}

		/*,
		{  headerText : "기타비용", 
			children: [
				{ dataField: "riAmt",        headerText: "반입"              },
				{ dataField: "extraExpence",        headerText: "부대비용",      width: 120       },
			]
		}*/

	];

	var auiGridProps = {

		usePaging: true,
		pageRowCount: 50,
		showPageRowSelect: true,

		//showStateColumn: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false,
	};

	// 체크박스 칼럼 렌더러 표시 설정
	auiGridProps.showRowCheckColumn = true;

	auiGridProps.showStateColumn = true;

	// 체크박스 대신 라디오버튼 출력함
	auiGridProps.rowCheckToRadio = false;


	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);

	var rowPos = 'first';



	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
	
	AUIGrid.bind(myGridID, "keyDown", function(event) {
		if (event.keyCode == 13) {
			//console.log ("hi");
			var selectedItems  = AUIGrid.getSelectedItems(myGridID);
			if (selectedItems.length <= 0) {
				alert("청구요청을 선택해주세요");
				return;
			}
			else {
				var rowItem = selectedItems[0].item;
				$("#carNo").val(rowItem.carNo);
				$("#claimReqNo").val(rowItem.clGroupId);
				$("#clGroupId").val(rowItem.clGroupId);

				$("#dialog-form-clReq").dialog("close");
			}
		}
	})
}

function findDataToServer_clReq(url, page) {
	var list = [];

	var carNo = $("#carNo").val(); 
	var insure1Code = $("#custCode").val(); 
	//var clReqNo = $("#clReqNo").val();
	

	//console.log ("url"+url);
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			//"clReqNo": clReqNo,
			"carNo":carNo,
			"insure1Code":insure1Code,
			"workingType": "LIST"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			if (data.clGroupList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

			for (i = 0; i < data.clGroupList.length; i++) {
				if (data.clGroupList[i].confYN !== "Y" && data.clGroupList[i].clType == "보험") { 
					list.push({
						regYmd: data.clGroupList[i].regYmd
						, carNo: data.clGroupList[i].carNo
						, clGroupId: data.clGroupList[i].clGroupId
						, orderGroupId: data.clGroupList[i].orderGroupId
						//, supCustName: data.clGroupList[i].supCustName
						, clType: data.clGroupList[i].clType
						, procStep: data.clGroupList[i].procStep
						, billPubli: data.clGroupList[i].billPubli
						, insure1Name: data.clGroupList[i].insure1Name
						, insure1AcceptNo: data.clGroupList[i].insure1AcceptNo
						,insure1AcciRate: Math.round(data.clGroupList[i].insure1AcciRate)  +"%"
						,insure1ClAmt : data.clGroupList[i].insure1ClAmt
						
						, insure2Name: data.clGroupList[i].insure2Name
						, insure2AcceptNo: data.clGroupList[i].insure2AcceptNo
						,insure2AcciRate: Math.round(data.clGroupList[i].insure2AcciRate)  +"%"
						,insure2ClAmt : data.clGroupList[i].insure2ClAmt
						
						, insure1CollAmt: data.clGroupList[i].insure1CollAmt
						, insure2CollAmt: data.clGroupList[i].insure2CollAmt
						, riAmt: data.clGroupList[i].riAmt
						, extraExpence: data.clGroupList[i].extraExpence
						
						, capitalAmt: data.clGroupList[i].capitalAmt
						, collectAmt: data.clGroupList[i].collectAmt
						, clAmt: data.clGroupList[i].clAmt
						,confYN: data.clGroupList[i].confYN 
						,makerCode:data.clGroupList[i].makerCode	
					});
				 }	
			}
				AUIGrid.setGridData("#grid_wrap", list);
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

function formClear1() {

	$('#custCode').val('');
	$('#custName').val('');
	$('#carNo').val('');
	$("#radio8").click();
	$("#radio9").click();
	$('#cashRectNo').val('');
	$('#payCode1').val('Default Value');
	$('#payCode2').val('Default Value');
	$('#cdAllowNo').val('');
	$('#supPrice').val('');
	$('#vat').val('');
	$('#depositMoney').val('');
	$('#cardFee').val('');
	$('#remitFee').val('');
	$('#dcMoney').val('');
	$('#claimReqNo').val('');
	$('#memo').val('');
	$('#memo2').val('');
	$('#memo3').val('');
	$('#memo4').val('');

}

function formClear2() {

	$("#radio9").click();
	$('#cashRectNo').val('');
	$('#payCode1').val('Default Value');
	$('#payCode2').val('Default Value');
	$('#cdAllowNo').val('');
	$('#supPrice').val('');
	$('#vat').val('');
	$('#depositMoney').val('');
	$('#dcMoney').val('');
	$('#memo').val('');

}

function formClear3() {

	$('#cashRectNo').val('');

}

function createDepositNo() {
	var lastDepositNo = findLastDepositNo();
	let datePart = lastDepositNo.substring(0, 8);
	let count = lastDepositNo.substring(8);
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
	let newDepositNo = datePart + threeDigit;

	return newDepositNo;
}

function findLastDepositNo() {
	var No;
	var url = "/base/deposit-list";
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType":"LIST",
			"orderBy" : "finDepNo"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.depositList.length == 0) {
				No = "11112233001"
			} else {
				No = data.depositList[data.depositList.length-1].depositNo;
				//console.log("No : " + No)
				//console.log("data.depositList.length : " + data.depositList.length)
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
	let preDepositMoney;
	let valueInt1;
	let valueInt2;

	if ($("input[name='payType']:checked").val() == "카드") {
		if ($("#supPrice").val() != "") { var value1 = cf_getNumberOnly($("#supPrice").val()) }

		var value2 = cf_getNumberOnly($("#depositMoney").val());
		valueInt1 = parseInt(value1);
		valueInt2 = parseInt(value2);



		if (type == 1) {
			vat1 = parseInt(value1 * 0.1);
			$('#vat').val(comma(vat1));
			$('#depositMoney').val(comma(valueInt1 + vat1));
		} if (type == 2) {
			vat1 = parseInt(parseInt(value2 * 10) / 110);
			$('#vat').val(comma(vat1));
			$('#supPrice').val(comma(valueInt2 - vat1));
		}
	}
	else if ($("input[name='accCode']:checked").val() == "카드대금") {
		if ($("#cardFee").val() != "") { var value1 = cf_getNumberOnly($("#cardFee").val()) }

		var value2 = cf_getNumberOnly($("#depositMoney").val())
		valueInt1 = parseInt(value1);
		valueInt2 = parseInt(value2);
		preDepositMoney =  cf_getNumberOnly($("#memo4").val());

		if (type == 1) {
			$('#depositMoney').val(comma(preDepositMoney - valueInt1));
		} if (type == 2) {
			$('#cardFee').val(comma(preDepositMoney - valueInt2));
		}
	}
}

//이겅
function getCheckedRowItems() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);

	if (checkedItems.length <= 0) {
		alert("청구요청을 선택해주세요");
		return;
	}
		var rowItem;
		var jobArr = "";
		var carArr = [];
		var errCnt2 = 0;
		var insure1Name = "";
		var carNo ="";
		for (var i = 0, len = checkedItems.length; i < len; i++) {
				rowItem = checkedItems[i];		    
				if(i==0){
						 jobArr +=  rowItem.item.clGroupId;
				}else{
		   		 jobArr += "^" + rowItem.item.clGroupId;
		   		 insure1Name = rowItem.item.insure1Name; 
		   		 carNo = rowItem.item.carNo;
		   		 }
		   		 
		    if (carArr.indexOf(rowItem.item.carNo) === -1) {
		        carArr.push(rowItem.item.carNo);
		    }
		}	
		if (carArr.length > 1) {
			    var errCarNameArr = carArr.join("/");
			    alert("차량번호 다른 경우 입금등록을 할 수 없습니다!!\n\n선택된 발주처: " + errCarNameArr);
			    return
		    }
		    
		$("#carNo").val(rowItem.item.carNo);
		$("#clGroupId").val(jobArr.replace(/\^/gi, " "));	  
		$("#clGroupId2").val(jobArr);	
		//console.log ("clGroupId2"+	$("#clGroupId2").val());
		var count = jobArr.split("^").length;
		//console.log ("count"+count);
		$("#depContainer").empty();
		if(count > 0 ){
			var container =document.getElementById("depContainer");
			var inputs = []; 
			for (var j = 0; j < count; j++) {	
				var div = document.createElement("div");
				var input = document.createElement("input");
						div.textContent = "입금액 " + [j+1] + ": ";
						div.style.fontWeight = "bold";
						input.className = "form-control";	
			  			input.style.width = "40%"
			  			input.style.maxWidth = "300px";
			  			container.appendChild(div);
						container.appendChild(input);
						inputs.push(input);
			} 			
				inputs.forEach(function (input) {
			    input.addEventListener("input", calculateTotal);
			    input.addEventListener("keydown", function (event) {
			      	if (event.key === "Tab") { calculateTotal();}});
		   	   	input.addEventListener("keyup", function() {
       				 inputNumberFormat(this); });  
		 	 });		
		 	  function calculateTotal() {
				var total = 0;
				 inputs.forEach(function(input) {
				 var value =  cf_getNumberOnly(input.value)
				 if (!isNaN(value)){
						 total += parseFloat(value); }
					 });	
					 $('#depositMoney').val(total);
			} 		
		}
	}




//입금정보 
function findDepositInfo(url) {
	var depositNo = $("#depositNo_upt").text();
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "DEP_LIST",
			"depositNo": depositNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			var supPriceIn;
			var vatIn;
			var depositMoneyIn;
			var dcMoneyIn;
			var remitFeeIn;
			var cardFeeIn;
 			var clGroupString = "";
 			var depositArr = "";
 			var preDpMoney;

			if (data.depositList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
			} else {
				if (data.depositList[0].accCode == "A") {
					$("#radio1").click();
					click_accCode(1);
				}
				if (data.depositList[0].accCode == "E") {
					$("#radio2").click();
					click_accCode(2);
				}
				if (data.depositList[0].accCode == "N") {
					$("#radio3").click();
					click_accCode(3);
				}
				if (data.depositList[0].accCode == "O") {
					$("#radio4").click();
					click_accCode(4);
				}
				if (data.depositList[0].accCode == "Z") {
					$("#radio5").click();
					click_accCode(5);
				}

				if (data.depositList[0].payType == "CA") {
					$("#radio6").click();
					click_payType(1);
				}
				if (data.depositList[0].payType == "CD") {
					$("#radio7").click();
					click_payType(2);
				}
				if (data.depositList[0].payType == "DP") {
					$("#radio8").click();
					click_payType(3);
				}

				if (data.depositList[0].cashRectYN == "N") {
					$("#radio9").click();
					click_cashRectYN(1);
				}
				if (data.depositList[0].cashRectYN == "Y") {     
					$("#radio10").click();
					click_cashRectYN(2);
				}
				
				if(data.depositList[0].supPrice == null){supPriceIn = ''}
				else{supPriceIn = Math.round((data.depositList[0].supPrice)).toLocaleString() }
				
				if(data.depositList[0].vat == null){vatIn = ''}
				else{vatIn =  Math.round((data.depositList[0].vat)).toLocaleString() }
				
				if(data.depositList[0].depositMoney == null){depositMoneyIn = ''}
				else{depositMoneyIn =   Math.round((data.depositList[0].depositMoney)).toLocaleString() }
				
				if(data.depositList[0].dcMoney == null){dcMoneyIn = ''}
				else{dcMoneyIn =  Math.round((data.depositList[0].dcMoney)).toLocaleString() }
				
				if(data.depositList[0].remitFee == null){remitFeeIn = ''}
				else{remitFeeIn =  Math.round((data.depositList[0].remitFee)).toLocaleString() }
				
				if(data.depositList[0].cardFee == null){cardFeeIn = ''}
				else{cardFeeIn = Math.round((data.depositList[0].cardFee) ).toLocaleString()}
				
				if(data.depositList[0].preDpMoney == null){preDpMoney = ''}
				else{preDpMoney = Math.round((data.depositList[0].preDpMoney) ).toLocaleString()}

				data.depositList.forEach(function(item) {
        		 clGroupString += item.jobArr + "^";});
        		 clGroupString = clGroupString.slice(0, -1);
        		 
        		 data.depositList.forEach(function(item) {
        		 depositArr += item.depositArr + "^";});
        		 depositArr = depositArr.slice(0, -1);
        		 var count = depositArr.split("^").length;
        		 
        		// console.log ("count" +count);
        		 
        		 var container = document.getElementById("depContainer");
						container.innerHTML = "";
						var inputs = []; 
        		 for (var j = 0; j < count; j++) {
					  var div = document.createElement("div");
					  var input = document.createElement("input");
					  div.style.fontWeight = "bold";
					  div.textContent = "입금액 " + (j + 1) + ": ";
					  input.className = "form-control";
					  input.style.width = "40%";
					  input.style.maxWidth = "300px";
					  input.value = parseFloat(depositArr.split("^")[j]);
					  container.appendChild(div);
					  container.appendChild(input);
					  inputs.push(input);
					}
					inputs.forEach(function (input) {
			    input.addEventListener("input", calculateTotal);
			    input.addEventListener("keydown", function (event) {
			      if (event.key === "Tab") {
			        calculateTotal();
			      	}
		   		});
		 	 });		
		 	  function calculateTotal() {
				var total = 0;
				 inputs.forEach(function(input) {
				 var value = parseFloat(input.value);
					// console.log("value" + value);
				if (!isNaN(value)) {total += value;  } });		
					 $('#depositMoney').val(total);}
				
					        		 

				$('#datepicker-input1').val(data.depositList[0].depositDate);
				$('#custCode').val(data.depositList[0].custCode);
				$('#custName').val(data.depositList[0].custName);
				$('#carNo').val(data.depositList[0].carNo);
				$('#claimReqNo').val(data.depositList[0].claimReqNo);
				$('#payCode1').val(data.depositList[0].cardCom);
				$('#cdAllowNo').val(data.depositList[0].cdAllowNo);
				$('#payCode2').val(data.depositList[0].payCode);
				$('#cardFee').val(cardFeeIn);
				$('#remitFee').val(remitFeeIn);
				$('#supPrice').val(supPriceIn);
				$('#vat').val(vatIn);
				$('#depositMoney').val(depositMoneyIn);
				$('#dcMoney').val(dcMoneyIn);
				$('#cashRectNo').val(data.depositList[0].cashRectNo);
				$('#memo').val(data.depositList[0].memo);
				$('#clGroupId').val(clGroupString);
				$('#clGroupId2').val(clGroupString);
				
				$('#memo2').val(data.depositList[0].conDepositNo);
				$('#memo4').val(preDpMoney);
				$('#connectCdPay').val(data.depositList[0].connectCdPay);
				
				$('#clGroupId3').val(clGroupString);
				$('#clGroupId4').val(clGroupString);


			}
			//findRegItem('/logis/ri-item-list');				
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



function serchCdPay() {
	if ($("input[name='accCode']:checked").val() == "카드대금") {
		if ($("#custCode").val() == '' || $("#custCode").val() == null) {
			alert("거래처를 입력해 주세요.");
			$("#custCode").focus();
		} else {
			openCdPayDialog(selectDepositNo());
		}
	}
}

function openCdPayDialog(value) {
	var cdPayDialog;
	cdPayDialog = $("#dialog-form-cdPay").dialog({
		//autoOpen: false,
		height: 350,
		//minWidth: 500,
		width: "90%",
		modal: true,
		headerHeight: 40,
		position: [400, 400],
		buttons: {

		},
		close: function() {

		}
	});

	cdPayDialog.dialog("open");

	createCdPayGrid();
	$("#depositNo_select").val(value)

	findDataToServer_cdPay("/base/deposit-list", 1)
}

function createCdPayGrid() {

	var columnLayout = [
		{
			headerText: "기본정보",
			children: [
				{ dataField: "depositDate", headerText: "결재일" },
				{ dataField: "carNo", headerText: "차번" },
				{ dataField: "depositNo", headerText: "입금번호" },
				{ dataField: "custCode", headerText: "거래처코드" },
				{ dataField: "custName", headerText: "거래처" }
			]
		},
		{
			headerText: "결재정보",
			children: [
				{ dataField: "cardCom", headerText: "카드사코드" },
				{ dataField: "cardComName", headerText: "카드사" },
				{ dataField: "cdAllowNo", headerText: "승인번호" }
			]
		},
		{
			headerText: "금액확인",
			children: [
				{ dataField: "supPrice", headerText: "공급가액", dataType: "numeric" ,formatString: "#,##0"  , style:"right" },
				{ dataField: "vat", headerText: "부가세", dataType: "numeric" ,formatString: "#,##0"  , style:"right" },
				{ dataField: "depositMoney", headerText: "입금액", dataType: "numeric" ,formatString: "#,##0"  , style:"right" },
			]
		}
	];

	var auiGridProps = {

		usePaging: true,
		pageRowCount: 20,
		showPageRowSelect: true,

		//showStateColumn: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false,
	};

	// 체크박스 칼럼 렌더러 표시 설정
	auiGridProps.showRowCheckColumn = true;

	auiGridProps.showStateColumn = true;


	myGridID1 = AUIGrid.create("#grid_wrap1", columnLayout, auiGridProps);


	AUIGrid.bind(myGridID1, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID1, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	AUIGrid.bind(myGridID1, "rowAllCheckClick", function(checked) {
		getCheckedRowItems2();

	});

	AUIGrid.bind(myGridID1, "rowCheckClick", function(event) {
		getCheckedRowItems2();
	});

}

function findDataToServer_cdPay(url, page) {
	var list = [];


	var cdCode = $("#custCode").val();


	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST"
			,"cdCode": cdCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.depositList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				$("#dialog-form-cdPay").dialog("close");
			} else {

				for (i = 0; i < data.depositList.length; i++) {

					list.push({
						depositDate: data.depositList[i].depositDate,
						carNo: data.depositList[i].carNo,
						depositNo: data.depositList[i].depositNo,
						custCode: data.depositList[i].custCode,
						custName: data.depositList[i].custName,
						cardCom: data.depositList[i].cardCom,
						cardComName: data.depositList[i].cardComName,
						cdAllowNo: data.depositList[i].cdAllowNo,
						supPrice: data.depositList[i].supPrice,
						vat: data.depositList[i].vat,
						depositMoney: data.depositList[i].depositMoney,

					});


				}

				AUIGrid.setGridData("#grid_wrap1", list);
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

function uptCdPay(url) {

	var depositCheckList = []
	depositCheckList = $('#memo2').val();
	var connectCdPay = $('#memo3').val();


	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		traditional: true,
		data: {
			"depositCheckList": depositCheckList,
			"connectCdPay": connectCdPay
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

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




function selectDepositNo() {
	var depositNo;

	if ($("#depositNo_upt").text() != '') {
		depositNo = $("#depositNo_upt").text();
	} else {
		depositNo = createDepositNo();
	}

	return depositNo;
}


function getCheckedRowItems2() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID1);

	var rowItem = [];
	var sum = 0;

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem[i] = checkedItems[i].item.depositMoney;
		sum = sum + rowItem[i];
	}
	$("#depositSum").val(comma(sum));


}

function saveCdPayList() {
	$("#memo4").val($("#depositSum").val());

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID1);
	if (checkedItems.length <= 0) {
		alert("맞는항목을 체크하세요");
		return;
	}
	var rowItem = [];

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem[i] = checkedItems[i].item.depositNo;
	}
	var preDepositNo = $("#depositNo_select").val();

	$("#memo2").val(rowItem);
	$("#memo3").val(preDepositNo);
	
	


}


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj, name) {

	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
	rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;

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
	return str.replace(/[^\d]+/g, '');
}
function cf_getNumberOnly(str) {
	var len = str.length;
	var sReturn = "";

	for (var i = 0; i < len; i++) {
		if ((str.charAt(i) >= "0") && (str.charAt(i) <= "9")) {
			sReturn += str.charAt(i);
		}
	}
	return sReturn;
}
// 탭키 누르면 팝업창 오픈 
 function handleKeyUp(event, element) {
        if (event.key === "Tab") {
            openClReqDialog();
            event.preventDefault(); // Prevent default tab behavior

            // Move focus to the next input element
            setTimeout(function() {
                var nextInput = document.getElementById("payCode2");
                if (nextInput !== null) {
                    nextInput.focus();
                }
            }, 0);
        }
    } 
    //f9버튼을 누르면 저장
     function handleF9Key(event) {
        if (event.keyCode === 120) { // F9 key code
            $("#btnReg").click();
            event.preventDefault(); // Prevent default F9 key behavior
        }
    }
    document.addEventListener("keydown", handleF9Key); 
    
  AUIGrid.bind(myGridID, "keyUp",	function(event) {
    if(event.keyCode == 13) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
			alert("청구요청을 선택해주세요");
			return;
		}
		else {
			var rowItem = checkedItems[0].item;
			$("#carNo").val(rowItem.carNo);
			$("#claimReqNo").val(rowItem.clGroupId);
			$("#clGroupId").val(rowItem.clGroupId);

			$("#dialog-form-clReq").dialog("close");
		}
		}
	})
 /*   
$("#dialog-form-clReq").keyup(function(event) {
	if (event.keyCode === 13) {
		var checkedItems = AUIGrid.getCheckedRowItems(myGridID);

		if (checkedItems.length <= 0) {
			alert("청구요청을 선택해주세요");
			return;
		}
		else {
			var rowItem = checkedItems[0].item;
			$("#carNo").val(rowItem.carNo);
			$("#claimReqNo").val(rowItem.clGroupId);
			$("#clGroupId").val(rowItem.clGroupId);

			$("#dialog-form-clReq").dialog("close");
		}
	}
*/	
$("#dialog-form-clReq").keyup(function(event) {
	if (event.keyCode == 40) {
		AUIGrid.setSelectionByIndex(myGridID, 0);
	}
})

//일반건 청구요청 매칭 0718 bk
function openClReqDialog2() {

	var ClReqDialog2;
	ClReqDialog2 = $("#dialog-form-clReq2").dialog({
		//autoOpen: false,
		height: 700,
		//minWidth: 500,
		width: "90%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {

		},
		close: function() {

		}
	});



	ClReqDialog2.dialog("open");

	createClReqGrid2();

	findDataToServer_clReq2("/order/cl-group-list", 1)
}


function createClReqGrid2() {

	var columnLayout = [
		{
			headerText: "기본정보",
			children: [
				{ dataField: "regYmd", headerText: "생성일" },
				{ dataField: "clGroupId", headerText: "청구그룹 ID" },
				{ dataField: "carNo", headerText: "차번", width: 120 },
				{ dataField: "orderGroupId", headerText: "주문그룹ID", visible: false },
				{ dataField: "custName", headerText: "주문처", width: 160 }
			]  
		},
		{
			headerText: "청구처리구분",
			children: [
				{ dataField: "expType", headerText: "증빙유형"},
				{ dataField: "procStep", headerText: "청구구분", width: 80, visible: false },
				{ dataField: "billPubli", headerText: "발행" }
			]
		},
		{
			headerText: "금액확인",
			children: [
				{ dataField: "riAmt", headerText: "원가", visible: false },
				{ dataField: "extraExpence", headerText: "판매가", width: 120, visible: false },
				{ dataField: "clAmt", headerText: "청구금액", width: 120, dataType: "numeric" ,formatString: "#,##0"  , style:"right" },
				{ dataField: "collectAmt", headerText: "수금액", width: 120, dataType: "numeric" ,formatString: "#,##0"  , style:"right" },
			]
		}

		/*,
		{  headerText : "기타비용", 
			children: [
				{ dataField: "riAmt",        headerText: "반입"              },
				{ dataField: "extraExpence",        headerText: "부대비용",      width: 120       },
			]
		}*/

	];

	var auiGridProps = {

		usePaging: true,
		pageRowCount: 50,
		showPageRowSelect: true,

		//showStateColumn: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false,
	};

	// 체크박스 칼럼 렌더러 표시 설정
	auiGridProps.showRowCheckColumn = true;

	auiGridProps.showStateColumn = true;

	// 체크박스 대신 라디오버튼 출력함
	auiGridProps.rowCheckToRadio = false;


	myGridID2 = AUIGrid.create("#grid_wrap3", columnLayout, auiGridProps);

	var rowPos = 'first';



	AUIGrid.bind(myGridID2, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID2, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
	
	AUIGrid.bind(myGridID2, "keyDown", function(event) {
		if (event.keyCode == 13) {
			//console.log ("hi");
			var selectedItems  = AUIGrid.getSelectedItems(myGridID2);
			if (selectedItems.length <= 0) {
				alert("청구요청을 선택해주세요");
				return;
			}
			else {
				var rowItem = selectedItems[0].item;
				$("#carNo").val(rowItem.carNo);
				$("#claimReqNo").val(rowItem.clGroupId);
				$("#clGroupId").val(rowItem.clGroupId);

				$("#dialog-form-clReq2").dialog("close");
			}
		}
	})
}

function findDataToServer_clReq2(url, page) {
	var list = [];

	//var carNo = $("#carNo").val(); 
	var  custCode = $("#custCode").val(); 
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			//"clReqNo": clReqNo,
		//	"carNo":carNo,
			"custCode":custCode,
			"workingType": "LIST"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			if (data.clGroupList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

			for (i = 0; i < data.clGroupList.length; i++) {
				if (data.clGroupList[i].confYN !== "Y" && data.clGroupList[i].clType == "일반"
				//&& data.clGroupList[i].expType !== null && data.clGroupList[i].expType.trim() !== ""
				) { 
					list.push({
						regYmd: data.clGroupList[i].regYmd
						, carNo: data.clGroupList[i].carNo
						, clGroupId: data.clGroupList[i].clGroupId
						, orderGroupId: data.clGroupList[i].orderGroupId
						, custName: data.clGroupList[i].custName
						, clType: data.clGroupList[i].clType
						, procStep: data.clGroupList[i].procStep
						, billPubli: data.clGroupList[i].billPubli
						, insure1Name: data.clGroupList[i].insure1Name
						, insure1AcceptNo: data.clGroupList[i].insure1AcceptNo
						,insure1AcciRate: Math.round(data.clGroupList[i].insure1AcciRate)  +"%"
						,insure1ClAmt : data.clGroupList[i].insure1ClAmt
						
						, insure2Name: data.clGroupList[i].insure2Name
						, insure2AcceptNo: data.clGroupList[i].insure2AcceptNo
						,insure2AcciRate: Math.round(data.clGroupList[i].insure2AcciRate)  +"%"
						,insure2ClAmt : data.clGroupList[i].insure2ClAmt
						
						, insure1CollAmt: data.clGroupList[i].insure1CollAmt
						, insure2CollAmt: data.clGroupList[i].insure2CollAmt
						, riAmt: data.clGroupList[i].riAmt
						, extraExpence: data.clGroupList[i].extraExpence
						
						, capitalAmt: data.clGroupList[i].capitalAmt
						, collectAmt: data.clGroupList[i].collectAmt
						, clAmt: data.clGroupList[i].clAmt
						,confYN: data.clGroupList[i].confYN 
						,expType: data.clGroupList[i].expType 
					});
				 }	
			}
				AUIGrid.setGridData("#grid_wrap3", list);
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID2, Number(page));
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

AUIGrid.bind(myGridID2, "keyUp",	function(event) {
    if(event.keyCode == 13) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID2);
	if (checkedItems.length <= 0) {
			alert("청구요청을 선택해주세요");
			return;
		}
		else {
			var rowItem = checkedItems[0].item;
			$("#carNo").val(rowItem.carNo);
			$("#claimReqNo").val(rowItem.clGroupId);
			$("#clGroupId").val(rowItem.clGroupId);

			$("#dialog-form-clReq2").dialog("close");
		}
		}
	})

$("#dialog-form-clReq").keyup(function(event) {
	if (event.keyCode == 40) {
		AUIGrid.setSelectionByIndex(myGridID2, 0);
	}
})
// 탭키 누르면 팝업창 오픈 
 function handleKeyUp2(event, element) {
        if (event.key === "Tab") {
            openClReqDialog2();
            event.preventDefault(); // Prevent default tab behavior

            // Move focus to the next input element
            setTimeout(function() {
                var nextInput = document.getElementById("payCode2");
                if (nextInput !== null) {
                    nextInput.focus();
                }
            }, 0);
        }
    } 
    
//일반건 청구요청 매칭 (청구그룹 1개 1입금 -> 청구그룹 여러개 1 입금 수정 )
function getCheckedRowItems3() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID2);

	if (checkedItems.length <= 0) {
		alert("청구요청을 선택해주세요");
		return;
	}
		var rowItem;
		var jobArr = "";
		for (var i = 0, len = checkedItems.length; i < len; i++) {
				rowItem = checkedItems[i];
			if(i==0){	
				 jobArr +=  rowItem.item.clGroupId;
			}else{
		   		 jobArr += "^" + rowItem.item.clGroupId;
		   	 }	 
		   }	 	
	$("#clGroupId3").val(jobArr.replace(/\^/gi, " "));	
	$("#clGroupId4").val(jobArr);    
	//console.log ("clGroupId23"+	$("#clGroupId3").val());
	//console.log ("clGroupId23"+	$("#clGroupId4").val());
	var count = jobArr.split("^").length;
	$("#depContainer").empty();
		if(count > 0 ){
			var container =document.getElementById("depContainer");
			var inputs = []; 
			for (var j = 0; j < count;  j++) {	
				var div = document.createElement("div");
				var input = document.createElement("input");
						div.textContent = "입금액 " + [j+1] + ": ";
						div.style.fontWeight = "bold";
						input.className = "form-control";	
			  			input.style.width = "40%"
			  			input.style.maxWidth = "300px";
			  			container.appendChild(div);
						container.appendChild(input);
						inputs.push(input);
			} 			
			inputs.forEach(function (input) {
			    input.addEventListener("input", calculateTotal);
			    input.addEventListener("keydown", function (event) {
			      if (event.key === "Tab") {
			        calculateTotal();	} });
			    input.addEventListener("keyup", function() {
       			 inputNumberFormat(this); });    
		 	 });		
		 	   function calculateTotal() {
				var total = 0;
				 inputs.forEach(function(input) {
				 var value =  cf_getNumberOnly(input.value)
						 total += parseFloat(value);
					 });		
				 $('#depositMoney').val(total);
			} 		
		}
	}
	//var rowItem = checkedItems[0].item;
	//$("#carNo").val(rowItem.carNo);
	//$("#claimReqNo").val(rowItem.clGroupId);
	//$("#clGroupId3").val(rowItem.clGroupId);
	//console.log("rowItem.clGroupId"+rowItem.clGroupId)

