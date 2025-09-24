
// 그리드 생성 후 해당 ID 보관 변수
let myGridID;
let curSIncYYYYMM ;
let totalValue = [0,0,0];  // 푸터의 계싼을 위한 변수

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

//	//달력에서 다른 달을 선택하면 통신이 이루어지도록 되어있음
//	$("#btnYYMMSelect").click(function() {  
//		if(curSIncYYYYMM !=  $("#reportTargetMM").val()+'-')
//		{
//			curSIncYYYYMM=  $("#reportTargetMM").val()+'-';
//			setGridData(curSIncYYYYMM); 
//		} 
//	});
	
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

function setGridData(yymm , dateType) { //월간의 경우 'yyyy-' 포멧으로 담기고 일간의 경우 'yyyy-mm-' 포멧으로 담김
	let list = [];
		
	let exceptCustYN = "N";
	if ($('input:checkbox[name=exceptCustYN]').is(':checked') == true){
		exceptCustYN = "Y";
	}
	
	// 서버 데이터 받기(받아서 리스트) 
	$.ajax({
		type: "POST",
		url: "/stats/dp-wd-rpt",
		dataType: "json",
		data: {
			 yymm,
			 dateType,
			 exceptCustYN
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {    
	 		totalValue = [0,0,0];  
			let row = [];  // 한 행의 데이터를 담기위한 변수
			if(data == null) return;    //데이터가 안넘어오면 종료
			if(data.dpWdRpt.length == 0) return; // 데이터 길이가 0인경우도 종료
			if(dateType != DATETYPE.MONTH && dateType != DATETYPE.YEAR) return; //타입이 DATETYPE에 없는경우에도 종료
			 
			row.stdYmd = data.dpWdRpt[0].stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2); // 일간의 경우 날짜에 일일이 들어가고 월간의 경우 월이 들어감 포멧으로 보면 일간 = 'dd' 월간 = 'mm'
 
			for(let i = 0 ; i < data.dpWdRpt.length ; i++)
			{
				let dpWdRpt = data.dpWdRpt[i];  //접근하기 편하도록 보관하는 변수
				if(row.stdYmd != dpWdRpt.stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2)) // 날짜로 정렬된 리스트의 날짜가 변경되면 기존 데이터를 list에 담고 행데이터를 초기화
				{
					totalSum(row); 
					list.push(row);
					row = [];
					row.stdYmd = dpWdRpt.stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2);
				}
				if(dateType == DATETYPE.MONTH || !row[dpWdRpt.category+"CC"+dpWdRpt.comCode.substring(1,4)]) //일일의 경우엔 그냥 금액을 넣고, 월간이지만 데이터가 아직 안담긴 경우 금액을 넣어서 초기화 시킴
					row[dpWdRpt.category+"CC"+dpWdRpt.comCode.substring(1,4)] = dpWdRpt.sumPriceTax; // 데이터가 담길곳에 금액을 담음 
				else if(dateType == DATETYPE.YEAR)
					row[dpWdRpt.category+"CC"+dpWdRpt.comCode.substring(1,4)] += dpWdRpt.sumPriceTax; //데이터가 이미 있고 연간인경우 금액을 sum함
					
			}
		 
			totalSum(row); 
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
			
			console.log(list);

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

function totalSum (row)  // 합계를 합쳐주는 함수
{
	for(let i = 1; i<5; i++)
	{
		row[i+'total'] = 
		((!row[i+'CC000'])?0:row[i+'CC000']) + 
		((!row[i+'CC413'])?0:row[i+'CC413']) + 
		((!row[i+'CC434'])?0:row[i+'CC434']) + 
		((!row[i+'CC436'])?0:row[i+'CC436']) + 
		((!row[i+'CC127'])?0:row[i+'CC127']) + 
		((!row[i+'CC121'])?0:row[i+'CC121']) ;
		totalValue[i-1] += row[i+'total'];
	} 
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
		footerRowCount :4,
	};
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create(gridIdName, columnLayout, auiGridProps);
	//AUIGrid.create("#grid_wrap2" , gColumnLayout , auiGridProps);
 
	AUIGrid.setFooter(myGridID, footerLayout); 
} 
let columnLayout = [ 
	{dataField: "stdYmd",
		headerText: "일",
		headerTooltip: { // 헤더 툴팁 표시 HTML 양식
		show: false,
	},
	width: 70
	}
];
let footerLayout =[];
footerLayout[0] = [
	{		labelText: "누계",		positionField: "stdYmd",		style: "aui-grid-my-column"	},  
];
footerLayout[1] = [
	{		labelText: "비율",		positionField: "stdYmd",		style: "aui-grid-my-column"	},  
];
footerLayout[2] = [
	{		labelText: "보험",		positionField: "stdYmd",		style: "total-footer-custom2"	},  
];
footerLayout[3] = [
	{		labelText: "일반",		positionField: "stdYmd",		style: "total-footer-custom2"	},  
];
//레이아웃 셋팅
{ // 전역변수 방지용 중괄호 
	let children = []; // 
	const childrenTexts = ['입금','출금'] // 컬럼의 최상위 헤더 텍스트
	const code = ['000' , '413' , '434' , '436' , '127','439','121'] // 컴코드 컬럼 속성값
	const codeText = ['P','임파츠','SJ','SD','KS','오토픽스','그린']; // 컴코드 커럼 텍스트
	for(let i = 1 ; i <2 ; i++)
	{ 
		children.push({ dataField: i+"total",headerText: "계",dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});
		footerLayout[1].push({dataField: i+"total",positionField: i+"total",expFunction : function(rowIndex) {return  footerFunction(i-1,rowIndex);}  ,postfix:"%",style: "total-footer-custom"	});
		footerLayout[2].push({dataField: i+2+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom3"});
		footerLayout[3].push({dataField: i+3+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom3"});
		for(let j = 0 ; j< code.length ; j++)
		{
			children.push({ dataField: i+"CC"+code[j],headerText: codeText[j],dataType: "numeric",formatString: "#,##0",style: 'text-align: right'});
			footerLayout[0].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'text-align: right'});
			footerLayout[1].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],expFunction : function(rowIndex) {return  footerFunction(i-1,rowIndex);}  ,postfix:"%",style: 'text-align: right'});
			footerLayout[2].push({dataField: i+2+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'total-footer-custom4'});
			footerLayout[3].push({dataField: i+3+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'total-footer-custom4'});
		}
		 
		columnLayout.push({headerText: childrenTexts[i-1],headerTooltip: { show: false},children}); 
		children = [];
	}
	for(let i = 2 ; i <3 ; i++)
	{ 
		children.push({ dataField: i+"total",headerText: "계",dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});
		footerLayout[1].push({dataField: i+"total",positionField: i+"total",expFunction : function(rowIndex) {return  footerFunction(i-1,rowIndex);}  ,postfix:"%",style: "total-footer-custom"	});

		for(let j = 0 ; j< code.length ; j++)
		{
			children.push({ dataField: i+"CC"+code[j],headerText: codeText[j],dataType: "numeric",formatString: "#,##0",style: 'text-align: right'});
			footerLayout[0].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'text-align: right'});
			footerLayout[1].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],expFunction : function(rowIndex) {return  footerFunction(i-1,rowIndex);}  ,postfix:"%",style: 'text-align: right'});

		}
		 
		columnLayout.push({headerText: childrenTexts[i-1],headerTooltip: { show: false},children}); 
		children = [];
	}
	

	
