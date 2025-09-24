
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();
	
	// 마스터 그리드 데이터 요청
	requestMyData("/biz/payment", myGridID);
	
	
	$("#btnReg").click(function(){
		updateDataToServer("/biz/paymentAdd", "REG");
	});
   
});

// 그리드 생성
function createAUIGrid() {
	var payTypeList = ["계좌", "카드","기타"];
	var columnLayout = [
	 	  { dataField : "payCode_origin",    headerText : "코드", width : 200, visible: false}
		,{ dataField : "payCode",    headerText : "코드", width : 200}
		//,{ dataField : "payType",    headerText : "유형", width : 200}
		,{ dataField : "payType",    headerText : "유형", width : 200,
				renderer: {
			type: "DropDownListRenderer",
			descendants: ["leaf"], // 자손 필드들
			descendantDefaultValues: ["-"], // 변경 시 자손들에게 기본값 지정
			list: payTypeList
			}		
		}
		,{ dataField : "name",      headerText : "명칭", width : 300}
	    ,{ dataField : "accoutNo",      headerText : "번호", width : 300}
		,{ dataField : "depoistAccYN",   headerText : "입금계좌",
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
		,{ dataField : "validYN",   headerText : "사용여부",
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
		 },{ dataField : "commonDpYN",   headerText : "일반입금",
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
		 },{ dataField : "insurDpYN",   headerText : "보험입금",
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
		 ,{ dataField : "accOwner",      headerText : "계좌주"}
	];

	// 그리드 속성 설정
	var gridPros = {
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "payCode_origin",
		//showRowCheckColumn: true,
		
		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
			
		selectionMode: "multipleRows"		
	};

	// 실제로 #grid_wrap2 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	
	// 에디팅 시작 이벤트 바인딩
	// 새행 추가시 특정 칼럼만 에디팅 ㄷ되게
	AUIGrid.bind(myGridID, "cellEditBegin", function (event) {
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
			
			if (data.paymentList.length == 0){
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.paymentList.length;i++){
					list.push({
						 payCode_origin: data.paymentList[i].payCode 
						,payCode: data.paymentList[i].payCode 
						,payType: data.paymentList[i].payType 
						,name: data.paymentList[i].name
						,accoutNo: data.paymentList[i].accoutNo
						,validYN: data.paymentList[i].validYN
						,depoistAccYN: data.paymentList[i].depoistAccYN						
						,commonDpYN: data.paymentList[i].commonDpYN						
						,insurDpYN: data.paymentList[i].insurDpYN						
						,accOwner: data.paymentList[i].accOwner						
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

// 행 추가, 삽입
function addRow(grid,rowPos) {
	var item = new Object();
	item.payCode = '',
    item.payType = '', 
	item.name = '',
	item.accoutNo = '',
	item.validYN = '', 
	item.depoistAccYN = '', 
	
	AUIGrid.addRow(myGridID, item, rowPos);	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {	
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("등록/수정/삭제할 대상을 선택하세요!");
		return;
	}
	
	//console.log("url:"+url);
 	// 추가된 행 아이템들(배열)
  	var addedRowItems  = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var editedRowItems = AUIGrid.getEditedRowItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);
    
    var i, len, name, rowItem;
	var str = "";
	
	var isValid = AUIGrid.validateGridData(myGridID, ["payCode", "payType", "name"], "필수 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["payCode", "payType","name"], "코드, 유형, 명칭, 번호는 반드시 유효한 값을 직접 입력해야 합니다.");
		
	if (isValid == false || isValidChanged == false) {
		return;
	}
	
	//체크되 row만
	var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
	var addList = addedRowItems.filter(item => AUIGrid.isCheckedRowById(myGridID, item[rowIdField]));
	var updateList = editedRowItems.filter(item => AUIGrid.isCheckedRowById(myGridID, item[rowIdField]));
	var removeList = removedRowItems.filter(item => AUIGrid.isCheckedRowById(myGridID, item[rowIdField]));

	//console.log("addList:"+addList);
	//return false;
	
	var data = {};
	
	if(addList.length > 0) data.paymentAdd = addList;
	else data.paymentAdd = [];
	
	if(updateList.length > 0) data.paymentUpdate = updateList;
	else data.paymentUpdate = [];
	
	if(removeList.length > 0) data.paymentRemove = removeList;
	else data.paymentRemove = [];
	
	data.workingType = workingType;
	
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
			//AUIGrid.resetUpdatedItems(myGridID, "a");
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

function removeRow() {
	//var rowPos = document.getElementById("removeSelect").value;
	AUIGrid.removeRow(myGridID, "selectedIndex");
};


		