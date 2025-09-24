
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID1;
var myGridID_clRl;

function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function() {

	$("#supplyInfo-title").css("display", "none");
	$("#supplyInfo-input").css("display", "none");

	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);


	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();
	createAUIGrid1();

	// textarea 키업 핸들러
	$("#myTextArea").keyup(function(event) {
		var value = $(this).val();

	});
	// textarea 확인 
	$("#confirmBtn").click(function(event) {
		var value = $("#myTextArea").val();
		//console.log("value : " + value)
		forceEditngTextArea(value);
	});

	// textarea 취소
	$("#cancelBtn").click(function(event) {
		$("#textAreaWrap").hide();
	});
	
		$("#btnRegMemo").click(function() {
		//alert("저장버튼");
		updateDataToServer3("/order/clMemoAdd","DEL");
	});

	// textarea blur
	$("#myTextArea").blur(function(event) {
		var relatedTarget = event.relatedTarget || document.activeElement;
		var $relatedTarget = $(relatedTarget);

		// 확인 버튼 클릭한 경우
		if ($relatedTarget.is("#confirmBtn")) {
			return;
		} else if ($relatedTarget.is("#cancelBtn")) { // 취소 버튼
			return;
		}
		forceEditngTextArea(this.value);
	});

	// 진짜로 textarea 값을 그리드에 수정 적용시킴
	function forceEditngTextArea(value) {
		/*
		var dataField = $("#textAreaWrap").data("data-field"); // 보관한 dataField 얻기
		var rowIndex = Number($("#textAreaWrap").data("row-index")); // 보관한 rowIndex 얻기
		value = value.replace(/\r|\n|\r\n/g, "<br/>"); // 엔터를 BR태그로 변환
		//value = value.replace(/\r|\n|\r\n/g, " "); // 엔터를 공백으로 변환

		var item = {};
		item[dataField] = value;

		AUIGrid.updateRow(myGridID1, item, rowIndex);
		$("#textAreaWrap").hide();*/
		var dataField = $("#textAreaWrap").data("data-field");
		var rowIndex = Number($("#textAreaWrap").data("row-index"));
		value = value.replace(/\r|\n|\r\n/g, "<br/>"); // 엔터를 BR태그로 변환

		var item = {};
		item[dataField] = value;
		//console.log("2");
		AUIGrid.updateRow(myGridID1, item, rowIndex);
		$("#textAreaWrap").hide();
		updateDataToServer3("/order/clMemoAdd");
	};


	$("#btnReg").click(function() {
		//alert("등록버튼");
		updateDataToServer("/order/clGroupAdd", "UPT");
		
	});
	$("#btnClose").click(function() {
		
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function() {
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")) {
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});



	//요청번호가  존재하는 경우 
	//let clReqNo = $("#clReqNo").val();
	//231226 yoonsang - clReqNo안넘어오는경우발견 clGroupId으로 통일
	let clGroupId = $("#clGroupId").val();
	

	if (clGroupId != '') {
			
		findReq('/order/cl-req-list');
		findMemo('/order/cl-memo-list');
		//updateDataToServer("/order/clGroupAdd", "UPT");

	}
	
	if ($(':radio[name="clType"]:checked').val() == '일반') {
		//$("#insureInfo :input").prop("disabled", true);
		 $("#insure1Info").hide();
		 $("#insure2Info").hide();
	}else {
		//$("#insureInfo :input").prop("disabled", false);
		$("#insure1Info").show(); 
		$("#insure2Info").show(); 
	}
	
	if($("#confYN").val() === "기결" || $("#taxBillNo").val() !==""){
		$("#btnReg").prop("disabled", true);
		//$("#btnReqChk").prop("disabled", true);
		$("#btnReqChk").prop("disabled", true);
	}else{
		$("#btnReg").prop("disabled", false);
		//$("#btnReqChk").prop("disabled", false);
		$("#btnReqChk").prop("disabled", false);
	}
	
	
	document.getElementById("ins1DcDsp").disabled = true;
	document.getElementById("insure1Sum").disabled = true;
	document.getElementById("insure1CollAmt").disabled = true;
	document.getElementById("ins2DcDsp").disabled = true;
	document.getElementById("insure2Sum").disabled = true;
	document.getElementById("insure2CollAmt").disabled = true;

	document.getElementById("insure1CollDate").disabled = true;
	document.getElementById("insure2CollDate").disabled = true;

});//이거





// Master 그리드 를 생성합니다.
function createAUIGrid() {
	var centerYNList = ["외부재고", "센터"];

	// AUIGrid 칼럼 설정
	var columnLayout = [
			{ dataField: "idx", headerText: "idx", width: 50, editable: false,visible:false},
		{ dataField: "clReqNo", headerText: "요청번호", width: 100, editable: false }
		, { dataField: "reqSeq", headerText: "요청순번", width: 60, editable: false }
		, { dataField: "chkDate", headerText: "청구일", width: 100, editable: false }
		//,{ dataField : "clType",      headerText : "보험일반", width : 50, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		, { dataField: "itemId", headerText: "부품ID", width: 100, editable: false }
		, { dataField: "brandName", headerText: "제조사", width: 100, editable: false ,visible:false}
		,{ dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    }
		, {
			dataField: "itemNo", headerText: "품번*", width: 140, editable: false
			, headerTooltip: { // 헤더 툴팁 표시 HTML 양식
				show: true,
				tooltipHtml: '필수입력값입니다.'
			}
			, renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function(event) {
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");
					var dialogItem;
					dialogItem = $("#dialog-form-item").dialog({
						//autoOpen: false,
						height: 700,
						//minWidth: 500,
						width: "70%",
						modal: true,
						headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position: [400, 400],
						buttons: {
							"확인": updateGridRow,
							"취소": function(event) {
								dialogItem.dialog("close");
							}
						},
						close: function() {
							// $( "#users tbody tr td" ).empty();	   	
						}
					});
					createItemGrid(columnLayoutItem);
					dialogItem.dialog("open");
				}
			}
		}
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
		, { dataField: "itemName", headerText: "품명", width: 160, editable: true }
		//,{ dataField : "itemNameEn", 	headerText : "영문품명", width: 120, editable : false  }
		, { dataField: "cnt", headerText: "수량", width: 50, dataType: "numeric", formatString: "#,##0", style: "right", editable: true }
		//,{ dataField : "unitPrice",     headerText : "단가", width : 120, dataType: "numeric", formatString: "#,##0", style: "right", editable: true }
		, { dataField: "centerPrice", headerText: "센터가", width: 120, dataType: "numeric", formatString: "#,##0", style: "right", editable: false
				,styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) {
					if (value != item.unitPrice) {
						return "my-cell-style";
					}
					return null;
				}
		 }
		, { dataField: "unitPrice", headerText: "단가", width: 120, dataType: "numeric", formatString: "#,##0", style: "right", editable: true }
		, { dataField: "sumPrice", headerText: "합계", width: 120, dataType: "numeric", formatString: "#,##0", style: "right", editable: false }
		, {
			dataField: "centerYN2", headerText: "외부/센터", editable: true
			, renderer: {
				type: "DropDownListRenderer",
				list: centerYNList
			}
		}
		
		, { dataField: "placeCustName", headerText: "발주처명", width: 120, editable: false }
		, { dataField: "plCustName", headerText: "요청발주처명", width: 120, editable: false }
		, { dataField: "insure1DcRate", headerText: "할인율1", width: 90, dataType: "numeric", formatString: "#,##0", postfix: "%", style: "right", editable: true }
		, { dataField: "insure2DcRate", headerText: "할인율2", width: 90, dataType: "numeric", formatString: "#,##0", postfix: "%", style: "right", editable: true }

		, { dataField: "insur1Price", headerText: "청구금액1", width: 120, dataType: "numeric", formatString: "#,##0",  style: "right", editable: false }
		, { dataField: "insur2Price", headerText: "청구금액2", width: 120, dataType: "numeric",   formatString: "#,##0", style: "right", editable: false }
		, { dataField: "memo1", headerText: "비고1", editable: true }
		, { dataField: "uptUserId", headerText: "수정자", editable: false }
		, { dataField: "uptYmd", headerText: "수정시간", editable: false }
		, { dataField: "centerYN", headerText: "외부재고/로컬재고", editable: true, visible: false }
		, { dataField: "checkYN", headerText: "진행YN", editable: false }
	];

	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "singleRow",
		editable: true,
		// 상태 칼럼 사용
		//showStateColumn : true,
		rowIdField: "idx",
		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		selectionMode : "multipleCells",

		//footer 노출
		showFooter: true,

		independentAllCheckBox: true,
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,


		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.		
		/*
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.checkYN == "Y") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.checkYN == "Y") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}
		*/
	};


	var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "insur1Price",		positionField: "insur1Price",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "insur2Price",		positionField: "insur2Price",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];



	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	// 전체 체크박스 클릭 이벤트 바인딩 : 주문번호 있는 경우 제외 전체체크 시 제외되게
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
		if (event.checked) {
			// name 의 값들 얻기
			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "checkYN");
			// Anna 제거하기
			//uniqueValues.splice(uniqueValues.indexOf("Y"), 1);
			uniqueValues.splice(!uniqueValues.indexOf(""), 1);
			AUIGrid.setCheckedRowsByValue(event.pid, "checkYN", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "checkYN", []);
		}
	});
	AUIGrid.setFooter(myGridID, footerLayout);


};



