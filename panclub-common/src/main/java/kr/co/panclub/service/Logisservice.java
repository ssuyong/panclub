package kr.co.panclub.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.panclub.common.ExcelRead;
import kr.co.panclub.common.ExcelReadOption;
import kr.co.panclub.dao.ILogisDao;
import kr.co.panclub.model.LogisRack;
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
import kr.co.panclub.model.SaleItemQty;
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


@Service
public class Logisservice  implements ILogisService{
	@Autowired
	private HttpSession session;
	
	@Autowired
	private ILogisDao logisDao;

	@Override
	public List<StorageUseReq> storageUseReqList(HashMap<String, Object> params) {
		
		return logisDao.storageUseReqList(params);
	}

	@Override
	public List<StorageUseReqItem> storageUseReqItemList(HashMap<String, Object> params) {
		
		return logisDao.storageUseReqItemList(params);
	}

	@Override
	public List<StorageUse> storageUseList(HashMap<String, Object> params) {
		
		return logisDao.storageUseList(params);
	}

	@Override
	public List<StorageUseItem> storageUseItemList(HashMap<String, Object> params) {

		return logisDao.storageUseItemList(params);
	}

	@Override
	public List<StorMvReq> storMvReqList(HashMap<String, Object> params) {
		
		return logisDao.storMvReqList(params);
	}

	@Override
	public List<StorMvReqItem> storMvReqItemList(HashMap<String, Object> params) {

		return logisDao.storMvReqItemList(params);
	}

	@Override
	public List<StorMv> storMvList(HashMap<String, Object> params) {
		
		return logisDao.storMvList(params);
	}

	@Override
	public List<StorMvItem> storMvItemList(HashMap<String, Object> params) {
		
		return logisDao.storMvItemList(params);
	}

	@Override
	public Wh whAdd(HashMap<String, Object> params) {
		
		return logisDao.whAdd(params);
	}

	@Override
	public List<Wh> whList(HashMap<String, Object> params) {
		
		return logisDao.whList(params);
	}

	@Override
	public List<WhItem> whItemList(HashMap<String, Object> params) {

		return logisDao.whItemList(params);
	}

	@Override
	public WhItem whItemAdd(HashMap<String, Object> params) {
		
		return logisDao.whItemAdd(params);
	}

	@Override
	public RlReq rlReqAdd(HashMap<String, Object> params) {
		
		return logisDao.rlReqAdd(params);
	}

	@Override
	public RlReqItem rlReqItemAdd(HashMap<String, Object> params) {
		
		return logisDao.rlReqItemAdd(params);
	}

	@Override
	public List<RlReq> rlReqList(HashMap<String, Object> params) {
		
		return logisDao.rlReqList(params);
	}

	@Override
	public List<RlReqItem> rlReqItemList(HashMap<String, Object> params) {
		
		return logisDao.rlReqItemList(params);
	}

	@Override
	public Rl rlAdd(HashMap<String, Object> params) {
		
		return logisDao.rlAdd(params);
	}

	@Override
	public List<Rl> rlList(HashMap<String, Object> params) {
		
		return logisDao.rlList(params);
	}

	@Override
	public List<RlItem> rlItemList(HashMap<String, Object> params) {
		
		return logisDao.rlItemList(params);
	}

	@Override
	public RlItem rlItemAdd(HashMap<String, Object> params) {
		
		return logisDao.rlItemAdd(params);
	}

	@Override
	public RiReq riReqAdd(HashMap<String, Object> params) {
		
		return logisDao.riReqAdd(params);
	}

	@Override
	public RiReqItem riReqItemAdd(HashMap<String, Object> params) {
		
		return logisDao.riReqItemAdd(params);
	}

	@Override
	public List<RiReq> riReqList(HashMap<String, Object> params) {
		
		return logisDao.riReqList(params);
	}

	@Override
	public List<RiReqItem> riReqItemList(HashMap<String, Object> params) {
		
		return logisDao.riReqItemList(params);
	}

