var today = new Date();
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
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
        
    
        
        //console.log("HashLocationName:"+HashLocationName);
        
		
        findDataToServer("/biz/userLog");
    
    }
    
     else {	
  	}
  	
  	
  
	$("#btnLogFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		
		var currentPage = 1;
		var name_val = $("#name").val(); 
		var empNo_val = $("#empNo").val();
		var offMail_val = $("#offMail").val();
		document.location.hash = '#info'+currentPage+"!"+name_val+"!"+empNo_val+"!"+offMail_val;
		
		
		findDataToServer("/biz/userLog", 1);
	});
	$("#btnStaffReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/biz/userLog", "workingType");
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
	 { dataField : "hisIdx",    headerText : "순번"}, 
	 { dataField : "comCode",    headerText : "회사코드"},
	 { dataField : "comName",    headerText : "회사명"},
	 { dataField : "userId",    headerText : "사용자아이디"},
	 { dataField : "userName",    headerText : "사용자명", width: 100},
	 { dataField : "logIp",    headerText : "로그IP", width: 100},
	 { dataField : "created",    headerText : "접속시간"}
	
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
		
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	

	var rowPos = 'first';
	
	
	// 선택 변경 이벤트 바인딩
	AUIGrid.bind(myGridID, "selectionChange", function(event) {
		// 선택 대표 셀 정보 
		var primeCell = event.primeCell; 
		
	});
	

	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
}



function findDataToServer(url,page) {
	var list = [];
    var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	var userId = $("#userId").val();
	var comCode = $("#comCode").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"userId": userId,
			"comCode": comCode
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.userLog1.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				console.log("chekcin")
				for(i=0;i<data.userLog1.length;i++){
					list.push({
						hisIdx: data.userLog1[i].hisIdx 
						,comCode: data.userLog1[i].comCode 
						,comName: data.userLog1[i].comName 
						,userId: data.userLog1[i].userId 
						,userName: data.userLog1[i].userName
						,logIp: data.userLog1[i].logIp 
						,created: data.userLog1[i].created 
						
					});
					}
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
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
		var columnStr = JSON                       .stringify(columns);
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
