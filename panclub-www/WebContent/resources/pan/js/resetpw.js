function pwCheck(){
	var upw1 = document.getElementById ("upwd1").value;
	if (upw1.length <4 || upw1.length > 20){
		alert ("비밀번호는 4~20자리 사이로 입력해주세요.");
		console.log (upw1);
		document.getElementById("upwd1").value= "";
	}
	
}        

function comparePw(){
var upw1 = document.getElementById ("upwd1").value;
var upw2 = document.getElementById ("upwd2").value;
var uw1 = upw1.split(' ').join('');
var uw2 = upw2.split(' ').join('');
console.log (uw1);
console.log (uw2);

	if (uw1 != uw2){
		alert ("비밀번호가 다릅니다. 다시 입력하세요.");
		upw2.value="";
		}
	}
	
	