

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
var myGridID_detail;

$(document).ready(function(){
	//관리지점코드에 셋팅
  	branchCodeSelect("/base/code-list")	
  	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	createAUIGrid_detail(columnLayout_detail);
	//2023.06.30 bk
	findDataToServer("/order/esti-list-master-detail", 1);
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var estiNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var custCode = info[4];
        var supplyCustCode = info[5];  
        var ymdIgnoreYN = info[6];
        
   		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		      
        if ( typeof estiNo == 'undefined'){ estiNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof supplyCustCode == 'undefined'){ eYmd = ''	}
	    if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	    
        //console.log("sYmd:"+sYmd);
        $("#estiNo").val(estiNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#custCode").val(custCode);
		$("#supplyCustCode").val(supplyCustCode);
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		
        findDataToServer("/order/esti-list",page);
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var estiNo_val = $("#estiNo").val();
		var custCode_val = $("#custCode").val();
		var supplyCustCode_val = $("#supplyCustCode").val();
 		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
						
		document.location.hash = '#info'+currentPage+"!"+estiNo_val+"!"+sYmd+"!"+eYmd+"!"+custCode_val+"!"+supplyCustCode_val+"!"+ymdIgnoreYN;
		
		findDataToServer("/order/esti-list", 1);
		AUIGrid.clearGridData(myGridID_detail);
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
	 { dataField : "estiYmd",    headerText : "견적일자", width : 100} 
	,{ dataField : "estiNo",   headerText : "견적번호", width: 100,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "custCode",     headerText : "주문처코드"    }
	,{ dataField : "custName",     headerText : "주문처명", width : 120 , style:"left"  }
	,{ dataField : "supplyCustCode",   headerText : "납품처코드" }
	,{ dataField : "supplyCustName",   headerText : "납품처명" , style:"left" }
	,{ dataField : "carNo",   headerText : "차번" }
	,{ dataField : "makerName",      headerText : "제조사명"    }
	,{ dataField : "carType",      headerText : "차종"    }
	,{ dataField : "itemCnt",      headerText : "품목수", dataType: "numeric",formatString: "#,##0"  , style:"right", width:50}
	,{ dataField : "orderNum",      headerText : "주문갯수",  dataType: "numeric", formatString: "#,##0"  , style:"right"  ,width:70}
	,{ dataField : "salePrice",      headerText : "공급가액", dataType: "numeric", formatString: "#,##0"  , style:"right"}
	,{ dataField : "taxPrice",      headerText : "세액", dataType: "numeric", formatString: "#,##0"  , style:"right"}
	,{ dataField : "sumPrice",      headerText : "합계금액", dataType: "numeric",formatString: "#,##0"  , style:"right"}
	,{ dataField : "taxType",      headerText : "세액구분" , visible : false   }
	,{ dataField : "expectMarginRate",      headerText : "예상마진율", dataType: "numeric"  , style:"right"}
	,{ dataField : "branchCode",      headerText : "관리지점" , visible : false    }
	,{ dataField : "branchName",      headerText : "관리지점"    }
	,{ dataField : "regUserName",      headerText : "등록자"    }
	,{ dataField : "uptUserName",      headerText : "수정자"}
	,{ dataField : "modified",      headerText : "수정일시", width:180}
	
		
];

var columnLayout_detail = [		 
	 { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false }
	 
	,{ dataField : "dspNo",      headerText : "노출순서", width : 70 , style : "auigrid-opt-col-style"}
	,{ dataField : "estiSeq",      headerText : "견적순번", width : 70, editable : false, dataType: "numeric" }
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField : "itemId",      headerText : "부품ID", width : 140, editable : false }
	,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
	,{ dataField : "itemNo",      headerText : "품번", width : 140 , style:"left" } 
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
	,{ dataField : "itemName", headerText : "품명", width: 160, editable : true, style:"left"  } 

	,{ dataField: "dcExceptYN", headerText: "할인제외", width: 56, editable: false , visible : false}
	,{ dataField : "cnt",      headerText : "수량", width : 120, dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "unitPrice",     headerText : "단가", dataType: "numeric",formatString: "#,##0" }	     
	,{ dataField : "salePrice",     headerText : "할인단가", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
	,{ dataField : "taxPrice",     headerText : "세액", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
	,{ dataField : "sumPrice",     headerText : "합계", editable : false , dataType: "numeric",formatString: "#,##0" , style:"right" }
	,{ dataField : "importPrice",     headerText : "수입가", dataType: "numeric",formatString: "#,##0" , style:"right auigrid-opt-col-style" , visible : false }
	,{ dataField : "ceilUnit",     headerText : "올림단위", width: 56, dataType: "numeric",formatString: "#,##0" , style:"right", editable : false }
	,{ dataField : "memo",     headerText : "비고"  }
	,{ dataField : "placeCustCode",     headerText : "예정발주처코드"   }
	,{ dataField : "placeCustName",      headerText : "예정발주처명"}
	,{ dataField : "placeUnitPrice",      headerText : "발주단가" , dataType: "numeric",formatString: "#,##0"  }
	,{ dataField : "orderNo",      headerText : "주문번호" , editable : false,
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}    }
	,{ dataField : "orderSeq",      headerText : "주문순번", editable : false     }
];

var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "taxPrice",		positionField: "taxPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "salePrice",		positionField: "salePrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "itemCnt",		positionField: "itemCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "orderNum",		positionField: "orderNum",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			editable : false,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,			
			showAutoNoDataMessage : false,  //No Data display

			//selectionMode : "multipleCells",
			selectionMode : "singleRow",
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
		//var primeCell = event.primeCell;
		//event.item.estiNo
		AUIGrid.clearGridData(myGridID_detail); 
		
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
		if (event.dataField == "estiNo") {   
			var estiNo = event.item.estiNo
			window.open('/order/esti-up?estiNo='+estiNo, '_blank');
		}else{
			findEstiItem('/order/esti-item-list',event.item.estiNo);
		}
		/*
		if (event.dataField == "custName") {
			findEstiItem('/order/esti-item-list',event.item.estiNo);
		}*/
				
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
		ymdIgnoreYN = "Y";
	}

	var estiNo = $("#estiNo").val(); 
	var custCode = $("#custCode").val(); 
	var supplyCustCode = $("#supplyCustCode").val();
	var carNo = $("#carNo").val();
	 var ymdIgnoreYN  = "N";
	if ($('#ymdIgnoreYN ').is(':checked') == true){
		ymdIgnoreYN = "Y";};
	var branchCode = $("#branchCode").val();
	var regUserName = $("#regUserName").val(); //20230703 regusername srch 
	
	//if (spaceDel(estiNo)=='' && spaceDel(itemName)=='') {
	//	alert("부품번호 또는 부품명에 검색어를 입력하세요.");
	//	return false;
	//}
	
	//console.log("branchCode"+branchCode);
	//return;
		
		if ($('#ymdIgnoreYN').is(':checked') == true){
		   if ((!estiNo || estiNo.trim() == '' ) && (!carNo || carNo.trim() == '')
		   	 && (!custCode || custCode.trim() == '') && (!supplyCustCode || supplyCustCode.trim() == '')
		   	 && (!branchCode || branchCode.trim() == '')	 && (!regUserName || regUserName.trim() == '')) {
		    $("#iDiv_noSrchPop").text("ⓘ 조회조건을 하나 이상 입력하고 조회하세요");
	      	$("#iDiv_noSrchPop").css("display","block");
		      return false;
		   }
		}
	

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"estiNo":estiNo
			,"custCode":custCode
			,"supplyCustCode":supplyCustCode
			,"carNo" : carNo 
			,"branchCode" : branchCode,
			"regUserName" : regUserName  
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.estiList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				$("#iDiv_noDataPop").css("display","block");	
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.estiList.length;i++){
					list.push({
						 estiYmd: data.estiList[i].estiYmd 
						,estiNo: data.estiList[i].estiNo 
						,custCode: data.estiList[i].custCode 
						,custName: data.estiList[i].custName
						,supplyCustCode: data.estiList[i].supplyCustCode 
						,supplyCustName: data.estiList[i].supplyCustName 
						,carNo: data.estiList[i].carNo 
						,makerName: data.estiList[i].makerName 
						,carType: data.estiList[i].carType 
						,regUserName: data.estiList[i].regUserName 
						,sumPrice: data.estiList[i].salePrice + data.estiList[i].taxPrice
						,salePrice: data.estiList[i].salePrice
						,taxPrice: data.estiList[i].taxPrice
						,itemCnt: data.estiList[i].itemCnt
						,expectMarginRate: data.estiList[i].expectMarginRate 
						,uptUserName: data.estiList[i].uptUserName 
						,uptYmd: data.estiList[i].uptYmd
						,taxType: data.estiList[i].taxTypeName
						,modified: data.estiList[i].modified
						,orderNum: data.estiList[i].orderNum
						,branchCode: data.estiList[i].branchCode
						,branchName: data.estiList[i].branchName
						
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


$(document).keydown(function(e) {
  if (e.which == 120) {
    $('#btnFind').click();}
	});
	

function createAUIGrid_detail(columnLayout) {
	
	
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
		dataField: "unitPrice",
		positionField: "unitPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "salePrice",
		positionField: "salePrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "sumPrice",
		positionField: "sumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	},
	{
		dataField: "placeUnitPrice",
		positionField: "placeUnitPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, 
	{
		dataField: "inPrice",
		positionField: "inPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}];
	
	// 그리드 속성 설정
	var gridPros = {

		editable : false,			
		
		// singleRow 선택모드
		//selectionMode: "multiRow",
		
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		//enableDrag: true,
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		//enableMultipleDrag: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		//enableDragByCellDrag: false,
		// 드랍 가능 여부 (기본값 : true)
		//enableDrop: true,
		
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		//showRowCheckColumn: true, //체크박스 표시 설정
        // 전체 선택 체크박스가 독립적인 역할을 할지 여부
		//independentAllCheckBox: true,
		
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		//enterKeyColumnBase: true,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
						
		// 엑스트라 체크박스 표시 설정
		//showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		//enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		//showRowAllCheckBox: true,
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		
		// 푸터를 상단에 출력시킴(기본값: "bottom")
    	//footerPosition : "top",
		//footer 노출
		showFooter: true,

       //sortableByFormatValue :true,
			
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		/*
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.orderNo != "") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.orderNo != "") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}
		*/		
	};
	
	myGridID_detail = AUIGrid.create("#grid_wrap_detail", columnLayout, gridPros);

	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID_detail, footerLayout);		
		
	
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID_detail, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
	});
	
	AUIGrid.bind(myGridID_detail, "cellDoubleClick", function (event) {

		//console.log("columnIndex:"+event.columnIndex);  
		if (event.dataField == "orderNo") {   
			
			var orderNo = event.item.orderNo
			window.open('/order/order-up?orderNo='+orderNo, '_blank');
		}
				
	});

		
};

function findEstiItem(url,estiNo) {
	var list = [];

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"estiNo":estiNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.estiItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.estiItemList.length;i++){
					dspNo = data.estiItemList[i].dspNo;
					if (dspNo == 0) {
						dspNo = 999;
					}
				    list.push({
						 idx: data.estiItemList[i].estiSeq
						,dspNo: dspNo
						,estiSeq: data.estiItemList[i].estiSeq 
						,itemId: data.estiItemList[i].itemId 
						,itemNo: data.estiItemList[i].itemNo 
						,itemName: data.estiItemList[i].itemName
						,itemNameEn: data.estiItemList[i].itemNameEn 
						,cnt: data.estiItemList[i].cnt 
						,salePrice: data.estiItemList[i].salePrice 
						,sumPrice: data.estiItemList[i].salePrice * data.estiItemList[i].cnt
						,supplyPrice: data.estiItemList[i].supplyPrice 						
						,supplySumPrice: data.estiItemList[i].supplySumPrice 
						,importPrice: data.estiItemList[i].importPrice 
						,memo: data.estiItemList[i].memo 
						,placeUnitPrice: data.estiItemList[i].placeUnitPrice
						,placeCustCode: data.estiItemList[i].placeCustCode
						,placeCustName: data.estiItemList[i].placeCustName
						,unitPrice:  data.estiItemList[i].unitPrice
						,orderNo:  data.estiItemList[i].orderNo
						,orderSeq:  data.estiItemList[i].orderSeq
						,dcExceptYN:  data.estiItemList[i].dcExceptYN
						,ceilUnit:  data.estiItemList[i].ceilUnit
						,taxPrice:  data.estiItemList[i].taxPrice
						,makerName:  data.estiItemList[i].makerName
						,className:  data.estiItemList[i].className
						,factoryNo:  data.estiItemList[i].factoryNo
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap_detail", list);
				
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

