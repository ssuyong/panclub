
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridIDItem;
var myGridIDCust;
var myGridIDCustMgr;
var myGridIDRack;


let progressBar;  // 진행바
let checkedItems; // 체크된 디테일  두개의 함수 
let curIndex; // 현재 진행중인 인덱스
let wrNo; // 현재 진행중인 번호

//바코드 깊은 복사 분기 플래그
let barcodeLoadFlag = false;
 
const consignCodeList = ['']; // 위탁업체 리스트
const consignNameList = ['']; // 위탁업체 리스트

function dealWithKeyboard(event) {
	
}

$(document).ready(function(){
	
	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	//랙팝업 창고 셋팅
  	//commonFindStor("/base/storage-list", 1,'pop_storCode','','','', 'Y', '');
  	findDataToServer2("/base/storage-list", 1);
  	//commonFindRackCall('','','','','','Y');
  	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();	

	$("#btnReg").click(function(){
		//fn_dcProc();
		updateDataToServer("/logis/stockWrAdd", "ADD");
	});
	$("#btnUpt").click(function(){
		//fn_dcProc();
		updateDataToServer("/logis/stockWrAdd", "UPT");
	});
	$("#btnDel").click(function(){
		if (confirm("삭제되면 복구가 불가능 합니다. 전체를 삭제하시겠습니까?\n품목삭제(행삭제)를 하려면 [수정]버튼을 클릭하세요.")){
			updateDataToServer("/logis/stockWrAdd", "DEL");
		}
	});
	$("#btnNew").click(function(){
			 window.location.href = "/logis/stock-wr-up";
	});
	
	$("input:radio[name=dcDspType]").click(function(){
        //fn_dcProc();
	});
	
 	$("#btnConsignNew").click(()=>{
		const consignComCode = $('#consignComCode [value="'+$("#consignComText").val()+'"]').data('custcode') || '';
		const myForm = document.popForm;
		const url = "/logis/stock-wr-up";
		myForm.action =url;  
		$("#popForm_consignComCode").val(consignComCode);
		myForm.target = "_blank"; 


		myForm.submit(); 
		 
//		data.consignComCode = $('#consignComCode [value="'+$("#consignComText").val()+'"]').data('custcode') || '';
	})
	 
	$("#iwrNo").keydown((e)=>{  // 처리번호 조회
		const iwrNo = $("#iwrNo");
		
		// 키입력이 {= 연속으로 시작되면 이후 키다운 이벤트를 가져가서 바코드 스캔시작 . 엔터키를 누르면 그동안 입력된 문자열을 json으로 변환하여 i키 가져옴 이외의 입력은 무시
		if(barcoderInterceptor(iwrNo ,  e.keyCode , 'i')) return;
		
		let nextWrNo = iwrNo.val();
	 
		if(e.keyCode != 13) return;

 	 
	 
		
		let f = document.createElement('form');
		let obj;
		
		
		
		obj = document.createElement('input');
		obj.setAttribute('type', 'hidden');
		obj.setAttribute('name', 'wrNo');
		//바코드스캔으로 가져온경우 즉 WR20240403001_1 같은경우 wrNo를 20240403001로 변경하고 바코드스캔이 아닌경우 20240403001 -> 그대로 , 20240403001_1 -> 20240403001로 셋팅
		obj.setAttribute('value', nextWrNo.indexOf('wr') == -1 ? nextWrNo.split('_')[0] : nextWrNo.replace('wr','').split('_')[0]);    
		f.appendChild(obj);
		
		if(nextWrNo.indexOf('_') > -1) // 순번인 wrSeq를 바코드 스캔의 경우 WR20240403001_3 -> 3로 , 20240403001_1 -> 1로 셋팅 , 만약 _가 없는 그냥 처리순번만 들어있을경우 입력 안함
		{
			obj = document.createElement('input');
			obj.setAttribute('type', 'hidden');
			obj.setAttribute('name', 'wrSeq');
			obj.setAttribute('value',  nextWrNo.split('_')[1]); //wr20240403001_2 -> 2 
			f.appendChild(obj); 
		}
		 
		f.setAttribute('method', 'post');
		f.setAttribute('action', '/logis/stock-wr-up');
		document.body.appendChild(f);
		
		 
		f.submit();		
		 
	})
		
	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	let wrNo = $("#wrNo").val();
	setDatalistCust("/club/c-cust"); //위탁업체 선택박스 셋팅
	if (wrNo !=''){
		findMst('/logis/stock-wr-list');
	}	  
	else //재고관리/랙에서 넘어온 url쿼리 받아서 셋팅하는 부분
	{
		const params = new URL(document.location).searchParams;
		const selectRack = params.get('selectRack');
		
		if(selectRack != null)
		{
			 
			$("#wrType").val('move');
			findRackItem(selectRack);
			$("#wrType").bind('change',()=>{
				alert("랙재고 이동은 처리구분을 변경할수 없습니다.");
				$("#wrType").val('move');
				});
		}
		const consignComCode = params.get('consignComCode');
		
		if(consignComCode != null)
		{ 
			$("#wrType").val('itemList');
			$("#btnProc").attr('disabled',true);
			$("#consignComCodeLabel").show();
			$("#consignComCodeSelect").show();
			$("#consignComText").val($(`#consignComCode [data-custcode="${consignComCode}"]`).val());
		//	$("#consignComText").val(`${data.stockWrList[i].consignComName} (${data.stockWrList[i].consignComCode})`);
		}
	}
	
	$("#wrType").change((e)=>{
		
		if($("#wrType").val() == 'itemList')
		{ 
			$("#btnProc").attr('disabled',true);
			$("#consignComCodeLabel").show();
			$("#consignComCodeSelect").show();
			$("#consignComText").val('');
		}
		else 
		{
			$("#btnProc").attr('disabled',false);
			$("#consignComCodeLabel").hide();
			$("#consignComCodeSelect").hide();
		}
	})
	
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false }		 
		,{ dataField : "wrSeq",      headerText : "순번", width : 56, editable : false, dataType: "numeric" }
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 90, editable : false }
		,{ dataField : "makerName",      headerText : "제조사명"  , width : 70, style : "left"   }
		,{ 
			dataField : "itemNo",      headerText : "품번", width : 120 , style:"left" , enableDrag :false , style:"auigrid-must-col-style" 
			,headerTooltip : { // 헤더 툴팁 표시 HTML 양식
		        show : true,
		        tooltipHtml : '필수입력값입니다.'
		    }
		    ,renderer: {
				type: "IconRenderer",
				iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
				iconHeight: 16,
				iconPosition: "aisleRight",
				iconTableRef: { // icon 값 참조할 테이블 레퍼런스
					"default": "/resources/img/content_paste_search_black_24dp.svg" // default
				},
				onClick: function (event) {
					//alert("( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.item.name + " 달력 클릭");
					$("#pop_itemNo").val();

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
					    },
					    open:()=>{ // 팝업열릴때 선택한 셀의 품번 넣어주고 팝업내 그리드 비워줌
							$("#pop_itemNo").val(event.text);
							AUIGrid.clearGridData("#grid_wrap_item"); 
						}
					});	
					createItemGrid(columnLayoutItem,'Y');
					dialogItem.dialog("open");
					
				}
			} 
		 }
		, { dataField: "factoryNo", headerText: "공장품번", width: 120 }  
		,{ dataField : "itemName", headerText : "품명", width: 200, editable : true, style:"left"  } 
		,{ dataField : "qty",      headerText : "처리수량", width : 56, dataType: "numeric",formatString: "#,##0"  , style:"right  auigrid-must-col-style"
			,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18		}	     }
		,{ dataField : "printQty",      headerText : "출력수량", width : 56, dataType: "numeric",formatString: "#,##0"  , style:"right  auigrid-must-col-style"
			,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18		}	     }
		,{ dataField : "unitPrice",     headerText : "단가", width : 120,dataType: "numeric",formatString: "#,##0"  , style:"right"   , editable : false, visible : false
			,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18	,allowNegative         : true   	}	     
		 }
		,{ dataField : "sumPrice",     headerText : "합계", width : 120, editable : false , dataType: "numeric",formatString: "#,##0" , style:"right" , editable : false, visible : false}
		,{ dataField : "consignCustCode", headerText : "소유업체코드", width: 80,  editable : true ,
	     editRenderer : {
	            type : "ComboBoxRenderer",
	            list : consignCodeList 
	      } } 
		,{ dataField : "consignCustName", headerText : "소유업체명", width: 100,  editable : true ,
	     editRenderer : {
	            type : "ComboBoxRenderer",
	            list : consignNameList , 
	            autoCompleteMode : true , 
	            matchFromFirst : false
	      } } 
		,{ dataField : "storCode", headerText : "창고코드", width: 80, editable : true, editable : false  } 
		,{ dataField : "storName", headerText : "창고명", width: 100, editable : true, editable : false, style : "left"  }
		,{ dataField : "rackCode", headerText : "랙코드", width: 80, editable : true, editable : false  } 
		,{ dataField : "rackName", headerText : "랙명", width: 100, editable : true, style:"left  auigrid-must-col-style"
			,renderer: {
					type: "IconRenderer",
					iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
					iconHeight: 16,
					iconPosition: "aisleRight",
					iconTableRef: { // icon 값 참조할 테이블 레퍼런스
						"default": "/resources/img/content_paste_search_black_24dp.svg" // default
					},
					onClick: function (event) {
						$("#pop_rackCode").val();
						$("#pop_rackName").val();
						$("#pop_itemId").val(event.item.itemId);
						$("#grid-rackCode1").val("rackCode");
					    $("#grid-rackName1").val("rackName");
					    
						var dialogRack;
						//if($("#bizType").val() !== '이동' && $("#wrType").val() ==='wh'){
						if($("#wrType").val() ==='whna' || $("#wrType").val() ==='whri' ){
							$("#pop_itemId").val("");
						}	//2023.10.05 yoonsang
						dialogRack = $( "#dialog-form-rack" ).dialog({
						    //autoOpen: false,
						    height: 700,
						    //minWidth: 500,
						    width: "70%",
						    modal: true,
						    headerHeight: 40,
							//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
							position:[400,400],
							buttons: {
								"확인": function(event) {
									updateGridRowRack("rackCode", "rackName", 'Y');
								},
								"취소": function (event) {
									dialogRack.dialog("close");
								}
							},
						    close: function() {
						     // $( "#users tbody tr td" ).empty();	   	
						    }
						    ,open :()=>{ 
								$("#pop_rackSrch").val(event.item.rackName);
							}
						});	
						AUIGrid.clearGridData(myGridIDRack);
						commonCreateGridRack(columnLayoutRack,'', '', '', '', 0,'Y');
						dialogRack.dialog("open");						
					}
				}  
		  }
		,{ dataField : "stockQty", headerText : "랙재고", width: 56, editable : true, editable : false, style : "right"   }  
		,{ dataField : "moveStorCode", headerText : "이동창고코드", width: 80, editable : true, editable : false  }
		,{ dataField : "moveStorName", headerText : "이동창고명", width: 100, editable : true, editable : false, style : "left"   }
		,{ dataField : "moveRackCode", headerText : "이동랙코드", width: 80, editable : true, editable : false  } 
		,{ dataField : "moveRackName", headerText : "이동랙명", width: 100, editable : true, style:"left  auigrid-opt-col-style" 
			,renderer: {
					type: "IconRenderer",
					iconWidth: 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
					iconHeight: 16,
					iconPosition: "aisleRight",
					iconTableRef: { // icon 값 참조할 테이블 레퍼런스
						"default": "/resources/img/content_paste_search_black_24dp.svg" // default
					},
					onClick: function (event) {
						$("#pop_rackCode").val();
						$("#pop_rackName").val();
						$("#pop_itemId").val('');
						$("#grid-rackCode1").val("moveRackCode");
					    $("#grid-rackName1").val("moveRackName");
					    
						var dialogRack;
						dialogRack = $( "#dialog-form-rack" ).dialog({
						    //autoOpen: false,
						    height: 700,
						    //minWidth: 500,
						    width: "70%",
						    modal: true,
						    headerHeight: 40,
							//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
							position:[400,400],
							buttons: {
								"확인": function(event) {
									updateGridRowRack("moveRackCode", "moveRackName", 'Y');
								},
								"취소": function (event) {
									dialogRack.dialog("close");
								}
							},
						    close: function() {
						     // $( "#users tbody tr td" ).empty();	   	
						    }
						    ,open :()=>{
								$("#pop_rackSrch").val(event.item.moveRackName);
							}
						});	
						AUIGrid.clearGridData(myGridIDRack);
						commonCreateGridRack(columnLayoutRack,'', '', '', '', 0, 'Y');
						dialogRack.dialog("open");						
					}
				}  
		 }
		,{ dataField : "memo1",     headerText : "비고",  style:"left auigrid-opt-col-style"}
		,{ dataField : "chkUserId", headerText : "처리자", width: 80, editable : true, editable : false  } 
		,{ dataField : "chkUserName", headerText : "처리자명", width: 90, editable : true, editable : false  }
		,{ dataField : "chkDate", headerText : "처리일자", width: 120, editable : true, editable : false  }
