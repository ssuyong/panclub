
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){
	  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
    	//fnViewType(info[11]);
        //f_category_sub(info[0],info[1],info[2],info[3],info[4],info[5],info[6],info[7],info[8],info[9],info[10],info[11],info[12],info[13]);
        
        var page = info[0];
        var custType = info[1];
        var custCode = info[2];
        var custName = info[3];
        var bizNo = info[4];
        var validYN = info[5];
        
        //console.log("HashLocationName:"+HashLocationName);
        $("#custType").val(custType);
		$("#custCode").val(custCode);
		$("#custName").val(custName);
		$("#bizNo").val(bizNo);
		$("#validYN").val(validYN);
		
        findDataToServer("/base/cust-list",page);
    } else {
	
  	}
  	
  	$(document).keypress(function(e) {
  if (e.which == 13) {
    $('#btnFind').click();
  }
});
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var custType_val = $("#custType").val(); 
		var custCode_val = $("#custCode").val();
		var custName_val = $("#custName").val();
		var bizNo_val = $("#bizNo").val();
		var validYN_val = $("#validYN").val();
		
		document.location.hash = '#info'+currentPage+"!"+custType_val+"!"+custCode_val+"!"+custName_val+"!"+bizNo_val+"!"+validYN_val;
		//
		
		//alert("등록버튼");
		findDataToServer("/base/cust-list", 1);
	});
	
	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("./data/normal_500.json");
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};

	


// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "custType",    headerText : "업체구분", width : 140, visible:false} 
	,{ dataField : "custTypeName",    headerText : "업체구분", width : 60 } 
	,{ dataField : "placeYN",      headerText : "발주업체", width : 60, visible:false}
	,{ dataField : "supplyYN",      headerText : "납품업체", width : 60, visible:false}
	,{ dataField : "custCat",      headerText : "거래구분", width : 100}
	,{ dataField : "custCode",   headerText : "거래처코드", width: 80} 
	//,{ dataField : "custName",     headerText : "거래처명(약명)", width : 120    }
	//,{ dataField : "formalName",     headerText : "거래처명(정식명)", width : 120    , visible : false }
	,{ dataField : "custName",     headerText : "거래처명(약명)", width : 250, style:"left"     }
	,{ dataField : "formalName",     headerText : "거래처명(정식명)", width : 200, style:"left"  , visible:false }
	,{ dataField : "bizNo",   headerText : "사업자번호", width : 130, }
	,{ dataField : "ceoName",   headerText : "대표자명" ,width : 100 }
	,{ dataField : "custAddress1",   headerText : "사업장주소",   style:"left"  }
	,{ dataField : "phone",      headerText : "대표전화"  , width : 150  }
	,{ dataField : "fax",      headerText : "FAX"  , width : 150  }
	,{ dataField : "admGroupCode",      headerText : "관리그룹"  , width : 80   }
	,{ dataField : "admGroupName",      headerText : "SR담당자" , width : 150   }
	,{ dataField : "admEmpName",      headerText : "관리담당자" , width : 130    }
	,{ dataField : "bzType",      headerText : "업태"  , width : 130  }
	,{ dataField : "salePriceType",      headerText : "판매가격유형"  , width : 130  }
	,{ dataField : "bzItem",      headerText : "종목", width : 130}
	//,{ dataField : "releasePriceType",      headerText : "출고단가종류"}
	//,{ dataField : "bzItem",      headerText : "마진율"}
	//,{ dataField : "releasePriceType",      headerText : "입고율"}
	,{ dataField : "taxType",      headerText : "세액", visible:false}
	,{ dataField : "cashType",      headerText : "현외", visible:false}
	,{ dataField : "releaseLimit",      headerText : "출고한도",	dataType: "numeric", formatString: "#,##0", style:"right", visible:false}
	//,{ dataField : "outsideCode",      headerText : "외부코드"}
	,{ dataField : "regUserName",      headerText : "작성자", visible:false}
	,{ dataField : "created",      headerText : "작성일자", width : 150, visible:false}
	,{ dataField : "uptUserName",      headerText : "수정자", visible:false}
	,{ dataField : "modified",      headerText : "수정일자", width : 150, visible:false}
	
	
];
 



