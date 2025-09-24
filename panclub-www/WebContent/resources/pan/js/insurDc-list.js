 // 그리드 생성 후 해당 ID 보관 변수
var myGridID; 
const setTimeoutDelay = 100; 

$(document).ready(function() {
 
	createAUIGrid();

	$("#btnInsurDcRateFind").click(function() { //조회
		findDataToServer(); 
	});

	$("#btnInsurDcRateReg").click(function() { //저장
		updateDataToServer();
	});

});

// AUIGrid 를 생성합니다.
function createAUIGrid() {

	const inserList = findDataInserList();
	const {makerList , custTypeList} = findDataCode(); 

	const columnLayout = [
		{ dataField: "insurIdx", headerText: "보험사할인율Idx", editable: false, visible: false }
		, { dataField: "insurCode", headerText: "보험사코드", editable: false, visible: false }
		, {
			dataField: "insurName",
			headerText: "보험사",
			sortType: 1,
			cellMerge: true,
			editable: true,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				return inserList.find(r=>r.code == value)?.value;
			}, 
			editRenderer: {
				type: "DropDownListRenderer",
				list: inserList,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			},
		}
		, { dataField: "makerCode", headerText: "브랜드코드", editable: false, visible: false }
		, {
			dataField: "makerName",
			headerText: "브랜드",
			sortType: 1,
			cellMerge: true,
			editable: true,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				return makerList.find(r=>r.code == value)?.value;
			}, 
			editRenderer: {
				type: "DropDownListRenderer",
				list: makerList,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			},
		}
		, { dataField: "custTypeCode", headerText: "구분코드", editable: false, visible: false }
		, {
			dataField: "custTypeName",
			headerText: "구분",
			sortType: 1,
			editable: true,
			labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				return custTypeList.find(r=>r.code == value)?.value;
			}, 
			editRenderer: {
				type: "DropDownListRenderer",
				list: custTypeList,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			},
		}
		, { dataField: "dcRate", headerText: "할인율", dataType: "numeric" }
		, { dataField: "dcRate_origin", headerText: "#할인율", editable: false, visible: false }
		, { dataField: "startYmd", headerText: "적용일" , editable: false}
		, { dataField: "endYmd", headerText: "종료일" , editable: false}
		, { dataField: "memo", headerText: "메모" }
		, { dataField: "created", headerText: "등록일", visible: false  , editable: false}
		, { dataField: "regUserId", headerText: "등록자ID"  , visible: false  ,editable: false}
		, { dataField: "modified", headerText: "수정일", visible: false  , editable: false}
		, { dataField: "uptUserId", headerText: "수정자ID", visible: false  , editable: false}
		, { dataField: "regUserName", headerText: "등록자"  , editable: false}
		, { dataField: "uptUserName", headerText: "수정자"  , editable: false}
	];

	const auiGridProps = {
		editable: true,

		// 상태 칼럼 사용
		//showStateColumn : true
		// 페이징 사용		
		//usePaging: true,
		// 한 화면에 출력되는 행 개수 20(기본값:20)
		//pageRowCount: 50,

		// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
		//showPageRowSelect: true,
		enableCellMerge: true,
		enableFilter: true,

		showStateColumn: true,

		selectionMode: "multipleCells",
		rowIdField: "insurIdx",
		//showAutoNoDataMessage : false, 
	};
 
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
 
 	//신규 행추가만 수정가능
	AUIGrid.bind(myGridID, "cellEditBegin", function(event) { 
 
	//	if (event.dataField == "insurName" || event.dataField == "makerName" || event.dataField == "custTypeName") {
			// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
			const rowIdField = AUIGrid.getProp(event.pid, "rowIdField");
			if (AUIGrid.isAddedById(event.pid, event.item[rowIdField])) {
				return true;
			} else {
				return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
			}
	//	}
	//	return true; // 다른 필드들은 편집 허용
	})
}

