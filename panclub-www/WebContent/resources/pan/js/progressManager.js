const ProgressManager = {}


window.ProgressManager= ProgressManager;

//진행바 열기 (매개변수 진행바 길이)
ProgressManager.open = ( length) =>
{
	ProgressManager.info = {cur : 0 , bar: $("#Progress-bar") ,length }; 
	 
	$("#curProgressText").html(0);
	$("#lastProgressText").html(ProgressManager.info.length);
	
	
	dialogProgress = $( "#dialog-form-Progress" ).dialog({
	    autoOpen: false,
	    height: 100,
	    //minWidth: 500,
	    width: "25%",
	    modal: true,
 		open:()=>{
			ProgressManager.info.bar.width(0);
		},
	    close: function() {
			ProgressManager.info.bar.width(0);
			ProgressManager.info.cur = -1; //다이얼로그가 닫히면 더 진행 안함 
	    }
	  });
	  $( "#dialog-form-Progress" ).dialog().parent().children(".ui-dialog-titlebar").children(".ui-dialog-titlebar-close").hide();
	  dialogProgress.dialog( "open" ); 
}

//진행바 진행 (매개변수 현재 진행도)
ProgressManager.set = ( cur) =>
{
	if(ProgressManager.info?.bar == null) return;
	ProgressManager.info.cur = cur;
	ProgressManager.info.bar.width(`${(ProgressManager.info.cur * 100 / ProgressManager.info.length)}%`);
	$("#curProgressText").html(cur);
}

//현재 상태에서 진행도를 1 진행
ProgressManager.next = ()=>{
	if(ProgressManager.info.cur < ProgressManager.info.length)
		ProgressManager.set(ProgressManager.info.cur+1);
}
//진행바 닫기
ProgressManager.close = ()=>{
	$( "#dialog-form-Progress" ).dialog('close');
}
//진행바 끝났을때 메세지 날려줌 진행바 애니메이션을 위해 0.7딜레이 (매개변수 메세지 , 메세지 확인후 콜백)
ProgressManager.end = (msg,fun = ()=>{})=>{
	ProgressManager.set(ProgressManager.info.length);
	setTimeout(()=>{
		alert(msg);
		fun();
		ProgressManager.close(); 
		
	},700);
}
