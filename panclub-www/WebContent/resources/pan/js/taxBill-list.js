/*
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
*/
var today = new Date();
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
var firstDay = new Date(today); //2023.08.24 bk
firstDay.setDate(1); //2023.08.24 bk
var picker = tui.DatePicker.createRangePicker({
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

// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function() {
	
	//사업자등록번호 사업주명 회사명 주 연락처 필수값
	
	getTaxKey("/base/taxKey-list");
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        //var taxBillNo = info[1];
        var sYmd = info[1];
        var eYmd = info[2];
        var custCode= info[3];
        
        //if ( typeof taxBillNo == 'undefined'){ taxBillNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        //if ( typeof taxBillNo_val == 'undefined'){ taxBillNo_val = ''	}
        if ( typeof custCode == 'undefined'){ custCode= ''	}
	
        //$("#taxBillNo").val(taxBillNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#custCode").val(custCode);
		
       	findTaxHW("/rest/taxBillFind",page);
  	}
  	
	$("#btnTaxFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		//var taxBillNo_val = $("#taxBillNo").val(); 
		var custCode= $("#custCode").val(); 
				
		document.location.hash = '#info'+currentPage+"!"+sYmd+"!"+eYmd+"!"+custCode;
		
		findTaxHW("/rest/taxBillFind", 1);
	});
	

	createAUIGrid();
	
	/*$("#btnTaxFind").click(function() {
		findTaxHW("/rest/taxBillFind");
	});*/
	
	$("#btnSendHW").click(function() {
		sendTaxHW("/rest/taxBillSend");
	});
	$("#btnDelHW").click(function() {
		delTaxHW("/rest/taxBillDel");
	});
	$("#btnTaxDel").click(function() {
		updateDataToServer("/base/taxBillAdd");
	});
	$("#btnHw").click(function() {
		//var url = 'https://bill.office.hiworks.com/panauto.onhiworks.com/';
		var url = $("#link_url").val();
		//console.log ("url"+url);
		window.open(url, '_blank');
	});



});


window.onbeforeunload = function() {

};


// AUIGrid 를 생성합니다.
function createAUIGrid() {

	var columnLayout = [
		{
			headerText: "상태",
			children: [
				{ dataField: "appStatus", headerText: "하이웍스" },
				{ dataField: "appStatusCode", headerText: "하이웍스코드" },
				{ dataField: "docStatus", headerText: "국세청" },
				{ dataField: "docStatusCode", headerText: "국세청코드" }
			]
		}
		, {
			headerText: "세금계산서",
			children: [
				{ dataField: "taxBillNo",width: 150, headerText: "번호" , 
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
				{ dataField: "clType2", headerText: "청구구분" },
				{ dataField: "taxBillDate", headerText: "일자" },
				{ dataField: "expType", headerText: "증빙유형" }
			]
		}
		, {
			headerText: "거래처",
			children: [
				{ dataField: "custName", width: 200 ,headerText: "명칭" },
				{ dataField: "bizNo", width: 180, headerText: "사업자/주민번호" },
				{ dataField: "phone", headerText: "전화" },
				{ dataField: "taxEmail", headerText: "메일" }
			]
		}
		, {
			headerText: "금액",
			children: [
				{ dataField: "supPrice", headerText: "공급가액" , dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false },//20230710 bk
				{ dataField: "vat", headerText: "세액" , dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false },//20230710 bk
				{ dataField: "totalPrice", headerText: "합계" , dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }//20230710 bk
			]
		}
		, { dataField: "itemName", headerText: "품명" }
		, { dataField: "clType", headerText: "청구/영수" }
		, {
			headerText: "에러",
			children: [
				{ dataField: "errCode", headerText: "에러코드" },
				{ dataField: "errMsg", headerText: "에러메세지" }
			]
		}
		, { dataField: "memo", headerText: "비고" }
		, { dataField: "taxTypeName", headerText: "과세" }

		, { dataField: "regUserId", headerText: "등록자"}
		, { dataField: "created", headerText: "등록일"}
		, { dataField: "uptUserId", headerText: "수정자" }
		, { dataField: "modified", headerText: "수정일"}
	];
	// 푸터 설정 2023.07.10
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, 
	{
		dataField: "taxBillNo",
		positionField: "taxEmail",
		operation: "COUNT",
		formatString: "#,##0"
		, postfix: " 건"
		,style: "right"
	},{
		dataField: "supPrice",
		positionField: "supPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "vat",
		positionField: "vat",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "totalPrice",
		positionField: "totalPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}];

	var auiGridProps = {
		editable: false,

		usePaging: true,

		pageRowCount: 50,

		showPageRowSelect: true,

		showStateColumn: true,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		showAutoNoDataMessage : false,

		showFooter: true,

		//enableFilter: true,

		//footerRowCount: 3,

		// 기본 푸터 높이
		//footerHeight: 24,

		selectionMode: "multipleCells",
		rowIdField: "taxBillNo"
	};




	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);

	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);

	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {

		if (event.item.appStatusCode == '' || event.item.appStatusCode == null) {
			var taxBillNo = event.item.taxBillNo;
			if (event.dataField == 'taxBillNo') {
				$.fancybox.open({
					//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
					href: '/base/taxBill-up?taxBillNo=' + taxBillNo, // 불러 올 주소
					type: 'iframe',
					width: '90%',
					height: '90%',
					padding: 0,
					fitToView: false,
					autoSize: false
					, modal: true
				});
			}


		} else {
			alert("전자세금계산서로 등록되어 수정할 수 없습니다.");
		}

	});


	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}