// Master 그리드 를 생성합니다.
function createAUIGrid1() {

	// AUIGrid 칼럼 설정
	var columnLayout1 = [
		{ dataField: "memoYmd", headerText: "일자", width: 100, editable: false }
		, {
			dataField: "memo", headerText: "메모", width: 250, editable: true,
			renderer: {
				type: "TemplateRenderer"
			},
		}
		, { dataField: "regUserId", headerText: "작성자", editable: false }
		, { dataField: "idx", headerText: "idx", editable: false, visible: false }
	];

	var gridPros1 = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		editable: true,
		showRowCheckColumn: false,
		wordWrap: true,
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		//rowIdField: "idx",

	};


	// 실제로 #grid_wrap 에 그리드 생성
	myGridID1 = AUIGrid.create("#grid_wrap1", columnLayout1, gridPros1);

	// 에디팅 시작 이벤트 바인딩
	AUIGrid.bind(myGridID1, "cellEditBegin", function(event) {
		// 클립보드 붙여 넣기인 경우는 패스함.
		if (event.isClipboard) {
			return true;
		}
		// 커스템 에디터 출력
		createMyCustomEditRenderer(event);
		return false;// 수정 input 열지 않고 오로지 textarea 로 수정하게끔 함
	});


	// 커스텀 에디팅 렌더러 유형에 맞게 출력하기
	function createMyCustomEditRenderer(event) {

		var dataField = event.dataField;
		var $obj;
		var $textArea;
		// title, content는  TextArea 사용
		if (dataField == "memo") {
			$obj = $("#textAreaWrap").css({
				left: event.position.x - 12,
				top: event.position.y - 600,//238,   //창이 너무 밑에 생성되서 수정
				width: event.size.width - 2, // 8는 textAreaWrap 패딩값
				//height: 30
				height: event.size.height + 70
			}).show();
			$textArea = $("#myTextArea").val(String(event.value).replace(/[<]br[/][>]/gi, "\r\n"));
			
		}

		if (dataField == "memo") {

			// 데이터 필드 보관
			$obj.data("data-field", dataField);
			
			
			// 행인덱스 보관
			$obj.data("row-index", event.rowIndex);

			// 포커싱
			setTimeout(function() {
				$textArea.focus();
				$textArea.select();
			}, 16);
		}
	}

	function CSVToArray(strData, strDelimiter) {
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");

		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
		);


		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];

		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;


		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec(strData)) {

			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[1];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				strMatchedDelimiter !== strDelimiter
			) {

				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push([]);

			}

			var strMatchedValue;

			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[2]) {

				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				strMatchedValue = arrMatches[2].replace(
					new RegExp("\"\"", "g"),
					"\""
				);

			} else {

				// We found a non-quoted value.
				strMatchedValue = arrMatches[3];

			}


			// Now that we have our value string, let's add
			// it to the data array.
			arrData[arrData.length - 1].push(strMatchedValue);
		}

		// Return the parsed data.
		return (arrData);
	};


}; //이겅


function auiCellEditingHandler(event) {

	if (event.dataField == 'itemNo') {
		setStartSpinner();
		$("#srchEqualItemNo").val(event.value);
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		addRow(myGridID, 'last');  //부품찾은 후 행추가

		findItem('/base/item-list', 0, event.rowIndex, '', 'N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
		setStopSpinner();

	}
	if (event.dataField == 'cnt' || event.dataField == 'unitPrice') {
		var sumPrice = event.item.cnt * event.item.unitPrice;
		AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);
		if ($(':radio[name="clType"]:checked').val() == '보험') {
		var insur1Price = sumPrice * (1 - event.item.insure1DcRate / 100);
		var insur2Price = sumPrice * (1 - event.item.insure2DcRate / 100);
		AUIGrid.updateRow(myGridID, { "insur1Price": insur1Price }, event.rowIndex);
		AUIGrid.updateRow(myGridID, { "insur2Price": insur2Price }, event.rowIndex);
			
		}
	}
	if ($(':radio[name="clType"]:checked').val() == '보험' && event.dataField == 'insure1DcRate') {
		var insur1Price = (1 - event.item.insure1DcRate / 100) * event.item.sumPrice;
		AUIGrid.updateRow(myGridID, { "insur1Price": insur1Price }, event.rowIndex);
	}
	if ($(':radio[name="clType"]:checked').val() == '보험' && event.dataField == 'insure2DcRate') {
		var insur2Price = (1 - event.item.insure2DcRate / 100) * event.item.sumPrice
		AUIGrid.updateRow(myGridID, { "insur2Price": insur2Price }, event.rowIndex);
	}
	
	if ($(':radio[name="clType"]:checked').val() == '보험' && event.dataField == 'centerYN2') {
		if(event.item.centerYN2 == '외부재고' && $(':radio[name="clType"]:checked').val() == '보험'){
			var insur1Price = (1 - $("#ins1DcWS").val() / 100) * event.item.sumPrice
			var insur2Price = (1 - $("#ins2DcWS").val() / 100) * event.item.sumPrice
			AUIGrid.updateRow(myGridID, { "insure1DcRate": $("#ins1DcWS").val() }, event.rowIndex);
			AUIGrid.updateRow(myGridID, { "insure2DcRate": $("#ins2DcWS").val() }, event.rowIndex);
			AUIGrid.updateRow(myGridID, { "insur1Price": insur1Price }, event.rowIndex);
			AUIGrid.updateRow(myGridID, { "insur2Price": insur2Price }, event.rowIndex);			
		}else if(event.item.centerYN2 == '센터' && $(':radio[name="clType"]:checked').val() == '보험'){
			var insur1Price = (1 - $("#ins1DcLC").val() / 100) * event.item.sumPrice
			var insur2Price = (1 - $("#ins2DcLC").val() / 100) * event.item.sumPrice
			AUIGrid.updateRow(myGridID, { "insure1DcRate": $("#ins1DcLC").val() }, event.rowIndex);
			AUIGrid.updateRow(myGridID, { "insure2DcRate": $("#ins2DcLC").val() }, event.rowIndex);
			AUIGrid.updateRow(myGridID, { "insur1Price": insur1Price }, event.rowIndex);
			AUIGrid.updateRow(myGridID, { "insur2Price": insur2Price }, event.rowIndex);
		}
	}

	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
		if (event.item.centerYN2 == '외부재고') {
			item = {
				centerYN: 'N'
			}
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		}else if (event.item.centerYN2 == '센터') {
			item = {
				centerYN: 'Y'
				
			}
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		};



	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}

};


//메모 업데이트
function updateDataToServer3(url, workingType) {
	//console.log("3");
	//var memo = $("#memo").val(); 
	var clGroupId = $("#clGroupId").val();
	//clGroupId

	var addList = AUIGrid.getAddedRowItems(myGridID1);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID1);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID1);

    var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	
	var data = {};

	if (addList.length > 0) data.clMemoAdd = addList;
	else data.clMemoAdd = [];

	if (updateList.length > 0) data.clMemoUpdate = updateList;
	else data.clMemoUpdate = [];

	if (removeList.length > 0) data.clMemoRemove = removeList;
	else data.clMemoRemove = [];

	data.workingType = workingType;
	data.clGroupId = clGroupId;
    data.dataComCode = dataComCode  //2023.07.20

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),

		success: function(data) {
			//alert("성공:"+data.success);
			alert(data.result_code + ":" + data.result_msg);
			//$("#dialog-form-RItem").dialog("close");
			//$("#dialog-form-item").dialog("close");
			var idx = data.idx;
			var regYmd = data.regYmd;
			var regUserId = data.regUserId;

			item = {
				idx: idx,
				memoYmd: regYmd,
				regUserId: regUserId
			};
			AUIGrid.updateRow(myGridID1, item, "selectedIndex");
			location.reload();


		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};




