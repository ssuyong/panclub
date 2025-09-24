

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

// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);	
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
     
        var page = info[0];
        var pcReqNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var ymdIgnoreYN = info[4];        
  		var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}			
		var gvComCode = info[5];
		var gvMgr = info[6];
		var procUserId = info[7];
		var procStep = info[8];
		var gvPlacNo = info[9];
		   
        if ( typeof pcReqNo == 'undefined'){ pcReqNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	    if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
	    if ( typeof gvComCode == 'undefined'){ gvComCode = ''	}
	    if ( typeof gvMgr == 'undefined'){ gvMgr = ''	}
	    if ( typeof procUserId == 'undefined'){ procUserId = ''	}
	    if ( typeof procStep == 'undefined'){ procStep = ''	}
	    if ( typeof gvPlacNo == 'undefined'){ gvPlacNo = ''	}
	    
       // console.log("sYmd:"+sYmd);
        $("#pcReqNo").val(pcReqNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		$("#gvComCode").val(gvComCode);
		$("#gvMgr").val(gvMgr);
		$("#procUserId").val(procUserId);
		$("#procStep").val(procStep);
		$("#gvPlacNo").val(gvPlacNo);
	
        findDataToServer("/order/out-pc-req-list",page);
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var pcReqNo_val = $("#pcReqNo").val(); 
 		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}			
		var gvComCode = $("#gvComCode").val(); 
		var gvMgr_val = $("#gvMgr").val(); 
		var procUserId_val = $("#procUserId").val();
		var procStep_val = $("#procStep").val();
		var gvPlacNo_val = $("#gvPlacNo").val();
					
		document.location.hash = '#info'+currentPage+"!"+pcReqNo_val+"!"+sYmd+"!"+eYmd+"!"+ymdIgnoreYN+"!"+gvComCode+"!"+gvMgr_val+"!"+procUserId_val
		+"!"+procStep_val+"!"+gvPlacNo_val;
		
		findDataToServer("/order/out-pc-req-list", 1);
	});
	
	if ( $("#pcReqNo").val() != '' ) { //2023.12.04. 주문요청에서 링크		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/order/out-pc-req-list", 1);
	}
	
	
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	
// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "regYmd",    headerText : "요청일자", width : 100} 
	,{ dataField : "regHmsg",   headerText : "요청시간", width : 80}	 
	,{ dataField : "procState",   headerText : "처리상태", width : 80}	 
	,{ dataField : "pcReqNo",   headerText : "요청번호", width: 100,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "itemQty",   headerText : "아이템수" , width : 70 }
	,{ dataField : "gvMgr",   headerText : "요청 담당자" , width : 100 }
	,{ dataField : "deliWay",      headerText : "수령방법", width : 100}
	,{ dataField : "deliPayType",      headerText : "비용", width : 140 , labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField, cItem) {
	   if(value == '선불')
	   		return '선불 (월정산 포함)';
	   else if(value == '착불')
	     	return '착불 (수취자 부담)';
	   else if(value == '직접배차')
	   		return '직접배차 (주문자 부담)';
	   else
		   return value;
	}}
	,{ dataField : "rcvlogisCode",      headerText : "방문처", width : 80}
	,{ dataField : "gvMemo",      headerText : "요청메모"   , style:"left", width : 400  }	
	
//	,{ dataField : "procStep",      headerText : "접수단계"  , width : 120  }
	,{ dataField : "procUserId",      headerText : "접수 담당자" , width : 120}
	,{ dataField : "procDate",      headerText : "처리일자" , width : 120}
	,{ dataField : "rejectMemo",      headerText : "거부사유" , width : 120}
	,{ dataField : "inMemo1",      headerText : "기타메모" , width : 120 }
	,{ dataField : "regUserName",      headerText : "등록자", width : 100}
	,{ dataField : "uptUserId",      headerText : "수정자", width : 100}
	,{ dataField : "uptYmd",      headerText : "수정일자", width : 100}
	
	
	,{ dataField : "senderCustName",      headerText : "보내는거래처", width : 100}
	,{ dataField : "senderName",      headerText : "보내는사람", width : 100}
	,{ dataField : "senderTel",      headerText : "보내는이연락처", width : 100}
	,{ dataField : "senderAddr1",      headerText : "보내는이주소", width : 100}
	,{ dataField : "receiverCustName",      headerText : "받는거래처", width : 100}
	,{ dataField : "receiverName",      headerText : "받는사람", width : 100}
	,{ dataField : "receiverTel",      headerText : "받는이연락처", width : 100}									
	,{ dataField : "receiverAddr1",      headerText : "받는이주소", width : 100}				
]; 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
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

	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		var pcReqNo = event.item.pcReqNo;
		//console.log("columnIndex:"+event.dataField);  
		if (event.dataField == "pcReqNo") {   
			$.fancybox.open({
			  href : '/order/out-pc-req-item-list?pcReqNo='+pcReqNo    , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
		};
	})
}

