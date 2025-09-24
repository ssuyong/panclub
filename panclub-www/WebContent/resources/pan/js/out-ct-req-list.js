//회수요청 내역 페이지
//위탁업체에서 요청한 회수요청들을 보는 페이지


let dialogCtReq;
 /* Begin : Date Picker Date Range*/ 


const picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        date: new Date(),
    	input: '#startpicker-input',
        container: '#startpicker-container'
    },
    endpicker: {
        date: new Date(),
        input: '#endpicker-input',
        container: '#endpicker-container'
    }
});
$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(ctReqColumnLayout);	
	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		searchCtData();
	});
	
	
	 $("#dialogBtnReg").click(()=>{  // dialogCtMgr  ,  dialogCtMemo
	 	const info = {ctMgr :  $("#dialogCtMgr").val() , ctMemo :  $("#dialogCtMemo").val() , ctReqNo : $("#dialogCtReqNo").text() , 
	 				  deliWay : $("#deliWay").val() , deliPayType : $("#deliPayType").val() , rcvLogisCode : $("#rcvlogisCode").val() };
	 	infoUpdate(info); 
	});
	 $("#dialogBtnClose").click(()=>{ dialogCtReq.dialog("close");});
	 $("#dialogBtnCancel").click(()=>{  //요청취소버튼에 대한 이벤트
		const checkedRowitems = (AUIGrid.getCheckedRowItems("#grid_wrap2"));
		let ctReqSeqArr = "";
		if(checkedRowitems.length == 0){alert("회수요청할 부품을 체크해주세요"); return; } 
		for(let i = 0 ; i < checkedRowitems.length ; i ++)
		{
			if(i>0) ctReqSeqArr+= '^';
			ctReqSeqArr+=checkedRowitems[i].item.reqSeq;
		}  
	 	ctReqDel(checkedRowitems[0].item.ctReqNo , ctReqSeqArr ); 
		});
		
	$('select[id=deliWay]').bind('change', function(event) {
		const deliway = $("#deliWay").val()
	 
		if(deliway == '방문수령')
		{
			$("#senderDiv").hide();
			$("#receiverDiv").hide();
			$("#payTypeLabel").hide();
			$("#payTypeDiv").hide();
			$("#rcvlogisCodeLabel").show();
			$("#rcvlogisCodeDiv").show();
		}
		else
		{
			$("#senderDiv").show();
			$("#receiverDiv").show();
			$("#payTypeLabel").show();
			$("#payTypeDiv").show();
			$("#rcvlogisCodeLabel").hide();
			$("#rcvlogisCodeDiv").hide();
		}

		
	})	
	 
	 
	searchCtData();
});

	
// 칼럼 레이아웃 작성
const ctReqColumnLayout = [   //요청일자 , 요청번호 , 접수단계 , 구분 , 아이템수 , 요청담당자 ,요청메모 , 접수담당자 , 처리일자 , 거부사유 , 기타메모 , 등록자 , 수정자 , 수정일자
	 { dataField : "regYmd",    headerText : "요청일자", width : 100} 
	,{ dataField : "ctReqNo",   headerText : "요청번호", width: 120,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "procStep",   headerText : "접수단계" , width : 100 } 
	,{ dataField : "reqMaxSeq",      headerText : "아이템수"  , width : 100  }	
	,{ dataField : "reqMgr",      headerText : "요청 담당자" , width : 120}
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
	,{ dataField : "rcvLogisCode",      headerText : "방문처", width : 100}
	,{ dataField : "reqMemo1",      headerText : "요청메모" , width : 260}
	,{ dataField : "procUserId",      headerText : "접수담당자" , width : 120}
	,{ dataField : "procDate",      headerText : "처리일자" , width : 120 }
	,{ dataField : "inMemo1",      headerText : "접수메모", width : 260}
	,{ dataField : "regUserId",      headerText : "등록자", width : 100}	
	,{ dataField : "uptUserId",      headerText : "수정자", width : 100}		
	,{ dataField : "uptTime",      headerText : "수정일자", width : 100}		
]; 

