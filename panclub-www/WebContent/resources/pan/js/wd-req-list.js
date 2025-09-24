

/* Begin : Date Picker Date Range*/
var today = new Date();
var firstDay = new Date(today);
firstDay.setDate(1);
// console.log(firstDay);
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        date: firstDay,
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



// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
		  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	AUIGrid.setFooter(myGridID, footerLayout);
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var wdReqNo = info[1];
        var wdReqType = info[2];
        var sYmd = info[3];
        var eYmd = info[4];
        
        if ( typeof wdReqNo == 'undefined'){ wdReqNo = ''	}
        if ( typeof wdReqType == 'undefined'){ wdReqType = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	
        $("#wdReqNo").val(wdReqNo);
        $("#wdReqType").val(wdReqType);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
        findDataToServer("/biz/wd-req-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var wdReqType_val = $("#wdReqType").val(); 
		var wdReqNo_val = $("#wdReqNo").val();
				
		document.location.hash = '#info'+currentPage+"!"+wdReqNo_val+"!"+wdReqType_val+"!"+sYmd+"!"+eYmd;
		
		findDataToServer("/biz/wd-req-list", 1);
	});
	
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "wdReqYmd",   headerText : "출금요청일", width: 120} ,
	 { dataField : "wdDate",   headerText : "출금일", width: 120} 
	,{ dataField : "wdReqNo",     headerText : "요청번호", width : 120
	, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
	,{ dataField : "wdReqType",     headerText : "요청구분", width : 120     }
	,{ dataField : "custCode",     headerText : "발주처코드", width : 120  }
	,{ dataField : "custName",     headerText : "발주처명", width : 160  }
	//,{ dataField : "itemCnt",     headerText : "품목수량", width : 80 ,style:"right"  }
	//,{ dataField : "sumCnt",     headerText : "합계수량", width : 80 ,style:"right"   }
	,{ dataField : "wdReqAmt",     headerText : "요청금액", width : 120,style:"right"  }
		,{ dataField : "wdReqAmt2",     headerText : "요청금액2", width : 120  ,visible : false}
	,{ dataField : "memo1",   headerText : "메모" }
	
	,{ dataField : "comCode",   headerText : "회사코드" ,visible : false}
	,{ dataField : "attaFileOri",   headerText : "첨부파일",				//240711 yoonsang 첨부파일 여러개받고 여러개링크탈수있도록 수정
		style: "myLinkStyle-left",
		renderer: {
			type: "TemplateRenderer",
			linkField: "attaFile"
		},		
		labelFunction: function (rowIndex, columnIndex, value, headerText, item) {
	    // 처리번호가 여러개인 경우도 있으므로 탬플릿렌더러를 이용해서 하이퍼링크로 복수의 주문번호로 연결 가능하도록
	    if (value == null) return '';
	    let comCode = item.comCode;
	    const attaFileSplit = item.attaFile.split(',');
	    const attaFileOriSplit = value.split(',');
	    let returnHtml = '';
	    for (var j = 0; j < attaFileSplit.length; j++) {
	      if (returnHtml != '') returnHtml += '<a>,</a>';
	      returnHtml += '<a class="auigrid-color-style-link" style="color: blue;" target="_blank" href="'+fileRootUrl + comCode + '/wd/' + attaFileSplit[j] + '">' + attaFileOriSplit[j] + '</a>';
	    }
	    return returnHtml;
	  }    	
        
    	
	}
//	,{ dataField : "whSumCnt",     headerText : "입고수량", width : 100 ,style:"right", dataType: "numeric", formatString: "#,##0", style: "right"   }
	,{ dataField : "whSumPrice",     headerText : "입고금액", width : 120,style:"right", dataType: "numeric", formatString: "#,##0", style: "right"  }
	, { dataField: "buyChk", headerText: "매입확정", editable: false,visible : false }
//	,{ dataField : "wdReqSumPrice",     headerText : "요청금액 합", width : 120,style:"right", dataType: "numeric", formatString: "#,##0", style: "right"  }
	,{ dataField : "wdMoney",     headerText : "출금액", width : 120,style:"right", dataType: "numeric", formatString: "#,##0", style: "right"  }
	,{ dataField : "dcSumPrice",     headerText : "출금할인액", width : 120,style:"right", dataType: "numeric", formatString: "#,##0", style: "right"  }
	,{ dataField : "difWdMoney",     headerText : "미출금액", width : 120,style:"right", dataType: "numeric", formatString: "#,##0", style: "right"  }
	, { dataField: "payStatus", headerText: "출금상태", editable: false }
	,{ dataField : "regUserId",      headerText : "요청자" ,visible : false }
		,{ dataField : "regUserName",      headerText : "요청자"}
	,{ dataField : "uptYmd",      headerText : "수정일자"}
	,{ dataField : "attaFile",      headerText : "첨부파일명 ",visible : false }
];
 
 	var footerLayout = [{
		labelText: "합계",
		positionField: "custCode",
		style: "aui-grid-my-column"
	}, {
		dataField: "wdReqAmt2",
		positionField: "wdReqAmt",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "sumCnt",
		positionField: "sumCnt",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "whSumCnt",
		positionField: "whSumCnt",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "whSumPrice",
		positionField: "whSumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "wdMoney",
		positionField: "wdMoney",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "difWdMoney",
		positionField: "difWdMoney",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}, {
		dataField: "dcSumPrice",
		positionField: "dcSumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style:"right"

	}
	
	];
 
 
 
 
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			//editable : true,			
			
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
			
			showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		// 체크박스 대신 라디오버튼 출력함
		rowCheckToRadio : true,
		showAutoNoDataMessage : false, 
			/*
	
			
			// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
			rowIdField : "mgrIdx",
			
			
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
		
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		var wdReqNo = event.item.wdReqNo;
		var attaFile = event.item.attaFile;
		var attaFileOri = event.item.attaFileOri;
		//console.log("attaFile:"+attaFile);  
		if (event.columnIndex <= 2) {   
			$.fancybox.open({
			  href : '/biz/wd-req-dtl-list?wdReqNo='+wdReqNo + '&attaFile=' +attaFile + '&attaFileOri=' +attaFileOri , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
		}		
	});
		
}


function findDataToServer(url,page) {
	var list = [];
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var wdReqType = ""; //$("#wdReqType").val();
	var wdReqType = $("#wdReqType").val();
	var buyChk = $("#buyChk").val();
	var payStatus = $("#payStatus").val();
	var custCode = $("#custCode").val(); 
	
	
	if ($('#ymdIgnoreYN').is(':checked') == true){
		   if ((!custCode || custCode.trim() == '' ) && (!wdReqNo || wdReqNo.trim() == '')&& (!payStatus || payStatus.trim() == '')&& (!buyChk || buyChk.trim() == '')&& (!wdReqType || wdReqType.trim() == '')) {
		      alert("조회 조건을 하나 이상 입력해주세요.");
		      return false;
		   }
		}
	  
	var wdReqNo = $("#wdReqNo").val(); 
	var wdDateType = $("#wdDateType").val(); //기준일자 유형
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"wdReqType":wdReqType,
			"wdReqNo":wdReqNo,
			"custCode":custCode,
			"buyChk":buyChk,			
			"payStatus":payStatus,
			"ymdIgnoreYN":ymdIgnoreYN,
			"wdDateType":wdDateType,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);					
			}else{
					//console.log("data" + JSON.stringify
					//(data));
				for(i=0;i<data.reqList.length;i++){
					if (data.reqList[i].wdReqType == "발주출금" ){
						var wdReqType = "발주출금";
						var whSumCnt = data.reqList[i].whSumCnt;
						var whSumPrice = data.reqList[i].whSumPrice;
					} else if (data.reqList[i].wdReqType == "입고출금"){
						var wdReqType = "입고출금";
						var whSumCnt = data.reqList[i].wiSumCnt;
						var whSumPrice = data.reqList[i].wiSumPrice;
					}
					list.push({
						 wdReqYmd: data.reqList[i].wdReqYmd ,
						 wdDate: data.reqList[i].wdDate 
						,wdReqNo: data.reqList[i].wdReqNo 
						//,wdReqType: data.reqList[i].wdReqType
						,wdReqType:  wdReqType
						,custCode: data.reqList[i].custCode 
						,custName: data.reqList[i].custName
						,itemCnt: data.reqList[i].itemCnt
						,sumCnt: data.reqList[i].sumCnt
						,wdReqAmt: _cf_comma(data.reqList[i].wdReqAmt)						
						,memo1: data.reqList[i].memo1 
						,attaFileOri: data.reqList[i].attaFileOri 
						,regUserId: data.reqList[i].regUserId
						,regUserName: data.reqList[i].regUserName
						,uptYmd: data.reqList[i].uptYmd
						,attaFile: data.reqList[i].attaFile
						,comCode : data.reqList[i].comCode
						,wdReqAmt2: data.reqList[i].wdReqAmt	
						,buyChk : data.reqList[i].buyChk	
						,whSumCnt : whSumCnt
						,whSumPrice : whSumPrice
						,wdReqSumPrice :  data.reqList[i].wdReqSumPrice
						,wdMoney :  data.reqList[i].wdMoney
						,difWdMoney :  data.reqList[i].difWdMoney	
						,payStatus :  data.reqList[i].payStatus
						,dcSumPrice :  data.reqList[i].dcSumPrice    //2023.09.06
						//,whSumCnt : data.reqList[i].whSumCnt	
						//,whSumPrice : data.reqList[i].whSumPrice	
						//,wiSumCnt : data.reqList[i].wiSumCnt	
						//,wiSumPrice : data.reqList[i].wiSumPrice	
						
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
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

$(document).keydown(function(e) {
  if (e.which == 120) {
    $('#btnFind').click();}
	});
	
	

	
	

// 매입확정
function buyChk(url, workingType) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}


	var rowItem;
	var wdReqNo;
	var wdReqNoArr = "";
	var errCnt = 0;

	/*
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		wdReqNoArr = wdReqNoArr + "^" + rowItem.item.placeNo;
		seqArr = seqArr + "^" + rowItem.item.placeSeq;
	}*/

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];

		wdReqNo = rowItem.item.wdReqNo;

		if (typeof wdReqNo == 'undefined' || wdReqNo == null) { wdReqNo = ""; }

		if (i == 0) { wdReqNoArr = wdReqNo; }
		else {
			wdReqNoArr = wdReqNoArr + "^" + wdReqNo;
		}
		/*if (workingType == 'BUY_CHK' && (rowItem.item.buyChk != null && rowItem.item.buyChkYmd != '')) {
		errCnt = errCnt + 1;
		}*/
		if (errCnt > 0) {
			alert("이미 매입확정된 품목입니다.")
			return;
		}
	}

	whSumCnt = rowItem.item.whSumCnt;
	whSumPrice = rowItem.item.whSumPrice;

	if (whSumCnt == 0 || whSumPrice == 0) {
		alert("아직 입고가 잡히지 않은 품목이 있습니다");
		return;
	}

	var data = {};
	data.workingType = workingType;

	//sub
	data.wdReqNoArr = wdReqNoArr;   //번호 


	//console.log("data" + JSON.stringify(data));


	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//data : data,
		data: {
			"workingType": workingType,
			"wdReqNoArr": wdReqNoArr,   //요천번호 
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
				
// 출금등록 
$("#btndepReg").click(function() {
	withdrawReg();
});

function withdrawReg() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var wdReqNoArr = [];
	var errCnt = 0;
	var errCustName = "";
	var custCode = '';
	var custName = '';
	var wdReqAmt2 = 0;
	var prevCustCode = null;
	var j = 1;
	var payStatus = '';


	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];

		wdReqNo = rowItem.item.wdReqNo;
		payStatus = rowItem.item.payStatus;

		if (typeof wdReqNo == 'undefined' || wdReqNo == null) { wdReqNo = ""; }

		wdReqNoArr.push(wdReqNo); // 항목의 wdReqNo 값을 배열에 추가
		custCode = rowItem.item.custCode;
		custName = rowItem.item.custName;
		wdReqAmt2 += rowItem.item.wdReqAmt2;

		if (prevCustCode !== null && prevCustCode !== custCode) { // 이전 custCode와 현재 custCode가 다른 경우
			errCnt++;
			errCustName += j + ". " + custName + "\n";
		}
		prevCustCode = custCode;
		j++;
	}
	
	//console.log ("payStatus"+payStatus)
	if (payStatus =="출금"){
		alert("이미 출금완료된 건입니다.");
		return;
	}


	$.fancybox.open({
		//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
		//	href: '/base/withdraw-up?wdReqNo=' + wdReqNoArr.join('&wdReqNo='), // 불러 올 주소
		href: '/base/withdraw-up?wdReqNoArr=' + wdReqNoArr + '&custCode=' + custCode + '&custName=' + custName + '&wdReqAmt2=' + wdReqAmt2, // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false
		, modal: true
	});
}

//요청취소
function reqChk(url, workingType) {
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	if (!confirm("처리하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var wdReqNo;
	var wdReqNoArr = "";
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
			rowItem = checkedItems[i];		
			wdReqNo = rowItem.item.wdReqNo;

				if (typeof wdReqNo == 'undefined' || wdReqNo == null) { wdReqNo = ""; }

			if (i == 0) { wdReqNoArr = wdReqNo; }
		else {
			wdReqNoArr = wdReqNoArr + "^" + wdReqNo;
		}   
	
			//대상 체크
			var errCnt = 0;
			var errCnt2 = 0;
			var errCnt3 = 0;
		
			if (workingType == 'REQ_CANCEL' && rowItem.wdMoney >0){
				alert("출금확정이 된 품목은 요청취소가 불가합니다!!")
				return;
			};
				
	var data = {};
	data.workingType = workingType;
    //data.workingType = "CHK";
	
	//sub
	data.wdReqNoArr = wdReqNoArr;   //요천번호 
	
//	console.log ("data" + JSON.stringify(data));
//	return;
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"wdReqNoArr": wdReqNoArr, 
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
		
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	}
}