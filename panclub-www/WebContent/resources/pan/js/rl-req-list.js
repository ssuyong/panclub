

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

function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
		  
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
        var rlMgr = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        
        var dmdTime = info[4];
        var rlWay = info[5];
        var custCode = info[6];
        var carNo = info[7];
        var orderGroupId = info[8];
        var rlReqNo = info[9];
        var procStatus = info[10];
        var branchCode = info[11];
        var regUserId = info[12];
        var stdClType = info[13];
        
        if ( typeof rlMgr == 'undefined'){ rlMgr = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        
        if ( typeof dmdTime == 'undefined'){ dmdTime = ''	}
        if ( typeof rlWay == 'undefined'){ rlWay = ''	}
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof carNo == 'undefined'){ carNo = ''	}
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
        if ( typeof rlReqNo == 'undefined'){ rlReqNo = ''	}
        if ( typeof procStatus == 'undefined'){ procStatus = ''	}
        if ( typeof branchCode == 'undefined'){ branchCode = ''	}
        if ( typeof regUserId == 'undefined'){ regUserId = ''	}
        if ( typeof stdClType == 'undefined'){ stdClType = ''	}
        
        const params = new URL(document.location).searchParams;
	
        $("#rlMgr").val(rlMgr);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
		$("#dmdTime").val(dmdTime);
		$("#rlWay").val(rlWay);
		$("#custCode").val(custCode);
		$("#carNo").val(carNo);
		$("#orderGroupId").val(orderGroupId);
		$("#rlReqNo").val(rlReqNo);
		$("#procStatus").val(procStatus);
		$("#branchCode").val(branchCode);
		$("#regUserId").val(regUserId);
		$("#stdClType").val(stdClType);
		
		$("#ymdIgnoreYN").prop('checked',params.get('popup')=='open');
        findDataToServer("/logis/rl-req-list",page);
       
       
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var rlMgr_val = $("#rlMgr").val(); 
		
		var dmdTime_val = $("#dmdTime").val();
        var rlWay_val = $("#rlWay").val();
        var custCode_val = $("#custCode").val();
        var carNo_val = $("#carNo").val();
        var orderGroupId_val = $("#orderGroupId").val();
        var rlReqNo_val = $("#rlReqNo").val();
        var procStatus_val = $("#procStatus").val();
        var branchCode_val = $("#branchCode").val();
        var regUserId_val = $("#regUserId").val();
        var stdClType_val = $("#stdClType").val();
				
		const hash  = '#info'+currentPage+"!"+rlMgr_val+"!"+sYmd+"!"+eYmd+"!"+dmdTime_val+"!"+rlWay_val+"!"+custCode_val+"!"+carNo_val+"!"+orderGroupId_val
											+"!"+rlReqNo_val+"!"+procStatus_val+"!"+branchCode_val+"!"+regUserId_val+"!"+stdClType_val;
											
		document.location = document.location.origin + document.location.pathname + hash;
		findDataToServer("/logis/rl-req-list", 1);
	});
	
	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/logis/rl-req-list", 1);
	}
	$("#procStatus").select2({ tags: true});	
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	{
		dataField: "printCnt", // 임의의 고유값
		headerText: "인쇄",
		width: 60,
		renderer: {
			type: "ButtonRenderer",
			dataField: "printCnt",
			onClick: function (event) {
				var rlReqNo = event.item.rlReqNo;
				var printMemoYN = "Y";
				var printDcYN = "YY";		
				var printYN = "Y";
				var pcYN = event.item.pcYN; //주문연동여부 			
				var gvComCode = event.item.gvComCode; 
				
				window.open ("/logis/rl-req-item-list-print?rlReqNo="+rlReqNo+"&memoYN="+printMemoYN+"&printDcYN=" + printDcYN+"&printYN=" + printYN+"&pcYN=" + pcYN+"&gvComCode=" + gvComCode,"_blank");
				location.reload();
			},
		}
	}
	, { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false }

	, { dataField : "comCode",    headerText : "요청업체코드", width : 100 , visible : false} 
	, { dataField : "comName",    headerText : "요청업체명", width : 100} 
	, { dataField : "dmdYmd",    headerText : "요청일", width : 100} 
	,{ dataField : "dmdTime",   headerText : "구분", width: 60} 
	,{ dataField : "isAccept",      headerText : "접수여부", width : 60}
	,{ dataField : "procStatus",      headerText : "처리내역", width : 100}
	,{ dataField : "rlReqNo",     headerText : "요청번호", width : 100,
	styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
	,{ dataField : "custCode",     headerText : "주문처코드" ,visible: false}
	,{ dataField : "custName",     headerText : "주문처", width : 180, style:"left"}
	,{ dataField : "supplyCustCode",     headerText : "납품처코드" ,visible: false}
	,{ dataField : "supplyCustName",     headerText : "납품처", style:"left"}
	,{ dataField : "pcYN",     headerText : "연동여부", width : 80 ,visible: false}
	,{ dataField : "rcvCustName",     headerText : "연동 주문처", width : 180 ,visible: false}
	,{ dataField : "rlWay",   headerText : "출고방법" , width : 80 }
	,{ dataField : "lastPickParts",   headerText : "최종부품픽업"}
	,{ dataField : "carNo",   headerText : "차량정보" , width : 120}
	,{ dataField : "carType",   headerText : "차종" , width : 120}	//240702 yoonsang
	,{ dataField : "regUserId",      headerText : "요청자" ,width : 80 }
	,{ dataField : "memo1",   headerText : " 메모" }
	,{ dataField : "rlSumPrice",     headerText : "공급가액", dataType: "numeric",formatString: "#,##0"  , style:"right"  }
	,{ dataField : "rlTaxPrice",     headerText : "세액" , dataType: "numeric",formatString: "#,##0"  , style:"right"  }
	,{ dataField : "rlSumPriceTax",     headerText : "합계" , dataType: "numeric",formatString: "#,##0"  , style:"right"  }
	,{ dataField : "stdClType",   headerText : "청구구분", width: 60} 
	,{ dataField : "orderGroupId",   headerText : "주문그룹ID" , styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
	,{ dataField : "branchCode",   headerText : "관리지점" }//2023.06.30 bk
	,{ dataField : "rlMgr",     headerText : "출고담당", width : 80  }		//240702 yoonsang 순서변경
	,{ dataField : "gvComCode",   headerText : "요청업체코드" , width: 100 ,visible: false}//2023.09.14 yoonsang
	,{ dataField : "gvComName",   headerText : "요청업체명" , width: 100 ,visible: false}
	,{ dataField : "printUser",      headerText : "수정자" ,visible: false}
	//,{ dataField : "printCnt",      headerText : "인쇄"}

];
 
 var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "rlSumPrice",		positionField: "rlSumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlTaxPrice",		positionField: "rlTaxPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlSumPriceTax",		positionField: "rlSumPriceTax",		operation: "SUM",		formatString: "#,##0"	}, 
	
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
			showAutoNoDataMessage : false, 
			
			showFooter: true,
			showStateColumn : true,
			rowIdField: "idx",
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
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
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

		var rlReqNo = event.item.rlReqNo;
		var gvComCode = event.item.gvComCode;
		var orderGroupId = event.item.orderGroupId;
		var stdClType = event.item.stdClType;
		//console.log("storageUseReqNo:"+storageUseReqNo);  
		if (event.dataField == 'rlReqNo') {   
			$.fancybox.open({
			  href : '/logis/rl-req-item-list?rlReqNo='+rlReqNo + '&gvComCode=' + gvComCode + '&stdClType=' + stdClType, // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
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

	var rlMgr = $("#rlMgr").val(); 
	var dmdTime = $("#dmdTime").val(); 
	var rlWay = $("#rlWay").val(); 
	var custCode = $("#custCode").val(); 
	var carNo = $("#carNo").val(); 
	var orderGroupId = $("#orderGroupId").val(); 
	var rlReqNo = $("#rlReqNo").val(); 
	let procStatus = '';//$("#procState").val(); 
	
	
	if($("#procStatus").val() != null)
	for(item of $("#procStatus").val())
	{
		if(procStatus != '') procStatus += '^';
		procStatus += item;
	}
	
	var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
	var regUserId = $("#regUserId").val(); // 2023.07.04 bk 
	var stdClType = $("#stdClType").val(); // 2023.07.04 bk 
	const gvComCode = $('#gvComCode').val();
	let doubleClickYN = $('#doubleClickYN').val(); // 240322 yoonsang
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"rlMgr":rlMgr,
			"dmdTime":dmdTime,
			"rlWay":rlWay,
			"custCode":custCode,
			"carNo":carNo,
			"orderGroupId":orderGroupId,
			"rlReqNo":rlReqNo,
			"procStatus":procStatus,
			"branchCode":branchCode, // 2023.06.30 bk 
			"regUserId":regUserId ,
			"stdClType":stdClType ,
			gvComCode,
			"workingType":"LIST-ALL" ,
			"doubleClickYN":doubleClickYN 
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.reqList.length;i++){
					list.push({
						 idx: data.reqList[i].rlReqNo,
						 dmdYmd: data.reqList[i].dmdYmd 
						,dmdTime: data.reqList[i].dmdTime 
						,rlReqNo: data.reqList[i].rlReqNo 
						,rlMgr: data.reqList[i].rlMgr
						,memo1: data.reqList[i].memo1 
						,orderGroupId: data.reqList[i].orderGroupId 
						,lastPickParts: data.reqList[i].lastPickParts 
						,regUserId: data.reqList[i].regUserId
						,rlWay: data.reqList[i].rlWay 
						,procStatus: data.reqList[i].procStatus
						
						,custCode: data.reqList[i].saleCustCode 
						,custName: data.reqList[i].saleCustName
						,carNo: data.reqList[i].carNo
						,branchCode: data.reqList[i].branchCode //2023.06.30 bk
						,rlSumPrice: data.reqList[i].rlSumPrice
						,rlTaxPrice: data.reqList[i].rlTaxPrice
						,rlSumPriceTax: data.reqList[i].rlSumPriceTax
					
						,printCnt: data.reqList[i].printCnt+"회"
						,printUser: data.reqList[i].printUser
						
						,stdClType: data.reqList[i].stdClType

						,pcYN: data.reqList[i].pcYN //연동여부
						,rcvCustName: data.reqList[i].rcvCustName  // 연동 납품업체
						,gvComCode: data.reqList[i].gvComCode  // 연동주문요청업체
						,gvComName: data.reqList[i].gvComName  // 
						,supplyCustCode: data.reqList[i].supplyCustCode  
						,supplyCustName: data.reqList[i].supplyCustName   
						,comCode: data.reqList[i].comCode  
						,comName: data.reqList[i].comName   
						
						,carType: data.reqList[i].carType   //240702 yoonsang
						,isAccept : data.reqList[i].isAccept || '' //20240710 supi 접수여부
						
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID, Number(page));
			     }
			    
			    const params = new URL(document.location).searchParams;
			    
			    
			    if( params.get('popup')=='open' )
				{
					const resultRow = AUIGrid.getGridData(myGridID);
					if(resultRow.length == 1) 
					{
						$.fancybox.open({
						  href : '/logis/rl-req-item-list?rlReqNo='+resultRow[0].rlReqNo + '&gvComCode=' + resultRow[0].gvComCode + '&stdClType=' + resultRow[0].stdClType , // 불러 올 주소
						  type : 'iframe',
						  width : '90%',
						  height : '90%',
						  padding :0,
						  fitToView: false,
						  autoSize : false,
						  modal :true
						});
					}
				} 
			}
		carNoChk()
		}
		,
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
function updateGridRowCust(obj,name) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	//console.log("row1:"+rowItem.itemNo);
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	$(obj).val(rowItem.custCode);
	$("#"+name+"").val(rowItem.custName);
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
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


//dup check 2023.07.13
function carNoChk() {
	var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		let rowArr = [];
		for (var i = 0, len = allItems.length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			carNo = AUIGrid.getCellValue(myGridID, i, "carNo");
			if (carNo !='' && carNo !== undefined){
				rowArr.push(carNo);
			}			
		}
		let rowArr2 = new Set(rowArr);
		let dupYn = false;
		var dupData = "";
		if(rowArr.length !== rowArr2.size){
			//console.log(rowArr);
			//console.log(rowArr2);
			//alert("중복건 존재!");
			for(let i = 0; i < rowArr.length; i++) {
				  const currElem = rowArr[i];				  
				  for(let j = i+1; j < rowArr.length; j++) {
				    if(currElem === rowArr[j]) {
				      dupYn = true;
				      //break;
				      dupData = dupData + currElem + "^";
				    }
				  }
				  
			}	
			//console.log(dupData);		
 		    if(dupYn)  {
			    errRowStyleFunction(dupData);
			}			
		}else{
			 defaultRowStyleFunction();
			//alert('중복건은 없습니다.')
		}
				
}

//dup err 2023.07.10 hsg
function errRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		var idxSplit = idxArr.split("^");  
		for ( var h in idxSplit ) {
			if (item.carNo == idxSplit[h]) {
				return "auigrid-err-row-style";
			}
		}

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};

