package kr.co.panclub.controller;

 
import java.math.BigInteger;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.co.panclub.common.CommonMethod;
import kr.co.panclub.common.JwtInfo;
import kr.co.panclub.common.JwtUtil;
import kr.co.panclub.common.SHA256Util;
import kr.co.panclub.model.ForCarNotification;
import kr.co.panclub.model.User;
import kr.co.panclub.service.IMemberService;


@Controller
public class indexController {

	@Autowired
	private HttpSession session;
	
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private IMemberService memberService;	
	
	@Autowired
	private JwtUtil jwtUtil; 

	@RequestMapping(value = "/indexAuigrid", method = RequestMethod.GET)
	public String indexAuigrid(@RequestParam(defaultValue="") String appType, 
			            HttpServletResponse response,Locale locale, Model model) {
		 
		String comCode_s = session.getAttribute("comCode").toString();
		String userId_s = (String) session.getAttribute("userId");
      
        HashMap<String, Object> params = new HashMap<String, Object>();
		
		return "indexAuigrid";
	}
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(@RequestParam(defaultValue="") String appType, HttpServletRequest req,
			            HttpServletResponse response,Locale locale, Model model ) {
		 
		String cokiComCode = CommonMethod.getComCodeCookie(req);
		/*
		 * Cookie[] cookies = req.getCookies(); for(Cookie c : cookies) {
		 * System.out.println(c.getName()); // 쿠키 이름 가져오기
		 * System.out.println(c.getValue()); // 쿠키 값 가져오기 }
		 */
		String comCode_s = session.getAttribute("comCode").toString();
		String userId_s = (String) session.getAttribute("userId");
      
		//System.out.println("cokiComCode:"+cokiComCode);
	//	System.out.println("sesnComCode:"+comCode_s);
		
        HashMap<String, Object> params = new HashMap<String, Object>();
        
        HashMap<String, Object> result = new HashMap<String, Object>();	//장윤상 로그인정보얻기위해 추가
		result.put("comCode", comCode_s);								//장윤상 로그인정보얻기위해 추가
		result.put("userId", userId_s);									//장윤상 로그인정보얻기위해 추가
		
		model.addAllAttributes(result);									//장윤상 로그인정보얻기위해 추가
		
		//req.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1
		
		return "index";
		
	}
	
   /*
	 * 사용자 로그인 :	 GET방식
	 * 2022.09.13 - 최초 로그인하려고 페이지 접근
	 */
	@RequestMapping(value="/sign-in", method=RequestMethod.GET)
	public String login(String redirect_target,Model model ) {

		
		if(redirect_target==null) {
			redirect_target = request.getHeader("referer"); 		//이전페이지 
		}
		
		model.addAttribute("redirect_target",redirect_target);

		return "/sign-in";
	}
	


