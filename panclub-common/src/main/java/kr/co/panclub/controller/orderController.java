package kr.co.panclub.controller;

import java.io.File;
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

import kr.co.panclub.model.Cl;
import kr.co.panclub.model.ClGroup;
import kr.co.panclub.model.ClGroupMemo;
import kr.co.panclub.model.ClItem;
import kr.co.panclub.model.ClReq;
import kr.co.panclub.model.ClReqItem;
import kr.co.panclub.model.CtReqItem;
import kr.co.panclub.model.Cust;
import kr.co.panclub.model.EstiExcel;
import kr.co.panclub.model.EstiImportCalc;
import kr.co.panclub.model.EstiStorageUse;
import kr.co.panclub.model.Estimate;
import kr.co.panclub.model.EstimateItem;
import kr.co.panclub.model.EstimateItemPlaceStock;
import kr.co.panclub.model.Insurance;
import kr.co.panclub.model.NoCl;
import kr.co.panclub.model.NoClItem;
import kr.co.panclub.model.Order;
import kr.co.panclub.model.OrderExcel;
import kr.co.panclub.model.OrderGroup;
import kr.co.panclub.model.OrderGroupItem;
import kr.co.panclub.model.OrderImportCalc;
import kr.co.panclub.model.OrderItem;
import kr.co.panclub.model.OrderItemPlaceStock;
import kr.co.panclub.model.OrderStorageUse;
import kr.co.panclub.model.Payment;
import kr.co.panclub.model.PcReq;
import kr.co.panclub.model.PcReqItem;
import kr.co.panclub.model.Place;
import kr.co.panclub.model.PlaceItem;
import kr.co.panclub.model.PlaceReq;
import kr.co.panclub.model.PlaceReqItem;
import kr.co.panclub.model.StorMvReq;
import kr.co.panclub.model.StorMvReqItem;
import kr.co.panclub.model.StorageUseReq;
import kr.co.panclub.model.StorageUseReqItem;
import kr.co.panclub.model.UptOrderCnt;
import kr.co.panclub.service.IBaseService;
import kr.co.panclub.service.IBizService;
import kr.co.panclub.service.IOrderService;

/*
 * 견적,주문,발주,청구 등 영업관련 메뉴
 * */
@Controller
@RequestMapping("/order/*")
public class orderController {

	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private IOrderService orderService;

	@Autowired
	private IBaseService baseService;

	@Autowired
	private IBizService bizService;

	@Resource(name = "uploadPath_root")
	private String uploadPath_root;

	/*
	 * 견적 : GET방식 2022.11.15 - 최초 견적등록 페이지 접근
	 * 2023.10.04 이동시 빈페이지로 열기위해 i_param 추가 bk 
	 */
	@RequestMapping(value = "/esti-up", method = RequestMethod.GET)
	public String estiUp(String redirect_target,String estiNo, Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("comCode", logComCode);
		i_params.put("userId", logUserId);
		i_params.put("estiNo", estiNo);
		
		model.addAllAttributes(i_params);
		
		return "order/esti-up";
	}

	/*
	 * 견적 : POST 2022.11.23 - 거래처목록에서 넘어오는 경우 상세내역 노출
	 */
	@RequestMapping(value = "/esti-up", method = RequestMethod.POST)
	public String estiUp(String redirect_target, Estimate i_esti, Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String logUserId = (String) session.getAttribute("userId");

		String estiNo = i_esti.getEstiNo();

		
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", logComCode);
		i_params.put("userId", logUserId);
		i_params.put("estiNo", estiNo);

		// [Cust custInfo = baseService.custOne(i_params);
		// i_params.put("cust",custInfo);

		model.addAllAttributes(i_params);

		return "order/esti-up";
	}

