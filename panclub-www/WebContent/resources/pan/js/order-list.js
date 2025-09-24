

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



// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	
	//관리지점코드에 셋팅
	branchCodeSelect("/base/code-list")
		  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	//2023.06.30 bk
	findDataToServer("/order/order-list", 1);
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var orderNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var ymdIgnoreYN = info[4];
   
   //20240318 supi 변수 재선언으로 info[4]에 정보가 안들어와서 재선언부분 주석처리     
  //		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();  
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		
		var custCode = info[5];
		var supplyCustCode = info[6];
		var carNo = info[7];
		       
        if ( typeof orderNo == 'undefined'){ orderNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	    if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	    if ( typeof custCode == 'undefined'){ custCode = ''	}
	    if ( typeof supplyCustCode == 'undefined'){ supplyCustCode = ''	}
	    if ( typeof carNo == 'undefined'){ carNo = ''	}
	    
       // console.log("sYmd:"+sYmd);
        $("#orderNo").val(orderNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		$("#custCode").val(custCode);
		$("#supplyCustCode").val(supplyCustCode);
		$("#carNo").val(carNo);
		
        findDataToServer("/order/order-list",page);
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var orderNo_val = $("#orderNo").val(); 
 		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		
		var custCode = $("#custCode").val(); 
		var supplyCustCode = $("#supplyCustCode").val();
		var carNo = $("#carNo").val();
					
		document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+supplyCustCode+"!"+carNo;
		
		findDataToServer("/order/order-list", 1);
	});
	
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	
// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "orderYmd",    headerText : "주문일자", width : 68} 
	,{ dataField : "orderNo",   headerText : "주문번호", width: 86,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "orderGroupId",     headerText : "주문그룹ID", width : 86     ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
	,{ dataField : "custCode",     headerText : "주문처코드", width : 80     }
	,{ dataField : "custName",     headerText : "주문처명", width : 120   , style:"left"}
	,{ dataField : "supplyCustCode",   headerText : "납품처코드" , width : 80}
	,{ dataField : "supplyCustName",   headerText : "납품처명"   , style:"left", width : 120}
	,{ dataField : "carNo",   headerText : "차번" , width : 100 }
	,{ dataField : "makerName",      headerText : "제조사명"   , style:"left", width : 120  }
	,{ dataField : "carType",      headerText : "차종"  , style:"left", width : 120   }
	,{ dataField : "itemCnt",      headerText : "품목수", style:"right", width : 56 , dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "salePrice",      headerText : "공급가액", style:"right", dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "taxPrice",      headerText : "세액", style:"right", dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "sumPrice",      headerText : "합계금액", style:"right", dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "placeUnitAmt",      headerText : "발주예상액", style:"right", width : 90 , dataType: "numeric",formatString: "#,##0"
		,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '주문시 입력한 예정발주가기준의 예상 마진율로 참고만 하면 됩니다.'
	    }}
	,{ dataField : "expectMarginRate",      headerText : "발주예상마진율", style:"right", width : 120 , dataType: "numeric",formatString: "#,##0"
		,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '주문시 입력한 예정발주가기준의 예상 마진율로 참고만 하면 됩니다.'
	    }}
	,{ dataField : "costAmt",      headerText : "원가액", style:"right", width : 80 , dataType: "numeric",formatString: "#,##0"
		,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '주문시 입력한 예정발주가기준의 예상 마진율로 참고만 하면 됩니다.'
	    }}	    
	,{ dataField : "costMarginRate",      headerText : "원가(예상)마진율", style:"right", width : 120 , dataType: "numeric",formatString: "#,##0"
		,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '재고원가 기준의 예상 마진으로 원가확정 전에는 예상마진입니다.'
	    }}
	,{ dataField : "branchCode",      headerText : "관리지점" , visible : false    }
	,{ dataField : "branchName",      headerText : "관리지점"    }
	,{ dataField : "regUserName",      headerText : "등록자"    }
	,{ dataField : "uptUserName",      headerText : "수정자"}
	,{ dataField : "uptYmd",      headerText : "수정일자"}

		
];

