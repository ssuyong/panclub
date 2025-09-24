
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
var myGridID1;

function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	//console.log("custcode:: "+ $("#custCode").val());
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){
	
	//제조사코드에 셋팅
  	findSrchCodeMaker("/base/code-list");
  	
  	keyValueList1 = findSrchCode2("/base/code-list");
  	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(keyValueList1);	
	createAUIGrid1();
 	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);

	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/base/itemAdd", "ADD");
	});
	$("#btnUpt").click(function(){
		//alert("등록버튼");
		updateDataToServer("/base/itemAdd", "UPT");
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("상품이 삭제되면 복구가 불가능 합니다.삭제하시겠습니까?")){
			updateDataToServer("/base/itemAdd", "DEL");
		}
	});
		
	let itmeId = $("#itemId").val();
	
	if (itmeId !=''){
		//alert("custcode:"+custCode);
		findServer('/base/item-list');
		findMemo ('/base/item-memo-list');
		
	}	

	// textarea 키업 핸들러
	$("#myTextArea").keyup(function(event) {
		var value = $(this).val();
	});
	// textarea 확인 
	$("#confirmBtn").click(function(event) {
		//console.log("1");
		var value = $("#myTextArea").val();
		forceEditngTextArea(value);
	});

	// textarea 취소
	$("#cancelBtn").click(function(event) {
		$("#textAreaWrap").hide();
	});
	
		$("#btnRegMemo").click(function() {
		//alert("저장버튼");
		updateDataToServer3("/base/itemMemoAdd","DEL");
	});
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	var keyValueList2 = JSON.parse(keyValueList1);
	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "idx",      headerText : "idx", width : 80, visible : false  }
		,{ dataField : "makerCode_oe",      headerText : "제조사", sortType: 1, width : 250 , editable: true, style : "auigrid-must-col-style"
			,labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
				var retStr = value;
				for (var i = 0, len = keyValueList2.length; i < len; i++) {
					if (keyValueList2[i]["code"] == value) {
						retStr = keyValueList2[i]["value"];
						break;
					}
				}
				return retStr;
			},
				editRenderer: {
				type: "DropDownListRenderer",
				list: keyValueList2,
				keyField: "code", // key 에 해당되는 필드명
				valueField: "value" // value 에 해당되는 필드명
			},	
		}
		,{ dataField : "oeNo",      headerText : "정품품번", style : "auigrid-must-col-style"  }
		,{ dataField : "oeNo2",      headerText : "정품품번", style : "auigrid-must-col-style", visible : false  }
		//,{ dataField : "makerName",      headerText : "제조사명", width : 50, editable : false, visible : false  }
		,{dataField: "validYN", headerText: "사용유무",width : 150,
		style : "aui-grid-user-custom",
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
				editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
				checkValue : "Y", // true, false 인 경우가 기본
				unCheckValue : "N",
				
				//사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
				checkableFunction :  function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
					// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
					if(item.charge == "Anna") {
						return false;
					}
					return true;
				}
			},
		}
		,{ dataField : "regUserName_oe", headerText : "등록자",width : 250} 
		,{ dataField : "created_oe",     headerText : "등록일"}
		//,{ dataField : "uptUserId_oe",      headerText : "수정자", width: 200 }
		//,{ dataField : "modified_oe",     headerText : "수정일", width: 250 }
		
	];		

	// 그리드 속성 설정
	var gridPros = {

	
		editable : true,		

		//showStateColumn : true,
		
		rowIdField: "oeNo2",
		
		showRowCheckColumn: false,


		// 셀 선택모드 (기본값: singleCell)
		selectionMode: "multipleCells",
		
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		
	
		
	};	
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	
	
	// 셀 선택변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		var primeCell = event.primeCell;
	});

};	


