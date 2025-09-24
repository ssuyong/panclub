// 그리드 생성 후 해당 ID 보관 변수 
var myGridID; //정동근추가

//그리드에서 물류센터의 리스트가 저장되는 변수
let logisCodeList = [];

//창고구분에 들어가는 리스트
const storTypeList = ["신품", "중고", "리퍼" ,"불량", "분실", "폐기"]; // 230215 장윤상추가, 폐기추가 2024.10.15 sg

 
//init
$(document).ready(function(){ // script가 html 로드 후 실행하게 해주는 구문 정동근
	  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();
    logisCodeListFind();
    
    //조회조건 창고구분 셀렉트박스 옵션 셋팅
    const selectBox = document.getElementById ("storType");
	for(var i = 0 ; i<storTypeList.length; i++){
		var option = document.createElement("option");
		option.text = storTypeList[i];
		selectBox.add(option);
	}
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var userId_val = $("#userId").val(); 
		var userName_val = $("#userName").val();		
		
		if ( typeof userId_val == 'undefined'){ userId_val = ''	}
		if ( typeof userName_val == 'undefined'){ userName_val = ''	}
		
		document.location.hash = '#info'+currentPage+"!"+userId_val+"!"+userName_val;
		//
		
		findDataToServer();
	});
	
	
	$("#btnReg").click(function(){
		//alert("저장버튼");
		updateDataToServer("/base/storageAdd", "workingType");
	});
});	
	