//메모 조회
function findMemo(url) {
	var clGroupId = $("#clGroupId").val();
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST",
			"clGroupId": clGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.clMemoList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				for (i = 0; i < data.clMemoList.length; i++) {
					//console.log ("data adfadf"+ JSON.stringify(data));
					list.push({
						idx: data.clMemoList[i].idx
						, memo: data.clMemoList[i].memo
						, regUserId: data.clMemoList[i].regUserId
						, memoYmd: data.clMemoList[i].regYmd
						, regHms: data.clMemoList[i].regHms
						, uptUserId: data.clMemoList[i].uptUserId
						, uptYmd: data.clMemoList[i].uptYmd

					});
				}
			}
			//console.log ("data adfadf lllllllll"+ list);
			//AUIGrid.setGridData("#grid_wrap1", list);		
			AUIGrid.setGridData("#grid_wrap1", list);
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





// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;




// 마스터 조회
function findReq(url) {
	var clReqNo = $("#clReqNo").val();
	var clGroupId = $("#clGroupId").val();
	
	//return;
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST",
			"clGroupId": clGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			if (data.reqList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				
				var insure1Sum = 0;
				var insure2Sum = 0;
				var salePrice2 = 0;
				var taxPrice2 = 0;
				var sumPrice2 = 0;
				var clAmt2 = 0;
				var depositDate = '';
				
				let insure1Sum2 = 0;
				let insure2Sum2 = 0;
				let accRate1;
				let accRate2;
				
				
				for (i = 0; i < data.reqList.length; i++) {			
				
					clGroupId = data.reqList[i].clGroupId;
					//clReqNo = data.reqList[i].clReqNo;
					clType = data.reqList[i].clType;
					memo = data.reqList[i].memo;
					regYmd = data.reqList[i].regYmd;
					orderGroupId = data.reqList[i].orderGroupId;
					//procStep = data.reqList[i].procStep;
					insure1Name = data.reqList[i].insure1Name;
					insure2Name = data.reqList[i].insure2Name;

					orderTypeName = data.reqList[i].orderTypeName;
					regUserName = data.reqList[i].regUserName;
					orderYmd = data.reqList[i].orderYmd;
					carNo = data.reqList[i].carNo;
					vinNo = data.reqList[i].vinNo;
					makerCode = data.reqList[i].makerCode;
					carType = data.reqList[i].carType;

					custName = data.reqList[i].custName;
					insure1Code = data.reqList[i].insure1Code;
					insure1Name = data.reqList[i].insure1Name;
					insure1AcceptNo = data.reqList[i].insure1AcceptNo;
					insure1AcciRate = data.reqList[i].insure1AcciRate;
					insure2Code = data.reqList[i].insure2Code;
					insure2Name = data.reqList[i].insure2Name;
					insure2AcceptNo = data.reqList[i].insure2AcceptNo;
					insure2AcciRate = data.reqList[i].insure2AcciRate;
					primeAmt = data.reqList[i].primeAmt;
					saleAmt = data.reqList[i].saleAmt;
					clAmt = data.reqList[i].clAmt;
					chkDate = data.reqList[i].chkDate2;

					insure1ＭgrName = data.reqList[i].insure1ＭgrName;
					insure1ＭgrPhone = data.reqList[i].insure1ＭgrPhone;
					insure2ＭgrPhone = data.reqList[i].insure2ＭgrPhone;
					insure2ＭgrName = data.reqList[i].insure2ＭgrName;

					insure1MgrFax = data.reqList[i].insure1MgrFax;
					insure2MgrFax = data.reqList[i].insure2MgrFax;

					clType = data.reqList[i].clType;

					ins1DcDsp = data.reqList[i].ins1DcDsp;
					ins2DcDsp = data.reqList[i].ins2DcDsp;
					
					ins1DcLC = data.reqList[i].ins1DcLC;
					ins1DcWS = data.reqList[i].ins1DcWS;
					ins2DcLC = data.reqList[i].ins2DcLC;
					ins2DcWS = data.reqList[i].ins2DcWS;

					//chkDate = data.reqList[i].chkDate;
					centerAmt = data.reqList[i].centerAmt;
					
					salePrice =  data.reqList[i].salePrice;
					taxPrice =  data.reqList[i].taxPrice;
					insure1ClAmt =  data.reqList[i].insure1ClAmt;
					insure2ClAmt =  data.reqList[i].insure2ClAmt;
					
					
					insure1Sum = parseFloat(data.reqList[i].insure1ClAmt).toLocaleString(undefined, { maximumFractionDigits: 0 });
					insure2Sum = parseFloat(data.reqList[i].insure2ClAmt).toLocaleString(undefined, { maximumFractionDigits: 0 });
					salePrice2 = parseFloat(data.reqList[i].salePrice).toLocaleString(undefined, { maximumFractionDigits: 0 });
					taxPrice2 = parseFloat(data.reqList[i].taxPrice).toLocaleString(undefined, { maximumFractionDigits: 0 });
					sumPrice2 = parseFloat(data.reqList[i].salePrice + data.reqList[i].taxPrice).toLocaleString(undefined, { maximumFractionDigits: 0 });
					clAmt2 = parseFloat(data.reqList[i].clAmt).toLocaleString(undefined, { maximumFractionDigits: 0 });
					
					//procStep =  data.reqList[i].procStep;
					
					oriClGroupId = data.reqList[i].oriClGroupId;
					
					confYN = data.reqList[i].confYN;
					
					taxBillNo = data.reqList[i].taxBillNo;
					expType = data.reqList[i].expType;
					
					insure1CollAmt= parseFloat(data.reqList[i].insure1CollAmt).toLocaleString(undefined, { maximumFractionDigits: 0 });
					insure2CollAmt= parseFloat(data.reqList[i].insure2CollAmt).toLocaleString(undefined, { maximumFractionDigits: 0 });
					collectAmt= parseFloat(data.reqList[i].collectAmt).toLocaleString(undefined, { maximumFractionDigits: 0 });
					capitalAmt= parseFloat(data.reqList[i].capitalAmt).toLocaleString(undefined, { maximumFractionDigits: 0 });					
					
					insure1CollDate = data.reqList[i].insure1CollDate;
					insure2CollDate = data.reqList[i].insure2CollDate;
					capitalDate = data.reqList[i].capitalDate;
					depositDate= data.reqList[i].depositDate;
					memo= data.reqList[i].memo;
					pMemo2= data.reqList[i].pMemo2;  //20231227
					
					if(data.reqList[i].insure1AcciRate == 0){
						accRate1 = 1;
					}else{
						accRate1 = data.reqList[i].insure1AcciRate
					}
					if(data.reqList[i].insure2AcciRate == 0){
						accRate2 = 1;
					}else{
						accRate2 = data.reqList[i].insure2AcciRate
					}
					
					insure1Sum2 = parseFloat((data.reqList[i].insure1ClAmt*100)/accRate1).toLocaleString(undefined, { maximumFractionDigits: 0 });
					insure2Sum2 = parseFloat((data.reqList[i].insure2ClAmt*100)/accRate2).toLocaleString(undefined, { maximumFractionDigits: 0 });
			
					if (clType == '보험') {
						$('input:radio[name="clType"][value="보험"]').prop('checked', true);
					} else {
						$('input:radio[name="clType"][value="일반"]').prop('checked', true);
						// $("#insureInfo").hide();
					}
					
					if (data.reqList[i].clReqType == '즉시청구') {
						 $('input:radio[name="clReqType"][value="즉시청구"]').prop('checked', true);
					} else {
					 	 $('input:radio[name="clReqType"][value="청구대기"]').prop('checked', true);
					} 

					if ((data.reqList[i].collectAmt) !== 0 && (data.reqList[i].clAmt) !== 0) { //만약 입금액 또는 청구금액이 0이 아닐경우 입금률 계산 
					    depositRate = ((data.reqList[i].collectAmt)/(data.reqList[i].clAmt)*100).toFixed(2) + '%' //입금액 / 청구금액 2023.08.28
					} else {
					    depositRate ='';  
					}


					$("#clGroupId").val(clGroupId);
					//$("#clReqNo").val(clReqNo);
					//$("#clType").val(clType); 
					//$("#memo").val(memo); 
					$("#regYmd").val(regYmd);
					$("#orderGroupId").val(orderGroupId);
					//$("#procStep").val(procStep);
					$("#insure1Name").val(insure1Name);
					$("#insure2Name").val(insure2Name);

					//$("#orderTypeName").val(orderTypeName);  
					$("#carNo").val(carNo);
					$("#vinNo").val(vinNo);
					$("#makerName_carType").val(makerCode + ' ' + carType);
					$("#orderYmd").val(orderYmd);
					$("#regUserName").val(regUserName);

					$("#saleCustName").val(custName);
					$("#insure1Name").val(insure1Name);
					$("#insure1AcceptNo").val(insure1AcceptNo);
					$("#insure1AcciRate").val(insure1AcciRate);
					$("#insure2Name").val(insure2Name);
					$("#insure2AcceptNo").val(insure2AcceptNo);
					$("#insure2AcciRate").val(insure2AcciRate);
					//$("#primeAmt").val(primeAmt);	
					//$("#saleAmt").val(saleAmt);	
					//$("#clAmt").val(clAmt);	
					//$("#chkDate").val(chkDate);	

					$("#insure1MgrName").val(insure1ＭgrName);
					$("#insure1MgrPhone").val(insure1ＭgrPhone);
					$("#insure2MgrName").val(insure2ＭgrName);
					$("#insure2MgrPhone").val(insure2ＭgrPhone);


					$("#insure1Code").val(insure1Code);
					$("#insure2Code").val(insure2Code);

					$("#insure1MgrFax").val(insure1MgrFax);
					$("#insure2MgrFax").val(insure2MgrFax);

					$("#ins1DcDsp").val(ins1DcDsp);
					$("#ins2DcDsp").val(ins2DcDsp);

					$("#ins1DcLC").val(ins1DcLC);
					$("#ins1DcWS").val(ins1DcWS);
					$("#ins2DcLC").val(ins2DcLC);
					$("#ins2DcWS").val(ins2DcWS);

					//$("#clYmd").val(clYmd);
					//$("#centerAmt").val(centerAmt);
					
					$("#insure1Sum").val(insure1Sum);
					$("#insure2Sum").val(insure2Sum);
					$("#insure1Sum2").val(insure1Sum2);
					$("#insure2Sum2").val(insure2Sum2);
					$("#salePrice").val(salePrice2);
					$("#taxPrice").val(taxPrice2);
					$("#sumPrice").val(sumPrice2);
					$("#clAmt").val(clAmt2);
					
					if(clAmt2 == 'NaN'){$("#clAmt").val(sumPrice2)}
					else($("#clAmt").val(clAmt2))
					
					$("#chkDate").val(chkDate);
					
					$("#oriClGroupId").val(oriClGroupId);
					
					$("#oriClGroupId").val(oriClGroupId);
					
					$("#insure1CollAmt").val(insure1CollAmt);
					$("#insure2CollAmt").val(insure2CollAmt);
					$("#collectAmt").val(collectAmt);
					$("#capitalAmt").val(capitalAmt);
					
					if(confYN == "Y"){$("#confYN").val("기결");}
					else{$("#confYN").val("미결");}
					
					$("#taxBillNo").val(taxBillNo);
					$("#expType").val(expType);
					
					$("#dataComCode").val(data.reqList[i].comCode);  //2023.07.20 by dataCheck
					
					$("#insure1CollDate").val(insure1CollDate); //2023.07.31 입금일자
					$("#insure2CollDate").val(insure2CollDate);
					$("#depositDate").val(depositDate);
					$("#memo").val(memo);//2023.08.08 메모
					$("#pMemo2").val(pMemo2);//20231227
					$("#depositRate").val(depositRate);//2023.08.28 입금률
					
				}
				findReqItem('/order/cl-req-item-list');
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



//요청 품목 조회
function findReqItem(url) {
	var list = [];
	//var clReqNo = $("#clReqNo").val();
	var clGroupId = $("#clGroupId").val();
	var centerYN2 = '';
	var insur1SumPrice = 0;
	var insur2SumPrice = 0;
	var salePrice = 0;

	


	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"clGroupId": clGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			
			if (data.reqItemList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				var checkClAmt = true;

				for (i = 0; i < data.reqItemList.length; i++) {
					if (data.reqItemList[i].centerYN == "Y") {
						centerYN2 = '센터'
					} else {
						centerYN2 = '외부재고'
					}
					insur1SumPrice = insur1SumPrice + data.reqItemList[i].insure1ClPrice;
					insur2SumPrice = insur2SumPrice + data.reqItemList[i].insure2ClPrice;
					salePrice = salePrice + data.reqItemList[i].cnt * data.reqItemList[i].unitPrice
					
					if(data.reqItemList[i].insure1ClPrice == 0 || data.reqItemList[i].insure2ClPrice == 0){
						checkClAmt = false;
					}
					
					list.push({
						idx: i,
						clReqNo: data.reqItemList[i].clReqNo
						, reqSeq: data.reqItemList[i].reqSeq
						, clType: data.reqItemList[i].clType
						, itemId: data.reqItemList[i].itemId
						, itemNo: data.reqItemList[i].itemNo
						, itemName: data.reqItemList[i].itemName
						//	,itemNameEn: data.reqItemList[i].itemNameEn 
						, cnt: data.reqItemList[i].cnt
						, unitPrice: data.reqItemList[i].unitPrice
						, centerPrice: data.reqItemList[i].centerPrice
						, sumPrice: data.reqItemList[i].cnt * data.reqItemList[i].unitPrice
						, memo1: data.reqItemList[i].memo1
						, plCustCode: data.reqItemList[i].plCustCode
						, plCustName: data.reqItemList[i].plCustName
						, orderGroupId: data.reqItemList[i].orderGroupId
						, orderNo: data.reqItemList[i].orderNo
						, orderSeq: data.reqItemList[i].orderSeq
						, uptUserId: data.reqItemList[i].uptUserId
						, uptYmd: data.reqItemList[i].uptYmd
						, placeCustName: data.reqItemList[i].placeCustName
						, centerYN: data.reqItemList[i].centerYN
						, centerYN2: centerYN2

						, insure1DcRate: data.reqItemList[i].insure1DcRate
						, insure2DcRate: data.reqItemList[i].insure2DcRate

						//, insur1Price: (1 - data.reqItemList[i].insure1DcRate / 100) * data.reqItemList[i].unitPrice * data.reqItemList[i].cnt
						//, insur2Price: (1 - data.reqItemList[i].insure2DcRate / 100) * data.reqItemList[i].unitPrice * data.reqItemList[i].cnt
						, insur1Price: data.reqItemList[i].insure1ClPrice
						, insur2Price: data.reqItemList[i].insure2ClPrice
	
						, chkDate: data.reqItemList[i].chkDate2
						, checkYN: data.reqItemList[i].checkYN
						, brandName: data.reqItemList[i].brandName
						
						, makerName: data.reqItemList[i].makerName
						, className: data.reqItemList[i].className
						, factoryNo: data.reqItemList[i].factoryNo

					});
				}
				AUIGrid.setGridData("#grid_wrap", list);
				if(checkClAmt == false){
					alert('청구금액이 0원인 목록이 존재합니다. 확인바랍니다.');
				}
				
				/*
				$("#insure1Sum").val(_cf_comma(Math.floor(insur1SumPrice * 1.1 * $("#insure1AcciRate").val() / 100)));
				$("#insure2Sum").val(_cf_comma(Math.floor(insur2SumPrice * 1.1 * $("#insure2AcciRate").val() / 100)));
				$("#salePrice").val(_cf_comma(Math.floor(salePrice)));
				$("#taxPrice").val(_cf_comma(Math.floor(salePrice * 0.1)));
				$("#sumPrice").val(_cf_comma(Math.floor(salePrice * 1.1)));
				$("#clAmt").val(_cf_comma(Math.floor(insur1SumPrice * 1.1 * $("#insure1AcciRate").val() / 100 + insur2SumPrice * 1.1 * $("#insure2AcciRate").val() / 100)));
				*/

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


// 출고처리
function rlProc(url) {

	var orderGroupId = $('#orderGroupId').val();
	var storageCode = "";
	var custCode = "";

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var reqArr = "";
	var seqArr = "";
	var scdArr = "";   // 창고코드배열 
	var cntArr
	var mm1Arr = "";
	var mm2Arr = "";

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];

		rlReqNo = rowItem.item.rlReqNo;
		rlSeq = rowItem.item.reqSeq;
		storageCode = rowItem.item.storageCode;
		rlCnt = rowItem.item.rlCnt;
		memo1 = rowItem.item.memo1;
		memo2 = rowItem.item.memo2;

		if (typeof rlReqNo == 'undefined' || rlReqNo == null) { rlReqNo = ""; }
		if (typeof rlSeq == 'undefined' || rlSeq == null) { rlSeq = ""; }
		if (typeof storageCode == 'undefined' || storageCode == null) { storageCode = ""; }
		if (typeof rlCnt == 'undefined' || rlCnt == null) { rlCnt = ""; }
		if (typeof memo1 == 'undefined' || memo1 == null) { memo1 = ""; }
		if (typeof memo2 == 'undefined' || memo2 == null) { memo2 = ""; }

		if (i == 0) {
			reqArr = rlReqNo;
			seqArr = rlSeq;
			scdArr = storageCode;
			cntArr = rlCnt;
			mm1Arr = memo1;
			mm2Arr = memo2;
		} else {
			reqArr = reqArr + "^" + rlReqNo;
			seqArr = seqArr + "^" + rlSeq;
			scdArr = scdArr + "^" + storageCode;
			cntArr = cntArr + "^" + rlCnt;
			mm1Arr = mm1Arr + "^" + memo1;
			mm2Arr = mm2Arr + "^" + memo2;
		}

	}

	var data = {};
	data.workingType = "ADD";
	//master
	data.orderGroupId = orderGroupId;
	data.storageCode = storageCode;
	data.custCode = custCode;

	//sub
	data.reqArr = reqArr;    //번호
	data.seqArr = seqArr;    //순번
	data.scdArr = scdArr;    //창고코드
	data.cntArr = cntArr;
	data.mm1Arr = mm1Arr;    //메모1코드
	data.mm2Arr = mm2Arr;    //메모2코드
	
	

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: {
			"workingType": "ADD",
			"orderGroupId": orderGroupId,
			"storageCode": storageCode,
			"custCode": custCode,

			"reqNoArr": reqArr,    //번호
			"reqSeqArr": seqArr,    //순번
			"storCdArr": scdArr,    //    			
			"rlCntArr": cntArr,    //
			"memo1Arr": mm1Arr,    //
			"memo2Arr": mm2Arr,    //
		},
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
}

// 요청취소
function reqChk(url) {
	var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var reqArr = "";
	var rseArr = "";
	
	var workingType=""
	
	var clGroupId = $("#clGroupId").val();
	/*
	if($("#oriClGroupId").val() !="" && ($("#oriClGroupId").val() != null)){
		
		if (!confirm("관련된 추가 청구요청이 전부 취소됩니다.\n요청취소하시겠습니까?")) { return; }
		else {workingType="CANCEL_ALL";}
		
	}else{
		workingType="CANCEL"
	}
	*/
	var workingType="CANCEL"
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		if (i == 0) {
			reqArr = rowItem.item.clReqNo;
			rseArr = rowItem.item.reqSeq;
		} else {
			reqArr = reqArr + "^" + rowItem.item.clReqNo;
			rseArr = rseArr + "^" + rowItem.item.reqSeq;
		}
	}
	reqArr = reqArr + "^";
	rseArr = rseArr + "^";

	var data = {};
	//data.workingType = "CHK";
	data.workingType = workingType;

	//sub
	data.reqArr = reqArr;   //요천번호 
	data.rseArr = rseArr;    //요청순번
	data.clGroupId = clGroupId;    //청구그룹아이디

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: {
			"workingType": workingType,
			"reqArr": reqArr,   //요천번호 
			"rseArr": rseArr,    //요청순번
			"clGroupId": clGroupId
			,"dataComCode" : dataComCode  //2023.07.20 			
		},
		success: function(data) {
			alert(data.result_code + ":" + data.result_msg);
			//창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});
}

function addRow1(grid, rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID1, item, rowPos);
};
function removeRow1() {

	alert("행삭제 버튼을 누른 후 확인을 눌러야 저장이 됩니다.");
	AUIGrid.removeRow(myGridID1, "selectedIndex");
};

function addRow(grid, rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID, item, rowPos);
};
function removeRow() {

	AUIGrid.removeRow(myGridID, "selectedIndex");
};


