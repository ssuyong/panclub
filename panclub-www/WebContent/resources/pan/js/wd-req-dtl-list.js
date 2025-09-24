
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

/*
var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#useDmdYmd',
        format: 'yyyy-MM-dd'
    }
});
    
   
var datepicker2 = new tui.DatePicker('#wrapper2', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#moveSchYmd',
        format: 'yyyy-MM-dd'
    }
});
 */   
    
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
		//console.log("닫기");
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});

	//요청번호가  존재하는 경우 
	let wdReqNo = $("#wdReqNo").text();
	if (wdReqNo !=''){		
		//console.log("storageUseReqNo ::"+ storageUseReqNo);		
		findReq('/biz/wd-req-list');
	}	  
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "reqSeq",      headerText : "요청순번", width : 80, editable : false }
		,{ dataField : "jobNo",      headerText : "적요", width : 100, editable : false } 
		,{ dataField : "orderGroupId",      headerText : "주문그룹ID", width : 100, editable : false }
		//,{ dataField : "orderNo",      headerText : "주문번호", width : 100, editable : false }
		//,{ dataField : "orderSeq",      headerText : "주문순번*", width : 100, editable : false }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 140, editable : false }
		,{ dataField: "makerName",        headerText: "제조사"  , width : 50,editable: false    }
		,{ dataField : "itemNo",      headerText : "품번*", width : 140, editable : false}
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
		,{ dataField : "itemName", 		headerText : "품명", width: 180, editable : false  } 
		//,{ dataField : "itemNameEn", 	headerText : "영문품명", width: 120, editable : false  }
		,{ dataField : "cnt",      headerText : "수량", width : 80, editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right"   }
		,{ dataField : "salePrice",     headerText : "금액", editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right" }
		,{ dataField : "taxPrice",     headerText : "세액", editable : false , dataType: "numeric", formatString: "#,##0"  , style:"right"}
		,{ dataField : "sumPrice",     headerText : "합계", editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right" }
		,{ dataField : "salePrice1",     headerText : "금액", editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right",visible:false }
		,{ dataField : "taxPrice1",     headerText : "세액", editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right",visible:false }
		,{ dataField : "sumPrice1",     headerText : "합계", editable : false, dataType: "numeric", formatString: "#,##0"  , style:"right",visible:false }
		//,{ dataField : "memo1",     headerText : "비고1", editable : false }
		//,{ dataField : "regUserName",     headerText : "작성자" , editable : false}
		//,{ dataField : "uptYmd",     headerText : "수정일자" , editable : false}
	];
	
		// 푸터 설정
	var footerLayout = [{
		labelText: "∑",
		positionField: "#base",
		style: "aui-grid-my-column"
	}, {
		dataField: "cnt",
		positionField: "cnt",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "salePrice1",
		positionField: "salePrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "taxPrice1",
		positionField: "taxPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "sumPrice1",
		positionField: "sumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}
	
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "singleRow",
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
		/*
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		*/
		//footer 노출
		showFooter: true,

		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	AUIGrid.setFooter(myGridID, footerLayout);
	// 푸터 레이아웃 세팅
	//AUIGrid.setFooter(myGridID, footerLayout);
		
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	//AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);

	// 셀 선택변경 이벤트 바인딩
	/*
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
	});
	

	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		console.log("aa");
	});
	*/
	
	// 그리드 ready 이벤트 바인딩
	//AUIGrid.bind(myGridID, "ready", auiGridCompleteHandler);
	
};


		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;




// 마스터 조회
function findReq(url) {
	var wdReqNo = $("#wdReqNo").text();
	//console.log("roReqNo:"+roReqNo);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"wdReqNo":wdReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				//console.log("len:"+data.reqList.length);	
				for(i=0;i<data.reqList.length;i++){
					wdReqYmd = data.reqList[i].wdReqYmd; 
					wdReqNo = data.reqList[i].wdReqNo; 
					wdReqType = data.reqList[i].wdReqType;
					custCode = data.reqList[i].custCode; 
					custName = data.reqList[i].custName;
					itemCnt = data.reqList[i].itemCnt;
					sumCnt = data.reqList[i].sumCnt;
					wdReqAmt =data.reqList[i].wdReqAmt				
						
					//wdReqAmt = addComma(data.reqList[i].wdReqAmt);		
					memo1 = data.reqList[i].memo1; 
					attaFileOri = data.reqList[i].attaFileOri; 
					regUserName = data.reqList[i].regUserName;
					uptUserName = data.reqList[i].uptUserName;
					regYmd = data.reqList[i].regYmd;
					uptYmd = data.reqList[i].uptYmd;
					
					// 240711 yoonsang 여러파일 첨부하고 링크할수있도록
					var url = "";
					//let tagArea = document.getElementById('attaFileOri');
					if (data.reqList[i].attaFileOri != null && data.reqList[i].attaFileOri != '') {
					    var attaList2 = data.reqList[i].attaFile.split(",");
					    
					    if (attaList2.length > 1) {
					        var attaList = data.reqList[i].attaFileOri.split(",");
					        for (var j = 0; j < attaList2.length; j++) {
					            var url = "<a href='"+fileRootUrl + data.reqList[i].comCode + "/wd/" + attaList2[j] + "'>" + attaList[j] + "</a><br/>"; 
					            $("#attaFileOri").append(url);
					        }
					    } else {
					        var url = "<a href='"+fileRootUrl + data.reqList[i].comCode + "/wd/" + attaList2[0] + "'>" + data.reqList[i].attaFileOri + "</a><br/>";
					        $("#attaFileOri").append(url);
					    }
					}
					
						
					$("#wdReqYmd").text(wdReqYmd);
					$("#wdReqNo").text(wdReqNo); 
					$("#wdReqType").text(wdReqType); 
					$("#custCode").text(custCode); 
					$("#custName").text(custName);
					$("#itemCnt").text(itemCnt); 
					$("#sumCnt").text(sumCnt);
					//$("#wdReqAmt").text(wdReqAmt);
					$("#wdReqAmt").text(wdReqAmt.toLocaleString());
					//$("#wdReqAmt").text(wdReqAmt.toLocaleString());
					$("#memo1").text(memo1);
					//$("#attaFileOri").text(attaFileOri);		//240711 yoonsang
					$("#regUserName").text(regUserName);
					$("#uptUserName").text(uptUserName);
					$("#regYmd").text(regYmd);
					$("#uptYmd").text(uptYmd);					
				}		
				findReqDtl('/biz/wd-req-dtl-list');				
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





//요청 품목 조회
function findReqDtl(url) {
	var list = [];
	var wdReqNo = $("#wdReqNo").text();
	//console.log("aa:"+storageUseReqNo);
	
	//var ordArr  = $("#ordArr").val();
	//var seqArr  = $("#seqArr").val();
   // console.log("a:"+ordArr);
   // console.log("a:"+seqArr);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"wdReqNo":wdReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.reqDtlList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{					
				for(i=0;i<data.reqDtlList.length;i++){
				
				    list.push({						  
						reqSeq: data.reqDtlList[i].reqSeq  
						,jobNo: data.reqDtlList[i].jobNo
						,orderGroupId: data.reqDtlList[i].orderGroupId
						,orderNo: data.reqDtlList[i].orderNo  
						,orderSeq: data.reqDtlList[i].orderSeq 
						,itemId: data.reqDtlList[i].itemId 
						,itemNo: data.reqDtlList[i].itemNo 
						,itemName: data.reqDtlList[i].itemName
						,itemNameEn: data.reqDtlList[i].itemNameEn 
						,cnt: data.reqDtlList[i].cnt 
						,salePrice: _cf_comma(data.reqDtlList[i].sumPrice.toFixed(0)) 
						//,taxPrice: _cf_comma((data.reqDtlList[i].sumPrice/10).toFixed(0)) 	//240805 yoonsang 운송비에 세액안붙기위함 
						//,sumPrice: _cf_comma((data.reqDtlList[i].sumPrice+(data.reqDtlList[i].sumPrice/10)).toFixed(0))
						,taxPrice: _cf_comma(data.reqDtlList[i].taxPrice.toFixed(0)) 
						,sumPrice: _cf_comma(data.reqDtlList[i].sumPriceTax.toFixed(0))
						,memo1: data.reqDtlList[i].memo1 						
						,regUserName: data.reqDtlList[i].userName
						,uptYmd: data.reqDtlList[i].uptYmd
						,salePrice1: data.reqDtlList[i].sumPrice
						//,taxPrice1: data.reqDtlList[i].sumPrice/10
						//,sumPrice1: data.reqDtlList[i].sumPrice*1.1
						,taxPrice1: data.reqDtlList[i].taxPrice			//240805 yoonsang 운송비에 세액안붙기위함 
						,sumPrice1: data.reqDtlList[i].sumPriceTax
						,className: data.reqDtlList[i].className
						,makerName: data.reqDtlList[i].makerName
						,factoryNo: data.reqDtlList[i].factoryNo
						
					});					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
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
		

