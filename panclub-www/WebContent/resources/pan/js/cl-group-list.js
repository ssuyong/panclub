

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
	
	
	//set branch 2023.06.30
  	branchCodeSelect("/base/code-list")		 
  	
//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
if (document.location.hash) {
  var HashLocationName = document.location.hash;
  HashLocationName = decodeURI(HashLocationName.replace('#info', '')); // 한글깨짐 처리
  var info = HashLocationName.split("!");

  var page = info[0];
  var sYmd = info[1];
  var eYmd = info[2];
  var clGroupId = info[3];
  var carNo = info[4];
  var custCode = info[5];
  var insure1Code = info[6];
  var insure1ＭgrName = info[7];
  var clType = info[8];
  var orderGroupId = info[9];
  var regUserName = info[10];
  var confYN = info[11];
  var procStep = info[12];
  var insureAcceptNo = info[13];
  var branchCode = info[14];
  var ymdIgnoreYN = info[15];
  var billPubli = info[16]; //세금계산서 발행여부 
  var expType = info[17]; //증빙유형 

  if (ymdIgnoreYN === "Y") {
    $('#ymdIgnoreYN').prop('checked', true);
  } else {
    $('#ymdIgnoreYN').prop('checked', false);
  }

  // 필요한 변수들을 설정하고 값들을 화면에 반영
  $("#clGroupId").val(clGroupId);
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
  $("#procStep").val(procStep);
  $("#insureAcceptNo").val(insureAcceptNo);
  $("#branchCode").val(branchCode);
  $("#billPubli").val(billPubli);
  $("#expType").val(expType);

  findDataToServer("/order/cl-group-list", page);
}

$("#btnFind").click(function () {
  // 새로고침하면 이전값 지우기 위해 추가
  var currentPage = 1;
  var sYmd = $("#startpicker-input").val();
  var eYmd = $("#endpicker-input").val();
  var clGroupId_val = $("#clGroupId").val();
  var custCode_val = $("#custCode").val();
  var insure1Code_val = $("#insure1Code").val();
  var insure1ＭgrName_val = $("#insure1ＭgrName").val();
  var clType_val = $("#clType").val();
  var orderGroupId_val = $("#orderGroupId").val();
  var regUserName_val = $("#regUserName").val();
  var confYN_val = $(':radio[name="confYN"]:checked').val();
  var carNo_val = $("#carNo").val();
  var procStep_val = $("#procStep").val();
  var insureAcceptNo_val = $("#insureAcceptNo").val();
  var branchCode_val = $("#branchCode").val();
  var ymdIgnoreYN_val = ($('#ymdIgnoreYN').is(':checked') ? "Y" : "N");
  var billPubli_val = $("#billPubli").val();
  var expType_val = $("#expType").val();

  // 필요한 변수들을 설정하고 URL 해시를 업데이트
  document.location.hash = '#info' + currentPage + "!" + sYmd + "!" + eYmd + "!" + clGroupId_val + "!"
    + carNo_val + "!" + custCode_val + "!" + insure1Code_val + "!" + insure1ＭgrName_val + "!" + clType_val
    + "!" + orderGroupId_val + "!" + regUserName_val + "!" + confYN_val + "!" + procStep_val
    + "!" + insureAcceptNo_val + "!" + branchCode_val + "!" + ymdIgnoreYN_val+ "!" + billPubli_val+ "!" + expType_val;

  findDataToServer("/order/cl-group-list", 1);
});
	if ( $("#orderGroupId").val() != '' ) { //2023.08.04. 주문품목에서 클릭 시		
		$('#ymdIgnoreYN').prop('checked', true);  //기간전체조회
		$("input:radio[name='chk']:radio[value='전체']").prop('checked', true); 
		
		findDataToServer("/order/cl-group-list", 1);
	}
	
});