	/*
	 * 사용자로그인 처리
	 * 2022.09.14
	 * 2023.07.04 hsg  -세션시간 12시간으로 설정
	 * 2023.07.14 hsg  -comCode 쿠키생성. 세션과 맞느지 비교해서 안 맞는 경우 튕겨나가는 용도. 한브라우저에서 여러 거래처코드로 로그인하는 경우 제한 처리위한 용도
	 */	
	@RequestMapping(value="/sign-in", method=RequestMethod.POST)
	public String login(HttpSession session, HttpServletResponse response,
			            RedirectAttributes rttr, String comCode, String userId, String pwd, Boolean mobileLogin ,
			            String rdU,  //로그인인터셉터에서 넘어오는 로그인 후 갈 페이지 정보.클릭한 메뉴의 URL 
			            String rtU,    //로그인버튼 클릭했을 경우 넘오오는 로그인 후 갈 페이지.로그인 클릭한 페이지URL   
			            String signInfoSave) {
		
		HashMap<String,Object> params = new HashMap<String, Object>();
		String workingType = "SIGN_IN";
		
		params.put("workingType",workingType);
		params.put("logComCode",comCode);
		params.put("logUserId",userId);
		params.put("pwdEnc",SHA256Util.getSha256(pwd));
		params.put("logIP",CommonMethod.getUserIP());
		
		User o_user  = memberService.userOne(params);
		
	 
		
		if (rdU.indexOf("/sign-in") > 0 ) { //로그인페이지에서 넘어오는 경우(정보잘못입력하여 )  로그인한 후 메인으로 이동하게 처리
			rdU = "/";
		}
		if (rdU.indexOf("/member/info_find_act") > 0 || rdU.indexOf("/member/register_action") > 0) { //정보찾기에서 비밀번호 변경후에넘오오는 경우 로그인한 후 메인으로 이동하게 처리
			rdU = "/";
		}

		if(rdU==null) { //인터셉터해서 넘어온것이 아닌 로그인버튼 클릭하는 경우. 
			rdU = rtU;
		}
		
		
		if(o_user!=null && !("").equals(o_user.getComCode())) {
			
			try {
				String comName = o_user.getComName();
				String userName = o_user.getUserName();
				String dpColor = o_user.getDpColor();
				
				//로그정보 저장을 클릭한 경우의 처리: 회사코드,사용자아이디 저장
				Cookie reComCodeSave = new Cookie("pA14Cc09S22", comCode);
				reComCodeSave.setPath("/");                               // 모든 경로에서 접근 가능하도록			    	
				//if(("SaveOK").equals(signInfoSave)) {  //CustCode 3650일동인 쿠키저장
					//reComCodeSave.setMaxAge(60*60*24*3650);
					reComCodeSave.setMaxAge(60*60*12);
				//}else {					
				//	reComCodeSave.setMaxAge(0);
				//}
			    response.addCookie(reComCodeSave);                // 쿠키저장
				
				Cookie reUserIdSave = new Cookie("pA14uI09S22", URLEncoder.encode(userId,"UTF-8"));// 한글쿠키값 저장하기 위해 encode처리
				reUserIdSave.setPath("/");                               // 모든 경로에서 접근 가능하도록			    	
				if(("SaveOK").equals(signInfoSave)) {  //mancode 3650일동인 쿠키저장
					reUserIdSave.setMaxAge(60*60*24*3650);
				}else {
					
					reUserIdSave.setMaxAge(0);
				}
			    response.addCookie(reUserIdSave);                // 쿠키저장
			    
				//대표 디스플레이색상 저장
				Cookie dpColorCookie = new Cookie("dPc515R", dpColor);
				dpColorCookie.setPath("/");                               // 모든 경로에서 접근 가능하도록			    	
				dpColorCookie.setMaxAge(60*60*24*7);   //1주일
				response.addCookie(dpColorCookie);     // 쿠키저장
			    
			    /*
				//comCode 쿠키. 2023.07.14  hsg
			    Cookie comCodeCookie = new Cookie("sGYsBkC5mC5d2", comCode);// 한글쿠키값 저장하기 위해 encode처리
				reUserIdSave.setPath("/");                               // 모든 경로에서 접근 가능하도록			    	
				if(("SaveOK").equals(signInfoSave)) {  //comCode 3650일동인 쿠키저장
					reUserIdSave.setMaxAge(60*60*24);  
				}else {
					
					reUserIdSave.setMaxAge(0);
				}
			    response.addCookie(reUserIdSave);                // 쿠키저장
			    */
			    //세션 생명 시간 설정
			    session.setMaxInactiveInterval(43200);   //12시간 . 1시간 = 3600 초
			    //세션값 설정
				session.setAttribute("comCode", comCode);      //회사코드
				session.setAttribute("userId", userId);        //사용자아이디				
				session.setAttribute("comName", comName);
				session.setAttribute("userName", userName);
				
				//241105 supi 로그인 성공시 세션값 설정후 리플래시토큰 쿠키설정
				setCookieRefreshJwt(o_user , response);
				
				rttr.addFlashAttribute("msg", "OK");
				
			} catch (Exception e) {
				e.printStackTrace();
			}

			if ( rdU == null || rdU.equals("") || rdU.equals("null") ) {
				rdU = "/";
			}
			
			//모바일로 접속시에 대한 분기 추가
			if(mobileLogin != null)
			{
				rdU ="/mobile/";
			}
			else if(("/sing-in").equals(rdU)){
				rdU = "/";
			}
			
			
			return "redirect:"+rdU;
			
		}else {
			rttr.addFlashAttribute("msg", "FAIL");
			return "redirect:sign-in";
		}
	}
	
	
	/* 
   	 * 2022.10.26  -- carBizType 세션삭제
   	 * 2023.07.14 hsg - comCode 쿠키  pA14Cc09S22 삭제추가
   	 */
	@RequestMapping("/sign-out")
	public String logOut(HttpServletResponse response) {
		
		//자동로그인 쿠키값 삭제
		String autoLoginSession = "";
    	autoLoginSession = null;
		Cookie cookie = new Cookie("loGsEs2ion", autoLoginSession);   //값을 null로 지정
		cookie.setMaxAge(0);         // 유효시간을 0으로 설정
		cookie.setPath("/");         // 쿠키생성 시 path설정해 준 경우라면 이것도 포함
	    response.addCookie(cookie);	

	    Cookie reComCodeSave = new Cookie("pA14Cc09S22", null);
		reComCodeSave.setMaxAge(0);         // 유효시간을 0으로 설정
		reComCodeSave.setPath("/");         // 쿠키생성 시 path설정해 준 경우라면 이것도 포함
	    response.addCookie(reComCodeSave);	

	    
 	    //세션값 소멸
		session.removeAttribute("comCode");      //회사코드
		session.removeAttribute("userId");        //사용자아이디				
		session.removeAttribute("comName");
		session.removeAttribute("userName");
		
		//241105 supi 로그아웃시 리플래시 토큰 삭제
		Cookie myCookie = new Cookie("refreshJwt", null);
	    myCookie.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
	    myCookie.setPath("/"); // 모든 경로에서 삭제 됬음을 알린다.
	    response.addCookie(myCookie);
		 
	    return "redirect:/";
	}	

	
	//////////////////////////////////////////////////////////////////////////////////////////////
	/*
	 * 회원의 세션삭제: 테스트용으로업무에는 사용 안하는것임. 자동로드인 등 로그인 관련 세션값 삭제할때 사용함.
	 */
	@RequestMapping(value = "/sessionDel")
		public void sessionDel(@RequestParam(defaultValue="") String srcTxt, 
								Model model) {
			
		session.removeAttribute("memberIdx");
		session.removeAttribute("CustCode");
		session.removeAttribute("mancode");
				
	
	
		
		return;
		
	}
	
