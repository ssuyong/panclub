	
	/*$('form input').keydown(function(e) {
        if (e.keyCode == 13) {
            
        }
    });*/

$(document).ready(function() {

	findDataToServer();
	
	})	
	



	function checkPw(){
		
		var nowpwd = document.getElementById("nowpwd");
		var newpwd = document.getElementById("newpwd");
		var renewpwd = document.getElementById("renewpwd");
		var error1 = document.getElementById("error1");
		var error2 = document.getElementById("error2");
		var error3 = document.getElementById("error3");
		var error4 = document.getElementById("error4");
		var error5 = document.getElementById("error5");
		
		
		
		 if (nowpwd.value === "") {
		    error1.style.display = "block";
		    error1.innerHTML = "비밀번호를 입력하세요";
			nowpwd.style.border="1px solid red"
		    return false
		  } else {
		    error1.style.display = "none";
		  }
		  if (newpwd.value === "") {
		    error2.style.display = "block";
		    error2.innerHTML = "새로운 비밀번호를 입력하세요";
		    newpwd.style.border="1px solid red"
		    return false
		  } else {
		    error2.style.display = "none";
		  }
		   if (newpwd.value.length <4 || newpwd.value.length > 16) {
		    error3.style.display = "block";
		    error3.innerHTML = "비밀번호는 4~16자리 사이로 입력하세요";
		    newpwd.style.border="1px solid red"
		    return false
		  } else {
		    error3.style.display = "none";
		  }
		  
		   if (renewpwd.value === "") {
		    error4.style.display = "block";
		    error4.innerHTML = "비밀번호를 한번 더 입력하세요";
		    renewpwd.style.border="1px solid red"
		    return false
		  } else {
		    error4.style.display = "none";
		  }
		  
		   if (newpwd.value != renewpwd.value) {
		    error5.style.display = "block";
		    error5.innerHTML = "비밀번호가 일치하지 않습니다";
		    renewpwd.style.border="1px solid red"
		    return false
		  } else {
		    error5.style.display = "none";
		  }
			
		
		updateDataToServer("/base/upw-change");

	}	
	
	
	
	
	
function findDataToServer() {
	
	var uid = $("#uid").val();

	$.ajax(	{
		type : "POST",
		url : "/biz/user-list",
		dataType : "json",
		data: {
			"userId":uid,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",		
		success:function(data){			
			if (data.userList.length == 0){
				//console.log("data.userList : " + data.userList);
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else{
				
				for(i=0;i<data.userList.length;i++){
					//console.log("data" + JSON.stringify(data.userList[i]));
						 $("#uname").val(data.userList[0].userName)		
									
				    //firstGrid_mst.setData(list); // 그리드에 데이터 설정
				   
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


function updateDataToServer( url) {
	
	var nowpwd = $("#nowpwd").val();  
    var newpwd = $("#newpwd").val(); 
    var uid = $("#uid").val(); 
   
	$.ajax({
	    url : url,
	    dataType : "json",
	    type : "POST",
	    //contentType: "application/json; charset=utf-8",
	    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
	    data :{
			"nowpwd":nowpwd,
			"uid":uid,
			"newpwd":newpwd
		
	},
	    
	    success: function(data) {
	        //alert("성공:"+data.success);
	        //alert(data.result_code+":"+data.result_msg);
	        alert(data.result_msg);
	        if (data.result_code == 'Err'){		      
				$("#nowpwd").focus();
			}else{
				location.reload();
			}
	        
	    },
	    error:function(request, status, error){
	        alert("code:"+request.status+"\n"+"error:"+error);
	    }
	});
	
};

function fn_reset(inname) {
	
	if (inname=='nowpwd') {
		nowpwd.style.border="1px solid #aaa"
		 error1.innerHTML = "";
	}else	if (inname=='newpwd') {
		newpwd.style.border="1px solid #aaa"
		 error2.innerHTML = "";
		 error3.innerHTML = "";
	}else	if (inname=='renewpwd') {
		renewpwd.style.border="1px solid #aaa"
		 error4.innerHTML = "";
		 error5.innerHTML = "";
	}
}

