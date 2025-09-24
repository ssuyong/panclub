
const selectInfo = {};

const columnLayout = [ 
	 { dataField : "idx",   width : 68 , visible:false}, 
	 { dataField : "bizPart",    headerText : "파트", width : 40 , style:"left"}, 
	 { dataField : "biz",    headerText : "마감업무", width : 250, style:"left" , filter:{showIcon:true} }, 
	 { dataField : "closeYMD",    headerText : "마감일", width : 80 , filter:{showIcon:true} }, 
	 { dataField : "comCode",    headerText : "사업자업체코드", width : 60 , style:"left" , visible:false}, 
	 { dataField : "comName",    headerText : "사업자명", width : 100, style:"left" , filter:{showIcon:true} }, 
	 { dataField : "branchCode",    headerText : "관리지점", width : 80, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "carNo",    headerText : "차량번호", width : 80, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "jobType",    headerText : "업무유형", width : 80, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "jobYmd",    headerText : "업무등록일", width : 90 , filter:{showIcon:true}}, 
	 { dataField : "jobNo",    headerText : "업무번호", width : 100, style:"right" , filter:{showIcon:true}}, 
	 { dataField : "jobSeq",    headerText : "업무순번", width : 80, style:"right" , filter:{showIcon:true}}, 
	 { dataField : "jobUserId",    headerText : "업무담당자ID", width : 100, style:"left" , visible:false}, 
	 { dataField : "jobUserName",    headerText : "업무담당자", width : 100, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "mstMemo1",    headerText : "마스터메모1", width : 120, style:"left"}, 
	 { dataField : "mstMemo2",    headerText : "마스터메모2", width : 120, style:"left"}, 
	 { dataField : "dtlmemo1",    headerText : "디테일메모1", width : 120, style:"left"}, 
	 { dataField : "dtlMemo2",    headerText : "디테일메모2", width : 120, style:"left"}, 
	 { dataField : "oiRegYmd",    headerText : "주문등록일", width : 100 , filter:{showIcon:true}}, 
	 { dataField : "custCode",    headerText : "주문처코드", width : 60, style:"left", visible:false}, 
	 { dataField : "custName",    headerText : "주문처", width : 100, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "clType",    headerText : "청구구분", width : 80, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "orderGroupId",    headerText : "주문그룹ID", width : 90, style:"right" , filter:{showIcon:true}}, 
	 { dataField : "orderNo",    headerText : "주문번호", width : 90, style:"right" , filter:{showIcon:true}}, 
	 { dataField : "orderSeq",    headerText : "주문순번", width : 80, style:"right" , filter:{showIcon:true}}, 
	 { dataField : "cnt",    headerText : "주문수량", width : 80, style:"right" , filter:{showIcon:true}}, 
	 { dataField : "sumPrice",    headerText : "주문금액", width : 100, style:"right"}, 
	 { dataField : "className",      headerText : "구분", width : 80, editable : false },
	 { dataField : "itemId",    headerText : "품목ID", width : 80, style:"right" , filter:{showIcon:true}}, 
	 { dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    },
	 { dataField : "itemNo",    headerText : "품번", width : 100, style:"left" , filter:{showIcon:true}}, 
	 { dataField: "factoryNo", headerText: "공장품번", width: 120 },
	 { dataField : "itemName",    headerText : "품명", width : 120, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "oiRegUserId",    headerText : "주문등록자ID", width : 110, style:"left", visible:false}, 
	 { dataField : "oiUserName",    headerText : "주문등록자", width : 100, style:"left" , filter:{showIcon:true}}, 
	 { dataField : "oMemo1",    headerText : "주문마스터메모1", width : 120, style:"left"}, 
	 { dataField : "oMemo2",    headerText : "주문마스터메모2", width : 120, style:"left"}, 
	 { dataField : "oiMemo",    headerText : "주문디테일메모", width : 120, style:"left"}, 
	 { dataField : "etc",    headerText : "기타", width : 200, style:"left"}, 
];

function createAUIGrid(columnLayout)
{
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
		
			//showFooter: true,
			//enableCellMerge: true,
			rowIdField : "idx"
			};
	AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);		
}



createAUIGrid(columnLayout);


$("#btnFind").on('click',()=>{
	getCloseTaskList();
}) 

$(".cButton_tabSelect").on(('click') , function(){
	if(selectInfo.spin =='start')//통신조회중엔 탭변경 x
	{
		alert('현재 통신중입니다.');
		return;
	}
	$(".cButton_tabSelect").addClass('btn-secondary');
	$(".cButton_tabSelect").removeClass('btn-primary');
	$(this).removeClass('btn-secondary');
	$(this).addClass('btn-primary'); 
	
	selectInfo.tab = $(this).html();
	
	
	
})

//20240730 supi 기존에 아이디와 크기를 지정하던 부분을 팝업이름을 통해 noticePopupManager의 함수호출로 변경
$("#iButton_noticePopup").on(('click'),()=>{ 
	simplePopupOpen_PopupName('reconciliation')
})

function getCloseTaskList()
{
	if(selectInfo.spin =='start')
	{
		alert('현재 통신중입니다.');
		return;
	}
	if( selectInfo.tab == null)
	{
		alert('파트를 선택해주세요.');
		return;
	}
	
	setSpin('start');
	
	$.ajax({ url : '/biz/closeTaskList' , 
		dataType : 'json',
		type : 'POST',
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
					bizPart : selectInfo.tab ,
					biz : '',
					comCode : '',
					branchCode : '' ,
					orderGroupId : ''
		},
		success : (result)=>{
			const auiGridFilterCache = AUIGrid.getFilterCache("#grid_wrap");
			AUIGrid.setGridData("#grid_wrap", result.closeTaskList);
			AUIGrid.setFilterCache("#grid_wrap",auiGridFilterCache);
			setSpin('stop');
		},
		error : (e)=>{
			setSpin('stop');
		}
		})
}

function setSpin(state)
{
	selectInfo.spin = state;
	if(state == 'start')
	{
		setStartSpinner();
	}
	else if(state == 'stop')
	{
		setStopSpinner(); 
	}
}