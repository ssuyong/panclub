
var datepicker1 = new tui.DatePicker('#wrapper1', {
	date: new Date(),
	input: {
		element: '#datepicker-input1',
		format: 'yyyy-MM-dd'
	}
});

var myGridID;
var myGridIDRack;



$(document).ready(function() {

	$("#stockProcType").click();
	setStockProcType();
	 
	//let itemId = $("#itemId_clicked").val();
	let itemId = $("#itemId").val();	//console.log("itemId opo :"+itemId);

	//if (itemId != '') {findStockInfo('/logis/stock-list');}
	
	if (itemId != '') {  findStockRackInfo('/logis/stock-rack-list',itemId);  }

	//창고목록
	findStor("/base/storage-list", 1);
	
	$("#btnReg").click(function(){
		
		updateDataToServer("/logis/stockItemAdd", "ADD");
	});
	
});




$("#btnSchDialog").click(function() {
	findDataToServer_stock("/logis/stock-list",1);
});
$("#btnClose").click(function() {
	parent.jQuery.fancybox.close();
});
$("#btnCloseDialog").click(function() {
	$("#dialog-form-stock").dialog("close");
});




/*

function openFindItemDialog() {

	var dialogItem;
	dialogItem = $( "#dialog-form-item" ).dialog({
	    //autoOpen: false,
	    height: 700,
	    //minWidth: 500,
	    width: "70%",
	    modal: true,
	    headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		position:[400,400],
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogItem.dialog("close");
			}
		},
	    close: function() {
	     // $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	createItemGrid(columnLayoutItem);
	dialogItem.dialog("open");
}
*/