// 데이터 서버로 보내기
function updateDataToServer(url, workingType) {
	
	var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}

	var clGroupId = $("#clGroupId").val();
	var orderGroupId = $("#orderGroupId").val();
	var clReqNo = $("#clReqNo").val();

	var insure1Code = $("#insure1Code").val();
	var insure1MgrName = $("#insure1MgrName").val();
	var insure1MgrPhone = $("#insure1MgrPhone").val();
	var insure2Code = $("#insure2Code").val();
	var insure2MgrName = $("#insure2MgrName").val();
	var insure2MgrPhone = $("#insure2MgrPhone").val();
	var insure1Fax = $("#insure1MgrFax").val();
	var insure2Fax = $("#insure2MgrFax").val();

	var insure1AcceptNo = $("#insure1AcceptNo").val();
	var insure1AcciRate = $("#insure1AcciRate").val();
	var insure2AcceptNo = $("#insure2AcceptNo").val();
	var insure2AcciRate = $("#insure2AcciRate").val();

	var saleAmt = $("#salePrice").val();
	var taxAmt = $("#taxPrice").val();
	var sumAmt = $("#sumPrice").val();

	var insure1ClAmt = $("#insure1Sum").val();
	var insure2ClAmt = $("#insure2Sum").val();
	
	var clType = $('input[name="clType"]:checked').val();
	var clReqType = $('input[name="clReqType"]:checked').val();
	
	var ins1DcLC = $("#ins1DcLC").val();
	var ins1DcWS = $("#ins1DcWS").val();
	var ins2DcLC = $("#ins2DcLC").val();
	var ins2DcWS = $("#ins2DcWS").val();
	
	var clReqNo = $("#clReqNoNew").val();
	var memo = $("#memo").val();
	
	var pMemo2 = $("#pMemo2").val(); //231227 yoonsang 보험사2인쇄시메모 추가	
	
	var expType = $("#expType").val(); //231122 yoonsang
	
	var addList = AUIGrid.getAddedRowItems(myGridID);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);

	//var allList = AUIGrid.getGridData(myGridID);
	

	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemId", "unitPrice", "cnt", "centerYN2"], "품번, 수량, 단가 ,외부/센터구분 필드는 반드시 유효한 값을 입력해야 합니다.");

	if (isValidChanged1 == false) {
		//document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();
		return;
	}
	var data = {};

	if (addList.length > 0) data.clReqItemAdd = addList;
	else data.clReqItemAdd = [];

	if (updateList.length > 0) data.clReqItemUpdate = updateList;
	else data.clReqItemUpdate = [];


	if (removeList.length > 0) data.clReqItemRemove = removeList;
	else data.clReqItemRemove = [];
	/*
	if (allList.length > 0) data.clReqItemAll = allList;
	else data.clReqItemAll = [];
	*/

	data.workingType = workingType;
	data.clGroupId = clGroupId;
	data.orderGroupId = orderGroupId;
	data.clReqNo = clReqNo;
	data.insure1Code = insure1Code;
	data.insure1MgrName = insure1MgrName;
	data.insure1MgrPhone = insure1MgrPhone;
	data.insure2Code = insure2Code;


	data.insure2MgrName = insure2MgrName;
	data.insure2MgrPhone = insure2MgrPhone;
	data.insure1Fax = insure1Fax;
	data.insure2Fax = insure2Fax;

	data.insure1AcceptNo = insure1AcceptNo;
	data.insure1AcciRate = insure1AcciRate;
	data.insure2AcceptNo = insure2AcceptNo;
	data.insure2AcciRate = insure2AcciRate;

	saleAmt = saleAmt.replace(/,/gi, "")
	taxAmt = taxAmt.replace(/,/gi, "")
	sumAmt = sumAmt.replace(/,/gi, "")
	insure1ClAmt = insure1ClAmt.replace(/,/gi, "")
	insure2ClAmt = insure2ClAmt.replace(/,/gi, "")

	data.saleAmt = Number(saleAmt);
	data.taxAmt = Number(taxAmt);
	data.sumAmt = Number(sumAmt);
	data.insure1ClAmt = Number(insure1ClAmt);
	data.insure2ClAmt = Number(insure2ClAmt);
	
	data.clType = clType;
	data.ins1DcLC = ins1DcLC;
	data.ins1DcWS = ins1DcWS;
	data.ins2DcLC = ins2DcLC;
	data.ins2DcWS = ins2DcWS;
	
	data.clReqType = clReqType;
	
	data.dataComCode = dataComCode; //2023.07.20
	data.memo = memo;  //2023.08.08
    
	data.pMemo2 = pMemo2;  //20231227
	
	data.expType = expType;  //20231122
	 
	//sub
	/*
	data.append("clArr", clArr);
	data.append("clSeqArr", clSeqArr);
	data.append("mm1Arr", mm1Arr);
	data.append("itemArr", itemArr);
	data.append("cntArr", cntArr);
	data.append("unitPriceArr", unitPriceArr);
	data.append("centerYNArr", centerYNArr);
	data.append("idr1Arr", idr1Arr);
	data.append("idr2Arr", idr2Arr);
	*/

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			$("#clReqNoNew").val(data.clReqNoNew);
			
			alert(data.result_code + ":" + data.result_msg);
			//parent.jQuery.fancybox.close();
			location.reload();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
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

	if (addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for (i = 0, len = addedRowItems.length; i < len; i++) {
			rowItem = addedRowItems[i]; // 행아이템
			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	if (editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for (i = 0, len = editedRowItems.length; i < len; i++) {
			rowItem = editedRowItems[i]; // 행아이템

			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}

	if (removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for (i = 0, len = removedRowItems.length; i < len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for (var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";
			}
			str += "\r\n";
		}
	}


	// 하단에 정보 출력.
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length);


	if (str == "")
		str = "변경 사항 없음";

	alert(str);
}


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj, name, gridYN) {

	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
	rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;

	if (gridYN == 'Y') {
		item = {
			placeCustCode: rowItem.custCode,
			placeCustName: rowItem.custName,
		};
		
		AUIGrid.updateRow(myGridID, item, "selectedIndex");
	} else {
		$(obj).val(rowItem.custCode);
		$("#" + name + "").val(rowItem.custName);
	}

	var dialogCust;
	dialogCust = $("#dialog-form-cust");
	dialogCust.dialog("close");
}


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCustMgr(obj, name) {

	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCustMgr);
	rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;

	
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	$(obj).val(rowItem.name);
	$("#" + name + "").val(rowItem.phone1);
	

	var dialogCustMgr;
	dialogCustMgr = $("#dialog-form-custMgr");
	dialogCustMgr.dialog("close");

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


