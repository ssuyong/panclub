package kr.co.panclub.controller;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.panclub.model.AssaySales;
import kr.co.panclub.model.CustSalesRank;
import kr.co.panclub.model.CwOrdProg;
import kr.co.panclub.model.Estimate;
import kr.co.panclub.model.Storage;
import kr.co.panclub.service.IStatsService;

/*
 * 통계 관련 메뉴
 * */
@Controller
@RequestMapping("/stats/*")
public class statsController {
	
	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private IStatsService statsService;

	
	/*
	 * 카윈 주문진행현황 - 빈페이지
	 * */
	@RequestMapping(value="/cw-ord-prog-list")
	public String cwOrdProgList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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
		
		Estimate i_estimate = new Estimate();  

		result.put("estimate", i_estimate);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		model.addAllAttributes(result);
		return "stats/cw-ord-prog-list";
		
	}
	
	/*
	 *  카윈 주문진행현황 목록
	 * */
	@RequestMapping(value="/cw-ord-prog-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> cwOrdProgList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
			@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			CwOrdProg i_cwOrdProg,   @RequestParam(defaultValue="") String ymdIgnoreYN,   Model model){		
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		                   
		//i_cwOrdProg.setComCode(logComCode);
		
		String workingType = "";
		workingType = i_cwOrdProg.getWorkingType();
		//
		if (("").equals(workingType) ||  workingType == null ) {
			workingType = "LIST";
		}
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("cwOrdProg", i_cwOrdProg);

		List<CwOrdProg> cwOrdProgList = statsService.cwOrdProgList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("cwOrdProgList", cwOrdProgList);
		result.put("cwOrdProg", i_cwOrdProg);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		model.addAllAttributes(result);
		return result;		
	}	

	
	/*
	 * 거래처별 매출순위 - 최초
	 * */	
	@RequestMapping(value="/cust-sales-rank")
	public String custSalesRank(){	
		return "stats/cust-sales-rank";
		
	}
	
	/*
	 *  거래처별 매출순위 
	 * */
	@RequestMapping(value="/cust-sales-rank", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> custSalesRank(@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			CustSalesRank i_custSalesRank,     Model model){		

		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");

		//i_custLedg.setComCode(logComCode);
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", "CUST_SALES");
		i_param.put("custSalesRank", i_custSalesRank);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);

		
		
		List<CustSalesRank> custSalesRankList = statsService.custSalesRankList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("custSalesRankList", custSalesRankList);
		result.put("custSalesRank", i_custSalesRank);
		
		
		model.addAllAttributes(result);
		return result;		
	}
	
	/*
	 * 주문분석 - 빈페이지 
	 * 2023.06.15 hsg 
	 * */
	@RequestMapping(value="/assay-sales-list")
	public String assaySalesList( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int qty,
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
		
		AssaySales i_assaySales = new AssaySales();  

		result.put("assaySales", i_assaySales);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		
		model.addAllAttributes(result);
		return "stats/assay-sales-list";
		
	}
	
	/*
	 *  주문분석
	 * */
	@RequestMapping(value="/assay-sales-list", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> assaySalesList(@RequestParam(defaultValue="") String workingType,  @RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd, 
			AssaySales i_assaySales,     Model model){		

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType", workingType);
		i_param.put("assaySales", i_assaySales);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("sYmd1", sYmd);
		i_param.put("eYmd1", eYmd);
		
		List<AssaySales> assaySalesList = statsService.assaySalesList(i_param);
		
		HashMap<String, Object> result = new HashMap<String, Object>();	
		
		result.put("assaySalesList", assaySalesList);
		result.put("assaySales", i_assaySales);		
		
		model.addAllAttributes(result);
		return result;		
	}
	
	
	/*
	 * 부품별업무 - 빈페이지 
	 * 2023.08.22 hsg 
	 * */
	@RequestMapping(value="/work-by-item")
	public String workByItem( 	@RequestParam(defaultValue="") String sYmd,   @RequestParam(defaultValue="") String eYmd,  @RequestParam(defaultValue="") String ymdIgnoreYN, 
			@RequestParam(defaultValue="0") long itemId, @RequestParam(defaultValue="") String itemNo, Model model){		
		
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
		
		result.put("itemId", itemId);
		result.put("itemNo", itemNo);
		result.put("ymdIgnoreYN", ymdIgnoreYN);
		result.put("sYmd", sYmd);
		result.put("eYmd", eYmd);
		result.put("logComCode", logComCode);
		result.put("logUserId", logUserId);
		
		model.addAllAttributes(result);
		return "stats/work-by-item";
		
	}
	
	/*
	 * 2023.12.05 supi 월간 보고서 페이지
	 * */ 
	@RequestMapping(value="/stock-report")
	public String stockReport(  Model model){		
		 
		return "stats/stock-report";
	} 
	/*
	 * 2023.12.05 supi 보고서 탭과 년월 받아서 데이터 가져옴
	 * */ 
	@RequestMapping(value="/stock-get-report", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockGetReport(@RequestParam(defaultValue="") String tab,  
		
			@RequestParam(defaultValue="") String yymm, Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("tab" , tab);
		i_param.put("yymm", yymm);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("stockReport", statsService.stockGetReport(i_param));
		
		return result;
	} 
	/*
	 * 2023.12.05 supi 상세출고의 상세페이지
	 * */ 
	@RequestMapping(value="/stock-report-rldetail")
	public String stockReportT4Detail(  Model model){		 
		return "stats/stock-report-rldetail";
	}
	
	/*
	 * 2023.12.05 supi 년월 카테고리 날짜 받아서 상세 데이터 가져옴
	 * */ 
	@RequestMapping(value="/stock-report-rldetail", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockReportT4Detail(@RequestParam(defaultValue="") String tab,  
			@RequestParam(defaultValue="") String comCode,  
			@RequestParam(defaultValue="") String yyyymmdd,
			@RequestParam(defaultValue="") String isPartMall, Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		i_param.put("tab" , tab);
		i_param.put("comCode", comCode);
		i_param.put("yyyymmdd", yyyymmdd);
		i_param.put("isPartMall", isPartMall);
		 
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("rlReportDetailItem", statsService.stockReportT4Detail(i_param));
		
		return result;
	}
	
	//2023.12.14 supi 출고 입고 주문 증감 현황 보고서페이지
	@RequestMapping(value="/sIncReport")
	public String sIncReport(  Model model){		 
		return "stats/sIncReport";
	}
	
	//2023.12.14  매개변수 yymm (포멧은 yyyy-mm-의 문자열)를 받아서 해당 달의 첫날부터 마지말날까지의 데이터를 받아오는 통신
	@RequestMapping(value="/sIncReport", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> sIncReport( 
			@RequestParam(defaultValue="") String yymm,
			@RequestParam(defaultValue="") String dateType,Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		i_param.put("logComCode", logComCode);
		if(dateType.equals("month") )
		{
			i_param.put("sYmd1", yymm+"01");
			i_param.put("eYmd1", yymm+"31");
		}
		else //year
		{
			i_param.put("sYmd1", yymm+"01-01");
			i_param.put("eYmd1", yymm+"12-31");
		}
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("sIncReport", statsService.sIncReport(i_param));
	
		return result;
	}
	
	//2023.12.22 hsg - 창고별재고현황
	@RequestMapping(value="/stor-stock-rpt")
	public String storStockRpt(  Model model){		 
		return "stats/stor-stock-rpt";
	}
	
	//2023.12.22 hsg - 창고별재고현황
	@RequestMapping(value="/stor-stock-rpt", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> storStockRpt( @RequestParam(defaultValue="") String workingType,Storage i_storage,
			@RequestParam(defaultValue="") String yymm,			@RequestParam(defaultValue="") String dateType, Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");		
		
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("workingType", workingType);
		i_param.put("storage", i_storage);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("storStockRpt", statsService.storStockRpt(i_param));
		result.put("storage", i_storage);
		
		return result;
	}
	
	//2024.01.11 일별 위탁재료 판매 현황 빈페이지
		@RequestMapping(value="/outRlReport")
		public String outRlReport(  Model model){		 
			return "stats/outRlReport";
		}
	//2024.01.11  월간 위탁재고 판매현황 데이터 조회  
	//매개변수 yymm (포멧은 yyyy-mm-의 문자열)를 받아서 해당 달의 첫날부터 마지말날까지의 데이터를 받아오는 통신
	@RequestMapping(value="/outRlReport", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> outRlReport( 
			@RequestParam(defaultValue="") String yymm,
			@RequestParam(defaultValue="") String dateType,Model model){	
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		i_param.put("logComCode", logComCode);
		if(dateType.equals("month") )  //일간 조회의 경우 01~31일까지의 데이터를 받아옴
		{
			i_param.put("sYmd1", yymm+"01");
			i_param.put("eYmd1", yymm+"31");
		}
		else //year  월간 조회의 경우 1월1일부터 12월 31일까지의 데이터를 받아옴
		{
			i_param.put("sYmd1", yymm+"01-01");
			i_param.put("eYmd1", yymm+"12-31");
		}
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("outRlReport", statsService.outRlReport(i_param));
	
		return result;
	}
	//2024.01.15 supi 거래처별로 업체와의 출고 입고 주문 현황 빈 페이지
	@RequestMapping(value="/sCustReport")
	public String sCustReport(  Model model){		 
		return "stats/sCustReport";
	}
	////2024.01.15 supi 거래처별 출고,입고,주문 거래량 데이터 받아오는 통신 // 매개변수로 [기간],[거래처코드],[업체]로 검색 가능
	@RequestMapping(value="/sCustReport", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> sCustReport( 
			@RequestParam(defaultValue="") String sYmd1,
			@RequestParam(defaultValue="") String eYmd1,
			@RequestParam(defaultValue="") String custComCode,
			@RequestParam(defaultValue="") String comCode,
			 Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");	
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("custComCode", custComCode);
		i_param.put("comCode", comCode);
		i_param.put("sYmd1", sYmd1); 
		i_param.put("eYmd1", eYmd1); 
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("sCustReport", statsService.sCustReport(i_param));
	
		return result;
	}
	//2024.01.17 supi 거래처별로 업체와 청구현황 빈 페이지
	@RequestMapping(value="/sCl-Report")
	public String sClReport(  Model model){		 
		return "stats/sCl-Report";
	}
	////2024.01.17 supi 거래처별 청구현황 데이터 받아오는 통신 // 매개변수로 [기간],[거래처코드],[업체],[청구상태]로 검색 가능
	@RequestMapping(value="/sCl-Report", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> sClReport( 
			@RequestParam(defaultValue="") String sYmd1,
			@RequestParam(defaultValue="") String eYmd1,
			@RequestParam(defaultValue="") String procStep,
			@RequestParam(defaultValue="") String custComCode,
			@RequestParam(defaultValue="") String comCode,
			 Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");	
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("custComCode", custComCode);
		i_param.put("comCode", comCode);
		i_param.put("procStep", procStep);
		i_param.put("sYmd1", sYmd1); 
		i_param.put("eYmd1", eYmd1); 
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("sClReportData", statsService.sClReport(i_param));
	
		return result;
	}
	//2024.02.19 supi 재고 사용현황 빈 페이지
	@RequestMapping(value="/conStockRpt")
	public String conStockRpt(  Model model){		 
		return "stats/conStockRpt";
	}
////2024.02.19 supi 재고 사용현황 조회
//// 2024.06.18 supi 2그린파츠창고사용의 팬오토 주문 제외여부 파라미터 추가
	@RequestMapping(value="/conStockRpt", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> conStockRpt( 
			@RequestParam(defaultValue="") String workingType,
			@RequestParam(defaultValue="") String sYmd1,
			@RequestParam(defaultValue="") String eYmd1,
			@RequestParam(defaultValue="") String ymdIgnoreYN,
			@RequestParam(defaultValue="") String consignCustCode, 
			@RequestParam(defaultValue="") String orderCustCode, 
			@RequestParam(defaultValue="") String rcvCustCode, 
			@RequestParam(defaultValue="") String itemId, 
			@RequestParam(defaultValue="") String itemNo, 
			@RequestParam(defaultValue="") String itemName, 
			@RequestParam(defaultValue="") String pIgnoreYN, 
			 Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");	
		 
		i_param.put("workingType", workingType);
		i_param.put("logComCode", logComCode);
		i_param.put("logUserId", logUserId);
		i_param.put("ymdIgnoreYN", ymdIgnoreYN);
		i_param.put("consignCustCode", consignCustCode); 
		i_param.put("orderCustCode", orderCustCode); 
		i_param.put("rcvCustCode", rcvCustCode); 
		i_param.put("itemId", itemId); 
		i_param.put("itemNo", itemNo); 
		i_param.put("itemName", itemName); 
		i_param.put("pIgnoreYN", pIgnoreYN); 
		i_param.put("sYmd1", sYmd1); 
		i_param.put("eYmd1", eYmd1); 
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("conStockRpt", statsService.conStockRpt(i_param));
	
		return result;
	}
	
	//2024.02.20 supi 기간별 재고 사용현황 빈 페이지
	@RequestMapping(value="/mdConStockRpt")
	public String mdConStockRpt(  Model model){		 
		return "stats/mdConStockRpt";
	}
	
	
	/*
	 * 
	 * 2024.03.18 supi 4car내에서 통계업데이트
	 */
	@RequestMapping(value = "/statisticsUpdate")
	@ResponseBody
	public HashMap<String, Object> statisticsUpdate(Model model) {
		
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		
		i_param.put("logComCode", comCode);     
		i_param.put("logUserId", userId);     
		
		return statsService.statisticsUpdate(i_param);
	}	
		
	/*
    부품검색 순위  - 2024.04.02 hsg
	*/
	@RequestMapping(value="/stock-srch-rnk")
	public String stockSrchRnk(  Model model){		
		 
		return "stats/stock-srch-rnk";
	}
	
	/*	     
	 */
	@RequestMapping(value="/stock-srch-rnk", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> stockSrchRnk(@RequestParam(defaultValue="") String serchItem,
			@RequestParam(defaultValue="전체") String startYmSerch ,@RequestParam(defaultValue="전체") String endYmSerch ,  String workingType, Model model)	{

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");		
		
		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType",workingType);
		i_param.put("logComCode",logComCode);
		i_param.put("logUserId",logUserId);
		i_param.put("serchItem",serchItem);
		i_param.put("startYmSerch", startYmSerch);
		i_param.put("endYmSerch", endYmSerch);		   
	    
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("stockSrchRnk", statsService.stockSrchRnk(i_param));
		
		model.addAllAttributes(result);
		return result;		
	}
	
	
	/*
    부품주문 순위  - 2024.04.04 hsg
	*/
	@RequestMapping(value="/item-ord-rnk")
	public String itemOrdRnk(  Model model){		
		 
		return "stats/item-ord-rnk";
	}
	
	/*	     
	 */
	@RequestMapping(value="/item-ord-rnk", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> itemOrdRnk(@RequestParam(defaultValue="") String serchItem,
			@RequestParam(defaultValue="전체") String startYmSerch ,@RequestParam(defaultValue="전체") String endYmSerch ,  String workingType, String makerCode, BigDecimal centerPrice,
			Model model)	{
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");		

		HashMap<String, Object> i_param = new HashMap<String, Object>();
		i_param.put("workingType",workingType);
		i_param.put("logComCode",logComCode);
		i_param.put("logUserId",logUserId);
		i_param.put("serchItem",serchItem);
		i_param.put("startYmSerch", startYmSerch);
		i_param.put("endYmSerch", endYmSerch);
		i_param.put("makerCode", makerCode);		  
		i_param.put("centerPrice", centerPrice);		 		
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("itemOrdRnk", statsService.itemOrdRnk(i_param));
		
		model.addAllAttributes(result);
		return result;		
	}
	
	//2024.04.24 yoonsang 입금,출금 현황	rldp-whwd-rpt
	@RequestMapping(value="/dp-wd-rpt")
	public String dpWdRpt(  Model model){		 
		return "stats/dp-wd-rpt";
	}
	
	
	//2024.04.24  매개변수 yymm (포멧은 yyyy-mm-의 문자열)를 받아서 해당 달의 첫날부터 마지말날까지의 데이터를 받아오는 통신
	@RequestMapping(value="/dp-wd-rpt", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> dpWdRpt( 
			@RequestParam(defaultValue="") String yymm, 
			@RequestParam(defaultValue="") String dateType,
			@RequestParam(defaultValue="") String exceptCustYN ,Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		i_param.put("logComCode", logComCode);
		i_param.put("exceptCustYN", exceptCustYN);
		if(dateType.equals("month") )
		{
			i_param.put("sYmd1", yymm+"01");
			i_param.put("eYmd1", yymm+"31");
		}
		else //year
		{
			i_param.put("sYmd1", yymm+"01-01");
			i_param.put("eYmd1", yymm+"12-31");
		}
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("dpWdRpt", statsService.dpWdRpt(i_param));
		
		return result;
	}
	
	
	//2024.09.24 yoonsang 출고/입금,입고/출금 현황	rldp-whwd-rpt
	@RequestMapping(value="/rldp-whwd-rpt")
	public String rlDpWhWdRpt(  Model model){		 
		return "stats/rldp-whwd-rpt";
	}
	
	
	//매개변수 yymm (포멧은 yyyy-mm-의 문자열)를 받아서 해당 달의 첫날부터 마지말날까지의 데이터를 받아오는 통신
	@RequestMapping(value="/rldp-whwd-rpt", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> rlDpWhWdRpt( 
			@RequestParam(defaultValue="") String yymm, 
			@RequestParam(defaultValue="") String dateType,
			@RequestParam(defaultValue="") String exceptCustYN ,Model model){	
	 
		HashMap<String,Object> i_param = new HashMap<String, Object>();
		String logComCode = (String) session.getAttribute("comCode");
		i_param.put("logComCode", logComCode);
		i_param.put("exceptCustYN", exceptCustYN);
		if(dateType.equals("month") )
		{
			i_param.put("sYmd1", yymm+"01");
			i_param.put("eYmd1", yymm+"31");
		}
		else //year
		{
			i_param.put("sYmd1", yymm+"01-01");
			i_param.put("eYmd1", yymm+"12-31");
		}
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("rlDpWhWdRpt", statsService.rlDpWhWdRpt(i_param));
		
		return result;
	}
	
	/*
	 * 기간별 담당자 업무현황(견적,주문,발주,입고,출고)
	 * 2024.11.08 supi - 최초작성
	 */
	@RequestMapping(value="/md-Staff-Work-Rpt")
	public String mdStaffWorkRpt(  Model model){		 
		return "stats/md-Staff-Work-Rpt";
	}
	
	/*
	 * 기간별 담당자 업무현황조회(견적,주문,발주,입고,출고)
	 * 2024.11.08 supi - 최초작성
	 */
	@RequestMapping(value = "/mdStaffWorkRpt" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<HashMap<String, Object>> mdStaffWorkRpt(@RequestParam HashMap< String, Object> i_params , Model model) { 
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("logComCode", comCode);
		i_params.put("logUserId", userId);   
		return statsService.mdStaffWorkRpt(i_params);
	}
	/*
	 * 기간별 업체 업무현황(발주, 입고 , 반입)
	 * 2024.11.11 supi - 최초작성
	 */
	@RequestMapping(value="/md-Cust-Work-Rpt")
	public String mdCustWorkRpt(  Model model){		 
		return "stats/md-Cust-Work-Rpt";
	}
	
	/*
	 * 기간별 업체 업무현황(발주, 입고 , 반입)
	 * 2024.11.11 supi - 최초작성
	 */
	@RequestMapping(value = "/mdCustWorkRpt" , method = RequestMethod.POST ) 
	@ResponseBody
	public List<HashMap<String, Object>> mdCustWorkRpt(@RequestParam HashMap< String, Object> i_params , Model model) { 
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");
		
		i_params.put("logComCode", comCode);
		i_params.put("logUserId", userId);   
		return statsService.mdCustWorkRpt(i_params);
	}
}
