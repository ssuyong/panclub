package kr.co.panclub.controller;

import java.net.URLEncoder;
import java.util.HashMap;

/*  
 * .2017.11.??.  함승구  - 로그인여부 체크
 * .2018.01.09.  함승구  - 자동로그인 관련 추가
 */

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import io.jsonwebtoken.Claims;
import kr.co.panclub.common.CommonMethod;
import kr.co.panclub.common.JwtInfo;
import kr.co.panclub.common.JwtUtil;
import kr.co.panclub.common.SHA256Util;
import kr.co.panclub.model.User;
import kr.co.panclub.service.IBizService;
import kr.co.panclub.service.IMemberService;


@Component
public class LoginCheckInterceptor extends HandlerInterceptorAdapter {
	@Autowired
	private HttpSession session;
	
	@Autowired
	private IMemberService memberService;
	
	@Autowired
	private IBizService bizService; 
	
	@Autowired
	private JwtUtil jwtUtil; 
	

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		
		//인터셉트 된 페이지: 로그인 후 이 페이지로 이동하기 위하여..
		String targetURL = "";
		targetURL = "/sign-in";		
		
		//targetURL = "/main";
		String redirect_target = request.getRequestURI().toString().trim();
		String query_string = "";
		query_string = request.getQueryString(); //.toString().trim();		
		
		/*
		if (redirect_target != null && redirect_target.indexOf("/shop/") > -1) {
			targetURL = "/shop/login";
		}		
		*/
		if(query_string!=null) {
			query_string = request.getQueryString().toString().trim();
			query_string = URLEncoder.encode(query_string, "UTF-8");
			targetURL = targetURL+"?rdU="+redirect_target+"?"+query_string; 
		}else {
			targetURL = targetURL+"?rtU="+redirect_target;
		}
				
		
		//테스트용할때 사용 session값 삭제 : 여기에 쓰면 무한루프 돌수 있으나 이코드를 다른데 index페이지 등에서 사용해야..
		/*session.removeAttribute("CustCode");
		session.removeAttribute("mancode");		
		session.removeAttribute("memberIdx");
		session.removeAttribute("goodsPermitCol_arr");
		session.removeAttribute("vatType");
		session.removeAttribute("custname");
		session.removeAttribute("manName");
		session.removeAttribute("onlineYN");    // 온라인업체인지. erp에서 온라인으로 체크된 경우		
		session.removeAttribute("shoplogYN");   // 인증번호 안받는 업체. 쇼핑몰업체 인지.euro_cust_menu_auth  테이블에 'ALL','SUPER'로 등록이 안된 경우
*/		////////////////////////////////////
		
		// 세션값이 존재하는 경우 에만 로그인된것으로 처리	
		String comCode_s = null;
		if (session.getAttribute("comCode") != null) {
			comCode_s = session.getAttribute("comCode").toString();
		}
		String userId_s = (String) session.getAttribute("userId");

		
		boolean result = true;
		if (comCode_s == null || userId_s== null) {
			//세션에 컴코드나 id가 없으면 로그인 안된것으로 하는부분인데 여기서 리플레시키로 재발급 시도
			//result = false;
			
			result = refreshSession(request); // 토큰으로 재발급이 성공하면 true반환되어 정상 처리됨
		}

		if(result == true) { //세션에 로그인정보가 있는 경우
			
			
			
			
			return result;
			
		}else {   
			/*
			 * 자동로그인 처리
			 * 1.쿠키에 자동로그인 세션값 존재하는지 체크
			 * 2.존재하는 경우 해당 값이 DB에 존재하는 지 체크
			 * 3.존재하는 경우 세션에 로그인 정보 남기기 
			 */
			//1. 쿠키에 자동로그인 세션값 존재하는지 체크
			String autoLoginSession = "";
			Cookie[] cookiesS = request.getCookies();
			
			if (cookiesS!=null) {  //쿠키가 존재하는 경우
				for (Cookie cookie : cookiesS) {			
					if("loGsEs2ion".equals(cookie.getName())) {
						autoLoginSession = cookie.getValue();
						
					}
				}
			}	
			//2.존재하는 경우 해당 값이 DB에 존재하는 지 체크
			if(!("").equals(autoLoginSession)) {
				HashMap<String,Object> params = new HashMap<String, Object>();
				params.put("workingTag", "AUTO_SESSION");
				params.put("autoLoginSession", autoLoginSession);			

			}
		
			response.sendRedirect(targetURL);
			return false;
		}

