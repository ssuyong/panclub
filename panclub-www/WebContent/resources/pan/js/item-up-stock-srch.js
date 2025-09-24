
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;
let classCodeList = [];
let makerCodeList = [];

$(document).ready(function(){
	
    classCodeListFind();//클래스코드	
	//제조사코드에 셋팅
  	makerCodeListFind();
  	
 	createAUIGrid(columnLayout);
	$("#grid_wrap").css("display","contents");
 
 
	$("#btnFind").click(function(){
		findDataToServer("item-up-stock-srch");
	});
});

// 브라우저 닫을 때 자동으로 저장하기 원하면 주석 제거
// 크롬인 경우 onbeforeunload 이벤트 사용
window.onbeforeunload = function() {
	//	saveColumnLayout();
};
	 
// 칼럼 레이아웃 작성
var columnLayout = [ 
	 { dataField : "itemNo",   headerText : "검색부품" , style : "left" , width : 250, editable : false }
    ,{ dataField : "allCustQty",  headerText : "검색업체수", width : 80 ,dataType: "numeric" ,formatString: "#,##0", editable : false   }	
	,{ dataField : "allSrchCnt",  headerText : "검색횟수", width : 80 ,dataType: "numeric" ,formatString: "#,##0", editable : false   }	
    ,{ dataField : "firstSrchYmd",  headerText : "최초검색일", width : 200, editable : false  }	
    ,{ dataField : "lastSrchYmd",  headerText : "최종검색일", width : 200, editable : false   }	
	,{ dataField : "classCode", headerText: "클래스", width: 120 
	    ,renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
	           type : "DropDownListRenderer"
	           ,list :classCodeList
	           ,keyField: "code"
	           ,valueField: "codeName"
	     }
     }
	,{ dataField : "makerCode", headerText: "제조사", width: 120
		,renderer : { // 셀 자체에 드랍다운리스트 출력하고자 할 때
	           type : "DropDownListRenderer"
	           ,list :makerCodeList
	           ,keyField: "code"
	           ,valueField: "codeName"
	    }
	}
	,{ dataField : "itemName", headerText: "부품명", style: "left", width: 300 }
	,{ dataField : "centerPrice",  headerText : "센터가", width : 150 ,dataType: "numeric" ,formatString: "#,##0", style: "right"  }	
	,{ dataField : "salePrice",  headerText : "판매가", width : 150 ,dataType: "numeric" ,formatString: "#,##0", style: "right"    }	

];
 	
 
  
