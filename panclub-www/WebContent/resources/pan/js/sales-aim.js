
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

var keyValueList1;

var calYearKo = new tui.DatePicker('#datepicker-year-ko', {
            date: new Date(),
            language: 'ko',
            type: 'year',
            input: {
                element: '#datepicker-input-ko',
                format: 'yyyy'
            }
        });
        
        
$(document).ready(function(){
	
	//관리자팝업
	var dialog;
	dialog = $( "#dialog-form" ).dialog({
	    autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "40%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap") },
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialog.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();

	// 에디팅 시작 이벤트 바인딩
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		currentRowIndex = event.rowIndex; // // 에디팅 시작 시 해당 행 인덱스 보관
		if (event.dataField == 'admCode' || event.dataField == 'admName') { //관리자(부서)코드 칼럼 
		    //관리유형 선택여부 체크
		    if (event.item.admType == '') {
				alert("관리유형을 선택하세요");
				return;
			}
			dialog.dialog("open");
			
			if (event.item.admType == '1') { //부서원
				
				findAdmStaff(currentRowIndex,event.item.admType);
			} else if (event.item.admType == '2') {  //부서
				findAdmDept(currentRowIndex,event.item.admType);
			} else if (event.item.admType == '3') {  //지점
				findAdmBranch(currentRowIndex,event.item.admType);
			} else if (event.item.admType == '4') {  //거래처
				findAdmCust(currentRowIndex,event.item.admType);
			}
		}
		return false; // false 반환하면 그리드 내장 에디터 표시 안함.(더 이상 진행 안함)
	});
	
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);


	// 마스터 그리드 데이터 요청
	requestMyData("/biz/sales-aim", myGridID);
	
	$("#btnReg").click(function(){
		updateDataToServer("/biz/salesAimAdd", "REG");
	});
   
});

