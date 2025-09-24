
var myGridID;
const treeData = []; //토스트 ui 트리의 데이터를 저장하기 위한 변수
let tree; // 트리자체를 저장하기 위한 변수
let selectStorCode = '';
let selectCheckType = '';

$(document).ready(function() {

	findStorage("/base/storage-list", 1);

	createAUIGrid(columnLayout);

	findSrchCode("/base/code-list")

	$("#btnFind").click(function() {
		var currentPage = 1;
		findDataToServer("/logis/stock-item-list", 1);
	});

	$("#treeReset").click(function() {  // 전체 체크 해제용 버튼 이벤트
		tree.uncheck(tree.getRootNodeId());
	});
});

// 칼럼 레이아웃 작성
var columnLayout = [
	{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField: "itemId", headerText: "부품ID", width: 80 }
	, { dataField: "itemNo", headerText: "품번", width: 150 }
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
	, { dataField: "itemNo_Xlsx", headerText: "부품번호", width: 0, xlsxTextConversion: true, style: "left" } // 엑셀
	, { dataField: "itemName", headerText: "상품명", style: "left", width: 150 }
	, { dataField: "genuine", headerText: "정품구분", width: 0, style: "left" }
	, { dataField: "makerCode", headerText: "브랜드코드", width: 68, style: "left" }
	, { dataField: "makerName", headerText: "브랜드명", width: 100, style: "left" }
	, { dataField: "stockQty", headerText: "재고수량", width: 56, style: "right" }
	, { dataField: "costPrice", headerText: "입고단가", dataType: "numeric", formatString: "#,##0", style: "right", width: 120, visible: false }
	, { dataField: "centerPrice", headerText: "센터가", dataType: "numeric", formatString: "#,##0", style: "right", width: 120 }
	, { dataField: "salePrice", headerText: "판매단가", dataType: "numeric", formatString: "#,##0", style: "right", width: 120, visible: false }
	, { dataField: "qtyxPrice", headerTooltip: { show: true, tooltipHtml: "판매가능수량 * 센터가" }, headerText: "센터가금액", dataType: "numeric", formatString: "#,##0", style: "right", width: 150 }

	, { dataField: "locaMemo", headerText: "창고위치", width: 300, style: "left" }

];
var footerLayout = [{
	labelText: "합계",
	positionField: "itemId",
	style: "aui-grid-my-column"
}, {
	dataField: "stockQty",
	positionField: "stockQty",
	operation: "SUM",
	style: "right"

}, {
	dataField: "costPrice",
	positionField: "costPrice",
	operation: "SUM",
	formatString: "#,##0"
	, style: "right"

}, {
	dataField: "centerPrice",
	positionField: "centerPrice",
	operation: "SUM",
	formatString: "#,##0"
	, style: "right"

}, {
	dataField: "salePrice",
	positionField: "salePrice",
	operation: "SUM",
	formatString: "#,##0"
	, style: "right"

}, {
	dataField: "qtyxPrice",
	positionField: "qtyxPrice",
	operation: "SUM",
	formatString: "#,##0"
	, style: "right"

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

		selectionMode: "multipleCells",

		showAutoNoDataMessage: false,

		showRowCheckColumn: true,
		rowCheckToRadio: true,
		showFooter: true,

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
	AUIGrid.setFooter(myGridID, footerLayout); //2023.07.10 bk

	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function(event) {
		currentPage = event.currentPage;
	});


}