// 데이터 서버로 보내기
function updateDataToServer( url, workingType ) {
	//setStartSpinner();
	
	var itemId = $("#itemId").val();  
    var itemCode = $("#itemCode").val(); 
    var makerCode = $("#makerCode").val(); 
    var itemNo = $("#itemNo").val(); 
    var factoryNo = $("#factoryNo").val(); 
    var carType = $("#carType").val(); 
    var itemName = $("#itemName").val(); 
    var itemNameEn = $("#itemNameEn").val(); 
    var brandCode = $("#brandCode").val(); 
    var saleBrandCode = $("#saleBrandCode").val(); 
    var genuineYN = ""; //$("#genuineYN").val(); 
    var itemExchangeId = $("#itemExchangeId").val(); 
    var centerPrice = $("#centerPrice").val(); 
    var inPrice = $("#inPrice").val(); 
    var salePrice = $("#salePrice").val(); 
    var productYear = $("#productYear").val(); 
    var home = $("#home").val(); 
    var equipPlace = $("#equipPlace").val();
    var color = $("#color").val(); 
    var shine = $("#shine").val(); 
    var weight = $("#weight").val(); 
    var cbm = $("#cbm").val(); 
    var width = $("#width").val(); 
    var depth = $("#depth").val(); 
    var height = $("#height").val();  
  
     
    var isGenuine = $('input:checkbox[name=genuineYN]').is(':checked');
	if(isGenuine == true){
	  	genuineYN = "Y";
	 }else{
	  	genuineYN = "N";
	 }
 
 	 /* 2024.09.30 select박스로 변경되어 주석.sg
 	 var isShare = $('input:checkbox[name=shareYN]').is(':checked');
 	 if(isShare == true){
	  	shareYN = "Y";
	 }else{
	  	shareYN = "N";
	 }
	 */
	 let shareYN = $("#shareYN").val();
	 
	 var classCode = $("#classCode").val();
	 var consignCustCode = $("#consignCustCode").val();
	
	 var isDcExceptYN = $('input:checkbox[name=dcExceptYN]').is(':checked');  //할인제외여부
 	 if(isDcExceptYN == true){
	  	dcExceptYN = "Y";
	 }else{
	  	dcExceptYN = "N";
	 } 
	 var isImmediateRlYN = $('input:checkbox[name=immediateRlYN]').is(':checked'); 
	 if(isImmediateRlYN == true){
	  	immediateRlYN = "Y";
	 }else{
	  	immediateRlYN = "N";
	 }
	 var noRealYN = $('input:checkbox[name=noRealYN]').is(':checked'); 
	 if(noRealYN == true){
	  	noRealYN = "Y";
	 }else{
	  	noRealYN = "N";
	 }
	 
	 // AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);    
	  
    //필수값 체크
    if (itemCode == '') {	alert("상품코드는 필수 입력해야 합니다.");		  $("#itemCode").focus();		return;	}
    if (makerCode == '') {	alert("제조사는 필수 입력해야 합니다.");   $("#makerCode").focus();		return;	}
    if (itemNo == '') {	alert("품번은 필수 입력해야 합니다.");  $("#itemNo").focus();		return;	}
    
 
	/*
	var isValid1 = AUIGrid.validateGridData(myGridID, ["itemNo", "unitPrice", "cnt"], "품번, 수량, 입고단가 필드는 반드시 값을 직접 입력해야 합니다.");
	if (isValid1 == false || isValidChanged1 == false) {
		document.getElementById('btnReg').classList.toggle('disabled');
		//setStopSpinner();
		return;
	}
	*/
	var data = {};

	//console.log("addList : " + addList);
	
	if(addList.length > 0) data.itemOeAdd = addList;
	else data.itemOeAdd = [];
	
	if(updateList.length > 0) data.itemOeUpdate = updateList;
	else data.itemOeUpdate = [];
	
	if(removeList.length > 0) data.itemOeRemove = removeList;
	else data.itemOeRemove = [];
	
	//return;
	
	data.workingType = workingType;
	data.itemId  = itemId;   
    data.itemCode  = itemCode; 
    data.makerCode  = makerCode; 
    data.itemNo  = itemNo; 
    data.factoryNo  = factoryNo; 
    data.carType  = carType; 
    data.itemName  = itemName; 
    data.itemNameEn  = itemNameEn; 
    data.brandCode  = brandCode; 
    data.saleBrandCode  = saleBrandCode; 
    data.genuineYN  = genuineYN; 
    data.itemExchangeId  = itemExchangeId; 
    data.centerPrice  = centerPrice; 
    data.inPrice  = inPrice; 
    data.salePrice  = salePrice; 
    data.productYear  = productYear; 
    data.home  = home; 
    data.equipPlace  = equipPlace; 
    data.color  = color; 
    data.shine  = shine; 
    data.weight  = weight; 
    data.cbm  = cbm; 
    data.width  = width; 
    data.depth  = depth; 
    data.height  = height; 
    data.shareYN = shareYN;
    data.classCode = classCode;
    data.consignCustCode = consignCustCode;
    data.dcExceptYN = dcExceptYN;
    data.immediateRlYN = immediateRlYN;
    data.noRealYN = noRealYN;
        
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    contentType: "application/json; charset=utf-8",
	    //contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data : JSON.stringify(data),
	    success: function(data) {
		  	//setStopSpinner();
	        //alert("성공:"+data.success);
	        alert(data.result_code+":"+data.result_msg);
	        location.reload();
	    },
	    error:function(request, status, error){
		 	//setStopSpinner();
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};



// 품목 조회
function findServer(url) {
	var itemId = $("#itemId").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"itemId":itemId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.itemList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.itemList.length;i++){
				    itemId = data.itemList[i].itemId; 
					itemCode = data.itemList[i].itemCode; 
					makerCode = data.itemList[i].makerCode; 
					itemNo = data.itemList[i].itemNo;
					factoryNo = data.itemList[i].factoryNo; 
					carType = data.itemList[i].carType; 
					itemName = data.itemList[i].itemName; 
					itemNameEn = data.itemList[i].itemNameEn; 
					brandCode = data.itemList[i].brandCode; 
					saleBrandCode = data.itemList[i].saleBrandCode; 
					genuineYN = data.itemList[i].genuineYN; 
					itemExchangeId = data.itemList[i].itemExchangeId; 
					centerPrice = data.itemList[i].centerPrice; 
					inPrice = data.itemList[i].inPrice; 
					salePrice = data.itemList[i].salePrice; 
					productYear = data.itemList[i].productYear; 
					home = data.itemList[i].home; 
					equipPlace = data.itemList[i].equipPlace; 
					color = data.itemList[i].color; 
					shine = data.itemList[i].shine; 
					weight = data.itemList[i].weight; 
					cbm = data.itemList[i].cbm; 
					width = data.itemList[i].width;
					depth = data.itemList[i].depth;  
					height = data.itemList[i].height;
					classCode = data.itemList[i].classCode;
					shareYN = data.itemList[i].shareYN;  //2024.09.30 sg 이거에서 앞에걸로 다시 변경 shareYN = 'Y'// data.itemList[i].shareYN;  
					consignCustCode = data.itemList[i].consignCustCode;
					consignCustName = data.itemList[i].consignCustName;
					dcExceptYN = data.itemList[i].dcExceptYN;
					immediateRlYN = data.itemList[i].immediateRlYN;
					noRealYN = data.itemList[i].noRealYN;
					$("#itemId").val(itemId); 
					$("#itemCode").val(itemCode); 
					$("#makerCode").val(makerCode); 
					$("#itemNo").val(itemNo);
					$("#factoryNo").val(factoryNo); 
					$("#carType").val(carType); 
					$("#itemName").val(itemName); 
					$("#itemNameEn").val(itemNameEn); 
					$("#brandCode").val(brandCode); 
					$("#saleBrandCode").val(saleBrandCode);					
					if (genuineYN=='Y'){
						$('#genuineYN').prop('checked', true);
					}else{
						$('#genuineYN').prop('checked', false);
					}	
					$("#itemExchangeId").val(itemExchangeId); 
					$("#centerPrice").val(centerPrice); 
					$("#inPrice").val(inPrice); 
					$("#salePrice").val(salePrice); 
					$("#productYear").val(productYear); 
					$("#home").val(home); 
					$("#equipPlace").val(equipPlace); 
					$("#color").val(color); 
					$("#shine").val(shine); 
					$("#weight").val(weight); 
					$("#cbm").val(cbm); 
					$("#width").val(width);
					$("#depth").val(depth);
					$("#height").val(height);  
					
					$("#classCode").val(classCode);
					/*2024.09.30 sg - select로 변경되어 주석
					if (shareYN=='Y'){
						$('#shareYN').prop('checked', true);
					}else{
						$('#shareYN').prop('checked', false);
					}
					*/	
					$("#shareYN").val(shareYN); 
					$("#consignCustCode").val(consignCustCode);
					$("#consignCustName").val(consignCustName);
					if (dcExceptYN=='Y'){
						$('#dcExceptYN').prop('checked', true);
					}else{
						$('#dcExceptYN').prop('checked', false);
					}	
					
					if (immediateRlYN=='Y'){
						$('#immediateRlYN').prop('checked', true);
					}else{
						$('#immediateRlYN').prop('checked', false);
					}	
					if (noRealYN=='Y'){
						$('#noRealYN').prop('checked', true);
					}else{
						$('#noRealYN').prop('checked', false);
					}	
					
					//거래처코드 비활성화
					//$('#itemId').attr('disabled', true); 
					//등록버튼 비활성화, 수정/삭제 활성화
					document.getElementById('btnReg').classList.toggle('disabled'); 
					//if (dcExceptYN = data.itemList[i].stockPlace == '자사재고') {
					if (dcExceptYN = data.itemList[i].comCode == lcd) {						
						document.getElementById('btnUpt').classList.toggle('disabled'); 
						document.getElementById('btnDel').classList.toggle('disabled');
						$("#gui-topbtn-side").css("display","none");
					}else{
						$("#gui-topbtn-side").css("display","initial");
					}
				}		
				findOeNo ('/base/itemOe-list');
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

//정품번호 찾기 
function findOeNo(url) {
	var list = [];
	var itemId = $("#itemId").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"itemId":itemId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			if (data.itemOeList.length == 0){
				
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{		
				for(i=0;i<data.itemOeList.length;i++){
				    list.push({
						makerCode_oe: data.itemOeList[i].makerCode 
						,oeNo: data.itemOeList[i].oeNo 
						,validYN: data.itemOeList[i].validYN 
						,regUserName_oe: data.itemOeList[i].regUserName 
						,created_oe: data.itemOeList[i].created 
						,uptUserId_oe: data.itemOeList[i].uptUserId 
						,modified_oe: data.itemOeList[i].modified 		
						,oeNo2: data.itemOeList[i].oeNo 			
					});
					
				}		
				AUIGrid.setGridData("#grid_wrap", list);
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




// 데이터 요청 Ajax
function findSrchCodeMaker(url) {
	
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
					$("#makerCode").append("<option value='"+code+"' >"+code+" : "+codeName+"</option>");
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


//제조사변경시 상품코드 변경
/*
function fn_itemCodeCreate(){
	//상품id 존재하는 경우는 변경안됨
	
	if ($("#itemId").val()=="") {
		var itemCode_val = "";
		var comCode_val = $("#logComCode").val();
		var makerCode_val = $("#makerCode").val(); 
		var classCode_val = $("#classCode").val();
		console.log("a:"+comCode_val);
		console.log("a:"+makerCode_val);
		console.log("a:"+classCode_val);
		
		
		itemCode_val = comCode_val + "-" + makerCode_val + "-" + classCode_val;
		console.log("va:"+itemCode_val);
		$("#itemCode").val(itemCode_val);		
	}
	
}
*/

// 데이터 요청 Ajax
function findSrchCode2(url) {
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
				var j = 0;
				for(i=0;i<data.codeList.length;i++){
					code = data.codeList[i].code;
					codeName = data.codeList[i].codeName; 
					list[j] = { "code": code, "value": codeName };
					j = j + 1;
					}
				}
			
			listS = JSON.stringify(list); //JSON 형식을 변환해줌!!!
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
	return listS;
}
//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj,name) {
   
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
		
	//console.log("row1:"+rowItem.itemNo);
	//$("#consignCustCode").val(rowItem.custCode);
	//$("#consignCustName").val(rowItem.custName);
	//$(obj).val(rowItem.custCode);
	//$("#"+name+"").val(rowItem.custName);
	$("#consignCustCode").val(rowItem.custCode);
	$("#consignCustName").val(rowItem.custName);
	
	var dialogCust;
	dialogCust = $( "#dialog-form-cust");			
	dialogCust.dialog("close");
	
}
		
		
		
//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
	
	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	//console.log("row1:"+rowItem.itemNo);
	$("#consignCustCode").val(rowItem.custCode);
	$("#consignCustName").val(rowItem.custName);
	
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
			"확인": updateGridRow			,
			"취소": function (event) {
				dialogCust.dialog("close");
			}
		},
	    close: function() {
	     // $( "#users tbody tr td" ).empty();	   	
	    }
	});	
			
	dialogCust.dialog("close");
		
	/*
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
 	var mName = mCodeSel.attr('mname');
 	
 	//console.log(mCode);
 	//console.log(mName);
 	
	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
	
	//var dialog;
	//dialog = $( "#dialog-form" );	
	//dialog.dialog("close");
	*/
}