var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "salePrice",		positionField: "salePrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "taxPrice",		positionField: "taxPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "itemCnt",		positionField: "itemCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "placeUnitAmt",		positionField: "placeUnitAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "costAmt",		positionField: "costAmt",		operation: "SUM",		formatString: "#,##0"	}, 
	
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
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
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
		if (event.dataField == "orderNo") {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderNo_val = $("#orderNo").val(); 
			
			var ymdIgnoreYN = "N";
			if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
				ymdIgnoreYN = "Y";
			}	
			
			var custCode = $("#custCode").val(); 
			var supplyCustCode = $("#supplyCustCode").val();
			var carNo = $("#carNo").val();
						
			document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+supplyCustCode+"!"+carNo;	
			//document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd;
			//
	     /*	
	     	//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-up');
		    document.body.appendChild(f);
		    f.submit();
		*/
		var orderNo = event.item.orderNo ; 
		window.open('/order/order-up?orderNo=' + orderNo, '_blank'); //새창으로 열기 
		
		}		
		
		if (event.dataField == "orderGroupId") {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderNo_val = $("#orderNo").val(); 
			
			var ymdIgnoreYN = "N";
			if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
				ymdIgnoreYN = "Y";
			}	
			
			var custCode = $("#custCode").val(); 
			var supplyCustCode = $("#supplyCustCode").val();
			var carNo = $("#carNo").val();
						
			document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+supplyCustCode+"!"+carNo;
				
			//document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd;
			//
	     	/*
	     	//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderGroupId');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-group-item-list');
		    document.body.appendChild(f);
		    f.submit();
		*/
		var orderGroupId = event.item.orderGroupId ; 
		window.open('/order/order-group-item-list?orderGroupId=' + orderGroupId, '_blank'); //새창으로 열기 
		}		
				
	});
		
}


function findDataToServer(url,page) {
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	var list = [];
	//var sYmd = $("#sYmd").val();
	//var eYmd = $("#eYmd").val();
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";	}

	var orderNo = $("#orderNo").val(); 
	var custCode = $("#custCode").val(); 
	var supplyCustCode = $("#supplyCustCode").val();
	var carNo = $("#carNo").val();
	var branchCode = $("#branchCode").val();
	
	var regUserName = $("#regUserName").val(); //20230703 regUsername srch
	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!orderNo || orderNo.trim() == '' ) && (!carNo || carNo.trim() == '')
	   	 && (!custCode || custCode.trim() == '') && (!supplyCustCode || supplyCustCode.trim() == '')
	   	 && (!branchCode || branchCode.trim() == '')&& (!regUserName || regUserName.trim() == '')) {
	      $("#iDiv_noSrchPop").text("ⓘ 조회조건을 하나 이상 입력하고 조회하세요");
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
			"ymdIgnoreYN":ymdIgnoreYN,
			"orderNo":orderNo
			,"custCode":custCode
			,"supplyCustCode":supplyCustCode
			,"carNo" : carNo 		
			,"branchCode" : branchCode ,
			"regUserName" : regUserName	
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				$("#iDiv_noDataPop").css("display","block");	
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderList.length;i++){
					list.push({
						 orderYmd: data.orderList[i].orderYmd 
						,orderNo: data.orderList[i].orderNo 
						,custCode: data.orderList[i].custCode 
						,custName: data.orderList[i].custName
						,supplyCustCode: data.orderList[i].supplyCustCode 
						,supplyCustName: data.orderList[i].supplyCustName 
						,carNo: data.orderList[i].carNo 
						,makerName: data.orderList[i].makerName 
						,carType: data.orderList[i].carType 
						,regUserName: data.orderList[i].regUserName 
						,sumPrice: data.orderList[i].salePrice + data.orderList[i].taxPrice
						,salePrice:data.orderList[i].salePrice 
						,taxPrice: data.orderList[i].taxPrice
						,itemCnt: data.orderList[i].itemCnt 
						,expectMarginRate: data.orderList[i].expectMarginRate + '%'
						,uptUserName: data.orderList[i].uptUserName 
						,uptYmd: data.orderList[i].modified
						,orderGroupId: data.orderList[i].orderGroupId
						,branchCode: data.orderList[i].branchCode
						,branchName: data.orderList[i].branchName
						,costMarginRate: data.orderList[i].costMarginRate
						,placeUnitAmt: data.orderList[i].placeUnitAmt
						,costAmt: data.orderList[i].costAmt
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}
				
				if(lcd == 'ㄱ121' && $("#pIgnoreYN").is(":checked")) // 그린파츠면서 제외 체크된 상태
				{
					list = list.filter((row)=>{ 
						if(row.custCode != 'ㄱ000') return true;
					})
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


// 데이터 요청 Ajax
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
					$("#makerCode").append("<option value='"+code+"' >"+code+" : "+codeName+"</option>");
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

  /*$(document).keypress(function(e) {
  if (e.which == 13) {
    $('#btnFind').click();}
	});
*/

	/*function checkYmd(){
		var estiNo = $('#orderNo ').val(); 
		var carNo = $('#carNo ').val(); 
		var custCode = $('#custCode ').val(); 
		var supplyCustCode = $('#supplyCustCode ').val(); 
		
		
		if ($('#ymdIgnoreYN ').is(':checked') == true){
			 if (orderNo == '' && carNo == ''&& custCode == ''&& supplyCustCode == ''){
				alert ("조회 조건을 하나 이상 입력해주세요.")
			}
		}
	}*/
	
	$(document).keydown(function(e) {
  if (e.which == 120) {
    $('#btnFind').click();}
	});
	