//보험청구 AOS엑셀양식 Down
// 할인율 미포함 다운 
function aosXls() {
	var insureName = "";
	//var insure2Name = $("#insure1Name").text();
	//var paymethod= $(':radio[name="paymentType"]:checked').val();  
	//보험사1 or 보험사2
	var rdoInsure = $(':radio[name="rdoInsure"]:checked').val();
	if (rdoInsure == 'insure1') {
		insureName = $("#insure1Name").val();
	} else {
		insureName = $("#insure2Name").val();
	}
	
	  
	  

	var aosType = "";
	if (insureName.indexOf("삼성") != -1) {
		aosType = 'ssf'; //삼성화재
	} else {
		aosType = 'std'; //삼성화재 제외 나머지
	}
	
	//var clReqNo = $("#clReqNo").val();
	var clGroupId = $("#clGroupId").val(); 
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var reqArr = "";
	var seqArr = "";
	
	//var printDcYN = $('input[name="printDcYN"]:checked').val();
	var dcYN = "";
	dcYN = "N"	
	//부분인쇄 추가 
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			clReqNo = rowItem.item.clReqNo;
			reqSeq = rowItem.item.reqSeq;
			if (typeof clReqNo == 'undefined' || clReqNo == null) { clReqNo = ""; }
			if (typeof reqSeq == 'undefined' || reqSeq == null) { reqSeq = ""; }
			if (i == 0) {
				reqArr = clReqNo;
				seqArr = reqSeq;
			} else {
				reqArr = reqArr + "^" + clReqNo;
				seqArr = seqArr + "^" + reqSeq;
			}	
		}	
	//console.log ("reqArr :"+reqArr);
	//console.log ("seqArr :"+seqArr);
	//return;
	document.location.href = "/order/aosXls?clGroupId=" + clGroupId + "&aosType=" + aosType + "&insureName=" + insureName
															+ "&rdoInsure=" + rdoInsure +"&reqArr=" + encodeURIComponent(reqArr)  + "&seqArr=" + encodeURIComponent(seqArr)
															+ "&dcYN=" + dcYN;

}

