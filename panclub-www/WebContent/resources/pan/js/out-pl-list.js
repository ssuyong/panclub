

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
    }
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
	
        $("#storageMgr").val(storageMgr);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#chkStatus").val(chkStatus);
		$("#storageUseReqNo").val(storageUseReqNo);
		$("#orderGroupId").val(orderGroupId);
		
        findDataToServer("/logis/storage-use-req-list",page);
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
		
		findDataToServer("/order/out-pl-list", 1);
	});

	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/order/out-pl-list", 1);
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
				let plComCode = event.item.plComCode;
				let placeNo = event.item.placeNo;			
				window.open ("/order/out-pl-print?plComCode="+plComCode+"&placeNo="+placeNo,"_blank");
				location.reload();
			},
		}
	}
	,{ dataField : "chkStatus",    headerText : "처리상태", width : 60} 
	,{ dataField : "regYmd",    headerText : "요청일", width : 140} 
	,{ dataField : "plComCode",   headerText : "수주처코드" , style : "left" ,visible:false}
	,{ dataField : "plCustName",   headerText : "수주처명" , style : "left" }
	,{ dataField : "placeNo",   headerText : "발주번호", width: 120,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} }
	,{ dataField : "itemCnt",      headerText : "품목수량", dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"    }
	,{ dataField : "sumCnt",      headerText : "합계수량" , dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"   }
	,{ dataField : "whItemCnt",      headerText : "입고품목수량", dataType: "numeric", width :120, formatString: "#,##0"  , style:"right"}
	,{ dataField : "whSumCnt",      headerText : "입고합계수량", dataType: "numeric", width : 120, formatString: "#,##0"  , style:"right"}
	,{ dataField : "whStatus",      headerText : "입고여부", width : 60, }
	,{ dataField : "reqUserName",      headerText : "요청자", width : 80, visible : false}
	,{ dataField : "memo1",      headerText : "비고1", style : "left", width : 140,  }
	,{ dataField : "memo2",      headerText : "비고2", style : "left", width : 140,  }		
	,{ dataField : "regUserName",      headerText : "등록자"}
 	,{ dataField : "uptUserName",      headerText : "수정자"} 
	,{ dataField : "uptYmd",      headerText : "수정일"}
];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {								
			usePaging: true,// 페이징 사용
			pageRowCount: 500, // 한 화면에 출력되는 행 개수 20(기본값:20)			
			showPageRowSelect: true, // 페이지 행 개수 select UI 출력 여부 (기본값 : false)			
			selectionMode : "multipleCells",			
			showAutoNoDataMessage : false,
	};	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	var rowPos = 'first';
	
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

		let plComCode = event.item.plComCode;
		let placeNo = event.item.placeNo;
		  
		if (event.dataField == "placeNo") {   
			$.fancybox.open({
			  href : '/order/out-pl-item-list?plComCode='+plComCode+'&placeNo='+placeNo    , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
		}		
	});		
}


function findDataToServer(url,page) {
	let list = [];
	
	let sYmd = document.getElementById("startpicker-input").value;
	let eYmd = document.getElementById("endpicker-input").value;
	let ymdIgnoreYN = "N";
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	let chkStatus  = $("#chkStatus").val();
	let placeNo  = $("#storageUseReqNo").val();
	let orderGroupId  = $("#orderGroupId").val();	
	let plComCode = $("#plComCode").val(); 
	let custCode = $("#custCode").val(); // 2023.06.30 bk 
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			 "chkStatus": chkStatus
			,"placeNo": placeNo
			,"orderGroupId": orderGroupId
			,"plComCode":plComCode  			
			,"custCode":custCode  
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.outPlList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);							
			}else{
					
				for(i=0;i<data.outPlList.length;i++){
					list.push({
						chkStatus: data.reqList[i].chkStatus
						,regYmd: data.placeList[i].regYmd 
						,plComCode: data.placeList[i].plComCode 
						,plCustName: data.placeList[i].plCustName 
						,placeNo: data.reqList[i].placeNo
						,itemCnt: data.placeList[i].itemCnt 
						,sumCnt: data.placeList[i].sumCnt
						,whItemCnt: data.placeList[i].whItemCnt 
						,whSumCnt: data.placeList[i].whSumCnt 
						,whStatus: data.placeList[i].whStatus 
						 
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
						
						,branchCode: data.reqList[i].branchCode //2023.06.30 bk
						,custCode: data.reqList[i].custCode //2023.10.05 yoonsang
						,custName: data.reqList[i].custName //2023.10.05 yoonsang
					});
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
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

