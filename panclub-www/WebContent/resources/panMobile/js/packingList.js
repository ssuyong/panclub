
let curButtonId ='';//탭 버튼 아이디 저장
let selectFind = '';//통신중에 다시 통신못하게 확인용 

$(document).ready(function(){
	$("#iDiv_itemSelectBox").css('max-height' , window.innerHeight-70); // 레이어팝업 최대 크기 지정
}) 

function pageMove(type)
{
	if(type =='back')
	{
		soundPlay1();
		if(confirm('목록으로 돌아가시겠습니까?\n저장하지 않은 데이터는 보존되지 않습니다.'))
		{
			window.location.href = '/mobile/';
		}
	}
}

//품번 직접 입력을 위해 포커스 잡으면 기존 입력값 날려버림
$("#iInput_itemNo").focus(function(e){
	$("#iInput_itemNo").val('');
})

 
//주문조회 버튼
$("#iButton_packingRlList").click(function(e){
	 
	if(buttonClick($(this)))
	{
		//조회중에 또 조회 들어올경우 막음
		alert(`현재 ${selectFind} 조회중입니다`);
		return;	
	}
	const {sYmd, eYmd} = getSEYmd(); 
	simplePostAjax('/logis/rl-req-list',{procStatus:'미완료^일부완료' , sYmd , eYmd , workingType : "LIST-ALL" , ymdIgnoreYN : "N"},(result)=>{
		 
		//기존 리스트 삭제
		$("#iTable_basket>tBody>.cTr_basketTableItem").remove();
		//추가할 부모태그 선택
		const itemTable  = $("#iTable_basket>tbody");
		
		for(req of result.reqList)
		{
			itemTable.append(`<tr class="cTr_basketTableItem" id="iTr_reqNo_${req.rlReqNo}">
								<td class="cTd_basket cWidth25vw cFont13p" scope="col">${req.regYmd}<br>${req.procStatus}</label></td>  
								<td class="cTd_basket cWidth30vw cFont13p" id="iTd_custName" scope="col">${req.saleCustName}</td>   
								<td class="cTd_basket cWidth20vw cFont13p" id="iTd_Qty" scope="col">${req.itemQty}</td>   
								<td class="cTd_basket cWidth20vw cFont13p cTd_ReqNo" id="iTd_ReqNo" scope="col">${req.rlReqNo}</td>   
							</tr>`);
			
		}
		reqNoEventBind();
		selectFind = '';
	}) 
})
 
//버튼 클릭시 해당 버튼의 색 변환및 조회 통신중에 다시 눌리는것을 방지 용
function buttonClick(buttonObj)
{
	if(selectFind != '') return true 
	const buttonId = buttonObj.attr('id'); //호출한 버튼의 id
	selectFind = buttonObj.html();
	curButtonId = buttonId;
	const btn = $(`.btn:not(#${buttonId})`);  // 호출한 버튼의 id를 제외한 버튼
	//호출한 버튼을 제외한 버튼들은 회색 버튼 클래스를 지우고 파란 버튼클래스 추가
	btn.addClass('btn-secondary');
	btn.removeClass('btn-primary');
	//호출한 버튼은 파란 버튼 클래스 지우고 회색 버튼 클래스 추가
	buttonObj.removeClass('btn-secondary');
 	buttonObj.addClass('btn-primary')
 	return false;
	
}
//한달전과 오늘의 yyyy-MM-dd포멧 날짜 string데이터(sYmd,eYmd)가 객체를 반환받는 함수
function getSEYmd()
{
	let now = new Date();
	let oneMonthAgo =new Date(now - 2629800000);
	const sYmd = `${oneMonthAgo.getFullYear()}-${(oneMonthAgo.getMonth()+1).toString().padStart(2,'0')}-${oneMonthAgo.getDate()}`;
	const eYmd = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate()}`; 
	return {sYmd , eYmd}
}
//조회된 요청 리스트에서 요청번호 클릭시 해당 상세내역 열어주기 위한 이벤트
function reqNoEventBind()
{
	$(".cTd_ReqNo").click(function(){
		const data = {  reqNo:$(this).html() , curCategory:curButtonId.replace('iButton_packing','')};
		const categoryText = {RlList:'rl'};
		
		window.location.href = `/mobile/packingItemList?type=${categoryText[data.curCategory]}&reqNo=${data.reqNo}`;
		 
		
	})
}
//안내 설명
function pageInfo()
{
	alert('한달내의 미처리된 요청이 조회됩니다');
}
