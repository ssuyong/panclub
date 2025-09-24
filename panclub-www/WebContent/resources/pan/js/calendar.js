var today = new Date();
var yearAgo = new Date(today.getTime() - (730 * 24 * 60 * 60 * 1000));
var hoverTimeout;
var selectedValues;
// 그리드 생성 후 해당 ID 보관 변수
$(document).ready(function() {
	findUserName("/biz/user-list");
	
	
	
	
	$('#member_dialog').select2();

	$('#member_dialog').on('change', function() {
		selectedValues = $('#member_dialog').val();
	});
	
	$('#dialog-form-schReg2').find("member_dialog").select2();
	$('#dialog-form-schReg2').find("member_dialog").on('change', function() {
		selectedValues = $('#dialog-form-schReg2').find("member_dialog").val();
	});
	 

	$("#btnCloseDialog").click(function() {
		$("#dialog-form-schReg").dialog("close"); 
	});
	$('#dialog-form-schReg2').find("#btnCloseDialog").click(function() {
		 
		$("#dialog-form-schReg2").dialog("close");
	});

	$("#btnRegDialog").click(function() {
		updateDataToServer("/biz/schAdd");
		//$("#dialog-form-schReg").dialog("close");
		//location.reload()

	});
	$("#btnDelDialog").click(function() {
		updateDataToServer("/biz/schAdd", "DEL");
	});


	//createDateTimePicker();

	createCal(events);
	findStaff("/biz/staff-list");

	


});


//중복코드라 다중선택자로 변경
$("#btnReg1,#btnReg2,#btnReg3,#btnReg4,#btnReg5,#btnReg6,#btnReg7,#btnReg8,#btnReg9,#btnReg10").on('click',function(e) {
	modalClose();
	openDialog();
	
	//모달 오픈에서 이벤트 바인드 되고 있엇는데 해당방식으로 하면 모달이 열릴때마다 이벤트가 중복등록되서 옴김 
	$("#btnDelDialog").css("display", "none"); 
	$("#category_dialog").val(e.target.innerHTML); 
	$("#title_dialog").val(`[${e.target.innerHTML}]`); 
	$('#member_dialog').val($('#userName_save').val()).trigger('change');
	checkDropdownValue();
});
  
$("#btnRegClose").click(function() {
	modalClose();
});

window.onbeforeunload = function() {

};

var events = findScheduleList("/biz/schedule-list");


