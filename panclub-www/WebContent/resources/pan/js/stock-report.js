
// 그리드 생성 후 해당 ID 보관 변수
let myGridID;

let curYM;  //현재 년월
let lastDay;  // 이번달 마지막날 
let curTab; // 현재의 탭 
let curColumnLayout; // 사용중인 AUIGRID 레이아웃 보관

let list4TComCode=[];

const datepicker = new tui.DatePicker('#calendar-wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#reportTargetMM',
        format: 'yyyy-MM'
    },
    type: 'month'
});

$(document).ready(function() {


	//현재 날짜의 1번탭 화면보여주기 위한 로직
	curYM = $("#reportTargetMM").val().replace('-','').slice(2,6).toString(); 
 	getMMLastDay(); 
 	curTab = '1';
//	layoutTabSet(['재고', '매입(+)' , 'P 출고(-)','그린파츠 출고(-)','위탁','폐기(-)','재고재투입 입고(+)','타업체 매입 재고투입반품(+)' ,'위탁업체 재고투입반품(+)' ]);
	layoutTabSet(['재고', '매입(+)' , 'P 출고(-)','그린파츠 출고(-)','위탁(-)' ]);
	createAUIGrid(curColumnLayout, "#grid_wrap1");
	$("#grid_wrap1").css("display", "contents");
	setGridData_type( curYM)


	//각 탭 버튼에 대한 이벤트
	$("#tab1Select").click(function() {
		curTab = '1';
//		layoutTabSet(['재고', '매입(+)' , 'P 출고(-)','그린파츠 출고(-)','위탁','폐기(-)','재고재투입 입고(+)','타업체 매입 재고투입반품(+)' ,'위탁업체 재고투입반품(+)' ]);
		layoutTabSet(['재고', '매입(+)' , 'P 출고(-)','그린파츠 출고(-)','위탁(-)' ]);
		gridUpdate();
	});
	$("#tab2Select").click(function() {
		curTab = '2';
		layoutTabSet(['자체재고 재투입' ,'위탁재고 재투입']);
		gridUpdate(); 
	});
	$("#tab3Select").click(function() {
		curTab = '3';
		layoutTabSet(['계' ,'매입','반품']);
		gridUpdate();

	});
	$("#tab4Select").click(function() {
		curTab = '4';
		gridUpdate();

	});
	$("#tab5Select").click(function() {
		curTab = '5';
		layoutTabSet(['폐기']);
		gridUpdate();

	});
	$("#tab6Select").click(function() {
		curTab = '6';
		layoutTabSet(['재고 실사']);
		gridUpdate();

	});
	$("#btnYYMMSelect").click(function() {  
		//curYM =  $("#reportTargetMM").val().replace('-','').slice(2,6).toString();
		//getMMLastDay();
		//gridUpdate();
	});
});

// 그리드 갱신용 함수 기능은 현재 선택된 년월의 마지막 날짜를 기록하고 현재 탭의 그 날짜의 데이터를 통신함
function gridUpdate()
{
	curYM =  $("#reportTargetMM").val().replace('-','').slice(2,6).toString();
		getMMLastDay();
		
	
	
	setGridData_type( curYM) 
}

//매개변수(달)의 마지막 날짜를 lastDay에 저장하는 함수 매개변수가 없으면 현재달로 구함
function getMMLastDay() {
	lastDay = (new Date("20"+curYM.slice(0,2) , curYM.slice(2,4) , 0).getDate());
}