	 @RequestMapping(value = "/robots.txt")
	 @ResponseBody
	 public String robots() {
	 	//return "User-agent: *\nAllow: /md\n";
		 return "User-agent: *\nDisallow: / \n";
	 	
	 }
	 
	 ///////////////////////////////////////////////////////////////////////////////////////////////
	 
	 /*
		 * 로그인 안내 팝업 20230117 bokyung

		 */
	 @RequestMapping(value="/signinGuide", method=RequestMethod.GET)
		public String signinGuide(String redirect_target,Model model ) {

			
			if(redirect_target==null) {
				redirect_target = request.getHeader("referer"); 		//이전페이지 
			}
			
			model.addAttribute("redirect_target",redirect_target);

			return "/signinGuide";
		}
	 
	  /*
			 * 비밀번호 찾기 페이지 20230117 bokyung

			 */
		
	 @RequestMapping(value="/findPassword", method=RequestMethod.GET)
		public String findPassword(String redirect_target,Model model ) {

			
			if(redirect_target==null) {
				redirect_target = request.getHeader("referer"); 		//이전페이지 
			}
			
			model.addAttribute("redirect_target",redirect_target);

			return "/findPassword";
		}
	 
		
		/*
		 * @RequestMapping(value="/findPwdd", method=RequestMethod.POST) public String
		 * findPwd(String redirect_target, String id, String , Model model ) {
		 * 
		 * 
		 * if(redirect_target==null) { redirect_target = request.getHeader("referer");
		 * //이전페이지 }
		 * 
		 * model.addAttribute("redirect_target",redirect_target);
		 * 
		 * return "/findPassword"; }
		 */


	@RequestMapping(value="/findPwd", method=RequestMethod.POST) 
	public String findPwd(HttpSession session, HttpServletResponse response,
         RedirectAttributes rttr, String redirect_target, String uname, String comCode , String uid, Model model ) {
		
		HashMap<String,Object> params = new HashMap<String, Object>();		
		String workingType = "FIND_PWD";	
		params.put("workingType",workingType);
		params.put("logComCode",comCode);
		params.put("logUserId",uid);
		params.put("logUserName",uname);
		params.put("logIP",CommonMethod.getUserIP());		
		
		
		
		User o_user  = memberService.findPwd(params);
		
		if (o_user!=null  && !("").equals(o_user.getComCode())) {
			//rttr.addFlashAttribute("uid", uid);
			//rttr.addFlashAttribute("uname", uname);
			//rttr.addFlashAttribute("comCode", comCode);
			
			model.addAttribute("uid", uid);
			model.addAttribute("uname", uname);
			model.addAttribute("comCode", comCode);
			
			return "resetPwd";
			//return "redirect:resetPwd";
		}else {
			rttr.addFlashAttribute("msg", "FAIL");
			return "redirect:findPassword";
		}
		
		//String o_userName = o_user.getUserName();
		//String o_pwd = o_user.getPwdEnc();
		
		
		
		
		
	}


