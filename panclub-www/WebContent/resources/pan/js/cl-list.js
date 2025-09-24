

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
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var clNo = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        
        if ( typeof clNo == 'undefined'){ clNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
	
        $("#clNo").val(clNo);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
        findDataToServer("/order/cl-list",page);
  	}
  	
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var clNo_val = $("#clNo").val(); 
				
		document.location.hash = '#info'+currentPage+"!"+clNo_val+"!"+sYmd+"!"+eYmd;
		
		findDataToServer("/order/cl-list", 1);
	});
	
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	{  headerText : "기본정보", 
		children: [
			{ dataField: "regYmd",        headerText: "청구일"              },
        	{ dataField: "carNo",         headerText: "차번",      width: 80       },
        	{ dataField: "clNo",      headerText: "청구번호" ,      width: 100     
        	 		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
        	{ dataField: "orderGroupId",      headerText: "주문그룹ID" ,    width: 100 },
        	{ dataField: "custName",      headerText: "주문처",    width: 120 , style : "left" },
        ]
    },    
    {  headerText : "청구처리구분", 
		children: [
			{ dataField: "clType",        headerText: "청구구분"              },
        	{ dataField: "procStep",         headerText: "현재상태",      width: 120       },
        	{ dataField: "billPubli",      headerText: "발행" }
        ]
    },
    {  headerText : "보험사1", 
		children: [
			{ dataField: "insure1Name",        headerText: "보험사"              },
        	{ dataField: "insure1AcceptNo",         headerText: "접수번호",      width: 120       },
        	{ dataField: "insure1AcciRate",      headerText: "과실", style : "right" }
        ]
    },
    {  headerText : "보험사2", 
		children: [
			{ dataField: "insure2Name",        headerText: "보험사"              },
        	{ dataField: "insure2AcceptNo",         headerText: "접수번호",      width: 120       },
        	{ dataField: "insure2AcciRate",      headerText: "과실" , style : "right"}
        ]
    },
    {  headerText : "수금", 
		children: [
			{ dataField: "insure1CollAmt",        headerText: "보험사1수금"   , dataType: "numeric",formatString: "#,##0"  , style:"right"             },
        	{ dataField: "insure2CollAmt",        headerText: "보험사2수금",      width: 120  , dataType: "numeric",formatString: "#,##0"  , style:"right"       },
        	{ dataField: "capitalAmt",        headerText: "캐피탈",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        ]
    },
    {  headerText : "금액확인", 
		children: [
			{ dataField: "primeAmt",        headerText: "원가"   , dataType: "numeric",formatString: "#,##0"  , style:"right"             },
        	{ dataField: "saleAmt",        headerText: "판매가",      width: 120 , dataType: "numeric",formatString: "#,##0"  , style:"right"        },
        	{ dataField: "clAmt",        headerText: "청구금액",      width: 120    , dataType: "numeric",formatString: "#,##0"  , style:"right"     },
        	{ dataField: "collectAmt",        headerText: "수금액",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        ]
    },
    {  headerText : "기타비용", 
		children: [
			{ dataField: "riAmt",        headerText: "반입"    , dataType: "numeric",formatString: "#,##0"  , style:"right"            },
        	{ dataField: "extraAmt",        headerText: "부대비용",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        ]
    }
    
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

		var clNo = event.item.clNo;
		//console.log("storageUseReqNo:"+storageUseReqNo);  
		if (event.columnIndex == 2) {   
			$.fancybox.open({
			  href : '/order/cl-item-list?clNo='+clNo    , // 불러 올 주소
			  type : 'iframe',
			  width : '90%',
			  height : '90%',
			  padding :0,
			  fitToView: false,
			  autoSize : false,
			  modal :true
			});
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

	var clNo = $("#clNo").val(); 
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"clNo":clNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.clList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.clList.length;i++){
					list.push({
						 regYmd: data.clList[i].regYmd 
						,carNo: data.clList[i].carNo 
						,clNo: data.clList[i].clNo 
						,orderGroupId: data.clList[i].orderGroupId
						//,supCustName: data.clList[i].supCustName 
						,custName: data.clList[i].custName
						,clType: data.clList[i].clType 
						//,procStep: data.clList[i].procStep 
						,billPubli: data.clList[i].billPubli
						,insure1Name: data.clList[i].insure1Name 
						,insure1AcceptNo: data.clList[i].insure1AcceptNo 
						,insure1AcciRate: data.clList[i].insure1AcciRate
						,insure2Name: data.clList[i].insure2Name 
						,insure2AcceptNo: data.clList[i].insure2AcceptNo 
						,insure2AcciRate: data.clList[i].insure2AcciRate
						,insure1CollAmt: data.clList[i].insure1CollAmt 
						,insure2CollAmt: data.clList[i].insure2CollAmt
						,capitalAmt: data.clList[i].capitalAmt 
						,primeAmt: data.clList[i].primeAmt						
						,saleAmt: data.clList[i].saleAmt
						,clAmt: data.clList[i].clAmt
						,collectAmt: data.clList[i].collectAmt
						,riAmt: data.clList[i].riAmt
						,extraAmt: data.clList[i].extraAmt						
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
function reqChk(url) {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var rowItem;
	var reqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.placeReqNo;
	}
	
	var data = {};
    data.workingType = "CHK";
	
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
			"workingType" : "CHK",
			"reqArr" : reqArr   //요천번호 
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


// 기결 
// 팝업에서 입고완료
function whUpProc(url){
	//var custCode = $(':radio[name="custCode"]:checked').val();
	var custCode = $("#popCustCode").val();  
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var reqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.placeReqNo;
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

// 기결취소 
function clUpProc(url){
	//var custCode = $(':radio[name="custCode"]:checked').val();
	var custCode = $("#popCustCode").val();  
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var workingTypeName = "기결취소 "
	if (!confirm(workingTypeName+ " 처리 하시겠습니까?")){
		return;
	}
	
	var rowItem;
	var reqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.clNo;
	}

	var data = {};
    data.workingType = "DEL";
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
			"workingType" : "DEL",
			"reqArr" : reqArr,    //요청번호
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



