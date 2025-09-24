package kr.co.panclub.model;

import java.math.BigDecimal;

public class StockItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private long idx;
	private String comCode;
	private long itemId;
	private int stockQty;          // -- 재고수량
	private String locaMemo;    // --재고위치테스트
	private String wrMemo;    //  --최종입출고텍스트
	private String inspecMemo;    // -- 최종실사텍스트
	private String regUserId;    //
	private String regYmd;    //
	private String regHms;    //
	private String uptUserId;    //
	private String uptYmd;    //
	private String uptHms;    //
	
	private String itemNo;
	private String itemName;
	private String regUserName;
	private String uptUserName;
	
	private String storCode;
	private String storName;
	private String makerCode;
	private String makerName;
	private String classCode;
	private String className;
	
	private BigDecimal centerPrice;
	private BigDecimal costPrice;
	private BigDecimal salePrice;
	
	
	// 재고수동처리 관련 2023.05.11 hsg
	private String actionType;   //작업구분
	private String rackCode;   //현재랙
    private String procQty;    //처리수량
    private String afterRackCode;  //이동랙
    private String procMemo1;
    private String inPrice; //입고단가 2023.05.23 bk
    
    private int workableQty;          // --2023.10.04 yoonsang 판매가능수량
    
    private String checkType; // 231012 yoonsang 외주창고 구분
    private String outStorCode; // 231012 yoonsang 외주창고코드
    
    //2023.10.13 hsg
    private String custCode;
    private String custName;

    private String storageCode; //231019
    
    private String qtyNew; //231102
    private String qtyUsed; //231102
    private String qtyRefur; //231102
    
    private String qtyCtNew;   //supi 4개의 변수 =  회수 신품 중고 리퍼 불량
    private String qtyCtUsed;
    private String qtyCtRefur;
    private String qtyCtBad;
    
    private String outSalePrice; // 20240205 supi 4car재고조회 가격  , 자신의 업체에 따라 매입가,센터가 두가지 타입이 있으며 매입가 = 가격 * 위탁매입율(미설정40%) * 마진율 , 센터가 기준은 센터가에 할인율 적용한 가격
    
    private String factoryNo; //2024.07.24

    
    private String jobNo; // 20240730 yoonsang 재고투입시 stockInReqItem 테이블 처리하기위해 키값을 넘김 (idx,rono)
    private String jobSeq; // 20240730 yoonsang 재고투입시 stockInReqItem 테이블 처리하기위해 키값을 넘김 ('',roSeq)
    
    private String reqComCode; // 20240730 yoonsang 재고투입시 saleitem 반품입고 생성하기위해 (plcomCode)
    private String placeNo; // 20240730 yoonsang 재고투입시 saleitem 반품입고 생성하기위해 (plcomCode)
    private String placeSeq; // 20240730 yoonsang 재고투입시 saleitem 반품입고 생성하기위해 (plcomCode)
    
    private String otherSaleType; // 250516 yoonsang 다른할인율적용

    private String saleRate; // 250519 yoonsang 다른할인율적용
    private String stockRackCode; // 250628 yoonsang 다른할인율적용
	public String getWorkingType() {
		return workingType;
	}
	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}
	public String getDb_resultCode() {
		return db_resultCode;
	}
	public void setDb_resultCode(String db_resultCode) {
		this.db_resultCode = db_resultCode;
	}
	public String getDb_resultMsg() {
		return db_resultMsg;
	}
	public void setDb_resultMsg(String db_resultMsg) {
		this.db_resultMsg = db_resultMsg;
	}
	public long getIdx() {
		return idx;
	}
	public void setIdx(long idx) {
		this.idx = idx;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public String getLocaMemo() {
		return locaMemo;
	}
	public void setLocaMemo(String locaMemo) {
		this.locaMemo = locaMemo;
	}
	public String getWrMemo() {
		return wrMemo;
	}
	public void setWrMemo(String wrMemo) {
		this.wrMemo = wrMemo;
	}
	public String getInspecMemo() {
		return inspecMemo;
	}
	public void setInspecMemo(String inspecMemo) {
		this.inspecMemo = inspecMemo;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getRegYmd() {
		return regYmd;
	}
	public void setRegYmd(String regYmd) {
		this.regYmd = regYmd;
	}
	public String getRegHms() {
		return regHms;
	}
	public void setRegHms(String regHms) {
		this.regHms = regHms;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getUptYmd() {
		return uptYmd;
	}
	public void setUptYmd(String uptYmd) {
		this.uptYmd = uptYmd;
	}
	public String getUptHms() {
		return uptHms;
	}
	public void setUptHms(String uptHms) {
		this.uptHms = uptHms;
	}
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getUptUserName() {
		return uptUserName;
	}
	public void setUptUserName(String uptUserName) {
		this.uptUserName = uptUserName;
	}
	public String getStorCode() {
		return storCode;
	}
	public void setStorCode(String storCode) {
		this.storCode = storCode;
	}
	public String getStorName() {
		return storName;
	}
	public void setStorName(String storName) {
		this.storName = storName;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getClassCode() {
		return classCode;
	}
	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public BigDecimal getCostPrice() {
		return costPrice;
	}
	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public String getActionType() {
		return actionType;
	}
	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getProcQty() {
		return procQty;
	}
	public void setProcQty(String procQty) {
		this.procQty = procQty;
	}
	public String getAfterRackCode() {
		return afterRackCode;
	}
	public void setAfterRackCode(String afterRackCode) {
		this.afterRackCode = afterRackCode;
	}
	public String getProcMemo1() {
		return procMemo1;
	}
	public void setProcMemo1(String procMemo1) {
		this.procMemo1 = procMemo1;
	}
	public String getInPrice() {
		return inPrice;
	}
	public void setInPrice(String inPrice) {
		this.inPrice = inPrice;
	}
	public int getWorkableQty() {
		return workableQty;
	}
	public void setWorkableQty(int workableQty) {
		this.workableQty = workableQty;
	}
	public String getCheckType() {
		return checkType;
	}
	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}
	public String getOutStorCode() {
		return outStorCode;
	}
	public void setOutStorCode(String outStorCode) {
		this.outStorCode = outStorCode;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getQtyNew() {
		return qtyNew;
	}
	public void setQtyNew(String qtyNew) {
		this.qtyNew = qtyNew;
	}
	public String getQtyUsed() {
		return qtyUsed;
	}
	public void setQtyUsed(String qtyUsed) {
		this.qtyUsed = qtyUsed;
	}
	public String getQtyRefur() {
		return qtyRefur;
	}
	public void setQtyRefur(String qtyRefur) {
		this.qtyRefur = qtyRefur;
	}
	public String getQtyCtNew() {
		return qtyCtNew;
	}
	public void setQtyCtNew(String qtyCtNew) {
		this.qtyCtNew = qtyCtNew;
	}
	public String getQtyCtUsed() {
		return qtyCtUsed;
	}
	public void setQtyCtUsed(String qtyCtUsed) {
		this.qtyCtUsed = qtyCtUsed;
	}
	public String getQtyCtRefur() {
		return qtyCtRefur;
	}
	public void setQtyCtRefur(String qtyCtRefur) {
		this.qtyCtRefur = qtyCtRefur;
	}
	public String getQtyCtBad() {
		return qtyCtBad;
	}
	public void setQtyCtBad(String qtyCtBad) {
		this.qtyCtBad = qtyCtBad;
	}
	public String getOutSalePrice() {
		return outSalePrice;
	}
	public void setOutSalePrice(String outSalePrice) {
		this.outSalePrice = outSalePrice;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getJobSeq() {
		return jobSeq;
	}
	public void setJobSeq(String jobSeq) {
		this.jobSeq = jobSeq;
	}
	public String getReqComCode() {
		return reqComCode;
	}
	public void setReqComCode(String reqComCode) {
		this.reqComCode = reqComCode;
	}
	public String getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(String placeNo) {
		this.placeNo = placeNo;
	}
	public String getPlaceSeq() {
		return placeSeq;
	}
	public void setPlaceSeq(String placeSeq) {
		this.placeSeq = placeSeq;
	}
	public String getOtherSaleType() {
		return otherSaleType;
	}
	public void setOtherSaleType(String otherSaleType) {
		this.otherSaleType = otherSaleType;
	}
	public String getSaleRate() {
		return saleRate;
	}
	public void setSaleRate(String saleRate) {
		this.saleRate = saleRate;
	}
	public String getStockRackCode() {
		return stockRackCode;
	}
	public void setStockRackCode(String stockRackCode) {
		this.stockRackCode = stockRackCode;
	}
	@Override
	public String toString() {
		return "StockItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", comCode=" + comCode + ", itemId=" + itemId + ", stockQty="
				+ stockQty + ", locaMemo=" + locaMemo + ", wrMemo=" + wrMemo + ", inspecMemo=" + inspecMemo
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", itemNo=" + itemNo + ", itemName=" + itemName
				+ ", regUserName=" + regUserName + ", uptUserName=" + uptUserName + ", storCode=" + storCode
				+ ", storName=" + storName + ", makerCode=" + makerCode + ", makerName=" + makerName + ", classCode="
				+ classCode + ", className=" + className + ", centerPrice=" + centerPrice + ", costPrice=" + costPrice
				+ ", salePrice=" + salePrice + ", actionType=" + actionType + ", rackCode=" + rackCode + ", procQty="
				+ procQty + ", afterRackCode=" + afterRackCode + ", procMemo1=" + procMemo1 + ", inPrice=" + inPrice
				+ ", workableQty=" + workableQty + ", checkType=" + checkType + ", outStorCode=" + outStorCode
				+ ", custCode=" + custCode + ", custName=" + custName + ", storageCode=" + storageCode + ", qtyNew="
				+ qtyNew + ", qtyUsed=" + qtyUsed + ", qtyRefur=" + qtyRefur + ", qtyCtNew=" + qtyCtNew + ", qtyCtUsed="
				+ qtyCtUsed + ", qtyCtRefur=" + qtyCtRefur + ", qtyCtBad=" + qtyCtBad + ", outSalePrice=" + outSalePrice
				+ ", factoryNo=" + factoryNo + ", jobNo=" + jobNo + ", jobSeq=" + jobSeq + ", reqComCode=" + reqComCode
				+ ", placeNo=" + placeNo + ", placeSeq=" + placeSeq + ", otherSaleType=" + otherSaleType + ", saleRate="
				+ saleRate + ", stockRackCode=" + stockRackCode + "]";
	}

	
	
}
