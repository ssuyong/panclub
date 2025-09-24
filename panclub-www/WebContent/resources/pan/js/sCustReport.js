
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
	// 서버 데이터 받기(받아서 리스트) 
	$.ajax({
		type: "POST",
		url: "/stats/sCustReport",
		dataType: "json",
		data: {
			sYmd1,
			eYmd1,
			custComCode,
			comCode
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			AUIGrid.setGridData("#grid_wrap1", data.sCustReport);
			$("#subTitle").text("거래처별 거래 현황(" + sYmd1 + "~" + eYmd1 + ")");
		},
		error: function(x, e) {
			if(x.status==0){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
	        }else if(x.status==404){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
	        }else if(x.status==500){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
	        }else if(e=='parsererror'){
	            alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
	            location.reload();
	        }else if(e=='timeout'){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
	        }else {
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
	        }
		}
	});
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
	{ dataField: "custCode", headerText: "거래처 코드" }
	, { dataField: "custName", headerText: "거래처 이름" }
	, { dataField: "comCode", headerText: "업체 코드" }
	, { dataField: "comName", headerText: "업체 이름" }
	, { dataField: "rlPrice", headerText: "출고 금액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
	, { dataField: "whPrice", headerText: "입고 금액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }
	, { dataField: "orderPrice", headerText: "주문 금액", style: 'text-align: right', dataType: "numeric", formatString: "#,##0" }

]; 
const footerLayout = [ 
	{ labelText: "합계", positionField: "custCode", style: 'text-align: center' },
	{ dataField: "rlPrice", positionField: "rlPrice", operation: "SUM", style: 'text-align: center' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "whPrice", positionField: "whPrice", operation: "SUM", style: 'text-align: center' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "orderPrice", positionField: "orderPrice", operation: "SUM", style: 'text-align: center' , dataType: "numeric", formatString: "#,##0"}
];
 
 
 