function createCal(events) {
	var calendarEl = $('#calendar')[0];
	var calendar = new FullCalendar.Calendar(calendarEl, {
		events: events,
		/*
		events: [
			{ // this object will be "parsed" into an Event Object
				title: 'The Test Title', // a property!
				start: '2023-02-22', // a property!
				end: '2023-02-22' // a property! ** see important note below about 'end' **
			}
		],
		*/
		height: 800,
		defaultTimedEventDuration: '01:00:00',
		editable: true,
		slotLabelFormat: 'HH:mm',
		weekends: true,
		nowIndicator: true,
		headerToolbar: {
			start: '', // will normally be on the left. if RTL, will be on the right
			center: 'title',
			end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
		},
		dateClick: function(info) {

			openModal(info.jsEvent);

			var clickedDate = info.date;
			//var now = moment();
			//var clickedTime = now.format('HH:mm:ss');
			var clickedDateTime1 = moment(clickedDate).format('YYYY-MM-DD') + 'T' + '09:00';
			var clickedDateTime2 = moment(clickedDate).format('YYYY-MM-DD') + 'T' + '18:00';
			$('#startpicker-input').datetimepicker({
				defaultDate: clickedDateTime1
			});
			$('#endpicker-input').datetimepicker({
				defaultDate: clickedDateTime2
			});

			var startFormatted = moment(clickedDate).format('YYYY/MM/DD') + " 09:00";
			var endFormatted = moment(clickedDate).format('YYYY/MM/DD') + " 18:00";

			$('#startpicker-input_save').val(startFormatted || '');
			$('#endpicker-input_save').val(endFormatted || '');

		},

		eventClick: function(info) {
			modalClose();
	 
			var dialogName = info.event.extendedProps.comCode==$("#comCode_save").val()?"#dialog-form-schReg":"#dialog-form-schReg2";
			openDialog(dialogName);
			$(dialogName).find("#btnDelDialog").css("display", "block");
			$(dialogName).find("#schNo_dialog").val(info.event.extendedProps.schNo); 
			if(dialogName=="#dialog-form-schReg")
			{
				$(dialogName).find("#category_dialog").val(info.event.extendedProps.category);
				$(dialogName).find('#member_dialog').val(info.event.extendedProps.member).trigger('change');
				$(dialogName).find("#contents_dialog").val(info.event.extendedProps.contents);
			    $(dialogName).find("#title_dialog").val(info.event.extendedProps.realTitle);
			    
			    $(dialogName).find('#startpicker-input').datetimepicker({
				defaultDate: info.event.extendedProps.start2
				});
				$(dialogName).find('#endpicker-input').datetimepicker({
					defaultDate: info.event.extendedProps.end2
				});
				
				var startFormatted = formatDate(info.event.start);
				var endFormatted = formatDate(info.event.end ?? info.event.start);

				$(dialogName).find('#startpicker-input').val(startFormatted || '');
				$(dialogName).find('#endpicker-input').val(endFormatted || '');
				
				const startDate = new Date(info.event.extendedProps.start2.toString());
				const today = new Date();
				if(startDate <= today)
				{
					$("#btnRegDialog").hide();
					$("#btnDelDialog").hide();
				}
			}
			else
			{
				$(dialogName).find("#category_dialog").text(info.event.extendedProps.category);
				$(dialogName).find('#member_dialog').text(info.event.extendedProps.member.toString());
				$(dialogName).find("#contents_dialog").text(info.event.extendedProps.contents);
				$(dialogName).find("#title_dialog").text(info.event.extendedProps.realTitle);
			
				 

				var startFormatted = formatDate(info.event.start);
				var endFormatted = formatDate(info.event.end ?? info.event.start);

				$(dialogName).find('#startpicker-input').text(startFormatted || '');
				$(dialogName).find('#endpicker-input').text(endFormatted || '');
			}	 
			
			

			
			 
			$("#iInput_outerPerson").val(info.event.extendedProps.outerPerson);
			$(dialogName).find('#btnRegDialog').val(endFormatted || '');
			checkDropdownValue();

		},
		eventMouseEnter: function(info) {
			hoverTimeout = setTimeout(function() {
				var success = openModal2(info.jsEvent);

				if (success) {
					$("#title_modal").text(info.event.extendedProps.realTitle);
					$("#member_modal").text(info.event.extendedProps.member);
					$("#dateTime_modal").text(info.event.extendedProps.dateTime);
					$("#iSpan_outerPerson").text(info.event.extendedProps.outerPerson+'명');
					$("#contents_modal").text(info.event.extendedProps.contents);
				}
			}, 500);



		},

		eventMouseLeave: function(info) {

			clearTimeout(hoverTimeout);

			modalClose2(info.jsEvent);
		},

		locale: 'ko'
	});
	calendar.render();

}

function openModal(event) {
	var modal = $("#modal").get(0);
	modal.style.zIndex = "9999";
	var x = event.clientX;
	var y = event.clientY;

	// Set the top and left properties of the modal
	var modalWidth = 150; // Set the width of the modal
	var modalHeight = 210; // Set the height of the modal
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var modalTop = y + modalHeight < windowHeight ? y : windowHeight - modalHeight;
	var modalLeft = x + modalWidth < windowWidth ? x : windowWidth - modalWidth;
	modal.style.display = "block";
	modal.style.top = modalTop + "px";
	modal.style.left = modalLeft + "px";
	modal.style.width = modalWidth + "px";
	modal.style.height = modalHeight + "px";

	// Set the background color to white
	modal.style.backgroundColor = "#FAFAFA";

	
}

function openDialog(dialogName="#dialog-form-schReg") {
	$(dialogName).find('#member_dialog').val([]).trigger('change');
	$(dialogName).find("#startpicker-input").val($('#startpicker-input_save').val());
	$(dialogName).find("#endpicker-input").val($('#endpicker-input_save').val());
	$(dialogName).find("#contents_dialog").val("");
	$(dialogName).find("#schNo_dialog").val("");
	$("#btnRegDialog").show();
	$("#btnDelDialog").show();

	var dialog;
	dialog = $(dialogName).dialog({
		//autoOpen: false,
		height: 470,
		//minWidth: 500,
		width: "50%",
		modal: true,
		headerHeight: 40,
		position: {
			my: "center",
			at: "center",
			of: window
		},
		close: function() {

		} 
	 
	});



	dialog.dialog("open");
 	 
	
}