function findDataToServer(url,page) {
	var list = [];	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";	}
	var pcReqNo = $("#pcReqNo").val(); 	
	var gvComCode = $("#gvComCode").val(); 
	var gvComCode = $("#gvComCode").val(); 

	var gvMgr = $("#gvMgr").val(); 
	var procUserId = $("#procUserId").val(); 
	//var procStep = $("#procStep").val(); 
	var procState = $("#procState").val(); 
	var gvPlacNo = $("#gvPlacNo").val(); 

/*		
	if ($('#ymdIgnoreYN').is(':checked') == true){
	   if ((!orderNo || orderNo.trim() == '' ) && (!carNo || carNo.trim() == '')
	   	 && (!custCode || custCode.trim() == '') && (!supplyCustCode || supplyCustCode.trim() == '')) {
	      alert("조회 조건을 하나 이상 입력해주세요.");
	      return false;
	   }
	} */

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType" : "LIST_OUT",
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"pcReqNo":pcReqNo,
			"gvComCode":gvComCode,

			"gvMgr":gvMgr,
			"procUserId":procUserId,
			//"procStep":procStep,
			"procState":procState,
			"gvPlacNo":gvPlacNo,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.pcReqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				for(i=0;i<data.pcReqList.length;i++){
					if(data.pcReqList[i].deliWay == '방문수령'){
						data.pcReqList[i].deliWay = '일반수령'
					}
					list.push({
						 regYmd: data.pcReqList[i].regYmd 
						,pcReqNo: data.pcReqList[i].pcReqNo 
						,gvComCode: data.pcReqList[i].gvComCode 
						,gvPlacNo: data.pcReqList[i].gvPlacNo
						,gvMgr: data.pcReqList[i].gvMgr 
						,gvMemo: data.pcReqList[i].gvMemo 
//						,procStep: data.pcReqList[i].procStep 
						,procState: data.pcReqList[i].procState 
						,procUserId: data.pcReqList[i].procUserId 
						,procDate: data.pcReqList[i].procDate 
						,rejectMemo: data.pcReqList[i].rejectMemo 
						,regUserId :data.pcReqList[i].regUserId 
						,uptUserId: data.pcReqList[i].uptUserId
						,uptYmd: data.pcReqList[i].uptYmd
						,uptHms: data.pcReqList[i].uptHmsg
						,gvCustName: data.pcReqList[i].gvCustName
						,regUserName: data.pcReqList[i].regUserName
						
						,itemQty: data.pcReqList[i].itemQty
						//2023.12.08. 아래 10개
						,deliWay: data.pcReqList[i].deliWay
						,deliPayType: data.pcReqList[i].deliPayType
						,senderCustName: data.pcReqList[i].senderCustName
						,senderName: data.pcReqList[i].senderName
						,senderTel: data.pcReqList[i].senderTel
						,senderAddr1: data.pcReqList[i].senderAddr1
						,receiverCustName: data.pcReqList[i].receiverCustName
						,receiverName: data.pcReqList[i].receiverName
						,receiverTel: data.pcReqList[i].receiverTel
						,receiverAddr1: data.pcReqList[i].receiverAddr1												
						,regHmsg: data.pcReqList[i].regHmsg				//2024.01.08
						,rcvlogisCode : data.pcReqList[i].rcvlogisCode	
						
					});
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



//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj, name) {

	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
	rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;

	$(obj).val(rowItem.custCode);
	$("#" + name + "").val(rowItem.custName);

	var dialogCust;
	dialogCust = $("#dialog-form-cust");
	dialogCust.dialog("close");

}
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');


	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
}

  /*$(document).keypress(function(e) {
  if (e.which == 13) {
    $('#btnFind').click();}
	});
*/

	/*function checkYmd(){
		var estiNo = $('#orderNo ').val(); 
		var carNo = $('#carNo ').val(); 
		var custCode = $('#custCode ').val(); 
		var supplyCustCode = $('#supplyCustCode ').val(); 
		
		
		if ($('#ymdIgnoreYN ').is(':checked') == true){
			 if (orderNo == '' && carNo == ''&& custCode == ''&& supplyCustCode == ''){
				alert ("조회 조건을 하나 이상 입력해주세요.")
			}
		}
	}*/
	
	$(document).keydown(function(e) {
  if (e.which == 120) {
    $('#btnFind').click();}
	});
	

