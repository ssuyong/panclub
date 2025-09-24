package kr.co.panclub.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import kr.co.panclub.dao.IMemberDao;
import kr.co.panclub.model.ForCarNotification;
import kr.co.panclub.model.User;


@Service
public class Memberservice  implements IMemberService{

	@Autowired
	private IMemberDao memberDao;
	
	@Autowired
	private HttpSession session;
	
	@Override
	public User userOne(HashMap<String, Object> params) {
		
		return memberDao.userOne(params);
	}

	//@SuppressWarnings("unchecked")
	@Override
	@Cacheable(value="menuCache")
	public User userMenuAuth() throws Exception{

		//log.info("cache start");
	
		User user = null;

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType","MENU_AUTH");
		
		i_params.put("logComCode",logComCode);
		i_params.put("logUserId",logUserId);
		
		user = memberDao.userMenuAuth(i_params);
	

		return user;
	}

	
	@Override
	public User findPwd(HashMap<String, Object> params) {
		
		return memberDao.findPwd(params);
	}

	@Override
	public User resetPw(HashMap<String, Object> params) {
		
		return memberDao.resetPw(params);
	}
	
	@Override // 회사전환 목록 가져오는 통신
	public List<String> getCAComCode(HashMap<String, Object> params) {
		
		return memberDao.getCAComCode(params);
	}
	@Override // 회사 전환을 위한 통신
	public User cComCode(HashMap<String, Object> params) {
		
		return memberDao.cComCode(params);
	}
	@Override //20231211 supi - 볼수 있는 알림리스트 받아오는 통신
	public List<ForCarNotification> notiListRead(HashMap<String, Object> params)  {
	
		return memberDao.notiListRead(params);
	}
	@Override // 20231212 supi -  알림을 닫을때의 처리
	public void notiClose(HashMap<String, Object> params)  { 
	 
		 memberDao.notiClose(params);
	}
	@Override // 20240103 supi 자기자신이 계열사인지 반환받는 쿼리
	public String getErpYN(HashMap<String, Object> params)  { 
		
		return memberDao.getErpYN(params);
	}
	@Override // 20240620 supi 두개의 파라미터가 관계사인지 반환하는 쿼리 
	public String getRelationYN(HashMap<String, Object> params)  { 
		
		return memberDao.getRelationYN(params);
	}
	
	@Override // 20240729 supi 해당 코드에 권한 있는지 체크하는 통신 
	public String permissionCheckYN(HashMap<String, Object> params)  { 
		
		return memberDao.permissionCheckYN(params);
	}
	@Override // 20241112 supi 일정관리조회
	public List<HashMap<String, Object>> scheduleByMem(HashMap<String, Object> params) { 
		
		return memberDao.scheduleByMem(params);
	}
	@Override // 20241113 supi 일정관리조회(특정 유저의 특정 유형 상세정보)
	public List<HashMap<String, Object>> scheduleByMemDetail(HashMap<String, Object> params) { 
		
		return memberDao.scheduleByMemDetail(params);
	}
	@Override // 20241113 supi 일정관리 기간수정
	public int uptScheduleByMemDetail(HashMap<String, Object> params) { 
		
		return memberDao.uptScheduleByMemDetail(params);
	}
	@Override // 20241113 supi 일정관리 삭제
	public int delScheduleByMemDetail(HashMap<String, Object> params) { 
		
		return memberDao.delScheduleByMemDetail(params);
	}
	

	
	/*
	 * @Override public User userTwo(HashMap<String, Object> params) {
	 * 
	 * return memberDao.userTwo (params); }
	 */
	
	
}
