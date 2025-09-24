
//회수접수내역 페이지의 js
//사용자는 접수자 (그린파츠)


let dialogCtReq;
 /* Begin : Date Picker Date Range*/ 
 
const picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        date: new Date(),
    	input: '#startpicker-input',
        container: '#startpicker-container'
    },
    endpicker: {
        date: new Date(),
        input: '#endpicker-input',
        container: '#endpicker-container'
    }
});
$(document).ready(function(){
	
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(ctReqColumnLayout);	
	
	$("#btnFind").click(function(){   // 회수접수내역 조회버튼 
		searchCtData();
	});
	$("#dialogBtnReg").click(()=>{  // 회수접수 상세내역의 저장버튼
		 ctInfoSave(()=>{
			dialogCtReq.dialog("close"); 
			searchCtData();
			alert("저장되었습니다");
		})
	});
	$("#dialogProcStep").click(function(){   // 접수 , 완료  버튼, 상태에 따라 효과가 달라지만 로직자체는 한가지이며 실제 처리는 프로시저(up_ctProcess)가 담당
		ctInfoSave(()=>{
			const reqNo = $("#dialogCtReqNo").text(); 
			ctProcess(reqNo);
		})
	});
	$("#dialogRejectReg").click(function(){   //  거부 버튼
		const reqNo = $("#dialogCtReqNo").text(); 
		
		const gridData = AUIGrid.getCheckedRowItems("#grid_wrap2");
		
		const procRow  = gridData.find((row)=>{ if(row.item.procStep != '') return true});
	 
		if(procRow)
		{
			alert(`이미 처리된 부품이 있습니다 , ${procRow.item.reqSeq}번째순번 체크 해제후 거부처리해주세요`);
			return;
		}
		
 		let seqArr = '';
		if(gridData.length ==0) //체크된 부품을 체크 한 상태에서 아이템리스트가 0개
		{
			alert("체크된 부품이 없습니다");
			return;
		}
		
		for(let i=0 ; i < gridData.length ; i++)
		{
			if(i!=0  ) // 시작이 아니면 구분자 넣어줌
			{
				seqArr += '^'; 
			}
			if(gridData[i].item.rejectMemo == null || gridData[i].item.rejectMemo == '') 
			{
				alert(`거절사유를 입력해주세요 : ${gridData[i].rowIndex+1}번째`);
				return;
			}
			seqArr += gridData[i].item.reqSeq; 
		}  
		
		ctInfoSave(()=>{ 
 			ctReqDel(reqNo ,seqArr); 
 		});
	});
	 
	
	 $("#dialogBtnClose").click(()=>{ dialogCtReq.dialog("close");});  // 회수접수 상세내역의 닫기 버튼
	 $("#dialogBtnCancel").click(()=>{    // 회수접수 상세내역의 요청취소 버튼 접수측에서 해당 요청번호에 붙은 디테일을 제거(디테일이 0개가 되면 마스터도 삭제)됨
		const checkedRowitems = (AUIGrid.getCheckedRowItems("#grid_wrap2"));
		let ctReqSeqArr = "";
		if(checkedRowitems.length == 0){alert("회수요청할 부품을 체크해주세요"); return; } 
		for(let i = 0 ; i < checkedRowitems.length ; i ++)
		{
			if(i>0) ctReqSeqArr+= '^';
			ctReqSeqArr+=checkedRowitems[i].item.reqSeq;
		}  
	 	ctReqDel(checkedRowitems[0].item.ctReqNo , ctReqSeqArr ); 
		});
	 
	$("#buttonPrint").click(()=>{ //인쇄버튼 이벤트
		pagePrintEvent();
	});
	
	$("#barcodeLabelPrint").click(()=>{ //인쇄버튼 이벤트
		barcodePrintItem();
	});
	
	//바코드로 url 쿼리 읽어들어오면 해당부분으로 연결해주는 코드
	const params = new URL(document.location).searchParams;
	for(key of params.keys())
	{
		const tag = $(`#${key}`);
		
		
		if(tag.prop('tagName') != 'INPUT') continue;
		
		
	 	switch (tag.prop('type'))
	 	{
			case 'checkbox':
			tag.prop('checked',params.get(key)=='y' || params.get(key)=='Y' );
			break;
			case 'text':
			tag.val(params.get(key));
			break;
			default:
		}
		 
	} 
	searchCtData();
	
	//url쿼리에 popup=open이 있을때 페이지 오픈과 함께 창열어줌
	if( params.get('popup')=='open' && params.get('ctReqNo') != '')
	{
		barcodeOpenPopup(params.get('ctReqNo'));
	}
	
	$("#procState").select2();
});
//let storQtyList = {};   //창고선택 리스트
let rackQtyList = {};
// 칼럼 레이아웃 작성
const ctReqColumnLayout = [   // 회수접수내역의 레이아웃
	 { dataField : "regYmd",    headerText : "요청일자", dataType :"date", formatString : "yyyy-mm-dd", width : 80} 
	, { dataField : "regHmsg",    headerText : "요청시간", width : 80} 
	,{ dataField : "ctReqNo",   headerText : "요청번호", width: 120, // 요청번호 밑줄 스타일
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}} 
	,{ dataField : "reqCustCode",   headerText : "요청업체코드" , width : 100 } 
	,{ dataField : "custName",   headerText : "요청업체명" , width : 100 } 
	,{ dataField : "procStep",   headerText : "접수단계" , width : 100 ,
	styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value =="일부처리") {	return "aui-grid-style-ct";	}	return null;	} } 
	,{ dataField : "reqMaxSeq",      headerText : "아이템수"  , width : 60  }	
	,{ dataField : "rejectCount",      headerText : "불가품목수"  , width : 100  }	
	,{ dataField : "reqMgr",      headerText : "요청 담당자" , width : 120}
	,{ dataField : "deliWay",      headerText : "수령방법", width : 100}
	,{ dataField : "deliPayType",      headerText : "비용", width : 140 , labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField, cItem) {
	   if(value == '선불')
	   		return '선불 (월정산 포함)';
	   else if(value == '착불')
	     	return '착불 (수취자 부담)';
	   else if(value == '직접배차')
	     	return '직접배차 (주문자 부담)';
	   else
		   return value;
	}}
	,{ dataField : "rcvLogisCode",      headerText : "방문처", width : 100}
	,{ dataField : "reqMemo1",      headerText : "요청메모" , width : 260}
	,{ dataField : "procUserId",      headerText : "접수담당자" , width : 120}
	,{ dataField : "procDate",      headerText : "처리일자" , width : 120 }
	,{ dataField : "inMemo1",      headerText : "기타메모", width : 260}
	,{ dataField : "regUserId",      headerText : "등록자", width : 100}	
	,{ dataField : "uptUserId",      headerText : "수정자", width : 100}		
	,{ dataField : "uptTime",      headerText : "수정일자", width : 100}		
]; 

