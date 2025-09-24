$( function() {
    $( "#tabs" ).tabs();
  } );


$(document).ready(function() {

	getOrderReqComList();
	findDataToServer("/base/config", 1);
	getParentComInfo();
	getChildComInfoList();
	
	$("#btnReg").click(function() {
		updateDataToServer("/base/configAdd");
	});
	$("#btnStUpdate").click(function() {
		
		if(confirm('정말 DB통계업데이트를 하시겠습니까?시스템에 영향을 줄 수 있습니다.')) {
			statisticsUpdate();
		} else {
	 
		}
	});
	
//	$("#iSelect_orderReqCustInfo").focusin(function (e){
//		 console.log(e)
//	})
	
	$('#iSelect_orderReqCustInfo').on('focusin', function(){
	//	alert('d');
	//	console.log($(this).val());
	    
	    $(this).data('before', $(this).val());
	}); 
	
	$('#iSelect_orderReqCustInfo').on('change', function(){
		alert('주문연동업체는 현재 변경할수 없습니다 연구소로 문의바랍니다.'); 
		$("#iSelect_orderReqCustInfo").val($(this).data('before')).attr("selected", "selected");
	}); 
	
	
});
  
//다이얼로그창 선택하는 경우 그리드에 디스플레이
function updateGridRow() { 
	const selectedItems = AUIGrid.getSelectedItems(myGridIDItem);
    const rowInfoObj = selectedItems[0];
	const rowItem = rowInfoObj.item;
		
	const item = {
		itemId: rowItem.itemId,
		itemNo: rowItem.itemNo,
		itemName: rowItem.itemName,
		itemNameEn: rowItem.itemNameEn,
		salePrice: rowItem.salePrice
		, unitPrice: rowItem.salePrice
		, cnt: 1
		, saleUnitPrice: rowItem.salePrice 
		, sumPrice: rowItem.salePrice * 1
	};

	AUIGrid.updateRow(myGridID, item, "selectedIndex");	
	
	const dialogItem = $( "#dialog-form-item");			
	dialogItem.dialog("close");
}		
		
		
function updateGridRowCust(obj,name, gridYN) {
	const selectedItems = AUIGrid.getSelectedItems(myGridIDCust);
    let rowInfoObj = selectedItems[0];
	let rowItem = rowInfoObj.item;
	
	if (gridYN == 'Y') {	
		const item = {
						placeCustCode: rowItem.custCode,
						placeCustName: rowItem.custName,
					};
		  console.log("Selected item:", rowItem);
		 AUIGrid.updateRow(myGridID, item, "selectedIndex");
	}else{
			$(obj).val(rowItem.custCode);
			$("#"+name+"").val(rowItem.custName);
	}
	
	 
	const dialogCust = $( "#dialog-form-cust");	
	dialogCust.dialog("close");	
	
}
	
	
function findDataToServer(url, page) {
	 
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {

		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",

		success: function(data) {
			
			
			if (data.configOne == null) {
				
			}
			else{
				
				$("#partsmallCustCode").val(data.configOne.partsmallCustCode);
				$("#partsmallCustName").val(data.configOne.partsmallCustName);
				$("#glozenCustCode").val(data.configOne.glozenCustCode);
				$("#glozenCustName").val(data.configOne.glozenCustName);			
				$("#hallaCustCode").val(data.configOne.hallaCustCode);
				$("#hallaCustName").val(data.configOne.hallaCustName);
				$("#skCustCode").val(data.configOne.skCustCode);
				$("#skCustName").val(data.configOne.skCustName);
				$("#dekoCustCode").val(data.configOne.dekoCustCode);
				$("#dekoCustName").val(data.configOne.dekoCustName);
				$("#eapsCustCode").val(data.configOne.eapsCustCode);
				$("#eapsCustName").val(data.configOne.eapsCustName);
				$("#cCustRate").val(data.configOne.cCustRate);   //2023.11.01
				$("#saleDcRate").val(data.configOne.saleDcRate);   //2024.02.05
				$("#saleMarginRate").val(data.configOne.saleMarginRate);   //2024.02.05
				$("#stockConsignCustCode").val(data.configOne.stockConsignCustCode);   //2022.02.06
				$("#stockConsignCustName").val(data.configOne.stockConsignCustName);   //2022.02.06
				
				if(data.configOne.orderReqCustCode != '')
					$("#iSelect_orderReqCustInfo").val(`${data.configOne.orderReqCustName}[${data.configOne.orderReqCustCode}]`).attr("selected", "selected");
				
			}

			
			
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

function updateDataToServer(url) {
	if(dblRegClkChk()) return; //더블클릭 방지

	const partsmallCustCode = document.getElementById("partsmallCustCode").value;
	const glozenCustCode = document.getElementById("glozenCustCode").value;
	const hallaCustCode = document.getElementById("hallaCustCode").value;
	const skCustCode = document.getElementById("skCustCode").value;
	const dekoCustCode = document.getElementById("dekoCustCode").value;
    const eapsCustCode = document.getElementById("eapsCustCode").value;
    const cCustRate = document.getElementById("cCustRate").value;
    const saleDcRate = document.getElementById("saleDcRate").value;
    const saleMarginRate = document.getElementById("saleMarginRate").value;
    const stockConsignCustCode = document.getElementById("stockConsignCustCode").value;
    
    const orderReqCustInfoCustCode = $("#iSelect_orderReqCustInfo option:selected").attr('data-comCode');
    
    
    let childComCodeArr = [];
    for(select of $(".childInput:checked"))
    {
        childComCodeArr.push($(select).attr('id'))
    }
    
    
	//console.log("partsmallCustCode:"+partsmallCustCode);
	//console.log("glozenCustCode:"+glozenCustCode);
	 //       console.log("hallaCustCode:"+hallaCustCode);
	  //      console.log("skCustCode:"+skCustCode);
	   //     console.log("dekoCustCode:"+dekoCustCode);
        //    console.log("eapsCustCode:"+eapsCustCode);
  
	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
			"workingType": "ADD",
			"partsmallCustCode" : partsmallCustCode,
	        "glozenCustCode" : glozenCustCode,
	        "hallaCustCode" : hallaCustCode,
	        "skCustCode" : skCustCode,
	        "dekoCustCode" : dekoCustCode,
            "eapsCustCode" : eapsCustCode
            ,"cCustRate" : cCustRate    //2023.11.01
            ,saleDcRate , saleMarginRate , stockConsignCustCode
            ,childComCodeStr : childComCodeArr.join('^')
            ,orderReqCustCode : orderReqCustInfoCustCode
		},
		success: function(data) {
			dblRegClkBln = false;
			alert(data.result_code + ":" + data.result_msg);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});

};

//통계업데이트용
function statisticsUpdate()
{
	setStartSpinner();
    if(dblRegClkChk()) return; //더블클릭 방지
	$.ajax({
		url: '/stats/statisticsUpdate',
		dataType: "json",
		type: "POST",
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data: { 
		},
		success: function(data) {
			setStopSpinner();
	 		dblRegClkBln = false;
			alert(data.db_resultCode + ":" + data.db_resultMsg);
		},
		error: function(request, status, error) {
	 
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	}); 
}


function getParentComInfo()
{ 
	$.ajax(	{
		type : "POST",
		url : '/base/getParentComInfo',
		dataType : "json", 
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){   
			const parentInfo = result.map(row=>{return {comCode : row.custCode , comName : row.custName}});
			let parentComName = '';
			if(parentInfo.length >0) 
				parentComName = parentInfo[0].comName;
				
			$("#iInput_parentComName").val(parentComName); 
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
function getChildComInfoList()
{ 
	$.ajax(	{
		type : "POST",
		url : '/base/getChildComInfoList',
		dataType : "json", 
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){   
		 	const childInfo = result.map(row=>{return {comCode : row.custCode , comName : row.custName , childValid : row.childValid}});
		 	const div = $("#iDiv_childComName");
		 	let childHTML = '';
		 	if(childInfo.length >0)
		 	{
			
				childHTML = childInfo.reduce((a,c)=>{
													return  a+ `<input type="text" class="form-control" aria-describedby="" placeholder="" style="display:initial;width:48%; max-width:200px; margin-bottom: 2px"; value="${c.comName}"; disabled>
																<input type="checkbox" class="form-check-input childInput" id="${c.comCode}" ${c.childValid?"checked":""}>
																<br>`;
										} ,'')
			}
			else 
				childHTML = `<input type="text" class="form-control" aria-describedby="" placeholder="" style="display:initial;width:48%; max-width:200px; margin-bottom: 2px" disabled>`;
		
			div.append(childHTML);
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
		
		
function getOrderReqComList()
{ 
	$.ajax(	{
		type : "POST",
		url : '/club/c-cust',
		dataType : "json", 
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(result){    
			
			orderReqCustInfoHTML = $("#iSelect_orderReqCustInfo");
			
			result.c_custList.filter(cust=>cust.validYN == 'Y')
		 					 .forEach((cust)=>{ 
									orderReqCustInfoHTML.append(`<option data-comCode='${cust.custCode}'>${cust.custName}[${cust.custCode}]</option>`);
								})
			
		 
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

