package kr.co.panclub.service;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import kr.co.panclub.common.ExcelRead;
import kr.co.panclub.common.ExcelReadOption;
import kr.co.panclub.dao.IOrderDao;
import kr.co.panclub.model.Cl;
import kr.co.panclub.model.ClGroup;
import kr.co.panclub.model.ClGroupMemo;
import kr.co.panclub.model.ClItem;
import kr.co.panclub.model.ClReq;
import kr.co.panclub.model.ClReqItem;
import kr.co.panclub.model.CtReq;
import kr.co.panclub.model.CtReqItem;
import kr.co.panclub.model.CtStorageRackQty;
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


@Service
public class Orderservice  implements IOrderService{
	@Autowired
	private HttpSession session;
	
	@Autowired
	private IOrderDao orderDao;

	@Override
	public Estimate estiAdd(HashMap<String, Object> params) {
		
		return orderDao.estiAdd(params);
	}

	@Override
	public List<Estimate> estiList(HashMap<String, Object> params) {
		
		return orderDao.estiList(params);
	}

	@Override
	public Estimate estiOne(HashMap<String, Object> params) {
		
		return orderDao.estiOne(params);
	}

	@Override
	public List<EstimateItem> estiItemList(HashMap<String, Object> params) {
		
		return orderDao.estiItemList(params);
	}

	@Override
	public EstimateItem estiItemAdd(HashMap<String, Object> params) {
		
		return orderDao.estiItemAdd(params);
	}

	@Override
	public Order orderAdd(HashMap<String, Object> params) {
		
		return orderDao.orderAdd(params);
	}

	@Override
	public List<Order> orderList(HashMap<String, Object> params) {
		
		return orderDao.orderList(params);
	}

	@Override
	public Order orderOne(HashMap<String, Object> params) {
		
		return orderDao.orderOne(params);
	}

	@Override
	public List<OrderItem> orderItemList(HashMap<String, Object> params) {
		
        //System.out.println("ddd:"+params.get("workingType"));
		List<OrderItem> orderItemList = new ArrayList<OrderItem>();
		if (("ONE").equals(params.get("workingType"))) {   //주문등록에서 주문1개의 품목들 조회. 2024.10.08 hsg
			orderItemList = orderDao.orderItemOneList(params);
		}else if (("WORK_LIST").equals(params.get("workingType"))) {  //부품거래현황에서 카윈거 까지 조회 . 2024.10.08 hsg
			orderItemList = orderDao.orderItemWorkList(params);
		}else {
			orderItemList = orderDao.orderItemList(params);
		}
		        				
        return orderItemList;  //"전체:"+ Integer.toString(target_count) + " 건 중 성공result_select;	      
        
		//return orderDao.orderItemList(params);
	}

	@Override
	public OrderItem orderItemAdd(HashMap<String, Object> params) {
		
		return orderDao.orderItemAdd(params);
	}

	@Override
	public EstimateItemPlaceStock estiItemPlaceStockAdd(HashMap<String, Object> params) {
		
		return orderDao.estiItemPlaceStockAdd(params);
	}

	@Override
	public List<EstimateItemPlaceStock> estiStockItemList(HashMap<String, Object> params) {
		
		return orderDao.estiStockItemList(params);
	}

	@Override
	public EstiImportCalc estiImportCalcAdd(HashMap<String, Object> params) {
		
		return orderDao.estiImportCalcAdd(params);
	}

	@Override
	public List<EstiImportCalc> estiImportCalcList(HashMap<String, Object> params) {

		return orderDao.estiImportCalcList(params);
	}

	@Override
	public List<OrderGroup> orderGroupList(HashMap<String, Object> params) {
		
		return orderDao.orderGroupList(params);
	}

	@Override
	public List<OrderGroupItem> orderGroupItemList(HashMap<String, Object> params) {
		
		return orderDao.orderGroupItemList(params);
	}

	@Override
	public PlaceReq placeReqAdd(HashMap<String, Object> params) {
		
		return orderDao.placeReqAdd(params);
	}

	@Override
	public PlaceReqItem placeReqItemAdd(HashMap<String, Object> params) {
		
		return orderDao.placeReqItemAdd(params);
	}

	@Override
	public OrderItemPlaceStock orderItemPlaceStockAdd(HashMap<String, Object> params) {
		
		return orderDao.orderItemPlaceStockAdd(params);
	}