	@Override
	public Ri riAdd(HashMap<String, Object> params) {
		
		return logisDao.riAdd(params);
	}

	@Override
	public List<Ri> riList(HashMap<String, Object> params) {
		
		return logisDao.riList(params);		
	}

	@Override
	public List<RiItem> riItemList(HashMap<String, Object> params) {
		
		return logisDao.riItemList(params);
	}

	@Override
	public RiItem riItemAdd(HashMap<String, Object> params) {
		
		return logisDao.riItemAdd(params);
	}

	@Override
	public RoReq roReqAdd(HashMap<String, Object> params) {
		
		return logisDao.roReqAdd(params);
	}

	@Override
	public RoReqItem roReqItemAdd(HashMap<String, Object> params) {
		
		return logisDao.roReqItemAdd(params);
	}

	@Override
	public List<RoReq> roReqList(HashMap<String, Object> params) {
		
		return logisDao.roReqList(params);
	}

	@Override
	public List<RoReqItem> roReqItemList(HashMap<String, Object> params) {
		
		return logisDao.roReqItemList(params);
	}

	@Override
	public Ro roAdd(HashMap<String, Object> params) {
		
		return logisDao.roAdd(params);
	}

	@Override
	public List<Ro> roList(HashMap<String, Object> params) {
		
		return logisDao.roList(params);
	}

	@Override
	public List<RoItem> roItemList(HashMap<String, Object> params) {
		
		return logisDao.roItemList(params);
	}

	@Override
	public RoItem roItemAdd(HashMap<String, Object> params) {
		
		return logisDao.roItemAdd(params);
	}

	@Override
	public List<Stock> stockList(HashMap<String, Object> params) {
		
		return logisDao.stockList(params);
	}

	@Override
	public List<StockRack> stockRackList(HashMap<String, Object> params) {
		
		return logisDao.stockRackList(params);
	}



	@Override
	public StockChk stockChkAdd(HashMap<String, Object> params) {
		
		return logisDao.stockChkAdd(params);
	}

	@Override
	public List<StockChk> stockChkList(HashMap<String, Object> params) {
		
		return logisDao.stockChkList(params);
	}

	@Override
	public RlReq reqOne(HashMap<String, Object> i_param) {
		
		return logisDao.reqOne(i_param);
	}

	@Override
	public Rl rlOne(HashMap<String, Object> i_param) {
		return logisDao.rlOne(i_param);
	}

	@Override
	public RiReq rireqOne(HashMap<String, Object> i_param) {
		return logisDao.rireqOne(i_param);
	}

	@Override
	public RoReq roReqOne(HashMap<String, Object> i_param) {
		return logisDao.roReqOne(i_param);
	}

	@Override
	public List<StockItem> stockItemList(HashMap<String, Object> params) {
		
		return logisDao.stockItemList(params);	}

	@Override
	public StockItem stockItemAdd(HashMap<String, Object> params) {
		
		return logisDao.stockItemAdd(params);
	}

	@Override
	public List<StockActions> stockActionsList(HashMap<String, Object> params) {
		
		return logisDao.stockActionsList(params);
	}

	@Override
	public StockYM stockYMAdd(HashMap<String, Object> params) {
		
		return logisDao.stockYMAdd(params);
	}

	@Override
	public Ri riOne(HashMap<String, Object> i_param) {
		return  logisDao.riOne(i_param);
	}

	@Override
	public List<StockWr> stockWrList(HashMap<String, Object> params) {
		
		return logisDao.stockWrList(params);
	}
	
