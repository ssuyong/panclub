
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
var myGridID1;
var myGridID2;
$(document).ready(function() {


	keyValueList1 = findSrchCode1("/base/code-list", 2);
	//keyValueList2 = findSrchCode2("/base/cust-list", 2);
	//keyValueList3 = findSrchCode3("/base/payment-list", 2);

	createAUIGrid1();
	createAUIGrid2(keyValueList1);
	
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var sYmd = info[1];
        var eYmd = info[2];
           
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
        findDataToServer1("/base/accHisMaster",page);
  	}

	$("#btnFind").click(function() {
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		
		document.location.hash = '#info'+currentPage+"!"+sYmd+"!"+eYmd;
		findDataToServer1("/base/accHisMaster", 1);
	});

});


// AUIGrid 를 생성합니다.
function createAUIGrid1() {

	var columnLayout = [
		{
			headerText: "계좌",
			children: [
				{ dataField: "payCode", headerText: "코드", width: 80 },
				{ dataField: "payName", headerText: "명칭" , width: 200 },
				{ dataField: "payNo", headerText: "계좌번호", width: 200  }
			]
		}
		, { dataField: "dpMSum", headerText: "입금총액", dataType: "numeric" ,formatString: "#,##0"  , style:"right"  }
		, { dataField: "wdMSum", headerText: "출금총액", dataType: "numeric" ,formatString: "#,##0"  , style:"right"  }


	];


	var auiGridProps = {
		editable: false,

		usePaging: true,

		pageRowCount: 20,

		selectionMode: "multipleCells",
		rowIdField: "payCode",
		showAutoNoDataMessage : false,
	};

	myGridID1 = AUIGrid.create("#grid_wrap1", columnLayout, auiGridProps);

	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID1, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});
	AUIGrid.bind(myGridID1, "cellClick", auiGridSelectionChangeHandler);

	AUIGrid.bind(myGridID1, "cellDoubleClick", function(event) {

	});

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID1, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}

function createAUIGrid2(keyValueList1) {

	var columnLayout = [
		{
			headerText: "입출목록",
			children: [
				{ dataField: "dwType", headerText: "구분", width: 60 },
				{ dataField: "dwDate", headerText: "등록일" },
				{ dataField: "dwNo", headerText: "번호" }
			]
		}
		, {
			headerText: "계정",
			children: [
				{ dataField: "accCode", headerText: "코드", width: 50 },
				{
					dataField: "accName", headerText: "명칭",
					labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
						var retStr = value;

						for (var i = 0, len = keyValueList1.length; i < len; i++) {
							if (keyValueList1[i]["code"] == value) {
								retStr = keyValueList1[i]["value"];
								break;
							}
						}
						return retStr;
					}
				}
			]
		}
		, {
			headerText: "거래처",
			children: [
				{ dataField: "custCode", headerText: "코드", width: 50 },
				{ dataField: "custName", headerText: "명칭" },
				{ dataField: "carNo", headerText: "차량번호" }
			]
		}
		, { dataField: "dpMoney", headerText: "입금액" , dataType: "numeric" ,formatString: "#,##0"  , style:"right" }
		, { dataField: "wdMoney", headerText: "출금액", dataType: "numeric" ,formatString: "#,##0"  , style:"right"  }
		, { dataField: "memo", headerText: "메모" }

	];


	var auiGridProps = {
		editable: false,

		usePaging: true,

		pageRowCount: 50,

		showPageRowSelect: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		rowIdField: "dwNo",
		showAutoNoDataMessage : false,
	};




	// 실제로 #grid_wrap 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, auiGridProps);

	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID2, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});

	AUIGrid.bind(myGridID2, "cellDoubleClick", function(event) {

	});

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID2, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}



function findDataToServer1(url, page) {
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.accHisList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {

				for (i = 0; i < data.accHisList.length; i++) {
					list.push({
						payCode: data.accHisList[i].payCode,
						payName: data.accHisList[i].payName,
						payNo: data.accHisList[i].payNo,
						dpMSum: data.accHisList[i].dpMSum,
						wdMSum: data.accHisList[i].wdMSum

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

function findSrchCode2(url, type) {
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
			var j = 0;
			if (data.custList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				for (i = 0; i < data.custList.length; i++) {
					if (type == 1) {

						custCode = data.custList[i].custCode;
						custName = data.custList[i].custName;
						$("#custCode").append("<option value='" + custCode + "' >" + custName + "</option>");


					} if (type == 2) {

						custCode = data.custList[i].custCode;
						custName = data.custList[i].custName;
						list[j] = { "code": custCode, "value": custName };
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
					if (type == 2) {
						list[j] = { "code": code, "value": codeName, "accNo": accNo };
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


var timerId = null;
function auiGridSelectionChangeHandler(event) {
	//document.getElementById("srCode").innerHTML = event.item.srCode;
	// 200ms 보다 빠르게 그리드 선택자가 변경된다면 데이터 요청 안함
	if (timerId) {
		clearTimeout(timerId);
	}

	timerId = setTimeout(function() {
		findDataToServer2("/base/accHisDetail", event.item);

	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
};

function findDataToServer2(url, item) {
	var list = [];
	var payCode = item.payCode;
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}



	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			payCode: payCode,
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.accHisList2.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
			} else {
				for (i = 0; i < data.accHisList2.length; i++) {
					list.push({
						dwType: data.accHisList2[i].dwType,
						dwDate: data.accHisList2[i].dwDate,
						dwNo: data.accHisList2[i].dwNo,
						accCode: data.accHisList2[i].accCode,
						accName: data.accHisList2[i].accName,
						custCode: data.accHisList2[i].custCode,
						custName: data.accHisList2[i].custName,
						carNo: data.accHisList2[i].carNo,
						dpMoney: data.accHisList2[i].dpMoney,
						wdMoney: data.accHisList2[i].wdMoney,
						memo: data.accHisList2[i].memo

					});

				}
			}
			AUIGrid.setGridData("#grid_wrap2", list);


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