	/*
	 * 견적 등록
	 * 2023.07.06 hsg - 디테일 처리 시 오류발생하는 경우 문구 등 프로세스 추가
	 */
	@ResponseBody
	@RequestMapping(value = "/estiAdd", method = RequestMethod.POST)
	public HashMap<String, Object> estiAdd(@RequestBody Estimate estiSet) {

		
		String workingType = estiSet.getWorkingType();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		EstimateItem estiItem = null;

		ArrayList<EstimateItem> addList = estiSet.getEstiItemAdd(); // 추가 리스트 얻기
		ArrayList<EstimateItem> updateList = estiSet.getEstiItemUpdate(); // 수정 리스트 얻기
		ArrayList<EstimateItem> removeList = estiSet.getEstiItemRemove(); // 제거 리스트 얻기

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("estimate", estiSet);

		
		Estimate o_esti = new Estimate();
		o_esti = orderService.estiAdd(params);

		
		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		String msg = "";
		String errItem = "";
		
		if (("OK").equals(o_esti.getDb_resultCode())) {
			EstimateItem o_estiItem = new EstimateItem();

			// 거래처 담당자
			params.clear();
			if (addList.size() > 0) {
				// for(int i=addList.size()-1; i<addList.size() && i>=0; i--) {
				// estiItem.setEstiNo(o_esti.getEstiNo());
				for (int i = 0, len = addList.size(); i < len; i++) {
		
		
					estiItem = addList.get(i);
					estiItem.setEstiNo(o_esti.getEstiNo());
					params.put("workingType", "ADD");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("estimateItem", estiItem);
			

					o_estiItem = orderService.estiItemAdd(params);
					
					if (!("OK").equals(o_estiItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						addErr = addErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+estiItem.getItemNo() + " (" + o_estiItem.getDb_resultMsg()+")";
					}
				}
			}

			params.clear();
			if (updateList.size() > 0) {
				for (int i = 0, len = updateList.size(); i < len; i++) {
					estiItem = updateList.get(i);
					// estiItem.setEstiSeq(Integer.parseInt(estiItem.getEstiSeq()));
					estiItem.setEstiSeq(estiItem.getEstiSeq());
					estiItem.setEstiNo(estiSet.getEstiNo());
					params.put("workingType", "UPT");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("estimateItem", estiItem);
					o_estiItem = orderService.estiItemAdd(params);
					
					if (!("OK").equals(o_estiItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						uptErr = uptErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+estiItem.getItemNo() + " (" + o_estiItem.getDb_resultMsg()+")";
					}
					
				}
			}

			params.clear();
			if (removeList.size() > 0) {
				for (int i = 0, len = removeList.size(); i < len; i++) {
					estiItem = removeList.get(i);
					// estiItem.setEstiSeq(Integer.parseInt(estiItem.getEstiSeq()));
					estiItem.setEstiSeq(estiItem.getEstiSeq());
					estiItem.setEstiNo(estiSet.getEstiNo());
					params.put("workingType", "DEL");
					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("estimateItem", estiItem);
					o_estiItem = orderService.estiItemAdd(params);
					
					if (!("OK").equals(o_estiItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						delErr = delErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+estiItem.getItemNo() + " (" + o_estiItem.getDb_resultMsg()+")";
					}
				}
			}

			// 결과 만들기
			map.put("estiNo", o_esti.getEstiNo());
			//map.put("result_code", "OK");
			//map.put("result_msg", "처리되었습니다.");
			
			if (addErr > 0 || uptErr > 0 || delErr > 0) {
				if (addErr > 0) {
					//msg = "등록오류: " + addErr + "건";
					msg = "\n# 등록오류: " + addErr + "건" + " => "+errItem;
				} 
				if (uptErr > 0) {
					//msg = msg + " 수정오류: " + uptErr + "건";
					msg = msg+"\n# 수정오류: " + uptErr + "건" + " => "+errItem;
				} 
				if (delErr > 0) {
					//msg = msg + " 삭제 오류: " + delErr + "건";
					msg = msg+"\n# 삭제오류: " + delErr + "건" + " => "+errItem;
				}
				msg = "처리 중 오류 발생했습니다(아래 건 이외 처리완료)" + msg;
				map.put("result_code", "오류");
				map.put("result_msg", msg);
			} else {
				msg = "처리되었습니다.";
				map.put("result_code", "OK");
				map.put("result_msg", msg);
			}
			
		} else {
			map.put("estiNo", o_esti.getEstiNo());
			map.put("result_code", o_esti.getDb_resultCode());
			map.put("result_msg", o_esti.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */
		
		return map;
	}

	/*
	 * 견적 목록 - 빈페이지
	 */
	@RequestMapping(value = "/esti-list")
	public String estiList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		Estimate i_estimate = new Estimate();

		
		// model.addAttribute("orderList", orderList);
		result.put("estimate", i_estimate);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/esti-list";

	}

	/*
	 * 견적 목록
	 */
	@RequestMapping(value = "/esti-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> estiList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Estimate i_esti,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			Model model) {

		/*
		 * DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); Calendar cal =
		 * Calendar.getInstance(); if (("").equals(sYmd) || sYmd == null ){
		 * cal.setTime(new Date()); //cal.add(Calendar.MONTH, -1);
		 * cal.add(Calendar.MONTH, 0); sYmd = dateFormat.format(cal.getTime()); } if
		 * (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_esti.setComCode(logComCode);

		String workingType = "";
		workingType = i_esti.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("esti", i_esti);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);
		
		List<Estimate> estiList = orderService.estiList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("estiList", estiList);
		result.put("esti", i_esti);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 견적 품목 리스트
	 * * 2023.08.24 hsg - workingType이 'List'로 되어 있던것을 값이 없으면 'List'가 되게 처리. WORK_LIST가 추가되어(부품별업무현황에서 사용됨)
	 */
	@RequestMapping(value = "/esti-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> estiItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, EstimateItem i_estiItem,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
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

		String workingType = "";
		workingType = i_estiItem.getWorkingType();
		
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_estiItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		//i_param.put("workingType", "LIST");
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("estiItem", i_estiItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);

		
		List<EstimateItem> estiItemList = orderService.estiItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("estiItemList", estiItemList);
		result.put("estiItem", i_estiItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
		
		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문 : GET방식 2022.11.24 - 최초 페이지 접근
	 * 2023.08.23 bk pcYN/ pcReqNo 추가 
	 * 2023.10.04 bk orderNo 추가_새페이지 
	 */
	@RequestMapping(value = "/order-up", method = RequestMethod.GET)
	public String orderUp(String redirect_target, @RequestParam(defaultValue = "") String pcReqNo, @RequestParam(defaultValue = "") String pcYN,
			@RequestParam(defaultValue = "") String orderNo,@RequestParam(defaultValue = "") String reqSeqArr, Model model) {

		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("pcYN", pcYN);		
		i_params.put("pcReqNo", pcReqNo);
		i_params.put("orderNo", orderNo);
		i_params.put("reqSeqArr", reqSeqArr);
		
		model.addAllAttributes(i_params);
		return "order/order-up";
	}

	/*
	 * 주문 : POST 2022.11.24 - 목록에서 넘어오는 경우 상세내역 노출
	 */
	@RequestMapping(value = "/order-up", method = RequestMethod.POST)
	public String orderUp(String redirect_target, Order i_order, String seqArr, String pcReqNo,  Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String lgoUserId = (String) session.getAttribute("userId");

		String orderNo = i_order.getOrderNo();
		String estiNo = i_order.getEstiNo(); // 견적에서 넘어오는 경우

		
		
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", logComCode);
		i_params.put("userId", lgoUserId);
		i_params.put("orderNo", orderNo);
		i_params.put("estiNo", estiNo);
		i_params.put("seqArr", seqArr);
		
		i_params.put("pcReqNo", pcReqNo);

		// [Cust custInfo = baseService.custOne(i_params);
		// i_params.put("cust",custInfo);

		model.addAllAttributes(i_params);

		return "order/order-up";
	}

	/*
	 * 견적 : GET방식 2023.02.21 - 견적서 인쇄페이지 bokyungm
	 */
	@RequestMapping(value = "/esti-up-print", method = RequestMethod.GET)
	public String estiUpPrint(String redirect_target, Estimate i_esti, String memoYN, 
														   String printDcYN, String printNoYN, Model model) {

		/* 견적정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("esti", i_esti);

		

		Estimate o_esti = orderService.estiOne(i_param);

		/*
		 * //견적품목정보
		 */

		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		EstimateItem i_estiItem = new EstimateItem();
		i_estiItem.setEstiNo(i_esti.getEstiNo());
		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("estiItem", i_estiItem);

		/*
		 * * i_param.put("sYmd1", sYmd); i_param.put("eYmd1", eYmd);
		 * i_param.put("ymdIgnoreYN", ymdIgnoreYN); i_param.put("seqArr", seqArr)
		 */;

		

		List<EstimateItem> o_estiItemList = orderService.estiItemList(i_param2);
		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("esti", o_esti);
		o_params.put("estiItemList", o_estiItemList);

	
	

		HashMap<String, Object> i_param3 = new HashMap<String, Object>();

		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(logComCode);
		//System.out.println("logComCode"+logComCode);
		i_param3.put("workingType", "PAN_LIST");
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);

		//System.out.println("i_cust"+i_cust);
		List<Cust> o_custList = baseService.custList(i_param3);
	
	

	
		o_params.put("custList", o_custList);
	

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

		o_params.put("paymentList2", paymentList2);
		o_params.put("memoYN", memoYN);
		o_params.put("printDcYN", printDcYN);
		o_params.put("printNoYN", printNoYN);

		model.addAllAttributes(o_params);

	
	

		return "order/esti-up-print";
	}

	/*
	 * 주문 등록
	 * 2023.07.06 hsg - 오류카운트 추가
	 * 2023.07.14 bk - map에 넣어주는 orderNO 수정
	 */
	@ResponseBody
	@RequestMapping(value = "/orderAdd", method = RequestMethod.POST)
	public HashMap<String, Object> orderAdd(@RequestBody Order orderSet) {

	
		String workingType = orderSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		OrderItem orderItem = null;

		ArrayList<OrderItem> addList = orderSet.getOrderItemAdd(); // 추가 리스트 얻기
		ArrayList<OrderItem> updateList = orderSet.getOrderItemUpdate(); // 수정 리스트 얻기
		ArrayList<OrderItem> removeList = orderSet.getOrderItemRemove(); // 제거 리스트 얻기

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> checkParams = new HashMap<String, Object>(); // 저장전 중복 체크

		String result_code = "";
		String result_msg = "";
		int checkItem = 0;

		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("order", orderSet);
	
		Order o_order = new Order();

		for (int i = 0, len = addList.size(); i < len; i++) { // 주문등록중복체크
			orderItem = addList.get(i);
			if (("").equals(orderItem.getEstiNo()) || orderItem.getEstiNo() == null) {
				checkItem = 0;
				break;
			}

			checkParams.put("workingType", "LIST");
			checkParams.put("logComCode", logComCode);
			checkParams.put("orderItem", orderItem);
			checkParams.put("estiNo", orderItem.getEstiNo());
			checkParams.put("estiSeq", orderItem.getEstiSeq());

			checkItem = orderService.orderItemCheck(checkParams);
			if (checkItem == -1) {
				break;
			}
		}

		if (checkItem == 0) {
			o_order = orderService.orderAdd(params);
		} else {
			o_order.setDb_resultCode("Err1");
			o_order.setDb_resultMsg("이미 등록된 주문부품입니다.");
		}

		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		String msg = "";
		String errItem = "";
	
		if (("OK").equals(o_order.getDb_resultCode())) {
			OrderItem o_orderItem = new OrderItem();

			// 거래처 담당자
			params.clear();
			if (addList.size() > 0) {
				// for(int i=addList.size()-1; i<addList.size() && i>=0; i--) {
				// estiItem.setEstiNo(o_esti.getEstiNo());
				for (int i = 0, len = addList.size(); i < len; i++) {
	
					orderItem = addList.get(i);
					orderItem.setOrderGroupId(o_order.getOrderGroupId());
					orderItem.setOrderNo(o_order.getOrderNo());
					params.put("workingType", "ADD");
					params.put("logComCode", logComCode);
					params.put("logUserId", logUserId);
					params.put("orderItem", orderItem);
				
					o_orderItem = orderService.orderItemAdd(params);
					
					if (!("OK").equals(o_orderItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						addErr = addErr + 1;
						//errItem = o_orderItem.getDb_resultMsg() +" 품번:"+orderItem.getItemNo();
						//errItem = errItem + " " + o_orderItem.getDb_resultMsg() +" 품번: "+orderItem.getItemNo();
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+orderItem.getItemNo() + " (" + o_orderItem.getDb_resultMsg()+")";
						/*
						 * map.put("result_code", o_orderItem.getDb_resultCode()); map.put("result_msg",
						 * msg); return map;
						 */
					}					
				}
			}

			params.clear();
			if (updateList.size() > 0) {
				for (int i = 0, len = updateList.size(); i < len; i++) {
					orderItem = updateList.get(i);
					// estiItem.setEstiSeq(Integer.parseInt(estiItem.getEstiSeq()));
					orderItem.setOrderSeq(orderItem.getOrderSeq());
					orderItem.setOrderGroupId(orderSet.getOrderGroupId());
					orderItem.setOrderNo(orderSet.getOrderNo());
					params.put("workingType", "UPT");
					params.put("logComCode", logComCode);
					params.put("logUserId", logUserId);
					params.put("orderItem", orderItem);
					o_orderItem = orderService.orderItemAdd(params);
					
					if (!("OK").equals(o_orderItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						uptErr = uptErr + 1;
						//msg = o_orderItem.getDb_resultMsg() +" 품번:"+orderItem.getItemNo();
						//errItem = o_orderItem.getDb_resultMsg() +" 품번:"+orderItem.getItemNo();
						//errItem = errItem + "\n " + o_orderItem.getDb_resultMsg() +" 품번: "+orderItem.getItemNo();
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+orderItem.getItemNo() + " (" + o_orderItem.getDb_resultMsg()+")";
						
						//map.put("result_code", o_orderItem.getDb_resultCode());
						//map.put("result_msg", msg);
						//return map;						
					}
				}
			}

			params.clear();
			if (removeList.size() > 0) {
				for (int i = 0, len = removeList.size(); i < len; i++) {
					orderItem = removeList.get(i);
					// estiItem.setEstiSeq(Integer.parseInt(estiItem.getEstiSeq()));
					orderItem.setOrderSeq(orderItem.getOrderSeq());
					orderItem.setOrderNo(orderSet.getOrderNo());
					orderItem.setOrderGroupId(orderSet.getOrderGroupId());
					params.put("workingType", "DEL");
					params.put("logComCode", logComCode);
					params.put("logUserId", logUserId);
					params.put("orderItem", orderItem);
					o_orderItem = orderService.orderItemAdd(params);
					
					if (!("OK").equals(o_orderItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						delErr = delErr + 1;
						//errItem = errItem + " " + o_orderItem.getDb_resultMsg() +" 품번: "+orderItem.getItemNo();
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+orderItem.getItemNo() + " (" + o_orderItem.getDb_resultMsg()+")";
					}					
				}
			}

			// 결과 만들기
			/*
			map.put("orderNo", o_order.getOrderNo());
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
			*/
			//System.out.println("uptErr:"+uptErr);  
			map.put("orderNo", o_order.getOrderNo());
			if (addErr > 0 || uptErr > 0 || delErr > 0) {
				if (addErr > 0) {
					//msg = "등록오류: " + addErr + "건";
					msg = "\n# 등록오류: " + addErr + "건" + " => "+errItem;
				} 
				if (uptErr > 0) {
					//msg = msg + " 수정오류: " + uptErr + "건";
					msg = msg+"\n# 수정오류: " + uptErr + "건" + " => "+errItem;
				} 
				if (delErr > 0) {
					//msg = msg + " 삭제 오류: " + delErr + "건";
					msg = msg+"\n# 삭제오류: " + delErr + "건" + " => "+errItem;
				}
				msg = "처리 중 오류 발생했습니다(아래 건 이외 처리완료)" + msg;
				map.put("result_code", "오류");
				map.put("result_msg", msg);
			} else {

				msg = "처리되었습니다.";
				map.put("result_code", "OK");
				map.put("result_msg", msg);
			}
			
		} else {
			map.put("orderNo", o_order.getOrderNo());
			map.put("result_code", o_order.getDb_resultCode());
			map.put("result_msg", o_order.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 주문 목록 - 빈페이지
	 */
	@RequestMapping(value = "/order-list")
	public String orderList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		Order i_order = new Order();

		
		// model.addAttribute("orderList", orderList);
		result.put("order", i_order);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/order-list";
	}

	/*
	 * 주문 목록
	 */
	@RequestMapping(value = "/order-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Order i_order,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {
		
		/*
		 * DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); Calendar cal =
		 * Calendar.getInstance(); if (("").equals(sYmd) || sYmd == null ){
		 * cal.setTime(new Date()); //cal.add(Calendar.MONTH, -1);
		 * cal.add(Calendar.MONTH, 0); sYmd = dateFormat.format(cal.getTime()); } if
		 * (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_order.setComCode(logComCode);

		String workingType = "";
		workingType = i_order.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("order", i_order);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<Order> orderList = orderService.orderList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderList", orderList);
		result.put("order", i_order);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문 품목 리스트
	 * 2023.08.24 hsg - workingType이 'List'로 되어 있던것을 값이 없으면 'List'가 되게 처리. WORK_LIST가 추가되어(부품별업무현황에서 사용됨)
	 * 2024.04.16 hsg - priceDifferYN 센터가와 단가 상이 조회조건 추가
	 */
	@RequestMapping(value = "/order-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, OrderItem i_orderItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String priceDifferYN, Model model) {

		
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

		String workingType = "";
		workingType = i_orderItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_orderItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		//i_param.put("workingType", "LIST");
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderItem", i_orderItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("priceDifferYN", priceDifferYN);

		//System.out.println("i_param:"+i_param);
		List<OrderItem> orderItemList = orderService.orderItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderItemList", orderItemList);
		result.put("orderItem", i_orderItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("priceDifferYN", priceDifferYN);
		
		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문 : GET방식 2023.03.13 - 주문서 인쇄페이지 bokyungm
	 */
	@RequestMapping(value = "/order-up-print", method = RequestMethod.GET)
	public String orderUpPrint(String redirect_target, Order i_order, String memoYN,  String printDcYN, 
																String printNoYN,Model model) {

		/* 견적정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("order", i_order);

		

		Order o_order = orderService.orderOne(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("order", o_order);
		o_params.put("memoYN", memoYN);

		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		OrderItem i_orderItem = new OrderItem();

		i_orderItem.setOrderNo(i_order.getOrderNo());
		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("orderItem", i_orderItem);

		List<OrderItem> o_orderItemList = orderService.orderItemList(i_param2);

		o_params.put("o_orderItemList", o_orderItemList);

		HashMap<String, Object> i_param3 = new HashMap<String, Object>();
		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(logComCode);

		i_param3.put("workingType", "PAN_LIST");
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param3);
		
		HashMap<String, Object> i_param4 = new HashMap<String, Object>();
		Payment i_payment = new Payment();
		i_param4.put("workingType", "LIST");
		i_param4.put("payment", i_payment);
		i_param4.put("logComCode", logComCode);
		i_param4.put("logUserId", logUserId);

		List<Payment> paymentList = bizService.paymentList(i_param4);
		List<Payment> paymentList2 = new ArrayList();
	

		for (int i = 0, len = paymentList.size(); i < len; i++) {
			if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
					&& ("Y").equals(paymentList.get(i).getCommonDpYN())) {
				paymentList2.add(paymentList.get(i));

			}
		}
		

		o_params.put("custList", o_custList);
		o_params.put("printDcYN", printDcYN);
		o_params.put("printNoYN", printNoYN);
		o_params.put("paymentList2", paymentList2);

		model.addAllAttributes(o_params);

		
		return "order/order-up-print";
	}

	/*
	 * 재고 확인 - 빈페이지
	 */
	@RequestMapping(value = "/stock-check-up")
	public String stockCheckUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String estiNo,
			@RequestParam(defaultValue = "") String orderNo, @RequestParam(defaultValue = "") String seqArr,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();


		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("estiNo", estiNo);
		result.put("orderNo", orderNo);
		result.put("seqArr", seqArr);


		model.addAllAttributes(result);

		String landUrl = "order/stock-check-up";
		if (!("").equals(orderNo)) {
			landUrl = "order/order-stock-check-up";
		}

	
		// return landUrl "order/stock-check-up";
		return landUrl;

	}

	/*
	 * 견적 재고확인 등록 2023.02.17 - 임시저장 추가 tempAdd='Y' 인 경우는 저장만 하고 N 인 경우 견적에도 해당 내용 등록
	 * 처리
	 * 2023.07.06 hsg - 오류카운트 숫자 잘못되어 수정 addErr > 1 -> addErr > 0
	 */
	@ResponseBody
	@RequestMapping(value = "/stockCheckAdd", method = RequestMethod.POST)
	public HashMap<String, Object> stockCheckAdd(@RequestBody EstimateItemPlaceStock stockSet) {

	
	
	
		String workingType = stockSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		EstimateItemPlaceStock stock = null;

		ArrayList<EstimateItemPlaceStock> addList = stockSet.getEstiStockAdd(); // 추가 리스트 얻기
		ArrayList<EstimateItemPlaceStock> updateList = stockSet.getEstiStockUpdate(); // 수정 리스트 얻기
		ArrayList<EstimateItemPlaceStock> removeList = stockSet.getEstiStockRemove(); // 제거 리스트 얻기

	
	
	
		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stock", stockSet);

		String tempAdd = "";
		tempAdd = stockSet.getTempAdd(); // 임시저장 클릭한 경우
	

		EstimateItemPlaceStock o_stock = new EstimateItemPlaceStock();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				stock = addList.get(i);
				stock.setEstiNo(stockSet.getEstiNo());
				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("estiStock", stock);
				params.put("tempAdd", tempAdd);
				
				o_stock = orderService.estiItemPlaceStockAdd(params);

				if (!("OK").equals(o_stock.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				stock = updateList.get(i);
				stock.setEstiNo(stockSet.getEstiNo());
				stock.setEstiSeq(stock.getIdx());
			

				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("estiStock", stock);
				params.put("tempAdd", tempAdd);
			
				o_stock = orderService.estiItemPlaceStockAdd(params);

				if (!("OK").equals(o_stock.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				stock = removeList.get(i);
				stock.setEstiNo(stockSet.getEstiNo());
				// code.setmCode(codeSet.getmCode());
				// code.setmCodeName(codeSet.getmCodeName());
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("estiStock", stock);
				o_stock = orderService.estiItemPlaceStockAdd(params);

				if (!("OK").equals(o_stock.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
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
	 * 주문 재고확인 등록 2023.03.07 - 임시저장 추가 tempAdd='Y' 인 경우는 저장만 하고 N 인 경우 견적에도 해당 내용 등록
	 * 처리
	 * 2023.07.06 hsg - 오류카운트 숫자 잘못되어 수정 addErr > 1 -> addErr > 0
	 */
	@ResponseBody
	@RequestMapping(value = "/orderStockCheckAdd", method = RequestMethod.POST)
	public HashMap<String, Object> orderStockCheckAdd(@RequestBody OrderItemPlaceStock stockSet,
			@RequestParam(defaultValue = "") String seqArr) {

		
		String workingType = stockSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		OrderItemPlaceStock stock = null;

		ArrayList<OrderItemPlaceStock> addList = stockSet.getOrderStockAdd(); // 추가 리스트 얻기
		ArrayList<OrderItemPlaceStock> updateList = stockSet.getOrderStockUpdate(); // 수정 리스트 얻기
		ArrayList<OrderItemPlaceStock> removeList = stockSet.getOrderStockRemove(); // 제거 리스트 얻기

		
		
		
		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stock", stockSet);

		String tempAdd = "";
		tempAdd = stockSet.getTempAdd(); // 임시저장 클릭한 경우

		OrderItemPlaceStock o_stock = new OrderItemPlaceStock();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				stock = addList.get(i);
				stock.setOrderNo(stockSet.getOrderNo());
				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("orderStock", stock);
				params.put("tempAdd", tempAdd);
		
				o_stock = orderService.orderItemPlaceStockAdd(params);

				if (!("OK").equals(o_stock.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				stock = updateList.get(i);
				stock.setOrderNo(stockSet.getOrderNo());
				stock.setOrderSeq(stock.getIdx());
			

				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("orderStock", stock);
				params.put("tempAdd", tempAdd);
				
				o_stock = orderService.orderItemPlaceStockAdd(params);

				if (!("OK").equals(o_stock.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				stock = removeList.get(i);
				stock.setOrderNo(stockSet.getOrderNo());
				// code.setmCode(codeSet.getmCode());
				// code.setmCodeName(codeSet.getmCodeName());
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("orderStock", stock);
				o_stock = orderService.orderItemPlaceStockAdd(params);

				if (!("OK").equals(o_stock.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
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
	 * 견적 품목 재고확인 리스트
	 */
	@RequestMapping(value = "/stock-check-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockCheckItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, EstimateItemPlaceStock i_stock,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_stock.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockItem", i_stock);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);

	
		List<EstimateItemPlaceStock> stockItemList = orderService.estiStockItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("estiStockItemList", stockItemList);
		result.put("estiItemStock", i_stock);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문 품목 재고확인 리스트
	 */
	@RequestMapping(value = "/order-stock-check-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderStockCheckItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, OrderItemPlaceStock i_stock,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_stock.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockItem", i_stock);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);

		
		List<OrderItemPlaceStock> stockItemList = orderService.orderStockItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderStockItemList", stockItemList);
		result.put("estiItemStock", i_stock);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 수입계산기 목록 리스트
	 */
	@RequestMapping(value = "/import-calc-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> importCalcItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, EstiImportCalc i_calc,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_calc.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockItem", i_calc);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);


		List<EstiImportCalc> estiImportCalcList = orderService.estiImportCalcList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("estiImportCalcList", estiImportCalcList);
		result.put("estiImportCalc", i_calc);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);


		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문 수입계산기 목록 리스트
	 */
	@RequestMapping(value = "/order-import-calc-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderImportCalcItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, OrderImportCalc i_calc,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_calc.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockItem", i_calc);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);

	
		List<OrderImportCalc> orderImportCalcList = orderService.orderImportCalcList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderImportCalcList", orderImportCalcList);
		result.put("orderImportCalc", i_calc);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 수입계산기 등록
	 * 2023.07.06 hsg - 오류카운트 숫자 잘못되어 수정 addErr > 1 -> addErr > 0
	 */
	@ResponseBody
	@RequestMapping(value = "/importCalcAdd", method = RequestMethod.POST)
	public HashMap<String, Object> importCalcAdd(@RequestBody EstiImportCalc calcSet,
			@RequestParam(defaultValue = "") String seqArr) {


		String workingType = calcSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		EstiImportCalc calc = null;

		ArrayList<EstiImportCalc> addList = calcSet.getEstiImportAdd(); // 추가 리스트 얻기
		ArrayList<EstiImportCalc> updateList = calcSet.getEstiImportUpdate(); // 수정 리스트 얻기
		ArrayList<EstiImportCalc> removeList = calcSet.getEstiImportRemove(); // 제거 리스트 얻기




		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("calc", calcSet);

		EstiImportCalc o_calc = new EstiImportCalc();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				calc = addList.get(i);
				calc.setEstiNo(calcSet.getEstiNo());
				calc.setEuroBuy(calcSet.getEuroBuy());
				calc.setEuroSell(calcSet.getEuroSell());
				calc.setDollarBuy(calcSet.getDollarBuy());
				calc.setDollarSell(calcSet.getDollarSell());

				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("estiImportCalc", calc);
			
				o_calc = orderService.estiImportCalcAdd(params);

				if (!("OK").equals(o_calc.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				calc = updateList.get(i);
				calc.setEstiNo(calcSet.getEstiNo());
				calc.setEuroBuy(calcSet.getEuroBuy());
				calc.setEuroSell(calcSet.getEuroSell());
				calc.setDollarBuy(calcSet.getDollarBuy());
				calc.setDollarSell(calcSet.getDollarSell());

				calc.setEstiSeq(calc.getIdx());
			

				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("estiImportCalc", calc);
			
				o_calc = orderService.estiImportCalcAdd(params);

				if (!("OK").equals(o_calc.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				calc = removeList.get(i);
				calc.setEstiNo(calcSet.getEstiNo());
				calc.setEuroBuy(calcSet.getEuroBuy());
				calc.setEuroSell(calcSet.getEuroSell());
				calc.setDollarBuy(calcSet.getDollarBuy());
				calc.setDollarSell(calcSet.getDollarSell());

				// code.setmCode(codeSet.getmCode());
				// code.setmCodeName(codeSet.getmCodeName());
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("estiImportCalc", calc);
				o_calc = orderService.estiImportCalcAdd(params);

				if (!("OK").equals(o_calc.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
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
	 * 주문 수입계산기 등록
	 * 2023.07.06 hsg - 오류카운트 숫자 잘못되어 수정 addErr > 1 -> addErr > 0
	 */
	@ResponseBody
	@RequestMapping(value = "/orderImportCalcAdd", method = RequestMethod.POST)
	public HashMap<String, Object> orderImportCalcAdd(@RequestBody OrderImportCalc calcSet,
			@RequestParam(defaultValue = "") String seqArr) {


		String workingType = calcSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		OrderImportCalc calc = null;

		ArrayList<OrderImportCalc> addList = calcSet.getOrderImportAdd(); // 추가 리스트 얻기
		ArrayList<OrderImportCalc> updateList = calcSet.getOrderImportUpdate(); // 수정 리스트 얻기
		ArrayList<OrderImportCalc> removeList = calcSet.getOrderImportRemove(); // 제거 리스트 얻기




		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("calc", calcSet);

		OrderImportCalc o_calc = new OrderImportCalc();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				calc = addList.get(i);
				calc.setOrderNo(calcSet.getOrderNo());
				calc.setEuroBuy(calcSet.getEuroBuy());
				calc.setEuroSell(calcSet.getEuroSell());
				calc.setDollarBuy(calcSet.getDollarBuy());
				calc.setDollarSell(calcSet.getDollarSell());

				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("orderImportCalc", calc);
			
				o_calc = orderService.orderImportCalcAdd(params);

				if (!("OK").equals(o_calc.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				calc = updateList.get(i);
				calc.setOrderNo(calcSet.getOrderNo());
				calc.setEuroBuy(calcSet.getEuroBuy());
				calc.setEuroSell(calcSet.getEuroSell());
				calc.setDollarBuy(calcSet.getDollarBuy());
				calc.setDollarSell(calcSet.getDollarSell());

				calc.setOrderSeq(calc.getIdx());
				

				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("orderImportCalc", calc);
				
				o_calc = orderService.orderImportCalcAdd(params);

				if (!("OK").equals(o_calc.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				calc = removeList.get(i);
				calc.setOrderNo(calcSet.getOrderNo());
				calc.setEuroBuy(calcSet.getEuroBuy());
				calc.setEuroSell(calcSet.getEuroSell());
				calc.setDollarBuy(calcSet.getDollarBuy());
				calc.setDollarSell(calcSet.getDollarSell());

				// code.setmCode(codeSet.getmCode());
				// code.setmCodeName(codeSet.getmCodeName());
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("orderImportCalc", calc);
				o_calc = orderService.orderImportCalcAdd(params);

				if (!("OK").equals(o_calc.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
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
	 * 주문 그릅 목록 - 빈페이지
	 */
	@RequestMapping(value = "/order-group-list")
	public String orderGroupList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		OrderGroup i_orderGroup = new OrderGroup();

	
		// model.addAttribute("orderList", orderList);
		result.put("orderGroup", i_orderGroup);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/order-group-list";

	}

	/*
	 * 주문 그룹 목록
	 */
	@RequestMapping(value = "/order-group-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderGroupList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, OrderGroup i_orderGroup,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

	
		/*
		 * DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); Calendar cal =
		 * Calendar.getInstance(); if (("").equals(sYmd) || sYmd == null ){
		 * cal.setTime(new Date()); //cal.add(Calendar.MONTH, -1);
		 * cal.add(Calendar.MONTH, 0); sYmd = dateFormat.format(cal.getTime()); } if
		 * (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_orderGroup.setComCode(logComCode);

		String workingType = "";
		workingType = i_orderGroup.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroup", i_orderGroup);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
	
		List<OrderGroup> orderGroupList = orderService.orderGroupList(i_param);
	

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupList", orderGroupList);
		// result.put("orderGroup", i_orderGroup);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문그룹 : POST 2022.12.05 - 목록에서 넘어오는 경우 상세내역 노출
	 */
	@RequestMapping(value = "/order-group-item-list")
	public String orderGroupItemList(String redirect_target, OrderGroup i_orderGroup, String ordArr, String seqArr,
			Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String lgoUserId = (String) session.getAttribute("userId");

		String orderGroupId = i_orderGroup.getOrderGroupId();



		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", logComCode);
		i_params.put("userId", lgoUserId);
		i_params.put("orderGroupId", orderGroupId);
		i_params.put("ordArr", ordArr);
		i_params.put("seqArr", seqArr);

		// [Cust custInfo = baseService.custOne(i_params);
		// i_params.put("cust",custInfo);

		model.addAllAttributes(i_params);

		return "order/order-group-item-list";
	}

	/*
	 * 주문그룹 품목 리스트
	 */
	@RequestMapping(value = "/orderGroupItemList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderGroupItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		// Cust i_cust = new Cust();
		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);

	
		List<OrderGroupItem> orderGroupItemList = orderService.orderGroupItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		

		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 주문 품목 상세 - 빈페이지
	 */
	@RequestMapping(value = "/order-item-detail-list")
	public String orderItemDetailList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		OrderGroup i_orderGroup = new OrderGroup();

	
		// model.addAttribute("orderList", orderList);
		result.put("orderGroup", i_orderGroup);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/order-item-detail-list";

	}
	
	/*
	 * 주문 품목 상세
	 */
	@RequestMapping(value = "/order-item-detail-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderItemDetailList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, OrderGroup i_orderGroup,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

	
		/*
		 * DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); Calendar cal =
		 * Calendar.getInstance(); if (("").equals(sYmd) || sYmd == null ){
		 * cal.setTime(new Date()); //cal.add(Calendar.MONTH, -1);
		 * cal.add(Calendar.MONTH, 0); sYmd = dateFormat.format(cal.getTime()); } if
		 * (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_orderGroup.setComCode(logComCode);

		String workingType = "";
		workingType = i_orderGroup.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroup", i_orderGroup);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
	
		List<OrderGroup> orderGroupList = orderService.orderGroupList(i_param);
	

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupList", orderGroupList);
		// result.put("orderGroup", i_orderGroup);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
	

		model.addAllAttributes(result);
		return result;
	}


	/*
	 * 발주요청 - 빈페이지
	 */
	@RequestMapping(value = "/place-req-up")
	public String placeReqUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		
		model.addAllAttributes(result);
		return "order/place-req-up";

	}

	/*
	 * 발주요청등록 등록
	 * 2023.07.17 hsg - 로그인한 업체의 데이터인지 체크 후 리턴
	 */
	@RequestMapping(value = "/placeReqAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> placeReqAdd(PlaceReq reqSet, PlaceReqItem reqItemSet, @RequestParam(defaultValue = "") String dataComCode ,Model model) {

		String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if	(!(dataComCode).equals(logComCode) || ("").equals(dataComCode) ) { 
		    HashMap<String, Object> logoutMap = new HashMap<String, Object>();	 
		    logoutMap.put("result_code", "DCErr");
		    logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
		    return logoutMap; 
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();

		PlaceReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("placeReq", reqSet);

		PlaceReq o_placeReq = new PlaceReq();
		o_placeReq = orderService.placeReqAdd(params);

		if (("OK").equals(o_placeReq.getDb_resultCode())) {
			PlaceReqItem o_placeReqItem = new PlaceReqItem();

			reqItemSet.setPlaceReqNo(o_placeReq.getPlaceReqNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("reqItem", reqItemSet);
		

			o_placeReqItem = orderService.placeReqItemAdd(params);
			

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_placeReqItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_placeReqItem.getDb_resultCode());
				map.put("result_msg", o_placeReqItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_placeReq.getDb_resultCode());
			map.put("result_msg", o_placeReq.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 발주요청상세 : POST 2022.12.07
	 * 2023.08.03 hsg - ymdIgnoreYN, orderGroupId 추가. 주문품목에서 발주요청수량 클릭하면 해당 내역 찾기 위한 용도
	 */
	@RequestMapping(value = "/place-req-item-list")
	public String placeReqItemList( @RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,  Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupId", orderGroupId);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		
		model.addAllAttributes(result);
		
		return "order/place-req-item-list";
	}

	/*
	 * 발주요청 상세 목록
	 */
	@RequestMapping(value = "/place-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> placeReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String chkN, String chkY, String chkP, String chkF,
			PlaceReqItem i_placeReqItem, @RequestParam(defaultValue = "") String ymdIgnoreYN, 
			@RequestParam(defaultValue = "") String chk, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_placeReqItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_placeReqItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("placeReqItem", i_placeReqItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		//i_param.put("chkN", chkN);
		//i_param.put("chkY", chkY);
		//i_param.put("chkP", chkP);
		//i_param.put("chkF", chkF);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("chk", chk);
	
		List<PlaceReqItem> placeReqItemList = orderService.placeReqItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("placeReqItemList", placeReqItemList);
		result.put("placeReqItem", i_placeReqItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 재고요청 품목 수정 2022.12.09 - 확인등ㄹ록
	 */
	@RequestMapping(value = "/placeReqItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> placeReqItemAdd(PlaceReqItem reqItemSet, Model model) {

	

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		PlaceReqItem o_placeReqItem = new PlaceReqItem();

		params.put("workingType", reqItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("reqItem", reqItemSet);

		o_placeReqItem = orderService.placeReqItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_placeReqItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_placeReqItem.getDb_resultCode());
			map.put("result_msg", o_placeReqItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 발주 : GET방식 2022.12.08 - 최초 페이지 접근
	 */
	@RequestMapping(value = "/place-up", method = RequestMethod.GET)
	public String placeUp(String redirect_target, Model model, String placeNo) {

		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");
		i_params.put("placeNo", placeNo);
		model.addAllAttributes(i_params);
		
		return "order/place-up";
	}

	/*
	 * 발주 : POST 2022.12.08 - 목록에서 넘어오는 경우 상세내역 노출
	 */
	@RequestMapping(value = "/place-up", method = RequestMethod.POST)
	public String placeUp(String redirect_target, Place i_place, String reqArr, String seqArr, String orderArr, String orderSeqArr, Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String lgoUserId = (String) session.getAttribute("userId");

		String placeNo = i_place.getPlaceNo();
		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", logComCode);
		i_params.put("userId", lgoUserId);
		i_params.put("reqArr", reqArr);
		i_params.put("seqArr", seqArr);
		i_params.put("orderArr", orderArr);
		i_params.put("orderSeqArr", orderSeqArr);
		i_params.put("placeNo", placeNo);

		model.addAllAttributes(i_params);

		return "order/place-up";
	}

	/*
	 * 발주 등록
	 * 2023.07.06 hsg - 디테일 처리 시 오류발생하는 경우 문구 등 프로세스 추가
	 */
	@ResponseBody
	@RequestMapping(value = "/placeAdd", method = RequestMethod.POST)
	public HashMap<String, Object> placeAdd(@RequestBody Place placeSet) {
		
		String workingType = placeSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		/*
		String dataComCode = "";
		dataComCode =placeSet.getDataComCode();
		if (dataComCode == null) {
			dataComCode = "";
		}
		
		//if	(!(placeSet.getDataComCode()).equals(logComCode) || ("").equals(placeSet.getDataComCode()) ) { 
		if	(!(dataComCode).equals(logComCode) && !("").equals(dataComCode) ) {
		    HashMap<String, Object> logoutMap = new HashMap<String, Object>();	 
		    logoutMap.put("result_code", "DCErr");
		    logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
		    return logoutMap; 
		}	
		*/		
		PlaceItem placeItem = null;
		PlaceReqItem i_placeReqItem = new PlaceReqItem();

		ArrayList<PlaceItem> addList = placeSet.getPlaceItemAdd(); // 추가 리스트 얻기
		ArrayList<PlaceItem> updateList = placeSet.getPlaceItemUpdate(); // 수정 리스트 얻기
		ArrayList<PlaceItem> removeList = placeSet.getPlaceItemRemove(); // 제거 리스트 얻기

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> checkParams = new HashMap<String, Object>();
		int checkItem = 0;

		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("place", placeSet);
		
		//System.out.println("placeSet" +placeSet);

		Place o_place = new Place();
		

		for (int i = 0, len = addList.size(); i < len; i++) { // 발주등록 동시에 발주요청취소시 유효성 체크
			i_placeReqItem.setWorkingType("LIST");
			i_placeReqItem.setPlaceReqNo(addList.get(i).getPlaceReqNo());
			i_placeReqItem.setReqSeq(addList.get(i).getReqSeq());
			
			//System.out.println("i_placeReqItem : " + i_placeReqItem);
			
			checkParams.put("workingType", "LIST");
			checkParams.put("logComCode", logComCode);
			checkParams.put("placeReqItem", i_placeReqItem);
			
			if(addList.get(i).getPlaceReqNo() != null) {
				checkItem = orderService.placeItemCheck(checkParams);
			}
			

			if (checkItem == -1) {
				break;
			}
		}

		if (checkItem == 0) {
			o_place = orderService.placeAdd(params);
		} else {
			o_place.setDb_resultCode("Err1");
			o_place.setDb_resultMsg("발주요청이 취소된 부품입니다.");
		}

		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		String msg = "";
		String errItem = "";
		
		if (("OK").equals(o_place.getDb_resultCode()) && !("DEL").equals(workingType)) {
			PlaceItem o_placeItem = new PlaceItem();

			// 거래처 담당자
			params.clear();
			if (addList.size() > 0) {
				// for(int i=addList.size()-1; i<addList.size() && i>=0; i--) {
				// estiItem.setEstiNo(o_esti.getEstiNo());
				for (int i = 0, len = addList.size(); i < len; i++) {
			
			
					placeItem = addList.get(i);
					placeItem.setPlaceNo(o_place.getPlaceNo());
					params.put("workingType", "ADD");
					params.put("logComCode", logComCode);
					params.put("logUserId", logUserId);
					params.put("placeItem", placeItem);
					o_placeItem = orderService.placeItemAdd(params);
					
					if (!("OK").equals(o_placeItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						addErr = addErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+placeItem.getItemNo() + " (" + o_placeItem.getDb_resultMsg()+")";
					}					
				}
			}

			params.clear();
			if (updateList.size() > 0) {
				for (int i = 0, len = updateList.size(); i < len; i++) {
					placeItem = updateList.get(i);
					// estiItem.setEstiSeq(Integer.parseInt(estiItem.getEstiSeq()));
					placeItem.setPlaceSeq(placeItem.getPlaceSeq());
					placeItem.setPlaceNo(placeSet.getPlaceNo());
					params.put("workingType", "UPT");
					params.put("logComCode", logComCode);
					params.put("logUserId", logUserId);
					params.put("placeItem", placeItem);
					o_placeItem = orderService.placeItemAdd(params);
					
					if (!("OK").equals(o_placeItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						uptErr = uptErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+placeItem.getItemNo() + " (" + o_placeItem.getDb_resultMsg()+")";
					}					
				}
			}

			params.clear();
			if (removeList.size() > 0) {
				for (int i = 0, len = removeList.size(); i < len; i++) {
					placeItem = removeList.get(i);
					// estiItem.setEstiSeq(Integer.parseInt(estiItem.getEstiSeq()));
					placeItem.setPlaceSeq(placeItem.getPlaceSeq());
					placeItem.setPlaceNo(placeSet.getPlaceNo());

					params.put("workingType", "DEL");
					params.put("logComCode", logComCode);
					params.put("logUserId", logUserId);
					params.put("placeItem", placeItem);
					o_placeItem = orderService.placeItemAdd(params);
					
					if (!("OK").equals(o_placeItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						delErr = delErr + 1;
						//errItem = errItem + " " + o_orderItem.getDb_resultMsg() +" 품번: "+orderItem.getItemNo();
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+placeItem.getItemNo() + " (" + o_placeItem.getDb_resultMsg()+")";
					}					
				}
			}

			// 결과 만들기
			map.put("placeNo", o_place.getPlaceNo());
			//map.put("result_code", "OK");
			//map.put("result_msg", "처리되었습니다.");
			if (addErr > 0 || uptErr > 0 || delErr > 0) {
				if (addErr > 0) {
					//msg = "등록오류: " + addErr + "건";
					msg = "\n# 등록오류: " + addErr + "건" + " => "+errItem;
				} 
				if (uptErr > 0) {
					//msg = msg + " 수정오류: " + uptErr + "건";
					msg = msg+"\n# 수정오류: " + uptErr + "건" + " => "+errItem;
				} 
				if (delErr > 0) {
					//msg = msg + " 삭제 오류: " + delErr + "건";
					msg = msg+"\n# 삭제오류: " + delErr + "건" + " => "+errItem;
				}
				msg = "처리 중 오류 발생했습니다(아래 건 이외 처리완료)" + msg;
				map.put("result_code", "오류");
				map.put("result_msg", msg);
			} else {

				msg = "처리되었습니다.";
				map.put("result_code", "OK");
				map.put("result_msg", msg);
			}
		} else {
			map.put("result_code", o_place.getDb_resultCode());
			map.put("result_msg", o_place.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */
		
		return map;
	}

	/*
	 * 발주 목록 - 빈페이지
	 */
	@RequestMapping(value = "/place-list")
	public String placeList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue="") String orderGroupId, Model model) {

		
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

		Place i_place = new Place();

		
		// model.addAttribute("orderList", orderList);
		result.put("place", i_place);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);

		model.addAllAttributes(result);
		return "order/place-list";

	}

	/*
	 * 발주 목록
	 */
	@RequestMapping(value = "/place-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> placeList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Place i_place,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		/*
		 * DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); Calendar cal =
		 * Calendar.getInstance(); if (("").equals(sYmd) || sYmd == null ){
		 * cal.setTime(new Date()); //cal.add(Calendar.MONTH, -1);
		 * cal.add(Calendar.MONTH, 0); sYmd = dateFormat.format(cal.getTime()); } if
		 * (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_place.setComCode(logComCode);

		String workingType = "";
		workingType = i_place.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("place", i_place);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<Place> placeList = orderService.placeList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("placeList", placeList);
		result.put("place", i_place);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		//System.out.println("result"+result);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 창고사용요청 - 빈페이지 2022.12.15 - storageUseReqNo 파라미터 추가. 요청내역에서 상세 클릭한 경우
	 */
	@RequestMapping(value = "/storage-use-req-up")
	public String storageUseReqUp(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String orderGroupId, @RequestParam(defaultValue = "") String ordArr,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String storageUseReqNo,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("storageUseReqNo", storageUseReqNo);

		model.addAllAttributes(result);
		return "order/storage-use-req-up";
	}

	/*
	 * 창고사용 요청등록 등록
	 */
	@RequestMapping(value = "/storageUseReqAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storageUseReqAdd(StorageUseReq reqSet, StorageUseReqItem reqItemSet, Model model) {

	
		

		String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("storageUseReq", reqSet);

		
		StorageUseReq o_storageUseReq = new StorageUseReq();
		o_storageUseReq = orderService.storageUseReqAdd(params);

		

		if (("OK").equals(o_storageUseReq.getDb_resultCode())) {
			StorageUseReqItem o_storageUseReqItem = new StorageUseReqItem();

			reqItemSet.setStorageUseReqNo(o_storageUseReq.getStorageUseReqNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("reqItem", reqItemSet);

			

			o_storageUseReqItem = orderService.storageUseReqItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_storageUseReqItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_storageUseReqItem.getDb_resultCode());
				map.put("result_msg", o_storageUseReqItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_storageUseReq.getDb_resultCode());
			map.put("result_msg", o_storageUseReq.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 견적 창고수량 확인 팝업 리스팅
	 */
	@RequestMapping(value = "/stock-chk-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockChkList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, EstiStorageUse i_store,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_store.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("storeItem", i_store);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);

	
		List<EstiStorageUse> estiStorageUseList = orderService.estiStorageUseList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("estiStorageUseList", estiStorageUseList);
		result.put("estiStorageUse", i_store);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문 창고수량 확인 팝업 리스팅
	 */
	@RequestMapping(value = "/order-stock-chk-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderStockChkList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, OrderStorageUse i_store,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ordArr,
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

		// Cust i_cust = new Cust();
		i_store.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("storeItem", i_store);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);
		i_param.put("ordArr", ordArr);

	 
		List<OrderStorageUse> orderStorageUseList = orderService.orderStorageUseList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderStorageUseList", orderStorageUseList);
		result.put("orderStorageUse", i_store);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
		result.put("ordArr", ordArr);
		 

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 견적 창고수량 확인 등록
	 */
	@RequestMapping(value = "/stockChkAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockChkAdd(@RequestBody EstiStorageUse storageSet) {

		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		EstiStorageUse o_estiStorageUse = new EstiStorageUse();

		params.put("workingType", storageSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("estiStorageUse", storageSet);

		o_estiStorageUse = orderService.estiStorageUseAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_estiStorageUse.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_estiStorageUse.getDb_resultCode());
			map.put("result_msg", o_estiStorageUse.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 주문 창고수량 확인 등록
	 */
	@RequestMapping(value = "/orderStockChkAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderStockChkAdd(@RequestBody OrderStorageUse storageSet) {

		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		OrderStorageUse o_orderStorageUse = new OrderStorageUse();

		params.put("workingType", storageSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("orderStorageUse", storageSet);

		o_orderStorageUse = orderService.orderStorageUseAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_orderStorageUse.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_orderStorageUse.getDb_resultCode());
			map.put("result_msg", o_orderStorageUse.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 이동요청 - 빈페이지 2022.12.19 -
	 */
	@RequestMapping(value = "/stor-mv-req-up")
	public String storMvReqUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String reqNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("reqNo", reqNo);

		model.addAllAttributes(result);
		return "order/stor-mv-req-up";
	}

	/*
	 * 이동요청 등록 - 2022.12.19
	 */
	@RequestMapping(value = "/storMvReqAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storMvReqAdd(StorMvReq reqSet, StorMvReqItem reqItemSet, Model model) {

		
		

		String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("req", reqSet);

		
		StorMvReq o_req = new StorMvReq();
		o_req = orderService.storMvReqAdd(params);

		

		if (("OK").equals(o_req.getDb_resultCode())) {
			StorMvReqItem o_reqItem = new StorMvReqItem();

			reqItemSet.setReqNo(o_req.getReqNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("reqItem", reqItemSet);

		

			o_reqItem = orderService.storMvReqItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_reqItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_reqItem.getDb_resultCode());
				map.put("result_msg", o_reqItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_req.getDb_resultCode());
			map.put("result_msg", o_req.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 발주 품목 수정 2022.12.23 - 매입확정 등록
	 */
	@RequestMapping(value = "/placeItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> placeItemAdd(PlaceItem placeItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		PlaceItem o_placeItem = new PlaceItem();

		params.put("workingType", placeItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("placeItem", placeItemSet);

		o_placeItem = orderService.placeItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_placeItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_placeItem.getDb_resultCode());
			map.put("result_msg", o_placeItem.getDb_resultMsg());
		}

		return map;
	}

	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////

	/*
	 * 청구요청 - 빈페이지 2023.01.03 -
	 */
	@RequestMapping(value = "/cl-req-up")
	public String clReqUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String clReqNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("clReqNo", clReqNo);

		model.addAllAttributes(result);
		return "order/cl-req-up";
	}

	/*
	 * 청구 요청등록 등록 2023.04.25 hsg - reqItem 에 clGroupId 파라미터 전달추가
	 * 2023.07.14 hsg - 로그인한 업체의 데이터인지 체크 후 리턴	
	 */
	@RequestMapping(value = "/clReqAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clReqAdd(ClReq reqSet, ClReqItem reqItemSet, @RequestParam(defaultValue = "") String dataComCode , Model model) {

		String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if (!(dataComCode).equals(logComCode) || ("").equals(dataComCode) ) {
		  HashMap<String, Object> logoutMap = new HashMap<String, Object>();
		  logoutMap.put("result_code", "DCErr"); 
		  logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다."); 
		  return  logoutMap; 
		 }
		 
		HashMap<String, Object> map = new HashMap<String, Object>();

		//StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		
		params.put("workingType", workingType);																		
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("req", reqSet);
	
		ClReq o_clReq = new ClReq();
		o_clReq = orderService.clReqAdd(params);

		if (("OK").equals(o_clReq.getDb_resultCode()) && !("CHK").equals(workingType)
				&& !("CHK_CANCEL").equals(workingType)) { // 청구진행중처리는 디테일 처리하면 안되서...
			ClReqItem o_clReqItem = new ClReqItem();

			reqItemSet.setClGroupId(o_clReq.getClGroupId());
			reqItemSet.setClReqNo(o_clReq.getClReqNo());

			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("reqItem", reqItemSet);

			

			o_clReqItem = orderService.clReqItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_clReqItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
				map.put("clReqNo", o_clReq.getClReqNo());
				map.put("clGroupId", o_clReq.getClGroupId());
			} else {
				map.put("result_code", o_clReqItem.getDb_resultCode());
				map.put("result_msg", o_clReqItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_clReq.getDb_resultCode());
			map.put("result_msg", o_clReq.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 청구요청마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/cl-req-list")
	public String clReqList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId , Model model) {

		
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
		result.put("orderGroupId", orderGroupId);

		model.addAllAttributes(result);
		return "order/cl-req-list";

	}

	/*
	 * 청구요청마스터 목록
	 * 2023.07.10 clDateType 추가 --청구일/요청일/생성일 구분 조회
	 * 2023.07.25 clStatus 청구여부 추가 
	 */
	@RequestMapping(value = "/cl-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, ClReq i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String clDateType, 
			@RequestParam(defaultValue = "") String clStatus,
			Model model) {

	
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_req.setComCode(logComCode);

		String workingType = "";
		workingType = i_req.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("req", i_req);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("clDateType", clDateType);
		i_param.put("clStatus", clStatus);
		
		List<ClReq> reqList = orderService.clReqList(i_param);

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
	 * 청구요청상세 - 빈페이지 2023.01.04
	 */
	@RequestMapping(value = "/cl-req-item-list")
	public String clReqItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String clReqNo, @RequestParam(defaultValue = "") String clGroupId,
			Model model) {

		

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("clReqNo", clReqNo);
		result.put("clGroupId", clGroupId);

		model.addAllAttributes(result);
		return "order/cl-req-item-list";
	}

	/*
	 * 청구요청 상세 목록
	 */
	@RequestMapping(value = "/cl-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, ClReqItem i_reqItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_reqItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_reqItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("reqItem", i_reqItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
	
		List<ClReqItem> reqItemList = orderService.clReqItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("reqItemList", reqItemList);
		result.put("reqItem", i_reqItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
	

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 청구그룹 수정
	 * 2023.04.26 yoonsang
	 * 2023.07.06 hsg - 디테일 처리 시 오류발생하는 경우 문구 등 프로세스 추가
	 * 2023.07.20 hsg - 로그인 데이터 체크
	 * 2023.07.21 hsg - dataComCode clReq에서 가져오는것으로 변경
	*/
	@RequestMapping(value = "/clGroupAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clGroupAdd(@RequestBody ClReq clReqSet  ,  Model model) {
		
		String workingType = clReqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		//System.out.println("getcomCode:"+clReqSet.getDataComCode());
		if	(!(clReqSet.getDataComCode()).equals(logComCode) || ("").equals(clReqSet.getDataComCode()) ) { 
		    HashMap<String, Object> logoutMap = new HashMap<String, Object>();	 
		    logoutMap.put("result_code", "DCErr");
		    logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
		    return logoutMap; 
		}		
		
		String clType = clReqSet.getClType();
		String ins1DcLC = clReqSet.getIns1DcLC();
		String ins1DcWS = clReqSet.getIns1DcWS();
		String ins2DcLC = clReqSet.getIns2DcLC();
		String ins2DcWS = clReqSet.getIns2DcWS();
		
		ArrayList<ClReqItem> addList = clReqSet.getClReqItemAdd(); // 추가 리스트 얻기
		ArrayList<ClReqItem> updateList = clReqSet.getClReqItemUpdate(); // 수정 리스트 얻기
		ArrayList<ClReqItem> removeList = clReqSet.getClReqItemRemove(); // 제거 리스트 얻기
		//ArrayList<ClReqItem> allList = clReqSet.getClReqItemAll(); // 전체리스트얻기
		HashMap<String, Object> map = new HashMap<String, Object>();	    

		//청구그룹 수정
		HashMap<String,Object> params = new HashMap<String, Object>();		
   	    //custSet.setCustCode(comCode);	
		params.put("workingType",workingType);
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		params.put("req",clReqSet);
		
		
		//ClGroup o_clGroup = new ClGroup(); 
		//o_clGroup = orderService.clGroupAdd(params);
		
		ClReq o_clReq = new ClReq(); 
		o_clReq = orderService.clReqAdd(params);
		
		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		String msg = "";
		String errItem = "";
		
		if (("OK").equals(o_clReq.getDb_resultCode())) {
			ClReqItem clReqItemSet = new ClReqItem();
			ClReqItem o_clReqItem = new ClReqItem();
			
			clReqItemSet.setClReqNo(o_clReq.getClReqNo());
			params.clear();
			/*
			if (allList.size()>0) {
				
				for(int i=0, len=allList.size(); i<len; i++) {
				
					clReqItemSet = allList.get(i);
					clReqItemSet.setClGroupId(o_clReq.getClGroupId());
					clReqItemSet.setClReqNo(clReqSet.getClReqNo());
					
					params.put("workingType", "UPT");
					params.put("logComCode",logComCode);
					params.put("logUserId",logUserId);
					params.put("reqItem", clReqItemSet);
					
					o_clReqItem = orderService.clReqItemAdd(params);
				
				}
			}
			params.clear();
			*/
			String clReqNoNew = "";
			if (addList.size() > 0 ) {
				for(int i=0, len=addList.size(); i<len; i++) {
					
					clReqItemSet = addList.get(i);
					clReqItemSet.setClGroupId(o_clReq.getClGroupId());
					clReqItemSet.setClReqNo(clReqSet.getClReqNo());
					clReqItemSet.setClType(clType);
					clReqItemSet.setIns1DcLC(ins1DcLC);
					clReqItemSet.setIns1DcWS(ins1DcWS);
					clReqItemSet.setIns2DcLC(ins2DcLC);
					clReqItemSet.setIns2DcWS(ins2DcWS);
					
					params.put("workingType", "ADD2");
					params.put("logComCode",logComCode);
					params.put("logUserId",logUserId);					
					params.put("reqItem", clReqItemSet);
					
					o_clReqItem = orderService.clReqItemAdd(params);
					
					if (!("OK").equals(o_clReqItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						addErr = addErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+clReqItemSet.getItemNo() + " (" + o_clReqItem.getDb_resultMsg()+")";
					}					
					
					clReqNoNew = o_clReqItem.getClReqNo();				
					
				}
			}
			params.clear();
			if (updateList.size()>0) {
				for(int i=0, len=updateList.size(); i<len; i++) {
				
					clReqItemSet = updateList.get(i);
					clReqItemSet.setClGroupId(o_clReq.getClGroupId());
					//clReqItemSet.setClReqNo(clReqSet.getClReqNo());
				
					
					params.put("workingType", "UPT");
					params.put("logComCode",logComCode);
					params.put("logUserId",logUserId);
					params.put("reqItem", clReqItemSet);
					o_clReqItem = orderService.clReqItemAdd(params);

					if (!("OK").equals(o_clReqItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						uptErr = uptErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+clReqItemSet.getItemNo() + " (" + o_clReqItem.getDb_resultMsg()+")";												
					}
					
				}
			}
			params.clear();
			if (removeList.size() > 0 ) {
				for(int i=0, len=removeList.size(); i<len; i++) {
					
					clReqItemSet = addList.get(i);
					clReqItemSet.setClGroupId(o_clReq.getClGroupId());
					clReqItemSet.setClReqNo(clReqSet.getClReqNo());
					
					params.put("workingType", "DEL");
					params.put("logComCode",logComCode);
					params.put("logUserId",logUserId);
					params.put("reqItem", clReqItemSet);
					
					o_clReqItem = orderService.clReqItemAdd(params);
					if (!("OK").equals(o_clReqItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						delErr = delErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+clReqItemSet.getItemNo() + " (" + o_clReqItem.getDb_resultMsg()+")";
					}								
				}
			}
			
			
			
			if (addErr > 0 || uptErr > 0 || delErr > 0) {
				if (addErr > 0) {
					//msg = "등록오류: " + addErr + "건";
					msg = "\n# 등록오류: " + addErr + "건" + " => "+errItem;
				} 
				if (uptErr > 0) {
					//msg = msg + " 수정오류: " + uptErr + "건";
					msg = msg+"\n# 수정오류: " + uptErr + "건" + " => "+errItem;
				} 
				if (delErr > 0) {
					//msg = msg + " 삭제 오류: " + delErr + "건";
					msg = msg+"\n# 삭제오류: " + delErr + "건" + " => "+errItem;
				}
				msg = "처리 중 오류 발생했습니다(아래 건 이외 처리완료)" + msg;
				map.put("result_code", "오류");
				map.put("result_msg", msg);
			} else {

			    map.put("result_code", "OK");
			    map.put("result_msg", "처리되었습니다.");
			    map.put("clReqNoNew", clReqNoNew);
			}
			

			// 결과 만들기
			//map.put("orderNo", o_order.getOrderNo());
			/*
			if (("OK").equals(o_clReqItem.getDb_resultCode()) || o_clReqItem.getDb_resultCode() == null) {
			    map.put("result_code", "OK");
			    map.put("result_msg", "처리되었습니다.");
			    map.put("clReqNoNew", clReqNoNew);
			}else {
				map.put("result_code", o_clReqItem.getDb_resultCode());
				map.put("result_msg", o_clReqItem.getDb_resultMsg());
			} 
			*/   
		}else {
			map.put("result_code", o_clReq.getDb_resultCode());
			map.put("result_msg", o_clReq.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 청구 기결 : 청구 등록 2023.01.04
	 */
	@RequestMapping(value = "/clAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clAdd(Cl clSet, ClItem clItemSet, Model model) {

		String workingType = clSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("cl", clSet);

		
		Cl o_cl = new Cl();
		o_cl = orderService.clAdd(params);

		

		if (("OK").equals(o_cl.getDb_resultCode()) && !("DEL").equals(workingType)) {
			ClItem o_clItem = new ClItem();

			clItemSet.setClNo(o_cl.getClNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("clItem", clItemSet);

			

			o_clItem = orderService.clItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_clItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_clItem.getDb_resultCode());
				map.put("result_msg", o_clItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_cl.getDb_resultCode());
			map.put("result_msg", o_cl.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}
	
	/*
	 * 청구내역마스터 목록
	 * */
	@RequestMapping(value="/cl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			Cl i_cl,   @RequestParam(defaultValue="") String ymdIgnoreYN,   Model model){		
		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_cl.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_cl.getWorkingType();
		//
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("cl", i_cl);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<Cl> clList = orderService.clList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("clList", clList);
		result.put("cl", i_cl);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		
		model.addAllAttributes(result);
		return result;		
	}	

	/*
	 * 청구그룹마스터 목록 - 빈페이지
	 * 2023.05.03 bk
	 */
	@RequestMapping(value = "/cl-group-list")
	public String clGroupList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,			@RequestParam(defaultValue = "") String ymdIgnoreYN,@RequestParam(defaultValue="") String orderGroupId,  Model model) {


		
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
		result.put("orderGroupId", orderGroupId);
		
		model.addAllAttributes(result);
		return "order/cl-group-list";

	}

	/*
	 * 청구내역마스터 목록
	 * 
	 * @RequestMapping(value="/cl-list", method = RequestMethod.POST)
	 * 
	 * @ResponseBody public HashMap<String, Object>
	 * clList( @RequestParam(defaultValue = "1") int
	 * page, @RequestParam(defaultValue = "10") int qty,
	 * 
	 * @RequestParam(defaultValue="") String sYmd, @RequestParam(defaultValue="")
	 * String eYmd, Cl i_cl, @RequestParam(defaultValue="") String ymdIgnoreYN,
	 * Model model){
	 * 
	 * (String) session.getAttribute("comCode"); String logUserId = (String)
	 * session.getAttribute("userId");
	 * 
	 * i_cl.setComCode(logComCode);
	 * 
	 * String workingType = ""; workingType = i_cl.getWorkingType(); // if
	 * (("").equals(workingType) || workingType == null ) { workingType = "LIST"; }
	 * HashMap<String,Object> i_param = new HashMap<String, Object>();
	 * i_param.put("workingType", workingType); i_param.put("logComCode",
	 * logComCode); i_param.put("logUserId", logUserId); i_param.put("cl", i_cl);
	 * i_param.put("sYmd1", sYmd); i_param.put("eYmd1", eYmd);
	 * i_param.put("ymdIgnoreYN", ymdIgnoreYN);
	 * orderService.clList(i_param);
	 * 
	 * HashMap<String, Object> result = new HashMap<String, Object>();
	 * 
	 * result.put("clList", clList); result.put("cl", i_cl);
	 * result.put("ymdIgnoreYN", ymdIgnoreYN); result.put("sYmd", sYmd);
	 * result.put("eYmd", eYmd); 
	 * 
	 * model.addAllAttributes(result); return result; }
	 */
	
	
	/*
	 * 청구그룹마스터 목록
	 * 2023.05.03 bk
	 * 2023.07.10 clDateType --기준일자 추가 
	 * 2023.07.25 bk billPubli -- 세금계산서 발행여부 추가 
	 * */
	@RequestMapping(value="/cl-group-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clGroupList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			ClGroup i_clGroup,   @RequestParam(defaultValue="") String ymdIgnoreYN, 
			@RequestParam(defaultValue="") String clDateType,@RequestParam(defaultValue="") String billPubli, Model model){		
		
	
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_clGroup.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_clGroup.getWorkingType();
		//
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("clGroup", i_clGroup);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("clDateType", clDateType);
		i_param.put("billPubli", billPubli);
			
	
		
		List<ClGroup> clGroupList = orderService.clGroupList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("clGroupList", clGroupList);
		//result.put("clGroup", i_clGroup);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		
		model.addAllAttributes(result);
		return result;		
	}	

	/*
	 * 청구 기결 : 2023.05.03 bk
	 * 2023.05.10 hsg - clGroupAdd -> clGroupAdd 로 변경함. 장윤상 매니저가 만든것과 중복됨
	 * 2023.07.20 hsg - 데이터 체크
	 */
	@RequestMapping(value = "/clGroupAdd2", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clGroupAdd2( ClGroup clGroup, @RequestParam(defaultValue = "") String dataComCode ,Model model) {

		String workingType = clGroup.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		if	(!(dataComCode).equals(logComCode) || ("").equals(dataComCode) ) { 
		    HashMap<String, Object> logoutMap = new HashMap<String, Object>();	 
		    logoutMap.put("result_code", "DCErr");
		    logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
		    return logoutMap; 
		}		
		
		HashMap<String, Object> map = new HashMap<String, Object>();

		// StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("clGroup", clGroup);

		
		ClGroup o_clGroup = new ClGroup();
		o_clGroup = orderService.clGroupAdd(params);

		map.put("result_code", o_clGroup.getDb_resultCode());
		map.put("result_msg", o_clGroup.getDb_resultMsg());
		

		return map;
	}

	
	
	
	/*
	 * 청구품목상세 - 빈페이지.마스터에서 클릭하는 경우 2023.01.04
	 */
	@RequestMapping(value = "/cl-item-list")
	public String clItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String clNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("clNo", clNo);

		model.addAllAttributes(result);
		return "order/cl-item-list";
	}

	/*
	 * 청구메모 등록 2023.04.25 bk
	 * 2023.07.06 hsg - 오류카운트 숫자 잘못되어 수정 addErr > 1 -> addErr > 0
	 * 2023.07.20 hsg - 로그인한 업체의 데이터인지 체크 후 리턴
	 * 2023.07.21 hsg - dataComCode clMemo에서 가져오는것으로 변경
	 */

	@RequestMapping(value = "/clMemoAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clMemoAdd(@RequestBody ClGroupMemo clMemo,  Model model) {

		
		
		//System.out.println("hi");
		String workingType = clMemo.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if	(!(clMemo.getDataComCode()).equals(logComCode) || ("").equals(clMemo.getDataComCode()) ) { 
		    HashMap<String, Object> logoutMap = new HashMap<String, Object>();	 
		    logoutMap.put("result_code", "DCErr");
		    logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
		    return logoutMap; 
		}
		
		ClGroupMemo memo = null;

		ArrayList<ClGroupMemo> addList = clMemo.getClMemoAdd();// 추가 리스트 얻기
		ArrayList<ClGroupMemo> updateList = clMemo.getClMemoUpdate();// 수정 리스트 얻기
		ArrayList<ClGroupMemo> removeList = clMemo.getClMemoRemove(); // 제거 리스트 얻기

		
		

		//
		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("memo", clMemo);

		

		ClGroupMemo o_clMemo = new ClGroupMemo();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;

		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {

				memo = addList.get(i);
				memo.setClGroupId(clMemo.getClGroupId());
				memo.setMemo(addList.get(i).getMemo());
				memo.setRegUserId(clMemo.getRegUserId());
				memo.setRegYmd(clMemo.getRegYmd());
				memo.setRegHms(clMemo.getRegHms());
				memo.setUptUserId(clMemo.getUptUserId());
				memo.setUptYmd(clMemo.getUptYmd());
				memo.setUptHms(clMemo.getUptHms());

				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("memo", memo);
				
				o_clMemo = orderService.clMemoAdd(params);

				if (!("OK").equals(o_clMemo.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
				}
			}
		}
		params.clear();
		
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {

				memo = updateList.get(i);
				memo.setClGroupId(clMemo.getClGroupId());
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
				
				o_clMemo = orderService.clMemoAdd(params);

				if (!("OK").equals(o_clMemo.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {

				memo = removeList.get(i);
				memo.setClGroupId(clMemo.getClGroupId());
				//memo.setIdx(clMemo.getIdx());
				memo.setMemo(memo.getMemo());
				memo.setRegUserId(memo.getRegUserId());
				memo.setRegYmd(memo.getRegYmd());
				memo.setRegHms(memo.getRegHms());
				memo.setUptUserId(memo.getUptUserId());
				memo.setUptYmd(memo.getUptYmd());
				memo.setUptHms(memo.getUptHms());
				memo.setIdx(memo.getIdx());

				// code.setmCode(codeSet.getmCode());
				// code.setmCodeName(codeSet.getmCodeName());
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("memo", memo);
				o_clMemo = orderService.clMemoAdd(params);

				if (!("OK").equals(o_clMemo.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
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
	 * 메모 목록 2023.04.25 bk
	 */
	@RequestMapping(value = "/cl-memo-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clMemoList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, ClGroupMemo i_clMemo, Model model) {

		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_clMemo.setComCode(logComCode);

		String workingType = "";
		workingType = i_clMemo.getWorkingType();

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("clMemo", i_clMemo);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);

		

		List<ClGroupMemo> clMemoList = orderService.clMemoList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("clMemoList", clMemoList);
		result.put("clMemo", i_clMemo);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 미청구마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/no-cl-list")
	public String unClList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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
			eYmd = dateFormat.format(cal.getTime());
		}

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/no-cl-list";

	}
	
	/*
	 * 미청구 품목마스터 목록 - 빈페이지
	 * 0509 bk
	 */
	@RequestMapping(value = "/no-cl-item-list")
	public String noClItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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
			eYmd = dateFormat.format(cal.getTime());
		}

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("logComCode", logComCode);
		result.put("logUserId", logUserId);

		model.addAllAttributes(result);
		return "order/no-cl-item-list";

	}


	/*
	 * 출고품목내역 - 빈페이지 2023.01.04
	 */
	@RequestMapping(value = "/cl-dtl-list")
	public String clDtlList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String clNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("clNo", clNo);

		model.addAllAttributes(result);
		return "order/cl-dtl-list";
	}

	/*
	 * 청구 상세 목록
	 */
	@RequestMapping(value = "/cl-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, ClItem i_clItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_clItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_clItem.getWorkingType();
		
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("clItem", i_clItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<ClItem> clItemList = orderService.clItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("clItemList", clItemList);
		result.put("clItem", i_clItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 청구 품목내역
	 */
	@RequestMapping(value = "/cl-dtl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clDtlList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, ClItem i_clItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_clItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_clItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("clItem", i_clItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<ClItem> clItemList = orderService.clItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("clItemList", clItemList);
		result.put("clItem", i_clItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		

		model.addAllAttributes(result);
		return result;
	}

	// 견적 엑셀 일괄등록
	@RequestMapping(value = "/esti-up-xls", method = RequestMethod.GET)
	public String estiUpXls() {

		return "order/esti-up-xls";
	}
	
	/*
	 * 2023.09.12 hsg - destFile명을 중복된것도 등록되게 처리
	 */
	@ResponseBody
	@RequestMapping(value = "/esti-up-xls", method = RequestMethod.POST)
	public HashMap<String, Object> estiUpXls(EstiExcel estiExcel, MultipartHttpServletRequest request)
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
		//File destFile = new File(fileRoot + "/estiUp__" + excelFile.getOriginalFilename());
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
			result = orderService.estiAddExcel(estiExcel, destFile);
		}
		
		return result;

	}

	// 주문 엑셀 일괄등록
	@RequestMapping(value = "/order-up-xls", method = RequestMethod.GET)
	public String orderUpXls() {

		return "order/order-up-xls";
	}

	/*
	 * 2023.09.12 hsg - destFile명을 중복된것도 등록되게 처리
	 */
	@ResponseBody
	@RequestMapping(value = "/order-up-xls", method = RequestMethod.POST)
	public HashMap<String, Object> orderUpXls(OrderExcel orderExcel, MultipartHttpServletRequest request)
			throws Exception {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		MultipartFile excelFile = request.getFile("batchFile");

		if (excelFile == null || excelFile.isEmpty()) {
			throw new RuntimeException("업로드 할 파일을 선택 해 주세요.");
		}

		// String targetFileName = "";
		// targetFileName = "_order__"+excelFile.getOriginalFilename();
		String fileRoot = uploadPath_root + "\\" + logComCode + "\\order\\"; // "D:\\WebService\\fileUpload\\tellmenow\\tmg\\"+tmgIdx+"\\board\\";
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
		//File destFile = new File(fileRoot + "/orderUp__" + excelFile.getOriginalFilename());
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
			result = orderService.orderAddExcel(orderExcel, destFile);
		}
		
		return result;

	}

	/*
	 * 발주 상세 목록 2023.03.20 - hsg
	 */
	@RequestMapping(value = "/place-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> placeItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, PlaceItem i_placeItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_placeItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_placeItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("placeItem", i_placeItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
	
		List<PlaceItem> placeItemList = orderService.placeItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("placeItemList", placeItemList);
		result.put("placeItem", i_placeItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
	
		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 견적 : GET방식 2023.04.03 - 발주서 인쇄페이지 bokyungm
	 */
	@RequestMapping(value = "/place-up-print", method = RequestMethod.GET)
	public String placeUpPrint(String redirect_target, Place i_place, String memoYN, Model model) {

		
//		/*발주 정보*/
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("place", i_place);

		

		// List<Place> o_place = orderService.placeList(i_param);
		Place o_place = orderService.placeOne(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("place", o_place);

		

		/*
		 * //발주 품목정보
		 */

		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		PlaceItem i_placeItem = new PlaceItem();
		i_placeItem.setPlaceNo(i_place.getPlaceNo());
		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("placeItem", i_placeItem);

		/*
		 * i_param.put("sYmd1", sYmd); i_param.put("eYmd1", eYmd);
		 * i_param.put("ymdIgnoreYN", ymdIgnoreYN); i_param.put("seqArr", seqArr)
		 */

		

		List<PlaceItem> o_placeItemList = orderService.placeItemList(i_param2);
		// HashMap<String, Object> o_params = new HashMap<String, Object>();
		// o_params.put("place", o_place);
		o_params.put("placeItemList", o_placeItemList);

		
		

		HashMap<String, Object> i_param3 = new HashMap<String, Object>();

		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(logComCode);

		i_param3.put("workingType", "PAN_LIST");
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param3);
		
		

		
		o_params.put("custList", o_custList);

		model.addAllAttributes(o_params);
			



		return "order/place-up-print";
	}

	/*
	 * 보험청구/일반청구 적용 2023.04.11 hsg - 주문그룹상세에서 보험적용/일반적용클릭해서 청구상태 적용
	 */
	@RequestMapping(value = "/clTypeAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clTypeAdd(@RequestBody OrderItem orderItemSet) {

		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		OrderItem o_orderItem = new OrderItem();

		params.put("workingType", orderItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("orderItem", orderItemSet);
		
		o_orderItem = orderService.orderItemAdd(params);

		// 결과 만들기
		if (("OK").equals(o_orderItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_orderItem.getDb_resultCode());
			map.put("result_msg", o_orderItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 청구요청 품목등록 2023.04.12 - 청구요청취소 용도로 최초생성. 'CANCEL'	 
	 * 2023.07.20 hsg - 로그인한 업체의 데이터인지 체크 후 리턴
	 */
	@RequestMapping(value = "/clReqItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clReqItemAdd(ClReqItem reqItemSet, @RequestParam(defaultValue = "") String dataComCode ,Model model) {

	

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if	(!(dataComCode).equals(logComCode) || ("").equals(dataComCode) ) { 
		    HashMap<String, Object> logoutMap = new HashMap<String, Object>();	 
		    logoutMap.put("result_code", "DCErr");
		    logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
		    return logoutMap; 
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		ClReqItem o_reqItem = new ClReqItem();

		params.put("workingType", reqItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("reqItem", reqItemSet);



		o_reqItem = orderService.clReqItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_reqItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_reqItem.getDb_resultCode());
			map.put("result_msg", o_reqItem.getDb_resultMsg());
		}

		return map;
	}
/*
 * AOS 출력 
 * 2023.08.09 dcYN 추가 
 * */
	@RequestMapping("/aosXls")
	public String aosXls(@RequestParam HashMap<String, Object> paramMap, HashMap<String, Object> ModelMap,
			HttpServletResponse response, String aosType, ClReqItem i_reqItem, ClGroup i_req, String insureName , String rdoInsure , String dcYN )
			throws Exception {

		String clGroupId = i_reqItem.getClGroupId();
		/*
		 * excelDownload?target=books&id=b2
		 * 
		 * 위와 같은 형식으로 파라미터가 온다고 가정 target에 따라서 가져올 리스트를 선택
		 */
		String target = ""; // paramMap.get("target").toString();
		target = "AOS_" + aosType;
		response.setHeader("Content-disposition", "attachment; filename=AOS-" + aosType + "-" + clGroupId + ".xlsx"); // target명을
																													// 파일명으로
																													// 작성
																													// AOS-청구번호-ssf

		// 엑셀에 작성할 리스트를 가져온다.
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_reqItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_reqItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}

		// 마스터조회
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("clGroup", i_req);
	
		
	

		//List<ClReq> reqList = orderService.clReqList(i_param);
		List<ClGroup> reqList = orderService.clGroupList(i_param);

		// 디테일 조회
		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		i_param2.put("workingType", workingType);
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("reqItem", i_reqItem);
		i_param2.put("rdoInsure", rdoInsure);
	
		List<ClReqItem> reqItemList = orderService.clReqItemList(i_param2);

		// ExcelView(kr.co.myapp.util.ExcelView) 에 넘겨줄 값 셋팅
		ModelMap.put("reqList", reqList);
		ModelMap.put("reqItemList", reqItemList);
		ModelMap.put("target", target);
		ModelMap.put("insureName", insureName);
		ModelMap.put("dcYN", dcYN);
	

		return "excelView"; // servlet-context.xml 에서 name이 excelView(kr.co.myapp.util.ExcelView)인것 호출

	}
	
	
	/*
	 * 주문 : GET방식 2023.05.12 - 청구서 인쇄페이지 bokyungm
	 */
	@RequestMapping(value = "/cl-group-print", method = RequestMethod.GET)
	public String clGroupPrint(String redirect_target, ClGroup i_clGroup, String insureName, String rdoInsure,   
															 String printDcYN,String reqArr, String  seqArr,String  clType, String printCenterYN,
															 @RequestParam(defaultValue = "") String chnLogCust, Model model) {
		

		/* 견적정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		//청구그룹 인쇄 
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("clGroup", i_clGroup);
		i_param.put("rdoInsure", rdoInsure);
				
		ClGroup o_clGroup = orderService.clGroupOne(i_param);
		//System.out.println("chnLogCust"+chnLogCust);
		
		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("clGroup", o_clGroup);
		if ("insure1".equals(rdoInsure)) {
		    o_params.put("insureCode", o_clGroup.getInsure1Code());
		    o_params.put("insureName", o_clGroup.getInsure1Name());
		    o_params.put("insureMgrName", o_clGroup.getInsure1MgrName());
		    o_params.put("insureMgrPhone", o_clGroup.getInsure1MgrPhone());
		    o_params.put("insureAcciRate", o_clGroup.getInsure1AcciRate());
		    o_params.put("insureAcceptNo", o_clGroup.getInsure1AcceptNo());
		    o_params.put("insureClAmt", o_clGroup.getInsure1ClAmt());
		    o_params.put("insureMgrFax", o_clGroup.getInsure1Fax());
		    o_params.put("insureMemo", o_clGroup.getMemo());
		    
		} else if ("insure2".equals(rdoInsure)) {
		    o_params.put("insureCode", o_clGroup.getInsure2Code());
		    o_params.put("insureName", o_clGroup.getInsure2Name());
		    o_params.put("insureMgrName", o_clGroup.getInsure2MgrName());
		    o_params.put("insureMgrPhone", o_clGroup.getInsure2MgrPhone());
		    o_params.put("insureAcciRate", o_clGroup.getInsure2AcciRate());
		    o_params.put("insureAcceptNo", o_clGroup.getInsure2AcceptNo());
		    o_params.put("insureClAmt", o_clGroup.getInsure2ClAmt());
		    o_params.put("insureMgrFax", o_clGroup.getInsure2Fax());
		    o_params.put("insureMemo", o_clGroup.getpMemo2());
		}
		
		//청구품목인쇄 
		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		
		ClReqItem i_reqItem = new ClReqItem(); 
		
		i_reqItem.setClGroupId ( i_clGroup.getClGroupId());	
		i_reqItem.setReqArr(reqArr);
		i_reqItem.setSeqArr(seqArr);
		
		if (reqArr == null || reqArr.equals("")) {
		    i_param2.put("workingType", "LIST");
		} else {
		    i_param2.put("workingType", "PRINT");
		}
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("reqItem", i_reqItem);
		i_param2.put("rdoInsure", rdoInsure);
		
		
		//System.out.println("i_param2"+i_param2);
		
		List<ClReqItem> o_reqItemList = orderService.clReqItemList(i_param2);
		o_params.put("reqItemList", o_reqItemList);
		//System.out.println("reqItemList"+o_reqItemList);
		//보험사 인쇄		
		
		if (chnLogCust.equals("")) {
			chnLogCust = logComCode;
		}
		
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();
		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(chnLogCust);  //2024.10.04 위에거에서 수정. hsg

		i_param3.put("workingType", "PAN_LIST");
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param3);

		o_params.put("custList", o_custList);
		//System.out.println("o_custList:"+o_custList);
		
		HashMap<String, Object> i_param4 = new HashMap<String, Object>();

		Payment i_payment = new Payment();

		i_param4.put("workingType", "LIST");
		i_param4.put("payment", i_payment);
		//i_param4.put("logComCode", logComCode);  
		i_param4.put("logComCode", chnLogCust); //2024.10.04 위에거에서 변경.hsg
		i_param4.put("logUserId", logUserId);

		List<Payment> paymentList = bizService.paymentList(i_param4);
		List<Payment> paymentList2 = new ArrayList();
		
		if (clType.equals("일반")) {
			for (int i = 0, len = paymentList.size(); i < len; i++) {
				if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())  && ("Y").equals(paymentList.get(i).getCommonDpYN()) ) {				
				    paymentList2.add(paymentList.get(i));   
				    
				}
			}
		} else {
			for (int i = 0, len = paymentList.size(); i < len; i++) {
				if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
						&& ("Y").equals(paymentList.get(i).getInsurDpYN())) {				
					paymentList2.add(paymentList.get(i));
					}	
				}
			}
			
			//일반건 인쇄시
			HashMap<String, Object> i_param5 = new HashMap<String, Object>();
			Cust i_cust2 = new Cust();
			i_cust2.setComCode(logComCode);
			i_cust2.setCustCode(o_clGroup.getCustCode());
			//System.out.println("o_clGroup.getCustCode()"+o_clGroup.getCustCode());
			
			i_param5.put("workingType", "LIST");
			i_param5.put("logComCode", logComCode);
			i_param5.put("logUserId", logUserId);
			i_param5.put("cust", i_cust2);

			List<Cust> o_custList2 = baseService.custList(i_param5);

			o_params.put("custList2", o_custList2);
			//System.out.println("custList2"+o_custList2);
			
			o_params.put("paymentList2", paymentList2);
			o_params.put("printDcYN", printDcYN);
			o_params.put("clType", clType);
			o_params.put("printCenterYN", printCenterYN);
			
		model.addAllAttributes(o_params);		
		return "order/cl-group-print";
	}

	
	/*
	 * 미청구 품목 리스트 -> orderGroupItemList 에서 분리
	 * 2023.06.19 hsg
	 */
	@RequestMapping(value = "/noClItemList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> noClItemList(@RequestParam(defaultValue = "1") int page,		@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, NoClItem i_noClItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,			@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		// Cust i_cust = new Cust();
		i_noClItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("noClItem", i_noClItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);
	
		List<NoClItem> i_noClItemList = orderService.noClItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("noClItemList", i_noClItemList);
		result.put("noClItem", i_noClItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		
		model.addAllAttributes(result);
		return result;
	}	
	
	/*
	 * 주문 : GET방식 2023.07.11 - 주문그룹 인쇄페이지 bokyungm
	 * 2023.10.04 hsg - method=GET 제거. POST와 GET 혼용하고 있음.
	 */
	@RequestMapping(value = "/order-group-print")
	public String orderGroupPrint(String redirect_target,  OrderGroup i_orderGroup, String printRiYN,  String printDcYN, 
																String printNoYN,String ordArr, String seqArr,String stdClType, Model model) {

		/* 주문그룹정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroup", i_orderGroup);
	
		OrderGroup o_orderGroup = orderService.orderGroupOne(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("orderGroup", o_orderGroup);
		//System.out.println("o_params"+o_params);
		//o_params.put("memoYN", memoYN);
		
		/* 주문그룹품번 조회*/
		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		OrderItem i_orderItem = new OrderItem();

		i_orderItem.setOrderGroupId(i_orderGroup.getOrderGroupId());
		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("orderItem", i_orderItem);
		i_param2.put("ordArr", ordArr);
		i_param2.put("seqArr", seqArr);

		List<OrderGroupItem> o_orderGroupItemList = orderService.orderGroupItemList(i_param2);

		o_params.put("orderGroupItemList", o_orderGroupItemList);
		//System.out.println("o_orderGroupItemList"+o_orderGroupItemList)
		/* 거래처 조회*/;
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();
		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(logComCode);

		i_param3.put("workingType", "PAN_LIST");
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param3);

		o_params.put("custList", o_custList);
		
		o_params.put("printDcYN", printDcYN);
		o_params.put("stdClType", stdClType);
		o_params.put("printRiYN", printRiYN);
		//o_params.put("printNoYN", printNoYN);

		HashMap<String, Object> i_param4 = new HashMap<String, Object>();
		Payment i_payment = new Payment();
		i_param4.put("workingType", "LIST");
		i_param4.put("payment", i_payment);
		i_param4.put("logComCode", logComCode);
		i_param4.put("logUserId", logUserId);

		List<Payment> paymentList = bizService.paymentList(i_param4);
		List<Payment> paymentList2 = new ArrayList();
	

		for (int i = 0, len = paymentList.size(); i < len; i++) {
			if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
					&& ("Y").equals(paymentList.get(i).getCommonDpYN())) {
				paymentList2.add(paymentList.get(i));

			}
		}
		
		o_params.put("paymentList2", paymentList2);
		
		model.addAllAttributes(o_params);
		return "order/order-group-print";
	}

	
	/*
	 * 주문품목내역 - 빈페이지. 2023.07.19 hsg
	 * 2023.08.03 hsg - orderGroupId,itemId 추가
	 */
	@RequestMapping(value = "/order-dtl-list")
	public String orderDtlList( @RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId, @RequestParam(defaultValue = "0") long itemId, Model model) {

		
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

		OrderItem i_orderItem = new OrderItem();

		result.put("orderItem", i_orderItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("itemId", itemId);

		model.addAllAttributes(result);
		return "order/order-dtl-list";
	}

	
	
	/**************************************************************************************************************************************************/
	/*
	 * 주문그룹 품목 리스트 - 대량데이터 용 : orderGroupItemList 는 이게 개발완료되면 사용 안함
	 * * 2023.08.04.hsg
	 */
	@RequestMapping(value = "/order-group-item-list-big")
	public String orderGroupItemListBig(String redirect_target, OrderGroup i_orderGroup, String ordArr, String seqArr,
			Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String lgoUserId = (String) session.getAttribute("userId");

		String orderGroupId = i_orderGroup.getOrderGroupId();



		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", logComCode);
		i_params.put("userId", lgoUserId);
		i_params.put("orderGroupId", orderGroupId);
		i_params.put("ordArr", ordArr);
		i_params.put("seqArr", seqArr);

		// [Cust custInfo = baseService.custOne(i_params);
		// i_params.put("cust",custInfo);

		model.addAllAttributes(i_params);

		return "order/order-group-item-list-big";
	}

	/*
	 * 주문그룹 품목 리스트 
	 * 2023.08.04.hsg
	 */
	@RequestMapping(value = "/orderGroupItemListBig", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderGroupItemListBig(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		// Cust i_cust = new Cust();
		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);

	
		List<OrderGroupItem> orderGroupItemList = orderService.orderGroupItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		

		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 발주요청 - 빈페이지
	 */
	@RequestMapping(value = "/place-req-up-big")
	public String placeReqUpBig(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		
		model.addAllAttributes(result);
		return "order/place-req-up-big";

	}

	/*
	 * 주문 접수내역- 빈페이지
	 * 2023.08.21 bk
	 * 2023.12.18 hsg - pcReqNo 추가
	 */
	@RequestMapping(value = "/pc-req-list")
	public String pcReqList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,  @RequestParam(defaultValue = "") String pcReqNo,Model model) {

		
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
		result.put("pcReqNo", pcReqNo);

		model.addAllAttributes(result);
		return "order/pc-req-list";
	}
	
	/*
	 * 주문 접수내역
	 *  2023.08.21 bk
	 *  2024.04.08 supi 부품id,번호 조회조건 추가
	 */
	@RequestMapping(value = "/pc-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> pcReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, PcReq i_pcReq,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String itemId,  @RequestParam(defaultValue = "") String itemNo, Model model) {
	

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_pcReq.setComCode(logComCode);

		String workingType = "";
		workingType = i_pcReq.getWorkingType();
		
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("pcReq", i_pcReq);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("itemId", itemId);
		i_param.put("itemNo", itemNo);
		
		List<PcReq> pcReqList = orderService.pcReqList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("pcReqList", pcReqList);
		result.put("pcReq", i_pcReq);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문 접수 상세내역- 빈페이지
	 * 2023.08.21 bk
	 */
	@RequestMapping(value = "/pc-req-item-list")
	public String pcReqItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String pcReqNo, Model model) {

		
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
		result.put("pcReqNo", pcReqNo);

		model.addAllAttributes(result);
		return "order/pc-req-item-list";
	}
	/*
	 * 주문 접수 상세내역
	 * 2023.08.21
	 * */
	
	@RequestMapping(value="/pc-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> pcReqItemList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			PcReqItem i_reqItem,   @RequestParam(defaultValue="") String ymdIgnoreYN,  @RequestParam(defaultValue="") String reqSeqArr ,   Model model){		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_reqItem.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_reqItem.getWorkingType();
		
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("reqItem", i_reqItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("reqSeqArr", reqSeqArr);
		
		List<PcReqItem> reqItemList = orderService.pcReqItemList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("reqItemList", reqItemList);
		result.put("reqItem", i_reqItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		
		model.addAllAttributes(result);
		return result;		
	}	
	
	/*
	 * 주문요청 등록
	 * 2023.08.22
	 * 2023.12.04 hsg - return map값에 pcReqNo 추가. 리턴되면 이값으로 내역으로 링크되게 하기 위해
	 * 2024.01.23 hsg - return map값에 getAutoPcProcYN 추가. 주문자동생성여부 리턴되면 이값으로 주문으로 안넘어가게 처리.
	 */
	@ResponseBody
	@RequestMapping(value = "/pcReqAdd", method = RequestMethod.POST)
	public HashMap<String, Object> pcReqAdd(@RequestBody PcReq pcReqSet) {
		
		String workingType = pcReqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, Object> params = new HashMap<String, Object>();

		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("pcReq", pcReqSet);
		
		System.out.println("params : " + params);

		PcReq o_pcReq = new PcReq();
		o_pcReq = orderService.pcReqAdd(params);

		// 결과 만들기
		//map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_pcReq.getDb_resultCode())) {
		    map.put("result_code", "OK");
		    map.put("result_msg", "처리되었습니다.");
		    map.put("pcReqNo", o_pcReq.getPcReqNo() );
		    map.put("autoPcProcYN", o_pcReq.getAutoPcProcYN());
		}else {
			map.put("result_code", o_pcReq.getDb_resultCode());
			map.put("result_msg", o_pcReq.getDb_resultMsg());
		}
		//System.out.println("map:"+map);
		return map;
	}

	/*
	 * 보험현황- 빈페이지
	 * 2023.08.30 bk
	 */
	@RequestMapping(value = "/insurance-status")
	public String insuranceStatus(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

	
		//result.put("orderGroup", i_orderGroup);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/insurance-status";
	}
	
	/*
	 * 보험현황
	 * 2023.08.30 bk
	 * 2023.09.12 clDateType 추가
	 * */
	
	@RequestMapping(value="/insurance-status", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> insuranceStatus ( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			Insurance i_insurance,   @RequestParam(defaultValue="") String ymdIgnoreYN, @RequestParam(defaultValue="") String clReqStatus,
			@RequestParam(defaultValue="") String clStatus, @RequestParam(defaultValue="") String confYN, @RequestParam(defaultValue = "") String clDateType, Model model){		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_insurance.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_insurance.getWorkingType();
		
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("insurance", i_insurance);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("clReqStatus", clReqStatus);
		i_param.put("clStatus", clStatus);
		i_param.put("confYN", confYN);
		i_param.put("clDateType", clDateType);
		
		List<Insurance> insuranceList = orderService.insuranceList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("insuranceList", insuranceList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
			
		//System.out.println("insurance"+insuranceList);
		model.addAllAttributes(result);
		return result;		
	}	
	

	/*
	 * 주문그룹 품목 리스트 - 대량데이터 용 : 처리창을 팝업식으로 오픈
	 * * 2023.10.04.hsg
	 */
	@RequestMapping(value = "/order-group-item-list-pop")
	public String orderGroupItemListPop(String redirect_target, OrderGroup i_orderGroup, String ordArr, String seqArr,
			Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String lgoUserId = (String) session.getAttribute("userId");

		String orderGroupId = i_orderGroup.getOrderGroupId();

		HashMap<String, Object> i_params = new HashMap<String, Object>();
		i_params.put("workingType", "ONE");

		i_params.put("comCode", logComCode);
		i_params.put("userId", lgoUserId);
		i_params.put("orderGroupId", orderGroupId);
		i_params.put("ordArr", ordArr);
		i_params.put("seqArr", seqArr);

		model.addAllAttributes(i_params);

		return "order/order-group-item-list-pop";
	}
	
	/*
	 * 주문그룹 품목 리스트 - 요청처리가 팝없형태
	 * 2023.10.04.hsg
	 */
	@RequestMapping(value = "/orderGroupItemListPop", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderGroupItemListPop(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		// Cust i_cust = new Cust();
		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);
	
		List<OrderGroupItem> orderGroupItemList = orderService.orderGroupItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문그룹아이디 변경
	 * 2023.10.11 bk 
	*/
	@RequestMapping(value = "/orderGroupChange", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderGroupChange(@RequestBody OrderGroup orderGroupSet ) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> map = new HashMap<String, Object>();	    
		//마스터 등록
		HashMap<String,Object> params = new HashMap<String, Object>();		
		OrderGroup o_orderGroup = new OrderGroup();
		
		params.put("workingType",orderGroupSet.getWorkingType());	
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		params.put("orderGroup",  orderGroupSet);

		//System.out.println("orderGroup"+orderGroupSet);
		
		o_orderGroup = orderService.orderGroupChange(params);

		// 결과 만들기
		//map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_orderGroup.getDb_resultCode())) {
		    map.put("result_code", "OK");
		    map.put("result_msg", "처리되었습니다.");
		}else {
			map.put("result_code", o_orderGroup.getDb_resultCode());
			map.put("result_msg", o_orderGroup.getDb_resultMsg());
		}    

		return map;          
	}

	
	/*
	 * 견적 목록 마스터 디테일- 빈페이지
	 */
	@RequestMapping(value = "/esti-list-master-detail")
	public String estiListMD(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		Estimate i_estimate = new Estimate();

		
		// model.addAttribute("orderList", orderList);
		result.put("estimate", i_estimate);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/esti-list-master-detail";

	}

	/*
	 * 견적 목록 마스터 디테일
	 */
	@RequestMapping(value = "/esti-list-master-detail", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> estiListMD(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Estimate i_esti,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			Model model) {


		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_esti.setComCode(logComCode);

		String workingType = "";
		workingType = i_esti.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("esti", i_esti);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);
		
		List<Estimate> estiList = orderService.estiList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("estiList", estiList);
		result.put("esti", i_esti);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
		

		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 주문 목록 마스터 디테일 - 빈페이지
	 */
	@RequestMapping(value = "/order-list-master-detail")
	public String orderListMD(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		Order i_order = new Order();

		
		// model.addAttribute("orderList", orderList);
		result.put("order", i_order);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/order-list-master-detail";
	}

	/*
	 * 주문 목록 마스터 디테일
	 */
	@RequestMapping(value = "/order-list-master-detail", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderListMD(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Order i_order,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {
		
		/*
		 * DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); Calendar cal =
		 * Calendar.getInstance(); if (("").equals(sYmd) || sYmd == null ){
		 * cal.setTime(new Date()); //cal.add(Calendar.MONTH, -1);
		 * cal.add(Calendar.MONTH, 0); sYmd = dateFormat.format(cal.getTime()); } if
		 * (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_order.setComCode(logComCode);

		String workingType = "";
		workingType = i_order.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("order", i_order);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<Order> orderList = orderService.orderList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderList", orderList);
		result.put("order", i_order);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		

		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 주문 요청내역- 빈페이지
	 * 2023.11.20 hsg
	 */
	@RequestMapping(value = "/out-pc-req-list")
	public String outPcReqList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String pcReqNo, Model model) {
		
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
		result.put("pcReqNo", pcReqNo);

		model.addAllAttributes(result);
		return "order/out-pc-req-list";
	}
	
	/*
	 * 주문 요청내역
	 *  2023.11.20 hsg
	 */
	@RequestMapping(value = "/out-pc-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outPcReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, PcReq i_pcReq,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {	
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_pcReq.setComCode(logComCode);

		String workingType = "";
		workingType = i_pcReq.getWorkingType();
		
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("pcReq", i_pcReq);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<PcReq> pcReqList = orderService.pcReqList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("pcReqList", pcReqList);
		result.put("pcReq", i_pcReq);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 주문 요청 상세내역- 빈페이지
	 * 2023.11.21 hsg
	 */
	@RequestMapping(value = "/out-pc-req-item-list")
	public String outPcReqItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String pcReqNo, Model model) {
		
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
		result.put("pcReqNo", pcReqNo);

		model.addAllAttributes(result);
		return "order/out-pc-req-item-list";
	}
	/*
	 * 주문 요청 상세내역
	 * 2023.11.21 hsg
	 * */
	
	@RequestMapping(value="/out-pc-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outPcReqItemList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			PcReqItem i_reqItem,   @RequestParam(defaultValue="") String ymdIgnoreYN,   Model model){		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_reqItem.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_reqItem.getWorkingType();
		
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("reqItem", i_reqItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		
		List<PcReqItem> reqItemList = orderService.pcReqItemList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("reqItemList", reqItemList);
		result.put("reqItem", i_reqItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);		
		
		model.addAllAttributes(result);
		return result;		
	}	
	
	/*
	 *  주문그룹상세의 출고요청에서 품목 리스팅
	 */
	@RequestMapping(value = "/rlReqItemTgList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlReqItemTgList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "LIST") String workingType, Model model) {
//System.out.println("retg in");
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

		// Cust i_cust = new Cust();
		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);
	
		List<OrderGroupItem> orderGroupItemList = orderService.rlReqItemTgList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);		

		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 미청구내역
	 * 2023.12.05 hsg
	 */
	@RequestMapping(value = "/no-cl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> noClList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, NoCl i_noCl,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {
	
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_noCl.setComCode(logComCode);

		String workingType = "";
		workingType = i_noCl.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("noCl", i_noCl);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
	
		List<NoCl> noClList = orderService.noClList(i_param);	

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("noClList", noClList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}


	/*
	 * 발주요청대상 품목
	 * 2023.12.19 hsg - 원래 orderGroupItemList에 통합되어 있었으나 부하 분사하기 위해 분리
	 */
	@RequestMapping(value = "/plReqItemTgList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> plReqItemTgList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,	@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);
	
		List<OrderGroupItem> orderGroupItemList = orderService.plReqItemTgList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);		

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 반입요청대상 품목
	 * 2023.12.19 hsg - 원래 orderGroupItemList에 통합되어 있었으나 부하 분사하기 위해 분리
	 */
	@RequestMapping(value = "/riReqItemTgList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riReqItemTgList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,	@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);
	
		List<OrderGroupItem> orderGroupItemList = orderService.riReqItemTgList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);		

		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 반출요청대상 품목
	 * 2023.12.19 hsg - 원래 orderGroupItemList에 통합되어 있었으나 부하 분사하기 위해 분리
	 */
	@RequestMapping(value = "/roReqItemTgList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roReqItemTgList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,	@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);
	
		List<OrderGroupItem> orderGroupItemList = orderService.roReqItemTgList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);		

		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 청구요청대상 품목
	 * 2023.12.19 hsg - 원래 orderGroupItemList에 통합되어 있었으나 부하 분사하기 위해 분리
	 */
	@RequestMapping(value = "/clReqItemTgList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clReqItemTgList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderGroupItem i_orderGroupItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,	@RequestParam(defaultValue = "LIST") String workingType, Model model) {

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

		i_orderGroupItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderGroupItem", i_orderGroupItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ordArr", ordArr);
		i_param.put("seqArr", seqArr);
	
		List<OrderGroupItem> orderGroupItemList = orderService.clReqItemTgList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("orderGroupItemList", orderGroupItemList);
		result.put("orderGroupItem", i_orderGroupItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);		

		model.addAllAttributes(result);
		return result;
	}
	
	
	/*
	 2023.12.21 supi 회수요청 마스터 및 디테일,  등록 및 수정  
	 2024.03.18 supi 회수에서도 수령방법,비용,방문처 변수 추가
	 2024.04.08 supi 회수불가사유 추가 및 매개변수를 개별이 아닌 해시맵으로 받는것으로 수정(사유 매번 추가할때마다 여기도 같이 추가해줘야되서)
	 */
	@RequestMapping(value = "/ctReqAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> ctReqAdd( 
			@RequestParam(defaultValue = "") HashMap<String, Object> i_param 
			) {
		 
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
  
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId); 
		 
		HashMap<String, Object>  result = orderService.ctReqAdd(i_param);
	 
		return result;
	}
	/*
	 * 회수 요청내역- 빈페이지
	 *  2023.12.21 supi
	 */
	@RequestMapping(value = "/out-ct-req-list")
	public String outCtReqList(Model model) { 
		return "order/out-ct-req-list";
	}
	/*
	 * 회수 접수내역- 빈페이지
	 *  2023.12.26 supi
	 */
	@RequestMapping(value = "/ct-req-list")
	public String CtReqList(Model model) { 
		return "order/ct-req-list";
	}
	/*
	 * 회수 요청내역- 빈페이지
	 *  2023.12.21 디테일 제거(디테일 없어지면 마스터도 제거)
	 */
	@ResponseBody
	@RequestMapping(value = "/ctReqDel", method = RequestMethod.POST)
	public HashMap<String, Object> ctReqDel(  
			@RequestParam(defaultValue = "") String ctReqNo,
			@RequestParam(defaultValue = "") String ctReqSeqArr) {
		
	
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> params = new HashMap<String, Object>();

		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId); 
		  
		params.put("ctReqNo", ctReqNo); 
		params.put("ctReqSeqArr", ctReqSeqArr); 
	 
		HashMap<String, Object>  result = orderService.ctReqDel(params);
	 
		return result;
	}
	/*
	 * 회수 요청내역
	 *  2023.12.21 supi 회수요청 마스터리스트 조회 매개변수 reqYN로 요청자와 접수자 구분
	 *  2024.03.25 supi 회수 상태매개변수 추가로 그냥 매개변수를 해시맵으로 통합으로 받는거로변경(향후 추가시 추가 안해도 되도록)
	 */
	@RequestMapping(value = "/out-ct-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outCtReqList(
			@RequestParam(defaultValue = "") HashMap<String, Object> i_param 
			, Model model) {	
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
  
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		 
		 
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ctReqList",orderService.ctReqList(i_param));
		
		return result;
		 
	}
	
	/*
	 * 
	 * 2023.12.22 supi 회수요청 디테일리스트 조회
	 */
	@RequestMapping(value = "/out-ct-req-item-list")
	@ResponseBody
	public  HashMap<String, Object> outCtReqItemList(@RequestParam(defaultValue = "") String ctReqNo, Model model) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		 
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId); 
		i_param.put("ctReqNo", ctReqNo); 
		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ctReqItemList",orderService.ctReqItemList(i_param));
 
		return result;
	}
	/*
	 * 
	 * 2023.12.27 supi 회수요청 요청번호or 아이템id배열(구분자'^')로 창고,랙,수량받아오기 
	 */
	@RequestMapping(value = "/ctStoRackList")
	@ResponseBody
	public  HashMap<String, Object> ctStoRackList(
			@RequestParam(defaultValue = "") String ctReqNo,
			@RequestParam(defaultValue = "") String ctItemIdArr
			,Model model) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId); 
		i_param.put("ctReqNo", ctReqNo); 
		i_param.put("ctItemIdArr", ctItemIdArr); 
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("ctStoRackList",orderService.ctStoRackList(i_param));
		
		return result;
	}
	/*
	 * 
	 * 2024.01.02 supi 회수처리
	 */
	@RequestMapping(value = "/ctProcess")
	@ResponseBody
	public  HashMap<String, Object> ctProcess(
			@RequestParam(defaultValue = "") String reqNo,
			@RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String rackArr,
			@RequestParam(defaultValue = "") String qtyArr
			,Model model) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId); 
		i_param.put("reqNo", reqNo);  
		i_param.put("seqArr", seqArr);  
		i_param.put("rackArr", rackArr);  
		i_param.put("qtyArr", qtyArr);  
		HashMap<String, Object> result = new HashMap<String, Object>();
	 
		result.put("ctProcess",orderService.ctProcess(i_param));
		
		return result;
	}
	/*
	 * 2024.01.24 supi 주문요청 상세내역 인쇄 빈페이지 
	 * */
	
	/*
	 * 발주등록시 주문수정 수량가져오기
	 * */
	@RequestMapping(value="/order-cnt-upt-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderCntUptList( @RequestParam(defaultValue="") String orderNo,@RequestParam(defaultValue="") String orderSeq, 
			 @RequestParam(defaultValue="") String placeReqNo,@RequestParam(defaultValue="") String placeReqSeq, Model model){		
		
	
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String workingType = "LIST";

		HashMap<String,Object> i_param = new HashMap<String, Object>();
		
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("orderNo", orderNo);
		i_param.put("orderSeq", orderSeq);
		i_param.put("placeReqNo", placeReqNo);
		i_param.put("placeReqSeq", placeReqSeq);
		
	
		
		List<UptOrderCnt> orderCntUptList = orderService.orderCntUptList(i_param);
		
		
		result.put("orderCntUptList", orderCntUptList);		
	
		model.addAllAttributes(result);
		
		return result;		
	}
	
	/*
	 * 발주등록시 주문수정 수량변경
	 * 20240124 yoonsang
	*/
	@RequestMapping(value = "/order-cnt-upt", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> orderCntUpt(@RequestBody UptOrderCnt uptOrderCnt) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		String orderNo = uptOrderCnt.getOrderNo();
		String orderSeq = uptOrderCnt.getOrderSeq();
		String placeReqNo = uptOrderCnt.getPlaceReqNo();
		String placeReqSeq = uptOrderCnt.getPlaceReqSeq();
		Integer uptCnt = uptOrderCnt.getUptCnt();
		String rlCheckYN = uptOrderCnt.getRlCheckYN();

		
		HashMap<String, Object> map = new HashMap<String, Object>();	    
	
		//마스터 등록
		HashMap<String,Object> params = new HashMap<String, Object>();		
		UptOrderCnt o_uptOrderCnt = new UptOrderCnt();
		
		params.put("workingType","UPT-CNT");	
		params.put("logComCode",logComCode);
		params.put("logUserId",logUserId);
		params.put("orderNo",  orderNo);
		params.put("orderSeq",  orderSeq);
		params.put("placeReqNo",  placeReqNo);
		params.put("placeReqSeq",  placeReqSeq);
		params.put("uptCnt",  uptCnt);
		params.put("rlCheckYN",  rlCheckYN);

		
		o_uptOrderCnt = orderService.orderCntUpt(params);

		
		if (("OK").equals(o_uptOrderCnt.getDb_resultCode())) {
		    map.put("result_code", "OK");
		    map.put("result_msg", "처리되었습니다.");
		}else {
			map.put("result_code", o_uptOrderCnt.getDb_resultCode());
			map.put("result_msg", o_uptOrderCnt.getDb_resultMsg());
		}  
		
		return map;                
	}
	
	/*
	 * 2024.01.24 supi 주문요청 상세내역 인쇄 빈페이지 
	 * */
	
	@RequestMapping(value="/pc-req-item-list-print" )
	public String pcReqitemListPrint(Model model){		 
	return "order/pc-req-item-list-print"; 
	}
	/*
	 * 2024.01.26 supi 회수요청 상세내역 인쇄 빈페이지 
	 * */
	
	@RequestMapping(value="/ct-req-item-list-print" )
	public String ctReqitemListPrint(Model model){		 
	return "order/ct-req-item-list-print"; 
	}
	
	/*
	 * 수주내액 - 그린에서 보는 자회사의 발주내역 2024.01.30
	 * 2024.02.06 hsg -사용안함
	 * */
	@RequestMapping(value="/out-pl-list")
	public String outPlList( ){

		return "order/out-pl-list";
		
	}
	
	/*
	 *  수주내액 - 그린에서 보는 자회사의 발주내역 2024.01.30
	 *  2024.02.06 hsg -사용안함
	 * */
	@RequestMapping(value="/out-pl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outPlList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			StorageUseReq i_req,   @RequestParam(defaultValue="") String ymdIgnoreYN,   Model model){		
		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_req.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_req.getWorkingType();
		//
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
		
		List<Place> outPlList = orderService.placeList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("outPlList", outPlList);
		result.put("req", i_req);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);	
		
		model.addAllAttributes(result);
		return result;		
	}	
	
	
	/*
	 * 발주품목내역 - 빈페이지
	 * 2024.02.29 hsg -  
	 * */
	@RequestMapping(value="/pl-dtl-list")
	public String plDtlList( Model model){		

		return "order/pl-dtl-list";
	}

	/*
	 * 발주 품목내역
	 * */
	@RequestMapping(value="/pl-dtl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> plDtlList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			PlaceItem i_plItem,   @RequestParam(defaultValue="") String ymdIgnoreYN,   Model model){		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		i_plItem.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_plItem.getWorkingType();
		//
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("placeItem", i_plItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		List<PlaceItem> placeItemList = orderService.placeItemList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("placeItemList", placeItemList);
		result.put("plItem", i_plItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);		
		
		model.addAllAttributes(result);
		return result;		
	}
	
	
	/*
	 * 삭제 견적품목 복원 : 2024.06.14 hsg
	 */
	@RequestMapping(value = "/estiItemRestore", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> estiItemRestore(EstimateItem estiItemSet,
			/* String estiArr, String seqArr, */ String delItemIdxArr, Model model) {

		String workingType = estiItemSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		HashMap<String, Object> params = new HashMap<String, Object>();
		
		params.put("workingType", "RESTORE");
		params.put("comCode", logComCode);
		params.put("userId", logUserId);
		params.put("estiItemSet", estiItemSet);
		params.put("delItemIdxArr", delItemIdxArr);
		//params.put("estiArr", estiArr);
		//params.put("seqArr", seqArr);

		EstimateItem o_estiItem = new EstimateItem();
		o_estiItem = orderService.estiItemAdd(params);

		if (("OK").equals(o_estiItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_estiItem.getDb_resultCode());
			map.put("result_msg", o_estiItem.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}
	
	
	/*
	 * 회수 품목내역- 빈페이지
	 *  2024.06.21 hsg
	 */
	@RequestMapping(value = "/ct-item-list")
	public String ctItemList(Model model) { 
		return "order/ct-item-list";
	}
	
	/*
	 * 2024.06.21 hsg 회수품목 내역
	 */
	@RequestMapping(value = "/ct-item-list", method = RequestMethod.POST)
	@ResponseBody
	public  HashMap<String, Object> ctItemList(CtReqItem i_ctReqItem,  @RequestParam(defaultValue = "") String sYmd1, @RequestParam(defaultValue = "") String eYmd1, 
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String ctReqNo , Model model) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		 
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId); 
		i_param.put("ctReqItem", i_ctReqItem); 
		i_param.put("sYmd1", sYmd1);
		i_param.put("eYmd1", eYmd1);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("ctReqNo", ctReqNo);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("ctItemList",orderService.ctReqItemList(i_param));		
 
		return result;
	}
	
	/*
	 * 재고투입요청내역 페이지
	 *  2024.07.17 supi 최초작성
	 */
	@RequestMapping(value = "/stock-in-req-item-list")
	public String stockInReqItemList(Model model) { 
		return "order/stock-in-req-item-list";
	}
	/* 
	 *	재고투입요청내역 조회
	 *  2024.07.17 supi 최초작성
	 */
	@RequestMapping(value = "/stock-in-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public  List<HashMap<String, Object>> stockInReqItemList(@RequestParam HashMap<String, Object> i_params, Model model) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		i_params.put("logComCode", logComCode);
		i_params.put("logUserId", logUserId);  
		
		return orderService.stockInReqItemList(i_params);
	}
	/*
	 *	재고투입요청
	 *	2024.07.17 supi 최초작성
	 */
	@RequestMapping(value = "/stock-in-req-item-add")
	@ResponseBody
	public HashMap<String, Object> stockInReqItemAdd (@RequestParam HashMap<String, Object> i_params, Model model)
	{
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		i_params.put("logComCode", logComCode);
		i_params.put("logUserId", logUserId); 
		
		return orderService.stockInReqItemAdd(i_params);
	}
	/*
	 *	회수완료취소
	 *	2024.07.23 supi 최초작성
	 */
	@RequestMapping(value = "/ctProcCancel")
	@ResponseBody
	public HashMap<String, Object> ctProcCancel (@RequestParam HashMap<String, Object> i_params, Model model)
	{
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		i_params.put("logComCode", logComCode);
		i_params.put("logUserId", logUserId); 
		
		return orderService.ctProcCancel(i_params);
	}
	
	
	/*
	 * 청구제외품목리스트
	 */
	@RequestMapping(value = "/cl-ign-item-list")
	public String clIgnItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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
			eYmd = dateFormat.format(cal.getTime());
		}

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "order/cl-ign-item-list";

	}
	/*
	 * 청구제외 품목 내역
	 * 2024.09.12 yoonsang
	 */
	@RequestMapping(value = "/clIgnItemList", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clIgnItemList(@RequestParam(defaultValue = "1") int page,		@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, String ordArr, String seqArr, OrderItem i_clIgnItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN,			@RequestParam(defaultValue = "") String workingType, Model model) {

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

		// Cust i_cust = new Cust();
		i_clIgnItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("clIgnItem", i_clIgnItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		//i_param.put("ordArr", ordArr);
		//i_param.put("seqArr", seqArr);
	
		List<OrderItem> i_clIgnItemList = orderService.clIgnItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("clIgnItemList", i_clIgnItemList);
		result.put("clIgnItem", i_clIgnItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		
		model.addAllAttributes(result);
		return result;
	}
	
	/*
	 * 청구제외등록삭제
	 * 
	 */
	@RequestMapping(value = "/clIgnAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> clIgnAdd(ClReq reqSet, ClReqItem reqItemSet, @RequestParam(defaultValue = "") String dataComCode , Model model) {

		String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if (!(dataComCode).equals(logComCode) || ("").equals(dataComCode) ) {
		  HashMap<String, Object> logoutMap = new HashMap<String, Object>();
		  logoutMap.put("result_code", "DCErr"); 
		  logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다."); 
		  return  logoutMap; 
		 }
		 
		HashMap<String, Object> map = new HashMap<String, Object>();

		//StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		

		ClReqItem o_clIgnItem = new ClReqItem();
		
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("reqItem", reqItemSet);	

		o_clIgnItem = orderService.clReqItemAdd(params);
		
		if (("OK").equals(o_clIgnItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_clIgnItem.getDb_resultCode());
			map.put("result_msg", o_clIgnItem.getDb_resultMsg());
		}

		return map;

		
	}

	
}
