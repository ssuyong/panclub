package kr.co.panclub.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.panclub.dao.IStatsDao;
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


@Service
public class Statsservice  implements IStatsService{

	@Autowired
	private IStatsDao statsDao;

	@Override
	public List<CwOrdProg> cwOrdProgList(HashMap<String, Object> params) {
		
		return statsDao.cwOrdProgList(params);
	}

	@Override
	public List<CustSalesRank> custSalesRankList(HashMap<String, Object> params) {
		
		return statsDao.custSalesRankList(params);
	}

	@Override
	public List<AssaySales> assaySalesList(HashMap<String, Object> params) {
		
		return statsDao.assaySalesList(params);
	}
	
	@Override
	public List<StockReport> stockGetReport(HashMap<String, Object> params) {
	 
		return statsDao.stockGetReport(params);
	}
	@Override
	public List<RlReportDetailItem> stockReportT4Detail(HashMap<String, Object> params) {
		
		return statsDao.stockReportT4Detail(params);
	}
	@Override
	public List<SIncReportData> sIncReport(HashMap<String, Object> params) {
		
		return statsDao.sIncReport(params);
	}
	@Override
	public List<OutRlReportData> outRlReport(HashMap<String, Object> params) {
		
		return statsDao.outRlReport(params);
	}

	@Override
	public List<Storage> storStockRpt(HashMap<String, Object> params) {
		
		return statsDao.storStockRpt(params);
	}
	@Override//2024.01.15 supi 거래처별 출고,입고,주문 거래량 데이터 받아오는 통신
	public List<SCustReportData> sCustReport(HashMap<String, Object> params) {
		
		return statsDao.sCustReport(params);
	}
	@Override//2024.01.17 supi 거래처별 청구 현황 조회
	public List<SClReportData> sClReport(HashMap<String, Object> params) {
		
		return statsDao.sClReport(params);
	}

	@Override//2024.02.19 supi 재고 사용현황
	public List<ConStockRpt> conStockRpt(HashMap<String, Object> params) {
		
		return statsDao.conStockRpt(params);
	}
	@Override //2024.03.18 supi 통계업데이트
	public HashMap<String, Object> statisticsUpdate(HashMap<String, Object> params) {
		
		return statsDao.statisticsUpdate(params);
	}

	@Override
	public List<StockSrchLog> stockSrchRnk(HashMap<String, Object> params) {
		
		return statsDao.stockSrchRnk(params);
	}

	@Override
	public List<OrderStats> itemOrdRnk(HashMap<String, Object> params) {
		
		return statsDao.itemOrdRnk(params);
	}

	@Override	//2024.04.24 yoonsang -입금, 출금 현황
	public List<DpWdReportData> dpWdRpt(HashMap<String, Object> params) {
		
		return statsDao.dpWdRpt(params);
	}

	@Override	//2024.09.24 yoonsang -출고/입금,입고/출금 현황
	public List<RlDpWhWdReportData> rlDpWhWdRpt(HashMap<String, Object> params) {
		return statsDao.rlDpWhWdRpt(params);
	}
	
	@Override	 
	public List<HashMap<String, Object>> mdStaffWorkRpt(HashMap<String, Object> params) {
		return statsDao.mdStaffWorkRpt(params);
	}
	@Override	 
	public List<HashMap<String, Object>> mdCustWorkRpt(HashMap<String, Object> params) {
		return statsDao.mdCustWorkRpt(params);
	}
 
}