function openRegItemDialog() {


	$("#dialog-form-RItem").dialog({
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

	formClear1();
	$("#dialog-form-RItem").dialog("open");
	$("#itemNoReg").val($("#pop_itemNo").val());
	findSrchCode("/base/code-list");


}

$("#btnCloseItemDialog").click(function() {
	//formClear1();
	$("#dialog-form-RItem").dialog("close");
	
});

$("#btnRegItemDialog").click(function() {
	updateDataToServer2("/base/itemAdd", "ADD");
	
	
	
});

function findSrchCode(url) {
	var list = [];
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			mCode : "1000"
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.codeList.length == 0){
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			}else{
				//$("#makerCode").append("<option  value='' >---</option>");
				for(i=0;i<data.codeList.length;i++){
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName; 
					$("#makerCodeReg").append("<option value='"+code+"' >"+code+" : "+codeName+"</option>");
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


function updateDataToServer2( url, workingType ) {
	//console.log("hi");
    var makerCode = $("#makerCodeReg").val(); 
    var itemNo = $("#itemNoReg").val(); 
    var factoryNo = $("#factoryNoReg").val(); 
    var carType = $("#carTypeReg").val(); 
    
    var itemName = $("#itemNameReg").val(); 
    var itemNameEn = $("#itemNameEnReg").val(); 
    
    var classCode = $("#classCodeReg").val(); 
    
    var centerPrice = $("#centerPriceReg").val(); 
    var inPrice = $("#inPriceReg").val(); 
    var salePrice = $("#salePriceReg").val(); 
    
   
    //필수값 체크
    if (classCode == '') {	alert("클래스는 필수 입력해야 합니다.");   $("#classCodeReg").focus();		return;	}
    if (makerCode == '') {	alert("제조사는 필수 입력해야 합니다.");   $("#makerCodeReg").focus();		return;	}
    if (itemNo == '') {	alert("품번은 필수 입력해야 합니다.");  $("#itemNoReg").focus();		return;	}


	var data = {};
	
	data.workingType = 'ADD';
    data.makerCode  = makerCode; 
    data.itemNo  = itemNo; 
    data.factoryNo  = factoryNo; 
    data.carType  = carType; 
    
    data.itemName  = itemName; 
    data.itemNameEn  = itemNameEn; 
    
    data.classCode = classCode;
    
    data.centerPrice  = centerPrice; 
    data.inPrice  = inPrice; 
    data.salePrice  = salePrice; 
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);
	        //$("#dialog-form-RItem").dialog("close");
			//$("#dialog-form-item").dialog("close");
	       	$("#pop_itemNo").val(data.o_itemNo);
			if(document.getElementById('srchEqualItemNo')){ 
			$("#srchEqualItemNo").val();
			
	        findItem('/base/item-list',0,0,'Y');
	        $("#dialog-form-RItem").dialog("close");
	        }			
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    	}
	});
	
};

function formClear1() {

	$('#makerCodeReg').val('Default Value');
	$('#itemNoReg').val('');
	$('#factoryNoReg').val('');
	$('#carTypeReg').val('');
	$('#itemNameReg').val('');
	$("#itemNameEnReg").val('');
	$("#classCodeReg").val('Default Value');

	$('#centerPriceReg').val(0);
	$('#inPriceReg').val(0);
	$('#salePriceReg').val(0);
	

}