// 2024.02.20 출고입고주문현황에서 대표님 회의에서 의미 없는 데이터라고 하여 소장님 지시로 주석처리
//	columnLayout.push(
//		{ dataField : "",    headerText : "", width : 50},
//		{headerText : "그린파츠" , 
//	 	children : [
//		 { dataField : "1CC121",    headerText : "출고", width : 80,dataType: "numeric",formatString: "#,##0",style: 'green-grid-custom'} ,
//		 { dataField : "2CC121",    headerText : "입고", width : 80,dataType: "numeric",formatString: "#,##0",style: 'green-grid-custom'} ,
//		 { dataField : "3CC121",    headerText : "주문", width : 80,dataType: "numeric",formatString: "#,##0",style: 'green-grid-custom'}
//		 ]
//		 } );
//	footerLayout[0].push(
//		{		dataField: "1CC121",		positionField: "1CC121",		operation: "SUM",		formatString: "#,##0",style: 'green-footer-custom '	},
//		{		dataField: "2CC121",		positionField: "2CC121",		operation: "SUM",		formatString: "#,##0",style: 'green-footer-custom '	},
//		{		dataField: "3CC121",		positionField: "3CC121",		operation: "SUM",		formatString: "#,##0",style: 'green-footer-custom '	}
//	)
//	footerLayout[1].push(
//		{			positionField: "1CC121",style: 'green-footer-custom '	},
//		{			positionField: "2CC121",style: 'green-footer-custom '	},
//		{			positionField: "3CC121",style: 'green-footer-custom '	}
//	)
} 
//푸터 %구해주는 함수
function footerFunction(i,arr)
{
	let sum = 0.0;
	for(let j = 0 ; j < arr.length ; j++)
		sum+= arr[j]; 
	return ((sum/(totalValue[i]))*100).toFixed(2);
}



//let gColumnLayout =
//[
//	 {headerText : "그린파츠" , 
//	 	children : [
//		 { dataField : "1CC121",    headerText : "출고", width : 140,dataType: "numeric",formatString: "#,##0",style: 'text-align: right'} ,
//		 { dataField : "2CC121",    headerText : "입고", width : 140,dataType: "numeric",formatString: "#,##0",style: 'text-align: right'} ,
//		 { dataField : "3CC121",    headerText : "주문", width : 140,dataType: "numeric",formatString: "#,##0",style: 'text-align: right'}
//		 ]
//	 } 
//]
