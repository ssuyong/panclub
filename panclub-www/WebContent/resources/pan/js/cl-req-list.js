

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
	//2023.06.30 bk
	branchCodeSelect("/base/code-list");
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
       var info = HashLocationName.split("!");
        
        scrollYN = "Y";
	  var page = info[0];
	  var sYmd = info[1];
	  var eYmd = info[2];
	  var clReqNo = info[3];
	  var carNo = info[4];
	  var custCode = info[5];
	  var insure1Code = info[6];
	  var insure1ＭgrName = info[7];
	  var clType = info[8];
	  var orderGroupId = info[9];
	  var regUserName = info[10];
	  var confYN = info[11];
	  var clGroupId = info[12];
	  var clReqType = info[13];
	  var branchCode = info[14];
	  var clDateType = info[15]; //기준일자 
	  var clStatus = info[16]; //청구여부  
	  var ymdIgnoreYN = info[17]; //기간무시  
	
		if (ymdIgnoreYN === "Y") {
			$('#ymdIgnoreYN').prop('checked', true);
		} else {
			$('#ymdIgnoreYN').prop('checked', false);
		}
	  $("#clReqNo").val(clReqNo);
	  $("#startpicker-input").val(sYmd);
	  $("#endpicker-input").val(eYmd);
	  $("#carNo").val(carNo);
	  $("#custCode").val(custCode);
	  $("#insure1Code").val(insure1Code);
	  $("#insure1ＭgrName").val(insure1ＭgrName);
	  $("#clType").val(clType);
	  $("#orderGroupId").val(orderGroupId);
	  $("#regUserName").val(regUserName);
	 // $("#confYN").val(confYN);
	 $("input:radio[name='confYN']:radio[value=" + confYN + "]").prop('checked', true);
	  $("#clGroupId").val(clGroupId);
	  $("#clReqType").val(clReqType);
	  $("#branchCode").val(branchCode);
	  $("#clDateType").val(clDateType);
	  $("#clStatus").val(clStatus);
 	
 		findDataToServer("/order/cl-req-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
	  var currentPage = 1;
	  var sYmd = $("#startpicker-input").val();
	  var eYmd = $("#endpicker-input").val();
	  var clReqNo_val = $("#clReqNo").val();
	  var custCode_val = $("#custCode").val();
	  var insure1Code_val = $("#insure1Code").val();
	  var insure1ＭgrName_val = $("#insure1ＭgrName").val();
	  var clType_val = $("#clType").val();
	  var orderGroupId_val = $("#orderGroupId").val();
	  var regUserName_val = $("#regUserName").val();
	  var confYN_val = $(':radio[name="confYN"]:checked').val();
	  var carNo_val = $("#carNo").val();
	  var clReqType_val = $("#clReqType").val();
	  var branchCode_val = $("#branchCode").val();
	  var ymdIgnoreYN_val = ($('#ymdIgnoreYN').is(':checked') ? "Y" : "N");
	  var clDateType_val = $("#clDateType").val();
	  var clStatus_val = $("#clStatus").val();
	  var clGroupId_val = $("#clGroupId").val();
		
	// 필요한 변수들을 설정하고 URL 해시를 업데이트
  document.location.hash = '#info' + currentPage + "!" + sYmd + "!" + eYmd + "!" + clReqNo_val + "!"
    + carNo_val + "!" + custCode_val + "!" + insure1Code_val + "!" + insure1ＭgrName_val + "!" + clType_val
    + "!" + orderGroupId_val + "!" + regUserName_val + "!" + confYN_val + "!" +clGroupId_val
    + "!" + clReqType_val + "!" + branchCode_val + "!" + clDateType_val+ "!" + clStatus_val+ "!" + ymdIgnoreYN_val;	
		findDataToServer("/order/cl-req-list", 1)
	});
	
	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/order/cl-req-list", 1);
	}
	
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	{  headerText : "기본정보", 
		children: [
			{ dataField: "idx", headerText: "idx", width: 50, editable: false,visible:false },
			{ dataField: "regYmd",        headerText: "생성일" },
			{ dataField: "uptYmd",        headerText: "요청일" },
			{ dataField: "chkDate",        headerText: "청구일" },
			{ dataField: "clYm",        headerText: "월청구" },
        	{ dataField: "clGroupId",      headerText: "청구그룹ID",     width: 100 
        		 , styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
        	{ dataField: "clReqNo",      headerText: "요청번호",     width: 100 
        		 , styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
        	{ dataField: "orderGroupId",      headerText: "주문그룹ID",    width: 100  },
        	{ dataField: "branchCode",      headerText: "관리지점",    width: 80  },
        	{ dataField: "custName",      headerText: "주문처",    width: 160 , style : "left" },
        	{ dataField: "carNo",         headerText: "차번",      width: 80       },
        	{ dataField: "carType",         headerText: "차종",      width: 80       },
        	{ dataField: "regUserName",         headerText: "담당자명",      width: 80       },
        ]
    },    
    {  headerText : "청구", 
		children: [
			{ dataField: "clType",        headerText: "구분"  , width : 56            },
			{ dataField: "clReqType",        headerText: "요청구분"  , width : 56            },
			{ dataField: "chkYN",        headerText: "진행"  , width : 56            },
			{ dataField: "confYN",        headerText: "기결"  , width : 56  ,visible:false           },
			{ dataField: "expType",        headerText: "증빙유형"  , width : 80            },
        	//{ dataField: "procStep",         headerText: "진행상태",      width: 120       }
        	//{ dataField: "billPubli",      headerText: "발행" , vis}
        ]
    },
    {  headerText : "보험사1", 
		children: [
			{ dataField: "insure1Name",        headerText: "보험사"              },    
        	{ dataField: "insure1AcceptNo",         headerText: "접수번호",      width: 120       },
        	{ dataField: "insure1AcciRate",      headerText: "과실" , style : "right" }
        ]
    },
    {  headerText : "보험사2", 
		children: [
			{ dataField: "insure2Name",        headerText: "보험사"              },
        	{ dataField: "insure2AcceptNo",         headerText: "접수번호",      width: 120       },
        	{ dataField: "insure2AcciRate",      headerText: "과실" , style : "right"}
        ]
    }
    /*,
    {  headerText : "수금", 
		children: [
			{ dataField: "insure1CollAmt",        headerText: "보험사1수금"  , dataType: "numeric",formatString: "#,##0"  , style:"right"              },
        	{ dataField: "insure2CollAmt",        headerText: "보험사2수금",      width: 120 , dataType: "numeric",formatString: "#,##0"  , style:"right"        },
        	{ dataField: "capitalAmt",        headerText: "기타",      width: 120  , dataType: "numeric",formatString: "#,##0"  , style:"right"       }
        ]
    },
    {  headerText : "금액확인", 
		children: [
			{ dataField: "primeAmt",        headerText: "원가"       , dataType: "numeric",formatString: "#,##0"  , style:"right"         },
        	{ dataField: "saleAmt",        headerText: "판매가",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        	{ dataField: "clAmt",        headerText: "청구금액",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        	{ dataField: "collectAmt",        headerText: "수금액",      width: 120, dataType: "numeric",formatString: "#,##0"  , style:"right"         }
       	
        ]
    }
    */ 
    /*,
    {  headerText : "기타비용", 
		children: [
			{ dataField: "riAmt",        headerText: "반입"              },
        	{ dataField: "extraExpence",        headerText: "부대비용",      width: 120       },
        ]
    }*/
    
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
			
			// 엑스트라 체크박스 표시 설정
			showRowCheckColumn: true,

			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			enableRowCheckShiftKey: true,

			// 전체 체크박스 표시 설정
			showRowAllCheckBox: true
			
			,showAutoNoDataMessage : false,
			rowIdField: "idx"
		
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
			
			,independentAllCheckBox: true,    // 전체 선택 체크박스가 독립적인 역할을 할지 여부

			// 엑스트라 체크박스 체커블 함수
			// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
			/*
			rowCheckableFunction: function (rowIndex, isChecked, item) {
				if (item.confYN == "Y") { // 
					return false;
				}
				return true;
			},
		*/
			rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
				if (item.confYN == "Y") { // 기결처리된 경우 체크바스 
					return false; // false 반환하면 disabled 처리됨
				}
				return true;
			}
			
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	var rowPos = 'first';

	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
		// 하단에 행인덱스, 헤더 텍스트, 수정 가능여부 출력함.
		//document.getElementById("selectionDesc").innerHTML = "현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ) : editable : " + primeCell.editable + ", 행 고유값(PK) : " + primeCell.rowIdValue;
	});
	
	// 에디팅 시작 이벤트 바인딩
	// 에디팅 정상 종료 직전 이벤트 바인딩
	// 에디팅 정상 종료 이벤트 바인딩
	// 에디팅 취소 이벤트 바인딩
	//AUIGrid.bind(myGridID, ["cellEditBegin", "cellEditEndBefore", "cellEditEnd", "cellEditCancel"], auiCellEditingHandler);
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {

		var clReqNo = event.item.clReqNo;
		var orderGroupId= event.item.orderGroupId;
		//console.log("storageUseReqNo:"+storageUseReqNo);
		
		if (event.dataField == 'clReqNo' ||event.dataField == 'clGroupId') {
			//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
			var sYmd = document.getElementById("startpicker-input").value;
			var eYmd = document.getElementById("endpicker-input").value;
			var clReqNo = event.item.clReqNo;
		    var orderGroupId= event.item.orderGroupId;
		    var clGroupId = event.item.clGroupId;
				
			//document.location.hash = '#info'+currentPage+"!"+clReqNo+"!"+sYmd+"!"+eYmd+"!"+orderGroupId;
			//
	     	//document.location.href ='/order/cl-req-item-list?clGroupId='+clGroupId+'&orderGroupId='+orderGroupId+'&clReqNo='+clReqNo; 
	     	
     	window.open('/order/cl-req-item-list?clGroupId='+clGroupId+'&orderGroupId='+orderGroupId+'&clReqNo='+clReqNo, '_blank');
//	     	}
			//window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId + '&orderGroupId=' + orderGroupId + '&clReqNo=' + clReqNo;
			}
	     	
	     	/*
	     	//post형식으로 거래처등록으로 넘기기
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderGroupId');
		    obj.setAttribute('value', orderGroupId);
		    f.appendChild(obj);
		    
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'clReqNo');
		    obj.setAttribute('value', clReqNo);		
		    f.appendChild(obj);
		
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/cl-req-item-list');
		    document.body.appendChild(f);
		    f.submit();
		}*/
		
		
	});
	
	// 전체 체크박스 클릭 이벤트 바인딩 : 주문번호 있는 경우 제외 전체체크 시 제외되게
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
		if (event.checked) {
			// name 의 값들 얻기
			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "chkYN");
			// Anna 제거하기
			//uniqueValues.splice(uniqueValues.indexOf("Y"), 1);
			uniqueValues.splice(!uniqueValues.indexOf(""), 1);
			AUIGrid.setCheckedRowsByValue(event.pid, "chkYN", uniqueValues);
		} else {
			AUIGrid.setCheckedRowsByValue(event.pid, "chkYN", []);
		}
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

	var clReqNo = $("#clReqNo").val().replace(/\s/g, ''); 
	var carNo = $("#carNo").val().replace(/\s/g, ''); 
	var custCode = $("#custCode").val(); 
	var insure1Code = $("#insure1Code").val(); 
	var insure1ＭgrName = $("#insure1ＭgrName").val(); 
	var clType = $("#clType").val(); 
	var orderGroupId = $("#orderGroupId").val().replace(/\s/g, ''); 
	var regUserName = $("#regUserName").val().replace(/\s/g, ''); 
	//var confYN = $("#confYN").val(); 
	var confYN = $(':radio[name="confYN"]:checked').val();
	var clGroupId = $("#clGroupId").val().replace(/\s/g, ''); 
	var clReqType = $("#clReqType").val(); 

	
	//console.log("clReqType" +clReqType);
	
	var branchCode = $("#branchCode").val(); //2023.06.30 branchCode 
	var clDateType = $("#clDateType").val(); //2023.07.10 기준일자
	var clStatus = $("#clStatus").val(); //2023.07.25 청구여부
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"clReqNo":clReqNo,
			"carNo":carNo,
			"custCode":custCode,
			"insure1Code":insure1Code,
			"insure1ＭgrName":insure1ＭgrName,
			"clType":clType,
			"orderGroupId":orderGroupId,
			"regUserName":regUserName,
			"confYN":confYN,
			"clGroupId":clGroupId,
			"clReqType":clReqType ,
			"branchCode" : branchCode,  //2023.06.30 branchCode 
			"clDateType":clDateType ,
			"clStatus":clStatus 
		
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
			//	$("#iDiv_noDataPop").css("display","block");
					AUIGrid.clearGridData(myGridID);							
			}else{
					
				for(i=0;i<data.reqList.length;i++){
					$("#dataComCode").val(data.reqList[i].comCode);  //2023.07.14 by dataCheck
					list.push({
							idx: i,
						 regYmd: data.reqList[i].regYmd 
						,carNo: data.reqList[i].carNo 
						,clReqNo: data.reqList[i].clReqNo 
						,orderGroupId: data.reqList[i].orderGroupId
						//,supCustName: data.reqList[i].supCustName 
						,custName: data.reqList[i].custName
						,clType: data.reqList[i].clType 
						,procStep: data.reqList[i].procStep 
						,billPubli: data.reqList[i].billPubli
						,insure1Name: data.reqList[i].insure1Name 
						,insure1AcceptNo: data.reqList[i].insure1AcceptNo 
						,insure1AcciRate: data.reqList[i].insure1AcciRate
						,insure2Name: data.reqList[i].insure2Name 
						,insure2AcceptNo: data.reqList[i].insure2AcceptNo 
						,insure2AcciRate: data.reqList[i].insure2AcciRate
						,insure1CollAmt: data.reqList[i].insure1CollAmt
						,insure2CollAmt: data.reqList[i].insure2CollAmt
						,capitalAmt: data.reqList[i].capitalAmt 
						,primeAmt: data.reqList[i].primeAmt	
						,saleAmt: data.reqList[i].saleAmt
						,clAmt: data.reqList[i].clAmt
						,collectAmt: data.reqList[i].collectAmt						
						,chkYN: data.reqList[i].chkYN
						,confYN: data.reqList[i].confYN						
						,clGroupId: data.reqList[i].clGroupId
						,clReqType: data.reqList[i].clReqType
					//	,carType : data.reqList[i].carType 
						,carType: data.reqList[i].makerCode+ " "+data.reqList[i].carType
						,regUserName : data.reqList[i].regUserName
						,branchCode : data.reqList[i].branchCode
						,uptYmd : data.reqList[i].uptYmd
						,chkDate : data.reqList[i].chkDate2
						,expType : data.reqList[i].expType
						,clYm : data.reqList[i].clYm	//230725
						
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


// 청구진행
function reqChk(url,workingType) {
	var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var workingTypeName = "";
	if (workingType == 'CHK') {		workingTypeName = "청구진행";	}
	if (workingType == 'CHK_CANCEL') {		workingTypeName = "진행취소";	}
	
	if (!confirm(workingTypeName+ " 처리 하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var reqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.clReqNo;
		
		if (workingType == 'CHK') { //청구진행
			//진행가능여부체크
			if (isEmpty(rowItem.item.chkYN) == false || isEmpty(rowItem.item.collectYN) == false ){
				alert("이미 청구진행 중인 건은 선택할 수 없습니다.");
				return;		
			}
		}
		if (workingType == 'CHK_CANCEL') { //진행취소	
			//진행취소
			if (isEmpty(rowItem.item.chkYN) == true || rowItem.item.collectYN == 'Y' ){
				alert("기결 상태이거나 청구진행 중이 아닌 건은 선택할 수 없습니다.");
				return;		
			}		
		}
		
				
	}
	
	var data = {};
    //data.workingType = "CHK";
	data.workingType = workingType;
	//sub
	data.reqArr = reqArr;   //요천번호 
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,
			"reqArr" : reqArr   //요천번호 
			,"dataComCode" : dataComCode  //2023.07.20	
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			if (data.result_code == 'OK' || data.result_code == 'DCErr') {  //DCErr Add 2023.07.20 
				location.reload(true);
			}
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}


// 기결 
function clUpProc(url){
	//var custCode = $(':radio[name="custCode"]:checked').val();
	var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
	
	var custCode = $("#popCustCode").val();  
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var workingTypeName = "기결"
	if (!confirm(workingTypeName+ " 처리 하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var reqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.clReqNo;
		
		//기결가능여부체크
	//	console.log("chkYN: "+isEmpty(rowItem.item.chkYN));
	//	console.log("collectYN: "+isEmpty(rowItem.item.collectYN));
		if (isEmpty(rowItem.item.chkYN) == true || isEmpty(rowItem.item.collectYN) == false ){
			alert("기결 상태이거나 청구진행 중이 아닌 건은 선택할 수 없습니다.");
			return;		
		}		
	}

	var data = {};
    data.workingType = "ADD";
    //master
	data.reqArr = reqArr;   //요천번호
	 
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "ADD",
			"reqArr" : reqArr,    //요청번호
			"dataComCode" : dataComCode  //2023.07.20 			
		},
	    success: function(data) {
	        alert(data.result_code+":"+data.result_msg);
	        //창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
		
}

////다이얼로그창 선택하는 경우 그리드에 디스플레이 
//function updateGridRowCust(obj,name) {
//   
//	var i, rowItem, rowInfoObj, dataField;
//	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
//    rowInfoObj = selectedItems[0];
//	rowItem = rowInfoObj.item;
//		
//	//console.log("row1:"+rowItem.itemNo);
//	//$("#consignCustCode").val(rowItem.custCode);
//	//$("#consignCustName").val(rowItem.custName);
//	$(obj).val(rowItem.custCode);
//	$("#"+name+"").val(rowItem.custName);
//	
//	var dialogCust;
//	dialogCust = $( "#dialog-form-cust");			
//	dialogCust.dialog("close");
//	
//}

//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj,name, gridYN) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	
	if (gridYN == 'Y') {	
		item = {
						placeCustCode: rowItem.custCode,
						placeCustName: rowItem.custName,
					};
		  console.log("Selected item:", rowItem);
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.custCode);
			$("#"+name+"").val(rowItem.custName);
	}
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");	
}	
/*
function taxBillAdd(){
	
		
}
*/


function taxBillReg() {

	$.fancybox.open({
		href: '/base/taxBill-up', // 불러 올 주소
		type: 'iframe',
		width: '90%',
		height: '90%',
		padding: 0,
		fitToView: false,
		autoSize: false
		, modal: true
	});
}
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

	//var dialog;
	//dialog = $( "#dialog-form" );	
	//dialog.dialog("close");
}