// 칼럼 레이아웃 작성
var columnLayout = [ 
	{  headerText : "기본정보", 
		children: [
			{ dataField: "regYmd",        headerText: "생성일" },
			{ dataField: "uptYmd",        headerText: "요청일", visible : false },
			{ dataField: "chkDate",        headerText: "청구일" },
			//{ dataField: "clYm",        headerText: "월청구" },
			{ dataField: "clRlYmd",        headerText: "출고일" , width: 150},
			
        	{ dataField: "clGroupId",      headerText: "청구그룹ID" ,      width: 100     
        	 		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
        	{ dataField: "custName",      headerText: "주문처",    width: 160 , style : "left" },
        	{ dataField: "custCode2",      headerText: "주문처코드" , visible : false },
        	{ dataField: "carNo",         headerText: "차번",      width: 80       },
        	{ dataField: "makerCode",         headerText: "차종",      width: 100       },
        	{ dataField: "regUserName",         headerText: "담당자",      width: 60       },
        	
        ]
    },    
    {  headerText : "청구처리구분", 
		children: [
			{ dataField: "clType",        headerText: "청구구분"},
			{ dataField: "clReqType",        headerText: "요청구분"},
        	{ dataField: "procStep",         headerText: "상태",      width: 80       },
        	{ dataField: "confYN",         headerText: "기결유무",      width: 80       },
        	{ dataField: "expType",        headerText: "증빙유형"  , width : 80            },
        	{ dataField: "billPubli",      headerText: "발행" , width : 56  },
        	{ dataField: "taxBillRegDate",      headerText: "발행일" }
        ]
    },
    {  headerText : "금액확인", 
		children: [
			//{ dataField: "primeAmt",        headerText: "원가"   , dataType: "numeric",formatString: "#,##0"  , style:"right"             },
        	{ dataField: "saleAmt",        headerText: "판매가",      width: 120 , dataType: "numeric",formatString: "#,##0"  , style:"right"        },
        	{ dataField: "clAmt",        headerText: "청구금액",      width: 120    , dataType: "numeric",formatString: "#,##0"  , style:"right"     },
        	{ dataField: "collectAmt",        headerText: "수금액",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        	{ dataField: "collectRate",        headerText: "수금률",      width: 120   , dataType: "numeric",formatString: "#"  , style:"right"      },
        ]
    },
    {  headerText : "보험사1", 
		children: [
			{ dataField: "insure1Name",        headerText: "보험사"            },
			{ dataField: "insure1Code",        headerText: "보험사코드"   , visible : false        },
        	{ dataField: "insure1ＭgrName",         headerText: "보험담당자"},
        	{ dataField: "insure1AcceptNo",         headerText: "접수번호",      width: 120       },
        	{ dataField: "insure1AcciRate",      headerText: "과실", style : "right" , dataType: "numeric",formatString: "#,##0" },
        	{ dataField: "insure1ClAmt",      headerText: "청구금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"   },
        	{ dataField: "insure1CollAmt",      headerText: "수금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"   },
        	{ dataField: "insure1Rate",      headerText: "수금률" , dataType: "numeric",formatString: "#%"  , style:"right"   }
        	//{ dataField: "insure1bill",      headerText: "증빙"},
        ]
    },
    {  headerText : "보험사2", 
		children: [
			{ dataField: "insure2Name",        headerText: "보험사"              },
			{ dataField: "insure2Code",        headerText: "보험사2코드" , visible : false        },
        	{ dataField: "insure2ＭgrName",         headerText: "보험담당자"},
        	{ dataField: "insure2AcceptNo",         headerText: "접수번호",      width: 120       },
        	{ dataField: "insure2AcciRate",      headerText: "과실" , style : "right" , dataType: "numeric",formatString: "#,##0"},
        	{ dataField: "insure2ClAmt",      headerText: "청구금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"  },
        	{ dataField: "insure2CollAmt",      headerText: "수금액" , dataType: "numeric",formatString: "#,##0"  , style:"right"  },
        	{ dataField: "insure2Rate",      headerText: "수금률" , dataType: "numeric",formatString: "#"  , style:"right"   }
        	//{ dataField: "insure2bill",      headerText: "증빙"},
        ]
    },
    {  headerText : "기타금액",
    	children: [
			{ dataField: "capitalAmt",        headerText: "수금액",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        	]
        }, 
        	{ dataField: "orderGroupId",      headerText: "주문그룹ID" ,    width: 100 
        		, styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}},
        	{ dataField : "branchCode",   headerText : "관리지점" , width: 80},//2023.06.30 bk
    /*
    {  headerText : "수금", 
		children: [
			{ dataField: "insure1CollAmt",        headerText: "보험사1수금"   , dataType: "numeric",formatString: "#,##0"  , style:"right"             },
        	{ dataField: "insure2CollAmt",        headerText: "보험사2수금",      width: 120  , dataType: "numeric",formatString: "#,##0"  , style:"right"       },
        	{ dataField: "capitalAmt",        headerText: "기타",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        ]
    },*/
    /*
    {  headerText : "기타비용", 
		children: [
			{ dataField: "riAmt",        headerText: "반입"    , dataType: "numeric",formatString: "#,##0"  , style:"right"            },
        	{ dataField: "extraAmt",        headerText: "부대비용",      width: 120   , dataType: "numeric",formatString: "#,##0"  , style:"right"      },
        ]
    }
    */
];
 
 var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "insure1ClAmt",		positionField: "insure1ClAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "insure2ClAmt",		positionField: "insure2ClAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "insure1CollAmt",		positionField: "insure1CollAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "insure2CollAmt",		positionField: "insure2CollAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "capitalAmt",		positionField: "capitalAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "primeAmt",		positionField: "primeAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "saleAmt",		positionField: "saleAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "clAmt",		positionField: "clAmt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "collectAmt",		positionField: "collectAmt",		operation: "SUM",		formatString: "#,##0"	}, 
	
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
			showRowAllCheckBox: true,
			
			showFooter: true,
			showAutoNoDataMessage : false, 
		

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
	AUIGrid.setFooter(myGridID, footerLayout);
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		/*
		var clGroupId = event.item.clGroupId;
		//console.log("storageUseReqNo:"+storageUseReqNo);  
		if (event.columnIndex == 3) {   
		//	window.open('/order/cl-req-item-list?clGroupId='+clGroupId, '_blank');
		window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId ;
//			$.fancybox.open({
//			  href : '/order/cl-req-item-list?clGroupId='+clGroupId    , // 불러 올 주소
//			  type : 'iframe',
//			  width : '90%',
//			  height : '90%',
//			  padding :0,
//			  fitToView: false,
//			  autoSize : false,
//			  modal :true
//			});
		}
		*/
		var clGroupId = event.item.clGroupId;
		if (event.dataField == 'clGroupId') {
			//window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId;
			var clGroupId = event.item.clGroupId;
			var url = '/order/cl-req-item-list?clGroupId=' + clGroupId
			var newWindow = window.open(url, '_blank');
			 newWindow.focus();
			}	
		var orderGroupId = event.item.orderGroupId;
		if (event.dataField == 'orderGroupId') {
			//window.location.href = '/order/cl-req-item-list?clGroupId=' + clGroupId;
			var orderGroupId = event.item.orderGroupId;
			var url = '/order/order-group-item-list?orderGroupId=' + orderGroupId
			var newWindow = window.open(url, '_blank');
			 newWindow.focus();
			}	
	});
		
}


