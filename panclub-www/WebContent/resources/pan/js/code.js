
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID2;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();

	// Details 그리드를 생성합니다.
	createDetailAUIGrid();

	// 마스터 그리드 데이터 요청
	requestMyData("/base/code-mst-list", myGridID);
	
	
	$("#btnReg").click(function(){
		updateDataToServer("/base/codeAdd", "REG");
	});
   
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "mCode",      headerText : "마스터코드", width : 80 }
	   ,{ dataField : "mCodeName",      headerText : "코드명", width : 200 
		   ,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '완성차코드 : 카윈 -> 4CAR'
		    } 
	    }
	   ,{ dataField : "mCodeOrderBy",     headerText : "정렬순서", width : 80 , dataType: "numeric"  ,visible:false  }
		,{ dataField : "value1",   headerText : "구분1" } 
		,{ dataField : "value2",   headerText : "구분2" }
		,{ dataField : "value3",   headerText : "구분3" }
	   
	];
	
	// 그리드 속성 설정
	var gridPros = {
		// singleRow 선택모드
		selectionMode: "singleRow",

		rowIdField: "mCode",

		showRowCheckColumn: false
			
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
		
	//선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", auiGridSelectionChangeHandler);
		
};

// 관리자 그리드 생성
function createDetailAUIGrid() {

	var columnLayout = [
	 	 { dataField : "rowID",    headerText : "rowID", width : 100,  visible:false }
		,{ dataField : "code",    headerText : "코드*", width : 100, editable : true}
		,{ dataField : "mCode",      headerText : "마스터코드", width : 100,  editable : false,  visible:false}
	    ,{ dataField : "mCodeName",      headerText : "마스터코드명", width : 200 , editable : false,visible:false }
	    ,{ dataField : "mCodeOrderBy",     headerText : "정렬순서", width : 80 , dataType: "numeric" , editable : false,visible:false     }
	 	,{ dataField : "codeName",    headerText : "코드명*", width : 200} 
		,{ dataField : "codeOrderBy",     headerText : "정렬순서", width : 80, dataType: "numeric" }
		,{ dataField : "value1",   headerText : "구분1" } 
		,{ dataField : "value2",   headerText : "구분2" }
		,{ dataField : "value3",   headerText : "구분3" }
		,{ dataField : "validYN",   headerText : "활성여부",
			style : "aui-grid-user-custom",
	
			styleFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(value == "Y") {
					return "my-inactive-style";
				} else if(value == "N") {
					return "my-active-style";
				}
				return "";
			},
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
				checkValue : "Y", // true, false 인 경우가 기본
				unCheckValue : "N",
				
				//사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
				checkableFunction :  function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
					// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
					if(item.charge == "Anna") {
						return false;
					}
					return true;
				}
			}
		 }
	];

	// 그리드 속성 설정
	var gridPros = {
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "rowID",
		//showRowCheckColumn: true,
		selectionMode: "multipleRows"		
	};

	// 실제로 #grid_wrap2 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, gridPros);
	
	
	// 에디팅 시작 이벤트 바인딩
	// 새행 추가시 특정 칼럼만 에디팅 ㄷ되게
	AUIGrid.bind(myGridID2, "cellEditBegin", function (event) {
		// rowIdField 설정 값 얻기
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");
		console.log(".rowIdField:"+rowIdField);
		if (event.dataField == "code") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
			}
		}
		return true; // 다른 필드들은 편집 허용
	});
		
}
	


// 그리드 ready 이벤트 핸들러
function auiGridCompleteHandler(event) {

	// 마스터 그리드가 로딩 완료된 시점에 마스터코드를 고정. 
	var mCode = "";
	mCode = $("#dInfo_mCode").text();
	AUIGrid.selectRowsByRowId(myGridID, mCode);

	//document.getElementById("detail_info").innerHTML = "고객 ID : cust3 Details";
	//console.log("mcode in");
	// 고객 ID cust3 으로 초기 디테일 그리드 작성
	// requestMyData("./data/getJsonDetails.php?id=cust3", myGridID2);
}
	
	
// Details 데이터 요청 지연 타임아웃
var timerId = null;