function openModal2(info) {
	var modal = $("#modal2").get(0);
	modal.style.zIndex = "9999";

	// Get the coordinates of the center of the event
	var eventLeft = info.clientX - (info.offsetX || info.layerX);
	var eventTop = info.clientY - (info.offsetY || info.layerY);
	var eventWidth = info.event && info.event.width || 0;
	var eventHeight = info.event && info.event.height || 0;
	var eventCenterX = eventLeft + eventWidth / 2;
	var eventCenterY = eventTop + eventHeight / 2;

	// Set the top and left properties of the modal
	var modalWidth = 250; // Set the width of the modal
	var modalHeight = 160; // Set the height of the modal
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var modalTop = eventCenterY - modalHeight - 20;
	var modalLeft = eventCenterX;

	// Adjust the position of the modal to keep it inside the window
	modalTop = Math.max(modalTop, 0);
	modalTop = Math.min(modalTop, windowHeight - modalHeight);
	modalLeft = Math.max(modalLeft, 0);
	modalLeft = Math.min(modalLeft, windowWidth - modalWidth);

	modal.style.display = "block";
	modal.style.top = modalTop + "px";
	modal.style.left = modalLeft + "px";
	modal.style.width = modalWidth + "px";
	modal.style.height = modalHeight + "px";

	// Set the background color to white
	modal.style.backgroundColor = "#FAFAFA";
	
	return true;
}

function modalClose() {
	$('#modal').modal('hide');
	$('#modal').hide();
	//$('.jquery-modal').hide();
}
function modalClose2() {
	$('#modal2').modal('hide');
	$('#modal2').hide();
	//$('.jquery-modal').hide();
}


function findStaff(url) {
	var list = [];
	var workingType = "CURRENT-LIST";

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			workingType: workingType
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
		 
			if (data.staffList.length == 0) {
			} else {

				for (i = 0; i < data.staffList.length; i++) {
					name = data.staffList[i].name;
					list[i] = name;
					//$("#member_dialog").append("<option value='' >" + name + "</option>");
					$("#member_dialog").append("<option value=" + name + ">" + name + "</option>");
				}
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
	return list;

}


function createDateTimePicker() {

	$('#startpicker-input').datetimepicker({

		startDate: today,
	});
	$('#endpicker-input').datetimepicker({
		startDate: today,
	});


}

function updateDataToServer(url, wt) {
	var workingType;
	var schNo

	if ($("#schNo_dialog").val() != '') {
		workingType = "UPT";
		schNo = $("#schNo_dialog").val();
	} else {
		workingType = "ADD";
		schNo = createschNo();
		
		
	}
	if (wt === "DEL") {
		workingType = "DEL"
	}

	var title = $("#title_dialog").val();
	var category = $("#category_dialog").val();
	var memberList = $("#member_dialog").val();
	var startYmd = $("#startpicker-input").val();
	var endYmd = $("#endpicker-input").val();
	var contents = $("#contents_dialog").val();

	var data = {};

	if (wt !== "DEL" && title == '') { alert("제목은 필수 입력해야 합니다."); $("#title_dialog").focus(); return; }
	if (wt !== "DEL" && category_dialog == '') { alert("유형은 필수 입력해야 합니다."); $("#category_dialog").focus(); return; }
	if (wt !== "DEL" && memberList == '') { alert("참여자는 필수 입력해야 합니다."); $("#member_dialog").focus(); return; }
	if (wt !== "DEL" && startYmd == '') { alert("시작일은 필수 입력해야 합니다."); $("#startpicker-input").focus(); return; }

	if (wt !== "DEL" && startYmd > endYmd) { alert("시작일은 종료일을 넘을 수 없습니다."); $("#startpicker-input").focus(); return; }



	data.workingType = workingType;
	data.schNo = schNo;
	data.title = title;
	data.category = category;
	data.memberList = memberList;
	data.startYmd = startYmd;
	data.endYmd = endYmd;
	data.contents = contents;
	data.outerPerson = parseInt($("#iInput_outerPerson").val());
	
	//20240603 SUPI 삭제가 아닌경우 참여자가 없을때 저장 불가능하게
	if(memberList == null && workingType != 'DEL') {
		alert('참여자가 없어서 저장할수 없습니다');
		return;	
	}
 
 

	$.ajax({
		url: url,
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		//contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		async: false,
		data: JSON.stringify(data),
		success: function(data) {
			alert("저장되었습니다.");
			location.reload();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "error:" + error);
		}
	});



}