//인쇄
function print() {
var dialogPrint;
	dialogPrint = $( "#dialogPrint-form" ).dialog({
	    autoOpen: false,
	    height: 350,
	    //minWidth: 500,
	    width: "45%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser, */
	         "닫기": function() {
	        	 dialogPrint.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      //$( "#batchFile" ).val("");	   	
	    }
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogPrint.dialog( "open" );
}		

$("#print").click(function() {
	
	var insureName = "";
	var insure ="";
	var rdoInsure = $('input[name="rdoInsure"]:checked').val();
	var printCenterYN = "";
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var isPrintCtYN = $('input:checkbox[name=printCenterYN]').is(':checked');		
	var reqArr = "";
	var seqArr = "";
	var clType =  $('input[name="clType"]:checked').val();
	//console.log ("clType:"+clType);
	
	//2024.10.04
	let chnLogCust = $("#chnLogCust").val();
	//console.log("chnLogCust1:"+chnLogCust);
	if (chnLogCust ===`undefined` ) {
		chnLogCust = "";
	} 
	
	if (chnLogCust != ``) {
		if (!confirm('인쇄 시에만 청구업체정보가 변경됩니다. 변경하시겠습니까?')) {
			return;
		}
	}
	//console.log("chnLogCust:"+chnLogCust);
	
	if (rdoInsure == 'insure1') {
		insureName = $("#insure1Name").val();
	} else {
		insureName = $("#insure2Name").val();
	}
	//console.log("printDCYN"+printDcYN);
	//return;
	
	 if(isPrintCtYN == true){
		printCenterYN = 'Y';
	}else{
		printCenterYN = 'N';
	}
	//부분인쇄 추가 
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			clReqNo = rowItem.item.clReqNo;
			reqSeq = rowItem.item.reqSeq;
			if (typeof clReqNo == 'undefined' || clReqNo == null) { clReqNo = ""; }
			if (typeof reqSeq == 'undefined' || reqSeq == null) { reqSeq = ""; }
			if (i == 0) {
				reqArr = clReqNo;
				seqArr = reqSeq;
			} else {
				reqArr = reqArr + "^" + clReqNo;
				seqArr = seqArr + "^" + reqSeq;
			}	
		}	
	
	//console.log ("reqArr: "+reqArr);
	//console.log ("seqArr: "+seqArr);
	var clGroupId = $("#clGroupId").val(); 
		window.open("/order/cl-group-print?clGroupId=" + clGroupId+ "&insureName=" + insureName+ "&rdoInsure=" + rdoInsure + "&printDcYN=" + printDcYN
																						 + "&reqArr=" + encodeURIComponent(reqArr)  + "&seqArr=" + encodeURIComponent(seqArr)
																						 + "&clType=" + clType+ "&printCenterYN=" + printCenterYN + "&chnLogCust=" + chnLogCust,"_blank");
});

/*
$("#btnDownload").click(function() {

	var clGroupId = $("#clGroupId").val(); 
	var printMemoYN = "";
	var imgYN = "Y";
	var rdoInsure = $('input[name="rdoInsure"]:checked').val();

	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
 if (rdoInsure == 'insure1') {
		insureName = $("#insure1Name").val();
	} else {
		insureName = $("#insure2Name").val();
	}
	

	var printDcYN = "";
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}
		//부분인쇄 추가 
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			clReqNo = rowItem.item.clReqNo;
			reqSeq = rowItem.item.reqSeq;
			if (typeof clReqNo == 'undefined' || clReqNo == null) { clReqNo = ""; }
			if (typeof reqSeq == 'undefined' || reqSeq == null) { reqSeq = ""; }
			if (i == 0) {
				reqArr = clReqNo;
				seqArr = reqSeq;
			} else {
				reqArr = reqArr + "^" + clReqNo;
				seqArr = seqArr + "^" + reqSeq;
			}	
		}	

	window.location.href = "/order/cl-group-print?clGroupId=" + clGroupId+ "&insureName=" + insureName+ "&rdoInsure=" + rdoInsure + "&printDcYN=" + printDcYN
	+ "&imgYN=" + imgYN + "&reqArr=" + encodeURIComponent(reqArr)  + "&seqArr=" + encodeURIComponent(seqArr);
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
	
});*/

$("#btnDownload").click(function() {

	var insureName = "";
	var insure ="";
	var rdoInsure = $('input[name="rdoInsure"]:checked').val();
	//var printDcYN = "";
	//var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	
	var reqArr = "";
	var seqArr = "";
	var clType =  $('input[name="clType"]:checked').val();
	var imgYN = "Y";
	//console.log ("clType:"+clType);
	var printCenterYN = "";
	var isPrintCtYN = $('input:checkbox[name=printCenterYN]').is(':checked');		
	 if(isPrintCtYN == true){
		printCenterYN = 'Y';
	}else{
		printCenterYN = 'N';
	}
	if (rdoInsure == 'insure1') {
		insureName = $("#insure1Name").val();
	} else {
		insureName = $("#insure2Name").val();
	}
	
/*
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}
	*/
	//부분인쇄 추가 
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			clReqNo = rowItem.item.clReqNo;
			reqSeq = rowItem.item.reqSeq;
			if (typeof clReqNo == 'undefined' || clReqNo == null) { clReqNo = ""; }
			if (typeof reqSeq == 'undefined' || reqSeq == null) { reqSeq = ""; }
			if (i == 0) {
				reqArr = clReqNo;
				seqArr = reqSeq;
			} else {
				reqArr = reqArr + "^" + clReqNo;
				seqArr = seqArr + "^" + reqSeq;
			}	
		}	
	
	//console.log ("reqArr: "+reqArr);
	//console.log ("seqArr: "+seqArr);

	var clGroupId = $("#clGroupId").val(); 
		window.open("/order/cl-group-print?clGroupId=" + clGroupId+ "&insureName=" + insureName+ "&rdoInsure=" + rdoInsure + "&printDcYN=" + printDcYN
																						 + "&reqArr=" + encodeURIComponent(reqArr)  + "&seqArr=" + encodeURIComponent(seqArr)
																						 + "&clType=" + clType + "&imgYN=" + imgYN + "&printCenterYN=" + printCenterYN,"_blank");
});
function forceEditngTextArea(value) {
		/*
		var dataField = $("#textAreaWrap").data("data-field"); // 보관한 dataField 얻기
		var rowIndex = Number($("#textAreaWrap").data("row-index")); // 보관한 rowIndex 얻기
		value = value.replace(/\r|\n|\r\n/g, "<br/>"); // 엔터를 BR태그로 변환
		//value = value.replace(/\r|\n|\r\n/g, " "); // 엔터를 공백으로 변환

		var item = {};
		item[dataField] = value;

		AUIGrid.updateRow(myGridID1, item, rowIndex);
		$("#textAreaWrap").hide();*/
		var dataField = $("#textAreaWrap").data("data-field");
		var rowIndex = Number($("#textAreaWrap").data("row-index"));
		value = value.replace(/\r|\n|\r\n/g, "<br/>"); // 엔터를 BR태그로 변환

		var item = {};
		item[dataField] = value;

		AUIGrid.updateRow(myGridID1, item, rowIndex);
		$("#textAreaWrap").hide();
		updateDataToServer2("/order/clMemoAdd");
};

// 기결처리 2023.07.12 bk  
function whUpProc(url){
	var clGroupId = $("#clGroupId").val();  

	var reqArr = "";
	reqArr = reqArr + "^" + clGroupId;
		
	var data = {};
    data.workingType = "ADD";
    //master
	data.reqArr = reqArr;   //요청번호

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
			"workingType" : "CONF_CHK",
			"reqArr" : reqArr,    //요청번호
			"dataComCode" : dataComCode  //2023.07.20
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
		
}

// 기결취소 
function clUpProc(url){
	//var custCode = $(':radio[name="custCode"]:checked').val();
	var clGroupId = $("#clGroupId").val();  
	var workingTypeName = "기결취소"
	if (!confirm(workingTypeName+ " 처리 하시겠습니까?")){
		return;
	}	
	var reqArr = "";
	reqArr = reqArr + "^" + clGroupId;

	var data = {};
    data.workingType = "CANCEL";
    //master
	data.reqArr = reqArr;   //요천번호

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
			"workingType" : "CANCEL",
			"reqArr" : reqArr,    //요청번호
			"dataComCode" : dataComCode  //2023.07.20
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
		
}


function openRlListDialog() {
var dialogRlList;
	dialogRlList = $( "#dialogRlList-form" ).dialog({
		height: 500,
		width: 1600,
		modal: true,
		headerHeight: 40,
		//position: [400, 400],
		buttons: {
			"취소": function(event) {
				dialogRlList.dialog("close");
			}
		},
		close: function() {
		}
	});
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogRlList.dialog( "open" );
	  createAUIGrid_clRl();
	  findRlList("/logis/rl-list");
}

