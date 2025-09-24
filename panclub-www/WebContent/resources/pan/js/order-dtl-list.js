
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID3;
var myGridIDItem;
var myGridIDCust;
var myGridIDCustMgr;

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


$(document).ready(function(){
	
	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	//관리지점코드에 셋팅
  	branchCodeSelect("/base/code-list")
	//제조사코드에 셋팅
  	makerCodeSelect("/base/code-list")
  	

	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	


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
        
  		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		
		var custCode = info[5];
		var supplyCustCode = info[6];
		var carNo = info[7];
		
		var itemNo = info[8];
		var orderGroupId = info[9];
		var itemId = info[10];
		var branchCode = info[11];
		var regUserName = info[12];
		var rlStatus = info[13];
		var rlrStatus = info[14];
		
		let priceDifferYN = info[15];
		       
        if ( typeof orderNo == 'undefined'){ orderNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	    if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	    if ( typeof custCode == 'undefined'){ custCode = ''	}
	    if ( typeof supplyCustCode == 'undefined'){ supplyCustCode = ''	}
	    if ( typeof carNo == 'undefined'){ carNo = ''	}

		if ( typeof itemNo == 'undefined'){ itemNo = ''	}
		if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
		if ( typeof itemId == 'undefined'){ itemId = ''	}
		if ( typeof branchCode == 'undefined'){ branchCode = ''	}
		if ( typeof regUserName == 'undefined'){ regUserName = ''	}
		if ( typeof rlStatus == 'undefined'){ rlStatus = ''	}
		if ( typeof rlrStatus == 'undefined'){ rlrStatus = ''	}
		if ( typeof priceDifferYN == 'undefined'){ priceDifferYN = ''	}
	    

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
		
		$("#itemNo").val(itemNo);
		$("#orderGroupId").val(orderGroupId);
		$("#itemId").val(itemId);
		$("#branchCode").val(branchCode);
		$("#regUserName").val(regUserName);
		$("#rlStatus").val(rlStatus);
		$("#rlrStatus").val(rlrStatus);		
		if (priceDifferYN == 'Y') {
			$('#priceDifferYN').prop('checked', true);
		}else{
			$('#priceDifferYN').prop('checked', false);
		}
		
        findOrderItem("/order/order-item-list",page);
  	}
  			
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
		
		var itemNo = $("#itemNo").val();
		var orderGroupId = $("#orderGroupId").val(); 		
		var itemId = $("#itemId").val();
		var branchCode = $("#branchCode").val();
		var regUserName = $("#regUserName").val();
		var rlStatus = $("#rlStatus").val();
		var rlrStatus = $("#rlrStatus").val();		
		let priceDifferYN = "N";
		if ($('input:checkbox[name=priceDifferYN]').is(':checked') == true){
			priceDifferYN = "Y";
		}				
		document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+supplyCustCode+"!"+carNo+"!"+itemNo+"!"+orderGroupId+"!"+itemId+"!"+branchCode+"!"+regUserName+"!"+rlStatus+"!"+rlrStatus+"!"+priceDifferYN;
		
		findOrderItem('/order/order-item-list');	
		//findDataToServer("/order/order-group-list")
	});
	
	//목록에서 넘어오는 경우
	//console.log("o:"+$("#orderGroupId").val());
	//console.log("i:"+$("#itemId").val());
	if (($("#orderGroupId").val() != '' && $("#itemId").val() !== undefined) || ($("#itemId").val() != ''&& $("#itemId").val()!== undefined && $("#itemId").val() != '0')) {
		//alert("orderGroupId:"+orderGroupId);
		//alert("itemId:"+itemId);
		//if ($("#orderGroupId").val() != '' || $("#itemId").val() != '' ){
			$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		//}
		findOrderItem('/order/order-item-list');
	}
	
	
});




