import { ajaxPost, auiGridDataSet } from './4carModule.js'

// 그리드 생성 후 해당 ID 보관 변수
let myGridID;
let curSIncYYYYMM ;

 
let datepicker;
const DATETYPE = {YEAR : "year" , MONTH : "month"};  // 달력ui변경용 상수
let curType = DATETYPE.MONTH; // 현재 선택된 조회 타입
function datePickerSet(type) //달력 ui를 매개변수로 받은 타입으로 바꿔주는 함수
{
	if(curType != DATETYPE.MONTH && curType != DATETYPE.YEAR) return;  // DATETYPE에 있는 타입 이외의 경우 종료
	datepicker = new tui.DatePicker('#calendar-wrapper', {
		language: 'ko',
	    date: new Date(),
	    input: {
	        element: '#reportTargetMM',
	        format: type=='month'?'yyyy-MM':'yyyy'  
	    },
	    type
	});
	
}
 
$(document).ready(function() { //columnLayout
	datePickerSet(curType);
	createAUIGrid(columnLayout, "#grid_wrap1");
	$("#grid_wrap1").css("display", "contents");
	setGridData();
	
//	$("#btnFind").click(() => {
//		setGridData();
//	});
//	
	$("#btnFind").click(()=>{//조회버튼 추가로 날짜 체크 불필요 
		curSIncYYYYMM=  $("#reportTargetMM").val()+'-';
		setGridData();
	});
	$("#btnDateTypeChange").click(()=>{
		curType = (curType==DATETYPE.YEAR?DATETYPE.MONTH:DATETYPE.YEAR); // 현재와 다른 타입으로 변경
		$("#btnDateTypeChange").html((curType==DATETYPE.YEAR?'일별':'월별')+' 전환'); // 변경된 타입에 따라 전환버튼 텍스트 변경
		datePickerSet(curType);  //변경된 타입에 달력 UI 셋팅
	})

});

//outRlReport
function setGridData() {
	
	let sYmd1 = $("#reportTargetMM").val();  //시작날짜 
	let eYmd1;
	
	const workingType =  curType == DATETYPE.MONTH?'D_LIST':'M_LIST'; 
	const pIgnoreYN = $("#pIgnoreYN").is(":checked")?'Y':'N'; 
 	
	if(curType == DATETYPE.MONTH) // 일간
	{
		eYmd1 = sYmd1+'-31';
		sYmd1+= '-01';
	}
	else 
	{
		eYmd1 = sYmd1+'-12-31';
		sYmd1+= '-01-01';
	}
		  
	// 서버 데이터 통신(조회) 
	ajaxPost("/stats/conStockRpt",
	{workingType ,  sYmd1 , eYmd1 ,pIgnoreYN} ,
	(data)=>{
		let auiDataList = auiGridDataSet(columnLayout , data.conStockRpt);  //데이터를 AUIGridList로 사용할수 있도록 셋팅
	 	if(auiDataList == null) {AUIGrid.clearGridData("#grid_wrap1"); return;};
		if(auiDataList[0] == 0){
			AUIGrid.clearGridData("#grid_wrap1");
			return;
		} 
		for(let i = 0 ;i< data.conStockRpt.length ; i++)
		{
			auiDataList[i].type1qty = data.conStockRpt[i].type1 + '('+data.conStockRpt[i].type1Qty +')'; 
			auiDataList[i].type2qty = data.conStockRpt[i].type2 + '('+data.conStockRpt[i].type2Qty +')'; 
			auiDataList[i].type3qty = data.conStockRpt[i].type3 + '('+data.conStockRpt[i].type3Qty +')'; 
			 
			
		} 
		
		if(curType == DATETYPE.MONTH) //// yyyy-mm-dd 를 #d(요일)로 변경 > 2024-02-21  => 21(수) 
		{
			for(let i = 0 ; i < auiDataList.length ; i++) // 일자에 요일을 기록하는 로직
			{ 
				 
				let day = new Date(auiDataList[i].stdYmd).getDay();
					
				switch (day) {
	
				case 0:
					day = '일';
					break;
				case 1:
					day = '월';
					break;
				case 2:
					day = '화';
					break;
				case 3:
					day = '수';
					break;
				case 4:
					day = '목';
					break;
				case 5:
					day = '금';
					break;
				case 6:
					day = '토';
					break;
				}
				auiDataList[i].stdYmd = auiDataList[i].stdYmd.substr(8,2);
			 	auiDataList[i].stdYmd  = auiDataList[i].stdYmd<10?auiDataList[i].stdYmd.substr(1,1):auiDataList[i].stdYmd ;
	 			auiDataList[i].stdYmd += '('+day+')';
			}
		}
		else if(curType == DATETYPE.YEAR)  // yyyy-mm 를 #m월로 변경 > 2024-02  => 2월 ,  2024-11 => 11월
		{
			for(let i = 0 ; i < auiDataList.length ; i++) // 월간일 경우 월 붙여줌
			{ 
				auiDataList[i].stdYmd = auiDataList[i].stdYmd.substr(5,2);
				auiDataList[i].stdYmd  = auiDataList[i].stdYmd<10?auiDataList[i].stdYmd.substr(1,1):auiDataList[i].stdYmd ;
				auiDataList[i].stdYmd += '월';
			}
		}
		
		AUIGrid.setGridData("#grid_wrap1", auiDataList); // 그리드에 넣음 
	} 
	); 
 
}
 
