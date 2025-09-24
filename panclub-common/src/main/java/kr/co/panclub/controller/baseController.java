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

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.crypto.dsig.keyinfo.KeyInfo;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.panclub.common.CommonMethod;
import kr.co.panclub.common.SHA256Util;
import kr.co.panclub.model.AccountHistory;
import kr.co.panclub.model.C_cust;
import kr.co.panclub.model.Code;
import kr.co.panclub.model.CommonResult;
import kr.co.panclub.model.Config;
import kr.co.panclub.model.Cust;
import kr.co.panclub.model.CustAdmin;
import kr.co.panclub.model.CustManager;
import kr.co.panclub.model.Deadline;
import kr.co.panclub.model.Depart;
import kr.co.panclub.model.Deposit;
import kr.co.panclub.model.ExchangeRate;
import kr.co.panclub.model.InsurDcRate;
import kr.co.panclub.model.Item;
import kr.co.panclub.model.ItemExcel;
import kr.co.panclub.model.ItemMemo;
import kr.co.panclub.model.ItemOe;
import kr.co.panclub.model.Menu;
import kr.co.panclub.model.Notice;
import kr.co.panclub.model.Permission;
import kr.co.panclub.model.PermissionTemplate;
import kr.co.panclub.model.Rack;
import kr.co.panclub.model.Sr;
import kr.co.panclub.model.SrCust;
import kr.co.panclub.model.StockShare;
import kr.co.panclub.model.Storage;
import kr.co.panclub.model.TaxBill;
import kr.co.panclub.model.User;
import kr.co.panclub.model.Withdraw;
import kr.co.panclub.model.menuStructure;
import kr.co.panclub.service.IBaseService;
import kr.co.panclub.service.IMemberService;
import kr.co.panclub.service.IStatsService;

/*git update test*/

@Controller
@RequestMapping("/base/*")
public class baseController {

	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private IMemberService memberService;

	@Autowired
	private IBaseService baseService;

	@Autowired
	private IStatsService statsService;
	
	@Resource(name = "uploadPath_root")
	private String uploadPath_root;

	/*
	 * 거래처 : GET방식 2022.09.26 - 최초 거래처등록 페이지 접근
	 */
	@RequestMapping(value = "/cust-up", method = RequestMethod.GET)
	public String custUp(String redirect_target, Model model) {

		String comCode_s = session.getAttribute("comCode").toString();
		String userId_s = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		return "base/cust-up";
	}

	/*
	 * * 거래처 : POST 2022.10.05 - 거래처목록에서 넘어오는 경우 상세내역 노출
	 */
	@RequestMapping(value = "/cust-up", method = RequestMethod.POST)
	public String custUp(String redirect_target, Cust i_cust, Model model) {

		String comCode_s = session.getAttribute("comCode").toString();
		String userId_s = (String) session.getAttribute("userId");

		String custCode = i_cust.getCustCode();

		
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", comCode_s);
		i_params.put("userId", userId_s);
		i_params.put("custCode", custCode);

		// [Cust custInfo = baseService.custOne(i_params);
		// i_params.put("cust",custInfo);

		model.addAllAttributes(i_params);

		return "base/cust-up";
	}

	/**
	 * JS 에서 JSON 을 POST 요청 할 때, 응답 값으로 받는 param 을 Domain(VO, DTO) 작성하여 처리하는 예제입니다.
	 * MemberSet과 Member 객체로 JSON 이 자동 할당되는 것을 볼 수 있습니다. 이 방법이 웹 개발의 정석적인 방법입니다.
	 * 
	 * @param mSet JSON 정보를 MemberSet 으로 자동 할당한 파라메터
	 * @return JSON 정보 리턴
	 * 2023.08.16 bk -custAdd 수정 (cust의 마스터는 custInfoAdd 여기서 등ㄺ)
	 */
	@ResponseBody
	@RequestMapping(value = "/custAdd", method = RequestMethod.POST)
	public HashMap<String, Object> custAdd(@RequestBody Cust custSet) {

		
		String workingType = custSet.getWorkingType();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		CustManager custManager = null;
		CustAdmin custAdmin = null;

		ArrayList<CustManager> updateList = custSet.getMgrUpdate(); // 수정 리스트 얻기
		ArrayList<CustManager> addList = custSet.getMgrAdd(); // 추가 리스트 얻기
		ArrayList<CustManager> removeList = custSet.getMgrRemove(); // 제거 리스트 얻기

		ArrayList<CustAdmin> updateList2 = custSet.getAdmUpdate();
		ArrayList<CustAdmin> addList2 = custSet.getAdmAdd(); // 추가 리스트 얻기
		ArrayList<CustAdmin> removeList2 = custSet.getAdmRemove(); // 제거 리스트 얻기

		
		

		// 여기서 비지니스 로직을 작성하거나, 서비스 로직을 실행하세요.
		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		/*params.put("workingType", workingType);
		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("cust", custSet);

		
		Cust o_cust = new Cust();
		o_cust = baseService.custAdd(params);

		

		if (("OK").equals(o_cust.getDb_resultCode())) {*/
			// 거래처담당자 등록
			// for(int i=0, len=addList.size(); i<len; i++) {
			// custManager = addList.get(i);
			
			
			
			
			
			// }
			CustManager o_custManager = new CustManager();

		
		
		
		
		
		

			// 거래처 담당자
			params.clear();
			if (addList.size() > 0) {
				// for(int i=addList.size()-1; i<addList.size() && i>=0; i--) {
				for (int i = 0, len = addList.size(); i < len; i++) {
				
				
					custManager = addList.get(i);
					custManager.setCustCode(custSet.getCustCode());
					params.put("workingType", workingType);
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("custManager", custManager);
				

					o_custManager = baseService.custMgrAdd(params);

					/*
					 * mgrIdx = custManager.getMgrIdx(); name = custManager.getName(); position =
					 * custManager.getPosition(); role = custManager.getRole(); phone1 =
					 * custManager.getPhone1(); phone2 = custManager.getPhone2(); email =
					 * custManager.getEmail(); validYN = custManager.getValidYN();
					 */
				}
			}

			params.clear();
			if (updateList.size() > 0) {
				for (int i = 0, len = updateList.size(); i < len; i++) {
				
				
					custManager = updateList.get(i);
					custManager.setMgrIdx(Integer.parseInt(custManager.getIdx()));
					custManager.setCustCode(custSet.getCustCode());
					params.put("workingType", workingType);
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("custManager", custManager);
				
					o_custManager = baseService.custMgrAdd(params);
				}
			}

			params.clear();
			if (removeList.size() > 0) {
				for (int i = 0, len = removeList.size(); i < len; i++) {
				
				
					custManager = removeList.get(i);
					custManager.setCustCode(custSet.getCustCode());
					params.put("workingType", "DEL");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("custManager", custManager);
				
					o_custManager = baseService.custMgrAdd(params);
				}
			}

			// 거래처 관리자
			CustAdmin o_custAdmin = new CustAdmin();
			params.clear();
			if (addList2.size() > 0) {
				// for(int i=addList2.size()-1; i<addList2.size() && i>=0; i--) {
				for (int i = 0, len = addList2.size(); i < len; i++) {
					custAdmin = addList2.get(i);
					custAdmin.setCustCode(custSet.getCustCode());
					params.put("workingType", workingType);
					params.put("custAdmin", custAdmin);
					params.put("comCode", comCode);
					params.put("userId", userId);


					o_custAdmin = baseService.custAdmAdd(params);

					/*
					 * mgrIdx = custManager.getMgrIdx(); name = custManager.getName(); position =
					 * custManager.getPosition(); role = custManager.getRole(); phone1 =
					 * custManager.getPhone1(); phone2 = custManager.getPhone2(); email =
					 * custManager.getEmail(); validYN = custManager.getValidYN();
					 */
				}
			}

			params.clear();
			if (updateList2.size() > 0) {
				for (int i = 0, len = updateList2.size(); i < len; i++) {


					custAdmin = updateList2.get(i);
					custAdmin.setAdmIdx(Integer.parseInt(custAdmin.getIdx()));
					custAdmin.setCustCode(custSet.getCustCode());
					params.put("workingType", workingType);
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("custAdmin", custAdmin);

					o_custAdmin = baseService.custAdmAdd(params);
				}
			}

			params.clear();
			if (removeList2.size() > 0) {
				for (int i = 0, len = removeList2.size(); i < len; i++) {
			
			
					custAdmin = removeList2.get(i);
					custAdmin.setCustCode(custSet.getCustCode());
					params.put("workingType", "DEL");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("custAdmin", custAdmin);
			
					o_custAdmin = baseService.custAdmAdd(params);
				}
			}

			// 거래처관리자 등록
			// for(int i=0, len=addList2.size(); i<len; i++) {
			// custAdmin = addList2.get(i);
			
			// }
			// 결과 만들기
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		/*} else {
			map.put("result_code", o_cust.getDb_resultCode());
			map.put("result_msg", o_cust.getDb_resultMsg());
		}*/
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 거래처 목록 - 빈페이지
	 */
	@RequestMapping(value = "/cust-list")
	public String custList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String orderBy, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			Model model) {

	
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

		Cust i_cust = new Cust();

	
		// model.addAttribute("orderList", orderList);
		result.put("cust", i_cust);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "base/cust-list";

	}

