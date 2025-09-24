
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

var keyValueList1;
$(document).ready(function(){
	keyValueList1 = findDataToServer1("/base/cust-list");
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(keyValueList1);

	// 마스터 그리드 데이터 요청
	requestMyData("/biz/co-card", myGridID);
	
	
	$("#btnReg").click(function(){
		updateDataToServer("/biz/coCardAdd", "REG");
	});
   
});

// 그리드 생성
function createAUIGrid(keyValueList1) {

	var keyValueList1Parse = JSON.parse(keyValueList1);
		
	var columnLayout = [
	 	  { dataField : "cardNum_origin",    headerText : "카드번호-origin", width : 100, visible:false}
		,{
			dataField: "custCode",
			headerText: "카드사",
			sortType: 1,
			width : 100,
			cellMerge: true,
			editable: true,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;

				for (var i = 0, len = keyValueList1Parse.length; i < len; i++) {
					if (keyValueList1Parse[i]["code"] == value) {
						retStr = keyValueList1Parse[i]["value"];
						break;
					}
				}
				return retStr;
			},

			editRenderer: {
				type: "DropDownListRenderer",
				list: keyValueList1Parse,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			},
		}
		//,{ dataField : "custName",    headerText : "카드사명", width : 200}
		,{ dataField : "cardName",    headerText : "카드명", width : 150}
		,{ dataField : "cardNum",      headerText : "카드번호", width : 200}
		,{ dataField : "cvc",    headerText : "cvc", width : 50}
	    ,{ dataField : "expirDate",      headerText : "유효기간", width : 100}
		,{ dataField : "settleDay",      headerText : "결제일", width : 150}
		,{ dataField : "ownType",      headerText : "소유구분", width : 100}
		,{ dataField : "userComment",      headerText : "사용자", width : 150}
		,{ dataField : "limitAmt",      headerText : "한도", width : 100}
		,{ dataField : "usePeriod",      headerText : "사용일", width : 100}
		,{ dataField : "prevCardNum1",      headerText : "이전카드번호", width : 200}
		,{ dataField : "memo1",      headerText : "비고", width : 200}
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
		 }
	];

	// 그리드 속성 설정
	var gridPros = {
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "cardNum_origin",
		//showRowCheckColumn: true,
		
		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
			
		selectionMode: "multipleRows"		,
		showAutoNoDataMessage : false, 
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
	

	
// Details 데이터 요청 지연 타임아웃
var timerId = null;


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
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.coCardList.length == 0){
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.coCardList.length;i++){
					list.push({
						 cardNum_origin: data.coCardList[i].cardNum 
						,custCode: data.coCardList[i].custCode 
						,cardNum: data.coCardList[i].cardNum 
						,cardName: data.coCardList[i].cardName
						,cvc: data.coCardList[i].cvc
						,expirDate: data.coCardList[i].expirDate
						,settleDay: data.coCardList[i].settleDay						
						,ownType: data.coCardList[i].ownType
						,userComment: data.coCardList[i].userComment
						,limitAmt: data.coCardList[i].limitAmt
						,usePeriod: data.coCardList[i].usePeriod
						,prevCardNum1: data.coCardList[i].prevCardNum1
						,memo1: data.coCardList[i].memo1
						,validYN: data.coCardList[i].validYN
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
	item.custCode = '',
    item.cardNum = '', 
	item.cardName = '',
	item.cvc = '',
	item.expirDate = '', 
	item.settleDay = '', 
	item.ownType = '',
	item.userComment = '',
	item.limitAmt = '',
	item.usePeriod = '',
	item.prevCardNum1 = '',
	item.memo1 = '',
	item.settleDay = ''	
	
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
	
	var isValid = AUIGrid.validateGridData(myGridID, ["custCode", "cardNum"], "필수 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["custCode", "cardNum"], "카드사, 카드번호는 반드시 유효한 값을 직접 입력해야 합니다.");
		
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
	
	if(addList.length > 0) data.coCardAdd = addList;
	else data.coCardAdd = [];
	
	if(updateList.length > 0) data.coCardUpdate = updateList;
	else data.coCardUpdate = [];
	
	if(removeList.length > 0) data.coCardRemove = removeList;
	else data.coCardRemove = [];
	
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


function findDataToServer1(url) {
	var list = []; //자바스크립트 배열선언
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"custType":"C5" 
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				for (i = 0; i < data.custList.length; i++) {
						custCode = data.custList[i].custCode;
						custName = data.custList[i].custName;

						//list[j] = {custName};					
						list[j] = { "code": custCode, "value": custName };
						j = j + 1;					
				}

			}

			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!
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

	return listS; // 리턴을 바깥에서 해야함 

}

		