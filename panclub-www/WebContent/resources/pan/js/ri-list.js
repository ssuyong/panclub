

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
        var riNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        
        if ( typeof riNo == 'undefined'){ riNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	
        $("#riNo").val(riNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
        findDataToServer("/logis/ri-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var riNo_val = $("#riNo").val(); 
				
		document.location.hash = '#info'+currentPage+"!"+riNo_val+"!"+sYmd+"!"+eYmd;
		
		findDataToServer("/logis/ri-list", 1);
	});
	
	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/logis/ri-list", 1);
	}
	
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField : "gvComCode",   headerText : "요청업체코드" , width: 100 ,visible : false} 
	,{ dataField : "gvComName",   headerText : "요청업체명" , width: 100 }
	,{ dataField : "riYmd",    headerText : "반입일자", width : 100} 
	,{ dataField : "realRiYmd",    headerText : "실제반입일자", width : 100} 
	,{ dataField : "riNo",   headerText : "반입번호", width: 100,
	styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "custCode",     headerText : "주문처코드", width : 80  }
	,{ dataField : "custName",     headerText : "주문처" , style:"left" , width : 200}
	,{ dataField : "carNo",     headerText : "차량정보" , width : 100}
	,{ dataField : "makerCode",     headerText : "제조사", width : 100 }
	,{ dataField : "carType",     headerText : "차종" , width : 100}
	,{ dataField : "price",     headerText : "공급가액", dataType: "numeric",formatString: "#,##0"  , style:"right" , width : 100  }
	,{ dataField : "taxPrice",     headerText : "세액", dataType: "numeric",formatString: "#,##0"  , style:"right" , width : 100  }
	,{ dataField : "sumPrice",     headerText : "합계금액", dataType: "numeric",formatString: "#,##0"  , style:"right" , width : 100  }
	,{ dataField : "orderGroupId",     headerText : "주문그룹ID", width : 100 ,
	styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
	,{ dataField : "riWay",   headerText : "반입방법" ,width : 100 }
	,{ dataField : "memo1",   headerText : "메모" , style:"left"}
	,{ dataField : "branchCode",   headerText : "관리지점" , width: 100}//2023.06.30 bk
	,{ dataField : "regUserId",   headerText : "요청자" ,width : 100 }
	,{ dataField : "riMgr",   headerText : "처리자" ,width : 100 }
];

var footerLayout = [
	{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
	{		dataField: "price",		positionField: "price",		operation: "SUM",		formatString: "#,##0"	}, 
	{		dataField: "taxPrice",		positionField: "taxPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
	
	
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
	AUIGrid.setFooter(myGridID, footerLayout);
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		var riNo = event.item.riNo;
		let gvComCode = event.item.gvComCode;
		//console.log("storageUseReqNo:"+storageUseReqNo);  
		if (event.dataField == 'riNo') {   
			$.fancybox.open({
			  href : '/logis/ri-item-list?riNo='+riNo + '&gvComCode=' + gvComCode     , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
		}
		
		/*
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
		*/
		var orderGroupId = event.item.orderGroupId;
		if (event.dataField == 'orderGroupId') {
			//window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId;
			var orderGroupId = event.item.orderGroupId;
			var url = '/order/order-group-item-list?orderGroupId=' + orderGroupId
			var newWindow = window.open(url, '_blank');
			 newWindow.focus();
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

	var riNo = $("#riNo").val();
	var custCode = $("#custCode").val(); 
	var carNo = $("#carNo").val(); 
	var orderGroupId = $("#orderGroupId").val();
	var riMgr = $("#riMgr").val(); 
	
	var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
	var regUserId = $("#regUserId").val(); // 2023.07.04 bk 
	var riDateType = $("#riDateType").val(); // 2023.07.27 bk 
	 const gvComCode = $('#gvComCode').val();
	let doubleClickYN = $('#doubleClickYN').val();
	 
	 //console.log("gvComCode : " + gvComCode)
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"riNo":riNo,
			"custCode":custCode,
			"carNo":carNo,
			"orderGroupId":orderGroupId,
			"riMgr":riMgr,
			"branchCode":branchCode, // 2023.06.30 bk 
			"regUserId": regUserId,
			"riDateType": riDateType,
			gvComCode,
			"workingType":"LIST-ALL" ,
			"doubleClickYN":doubleClickYN 
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.riList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.riList.length;i++){
					list.push({
						 riYmd: data.riList[i].riYmd 
						,riNo: data.riList[i].riNo 
						,custCode: data.riList[i].custCode 
						,custName: data.riList[i].custName
						,itemCnt: data.riList[i].itemCnt 
						,cnt: data.riList[i].cnt
						,price: data.riList[i].price
						,taxPrice: data.riList[i].taxPrice 
						,regUserId: data.riList[i].regUserId
						
						,carNo: data.riList[i].carNo
						,makerCode: data.riList[i].makerCode
						,orderGroupId: data.riList[i].orderGroupId
						,carType: data.riList[i].carType
						,price: data.riList[i].price
						,riWay: data.riList[i].riWay
						,memo1: data.riList[i].memo1
						,riMgr: data.riList[i].riMgr
						
						,branchCode: data.riList[i].branchCode //2023.06.30 bk
						
						,taxPrice: data.riList[i].price*0.1
						,sumPrice: data.riList[i].price*1.1
						
						,realRiYmd: data.riList[i].regYmd //2023.07.27 bk
						,gvComCode: data.riList[i].gvComCode 
						,gvComName: data.riList[i].gvComName
						 
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



