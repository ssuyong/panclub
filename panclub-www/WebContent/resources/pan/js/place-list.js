
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
    }
});

var datepicker2 = new tui.DatePicker('#wrapper2', {
	language: 'ko',
    input: {
        element: '#whSchYmd',
        format: 'yyyy-MM-dd'
    }
});

$("#whSchTime").timepicker({
    timeFormat: 'h:mm p',
    interval: 30,
    minTime: '09',
    maxTime: '6:00pm',
    defaultTime: '',
    startTime: '09:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});

/* End : Date Picker Date Range*/

// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	
	//관리지점코드에 셋팅
  	branchCodeSelect("/base/code-list")		  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var placeNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var turnNum = info[4];
        var custCode = info[5];
        let orderReqPlaceCustCode = info[6];
        
        if ( typeof placeNo == 'undefined'){ placeNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof turnNum == 'undefined'){ turnNum = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof orderReqPlaceCustCode == 'undefined'){ orderReqPlaceCustCode = ''	}
	
        //console.log("sYmd:"+sYmd);
        $("#placeNo").val(placeNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#turnNum").val(turnNum);
		$("#custCode").val(custCode);
		$("#orderReqPlaceCustCode").val(orderReqPlaceCustCode);
		
        findDataToServer("/order/place-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var placeNo_val = $("#placeNo").val(); 
		var turnNum_val = $("#turnNum").val(); 
		var custCode_val = $("#custCode").val(); 
		let orderReqPlaceCustCode_val = $("#orderReqPlaceCustCode").val(); 
		
				
		document.location.hash = '#info'+currentPage+"!"+placeNo_val+"!"+sYmd+"!"+eYmd+"!"+turnNum_val+"!"+custCode_val+"!"+orderReqPlaceCustCode_val;
		
		findDataToServer("/order/place-list", 1);
		
		datepicker2.setNull();
	});
	
	
	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/order/place-list", 1);
	}
	
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	
// 칼럼 레이아웃 작성
var columnLayout = [ 
	 //{ dataField : "regYmd",    headerText : "발주일", width : 80} 
	 { dataField : "placeYmd",    headerText : "발주일", width : 80} 
	,{ dataField : "whSchYmd",    headerText : "입고예정일", width : 80} 
	,{ dataField : "whSchTime",    headerText : "예정시간", width : 80} 
	,{ dataField : "turnNum",   headerText : "차수", width: 80} 
	,{ dataField : "pcYN",   headerText : "주문접수여부", width: 80} 
	,{ dataField : "pcProcStep",   headerText : "접수단계", width: 80} 
	,{ dataField : "custCode",     headerText : "발주처코드", width : 80     }
	,{ dataField : "custName",     headerText : "발주처명", width : 120 , style : "left" }
	,{ dataField : "orderReqPlaceCustCode",     headerText : "요청발주처코드", width : 80     }
	,{ dataField : "orderReqPlaceCustName",     headerText : "요청발주처명", width : 120 , style : "left" }
	,{ dataField : "placeNo",   headerText : "발주번호" , width : 120,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
	,{ dataField : "custOrderNo",   headerText : "거래처주문번호" , width : 100  }
	,{ dataField : "itemCnt",      headerText : "품목수량", dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"    }
	,{ dataField : "sumCnt",      headerText : "합계수량" , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"   }
	,{ dataField : "price",   headerText : "공급가액", dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right" }
	,{ dataField : "taxPrice",      headerText : "세액" , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"   }
	,{ dataField : "sumPrice",      headerText : "합계" , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"   }
	,{ dataField : "directYN",     headerText : "직송여부", width : 80     }
	,{ dataField : "directCost",      headerText : "운송비" , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"   }
	,{ dataField : "whItemCnt",      headerText : "입고품목수량", dataType: "numeric", width :120, formatString: "#,##0"  , style:"right"}
	,{ dataField : "whSumCnt",      headerText : "입고합계수량", dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"}
	,{ dataField : "whStatus",      headerText : "입고여부", width : 60, }
	,{ dataField : "wdReqStatus",      headerText : "출금요청여부", width : 80, }
	,{ dataField : "branchCode",      headerText : "관리지점", width : 80, }
	,{ dataField : "reqUserName",      headerText : "요청자", width : 80, visible : false}
	,{ dataField : "regUserName",      headerText : "처리자", width : 80, }
	,{ dataField : "memo1",      headerText : "비고1", style : "left", width : 140,  }
	,{ dataField : "memo2",      headerText : "비고2", style : "left", width : 140,  }		
];
 var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "price",		positionField: "price",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "taxPrice",		positionField: "taxPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		
		{		dataField: "itemCnt",		positionField: "itemCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumCnt",		positionField: "sumCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "directCost",		positionField: "directCost",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "whItemCnt",		positionField: "whItemCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "whSumCnt",		positionField: "whSumCnt",		operation: "SUM",		formatString: "#,##0"	}, 
	
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
		
		//rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		showAutoNoDataMessage : false,
		
		showFooter: true,
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
	AUIGrid.setFooter(myGridID, footerLayout);
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

		//console.log("columnIndex:"+event.columnIndex);  
		//if (event.columnIndex == 1) {   
		if (event.dataField == 'placeNo' )	{
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var placeNo_val = $("#placeNo").val(); 
				
			document.location.hash = '#info'+currentPage+"!"+placeNo_val+"!"+sYmd+"!"+eYmd;
			//
	     	
	     	//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'placeNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/place-up');
		    document.body.appendChild(f);
		    f.submit();
		}		
	});
		
}


function findDataToServer(url,page) {

	var list = [];
	//var sYmd = $("#sYmd").val();
	//var eYmd = $("#eYmd").val();
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var whSchYmd = $("#whSchYmd").val(); 
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var turnNum = $("#turnNum").val();
	var custCode = $("#custCode").val();
	var placeNo = $("#placeNo").val();
	var directYN = $("#directYN").val();
	
	var branchCode = $("#branchCode").val();
	var whSchTime = $("#whSchTime").val();

	var carNo = $("#carNo").val();
	var orderGroupId = $("#orderGroupId").val();
	var orderReqPlaceCustCode = $("#orderReqPlaceCustCode").val();
	
	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!whSchYmd || whSchYmd.trim() == '' ) && (!turnNum || turnNum.trim() == '')
	   	 && (!custCode || custCode.trim() == '') && (!placeNo || placeNo.trim() == '')
	   	 && (!directYN || directYN.trim() == '') && (!orderGroupId || orderGroupId.trim() == '')	 ) {
	     $("#iDiv_noSrchPop").text("ⓘ 조회조건을 입력하고 조회하세요");
     	 $("#iDiv_noSrchPop").css("display","block");
     	 return false;
	   }
	}
	 
	
	//if (spaceDel(estiNo)=='' && spaceDel(itemName)=='') {
	//	alert("부품번호 또는 부품명에 검색어를 입력하세요.");
	//	return false;
	//}


	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"whSchYmd":whSchYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"placeNo":placeNo,
			"turnNum":turnNum,
			"custCode":custCode,
			"directYN": directYN,
			"branchCode":branchCode,
			"whSchTime":whSchTime,
			"carNo":carNo,
			"orderGroupId":orderGroupId,
			"orderReqPlaceCustCode":orderReqPlaceCustCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.placeList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");
				$("#iDiv_noDataPop").css("display","block");			
				AUIGrid.clearGridData(myGridID);					
			}else{
					
				for(i=0;i<data.placeList.length;i++){
					list.push({
						 regYmd: data.placeList[i].regYmd 
						,whSchYmd: data.placeList[i].whSchYmd 
						,turnNum: data.placeList[i].turnNum 
						,custCode: data.placeList[i].custCode
						,custName: data.placeList[i].custName 
						,placeNo: data.placeList[i].placeNo 
						,custOrderNo: data.placeList[i].custOrderNo 
						,price: data.placeList[i].price 
						,taxPrice: data.placeList[i].taxPrice 
						,sumPrice: data.placeList[i].sumPrice
						,itemCnt: data.placeList[i].itemCnt 
						,sumCnt: data.placeList[i].sumCnt
						,whItemCnt: data.placeList[i].whItemCnt 
						,whSumCnt: data.placeList[i].whSumCnt 
						,whStatus: data.placeList[i].whStatus 
						,reqUserName: data.placeList[i].reqUserName 
						,regUserName: data.placeList[i].regUserName 
						,memo1: data.placeList[i].memo1
						,memo2: data.placeList[i].memo2
						,wdReqStatus : data.placeList[i].wdReqStatus

						,directYN : data.placeList[i].directYN
						,directCost : data.placeList[i].directCost
						
						,branchCode : data.placeList[i].branchCode
						,placeYmd : data.placeList[i].placeYmd
						,whSchTime : data.placeList[i].whSchTime

						,pcYN : data.placeList[i].pcYN // 2023.09.26 bk
						,pcProcStep : data.placeList[i].pcProcStep // 2023.09.26 bk
						
						,orderReqPlaceCustCode : data.placeList[i].orderReqPlaceCustCode // 20240404 yoonsang
						,orderReqPlaceCustName : data.placeList[i].orderReqPlaceCustName // 20240404 yoonsang
					});			   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
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
		alert("출금요청할 발주를 선택하세요!");
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
		jobArr = jobArr + "^" +rowItem.item.placeNo;
		sumPrice = sumPrice + rowItem.item.sumPrice;
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
	sumPrice = Math.round(sumPrice); //소수점 반올림처리 2023.07.25 bk
	if (errCnt2 > 0) {
		errCustNameArr="";
		for (var l=0, len3 = custArr.length; l < len3; l++) {
			errCustNameArr = errCustNameArr + "/"+custArr[l];
		}
		alert("발주처가 다른 경우 출금요청을 할 수 없습니다!!\n\n선택된 발주처: "+errCustNameArr);
		return;
	}
	
	//console.log("rowItem:"+JSON.stringify(rowItem));
	// console.log("sumPrice:"+sumPrice);
	$.fancybox.open({
	  href : '/biz/wd-req-up?wdReqType=발주출금&custCode='+custCode+'&custName='+encodeURIComponent(custName)+'&sumPrice='+sumPrice+'&jobArr='+encodeURIComponent(jobArr)    , // 불러 올 주소
	  type : 'iframe',
	  width : '60%',
	  height : '60%',
	  padding :0,
	  fitToView: false,
	  autoSize : false,
	  modal :true
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
		
		
