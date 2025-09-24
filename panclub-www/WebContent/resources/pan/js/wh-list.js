

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


var datepicker1 = new tui.DatePicker('#wrapper1', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#popWhYmd',
		format: 'yyyy-MM-dd'
	}
});
/* End : Date Picker Date Range*/


/*var picker2 = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        date: today,
    	input: '#purchase-startpicker-input',
        container: '#p-startpicker-container'
    },
    endpicker: {
        date: today,
        input: '#purchase-endpicker-input',
        container: '#p-endpicker-container'
    }/*,
    selectableRanges: [
        [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
    ]*/
/*});*/


// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
		  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	//관리지점코드에 셋팅
  	branchCodeSelect("/base/code-list")		 
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var whNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var custCode = info[4];
        var buyChk = info[5];
        var orderGroupId = info[6];
        var ymdIgnoreYN = info[7];
        
        if ( typeof whNo == 'undefined'){ whNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof buyChk == 'undefined'){ buyChk = ''	}
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
        if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	
        $("#whNo").val(whNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#custCode").val(custCode);
		$("input:radio[name='buyChk']:radio[value=" + buyChk + "]").prop('checked', true);
		$("#orderGroupId").val(orderGroupId);		
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		
        findDataToServer("/logis/wh-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var whNo_val = $("#whNo").val(); 
		var custCode_val = $("#custCode").val(); 

		var buyChk_val = $(':radio[name="buyChk"]:checked').val();
		var orderGroupId_val = $("#orderGroupId").val(); 
		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}
				
		document.location.hash = '#info'+currentPage+"!"+whNo_val+"!"+sYmd+"!"+eYmd+"!"+custCode_val+"!"+buyChk_val+"!"+orderGroupId_val+"!"+ymdIgnoreYN;
		
		findDataToServer("/logis/wh-list", 1);
	});
	
	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		
		findDataToServer("/logis/wh-list", 1);
	}
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "whYmd",    headerText : "입고일자", width : 90} 
	,{ dataField : "whNo",   headerText : "입고번호", width: 100,
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "custCode",     headerText : "발주처코드", width : 70  , style : "left"   }
	,{ dataField : "custName",     headerText : "발주처명", width : 160  }
	,{ dataField : "itemCnt",     headerText : "품목수량", width : 70  }
	,{ dataField : "cnt",   headerText : "수량", width : 70 , dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
	,{ dataField : "price",     headerText : "공급가액", width : 120 , dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
	,{ dataField : "taxPrice",     headerText : "세액", width : 120 , dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
	,{ dataField : "sumPrice",      headerText : "합계" , dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"   }
	, { dataField: "buyChk", headerText: "매입확정", editable: false, width : 80 }
	, { dataField: "buyChkDate", headerText: "매입확정일자", editable: false, width : 100 }
	,{ dataField : "wdReqStatus",      headerText : "출금요청여부", width : 80, }
	,{ dataField : "wdNo",     headerText : "출금번호", width : 120  ,  editable : false }
	,{ dataField : "payAmt",     headerText : "결제금액", width : 120  , dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false, visible: false }
	,{ dataField : "payYmd",     headerText : "결제일자", width : 120 , visible: false }
	,{ dataField : "branchCode",   headerText : "관리지점", width : 120 }	
	,{ dataField : "regUserName",   headerText : "작성자", width : 120 }
];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	// 푸터 설정
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {
		dataField: "cnt",
		positionField: "cnt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "itemCnt",
		positionField: "whUnitPrice",
		operation: "itemCnt",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "price",
		positionField: "price",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "taxPrice",
		positionField: "taxPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "sumPrice",
		positionField: "sumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "saleUnitPrice",
		positionField: "saleUnitPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	},{
		dataField: "itemCnt",
		positionField: "itemCnt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, 
	];
	
	
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
		
		//rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,
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

	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);
	
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

		var whNo = event.item.whNo;
		//console.log("storageUseReqNo:"+storageUseReqNo);  
		if (event.columnIndex == 1) {   
			$.fancybox.open({
			  href : '/logis/wh-item-list?whNo='+whNo    , // 불러 올 주소
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
/*	
	var ymdIgnoreYN2 = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN2]').is(':checked') == true){
		ymdIgnoreYN2 = "Y";
	}
*/
	var whNo = $("#whNo").val();
	var custCode = $("#custCode").val();
	var buyChk = $(':radio[name="buyChk"]:checked').val();
	var orderGroupId = $("#orderGroupId").val(); // 20230626 yoonsang 조회조건추가
	
/*
	var sYmd2 = document.getElementById("purchase-startpicker-input").value;
	var eYmd2 = document.getElementById("purchase-endpicker-input").value;
*/	
	var whDateType = $("#whDateType").val();
	
	
			if ($('#ymdIgnoreYN').is(':checked') == true){
			   if ((!whNo || whNo.trim() == '' ) &&
			   	 (!custCode || custCode.trim() == '') && (!buyChk || buyChk.trim() == '') &&
			   	 (!orderGroupId || orderGroupId.trim() == '' )) {
			      alert("조회 조건을 하나 이상 입력해주세요.");
			      return false;
			   }
			}
			
	var branchCode = $("#branchCode").val();
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"whNo":whNo,
			"custCode":custCode,
			"buyChk" : buyChk,
		//	"sYmd2" :sYmd2,
		//	"eYmd2":eYmd2,
		//	"ymdIgnoreYN2":ymdIgnoreYN2,
			"whDateType" : whDateType,
			"orderGroupId" : orderGroupId,
			"branchCode":branchCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.whList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.whList.length;i++){
					list.push({
						 whYmd: data.whList[i].whYmd 
						,whNo: data.whList[i].whNo 
						,custCode: data.whList[i].custCode 
						,custName: data.whList[i].custName
						,itemCnt: data.whList[i].itemCnt 
						,cnt: data.whList[i].cnt
						,price: data.whList[i].price
						,taxPrice: data.whList[i].taxPrice 
						,sumPrice: data.whList[i].sumPrice
						,payYmd: data.whList[i].payYmd
						,regUserName: data.whList[i].regUserName
						,payAmt: data.whList[i].payAmt 
						,wdNo : data.whList[i].wdNo
						,orderGroupId : data.whList[i].orderGroupId
						,wdReqStatus : data.whList[i].wdReqStatus
						,buyChk :  data.whList[i].buyChk
						,buyChkDate :  data.whList[i].buyChkDate
						,branchCode :  data.whList[i].branchCode
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

//출금요청
function wdReq(){
 
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("출금요청할 입고를 선택하세요!");
		return;
	}

	var rowItem;
	var jobArr = ""
	var sumPrice = 0;
	var custCode = "";
	var custName = "";
	
	var errCnt2 = 0;  
	var custArr = [];
	var j = 1
	var errCustName = "";
	var inArr = "Y";  // 배열등록대상

	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		jobArr = jobArr + "^" +rowItem.item.whNo;
		sumPrice = sumPrice + rowItem.item.price + rowItem.item.taxPrice;		
		if (i==0){
			custCode = rowItem.item.custCode;
			custName = rowItem.item.custName;
			custArr[0] = custName;
		}
			inArr = "Y"
			if (custCode != rowItem.item.custCode ) {
			errCustName = rowItem.item.custName;
			errCnt2 = errCnt2 + 1;
			for (var k=0, len2 = custArr.length; k < len2; k++) {
				//console.log("cusArr:"+custArr[k] + "--" + errCustName);
				if ( custArr[k] == errCustName) 	{
					inArr = 'N';
				}	
			}
			if  (inArr == 'Y') {
				custArr[j] = errCustName; 
				j = j + 1;
			}
		}		
	}		
		if (errCnt2 > 0) {
		errCustNameArr="";
		for (var l=0, len3 = custArr.length; l < len3; l++) {
			errCustNameArr = errCustNameArr + "/"+custArr[l];
		}
		alert("발주처가 다른 경우 출금요청을 할 수 없습니다!!\n\n선택된 발주처: "+errCustNameArr);
		return;
		
	}
	// console.log("seqArr:"+seqArr);
	$.fancybox.open({
	  href : '/biz/wd-req-up?wdReqType=입고출금&custCode='+custCode+'&custName='+encodeURIComponent(custName)+'&sumPrice='+sumPrice+'&jobArr='+encodeURIComponent(jobArr)    , // 불러 올 주소
	  type : 'iframe',
	  width : '60%',
	  height : '60%',
	  padding :0,
	  fitToView: false,
	  autoSize : false,
	  modal :true
	});
}  


function findSrchCode(url) {
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			mCode: "1000"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				for (i = 0; i < data.codeList.length; i++) {
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;
					$("#makerCodeReg").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
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
var currentRowIndex;

//다이얼로그창 선택하는 경우 그리드에 디스플레이
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



// 매입확정
function buyChk(url, workingType) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}


	var rowItem;
	var whNo;
	var whNoArr = "";
	var errCnt = 0;

	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];

		whNo = rowItem.item.whNo;

		if (typeof whNo == 'undefined' || whNo == null) { whNo = ""; }

		if (i == 0) { whNoArr = whNo; }
		else {
			whNoArr = whNoArr + "^" + whNo;
		}
		/*if (workingType == 'BUY_CHK' && (rowItem.item.buyChk != null && rowItem.item.buyChkYmd != '')) {
		errCnt = errCnt + 1;
		}*/
		if (errCnt > 0) {
			alert("이미 매입확정된 품목입니다.")
			return;
		}
	}


	var data = {};
	data.workingType = workingType;

	//sub
	data.whNoArr = whNoArr;   //번호 


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
			"whNoArr": whNoArr,   //요천번호 
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

function openDialogChangeWhYmd(){
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	var rowItem;
	var whNo;
	var whNoArr;
	
	var custCodeStd = "";
	var custNameStd = "";
	var custCodeNow = "";
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		if (i == 0) {
			custCodeStd = rowItem.item.custCode;
			custNameStd = rowItem.item.custName;
		}else {
			custCodeNow = rowItem.item.custCode;
		}
		
		if (i != 0 && custCodeStd != custCodeNow) {
			alert("동일한 발주처만 선택하세요.");
			return;
		}
		whNo = rowItem.item.whNo;
	
		if (typeof whNo == 'undefined' || whNo == null) {			whNo = "";		}
		
		
		if (i == 0) {
			whNoArr = whNo;						
		}else{
			whNoArr = whNoArr + "^" +whNo;		
			
		}
	}
	
	$("#popCustName").val(custNameStd);
	$("#popCustCode").val(custCodeStd);
	$("#popWhNoArr").val(whNoArr);
	var dialogChangeDate;
	dialogChangeDate = $("#dialog-form-changeWhYmd").dialog({
		//autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: 400,
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			//"확인": changePlRlYmd(whNoArr,whSeqArr,placeRlYmd),
			"확인": changeWhYmd,
			"취소": function(event) {
				dialogChangeDate.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	

		}
	});
		
}

function changeWhYmd(){
	var whNoArr = $("#popWhNoArr").val();
	var whYmd = $("#popWhYmd").val();
	var workingType = "CHANGE_WH_DATE"
	
	
	var data = {};
	
    data.whNoArr = whNoArr;
	data.whYmd = whYmd;
	data.workingType = workingType;
	
	$.ajax({
	    url : "/logis/changeWhYmd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : data,
	    
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}


