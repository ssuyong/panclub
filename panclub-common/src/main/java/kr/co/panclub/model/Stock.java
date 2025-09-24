package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class Stock {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String stockYm;                       // --재고년월
	private long itemId;                       // -- 품목ID 
	private String storCode;                       // --창고코드
	private String storName;
	private int whQty;                       // -- 입고수량
	private BigDecimal whAmt;                       // --입고금액
	private int rlQty;                       // --출고수량
	private BigDecimal rlAmt;                       //  --출고금액
	private String created;
	private String modified;
	
	private String itemNo;
	private String itemCode; 
	private String itemName;
	private String itemNameEn;
	private String factoryNo;             // 공장품번
	private String makerCode;             // 제조사코드
	private String makerName;             // 제조사명
	private String genuineYN;             // 정품여부
	private String itemExchangeId;        // 호환Id
	private BigDecimal centerPrice;            // 센터가
	private BigDecimal inPrice;             // 입고단가
	private BigDecimal salePrice;           // 판매단가
	private int stockQty;
	
	
	private String classCode;			// 230317 장윤상 추가/ 돈관련 자료형 BigDecimal 교체
	private String className;			// 부품구분
	private String rackCode;                       // --렉코드
	private String rackName;
	private BigDecimal stockAmt; 		//재고금액
	private String regUserId;			//등록,수정자
	private String uptUserId;
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
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getStockYm() {
		return stockYm;
	}
	public void setStockYm(String stockYm) {
		this.stockYm = stockYm;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
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
	public int getWhQty() {
		return whQty;
	}
	public void setWhQty(int whQty) {
		this.whQty = whQty;
	}
	public BigDecimal getWhAmt() {
		return whAmt;
	}
	public void setWhAmt(BigDecimal whAmt) {
		this.whAmt = whAmt;
	}
	public int getRlQty() {
		return rlQty;
	}
	public void setRlQty(int rlQty) {
		this.rlQty = rlQty;
	}
	public BigDecimal getRlAmt() {
		return rlAmt;
	}
	public void setRlAmt(BigDecimal rlAmt) {
		this.rlAmt = rlAmt;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getItemNameEn() {
		return itemNameEn;
	}
	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
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
	public String getGenuineYN() {
		return genuineYN;
	}
	public void setGenuineYN(String genuineYN) {
		this.genuineYN = genuineYN;
	}
	public String getItemExchangeId() {
		return itemExchangeId;
	}
	public void setItemExchangeId(String itemExchangeId) {
		this.itemExchangeId = itemExchangeId;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public BigDecimal getInPrice() {
		return inPrice;
	}
	public void setInPrice(BigDecimal inPrice) {
		this.inPrice = inPrice;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
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
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public BigDecimal getStockAmt() {
		return stockAmt;
	}
	public void setStockAmt(BigDecimal stockAmt) {
		this.stockAmt = stockAmt;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	@Override
	public String toString() {
		return "Stock [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", stockYm=" + stockYm + ", itemId=" + itemId + ", storCode="
				+ storCode + ", storName=" + storName + ", whQty=" + whQty + ", whAmt=" + whAmt + ", rlQty=" + rlQty
				+ ", rlAmt=" + rlAmt + ", created=" + created + ", modified=" + modified + ", itemNo=" + itemNo
				+ ", itemCode=" + itemCode + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", factoryNo="
				+ factoryNo + ", makerCode=" + makerCode + ", makerName=" + makerName + ", genuineYN=" + genuineYN
				+ ", itemExchangeId=" + itemExchangeId + ", centerPrice=" + centerPrice + ", inPrice=" + inPrice
				+ ", salePrice=" + salePrice + ", stockQty=" + stockQty + ", classCode=" + classCode + ", className="
				+ className + ", rackCode=" + rackCode + ", rackName=" + rackName + ", stockAmt=" + stockAmt
				+ ", regUserId=" + regUserId + ", uptUserId=" + uptUserId + "]";
	}
	
	
	
	
}
