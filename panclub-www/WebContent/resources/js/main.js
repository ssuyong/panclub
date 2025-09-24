
//차량정보 찾기  버튼 클릭 시
function fnCarInfoSrch(){
	
	var vin_val = $("#input_carno").val();
    
	jQuery.ajax(
			{
				type : "POST",
				url : '/goods/vehiclesByVIN',
				dataType : "json",
				data: {
					"vin":vin_val				
				},
				contentType : "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data){
					alert(data);
				},
				error:function(xhr,status,error){
					alert("차량정보 조회 시 오류가 발생했습니다. 추후 다시 조회해주세요.");
				}
			}
		)
}