	@Override
	public List<OrderItemPlaceStock> orderStockItemList(HashMap<String, Object> params) {
		
		return orderDao.orderStockItemList(params);
	}

	@Override
	public OrderImportCalc orderImportCalcAdd(HashMap<String, Object> params) {
		
		return orderDao.orderImportCalcAdd(params);
	}

	@Override
	public List<OrderImportCalc> orderImportCalcList(HashMap<String, Object> params) {
		
		return orderDao.orderImportCalcList(params);
	}

	@Override
	public List<PlaceReqItem> placeReqItemList(HashMap<String, Object> params) {
		
		return orderDao.placeReqItemList(params);
	}

	@Override
	public Place placeAdd(HashMap<String, Object> params) {
		
		return orderDao.placeAdd(params);
	}

	@Override
	public List<Place> placeList(HashMap<String, Object> params) {
		
		return orderDao.placeList(params);
	}

	@Override
	public List<PlaceItem> placeItemList(HashMap<String, Object> params) {
		
		return orderDao.placeItemList(params);
	}

	@Override
	public PlaceItem placeItemAdd(HashMap<String, Object> params) {
		
		return orderDao.placeItemAdd(params);
	}
	


	@Override
	public StorageUseReq storageUseReqAdd(HashMap<String, Object> params) {
		
		return orderDao.storageUseReqAdd(params);
	}

	@Override
	public StorageUseReqItem storageUseReqItemAdd(HashMap<String, Object> params) {
		
		return orderDao.storageUseReqItemAdd(params);
	}

	@Override
	public EstiStorageUse estiStorageUseAdd(HashMap<String, Object> params) {
		
		return orderDao.estiStorageUseAdd(params);
	}

	@Override
	public List<EstiStorageUse> estiStorageUseList(HashMap<String, Object> params) {
		
		return orderDao.estiStorageUseList(params);
	}

	@Override
	public OrderStorageUse orderStorageUseAdd(HashMap<String, Object> params) {
		
		return orderDao.orderStorageUseAdd(params);
	}

	@Override
	public List<OrderStorageUse> orderStorageUseList(HashMap<String, Object> params) {
		
		return orderDao.orderStorageUseList(params);
	}

	@Override
	public StorMvReq storMvReqAdd(HashMap<String, Object> params) {
		
		return orderDao.storMvReqAdd(params);
	}

	@Override
	public StorMvReqItem storMvReqItemAdd(HashMap<String, Object> params) {

		return orderDao.storMvReqItemAdd(params);
	}

	@Override
	public ClReq clReqAdd(HashMap<String, Object> params) {
		
		return orderDao.clReqAdd(params);
	}

	@Override
	public ClReqItem clReqItemAdd(HashMap<String, Object> params) {
		
		return orderDao.clReqItemAdd(params);
	}

	@Override
	public List<ClReq> clReqList(HashMap<String, Object> params) {
		
		return orderDao.clReqList(params);
	}

	@Override
	public List<ClReqItem> clReqItemList(HashMap<String, Object> params) {
		
		return orderDao.clReqItemList(params);
	}

	@Override
	public Cl clAdd(HashMap<String, Object> params) {
		
		return orderDao.clAdd(params);
	}

	@Override
	public List<Cl> clList(HashMap<String, Object> params) {
		
		return orderDao.clList(params);
	}

	@Override
	public List<ClItem> clItemList(HashMap<String, Object> params) {
		
		return orderDao.clItemList(params);
	}

	@Override
	public ClItem clItemAdd(HashMap<String, Object> params) {
		
		return orderDao.clItemAdd(params);
	}