		/*
		 * 자동로그인 처리 END. 
		 */
		
	}

    // 컨트롤러가 수행되고 화면이 보여지기 직전에 수행되는 메서드
	/*
	 * 작성 : ?
	 * 수정 : 2023.01.30 - 로그인된 경우 메뉴 권한 체크
	 *       2023.12.01  supi - 권한체크 안되던부분 구현
	 *       2024.05.14  supi - modelAndView == null 인 경우 return처리 메소드 앞에 둬서 체크. 이경우 페이지이동이 아닌 컨트롤러 사용하는 경우는 메뉴권한 체크 안되게 하기 위함.
	 */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
    	
    	 
    	//페이지 이동이 아닐때는 메뉴받아오는것과 인증 생략 2024.05.14 supi 
    	if (modelAndView == null) { 
    		super.postHandle(request, response, handler, modelAndView);
    		return;
    	} 
    	// 메뉴 권한 체크. 2023.01.30
    	String requesUri = request.getRequestURI();
    	try {
    		
	    	if (session.getAttribute("comCode") != null) { //세션있는 경우. 즉, 로그인된경우
	    		
	    		String logComCode = (String) session.getAttribute("comCode");
	    		String logUserId = (String) session.getAttribute("userId");
	    		
	    		//MenuByUser i_menuByUser = new MenuByUser();
	    		//Menu i_menu = new Menu();
	    		
	    		
	    		//i_menu.setMenuUrl(requesUri);
	    		
	    		//i_menuByUser.setComCode(logComCode);
	    		//i_menuByUser.setUserId(logUserId);
	    		
	    		HashMap<String,Object> i_param = new HashMap<String, Object>();
	    		//i_param.put("workingType", "CODE_QRY");
	    		//i_param.put("menuByUser", i_menuByUser);
	    		i_param.put("menuUrl", requesUri);
	    		i_param.put("logComCode", logComCode);
	    		i_param.put("logUserId", logUserId);
	    		
	    		String permission = bizService.permissionURLCheck(i_param);	    	//권한 체크 
	    		
	    		//String srchAuth = "Y";     
	    		if (!response.isCommitted()) { // 페이지 이동의 통신인 경우 
	    	 
	    			boolean isNotAuth = ((!("/").equals(requesUri)) &&  ("N").equals(permission) );  // 기본 페이지는 권한 없어서 예외
	    			
	    			//20241008 supi 권한 체크가 객체에서 문자열반환으로 변경되어 null체크 주석처리함
	    			//if(menuByUserOne != null)  // 권한 없는지 확인 null 체크한 이유는 menuByUserOne의 메소드를 사용하는데 menuByUserOne가 널일 경우
	    			//{
	    			//	isNotAuth = ("N").equals(menuByUserOne.getSrchAuth());
	    			//}
	    			if (isNotAuth) {
	    		
	    			  //if (("N").equals(menuByUserOne.getSrchAuth())) {
	    				
	    			  session.removeAttribute("comCode");  // 로그인 정보 날려버림
	    			  session.removeAttribute("userId");
	    			  //241107 supi 권한없을때 토큰 삭제 
	    			  Cookie myCookie = new Cookie("refreshJwt", null);
	    			  myCookie.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
	    			  myCookie.setPath("/"); // 모든 경로에서 삭제 됬음을 알린다.
	    			  response.addCookie(myCookie);
	    			  
	    			  String msg = "권한이 없습니다.";
	    			  msg = msg.replaceAll("\\+", "%20");
	    			  ModelAndView mav = new  ModelAndView("redirect:/sign-in"); 
					  mav.addObject("msgCode", URLEncoder.encode(msg, "UTF-8"));
					  mav.addObject("returnUrl", requesUri); throw new
					  ModelAndViewDefiningException(mav);
	    			}  
	    		}else {
	    			//response.sendRedirect(requesUri);
	    		}
				
	    	}else {
	    	  String msg = "다시 로그인하세요";
   			  msg = msg.replaceAll("\\+", "%20");
   			  ModelAndView mav = new  ModelAndView("redirect:/sign-in"); 
				  mav.addObject("msgCode", URLEncoder.encode(msg, "UTF-8"));
				  mav.addObject("returnUrl", requesUri); throw new
				  ModelAndViewDefiningException(mav);
	    		
	    	}
	    	
	    	//super.postHandle(request, response, handler, modelAndView);
		} catch (Exception e) {
			 String msg = "권한이 없습니다.";
			  msg = msg.replaceAll("\\+", "%20");
			  ModelAndView mav = new  ModelAndView("redirect:/sign-in"); 
			  mav.addObject("msgCode", URLEncoder.encode(msg, "UTF-8"));
			  mav.addObject("returnUrl", requesUri); throw new
			  ModelAndViewDefiningException(mav);
		}
    	
    	//20241008 supi 권한 받아오는 방식 변경으로 주석처리
    	//User o_user =  memberService.userMenuAuth();
    	//String menuAuthArr = o_user.getMenuAuthArr();  
    	//modelAndView.addObject("menuAuthArr",menuAuthArr);    	
    	    	
    	super.postHandle(request, response, handler, modelAndView);	
    }
	
    /* //세션생성
   	 * 2022.03.07  -- carBizType 세션에 넣기
   	 */
    public void loginSessionCreate(User user,HttpServletResponse response) {
    	
	    //세션값 저장
    	/*
    	session.setAttribute("memberIdx", member.getMemberIdx()); 
    	 
		session.setAttribute("CustCode", member.getCustCode());      //거래처코드
		session.setAttribute("mancode", member.getMancode());        //회원ID				
		session.setAttribute("goodsPermitCol_arr", member.getGoodsPermitCol_arr()); 
		session.setAttribute("vatType", member.getVatType());
		session.setAttribute("custname", member.getCustname());
		session.setAttribute("manName", member.getManName());
		session.setAttribute("onlineYN", member.getOnlineYN()); // 온라인업체여부. 이걸로 온라인주문입력메뉴 노출여부 확인. 
		session.setAttribute("shoplogYN", member.getShoplogYN()); //배송조회 권한만 있는 경우 ='Y', 품목/주문 등 권한 인경우 'Y' 원래는 윗의 것으로 하려고 했으나 테스트기간에는   'N'으로 통일
		session.setAttribute("carBizType", member.getCarBizType());
		*/ 
	}
    
    //세션이 없으면 리프레시 키로 세션 재발급 하는 코드
    private boolean refreshSession(HttpServletRequest request)
    {
    	Cookie[] cookieList = request.getCookies(); 
		if(cookieList == null) return false;
		for(Cookie cookie:cookieList)
		{
				
			if(cookie.getName().equals("refreshJwt"))
			{
				String token = cookie.getValue();
				if(jwtUtil.isRefreshTokenExpired(token)) break; // true면 만료라 재발급 불가능하고 for문 깨고 나옴
				Claims tokenData = jwtUtil.getDataRefreshToken(token);
				String userIp = CommonMethod.getUserIP();
				if(!(tokenData.get("pk").equals(SHA256Util.getSha256(userIp)))) break; //토큰내의 아이피와 현재 아이피가 다를경우 x
				
				
				session.setMaxInactiveInterval(JwtInfo.JWT_REFRESH_EXPIRED_SECOND);   //12시간
				//세션값 설정
				session.setAttribute("comCode", tokenData.get("comCode"));      //회사코드
				session.setAttribute("userId", tokenData.get("userId"));        //사용자아이디				
				session.setAttribute("comName", tokenData.get("comName"));
				session.setAttribute("userName", tokenData.get("userName")); 
				return true;
			} 
		}
		
    	return false;
    }
}