// 탭과 년월을 매개변수로 받아 통신하여 그 달의 보고서탭 데이터를 받아오는 로직
function setGridData_type(yymm) {
	let list = [];
	// 서버 데이터 받기(받아서 리스트)

	$.ajax({
		type: "POST",
		url: "/stats/stock-get-report",
		dataType: "json",
		data: {
			tab:curTab, yymm
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) { // 현재 탭 , 날짜만 가져옴
		
			list4TComCode = [];
			let list4TComName = [];
			 
			
			let row = [];
			let curDay = '01';  
			for (let i = 0; i < data.stockReport.length; i++) {  //받아온 데이터를 리스트에 기록
				let dd = data.stockReport[i].yymmdd.substr(4);
				
				
				if (curDay != dd && i >0) {
					list.push(row);
					row = [];
				}
				if (row.tab == null) {
					row.tab = curTab;
					row.dd = dd;
					curDay = dd;
				}
				
				if(curTab ==4 )
				{
					let category;
					if(list4TComCode.indexOf(data.stockReport[i].category) == -1 && (data.stockReport[i].category != 0 && data.stockReport[i].category != 10000))  
					{
							list4TComCode.push(data.stockReport[i].category);
							list4TComName.push(((data.stockReport[i].category.indexOf('(P)')==-1)?'':'(파츠몰)')+data.stockReport[i].reason); 
					} 
					if(data.stockReport[i].category == 0 || data.stockReport[i].category == 10000) category = data.stockReport[i].category //총합이면 0과 10000으로 카테고리 통합
					else category = list4TComCode.indexOf(data.stockReport[i].category)+((data.stockReport[i].category.indexOf('(P)')==-1)?1:10001); //개별이면 자신회사 인덱스+ 1 파츠몰일경우 +10001
					row[category + "item"] = data.stockReport[i].item;
					row[category + "price"] = data.stockReport[i].price;
					row[category + "qty"] = data.stockReport[i].qty; 
					
				}
				else
				{
				
					row[data.stockReport[i].category + "item"] = data.stockReport[i].item;
					row[data.stockReport[i].category + "price"] = data.stockReport[i].price;
					row[data.stockReport[i].category + "qty"] = data.stockReport[i].qty; 
					if(data.stockReport[i].price2 != null) 
						row[data.stockReport[i].category + "price2"] = data.stockReport[i].price2;
						
				}
			}
			list.push(row);
			let listIndex =0;
			let list2 = [];
			for(let i = 0 ; i < lastDay ; i++) // 월간 보고서의 요일을 기록
			{
				 
				let row = []; 
				let dd = (i+1)<10?'0'+(i+1).toString():(i+1).toString();
				let yyyymmdd = ('20' + yymm.substr(0, 2) + '-' + yymm.substr(2, 2) + '-' + dd);
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
				row.dd = dd;
				row.day = day;
				if(day != '토' && day != '일')  //토 일은 제외
				{
				 
					if(listIndex < list.length)
					{
						if(list[listIndex].dd == dd)
						{
							 
							list[listIndex].day = row.day;
							list2.push(list[listIndex++]);
						}
						else 
						{
							list2.push(row);
						}
					}
					else
					{
						list2.push(row); 
					}
					
				//	list2[i].day = day; 
				}
				else if(listIndex < list.length)
				{
					if(list[listIndex].dd == dd)
						listIndex++;
				}
 
			} 
			
	
			
			if(curTab == 4 )
			{	
				layoutTab4Set(list4TComName )
		 		AUIGrid.destroy("#grid_wrap"+curTab);
				myGridID = null;
 	
			}
			createAUIGrid(curColumnLayout, "#grid_wrap"+curTab);
			$("#grid_wrap"+curTab).css("display", "contents");
			AUIGrid.setGridData("#grid_wrap" + curTab, list2); 
		 	resizeGrid(1900,800);
		 
			//console.log("list page:"+page);
			// 해당 페이지로 이동 
		},
		error: function(x, e) {
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
function resizeGrid(w, h) {
		if (myGridID)
			AUIGrid.resize(myGridID, w, h);
}



function createAUIGrid(columnLayout, gridIdName) {

	const auiGridProps = {
		autoGridHeight:true,
		//editable : true,		 
		// 상태 칼럼 사용
		//showStateColumn : true
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
		/*
		
		// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
		rowIdField : "mgrIdx",
		
		
		//softRemoveRowMode 적용을 원래 데이터에만 적용 즉, 새 행인 경우 적용 안시킴
		softRemovePolicy :"exceptNew",
		
		// 칼럼 끝에서 오른쪽 이동 시 다음 행, 처음 칼럼으로 이동할지 여부
		wrapSelectionMove : true,
		
		// 읽기 전용 셀에 대해 키보드 선택이 건너 뛸지 여부 (기본값 : false)
		skipReadonlyColumns : true,
		
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enterKeyColumnBase : true,
		
		// selectionChange 이벤트 발생 시 간소화된 정보만 받을지 여부
		// 이 속성은 선택한 셀이 많을 때 false 설정하면 퍼포먼스에 영향을 미칩니다.
		// selectionChange 이벤트 바인딩 한 경우 true 설정을 권합니다.
		simplifySelectionEvent : true */
	};

	
	// 실제로 #grid_wrap 에 그리드 생성 
	myGridID = AUIGrid.create(gridIdName, columnLayout, auiGridProps);



	 
	 	AUIGrid.setFooter(myGridID, footerLayout); //2023.07.10 bk
	// 에디팅 시작 이벤트 바인딩
	// 에디팅 정상 종료 직전 이벤트 바인딩
	// 에디팅 정상 종료 이벤트 바인딩
	// 에디팅 취소 이벤트 바인딩
	//AUIGrid.bind(myGridID, ["cellEditBegin", "cellEditEndBefore", "cellEditEnd", "cellEditCancel"], auiCellEditingHandler);

	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		if(event.value != '') // 셀의 값이 없으면 이벤트를 무시함
		{
			if(curTab == 4) //4번탭(출고 상세의 가격을 더블클릭시 상세나오도록 함)
			{
				
		 
				if (event.dataField.match('price')) 
				{     
					const dd = event.item.dd; 
					const category = event.dataField.split('price')[0];
					
					let comCode = category==0?0:
					category==10000?10000:
					(list4TComCode[category>10000?category-10001:category-1]);
				 	
				 	
				 	if(comCode != 0 && comCode != 10000)
					 	if(comCode.indexOf('(P)')>-1)
							comCode=comCode.replace('(P)','');
				 
					$.fancybox.open({
					  href : '/stats/stock-report-rldetail?curYMD='+ curYM+dd +
					  '&tab='+curTab+
					  '&comCode=' +comCode +
					  '&isPartMall=' + (category>=10000?'Y':'N'),  // 불러 올 주소
					  type : 'iframe',
					  width : '90%',
					  height : '90%',
					  padding :0,
					  fitToView: false,
					  autoSize : false,
					  modal :true
					});
				}
			}
		 }
	});


}

//공용 레이아웃
const columnLayout = [{
	dataField: "dd",
	headerText: "일시",
	headerTooltip: { // 헤더 툴팁 표시 HTML 양식
		show: false,
	},
	width: 50
}, {
	dataField: "day",
	headerText: "요일",
	headerTooltip: { // 헤더 툴팁 표시 HTML 양식
		show: false,
	},
	width: 50
}]



// 각 탭의 레이아웃을 만들어주는 함수 매개변수1 배열로 셋팅하되 4번탭의 경우 파츠몰은 인덱스를 10000으로 따로 받기때문에 분기 해둠
function layoutTabSet(headerTextArr,headerTextArr_4tab = null)
{
	
 	curColumnLayout = [];
	curColumnLayout.push(columnLayout[0]);
	curColumnLayout.push(columnLayout[1]);
	let j = (headerTextArr_4tab==null?1:0);  // 4번탭의 경우 0~9999 , 10000~ 을 쓰기에 J로 나눠서 분기함 다른탭은 대부분 1번부터 시작
	for(let i = 0 ; i < headerTextArr.length ; i++)
	{
		
		if(headerTextArr[i] == '매입') // 3번탭의 '매입'카테고리의 경우 특별하게 매입가를 쓰기에 나눔
		{
			curColumnLayout.push(
				{
					headerText: headerTextArr[i],
					headerTooltip: { // 헤더 툴팁 표시 HTML 양식
						show: false
					},
					children: [{
						dataField: (i+j)+"item",
						headerText: "품목",
						dataType: "numeric"
					}, {
						dataField: (i+j)+"qty",
						headerText: "수량",
						dataType: "numeric",
						show: true,
					}
						, {
						dataField: (i+j)+"price",
						headerText: "재고액",
						dataType: "numeric",
						formatString: "#,##0"
					}, {
						dataField: (i+j)+"price2",
						headerText: "매입가",
						dataType: "numeric",
						formatString: "#,##0"
					}]
				}
			)
		}
		else if(headerTextArr[i] == '폐기') // 폐기의 경우 레이아웃이 독자적
		{
				curColumnLayout.push(
				{
					headerText: "폐기",
					headerTooltip: { // 헤더 툴팁 표시 HTML 양식
						show: false
					},
					children: [{
						dataField: "1item",
						headerText: "품목",
						dataType: "numeric"
					}, {
						dataField: "1qty",
						headerText: "수량",
						dataType: "numeric",
						show: true,
					}
						, {
						dataField: "1itemCode",
						headerText: "품번",
					},
					{
						dataField: "1price",
						headerText: "재고액",
						dataType: "numeric",
						formatString: "#,##0"
					},
					{
						dataField: "1reason",
						headerText: "사유",
						dataType: "numeric"
					}
					]
				});
		}
		else if(headerTextArr[i] == '재고 실사') // 마찬가지로 재고 실사의 경우도 레이아웃이 독자적
		{
			curColumnLayout.push({
				headerText: "재고 실사",
				headerTooltip: { // 헤더 툴팁 표시 HTML 양식
					show: false
				},
				children: [{
					dataField: "1item",
					headerText: "품목",
					dataType: "numeric"
				}, {
					dataField: "1qty",
					headerText: "수량",
					dataType: "numeric",
					show: true,
				}
					, {
					dataField: "1itemCode",
					headerText: "품번",
				}, {
					dataField: "1itemName",
					headerText: "품명",
					dataType: "string",
					show: true,
				},
				{
					dataField: "1price",
					headerText: "재고액",
					dataType: "numeric",
					formatString: "#,##0"
				},
				{
					dataField: "1reason",
					headerText: "실사 사유",
					dataType: "numeric"
				}
				]
			});
		}
		else // 이외의 1번 매개변수의 모든 탭의 카테고리의 경우 아래의 레이아웃을 사용 
		{
			curColumnLayout.push(
				{
					headerText: headerTextArr[i],
					headerTooltip: { // 헤더 툴팁 표시 HTML 양식
						show: false
					},
					children: [{
						dataField: (i+j)+"item",
						headerText: "품목",
						dataType: "numeric"
					}, {
						dataField: (i+j)+"qty",
						headerText: "수량",
						dataType: "numeric",
						show: true,
					}
						, {
						dataField: (i+j)+"price",
						headerText: "재고액",
						dataType: "numeric",
						formatString: "#,##0",
						// 4번탭의 경우 재고액에 적용되는 스타일
						styleFunction: j==0?(function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}):null
					}]
				}
			)
		}
	}
//	if(headerTextArr_4tab != null) // 4번탭의 파츠몰 쪽 레이아웃
//	{
//		for(let i = 0 ; i < headerTextArr_4tab.length ; i++)
//		{
//			curColumnLayout.push(
//			{
//				headerText: headerTextArr_4tab[i],
//					headerTooltip: { // 헤더 툴팁 표시 HTML 양식
//						show: false
//					},
//					children: [{
//						dataField: (i+10000)+"item",
//						headerText: "품목",
//						dataType: "numeric"
//					}, {
//						dataField: (i+10000)+"qty",
//						headerText: "수량",
//						dataType: "numeric",
//						show: true,
//					}
//						, {
//						dataField: (i+10000)+"price",
//						headerText: "재고액",
//						dataType: "numeric",
//						formatString: "#,##0",
//						styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}
//						
//					}]
//				}
//			)
//		}
//	}
}
function layoutTab4Set(comNameArr)
{
	
	curColumnLayout = []; 
	curColumnLayout.push(columnLayout[0]);
	curColumnLayout.push(columnLayout[1]);
 
	columLayoutPush(0 , '계' ,true);
	columLayoutPush(comNameArr.indexOf('P')+1 , 'P' ,true);
	columLayoutPush(comNameArr.indexOf('G')+1 , 'G' ,true);
	for(let i = 0 ; i < comNameArr.length ; i++)
	{
	
		if(comNameArr[i] != 'P' && comNameArr[i] != 'G' && !(comNameArr[i].startsWith('(파츠몰)')))
		{
			columLayoutPush(i+1 , comNameArr[i] ,true);
		}
	}
	columLayoutPush(10000 , '파츠몰 계' ,true);
	columLayoutPush(comNameArr.indexOf('(파츠몰)P')+10001 , '(파츠몰)P' ,true);
	columLayoutPush(comNameArr.indexOf('(파츠몰)G')+10001 , '(파츠몰)G' ,true);
	for(let i = 0 ; i < comNameArr.length ; i++)
	{
		if(comNameArr[i] != '(파츠몰)P' && comNameArr[i] != '(파츠몰)G' && (comNameArr[i].startsWith('(파츠몰)')))
		{
		 
			columLayoutPush((i+10001) , comNameArr[i] ,true);
		}
	}
}
function columLayoutPush(index , text, isStyleLink=false)
{
	curColumnLayout.push(
				{
					headerText: text,
					headerTooltip: { // 헤더 툴팁 표시 HTML 양식
						show: false
					},
					children: [{
						dataField: (index)+"item",
						headerText: "품목",
						dataType: "numeric"
					}, {
						dataField: (index)+"qty",
						headerText: "수량",
						dataType: "numeric",
						show: true,
					}
						, {
						dataField: (index)+"price",
						headerText: "재고액",
						dataType: "numeric",
						formatString: "#,##0",
						// 4번탭의 경우 재고액에 적용되는 스타일
						styleFunction: isStyleLink?(function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}):null
					}]
				}
			)
}
 
 

let footerLayout = [{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}
	
];

//풋 일괄로 생성 재사용 생각해서 재생성 안함
for(let i = 0 ; i< 14 ; i++)
{
	footerLayout.push({		dataField: i+"item",		positionField: i+"item",		operation: "SUM",		formatString: "#,##0"	});
	footerLayout.push({		dataField: (10000+i)+"item",		positionField: (10000+i)+"item",		operation: "SUM",		formatString: "#,##0"	});
	footerLayout.push({		dataField: i+"qty",		positionField: i+"qty",		operation: "SUM",		formatString: "#,##0"	});
	footerLayout.push({		dataField: (10000+i)+"qty",		positionField: (10000+i)+"qty",		operation: "SUM",		formatString: "#,##0"	});
	footerLayout.push({		dataField: i+"price",		positionField: i+"price",		operation: "SUM",		formatString: "#,##0"	});
	footerLayout.push({		dataField: (10000+i)+"price",		positionField: (10000+i)+"price",		operation: "SUM",		formatString: "#,##0"	});
}