	@Override
	public HashMap<String, Object> stockWrAdd(HashMap<String, Object> i_params) {		
		
		String logComCode = (String) i_params.get("logComCode");
		String logUserId = (String) i_params.get("logUserId");
				
		StockWr o_stockWr = new StockWr();
		o_stockWr = logisDao.stockWrAdd(i_params);
		
		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		String msg = "";
		String errItem = "";
		
		HashMap<String, Object> params = new HashMap<String, Object>();
	//20240422 supi 요청사항이 처리이후라 마스터가 수정불가능한 상태라서 마스터가 실패해도 디테일은 시도하는것으로 변경되어 조건 수정
	//	if (("OK").equals(o_stockWr.getDb_resultCode())) {   
			StockWrItem o_stockWrItem = new StockWrItem();
			ArrayList<StockWrItem> addList = (ArrayList<StockWrItem>) i_params.get("addList");
			params.clear();

			if (addList.size() > 0) {
				for (int i = 0, len = addList.size(); i < len; i++) {			
					o_stockWrItem = addList.get(i);
					o_stockWrItem.setWrNo(o_stockWr.getWrNo());
					params.put("workingType", "ADD");
					params.put("logComCode", i_params.get("logComCode"));
					params.put("logUserId", logUserId);
					params.put("stockWrItem", o_stockWrItem);			

					o_stockWrItem = logisDao.stockWrItemAdd(params);
					
					if (!("OK").equals(o_stockWrItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						addErr = addErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+o_stockWrItem.getItemNo() + " (" + o_stockWrItem.getDb_resultMsg()+")";
					}
				}
			}

			ArrayList<StockWrItem> updateList = (ArrayList<StockWrItem>) i_params.get("updateList");
			params.clear();
			
			if (updateList.size() > 0) {
				for (int i = 0, len = updateList.size(); i < len; i++) {			
					o_stockWrItem = updateList.get(i);
					o_stockWrItem.setWrNo(o_stockWr.getWrNo());
					params.put("workingType", "UPT");
					params.put("logComCode", i_params.get("logComCode"));
					params.put("logUserId", logUserId);
					params.put("stockWrItem", o_stockWrItem);			

					o_stockWrItem = logisDao.stockWrItemAdd(params);
					
					if (!("OK").equals(o_stockWrItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						addErr = addErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+o_stockWrItem.getItemNo() + " (" + o_stockWrItem.getDb_resultMsg()+")";
					}
				}
			}
			
			ArrayList<StockWrItem> removeList = (ArrayList<StockWrItem>) i_params.get("removeList");
			params.clear();
			
			if (removeList.size() > 0) {
				for (int i = 0, len = removeList.size(); i < len; i++) {			
					o_stockWrItem = removeList.get(i);
					o_stockWrItem.setWrNo(o_stockWr.getWrNo());
					params.put("workingType", "DEL");
					params.put("logComCode", i_params.get("logComCode"));
					params.put("logUserId", logUserId);
					params.put("stockWrItem", o_stockWrItem);			

					o_stockWrItem = logisDao.stockWrItemAdd(params);
					
					if (!("OK").equals(o_stockWrItem.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
						addErr = addErr + 1;
						errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+o_stockWrItem.getItemNo() + " (" + o_stockWrItem.getDb_resultMsg()+")";
					}
				}
			}

			// 결과 만들기
			map.put("wrNo", o_stockWr.getWrNo());
			
			if (addErr > 0 || uptErr > 0 || delErr > 0) {
				if (addErr > 0) {
					msg = "\n# 등록오류: " + addErr + "건" + " => "+errItem;
				} 
				if (uptErr > 0) {
					msg = msg+"\n# 수정오류: " + uptErr + "건" + " => "+errItem;
				} 
				if (delErr > 0) {
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
			
//		} else {
//			map.put("wrNo", o_stockWr.getWrNo());
//			map.put("result_code", o_stockWr.getDb_resultCode());
//			map.put("result_msg", o_stockWr.getDb_resultMsg());
//		}

		return map;
	}

	@Override
	public List<StockWrItem> stockWrItemList(HashMap<String, Object> params) {
		
		return logisDao.stockWrItemList(params);
	}

	@Override
	public StockWrItem stockWrItemAdd(HashMap<String, Object> params) {
		
		return logisDao.stockWrItemAdd(params);
	}

	
	/*
	 * 재고수동처리 엑셀업로드. 2023.09.12 hsg
	 */
	@Override
	public HashMap<String, Object> stockWrAddExcel(StockWrExcel stockWrExcel, File destFile) throws Exception {
		

	        ExcelReadOption excelReadOption = new ExcelReadOption();
	        excelReadOption.setFilePath(destFile.getAbsolutePath());
			/*        excelReadOption.setOutputColumns();
			 * 품목코드 	주문수량 	문의사항 	사용자메모
			*/
		    
	        String article_itemNo = "";
	        int article_qty = 0;
	        String article_rackCode = "";
	        String article_moveRackCode = "";
	        String article_memo = "";
	        
		    String articleA = stockWrExcel.getXls_itemNo();
	        String articleB = stockWrExcel.getXls_qty();
	        String articleC = stockWrExcel.getXls_rackCode();	        		
	        String articleD = stockWrExcel.getXls_moveRackCode();
	        String articleE = stockWrExcel.getXls_memo();

	        
	        int sRow = stockWrExcel.getXls_sRow();
	        
	        String connectYN = stockWrExcel.getConnectYN();
	        
	        excelReadOption.setOutputColumns("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

	        excelReadOption.setStartRow(sRow);
	        
	        List<Map<String, String>> excelContent =ExcelRead.read(excelReadOption);
          
	        HashMap<String, Object> params = new HashMap<String, Object>();	        
	       
	        List<StockWrItem> stockWrItemList = new ArrayList<StockWrItem>();
	        
	        HashMap<String, Object> i_params = new HashMap<String, Object>();  //상품정보와 발주처정보 가져오기위한 용도
	        StockWrItem i_stockWrItem = new StockWrItem(); 
	        StockWrItem o_stockWrItem = new StockWrItem(); 
	        
	        for(Map<String, String> article: excelContent){
	        	StockWrItem stockWrItem = new StockWrItem();
	        	if ( ("").equals(article.get(articleA)) ) {  // 품목코드 또는  량 공백이 들어오는 경우 있어서 이경우 skip 처리
	        		continue;
	        	}
	        	
	        	if (("").equals(article.get(articleA)) || article.get(articleA) == null) {	 article_itemNo = "";	   	} else {  		article_itemNo = article.get(articleA);	        	}
	        	stockWrItem.setItemNo(article_itemNo);// 품번	        	
	        	 
	        	if (("").equals(article.get(articleB)) || article.get(articleB) == null) {	 
	        		article_qty = 0;	   	
	        	} else {   		
	        		article_qty = Integer.parseInt(String.format("%.0f",Double.parseDouble(article.get(articleB))));	        	
	        	}
	        	stockWrItem.setQty(article_qty);	     //	수량	
	        	
	        	if (("").equals(article.get(articleC)) || article.get(articleC) == null) {	 article_rackCode = "";	   	} else {   		article_rackCode = article.get(articleC);	        	}
	        	stockWrItem.setRackCode(article_rackCode);  //랙코드

	        	if (("").equals(article.get(articleD)) || article.get(articleD) == null) {	 article_moveRackCode = "";	   	} else {   		article_moveRackCode = article.get(articleD);	        	}
	        	stockWrItem.setMoveRackCode(article_moveRackCode);  //이동랙코드

	        	if (("").equals(article.get(articleE)) || article.get(articleE) == null) {	 article_memo = "";	   	} else {   		article_memo = article.get(articleE);	        	}
	        	stockWrItem.setMemo1(article_memo);  //비고
	        	
	            String logComCode = (String) session.getAttribute("comCode");
	        	
	        	//엑셀이외의 상품정보, 발주처 정보는 DB에서 불러와서 SET
	            i_stockWrItem.setItemNo(article_itemNo);
	            i_stockWrItem.setRackCode(article_rackCode);
	            i_stockWrItem.setMoveRackCode(article_moveRackCode);
	        	
	            i_params.put("workingType", "NOT_SAVED");
	        	i_params.put("logComCode", logComCode);
	        	i_params.put("stockWrItem", i_stockWrItem);	        	
	        	
	        	o_stockWrItem = logisDao.stockWrItemOne(i_params);
	        	stockWrItem.setItemId(o_stockWrItem.getItemId());
	        	stockWrItem.setItemName(o_stockWrItem.getItemName());
	        	stockWrItem.setStorCode(o_stockWrItem.getStorCode());
	        	stockWrItem.setStorName(o_stockWrItem.getStorName());
	        	stockWrItem.setRackName(o_stockWrItem.getRackName());
	        	stockWrItem.setMoveStorCode(o_stockWrItem.getMoveStorCode());
	        	stockWrItem.setMoveStorName(o_stockWrItem.getMoveStorName());
	        	stockWrItem.setMoveRackName(o_stockWrItem.getMoveRackName());
	        	stockWrItem.setStockQty(o_stockWrItem.getStockQty());
	        	
	        	stockWrItemList.add(stockWrItem);
	        }	        
	        
	        params.put("stockWrItemList", stockWrItemList);  //전체대상수
	        
	        return params;  //"전체:"+ Integer.toString(target_count) + " 건 중 성공result_select;	        		
	}

	@Override
	public StorageUseReq storageReqOne(HashMap<String, Object> i_param) {
		return logisDao.storageReqOne(i_param);
	}

	@Override
	public cCustPurRate cCustPurRateAdd(HashMap<String, Object> params) {
		return logisDao.cCustPurRateAdd(params);
	}

	@Override
	public List<cCustPurRate> cCustPurRatelist(HashMap<String, Object> i_param) {
		return logisDao.cCustPurRateList(i_param);
	}

	@Override
	public cCustPurRate cCustPurMakerRateAdd(HashMap<String, Object> params) {
		return logisDao.cCustPurMakerRateAdd(params);
	}

	@Override
	public cCustPurRate cCustPurItemRateAdd(HashMap<String, Object> params) {
		return logisDao.cCustPurItemRateAdd(params);
	}
	
	
	/*
	 * @Override public HashMap<String, Object> stockWrItemAdd(HashMap<String,
	 * Object> params) { HashMap<String, Object> map = new HashMap<String,
	 * Object>();
	 * 
	 * logisDao.stockWrItemAdd(params);
	 * 
	 * return map; }
	 * 
	 */
	
	@Override
	public List<SaleItemQty> rlStockList(HashMap<String,Object> i_param){
	
		return logisDao.rlStockList(i_param);
	}

	@Override
	public List<cCustSaleDcRate> cCustSaleDcRateList(HashMap<String, Object> i_param) {
		return logisDao.cCustSaleDcRateList(i_param);
	}

	@Override
	public HashMap<String, Object> cCustSaleDcRateAdd(HashMap<String, Object> params) {
		return logisDao.cCustSaleDcRateAdd(params);
	}

	@Override
	public List<StockItemOuterNonDsp> stockItemOuterNonDspList(HashMap<String, Object> params) {
		
		return logisDao.stockItemOuterNonDspList(params);
	}

	@Override
	public HashMap<String, Object> stockItemOuterNonDspAdd(HashMap<String, Object> i_params) {
		
		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
				
		HashMap<String, Object> map = new HashMap<String, Object>();

		int addErr = 0;
		int uptErr = 0;
		int delErr = 0;
		String msg = "";
		String errItem = "";
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		StockItemOuterNonDsp o_stockItemOuterNonDsp = new StockItemOuterNonDsp();
		ArrayList<StockItemOuterNonDsp> addList = (ArrayList<StockItemOuterNonDsp>) i_params.get("addList");
		params.clear();

		if (addList.size() > 0) {
			for (int i = 0, len = addList.size(); i < len; i++) {			
				o_stockItemOuterNonDsp = addList.get(i);
			//	o_stockItemOuterNonDsp.setWrNo(o_stockItemOuterNonDsp.getWrNo());
				params.put("workingType", "ADD");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("stockItemOuterNonDsp", o_stockItemOuterNonDsp);			

				o_stockItemOuterNonDsp = logisDao.stockItemOuterNonDspAdd(params);
				
				if (!("OK").equals(o_stockItemOuterNonDsp.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
					errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+o_stockItemOuterNonDsp.getItemNo() + " (" + o_stockItemOuterNonDsp.getDb_resultMsg()+")";
				}
			}
		}

		ArrayList<StockItemOuterNonDsp> updateList = (ArrayList<StockItemOuterNonDsp>) i_params.get("updateList");
		params.clear();
		
		if (updateList.size() > 0) {
			for (int i = 0, len = updateList.size(); i < len; i++) {			
				o_stockItemOuterNonDsp = updateList.get(i);
				//o_stockWrItem.setWrNo(o_stockWr.getWrNo());
				params.put("workingType", "UPT");
				params.put("logComCode",logComCode);
				params.put("logUserId", logUserId);
				params.put("stockItemOuterNonDsp", o_stockItemOuterNonDsp);			

				o_stockItemOuterNonDsp = logisDao.stockItemOuterNonDspAdd(params);
				
				if (!("OK").equals(o_stockItemOuterNonDsp.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
					errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+o_stockItemOuterNonDsp.getItemNo() + " (" + o_stockItemOuterNonDsp.getDb_resultMsg()+")";
				}
			}
		}
		
		ArrayList<StockItemOuterNonDsp> removeList = (ArrayList<StockItemOuterNonDsp>) i_params.get("removeList");
		params.clear();
		
		if (removeList.size() > 0) {
			for (int i = 0, len = removeList.size(); i < len; i++) {			
				o_stockItemOuterNonDsp = removeList.get(i);
				//o_stockWrItem.setWrNo(o_stockWr.getWrNo());
				params.put("workingType", "DEL");
				params.put("logComCode", logComCode);
				params.put("logUserId", logUserId);
				params.put("stockItemOuterNonDsp", o_stockItemOuterNonDsp);			

				o_stockItemOuterNonDsp = logisDao.stockItemOuterNonDspAdd(params);
				
				if (!("OK").equals(o_stockItemOuterNonDsp.getDb_resultCode())) { // 오류가 발생해서 처리못한 카운트
					addErr = addErr + 1;
					errItem = errItem + "\n "+Integer.toString(i+1)+". 품번: "+o_stockItemOuterNonDsp.getItemNo() + " (" + o_stockItemOuterNonDsp.getDb_resultMsg()+")";
				}
			}
		}

		// 결과 만들기
		if (addErr > 0 || uptErr > 0 || delErr > 0) {
			if (addErr > 0) {
				msg = "\n# 등록오류: " + addErr + "건" + " => "+errItem;
			} 
			if (uptErr > 0) {
				msg = msg+"\n# 수정오류: " + uptErr + "건" + " => "+errItem;
			} 
			if (delErr > 0) {
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

		return map;
	} 
	
	@Override
	public HashMap<String, Object> barcodeItem(HashMap<String, Object> params) {
		
		return logisDao.barcodeItem(params);
	}
	@Override
	public HashMap<String, Object> barcodeAdd(HashMap<String, Object> params) {
		
		return logisDao.barcodeAdd(params);
	}

	@Override
	public List<LogisRack> logisRackList(HashMap<String, Object> params) {
		
		return logisDao.logisRackList(params);
	}

	@Override
	public LogisRack logisRackReg(HashMap<String, Object> params) {
		
		return logisDao.logisRackReg(params);
	}
	
	@Override
	public List<HashMap<String, Object>> stockRackItemFind(HashMap<String, Object> params) {
		
		return logisDao.stockRackItemFind(params);
	}
	@Override
	public List<HashMap<String, Object>> inventoryPayment(HashMap<String, Object> params) {
		
		return logisDao.inventoryPayment(params);
	}
 
}
