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

function createAUIGrid()
{
	const columnLayout = [ 
		 { dataField : "idx",  headerText : "번호",  width : 50 , visible: false  }, 		 
		 { dataField : "step",    headerText : "상태", width : 70 }, 
		 { dataField : "stockInType",    headerText : "투입유형", width : 70   }, 
		 { dataField : "className",    headerText : "구분", width : 70   }, 
		 { dataField : "brandName",    headerText : "제조사명", width : 110 , style:"left" },  
		 { dataField : "itemId",    headerText : "부품ID", width : 100 }, 
		 { dataField : "itemNo",    headerText : "품번", width : 140 , style:"left"}, 
		 { dataField : "factoryNo",    headerText : "공장품번", width : 140 , style:"left"}, 
		 { dataField : "itemName",    headerText : "부품명", width : 140 , style:"left"}, 
		 { dataField : "stockQty",    headerText : "출고대기랙재고", width : 100 , style:"right"},  
		 { dataField : "cnt",    headerText : "요청수량", width : 70 , style:"right"},  
		 { dataField : "centerPrice",    headerText : "센터가", width : 80 , style:"right", dataType: "numeric",formatString: "#,##0"},  
		 { dataField : "unitPrice",    headerText : "단가", width : 80 , style:"right", dataType: "numeric",formatString: "#,##0"},  
		 { dataField : "totalCenterPrice",    headerText : "센터금액", width : 80 , style:"right", dataType: "numeric",formatString: "#,##0"},
		 { dataField : "orderNo",    headerText : "주문번호", width : 85 ,
			styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { 	
			if(item.roReqComCode == null) return "auigrid-color-style-link";
			return null;	}
		}, 
		 { dataField : "orderSeq",    headerText : "주문순번", width : 70 }, 
		{ dataField : "orderCustName",    headerText : "주문거래처", width : 110 , style:"left" },  
		 { dataField : "roReqComName",    headerText : "반출요청업체", width : 80 }, 
		 { dataField : "roReqNo",    headerText : "반출요청번호", width : 85 }, 
		 { dataField : "roReqSeq",    headerText : "반출요청순번", width : 80 },
		 { dataField : "regUserName",    headerText : "요청자", width : 60 }, 
		 { dataField : "regYmd",    headerText : "요청날짜", width : 80 }, 
		 { dataField : "regHms",    headerText : "요청시간", width : 60 },  
		 { dataField : "chkUserName",    headerText : "처리자", width : 60 }, 
		 { dataField : "chkDate",    headerText : "처리일자", width : 80 }, 
		 { dataField : "stockInProcStorName",    headerText : "투입창고명", width : 80 }, 
		 { dataField : "stockInProcRackName",    headerText : "투입랙명", width : 80 }, 
		 { dataField : "stockInProcRackCode",    headerText : "투입랙코드", width : 70 }, 
		 { dataField : "stockInUserName",    headerText : "위탁사처리자", width : 90 }, 
		 { dataField : "stockInDate",    headerText : "위탁사처리일자", width : 100 }, 
		 { dataField : "memo1",    headerText : "메모1", width : 300 , style:"left"}, 
		 { dataField : "memo2",    headerText : "메모2", width : 400 , style:"left"} 
 	
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
		dataField: "unitPrice",
		positionField: "unitPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	},{
		dataField: "centerPrice",
		positionField: "centerPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	},{
		dataField: "totalCenterPrice",
		positionField: "totalCenterPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}
	];
	const auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			 
			enableFilter: true,
			showFooter: true,
			//enableCellMerge: true,
			rowIdField : "idx",
			showRowCheckColumn :true 
			};
	AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);	
	AUIGrid.setFooter("#grid_wrap", footerLayout);
 	AUIGrid.bind("#grid_wrap", "cellDoubleClick", function( e ) { 
		if(e.dataField == 'orderNo' && e.item.roReqComCode == null) //주문번호를 클릭했고 해당 행에 반출요청업체가 없을경우
        {
    		window.open(`${location.origin}/order/order-up?orderNo=${e.item.orderNo}`);
        }
	}); 
}

$(document).ready(function() {
	
	createAUIGrid();
	const params = new URL(document.location).searchParams;
	
	if(params.size >0) //url파라미터가 있을떄
	{
		$("#itemId").val(params.get('itemId'));
		$("#itemNo").val(params.get('itemNo'));
		$("#orderNo").val(params.get('orderNo'));
		$("#orderSeq").val(params.get('orderSeq'));
		$("#roReqNo").val(params.get('roReqNo'));
		$("#roReqSeq").val(params.get('roReqSeq'));
		$("#ymdIgnoreYN").prop('checked',true);
		getStockInReqItemList();
	}
	$("#procState").select2({ tags: true});
});


