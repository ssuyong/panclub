let myGridID;
let jsonData=[]; //데이터업로드시 저장될 json
//정산 상세내역 데이터 
let openAccInfo = null;
let openAccPart = null;

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


//마스터 auigrid 레이아웃 
const columnLayout = [ 
	{ dataField : "reqregtymd",    headerText : "작성일자", width : 90, dataType : 'date' , formatString:'yyyy-mm-dd'} 
	,{ dataField : "custName",    headerText : "업체명", width : 90} 
	,{ dataField : "insnm",    headerText : "보험사", width : 60} 
	,{ dataField : "accno",    headerText : "접수번호", width : 130} 
	,{ dataField : "mrtgnm",    headerText : "담보", width : 40} 
	,{ dataField : "cstnnm",    headerText : "담당자", width : 50} 
	,{ dataField : "carnum",    headerText : "차량번호", width : 70 } 
	,{ dataField : "carnm",    headerText : "차량명", width : 240 , style:'left'} 
	,{ dataField : "dcspay",    headerText : "청구금액", width : 85, dataType: "numeric",formatString: "#,##0"  , style:"right"} 
	,{ dataField : "reqymd",    headerText : "청구일자", width : 90, dataType : 'date' , formatString:'yyyy-mm-dd'} 
	,{ dataField : "inpinspay",    headerText : "지급금액", width : 85, dataType: "numeric",formatString: "#,##0"  , style:"right"} 
	,{ dataField : "inpinspay_ymd",    headerText : "지금일자", width : 90, dataType : 'date' , formatString:'yyyy-mm-dd'} 
	,{ dataField : "esaopstusnm",    headerText : "상태", width : 45} 
	,{ dataField : "noinspay",    headerText : "미결", width : 45} 
	,{ dataField : "uploadType",    headerText : "업로드", width : 45} 	
];

//엑셀업로드 직전 팝업 데이터 레이아웃
const excelDataColumnLayout = 
[
	
	{ dataField : "작성일자",    headerText : "작성일자", width : 75} 
	,{ dataField : "보험사",    headerText : "보험사", width : 60} 
	,{ dataField : "접수번호",    headerText : "접수번호", width : 100} 
	,{ dataField : "담보",    headerText : "담보", width : 40} 
	,{ dataField : "담당자",    headerText : "담당자", width : 50} 
	,{ dataField : "차량번호",    headerText : "차량번호", width : 70 } 
	,{ dataField : "차량명",    headerText : "차량명", width : 240 , style:'left'} 
	,{ dataField : "청구금액",    headerText : "청구금액", width : 85, dataType: "numeric",formatString: "#,##0"  , style:"right"} 
	,{ dataField : "청구일자",    headerText : "청구일자", width : 75} 
	,{ dataField : "지급금액",    headerText : "지급금액", width : 85, dataType: "numeric",formatString: "#,##0"  , style:"right"} 
	,{ dataField : "지급일자",    headerText : "지급일자", width : 75} 
	,{ dataField : "상태",    headerText : "상태", width : 45} 
	,{ dataField : "미결",    headerText : "미결", width : 45} 
	
];
 
//상세내역의 부품정보 auigrid 레이아웃
const accDetailColumnLayout = 
[
	
	{ dataField : "reqSeq",    headerText : "No", width : 40} 
	,{ dataField : "patnum",    headerText : "부품번호", width : 100} 
	,{ dataField : "patnm",    headerText : "부품명", width : 380, style:"left"} 
	,{ dataField : "qty",    headerText : "수량", width : 60, style:"right"} 
	,{ dataField : "patprc",    headerText : "청구단가", width :80 , style:"right", dataType: "numeric",formatString: "#,##0" } 
	,{ dataField : "dcrt",    headerText : "할인율", width : 70 , dataType: "numeric", } 
	,{ dataField : "buyType",    headerText : "매입구분", width : 100 }  
	,{ dataField : "itmpatsum",    headerText : "청구금액", width : 100 , style:"right", dataType: "numeric",formatString: "#,##0" }  
	,{ dataField : "patknd",    headerText : "구분", width : 100 }  
	
];


