
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

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
/*
var datepicker1 = new tui.DatePicker('#wrapper1', {
	language: 'ko',
	date: new Date(),
	input: {
		element: '#popPlRlYmd',
		format: 'yyyy-MM-dd'
	}
});
*/
    
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	
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
        var itemId = info[4];
        var itemNo = info[5];
        var orderGroupId = info[6];
        var custOrderNo = info[7];
        var placeNo = info[8];
        var custCode = info[9];
        var rcvCustCode = info[10];
        
        if ( typeof whNo == 'undefined'){ whNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof itemId == 'undefined'){ itemId = ''	}
        if ( typeof itemNo == 'undefined'){ itemNo = ''	}
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
        if ( typeof custOrderNo == 'undefined'){ custOrderNo = ''	}
        if ( typeof placeNo == 'undefined'){ placeNo = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof rcvCustCode == 'undefined'){ rcvCustCode = ''	}
        
	
        $("#whNo").val(whNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
        $("#itemId").val(itemId);
        $("#itemNo").val(itemNo);
        $("#orderGroupId").val(orderGroupId);
        $("#custOrderNo").val(custOrderNo);
        $("#placeNo").val(placeNo);
        $("#custCode").val(custCode);
        $("#rcvCustCode").val(rcvCustCode);
		
        findDataToServer("/order/pl-dtl-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var whNo_val = $("#whNo").val(); 
		var itemId_val = $("#itemId").val(); 
		var itemNo_val = $("#itemNo").val(); 
		var orderGroupId_val = $("#orderGroupId").val(); 
		var custOrderNo_val = $("#custOrderNo").val();
		var placeNo = $("#placeNo").val(); 
		var custCode = $("#custCode").val(); 
		var rcvCustCode = $("#rcvCustCode").val();
		 
				
		document.location.hash = '#info'+currentPage+"!"+whNo_val+"!"+sYmd+"!"+eYmd+"!"+itemId_val+"!"+itemNo_val+"!"+orderGroupId_val+"!"+custOrderNo_val+"!"+placeNo+"!"+custCode+"!"+rcvCustCode;
		
		findDataToServer("/order/pl-dtl-list", 1);
	});
	
		
	if ( $("#orderGroupId").val() != '' ) { 		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		
		findDataToServer("/order/pl-dtl-list", 1);
	}
	
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [
		{ dataField: "idx", headerText: "idx", width: 50, visible: false }		 
		,{ dataField : "comCode",      headerText : "요청업체코드", width : 100}
		,{ dataField : "comName",      headerText : "요청업체명", width : 100, style : "left"}
		,{ dataField : "placeYmd",      headerText : "발주일자", width : 100}
		,{ dataField : "placeNo",      headerText : "발주번호", width : 100,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
		,{ dataField : "placeSeq",      headerText : "발주순번", width : 100}
		,{ dataField : "placeCustCode",      headerText : "발주처코드", width : 100}
		,{ dataField : "placeCustName",      headerText : "발주처", width : 100, style : "left"}
		,{ dataField : "custOrderNo",      headerText : "거래처오더번호", width : 120}
		,{ dataField : "makerName",      headerText : "제조사", width : 50 }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 70 }
		,{ dataField : "itemNo",      headerText : "품번", width : 140} 
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }  
		,{ dataField : "itemName", headerText : "품명", width: 160, style : "left" } 
		,{ dataField : "cnt",      headerText : "발주수량", width : 60, dataType: "numeric",formatString: "#,##0"  , style:"right"}
		,{ dataField : "whCnt",     headerText : "입고수량" ,width : 60, dataType: "numeric",formatString: "#,##0"  , style:"right" }		
		,{ dataField : "whYmd",      headerText : "입고일자", width : 100}
		,{ dataField : "whNo",      headerText : "입고번호", width : 100}
		,{ dataField : "whSeq",      headerText : "입고순번", width : 100}
		,{ dataField : "saleUnitPrice",     headerText : "판매단가" , dataType: "numeric", width : 100, formatString: "#,##0"  , style:"right" }
		,{ dataField : "unitPrice",     headerText : "단가", dataType: "numeric", width : 100, formatString: "#,##0"  }
		,{ dataField : "salePrice",     headerText : "공급가액", dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"}
		,{ dataField : "taxPrice",     headerText : "세액",  dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "합계",  dataType: "numeric", width : 100, formatString: "#,##0"  , style:"right"}
		,{ dataField : "rcvCustCode",     headerText : "주문처코드", width: 80}
		,{ dataField : "rcvCustName",      headerText : "주문처명" , width: 150, style : "left"   	 }
		,{ dataField : "placeReqNo",      headerText : "발주요청번호" , width: 100 }
		,{ dataField : "reqSeq",      headerText : "발주요청순번" ,width : 80  }
		,{ dataField : "orderNo",     headerText : "주문번호",width : 100 }
		,{ dataField : "orderSeq",     headerText : "주문순번", width : 60}
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID"  ,width : 100 , 
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}   }
		,{ dataField : "carNo",      headerText : "차량번호" ,width : 80    }			
		,{ dataField : "whUnitPrice",     headerText : "입고단가",width: 100,dataType: "numeric",formatString: "#,##0"  , style:"right" }
		,{ dataField : "whSumPrice",     headerText : "입고금액", width: 100 , dataType: "numeric",formatString: "#,##0"  , style:"right" }
		,{ dataField : "regUserName",     headerText : "등록자", width: 80 }
		,{ dataField : "whRegUserName",     headerText : "입고처리자" , width: 80}
		,{ dataField : "memo1",     headerText : "비고1" ,  style : "left" }
		,{ dataField : "memo2",     headerText : "비고2" ,  style : "left" }
		,{ dataField : "created",     headerText : "등록일" , visible : false}
		,{ dataField : "modified",     headerText : "수정일" , visible : false}
	];

	// 푸터 설정
		var footerLayout = [{
			labelText: "∑",
			positionField: "#base",
			style: "aui-grid-my-column"
		}, {		dataField: "placeCnt",		positionField: "placeCnt",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}, 
		   {		dataField: "whCnt",		positionField: "whCnt",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}, 
		   {		dataField: "whUnitPrice",		positionField: "whUnitPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}, 
		   {		dataField: "whSumPrice",		positionField: "whSumPrice",		operation: "SUM",		formatString: "#,##0"		,style: "right"	}
		   
		];
		
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		//selectionMode: "multipleCells",
		editable : false,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		rowIdField: "idx",
		//showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		//showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		//enableRowCheckShiftKey: true,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// 전체 체크박스 표시 설정
		//showRowAllCheckBox: true,
		
		//footer 노출
		showFooter: true,
		showAutoNoDataMessage : false, 

		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);
		
             
	
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
	
	if (event.dataField == 'placeNo'){
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
		if (event.dataField == 'orderGroupId'){
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
		
	})
	
	

	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		console.log("aa");
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	
};