function getStockInReqItemList()
{
	$.ajax({ url : '/order/stock-in-req-item-list' , 
		dataType : 'json',
		type : 'POST',
		
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
				itemId : $("#itemId").val() ,
				itemNo : $("#itemNo").val() ,
				sYmd : $("#startpicker-input").val() ,
				eYmd : $("#endpicker-input").val() ,
				ymdIgnoreYN : $("#ymdIgnoreYN").prop('checked')?'Y':'N',
				orderNo : $("#orderNo").val(),
				orderSeq : $("#orderSeq").val() ,
				roReqNo : $("#roReqNo").val(),
				roReqSeq : $("#roReqSeq").val() ,
				procState : $("#procState").val()?.join('^') || ''
		},
		success : (result)=>{ 
			 
			const gridData = result.sort((a,b)=>a.regYmd.localeCompare(b.regYmd) || a.regHms.localeCompare(b.regHms) || a.idx - b.idx)
								   .map((row)=>{
										const chkDate = new Date(row.chkDate);
										const stockInDate = new Date(row.stockInDate)
										return {...row,
												
												step:row.chkUserName||'' != ''?'처리':'요청' , 
												chkDate :	row.chkDate?`${chkDate.getFullYear()}-${(chkDate.getMonth()+1).toString().padStart(2,'0')}-${chkDate.getDate().toString().padStart(2,'0')}`:'' ,
												stockInDate :	row.stockInDate?`${stockInDate.getFullYear()}-${(stockInDate.getMonth()+1).toString().padStart(2,'0')}-${stockInDate.getDate().toString().padStart(2,'0')}`:'' ,
												totalCenterPrice : row.cnt * row.centerPrice
												}    
										});
			
			AUIGrid.setGridData("#grid_wrap", gridData);  
		},
		error : (e)=>{
		}
		})
	
}

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
//재고투입 처리
function stockInReqProc(params)
{
	const {procType , checkItem , stockInType , stockInProcRack} = params;
 
	const resultArr = [];
 
	//처리전 제약조건등 검증은 복잡해져서 따로 뻄(checkItemVerification)
	
	const progressInfo = progressOpen(checkItem.length)
	for(const item of checkItem)
	{
		
		$.ajax({ url : '/order/stock-in-req-item-add' , 
			dataType : 'json',
			type : 'POST',
			async : false,
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			data : {
					workingType : procType ,
					orderNo : item.orderNo ,
					orderSeq : item.orderSeq , 
					roReqComCode : item.roReqComCode || '' ,
					roReqNo : item.roReqNo || '' ,
					roReqSeq : item.roReqSeq || '',
					cnt : item.cnt,
					idx : item.idx ,
					stockInType : item.stockInType,
					stockInProcRack : stockInProcRack || item.stockInProcRack 
			},
			success : (result)=>{ 
				resultArr.push(result);
				progressSet(progressInfo , progressInfo.curProgress+1);
			},
			error : (e)=>{
			}
		})
		
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
		getStockInReqItemList();
	},550);
	 
	
	
}
 

$("#btnFind").on('click', ()=>{
	getStockInReqItemList();
})

//처리 처리취소 요청취소 버튼 이벤트
$("#btnProc,#btnProcCancel,#btnReqCancel").on('click', (e)=>{ 
	const procTypeList = {btnProc : 'PROC' , btnProcCancel : 'PROC_CANCEL' , btnReqCancel : 'REQ_CANCEL'};
	const procType = procTypeList[$(e.target).attr('id')];
	const checkItem =  AUIGrid.getCheckedRowItems('#grid_wrap').map((row)=>{return {...row.item , stockInType:row.item.stockInType.replace(':발주처미입고','')}}); //위탁:발주처미입고타입을 위탁으로 간주시켜줌 
	
	if(!checkItemVerification({procType,checkItem})) return;
	
	const paramsObject = {	
							procType ,  // 처리 or 처리취소 or 요청취소
							checkItem ,  // 그리드상에 체크된 아이템 
							stockInType : (procType == 'PROC'? checkItem[0].stockInType:'')  // 처리의 경우에만 사용하며 선택한 체크 아이템의 투입유형(복수선택시 checkItemVerification에서 막음)
						 };
 
	
	
	if(procType != 'PROC') //처리취소나 요청취소의 경우 따로 창 뜨고 처리
		stockInReqProc(paramsObject);
	else if(paramsObject.stockInType == '위탁')  // 위탁인 경우에도 위탁사의 출고대기창고와 연계이므로 따로 창안뜸
		stockInReqProc(paramsObject);
	else  //이외의 경우엔 자신의 랙중에 해당하는 타입과 같은 리스트의 랙 중에 선택해서 처리
		rackFinderPopupOpen(paramsObject) 

})

