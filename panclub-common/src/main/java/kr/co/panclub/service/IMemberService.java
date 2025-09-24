package kr.co.panclub.service;

import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.ForCarNotification;
import kr.co.panclub.model.User;


public interface IMemberService {
	public User userOne(HashMap<String, Object> params);  //로그인 정보

	User userMenuAuth() throws Exception;
	
	public User findPwd(HashMap<String, Object> params);  //비밀번호 변경 정보	
	public User resetPw (HashMap<String, Object> params);  //비밀번호 재설정 정보
	public List<String> getCAComCode (HashMap<String, Object> params);  // 회사전환 목록 가져오는 통신
	public User cComCode (HashMap<String, Object> params);  // 회사 전환을 위한 통신
	public List<ForCarNotification> notiListRead (HashMap<String, Object> params );  //20231211 supi - 볼수 있는 알림리스트 받아오는 통신
	public void notiClose (HashMap<String, Object> params );  // 20231212 supi -  알림을 닫을때의 처리
	public String getErpYN (HashMap<String, Object> params );  // 20240103 supi 자기자신이 계열사인지 반환받는 쿼리
	public String getRelationYN (HashMap<String, Object> params );  //  20240620 supi 두개의 파라미터가 관계사인지 반환하는 쿼리 
	public String permissionCheckYN (HashMap<String, Object> params );  // 20240729 supi 해당 코드에 권한 있는지 체크하는 통신  
	public List<HashMap<String, Object>> scheduleByMem(HashMap<String, Object> params);  
	public List<HashMap<String, Object>> scheduleByMemDetail(HashMap<String, Object> params);  
	public int uptScheduleByMemDetail(HashMap<String, Object> params);  
	public int delScheduleByMemDetail(HashMap<String, Object> params);  
}