function findRlList(url){
	var clGroupId = $("#clGroupId").val();
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "CL_RL_LIST",
			"clGroupId": clGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			if (data.rlList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
			} else {	

				for(i=0;i<data.rlList.length;i++){
					list.push({
						 rlYmd: data.rlList[i].rlYmd 
						,rlNo: data.rlList[i].rlNo 
						,custCode: data.rlList[i].custCode 
						,custName: data.rlList[i].custName
						,price: data.rlList[i].price
						,taxPrice: data.rlList[i].taxPrice 
						,sumPrice: data.rlList[i].sumPrice 
						,regUserId: data.rlList[i].regUserId 
						,regUserName: data.rlList[i].regUserName 
						
						,carNo: data.rlList[i].carNo 
						,makerCode: data.rlList[i].makerCode 
						,carType: data.rlList[i].carType 
						,orderGroupId: data.rlList[i].orderGroupId 
						,branchCode: data.rlList[i].branchCode
						,branchName: data.rlList[i].branchName
						,clType: data.rlList[i].clType
					});

				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap_clRl", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID_clRl, Number(page));
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



function createAUIGrid_clRl() {
	var columnLayout = [ 
	 { dataField : "rlYmd",    headerText : "출고(반입)일자", width : 100} 
	,{ dataField : "rlNo",   headerText : "출고(반입)번호", width: 100} 
	,{ dataField : "clType",   headerText : "청구구분", width: 60} 
	,{ dataField : "custCode",     headerText : "주문처코드", width : 80  }
	,{ dataField : "custName",     headerText : "주문처" , style:"left" , width : 200}
	,{ dataField : "carNo",     headerText : "차량정보" , width : 100}
	,{ dataField : "makerCode",     headerText : "제조사", width : 100 }
	,{ dataField : "carType",     headerText : "차종" , width : 100}
	
	,{ dataField : "price",     headerText : "공급가액", dataType: "numeric",formatString: "#,##0"  , style:"right" , width : 100  }
	,{ dataField : "taxPrice",     headerText : "세액" , dataType: "numeric",formatString: "#,##0"  , style:"right", width : 100  }
	,{ dataField : "sumPrice",     headerText : "합계" , dataType: "numeric",formatString: "#,##0"  , style:"right", width : 100  }
	,{ dataField : "orderGroupId",     headerText : "주문그룹ID", width : 100 }
	,{ dataField : "branchCode",      headerText : "관리지점" , visible : false    }
	,{ dataField : "branchName",      headerText : "관리지점"    }
	,{ dataField : "regUserName",   headerText : "요청자" ,width : 100 }
	];

	var footerLayout = [
			{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
			{		dataField: "price",		positionField: "price",		operation: "SUM",		formatString: "#,##0"	}, 
			{		dataField: "taxPrice",		positionField: "taxPrice",		operation: "SUM",		formatString: "#,##0"	}, 
			{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		
	];
	
	var auiGridProps = {			
			editable : false,			
			selectionMode: "singleRow",
			// 상태 칼럼 사용
			//showStateColumn : true,
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false,
			
	};



	myGridID_clRl = AUIGrid.create("#grid_wrap_clRl", columnLayout, auiGridProps);

	AUIGrid.setFooter(myGridID_clRl, footerLayout);
	AUIGrid.bind(myGridID_clRl, "cellDoubleClick", function (event) {//2023.10.11 bk 주문그룹아이디 더블클릭시 주문그룹아이디 이동
		//console.log("columnIndex:"+event.columnIndex);  
		if (event.columnIndex == 11) { 
			var orderGroupId = event.item.orderGroupId;
			window.open('/order/order-group-item-list?orderGroupId='+orderGroupId, '_blank');
		  }	
	});
		


};
//20230809 할인율 포함 다운
function aosDcXls() {
	var insureName = "";
	var rdoInsure = $(':radio[name="rdoInsure"]:checked').val();
	if (rdoInsure == 'insure1') {
		insureName = $("#insure1Name").val();
	} else {
		insureName = $("#insure2Name").val();
	}
	var aosType = "";
	if (insureName.indexOf("삼성") != -1) {
		aosType = 'ssf'; //삼성화재
	} else {
		aosType = 'std'; //삼성화재 제외 나머지
	}
	var clGroupId = $("#clGroupId").val(); 
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var reqArr = "";
	var seqArr = "";
	
	//var printDcYN = $('input[name="printDcYN"]:checked').val();
	var dcYN = "";
	dcYN = "Y"
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];
			clReqNo = rowItem.item.clReqNo;
			reqSeq = rowItem.item.reqSeq;
			if (typeof clReqNo == 'undefined' || clReqNo == null) { clReqNo = ""; }
			if (typeof reqSeq == 'undefined' || reqSeq == null) { reqSeq = ""; }
			if (i == 0) {
				reqArr = clReqNo;
				seqArr = reqSeq;
			} else {
				reqArr = reqArr + "^" + clReqNo;
				seqArr = seqArr + "^" + reqSeq;
			}	
		}	
	document.location.href = "/order/aosXls?clGroupId=" + clGroupId + "&aosType=" + aosType + "&insureName=" + insureName
															+ "&rdoInsure=" + rdoInsure +"&reqArr=" + encodeURIComponent(reqArr)  + "&seqArr=" + encodeURIComponent(seqArr)
															+ "&dcYN=" + dcYN;

}
// 청구진행 0810 bk
function reqChk_CHK(url,workingType) {
	var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);

	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var workingTypeName = "";
	if (workingType == 'CHK') {		workingTypeName = "청구진행";	}
	if (workingType == 'CHK_CANCEL') {		workingTypeName = "진행취소";	}
	
	if (!confirm(workingTypeName+ " 처리 하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var reqArr = "";
	var addedClReqNos = []; // 이미 추가된 clreqno를 추적하는 배열
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		 if (addedClReqNos.includes(rowItem.item.clReqNo)) {
        continue;
  		  }
		//reqArr = reqArr + "^" +rowItem.item.clReqNo;
		addedClReqNos.push(rowItem.item.clReqNo); // clreqno를 추가
   		reqArr += (reqArr !== "" ? "^" : "") + rowItem.item.clReqNo;
		if (workingType == 'CHK') { //청구진행
			//진행가능여부체크
			if (isEmpty(rowItem.item.chkYN) == false || isEmpty(rowItem.item.collectYN) == false ){
				alert("이미 청구진행 중인 건은 선택할 수 없습니다.");
				return;		
			}
		}
		if (workingType == 'CHK_CANCEL') { //진행취소	
			//진행취소
			if (isEmpty(rowItem.item.checkYN) == true || rowItem.item.collectYN == 'Y' ){
				alert("기결 상태이거나 청구진행 중이 아닌 건은 선택할 수 없습니다.");
				return;		
			}		
		}			
	}
//	console.log("reqArr"+reqArr);
	//return;
	var data = {};
    //data.workingType = "CHK";
	data.workingType = workingType;
	//sub
	data.reqArr = reqArr;   //요천번호 
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"reqArr" : reqArr   //요천번호 
			,"dataComCode" : dataComCode  //2023.07.20	
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			if (data.result_code == 'OK' || data.result_code == 'DCErr') {  //DCErr Add 2023.07.20 
				location.reload(true);
			}
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}
//보험사 1 과실률 입력 시 보험사 2 과실률 계산 
function calculateRatioDiff1(value) {
    var inputValue = parseFloat(value);
    if (!isNaN(inputValue)) {
        var difference = 100 - inputValue;
        document.getElementById('insure2AcciRate').value = difference;
    } else {
        document.getElementById('insure2AcciRate').value = 0;
    }
}
//보험사2 과실률 입력 시 보험사1 과실률 계산 
function calculateRatioDiff2(value) {
    var inputValue = parseFloat(value);
    if (!isNaN(inputValue)) {
        var difference = 100 - inputValue;
        document.getElementById('insure1AcciRate').value = difference;
    } 
}



// 메모 텍스트 높이 조절시 커지도록 하는 코드
const textArea = document.getElementById('myTextArea');
const wrap = $("#textAreaWrap");

function outputsize() { 
wrap.height( textArea.offsetHeight+35); 
} 

new ResizeObserver(outputsize).observe(textArea ) 