// 마스터 그리드선택 변경 이벤트 핸들러
// 마스터 그리드에서 행을 선택한 경우 해당 행의 마스터코드(mCode) 에 맞는 데이터를 요청하여 디테일 그리드에 표시합니다.
function auiGridSelectionChangeHandler(event) {

	// 200ms 보다 빠르게 그리드 선택자가 변경된다면 데이터 요청 안함
	if (timerId) {
		clearTimeout(timerId);
	}

	timerId = setTimeout(function () {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell;

		// 대표 셀에 대한 전체 행 아이템
		var rowItem = primeCell.item;

		var mCode = rowItem.mCode; // 선택한 행의 고객 ID 값
		var mCodeName = rowItem.mCodeName;

		// 디테일 정보 표시
		document.getElementById("dInfo_mCode").innerHTML = mCode;
		document.getElementById("dInfo_mCodeName").innerHTML = mCodeName;

		// rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
		requestMyData("/base/code-list?mCode=" + mCode, myGridID2);
	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
};

// 데이터 요청 Ajax
function requestMyData(url, gridId) {
	var list = [];

	// ajax 요청 전 그리드에 로더 표시..원할 경우 주석 제거
	//AUIGrid.showAjaxLoader(gridId);

	/*
	// ajax (XMLHttpRequest) 로 그리드 데이터 요청
	ajax({
		url: url,
		onSuccess: function (data) {
			// 그리드 데이터
			var gridData = data;

			// 그리드에 데이터 세팅
			AUIGrid.setGridData(gridId, gridData);

			// 로더 제거.. 원할 경우 주석 제거
			//AUIGrid.removeAjaxLoader(gridId);
		},
		onError: function (status, e) {
			alert("데이터 요청에 실패하였습니다.\r status : " + status);

			// 로더 제거.. 원할 경우 주석 제거
			//AUIGrid.removeAjaxLoader(gridId);
		}
	});
	*/
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.codeList.length == 0){
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.codeList.length;i++){
					list.push({
						 mCode: data.codeList[i].mCode 
						,mCodeName: data.codeList[i].mCodeName 
						,mCodeOrderBy: data.codeList[i].mCodeOrderBy
						,rowID: data.codeList[i].codeIdx
						,code: data.codeList[i].code
						,codeName: data.codeList[i].codeName 
						,codeOrderBy: data.codeList[i].codeOrderBy
						,value1: data.codeList[i].value1 
						,value2: data.codeList[i].value2
						,value3: data.codeList[i].value3 
						,validYN: data.codeList[i].validYN
						
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}	
				 //AUIGrid.clearGridData(myGridID);	
				 AUIGrid.setGridData(gridId, list);
				
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

// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;

//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
 	var mName = mCodeSel.attr('mname');
 	
 	//console.log(mCode);
 	//console.log(mName);
 	
	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID2, item, currentRowIndex);
	
	var dialog;
	dialog = $( "#dialog-form" );	
	dialog.dialog("close");
}


// 행 추가, 삽입
function addRow2(grid,rowPos) {
	var item = new Object();
	item.mCode = '',
    item.mCodeName = '', 
	item.mCodeOrderBy = '',
	item.codeIdx = '',
	item.code = '', 
	item.codeName = '', 
	item.codeOrderBy = '', 
	item.value1 = '',
	item.value2 = '',
	item.value3 = '',
	item.validYN = ''	

	AUIGrid.addRow(myGridID2, item, rowPos);	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {	
	
	var mCode = $("#dInfo_mCode").text();
	var mCodeName = $("#dInfo_mCodeName").text();
	
	console.log(mCode);
	console.log(mCodeName);
	
 	// 추가된 행 아이템들(배열)
  	var addList2 = AUIGrid.getAddedRowItems(myGridID2);                   
	// 수정된 행 아이템들(배열)
	var updateList2 = AUIGrid.getEditedRowColumnItems(myGridID2); 
	// 삭제된 행 아이템들(배열)
	var removeList2 = AUIGrid.getRemovedItems(myGridID2);
    
    var i, len, name, rowItem;
	var str = "";
	
	var isValid2 = AUIGrid.validateGridData(myGridID2, ["code", "codeName"], "필수 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged2 = AUIGrid.validateChangedGridData(myGridID2, ["code", "codeName"], "코드, 코드명은 반드시 유효한 값을 직접 입력해야 합니다.");
		
	if (isValid2 == false || isValidChanged2 == false) {
		return;
	}
	
	var data = {};
	

	if(addList2.length > 0) data.codeAdd = addList2;
	else data.codeAdd = [];
	
	if(updateList2.length > 0) data.codeUpdate = updateList2;
	else data.codeUpdate = [];
	
	if(removeList2.length > 0) data.codeRemove = removeList2;
	else data.codeRemove = [];
	
	data.workingType = workingType;
	data.mCode = mCode;
	data.mCodeName = mCodeName;
	console.log(data);
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);
	       // location.reload();
	       //AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	       // 모두 초기화.
			AUIGrid.resetUpdatedItems(myGridID2, "a");
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

function removeRow2() {
	//var rowPos = document.getElementById("removeSelect").value;
	AUIGrid.removeRow(myGridID2, "selectedIndex");
};


		