const ctReqItemColumnLayout = [  // 회수접수 상세내역의 레이아웃
	{ dataField : "ctReqNo",   headerText : "요청번호", width: 90 ,editable: false} 
	,{ dataField : "reqSeq",   headerText : "순번" , width : 40  ,editable: false} 
	,{ dataField : "procStep",   headerText : "처리상태" , width : 60 ,editable: false} 
	,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
	,{ dataField : "itemId",      headerText : "부품ID"  , width : 80 ,editable: false  }	
	,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  }
	,{ dataField : "itemNo",      headerText : "품번"  , width : 120 ,editable: false }	
	, { dataField: "factoryNo", headerText: "공장품번", width: 120 }
	,{ dataField : "itemName",      headerText : "부품명"  , width : 140  ,editable: false}	
	,{ dataField : "custName",      headerText : "납품거래처명"  , width : 120  ,editable: false }	
	,{ dataField : "qty",      headerText : "수량"  , width : 40 ,editable: false }	 
	//창고선택 레이아웃
//	,{ dataField : "storQty",      headerText : "창고선택(코드) [수량]"  , width : 260 , renderer: { //storQtyList[순번]으로 창고명(창고코드) [수량] 텍스트 접근해서 가져옴
//			type: "DropDownListRenderer",
//			listFunction: function (rowIndex, columnIndex, item) { 
//				return storQtyList[item.reqSeq];
//			}
//		}
//	} 
	,{  // 랙선택으로 진행할경우
		 
	 	dataField : "undefined",
		headerText: "랙 선택", 
		width: 100,

		renderer: {
			labelText : "선택 하기",
			type: "ButtonRenderer",
			onClick: function (event) { // 회수접수 상세내역의 렉선택 버튼에 대한 이벤트
		 		
		 		if(event.item.procStep != null && (event.item.procStep == '완료' || event.item.procStep == '불가' || event.item.procStep == '취소'))
				{
					alert(event.item.procStep+"된 요청은 랙을 변경할수 없습니다");
					return;
				}
		 		//창고사용요청과 연결된 회수요청의 랙선택 케이스
				const storUseFlag = (event.item.storReqNo != null && event.item.storReqNo != '');
				if(storUseFlag) 
				{
					
					
					const dialogRackSelect = $("#dialog-rackSelect").dialog({ 
					title : "랙 선택 (부품번호:"+event.item.itemNo+" / 부품명:"+event.item.itemName+" / 요청수량:"+event.item.qty+")", // 랙선택 팝업의 타이틀에 편의성을 위해 현재 랙선택 하려는 부품에 대한 정보와 요청수량을 적어줌
					minHeight: 200,
					width: 700,
					modal: true,
					headerHeight: 40,
					position: { my: "center", at: "center", of: window },
					 
					buttons: { 
						"취소": (e)=> {  
							dialogRackSelect.dialog("close");
					}
					},
					open:function (type, data) { 
						
					// Dialog의 Title Bar 제거
					   const auiGridProcps = { 
							autoGridHeight:true,
							 
							enableClipboard:false // 랙 선택 및 수량이다 보니 복붙 사용이유 없어서 막아둠
					   }
					   let auiList = rackQtyList[event.item.itemId];   // 회수 상세내역에 있는 부품들의 랙 ,창고 ,수량 정보가 든 객체에 [순번]키를 넣어서 현재 부품에 대한 랙,창고,수량 정보를 가져옴
					   let selectStorCode = 0; 
					   let auiList2 = [];
					   let selectQty =  selectRackQtyTextParse(event.item.selectRack);// 선택된렉 텍스트 파싱
					   
					   AUIGrid.destroy("#grid_wrap-rackSelect");
					   AUIGrid.create("#grid_wrap-rackSelect", rackSelectColumnLayout2, auiGridProcps); 
					   $(this).dialog().parents(".ui-dialog").find(".ui-dialog-titlebar-close").remove();
				 	   
					   
					    if(auiList == null) // 위탁창고 객체에 없을경우 = 회수할 물품수량이 0인경우
				 	   {
					      AUIGrid.clearGridData("#grid_wrap-rackSelect");
					      return;
					   } 
					   
					   for(let i = 0 ; i < auiList.length ; i++)
					   {
						
							if(selectQty[auiList[i].rackCode]!=null) // 선택된랙 파싱 객체에 현재 반복문에서 검색중인 랙코드가 키로 존재할경우 해당 인덱스의 객체가 선택된 랙
							{
								selectStorCode = auiList[i].storageCode; //선택된 인덱스의 창고코드를 저장
								break;
							}	 				
					  }
					  for(let i = 0 ; i < auiList.length ; i++)
					  {
							if(Number(auiList[i].stockQty) < event.item.qty)  //요청수량보다 적은경우 패스
									continue;
							//20240930 supi 다른 창고물건은 선택하기로 안보이는 이슈가 있어서 주석처리함
							//if(auiList[i].storageCode != selectStorCode) // 창고가 다른경우 패스
							//		continue;
							auiList2.push(auiList[i]); // 동일창고면서 수량이 요청수량보다 많은 랙인경우 배열에 추가
					  }
					   
					   
				 	   if(auiList2.length == 0) // 동일창고면서 수량이 요청수량보다 많은 랙이 리스트에 추가가 안됬으면 빈 그리드 표시
				 	   {
					      AUIGrid.clearGridData("#grid_wrap-rackSelect");
					      return;
					   } 
		               
		               AUIGrid.setGridData("#grid_wrap-rackSelect" ,auiList2); 
		               
		         	} 
					}); 
					AUIGrid.bind("#grid_wrap-rackSelect", "cellDoubleClick", function( e ) { //랙선택 다이얼로그 auigrid에 셀 더블클릭 이벤트 등록
						  
							const selectRactText = e.item.rackName+"["+e.item.rackCode+"]:"+event.item.qty; 
				 			AUIGrid.updateRow("#grid_wrap2", {selectRack: selectRactText}, event.rowIndex);
							dialogRackSelect.dialog("close");
					}); 
					return;
				}
				
				
				const dialogRackSelect = $("#dialog-rackSelect").dialog({ 
				title : "랙 선택 (부품번호:"+event.item.itemNo+" / 부품명:"+event.item.itemName+" / 요청수량:"+event.item.qty+")", // 랙선택 팝업의 타이틀에 편의성을 위해 현재 랙선택 하려는 부품에 대한 정보와 요청수량을 적어줌
				minHeight: 200,
				width: 700,
				modal: true,
				headerHeight: 40,
				position: { my: "center", at: "center", of: window },
				
				close: function() {
					
				},
				buttons: {
					"확인": (e)=>{   //랙선택 팝업의 확인버튼을 누르면 팝업에 수량들을 회수요청 상세내역에서 랙선택 컬럼에 텍스트로 정리해줌
						const selectRackItem = AUIGrid.getGridData("#grid_wrap-rackSelect");
						let selectRactText = "";
						let sumQty = 0;
						
						for(let i = 0 ; i < selectRackItem.length ; i++)  //선택된 랙 수량을 회수 접수 상세내역의 선택된 랙에 텍스트로 넣어주는 코드
						{
							if(selectRackItem[i].selectQty == '' ) continue;
							else if(selectRackItem[i].selectQty == 0 ) continue;
							else if(selectRactText != "") selectRactText += " / ";
							selectRactText += selectRackItem[i].rackName+"["+selectRackItem[i].rackCode+"]:"+selectRackItem[i].selectQty;  // 형식 "랙이름[랙코드]:수량/랙이름2[랙코드2]:수량2"
							sumQty += selectRackItem[i].selectQty;
						} 
						if(parseInt(event.item.qty) < sumQty) //선택한 랙의 수량의 합이 요청수량보다 많을경우
						{
							alert("요청수량보다 수량을 많이 입력하셨습니다");
							return;
						} 
						AUIGrid.updateRow("#grid_wrap2", {selectRack: selectRactText}, event.rowIndex);
						dialogRackSelect.dialog("close");
					},
					"취소": (e)=> { 
						
						dialogRackSelect.dialog("close");
					}
				},
				open:function (type, data) { 
					
				// Dialog의 Title Bar 제거
				   const auiGridProcps = { 
						editable: true,
						autoGridHeight:true,
						showFooter: true,
						enableClipboard:false // 랙 선택 및 수량이다 보니 복붙 사용이유 없어서 막아둠
				   }
				   let auiList = rackQtyList[event.item.itemId];   // 회수 상세내역에 있는 부품들의 랙 ,창고 ,수량 정보가 든 객체에 [순번]키를 넣어서 현재 부품에 대한 랙,창고,수량 정보를 가져옴
				   let selectQty =  selectRackQtyTextParse(event.item.selectRack); // 회수 상세내역에 있는 선택된랙 컬럼의 텍스트를 파싱해서 가져옴 (초기화값)
				   $(this).dialog().parents(".ui-dialog").find(".ui-dialog-titlebar-close").remove();
				    AUIGrid.destroy("#grid_wrap-rackSelect");
			 	   AUIGrid.create("#grid_wrap-rackSelect", rackSelectColumnLayout, auiGridProcps);
			 	   if(auiList == null) // 위탁창고 객체에 없을경우 = 회수할 물품수량이 0인경우
			 	   {
				      AUIGrid.clearGridData("#grid_wrap-rackSelect");
				      return;
				   }
			 	   
				   for(let i = 0 ; i < auiList.length ; i++) // 위의 두개의 변수를 통해 부품의 랙 정보에 기존 저장된 수량값을 삽입함
				   {
						auiList[i].selectQty = selectQty[auiList[i].rackCode]!=null?selectQty[auiList[i].rackCode]:'';
				   } 
				    
	               AUIGrid.setFooter("#grid_wrap-rackSelect", rackSelectFooterLayout);
	               AUIGrid.bind("#grid_wrap-rackSelect", "cellEditEnd", function( event ) { // 수량변경에 음수불가와 랙수량보다 높은값 입력금지라는 제약조건을 바인딩함
						const item = event.item;
						if(item.selectQty < 0)
  				       	{
							AUIGrid.updateRow("#grid_wrap-rackSelect",{selectQty : event.oldValue}, event.rowIndex); 
							alert("0보다 작은 수량은 입력할수 없습니다.") 
						}
  				        else if(item.selectQty > parseInt(item.stockQty))
  				        {
							AUIGrid.updateRow("#grid_wrap-rackSelect",{selectQty : event.oldValue}, event.rowIndex); 
							alert("랙의 수량보다 높은 수량을 선택할수 없습니다.") 
  				       	} 
					}); 
	               AUIGrid.setGridData("#grid_wrap-rackSelect" ,auiList); 
	               
	         	} 
				}); 
				
			},
		},editable: false
	},
	{ dataField : "selectRack",      headerText : "선택된 랙"  , width : 260    ,editable: false}
	,{ dataField : "storReqComName",      headerText : "창고사용요청업체"  , width : 120   ,editable: false }	
	,{ dataField : "storReqNo",      headerText : "창고사용요청번호"  , width : 120   ,editable: false }	
	,{ dataField : "storReqSeq",      headerText : "창고사용요청순번"  , width : 120   ,editable: false}	
	,{ dataField : "rcvLogisCode",      headerText : "수령물류센터"   ,editable: false}	
	,{ dataField : "reqMemo1",      headerText : "요청 사항"  , width : 260    ,editable: false}	
	,{ dataField : "inMemo1",      headerText : "메모"  , width : 260 ,editable: false  }	
	,{ dataField : "rejectMemo",      headerText : "거절사유"  , width : 260   ,editable :true }	
	 
	
]

