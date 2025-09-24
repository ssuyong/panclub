
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID3;
var myGridIDItem;
var myGridIDCust;
var myGridIDCustMgr;

var divList = ["일반", "배송대행", "직수령"]; //2023.09.01 bk deliveryType
let logisCodeList = [];


// 현재 선택된 주문처의 할인을이 담기는 리스트 getCustSaleDcRateList로 갱신
// 주문목록 , 견적 , 주문요청에서 넘어올때 한번 호출 
let custSaleDcRateList = []; 
let curCustCode ='';
// 차량번호 기 견적 체크
let carNo = document.querySelector("#carNo");
carNo.addEventListener("blur", e => {
		if(carNo.value !== ""){
		findDataToServer("/order/order-group-list");		}
});

/*
function closePop() { 
	document.getElementById("popup_layer").style.display = "none";
}

function openPop(){
	document.getElementById("popup_layer").style.display = "block";
}
*/


function openOrderGroupDialog() {

	var OrderGroupDialog;
	OrderGroupDialog = $("#dialog-form-orderGroup").dialog({
		//autoOpen: false,
		height: 400,
		//minWidth: 500,
		width: "40%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		 position: { my: "center", at: "center", of: window },
		buttons: {
		},
		close: function() {

		}
	});

	OrderGroupDialog.dialog("open");

	createOrderGroupGrid();

	findDataToServer("/order/order-group-list")
}


function createOrderGroupGrid() {
             
	var columnLayout = [ 
	  { dataField : "orderGroupId",    headerText : "주문그룹ID"}
	 ,{ dataField : "orderYmd",    headerText : "주문일자"} 
	 ,{ dataField : "orderStatus",      headerText : "진행상태" ,visible: false}
	,{ dataField : "orderNo",   headerText : "주문번호",visible: false} 
	,{ dataField : "custCode",     headerText : "주문처코드"  ,visible: false}
	,{ dataField : "custName",     headerText : "주문처명"  }
	,{ dataField : "supplyCustCode",   headerText : "납품처코드" ,visible: false }
	,{ dataField : "supplyCustName",   headerText : "납품처명" ,visible: false }
	,{ dataField : "carNo",   headerText : "차번" }
	,{ dataField : "makerCode",      headerText : "제조사명"}
	,{ dataField : "carType",      headerText : "차종" }
	,{ dataField : "regUserName",      headerText : "등록자" ,visible: false    }
	,{ dataField : "sumPrice",      headerText : "합계금액",formatString: "#,##0"  , style:"right" ,visible: false}
	,{ dataField : "salePrice",      headerText : "공급가액",formatString: "#,##0"  , style:"right",visible: false}
	,{ dataField : "taxPrice",      headerText : "세액",formatString: "#,##0"  , style:"right",visible: false}
	,{ dataField : "itemCnt",      headerText : "품목수",visible: false}
	,{ dataField : "expectMarginRate",      headerText : "예상마진율",visible: false}
	,{ dataField : "uptUserName",      headerText : "수정자",visible: false}
	,{ dataField : "uptYmd",      headerText : "수정일자",visible: false}
	,{ dataField : "claimYN",      headerText : "청구여부",visible: false}
	,{ dataField : "collectYN",      headerText : "수금여부",visible: false}
				
];
 

	var auiGridProps = {

		usePaging: true,
		pageRowCount: 50,
		showPageRowSelect: true,

		//showStateColumn: true,
		selectionMode: "multipleCells",
	};

	// 체크박스 칼럼 렌더러 표시 설정
	auiGridProps.showRowCheckColumn = true;

	//auiGridProps.showStateColumn = true;

	// 체크박스 대신 라디오버튼 출력함
	auiGridProps.rowCheckToRadio = true;
	showAutoNoDataMessage: false,

	myGridID3 = AUIGrid.create("#grid_wrap_orderGroup", columnLayout, auiGridProps);

	var rowPos = 'first';



	AUIGrid.bind(myGridID3, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});


	var currentPage = 1;
	AUIGrid.bind(myGridID3, "pageChange", function(event) {
		currentPage = event.currentPage;
	});
}





