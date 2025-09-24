package kr.co.panclub.common;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import kong.unirest.json.JSONObject;




@Service
public class CommonMethod {

	//private  HttpSession session;
	@Autowired
	private HttpServletRequest request;	

	//2023.07.14 hsg - 현재 접속중인  comCode 가져오기
	public static String getComCodeCookie(HttpServletRequest req) {
		String comCode = "";
		Cookie[] cookies = req.getCookies();
		for(Cookie c : cookies) {
		  	if (("pA14Cc09S22").equals(c.getName())) {
		  		comCode = c.getValue();
		  	}
		}
		return comCode;
	}
	

	// 현재 접속중인 사용자의 memberidx 
	public  static  int getMemberIdx() {
		
		int reqCookie =0;
		int memberIdx = 0;
		try {
			ServletRequestAttributes servletRequestAttribute = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes(); 
			HttpSession httpSession = servletRequestAttribute.getRequest().getSession(true); 
			String memberIdx_string =  (String) httpSession.getAttribute("XdIRebmEm_");
			
			//String memberIdx_string =  (String) session.getAttribute("XdIRebmEm_");
			
			
			if (memberIdx_string != null && !memberIdx_string.equals("") && !memberIdx_string.equals("null")) {
				memberIdx = Integer.parseInt(memberIdx_string);
			}		
			
			reqCookie =  memberIdx; 
			
		}catch(Exception e) {
			e.printStackTrace();
			reqCookie = 0;
		}
		return reqCookie;
	}

	// 사용자의 IP
	public static String getUserIP() {
		
		String userIP = "";
		
		ServletRequestAttributes servletRequestAttribute = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes(); 
		userIP = servletRequestAttribute.getRequest().getHeader("X-FORWARDED-FOR"); 
		userIP = (userIP == null || userIP.length() == 0) ? servletRequestAttribute.getRequest().getHeader("Proxy-Client-IP") : userIP; 
		userIP = (userIP == null || userIP.length() == 0) ? servletRequestAttribute.getRequest().getHeader("WL-Proxy-Client-IP") : userIP; // 웹로직
		userIP = (userIP == null || userIP.length() == 0) ? servletRequestAttribute.getRequest().getRemoteAddr() : userIP; // 	
		/*
		userIP = request.getHeader("X-FORWARDED-FOR"); // HTTP Header
		userIP = (userIP == null || userIP.length() == 0) ? request.getHeader("Proxy-Client-IP") : userIP; 
		userIP = (userIP == null || userIP.length() == 0) ? request.getHeader("WL-Proxy-Client-IP") : userIP; // 웹로직
		userIP = (userIP == null || userIP.length() == 0) ? request.getRemoteAddr() : userIP; // 
		*/
		
			
		return userIP;
	}
	
	
	public static String getCleanXSS(String value) {
        //You'll need to remove the spaces from the html entities below
		   value = value.replaceAll("<", "& lt;").replaceAll(">", "& gt;");
		   value = value.replaceAll("\\(", "& #40;").replaceAll("\\)", "& #41;");
		   value = value.replaceAll("'", "& #39;");
		   value = value.replaceAll("eval\\((.*)\\)", "");
		   value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
		   value = value.replaceAll("script", "");
		   return value;
	}
	
	public static String getCleanXSSRe(String value) {
        //You'll need to remove the spaces from the html entities below
		   value = value.replaceAll("& lt;", "<").replaceAll("& gt;", ">");
		   value = value.replaceAll("& #40;", "\\(").replaceAll("& #41;", "\\)");
		   value = value.replaceAll("& #39;", "'");
		   //value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
		   return value;
	}	

	/** Map을 json형식의 String으로 변환 */
	@SuppressWarnings("unchecked")
	public static String getJsonStringFromMap(Map<String, Object> map) {
    
		JSONObject json = new JSONObject();
		
		for(Map.Entry<String, Object> entry : map.entrySet()) {
			
			String key = entry.getKey();
            Object value = entry.getValue();
            
            json.put(key, value);
        }
        
        return json.toString();
	}
	
	
}
