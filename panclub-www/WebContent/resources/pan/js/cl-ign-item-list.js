

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
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	//set branch 2023.06.30
  	branchCodeSelect("/base/code-list")	
	//srCodeSelect("/base/sr-list");  //2023.12.05 hsg
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y"; 
        
        var page = info[0];
        var orderGroupId = info[1];
        var orderNo = info[2];
        var sYmd = info[3];
        var eYmd = info[4];
        var ymdIgnoreYN = info[5];
        var custCode = info[6];
        var carNo = info[7];
        var clType = info[8];
        var regUserName  = info[9];
        //var srCode  = info[10];   //2023.12.05
        
        
 		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		//var custCode = $("#custCode").val(); 
		//var carNo = $("#carNo").val();  
		   
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
        if ( typeof orderNo == 'undefined'){ orderNo = ''}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        
        if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof carNo == 'undefined'){ carNo = ''	}
        if ( typeof clType == 'undefined'){ clType = ''	}
		if ( typeof regUserName == 'undefined'){ regUserName = ''	}
		//if ( typeof srCode == 'undefined'){ srCode = ''	}
       console.log(regUserName); 
    
    	$("#orderGroupId").val(orderGroupId);
    	$("#orderNo").val(orderNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		//console.log("sYmd : "+ sYmd);
		//console.log("eYmd : "+ eYmd);
		
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		$("#custCode").val(custCode);
		$("#carNo").val(carNo);
		$("#clType").val(clType);
		$("#regUserName").val(regUserName);
		//$("#srCode").val(srCode);
		
        findOrderGroupItem('/order/clIgnItemList');
        
		if($("#custCode").val() !== '' && $("#clType").val() === '일반' ){
			$("#regClReq").prop("disabled", false);
		}else{
			$("#regClReq").prop("disabled", true);
		}
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
			var currentPage = 1;
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderGroupId_val = $("#orderGroupId").val(); 
			var orderNo_val = '';
			 
	 		var ymdIgnoreYN = "N";
			if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
				ymdIgnoreYN = "Y";
			}	
			var custCode_val = $("#custCode").val(); 
			var carNo_val = $("#carNo").val();  
			var clType_val = $("#clType").val();
			var regUserName_val = $("#regUserName").val();
			//var srCode = $("#srCode").val();
							
			document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode_val+"!"+carNo_val+"!"+clType_val+"!"+"!"+regUserName_val;
			
			findOrderGroupItem('/order/clIgnItemList');			
			
			if($("#custCode").val() !== '' && $("#clType").val() === '일반' ){
				$("#regClReq").prop("disabled", false);
			}else{
				$("#regClReq").prop("disabled", true);
			}
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
	
	{ dataField : "orderNo",    headerText : "주문번호", width : 90 , visible : true } 
	,{ dataField : "orderSeq",    headerText : "주문순번", width : 56 , visible : true } 
	,{ dataField : "rlYmd",     headerText : "출고일자", width : 90 , visible : false }
	,{ dataField : "regYmd",     headerText : "제외일자", width : 90  }
	,{ dataField : "custCode",     headerText : "주문처코드", width : 70 }
	,{ dataField : "custName",     headerText : "주문처", width : 120, style : "left" }
	,{dataField : "clType",      headerText : "일반/보험",width : 80}
	,{ dataField : "carNo",   headerText : "차번" ,width : 80 }
	,{ dataField : "makerCode",   headerText : "제조사", width : 68  , visible : false }
	,{ dataField : "carType",   headerText : "차종", style : "left" ,width : 60 }  
	,{ dataField : "className",      headerText : "구분", width : 50, editable : false }       
	,{ dataField : "itemId",     headerText : "부품ID", width : 70  }
	,{ dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    }
	,{ dataField : "itemNo",     headerText : "품번", width : 120  }
	, { dataField: "factoryNo", headerText: "공장품번", width: 60 }
	,{ dataField : "itemName",     headerText : "품명", width : 120 , style : "left" }
	, { dataField: "orderCnt", headerText: "주문수량",width : 80, dataType: "numeric",formatString: "#,##0" , visible : false}
	, { dataField: "rlCnt", headerText: "수량",width : 56 , dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "unitPrice",      headerText : "단가", style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	,{ dataField : "salePrice",      headerText : "할인단가", style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	//,{ dataField : "salePrice",      headerText : "공급가액", style:"right" , dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "sumPrice",      headerText : "공급가액", style:"right" , dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "taxPrice",      headerText : "세액", style:"right" , dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "totalPrice",      headerText : "합계금액", style:"right" , dataType: "numeric",formatString: "#,##0"}
	,{ dataField : "memo1",    headerText : "사유1", width : 90} 
	,{ dataField : "memo2",    headerText : "사유2", width : 90} 
	,{ dataField : "branchCode",   headerText : "관리지점" , width: 70}//2023.06.30 bk
	,{ dataField : "orderGroupId",    headerText : "주문그룹ID", width : 90} 
	,{ dataField: "rlNo", headerText: "출고번호", width: 90, editable: false }
	,{ dataField: "rlSeq", headerText: "출고순번", width: 56, editable: false }
	,{ dataField : "regUserName",      headerText : "담당자"    }
	,{ dataField : "procUserName",      headerText : "처리자"    }
	,{ dataField: "clReqYN", headerText: "청구요청상태" , visible : false  }
		
];

 
 var footerLayout = [
		{ labelText: "합계", positionField: "#base", style: "aui-grid-my-column" },
		{ dataField: "orderCnt", positionField: "orderCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "rlCnt", positionField: "rlCnt", operation: "SUM", formatString: "#,##0" },
		{ dataField: "sumPrice", positionField: "sumPrice", operation: "SUM", formatString: "#,##0" },
		{ dataField: "taxPrice", positionField: "taxPrice", operation: "SUM", formatString: "#,##0" },
		{ dataField: "totalPrice", positionField: "totalPrice", operation: "SUM", formatString: "#,##0" }	
		
			];
			
			
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	
	var auiGridProps = {			
		//editable :htrue,			
		// 셀 병합 실행
		enableCellMerge: true,
		// 상태 칼럼 사용
		//showStateColumn : true
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,
	
		showAutoNoDataMessage : false,
		
		selectionMode: "multipleCells",
		enableFilter: true,
		filterLayerWidth: 280,
		filterLayerHeight: 340,
		showFooter: true,
		rowSelectionWithMerge: true,
		footerRowCount: 1,
		footerHeight: 24
		
		,showStateColumn : true
		,// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,
		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,
		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true

	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);
	
	var rowPos = 'first';
	// 선택 변경 이벤트 바인딩
	
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell;
	// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});
	
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
	
	
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		//console.log("columnIndex:"+event.columnIndex);  
		if (event.columnIndex == 0) {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderNo_val = $("#orderNo").val(); 
			var orderGroupId_val = $("#orderGroupId").val();
			
	 		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
			if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
				ymdIgnoreYN = "Y";
			}	
	
			var custCode_val = $("#custCode").val(); 
			var carNo_val = $("#carNo").val();  
			var clType_val = $("#clType").val();
			var regUserName = $("#regUserName").val();
							
			document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode_val+"!"+carNo_val+"!"+clType_val+"!"+regUserName;

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

$(document).keydown(function(e) {
  if (e.which == 120) {
    $('#btnFind').click();}
	});


//품목 조회
function findOrderGroupItem(url) {
	setStartSpinner();

	var list = [];
	var orderGroupId = $("#orderGroupId").val();
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var custCode = $("#custCode").val(); 
	var carNo = $("#carNo").val();  
    var regUserName = $("#regUserName").val();
    var clType = $("#clType").val();  
	
	var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
	//var srCode = $("#srCode").val(); //2023.12.05 
	
	var ymdIgnoreYN = "N";// 230710 yoonsang
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"orderGroupId": orderGroupId,
			"custCode":custCode,
			"carNo" : carNo ,
			"regUserName" : regUserName,
			"clType" : clType ,
			"workingType": "CLIGN_ITEM_LIST",
			"branchCode":branchCode	
			,"ymdIgnoreYN":ymdIgnoreYN
			//,"srCode": srCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			
			if (data.clIgnItemList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");	
				AUIGrid.clearGridData(myGridID);
				setStopSpinner();						              
			} else {
				
				if(clType == "일반"){}
				else if(clType == "보험"){}
				else{}

				for (i = 0; i < data.clIgnItemList.length; i++) {
					//console.log("minus check : " + data.noClItemList[i].minusClYN)
					// if (data.noClItemList[i].clReqYN !== "Y" || data.noClItemList[i].minusClYN == "Y") {
						if (i==0) {
							$("#dataComCode").val(data.clIgnItemList[i].comCode);  //2023.07.18 by dataCheck
						}
						
						var sPrice = 0;
						if(data.clIgnItemList[i].clType == '일반'){sPrice = data.clIgnItemList[i].salePrice}
						else{sPrice = data.clIgnItemList[i].unitPrice}
						
						/*
						var setMinus = 0;
						if(data.noClItemList[i].minusClYN == "Y"){setMinus = -1;}
						else{setMinus=1;}					
						*/
						
						list.push({
							idx: i
							, rlNo: data.clIgnItemList[i].rlNo
							, rlSeq: data.clIgnItemList[i].rlSeq
							, rlYmd: data.clIgnItemList[i].rlYmd
							,custCode : data.clIgnItemList[i].custCode
							,custName : data.clIgnItemList[i].custName
							, orderNo: data.clIgnItemList[i].orderNo
							, orderSeq: data.clIgnItemList[i].orderSeq
							, orderGroupId: data.clIgnItemList[i].orderGroupId
							, clType: data.clIgnItemList[i].clType
							, itemId: data.clIgnItemList[i].itemId
							, itemNo: data.clIgnItemList[i].itemNo
							, itemName: data.clIgnItemList[i].itemName
							, itemNameEn: data.clIgnItemList[i].itemNameEn
							, storageMoveReqStatus: data.clIgnItemList[i].storageMoveReqStatus
							, placeReqStatus: data.clIgnItemList[i].placeReqStatus
							, releaseReqStaus: data.clIgnItemList[i].releaseReqStaus
							, reinStatus: data.clIgnItemList[i].reinStatus
							, reoutStatus: data.clIgnItemList[i].reoutStatus
							, rlCnt: data.clIgnItemList[i].rlCnt 
							, stockReqCnt: data.clIgnItemList[i].stockReqCnt
							, stockUseCnt: data.clIgnItemList[i].stockUseCnt
							, placeCnt: data.clIgnItemList[i].placeCnt
							, reinCnt: data.clIgnItemList[i].reinCnt
							, reoutCnt: data.clIgnItemList[i].reoutCnt
							, finalCnt: data.clIgnItemList[i].finalCnt
	
							, orderCnt: data.clIgnItemList[i].orderCnt
							, unitPrice: data.clIgnItemList[i].unitPrice
							, salePrice: data.clIgnItemList[i].salePrice
							, sumPrice: sPrice * data.clIgnItemList[i].rlCnt
							, taxPrice: Math.round(sPrice * data.clIgnItemList[i].rlCnt * 0.1)
							, totalPrice: Math.round(sPrice * data.clIgnItemList[i].rlCnt *1.1)
						
							
							, placeUnitPrice: data.clIgnItemList[i].placeUnitPrice
							, placeCustCode: data.clIgnItemList[i].placeCustCode
							, placeCustName: data.clIgnItemList[i].placeCustName
	
							, whStockCnt: data.clIgnItemList[i].whStockCnt
							, storUseReqStatus: data.clIgnItemList[i].storUseReqStatus
	
							, storMvReqCnt: data.clIgnItemList[i].storMvReqCnt
							, plReqCnt: data.clIgnItemList[i].plReqCnt
							, rlReqCnt: data.clIgnItemList[i].rlReqCnt
							, riCnt: data.clIgnItemList[i].riCnt
							, roCnt: data.clIgnItemList[i].roCnt
	
							, clReqYN: data.clIgnItemList[i].clReqYN
							, clYN: data.clIgnItemList[i].clYN
							, carNo: data.clIgnItemList[i].carNo
							, regUserName: data.clIgnItemList[i].regUserName
							, makerCode: data.clIgnItemList[i].makerCode
							, carType: data.clIgnItemList[i].carType
							
							, branchCode: data.clIgnItemList[i].branchCode
							
							, className: data.clIgnItemList[i].className
							, makerName: data.clIgnItemList[i].makerName
							, factoryNo: data.clIgnItemList[i].factoryNo
							
							, regYmd: data.clIgnItemList[i].regYmd
							, memo1: data.clIgnItemList[i].memo1
							, memo2: data.clIgnItemList[i].memo2
							, procUserName: data.clIgnItemList[i].procUserName
						});
					//}
				}
				AUIGrid.setGridData("#grid_wrap", list);
				setStopSpinner();
			}
		},
		error: function(x, e) {
			setStopSpinner();
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)'); ㄹ
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












//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj,name) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	$(obj).val(rowItem.custCode);
	$("#"+name+"").val(rowItem.custName);
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");
	
}
	
//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	item = {
		itemId: rowItem.itemId,
		itemNo: rowItem.itemNo,
		itemName: rowItem.itemName,
		itemNameEn: rowItem.itemNameEn,
		salePrice: rowItem.salePrice
		, unitPrice: rowItem.salePrice
		, cnt: 1
		, saleUnitPrice: rowItem.salePrice 
		, sumPrice: rowItem.salePrice * 1
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}