// 차량번호가 같은 견적 찾기  => supi -> 차량벙보에 차번 입력후 작성중인 주문이 있습니다 확인하세요에서 보기 클릭시 호출되는 통신 같은 차번 리스트 불러오는듯
function findDataToServer(url) {
	
	var list = [];
	var carNo  = $("#carNo").val();
	var sYmd = $("#sYmd").val();
	var eYmd = $("#eYmd").val();  
    var ymdIgnoreYN = "Y";
	//if (spaceDel(estiNo)=='' && spaceDel(itemName)=='') {
	//	alert("부품번호 또는 부품명에 검색어를 입력하세요.");
	//	return false;
	//}

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"carNo":carNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderGroupList.length == 0){
				$("#existOrderNoti").css("display","none");	
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","none");							
			}else{
				$("#existOrderNoti").css("display","inline");	
					var orderStatus= '';
				for(i=0;i<data.orderGroupList.length;i++){
					//console.log("data 22222222"+JSON.stringify(data));
				
					 orderStatus= '';
					if (data.orderGroupList[i].claimYN =="Y" && data.orderGroupList[i].collectYN =="N" ){
						 orderStatus = '청구완료'
					}if(data.orderGroupList[i].claimYN =="Y" && data.orderGroupList[i].collectYN =="Y"){
						orderStatus = '수금완료'
					} if (data.orderGroupList[i].claimYN =="N" && data.orderGroupList[i].collectYN =="N"){
						 orderStatus = '진행중'
					}else		{
						 orderStatus = '진행중'
					};				
					//console.log("111111111"+data.orderGroupList[i].supplyCustCode.length);
					if (data.orderGroupList[i].supplyCustCode.length>0 ){
						 click_orderType(2);
					}
				 /* if (data.orderList[i].orderType == 1) {
					 click_orderType(1);
					} else if (data.orderList[i].orderType == 2) {
					 click_orderType(2);
					};
					*/
					//console.log("orderStatus : " + orderStatus);		
				
					list.push({
						 orderGroupId: data.orderGroupList[i].orderGroupId 
						,orderYmd: data.orderGroupList[i].orderYmd 
						,orderStatus: orderStatus 
						,orderNo: data.orderGroupList[i].orderNo 
						,custCode: data.orderGroupList[i].custCode
						,custName: data.orderGroupList[i].custName
						,custMgrName:data.orderGroupList[i].custMgrName
						,custMgrPhone:data.orderGroupList[i].custMgrPhone
						,supplyCustMgrName:data.orderGroupList[i].supplyCustMgrName
						,supplyCustMgrPhone:data.orderGroupList[i].supplyCustMgrPhone
						,supplyCustCode: data.orderGroupList[i].supplyCustCode 
						,supplyCustName: data.orderGroupList[i].supplyCustName
						,carNo: data.orderGroupList[i].carNo 
						,colorCode: data.orderGroupList[i].colorCode 
						,vinNo: data.orderGroupList[i].vinNo
						,memo1:data.orderGroupList[i].memo1
						,memo2:data.orderGroupList[i].memo2
						,makerCode: data.orderGroupList[i].makerCode 
						,carType: data.orderGroupList[i].carType 
						,regUserName: data.orderGroupList[i].regUserName
						,dcRate:data.orderGroupList[i].dcRate
						,dcDspType:data.orderGroupList[i].dcDspType
						,sumPrice: data.orderGroupList[i].sumPrice 
						,salePrice: data.orderGroupList[i].salePrice 
						,taxPrice: data.orderGroupList[i].taxPrice 
						,itemCnt: data.orderGroupList[i].itemCnt 
						,expectMarginRate: data.orderGroupList[i].expectMarginRate 
						,uptUserName: data.orderGroupList[i].uptUserName 
						,uptYmd: data.orderGroupList[i].uptYmd
						,claimYN: data.orderGroupList[i].claimYN
						,collectYN: data.orderGroupList[i].collectYN
						,insure1Code: data.orderGroupList[i].insure1Code
						,insure1Name: data.orderGroupList[i].insure1Name
						,insure1MgrName: data.orderGroupList[i].insure1MgrName
						,insure1MgrPhone: data.orderGroupList[i].insure1MgrPhone
						,insure2Code: data.orderGroupList[i].insure2Code
						,insure2Name: data.orderGroupList[i].insure2Name
						,insure2MgrName: data.orderGroupList[i].insure2MgrName
						,insure2MgrPhone: data.orderGroupList[i].insure2MgrPhone
						
						,insure1AcceptNo: data.orderGroupList[i].insure1AcceptNo
						,insure1AcciRate: data.orderGroupList[i].insure1AcciRate
						,insure2AcceptNo: data.orderGroupList[i].insure2AcceptNo
						,insure2AcciRate: data.orderGroupList[i].insure2AcciRate
	
						,branchCode: data.orderGroupList[i].branchCode
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}		
				 AUIGrid.setGridData("#grid_wrap_orderGroup", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
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



//주문그룹 선택 시  기존 주문번호 끌고오기  
function getCheckedRowItems() {
	
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID3);
	
	if (checkedItems.length <= 0) {
		alert("주문그룹을 선택해주세요");
		return;
	}
	var rowItem = checkedItems[0].item;
	//console.log("item11111111"+JSON.stringify(checkedItems[0].item));
	
	$("#orderGroupId").val(rowItem.orderGroupId);
	$("#custCode").val(rowItem.custCode);
	$("#custName").val(rowItem.custName);
	$("#supplyCustCode").val(rowItem.supplyCustCode);
	$("#supplyCustName").val(rowItem.supplyCustName);
	$("#supplyCustName").val(rowItem.supplyCustName);
	$("#makerCode").val(rowItem.makerCode);
	$("#carType").val(rowItem.carType);
	$("#vinNo").val(rowItem.vinNo);
	$("#dcRate").val(rowItem.dcRate);
	$("#colorCode").val(rowItem.colorCode);
	
	$("#custMgrName").val(rowItem.custMgrName);
	$("#custMgrPhone").val(rowItem.custMgrPhone);
	$("#supplyMgrPhone").val(rowItem.supplyMgrPhone);
	$("#supplyMgrName").val(rowItem.supplyCustName);
	
	$("#memo1").val(rowItem.memo1);
	$("#memo2").val(rowItem.memo2);
	
	$("#insure1Code").val(rowItem.insure1Code);
	$("#insure1Name").val(rowItem.insure1Name);
	$("#insure1MgrName").val(rowItem.insure1MgrName);
	$("#insure1MgrPhone").val(rowItem.insure1MgrPhone);
	$("#insure2Code").val(rowItem.insure2Code);
	$("#insure2Name").val(rowItem.insure2Name);
	$("#insure2MgrName").val(rowItem.insure2MgrName);
	$("#insure2MgrPhone").val(rowItem.insure2MgrPhone);
	
	$("#insure1AcceptNo").val(rowItem.insure1AcceptNo);
	$("#insure1AcciRate").val(rowItem.insure1AcciRate);
	$("#insure2AcceptNo").val(rowItem.insure2AcceptNo);
	$("#insure2AcciRate").val(rowItem.insure2AcciRate);
	
	$("#branchCode").val(rowItem.branchCode);
	          
	
}


	$("#btnCloseDialog").click(function() {

		$("#dialog-form-orderGroup").dialog("close");
	});

	$("#btnNewDialog").click(function() {

		$("#dialog-form-orderGroup").dialog("close");
	});

	$("#btnRegDialog").click(function() {
		getCheckedRowItems();
		$("#dialog-form-orderGroup").dialog("close");
		$("#existOrderNoti").css("display","none");	
	});
	
	
	
	
	
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){
	
	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	//관리지점코드에 셋팅
  	branchCodeSelect("/base/code-list")
	//제조사코드에 셋팅
  	makerCodeSelect("/base/code-list")
  	
  	
	//등록버튼 활성화, 수정/삭제 활성화
	//document.getElementById('btnUpt').classList.toggle('disabled'); 
	//document.getElementById('btnDel').classList.toggle('disabled');
					
	/*				
	//아이템팝업
	var dialogItem;
	dialogItem = $( "#dialog-form" ).dialog({
	   // autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "80%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogItem.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});	


	//거래처팝업
	var dialogCust;
	dialogCust = $( "#dialog-form" ).dialog({
	    autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "80%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogCust.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});	
	
	//거래처담당자팝업
	var dialogCustMgr;
	dialogCustMgr = $( "#dialog-form" ).dialog({
	    autoOpen: false,
	    height: 500,
	    //minWidth: 500,
	    width: "80%",
	    modal: true,
	    headerHeight: 40,
		position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		buttons: {
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogCustMgr.dialog("close");
			}
		},
	    close: function() {
	      $( "#users tbody tr td" ).empty();	   	
	    }
	});		
	*/	
	// AUIGrid 그리드를 생성합니다.
	logisCodeListFind();
	createAUIGrid();	

	$("#btnReg").click(function(){
		//alert("등록버튼");
		//fn_delBlankRowAll(myGridID, "itemId");  //itemId가 공백인것은 상태값 초기화하여 저장안되게 처리.
		
//		//fn_dcProc();
		order_dcProc();
		this.blur(); 
		updateDataToServer("/order/orderAdd", "ADD");
	});
	$("#btnUpt").click(function(){
		//alert("등록버튼");
		//fn_delBlankRowAll(myGridID, "itemId");  //itemId가 공백인것은 상태값 초기화하여 저장안되게 처리.
	
//		fn_dcProc();
		order_dcProc();
		this.blur(); 
		updateDataToServer("/order/orderAdd", "UPT");
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.주문을 삭제하시겠습니까?")){
			this.blur(); 
			updateDataToServer("/order/orderAdd", "DEL");
		}
	});

	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("./data/normal_500.json");

	$("input:radio[name=dcDspType]").click(function(){
        //fn_dcProc();
	});
		
	//목록에서 넘어오는 경우
	let orderNo = $("#orderNo").val();	
	if (orderNo !=''){
		//alert("custcode:"+custCode);
		findOrder('/order/order-list');
	}	  
	
	//견적에서 넘어오는 경우
	let estiNo = $("#estiNo").val();	
	if (estiNo !=''){
		//alert("custcode:"+custCode);
		findEsti('/order/esti-list');
	}	
	
	//주문요청에서 넘어오는 경우 
	let pcReqNo = $("#pcReqNo").val();	
	if (pcReqNo !=''){
		//alert("custcode:"+custCode);
		findPcReq('/order/pc-req-list');
	}  
	
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 50, editable : false , visible : false }
	    ,{ dataField : "dspNo",      headerText : "노출<br>순서", width : 56 , style : "auigrid-opt-col-style"}	 
		,{ dataField : "orderSeq",      headerText : "주문<br>순번", width : 56, editable : false , dataType: "numeric"}
		,{ dataField : "className",      headerText : "구분", width : 80, editable : false }
		,{ dataField : "itemId",      headerText : "부품ID", width : 100, editable : false }
		,{ dataField : "makerName",      headerText : "제조사", width : 50, editable : false  } //2023.10.17
		,{ dataField : "itemNo",      headerText : "품번", width : 100, style:"auigrid-must-col-style"
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
			}    
		 } 
		
		//,{ dataField : "itemName", headerText : "품명", width: 160, editable : false , style:"left"   } 
		,{ dataField : "itemName", headerText : "품명", width: 160,  style:"left auigrid-opt-col-style"    } 
		//,{ dataField : "itemNameEn", headerText : "영문품명", width: 120, editable : false  }
		,{ dataField: "dcExceptYN", headerText: "할인제외", width: 56, editable: false , visible : false }
		,{ dataField : "cnt",      headerText : "수량", width : 56 , dataType: "numeric",formatString: "#,##0"  , style:"right  auigrid-must-col-style"
			,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18		}	  }
		,{ dataField : "centerPrice",     headerText : "센터가", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		,{ dataField : "unitPrice",     headerText : "단가", dataType: "numeric",formatString: "#,##0"  , style:"right  auigrid-must-col-style"
			,editRenderer : { 	type: "InputEditRenderer",	 	onlyNumeric: true,		 	maxlength: 18	,allowNegative         : true   	}	     
		 }
		
		,{ dataField : "salePrice",     headerText : "할인단가", dataType: "numeric",formatString: "#,##0"  , style:"right" , editable : false }
		 ,{ dataField : "curSaleRate",      headerText : "할인율",width: 50,postfix: "%"  ,editable: false ,  style:"right"  }
		,{ dataField : "taxPrice",     headerText : "세액", editable : false , dataType: "numeric",formatString: "#,##0" , style:"right" }
		,{ dataField : "sumPrice",     headerText : "합계", editable : false , dataType: "numeric",formatString: "#,##0" , style:"right" }
		//,{ dataField : "supplyPrice",     headerText : "납품단가" }
		//,{ dataField : "supplySumPrice",     headerText : "납품액" }
		,{ dataField : "importPrice",     headerText : "수입가", style : "auigrid-opt-col-style", visible : false }
		,{ dataField : "ceilUnit",     headerText : "올림단위", width: 56, dataType: "numeric",formatString: "#,##0" , style:"right", editable : false }
		,{ dataField : "placeImportCnt",     headerText : "수입수량" ,width :60 , style:'right'}
		 , { dataField: "factoryNo", headerText: "공장품번", width: 120 } 
		,{ dataField : "memo",     headerText : "비고" , style:"left auigrid-opt-col-style"  }
		 ,{ dataField: "dlvType", headerText: "배송유형",  width: 100, 
				renderer:{
				type: "DropDownListRenderer",
				list: divList
				}}
		,{ dataField : "orderReqPlaceCust", headerText : "요청발주처", width: 150,  style:"left auigrid-opt-col-style"    } 
		,{ headerText : "발주예상", 
			children: [
				 { dataField : "placeCustCode",     headerText : "코드", style : "auigrid-opt-col-style"  }
				,{ dataField : "placeCustName",      headerText : "업체명"  , style:"left auigrid-opt-col-style"   ,editable : true
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
		
							$("#grid-custCode1").val("placeCustCode");
							$("#grid-custName1").val("placeCustName");
							var dialogCust;
							dialogCust = $( "#dialog-form-cust" ).dialog({
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
										updateGridRowCust("placeCustCode", "placeCustName", 'Y');
									},
									"취소": function (event) {
										dialogCust.dialog("close");
									}
								},
							    close: function() {
							     // $( "#users tbody tr td" ).empty();	   	
							    }
							});	
							createGridCust(columnLayoutCust,'','','Y'); // 2023.07.24 hsg  - onGrid=Y
							//createGridCust(columnLayoutCust)
							dialogCust.dialog("open");
						}
				
				 	}
				 } 
				,{ dataField : "placeUnitPrice",      headerText : "단가", dataType: "numeric",formatString: "#,##0"   , style:"right auigrid-opt-col-style"    }
	        ]
	    }    
		,{ headerText : "실제발주", 
			children: [
				 { dataField : "plCustCode",     headerText : "코드", editable : false }
				,{ dataField : "plCustName",      headerText : "업체명"  , style:"left " , editable : false  }
				,{ dataField : "plUnitPrice",      headerText : "단가", dataType: "numeric",formatString: "#,##0" , editable : false   , style:"right"  }
			]   },
		{
		     dataField : "rcvlogisCode",
		     headerText : "수령물류센터",
		     width : 100,
		     renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
		            type : "DropDownListRenderer",
		            list :logisCodeList
		      }
		}   						
		,{ dataField : "estiNo",      headerText : "견적번호" , editable : false ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}   }
		,{ dataField : "estiSeq",      headerText : "견적순번", editable : false     }
		,{ dataField : "pcReqNo",      headerText : "주문요청번호" , editable : false ,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}   }
		,{ dataField : "reqSeq",      headerText : "요청순번", editable : false     }
		,{ dataField : "otherSaleType",      headerText : "다른할인율적용", editable : false  , visible : false   }
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
	},{
		dataField: "salePrice",
		positionField: "salePrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "sumPrice",
		positionField: "sumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "supplyPrice",
		positionField: "supplyPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "supplySumPrice",
		positionField: "supplySumPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}, {
		dataField: "inPrice",
		positionField: "inPrice",
		operation: "SUM",
		formatString: "#,##0"
		,style: "right"
	}];
	
	// 그리드 속성 설정
	var gridPros = {

		editable : true,			
		// singleRow 선택모드
		selectionMode: "multiRow",
		
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		enableDrag: true,
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		enableMultipleDrag: true,
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		enableDragByCellDrag: false,
		// 드랍 가능 여부 (기본값 : true)
		enableDrop: true,
		
		// 상태 칼럼 사용
		showStateColumn : true,
		rowIdField: "idx",
		showRowCheckColumn: false,

		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
		enterKeyColumnBase: false,

		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// 엑스트라 체크박스 표시 설정
		showRowCheckColumn: true,

		// 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
		enableRowCheckShiftKey: true,

		// 전체 체크박스 표시 설정
		showRowAllCheckBox: true,
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		
		//footer 노출
		showFooter: true,

		// 엑스트라 체크박스 체커블 함수
		// 이 함수는 사용자가 체크박스를 클릭 할 때 1번 호출됩니다.
		rowCheckableFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 사용자 체크 못하게 함.
				return false;
			}
			return true;
		},

		// 엑스트라 체크박스 disabled 함수
		// 이 함수는 렌더링 시 빈번히 호출됩니다. 무리한 DOM 작업 하지 마십시오. (성능에 영향을 미침)
		// rowCheckDisabledFunction 이 아래와 같이 간단한 로직이라면, 실제로 rowCheckableFunction 정의가 필요 없습니다.
		// rowCheckDisabledFunction 으로 비활성화된 체크박스는 체크 반응이 일어나지 않습니다.(rowCheckableFunction 불필요)
		rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
			if (item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return false; // false 반환하면 disabled 처리됨
			}
			return true;
		}		
	};

	
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	addRow(myGridID,'last');  //첫행 자동 추가  
	// 푸터 레이아웃 세팅
	AUIGrid.setFooter(myGridID, footerLayout);

	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	//AUIGrid.bind(myGridID, "cellEditBegin", auiCellEditingBeginHandler);
			
	// 에디팅 정상 종료 이벤트 바인딩 : 품번입력 완료 후 엔터키 치는 경우
	AUIGrid.bind(myGridID, "cellEditEnd", auiCellEditingHandler);


	/*
	// 그리드 ready 이벤트 바인딩
	AUIGrid.bind(myGridID, "ready", function(event) {
		// ready 이벤트를 바인딩하여 데이터에 맞게 초기 화면설정 작업을 하십시오.
		console.log("aa");
	});
	*/

	// 셀 선택변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		//var primeCell = event.primeCell; 
		//console.log("현재 셀 : ( " + primeCell.rowIndex + ", " + primeCell.headerText + " ), 값 : " + primeCell.value);
		var allItems = AUIGrid.getGridData(myGridID);
       	AUIGrid.removeRow(myGridID, allItems .length+1);
       	//fn_dcProc();
       	order_dcProc();
    	// console.log(5);
	});
		
	//품번 붙여넣기 완료한 경우. 
	//품번 붙여넣기 완료한 경우. 
	AUIGrid.bind(myGridID, "pasteEnd", function(event,a) {
		 
//		if(AUIGrid.getSelectedIndex(myGridID)[1] == 5)
//		{
//			

 
// 붙여넣기시 사라지는 이슈로 수정 20240718 supi
/** 
			AUIGrid.setSelectionByIndex(0, 0); // 0, 0 으로 선택자 이동시킴.
	 	
	     	var allItems = AUIGrid.getGridData(myGridID);
			var rowIdField = AUIGrid.getProp(myGridID, "rowIdField");
			var rowId;
			var j=0;
			var rowIndexes = [];
	
			for (var i = 0, len = allItems .length; i < len; i++) {
				rowItem = allItems[i];
				rowId = rowItem[rowIdField];
				itemNo = AUIGrid.getCellValue(myGridID, i, "itemNo");
				itemId = AUIGrid.getCellValue(myGridID, i, "itemId");
				dspNo  = AUIGrid.getCellValue(myGridID, i, "dspNo");
				makerName  = AUIGrid.getCellValue(myGridID, i, "makerName");
				//console.log("itemId:"+itemId);
				//console.log("itemNo:"+itemNo);
//				if ( dspNo === undefined || dspNo == '' ){  //상품ID 존재하는 경우만. 이게 원본
				if ( (itemId == null || itemId == '')   ){  // dspNo가 0인경우도 id로 체크로 변경(20240624 supi)
					rowIndexes[j] = i;
					j = j + 1; 
				}
			
			}
			AUIGrid.removeRow(myGridID, rowIndexes); //2023.07.03 comment. ctrl+v 시 row삭제오류 ->다시 원복			
 */				
			
			//fn_dcProc();
			
	
			const gridData =  AUIGrid.getGridData(myGridID);
			for(const index in gridData)
			{
				const stateCache = AUIGrid.getStateCache(myGridID).cache[gridData[index].idx];
				 
				if((gridData[index].itemNo) && (stateCache?._$added || stateCache?._$editedOrgValueCache?.itemNo)) //추가됬거나 품번이 수정되면서 품번이 있을떄만
				{
					
					$("#srchEqualItemNo").val(gridData[index].itemNo); 
					$("#pop_itemNo").val(gridData[index].itemNo);
					$("#pop_itemName").val(''); 
					findItem('/base/item-list', 0,index,'','N');
					AUIGrid.updateRow(myGridID, {orderSeq : gridData[index]?.orderSeq}, index);
				} 
			}
			
			const selectIndex = AUIGrid.getSelectedIndex(myGridID);
		//	addRow(myGridID,'last');  //부품찾은 후 행추가
			order_dcProc();
			AUIGrid.setSelectionByIndex(myGridID , selectIndex[0], selectIndex[1]);
	
	 
	 

//		}
	});
	
	// 드랍 종료 이벤트 바인딩
	AUIGrid.bind(myGridID, "dropEnd", function (e) {
		// 정보 출력
		//var direction = e.direction == true ? "위에서 아래로" : "아래에서 위로";
		//var msg = "드랍 완료 : " + e.fromRowIndex + "→" + e.toRowIndex + " 에 " + e.items.length + " 행(들) 드랍 됨(진행 방향 : " + direction + ")";
		//document.getElementById("ellapse_e").innerHTML = msg;
		//console.log("index:"+e.toRowIndex);
		var item = { dspNo : e.toRowIndex + 1}; 
  		
		AUIGrid.updateRow(myGridID, item, e.toRowIndex);
					
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
        	//console.log("state remove:"+event.rowIndex);
         //	fn_dcProc("remove",event.rowIndex);
       		order_dcProc();
            //if("수정 취소 즉, 원래 값으로 복구 하시겠습니까?") {
            //    return true;
            // } 
            // return false;
         }
  	});
  	
  	AUIGrid.bind(myGridID, "cellDoubleClick", function( event ) {
      if (event.dataField == 'itemNo'){
		//console.log("rowInx:"+event.rowIndex)
		//console.log("handel 2");
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		findItem('/base/item-list', 0,event.rowIndex,'','Y');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		
		//console.log("dd:"+2);
	   // fn_dcProc();
	      order_dcProc();
	   // addRow(myGridID,'last');  //부품찾은 후 행추가
	             	
	   }
	    if (event.dataField == 'estiNo'){
		let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'estiNo');
		    obj.setAttribute('value', event.value);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/esti-up');
		    document.body.appendChild(f);
		    f.submit();
		
		}
		 if (event.dataField == 'pcReqNo'){
			var pcReqNo = event.item.pcReqNo;
			$.fancybox.open({
			  href : '/order/pc-req-item-list?pcReqNo='+pcReqNo     , // 불러 올 주소
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
  
	// keyDown 이벤트 바인딩
	AUIGrid.bind(myGridID, "keyDown", function (event) {
		if (event.keyCode == 45) { // Insert 키
			return false; // 기본 행위 안함.
		}
	});	
	
};

function auiCellEditingHandler(event) {
	
	if (event.dataField == 'itemNo'){
		setStartSpinner();
		$("#srchEqualItemNo").val(event.value); 
		$("#pop_itemNo").val(event.value);
		$("#pop_itemName").val();
		if(event.which != "clipboard")
		{
		 
			addRow(myGridID,'last');  //부품찾은 후 행추가
			findItem('/base/item-list', 0,event.rowIndex,'','Y');
			 
		}
		else 
		{
			findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이	
		}	
	   // fn_dcProc();
	    order_dcProc();
		setStopSpinner();
	    
	}else if (event.dataField == 'cnt' || event.dataField == 'unitPrice' || event.dataField == 'salePrice') {
		//console.log("cnt:"+event.item.cnt);
		//console.log("salePrice:"+event.item.salePrice);
		//console.log("salePrice:"+event.item.salePrice);
	//	fn_dcProc();
		order_dcProc();
		//sumPrice = event.item.cnt * event.item.salePrice;
	//	console.log('d');
		//AUIGrid.updateRow(myGridID, { "sumPrice": sumPrice }, event.rowIndex);			
	}
	
		//이겅
	if (event.dataField == 'placeCustName'){
		//setStartSpinner();
		//$("#srchEqualItemNo").val(event.value); 
		//$("#pop_cust_srch").val(event.value);
		//$("#pop_itemName").val();
		//ddRow(myGridID,'last');  //부품찾은 후 행추가
		//createGridCust(columnLayoutCust, obj, name);
		$("#grid-custCode1").val("placeCustCode");
		$("#grid-custName1").val("placeCustName");
		order_dcProc();
		//findCust(this,'',0,'Y');
		findCust(event,'',0,'','Y');
		//addRow(myGridID, "last")
		//findItem('/base/item-list', 0,event.rowIndex,'','N');  //품목을 찾아서 상품아이디 품명 등을 디스플레이		
	    //fn_dcProc();
		//setStopSpinner();
	    
	}
	
	

	/*
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 종료(cellEditEnd) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
		
		if (event.dataField == 'itemNo'){ 
			$("#pop_itemNo").val(event.value);
			$("#pop_itemName").val();
			findItem('/base/item-list');  //품목을 찾아서 상품아이디 품명 등을 디스플레이
		}		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
	*/
};
	
		
// 에디팅 시작 시 해당 행 인덱스 보관
var currentRowIndex;


// 행 추가, 삽입
function addRow(grid,rowPos) {
	var item = new Object();
	var gridData = AUIGrid.getGridData(myGridID);
	
    item.dspNo = gridData.length+1;
	/*
	item.idx = '',
	item.mgrIdx = '', 
	item.name = '', 
	item.position = '', 
	item.role = '', 
	item.phone1 = '', 
	item.phone2 = '', 
	item.email = '', 
	item.validYN = ''
	*/
	
	// parameter
	// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
	// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
	//AUIGrid.addRow(myGridID, item, rowPos);
	AUIGrid.addRow(myGridID, item, rowPos);	
	
	
};


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	setStartSpinner();
	document.getElementById('btnReg').classList.toggle('disabled');
	var orderGroupId = $("#orderGroupId").val();
	var orderNo = $("#orderNo").val();  
    var orderType = $(':radio[name="orderType"]:checked').val();
    var custCode = $("#custCode").val(); 
    var custMgrName = $("#custMgrName").val(); 
    var custMgrPhone = $("#custMgrPhone").val(); 
    var supplyCustCode = $("#supplyCustCode").val(); 
    var supplyCustMgrName = $("#supplyCustMgrName").val(); 
    var supplyCustMgrPhone = $("#supplyCustMgrPhone").val(); 
    var carNo = $("#carNo").val(); 
    var vinNo = $("#vinNo").val(); 
    var makerCode = $("#makerCode").val(); 
    var colorCode = $("#colorCode").val(); 
    var carType = $("#carType").val(); 
    var dcRate = $("#dcRate").val(); 
    var dcDspType =  $(':radio[name="dcDspType"]:checked').val();
    var agencyFeeRate = $("#agencyFeeRate").val(); 
    var marginRate = $("#marginRate").val(); 
    var memo1 = $("#memo1").val(); 
    var memo2 = $("#memo2").val(); 
    
    var insure1Code = $("#insure1Code").val();
    var insure1MgrName = $("#insure1MgrName").val();
    var insure1MgrPhone = $("#insure1MgrPhone").val();
    var insure2Code = $("#insure2Code").val();
    var insure2MgrName = $("#insure2MgrName").val();
    var insure2MgrPhone = $("#insure2MgrPhone").val();
 
    var insure1AcceptNo = $("#insure1AcceptNo").val(); 
    var insure1AcciRate = $("#insure1AcciRate").val();
    var insure2AcceptNo = $("#insure2AcceptNo").val(); 
    var insure2AcciRate = $("#insure2AcciRate").val();  
    
    var taxType = $("#taxType").val();
    var salePrice = $("#salePrice").val();
    var taxPrice = $("#taxPrice").val();
    var sumPriceKor = $("#sumPriceKor").val();
   
   	var branchCode = $("#branchCode").val(); 
 
	if ((branchCode == '' || branchCode == '' ) && $("#branchCode option").size() > 1  && workingType != 'DEL') {  //추가된 관리지점 셀렉트박스 갯수가 1개 이상인데 미입력시 진행 안되도록.(초기 1개있으므로 1개이상 추가될경우 2개이상)
 		
 		alert("관리지점을 선택해주세요")
 		document.getElementById('btnReg').classList.toggle('disabled');
 		setStopSpinner();
 		$("#branchCode").focus();
 		return;
//		if (!confirm("관리지점이 선택되지 않았습니다. 등록하시겠습니까?")){
//			document.getElementById('btnReg').classList.toggle('disabled');
//			setStopSpinner();	$("#branchCode").focus();		return;
//		}	
	} 
	
    //필수값 체크
    var custName = $("#custName").val();  
    var pcYN = $("#pcYN").val();  //주문요청에서 넘어왔는지 bk 
    var insure1Fax = $("#insure1MgrFax").val();  //보험사 팩스 bk 
    var insure2Fax = $("#insure2MgrFax").val();  //보험사 팩스 bk 
    
  //  console.log("pcYN"+pcYN);
  //  return; 
    if (custCode == '' || custName == '' ) {
		document.getElementById('btnReg').classList.toggle('disabled');	
		setStopSpinner(); alert("주문처 거래처코드는 필수 입력해야 합니다.");		  $("#custCode").focus();		return;	
	}
	
	if ((carNo == '' || carNo == null)&& pcYN != "Y") {
		document.getElementById('btnReg').classList.toggle('disabled'); 
		setStopSpinner(); alert("차량번호는 필수 입력해야 합니다."); $("#carNo").focus(); return; 
	}

	if ((makerCode == '' || makerCode == null) && pcYN != "Y") {
		document.getElementById('btnReg').classList.toggle('disabled'); 
		setStopSpinner(); alert("차량 제조사는 필수 입력해야 합니다."); $("#makerCode").focus(); return; 
	}
			
	//if (isValid1 == false || isValidChanged1 == false) {
	if (isValidChanged1 == false) {	
		document.getElementById('btnReg').classList.toggle('disabled');
		setStopSpinner();
		return;
	}
	
	
	
	fn_delBlankRowAll(myGridID, "itemId");  //itemId가 공백인것은 상태값 초기화하여 저장안되게 처리.

	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);    
    
	//var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "saleUnitPrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 값을 직접 입력해야 합니다.");
	//var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "cnt", "saleUnitPrice"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["itemNo", "unitPrice", "cnt"], "품번, 수량, 견적단가 필드는 반드시 유효한 값을 입력해야 합니다.");
	
	
	if (!orderNo || orderNo.trim() == '') {
		if (addList.length === 0) {
			document.getElementById('btnReg').classList.toggle('disabled');
			setStopSpinner();
			alert("부품을 적어도 1개 이상 입력을 해야합니다");return;
		}
	}	
	var data = {};
	
	if(addList.length > 0) data.orderItemAdd = addList;
	else data.orderItemAdd = [];
	
	if(updateList.length > 0) data.orderItemUpdate = updateList;
	else data.orderItemUpdate = [];
	
	if(removeList.length > 0) data.orderItemRemove = removeList;
	else data.orderItemRemove = [];

    data.workingType = workingType;
    data.orderGroupId = orderGroupId;
	data.orderNo = orderNo;  
    data.orderType = orderType; 
    data.custCode = custCode; 
    data.custMgrName = custMgrName; 
    data.custMgrPhone = custMgrPhone; 
    data.supplyCustCode = supplyCustCode; 
    data.supplyMgrName = supplyCustMgrName; 
    data.supplyMgrPhone = supplyCustMgrPhone; 
    data.carNo = carNo; 
    data.vinNo = vinNo; 
    data.makerCode = makerCode; 
    data.colorCode = colorCode; 
    data.carType = carType; 
    data.dcRate = dcRate; 
    data.dcDspType = dcDspType; 
    data.agencyFeeRate = agencyFeeRate; 
    data.marginRate = marginRate; 
    data.memo1 = memo1; 
    data.memo2 = memo2;
    
    data.insure1Code = insure1Code;
    data.insure1MgrName = insure1MgrName;
    data.insure1MgrPhone = insure1MgrPhone;
    data.insure2Code = insure2Code;
    data.insure2MgrName = insure2MgrName;
    data.insure2MgrPhone = insure2MgrPhone;
 
    data.insure1AcceptNo = insure1AcceptNo; 
    data.insure1AcciRate = insure1AcciRate; 
    data.insure2AcceptNo = insure2AcceptNo; 
    data.insure2AcciRate = insure2AcciRate;
    
    salePrice = salePrice.replace(/,/gi, "");
    taxPrice = taxPrice.replace(/,/gi, "");
    
    data.taxType = taxType;
    data.salePrice = Number(salePrice);
    data.taxPrice = Number(taxPrice);
    data.sumPriceKor = sumPriceKor;
        
    data.branchCode = branchCode;   
    data.pcYN = pcYN;   
    data.insure1Fax = insure1Fax;   
    data.insure2Fax = insure2Fax;   
 
     
    //console.log("data:"+JSON.stringify(data));
  //  return;
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
			setStopSpinner();
	        //alert("성공:"+data.success);
	       // console.log("data.estiNo:"+data.estiNo);
	        alert(data.result_code+":"+data.result_msg);
	        //alert(data.estiNo)
	        //location.reload();
	        
	        //post형식으로 페이지 데이터 조회
			let f = document.createElement('form');
	    
		    let obj;
		    obj = document.createElement('input');
		    obj.setAttribute('type', 'hidden');
		    obj.setAttribute('name', 'orderNo');
		    obj.setAttribute('value', data.orderNo);
		//console.log("data.orderNo:"+data.orderNo);
		    
		    f.appendChild(obj);
		    f.setAttribute('method', 'post');
		    f.setAttribute('action', '/order/order-up');
		    document.body.appendChild(f);
		    f.submit();
		
	    },
	    error:function(request, status, error){
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
	/*
	var sel = AUIGrid.getSelectedIndex(myGridID); 
	console.log("sel:"+sel);
	if (sel == '-1,-1'){
		alert("체크박스 이외의 칼럼을 선택하고 행삭제를 클릭하세요.");
		return; 	
	}
	*/
	//var rowPos = document.getElementById("removeSelect").value;
    alert("행삭제(품목삭제)한 데이터는 [수정]버튼을 클릭해야 자료에서 완전 삭제 됩니다. ")	
    
	AUIGrid.removeRow(myGridID, "selectedIndex");
	//fn_dcProc();
	order_dcProc();
};
	

//  조회
function findOrder(url) {
	var orderNo = $("#orderNo").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"orderNo":orderNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					//console.log("data:"+JSON.stringify(data));
					//console.log("data.orderList[i].pcYN"+data.orderList[0].pcYN	)
				for(i=0;i<data.orderList.length;i++){
					
					if (data.orderList[i].orderType == 1) {
					  document.querySelector('input[name="orderType"][value="1"]').checked = true;
					    click_orderType(1);
					} else if (data.orderList[i].orderType == 2) {
					  document.querySelector('input[name="orderType"][value="2"]').checked = true;
					 click_orderType(2);
					}
					
					/*
					if (data.orderList[i].dcDspType == 1) {
					  document.querySelector('input[name="dcDspType"][value="1"]').checked = true;
					} else if (data.orderList[i].dcDspType == 2) {
					  document.querySelector('input[name="dcDspType"][value="2"]').checked = true;
					}
					*/
					
					
					
					orderGroupId = data.orderList[i].orderGroupId;
				    orderType = data.orderList[i].orderType; 
					custCode = data.orderList[i].custCode; 
					custName = data.orderList[i].custName; 
					custMgrName = data.orderList[i].custMgrName;
					custMgrPhone = data.orderList[i].custMgrPhone; 
					supplyCustCode = data.orderList[i].supplyCustCode; 
					supplyCustName = data.orderList[i].supplyCustName; 
					supplyCustMgrName = data.orderList[i].supplyMgrName; 
					supplyCustMgrPhone = data.orderList[i].supplyMgrPhone; 
					carNo = data.orderList[i].carNo; 
					vinNo = data.orderList[i].vinNo; 
					colorCode = data.orderList[i].colorCode; 
					makerCode = data.orderList[i].makerCode; 
					carType = data.orderList[i].carType; 
					dcRate = data.orderList[i].dcRate; 
					dcDspType = data.orderList[i].dcDspType; 
					agencyFeeRate = data.orderList[i].agencyFeeRate; 
					marginRate = data.orderList[i].marginRate; 
					memo1 = data.orderList[i].memo1; 
					memo2 = data.orderList[i].memo2; 
					
					insure1Code = data.orderList[i].insure1Code;
					insure1Name = data.orderList[i].insure1Name;
    				insure1MgrName = data.orderList[i].insure1MgrName;
    				insure1MgrPhone = data.orderList[i].insure1MgrPhone;
    				insure2Code = data.orderList[i].insure2Code;
    				insure2Name = data.orderList[i].insure2Name;
    				insure2MgrName = data.orderList[i].insure2MgrName;
    				insure2MgrPhone = data.orderList[i].insure2MgrPhone;
    				
    				insure1AcceptNo = data.orderList[i].insure1AcceptNo; 
					insure1AcciRate = data.orderList[i].insure1AcciRate; 
					insure2AcceptNo = data.orderList[i].insure2AcceptNo; 
					insure2AcciRate = data.orderList[i].insure2AcciRate; 
    				
    				taxType = data.orderList[i].taxType;
    				salePrice = data.orderList[i].salePrice;
    				taxPrice = data.orderList[i].taxPrice;
    				sumPrice = salePrice + taxPrice;  
    				sumPriceKor = data.orderList[i].sumPriceKor;    
    				branchCode = data.orderList[i].branchCode;				
    				regUserName = data.orderList[i].regUserName;				
    				pcYN = data.orderList[i].pcYN;				

    				insure1Fax = data.orderList[i].insure1Fax;				
    				insure2Fax = data.orderList[i].insure2Fax;				

					
					$("#orderGroupId").val(orderGroupId);
					$("#orderType").val(orderType); 
					$("#custCode").val(custCode); 
					$("#custName").val(custName); 
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone); 
					$("#supplyCustCode").val(supplyCustCode); 
					$("#supplyCustName").val(supplyCustName); 
					$("#supplyCustMgrName").val(supplyCustMgrName); 
					$("#supplyCustMgrPhone").val(supplyCustMgrPhone); 
					$("#carNo").val(carNo); 
					$("#vinNo").val(vinNo); 
					$("#colorCode").val(colorCode); 
					$("#makerCode").val(makerCode); 
					$("#carType").val(carType); 
					$("#dcRate").val(dcRate); 
					$("#dcDspType").val(dcDspType); 
					$("#agencyFeeRate").val(agencyFeeRate); 
					$("#marginRate").val(marginRate); 
					$("#memo1").val(memo1); 
					$("#memo2").val(memo2); 

					$("#insure1Code").val(insure1Code); 
					$("#insure1Name").val(insure1Name);
					$("#insure1MgrName").val(insure1MgrName); 
					$("#insure1MgrPhone").val(insure1MgrPhone); 
					$("#insure2Code").val(insure2Code); 
					$("#insure2Name").val(insure2Name);
					$("#insure2MgrName").val(insure2MgrName); 
					$("#insure2MgrPhone").val(insure2MgrPhone); 
					
					$("#insure1AcceptNo").val(insure1AcceptNo); 
					$("#insure1AcciRate").val(insure1AcciRate); 
					$("#insure2AcceptNo").val(insure2AcceptNo); 
					$("#insure2AcciRate").val(insure2AcciRate); 
					
					$("#taxType").val(taxType);
    				$("#salePrice").val(_cf_comma(salePrice));
    				$("#taxPrice").val(_cf_comma(taxPrice));
    				$("#sumPrice").val(_cf_comma(sumPrice));
    				$("#sumPriceKor").val(sumPriceKor);
                    $("#branchCode").val(branchCode);
                    $("#regUserName").val(regUserName);
                    $("#pcYN").val(pcYN);
                   
                    $("#insure1MgrFax").val(insure1Fax);
                    $("#insure2MgrFax").val(insure2Fax);
					//등록버튼 비활성화, 수정/삭제 활성화
					document.getElementById('btnReg').classList.toggle('disabled'); 
					document.getElementById('btnUpt').classList.toggle('disabled'); 
					document.getElementById('btnDel').classList.toggle('disabled');				

					document.getElementById('btnOrderGroup').classList.toggle('disabled');			
					document.getElementById('btnStockChk').classList.toggle('disabled');			
					document.getElementById('btnItemChk').classList.toggle('disabled');
					document.getElementById('btnPrint').classList.toggle('disabled');
					document.getElementById('exportXls').classList.toggle('disabled');		
					document.getElementById('exportPdf').classList.toggle('disabled');					
					
					document.getElementById('btnDivide').classList.toggle('disabled');	
										
				}		
				//getCustSaleDcRateList(); // 주문에서 조회시 주문처 리스트 받아옴
				findOrderItem('/order/order-item-list');				
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
function findOrderItem(url) {
	var list = [];
	var orderNo = $("#orderNo").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType": "ONE",  //2024.05.24 hsg
			"orderNo":orderNo
			,"ymdIgnoreYN":"Y"  //2023.08.09 hsg.
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			if (data.orderItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				//data.orderItemList.sort((a,b)=>a.orderNo-b.orderNo || a.dspNo - b.dspNo || parseFloat(a.orderSeq) - parseFloat(b.orderSeq));		
				data.orderItemList.sort((a,b)=>a.orderNo-b.orderNo || a.dspNo - b.dspNo || parseFloat(a.orderSeq) - parseFloat(b.orderSeq)); //2024.06.18 sg
				for(i=0;i<data.orderItemList.length;i++){
					dspNo = data.orderItemList[i].dspNo;
					//if (dspNo == 0) { //2024.06.18 sg 주석처리	 
					//	dspNo = 999;
					//}
					console.log("otherSaleType = " + data.orderItemList[i].otherSaleType);
				    list.push({
						 idx: data.orderItemList[i].orderSeq
						,dspNo: dspNo
						,orderSeq: data.orderItemList[i].orderSeq 
						,itemId: data.orderItemList[i].itemId 
						,itemNo: data.orderItemList[i].itemNo 
						,itemName: data.orderItemList[i].itemName
						,itemNameEn: data.orderItemList[i].itemNameEn 
						,cnt: data.orderItemList[i].cnt 
						,unitPrice: data.orderItemList[i].unitPrice
						,salePrice: data.orderItemList[i].salePrice 
						,sumPrice: data.orderItemList[i].sumPrice
						,supplyPrice: data.orderItemList[i].supplyPrice 						
						,supplySumPrice: data.orderItemList[i].supplySumPrice 
						,importPrice: data.orderItemList[i].importPrice 
						,memo: data.orderItemList[i].memo 
						,placeUnitPrice: data.orderItemList[i].placeUnitPrice
						,placeCustCode: data.orderItemList[i].placeCustCode
						,placeCustName: data.orderItemList[i].placeCustName
						,estiNo: data.orderItemList[i].estiNo
						,estiSeq: data.orderItemList[i].estiSeq
						,centerPrice: data.orderItemList[i].centerPrice
						
						,plUnitPrice: data.orderItemList[i].plUnitPrice
						,plCustCode: data.orderItemList[i].plCustCode
						,plCustName: data.orderItemList[i].plCustName
						,dcExceptYN: data.orderItemList[i].dcExceptYN
						
						,pcReqNo: data.orderItemList[i].pcReqNo //20230823 bk 
						,reqSeq: data.orderItemList[i].reqSeq //20230823 bk
						,ceilUnit: data.orderItemList[i].ceilUnit //20230829 hsg
						,dlvType: data.orderItemList[i].dlvType //20230901 bk
						,taxPrice: data.orderItemList[i].taxPrice //20230901 bk
						,makerName: data.orderItemList[i].makerName //20231017 bk						
						,rcvlogisCode: data.orderItemList[i].rcvlogisCode  					
						,orderReqPlaceCust: data.orderItemList[i].orderReqPlaceCust  	//240328 yoonsang 
						,makerCode : data.orderItemList[i].makerCode		
						,curSaleRate : data.orderItemList[i].curSaleRate || $("#dcRate").val() || 0		// 주문 품목 조회시 현재할인율과 브랜드코드 가져옴 
						, placeImportCnt : data.orderItemList[i].placeImportCnt || 0
						, className : data.orderItemList[i].className || ''
						, factoryNo : data.orderItemList[i].factoryNo || ''
						,otherSaleType : data.orderItemList[i].otherSaleType	//yoonsang 250513
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
				//AUIGrid.setColumnSizeList(myGridID, AUIGrid.getFitColumnSizeList(myGridID))
				order_dcProc();
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


function click_orderType(orderType) {
	if (orderType == 1){
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



// 체크된 아이템 얻기
function placeOrder() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	var str = "";
	var rowItem;
	var seqArr = "";
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		seqArr = seqArr + "^" +rowItem.item.orderSeq;		
		//str += "row : " + rowItem.rowIndex + ", id :" + rowItem.item.id + ", name : " + rowItem.item.name + "\n";
	}
	//alert(str);
	//location.href = "/_order/_orderAdd?reqNo_array="+reqNo_array+"&seqNo_array="+seqNo_array+"&eventNo_array="+eventNo_array;
	
	var orderNo = $("#orderNo").val();
	//post형식으로 페이지 데이터 조회
	let f = document.createElement('form');
    
	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'orderNo');
	obj.setAttribute('value', orderNo);
	f.appendChild(obj);
	
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'seqArr');
	obj.setAttribute('value', seqArr);
	f.appendChild(obj);
	    
	f.setAttribute('method', 'post');
	f.setAttribute('action', '/order/place-up');
	document.body.appendChild(f);
	f.submit();	
}


// 견적 조회
function findEsti(url) {
	var estiNo = $("#estiNo").val();
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"estiNo":estiNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.estiList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");				
				
			}else{
				
				for(i=0;i<data.estiList.length;i++){
					
					if (data.estiList[i].estiType == 1) {
					  document.querySelector('input[name="orderType"][value="1"]').checked = true;
					    click_orderType(1);
					} else if (data.estiList[i].estiType == 2) {
					  document.querySelector('input[name="orderType"][value="2"]').checked = true;
					 click_orderType(2);
					}
									
					//	console.log("estiType"+data.estiList[i].estiType)		;
				    estiType = data.estiList[i].estiType; 
					custCode = data.estiList[i].custCode; 
					custName = data.estiList[i].custName; 
					custMgrName = data.estiList[i].custMgrName;
					custMgrPhone = data.estiList[i].custMgrPhone; 
					supplyCustCode = data.estiList[i].supplyCustCode; 
					supplyCustName = data.estiList[i].supplyCustName; 
					supplyCustMgrName = data.estiList[i].supplyCustMgrName; 
					supplyCustMgrPhone = data.estiList[i].supplyCustMgrPhone; 
					carNo = data.estiList[i].carNo; 
					vinNo = data.estiList[i].vinNo; 
					colorCode = data.estiList[i].colorCode; 
					makerCode = data.estiList[i].makerCode; 
					carType = data.estiList[i].carType; 
					dcRate = data.estiList[i].dcRate; 
					dcDspType = data.estiList[i].dcDspType; 
					agencyFeeRate = data.estiList[i].agencyFeeRate; 
					marginRate = data.estiList[i].marginRate; 
					memo1 = data.estiList[i].memo1; 
					memo2 = data.estiList[i].memo2; 
					branchCode = data.estiList[i].branchCode;
					taxType = data.estiList[i].taxType;
					
					$("#estiType").val(estiType); 
					$("#custCode").val(custCode); 
					$("#custName").val(custName); 
					$("#custMgrName").val(custMgrName);
					$("#custMgrPhone").val(custMgrPhone); 
					$("#supplyCustCode").val(supplyCustCode); 
					$("#supplyCustName").val(supplyCustName); 
					$("#supplyCustMgrName").val(supplyCustMgrName); 
					$("#supplyCustMgrPhone").val(supplyCustMgrPhone); 
					$("#carNo").val(carNo); 
					$("#vinNo").val(vinNo); 
					$("#colorCode").val(colorCode); 
					$("#makerCode").val(makerCode); 
					$("#carType").val(carType); 
					$("#dcRate").val(dcRate); 
					$("#dcDspType").val(dcDspType); 
					$("#agencyFeeRate").val(agencyFeeRate); 
					$("#marginRate").val(marginRate); 
					$("#memo1").val(memo1); 
					$("#memo2").val(memo2); 
                    $("#branchCode").val(branchCode); 
                    $("#taxType").val(taxType); 
					//등록버튼 비활성화, 수정/삭제 활성화
					//document.getElementById('btnReg').classList.toggle('disabled'); 
					//document.getElementById('btnUpt').classList.toggle('disabled'); 
					//document.getElementById('btnDel').classList.toggle('disabled');				
					
				}		
				//getCustSaleDcRateList(); // 견적에서 넘어왔을때 주문처에 맞게 할인율 리스트 셋팅
				findEstiItem('/order/esti-item-list');				
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

//견적품목 조회
function findEstiItem(url) {
	var list = [];
	var estiNo = $("#estiNo").val();
	var seqArr = $("#seqArr").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"estiNo":estiNo,
			"seqArr":seqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){ 
			if (data.estiItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				var item = new Object();
				for(i=0;i<data.estiItemList.length;i++){
					//item.mCode = '',
				    item.estiNo = data.estiItemList[i].estiNo 
					,item.estiSeq = data.estiItemList[i].estiSeq 
					,item.itemId = data.estiItemList[i].itemId 
					,item.itemNo = data.estiItemList[i].itemNo 
					,item.itemName = data.estiItemList[i].itemName
					,item.itemNameEn = data.estiItemList[i].itemNameEn 
					,item.cnt = data.estiItemList[i].cnt 
					,item.unitPrice = data.estiItemList[i].unitPrice
					,item.salePrice = data.estiItemList[i].salePrice
					//,item.sumPrice = data.estiItemList[i].unitPrice * data.estiItemList[i].salePrice 
					,item.sumPrice = data.estiItemList[i].cnt * data.estiItemList[i].salePrice  //2023.08.29 hsg
					,item.supplyPrice = data.estiItemList[i].supplyPrice 						
					,item.supplySumPrice = data.estiItemList[i].supplySumPrice 
					,item.importPrice = data.estiItemList[i].importPrice 
					,item.memo = data.estiItemList[i].memo 
					,item.placeUnitPrice = data.estiItemList[i].placeUnitPrice
					,item.placeCustCode = data.estiItemList[i].placeCustCode
					,item.placeCustName = data.estiItemList[i].placeCustName
					
					,item.centerPrice = data.estiItemList[i].centerPrice
					,item.dcExceptYN = data.estiItemList[i].dcExceptYN
					,item.ceilUnit = data.estiItemList[i].ceilUnit    //2023.08.29 hsg

					,item.taxPrice = data.estiItemList[i].taxPrice    
					,item.rcvlogisCode = data.estiItemList[i].rcvlogisCode    
					,item.makerCode = data.estiItemList[i].makerCode    // 견적에서 넘어온 경우 제조사정보 반환 추가
					,item.makerName = data.estiItemList[i].makerName    
					,item.curSaleRate = $("#dcRate").val() || 0// 견적에서 넘어온 품목은 견적 마스터 할인율로 셋팅
					
					,item.className = data.estiItemList[i].className  || ''// 견적에서 넘어온 품목은 견적 마스터 할인율로 셋팅
					,item.factoryNo = data.estiItemList[i].factoryNo  || '';// 견적에서 넘어온 품목은 견적 마스터 할인율로 셋팅
					
					AUIGrid.addRow(myGridID, item, "last");	
	
					/*
				    list.push({
						 //idx: data.estiItemList[i].estiSeq
						 estiNo: data.estiItemList[i].estiNo 
						,estiSeq: data.estiItemList[i].estiSeq 
						,itemId: data.estiItemList[i].itemId 
						,itemNo: data.estiItemList[i].itemNo 
						,itemName: data.estiItemList[i].itemName
						,itemNameEn: data.estiItemList[i].itemNameEn 
						,cnt: data.estiItemList[i].cnt 
						,salePrice: data.estiItemList[i].salePrice 
						,sumPrice: data.estiItemList[i].sumPrice
						,supplyPrice: data.estiItemList[i].supplyPrice 						
						,supplySumPrice: data.estiItemList[i].supplySumPrice 
						,importPrice: data.estiItemList[i].importPrice 
						,memo: data.estiItemList[i].memo 
						,placeUnitPrice: data.estiItemList[i].placeUnitPrice
						,placeCustName: data.estiItemList[i].placeCustName
					});
					*/					
				}		
				//AUIGrid.setGridData("#grid_wrap", list);
				//setItemBrandSaleRate(true , false) // 견적품목 조회 완료시 할인율로 셋팅
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

function stockCheck(){
 
 	var orderNo = $('#orderNo').val();

	// console.log("seqArr:"+seqArr);
	$.fancybox.open({
	  //href : '/order/stock-check-up?estiNo='+estiNo+'&seqArr='+encodeURIComponent(seqArr)    , // 불러 올 주소
	  href : '/order/stock-check-up?orderNo='+orderNo    , // 불러 올 주소.controller에서 분기
	  type : 'iframe',
	  width : '90%',
	  height : '90%',
	  padding :0,
	  fitToView: false,
	  autoSize : false
	  ,modal : true
	});
}  


//주문관리 클릭 한 경우
function orderGroup() {
	//location.href = "/order/order-group-list";
	var orderGroupId = $("#orderGroupId").val();
	
	//location.href = "/order/order-group-item-list?orderGroupId="+orderGroupId;
	
	//post형식으로 페이지 데이터 조회
	let f = document.createElement('form');
    
	let obj;
	obj = document.createElement('input');
	obj.setAttribute('type', 'hidden');
	obj.setAttribute('name', 'orderGroupId');
	obj.setAttribute('value', orderGroupId);
	    
	f.appendChild(obj);
	f.setAttribute('method', 'post');
	f.setAttribute('action', '/order/order-group-item-list');
	document.body.appendChild(f);
	f.submit();	
		
}




// 체크된 아이템 얻기 후 분할
function divide() {
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	//견적순번이 없는것은 분할 대상이 아님
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		orderSeq = rowItem.item.orderSeq
		if (orderSeq === undefined ){
			alert("등록 안된 품목은 분할을 할 수 없습니다.");
			return;
		}
	}
	
	//var str = "";
	var rowItem;
	var rowList = [];
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];
		//str += "row : " + rowItem.rowIndex + ", id :" + rowItem.item.id + ", name : " + rowItem.item.name + "\n";
		rowPos = rowItem.rowIndex;
		rowPos = rowPos + i +1;		
		var item = new Object();
	//rowList[i] = {
		//item.orderSeq = rowItem.item.orderSeq+'-분할', //rowItem.item.estiSeq, 
		item.orderSeq = rowItem.item.orderSeq+'.분할', ////2023.07.03 그리드정렬떄문에 변경
		item.itemId = rowItem.item.itemId,
		item.itemNo = rowItem.item.itemNo, 
		item.itemName = rowItem.item.itemName,
		//item.itemNameEn = rowItem.item.itemNameEn, 
		item.cnt = rowItem.item.cnt, 
		item.unitPrice = rowItem.item.unitPrice,
		item.salePrice = rowItem.item.salePrice, 
		item.sumPrice = rowItem.item.sumPrice
		,item.dcExceptYN = rowItem.item.dcExceptYN 
		//아래 8개는 카피할 필요 없을듯
		//item.supplyPrice = rowItem.item.supplyPrice,						
		//item.supplySumPrice = rowItem.item.supplySumPrice, 
		//item.importPrice = rowItem.item.importPrice, 
		//item.memo = rowItem.item.memo, 
		//item.placeUnitPrice = rowItem.item.placeUnitPrice,
		//item.placeCustCode = rowItem.item.placeCustCode,
		//item.placeCustName = rowItem.item.placeCustName,
		//item.unitPrice = rowItem.item.unitPrice
		//	}
		AUIGrid.addRow(myGridID, item, rowPos);
	}
	
}

function fn_drawSeqNo(o_seqNo) { 
	//분할 체크	
	if (CHARINDEX('-',o_seqNo) >0){
		//alert("분할 대상이 아닙니다. 분할 하려면 ")
	}
	
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
		  //console.log("Selected item:", rowItem);
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.custCode);
			$("#"+name+"").val(rowItem.custName);
			
			//20240617 supi 주문처 변경이 3곳으로 분리되어 있어서 여긴 팝업에서 그리드를 선택후 확인버튼 누를경우
			//getCustSaleDcRateList();//주문처 변경으로 할인율 리스트 정보를 선택된 주문처의 것으로 셋팅
	}
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");	
}


//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCustMgr(obj,name) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCustMgr);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	//console.log("row1:"+rowItem.itemNo);
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	$(obj).val(rowItem.name);
	$("#"+name+"").val(rowItem.phone1);
	
	var dialogCustMgr;
	dialogCustMgr = $( "#dialog-form-custMgr");			
	dialogCustMgr.dialog("close");
	
}



//엑셀업로드 버튼 클릭 
function estiExcelAdd() {
	
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


function fn_fileDataCall() {
	
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
	      /* "Create an account": addUser, */
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

				var item;
				var rowList = [];
				var rowCnt = Math.floor(Math.random() * 10); // 랜덤 개수
				rowCnt = Math.max(2, rowCnt);
		
				// 추가시킬 행 10개 작성
				for(i=0;i<data.orderItemList.length;i++){
					itemNo = data.orderItemList[i].itemNo; 
					cnt = data.orderItemList[i].cnt; 
					unitPrice = data.orderItemList[i].unitPrice;
					memo = data.orderItemList[i].memo;
					placeUnitPrice = data.orderItemList[i].placeUnitPrice;
					placeCustCode = data.orderItemList[i].placeCustCode;
						
					itemId = data.orderItemList[i].itemId; 
					itemName = data.orderItemList[i].itemName;
					itemNameEn = data.orderItemList[i].itemNameEn;
					placeCustName = data.orderItemList[i].placeCustName;
					dcExceptYN = data.orderItemList[i].dcExceptYN;
					
					if (dcExceptYN===undefined || dcExceptYN == null) {
						dcExceptYN = "N";
					}
					  
					if (itemId ==0){  //부품이 없는 경우에는   단가 0원처리
						unitPrice = 0;
					}					    
					salePrice  = cnt * unitPrice
					centerPrice = 	data.orderItemList[i].centerPrice;		
					
				
					var item = new Object();
				   
					item.itemNo = itemNo, 
					item.cnt = cnt, 
					item.unitPrice = unitPrice,
					item.memo = memo ,
					item.placeUnitPrice = placeUnitPrice,
					item.placeCustCode = placeCustCode,
					
					item.itemId = itemId, 
					item.itemName = itemName,
					item.itemNameEn = itemNameEn,
				    item.placeCustName = placeCustName,
				    
				    item.salePrice = salePrice
				    ,item.dcExceptYN = dcExceptYN
				    ,item.centerPrice = centerPrice
				    ,item.dspNo = 999				
					//2023.07.03 When processing as an array, it is reversed when registering and changed to individual input
					if (connectYN == 'Y') {
						
						AUIGrid.addRow(myGridID, item, 'last'); 
					}else{ //이어올리기 아닌 경우 그리드 reset 한 다음에 처리
						
						if (i==0) {
							AUIGrid.clearGridData(myGridID);  //
						}					
						AUIGrid.addRow(myGridID, item, 'last');			
					}
				
				
					
					/*			    
					rowList[i] = {
						itemNo : itemNo, 
						cnt : cnt, 
						unitPrice : unitPrice,
						memo : memo ,
						placeUnitPrice : placeUnitPrice,
						placeCustCode : placeCustCode,
						
						itemId : itemId, 
						itemName : itemName,
						itemNameEn : itemNameEn,
					    placeCustName : placeCustName,
					    
					    salePrice : salePrice
					    ,dcExceptYN : dcExceptYN
					    ,centerPrice : centerPrice
					}
					*/
				}
		
				// parameter
				// item : 삽입하고자 하는 아이템 Object 또는 배열(배열인 경우 다수가 삽입됨)
				// rowPos : rowIndex 인 경우 해당 index 에 삽입, first : 최상단, last : 최하단, selectionUp : 선택된 곳 위, selectionDown : 선택된 곳 아래
				/*
				if (connectYN == 'Y') {
					console.log("Y");
					AUIGrid.addRow(myGridID, rowList, 'last');
				}else{ //이어올리기 아닌 경우 그리드 reset 한 다음에 처리
					console.log("N");
					AUIGrid.clearGridData(myGridID);  //					
					AUIGrid.addRow(myGridID, rowList, 'last');					
				}
				*/
				
				//fn_dcProc();
				order_dcProc();
          		alert("[알림]\n엑셀업로드를 진행합니다.\n내용을 확인하시고 [등록]을 하세요.");	           

          		dialogXls.dialog( "close" );
	        },
	        type : "POST"
	     };
	     $("#addExcelForm").ajaxSubmit(options);

	 }
}

