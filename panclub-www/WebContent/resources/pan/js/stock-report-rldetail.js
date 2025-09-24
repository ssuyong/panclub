
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;



    
 
$(document).ready(function(){
	const urlParams =  (new URL(window.location.href)).searchParams;
 
	// AUIGrid 그리드를 생성합니다.
	//createAUIGrid();	
	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
	$("#btnClose").click(function(){
		//console.log("닫기");
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	 
 	createAUIGrid();
 	var yymmdd = urlParams.get('curYMD');
	var yyyymmdd = '20'+yymmdd.substr(0,2) + '-'+yymmdd.substr(2,2) + '-'+yymmdd.substr(4,2); 

	if(urlParams.get('tab') == 4)
	{
		
		rldetaildataget('/stats/stock-report-rldetail',urlParams.get('comCode') , yyyymmdd  , urlParams.get('isPartMall'));
		
	}
 	
	
});

// Master 그리드 를 생성합니다.
function createAUIGrid() {

	// AUIGrid 칼럼 설정
	var columnLayout = [		 
		 { dataField : "custName",      headerText : "출고처", width : 300, editable : false }
		,{ dataField : "itemNo",      headerText : "부품번호", width : 300, editable : false }
		,{ dataField : "itemName",      headerText : "부품명", width : 400, editable : false }
		,{ dataField : "cnt",     headerText : "수량", editable : false , width : 100, dataType: "numeric" , editable : false}
		,{ dataField : "rlSumPrice",     headerText : "가격", editable : false , width : 200, dataType: "numeric",formatString: "#,##0" , editable : false}
		,{ dataField : "storageName",     headerText : "창고위치" , width : 300, editable : false}
	];
	
	// 그리드 속성 설정
	var gridPros = {

		// singleRow 선택모드
		selectionMode: "multiRow",
		editable : true,			
		// 상태 칼럼 사용
		//showStateColumn : true,
		//rowIdField: "idx",
		showRowCheckColumn: false,
		showRowNumColumn: false,
		selectionMode: "multipleCells",
		showAutoNoDataMessage : false, 
		showFooter: true,
	
	};

		
	//var auiGridProps = {};
			
	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, gridPros);
	AUIGrid.setFooter(myGridID, footerLayout);

	
};

var footerLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	},  
		{		dataField: "cnt",		positionField: "cnt",		operation: "SUM",		formatString: "#,##0"	}, 
		{		dataField: "rlSumPrice",		positionField: "rlSumPrice",		operation: "SUM",		formatString: "#,##0"	}, 
		];

function auiCellEditingHandler(event) {
	if (event.type == "cellEditBegin") {
		//document.getElementById("editBeginDesc").innerHTML = "에디팅 시작(cellEditBegin) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	} else if (event.type == "cellEditEnd") {
		
	} else if (event.type == "cellEditCancel") {
		//document.getElementById("editBeginEnd").innerHTML = "에디팅 취소(cellEditCancel) : ( " + event.rowIndex + ", " + event.columnIndex + " ) " + event.headerText + ", value : " + event.value;
	}
};	
	

		
// url :  /stats/stock-report-rldetail
function rldetaildataget(url, comCode, yyyymmdd,isPartMall)
{

	var list = [];
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			comCode,
			yyyymmdd,
			isPartMall
			
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			 
			if (data.rlReportDetailItem.length == 0){
				//alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.rlReportDetailItem.length;i++){
				    list.push({						  
						 custName: data.rlReportDetailItem[i].custName
						,itemNo: data.rlReportDetailItem[i].itemNo  
						,itemName: data.rlReportDetailItem[i].itemName 
						,cnt: data.rlReportDetailItem[i].cnt 
						,rlSumPrice: data.rlReportDetailItem[i].rlSumPrice 
						,storageName: data.rlReportDetailItem[i].storageName
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
 