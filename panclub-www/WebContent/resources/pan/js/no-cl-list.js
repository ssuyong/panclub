

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
 
 		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		var custCode = $("#custCode").val(); 
		var carNo = $("#carNo").val();  
		   
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
        if ( typeof orderNo == 'undefined'){ orderNo = ''}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        
        if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof carNo == 'undefined'){ carNo = ''	}
	
        //console.log("sYmd:"+sYmd);
    
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
		
        //findDataToServer("/order/order-group-list",page);
        findDataToServer("/order/no-cl-list",page);
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
							
			document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode_val+"!"+carNo_val;
			
			//findDataToServer("/order/order-group-list");
			findDataToServer("/order/no-cl-list");
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
	{ dataField : "orderGroupId",    headerText : "주문그룹ID", width : 140, cellMerge: true	 ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
    ,{ dataField : "branchCode",   headerText : "관리지점" , width: 60}//2023.06.30 bk
	,{ dataField : "custCode",     headerText : "주문처코드", width : 140 , cellMerge: true, mergeRef: "orderGroupId",	mergePolicy: "restrict" ,visible: false  }
	,{ dataField : "orderYmd",     headerText : "주문일", width : 120 , cellMerge: true, mergeRef: "orderGroupId",	mergePolicy: "restrict" }
	,{ dataField : "rlYmd",     headerText : "출고일", width : 120 , cellMerge: true, mergeRef: "orderGroupId",	mergePolicy: "restrict" }
	,{ dataField : "custName",     headerText : "주문처", width : 200 , cellMerge: true, mergeRef: "orderGroupId",	mergePolicy: "restrict" }
	,{ dataField : "carNo",   headerText : "차번" , cellMerge: true, mergeRef: "orderGroupId",	mergePolicy: "restrict" }
	,{ dataField : "makerCode",      headerText : "제조사"   , style:"left", width : 120,  visible: false   }
	,{ dataField : "makerName",      headerText : "제조사명"   , style:"left", width : 100  }
	,{ dataField : "carType",      headerText : "차종"  , style:"left", width : 80   }
	,{dataField : "clType",      headerText : "일반/보험",width : 80}
	,{dataField : "insure1Name",      headerText : "보험사1"}
	,{dataField : "insure2Name",      headerText : "보험사2"}
	//,{ dataField : "claimType",     headerText : "청구구분", width : 120  }
	,{ dataField : "sumPrice",      headerText : "주문액", style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false  }
	//,{ dataField : "salePrice",      headerText : "공급가액", style:"right"}
	//,{ dataField : "taxPrice",      headerText : "세액", style:"right"}
	, { dataField: "dpMoney", headerText: "입금액" , style:"right", dataType: "numeric",formatString: "#,##0"  , editable : false,visible: false    }
	,{ dataField : "regUserName",      headerText : "담당자"    }
	//,{ dataField : "regYmd",      headerText : "등록일자"    }
	, { dataField: "orderCnt", headerText: "주문수량",width : 80}
	, { dataField: "rlCnt", headerText: "출고수량",width : 80 }
	, { dataField: "clReqCnt", headerText: "청구요청수량" ,width : 80}
	//, { dataField: "clCnt", headerText: "기결수량",width : 80 }
	, { dataField: "clReqStatus", headerText: "청구요청상태" }
//	, { dataField: "confYN", headerText: "기결여부" }

		
];
 var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "orderCnt",		positionField: "orderCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlCnt",		positionField: "rlCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "clReqCnt",		positionField: "clReqCnt",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			//editable : true,			
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

			selectionMode : "multipleCells",
			enableFilter: true,
			filterLayerWidth: 280,
			filterLayerHeight: 340,

			
			
			rowSelectionWithMerge: true,
			showFooter: true,

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
		if (event.columnIndex == 0) {   
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var orderNo_val = ''; 
			var orderGroupId_val = $("#orderGroupId").val();
			var ymdIgnoreYN = "N";
			if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
				ymdIgnoreYN = "Y";
			}
			var custCode_val = $("#custCode").val(); 
			var carNo_val = $("#carNo").val();  
				
			//document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd;
			document.location.hash = '#info'+currentPage+"!"+orderGroupId_val+"!"+orderNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+custCode_val+"!"+carNo_val;
			//
	     	
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