	/*
	 * 2023.06.27 hsg - 단가가 입력이 안된 경우 부품의 단가를 가져와서 디스플레이
	 */
	@Override
	public HashMap<String, Object> estiAddExcel(EstiExcel estiExcel, File destFile) throws Exception {

	        ExcelReadOption excelReadOption = new ExcelReadOption();
	        excelReadOption.setFilePath(destFile.getAbsolutePath());
	/*        excelReadOption.setOutputColumns();
	 * 품목코드 	주문수량 	문의사항 	사용자메모
	*/
		  
		  
		    
		   
	        String article_itemNo = "";
	        int article_qty = 1;
	        BigDecimal article_unitPrice = new BigDecimal("0.00");
	        String article_memo = "";
	        String article_placeCustCode = "";
	        BigDecimal article_placeUnitPrice = new BigDecimal("0.00");
	        
		    String articleA = estiExcel.getXls_itemNo();
	        String articleB = estiExcel.getXls_qty();
	        String articleC = estiExcel.getXls_unitPrice();	        		
	        String articleD = estiExcel.getXls_memo();
	        String articleE = estiExcel.getXls_placeCustCode();
	        String articleF = estiExcel.getXls_placeUnitPrice();
	        
	        int sRow = estiExcel.getXls_sRow();
	        String connectYN = estiExcel.getConnectYN();
	        
	        excelReadOption.setOutputColumns("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

	        excelReadOption.setStartRow(sRow);
	        
	        List<Map<String, String>> excelContent =ExcelRead.read(excelReadOption);
          
	        HashMap<String, Object> params = new HashMap<String, Object>();	        
	       
	        List<EstimateItem> estiItemList = new ArrayList<EstimateItem>();
	        
	        HashMap<String, Object> i_params = new HashMap<String, Object>();  //상품정보와 발주처정보 가져오기위한 용도
	        EstimateItem i_estiItem = new EstimateItem(); //상품정보와 발주처정보 가져오기위한 용도
	        EstimateItem o_estiItem = new EstimateItem(); //상품정보와 발주처정보 가져오기위한 용도
	        
	        for(Map<String, String> article: excelContent){
	        	EstimateItem estiItem = new EstimateItem();
	        	//if (("").equals(article.get(articleA)) || ("").equals(article.get(articleB))) {  // 품목코드 또는  량 공백이 들어오는 경우 있어서 이경우 skip 처리
	        	if ( ("").equals(article.get(articleA)) ) {  // 품목코드 또는  량 공백이 들어오는 경우 있어서 이경우 skip 처리
	        		continue;
	        	}
	        	
	        	if (("").equals(article.get(articleA)) || article.get(articleA) == null) {	 article_itemNo = "";	   	} else {  		article_itemNo = article.get(articleA);	        	}
	        	estiItem.setItemNo(article_itemNo);// 품번

	        	if (("").equals(article.get(articleB)) || article.get(articleB) == null) {	 
	        		article_qty = 0;	   	
	        	} else {   		
	        		article_qty = Integer.parseInt(String.format("%.0f",Double.parseDouble(article.get(articleB))));	        	
	        	}
	        	estiItem.setCnt(article_qty);	     //	수량	
	        	
	        	if (("").equals(article.get(articleC)) || article.get(articleC) == null) {    
	        		article_unitPrice = BigDecimal.valueOf(0.01);    	
	        	} else {   		
	        		article_unitPrice = new BigDecimal(String.format("%.0f",Double.parseDouble(article.get(articleC))));
	        		//article_unitPrice = Integer.parseInt(String.format("%.0f",Double.parseDouble(article.get(articleC)))); 	        	
	        	}
	        	estiItem.setUnitPrice(article_unitPrice); //	단가
	        	
	        	if (("").equals(article.get(articleD)) || article.get(articleD) == null) {	 article_memo = "";	   	} else {   		article_memo = article.get(articleD);	        	}
	        	estiItem.setMemo(article_memo);  //비고
	        	
	        	if (("").equals(article.get(articleE)) || article.get(articleE) == null) {	 article_placeCustCode = "";	   	} else {   		article_placeCustCode = article.get(articleE);	        	}
	        	estiItem.setPlaceCustCode(article_placeCustCode);  //발주처코드
	        
	        	if (("").equals(article.get(articleF)) || article.get(articleF) == null) {	 
	        		article_placeUnitPrice = BigDecimal.valueOf(0.01);	   	
	        	} else {   		
	        		article_placeUnitPrice = new BigDecimal(String.format("%.0f",Double.parseDouble(article.get(articleF))));        	
	        	}
	        	estiItem.setPlaceUnitPrice(article_placeUnitPrice);  //발주단가
	            
	        	//엑셀이외의 상품정보, 발주처 정보는 DB에서 불러와서 SET
	        	i_estiItem.setItemNo(article_itemNo);
	        	i_estiItem.setPlaceCustCode(article_placeCustCode);
	        	
	        	String logComCode = (String) session.getAttribute("comCode");
	        	
	        	i_params.put("workingType", "NOT_SAVED");
	        	i_params.put("logComCode", logComCode);
	        	i_params.put("estiItem", i_estiItem);
	        	
	        	
	        	o_estiItem = orderDao.estiItemOne(i_params);
	        	estiItem.setItemId(o_estiItem.getItemId());
	        	estiItem.setItemName(o_estiItem.getItemName());
	        	estiItem.setItemNameEn(o_estiItem.getItemNameEn());
	        	estiItem.setPlaceCustName(o_estiItem.getPlaceCustName());	
	        	
	        	if (("").equals(article.get(articleC)) || article.get(articleC) == null) {  //단가가 입력이 안된 경우 부품의 단가를 가져와서 디스플레이
	        		estiItem.setUnitPrice(o_estiItem.getSalePrice());	
	        	}
	        	///End
	        	
	        	
	        	estiItemList.add(estiItem);
	        }	        

	        
	        params.put("estiItemList", estiItemList);  //전체대상수
	        
	        return params;  //"전체:"+ Integer.toString(target_count) + " 건 중 성공result_select;	        		
	}
	
	/*
	 * 2023.06.27 hsg - 단가가 입력이 안된 경우 부품의 단가를 가져와서 디스플레이
	 */
	@Override
	public HashMap<String, Object> orderAddExcel(OrderExcel orderExcel, File destFile) throws Exception {

	        ExcelReadOption excelReadOption = new ExcelReadOption();
	        excelReadOption.setFilePath(destFile.getAbsolutePath());
	/*        excelReadOption.setOutputColumns();
	 * 품목코드 	주문수량 	문의사항 	사용자메모
	*/
		     String article_itemNo = "";
	        int article_qty = 1;
	        BigDecimal article_unitPrice = new BigDecimal("0.00");
	        String article_memo = "";
	        String article_placeCustCode = "";
	        BigDecimal article_placeUnitPrice = new BigDecimal("0.00");
	        
		    String articleA = orderExcel.getXls_itemNo();
	        String articleB = orderExcel.getXls_qty();
	        String articleC = orderExcel.getXls_unitPrice();	        		
	        String articleD = orderExcel.getXls_memo();
	        String articleE = orderExcel.getXls_placeCustCode();
	        String articleF = orderExcel.getXls_placeUnitPrice();
	        
	        int sRow = orderExcel.getXls_sRow();
	        String connectYN = orderExcel.getConnectYN();
	        
	        excelReadOption.setOutputColumns("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

	        excelReadOption.setStartRow(sRow);
	        
	        List<Map<String, String>> excelContent =ExcelRead.read(excelReadOption);
          
	        HashMap<String, Object> params = new HashMap<String, Object>();	        
	       
	        List<OrderItem> orderItemList = new ArrayList<OrderItem>();
	        
	        HashMap<String, Object> i_params = new HashMap<String, Object>();  //상품정보와 발주처정보 가져오기위한 용도
	        OrderItem i_orderItem = new OrderItem(); //상품정보와 발주처정보 가져오기위한 용도
	        OrderItem o_orderItem = new OrderItem(); //상품정보와 발주처정보 가져오기위한 용도

        	String logComCode = (String) session.getAttribute("comCode");

	        for(Map<String, String> article: excelContent){
	        	OrderItem orderItem = new OrderItem();
	        	//if (("").equals(article.get(articleA)) || ("").equals(article.get(articleB))) {  // 품목코드 또는  량 공백이 들어오는 경우 있어서 이경우 skip 처리
	        	if ( ("").equals(article.get(articleA)) ) {  // 품목코드 또는  량 공백이 들어오는 경우 있어서 이경우 skip 처리
	        		continue;
	        	}
	        	
	        	if (("").equals(article.get(articleA)) || article.get(articleA) == null) {	 article_itemNo = "";	   	} else {  		article_itemNo = article.get(articleA);	        	}
	        	orderItem.setItemNo(article_itemNo);// 품번

	        	if (("").equals(article.get(articleB)) || article.get(articleB) == null) {	 
	        		article_qty = 0;	   	
	        	} else {   		
	        		article_qty = Integer.parseInt(String.format("%.0f",Double.parseDouble(article.get(articleB))));	        	
	        	}
	        	orderItem.setCnt(article_qty);	     //	수량	
	        	
	        	if (("").equals(article.get(articleC)) || article.get(articleC) == null) {    
	        		article_unitPrice = BigDecimal.valueOf(0.01);    	
	        	} else {   		
	        		article_unitPrice = new BigDecimal(String.format("%.0f",Double.parseDouble(article.get(articleC))));
	        		//article_unitPrice = Integer.parseInt(String.format("%.0f",Double.parseDouble(article.get(articleC)))); 	        	
	        	}
	        	orderItem.setUnitPrice(article_unitPrice); //	단가
	        	
	        	if (("").equals(article.get(articleD)) || article.get(articleD) == null) {	 article_memo = "";	   	} else {   		article_memo = article.get(articleD);	        	}
	        	orderItem.setMemo(article_memo);  //비고
	        	
	        	if (("").equals(article.get(articleE)) || article.get(articleE) == null) {	 article_placeCustCode = "";	   	} else {   		article_placeCustCode = article.get(articleE);	        	}
	        	orderItem.setPlaceCustCode(article_placeCustCode);  //발주처코드
	        
	        	if (("").equals(article.get(articleF)) || article.get(articleF) == null) {	 
	        		article_placeUnitPrice = BigDecimal.valueOf(0.01);	   	
	        	} else {   		
	        		article_placeUnitPrice = new BigDecimal(String.format("%.0f",Double.parseDouble(article.get(articleF))));        	
	        	}
	        	orderItem.setPlaceUnitPrice(article_placeUnitPrice);  //발주단가
	        	
	        	
	        	//엑셀이외의 상품정보, 발주처 정보는 DB에서 불러와서 SET
	        	i_orderItem.setItemNo(article_itemNo);
	        	i_orderItem.setPlaceCustCode(article_placeCustCode);
	        	
	        	i_params.put("workingType", "NOT_SAVED");
	        	i_params.put("logComCode", logComCode);
	        	i_params.put("orderItem", i_orderItem);
	        	
	        	//o_orderItem = orderDao.orderItemOne(i_params);
	        	o_orderItem = orderDao.orderItemNotSaved(i_params);  //2024.10.08 hsg 위에거에서 변경
	        	orderItem.setItemId(o_orderItem.getItemId());
	        	orderItem.setItemName(o_orderItem.getItemName());
	        	orderItem.setItemNameEn(o_orderItem.getItemNameEn());
	        	orderItem.setPlaceCustName(o_orderItem.getPlaceCustName());	  
	        	
	        	orderItem.setCenterPrice(o_orderItem.getCenterPrice());
	        	if (("").equals(article.get(articleC)) || article.get(articleC) == null) {  //단가가 입력이 안된 경우 부품의 단가를 가져와서 디스플레이
	        		orderItem.setUnitPrice(o_orderItem.getSalePrice());	
	        	}
	        	///End
	        	
	        	
	        	orderItemList.add(orderItem);
	        }	        
	        
	        
	        params.put("orderItemList", orderItemList);  //전체대상수
	        
	        return params;  //"전체:"+ Integer.toString(target_count) + " 건 중 성공result_select;	        		
	}

	@Override
	public int orderItemCheck(HashMap<String, Object> checkParams) {					//주문아이템중복등록체크
		List<OrderItem> checkList = orderDao.orderItemList(checkParams);
		int result = 0;
		for (int i = 0, len = checkList.size(); i < len; i++) {
			
			if ((checkParams.get("logComCode")).equals(checkList.get(i).getComCode())
					&& (checkParams.get("estiNo")).equals(checkList.get(i).getEstiNo())
					&& (checkParams.get("estiSeq")).equals(checkList.get(i).getEstiSeq())){
				result = -1;
				break;
			}
		}
		return result;
	}

	@Override
	public int placeItemCheck(HashMap<String, Object> checkParams) {					//발주등록하는데 요청취소하는 상황 대처
		List<PlaceReqItem> checkList = orderDao.placeReqItemList(checkParams);
		//System.out.println("checkList.size() :" +checkList.size());
		int result=0;
		if(checkList.size() == 0) {
			result = -1;
			return result;
		}
		
		return result;
	}

	@Override
	public Place placeOne(HashMap<String, Object> i_param) {
		
		return orderDao.placeOne(i_param);
	}

	@Override
	public ClGroupMemo clMemoAdd(HashMap<String, Object> params) {
		return orderDao.clMemoAdd(params);
	}

	@Override
	public List<ClGroupMemo> clMemoList(HashMap<String, Object> i_param) {
		
		return orderDao.clMemoList(i_param);                                  
	}

	@Override
	public List<ClGroup> clGroupList(HashMap<String, Object> i_param) {
	
		return orderDao.clGroupList(i_param);
	}

	@Override
	public ClGroup clGroupAdd(HashMap<String, Object> params) {
		return orderDao.clGroupAdd(params);
	}

	@Override
	public ClGroup clGroupOne(HashMap<String, Object> i_param) {
		return orderDao.clGroupOne(i_param);
	}

	@Override
	public List<NoClItem> noClItemList(HashMap<String, Object> params) {
		
		return orderDao.noClItemList(params);
	}

	@Override
	public OrderGroup orderGroupOne(HashMap<String, Object> i_param) {
		return orderDao.orderGroupOne(i_param);
	}

	@Override
	public List<PcReq> pcReqList(HashMap<String, Object> i_param) {
		return orderDao.pcReqList(i_param);
	}

	@Override
	public List<PcReqItem> pcReqItemList(HashMap<String, Object> i_param) {
		return orderDao.pcReqItemList (i_param);
	}

	
	@Override
	public PcReq pcReqAdd(HashMap<String, Object> params) {
		return orderDao.pcReqAdd(params);
	}

	@Override
	public List<Insurance> insuranceList(HashMap<String, Object> i_param) {   
		return orderDao.insuranceList (i_param);
	}

	@Override
	public OrderGroup orderGroupChange(HashMap<String, Object> params) {
		return orderDao.orderGroupChange(params);
	}

	@Override
	public List<OrderGroupItem> rlReqItemTgList(HashMap<String, Object> params) {
		
		return orderDao.rlReqItemTgList(params);
	}

	@Override
	public List<NoCl> noClList(HashMap<String, Object> params) {
		
		return orderDao.noClList(params);
	}

	@Override
	public List<OrderGroupItem> plReqItemTgList(HashMap<String, Object> params) {
		
		return orderDao.plReqItemTgList(params);
	}

	@Override
	public List<OrderGroupItem> riReqItemTgList(HashMap<String, Object> params) {
		
		return orderDao.riReqItemTgList(params);
	}

	@Override
	public List<OrderGroupItem> roReqItemTgList(HashMap<String, Object> params) {
		
		return orderDao.roReqItemTgList(params);
	}

	@Override
	public List<OrderGroupItem> clReqItemTgList(HashMap<String, Object> params) {
		
		return orderDao.clReqItemTgList(params);
	}

	@Override
	public List<UptOrderCnt> orderCntUptList(HashMap<String, Object> i_param) {
		return orderDao.orderCntUptList(i_param);
	}

	@Override
	public UptOrderCnt orderCntUpt(HashMap<String, Object> params) {
		return orderDao.orderCntUpt(params);
	}

	
	@Override// 회수요청 마스터 및 디테일 등록&수정
	public HashMap<String, Object>  ctReqAdd(HashMap<String, Object> params) {
		return orderDao.ctReqAdd(params);
	}
	@Override // 회수요청 디테일 삭제 (디테일이 0개인 마스터도 삭제)
	public HashMap<String, Object>  ctReqDel(HashMap<String, Object> params) {
		return orderDao.ctReqDel(params);
	}
	
	@Override// 회수요청 마스터리스트 조회
	public List<CtReq> ctReqList(HashMap<String, Object> i_param) {
		return orderDao.ctReqList(i_param);
	}

	@Override// 회수요청 디테일 리스트 조회  
	public List<CtReqItem> ctReqItemList(HashMap<String, Object> i_param) {
		return orderDao.ctReqItemList (i_param);
	}
	@Override// 회수요청 디테일들 or 아이템id배열의 창고,랙,수량 검색 
	public List<CtStorageRackQty> ctStoRackList(HashMap<String, Object> i_param) {
		return orderDao.ctStoRackList (i_param);
	}
	@Override// 회수요청 실제처리
	public HashMap<String, Object> ctProcess(HashMap<String, Object> i_param) {
		return orderDao.ctProcess (i_param);
	}
	@Override// 2024.07.17 supi 재고투입내역 조회
	public List<HashMap<String, Object>> stockInReqItemList(HashMap<String, Object> i_param) {
		return orderDao.stockInReqItemList (i_param);
	}
	@Override// 2024.07.17 supi 재고투입요청
	public HashMap<String, Object> stockInReqItemAdd(HashMap<String, Object> i_param) {
		return orderDao.stockInReqItemAdd (i_param);
	}
	@Override// 2024.07.23 supi 회수완료취소
	public HashMap<String, Object> ctProcCancel(HashMap<String, Object> i_param) {
		return orderDao.ctProcCancel (i_param);
	}

	@Override
	public List<OrderItem> clIgnItemList(HashMap<String, Object> i_param) {
		return orderDao.clIgnItemList(i_param);
	}

}
