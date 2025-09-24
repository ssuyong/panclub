
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){
	  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);

	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
    	//fnViewType(info[11]);
        //f_category_sub(info[0],info[1],info[2],info[3],info[4],info[5],info[6],info[7],info[8],info[9],info[10],info[11],info[12],info[13]);
        
        var page = info[0];
        var name = info[1];
        var empNo = info[2];
        var offMail = info[3];
        
        console.log("HashLocationName:"+HashLocationName);
        $("#name").val(name);
		$("#empNo").val(empNo);
		$("#offMail").val(offMail);
		
        findDataToServer("/biz/staff-list",page); //안되면 staff-list 에서 찾을 수 있는가 확인해봐야함
    	myCustomFilter1()
    
    }
    
     else {	
  	}
  	
  	
  
	$("#btnStaffFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		
		var currentPage = 1;
		var name_val = $("#name").val(); 
		var empNo_val = $("#empNo").val();
		var offMail_val = $("#offMail").val();
		document.location.hash = '#info'+currentPage+"!"+name_val+"!"+empNo_val+"!"+offMail_val;
		
		
		findDataToServer("/biz/staff-list", 1);
	});
	$("#btnStaffReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/biz/staffAdd", "workingType");
	});
	
	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.
	//requestData("./data/normal_500.json");
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//alert("dd");
	///	saveColumnLayout();
};
	


// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "empNo_origin",    headerText : "#사번",visible: false}, 
	 { dataField : "empNo",    headerText : "사번",width: 80}, 
	 { dataField : "name",    headerText : "이름"},
	 { dataField : "ename",    headerText : "영문이름",visible: false},
	 { dataField : "imageRoot",    headerText : "사진",visible: false},
	 { dataField : "dutyCode",    headerText : "직책", width: 100},
	 { dataField : "positionCode",    headerText : "직위", width: 100},
	 { dataField : "classCode",    headerText : "직급",visible: false},
	 { dataField : "branchCode",    headerText : "지점"},
	 { dataField : "deftCode",    headerText : "부서"},
	 { dataField : "phone1",    headerText : "연락처1",width: 200},
	 { dataField : "phone2",    headerText : "연락처2",visible: false},
	 { dataField : "gender",    headerText : "성별",visible: false},
	 { dataField : "birth",    headerText : "생년월일", width: 100},
	 { dataField : "offMail",    headerText : "회사메일",width:230},
	 { dataField : "mail",    headerText : "개인메일",width:230},
	 { dataField : "addr1",    headerText : "주소",width:300},
	 { dataField : "zipCode",    headerText : "우편번호"},
	 { dataField : "startYmd",    headerText : "입사일"},
	 { dataField : "finYmd",    headerText : "퇴사일"},
	 { dataField : "panclubUserId",    headerText : "4CAR ID"},
	 { dataField : "regUserId",    headerText : "등록자",visible: false},
	 { dataField : "created",    headerText : "등록일자",visible: false},
	 { dataField : "uptUserId",    headerText : "수정자",visible: false},
	 { dataField : "modified",    headerText : "수정일자",visible: false}
	
	
];
 

// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
			editable : true,			
			
			// 상태 칼럼 사용
			//showStateColumn : true
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 100,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,
			
			enableFilter: true,


			showStateColumn : true,
			
			rowIdField : "empNo_origin",
			showAutoNoDataMessage : false, 
			
			/*
			selectionMode : "multipleCells",
			
			// 행 고유 id 에 속하는 필드명 (필드의 값은 중복되지 않은 고유값이여야 함)
			rowIdField : "mgrIdx",
			
			
			//softRemoveRowMode 적용을 원래 데이터에만 적용 즉, 새 행인 경우 적용 안시킴
			softRemovePolicy :"exceptNew",
			
			// 칼럼 끝에서 오른쪽 이동 시 다음 행, 처음 칼럼으로 이동할지 여부
			wrapSelectionMove : true,
			
			// 읽기 전용 셀에 대해 키보드 선택이 건너 뛸지 여부 (기본값 : false)
			skipReadonlyColumns : true,
			
			// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
			enterKeyColumnBase : true,
			
			// selectionChange 이벤트 발생 시 간소화된 정보만 받을지 여부
			// 이 속성은 선택한 셀이 많을 때 false 설정하면 퍼포먼스에 영향을 미칩니다.
			// selectionChange 이벤트 바인딩 한 경우 true 설정을 권합니다.
			simplifySelectionEvent : true */
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	

	var rowPos = 'first';
	
	
	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
	});
	
	// 에디팅 시작 이벤트 바인딩
	// 에디팅 정상 종료 직전 이벤트 바인딩
	// 에디팅 정상 종료 이벤트 바인딩
	// 에디팅 취소 이벤트 바인딩
	//AUIGrid.bind(myGridID, ["cellEditBegin", "cellEditEndBefore", "cellEditEnd", "cellEditCancel"], auiCellEditingHandler);
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
}


