 

//const picker = tui.DatePicker.createRangePicker({
//	language: 'ko',
//    startpicker: {
//        date: new Date(),
//    	input: '#startpicker-input',
//        container: '#startpicker-container'
//    },
//    endpicker: {
//        date: new Date(),
//        input: '#endpicker-input',
//        container: '#endpicker-container'
//    }
//});

const columnLayout = [ 
	 { dataField : "idx",  headerText : "번호",  width : 50, visible: false  }, 
	 { dataField : "popupName",    headerText : "팝업이름", width : 150 , style:"right" , headerTooltip : {
   	   		show : true,
     	 	tooltipHtml : "내부적으로 사용되는 팝업이름(중복불가능)"
 		} },
	 { dataField : "priority",    headerText : "우선도", width : 57 , style:"right", headerTooltip : {
   	   		show : true,
     	 	tooltipHtml : "페이지가 열릴때 자동으로 열리는 팝업의 경우 우선순위 순서 대로 열림 "
 		}},
	 { dataField : "title",    headerText : "타이틀", width : 240 , style:"left"}, 
	 { dataField : "regComName",    headerText : "등록업체명", width : 90 }, 
	 { dataField : "validYN",    headerText : "노출여부", width : 57 }, 
	 { dataField : "allCustViewYN",    headerText : "모든업체", width : 57 }, 
//	 { dataField : "allMenuViewYN",    headerText : "모든메뉴", width : 57 , style:"left"}, 
//	 { dataField : "allYmdYN",    headerText : "모든일자", width : 57 , style:"left"}, 
	 { dataField : "isOpenPopupYN",    headerText : "자동오픈", width : 57 }, 
	 { dataField : "isWeekCheckboxYN",    headerText : "한주안보기체크", width : 100}, 
	 { dataField : "isModalYN",    headerText : "모달여부", width : 57  }, 
	 
	 { dataField : "viewCustCount",    headerText : "노출업체수", width : 70 }, 
	 { dataField : "viewMenuCount",    headerText : "노출메뉴수", width : 70 }, 
	 
	 { dataField : "memo",    headerText : "메모", width : 300 , style:"left"}, 
	 { dataField : "width",    headerText : "높이", width : 80 }, 
	 { dataField : "height",    headerText : "너비", width : 80 }, 
	 { dataField : "imgOriginFileName",    headerText : "이미지원본파일명", width : 140 , style:"left"}, 
	 { dataField : "imgMag",    headerText : "이미지배율", width : 90 , style:"right"},
	 { dataField : "regUserName",    headerText : "등록자", width : 100 , style:"left"}, 
	 { dataField : "regYmd",    headerText : "등록일", width : 80 }, 
	 { dataField : "regHms",    headerText : "등록시간", width : 70 }, 
	 { dataField : "uptUserName",    headerText : "수정자", width : 100 , style:"left"}, 
	 { dataField : "uptYmd",    headerText : "수정일", width : 80 }, 
	 { dataField : "uptHms",    headerText : "수정시간", width : 70 },  
 	
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
			//showFooter: true,
			//enableCellMerge: true,
			rowIdField : "idx"
			};
	AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);	
	
	AUIGrid.bind("#grid_wrap", "cellDoubleClick", function( event ) { 
    	window.open(`${location.origin}/base/noticePopupReg?popupIdx=${event.item.idx}`);
	});	
}
 
function getNoticePopupList()
{
	  
	$.ajax({ url : '/base/popupList' , 
		dataType : 'json',
		type : 'POST',
		
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
				
		},
		success : (result)=>{   
			AUIGrid.setGridData("#grid_wrap", result.filter((row)=>
																	($("#iSelect_validYN").val() =='' || $("#iSelect_validYN").val() == row.validYN) &&
																	($("#iSelect_isOpenPopupYN").val() =='' || $("#iSelect_isOpenPopupYN").val() == row.isOpenPopupYN) &&
																	($("#iSelect_allCustViewYN").val() =='' || $("#iSelect_allCustViewYN").val() == row.allCustViewYN)
																	 
													)
													.map((row)=>{
														row.width = Math.round(row.width);
														row.height = Math.round(row.height);
														return {
															...row , width :  Math.round(row.width) , height : Math.round(row.height) ,
															viewCustCount : row.allCustViewYN == 'Y'? 'ALL' : row.viewCustCount,
															viewMenuCount : row.allMenuViewYN == 'Y'? 'ALL' : row.viewMenuCount
														
													};
			})); 
		},
		error : (e)=>{
		}
		})
}

createAUIGrid(columnLayout);

$("#btnFind").on('click',()=>{
	getNoticePopupList();
})