//엑셀/텍스트형식인지 여부 판단
function check_file_type(batchFile) {
	 var fileFormat = batchFile.split(".");
	 if (fileFormat.indexOf("xlsx") > -1 ) {
	     return true;  //엑셀/텍스트 확장자인 경우
	 } else {
	     return false;  //엑셀/텍스트 확장자 아닌경우
	 }
}


//인쇄버튼 클릭 
//href="order/esti-up-print"
/*
$("#print").click(function() {
	var orderNo = $("#orderNo").val();
	var printMemoYN = "";
	
	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}
	
	window.location.href = "/order/order-up-print?orderNo="+orderNo+"&memoYN="+printMemoYN;
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
	//console.log("클릴잉");
});*/

$("#print").click(function() {
	var orderNo = $("#orderNo").val();
	var printMemoYN = "";
	
	var isPrintMemoYN = $('input:checkbox[name=printMemoYN]').is(':checked');
	
    if(isPrintMemoYN == true){
		printMemoYN = 'Y';
	}else{
		printMemoYN = 'N';
	}
	
	var printDcYN = "";
	var printDcYN = $('input[name="printDcYN"]:checked').val();
	/*
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}
	*/
	var printNoYN = "";
	var isPrintNoYN = $('input:checkbox[name=printNoYN]').is(':checked');
	
    if(isPrintNoYN == true){
		printNoYN = 'Y';
	}else{
		printNoYN = 'N';
	}	
	
	//window.location.href = "/order/order-up-print?orderNo="+orderNo+"&memoYN="+printMemoYN +"&printDcYN=" + printDcYN+"&printNoYN=" + printNoYN;
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
		var url ="/order/order-up-print?orderNo="+orderNo+"&memoYN="+printMemoYN +"&printDcYN=" + printDcYN+"&printNoYN=" + printNoYN;
	window.open(url, "_blank");
	
});



