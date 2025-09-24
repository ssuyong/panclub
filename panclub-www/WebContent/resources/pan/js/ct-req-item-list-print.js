//로컬 스토리지에 고정키+url에 붙은 reqNo가 합쳐진 키값으로 데이터가 있는지 확인 있다면 데이터를 가져옴 
if(localStorage.getItem("ctReqPrintInfo/"+location.search.replace('?reqNo=','')) != null ) getPrintData();
else alert("데이터가 없습니다.");

function getPrintData()
{ 
 	//로컬스토리지에서 json데이터를 파싱
	const  {reqNo , gvMgr , regYmd , gvMemo , reqItemData , rackQtyList , procUserId , procStep , procDate , procMemo , deliWay , deliType}   
	= JSON.parse(localStorage.getItem("ctReqPrintInfo/"+location.search.replace('?reqNo=','')));
 
	//고정 정보를 입력
	$("#regYmd").attr('value',regYmd); 
	$("#reqNo").attr('value',reqNo);
	$("#gvMgr").attr('value',gvMgr); 
	$("#gvMemo").attr('value',gvMemo);
	
	$("#procUserId").attr('value',procUserId);
	$("#procStep").attr('value',procStep);
	$("#procDate").attr('value',procDate);
	$("#procMemo").attr('value',procMemo);
	$("#deliWay").attr('value',deliWay);
	if(deliWay=='방문수령')
	{
		$('#labelDeliType').html('방문처');
	}
	$("#deliType").attr('value',deliType);
	
	//부품리스트는 길이만큼 반복문을 돌아서 데이터를 입력
	const divParent = $(".divTableBody");
	
	for(let i = 0 ; i < reqItemData.length ; i++)
	{
		const reqItem = reqItemData[i];

		if(rackQtyList[reqItem.itemId] == null) //랙재고가 없을 경우 1행으로 정보만 추가
		{
			pntDataDicAppend(divParent , reqItem);
		}
		else 
		{
			for(let j = 0 ; j < rackQtyList[reqItem.itemId].length ; j++) // 재고가 있으면 랙별로 행 추가해줌
			{
				const rackQtyInfo = rackQtyList[reqItem.itemId][j]; 
				pntDataDicAppend(divParent , j==0?reqItem:null , rackQtyInfo.stockQty , rackQtyInfo.rackName , rackQtyInfo.rackCode,reqItemData[i].custName );
			} 
		}
	} 
	
	const svgNode = DATAMatrix({
	
		     msg :  `${window.location.host}/order/ct-req-list?ymdIgnoreYN=y&ctReqNo=${reqNo}&popup=open`
		    ,dim :  128
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

function pntDataDicAppend(parentDiv ,reqItem , qty = '0' , rackName = '' , rackCode ='',custName ='' )
{
	
	
	parentDiv.append("<div class='divTableRow'><div class='divTableCell divTableCellLft'>"+(reqItem==null?'':reqItem.index)+
							"</div><div class='divTableCell divTablePartNo'>"+(reqItem==null?'':reqItem.itemId)+
							"</div><div class='divTableCell divTablePartNo'>"+(reqItem==null?'':reqItem.itemNo)+
							"</div><div class='divTableCell'>"+(reqItem==null?'':reqItem.itemName)+
							"</div><div class='divTableCell'>"+(reqItem==null?'':reqItem.qty)+
							"</div><div class='divTableCell'>"+qty+
							"</div><div class='divTableCell'>"+rackName+
							"</div><div class='divTableCell'>"+rackCode+
							"</div><div class='divTableCell'>"+(custName ?? '') +
							"</div><div class='divTableCell'>"+(reqItem==null?'':reqItem.rcvLogisCode)+
							"</div></div>"); 
}