// AUIGrid 를 생성합니다.
function createAUIGrid() {
	
	//체크박스 자주써서 아에 속성으로 해둠
	const checkBoxAttribute={style : "aui-grid-user-custom",
		styleFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
			if(value == "Y") {
				return "my-inactive-style";
			} else if(value == "N") {
				return "my-active-style";
			}
				return "";
			},
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
				checkValue : "Y", // true, false 인 경우가 기본
				unCheckValue : "N", 
				checkableFunction :  function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
					return true;
				}
			}
	}
	
	//그리드 생성후 안쓰기 때문에 생성함수 안으로 이동시킴
	const columnLayout = [
		{ dataField : "storageCode_origin",    headerText : "코드원본", visible : false} 
		,{ dataField : "storageCode",    headerText : "창고코드", width : 140} 
		,{ dataField : "storageName",   headerText : "창고명", width : 140, style:"left" } 
		,{ dataField : "storType",   headerText : "창고구분", width : 90,
			renderer: {
				type: "DropDownListRenderer",
				descendants: ["leaf"], // 자손 필드들
				descendantDefaultValues: ["-"], // 변경 시 자손들에게 기본값 지정
				list: storTypeList
			}	
		} 
		,{
		     dataField : "logisCode",
		     headerText : "물류센터",
		     width : 100, 
		     renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
		     	type : "DropDownListRenderer",
		     	list :logisCodeList
		     }
		     ,filter:{showIcon:true}
		}   		
		,{ dataField : "memo1",     headerText : "메모", width : 140, style:"left"}	
		,{ dataField : "workableYN",     headerText : "판매가능창고여부", width : 140, ...checkBoxAttribute}	
		,{ dataField : "consignYN",     headerText : "수탁창고여부", width : 140, ...checkBoxAttribute , 
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : true, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : false, // 체크박스 편집 활성화 여부(기본값 : false)
				checkValue : "Y", // true, false 인 경우가 기본
				unCheckValue : "N",
				 
				checkableFunction :  function(rowIndex, columnIndex, value, isChecked, item, dataField ) { 
					if(value == "Y") {
						alert("수탁창고로 체크되면 해제할 수 없습니다.");
						return false;
					} else {
						if(item.consignCustCode == null || item.consignCustCode == ''){
							alert("수탁업체부터 등록해야 체크할 수 있습니다");
							return false;
						}else{
							if (!confirm("수탁창고로 체크하시면 해제할 수 없습니다.\n변경하시겠습니까?")) { return false; }
							return true;
						}
						
					} 
				}
			}}
		,{ dataField : "consignCustCode",     headerText : "수탁업체코드"  ,editable : false  , filter:{showIcon:true} , width : 110}
		,{ dataField : "consignCustName",      headerText : "수탁업체명"  , style:"left "   ,editable : true	 , filter:{showIcon:true}, width : 110
			,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
					if (event.item.consignYN != "Y") {
						$("#grid-custCode1").val("consignCustCode");
						$("#grid-custName1").val("consignCustName");
						const dialogCust = $( "#dialog-form-cust" ).dialog({
							height: 700,
							width: "70%",
							modal: true,
							headerHeight: 40,
							position:[400,400],
							buttons: {
								"확인": function(event) {	updateGridRowCust("consignCustCode", "consignCustName", 'Y');},
								"취소": function(event) {	dialogCust.dialog("close");}
							},
						});	
						createGridCust(columnLayoutCust,'','','Y'); 
						dialogCust.dialog("open");
					}else{
							alert("수탁창고를 등록한 수탁업체는 수정이 불가능합니다.")
							return;
						}
				}
			}  
		}
		,{ dataField : "consignCoworkCustCode",     headerText : "수탁협력사코드"  ,editable : false  , filter:{showIcon:true} , width : 110}
		,{ dataField : "consignCoworkCustName",      headerText : "수탁협력사명"  , style:"left "   ,editable : true	 , filter:{showIcon:true}, width : 110
			,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
				//if (event.item.consignYN != "Y") {
					$("#grid-custCode1").val("consignCoworkCustCode");
					$("#grid-custName1").val("consignCoworkCustName");
					const dialogCust = $( "#dialog-form-cust" ).dialog({
						height: 700,
						width: "70%",
						modal: true,
						headerHeight: 40,
						position:[400,400],
						buttons: {
						"확인": function(event) {		updateGridRowCust("consignCoworkCustCode", "consignCoworkCustName", 'Y');},
						"취소": function(event) {		dialogCust.dialog("close");	}
						},
					});	
					createGridCust(columnLayoutCust,'','','Y'); 
					dialogCust.dialog("open");
					}
				}  
			}
		,{ dataField : "rlStandByYN",     headerText : "출고대기창고여부", width : 140, ...checkBoxAttribute}
		,{ dataField : "ctStorageYN",     headerText : "위탁회수창고여부", width : 140, ...checkBoxAttribute}
		,{ dataField : "consignViewYN",     headerText : "외부비노출", width : 140, ...checkBoxAttribute}		
		,{ dataField : "validYN",     headerText : "사용유무", width : 140, ...checkBoxAttribute}
		,{ dataField : "regUserId",     headerText : "등록자", width : 140}
		,{ dataField : "uptUserId",     headerText : "수정자", width : 140}
		
	];
	
	const auiGridProps = {			
			
			editable : true,			
			
			// 상태 칼럼 사용
			showStateColumn : true,
						
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
			rowIdField : "storageCode_origin",
			showAutoNoDataMessage : false, 
			enableFilter: true, //필터 활성화

	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
 
	
	// 에디팅 시작 이벤트 바인딩 정동근 
	AUIGrid.bind(myGridID, "cellEditBegin", function (event) { 

			//신규 추가된 창고만 창고코드 편집 가능하게 하는 유효검사인듯
			if (event.dataField == "storageCode") {
				// 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
				if (AUIGrid.isAddedById(event.pid, event.item["storageCode_origin"])) {
					return true;
				} else {
					return false; // false 반환하면 기본 행위 안함(즉, cellEditBegin 의 기본행위는 에디팅 진입임)
				}
								
			}
			
			//
			if (event.dataField == "consignCustName") {
				if (event.item.consignYN == "Y") {
					return false; // false 반환. 기본 행위인 편집 불가
				}
			}
			
			return true; // 다른 필드들은 편집 허용
		});
  
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		if (event.dataField == 'consignCustName' && event.item.consignYN == "Y"){
			alert("수탁창고를 등록한 수탁업체는 수정이 불가능합니다.")			
		}
	});
		 
}
 
