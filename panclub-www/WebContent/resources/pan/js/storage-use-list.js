

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
        var storageMgr = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var eYmd = info[3];
        var storageUseReqNo = info[4];
        var orderGroupId = info[5];
        var ymdIgnoreYN = info[6];
        
 		       
        if ( typeof storageMgr == 'undefined'){ storageMgr = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof storageUseReqNo == 'undefined'){ storageUseReqNo = ''	}
        if ( typeof orderGroupId == 'undefined'){ orderGroupId = ''	}
	    if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	 
        $("#storageMgr").val(storageMgr);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		$("#storageUseReqNo").val(storageUseReqNo);
		$("#orderGroupId").val(orderGroupId);
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}	
			
        findDataToServer("/logis/storage-use-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var storageMgr_val = $("#storageMgr").val(); 
		var storageUseReqNo_val = $("#storageUseReqNo").val(); 
		var orderGroupId_val = $("#orderGroupId").val(); 
		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}				
		document.location.hash = '#info'+currentPage+"!"+storageMgr_val+"!"+sYmd+"!"+eYmd+"!"+storageUseReqNo_val+"!"+orderGroupId_val+"!"+ymdIgnoreYN;
		
		findDataToServer("/logis/storage-use-list", 1);
	});
	
	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/logis/storage-use-list", 1);
	}
		
});

// 칼럼 레이아웃 작성
var columnLayout = [
	 { dataField : "orderGroupId",   headerText : "주문그룹ID", cellMerge: true , mergeRef: "orderGroupId",	mergePolicy: "restrict" ,
	 styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
	,{ dataField : "orderInfo",    headerText : "주문정보", width : 140, cellMerge: true, mergeRef: "orderGroupId",	mergePolicy: "restrict"} 
	,{ dataField : "storageUseReqNo",   headerText : "요청번호", width: 100, cellMerge: true, mergeRef: "storageUseReqNo",	mergePolicy: "restrict",
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	} } 
	,{ dataField : "storageMgr",     headerText : "창고담당", width : 80, cellMerge: true , mergeRef: "storageUseReqNo",	mergePolicy: "restrict" }
	
	,{ dataField : "chkYmd",      headerText : "완료처리일", width : 100, editable : false }
	,{ dataField : "reqSeq",      headerText : "요청순번", width : 56, editable : false }
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField : "itemId",      headerText : "부품ID", width : 100, editable : false , cellMerge: false , mergeRef: "itemId",	mergePolicy: "restrict"}
	,{ dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    }
	,{ dataField : "itemNo",      headerText : "품번", width : 100, editable : false , cellMerge: false , mergeRef: "itemId",	mergePolicy: "restrict"} 
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
	,{ dataField : "itemName", headerText : "품명", width: 120, editable : false, style : "left"  , cellMerge: false , mergeRef: "itemId",	mergePolicy: "restrict" } 
	//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
	,{ dataField : "orderCnt",      headerText : "주문수량", width : 56, editable : false  , dataType: "numeric",  formatString: "#,##0"  , style:"right" , cellMerge: true , mergeRef: "itemId",	mergePolicy: "restrict" }
	,{ dataField : "storageUseCnt",     headerText : "창고사용수량", dataType: "numeric", width : 80, formatString: "#,##0"  , style:"right"  }
	,{ dataField : "storageCode",      headerText : "창고코드", width : 60, editable : false }
	,{ dataField : "storageName",      headerText : "창고명", width : 100, editable : false }
	//,{ dataField : "unitPrice",     headerText : "주문단가", editable : false }
	//,{ dataField : "sumPrice",     headerText : "합계", editable : false }
	,{ dataField : "subMemo1",     headerText : "비고1", editable : false, style : "left" }
	,{ dataField : "subMemo2",     headerText : "비고2" , editable : false, style : "left" }		
	,{ dataField : "branchCode",   headerText : "관리지점" , width: 100}//2023.06.30 bk
];
 var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "storageUseCnt",		positionField: "storageUseCnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "orderCnt",		positionField: "orderCnt",		operation: "SUM",		formatString: "#,##0"	}, 
	
		];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			// 셀 병합 실행
			enableCellMerge: true,
			//editable : true,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			// 셀머지된 경우, 행 선택자(selectionMode : singleRow, multipleRows) 로 지정했을 때 병합 셀도 행 선택자에 의해 선택되도록 할지 여부
			rowSelectionWithMerge: true,
			
			showAutoNoDataMessage : false,
			
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
		var primeCell = event.primeCell; 
		
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

		var storageUseReqNo = event.item.storageUseReqNo;
		  
		if (event.columnIndex == 2) {   
			$.fancybox.open({
			  href : '/logis/storage-use-item-list?storageUseReqNo='+storageUseReqNo    , // 불러 올 주소
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
	var storageUseReqNo = $("#storageUseReqNo").val(); 
	var orderGroupId = $("#orderGroupId").val(); 
	
	var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"storageMgr":storageMgr,
			"storageUseReqNo":storageUseReqNo,
			"orderGroupId":orderGroupId,
			"branchCode":branchCode // 2023.06.30 bk 
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
					carNo = data.reqList[i].carNo;
					makerName = data.reqList[i].makerName;
					carType = data.reqList[i].carType;
					orderInfo = "";
					
					if (isEmpty(carNo) == false){ 	orderInfo = carNo;		}  
					else if (isEmpty(makerName) == false ){
						if (orderInfo=='') { orderInfo = makerName } else { orderInfo = orderInfo + ' / ' +makerName} 
					 }
					else if (isEmpty(carType) == false){ 
						if (orderInfo=='') { orderInfo = carType } else { orderInfo = orderInfo + ' ' +carType}
					}
					
					list.push({
						 orderGroupId: data.reqList[i].orderGroupId 
						//,orderInfo: data.reqList[i].supplyCustName+"/"+data.reqList[i].carNo+"/"+data.reqList[i].makerName+"/"+data.reqList[i].carType
						,orderInfo: orderInfo 
						,storageUseReqNo: data.reqList[i].storageUseReqNo 
						,storageMgr: data.reqList[i].storageMgr
						,reqSeq: data.reqList[i].reqSeq 
						,itemId: data.reqList[i].itemId 
						,itemNo: data.reqList[i].itemNo 
						,itemName: data.reqList[i].itemName
						,itemNameEn: data.reqList[i].itemNameEn 
						,orderCnt: data.reqList[i].orderCnt 
						,storageUseCnt: data.reqList[i].useCnt
						,storageCode: data.reqList[i].storageCode 
						,storageName: data.reqList[i].storageName
						//,salePrice: data.reqList[i].salePrice 
						//,sumPrice: data.reqList[i].useCnt * data.reqItemList[i].salePrice
						,subMemo1: data.reqList[i].subMemo1 						
						,subMemo2: data.reqList[i].subMemo2 
						,chkYmd: data.reqList[i].chkYmd  
						,branchCode: data.reqList[i].branchCode  
						
						,className: data.reqList[i].className  
						,makerName: data.reqList[i].makerName  
						,factoryNo: data.reqList[i].factoryNo  
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
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