// 20231115 supi 동일 일정인지 분류하는 schNo을 만드는 로직에 휴무,공가,인정휴무중 같은 회사내 같은시간일 경우 같은 기존 같은 속성을 가진 일정의 schno를 가져오도록 수정 
function createschNo() {
	var schNo;
	var category = $("#category_dialog").val(); 
	var startYmd = $("#startpicker-input").val();
	var endYmd = $("#endpicker-input").val();
	var myComCode = $("#comCode_save").val();
	
	var url = "/biz/schedule-list";
	
	let newschNo= 0;
	
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			
		 
			var sortData = data.scheduleList.sort(function (a,b){
			if(a.schNo < b.schNo)
				return a.schNo - b.schNo
			});  
			
			for(var i =0; i<sortData.length ; i++)
			{
				 
		
				if(sortData[i].comCode == myComCode && 
				sortData[i].category == category && 
				sortData[i].startYmd == startYmd && 
				sortData[i].endYmd == endYmd && 
				(sortData[i].category == "휴무" || sortData[i].category =="공가" || sortData.category == "인정휴무" )
				
				)
				{ 
					
					
					newschNo= sortData[i].schNo;
					 
					break; 	
					 
				} 
			} 
			
			if(newschNo == 0)
			{
				if (sortData.length == 0) {
					schNo = "11112233001"
				} 
				else {
					schNo = sortData[sortData.length  - 1].schNo;
				}
				
				let datePart = schNo.substring(0, 8);
				let count = schNo.substring(8);
				let now = new Date();
				let currentDate = now.toISOString().slice(0, 10);
				let currentDate2 = currentDate.split("-").join("")
			
			
				if (datePart != currentDate2) {
					datePart = currentDate2;
					count = 1;
				} else {
					count++
				}
			
				let threeDigit = String(count).padStart(3, '0');
				newschNo = datePart + threeDigit;
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
	
	
	
	
	

	return newschNo;
}

 
 
 // 20231115 supi 일정 불러올때 소팅후 가져오도록 수정
 // 20231116 supi 일정시간,분류,회사코드로 정렬된 데이터를 반복문 돌면서 이전 인덱스 데이터와 비교후 같은 일정이면 합치도록 수정

function findScheduleList(url) {

	var eventList = []; //전체 일정 리스트

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {

		},
		async: false,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
			
	 
	
	  		 
			 
			var events = {};  // 현재 저장중인 일정객체
			for(var i = 0 ; i < data.scheduleList.length ; i++)
			{
				//같은 회사 같은 기간이면서 , 휴무 공가 인정휴무 혹은 같은일정분류 일때 하나로 묶음
				if(events.comCode == data.scheduleList[i].comCode &&
				events.startYmd == data.scheduleList[i].startYmd  &&
				events.endYmd == data.scheduleList[i].endYmd &&
				events.category == data.scheduleList[i].category &&
				(data.scheduleList[i].category =="휴무" || 
				data.scheduleList[i].category == "공가"|| 
				data.scheduleList[i].category == "인정휴무" || 
				events.schNo == data.scheduleList[i].schNo)
				)
				{ 
					
				 
					eventList[eventList.length-1].member.push( data.scheduleList[i].member);
					eventList[eventList.length-1].title += ', '+data.scheduleList[i].member;
					 
					 
				}
				else
				{ 
					
					// 리스트 이전 인덱스와 같은 인덱스 아니면 새롭게 통신으로 받아온 값으로부터 일정정보를 객체에 저장
					events={};
					events.schNo = data.scheduleList[i].schNo;
					events.title = "[" + data.scheduleList[i].category + "]" + data.scheduleList[i].member.substring(0).split(',');
					events.realTitle = data.scheduleList[i].title;
					events.category = data.scheduleList[i].category;
				 	
							
					if (data.scheduleList[i].category == "출장") {
						events.backgroundColor = '#81F79F';
						events.borderColor = '#81F79F';
					} else if (data.scheduleList[i].category == "외근") {
						events.backgroundColor = '#F5A9F2';
						events.borderColor = '#F5A9F2';
					} else if (data.scheduleList[i].category == "휴무") {
						events.backgroundColor = '#FAAC58';
						events.borderColor = '#FAAC58';
					} else if (data.scheduleList[i].category == "내방") {
						events.backgroundColor = '#7401DF';
						events.borderColor = '#7401DF';
					} else if (data.scheduleList[i].category == "시간휴무") {
						events.backgroundColor = '#01DF01';
						events.borderColor = '#01DF01';
					} else if (data.scheduleList[i].category == "공가") {
						events.backgroundColor = '#97A308';
						events.borderColor = '#97A308';
					} else if (data.scheduleList[i].category == "인정휴무") {
						events.backgroundColor = '#F33C58';
						events.borderColor = '#F33C58';
					}
					else if (data.scheduleList[i].category == "당직") {
						events.backgroundColor = '#33AC58';
						events.borderColor = '#33AC58';
					}
					else if (data.scheduleList[i].category == "휴양소") {
						events.backgroundColor = '#4466BB';
						events.borderColor = '#4466BB';
					}
					
						events.startYmd =  data.scheduleList[i].startYmd;
						events.endYmd =  data.scheduleList[i].endYmd;
			 			events.member = [];
						events.member.push(data.scheduleList[i].member); 
						events.start = data.scheduleList[i].startYmd.replace(/\//g, "-");
						
						var myDateParts =data.scheduleList[i].startYmd.replace(/\//g, "-").split(' ');
						var myDate = myDateParts[0]; // get the date part
						var myTime = myDateParts[1]; // get the time part
						var myISODateString = myDate + 'T' + myTime + ':00';
						events.start2 = myISODateString;									//datetimepicker 형식때문에 별도로 넘김

						events.end =data.scheduleList[i].endYmd.replace(/\//g, "-");

						var myDateParts2 = data.scheduleList[i].endYmd.replace(/\//g, "-").split(' ');
						var myDate2 = myDateParts2[0]; // get the date part
						var myTime2 = myDateParts2[1]; // get the time part
						var myISODateString2 = myDate2 + 'T' + myTime2 + ':00';
						events.end2 = myISODateString2;

						events.dateTime = data.scheduleList[i].startYmd + "~" + data.scheduleList[i].endYmd;

						events.contents = data.scheduleList[i].contents;
						events.comCode = data.scheduleList[i].comCode;
						events.outerPerson= data.scheduleList[i].outerPerson;;
						eventList.push(events);
					
		 
				}
				
			}
			
	 
		}
		
		,
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
//	console.log(eventList);
	return eventList;

}

function formatDate(dateString) {
	var dateObj = new Date(dateString);
	if (isNaN(dateObj)) {
		return '';
	}
	var year = dateObj.getFullYear();
	var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
	var day = ('0' + dateObj.getDate()).slice(-2);
	var hours = ('0' + dateObj.getHours()).slice(-2);
	var minutes = ('0' + dateObj.getMinutes()).slice(-2);
	return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
}

$('#category_dialog').change(function() {
	var category = $(this).val();
	var title = "";

	// determine the appropriate title based on the category value
	switch (category) {
		case "외근":
			title = "[외근]";
			break;
		case "출장":
			title = "[출장]";
			break;
		case "회의":
			title = "[회의]";
			break;
		case "내방":
			title = "[내방]";
			break;
		case "휴무":
			title = "[휴무]";
			break;
		case "시간휴무":
			title = "[시간휴무]";
			break;
		case "공가":
			title = "[공가]";
			break;
		case "인정휴무":
			title = "[인정휴무]";
			break;
		case "당직":
			title = "[당직]";
			break;
		case "휴양소":
			title = "[휴양소]";
			break;
		// add additional cases as needed
	}

	// update the value of #title_dialog
	$('#title_dialog').val(title);
	checkDropdownValue();
});


//휴무,시간휴무,공가,인정휴무의 경우 내용 disabled됨
function checkDropdownValue() {
	/*
	if ($("#category_dialog").val() == "휴무" || $("#category_dialog").val() == "시간휴무"
	|| $("#category_dialog").val() == "공가"|| $("#category_dialog").val() == "인정휴무") {
		$("#contents_dialog").prop("disabled", true);
	} else {
		$("#contents_dialog").prop("disabled", false);
	}
	*/
}

 


function findUserName(url) {

	var uid = $("#userId_save").val();

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			"userId":uid,
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",		
		success:function(data){			
			if (data.userList.length == 0){
			}else{
				
				for(i=0;i<data.userList.length;i++){
					//console.log("data" + JSON.stringify(data.userList[i]));
						 $("#userName_save").val(data.userList[0].userName)		
									
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

$("#iInput_outerPerson").change(function(e){
	const outerPerson = $(this).val();
 
	
	if(isNaN(outerPerson))
	{
		alert('숫자만 입력 가능합니다.');
		$(this).val(0);	
		return;
	}
	if(outerPerson<0)
	{
		alert('0보다 작은숫자를 입력하셨습니다.');
		$(this).val(0);	
		return;
	}
})
