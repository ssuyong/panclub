

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




// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){

	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	//set branch 2023.06.30
  	branchCodeSelect("/base/code-list")		 
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
if (document.location.hash) {
	  var HashLocationName = document.location.hash;
	  HashLocationName = decodeURI(HashLocationName.replace('#info', '')); // 한글깨짐 처리
	  var info = HashLocationName.split("!");
        
	 var page = info[0];
	  var sYmd = info[1];
	  var eYmd = info[2];
	  var clGroupId = info[3];
	  var carNo = info[4];
	  var custCode = info[5];
	  var orderGroupId = info[6];
	  var ymdIgnoreYN = info[7];

	  var clReqStatus = info[8];
	  var clStatus = info[9];
	  var confYN = info[10];

	
	  if (ymdIgnoreYN === "Y") {
	    $('#ymdIgnoreYN').prop('checked', true);
	  } else {
	    $('#ymdIgnoreYN').prop('checked', false);
	  }
	
	  // 필요한 변수들을 설정하고 값들을 화면에 반영
	  $("#startpicker-input").val(sYmd);
	  $("#endpicker-input").val(eYmd);
	  $("#clGroupId").val(clGroupId);
	  $("#carNo").val(carNo);
	  $("#custCode").val(custCode);
	  $("#orderGroupId").val(orderGroupId);

	  $("#clReqStatus").val(clReqStatus);
	  $("#clStatus").val(clStatus);
	  $("#confYN").val(confYN);

        findDataToServer("/order/insurance-status",page);
        
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		  var sYmd = $("#startpicker-input").val();
		  var eYmd = $("#endpicker-input").val();
		  var orderGroupId_val = $("#orderGroupId").val();
		  var clGroupId_val = $("#clGroupId").val();
		  var carNo_val = $("#carNo").val();
		  var custCode_val = $("#custCode").val();	
		  var ymdIgnoreYN_val = ($('#ymdIgnoreYN').is(':checked') ? "Y" : "N");
		  
		   var clReqStatus_val = $("#clReqStatus").val();	
		   var clStatus_val = $("#clStatus").val();	
		   var confYN_val = $("#confYN").val();	
		
		  // 필요한 변수들을 설정하고 URL 해시를 업데이트
		  document.location.hash = '#info' + currentPage + "!" + sYmd + "!" + eYmd + "!" + clGroupId_val + "!"
		    + carNo_val + "!" + custCode_val + "!" + orderGroupId_val + "!" + ymdIgnoreYN_val+ "!" + clReqStatus_val+ "!" + clStatus_val+ "!" + confYN_val;
														
			findDataToServer("/order/insurance-status");
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
	{ dataField : "orderYmd",      headerText : "주문일자"    }
	,{ dataField : "rlYmd",     headerText : "출고일", width : 180 }
	,{ dataField : "orderGroupId",    headerText : "주문그룹ID", width : 140, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "custCode",     headerText : "주문처코드", width : 140 ,visible: false  }
	,{ dataField : "custName",     headerText : "주문처명", width : 140   }
	,{ dataField : "carNo",   headerText : "차번" , cellMerge: true }
	,{ dataField : "makerCode",      headerText : "제조사(차종)"   , style:"left", width : 120  }
	//,{ dataField : "makerName",      headerText : "제조사명"   , style:"left", width : 100  }
	//,{ dataField : "carType",      headerText : "차종"  , style:"left", width : 80   }
	,{dataField : "clReqType",      headerText : "청구요청여부",width : 80}
	,{ dataField : "orderAmt",      headerText : "주문액", style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	, { dataField: "rlRiAmt", headerText: "출고액" , style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	, { dataField: "clAmt", headerText: "청구액(센터가)" , style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	, { dataField: "insureClPrice", headerText: "청구액(청구가)" , style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	, { dataField: "depositAmt", headerText: "입금액" , style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	, { dataField: "clConfYN", headerText: "기결여부" }
	, { dataField: "clChkDate", headerText: "청구일자" }
	,{ dataField : "clGroupId",    headerText : "청구그룹ID", width : 140, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
 	,{ dataField: "ogRegUserName", headerText: "담당자" }
		
];
 var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "orderAmt",		positionField: "orderAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlRiAmt",		positionField: "rlRiAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "clAmt",		positionField: "clAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "insureClPrice",		positionField: "insureClPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "depositAmt",		positionField: "depositAmt",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			//editable : true,			
			// 셀 병합 실행
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			enableFilter: true,
			filterLayerWidth: 280,
			filterLayerHeight: 340,			
			rowSelectionWithMerge: true,
			showFooter: true,
			showAutoNoDataMessage : false, 

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
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});

	
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		//console.log("columnIndex:"+event.columnIndex);  
		if (event.columnIndex == 2) {//주문그룹 더블클릭시    
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderGroupId_val = $("#orderGroupId").val();
			var ymdIgnoreYN = "N";
			if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
				ymdIgnoreYN = "Y";
			}
			var custCode_val = $("#custCode").val(); 
			var carNo_val = $("#carNo").val();  	
			var clGroupId_val = $("#clGroupId").val();  
			
			var clReqStatus_val = $("#clReqStatus").val();  	
			var clStatus_val = $("#clStatus").val();  	
			var confYN_val = $("#confYN").val();  						
			//document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd;
			document.location.hash = '#info' + currentPage + "!" + sYmd + "!" + eYmd + "!" + clGroupId_val + "!"
		    + carNo_val + "!" + custCode_val + "!" + orderGroupId_val + "!" + ymdIgnoreYN + "!" + clReqStatus_val + "!" + clStatus_val + "!" + confYN_val;
	
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
			if (event.columnIndex == 15) {//청구그룹 더블클릭시    
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var clGroupId = event.item.clGroupId ; 
			window.open ('/order/cl-req-item-list?clGroupId=' + clGroupId ,'_blank');
		}		
	});
		
}


function findDataToServer(url) {
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	var list = [];
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var orderGroupId = $("#orderGroupId").val();  
	var custCode = $("#custCode").val(); 
	var carNo = $("#carNo").val();  
    var ogRegUserName = $("#ogRegUserName").val();  
    var clGroupId = $("#clGroupId").val();  
    var confYN = $("#confYN").val();  
    var clStatus = $("#clStatus").val();  
    var clReqStatus = $("#clReqStatus").val();  
    var clDateType = $("#clDateType").val(); //2023.09.12 기준일자
	
/*
	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!orderGroupId || orderGroupId.trim() == '' ) && (!carNo || carNo.trim() == '')
	   	 && (!custCode || custCode.trim() == '') && (!regUserName || regUserName.trim() == '')
	   	 && (!clType || clType.trim() == '')&& (!clReqStatus || clReqStatus.trim() == '')) {
	      alert("조회 조건을 하나 이상 입력해주세요.");
	      return false;
	   }
	}
	*/
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"orderGroupId":orderGroupId,
			"custCode":custCode,
			"carNo" : carNo ,
			"ogRegUserName" : ogRegUserName ,
			"clGroupId" : clGroupId ,
			"confYN" : confYN ,
			"clStatus" : clStatus ,
			"clReqStatus" : clReqStatus ,
			"workingType": "LIST",
			"clDateType":clDateType ,
		},
		
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.insuranceList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				$("#iDiv_noDataPop").css("display","block");							
				//$("#iDiv_noDataPop").css("display","block");							
			}else{	
					var clReqYN = "";
					var confYN = "";
				for(i =0;i<data.insuranceList.length;i++){	
					clReqYN = "";	
					if(data.insuranceList[i].clReqType == "보험"){
							clReqYN = "완료"
						}else{
								clReqYN =  "미완료"
						}
					confYN = "";	
					if(data.insuranceList[i].clConfYN == "Y"){
							confYN = "기결"
						}else{
							confYN =  ""
						}
								
					list.push({
						 orderGroupId: data.insuranceList[i].orderGroupId 
						,carNo: data.insuranceList[i].carNo 
						,custCode: data.insuranceList[i].custCode 
						,custName: data.insuranceList[i].custName
						,rlYmd: data.insuranceList[i].rlYmd       
						,makerCode: data.insuranceList[i].makerCode +" "+data.insuranceList[i].carType 
						//,clReqType:  data.insuranceList[i].clReqType
						,clReqType:  clReqYN
						,orderAmt:  data.insuranceList[i].orderAmt
						,rlRiAmt: data.insuranceList[i].rlRiAmt 
						,clAmt: data.insuranceList[i].clAmt 
						,insureClPrice: data.insuranceList[i].insureClPrice 
						,depositAmt: data.insuranceList[i].depositAmt 
						//,clConfYN: data.insuranceList[i].clConfYN
						,clConfYN: confYN
						, clChkDate : data.insuranceList[i].clChkDate
						, clGroupId : data.insuranceList[i].clGroupId
						, orderYmd : data.insuranceList[i].orderYmd
						, clGroupId : data.insuranceList[i].clGroupId
						, ogRegUserName : data.insuranceList[i].ogRegUserName
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
			