const ctReqItemColumnLayout = [  // 요청번호 , 순번 , 부품id , 품번, 수량
	{ dataField : "ctReqNo",   headerText : "요청번호", width: 100,} 
	,{ dataField : "reqSeq",   headerText : "순번" , width : 60 } 
	,{ dataField : "procStep",   headerText : "처리상태" , width : 60 } 
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }	 
	,{ dataField : "itemId",      headerText : "부품ID"  , width : 150  }	
	,{ dataField : "makerName",      headerText : "제조사명"  , width : 120, style : "left"   }
	,{ dataField : "itemNo",      headerText : "품번"  , width : 150  }
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 }	
	,{ dataField : "itemName",      headerText : "부품명"  , width : 150  }	
	,{ dataField : "qty",      headerText : "수량"  , width : 100  }	  	 
	
	,{ dataField : "storReqComName",      headerText : "창고사용요청업체"  , width : 120 ,editable: false  }	
	,{ dataField : "storReqNo",      headerText : "창고사용요청번호"  , width : 150 ,editable: false  }	
	,{ dataField : "storReqSeq",      headerText : "창고사용요청순번"  , width : 150 ,editable: false  }	
	,{ dataField : "reqMemo1",      headerText : "요청 사항"  , width : 260  }
	,{ dataField : "inMemo1",      headerText : "메모"  , width : 260 ,editable: false  }	
	,{ dataField : "rejectMemo",      headerText : "거절사유"  , width : 260 ,editable: false  }		 
	
]
// AUIGrid 를 생성합니다.
function createAUIGrid(ctReqColumnLayout) {
	
	const auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showAutoNoDataMessage : false,
			showFooter: true,
		
	};
	const auiGridProcps2 = {
			showRowCheckColumn: true, 
			showRowAllCheckBox: true,
			independentAllCheckBox: true,
		
			rowCheckableFunction: function (rowIndex, isChecked, item) {
					if(item.procStep != "" && item.procStep != null) { 
						return false;
					}
					return true;
				},
			rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
				 if(item.procStep != "" && item.procStep != null) { 
					return false;  
				}
				return true;
			}
			
	}
	 
	// 실제로 #grid_wrap 에 그리드 생성
	 AUIGrid.create("#grid_wrap", ctReqColumnLayout, auiGridProps);
  
  	//회수요청 상세내역
	AUIGrid.bind("#grid_wrap", "cellDoubleClick", function (event) {  
		
	 
		//console.log("columnIndex:"+event.dataField);  
		if (event.dataField == "ctReqNo") {    
		
			
			 const ctReqNo = event.item.ctReqNo; 
			 dialogCtReq = $("#dialog-form").dialog({ 
				height: 550,
				width: 1200,
				modal: true,
				headerHeight: 40,
				position: { my: "center", at: "center", of: window },
				
				close: function() {
				},
				open:function (type, data) { 
				// Dialog의 Title Bar 제거
	               $(this).dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
	               
	               AUIGrid.destroy("#grid_wrap2");
	               AUIGrid.create("#grid_wrap2", ctReqItemColumnLayout, (event.item.procStep == '요청')?auiGridProcps2:{});
	               
	               AUIGrid.bind("#grid_wrap2", "rowAllChkClick", function (event) {
						if (event.checked) {
						 
							let uniqueValues = [''];
					 
							AUIGrid.setCheckedRowsByValue(event.pid, "procStep", uniqueValues);
						} else {
							AUIGrid.setCheckedRowsByValue(event.pid, "procStep", []);
						}
					});
	               
	               if(event.item.procStep == '요청')
	              		$("#dialogBtnCancel").show();
	               else
	               		$("#dialogBtnCancel").hide();
	               
	               $.ajax(	{
						type : "POST",
						url : "/order/out-ct-req-item-list",
						dataType : "json",
						data: { 
							ctReqNo
						},
						async: false,
						//contentType: "application/json; charset=utf-8",
						contentType : "application/x-www-form-urlencoded;charset=UTF-8",
						success:function(data){ 
							if(data == null ) return;
							if(data.ctReqItemList == null) return;
							  
							AUIGrid.setGridData("#grid_wrap2" ,data.ctReqItemList); 
							 
							$("#dialogCtReqNo").text(nTxtRmv(event.item.ctReqNo));
							$("#dialogCtRegYmd").text(nTxtRmv(event.item.regYmd));
							$("#dialogCtMgr").val(nTxtRmv(event.item.reqMgr));
							$("#dialogCtMemo").val(nTxtRmv(event.item.reqMemo1));
							$("#dialogCtProcUserId").text(nTxtRmv(event.item.procUserId));
							$("#dialogCtProcStep").text(nTxtRmv(event.item.procStep));
							$("#dialogCtProcDate").text(nTxtRmv(event.item.procDate));
							$("#dialogCtRejectMemo").text(nTxtRmv(event.item.inMemo1));
							
							$("#deliWay").val(nTxtRmv(event.item.deliWay || '일반배송'));
							$("#deliPayType").val(nTxtRmv(event.item.deliPayType || '선불'));
							$("#rcvlogisCode").val(nTxtRmv(event.item.rcvLogisCode || '군자'));
							 
							if(event.item.deliWay == '방문수령')
							{
								$("#senderDiv").hide();
								$("#receiverDiv").hide();
								$("#payTypeLabel").hide();
								$("#payTypeDiv").hide();
								$("#rcvlogisCodeLabel").show();
								$("#rcvlogisCodeDiv").show();
							}
							else
							{
								$("#senderDiv").show();
								$("#receiverDiv").show();
								$("#payTypeLabel").show();
								$("#payTypeDiv").show();
								$("#rcvlogisCodeLabel").hide();
								$("#rcvlogisCodeDiv").hide();
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
			}); 
		};
	})
}
function nTxtRmv(text) // null데이터로 인한 undefined 텍스트 제거용
{
	if(text == null)
		return '';
	else 
		return text;
		
}

function searchCtData() { //회수요청 마스터 조회
	 
	const sYmd1 = document.getElementById("startpicker-input").value.replace(/-/g,'');
	const eYmd1 = document.getElementById("endpicker-input").value.replace(/-/g,'');
	let ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";	}
	const ctReqNo = $("#ctReqNo").val(); 	 

 

	$.ajax(	{
		type : "POST",
		url : "/order/out-ct-req-list",
		dataType : "json",
		data: { 
			sYmd1,
			eYmd1,
			ymdIgnoreYN,
			ctReqNo,
			reqYN : 'Y' 
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			if(data == null ) return;
			if(data.ctReqList == null) return;
			if (data.ctReqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				location.href;
				return; 						
			}
			 
			
			AUIGrid.setGridData("#grid_wrap" ,data.ctReqList);  
		//	for(let i = 0 ; i < )
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
function ctReqDel (ctReqNo , ctReqSeqArr) //요청취소에 대한 통신
{
	$.ajax(	{
		type : "POST",
		url : "/order/ctReqDel",
		dataType : "json",
		data: { 
			ctReqNo,
			ctReqSeqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			dblRegClkBln = false;
			if(data.db_resultCode == 'Err')
				alert(data.db_resultMsg);
			else
			{
				dialogCtReq.dialog("close");
				searchCtData();
				alert("요청이 취소되었습니다");
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
function infoUpdate(info)  // 상세내역의 '저장'버튼에 대한 통신 
{
	
	if(info.deliWay == '')
	{
		alert("수령방법을 선택하세요.")
		$("#deliWay").focus();
		 dblRegClkBln = false;
		return;
	}
	if(info.deliWay == '방문수령')
	{
		if(info.rcvlogisCode == '')
		{
			alert("방문처를 선택하세요.")
			$("#rcvlogisCode").focus();
		 	dblRegClkBln = false;
			return;
		}
	}
	else
	{
		if(info.deliPayType == '')
		{
			alert("비용을 선택하세요.")
			$("#deliPayType").focus();
		 	dblRegClkBln = false;
			return;
		}
	}
	
	$.ajax(	{
		type : "POST",
		url : "/order/ctReqAdd",
		dataType : "json",
		data: { 
			reqNo : info.ctReqNo,
			reqMgr : info.ctMgr,
			reqMemo : info.ctMemo ,
			deliWay : info.deliWay ,
			deliPayType : info.deliWay =='방문수령'? '' :info.deliPayType , 
			rcvlogisCode : info.deliWay =='방문수령'? info.rcvLogisCode :''
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			dialogCtReq.dialog("close"); 
			searchCtData();
			alert("저장되었습니다");
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