// 그리드 생성
function createAUIGrid(keyValueList1) {

	//var keyValueList1Parse = JSON.parse(keyValueList1);
	
	var admTypeList =  [{"code":"1", "value":"부서원"},{"code":"2", "value":"부서"},{"code":"3", "value":"지점"}];
			
	var columnLayout = [
	 	 { dataField : "idx",    headerText : "IDX", width : 50}
	 	,{ dataField : "stdYYYY",    headerText : "기준년도", width : 140} 
		,{ dataField : "admType",   headerText : "관리유형", width: 120,
			renderer : {
				type : "DropDownListRenderer",
				list : admTypeList,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			}  } 
		,{ dataField : "admCode",   headerText : "지점(부서)코드", width : 120     }
		,{ dataField : "admName",   headerText : "지점(부서)명", width : 200   } 
		,{ dataField : "m1",   headerText : "1월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}
		} 
		,{ dataField : "m2",   headerText : "2월", width: 70, dataType: "numeric", formatString: "#,##0"
				,editRenderer : {
				 	type: "InputEditRenderer",
				 	onlyNumeric: true,
				 	maxlength: 18
				}				 
		 }
		,{ dataField : "m3",   headerText : "3월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}		  
		}
		,{ dataField : "m4",   headerText : "4월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m5",   headerText : "5월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m6",   headerText : "6월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m7",   headerText : "7월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m8",   headerText : "8월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m9",   headerText : "9월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m10",   headerText : "10월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m11",   headerText : "11월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}  
		}
		,{ dataField : "m12",   headerText : "12월", width: 70, dataType: "numeric", formatString: "#,##0" 
				,editRenderer : { 	type: "InputEditRenderer", 	onlyNumeric: true,	 	maxlength: 18	}
		}
		,{ dataField : "sumAim",  headerText : "합계", width: 70, dataType: "numeric", formatString: "#,##0", editable:false		}
	];

	// 그리드 속성 설정
	var gridPros = {
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		//showRowCheckColumn: true,
			
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
	

	
// Details 데이터 요청 지연 타임아웃
var timerId = null;


// 데이터 요청 Ajax
function requestMyData(url, gridId) {
	var list = [];
	
	var stdYYYY = $("#datepicker-input-ko").val();
    console.log("stdYYYY:"+stdYYYY);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"stdYYYY" : stdYYYY
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.salesAimList.length == 0){
				 AUIGrid.setGridData(gridId, list);			
			}else{
					
				for(i=0;i<data.salesAimList.length;i++){
					list.push({
						 idx: i 
						,stdYYYY: data.salesAimList[i].stdYYYY 
						,admType: data.salesAimList[i].admType 
						,admCode: data.salesAimList[i].admCode
						,admName: data.salesAimList[i].admName
						,m1: data.salesAimList[i].m1
						,m2: data.salesAimList[i].m2
						,m3: data.salesAimList[i].m3
						,m4: data.salesAimList[i].m4
						,m5: data.salesAimList[i].m5
						,m6: data.salesAimList[i].m6
						,m7: data.salesAimList[i].m7
						,m8: data.salesAimList[i].m8
						,m9: data.salesAimList[i].m9
						,m10: data.salesAimList[i].m10
						,m11: data.salesAimList[i].m11
						,m12: data.salesAimList[i].m12
						,sumAim : data.salesAimList[i].sumAim
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
	var stdYYYY = $("#datepicker-input-ko").val();
	var item = new Object();
	item.idx = '',
    item.stdYYYY = stdYYYY, 
	item.admType = '',
	item.admCode = '',
	item.admName = '', 
	item.m1 = '', 
	item.m2 = '', 
	item.m3 = '', 
	item.m4 = '', 
	item.m5 = '', 
	item.m6 = '', 
	item.m7 = '', 
	item.m8 = '', 
	item.m9 = '', 
	item.m10 = '', 
	item.m11 = '', 
	item.m12 = '', 
	item.sumAim = '',
	
	AUIGrid.addRow(myGridID, item, rowPos);	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {	
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		//alert("등록/수정/삭제할 대상을 선택하세요!");
		//return;
	}
	
	//console.log("url:"+url);
 	// 추가된 행 아이템들(배열)
  	var addList  = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);
    
    var i, len, name, rowItem;
	var str = "";
	
	var isValid = AUIGrid.validateGridData(myGridID, ["admCode"], "필수 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["admCode"], "지점(부서)코드는 반드시 유효한 값을 직접 입력해야 합니다.");
		
	if (isValid == false || isValidChanged == false) {
		return;
	}
	
	var data = {};
	
	if(addList.length > 0) data.salesAimAdd = addList;
	else data.salesAimAdd = [];
	
	if(updateList.length > 0) data.salesAimUpdate = updateList;
	else data.salesAimUpdate = [];
	
	if(removeList.length > 0) data.salesAimRemove = removeList;
	else data.salesAimRemove = [];
	
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

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
	
	var dialog;
	dialog = $( "#dialog-form" );	
	dialog.dialog("close");
}		


// 
function auiCellEditingHandler(event) {
	//console.log("celledit");
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
		
		if (event.dataField == 'm1' || event.dataField == 'm2' || event.dataField == 'm3' || event.dataField == 'm4' || event.dataField == 'm5' || event.dataField == 'm6' 
		|| event.dataField == 'm7' || event.dataField == 'm8' || event.dataField == 'm9' || event.dataField == 'm10' || event.dataField == 'm11' || event.dataField == 'm12'){
			
			var sumAim = 0;
			
			sumAim = event.item.m1 + event.item.m2 + event.item.m3 + event.item.m4 + event.item.m5 + event.item.m6 + event.item.m7 + event.item.m8
					 + event.item.m9 + event.item.m10 + event.item.m11 + event.item.m12;
			AUIGrid.updateRow(myGridID, { "sumAim": sumAim }, event.rowIndex);
		}		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	
	
	