$("#btnClIgnDel").click(function() {
	
	$.ajax({ url : '/permissionCheckYN' , 
		dataType : 'json',
		type : 'POST',
		
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
				checkCode : 'DF008_01'			// 메뉴추가하고 권한설정하기 
		},
		success : (result)=>{ 
			 
			if(result)
			{
				clIgnItemDel();
			}
			else 
			{
				alert('권한이 없습니다. 필요시 연구소로 문의해주세요.');
			}
		},
		error : (e)=>{
		}
		})
	
});



function clIgnItemDel() {
	
	setStartSpinner();
	//2023.07.18  hsg -검증데이터존재여부
    var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		setStopSpinner();
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		return;
	}


	var rowItem;
	let workingType = "CLIGN_DEL";
	let ordArr = "";
	let seqArr = "";
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		setStopSpinner();
		alert("청구제외할 품목을  선택해주세요!");
		return;
	}
	
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		ordArr = ordArr +  "^" + rowItem.item.orderNo;
		seqArr = seqArr +  "^" + rowItem.item.orderSeq;
		
	}
		
						
  
    $.ajax({
	    url : "/order/clIgnAdd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,						
			"dataComCode" : dataComCode,						
			"ordArr" : ordArr,    //주문번호
			"seqArr" : seqArr    //주문순번
		
	
		},
	    success: function(data) {
		    setStopSpinner();
	        alert(data.result_code+":"+data.result_msg);
			location.reload(true);
	
	    },
	    error:function(request, status, error){
		    setStopSpinner();
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
	
}
			