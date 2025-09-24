const isDev = ((window.location.href.toString()).substring(0,16))=='http://localhost';  // 개발환경인지 여부 => 로컬 주소일 경우 개발환경으로 간주

/** 
* @param {string} 가변 매개변수로 매개변수를 이어서 로그를 찍어주는 함수. 개발환경이 아니면 무시됨
* @memo 2024.01.17 supi 개발환경에서 문자열 배열을 로그로 찍기 위한 함수
*/
export function devStrLog(...args)  // devStrLog("1","st","3") => 1/st/3 로그 찍음
{
	if(isDev)
	{
		let str = '';
		for(let i = 0 ; i < arguments.length ; i++)
		{
			if(i != 0 ) str+='/';
			str+= arguments[i];
		}
		console.log(str);
	}
}
/** 
* @param {object} 개발환경에서 매개변수를 로그로 남겨줌
* @memo 2024.01.17 supi 개발환경에서만 로그가 찍기 위한 함수
*/
export function devLog(object) 
{
	if(isDev)
	{ 
		console.log(object);
	}
}
  
/** 
* @param {string} object null인지 체크할 변수
* @param {string} object2 object가 null이면 대체할 변수
* @return {string} object가 null이 아니면 object반환, 만약 null이면 object2를 반환하고 object2도 null이면 ''빈 문자열 반환
* @memo 2024.01.17 supi  null데이터로 undefined으로 값이 들어오는걸 방지하기 위한 함수
*/ 
export function isNull(object , object2) 
{
	return object==null?(object2==null?'':object2):object;
}

/** 
* @param {string} url 통신 보내려는 url
* @param {object} data 통신에 전달하려는 객체 //생략가능
* @param {Function} successFunction 통신에 성공하면 이 함수에 결과값을 매개변수로 실행, 이 함수가 null이면 실행 안함 // 생략가능
* @param {bool} isResultLog 이 값을 true로 주면 개발환경에서 결과값을 로그로 남김 //생략가능 
* @param {Function} errorFunction 통신 실패시 (x,e)를 매개변수로 실행됨 //생략가능 
* @memo 2024.01.17 supi ajax에서 반복적으로 사용되는 코드를 줄이기 위해 만든 함수 개발 환경에서 결과값 출력 시키는 기능도 들어 있음
*/ 
export function ajaxPost(url , data={} , successFunction =null,isResultLog = false , errorFunction = null)
{ 
	$.ajax({
		type: "POST",
		url,
		dataType: "json",
		data
		,
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: (data)=> {
		 	if(isResultLog && isDev) //결과값을 본다는 트리거가 true이면서 개발환경이면 결과 data값을 로그로 남김
		 	{
				console.log(data);
			}
			if(successFunction != null)  // 콜백함수가 있다면 data를 매개변수로 함수호출
				successFunction(data);
		},
		error: (x, e)=> {
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
			if(errorFunction != null)
				errorFunction(x,e);// 콜백함수가 있다면 x와 e를 매개변수로 함수호출
		}
	});
}


/** 
* @param {string} url 통신 보내려는 url
* @param {object} data 통신에 전달하려는 객체 //생략가능
* @param {Function} successFunction 통신에 성공하면 이 함수에 결과값을 매개변수로 실행, 이 함수가 null이면 실행 안함 // 생략가능
* @param {bool} isResultLog 이 값을 true로 주면 개발환경에서 결과값을 로그로 남김 //생략가능 
* @param {Function} errorFunction 통신 실패시 (x,e)를 매개변수로 실행됨 //생략가능 
* @memo 2024.01.17 supi ajax에서 반복적으로 사용되는 코드를 줄이기 위해 만든 함수 개발 환경에서 결과값 출력 시키는 기능도 들어 있음
*/ 
export function ajaxPost2(url , data={} , successFunction =null,isResultLog = false , errorFunction = null)
{ 
	$.ajax({
		type: "POST",
		url,
		dataType: "json",
		data: JSON.stringify(data)
		,
		async: false,
		contentType: "application/json; charset=utf-8",
		//contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: (data)=> {
		 	if(isResultLog && isDev) //결과값을 본다는 트리거가 true이면서 개발환경이면 결과 data값을 로그로 남김
		 	{
				console.log(data);
			}
			if(successFunction != null)  // 콜백함수가 있다면 data를 매개변수로 함수호출
				successFunction(data);
		},
		error: (x, e)=> {
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
			if(errorFunction != null)
				errorFunction(x,e);// 콜백함수가 있다면 x와 e를 매개변수로 함수호출
		}
	});
}

/** 
* @param {object} auiGridLayout auiGrid 컬럼 레이아웃 객체
* @param {object} dataList 통신에서 받은 data내의 list객체
* @param {bool} isResultLog 결과 데이터를 로그로 확인하고 싶다면 true를 넣으면 개발환경에서 결과 객체를 로그로 남겨줌
* @return {object} auiGridLayout의 필드명 이름이 dataList객체에 있을경우 매칭해서 auiGrid에 사용가능한 객체로 만들어서 반환해줌 만약 dataList에 해당 데이터가 NULL일경우 isNull 함수를 사용해서 ''을 넣음
* @memo 2024.01.17 supi auiGrid를 불필요하게 매번 데이터값과 일치시켜주는 코드를 줄이기 위한 함수. 레이아웃의 이름과 동일한 데이터 값을 가져와서 auigrid에 사용할수 있도록 데이터를 셋팅해줌
*/ 
export function auiGridDataSet(auiGridLayout , dataList , isResultLog = false)
{ 
	 
	let list = [dataList.length]; // 데이터배열의 크기만큼 반환할 변수리스크 크기 지정
	for(let i = 0 ; i< dataList.length ; i++) 
	{
		list[i] = {};
		
		for(let j = 0 ; j < auiGridLayout.length ; j++) // 컬럼 레이아웃 배열을 돌면서 레이아웃에서 키값을 받아서 데이터리스트에서 반환할 리스트로 셋팅
		{
			if(auiGridLayout[j].children == null)
				list[i][auiGridLayout[j].dataField] = isNull(dataList[i][auiGridLayout[j].dataField]);  
			else //병합된 레이아웃의 경우
			{ 
			 
				for(let o = 0 ; o < auiGridLayout[j].children.length ; o++)
				{
					list[i][auiGridLayout[j].children[o].dataField] = isNull(dataList[i][auiGridLayout[j].children[o].dataField]);
				}
			}
				
		}
	}
	if(isResultLog && isDev)//결과값을 본다는 트리거가 true이면서 개발환경이면 결과 data값을 로그로 남김
	{
		console.log(list);
	}
	return list; 
}
 
// 모듈 초기화 확인용 로그
devLog("setModlue");