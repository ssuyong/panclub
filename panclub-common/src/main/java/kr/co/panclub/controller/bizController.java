package kr.co.panclub.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.net.URLCodec;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.panclub.common.AES256Util;
import kr.co.panclub.common.SHA256Util;
import kr.co.panclub.common.code;
import kr.co.panclub.model.CoCard;
import kr.co.panclub.model.Cust;
import kr.co.panclub.model.CustBiz;
import kr.co.panclub.model.CustLedg;
import kr.co.panclub.model.Depart;
import kr.co.panclub.model.Menu;
import kr.co.panclub.model.MenuByUser;
import kr.co.panclub.model.Payment;
import kr.co.panclub.model.SalesAim;
import kr.co.panclub.model.Schedule;
import kr.co.panclub.model.Staff;
import kr.co.panclub.model.Transaction;
import kr.co.panclub.model.User;
import kr.co.panclub.model.UserLog;
import kr.co.panclub.model.WdReq;
import kr.co.panclub.model.WdReqDtl;
import kr.co.panclub.service.IBaseService;
import kr.co.panclub.service.IBizService;
import kr.co.panclub.service.IMemberService;

@Controller
@RequestMapping("/biz/*")
public class bizController {
	
	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private IMemberService memberService;

	@Autowired
	private IBizService bizService;
	
	@Autowired
	private IBaseService baseService;