function findDataToServer(url,page) {
	var list = [];
	var sYmd = $("#sYmd").val();
	var eYmd = $("#eYmd").val();
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}
	//console.log(ymdIgnoreYN);
	var name = $("#name").val();
	var empNo = $("#empNo").val();
	var offMail = $("#offMail").val();

	//console.log("url:"+url);
	//console.log("custType:"+custType);
	//console.log("empNo:"+empNo);
	//console.log("localName:"+localName);
	
	if (sYmd=='' && eYmd=='' && ymdIgnoreYN=='' && spaceDel(name)=='' && spaceDel(empNo)=='' && spaceDel(offMail)=='') {
		alert("검색어를 입력하세요.");
		return false;
	}
	//$("#iDiv_noDataPop").css("display","none");

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"name":name,
			"empNo":empNo,
			"offMail":offMail
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		
		success:function(data){
			
			if (data.staffList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
			
					
				for(i=0;i<data.staffList.length;i++){
				//	console.log("finYmd" + data.staffList[i].finYmd)
					list.push({
						 empNo_origin: data.staffList[i].empNo,
						 empNo: data.staffList[i].empNo,
						 name: data.staffList[i].name, 
						 ename: data.staffList[i].ename, 
						 imageRoot: data.staffList[i].imageRoot,						 
						 dutyCode: data.staffList[i].dutyCode, 
						 positionCode: data.staffList[i].positionCode, 
						 classCode: data.staffList[i].classCode,
						 branchCode: data.staffList[i].branchCode,
						 deptCode: data.staffList[i].deptCode,					   
						 phone1: data.staffList[i].phone1, 
						 phone2: data.staffList[i].phone2, 
						 gender: data.staffList[i].gender, 
						 birth: data.staffList[i].birth, 
						 offMail: data.staffList[i].offMail,
						 mail: data.staffList[i].mail,
						 addr1: data.staffList[i].addr1,
						 zipCode: data.staffList[i].zipCode,
						 startYmd: data.staffList[i].startYmd,
						 finYmd: data.staffList[i].finYmd,
						 panclubUserId: data.staffList[i].panclubUserId,
						 regUserId: data.staffList[i].regUserId,
						 created: data.staffList[i].created,
						 uptUserId: data.staffList[i].uptUserId,
						 modified: data.staffList[i].modified
						
					});
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
				}	
				 AUIGrid.setGridData("#grid_wrap", list);
				 //console.log("list page:"+page);
				 // 해당 페이지로 이동
				 if (page > 1) {
			     	AUIGrid.movePageTo(myGridID, Number(page));
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


// AUIGrid 의 현재 칼럼 레이아웃을 얻어 보관합니다.
// 데모에서는 HTML5의 localStrage 를 사용하여 보관합니다.
// 만약 DB 상에 보관하고자 한다면 해당 정보를 Ajax 요청으로 코딩하십시오.
function saveColumnLayout() {

	// 칼럼 레이아웃 정보 가져오기
	var columns = AUIGrid.getColumnLayout(myGridID);

	if (typeof (Storage) != "undefined") { // Check browser support
		var columnStr = JSON.stringify(columns);
		var rowPos = AUIGrid.getRowPosition(myGridID); // 수직 스크롤 값
		var hPos = AUIGrid.getProp(myGridID, "hScrollPosition"); // 수평 스크롤 값(픽셀)

		localStorage.setItem("auigridLayout", columnStr);
		localStorage.setItem("auigridRow", rowPos);
		localStorage.setItem("auigridCol", hPos);

		//alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");Ch
	} else {
		//alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
};

function addRow1(grid,rowPos) {
	var item = new Object();

	AUIGrid.addRow(myGridID, item, rowPos);	
};
function removeRow1() {


	AUIGrid.removeRow(myGridID, "selectedIndex");
};


$('#emStatus').change(function() {
	 var result = $('#emStatus option:selected').val();
	 console.log("result"+ result)
	if( result == 'N'){
		myCustomFilter2();
	} else if(result == "Y"){
		myCustomFilter1();
	}else if(result == "W"){
		AUIGrid.clearFilterAll(myGridID);				
	}
})


//재직자 조회

function myCustomFilter1() {
	//console.log("a");
   //console.log("item.finYmd:"+item.finYmd)
		// 사용자 필터링 설정
		AUIGrid.setFilter(myGridID, "name", function (dataField, value, item) {
			// 이름이 "Anna" 이고, 제품을 "Galaxy Note3" 구매자만 필터링하기
		//	console.log("item.finYmd:"+item.finYmd)
			if  (item.finYmd == null || item.finYmd == "") {
				return true;
			}
			return false;
		});
};


//퇴사자 조회
function myCustomFilter2() {

		// 사용자 필터링 설정
		AUIGrid.setFilter(myGridID, "name", function (dataField, value, item) {
			// 이름이 "Anna" 이고, 제품을 "Galaxy Note3" 구매자만 필터링하기
			if  (item.finYmd != "") {
				return true;
			}
			return false;
		});
	};












//수정 삭제 해보자!!!!!!!!!!!!!!!
function updateDataToServer( url, workingType ) {
	
	
	var empNo = $("#empNo").val();  
    var name = $("#name").val(); 
    var ename = $("#ename").val(); 
    var imageRoot = $("#imageRoot").val(); 
    var dutyCode = $("#dutyCode").val(); 
    var positionCode = $("#positionCode").val(); 
    var classCode = $("#classCode").val(); 
    var branchCode = $("#branchCode").val(); 
    var deptCode = $("#deptCode").val(); 
    var phone1 = $("#phone1").val(); 
    var phone2 = $("#phone2").val(); 
    var gender = $("#gender").val(); 
    var birth = $("#birth").val(); 
    var offMail = $("#offMail").val(); 
    var mail = $("#mail").val(); 
    var addr1 = $("#addr1").val(); 
    var zipCode = $("#zipCode").val(); 
    var startYmd = $("#startYmd").val(); 
    var finYmd = $("#finYmd").val(); 
    var panclubUserId = $("#panclubUserId").val(); 
    var regUserId = $("#regUserId").val(); 
    var created = $("#created").val(); 
    var uptUserId = $("#uptUserId").val(); 
    var modified = $("#modified").val(); 
    
	
	// AUIGrid 에서 추가, 삭제, 수정된 행들 얻기
	
	// 추가된 행 아이템들(배열)
  	var addList = AUIGrid.getAddedRowItems(myGridID);                   
	// 수정된 행 아이템들(배열)
	var updateList = AUIGrid.getEditedRowColumnItems(myGridID); 
	// 삭제된 행 아이템들(배열)
	var removeList = AUIGrid.getRemovedItems(myGridID);
    
    
    var i, len, name, rowItem;
	var str = "";
	
	var isValid1 = AUIGrid.validateGridData(myGridID, ["empNo", "name", "phone1"], "사번, 이름, 연락처1 필드는 반드시 값을 직접 입력해야 합니다.");
	var isValidChanged1 = AUIGrid.validateChangedGridData(myGridID, ["empNo", "name", "phone1"], "사번, 이름, 연락처1 필드는 반드시 유효한 값을 직접 입력해야 합니다.");
	
	//console.log("isValid:"+isValid);
	if (isValid1 == false || isValidChanged1 == false) {
		return;
	}
	
	
	var data = {};
	
	
	if(addList.length > 0) data.staffAddList = addList;
	else data.staffAddList = [];
	//
	//console.log("data3:"+JSON.stringify(data));
	if(updateList.length > 0) data.staffUpdateList = updateList;
	else data.staffUpdateListe = [];
	//console.log("data4:"+JSON.stringify(data));
	if(removeList.length > 0) data.staffRemoveList = removeList;
	else data.staffRemoveList = [];

	data.workingType = workingType;

        
    console.log("url:"+url);    
    console.log("data:"+JSON.stringify(data));
	
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
	        location.reload();
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

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
	
	$("#desc_info").html("추가 개수 : " + addedRowItems.length + ", 수정 개수 : " + editedRowItems.length + ", 삭제 개수 : " + removedRowItems.length); 
	
	
	if(str == "")
		str = "변경 사항 없음";
	
	alert(str);
}