// 윈도우 onload 이벤트 핸들링

// 만약 jQuery 사용한다면, $(document).ready(function() {}); 사용하세요.
/*
window.onload = function() {
           // 실제로 #grid_wrap 에 그리드 생성
    myGridID = AUIGrid.create("#grid_wrap", columnLayout);
    myGridID2 = AUIGrid.create("#grid_wrap2", columnLayout2);

    var data = [];
	for(var i=0; i<22; i++) {
		data.push( {
			index : i,
			position : "",
			name : "",
			memo : ""
		});
	}
	
	//console.log(JSON.stringify(data));
	AUIGrid.setGridData(myGridID, data);
	
    //Ajax 요청 실행
    //requestAjax();
};
*/
 

// Ajax 요청을 합니다.
/*
function requestAjax() {
	// ajax 요청 전 그리드에 로더 표시
	AUIGrid.showAjaxLoader(myGridID);
	
	// ajax (XMLHttpRequest) 로 그리드 데이터 요청
	ajax( {
	     url : "./sample/data/normal_100.json",
	     onSuccess : function(data) {
	                if(!data) {
	                          return;
	                }
	
	                // 그리드 데이터
	                var gridData = data;
	
	                // 로더 제거
	                AUIGrid.removeAjaxLoader(myGridID);
	
	                // 그리드에 데이터 세팅
	                AUIGrid.setGridData(myGridID, gridData);
	     },
	     onError : function(status, e) {
         	alert("데이터 요청에 실패하였습니다.\r status : " + status);
	     }
	});
};
*/

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
			enableFilter: true,
			showAutoNoDataMessage : false, 
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
	
	/*
	var data = [];
	for(var i=0; i<22; i++) {
		data.push( {
			index : i,
			position : "",
			name : "",
			memo : ""
		});
	}
	AUIGrid.setGridData(myGridID, data);
	AUIGrid.setGridData(myGridID2, data);	
	*/
	
	/*
	// 빈데이터 20개 생성
	var myData = [];
	for(var i=0; i<20; i++) {
		myData[i] = {mgrIdx : '', name : '', localName : '', roll : '', phone : '', phone2 : '', email : '', validYN : ''  };
	}
	*/
	

	var rowPos = 'first';
	//AUIGrid.addRow(myGridID, myData, rowPos);

	//console.log(JSON.stringify(data));
	//AUIGrid.setGridData(myGridID, myData);
	//AUIGrid.setGridData(myGridID2, myData2);	
	
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
		
		
		//alert(" ( " + event.rowIndex + ", " + event.columnIndex + ") :  " + event.value + " double clicked!!");
		//return;
		//location.href = "cust-up?nowSrch=Y&sYmd="+sYmd+"&eYmd="+eYmd+"&setDate="+setDate+"&orderNo="+orderNo+"&zStateSrch="+zStateSrch+"&item="+item
		
		//hash값 추가. 뒤로가기해서 넘어올때. 조건 기억하게 하기 위해
		var custType_val = $("#custType").val(); 
		var custCode_val = $("#custCode").val();
		var custName_val = $("#custName").val();
		var bizNo_val = $("#bizNo").val();
		var validYN_val = $("#validYN").val();
		
		
		document.location.hash = '#info'+currentPage+"!"+custType_val+"!"+custCode_val+"!"+custName_val+"!"+bizNo_val+"!"+validYN_val;
		//
     	
     	//post형식으로 거래처등록으로 넘기기
		let f = document.createElement('form');
    
	    let obj;
	    obj = document.createElement('input');
	    obj.setAttribute('type', 'hidden');
	    obj.setAttribute('name', 'custCode');
	    obj.setAttribute('value', event.item.custCode);
	    
	    f.appendChild(obj);
	    f.setAttribute('method', 'post');
	    f.setAttribute('action', '/base/cust-up');
	    document.body.appendChild(f);
	    f.submit();
		
	});
		
}