//이미지 다운로드 버튼 클릭
$("#btnDownload").click(function() {
	var orderNo = $("#orderNo").val();
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
/*	
	var isPrintDcYN = $('input:checkbox[name=printDcYN]').is(':checked');		
	 if(isPrintDcYN == true){
		printDcYN = 'Y';
	}else{
		printDcYN = 'N';
	}
*/

	//window.location.href = "/order/order-up-print?orderNo="+orderNo+"&memoYN="+printMemoYN+"&imgYN="+imgYN+"&printDcYN=" + printDcYN;
	//window.location.href = "/order/esti-up-print?estiNo="+ $("#estiNo").val();
	//console.log("클릴잉");
	var url ="/order/order-up-print?orderNo="+orderNo+"&memoYN="+printMemoYN+"&imgYN="+imgYN+"&printDcYN=" + printDcYN;
	window.open(url, "_blank");
});





//엑셀업로드 버튼 클릭 
function print() {
	
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
	
/*
23.03.08 장윤상 부품등록팝업추가
*/
/*
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
	$("#itemNoReg").val($("#pop_itemNo").val());
	findSrchCode("/base/code-list");


}

$("#btnCloseItemDialog").click(function() {
	//formClear1();
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
    data.dcExceptYN = dcExceptYN;
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
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
*/

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
		,makerName : rowItem.makerName
		,makerCode : rowItem.makerCode // 팝업에서 확인버튼 누를경우 브랜드 정보도 받아옴
		,centerPrice : rowItem.centerPrice
		,className : rowItem.className 
		,factoryNo : rowItem.factoryNo
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");
	order_dcProc();
	var dialogItem;
	dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}

	// 주문요청 조회
