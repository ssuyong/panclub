package kr.co.panclub.controller;

 
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.panclub.service.IMemberService;

@Controller
@RequestMapping("/mobile/*")
public class mobileController {

	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private IMemberService memberService;	
	
	
	/*- 모바일 초기화면 페이지 
	 * 2024.06.13 supi 작성
	 */
	@RequestMapping(value="/")
	
	public String index( Model model){
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1)
		{
			return "mobile/index";
		}
		else {
		
			return getRedirectIndexUrl();
		} 
	} 
	/*- 모바일 품목정리 페이지
	 * 2024.06.13 supi 작성
	 */
	@RequestMapping(value="/itemListUp")
	public String itemListUp( Model model){
		
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/itemListUp";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 수동입출고 페이지
	 * 2024.06.13 supi 작성
	 */
	@RequestMapping(value="/itemWr")
	public String itemWr( Model model){
		
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/itemWr";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 품번조회 페이지
	 * 2024.06.21 supi 작성
	 */
	@RequestMapping(value="/itemInfo")
	public String itemInfo( Model model){
		 
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/itemInfo";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 더미페이지용 url
	 * 2024.06.21 supi 작성
	 */
	@RequestMapping(value="/dummy1")
	public String dummy1( Model model){
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/dummy1";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 더미페이지용 url
	 * 2024.06.21 supi 작성
	 */
	@RequestMapping(value="/dummy2")
	public String dummy2( Model model){
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/dummy2";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 더미페이지용 url
	 * 2024.06.21 supi 작성
	 */
	@RequestMapping(value="/dummy3")
	public String dummy3( Model model){
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/dummy3";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	 
	/*
	 * 
	 * 로컬에서 보내면 sts 에서 문자열찍기위한 테스트코드
	 */
	@RequestMapping(value = "/test")
	@ResponseBody
	public int test(String obj, Model model) {
		
		System.out.println(obj);
		return 1;
	}	
	
	
	/*
	 * 모바일 페이지에서 지점법인이 아니면 모바일 페이지 노출을 안하기 위해 확인통신
	 */
	private Boolean erpYN()
	{
		String logComCode = (String) session.getAttribute("comCode"); 
		if(logComCode == null) return false;
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("logComCode", logComCode);    
		 	 
		return ((memberService.getErpYN(i_param).equals("Y")) || (logComCode.equals("ㄱ000")));
	}
	
	//pc 화면으로 리다이렉트 string 반환함수
	private String getRedirectIndexUrl()
	{
		return "redirect:"+request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/";
	}
	
	/*- 모바일 피킹내역조회(주문,회수,창고)
	 * 2024.06.25 supi 작성
	 */
	@RequestMapping(value="/pickingList")
	public String pickingList( Model model){
		 
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/pickingList";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 피킹내역조회(주문,회수,창고)
	 * 2024.06.25 supi 작성
	 */
	@RequestMapping(value="/pickingItemList")
	public String pickingItemList( Model model){
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/pickingItemList";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 패킹내역조회(출고)
	 * 2024.07.05 supi 작성
	 */
	@RequestMapping(value="/packingList")
	public String packingList( Model model){
		 
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/packingList";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
	/*- 모바일 패킹상세내역(출고)
	 * 2024.07.05 supi 작성
	 */
	@RequestMapping(value="/packingItemList")
	public String packingItemList( Model model){
		
		if(request.getHeader("User-Agent").toUpperCase().indexOf("MOBI") > -1 && erpYN())
		{
			return "mobile/packingItemList";
		}
		else {
			return getRedirectIndexUrl();
		} 
	}
}
















