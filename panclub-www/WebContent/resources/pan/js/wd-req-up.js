
// 그리드 생성 후 해당 ID 보관 변수
var myGridID;

var datepicker = new tui.DatePicker('#wrapper', {
	language: 'ko',
    date: new Date(),
    input: {
        element: '#wdReqYmd',
        format: 'yyyy-MM-dd'
    }
});
    
   
    
function dealWithKeyboard(event) {
	// gets called when any of the keyboard events are overheard
	
}

// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
//function documentReady() {
$(document).ready(function(){

	$("#supplyInfo-title").css("display","none");
	$("#supplyInfo-input").css("display","none");
	
	document.addEventListener("keydown", dealWithKeyboard, false);
	document.addEventListener("keypress", dealWithKeyboard, false);
	document.addEventListener("keyup", dealWithKeyboard, false);
	

	
	// 윈도우 리사이징 이벤트
	window.onresize = function () {

		// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
		if (typeof myGridID !== "undefined") {
			AUIGrid.resize(myGridID);
		}
	};
		 
	$("#btnReg").click(function(){
		//alert("등록버튼");
		updateDataToServer("/order/estiAdd", "ADD");
	});
	$("#btnClose").click(function(){
		
		parent.jQuery.fancybox.close();
		//$.fancybox.close(true);
	});
	$("#btnDel").click(function(){
		//alert("등록버튼");
		if (confirm("삭제되면 복구가 불가능 합니다.견적을 삭제하시겠습니까?")){
			updateDataToServer("/order/estiAdd", "DEL");
		}
	});

	//발주번호Arr인 경우
	let jobArr2 = $("#jobArr2").text();
	if (jobArr2 !=''){		
		
		
		$("#jobArr2").text(jobArr2.replace(/\^/gi, " "));
	}	  
	
});


