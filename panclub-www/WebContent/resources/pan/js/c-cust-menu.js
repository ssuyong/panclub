// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID2;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();

	// Details 그리드를 생성합니다.
	createDetailAUIGrid();

	// 마스터 그리드 데이터 요청
	requestMyData("/club/c-cust", myGridID);
	
	
	$("#btnReg").click(function(){
		updateDataToServer("/club/custMenuReg", "REG");
	});

});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		{ dataField : "custCode",      headerText : "업체코드", width : 100 }
	   ,{ dataField : "custName",      headerText : "업체명", width : 200 }	   	   
	];
	
	// 그리드 속성 설정
	var gridPros = {
		// singleRow 선택모드
		selectionMode: "singleRow",

		rowIdField: "custCode",

		showRowCheckColumn: false,
		showAutoNoDataMessage : false, 
			
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
		
	//선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", auiGridSelectionChangeHandler);
		
};

// 메뉴 그리드 생성
function createDetailAUIGrid() {

	var columnLayout = [
	 	{ dataField : "idx",    headerText : "idx"}
		,{ dataField : "menuCode",    headerText : "메뉴코드"}
		,{ dataField : "menuName",      headerText : "메뉴이름"}
	    ,{ dataField : "validYN",      headerText : "노출유무",
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
	 	,{ dataField : "regUserId",    headerText : "등록자"} 
		,{ dataField : "created",     headerText : "등록일"}
		,{ dataField : "custCode",     headerText : "거래처코드"}
	];

	// 그리드 속성 설정
	var gridPros = {
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "menuCode",
		//showRowCheckColumn: true,
		selectionMode: "multipleRows"		
	};

	// 실제로 #grid_wrap2 에 그리드 생성
	myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout, gridPros);

}
	

// 그리드 ready 이벤트 핸들러
function auiGridCompleteHandler(event) {

	// 마스터 그리드가 로딩 완료된 시점에 마스터코드를 고정. 
	var userId = "";
	mCode = $("#dInfo_userId").text();
	AUIGrid.selectRowsByRowId(myGridID, userId);

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
		
		var custCode = rowItem.custCode; // 선택한 행의 업체코드
		var custName = rowItem.custName;
		//console.log(userId);
		// 디테일 정보 표시
		document.getElementById("dInfo_custCode").innerHTML = custCode;
		document.getElementById("dInfo_custName").innerHTML = custName;

		// rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
		requestMyData2("/club/cust-menu?custCode="+custCode, myGridID2);
		
	}, 200);  // 현재 200ms 민감도....환경에 맞게 조절하세요.
};

// 데이터 요청 Ajax
function requestMyData(url, gridId) {
	var list = [];

	
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
			
			if (data.c_custList.length == 0){
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.c_custList.length;i++){
					list.push({
						 custCode: data.c_custList[i].custCode 
						,custName: data.c_custList[i].custName					
					});
				}		
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


function requestMyData2(url, gridId) {
	var list = [];
	
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
			
			if (data.c_custMenuList.length == 0){
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.c_custMenuList.length;i++){
					list.push({
						//idx: data.c_custMenuList[i].idx 
						 menuCode: data.c_custMenuList[i].menuCode 
						,menuName: data.c_custMenuList[i].menuName
						,validYN: data.c_custMenuList[i].validYN
						,regUserId: data.c_custMenuList[i].regUserId
						,created: data.c_custMenuList[i].created
					    ,custCode: data.c_custMenuList[i].custCode
					});
				}		
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



// 행 추가, 삽입
function addRow2(grid,rowPos) {
	var item = new Object();
	item.menuCode = '',
    item.menuName = '', 
	item.validYN = '',
	item.uptUserId = '', 
	item.modified = ''
	
	AUIGrid.addRow(myGridID2, item, rowPos);	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {	
	
	var custCode = $("#dInfo_custCode").text();
	var custName = $("#dInfo_custName").text();
	
 	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID2);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID2); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID2);
    
    var i, len, name, rowItem;
	var str = "";
	
	//var isValid2 = AUIGrid.validateGridData(myGridID2, ["code", "codeName"], "필수 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	//var isValidChanged2 = AUIGrid.validateChangedGridData(myGridID2, ["code", "codeName"], "코드, 코드명은 반드시 유효한 값을 직접 입력해야 합니다.");
	/*	
	if (isValid2 == false || isValidChanged2 == false) {
		return;
	}
	*/
	var data = {};
	
	if(addList.length > 0) data.c_custMenuAdd = addList;
	else data.c_custMenuAdd = [];
	
	if(updateList.length > 0) data.c_custMenuUpdate = updateList;
	else data.c_custMenuUpdate = [];
	
	if(removeList.length > 0) data.c_custMenuRemove = removeList;
	else data.c_custMenuRemove = [];
	
	data.workingType = workingType;
	data.custCode = custCode;
	data.custName = custName;
	console.log(JSON.stringify(data));
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
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

