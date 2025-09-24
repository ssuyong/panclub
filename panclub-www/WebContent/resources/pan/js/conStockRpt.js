import { ajaxPost, auiGridDataSet } from './4carModule.js'

// 그리드 생성 후 해당 ID 보관 변수
let myGridID;

let today = new Date();
let datepicker = tui.DatePicker.createRangePicker({
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
 
$(document).ready(function() { //columnLayout
	createAUIGrid(columnLayout, "#grid_wrap1");
	$("#grid_wrap1").css("display", "contents");
	setGridData();
	
	$("#btnFind").click(() => {
		setGridData();
	});

});

//outRlReport
function setGridData() {
	const workingType = 'List';
	const consignCustCode = $("#consignCustCode").val(); // 위탁업체코드 
	const orderCustCode = $("#orderCustCode").val(); // 주문업체코드
	const rcvCustCode = $("#rcvCustCode").val(); // 납품업체코드
	const itemId =   $("#itemId").val()  ; // 부품id
	const itemNo = $("#itemNo").val(); // 품번
	const itemName = '';//$("#itemName").val(); // 품명 
	const sYmd1 = $("#startpicker-input").val();  //시작날짜
	const eYmd1 = $("#endpicker-input").val();    //끝날짜
	const ymdIgnoreYN = $('input:checkbox[name=ymdIgnoreYN]').is(':checked')?'Y':'N';    // 기간전체조회
	const pIgnoreYN = $("#pIgnoreYN").is(":checked")?'Y':'N';
	
	if(ymdIgnoreYN =='Y' && consignCustCode == '' && orderCustCode =='' && rcvCustCode == '' && itemId == '' && itemNo =='' && itemName =='')
	{
		alert("기간 전체조회는 조회조건 하나 이상이 필요합니다.")
		return;
	}
	 
	// 서버 데이터 통신(조회) 
	ajaxPost("/stats/conStockRpt",
	{workingType , consignCustCode, orderCustCode ,rcvCustCode ,itemId , itemNo , itemName   , sYmd1 , eYmd1 ,ymdIgnoreYN , pIgnoreYN} ,
	(data)=>{ 
		const auiDataList = auiGridDataSet(columnLayout , data.conStockRpt);  //데이터를 AUIGridList로 사용할수 있도록 셋팅
	 	if(auiDataList == null) {AUIGrid.clearGridData("#grid_wrap1"); return;};
		if(auiDataList[0] == 0){
			AUIGrid.clearGridData("#grid_wrap1");
			return;
		} 
	 
		
		AUIGrid.setGridData("#grid_wrap1", auiDataList); // 그리드에 넣음 
	} 
	);
	
 
}
 
function createAUIGrid(columnLayout, gridIdName) {

	let auiGridProps = {
		 
		 
		usePaging: true,
		//enableCellMerge: true,
		selectionMode: "multipleCells", 
		showRowNumColumn: true,
		showFooter: true, 
		pageRowCount: 500,
 

			
	};
	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create(gridIdName, columnLayout, auiGridProps);
	AUIGrid.setFooter(myGridID, footerLayout);
	
	
}

const columnLayout = [   // 회수접수내역의 레이아웃
	{ dataField : "stdYmd",    headerText : "사용날짜", width : 80 } 
	,{ dataField : "stdHms",    headerText : "사용시간", width : 70 } 
	,{ dataField : "rptType",    headerText : "타입", width : 150 , style:"left"} 
	,{ dataField : "consignCustCode",    headerText : "위탁업체코드", width : 80 } 
	,{ dataField : "consignCustName",    headerText : "위탁업체명", width : 80 , style:"left"} 
	,{ dataField : "orderCustCode",    headerText : "주문업체코드", width : 100 } 
	,{ dataField : "orderCustName",    headerText : "주문업체명", width : 100 , style:"left"} 
	,{ dataField : "rcvCustCode",    headerText : "납품업체코드", width : 100 } 
	,{ dataField : "rcvCustName",    headerText : "납품업체명", width : 100 , style:"left"} 
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField : "itemId",    headerText : "부품ID", width : 80 } 
	,{ dataField: "makerName",        headerText: "제조사"  , width : 100,editable: false    }
	,{ dataField : "itemNo",    headerText : "품번", width : 150 , style:"left"} 
	,{ dataField: "factoryNo", headerText: "공장품번", width: 120 }
	,{ dataField : "itemName",    headerText : "품명", width : 150 , style:"left"} 
	,{ dataField : "qty",    headerText : "수량", width : 50 } 
	,{ dataField : "centerPrice",    headerText : "센터가", width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "costPrice",    headerText : "매입단가", width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "saleUnitPrice",    headerText : "판매단가", width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "totalCenterPrice",    headerText : "센터금액",  headerTooltip : {
        show : true,
        tooltipHtml : '수량 * 센터가'
    },
    width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "totalCostPrice",    headerText : "매입금액",  headerTooltip : {
        show : true,
        tooltipHtml : '수량 * 매입단가'
    },
    width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "totalPrice",    headerText : "판매금액",  headerTooltip : {
        show : true,
        tooltipHtml : '수량 * 판매단가'
    },
    width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "saleType",    headerText : "판매타입", width : 70  } 
	,{ dataField : "grCostPrice",    headerText : "그린원가", width : 70  , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "grSaleUnitPrice",    headerText : "그린판매단가", width : 80  , style:"right" , dataType: "numeric", formatString: "#,##0"} 

]; 
const footerLayout = [ 
	{ labelText: "합계", positionField: "stdYmd", style: 'text-align: center' },
	{ dataField: "qty", positionField: "qty", operation: "SUM"  , dataType: "numeric" },
	{ dataField: "centerPrice", positionField: "centerPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "costPrice", positionField: "costPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "saleUnitPrice", positionField: "saleUnitPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "totalCenterPrice", positionField: "totalCenterPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "totalCostPrice", positionField: "totalCostPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "totalPrice", positionField: "totalPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "grCostPrice", positionField: "grCostPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "grSaleUnitPrice", positionField: "grSaleUnitPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"}
];
 
