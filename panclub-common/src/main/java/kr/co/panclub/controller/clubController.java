package kr.co.panclub.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.panclub.model.C_cust;
import kr.co.panclub.model.C_custMenu;
import kr.co.panclub.service.IBaseService;
import kr.co.panclub.service.IClubService;
import kr.co.panclub.service.IMemberService;


/*git update test*/

@Controller
@RequestMapping("/club/*")
public class clubController {

	@Autowired
	private HttpSession session;
	
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private IMemberService memberService;	
	
	@Autowired
	private IBaseService baseService;	
	
	@Autowired
	private IClubService clubService;	
	
		
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// 팬클럽이용업체 빈페이지
	@RequestMapping(value = "/c-cust")
	public String cCust(Model model) {

		return "club/c-cust";
		
	}

	@RequestMapping(value = "/c-cust", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> cCust(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, C_cust i_c_cust, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("c_cust", i_c_cust);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);

		List<C_cust> c_custList = clubService.c_custList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("c_custList", c_custList);
		result.put("i_c_cust", i_c_cust);


		model.addAllAttributes(result);

		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "/cCustReg", method = RequestMethod.POST)
	public HashMap<String, Object> cCustAdd(@RequestBody C_cust c_custSet) {

		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		ArrayList<C_cust> addList = c_custSet.getC_custAdd();
		ArrayList<C_cust> updateList = c_custSet.getC_custUpdate();
		ArrayList<C_cust> removeList = c_custSet.getC_custRemove();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		C_cust c_cust = null;			

		int result = 0;
		
		String result_code ="";
		String result_msg ="";
		
		int okCount = 0;
		int errCount = 0;
		
		//String pwdEncGet = "";
		String errIdx = "";
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				c_cust = addList.get(i);
				c_cust.setRegUserId(logUserId);
		
				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("c_cust", c_cust);
				
				result = clubService.c_custReg(params);
				if(result == 1) {
					okCount = okCount + 1;
				} else {
					errCount = errCount + 1;
					errIdx = errIdx + "^" + c_cust.getCustCode();
				}		
			}
			
			if (addList.size() == okCount ) {
				result_code = "OK"; 
				result_msg = "성공";				
			}else {
				result_code = "Err"; 
				result_msg = errCount + "개 행 에러 발생";
			}				
		}

		params.clear();
	
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				c_cust = updateList.get(i);
				//user.setUserId(user.getUserId_origin());
				
				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("c_cust", c_cust);

				result = clubService.c_custReg(params);
				if (result == 0) {
					errIdx = errIdx + "^" + c_cust.getCustCode();
				}
			
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {

				c_cust = removeList.get(i);

				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("c_cust", c_cust);

				result = clubService.c_custReg(params);
				if (result == 0) {
					errIdx = errIdx + "^" + c_cust.getCustCode();
				}
			}
		}

		if (("").equals(errIdx)) {
			result_code = "OK";
			result_msg = "저장되었습니다.";
		}else {
			result_code = "Err";
			result_msg = "저장 실패한 자료가 있습니다.";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		map.put("errIdx", errIdx);

		return map;
	}
		
	
	///////////////////////////////////////////////////////////////////////////////////////
	
	/*
	 * 거래처별메뉴목록 빈페이지
	 * */	
	@RequestMapping(value="/cust-menu")
	public String menuByUserList(){	
		return "club/cust-menu";		
	}
	
	/*
	 * 거래처별메뉴목록
	 * */
	@RequestMapping(value="/cust-menu", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> menuByUserList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			C_custMenu i_c_custMenu,   @RequestParam(defaultValue="") String test,  Model model){		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "CODE_QRY");
		i_param.put("custMenu", i_c_custMenu);
		
		List<C_custMenu> c_custMenuList = clubService.c_custMenuList(i_param);
		
				
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("c_custMenuList", c_custMenuList);
		result.put("i_c_custMenu", i_c_custMenu);
		
		model.addAllAttributes(result);
		
		return result;		
	}
	
	/* 
	 * 거래처별 메뉴등록 
	 * */
	@ResponseBody
	@RequestMapping(value = "/custMenuReg", method = RequestMethod.POST)
	public HashMap<String, Object> custMenuAdd(@RequestBody C_custMenu c_custMenuSet ) {
		
		String workingType = c_custMenuSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
				
		//ArrayList<C_custMenu> addList = c_custMenuSet.getC_custMenuAdd(); // 추가 리스트 얻기
		//ArrayList<C_custMenu> removeList = c_custMenuSet.getC_custMenuRemove(); // 제거 리스트 얻기
		ArrayList<C_custMenu> updateList = c_custMenuSet.getC_custMenuUpdate(); // 수정 리스트 얻기

		//거래처마스터 등록
		HashMap<String,Object> params = new HashMap<String, Object>();		
   	    params.put("workingType",workingType);
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		params.put("c_custMenu",c_custMenuSet);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
	    
		String result_code ="";
		String result_msg ="";
		
		int okCount = 0;
		int errCount = 0;
		
		int result = 0;
		
		C_custMenu c_custMenu = null;		
		
		String errIdx = "";
		
		String custCode = c_custMenuSet.getCustCode();
		/*
		 * if (addList.size() > 0) { for (int i = 0, len = addList.size(); i < len; i++)
		 * { c_custMenu = addList.get(i); c_custMenu.setUptUserId(logUserId);
		 * 
		 * params.put("workingType", "ADD"); params.put("logComCode", logComCode);
		 * params.put("logUserId", logUserId); params.put("c_custMenu", c_custMenu);
		 * 
		 * result = clubService.c_custMenuReg(params); if(result == 1) { okCount =
		 * okCount + 1; } else { errCount = errCount + 1; errIdx = errIdx + "^" +
		 * c_custMenu.getMenuCode(); } }
		 * 
		 * if (addList.size() == okCount ) { result_code = "OK"; result_msg = "성공";
		 * }else { result_code = "Err"; result_msg = errCount + "개 행 에러 발생"; } }
		 */

		params.clear();
		
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				c_custMenu = updateList.get(i);
				if (c_custMenu.getCustCode() == null || (("Y").equals(c_custMenu.getValidYN()))  ) { //신규이거나 노출유무 'Y' 인 경우
					params.put("workingType", "ADD");					
				}else {
					params.put("workingType", "DEL");
				}
				c_custMenu.setCustCode(custCode);  // 등록하려는 거래처코드가 c_custMenu에는 없어서 즉, 그리드에는 없어서 
				
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("custMenu", c_custMenu);

				result = clubService.c_custMenuReg(params); 
				if (result == 0) {
					errIdx = errIdx + "^" + c_custMenu.getMenuCode();
				}
				
			}
		}

		/*
		 * params.clear(); if (removeList.size() > 0) { for (int i = 0, len =
		 * removeList.size(); i < len; i++) {
		 * 
		 * c_custMenu = removeList.get(i);
		 * 
		 * params.put("workingType", "DEL"); params.put("logComCode", logComCode);
		 * params.put("logUserId", logUserId); params.put("c_custMenu", c_custMenu);
		 * 
		 * result = clubService.c_custMenuReg(params); if (result == 0) { errIdx =
		 * errIdx + "^" + c_custMenu.getMenuCode(); } } }
		 */

		if (("").equals(errIdx)) {
			result_code = "OK";
			result_msg = "저장되었습니다.";
		}else {
			result_code = "Err";
			result_msg = "저장 실패한 자료가 있습니다.";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		map.put("errIdx", errIdx);

		return map;
	}
	
	
}


