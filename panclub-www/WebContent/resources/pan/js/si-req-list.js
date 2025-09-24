
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridIDRack;


$(".ui-dialog-titlebar-close").html("X");

/* Begin : Date Picker Date Range*/
var today = new Date();
let yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000)); // 2년전부 오늘까지
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
	}

});



function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	
}

$(document).ready(function() {

	findDataToServer2("/base/storage-list", 1);
	createAUIGrid();
	

	$("#btnFind").click(function() {
		findDataToServer("/order/stock-in-req-item-list", 1);
	});

	$('#procState').select2();
	
});


// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [
		{ dataField: "idx", headerText: "idx", width: 50, editable: false ,visible: false}
		, { dataField: "step", headerText: "상태", width: 60,editable: false }
		, { dataField: "reqType", headerText: "요청구분",editable: false , filter:{showIcon:true}}		// 그린파츠로 발주넣었다고 반출하는 외부재고인경우 / 회수처리했거나 다른발주처로 주문나갔다가 재고투입해야하는경우 두가지
		 
		, { dataField : "className",    headerText : "구분", width : 60   } 
		, { dataField : "brandName",    headerText : "제조사명", width : 80 , style:"left" } 		
		, { dataField: "itemId", headerText: "부품ID", width: 80, editable: false }
		, { dataField: "itemNo", headerText: "품번", width: 130,style: "left", editable: false }
		, { dataField : "factoryNo",    headerText : "공장품번", width : 100 , style:"left"}
		, { dataField: "itemName", headerText: "품명", width: 150,style: "left", editable: false, style: "left" }
		, { dataField: "cnt", headerText: "요청수량", width: 60, dataType: "numeric", formatString: "#,##0", style: "right", editable: false }
		, { dataField : "centerPrice",    headerText : "센터가", width : 80 , style:"right", dataType: "numeric",formatString: "#,##0"}
		, { dataField : "totalCenterPrice",    headerText : "센터금액", width : 80 , style:"right", dataType: "numeric",formatString: "#,##0"
			, headerTooltip : {
		        show : true,
		        tooltipHtml : '센터가 * 수량'
		    }
		  }
	
		, { dataField: "reqComCode", headerText: "요청업체코드", width: 80, editable: false ,visible: false}
		, { dataField: "reqComName", headerText: "요청업체명", width: 100, editable: false }
		
		, { dataField: "storageCode", headerText: "입고예정창고코드", width: 110, style: "left", editable: false }
		, { dataField: "storageName", headerText: "입고예정창고명", width: 100, style: "left", editable: false}
		, { dataField: "rackCode", headerText: "입고예정랙코드", width: 100, style: "left", editable: false }
		, { dataField: "rackName", headerText: "입고예정랙명", width: 90, style: "left", editable: false }
		, { dataField: "memo1", headerText: "비고1", style: "left", editable: false }
		, { dataField: "memo2", headerText: "비고2", style: "left", editable: false }
		
		, { dataField: "regUserId", headerText: "요청자",editable: false , visible: false }
		, { dataField: "regUserName", headerText: "요청자", width: 100,editable: false ,filter:{showIcon:true} }
		, { dataField: "regYmd", headerText: "요청날짜", width: 100,editable: false }
		, { dataField: "regHms", headerText: "요청시간",editable: false, visible: false  }
		, { dataField: "stockInUserId", headerText: "처리자", editable: false, visible: false   }
		, { dataField: "stockInUserName", headerText: "처리자", width: 100,editable: false }
		, { dataField: "stockInDate", headerText: "처리시간",editable: false }
		, { dataField: "jobNo", headerText: "처리번호",editable: false , visible: false }
		, { dataField: "jobSeq", headerText: "처리순번",editable: false  , visible: false }
		, { dataField: "placeNo", headerText: "발주번호",editable: false  , visible: false }
		, { dataField: "placeSeq", headerText: "발주순번",editable: false  , visible: false }
		, { dataField: "possibleQty", headerText: "재고투입가능수량",editable: false  , visible: false}
		
	
	];
	// 푸터 설정
	const footerLayout = [{
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
		dataField: "centerPrice",
		positionField: "centerPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "totalCenterPrice",
		positionField: "totalCenterPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}];


	// 그리드 속성 설정
	var gridPros = {

		editable: false,
		
		pageRowCount: 500,
		
		enableFilter: true,
		// 상태 칼럼 사용
		rowIdField: "idx",

		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		// 소프트 제거 모드 사용 안함
		softRemoveRowMode: false,


		//showAutoNoDataMessage: false,
		independentAllCheckBox: true,    // 전체 선택 체크박스가 독립적인 역할을 할지 여부

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		showFooter: true,
		

			
		rowCheckDisabledFunction: function(rowIndex, isChecked, item) {
			if (item.step =="처리") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;			
		}
		
		

	};

	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
	if (event.checked) {
	 
		let uniqueValues = ['','요청'];
 
		AUIGrid.setCheckedRowsByValue(event.pid, "step", uniqueValues);
	} else {
		AUIGrid.setCheckedRowsByValue(event.pid, "step", []);
	}
	
	
	});
	
	AUIGrid.setFooter(myGridID, footerLayout);
}


