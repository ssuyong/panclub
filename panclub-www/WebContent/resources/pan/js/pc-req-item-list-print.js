//로컬 스토리지에 고정키+url에 붙은 reqNo가 합쳐진 키값으로 데이터가 있는지 확인 있다면 데이터를 가져옴 
if(localStorage.getItem("pcReqPrintInfo/"+location.search.replace('?reqNo=','')) != null ) getPrintData();
else alert("데이터가 없습니다.");

function getPrintData()
{ 
 	//로컬스토리지에서 json데이터를 파싱
	const {pcReqNo , gvComCode , gvMgr , regYmd , gvPlacNo , gvMemo , itemList,procStep , deliWay , deliType,
		   senderCustName ,senderName ,  senderTel ,senderAddr1 , receiverCustName , receiverName , receiverTel , receiverAddr1} = JSON.parse(localStorage.getItem("pcReqPrintInfo/"+location.search.replace('?reqNo=','')));
 
	//고정 정보를 입력
	$("#regYmd").attr('value',regYmd);
	$("#gvComCode").attr('value',gvComCode);
	$("#pcReqNo").attr('value',pcReqNo);
	$("#gvMgr").attr('value',gvMgr);
	$("#gvPlacNo").attr('value',gvPlacNo);
	$("#gvMemo").attr('value',gvMemo);
	$("#deliWay").attr('value',deliWay);
	
	$("#senderCustName").attr('value',senderCustName);
	$("#senderName").attr('value',senderName);
	$("#senderTel").attr('value',senderTel);
	$("#senderAddr1").attr('value',senderAddr1);
	$("#receiverCustName").attr('value',receiverCustName);
	$("#receiverName").attr('value',receiverName);
	$("#receiverTel").attr('value',receiverTel);
	$("#receiverAddr1").attr('value',receiverAddr1);
	if(deliWay=='방문수령')
	{
		$('#labelDeliType').html('방문처');
	}
	$("#deliType").attr('value',deliType);
	
	//부품리스트는 길이만큼 반복문을 돌아서 데이터를 입력
	const divParent = $(".divTableBody");
	
 	let index = -1; //동일품목 순번~요청수량 안보여주기 위한 기능 카운트용 변수
	for(let i = 0 ; i < itemList.length ; i++)
	{ 
		
		divParent.append("<div class='divTableRow'><div class='divTableCell divTableCellLft'>"+(index != itemList[i].index ? itemList[i].index : '')+
		"</div><div class='divTableCell divTablePartNo'>"+(index != itemList[i].index ? itemList[i].itemId : '')+
		"</div><div class='divTableCell divTablePartNo'>"+(index != itemList[i].index ? itemList[i].itemNo : '')+
		"</div><div class='divTableCell'>"+ (index != itemList[i].index ? itemList[i].itemName : '')+
		"</div><div class='divTableCell'>"+(index != itemList[i].index ? itemList[i].reqQty : '')+
		"</div><div class='divTableCell'>"+itemList[i].qty+
		"</div><div class='divTableCell'>"+itemList[i].storName+
		"</div><div class='divTableCell'>"+itemList[i].rackName+
		"</div><div class='divTableCell'>"+(itemList[i].custName || '')+
		"</div><div class='divTableCell'>"+(index != itemList[i].index ? itemList[i].rcvLogisCode : '')+
		"</div></div>");
		
		if(index != itemList[i].index)  index = itemList[i].index;
	} 
	
	const 
		svgNode = DATAMatrix({
		
		//주문접수내역에서 해당 주문이 검색되는 url을 바코드에 담음
		     msg :  `${window.location.host}/order/pc-req-list?popup=open#info1!${pcReqNo}!!!Y!!!!!`
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
	//인쇄
	window.print();
}