//주문그룹 선택 시  기존 주문번호 끌고오기  
function getCheckedRowItems() {
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID3);
	
	if (checkedItems.length <= 0) {
		alert("주문그룹을 선택해주세요");
		return;
	}
	var rowItem = checkedItems[0].item;
	//console.log("item11111111"+JSON.stringify(checkedItems[0].item));
	
	$("#orderGroupId").val(rowItem.orderGroupId);
	$("#custCode").val(rowItem.custCode);
	$("#custName").val(rowItem.custName);
	$("#supplyCustCode").val(rowItem.supplyCustCode);
	$("#supplyCustName").val(rowItem.supplyCustName);
	$("#supplyCustName").val(rowItem.supplyCustName);
	$("#makerCode").val(rowItem.makerCode);
	$("#carType").val(rowItem.carType);
	$("#vinNo").val(rowItem.vinNo);
	$("#dcRate").val(rowItem.dcRate);
	$("#colorCode").val(rowItem.colorCode);
	
	$("#custMgrName").val(rowItem.custMgrName);
	$("#custMgrPhone").val(rowItem.custMgrPhone);
	$("#supplyMgrPhone").val(rowItem.supplyMgrPhone);
	$("#supplyMgrName").val(rowItem.supplyCustName);
	
	$("#memo1").val(rowItem.memo1);
	$("#memo2").val(rowItem.memo2);
	
	$("#insure1Code").val(rowItem.insure1Code);
	$("#insure1Name").val(rowItem.insure1Name);
	$("#insure1MgrName").val(rowItem.insure1MgrName);
	$("#insure1MgrPhone").val(rowItem.insure1MgrPhone);
	$("#insure2Code").val(rowItem.insure2Code);
	$("#insure2Name").val(rowItem.insure2Name);
	$("#insure2MgrName").val(rowItem.insure2MgrName);
	$("#insure2MgrPhone").val(rowItem.insure2MgrPhone);
	
	$("#insure1AcceptNo").val(rowItem.insure1AcceptNo);
	$("#insure1AcciRate").val(rowItem.insure1AcciRate);
	$("#insure2AcceptNo").val(rowItem.insure2AcceptNo);
	$("#insure2AcciRate").val(rowItem.insure2AcciRate);
	
	$("#branchCode").val(rowItem.branchCode);
	          
	
}


	$("#btnCloseDialog").click(function() {

		$("#dialog-form-orderGroup").dialog("close");
	});

	$("#btnNewDialog").click(function() {

		$("#dialog-form-orderGroup").dialog("close");
	});

	$("#btnRegDialog").click(function() {
		getCheckedRowItems();
		$("#dialog-form-orderGroup").dialog("close");
		$("#existOrderNoti").css("display","none");	
	});
	
	
	
	
	
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}



// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false , visible : false }
		,{ dataField : "orderYmd",      headerText : "주문일", width : 70} 
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID", width : 86 ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
	    ,{ dataField : "orderNo",      headerText : "주문번호", width : 86 ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}	 
		,{ dataField : "orderSeq",      headerText : "주문순번", width : 56, editable : false , dataType: "numeric"}
		,{ dataField : "clType",      headerText : "청구구분", width : 56, editable : false}
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 86, editable : false,
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
		,{ dataField : "itemNo",      headerText : "품번", width : 100} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
		,{ dataField : "itemName", headerText : "품명", width: 160  , style : "left" } 
		,{ dataField: "dcExceptYN", headerText: "할인제외", width: 56, editable: false , visible : false }
		, {
			headerText: "창고 ",
			  headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '주문시점이 아닌 조회시점입니다.'
		    },
			children: [
				 { dataField: "whStockCnt", headerText: "보유", editable: false, width: 34, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	} }
				 ,{ dataField: "workableQty", headerText: "판매가능", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}}
				 ,{ dataField: "ctableQty", headerText: "회수가능", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	} }
				 ,{ dataField: "placeableQty", headerText: "발주가능", editable: false, width: 56, dataType: "numeric", formatString: "#,##0", 
				 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value>0) {	return "aui-grid-style-rightbold";	}	return "right";	}}
			]
		}	 
		,{ headerText : "수량", 
			children: [
			 { dataField : "cnt",      headerText : "주문", width : 40 , dataType: "numeric",formatString: "#,##0",
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; } }
			,{ headerText : "창고사용", 
				children: [		
				 { dataField : "suriCnt",      headerText : "요청", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; } }
				,{ dataField : "suiCnt",      headerText : "사용", width : 40 , dataType: "numeric",formatString: "#,##0"  ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }}
				]   }   
			,{ headerText : "발주", 
				children: [	   		
				 { dataField : "plriCnt",      headerText : "요청", width : 40 , dataType: "numeric",formatString: "#,##0"  ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }}
				,{ dataField : "pliCnt",      headerText : "발주", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; } }
				,{ dataField : "placeImportCnt",      headerText : "수입", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; } }
				]   }		
			,{ dataField : "whiCnt",      headerText : "입고", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; } }
				
			,{ headerText : "출고", 
				children: [	   		
				{ dataField : "rlrCnt",      headerText : "요청", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; } }
				,{ dataField : "rlCnt",      headerText : "출고", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; } }
				]   }	
			,{ headerText : "반입", 
				children: [
				{ dataField : "ririCnt",      headerText : "요청", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; } }
				,{ dataField : "riiCnt",      headerText : "반입", width : 40 , dataType: "numeric",formatString: "#,##0"  ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; }}
				]   }	
			,{ headerText : "반출", 
				children: [
				{ dataField : "roriCnt",      headerText : "요청", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; } }
				,{ dataField : "roiCnt",      headerText : "반출", width : 40 , dataType: "numeric",formatString: "#,##0"  ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }}
				]   }	
			,{ headerText : "재고투입", 
				children: [	   		
				{ dataField : "sirCnt",      headerText : "요청", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; } 
					//, visible : (lcd == 'ㄱ000')
					}
				,{ dataField : "sirChkCnt",      headerText : "처리", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-link-darkred"; } return null; } 
					//, visible : (lcd == 'ㄱ000')
					}
				]    
				}	
			,{ headerText : "청구", 
				children: [
				{ dataField : "clriCnt",      headerText : "요청", width : 40 , dataType: "numeric",formatString: "#,##0",
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; }  }
				,{ dataField : "cliCnt",      headerText : "진행", width : 40 , dataType: "numeric",formatString: "#,##0" ,
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") { return "auigrid-color-style-darkred"; } return null; } }
				, { dataField: "clYN", headerText: "완료", width: 40  
					,styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != '') { return "auigrid-color-style-darkred"; } return null; }
					 }
				, { dataField: "clIgnYN", headerText: "제외", width: 40  
					,styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) { if (value != '') { return "auigrid-color-style-darkred"; } return null; }
					,tooltip : {
					        tooltipFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
								if(item.clIgnYN == 'Y'){
									var str = "<span style='color:#f00;'>제외사유</span>";					     
						            str += "<br>사유1 : " + item.clIgnMemo1;
						            str += "<br>사유2 : " + item.clIgnMemo2;
						            
						            return str;									
								}
					           
					   	}
	   				} 
					}
				, { dataField: "clIgnMemo1", headerText: "제외사유1", width: 40  , visible: false }
				, { dataField: "clIgnMemo2", headerText: "제외사유2", width: 40  , visible: false }
				]
				}
				
			]   }   		
		,{ headerText : "가격", 
			children: [
			 { dataField : "centerPrice",     headerText : "센터가", width : 80, dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
			,{ dataField : "unitPrice",     headerText : "단가", width : 80, dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
			,{ dataField : "salePrice",     headerText : "할인단가", width : 80, dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
			,{ dataField : "sumPrice",     headerText : "합계", width : 80, editable : false , dataType: "numeric",formatString: "#,##0" , style:"right" }
			,{ dataField : "whUnitPrice",     headerText : "입고단가", width : 80, dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
			,{ dataField : "importPrice",     headerText : "수입가", width : 80, dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		]   }			
		,{ dataField : "memo",     headerText : "비고"}
		,{ headerText : "발주예상", 
			children: [
				 { dataField : "placeCustCode",     headerText : "발주처코드"}
				,{ dataField : "placeCustName",      headerText : "발주처명" 	, style : "left" 	 } 
				,{ dataField : "placeUnitPrice",      headerText : "예정발주단가", dataType: "numeric",formatString: "#,##0" }
	        ]
	    }    
		,{ headerText : "실제발주", 
			children: [
				 { dataField : "plCustCode",     headerText : "발주처코드", editable : false }
				,{ dataField : "plCustName",      headerText : "발주처명"  , style:"left " , editable : false  }
				,{ dataField : "plUnitPrice",      headerText : "예정발주단가", dataType: "numeric",formatString: "#,##0" , editable : false   , style:"right"  }
			]   }   						
		,{ dataField : "estiNo",      headerText : "견적번호" , editable : false  
				,styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
		,{ dataField : "estiSeq",      headerText : "견적순번", editable : false     }
		
		,{ dataField : "makerName",      headerText : "메이커명", editable : false     }
		,{ dataField : "custName",      headerText : "주문처", editable : false     }
		,{ dataField : "supplyCustName",      headerText : "납품처", editable : false     }
		,{ dataField : "carNo",      headerText : "차량번호", editable : false     }
		,{ dataField : "branchName",      headerText : "관리지점", editable : false     }
		,{ dataField : "regUserName",      headerText : "주문등록자", editable : false     }
	];
	
	// 푸터 설정
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"		
	}, {		dataField: "suriCnt",		positionField: "suriCnt",		operation: "SUM",		formatString: "#,##0"		
	}, {		dataField: "suiCnt",		positionField: "suiCnt",		operation: "SUM",		formatString: "#,##0"		
	}, {		dataField: "plriCnt",		positionField: "plriCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "pliCnt",		positionField: "pliCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "whiCnt",		positionField: "whiCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "ririCnt",		positionField: "ririCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "riiCnt",		positionField: "riiCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "roriCnt",		positionField: "roriCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "roiCnt",		positionField: "roiCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "clriCnt",		positionField: "clriCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "cliCnt",		positionField: "cliCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "rlCnt",		positionField: "rlCnt",		operation: "SUM",		formatString: "#,##0"		
	}, {		dataField: "rlrCnt",		positionField: "rlrCnt",		operation: "SUM",		formatString: "#,##0"
	}, {		dataField: "unitPrice",		positionField: "unitPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"
	}, {		dataField: "salePrice",		positionField: "salePrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"
	}, {		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"
	}, {		dataField: "supplyPrice",		positionField: "supplyPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"
	}, {		dataField: "supplySumPrice",		positionField: "supplySumPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"
	}, {		dataField: "inPrice",		positionField: "inPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"
	}, {		dataField: "whUnitPrice",		positionField: "whUnitPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"
	}];
	
	// 그리드 속성 설정
	var gridPros = {

		editable : false,			
		// singleRow 선택모드
		selectionMode: "multiRow",
		
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		enableDrag: true,
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		enableMultipleDrag: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		enableDragByCellDrag: false,
		// 드랍 가능 여부 (기본값 : true)
		enableDrop: true,
		
		// 상태 칼럼 사용
		showStateColumn : false,
		//rowIdField: "idx",
		//showRowCheckColumn: false,
		// 고정칼럼 카운트 지정
		fixedColumnCount: 8,
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enterKeyColumnBase: false,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		
		//footer 노출
		showFooter: true,
		showTooltip : true,
		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);

	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	//AUIGrid.bind(myGridID, "cellEditBegin", auiCellEditingBeginHandler);
			
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	//AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);


	/*
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		console.log("aa");
	});
	*/
	
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
			
			var itemNo = $("#itemNo").val();
			var orderGroupId = $("#orderGroupId").val(); 		
			var itemId = $("#itemId").val();
			var branchCode = $("#branchCode").val();
			var regUserName = $("#regUserName").val();
			var rlStatus = $("#rlStatus").val();
			var rlrStatus = $("#rlrStatus").val();		
							
			document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+supplyCustCode+"!"+carNo+"!"+itemNo+"!"+orderGroupId+"!"+itemId+"!"+branchCode+"!"+regUserName+"!"+rlStatus+"!"+rlrStatus;

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
		var orderNo = event.item.orderNo
		window.open('/order/order-up?orderNo=' + orderNo, '_blank');
		}		
		
		if (event.dataField == "orderGroupId") {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
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
			
			var itemNo = $("#itemNo").val();
			var orderGroupId = $("#orderGroupId").val(); 		
			var itemId = $("#itemId").val();
			var branchCode = $("#branchCode").val();
			var regUserName = $("#regUserName").val();
			var rlStatus = $("#rlStatus").val();
			var rlrStatus = $("#rlrStatus").val();		
							
			document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+supplyCustCode+"!"+carNo+"!"+itemNo+"!"+orderGroupId+"!"+itemId+"!"+branchCode+"!"+regUserName+"!"+rlStatus+"!"+rlrStatus;
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
		var orderGroupId = event.item.orderGroupId
		window.open('/order/order-group-item-list?orderGroupId=' + orderGroupId, '_blank');
		}
		
		if (event.dataField == "estiNo") {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
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
			
			var itemNo = $("#itemNo").val();
			var orderGroupId = $("#orderGroupId").val(); 		
			var itemId = $("#itemId").val();
			var branchCode = $("#branchCode").val();
			var regUserName = $("#regUserName").val();
			var rlStatus = $("#rlStatus").val();
			var rlrStatus = $("#rlrStatus").val();		
							
			document.location.hash = '#info'+currentPage+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode+"!"+supplyCustCode+"!"+carNo+"!"+itemNo+"!"+orderGroupId+"!"+itemId+"!"+branchCode+"!"+regUserName+"!"+rlStatus+"!"+rlrStatus;

			//
	     	
	     	//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'estiNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/esti-up');
		    document.body.appendChild(f);
		    f.submit();
		}		
				
				//console.log("columnIndex:"+event.columnIndex);  
		if (event.dataField == "itemId") {   
			var itemId = event.item.itemId
			//console.log ("orderGroupId"+orderGroupId);	
			//var url = '/order/order-group-item-list?orderGroupId=' + orderGroupId;
			var url = '/order/order-dtl-list?itemId=' + itemId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			 newWindow.focus();
		}		
		
		if (event.dataField == "suriCnt") { //창고사용요청     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/storage-use-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "suiCnt") { // 창고사용    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/storage-use-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "plriCnt") { //발주요청2023.08.03    
			var orderGroupId = event.item.orderGroupId
			var sYmd = '2023-07-01';
			var eYmd = '2023-08-03';
			
			var url = '/order/place-req-item-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "pliCnt") { // 발주    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/place-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "whiCnt") { //입고 2023.08.04    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/wh-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y&itemId='+itemId;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "rlrCnt") { //출고요청 2023.08.04    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/rl-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "rlCnt") { //  출고    
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/rl-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "ririCnt") { //     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ri-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "riiCnt") { //     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ri-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "roriCnt") { //     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ro-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "roiCnt") { //     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/logis/ro-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "clriCnt") { //     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/cl-req-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "cliCnt") { //     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/cl-group-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} else if (event.dataField == "clYN") { //     
			var orderGroupId = event.item.orderGroupId;
			var itemId = event.item.itemId
			var url = '/order/cl-group-list?orderGroupId=' + orderGroupId + '&ymdIgnoreYN=Y';
			var newWindow = window.open(url, '_blank');
			newWindow.focus();
		} 
		
	});
	
};