// 이겅
//발주품목 조회
function findDataToServer(url, page, noWhYN) {
	let list = [];

	let sYmd = document.getElementById("startpicker-input").value;
	let eYmd = document.getElementById("endpicker-input").value;
	let ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true) {
		ymdIgnoreYN = "Y";
	}

/*
	var bizNo = $(':radio[name="bizNo"]:checked').val();
*/
	let workingType = "FIN-REQ";
	let itemId = $("#itemId").val();
	//if(itemId == ''){itemId = 0;}
	let itemNo = $("#itemNo").val();
	let procState = $("#procState").val()?.join('^') || ''
	let reqType = $("#reqType").val();
	
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": workingType,
			"sYmd": sYmd,
			"eYmd": eYmd,
			"ymdIgnoreYN": ymdIgnoreYN
			
			, "itemId": itemId
			, "itemNo": itemNo
			, "procState": procState
			,"reqType" : reqType
			
		
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success : (result)=>{ 
			
			const gridData = result.map((item, index) => {
		        const stockInDate = new Date(item.stockInDate);
		        return {
		            ...item,
		            stockInDate: item.stockInDate?`${stockInDate.getFullYear()}-${(stockInDate.getMonth()+1).toString().padStart(2,'0')}-${stockInDate.getDate().toString().padStart(2,'0')}`:'', 
		            idx: index + 1
		        };
		    });
			AUIGrid.setGridData("#grid_wrap", gridData);  
		},
		error : (e)=>{
		}

	});
}


// print (selected only )-2023.07.14 bk 
	function print() {
	var rowItem;
	var plcArr = "";
	var seqArr = "";
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
		
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
	if (checkedItems.length <= 0) {
		alert("인쇄할 품목을 선택하세요!");
		return;
	}
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		plcArr = plcArr + "^" + rowItem.item.placeNo;
		seqArr = seqArr + "^" + rowItem.item.placeSeq;
		//console.log("plcArr"+plcArr);
		//console.log("seqArr"+seqArr);
	}
	var url = "/logis/wh-up-print?plcArr=" + encodeURIComponent(plcArr) + "&seqArr=" + encodeURIComponent(seqArr)+"&sYmd=" + sYmd + "&eYmd=" + eYmd;
	window.open(url, "_blank");
};