// 행 추가, 삽입
function addRow(grid,rowPos) {
	var item = new Object();
	item.makerCode_oe = '',
    item.oeNo = '', 
	item.validYN = '',
	item.regUserName_oe = '',
	item.created_oe = '', 
	item.uptUserId_oe = '', 
	item.modified_oe = '', 


	AUIGrid.addRow(myGridID, item, rowPos);	
};

function removeRow() {
	AUIGrid.removeRow(myGridID, "selectedIndex");
};
	


// 추가, 수정, 삭제 된 아이템들 확인하기
function checkItems() {
	
	// 추가된 행 아이템들(배열)
	var addedRowItems = AUIGrid.getAddedRowItems(myGridID);
	 
	// 수정된 행 아이템들(배열) : 진짜 수정된 필드만 얻음.
	var editedRowItems = AUIGrid.getEditedRowColumnItems(myGridID);
	
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

//메모등록 
	$("#myTextArea").blur(function(event) {
		var relatedTarget = event.relatedTarget || document.activeElement;
		var $relatedTarget = $(relatedTarget);

		if ($relatedTarget.is("#confirmBtn")) {
			return;
		} else if ($relatedTarget.is("#cancelBtn")) { // 취소 버튼
			return;
		}
		forceEditngTextArea(this.value);
	});
	
	function forceEditngTextArea(value) {
		var dataField = $("#textAreaWrap").data("data-field");
		var rowIndex = Number($("#textAreaWrap").data("row-index"));
		value = value.replace(/\r|\n|\r\n/g, "<br/>"); // 엔터를 BR태그로 변환
		var item = {};
		item[dataField] = value;
		//console.log("2");
		AUIGrid.updateRow(myGridID1, item, rowIndex);
		$("#textAreaWrap").hide();
		updateDataToServer3("/base/itemMemoAdd");
	};
	
function createAUIGrid1() {

	// AUIGrid 칼럼 설정
	var columnLayout1 = [
		{ dataField: "memoYmd", headerText: "일자", width: 100, editable: true }
		, {
			dataField: "memo", headerText: "메모", width: 250, editable: true,
			renderer: {
				type: "TemplateRenderer"
			},
		}
		, { dataField: "regUserId", headerText: "작성자", editable: false }
		, { dataField: "idx", headerText: "idx", editable: false, visible: false }
	];

	var gridPros1 = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		editable: true,
		showRowCheckColumn: false,
		wordWrap: true,
		// No Data 메지시 미출력
		showAutoNoDataMessage: false,
		//rowIdField: "idx",

	};
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID1 = AUIGrid.create("#grid_wrap1", columnLayout1, gridPros1);

	// 에디팅 시작 이벤트 바인딩
	AUIGrid.bind(myGridID1, "cellEditBegin", function(event) {
		if (event.isClipboard) {
			return true;
		}
		createMyCustomEditRenderer(event);
		return false;// 수정 input 열지 않고 오로지 textarea 로 수정하게끔 함
	});

};
// 커스텀 에디팅 렌더러 유형에 맞게 출력하기
	function createMyCustomEditRenderer(event) {

		var dataField = event.dataField;
		var $obj;
		var $textArea;
		if (dataField == "memo") {
			$obj = $("#textAreaWrap").css({
				left: event.position.x - 12,
				top: event.position.y - 154,
				width: event.size.width - 2, // 8는 textAreaWrap 패딩값
				height: event.size.height + 70
			}).show();
			$textArea = $("#myTextArea").val(String(event.value).replace(/[<]br[/][>]/gi, "\r\n"));
			
		}

		if (dataField == "memo") {
			$obj.data("data-field", dataField);
			$obj.data("row-index", event.rowIndex);
			setTimeout(function() {
				$textArea.focus();
				$textArea.select();
			}, 16);
		}
	} 