const rackSelectColumnLayout = [   //요청일자 , 요청번호 , 접수단계 , 구분 , 아이템수 , 요청담당자 ,요청메모 , 접수담당자 , 처리일자 , 거부사유 , 기타메모 , 등록자 , 수정자 , 수정일자
	 { dataField : "rackCode",    headerText : "랙코드", width : 100,editable: false}  
	,{ dataField : "rackName",   headerText : "랙이름" , width : 300 ,editable: false} 
	,{ dataField : "stockQty",      headerText : "수량"  , width : 100,editable: false}
	,{ dataField : "selectQty",      headerText : "수량 선택"  , width : 100 , dataType : "numeric" , formatString : "###0",
		editRenderer : {
			type : "NumberStepRenderer",
			textAlign : "center"
		}
	}	 
]; 

const rackSelectColumnLayout2 = [  //창고사용요청과 연결된 요청의 랙선택에 사용될 컬럼레이아웃
	 { dataField : "rackCode",    headerText : "랙코드", width : 100,editable: false}  
	,{ dataField : "rackName",   headerText : "랙이름" , width : 400 ,editable: false} 
	,{ dataField : "stockQty",      headerText : "수량"  , width : 100,editable: false}
  
]; 
let rackSelectFooterLayout = [{
		labelText: "합계",
		positionField: "rackCode",
		style: "aui-grid-my-column"
	}, {
		dataField: "selectQty",
		positionField: "selectQty",
		operation: "SUM",
		formatString: "#,##0"
		,style:"center"

	} 
	];
	