function rackSelect(type) 
{
	let checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	let reqType = '';
	let reqTypeStd = '';
	
	let rowIdField = AUIGrid.getProp(myGridID, "idx");
	let rowId;
	let checked;
	let rowItemA;
	
	var rackArr = [];
	var storArr = [];
	var rackNameArr = [];
	var storNameArr = [];
	var possibleQtyArr = [];
	
	var list = [];
	
	let totReqQty;
	
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItemA = checkedItems[i];
		reqTypeStd = checkedItems[0].item.reqType
		reqType = rowItemA.item.reqType
		
		if (i != 0 && reqTypeStd != reqType) {

			rowId = rowItemA[rowIdField];
			checked = AUIGrid.isCheckedRowById(myGridID, rowId);
			
			alert("동일한 요청구분만 선택하세요.");
			return;
		}
		if(rowItemA.item.step == '처리'){
			
			alert("처리상태의 품목이 선택되었습니다. 요청상태의 품목만 창고입고 할 수 있습니다.");
			return;			
		}
		if(reqTypeStd=='반품입고' && i != 0){
			alert("반품입고된 품목은 한개씩 처리해야합니다.");
			return;			
		}
		
		var rackCode = rowItemA.item.rackCode;
		var storCode = rowItemA.item.storageCode;
		var rackName = rowItemA.item.rackName;
		var storName = rowItemA.item.storageName;
		var possibleQty= rowItemA.item.possibleQty;

	    // rackCode에서 콤마로 분리하여 배열로 저장
	    var splitRackCodes = rackCode.split(',');
	    var splitStorCodes = storCode.split(',');
	    var splitRackNames = rackName.split(',');
	    var splitStorNames = storName.split(',');
	    var splitPossibleQtys = possibleQty.split(',');
	
	    // 각 rackCode를 trim하여 rackCodes 배열에 추가
	    for (var j = 0; j < splitRackCodes.length; j++) {
	        rackArr.push(splitRackCodes[j].trim());
	        storArr.push(splitStorCodes[j].trim());
	        rackNameArr.push(splitRackNames[j].trim());
	        storNameArr.push(splitStorNames[j].trim());
	        possibleQtyArr.push(splitPossibleQtys[j].trim());
	    }


	}
	if(reqTypeStd=='반품입고'){
		
		totReqQty = checkedItems[0].item.cnt
		
		for (i = 0; i < rackArr.length; i++) {
			list.push({
				  storCode: storArr[i]
				, storName: storNameArr[i]
				, rackCode: rackArr[i]
				, rackName: rackNameArr[i]
				, reqQty: 0
				, itemId: checkedItems[0].item.itemId
				, reqComCode: checkedItems[0].item.reqComCode
				, placeNo: checkedItems[0].item.placeNo
				, placeSeq: checkedItems[0].item.placeSeq
				, jobNo: checkedItems[0].item.jobNo
				, jobSeq: checkedItems[0].item.jobSeq
				, possibleQty: possibleQtyArr[i]
		
			});
		}
		
	
	}
	
	$("#pop_storCode").val('');
	$("#pop_rackCode").val();
	$("#pop_rackName").val();
	$("#pop_itemId").val();
	$("#grid-rackCode1").val("rackCode");
	$("#grid-rackName1").val("rackName");


	
	const dialogRack = $( "#dialog-form-rack" ).dialog({
		height: 700,
		width: "50%",
		modal: true,
		headerHeight: 40,
		position:[400,400],
		buttons: {
			"확인": function(event) {
				rackApply(type);
				
			},
			"취소": function (event) {
				dialogRack.dialog("close");
			}
		},
		close: function() {
			AUIGrid.showColumnByDataField(myGridIDRack,	'stockQty'); //재고수량 컬럼 다른곳에서 쓰고 있기에 창이 닫히면 숨김 해제
			$("#pop_itemId").show();
			$("#datalist-container").show();
			
		}
		,open :()=>{
			$("#pop_rackSrch").val('');
			$("#pop_itemId").val('');
			$("#totReqQty").val(totReqQty);
			$("#sumReqQty").val(totReqQty);
			
	        //$(":focus").blur();
	        setTimeout(() => {
	            $("#hidden-focus").focus();
	        }, 10);
	        
	        if(reqType =='반품입고'){
				
				 setTimeout(() => {
					
					$("#reqTypePop").val("반품입고");
					AUIGrid.showColumnByDataField(myGridIDRack,	'possibleQty');
					AUIGrid.showColumnByDataField(myGridIDRack,	'reqQty'); 
                    AUIGrid.setGridData("#grid_wrap_rack", list);
                }, 100); // Adjust delay as necessary			
			}else{
				setTimeout(() => {
					
					$("#reqTypePop").val("재고투입");
					AUIGrid.hideColumnByDataField(myGridIDRack,	'possibleQty'); 
					AUIGrid.hideColumnByDataField(myGridIDRack,	'reqQty'); 
                }, 100); // Adjust delay as necessary
			}
	      
		}
	});	
	AUIGrid.clearGridData(myGridIDRack);
	commonCreateGridRack(columnLayoutRack,'', '', '', '', 0,'Y');
	dialogRack.dialog("open");	
	
 
	
	AUIGrid.bind(myGridIDRack, "cellDoubleClick",()=>{
		rackApply(type); 
	});
	
	AUIGrid.bind(myGridIDRack, "cellEditEnd", auiCellEditingHandler);
	
	AUIGrid.hideColumnByDataField(myGridIDRack,	'stockQty'); //재고수량 컬럼 숨김처리
	$("#pop_itemId").hide();
	
}

