
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
	
var today = new Date();
let yearAgo = new Date(today.getTime() - (730*24*60*60*1000)); // 2년전부 오늘까지
var firstDay = new Date(today); //2023.08.24 bk
firstDay.setDate(1); //2023.08.24 bk
var picker = tui.DatePicker.createRangePicker({
	language: 'ko',
    startpicker: {
        //date: today,
        date: firstDay, //2023.08.24 bk
    	input: '#startpicker-input',
        container: '#startpicker-container'
    },
    endpicker: {
        date: today,
        input: '#endpicker-input',
        container: '#endpicker-container'
    }
});	

$(document).ready(function(){
	  
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid(columnLayout);
	
	
	//hash값 있는 경우 조회처리(뒤로가기해서 오는 경우)
	if(document.location.hash){
        var HashLocationName = document.location.hash;
        HashLocationName = decodeURI(HashLocationName.replace('#info','')); //decodeURI 한글깨짐처리 
        
        var info = HashLocationName.split("!");
        
        scrollYN = "Y";
        
        var page = info[0];
        var custCode = info[1];
        var sYmd = info[2];
        var eYmd = info[3];
        var mainYN = info[4];
        
        if ( typeof custCode == 'undefined'){ custCode = ''	}
        if ( typeof sYmd == 'undefined'){ sYmd = ''	}
        if ( typeof eYmd == 'undefined'){ eYmd = ''	}
        if ( typeof mainYN == 'undefined'){ mainYN = ''	}
        
        $("#custCode").val(custCode);
		$("#startpicker-input").val(sYmd);
		$("#endpicker-input").val(eYmd);
		
        //findDataToServer("/biz/cust-ledg",page);
    }


	$("#btnPrint").click(function() {	
	 print();	
	});
  
	$("#btnFind").click(function(){
		//새로고침하면 이전값 지우기 위해 추가
		var currentPage = 1;
		var sYmd = document.getElementById("startpicker-input").value;
		var eYmd = document.getElementById("endpicker-input").value;
		var custCode_val = $("#custCode").val();
		var mainYN_val =   "N";
			if ($('input:checkbox[name=mainYN]').is(':checked') == true){
				mainYN_val = "Y";
			} 
		
		document.location.hash = '#info'+currentPage+"!"+custCode_val+"!"+sYmd+"!"+eYmd+"!"+mainYN_val;

		findDataToServer("/biz/other-receivables-list", 1);
	});
	

});

	


// 칼럼 레이아웃 작성
var columnLayout = [
	{  headerText : "거래처정보",
		children:[
			{ dataField : "no",    headerText : "순위", width : 60}, 
			{ dataField : "custCode",   headerText : "거래처코드", width: 80}, 
			{ dataField : "custName",     headerText : "거래처명(약명)", style:"left"    }
			
		]
	} 
	,{  headerText : "기존잔액", 
		children: [
			{ dataField: "balanceAmt",        headerText: "전미수"  , dataType: "numeric", formatString: "#,##0", style: "right"  , editable: false   },
        ]
    }

	,{  headerText : "매출", 
		children: [
			{ dataField: "rlAmt",        headerText: "출고"  , width : 140, dataType: "numeric", formatString: "#,##0", style: "right", editable: false    },
        	{ dataField: "depositAmt",         headerText: "입금", width : 140, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false },
        	{ dataField: "dpDcAmt",         headerText: "입금할인", width : 140, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false   }
        ]
    },
    {  headerText : "매입", 
		children: [
			{ dataField: "whAmt",        headerText: "입고" , width : 140, dataType: "numeric", formatString: "#,##0", style: "right", editable: false   },
        	{ dataField: "wdAmt",         headerText: "출금", width : 140, dataType: "numeric", formatString: "#,##0", style: "right", editable: false  },
        	{ dataField: "wdDcAmt",      headerText: "출금할인", width : 140, dataType: "numeric", formatString: "#,##0", style: "right" , editable: false   }
        ]
    },
    {  headerText : "기말잔액", 
		children: [
			{ dataField: "balanceAmt",        headerText: "미수"  , dataType: "numeric", formatString: "#,##0", style: "right"  , editable: false   },
        ]
    }
	
	
];
 


// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
		
			//footer 노출
			showFooter: true,
				
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 100,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			enableFilter: true,
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
	
	// 페이지 변경 이벤트(pageChange) 바인딩 : 현재페이지 기록
	var currentPage = 1;
	AUIGrid.bind(myGridID, "pageChange", function (event) {
		currentPage = event.currentPage;
	});
		
	// 셀 더블클릭 이벤트 바인딩 : 거래처등록 페이지로 이동
	AUIGrid.bind(myGridID, "cellDoubleClick", function (event) {
		
	});
		
}


function findDataToServer(url,page) {
	var list = [];
	
	var sYmd = document.getElementById("startpicker-input").value;
	var eYmd = document.getElementById("endpicker-input").value;
	var ymdIgnoreYN = "N";// $("#ymdIgnoreYN").val();
	if ($('input:checkbox[name=ymdIgnoreYN]').is(':checked') == true){
		ymdIgnoreYN = "Y";
	}

	var custCode = $("#custCode").val(); 

	var mainYN =   "N";
	if ($('input:checkbox[name=mainYN]').is(':checked') == true){
		mainYN = "Y";
	} //main custCode ; 

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"sYmd":sYmd,
			"eYmd":eYmd,
			"ymdIgnoreYN":ymdIgnoreYN,
			"custCode":custCode,
			"mainYN":mainYN,
			"workingType":"OTHER-RECEIVABLES"
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.custLedgList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
				location.href;	
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				for(i=0;i<data.custLedgList.length;i++){
					list.push({
						 stdYmd: data.custLedgList[i].stdYmd 
						,summary: data.custLedgList[i].summary 
						,rlAmt: data.custLedgList[i].rlAmt 
						,depositAmt: data.custLedgList[i].depositAmt
						,dpDcAmt: data.custLedgList[i].dpDcAmt 
						,whAmt: data.custLedgList[i].whAmt 
						,wdAmt: data.custLedgList[i].wdAmt 
						,wdDcAmt: data.custLedgList[i].wdDcAmt 
						,balanceAmt: data.custLedgList[i].balanceAmt
						,creditAmt: data.custLedgList[i].creditAmt
						,payableAmt: data.custLedgList[i].payableAmt
						,ledgType: data.custLedgList[i].ledgType
						,stdYearMonth: data.custLedgList[i].stdYearMonth
						,ledgCateg: data.custLedgList[i].ledgCateg
					});		
					
			
				}		
				 AUIGrid.setGridData("#grid_wrap", list);
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



//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() {
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
}

//다이얼로그창 선택하는 경우 그리드에 디스플레이 
function updateGridRowCust(obj, name) {

	var i, rowItem, rowInfoObj, dataField;
	var selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
	rowInfoObj = selectedItems[0];
	rowItem = rowInfoObj.item;
	$(obj).val(rowItem.custCode);
	$("#" + name + "").val(rowItem.custName);

	var dialogCust;
	dialogCust = $("#dialog-form-cust");
	dialogCust.dialog("close");

}