function findDataToServer(url, page) {

	var list = [];
	const checkType = $(':radio[name="srchType"]:checked').val(); // 부품단위로 창고를 묶을지(1개의 아이템에 여러 창고가 합쳐서 나오게) 아니면 창고단위로 (1개의 아이템이 창고마다 개별로 행이 나오게)에 대한 타입


	const checkedList = tree.getCheckedList(); // 토스트에 현재 체크된 노드리스트

	let storageCode = '';
	for (let i = 0; i < checkedList.length; i++) {
		if (tree.getNodeData(checkedList[i]).type == 'storage')  // 노드의 타입이 창고인 경우에만 창고코드에 추가
		{
			if (storageCode != '') storageCode += '^';
			storageCode += tree.getNodeData(checkedList[i]).code;
		}
	}
	selectStorCode = storageCode;
	selectCheckType = checkType;
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			workingType: "STOR_LIST",
			storageCode,
			checkType
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
		 
			if (data.stockItemList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				for (i = 0; i < data.stockItemList.length; i++) {
					list.push({
						itemId: data.stockItemList[i].itemId
						, itemNo: data.stockItemList[i].itemNo
						, itemName: data.stockItemList[i].itemName
						, makerCode: data.stockItemList[i].makerCode
						, makerName: data.stockItemList[i].makerName
						, stockQty: data.stockItemList[i].stockQty
						, centerPrice: data.stockItemList[i].centerPrice
						//						,costPrice: data.stockItemList[i].costPrice 
						//						,salePrice: data.stockItemList[i].salePrice 
						, qtyxPrice: (data.stockItemList[i].stockQty) * (data.stockItemList[i].centerPrice)
						, locaMemo: data.stockItemList[i].locaMemo
						//						,uptDate: data.stockItemList[i].uptYmd + ' ' + data.stockItemList[i].uptHms
						//						,wrMemo: data.stockItemList[i].wrMemo 
						, genuine: (data.stockItemList[i].makerCode == 'AT' || data.stockItemList[i].makerCode == 'OT' || data.stockItemList[i].makerCode == 't1') ? 'O' : 'G'
						//						,workableQty: data.stockItemList[i].workableQty //231004 yoonsang

						, itemNo_Xlsx: itemNoXlsxFormat(data.stockItemList[i].itemNo, data.stockItemList[i].makerCode) //엑셀로 뽑힐때 일본차에 대한 아이템부품번호에 -을 붙여서 저장해두는 부분

						//,inspecMemo: data.stockItemList[i].inspecMemo 
 						, className: data.stockItemList[i].className
 						, factoryNo: data.stockItemList[i].factoryNo
					});

				}
				AUIGrid.setGridData("#grid_wrap", list);
				//console.log("list page:"+page);
				// 해당 페이지로 이동
				if (page > 1) {
					AUIGrid.movePageTo(myGridID, Number(page));
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


$("#btnUpt").click(function() {
	$.ajax({ url : '/permissionCheckYN' , 
		dataType : 'json',
		type : 'POST',
		
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
				checkCode : 'EH009_01'
		},
		success : (result)=>{ 
			 
			if(result)
			{
				stockUpt();
			}
			else 
			{
				alert('권한이 없습니다. 필요시 연구소로 문의해주세요.');
			}
		},
		error : (e)=>{
		}
		})
});

function stockUpt() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var itemId = "";
	var rowItem;
	var len = checkedItems.length;
	/*
	if (len <= 0) {
		alert("부품을 선택하세요!");
		return;
	}
	*/

	for (var i = 0; i < len; i++) {
		rowItem = checkedItems[i];
		itemId = rowItem.item.itemId;

	}
	//console.log("itemId:"+itemId);
	$.fancybox.open({
		//href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
		href: '/logis/stock-up?itemId=' + itemId, // 불러 올 주소
		type: 'iframe',
		width: '80%',
		height: '80%',
		padding: 0,
		fitToView: false,
		autoSize: false
		, modal: true
	});
}


function popLink(url) {

	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	var itemId = "";
	var rowItem;
	var len = checkedItems.length;

	if (len <= 0) {
		alert("부품을 선택하세요!");
		return;
	}

	rowItem = checkedItems[0];
	itemId = rowItem.item.itemId;

	//var sYmd = document.getElementById("startpicker-input").value;
	//var eYmd = document.getElementById("endpicker-input").value;

	let uWidth = (screen.width - 10);
	let uHeight = (screen.height - 200);
	let options = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=" + uWidth + ", height=" + uHeight + ", top=0,left=0";
	//console.log("itemId:"+itemId);
	//window.open(url+'?itemId='+itemId+'&sYmd='+sYmd+'&eYmd='+eYmd, '_blank', options);
	window.open(url + '?itemId=' + itemId, '_blank', options);
}

function findStorage(url, page) {

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			orderByString : "consignCustCode"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {

			if (data.storageList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {

				storageTreeGen(data);
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

//창고데이터를 이용해 토스트 데이터트리 구성 및 트리ui 생성용 함수
function storageTreeGen(data) {
	const thisComName = $("#headerCoNameDp").html(); // 트리에 업체명노드 이름에 만약 수탁업체가 없을경우 자신의 업체로 등록하기 위해 자신의 업체명을 저장
	const storTemp = {}; // 데이터를 트리데이터로 만들기 쉽게 구조화해서 임시저장용 변수

	//storTemp라는 [분류][업체명]의 2중키를 가진 객체를 만듬 두개의 키를 넣으면 마지막엔 해당 분류와 업체명의 창고데이터를 가짐
	for (let i = 0; i < data.storageList.length; i++) {
		//데이터에서 속성에 따라 분류명을 가져옴
		const rootName = data.storageList[i].validYN != 'Y' ? '미사용' :
			(data.storageList[i].ctStorageYN == 'Y' || data.storageList[i].rlStandByYN == 'Y') ? '기타' : data.storageList[i].storType;
		//데이터에서 수탁업체 속성(없으면 자신의 업체명)에 따라 업체명을 가져오고 주식회사관련 글자는 제거함
		const comName = (data.storageList[i].consignCustName ?? thisComName).replace('㈜', '').replace('(주)', '').replace("주식회사", '').replaceAll(' ', '');

		//storTemp 객체에 분류명을 키로 가지는 배열이 없을경우 빈 객체로 추가해주고, storTemp[분류명]에 업체명이 키로 등록 안됬을 경우 storTemp[분류명][업체명]에 빈 배열을 추가
		if (storTemp[rootName] == null) storTemp[rootName] = {};
		if (storTemp[rootName][comName] == null) storTemp[rootName][comName] = [];

		// for문을 돌면서 storTemp[분류명][업체명]의 배열에 해당 창고데이터를 입력
		storTemp[rootName][comName].push({
			text: data.storageList[i].storageName + '[' + data.storageList[i].storageCode + ']' + (data.storageList[i].validYN != 'Y' ? '(사용X)' : ''),
			code: data.storageList[i].storageCode,
			type: 'storage',
			validYN: data.storageList[i].validYN,
			ctStorageYN: data.storageList[i].ctStorageYN,
			rlStandByYN: data.storageList[i].rlStandByYN
		});
	}

	//{신품:{P:[{text:창고명 , code:창고코드 , type:'storage' , ...}]}}  라는 식으로 구성된 storTemp를  루트객체 - 배열분류 - 배열업체 - 창고객체
	//[{text : 신품 ,type:'stortype' , children: [{text : P ,type:'comcode' , children: [{text : 창고명 ,type:'"storage"' , children: [ ] } ] } ] }]
	for (let i = 0; i < Object.keys(storTemp).length; i++) {
		let lastChild = [];
		const curType = Object.keys(storTemp)[i]; // 신품 중고 리퍼 불량 기타 미사용

		for (let j = 0; j < Object.keys(storTemp[curType]).length; j++) // 창고트리 배열 등록
		{
			const curComName = Object.keys(storTemp[curType])[j];
			lastChild.push({ text: curComName, type: 'comCode', state: 'closed', children: storTemp[curType][curComName] })
		}

		// 루트에 업체명으로 창고트리배열을 children으로 등록
		treeData.push({ text: Object.keys(storTemp)[i], type: 'storType', children: lastChild })
	}

	// 신품 > 중고 > 불량 > 리퍼 > 기타 > 미사용 순으로 정렬  뒤로 정렬될 분류는 1~5중 높은 숫자로 부여하여 배열의 앞뒤 비교해서 앞이 높으면 서로 바꿔주는식으로 해서 정렬
	treeData.sort((a, b) => {
		const x = (a.text == '미사용' ? 5 : a.text == '기타' ? 4 : a.text == '리퍼' ? 3 : a.text == '불량' ? 2 : a.text == '중고' ? 1 : 0);
		const y = (b.text == '미사용' ? 5 : b.text == '기타' ? 4 : b.text == '리퍼' ? 3 : b.text == '불량' ? 2 : b.text == '중고' ? 1 : 0);
		return x > y ? 1 : -1;
	})

	//구조 이해 안될경우 아래 주석 풀고 로그 참고
	//	console.log(data);
	//	console.log(storTemp);
	//	console.log(treeData);

	// 데이터 [ {루트,차일드[{자식},{자식2}]} , {루트2}]	
	tree = new tui.Tree('#tree', {
		data: treeData,
		nodeDefaultState: 'opened',
		template: {
			internalNode:
				'<div class="tui-tree-content-wrapper" style="padding-left: {{indent}}px">' +
				'<button type="button" class="tui-tree-toggle-btn tui-js-tree-toggle-btn">' +
				'<span class="tui-ico-tree"></span>' +
				'{{stateLabel}}' +
				'</button>' +
				'<span class="tui-tree-text tui-js-tree-text">' +
				'<label class="tui-checkbox">' +
				'<span class="tui-ico-check"><input type="checkbox" class="tui-tree-checkbox"></span>' +
				'</label>' +
				'<span class="tui-tree-ico tui-ico-folder"></span>' +
				'{{text}}' +
				'</span>' +
				'</div>' +
				'<ul class="tui-tree-subtree tui-js-tree-subtree">{{children}}</ul>',
			leafNode:
				'<div class="tui-tree-content-wrapper tree-stor" style="padding-left: {{indent}}px">' +
				'<span class="tui-tree-text tui-js-tree-text">' +
				'<label class="tui-checkbox">' +
				'<span class="tui-ico-check "><input type="checkbox" class="tui-tree-checkbox"></span>' +
				'</label>' +
				'<span class="tui-tree-ico"></span>' +
				'{{text}}' +
				'</span>' +
				'</div>'
		}
	}).enableFeature('Checkbox', {
		checkboxClassName: 'tui-tree-checkbox',
	});

	//트리 전체돌면서 창고 속성에 따라 아이콘컬러 변경 아이콘css는 stock-item-list-stor jsp에 있음
	tree.eachAll(function(node, nodeId) {
		if (node._data.type == 'comCode' || node._data.type == 'storType' || node._data.type == null) return;  //창고를 제외한 노드 제외

		let iconColor = 'ti-ico-green';

		if (node._data.validYN != 'Y')  // 사용여부 y가 아니면 붉은 아이콘
			iconColor = 'ti-ico-red';
		else if (node._data.ctStorageYN == 'Y' || node._data.rlStandByYN == 'Y') // 사용중인데 출고대기나 위탁회수여부가 y인경우 파란아이콘
			iconColor = 'ti-ico-blue';

		$("#" + nodeId).find('span.tui-tree-ico').addClass(iconColor);
	});

}
function partsmallexportTo() //파츠몰 엑셀 Xlsx로 안되서 Xls로 변경
{
	if (AUIGrid.getGridData(myGridID).length == 0) {
		alert("조회된 데이터가 없습니다.");
		return;
	}

 
 	
//	document.location.href = "/logis/stock-item-list-stor/exportXls?workingType=STOR_LIST&storageCode=" +encodeURIComponent(selectStorCode) +"&checkType=" + selectCheckType;
	
	AUIGrid.exportToXlsx(myGridID, {
		showRowNumColumn: false,
		exceptColumnFields: ["itemId", "itemNo", "itemName", "makerName", "centerPrice", "qtyxPrice", "locaMemo"],
		columnSizeOfDataField: { "itemNo_Xlsx": 150, "genuine": 150, "makerCode": 150, "stockQty": 100 },
	});
															
}
function itemNoXlsxFormat(str, type) // 혼다와 일본 브랜드 부품번호 변조용 함수
{
	if (type == 'HD') // 혼다의 경우 5-3-~ aaaaa-bbb-ccccccc
	{
		let text = str.slice(0, 5);
		if (str.length > 5) text += '-' + str.slice(5, 8);
		if (str.length > 8) text += '-' + str.slice(8, str.length);
		return text;
	}
	else if (type == 'TT' || type == 'LX' || type == 'NI' || type == 'IF' || type == 'MI' || type == 'SB') // 혼다외 일본 5-5-~ aaaaa-bbbbb-ccccccc
	{
		let text = str.slice(0, 5);
		if (str.length > 5) text += '-' + str.slice(5, 10);
		if (str.length > 10) text += '-' + str.slice(10, str.length);
		return text;
	}
	else //aaaaaaaaaaaaaa
	{
		return str;
	}
} 