/*
var footerLayout = [];

	footerLayout[0] = [{
		positionField: "depositNo",
		style: "my-footer-style",
		labelText: "현금합계"
	}, {
		positionField: "depositMoney", dataField: "cashM",
		operation: "SUM", formatString: "#,##0",
		
	}];
	footerLayout[1] = [{
		positionField: "depositNo",
		style: "my-footer-style",
		labelText: "카드합계"
	}, {
		positionField: "depositMoney", dataField: "cardM",
		operation: "SUM", formatString: "#,##0",
		
	}];
	footerLayout[2] = [{
		positionField: "depositNo",
		style: "my-footer-style",
		labelText: "예금합계"
	}, {
		dataField: "accM",
		operation: "SUM"
		
	}
	,{
		dataField: "cardSubM",
		operation: "SUM"
		
	}
	,{
		positionField: "depositMoney",
		dataField: "accM",
		formatString: "#,##0",
		labelFunction: function (value, columnValues, footerValues) {

			
			var newValue = footerValues[1] - footerValues[2];

			return newValue;
		}
	}];
	footerLayout[3] = [{
		positionField: "depositNo",
		style: "my-footer-style",
		labelText: "현금영수증합계"
	}, {
		positionField: "depositMoney", dataField: "cashRectM",
		operation: "SUM", formatString: "#,##0",
		
	},
	{
		positionField: "cashRectYN", dataField: "countY",
		operation: "SUM", formatString: "#,##0",postfix: " 건"
		
	}];
	footerLayout[4] = [{
		positionField: "depositNo",
		style: "my-footer-style",
		labelText: "총계"
	}, {
		positionField: "cardFee", dataField: "cardFee",
		operation: "SUM", formatString: "#,##0",
		
	},{
		positionField: "dcMoney", dataField: "dcMoney",
		operation: "SUM", formatString: "#,##0",
		
	}
	,{
		dataField: "depositMoney",
		operation: "SUM"
		
	}
	,{
		dataField: "cardSubM",
		operation: "SUM"
		
	}
	,{
		positionField: "depositMoney",
		dataField: "depositMoney",
		formatString: "#,##0",
		labelFunction: function (value, columnValues, footerValues) {

			
			var newValue = footerValues[3] - footerValues[4]

			return newValue;
		}
	}];
	*/