	/*
	 * 2022-10-24 장윤상 사원 목록 - 빈페이지
	 **/
	@RequestMapping(value = "/staff-list")
	public String staffList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		if (("").equals(sYmd) || sYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, -1);
			sYmd = dateFormat.format(cal.getTime());
		}
		if (("").equals(eYmd) || eYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, 0);
			eYmd = dateFormat.format(cal.getTime());
		}

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		Staff i_staff = new Staff();

		
		// model.addAttribute("orderList", orderList);
		result.put("staff", i_staff);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		

		return "biz/staff-list";

	}

	/*
	 * 사원 목록
	 */
	@RequestMapping(value = "/staff-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> staffList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Staff i_staff,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		if (("").equals(sYmd) || sYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, -1);
			sYmd = dateFormat.format(cal.getTime());
		}
		if (("").equals(eYmd) || eYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, 0);
			eYmd = dateFormat.format(cal.getTime());
		}

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		i_staff.setComCode(comCode);

		String workingType = "";
		workingType = i_staff.getWorkingType();
		
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("staff", i_staff);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		

		List<Staff> staffList = bizService.staffList(i_param);

		
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("staffList", staffList);
		result.put("staff", i_staff);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return result;
	}

	/*
	 * 부서코드
	 */
	@RequestMapping(value = "/dept-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> deptList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Depart i_depart,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		if (("").equals(sYmd) || sYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, -1);
			sYmd = dateFormat.format(cal.getTime());
		}
		if (("").equals(eYmd) || eYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, 0);
			eYmd = dateFormat.format(cal.getTime());
		}

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		i_depart.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("depart", i_depart);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		

		
		List<Depart> deptList = bizService.deptList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("deptList", deptList);
		result.put("depart", i_depart);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		
		
		model.addAllAttributes(result);
		return result;		
	}
	
	/*
	 * 사원등록
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/staffAdd", method = RequestMethod.POST)
	public HashMap<String, Object> staffAdd(@RequestBody Staff staffSet) {

		

		// String workingType = staffSet.getWorkingType();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<Staff> updateList = staffSet.getStaffUpdateList(); // 수정 리스트 얻기
		ArrayList<Staff> addList = staffSet.getStaffAddList(); // 추가 리스트 얻기
		ArrayList<Staff> removeList = staffSet.getStaffRemoveList(); // 제거 리스트 얻기

		// 여기서 비지니스 로직을 작성하거나, 서비스 로직을 실행하세요.
		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Staff staff = null;

		Staff i_staff = new Staff();


			if (addList.size() > 0) {
				for (int i = 0, len = addList.size(); i < len; i++) {

					staff = addList.get(i);

					params.put("workingType", "ADD");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("staff", staff);

					i_staff = bizService.staffAdd(params);

				}
			}

			params.clear();
			
			if (updateList != null && updateList.size() > 0) {
				for (int i = 0, len = updateList.size(); i < len; i++) {

					staff = updateList.get(i);
					staff.setEmpNo(staff.getEmpNo_origin());
			
			
					params.put("workingType", "UPT");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("staff", staff);
			
					i_staff = bizService.staffAdd(params);
			
				}
			}

			params.clear();
			if (removeList.size() > 0) {
				for (int i = 0, len = removeList.size(); i < len; i++) {

					staff = removeList.get(i);
			

					params.put("workingType", "DEL");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("staff", staff);

					i_staff = bizService.staffAdd(params);
				}
			}

			map.put("result_code", i_staff.getDb_resultCode());
			map.put("result_msg", i_staff.getDb_resultMsg());
			if(i_staff.getDb_resultCode() == null) {
				map.put("result_code", "OK");
				map.put("result_msg", "저장되었습니다.");
			}
		

			
		return map;

	}
	
	
	////////////////////////////////////////////////////////////////////////////////////////
	////////////////// Begin : 정동근 매니저 작업분//////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////

	/*
	 * 사용자목록 빈페이지 정동근
	 * */
	
	@RequestMapping(value="/user-list")
	public String userList(){	
		return "biz/user-list";
		
	}
	
	/*
	 * 사용자목록 정동근
	 * */
	@RequestMapping(value="/user-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> userList( 
			
			User i_user,     Model model){		

		

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

                
		i_user.setComCode(comCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logUserId", userId);
		i_param.put("logComCode", comCode);
		i_param.put("user", i_user);


		
		List<User> userList = bizService.userList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("userList", userList);
		result.put("user", i_user);

	
		
		model.addAllAttributes(result);
		return result;		
	}
	
	/* 
	사용자등록 정동근
	*/
	
	@ResponseBody
	@RequestMapping(value = "/userAdd", method = RequestMethod.POST)
	public HashMap<String, Object> userAdd(@RequestBody User userSet) {
		
	

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<User> updateList = userSet.getUserUpdate(); // 수정 리스트 얻기
		ArrayList<User> addList = userSet.getUserAdd(); // 추가 리스트 얻기
		ArrayList<User> removeList = userSet.getUserRemove(); // 제거 리스트 얻기

		// 여기서 비지니스 로직을 작성하거나, 서비스 로직을 실행하세요.
		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		User user = null;

		User i_user = new User();

		String pwdEncGet = "";
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {

				user = addList.get(i);
				pwdEncGet = SHA256Util.getSha256(addList.get(i).getPwdEnc());
				user.setPwdEnc(pwdEncGet);
				
				
				
				

				params.put("workingType", "ADD");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("user", user);
				
				
				i_user = bizService.userAdd(params);
				
			}
		}

		params.clear();
		
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {

				user = updateList.get(i);
				user.setUserId(user.getUserId_origin());
				pwdEncGet = SHA256Util.getSha256(updateList.get(i).getPwdEnc());
				user.setPwdEnc(pwdEncGet);
				
				params.put("workingType", "UPT");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("user", user);

				i_user = bizService.userAdd(params);
				
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {

				user = removeList.get(i);

				params.put("workingType", "DEL");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("user", user);

				i_user = bizService.userAdd(params);
			}
		}

		map.put("result_code", i_user.getDb_resultCode());
		map.put("result_msg", i_user.getDb_resultMsg());

		return map;

	}

	
	/*
	 * 사용자별메뉴목록 빈페이지 정동근
	 * */
	
	@RequestMapping(value="/menu-by-user-list")
	public String menuByUserList(){	
		return "biz/menu-by-user-list";
		
	}
	
	
	

	/*
	 * 사용자별메뉴목록 정동근
	 * */
	@RequestMapping(value="/menu-by-user-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> menuByUserList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			MenuByUser i_menuByUser,   @RequestParam(defaultValue="") String ymdIgnoreYN,  Model model){		

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		Menu i_menu = new Menu();
		i_menuByUser.setComCode(comCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "CODE_QRY");
		i_param.put("menuByUser", i_menuByUser);
		i_param.put("menu", i_menu);
		
		List<MenuByUser> menuByUserList = bizService.menuByUserList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("menuByUserList", menuByUserList);
		result.put("menuByUser", i_menuByUser);
		
		model.addAllAttributes(result);
		
		return result;
		
	}
	
	/* 사용자별메뉴등록 정동근*/
	@ResponseBody
	@RequestMapping(value = "/menuByUserAdd", method = RequestMethod.POST)
	public HashMap<String, Object> menuByUserAdd(@RequestBody MenuByUser menuByUserSet ) {
		
				
		String workingType = menuByUserSet.getWorkingType();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		MenuByUser menuByUser = null;
				
		ArrayList<MenuByUser> addList = menuByUserSet.getMenuByUserAdd(); // 추가 리스트 얻기
		ArrayList<MenuByUser> removeList = menuByUserSet.getMenuByUserRemove(); // 제거 리스트 얻기
		ArrayList<MenuByUser> updateList = menuByUserSet.getMenuByUserUpdate(); // 수정 리스트 얻기

	
	
	
		
		
		//거래처마스터 등록
		HashMap<String,Object> params = new HashMap<String, Object>();		
   	    params.put("workingType",workingType);
		params.put("comCode",comCode);
		params.put("userId",userId);
		params.put("menuByUser",menuByUserSet);
		
		//MenuByUser o_menuByUser = new MenuByUser(); 

		HashMap<String, Object> map = new HashMap<String, Object>();
	    
		String result_code ="";
		String result_msg ="";
		
		
		int okCount = 0;
		int errCount = 0;
		
		
		int result = 0;
		
		if (addList.size() > 0 ) {				
			for(int i=0, len=addList.size(); i<len; i++) {
				menuByUser = addList.get(i);
				menuByUser.setUserId(menuByUserSet.getUserId());
				menuByUser.setUserName(menuByUserSet.getUserName());
				params.put("workingType", "ADD");
				params.put("comCode",comCode);
				params.put("userId",userId);
				params.put("menuByUser", menuByUser);
				
				result = bizService.menuByUserAdd(params);			
				
				if(result == 1) {
					okCount = okCount + 1;
					
				}
				else {
					errCount = errCount + 1;
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
		int findIdx =0;
		if (updateList.size() > 0 ) {				
			for(int i=0, len=updateList.size(); i<len; i++) {
				menuByUser = updateList.get(i);
				//menuByUser.setIdx(Integer.parseInt(menuByUser.getRowID()));
				
				menuByUser.setUserId(menuByUserSet.getUserId());
				findIdx = menuByUser.getIdx();
			
				if (findIdx == 0) {
					workingType = "ADD";
				} else {
					workingType = "UPT";
				}
				params.put("workingType", workingType);
				params.put("comCode",comCode);
				params.put("userId",userId);
				params.put("menuByUser", menuByUser);			
			
				result = bizService.menuByUserAdd(params);

				if(result == 1) {
					okCount = okCount + 1;					
				}
				else {
					errCount = errCount + 1;
				}			
			}
			if (updateList.size() == okCount ) {
				result_code = "OK"; 
				result_msg = "성공";			
			}else {
				result_code = "Err"; 
				result_msg = errCount + "개 행 에러 발생";
			} 
			
			
		}	
		
		params.clear();
		if (removeList.size() > 0 ) {				
			for(int i=0, len=removeList.size(); i<len; i++) {
				menuByUser = removeList.get(i);
				
				
				params.put("workingType", "DEL");
				params.put("comCode",comCode);
				params.put("userId",userId);
				params.put("menuByUser", menuByUser);
				result = bizService.menuByUserAdd(params);
					
				
				if(result == 1) {
					okCount = okCount + 1;
					
				}
				else {
					errCount = errCount + 1;
				}			
			}
			if (removeList.size() == okCount ) {
				result_code = "OK"; 
				result_msg = "성공";
			
			}else {
				result_code = "Err"; 
				result_msg = errCount + "개 행 에러 발생";
			}
		}
			
		
		
			map.put("result_code", result_code);
			map.put("result_msg", result_msg);
		

		return map;
	}
	////////////////////////////////////////////////////////////////////////////////////////
	////////////////// End : 정동근 매니저 작업분//////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////

	
	
	/*
	 * 카드/계좌번호 등록 
	 * */	
	@RequestMapping(value="/payment")
	public String payment(){	
		return "biz/payment";
		
	}
	
	/*
	 * 카드/계좌번호 목록 
	 * */
	@RequestMapping(value="/payment", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> payment( Payment i_payment,     Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_payment.setComCode(logComCode);
		
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("payment", i_payment);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		
		List<Payment> paymentList = bizService.paymentList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("paymentList", paymentList);
		result.put("payment", i_payment);

		
		
		model.addAllAttributes(result);
		return result;		
	}
	
	/* 
	카드/계좌번호등록
	*/	
	@ResponseBody
	@RequestMapping(value = "/paymentAdd", method = RequestMethod.POST)
	public HashMap<String, Object> paymentAdd(@RequestBody Payment paymentSet) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		ArrayList<Payment> updateList = paymentSet.getPaymentUpdate(); // 수정 리스트 얻기
		ArrayList<Payment> addList = paymentSet.getPaymentAdd(); // 추가 리스트 얻기
		ArrayList<Payment> removeList = paymentSet.getPaymentRemove(); // 제거 리스트 얻기

		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();

		Payment payment = null;
		Payment i_payment = new Payment();

		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				payment = addList.get(i);
				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("payment", payment);
				
				i_payment = bizService.paymentAdd(params);				
			}
		}

		params.clear();
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				payment = updateList.get(i);
				//payment.setUserId(payment.getPayCode_origin());
				
				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("payment", payment);

				i_payment = bizService.paymentAdd(params);
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				payment = removeList.get(i);

				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("payment", payment);

				i_payment = bizService.paymentAdd(params);
			}
		}

		map.put("result_code", i_payment.getDb_resultCode());
		map.put("result_msg", i_payment.getDb_resultMsg());

		return map;

	}
	
	
	/*
	 * 법인카드 내역 
	 * */	
	@RequestMapping(value="/co-card")
	public String coCard(){	
		return "biz/co-card";
		
	}
	
	/*
	 * 법인카드 내역 
	 * */
	@RequestMapping(value="/co-card", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> coCard( CoCard i_coCard,     Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_coCard.setComCode(logComCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("coCard", i_coCard);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		
		CoCard coCard = null;
		List<CoCard> coCardList = bizService.coCardList(i_param);
		
		String key = code.AES256_key;
		URLCodec codec = new URLCodec();
		AES256Util aes256;
		for (int i = 0, len = coCardList.size(); i < len; i++) {
			coCard = coCardList.get(i);
			//복호화
			try {
				aes256 = new AES256Util(key);
				coCard.setCardNum(aes256.aesDecode(codec.decode(coCard.getCardNum())));
				coCard.setCvc(aes256.aesDecode(codec.decode(coCard.getCvc())));
				coCard.setPrevCardNum1(aes256.aesDecode(codec.decode(coCard.getPrevCardNum1())));					
			} catch (Exception e) {

				e.printStackTrace();
			}
		}	
		
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("coCardList", coCardList);
		result.put("coCard", i_coCard);

		
		model.addAllAttributes(result);
		return result;		
	}
	
	/* 
	법인카드등록
	*/	
	@ResponseBody
	@RequestMapping(value = "/coCardAdd", method = RequestMethod.POST)
	public HashMap<String, Object> coCardAdd(@RequestBody CoCard coCardSet) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		ArrayList<CoCard> updateList = coCardSet.getCoCardUpdate(); // 수정 리스트 얻기
		ArrayList<CoCard> addList = coCardSet.getCoCardAdd(); // 추가 리스트 얻기
		ArrayList<CoCard> removeList = coCardSet.getCoCardRemove(); // 제거 리스트 얻기

		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();

		CoCard coCard = null;
		CoCard i_coCard = new CoCard();

		String key = code.AES256_key;
			
		URLCodec codec = new URLCodec();
		AES256Util aes256;
		
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				coCard = addList.get(i);
				//암호화 
				//aes256.aesDecode(codec.decode(managerid_string))

				try {
					aes256 = new AES256Util(key);
					coCard.setCardNum(codec.encode(aes256.aesEncode(coCard.getCardNum())));
					coCard.setCvc(codec.encode(aes256.aesEncode(coCard.getCvc())));
					coCard.setPrevCardNum1(codec.encode(aes256.aesEncode(coCard.getPrevCardNum1())));					
				} catch (Exception e) {

					e.printStackTrace();
				}
				
				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("coCard", coCard);
				
				i_coCard = bizService.coCardAdd(params);				
			}
		}

		params.clear();
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				coCard = updateList.get(i);
				//payment.setUserId(payment.getPayCode_origin());
				//암호화
				try {
					aes256 = new AES256Util(key);
					coCard.setCardNum(codec.encode(aes256.aesEncode(coCard.getCardNum())));
					coCard.setCvc(codec.encode(aes256.aesEncode(coCard.getCvc())));
					coCard.setPrevCardNum1(codec.encode(aes256.aesEncode(coCard.getPrevCardNum1())));					
				} catch (Exception e) {

					e.printStackTrace();
				}
				
				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("coCard", coCard);
			
				i_coCard = bizService.coCardAdd(params);
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				coCard = removeList.get(i);

				//암호화
				try {
					aes256 = new AES256Util(key);
					coCard.setCardNum(codec.encode(aes256.aesEncode(coCard.getCardNum())));
					coCard.setCvc(codec.encode(aes256.aesEncode(coCard.getCvc())));
					coCard.setPrevCardNum1(codec.encode(aes256.aesEncode(coCard.getPrevCardNum1())));					
				} catch (Exception e) {

					e.printStackTrace();
				}
				
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("coCard", coCard);
				
				i_coCard = bizService.coCardAdd(params);
			}
		}

		map.put("result_code", i_coCard.getDb_resultCode());
		map.put("result_msg", i_coCard.getDb_resultMsg());

		return map;

	}
	

	
	/*
	 * 매출목표 - 최초
	 * */	
	@RequestMapping(value="/sales-aim")
	public String salesAim(){	
		return "biz/sales-aim";
		
	}
	
	/*
	 *  매출목표 
	 * */
	@RequestMapping(value="/sales-aim", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> salesAim( SalesAim i_salesAim,     Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_salesAim.setComCode(logComCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("salesAim", i_salesAim);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		
		
		SalesAim salesAim = null;
		List<SalesAim> salesAimList = bizService.salesAimList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("salesAimList", salesAimList);
		result.put("salesAim", i_salesAim);
		
		
		model.addAllAttributes(result);
		return result;		
	}
	
	/* 
	매출목표 등록
	*/	
	@ResponseBody
	@RequestMapping(value = "/salesAimAdd", method = RequestMethod.POST)
	public HashMap<String, Object> salesAimAdd(@RequestBody SalesAim salesAimSet) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		ArrayList<SalesAim> updateList = salesAimSet.getSalesAimUpdate(); // 수정 리스트 얻기
		ArrayList<SalesAim> addList = salesAimSet.getSalesAimAdd(); // 추가 리스트 얻기
		ArrayList<SalesAim> removeList = salesAimSet.getSalesAimRemove(); // 제거 리스트 얻기

		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();

		SalesAim salesAim = null;
		SalesAim i_salesAim = new SalesAim();

	
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				salesAim = addList.get(i);

				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("salesAim", salesAim);
	
				i_salesAim = bizService.salesAimAdd(params);				
			}
		}

		params.clear();
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				salesAim = updateList.get(i);			
				
				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("salesAim", salesAim);
	
				i_salesAim = bizService.salesAimAdd(params);
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				salesAim = removeList.get(i);				
				
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("salesAim", salesAim);
			
				i_salesAim = bizService.salesAimAdd(params);
			}
		}

		map.put("result_code", i_salesAim.getDb_resultCode());
		map.put("result_msg", i_salesAim.getDb_resultMsg());

		return map;

	}
	
	
	/*
	 * 거래처원장 - 최초
	 * */	
	@RequestMapping(value="/cust-ledg")
	public String custLedg(){	
		return "biz/cust-ledg";
		
	}
	
	/*
	 *  거래처원장 
	 *  2023.07.17  bk mainYN 추가 
	 * */
	@RequestMapping(value="/cust-ledg", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> custLedg(@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			CustLedg i_custLedg,@RequestParam(defaultValue="") String mainYN,  String workingType,    Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		
		
		workingType = "LIST";


		//i_custLedg.setComCode(logComCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("custLedg", i_custLedg);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("mainYN", mainYN);

		
	
		List<CustLedg> custLedgList = bizService.custLedgList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("custLedgList", custLedgList);
		result.put("custLedg", i_custLedg);
	
		
		model.addAllAttributes(result);
		return result;		
	}
	
	
	/*
	 * 거래처별 종합거래장 - 최초
	 * */	
	@RequestMapping(value="/cust-biz")
	public String custBiz(){	
		return "biz/cust-biz";
		
	}
	
	/*
	 *  거래처별 종합거래장 
	 * */
	@RequestMapping(value="/cust-biz", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> custBiz( @RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			CustBiz i_custBiz,     Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		//i_custLedg.setComCode(logComCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "ACCOUNT");
		i_param.put("custBiz", i_custBiz);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);

		
		
		List<CustBiz> custBizList = bizService.custBizList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("custBizList", custBizList);
		result.put("custBiz", i_custBiz);
		
		
		model.addAllAttributes(result);
		return result;		
	}
	
	
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	
	/*
	 * 출금요청 - 빈페이지
	 * 2023.01.25 - 
	 * */
	@RequestMapping(value="/wd-req-up")
	public String wdReqUp( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
		    @RequestParam(defaultValue="") String ymdIgnoreYN,  @RequestParam(defaultValue="") String jobArr,  
		    @RequestParam(defaultValue="") String custCode, @RequestParam(defaultValue="") String custName, @RequestParam(defaultValue="") String sumPrice,
		    @RequestParam(defaultValue="") String wdReqNo,@RequestParam(defaultValue = "") String wdReqType, 
		    @RequestParam(defaultValue = "") String ledgArr,@RequestParam(defaultValue = "") String seqArr, Model model){		

	
	
	
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("jobArr", jobArr);
		result.put("wdReqNo", wdReqNo);
		result.put("custCode", custCode);
		result.put("custName", custName);
		result.put("sumPrice", sumPrice);
		result.put("wdReqType", wdReqType);
		result.put("ledgArr", ledgArr);
		result.put("seqArr", seqArr);
		
		model.addAllAttributes(result);
		return "biz/wd-req-up";
	}
	
	
	/*
	 * * MutilipartFile 사용하는 경우에는 js의 데이타에 사용한 모든항목이 파라미터로 model형식이 아닌 각 개별로 들어가야함. 그리고 model은 사용하지 말아야 할것 같음. 
	 * 출금 요청등록  
	*/
	@RequestMapping(value = "/wdReqAdd")
	@ResponseBody
	public HashMap<String, Object> wdReqAdd(@RequestParam("attaFile") MultipartFile multipartFile,   MultipartHttpServletRequest requestFile,
			@RequestParam(defaultValue = "") String workingType,  @RequestParam(defaultValue = "0") int wdReqAmt, @RequestParam(defaultValue = "") String wdReqYmd
			,@RequestParam(defaultValue = "") String wdReqType ,@RequestParam(defaultValue = "") String jobArr ,@RequestParam(defaultValue = "") String custCode,
			 @RequestParam(defaultValue = "") String ledgArr , @RequestParam(defaultValue = "") String seqArr
			) {
		
		WdReq reqSet = new WdReq();  
		WdReqDtl reqDtlSet = new WdReqDtl();
		           
		reqSet.setWorkingType(workingType);
		reqSet.setWdReqAmt(wdReqAmt);
		reqSet.setWdReqYmd(wdReqYmd);
		reqSet.setWdReqType(wdReqType);
		reqSet.setCustCode(custCode);
		reqSet.setJobArr(jobArr);
		reqSet.setSeqArr(seqArr);
		reqSet.setLedgArr(ledgArr);
		reqDtlSet.setWorkingType(workingType);
		reqDtlSet.setJobArr(jobArr);
		reqDtlSet.setLedgArr(ledgArr);
		reqDtlSet.setSeqArr(seqArr);
		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> map = new HashMap<String, Object>();	    
		
		//WdReqDtl reqDtl = null;
		//MultipartFile multiFile = requestFile.getFile("attaFile");	
		List<MultipartFile> fileList = requestFile.getFiles("attaFile");
		//System.out.println(fileList);
		
		
		int attachCnt = 0;
		int attErrCnt = 0;
		if (multipartFile.getSize() > 0) {
			attachCnt =fileList.size();
		}
				
		//int fileUpOk =0;	
		
		//String originalFileName = "";
		//String savedFileName = "";
		
		HashMap<String,Object> params = new HashMap<String, Object>();
		
		workingType = "ADD";
		
		params.put("workingType",workingType);
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		params.put("req",reqSet);
		
		
		WdReq o_wdReq = new WdReq(); 
		o_wdReq = bizService.wdReqAdd(params);
		
		if (("OK").equals(o_wdReq.getDb_resultCode())){
			
			WdReqDtl o_wdReqDtl = new WdReqDtl();
			
			reqDtlSet.setWdReqNo(o_wdReq.getWdReqNo());
			params.put("workingType", workingType);
			params.put("logComCode",logComCode);
			params.put("logUserId",logUserId);
			params.put("reqDtl", reqDtlSet);
			
			o_wdReqDtl = bizService.wdReqDtlAdd(params);
			
			
			if (("OK").equals(o_wdReqDtl.getDb_resultCode())) {
				
				if(attachCnt  > 0) {
					String[] savedFileNameList = new String[fileList.size()];
					String[] originalFileNameList = new String[fileList.size()];
					
					for (int i = 0, len = fileList.size(); i < len; i++) {
						
						String fileRoot = "D:\\WebService\\fileUpload\\panClub\\"+logComCode+"\\wd\\";	//저장될 외부 파일 경로
						String fileRoot_thumb = "D:\\WebService\\fileUpload\\panClub\\"+logComCode+"\\wd_thumb\\";	//저장될 외부 파일 경로
						File Folder = new File(fileRoot);
						File Folder_thumb = new File(fileRoot_thumb);
							
						//폴더 없는 경우 생성
						if (!Folder.exists()) {
							try {
								Folder.mkdir();					
							} catch (Exception e) {
								e.printStackTrace();
							}				
						}		
						
						if (!Folder_thumb.exists()) {
							try {
								Folder_thumb.mkdir();
							} catch (Exception e) {
								e.printStackTrace();
							}				
						}
							
						String originalFileName = fileList.get(i).getOriginalFilename();	//오리지날 파일명
						String extension = originalFileName.substring(originalFileName.lastIndexOf("."));	//파일 확장자
			
						String savedFileName_UI = UUID.randomUUID().toString();
						String savedFileName = savedFileName_UI + extension;	//저장될 파일 명
						originalFileNameList[i] = originalFileName;
						savedFileNameList[i] = savedFileName;
						
						File targetFile = new File(fileRoot + savedFileName);	
						try {
							InputStream fileStream = fileList.get(i).getInputStream();
							FileUtils.copyInputStreamToFile(fileStream, targetFile);	//파일 저장
							originalFileNameList[i] = originalFileName;
						} catch (IOException e) {
							attErrCnt = attErrCnt+1;
							FileUtils.deleteQuietly(targetFile);	//저장된 파일 삭제
							e.printStackTrace();
						}
						
					}
					
					if(attErrCnt > 0) {
						map.put("result_code", "Err1");
						map.put("result_msg", " 첨부파일은 저장 오류");				
					}else {
						HashMap<String,Object> paramsAtt = new HashMap<String, Object>();
						for (int i = 0, len = fileList.size(); i < len; i++) {	

							reqSet.setAttaFile(savedFileNameList[i]);
							reqSet.setAttaFileOri(originalFileNameList[i]);
							reqSet.setWdReqNo(o_wdReq.getWdReqNo());
							
							paramsAtt.put("workingType","ATT-ADD");
							paramsAtt.put("logComCode",logComCode);
							paramsAtt.put("logUserId",logUserId);
							paramsAtt.put("req",reqSet);
							
							WdReq o_wdReqAtt = new WdReq(); 
							o_wdReqAtt = bizService.wdReqAdd(paramsAtt);	
							
							if (("OK").equals(o_wdReqAtt.getDb_resultCode())) {
							    map.put("result_code", "OK");
							    map.put("result_msg", "처리되었습니다.");
							}else {
								map.put("result_code","Err2");
								map.put("result_msg", " 첨부파일 저장 오류");
							}  
						}
					}
					
				}else {
					map.put("result_code", o_wdReqDtl.getDb_resultCode());
					map.put("result_msg", o_wdReqDtl.getDb_resultMsg());
				}
				
			}else {
				map.put("result_code", o_wdReqDtl.getDb_resultCode());
				map.put("result_msg", o_wdReqDtl.getDb_resultMsg());
			}

		}else {
			map.put("result_code", o_wdReq.getDb_resultCode());
			map.put("result_msg", o_wdReq.getDb_resultMsg());
		}
		
		return map;
	}
	


	/*
	 * 출금요청마스터 목록 - 빈페이지
	 * */
	@RequestMapping(value="/wd-req-list")
	public String wdReqList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
		    @RequestParam(defaultValue="") String ymdIgnoreYN,  Model model){		

		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		if (("").equals(sYmd) || sYmd == null ){
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, -1);
			sYmd = dateFormat.format(cal.getTime());
		}
		if (("").equals(eYmd) || eYmd == null ){
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, 0);
			eYmd = dateFormat.format(cal.getTime());		
		}

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		model.addAllAttributes(result);
		return "biz/wd-req-list";
		
	}
	
	/*
	 *  출금요청마스터 목록
	 *  2023.07.13 bk 기준일자 유형 추가
	 * */
	@RequestMapping(value="/wd-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> wdReqList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			WdReq i_req,   @RequestParam(defaultValue="") String ymdIgnoreYN, @RequestParam(defaultValue="") String cdCode, 
			@RequestParam(defaultValue="") String wdDateType, Model model){		
		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_req.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_req.getWorkingType();
		
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("req", i_req);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("cdCode", cdCode);
		i_param.put("wdDateType", wdDateType);
		
		List<WdReq> reqList = bizService.wdReqList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("reqList", reqList);
		result.put("req", i_req);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
	
		
		model.addAllAttributes(result);
		return result;		
	}	
	
	
	/*
	 * 출금요청상세 - 빈페이지
	 * 2023.01.25
	 * */
	@RequestMapping(value="/wd-req-dtl-list")
	public String wdReqDtlList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
		    @RequestParam(defaultValue="") String ymdIgnoreYN,   @RequestParam(defaultValue="") String orderGroupId, 
		    @RequestParam(defaultValue="") String reqArr,  @RequestParam(defaultValue="") String seqArr, 
		    @RequestParam(defaultValue="") String wdReqNo,String attaFile,  String attaFileOri, Model model){		

	
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("reqArr", reqArr);
		result.put("seqArr", seqArr);
		result.put("wdReqNo", wdReqNo);
		result.put("attaFile", attaFile);
		result.put("attaFileOri", attaFileOri);
		
		
		model.addAllAttributes(result);
		return "biz/wd-req-dtl-list";
	}
	
	
	/*
	 * 출금요청 상세 목록
	 * */
	@RequestMapping(value="/wd-req-dtl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> wdReqDtlList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			WdReqDtl i_reqDtl,   @RequestParam(defaultValue="") String ymdIgnoreYN,   Model model){		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_reqDtl.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_reqDtl.getWorkingType();
		//
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("reqDtl", i_reqDtl);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<WdReqDtl> reqDtlList = bizService.wdReqDtlList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("reqDtlList", reqDtlList);
		result.put("reqDtl", i_reqDtl);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		
		model.addAllAttributes(result);
		return result;		
	}	

	
	/*
	 * 20230207 김보경
	 * 사용자 비밀번호 변경  - 빈페이지
	 * */	
	@RequestMapping(value="/upw-change")
	public String upwChange( @RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
		@RequestParam(defaultValue="") String ymdIgnoreYN,  Model model){		
	    
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("comCode", comCode);
		result.put("userId", userId);
		
		model.addAllAttributes(result);
		
		return "biz/upw-change";
	 }

	/*
	 * 일정 목록 조회
	 * */
	@RequestMapping(value = "/schedule-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> scheduleList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Schedule schedule, String schNo,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {
		
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		schedule.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("schedule", schedule);
		i_param.put("sYmd", sYmd);
		i_param.put("eYmd", eYmd);
		i_param.put("schNo", schNo); 
		i_param.put("comCode", comCode); 

		List<Schedule> scheduleList;
		
		scheduleList = bizService.scheduleList(i_param);
		 

		HashMap<String, Object> result = new HashMap<String, Object>();
		
		 

		result.put("scheduleList", scheduleList);
		result.put("schedule", schedule);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return result;

	}
	/*
	 * 일정업데이트
	 * 
	 * 맴버별로 쪼개서 하나의 로우로 저장
	 * 업데이트대신 삭제후 추가하는 방식 사용
	 * */
	@ResponseBody
	@RequestMapping(value = "/schAdd", method = RequestMethod.POST)
	public HashMap<String, Object> schAdd(@RequestBody Schedule schedule) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();
		
		int result = 0;
		int result1 = 0;

		String result_code = "";
		String result_msg = "";
		
		String workingType = schedule.getWorkingType(); // 여기
		if (("ADD").equals(workingType)) {
			for(int i=0, len=schedule.getMemberList().size(); i<len; i++) {
				params.clear();
				schedule.setMember(schedule.getMemberList().get(i));
				
				params.put("workingType", workingType);
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("schedule", schedule);
				
				result = bizService.schAdd(params);
			}
	
		}else if (("DEL").equals(workingType)) {
			params.clear();
			params.put("workingType", workingType);
			params.put("comCode", comCode);
			params.put("userId", userId);
			params.put("schedule", schedule);
			
			result = bizService.schAdd(params);
			
		}else {
			params.clear();
			params.put("workingType", "DEL");
			params.put("comCode", comCode);
			params.put("userId", userId);
			params.put("schedule", schedule);
			result1 = bizService.schAdd(params);
			
			for(int i=0, len=schedule.getMemberList().size(); i<len; i++) {
				params.clear();
				schedule.setMember(schedule.getMemberList().get(i));
				
				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("schedule", schedule);
				
				result = bizService.schAdd(params);
			}
			
		}
		
		if (result >= 1) {
			result_code = "OK";
			result_msg = "성공";
		}else {
			result_code = "Err";
			result_msg = "실패";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;

	}

	/*
	 * 2023-03-02 김보경 접속현황 - 빈페이지
	 **/
	@RequestMapping(value = "/userLog")
	public String userLog(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		return "biz/userLog";

	}

	/*
	 * 2023-03-02 김보경 접속현황 
	 * 2023-06-30 hsg - logComcode, logUserId i_param에 추가
	 */
	@RequestMapping(value = "/userLog", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> userLogList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, UserLog i_userLog,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		
		//List<UserLog> userLog = bizService.userLog(i_param);
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		
		i_param.put("workingType", "LIST");
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("userLog", i_userLog);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		
		List<UserLog> userLog1 = bizService.userLog(i_param);
		 

		
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("userLog1", userLog1);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd1", sYmd);
		result.put("eYmd1", eYmd);
		
		
		model.addAllAttributes(result);
		
	
		return result;
	}

	
	/* 요청취소  
	 * 2023.04.11  bokyung*/
 
	@RequestMapping(value = "/whReqBuyChkAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> wdReqAdd(WdReq wdreq,  WdReqDtl wdreqdtl ,  Model model) {
		
		
		String workingType = wdreq.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> map = new HashMap<String, Object>();	    
		
		
		
		
		
		//마스터 등록
		HashMap<String,Object> params = new HashMap<String, Object>();		
   	    //custSet.setCustCode(comCode);	
		params.put("workingType",workingType);
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		params.put("req",wdreq);
		
		
		
		
		WdReq o_wdReq = new WdReq(); 
		o_wdReq = bizService.wdReqAdd(params);		
		
		
		

		map.put("result_code", o_wdReq.getDb_resultCode());
		map.put("result_msg", o_wdReq.getDb_resultMsg());
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}	

	/*
	 * 원장 프린트 - 20320530
	 * 2023.07.17  bk mainYN 추가 
	 */
	@RequestMapping(value = "/cust-ledge-print", method = RequestMethod.GET)
	public String custLedgePrint(String redirect_target, String custCode, String sYmd, String eYmd,String printType ,
																	CustLedg i_custLedg,String mainYN,  Model model) {

		/* 견적정보 */
	
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(logComCode);

		i_param.put("workingType", "PAN_LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param);
		
		
		HashMap<String, Object> i_param2 = new HashMap<String, Object>();

		Cust i_cust2 = new Cust();
		i_cust2.setComCode(logComCode);
		i_cust2.setCustCode(custCode);

		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("cust", i_cust2);


		List<Cust> o_custList2 = baseService.custList(i_param2);
	
	
		HashMap<String, Object> o_params = new HashMap<String, Object>();

		o_params.put("custList2", o_custList2);
		
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();
		
		i_param3.put("workingType", "LIST");
		i_param3.put("custLedg", i_custLedg);
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("sYmd1", sYmd);
		i_param3.put("eYmd1", eYmd);
		i_param3.put("mainYN", mainYN);
		
		List<CustLedg> custLedgList = bizService.custLedgList(i_param3);
		o_params.put("custLedgList", custLedgList);
		
		

		HashMap<String, Object> i_param4 = new HashMap<String, Object>();

		Payment i_payment = new Payment();

		i_param4.put("workingType", "LIST");
		i_param4.put("payment", i_payment);
		i_param4.put("logComCode", logComCode);
		i_param4.put("logUserId", logUserId);

		List<Payment> paymentList = bizService.paymentList(i_param4);
		List<Payment> paymentList2 = new ArrayList();
	

		for (int i = 0, len = paymentList.size(); i < len; i++) {
	
			// paymentList.get(i).getPayType());

			if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
					&& ("Y").equals(paymentList.get(i).getCommonDpYN())) {
	
				paymentList2.add(paymentList.get(i));

			}
		}
		
		o_params.put("custList", o_custList);
		o_params.put("printType", printType);
		o_params.put("paymentList2", paymentList2);
		o_params.put("sYmd", sYmd);
		o_params.put("eYmd", eYmd);
		o_params.put("custCode", custCode);
		//o_params.put("printType ", printType );

		model.addAllAttributes(o_params);

		// System.out.println("printType"+printType);
	
	

		return "biz/cust-ledge-print";
	}
	
	/*
	 * 원장 품목별 인쇄- 20230531
	 * 2023.07.17  bk mainYN 추가 
	 */
	@RequestMapping(value = "/cust-ledge-dtl-print", method = RequestMethod.GET)
	public String custLedgeDtlPrint(String redirect_target, String custCode, String sYmd, String eYmd,String printType ,
																	CustLedg i_custLedg,String mainYN, Model model) {

			
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(logComCode);

		i_param.put("workingType", "PAN_LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param);
		
		
		HashMap<String, Object> i_param2 = new HashMap<String, Object>();

		Cust i_cust2 = new Cust();
		i_cust2.setComCode(logComCode);
		i_cust2.setCustCode(custCode);

		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("cust", i_cust2);


		List<Cust> o_custList2 = baseService.custList(i_param2);
	
	
		HashMap<String, Object> o_params = new HashMap<String, Object>();

		o_params.put("custList2", o_custList2);
		
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();
		
		i_param3.put("workingType", "ITEM_LIST");
		i_param3.put("custLedg", i_custLedg);
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("sYmd1", sYmd);
		i_param3.put("eYmd1", eYmd);
		i_param3.put("mainYN", mainYN);
		
		List<CustLedg> custLedgList = bizService.custLedgList(i_param3);
		o_params.put("custLedgList", custLedgList);
		
		HashMap<String, Object> i_param5 = new HashMap<String, Object>();
		
		i_param5.put("workingType", "LIST");
		i_param5.put("custLedg", i_custLedg);
		i_param5.put("logComCode", logComCode);
		i_param5.put("logUserId", logUserId);
		i_param5.put("sYmd1", sYmd);
		i_param5.put("eYmd1", eYmd);
		i_param5.put("mainYN", mainYN);
		
		List<CustLedg> custLedgList2 = bizService.custLedgList(i_param5);
		o_params.put("custLedgList2", custLedgList2);
		
		//System.out.println("custLedgList2"+custLedgList2);

		HashMap<String, Object> i_param4 = new HashMap<String, Object>();

		Payment i_payment = new Payment();

		i_param4.put("workingType", "LIST");
		i_param4.put("payment", i_payment);
		i_param4.put("logComCode", logComCode);
		i_param4.put("logUserId", logUserId);

		List<Payment> paymentList = bizService.paymentList(i_param4);
		List<Payment> paymentList2 = new ArrayList();
	

		for (int i = 0, len = paymentList.size(); i < len; i++) {
	
			// paymentList.get(i).getPayType());

			if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
					&& ("Y").equals(paymentList.get(i).getCommonDpYN())) {
	
				paymentList2.add(paymentList.get(i));

			}
		}
		
		o_params.put("custList", o_custList);
		o_params.put("printType", printType);
		o_params.put("paymentList2", paymentList2);
		o_params.put("sYmd", sYmd);
		o_params.put("eYmd", eYmd);
		o_params.put("custCode", custCode);

		model.addAllAttributes(o_params);

		return "biz/cust-ledge-dtl-print";
	}
	
	/*
	 * 거래상세내역 - 최초
	 * 2023.06.12 bk
	 * */	
	@RequestMapping(value="/transaction-list")
	public String transactionList(){	
		return "biz/transaction-list";
		
	}
	/*
	 *  거래상세내역
	 *  2023.06.12 bk
	 * */
	@RequestMapping(value="/transaction-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> transactionList( @RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
		Transaction i_transaction,  @RequestParam(defaultValue="") String placeYmdYN,   String placeWhYmdYN, 
		@RequestParam(defaultValue="") String workingType,Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		//System.out.println("chek in ");

		//i_custLedg.setComCode(logComCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("transaction",  i_transaction);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("placeYmdYN", placeYmdYN);
		
		//System.out.println("i_param "+i_param);

		List<Transaction> transactionList = bizService.transactionList(i_param);
		HashMap<String, Object> result = new HashMap<String, Object>();	
		//System.out.println("i_param "+i_param);

		result.put("transactionList", transactionList);
		result.put("transaction", i_transaction);
		
		//System.out.println("result" +result);
		model.addAllAttributes(result);
		return result;	
		
		
	}
	
	
	/*
	 *  매입처 거래상세내역2
	 *  20231123 yoonsang
	 * */
	@RequestMapping(value="/transaction-list2", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> transactionList2( @RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
		Transaction i_transaction,  @RequestParam(defaultValue="") String placeYmdYN,   String placeWhYmdYN, 
		@RequestParam(defaultValue="") String workingType,Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		//System.out.println("chek in ");

		//i_custLedg.setComCode(logComCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("transaction",  i_transaction);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("placeYmdYN", placeYmdYN);
		
		//System.out.println("i_param "+i_param);

		List<Transaction> transactionList = bizService.transactionList2(i_param);
		HashMap<String, Object> result = new HashMap<String, Object>();	
		//System.out.println("i_param "+i_param);

		result.put("transactionList", transactionList);
		result.put("transaction", i_transaction);
		
		//System.out.println("result" +result);
		model.addAllAttributes(result);
		return result;	
		
		
	}
	
	/*
	 * 매입처 거래상세내역 - 최초
	 * 2023.07.04 bk
	 * */	
	@RequestMapping(value="/wh-tran-list")
	public String whTranList(){	
		return "biz/wh-tran-list";
		
	}
	
	/*
	 * 매입처 거래상세내역2 - 지점별 원장보기
	 * 20231123 yoonsang
	 * */
	@RequestMapping(value="/wh-tran-list2")
	public String whTranList2(){	
		return "biz/wh-tran-list2";
		
	}  
	
	/*
	 * 매출처 거래상세내역 - 최초
	 * 2023.07.10 bk
	 * */	
	@RequestMapping(value="/rl-tran-list")
	public String rlTranList(){	
		return "biz/rl-tran-list";
		
	} 
	
	/*
	    * 외주재고 출고내역  :
		* 2023.10.19 bk- 최초 페이지 접근
		*/
		@RequestMapping(value="/out-rl-tran-list")
		public String outRlTranList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
				@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			    @RequestParam(defaultValue="") String ymdIgnoreYN,  Model model){		
			
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Calendar cal = Calendar.getInstance();
			if (("").equals(sYmd) || sYmd == null) {
				cal.setTime(new Date());
				cal.add(Calendar.MONTH, -1);
				sYmd = dateFormat.format(cal.getTime());
			}
			if (("").equals(eYmd) || eYmd == null) {
				cal.setTime(new Date());
				cal.add(Calendar.MONTH, 0);
				eYmd = dateFormat.format(cal.getTime());
			}
			
			String logComCode = (String) session.getAttribute("comCode");
			String logUserId = (String) session.getAttribute("userId");

			HashMap<String, Object> result = new HashMap<String, Object>();

			result.put("ymdIgnoreYN", ymdIgnoreYN);
			result.put("sYmd", sYmd);
			result.put("eYmd", eYmd);

			model.addAllAttributes(result);
			
			return "biz/out-rl-tran-list";			
		}
		
		
		/*
		 * 거래처원장2 - 최초
		 * */	
		@RequestMapping(value="/cust-ledg2")
		public String custLedg2(){	
			return "biz/cust-ledg2";
			
		}
		
		/*
		 *  거래처원장 
		 *  2023.07.17  bk mainYN 추가 
		 * */
		@RequestMapping(value="/cust-ledg2", method = RequestMethod.POST)
		@ResponseBody
		public HashMap<String, Object> custLedg2(@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
				CustLedg i_custLedg,@RequestParam(defaultValue="") String mainYN,      Model model){		

			String logComCode = (String) session.getAttribute("comCode");
			String logUserId = (String) session.getAttribute("userId");

			//i_custLedg.setComCode(logComCode);
			
			HashMap<String,Object> i_param = new HashMap<String, Object>();
			i_param.put("workingType", "LIST");
			i_param.put("custLedg", i_custLedg);
			i_param.put("logComCode", logComCode);
			i_param.put("logUserId", logUserId);
			i_param.put("sYmd1", sYmd);
			i_param.put("eYmd1", eYmd);
			i_param.put("mainYN", mainYN);

			
		
			List<CustLedg> custLedgList = bizService.custLedgList2(i_param);
			
			HashMap<String, Object> result = new HashMap<String, Object>();	
			
			result.put("custLedgList", custLedgList);
			result.put("custLedg", i_custLedg);
		
			
			model.addAllAttributes(result);
			return result;		
		}
		
		
		/*
		 * 미수금리스트 - 최초
		 * */	
		@RequestMapping(value="/other-receivables-list")
		public String otherReceivablesList(){	
			return "biz/other-receivables-list";
			
		}
		
		/*
		 *  미수금리스트
		 *  
		 * */
		@RequestMapping(value="/other-receivables-list", method = RequestMethod.POST)
		@ResponseBody
		public HashMap<String, Object> otherReceivablesList(@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
				CustLedg i_custLedg,@RequestParam(defaultValue="") String mainYN,  String workingType,    Model model){		

			String logComCode = (String) session.getAttribute("comCode");
			String logUserId = (String) session.getAttribute("userId");
			

			//i_custLedg.setComCode(logComCode);
			
			HashMap<String,Object> i_param = new HashMap<String, Object>();
			i_param.put("workingType", workingType);
			i_param.put("custLedg", i_custLedg);
			i_param.put("logComCode", logComCode);
			i_param.put("logUserId", logUserId);
			i_param.put("sYmd1", sYmd);
			i_param.put("eYmd1", eYmd);
			i_param.put("mainYN", mainYN);

			
		
			List<CustLedg> otherReceivablesList = bizService.otherReceivablesList(i_param);
			
			HashMap<String, Object> result = new HashMap<String, Object>();	
			
			result.put("otherReceivablesList", otherReceivablesList);
		
			
			model.addAllAttributes(result);
			return result;		
		}
		
			/*
		    * 4car재고 구매내역  :
			* 2024.04.17 yoonsang- 최초 페이지 접근
			*/
			@RequestMapping(value="/out-pl-tran-list")
			public String outPlTranList( @RequestParam(defaultValue = "1") int page,
					@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
				    @RequestParam(defaultValue="") String ymdIgnoreYN,  Model model){		
				
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Calendar cal = Calendar.getInstance();
				if (("").equals(sYmd) || sYmd == null) {
					cal.setTime(new Date());
					cal.add(Calendar.MONTH, -1);
					sYmd = dateFormat.format(cal.getTime());
				}
				if (("").equals(eYmd) || eYmd == null) {
					cal.setTime(new Date());
					cal.add(Calendar.MONTH, 0);
					eYmd = dateFormat.format(cal.getTime());
				}
				
				String logComCode = (String) session.getAttribute("comCode");
				String logUserId = (String) session.getAttribute("userId");

				HashMap<String, Object> result = new HashMap<String, Object>();

				result.put("ymdIgnoreYN", ymdIgnoreYN);
				result.put("sYmd", sYmd);
				result.put("eYmd", eYmd);

				model.addAllAttributes(result);
				
				return "biz/out-pl-tran-list";			
			}
		
			/*
			    * 마감경과 작업조회 페이지 
				* 2024.07.08 supi 
				*/
				@RequestMapping(value="/closeTask")
				public String closeTask( Model model){		
					
				 
					return "biz/closeTask";			
				}
				
				/** 
				 * 2024.07.08 supi 마감경과 작업조회 데이터 받는 통신
				 */
				@RequestMapping(value="/closeTaskList", method = RequestMethod.POST)
				@ResponseBody
				public HashMap<String,Object> closeTaskList(@RequestParam HashMap<String, Object> i_param)
				{
					String logComCode = (String) session.getAttribute("comCode");
					String logUserId = (String) session.getAttribute("userId");
					
					i_param.put("logComCode", logComCode);
					i_param.put("logUserId", logUserId);
					
					 
					
					HashMap<String, Object> result = new HashMap<String, Object>();
							
					result.put("closeTaskList",bizService.closeTaskList(i_param));
							
				 
					return result;
				}
				/*
				 * 일정관리 페이지 
				 * 2024.11.13 일정관리
				 */
				@RequestMapping(value="/schedule-by-mem")
				public String scheduleByMem( Model model){		 
					return "biz/scheduleByMem";			
				}
				/*
				 * 
				 * 2024.11.12 일정관리
				 */
				@RequestMapping(value = "/scheduleByMem" , method = RequestMethod.POST ) 
				@ResponseBody
				public List<HashMap<String, Object>> scheduleByMem(@RequestParam HashMap< String, Object> i_params , Model model) { 
					String comCode = (String) session.getAttribute("comCode");
					String userId = (String) session.getAttribute("userId");
					
					i_params.put("logComCode", comCode);
					i_params.put("logUserId", userId);   
					return memberService.scheduleByMem(i_params);
				}
				/*
				 * 
				 * 2024.11.13 일정관리-유저 일정검색
				 */
				@RequestMapping(value = "/scheduleByMemDetail" , method = RequestMethod.POST ) 
				@ResponseBody
				public List<HashMap<String, Object>> scheduleByMemDetail(@RequestParam HashMap< String, Object> i_params , Model model) { 
					String comCode = (String) session.getAttribute("comCode");
					String userId = (String) session.getAttribute("userId");
					
					i_params.put("logComCode", comCode);
					i_params.put("logUserId", userId);   
					return memberService.scheduleByMemDetail(i_params);
				}
				/*
				 * 
				 * 2024.11.13 일정관리 일자 수정
				 */
				@RequestMapping(value = "/uptScheduleByMemDetail" , method = RequestMethod.POST ) 
				@ResponseBody
				public int uptScheduleByMemDetail(@RequestParam HashMap< String, Object> i_params , Model model) { 
					String comCode = (String) session.getAttribute("comCode");
					String userId = (String) session.getAttribute("userId");
					
					i_params.put("logComCode", comCode);
					i_params.put("logUserId", userId);   
					return memberService.uptScheduleByMemDetail(i_params);
				}
				/*
				 * 
				 * 2024.11.13 일정관리 삭제
				 */
				@RequestMapping(value = "/delScheduleByMemDetail" , method = RequestMethod.POST ) 
				@ResponseBody
				public int delScheduleByMemDetail(@RequestParam HashMap< String, Object> i_params , Model model) { 
					String comCode = (String) session.getAttribute("comCode");
					String userId = (String) session.getAttribute("userId");
					
					i_params.put("logComCode", comCode);
					i_params.put("logUserId", userId);   
					return memberService.delScheduleByMemDetail(i_params);
				}
}

	