//		,{ dataField : "centerPrice", headerText : "센터가", width: 120, editable : true, editable : false  }
//		,{ dataField : "sumCenterPrice", headerText : "금액", width: 120, editable : true, editable : false  }
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
		dataField: "unitPrice",
		positionField: "unitPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}];
	
	// 그리드 속성 설정
	var gridPros = {

		
		// singleRow 선택모드
		selectionMode: "multiRow",
		editable : true,			
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		showRowCheckColumn: false,
		
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		enableDrag: true,
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		enableMultipleDrag: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		enableDragByCellDrag: false,
		// 드랍 가능 여부 (기본값 : true)
		enableDrop: true,
		
		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		showRowCheckColumn: true, //체크박스 표시 설정
        // 전체 선택 체크박스가 독립적인 역할을 할지 여부
		//independentAllCheckBox: true,
		
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
//		enterKeyColumnBase: true,

						
		// 엑스트라 체크박스 표시 설정
		//showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		// 푸터를 상단에 출력시킴(기본값: "bottom")
		showFooter: true,
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		

        //sortableByFormatValue :true,
			
		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
//		rowCheckableFunction: function (rowIndex, isChecked, item) {
//			console.log("chkU:"+item.chkUserId);
//			if (item.chkUserId != "") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
//				return false;
//			}
//			return true;
//		},
//
//		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
//			if (item.chkUserId != "") { // 체크박스 disabeld 처리함
//				return false; // false 반환하면 disabled 처리됨
//			}
//			return true;
//		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	addRow(myGridID,'last');  //첫행 자동 추가  
	
	
	//addRow(myGridID,'last');  //첫행 자동 추가
	
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);		
	
	
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditBegin", auiCellEditingBeginHandler);


	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	//AUIGrid.bind(myGridID, "cellEditBe", auiCellEditingBeforeHandler);
	//AUIGrid.bind(myGridID, "cellEditEndBefore", auiCellEditingBeforeHandler);
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);
	
	
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		
		
	});
	
	
	// 셀 선택변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var allItems = AUIGrid.getGridData(myGridID);
       AUIGrid.removeRow(myGridID, allItems .length+1);
       //fn_dcProc();
      
	});	
	AUIGrid.bind(myGridID, "addRowFinish", function( event ) {
	});

	AUIGrid.bind(myGridID, "pasteBegin", function(event) {
	});

	//품번 붙여넣기 완료한 경우. 
	AUIGrid.bind(myGridID, "pasteEnd", function(event) {

		AUIGrid.setSelectionByIndex(0, 0); // 0, 0 으로 선택자 이동시킴.
 	
     	var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		var rowId;
		var j=0;
		var rowIndexes = [];
		
		for (var i = 0, len = allItems .length; i < len; i++) {
			//console.log("i:");
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			itemNo = AUIGrid.getCellValue(myGridID, i, "itemNo");
			itemId = AUIGrid.getCellValue(myGridID, i, "itemId");
			wrSeq  = AUIGrid.getCellValue(myGridID, i, "wrSeq");
			
			rackCode = AUIGrid.getCellValue(myGridID, i, "rackCode");
			rackName = AUIGrid.getCellValue(myGridID, i, "rackName");
			
			moveRackCode = AUIGrid.getCellValue(myGridID, i, "moveRackCode");
			moveRackName = AUIGrid.getCellValue(myGridID, i, "moveRackName");
			
			//console.log("wrSeq:"+wrSeq);
			//if ( wrSeq === undefined || wrSeq == 0 ){  //상품ID 존재하는 경우만. 이게 원본
			if (  wrSeq == '0' ){  //품번 붙여넣기하면 seq가 string '0'으로 들어가는 건들이 발생해서 삭제함
				rowIndexes[j] = i;
				j = j + 1; 
			}		
		}
		AUIGrid.removeRow(myGridID, rowIndexes);		//2023.07.03 comment. ctrl+v 시 row삭제오류  ->다시 원복		
		//fn_dcProc();		
	});

	AUIGrid.bind(myGridID, "addRow", function( event ) {

	});
	
	
	// 드랍 종료 이벤트 바인딩
	AUIGrid.bind(myGridID, "dropEnd", function (e) {
		// 정보 출력
		var item = { dspNo : e.toRowIndex + 1}; 
  		
		AUIGrid.updateRow(myGridID, item, e.toRowIndex);
		//console.log("dropEnd");				
		var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		for (var i = 0, len = allItems.length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			dspNo = AUIGrid.getCellValue(myGridID, i, "dspNo");
			if (dspNo != i+1) {
				var item = { dspNo : i + 1};
				AUIGrid.updateRow(myGridID, item, i);
			}			
		}
		
	});
	
	//행상태 클릭한 경우
	AUIGrid.bind(myGridID, "rowStateCellClick", function( event ) {
        if(event.marker == "removed") { // 현재 삭데된 상태를 클릭 한 경우
         	//fn_dcProc("remove",event.rowIndex);
         }
  	});
  	
  	AUIGrid.bind(myGridID, "cellDoubleClick", function( event ) {
	
      if (event.dataField == 'itemNo'){		
		
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		findItem('/base/item-list', 0,event.rowIndex,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		
	    //fn_dcProc();
	   }
	   if (event.dataField == 'orderNo'){
		let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-up');
		    document.body.appendChild(f);
		    f.submit();
		
		}
	});
  
	// keyDown 이벤트 바인딩
	AUIGrid.bind(myGridID, "keyDown", function (event) {
		if (event.keyCode == 45) { // Insert 키
			return false; // 기본 행위 안함.
		}
	});	

	// 전체 체크박스 클릭 이벤트 바인딩 : 주문번호 있는 경우 제외 전체체크 시 제외되게
//	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) {
//	 
//		 
//		if (event.checked) {
//			// name 의 값들 얻기
//			var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "chkUserId");
//			// Anna 제거하기
//			uniqueValues.splice(!uniqueValues.indexOf(""), 2);
//			AUIGrid.setCheckedRowsByValue(event.pid, "chkUserId", uniqueValues);
//		} else {
//			AUIGrid.setCheckedRowsByValue(event.pid, "chkUserId", []);
//		}
//	});

	//aui에 입력값 가져오는 이벤트바인드 추가
	auiBarcoderInterceptor('n');
};

