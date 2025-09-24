
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
let custList = [];

$(document).ready(function() {

	var keyValueList = findDataToServer3("/base/cust-list", "N");

	createAUIGrid(keyValueList);

	findDataToServer("/club/c-cust", 1)


	$("#btnReg").click(function() {
		updateDataToServer("/club/cCustReg");
	});

});


function createAUIGrid( keyValueList3) {

	var keyValueList7 = JSON.parse(keyValueList3);

	var columnLayout = [
		 { dataField: "rowID", headerText: "rowID", editable: false,  visible: false }
		,{ dataField: "custCode", headerText: "업체코드", editable: false , width:70 }
		,{ dataField: "custName", headerText: "업체명", editable: false }
		,{ dataField: "masterId", headerText: "기본시스템관리자ID", style:"left" 
				,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
			        show : true,
			        tooltipHtml : '자동생성되는 시스템관리자 아이디입니다. 최최 비밀번호는 forcar4car 입니다.'
			    }
	    }
	    ,{ dataField: "parentComInfo", headerText: "관리업체",
	    	renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
            type : "DropDownListRenderer",
            listFunction : function(rowIndex, columnIndex, item, dataField) {
				  
			      return ['',...custList.map(row=>`[${row.custCode}]${row.custName}`)];
			}
      }
	    }
		,{ dataField : "validYN",   headerText : "유효여부",
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
				} , width:80
		 }
		 ,{ dataField : "erpYN",   headerText : "erp사용업체",
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
				} , width:80
		 }
		 ,{ dataField : "consignYN",   headerText : "재고위탁업체",
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
				} , width:80
		 }

	];
	
	const parentColumnLayout = [
		{
		dataField: "comCode",
		headerText: "업체코드",
		width: 80,
		editRenderer: {
			type: "InputEditRenderer",

			// ID는 고유값만 가능하도록 에디팅 유효성 검사
			validator: function (oldValue, newValue, rowItem, dataField) {
				if (oldValue != newValue) {
					// dataField 에서 newValue 값이 유일한 값인지 조사
					var isValid = AUIGrid.isUniqueValue(myGridID, dataField, newValue);

					// 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
					return { "validate": isValid, "message": newValue + " 값은 고유값이 아닙니다. 다른 값을 입력해 주십시오." };
				}
			}
		}
	}, {
		dataField: "name",
		headerText: "업체명",
		style: "left",
		width: 200,
	}
	]

	var auiGridProps = {
		editable: true,
		showStateColumn: true,
		rowIdField: "rowID",
		showAutoNoDataMessage : false, 
	};

	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	 AUIGrid.create("#grid_wrapParent", parentColumnLayout,{... auiGridProps
	 															,  
	 																displayTreeOpen: true, 
																	editable: false, 
																	flat2tree: true,
	 																// 행의 고유 필드명
																	rowIdField: "comCode", 
																	// 트리의 고유 필드명
																	treeIdField: "comCode", 
																	// 계층 구조에서 내 부모 행의 treeIdField 참고 필드명
																	treeIdRefField: "parent",
																	showStateColumn: false,
	 															});

	//AUIGrid.bind(myGridID, "cellClick", auiGridSelectionChangeHandler);

	var dialog;
	dialog = $("#dialog-form").dialog({
		autoOpen: false,
		height: 500,
		//minWidth: 500,
		width: "40%",
		modal: true,
		headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap") },
		buttons: {
			"확인": updateGridRow,
			"취소": function(event) {
				dialog.dialog("close");
			}
		},
		close: function() {
			$("#srChoice tbody tr td").empty();
		}
	});

	AUIGrid.bind(myGridID, "cellDoubleClick", function(event) {
		currentRowIndex = event.rowIndex; // // 에디팅 시작 시 해당 행 인덱스 보관
		
		if (event.dataField == 'custCode' || event.dataField == 'custName') { //관리자(부서)코드 칼럼 
		
			dialog.dialog("open");
			findDataToServer3("/base/cust-list", "Y");
		}
		return false; // false 반환하면 그리드 내장 에디터 표시 안함.(더 이상 진행 안함)
	});
}

var currentRowIndex;

function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');


	var item = {};
	item.custCode = mCode; // $("#name").val();
	item.custName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);

	var dialog;
	dialog = $("#dialog-form");
	dialog.dialog("close");
}