//품목 조회
function findDataToServer(url) {
	var workingType = "DTL";
    
    var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var list = [];
	
	var placeNo = $("#placeNo").val();
	var whNo = $("#whNo").val();
	var custOrderNo = $("#custOrderNo").val();
	var itemId = $("#itemId").val();
	if(itemId == '' ||itemId == null ){		itemId=0;	}
	
	var itemNo = $("#itemNo").val();
	var orderGroupId = $("#orderGroupId").val();
	var ymdIgnoreYN  = "N";
	if ($('#ymdIgnoreYN ').is(':checked') == true){
		ymdIgnoreYN = "Y";};
   
   	var rcvCustCode = $("#rcvCustCode").val();
   	var custCode = $("#custCode").val();
	const gvComCode = $('#gvComCode').val();
	
   	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!itemNo || itemNo.trim() == '' ) && (!whNo || whNo.trim() == '') && (!orderGroupId || orderGroupId.trim() == '') && (!custCode || custCode.trim() == '')
	        && (!placeNo || placeNo.trim() == '' ) && (!whNo || whNo.trim() == '') && (!custOrderNo || custOrderNo.trim() == '') && (!rcvCustCode || rcvCustCode.trim() == '')
	        && (!orderGroupId || orderGroupId.trim() == '' )
	      ) {
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
			"placeNo":placeNo,
			"whNo":whNo,
			"itemId":itemId,
			"itemNo":itemNo,
			"orderGroupId":orderGroupId,
			"ymdIgnoreYN": ymdIgnoreYN,
			"custOrderNo": custOrderNo
			,"custCode": custCode
			,"rcvCustCode": rcvCustCode
			,gvComCode      //2024.03.25 
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.placeItemList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.placeItemList.length;i++){
				    list.push({
						 idx: i						  
						,comCode: data.placeItemList[i].comCode
						,comName: data.placeItemList[i].comName
						,placeYmd: data.placeItemList[i].placeYmd  
						,placeNo: data.placeItemList[i].placeNo 
						,placeSeq: data.placeItemList[i].placeSeq						
						,whYmd: data.placeItemList[i].whYmd
						,whNo: data.placeItemList[i].whNo
						,whSeq: data.placeItemList[i].whSeq  
						,placeCustCode: data.placeItemList[i].placeCustCode
						,placeCustName: data.placeItemList[i].placeCustName
						,custOrderNo: data.placeItemList[i].custOrderNo 						
						,orderGroupId: data.placeItemList[i].orderGroupId 
						,makerCode: data.placeItemList[i].makerCode 
						,itemId: data.placeItemList[i].itemId 
						,itemNo: data.placeItemList[i].itemNo 
						,itemName: data.placeItemList[i].itemName
						,cnt: data.placeItemList[i].cnt 
						,whCnt: data.placeItemList[i].cnt						
						,saleUnitPrice: data.placeItemList[i].saleUnitPrice 
						,unitPrice: data.placeItemList[i].unitPrice
						,salePrice: data.placeItemList[i].salePrice 
						,taxPrice: data.placeItemList[i].taxPrice
						,sumPrice: data.placeItemList[i].sumPrice						
						,rcvCustCode: data.placeItemList[i].rcvCustCode 
						,rcvCustName: data.placeItemList[i].rcvCustName
						,placeReqNo: data.placeItemList[i].placeReqNo 
						,reqSeq: data.placeItemList[i].reqSeq
						,orderNo: data.placeItemList[i].orderNo 						
						
						,orderSeq: data.placeItemList[i].orderSeq
						,orderGroupId: data.placeItemList[i].orderGroupId
						,carNo: data.placeItemList[i].carNo
						,whUnitPrice: data.placeItemList[i].whUnitPrice 
						,whSumPrice: data.placeItemList[i].whSumPrice
						,regUserName: data.placeItemList[i].regUserName 
						,whRegUserName: data.placeItemList[i].whRegUserName
						,memo1: data.placeItemList[i].memo1 						
						,memo2: data.placeItemList[i].memo2
						,created: data.placeItemList[i].created 						
						,modified: data.placeItemList[i].modified 			
						,makerName: data.placeItemList[i].makerName 			
						,className: data.placeItemList[i].className 			
						,factoryNo: data.placeItemList[i].factoryNo 			
									
					});
					//console.log("date:"+data.placeItemList[i].created);
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
		
