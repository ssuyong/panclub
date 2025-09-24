package kr.co.panclub.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.AssaySales;
import kr.co.panclub.model.ConStockRpt;
import kr.co.panclub.model.CustSalesRank;
import kr.co.panclub.model.CwOrdProg;
import kr.co.panclub.model.DpWdReportData;
import kr.co.panclub.model.OrderStats;
import kr.co.panclub.model.OutRlReportData;
import kr.co.panclub.model.RlDpWhWdReportData;
import kr.co.panclub.model.RlReportDetailItem;
import kr.co.panclub.model.SClReportData;
import kr.co.panclub.model.SCustReportData;
import kr.co.panclub.model.SIncReportData;
import kr.co.panclub.model.StockReport;
import kr.co.panclub.model.StockSrchLog;
import kr.co.panclub.model.Storage;




public interface IStatsDao {

	public List<CwOrdProg> cwOrdProgList(HashMap<String, Object> params);       //카윈 주문 진행 현황

	//매출순위
	public List<CustSalesRank> custSalesRankList(HashMap<String, Object> params);       //카윈 주문 진행 현황
	
	//주문분석
	public List<AssaySales> assaySalesList(HashMap<String, Object> params);       // 주문분석

	public List<StockReport> stockGetReport(HashMap<String, Object> params);       // 월간 보고서 
	public List<RlReportDetailItem> stockReportT4Detail(HashMap<String, Object> params);       // 보고서 데이터 상세
	public List<SIncReportData> sIncReport(HashMap<String, Object> params);       // 월간 출고,입고,주문(증감)현황 데이터 조회
	public List<OutRlReportData> outRlReport(HashMap<String, Object> params);       // 월간 위탁재고 판매현황 데이터 조회 
	public List<Storage> storStockRpt(HashMap<String, Object> params);       // 창고별재고현황. 2023.12.22 hsg
	public List<SCustReportData> sCustReport(HashMap<String, Object> params);    //2024.01.15 supi 거래처별 출고,입고,주문 거래량 데이터 받아오는 통신
	public List<SClReportData> sClReport(HashMap<String, Object> params);    //2024.01.17 supi 거래처별 청구 현황 조회
	public List<ConStockRpt> conStockRpt(HashMap<String, Object> params);    //2024.02.19 supi 재고 사용현황
	
	
	public HashMap<String, Object> statisticsUpdate(HashMap<String, Object> params);    //2024.03.18 supi 통계업데이트

	public List<StockSrchLog> stockSrchRnk(HashMap<String, Object> params);       //2024.04.02 hsg - 부품검색순위
	public List<OrderStats> itemOrdRnk(HashMap<String, Object> params);       //2024.04.04 hsg - 부품주문순위

	public List<DpWdReportData> dpWdRpt(HashMap<String, Object> params);	//2024.04.24 yoonsang -입금, 출금 현황

	public List<RlDpWhWdReportData> rlDpWhWdRpt(HashMap<String, Object> params);	//2024.09.24 yoonsang -출고/입금,입고/출금 현황
	
	public List<HashMap<String, Object>> mdStaffWorkRpt(HashMap<String, Object> params);	 
	public List<HashMap<String, Object>> mdCustWorkRpt(HashMap<String, Object> params);	 
	
}