//체크된 요청 검증 , 검증후 정상이면 true반환
function checkItemVerification({procType,checkItem})
{ 
	if(checkItem.length ==0)
	{
		alert('체크된 요청이 없습니다.');
		return false;
	}
	
	const stepString = procType == 'PROC'? '처리' :
					   procType == 'PROC_CANCEL' ? '요청' : '처리';
	if(checkItem.find((row)=>row.step==stepString))
	{
		alert(`${stepString}상태의 재고투입요청을 체크하셨습니다.`);
		return false;
	}
	
	if(procType == 'REQ_CANCEL' && checkItem.find((row)=>isNaN(row.idx)))
	{
		alert('반출요청의 재고투입요청은 요청취소가 불가능합니다');
		return false;
	}
	
	//if()
	
	//처리버튼이벤트에서 투입유형이 복수의 종류가 들어올경우
	if(procType == 'PROC' && Array.from(new Set(checkItem.map(r=>r.stockInType))).length > 1)
	{
		alert('투입유형이 다른 요청을 한번에 처리할수 없습니다');
		return false;
	}
	
	return true;
}

//적재,분실,불량,폐기일떄 랙찾기용 그리드 생성
function rackFinderGridCreate()
{
	const itemFindercolumnLayout = [		  
		{ dataField : "storageCode", headerText : "창고코드", width: 100, editable : true  }
		,{ dataField : "storageName", headerText : "창고명", editable : true  }
		,{ dataField : "rackCode", headerText : "랙코드", width: 100, editable : true  }
		,{ dataField : "rackName", headerText : "랙명",  editable : true  }
	];
	

	// 그리드 속성 설정
	const itemFindergridPros = {
		editable : true,			
		// singleRow 선택모드
		selectionMode: "multipleCells",
		rowIdField: "rackCode",
		showRowCheckColumn: true, //체크박스 표시 설정
 
	};
 
	 AUIGrid.create("#grid_wrap_rackfinder", itemFindercolumnLayout, itemFindergridPros);
 	
}

//적재,분실,불량,폐기일떄 랙찾기용 팝업 오픈용
function rackFinderPopupOpen(params)
{
	const {  stockInType } = params;
	if(!AUIGrid.isCreated('#grid_wrap_rackfinder'))
	{
		rackFinderGridCreate();
	}
	AUIGrid.resize("#grid_wrap_rackfinder");
	AUIGrid.clearGridData('#grid_wrap_rackfinder')
	
 	const dialogRackfinder = $( "#dialog-form-rackfinder" ).dialog({
		height: 300,
		width: 920,
		modal: true,
		headerHeight: 40, 
		buttons: {
			"확인": function(event) {
				const checkRack = AUIGrid.getCheckedRowItems('#grid_wrap_rackfinder');
				if(checkRack.length ==0)
				{
					alert(`${stockInType}처리: 이동될 랙을 선택해주세요.`);
					return;
				}
				
				if(checkRack.length>1)
				{
					alert(`${stockInType}처리: 이동될 랙은 하나만 선택 가능합니다`);
					return;
				}
				dialogRackfinder.dialog('close');
				stockInReqProc({...params , stockInProcRack : checkRack[0].item.rackCode});
			},
			"취소": function (event) {
				dialogRackfinder.dialog('close');
			}
		},
		open: ()=>{
			findRackList(params.stockInType);
		}
	});	 
	dialogRackfinder.dialog("open");	 
}
 

//적재,분실,불량,폐기일떄 랙찾기용 그리드 데이터 조회
function findRackList(stockInType)
{
	
	$.ajax({
		type: "POST",
		url: "/base/rack-list",
		dataType: "json",
		data: {
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(result) {
			const typeFilter = stockInType == '적재' ? ['신품','중고','리퍼'] : [stockInType]; // 적재면 신품중고리퍼가 들어있는 배열, 이외엔 자기 자신이 들어있는 배열을 저장
			const targetRack = result.rackList.filter(r=>r.rlStandByYN != 'Y' && typeFilter.includes(r.storType));
			
			AUIGrid.setGridData('#grid_wrap_rackfinder',targetRack);
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