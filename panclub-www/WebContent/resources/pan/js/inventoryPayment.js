const myGridID = '#grid_wrap'

$(document).ready(function(){
	const today = new Date();
	tui.DatePicker.createRangePicker({
	language: 'ko',
	startpicker: {
		date: today,
//		autoClose : false,
		input: '#startpicker-input',
		container: '#startpicker-container'
	},
	endpicker: {
		date: today,
		input: '#endpicker-input',
		container: '#endpicker-container'
	}
});
	
	createAUIGrid();
})

//거래처 조회조건 선택할떄 common-pan 사용하려면 필요해서 가져옴
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
//거래처 조회조건 선택할떄 common-pan 사용하려면 필요해서 가져옴
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


function createAUIGrid()
{
	//가격 컬럼 속성 쓰는 애들 많아서 하나 만들어서 전개연산자로 꺼내서 쓰려고 만듬
	const priceAttribute = {dataType: "numeric",formatString: "#,##0", style:"right"};
	//수량 0이 아닌경우 강조효과
	const customStyle = {styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "custom-font-bold";	}	return 'right';	}}; 
	
	const columnLayout = [ 
		{ dataField : "업체코드",   headerText : "업체코드" , width: 60 , style:'left' } ,
		{ dataField : "업체명",   headerText : "업체명" , width: 100  , style:'left'} ,
		{ dataField : "품목ID",   headerText : "품목ID" , width: 80  , style:'left'} ,
		{ dataField : "부품번호",   headerText : "부품번호" , width: 100  , style:'left'} ,
		{ dataField : "품목명",   headerText : "품목명" , width: 100  , style:'left'} ,
		
		{headerText : '기초재고' , children : [
			{ dataField : "기초재고수량",   headerText : "수량" , width: 50  , ...customStyle} ,
			{ dataField : "기초재고센터가",   headerText : "센터가" , width: 50  ,...priceAttribute} ,
			{ dataField : "기초재고단가",   headerText : "단가" , width: 50  ,...priceAttribute} ,
			{ dataField : "기초재고센터금액",   headerText : "센터금액" , width: 60  ,...priceAttribute} ,
			{ dataField : "기초재고금액",   headerText : "금액" , width: 50  ,...priceAttribute}
		]},
		 
		{headerText : '입고' , children : [
			{ dataField : "입고수량",   headerText : "수량" , width: 50  ,...customStyle} ,
			{ dataField : "입고센터가",   headerText : "센터가" , width: 50  ,...priceAttribute} ,
			{ dataField : "입고단가",   headerText : "단가" , width: 50  ,...priceAttribute} ,
			{ dataField : "입고센터금액",   headerText : "센터금액" , width: 60  ,...priceAttribute} ,
			{ dataField : "입고금액",   headerText : "금액" , width: 50  ,...priceAttribute} 
		]},
		
		{headerText : '수동입고' , children : [
			{ dataField : "수동입고수량",   headerText : "수량" , width: 50  ,...customStyle} ,
			{ dataField : "수동입고센터가",   headerText : "센터가" , width: 50  ,...priceAttribute} ,
			{ dataField : "수동입고단가",   headerText : "단가" , width: 50 , ...priceAttribute } ,
			{ dataField : "수동입고센터금액",   headerText : "센터금액" , width: 60 , ...priceAttribute } ,
			{ dataField : "수동입고금액",   headerText : "금액" , width: 50  ,...priceAttribute} 
		]},
		
		{headerText : '반품입고' , children : [
			{ dataField : "반품입고수량",   headerText : "수량" , width: 50 ,...customStyle} ,
			{ dataField : "반품입고센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
			{ dataField : "반품입고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
			{ dataField : "반품입고센터금액",   headerText : "센터금액" , width: 60  , ...priceAttribute} ,
			{ dataField : "반품입고금액",   headerText : "금액" , width: 50  , ...priceAttribute} ,
		]},
		
		{headerText : '이동입고' , children : [
			{ dataField : "이동입고수량",   headerText : "수량" , width: 50 ,...customStyle} ,
			{ dataField : "이동입고센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
			{ dataField : "이동입고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
			{ dataField : "이동입고센터금액",   headerText : "센터금액" , width: 60  , ...priceAttribute} ,
			{ dataField : "이동입고금액",   headerText : "금액" , width: 50 , ...priceAttribute} ,
		]},
		
		{headerText : '실사입고' , children : [
			{ dataField : "실사입고수량",   headerText : "수량" , width: 50  ,...customStyle} ,
			{ dataField : "실사입고센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
			{ dataField : "실사입고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
			{ dataField : "실사입고센터금액",   headerText : "센터금액" , width: 60  , ...priceAttribute} ,
			{ dataField : "실사입고금액",   headerText : "금액" , width: 50  , ...priceAttribute} ,
		]},
		
		{headerText : '당기입고' , children : [
			{ dataField : "당기입고수량",   headerText : "수량" , width: 50   ,...customStyle} ,
			{ dataField : "당기입고센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
			{ dataField : "당기입고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
			{ dataField : "당기입고센터금액",   headerText : "센터금액" , width: 60  , ...priceAttribute} ,
			{ dataField : "당기입고금액",   headerText : "금액" , width: 50  , ...priceAttribute} ,
		]},
		
		{headerText : '판매출고' , children : [
			{ dataField : "판매출고수량",   headerText : "수량" , width: 50   ,...customStyle} ,
			{ dataField : "판매출고센터가",   headerText : "센터가" , width: 50 , ...priceAttribute} ,
			{ dataField : "판매출고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
			{ dataField : "판매출고센터금액",   headerText : "센터금액" , width: 60 , ...priceAttribute} ,
			{ dataField : "판매출고금액",   headerText : "금액" , width: 50 , ...priceAttribute} ,
		]},
		
		{headerText : '판매출고2' , children : [
		{ dataField : "판매출고수량2",   headerText : "수량" , width: 50   ,...customStyle} ,
		{ dataField : "판매출고센터가2",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
		{ dataField : "판매출고단가2",   headerText : "단가" , width: 50  , ...priceAttribute} ,
		{ dataField : "판매출고센터금액2",   headerText : "센터금액" , width: 60 , ...priceAttribute} ,
		{ dataField : "판매출고금액2",   headerText : "금액" , width: 50 , ...priceAttribute} ,
		]},
		
		{headerText : '수동출고' , children : [
		{ dataField : "수동출고수량",   headerText : "수량" , width: 50 ,...customStyle} ,
		{ dataField : "수동출고센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
		{ dataField : "수동출고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
		{ dataField : "수동출고센터금액",   headerText : "센터금액" , width: 60 , ...priceAttribute} ,
		{ dataField : "수동출고금액",   headerText : "금액" , width: 50 , ...priceAttribute} ,
		]},
		
		{headerText : '이동출고' , children : [
		{ dataField : "이동출고수량",   headerText : "수량" , width: 50 ,...customStyle} ,
		{ dataField : "이동출고센터가",   headerText : "센터가" , width: 50 , ...priceAttribute} ,
		{ dataField : "이동출고단가",   headerText : "단가" , width: 50 , ...priceAttribute} ,
		{ dataField : "이동출고센터금액",   headerText : "센터금액" , width: 60, ...priceAttribute} ,
		{ dataField : "이동출고금액",   headerText : "금액" , width: 50 , ...priceAttribute} ,
		]},
		
		{headerText : '실사출고' , children : [
		{ dataField : "실사출고수량",   headerText : "수량" , width: 50 ,...customStyle} ,
		{ dataField : "실사출고센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
		{ dataField : "실사출고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
		{ dataField : "실사출고센터금액",   headerText : "센터금액" , width: 60 , ...priceAttribute } ,
		{ dataField : "실사출고금액",   headerText : "금액" , width: 50  , ...priceAttribute} ,
		]},
		
		{headerText : '당기출고' , children : [
		{ dataField : "당기출고수량",   headerText : "수량" , width: 50 ,...customStyle} ,
		{ dataField : "당기출고센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
		{ dataField : "당기출고단가",   headerText : "단가" , width: 50  , ...priceAttribute} ,
		{ dataField : "당기출고센터금액",   headerText : "센터금액" , width: 60 , ...priceAttribute } ,
		{ dataField : "당기출고금액",   headerText : "금액" , width: 50 , ...priceAttribute } ,
		]},
		
		{headerText : '기말' , children : [
		{ dataField : "기말수량",   headerText : "수량" , width: 50 ,...customStyle} ,
		{ dataField : "기말센터가",   headerText : "센터가" , width: 50  , ...priceAttribute} ,
		{ dataField : "기말단가",   headerText : "단가" , width: 50   , ...priceAttribute} ,
		{ dataField : "기말센터금액",   headerText : "센터금액" , width: 60  , ...priceAttribute} ,
		{ dataField : "기말금액",   headerText : "금액" , width: 50   , ...priceAttribute} ,
		]}
	];
	
	const footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		
		{		dataField: "기초재고수량",		positionField: "기초재고수량",		operation: "SUM",		formatString: "#,##0",style:"right"	}, 
//		{		dataField: "기초재고센터가",		positionField: "기초재고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "기초재고단가",		positionField: "기초재고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "기초재고센터금액",		positionField: "기초재고센터금액",		operation: "SUM",		formatString: "#,##0" ,style:"right"	}, 
		{		dataField: "기초재고금액",		positionField: "기초재고금액",		operation: "SUM",		formatString: "#,##0",style:"right"	}, 
		
		{		dataField: "입고수량",		positionField: "입고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "입고센터가",		positionField: "입고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "입고단가",		positionField: "입고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "입고센터금액",		positionField: "입고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "입고금액",		positionField: "입고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "수동입고수량",		positionField: "수동입고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "수동입고센터가",		positionField: "수동입고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "수동입고단가",		positionField: "수동입고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "수동입고센터금액",		positionField: "수동입고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "수동입고금액",		positionField: "수동입고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "반품입고수량",		positionField: "반품입고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "반품입고센터가",		positionField: "반품입고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "반품입고단가",		positionField: "반품입고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "반품입고센터금액",		positionField: "반품입고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "반품입고금액",		positionField: "반품입고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "이동입고수량",		positionField: "이동입고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "이동입고센터가",		positionField: "이동입고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "이동입고단가",		positionField: "이동입고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "이동입고센터금액",		positionField: "이동입고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "이동입고금액",		positionField: "이동입고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "실사입고수량",		positionField: "실사입고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "실사입고센터가",		positionField: "실사입고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "실사입고단가",		positionField: "실사입고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "실사입고센터금액",		positionField: "실사입고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "실사입고금액",		positionField: "실사입고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "당기입고수량",		positionField: "당기입고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "당기입고센터가",		positionField: "당기입고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "당기입고단가",		positionField: "당기입고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "당기입고센터금액",		positionField: "당기입고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "당기입고금액",		positionField: "당기입고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "판매출고수량",		positionField: "판매출고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "판매출고센터가",		positionField: "판매출고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "판매출고단가",		positionField: "판매출고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "판매출고센터금액",		positionField: "판매출고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "판매출고금액",		positionField: "판매출고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "판매출고수량2",		positionField: "판매출고수량2",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "판매출고센터가2",		positionField: "판매출고센터가2",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "판매출고단가2",		positionField: "판매출고단가2",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "판매출고센터금액2",		positionField: "판매출고센터금액2",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "판매출고금액2",		positionField: "판매출고금액2",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "수동출고수량",		positionField: "수동출고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "수동출고센터가",		positionField: "수동출고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "수동출고단가",		positionField: "수동출고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "수동출고센터금액",		positionField: "수동출고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "수동출고금액",		positionField: "수동출고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "이동출고수량",		positionField: "이동출고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "이동출고센터가",		positionField: "이동출고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "이동출고단가",		positionField: "이동출고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "이동출고센터금액",		positionField: "이동출고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "이동출고금액",		positionField: "이동출고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "실사출고수량",		positionField: "실사출고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "실사출고센터가",		positionField: "실사출고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "실사출고단가",		positionField: "실사출고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "실사출고센터금액",		positionField: "실사출고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "실사출고금액",		positionField: "실사출고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "당기출고수량",		positionField: "당기출고수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "당기출고센터가",		positionField: "당기출고센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "당기출고단가",		positionField: "당기출고단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "당기출고센터금액",		positionField: "당기출고센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "당기출고금액",		positionField: "당기출고금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		{		dataField: "기말수량",		positionField: "기말수량",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
//		{		dataField: "기말센터가",		positionField: "기말센터가",		operation: "SUM",		formatString: "#,##0"	}, 
//		{		dataField: "기말단가",		positionField: "기말단가",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "기말센터금액",		positionField: "기말센터금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		{		dataField: "기말금액",		positionField: "기말금액",		operation: "SUM",		formatString: "#,##0"	,style:"right"}, 
		
		
	];
	
	const auiGridProps = {			
			selectionMode : "multipleCells",
			showFooter: true,
			showAutoNoDataMessage : false,
			fixedColumnCount: 10,
	};
	
	AUIGrid.create(myGridID, columnLayout, auiGridProps);
	AUIGrid.setFooter(myGridID, footerLayout);
}

$("#btnFind").click(()=>{
	inventoryPaymentFind();
})

function inventoryPaymentFind()
{
	if(_SPINNER) return; // 스핀돌고있으면 재조회 못함 
	const isYmdIgnore = $('input:checkbox[name=ymdIgnoreYN]').is(':checked');
	const itemId = $("#itemId").val() || 0;// 비어있으면 0으로 간주해서 보냄
	const itemNo = $("#itemNo").val();
	const custCode =  $("#custCode").val();
	
	const notParams = (itemId == 0 && itemNo == '' && custCode == '');
	if(isYmdIgnore && notParams )
	{
		alert('조회조건을 하나 이상 입력하고 조회하세요.');
		return;
	}
	setStartSpinner();
	$.ajax({
		type: "POST",
		url: '/logis/inventoryPayment',
		dataType: "json",
		data: {
			workingType: '', 
			sYmd: isYmdIgnore?'1990-01-01':$("#startpicker-input").val() , 
			eYmd : isYmdIgnore?'2100-12-31':$("#endpicker-input").val()  , 
			itemId  ,  
			itemNo,
			custCode
		},
		async: true,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
		 	AUIGrid.setGridData(myGridID,data); 
			setStopSpinner()
		},
		error: function(x, e) {
			setStopSpinner()
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
			} else if (x.status == 404) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
			} else if (x.status == 500) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
			} else if (e == 'parsererror') {
				alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
			} else if (e == 'timeout') {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
			} else {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n' + x.responseText + ')');
			}
		}
	}); 
}