function auiCellEditingBeginHandler(event) {
	
	//var allItems = AUIGrid.getGridData(myGridID);
    //AUIGrid.removeRow(myGridID, allItems .length);
    
	
     	
    // 	 addRow(myGridID,'last');  //부품찾은 후 행추가	
    
    
    //품목정리가 아닌경우 소유업체 변경 제한
    if(event.dataField == 'consignCustCode' || event.dataField == 'consignCustName')
    {
		if($("#wrType").val() != 'itemList')
		{
			alert('소유업체정보는 품목정리에서만 변경 가능합니다');
			return false;
		}
		
		return true;
	}
}

function auiCellEditingBeforeHandler(event) {
	//같은 품번인데 엔터키 하는 경우 여길 탐
	
	//var allItems = AUIGrid.getGridData(myGridID);
	//AUIGrid.removeRow(myGridID, allItems .length);
    
	if (event.dataField == 'itemNo' && (event.item.itemId == "" || event.item.itemId === undefined )){
		 
		//$("#pop_itemNo").val(event.value);
		//$("#pop_itemName").val();
		//findItem('/base/item-list', 0,event.rowIndex);  //품목을 찾아서 상품아이디 품명 등을 디스플레이
    }
    
	
}
	
function auiCellEditingHandler(event) { 
  
	if (event.dataField == 'itemNo'){
		 
		let str =  event.value;
		
		
		// auigrid 품번 입력칸에 한글 포함 문자열 넣고 엔터시 자동 영어로 변경
		if((/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/).test(str))  
		{
			str = inko.ko2en(str); 
		} 
		str = str.toUpperCase(); //엔터치면 강제 대문자로 변경
		
		//aui 입력순서에 따라 }추가 입력되는 이슈로 해당부분 지워줌
		if(str.indexOf('}') != -1)
			str = str.replace('}',''); 
 
		 
		$("#srchEqualItemNo").val(str);  
		$("#pop_itemNo").val(str);
		$("#pop_itemName").val();
		
		if(event.oldValue == null || event.oldValue == '' || barcodeLoadFlag) {  //2024.03.21 supi 값이 없는 경우만 행추가
			
			addRow(myGridID,'last');  //부품찾은 후 행추가
		}
		
		//barcodeJs에 정의되어있음 : #idx# 바코드 통신해서 성공시 true리턴
		if(auigridItemUnitBarcodeScan(event)) return;
		 
		//바코드 정보를 기반으로 통신해서 정보 받아오므로 품번 조회 생략 이지만. 혹시 못받아오면 id없으면 다시 통신
		if(!barcodeLoadFlag || AUIGrid.getCellValue(myGridID,event.rowIndex,'itemId') == null)
			findItem('/base/item-list', 0,event.rowIndex,'','N','STOCKWRUP_LIST');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
		barcodeLoadFlag = false;
		
		//품번입력시 처리수량 기본 1로 맞춰줌
	 	if(AUIGrid.getCellValue(myGridID,event.rowIndex,'qty') == null)
		{ 
			AUIGrid.updateRow(myGridID, {qty:1 , itemNo : str}, event.rowIndex);
		}  
	    //fn_dcProc();
	}else if (event.dataField == 'cnt' || event.dataField == 'unitPrice' || event.dataField == 'salePrice') {	
		//fn_dcProc();
	}
	
	if (event.dataField == 'rackName'){
		$("#srchEqualRackCode").val(event.value); 
		//$("#pop_rackCode").val(event.value);
		//$("#pop_rackName").val();
		$("#pop_rackSrch").val(event.value);
		$("#pop_itemId").val(event.item.itemId);
		$("#grid-rackCode1").val("rackCode");
	    $("#grid-rackName1").val("rackName");
		addRow(myGridID,'last');  //부품찾은 후 행추가
		
		commonFindRack('/base/rack-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	    //fn_dcProc();
	}
	
	if (event.dataField == 'moveRackName'){
		$("#srchEqualRackCode").val(event.value); 
		//$("#pop_rackCode").val(event.value);
		//$("#pop_rackName").val();
		$("#pop_rackSrch").val(event.value);
		$("#pop_itemId").val(event.item.itemId);
		$("#grid-rackCode1").val("moveRackCode");
	    $("#grid-rackName1").val("moveRackName");
		addRow(myGridID,'last');  //부품찾은 후 행추가
		
		commonFindRack('/base/rack-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	    //fn_dcProc();
	}

	if (event.dataField == 'placeCustName'){
		$("#grid-custCode1").val("placeCustCode");
		$("#grid-custName1").val("placeCustName");

		findCust(event,'',0,'','Y');
	    //fn_dcProc();
	}	
	
	if (event.type == "cellEditBegin") {
	} else if (event.type == "cellEditEnd") {
	} else if (event.type == "cellEditCancel") {
	}
	
	
	//셀의 소유업체명이나 소유업체코드를 수정하면 셀 전체의 소유업체 정보를 인덱스 기반으로 동기화시켜줌
	if(event.dataField == 'consignCustCode' || event.dataField == 'consignCustName')
	{
		
		const custInfoIndex = event.dataField == 'consignCustCode' ? consignCodeList.findIndex(r=>r==event.value) : 
																     consignNameList.findIndex(r=>r==event.value);
																     
		AUIGrid.updateRow('#grid_wrap' , {consignCustCode : consignCodeList[custInfoIndex] , consignCustName : consignNameList[custInfoIndex]} , event.rowIndex)
	
	} 
};

		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;

// 행 추가, 삽입
function addRow(grid,rowPos) {
	
	var item = new Object();
	var gridData = AUIGrid.getGridData(myGridID);
	
    item.dspNo = gridData.length+1;
 //   item.chkUserId = ''; // 처리아이디가 ''이 아니면 체크박스 체크 불가능한데 ''로 초기화 부분이 누락되서 추가 엿다가 체크불가가사라져서 주석처리

	AUIGrid.addRow(myGridID, item, rowPos);	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
 	$("#iDiv_noSrchPop").css("display","none");
 
	let allItemDelYN = 'N';  //전체아이템 삭제여부
	if (workingType == 'UPT') { //수정인 경우 주문순번에 값이 없으면 기존 디테일 전제 삭제후 등록
		var allItems = AUIGrid.getGridData(myGridID);
		
		
//		//수동처리가 1건이상이면 서버에서 막게 되어 있긴 한데 js에서 1차적으로 막는 코드 추가
//		for(item of allItems)
//		{
//			if(item.chkUserId != '')
//			{
//				alert("수동처리가 1건이라도 된경우에는 수정할수없습니다.");
//				return;
//			}
//		}
		
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		
		let allNew = true;
		for (var i = 0, len = allItems.length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			wrSeq = AUIGrid.getCellValue(myGridID, i, "wrSeq");
			
			if (wrSeq !='' && wrSeq !== undefined){  //공백이 아닌 경우 
				allNew = false;
			}
		}
		
		if (allNew == true){
			
			if(!confirm("기존 등록된 품목이 전체 삭제됩니다. 수정하시겠습니까?")){
				return;
			}
			allItemDelYN = 'Y';			
		}
	}

	document.getElementById('btnReg').classList.toggle('disabled');
	setStartSpinner();
	 
	var wrNo = $("#wrNo").val();  
    //var bizType = $("#bizType").val(); 
    var wrType = $("#wrType").val(); 
    //var consignCustCode = $("#consignCustCode").val(); 
    var memo1 = $("#memo1").val(); 

    //var consignCustName = $("#consignCustName").val();
    //필수입력값  
    //if (bizType == '' || wrType == '' ) {
	if (wrType == '' ) {
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();//	alert("유형과 처리구부은 필수 입력해야 합니다.");
		//$("#iDiv_noSrchPop").text("ⓘ 유형과 처리구분은 필수 입력해야 합니다");
		$("#iDiv_noSrchPop").text("ⓘ 처리구분은 필수 입력해야 합니다");
	    $("#iDiv_noSrchPop").css("display","block");
		//$("#consignCustCode").focus();		
		return false;
		//setStopSpinner();	alert("납품처 거래처코드와 거래처명은 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	
	}
	
	//위탁인 경우 위탁거래처
	//if (bizType == '위탁' && (consignCustCode == '' || consignCustName == '') ) {
	/*
	if (consignCustCode == '' || consignCustName == ''){
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();//	alert("유형과 처리구부은 필수 입력해야 합니다.");
		$("#iDiv_noSrchPop").text("ⓘ 위탁의 경우 위탁거래처를 입력해야 합니다.");
	    $("#iDiv_noSrchPop").css("display","block");
		//$("#consignCustCode").focus();		
		return false;
		//setStopSpinner();	alert("납품처 거래처코드와 거래처명은 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	
	}
	*/
	
	fn_delBlankRowAll(myGridID, "itemId");  //itemId가 공백인것은 상태값 초기화하여 저장안되게 처리.
    
    //랙선택 안해도 등록 가능하도록 수정
    
    
     if(wrType != 'itemList')
     {
		var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "qty"], "품번, 수량, 랙 필드는 반드시 유효한 값을 입력해야 합니다.");
			
		if (isValidChanged1 == false) {
			document.getElementById('btnReg').classList.toggle('disabled');
			setStopSpinner();
			return;
		}
	}
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	var removeList = AUIGrid.getRemovedItems(myGridID);    
    
	//console.log("addList : " + addList);
	//console.log("size() : " + addList.length);
	
	/*if(addList.length<1)
		{
			setStopSpinner();
			document.getElementById('btnReg').classList.toggle('disabled');
			alert("다시");
			return;
		}*/
	
    if(wrType == 'itemList') //품목정리에서 수량미입력이나 엑셀 불러오기 대응, 마스터의 업체지정 대응
    {
		const selectConsignComCode = $('#consignComCode [value="'+$("#consignComText").val()+'"]').data('custcode');
		 
		addList = AUIGrid.getAddedRowItems(myGridID).map((row)=>{
		    row.qty = row.qty || 1; 
		    //    row.consignCustCode = selectConsignComCode || '';
		    
		    //셀의 위착업체 정보가 비어있으면 마스터의 위탁업체코드를 쓰고 있으면 자신것을 씀
			row.consignCustCode = row.consignCustCode || selectConsignComCode;
		    return row;
		});    
		
		if($("#consignComText").val() != barcodeProp.consignComText) 
			updateList = AUIGrid.getGridData(myGridID);
		
		updateList = updateList.filter((row)=>{ 
		    row.qty = row.qty || 1;
		//    row.consignCustCode = selectConsignComCode || '';
		//셀의 위착업체 정보가 비어있으면 마스터의 위탁업체코드를 쓰고 있으면 자신것을 씀
		    row.consignCustCode = row.consignCustCode || selectConsignComCode;
		    if(row.dspNo == null) 
			    return true;
			else return false;
		});     
	}
    /*console.log("wrNo : " + wrNo);
	if (!wrNo || wrNo.trim() == '') {
		if (addList.length === 0) {
			document.getElementById('btnReg').classList.toggle('disabled');
			setStopSpinner();
			alert("부품을 적어도 1개 이상 입력을 해야합니다");return;
		}
	}	*/
	
	var data = {};
	
	if(addList.length > 0) data.stockWrItemAdd = addList;
	else data.stockWrItemAdd = [];
	
	if(updateList.length > 0 && workingType == 'UPT') data.stockWrItemUpdate = updateList;
	else data.stockWrItemUpdate = [];
	
	if(removeList.length > 0) data.stockWrItemRemove = removeList;
	else data.stockWrItemRemove = [];

    data.workingType = workingType;
	data.wrNo = wrNo;  
    //data.bizType = bizType; 
    data.wrType = wrType; 
    //data.consignCustCode = consignCustCode; 
    data.memo1 = memo1; 
    
   // console.log(JSON.stringify(data));
   // return;
 
   	if(wrType == 'itemList')// 품목정리의 경우
   	{
		data.consignComCode = $('#consignComCode [value="'+$("#consignComText").val()+'"]').data('custcode') || '';
	}
   	
	console.log("check");
	
	console.log(data);
    
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
			console.log("check4");
			setStopSpinner();	        
	        alert(data.result_code+":"+data.result_msg);
           // console.log("d:"+ data.wrNo);
	        //post형식으로 페이지 데이터 조회
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'wrNo');
		    obj.setAttribute('value', data.wrNo);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/logis/stock-wr-up');
		    document.body.appendChild(f);
		    f.submit();		
	    },
	    error:function(request, status, error){
			console.log("check3");
			setStopSpinner();
			document.getElementById('btnReg').classList.toggle('disabled');
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};