const footerLayout = [{
	labelText: "합계",
	positionField: "regYmd",
	style: "aui-grid-my-column"
}, {
	dataField: "reqMaxSeq",
	positionField: "reqMaxSeq",
	operation: "SUM" 

}, {
	dataField: "rejectCount",
	positionField: "rejectCount",
	operation: "SUM"  

} 

];
// AUIGrid 를 생성합니다.
function createAUIGrid(ctReqColumnLayout) {
	
	const auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,
			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,
			selectionMode : "multipleCells",
			showAutoNoDataMessage : false,
			showFooter: true,
		
	};
	const auiGridProcps2 = {
			showRowCheckColumn: true, 
			showRowAllCheckBox: true,
	 		editable: true,
	 		dialogId: "grid_dialog",
			selectionMode : "multipleCells",
			//independentAllCheckBox: true,
		 
	}
	 
	// 실제로 #grid_wrap 에 그리드 생성
	  AUIGrid.create("#grid_wrap", ctReqColumnLayout, auiGridProps);
   
	// 셀 더블클릭 이벤트 바인딩 : 회수접수 상세내역 레이어팝업 오픈 
	AUIGrid.bind("#grid_wrap", "cellDoubleClick", function (event) {
		 
		if (event.dataField == "ctReqNo") {   
			 const ctReqNo = event.item.ctReqNo; 
			 dialogCtReq = $("#dialog-form").dialog({ 
				height: 650,
				width: 1200,
				modal: true,
				headerHeight: 40,
				position: { my: "center", at: "center", of: window },
				
				close: function() {
					localStoragePntRemove();
				},
				open:function (type, data) { 
				 
				// Dialog의 Title Bar 제거
	               $(this).dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
	               AUIGrid.create("#grid_wrap2", ctReqItemColumnLayout, auiGridProcps2);
	               AUIGrid.bind("#grid_wrap2", "rowAllChkClick", function (event) {
						if (event.checked) {
						 
							let uniqueValues = ['','완료','불가'];
					 
							AUIGrid.setCheckedRowsByValue(event.pid, "procStep", uniqueValues);
						} else {
							AUIGrid.setCheckedRowsByValue(event.pid, "procStep", []);
						}
					});
				 	AUIGrid.bind("#grid_wrap2", "copyBegin", function(event) { 
					  const text =  event.data; 
					   navigator.clipboard.writeText(text);  
   					  return event.data;
					});
	               $.ajax(	{ // 상세내역이 열릴때 상세내역 정보를 불러오는 통신
						type : "POST",
						url : "/order/out-ct-req-item-list",
						dataType : "json",
						data: { 
							ctReqNo
						},
						async: false,
						//contentType: "application/json; charset=utf-8",
						contentType : "application/x-www-form-urlencoded;charset=UTF-8",
						success:function(data){
							
						 
							if(data == null ) return;
							if(data.ctReqItemList == null) return;
						 
						 	let procStep = nTxtRmv(event.item.procStep)==''?"요청":nTxtRmv(event.item.procStep); 
						 
							$("#dialogCtReqNo").text(nTxtRmv(event.item.ctReqNo));
							$("#dialogCtRegYmd").text(nTxtRmv(event.item.regYmd));
							$("#dialogCtMgr").text(nTxtRmv(event.item.reqMgr)); 
							$("#dialogCtMemo").text(nTxtRmv(event.item.reqMemo1));
							$("#rcvLogisCode").text(nTxtRmv(event.item.rcvLogisCode)); // 240607 yoonsang 수령물류센터 추가
							//dialogCtInMemo1
							
							$("#deliWay").text(event.item.deliWay ?? '');	
							
							if(event.item.deliWay == '방문수령')
							{
								$("#deliLabel").text("방문처"); 
								$("#deliType").text(event.item.rcvLogisCode ?? '');	
							}
							else
							{
								$("#deliLabel").text("비용"); 
								$("#deliType").text(event.item.deliPayType ?? '');	
							}
							
							$("#dialogCtProcUserId").val(nTxtRmv(event.item.procUserId));
							$("#dialogCtProcStep").text(procStep);
							$("#dialogCtProcDate").text(nTxtRmv(event.item.procDate));
							$("#dialogCtInMemo1").val(nTxtRmv(event.item.inMemo1));
							ctStoRackListSet(ctReqNo, data);
						 
							switch(procStep)
							{
								
								//$("#dialogRejectReg").removeClass('disabled');
								//document.getElementById('btnReject').classList.toggle('disabled');
								case '요청':
								$("#dialogProcStep").html("접수"); 
								$("#dialogProcStep").show();
								$("#dialogProcStep").attr('class','btn btn-primary');  
								$("#dialogRejectReg").hide(); 
								break;
								case '접수':
								case '일부처리':
								$("#dialogProcStep").html("완료");
								$("#dialogProcStep").show();
								$("#dialogProcStep").attr('class','btn btn-primary');  
								$("#dialogRejectReg").show(); 
								break;
								case '전체처리':
								case '처리완료':
								$("#dialogProcStep").hide();
								$("#dialogRejectReg").hide();  
								break; 
							}
							if(data.ctReqItemList.find((row)=>row.procStep == '완료'))
								$("#dialogProcCancel").show();
							else 
								$("#dialogProcCancel").hide();
							
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
			}); 
		};
	})
	
	AUIGrid.setFooter(myGridID, footerLayout);
}
function nTxtRmv(text) // null데이터로 인한 undefined 텍스트 제거용
{
	if(text == null)
		return '';
	else 
		return text;
		
}

function searchCtData() { // 회수 접수 내역의 마스터 리스트 조회
	 
	const sYmd1 = document.getElementById("startpicker-input").value.replace(/-/g,'');
	const eYmd1 = document.getElementById("endpicker-input").value.replace(/-/g,'');
	let ymdIgnoreYN = "N";
		if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";	}
	const ctReqNo = $("#ctReqNo").val(); 	 
	let procState = '';
 	const itemId = $("#itemId").val();
 	const itemNo = $("#itemNo").val();
 	
 	if($("#procState").val() != null)
 	{
		for(item of $("#procState").val())
		{
			if(procState != '') procState += '^';
			procState += item;
		}
	}

	$.ajax(	{
		type : "POST",
		url : "/order/out-ct-req-list",
		dataType : "json",
		data: { 
			sYmd1,
			eYmd1,
			ymdIgnoreYN,
			ctReqNo,
			reqYN : 'N', 
			procState,
			itemId,
			itemNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			
			if(data == null ) return;
			if(data.ctReqList == null) return;
			
			if (data.ctReqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				location.href;
				return; 						
			}
			 
		 	 
			AUIGrid.setGridData("#grid_wrap" ,data.ctReqList);  
		//	for(let i = 0 ; i < )
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
function ctReqDel (ctReqNo , ctReqSeqArr)  // 회수요청의 디테일 삭제 통신 디테일이 모두 삭제되면 마스터도 삭제
{
	 
	
	$.ajax(	{
		type : "POST",
		url : "/order/ctReqDel",
		dataType : "json",
		data: { 
			ctReqNo,
			ctReqSeqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			dblRegClkBln = false;
			if(data.db_resultCode == 'Err')
				alert(data.db_resultMsg);
			else
			{
				dialogCtReq.dialog("close");
				searchCtData();
				alert("요청이 취소되었습니다");
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
// 회수접수 상세내역 창의 정보 수정
function infoUpdate(info , fun)  ///order/ctReqAdd 
{
 	
	$.ajax(	{
		type : "POST",
		url : "/order/ctReqAdd",
		dataType : "json",
		data: { 
			reqNo : info.reqNo,
			procUserId : info.procUserId,
			inMemo1 : info.inMemo1,
			itemSeqArr : info.ctItemSeq,
			itemRackArr : info.ctItemSelectRack,
			itemRejectMemoArr : info.ctItemRejectMemo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){ 
			fun();
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

//요청번호로 랙, 창고코드 가져오기 // 회수 접수 상세 내역 열때 두번째 통신
function ctStoRackListSet(ctReqNo,d)  ///order/ctReqAdd
{

	let ctReqItemList = d.ctReqItemList;
	$.ajax(	{
		type : "POST",
		url : "/order/ctStoRackList",
		dataType : "json",
		data: { 
			ctReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			if(data == null ) return;
			if(data.ctStoRackList == null) return;
	 
			// storQtyList={};  창고선택용
			rackQtyList={};
			//let storQty ={};  
			
			//data = 요청번호의 디테일내의 아이템들의 아이템코드와 창고코드,창고이름 , 랙코드,랙이름등 정보들이 저장되어 있음
			//ctReqItemList = 디테일의 정보들이 담겨있음
		 
			for(let i = 0 ; i < data.ctStoRackList.length ; i++)  // 랙선택창에서 쓸 랙 정보인 rackQtyList를 형성
			{
				const itemId = data.ctStoRackList[i].itemId;
				//const storageCode = data.ctStoRackList[i].storageCode
//				let reqSeq; 
//				for(let j =0 ; j < ctReqItemList.length ; j++)
//				{ 
//					if(ctReqItemList[j].itemId == itemId)
//					{ 
//						reqSeq = ctReqItemList[j].reqSeq;
//						break;
//					}
//				} 
				// 통신으로 받아온 데이터 랙,창고코드로 storQty 라는 변수에 [순번][창고코드]로 접근하는 2차원 객체를 만든다 < 창고용
//				if(storQty[reqSeq] == null) 
//					storQty[reqSeq] = {};
//				
//				if(storQty[reqSeq][storageCode] == null)
//					storQty[reqSeq][storageCode] = {storageCode , storageName : data.ctStoRackList[i].storageName , stockQty :  parseInt(data.ctStoRackList[i].stockQty)};
//				else
//					storQty[reqSeq][storageCode].stockQty +=  parseInt(data.ctStoRackList[i].stockQty);
					
				// 랙 별로 객체생성
				if(rackQtyList[itemId] == null)  //렉 선택용 팝업 데이터 리스트객체에 [픔반]을 키로 랙코드,랙이름,수량이 담긴 객체의 배열을 만들어서 기록 
					rackQtyList[itemId] =[];
				rackQtyList[itemId].push({rackCode:data.ctStoRackList[i].rackCode , rackName : data.ctStoRackList[i].rackName , stockQty : data.ctStoRackList[i].stockQty , 
										storageCode : data.ctStoRackList[i].storageCode , storageName : data.ctStoRackList[i].storageName } );
				 
			} 
			for(let i = 0 ; i < ctReqItemList.length ; i++)
			{
				ctReqItemList[i].custName = ctReqItemList[i].custName1 || ctReqItemList[i].custName2;
			} 
			 //창고선택
//			for(let i = 0 ; i < ctReqItemList.length ; i++) // 각 부품의 storQty 키에 위에 2차원 객체를 참조하여 자신의 순번의 객체중 0번째 객체를 찾아서 해당 정보를 '창고이름(창고코드) [수향]'으로 넣는다
//			{ 
//				const storKeys = Object.keys(storQty[ctReqItemList[i].reqSeq]);
//				const item = storQty[ctReqItemList[i].reqSeq][storKeys[0]];
//				ctReqItemList[i].storQty = item.storageName + '('+item.storageCode+') '+'['+item.stockQty+']';
//				
//				 
//				for(j = 0 ; j < storKeys.length ; j++)  // 2차원 객체 storQty를 이용하여 storQtyList라는 AUIGrid에서 쓸 드랍박스 리스트를 순번을 키값으로 값은 각 창고정보를 string 배열을 가지는 객체정보를 형성 
//				{
//					const inputItem = storQty[ctReqItemList[i].reqSeq][storKeys[j]];
//					const inputText =  inputItem.storageName + '('+inputItem.storageCode+') '+'['+inputItem.stockQty+']';
//					if(storQtyList[ctReqItemList[i].reqSeq] == null)
//						storQtyList[ctReqItemList[i].reqSeq] = [];
//					storQtyList[ctReqItemList[i].reqSeq].push(inputText);
//				} 
//			} 
		
		 	
			AUIGrid.setGridData("#grid_wrap2" ,ctReqItemList); 
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
 
 
/**
* 대형 A[1719]:2 / 남부 핀통[3209]:2 같은 선택된 랙 텍스트를 {1719:2, 3209:2} 와 같이 랙코드가 키가 되고 선택된 수량이 값이 되는 객체로 파싱해주는 함수
* 
 */
function selectRackQtyTextParse(text)  
{
	if(text == ""  ) return {};
	let selectQty = {};
	if(text != null)
	{
	 
		const selectRackArr = text.split(" / ");
		for(let i = 0 ; i < selectRackArr.length ; i++)   // 선택된 렉 택스트를 파싱해서 selectQty에 selectQty[렉코드] = 수량 형식으로 저장
		{
			const rackData = selectRackArr[i].split("]:");
			selectQty[rackData[0].split("[")[1]] =  rackData[1]; // selectQty[랙코드] = 선택수량이 되도록 지정
							 
		}
						
	} 
	return selectQty
} 

// 회수 실제처리
function ctProcess(reqNo)
{
	let seqArr ='';
	let rackArr ='';
	let qtyArr = ''; 
	const state = $("#dialogCtProcStep").text();
	if(state == '접수' || state == '일부처리') //접수상태일때 사실상 진짜 처리가 이루어져서 접수일때 처리가 이루어질 요청번호의 순번,수량,랙을 텍스트배열로 저장해서 통신 매개변수로 넘겨줌
	{
		
		const gridData = AUIGrid.getCheckedRowItems("#grid_wrap2");
 
		
		if(gridData.length ==0) //체크된 부품을 체크 한 상태에서 아이템리스트가 0개
		{
			alert("체크된 부품이 없습니다");
			return;
		}
		
		for(let i=0 ; i < gridData.length ; i++)
		{
			const rackArrObj = selectRackQtyTextParse(gridData[i].item.selectRack);
			const rackArrObjKeys =  Object.keys(rackArrObj);
			
			for(let j = 0 ; j < rackArrObjKeys.length ; j++)
			{
				if(i!=0 || j !=0) // 시작이 아니면 구분자 넣어줌
				{
					seqArr += '^';
					rackArr += '^';
					qtyArr += '^'; 
				}
				seqArr += gridData[i].item.reqSeq;
				rackArr +=nTxtRmv(rackArrObjKeys[j]) ;
				qtyArr  += nTxtRmv(rackArrObj[rackArrObjKeys[j]]); 
			} 
		}  
	 
	}    
 
 
	$.ajax(	{
		type : "POST",
		url : "/order/ctProcess",
		dataType : "json",
		data: { 
			reqNo,
			seqArr,
			rackArr,
			qtyArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
		 
	 
			const code = data.ctProcess.db_resultCode;
			const msg = data.ctProcess.db_resultMsg;
		 
 
			dialogCtReq.dialog("close"); 
 			searchCtData(); 
 			alert(msg);	 
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
    

function pagePrintEvent()
{
		const reqNo = $("#dialogCtReqNo").text();  //요청번호 
		const gvMgr = $("#dialogCtMgr").text();  //요청담당
		const regYmd = $("#dialogCtRegYmd").text(); //요청일자 
		const gvMemo = $("#dialogCtMemo").text(); //요청메모
		
		const procUserId = $("#dialogCtProcUserId").val();  //접수담당
		const procStep = $("#dialogCtProcStep").text();     //접수단계
		const procDate = $("#dialogCtProcDate").text();     //접수일자
		const procMemo = $("#dialogCtInMemo1").val();       //접수메모
		const deliWay = $("#deliWay").text();
		const deliType = $("#deliType").text();
		
		const checkItemPrintYN = $('input[name="checkItemPrintYN"]').is(":checked"); //체크부품만 인쇄할지 여부 
		 
		const reqItemData = []; 
		
		//체크품목만 인쇄하기 체크박스 체크 여부에 따라 분기해서 itemList에 데이터를 저장
		const rowItems = checkItemPrintYN?AUIGrid.getCheckedRowItems("#grid_wrap2") : AUIGrid.getGridData("#grid_wrap2"); 
		
		if(checkItemPrintYN && rowItems.length ==0) //체크된 부품을 체크 한 상태에서 아이템리스트가 0개
		{
			alert("체크된 부품이 없습니다");
			return;
		}
		
		for(let i = 0 ; i < rowItems.length ; i ++)
		{
			const row = checkItemPrintYN?rowItems[i].item:rowItems[i];
			
		//	console.log(row);
			
			reqItemData.push({
				index: row.reqSeq,
				itemId: row.itemId,
				itemNo: row.itemNo,
				itemName: row.itemName, 
				qty:   row.qty    ,
				custName : row.custName
				,rcvLogisCode : row.rcvLogisCode
			}) 
		}
		 
		//data객체에 얻은 데이터들을 모두저장
		const data = {reqNo , gvMgr , regYmd , gvMemo , reqItemData , rackQtyList , procUserId , procStep , procDate , procMemo, deliWay ,deliType};
		
		//로컬스토리지에 'pcReqPrintInfo/'+요청번호의 String키로 위에서 얻은 데이터를 json형식으로 변환해서 저장
		localStorage.setItem("ctReqPrintInfo/"+reqNo, JSON.stringify(data));
		//인쇄페이지를 열되 페이지에서 참조할수 있도록 요청번호를 url에 전달
		window.open("ct-req-item-list-print?reqNo="+reqNo ,"_blank", "menubar=no, toolbar=no");
}
//주문요청 상세내역이 종료될때 로컬스토리지에서 동일 요청번호의 데이터가 있다면 제거해줌
window.addEventListener('beforeunload', ()=> {
	localStoragePntRemove();
});


function localStoragePntRemove() // 창이 꺼질때, 브라우저가 종료될때 호출되어야 해서 함수로 제작
{
	const reqNo = $("#dialogCtReqNo").text();
	localStorage.removeItem("ctReqPrintInfo/"+reqNo);
}  

function ctInfoSave(fun)
{
	let ctItemSeq = "";
	let ctItemSelectRack="";
	let ctItemRejectMemo="";
	const ctReqItemData = AUIGrid.getGridData("#grid_wrap2"); 
	for(let i = 0 ; i < ctReqItemData.length ; i++)  //선택된 랙 텍스트 업데이트를 위한 string 형성
	{
		if(i>0)
		{
			ctItemSeq += "^";
			ctItemSelectRack += "^";
			ctItemRejectMemo += "^";
		}
		ctItemSeq += ctReqItemData[i].reqSeq;
		ctItemSelectRack += nTxtRmv(ctReqItemData[i].selectRack);
		ctItemRejectMemo += nTxtRmv(ctReqItemData[i].rejectMemo);
	}
	// 저장버튼은 요청상태를 변동시키진 않지만 현재 접수담당자와 메모, 그리고 부품들의 랙 선택 상태를 변경시킬수 있음
	const info = { reqNo: $("#dialogCtReqNo").text() ,
				   procUserId :  $("#dialogCtProcUserId").val() ,
				   ctItemSeq , 
				   ctItemSelectRack,   
				   inMemo1 : $("#dialogCtInMemo1").val(),
				   ctItemRejectMemo}; 
	infoUpdate(info, fun); 
}
function ctReqDel (ctReqNo , ctReqSeqArr) // 디테일에 대한 요청 불가처리
{
	$.ajax(	{
		type : "POST",
		url : "/order/ctReqDel",
		dataType : "json",
		data: { 
			ctReqNo,
			ctReqSeqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			dblRegClkBln = false;
			if(data.db_resultCode == 'Err')
				alert(data.db_resultMsg);
			else
			{
				dialogCtReq.dialog("close");
				searchCtData();
				alert("요청이 취소되었습니다");
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


function barcodeOpenPopup(ctReqNo)
{  
	const ctInfo = AUIGrid.getItemsByValue(myGridID , 'ctReqNo' , ctReqNo)
	 
	
	const auiGridProcps2 = {
			showRowCheckColumn: true, 
			showRowAllCheckBox: true,
	 		editable: true,
	 		dialogId: "grid_dialog",
			selectionMode : "multipleCells",
		//	independentAllCheckBox: true,
		
//			rowCheckableFunction: function (rowIndex, isChecked, item) {
//					if(item.procStep != "" && item.procStep != null) { 
//						return false;
//					}
//					return true;
//				},
//			rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
//				 if(item.procStep != "" && item.procStep != null) { 
//					return false;  
//				}
//				return true;
//			}
	}
	dialogCtReq = $("#dialog-form").dialog({
		height: 650,
		width: 1200,
		modal: true,
		headerHeight: 40,
		position: { my: "center", at: "center", of: window },

		close: function() {
			localStoragePntRemove();
		},
		open: function(type, data) {

			// Dialog의 Title Bar 제거
			$(this).dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
			AUIGrid.create("#grid_wrap2", ctReqItemColumnLayout, auiGridProcps2);
			AUIGrid.bind("#grid_wrap2", "rowAllChkClick", function(event) {
				if (event.checked) {

					let uniqueValues = [''];

					AUIGrid.setCheckedRowsByValue(event.pid, "procStep", uniqueValues);
				} else {
					AUIGrid.setCheckedRowsByValue(event.pid, "procStep", []);
				}
			});
			AUIGrid.bind("#grid_wrap2", "copyBegin", function(event) {
				const text = event.data;
				navigator.clipboard.writeText(text);
				return event.data;
			});
			$.ajax({ // 상세내역이 열릴때 상세내역 정보를 불러오는 통신
				type: "POST",
				url: "/order/out-ct-req-item-list",
				dataType: "json",
				data: {
					ctReqNo
				},
				async: false,
				//contentType: "application/json; charset=utf-8",
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				success: function(data) {


					if (data == null) return;
					if (data.ctReqItemList == null) return;

					let procStep = nTxtRmv(ctInfo[0].procStep) == '' ? "요청" : nTxtRmv(ctInfo[0].procStep);

					$("#dialogCtReqNo").text(nTxtRmv(ctInfo[0].ctReqNo));
					$("#dialogCtRegYmd").text(nTxtRmv(ctInfo[0].regYmd));
					$("#dialogCtMgr").text(nTxtRmv(ctInfo[0].reqMgr));
					$("#dialogCtMemo").text(nTxtRmv(ctInfo[0].reqMemo1));
					//dialogCtInMemo1

					$("#deliWay").text(ctInfo[0].deliWay ?? '');

					if (ctInfo[0].deliWay == '방문수령') {
						$("#deliLabel").text("방문처");
						$("#deliType").text(ctInfo[0].rcvLogisCode ?? '');
					}
					else {
						$("#deliLabel").text("비용");
						$("#deliType").text(ctInfo[0].deliPayType ?? '');
					}

					$("#dialogCtProcUserId").val(nTxtRmv(ctInfo[0].procUserId));
					$("#dialogCtProcStep").text(procStep);
					$("#dialogCtProcDate").text(nTxtRmv(ctInfo[0].procDate));
					$("#dialogCtInMemo1").val(nTxtRmv(ctInfo[0].inMemo1));
					ctStoRackListSet(ctReqNo, data);

					switch (procStep) {

						//$("#dialogRejectReg").removeClass('disabled');
						//document.getElementById('btnReject').classList.toggle('disabled');
						case '요청':
							$("#dialogProcStep").html("접수");
							$("#dialogProcStep").show();
							$("#dialogProcStep").attr('class', 'btn btn-primary');
							$("#dialogRejectReg").hide();
							$("#dialogProcCancel").hide();
							break;
						case '접수':
						case '일부처리':
							$("#dialogProcStep").html("완료");
							$("#dialogProcStep").show();
							$("#dialogProcStep").attr('class', 'btn btn-primary');
							$("#dialogRejectReg").show();
							$("#dialogProcCancel").show();
							break;
						case '전체처리':
						case '처리완료':
							$("#dialogProcStep").hide();
							$("#dialogRejectReg").hide();
							$("#dialogProcCancel").show();
							break;
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
	});
}



setItemBarcodeScanFun((item)=>
{
	const itemData = {itemId:item.itemId ,
				 itemNo:item.itemNo ,
				 itemName:item.itemName ,
				 rackCode:item.rackCode ,
				 rackName:item.rackName ,
				 storCode:item.storCode ,
				 storName:item.storName ,
				 stockQty:item.stockQty ,
				 
				 };
	 	 
	const GridId = '#grid_wrap2'; 
	const auiGridData = AUIGrid.getRowsByValue(GridId , 'itemId' , itemData.itemId); //상세내역 그리드 내에서 itemId가 스캔데이터와 일치하는 행들을 배열로 가져옴

	if(auiGridData.length == 0) //요청내에 부품아이디가 동일한 요청이 없음
	{
		itemBarcodeScanfailPopup('스캔결과 부품과 동일한 부품아이디의 요청이 존재하지 않습니다',itemData);
		return;
	} 
	
	// rackQtyList 반환값 객체에  현재 그리드의 아이템 아이디를 키로 넣으면 그 아이템의 랙수량 데이터 전체가 노출
	//  selectRackQtyTextParse에 현재 행의 selectRack 문자열을 넣으면 랙코드:수량 식으로 반환해줌
	
	
	//바코드 스캔한 부품과 동일 부품아이디 요청디테일중 선택된 랙의 수량이 요청보다 적은 수량인 대상을 탐색
	const targetRow = auiGridData.find((row)=>{
		const selectRackQty =  selectRackQtyTextParse(row.selectRack);
		let sum = 0;
		for(key in selectRackQty) sum+=parseInt(selectRackQty[key]);
		if(parseInt(row.qty) > sum) return true;
		
	})
	
	if(targetRow == null) // 요청수량보다 적은 타겟이 없음
	{
		itemBarcodeScanfailPopup(`조회결과 ${itemData.itemNo}는 이미 요청한 수량만큼 수량이 선택되어 있습니다`,itemData);
		return;
	}
	
	if(rackQtyList[itemData.itemId] == null)  // 
	{
		itemBarcodeScanfailPopup(`조회결과 ${itemData.itemNo}는 랙에 재고가 존재하지 않습니다.`,itemData);
		return;
	}
	
	if(rackQtyList[itemData.itemId].find((rack)=>{if(rack.rackCode == itemData.rackCode) return true}) ==null)
	{
		itemBarcodeScanfailPopup('바코드의 업체명을 확인해주세요',itemData);
		return;
	}
	
	//상세정보내의 데이터에서 스캔 랙코드와 일치하는 랙의 정보를 가져옴
	const scanItemRackInfo = rackQtyList[itemData.itemId].find((rack) =>{
		if(rack.rackCode == itemData.rackCode) return true; 
	})
	
	//현재 대상행의 선택된 렉 text를 파싱해서 객체로 보관
	const targetSelectRackQty = selectRackQtyTextParse(targetRow.selectRack);
	
	
	//선택된 랙 수량이 랙의 재고수량보다 많거나 같을떄
	if(parseInt(targetSelectRackQty[itemData.rackCode] || 0 ) >= parseInt(scanItemRackInfo['stockQty']))
	{
		itemBarcodeScanfailPopup('더이상 랙에 수량을 추가할수 없습니다.',itemData);
		return;
	}

	
	targetSelectRackQty[itemData.rackCode] = parseInt(targetSelectRackQty[itemData.rackCode] || 0) +1;
	
	
	const afterText = rackQtyList[itemData.itemId].reduce((text , rack)=>{
		if(targetSelectRackQty[rack.rackCode] == null) return text; // 해당랙이 선택 안됨
		if(text != '') text += ' / ';
		text += `${rack.rackName}[${rack.rackCode}]:${targetSelectRackQty[rack.rackCode]}` ;
		return text;
	},'')
	 
 
	const targetIndex = AUIGrid.getRowIndexesByValue(GridId , '_$uid' , targetRow._$uid); // 그리드행의 _$uid를 통해 해당 인덱스 추출
	AUIGrid.updateRow(GridId ,{selectRack: afterText}, targetIndex[0]); // 수량증가된 텍스트 최신화
	AUIGrid.addCheckedRowsByValue(GridId ,  '_$uid' , targetRow._$uid); 
	barcodeScanSuccessCountUp();
}); 



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



$("#dialogProcCancel").on('click', ()=>{
	const checkedItems = AUIGrid.getCheckedRowItems('#grid_wrap2').map((row)=>row.item);
	if(checkedItems.length ==0)
	{
		alert('체크된 부품이 없습니다.');
		return;
	}
	
	if(checkedItems.find((row)=>row.procStep != '완료'))
	{
		alert('완료상태가 아닌 부품이 체크되어있습니다.')
		return;
	}
	
	const progressInfo = progressOpen( checkedItems.length);
	const eArr = [];
	
	for(item of checkedItems)
	{
		$.ajax({ url : '/order/ctProcCancel' , 
		dataType : 'json',
		type : 'POST',
		async : false,
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : { 
				ctReqNo : item.ctReqNo ,
				reqSeq : item.reqSeq   
		},
		success : (result)=>{ 
		//	console.log(result);
			if(result?.db_resultCode == 'Err')
			{
				eArr.push(result);
			}
			 
		},
		error : (e)=>{
		}
		})
		progressSet(progressInfo , progressInfo.curProgress+1);
	}
	setTimeout(()=>{  
	 	if(eArr.length > 0)
	 	{
			alert(`처리실패\n${eArr.length}건의 요청이 실패하였습니다\n실패 : ${eArr.reduce((a,c)=>a+'\n'+c.db_resultMsg,'')}`)
		}
		else 
		{
			alert('처리성공');
		} 
		$( "#dialog-form-itemProgress" ).dialog('close')
		$("#dialog-form-stockInReq").dialog('close');
		dialogCtReq.dialog("close"); 
 		searchCtData(); 
		//location.reload();
	},550);
	
})