//ajax 통신 에러 중복코드 작성 많아서 따로 작성
function errorMsg(x, e) 
{
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
 
//마스터 조회
function findDataToServer() { 
	$.ajax({
		type: "POST",
		url: "/base/insurDc-list",
		dataType: "json",
		data: {
			insurCode: $("#insurCode").val(),
			makerCode: $("#makerCode").val(),
			curInsurDcRateYN : $('input:checkbox[name=curInsurDcRateYN]').is(':checked')?'Y':'N'
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(result) {
			if (result.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				return
			} 
			const resultData = result.map(r=>{
															return {	...r
																		, insurName : r.insurCode 
																		, makerName  : r.makerCode
																		, custTypeName : r.custTypeCode
																		, dcRate_origin : r.dcRate 
																	}
														})
			
			AUIGrid.setGridData("#grid_wrap", resultData); 
		},
		error: errorMsg
	});
}

//보험사 리스트 받아와서 조회조건의 보험사 셀렉트박스의 option리스트 체워넣는 기능 , auigrid의 보험사 리스트로 쓸 리스트 받아오는 기능
function findDataInserList() {
	let inserList;
	$.ajax({
		type: "POST",
		url: "/base/cust-list",
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(result) { 
			
			const inscdList = result.custList.filter(r=>r.aos_inscd); //보험사 코드가 null , '' 이 제외된 리스트
			const insurCodeHTML = $("#insurCode"); //조회조건 보험사의 셀렉트 박스
			
			inscdList.forEach(r=>{insurCodeHTML.append("<option value='" + r.custCode + "' >" + r.custName + "</option>");})
		  
 			inserList = inscdList.map(r=>{return {code : r.custCode , value:r.custName}})
		},
		error: errorMsg
	});

	return inserList; // 리턴을 바깥에서 해야함 
}

//브랜드코드, 구분코드등 가져오는 통신 같은 통신을 3번 하고 있어서 하나로 합침
function findDataCode() {
	let makerList;
	let custTypeList;
	$.ajax({
		type: "POST",
		url: "/base/code-list",
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(result) {
			
			const makerCodeList = result.codeList.filter(r=>r.mCode == '1000');
			const custTypeCodeList = result.codeList.filter(r=>r.mCode =='2000');
			
			const makerCodeHTML = $("#makerCode");
			
			makerCodeList.forEach(r=>{makerCodeHTML.append("<option value='" + r.code + "' >" + r.code + " : " + r.codeName + "</option>");})
			
			makerList = makerCodeList.map(r=>{return {code : r.code , value : r.codeName}});
			custTypeList = custTypeCodeList.map(r=>{return {code : r.code , value : r.codeName}});
		},
		error: errorMsg
	});

	return {makerList , custTypeList}; // 리턴을 바깥에서 해야함 
}
 
//행추가 
function addRow(grid, rowPos) {
	AUIGrid.addRow(myGridID, {}, rowPos);
};
 
//저장
function updateDataToServer() { 
	const addRowItems = AUIGrid.getAddedRowItems(myGridID);
	
 
	//추가된 행 갯수가 있는지 검사
	if(addRowItems.length == 0)
	{
		alert('추가된 행이 없습니다.');
		return;
	}
	 
	// 브랜드 코드가 비어있는지 검사
	if(addRowItems.find(r=>(r.makerName || '' )== ''))
	{
		alert("브랜드코드가 비어있는 행이 존재합니다");
		return;
	}
	
	if(addRowItems.find(r=>isNaN(r.dcRate || 0)))
	{
		alert("할인율은 숫자만 가능합니다");
		return;
	}
	
	
	const duplicateList = addRowItems.map(r=>{return  `${r.insurName}${r.makerName}${r.custTypeName}`});
	//중복 검사
	const DuplicateTest = Array.from(new Set(duplicateList)).length != addRowItems.length;
	if(DuplicateTest)
	{
		alert('보험사,브랜드,구분이 동일한 행이 존재합니다');
		return;
	}
 	
 	let resultData; // 현재 적용중인 할인율 담길곳
 	$.ajax({
		type: "POST",
		url: "/base/insurDc-list",
		dataType: "json", 
		async: false,
		data : {
			curInsurDcRateYN : 'Y'
		},
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(result) {
			resultData = result.map(r=>{return  `${r.insurCode}${r.makerCode}${r.custTypeCode}`});
		},
		error: errorMsg
	});
	
	
	const count = resultData.reduce((a,c)=>{return a+(duplicateList.includes(c)?1:0)},0);
	
	if(count > 0 && !confirm(`보험사,브랜드,구분이 일치하는 현재 적용중인\n보험사 할인율이 ${count}개의 행이 존재합니다.\n새로 등록시 해당 항목은 새로 등록하는 시점으로 종료되고\n새로 등록한 할인율이 적용됩니다\n등록하시겠습니까?`))
	{ 
		return;
	}
	 
	ProgressManager.open(addRowItems.length);
	insurDcAdd(addRowItems.map(r=>{return {
										...r , 
										workingType : 'ADD',
										insurCode : r.insurName ,
										makerCode : r.makerName ,
										custTypeCode : r.custTypeName
							}})
				, 0); 
};
 
 console.log(1);

//실제 처리
function insurDcAdd(dataArr , index)
{
	ProgressManager.next();
	
	if(dataArr.length > index)
	{
		const data = dataArr[index];
		 
		setTimeout(()=>{
			$.ajax(	{
				type : "POST",
				url : "/base/insurDcAdd",
				dataType : "json",
				data  :JSON.stringify(data),
				async: false,
				contentType: "application/json; charset=utf-8",
				//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(result){  
					insurDcAdd(dataArr , index+1)
				},
				error:function(x,e){
					errorMsg(x,e);
				}
			});  
		} , setTimeoutDelay);
	}
	else
	{	 
		ProgressManager.end('처리성공' , ()=>{});
	}
}