function findDataToServer(url, taxBillNo) {
	setStartSpinner();
	var list = [];
	var appStatus = "";
	var docStatus = "";
	var errMsg = "";
	var expType = $("#expType").val();
	var clType2 = $("#clType2").val();


	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}
	 var custCode = $("#custCode").val(); 
	var appStatus = $("#appStatus").val(); 
	//console.log ("appStatus"+appStatus);
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		async: false,
		data: {
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN,
			"taxBillNo": taxBillNo,
			"custCode": custCode,
			"appStatus": appStatus,
			"expType": expType,
			"clType2": clType2
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {
			setStopSpinner();

			if (data.taxBillList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
			} else {

				for (i = 0; i < data.taxBillList.length; i++) {

					if (data.taxBillList[i].appStatusCode == 'W') { appStatus = "승인대기" }
					else if (data.taxBillList[i].appStatusCode == "" || data.taxBillList[i].appStatusCode == null) { appStatus = "미발급" }
					else if (data.taxBillList[i].appStatusCode == "B") { appStatus = "반려" }
					else { appStatus = "승인" };

					if (data.taxBillList[i].docStatusCode == '0') { docStatus = "발송전" }
					else if (data.taxBillList[i].docStatusCode == "" || data.taxBillList[i].docStatusCode == null) { docStatus = "미등록" }
					else if (data.taxBillList[i].docStatusCode == "3" || data.taxBillList[i].docStatusCode == "5") { docStatus = "실패" }
					else if (data.taxBillList[i].docStatusCode == "4") { docStatus = "성공" }
					else { docStatus = "대기" };

					if (data.taxBillList[i].errCode == 'SUC001') { errMsg = "성공" }
					else if (data.taxBillList[i].errCode == "" || data.taxBillList[i].errCode == null) { errMsg = "" }
					else if (data.taxBillList[i].errCode == "SYN001") { errMsg = "복호화 실패" }
					else if (data.taxBillList[i].errCode == "SYN002") { errMsg = "	공급사업자, 수탁자 전자서명 오류" }
					else if (data.taxBillList[i].errCode == "SYN003") { errMsg = "승인번호 중복 오류" }
					else if (data.taxBillList[i].errCode == "SYN004") { errMsg = "전자세금계산서 스키마 오류" }

					else if (data.taxBillList[i].errCode == "ERR001") { errMsg = "공급자 사업자등록번호 오류" }
					else if (data.taxBillList[i].errCode == "ERR002") { errMsg = "공급받는(사업)자 사업자등록번호 오류" }
					else if (data.taxBillList[i].errCode == "ERR003") { errMsg = "수탁 사업자등록번호 오류" }
					else if (data.taxBillList[i].errCode == "ERR004") { errMsg = "전송일시 오류" }
					else if (data.taxBillList[i].errCode == "ERR005") { errMsg = "발행(교부) 일시 오류" }
					else if (data.taxBillList[i].errCode == "ERR006") { errMsg = "작성일자 오류" }
					else if (data.taxBillList[i].errCode == "ERR007") { errMsg = "공급가액, 세액 오류" }
					else if (data.taxBillList[i].errCode == "ERR008") { errMsg = "코드 유형 오류" }
					else if (data.taxBillList[i].errCode == "ERR009") { errMsg = "폐업사업자 발행 오류" }
					else if (data.taxBillList[i].errCode == "ERR010") { errMsg = "국세청 등록번호 오류" }
					else if (data.taxBillList[i].errCode == "ERR011") { errMsg = "당초승인번호오류" }
					else if (data.taxBillList[i].errCode == "ERR999") { errMsg = "정의되지 않은 기타오류" }

					else { errMsg = "오류" };

					list.push({
						taxBillNo: data.taxBillList[i].taxBillNo,
						taxBillDate: data.taxBillList[i].taxBillDate,
						appStatus: appStatus,
						appStatusCode: data.taxBillList[i].appStatusCode,
						docStatus: docStatus,
						docStatusCode: data.taxBillList[i].docStatusCode,



						custName: data.taxBillList[i].custName,
						bizNo: data.taxBillList[i].bizNo,
						phone: data.taxBillList[i].phone,
						taxEmail: data.taxBillList[i].taxEmail,
						address: data.taxBillList[i].address,
						ceoName: data.taxBillList[i].ceoName,
						bizType: data.taxBillList[i].bizType,

						supPrice: data.taxBillList[i].supPrice,
						vat: data.taxBillList[i].vat,
						totalPrice: data.taxBillList[i].totalPrice,

						itemName: data.taxBillList[i].itemName,
						clType: data.taxBillList[i].clType,
						memo: data.taxBillList[i].memo,
						taxTypeName: data.taxBillList[i].taxTypeName,
						taxTypeCode: data.taxBillList[i].taxTypeCode,

						errCode: data.taxBillList[i].errCode,
						errMsg: errMsg,

						regUserId: data.taxBillList[i].regUserId,
						created: data.taxBillList[i].created,
						uptUserId: data.taxBillList[i].uptUserId,
						modified: data.taxBillList[i].modified           

						,expType: data.taxBillList[i].expType
						,clType2: data.taxBillList[i].clType2
						
					});
				}



			}
		},
		error: function(x, e) {
			setStopSpinner();
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
	if (taxBillNo != '' && taxBillNo != null) {
		return list;
	} else {
		AUIGrid.setGridData("#grid_wrap", list);
	}

}

function sendTaxHW(url) {
	var data = {};
	var checkedList = [];
	
	var saveUrl = $('#url_key').val();
	var saveOfficeKey = $('#office_key').val();
	var saveAccessKey = $('#access_key').val();
	var saveBizNo = $('#bizNo').val();
	
	data.saveUrl = saveUrl;
	data.saveOfficeKey = saveOfficeKey;
	data.saveAccessKey = saveAccessKey;
	data.saveBizNo = saveBizNo;
	
	//let count =1;
	checkedList = AUIGrid.getCheckedRowItems(myGridID);

	if (checkedList.length > 0) {
		let count = 0;
		for (let i = 0; i < checkedList.length; i++) {
			if (checkedList[i].item.appStatusCode != null) {
				alert("전자세금계산서로 등록할 수 없는 세금계산서가 선택되었습니다.")
				return;
			}
		}
		
		for (let i = 0; i < checkedList.length; i++) {
			
				data.checkedList = findTaxBillList(checkedList[i].item.taxBillNo);
				
				$.ajax({
					url: url,
					dataType: "json",
					type: "POST",
					contentType: "application/json; charset=utf-8",
					//contentType: "application/x-www-form-urlencoded;charset=UTF-8",
					data: JSON.stringify(data),
					success: function(data) {
						
						if(data.result_code == "OK"){
							count++;
						}
						//if (count == checkedList.length) { alert("성공"); }
						//location.reload();
						if (count == checkedList.length) { 
							alert("성공");
							findTaxHW("/rest/taxBillFind", 1);
							// location.reload();
						 }else{
							alert("실패" +" : " + data.result_msg);
						}
						

					},
					error: function(x, e) {
						if (x.status == 0) {
							alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
						} else if (x.status == 404) {
							alert('전송하려는 데이터의 형식이 맞지 않아 등록할 수 없습니다.\n데이터를  확인하세요!!');
							//alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
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
		
	} else {
		alert('세금계산서를 선택해 주십시오.');
	}

}

function delTaxHW(url) {
	var data = {};
	var checkedList = [];
	//let count =1;
	checkedList = AUIGrid.getCheckedRowItems(myGridID);
	
	var saveUrl = $('#url_key').val();
	var saveOfficeKey = $('#office_key').val();
	var saveAccessKey = $('#access_key').val();
	var saveBizNo = $('#bizNo').val();
	
	data.saveUrl = saveUrl;
	data.saveOfficeKey = saveOfficeKey;
	data.saveAccessKey = saveAccessKey;
	data.saveBizNo = saveBizNo;

	if (checkedList.length > 0) {
		let count = 0;
		for (let i = 0; i < checkedList.length; i++) {
			if (checkedList[i].item.appStatusCode != 'W'){
				alert("미발송인 전자세금계산서만 취소할 수 있습니다.")
				return;
			}
		}
		
		
		for (let i = 0; i < checkedList.length; i++) {
			
			data.checkedList = findTaxBillList(checkedList[i].item.taxBillNo);

			$.ajax({
				url: url,
				dataType: "json",
				type: "POST",
				contentType: "application/json; charset=utf-8",
				//contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				data: JSON.stringify(data),

				success: function(data) {
					count++;
					
					//console.log ("count"+count);
					//console.log("checkedList.length"+checkedList.length);
					//if (count == checkedList.length) { alert("성공"); }
					//location.reload();
					if (count == checkedList.length) {
						 alert("성공"); 
						findTaxHW("/rest/taxBillFind", 1);
						// location.reload();
			
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

		
		
		
	} else {
		alert('세금계산서를 선택해 주십시오.');
	}

}


function findTaxBillList(num) {
	var list = [];
	var data = {};
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}

	$.ajax({
		type: "POST",
		url: "/base/taxBill-list",
		dataType: "json",
		data: {
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN,
			"taxBillNo": num
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {
			if (data.taxBillList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
			} else {
				for (let i = 0; i < data.taxBillList.length; i++) {

					//data.documentId = data.taxBillList[i].documentId;
					list = data.taxBillList;

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

function findTaxHW(url) {
	var list = findTaxBillList();

	var saveUrl = $('#url_key').val();
	var saveOfficeKey = $('#office_key').val();
	var saveAccessKey = $('#access_key').val();
	var saveBizNo = $('#bizNo').val();
	var custCode = $("#custCode").val(); 


	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=UTF-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		async:false,
		data: {
			"list": JSON.stringify(list),
			"saveUrl": saveUrl,
			"saveOfficeKey": saveOfficeKey,
			"saveAccessKey": saveAccessKey,
			"saveBizNo": saveBizNo,
			"custCode": custCode
		},

		success: function(data) {
			findDataToServer("/base/taxBill-list");

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
/*
function removeRow() {

	AUIGrid.removeRow(myGridID, "selectedIndex");

};

function updateDataToServer(url) {

	var removeList = AUIGrid.getRemovedItems(myGridID);

	var data = {};

	if (removeList.length > 0) data.taxBillDelList = removeList;
	else data.depositRemoveList = [];



	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
};
*/
function updateDataToServer(url) {

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	if (!confirm("정말 삭제하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var tbNoArr ="";
	var workingType = "DEL";
	//var reqArr = [];
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		//reqArr[i] = rowItem.item.taxBillNo;
		
		tbNoArr = tbNoArr + "^" + rowItem.item.taxBillNo
		
		/* 231121 yoonsang 삭제가능하도록 
		if (rowItem.item.appStatus != "미발급"){
			alert("전자세금계산서로 등록된 목록은 삭제할 수 없습니다.");
			return;		
		}	
		*/			
	}
	//console.log("reqArr : " + reqArr)
	var data = {};
	
	data.workingType = workingType;
	data.tbNoArr = tbNoArr;
	
	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//data: JSON.stringify(data),
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

function getTaxKey(url) {

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: {},
		async: false,  //2023.11.10 hsg
		success: function(data) {


			if (data.taxKeyLsit.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				for (i = 0; i < data.taxKeyLsit.length; i++) {

					if (data.taxKeyLsit[i].purpose3 == "URL") { $('#url_key').val(data.taxKeyLsit[i].keyVal) }
					if (data.taxKeyLsit[i].purpose3 == "OFFICE_TOKEN") { $('#office_key').val(data.taxKeyLsit[i].keyVal) }
					if (data.taxKeyLsit[i].purpose3 == "BILL_ACCESS_TOKEN") { $('#access_key').val(data.taxKeyLsit[i].keyVal) }
					if (data.taxKeyLsit[i].purpose3 == "LINK_URL") { $('#link_url').val(data.taxKeyLsit[i].keyVal) }
					
				}
				$('#bizNo').val(data.taxKeyLsit[0].bizNo);

			}

		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
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



