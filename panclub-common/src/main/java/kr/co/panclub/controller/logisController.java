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
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.panclub.model.Cust;
import kr.co.panclub.model.LogisRack;
import kr.co.panclub.model.Payment;
import kr.co.panclub.model.Ri;
import kr.co.panclub.model.RiItem;
import kr.co.panclub.model.RiReq;
import kr.co.panclub.model.RiReqItem;
import kr.co.panclub.model.Rl;
import kr.co.panclub.model.RlItem;
import kr.co.panclub.model.RlReq;
import kr.co.panclub.model.RlReqItem;
import kr.co.panclub.model.Ro;
import kr.co.panclub.model.RoItem;
import kr.co.panclub.model.RoReq;
import kr.co.panclub.model.RoReqItem;
import kr.co.panclub.model.Stock;
import kr.co.panclub.model.StockActions;
import kr.co.panclub.model.StockChk;
import kr.co.panclub.model.StockItem;
import kr.co.panclub.model.StockItemOuterNonDsp;
import kr.co.panclub.model.StockRack;
import kr.co.panclub.model.StockWr;
import kr.co.panclub.model.StockWrExcel;
import kr.co.panclub.model.StockWrItem;
import kr.co.panclub.model.StockYM;
import kr.co.panclub.model.StorMv;
import kr.co.panclub.model.StorMvItem;
import kr.co.panclub.model.StorMvReq;
import kr.co.panclub.model.StorMvReqItem;
import kr.co.panclub.model.StorageUse;
import kr.co.panclub.model.StorageUseItem;
import kr.co.panclub.model.StorageUseReq;
import kr.co.panclub.model.StorageUseReqItem;
import kr.co.panclub.model.Wh;
import kr.co.panclub.model.WhItem;
import kr.co.panclub.model.cCustPurRate;
import kr.co.panclub.model.cCustSaleDcRate;
import kr.co.panclub.service.IBaseService;
import kr.co.panclub.service.IBizService;
import kr.co.panclub.service.ILogisService;
import kr.co.panclub.service.IOrderService;

/*
 * 뮬류,창고관리 등 물류 관련 메뉴
 * */
@Controller
@RequestMapping("/logis/*")
public class logisController {

	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private ILogisService logisService;

	@Autowired
	private IOrderService orderService;

	@Autowired
	private IBaseService baseService;

	@Autowired
	private IBizService bizService;

	@Resource(name = "uploadPath_root")
	private String uploadPath_root;