function findDataToServer(url) {
	
	var list = [];
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	var orderGroupId = $("#orderGroupId").val();  
	var custCode = $("#custCode").val(); 
	var carNo = $("#carNo").val();  
    var regUserName = $("#regUserName").val();  
    var clType = $("#clType").val();  
  //  var confYN = $("#confYN").val();  
    var clReqStatus = $("#clReqStatus").val();  

	
	var orderNo ="";
		if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!orderGroupId || orderGroupId.trim() == '' ) && (!carNo || carNo.trim() == '')
	   	 && (!custCode || custCode.trim() == '') && (!regUserName || regUserName.trim() == '')
	   	 && (!clType || clType.trim() == '')&& (!clReqStatus || clReqStatus.trim() == '')) {
	      alert("조회 조건을 하나 이상 입력해주세요.");
	      return false;
	   }
	}
	
	var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
			//console.log ("clReqStatusclReqStatus"+clReqStatus)
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
			"orderNo" : orderNo ,
			"regUserName" : regUserName ,
			"clType" : clType ,
			//"confYN" : confYN ,
			"clReqStatus" : clReqStatus ,
			"workingType": "NO_CL_LIST",
			"branchCode":branchCode // 2023.06.30 bk 			
		},
		
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.noClList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
			//console.log(data.orderGroupList.length);		
				
				for(i =0;i<data.noClList.length;i++){			

					list.push({
						 orderGroupId: data.noClList[i].orderGroupId 
						,carNo: data.noClList[i].carNo 
						,custCode: data.noClList[i].custCode 
						,supplyCustName: data.noClList[i].supplyCustName 
						,custName: data.noClList[i].custName
						,orderType: data.noClList[i].orderType 
						//,orderTypeName: orderTypeNm 
						,claimType: data.noClList[i].claimType       
						//,orderNo: data.orderGroupList[i].orderNo 
						,claimYN: data.noClList[i].claimYN 
						,collectYN: data.noClList[i].collectYN 
						,sumPrice: data.noClList[i].salePrice +data.noClList[i].taxPrice 
						,salePrice:  data.noClList[i].salePrice
						,taxPrice:  data.noClList[i].taxPrice
						,itemCnt: data.noClList[i].itemCnt 
						,regUserName: data.noClList[i].regUserName 
						,regYmd: data.noClList[i].regYmd 
						,uptUserName: data.noClList[i].uptUserName 
						,uptYmd: data.noClList[i].uptYmd
						, orderCnt : data.noClList[i].orderCnt
						, clCnt : data.noClList[i].clCnt
						, rlCnt : data.noClList[i].rlCnt
						, clReqCnt : data.noClList[i].clReqCnt
						, clReqStatus : data.noClList[i].clReqStatus
						, clStatus : data.noClList[i].clStatus
						, dpMoney : data.noClList[i].dpMoney
						, clType : data.noClList[i].clType 
						///,confYN :  data.orderGroupList[i].confYN
						, branchCode : data.noClList[i].branchCode
						, makerCode : data.noClList[i].makerCode
						, carType : data.noClList[i].carType
						, makerName : data.noClList[i].makerName
						, orderYmd : data.noClList[i].orderYmd
						, rlYmd : data.noClList[i].rlYmd
						, insure1Name : data.noClList[i].insure1Name
						, insure2Name : data.noClList[i].insure2Name
						
					});
					
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 //if (page > 1) {
			     //	AUIGrid.movePageTo(myGridID, Number(page));
			     //}
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
			