	/*
	 * 비밀번호 재설정 페이지 20230120 bokyung
	 */
	@RequestMapping(value="/resetPwd", method=RequestMethod.GET)
		public String resetPassword(String redirect_target, String uid, String uname, String comCode, Model model ) {
	
			if(redirect_target==null) {
				redirect_target = request.getHeader("referer"); 		//이전페이지 
			}
			
			
			
			
			
			model.addAttribute("uid",uid);
			model.addAttribute("uname",uname);
			model.addAttribute("comCode",comCode);
			
			model.addAttribute("redirect_target",redirect_target);
	
			return "/resetPwd";
		}

	@RequestMapping(value="/resetPw", method=RequestMethod.POST) 
	public String resetPw(HttpSession session, HttpServletResponse response,
	        RedirectAttributes rttr, String redirect_target, String upw1, String upw2 ,
	        String uid, String uname, String comCode,         Model model ) {
		
			User i_user = new User();
			HashMap<String,Object> params = new HashMap<String, Object>();
			
			i_user.setUserId(uid);
			i_user.setUserName(uname);
			i_user.setPwdEnc(SHA256Util.getSha256(upw1));
			String workingType = "RESET_PWD";	
			params.put("workingType",workingType);
			params.put("logComCode",comCode);
			params.put("user",i_user);
			
			//params.put("logOldPwd",SHA256Util.getSha256(upw1));
			//params.put("pwdEnc",SHA256Util.getSha256(upw1));
			//params.put("userId",uid);
			//params.put("userName",uname);	
			
		
			
			User o_user = new User(); 
			o_user = memberService.resetPw(params);
			
			if (("OK").equals( o_user.getDb_resultCode())){
				//성공
				rttr.addFlashAttribute("msg", "OK");
				return "redirect:/";				
			}else {
				//실패
				rttr.addFlashAttribute("msg", "FAIL");
				return "/resetPwd";
			}						
	}
	
	//20231207 supi - 세션에 저장된 comCode , userId, userName를 이용하여 동일 id,name,pwd를 가진 회사 명단을 리스트롤 반환 받는 기능
	@RequestMapping(value="/getCAComCode" , method=RequestMethod.POST) 
	@ResponseBody  
	public List<String> getCAComCode( HttpSession session, HttpServletResponse response,Model model )
	{ 
		HashMap<String,Object> params = new HashMap<String, Object>();
		
		params.put("comCode",session.getAttribute("comCode"));
		params.put("userId",session.getAttribute("userId"));
		params.put("userName",session.getAttribute("userName"));
		 
		List<String> userList =  memberService.getCAComCode(params); 
		 
		return userList;
	}
	