	/*
	 * 창고사용요청마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/storage-use-req-list")
	public String storageUseReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String orderGroupId, Model model) {

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
		return "logis/storage-use-req-list";

	}

	/*
	 * 창고사용요청마스터 목록
	 */
	@RequestMapping(value = "/storage-use-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storageUseReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorageUseReq i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

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

		List<StorageUseReq> reqList = logisService.storageUseReqList(i_param);

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
	 * 창고사용요청상세 - 빈페이지 2022.12.15 - storageUseReqNo 파라미터 추가. 요청내역에서 상세 클릭한 경우
	 */
	@RequestMapping(value = "/storage-use-req-item-list")
	public String storageUseReqItemList(@RequestParam(defaultValue = "1") int page,
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
		return "logis/storage-use-req-item-list";
	}

	/*
	 * 창고요청 상세 목록
	 */
	@RequestMapping(value = "/storage-use-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storageUseReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorageUseReqItem i_reqItem,
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

		List<StorageUseReqItem> reqItemList = logisService.storageUseReqItemList(i_param);

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
	 * 창고사용요청품목등록 2022.12.09 - 확인등ㄹ록
	 */
	@RequestMapping(value = "/storageUseReqItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storageUseReqItemAdd(StorageUseReqItem reqItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		StorageUseReqItem o_reqItem = new StorageUseReqItem();

		params.put("workingType", reqItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("reqItem", reqItemSet);

		o_reqItem = orderService.storageUseReqItemAdd(params);

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
	 * 창고사용마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/storage-use-list")
	public String storageUseList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
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

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);

		model.addAllAttributes(result);
		return "logis/storage-use-list";

	}

	/*
	 * 창고사용마스터 목록
	 */
	@RequestMapping(value = "/storage-use-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storageUseList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorageUse i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

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

		List<StorageUse> reqList = logisService.storageUseList(i_param);

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
	 * 창고사용상세 - 빈페이지 2022.12.16 -
	 */
	@RequestMapping(value = "/storage-use-item-list")
	public String storageUseItemList(@RequestParam(defaultValue = "1") int page,
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
		return "logis/storage-use-item-list";
	}

	/*
	 * 창고 상세 목록
	 */
	@RequestMapping(value = "/storage-use-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storageUseItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorageUseItem i_reqItem,
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

		List<StorageUseItem> reqItemList = logisService.storageUseItemList(i_param);

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
	 * 이동요청마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/stor-mv-req-list")
	public String storMvReqList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String reqNo,
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

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("reqNo", reqNo);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "logis/stor-mv-req-list";

	}

	/*
	 * 이동요청마스터 목록
	 */
	@RequestMapping(value = "/stor-mv-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storMvReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorMvReq i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_req.setComCode(logComCode);

		String workingType = "";
		workingType = i_req.getWorkingType();

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

		List<StorMvReq> reqList = logisService.storMvReqList(i_param);

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
	 * 이동요청상세 - 빈페이지 2022.12.19 -
	 */
	@RequestMapping(value = "/stor-mv-req-item-list")
	public String storMvReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String orderGroupId, @RequestParam(defaultValue = "") String ordArr,
			@RequestParam(defaultValue = "") String seqArr, @RequestParam(defaultValue = "") String reqNo,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("reqNo", reqNo);

		model.addAllAttributes(result);
		return "logis/stor-mv-req-item-list";
	}

	/*
	 * 이동요청 상세 목록
	 */
	@RequestMapping(value = "/stor-mv-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storMvReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorMvReqItem i_reqItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_reqItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_reqItem.getWorkingType();

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

		List<StorMvReqItem> reqItemList = logisService.storMvReqItemList(i_param);

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
	 * 이동요청품목등록 2022.12.19 - 상세에서 저장하는 경우
	 */
	@RequestMapping(value = "/storMvReqItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storMvReqItemAdd(StorageUseReqItem reqItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		StorMvReqItem o_reqItem = new StorMvReqItem();

		params.put("workingType", reqItemSet.getWorkingType());
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

		return map;
	}

	/*
	 * 이동마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/stor-mv-list")
	public String storMvList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "logis/stor-mv-list";

	}

	/*
	 * 이동마스터 목록
	 */
	@RequestMapping(value = "/stor-mv-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storMvList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorMv i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

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

		List<StorageUse> reqList = logisService.storageUseList(i_param);

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
	 * 이동상세 - 빈페이지 2022.12.19 -
	 */
	@RequestMapping(value = "/stor-mv-item-list")
	public String storMvItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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
		return "logis/stor-mv-item-list";
	}

	/*
	 * 이동 상세 목록
	 */
	@RequestMapping(value = "/stor-mv-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storMvItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StorMvItem i_reqItem,
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

		List<StorMvItem> reqItemList = logisService.storMvItemList(i_param);

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
	 * 발주 입고 - 빈페이지 2024.04.12 hsg - placeArr, placeSeqArr 추가. 미입고품목에서 입고처리할 품목 넘겨받는
	 * 경우
	 */
	@RequestMapping(value = "/wh-up")
	public String whUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, String placeArr, String placeSeqArr, Model model) {

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
		result.put("placeArr", placeArr);
		result.put("placeSeqArr", placeSeqArr);
		// System.out.println("result:"+result);
		model.addAllAttributes(result);
		return "logis/wh-up";

	}

	/*
	 * 발주 입고 2024.04.15 hsg - 쓰이지 않는 듯해서 주석처리..
	 */
	/*
	 * @RequestMapping(value="/wh-up", method = RequestMethod.POST)
	 * 
	 * @ResponseBody public HashMap<String, Object> whUp( @RequestParam(defaultValue
	 * = "1") int page, @RequestParam(defaultValue = "10") int qty,
	 * 
	 * @RequestParam(defaultValue="") String sYmd, @RequestParam(defaultValue="")
	 * String eYmd, Place i_place, @RequestParam(defaultValue="") String
	 * ymdIgnoreYN, Model model){
	 * 
	 * String logComCode = (String) session.getAttribute("comCode"); String
	 * logUserId = (String) session.getAttribute("userId");
	 * 
	 * i_place.setComCode(logComCode);
	 * 
	 * String workingType = ""; workingType = i_place.getWorkingType(); // if
	 * (("").equals(workingType) || workingType == null ) { workingType = "LIST"; }
	 * HashMap<String,Object> i_param = new HashMap<String, Object>();
	 * i_param.put("workingType", workingType); i_param.put("logComCode",
	 * logComCode); i_param.put("logUserId", logUserId); i_param.put("place",
	 * i_place); i_param.put("sYmd1", sYmd); i_param.put("eYmd1", eYmd);
	 * i_param.put("ymdIgnoreYN", ymdIgnoreYN); List<Place> placeList =
	 * orderService.placeList(i_param);
	 * 
	 * HashMap<String, Object> result = new HashMap<String, Object>();
	 * 
	 * result.put("placeList", placeList); result.put("place", i_place);
	 * result.put("ymdIgnoreYN", ymdIgnoreYN); result.put("sYmd", sYmd);
	 * result.put("eYmd", eYmd);
	 * 
	 * 
	 * model.addAllAttributes(result); return result; }
	 */

	/*
	 * 발주입고 상세 목록 2024.04.15 hsg - i_param 에 plcArr, seqArr 추가. 미입고품목에서 발주입고로 넘어올때.
	 * 배열로 넘겨서 조회되게 하고 있음.
	 */
	@RequestMapping(value = "/wh-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> whItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, WhItem i_whItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_whItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_whItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("whItem", i_whItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("plcArr", i_whItem.getPlaceNoArr());
		i_param.put("seqArr", i_whItem.getPlaceSeqArr());

		List<WhItem> whItemList = logisService.whItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("whItemList", whItemList);
		result.put("whItem", i_whItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * changePlRlYmd 발주입고 2022.12.21
	 */
	@RequestMapping(value = "/whAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> whAdd(Wh whSet, WhItem whItemSet, Model model) {

		String workingType = whSet.getWorkingType();
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
		params.put("wh", whSet);

		Wh o_wh = new Wh();
		o_wh = logisService.whAdd(params);

		if (("OK").equals(o_wh.getDb_resultCode()) && !("DEL").equals(workingType)
				&& !("ADD_M_D").equals(workingType)) { // DEL은 마스터에서 한번에 처리, ADD_M_D 도 마스터에서 한번에 처리.
			WhItem o_whItem = new WhItem();

			whItemSet.setWhNo(o_wh.getWhNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("whItem", whItemSet);

			o_whItem = logisService.whItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_whItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_whItem.getDb_resultCode());
				map.put("result_msg", o_whItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_wh.getDb_resultCode());
			map.put("result_msg", o_wh.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 발주입고 입고가 확인 2022.12.21
	 */
	@RequestMapping(value = "/whItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> whItemAdd(Wh whSet, WhItem whItemSet, Model model) {

		String workingType = whItemSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		HashMap<String, Object> params = new HashMap<String, Object>();

		WhItem o_whItem = new WhItem();

		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("whItem", whItemSet);
		o_whItem = logisService.whItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_whItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_whItem.getDb_resultCode());
			map.put("result_msg", o_whItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 입고마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/wh-list")
	public String whList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, String orderGroupId, Model model) {

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
		return "logis/wh-list";

	}

	/*
	 * 입고내역마스터 목록
	 */
	@RequestMapping(value = "/wh-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> whList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Wh i_wh, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			Model model, @RequestParam(defaultValue = "") String ymdIgnoreYN2,
			@RequestParam(defaultValue = "") String sYmd2, @RequestParam(defaultValue = "") String eYmd2,
			String orderGroupId) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_wh.setComCode(logComCode);

		String workingType = "";
		workingType = i_wh.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("wh", i_wh);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("sYmd2", sYmd2);
		i_param.put("eYmd2", eYmd2);
		i_param.put("ymdIgnoreYN2", ymdIgnoreYN2);
		i_param.put("orderGroupId", orderGroupId);

		List<Wh> whList = logisService.whList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("whList", whList);
		result.put("wh", i_wh);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		// result.put("ymdIgnoreYN2", ymdIgnoreYN2);
		// result.put("sYmd2", sYmd2);
		// result.put("eYmd2", eYmd2);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 입고품목상세 - 빈페이지.마스터에서 클릭하는 경우 2022.12.22 - storageUseReqNo 파라미터 추가. 요청내역에서 상세
	 * 클릭한 경우 2023.08.02 bk pageMoveYN 추가
	 */
	@RequestMapping(value = "/wh-item-list")
	public String whItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String whNo, @RequestParam(defaultValue = "") String pageMoveYN,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("whNo", whNo);
		result.put("pageMoveYN", pageMoveYN);

		model.addAllAttributes(result);
		return "logis/wh-item-list";
	}

	/*
	 * 입고품목내역 - 빈페이지 2022.12.23 2023.08.04 hsg - itemId 추가. 주문품목에서 넘어오는 경우
	 */
	@RequestMapping(value = "/wh-dtl-list")
	public String whDtlList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String whNo, @RequestParam(defaultValue = "0") long itemId, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("whNo", whNo);
		result.put("itemId", itemId);

		model.addAllAttributes(result);
		return "logis/wh-dtl-list";
	}

	/*
	 * 입고 품목내역
	 */
	@RequestMapping(value = "/wh-dtl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> whDtlList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, WhItem i_whItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_whItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_whItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("whItem", i_whItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		List<WhItem> whItemList = logisService.whItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("whItemList", whItemList);
		result.put("whItem", i_whItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 발주처출고일자 변경 2023.06.29
	 * 
	 * @RequestMapping(value = "/changePlRlYmd", method = RequestMethod.POST)
	 * 
	 * @ResponseBody public HashMap<String, Object> changePlRlYmd(WhItem whItemSet ,
	 * Model model) {
	 * 
	 * 
	 * String workingType = whItemSet.getWorkingType(); String logComCode = (String)
	 * session.getAttribute("comCode"); String logUserId = (String)
	 * session.getAttribute("userId");
	 * 
	 * HashMap<String, Object> map = new HashMap<String, Object>();
	 * 
	 * HashMap<String,Object> params = new HashMap<String, Object>();
	 * 
	 * params.put("workingType",workingType); params.put("logComCode",logComCode);
	 * params.put("logUserId",logUserId); params.put("whItem",whItemSet);
	 * 
	 * //System.out.println("params1 : " + params); WhItem o_whItem = new WhItem();
	 * o_whItem = logisService.whItemAdd(params);
	 * 
	 * if (("OK").equals(o_whItem.getDb_resultCode())) { map.put("result_code",
	 * "OK"); map.put("result_msg", "처리되었습니다."); }else { map.put("result_code",
	 * o_whItem.getDb_resultCode()); map.put("result_msg",
	 * o_whItem.getDb_resultMsg()); }
	 * 
	 * 
	 * return map; }
	 */

	/*
	 * 입고일자 변경 2023.08.01
	 */
	@RequestMapping(value = "/changeWhYmd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> changePlRlYmd(Wh whSet, Model model) {

		String workingType = whSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		HashMap<String, Object> params = new HashMap<String, Object>();

		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("wh", whSet);

		// System.out.println("params1 : " + params);
		Wh o_wh = new Wh();
		o_wh = logisService.whAdd(params);

		if (("OK").equals(o_wh.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_wh.getDb_resultCode());
			map.put("result_msg", o_wh.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 반출일자 변경 2023.08.02
	 */
	@RequestMapping(value = "/changeRoYmd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> changePlRlYmd(Ro roSet, Model model) {

		String workingType = roSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		HashMap<String, Object> params = new HashMap<String, Object>();

		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("ro", roSet);

		Ro o_ro = new Ro();
		o_ro = logisService.roAdd(params);

		if (("OK").equals(o_ro.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_ro.getDb_resultCode());
			map.put("result_msg", o_ro.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 출고요청 - 빈페이지 2022.12.27 -
	 */
	@RequestMapping(value = "/rl-req-up")
	public String rlReqUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String rlReqNo, String stdClType, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("rlReqNo", rlReqNo);

		result.put("stdClType", stdClType); // 230705

		model.addAllAttributes(result);
		return "logis/rl-req-up";
	}

	/*
	 * 출고 요청등록 등록 2023.07.14 hsg - 로그인한 업체의 데이터인지 체크 후 리턴
	 */
	@RequestMapping(value = "/rlReqAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlReqAdd(RlReq reqSet, RlReqItem reqItemSet,
			@RequestParam(defaultValue = "") String dataComCode, Model model) {

		String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if (!(dataComCode).equals(logComCode) || ("").equals(dataComCode)) {
			/*
			 * HttpServletResponse response = null; Cookie reComCodeSave = new
			 * Cookie("pA14Cc09S22", null); reComCodeSave.setMaxAge(0);
			 * response.addCookie(reComCodeSave); //세션값 소멸
			 * session.removeAttribute("comCode"); //회사코드 session.removeAttribute("userId");
			 * //사용자아이디 session.removeAttribute("comName");
			 * session.removeAttribute("userName");
			 */
			HashMap<String, Object> logoutMap = new HashMap<String, Object>();
			logoutMap.put("result_code", "DCErr");
			logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
			return logoutMap;
		}

		HashMap<String, Object> map = new HashMap<String, Object>();

		StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("req", reqSet);
		// System.out.println("reqSet : " + reqSet);

		RlReq o_rlReq = new RlReq();
		o_rlReq = logisService.rlReqAdd(params);

		if (("OK").equals(o_rlReq.getDb_resultCode())) {
			RlReqItem o_rlReqItem = new RlReqItem();

			reqItemSet.setRlReqNo(o_rlReq.getRlReqNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("reqItem", reqItemSet);

			o_rlReqItem = logisService.rlReqItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_rlReqItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_rlReqItem.getDb_resultCode());
				map.put("result_msg", o_rlReqItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_rlReq.getDb_resultCode());
			map.put("result_msg", o_rlReq.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 출고 요청등록 등록
	 */
	@RequestMapping(value = "/rlReqUpt", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlReqUpt(RlReq reqSet, Model model) {

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

		RlReq o_rlReq = new RlReq();
		o_rlReq = logisService.rlReqAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_rlReq.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_rlReq.getDb_resultCode());
			map.put("result_msg", o_rlReq.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 출고요청마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/rl-req-list")
	public String rlReqList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			String doubleClickYN, Model model) {

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
		result.put("doubleClickYN", doubleClickYN);

		model.addAllAttributes(result);
		return "logis/rl-req-list";

	}

	/*
	 * 출고요청마스터 목록 0720 rlDate 추가 미출고 일자
	 */
	@RequestMapping(value = "/rl-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RlReq i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

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

		List<RlReq> reqList = logisService.rlReqList(i_param);

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
	 * 출고요청상세 - 빈페이지 2022.12.27
	 */
	@RequestMapping(value = "/rl-req-item-list")
	public String rlReqItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String rlReqNo, @RequestParam(defaultValue = "") String gvComCode,
			@RequestParam(defaultValue = "") String stdClType, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		//
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("rlReqNo", rlReqNo);
		result.put("gvComCode", gvComCode);
		result.put("stdClType", stdClType);

		model.addAllAttributes(result);
		return "logis/rl-req-item-list";
	}

	/*
	 * 출고요청 상세 목록
	 */
	@RequestMapping(value = "/rl-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RlReqItem i_reqItem,
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

		List<RlReqItem> reqItemList = logisService.rlReqItemList(i_param);

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
	 * 출고요청품목등록 2022.12.27
	 */
	@RequestMapping(value = "/rlReqItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlReqItemAdd(RlReqItem reqItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		RlReqItem o_reqItem = new RlReqItem();

		params.put("workingType", reqItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("reqItem", reqItemSet);

		o_reqItem = logisService.rlReqItemAdd(params);

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
	 * 견적 : GET방식 2023.04.14 - 출고요청서 인쇄페이지 bk 2023.11.20 supi 품번인쇄에 rlReqItemList 작업
	 */
	@RequestMapping(value = "/rl-req-item-list-print", method = RequestMethod.GET)
	public String estiUpPrint(String redirect_target, RlReq i_req, String memoYN, String printDcYN, String printYN,
			String itemNoOderBy, String gvComCode, Model model) {

		/* 출고요청 정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		String realComCode = "";
		if (("").equals(gvComCode) || gvComCode == null) {
			realComCode = logComCode;
		} else {
			realComCode = gvComCode;
		}

		i_param.put("workingType", "LIST");
		// i_param.put("logComCode", logComCode);
		i_param.put("logComCode", realComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("req", i_req);
		i_param.put("printYN", printYN);
		i_param.put("gvComCode", gvComCode);

		RlReq o_req = logisService.reqOne(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("req", o_req);

		// 출고요청 품목정보 */

		HashMap<String, Object> i_param2 = new HashMap<String, Object>();

		RlReqItem i_reqItem = new RlReqItem();

		i_reqItem.setRlReqNo(i_req.getRlReqNo());
		i_param2.put("workingType", "LIST");
		// i_param2.put("logComCode", logComCode);
		i_param2.put("logComCode", realComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("reqItem", i_reqItem);

		i_param2.put("orderBy", "itemNoOderBy " + itemNoOderBy);
		i_param2.put("gvComCode", gvComCode);

		List<RlReqItem> reqItemList = logisService.rlReqItemList(i_param2);

		o_params.put("reqItemList", reqItemList);

		// 거래처정보
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();

		Cust i_cust = new Cust();
		/*
		 * i_cust.setComCode(logComCode); i_cust.setCustCode(logComCode);
		 */

		i_cust.setComCode(realComCode);
		i_cust.setCustCode(realComCode);

		i_param3.put("workingType", "PAN_LIST");
		// i_param3.put("logComCode", logComCode);
		i_param3.put("logComCode", realComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param3);

		o_params.put("custList", o_custList);

		// 거래처정보
		HashMap<String, Object> i_param4 = new HashMap<String, Object>();

		Cust i_cust2 = new Cust();
		// i_cust2.setComCode(logComCode);
		i_cust2.setComCode(realComCode);
		i_cust2.setCustCode(o_req.getSaleCustCode());

		i_param4.put("workingType", "LIST");
		// i_param4.put("logComCode", logComCode);
		i_param4.put("logComCode", realComCode);
		i_param4.put("logUserId", logUserId);
		i_param4.put("cust", i_cust2);

		List<Cust> o_custList2 = baseService.custList(i_param4);

		o_params.put("custList2", o_custList2);

		HashMap<String, Object> i_param5 = new HashMap<String, Object>();

		Payment i_payment = new Payment();

		i_param5.put("workingType", "LIST");
		i_param5.put("payment", i_payment);
		// i_param5.put("logComCode", logComCode);
		i_param5.put("logComCode", realComCode);
		i_param5.put("logUserId", logUserId);

		List<Payment> paymentList = bizService.paymentList(i_param5);
		List<Payment> paymentList2 = new ArrayList();

		for (int i = 0, len = paymentList.size(); i < len; i++) {

			if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
					&& ("Y").equals(paymentList.get(i).getCommonDpYN())) {

				paymentList2.add(paymentList.get(i));

			}
		}

		o_params.put("paymentList2", paymentList2);
		o_params.put("printDcYN", printDcYN);

		model.addAllAttributes(o_params);

		return "logis/rl-req-item-list-print";
	}

	/*
	 * 출고 2022.12.27 2024.09.12 supi - 마스터정보와 디테일 정보를 모두 넣어서 한번에 처리하는것을 마스터 정보에 대한
	 * 처리와 마스터의 rlno을 반환하는식으로 수정. js에서 여기서 받은 rlno을 기반으로 디테일 개별 통신
	 */
	@RequestMapping(value = "/rlAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlAdd(Rl rlSet, Model model) {
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		HashMap<String, Object> params = new HashMap<String, Object>();
		// 매개변수 셋팅
		params.put("workingType", rlSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("rl", rlSet);

		Rl rl = logisService.rlAdd(params);

		result.put("result_code", rl.getDb_resultCode());
		result.put("result_msg", rl.getDb_resultMsg());
		result.put("rlno", rl.getRlNo());

//		if (("OK").equals(rl.getDb_resultCode())) {
//			RlItem o_rlItem = new RlItem();
//			
//			rlItemSet.setRlNo(o_rl.getRlNo());
//			params.put("workingType", workingType);
//			params.put("logComCode",logComCode);
//			params.put("logUserId",logUserId);
//			params.put("rlItem", rlItemSet);
//			
//			//System.out.println("params : " + params);
//		
//			o_rlItem = logisService.rlItemAdd(params);
//
//			// 결과 만들기
//			//map.put("orderNo", o_order.getOrderNo());
//			if (("OK").equals(o_rlItem.getDb_resultCode())) {
//			    map.put("result_code", "OK");
//			    map.put("result_msg", "처리되었습니다.");
//			}else {
//				map.put("result_code", o_rlItem.getDb_resultCode());
//				map.put("result_msg", o_rlItem.getDb_resultMsg());
//			}    
//		}else {
//			map.put("result_code", o_rl.getDb_resultCode());
//			map.put("result_msg", o_rl.getDb_resultMsg());
//		}

		return result;

	}
	/*
	 * 출고요청취소 2023.04.13 yoonsang
	 */

	@RequestMapping(value = "/rlItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlItemAdd(RlItem rlItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		RlItem o_rlItem = new RlItem();

		params.put("workingType", rlItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("rlItem", rlItemSet);

		o_rlItem = logisService.rlItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_rlItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_rlItem.getDb_resultCode());
			map.put("result_msg", o_rlItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 출고마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/rl-list")
	public String rlList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			String doubleClickYN, Model model) {

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
		result.put("doubleClickYN", doubleClickYN);

		model.addAllAttributes(result);
		return "logis/rl-list";

	}

	/*
	 * 출고내역마스터 목록 2023.07.26 bk rlDateType 추가
	 */
	@RequestMapping(value = "/rl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Rl i_rl, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String rlDateType, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_rl.setComCode(logComCode);

		String workingType = "";
		workingType = i_rl.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("rl", i_rl);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("rlDateType", rlDateType);

		List<Rl> rlList = logisService.rlList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("rlList", rlList);
		result.put("rl", i_rl);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 출고품목상세 - 빈페이지.마스터에서 클릭하는 경우 2022.12.27 pageMoveYN 추가 bk
	 */
	@RequestMapping(value = "/rl-item-list")
	public String rlItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String rlNo, String outDead, String claimType, String pageMoveYN,
			String gvComCode, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("rlNo", rlNo);
		result.put("outDead", outDead);
		result.put("claimType", claimType);
		result.put("pageMoveYN", pageMoveYN);
		result.put("gvComCode", gvComCode);

		// System.out.println("claimType"+claimType);
		model.addAllAttributes(result);
		return "logis/rl-item-list";
	}

	/*
	 * 출고품목내역 - 빈페이지 2022.12.27
	 */
	@RequestMapping(value = "/rl-dtl-list")
	public String rlDtlList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String rlNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("rlNo", rlNo);

		model.addAllAttributes(result);
		return "logis/rl-dtl-list";
	}

	/*
	 * 출고 상세 목록
	 */
	@RequestMapping(value = "/rl-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RlItem i_rlItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String claimType,
			Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_rlItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_rlItem.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("rlItem", i_rlItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("claimType", claimType);

		List<RlItem> rlItemList = logisService.rlItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("rlItemList", rlItemList);
		result.put("rlItem", i_rlItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("claimType", claimType);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 출고 품목내역
	 */
	@RequestMapping(value = "/rl-dtl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlDtlList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RlItem i_rlItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_rlItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_rlItem.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("rlItem", i_rlItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<RlItem> rlItemList = logisService.rlItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("rlItemList", rlItemList);
		result.put("rlItem", i_rlItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 
	 * 2023.04.14 - 출고 인쇄페이지 bk 2023.08.30 - printMemoYN 추가 bk 2023.09.20 -
	 * deliveryYN 추가 bk 2023.11.20 supi 품번인쇄에 rlReqItemList 작업 2024.11.04 hsg -
	 * chnLogCust 추가. chnLogCust가 있는 경우 realComCode = chnLogCust. 인쇄시 변경된 공급자. 팬오토에
	 * 등록되었으나 케이에스등에서 세금계산서 발행한 경우 공급자가 케이에스여야 해서..
	 */
	@RequestMapping(value = "/rl-item-list-print", method = RequestMethod.GET)
	public String rlItemListPrint(String redirect_target, Rl i_rl, String printDcYN, String printMemoYN,
			String deliveryYN, String itemNoOderBy, String gvComCode,
			@RequestParam(defaultValue = "") String chnLogCust, Model model) {

		/* 출고요청 정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		// System.out.println("gvComCode :" + gvComCode);
		String realComCode = "";
		if (("").equals(gvComCode) || gvComCode == null) {
			realComCode = logComCode;
		} else {
			realComCode = gvComCode;
		}

		i_param.put("workingType", "LIST");
		// i_param.put("logComCode", logComCode);
		i_param.put("logComCode", realComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("rl", i_rl);
		i_param.put("gvComCode", gvComCode);

		Rl o_rI = logisService.rlOne(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("ri", o_rI);

		// 출고요청 품목정보 */
		HashMap<String, Object> i_param2 = new HashMap<String, Object>();

		RlItem i_rlItem = new RlItem();

		i_rlItem.setRlNo(i_rl.getRlNo());

		i_param2.put("workingType", "LIST");
		// i_param2.put("logComCode", logComCode);
		i_param2.put("logComCode", realComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("rlItem", i_rlItem);
		i_param2.put("gvComCode", gvComCode);

		i_param2.put("orderBy", "itemNoOderBy " + itemNoOderBy);
		List<RlItem> rlItemList = logisService.rlItemList(i_param2);

		o_params.put("rlItemList", rlItemList);

		// 거래처정보
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();

		// 2024.11.04 hsg
		if (chnLogCust.equals("")) {
			chnLogCust = realComCode;
		}
		// System.out.println("c:"+chnLogCust);
		// System.out.println("r:"+realComCode);

		Cust i_cust = new Cust();
		// i_cust.setComCode(logComCode);
		// i_cust.setCustCode(logComCode);
		// i_cust.setComCode(realComCode);
		// i_cust.setCustCode(realComCode);
		// 2024.11.04 hsg -위 2개를 이걸로 바꿈
		i_cust.setComCode(chnLogCust);
		i_cust.setCustCode(chnLogCust);

		i_param3.put("workingType", "PAN_LIST");
		// i_param3.put("logComCode", logComCode);
		// i_param3.put("logComCode", realComCode);
		i_param3.put("logComCode", chnLogCust); // 2024.11.04 hsg -위를 이걸로 바꿈
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);

		List<Cust> o_custList = baseService.custList(i_param3);

		o_params.put("custList", o_custList);

		// 거래처정보
		HashMap<String, Object> i_param4 = new HashMap<String, Object>();

		Cust i_cust2 = new Cust();
		// i_cust2.setComCode(logComCode);
		i_cust2.setComCode(realComCode);
		i_cust2.setCustCode(o_rI.getCustCode());

		i_param4.put("workingType", "LIST");
		// i_param4.put("logComCode", logComCode);
		i_param4.put("logComCode", realComCode);
		i_param4.put("logUserId", logUserId);
		i_param4.put("cust", i_cust2);

		List<Cust> o_custList2 = baseService.custList(i_param4);

		o_params.put("custList2", o_custList2);

		HashMap<String, Object> i_param5 = new HashMap<String, Object>();

		Payment i_payment = new Payment();

		i_param5.put("workingType", "LIST");
		i_param5.put("payment", i_payment);
		// i_param5.put("logComCode", logComCode);
		i_param5.put("logComCode", realComCode);
		i_param5.put("logUserId", logUserId);

		List<Payment> paymentList = bizService.paymentList(i_param5);
		List<Payment> paymentList2 = new ArrayList();

		for (int i = 0, len = paymentList.size(); i < len; i++) {

			if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
					&& ("Y").equals(paymentList.get(i).getCommonDpYN())) {

				paymentList2.add(paymentList.get(i));

			}
		}

		o_params.put("paymentList2", paymentList2);
		o_params.put("printDcYN", printDcYN);
		o_params.put("printMemoYN", printMemoYN);
		o_params.put("deliveryYN", deliveryYN);

		model.addAllAttributes(o_params);

		return "logis/rl-item-list-print";
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*
	 * 반입요청 - 빈페이지 2022.12.30 -
	 */
	@RequestMapping(value = "/ri-req-up")
	public String riReqUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String riReqNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("riReqNo", riReqNo);

		model.addAllAttributes(result);
		return "logis/ri-req-up";
	}

	/*
	 * 반출요청 - 빈페이지 2022.12.30 -
	 */
	@RequestMapping(value = "/ro-req-up")
	public String roReqUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String roReqNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("roReqNo", roReqNo);

		model.addAllAttributes(result);
		return "logis/ro-req-up";
	}

	/////////////////////////////////////////////////////////////////

	/*
	 * 반입요청등록
	 * 
	 * @RequestMapping(value = "/riReqAdd")
	 * 
	 * @ResponseBody public HashMap<String, Object>
	 * riReqAdd(@RequestParam("attaFile") MultipartFile multipartFile,
	 * MultipartHttpServletRequest requestFile,
	 * 
	 * @RequestParam(defaultValue = "") String
	 * workingType, @RequestParam(defaultValue = "") String
	 * orderGroupId, @RequestParam(defaultValue = "") String receiver,
	 * 
	 * @RequestParam(defaultValue = "") String memo, @RequestParam(defaultValue =
	 * "") String dmdYmd, @RequestParam(defaultValue = "") String dmdTime,
	 * 
	 * @RequestParam(defaultValue = "") String riWay, @RequestParam(defaultValue =
	 * "") String storageCode, @RequestParam(defaultValue = "") String custCode,
	 * // @RequestParam(defaultValue = "") String data.append("attaFile", files[0]);
	 * 
	 * @RequestParam(defaultValue = "") String rlArr, @RequestParam(defaultValue =
	 * "") String seqArr, @RequestParam(defaultValue = "") String cntArr,
	 * 
	 * @RequestParam(defaultValue = "") String mm1Arr, @RequestParam(defaultValue =
	 * "") String mm2Arr //@RequestBody RiReq reqSet, @RequestParam RiReqItem
	 * reqItemSet ) {
	 * 
	 * RiReq reqSet = new RiReq(); RiReqItem reqItemSet = new RiReqItem();
	 * reqSet.setWorkingType(workingType); reqSet.setOrderGroupId(orderGroupId);
	 * reqSet.setReceiver(receiver); reqSet.setMemo1(memo);
	 * reqSet.setDmdYmd(dmdYmd); reqSet.setDmdTime(dmdTime); reqSet.setRiWay(riWay);
	 * reqSet.setStorageCode(storageCode); reqSet.setCustCode(custCode);
	 * 
	 * reqItemSet.setWorkingType(workingType); reqItemSet.setRlArr(rlArr);
	 * reqItemSet.setSeqArr(seqArr); reqItemSet.setCntArr(cntArr);
	 * reqItemSet.setMm1Arr( mm1Arr); reqItemSet.setMm2Arr(mm2Arr);
	 * 
	 * 
	 * 
	 * 
	 * //String workingType = reqSet.getWorkingType(); String logComCode = (String)
	 * session.getAttribute("comCode"); String logUserId = (String)
	 * session.getAttribute("userId");
	 * 
	 * String fileRoot =
	 * "D:\\WebService\\fileUpload\\panClub\\"+logComCode+"\\ri\\"; //저장될 외부 파일 경로
	 * String fileRoot_thumb =
	 * "D:\\WebService\\fileUpload\\panClub\\"+logComCode+"\\ri_thumb\\"; //저장될 외부
	 * 파일 경로 File Folder = new File(fileRoot); File Folder_thumb = new
	 * File(fileRoot_thumb);
	 * 
	 * //폴더 없는 경우 생성 if (!Folder.exists()) { try { Folder.mkdir(); } catch
	 * (Exception e) { e.printStackTrace(); } } if (!Folder_thumb.exists()) { try {
	 * Folder_thumb.mkdir(); } catch (Exception e) { e.printStackTrace(); } }
	 * 
	 * List<MultipartFile> fileList = requestFile.getFiles("attaFile");
	 * 
	 * int attachCnt = 0; if (multipartFile.getSize() > 0) { attachCnt
	 * =fileList.size(); }
	 * 
	 * 
	 * String originalFileName = multipartFile.getOriginalFilename(); //오리지날 파일명
	 * String extension =
	 * originalFileName.substring(originalFileName.lastIndexOf(".")); //파일 확장자
	 * 
	 * String savedFileName_UI = UUID.randomUUID().toString(); String savedFileName
	 * = savedFileName_UI + extension; //저장될 파일 명
	 * 
	 * 
	 * 
	 * File targetFile = new File(fileRoot + savedFileName);
	 * 
	 * long fileSize = multipartFile.getSize();
	 * 
	 * HashMap<String, Object> o_rotate = new HashMap<String, Object>(); String
	 * rotateName = ""; long rotateSize =0; String rotateYN = "N";
	 * 
	 * HashMap<String, Object> o_thumbnail = new HashMap<String, Object>(); String
	 * thumbnailName = ""; long thumbnailSize =0;
	 * 
	 * HashMap<String, Object> map = new HashMap<String, Object>();
	 * 
	 * try { InputStream fileStream = multipartFile.getInputStream();
	 * FileUtils.copyInputStreamToFile(fileStream, targetFile); //파일 저장
	 * 
	 * StorageUseReqItem reqItem = null;
	 * 
	 * //마스터 등록 HashMap<String,Object> params = new HashMap<String, Object>();
	 * //custSet.setCustCode(comCode); reqSet.setAttaFile(savedFileName);
	 * reqSet.setAttaFileOri(originalFileName);
	 * 
	 * params.put("workingType",workingType); params.put("logComCode",logComCode);
	 * params.put("logUserId",logUserId); params.put("req",reqSet);
	 * 
	 * 
	 * RiReq o_riReq = new RiReq(); o_riReq = logisService.riReqAdd(params);
	 * 
	 * 
	 * 
	 * if (("OK").equals(o_riReq.getDb_resultCode())) { RiReqItem o_riReqItem = new
	 * RiReqItem();
	 * 
	 * reqItemSet.setRiReqNo(o_riReq.getRiReqNo()); params.put("workingType",
	 * workingType); params.put("logComCode",logComCode);
	 * params.put("logUserId",logUserId); params.put("reqItem", reqItemSet);
	 * 
	 * 
	 * 
	 * o_riReqItem = logisService.riReqItemAdd(params);
	 * 
	 * // 결과 만들기 //map.put("orderNo", o_order.getOrderNo()); if
	 * (("OK").equals(o_riReqItem.getDb_resultCode())) { map.put("result_code",
	 * "OK"); map.put("result_msg", "처리되었습니다."); }else { map.put("result_code",
	 * o_riReqItem.getDb_resultCode()); map.put("result_msg",
	 * o_riReqItem.getDb_resultMsg()); } }else { map.put("result_code",
	 * o_riReq.getDb_resultCode()); map.put("result_msg",
	 * o_riReq.getDb_resultMsg()); }
	 * 
	 * } catch (IOException e) { FileUtils.deleteQuietly(targetFile); //저장된 파일 삭제
	 * map.put("result_code", "Err"); map.put("result_msg", " 첨부파일 저장 오류");
	 * e.printStackTrace(); }
	 * 
	 * // 콘솔로 찍어보기
	 * 
	 * //logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
	 * //addList.toString()); logger.info("삭제 : " + removeList.toString());
	 * 
	 * 
	 * return map; }
	 */

	/*
	 * 출고 요청등록 등록 2023.07.17 hsg - 로그인한 업체의 데이터인지 체크 후 리턴
	 */
	@RequestMapping(value = "/riReqAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riReqAdd(RiReq reqSet, RiReqItem reqItemSet,
			@RequestParam(defaultValue = "") String dataComCode, Model model) {

		String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if (!(dataComCode).equals(logComCode) || ("").equals(dataComCode)) {
			HashMap<String, Object> logoutMap = new HashMap<String, Object>();
			logoutMap.put("result_code", "DCErr");
			logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
			return logoutMap;
		}

		HashMap<String, Object> map = new HashMap<String, Object>();

		StorageUseReqItem reqItem = null;

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("req", reqSet);

		RiReq o_riReq = new RiReq();
		o_riReq = logisService.riReqAdd(params);

		if (("OK").equals(o_riReq.getDb_resultCode())) {
			RiReqItem o_riReqItem = new RiReqItem();

			reqItemSet.setRiReqNo(o_riReq.getRiReqNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("reqItem", reqItemSet);

			o_riReqItem = logisService.riReqItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_riReqItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_riReqItem.getDb_resultCode());
				map.put("result_msg", o_riReqItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_riReq.getDb_resultCode());
			map.put("result_msg", o_riReq.getDb_resultMsg());
		}
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 반입요청마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/ri-req-list")
	public String riReqList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			String doubleClickYN, Model model) {

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
		result.put("doubleClickYN", doubleClickYN);

		model.addAllAttributes(result);
		return "logis/ri-req-list";

	}

	/*
	 * 반입요청마스터 목록
	 */
	@RequestMapping(value = "/ri-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RiReq i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_req.setComCode(logComCode);

		String workingType = "";
		workingType = i_req.getWorkingType();

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

		List<RiReq> reqList = logisService.riReqList(i_param);

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
	 * 반입요청상세 - 빈페이지 2023.01.02
	 */
	@RequestMapping(value = "/ri-req-item-list")
	public String riReqItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String riReqNo, String gvComCode, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("riReqNo", riReqNo);
		result.put("gvComCode", gvComCode);

		model.addAllAttributes(result);
		return "logis/ri-req-item-list";
	}

	/*
	 * 반입요청 상세 목록
	 */
	@RequestMapping(value = "/ri-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RiReqItem i_reqItem,
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

		List<RiReqItem> reqItemList = logisService.riReqItemList(i_param);

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
	 * 반입요청인쇄 - 빈페이지 2023.04.26
	 */

	/*
	 * @RequestMapping(value="/ri-req-item-list-print") public String
	 * riReqItemListPrint( @RequestParam(defaultValue = "1") int
	 * page, @RequestParam(defaultValue = "10") int qty,
	 * 
	 * @RequestParam(defaultValue="") String sYmd, @RequestParam(defaultValue="")
	 * String eYmd,
	 * 
	 * @RequestParam(defaultValue="") String
	 * ymdIgnoreYN, @RequestParam(defaultValue="") String orderGroupId,
	 * 
	 * @RequestParam(defaultValue="") String ordArr, @RequestParam(defaultValue="")
	 * String seqArr,
	 * 
	 * @RequestParam(defaultValue="") String riReqNo, Model model){
	 * 
	 * HashMap<String, Object> result = new HashMap<String, Object>();
	 * 
	 * result.put("ymdIgnoreYN", ymdIgnoreYN); result.put("sYmd", sYmd);
	 * result.put("eYmd", eYmd); result.put("orderGroupId", orderGroupId);
	 * result.put("ordArr", ordArr); result.put("seqArr", seqArr);
	 * result.put("riReqNo", riReqNo);
	 * 
	 * model.addAllAttributes(result); return "logis/ri-req-item-list-print"; }
	 */
	/*
	 * 견적 : GET방식 2023.04.26 - 반입요청서 인쇄페이지 bk
	 */
	@RequestMapping(value = "/ri-req-item-list-print", method = RequestMethod.GET)
	public String riReqItemListPrint(String redirect_target, RiReq i_req, String memoYN, String gvComCode,
			Model model) {

		/* 출고요청 정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		String realComCode = "";
		if (("").equals(gvComCode) || gvComCode == null) {
			realComCode = logComCode;
		} else {
			realComCode = gvComCode;
		}

		i_param.put("workingType", "LIST");
		// i_param.put("logComCode", logComCode);
		i_param.put("logComCode", realComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("req", i_req);
		i_param.put("gvComCode", gvComCode);

		RiReq o_req = logisService.rireqOne(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("req", o_req);

		// 반입요청 품목정보 */

		HashMap<String, Object> i_param2 = new HashMap<String, Object>();

		RiReqItem i_reqItem = new RiReqItem();

		i_reqItem.setRiReqNo(i_req.getRiReqNo());
		i_param2.put("workingType", "LIST");
		// i_param2.put("logComCode", logComCode);
		i_param2.put("logComCode", realComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("reqItem", i_reqItem);

		List<RiReqItem> reqItemList = logisService.riReqItemList(i_param2);

		o_params.put("reqItemList", reqItemList);

		model.addAllAttributes(o_params);

		return "logis/ri-req-item-list-print";
	}

	/*
	 * 반입 2023.01.02
	 */
	@RequestMapping(value = "/riAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riAdd(Ri riSet, RiItem riItemSet, Model model) {

		String workingType = riSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("ri", riSet);

		Ri o_ri = new Ri();
		o_ri = logisService.riAdd(params);

		if (("OK").equals(o_ri.getDb_resultCode())) {
			RiItem o_riItem = new RiItem();

			riItemSet.setRiNo(o_ri.getRiNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("riItem", riItemSet);

			o_riItem = logisService.riItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_riItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_riItem.getDb_resultCode());
				map.put("result_msg", o_riItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_ri.getDb_resultCode());
			map.put("result_msg", o_ri.getDb_resultMsg());
		}

		return map;
	}
	/*
	 * 반입요청취소 2023.04.18 yoonsang
	 */

	@RequestMapping(value = "/riItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riItemAdd(RiItem riItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		RiItem o_riItem = new RiItem();

		params.put("workingType", riItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("riItem", riItemSet);

		o_riItem = logisService.riItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_riItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_riItem.getDb_resultCode());
			map.put("result_msg", o_riItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 반입마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/ri-list")
	public String riList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			String doubleClickYN, Model model) {

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
		result.put("doubleClickYN", doubleClickYN);

		model.addAllAttributes(result);
		return "logis/ri-list";

	}

	/*
	 * 반입내역마스터 목록
	 */
	@RequestMapping(value = "/ri-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Ri i_ri, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String riDateType, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_ri.setComCode(logComCode);

		String workingType = "";
		workingType = i_ri.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("ri", i_ri);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("riDateType", riDateType);

		List<Ri> riList = logisService.riList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("riList", riList);
		result.put("ri", i_ri);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 반입품목상세 - 빈페이지.마스터에서 클릭하는 경우 2023.01.02 2023.08.02 bk pageMoveYN 추가
	 */
	@RequestMapping(value = "/ri-item-list")
	public String riItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String riNo, @RequestParam(defaultValue = "") String pageMoveYN,
			String gvComCode, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("riNo", riNo);
		result.put("pageMoveYN", pageMoveYN);
		result.put("gvComCode", gvComCode);

		model.addAllAttributes(result);
		return "logis/ri-item-list";
	}

	/*
	 * 반입품목내역 - 빈페이지 2023.01.02
	 */
	@RequestMapping(value = "/ri-dtl-list")
	public String riDtlList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String riNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("riNo", riNo);

		model.addAllAttributes(result);
		return "logis/ri-dtl-list";
	}

	/*
	 * 반입 상세 목록
	 */
	@RequestMapping(value = "/ri-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RiItem i_riItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_riItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_riItem.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("riItem", i_riItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<RiItem> riItemList = logisService.riItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("riItemList", riItemList);
		result.put("riItem", i_riItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 반입 품목내역
	 */
	@RequestMapping(value = "/ri-dtl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riDtlList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RiItem i_riItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_riItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_riItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("riItem", i_riItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<RiItem> riItemList = logisService.riItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("riItemList", riItemList);
		result.put("riItem", i_riItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	///////////////////////////////////////////////////////////////////////////////

	/*
	 * 반출요청등록 2023.05.24 hsg - rackCode 추가 2023.07.14 hsg - 로그인한 업체의 데이터인지 체크 후 리턴
	 */
	@RequestMapping(value = "/roReqAdd")
	@ResponseBody
	public HashMap<String, Object> roReqAdd(@RequestParam("attaFile") MultipartFile multipartFile,
			MultipartHttpServletRequest requestFile, @RequestParam(defaultValue = "") String workingType,
			@RequestParam(defaultValue = "") String orderGroupId, @RequestParam(defaultValue = "") String receiver,
			@RequestParam(defaultValue = "") String memo, @RequestParam(defaultValue = "") String dmdYmd,
			@RequestParam(defaultValue = "") String dmdTime, @RequestParam(defaultValue = "") String roWay,
			@RequestParam(defaultValue = "") String storageCode, @RequestParam(defaultValue = "") String custCode,
			// @RequestParam(defaultValue = "") String data.append("attaFile", files[0]);
			@RequestParam(defaultValue = "") String odArr, @RequestParam(defaultValue = "") String odSeqArr,
			@RequestParam(defaultValue = "") String cntArr, @RequestParam(defaultValue = "") String mm1Arr,
			@RequestParam(defaultValue = "") String mm2Arr, @RequestParam(defaultValue = "") String plArr,
			@RequestParam(defaultValue = "") String plSeqArr, @RequestParam(defaultValue = "") String rackCode,
			@RequestParam(defaultValue = "") String dataComCode,
			@RequestParam(defaultValue = "") String toOrderReqPlaceYNArr
	// @RequestBody RiReq reqSet, @RequestParam RiReqItem reqItemSet
	) {

		RoReq reqSet = new RoReq();
		RoReqItem reqItemSet = new RoReqItem();
		// RoReqAtt attSet = new RoReqAtt();

		reqSet.setWorkingType(workingType);
		reqSet.setOrderGroupId(orderGroupId);
		reqSet.setReceiver(receiver);
		reqSet.setMemo1(memo);
		reqSet.setDmdYmd(dmdYmd);
		reqSet.setDmdTime(dmdTime);
		reqSet.setRoWay(roWay);
		reqSet.setStorageCode(storageCode);
		reqSet.setCustCode(custCode);
		reqSet.setRackCode(rackCode);

		reqItemSet.setWorkingType(workingType);
		// reqItemSet.setRiArr(riArr);
		// reqItemSet.setSeqArr(seqArr);
		reqItemSet.setCntArr(cntArr);
		reqItemSet.setMm1Arr(mm1Arr);
		reqItemSet.setMm2Arr(mm2Arr);
		reqItemSet.setOdArr(odArr);
		reqItemSet.setOdSeqArr(odSeqArr);
		reqItemSet.setPlArr(plArr);
		reqItemSet.setPlSeqArr(plSeqArr);
		reqItemSet.setToOrderReqPlaceYNArr(toOrderReqPlaceYNArr);

		List<MultipartFile> fileList = requestFile.getFiles("attaFile");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// String workingType = reqSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		if (!(dataComCode).equals(logComCode) || ("").equals(dataComCode)) {
			HashMap<String, Object> logoutMap = new HashMap<String, Object>();
			logoutMap.put("result_code", "DCErr");
			logoutMap.put("result_msg", " 처리할 수 없습니다. 현재 페이지를 리로딩 합니다.\n마지막으로 로그인한 업체의 데이터가 아닙니다.");
			return logoutMap;
		}

		int attachCnt = 0;
		int attErrCnt = 0;

		if (multipartFile.getSize() > 0) {
			attachCnt = fileList.size();
		}

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);

		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("req", reqSet);

		RoReq o_roReq = new RoReq();
		o_roReq = logisService.roReqAdd(params);

		if (("OK").equals(o_roReq.getDb_resultCode())) {

			if (attachCnt > 0) {

				String[] savedFileNameList = new String[fileList.size()];
				String[] originalFileNameList = new String[fileList.size()];
				for (int i = 0, len = fileList.size(); i < len; i++) {

					String fileRoot = "D:\\WebService\\fileUpload\\panClub\\" + logComCode + "\\ro\\"; // 저장될 외부 파일 경로
					String fileRoot_thumb = "D:\\WebService\\fileUpload\\panClub\\" + logComCode + "\\ro_thumb\\"; // 저장될
																													// 외부
																													// 파일
																													// 경로

					File Folder = new File(fileRoot);
					File Folder_thumb = new File(fileRoot_thumb);

					// 폴더 없는 경우 생성
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

					String originalFileName = fileList.get(i).getOriginalFilename(); // 오리지날 파일명
					String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일 확장자

					String savedFileName_UI = UUID.randomUUID().toString();
					String savedFileName = savedFileName_UI + extension; // 저장될 파일 명
					originalFileNameList[i] = originalFileName;
					savedFileNameList[i] = savedFileName;

					File targetFile = new File(fileRoot + savedFileName);

					/*
					 * long fileSize = multipartFile.getSize();
					 * 
					 * HashMap<String, Object> o_rotate = new HashMap<String, Object>(); String
					 * rotateName = ""; long rotateSize =0; String rotateYN = "N";
					 * 
					 * HashMap<String, Object> o_thumbnail = new HashMap<String, Object>(); String
					 * thumbnailName = ""; long thumbnailSize =0;
					 */

					try {
						InputStream fileStream = fileList.get(i).getInputStream();
						FileUtils.copyInputStreamToFile(fileStream, targetFile); // 파일 저장
						originalFileNameList[i] = originalFileName;
					} catch (IOException e) {
						attErrCnt = attErrCnt + 1;
						FileUtils.deleteQuietly(targetFile); // 저장된 파일 삭제
						e.printStackTrace();
					}

				}

				if (attErrCnt > 0) {
					map.put("result_code", "Err");
					map.put("result_msg", " 첨부파일 저장 오류");
				} else {
					HashMap<String, Object> paramsAtt = new HashMap<String, Object>();
					for (int i = 0, len = fileList.size(); i < len; i++) {

						paramsAtt.put("workingType", "ATT-ADD");
						paramsAtt.put("logComCode", logComCode);
						paramsAtt.put("logUserId", logUserId);
						paramsAtt.put("roReqNo2", o_roReq.getRoReqNo());
						paramsAtt.put("savedFileName", savedFileNameList[i]);
						paramsAtt.put("originalFileName", originalFileNameList[i]);

						RoReq o_roReq2 = new RoReq();
						o_roReq2 = logisService.roReqAdd(paramsAtt);
					}

				}

			}

			RoReqItem o_roReqItem = new RoReqItem();

			reqItemSet.setRoReqNo(o_roReq.getRoReqNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("reqItem", reqItemSet);

			o_roReqItem = logisService.roReqItemAdd(params);

			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_roReqItem.getDb_resultCode()) && attErrCnt == 0) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else if (("OK").equals(o_roReqItem.getDb_resultCode()) && attErrCnt > 0) {
				map.put("result_code", "Err");
				map.put("result_msg", "첨부파일은 저장하지 못했습니다.");
			} else {
				map.put("result_code", o_roReqItem.getDb_resultCode());
				map.put("result_msg", o_roReqItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_roReq.getDb_resultCode());
			map.put("result_msg", o_roReq.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 반출요청마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/ro-req-list")
	public String roReqList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			String doubleClickYN, Model model) {

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
		result.put("doubleClickYN", doubleClickYN);

		model.addAllAttributes(result);
		return "logis/ro-req-list";

	}

	/*
	 * 반출요청마스터 목록
	 */
	@RequestMapping(value = "/ro-req-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roReqList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RoReq i_req,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_req.setComCode(logComCode);

		String workingType = "";
		workingType = i_req.getWorkingType();

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

		List<RoReq> reqList = logisService.roReqList(i_param);

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
	 * 견적 : GET방식 2023.04.26 - 반출요청서 인쇄페이지 bk
	 */
	@RequestMapping(value = "/ro-req-item-list-print", method = RequestMethod.GET)
	public String roReqItemListPrint(String redirect_target, RoReq i_req, String memoYN, String gvComCode,
			Model model) {

		/* 출고요청 정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		String realComCode = "";
		if (("").equals(gvComCode) || gvComCode == null) {
			realComCode = logComCode;
		} else {
			realComCode = gvComCode;
		}

		i_param.put("workingType", "LIST");
		i_param.put("logComCode", realComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("req", i_req);
		i_param.put("gvComCode", gvComCode);

		RoReq o_req = logisService.roReqOne(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("req", o_req);

		// 반입요청 품목정보 */

		HashMap<String, Object> i_param2 = new HashMap<String, Object>();

		RoReqItem i_reqItem = new RoReqItem();

		i_reqItem.setRoReqNo(i_req.getRoReqNo());
		i_reqItem.setGvComCode(gvComCode);

		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", realComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("reqItem", i_reqItem);
		// System.out.println("gvComCode : " + gvComCode);
		// System.out.println("reqItem : " + i_reqItem);

		List<RoReqItem> reqItemList = logisService.roReqItemList(i_param2);

		o_params.put("reqItemList", reqItemList);

		model.addAllAttributes(o_params);

		return "logis/ro-req-item-list-print";
	}

	/*
	 * 반출요청상세 - 빈페이지 2023.01.02
	 */
	@RequestMapping(value = "/ro-req-item-list")
	public String roReqItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String roReqNo, String gvComCode, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("roReqNo", roReqNo);
		result.put("gvComCode", gvComCode);

		model.addAllAttributes(result);
		return "logis/ro-req-item-list";
	}

	/*
	 * 반출요청 상세 목록
	 */
	@RequestMapping(value = "/ro-req-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roReqItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RoReqItem i_reqItem,
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

		List<RoReqItem> reqItemList = logisService.roReqItemList(i_param);

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
	 * 반출 2023.01.02
	 */
	@RequestMapping(value = "/roAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roAdd(Ro roSet, RoItem roItemSet, Model model) {

		String workingType = roSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("ro", roSet);

		Ro o_ro = new Ro();
		o_ro = logisService.roAdd(params);
		// System.out.println("o_ro : " + o_ro);

		if (("OK").equals(o_ro.getDb_resultCode()) && !("ADD_M_D").equals(workingType)) {
			RoItem o_roItem = new RoItem();

			roItemSet.setRoNo(o_ro.getRoNo());
			params.put("workingType", workingType);
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("roItem", roItemSet);

			o_roItem = logisService.roItemAdd(params);

			// System.out.println("o_roItem : " + o_roItem);
			// 결과 만들기
			// map.put("orderNo", o_order.getOrderNo());
			if (("OK").equals(o_roItem.getDb_resultCode())) {
				map.put("result_code", "OK");
				map.put("result_msg", "처리되었습니다.");
			} else {
				map.put("result_code", o_roItem.getDb_resultCode());
				map.put("result_msg", o_roItem.getDb_resultMsg());
			}
		} else {
			map.put("result_code", o_ro.getDb_resultCode());
			map.put("result_msg", o_ro.getDb_resultMsg());
		}

		return map;
	}
	/*
	 * 반출요청취소 ->반품품목 등록. 처음에 반품요청취소용도록 만들었던듯 하나..여기에서 처리하면 안도. roReqAdd에서 처리했어야함
	 * 2023.04.21 yoonsang 2023.05.24 hsg - ->반품품목 등록. 처음에 반품요청취소용도록 만들었던듯 하나..여기에서
	 * 처리하면 안도. roReqAdd에서 처리했어야함. 다른데 쓰일수 있어서 그냥 놔두고 roReqItemAdd 메소드를 만듬.
	 * 2023.06.14 bk _페널티 등록위해 updateList 추가
	 */

	@RequestMapping(value = "/roItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roItemAdd(@RequestBody RoItem roItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		// System.out.println("roItemSet"+roItemSet);

		RoItem roitem = null;
		ArrayList<RoItem> updateList = roItemSet.getRoItemUpdate(); // 수정 리스트 얻기

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		RoItem o_roItem = new RoItem();

		if (updateList != null && updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				roitem = updateList.get(i);

				params.put("workingType", "PEN_UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("roItem", roitem);
				// System.out.println("222222222"+roitem);
				o_roItem = logisService.roItemAdd(params);
			}
		} else {
			// System.out.println("check");
			params.put("workingType", roItemSet.getWorkingType());
			params.put("logComCode", logComCode);
			params.put("logUserId", logUserId);
			params.put("roItem", roItemSet);

			o_roItem = logisService.roItemAdd(params);

		}

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_roItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_roItem.getDb_resultCode());
			map.put("result_msg", o_roItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 반출마스터 목록 - 빈페이지
	 */
	@RequestMapping(value = "/ro-list")
	public String roList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			String doubleClickYN, Model model) {

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
		result.put("doubleClickYN", doubleClickYN);

		model.addAllAttributes(result);
		return "logis/ro-list";

	}

	/*
	 * 반출내역마스터 목록
	 */
	@RequestMapping(value = "/ro-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Ro i_ro, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_ro.setComCode(logComCode);

		String workingType = "";
		workingType = i_ro.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("ro", i_ro);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<Ro> roList = logisService.roList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("roList", roList);
		result.put("ro", i_ro);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 반출품목상세 - 빈페이지.마스터에서 클릭하는 경우 2023.01.02 2023.08.02 bk pageMoveYN 추가
	 */
	@RequestMapping(value = "/ro-item-list")
	public String roItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String roNo, @RequestParam(defaultValue = "") String pageMoveYN,
			String gvComCode, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("roNo", roNo);
		result.put("pageMoveYN", pageMoveYN);
		result.put("gvComCode", gvComCode);

		model.addAllAttributes(result);
		return "logis/ro-item-list";
	}

	/*
	 * 반출품목내역 - 빈페이지 2023.01.02
	 */
	@RequestMapping(value = "/ro-dtl-list")
	public String roDtlList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String roNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("roNo", roNo);

		model.addAllAttributes(result);
		return "logis/ro-dtl-list";
	}

	/*
	 * 반출 상세 목록
	 */
	@RequestMapping(value = "/ro-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RoItem i_roItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_roItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_roItem.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("roItem", i_roItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<RoItem> roItemList = logisService.roItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("roItemList", roItemList);
		result.put("roItem", i_roItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 반출 품목내역
	 */
	@RequestMapping(value = "/ro-dtl-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roDtlList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, RoItem i_roItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_roItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_roItem.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("roItem", i_roItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<RoItem> roItemList = logisService.roItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("roItemList", roItemList);
		result.put("roItem", i_roItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////

	/*
	 * 재고내역 : GET방식 2023.01.06 - 최초 페이지 접근
	 */
	@RequestMapping(value = "/stock-list")
	public String stockList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		return "logis/stock-list";
	}

	/*
	 * 재고내역
	 */
	@RequestMapping(value = "/stock-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, Stock i_stock,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		/*
		 * if (("").equals(sYmd) || sYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, -1); sYmd = dateFormat.format(cal.getTime()); }
		 */
		if (("").equals(eYmd) || eYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.MONTH, 0);
			eYmd = dateFormat.format(cal.getTime());
		}

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stock.setComCode(logComCode);

		String workingType = "";
		workingType = i_stock.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("st", i_stock);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<Stock> stockList = logisService.stockList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockList", stockList);
		result.put("stock", i_stock);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	@RequestMapping(value = "/stock-up")
	public String stockUp(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "0") long itemId,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("itemId", itemId);

		model.addAllAttributes(result);

		return "logis/stock-up";

	}

	/*
	 * 재고 입출고 내역 2023.01.09
	 */
	@RequestMapping(value = "/stock-wr-list")
	public String stockWrList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String stockYm,
			@RequestParam(defaultValue = "") String storCode, @RequestParam(defaultValue = "0") long itemId,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("stockYm", stockYm);
		result.put("storCode", storCode);
		result.put("itemId", itemId);

		model.addAllAttributes(result);
		return "logis/stock-wr-list";
	}

	/*
	 * 재고 입출고 내역 목록
	 */
	@RequestMapping(value = "/stock-wr-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockWrItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StockWr i_stockWr,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockWr.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockWr.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockWr", i_stockWr);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<StockWr> stockWrList = logisService.stockWrList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockWrList", stockWrList);
		result.put("stockWr", i_stockWr);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 재고 실사 2023.01.10
	 */
	@RequestMapping(value = "/stock-chk-list")
	public String stockChkList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String rackCode,
			@RequestParam(defaultValue = "") String storCode, @RequestParam(defaultValue = "0") long itemId,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("rackCode", rackCode);
		result.put("storCode", storCode);
		result.put("itemId", itemId);

		model.addAllAttributes(result);
		return "logis/stock-chk-list";
	}

	/*
	 * 재고 실사 목록
	 */
	@RequestMapping(value = "/stock-chk-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockChkList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StockChk i_stockChk,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockChk.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockChk.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockChk", i_stockChk);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<StockChk> stockChkList = logisService.stockChkList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockChkList", stockChkList);
		result.put("stockChk", i_stockChk);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 재고실사등록 2023.01.10 - 상세에서 저장하는 경우
	 */
	@RequestMapping(value = "/stockChkAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockChkAdd(StockChk stockChkSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		StockChk o_stockChk = new StockChk();

		params.put("workingType", stockChkSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stockChk", stockChkSet);

		o_stockChk = logisService.stockChkAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_stockChk.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_stockChk.getDb_resultCode());
			map.put("result_msg", o_stockChk.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 매입확정 2023.04.11 bokyung
	 */

	@RequestMapping(value = "/whBuyChkAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> whBuyChkAdd(Wh wh, WhItem whItem, Model model) {

		String workingType = wh.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("wh", wh);

		Wh o_wh = new Wh();
		o_wh = logisService.whAdd(params);

		map.put("result_code", o_wh.getDb_resultCode());
		map.put("result_msg", o_wh.getDb_resultMsg());
		// 콘솔로 찍어보기
		/*
		 * logger.info("수정 : " + updateList.toString()); logger.info("추가 : " +
		 * addList.toString()); logger.info("삭제 : " + removeList.toString());
		 */

		return map;
	}

	/*
	 * 재고목록 : GET방식->stock-list 대체 2023.05.08 - 최초 페이지 접근
	 */
	@RequestMapping(value = "/stock-item-list")
	public String stocItemList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		return "logis/stock-item-list";
	}

	/*
	 * 재고목록->stock-list 대체 2023.08.31 hsg - bulkSrchType, itemBulk 추가 2024.10.09
	 * supi - consignCustCode 추가
	 */
	@RequestMapping(value = "/stock-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StockItem i_stockItem,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String bulkSrchType,
			@RequestParam(defaultValue = "") String itemBulk, @RequestParam(defaultValue = "N") String noRealYN,
			@RequestParam(defaultValue = "N") String qtyZeroYN, @RequestParam(defaultValue = "") String consignCustCode,
			Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		/*
		 * if (("").equals(sYmd) || sYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, -1); sYmd = dateFormat.format(cal.getTime()); }
		 */
		/*
		 * if (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockItem.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
			
		}else {
			if (("STOR_LIST").equals(workingType) ) {
				workingType = "STOR_LIST";
			}
			else{
				
				workingType = "SALE_LIST";
			}
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("st", i_stockItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("itemBulk", itemBulk);
		i_param.put("bulkSrchType", bulkSrchType);
		i_param.put("noRealYN", noRealYN);
		i_param.put("qtyZeroYN", qtyZeroYN);
		i_param.put("consignCustCode", consignCustCode);

		List<StockItem> stockItemList = logisService.stockItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockItemList", stockItemList);
		result.put("stock", i_stockItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 랙별재고목록 : GET방식 2023.05.10 hsg - 최초 페이지 접근
	 */
	@RequestMapping(value = "/stock-rack-list")
	public String stocRackList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "0") long itemId,
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

		HashMap<String, Object> result = new HashMap<String, Object>();

		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("itemId", itemId);

		model.addAllAttributes(result);

		return "logis/stock-rack-list";
	}

	/*
	 * 랙별재고목록 2023.05.10 hsg 2024.01.12 supi - 다중조회기능 추가
	 */
	@RequestMapping(value = "/stock-rack-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockRackList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StockRack i_stockRack,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String bulkSrchType,
			@RequestParam(defaultValue = "") String itemBulk, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		/*
		 * if (("").equals(sYmd) || sYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, -1); sYmd = dateFormat.format(cal.getTime()); }
		 */
		/*
		 * if (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockRack.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockRack.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockRack", i_stockRack);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("bulkSrchType", bulkSrchType);
		i_param.put("itemBulk", itemBulk);

		List<StockRack> stockRackList = logisService.stockRackList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockRackList", stockRackList);
		result.put("i_stockRack", i_stockRack);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 창고사용상세 - 빈페이지 2022.12.16 -
	 */
	@RequestMapping(value = "/testt")
	public String testt(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			@RequestParam(defaultValue = "") String storageUseReqNo, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);
		result.put("storageUseReqNo", storageUseReqNo);

		model.addAllAttributes(result);
		return "logis/testt";
	}

	/*
	 * 재고수동처리 2023.05.12 hsg - 입고 출고 이동 실사
	 */
	@RequestMapping(value = "/stockItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockItemAdd(@RequestBody StockItem stockItemSet) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		StockItem o_stockItem = new StockItem();

		params.put("workingType", stockItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stockItem", stockItemSet);

		o_stockItem = logisService.stockItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_stockItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_stockItem.getDb_resultCode());
			map.put("result_msg", o_stockItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 재고이력 : GET방식 2023.05.16 hsg - 최초 페이지 접근
	 */
	@RequestMapping(value = "/stock-actions-list")
	public String stocKActionsList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "0") long itemId, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		if (("").equals(sYmd) || sYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.WEEK_OF_MONTH, -1);
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
		result.put("itemId", itemId);

		model.addAllAttributes(result);

		return "logis/stock-actions-list";
	}

	/*
	 * 재고이력 2023.05.16 hsg
	 */
	@RequestMapping(value = "/stock-actions-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockActionsList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StockActions i_stockActions,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		/*
		 * if (("").equals(sYmd) || sYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, -1); sYmd = dateFormat.format(cal.getTime()); }
		 */
		/*
		 * if (("").equals(eYmd) || eYmd == null ){ cal.setTime(new Date());
		 * cal.add(Calendar.MONTH, 0); eYmd = dateFormat.format(cal.getTime()); }
		 */

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockActions.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockActions.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("st", i_stockActions);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<StockActions> stockActionsList = logisService.stockActionsList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockActionsList", stockActionsList);
		result.put("i_stockActions", i_stockActions);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 반입요청품목 등록 2023.05.24 hsg - 요청취소용도로 만듬.원래 장윤상 매니저가 riItemAdd에서 구현했으나 여기에서
	 * 처리하는것으로 변경함.
	 */

	@RequestMapping(value = "/riReqItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> riReqItemAdd(RiReqItem riReqItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		RiReqItem o_riReqItem = new RiReqItem();

		params.put("workingType", riReqItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("reqItem", riReqItemSet);

		o_riReqItem = logisService.riReqItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_riReqItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_riReqItem.getDb_resultCode());
			map.put("result_msg", o_riReqItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 반출요청품목 등록 2023.05.24 hsg - 요청취소용도로 만듬.원래 장윤상 매니저가 roItemAdd에서 구현했으나 여기에서
	 * 처리하는것으로 변경함.
	 */
	@RequestMapping(value = "/roReqItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> roReqItemAdd(RoReqItem roReqItemSet, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		RoReqItem o_roReqItem = new RoReqItem();

		params.put("workingType", roReqItemSet.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("reqItem", roReqItemSet);

		o_roReqItem = logisService.roReqItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_roReqItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_roReqItem.getDb_resultCode());
			map.put("result_msg", o_roReqItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 발주 입고 인쇄페이지 2023.05.31 bokyung
	 */
	/*
	 * @RequestMapping(value = "/wh-up-print", method = RequestMethod.GET) public
	 * String whUpPrint(String redirect_target, String custCode, String sYmd, String
	 * eYmd, String orderNo, String orderGroupId,String custOrderNo,String
	 * whStatus,String whUnitPriceReg, String rcvCustCode,String branchCode, String
	 * custName, String bizNo, String whSchYmd, long itemId, String itemNo, String
	 * printYN, WhItem i_whItem, Model model) {
	 * 
	 * //System.out.println("sYmd" +sYmd); HashMap<String, Object> i_param = new
	 * HashMap<String, Object>();
	 * 
	 * String logComCode = (String) session.getAttribute("comCode"); String
	 * logUserId = (String) session.getAttribute("userId");
	 * 
	 * i_whItem.setComCode(logComCode); i_whItem.setCustCode(custCode);
	 * i_whItem.setOrderNo(orderNo); i_whItem.setOrderGroupId(orderGroupId);
	 * i_whItem.setBizNo(bizNo); i_whItem.setCustOrderNo(custOrderNo);
	 * i_whItem.setWhStatus(whStatus); i_whItem.setWhUnitPriceReg(whUnitPriceReg);
	 * i_whItem.setRcvCustCode(rcvCustCode); i_whItem.setBranchCode(branchCode);
	 * //i_place.setCustCode(logComCode);
	 * 
	 * i_param.put("workingType", "PLACE_LIST"); i_param.put("logComCode",
	 * logComCode); i_param.put("logUserId", logUserId); i_param.put("whItem",
	 * i_whItem); i_param.put("sYmd1", sYmd); i_param.put("eYmd1", eYmd);
	 * i_param.put("printYN", "Y");
	 * 
	 * //System.out.println("i_whItem"+i_whItem);
	 * 
	 * List<WhItem> whItemList = logisService.whItemList(i_param);
	 * 
	 * HashMap<String, Object> o_params = new HashMap<String, Object>();
	 * o_params.put("whItemList", whItemList); o_params.put("sYmd", sYmd);
	 * o_params.put("eYmd", eYmd);
	 * 
	 * o_params.put("custCode", custCode); o_params.put("orderNo", orderNo);
	 * o_params.put("orderGroupId", orderGroupId);
	 * 
	 * o_params.put("custOrderNo", custOrderNo); o_params.put("whStatus", whStatus);
	 * o_params.put("whUnitPriceReg", whUnitPriceReg); o_params.put("rcvCustCode",
	 * rcvCustCode); o_params.put("branchCode", branchCode);
	 * o_params.put("custName", custName); o_params.put("bizNo", bizNo);
	 * 
	 * o_params.put("whSchYmd", whSchYmd); o_params.put("itemId", itemId);
	 * o_params.put("itemNo", itemNo);
	 * 
	 * 
	 * o_params.put("whItem", i_whItem);
	 * //System.out.println("whItemList"+whItemList);
	 * 
	 * model.addAllAttributes(o_params); return "logis/wh-up-print"; }
	 */

	/*
	 * 발주 입고 인쇄페이지 2023.05.31 bokyung
	 */
	@RequestMapping(value = "/wh-up-print", method = RequestMethod.GET)
	public String whUpPrint(String redirect_target, String sYmd, String eYmd, String plcArr, String seqArr,
			WhItem i_whItem, Model model) {

		// System.out.println("sYmd" +sYmd);
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_param.put("workingType", "PLACE_LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("whItem", i_whItem);
		i_param.put("printYN", "Y");
		i_param.put("plcArr", plcArr);
		i_param.put("seqArr", seqArr);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);

		// System.out.println("i_param"+i_param);

		List<WhItem> whItemList = logisService.whItemList(i_param);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("whItemList", whItemList);
		o_params.put("whItem", i_whItem);
		o_params.put("sYmd", sYmd);
		o_params.put("eYmd", eYmd);
		// System.out.println("whItemList"+whItemList);

		model.addAllAttributes(o_params);
		return "logis/wh-up-print";
	}

	/*
	 * 반출페널티 - 빈페이지 2023.06.13 -bk
	 */
	@RequestMapping(value = "/ro-item-dtl-list")
	public String roPenaltyList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, @RequestParam(defaultValue = "") String orderGroupId,
			@RequestParam(defaultValue = "") String ordArr, @RequestParam(defaultValue = "") String seqArr,
			Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("orderGroupId", orderGroupId);
		result.put("ordArr", ordArr);
		result.put("seqArr", seqArr);

		model.addAllAttributes(result);
		return "logis/ro-item-dtl-list";
	}

	/*
	 * 월별재고원가 처리 2023.06.06 hsg
	 */
	@RequestMapping(value = "/stockYmAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockYmAdd(StockYM stockYM, Model model) {

		// System.out.println("stockYM:"+stockYM);
		String workingType = stockYM.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		// custSet.setCustCode(comCode);
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stockYM", stockYM);

		StockYM o_stockYM = new StockYM();

		o_stockYM = logisService.stockYMAdd(params);

		if (("OK").equals(o_stockYM.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", o_stockYM.getDb_resultMsg());
		} else {
			map.put("result_code", o_stockYM.getDb_resultCode());
			map.put("result_msg", o_stockYM.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 발주처출고일자 변경 2023.06.29
	 */
	@RequestMapping(value = "/changePlWhYmd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> changePlWhYmd(RoItem roItemSet, Model model) {

		String workingType = roItemSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		HashMap<String, Object> params = new HashMap<String, Object>();

		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("roItem", roItemSet);

		// System.out.println("params1 : " + params);
		RoItem o_roItem = new RoItem();
		o_roItem = logisService.roItemAdd(params);

		if (("OK").equals(o_roItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_roItem.getDb_resultCode());
			map.put("result_msg", o_roItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 출고일자 변경 2023.07.26 bk
	 */
	@RequestMapping(value = "/changeRlYmd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> changeRlYmd(Rl rlSet, Model model) {
		String workingType = rlSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("rl", rlSet);

		// System.out.println("rlSet : " + rlSet);

		Rl o_rl = new Rl();
		o_rl = logisService.rlAdd(params);

		if (("OK").equals(o_rl.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_rl.getDb_resultCode());
			map.put("result_msg", o_rl.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 반입일자 변경 2023.07.27 bk
	 */
	@RequestMapping(value = "/changeRiYmd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> changeRiYmd(Ri riSet, Model model) {
		String workingType = riSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("ri", riSet);

		// System.out.println("rlSet : " + rlSet);

		Ri o_ri = new Ri();
		o_ri = logisService.riAdd(params);

		if (("OK").equals(o_ri.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_ri.getDb_resultCode());
			map.put("result_msg", o_ri.getDb_resultMsg());
		}

		return map;
	}

//
	/*
	 * 
	 * 2023.08.17 - 반입 인쇄페이지 bk
	 */
	@RequestMapping(value = "/ri-item-list-print", method = RequestMethod.GET)
	public String riItemListPrint(String redirect_target, Ri i_ri, String gvComCode, Model model) {

		/* 출고요청 정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		String realComCode = "";
		if (("").equals(gvComCode) || gvComCode == null) {
			realComCode = logComCode;
		} else {
			realComCode = gvComCode;
		}

		i_param.put("workingType", "LIST");
		// i_param.put("logComCode", logComCode);
		i_param.put("logComCode", realComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("ri", i_ri);
		i_param.put("gvComCode", gvComCode);

		Ri o_ri = logisService.riOne(i_param);
		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("ri", o_ri);
		// 출고요청 품목정보 */

		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		RiItem i_riItem = new RiItem();
		i_riItem.setRiNo(o_ri.getRiNo());

		i_param2.put("workingType", "LIST");
		// i_param2.put("logComCode", logComCode);
		i_param2.put("logComCode", realComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("riItem", i_riItem);
		i_param2.put("gvComCode", gvComCode);
		List<RiItem> riItemList = logisService.riItemList(i_param2);
		o_params.put("riItemList", riItemList);

		// 거래처정보
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();
		Cust i_cust = new Cust();
		// i_cust.setComCode(logComCode);
		// i_cust.setCustCode(logComCode);
		i_cust.setComCode(realComCode);
		i_cust.setCustCode(realComCode);
		i_param3.put("workingType", "PAN_LIST");
		// i_param3.put("logComCode", logComCode);
		i_param3.put("logComCode", realComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);
		List<Cust> o_custList = baseService.custList(i_param3);
		o_params.put("custList", o_custList);

		// 거래처정보
		HashMap<String, Object> i_param4 = new HashMap<String, Object>();
		Cust i_cust2 = new Cust();
		// i_cust2.setComCode(logComCode);
		i_cust2.setComCode(realComCode);
		i_cust2.setCustCode(o_ri.getCustCode());
		i_param4.put("workingType", "LIST");
		// i_param4.put("logComCode", logComCode);
		i_param4.put("logComCode", realComCode);
		i_param4.put("logUserId", logUserId);
		i_param4.put("cust", i_cust2);

		List<Cust> o_custList2 = baseService.custList(i_param4);
		o_params.put("custList2", o_custList2);

		HashMap<String, Object> i_param5 = new HashMap<String, Object>();
		Payment i_payment = new Payment();

		i_param5.put("workingType", "LIST");
		i_param5.put("payment", i_payment);
		// i_param5.put("logComCode", logComCode);
		i_param5.put("logComCode", realComCode);
		i_param5.put("logUserId", logUserId);
		List<Payment> paymentList = bizService.paymentList(i_param5);
		List<Payment> paymentList2 = new ArrayList();
		for (int i = 0, len = paymentList.size(); i < len; i++) {
			if (("계좌").equals(paymentList.get(i).getPayType()) && ("Y").equals(paymentList.get(i).getValidYN())
					&& ("Y").equals(paymentList.get(i).getCommonDpYN())) {
				paymentList2.add(paymentList.get(i));
			}
		}
		o_params.put("paymentList2", paymentList2);

		model.addAllAttributes(o_params);
		return "logis/ri-item-list-print";
	}

	/*
	 * 발주처별미입고품목 - 빈페이지 2023.08.30 -hsg
	 */
	@RequestMapping(value = "/no-wh-by-cust")
	public String noWhByCust(@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "logis/no-wh-by-cust";
	}

	/*
	 * 납품처별미출고품목 - 빈페이지 2023.08.31 -hsg
	 */
	@RequestMapping(value = "/no-rl-by-cust")
	public String noRlByCust(@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return "logis/no-rl-by-cust";
	}

	/*
	 * 재고대량조회 : 2023.08.31 - 최초 페이지 접근
	 */
	@RequestMapping(value = "/stock-bulk-list")
	public String stockBulkList(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return "logis/stock-bulk-list";
	}

	/*
	 * 재고입출고처리 2023.09.01 hsg - 수동,이동,위탁 입출고처리 2024.04.03 supi - 바코드 스캔시 처리번호에 포커스를
	 * 두고 스캔할경우 스캔정보에서 처리순번도 받아서 해당 처리순번에 체크박스 체크해줌
	 */
	@RequestMapping(value = "/stock-wr-up")
	public String stockWrUp(String redirect_target, StockWr i_stockWr, Model model) {

		String logComCode = session.getAttribute("comCode").toString();
		String logUserId = (String) session.getAttribute("userId");

		String wrNo = i_stockWr.getWrNo();

		HashMap<String, Object> i_params = new HashMap<String, Object>();
		
		i_params.put("workingType", "ONE");

		i_params.put("logComCode", logComCode);
		i_params.put("logUserId", logUserId);
		i_params.put("wrNo", wrNo);
		i_params.put("wrSeq", i_stockWr.getWrSeq());

		// [Cust custInfo = baseService.custOne(i_params);
		// i_params.put("cust",custInfo);

		model.addAllAttributes(i_params);

		return "logis/stock-wr-up";
	}

	/*
	 * 재고입출고처리 2023.09.01 hsg -
	 */
	@ResponseBody
	@RequestMapping(value = "/stockWrAdd", method = RequestMethod.POST)
	public HashMap<String, Object> stockWrAdd(@RequestBody StockWr i_stockWr) {
		
		System.out.println("check2");

		String workingType = i_stockWr.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		ArrayList<StockWrItem> addList = i_stockWr.getStockWrItemAdd(); // 추가 리스트 얻기
		ArrayList<StockWrItem> updateList = i_stockWr.getStockWrItemUpdate(); // 수정 리스트 얻기
		ArrayList<StockWrItem> removeList = i_stockWr.getStockWrItemRemove(); // 제거 리스트 얻기
		

		// 마스터/디테일등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stockWr", i_stockWr);
		params.put("addList", addList);
		params.put("updateList", updateList);
		params.put("removeList", removeList);
		// System.out.println("param:"+params);
		
		
		HashMap<String, Object> result = logisService.stockWrAdd(params);

		return result;
	}

	/*
	 * 수동입출고처리 리스트 * 2023.09.09 hsg -
	 */
	@RequestMapping(value = "/stock-wr-item-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockWrItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StockWrItem i_stockWrItem,
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
		workingType = i_stockWrItem.getWorkingType();

		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		// Cust i_cust = new Cust();
		i_stockWrItem.setComCode(logComCode);

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		// i_param.put("workingType", "LIST");
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockWrItem", i_stockWrItem);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("seqArr", seqArr);

		List<StockWrItem> stockWrItemList = logisService.stockWrItemList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockWrItemList", stockWrItemList);
		result.put("stockWrItem", i_stockWrItem);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("seqArr", seqArr);
		// System.out.println("result:"+result);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 재고수동등록 처리 2023.09.08 - 확인등ㄹ록
	 */
	@RequestMapping(value = "/stockWrItemAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockWrItemAdd(StockWrItem i_stockWrItem, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> map = new HashMap<String, Object>();

		// 마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		StockWrItem o_stockWrItem = new StockWrItem();

		params.put("workingType", i_stockWrItem.getWorkingType());
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stockWrItem", i_stockWrItem);

		// System.out.println("p:"+params);
		o_stockWrItem = logisService.stockWrItemAdd(params);

		// 결과 만들기
		// map.put("orderNo", o_order.getOrderNo());
		if (("OK").equals(o_stockWrItem.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_stockWrItem.getDb_resultCode());
			map.put("result_msg", o_stockWrItem.getDb_resultMsg());
		}

		return map;
	}

	/*
	 * 수정입출고 엑셀 일괄등록. 2023.09.12 hsg
	 */
	@RequestMapping(value = "/stock-wr-up-xls", method = RequestMethod.GET)
	public String estiUpXls() {

		return "logis/stock-wr-up-xls";
	}

	/*
	 * @ResponseBody
	 * 
	 * @RequestMapping(value = "/stock-wr-up-xls", method = RequestMethod.POST)
	 * public HashMap<String, Object> stockWwrUpXls(StockWrExcel stockWrExcel,
	 * MultipartHttpServletRequest request) throws Exception {
	 * 
	 * String logComCode = (String) session.getAttribute("comCode"); String
	 * logUserId = (String) session.getAttribute("userId");
	 * 
	 * 
	 * Iterator<String> fileNames = request.getFileNames();
	 * 
	 * 
	 * while (fileNames.hasNext()) { String fileName = fileNames.next();
	 * System.out.println("File parameter name: " + fileName); }
	 * 
	 * MultipartFile excelFile = request.getFile("batchFile");
	 * 
	 * if (excelFile == null || excelFile.isEmpty()) {
	 * 
	 * throw new RuntimeException("업로드 할 파일을 선택 해 주세요."); }
	 * 
	 * System.out.println("check3"); System.out.println("excelFile : " + excelFile);
	 * 
	 * String fileRoot = uploadPath_root +
	 * "\\" + logComCode + "\\stockWr\\"; // "D:\\WebService\\fileUpload\\tellmenow\
	 * \tmg\\"+tmgIdx+"\\board\\";
	 * 
	 * System.out.println("fileRoot : " + fileRoot ); // //저장될 외부 파일 경로 File Folder
	 * = new File(fileRoot);
	 * 
	 * if (!Folder.exists()) { try { Folder.mkdirs(); } catch (Exception e) {
	 * e.printStackTrace(); } }
	 * 
	 * //250203 yoonsang 폴더없을시 생성 추가
	 * 
	 * if (!Folder.exists()) { try { boolean isCreated = Folder.mkdirs(); // 경로에
	 * 존재하지 않는 폴더까지 생성 if (isCreated) { System.out.println("폴더 생성 성공: " + fileRoot);
	 * } else { System.out.println("폴더 생성 실패: " + fileRoot); } } catch (Exception e)
	 * { e.printStackTrace(); throw new RuntimeException("폴더 생성 중 오류 발생: " +
	 * e.getMessage()); } }
	 * 
	 * 
	 * 
	 * String savedFileName_UI = UUID.randomUUID().toString();
	 * 
	 * File destFile = new File(fileRoot + "/"+savedFileName_UI+"__" +
	 * excelFile.getOriginalFilename());
	 * 
	 * try { excelFile.transferTo(destFile); } catch (Exception e) { throw new
	 * RuntimeException(e.getMessage(), e); }
	 * 
	 * 
	 * String extension = "";
	 * 
	 * int i = excelFile.getOriginalFilename().lastIndexOf('.'); if (i > 0) {
	 * extension = excelFile.getOriginalFilename().substring(i + 1); }
	 * 
	 * HashMap<String, Object> params = new HashMap<String, Object>();
	 * 
	 * HashMap<String, Object> result = null; if (("xlsx").equals(extension)) { //
	 * 엑셀로 등록한 경우
	 * 
	 * System.out.println("컨트롤러 엑셀데이터확인 : " + stockWrExcel);
	 * System.out.println("destFile : " + destFile); result =
	 * logisService.stockWrAddExcel(stockWrExcel, destFile); }
	 * System.out.println("result : " + result );
	 * 
	 * return result; }
	 */

	/*
	 * 2023.10.04 bk 창고사용요청인쇄
	 */
	
	@ResponseBody
	@RequestMapping(value = "/stock-wr-up-xls", method = RequestMethod.POST)
	public HashMap<String, Object> stockWwrUpXls(
	        @ModelAttribute StockWrExcel stockWrExcel,  // ✅ 객체 바인딩
	        @RequestParam("batchFile") MultipartFile excelFile,
	        HttpSession session) throws Exception {

	    String logComCode = (String) session.getAttribute("comCode");
	    String logUserId = (String) session.getAttribute("userId");

	    if (excelFile == null || excelFile.isEmpty()) {
	        throw new RuntimeException("업로드 할 파일을 선택 해 주세요.");
	    }


	    // 파일 저장 경로 설정
	    String fileRoot = uploadPath_root + "\\" + logComCode + "\\stockWr\\";
	    File folder = new File(fileRoot);
	    if (!folder.exists()) {
	        folder.mkdirs();
	    }

	    String savedFileName = UUID.randomUUID().toString();
	    File destFile = new File(fileRoot + "/" + savedFileName + "__" + excelFile.getOriginalFilename());

	    try {
	        excelFile.transferTo(destFile);
	    } catch (Exception e) {
	        throw new RuntimeException("파일 저장 실패", e);
	    }

	    // 엑셀 확장자 확인
	    String extension = "";
	    int i = excelFile.getOriginalFilename().lastIndexOf('.');
	    if (i > 0) {
	        extension = excelFile.getOriginalFilename().substring(i + 1);
	    }

	    HashMap<String, Object> result = new HashMap<>();
	    if ("xlsx".equals(extension)) {  
	        result = logisService.stockWrAddExcel(stockWrExcel, destFile);
	    }

	    return result;
	}
	
	
	@RequestMapping(value = "/storage-use-req-print", method = RequestMethod.GET)
	public String storageUseReqPrint(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "") String storageUseReqNo, StorageUseReq i_req, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		/* 창고사용요청 정보 */
		HashMap<String, Object> i_param = new HashMap<String, Object>();

		i_param.put("workingType", "LIST");
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("req", i_req);
		StorageUseReq o_req = logisService.storageReqOne(i_param);

		/* 창고사용요청 품목 정보 */
		HashMap<String, Object> i_param2 = new HashMap<String, Object>();
		StorageUseReqItem i_reqItem = new StorageUseReqItem();
		i_reqItem.setStorageUseReqNo(i_req.getStorageUseReqNo());
		i_param2.put("workingType", "LIST");
		i_param2.put("logComCode", logComCode);
		i_param2.put("logUserId", logUserId);
		i_param2.put("reqItem", i_reqItem);
		List<StorageUseReqItem> reqItemList = logisService.storageUseReqItemList(i_param2);

		/* 거래처 정보 */
		HashMap<String, Object> i_param3 = new HashMap<String, Object>();
		Cust i_cust = new Cust();
		i_cust.setComCode(logComCode);
		i_cust.setCustCode(logComCode);
		i_param3.put("workingType", "LIST");
		i_param3.put("logComCode", logComCode);
		i_param3.put("logUserId", logUserId);
		i_param3.put("cust", i_cust);
		List<Cust> o_custList = baseService.custList(i_param3);

		HashMap<String, Object> o_params = new HashMap<String, Object>();
		o_params.put("req", o_req);
		o_params.put("reqItemList", reqItemList);
		o_params.put("custList", o_custList);
		// System.out.println("o_req"+reqItemList);
		model.addAllAttributes(o_params);
		return "logis/storage-use-req-print";

	}

	/*
	 * 외부재고목록 2023.10.10 빈페이지
	 */
	@RequestMapping(value = "/out-stock-item-list")
	public String outStocItemList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		// model.addAttribute("orderList", orderList);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return "logis/out-stock-item-list";
	}

	/*
	 * 외주재고이력 : GET방식 2023.10.16 bk - 최초 페이지 접근
	 */
	@RequestMapping(value = "/out-stock-actions-list")
	public String outStocActionsList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, @RequestParam(defaultValue = "") String ymdIgnoreYN,
			@RequestParam(defaultValue = "0") long itemId, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		if (("").equals(sYmd) || sYmd == null) {
			cal.setTime(new Date());
			cal.add(Calendar.WEEK_OF_MONTH, -1);
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
		result.put("itemId", itemId);

		model.addAllAttributes(result);

		return "logis/out-stock-actions-list";
	}

	/*
	 * 외주재고이력 2023.10.17 hsg
	 */
	@RequestMapping(value = "/out-stock-actions-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outStockActionsList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
			@RequestParam(defaultValue = "") String eYmd, StockActions i_stockActions,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model) {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockActions.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockActions.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("st", i_stockActions);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);

		List<StockActions> stockActionsList = logisService.stockActionsList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockActionsList", stockActionsList);
		result.put("i_stockActions", i_stockActions);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 외주재고대량조회 : 2023.10.19 bk- 최초 페이지 접근
	 */
	@RequestMapping(value = "/out-stock-bulk-list")
	public String outStockBulkList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return "logis/out-stock-bulk-list";
	}

	/*
	* 
	*/
	@RequestMapping(value = "/out-stock-purchase-rate")
	public String outStockPurchaseRate(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int qty, @RequestParam(defaultValue = "") String sYmd,
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

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return "logis/out-stock-purchase-rate";
	}

	@ResponseBody
	@RequestMapping(value = "/cCustPurRateAdd", method = RequestMethod.POST)
	public HashMap<String, Object> cCustPurRateAdd(@RequestBody cCustPurRate cCustPurRateSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<cCustPurRate> addList = cCustPurRateSet.getAddList();
		ArrayList<cCustPurRate> uptList = cCustPurRateSet.getUptList();
		ArrayList<cCustPurRate> uptItem = cCustPurRateSet.getUptItem();
		ArrayList<cCustPurRate> delList = cCustPurRateSet.getDelList();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int result = 0;

		int okCount = 0;
		int errCount = 0;
		String result_code = "";
		String result_msg = "";
		ArrayList<String> errCustName = new ArrayList<String>();

		params.clear();
		cCustPurRate cCustPurRate = null;
		cCustPurRate o_cCustPurRate = new cCustPurRate();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				cCustPurRate = addList.get(i);

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					errCustName.add(o_cCustPurRate.getDb_resultMsg());
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (uptList.size() > 0) {
			for (int i = 0, len = uptList.size(); i < len; i++) {
				cCustPurRate = uptItem.get(i);

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (delList.size() > 0) {
			for (int i = 0, len = delList.size(); i < len; i++) {
				cCustPurRate = delList.get(i);

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					delErr = delErr + 1;
				}
			}
		}

		String msg = "";

		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				for (int i = 0, len = errCustName.size() - 1; i < len; i++) {
					msg = msg + errCustName.get(i) + ", ";
				}
				msg = msg + errCustName.get(errCustName.size() - 1) + " 는 이미 등록되어있습니다.";
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

	@RequestMapping(value = "/cCustPurRate-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> cCustPurRatelist(@RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model,
			@RequestBody cCustPurRate cCustPurRateSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		String workingType = cCustPurRateSet.getWorkingType();

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("comCode", comCode);
		i_param.put("userId", userId);
		i_param.put("cCustPurRate", cCustPurRateSet);

		List<cCustPurRate> cCustPurRatelist = logisService.cCustPurRatelist(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("cCustPurRatelist", cCustPurRatelist);
		result.put("comCode", comCode);

		model.addAllAttributes(result);

		return result;

	}

	@ResponseBody
	@RequestMapping(value = "/cCustPurMakerRateAdd", method = RequestMethod.POST)
	public HashMap<String, Object> cCustPurMakerRateAdd(@RequestBody cCustPurRate cCustPurRateSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<cCustPurRate> addList = cCustPurRateSet.getAddList();
		ArrayList<cCustPurRate> uptList = cCustPurRateSet.getUptList();
		ArrayList<cCustPurRate> uptItem = cCustPurRateSet.getUptItem();
		ArrayList<cCustPurRate> delList = cCustPurRateSet.getDelList();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int result = 0;

		int okCount = 0;
		int errCount = 0;
		String sCustCode = cCustPurRateSet.getSelectCustCode();

		String result_code = "";
		String result_msg = "";
		ArrayList<String> errMakerName = new ArrayList<String>();

		params.clear();
		cCustPurRate cCustPurRate = null;
		cCustPurRate o_cCustPurRate = new cCustPurRate();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				cCustPurRate = addList.get(i);

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("selectCustCode", sCustCode);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurMakerRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					errMakerName.add(o_cCustPurRate.getDb_resultMsg());
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (uptList.size() > 0) {
			for (int i = 0, len = uptList.size(); i < len; i++) {
				cCustPurRate = uptItem.get(i);

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("selectCustCode", sCustCode);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurMakerRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (delList.size() > 0) {
			for (int i = 0, len = delList.size(); i < len; i++) {
				cCustPurRate = delList.get(i);

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("selectCustCode", sCustCode);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurMakerRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					delErr = delErr + 1;
				}
			}
		}

		String msg = "";

		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				for (int i = 0, len = errMakerName.size() - 1; i < len; i++) {
					msg = msg + errMakerName.get(i) + ", ";
				}
				msg = msg + errMakerName.get(errMakerName.size() - 1) + " 는 이미 등록되어있습니다.";
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

	@ResponseBody
	@RequestMapping(value = "/cCustPurItemRateAdd", method = RequestMethod.POST)
	public HashMap<String, Object> cCustPurItemRateAdd(@RequestBody cCustPurRate cCustPurRateSet) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ArrayList<cCustPurRate> addList = cCustPurRateSet.getAddList();
		ArrayList<cCustPurRate> uptList = cCustPurRateSet.getUptList();
		ArrayList<cCustPurRate> uptItem = cCustPurRateSet.getUptItem();
		ArrayList<cCustPurRate> delList = cCustPurRateSet.getDelList();

		HashMap<String, Object> params = new HashMap<String, Object>();

		HashMap<String, Object> map = new HashMap<String, Object>();

		int result = 0;

		int okCount = 0;
		int errCount = 0;
		String sCustCode = cCustPurRateSet.getSelectCustCode();
		String result_code = "";
		String result_msg = "";
		ArrayList<String> errItemNo = new ArrayList<String>();

		params.clear();
		cCustPurRate cCustPurRate = null;
		cCustPurRate o_cCustPurRate = new cCustPurRate();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {
				cCustPurRate = addList.get(i);

				params.put("workingType", "ADD");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("selectCustCode", sCustCode);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurItemRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					errItemNo.add(o_cCustPurRate.getDb_resultMsg());
					addErr = addErr + 1;
				}
			}
		}

		params.clear();
		if (uptList.size() > 0) {
			for (int i = 0, len = uptList.size(); i < len; i++) {
				cCustPurRate = uptItem.get(i);

				params.put("workingType", "UPT");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("selectCustCode", sCustCode);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurItemRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
				}
			}
		}

		params.clear();
		if (delList.size() > 0) {
			for (int i = 0, len = delList.size(); i < len; i++) {
				cCustPurRate = delList.get(i);

				params.put("workingType", "DEL");
				params.put("comCode", comCode);
				params.put("userId", userId);
				params.put("selectCustCode", sCustCode);
				params.put("cCustPurRate", cCustPurRate);

				o_cCustPurRate = logisService.cCustPurItemRateAdd(params);

				if (!("OK").equals(o_cCustPurRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					delErr = delErr + 1;
				}
			}
		}

		String msg = "";

		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				for (int i = 0, len = errItemNo.size() - 1; i < len; i++) {
					msg = msg + errItemNo.get(i) + ", ";
				}
				msg = msg + errItemNo.get(errItemNo.size() - 1) + " 는 이미 등록되어있습니다.";
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
	 * 20231123 supi 출고 부품 조회 페이지
	 */
	@RequestMapping(value = "/rl-stock-list")
	public String rlStockList(Model model) {

		return "logis/rl-stock-list";
	}

	/*
	 * 20231123 supi 출고부품조회 페이지의 조회 기능 매개변수는 입력된품번리스트와 시작월+마지막월
	 */
	@RequestMapping(value = "/rl-stock-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlStockList(@RequestParam(defaultValue = "arr[]") List<String> serchItemList,
			@RequestParam(defaultValue = "전체") String startYmSerch,
			@RequestParam(defaultValue = "전체") String endYmSerch, Model model) {
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("serchItemList", serchItemList);
		i_param.put("startYmSerch", startYmSerch);
		i_param.put("endYmSerch", endYmSerch);

		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("saleItemQty", logisService.rlStockList(i_param));
		model.addAllAttributes(result);
		return result;

	}

	/*
	 * 2023.11.29 SUPI -주석
	 * 
	 * @RequestMapping(value="/sale_brand_dc_rate_popup") public String
	 * saleBrandDcRatePopup( Model model){
	 * 
	 * return "sale_brand_dc_rate_popup"; }
	 */

	/*
	 * 4car재고판매할인율 20231220 yoonsang - 빈페이지
	 */
	@RequestMapping(value = "/out-stock-dc-rate")
	public String outStockDcRate(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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

		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);

		model.addAllAttributes(result);

		return "logis/out-stock-dc-rate";
	}

	@RequestMapping(value = "/cCustSaleDcRate-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> cCustSaleDcRateList(@RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue = "") String sYmd, @RequestParam(defaultValue = "") String eYmd,
			@RequestParam(defaultValue = "") String ymdIgnoreYN, Model model, @RequestParam String workingType,
			String selectCustCode) {

		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("comCode", comCode);
		i_param.put("userId", userId);
		i_param.put("selectCustCode", selectCustCode);

		List<cCustSaleDcRate> cCustSaleDcRateList = logisService.cCustSaleDcRateList(i_param); // 서비스 다오 매퍼 만져야함

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("cCustSaleDcRateList", cCustSaleDcRateList);
		result.put("comCode", comCode);

		model.addAllAttributes(result);

		return result;

	}

	/*
	 * 4car재고판매할인율 2024.02.01 supi 거래처 할인율 데이터 갱신 재구현
	 */
	@RequestMapping(value = "/cCustSaleDcRateAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> cCustSaleDcRateAdd(@RequestParam(defaultValue = "") String custCodeArr, // 거래처그리드 정보
			@RequestParam(defaultValue = "") String def_MakerCodeArr, // 디폴트 할인율정보들 (거래처코드'')
			@RequestParam(defaultValue = "") String def_dcArr, @RequestParam(defaultValue = "") String def_marginArr,
			@RequestParam(defaultValue = "") String selectCustCode, // 현재 선택된 거래처
			@RequestParam(defaultValue = "") String sel_MakerCodeArr, // 선택된 거래처의 할인율 정보들
			@RequestParam(defaultValue = "") String sel_dcArr, @RequestParam(defaultValue = "") String sel_marginArr

	) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("comCode", comCode);
		i_param.put("userId", userId);
		i_param.put("custCodeArr", custCodeArr);
		i_param.put("def_MakerCodeArr", def_MakerCodeArr);
		i_param.put("def_dcArr", def_dcArr);
		i_param.put("def_marginArr", def_marginArr);
		i_param.put("selectCustCode", selectCustCode);
		i_param.put("sel_MakerCodeArr", sel_MakerCodeArr);
		i_param.put("sel_dcArr", sel_dcArr);
		i_param.put("sel_marginArr", sel_marginArr);

		// System.out.println(i_param);

		return logisService.cCustSaleDcRateAdd(i_param);
	}

//	@ResponseBody
//	@RequestMapping(value = "/cCustSaleDcRateAdd", method = RequestMethod.POST)
//	public HashMap<String, Object> cCustSaleDcRateAdd(@RequestBody cCustSaleDcRate cCustSaleDcRateSet) {
//
//		String comCode = (String) session.getAttribute("comCode");
//		String userId = (String) session.getAttribute("userId");
//
//		ArrayList<cCustSaleDcRate> addList = cCustSaleDcRateSet.getAddList();
//		ArrayList<cCustSaleDcRate> uptList = cCustSaleDcRateSet.getUptList();
//		ArrayList<cCustSaleDcRate> uptItem = cCustSaleDcRateSet.getUptItem();
//		ArrayList<cCustSaleDcRate> delList = cCustSaleDcRateSet.getDelList();
//		
//		ArrayList<cCustSaleDcRate> addList2 = cCustSaleDcRateSet.getAddList2();
//		ArrayList<cCustSaleDcRate> uptList2 = cCustSaleDcRateSet.getUptList2();
//		ArrayList<cCustSaleDcRate> uptItem2 = cCustSaleDcRateSet.getUptItem2();
//		ArrayList<cCustSaleDcRate> delList2 = cCustSaleDcRateSet.getDelList2();
//		
//		String selectCustCode = cCustSaleDcRateSet.getSelectCustCode();
//		
//
//		HashMap<String, Object> params = new HashMap<String, Object>();
//
//		HashMap<String, Object> map = new HashMap<String, Object>();
//
//		int result = 0;
//
//		int okCount = 0;
//		int errCount = 0;
//		String result_code = "";
//		String result_msg = "";
//		ArrayList<String> errCustName = new ArrayList<>();
//		
//
//		params.clear();
//		//cCustSaleDcRate cCustSaleDcRate = null; 
//		cCustSaleDcRate o_cCustSaleDcRate = new cCustSaleDcRate();
//		String custCode = "";
//		String custCode2 = "";
//		String makerCode = "";
//		float dcRate = 0;
//
//		int addErr = 0;
//		int uptErr = 0;
//		int delErr = 0;
//		if (addList.size() > 0) {
//			for (int i = 0, len = addList.size(); i < len; i++) {
//				custCode2 = addList.get(i).getCustCode();
//				
//				if(addList2.size() >0) {
//					for (int j = 0, len2 = addList2.size(); j < len2; j++) {
//						custCode = custCode2;
//						makerCode = addList2.get(j).getMakerCode();
//						dcRate = addList2.get(j).getDcRate();
//						
//						params.put("workingType", "ADD");
//						params.put("comCode", comCode);
//						params.put("userId", userId);
//						params.put("custCode", custCode);
//						params.put("makerCode", makerCode);
//						params.put("dcRate", dcRate);
//						params.put("selectCustCode", selectCustCode);
//						
//						
//						o_cCustSaleDcRate = logisService.cCustSaleDcRateAdd(params);
//						selectCustCode = addList.get(0).getCustCode();
//						custCode2 = "";
//
//						if (!("OK").equals(o_cCustSaleDcRate.getDb_resultCode())) { 
//							addErr = addErr + 1;
//						}
//					}								
//				}else {
//					addErr = addErr + 1;
//					o_cCustSaleDcRate.setDb_resultCode("Err");
//					o_cCustSaleDcRate.setDb_resultMsg("제조사별 할인율은 필수입력사항입니다.");
//					
//				}		
//			}
//		}else {
//			if(addList2.size() >0) {
//				for (int j = 0, len2 = addList2.size(); j < len2; j++) {
//					custCode = "";
//					makerCode = addList2.get(j).getMakerCode();
//					dcRate = addList2.get(j).getDcRate();
//					
//					params.put("workingType", "ADD");
//					params.put("comCode", comCode);
//					params.put("userId", userId);
//					params.put("custCode", custCode);
//					params.put("makerCode", makerCode);
//					params.put("dcRate", dcRate);
//					params.put("selectCustCode", selectCustCode);
//					
//					
//					o_cCustSaleDcRate = logisService.cCustSaleDcRateAdd(params);
//
//					if (!("OK").equals(o_cCustSaleDcRate.getDb_resultCode())) { 
//						addErr = addErr + 1;
//					}
//				}								
//			}
//			
//		}
//
//		params.clear();
//		if (uptList2.size() > 0) {
//			for (int i = 0, len = uptList2.size(); i < len; i++) {
//				custCode = "";
//				makerCode = uptItem2.get(i).getMakerCode();
//				dcRate = uptItem2.get(i).getDcRate();
//				
//				params.put("workingType", "UPT");
//				params.put("comCode", comCode);
//				params.put("userId", userId);
//				params.put("custCode", custCode);
//				params.put("makerCode", makerCode);
//				params.put("dcRate", dcRate);
//				params.put("selectCustCode", selectCustCode);
//			
//				o_cCustSaleDcRate = logisService.cCustSaleDcRateAdd(params);
//
//				if (!("OK").equals(o_cCustSaleDcRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
//					uptErr = uptErr + 1;
//				}
//			}
//		}
//
//		params.clear();
//		if (delList.size() > 0) {
//			for (int i = 0, len = delList.size(); i < len; i++) {
//				custCode = delList.get(i).getCustCode();
//				makerCode = "";
//				dcRate = 0;
//				
//				params.put("workingType", "DEL");
//				params.put("comCode", comCode);
//				params.put("userId", userId);
//				params.put("custCode", custCode);
//				params.put("makerCode", makerCode);
//				params.put("dcRate", dcRate);
//				params.put("selectCustCode", selectCustCode);
//			
//				o_cCustSaleDcRate = logisService.cCustSaleDcRateAdd(params);
//
//				if (!("OK").equals(o_cCustSaleDcRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
//					delErr = delErr + 1;
//				}
//			}
//		}
//		params.clear();
//		if (delList2.size() > 0) {
//			for (int i = 0, len = delList2.size(); i < len; i++) {
//				custCode = "";
//				makerCode = delList2.get(i).getMakerCode();
//				dcRate = delList2.get(i).getDcRate();
//				
//				params.put("workingType", "DEL");
//				params.put("comCode", comCode);
//				params.put("userId", userId);
//				params.put("custCode", custCode);
//				params.put("makerCode", makerCode);
//				params.put("dcRate", dcRate);
//				params.put("selectCustCode", selectCustCode);
//			
//				o_cCustSaleDcRate = logisService.cCustSaleDcRateAdd(params);
//
//				if (!("OK").equals(o_cCustSaleDcRate.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
//					delErr = delErr + 1;
//				}
//			}
//		}
//
//		String msg = "";
//
//		if (addErr > 0 || uptErr > 0 || delErr > 0) {
//			if (addErr > 0) {
//				msg = "등록오류: " + addErr + "건 " + o_cCustSaleDcRate.getDb_resultMsg();
//			} else if (uptErr > 0) {
//				msg = msg + " 수정오류: " + uptErr + "건 " + o_cCustSaleDcRate.getDb_resultMsg();
//			} else if (delErr > 0) {
//				msg = msg + " 삭제 오류: " + delErr + "건 " + o_cCustSaleDcRate.getDb_resultMsg();
//			}
//			msg = "처리 중 오류 발생했습니다 :: " + msg;
//			map.put("result_code", "오류");
//			map.put("result_msg", msg);
//		} else {
//
//			msg = "처리되었습니다.";
//			map.put("result_code", "성공");
//			map.put("result_msg", msg);
//		}
//
//		return map;
//	}

	/*
	 * 20240311 supi 창고별 재고목록 빈페이지
	 */
	@RequestMapping(value = "/stock-item-list-stor")
	public String stockItemListstor(Model model) {

		return "logis/stock-item-list-stor";
	}

	/*
	 * 20240312 supi 창고별 재고목록에서 파츠몰에 업로드할 엑셀이 Xlsx는 안되고 Xls로만 되서 만듬
	 */
	@RequestMapping("/stock-item-list-stor/exportXls")
	public String stockItemListstorExportXls(@RequestParam HashMap<String, Object> paramMap,
			HashMap<String, Object> ModelMap, HttpServletResponse response, StockItem i_stockItem) throws Exception {

		response.setHeader("Content-disposition", "attachment; filename=CoperationStockList.xls");

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockItem.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockItem.getWorkingType();

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("st", i_stockItem);

		List<StockItem> stockItemList = logisService.stockItemList(i_param);

		ModelMap.put("stockItemList", stockItemList);

		return "storListExcelView";
	}

	/*
	 * 외부비노출품목 - 빈페이지 2024.04.24 hsg -
	 */
	@RequestMapping(value = "/outer-non-dsp-list")
	public String outerNonDspList(Model model) {

		return "logis/outer-non-dsp-list";
	}

	/*
	 * 외부비노출품목
	 */
	@RequestMapping(value = "/outer-non-dsp-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outerNonDspList(StockItemOuterNonDsp i_stockItemOuterNonDsp, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_stockItemOuterNonDsp.setComCode(logComCode);

		String workingType = "";
		workingType = i_stockItemOuterNonDsp.getWorkingType();
		//
		if (("").equals(workingType) || workingType == null) {
			workingType = "LIST";
		}
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("stockItemOuterNonDsp", i_stockItemOuterNonDsp);

		List<StockItemOuterNonDsp> stockItemOuterNonDspList = logisService.stockItemOuterNonDspList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("stockItemOuterNonDspList", stockItemOuterNonDspList);
		result.put("stockItemOuterNonDsp", i_stockItemOuterNonDsp);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 주문회수창고사용출고에서 부품바코드 스캔시 해당 정보 조회용 통신 2024.05.10 supi - 최초작성
	 */
	@RequestMapping(value = "/barcodeItem", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> barcodeItem(@RequestParam HashMap<String, Object> i_param, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("item", logisService.barcodeItem(i_param));

		return result;
	}

	/*
	 * 바코드 발행시 컴코드-부품id-랙코드 단위로 itemUnit조회(없으면 생성)후 해당 단위인덱스와 프린트 인덱스를 2024.05.13
	 * supi - 최초작성
	 */
	@RequestMapping(value = "/barcodeAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> barcodeAdd(@RequestParam HashMap<String, Object> i_param, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("item", logisService.barcodeAdd(i_param));

		return result;
	}

	/*
	 * 외부비노출품목등록 2024.05.13 - hsg
	 */
	@RequestMapping(value = "/outerNonDspAdd", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outerNonDspAdd(@RequestBody StockItemOuterNonDsp i_stockItemOuterNonDsp) {

		String workingType = i_stockItemOuterNonDsp.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		ArrayList<StockItemOuterNonDsp> addList = i_stockItemOuterNonDsp.getStockItemOuterNonDspAdd(); // 추가 리스트 얻기
		ArrayList<StockItemOuterNonDsp> updateList = i_stockItemOuterNonDsp.getStockItemOuterNonDspUpdate(); // 수정 리스트
																												// 얻기
		ArrayList<StockItemOuterNonDsp> removeList = i_stockItemOuterNonDsp.getStockItemOuterNonDspRemove(); // 제거 리스트
																												// 얻기

		// 마스터/디테일등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("stockItemOuterNonDsp", i_stockItemOuterNonDsp);
		params.put("addList", addList);
		params.put("updateList", updateList);
		params.put("removeList", removeList);

		HashMap<String, Object> result = logisService.stockItemOuterNonDspAdd(params);

		return result;
	}

	/*
	 * 수동입출고 마스터내역 - 빈페이지 2024.05.28 - supi
	 */
	@RequestMapping(value = "/wr-list")
	public String wrList(Model model) {

		return "logis/wr-list";
	}

	/*
	 * 물류센터별기본랙 -2024.06.07 hsg
	 */

	@RequestMapping(value = "/logis-rack-list")
	public String rackList() {
		return "logis/logis-rack-list";
	}

	/*
	 * 물류센터별기본랙 -2024.06.07 hsg
	 */
	@RequestMapping(value = "/logis-rack-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> logisRackList(LogisRack i_logisRack, Model model) {

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "LIST");
		i_param.put("logisRack", i_logisRack);
		i_param.put("logUserId", logUserId);
		i_param.put("logComCode", logComCode);

		List<LogisRack> logisRackList = logisService.logisRackList(i_param);

		HashMap<String, Object> result = new HashMap<String, Object>();

		result.put("logisRackList", logisRackList);
		result.put("logisRack", i_logisRack);
		result.put("logComCode", logComCode);
		result.put("logUserId", logUserId);

		model.addAllAttributes(result);
		return result;
	}

	/*
	 * 뮬류센터별기본랙 등록 2024.06.07 hsg
	 */
	@ResponseBody
	@RequestMapping(value = "/logisRackAdd", method = RequestMethod.POST)
	public HashMap<String, Object> logisRackAdd(@RequestBody LogisRack logisRackSet) {

		String workingType = logisRackSet.getWorkingType();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		LogisRack logisRack = null;

		ArrayList<LogisRack> addList = logisRackSet.getLogisRackAdd(); // 추가 리스트 얻기
		ArrayList<LogisRack> removeList = logisRackSet.getLogisRackRemove(); // 제거 리스트 얻기
		ArrayList<LogisRack> updateList = logisRackSet.getLogisRackUpdate(); // 수정 리스트 얻기

		// 거래처마스터 등록
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("workingType", workingType);
		params.put("logComCode", logComCode);
		params.put("logUserId", logUserId);
		params.put("logisRack", logisRackSet);

		LogisRack o_logisRack = new LogisRack();
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

				logisRack = addList.get(i);

				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("logisRack", logisRack);

				o_logisRack = logisService.logisRackReg(params);

				if (!("OK").equals(o_logisRack.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
					errItem = errItem + "\n " + Integer.toString(i + 1) + ". 랙명: " + o_logisRack.getLogisRackName()
							+ " (" + o_logisRack.getDb_resultMsg() + ")";
				}
			}
		}

		params.clear();
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {
				if (updateList.get(i).getValidYN() == null) {
					updateList.get(i).setValidYN("");
				}

				// o_logisRack = updateList.get(i); //240913 yoonsang 수정
				logisRack = updateList.get(i);

				params.put("workingType", "UPT");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("logisRack", logisRack);

				o_logisRack = logisService.logisRackReg(params);

				if (!("OK").equals(o_logisRack.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					uptErr = uptErr + 1;
					errItem = errItem + "\n " + Integer.toString(i + 1) + ". 랙명: " + o_logisRack.getLogisRackName()
							+ " (" + o_logisRack.getDb_resultMsg() + ")";
				}
			}
		}

		params.clear();
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {
				if (removeList.get(i).getValidYN() == null) {
					removeList.get(i).setValidYN("");
				}

				// o_logisRack = removeList.get(i);
				logisRack = removeList.get(i); // 24.09.13 hsg

				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("logisRack", logisRack);

				o_logisRack = logisService.logisRackReg(params);

				if (!("OK").equals(o_logisRack.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					delErr = delErr + 1;
					errItem = errItem + "\n " + Integer.toString(i + 1) + ". 랙명: " + o_logisRack.getLogisRackName()
							+ " (" + o_logisRack.getDb_resultMsg() + ")";
				}
			}
		}

		String msg = "";
		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				// msg = "등록오류: " + addErr + "건";
				msg = "\n# 등록오류: " + addErr + "건" + " => " + errItem;
			} else if (uptErr > 0) {
				// msg = msg + " 수정오류: " + uptErr + "건";
				msg = msg + "\n# 수정오류: " + uptErr + "건" + " => " + errItem;
			} else if (delErr > 0) {
				// msg = msg + " 삭제 오류: " + delErr + "건";
				msg = msg + "\n# 삭제오류: " + delErr + "건" + " => " + errItem;
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
	 * 회수 접수내역- 빈페이지 2024.07.22 yoonsang 커밋누락
	 */

	@RequestMapping(value = "/si-req-list")
	public String SiReqList(Model model) {
		return "logis/si-req-list";
	}

	/*
	 * 2024.10.28 supi 수탁업체와 아이템 아이디로 재고 찾는 통신
	 */
	@RequestMapping(value = "/stockRackItemFind", method = RequestMethod.POST)
	@ResponseBody
	public List<HashMap<String, Object>> stockRackItemFind(@RequestParam HashMap<String, Object> i_params,
			Model model) {
		String comCode = (String) session.getAttribute("comCode");
		// String userId = (String) session.getAttribute("userId");

		i_params.put("logComCode", comCode);
		// i_params.put("userId", userId);
		return logisService.stockRackItemFind(i_params);
	}

	/*
	 * 재고수불부 페이지 2024.11.07 supi
	 */
	@RequestMapping(value = "/inventory-payment")
	public String InventoryPayment(Model model) {
		return "logis/inventory-payment";
	}

	/*
	 * 재고수불부 데이터 조회 2024.11.07 supi - 소장님 프로시저 기반으로 최초작성
	 */
	@RequestMapping(value = "/inventoryPayment", method = RequestMethod.POST)
	@ResponseBody
	public List<HashMap<String, Object>> inventoryPayment(@RequestParam HashMap<String, Object> i_params, Model model) {
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		i_params.put("logComCode", comCode);
		i_params.put("logUserId", userId);
		return logisService.inventoryPayment(i_params);
	}
}