//json데이터 업로드 상단 마스터정보
const accJsonInfoColumnLayout = 
[
	{"dataField":"_rowtype_","headerText":"_rowtype_","width":100,visible:false},
	{"dataField":"reqregt_ymd","headerText":"작성일자","width":80 , dataType : 'date' , formatString:'yyyy-mm-dd'},
	{"dataField":"accno","headerText":"접수번호","width":110},
	{"dataField":"mrtgnm","headerText":"담보명","width":50},
	{"dataField":"cstnunm","headerText":"담당자","width":70},
	{"dataField":"carnum","headerText":"차량번호","width":80},
	{"dataField":"carnm","headerText":"차량명","width":150},
	{"dataField":"dcspay","headerText":"청구금액","width":70,formatString: "#,##0"  , style:"right" , dataType: "numeric"},
	{"dataField":"req_ymd","headerText":"청구일자","width":80, dataType : 'date' , formatString:'yyyy-mm-dd'},
	{"dataField":"inp_inspay","headerText":"지급금액","width":70,formatString: "#,##0"  , style:"right" , dataType: "numeric"},
	{"dataField":"inp_inspay_ymd","headerText":"지급일자","width":80, dataType : 'date' , formatString:'yyyy-mm-dd'},
	{"dataField":"patCnt","headerText":"등록부품수","width":80},  
	{"dataField":"esaopstusnm","headerText":"상태","width":60},
	{"dataField":"noinspay","headerText":"미결","width":60},  
	
	
/*
	//뭔지는 알지만 데이터 업로드시 굳이 미리 안보여줘도 될듯	
	{"dataField":"reqbizno","headerText":"요청업체 사업자번호","width":100},
	{"dataField":"insnm","headerText":"보험사","width":100},
	{"dataField":"wrh_syssn","headerText":"통합입고접수번호","width":100,visible:false},
	{"dataField":"cstnuid","headerText":"보상직원 id","width":100},
	{"dataField":"inscd","headerText":"보험사코드","width":100},
	{"dataField":"mrtg","headerText":"담보코드","width":100}, 
	{"dataField":"esaopstus","headerText":"상태코드","width":100,visible:false},   
	{"dataField":"odr","headerText":"회차","width":100}, 
	{"dataField":"reqbiznm","headerText":"요청업체명","width":100}, 
	{"dataField":"cstnnm","headerText":"보상직원명","width":100},
	{"dataField":"mdlnm","headerText":"모델","width":100},
	{"dataField":"vatrt","headerText":"부가세율","width":100},
	{"dataField":"carnumserc","headerText":"차량 뒷번호","width":100},
	{"dataField":"vat","headerText":"부가세","width":100},
	{"dataField":"autuid","headerText":"정비공장id","width":100},
	{"dataField":"fltrt","headerText":"과실율","width":100},
	{"dataField":"requid","headerText":"요청아이디","width":100},
	{"dataField":"ipscarnum","headerText":"피보험차량","width":100},
	{"dataField":"acc_ymd","headerText":"사고일자","width":100},
	{"dataField":"ordrank","headerText":"서열","width":100},  
	{"dataField":"carbdynum","headerText":"VINCODE","width":100},
	{"dataField":"autbiztel","headerText":"정비공장 연락처","width":100},
	{"dataField":"ipsownnm","headerText":"피보험자","width":100},
	{"dataField":"cstnemail","headerText":"담당자이메일","width":100},
	{"dataField":"cstntel","headerText":"보험사직원연락처","width":100},
	{"dataField":"reqmemo","headerText":"요청메모","width":100},
	{"dataField":"autbizno","headerText":"정비공장 사업자번호","width":100}, 
	{"dataField":"autbiznm","headerText":"정비공장명","width":100},   
	{"dataField":"snhpatsum","headerText":"중고부품소계금액","width":100}, 
	{"dataField":"aunpatsum","headerText":"순정부품소계금액","width":100} , 
	{"dataField":"glssum","headerText":"유리부품소계금액","width":100}, 
	{"dataField":"patdcrt","headerText":"부품할인할증률","width":100},  
	{"dataField":"patsum","headerText":"부품합계금액","width":100},
	{"dataField":"req_tm","headerText":"청구시간","width":100},  
*/	
	
	
/*	
//데이터는 있긴한데 뭔지 모르겠음
	{"dataField":"inspay","headerText":"inspay","width":100},                //  ? 
	{"dataField":"pbsyn","headerText":"pbsyn","width":100},                  //?
	{"dataField":"unclpay","headerText":"unclpay","width":100},           //?
	{"dataField":"reqsn","headerText":"reqsn","width":100},   //? 
	{"dataField":"cplnrt","headerText":"cplnrt","width":100}, // ?
	{"dataField":"cplnpay","headerText":"cplnpay","width":100},  //?
	{"dataField":"inspay_ymd","headerText":"inspay_ymd","width":100},  //?
	{"dataField":"mdlcd","headerText":"mdlcd","width":100},  //?
	{"dataField":"patapl_ymd","headerText":"patapl_ymd","width":100},  //?	
	{"dataField":"carcd","headerText":"carcd","width":100},  //?
	{"dataField":"ptnkey","headerText":"ptnkey","width":100},  //?
	{"dataField":"lassum","headerText":"lassum","width":100},   //?
	{"dataField":"optlst","headerText":"optlst","width":100},  //?
*/
	
] 

 
//json 업로드 부품정보
const accJsonDetailColumnLayout = 
[ 
	{ dataField : "itemNo",    headerText : "부품번호", width : 100} 
	,{ dataField : "itemName",    headerText : "부품명", width : 200 , style:'left'} 
	,{ dataField : "qty",    headerText : "수량", width : 80 , style : 'right'} 
	,{ dataField : "patprc",    headerText : "청구단가", width :120,formatString: "#,##0"  , style:"right" , dataType: "numeric"} 
	,{ dataField : "dcRate",    headerText : "할인율", width : 100 ,style:'right' , postfix : '%' } 
	,{ dataField : "sumPrice",    headerText : "청구금액", width : 120,formatString: "#,##0"  , style:"right" , dataType: "numeric"}  
	,{ dataField : "buyType",    headerText : "매입구분", width : 100} 
	,{ dataField : "stdpatprc",    headerText : "소비자가", width : 120,formatString: "#,##0"  , style:"right" , dataType: "numeric"}  
	,{ dataField : "patknd",    headerText : "구분", width : 100} 
]

//json 상단 푸터
const accJsonInfoFooterLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "dcspay",		positionField: "dcspay",		operation: "SUM",		formatString: "#,##0"	, style:"right"},
		{		dataField: "inp_inspay",		positionField: "inp_inspay",		operation: "SUM",		formatString: "#,##0"	, style:"right"}
];

