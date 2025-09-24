
// 그리드 생성 후 해당 ID 보관 변수
let myGridID;
let curSIncYYYYMM ;

// 달력 관련
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
 	curSIncYYYYMM = $("#reportTargetMM").val()+'-';
	setGridData(curSIncYYYYMM,curType);
 
	
	$("#btnFind").click(()=>{//조회버튼 추가로 날짜 체크 불필요 
		curSIncYYYYMM=  $("#reportTargetMM").val()+'-';
		setGridData(curSIncYYYYMM,curType); 
	});
	$("#btnDateTypeChange").click(()=>{
		curType = (curType==DATETYPE.YEAR?DATETYPE.MONTH:DATETYPE.YEAR); // 현재와 다른 타입으로 변경
		$("#btnDateTypeChange").html((curType==DATETYPE.YEAR?'일별':'월별')+' 전환'); // 변경된 타입에 따라 전환버튼 텍스트 변경
		datePickerSet(curType);  //변경된 타입에 달력 UI 셋팅
	})
});

//outRlReport
function setGridData(yymm , dateType) { //월간의 경우 'yyyy-' 포멧으로 담기고 일간의 경우 'yyyy-mm-' 포멧으로 담김
	let list = [];
	// 서버 데이터 받기(받아서 리스트) 
	$.ajax({
		type: "POST",
		url: "/stats/outRlReport",
		dataType: "json",
		data: {
			 yymm,
			 dateType
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {   
	 	 
			let row = [];  // 한 행의 데이터를 담기위한 변수
			if(data == null) return;    //데이터가 안넘어오면 종료
			if(data.outRlReport.length == 0) return; // 데이터 길이가 0인경우도 종료
			if(dateType != DATETYPE.MONTH && dateType != DATETYPE.YEAR) return; //타입이 DATETYPE에 없는경우에도 종료
			 
			 
			row.stdYmd = data.outRlReport[0].stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2); // 일간의 경우 날짜에 일일이 들어가고 월간의 경우 월이 들어감 포멧으로 보면 일간 = 'dd' 월간 = 'mm'
 
			for(let i = 0 ; i < data.outRlReport.length ; i++)
			{
				
				let outRlReport = data.outRlReport[i];  //접근하기 편하도록 보관하는 변수
				if(row.stdYmd != outRlReport.stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2)) // 날짜로 정렬된 리스트의 날짜가 변경되면 기존 데이터를 list에 담고 행데이터를 초기화
				{ 
					 
					list.push(row);
					row = [];
					row.stdYmd = outRlReport.stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2);
					 
				} 
				if(dateType == DATETYPE.MONTH || !row["custCount"]) // 일별이거나 혹은 데이터가 아직 없을때 데이터값으로 초기화 해줌
				{
					row.custCount = (dateType == DATETYPE.MONTH)?outRlReport.custCount:outRlReport.mmCustCount; //거래처수는 중복 제외라 단순 sum으론 안되므로 프로시저에서 따로받음
					row.itemCount = (dateType == DATETYPE.MONTH)?outRlReport.itemCount:outRlReport.mmItemCount; //거래처수는 중복 제외라 단순 sum으론 안되므로 프로시저에서 따로받음
					row.riCount = outRlReport.type1+outRlReport.type2+outRlReport.type3+outRlReport.type4;   //분류 합 = 거래수
					row.cnt = outRlReport.cnt;
					row.sumPrice = outRlReport.sumPrice;
					row.taxPrice = outRlReport.taxPrice;
					row.sumPriceTax = outRlReport.sumPriceTax;
					row.sumCenterPrice = outRlReport.sumCenterPrice;
					row.type1 = outRlReport.type1;
					row.type2 = outRlReport.type2;
					row.type3 = outRlReport.type3;
					row.type4 = outRlReport.type4;
					row.sumSalePrice = (outRlReport.salePrice );
					row.profitsPrice = (outRlReport.profitsPrice ); 
					
				} 
				else if (dateType == DATETYPE.YEAR)  // 월별이면 sum 
				{ 
					row.riCount += outRlReport.type1+outRlReport.type2+outRlReport.type3+outRlReport.type4;
					row.cnt += outRlReport.cnt;
					row.sumPrice += outRlReport.sumPrice;
					row.taxPrice += outRlReport.taxPrice;
					row.sumPriceTax += outRlReport.sumPriceTax;
					row.sumCenterPrice += outRlReport.sumCenterPrice;
					row.type1 += outRlReport.type1;
					row.type2 += outRlReport.type2;
					row.type3 += outRlReport.type3;
					row.type4 += outRlReport.type4;
					row.sumSalePrice += (outRlReport.salePrice );
					row.profitsPrice +=  (outRlReport.profitsPrice );
				}
					
			}
		  
			list.push(row); // 데이터 반복문이 종료되면 마지막 행을 추가
		 
			if(dateType == DATETYPE.MONTH) //일별일 경우 요일 표시
			{
				for(let i = 0 ; i < list.length ; i++) // 일자에 요일을 기록하는 로직
				{ 
					let yyyymmdd = (yymm + list[i].stdYmd );
					let day = new Date(yyyymmdd).getDay();
					
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
					list[i].stdYmd  = list[i].stdYmd<10?list[i].stdYmd.substr(1,1):list[i].stdYmd ;
	 				list[i].stdYmd += '('+day+')';
				}
			}
			else if(dateType == DATETYPE.YEAR)
			{
				for(let i = 0 ; i < list.length ; i++) // 월간일 경우 월 붙여줌
				{ 
					list[i].stdYmd  = list[i].stdYmd<10?list[i].stdYmd.substr(1,1):list[i].stdYmd ;
					list[i].stdYmd += '월';
				}
			}
			AUIGrid.setGridData("#grid_wrap1" ,list);
			AUIGrid.setColumnProp("#grid_wrap1" , 0,{headerText : (dateType == DATETYPE.YEAR?"월":"일")});  //월간 일간에 따라 첫번째 헤더 텍스트 변경
			
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
	 	autoGridHeight:true,
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
		showFooter: true, 
	};
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create(gridIdName, columnLayout, auiGridProps);
 
	AUIGrid.setFooter(myGridID, footerLayout); 
} 
 

