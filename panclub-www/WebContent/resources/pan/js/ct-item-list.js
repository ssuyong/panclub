
//회수품목 페이지의 js
//사용자는 접수자 

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
	createAUIGrid(ctItemColumnLayout);	
	
	$("#btnFind").click(function(){   // 회수접수내역 조회버튼 
		searchCtData();
	});

});

// 칼럼 레이아웃 작성
const ctItemColumnLayout = [  // 회수접수 상세내역의 레이아웃
	{ dataField : "ctReqNo",   headerText : "요청번호", width: 90 ,editable: false} 
	,{ dataField : "reqSeq",   headerText : "순번" , width : 40  ,editable: false} 
	,{ dataField : "procStep",   headerText : "처리상태" , width : 60 ,editable: false} 
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField : "itemId",      headerText : "부품ID"  , width : 80 ,editable: false  }	
	,{ dataField: "makerName",        headerText: "제조사"  , width : 100,editable: false    }
	,{ dataField : "itemNo",      headerText : "품번"  , width : 120 ,editable: false }	
	,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
	,{ dataField : "itemName",      headerText : "부품명"  , width : 140  ,editable: false, style : "left"}	
	,{ dataField : "reqCustName",      headerText : "요청업체"  , width : 120  ,editable: false , style : "left"}	
	,{ dataField : "qty",      headerText : "수량"  , width : 40 ,editable: false , style : "right"}
	,{ dataField : "selectRack",      headerText : "선택된 랙"  , width : 260    ,editable: false}
	,{ dataField : "storReqComName",      headerText : "창고사용요청업체"  , width : 120   ,editable: false }	
	,{ dataField : "storReqNo",      headerText : "창고사용요청번호"  , width : 120   ,editable: false }	
	,{ dataField : "storReqSeq",      headerText : "창고사용요청순번"  , width : 120   ,editable: false}	
	,{ dataField : "rcvLogisCode",      headerText : "수령물류센터"   ,editable: false}	
	,{ dataField : "reqMemo1",      headerText : "요청 사항"  , width : 260    ,editable: false}	
	,{ dataField : "inMemo1",      headerText : "메모"  , width : 260 ,editable: false  }	
	,{ dataField : "rejectMemo",      headerText : "거절사유"  , width : 260   ,editable :true }	
	 
]

const footerLayout = [{
	labelText: "합계",
	positionField: "regYmd",
	style: "aui-grid-my-column"
}, {
	dataField: "reqMaxSeq",
	positionField: "reqMaxSeq",
	operation: "SUM" 

}, {
	dataField: "rejectCount",
	positionField: "rejectCount",
	operation: "SUM"  

} 

];
// AUIGrid 를 생성합니다.
function createAUIGrid(ctItemColumnLayout) {
	
	const auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showAutoNoDataMessage : false,
			showFooter: true,
		
	};
	 
	// 실제로 #grid_wrap 에 그리드 생성
	AUIGrid.create("#grid_wrap", ctItemColumnLayout, auiGridProps);
   
	AUIGrid.setFooter(myGridID, footerLayout);
	
	$("#procStep").select2();
}


function searchCtData() { // 회수 접수 내역의 마스터 리스트 조회
	 
	const sYmd1 = document.getElementById("startpicker-input").value.replace(/-/g,'');
	const eYmd1 = document.getElementById("endpicker-input").value.replace(/-/g,'');
	let ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";	}
	const ctReqNo = $("#ctReqNo").val(); 	 
	let procStep = '';
 	const itemId = $("#itemId").val();
 	const itemNo = $("#itemNo").val();
 	let reqCustCode = $("#reqCustCode").val(); 
 	
 	if($("#procStep").val() != null)
 	{
		for(item of $("#procStep").val())
		{
			if(procStep != '') procStep += '^';
			procStep += item;
		}
	}

	$.ajax(	{
		type : "POST",
		url : "/order/ct-item-list",
		dataType : "json",
		data: { 
			sYmd1,
			eYmd1,
			ymdIgnoreYN,
			ctReqNo,
			procStep,
			itemId,
			itemNo
			,reqCustCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 			
			if(data == null ) return;
			if(data.ctItemList == null) return;
			
			if (data.ctItemList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				location.href;
				return; 						
			}			 
			
		 	data.ctItemList.sort((a,b)=>a.ctReqNo-b.ctReqNo || parseInt(a.reqSeq) - parseInt(b.reqSeq));	//2024.06.18 sg 
			AUIGrid.setGridData("#grid_wrap" ,data.ctItemList);  
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