// AUIGrid 를 생성합니다.
function createAUIGrid(columnLayout) {
	
	var auiGridProps = {			
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
		rowIdField: "itemNo",
		showRowCheckColumn: true, //체크박스 표시 설정
        // 전체 선택 체크박스가 독립적인 역할을 할지 여부
	//	independentAllCheckBox: true,
		
		// 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
//		enterKeyColumnBase: true,

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
		
		// 푸터를 상단에 출력시킴(기본값: "bottom")
		showFooter: true,

        sortableByFormatValue :true,
			
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
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
	var rowPos = 'first';
 
	AUIGrid.setFooter(myGridID);	 
		
}

// db에서 입력된 품번리스트를 검색해서 출고 부품을 조회하는 통신기능
function findDataToServer(url) {
	var list = [];
	
	let workingType = 'ITEM_REG';
	
	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			 workingType
		},
		async: false,
		 traditional: true,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){	 
			
			if(data.stockSrchRnk.length ==0)		{
				alert("조건에 맞는 자료가 없습니다.");
				AUIGrid.clearGridData(myGridID);
			}	else			{ 
				for(i=0;i<data.stockSrchRnk.length;i++){				

					list.push({
						 itemNo: data.stockSrchRnk[i].itemNo 
						,allSrchCnt: data.stockSrchRnk[i].allSrchCnt
						,allCustQty: data.stockSrchRnk[i].allCustQty						
						,firstSrchYmd: data.stockSrchRnk[i].firstSrchYmd
						,lastSrchYmd: data.stockSrchRnk[i].lastSrchYmd
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


function classCodeListFind() // 클래스 코드 받아오는 통신
{
	$.ajax({
		type: "POST",
		url: "/base/code-list",
		dataType: "json",
		data: {
			mCode : '1100',
			validYN :'Y'
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		
		success: function(data) {   
			for(let i = 0 ; i < data.codeList.length ; i++)
			{
				//classCodeList.push(data.codeList[i].code, data.codeList[i].codeName); // 디테일 auigrid용 리스트 배열에 추가
				classCodeList.push({"code": data.codeList[i].code, "codeName":data.codeList[i].codeName}); // 디테일 auigrid용 리스트 배열에 추가 
			} 
		},
		error: function(e){			
		}		
	})	
}

function makerCodeListFind() // 메이커 코드 받아오는 통신
{
	$.ajax({
		type: "POST",
		url: "/base/code-list",
		dataType: "json",
		data: {
			mCode : '1000',
			validYN :'Y'
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		
		success: function(data) {   
			for(let i = 0 ; i < data.codeList.length ; i++)
			{
				//makerCodeList.push(data.codeList[i].code + '-' +data.codeList[i].codeName); // 디테일 auigrid용 리스트 배열에 추가
				makerCodeList.push({"code": data.codeList[i].code, "codeName":data.codeList[i].codeName}); // 디테일 auigrid용 리스트 배열에 추가  
			} 
		},
		error: function(e){			
		}		
	})	
}


// 처리
function itemUp(workingType) {
	$("#iDiv_noSrchPop").css("display","none");
	checkedItems = AUIGrid.getCheckedRowItems(myGridID);
	
	if (checkedItems.length <= 0) {
    	$("#iDiv_noSrchPop").text("ⓘ 품목을 선택하세요.");
	    $("#iDiv_noSrchPop").css("display","block");
		return;
	}


	if (workingType == 'ADD') {
		if (!confirm("부품등록 하시겠습니까?")){
			return;
		}

		let chkText='';
		
		for(row of checkedItems)
		{
			console.log("lcd:"+row.item.classCode);
			if(row.item.classCode =='' || row.item.classCode === undefined)
			{
				alert(`${row.rowIndex+1}번째 부품의 클래스를 지정해주세요`);
				return;
			} 
			if(row.item.makerCode =='' || row.item.makerCode === undefined)
			{
				alert(`${row.rowIndex+1}번째 부품의 제조사를 지정해주세요`);
				return;
			} 
			if(row.item.centerPrice =='' || row.item.centerPrice === undefined)
			{
				alert(`${row.rowIndex+1}번째 부품의 센터가를 입력해주세요`);
				return;
			} 
			if(row.item.itemName =='')
			{
				alert(`${row.rowIndex+1}번째 부품의 부품명을 입력해주세요`);
				return;
			} 
			/*
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
			*/  
		}
		
		if(chkText != '')
		{
			alert(chkText);
			return;	
		} 
	} else {
		if (!confirm("등록제외 하시겠습니까?")){
			return;
		}
	} 

	curIndex = 0;
	progressBar = $("#progress-bar");
	$("#cur").html(curIndex);
	$("#last").html(checkedItems.length);
	
	dialogProgress = $( "#dialog-form-itemProgress" ).dialog({
	    autoOpen: false,
	    height: 100,
	    //minWidth: 500,
	    width: "25%",
	    modal: true,
	    close: function() {
			progressBar.width(0);
			curIndex = -1; //다이얼로그가 닫히면 더 진행 안함 
	    }
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogProgress.dialog( "open" );	
 
	itemProcAjax(workingType,0,'');	
}	

function itemProcAjax(workingType, errCount,errText)
{
	 
	$.ajax({
	    url : "/base/itemReg",
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    //data : data,
	    data : {
			"workingType" : workingType
			,"itemNo" : checkedItems[curIndex].item.itemNo    //요청단어
			,"classCode" : checkedItems[curIndex].item.classCode    
			,"makerCode" : checkedItems[curIndex].item.makerCode
			,"itemName" : checkedItems[curIndex].item.itemName
			,"centerPrice" : checkedItems[curIndex].item.centerPrice
			,"salePrice" : checkedItems[curIndex].item.salePrice
		},
	    success: function(data) {
			if(curIndex < 0) 
			{
			 	findDataToServer('/base/item-up-stock-srch');	
				return; // 현재 인덱스가 0이하면 정지로 간주
			} 
	        curIndex++;
	        $("#cur").html(curIndex);
	        const resultErrCount = errCount+(data.result_code=='Err'?1:0);
	        const resultErrText = errText +(data.result_code=='Err'?`${checkedItems[curIndex-1].item.itemNo} 검색어:${data.result_msg}\n`:'');
	        if(checkedItems.length > curIndex)
	        {			 
				progressBar.width((curIndex *100/ checkedItems.length)+'%');
	        	itemProcAjax(workingType,resultErrCount,resultErrText);
	        }
	        else 
	        { 
				findDataToServer('/base/item-up-stock-srch');	
	        	progressBar.width('100%');
	        	//beep();
	        	setTimeout(()=>{  
				//	console.log(resultErrText);
					confirm(`처리 완료.\n${resultErrCount>0?'실패건수 : '+resultErrCount+'건\n'+resultErrText:''}`);
					$( "#dialog-form-itemProgress" ).dialog('close');
				},450);
	        } 
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
}