//  조회
function findOrderGroup(url) {
	var orderGroupId = $("#orderGroupId").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"workingType":"LIST",
			"orderGroupId":orderGroupId
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.orderGroupList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				location.href;
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
					
				for(i=0;i<data.orderGroupList.length;i++){
					orderGroupId = data.orderGroupList[i].orderGroupId;
					orderType = data.orderGroupList[i].orderType;
				    releaseReqYmd = data.orderGroupList[i].releaseReqYmd; 
					custCode = data.orderGroupList[i].custCode; 
					custName = data.orderGroupList[i].custName; 
					custMgrName = data.orderGroupList[i].custMgrName;
					custMgrPhone = data.orderGroupList[i].custMgrPhone; 
					supplyCustCode = data.orderGroupList[i].supplyCustCode; 
					supplyCustName = data.orderGroupList[i].supplyCustName; 
					supplyCustMgrName = data.orderGroupList[i].supplyCustMgrName; 
					supplyCustMgrPhone = data.orderGroupList[i].supplyCustMgrPhone; 
					carNo = data.orderGroupList[i].carNo; 
					vinNo = data.orderGroupList[i].vinNo; 
					colorCode = data.orderGroupList[i].colorCode; 
					makerCode = data.orderGroupList[i].makerCode; 
					carType = data.orderGroupList[i].carType; 
					dcRate = data.orderGroupList[i].dcRate; 
					dcDspType = data.orderGroupList[i].dcDspType; 
					agencyFeeRate = data.orderGroupList[i].agencyFeeRate; 
					marginRate = data.orderGroupList[i].marginRate; 
					memo1 = data.orderGroupList[i].memo1; 
					memo2 = data.orderGroupList[i].memo2; 
					
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


		
		
///요청전송
/*function reqSend(url){
 
  var jobArr = $('#jobArr').val();
  var custCode = $('#custCode').val();
  var wdReqAmt = $('#wdReqAmt').val();
  var wdReqYmd = $('#wdReqYmd').val();
  var wdReqType = $('#wdReqType').val();
 // var data = new FormData();
  //var attaFile = $("#attaFile")[0];
  //var files = attaFile.files;
if ($("#attaFile").get(0).files.length === 0) {
  // 파일 첨부가 없을 경우
  data = new FormData();
  data.append("workingType", "ADD");
  data.append("jobArr", jobArr);
  data.append("wdReqType", wdReqType);
  data.append("wdReqAmt", wdReqAmt);
  data.append("wdReqYmd", wdReqYmd);
  data.append("custCode", custCode);
} else {
  // 파일 첨부가 있을 경우
  data = new FormData();
  var attaFile = $("#attaFile")[0];
  var files = attaFile.files;

  data.append("workingType", "ADD");
  data.append("jobArr", jobArr);
  data.append("wdReqType", wdReqType);
  data.append("wdReqAmt", wdReqAmt);
  data.append("wdReqYmd", wdReqYmd);
  data.append("attaFile", files[0]);
  data.append("custCode", custCode);
}
  $.ajax({
    data: data,
    type: "POST",
    url: url,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      // ..
      alert(data.result_code+":"+data.result_msg);
    },
    error: function(x, e) {
      if(x.status==0){
        alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
      } else if(x.status==404){
        alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
      } else if(x.status==500){
        alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
      } else if(e=='parsererror'){
        alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
      } else if(e=='timeout'){
        alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
      } else {
        alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n'+x.responseText+')');
      }
    }
  });
}*/


///요청전송
function reqSend_원본(url) {

	var jobArr = $('#jobArr').val();
	var custCode = $('#custCode').val();
	var wdReqAmt = $('#wdReqAmt').val();
	var wdReqYmd = $('#wdReqYmd').val();
	var wdReqType = $('#wdReqType').val();
	var data = new FormData();
	// var attaFile = $("#attaFile")[0];
	var attaFile = $("input[name='attaFile']");
	var files = attaFile[0].files;
			
	var filesParam;
	if (files[0] === undefined) {
		filesParam = "";
	} else {
		filesParam = files[0];
	}
	
	data.append("workingType", "ADD");
	data.append("jobArr", jobArr);
	data.append("wdReqType", wdReqType);
	data.append("wdReqAmt", wdReqAmt);
	data.append("wdReqYmd", wdReqYmd);
	//data.append("attaFile", files[0]);
	data.append("custCode", custCode);

    // Append multiple files
    for (var i = 0; i < files.length; i++) {
        data.append("attaFile[]", files[i]);
    }  
                            
    $.ajax({
        data : data,
        type : "POST",
        url : url,
        async: false,
        cache : false,
        contentType : false,
        //enctype: 'multipart/form-data',
        processData : false,
        
        success : function(data) {
        	//toastr.success("업로드 중~"); 
            //editor.insertImage(welEditable, data.url);
            //alert("업로드 중입니다.");
        	
        	
        	
        	//setTimeout(function() {  // 이미지 불러올때 작은사이즈 부터 불러오는 오류가 있어서 시간을 딜레이시킴. 10000 이하로 하는 경우 순서가 얽혔음. 추가로 엉키면 너 늘려야 할듯
        		alert(data.result_code+":"+data.result_msg);
		        //창닫고. 부모창reload
				//parent.jQuery.fancybox.close();
				//parent.location.reload(true);
				location.reload(true);

        	//}, 10000);
        	
        	
           
           

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
	        parent.jQuery.fancybox.close();
		}
    });

}  
	

	///요청전송
function reqSend(url){
 
    var frm = $("#frmWdReq")[0];
    var data = new FormData(frm);
    
 
                              
    $.ajax({
        //async: false,
        
        method : 'POST',
		enctype: 'multipart/form-data',
		url : url,
		data : data,
		processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        
        beforeSend: function() {
     
    },
        
        success : function(data) {
        	//toastr.success("업로드 중~"); 
            //editor.insertImage(welEditable, data.url);
            //alert("업로드 중입니다.");
        	
        	
        	
        	//setTimeout(function() {  // 이미지 불러올때 작은사이즈 부터 불러오는 오류가 있어서 시간을 딜레이시킴. 10000 이하로 하는 경우 순서가 얽혔음. 추가로 엉키면 너 늘려야 할듯
        		alert(data.result_code+":"+data.result_msg);
		        //창닫고. 부모창reload
				//parent.jQuery.fancybox.close();
				//parent.location.reload(true);
				location.reload(true);

        	//}, 10000);
        	
        	
            
            

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
	        parent.jQuery.fancybox.close();
		}
    });

}  