function findDataToServer(url,page) {
	var list = [];
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var clGroupId  = $("#clGroupId").val().replace(/\s/g, '') ; 
	var carNo = $("#carNo").val().replace(/\s/g, ''); 
	var custCode = $("#custCode").val(); 
	var insure1Code = $("#insure1Code").val(); 
	var insure1ＭgrName = $("#insure1ＭgrName").val().replace(/\s/g, ''); 
	var clType = $("#clType").val(); 
	var orderGroupId = $("#orderGroupId").val().replace(/\s/g, ''); 
	var regUserName = $("#regUserName").val().replace(/\s/g, ''); 
	//var confYN = $("#confYN").val(); 
	var confYN = $(':radio[name="confYN"]:checked').val();
	var procStep = $("#procStep").val(); 
	
	var insureAcceptNo = $("#insureAcceptNo").val(); //접수번호
	var branchCode = $("#branchCode").val(); // 2023.06.30 bk 
	/*
	if ((!clGroupId || clGroupId.trim() == '' ) || (!carNo || carNo.trim() == '')
		|| (!custCode || custCode.trim() == '') || (!insure1Code || insure1Code.trim() == '')
		|| (!insure1ＭgrName || insure1ＭgrName.trim() == '') || (!clType || clType.trim() == '')
		|| (!orderGroupId || orderGroupId.trim() == '') || (!regUserName || regUserName.trim() == '') || (!insureAcceptNo || insureAcceptNo.trim() == '')
		|| (!procStep || procStep.trim() == '')|| (!branchCode || branchCode.trim() == '') ){
			ymdIgnoreYN = "Y";
		}
	*/
	
	if ($('#ymdIgnoreYN').is(':checked') == true){
		if ((!clGroupId || clGroupId.trim() == '' ) && (!carNo || carNo.trim() == '')
			&& (!custCode || custCode.trim() == '') && (!insure1Code || insure1Code.trim() == '')
		   	&& (!insure1ＭgrName || insure1ＭgrName.trim() == '') && (!clType || clType.trim() == '')
		   	&& (!orderGroupId || orderGroupId.trim() == '') && (!regUserName || regUserName.trim() == '') && (!insureAcceptNo || insureAcceptNo.trim() == '')
		   	&& (!procStep || procStep.trim() == '')&& (!branchCode || branchCode.trim() == '') ) {
		   //   alert("조회 조건을 하나 이상 입력해주세요.");
		  $("#iDiv_noSrchPop").text("ⓘ 부품ID 또는 품번을 입력하고 조회하세요");
	      $("#iDiv_noSrchPop").css("display","block");
		      return false;
		}
	}
	
	var clDateType = $("#clDateType").val(); //2023.07.10 기준일자
	var billPubli = $("#billPubli").val(); //2023.07.25 세금계산서 발행여부 

	var expType = $("#expType").val();
	
	//console.log ("ymdIgnoreYN"+ymdIgnoreYN);    
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"carNo":carNo,
			"custCode":custCode,
			"insure1Code":insure1Code,
			"insure1ＭgrName":insure1ＭgrName,
			"clType":clType,
			"orderGroupId":orderGroupId,
			"regUserName":regUserName,
			"confYN":confYN,
			"clGroupId":clGroupId,
			"procStep" : procStep,
			"insureAcceptNo" : insureAcceptNo,
			"branchCode":branchCode, // 2023.06.30 bk 
			"clDateType":clDateType ,
			"billPubli":billPubli ,
			"expType":expType 
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.clGroupList.length == 0){
			//	alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				$("#iDiv_noDataPop").css("display","block");							
			}else{
				//	console.log ("insure1CollAmt" +  data.clGroupList[i].insure1CollAmt )
				for(i=0;i<data.clGroupList.length;i++){
					var insure2ClAmt  = data.clGroupList[i].insure2ClAmt;
					var insure1ClAmt  = data.clGroupList[i].insure1ClAmt;
					var clAmt  = data.clGroupList[i].clAmt;
					
					var insure2CollAmt = data.clGroupList[i].insure2CollAmt;
					var insure1CollAmt = data.clGroupList[i].insure1CollAmt;
					var collectAmt = data.clGroupList[i].collectAmt;
					
					var insure2Rate;
					var insure1Rate;
					var collectRate;			
					if(insure2ClAmt ==0 ){
							insure2Rate = 0;
					}else if (insure2CollAmt ==0){
							insure2Rate = 0;
					}else{
						 insure2Rate = (insure2CollAmt / insure2ClAmt*100).toFixed(2);
					}
					
						
					if(insure1ClAmt ==0 ){
							insure1Rate = 0;
					}else if (insure1CollAmt ==0){
							insure1Rate = 0;
					}else{
						 insure1Rate = (insure1CollAmt / insure1ClAmt*100).toFixed(2);
					}
					
						if(clAmt ==0 ){
							collectRate = 0;
					}else if (collectAmt ==0){
							collectRate = 0;
					}else{
						 collectRate = (collectAmt / clAmt*100).toFixed(2);
					}
					
					$("#dataComCode").val(data.clGroupList[i].comCode);  //2023.07.14 by dataCheck
					
					
					list.push({
						 regYmd: data.clGroupList[i].regYmd 
						,carNo: data.clGroupList[i].carNo 
						,clGroupId: data.clGroupList[i].clGroupId 
						,orderGroupId: data.clGroupList[i].orderGroupId
						,clReqYmd : data.clGroupList[i].clReqYmd
						,custName: data.clGroupList[i].custName
						,clType: data.clGroupList[i].clType 
						,procStep: data.clGroupList[i].procStep 
						,billPubli: data.clGroupList[i].billPubli
						,insure1Name: data.clGroupList[i].insure1Name 
						,insure1Code: data.clGroupList[i].insure1Code 
						,insure1AcceptNo: data.clGroupList[i].insure1AcceptNo 
						,insure1AcciRate: Math.round(data.clGroupList[i].insure1AcciRate)  +"%"
						,insure1MgrName : data.clGroupList[i].insure1MgrName
						,insure1ClAmt : data.clGroupList[i].insure1ClAmt
						
						
						,insure2Name: data.clGroupList[i].insure2Name 
						,insure2Code: data.clGroupList[i].insure2Code 
						,insure2AcceptNo: data.clGroupList[i].insure2AcceptNo  
						,insure2AcciRate: Math.round(data.clGroupList[i].insure2AcciRate)+"%"
						,insure2MgrName : data.clGroupList[i].insure2MgrName
						,insure2ClAmt : data.clGroupList[i].insure2ClAmt
						
						,insure1CollAmt: data.clGroupList[i].insure1CollAmt 
						,insure2CollAmt: data.clGroupList[i].insure2CollAmt
						,capitalAmt: data.clGroupList[i].capitalAmt 
						,primeAmt: data.clGroupList[i].primeAmt						
						,saleAmt: data.clGroupList[i].saleAmt +data.clGroupList[i].taxAmt
						,clAmt: data.clGroupList[i].clAmt
						,collectAmt: data.clGroupList[i].collectAmt
						,riAmt: data.clGroupList[i].riAmt
						,extraAmt: data.clGroupList[i].extraAmt				
						,makerCode:data.clGroupList[i].makerCode+ " "+data.clGroupList[i].carType		
						,confYN: data.clGroupList[i].confYN 
						
						,custCode2: data.clGroupList[i].custCode 
						,branchCode: data.clGroupList[i].branchCode 
						
						,insure2Rate: insure2Rate + '%'
						,insure1Rate: insure1Rate + '%'
						,collectRate: collectRate + '%'
						,branchCode: data.clGroupList[i].branchCode 			
						
						,uptYmd : data.clGroupList[i].uptYmd
						,chkDate : data.clGroupList[i].chkDate2			
						,expType : data.clGroupList[i].expType			
						//,clYm : data.clGroupList[i].clYm			
						,clRlYmd : data.clGroupList[i].clRlYmd		//230802	
						,clReqType : data.clGroupList[i].clReqType		//230808	
						
						,insure1ＭgrName : data.clGroupList[i].insure1ＭgrName		//230822	
						,insure2ＭgrName : data.clGroupList[i].insure2ＭgrName		//230822	
						,regUserName : data.clGroupList[i].regUserName		//231012	
						
						,taxBillRegDate : data.clGroupList[i].taxBillRegDate		//231012	
					});
									
				   
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
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
function whUpProc(url){
	//var custCode = $(':radio[name="custCode"]:checked').val();
	var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
		
	var clGroupId = $("#clGroupId").val();  
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var reqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		reqArr = reqArr + "^" +rowItem.item.clGroupId;
	}

	var data = {};
    data.workingType = "ADD";
    //master
	data.reqArr = reqArr;   //요청번호
	 
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "CONF_CHK",
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

// 기결취소 
function clUpProc(url){
	//var custCode = $(':radio[name="custCode"]:checked').val();
	var dataComCode = $("#dataComCode").val();
    if ( dataComCode == '' || dataComCode == undefined){
		alert("유효한 데이터가 아닙니다. 재로그하세요.")
		location.reload();
		return;
	}
		
	var clGroupId = $("#clGroupId").val();  
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
		reqArr = reqArr + "^" +rowItem.item.clGroupId;
	}

	var data = {};
    data.workingType = "CANCEL";
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
			"workingType" : "CANCEL",
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
		 // console.log("Selected item:", rowItem);
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.custCode);
			$("#"+name+"").val(rowItem.custName);
	}
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");	
}