//품목 조회
function findOrderItem(url) {
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var list = [];
	var itemId = $("#itemId").val();
	if(itemId == '' ||itemId == null ){
		itemId=0;
	}
	var itemNo = $("#itemNo").val();
	var orderGroupId = $("#orderGroupId").val();
	var orderNo = $("#orderNo").val();
	var carNo = $("#carNo").val();
	var custCode = $("#custCode").val(); 
	//var supplyCustCode = $("#supplyCustCode").val();
	var placeCustCode = $("#placeCustCode").val();   //2023.08.03
	var branchCode = $("#branchCode").val();
	var regUserName = $("#regUserName").val(); 
	var rlStatus = $("#rlStatus").val();
	var rlrStatus = $("#rlrStatus").val();
	
	var workingType = "LIST";
    var ymdIgnoreYN  = "N";
	if ($('#ymdIgnoreYN ').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
    
    let priceDifferYN  = "N";
	if ($('#priceDifferYN ').is(':checked') == true){
		priceDifferYN = "Y";
	}    
    
   	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!itemNo || itemNo.trim() == '' ) && (!orderNo || orderNo.trim() == '') && (!orderGroupId || orderGroupId.trim() == '')
	       && (!carNo || carNo.trim() == '') && (!itemId || itemId.trim() == '' || itemId == 0) && (!branchCode || branchCode.trim() == '') 
	       && (!regUserName || regUserName.trim() == '') && (!custCode || custCode.trim() == '') && (!placeCustCode || placeCustCode.trim() == '') 
	       && (!rlStatus || rlStatus.trim() == '') && (!rlrStatus || rlrStatus.trim() == '') ) {		
	      alert("조회 조건을 하나 이상 입력해주세요.");
	      return false;
	   }
	}
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": workingType,
			"sYmd": sYmd,
			"eYmd": eYmd,
			"orderGroupId":orderGroupId,
			"orderNo":orderNo,
			"itemId":itemId,
			"itemNo":itemNo,
			"orderGroupId":orderGroupId,
			"ymdIgnoreYN": ymdIgnoreYN,
			"carNo": carNo
			,"custCode":custCode
			//,"supplyCustCode":supplyCustCode
			,"branchCode" : branchCode 
			,"regUserName" : regUserName
			,"rlStatus" : rlStatus
			,"rlrStatus" : rlrStatus
			,"placeCustCode" : placeCustCode		
			,priceDifferYN
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){ 
			if (data.orderItemList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				data.orderItemList.sort((a,b)=>a.orderNo-b.orderNo || a.dspNo - b.dspNo || parseFloat(a.orderSeq) - parseFloat(b.orderSeq)); //2024.06.18 sg	
				for(i=0;i<data.orderItemList.length;i++){
					dspNo = data.orderItemList[i].dspNo;
					//if (dspNo == 0) {  //2024.06.18 sg 주석처리	 
					//	dspNo = 999;
					//}
					 
				    list.push({
						 idx: data.orderItemList[i].orderSeq
						,dspNo: dspNo
						,orderNo: data.orderItemList[i].orderNo 
						,orderGroupId: data.orderItemList[i].orderGroupId 
						,orderSeq: data.orderItemList[i].orderSeq 
						,itemId: data.orderItemList[i].itemId 
						,itemNo: data.orderItemList[i].itemNo 
						,itemName: data.orderItemList[i].itemName
						,itemNameEn: data.orderItemList[i].itemNameEn 
						,cnt: data.orderItemList[i].cnt 
						,unitPrice: data.orderItemList[i].unitPrice
						,salePrice: data.orderItemList[i].salePrice 
						,sumPrice: data.orderItemList[i].sumPrice
						,supplyPrice: data.orderItemList[i].supplyPrice 						
						,supplySumPrice: data.orderItemList[i].supplySumPrice 
						,importPrice: data.orderItemList[i].importPrice 
						,memo: data.orderItemList[i].memo 
						,placeUnitPrice: data.orderItemList[i].placeUnitPrice
						,placeCustCode: data.orderItemList[i].placeCustCode
						,placeCustName: data.orderItemList[i].placeCustName
						,estiNo: data.orderItemList[i].estiNo
						,estiSeq: data.orderItemList[i].estiSeq
						,centerPrice: data.orderItemList[i].centerPrice
						
						,plUnitPrice: data.orderItemList[i].plUnitPrice
						,plCustCode: data.orderItemList[i].plCustCode
						,plCustName: data.orderItemList[i].plCustName
						,dcExceptYN: data.orderItemList[i].dcExceptYN
						
						,makerName: data.orderItemList[i].makerName
						,custName: data.orderItemList[i].custName
						,supplyCustName: data.orderItemList[i].supplyCustName
						,carNo: data.orderItemList[i].carNo
						,branchName: data.orderItemList[i].branchCode
						,regUserName: data.orderItemList[i].regUserName
						,rlCnt: data.orderItemList[i].rlCnt
						,rlrCnt: data.orderItemList[i].rlrCnt
						
						,suriCnt: data.orderItemList[i].suriCnt
						,suiCnt: data.orderItemList[i].suiCnt
						,plriCnt: data.orderItemList[i].plriCnt
						,pliCnt: data.orderItemList[i].pliCnt
						,whiCnt: data.orderItemList[i].whiCnt
						,ririCnt: data.orderItemList[i].ririCnt
						,riiCnt: data.orderItemList[i].riiCnt
						,roriCnt: data.orderItemList[i].roriCnt
						,roiCnt: data.orderItemList[i].roiCnt
						,clriCnt: data.orderItemList[i].clriCnt
						,cliCnt: data.orderItemList[i].cliCnt
						,whUnitPrice: data.orderItemList[i].whUnitPrice
						,orderYmd: data.orderItemList[i].orderYmd
						,clType: data.orderItemList[i].clType   //2023.08.04
						
						
						//2024.02.16 supi- 주문그룹상세내역에서처럼 창고의 보유,판매가능 ,회수가능 ,발주가능 수량 노출
						, whStockCnt: data.orderItemList[i].whStockCnt
						, workableQty: data.orderItemList[i].workableQty
						, ctableQty: data.orderItemList[i].ctableQty
						, placeableQty: data.orderItemList[i].placeableQty
						, placeImportCnt: data.orderItemList[i].placeImportCnt
						, sirChkCnt: data.orderItemList[i].sirChkCnt || 0
						, sirCnt: data.orderItemList[i].sirCnt || 0
						, className: data.orderItemList[i].className
						, factoryNo: data.orderItemList[i].factoryNo
						
						,clYN: data.orderItemList[i].clYN  //2024.09.04	yoonsang
						,clIgnYN: data.orderItemList[i].clIgnYN  //2024.09.12	yoonsang
						,clIgnMemo1: data.orderItemList[i].clIgnMemo1  //2024.09.12	yoonsang
						,clIgnMemo2: data.orderItemList[i].clIgnMemo2  //2024.09.12	yoonsang
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
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

$("#btnWorkByItem").click(function(){
	//var selIdx ,dataField, rowIdx
	//selIdx = AUIGrid.getSelectedIndex(myGridID);
		 
	//dataField = AUIGrid.getDataFieldByColumnIndex(myGridID, selIdx[1]);
	//var myValue = AUIGrid.getCellValue(myGridID, rowIdx, "itemNo");
	var itemNo = "";
	var selectedItems = AUIGrid.getSelectedItems(myGridID);
	if (selectedItems[0] !== undefined) {
    	itemNo = AUIGrid.getCellValue(myGridID, selectedItems[0].rowIndex, "itemNo");
    }
    //selectedItems[0].rowIndex;
    //var status =  AUIGrid.isRemovedByRowIndex(selectedItems[0].rowIndex);
	if (itemNo =='' || itemNo == null)	{
		alert("대상 부품번호를 선택하세요");
		return;
	}
	 
	var url = '/stats/work-by-item?itemNo=' + itemNo + '&ymdIgnoreYN=Y';
	var newWindow = window.open(url, '_blank');
	 newWindow.focus();
});