//이전 검색 저장용
const oldParams = {}; 
//init
$(document).ready(function(){  
	new tui.DatePicker('#calendar-wrapper', {
		language: 'ko',
	    date: new Date(),
	    input: {
	        element: '#startpicker-input',
	        format: 'yyyy'  
		},
		type : 'year'
	})
	createAUIGrid();
})

//auigrid 생성
function createAUIGrid()
{ 
	const calendarLayout = {
							     dataType : "date",
						    	 formatString : "yyyy/mm/dd HH:MM",
						     
						    };
	//특정 연도의 일정 정보
	const scheduleColumnLayout = [  
		{ dataField : "stdYear",    headerText : "연도", width : 40 },    
		{ dataField : "memberName",    headerText : "사원명", width : 60 },
		{ dataField : "inYmd",    headerText : "입사일", width : 75 },    
		{ dataField : "annualVaca",    headerText : "연차", width : 70 , style:"right"},    
		{ dataField : "holyCnt",    headerText : "사용연차", width : 60 , style:"right"},    
		{ dataField : "remainVaca",    headerText : "남은연차", width : 70 , style:"right"},    
		{ dataField : "nonHolyCnt",    headerText : "공가/인정휴무", width : 90 , style:"right"},    
		{ dataField : "dutyCnt",    headerText : "당직", width : 40 , style:"right"},    
		{ dataField : "outWorkCnt",    headerText : "외근/출장", width : 70 , style:"right"},    
		{ dataField : "meetCnt",    headerText : "회의/내방", width : 80 , style:"right"},   
		{ dataField : "outYmd",    headerText : "퇴사일", width : 75}        
	];
	//특정 유저,연도,유형의 삭세정보들
	const detaliColumnLayout = [  
		{ dataField : "schidx",    headerText : "idx" ,  visible: false ,editable: false },
		{ dataField : "custName",    headerText : "업체", width : 80 ,editable: false },     
		{ dataField : "category",    headerText : "유형", width : 60,editable: false  },    
		{ dataField : "member",    headerText : "사원명", width : 60,editable: false },        
		{ dataField : "startYmd",    headerText : "시작일", width : 125  , editable: true ,...calendarLayout},    
		{ dataField : "endYmd",    headerText : "종료일", width : 125 , editable: true , ...calendarLayout },       
		{ dataField : "day",    headerText : "기간", width : 60,editable: false },       
		{ dataField : "contents",    headerText : "내용", width : 150,editable: false , style:"left" },       
		{ dataField : "regUserName",    headerText : "등록자", width : 60,editable: false },       
		{ dataField : "created",    headerText : "등록일", width : 80 ,dataType: "date" ,formatString  :'yyyy-mm-dd' ,editable: false },       
		{ dataField : "uptUserName",    headerText : "수정자", width : 60,editable: false },       
		{ dataField : "modified",    headerText : "수정일", width : 80, dataType : 'date' ,formatString :'yyyy-mm-dd',editable: false },       
		{ dataField : "",    headerText : "삭제", width :60 ,renderer : {
            type : "ButtonRenderer",
            labelText : "삭제",
            onClick : function(event) {
				if(confirm('정말 삭제하시겠습니까?'))
				{
					delScheduleByMemDetail({schIdx : event.item.schIdx});
				}
            	//console.log(event.item.schIdx)
            }
     	}},       
	];
	
	const auiGridProps = {		
			// 페이징 사용		
			usePaging: true,
			// 한 화면에 출력되는 행 개수 20(기본값:20)
			pageRowCount: 500,

			// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
			showPageRowSelect: true,

			selectionMode : "multipleCells",
			 
			enableFilter: true,
			 
		 
			};
	//auigrid 생성
	AUIGrid.create("#grid_wrap", scheduleColumnLayout, auiGridProps);		
	AUIGrid.create("#grid_wrapDetail",detaliColumnLayout, {...auiGridProps , editable: true });
	 	
	
	//클릭 이벤트. 사원의 사용연차,사용인정휴가, 외근,당직,회의를클릭시 해당 유형의 리스트 나옴
	AUIGrid.bind("#grid_wrap", "cellClick", function( event ) {
		
		const detailType = ['holyCnt' , 'nonHolyCnt' , 'outWorkCnt' , 'dutyCnt' , 'meetCnt'];
		if(!detailType.includes(event.dataField)) return;  //사용연차~회의 이외의 셀을 클릭시 이벤트 종료 
		getScheduleByMemDetailList({userName : event.item.memberName ,scheduleType : event.dataField , year : event.item.stdYear});
	});
	
	//기간변경시 이벤트
	AUIGrid.bind("#grid_wrapDetail" , "cellEditEnd" ,function(event){
		
		if(!isValidDateTime(event.value)) // 포멧에 안맞게 입력시
		{
			const oldData = {};
			oldData[event.dataField] = event.oldValue;
			AUIGrid.updateRow("#grid_wrapDetail" ,oldData , event.rowIndex);
			alert('yyyy/mm/dd HH:MM의 포멧으로 입력해주세요'); 
			return;
		}
		  
		uptScheduleByMemDetail({
									schIdx : event.item.schIdx
									,startYmd : event.item.startYmd
									,endYmd : event.item.endYmd
									,userName : event.item.member  
									,
								}) 
	});
}