//return defult Style 2023.07.10 hsg
function defaultRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};


function dateSetting() {
	var type = $("#setDate").val();
	var sdate = new Date();
	var edate = new Date();
	var result;

	if(type == "3일이내") {
	    var sdate_val = sdate.getTime() - (3 * 24 * 60 * 60 * 1000);
	    sdate.setTime(sdate_val);
	    
	    var edate_val = edate.getTime();
	    edate.setTime(edate_val);	    
	} else if(type == "5일이내") {
	    var sdate_val = sdate.getTime() - (5 * 24 * 60 * 60 * 1000);
	    sdate.setTime(sdate_val);

	    var edate_val = edate.getTime();
	    edate.setTime(edate_val);	    
	} else if(type == "오늘") {
	    var sdate_val = sdate.getTime();
	    sdate.setTime(sdate_val);
	    
	    var edate_val = edate.getTime();
	    edate.setTime(edate_val);
	} else if(type == "5일초과") {
	    var sdate_val = sdate.setMonth(sdate.getMonth() - 12);
	    sdate.setTime(sdate_val);
	
	    var edate_val = edate.getTime() - (6 * 24 * 60 * 60 * 1000);
	    edate.setTime(edate_val);
	}
	
	var sYmd = sdate.getFullYear() + "-" + ("0" + (sdate.getMonth()+1)).slice(-2) + "-" + ("0" + sdate.getDate()).slice(-2);
	var eYmd = edate.getFullYear() + "-" + ("0" + (edate.getMonth()+1)).slice(-2) + "-" + ("0" + edate.getDate()).slice(-2);
	$("#startpicker-input").val(sYmd);
	$("#endpicker-input").val(eYmd);
	return;
	//return result;
}