function CSVToArray(strData, strDelimiter) {
		strDelimiter = (strDelimiter || ",");

		var objPattern = new RegExp(
			(
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
		);
		var arrMatches = null;
		while (arrMatches = objPattern.exec(strData)) {
			var strMatchedDelimiter = arrMatches[1];
			if (
				strMatchedDelimiter.length &&
				strMatchedDelimiter !== strDelimiter
			) {
				arrData.push([]);
			}
			var strMatchedValue;
			if (arrMatches[2]) {
				strMatchedValue = arrMatches[2].replace(
					new RegExp("\"\"", "g"),
					"\""
				);
			} else {
				strMatchedValue = arrMatches[3];
			}
			arrData[arrData.length - 1].push(strMatchedValue);
		}
		return (arrData);
	};
	
function addRow1(grid, rowPos) {
	var item = new Object();
	AUIGrid.addRow(myGridID1, item, rowPos);
};
function removeRow1() {
	alert("행삭제 버튼을 누른 후 확인을 눌러야 저장이 됩니다.");
	AUIGrid.removeRow(myGridID1, "selectedIndex");
};

//메모 업데이트
function updateDataToServer3(url, workingType) {

	var itemId = $("#itemId").val();

	var addList = AUIGrid.getAddedRowItems(myGridID1);
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowItems(myGridID1);
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID1);

	var data = {};

	if (addList.length > 0) data.itemMemoAdd = addList;
	else data.itemMemoAdd = [];

	if (updateList.length > 0) data.itemMemoUpdate = updateList;
	else data.itemMemoUpdate = [];

	if (removeList.length > 0) data.itemMemoRemove = removeList;
	else data.itemMemoRemove = [];

	data.workingType = workingType;
	data.itemId = itemId;
	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: JSON.stringify(data),

		success: function(data) {
			//alert("성공:"+data.success);
			alert(data.result_code + ":" + data.result_msg);
			//$("#dialog-form-RItem").dialog("close");
			//$("#dialog-form-item").dialog("close");
			var idx = data.idx;
			var regYmd = data.regYmd;
			var regUserId = data.regUserId;

			item = {
				idx: idx,
				memoYmd: regYmd,
				regUserId: regUserId
			};
			AUIGrid.updateRow(myGridID1, item, "selectedIndex");
			location.reload();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};




//메모 조회
function findMemo(url) {
	var itemId = $("#itemId").val();
	var list = [];

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			"workingType": "LIST",
			"itemId": itemId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			if (data.itemMemoList.length == 0) {				
			} else {
				for (i = 0; i < data.itemMemoList.length; i++) {
					list.push({
						idx: data.itemMemoList[i].idx
						, memo: data.itemMemoList[i].memo
						, regUserId: data.itemMemoList[i].regUserId
						, memoYmd: data.itemMemoList[i].regYmd
						, regHms: data.itemMemoList[i].regHms
						, uptUserId: data.itemMemoList[i].uptUserId
						, uptYmd: data.itemMemoList[i].uptYmd

					});
				}
			}
			AUIGrid.setGridData("#grid_wrap1", list);
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

 
$("#shareYN").change((e)=>{

	// $("#shareYN").prop('checked',true);
	//alert("공유여부는 비활성화 할수 없습니다 필요시 연구소로 연락바랍니다.")
	$("#shareYN").val('Y');
	alert("부품공유여부는 관계사공유에서 변경할 수 없습니다. \n필요 시 개발부서에 문의바랍니다.")
})



//제조사 변경시 클래스 option 셋팅해줌
$("#makerCode").change((e)=>{
 
	classSelectOptionSet();
})


function classSelectOptionSet()
{
	const isMakerCodeAM = $("#makerCode").val() == 'AT'; //현재 제조사코드가 애프터 인지 여부
	const classCode = $("#classCode");
	
	if(isMakerCodeAM && classCode.val() != 'AM') // 제조사코드가 애프터인데 클래스가 애프터가 아닐경우 
	{
		classCode.val('AM');
	}
	else if(!isMakerCodeAM && classCode.val() == 'AM') //제조사 코드가 애프터가 아닌데 클래스가 애프터의 경우 정품으로 클래스를 변경해줌
	{
		classCode.val('GN');
	}
	
	for(const option of $("#classCode").children())
	{
		// 애프터면 애프터만 활성화 나머진 비활성화
		// 다른거면 애프터는 비활성화 나머지 활성화
		const isdisabled = isMakerCodeAM ? $(option).val() != 'AM' : $(option).val() == 'AM' ;
		$(option).attr('disabled',isdisabled);
	}
	
}

//센터가 , 판매단가 변경시 애프터일땐 동일가격 방지
let beforeVal;
$("#centerPrice,#salePrice").focus(function() {

    beforeVal = $(this).val(); //기존값 저장

}).change(function()
{
	
 	const ifCenterSalePriceEqual = $("#makerCode").val() == 'AT' && $("#centerPrice").val() == $("#salePrice").val()
	if(ifCenterSalePriceEqual)
	{
		alert('애프터의 경우 센터가와 판매단가가 같을수 없습니다');
	  
		$(this).val(beforeVal);
	}
	
})