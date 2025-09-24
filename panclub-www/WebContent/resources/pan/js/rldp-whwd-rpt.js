
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
//			setGridData(curSIncYYYYMM                                                                   
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
		url: "/stats/rldp-whwd-rpt",
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
			if(data.rlDpWhWdRpt.length == 0) return; // 데이터 길이가 0인경우도 종료
			if(dateType != DATETYPE.MONTH && dateType != DATETYPE.YEAR) return; //타입이 DATETYPE에 없는경우에도 종료
			 
			row.stdYmd = data.rlDpWhWdRpt[0].stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2); // 일간의 경우 날짜에 일일이 들어가고 월간의 경우 월이 들어감 포멧으로 보면 일간 = 'dd' 월간 = 'mm'
 
			for(let i = 0 ; i < data.rlDpWhWdRpt.length ; i++)
			{
				let rlDpWhWdRpt = data.rlDpWhWdRpt[i];  //접근하기 편하도록 보관하는 변수
				if(row.stdYmd != rlDpWhWdRpt.stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2)) // 날짜로 정렬된 리스트의 날짜가 변경되면 기존 데이터를 list에 담고 행데이터를 초기화
				{
					totalSum(row); 
					list.push(row);
					row = [];
					row.stdYmd = rlDpWhWdRpt.stdYmd.substr((dateType==DATETYPE.MONTH?8:5),2);
				}
				if(dateType == DATETYPE.MONTH || !row[rlDpWhWdRpt.category+"CC"+rlDpWhWdRpt.comCode.substring(1,4)]) //일일의 경우엔 그냥 금액을 넣고, 월간이지만 데이터가 아직 안담긴 경우 금액을 넣어서 초기화 시킴
					{
						row[rlDpWhWdRpt.category+"CC"+rlDpWhWdRpt.comCode.substring(1,4)] = rlDpWhWdRpt.sumPriceTax; // 데이터가 담길곳에 금액을 담음 
						//row["3CCrlDpRate"] = rlDpWhWdRpt.sumPriceTax;
						 
						
					}
				else if(dateType == DATETYPE.YEAR){
						row[rlDpWhWdRpt.category+"CC"+rlDpWhWdRpt.comCode.substring(1,4)] += rlDpWhWdRpt.sumPriceTax; //데이터가 이미 있고 연간인경우 금액을 sum함
						//row["3CCrlDpRate"] = rlDpWhWdRpt.sumPriceTax;
						
					}
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
	
	if(lcd == 'ㄱ121'){
		for(let i = 1; i<8; i++)
		{
			row[i+'total'] = 
			((!row[i+'CC121'])?0:row[i+'CC121']) ;
			totalValue[i-1] += row[i+'total'];
		} 
		
	}else{
		for(let i = 1; i<8; i++)
		{
			row[i+'total'] = 
			((!row[i+'CC000'])?0:row[i+'CC000']) + 
			((!row[i+'CC413'])?0:row[i+'CC413']) + 
			((!row[i+'CC434'])?0:row[i+'CC434']) + 
			((!row[i+'CC436'])?0:row[i+'CC436']) + 
			((!row[i+'CC127'])?0:row[i+'CC127']) ;
			
			totalValue[i-1] += row[i+'total'];
		} 
		
	}
	
	if(row['1total'] && row['1total'] !== 0) {				// 입금/출고 비율
		row["3CCrlDpRate"] =  parseFloat(((row['2total'] /row['1total'])*100).toFixed(1)); 
	} else {
		row["3CCrlDpRate"] = 0;  // '1total'이 0일 경우 0으로 처리
	}
	
	if(row['4total'] && row['4total'] !== 0) {				// 출금/입고 비율
		row["6CCwhWdRate"] =  parseFloat(((row['5total'] /row['4total'])*100).toFixed(1)); 
	} else {
		row["6CCwhWdRate"] = 0;  // '1total'이 0일 경우 0으로 처리
	}
	
	row["8CCcashMargin"] = row['2total'] - row['5total'];	// 현금마진계산 입금 - 출금
	
	row["9CCrlMargin"] = row['1total'] - row['4total'];		// 출고마진계산 출고 - 입고
	
	if(row['9CCrlMargin'] && row['9CCrlMargin'] !== 0) {				// 현금/출고 비율
		row["10CCcashRlRate"] =  parseFloat(((row['8CCcashMargin'] /row['9CCrlMargin'])*100).toFixed(1)); 
	} else {
		row["10CCcashRlRate"] = 0;  // '1total'이 0일 경우 0으로 처리
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
		footerRowCount :1,
		
		fixedColumnCount: 1		//240927 추가
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



//레이아웃 셋팅


{ // 전역변수 방지용 중괄호 
	let children = []; // 
	const childrenTexts = ['출고','입금','입금/출고<br>(%)','입고','출금','출금/입고<br>(%)','주문','현금마진','출고마진','현금/출고<br>(%)'] // 컬럼의 최상위 헤더 텍스트
	let code = [];
	let codeText = [];
	if(lcd=='ㄱ121'){
		code = ['121'] // 컴코드 컬럼 속성값
		codeText = ['G']; // 컴코드 커럼 텍스트
		
	}else{
		code = ['000' , '413' , '434' , '436' , '127']; // 컴코드 컬럼 속성값
		codeText = ['P','임파츠','SJ','SD','KS']; // 컴코드 커럼 텍스트
	}
	
	for(let i = 1 ; i <2 ; i++)
	{ 
		children.push({ dataField: i+"total",headerText: "계",dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});
		
		for(let j = 0 ; j< code.length ; j++)
		{
			children.push({ dataField: i+"CC"+code[j],headerText: codeText[j],dataType: "numeric",formatString: "#,##0",style: 'text-align: right'});
			footerLayout[0].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'text-align: right'});

		}
		 
		//columnLayout.push({headerText: childrenTexts[i-1]});
		columnLayout.push({headerText: childrenTexts[i-1],headerTooltip: { show: false},children}); 
		children = [];
	}
	for(let i = 2 ; i <3 ; i++)
	{ 
		children.push({ dataField: i+"total",headerText: "계",dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});
		

		for(let j = 0 ; j< code.length ; j++)
		{
			children.push({ dataField: i+"CC"+code[j],headerText: codeText[j],dataType: "numeric",formatString: "#,##0",style: 'text-align: right'});
			footerLayout[0].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'text-align: right'});
			

		}
		 
		columnLayout.push({headerText: childrenTexts[i-1],headerTooltip: { show: false},children}); 
		children = [];
	}
	
	for(let i = 3 ; i <4 ; i++)
	{ 
		columnLayout.push({dataField: i+"CC"+"rlDpRate" ,headerText: childrenTexts[i-1], width : 80 , style: "total-custom2"});
		
		footerLayout[0].push({dataField: i+"CC"+"rlDpRate",positionField: i+"CC"+"rlDpRate",formatString: "#,##0",style: "total-footer-custom", postfix: " %"
								,labelFunction: function (value, columnValues, footerValues) {
									let valList1 = AUIGrid.getColumnValues(myGridID,'1total');
									let valList2 = AUIGrid.getColumnValues(myGridID,'2total');
									let value1 = 0;
									let value2 = 0;
									for(let k = 0 ;k<valList1.length;k++){
										value1 +=	valList1[k];									
									}
									for(let k = 0 ;k<valList2.length;k++){
										value2 +=	valList2[k];									
									}
		
									var newValue;
									if(value1 && value1 !== 0) {				// 입금/출고 비율
										newValue =  parseFloat(((value2 /value1)*100).toFixed(1)); 
									} else {
										newValue = 0;  
									}
	
									return newValue;
									
								}
	
							}); 
							
	}
	
	
	
	for(let i = 4 ; i <5 ; i++)
	{ 
		children.push({ dataField: i+"total",headerText: "계",dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});

		for(let j = 0 ; j< code.length ; j++)
		{
			children.push({ dataField: i+"CC"+code[j],headerText: codeText[j],dataType: "numeric",formatString: "#,##0",style: 'text-align: right'});
			footerLayout[0].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'text-align: right'});

		}
		 
		columnLayout.push({headerText: childrenTexts[i-1],headerTooltip: { show: false},children}); 
		children = [];
	}
	for(let i = 5 ; i <6 ; i++)
	{ 
		children.push({ dataField: i+"total",headerText: "계",dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});

		for(let j = 0 ; j< code.length ; j++)
		{
			children.push({ dataField: i+"CC"+code[j],headerText: codeText[j],dataType: "numeric",formatString: "#,##0",style: 'text-align: right'});
			footerLayout[0].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'text-align: right'});

		}
		 
		columnLayout.push({headerText: childrenTexts[i-1],headerTooltip: { show: false},children}); 
		children = [];
	}
	
	
	for(let i = 6 ; i <7 ; i++)
	{ 
		columnLayout.push({dataField: i+"CC"+"whWdRate" ,headerText: childrenTexts[i-1], width : 80, style: "total-custom2"});
		
		footerLayout[0].push({dataField: i+"CC"+"whWdRate",positionField: i+"CC"+"whWdRate",formatString: "#,##0",style: "total-footer-custom", postfix: " %"
								,labelFunction: function (value, columnValues, footerValues) {
									let valList1 = AUIGrid.getColumnValues(myGridID,'4total');
									let valList2 = AUIGrid.getColumnValues(myGridID,'5total');
									let value1 = 0;
									let value2 = 0;
									for(let k = 0 ;k<valList1.length;k++){
										value1 +=	valList1[k];									
									}
									for(let k = 0 ;k<valList2.length;k++){
										value2 +=	valList2[k];									
									}
		
									var newValue;
									if(value1 && value1 !== 0) {				// 입금/출고 비율
										newValue =  parseFloat(((value2 /value1)*100).toFixed(1)); 
									} else {
										newValue = 0;  
									}
	
									return newValue;
									
								}
	
							});  
	}
	
	for(let i = 7 ; i <8 ; i++)
	{ 
		children.push({ dataField: i+"total",headerText: "계",dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"total",positionField: i+"total",operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});
		for(let j = 0 ; j< code.length ; j++)
		{
			children.push({ dataField: i+"CC"+code[j],headerText: codeText[j],dataType: "numeric",formatString: "#,##0",style: 'text-align: right'});
			footerLayout[0].push({dataField: i+"CC"+code[j],positionField:i+"CC"+code[j],operation: "SUM",	formatString: "#,##0",style: 'text-align: right'});
		}
		 
		columnLayout.push({headerText: childrenTexts[i-1],headerTooltip: { show: false},children}); 
		children = [];
	}
	for(let i = 8 ; i <9 ; i++)
	{ 
		columnLayout.push({dataField: i+"CC"+"cashMargin" ,headerText: childrenTexts[i-1], width : 80,dataType: "numeric",formatString: "#,##0", style: "total-custom"});
		footerLayout[0].push({dataField: i+"CC"+"cashMargin" ,positionField: i+"CC"+"cashMargin" ,operation: "SUM",formatString: "#,##0",style: "total-footer-custom"}); 
	}
	for(let i = 9 ; i <10 ; i++)
	{ 
		columnLayout.push({dataField: i+"CC"+"rlMargin" ,headerText: childrenTexts[i-1], width : 80,dataType: "numeric",formatString: "#,##0", style: "total-custom"}); 
		footerLayout[0].push({dataField: i+"CC"+"rlMargin" ,positionField: i+"CC"+"rlMargin" ,operation: "SUM",formatString: "#,##0",style: "total-footer-custom"});
	}
	for(let i = 10 ; i <11 ; i++)
	{ 
		columnLayout.push({dataField: i+"CC"+"cashRlRate" ,headerText: childrenTexts[i-1], width : 80, style: "total-custom2"});
		footerLayout[0].push({dataField: i+"CC"+"cashRlRate",positionField: i+"CC"+"cashRlRate",formatString: "#,##0",style: "total-footer-custom", postfix: " %"
								,labelFunction: function (value, columnValues, footerValues) {
									let valList1 = AUIGrid.getColumnValues(myGridID,'9CCrlMargin');
									let valList2 = AUIGrid.getColumnValues(myGridID,'8CCcashMargin');
									let value1 = 0;	
									let value2 = 0;
									for(let k = 0 ;k<valList1.length;k++){
										value1 +=	valList1[k];									
									}
									for(let k = 0 ;k<valList2.length;k++){
										value2 +=	valList2[k];									
									}
		
									var newValue;
									if(value1 && value1 !== 0) {				// 입금/출고 비율
										newValue =  parseFloat(((value2 /value1)*100).toFixed(1)); 
									} else {
										newValue = 0;  
									}
	
									return newValue;
									
								}		
		
							}); 
	}
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