//json 하단부품 정보 푸터
const accJsonDetailFooterLayout = [
		{		labelText: "∑",		positionField: "#base",		style: "aui-grid-my-column"	}, 
		{		dataField: "patprc",		positionField: "patprc",		operation: "SUM",		formatString: "#,##0"	, style:"right"},
		{		dataField: "sumPrice",		positionField: "sumPrice",		operation: "SUM",		formatString: "#,##0"	, style:"right"},
		{		dataField: "stdpatprc",		positionField: "stdpatprc",		operation: "SUM",		formatString: "#,##0"	, style:"right"}
];

//ins_grid_wrap
const accInsColumnLayout = 
[ 
	{ dataField : "insnm",    headerText : "보험사명", width : 100} 
	,{ dataField : "cstnnm",    headerText : "담당자", width : 80 } 
	,{dataField: "accno" ,visible:false}
]

//aui 생성
function createAUIGrid(columnLayout) {
	
	const auiGridProps = {			
		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 200,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			showAutoNoDataMessage : false,
			
			showFooter: true,
		
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, {	
																...auiGridProps , 
																showRowCheckColumn: true , 
//																independentAllCheckBox: true,
//															 	rowCheckableFunction: function (rowIndex, isChecked, item) {
//																	if (item.uploadType != "엑셀") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
//																		return false; // false 반환하면 disabled 처리됨
//																	} 
//																	return true;
//																}, 
//																rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
//																	if (item.uploadType != "엑셀") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
//																		return false; // false 반환하면 disabled 처리됨
//																	}
//																	return true;
//																}
															});
	AUIGrid.create("#excel_grid_wrap", excelDataColumnLayout , auiGridProps);
	AUIGrid.create("#accDetail_grid_wrap", accDetailColumnLayout , {...auiGridProps , showRowNumColumn : false});
	
	AUIGrid.create("#grid_wrap_jsonInfo", accJsonInfoColumnLayout , auiGridProps);
	AUIGrid.create("#grid_wrap_jsonDetail", accJsonDetailColumnLayout , auiGridProps);
	
	AUIGrid.create("#ins_grid_wrap", accInsColumnLayout ,{... auiGridProps , showRowNumColumn : false ,width:200 , height:120,showFooter:false , usePaging:false});
	
 
 
 	AUIGrid.setFooter("#grid_wrap_jsonInfo", accJsonInfoFooterLayout);
 	AUIGrid.setFooter("#grid_wrap_jsonDetail", accJsonDetailFooterLayout);
 	
// 	AUIGrid.bind(myGridID, "rowAllChkClick", function (event) { // 2023.10.13 
//	    if (event.checked) {
//	        AUIGrid.setCheckedRowsByValue(event.pid, "uploadType", ["엑셀"]);
//	    } else {
//	        AUIGrid.setCheckedRowsByValue(event.pid, "uploadType", []);
//	    }
//	});
 	
 	//조회된 마스터 더블클릭해서 상세정보 여는 이벤트
 	AUIGrid.bind("#grid_wrap", "cellDoubleClick" , (event)=>{
 		 
		accDetailOpen({wrhsyssn:event.item.wrhsyssn , reqbizno : event.item.reqbizno , accno : event.item.accno});
		
		
	} )
 
	//json데이터 업로드에서 마스터 클릭시 부품정보 나옴	
	AUIGrid.bind("#grid_wrap_jsonInfo", "cellClick" , (event)=>{
		const idx = event.item.__Idx;
		const jsonPatWorkList = jsonData.find((row)=>row.__Idx == idx).patWorkList;
		const jsonPatWorkProcList = jsonData.find((row)=>row.__Idx == idx).patWorkProcList; 
		if(jsonPatWorkList == null) 
		{
			 AUIGrid.clearGridData("#grid_wrap_jsonDetail");
			 return;
		}
		const data = [];
		
		for(i in jsonPatWorkList)
		{
			data.push({
				itemNo : jsonPatWorkList[i].patnum, 
				itemName : jsonPatWorkList[i].wgepatnm, 
				qty : jsonPatWorkList[i].co, 
				dcRate : jsonPatWorkProcList[i].patknd, 
				patprc : jsonPatWorkList[i].patprc, 
				sumPrice: jsonPatWorkProcList[i].patsum,
				patknd : jsonPatWorkList[i].patknd == 'PTKN01'? 'OEM':'',
				buyType : jsonPatWorkList[i].buytype == '' ? 'LOCAL':'',
				stdpatprc : jsonPatWorkList[i].stdpatprc
				
			})
		}
		//sumPrice 
		 
		AUIGrid.setGridData('#grid_wrap_jsonDetail' , data);
		 
	} )	
	
	//상세페이지에서 사고접수번호가 여러개라 보험사에 여러명 뜰경우 해당 셀 더블클릭시 해당 사고접수번호 데이터로 셋팅 
	AUIGrid.bind("#ins_grid_wrap" , "cellDoubleClick",(event)=>{
		const info = openAccInfo.find((row)=>row.accno == event.item.accno);
		setDetailData(info)
	})
}

//페이지 오픈
$(document).ready(function(){
	setSelectListinscd();
	setDatalistCust();
	createAUIGrid(columnLayout); 
	$("#btnFind").click(function(){ 
		searchAccData();
	}); 
})

