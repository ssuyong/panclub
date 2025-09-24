

/* Begin : Date Picker Date Range*/
var today = new Date();
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
var picker = tui.DatePicker.createRangePicker({
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
/* End : Date Picker Date Range*/



// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
				
		findDataToServer("/stats/cw-ord-prog-list", 1);
	});
	
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	
// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "출고전표번호",    headerText : "출고전표번호", width : 140} 
	,{ dataField : "출고일자",   headerText : "출고일자", width: 120} 
	,{ dataField : "출고처코드",     headerText : "출고처코드", width : 120     }
	,{ dataField : "출고처명",     headerText : "출고처명", width : 120  }
	,{ dataField : "구분",   headerText : "구분" }
	,{ dataField : "완성차명",   headerText : "완성차명"  }
	,{ dataField : "부품번호",   headerText : "부품번호" }
	,{ dataField : "분류",      headerText : "분류"    }
	,{ dataField : "차종",      headerText : "차종"    }
	,{ dataField : "명칭",      headerText : "명칭"    }
	,{ dataField : "출고수량",      headerText : "출고수량"}
	,{ dataField : "출고단가",      headerText : "출고단가"}
	,{ dataField : "비고",      headerText : "비고"}
	,{ dataField : "주문일자",      headerText : "주문일자"}
	,{ dataField : "주문수량",      headerText : "주문수량"}
	,{ dataField : "발주처코드",      headerText : "발주처코드"}
	,{ dataField : "발주처명",      headerText : "발주처명"}
	,{ dataField : "발주전표번호",      headerText : "발주전표번호"}
	,{ dataField : "발주일자",      headerText : "발주일자"}
	,{ dataField : "발주수량",      headerText : "발주수량"}
	,{ dataField : "발주거래처담당자",      headerText : "발주거래처담당자"}
	,{ dataField : "입고전표번호",      headerText : "입고전표번호"}
	,{ dataField : "입고일자",      headerText : "입고일자"}
	,{ dataField : "입고수량",      headerText : "입고수량"}
	,{ dataField : "입고단가",      headerText : "입고단가"}							
];
 
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			//editable : true,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
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
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	var rowPos = 'first';

	
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});		
	
}


function findDataToServer(url,page) {
	var list = [];
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.cwOrdProgList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.cwOrdProgList.length;i++){
					list.push({
						 출고전표번호: data.cwOrdProgList[i].출고전표번호 
						,출고일자: data.cwOrdProgList[i].출고일자 
						,출고처코드: data.cwOrdProgList[i].출고처코드 
						,출고처명: data.cwOrdProgList[i].출고처명
						,구분: data.cwOrdProgList[i].구분 
						,완성차명: data.cwOrdProgList[i].완성차명 
						,부품번호: data.cwOrdProgList[i].부품번호 
						,분류: data.cwOrdProgList[i].분류 
						,차종: data.cwOrdProgList[i].차종 
						,명칭: data.cwOrdProgList[i].명칭 
						,출고수량: data.cwOrdProgList[i].출고수량
						,출고단가: data.cwOrdProgList[i].출고단가 
						,비고: data.cwOrdProgList[i].비고 
						,주문일자: data.cwOrdProgList[i].주문일자 
						,주문수량: data.cwOrdProgList[i].주문수량 
						,발주처코드: data.cwOrdProgList[i].발주처코드 
						,발주처명: data.cwOrdProgList[i].발주처명
						,발주전표번호: data.cwOrdProgList[i].발주전표번호
						,발주일자: data.cwOrdProgList[i].발주일자
						,발주수량: data.cwOrdProgList[i].발주수량
						,발주거래처담당자: data.cwOrdProgList[i].발주거래처담당자
						,입고전표번호: data.cwOrdProgList[i].입고전표번호
						,입고일자: data.cwOrdProgList[i].입고일자
						,입고수량: data.cwOrdProgList[i].입고수량						
						,입고단가: data.cwOrdProgList[i].입고단가
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID, Number(page));
			     }
			}
		},
		error:function(x,e){
			if(x.status==0){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
	        }else if(x.status==404){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
	        }else if(x.status==500){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
	        }else if(e=='parsererror'){
	            alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
	        }else if(e=='timeout'){
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
	        }else {
	            alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
	        }
		}
	});
}




	