

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
  	branchCodeSelect("/base/code-list");	
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var storageMgr = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var chkStatus = info[4]; 
        var storageUseReqNo = info[5]; 
        var orderGroupId = info[6]; 
        
        if ( typeof storageMgr == 'undefined'){ storageMgr = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof storageUseReqNo == 'undefined'){ storageUseReqNo = ''	}
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
        const params = new URL(document.location).searchParams;
	
        $("#storageMgr").val(storageMgr);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#chkStatus").val(chkStatus);
		$("#storageUseReqNo").val(storageUseReqNo);
		$("#orderGroupId").val(orderGroupId);
		
        
        $("#ymdIgnoreYN").prop('checked',params.get('popup')=='open');
        findDataToServer("/logis/storage-use-req-list",page);
        
		if( params.get('popup')=='open' && storageUseReqNo != '')
		{
			  $.fancybox.open({
			  href : '/logis/storage-use-req-item-list?storageUseReqNo='+storageUseReqNo    , // 불러 올 주소
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
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var storageMgr_val = $("#storageMgr").val(); 
		var chkStatus = $("#chkStatus").val();
		var storageUseReqNo = $("#storageUseReqNo").val();
		var orderGroupId = $("#orderGroupId").val();
				
		document.location.hash = '#info'+currentPage+"!"+storageMgr_val+"!"+sYmd+"!"+eYmd+"!"+chkStatus+"!"+storageUseReqNo+"!"+orderGroupId;
		
		findDataToServer("/logis/storage-use-req-list", 1);
	});

	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/logis/storage-use-req-list", 1);
	}
		
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	{	headerText: "인쇄",	
		width: 60,
		renderer: {
			type: "ButtonRenderer",
			labelText: "인쇄",
				onClick: function (event) {
				var storageUseReqNo = event.item.storageUseReqNo;			
				window.open ("/logis/storage-use-req-print?storageUseReqNo="+storageUseReqNo,"_blank");
				location.reload();
			},
		}
	}
	,{ dataField : "chkStatus",    headerText : "처리상태", width : 60} 
	,{ dataField : "ctItemCount",    headerText : "회수요청수", width : 70} 
	,{ dataField : "ctReject",    headerText : "회수불가품목", width : 80} 
	,{ dataField : "useDmdYmd",    headerText : "요청일", width : 140} 
	,{ dataField : "storageUseReqNo",   headerText : "요청번호", width: 120,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
	,{ dataField : "pcReqNo",   headerText : "주문요청번호", width: 120 }
	,{ dataField : "moveSchYmd",     headerText : "창고이동일", width : 120     }
	,{ dataField : "storageMgr",     headerText : "창고담당", width : 120  }
	,{ dataField : "custCode",   headerText : "주문처코드" , style : "left" ,visible:false}
	,{ dataField : "custName",   headerText : "주문처" , style : "left" }
	,{ dataField : "memo1",   headerText : "메모" , style : "left" }
	,{ dataField : "orderGroupId",   headerText : "주문그룹ID",
	styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}  }
	,{ dataField : "branchCode",   headerText : "관리지점" , width: 100}//2023.06.30 bk
	,{ dataField : "regUserId",      headerText : "등록자" ,visible:false} //2023.10.04 bk
	,{ dataField : "regUserName",      headerText : "등록자"}
	,{ dataField : "regYmd",      headerText : "등록일"}
 	,{ dataField : "uptUserId",      headerText : "수정자"}  //2023.10.04 bk
	,{ dataField : "uptYmd",      headerText : "수정일"}
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
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		var storageUseReqNo = event.item.storageUseReqNo;
		//console.log("storageUseReqNo:"+storageUseReqNo);  
		if (event.dataField == "storageUseReqNo") {   
			$.fancybox.open({
			  href : '/logis/storage-use-req-item-list?storageUseReqNo='+storageUseReqNo    , // 불러 올 주소
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

	var storageMgr = $("#storageMgr").val(); 
	var chkStatus  = $("#chkStatus").val();
	var storageUseReqNo  = $("#storageUseReqNo").val();
	var orderGroupId  = $("#orderGroupId").val();
	
	var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
	
	var custCode = $("#custCode").val(); // 2023.06.30 bk 
	const ctReject = $("#ctReject").val();
	
	 
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"storageMgr":storageMgr
			,"chkStatus": chkStatus
			,"storageUseReqNo": storageUseReqNo
			,"orderGroupId": orderGroupId,
			"branchCode":branchCode // 2023.06.30 bk 
			
			,"custCode":custCode // 2023.10.05 yoonsang 
			,ctReject
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			//console.log(data);
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);							
			}else{
					
				for(i=0;i<data.reqList.length;i++){
					list.push({
						 useDmdYmd: data.reqList[i].useDmdYmd 
						,storageUseReqNo: data.reqList[i].storageUseReqNo 
						,moveSchYmd: data.reqList[i].moveSchYmd 
						,storageMgr: data.reqList[i].storageMgr
						,memo1: data.reqList[i].memo1 
						,orderGroupId: data.reqList[i].orderGroupId 
						,regUserName: data.reqList[i].regUserName 
						,regUserId: data.reqList[i].regUserId
						,regYmd: data.reqList[i].regYmd 
						,uptUserName: data.reqList[i].uptUserName 
						,uptUserId: data.reqList[i].uptUserId
						,uptYmd: data.reqList[i].uptYmd
						
						,chkStatus: data.reqList[i].chkStatus
						,branchCode: data.reqList[i].branchCode //2023.06.30 bk
						,custCode: data.reqList[i].custCode //2023.10.05 yoonsang
						,custName: data.reqList[i].custName //2023.10.05 yoonsang
						,ctReject: data.reqList[i].ctReject  
						,ctItemCount : data.reqList[i].ctItemCount  
						,pcReqNo : data.reqList[i].pcReqNo  
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

