
//Reg Double click Check 2023.11.10.
var dblRegClkBln = false;
function dblRegClkChk(){
	if(dblRegClkBln){
    	return dblRegClkBln;
    }else{
        dblRegClkBln = true;
        return false;
    }
}
$.ajaxSetup({complete:(c)=>{dblRegClkBln = false}}); //240516 yoonsang dblRegClkChk()더블클릭 채크를 할때 통신 후 오류로인해 dblRegClkBln 값을 false로 못돌렸을 시 생기는 문제점을 해결하기위해 추가

function fn_delBlankRowAll(myGridID, dataField) {
	
	var allItems = AUIGrid.getGridData(myGridID);
	var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
	var rowId;
	var j = 0;
	
	for (var i = 0, len = allItems.length; i < len; i++) {
		rowItem = allItems[i];
		rowId = rowItem[rowIdField];
		idxKey = AUIGrid.getCellValue(myGridID, i, dataField);
		
		if (idxKey === undefined || idxKey == "") {  //상품ID 존재하는 경우만
			if (j == 0) {
				j = i;
			}
			//AUIGrid.removeRow(myGridID, j);
			AUIGrid.resetUpdatedItemById(myGridID, rowId, "a");
			j + 1;
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN : 완성차코드 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// 데이터 요청 Ajax
function makerCodeSelect(url) {

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			mCode: "1000"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				for (i = 0; i < data.codeList.length; i++) {
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;
					$("#makerCode").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END : 완성차코드 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN: 상품 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// 상품 칼럼 레이아웃 작성
var columnLayoutItem = [
	{ dataField: "cust_origin", headerText: "거래처코드_저장", visible: false }
	, { dataField: "cust", headerText: "거래처", width: 140, editable: false }
	, { dataField: "classCode", headerText: "구분코드", width: 80 , visible: false}
	, { dataField: "className", headerText: "구분", width: 80 }
	, { dataField: "itemId", headerText: "부품ID", width: 140 }
	, { dataField: "itemCode", headerText: "상품코드", width: 120, visible: false }
	, { dataField: "itemNo", headerText: "품번", width: 120 }
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
	, { dataField: "itemName", headerText: "상품명" }
	, { dataField: "itemNameEn", headerText: "영문상품명", visible: false }
	, { dataField: "makerCode", headerText: "제조사코드", visible: false }
	, { dataField: "makerName", headerText: "제조사명" }
	, { dataField: "genuineYN", headerText: "정품여부" }
	, { dataField: "itemExchangeId", headerText: "호환Id" }
	, { dataField: "centerPrice", headerText: "센터가", dataType: "numeric", formatString: "#,##0" , style: "right" }
	, { dataField: "inPrice", headerText: "입고단가", dataType: "numeric", formatString: "#,##0" , style: "right" }
	, { dataField: "salePrice", headerText: "판매단가", dataType: "numeric", formatString: "#,##0" , style: "right" }
	, { dataField: "regUserld", headerText: "등록자id" }
	, { dataField: "regUserName", headerText: "등록자명" }
	, { dataField: "regYmd", headerText: "등록일자" }
	, { dataField: "uptUserId", headerText: "수정자id" }
	, { dataField: "uptUserName", headerText: "수정자명" }
	, { dataField: "uptYmd", headerText: "수정일자" }
	, { dataField: "productYear", headerText: "생산년도" }
	, { dataField: "home", headerText: "원산지" }
	, { dataField: "equipPlace", headerText: "장착위치" }
	, { dataField: "color", headerText: "색상" }
	, { dataField: "shine", headerText: "광택" }
	, { dataField: "weight", headerText: "무게(Weight)" }
	, { dataField: "cbm", headerText: "CBM" }
	, { dataField: "width", headerText: "가로(Width)" }
	, { dataField: "depth", headerText: "세로(Depth)" }
	, { dataField: "height", headerText: "높이(Height)" }
	, { dataField: "dcExceptYN", headerText: "할인제외" }

];


// 상품 정보 조회(url, page, 그리드의 index, 팝업창에서 호출한경우='Y', 팝업창오픈여부='Y':그리드에서 팝업창을 열지말아야할경우존재 )
// 6번째 매개변수는 작업타입 지정을 받아서 수동입출고의 경우 바코드 반영된 조회를 하기위해 추가
function findItem(url, page, rowIndex, popYN, isPopOpen , workingType = 'LIST') {
	
    setStartSpinner();
	var list = [];
	var itemNo = $("#pop_itemNo").val();
	var itemName = $("#pop_itemName").val();
	var srchEqualItemNo = $("#srchEqualItemNo").val();
		
	 
	
	if (popYN == 'Y') {
		srchEqualItemNo = '';
	}

	if (spaceDel(itemNo) == '' && spaceDel(itemName) == '') {
		setStopSpinner();
		alert("부품번호 또는 부품명에 검색어를 입력하세요.");
		return false;
	}

	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			workingType,
			"itemNo": itemNo,
			"srchEqualItemNo": srchEqualItemNo,  //동일한 것만 검색되게 추가
			"itemName": itemName
		},
		async: false,   // Must be false to calculate the discount rate.2023.07.03
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			
			$("#srchEqualItemNo").val();
			let factoryNo = ''; //2024.07.24 hsg

			if (data.itemList.length != 1) {
				if (isPopOpen == 'N') {
						//dup item  grid dsp
						item = {
							itemNo: itemNo,
						};
						AUIGrid.updateRow(myGridID, item, rowIndex);
				} else {
					//상품
					
					var dialogItem;
					dialogItem = $("#dialog-form-item").dialog({
						//autoOpen: false,
						height: 700,
						//minWidth: 500,
						width: "70%",
						modal: true,
						headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position: [400, 400],
						buttons: {
							"확인": updateGridRow,
							"취소": function(event) {
								dialogItem.dialog("close");
							}
						},
						close: function() {
							// $( "#users tbody tr td" ).empty();	   	
						}
					});

					//alert("조건에 맞는 자료가 없습니다.");
					// 그리드 생성 후 해당 ID 보관 변수
					var myGridIDItem;
					// AUIGrid 그리드를 생성합니다.
					createItemGrid(columnLayoutItem);
					dialogItem.dialog("open");
					for (i = 0; i < data.itemList.length; i++) {
						if (data.itemList[i].classCode == 'GN') { //2024.07.24 hsg
							factoryNo = '';
						} else {
							factoryNo = data.itemList[i].factoryNo;
						}

						list.push({
							cust_origin: data.itemList[i].comCode
							, cust: data.itemList[i].comCode + "-" + data.itemList[i].comName
							, itemId: data.itemList[i].itemId
							, itemCode: data.itemList[i].itemCode
							, itemNo: data.itemList[i].itemNo
							//, factoryNo: data.itemList[i].factoryNo
							, itemName: data.itemList[i].itemName
							, itemNameEn: data.itemList[i].itemNameEn
							, makerCode: data.itemList[i].makerCode
							, makerName: data.itemList[i].makerName
							, genuineYN: data.itemList[i].genuineYN
							, itemExchangeId: data.itemList[i].itemExchangeId
							, centerPrice: data.itemList[i].centerPrice
							, inPrice: data.itemList[i].inPrice
							, salePrice: data.itemList[i].salePrice
							, regUserld: data.itemList[i].regUserld
							, regUserName: data.itemList[i].regUserName
							, regYmd: data.itemList[i].regYmd
							, uptUserId: data.itemList[i].uptUserId
							, uptUserName: data.itemList[i].uptUserName
							, uptYmd: data.itemList[i].uptYmd
							, productYear: data.itemList[i].productYear
							, home: data.itemList[i].home
							, equipPlace: data.itemList[i].equipPlace
							, color: data.itemList[i].color
							, shine: data.itemList[i].shine
							, weight: data.itemList[i].weight
							, cbm: data.itemList[i].cbm
							, width: data.itemList[i].width
							, depth: data.itemList[i].depth
							, height: data.itemList[i].height
							, dcExceptYN: data.itemList[i].dcExceptYN
							, className: data.itemList[i].className   //2024.07.22
							
							, classCode : data.itemList[i].classCode   //2024.07.24 hsg
						    , factoryNo : factoryNo   //2024.07.24 hsg
						});
						//firstGrid_mst.setData(list); // 그리드에 데이터 설정
					}
					AUIGrid.setGridData("#grid_wrap_item", list);
					
					// 해당 페이지로 이동
					if (page > 1) {
						AUIGrid.movePageTo(myGridIDItem, Number(page));
					}
				}


			} else {//1개만 나오는 경우
				
				for (i = 0; i < data.itemList.length; i++) {
					if (popYN == 'Y') {
						if (data.itemList[i].classCode == 'GN') { //2024.07.24 hsg
							factoryNo = '';
						} else {
							factoryNo = data.itemList[i].factoryNo;
						}						
						list.push({
							cust_origin: data.itemList[i].comCode
							, cust: data.itemList[i].comCode + "-" + data.itemList[i].comName
							, itemId: data.itemList[i].itemId
							, itemCode: data.itemList[i].itemCode
							, itemNo: data.itemList[i].itemNo
							//, factoryNo: data.itemList[i].factoryNo
							, itemName: data.itemList[i].itemName
							, itemNameEn: data.itemList[i].itemNameEn
							, makerCode: data.itemList[i].makerCode
							, makerName: data.itemList[i].makerName
							, genuineYN: data.itemList[i].genuineYN
							, itemExchangeId: data.itemList[i].itemExchangeId
							, centerPrice: data.itemList[i].centerPrice
							, inPrice: data.itemList[i].inPrice
							, salePrice: data.itemList[i].salePrice
							, regUserld: data.itemList[i].regUserld
							, regUserName: data.itemList[i].regUserName
							, regYmd: data.itemList[i].regYmd
							, uptUserId: data.itemList[i].uptUserId
							, uptUserName: data.itemList[i].uptUserName
							, uptYmd: data.itemList[i].uptYmd
							, productYear: data.itemList[i].productYear
							, home: data.itemList[i].home
							, equipPlace: data.itemList[i].equipPlace
							, color: data.itemList[i].color
							, shine: data.itemList[i].shine
							, weight: data.itemList[i].weight
							, cbm: data.itemList[i].cbm
							, width: data.itemList[i].width
							, depth: data.itemList[i].depth
							, height: data.itemList[i].height
							, dcExceptYN: data.itemList[i].dcExceptYN
							, className: data.itemList[i].className   //2024.07.22
							, classCode : data.itemList[i].classCode   //2024.07.24 hsg
						    , factoryNo : factoryNo   //2024.07.24 hsg
						});
						//AUIGrid.updateRow(myGridID, item, "selectedIndex");						
						//AUIGrid.updateRow(myGridIDItem, item, rowIndex);
						AUIGrid.setGridData("#grid_wrap_item", list);
					} else {
						if (data.itemList[i].classCode == 'GN') { //2024.07.24 hsg
							factoryNo = '';
						} else {
							factoryNo = data.itemList[i].factoryNo;
						}
						item = {
							cust_origin: data.itemList[i].comCode
							, cust: data.itemList[i].comCode + "-" + data.itemList[i].comName
							,itemId: data.itemList[i].itemId,
							itemNo: data.itemList[i].itemNo,
							itemName: data.itemList[i].itemName,
							itemNameEn: data.itemList[i].itemNameEn,
							unitPrice: data.itemList[i].salePrice,
							salePrice: data.itemList[i].salePrice
							,cnt: 1
							,sumPrice: data.itemList[i].salePrice * 1
							,saleUnitPrice: data.itemList[i].salePrice  // 발주의 판매단가용도
							,centerPrice: data.itemList[i].centerPrice
							,dcExceptYN: data.itemList[i].dcExceptYN
							,makerName: data.itemList[i].makerName
							,makerCode: data.itemList[i].makerCode
							,className: data.itemList[i].className   //2024.07.22
							,classCode : data.itemList[i].classCode   //2024.07.24 hsg
						    ,factoryNo : factoryNo   //2024.07.24 hsg
						};
						//AUIGrid.updateRow(myGridID, item, "selectedIndex");
						
						AUIGrid.updateRow(myGridID, item, rowIndex);
						if(window.location.pathname == '/order/order-up' )
							order_dcProc();
					}
					//AUIGrid.updateRow(myGridIDItem, item, rowIndex);
				}
			}
			if(data.itemList.length != 1 && workingType == 'STOCKWRUP_LIST') // 찾은 부품이 1개가 아니면서 수동입출고인경우 비프음(비프함수는 수동입출고 js)
			{
				beep();
			} 
			$(".ui-dialog-titlebar-close").html("X");
			setStopSpinner();
		},
		error: function(x, e) {
			setStopSpinner();
			$("#srchEqualItemNo").val();
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

function openRegItemDialog() {


	$("#dialog-form-RItem").dialog({
		//autoOpen: false,
		height: 400,
		//minWidth: 500,
		width: "50%",
		modal: true,
		headerHeight: 40,
		left: "50%",
		marginleft: "-20%",
		buttons: {

		},
		close: function() {

		} 
	});

	formClear1();
	$("#dialog-form-RItem").dialog("open");
	
	
	//2024.04.12 supi 수동입출고 페이지에서 부품선택에서 부품등록 열릴때 특수문자 모두 제거해서 넣음
	if(window.location.pathname == '/logis/stock-wr-up') 
	{
		const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
		const str = $("#pop_itemNo").val().replace(reg,'');
		
		$("#itemNoReg").val(str);
	}
	else
		$("#itemNoReg").val( $("#pop_itemNo").val());
	
	findSrchCode("/base/code-list");


}

$("#btnCloseItemDialog").click(function() {
	$("#dialog-form-RItem").dialog("close");
	
});

$("#btnRegItemDialog").click(function() {
	updateDataToServer2("/base/itemAdd", "ADD");
	
	
	
});

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
			//$("#makerCodeReg").remove();
			//$("select[name='makerCodeReg'] option").remove();
			$("select#makerCodeReg option").remove();
			$("#makerCodeReg").append("<option></option>");  //2024.03.28
			if (data.codeList.length == 0){
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			}else{
				//$("#makerCode").append("<option  value='' >---</option>");
				for(i=0;i<data.codeList.length;i++){
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName; 
					$("#makerCodeReg").append("<option value='"+code+"' >"+code+" : "+codeName+"</option>");
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

function updateDataToServer2( url, workingType ) {
	
    var makerCode = $("#makerCodeReg").val(); 
    var itemNo = $("#itemNoReg").val(); 
    var factoryNo = $("#factoryNoReg").val(); 
    var carType = $("#carTypeReg").val(); 
    
    var itemName = $("#itemNameReg").val(); 
    var itemNameEn = $("#itemNameEnReg").val(); 
    
    var classCode = $("#classCodeReg").val(); 
    
    var centerPrice = $("#centerPriceReg").val(); 
    var inPrice = $("#inPriceReg").val(); 
    var salePrice = $("#salePriceReg").val(); 
    
    //필수값 체크
    if (classCode == '') {	alert("클래스는 필수 입력해야 합니다.");   $("#classCodeReg").focus();		return;	}
    if (makerCode == '') {	alert("제조사는 필수 입력해야 합니다.");   $("#makerCodeReg").focus();		return;	}
    if (itemNo == '') {	alert("품번은 필수 입력해야 합니다.");  $("#itemNoReg").focus();		return;	}


	var data = {};
	
	data.workingType = 'ADD';
    data.makerCode  = makerCode; 
    data.itemNo  = itemNo; 
    data.factoryNo  = factoryNo; 
    data.carType  = carType; 
    
    data.itemName  = itemName; 
    data.itemNameEn  = itemNameEn; 
    
    data.classCode = classCode;
    
    data.centerPrice  = centerPrice; 
    data.inPrice  = inPrice; 
    data.salePrice  = salePrice; 
    //data.dcExceptYN = dcExceptYN;
    

    if(window.location.pathname == '/logis/stock-wr-up')  // 수동입출고 페이지의 경우 부품등록팝업에서 저장시 이름규칙적용
    {
		const itemNoText = itemNo+''; //숫자일수도 있어서 ''을 더해서 문자열 타입으로 바꿔줌
		if(makerCode == 'TT' || makerCode =='LX')//도요타 렉서스의 경우 10글자 이후글자 날려버림
			data.itemNo = itemNoText.substring(0,10);
		else if(makerCode =='BZ' && (itemNoText.substring(0,1) =='A'  || itemNoText.substring(0,1) =='a' ))  //벤츠의 경우 앞글자가 A거나 a인경우 첫글자를 제외
			data.itemNo = itemNoText.substring(1);
		else if(makerCode =='FD' && (itemNoText.substring(0,1) =='P'  || itemNoText.substring(0,1) =='p' )) // 포드의 경우 앞글자가 P거나 p인 경우 철글자 제외
			data.itemNo = itemNoText.substring(1);
			 
	}
	
	if(dblRegClkChk()) return;
	
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    async : false,
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);
	        //$("#dialog-form-RItem").dialog("close");
			//$("#dialog-form-item").dialog("close");
	       	$("#pop_itemNo").val(data.o_itemNo);
			if(document.getElementById('srchEqualItemNo')){ //do stuff }
			$("#srchEqualItemNo").val();
			}
	        findItem('/base/item-list',0,0,'Y');
	        $("#dialog-form-RItem").dialog("close");
	        			
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

function formClear1() {

	$('#makerCodeReg').val('Default Value');
	$('#itemNoReg').val('');
	$('#factoryNoReg').val('');
	$('#carTypeReg').val('');
	$('#itemNameReg').val('');
	$("#itemNameEnReg").val('');
	$("#classCodeReg").val('Default Value');

	$('#centerPriceReg').val(0);
	$('#inPriceReg').val(0);
	$('#salePriceReg').val(0);
	

}


//2024.05.13 sg noDcProc 추가. 할인율제외여부.기본은 없음. 계산필요없을 시 'Y'
function createItemGrid(columnLayoutItem,noDcProc) {
	
	var auiGridProps = {
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		selectionMode: "multipleCells",

		showAutoNoDataMessage: false

		,rowStyleFunction: function (rowIndex, item) {
				if (item.classCode != "GN") {
					return "auigrid-nogn-row-style";
				}
				return "";
			}
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDItem = AUIGrid.create("#grid_wrap_item", columnLayoutItem, auiGridProps);

	var rowPos = 'first';
	
	//20240412 supi 수동입출고 부품 창 뜰때 품번 삭제되는 부분이 이부분인데 다른곳 영향 않주기 위해 현재 수동입출고 페이지가 아닐때만 되도록으로 해둠
	if(window.location.pathname != '/logis/stock-wr-up' && window.location.pathname != '/logis/barcode-list-item') 
		$('#pop_itemNo').val('');	 

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridIDItem, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridIDItem, "cellDoubleClick", function(event) {
		var i, rowItem, rowInfoObj, dataField;
		var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
		rowInfoObj = selectedItems[0];
		rowItem = rowInfoObj.item;
		
		if (document.getElementById("form-itemNo1")  != null) {  //그리드 아닌 곳에서 팝업띄운경우: 발주입고 품목변경에서 띄운경우
			var obj_itemId = document.getElementById("form-itemId1").value;
			var obj_itemName = document.getElementById("form-itemNo1").value;
			var obj_itemUnitPrice = document.getElementById("form-itemUnitPrice1").value;
			
			if (document.getElementById("form-itemNameKo1") !=null) {
				var obj_itemNameKo = document.getElementById("form-itemNameKo1").value;
			}				
			if (document.getElementById("form-itemNameEn1") !=null) {
				var obj_itemNameEn = document.getElementById("form-itemNameEn1").value;
			}
			if (document.getElementById("form-makerName1") !=null) {
				var obj_makerName = document.getElementById("form-makerName1").value;
			}
			if (document.getElementById("form-classCode1") !=null) {
				var obj_classCode = document.getElementById("form-classCode1").value;
			}
			
			$("#" + obj_itemId).val(rowItem.itemId);
			$("#" + obj_itemName).val(rowItem.itemNo);
			$("#" + obj_itemUnitPrice).val(_cf_comma(rowItem.salePrice));
			
			$("#" + obj_itemNameKo).val(rowItem.itemName);
			$("#" + obj_itemNameEn).val(rowItem.itemNameEn);
			$("#" + obj_makerName).val(rowItem.makerName);
			$("#" + obj_classCode).val(rowItem.classCode);
			
			document.getElementById("form-itemId1").value = "";
			document.getElementById("form-itemNo1").value = "";
			document.getElementById("form-itemUnitPrice1").value = "";
			
			if (document.getElementById("form-itemNameKo1") !=null) {
				document.getElementById("form-itemNameKo1").value = "";
			}				
			if (document.getElementById("form-itemNameEn1") !=null) {
				document.getElementById("form-itemNameEn1").value = "";
			}
			if (document.getElementById("form-makerName1") !=null) {
				document.getElementById("form-makerName1").value = "";
			}
			if (document.getElementById("form-classCode1") !=null) {
				document.getElementById("form-classCode1").value = "";
			}
			
			if (document.getElementById("iDiv_rack_lst") !=null) {// 재고 수동처리에서 호출한 경우 이 객체가 존재
				findStockRackInfo('/logis/stock-rack-list',rowItem.itemId);
			}
			
		}else{  //그리드에서 팝업띄운경우
			item = {
				itemId: rowItem.itemId,
				itemNo: rowItem.itemNo,
				itemName: rowItem.itemName,
				itemNameEn: rowItem.itemNameEn,
				salePrice: rowItem.salePrice
				,unitPrice: rowItem.salePrice
				,cnt: 1
				,saleUnitPrice: rowItem.salePrice 
	   		    ,sumPrice: rowItem.salePrice * 1
	   		    ,centerPrice: rowItem.centerPrice
	   		    ,dcExceptYN: rowItem.dcExceptYN 
	   		    ,makerName : rowItem.makerName
	   		    ,makerCode : rowItem.makerCode // 
	   		    ,className : rowItem.className  //20240724 supi 구분, 공장번호// 품번돋보기로 다이얼로그창에서 부품 선택한후 다이얼로그의 auigrid 셀을 더블클릭할때  
				,factoryNo : rowItem.factoryNo
			};
			AUIGrid.updateRow(myGridID, item, "selectedIndex"); 
			//fn_dcProc();
			if (noDcProc != 'Y')
			{
				if(window.location.pathname == '/order/order-up')
				{
					order_dcProc();// 주문등록에서 부품이 추가되면 전체 할인율 마스터 할인율로 갱신하고 있기에 주문등록에서는 할인율이 설정안된 부품만(할인율이 0인) 마스터 할인율로 셋팅
				}
				else
				{ 
					fn_dcProc();  // 2024.05.13 hsg noDcProc 추가.할인율계산 안해야하는 경우
				}
			} 
			else if(window.location.pathname == '/order/order-up' )
				order_dcProc();
		}		
		var dialogItem;
		dialogItem = $("#dialog-form-item").dialog({
			//autoOpen: false,
			height: 700,
			//minWidth: 500,
			width: "70%",
			modal: true,
			headerHeight: 40,
			//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
			position: [400, 400],
			buttons: {
				"확인": updateGridRow,
				"취소": function(event) {
					dialogItem.dialog("close");
				}
			},
			close: function() {
				// $( "#users tbody tr td" ).empty();	   	
			}
		});

		dialogItem.dialog("close");
	});

}



$("#btnItemFind").click(function() {
	
	if (document.getElementById('srchEqualItemNo')) { //do stuff }
		$("#srchEqualItemNo").val();
	}
	
	//부품선택 팝업에서 조회버튼에 대한 부분인데 수동입출고의 경우 부품선택에서도 바코드반영된 조회함 
	if(window.location.pathname == '/logis/stock-wr-up') 
		findItem('/base/item-list', 0, 0, 'Y','','STOCKWRUP_LIST');
	else
		findItem('/base/item-list', 0, 0, 'Y');
});


/*
$("#btnCustFind").click(function() {
	findCust('', '', 0, 'Y');
});*/
//20230714 bk 
$("#btnCustFind").click(function() {
    var custSrch = $("#pop_cust_srch").val();
	var list = [];
    $.ajax({
        	type: "POST",
			url: "/base/cust-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"custSrch": custSrch
				,"validYN" : 'Y' //20231212 yoonsang 사용유무 Y인 거래처만 조회
			},
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            if (data.custList.length == 0) {
                alert("조건에 맞는 자료가 없습니다.");
                //AUIGrid.clearGridData(myGridID);
                AUIGrid.clearGridData(myGridIDCust);//2024.11.7 오류수정.  sg
            } else {
                	for (i = 0; i < data.custList.length; i++) {
								list.push({
									custType: data.custList[i].custType
									, custCode: data.custList[i].custCode
									, formalName: data.custList[i].formalName
									, custName: data.custList[i].custName
									, bizNo: data.custList[i].bizNo
									, ceoName: data.custList[i].ceoName
								});	
							}	
                AUIGrid.setGridData("#grid_wrap_cust", list);
                
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
});

$("#btnCustMgr").click(function() {
	findCustMgr('', '','', 0, 'Y');
});


//할인율 등록하는 경우 그리드의 할인단가와 합계액 처리
//function fn_dcProc(rowState, rowIndex, ceilYN, ceilUnit) {  //ceilYN:올림처리여부, 올림처리단위
function fn_dcProc(rowState, rowIndex) { 
	//rowStateCellClick 시에만 rowState, rowIndex 값이 넘어옴.. 
	 
	//할인가 개별표시인 경우 할인단가 처리
	var dcDspType = $(':radio[name="dcDspType"]:checked').val();
	if (isEmpty(dcDspType) == true) {
		dcDspType = 1;
	}
	
	var dcRate = $("#dcRate").val();
	if (isEmpty(dcRate) == true) {
		dcRate = 0;
	}
	
	//if (dcDspType ==1) {  //할인가 개별표시이면서 

	var rowCount = AUIGrid.getRowCount(myGridID);
	
	var rowIndexes = [];
	/* 
	for(i=0;i<rowCount;i++){
		rowIndexes[i] = i;
	}
	*/
	
	//rowIndexes = "["+rowIndexes+"]";
	//https://www.auisoft.net/board/bbs/board.php?bo_table=support&wr_id=735&sfl=wr_subject%7C%7Cwr_content&stx=updateRows&sop=and
	var items = [];

	var allItems = AUIGrid.getGridData(myGridID);
	var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
	var rowId;
	var j = 0;
	var sumPriceAmt = 0;
	var sumTaxPriceAmt = 0;
	var isRemoved;
	var ceilUnit = 0;   //2023.08.29 올림단위
	
	var taxType = $("#taxType").val();
	if (isEmpty(taxType) == true) {
		taxType = 1;
	}
	
	for (var i = 0, len = allItems.length; i < len; i++) {
		rowItem = allItems[i];
		rowId = rowItem[rowIdField];
		itemId = AUIGrid.getCellValue(myGridID, i, "itemId");
		isRemoved = AUIGrid.isRemovedById(myGridID, rowId);
		
		
		if (rowState == 'remove' && i == rowIndex) { //삭제상태를 클릭한 경우는 원래대로 복원되므로 계산시 반영되게...
			isRemoved = false;
		}
		//if (itemId != "" && itemId != 0 && typeof itemId != "undefined" && itemId != null){  //상품ID 존재하는 경우만

		if (itemId !== undefined && isRemoved == false ) {  //상품ID 존재하는 경우만
			
			rowIndexes[j] = i;
			j = j + 1;

			cnt = AUIGrid.getCellValue(myGridID, i, "cnt");
			unitPrice = AUIGrid.getCellValue(myGridID, i, "unitPrice");
			
			dcExceptYN = AUIGrid.getCellValue(myGridID, i, "dcExceptYN");
		   
		    if (dcExceptYN == 'Y' ) {
				dcRate
			}
			//var savePrice = unitPrice *(dcRate / 100);
			var savePrice = 0;
			if (dcDspType == 1 && dcExceptYN == 'N') {   //할인율 개별표시 및 
				savePrice = unitPrice * (dcRate / 100);
			}
			savePrice = Math.ceil(savePrice); //올림처리 2023.08.25
			
			var resultPrice = unitPrice - savePrice;
						
			// 절상처리 2023.08.25  //
			ceilUnit = AUIGrid.getCellValue(myGridID, i, "ceilUnit");  //올림단위
			//if (ceilYN == 'Y' && ceilUnit >=10){
			//	console.log("ceilUnit:"+ceilUnit);
		    //	console.log("savePrice:"+savePrice);
			//console.log("resultPrice:"+resultPrice);			
			if (ceilUnit === undefined || ceilUnit ==0) {
				//console.log("a");
				ceilUnit = 0;
			}else{
				//console.log("b");
				resultPrice = Math.ceil(resultPrice/ceilUnit) * ceilUnit;
			}	
			//}
			////
			
			var taxPrice = 0;
			var sumPrice = 0;
			var salePrice = 0;
			var sumTaxPrice = 0;
			var resultPrice2 = resultPrice;
			if(taxType == 1){
				salePrice = resultPrice;
				sumPrice = resultPrice * cnt;
				taxPrice = Math.round(resultPrice * 0.1);
				sumTaxPrice = taxPrice*cnt;
				
						
			}else{
				resultPrice = Math.round(resultPrice/1.1);
				salePrice = resultPrice;
				sumPrice = resultPrice * cnt;
				taxPrice =  resultPrice2- resultPrice;
				sumTaxPrice = taxPrice*cnt;
				
			}
			
			//var sumPrice = resultPrice * cnt;   // 합계 = 수량 + 단가
			
			var item = {
				salePrice: resultPrice //,	isChecked: event.checked
				, sumPrice: sumPrice
				, taxPrice: taxPrice
			//	, curSaleRate : dcRate
			}; 
			items.push(item);
			

			sumPriceAmt = sumPriceAmt + sumPrice;
			sumTaxPriceAmt = sumTaxPriceAmt + sumTaxPrice
			
			
		}
	}
	

	AUIGrid.updateRows(myGridID, items, rowIndexes); // 3개 업데이트
	
//	if(window.location.pathname == '/order/order-up')
//	{
//		setItemBrandSaleRate(true );
//	}

	//합계액 : 세액 별도면 sumPriceAmt 가 공급가. 무이거나 포함이며 합계액
	
	$("#salePrice").val(_cf_comma(sumPriceAmt));
	$("#taxPrice").val(_cf_comma(sumTaxPriceAmt));
	$("#sumPrice").val(_cf_comma(sumPriceAmt + sumTaxPriceAmt));	
	/*
	if (taxType == 1) { //별도
		$("#salePrice").val(_cf_comma(sumPriceAmt));  // 공급가에  input에 노출

		//var vatVal = _cf_vat('Y',sumPriceAmt);  // 공급가^세액
		//var vatValArr = vatVal.split("^");

		var vatPrice = Math.round(sumPriceAmt * 0.1);
		var vatSumPrice = sumPriceAmt + vatPrice;

		$("#taxPrice").val(_cf_comma(vatPrice));
		$("#sumPrice").val(_cf_comma(vatSumPrice));
	} else {
		$("#sumPrice").val(_cf_comma(sumPriceAmt));  // 합계액 input에 노출

		var vatVal = _cf_vat('N', sumPriceAmt);  // 공급가^세액
		var vatValArr = vatVal.split("^");

		$("#salePrice").val(_cf_comma(vatValArr[0]));
		$("#taxPrice").val(_cf_comma(vatValArr[1]));
	}
	*/

	// 공급가,세액
	//var sumPrice = AUIGrid.getFooterValueByDataField(myGridID, "sumPrice");

	//한글금액
	if ($("#sumPrice").length > 0) {  //2023.09.26
		var sumPriceRpl = $("#sumPrice").val().replace(/,/gi, "");
			
		//sumPriceRpl.toString()
		//var sumPriceKor = _cf_numToKor($("#sumPrice").val().toString());
		
		var sumPriceKor = _cf_numToKor(sumPriceRpl);
		$("#sumPriceKor").val(sumPriceKor);
	}	

	/*
		var rowIdField = AUIGrid.getProp(event.pid, "rowIdField");
		rows.forEach(function (v, n) {
			var savePrice = originPrice *(dcRate / 100);
			var resultPrice = originPrice - savePrice;
	
			var item = {
				salePrice: resultPrice //,	isChecked: event.checked
				};
			items.push(item);
		});
	
		//var items = [{ name: "이름 변경-8", country: "나라 변경-8" },
		//	{ name: "이름 변경-9", country: "나라 변경-9" },
		//	{ name: "이름 변경-10", country: "나라 변경-10" }];
		//var rowIndexes = [8, 9, 10];
	
			// 복수의 행들 업데이트. items 과 rowIndexes 의 개수가 일치해야 함.
		AUIGrid.updateRows(myGridID, items, rowIndexes); // 3개 업데이트
	*/

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: 상품 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////  BEGIN: 거래처 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// 상품 칼럼 레이아웃 작성
var columnLayoutCust = [
	{ dataField: "custType", headerText: "업체구분", width: 100, visible: false }
	, { dataField: "custCode", headerText: "거래처코드", width: 120 }
	, { dataField: "custName", headerText: "거래처명(약명)", width: 220, style: "left" }
	, { dataField: "formalName", headerText: "거래처명(정식명)", width: 220, style: "left" }
	, { dataField: "bizNo", headerText: "사업자번호" }
	, { dataField: "ceoName", headerText: "대표자명" }
];

//거래처코드로 거래처 정보 추출 
/*
function findCust(obj, name, page, popYN) {

	//초기화
	//$("#pop_custCode").val();
	//$("#pop_custName").val();
	$("#pop_cust_srch").val();

	//부모창의 값 세
	if (popYN != 'Y') {
		//$("#pop_custCode").val(obj.value);
		$("#pop_cust_srch").val(obj.value);
	}

	var list = [];

	$("#" + name + "").val("");

	if (window.event.keyCode == 13 || popYN == 'Y') { //엔터키를 치거나 팝업에서 검색버튼 클릭한 경우 (popYN='Y')
		// 엔터키가 눌렸을 때


		//var custCode = "";
		//var custName = "";
		var custSrch = "";

		if (popYN == 'Y') {
			//custCode = $("#pop_custCode").val();
			//custName = $("#pop_custName").val();

			custSrch = $("#pop_cust_srch").val();
		} else {
			//custCode = $(obj).val();
			custSrch = $(obj).val();
		}
		//return;
		$.ajax({
			type: "POST",
			url: "/base/cust-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"custSrch": custSrch
				//"custCode":custCode,
				//"custName":custName			
			},
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {


				if (data.custList.length != 1 || popYN == 'Y') {
					//거래처
					var dialogCust;
					dialogCust = $("#dialog-form-cust").dialog({
						//autoOpen: false,
						height: 700,
						//minWidth: 500,
						width: "50%",
						modal: true,
						headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position: [400, 400],
						buttons: {
							"확인": function(event) {
								updateGridRowCust(obj, name);
							}, //		,
							"취소": function(event) {
								dialogCust.dialog("close");
							}
						},
						close: function() {
							// $( "#users tbody tr td" ).empty();	   	
						}
					});

					//alert("조건에 맞는 자료가 없습니다.");
					// 그리드 생성 후 해당 ID 보관 변수
					var myGridIDCust;
					// AUIGrid 그리드를 생성합니다.
					if (popYN == 'Y') {
						createGridCust(columnLayoutCust, obj, name);
					} else {
						createGridCust(columnLayoutCust, obj, name);

						dialogCust.dialog("open");
					}
					
					for (i = 0; i < data.custList.length; i++) {
						list.push({
							custType: data.custList[i].custType
							, custCode: data.custList[i].custCode
							, formalName: data.custList[i].formalName
							, custName: data.custList[i].custName
							, bizNo: data.custList[i].bizNo
							, ceoName: data.custList[i].ceoName
						});
						//firstGrid_mst.setData(list); // 그리드에 데이터 설정
					}
					AUIGrid.setGridData("#grid_wrap_cust", list);
					
					// 해당 페이지로 이동
					if (page > 1) {
						AUIGrid.movePageTo(myGridIDCust, Number(page));
					}
				} else {
					for (i = 0; i < data.custList.length; i++) {
						obj.value = data.custList[i].custCode;
						$("#" + name + "").val(data.custList[i].custName);
					}
				}
				$(".ui-dialog-titlebar-close").html("X");
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
}

*/
//여깅
function findCust(obj, name, page, popYN,onGrid){
	
	//초기화
	//$("#pop_custCode").val();
	//$("#pop_custName").val();
	//$("#pop_cust_srch").val();
	//console.log ("11111111"+ $("#pop_cust_srch").val())
	//$("#pop_cust_srch").val(obj.value);
	//console.log ("222222"+ $("#pop_cust_srch").val(obj.value))
	var list = [];
	$("#" + name + "").val("");
	
	//if (window.event.keyCode == 13 ) {//엔터키를 쳤을경우
	if (event.keyCode == 13 ) {		
	
		if (popYN == 'Y'){
				$("#pop_cust_srch").val();
				var custSrch = "";
				custSrch = $("#pop_cust_srch").val();
		} else{
			$("#pop_cust_srch").val(obj.value);
			var custSrch = "";
			custSrch = $("#pop_cust_srch").val();
		}
		//console.log("custSrch : " + custSrch);
		
		$.ajax({
			type: "POST",
			url: "/base/cust-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"custSrch": custSrch
				,"validYN":'Y'	//20231212 yoonsang 사용유무 Y인 거래처만 조회
				//"custCode":custCode,
				//"custName":custName			
			},
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {
				if (data.custList.length != 1) { //데이터가 1건이 아닌경우 
					//거래처
					var dialogCust;
						dialogCust = $("#dialog-form-cust").dialog({
							//autoOpen: false,
							height: 700,
							//minWidth: 500,
							width: "50%",
							modal: true,
							headerHeight: 40,
							//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
							position: [400, 400],
							buttons: {
								"확인": function(event) {
									updateGridRowCust(obj, name);
								}, //		,
								"취소": function(event) {
									dialogCust.dialog("close");
								}
							},open: function(){
									//console.log(222222);
								/*	if (onGrid == 'Y'){
									var targetGridID = "#dialog-form-cust";
									var targetGrid = AUIGrid.gridManager.getGrid(targetGridID);
									if (targetGrid) {
											      targetGrid.focus(); // 대상 그리드로 포커스 이동
											    }
										}						*/				
									$("#grid_wrap_cust").focus();
									$("#pop_cust_srch").focus();

									AUIGrid.setProp(myGridID, { "onlyEnterKeyEditEnd" : true } );
								},
							close: function() {
								// $( "#users tbody tr td" ).empty();	 
								AUIGrid.setProp(myGridID, { "onlyEnterKeyEditEnd" : false } );
							}
						});
					//alert("조건에 맞는 자료가 없습니다.");
					// 그리드 생성 후 해당 ID 보관 변수
						var myGridIDCust;
					// AUIGrid 그리드를 생성합니다.
						if (popYN == 'Y') {
							createGridCust(columnLayoutCust, obj, name,onGrid);
						} else {
							createGridCust(columnLayoutCust, obj, name,onGrid);
							dialogCust.dialog("open");
						}				
					for (i = 0; i < data.custList.length; i++) {
						list.push({
							custType: data.custList[i].custType
							, custCode: data.custList[i].custCode
							, formalName: data.custList[i].formalName
							, custName: data.custList[i].custName
							, bizNo: data.custList[i].bizNo
							, ceoName: data.custList[i].ceoName
						});
						//firstGrid_mst.setData(list); // 그리드에 데이터 설정
				}
					AUIGrid.setGridData("#grid_wrap_cust", list);		
					// 해당 페이지로 이동
					if (page > 1) {
						AUIGrid.movePageTo(myGridIDCust, Number(page));
					}
				} else { //데이터가 1건인 경우 
					//console.log("check in else")
					//console.log("onGrid : " + onGrid)
					if(onGrid != 'Y'){
						if(popYN == 'Y'){
							var dialogCust;
							dialogCust = $("#dialog-form-cust").dialog({
							//autoOpen: false,
							height: 700,
							//minWidth: 500,
							width: "50%",
							modal: true,
							headerHeight: 40,
							//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
							position: [400, 400],
							buttons: {
								"확인": function(event) {
									updateGridRowCust(obj, name);
								}, //		,
								"취소": function(event) {
									dialogCust.dialog("close");
								}
							},
							close: function() {
								// $( "#users tbody tr td" ).empty();	   	
							}
						});
					//alert("조건에 맞는 자료가 없습니다.");
					// 그리드 생성 후 해당 ID 보관 변수
						var myGridIDCust;
						createGridCust(columnLayoutCust, obj, name,onGrid);
								for (i = 0; i < data.custList.length; i++) {
								list.push({
									custType: data.custList[i].custType
									, custCode: data.custList[i].custCode
									, formalName: data.custList[i].formalName
									, custName: data.custList[i].custName
									, bizNo: data.custList[i].bizNo
									, ceoName: data.custList[i].ceoName
								});	
							}	
							AUIGrid.setGridData("#grid_wrap_cust", list);		
					// 해당 페이지로 이동
							if (page > 1) {
								AUIGrid.movePageTo(myGridIDCust, Number(page));
							}
						}else{
							for (i = 0; i < data.custList.length; i++) {
									obj.value = data.custList[i].custCode;
									$("#" + name + "").val(data.custList[i].custName);
									
									if(window.location.pathname == '/order/order-up' && $(obj).attr('id') == 'custCode')
									{
										//20240617 supi 주문등록에서 주문처 변경이 3곳으로 분리되어 있어서 여긴 팝업없이 그냥 타이핑후 엔터칠경우 
										getCustSaleDcRateList();
									}
							}							
						}							
					}if(onGrid == 'Y'){
						for (i = 0; i < data.custList.length; i++) {
							item = {
								placeCustCode: data.custList[i].custCode,
								placeCustName: data.custList[i].custName,
								custCode: data.custList[i].custCode,
								custName: data.custList[i].custName,
							};
							AUIGrid.updateRow(myGridID, item, "selectedIndex");
						}
					}					
				}
				$(".ui-dialog-titlebar-close").html("X");
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
	}else{//엔터키를 안쳤을경우
			if (onGrid == 'Y'){
			$("#pop_cust_srch").val(obj.value);
			var custSrch = "";
			custSrch = $("#pop_cust_srch").val();
		
		//console.log("custSrch : " + custSrch);
		
		$.ajax({
			type: "POST",
			url: "/base/cust-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"custSrch": custSrch
				//"custCode":custCode, 
				//"custName":custName			
			},
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {
				if (data.custList.length != 1) { //데이터가 1건이 아닌경우 
					//거래처
					if (onGrid == 'Y'){
					var dialogCust;
						dialogCust = $("#dialog-form-cust").dialog({
							//autoOpen: false,
							height: 700,
							//minWidth: 500,
							width: "50%",
							modal: true,
							headerHeight: 40,
							//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
							position: [400, 400],
							buttons: {
								"확인": function(event) {
									updateGridRowCust(obj, name);
								}, //		,
								"취소": function(event) {
									dialogCust.dialog("close");
								}
							},
							close: function() {
								// $( "#users tbody tr td" ).empty();	   	
							}
						});
					//alert("조건에 맞는 자료가 없습니다.");
					// 그리드 생성 후 해당 ID 보관 변수
						var myGridIDCust;
					// AUIGrid 그리드를 생성합니다.
							createGridCust(columnLayoutCust, obj, name,onGrid);
							dialogCust.dialog("open");
						}				
					for (i = 0; i < data.custList.length; i++) {
						list.push({
							custType: data.custList[i].custType
							, custCode: data.custList[i].custCode
							, formalName: data.custList[i].formalName
							, custName: data.custList[i].custName
							, bizNo: data.custList[i].bizNo
							, ceoName: data.custList[i].ceoName
						});
						//firstGrid_mst.setData(list); // 그리드에 데이터 설정
				}
					AUIGrid.setGridData("#grid_wrap_cust", list);		
					// 해당 페이지로 이동
					if (page > 1) {
						AUIGrid.movePageTo(myGridIDCust, Number(page));
					}
				} else { //데이터가 1건인 경우 
					//console.log("check in else")
					//console.log("onGrid : " + onGrid)
					if(onGrid == 'Y'){
						for (i = 0; i < data.custList.length; i++) {
							item = {
								placeCustCode: data.custList[i].custCode,
								placeCustName: data.custList[i].custName,
							};
							AUIGrid.updateRow(myGridID, item, "selectedIndex");
						}
					}					
				}
				$(".ui-dialog-titlebar-close").html("X");
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
	}
}

function createGridCust(columnLayoutCust, obj, name,onGrid ) {
	//2023.07.24 hsg -- for enterKey, Global Vairable
	wvar_obj = obj;
	wvar_name = name;
	wvar_onGrid = onGrid;
	
//	console.log("onGridW:"+onGridW);
	var auiGridProps = {
		// 페이징 사용		
		usePaging: true,
		enableFocus: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		selectionMode: "multipleCells",
		showAutoNoDataMessage: false,

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDCust = AUIGrid.create("#grid_wrap_cust", columnLayoutCust, auiGridProps);

	var rowPos = 'first';

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridIDCust, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	//230720 yoonsang 수정
	AUIGrid.bind(myGridIDCust, "cellDoubleClick", function(event) {
		var i, rowItem, rowInfoObj, dataField;
		var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
		rowInfoObj = selectedItems[0];
		rowItem = rowInfoObj.item;
		//console.log("gridCustCode : " + gridCustCode)
		//if ($('#grid-custCode1').is(':visible') == true) {  //상단 배너가 존재하는 경우
		if (onGrid == 'Y' ) {  //그리드에서 팝업한 경우
			var gridCustCode = $("#grid-custCode1").val();
			//console.log("gridCustCode : " + gridCustCode)
			if (gridCustCode == 'rcvCustCode') {					
				item = {
					rcvCustCode: rowItem.custCode,
					rcvCustName: rowItem.custName,
				};
			}else if (gridCustCode == 'placeCustCode') {	
				item = {
					placeCustCode: rowItem.custCode,
					placeCustName: rowItem.custName,
				};
			}else if (gridCustCode == 'consignCustCode') {	//2023.08.24
				item = {
					consignCustCode: rowItem.custCode,
					consignCustName: rowItem.custName,
				};
			}else if (gridCustCode == 'consignCoworkCustCode') {	//2023.11.08
				item = {
					consignCoworkCustCode: rowItem.custCode,
					consignCoworkCustName: rowItem.custName,			
				};			
			}else {
				item = {
					custCode: rowItem.custCode,
					custName: rowItem.custName,
				};
			}
			document.getElementById("grid-custCode1").value = "";
			document.getElementById("grid-custName1").value = "";
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		} else { 
			//updateGridRowCust("placeCustCode", "placeCustName", 'Y'); //230720 yoonsang 추가
			$(obj).val(rowItem.custCode);
			$("#" + name + "").val(rowItem.custName);
			
			//20240617 supi 주문처 변경이 3곳으로 분리되어 있어서 여긴 팝업에서 그리드를 직접 클릭시 
			if(window.location.pathname == '/order/order-up' && $(obj).attr('id') == 'custCode') //주문등록에서 주문처 팝업에서 그리드 셀 더블클릭으로 선택된 경우
			{
				//console.log($(obj).val());
				getCustSaleDcRateList();//주문처 변경으로 할인율 리스트 정보를 선택된 주문처의 것으로 셋팅
			}
		}

		var dialogCust;
		dialogCust = $("#dialog-form-cust").dialog({
			//autoOpen: false,
			height: 700,
			//minWidth: 500,
			width: "70%",
			modal: true,
			headerHeight: 40,
			//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
			position: [400, 400],
			buttons: {
				"확인": updateGridRow,
				"취소": function(event) {
					dialogCust.dialog("close");
				}
			},
			close: function() {
				// $( "#users tbody tr td" ).empty();	   	
			}
		});

		dialogCust.dialog("close");
	});

	AUIGrid.bind(myGridIDCust, "keyDown", function(event) {
		
		if (event.keyCode == 13) { // Insert 키

			var i, rowItem, rowInfoObj, dataField;
			var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
			rowInfoObj = selectedItems[0];
			rowItem = rowInfoObj.item;
			$(obj).val(rowItem.custCode);
			$("#" + name + "").val(rowItem.custName);

			var dialogCust;
			dialogCust = $("#dialog-form-cust").dialog({
				//autoOpen: false,
				height: 700,
				//minWidth: 500,
				width: "70%",
				modal: true,
				headerHeight: 40,
				//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
				position: [400, 400],
				buttons: {
					"확인": updateGridRow,
					"취소": function(event) {
						dialogCust.dialog("close");
					}
				},
				close: function() {
					// $( "#users tbody tr td" ).empty();	   	
				}
			});

			dialogCust.dialog("close");

			return false; // 기본 행위 안함.
		}
	});

}
/* 
function createGridCust(columnLayoutCust, obj, name) {

	var auiGridProps = {
		// 페이징 사용		
		usePaging: true,
		enableFocus: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		selectionMode: "multipleCells",

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDCust = AUIGrid.create("#grid_wrap_cust", columnLayoutCust, auiGridProps);

	var rowPos = 'first';

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridIDCust, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridIDCust, "cellDoubleClick", function(event) {
		var i, rowItem, rowInfoObj, dataField;
		var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
		rowInfoObj = selectedItems[0];
		rowItem = rowInfoObj.item;
		
		//if ($('#grid-custCode1').is(':visible') == true) {  //상단 배너가 존재하는 경우
		
		if (document.getElementById("grid-custCode1")  != null && document.getElementById("grid-custCode1").value !='' ) {  //그리드에서 팝업한 경우
			var gridCustCode = document.getElementById("grid-custCode1").value;
			var gridCustName = document.getElementById("grid-custName1").value;
			
			if (gridCustCode == 'rcvCustCode') {					
				item = {
					rcvCustCode: rowItem.custCode,
					rcvCustName: rowItem.custName,
				};
			}else if (gridCustCode == 'placeCustCode') {	
								
				item = {
					placeCustCode: rowItem.custCode,
					placeCustName: rowItem.custName,
				};
			}else {
				item = {
					custCode: rowItem.custCode,
					custName: rowItem.custName,
				};
			}
			document.getElementById("grid-custCode1").value = "";
			document.getElementById("grid-custName1").value = "";
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
		} else { 
			
			
			$(obj).val(rowItem.custCode);
			$("#" + name + "").val(rowItem.custName);
		}

		var dialogCust;
		dialogCust = $("#dialog-form-cust").dialog({
			//autoOpen: false,
			height: 700,
			//minWidth: 500,
			width: "70%",
			modal: true,
			headerHeight: 40,
			//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
			position: [400, 400],
			buttons: {
				"확인": updateGridRow,
				"취소": function(event) {
					dialogCust.dialog("close");
				}
			},
			close: function() {
				// $( "#users tbody tr td" ).empty();	   	
			}
		});

		dialogCust.dialog("close");
	});

	AUIGrid.bind(myGridIDCust, "keyDown", function(event) {
		if (event.keyCode == 13) { // Insert 키

			var i, rowItem, rowInfoObj, dataField;
			var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
			rowInfoObj = selectedItems[0];
			rowItem = rowInfoObj.item;
			$(obj).val(rowItem.custCode);
			$("#" + name + "").val(rowItem.custName);

			var dialogCust;
			dialogCust = $("#dialog-form-cust").dialog({
				//autoOpen: false,
				height: 700,
				//minWidth: 500,
				width: "70%",
				modal: true,
				headerHeight: 40,
				//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
				position: [400, 400],
				buttons: {
					"확인": updateGridRow,
					"취소": function(event) {
						dialogCust.dialog("close");
					}
				},
				close: function() {
					// $( "#users tbody tr td" ).empty();	   	
				}
			});

			dialogCust.dialog("close");

			return false; // 기본 행위 안함.
		}
	});

}
*/
/* 
	거래처 엔터검색, 아래방향키눌러서 그리드선택
*/
function fnKeyUpCust() {

	if (window.event.keyCode == 13) {
		findCust('', '', 0, 'Y');
		//$("#grid_wrap_cust").focus();

	}
	if (window.event.keyCode == 40) {
		AUIGrid.setSelectionByIndex(myGridIDCust, 0, 2);
	}

}

//  == fnKeyUpCust()
$("#pop_cust_srch").keyup(function() {
	//console.log("onGridW:"+onGridW);
	if (wvar_onGrid === undefined) {
		wvar_onGrid = '';
	}
	if (window.event.keyCode == 13) {
		//findCust('', '', 0, 'Y');  //function findCust(obj, name, page, popYN,onGrid){
		findCust(wvar_obj, wvar_name, 0, 'Y',wvar_onGrid);   //2023.07.24 hsg -- by enterKey, obj find
		//$("#grid_wrap_cust").focus();

	}
	if (window.event.keyCode == 40) {
		AUIGrid.setSelectionByIndex(myGridIDCust, 0, 2);
	}
		

});



$("#pop_custMgrName").keydown(function() {
	if (window.event.keyCode == 13) {
		findCustMgr('', '','', 0, 'Y');
		//$("#grid_wrap_cust").focus();

	}
	if (window.event.keyCode == 40) {
		AUIGrid.setSelectionByIndex(myGridIDCustMgr, 0, 2);
	}
});

//거래처 담당자
// 상품 칼럼 레이아웃 작성
var columnLayoutCustMgr = [
	{ dataField: "idx", headerText: "idx", width: 50, editable: false, visible: false }
	, { dataField: "mgrIdx", headerText: "담당자idx", width: 140, editable: false, visible: false }
	, {
		dataField: "name", headerText: "담당자명*", width: 140
		, headerTooltip: { // 헤더 툴팁 표시 HTML 양식
			show: true,
			tooltipHtml: '필수입력값입니다.'
		}
	}
	, { dataField: "position", headerText: "직책*", width: 120 }
	, { dataField: "role", headerText: "직무", width: 120 }
	, { dataField: "phone1", headerText: "전화번호1*" }
	, { dataField: "phone2", headerText: "전화번호2"}
	, { dataField: "email", headerText: "이메일" }
	, {
		dataField: "validYN", headerText: "유효여부",
		style: "aui-grid-user-custom",
		//headerTooltip : {
		//	show : true,
		//	tooltipHtml : "In Charge 가 Anna 인 경우 사용자가 수정 못하게 막음.<br/>(선택적 체크박스 수정 여부 판단)"
		//},
		styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
			if (value == "Y") {
				return "my-inactive-style";
			} else if (value == "N") {
				return "my-active-style";
			}
			return "";
		},
		renderer: {
			type: "CheckBoxEditRenderer",
			showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue: "Y", // true, false 인 경우가 기본
			unCheckValue: "N",

			//사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
			checkableFunction: function(rowIndex, columnIndex, value, isChecked, item, dataField) {
				// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
				if (item.charge == "Anna") {
					return false;
				}
				return true;
			}
		}
	}
	, { dataField: "memo", headerText: "비고" }
];



//거래처코드로 거래처 정보 추출 
function findCustMgr(obj, name, code, page,popYN,name2) {
	
	   if (window.event.keyCode != 13 && popYN != 'Y') {
	   		return false;
	   } 

    	$("#" + name + "").val("");
    	$("#" + name2 + "").val("");
    
		//var custName = $("#pop_custMgrName").val();
		$("#pop_custMgrName").val();
		
		if (popYN != 'Y') {
				$("#pop_custMgrName").val(obj.value);	}
				var list = [];
		// 엔터키가 눌렸을 때		
		
		if (window.event.keyCode == 13 || popYN == 'Y') { //엔터키를 치거나 팝업에서 검색버튼 클릭한 경우 (popYN='Y')
		// 엔터키가 눌렸을 때
		var custCode = $("#" + code + "").val();

		//var custCode = "";
		//var custName = "";
		var custSrch = "";

		if (popYN == 'Y') {
			//custCode = $("#pop_custCode").val();
			//custName = $("#pop_custName").val();

			custSrch = $("#pop_custMgrName").val();
		} else {
			//custCode = $(obj).val();
			custSrch = $(obj).val();
		}	
		
		$.ajax({
			type: "POST",
			url: "/base/cust-mgr-list",
			dataType: "json",
			data: {
				"workingType": "LIST",
				"custCode": custCode,
				"custSrch": custSrch
			},
			async: false,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {
				
				if (data.custMgrList.length != 1 ) {
					//거래처
					var dialogCustMgr;
					dialogCustMgr = $("#dialog-form-custMgr").dialog({
						//autoOpen: false,
						height: 700,
						//minWidth: 500,
						width: "70%",
						modal: true,
						headerHeight: 40,
						//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
						position: [400, 400],
						buttons: {
						"확인":function(event) {updateGridRowCustMgr(obj, name);},			
							"취소": function(event) {
								dialogCustMgr.dialog("close");
							}
						},
						close: function() {
							// $( "#users tbody tr td" ).empty();	   	
						}
					});

					//alert("조건에 맞는 자료가 없습니다.");
					// 그리드 생성 후 해당 ID 보관 변수
					var myGridIDCustMgr;
					var enterSelect = 1;
					// AUIGrid 그리드를 생성합니다.
					createGridCustMgr(columnLayoutCustMgr, obj, name,name2);
					dialogCustMgr.dialog("open");
						
						if (popYN == 'Y') {
							}else {
						createGridCustMgr(columnLayoutCustMgr, obj, name,name2);
						dialogCustMgr.dialog("open");
					}

					for (i = 0; i < data.custMgrList.length; i++) {
						list.push({
							idx: data.custMgrList[i].mgrIdx
							, mgrIdx: data.custMgrList[i].mgrIdx
							, name: data.custMgrList[i].name
							, custName: data.custMgrList[i].custName
							, position: data.custMgrList[i].position
							, role: data.custMgrList[i].role
							, phone1: data.custMgrList[i].phone1
							, phone2: data.custMgrList[i].phone2
							, email: data.custMgrList[i].email
							, validYN: data.custMgrList[i].validYN
							, memo: data.custMgrList[i].memo
						});
						//firstGrid_mst.setData(list); // 그리드에 데이터 설정
					}
					AUIGrid.setGridData("#grid_wrap_custMgr", list);
					
					// 해당 페이지로 이동
					if (page > 1) {
						AUIGrid.movePageTo(myGridIDCustMgr, Number(page));
					}
				} else {// length == 1 
					for (i = 0; i < data.custMgrList.length; i++) {
						
						if (popYN == 'Y') {
							list.push({
								idx: data.custMgrList[i].mgrIdx
								, mgrIdx: data.custMgrList[i].mgrIdx
								, name: data.custMgrList[i].name
								, custName: data.custMgrList[i].custName
								, position: data.custMgrList[i].position
								, role: data.custMgrList[i].role
								, phone1: data.custMgrList[i].phone1
								, phone2: data.custMgrList[i].phone2
								, email: data.custMgrList[i].email
								, validYN: data.custMgrList[i].validYN
								, memo: data.custMgrList[i].memo
							});
						   AUIGrid.setGridData("#grid_wrap_custMgr", list);
						}else{
							obj.value = data.custMgrList[i].name;
							$("#" + name + "").val(data.custMgrList[i].phone1);
							$("#" + name2 + "").val(data.custMgrList[i].phone2);
						}
					}
				}
				$(".ui-dialog-titlebar-close").html("X");
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
}


function createGridCustMgr(columnLayoutCustMgr, obj, name,name2) {

	var auiGridProps = {
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		selectionMode: "multipleCells",

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDCustMgr = AUIGrid.create("#grid_wrap_custMgr", columnLayoutCustMgr, auiGridProps);

	var rowPos = 'first';

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridIDCustMgr, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridIDCustMgr, "cellDoubleClick", function(event) {
		var i, rowItem, rowInfoObj, dataField;
		var selectedItems = AUIGrid.getSelectedItems(myGridIDCustMgr);
		rowInfoObj = selectedItems[0];
		rowItem = rowInfoObj.item;
		
		$(obj).val(rowItem.name);
		$("#" + name + "").val(rowItem.phone1);
		$("#" + name2 + "").val(rowItem.phone2);

		var dialogCustMgr;
		dialogCustMgr = $("#dialog-form-custMgr").dialog({
			//autoOpen: false,
			height: 700,
			//minWidth: 500,
			width: "70%",
			modal: true,
			headerHeight: 40,
			//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
			position: [400, 400],
			buttons: {
				"확인": updateGridRow,
				
				"취소": function(event) {
					dialogCustMgr.dialog("close");
				}
			},
			close: function() {
				// $( "#users tbody tr td" ).empty();	   	
			}
		});

		dialogCustMgr.dialog("close");
	});

	AUIGrid.bind(myGridIDCustMgr, "keyDown", function(event) {
		if (event.keyCode == 13) { // Insert 키

			var i, rowItem, rowInfoObj, dataField;
			var selectedItems = AUIGrid.getSelectedItems(myGridIDCustMgr);
			rowInfoObj = selectedItems[0];
			rowItem = rowInfoObj.item;
			
			$(obj).val(rowItem.name);
			$("#" + name + "").val(rowItem.phone1);
			$("#" + name2 + "").val(rowItem.phone2);

			var dialogCustMgr;
			dialogCustMgr = $("#dialog-form-custMgr").dialog({
				//autoOpen: false,
				height: 700,
				//minWidth: 500,
				width: "70%",
				modal: true,
				headerHeight: 40,
				//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
				position: [400, 400],
				buttons: {
					"확인": updateGridRow,
					"취소": function(event) {
						dialogCustMgr.dialog("close");
					}
				},
				close: function() {
					// $( "#users tbody tr td" ).empty();	   	
				}
			});

			dialogCustMgr.dialog("close");
			return false;
		}
	});

}
/*
거래처담당자 키다운 엔터 설정
 */
$("#pop_custMgrName").keyup(function() {
	
	if (window.event.keyCode == 13) {
		//findCustMgr('','','');
		//$("#grid_wrap_cust").focus();

	}
	if (window.event.keyCode == 40) {
		AUIGrid.setSelectionByIndex(myGridIDCustMgr, 0, 2);
	}

});



/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: 거래처 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN: 견적-수입계산기 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//  칼럼 레이아웃 작성
var cargoGroup = [{ "code": "기본", "value": "기본" }, { "code": "A", "value": "A코드" }, { "code": "B", "value": "B코드" }, { "code": "C", "value": "C코드" }, { "code": "D", "value": "D코드" }, { "code": "E", "value": "E코드" }];

var columnLayoutImportCalc = [
	{ dataField: "idx", headerText: "idx", width: 50, editable: false }
	, { dataField: "estiSeq", headerText: "견적순번*", width: 50, editable: false }
	, { dataField: "itemId", headerText: "부품ID", width: 140, editable: false }
	, {
		dataField: "itemNo", headerText: "품번*", width: 140, editable: false
		, headerTooltip: { // 헤더 툴팁 표시 HTML 양식
			show: true,
			tooltipHtml: '필수입력값입니다.'
		}
	}
	, { dataField: "itemName", headerText: "품명", width: 120, editable: false }
	, { dataField: "itemNameEn", headerText: "영문품명", width: 120, editable: false }
	, {
		dataField: "cargoGroupCode", headerText: "화물분류", width: 120,
		renderer: {
			type: "DropDownListRenderer",
			list: cargoGroup,
			keyField: "code", // key 에 해당되는 필드명
			valueField: "value" // value 에 해당되는 필드명
		}
	}
	, { dataField: "salePrice", headerText: "국내판매가", datype: "numeric" }

	, {
		headerText: "DEKO",
		children: [{
			dataField: "dekoEuroPrice",
			headerText: "해외가",
			dataType: "numeric"
		},
		{
			dataField: "dekoEuroKrwPrice",
			headerText: "환율적용(예상)",
			dataType: "numeric"
		},
		{
			dataField: "dekoEuro",
			headerText: "할인율(예상)",
			dataType: "numeric"
		}]
	}
	, {
		headerText: "EAPS(유럽)",
		children: [{
			dataField: "eapsEuroPrice",
			headerText: "해외가",
			dataType: "numeric"
		},
		{
			dataField: "eapsEuroKrwPrice",
			headerText: "환율적용(예상)",
			dataType: "numeric"
		},
		{
			dataField: "eapsEuro",
			headerText: "할인율(예상)",
			dataType: "numeric"
		}]
	}
	, {
		headerText: "EAPS(미국)",
		children: [{
			dataField: "eapsDollarPrice",
			headerText: "해외가",
			dataType: "numeric"
		},
		{
			dataField: "eapsDollarKrwPrice",
			headerText: "환율적용(예상)",
			dataType: "numeric"
		},
		{
			dataField: "eapsDollar",
			headerText: "할인율(예상)",
			dataType: "numeric"
		}]
	}
];


// 정보 조회
function findImportCalc(url, page) {
	$(".ui-dialog-titlebar-close").html("X");
	var dialogImportCalc;
	dialogImportCalc = $("#dialog-form-importcalc").dialog({
		//autoOpen: false,
		height: 700,
		//minWidth: 500,
		width: "90%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			"확인": updateGridRow,
			"취소": function(event) {
				dialogImportCalc.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	
		}
	});

	//alert("조건에 맞는 자료가 없습니다.");
	// 그리드 생성 후 해당 ID 보관 변수
	var myGridIDImportCalc;
	// AUIGrid 그리드를 생성합니다.


	dialogImportCalc.dialog("open");

	createGridImportCalc(columnLayoutImportCalc);

	var list = [];
	var estiNo = $("#estiNo").val();

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"estiNo": estiNo
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.estiImportCalcList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.estiImportCalcList.length; i++) {
					list.push({
						idx: data.estiImportCalcList[i].estiSeq
						, estiSeq: data.estiImportCalcList[i].estiSeq
						, itemId: data.estiImportCalcList[i].itemId
						, itemNo: data.estiImportCalcList[i].itemNo
						, itemName: data.estiImportCalcList[i].itemName
						, itemNameEn: data.estiImportCalcList[i].itemNameEn
						, salePrice: data.estiImportCalcList[i].salePrice
						, cargoGroupCode: data.estiImportCalcList[i].cargoGroupCode
						, cargoGroupName: data.estiImportCalcList[i].cargoGroupName
						, euroBuy: data.estiImportCalcList[i].euroBuy
						, euroSell: data.estiImportCalcList[i].euroSell
						, dollarBuy: data.estiImportCalcList[i].dollarBuy
						, dollarSell: data.estiImportCalcList[i].dollarSell
						, dekoEuroPrice: data.estiImportCalcList[i].dekoEuroPrice
						, dekoEuroKrwPrice: data.estiImportCalcList[i].dekoEuroKrwPrice
						, dekoEuro: data.estiImportCalcList[i].dekoEuro
						, eapsEuroPrice: data.estiImportCalcList[i].eapsEuroPrice
						, eapsEuroKrwPrice: data.estiImportCalcList[i].eapsEuroKrwPrice
						, eapsEuro: data.estiImportCalcList[i].eapsEuro
						, eapsDollarPrice: data.estiImportCalcList[i].eapsDollarPrice
						, eapsDollarKrwPrice: data.estiImportCalcList[i].eapsDollarKrwPrice
						, eapsDollar: data.estiImportCalcList[i].eapsDollar

					});

				}
				AUIGrid.setGridData("#grid_wrap_importcalc", list);
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



function createGridImportCalc(columnLayoutImportCalc) {

	var auiGridProps = {
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,
		editable: true,
		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		rowIdField: "idx",

		selectionMode: "multipleCells",

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDImportCalc = AUIGrid.create("#grid_wrap_importcalc", columnLayoutImportCalc, auiGridProps);

	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridIDImportCalc, "cellEditEnd", auiCellEditingHandlerIC);
}

function auiCellEditingHandlerIC(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;

		if (event.dataField == 'cargoGroupCode' || event.dataField == 'dekoEuroPrice' || event.dataField == 'eapsEuroPrice' || event.dataField == 'eapsDollarPrice') {

			var salePrice = event.item.salePrice;
			var euroBuy = $("#euroBuy").text();
			euroBuy = euroBuy.replace(/,/gi, "");
			var dollarBuy = $("#dollarBuy").text();
			dollarBuy = dollarBuy.replace(/,/gi, "");
			var cargoCharge = 0;

			if (event.item.cargoGroupCode == '기본') {
				cargoCharge = 10000;
			} else if (event.item.cargoGroupCode == 'A') {
				cargoCharge = 20000;
			} else if (event.item.cargoGroupCode == 'B') {
				cargoCharge = 30000;
			} else if (event.item.cargoGroupCode == 'C') {
				cargoCharge = 40000;
			} else if (event.item.cargoGroupCode == 'D') {
				cargoCharge = 50000;
			} else if (event.item.cargoGroupCode == 'E') {
				cargoCharge = 60000;
			}

			var dekoEuroPrice = event.item.dekoEuroPrice;
			var eapsEuroPrice = event.item.eapsEuroPrice;
			var eapsDollarPrice = event.item.eapsDollarPrice;

			if (cargoCharge != 0 && typeof dekoEuroPrice != 'undefined' && ('cargoGroupCode' || event.dataField == 'dekoEuroPrice')) {
				dekoEuroKrwPrice = (euroBuy * dekoEuroPrice) + cargoCharge;
				dekoEuro = (1.00 - (dekoEuroKrwPrice / salePrice)) * 100.00;

				AUIGrid.updateRow(myGridIDImportCalc, { "dekoEuroKrwPrice": dekoEuroKrwPrice }, event.rowIndex);
				AUIGrid.updateRow(myGridIDImportCalc, { "dekoEuro": dekoEuro }, event.rowIndex);
			}

			if (cargoCharge != 0 && typeof eapsEuroPrice != 'undefined' && ('cargoGroupCode' || event.dataField == 'eapsEuroPrice')) {
				eapsEuroKrwPrice = (euroBuy * eapsEuroPrice) + cargoCharge;
				eapsEuro = (1.00 - (eapsEuroKrwPrice / salePrice)) * 100.00;

				AUIGrid.updateRow(myGridIDImportCalc, { "eapsEuroKrwPrice": eapsEuroKrwPrice }, event.rowIndex);
				AUIGrid.updateRow(myGridIDImportCalc, { "eapsEuro": dekoEuro }, event.rowIndex);
			}

			if (cargoCharge != 0 && typeof eapsDollarPrice != 'undefined' && ('cargoGroupCode' || event.dataField == 'eapsDollarPrice')) {
				eapsDollarKrwPrice = (dollarBuy * eapsDollarPrice) + cargoCharge;
				eapsDollar = (1.00 - (eapsDollarKrwPrice / salePrice)) * 100.00;

				AUIGrid.updateRow(myGridIDImportCalc, { "eapsDollarKrwPrice": eapsDollarKrwPrice }, event.rowIndex);
				AUIGrid.updateRow(myGridIDImportCalc, { "eapsDollar": eapsDollar }, event.rowIndex);
			}


			//$("#pop_itemNo").val(event.value);
			//$("#pop_itemName").val();
			//findItem('/base/item-list');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		}
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};


// 수입계산기적용		
function calcApply(url) {
	$(".ui-dialog-titlebar-close").html("X");
	var estiNo = $("#estiNo").val();
	var euroBuy = $("#euroBuy").text();
	euroBuy = euroBuy.replace(/,/gi, "");
	var dollarBuy = $("#dollarBuy").text();
	dollarBuy = dollarBuy.replace(/,/gi, "");
	var euroSell = $("#euroSell").text();
	euroSell = euroSell.replace(/,/gi, "");
	var dollarSell = $("#dollarSell").text();
	dollarSell = dollarSell.replace(/,/gi, "");

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
	var addList = AUIGrid.getAddedRowItems(myGridIDImportCalc);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridIDImportCalc);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridIDImportCalc);

	var data = {};

	if (addList.length > 0) data.estiImportAdd = addList;
	else data.estiImportAdd = [];

	if (updateList.length > 0) data.estiImportUpdate = updateList;
	else data.estiImportUpdate = [];

	if (removeList.length > 0) data.estiImportRemove = removeList;
	else data.estiImportRemove = [];

	data.workingType = "ADD";
	data.estiNo = estiNo;
	data.seqArr = seqArr;

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			//alert(data.result_code+":"+data.result_msg);
			//창닫고. 부모창reload
			parent.jQuery.fancybox.close();
			parent.location.reload(true);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: 수입계산기 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN: 주문-수입계산기 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//  칼럼 레이아웃 작성
//var cargoGroup =  [{"code":"기본", "value":"기본"},{"code":"A", "value":"A코드"},{"code":"B", "value":"B코드"},{"code":"C", "value":"C코드"},{"code":"D", "value":"D코드"},{"code":"E", "value":"E코드"}];

var columnLayoutOrderImportCalc = [
	{ dataField: "idx", headerText: "idx", width: 50, editable: false }
	, { dataField: "orderSeq", headerText: "주문순번*", width: 50, editable: false }
	, { dataField: "itemId", headerText: "부품ID", width: 140, editable: false }
	, {
		dataField: "itemNo", headerText: "품번*", width: 140, editable: false
		, headerTooltip: { // 헤더 툴팁 표시 HTML 양식
			show: true,
			tooltipHtml: '필수입력값입니다.'
		}
	}
	, { dataField: "itemName", headerText: "품명", width: 120, editable: false }
	, { dataField: "itemNameEn", headerText: "영문품명", width: 120, editable: false }
	, {
		dataField: "cargoGroupCode", headerText: "화물분류", width: 120,
		renderer: {
			type: "DropDownListRenderer",
			list: cargoGroup,
			keyField: "code", // key 에 해당되는 필드명
			valueField: "value" // value 에 해당되는 필드명
		}
	}
	, { dataField: "salePrice", headerText: "국내판매가", datype: "numeric" }

	, {
		headerText: "DEKO",
		children: [{
			dataField: "dekoEuroPrice",
			headerText: "해외가",
			dataType: "numeric"
		},
		{
			dataField: "dekoEuroKrwPrice",
			headerText: "환율적용(예상)",
			dataType: "numeric"
		},
		{
			dataField: "dekoEuro",
			headerText: "할인율(예상)",
			dataType: "numeric"
		}]
	}
	, {
		headerText: "EAPS(유럽)",
		children: [{
			dataField: "eapsEuroPrice",
			headerText: "해외가",
			dataType: "numeric"
		},
		{
			dataField: "eapsEuroKrwPrice",
			headerText: "환율적용(예상)",
			dataType: "numeric"
		},
		{
			dataField: "eapsEuro",
			headerText: "할인율(예상)",
			dataType: "numeric"
		}]
	}
	, {
		headerText: "EAPS(미국)",
		children: [{
			dataField: "eapsDollarPrice",
			headerText: "해외가",
			dataType: "numeric"
		},
		{
			dataField: "eapsDollarKrwPrice",
			headerText: "환율적용(예상)",
			dataType: "numeric"
		},
		{
			dataField: "eapsDollar",
			headerText: "할인율(예상)",
			dataType: "numeric"
		}]
	}
];


// 정보 조회
function findOrderImportCalc(url, page) {

	var dialogOrderImportCalc;
	dialogOrderImportCalc = $("#dialog-form-orderimportcalc").dialog({
		//autoOpen: false,
		height: 700,
		//minWidth: 500,
		width: "90%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			"확인": updateGridRow,
			"취소": function(event) {
				dialogOrderImportCalc.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	
		}
	});

	//alert("조건에 맞는 자료가 없습니다.");
	// 그리드 생성 후 해당 ID 보관 변수
	var myGridIDOrderImportCalc;
	// AUIGrid 그리드를 생성합니다.


	dialogOrderImportCalc.dialog("open");

	createGridOrderImportCalc(columnLayoutOrderImportCalc);

	var list = [];
	var orderNo = $("#orderNo").val();

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"orderNo": orderNo
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.orderImportCalcList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.orderImportCalcList.length; i++) {
					list.push({
						idx: data.orderImportCalcList[i].orderSeq
						, orderSeq: data.orderImportCalcList[i].orderSeq
						, itemId: data.orderImportCalcList[i].itemId
						, itemNo: data.orderImportCalcList[i].itemNo
						, itemName: data.orderImportCalcList[i].itemName
						, itemNameEn: data.orderImportCalcList[i].itemNameEn
						, salePrice: data.orderImportCalcList[i].salePrice
						, cargoGroupCode: data.orderImportCalcList[i].cargoGroupCode
						, cargoGroupName: data.orderImportCalcList[i].cargoGroupName
						, euroBuy: data.orderImportCalcList[i].euroBuy
						, euroSell: data.orderImportCalcList[i].euroSell
						, dollarBuy: data.orderImportCalcList[i].dollarBuy
						, dollarSell: data.orderImportCalcList[i].dollarSell
						, dekoEuroPrice: data.orderImportCalcList[i].dekoEuroPrice
						, dekoEuroKrwPrice: data.orderImportCalcList[i].dekoEuroKrwPrice
						, dekoEuro: data.orderImportCalcList[i].dekoEuro
						, eapsEuroPrice: data.orderImportCalcList[i].eapsEuroPrice
						, eapsEuroKrwPrice: data.orderImportCalcList[i].eapsEuroKrwPrice
						, eapsEuro: data.orderImportCalcList[i].eapsEuro
						, eapsDollarPrice: data.orderImportCalcList[i].eapsDollarPrice
						, eapsDollarKrwPrice: data.orderImportCalcList[i].eapsDollarKrwPrice
						, eapsDollar: data.orderImportCalcList[i].eapsDollar
					});

				}
				AUIGrid.setGridData("#grid_wrap_orderimportcalc", list);
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



function createGridOrderImportCalc(columnLayoutOrderImportCalc) {

	var auiGridProps = {
		// 페이징 사용		
		usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,
		editable: true,
		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,

		rowIdField: "idx",

		selectionMode: "multipleCells",

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDOrderImportCalc = AUIGrid.create("#grid_wrap_orderimportcalc", columnLayoutOrderImportCalc, auiGridProps);

	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridIDOrderImportCalc, "cellEditEnd", auiCellEditingHandlerIC);
}

function auiCellEditingHandlerIC(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;

		if (event.dataField == 'cargoGroupCode' || event.dataField == 'dekoEuroPrice' || event.dataField == 'eapsEuroPrice' || event.dataField == 'eapsDollarPrice') {

			var salePrice = event.item.salePrice;
			var euroBuy = $("#euroBuy").text();
			euroBuy = euroBuy.replace(/,/gi, "");
			var dollarBuy = $("#dollarBuy").text();
			dollarBuy = dollarBuy.replace(/,/gi, "");
			var cargoCharge = 0;

			if (event.item.cargoGroupCode == '기본') {
				cargoCharge = 10000;
			} else if (event.item.cargoGroupCode == 'A') {
				cargoCharge = 20000;
			} else if (event.item.cargoGroupCode == 'B') {
				cargoCharge = 30000;
			} else if (event.item.cargoGroupCode == 'C') {
				cargoCharge = 40000;
			} else if (event.item.cargoGroupCode == 'D') {
				cargoCharge = 50000;
			} else if (event.item.cargoGroupCode == 'E') {
				cargoCharge = 60000;
			}

			var dekoEuroPrice = event.item.dekoEuroPrice;
			var eapsEuroPrice = event.item.eapsEuroPrice;
			var eapsDollarPrice = event.item.eapsDollarPrice;

			if (cargoCharge != 0 && typeof dekoEuroPrice != 'undefined' && ('cargoGroupCode' || event.dataField == 'dekoEuroPrice')) {
				dekoEuroKrwPrice = (euroBuy * dekoEuroPrice) + cargoCharge;
				dekoEuro = (1.00 - (dekoEuroKrwPrice / salePrice)) * 100.00;

				AUIGrid.updateRow(myGridIDOrderImportCalc, { "dekoEuroKrwPrice": dekoEuroKrwPrice }, event.rowIndex);
				AUIGrid.updateRow(myGridIDOrderImportCalc, { "dekoEuro": dekoEuro }, event.rowIndex);
			}

			if (cargoCharge != 0 && typeof eapsEuroPrice != 'undefined' && ('cargoGroupCode' || event.dataField == 'eapsEuroPrice')) {
				eapsEuroKrwPrice = (euroBuy * eapsEuroPrice) + cargoCharge;
				eapsEuro = (1.00 - (eapsEuroKrwPrice / salePrice)) * 100.00;

				AUIGrid.updateRow(myGridIDOrderImportCalc, { "eapsEuroKrwPrice": eapsEuroKrwPrice }, event.rowIndex);
				AUIGrid.updateRow(myGridIDOrderImportCalc, { "eapsEuro": dekoEuro }, event.rowIndex);
			}

			if (cargoCharge != 0 && typeof eapsDollarPrice != 'undefined' && ('cargoGroupCode' || event.dataField == 'eapsDollarPrice')) {
				eapsDollarKrwPrice = (dollarBuy * eapsDollarPrice) + cargoCharge;
				eapsDollar = (1.00 - (eapsDollarKrwPrice / salePrice)) * 100.00;

				AUIGrid.updateRow(myGridIDOrderImportCalc, { "eapsDollarKrwPrice": eapsDollarKrwPrice }, event.rowIndex);
				AUIGrid.updateRow(myGridIDOrderImportCalc, { "eapsDollar": eapsDollar }, event.rowIndex);
			}


			//$("#pop_itemNo").val(event.value);
			//$("#pop_itemName").val();
			//findItem('/base/item-list');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		}
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};


// 주문 수입계산기적용		
function orderCalcApply(url) {

	var orderNo = $("#orderNo").val();
	var euroBuy = $("#euroBuy").text();
	euroBuy = euroBuy.replace(/,/gi, "");
	var dollarBuy = $("#dollarBuy").text();
	dollarBuy = dollarBuy.replace(/,/gi, "");
	var euroSell = $("#euroSell").text();
	euroSell = euroSell.replace(/,/gi, "");
	var dollarSell = $("#dollarSell").text();
	dollarSell = dollarSell.replace(/,/gi, "");

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
	var addList = AUIGrid.getAddedRowItems(myGridIDOrderImportCalc);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridIDOrderImportCalc);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridIDOrderImportCalc);

	var data = {};

	if (addList.length > 0) data.orderImportAdd = addList;
	else data.orderImportAdd = [];

	if (updateList.length > 0) data.orderImportUpdate = updateList;
	else data.orderImportUpdate = [];

	if (removeList.length > 0) data.orderImportRemove = removeList;
	else data.orderImportRemove = [];

	data.workingType = "ADD";
	data.orderNo = orderNo;
	data.seqArr = seqArr;

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(data) {
			//alert(data.result_code+":"+data.result_msg);
			//창닫고. 부모창reload
			//parent.jQuery.fancybox.close();
			//parent.location.reload(true);
			location.reload(true);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: 주문 수입계산기 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN: AUI GRID //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// 엑셀 내보내기(Export);
function exportTo(type) {

	// 내보내기 실행	
	switch (type) {
		case "xlsx":
			var chkbox = document.getElementById("chkbox");
			AUIGrid.exportToXlsx(myGridID, {
				// 스타일 상태 유지 여부(기본값:true)
				exportWithStyle: chkbox.checked
			});
			break;
		case "csv":
			AUIGrid.exportToCsv(myGridID);
			break;
		case "txt":
			AUIGrid.exportToTxt(myGridID);
			break;
		case "xml":
			AUIGrid.exportToXml(myGridID);
			break;
		case "json":
			AUIGrid.exportToJson(myGridID);
			break;
		case "pdf": // AUIGrid.pdfkit.js 파일을 추가하십시오.
			if (!AUIGrid.isAvailabePdf(myGridID)) {
				alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
				return;
			}
			AUIGrid.exportToPdf(myGridID, {
				// 폰트 경로 지정 (반드시 지정해야 함)
				fontPath: "./pdfkit_20221212/jejugothic-regular.ttf"
			});
			break;
		case "object": // array-object 는 자바스크립트 객체임
			var data = AUIGrid.exportToObject(myGridID);
			alert(data);
			break;
	}
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: AUI GRID //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN: 지점 부서 사원 팝업 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//거래처담당자(자사 직원) 조회
function findCustAdm(url) {
	$(".ui-dialog-titlebar-close").html("X");
	var list = [];
	var custCode = $("#custCode").val();

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"custCode": custCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.custAdmList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.custAdmList.length; i++) {
					list.push({
						idx: data.custAdmList[i].admIdx
						, admIdx: data.custAdmList[i].admIdx
						, admType: data.custAdmList[i].admType
						, admCode: data.custAdmList[i].admCode
						, admName: data.custAdmList[i].admName
						, memo: data.custAdmList[i].memo
					});

				}
				AUIGrid.setGridData("#grid_wrap2", list);
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

//관리자입력시 관리자 선택 팝업
function findAdmStaff(currentRowIndex, admType) {

	$(".ui-dialog-titlebar-close").html("X");
	//console.log("hi");
	var url = "";
	//if (admType == '부서원') {
	url = '/biz/staff-list';
	//} else { //부서
	//	url = '/biz/dept-list'; 
	//}

	var list = [];
	var custCode = $("#custCode").val();
	var arr_text = "";

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"custCode": custCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.staffList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {


				arr_text = "<select id='mCode' style='padding:7px 20px;' >";

				for (i = 0; i < data.staffList.length; i++) {

					staffCode = data.staffList[i].empNo;
					staffName = data.staffList[i].name;

					//$("#users tbody tr td").append( "<option>" +staffName + "</option>");
					arr_text = arr_text + "<option value=" + staffCode + " mname=" + staffName + ">" + staffName + "</option>";
				}
				arr_text = arr_text + "</select>";

				$("#users tbody tr td").append(arr_text);

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

//관리자입력시 관리부서 선택 팝업
function findAdmDept(currentRowIndex, admType) {
	$(".ui-dialog-titlebar-close").html("X");
	var url = "";
	//if (admType == '부서원') {
	//	url = '/biz/staff-list';
	//} else { //부서
	url = '/biz/dept-list';
	//}

	var list = [];
	var custCode = $("#custCode").val();
	var arr_text = "";

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"custCode": custCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.deptList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				arr_text = "<select id='mCode' style='padding:7px 20px;' >";

				for (i = 0; i < data.deptList.length; i++) {

					deptCode = data.deptList[i].deptCode;
					deptName = data.deptList[i].deptName;

					//$("#users tbody tr td").append( "<option>" +staffName + "</option>");
					arr_text = arr_text + "<option value=" + deptCode + " mname=" + deptName + ">" + deptName + "</option>";
				}
				arr_text = arr_text + "</select>";

				$("#users tbody tr td").append(arr_text);
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


//관리자입력시 지점선택 선택 팝업
function findAdmBranch(currentRowIndex, admType) {
	$(".ui-dialog-titlebar-close").html("X");
	var url = "";
	//if (admType == '부서원') {
	//	url = '/biz/staff-list';
	//} else { //부서
	url = '/base/code-list';
	//}

	var list = [];
	var custCode = $("#custCode").val();
	var arr_text = "";

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"mCode": "9020",
			"validYN": "Y"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				arr_text = "<select id='mCode' style='padding:7px 20px;' >";

				for (i = 0; i < data.codeList.length; i++) {

					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;

					//$("#users tbody tr td").append( "<option>" +staffName + "</option>");
					arr_text = arr_text + "<option value=" + code + " mname=" + codeName + ">" + codeName + "</option>";
				}
				arr_text = arr_text + "</select>";

				$("#users tbody tr td").append(arr_text);
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

//관리자입력시 거래처선택 선택 팝업
function findAdmCust(currentRowIndex, admType) {
	$(".ui-dialog-titlebar-close").html("X");
	var url = "";
	//if (admType == '부서원') {
	//	url = '/biz/staff-list';
	//} else { //부서
	url = '/base/cust-list';
	//}

	var list = [];
	var custCode = $("#custCode").val();
	var arr_text = "";

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"custTypeGroup": "SR"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.custList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				arr_text = "<select id='mCode' style='padding:7px 20px;' >";

				for (i = 0; i < data.custList.length; i++) {

					custCode = data.custList[i].custCode;
					custName = data.custList[i].custName;
					phone = data.custList[i].phone;

					//$("#users tbody tr td").append( "<option>" +staffName + "</option>");
					arr_text = arr_text + "<option value=" + custCode + " mname=" + custName + ">" + custCode + "-" + custName + "(" + phone + ")</option>";
				}
				arr_text = arr_text + "</select>";

				$("#users tbody tr td").append(arr_text);
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END: 지점 부서 사원 팝업 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// 엑셀 내보내기(Export);
function exportTo(type) {

	// 내보내기 실행	
	switch (type) {
		case "xlsx":
			//var chkbox = document.getElementById("chkbox");
			AUIGrid.exportToXlsx(myGridID, {
				// 스타일 상태 유지 여부(기본값:true)
				exportWithStyle: true //chkbox.checked
			});
			break;
		case "csv":
			AUIGrid.exportToCsv(myGridID);
			break;
		case "txt":
			AUIGrid.exportToTxt(myGridID);
			break;
		case "xml":
			AUIGrid.exportToXml(myGridID);
			break;
		case "json":
			AUIGrid.exportToJson(myGridID);
			break;
		case "pdf": // AUIGrid.pdfkit.js 파일을 추가하십시오.
			if (!AUIGrid.isAvailabePdf(myGridID)) {
				alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
				return;
			}
			AUIGrid.exportToPdf(myGridID, {
				// 폰트 경로 지정 (반드시 지정해야 함)
				fontPath: "/resources/pdfkit/jejugothic-regular.ttf"
			});
			break;
		case "object": // array-object 는 자바스크립트 객체임
			var data = AUIGrid.exportToObject(myGridID);
			alert(data);
			break;
	}
};


//Grid Fixed Column
function setFixedColumnCount() {
	var cnt = Number(document.getElementById("gridFixedCnt").value);
	
	/*
	if (cnt > 8) {
		alert("현재 고정 칼럼의 최대 개수는 8로 설정되어있습니다.\r\n8이하로 다시 시도해 주십시오.");
		return;
	}
	*/

	// 고정 칼럼을 변경합니다.
	AUIGrid.setFixedColumnCount(myGridID, cnt);
}
	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN : 지점코드 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// 데이터 요청 Ajax
function branchCodeSelect(url) {

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			mCode: "9020"
			,validYN : "Y"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.codeList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				$("#branchCodeLabel").addClass("required"); // 관리지점이 1개 이상 들어올경우 해당 셀렉트 박스 앞에 라벨에 필수입력표시 해줌
				//$("#makerCode").append("<option  value='' >---</option>");
				for (i = 0; i < data.codeList.length; i++) {
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName;
					if(code != '' && codeName !='')  // 지점의 코드와 코드네임이 공백인경우 추가 x
						$("#branchCode").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END : 지점코드 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN : 창고 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function commonFindStor(url, page, objStor1, objStor2, objStor3, objStor4, validYN, rlStandByYN, storCodeMulti) {
	
	//url : 
	var list = [];
	var listS;	
	
	if (validYN === undefined) {
		validYN = '';
	}
	if (rlStandByYN === undefined) {
		rlStandByYN = '';
	}
	
	if (storCodeMulti === undefined) {
		storCodeMulti = '';
	}
	//storCodeMulti = '1,1005,220';
	//console.log("storCodeMulti: " + storCodeMulti);
	$.ajax({
		type: "POST",
		url: url,  //"/base/storage-list"
		dataType: "json",
		data: {
			"validYN" : validYN,
			"rlStandByYN" : rlStandByYN
			,"storCodeMulti" : storCodeMulti
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			$("#"+objStor1).empty();
			//console.log("len:"+data.storageList.length);
			if (data.storageList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				//console.log("len:"+data.storageList.length);
				$("#"+objStor1).append("<option value='' txtVal='' ></option>");
				for (i = 0; i < data.storageList.length; i++) {
					$("#"+objStor1).append("<option value="+data.storageList[i].storageCode+" txtVal="+data.storageList[i].storageName+" >"+data.storageList[i].storageName+"</option>");
				}

			}

			listS = JSON.stringify(list)
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


//function findItem Call
function commonFindRackCall(objStorCode1, objStorName1, objRackCode1, objRackName1, objStockQty1, dialogOpenYN) {

	//var storCode = $("#storCode").val();
   	
	//부모창의 값을 가져와서DP
	$("#pop_storCode").val(); 
	$("#pop_storName").val();
	$("#pop_rackCode").val(); 
	$("#pop_rackName").val();
	
	//if (objStorCode1 != '') {  //2023.09.07
	 	var selStorCode = $("#"+objStorCode1+" option:selected"); //$("#memberSel option:selected").text();
	 	var selTxtVal = selStorCode.attr('txtVal');
		$("#pop_storCode").val($("#"+objStorCode1).val()); 
		$("#pop_storName").val(selTxtVal);
	//}
		
	var dialogRack;
	dialogRack = $("#dialog-form-rack").dialog({
		//autoOpen: false,
		height: 700,
		//minWidth: 500,
		width: "70%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position: [400, 400],
		buttons: {
			//"확인": updateGridRowRack(elementName),
			"확인": function(event) {
								commonUpdateGridRowRack(objStorCode1, objStorName1, objRackCode1, objRackName1, objStockQty1);
							},
			"취소": function(event) {
				dialogRack.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	
		}
	});
	commonCreateGridRack(columnLayoutRack,objStorCode1, objStorName1, objRackCode1, objRackName1, objStockQty1);
	dialogRack.dialog("open");
	
	AUIGrid.clearGridData(myGridIDRack);	
	 
	if ( $("#pop_storCode").val() !='' || $("#pop_storName").val() !='' ) {
    	commonFindRack('/base/rack-list' );
    }
}

//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function commoUpdateGridRowRack(objStorCode1, objStorName1, objRackCode1, objRackName1, objStockQty1) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDRack);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	
	$("#"+objStorCode1).val(rowItem.storCode);
	$("#"+objRackCode1).val(rowItem.rackCode);
	$("#"+objRackName1).val(rowItem.rackName);
	
	$( "#dialog-form-rack").dialog("close");	
	
}

// 랙 칼럼 레이아웃 작성
var columnLayoutRack = [
	  { dataField: "storCode", headerText: "창고코드", width: 100 ,editable:false}
	, { dataField: "storName", headerText: "창고명", width: 120, style: "left" ,editable:false }
	, { dataField: "rackCode", headerText: "랙코드", width: 220 ,editable:false}
	, { dataField: "rackName", headerText: "랙명", width: 220, style: "left" ,editable:false}
	, { dataField: "stockQty", headerText: "재고수량", width: 220, style: "left" ,editable:false}
	, { dataField: "itemId", headerText: "부품ID", width: 220, style: "left" ,editable:false,visible: false}
	, { dataField: "reqComCode", headerText: "요청업체코드", width: 220, style: "left" ,editable:false,visible: false}
	, { dataField: "placeNo", headerText: "발주번호", width: 220, style: "left" ,editable:false,visible: false}
	, { dataField: "placeSeq", headerText: "발주순번", width: 220, style: "left" ,editable:false,visible: false}
	, { dataField: "jobNo", headerText: "처리번호", width: 220, style: "left" ,editable:false,visible: false}
	, { dataField: "jobSeq", headerText: "처리순번", width: 220, style: "left" ,editable:false,visible: false}
	, { dataField: "possibleQty", headerText: "재고투입가능수량", width: 100, style: "left" ,editable:false}
	, { dataField: "reqQty", headerText: "요청수량", width: 80 ,editable: true ,visible: false , dataType: "numeric",formatString: "#,##0"  , style:"auigrid-must-col-style"
			,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18		}}

];

function commonCreateGridRack(columnLayoutRack, objStorCode1, objStorName1, objRackCode1, objRackName1, objStockQty1, onGrid) {
	var auiGridProps = {
		editable:true,
		// 페이징 사용		
		usePaging: true,
		enableFocus: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		showPageRowSelect: true,
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false
	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDRack = AUIGrid.create("#grid_wrap_rack", columnLayoutRack, auiGridProps);

	var rowPos = 'first';

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridIDRack, "pageChange", function(event) {
		currentPage = event.currentPage;
	});

	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridIDRack, "cellDoubleClick", function(event) {
		var i, rowItem, rowInfoObj, dataField;
		var selectedItems = AUIGrid.getSelectedItems(myGridIDRack);
		rowInfoObj = selectedItems[0];
		rowItem = rowInfoObj.item;
		//console.log(onGrid);
		if (onGrid == 'Y' ) {  //그리드에서 팝업한 경우
			var gridRackCode = $("#grid-rackCode1").val();
			//console.log("gridCustCode : " + gridCustCode)
			if (gridRackCode == 'rackCode') {					
				item = {
					storCode: rowItem.storCode,
					storName: rowItem.storName,
					rackCode: rowItem.rackCode,
					rackName: rowItem.rackName,
					stockQty: rowItem.stockQty
				};
			}else if (gridRackCode == 'moveRackCode') {					
				item = {
					moveStorCode: rowItem.storCode,
					moveStorName: rowItem.storName,
					moveRackCode: rowItem.rackCode,
					moveRackName: rowItem.rackName,
				};
			}
			
			document.getElementById("grid-rackCode1").value = "";
			document.getElementById("grid-rackName1").value = "";
			AUIGrid.updateRow(myGridID, item, "selectedIndex");			
		}else{		
			$("#"+objStorCode1).val(rowItem.storCode);
			$("#"+objRackCode1).val(rowItem.rackCode);
			$("#"+objRackName1).val(rowItem.rackName);
			if (objStockQty1 != '') {
				$("#stockQty").val("");
			}
		}
				
		var dialogRack;
		$("#dialog-form-rack").dialog("close");
	});
}

/*
$("#btnRackFind").click(function() {
	commonFindRack('/base/rack-list' );
});
*/

function commonFindRack(url, page, rowIndex, popYN, isPopOpen) {
	
	//console.log("check1")

	var list = [];
	var storageCode = $("#pop_storCode").val();
	var storageName = $("#pop_storName").val();  
	var rackCode = $("#pop_rackCode").val(); 
	var rackName = $("#pop_rackName").val(); 
	var itemId  = $("#pop_itemId").val();
	var rackSrch = $("#pop_rackSrch").val();
	
	if(window.location.pathname == '/logis/stock-wr-up' || window.location.pathname == '/logis/si-req-list') //수동입출고에서 이동랙 조회에서 현재 랙이름으로 잡히는부분 있어서 이부분 조회조건 무효화처리
	{
		const storCode = $('#storageCode [value="'+$("#pop_storCode").val()+'"]');
	 	storageCode = storCode.data('storagecode'); 
		//itemId = '';
		rackSrch = '';
	}	
	
	let gvComCode = $("#gvComCode").val();  //230921
	if(gvComCode=='null'){gvComCode = ''}
	//console.log("gvComCode :" +gvComCode)

	//var barcode = $("#pop_barcode").val(); 
   //console.log("itm:"+itemId);
    if (itemId =='' ) {itemId =0; }
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"storageCode":storageCode,
			"storageName":storageName,
			"rackCode":rackCode,
			"rackName":rackName
			,"itemId":itemId
			,"rackSrch":rackSrch
			//"barcode":barcode
			,"gvComCode":gvComCode
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			
			var gridRackCode = $("#grid-rackCode1").val();
			
			if (data.rackList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else if (data.rackList.length == 1 && isPopOpen == 'N') {
				
				if (gridRackCode == 'rackCode') {
					
					item = {
						storCode: data.rackList[0].storageCode
						,storName : data.rackList[0].storageName
						, rackCode: data.rackList[0].rackCode
						, rackName: data.rackList[0].rackName
						, stockQty: data.rackList[0].stockQty
							
					};							
							
				}else if(gridRackCode == 'moveRackCode'){
									
					item = {
						moveStorCode: data.rackList[0].storageCode
						,moveStorName: data.rackList[0].storageName
						,moveRackCode: data.rackList[0].rackCode
						,moveRackName: data.rackList[0].rackName
					};
					
				}
				
				AUIGrid.updateRow(myGridID, item, rowIndex);
				
			}else if (data.rackList.length != 1 && isPopOpen == 'N'){
				
				if (gridRackCode == 'rackCode') {
					item = {
						storCode: storageCode
					};
					
				}else if(gridRackCode == 'moveRackCode'){
					item = {
						moveStorCode: storageCode
					};
				}
				
						
				AUIGrid.updateRow(myGridID, item, rowIndex);
				
			}else {

				for (i = 0; i < data.rackList.length; i++) {
					list.push({
						  storCode: data.rackList[i].storageCode
						, storName: data.rackList[i].storageName
						, rackCode: data.rackList[i].rackCode
						, rackName: data.rackList[i].rackName
						, stockQty: data.rackList[i].stockQty
						//, barcode: data.rackList[i].barcode
						//, validYN: data.rackList[i].validYN
						//, regUserId: data.rackList[i].regUserId
						//, uptUserId: data.rackList[i].uptUserId
					});
					//firstGrid_mst.setData(list); // 그리드에 데이터 설정
				}
				AUIGrid.setGridData("#grid_wrap_rack", list);
				
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridIDRack, Number(page));
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



/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END : 지점코드 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN : 창고보유 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// 부품id 품번 상품명 제조사코드 제조사명 재고수량  창고명 창고코드 랙명 최종수정자
var columnLayoutStockCnt = [ 
		{ dataField : "itemId",    headerText : "부품ID", width : 80} 
		,{ dataField : "itemNo",     headerText : "품번", width : 120     }
		,{ dataField : "itemName",   headerText : "상품명" , style : "left" , width : 120}
		,{ dataField : "makerCode",   headerText : "제조사코드", width : 68 }
		,{ dataField : "makerName",      headerText : "제조사명"  , width : 80, style : "left"   }
		,{ dataField : "stockQty",      headerText : "재고수량", width : 56 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
	 
		,{ dataField : "storCode",    headerText : "창고코드", width : 56, style : "left"	}
		,{ dataField : "storName",    headerText : "창고명", width : 120, style : "left"	}
		,{ dataField : "rackCode",    headerText : "랙코드", width : 56, style : "left"	}
		,{ dataField : "rackName",    headerText : "랙명", width : 120, style : "left"	}
		,{ dataField : "uptUserName",    headerText : "최종수정자", width : 150, style : "left" }
		,{ dataField : "modified",    headerText : "최종수정일", width : 150, style : "left" }
];


//  itemCode 부품아이디를 기준으로 창고조회
function findStockCnt(url,itemId) {
    
	var dialogStockCnt;
	dialogStockCnt = $( "#dialog-form-whStockCnt" ).dialog({
	    //autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "90%",
	    modal: true,
	    headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position:[400,400],
		buttons: {
			//"확인": updateGridRow			,
			"닫기": function (event) {
				dialogStockCnt.dialog("close");
			}
		},
	    close: function() {
	     // $( "#users tbody tr td" ).empty();	   	
	    }
	});
	 
	
	// 그리드 생성 후 해당 ID 보관 변수
	var myGridIDStockShare;
	dialogStockCnt.dialog("open");
				
	createGridStockCnt(columnLayoutStockCnt);
				
	var list = [];
	 
	 
	 
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"itemId":itemId
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			  
			if (data.stockRackList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
				
//		{ dataField : "itemId",    headerText : "부품ID", width : 80} 
//		,{ dataField : "itemNo",     headerText : "품번", width : 120     }
//		,{ dataField : "itemName",   headerText : "상품명" , style : "left" , width : 120}
//		,{ dataField : "makerCode",   headerText : "제조사코드", width : 68 }
//		,{ dataField : "makerName",      headerText : "제조사명"  , width : 80, style : "left"   }
//		,{ dataField : "stockQty",      headerText : "재고수량", width : 56 ,dataType: "numeric" ,formatString: "#,##0"  , style:"right"}
//	 
//		,{ dataField : "storCode",    headerText : "창고코드", width : 56, style : "left"	}
//		,{ dataField : "storName",    headerText : "창고명", width : 120, style : "left"	}
//		,{ dataField : "rackCode",    headerText : "랙코드", width : 56, style : "left"	}
//		,{ dataField : "rackName",    headerText : "랙명", width : 120, style : "left"	}
//		,{ dataField : "uptUserName",    headerText : "최종수정자", width : 150, style : "left" }
//		,{ dataField : "modified",    headerText : "최종수정일", width : 150, style : "left" }
				
					
				for(i=0;i<data.stockRackList.length;i++){
					if(data.stockRackList[i].stockQty >0)
					{
						    list.push({
								 itemId: data.stockRackList[i].itemId 
								,itemNo: data.stockRackList[i].itemNo 
								,itemName: data.stockRackList[i].itemName 
								,makerCode : data.stockRackList[i].makerCode
								,makerName: data.stockRackList[i].makerName
								,stockQty: data.stockRackList[i].stockQty  
								,storCode: data.stockRackList[i].storCode 
								,storName: data.stockRackList[i].storName 
								,rackCode: data.stockRackList[i].rackCode
								,rackName: data.stockRackList[i].rackName
								,uptUserName: data.stockRackList[i].uptUserName
								,modified: data.stockRackList[i].modified
							});
					}
				}		
				AUIGrid.setGridData("#grid_wrap_whStockCnt", list);
				
				
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


function createGridStockCnt(columnLayoutStockCnt) {
	
	var auiGridProps = {			
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 100,
            editable : false ,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			//rowIdField: "idx",
			selectionMode : "multipleCells",
			
			// 엑스트라 체크박스 표시 설정
			//showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			//enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			//showRowAllCheckBox: true,

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDStockCnt = AUIGrid.create("#grid_wrap_whStockCnt", columnLayoutStockCnt, auiGridProps);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END : 창고보유 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN : 공유재고 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

var columnLayoutStockShare = [ 
		 { dataField : "custCode",      headerText : "거래처코드", width : 50, editable : false , visible : false }
		,{ dataField : "custName",     headerText : "업체명", width : 150 }
		,{ dataField : "custAddress1",     headerText : "주소", width : 300 , style : "left" }
		//,{ dataField : "storageCode",     headerText : "창고코드", datype: "" }
		//,{ dataField : "storageName",     headerText : "창고명", datype: "" }
		,{ dataField : "stockQty",     headerText : "재고수량", width : 100 , datype: "numeric" }
		,{ dataField : "itemId",      headerText : "부품ID", width : 140, editable : false }
		,{ dataField : "itemNo",      headerText : "품번", width : 140, editable : false } 
		,{ dataField : "itemName", headerText : "품명", width: 300, editable : false, style : "left"   } 
		,{ dataField : "memo1", headerText : "비고1", width: 300, editable : false, style : "left"   }  
];


// 정보 조회
function findStockShare(url,itemId,custCode) {
    
	var dialogStockShare;
	dialogStockShare = $( "#dialog-form-stockshare" ).dialog({
	    //autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "90%",
	    modal: true,
	    headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position:[400,400],
		buttons: {
			//"확인": updateGridRow			,
			"닫기": function (event) {
				dialogStockShare.dialog("close");
			}
		},
	    close: function() {
	     // $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	
	// 그리드 생성 후 해당 ID 보관 변수
	var myGridIDStockShare;
	dialogStockShare.dialog("open");
				
	createGridStockShare(columnLayoutStockShare);
				
	var list = [];
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"itemId":itemId,
			"custCode":custCode
		},
		async: false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.stockShareList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.stockShareList.length;i++){
				    list.push({
						 custCode: data.stockShareList[i].custCode 
						,custName: data.stockShareList[i].custName 
						,custAddress1: data.stockShareList[i].custAddress1 
						,stockQty : data.stockShareList[i].stockQty
						,storageCode: data.stockShareList[i].storageCode
						,storageName: data.stockShareList[i].storageName  
						,itemId: data.stockShareList[i].itemId 
						,itemNo: data.stockShareList[i].itemNo 
						,itemName: data.stockShareList[i].itemName
						,memo1: data.stockShareList[i].memo1
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap_stockshare", list);
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


function createGridStockShare(columnLayoutStockShare) {
	
	var auiGridProps = {
			editable:false,			
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 100,
            editable : false ,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			//rowIdField: "idx",
			selectionMode : "multipleCells",
			
			// 엑스트라 체크박스 표시 설정
			//showRowCheckColumn: true,
	
			// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
			//enableRowCheckShiftKey: true,
	
			// 전체 체크박스 표시 설정
			//showRowAllCheckBox: true,

	};

	// 실제로 #grid_wrap 에 그리드 생성
	myGridIDStockShare = AUIGrid.create("#grid_wrap_stockshare", columnLayoutStockShare, auiGridProps);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END : 공유재고 //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
	

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// BEGIN : sr코드 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// 데이터 요청 Ajax
function srCodeSelect(url) {

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			validYN : "Y"
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.srList.length == 0) {
				//alert("자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");				
			} else {
				//$("#makerCode").append("<option  value='' >---</option>");
				for (i = 0; i < data.srList.length; i++) {
					code = data.srList[i].srCode;
					codeName = data.srList[i].srName;
					$("#srCode").append("<option value='" + code + "' >" + code + " : " + codeName + "</option>");
										
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// END : sr코드 select box //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
