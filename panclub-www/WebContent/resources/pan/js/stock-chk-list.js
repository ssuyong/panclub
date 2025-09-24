
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
        var stockYm = info[1];
        var itmeNo = info[2];
        var itemName = info[3];
        var storCode = info[4];
        
        //console.log("HashLocationName:"+HashLocationName);
        $("#stockYm").val(stockYm);
		$("#itmeNo").val(itmeNo);
		$("#itemName").val(itemName);
		$("#storCode").val(storCode);
		
        findDataToServer("/logis/stock-chk-list",page);
  	}
  	
  	//제조사코드에 셋팅
  	//findSrchCode("/base/code-list")
  	/*
    $('#makerCode').chosen({
		  no_results_text: "검색 결과가 없습니다"
		  , width: "200px"
	});
	*/

	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var rackCode_val = $("#rackCode").val();
		var itmeNo_val = $("#itmeNo").val();
		var itemName_val = $("#itemName").val();
		var storCode_val = $("#storCode").val();
		
		document.location.hash = '#info'+currentPage+"!"+rackCode_val+"!"+itmeNo_val+"!"+itemName_val+"!"+storCode_val;
		
		findDataToServer("/logis/stock-chk-list", 1);
	});
	
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField : "itemId",    headerText : "부품ID", width : 140} 
	,{ dataField : "itemCode",   headerText : "상품코드", width: 120} 
	,{ dataField : "itemNo",     headerText : "품번", width : 120     }
	,{ dataField : "factoryNo",     headerText : "공장품번", width : 120  }
	,{ dataField : "itemName",   headerText : "상품명" }
	,{ dataField : "itemNameEn",   headerText : "영문상품명"  }
	,{ dataField : "makerCode",   headerText : "제조사코드" }
	,{ dataField : "makerName",      headerText : "제조사명"    }
	,{ dataField : "storCode",    headerText : "창고코드", width : 140} 
	,{ dataField : "storName",    headerText : "창고명", width : 140} 
	,{ dataField : "rackCode",    headerText : "랙코드", width : 140} 
	,{ dataField : "rackName",    headerText : "랙명", width : 140} 
	
	,{ dataField : "stockQty",      headerText : "재고수량"}
	,{ dataField : "chkQty",      headerText : "실사수량"}
	,{ dataField : "gapQty",      headerText : "차이"}
	,{ dataField : "uptUserId",      headerText : "실사등록자"}
	,{ dataField : "modified",      headerText : "실사등록일"}
			
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
			
			editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
		showRowCheckColumn: false,

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
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
}


function findDataToServer(url,page) {
	var list = [];
	var sYmd = $("#sYmd").val();
	var eYmd = $("#eYmd").val();
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var rackCode = $("#rackCode").val();
	var itemNo = $("#itemNo").val();
	var itemName = $("#itemName").val();
	var storCode = $("#storCode").val();
	
	if (spaceDel(itemNo)=='' && spaceDel(itemName)=='' && spaceDel(rackCode)=='' && spaceDel(storCode)=='') {
		alert("검색어를 입력하세요.");
		return false;
	}

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"storCode":storCode,
			"itemNo":itemNo,
			"itemName":itemName,
			"rackCode":rackCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.stockChkList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.stockChkList.length;i++){
					list.push({
						 itemId: data.stockChkList[i].itemId 
						,itemId: data.stockChkList[i].itemId 
						,itemCode: data.stockChkList[i].itemCode 
						,itemNo: data.stockChkList[i].itemNo 
						,factoryNo: data.stockChkList[i].factoryNo
						,itemName: data.stockChkList[i].itemName 
						,itemNameEn: data.stockChkList[i].itemNameEn 
						,makerCode: data.stockChkList[i].makerCode 
						,makerName: data.stockChkList[i].makerName 
						,storCode: data.stockChkList[i].storCode 
						,storName: data.stockChkList[i].storName 						
						,rackCode: data.stockChkList[i].rackCode 
						,rackName: data.stockChkList[i].rackName 
						,stockQty: data.stockChkList[i].stockQty 
						,chkQty: data.stockChkList[i].chkQty 
						,gapQty: data.stockChkList[i].gapQty 						
						,uptUserId: data.stockChkList[i].uptUserId 
						,modified: data.stockChkList[i].modified						
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


// 데이터 요청 Ajax
function findSrchCode(url) {
	var list = [];
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			mCode : "1000"
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.codeList.length == 0){
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			}else{
				//$("#makerCode").append("<option  value='' >---</option>");
				for(i=0;i<data.codeList.length;i++){
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName; 
					$("#makerCode").append("<option value='"+code+"' >"+code+" : "+codeName+"</option>");
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


///요청전송
function chkProc(workingType, url){
 
 	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	var itemArr = ""
	var storArr = ""
	var rackArr = "";
	var qtyArr = ""; 
	
	var itemId;
	var storCode;
	var rackCode;
	var chkQty;
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		
		itemId = rowItem.item.itemId;
		storCode = rowItem.item.storCode;
		rackCode = rowItem.item.rackCode;
		chkQty = rowItem.item.chkQty;
		
		if (typeof itemId == 'undefined' || itemId == null) {			itemId = "";		}
		if (typeof storCode == 'undefined' || storCode == null) {			storCode = "";		}
		if (typeof rackCode == 'undefined' || rackCode == null) {			rackCode = "";		}
		if (typeof chkQty == 'undefined' || chkQty == null) {			chkQty = "";		}
		
		if (i == 0) {
			itemArr = itemId;
			storArr = storCode;
			rackArr = rackCode;		
			qtyArr = chkQty;						
		}else{
			itemArr = itemArr + "^" +itemId;
			storArr = storArr + "^" +storCode;
			rackArr = rackArr + "^" +rackCode;		
			qtyArr = qtyArr + "^" +chkQty;
		}
						
	}
    
    var data = new FormData();

    //sub
    data.append("itemArr", itemArr);
    data.append("storArr", storArr);
    data.append("rackArr", rackArr);
    data.append("qtyArr", qtyArr);

	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType,

			"itemArr" : itemArr,   // 품목번호 
			"storArr" : storArr,    //창고
			"rackArr" : rackArr,    //랙
			"qtyArr" : qtyArr		//실사수량	 
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