//function findItem Call
function findItemCall(elementName, dialogOpenYN) {
	if (window.event.keyCode == 13 || dialogOpenYN == 'Y') {  //  Enter or Open Dialog

		$("#form-itemId1").val("itemId");
		$("#form-itemNo1").val("itemNo");
		
		$("#form-itemNameKo1").val("itemName");
		$("#form-itemNameEn1").val("itemNameEn");
		$("#form-makerName1").val("makerName");
		$("#form-classCode1").val("classCode");
		
		var itemNo = $("#" + elementName).val();
		$("#srchEqualItemNo").val(itemNo);
		$("#pop_itemNo").val(itemNo);
		$("#pop_itemName").val();

		if (dialogOpenYN == 'N') {
			findItem('/base/item-list', 0, 0, 'Y', 'Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		} else {
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
			createItemGrid(columnLayoutItem);
			dialogItem.dialog("open");
			//findItem('/base/item-list', 0,0,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		}
	}
}


//부품 랙재고 리스팅
function findStockRackInfo(url,itemId) {
	
	//var itemId = $("#itemId").val();


	if (itemId ==0 || itemId =='0' || itemId =='' || itemId === undefined) {
		return;
	}
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			itemId: itemId
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
							$("#iDiv_rack_lst").empty();
			if (data.stockRackList.length == 0) {
			} else {
				$("#iDiv_rack_dsp").css("display","block");
				$("#iDiv_rack_lst").empty();
				for (i = 0; i < data.stockRackList.length; i++) {
					if (i==0){
						$("#itemId").val(data.stockRackList[i].itemId);
						$("#itemNo").val(data.stockRackList[i].itemNo);
						$("#itemName").val(data.stockRackList[i].itemName);
						$("#makerName").val(data.stockRackList[i].makerName);
						if (data.stockRackList[i].costPrice !== null) {
							  $("#inPrice").val(data.stockRackList[i].costPrice.toLocaleString());
							} else {
							  $("#inPrice").val("");
						}
					}
					storCode = data.stockRackList[i].storCode;
					storName = data.stockRackList[i].storName;
					rackCode = data.stockRackList[i].rackCode;
					rackName = data.stockRackList[i].rackName;
					stockQty = data.stockRackList[i].stockQty;
					//$("#insurCode").append("<option value='"+custName+"' >"+custName+"</option>");
					$("#iDiv_rack_lst").append("<tr style='cursor:pointer;' onClick=setRackInfo('"+storCode+"','"+encodeURI(storName)+"','"+rackCode+"','"+encodeURI(rackName)+"','"+stockQty+"')> <td style='width:200px;margin-top: 15px;'>[" + storName + "]</td> <td style='width:200px; margin-top: 15px;'>" + rackName + "</td><td style='width:200px;margin-top: 15px;'> " + stockQty + "</td> </tr>");
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

//선택한 랙정보 displqy
function setRackInfo(storCode,storName,rackCode,rackName,stockQty) {
	
	$("#storCode").val(storCode);
	$("#storName").val(decodeURI(storName));
	$("#rackCode").val(rackCode);
	$("#rackName").val(decodeURI(rackName));
	$("#stockQty").val(stockQty);
}


//유형선택한 경우 
function setStockProcType() {
	var stockProcType = $(':radio[name="stockProcType"]:checked').val();
	//console.log("stockProcType:"+stockProcType);
	$("#whQtyDp").css("display","none");
	$("#rlQtyDp").css("display","none");
	$("#moveQtyDp").css("display","none");
	$("#inspecQtyDp").css("display","none");
	//$("#stockPlaceMove").css("display","none");
	$("#stockPlaceMove").hide();
	
	$("#rlodQtyDp").css("display","none");
	$("#whriQtyDp").css("display","none");

	//$("#whPrDiv").css("display","none");

	
	if (stockProcType == 'whna') {
		$("#whQtyDp").css("display","block");
		//$("#whPrDiv").css("display","block");
		
	}else if (stockProcType == 'rlna') {
		$("#rlQtyDp").css("display","block");
		$("#rlPrDp").css("display","block");
		//$("#whPrDiv").css("display","block");
	}else if (stockProcType == 'move') {		
		$("#moveQtyDp").css("display","block");
		$("#movePrDp").css("display","block");
	//	$("#stockPlaceMove").css("display","block");
	$("#stockPlaceMove").show();
	}else if (stockProcType == 'inspec') {
		$("#inspecQtyDp").css("display","block");
		$("#inspecPrDp").css("display","block");
	}else if (stockProcType == 'rlod') {
		$("#rlodQtyDp").css("display","block");
		$("#rlPrDp").css("display","block");
		//$("#whPrDiv").css("display","block");
	}else if (stockProcType == 'whri') {
		$("#whriQtyDp").css("display","block");
		//$("#whPrDiv").css("display","block");
		
	}
	
}

//이거 지우면 오류남.
function updateGridRow() {
	
}


function findStor(url, page) {
	//console.log(url);
	var list = [];
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"validYN" : "Y"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.storageList.length == 0) {
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				for (i = 0; i < data.storageList.length; i++) {
					$("#storCode").append("<option value="+data.storageList[i].storageCode+" txtVal="+data.storageList[i].storageName+" >"+data.storageList[i].storageName+"</option>");
					$("#storCode2").append("<option value="+data.storageList[i].storageCode+" txtVal="+data.storageList[i].storageName+" >"+data.storageList[i].storageName+"</option>");
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
function findRackCall(elementName, dialogOpenYN) {

		//var storCode = $("#storCode").val();
   	
	//부모창의 값을 가져와서DP
	$("#pop_storCode").val(); 
	$("#pop_storName").val();
	$("#pop_rackCode").val(); 
	$("#pop_rackName").val();
	
	if (elementName == 'rackCode') {
	 	var selStorCode = $("#storCode option:selected"); //$("#memberSel option:selected").text();
	 	var selTxtVal = selStorCode.attr('txtVal');
		$("#pop_storCode").val($("#storCode").val()); 
		$("#pop_storName").val(selTxtVal);

	}else if(elementName == 'rackCode2') {
		var selStorCode = $("#storCode2 option:selected"); //$("#memberSel option:selected").text();
	 	var selTxtVal = selStorCode.attr('txtVal');
		$("#pop_storCode").val($("#storCode2").val()); 
		$("#pop_storName").val(selTxtVal);
	}

	
	//console.log("sorcode: "+$("#storCode").val());
	//console.log("sorcode: "+selTxtVal);	
	
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
								updateGridRowRack(elementName);
							},
			"취소": function(event) {
				dialogRack.dialog("close");
			}
		},
		close: function() {
			// $( "#users tbody tr td" ).empty();	   	
		}
	});
	createGridRack(columnLayoutRack,elementName);
	dialogRack.dialog("open");
	
	AUIGrid.clearGridData(myGridIDRack);	
	 
	if ( $("#pop_storCode").val() !='' || $("#pop_storName").val() !='' ) {
    	findRack('/base/rack-list' );
    }
}

// 랙 칼럼 레이아웃 작성
var columnLayoutRack = [
	  { dataField: "storCode", headerText: "창고코드", width: 100 }
	, { dataField: "storName", headerText: "창고명", width: 120, style: "left"  }
	, { dataField: "rackCode", headerText: "랙코드", width: 220}
	, { dataField: "rackName", headerText: "랙명", width: 220, style: "left" }

];

function createGridRack(columnLayoutRack, elementName) {
	var auiGridProps = {
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
		
		//$("#storCode").val(rowItem.storCode);
		//$("#rackCode").val(rowItem.rackCode);
		//$("#rackName").val(rowItem.rackName);
		
		if (elementName == 'rackCode') {
			$("#storCode").val(rowItem.storCode);
			$("#rackCode").val(rowItem.rackCode);
			$("#rackName").val(rowItem.rackName);
			$("#stockQty").val("");
		} else if (elementName == 'rackCode2') {
			$("#storCode2").val(rowItem.storCode);
			$("#rackCode2").val(rowItem.rackCode);
			$("#rackName2").val(rowItem.rackName);
		}
		
	

		//$(obj).val(rowItem.custCode);
		//$("#" + name + "").val(rowItem.custName);

		var dialogRack;
		$("#dialog-form-rack").dialog("close");
		//dialogRack = $("#dialog-form-Rack").dialog({		});

		//dialogRack.dialog("close");
	});

	/*
	AUIGrid.bind(myGridIDRack, "keyDown", function(event) {
		if (event.dataFiled == 13) { // Insert 키

			var i, rowItem, rowInfoObj, dataField;
			var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
			rowInfoObj = selectedItems[0];
			rowItem = rowInfoObj.item;
			$(obj).val(rowItem.custCode);
			$("#" + name + "").val(rowItem.custName);

			var dialogCust;
			dialogCust = $("#dialog-form-rack").dialog({
				
			});

			dialogCust.dialog("close");

			return false; // 기본 행위 안함.
		}
	});
	*/
}

$("#btnRackFind").click(function() {
	
	//if (document.getElementById('srchEqualItemNo')) { //do stuff }
	//	$("#srchEqualItemNo").val();
	//}
	findRack('/base/rack-list' );
});

function findRack(url,page) {
	//console.log(url);

	var list = [];
	var storageCode = $("#pop_storCode").val();
	var storageName = $("#pop_storName").val();  
	var rackCode = $("#pop_rackCode").val(); 
	var rackName = $("#pop_rackName").val(); 
	//var barcode = $("#pop_barcode").val(); 

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"storageCode":storageCode,
			"storageName":storageName,
			"rackCode":rackCode,
			"rackName":rackName
			//"barcode":barcode

		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.rackList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.rackList.length; i++) {
					list.push({
						  storCode: data.rackList[i].storageCode
						, storName: data.rackList[i].storageName
						, rackCode: data.rackList[i].rackCode
						, rackName: data.rackList[i].rackName
						//, barcode: data.rackList[i].barcode
						//, validYN: data.rackList[i].validYN
						//, regUserId: data.rackList[i].regUserId
						//, uptUserId: data.rackList[i].uptUserId

					});

					//firstGrid_mst.setData(list); // 그리드에 데이터 설정

				}
				AUIGrid.setGridData("#grid_wrap_rack", list);
				//console.log("list page:"+page);
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


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowRack(elementName) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDRack);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	
	if (elementName == 'rackCode') {
		$("#storCode").val(rowItem.storCode);
		$("#rackCode").val(rowItem.rackCode);
		$("#rackName").val(rowItem.rackName);
	} else if (elementName == 'rackCode2') {
		$("#storCode2").val(rowItem.storCode);
		$("#rackCode2").val(rowItem.rackCode);
		$("#rackName2").val(rowItem.rackName);
	}
	
	$( "#dialog-form-rack").dialog("close");	
	
}