//마스터 조회
function searchAccData()
{
 
	const data =JSON.stringify({ 
		workingType : 'LIST',
		symd1:$("#startpicker-input").val().replaceAll('-',''),
		eymd1:$("#endpicker-input").val().replaceAll('-',''),
		ymdIgnoreYN:$('#ymdIgnoreYN').is(':checked')?'Y':'N',
		custCode:$("#gvComCode").val(),
		accNo:$("#accNo").val(),
		carNum:$("#carnum").val(),
		selectInsnm:$("#selectInsnm").val(),
		accStatus:$(':radio[name="accStatus"]:checked').val(),
		closingIncludeYN: $('#closingIncludeYN').is(':checked')?'Y':'N'
	})
	
	
	$.ajax({ url : '/adj/aos-acc-list' , 
	dataType : 'json',
	type : 'POST',
	async : false,
	contentType: "application/json; charset=utf-8",
	//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	data ,
	success : (result)=>{  
		AUIGrid.setGridData("#grid_wrap",result.map((row)=>{
			return {...row , uploadType : row.wrhsyssn.includes('_')?'엑셀':'자동'}
		}));
	},
	error : (e)=>{
	}
	
	})
} 

//엑셀업로드 버튼 클릭 
function excelAdd() {
	
	var dialogXls;
	dialogXls = $( "#dialogXls-form" ).dialog({
	    autoOpen: false,
	    height: 820, 
	    width: "60%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser, */
	      	 "올리기" : ()=>{
				const gridData = AUIGrid.getGridData("#excel_grid_wrap");
				const custCode = $('#consignComCode [value="'+$("#consignComText").val()+'"]').data('custcode');
				if(!custCode)
				{
					alert('업체를 선택해주세요');
					return;
				}
				if(gridData.length == 0)
				{
					alert('불러온 엑셀데이터가 없습니다.')
					return;
				}
				excelDataUpload(gridData, 0 , progressOpen( gridData.length) , [] , custCode);
			},
	         "닫기": function() {
	        	 dialogXls.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      $( "#excelFile" ).val("");	
	      AUIGrid.clearGridData("#excel_grid_wrap");   	
	    },
	    open:()=>{AUIGrid.resize("#excel_grid_wrap");}
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogXls.dialog( "open" );
}

//엑셀업로드의 엑셀 파싱
function readExcel() {
	
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            //console.log('SheetName: ' + sheetName);
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]).filter((row)=>row['작성일자'] || row['접수번호']).map((row)=>
         																		{
																					if(row['작성일자'])
																					{ 
																						row['작성일자'] = excelDateChangeYYYYMMDD(row['작성일자']);
         																			}
         																			if(row['청구일자'])
         																			{
	         																			row['청구일자'] = excelDateChangeYYYYMMDD(row['청구일자']);
         																			}
         																			if(row['지급일자'])
         																			{
	         																			row['지급일자'] = excelDateChangeYYYYMMDD(row['지급일자']);
         																			}
         																			return row;
         																		});
           	AUIGrid.setGridData("#excel_grid_wrap",rows)
      		console.log(rows);
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

//엑셀에서 파싱되면 엑셀 시작일부터 현재날짜의 차이만큼으로 파싱되는데 이것을 yyyy-mm-dd 문자열로 변환해주는 함수
function excelDateChangeYYYYMMDD(excelDate)
{
	const excelDefaultDate = new Date(1899, 11, 30); // 엑셀날짜 시작일 1899.12.30인데 Date는 월이 0~11이라 11
	const date = new Date(excelDefaultDate.getTime()+excelDate*24*60*60*1000);
	return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${(date.getDate()).toString().padStart(2,'0')}`;
}
  
//진행바 열어주고 최대치 정보 셋팅  -> 처리중 ui
function progressOpen( lastProgress)  
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

//진행바 ui 업데이트
function progressSet(progressInfo , curProgress)
{
	if(progressInfo?.progressBar == null) return;
	progressInfo.curProgress = curProgress;
	progressInfo.progressBar.width(`${(progressInfo.curProgress * 100 / progressInfo.lastProgress)}%`);
	$("#cur").html(curProgress);
}

//실제 처리(재귀함수)
function excelDataUpload(griddata  , index , progressInfo , eArr  ,custCode)
{
 	if(griddata.length <= index )
 	{
		setTimeout(()=>{
			progressSet(progressInfo , progressInfo.lastProgress);
			if(eArr.length > 0)
		 	{
				progressEnd(`처리실패\n${eArr.length}건의 요청이 실패하였습니다\n실패 : ${eArr.reduce((a,c)=>a+'\n'+c.db_resultMsg,'')}`);
			}
			else 
			{
				progressEnd('처리성공');
				 
			}  
		},50);
		
		return;
	}
	
	
	
 	const item = griddata[index];
	console.log(item)
	$.ajax({ url : '/adj/aos-acc-add' , 
	dataType : 'json',
	type : 'POST',
	async : false,
	//contentType: "application/json; charset=utf-8",
	contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	data : { 
			workingType : 'EXCEL_ADD'
			, custCode 
			,reqregtymd : item['작성일자']
			,insnm : item['보험사']
			,accno : item['접수번호']
			,mrtgnm : item['담보']
			,cstnnm : item['담당자']
			,carnum : item['차량번호']
			,carnm : item['차량명']
			,dcspay : item['청구금액']
			,reqymd : item['청구일자']
			,inpinspay : item['지급금액']
			,inpinspayymd : item['지급일자']
			,esaopstusnm : item['상태']
			,noinspay : item['미결']
			,vatrt : 0
			,wrhsyssn : `${item['접수번호']}_${item['담당자']}_${item['지급금액']||0}`
	},
	success : (result)=>{ 
		console.log(result);
		if(result.db_resultCode == 'Err')
		{
			eArr.push(result);
		} 
	 	//console.log(item);
	 	setTimeout(()=>{
			progressSet(progressInfo , progressInfo.curProgress+1);
			excelDataUpload(griddata  , index+1 , progressInfo , eArr ,custCode )
		},20); //통신당 0.02초 딜레이줌
	},
	error : (e)=>{
	}
	
	})

} 

//엑셀업로드시 업체명 리스트 불러오는 함수 
function setDatalistCust(url) {
	var list = [];

	$.ajax({
		type: "POST",
		url: '/club/c-cust',
		dataType: "json",
		data: {

		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) { 
		 
			if (data.c_custList.length == 0) {
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			} else {
				const selectBox = $("#consignComCode");
				selectBox.append(`<option value=''></option>`) 
				
				//selectBox.append(`<option value='P (ㄱ000)' data-custCode='ㄱ000'></option>`);
				for (let i = 0; i < data.c_custList.length; i++) {
	 				if( data.c_custList[i].custCode != 'zzz')
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


// 아래 두개 함수는 마스터 조회조건에서 업체명이 commonpan 에서것을 사용하고 있어서 구현해줌
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
function updateGridRow() {
	var mCodeSel = $("#mCode option:selected"); //$("#memberSel option:selected").text();
	var mCode = mCodeSel.val();
	var mName = mCodeSel.attr('mname');


	var item = {};
	item.admCode = mCode; // $("#name").val();
	item.admName = mName; //$("#country").val();
	//item.memo = '';

	AUIGrid.updateRow(myGridID, item, currentRowIndex);
}

//조회조건중 보험사 리스트 가져옴
function setSelectListinscd()
{
	
	$.ajax({ 
		url : '/adj/aos-inscd-list' , 
		dataType : 'json',
		type : 'POST',
		async : false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {  
		},
		success : (result)=>{ 
			const select = $("#selectInsnm");
			for(item of result)
			{
				select.append(`<option>${item.aos_insnm}</option>`)
			}
		},
		error : (e)=>{
		}
		
		}
	)
	
}

//마스터의 삭제버튼 이벤트
function accInfoDeleteBtn()
{
	const auiCheckedItems = AUIGrid.getCheckedRowItems(myGridID).map((row)=>{
																				const item = row.item;
																				return {
																					custCode : item.custCode , 
																					wrhsyssn : item.wrhsyssn ,
																					accno : item.accno
																					}
																				});
	
	const progressInfo = progressOpen(auiCheckedItems.length);
	accInfoDelete(auiCheckedItems , 0 , progressInfo);
}
//
function accInfoDelete(deleteAccInfoArr , index , progressInfo)
{
	
	
	progressSet(progressInfo , progressInfo.curProgress+1);
	
	const data = {...deleteAccInfoArr[index]};
	
	$.ajax({ url : '/adj/aos-acc-add' , 
	dataType : 'json',
	type : 'POST',
	async : false,
	//contentType: "application/json; charset=utf-8",
	contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	data :{...data , workingType : 'DEL' , vatrt : 0},
	success : (result)=>{  
		console.log(result);
	},
	error : (e)=>{
	}
	
	}) 
	
	setTimeout(()=>{
		if(deleteAccInfoArr.length > index+1)
			accInfoDelete(deleteAccInfoArr , index+1 , progressInfo)
		else 
		{ 
			progressEnd('삭제완료');
			searchAccData();
		}
		
	},100)

}
//마스터의 항목 더블클릭시 상세정보 열기 위한 함수
function accDetailOpen(info) {
	
	const dialogXls = $( "#dialog-form-detail" ).dialog({
	    autoOpen: false,
	    height: 820, 
	    width: "60%",
	    modal: true,
	  
	    close: function() {
	      	detailDataReset();
	    },
	    open:()=>{ 
			const isExcel = info.wrhsyssn.includes('_');
			if(isExcel)
			{
				$("#detailDataUpload").show();	
				$("#detailExcelFile").show();
				$("#detail_carbdynum").attr('disabled' , false)
			} 
			else
			{
				$("#detailDataUpload").hide();	
				$("#detailExcelFile").hide();
				$("#detail_carbdynum").attr('disabled' , true)
			}
			accDetailInfoFind(info);
			accDetailPartFind(info);
			AUIGrid.resize("#accDetail_grid_wrap");
		}
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogXls.dialog( "open" );
}
//상세정보의 마스터정보를 가져옴
function accDetailInfoFind(info)
{
 
	const data =JSON.stringify({ 
		workingType : 'ONE',
		wrhsyssn : info.wrhsyssn,
		reqbizno : info.reqbizno
	})
	const accno  = info.accno;
	
	
	$.ajax({ url : '/adj/aos-acc-list' , 
	dataType : 'json',
	type : 'POST',
	async : false,
	contentType: "application/json; charset=utf-8",
	//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	data ,
	success : (result)=>{ 
		openAccInfo = result;
		const info = openAccInfo.find((row)=>row.accno == accno);
		
		setDetailData(info); 
		 
		AUIGrid.setGridData('#ins_grid_wrap',openAccInfo.map((row)=>{return {insnm : row.insnm , cstnnm : row.cstnnm , accno : row.accno}}))
	},
	error : (e)=>{
	}
	
	})
}
//상세정보의 부품정보를 가져옴
function accDetailPartFind(info)
{
 
	const data =JSON.stringify({ 
		workingType : 'LIST',
		wrhsyssn : info.wrhsyssn,
		reqbizno : info.reqbizno
	})
	const accno  = info.accno;
	
	
	$.ajax({ url : '/adj/aos-acc-part-list' , 
	dataType : 'json',
	type : 'POST',
	async : false,
	contentType: "application/json; charset=utf-8",
	//contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	data ,
	success : (result)=>{ 
		openAccPart = result;  
		 
		AUIGrid.setGridData('#accDetail_grid_wrap',openAccPart.map((row)=>{
																				return {
																							...row , 
																							patknd : row.patknd == 'PTKN01'? 'OEM':'',
																							buyType : row.buytype == '' ? 'LOCAL':'',}
																		}).sort((a,b)=>a.reqSeq-b.reqSeq))
	 
	},
	error : (e)=>{
	}
	
	})
}
//상세정보 창 닫기
function accDetailClose()
{
	 $( "#dialog-form-detail" ).dialog('close');
}

//엑셀로 업로드된 상세정보창에서 상세정보에 엑셀 업로드시 해당 정보 파싱을 위한 함수
function readDetailExcel() {
	
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
			const rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
			console.log(rows);
			//디테일 양식아님
			if(rows[0]['보험수리비 청구서'] == null)
			{
				return;
			}
		 
      		const data = {
							//insnm : rows[1]['__EMPTY_1'] ,  //보험사명
							//custName : rows[1]['__EMPTY_17'] , //공장상호
							
							accno : rows[2]['__EMPTY_1'] , //접수번호
							mrtgnm : rows[2]['__EMPTY_8'] , //담보
							ordrank : rows[2]['__EMPTY_12'] , //서열
							//addr1 : rows[2]['__EMPTY_17'] , //주소1 
							//addr2 : rows[3]['__EMPTY_17'] , //주소2
							
							carnum : rows[4]['__EMPTY_1'] , //차량번호
							//피보험차량
							//custCeoName : rows[4]['__EMPTY_17'] ,//대표자
							
							//제작사/차량
							//피보험자
							//custBizNo : rows[5]['__EMPTY_17'] ,//사업자번호
							
							carnm : rows[6]['__EMPTY_1'] , //차량명칭
							accymd : rows[6]['__EMPTY_8'] , //사고일자
							//custTel : rows[6]['__EMPTY_17'] ,//전화번호
							
							//모델
							cstnnm : rows[7]['__EMPTY_8'] , //보험담당자
							//custFax : rows[7]['__EMPTY_17'] ,//팩스번호
							
							patsum : rows[10]['__EMPTY_2'] , //부품계
							vatrt : rows[10]['__EMPTY_9'] , //부가세율
							vat : rows[10]['__EMPTY_11'] , //부가세
							fltrt : rows[10]['__EMPTY_17'],//과실율
							
							ndc : rows[11]['__EMPTY_2'],//할인율
							nsum : rows[11]['__EMPTY_9'],//합계
							dcspay : rows[11]['__EMPTY_17'] , //청구금액
							
							//부품소계
							
							parts : rows.filter((row)=>row['보험수리비 청구서'] && !isNaN(row['보험수리비 청구서'])).map((row)=>{
																							return {
																								reqSeq : row['보험수리비 청구서'] , // 순번
																								patnum : row['__EMPTY'] ,  // 부품번호
																								patnm : row['__EMPTY_3'] , //부품명
																								qty : row['__EMPTY_13'] ,     // 수량
																								patprc : row['__EMPTY_14'] ,   // 청구단가
																								dcrt : row['__EMPTY_16'] ,   // 할인율
																								itmpatsum : row['__EMPTY_18']    // 청구금액
																							}
																					})
						}
				 	
				//사고접수번호 , 보험담당자 , 차량번호, 차량명으로 해당 마스터와 엑셀파일의 동일성 검사
				if(parseInt(openAccInfo[0].accno) != data.accno)
				{
					alert('엑셀파일과 사고접수번호가 다릅니다');
					$("#detailExcelFile").val('');
					return;
				}
				if(openAccInfo[0].cstnnm != data.cstnnm)
				{ 
					alert('엑셀파일과 보험 담당자가 다릅니다');
					$("#detailExcelFile").val('');
					return;
				}
				if(openAccInfo[0].carnum != data.carnum)
				{ 
					alert('엑셀파일과 차량번호가 다릅니다');
					$("#detailExcelFile").val('');
					return;
				}
				if(openAccInfo[0].carnm != data.carnm)
				{ 
					alert('엑셀파일과 차량명칭이 다릅니다');
					$("#detailExcelFile").val('');
					return;
				}
				
				$("#detail_accymd").val(data.accymd);
				$("#detail_mrtgnm_ordrank").val(`${data.mrtgnm} / ${data.ordrank}`);
				$("#detail_fltrt").val(data.fltrt);
				$("#detail_vatrt_vat").val(`${data.vatrt} / ${data.vat?.toLocaleString() || 0}`); 
				
//			 	$("#detail_aunpatsum").val(data.patsum); //순정
			 	$("#detail_nsum").val(data.nsum?.toLocaleString() || 0); // 합계
			 	$("#detail_ndc").val(data.ndc); // 할인율
			 	$("#detail_dcspay").val(data.dcspay?.toLocaleString() || 0); // 청구액
			 	$("#detail_patsum").val(data.patsum?.toLocaleString() || 0); // 부품소계
						 
				AUIGrid.setGridData('#accDetail_grid_wrap' , data.parts);
				
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

//엑셀업로드된 마스터의 상세내역에서 엑셀 업로드
function excelDetailDataUpt()
{
	 
	
	const mrtgnm_ordrank = $("#detail_mrtgnm_ordrank").val().replaceAll(' ','').split('/');
	const vatrt_vat = $("#detail_vatrt_vat").val().replaceAll(' ','').split('/');
 
	const patData = AUIGrid.getGridData('#accDetail_grid_wrap')	

	//마스터정보 수정
	$.ajax({ url : '/adj/aos-acc-add' , 
			dataType : 'json',
			type : 'POST',
			async : false,
			//contentType: "application/json; charset=utf-8",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			data :{
					workingType : 'EXCEL_UPT'  ,
					accno : openAccInfo[0].accno ,
					wrhsyssn : openAccInfo[0].wrhsyssn ,
					custCode : openAccInfo[0].custCode ,
					accymd : $("#detail_accymd").val() ,
					mrtgnm : mrtgnm_ordrank[0] ,
					ordrank : mrtgnm_ordrank[1] ,
					fltrt : parseInt($("#detail_fltrt").val().replace('%','')) ,
					vatrt : parseInt(vatrt_vat[0].replace('%','')) ,
					vat : vatrt_vat[1].replaceAll(',','') ,
					lassum : $("#detail_nsum").val().replaceAll(',','') ,
			//		ndc : $("#detail_ndc").val() ,
					dcspay : $("#detail_dcspay").val().replaceAll(',','') ,
					patsum : $("#detail_patsum").val().replaceAll(',','') ,
					carbdynum : $("#detail_carbdynum").val()
					},
			success : (result)=>{  
				console.log(result);
			},
			error : (e)=>{
			}
			
		})
//	const err = { acc : [], pat : []};	
	//부품입력
	for(pat of patData)
		{  
			$.ajax({ url : '/adj/aos-acc-part-add' , 
			dataType : 'json',
			type : 'POST',
			async : false,
			//contentType: "application/json; charset=utf-8",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			data :{	...pat , 
					workingType : 'EXCEL_ADD' , 
					wrhsyssn : openAccInfo[0].wrhsyssn ,
					custCode : openAccInfo[0].custCode ,
						     
				},
			success : (result)=>{  
//				if(result.db_resultCode == 'Err')
//				{
//					err.pat.push(result);
//				} 
			},
			error : (e)=>{
			}
			
			})
		}

	alert('저장완료');
}
//상세정보의 값을 셋팅해주는 함수
function setDetailData(info)
{
	$("#detail_carnum").val(info.carnum); 
	$("#detail_carnm").val(info.carnm); 
	$("#detail_autbizno").val(info.autbizno); 
	$("#detail_autbiznm").val(info.autbiznm); 
	$("#detail_accymd").val(info.accymd); 
	$("#detail_carbdynum").val(info.carbdynum); 
	$("#detail_accno_odr").val(`${info.accno} / ${info.odr}`); 
	$("#detail_mrtgnm_ordrank").val(`${info.mrtgnm} / ${info.ordrank}`); 
	$("#detail_fltrt").val(`${info.fltrt}%`); 
	$("#detail_cstnemail").val(info.cstnemail); 
	$("#detail_vatrt_vat").val(`${info.vatrt} / ${info.vat?.toLocaleString() || 0}`);  
	$("#detail_aunpatsum").val((info.aunpatsum || info.patsum)?.toLocaleString());  // 순정부품이 값이 없으면 부품소계값을 씀
	$("#detail_nsum").val((info.vat+info.patsum)?.toLocaleString()); 
	$("#detail_ndc").val('0%'); 
	$("#detail_dcspay").val(info.dcspay?.toLocaleString()); 
	$("#detail_patsum").val(info.patsum?.toLocaleString());  
}
//상세정보의 값을 초기화해주는 함수
function detailDataReset()
{ 
	$("#detail_carnum").val(''); 
	$("#detail_carnm").val(''); 
	$("#detail_autbizno").val(''); 
	$("#detail_autbiznm").val(''); 
	$("#detail_accymd").val(''); 
	$("#detail_carbdynum").val(''); 
	$("#detail_accno_odr").val(''); 
	$("#detail_mrtgnm_ordrank").val(''); 
	$("#detail_fltrt").val(''); 
	$("#detail_cstnemail").val(''); 
	$("#detail_vatrt_vat").val(''); 
	$("#detail_aunpatsum").val(''); 
	$("#detail_nsum").val(''); 
	$("#detail_ndc").val(''); 
	$("#detail_dcspay").val(''); 
	$("#detail_patsum").val('');  
	AUIGrid.clearGridData('#accDetail_grid_wrap')
	AUIGrid.clearGridData("#ins_grid_wrap");   
	$("#detailExcelFile").val('');
	
	openAccInfo = null;
	openAccPart = null;
}


//데이터업로드 버튼 클릭 
function JsonDataAdd() {
	
	var dialogXls;
	dialogXls = $( "#dialogJson-form" ).dialog({
	    autoOpen: false,
	    height: 900, 
	    width: "60%",
	    modal: true,
	    buttons: {
	      /* "Create an account": addUser, */
	      	 "올리기" : ()=>{
				if(jsonData.length == 0) 
				{
					alert('파일을 업로드 해주세요');
					return;
				}
				 if(jsonData[0].file == 'null')
				 {
					console.log('파일없음')
					return;
				}
				 jsonInfoUpload(getJsonInfoList() , 0 , { acc : [], pat : []} , progressOpen( jsonData.length ));
			},
	         "닫기": function() {
	        	 dialogXls.dialog( "close" );
	      }
	    }, 
	    close: function() {
	      $( "#jsonFile" ).val("");	
	      jsonData = [];
	      AUIGrid.clearGridData("#grid_wrap_jsonInfo");   	
	      AUIGrid.clearGridData("#grid_wrap_jsonDetail");   	
	    },
	    open:()=>{
			AUIGrid.resize("#grid_wrap_jsonInfo");
			AUIGrid.resize("#grid_wrap_jsonDetail");
		}
	  });
	  $(".ui-dialog-titlebar-close").html("X");
	  dialogXls.dialog( "open" );
}

//json 파일 읽을떄 파싱
function readJsonData()
{
	let input = event.target;
	
    let reader = new FileReader();
    reader.onload = function () { 
        jsonData = JSON.parse(reader.result); 
        for(i in jsonData) jsonData[i].__Idx = i;
     	
     	if(jsonData[0].file != 'null')
			AUIGrid.setGridData('#grid_wrap_jsonInfo' , getJsonInfoList() );
        
    };
    reader.readAsText(input.files[0]);
}

//불러온 json 데이터에서 마스터 정보의 배열을 리턴하는 함수
function getJsonInfoList()
{
	const json = jsonData.map((row)=>{
		const data = { //마스터 정보 통합
				...row, 
				... row.patInsCarInfo.find((r)=>r.accno==row.accno) , 
				patCnt : row.patWorkList?.length || 0
			};
		delete data.patInsCarInfo;
		delete data.patWorkList;
		delete data.patWorkProcList;
		return { //_붙은 키값 _바 제거해서 재구성
				...data,
				reqregtymd : data.reqregt_ymd ,
				inpinspay : data.inp_inspay ,
				wrhsyssn : data.wrh_syssn ,
				reqymd : data.req_ymd ,
				inpinspay_ymd : data.inp_inspay_ymd ,
				reqtm : data.req_tm ,
				inspayymd : data.inspay_ymd ,
				pataplymd : data.patapl_ymd ,
				accymd : data.acc_ymd ,
				
			};
		});
	return json;
}
//불러온 json데이터에서 부품정보 가져오는 함수
function getJsonDetailList()
{
	return jsonData.map((row)=>{
		if(row.patWorkList == null) return null; //부품정보가 없을경우
		
	    let resultArr = [];
	    for(i in row.patWorkList)
	    {
	        resultArr.push({
								...row.patWorkList[i] , 
								patsum : row.patWorkProcList[i].patsum ,
								prcchgymd : row.patWorkList[i].prcchg_ymd ,
								prckey : row.patWorkList[i].prc_key ,
								wrhsyssn : row.patWorkList[i].wrh_syssn ,
								splymd : row.patWorkList[i].spl_ymd ,
								searchchk : row.patWorkList[i].search_chk
							})
	    }
    	return resultArr;
	})
}

//로드된 json으로 마스터 데이터 업로드
function jsonInfoUpload(jsonInfoList , index , err , progressInfo )
{ 
	let infoApiResult = [];
	const data = jsonInfoList[index++];
	progressSet(progressInfo , progressInfo.curProgress+1); 
	$.ajax({ url : '/adj/aos-acc-add' , 
	dataType : 'json',
	type : 'POST',
	async : false,
	//contentType: "application/json; charset=utf-8",
	contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	data :{...data ,
		   workingType : 'ADD' , 
		   ordrank : data.ordrank || 0 , //dto에서 int형인데 json에서 값이 ''인경우 404에서나서 ''으로 들어올경우 0을 보내줌
		   fltrt : data.fltrt || 0 ,
		   odr : data.odr || 0 ,
		   reqsn : data.reqsn || 0
		   },
	success : (result)=>{  
		infoApiResult = {...result , wrhsyssn : data.wrh_syssn };
	},
	error : (e)=>{ 
	}
	})
	//마스터 저장통신 실패시 저장후 아래 스킵
	if(infoApiResult.db_resultCode == 'Err')
	{
		err.acc.push(infoApiResult);
		//continue;
	}
	
	//마스터가 정상 입력된경우 부품정보 입력 
	const aosAccPat = getJsonDetailList().filter((row)=>row != null).find((row)=>row[0].wrh_syssn == data.wrh_syssn)
	if(aosAccPat != null)
	{
		for(pat of aosAccPat)
		{  
			$.ajax({ url : '/adj/aos-acc-part-add' , 
			dataType : 'json',
			type : 'POST',
			async : false,
			//contentType: "application/json; charset=utf-8",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			data :{...pat , workingType : 'ADD' , 
						    dcrt :  pat.dicrate || 0 ,   //할인율
						    patnm : pat.wgepatnm , // 품명
						    reqSeq : pat.sn , //순번
						    qty : pat.co ,
						    itmpatsum : pat.patsum 
				},
			success : (result)=>{  
				if(result.db_resultCode == 'Err')
				{
					err.pat.push(result);
				} 
			},
			error : (e)=>{
			}
			
			})
		}
	} 
 
	
	setTimeout(()=>{
		if(jsonInfoList.length > index)
		{ 
			console.log(index);
			jsonInfoUpload(jsonInfoList , index , err , progressInfo );
		}
		else
		{ 
			progressSet(progressInfo , progressInfo.lastProgress);
			
			let errMsg = '';
			if(err.acc.length > 0)
			{
				errMsg+= `접수등록 실패 : ${err.acc.length}건\n`;
				for(errObj of err.acc)
				{
					errMsg += `${errObj.db_resultMsg}\n`
				}
			}
			if(err.pat.length > 0)
			{
				errMsg+= `부품등록 실패 : ${err.pat.length}건\n`;
				for(errObj of err.pat)
				{
					errMsg += `${errObj.db_resultMsg}\n`
				}
			}
			
			if(errMsg != '')
			{ 
				progressEnd(errMsg);
			}
			else 
			{ 
				progressEnd('처리성공');
			}  
		}
	},200)
}

function progressEnd(msg) {
	setTimeout(()=>{
		alert(msg);
		$( "#dialog-form-itemProgress" ).dialog('close') 
	},450);
}