// yyyy/mm/dd HH:MM 포멧 검사
function isValidDateTime(input) {
   
    const time = /^\d{4}\/\d{2}\/\d{2} (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    
    return time.test(input);
}

//조회버튼
$("#btnFind").on('click',()=>{
	getScheduleByMemList({
							year: $("#startpicker-input").val()
							, finExceptYN : $('input:checkbox[name=finExceptYN]').is(':checked')?'Y':'N'
						});
}) 

//사원 일정리스트 받아오는 통신
function getScheduleByMemList({year, finExceptYN })
{
	oldParams.getScheduleByMemList = {year, finExceptYN };
	$.ajax({ url : '/biz/scheduleByMem' , 
		dataType : 'json',
		type : 'POST',
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
			workingType: ''
			, year
			, finExceptYN
		},
		success : (result)=>{ 
		  
			AUIGrid.setGridData("#grid_wrap", result); 
			 
		},
		error : (e)=>{
		 
		}
		})
}
//선택한 사원의 특정 유형의 일정을 받아오는 통신
function getScheduleByMemDetailList({userName , scheduleType , year})
{
	oldParams.getScheduleByMemDetailList = {userName , scheduleType , year};
	$.ajax({ url : '/biz/scheduleByMemDetail' , 
		dataType : 'json',
		type : 'POST',
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
			userName ,scheduleType , year
		},
		success : (result)=>{ 
		  	
		  	const dayMillisecond = 86400000; // 하루를 밀리세컨드로 환산
		  	const timeMillisecond = 3600000; //한시간을 밀리세컨드로 환산
		  	const resultData =  result.sort((a,b)=>a.startYmd.localeCompare(b.startYmd)) // 시작일로 정렬
		  						  .map(r=>{
											//일정내에 점심시간 포함여부
											const isLunchTime =( parseInt(r.startYmd.split(' ')[1].split(':')[0]) <= 12 && parseInt(r.endYmd.split(' ')[1].split(':')[0]) >=13);
										
											const millisecond = new Date(r.endYmd) - new Date(r.startYmd); // 기간을 밀리세컨드로 계산
											let day = Math.floor(millisecond/dayMillisecond); // 일정상 일수 
											const time = (((millisecond%dayMillisecond)/ 3600000) - (isLunchTime?1:0)); //일정상 시간
										
											day += Math.floor(time/8); // 시간이 8시간이상인경우 하루로 추가
											day += Math.ceil((time%8)) /10;	 // 시간이 30분등이라 소수점인경우 올림처리해서 추가해줌							
											return {...r , day};//day에는 일정에 담긴 시간을 환산해서 계산
		  						  		}) 
			AUIGrid.setGridData("#grid_wrapDetail", resultData); 
			 
		},
		error : (e)=>{
		 
		}
		})
}

//일자 수정 (기간수정)
function uptScheduleByMemDetail({schIdx , startYmd , endYmd})
{ 
	$.ajax({ url : '/biz/uptScheduleByMemDetail' , 
		dataType : 'json',
		type : 'POST',
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
			schIdx , startYmd , endYmd
		},
		success : (result)=>{ 
		  	if(result == 1)
		  	{
				getScheduleByMemList(oldParams.getScheduleByMemList);
				
			}
			else // 권한이 없어서 실패할경우
			{
				alert("일정관리의 수정권한이 없습니다.");
			} 
			getScheduleByMemDetailList(oldParams.getScheduleByMemDetailList);
		},
		error : (e)=>{
		 
		}
		})
}
//일자 수정 - 삭제
function delScheduleByMemDetail({schIdx })
{ 
	$.ajax({ url : '/biz/delScheduleByMemDetail' , 
		dataType : 'json',
		type : 'POST',
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		data : {
			schIdx 
		},
		success : (result)=>{ 
		  	if(result == 1)
		  	{
				getScheduleByMemList(oldParams.getScheduleByMemList);
				getScheduleByMemDetailList(oldParams.getScheduleByMemDetailList);
				
			}
			else // 권한이 없어서 실패
			{
				alert("일정관리의 수정권한이 없습니다.");
			} 
		},
		error : (e)=>{
		 
		}
		})
}