function findDataToServer(url,page) {
	var list = [];
	$("#iDiv_noSrchPop").css("display","none");
	$("#iDiv_noDataPop").css("display","none");
	//var sYmd = $("#sYmd").val();
	//var eYmd = $("#eYmd").val();
	//var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	//if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
	//	ymdIgnoreYN = "Y";
	//}
	//console.log(ymdIgnoreYN);
	var custType = $("#custType").val();
	var custCode = $("#custCode").val();
	var custName = $("#custName").val();
	var bizNo = $("#bizNo").val();
	var validYN = $("#validYN").val();	
	var ceoName = $("#ceoName").val();	//2023.07.13 대표자명 
	var custManager = $("#custManager").val();	//2023.12.07 담당자명
	var paymentDay = $("#paymentDay").val();	//2023.12.12 결제일
	const salePriceType = $("#salePriceType").val();
	//console.log("url:"+url);
	//console.log("custType:"+custType);
	//console.log("custCode:"+custCode);
	//console.log("localName:"+localName);
	
	//if (spaceDel(custType)=='' && spaceDel(custCode)=='' && spaceDel(custName)=='' && spaceDel(bizNo)=='') {
	//	alert("검색어를 입력하세요.");
	//	return false;
	//}
	//$("#iDiv_noDataPop").css("display","none");
 
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			//"sYmd":sYmd,
			//"eYmd":eYmd,
			//"ymdIgnoreYN":ymdIgnoreYN,
			"custType":custType,
			"custCode":custCode,
			"custName":custName
			,"bizNo":bizNo
			,"validYN":validYN
			,"ceoName":ceoName
			,"custManager":custManager
			,"paymentDay":paymentDay
			,salePriceType
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			if (data.custList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				$("#iDiv_noDataPop").css("display","block");	
				AUIGrid.clearGridData(myGridID);
	     		 //$("#iDiv_noSrchPop").css("display","block");			
			}else{
					var custCatSave= '';
				for(i=0;i<data.custList.length;i++){
				   custCatSave= '';
					if (data.custList[i].placeYN =="Y" && data.custList[i].supplyYN =="N" ){
						 custCatSave = '발주처'
					}if(data.custList[i].placeYN =="N" && data.custList[i].supplyYN =="Y"){
						custCatSave = '주문처'
					} if (data.custList[i].placeYN =="Y" && data.custList[i].supplyYN =="Y"){
						 custCatSave = '공용'
					}if (data.custList[i].placeYN =="N" && data.custList[i].supplyYN =="N"){
						 custCatSave = ''
					};
					//console.log("custCatSave : " + data.custList[0].admGroupName);		
					if(data.custList[i].admGroupName != null){									
					}
					list.push({
						 custType: data.custList[i].custType 
						,custTypeName: data.custList[i].custTypeName 
						,custCat: custCatSave
						,custCode: data.custList[i].custCode 
						,formalName: data.custList[i].formalName 
						,custName: data.custList[i].custName
						,bizNo: data.custList[i].bizNo 
						,ceoName: data.custList[i].ceoName 
						,custAddress1: data.custList[i].custAddress1 
						,phone: data.custList[i].phone 
						,admGroupCode: data.custList[i].admGroupCode 
						,admGroupName: data.custList[i].admGroupName 
						,admEmpName: data.custList[i].admEmpName 
						,bzType: data.custList[i].bzType 
						,bzItem: data.custList[i].bzItem 
						,releasePriceType: data.custList[i].releasePriceType 
						,bzItem: data.custList[i].bzItem 
						//,warehousePriceType: data.custList[i].warehousePriceType 
						,taxTypeName: data.custList[i].taxTypeName   
						,cashTypeName: data.custList[i].cashTypeName 
						,releaseLimit: data.custList[i].releaseLimit 
						,outsideCode: data.custList[i].outsideCode 
						,regUserName: data.custList[i].regUserName 
						,created: data.custList[i].created 
						,uptUserName: data.custList[i].uptUserName 
						,modified: data.custList[i].modified 
						,placeYN: data.custList[i].placeYN 
						,supplyYN: data.custList[i].supplyYN 
						,fax: data.custList[i].fax 
						,salePriceType : data.custList[i].salePriceType
						//,balanceDspTypeName: data.custList[i].balanceDspTypeName
					
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


// AUIGrid 의 현재 칼럼 레이아웃을 얻어 보관합니다.
// 데모에서는 HTML5의 localStrage 를 사용하여 보관합니다.
// 만약 DB 상에 보관하고자 한다면 해당 정보를 Ajax 요청으로 코딩하십시오.
function saveColumnLayout() {

	// 칼럼 레이아웃 정보 가져오기
	var columns = AUIGrid.getColumnLayout(myGridID);

	if (typeof (Storage) != "undefined") { // Check browser support
		var columnStr = JSON.stringify(columns);
		var rowPos = AUIGrid.getRowPosition(myGridID); // 수직 스크롤 값
		var hPos = AUIGrid.getProp(myGridID, "hScrollPosition"); // 수평 스크롤 값(픽셀)

		localStorage.setItem("auigridLayout", columnStr);
		localStorage.setItem("auigridRow", rowPos);
		localStorage.setItem("auigridCol", hPos);

		//alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");
	} else {
		//alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
};


// PDF 내보내기(Export), AUIGrid.pdfkit.js 파일을 추가하십시오.
function exportPdfClick() {

	// 완전한 HTML5 를 지원하는 브라우저에서만 PDF 저장 가능( IE=10부터 가능 )
	if (!AUIGrid.isAvailabePdf(myGridID)) {
		alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
		return;
	}

	// PDF 내보내기 속성
	var exportProps = {

		// 폰트 지정
		fontPath: "/resources/pdfkit/jejugothic-regular.ttf",

		// 저장하기 파일명
		fileName: "거래처 내역",

		// 헤더 내용
		headers: [{
			text: "", height: 20 // 첫행 빈줄
		}, {
			text: "거래처 내역", height: 24, style: { fontSize: 20, textAlign: "center", underline: true, background: "#DAD9FF" }
		}, {
			text: "작성자 : 에이유아이", style: { textAlign: "right" }
		}, {
			text: "작성일 : 2022. 03. 29", style: { textAlign: "right" }
		}, {
			text: "", height: 5, style: { background: "#555555" } // 빈줄 색깔 경계 만듬
		}],

		// 푸터 내용
		footers: [{
			text: "", height: 5, style: { background: "#555555" } // 빈줄 색깔 경계 만듬
		}, {
			text: "참고 : 문의 사항은 전산팀으로 연락 하십시오.", style: { fontSize: 15, color: "#2F9D27" }
		}, {
			text: "Copyright © AUISoft", height: 24, style: { textAlign: "right", color: "#ffffff", background: "#222222" }
		}]
	};

	// 내보내기 실행
	//AUIGrid.exportToPdf(myGridID, exportProps);
	AUIGrid.exportToPdf(myGridID, {
					// 폰트 경로 지정 (반드시 지정해야 함)
					fontPath: "/resources/pdfkit/jejugothic-regular.ttf"
				});
				
};


$("#custCatalog").change(function() {
	 var result = $('#custCatalog option:selected').val();
	 console.log("result"+ result)
	if( result == 'p'){
		myCustomFilter2();
	} else if(result == "s"){
		myCustomFilter1();
	}else if(result == "w"){
		clearMyFilterAll();				
	}
})

function myCustomFilter1() {

	AUIGrid.setFilter(myGridID, "custType", function(dataField, value, item) {
		if (item.custCat == "주문처") {
			return true;
		}
		return false;
	});
}

function myCustomFilter2() {

	AUIGrid.setFilter(myGridID, "custType", function(dataField, value, item) {
		if (item.custCat == "발주처") {
			return true;
		}
		return false;
	});
}

//  필터링 모두 해제
function clearMyFilterAll() {
	AUIGrid.clearFilterAll(myGridID);
};