	/*
	 * 거래처 목록
	 */
	@RequestMapping(value = "/cust-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> custList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String orderBy,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd, Cust i_cust,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String custSrch,
			String custTypeGroup, Model model) {

		
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

		// Cust i_cust = new Cust();
		i_cust.setComCode(comCode);

		String workingType = "";
		workingType = i_cust.getWorkingType();
		//System.out.println("workingType "+workingType);
		
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("orderBy", orderBy);
		i_param.put("cust", i_cust);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("custTypeGroup", custTypeGroup);
		i_param.put("custSrch", custSrch);
	
		//System.out.println("workingType"+workingType);
		List<Cust> custList = baseService.custList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("custList", custList);
		result.put("cust", i_cust);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("custSrch", custSrch);
	
		//System.out.println("result"+ result);
		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 거래처 담당자목록 2023.03.15 bokyung - in param에 custSrch, i_custMgr 추가 담당자 팝업창에서
	 * 담당자명으로검색이 안되는 오류 수정
	 */
	@RequestMapping(value = "/cust-mgr-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> custMgrList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String custSrch, Cust i_cust, CustManager i_custMgr,
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

		// Cust i_cust = new Cust();
		i_cust.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("cust", i_cust);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("custSrch", custSrch);
		i_param.put("custMgr", i_custMgr);

	

		List<CustManager> custMgrList = baseService.custMgrList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("custMgrList", custMgrList);
		result.put("cust", i_cust);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("custSrch", custSrch);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 거래처 관리자목록
	 */
	@RequestMapping(value = "/cust-adm-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> custAdmList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Cust i_cust,
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

		// Cust i_cust = new Cust();
		i_cust.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("cust", i_cust);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
	

		List<CustAdmin> custAdmList = baseService.custAdmList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("custAdmList", custAdmList);
		result.put("cust", i_cust);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 거래처 : POST 2022.10.05 - 거래처목록에서 넘어오는 경우 상세내역 노출
	 */
	@RequestMapping(value = "/code", method = RequestMethod.GET)
	public String codeList(String redirect_target, Cust i_cust, Model model) {

		String comCode_s = session.getAttribute("comCode").toString();
		String userId_s = (String) session.getAttribute("userId");

		String custCode = i_cust.getCustCode();

	
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");
		i_params.put("comCode", comCode_s);
		i_params.put("userId", userId_s);
		i_params.put("custCode", custCode);

		// [Cust custInfo = baseService.custOne(i_params);
		// i_params.put("cust",custInfo);

		model.addAllAttributes(i_params);

		return "base/code";
	}

	/*
	 * 기본코드- 마스터코드
	 */
	@RequestMapping(value = "/code-mst-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> codeMstList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Code i_code,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_code.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "MCODE_QRY");
		i_param.put("code", i_code);

		List<Code> codeList = baseService.codeList(i_param);

	

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("codeList", codeList);
		result.put("code", i_code);

	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 기본코드- 마스터코드
	 */
	@RequestMapping(value = "/code-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> codeList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Code i_code,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_code.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "CODE_QRY");
		i_param.put("code", i_code);

		List<Code> codeList = baseService.codeList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("codeList", codeList);
		result.put("code", i_code);

		model.addAllAttributes(result);

		return result;
	}

	/*
	 * 2023.07.06 hsg - 오류카운트 숫자 잘못되어 수정 addErr > 1 -> addErr > 0
	 */
	@ResponseBody
	@RequestMapping(value = "/codeAdd", method = RequestMethod.POST)
	public HashMap<String, Object> codeAdd(@RequestBody Code codeSet) {

		
		String workingType = codeSet.getWorkingType();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		Code code = null;

		ArrayList<Code> addList = codeSet.getCodeAdd(); // 추가 리스트 얻기
		ArrayList<Code> removeList = codeSet.getCodeRemove(); // 제거 리스트 얻기
		ArrayList<Code> updateList = codeSet.getCodeUpdate(); // 수정 리스트 얻기

		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("code", codeSet);

		Code o_code = new Code();
		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				code = addList.get(i);
				code.setmCode(codeSet.getmCode());
				code.setmCodeName(codeSet.getmCodeName());
				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("code", code);
				
				o_code = baseService.codeAdd(params);

				if (!("OK").equals(o_code.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				code = updateList.get(i);
				code.setCodeIdx(Integer.parseInt(code.getRowID()));

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("code", code);
			
				o_code = baseService.codeAdd(params);

				if (!("OK").equals(o_code.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				code = removeList.get(i);
				// code.setmCode(codeSet.getmCode());
				// code.setmCodeName(codeSet.getmCodeName());
				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("code", code);
				o_code = baseService.codeAdd(params);

				if (!("OK").equals(o_code.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					delErr = delErr + 1;
				}
			}
		}

		String msg = "";
		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				msg = "등록오류: " + addErr + "건";
			} else if (uptErr > 0) {
				msg = msg + " 수정오류: " + uptErr + "건";
			} else if (delErr > 0) {
				msg = msg + " 삭제 오류: " + delErr + "건";
			}
			msg = "처리 중 오류 발생했습니다 :: " + msg;
			map.put("result_code", "오류");
			map.put("result_msg", msg);
		} else {

			msg = "처리되었습니다.";
			map.put("result_code", "성공");
			map.put("result_msg", msg);
		}
		return map;
	}

	/*
	 * 상품조회 : GET방식 2022.11.09 - 최초 상품조회 페이지 접근
	 */
	@RequestMapping(value = "/item-list")
	public String itemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		Cust i_cust = new Cust();

		
		// model.addAttribute("orderList", orderList);
		result.put("cust", i_cust);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("comCode", comCode);

		model.addAllAttributes(result);
		return "base/item-list";

	}

	/*
	 * 상품 목록 2023.03.06 hsg - srchEqualItemNo 추가 . itemNo가 like가 아닌 = 로 검색하도록 추가. 부품
	 * 찾는 팝업창이 뜨지 않도록..
	 */
	@RequestMapping(value = "/item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> itemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd,

			Item i_item, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String srchEqualItemNo, Model model) {

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

		i_item.setComCode(comCode);

		String workingType = "";
		workingType = i_item.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("comCode", comCode);
		i_param.put("userId", userId);
		i_param.put("item", i_item);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("srchEqualItemNo", srchEqualItemNo);

		List<Item> itemList = baseService.itemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("itemList", itemList);
		result.put("item", i_item);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		result.put("srchEqualItemNo", srchEqualItemNo);
		

		model.addAllAttributes(result);
		return result;
	}
	/*
	 * 상품정품품번조회 : GET방식 2023.06.21 - 최초 상품조회 페이지 접근
	 */
	@RequestMapping(value = "/itemOe-list")
	public String itemOeList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "base/itemOe-list";

	}

//아이템별 정품품번조회 2023.06.21 bk
	@RequestMapping(value = "/itemOe-list", method = RequestMethod.POST)
	@ResponseBody
		public HashMap<String, Object>  itmeOeList(String redirect_target, ItemOe i_itemOe, Model model) {

		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		long itemId = i_itemOe.getItemId();

		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "LIST");
		i_params.put("comCode", logComCode);
		i_params.put("userId", logUserId);
		i_params.put("itemId", itemId);
		i_params.put("itemOe", i_itemOe);
	
		//System.out.println("i_params"+ i_params);
		
		List<ItemOe> itemOeList= baseService.itemOeList(i_params);

		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("itemOeList", itemOeList);
	
		
		//System.out.println("result"+result);
		
		model.addAllAttributes(result);

		return result;
	}

	/*
	 * 상품 : GET방식 2022.11.11 - 최초 상품등록 페이지 접근 2023.02.14 hsg - logComCode를 상품코드 채번시
	 * 사용하기 위해서 값 넘기기위해 추가
	 */
	@RequestMapping(value = "/item-up", method = RequestMethod.GET)
	public String itemUp(String redirect_target, Model model) {

		String logcomCode = session.getAttribute("comCode").toString();
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("logComCode", logcomCode);
		params.put("logUserId", logUserId);

		model.addAllAttributes(params);

		return "base/item-up";
	}

	/*
	 * 상품 : POST 2022.11.11 - 상품목록에서 넘어오는 경우 상세내역 노출
	 */
	@RequestMapping(value = "/item-up", method = RequestMethod.POST)
	public String itmeUp(String redirect_target, Item i_item, Model model) {

		
		String comCode_s = session.getAttribute("comCode").toString();
		String userId_s = (String) session.getAttribute("userId");

		long itemId = i_item.getItemId();

		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", comCode_s);
		i_params.put("userId", userId_s);
		i_params.put("itemId", itemId);

		model.addAllAttributes(i_params);

		return "base/item-up";
	}

	/*
	 * 상품등록 2022.11.11 -
	 */
	@ResponseBody
	@RequestMapping(value = "/itemAdd", method = RequestMethod.POST)
	public HashMap<String, Object> itemAdd(@RequestBody Item itemSet) {

		String workingType = itemSet.getWorkingType();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ItemOe itemoe = null;
		ArrayList<ItemOe> addList = itemSet.getItemOeAdd();
		ArrayList<ItemOe> updateList = itemSet.getItemOeUpdate();
		ArrayList<ItemOe> removeList = itemSet.getItemOeRemove();
		
		if (addList == null) {
		    addList = new ArrayList<ItemOe>();
		}

		if (updateList == null) {
		    updateList = new ArrayList<ItemOe>();
		}

		if (removeList == null) {
		    removeList = new ArrayList<ItemOe>();
		}
		
		// 여기서 비지니스 로직을 작성하거나, 서비스 로직을 실행하세요.
		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		
		params.put("workingType", workingType);
		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("item", itemSet);

		//System.out.println("itemSset"+itemSet);
		Item o_item = new Item();		
		o_item = baseService.itemAdd(params);
		
		//System.out.println("o_item"+o_item);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		if (("OK").equals(o_item.getDb_resultCode())) {
			ItemOe o_itemoe = new ItemOe();
			params.clear();
				//System.out.println("addlist"+addList.size());
				if (addList.size() > 0) {
					for (int i = 0, len = addList.size(); i < len; i++) {
						itemoe = addList.get(i);
						itemoe.setItemId(o_item.getItemId());
						params.put("workingType", "ADD");
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("itemoe", itemoe);
						
						//System.out.println("itemoe"+itemoe);
						
						o_itemoe = baseService.itemOeAdd(params);												
					}
				}	
				params.clear();
				//System.out.println("removeList"+removeList.size());
				if (removeList.size() > 0) {
					for (int i = 0, len = removeList.size(); i < len; i++) {
						itemoe = removeList.get(i);
						itemoe.setItemId(o_item.getItemId());
						params.put("workingType", "DEL");
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("itemoe", itemoe);
						//System.out.println("itemoe"+itemoe);
						o_itemoe = baseService.itemOeAdd(params);	
					}
				}
				
				map.put("o_itemNo", itemSet.getItemNo());
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
		}else {
			map.put("o_itemNo", itemSet.getItemNo());
			map.put("result_code", o_item.getDb_resultCode());
			map.put("result_msg", o_item.getDb_resultMsg());
		}

	
	
		
		
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	////////////////////////////////////////////////////////////////////////////////////////
	////////////////// Begin : 정동근 매니저
	//////////////////////////////////////////////////////////////////////////////////////// 작업분//////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////

	/*
	 * 메뉴내역 빈페이지 정동근
	 */

	@RequestMapping(value = "/menu-list")
	public String menuList() {
		return "base/menu-list";

	}

	/*
	 * 메뉴목록 정동근
	 */
	@RequestMapping(value = "/menu-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> menuList(

			Menu i_menu, Model model) {

		

		// String comCode = (String) session.getAttribute("comCode");
		// String userId = (String) session.getAttribute("userId");

		// i_menu.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("menu", i_menu);

		List<Menu> menuList = baseService.menuList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("menuList", menuList);
		result.put("menu", i_menu);



		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 메뉴등록 정동근
	 */

	@ResponseBody
	@RequestMapping(value = "/menuAdd", method = RequestMethod.POST)
	public HashMap<String, Object> menuAdd(@RequestBody Menu menuSet) {

	

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<Menu> updateList = menuSet.getMenuUpdate(); // 수정 리스트 얻기
		ArrayList<Menu> addList = menuSet.getMenuAdd(); // 추가 리스트 얻기
		ArrayList<Menu> removeList = menuSet.getMenuRemove(); // 제거 리스트 얻기

		// 여기서 비지니스 로직을 작성하거나, 서비스 로직을 실행하세요.
		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Menu menu = null;
		int result = 0;

		String result_code = "";
		String result_msg = "";

		int okCount = 0;
		int errCount = 0;

		// String pwdEncGet = "";
		String errIdx = "";
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				menu = addList.get(i);
				if (menu.getValidYN() == null) {
					menu.setValidYN("N");
				}
				menu.setRegUserId(userId);

				params.put("workingType", "ADD");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("menu", menu);

				result = baseService.menuAdd(params);
				if (result == 1) {
					okCount = okCount + 1;
				} else {
					errCount = errCount + 1;
					errIdx = errIdx + "^" + menu.getMenuCode();
				}
			}

			if (addList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";
			} else {
				result_code = "Err";
				result_msg = errCount + "개 행 에러 발생";
			}
		}

		params.clear();
		
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				menu = updateList.get(i);
				// user.setUserId(user.getUserId_origin());

				params.put("workingType", "UPT");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("menu", menu);

				result = baseService.menuAdd(params);
				if (result == 0) {
					errIdx = errIdx + "^" + menu.getMenuCode();
				}
			
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {

				menu = removeList.get(i);

				params.put("workingType", "DEL");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("menu", menu);

				result = baseService.menuAdd(params);
				if (result == 0) {
					errIdx = errIdx + "^" + menu.getMenuCode();
				}
			}
		}

		if (("").equals(errIdx)) {
			result_code = "OK";
			result_msg = "저장되었습니다.";
		} else {
			result_code = "Err";
			result_msg = "저장 실패한 자료가 있습니다.";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		map.put("errIdx", errIdx);

		return map;
	}

	@RequestMapping(value = "/storage-list")
	public String storageList() {
		return "base/storage-list";

	}

	/*
	 * 창고목록 정동근
	 */
	@RequestMapping(value = "/storage-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storageList(

			Storage i_storage, Model model) {

		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		//String logUserId = (String) session.getAttribute("logUserId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("storage", i_storage);
		i_param.put("logUserId", logUserId);
		i_param.put("logComCode", logComCode);

		List<Storage> storageList = baseService.storageList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("storageList", storageList);
		result.put("storage", i_storage);

		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 창고등록 정동근
	 * comCode ->logcomCode로 바꿈 2023.07.14 bk
	 * 2024.03.26 supi - 창고추가의 경우 프로시저에서 -3반환시 특정 문자열 반환 추가(그린파츠에서 수탁업체코드 없이 등록하거나 수탁창고여부 'y'가 아닌경우
	 * 2024.06.04 hsg -  update 시 사용중인 랙이 등록된 경우 물류센터변경 불가 오류 처리.
	 * 2024.06.10 hsg -  add, update 시 창고구분+물류센터+위탁업체 중복 체크 오류처리.
	 */
	@ResponseBody
	@RequestMapping(value = "/storageAdd", method = RequestMethod.POST)
	public HashMap<String, Object> storageAdd(@RequestBody Storage storageSet) {

		String comCode = (String) session.getAttribute("comCode");
		//System.out.println("comCode"+comCode);
		String userId = (String) session.getAttribute("userId");

		ArrayList<Storage> updateList = storageSet.getStorageUpdate(); // 수정 리스트 얻기
		ArrayList<Storage> addList = storageSet.getStorageAdd(); // 추가 리스트 얻기
		ArrayList<Storage> removeList = storageSet.getStorageRemove(); // 제거 리스트 얻기

		// 여기서 비지니스 로직을 작성하거나, 서비스 로직을 실행하세요.
		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> valParams = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Storage storage = null;

		int result = 0;
		String errIdx = "";

		String result_code = "";
		String result_msg = "";

		int okCount = 0;
		int errCount = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				if (addList.get(i).getValidYN() == null) {
					addList.get(i).setValidYN("");
				}
				
				storage = addList.get(i);
				
				valParams.put("workingType", "checkAdd");
				valParams.put("logComCode", comCode);
				valParams.put("storageCode", storage.getStorageCode());
				valParams.put("storageName", storage.getStorageName());
				valParams.put("storType", storage.getStorType());

				valParams.put("rlStandByYN", storage.getRlStandByYN());
				valParams.put("validYN", storage.getValidYN());
				int checkValid = baseService.storageValCheck(valParams);

				if (checkValid == -1) {
					result_code = "Err1";
				} else if (checkValid == -2) {
					result_code = "Err2";
				} else {
					result_code = "";
				}
				
				params.put("workingType", "ADD");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("storage", storage);
				params.put("errCode", result_code);

				result = baseService.storageAdd(params);

				if (result >= 1) {
					okCount = okCount + 1;
					result = 0;
				} else if(result == -3)			{
					result_code = "Err3"; // 그린파츠 위탁창고 에러
				} else if(result == -12)			{  //창고구분+물류센터+위탁업체 중복 오류
					result_code = "Err12"; // 
				} else {
					errCount = errCount + 1;
					errIdx = errIdx + "^" + storage.getStorageCode();
					result = 0;
				}
			}

			if (addList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";
			} else {
				if ((result_code).equals("Err1")) {
					result_msg = "창고코드가 중복되었습니다.";
				} else if ((result_code).equals("Err2")) {
					result_msg = "창고명과 창고구분이 같은 창고가 존재합니다.";
					
				} else if((result_code.equals("Err3"))) {
					result_msg = "그린파츠의 창고추가는 수탁업체코드와 수탁창고여부 'Y'가 필수입니다.";
				} else if((result_code.equals("Err12"))) { //2024.06.10 hsg
					result_msg = "창고구분,물류센터,위탁업체가 동일한 창고가 이미 존재합니다.";
				} else {
					result_code = "Err";
					result_msg = "실패";
				}
			}
		}

		params.clear();
		valParams.clear();
		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {				

				if (updateList.get(i).getValidYN() == null) {
					updateList.get(i).setValidYN("");
				}
					
				storage = updateList.get(i);
				valParams.put("workingType", "checkUpt");
				valParams.put("comCode", comCode);
				valParams.put("storageCode", storage.getStorageCode());
				valParams.put("storageName", storage.getStorageName());
				valParams.put("storType", storage.getStorType());

				int checkValid = baseService.storageValCheck(valParams);

				if (checkValid == -2) {
					result_code = "Err2";
				} else {
					result_code ="";
				}
				
				params.put("workingType", "UPT");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("storage", storage);
				params.put("errCode", result_code);

				result = baseService.storageAdd(params);

				if (result >= 1) {
					okCount = okCount + 1;
					result = 0;
				} else if (result == -11) {
					result_code = "Err11"; // 그린파츠 위탁창고 에러
				} else if(result == -12)			{  //창고구분+물류센터+위탁업체 중복 오류
					result_code = "Err12"; // 
				} else {
					errCount = errCount + 1;
					errIdx = errIdx + "^" + storage.getStorageCode();
					result = 0;
				}				
			}

			if (updateList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				if ((result_code).equals("Err2")) {
					result_msg = "창고명과 창고구분이 같은 창고가 존재합니다.";
				} else if((result_code.equals("Err11"))) { //2024.06.04 hsg
					result_msg = "사용 중인 랙이 등록된 경우 물류센터 변경이 불가능 합니다.";
				} else if((result_code.equals("Err12"))) { //2024.06.10 hsg
					result_msg = "창고구분,물류센터,위탁업체가 동일한 창고가 이미 존재합니다.";
				} else {
					result_code = "Err";
					result_msg = "실패";
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {

				if (removeList.get(i).getValidYN() == null) {
					removeList.get(i).setValidYN("");
				}

				storage = removeList.get(i);

				params.put("workingType", "DEL");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("storage", storage);

				result = baseService.storageAdd(params);

				if (result >= 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}
			}

			if (removeList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				result_msg = "실패";
			}
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		map.put("errIdx", errIdx);

		return map;

	}

	/*
	 * 랙 빈페이지 정동근
	 */

	@RequestMapping(value = "/rack-list")
	public String rackList() {
		return "base/rack-list";

	}

	/*
	 * 랙 목록 정동근
	 */
	@RequestMapping(value = "/rack-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rackList(	Rack i_rack, Model model) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		String gvComCode = i_rack.getGvComCode();
		//System.out.println("gvComCode : " + gvComCode);
		String realComCode;
		
		if (("").equals(gvComCode)|| gvComCode == null) {
			realComCode = logComCode;
		}else {
			realComCode = gvComCode;
		}

		//String logUserId = (String) session.getAttribute("logUserId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("rack", i_rack);
		i_param.put("logUserId", logUserId);
		i_param.put("logComCode", logComCode);
		i_param.put("realComCode", realComCode);
		//System.out.println("realComCode : " + realComCode);
		

		List<Rack> rackList = baseService.rackList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("rackList", rackList);
		result.put("rack", i_rack);
		result.put("logComCode", logComCode);
		result.put("logUserId", logUserId);
		

		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 랙 등록 정동근
	 * 2023.11.28 hsg - rackAdd -> rackReg로 변경. SP로 변경하면서..
	 */
	@ResponseBody
	@RequestMapping(value = "/rackAdd", method = RequestMethod.POST)
	public HashMap<String, Object> rackAdd(@RequestBody Rack rackSet) {
		
		String workingType = rackSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		Rack rack = null;

		ArrayList<Rack> addList = rackSet.getRackAdd(); // 추가 리스트 얻기
		ArrayList<Rack> removeList = rackSet.getRackRemove(); // 제거 리스트 얻기
		ArrayList<Rack> updateList = rackSet.getRackUpdate(); // 수정 리스트 얻기

		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("rack", rackSet);

		Rack o_rack = new Rack();
		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		String errItem = "";
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				if (addList.get(i).getValidYN() == null) {
					addList.get(i).setValidYN("");
				}

				rack = addList.get(i);
				
				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("rack", rack);
				
				o_rack = baseService.rackReg(params);
				
				if (!("OK").equals(o_rack.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
					errItem = errItem + "\n "+Integer.toString(i+1)+". 랙명: "+o_rack.getRackName() + " (" + o_rack.getDb_resultMsg()+")";
				}
				//System.out.println("re:"+o_rack.getDb_resultCode());
			}
		}

		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				if (updateList.get(i).getValidYN() == null) {
					updateList.get(i).setValidYN("");
				}

				rack = updateList.get(i);

				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("rack", rack);
			
				o_rack = baseService.rackReg(params);

				if (!("OK").equals(o_rack.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
					errItem = errItem + "\n "+Integer.toString(i+1)+". 랙명: "+o_rack.getRackName() + " (" + o_rack.getDb_resultMsg()+")";
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				if (removeList.get(i).getValidYN() == null) {
					removeList.get(i).setValidYN("");
				}

				rack = removeList.get(i);
				
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("rack", rack);
				o_rack = baseService.rackReg(params);

				if (!("OK").equals(o_rack.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					delErr = delErr + 1;
					errItem = errItem + "\n "+Integer.toString(i+1)+". 랙명: "+o_rack.getRackName() + " (" + o_rack.getDb_resultMsg()+")";
				}
			}
		}

		String msg = "";
		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				//msg = "등록오류: " + addErr + "건";
				msg = "\n# 등록오류: " + addErr + "건" + " => "+errItem;
			} else if (uptErr > 0) {
				//msg = msg + " 수정오류: " + uptErr + "건";
				msg = msg+"\n# 수정오류: " + uptErr + "건" + " => "+errItem;
			} else if (delErr > 0) {
				//msg = msg + " 삭제 오류: " + delErr + "건";
				msg = msg+"\n# 삭제오류: " + delErr + "건" + " => "+errItem;
			}
			msg = "처리 중 오류 발생했습니다 :: " + msg;
			map.put("result_code", "오류");
			map.put("result_msg", msg);
		} else {

			msg = "처리되었습니다.";
			map.put("result_code", "성공");
			map.put("result_msg", msg);
		}
		return map;
	}
	
	/*
	@ResponseBody
	@RequestMapping(value = "/rackAdd", method = RequestMethod.POST)
	public HashMap<String, Object> rackAdd(@RequestBody Rack rackSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<Rack> updateList = rackSet.getRackUpdate(); // 수정 리스트 얻기
		ArrayList<Rack> addList = rackSet.getRackAdd(); // 추가 리스트 얻기
		ArrayList<Rack> removeList = rackSet.getRackRemove(); // 제거 리스트 얻기
		
		

		// 여기서 비지니스 로직을 작성하거나, 서비스 로직을 실행하세요.
		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> valParams = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Rack rack = null;

		int result = 0;
		String errIdx = "";

		String result_code = "";
		String result_msg = "";

		int okCount = 0;
		int errCount = 0;

		if (addList.size() > 0) {

			for (int i = 0, len = addList.size(); i < len; i++) {

				if (addList.get(i).getValidYN() == null) {
					addList.get(i).setValidYN("");
				}

				rack = addList.get(i);

				valParams.put("workingType", "checkAdd");
				valParams.put("logComCode", comCode);
				valParams.put("rack", rack);

				int checkValid = baseService.rackValCheck(valParams);

				if (checkValid == -1) {
					result_code = "Err1";
					errIdx = errIdx + "^" + rack.getRackCode();
				} else if (checkValid == -2) {
					result_code = "Err2";
					errIdx = errIdx + "^" + rack.getRackCode();

				} else if (checkValid == -3) {
					result_code = "Err3";
					errIdx = errIdx + "^" + rack.getRackCode();

				} else {
					result_code = "";
				}
				
				params.put("workingType", "ADD");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("rack", rack);
				params.put("errCode", result_code);

				result = baseService.rackAdd(params);

				if (result >= 1) {
					okCount = okCount + 1;
					result = 0;
                      
				} else {
					errCount = errCount + 1;
					errIdx = errIdx + "^" + rack.getRackCode();
					result = 0;
				}
				
				
			}

			if (addList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				if ((result_code).equals("Err1")) {
					result_msg = "렉코드가 중복되었습니다.";
				} else if ((result_code).equals("Err2")) {
					result_msg = "같은 창고에 같은 렉이름이 존재합니다.";
				} else if ((result_code).equals("Err3")) {
					result_msg = "바코드가 중복되었습니다.";
				} else {
					result_code = "Err";
					result_msg = "실패";
				}
			}

		}

		params.clear();
		valParams.clear();
		
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {

				if (updateList.get(i).getValidYN() == null) {
					updateList.get(i).setValidYN("");
				}

				rack = updateList.get(i);

				valParams.put("workingType", "checkUpt");
				valParams.put("comCode", comCode);
				valParams.put("rack", rack);

				
				int checkValid = baseService.rackValCheck(valParams);

				if (checkValid == -3) {
					result_code = "Err3";
				} else if (checkValid == -2) {
			             		result_code = "Err2";
				} else {
					result_code="";
				}
				
				params.put("workingType", "UPT");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("rack", rack);
				params.put("errCode", result_code);
				
				
				result = baseService.rackAdd(params);
				
				

				if (result >= 1) {
					okCount = okCount + 1;
					result = 0;

				} else {
					errCount = errCount + 1;
					errIdx = errIdx + "^" + rack.getRackCode();
					result = 0;
				}

			}

			if (updateList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				if ((result_code).equals("Err2")) {
					result_msg = "같은 창고에 같은 렉이름이 존재합니다.";
				} else if ((result_code).equals("Err3")) {
					result_msg = "바코드가 중복되었습니다.";
				} else {
					result_code = "Err";
					result_msg = "실패";
				}
			}
		}
		
		params.clear();
		if (removeList.size() > 0)

		{
			for (int i = 0, len = removeList.size(); i < len; i++) {

				if (removeList.get(i).getValidYN() == null) {
					removeList.get(i).setValidYN("");
				}

				rack = removeList.get(i);

				params.put("workingType", "DEL");
				params.put("logComCode", comCode);
				params.put("logUserId", userId);
				params.put("rack", rack);

				result = baseService.rackAdd(params);

				if (result >= 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}

			if (removeList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				result_msg = "실패";
			}

		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		map.put("errIdx", errIdx);

		return map;

	}
	*/
	
	////////////////////////////////////////////////////////////////////////////////////////
	////////////////// End : 정동근 매니저
	//////////////////////////////////////////////////////////////////////////////////////// 작업분//////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////

	// 부서 빈페이지
	@RequestMapping(value = "/dept-list")
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

		Depart i_depart = new Depart();

		result.put("depart", i_depart);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return "base/dept-list";

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

		String logComCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		i_depart.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("depart", i_depart);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("logComCode", logComCode);

		List<Depart> deptList = baseService.deptList(i_param);

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
	 * 부서 등록
	 */

	@ResponseBody
	@RequestMapping(value = "/deptAdd", method = RequestMethod.POST)
	public HashMap<String, Object> deptAdd(@RequestBody Depart deptSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<Depart> addList = deptSet.getDeptAdd(); // 추가 리스트 얻기
		ArrayList<Depart> updateList = deptSet.getDeptUpdate(); // 수정 리스트 얻기
		ArrayList<Depart> removeList = deptSet.getDeptRemove(); // 제거 리스트 얻기

		ArrayList<Depart> addList1 = deptSet.getDept1Add(); // 추가 리스트 얻기
		ArrayList<Depart> updateList1 = deptSet.getDept1Update(); // 수정 리스트 얻기
		ArrayList<Depart> removeList1 = deptSet.getDept1Remove(); // 제거 리스트 얻기

		ArrayList<Depart> addList2 = deptSet.getDept2Add(); // 추가 리스트 얻기
		ArrayList<Depart> updateList2 = deptSet.getDept2Update(); // 수정 리스트 얻기
		ArrayList<Depart> removeList2 = deptSet.getDept2Remove(); // 제거 리스트 얻기

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Depart depart = null;
		String dept1Code_save;
		String dept1Name_save;
		String dept2Code_save;
		String dept2Name_save;

		int result = 0;
		String result_code = "";
		String result_msg = "";

		params.clear();
		if (addList.size() > 0 && addList1.size() == 0 && addList2.size() == 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {

				depart = addList.get(i);

				if (depart.getDept2Code() == null) {
					depart.setDept2Code("");
				}
				if (depart.getDept2Name() == null) {
					depart.setDept2Name("");
				}
				if (depart.getDept3Code() == null) {
					depart.setDept3Code("");
				}
				if (depart.getDept3Name() == null) {
					depart.setDept3Name("");
				}

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);
				

				result = baseService.deptAdd(params); // 1이면 성공 0이면 실패
				

			}

		} else if (addList.size() > 0 && addList1.size() > 0 && addList2.size() == 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {

				depart = addList.get(i);

				if (depart.getDept2Code() == null) {
					depart.setDept2Code("");
				}
				if (depart.getDept2Name() == null) {
					depart.setDept2Name("");
				}
				if (depart.getDept3Code() == null) {
					depart.setDept3Code("");
				}
				if (depart.getDept3Name() == null) {
					depart.setDept3Name("");
				}

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params); // 1이면 성공 0이면 실패

				dept1Code_save = depart.getDept1Code();
				dept1Name_save = depart.getDept1Name();

				for (int j = 0, len1 = addList1.size(); j < len1; j++) {
					depart = addList1.get(j);
					depart.setDept1Code(dept1Code_save);
					depart.setDept1Name(dept1Name_save);

					if (depart.getDept3Code() == null) {
						depart.setDept3Code("");
					}
					if (depart.getDept3Name() == null) {
						depart.setDept3Name("");
					}

					params.put("workingType", "ADD");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("depart", depart);

					

					result = baseService.deptAdd(params);
					

				}

			}
		} else if (addList.size() > 0 && addList1.size() > 0 && addList2.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {

				depart = addList.get(i);

				if (depart.getDept2Code() == null) {
					depart.setDept2Code("");
				}
				if (depart.getDept2Name() == null) {
					depart.setDept2Name("");
				}
				if (depart.getDept3Code() == null) {
					depart.setDept3Code("");
				}
				if (depart.getDept3Name() == null) {
					depart.setDept3Name("");
				}

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params); // 1이면 성공 0이면 실패

				dept1Code_save = depart.getDept1Code();
				dept1Name_save = depart.getDept1Name();

				for (int j = 0, len1 = addList1.size(); j < len1; j++) {
					depart = addList1.get(j);
					depart.setDept1Code(dept1Code_save);
					depart.setDept1Name(dept1Name_save);

					if (depart.getDept3Code() == null) {
						depart.setDept3Code("");
					}
					if (depart.getDept3Name() == null) {
						depart.setDept3Name("");
					}

					params.put("workingType", "ADD");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("depart", depart);

					result = baseService.deptAdd(params);
					dept2Code_save = depart.getDept2Code();
					dept2Name_save = depart.getDept2Name();

					for (int k = 0, len2 = addList2.size(); k < len2; k++) {
						depart = addList2.get(k);
						depart.setDept1Code(dept1Code_save);
						depart.setDept1Name(dept1Name_save);
						depart.setDept2Code(dept2Code_save);
						depart.setDept2Name(dept2Name_save);

						params.put("workingType", "ADD");
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("depart", depart);

						result = baseService.deptAdd(params);

					}

				}

			}

		} else if (addList.size() == 0 && addList1.size() > 0 && addList2.size() == 0) {
			for (int i = 0, len = addList1.size(); i < len; i++) {
				depart = addList1.get(i);
				depart.setDept1Code(deptSet.getDept1Code());
				depart.setDept1Name(deptSet.getDept1Name());

				if (depart.getDept3Code() == null) {
					depart.setDept3Code("");
				}
				if (depart.getDept3Name() == null) {
					depart.setDept3Name("");
				}

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params);
			}
		} else if (addList.size() == 0 && addList1.size() > 0 && addList2.size() > 0) {
			for (int i = 0, len = addList1.size(); i < len; i++) {
				depart = addList1.get(i);
				depart.setDept1Code(deptSet.getDept1Code());
				depart.setDept1Name(deptSet.getDept1Name());

				if (depart.getDept3Code() == null) {
					depart.setDept3Code("");
				}
				if (depart.getDept3Name() == null) {
					depart.setDept3Name("");
				}

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params);
				for (int j = 0, len1 = addList2.size(); j < len1; j++) {
					depart = addList2.get(j);
					depart.setDept1Code(deptSet.getDept1Code());
					depart.setDept1Name(deptSet.getDept1Name());
					depart.setDept2Code(deptSet.getDept2Code());
					depart.setDept2Name(deptSet.getDept2Name());

					params.put("workingType", "ADD");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("depart", depart);

					result = baseService.deptAdd(params);
				}
			}
		} else if (addList.size() == 0 && addList1.size() == 0 && addList2.size() > 0) {
			for (int i = 0, len = addList2.size(); i < len; i++) {
				depart = addList2.get(i);
				depart.setDept1Code(deptSet.getDept1Code());
				depart.setDept1Name(deptSet.getDept1Name());
				depart.setDept2Code(deptSet.getDept2Code());
				depart.setDept2Name(deptSet.getDept2Name());

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params);

			}
		}

		// 삭제해보자

		params.clear();
		if (removeList2.size() > 0) {
			for (int i = 0, len = removeList2.size(); i < len; i++) {
				depart = removeList2.get(i);
				depart.setDept1Code(deptSet.getDept1Code());
				depart.setDept2Code(deptSet.getDept2Code());

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params);

			}

		}
		if (removeList1.size() > 0) {
			for (int i = 0, len = removeList1.size(); i < len; i++) {
				depart = removeList1.get(i);
				depart.setDept1Code(deptSet.getDept1Code());
				depart.setDept3Code("");

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params);

			}

		}
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				depart = removeList.get(i);
				depart.setDept2Code("");
				depart.setDept3Code("");

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);

				result = baseService.deptAdd(params);
			}

		}

		// 업데이트해보자
		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				depart = updateList.get(i);

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);
				params.put("deptSet", deptSet);

				result = baseService.deptAdd(params);

			}

		} else if (updateList1.size() > 0) {
			for (int i = 0, len = updateList1.size(); i < len; i++) {
				depart = updateList1.get(i);

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);
				params.put("deptSet", deptSet);
				result = baseService.deptAdd(params);
			}

		} else if (updateList2.size() > 0) {
			for (int i = 0, len = updateList2.size(); i < len; i++) {
				depart = updateList2.get(i);

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depart", depart);
				params.put("deptSet", deptSet);

				result = baseService.deptAdd(params);

			}

		}

		if (result >= 1) {
			result_code = "OK";
			result_msg = "성공";
		} else {
			result_code = "Err";
			result_msg = "실패";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);

		return map;
	}

	/*
	 * 보험사할인율 - 빈페이지
	 */
	@RequestMapping(value = "/insurDc-list")
	public String insurDcList( Model model) {
		return "base/insurDc-list";

	}

	/*
	 * 보험사할인율-LIST
	 */

	@RequestMapping(value = "/insurDc-list", method = RequestMethod.POST)
	@ResponseBody
	public List<InsurDcRate> insurDcList(InsurDcRate insurDcRate ) {

		String logComCode = (String) session.getAttribute("comCode");

		insurDcRate.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("insurDcRate", insurDcRate); 
		i_param.put("logComCode", logComCode);

		List<InsurDcRate> insurDcList = baseService.insurDcList(i_param);  
		return insurDcList;

	}

	@ResponseBody
	@RequestMapping(value = "/insurDcAdd", method = RequestMethod.POST)
	public CommonResult insurDcAdd(@RequestBody InsurDcRate insurDcRate) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("logComCode", comCode);
		i_param.put("logUserId", userId);
		i_param.put("insurDcRate", insurDcRate);
		  
		
		return baseService.insurDcAdd(i_param);
	}

	// sr 빈페이지
	@RequestMapping(value = "/sr-list")
	public String srList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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

		Sr sr = new Sr();

		result.put("sr", sr);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return "base/sr-list";

	}

	@RequestMapping(value = "/sr-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> srList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Sr sr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		sr.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("sr", sr);
		i_param.put("sYmd", sYmd);
		i_param.put("eYmd", eYmd);
		i_param.put("comCode", comCode);
		i_param.put("userId", userId);

		List<Sr> srList = baseService.srList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("srList", srList);
		result.put("sr", sr);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("comCode", comCode);
		result.put("userId", userId);

		model.addAllAttributes(result);

		return result;

	}

	@RequestMapping(value = "/srCust-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> srCustList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, SrCust srCust,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		srCust.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("srCust", srCust);
		i_param.put("sYmd", sYmd);
		i_param.put("eYmd", eYmd);
		i_param.put("comCode", comCode);
		i_param.put("userId", userId);

		List<SrCust> srCustList = baseService.srCustList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("srCustList", srCustList);
		result.put("srCust", srCust);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return result;

	}

	@ResponseBody
	@RequestMapping(value = "/srAdd", method = RequestMethod.POST)
	public HashMap<String, Object> srAdd(@RequestBody Sr srSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<Sr> addList = srSet.getSrAdd();
		ArrayList<Sr> uptList = srSet.getSrUpdate();
		ArrayList<Sr> uptItem = srSet.getSrUpdateItem();
		ArrayList<Sr> delList = srSet.getSrRemove();

		/*
		 * ArrayList<SrCust> addList1 = srCustSet.getSrCustAdd(); ArrayList<SrCust>
		 * uptList1 = srCustSet.getSrCustUpdate(); ArrayList<SrCust> delList1 =
		 * srCustSet.getSrCustRemove();
		 */

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Sr sr = null;
		SrCust srCust = null;

		int result = 0;

		int okCount = 0;
		int errCount = 0;
		String result_code = "";
		String result_msg = "";
		String result_msg1 = "";

		params.clear();

		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				sr = addList.get(i);

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("sr", sr);

				result = baseService.srAdd(params); // 1이면 성공 0이면 실패
				if (result == 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}
			if (addList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				result_msg = errCount + "개 행 에러 발생";
			}

		}
		params.clear();
		if (uptList.size() > 0) {
			for (int i = 0, len = uptList.size(); i < len; i++) {

				sr = uptList.get(i);

				if (("SR1").equals(uptItem.get(i).getSrType_origin())) {
					result = 0;
					result_msg1 = "SR1은 수정할 수 없습니다.";
					break;
				} else if (("SR2").equals(uptItem.get(i).getSrType_origin())
						&& ("SR1").equals(uptItem.get(i).getSrType())) {
					result = 0;
					result_msg1 = "SR2는 SR3로만 수정할 수 있습니다.";
					break;
				} else if (("SR3").equals(uptItem.get(i).getSrType_origin())
						&& ("SR1").equals(uptItem.get(i).getSrType())) {
					result = 0;
					result_msg1 = "SR3는 SR2로만 수정할 수 있습니다.";
					break;
				} else {
					params.put("workingType", "UPT");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("sr", sr);

					result = baseService.srAdd(params); // 1이면 성공 0이면 실패
				}

				if (result == 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}

			if (uptList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				if (result_msg1 != "") {
					result_msg = result_msg1;
				} else {
					result_msg = errCount + "개 행 에러 발생";
				}

			}

		}
		params.clear();
		if (delList.size() > 0) {

			for (int i = 0, len = delList.size(); i < len; i++) {
				sr = delList.get(i);

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("sr", sr);

				result = baseService.srAdd(params); // 1이면 성공 0이면 실패
				if (result == 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}
			if (delList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				result_msg = errCount + "개 행 에러 발생";
			}
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;
	}

	@ResponseBody
	@RequestMapping(value = "/srCustAdd", method = RequestMethod.POST)
	public HashMap<String, Object> srCustAdd(@RequestBody SrCust srCustSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<SrCust> addList = srCustSet.getSrCustAdd();
		ArrayList<SrCust> uptList = srCustSet.getSrCustUpdate();
		ArrayList<SrCust> delList = srCustSet.getSrCustRemove();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		SrCust srCust = null;

		int result = 0;

		int okCount = 0;
		int errCount = 0;
		String result_code = "";
		String result_msg = "";

		params.clear();

		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				srCust = addList.get(i);

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);

				params.put("srType", srCustSet.getSrType());
				params.put("srCode", srCustSet.getSrCode());

				params.put("srCust", srCust);

				result = baseService.srCustAdd(params); // 1이면 성공 0이면 실패
				if (result == 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}
			if (addList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				result_msg = errCount + "개 행 에러 발생";
			}

		}
		params.clear();
		if (uptList.size() > 0) {
			for (int i = 0, len = uptList.size(); i < len; i++) {

				srCust = uptList.get(i);

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("srCust", srCust);
				result = baseService.srCustAdd(params); // 1이면 성공 0이면 실패
				if (result == 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}

			if (uptList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";

				result_msg = errCount + "개 행 에러 발생";

			}

		}
		params.clear();
		if (delList.size() > 0) {

			for (int i = 0, len = delList.size(); i < len; i++) {
				srCust = delList.get(i);

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("srCust", srCust);

				result = baseService.srCustAdd(params); // 1이면 성공 0이면 실패
				if (result == 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}
			if (delList.size() == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				result_msg = errCount + "개 행 에러 발생";
			}
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;
	}

	/*
	 * 마감일 - 빈페이지
	 */
	@RequestMapping(value = "/deadline-list")
	public String deadlineList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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

		Deadline deadline = new Deadline();

		result.put("deadline", deadline);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "base/deadline-list";

	}

	@RequestMapping(value = "/deadline-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> deadlineList(@RequestParam(defaultValue = "1") int page,
		@RequestParam(defaultValue = "10") int qty, Deadline deadline, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("deadline", deadline);
		i_param.put("comCode", comCode);
		i_param.put("userId", userId);

		List<Deadline> deadlineList = baseService.deadlineList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("deadlineList", deadlineList);
		result.put("deadline", deadline);

		model.addAllAttributes(result);

		return result;

	}
	//230808 매퍼에서 SP로 수정
/*
	@ResponseBody
	@RequestMapping(value = "/deadlineAdd", method = RequestMethod.POST)
	public HashMap<String, Object> deadlineAdd(@RequestBody Deadline deadlineSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<Deadline> uptList = deadlineSet.getDeadUpdateList();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Deadline deadline = null;

		int result = 0;

		int okCount = 0;
		int errCount = 0;
		String result_code = "";
		String result_msg = "";

		String iDead = deadlineSet.getInDead();
		String oDead = deadlineSet.getOutDead();
		String dDead = deadlineSet.getDepositDead();
		String wDead = deadlineSet.getWithdrawDead();

		params.clear();
		if (("").equals(iDead)) {
			iDead = null;
		}
		if (("").equals(oDead)) {
			oDead = null;
		}
		if (("").equals(dDead)) {
			dDead = null;
		}
		if (("").equals(wDead)) {
			wDead = null;
		}

		params.put("iDead", iDead);
		//System.out.println("iDead"+iDead);
		params.put("oDead", oDead);
		params.put("dDead", dDead);
		params.put("wDead", wDead);

		if (uptList.size() > 0) {
			for (int i = 0, len = uptList.size(); i < len; i++) {
				deadline = uptList.get(i);
				params.put("deadline", deadline);
			}
		}

		params.put("workingType", "UPT");
		params.put("comCode", comCode);
		params.put("userId", userId);

		result = baseService.deadlineAdd(params); // 1이면 성공 0이면 실패

		if (result == 1) {
			result_code = "OK";
			result_msg = "성공";
		} else if (result == -2){
			result_code = "Err";
			result_msg = "실패: 출금건이 존재하지 않습니다.";
		}else if (result == -4){
			result_code = "Err";
			result_msg = "실패: 이미 마감된 출금일자 입니다.";
		}else if (result == -5){
			result_code = "Err";
			result_msg = "실패: 출금삭제 오류코드 (1-1).";
		}else if (result == -5){
			result_code = "Err";
			result_msg = "실패: 출금삭제 오류코드 (1-2).";
		}else if (result == -7){
			result_code = "Err";
			result_msg = "실패: 출금삭제 오류코드 (2-1).";
		}else if (result == -8){
			result_code = "Err";
			result_msg = "실패: 출금삭제 오류코드 (2-2).";
		}else{
			result_code = "Err";
			result_msg = "실패";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;
	}
	*/
	
	@ResponseBody
	@RequestMapping(value = "/deadlineAdd", method = RequestMethod.POST)
	public HashMap<String, Object> deadlineAdd(@RequestBody Deadline deadlineSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Deadline o_deadline = null;

	
		params.put("workingType", "UPT");
		params.put("logComCode", comCode);
		params.put("logUserId", userId);
		params.put("deadline", deadlineSet);

		o_deadline = baseService.deadlineAdd(params);

		map.put("result_code", o_deadline.getDb_resultCode());
		map.put("result_msg", o_deadline.getDb_resultMsg());
		return map;
	}

	/*
	 * 입금관리 - 빈페이지
	 */
	@RequestMapping(value = "/deposit-list")
	public String depositList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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

		Deposit deposit = new Deposit();

		result.put("deposit", deposit);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd1", sYmd);
		result.put("eYmd1", eYmd);

		model.addAllAttributes(result);
		return "base/deposit-list";

	}

	@RequestMapping(value = "/deposit-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> depositList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Deposit deposit, String cdCode, String orderBy,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, String depositNo, String depositDead, String workingType ,Model model) {
		//System.out.println("chekc in" );
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		deposit.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType",workingType);
		i_param.put("deposit", deposit);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("depositNo", depositNo);
		i_param.put("cdCode", cdCode);
		i_param.put("orderBy", orderBy);
		i_param.put("comCode", comCode);
		i_param.put("depositDead", depositDead);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		
		//System.out.println("i_param" +i_param);


		List<Deposit> depositList = baseService.depositList(i_param); // 서비스 다오 매퍼 만져야함
		
		
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("depositList", depositList);
		result.put("deposit", deposit);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd1", sYmd);
		result.put("eYmd1", eYmd);
		result.put("depositDead", depositDead);

		model.addAllAttributes(result);

		return result;

	}

	@ResponseBody
	@RequestMapping(value = "/depositAdd", method = RequestMethod.POST)
	public HashMap<String, Object> depositAdd(@RequestBody Deposit depositSet , @RequestParam(defaultValue = "") String depositDead  ) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		String workingType = depositSet.getWorkingType();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Deposit deposit = null;

		int result = 0;

		String result_code = "";
		String result_msg = "";

		params.put("workingType", workingType);
		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("deposit", depositSet);

		result = baseService.depositAdd(params); // 1이면 성공 0이면 실패

		if (result == 1) {
			result_code = "OK";
			result_msg = "성공";
		} else if (result == -13) {
			result_code = "Err";
			result_msg = "실패, 이미 세금계산서가 발행되었습니다.";
		} else {
			result_code = "Err";
			result_msg = "실패";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		map.put("depositDead", depositDead);
		map.put("result",  result);
		return map;

	}
	
	/*기결건 삭제 메세지 추가 2023.07.12 bk*/
	@ResponseBody
	@RequestMapping(value = "/depositDel", method = RequestMethod.POST)
	public HashMap<String, Object> depositDel(@RequestBody Deposit depositSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		ArrayList<Deposit> delList = depositSet.getDepositRemoveList();

		Deposit deposit = null;

		int result = 0;

		String result_code = "";
		String result_msg = "";

		if (delList.size() > 0) {

			for (int i = 0, len = delList.size(); i < len; i++) {
				deposit = delList.get(i);

				if (("").equals(deposit.getConnectCdPay()) || deposit.getConnectCdPay() == null) {

					params.put("workingType", "DEL");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("deposit", deposit);

					result = baseService.depositDel(params);

				} else {
					result = -1;
				}

			}

		}

		if (result >= 1) {
			result_code = "OK";
			result_msg = "성공";
		} else if (result == -1) {
			result_code = "Err";
			result_msg = "실패, 관련된 카드대금이 입금되었습니다. 카드대금부터 삭제해주세요.";
		} else if (result == -2) {
			result_code = "Err";
			result_msg = "실패, 카드대금은 삭제하였으나 연관 물품대 삭제가 실패하였습니다.";
		}else if (result == -3) {
			result_code = "Err";
			result_msg = "실패, 이미 기결된 건이 존재합니다.";
		}else if (result == -13) {
			result_code = "Err";
			result_msg = "실패, 이미 세금계산서가 발행되었습니다.";
		} else {
			result_code = "Err";
			result_msg = "실패";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;

	}

	@ResponseBody
	@RequestMapping(value = "/depositCdPay", method = RequestMethod.POST)
	public HashMap<String, Object> depositCdPay(// Deposit depositSet,
			@RequestParam(defaultValue = "") String connectCdPay, String[] depositCheckList) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int result = 0;

		int okCount = 0;
		int errCount = 0;
		String result_code = "";
		String result_msg = "";

		String depositCdPay;

		params.clear();
		if (depositCheckList.length > 0) {
			for (int i = 0, len = depositCheckList.length; i < len; i++) {
				depositCdPay = depositCheckList[i];

				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("depositCdPay", depositCdPay);
				params.put("connectCdPay", connectCdPay);

				result = baseService.depositCdPayAdd(params); // 1이면 성공 0이면 실패
				if (result == 1) {
					okCount = okCount + 1;

				} else {
					errCount = errCount + 1;
				}

			}
			if (depositCheckList.length == okCount) {
				result_code = "OK";
				result_msg = "성공";

			} else {
				result_code = "Err";
				result_msg = errCount + "개 행 에러 발생";
			}

		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;
	}

	/*
	 * 입금등록팝업 - 빈페이지
	 */
	@RequestMapping(value = "/deposit-up")
	public String depositUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, String depositNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		

		
		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("depositNo", depositNo);

		
		model.addAllAttributes(result);

		return "base/deposit-up";

	}

	/*
	 * 입금관리 - 빈페이지
	 */
	@RequestMapping(value = "/withdraw-list")
	public String wdList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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

		Withdraw withdraw = new Withdraw();

		result.put("withdraw", withdraw);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "base/withdraw-list";

	}

	@RequestMapping(value = "/withdraw-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> withdrawList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd, String orderBy,
			@RequestParam(defaultValue = "") String eYmd, Withdraw withdraw,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		withdraw.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("withdraw", withdraw);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("sYmd", sYmd);
		i_param.put("eYmd", eYmd);
		i_param.put("orderBy", orderBy);
		i_param.put("comCode", comCode);
		
		
		List<Withdraw> withdrawList = baseService.withdrawList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("withdrawList", withdrawList);
		result.put("withdraw", withdraw);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return result;

	}

	/*
	 * 출금등록팝업 - 빈페이지
	 */
	@RequestMapping(value = "/withdraw-up")
	public String withdrawUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd, String wdNo, 
			@RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String wdReqNoArr, 
			@RequestParam(defaultValue = "") String custCode,
			@RequestParam(defaultValue = "") String custName,
			@RequestParam(defaultValue = "") String wdReqAmt2,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		

		
		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("wdNo", wdNo);
		result.put("wdReqNoArr", wdReqNoArr);
		result.put("custCode", custCode);
		result.put("custName", custName);
		result.put("wdReqAmt2", wdReqAmt2);

		
		model.addAllAttributes(result);

		return "base/withdraw-up";

	}

	@ResponseBody
	@RequestMapping(value = "/withdrawAdd", method = RequestMethod.POST)
	public HashMap<String, Object> withdrawAdd(@RequestBody Withdraw wdSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		String workingType = wdSet.getWorkingType();
		

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Withdraw withdraw = null;

		int result = 0;

		String result_code = "";
		String result_msg = "";

		params.put("workingType", workingType);
		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("withdraw", wdSet);
	
		
		

		result = baseService.withdrawAdd(params); // 1이면 성공 0이면 실패

		if (result >= 1) {
		    result_code = "OK";
		    result_msg = "성공";
		} else if (result >= -3 && result < 1) {
		    result_code = "Err";
		    result_msg = "실패";
		} else {
		    result_code = "Err";
		    result_msg = "출금일자는 이미 마감된 일자입니다.";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		map.put("result",  result);
		return map;

	}

	@ResponseBody
	@RequestMapping(value = "/withdrawDel", method = RequestMethod.POST)
	public HashMap<String, Object> withdrawDel(@RequestBody Withdraw wdSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		ArrayList<Withdraw> delList = wdSet.getWdRemoveList();

		Withdraw withdraw = null;

		int result = 0;

		String result_code = "";
		String result_msg = "";

		if (delList.size() > 0) {

			for (int i = 0, len = delList.size(); i < len; i++) {
				withdraw = delList.get(i);

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("withdraw", withdraw);
				//System.out.println("params"+params);

				result = baseService.withdrawDel(params);

			}

		}

		if (result >= 1) {
			result_code = "OK";
			result_msg = "성공";
		} else {
			result_code = "Err";
			result_msg = "실패";
		}

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;

	}

	/*
	 * 계좌거래내역
	 */
	@RequestMapping(value = "/account-history")
	public String accHistory(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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

		AccountHistory accHistory = new AccountHistory();

		result.put("accHistory", accHistory);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "base/account-history";

	}

	/*2023.07.12 bk comCode 추가 */
	@RequestMapping(value = "/accHisMaster", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> accHisList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, AccountHistory accountHistory,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		accountHistory.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("accountHistory", accountHistory);
		i_param.put("sYmd", sYmd);
		i_param.put("eYmd", eYmd);
		i_param.put("logComCode", comCode);
		i_param.put("userId", userId);

		List<AccountHistory> accHisList = baseService.accHisList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("accHisList", accHisList);
		result.put("accountHistory", accountHistory);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return result;

	}
	/*2023.07.12 bk comCode 추가 */
	@RequestMapping(value = "/accHisDetail", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> accHisList2(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, AccountHistory accountHistory,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		accountHistory.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("accountHistory", accountHistory);
		i_param.put("sYmd", sYmd);
		i_param.put("eYmd", eYmd);
		i_param.put("logComCode", comCode);
		i_param.put("userId", userId);

		List<AccountHistory> accHisList2 = baseService.accHisList2(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("accHisList2", accHisList2);
		result.put("accountHistory", accountHistory);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return result;

	}

	/*
	 * 세금계산서
	 * 
	 * 빈페이지
	 */
	@RequestMapping(value = "/taxBill-list")
	public String taxBillList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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

		TaxBill taxBill = new TaxBill();

		result.put("taxBill", taxBill);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "base/taxBill-list";

	}

	@RequestMapping(value = "/taxBill-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> taxBillList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, TaxBill taxBill, String taxBillNo,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		taxBill.setComCode(comCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("taxBill", taxBill);
		i_param.put("sYmd", sYmd);
		i_param.put("eYmd", eYmd);
		i_param.put("taxBillNo", taxBillNo);
		i_param.put("comCode", comCode);

		List<TaxBill> taxBillList = baseService.taxBillList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("taxBillList", taxBillList);
		result.put("taxBill", taxBill);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return result;

	}

	/*
	 * 세금계산서등록팝업 - 빈페이지
	 */
	@RequestMapping(value = "/taxBill-up")
	public String taxBillUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			String taxBillNo, String sumPrice, @RequestParam(defaultValue = "") String ymdIgnoreYN, 
			String clGroupId, String clType, String insure1CollAmt, String insure2CollAmt, String clAmt, 
			String insure1Code,String insure2Code,String custCode2,String expType, String clgArr, 
			 String summary,  String seq, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("taxBillNo", taxBillNo);
		result.put("clGroupId", clGroupId);
		result.put("clType", clType);
		result.put("insure1CollAmt", insure1CollAmt);
		result.put("insure1Code", insure1Code);
		result.put("insure2CollAmt", insure2CollAmt);
		result.put("insure2Code", insure2Code);
		result.put("clAmt", clAmt);
		result.put("custCode2", custCode2);
		result.put("expType", expType);
		result.put("clgArr", clgArr);
		result.put("summary", summary);
		result.put("seq", seq);
		
		//System.out.println("result : " + result);
		
		model.addAllAttributes(result);

		return "base/taxBill-up";

	}

	@ResponseBody
	@RequestMapping(value = "/taxBillAdd", method = RequestMethod.POST)
	public HashMap<String, Object> taxBillAdd(@RequestBody TaxBill taxBillSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		//int result = 0;
		TaxBill o_taxBill = new TaxBill();

		String result_code = "";
		String result_msg = "";

		String workingType = taxBillSet.getWorkingType(); // 여기
		params.clear();

		params.put("workingType", workingType);
		params.put("logComCode", comCode);
		params.put("logUserId", userId);
		params.put("taxBill", taxBillSet);

		o_taxBill = baseService.taxBillAdd(params);

		if (("OK").equals(o_taxBill.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_taxBill.getDb_resultCode());
			map.put("result_msg", o_taxBill.getDb_resultMsg());
		}

		return map;

	}

	@ResponseBody
	@RequestMapping(value = "/taxBillDel", method = RequestMethod.POST)
	public HashMap<String, Object> taxBillDel(@RequestBody TaxBill taxBillSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();
		String result_code = "";
		String result_msg = "";
		
		String workingType = taxBillSet.getWorkingType();
		String[] reqArr = taxBillSet.getReqArr();
		
		String taxBillNo = "";
		//int result = 0;
		TaxBill o_taxBill = new TaxBill();
		//System.out.println("workingType : " + workingType);
		for (int i = 0, len = reqArr.length; i < len; i++) {
			//System.out.println("reqArr : " + reqArr[i]);
			taxBillNo = reqArr[i];

			params.put("workingType", workingType);
			params.put("comCode", comCode);
			params.put("userId", userId);
			params.put("taxBillNo", taxBillNo);

			o_taxBill = baseService.taxBillAdd(params);

		}
		
		if (("OK").equals(o_taxBill.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_taxBill.getDb_resultCode());
			map.put("result_msg", o_taxBill.getDb_resultMsg());
		}

		return map;
		/*

		ArrayList<TaxBill> delList = taxBillSet.getTaxBillDelList();

		TaxBill taxBill = null;

		int result = 0;


		if (delList.size() > 0) {

			for (int i = 0, len = delList.size(); i < len; i++) {
				taxBill = delList.get(i);

				if (("").equals(taxBill.getAppStatusCode()) || taxBill.getAppStatusCode() == null) {

					params.put("workingType", "DEL");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("taxBill", taxBill);

					result = baseService.taxBillAdd(params);

				} else {
					result = -1;
				}
			}

		}

		if (result >= 1) {
			result_code = "OK";
			result_msg = "성공";
		} else if (result == -1) {
			result_code = "Err";
			result_msg = "실패, 전자세금계산서등록을 해지해주세요.";
		} else {
			result_code = "Err";
			result_msg = "실패";
		}
		*/

	}

	@RequestMapping(value = "/taxKey-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> taxKeyLsit(Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();

		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);

		List<KeyInfo> taxKeyLsit = baseService.taxKeyLsit(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("taxKeyLsit", taxKeyLsit);

		model.addAllAttributes(result);

		return result;

	}

	//////////////////////////////////////////////////////////////////////////////////////////////
	/*
	 * 공지사항 목록 - 빈페이지 bokyung 2023.01.26
	 */
	@RequestMapping(value = "/notice-list")
	public String noticeList(String srch, Model model) {
		
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("srch", srch);
		model.addAllAttributes(result);

		return "base/notice-list";
	}

	/*
	 * 공지사항 목록
	 */
	@RequestMapping(value = "/notice-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> noticeList(Notice i_notice, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		String workingType = "";
		workingType = i_notice.getWorkingType();
		
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("notice", i_notice);
		i_param.put("logComCode", comCode);
		i_param.put("logUserId", userId);
		

		List<Notice> noticeList = baseService.noticeList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("noticeList", noticeList);
		result.put("notice", i_notice);
		
		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 공지사항 뷰 빈페이지
	 */
	@RequestMapping(value = "/noticeView")
	public String noticeView(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd, int noticeNo,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		HashMap<String, Object> result = new HashMap<String, Object>();
		Notice notice = new Notice();
		
		result.put("notice", notice);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("noticeNo", noticeNo);
		
		model.addAllAttributes(result);
		return "base/noticeView";
	}

	/*
	 * 공지사항 업로드 빈페이지
	 */
	@RequestMapping(value = "/notice-up")
	public String noticeUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "0") int noticeNo, String srch,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();
		Notice notice = new Notice();
		
		result.put("notice", notice);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("noticeNo", noticeNo);
		result.put("srch", srch);
		

		model.addAllAttributes(result);
		return "base/notice-up";
	}

	/*
	 * 공지사항 등록
	 */

	@ResponseBody
	@RequestMapping(value = "/noticeAdd", method = RequestMethod.POST)
	public HashMap<String, Object> noticeAdd(@RequestBody Notice i_notice) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
	

		String workingType = i_notice.getWorkingType();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		Notice notice = null;

		int result = 0;

		String result_code = "";
		String result_msg = "";

		params.put("workingType", workingType);
		params.put("logComCode", comCode);
		params.put("logUserId", userId);
		params.put("notice", i_notice);
		Notice o_notice = baseService.noticeAdd(params); // 1이면 성공 0이면 실패

		result_code = o_notice.getDb_resultCode();
		result_msg = o_notice.getDb_resultMsg();
		/*
		 * if (result >= 1) { result_code = "OK"; result_msg = "성공"; } else {
		 * result_code = "Err"; result_msg = "실패"; }
		 */

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;

	}

	/*
	 * 2023.02.08. 보경님 . 비밀번호 변경
	 */
	@ResponseBody
	@RequestMapping(value = "/upw-change", method = RequestMethod.POST)
	public HashMap<String, Object> upwChange(HttpSession session, HttpServletResponse response, RedirectAttributes rttr,
			String redirect_target, @RequestParam(defaultValue = "") String uid,
			@RequestParam(defaultValue = "") String nowpwd, @RequestParam(defaultValue = "") String newpwd,
			Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		User i_user = new User();
		String result_code = "";
		String result_msg = "";

		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();

		// 1. 이전패스워드 체크
		String workingType = "SIGN_IN";
		params.put("workingType", workingType);
		params.put("logComCode", comCode);
		params.put("logUserId", userId);
		params.put("pwdEnc", SHA256Util.getSha256(nowpwd));
		params.put("logIP", CommonMethod.getUserIP());

		User o_user = memberService.userOne(params);
		
		
		

		// 2. 변경
		if (o_user != null) {
		
			i_user.setUserId(uid);
			i_user.setPwdEnc(SHA256Util.getSha256(newpwd));
			workingType = "RESET_PWD";
			params.put("workingType", workingType);
			params.put("logComCode", comCode);
			params.put("user", i_user);

		

			o_user = memberService.resetPw(params);
		
			result_code = o_user.getDb_resultCode();
			result_msg = "비밀번호를 변경하였습니다";
			map.put("result_code", result_code);
			map.put("result_msg", result_msg);

			if (("OK").equals(o_user.getDb_resultCode())) {
		
				// 성공
				rttr.addFlashAttribute("msg", "OK");
				return map;
			} else {
				// 실패
				
				rttr.addFlashAttribute("msg", "FAIL");
				return map;
			}
		} else {
			
			// rttr.addFlashAttribute("msg", "FAIL");
			result_code = "Err";
			result_msg = "현재 비밀번호가 정확하지 않습니다.";

			map.put("result_code", result_code);
			map.put("result_msg", result_msg);

			return map;
		}

	}

	/*
	 * 환율조회 - 빈페이지 0303 bokyung
	 */
	@RequestMapping(value = "/exchange-rate-list")
	public String exchangeRateList() {
		return "base/exchange-rate-list";

	}

	/*
	 * 환율조회 - 빈페이지 0303 bokyung
	 */
	@RequestMapping(value = "/exchange-rate-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> exRateList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, ExchangeRate i_exchangeRate,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ExchangeRate", i_exchangeRate);

		
		List<ExchangeRate> exRateList = baseService.exRateList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("exRateList", exRateList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		
		return result;

	}

	// 부품 센터가 엑셀 일괄등록
	@RequestMapping(value = "/item-up-xls", method = RequestMethod.GET)
	public String estiUpXls() {

		return "base/item-up-xls";
	}

	/*
	 * 2023.09.12 hsg - destFile명을 중복된것도 등록되게 처리
	 */
	@ResponseBody
	@RequestMapping(value = "/item-up-xls", method = RequestMethod.POST)
	public HashMap<String, Object> itemUpXls(ItemExcel itemExcel, MultipartHttpServletRequest request)
			throws Exception {
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		MultipartFile excelFile = request.getFile("batchFile");

		if (excelFile == null || excelFile.isEmpty()) {
			throw new RuntimeException("업로드 할 파일을 선택 해 주세요.");
		}

		// String targetFileName = "";
		// targetFileName = "_order__"+excelFile.getOriginalFilename();
		String fileRoot = uploadPath_root + "\\" + logComCode + "\\esti\\"; // "D:\\WebService\\fileUpload\\tellmenow\\tmg\\"+tmgIdx+"\\board\\";
																			// //저장될 외부 파일 경로
		File Folder = new File(fileRoot);
		if (!Folder.exists()) {
			try {
				Folder.mkdir();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		// File destFile = new
		// File(uploadPath_root+"/"+logComCode+"/esti/estiUp__"+excelFile.getOriginalFilename());
		//File destFile = new File(fileRoot + "/itemUp__" + excelFile.getOriginalFilename());
		String savedFileName_UI = UUID.randomUUID().toString();
		File destFile = new File(fileRoot + "/"+savedFileName_UI+"__" + excelFile.getOriginalFilename());

		try {
			excelFile.transferTo(destFile);

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}

		String extension = "";

		int i = excelFile.getOriginalFilename().lastIndexOf('.');
		if (i > 0) {
			extension = excelFile.getOriginalFilename().substring(i + 1);
		}

		HashMap<String, Object> params = new HashMap<String, Object>();
		// params.put("estiItem", estiItem);
		// params.put("targetFileName", targetFileName);

		HashMap<String, Object> result = null;
		if (("xlsx").equals(extension)) { // 엑셀로 등록한 경우
			result = baseService.itemAddExcel(itemExcel, destFile);
		}
		return result;

	}

	
	
	/*
	 * 환경설정 - 빈페이지
	 * 2023.04.27 hsg
	 */
	@RequestMapping(value = "/config")
	public String config( Model model) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		Config config = new Config();

		result.put("config", config);
		model.addAllAttributes(result);
		
		return "base/config";
	}

	@RequestMapping(value = "/config", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> config(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, Config i_config, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("config", i_config);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);

		Config configOne = baseService.configOne(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("configOne", configOne);
		result.put("config", i_config);

		model.addAllAttributes(result);
		
		

		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "/configAdd", method = RequestMethod.POST)
	public HashMap<String, Object> configAdd(Config i_config) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		String result_code = "";
		String result_msg = "";

		params.put("workingType", i_config.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("config", i_config);
		
		
		Config o_config = baseService.configAdd(params); // 1이면 성공 0이면 실패

		result_code = o_config.getDb_resultCode();
		result_msg = o_config.getDb_resultMsg();

		map.put("result_code", result_code);
		map.put("result_msg", result_msg);
		return map;
	}

	/*
	 *  바코드 출력 빈페이지
	 */
	@RequestMapping(value = "/rack-list-print")
	public String rackListPrint(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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


		model.addAllAttributes(result);
		return "base/rack-list-print";

	}
	
	/*
	 * 품번 출력 빈페이지
	 * 0522 bk
	 */
	@RequestMapping(value = "/item-list-print")
	public String itemListPrint(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,

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
		result.put("comCode", comCode);

		model.addAllAttributes(result);
		
		
		return "base/item-list-print";

	}
	
	/*
	 * 청구그룹 입금등록  - 빈페이지
	 * 2023.06.16 - 
	 * */
	@RequestMapping(value="/deposit-cl-up")
	public String depositClUp( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
		    @RequestParam(defaultValue="") String ymdIgnoreYN,  @RequestParam(defaultValue="") String jobArr,  
		    @RequestParam(defaultValue="") String carNo, @RequestParam(defaultValue="") String insure1Name, Model model){		
	
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("jobArr", jobArr);
		result.put("carNo", carNo);
		result.put("insure1Name", insure1Name);
	
		model.addAllAttributes(result);
		return "base/deposit-cl-up";
	}
	
	/*
	 *  공유재고 리스트 2023.06.08 hsg
	 */
	@RequestMapping(value = "/stock-share-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockShareList( StockShare i_stockShare, Model model) {
	
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockShare.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockShare", i_stockShare);
	
		List<StockShare> stockShareList = baseService.stockShareList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockShareList", stockShareList);
		result.put("stockShare", i_stockShare);
		//System.out.println("result:"+result);
		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 부품메모 등록 2023.06.23 bk
	 * 2023.07.06 hsg - 오류카운트 숫자 잘못되어 수정 addErr > 1 -> addErr > 0
	 */

	@RequestMapping(value = "/itemMemoAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> itemMemoAdd(@RequestBody ItemMemo itemMemo, Model model) {		
		//System.out.println("hi");
		String workingType = itemMemo.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		ItemMemo memo = null;

		ArrayList<ItemMemo> addList = itemMemo.getItemMemoAdd();// 추가 리스트 얻기
		ArrayList<ItemMemo> updateList = itemMemo.getItemMemoUpdate();// 수정 리스트 얻기
		ArrayList<ItemMemo> removeList = itemMemo.getItemMemoRemove(); // 제거 리스트 얻기

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("memo", itemMemo);

		ItemMemo o_itemMemo = new ItemMemo();
		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				memo = addList.get(i);
				memo.setItemId(itemMemo.getItemId());
				memo.setMemo(addList.get(i).getMemo());
				memo.setRegUserId(itemMemo.getRegUserId());
				memo.setRegYmd(itemMemo.getRegYmd());
				memo.setRegHms(itemMemo.getRegHms());
				memo.setUptUserId(itemMemo.getUptUserId());
				memo.setUptYmd(itemMemo.getUptYmd());
				memo.setUptHms(itemMemo.getUptHms());

				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("memo", memo);
			
				o_itemMemo = baseService.itemMemoAdd(params);
				if (!("OK").equals(o_itemMemo.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
				}
			}
		}
		params.clear();		
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				memo = updateList.get(i);
				memo.setItemId(itemMemo.getItemId());
				memo.setIdx(updateList.get(i).getIdx());
				memo.setMemo(updateList.get(i).getMemo());
				memo.setRegUserId(memo.getRegUserId());
				memo.setRegYmd(memo.getRegYmd());
				memo.setRegHms(memo.getRegHms());
				memo.setUptUserId(memo.getUptUserId());
				memo.setUptYmd(memo.getUptYmd());
				memo.setUptHms(memo.getUptHms());

				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("memo", memo);
				
				o_itemMemo = baseService.itemMemoAdd(params);

				if (!("OK").equals(o_itemMemo.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				memo = removeList.get(i);
				memo.setItemId(itemMemo.getItemId());
				memo.setMemo(memo.getMemo());
				memo.setRegUserId(memo.getRegUserId());
				memo.setRegYmd(memo.getRegYmd());
				memo.setRegHms(memo.getRegHms());
				memo.setUptUserId(memo.getUptUserId());
				memo.setUptYmd(memo.getUptYmd());
				memo.setUptHms(memo.getUptHms());
				memo.setIdx(memo.getIdx());

				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("memo", memo);
				o_itemMemo = baseService.itemMemoAdd(params);

				if (!("OK").equals(o_itemMemo.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					delErr = delErr + 1;
				}
			}
		}
		String msg = "";
		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				msg = "등록오류: " + addErr + "건";
			} else if (uptErr > 0) {
				msg = msg + " 수정오류: " + uptErr + "건";
			} else if (delErr > 0) {
				msg = msg + " 삭제 오류: " + delErr + "건";
			}
			msg = "처리 중 오류 발생했습니다 :: " + msg;
			map.put("result_code", "오류");
			map.put("result_msg", msg);
		} else {
			msg = "처리되었습니다.";
			map.put("result_code", "성공");
			map.put("result_msg", msg);
		}
		return map;
	}
	/*
	 * 부품메모 목록 2023.06.23 bk
	 */
	@RequestMapping(value = "/item-memo-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> itemMemoList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, ItemMemo i_itemMemo, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_itemMemo.setComCode(logComCode);

		String workingType = "";
		workingType = i_itemMemo.getWorkingType();

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("itemMemo", i_itemMemo);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);

		

		List<ItemMemo> itemMemoList = baseService.itemMemoList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("itemMemoList", itemMemoList);
		result.put("itemMemo", i_itemMemo);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 *2023.08.11 거래처 등록 수정 bk
	 *2024.02.02 supi - 판매가유형 속성추가로 매개변수 추가
	 * */
	@RequestMapping(value = "/custInfoAdd" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@ResponseBody
	public HashMap<String, Object> custInfoAdd(@RequestParam("attaFile") MultipartFile multipartFile,   MultipartHttpServletRequest requestFile,
			@RequestParam(defaultValue = "") String workingType,		@RequestParam(defaultValue = "") String custCode,		@RequestParam(defaultValue = "") String custName,
			@RequestParam(defaultValue = "") String formalName,		@RequestParam(defaultValue = "") String bizNo,		@RequestParam(defaultValue = "") String bzType,	
			@RequestParam(defaultValue = "") String bzItems,		@RequestParam(defaultValue = "") String custType,	@RequestParam(defaultValue = "") String ceoName,
			@RequestParam(defaultValue = "") String custAddress1,		@RequestParam(defaultValue = "") String custAddress2,		@RequestParam(defaultValue = "") String phone,
			@RequestParam(defaultValue = "") String fax,		@RequestParam(defaultValue = "") String taxType,
			@RequestParam(defaultValue = "") String cashType,		@RequestParam(defaultValue = "") String balanceDspType,
			@RequestParam(defaultValue = "") String payDay,		@RequestParam(defaultValue = "") String payType,
			@RequestParam(defaultValue = "") String accNum,		@RequestParam(defaultValue = "") String validYN,
			@RequestParam(defaultValue = "0") int releasePriceType,		@RequestParam(defaultValue = "0") int warehousePriceType,
			@RequestParam(defaultValue = "0") int marginRate,		@RequestParam(defaultValue = "0") int warehouseRate,
			@RequestParam(defaultValue = "0") int releaseLimit,		@RequestParam(defaultValue = "0") int depositLimitDay,
			@RequestParam(defaultValue = "") String memo,		@RequestParam(defaultValue = "") String admGroupCode,
			@RequestParam(defaultValue = "") String admEmpNo,		@RequestParam(defaultValue = "") String taxMobile,
			@RequestParam(defaultValue = "") String taxEmail,		@RequestParam(defaultValue = "") String outsideCode,
			@RequestParam(defaultValue = "") String placeYN,		@RequestParam(defaultValue = "") String centerYN,@RequestParam(defaultValue = "") String supplyYN,	
			@RequestParam(defaultValue = "") String mainCustCode,		@RequestParam(defaultValue = "") String linkTkKey,	@RequestParam(defaultValue = "") String paymentDay,

			@RequestParam(defaultValue = "") String addList,		@RequestParam(defaultValue = "") String updateList,
			@RequestParam(defaultValue = "") String removeList,		@RequestParam(defaultValue = "") String addList2,
			@RequestParam(defaultValue = "") String updateList2,		@RequestParam(defaultValue = "") String removeList2,
			@RequestParam(defaultValue = "") String salePriceType,  @RequestParam(defaultValue = "") String aos_inscd,  @RequestParam(defaultValue = "") String aos_insnm
			) {

		
		
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		 Cust custSet = new Cust();		
		 
		 custSet.setWorkingType(workingType);
		 custSet.setCustCode(custCode);
		 custSet.setCustName(custName);
		 custSet.setFormalName(formalName);
		 custSet.setBizNo(bizNo);
		 custSet.setBzType(bzType);
		 custSet.setBzItems(bzItems);
		 custSet.setCeoName(ceoName);
		 custSet.setCustAddress1(custAddress1);
		 custSet.setCustAddress2(custAddress2);
		 custSet.setPhone(phone);
		 custSet.setFax(fax);
		 custSet.setTaxType(taxType);
		 custSet.setCashType(cashType);
		 custSet.setBalanceDspType(balanceDspType);
		 custSet.setPayType(payType);
		 custSet.setAccNum(accNum);
		 custSet.setValidYN(validYN);
		 custSet.setReleasePriceType(releasePriceType);
		 custSet.setWarehouseRate(warehousePriceType);
		 custSet.setMarginRate(marginRate);
		 custSet.setWarehousePriceType(warehouseRate);
		 
		 custSet .setReleaseLimit(releaseLimit);
		 custSet .setDepositLimitDay(depositLimitDay);
		 custSet .setMemo(memo);
		 custSet .setAdmEmpNo(admEmpNo);
		 custSet .setAdmGroupCode(admGroupCode);
		 custSet .setTaxMobile(taxMobile);
		 custSet .setTaxEmail(taxEmail);
		 custSet .setOutsideCode(outsideCode);
		 custSet .setPlaceYN(placeYN);
		 custSet.setSupplyYN(supplyYN);
		 custSet.setCenterYN(centerYN);
		 custSet.setMainCustCode(mainCustCode);
		 custSet.setLinkTkKey(linkTkKey);
		 custSet.setCustType(custType);
		 custSet.setPaymentDay(paymentDay);
		 custSet.setSalePriceType(salePriceType);
		 custSet.setAos_inscd(aos_inscd);
		 custSet.setAos_insnm(aos_insnm);
		 			 
		List<MultipartFile> fileList = requestFile.getFiles("attaFile");
		

		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		int attachCnt = 0;
		int attErrCnt = 0;
		if (multipartFile.getSize() > 0) {
			attachCnt =fileList.size();
		}	
		//마스터 등록
		HashMap<String,Object> params = new HashMap<String, Object>();		
				
		params.put("workingType",workingType);
		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("cust",custSet);
		
		Cust o_cust = new Cust(); 
		o_cust = baseService.custAdd(params);		
				
		CustManager custManager = null;
		CustAdmin custAdmin = null;
		CustManager o_custManager = new CustManager();
		CustAdmin o_custAdmin = new CustAdmin();
		
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			
			if (!addList.isEmpty()) {
				ArrayList<CustManager> addListArr = objectMapper.readValue(addList, new TypeReference<ArrayList<CustManager>>() {});
				
				if (addListArr.size() > 0) {
					params.clear();
					for (int i = 0, len = addListArr.size(); i < len; i++) {
					
					
						custManager = addListArr.get(i);
						custManager.setCustCode(custSet.getCustCode());
						params.put("workingType", workingType);
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("custManager", custManager);
					

						o_custManager = baseService.custMgrAdd(params);

					}
				}
				
			}
			if (!updateList.isEmpty()) {
				ArrayList<CustManager> updateListArr = objectMapper.readValue(updateList, new TypeReference<ArrayList<CustManager>>() {});
				
				params.clear();
				if (updateListArr.size() > 0) {
					for (int i = 0, len = updateListArr.size(); i < len; i++) {
					
					
						custManager = updateListArr.get(i);
						custManager.setMgrIdx(Integer.parseInt(custManager.getIdx()));
						custManager.setCustCode(custSet.getCustCode());
						params.put("workingType", workingType);
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("custManager", custManager);
					
						o_custManager = baseService.custMgrAdd(params);
					}
				}
			}
			if (!removeList.isEmpty()) {
				ArrayList<CustManager> removeListArr = objectMapper.readValue(removeList, new TypeReference<ArrayList<CustManager>>() {});
				
				params.clear();
				if (removeListArr.size() > 0) {
					for (int i = 0, len = removeListArr.size(); i < len; i++) {
					
					
						custManager = removeListArr.get(i);
						custManager.setCustCode(custSet.getCustCode());
						params.put("workingType", "DEL");
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("custManager", custManager);
					
						o_custManager = baseService.custMgrAdd(params);
					}
				}
			}
			if (!addList2.isEmpty()) {
				ArrayList<CustAdmin> addListArr2 = objectMapper.readValue(addList2, new TypeReference<ArrayList<CustAdmin>>() {});
				
				params.clear();
				if (addListArr2.size() > 0) {
					for (int i = 0, len = addListArr2.size(); i < len; i++) {
						custAdmin = addListArr2.get(i);
						custAdmin.setCustCode(custSet.getCustCode());
						params.put("workingType", workingType);
						params.put("custAdmin", custAdmin);
						params.put("comCode", comCode);
						params.put("userId", userId);

						o_custAdmin = baseService.custAdmAdd(params);

					}
				}
			}
			if (!updateList2.isEmpty()) {
				ArrayList<CustAdmin> updateListArr2 = objectMapper.readValue(updateList2, new TypeReference<ArrayList<CustAdmin>>() {});
				
				params.clear();
				if (updateListArr2.size() > 0) {
					for (int i = 0, len = updateListArr2.size(); i < len; i++) {


						custAdmin = updateListArr2.get(i);
						custAdmin.setAdmIdx(Integer.parseInt(custAdmin.getIdx()));
						custAdmin.setCustCode(custSet.getCustCode());
						params.put("workingType", workingType);
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("custAdmin", custAdmin);

						o_custAdmin = baseService.custAdmAdd(params);
					}
				}
			}
			if (!removeList2.isEmpty()) {
				ArrayList<CustAdmin> removeListArr2 = objectMapper.readValue(removeList2, new TypeReference<ArrayList<CustAdmin>>() {});
				
				params.clear();
				if (removeListArr2.size() > 0) {
					for (int i = 0, len = removeListArr2.size(); i < len; i++) {
				
				
						custAdmin = removeListArr2.get(i);
						custAdmin.setCustCode(custSet.getCustCode());
						params.put("workingType", "DEL");
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("custAdmin", custAdmin);
				
						o_custAdmin = baseService.custAdmAdd(params);
					}
				}
			}
    

	    } catch (Exception e) {
	        e.printStackTrace();
	    }
		
		
		if (("OK").equals(o_cust.getDb_resultCode()) ) {
			
			if(attachCnt >0) {
				
				String[] savedFileNameList = new String[fileList.size()];
				String[] originalFileNameList = new String[fileList.size()];
				for (int i = 0, len = fileList.size(); i < len; i++) {
					
					String fileRoot = "D:\\WebService\\fileUpload\\panClub\\"+comCode+"\\cust\\";	//저장될 외부 파일 경로
					String fileRoot_thumb = "D:\\WebService\\fileUpload\\panClub\\"+comCode+"\\cust_thumb\\";	//저장될 외부 파일 경로
					
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
					map.put("result_code", "Err");
					map.put("result_msg", " 첨부파일 저장 오류");				
				}else {
					HashMap<String,Object> paramsAtt = new HashMap<String, Object>();
					for (int i = 0, len = fileList.size(); i < len; i++) {						
						paramsAtt.put("workingType", "ATT-ADD");
						paramsAtt.put("comCode",comCode);
						paramsAtt.put("userId",userId);
						paramsAtt.put("custCode2",o_cust.getCustCode());
						paramsAtt.put("savedFileName",savedFileNameList[i]);
						paramsAtt.put("originalFileName",originalFileNameList[i]);		
						Cust o_cust2 = new Cust(); 
						o_cust2 = baseService.custAdd(paramsAtt);
						if (("OK").equals(o_cust2.getDb_resultCode()) && attErrCnt ==0) {
						    map.put("result_code", "OK");
						    map.put("result_msg", "처리되었습니다.");
						}else if(("OK").equals(o_cust2.getDb_resultCode()) && attErrCnt >0) {
							map.put("result_code", "Err");
						    map.put("result_msg", "첨부파일은 저장하지 못했습니다.");
						}else {
							map.put("result_code", o_cust2.getDb_resultCode());
							map.put("result_msg", o_cust2.getDb_resultMsg());
						}  
					}
				}
				
			}	
		}	else {
			map.put("result_code", o_cust.getDb_resultCode());
			map.put("result_msg", o_cust.getDb_resultMsg());
		}
		
	
		return map;
	}
	
	/*
	 * 미수금목록  - 빈페이지
	 * 20231129 
	*/	
	@RequestMapping(value="/other-receivables-list")
	public String otherReceivablesList() {
		return "base/other-receivables-list";

	}
	
	
	/*
	 *  
	 * 기초코드중 수령물류센터 코드 받아오는 통신 20240228 sup
	 */
	@RequestMapping(value = "/logisCodeList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> logisCodeList() {
		
		String logComCode = (String) session.getAttribute("comCode");
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("logComCode", logComCode);
 
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("logisCodeList", baseService.logisCodeList(i_param)); 
	 
		return result;
	}
	
	

	/*
	 * 삭제-견적품목 - 빈페이지. 2024.06.14 hsg
	 */
	@RequestMapping(value = "/x-esti-item-list")
	public String xEstiItemList( @RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,  Model model) {
		
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
		return "base/x-esti-item-list";
	}
	
	/*
	    * 팝업등록
		* 2024.07.09 supi 
	*/
	@RequestMapping(value="/noticePopupReg")
	public String noticePopupReg( Model model){		
		
	 
		return "base/noticePopupReg";			
	}
	
	/*
	 *2240705 supi 팝업이미지 업로드용테스트 코드 => 폼으로 만들어서 보내면 되는듯
	 * */
	@RequestMapping(value = "/popupReg" , consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
	@ResponseBody
	public String popupReg(@RequestPart(value="attaFile") MultipartFile multipartFile, @RequestPart(value="data") HashMap<String, Object> data, MultipartHttpServletRequest requestFile   
			
			) {

		 
		
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		 			 
		List<MultipartFile> fileList = requestFile.getFiles("attaFile");
		
		
		String fileUUID = "";
		if(data.get("fileName") != "") //파일이 있을경우 업로드후 fileUUID변수에 업로드된 UUID이름 저장
		{
			String[] savedFileNameList = new String[fileList.size()];
			String[] originalFileNameList = new String[fileList.size()];
			for (int i = 0, len = fileList.size(); i < len; i++) {
						
				String fileRoot = "D:\\WebService\\fileUpload\\panClub\\"+comCode+"\\popupImg\\";	//저장될 외부 파일 경로
				String fileRoot_thumb = "D:\\WebService\\fileUpload\\panClub\\"+comCode+"\\popupImg_thumb\\";	//저장될 외부 파일 경로
				
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
						
					FileUtils.deleteQuietly(targetFile);	//저장된 파일 삭제
					e.printStackTrace();
				}
					
			}
			fileUUID = savedFileNameList[0];
		}
			
		data.put("fileUUID", fileUUID);
		data.put("comCode", comCode);
		data.put("userId", userId);
		
		return baseService.popupReg(data);
	}
	
	/*
	    * 팝업등록 조회 페이지
		* 2024.07.15 supi 
	*/
	@RequestMapping(value="/noticePopupList")
	public String noticePopupList( Model model){		
		
	 
		return "base/noticePopupList";			
	}
	/*
	 *2240715 supi 팝업 조회
	 * */
	@RequestMapping(value = "/popupList" , method = RequestMethod.POST)
	@ResponseBody
	public List<HashMap<String, Object>> popupList(@RequestParam HashMap<String, Object> i_params, Model model 
			) {
 
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		  
		i_params.put("comCode", comCode);
		i_params.put("userId", userId);
		
		if(!i_params.containsKey("popupIdx")) i_params.put("popupIdx", -1);
		if(!i_params.containsKey("menuUrl")) i_params.put("menuUrl", "");
		 
		return baseService.popupList(i_params);
	}
	
	/*
    부품등록대상 검색어  - 2024.08.02 hsg
	*/
	@RequestMapping(value="/item-up-stock-srch")
	public String stockSrchRnk(  Model model){		
		 
		return "base/item-up-stock-srch";
	}
	
	/*	     
	 */
	@RequestMapping(value="/item-up-stock-srch", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockSrchRnk(@RequestParam(defaultValue="") String serchItem,  String workingType, Model model)	{

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");		
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType",workingType);
		i_param.put("logComCode",logComCode);
		i_param.put("logUserId",logUserId);
		i_param.put("serchItem",serchItem);
	    
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("stockSrchRnk", statsService.stockSrchRnk(i_param));
		
		model.addAllAttributes(result);
		return result;		
	}
	
	/*
	 * 재고수동등록 처리	  2023.09.08 - 확인등록
	 */
	@RequestMapping(value = "/itemReg", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> itemReg(Item i_item, Model model) {	

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		Item o_item = new Item();

		params.put("workingType", i_item.getWorkingType());
		params.put("comCode", logComCode);
		params.put("userId", logUserId);
		params.put("item", i_item);

		//System.out.println("p:"+params);
		o_item = baseService.itemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_item.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_item.getDb_resultCode());
			map.put("result_msg", o_item.getDb_resultMsg());
		}

		return map;
	}
	
	
	/*
	 * 2024.09.11 supi 권한 관리 페이지
	 */
	@RequestMapping(value = "/permission-list")
	public String permissionListPage() {
		return "base/permission-list";

	}
	/*
	 * 2024.09.11 supi 권한 관리 페이지
	 */
	@RequestMapping(value = "/permission-list-system")
	public String permissionListSystemPage() {
		return "base/permission-list-system";
		
	}
	/*
	 * 2024.09.11 supi 권한 리스트
	 */
	@RequestMapping(value = "/permission-list" , method = RequestMethod.POST) 
	@ResponseBody
	public List<Permission> permissionList(@RequestParam String type , Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		  
		i_params.put("comCode", comCode);
		i_params.put("userId", userId);
		i_params.put("type", type);
		 
		return baseService.permissionList(i_params);
	}
	/*
	 *  2024.09.11 supi 권한 등록
	 */
	@RequestMapping(value = "/permission-add" , method = RequestMethod.POST ) 
	@ResponseBody
	public CommonResult permissionAdd(@RequestBody HashMap<String, Object>  i_params) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		  
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		
		return baseService.permissionAdd(i_params);
	}
 
	/*
	 * 2024.09.20 supi 권한 템플릿 리스트
	 */
	@RequestMapping(value = "/permission-template-list" , method = RequestMethod.POST) 
	@ResponseBody
	public List<PermissionTemplate> permissionTemplateList(Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode"); 
		  
		i_params.put("comCode", comCode); 
		
		return baseService.permissionTemplateList(i_params);
	}
	/*
	 * 2024.09.20 supi 권한 템플릿 디테일
	 */
	@RequestMapping(value = "/permission-template-detail" , method = RequestMethod.POST) 
	@ResponseBody
	public List<Permission> permissionTemplateDetail(@RequestParam int idx , Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode"); 
		
		i_params.put("comCode", comCode); 
		i_params.put("idx", idx); 
		
		return baseService.permissionTemplateDetail(i_params);
	}
	
	/*
	 *  2024.09.20 권한 템플릿 등록
	 */
	@RequestMapping(value = "/permission-template-add" , method = RequestMethod.POST ) 
	@ResponseBody
	public CommonResult permissionTemplateAdd(@RequestBody HashMap<String, Object>  i_params) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		  
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		
		return baseService.permissionTemplateAdd(i_params);
	}
	/*
	 *  2024.09.20 권한 업체 리스트
	 */
	@RequestMapping(value = "/permission-cust-list" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<C_cust> permissionCustList(@RequestParam int selectIndex, Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		i_params.put("selectIndex", selectIndex); 
		
		return baseService.permissionCustList(i_params);
	}
	/*
	 *  2024.09.23 supi 관리 업체 정보 
	 */
	@RequestMapping(value = "/getParentComInfo" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<C_cust> getParentComInfo(Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		
		return baseService.getParentComInfo(i_params);
	}
	/*
	 *  2024.09.23 supi 피 관리 업체 리스트
	 */
	@RequestMapping(value = "/getChildComInfoList" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<C_cust> getChildComInfoList(Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		
		return baseService.getChildComInfoList(i_params);
	}
	
 
	/*
	 * 2024.09.24 supi 권한업체정보 디테일
	 */
	@RequestMapping(value = "/permission-cust-detail" , method = RequestMethod.POST) 
	@ResponseBody
	public List<Permission> permissionCustDetail(@RequestParam String custCode , Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode"); 
		
		i_params.put("comCode", comCode); 
		i_params.put("custCode", custCode); 
		
		return baseService.permissionCustDetail(i_params);
	} 
	/*
	 *  2024.09.24 업체권한 설정
	 */
	@RequestMapping(value = "/permission-cust-add" , method = RequestMethod.POST ) 
	@ResponseBody
	public CommonResult permissionCustAdd(@RequestBody HashMap<String, Object>  i_params) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		  
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		
		return baseService.permissionCustAdd(i_params);
	}
	/*
	 *  2024.09.25 유저 권한설정에서 유저 리스트
	 */
	@RequestMapping(value = "/permission-user-list" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<User> permissionUserList(@RequestParam int selectIndex, Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		i_params.put("selectIndex", selectIndex); 
		return baseService.permissionUserList(i_params);
	}
	/*
	 *  2024.09.25 유저 권한설정에서 특정 유저가 가진 권한정보
	 */
	@RequestMapping(value = "/permission-user-detail" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<Permission> permissionUserDetail(@RequestParam String targetUserId ,Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode"); 
		
		i_params.put("comCode", comCode); 
		i_params.put("targetUserId", targetUserId); 
		
		return baseService.permissionUserDetail(i_params);
	}
	/*
	 *  2024.09.24 업체권한 설정
	 */
	@RequestMapping(value = "/permission-user-add" , method = RequestMethod.POST ) 
	@ResponseBody
	public CommonResult permissionUserAdd(@RequestBody HashMap<String, Object>  i_params) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		  
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		
		return baseService.permissionUserAdd(i_params);
	} 
	
	/*
	 *  2024.09.30 supi 현재 접속한 업체가 erpOperate업체인지 반환하는 통신
	 */
	@RequestMapping(value = "/isErpOperate" , method = RequestMethod.POST ) 
	@ResponseBody
	public boolean isErpOperate( Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId);  
		return baseService.isErpOperate(i_params);
	}
	/*
	 *  2024.09.30 supi 현재 접속한 업체가 erpOperate업체인지 반환하는 통신
	 */
	@RequestMapping(value = "/menuViewList" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<Permission> menuViewList(Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId);  
		return baseService.menuViewList(i_params);
	}
	/*
	 *  2024.09.30 supi 해당 유저의 권한 수정일을 가져오는 통신 메뉴내역 가져올때 이 값이 같으면 이전 통신에서 가져온 메뉴내역을 그대로 쓰기 위함임
	 */
	@RequestMapping(value = "/getPermissionModified" , method = RequestMethod.POST ) 
	@ResponseBody
	public Date getPermissionModified(Model model) {
		HashMap< String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId);   
		return baseService.getPermissionModified(i_params);
	}
	/*
	 *  2024.09.30 supi 숨김처리할 메뉴리스트 받는용도
	 */
	@RequestMapping(value = "/hiddenMenuCodeList" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<String> hiddenMenuCodeList(Model model) { 
		return baseService.hiddenMenuCodeList();
	}
	@RequestMapping(value = "/menuStructure")
	public String menuStructure() {
		return "base/menuStructure";

	} 
	/*
	 *  2024.09.30 supi 메뉴구조리스트
	 */
	@RequestMapping(value = "/menuStructureList" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<menuStructure> menuStructureList(Model model) { 
		return baseService.menuStructureList();
	} 
	/*
	 *  2024.10.04 supi 메뉴구조 cud
	 */
	@RequestMapping(value = "/menuStructureAdd" , method = RequestMethod.POST ) 
	@ResponseBody
	public CommonResult menuStructureAdd(@RequestBody HashMap<String, Object>  i_params) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		  
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		
		return baseService.menuStructureAdd(i_params);
	} 
	/*
	 *  2024.10.17 supi 버그기록용
	 */
	@RequestMapping(value = "/bugReport" , method = RequestMethod.POST ) 
	@ResponseBody
	public void bugReport(@RequestParam String title ,@RequestParam String content ) {
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("comCode", comCode);
		i_params.put("userId", userId); 
		i_params.put("title", title); 
		i_params.put("content", content); 
		i_params.put("reportUrl", request.getRequestURI());
		baseService.bugReport(i_params); 
	} 
}