function findDataToServer2(url, page) {
	
	var list = [];
	var listS;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			validYN : 'Y'
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			
			// selectBox.innerHTML = "";
			
			if (data.storageList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				const selectBox = $("#storageCode");
				selectBox.append(`<option value=''></option>`)
//				 var blankOption = document.createElement("option");
//						  blankOption.value = "";
//						  blankOption.text = "";
//						  selectBox.appendChild(blankOption);
				for (i = 0; i < data.storageList.length; i++) {
					
//					var option = document.createElement("option");
//					
//					option.value = data.storageList[i].storageName + " ("+  data.storageList[i].storageCode + ")";
//					option.storagCode = data.storageList[i].storageCode;	 
//					option.value = data.storageList[i].storageCode;	
//					option.text  =data.storageList[i].storageName + " ("+  data.storageList[i].storageCode + ")";
				 
				 	
				 	 //데이터리스트에 값으로 노출되는 창고이름(코드)로 추가되고 숨겨진 데이터로 창고코드로 추가(검색용)
					 selectBox.append(`<option value='${data.storageList[i].storageName} (${data.storageList[i].storageCode})' data-storagecode=${data.storageList[i].storageCode}></option>`);
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
}

function rackApply(type)
{
	const selectedRack = AUIGrid.getSelectedItems(myGridIDRack);
	//let checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
	if(selectedRack.length ==0)
	{
		 alert("랙을 선택해주세요");
		 return;
	}
	if(selectedRack.length >1) 
	{
		alert("랙을 하나만 선택해주세요");
		return;
	}
	
	let rackCode = selectedRack[0].item.rackCode;
	let rackName = selectedRack[0].item.rackName;
	let storageCode = selectedRack[0].item.storCode;
	let storageName = selectedRack[0].item.storName;
	
	if (!confirm("선택하신 창고와 선택하신 랙으로 재고투입 하시겠습니까?")){
		$("#dialog-form-rack").dialog("close");
		return;
	}
	
	updateDataToServer("/logis/stockItemAdd", "STOCK-IN",rackCode);

	$("#dialog-form-rack").dialog("close");
}

function updateDataToServer( url, workingType, rackCodeSel) {
	 
	let checkRows;

	const resultArr = []; 
	
	var data = {};  
	
	if($("#reqTypePop").val()=='재고투입'){
		checkRows = AUIGrid.getCheckedRowItems('#grid_wrap').map((row)=>row.item);
							
	}else{
		
		checkRows = AUIGrid.getEditedRowItems(myGridIDRack);

	}
	
    let sumReqQty = 0;
    if($("#reqTypePop").val()=='반품입고'){
		for(const item of checkRows){
			sumReqQty= sumReqQty+ item.reqQty
		}
		if(sumReqQty != $("#totReqQty").val()){
			alert("요청수량만큼 처리하세요");
			return;
		}
	}

    const progressInfo = progressOpen(checkRows.length)
    
    
    
	for(const item of checkRows)
	{
		data.workingType = workingType;
	    data.actionType = 'move';
		data.itemId = item.itemId;
		//data.procQty = item.cnt;
		
		
		
		if($("#reqTypePop").val()=='재고투입'){
			data.procMemo1 = '재고투입';
			data.procQty = item.cnt;
			data.jobNo = item.jobNo;
			data.jobSeq = '';
			data.placeNo = '';						
			data.placeSeq = '';
			data.afterRackCode = rackCodeSel;						
		}else{

			data.procMemo1 = '반품입고';
			data.procQty = item.reqQty;
			data.jobNo = item.jobNo;
			data.jobSeq = item.jobSeq;
			data.placeNo =item.placeNo;
			data.placeSeq =item.placeSeq;
			data.afterRackCode = item.rackCode;
		}
		
		
	
		
		data.reqComCode = item.reqComCode
		
		
		$.ajax({
		    url : url,
		    dataType : "json",
		    type : "POST",
		    contentType: "application/json; charset=utf-8",
		    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		    data : JSON.stringify(data),
		    async : false,
		    success : (result)=>{ 
				resultArr.push(result);
				progressSet(progressInfo , progressInfo.curProgress+1);
			},
		    error:function(request, status, error){
	
		        alert("code:"+request.status+"\n"+"error:"+error);
		    }
		});
	}
	
	setTimeout(()=>{  
		
		const errObj = resultArr.reduce((a,c)=>{
                    if(c.result_code == 'Err')
                    {
                        a.errMsg.push(c.result_msg)
                        return {errSum:a.errSum+1,errMsg : a.errMsg};
                    }
                    else return a
                
                } , {errSum : 0 , errMsg : [] })
       	if(errObj.errSum == 0)
       	{
		 	alert('처리성공'); 
		}
		else 
		{
			alert(`${errObj.errSum}건 실패 : ${errObj.errMsg.reduce((a,c)=>a+'\n'+c,'')}`);
		}
		$( "#dialog-form-itemProgress" ).dialog('close');
		findDataToServer("/order/stock-in-req-item-list", 1);
	},550);
	
};

function progressOpen( lastProgress)  //진행바 열어주고 최대치 정보 셋팅
{
	const progressInfo = {curProgress : 0 , progressBar: $("#progress-bar") ,lastProgress }; 
	 
	$("#cur").html(0);
	$("#last").html(lastProgress);
	
	
	dialogProgress = $( "#dialog-form-itemProgress" ).dialog({
	    autoOpen: false,
	    height: 100,
	    //minWidth: 500,
	    width: "25%",
	    modal: true,
 		open:()=>{
			progressInfo.progressBar.width(0);
		},
	    close: function() {
			progressInfo.progressBar.width(0);
			progressInfo.curProgress = -1; //다이얼로그가 닫히면 더 진행 안함 
	    }
	  });
	  $( "#dialog-form-itemProgress" ).dialog().parent().children(".ui-dialog-titlebar").children(".ui-dialog-titlebar-close").hide();
	  dialogProgress.dialog( "open" );
	  return progressInfo;
}
function progressSet(progressInfo , curProgress)
{
	if(progressInfo?.progressBar == null) return;
	progressInfo.curProgress = curProgress;
	progressInfo.progressBar.width(`${(progressInfo.curProgress * 100 / progressInfo.lastProgress)}%`);
	$("#cur").html(curProgress);
}


function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		
		if (event.value>$("#totReqQty").val() || event.value > $("#sumReqQty").val() ){
			alert("요청수량이 총 요청수량보다 많습니다!");
			item = {
				reqQty: 0
			};
			AUIGrid.updateRow(myGridID, item, "selectedIndex");
			
		}else{
			$("#sumReqQty").val($("#sumReqQty").val()-event.value);
		}
		
		if(event.value> event.item.possibleQty ){
			
			alert("요청수량이 재고투입가능수량보다 많습니다!");
			item = {
				reqQty: 0
			};
			AUIGrid.updateRow(myGridID, item, "selectedIndex");			
		}
		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	

