function findDataToServer(url, page) {
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {

		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) { 
			if (data.c_custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else { 
				custList = data.c_custList.sort((a,b)=>a.custCode.localeCompare(b.custCode)).map(row=>{
														return {
																...row , 
																rowID:row.custCode , 
																parentComInfo : row.parentComCode?`[${row.parentComCode}]${row.parentComName}`:''
																};
													})
			 	

				AUIGrid.setGridData("#grid_wrap", custList);
				
				//1차가공
				const origin = custList.map(row=>{return{
														    comCode : row.custCode , name : row.custName  , parentComCode : row.parentComCode , id:row.custCode 
														}}); 
				//상위관리 회사들의 모음										
				const parentCodeList = new Set(origin.filter(r=>r.parentComCode!=null && r.parentComCode != '').map(r=>r.parentComCode)); 
				 
				//상위관리 회사인 업체와 관리업체가 존재하는 업체들을 모음
				const list = origin.filter(row=>parentCodeList.has(row.comCode) || (row.parentComCode!=null && row.parentComCode!='')).sort((a,b)=>(b.parentComCode==null?1:0) - (a.parentComCode==null?1:0) ); 
			 
				list.forEach((row)=>{ 
					if(row.parentComCode != null) row.parent=row.parentComCode;
				}) 
				AUIGrid.setGridData("#grid_wrapParent",list.sort(r=>parentCodeList.has(r.parent)?1:-1));
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID, Number(page));
				}
			}
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

function findDataToServer3(url, listYN) {
	$(".ui-dialog-titlebar-close").html("X");
	var list = []; //자바스크립트 배열선언
	var listS;
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {

			if (data.custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
			} else {
				var j = 0;
				arr_text = "<select id='mCode' style='padding:7px 20px;' >";
				for (i = 0; i < data.custList.length; i++) {
					//if (data.custList[i].custType == "C3") {
						code = data.custList[i].custCode;
						value = data.custList[i].custName;
						list[j] = { "code": code, "value": value };
						j = j + 1;
						
						//20240621 supi 이름에 공백이 들어가면 별개의 태그로 인식해서 짤리는 문제 수정
//						arr_text = arr_text + "<option value=" + code + " mname=" + value + ">" + code + "-" + value + "</option>";
						arr_text = arr_text + `<option value=${code} mname="${value}">${code}-${value}</option>`;
					//}
				}
				arr_text = arr_text + "</select>";

				if (listYN == "Y") { $("#srChoice tbody tr td").append(arr_text); };

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


function addRow(grid, rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID, item, rowPos);
};

function removeRow() {
	AUIGrid.removeRow(myGridID, "selectedIndex");
};

function updateDataToServer(url) {

	var addList = AUIGrid.getAddedRowItems(myGridID);
	var updateList = AUIGrid.getEditedRowItems(myGridID).map(row=>{
																const parentComCode = row.parentComInfo.split(']')[0].replace('[','');
																const parentComName = row.parentComInfo.replace(`[${parentComCode}]`,'');
																return {...row , parentComCode , parentComName};
															});
	var removeList = AUIGrid.getRemovedItems(myGridID);

	var isValid = AUIGrid.validateGridData(myGridID, ["custCode", "custName", "masterId"], "업체코드, 업체명, 기본시스템관리자ID는 값을 입력해야 합니다.");
	var isValidChanged = AUIGrid.validateChangedGridData(myGridID, ["custCode", "custName", "masterId"],  "업체코드, 업체명, 기본시스템관리자ID는 값을 입력해야 합니다.");
	if (isValid == false || isValidChanged == false) {
		return;
	}

	var data = {};

	if (addList.length > 0) {
		data.c_custAdd = addList;
	} else data.c_custAdd = [];

	if (updateList.length > 0) {
		data.c_custUpdate = updateList;
	} else data.c_custUpdate = [];

	if (removeList.length > 0) data.c_custRemove = removeList;
	else data.c_custRemove = [];
 

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			alert(data.result_msg);	       
	        if ( data.result_code == "OK") { //처리 성공한 겨우
	        	AUIGrid.removeSoftRows(myGridID); // 삭제 표시된 행(소프트 삭제) 그리드에서 제거
				AUIGrid.resetUpdatedItems(myGridID); // 현재 수정 정보 초기화
	        	findDataToServer();
	        }else{
				//console.log("errIdx:"+data.errIdx);
				AUIGrid.resetUpdatedItems(myGridID);	
				errRowStyleFunction(data.errIdx);
			}	     
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};

function errRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		var idxSplit = idxArr.split("^");  
		for ( var h in idxSplit ) {
			console.log("h:"+idxSplit[h]);
			if (item.custCode == idxSplit[h]) {
				return "auigrid-err-row-style";
			}
		}

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};