function taxBillReg() {
	
	var clgArr = ""
	var err1 = 0;
	var err2 = 0;
	var err3 = 0;
	var saveCustCode = "";
	var clAmt = 0;
	var j = 0;
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		 alert("품목을 선택하세요!");
		return;
	}
	/* 여러세금계산서 등록하기위해 주석처리
	if (checkedItems.length > 1) {
		alert("품목을 하나만 선택하세요!");
		return;
	}
	*/
	//console.log("billPubli"+(checkedItems[0].item.billPubli))
	//return;
	//기요청된건 체크		
	//if (checkedItems[0].item.billPubli == 'Y') { err1 = 'Y'; }
	//if (err1 == 'Y') { alert("이미 발행된 건은 재발행이 불가합니다."); return; }
	//if (checkedItems[0].item.clReqType == '청구대기') {
		//alert("청구대기건은 세금계산서 발행이 불가합니다."); return;  } //23.08.08 
	/*	
	var clGroupId = checkedItems[0].item.clGroupId;		
	var clType = checkedItems[0].item.clType;		
	var insure1Code = checkedItems[0].item.insure1Code;		
	var insure2Code = checkedItems[0].item.insure2Code;		
	var insure1CollAmt = checkedItems[0].item.insure1CollAmt;		
	var insure2CollAmt = checkedItems[0].item.insure2CollAmt;		
	var clAmt = checkedItems[0].item.clAmt;
	var custCode2 = checkedItems[0].item.custCode2;
	var expType = checkedItems[0].item.expType;
	*/
	
	
	for (var i =0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		clgArr = clgArr + "%5E" + rowItem.item.clGroupId
		saveCustCode = checkedItems[0].item.custCode2
		
		if (rowItem.item.billPubli == 'Y') {  
			alert("이미 발행된 건은 재발행이 불가합니다.");
		 	return;
		}
		
		if (rowItem.item.billPubli == 'Y') {  
			alert("이미 발행된 건은 재발행이 불가합니다.");
		 	return;
		}
		if (rowItem.item.clReqType == '청구대기') {
			alert("청구대기건은 세금계산서 발행이 불가합니다."); 
			return;  
		}
		if (rowItem.item.clType == '일반' || rowItem.item.clType == '일반(전환)') {
			err1 = err1+1
		}
		if (rowItem.item.expType == '세금계산서') {
			err2 = err2+1
		}
		if (rowItem.item.custCode2 != saveCustCode) {
			alert("같은거래처만 여러건을 등록할 수 있습니다."); 
			return; 
		}
		
		var clGroupId = rowItem.item.clGroupId;		
		var clType = rowItem.item.clType;		
		var insure1Code = rowItem.item.insure1Code;		
		var insure2Code = rowItem.item.insure2Code;		
		var insure1CollAmt = rowItem.item.insure1CollAmt;		
		var insure2CollAmt = rowItem.item.insure2CollAmt;		
		clAmt = clAmt+ rowItem.item.clAmt;
		var custCode2 = rowItem.item.custCode2;
		var expType = rowItem.item.expType;
		j=i;
	}
	if(j>0 && err1 != j+1){
		console.log("j : " +j)
		console.log("err1 : " +err1)
		alert("일반건만 여러건을 세금계산서 등록할 수 있습니다."); 
		return;
	}
	if (j>0 && err2 != j+1) {
		alert("증빙유형이 세금계산서만 여러건을 등록할 수  있습니다."); 
		return;
	}	
	
	console.log("확인용: " + clGroupId  + clType 
	+ insure1CollAmt +insure2CollAmt + clAmt +insure1Code,insure2Code +custCode2 + expType + clgArr )
	
	
	$.fancybox.open({
		href: '/base/taxBill-up?clGroupId=' + clGroupId + '&clType=' + clType + '&insure1CollAmt=' + insure1CollAmt
				+ '&insure2CollAmt=' + insure2CollAmt + '&clAmt=' + clAmt + '&insure1Code=' + insure1Code + '&insure2Code=' + insure2Code + '&custCode2=' + custCode2
				+ '&expType=' + expType + '&clgArr=' + clgArr,
		type: 'iframe',
		width: '60%',
		height: '80%',
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