	//20231207 supi - 세션에 저장된 데이터를 이용하여 매개변수로 받은 변경하려는 changeComName를 통해 회사 변경하는 기능
	@RequestMapping(value="/cComCode" , method=RequestMethod.POST) 
	@ResponseBody 
	public int cComCode(HttpSession session, HttpServletResponse response,  String changeComName ,  Model model  )
	{ 
		 
		HashMap<String,Object> params = new HashMap<String, Object>();
		params.put("curComName", session.getAttribute("comName"));
		params.put("curComCode", session.getAttribute("comCode"));
		params.put("curUserId",session.getAttribute("userId"));
		params.put("curUserName",session.getAttribute("userName"));
		params.put("changeComName", changeComName);
		  
		User user = new User();
		user = memberService.cComCode(params); 
		
		if(user == null) // 명단 갱신중 데이터가 달라졌거나 하는 이유로 변경하려는 회사의 comCode와 컬러가 담긴 user이 널이면 실패로 -1 반환
		{
			return -1;
		}
		else 
		{   
			String dpColor = user.getDpColor();
			if(dpColor == null) dpColor = "#206bc4";
			Cookie dpColorCookie = new Cookie("dPc515R",dpColor);
			dpColorCookie.setPath("/");                               	    	
			dpColorCookie.setMaxAge(60*60*24*7);   //1주일
			response.addCookie(dpColorCookie);     // 쿠키저장
			session.setAttribute("comCode", user.getComCode());
			session.setAttribute("comName", changeComName); 
			
			//241105 supi 업체변경시 리플래시토큰 재발행
			setCookieRefreshJwt(user, response);
			return 1;
		}
	}
	//20231211 supi - 볼수 있는 알림리스트 받아오는 통신
	@RequestMapping(value="/notilistread" , method=RequestMethod.POST) 
	@ResponseBody 
	public List<ForCarNotification> notiListRead( HttpSession session, HttpServletResponse response, Model mode  )
	{   
		 
		HashMap<String,Object> params = new HashMap<String, Object>(); 
		params.put("comCode", session.getAttribute("comCode"));
		params.put("userId",session.getAttribute("userId"));  
		List<ForCarNotification> fc = memberService.notiListRead(params);

		
		
		//System.out.println(memberService.notificationCheck(params));
		return fc;
		 
	}
	//20231212 supi -  알림을 닫을때의 처리
	@RequestMapping(value="/notiClose" , method=RequestMethod.POST) 
	@ResponseBody 
	public int notiClose( HttpSession session, HttpServletResponse response,BigInteger notiIdx,Boolean isNotView ,Model mode  )
	{   
		 
		HashMap<String,Object> params = new HashMap<String, Object>(); 
		params.put("comCode", session.getAttribute("comCode"));
		params.put("userId",session.getAttribute("userId"));  
		params.put("notiMsgIdx" , notiIdx);
		params.put("foreverNotView" , isNotView?'Y':'N');
		memberService.notiClose(params);
		
		 
		return 1;
	}
	/*
	 * 
	 * 2024.01.03 supi 계열사인지 아닌지 여부를 알기 위한 통신 맞으면 true , 아니면 false
	 */
	@RequestMapping(value = "/getErpYN")
	@ResponseBody
	public Boolean getErpYN(Model model) {
		
		String logComCode = (String) session.getAttribute("comCode"); 
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		
		i_param.put("logComCode", logComCode);     
		 	 
		return memberService.getErpYN(i_param).equals("Y");
	}
	/**
	 *   20240620 supi 두개의 파라미터가 관계사인지 반환하는 쿼리 
	 */
	@RequestMapping(value = "/getRelationYN")
	@ResponseBody
	public Boolean getRelationYN(Model model , String com , String com2) {
		
		String logComCode = (String) session.getAttribute("comCode"); 
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		
		i_param.put("logComCode", logComCode);     
		i_param.put("com", com);     
		i_param.put("com2", com2);     
		
		return memberService.getRelationYN(i_param).equals("Y");
	}
	
	/**
	 *   20240729 supi 해당 코드에 권한 있는지 체크하는 통신 
	 */
	@RequestMapping(value = "/permissionCheckYN")
	@ResponseBody
	public Boolean permissionCheckYN(@RequestParam String checkCode , Model model) {
		
		String logComCode = (String) session.getAttribute("comCode"); 
		String userId = (String) session.getAttribute("userId"); 
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		
		i_param.put("logComCode", logComCode);     
		i_param.put("userId", userId);      
		i_param.put("checkCode", checkCode);      
		
		return memberService.permissionCheckYN(i_param).equals("Y");
	}
	

	//로그인시 토큰을 쿠키에 저장시켜주는 메소드
	private boolean setCookieRefreshJwt(User o_user,HttpServletResponse response)
	{
		if(o_user == null) return false; // 매개변수에 유저 객체가 null이면 잘못된 호출이므로 false 반환하고 종료
		String userIp = CommonMethod.getUserIP();
		//String accessJwt = jwtUtil.genAccessJwt(o_user.getComCode(), o_user.getComName(), o_user.getUserId(), o_user.getUserName(),userIp);
		String refreshJwt = jwtUtil.genRefreshJwt(o_user.getComCode(), o_user.getComName(), o_user.getUserId(), o_user.getUserName(),userIp);
		//Claims claims =  jwtUtil.getDataRefreshToken(refreshJwt);
		Cookie myCookie = new Cookie("refreshJwt", refreshJwt);
		myCookie.setMaxAge(JwtInfo.JWT_REFRESH_EXPIRED_SECOND);
		myCookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
		myCookie.setHttpOnly(true);
		response.addCookie(myCookie); 
		return true;
	}
}