function findDataToServer() {
  
	$.ajax(	{
		type : "POST",
		url : "/base/storage-list",
		dataType : "json",
		data: {			
			storageCode:$("#storageCode").val(),
			storageName:$("#storageName").val(),
			storType:$("#storType").val(),
			validYN:$("#validYN").val(),
			rlStandByYN:$("#rlStandByYN").val(),
			workableYN:$("#workableYN").val(),
			consignYN:$("#consignYN").val()			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){ 
			if (result.storageList.length == 0){
				alert("조건에 맞는 자료가 없습니다."); 
				return
			}						
					
			const resultData = result.storageList.sort((a,b)=>parseInt(a.storageCode) - parseInt(b.storageCode)) // 창코코드를 숫자기반으로 정렬
												 .map(r=>{ 
															return {	
																		...r 
																		,storageCode_origin : r.storageCode   //기존 데이터에서 origin 정보추가저장
																	}
													});
													
			AUIGrid.setGridData("#grid_wrap", resultData);
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

// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {

	const isValid1 = AUIGrid.validateGridData(myGridID, ["storageCode", "storageName"], "창고코드, 창고명 필드는 반드시 값을 직접 입력해야 합니다.");
	const isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["storageCode", "storageName"], "코드, 창고명 필드는 반드시 유효한 값을 직접 입력해야 합니다."); 
	const isStorTypeNull =  AUIGrid.validateGridData(myGridID, ["storType"], "창고구분은 반드시 선택해야 합니다.");
	
	
	if (isValid1 == false || isValidChanged1 == false || isStorTypeNull == false) {
		return;
	}
	
	const data = {
						storageAdd : AUIGrid.getAddedRowItems(myGridID) ,
						storageUpdate : AUIGrid.getEditedRowItems(myGridID) , 
						storageRemove : AUIGrid.getRemovedItems(myGridID),
						workingType
		};
		
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) { 
	        alert(data.result_code+":"+data.result_msg); 
	        if(data.result_code == 'OK') //정상 생성시에만 새로고침
		        location.reload();
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};
 
// 행 추가, 삽입
function addRow(rowPos) {
	AUIGrid.addRow(myGridID, {}, rowPos);
};
 
 
// consignCustCode 2023.08.24
//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;

	item = {
		itemId: rowItem.itemId,
		itemNo: rowItem.itemNo,
		itemName: rowItem.itemName,
		itemNameEn: rowItem.itemNameEn,
		salePrice: rowItem.salePrice
		, unitPrice: rowItem.salePrice
		, cnt: 1
		, saleUnitPrice: rowItem.salePrice 
		, sumPrice: rowItem.salePrice * 1
		,dcExceptYN : rowItem.dcExceptYN
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");	
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}
		
		
		
function updateGridRowCust(obj,name, gridYN) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	//console.log("gryn:"+gridYN);
	if (gridYN == 'Y') {	
		item = {
					consignCustCode: rowItem.custCode,
					consignCustName: rowItem.custName,
				};
		  
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.custCode);
			$("#"+name+"").val(rowItem.custName);
	}
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");	
	dialogCust.dialog("close");	
	
}


function logisCodeListFind() // 수령물류센터 코드 받아오는 통신. 2024.06.04 hsg
{
	$.ajax({
		type: "POST",
		url: "/base/logisCodeList",
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {  
			for(let i = 0 ; i < data.logisCodeList.length ; i++)
			{
				logisCodeList.push(data.logisCodeList[i].code); // 디테일 auigrid용 리스트 배열에 추가 
			} 
		},
		error: function(e){
			
		}
		
	})
	
}	
		
