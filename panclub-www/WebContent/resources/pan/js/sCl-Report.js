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
	const custComCode = $("#InputCustCode").val(); // 거래처
	const comCode = $("#InputComCode").val(); //업체
	const sYmd1 = $("#startpicker-input").val();  //시작날짜
	const eYmd1 = $("#endpicker-input").val();    //끝날짜
	const procStep = $("#procStep").val(); 
	 
	// 서버 데이터 통신(조회) 
	ajaxPost("/stats/sCl-Report" ,   
	 {sYmd1, eYmd1, custComCode, comCode , procStep},
	 (data)=>{
		const auiDataList = auiGridDataSet(columnLayout , data.sClReportData);  //데이터를 AUIGridList로 사용할수 있도록 셋팅
		AUIGrid.setGridData("#grid_wrap1", auiDataList); // 그리드에 넣음
		$("#subTitle").text("거래처별 청구 현황(" + sYmd1 + "~" + eYmd1 + "):"+procStep); //조회 조건을 타이틀로 남겨줌
	}) 
}
 
function createAUIGrid(columnLayout, gridIdName) {

	let auiGridProps = {
		autoGridHeight: true,
		usePaging: false,
		//enableCellMerge: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage: false,
		showRowCheckColumn: false,
		rowCheckToRadio: false,
		showRowNumColumn: false,
		showFooter: true,
		fillColumnSizeMode: true
	};
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create(gridIdName, columnLayout, auiGridProps);
	AUIGrid.setFooter(myGridID, footerLayout);
}


const columnLayout = [   // 회수접수내역의 레이아웃
	{  headerText : "거래처 정보", 
		children: [
		{ dataField: "custCode", headerText: "코드" }
		, { dataField: "custName", headerText: "거래처 이름" }
		]
	},
	{  headerText : "업체 정보", 
		children: [
		 { dataField: "comCode", headerText: "코드" }
		, { dataField: "comName", headerText: "업체 이름" }
		]
	},
	{  headerText : "전체", 
		children: [
		 { dataField: "sumSaleAmt", headerText: "판매가", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		, { dataField: "sumClAmt", headerText: "청구액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		, { dataField: "sumCollectAmt", headerText: "수금액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		]
	},
	{  headerText : "보험", 
		children: [
		 { dataField: "insureSaleAmt", headerText: "판매가", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		, { dataField: "insureClAmt", headerText: "청구액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		, { dataField: "insureCollectAmt", headerText: "수금액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		]
	},
	{  headerText : "일반", 
		children: [
		 { dataField: "saleAmt", headerText: "판매가", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		, { dataField: "clAmt", headerText: "청구액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		, { dataField: "collectAmt", headerText: "수금액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
		]
	}

]; 
const footerLayout = [ 
	{ labelText: "합계", positionField: "custCode", style: 'text-align: center' },
	{ dataField: "sumSaleAmt", positionField: "sumSaleAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "sumClAmt", positionField: "sumClAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "sumCollectAmt", positionField: "sumCollectAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "insureSaleAmt", positionField: "insureSaleAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "insureClAmt", positionField: "insureClAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "insureCollectAmt", positionField: "insureCollectAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "saleAmt", positionField: "saleAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "clAmt", positionField: "clAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "collectAmt", positionField: "collectAmt", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"}
];
 