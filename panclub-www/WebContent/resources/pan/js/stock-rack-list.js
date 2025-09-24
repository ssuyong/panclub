
var today = new Date();
let yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000)); // 2년전부 오늘까지
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
	startpicker: {
		date: today,
//		autoClose : false,
		input: '#startpicker-input',
		container: '#startpicker-container'
	},
	endpicker: {
		date: today,
		input: '#endpicker-input',
		container: '#endpicker-container'
	}
});

// 그리드 생성 후 해당 ID 보관 변수
var myGridID; 

$(document).ready(function(){
		  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	findStorage("/base/storage-list", 1);
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
  
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var sYmd = info[1];
        var eYmd = info[2];
        
        var itmeNo = info[3];
        var itemName = info[4];
        var storCode = info[5];
        var ymdIgnoreYN = info[6];
        
         
        if ( typeof itmeNo == 'undefined'){ itmeNo = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof itemName == 'undefined'){ itemName = ''	}
        if ( typeof storCode == 'undefined'){ storCode = ''	}
        if ( typeof ymdIgnoreYN == 'undefined'){ ymdIgnoreYN = ''	}
        
        
		$("#itmeNo").val(itmeNo);
		$("#itemName").val(itemName);
		$("#storCode").val(storCode);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		 
		
		if (ymdIgnoreYN == 'Y') {
			$('#ymdIgnoreYN').prop('checked', true);
		}else{
			$('#ymdIgnoreYN').prop('checked', false);
		}
		
        findDataToServer("/logis/stock-rack-list",page);
  	}
  	
  	//제조사코드에 셋팅
  	findSrchCode("/base/code-list")
  	/*
    $('#makerCode').chosen({
		  no_results_text: "검색 결과가 없습니다"
		  , width: "200px"
	});
	*/
 

	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var itmeNo_val = $("#itmeNo").val();
		var itemName_val = $("#itemName").val();
		var storCode_val = $("#storCode").val(); 
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
			ymdIgnoreYN = "Y";
		}	
		
		 
		itmeNo_val = itmeNo_val==undefined?'':itmeNo_val;
		itemName_val = itemName_val==undefined?'':itemName_val;
		storCode_val = storCode_val==undefined?'':storCode_val;
		
		
		var url = document.location.hash; 
		document.location.hash = '#info'+currentPage+"!"+sYmd+"!"+eYmd+"!"+itmeNo_val+"!"+itemName_val+"!"+storCode_val+"!"+ymdIgnoreYN;
		
		findDataToServer("/logis/stock-rack-list", 1);
		
	});
	
	let itemId = $("#itemId").val();	
	if (itemId !='' && itemId != '0'){
		$("#startpicker-input").val($("#prmsYmd").val());
		$("#endpicker-input").val($("#prmeYmd").val());
		
		//alert("custcode:"+custCode);
		$("#btnFind").click();
	}	  
	
	$("#btnbulkSrch_sectionOnOff").click(function(){  // 다중조회 버튼에 대한 이벤트
		const button = $("#btnbulkSrch_sectionOnOff");
		if(button.html() == "다중조회 On")
		{
			button.html("다중조회 Off");
			button.attr('class','btn btn-secondary');
			$("#idDiv_bulkSrch_section").css('display','block');
			$("#idDiv_nomalSrch_section").css('display','none');
			
			 
		}
		else
		{
			button.html("다중조회 On");
			button.attr('class','btn btn-primary');
			$("#idDiv_bulkSrch_section").css('display','none'); 
			$("#idDiv_nomalSrch_section").css('display','block'); 
			
		}
		 
		 
		 
		
	})
	
 
	
	

});




// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField : "itemId",    headerText : "부품ID", width : 80} 
	,{ dataField : "itemNo",     headerText : "품번", width : 120     }
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
	,{ dataField : "itemName",   headerText : "상품명" , style : "left" , width : 120}
	,{ dataField : "makerCode",   headerText : "제조사코드", width : 68 }
	,{ dataField : "makerName",      headerText : "제조사명"  , width : 80, style : "left"   }
	,{ dataField : "stockQty",      headerText : "재고수량", width : 56 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
	,{ dataField : "costPrice",      headerText : "입고단가"  ,dataType: "numeric" ,formatString: "#,##0"  , style:"right", width : 68 }
	,{ dataField : "centerPrice",      headerText : "센터가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 68}
	,{ dataField : "salePrice",      headerText : "판매단가" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 68}
	,{ dataField : "qtyxPrice",  headerTooltip: {show: true,tooltipHtml: "재고수량 * 센터가"},    headerText : "센터가합계" ,dataType: "numeric" ,formatString: "#,##0"  , style:"right" , width : 78}
	,{ dataField : "storCode",    headerText : "창고코드", width : 56, style : "left"	}
	,{ dataField : "storName",    headerText : "창고명", width : 120, style : "left"	}
	,{ dataField : "rackCode",    headerText : "랙코드", width : 56, style : "left"	}
	,{ dataField : "rackName",    headerText : "랙명", width : 120, style : "left"	}
	,{ dataField : "uptUserName",    headerText : "최종수정자", width : 150, style : "left" }
	,{ dataField : "modified",    headerText : "최종수정일", width : 150, style : "left" }
];
	var footerLayout = [{labelText: "합계", positionField: "custCode", style: "aui-grid-my-column"}, 
	{ dataField: "stockQty", positionField: "stockQty", operation: "SUM", style:"right"},  
	{ dataField: "costPrice", positionField: "costPrice", operation: "SUM", style:"right" , formatString: "#,##0"},  
	{ dataField: "centerPrice", positionField: "centerPrice", operation: "SUM", style:"right", formatString: "#,##0"},  
	{ dataField: "salePrice", positionField: "salePrice", operation: "SUM", style:"right", formatString: "#,##0"},  
	{ dataField: "qtyxPrice", positionField: "qtyxPrice", operation: "SUM", style:"right", formatString: "#,##0"}
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
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			showAutoNoDataMessage : false,
			showFooter: true,
			//showRowCheckColumn : true, 
			//rowCheckToRadio : true
			showRowCheckColumn: true,
			enableRowCheckShiftKey: true,
			
			
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

		var storCode = event.item.storCode;
		var itemId = event.item.itemId;
		
		if (event.dataField == 'itemId') {   //칼럼이 재고수량이후부터
			$.fancybox.open({
			  href : '/logis/stock-wr-list?storCode='+storCode+'&itemId='+itemId   , // 불러 올 주소
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

	AUIGrid.setFooter(myGridID, footerLayout);
}


function findDataToServer(url,page) {
	var list = [];
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();   //날짜전체
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	//var stockYm = $("#stockYm").val();
	
	
	var storCode = $("#storageCode").val();// $("#storCode").val(); // 창고코드
	var storName = $("#storName").val(); //창고명
	
	//var storage = $("#storageCode").val();
	 
	
	
	var makerCode = $("#makerCode").val(); //제조사
	var itemId = $("#itemId").val(); //부품id
	if(itemId == ''){itemId = 0;}
	
	var itemNo = $("#itemNo").val(); //품번
	var itemName = $("#itemName").val(); //부품명
	var classCode = $("#classCode").val(); // 클래스
	if(classCode == "정품"){classCode = "GN"}  
	else if(classCode == "애프터마켓"){classCode = "AM"}
	else if(classCode == "재제조"){classCode = "RM"}
	else if(classCode == "기타"){classCode = "ET"}
	
	
	var rackCode = $("#rackCode").val(); //랙코드
	var rackName = $("#rackName").val(); // 랙명
	
	
	
	let itemBulk='';
	if( $("#btnbulkSrch_sectionOnOff").html() == "다중조회 On")
	{
		itemNo = $("#itemNo").val();
		itemName = $("#itemName").val();
	}
	else
	{
		itemBulk = $("#item_bulk").val();
		itemBulk = itemBulk.replace("","");
		itemBulk = itemBulk.replace(/\n/g, '힣');  
	}
	
	
	if(ymdIgnoreYN=="Y" && !storCode && !rackCode && !rackName  && !classCode  && !makerCode  && (!itemId || itemId == 0)  && !itemNo  && !itemName && itemBulk =='')
	{
		
		alert('조건을 하나 이상 선택해주세요.');
		return;
	}
	
//	console.log("rackCode:"+rackCode);
//	console.log("rackName:"+rackName);
	
	var sYmd = document.getElementById("startpicker-input").value; //수정일 시작
	var eYmd = document.getElementById("endpicker-input").value; // 수정일 끝
	
	//console.log("sYmd : " + sYmd)
	//console.log("eYmd : " + eYmd)
	
	/*
	if (spaceDel(itemNo)=='' && spaceDel(itemName)=='' && spaceDel(stockYm)=='' && spaceDel(storCode)=='') {
		alert("부품번호 또는 부품명에 검색어를 입력하세요.");
		return false;
	}*/
	
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
			//"stockYm":stockYm,
			"makerCode":makerCode,
			"classCode":classCode,
			"storName":storName,
			"itemId":itemId
			,"rackCode":rackCode
			,"rackName":rackName
			,"itemBulk":itemBulk
			,"bulkSrchType":(itemBulk==''?'': $(':radio[name="bulkSrchType"]:checked').val())  // 라디오 버튼에 따라 id or 품번 검색 선택 
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.stockRackList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
			}else{
					
				for(i=0;i<data.stockRackList.length;i++){
					if (i==0){
						//console.log("modi:"+data.stockRackList[i].modified);
					}
					list.push({
						itemId: data.stockRackList[i].itemId 
						,itemNo: data.stockRackList[i].itemNo 
						,itemName: data.stockRackList[i].itemName 
						,makerCode: data.stockRackList[i].makerCode 
						,makerName: data.stockRackList[i].makerName
						,stockQty: data.stockRackList[i].stockQty 
						,centerPrice: data.stockRackList[i].centerPrice 
						,costPrice: data.stockRackList[i].costPrice 
						,salePrice: data.stockRackList[i].salePrice 
						,qtyxPrice: (data.stockRackList[i].stockQty)*(data.stockRackList[i].centerPrice)
						,storCode: data.stockRackList[i].storCode 
						,storName: data.stockRackList[i].storName 
						,rackCode: data.stockRackList[i].rackCode 
						,rackName: data.stockRackList[i].rackName 
						,uptUserName: data.stockRackList[i].uptUserName 
						,modified: data.stockRackList[i].modified 
						,storConsignCustCode: data.stockRackList[i].storConsignCustCode 
						
						,className: data.stockRackList[i].className
						,factoryNo: data.stockRackList[i].factoryNo
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

function findStorage(url, page) {
	
	var list = [];
	var listS;
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
			var selectBox = document.getElementById("storageCode");
			 selectBox.innerHTML = "";
			
			if (data.storageList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				 var blankOption = document.createElement("option");
						  blankOption.value = "";
						  blankOption.text = "";
						  selectBox.appendChild(blankOption);
				for (i = 0; i < data.storageList.length; i++) {
					
					var option = document.createElement("option");
					option.value = data.storageList[i].storageCode;	
					option.text  =data.storageList[i].storageName + " ("+  data.storageList[i].storageCode + ")";
					 selectBox.appendChild(option);
				}

			}
				 listS = data.storageList;
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