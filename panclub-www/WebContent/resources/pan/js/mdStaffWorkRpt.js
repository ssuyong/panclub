 

const TAB_ENUM = {견적:'ESTI' , 주문:'ORDER' , 발주 : 'PLACE' , 입고 : 'WH' , 출고 : 'RL'};
let selectTab = '';


$(document).ready(function(){ 
	const today = new Date();
	tui.DatePicker.createRangePicker({
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
		}
	});
	createAUIGrid();
})

function createAUIGrid()
{
	const priceAttribute = {dataType: "numeric",formatString: "#,##0", style:"right"};
	const columnLayout = [  
		{ dataField : "userName",    headerText : "작업자명", width : 100 , style:"left"},  //
		{ dataField : "workCnt",    headerText : "등록건수", width : 100 , style:'right'
		,headerTooltip : { //마스터수
		        show : true,
		        tooltipHtml : '견적,주문,발주등에서 주문의 경우 등록한 품목의 주문번호의 수의 합계입니다'
		    }},  
		{ dataField : "itemCnt",    headerText : "등록품목수", width : 100 , style:'right'
		,headerTooltip : { //마스터수
		        show : true,
		        tooltipHtml : '상세내역에 등록된 품목들을 등록한 수입니다'
		    }},  
		{ dataField : "cntSum",    headerText : "부품수합계", width : 100 , style:'right'},  
		{ dataField : "sumPrice",    headerText : "부품금액합계", width : 150 , ...priceAttribute },  
	];
	
	const auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			 
			enableFilter: true,
			
			fixedColumnCount: 10,		// 고정칼럼 카운트 지정
		 
			};
	AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);		
}


//조회버튼
$("#btnFind").on('click',()=>{
	getCloseTaskList();
}) 

//탭버튼
$(".cButton_tabSelect").on(('click') , function(){

/*
	if(selectInfo.spin =='start')//통신조회중엔 탭변경 x
	{
		alert('현재 통신중입니다.');
		return;
	}
	
*/	
	$(".cButton_tabSelect").addClass('btn-secondary');
	$(".cButton_tabSelect").removeClass('btn-primary');
	$(this).removeClass('btn-secondary');
	$(this).addClass('btn-primary'); 
	
	selectTab = $(this).html();
	 
})



function getCloseTaskList()
{
	 
	if( (selectTab || '') == '')
	{
		alert('조회할 작업을 선택해주세요.');
		return;
	}
	 
	
	$.ajax({ url : '/stats/mdStaffWorkRpt' , 
		dataType : 'json',
		type : 'POST',
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
					workingType : TAB_ENUM[selectTab] ,
					sYmd : $("#startpicker-input").val(),
					eYmd : $("#endpicker-input").val()
		},
		success : (result)=>{
			const resultData = result.filter(r=>r.userName != 'AUTO').sort((a,b)=>b.itemCnt-a.itemCnt);
		  
			AUIGrid.setGridData("#grid_wrap", resultData); 
			 
		},
		error : (e)=>{
		 
		}
		})
}