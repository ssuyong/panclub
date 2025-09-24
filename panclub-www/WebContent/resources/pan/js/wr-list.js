let myGridID;
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

 
const columnLayout = [ 
	{ dataField : "regYmd",    headerText : "등록날짜", width : 150 , labelFunction : (rowIndex, columnIndex, value, headerText, item, dataField)=>{return item.wrYmd.replaceAll('.','-');}} 	 		
	,{ dataField : "type",    headerText : "처리구분", width : 100,
				labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) { 
					if(item.wrType== 'whna')
							return '수동입고';
					else if(item.wrType== 'rlna')
						return '수동출고';
					else if(item.wrType=='move')
						return '이동';
					else if(item.wrType=='rlod')
						return '판매출고';
					else if(item.wrType=='whri')
						return '반품입고';
					else if(item.wrType=='itemList')
						return '품목정리';
					else return item.wrType;
		 		}} 
	,{ dataField : "wrState",    headerText : "처리상태", width : 80,
				labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) { 
								if(item.wrType== 'itemList')
										return '정리완료';
								else return item.wrState;
					 		}} 	 		
	,{ dataField : "wrNo",    headerText : "처리번호", width : 300,
				styleFunction: function (rowIndex, columnIndex, value, headerText, item, dataField) { if (value != "0") {	return "auigrid-color-style-link";	}	return null;	}}
	
	,{ dataField : "consignComName",    headerText : "위탁업체명", width : 100} 
	,{ dataField : "regUserName",    headerText : "등록자", width : 100} 
	,{ dataField : "itemCount",    headerText : "품목수", width : 90} 
	,{ dataField : "itemChkCount",    headerText : "처리수", width : 90} 
	,{ dataField : "itemMemoCount",    headerText : "메모품목수", width : 90} 
	,{ dataField : "memo1",    headerText : "비고", width : 580} 
 	,{ dataField : "uptYmd",    headerText : "수정날짜", width : 140,
				labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {  
					const d = new Date(item.modified);
					const year = d.getFullYear();
					const month = ((d.getMonth()+1)+'').padStart(2,'0'); 
					const day =  (d.getDate()+'').padStart(2,'0');
					return `${year}-${month}-${day}`;
 
		 		}} 
	,{ dataField : "uptHms",    headerText : "수정시간", width : 100,
				labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {  
					const d = new Date(item.modified);
					const hours = (d.getHours()+'').padStart(2,'0');
					const minutes = (d.getMinutes()+'').padStart(2,'0');
					const seconds = (d.getSeconds()+'').padStart(2,'0');
					return `${hours}:${minutes}:${seconds}`; 

		 		}} 
];

function createAUIGrid(columnLayout) {
	
	const auiGridProps = {			
		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 50,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			
			showAutoNoDataMessage : false,
			
			showFooter: true,
		
	};
	

	// 실제로 #grid_wrap 에 그리드 생성
	myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
	
 
//	AUIGrid.setFooter(myGridID, footerLayout);
 	
 	AUIGrid.bind("#grid_wrap", "cellDoubleClick" , (event)=>{
		if(event.dataField == "wrNo")
		{ 
			var myForm = document.popForm;
			var url = "/logis/stock-wr-up";
			myForm.action =url;  
		    $("#popForm_wrNo").val(event.value)
			myForm.target = "_blank"; 


			myForm.submit(); 
		}
	} )
		
}

$(document).ready(function(){
	createAUIGrid(columnLayout);
	//searchWrData(); 
	$("#btnFind").click(function(){ 
		searchWrData();
	});
	
	$("#wrState").select2({ tags: true});
	$("#wrType").select2({ tags: true});
})

function searchWrData()
{
	const sYmd = document.getElementById("startpicker-input").value.replace(/-/g,'');
	const eYmd = document.getElementById("endpicker-input").value.replace(/-/g,'')+1; 
	const ymdIgnoreYN = $('input:checkbox[name=ymdIgnoreYN]').is(':checked')?"Y":"N";
	const wrNo = $("#wrNo").val();
	const itemId = $("#itemId").val() || 0;
	const itemNo = $("#itemNo").val();
	 
	
	simplePostAjax('/logis/stock-wr-list' , 
				   {sYmd ,eYmd , ymdIgnoreYN,wrNo ,   itemId,itemNo }, 
				   (result)=>{ 
					//	console.log(result);
						const selectWrState = {};
						for (index in $("#wrState").val()){
							selectWrState[$("#wrState").val()[index]] = index;
						}  
						const selectWrType = {};
						for (index in $("#wrType").val()){
							const wrType = $("#wrType").val()[index];
							const str = ((wrType == '수동입고') ? 'whna' :
										(wrType == '수동출고') ? 'rlna' :
										(wrType == '이동') ? 'move' :
										(wrType == '판매출고') ? 'rlod' :
										(wrType == '반품입고') ? 'whri' : 
										(wrType == '품목정리') ? 'itemList' : wrType);
										
							selectWrType[str] = index;
						}  
						const wrList = result.stockWrList.filter((item)=>{ 
							if(Object.keys(selectWrState).length == 0) return true;
							else if(item.wrState in selectWrState) return true;
						}).filter((item)=>{    
							if(Object.keys(selectWrType).length == 0) return true;
							else if(item.wrType in selectWrType) return true;
						}) 
						if(wrList.length>0)
							AUIGrid.setGridData("#grid_wrap", wrList); 
						else 
							alert("조건에 맞는 자료가 없습니다.");
					}) 
} 