let columnLayout = [   // 회수접수내역의 레이아웃
	 { dataField : "stdYmd",    headerText : "일", width : 70}  	
	
	,{ dataField : "custCount",   headerText : "거래처 수" , width : 100 } 
	,{ dataField : "riCount",   headerText : "거래 수" , width : 100 } 
	,{ dataField : "itemCount",   headerText : "부품 품목수" , width : 100 } 	
	,{ dataField : "cnt",      headerText : "부품 수량"  , width : 100  }	
	,{ dataField : "sumPrice",      headerText : "공급가액" , width : 120,style: 'text-align: right',dataType :"numeric", formatString: "#,##0"}
	,{ dataField : "taxPrice",      headerText : "세액" , width : 120,style: 'text-align: right',dataType :"numeric", formatString: "#,##0"}
	,{ dataField : "sumPriceTax",      headerText : "합계금액" , width : 200,style: 'text-align: right', dataType :"numeric",formatString: "#,##0"}
	,{ dataField : "sumCenterPrice",      headerText : "표준가 합계" , width : 120 ,style: 'text-align: right',dataType :"numeric",formatString: "#,##0"}
	,{ dataField : "sumSalePrice",      headerText : "판매가 합계" , width : 120 ,style: 'text-align: right',dataType :"numeric",formatString: "#,##0"}
	,{ dataField : "profitsPrice",      headerText : "이익" , width : 120 ,style: 'text-align: right',dataType :"numeric",formatString: "#,##0"}
	,{ dataField : "type1",      headerText : "판매출고(H)"  , width : 100  }		 	
	,{ dataField : "type2",      headerText : "반품입고(H)"  , width : 100  }		 	
	,{ dataField : "type3",      headerText : "판매출고(B)"  , width : 100  }		 	
	,{ dataField : "type4",      headerText : "반품입고(B)"  , width : 100  }		 	
]; 
 
let footerLayout =[
	{		labelText: "누계",		positionField: "stdYmd",		style: "aui-grid-my-column"	},
 
	{		dataField: "riCount",positionField: "riCount",	operation: "SUM",	style: 'text-align: center'},
	{		dataField: "cnt",positionField: "cnt",	operation: "SUM",	style: 'text-align: center'},
	{		dataField: "sumPrice",positionField: "sumPrice",	operation: "SUM",	formatString: "#,##0",style: 'text-align: right'},
	{		dataField: "taxPrice",positionField: "taxPrice",	operation: "SUM",	formatString: "#,##0",style: 'text-align: right'},
	{		dataField: "sumPriceTax",positionField: "sumPriceTax",	operation: "SUM",	formatString: "#,##0",style: 'text-align: right'},
	{		dataField: "sumCenterPrice",positionField: "sumCenterPrice",	operation: "SUM",	formatString: "#,##0",style: 'text-align: right'},
	{		dataField: "sumSalePrice",positionField: "sumSalePrice",	operation: "SUM",	formatString: "#,##0",style: 'text-align: right'},
	{		dataField: "profitsPrice",positionField: "profitsPrice",	operation: "SUM",	formatString: "#,##0",style: 'text-align: right'},
	{		dataField: "type1",positionField: "type1",	operation: "SUM",	style: 'text-align: center'},
	{		dataField: "type2",positionField: "type2",	operation: "SUM",	style: 'text-align: center'},
	{		dataField: "type3",positionField: "type3",	operation: "SUM",	style: 'text-align: center'},
	{		dataField: "type4",positionField: "type4",	operation: "SUM",	style: 'text-align: center'},
];