function findPcReq(url) {
	var pcReqNo = $("#pcReqNo").val();
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"pcReqNo":pcReqNo
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){			
			if (data.pcReqList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");				
				
			}else{			
				for(i=0;i<data.pcReqList.length;i++){	
				    //estiType = data.pcReqList[i].estiType; 
					custCode = data.pcReqList[i].gvComCode; 
					custName = data.pcReqList[i].gvCustName; 
					custMgrName = data.pcReqList[i].gvMgr;
					//custMgrPhone = data.pcReqList[i].custMgrPhone; 
					//supplyCustCode = data.pcReqList[i].supplyCustCode; 
					//supplyCustName = data.pcReqList[i].supplyCustName; 
					//supplyCustMgrName = data.pcReqList[i].supplyCustMgrName; 
					//supplyCustMgrPhone = data.pcReqList[i].supplyCustMgrPhone; 
					//carNo = data.pcReqList[i].carNo; 
					//vinNo = data.pcReqList[i].vinNo; 
					//colorCode = data.pcReqList[i].colorCode; 
					//makerCode = data.pcReqList[i].makerCode; 
					//carType = data.pcReqList[i].carType; 
					//dcRate = data.pcReqList[i].dcRate; 
				//	dcDspType = data.pcReqList[i].dcDspType; 
					//agencyFeeRate = data.pcReqList[i].agencyFeeRate; 
					//marginRate = data.pcReqList[i].marginRate; 
					memo1 = data.pcReqList[i].gvMemo; 
				//	memo2 = data.pcReqList[i].memo2; 
					//branchCode = data.pcReqList[i].branchCode;
					
				//	$("#estiType").val(estiType); 
					$("#custCode").val(custCode); 
					$("#custName").val(custName); 
					$("#custMgrName").val(custMgrName);
				//	$("#custMgrPhone").val(custMgrPhone); 
				//	$("#supplyCustCode").val(supplyCustCode); 
				//	$("#supplyCustName").val(supplyCustName); 
				//	$("#supplyCustMgrName").val(supplyCustMgrName); 
				//	$("#supplyCustMgrPhone").val(supplyCustMgrPhone); 
				//	$("#carNo").val(carNo); 
				//	$("#vinNo").val(vinNo); 
				//	$("#colorCode").val(colorCode); 
				//	$("#makerCode").val(makerCode); 
				//	$("#carType").val(carType); 
				//	$("#dcRate").val(dcRate); 
				//	$("#dcDspType").val(dcDspType); 
				//	$("#agencyFeeRate").val(agencyFeeRate); 
				//	$("#marginRate").val(marginRate); 
					$("#memo1").val(memo1); 
				//	$("#memo2").val(memo2); 
                  //  $("#branchCode").val(branchCode); 
					//등록버튼 비활성화, 수정/삭제 활성화
					//document.getElementById('btnReg').classList.toggle('disabled'); 
					//document.getElementById('btnUpt').classList.toggle('disabled'); 
					//document.getElementById('btnDel').classList.toggle('disabled');				
					
				}		
				//getCustSaleDcRateList(); // 주문요청에서 넘어올때 주문처에 맞는 할인율 정보를 리스트변수에 셋팅
				findReqItem('/order/pc-req-item-list');				
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

//요청 품목 조회
function findReqItem(url) {
	var list = [];
	var pcReqNo = $("#pcReqNo").val();
	var reqSeqArr = $("#reqSeqArr").val();
	//var seqArr = $("#seqArr").val();
	//console.log(reqSeqArr);
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"pcReqNo":pcReqNo,
			"reqSeqArr":reqSeqArr
			//"seqArr":seqArr
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){			
			 
			if (data.reqItemList.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{					
				//var item = new Object();
			
				for(i=0;i<data.reqItemList.length;i++){
					var item = {}; // 반드시 for문 안에서 선언

					    // 기본 데이터 세팅
					    item.pcReqNo = data.reqItemList[i].pcReqNo;
					    item.reqSeq = data.reqItemList[i].reqSeq;
					    item.itemId = data.reqItemList[i].itemId;
					    item.itemNo = data.reqItemList[i].itemNo;
					    item.itemName = data.reqItemList[i].itemName;
					    item.cnt = data.reqItemList[i].cnt;
					    item.centerPrice = data.reqItemList[i].centerPrice;

					    // ⬇️ 여기서 if문 사용 → 전혀 문제 없음
					    if (data.reqItemList[i].otherSaleType != '') {
					        item.salePrice = data.reqItemList[i].outSalePrice;
					        item.unitPrice = data.reqItemList[i].outSalePrice;
					    } else {
					        item.salePrice = data.reqItemList[i].centerPrice;
					        item.unitPrice = data.reqItemList[i].centerPrice;
					    }

					    // 나머지 값 세팅
					    item.memo = data.reqItemList[i].inMemo1;
					    item.dlvType = data.reqItemList[i].dlvType;
					    item.makerCode = data.reqItemList[i].makerCode;
					    item.makerName = data.reqItemList[i].makerName;
					    item.className = data.reqItemList[i].className || '';
					    item.factoryNo = data.reqItemList[i].factoryNo || '';
						
						item.otherSaleType = data.reqItemList[i].otherSaleType;

					    // 행 추가
					    AUIGrid.addRow(myGridID, item, "last");
							
				}		 
				//setItemBrandSaleRate(true , false); // 주문요청에서 넘어왔을때 부품 로딩이 끝나면 브랜드별 할인율로 전체 셋팅
				
				//'AUIGrid.setGridData("#grid_wrap", list);
			//	formatSalePrice = totalSalePrice.toLocaleString();
				//$("#salePrice").val(formatSalePrice)
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


//단위올림. 2023.08.29
$("#btnCeilPop").click(function(){
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}
	
	var ceipDialog;
	ceipDialog = $("#dialog-form-ceil").dialog({
		//autoOpen: false,
		height: 400,
		//minWidth: 500,
		width: "40%",
		modal: true,
		headerHeight: 40,
		//position: { my: "center", at: "center", of: $("#grid_wrap_item") },
		 position: { my: "center", at: "center", of: window },
		buttons: {
			"확인": fn_ceil	,
			"취소": function (event) {
				ceipDialog.dialog("close");
			}
		},
		close: function() {

		}
	});
    $(".ui-dialog-titlebar-close").html("X");
	ceipDialog.dialog("open");
});

function  fn_ceil() {
	var ceilUnit = $(':radio[name="ceilUnit"]:checked').val();
	var checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	if (checkedItems.length <= 0) {
		alert("품목을 선택하세요!");
		return;
	}

	var rowItem;
	for (var i = 0, len = checkedItems.length; i < len; i++) {
		rowItem = checkedItems[i];		
		item = {
					ceilUnit: ceilUnit						
				};
		 AUIGrid.updateRow(myGridID, item, rowItem.rowIndex);		 
	}

	//fn_dcProc()
	$("#dialog-form-ceil").dialog("close");
}	
function logisCodeListFind() // 수령물류센터 코드 받아오는 통신
{
	$.ajax({
		type: "POST",
		url: "/base/code-list",
		dataType: "json",
		data: {
			mCode : '9030',
			validYN :'Y'
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		
		success: function(data) {   
			for(let i = 0 ; i < data.codeList.length ; i++)
			{
				logisCodeList.push(data.codeList[i].codeName); // 디테일 auigrid용 리스트 배열에 추가 
			} 
		},
		error: function(e){
			
		}
		
	})
	
}
/**
	브랜드별 할인율로 셋팅 
	체크만 덮어쓰기 , 전체 덮어쓰기 , 전체 비어있는경우(0)만 덮어쓰기
	할인율 덮어쓰는 우선순위 기존값 > 브랜드 할인율 > 0 // 덮어쓰기면 브랜드 할인율로 일괄
*/
/*
function setItemBrandSaleRate(isAll,isOverWrite = true)
{
	  
	if(AUIGrid.getCheckedRowItems(myGridID).length == 0 && !isAll)
	{
		alert('선택된 부품이 없습니다');
		return;
	}
	if(isEmpty(custSaleDcRateList)) // 할인율이 비어있으면 => 주문처가 선택 안된경우    
	{
		return;	
	}
	  
	const item = (isAll?AUIGrid.getGridData(myGridID) : AUIGrid.getCheckedRowItems(myGridID)).filter((row)=>{
		rowData = (isAll?row:row.item);//전체 데이터와 체크 데이터와 구조가 달라서 이걸 하나처럼 쓰기 위해 실 데이터 담기는 객체를 저장
		if(rowData.itemId) return true; //부품 id가 존재하는 행만 
	}).map((row) => { 
		rowData = (isAll?row:row.item);//전체 데이터와 체크 데이터와 구조가 달라서 이걸 하나처럼 쓰기 위해 실 데이터 담기는 객체를 저장
		const saleRate = custSaleDcRateList.find((item)=>{ // 할인율 리스트에서 메이커가 같은 데이터를 가져옴
		 
			if(item.makerCode == rowData.makerCode) return true;
		}) 
		
 
		rowData.curSaleRate = rowData.curSaleRate || 0;
	 	const dcRate = isOverWrite?saleRate.dcRate : parseInt(rowData.curSaleRate) || saleRate.dcRate || 0;  //isOverWrite가 true면 할인율 새로 덮고 아니라면 기존데이터가 0이 아니면 기존데이터를 0이면 할인율 새로 덮음
 	
		return {"idx" : rowData.idx , 
				"curSaleRate" :  dcRate, 
				"salePrice" : rowData.unitPrice * (100- dcRate) /100  , 
				"taxPrice" : rowData.unitPrice * (100- dcRate) /1000 , 
				"sumPrice" :  rowData.unitPrice * (100- dcRate) /100 * rowData.cnt } 
				});
				
	  
	AUIGrid.updateRowsById(myGridID, item);
	 
	
	const totalSalePrice = AUIGrid.getGridData(myGridID).reduce((sum , cur )=>{ 
    return  sum + cur.sumPrice || 0;                           
	},0) 
	
	$("#salePrice").val(_cf_comma(Math.round(totalSalePrice)));
	$("#taxPrice").val(_cf_comma(Math.round(totalSalePrice * 0.1)));
	$("#sumPrice").val(_cf_comma(Math.round(totalSalePrice*1.1)));
	$("#sumPriceKor").val(_cf_numToKor(	$("#sumPrice").val().replaceAll(',',''))); 
}*/

function setItemBrandSaleRate(isAll, isOverWrite = true) {

	if (AUIGrid.getCheckedRowItems(myGridID).length == 0 && !isAll) {
		alert('선택된 부품이 없습니다');
		return;
	}
	if (isEmpty(custSaleDcRateList)) {
		return;
	}

	const item = (isAll ? AUIGrid.getGridData(myGridID) : AUIGrid.getCheckedRowItems(myGridID))
		.filter((row) => {
			const rowData = (isAll ? row : row.item);
			return rowData.itemId; // itemId가 있어야 처리
		})
		.map((row) => {
			const rowData = (isAll ? row : row.item);

		    let dcRate = 0;
		    let salePrice = rowData.unitPrice;
		    let sumPrice = rowData.unitPrice * rowData.cnt;
		    let taxPrice = salePrice / 10;
			
			console.log("rowData.otherSaleType : " + rowData.otherSaleType);

		    if (rowData.otherSaleType === '') {
		        const saleRate = custSaleDcRateList.find(item => item.makerCode == rowData.makerCode);
		        rowData.curSaleRate = rowData.curSaleRate || 0;
		        dcRate = isOverWrite
		            ? (saleRate?.dcRate || 0)
		            : (parseInt(rowData.curSaleRate) || saleRate?.dcRate || 0);
		        salePrice = rowData.unitPrice * (100 - dcRate) / 100;
		        sumPrice = salePrice * rowData.cnt;
		        taxPrice = salePrice / 10;
		    }
			
			console.log("idx : " + rowData.idx);
			console.log("dcRate : " + dcRate);
			console.log("salePrice : " + salePrice);
			console.log("taxPrice : " + taxPrice);
			console.log("sumPrice : " + sumPrice);

		    return {
		        idx: rowData.idx,
		        curSaleRate: dcRate,
		        salePrice: salePrice,
		        taxPrice: taxPrice,
		        sumPrice: sumPrice
		    };
		});

	AUIGrid.updateRowsById(myGridID, item);

	const totalSalePrice = AUIGrid.getGridData(myGridID).reduce((sum, cur) => {
		return sum + (cur.sumPrice || 0);
	}, 0);

	$("#salePrice").val(_cf_comma(Math.round(totalSalePrice)));
	$("#taxPrice").val(_cf_comma(Math.round(totalSalePrice * 0.1)));
	$("#sumPrice").val(_cf_comma(Math.round(totalSalePrice * 1.1)));
	$("#sumPriceKor").val(_cf_numToKor($("#sumPrice").val().replaceAll(',', '')));
}


/**
	20240617 기본할인율과 현재 지정된 주문처의 할인율을 받아와 기본할인율에 지정된 할인율을 덮어쓰기 해서 리스트변수에 보관하는 함수

 */
function getCustSaleDcRateList()
{
 
	const selectCustCode = $("#custCode").val();
 
	 
	$.ajax({
		type: "POST",
		url: "/logis/cCustSaleDcRate-list",
		dataType: "json",
		data: {
			workingType : "BASE-LIST",
			selectCustCode 
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		
		success: function(data) { 
			const isDcRateListInit = !isEmpty(custSaleDcRateList);  // custSaleDcRateList가 비어있지 않은경우
			
			custSaleDcRateList = data.cCustSaleDcRateList.map((item)=>{
				return {makerCode : item.makerCode
					   ,dcRate : item.dcRate 
					   ,marginRate : item.marginRate
				}
			})
			
			
			 
			$.ajax({
				type: "POST",
				url: "/logis/cCustSaleDcRate-list",
				dataType: "json",
				data: {
					workingType : "MAKER-LIST",
					selectCustCode 
				},
				async: false,
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				
				success: function(result) {
					
					for(item of result.cCustSaleDcRateList)
					{ 
						
						const custSale = custSaleDcRateList.find((row)=>{
							if(row.makerCode == item.makerCode) return true;
						}) 
						if(custSale != null)
						{
							custSale.dcRate = item.dcRate;
							custSale.marginRate = item.marginRate;
						}
						else
						{
							custSaleDcRateList.push({makerCode : item.makerCode
													   ,dcRate : item.dcRate 
													   ,marginRate : item.marginRate
												})
						}
						
						
					}
					if(isDcRateListInit && curCustCode != selectCustCode) //리스트가 빈상태로 시작하지 않고 주문처 코드의 변동이 있엇을경우
					{
						if(confirm('부품전체의 할인율을 브랜드별 할인율로 변경하시겠습니까?'))
						{
							$("#dcRate").val('0');
							setItemBrandSaleRate(true);
						} 
					}
					else 
					{
						setItemBrandSaleRate(true,false);
					} 
					curCustCode = selectCustCode;
				},
				error: function(e){
					
				}
				
			})
		},
		error: function(e){
			
		}
		
	})
	
	
}


/** 
	common-pan에 있는 fu_dcProc를 order-up.js전용으로 분리한 함수
	isOverWrite가 true면 전체 덮어쓰기. 이렇게 될 경우는 할인율을 직접입력하여 엔터치는 경우
	
	마스터의 [할인율]을 부품에 셋팅과 마스터의 공급가액과 세액 계산해줌
	할인율 우선순위 마스터 할인율 > 브랜드 할인율 > 0 // 덮어쓰기가 아니면 갱샌 행 필터에서 걸러짐
	
	기존과 같이 매개변수를 false로 하고 호출하면 단가나 수량변경시 금액 계산해서 반영
*/ 
/*
function order_dcProc(isOverWrite = false) { 
	 
	const dcDspType = $(':radio[name="dcDspType"]:checked').val() || 1; //할인가 별도 표시인데 주석처리 되어있음
	
	const taxType = $("#taxType").val() || 1; //세액유무 
	const item = AUIGrid.getGridData(myGridID).filter((row)=>{ 
		if(!AUIGrid.isRemovedById(myGridID, row.idx) && row.idx != null && row.itemId != null) return true; //행삭제 되었거나 itemID가 없는 행 제외
		return false;
	}).map((row)=>{  
		 
		const saleRate =  custSaleDcRateList?.find((item)=>{ // 할인율 리스트에서 메이커가 같은 데이터를 가져옴
		 
			if(item.makerCode == row.makerCode) return true;
		}) 
		 
		//마스터 할인율
		let dcRate = 0;
		if(isOverWrite) //덮어쓰기
		{
			dcRate =  parseInt($("#dcRate").val()) || parseInt(saleRate) || 0;   
		}
		else
		{
			dcRate =  parseInt(row.curSaleRate) || parseInt($("#dcRate").val()) || parseInt(saleRate?.dcRate) || 0 ; 
		 
		} 
		
		if(!isEmpty(custSaleDcRateList) && dcRate == 0 && $("#estiNo").val() == '' && $("#orderNo").val()== '' ) //견적이 아니면서 할인율이 0인경우
		{
			const saleRateInfo = (custSaleDcRateList.find((item)=>{ // 할인율 리스트에서 메이커가 같은 데이터를 가져옴
												if(item.makerCode == row.makerCode) return true;
											}))
			dcRate = saleRateInfo? saleRateInfo.dcRate || 0 : 0 ; 
	 
		}   
		const unitPrice = row.unitPrice;
		const dcExceptYN = row.dcExceptYN || 'N';
		
		//할인율 개별표시 및 이라고 주석 달려있엇음
		const savePrice = (dcDspType == 1 && dcExceptYN == 'N')? Math.ceil(unitPrice * (dcRate / 100)) : 0;
		const ceilUnit = row.ceilUnit || 0 ;
		
		//올림단위가 0이 아니면 해당숫자로 나눈다음 곱하는데 왜 그런지는 모르겠음...
		let resultPrice = ceilUnit!=0? Math.ceil((unitPrice - savePrice)/ceilUnit) * ceilUnit  : unitPrice - savePrice;
		
								//세액 유무 여부에 따라 계산 분기
		const sumPrice  =   taxType == 1 ? resultPrice                   : Math.round(resultPrice/1.1); 
		const taxPrice  =   taxType == 1 ? Math.round(resultPrice * 0.1) : resultPrice- Math.round(resultPrice/1.1);  
		
		if(taxType != 1) resultPrice = Math.round(resultPrice/1.1); 

		//할인율이 문자열로 들어있는것과 숫자로 들어있는것이  혼재 되어있어서 수정표시 안뜨게 하기 위해 넣음
		const nextsaleRate = parseInt(row.curSaleRate) == parseInt(dcRate) ? row.curSaleRate : `${dcRate}`;
		
		return {  idx : row.idx 
				, salePrice: resultPrice //,	isChecked: event.checked
				, sumPrice: sumPrice * row.cnt
				, taxPrice: taxPrice
				, curSaleRate : nextsaleRate
				 }
		
		
	}) 
	AUIGrid.updateRowsById(myGridID, item);
	
	const totalSalePrice = AUIGrid.getGridData(myGridID).reduce((sum , cur )=>{ 
    return  sum + cur.sumPrice || 0;                           
	},0) 
	
	$("#salePrice").val(_cf_comma(Math.round(totalSalePrice)));
	$("#taxPrice").val(_cf_comma(Math.round(totalSalePrice * 0.1)));
	$("#sumPrice").val(_cf_comma(Math.round(totalSalePrice*1.1)));
	$("#sumPriceKor").val(_cf_numToKor(	$("#sumPrice").val().replaceAll(',','')));
 
 
 
} 
*/

function order_dcProc(isOverWrite = false) { 
	const dcDspType = $(':radio[name="dcDspType"]:checked').val() || 1;
	const taxType = $("#taxType").val() || 1;

	const item = AUIGrid.getGridData(myGridID).filter((row) => {
		return !AUIGrid.isRemovedById(myGridID, row.idx) && row.idx != null && row.itemId != null;
	}).map((row) => {

		const isDiscountApplicable = !row.otherSaleType || row.otherSaleType.trim() === '';
		const saleRate = custSaleDcRateList?.find(item => item.makerCode == row.makerCode);

		let dcRate = 0;

		if (isDiscountApplicable) {
			// 할인 적용 대상
			if (isOverWrite) {
				dcRate = parseInt($("#dcRate").val()) || parseInt(saleRate?.dcRate) || 0;
			} else {
				dcRate = parseInt(row.curSaleRate) || parseInt($("#dcRate").val()) || parseInt(saleRate?.dcRate) || 0;
			}

			// 견적/주문 번호가 없고 할인율이 0인 경우 → 할인율 재조회
			if (!isEmpty(custSaleDcRateList) && dcRate === 0 && $("#estiNo").val() === '' && $("#orderNo").val() === '') {
				const saleRateInfo = custSaleDcRateList.find(item => item.makerCode == row.makerCode);
				dcRate = saleRateInfo ? saleRateInfo.dcRate || 0 : 0;
			}
		} else {
			// 할인 제외 대상 (otherSaleType 값 존재함)
			dcRate = 0;
		}

		const unitPrice = row.unitPrice;
		const dcExceptYN = row.dcExceptYN || 'N';

		// 할인 금액 계산
		const savePrice = (dcDspType == 1 && dcExceptYN === 'N') ? Math.ceil(unitPrice * (dcRate / 100)) : 0;
		const ceilUnit = row.ceilUnit || 0;

		let resultPrice = ceilUnit !== 0
			? Math.ceil((unitPrice - savePrice) / ceilUnit) * ceilUnit
			: unitPrice - savePrice;

		// 세액 계산
		const sumPrice = taxType == 1 ? resultPrice : Math.round(resultPrice / 1.1);
		const taxPrice = taxType == 1 ? Math.round(resultPrice * 0.1) : resultPrice - Math.round(resultPrice / 1.1);

		if (taxType != 1) resultPrice = Math.round(resultPrice / 1.1);

		const nextsaleRate = parseInt(row.curSaleRate) === parseInt(dcRate) ? row.curSaleRate : `${dcRate}`;

		return {
			idx: row.idx,
			salePrice: resultPrice,
			sumPrice: sumPrice * row.cnt,
			taxPrice: taxPrice,
			curSaleRate: nextsaleRate
		};
	});

	AUIGrid.updateRowsById(myGridID, item);

	const totalSalePrice = AUIGrid.getGridData(myGridID).reduce((sum, cur) => {
		return sum + (cur.sumPrice || 0);
	}, 0);

	$("#salePrice").val(_cf_comma(Math.round(totalSalePrice)));
	$("#taxPrice").val(_cf_comma(Math.round(totalSalePrice * 0.1)));
	$("#sumPrice").val(_cf_comma(Math.round(totalSalePrice * 1.1)));
	$("#sumPriceKor").val(_cf_numToKor($("#sumPrice").val().replaceAll(',', '')));
}


$("#dcRate").keydown(function(e){ 
	if(e.keyCode == 13)
	{
		order_dcProc(true);
	}
})