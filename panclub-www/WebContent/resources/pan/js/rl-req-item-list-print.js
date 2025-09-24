$(document).ready(function(){

	$("#supplyInfo1").css("display","none");
	$("#supplyInfo2").css("display","none");
	$("#supplyInfo3").css("display","none");
	$("#receiverInfo").css("display","none");
	$("#senderInfo").css("display","none");
	$("#memoInfo").css("display","none");
	
	var orderTypeName = $("#orderTypeName").val();
	var pcReqYN = $("#pcReqYN").val();
	
			
	if(orderTypeName ==='대행'){
		$("#supplyInfo1").css("display","block");
		$("#supplyInfo2").css("display","block");
		$("#supplyInfo3").css("display","block");			
	}
	if(pcReqYN == 'Y'){
		$("#receiverInfo").css("display","block");
		$("#senderInfo").css("display","block");
		$("#memoInfo").css("display","block");
	}
	
	const rlReqNo = $("#printOrderNo").val();
	const 
		svgNode = DATAMatrix({
		
		//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
		     msg :  `${window.location.host}/logis/rl-req-list?popup=open#info1!!2024-04-02!2024-05-08!!!!!!${rlReqNo}!!!!`
		    ,dim :   128
		    ,rct :   0
		    ,pad :   2
		    ,pal : [  "#000000","#ffffff" ]
		    ,vrb :   0
		
		});
		
 		
		const box = $(`#box`);
		box.prepend(svgNode); 
		$('svg').css('position','absolute');
		$('svg').css('top','0');
		$('svg').css('left','0');  
	
});

document.addEventListener("DOMContentLoaded", function() {
	setTimeout(function() {
		window.print();
	}, 100);

	

});


window.onbeforeprint = function() {
  var pages = document.getElementsByClassName('page');
  var lastPage = pages[pages.length - 1];
  
  // 마지막 페이지가 빈 페이지인 경우 제거
  if (lastPage.innerHTML.trim() == '') {
    lastPage.style.display = 'none';
  }
};