function createAUIGrid(columnLayout, gridIdName) {

	let auiGridProps = {
		 
		 
		usePaging: true,
		// 페이징 사용		
		usePaging: false,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		pageRowCount: 40,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: false,

		selectionMode: "multipleCells",

		showAutoNoDataMessage: false,

		showRowCheckColumn: false,
		rowCheckToRadio: false,
		showRowNumColumn: false,
		showFooter: true
 

			
	};
	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create(gridIdName, columnLayout, auiGridProps);
	AUIGrid.setFooter(myGridID, footerLayout);
	
	
}


const columnLayout = [   // 회수접수내역의 레이아웃
	{ dataField : "stdYmd",    headerText : "사용날짜", width : 70 } 
	,{ dataField : "acount",    headerText : "사용건", width : 60 } 
	,{ dataField : "qty",    headerText : "수량", width : 60  } 
	,{ dataField : "centerPrice",    headerText : "센터가", width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0" } 
	,{ dataField : "costPrice",    headerText : "매입단가", width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "saleUnitPrice",    headerText : "판매단가", width : 80 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "totalCenterPrice",    headerText : "센터금액", width : 100 , style:"right" , dataType: "numeric", formatString: "#,##0", headerTooltip : {
        show : true,
        tooltipHtml : '센터가 * 수량'
    } } 
	,{ dataField : "totalCostPrice",    headerText : "매입금액", width : 100 , style:"right" , dataType: "numeric", formatString: "#,##0", headerTooltip : {
        show : true,
        tooltipHtml : '매입단가 * 수량'
    } } 
	,{ dataField : "totalPrice",    headerText : "판매금액", width : 100 , style:"right" , dataType: "numeric", formatString: "#,##0", headerTooltip : {
        show : true,
        tooltipHtml : '판매단가 * 수량'
    } } 
	,{ dataField : "grCostPrice",    headerText : "그린파츠원가", width : 110 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "grSaleUnitPrice",    headerText : "그린파츠판매단가", width : 120 , style:"right" , dataType: "numeric", formatString: "#,##0"} 
	,{ dataField : "type1qty",    headerText : "1.주문(발주)접수", width : 120 , headerTooltip : {
        show : true,
        tooltipHtml : '본점법인 주문의 경우 외부재고, 지점법인 주문의 경우 내부+외부위탁재고 사용 건수(수량)'
    } } 
	,{ dataField : "type2qty",    headerText : "2.G주문(창고사용)", width : 130 , headerTooltip : {
        show : true,
        tooltipHtml : '그린파츠에 주문잡힌 외부업체에서 내부+외부재고 사용 건수(수량)'
    }} 
	,{ dataField : "type3qty",    headerText : "3.회수(P창고사용)", width : 140 , headerTooltip : {
        show : true,
        tooltipHtml : '본점법인 주문에서 내부재고사용 건수(수량)'
    }}  
	,{ dataField : "consignPanItem",    headerText : "P재고판매건", width : 130 }  
	,{ dataField : "consignOutItem",    headerText : "외부재고판매건", width : 100  }  
	 

]; 
const footerLayout = [ 
	{ labelText: "합계", positionField: "stdYmd", style: 'text-align: center' },
	{ dataField: "acount", positionField: "acount", operation: "SUM"  , dataType: "numeric" },
	{ dataField: "qty", positionField: "qty", operation: "SUM"  , dataType: "numeric" },
	{ dataField: "centerPrice", positionField: "centerPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "costPrice", positionField: "costPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "saleUnitPrice", positionField: "saleUnitPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "totalCenterPrice", positionField: "totalCenterPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "totalCostPrice", positionField: "totalCostPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "totalPrice", positionField: "totalPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "grCostPrice", positionField: "grCostPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "grSaleUnitPrice", positionField: "grSaleUnitPrice", operation: "SUM", style: 'text-align: right' , dataType: "numeric", formatString: "#,##0"},
	{ dataField: "type1qty", positionField: "type1qty", labelFunction : labelFun},
	{ dataField: "type2qty", positionField: "type2qty", labelFunction : labelFun},
	{ dataField: "type3qty", positionField: "type3qty", labelFunction : labelFun},
	{ dataField: "consignPanItem", positionField: "consignPanItem", operation: "SUM"},
	{ dataField: "consignOutItem", positionField: "consignOutItem", operation: "SUM"}
];

function labelFun(value , columnValues,footerValues) // 1~3타입의 건수(수량)포멧에 대한 sum 라벨
{
	let typeCount = 0;
    let typeQty = 0;
    for(let i = 0 ; i < columnValues.length ; i++)
    {
		const str = columnValues[i].split('(');
		typeCount += Number(str[0]);
		typeQty += Number(str[1].replace(')',''));
	} 
    return typeCount+'('+typeQty+')'; 
}