function resetRackInfo() {
	$("#rackCode").val("");
	$("#rackName").val("");
	$("#stockQty").val("");
}

//\이동할 창고 rest
function resetRackInfo2() {
	$("#rackCode2").val("");
	$("#rackName2").val("");
}
// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {

    if(dblRegClkChk()) return;  //Reg Double click Check 2024.05.16 yoonsang
    
	document.getElementById('btnReg').classList.toggle('disabled');
	
	var actionType = $(':radio[name="stockProcType"]:checked').val();
	
	setStartSpinner();
	 
	var itemId = $("#itemId").val();  
    var rackCode = $("#rackCode").val();
    var procQty = $("#procQty").val(); 
    var procMemo1  = $("#procMemo1").val();
      
    var rackCode2 = $("#rackCode2").val();
     var inPrice  = $("#inPrice").val();
    
      var storCode  = $("#storCode").val();
      
    if (itemId == '' || rackCode == '' || procQty == '' || (actionType!="inspec" && procQty == 0)) {
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();	alert("부품,랙,수량은 필수 입력해야 합니다.");		  $("#rackCode").focus();		return;	
	}
	
	if (actionType == 'move' && rackCode2 == '' ) {
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();	alert("이동의 경우 이동랙을 필수 입력해야 합니다.");		  $("#rackCode2").focus();		return;	
	}
	
	var data = {};
	
    data.workingType = "ADD";
    data.actionType = actionType;
	data.itemId = itemId;  
    data.rackCode = rackCode; 
    data.procQty = procQty;
    data.procMemo1 = procMemo1;  
    data.afterRackCode = rackCode2;
    data.inPrice = inPrice;
    data.storCode = storCode;


    //단일 수동입고처리 바코드 부품데이터 전송
    setBarcodeProp('itemData', data);
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
			setStopSpinner();
	        alert(data.result_code+":"+data.result_msg);
	        //alert(data.result_code+":"+data.result_msg+ "\n변경된 재고수량을 확인하려면 조회를 다시 하세요.");
	//       parent.jQuery.fancybox.close();
			if(data.result_code == 'OK')
			{
				$("#btnReg").hide();
				$("#btnBarcodePrint").show();
				
				
				
		        $('#btnFind', parent.document).click();  //2024.03.21 sg -부모창 조회 버튼 클릭  
		     }
		     else
		     	document.getElementById('btnReg').classList.toggle('disabled');
			//parent.location.reload(true);
		
	    },
	    error:function(request, status, error){
			dblRegClkBln = false;
			setStopSpinner();
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