// 추가, 수정, 삭제 된 아이템들 확인하기
function checkItems() {
	
	// 추가된 행 아이템들(배열)
	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);
	 
	// 수정된 행 아이템들(배열) : 진짜 수정된 필드만 얻음.
	var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID);
	
	// 수정된 행 아이템들(배열) : 수정된 필드와 수정안된 필드 모두를 얻음.
	//var editedRowItems = AUIGrid.getEditedRowItems(myGridID); 
	
	// 삭제된 행 아이템들(배열)
	var removedRowItems = AUIGrid.getRemovedItems(myGridID);
	
	var i, len, name, rowItem;
	var str = "";
	
	if(addedRowItems.length > 0) {
		str += "---추가된 행\r\n";
		for(i=0, len=addedRowItems.length; i<len; i++) {
			rowItem = addedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(editedRowItems.length > 0) {
		str += "---수정된 행\r\n";
		for(i=0, len=editedRowItems.length; i<len; i++) {
			rowItem = editedRowItems[i]; // 행아이템
			
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	if(removedRowItems.length > 0) {
		str += "---삭제된 행\r\n";
		for(i=0, len=removedRowItems.length; i<len; i++) {
			rowItem = removedRowItems[i]; // 행아이템
			// 전체 조회
			for(var name in rowItem) {
				str += name + " : " + rowItem[name] + ", ";	
			}
			str += "\r\n";
		}
	}
	
	
	// 하단에 정보 출력.
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length); 
	
	
	if(str == "")
		str = "변경 사항 없음";
	
	alert(str);
}




function removeRow() {
	alert("행삭제(품목삭제)한 데이터는 [수정]버튼을 클릭해야 자료에서 완전 삭제 됩니다. ")	
	AUIGrid.removeRow(myGridID, "selectedIndex");
	//fn_dcProc();
};
	

// 마스터 조회
function findMst(url) {
	$("#iDiv_noDataPop").css("display","none");		
	var wrNo = $("#wrNo").val();
	//console.log("url:"+url);
	//console.log("wrNo:"+wrNo);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"wrNo" : wrNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			if (data.stockWrList.length == 0){
				$("#iDiv_noDataPop").css("display","block");							
			}else{
						
				for(i=0;i<data.stockWrList.length;i++){
    				regUserName  = data.stockWrList[i].regUserName;
    				//bizType = data.stockWrList[i].bizType; 
    				wrType = data.stockWrList[i].wrType;
					//consignCustCode = data.stockWrList[i].consignCustCode; 
					//consignCustName = data.stockWrList[i].consignCustName; 
					memo1 = data.stockWrList[i].memo1; 
					 
				    $("#regUserName").val(regUserName); 
					//$("#bizType").val(bizType); 
					$("#wrType").val(wrType); 
					//$("#consignCustCode").val(consignCustCode);
					//$("#consignCustName").val(consignCustName); 
					$("#memo1").val(memo1); 

					//등록버튼 비활성화, 수정/삭제 활성화
					document.getElementById('btnReg').classList.toggle('disabled'); 
					document.getElementById('btnUpt').classList.toggle('disabled'); 
					document.getElementById('btnDel').classList.toggle('disabled');				
					
					document.getElementById('btnPrint').classList.toggle('disabled');
					//document.getElementById('exportXls').classList.toggle('disabled');		
					//document.getElementById('exportPdf').classList.toggle('disabled');					
					
					//document.getElementById('btnDivide').classList.toggle('disabled');		
					//document.getElementById('btnNew').classList.toggle('disabled');			//2023.07.03 create new esti 	
					
					if($("#wrType").val() == 'itemList')
					{ 
						$("#btnProc").attr('disabled',true);
						$("#consignComCodeLabel").show();
						$("#consignComCodeSelect").show();
					}
					else 
					{
						$("#btnProc").attr('disabled',false);
						$("#consignComCodeLabel").hide();
						$("#consignComCodeSelect").hide();
					}
					if(data.stockWrList[i].consignComCode != '') //마스터 조회시 위탁업체 지정되있으면 불러오고 변경 여부 체크를 위해 따로 저장
					{
						$("#consignComText").val(`${data.stockWrList[i].consignComName} (${data.stockWrList[i].consignComCode})`);
						setBarcodeProp('consignComText' ,$("#consignComText").val());
					}
				}		
				findDtl('/logis/stock-wr-item-list');				
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

//품목 조회
function findDtl(url) {
	//console.log("url:"+url);
	var list = [];
	var wrNo = $("#wrNo").val(); 
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"wrNo":wrNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			if (data.stockWrItemList.length == 0){
				$("#iDiv_noDataPop").css("display","none");			
			}else{
				 
				for(i=0;i<data.stockWrItemList.length;i++){
					//console.log(new Date(data.stockWrItemList[i].chkDate));
				    list.push({
						 idx: data.stockWrItemList[i].wrSeq
						,wrSeq:data.stockWrItemList[i].wrSeq
						,itemId: data.stockWrItemList[i].itemId 
						,itemNo: data.stockWrItemList[i].itemNo 
						,itemName: data.stockWrItemList[i].itemName
						,qty: data.stockWrItemList[i].qty 
						,unitPrice: data.stockWrItemList[i].unitPrice 
						,sumPrice: data.stockWrItemList[i].unitPrice * data.stockWrItemList[i].qty
						,storCode: data.stockWrItemList[i].storCode 						
						,storName: data.stockWrItemList[i].storName 
						,rackCode: data.stockWrItemList[i].rackCode 
						,rackName: data.stockWrItemList[i].rackName 
						,moveStorCode: data.stockWrItemList[i].moveStorCode 						
						,moveStorName: data.stockWrItemList[i].moveStorName 
						,moveRackCode: data.stockWrItemList[i].moveRackCode 
						,moveRackName: data.stockWrItemList[i].moveRackName						
						,chkUserId: data.stockWrItemList[i].chkUserId
						,chkUserName: data.stockWrItemList[i].chkUserName
						//,chkDate: data.stockWrItemList[i].chkDate
						,chkDate: data.stockWrItemList[i].chkDateString
						,memo1:  data.stockWrItemList[i].memo1
						,stockQty:	data.stockWrItemList[i].stockQty
						,printQty: 1 // 등록후 혹은 마스터 조회시 바코드 출력매수 1로 초기화
						,storConsignCustCode : data.stockWrItemList[i].storConsignCustCode
						,consignCustCode : data.stockWrItemList[i].consignCustCode
						,consignCustName : data.stockWrItemList[i].consignCustName
						
						,makerName : data.stockWrItemList[i].makerName
						,className : data.stockWrItemList[i].className
						,factoryNo : data.stockWrItemList[i].factoryNo
						
					});
					
				}		
				
				AUIGrid.setGridData("#grid_wrap", list); 
				
				//숨겨진 input인 wrSeq(처리순번)이 있는경우 해당순번에 체크박스 체크해줌
				AUIGrid.setCheckedRowsByValue("#grid_wrap","wrSeq",$("#wrSeq").val()); 
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


function click_EstiType(estiType) {
	if (estiType == 1){
		$("#supplyCustCode").val("");
		$("#supplyCustName").val("");
		$("#supplyCustAdmName").val("");
		$("#supplyCustAdmPhone").val("");
		$("#supplyInfo-title").css("display","none");
		$("#supplyInfo-input").css("display","none");
	}else{
		$("#supplyInfo-title").css("display","block");
		$("#supplyInfo-input").css("display","block");
	}	
}



function itemProc()
{
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
				itemProc_();
			}
			else 
			{
				alert('권한이 없습니다. 필요시 연구소로 문의해주세요.');
			}
		},
		error : (e)=>{
		}
		})
}

// 수동처리
function itemProc_() {
	$("#iDiv_noSrchPop").css("display","none");
	checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
	if (checkedItems.length <= 0) {
		//alert("품목을 선택하세요!");
    	$("#iDiv_noSrchPop").text("ⓘ 품목을 선택하세요.");
	    $("#iDiv_noSrchPop").css("display","block");
		return;
	}

	if (!confirm("처리하시겠습니까?")){
		return;
	}
	
	if(AUIGrid.getEditedRowItems(myGridID).length >0)
	{
		alert("수정중엔 처리할수 없습니다 수정버튼을 눌러 수정을 완료해주세요");
		return;
	}
	
	let chkText='';
	for(row of checkedItems)
	{
		if(row.item.rackName =='')
		{
			alert(`${row.rowIndex+1}번째 부품의 랙을 지정해주세요`);
			return;
		} 
		if($("#wrType").val() =='move' && row.item.moveRackName == '')
		{
			alert(`${row.rowIndex+1}번째 부품의 이동랙을 지정해주세요`);
			return;
		}
		
		if(row.item.chkUserId != '')
		{
			if(chkText == '') chkText = '처리된 부품이 존재합니다 체크 해제후 다시 처리를 실행해주세요. \n순번 : ';
			else chkText += '/'
			chkText += row.item.wrSeq;	
		}
		  
	}
	if(chkText != '')
	{
		alert(chkText);
		return;	
	} 
	
	curIndex = 0;
	wrNo =  $("#wrNo").val();
	progressBar = $("#progress-bar");
	$("#cur").html(curIndex);
	$("#last").html(checkedItems.length);
	
	 
	
	dialogProgress = $( "#dialog-form-itemProgress" ).dialog({
	    autoOpen: false,
	    height: 100,
	    //minWidth: 500,
	    width: "25%",
	    modal: true,
//	    buttons: {
//	      /* "Create an account": addUser, */
//	         "닫기": function() {
//				 
//				 const progressBar = $("#progress-bar");
//				 
//				 if(progressBar.width() < dialogProgress.width())
//	        	 $("#progress-bar").width(progressBar.width()+15);
//	        	 //dialogXls.dialog( "close" );
//	      }
//	    }, 
	    close: function() {
			progressBar.width(0);
			curIndex = -1; //다이얼로그가 닫히면 더 진행 안함 
	    }
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogProgress.dialog( "open" );
	
 
	itemProcAjax(0,'');
	
//	$("#iDiv_noSrchPop").css("display","none");
//	
//	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
//	if (checkedItems.length <= 0) {
//		//alert("품목을 선택하세요!");
//    	$("#iDiv_noSrchPop").text("ⓘ 품목을 선택하세요.");
//	    $("#iDiv_noSrchPop").css("display","block");
//		return;
//	}
//
//	if (!confirm("처리하시겠습니까?")){
//		return;
//	}
//	
//	var url = "/logis/stockWrItemAdd";
//	var workingType  = "CHK";
//	var wrNo = $("#wrNo").val();
//	var rowItem;
//	var seqArr = "";
//	var rackArr = "";
//	var moveRackArr = "";
//	var moveRackCode= "";
//	for (var i = 0, len = checkedItems.length; i < len; i++) {
//		rowItem = checkedItems[i];		
//		seqArr = seqArr + "^" +rowItem.item.wrSeq;		
//		rackArr = rackArr + "^" +rowItem.item.rackCode;
//		moveRackCode = rowItem.item.moveRackCode;
//		if (moveRackCode == null) { moveRackCode = ''; }
//		moveRackArr = moveRackArr + "^" +moveRackCode;
//	}
//	
//	//대상 체크
//	var errCnt = 0;
//	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
//		
//		if (item.chkUserId != '' && AUIGrid.isCheckedRowById(myGridID, rowIndex) == true ) {  //요청확인 && 요청확인일존재 && 체크
//			errCnt = errCnt + 1;
//			return "auigrid-err-row-style";
//		}
//		
//		return "";	
//	});		
//	AUIGrid.update(myGridID);
//
//	if (errCnt > 0) {
//		alert("이미 처리된 품목이 존재합니다!!")
//		return;
//	}
	
	 
	
	 
	
//	$.ajax({
//	    url : url,
//	    dataType : "json",
//	    type : "POST",
//	    //contentType: "application/json; charset=utf-8",
//	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
//	    //data : data,
//	    data : {
//			"workingType" : workingType,
//			"wrNo" : wrNo, 
//			"seqArr" : seqArr    //요청순번
//			,"rackArr" : rackArr    
//			,"moveRackArr" : moveRackArr
//		},
//	    success: function(data) {
//	        alert(data.result_code+":"+data.result_msg);
//			location.reload(true);
//	    },
//	    error:function(request, status, error){
//	        alert("code:"+request.status+"\n"+"error:"+error);
//	    }
//	});
	
}

function itemProcAjax(errCount,errText)
{
	 
	$.ajax({
	    url : "/logis/stockWrItemAdd",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : "CHK",
			"wrNo" : wrNo, 
			"seqArr" : checkedItems[curIndex].item.wrSeq    //요청순번
			,"rackArr" : checkedItems[curIndex].item.rackCode    
			,"moveRackArr" : checkedItems[curIndex].item.moveRackCode
		},
	    success: function(data) {
			if(curIndex < 0) 
			{
				
			 	findDtl('/logis/stock-wr-item-list');	
				//findMst('/logis/stock-wr-list');
				return; // 현재 인덱스가 0이하면 정지로 간주
			} 
	        curIndex++;
	        $("#cur").html(curIndex);
	        const resultErrCount = errCount+(data.result_code=='Err'?1:0);
	        const resultErrText = errText +(data.result_code=='Err'?`${checkedItems[curIndex-1].item.wrSeq}번째순번:${data.result_msg}\n`:'');
	        if(checkedItems.length > curIndex)
	        {
			 
				progressBar.width((curIndex *100/ checkedItems.length)+'%');
	        	itemProcAjax(resultErrCount,resultErrText);
	        }
	        else 
	        { 
				findDtl('/logis/stock-wr-item-list');	
	        	progressBar.width('100%');
	        	beep();
	        	setTimeout(()=>{  
				//	console.log(resultErrText);
					if(confirm(`처리 완료.\n${resultErrCount>0?'실패건수 : '+resultErrCount+'건\n'+resultErrText:''}새창을 여시겠습니까?`))
					{
						window.open(window.location.href); //개발로컬 url에서 변경 누락되어 있어서 수정
					}
					$( "#dialog-form-itemProgress" ).dialog('close');
				},450);
	        } 
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}


//엑셀업로드 버튼 클릭 
function excelAdd() {
	
	var dialogXls;
	dialogXls = $( "#dialogXls-form" ).dialog({
	    autoOpen: false,
	    height: 420,
	    //minWidth: 500,
	    width: "40%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser, */
	         "닫기": function() {
	        	 dialogXls.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      $( "#batchFile" ).val("");	   	
	    }
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogXls.dialog( "open" );
}

/*
function fn_fileDataCall() {
	
	console.log("start1");
	
	var isConnect = $('input:checkbox[name=connectYN]').is(':checked');
    if(isConnect == true){
		connectYN = 'Y';
	}else{
		connectYN = 'N';
	}	
	
	var dialogXls;
	dialogXls = $( "#dialogXls-form" ).dialog({
	    autoOpen: false,
	    height: 420,
	    //minWidth: 500,
	    width: "40%",
	    modal: true,
	    buttons: {
	       //"Create an account": addUser, 
	         "닫기": function() {
	        	 dialogXls.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      $( "#batchFile" ).val("");	   	
	    }
	  });
	
	 var batchFile = $("#batchFile").val();
	
	 var upload_result_message = "";
	 
	 if (batchFile == "" || batchFile == null) {
	     alert("올리기할 파일을 선택하세요.");
	     return false;
	 } else if (!check_file_type(batchFile)) {
	     alert("엑셀(.xlxs)  파일만 불러올 수 있습니다.");
	     return false;
	 }
	
	 if (confirm("올리기 하시겠습니까?")) {
		var list = [];
		//로딩바 시작
		 setStartSpinner();
		 
		 
						
	     var options = {
	    	success : function(data) {
	    		//로딩바 종료
	    		setStopSpinner();
				
				console.log("성공"+ data.stockWrItemList[0]);
				console.log("성공"+ data.stockWrItemList[1]);

				var item;
				var rowList = [];
				var rowCnt = Math.floor(Math.random() * 10); // 랜덤 개수
				rowCnt = Math.max(2, rowCnt);
				
				// 추가시킬 행 10개 작성
				for(i=0;i<data.stockWrItemList.length;i++){
					itemNo = data.stockWrItemList[i].itemNo; 
					qty = data.stockWrItemList[i].qty; 
					memo1 = data.stockWrItemList[i].memo1;
					rackCode = data.stockWrItemList[i].rackCode;
					moveRackCode = data.stockWrItemList[i].moveRackCode;
					itemId = data.stockWrItemList[i].itemId; 
					itemName = data.stockWrItemList[i].itemName;
					storCode = data.stockWrItemList[i].storCode;
				    storName = data.stockWrItemList[i].storName;
					rackName = data.stockWrItemList[i].rackName;
					moveStorCode = data.stockWrItemList[i].moveStorCode;
				    moveStorName = data.stockWrItemList[i].moveStorName;
					moveRackName = data.stockWrItemList[i].moveRackName;
					stockQty = data.stockWrItemList[i].stockQty;
					
					var item = new Object();
				   
					item.itemId = itemId, 
					item.itemNo = itemNo, 
					item.qty = qty, 
					item.memo1 = memo1 ,
					item.rackCode = rackCode,
					item.moveRackCode = moveRackCode,					
					item.itemId = itemId, 
					item.itemName = itemName,
					item.storCode = storCode,
				    item.storName = storName,
					item.rackName = rackName,
					item.moveStorCode = moveStorCode,
				    item.moveStorName = moveStorName,
					item.moveRackName = moveRackName,
					item.stockQty = stockQty					
					
					if (connectYN == 'Y') {						
						AUIGrid.addRow(myGridID, item, 'last'); 
					}else{ //이어올리기 아닌 경우 그리드 reset 한 다음에 처리						
						if (i==0) {
							AUIGrid.clearGridData(myGridID);  //
						}					
						AUIGrid.addRow(myGridID, item, 'last');			
					}
															    
					rowList[i] = {
						itemNo : itemNo, 
						qty : qty, 
						memo1 : memo1 ,
						rackCode : rackCode,
						moveRackCode : moveRackCode,						
						itemId : itemId, 
						itemName : itemName,
						storCode : storCode,					    
					    storName : storName
					    ,rackName : rackName
					    ,moveStorCode : moveStorCode
					    ,moveStorName : moveStorName
					    ,moveRackName : moveRackName
					    ,stockQty : stockQty
					}
				}

          		alert("[알림]\n엑셀업로드를 진행합니다.\n내용을 확인하시고 [등록]을 하세요.");	           

          		dialogXls.dialog( "close" );
	        },
			error:function(request, status, error){
				setStopSpinner();
				alert("code:"+request.status+"\n"+"error:"+error);
			},
	        type : "POST"
	       // ,async: false
	     };
	     $("#addExcelForm").ajaxSubmit(options);
	 }
}
*/

/*
function fn_fileDataCall() {
    console.log("start1");

    var isConnect = $('input:checkbox[name=connectYN]').is(':checked');
    var connectYN = isConnect ? 'Y' : 'N';

    var batchFileInput = $("#batchFile")[0].files[0];

    if (!batchFileInput) {
        alert("올리기할 파일을 선택하세요.");
        return false;
    }

    if (!check_file_type(batchFileInput.name)) {
        alert("엑셀(.xlsx) 파일만 불러올 수 있습니다.");
        return false;
    }

    if (confirm("올리기 하시겠습니까?")) {
        var formData = new FormData();
        formData.append("batchFile", batchFileInput);
        formData.append("connectYN", connectYN);
		
		var formValues = $("#dialogXls-form").serializeArray();
        $.each(formValues, function (i, field) {
            formData.append(field.name, field.value);
        });

        setStartSpinner(); // 로딩바 시작
		

        $.ajax({
            url: "/logis//stock-wr-up-xls",
            type: "POST",
            data: formData,
            processData: false,  // 필수: FormData를 처리하지 않도록 설정
            contentType: false,  // 필수: `multipart/form-data`로 전송
            success: function (data) {
                setStopSpinner(); // 로딩바 종료

                console.log("성공", data);
				
				var item;
				var rowList = [];
				var rowCnt = Math.floor(Math.random() * 10); // 랜덤 개수
				rowCnt = Math.max(2, rowCnt);
				
				// 추가시킬 행 10개 작성
				for(i=0;i<data.stockWrItemList.length;i++){
					itemNo = data.stockWrItemList[i].itemNo; 
					qty = data.stockWrItemList[i].qty; 
					memo1 = data.stockWrItemList[i].memo1;
					rackCode = data.stockWrItemList[i].rackCode;
					moveRackCode = data.stockWrItemList[i].moveRackCode;
					itemId = data.stockWrItemList[i].itemId; 
					itemName = data.stockWrItemList[i].itemName;
					storCode = data.stockWrItemList[i].storCode;
				    storName = data.stockWrItemList[i].storName;
					rackName = data.stockWrItemList[i].rackName;
					moveStorCode = data.stockWrItemList[i].moveStorCode;
				    moveStorName = data.stockWrItemList[i].moveStorName;
					moveRackName = data.stockWrItemList[i].moveRackName;
					stockQty = data.stockWrItemList[i].stockQty;
					
					var item = new Object();
				   
					item.itemId = itemId, 
					item.itemNo = itemNo, 
					item.qty = qty, 
					item.memo1 = memo1 ,
					item.rackCode = rackCode,
					item.moveRackCode = moveRackCode,					
					item.itemId = itemId, 
					item.itemName = itemName,
					item.storCode = storCode,
				    item.storName = storName,
					item.rackName = rackName,
					item.moveStorCode = moveStorCode,
				    item.moveStorName = moveStorName,
					item.moveRackName = moveRackName,
					item.stockQty = stockQty					
					
					if (connectYN == 'Y') {						
						AUIGrid.addRow(myGridID, item, 'last'); 
					}else{ //이어올리기 아닌 경우 그리드 reset 한 다음에 처리						
						if (i==0) {
							AUIGrid.clearGridData(myGridID);  //
						}					
						AUIGrid.addRow(myGridID, item, 'last');			
					}
															    
					rowList[i] = {
						itemNo : itemNo, 
						qty : qty, 
						memo1 : memo1 ,
						rackCode : rackCode,
						moveRackCode : moveRackCode,						
						itemId : itemId, 
						itemName : itemName,
						storCode : storCode,					    
					    storName : storName
					    ,rackName : rackName
					    ,moveStorCode : moveStorCode
					    ,moveStorName : moveStorName
					    ,moveRackName : moveRackName
					    ,stockQty : stockQty
					}
					
				}
								
								
                alert("[알림]\n엑셀 업로드를 진행합니다.\n내용을 확인하시고 [등록]을 하세요.");

                dialogXls.dialog("close");
            },
            error: function (request, status, error) {
                setStopSpinner();
                alert("업로드 실패\ncode: " + request.status + "\nerror: " + error);
            }
        });
    }
}
*/

function fn_fileDataCall() {
    console.log("start1");

    var isConnect = $('input:checkbox[name=connectYN]').is(':checked');
    var connectYN = isConnect ? 'Y' : 'N';

    var batchFileInput = $("#batchFile")[0].files[0];

    if (!batchFileInput) {
        alert("올리기할 파일을 선택하세요.");
        return false;
    }

    if (!check_file_type(batchFileInput.name)) {
        alert("엑셀(.xlsx) 파일만 불러올 수 있습니다.");
        return false;
    }

    if (confirm("올리기 하시겠습니까?")) {
        var formData = new FormData();
        formData.append("batchFile", batchFileInput);
        formData.append("connectYN", connectYN);

        // ✅ StockWrExcel 객체에 해당하는 데이터 추가
        $("#dialogXls-form").find("input, select, textarea").each(function () {
            var name = $(this).attr("name");
            var value = $(this).val();
            if (name) {
                formData.append(name, value);
            }
        });

        setStartSpinner(); // 로딩바 시작

        $.ajax({
            url: "/logis/stock-wr-up-xls",
            type: "POST",
            data: formData,
            processData: false,  // 필수: FormData를 처리하지 않도록 설정
            contentType: false,  // 필수: `multipart/form-data`로 전송
            /*success: function (data) {
                setStopSpinner(); // 로딩바 종료
                console.log("성공", data);

                var rowList = [];

                for (i = 0; i < data.stockWrItemList.length; i++) {
                    var stockItem = data.stockWrItemList[i];

                    var item = {
                        itemId: stockItem.itemId,
                        itemNo: stockItem.itemNo,
                        qty: stockItem.qty,
                        memo1: stockItem.memo1,
                        rackCode: stockItem.rackCode,
                        moveRackCode: stockItem.moveRackCode,
                        itemName: stockItem.itemName,
                        storCode: stockItem.storCode,
                        storName: stockItem.storName,
                        rackName: stockItem.rackName,
                        moveStorCode: stockItem.moveStorCode,
                        moveStorName: stockItem.moveStorName,
                        moveRackName: stockItem.moveRackName,
                        stockQty: stockItem.stockQty
                    };
					

                    if (connectYN == 'Y') {
                        AUIGrid.addRow(myGridID, item, 'last');
                    } else {
                        if (i == 0) {
                            AUIGrid.clearGridData(myGridID);
                        }
                        AUIGrid.addRow(myGridID, item, 'last');
                    }

                    rowList.push(item);
                }

                alert("[알림]\n엑셀 업로드를 진행합니다.\n내용을 확인하시고 [등록]을 하세요.");
                dialogXls.dialog("close");
            },*/
			success: function (data) {
			    setStopSpinner(); // 로딩바 종료
			    console.log("성공", data);

			    var rowList = [];

			    for (var i = 0; i < data.stockWrItemList.length; i++) {
			        var stockItem = data.stockWrItemList[i];

			        var item = {
			            itemId: stockItem.itemId,
			            itemNo: stockItem.itemNo,
			            qty: stockItem.qty,
			            memo1: stockItem.memo1,
			            rackCode: stockItem.rackCode,
			            moveRackCode: stockItem.moveRackCode,
			            itemName: stockItem.itemName,
			            storCode: stockItem.storCode,
			            storName: stockItem.storName,
			            rackName: stockItem.rackName,
			            moveStorCode: stockItem.moveStorCode,
			            moveStorName: stockItem.moveStorName,
			            moveRackName: stockItem.moveRackName,
			            stockQty: stockItem.stockQty
			        };

			        rowList.push(item);
			    }

			    if (connectYN === 'Y') {
			        //AUIGrid.setGridData(myGridID, rowList); // ✅ 한 번에 데이터를 추가
					rowList.forEach(row => {
					    AUIGrid.addRow(myGridID, row, "last"); // 한 행씩 추가
					});
			    } else {
			        AUIGrid.clearGridData(myGridID);
			        //AUIGrid.setGridData(myGridID, rowList); // ✅ 기존 데이터 삭제 후 추가
					rowList.forEach(row => {
					    AUIGrid.addRow(myGridID, row, "last"); // 한 행씩 추가
					});
					
			    }
				
				//  강제로 추가된 행으로 상태 변경
				/*var gridData = AUIGrid.getGridData(myGridID);
				console.log("gridData.length : " + gridData.length);
			    for (var i = 0; i < gridData.length; i++) {
			        AUIGrid.setRowState(myGridID, i, "added");
			    }*/
				

			    alert("[알림]\n엑셀 업로드를 진행합니다.\n내용을 확인하시고 [등록]을 하세요.");
				var dialogXls;
				dialogXls = $( "#dialogXls-form" ).dialog();
			    dialogXls.dialog("close");
			},
            error: function (request, status, error) {
                setStopSpinner();
                alert("업로드 실패\ncode: " + request.status + "\nerror: " + error);
            }
        });
    }
}


////////////

//엑셀/텍스트형식인지 여부 판단
function check_file_type(batchFile) {
	 var fileFormat = batchFile.split(".");
	 if (fileFormat.indexOf("xlsx") > -1 ) {
	     return true;  //엑셀/텍스트 확장자인 경우
	 } else {
	     return false;  //엑셀/텍스트 확장자 아닌경우
	 }
}

//인쇄 
//href="order/esti-up-print"
$("#print").click(function() {
	var estiNo = $("#estiNo").val();
	var printMemoYN = "";
	
	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}
	
	var printDcYN = ""; //인쇄 시 할인율 
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	var printNoYN = "";
	var isPrintNoYN = $('input:checkbox[name=printNoYN]').is(':checked');
	
    if(isPrintNoYN == true){
		printNoYN = 'Y';
	}else{
		printNoYN = 'N';
	}	

	var url = "/order/esti-up-print?estiNo=" + estiNo + "&memoYN=" + printMemoYN + "&printDcYN=" + printDcYN + "&printNoYN=" + printNoYN;
	window.open(url, "_blank");
	
});

$("#btnDownload").click(function() {
	var estiNo = $("#estiNo").val();
	var printMemoYN = "";
	var imgYN = "Y";

	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}

	var printDcYN = "";
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	var isPrintNoYN = $('input:checkbox[name=printNoYN]').is(':checked');
	 if(isPrintNoYN == true){
		printNoYN = 'Y';
	}else{
		printNoYN = 'N';
	}	

	var url = "/order/esti-up-print?estiNo=" + estiNo + "&memoYN=" + printMemoYN + "&printDcYN=" + printDcYN 
	+ "&printNoYN=" + printNoYN+"&imgYN="+imgYN;
	window.open(url, "_blank");
	
});


//엑셀업로드 버튼 클릭  안쓰는듯한 함수 윈도우 함수랑 이름 겹쳐서 개명
function print_() {
	
	var dialogPrint;
	dialogPrint = $( "#dialogPrint-form" ).dialog({
	    autoOpen: false,
	    height: 350,
	    //minWidth: 500,
	    width: "30%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser, */
	         "닫기": function() {
	        	 dialogPrint.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      //$( "#batchFile" ).val("");	   	
	    }
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogPrint.dialog( "open" );
}


//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
	if(selectedItems.length == 0) return; //20240726 supi 품번 레이어팝업창에서 하단 확인을 누를때 선택한 부품이 없는경우 에러나와서 이경우 리턴
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
		
		,makerName : rowItem.makerName
		,className : rowItem.className
		,factoryNo : rowItem.factoryNo
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");	
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}
		
		
		
//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj,name, gridYN) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	
	if (gridYN == 'Y') {	
		item = {
						placeCustCode: rowItem.custCode,
						placeCustName: rowItem.custName,
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

//dup check 2023.07.10 hsg
function itemChk() {
	var allItems = AUIGrid.getGridData(myGridID);
		var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
		let rowArr = [];
		
		for (var i = 0, len = allItems.length; i < len; i++) {
			rowItem = allItems[i];
			rowId = rowItem[rowIdField];
			itemNo = AUIGrid.getCellValue(myGridID, i, "itemNo");
			if (itemNo !='' && itemNo !== undefined){
				rowArr.push(itemNo);
			}			
		}
		let rowArr2 = new Set(rowArr);
		let dupYn = false;
		var dupData = "";
		if(rowArr.length !== rowArr2.size){

			for(let i = 0; i < rowArr.length; i++) {
				  const currElem = rowArr[i];
				  
				  for(let j = i+1; j < rowArr.length; j++) {
				    if(currElem === rowArr[j]) {
				      dupYn = true;
				      //break;
				      dupData = dupData + currElem + "^";
				    }
				  }
				  
			}			
 		    if(dupYn)  {
			    errRowStyleFunction(dupData);
			}			
		}else{
			 defaultRowStyleFunction();
			alert('중복건은 없습니다.')
		}
				
}

//dup err 2023.07.10 hsg
function errRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {
		var idxSplit = idxArr.split("^");  
		for ( var h in idxSplit ) {
			if (item.itemNo == idxSplit[h]) {
				return "auigrid-err-row-style";
			}
		}

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};

//return defult Style 2023.07.10 hsg
function defaultRowStyleFunction(idxArr) {
	// row Styling 함수를 다른 함수로 변경
	AUIGrid.setProp(myGridID, "rowStyleFunction", function (rowIndex, item) {

		return "";
	});

	// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
	AUIGrid.update(myGridID);
};


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowRack(obj,name, gridYN) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDRack);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	
	if (gridYN == 'Y') {	
		if (obj == 'rackCode') {	
			item = {
						storCode: rowItem.storCode,
						storName: rowItem.storName,
						rackCode: rowItem.rackCode,
						rackName: rowItem.rackName
						,stockQty: rowItem.stockQty
					};
		}else if (obj == 'moveRackCode') {
			item = {
						moveStorCode: rowItem.storCode,
						moveStorName: rowItem.storName,
						moveRackCode: rowItem.rackCode,
						moveRackName: rowItem.rackName
					};
		} 	  
		AUIGrid.updateRow(myGridID, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.rackCode);
			$("#"+name+"").val(rowItem.rackName);
	}
	
	var dialogRack;
	dialogRack = $( "#dialog-form-rack");	
	dialogRack.dialog("close");	
	
}

function rackSelect(type) 
{
	if(AUIGrid.getCheckedRowItems(myGridID).length ==0)
	{
		alert(`${type=='rack'?'랙':'이동랙'}을 선택할 부품을 체크해주세요.`);
		return;
	}
	
	$("#pop_storCode").val('');
	$("#pop_rackCode").val();
	$("#pop_rackName").val();
	$("#pop_itemId").val();
	$("#grid-rackCode1").val("rackCode");
	$("#grid-rackName1").val("rackName");
					    
			 
						 
	if($("#wrType").val() ==='whna' || $("#wrType").val() ==='whri' ){
		$("#pop_itemId").val("");
	}
	
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
			
		}
		,open :()=>{
			$("#pop_rackSrch").val('');
			$("#pop_itemId").val('');
		}
	});	
	AUIGrid.clearGridData(myGridIDRack);
	commonCreateGridRack(columnLayoutRack,'', '', '', '', 0,'Y');
	dialogRack.dialog("open");	
	
 
	
	AUIGrid.bind(myGridIDRack, "cellDoubleClick",()=>{
		rackApply(type); 
	});
	
	AUIGrid.hideColumnByDataField(myGridIDRack,	'stockQty'); //재고수량 컬럼 숨김처리
	$("#pop_itemId").hide();
}

function rackApply(type)
{
	const selectedRack = AUIGrid.getSelectedItems(myGridIDRack);
	const checkedRowItems = AUIGrid.getCheckedRowItems(myGridID);
	
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
	
	const rackInfo =type == "rack"?
					{rackCode:selectedRack[0].item.rackCode , 
					 rackName:selectedRack[0].item.rackName , 
					 storCode:selectedRack[0].item.storCode , 
					 storName:selectedRack[0].item.storName 
					 }
					 :
					 {moveRackCode:selectedRack[0].item.rackCode , 
					  moveRackName:selectedRack[0].item.rackName , 
					  moveStorCode:selectedRack[0].item.storCode , 
					  moveStorName:selectedRack[0].item.storName 
					  };
	 
	
	for(row of checkedRowItems)
	{
		AUIGrid.updateRow(myGridID, rackInfo, row.rowIndex);		
	} 
	$("#dialog-form-rack").dialog("close");
}

 
 
function beep() { 
	const snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
	//console.log('beep');
	snd.play();  
}  


//url쿼리로 selectRack에 랙코드가 들어오는경우 이 함수가 호출되어 수동입출고에 해당랙의 재고가 로드되어짐
function findRackItem(selectRack)
{	 
	$.ajax(	{
		type : "POST",
		url : '/logis/stock-rack-list',
		dataType : "json",
		data: { 
			"ymdIgnoreYN":'Y',
			"rackCode":selectRack
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.stockRackList.length == 0){
				
			}else{
				for(i= 0 ; i < data.stockRackList.length ; i++)
				{
					const item = data.stockRackList[i];
					if(i>0) addRow(myGridID,'last');
					AUIGrid.updateRow(myGridID, {itemId:item.itemId , 
												 itemNo:item.itemNo ,
												 itemName:item.itemName ,
												 qty:item.stockQty , 
												 storName:item.storName,
												 storCode:item.storCode,
												 rackCode:item.rackCode,
												 rackName:item.rackName,
												 stockQty:item.stockQty}, i);
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
 
function barcodeDeepLoad(itemJson)
{
 	barcodeLoadFlag = true;
 	const gridSeletedIdx = AUIGrid.getSelectedIndex(myGridID); // 현재 선택된 셀 인덱스정보
 	
 	if(itemJson.t == 'i') //바코드가 수동입출고에서 나온경우
	{
		const wrNo = itemJson.i.replace('wr','').split('_'); 
		data = 	{barCodeType:'I' ,wrRegComCode:decodeURI(itemJson.c) ,wrNo:wrNo[0] , wrSeq:wrNo[1]};
	} 
	else if(itemJson.t == 'si') //바코드가 랙별재고에서
	{
		data = {barCodeType:'SI'  , rackCode:itemJson.rc , itemId:itemJson.i }; 	
	}
	if(data.barCodeType)
	{
		simplePostAjax('/logis/barcodeItem',
						data,
						(result)=>{  
							if(result.item && result.item?.comCode == lcd)
								AUIGrid.updateRow(myGridID,
											 barcodeDataScan($("#barcodeDeepLoadYN").is(':checked') , result.item),
										      gridSeletedIdx[0]);
						})
	}
	else //이외의 바코드는 아무효과 없음
	{
		
	}
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



//datalist를 이용업체로 셋팅(위탁사 조사용도) , 
// $('#consignComCode [value="'+$("#consignComText").val()+'"]').data('custcode')  로 선택된 comcode 가져올수있음
function setDatalistCust(url) {
	var list = [];

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
			data.c_custList.forEach((row)=>{
				consignNameList.push(row.custName);
				consignCodeList.push(row.custCode); 
			}) 
			if (data.c_custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				const selectBox = $("#consignComCode");
				selectBox.append(`<option value=''></option>`) 
				
	//			selectBox.append(`<option value='P (ㄱ000)' data-custCode='ㄱ000'></option>`);
				for (i = 0; i < data.c_custList.length; i++) {
	 				//if(data.c_custList[i].custCode != 'ㄱ121' && data.c_custList[i].custCode != 'zzz')
	 				if(  data.c_custList[i].custCode != 'zzz')
					 selectBox.append(`<option value='${data.c_custList[i].custName} (${data.c_custList[i].custCode.replace(' ','')})' data-custCode=${data.c_custList[i].custCode}></option>`);
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

//창고 정보로 소유업체 설정하는 기능
function storageSynchro()
{
	
//	/base/storage-list

	$.ajax(	{
		type : "POST",
		url : '/base/storage-list',
		dataType : "json",
		data: {			 		
			"validYN":'Y'	
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){
			const strageComCodeList = result.storageList.map((r)=>{
																		return {consignCustCode : r.consignCustCode , consignCustName : r.consignCustName , storageCode : r.storageCode , storageName : r.storageName}
																}) 
			
			const auiData = AUIGrid.getGridData(myGridID).map((r)=>{
																		if(r.storCode  == null && r.storName ==null) return {...r};
																		const storInfo = strageComCodeList.find(stor=>stor.storageCode == r.storCode && stor.storageName == r.storName);
																		
																		if(storInfo)
																		{
																			AUIGrid.updateRowsById(myGridID , {...r , ...storInfo})
																			 
																		} 
																		 
																})
																
			//AUIGrid.setGridData(myGridID , auiData);
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

function itemFinderGridCreate()
{
	const itemFindercolumnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false, visible : false }
		,{ dataField : "consignCustCode", headerText : "수탁업체", width: 120, editable : true  }
		,{ dataField : "itemId", headerText : "부품ID", width: 300, editable : true  }
	];
	

	// 그리드 속성 설정
	const itemFindergridPros = {
		editable : true,			
		// singleRow 선택모드
		selectionMode: "multipleCells",
		rowIdField: "idx",
		showRowCheckColumn: true, //체크박스 표시 설정
 
	};
 
	AUIGrid.create("#grid_wrap_itemFinder", itemFindercolumnLayout, itemFindergridPros);
 	
}

function readExcel() {
	
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        const gridData = [];
        workBook.SheetNames.forEach(function (sheetName) {
            //console.log('SheetName: ' + sheetName);
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]).filter(r=> r.consignCustCode != null)
            
            rows.forEach(r=>{
								gridData.push({idx : r.consignCustCode+r.itemId ,consignCustCode : r.consignCustCode , itemId : r.itemId});
								
			}) 
           
        })
        AUIGrid.setGridData("#grid_wrap_itemFinder" , gridData); 
        
    };
    reader.readAsBinaryString(input.files[0]);
}


function itemFinderPopupOpen()
{
	
	if(!AUIGrid.isCreated('#grid_wrap_itemFinder'))
	{
		itemFinderGridCreate();
	}
	AUIGrid.resize("#grid_wrap_itemFinder");
	AUIGrid.clearGridData('#grid_wrap_itemFinder')
	$('#excelFile').val('')
 	const dialogItemfinder = $( "#dialog-form-itemfinder" ).dialog({
		height: 650,
		width: 600,
		modal: true,
		headerHeight: 40,
	//	position:[400,400],
		buttons: {
			"확인": function(event) {
				AUIGrid.clearGridData(myGridID)
				AUIGrid.getCheckedRowItems('#grid_wrap_itemFinder').forEach(r=>{
					stockRackItemFind(r.item , (result)=>{
						 
						AUIGrid.addRow(myGridID, result, "last");
					})
				})
				dialogItemfinder.dialog('close');
			},
			"취소": function (event) {
				dialogItemfinder.dialog('close');
			}
		} 
	});	
//	AUIGrid.clearGridData(myGridIDRack);
//	commonCreateGridRack(columnLayoutRack,'', '', '', '', 0,'Y');
	dialogItemfinder.dialog("open");	
 	
//	stockRackItemFind({consignCustCode : 'ㄱ000' , itemId : 122314})
}

function stockRackItemFind(findItemInfo , fun= ()=>{})
{
	console.log(findItemInfo);
	
	$.ajax(	{
		type : "POST",
		url : '/logis/stockRackItemFind',
		dataType : "json",
		data: findItemInfo,
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){ 
			fun(result);
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