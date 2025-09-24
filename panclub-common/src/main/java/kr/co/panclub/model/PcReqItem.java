package kr.co.panclub.model;
import java.math.BigDecimal;
import java.util.Date;

public class PcReqItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String pcReqNo;
	private String reqSeq;
	private String gvComCode;
	private String gvPlaceNo;
	private String gvPlaceSeq;
	
	private String inMemo1;
	private String regUserId;  // 
	private Date created;  // 

	private String uptUserId;  // 
	private Date modified;  // 
	
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private int cnt;  //  -- 수량
	
	private String makerCode;  //  --제조사코드
	private long itemId;  //  -- 품목ID,  
	private BigDecimal saleUnitPrice;  // --판매단가
	private BigDecimal unitPrice;  // --발주(입고)단가
	private BigDecimal sumPrice;  // --합계
	private String supplyCustCode;  // -- 납품처

	//납품처 2023.03.20 hsg
	private String rcvCustCode;
	private String rcvCustName;
	
	private BigDecimal salePrice;   //부품판매단가

	private String dlvType;//2023.09.04 bk 배송유형
	
	private String storageName;
	private String storageCode;
	private String rackName;
	private String rackCode;
	private String stockQty;

	//2023.11.16 hsg -외부업체에서 주문요청하는 경우 발주번호가 아닌 품목과 수량, 메모를 입력받아 처리
	private int gvQty;
	private String gvMemo1;
	
	private String procStep; // 2024.01.25 디테일 처리상태값 추가
	
	private BigDecimal centerPrice;
	private String outSalePrice; // 20240205 supi 4car재고조회 가격  , 자신의 업체에 따라 매입가,센터가 두가지 타입이 있으며 매입가 = 가격 * 위탁매입율(미설정40%) * 마진율 , 센터가 기준은 센터가에 할인율 적용한 가격
	
	private String makerName;
	private String rejectMemo; // 20240314 supi 거부사유
	
	private String orderNo; // 20240314 supi 주문번호 처리번호(디테일에도 노출)
	private String orderStatus; // 20240315 supi 주문 상태( 번호가 존재하면 e테이블에 있을경우 등록됨, d테이블에 있을경우 삭제됨)
	private String procUserName; //2024.05.29 supi - 처리자 보여지도록 추가
	
	private String rcvLogisCode; // 2025.06.03 yoonsang 수령물류센터가 디테일별로 필요해서 추가
	
	private int logisRackId; // 2024.06.27 supi - pda 피킹 처리에 랙 구분을 위해 logisRackId 반환 추가
	private String storConsignCustCode; //2024.06.27 supi - pda에서 해당 데이터의 창고 소유업체를 확인하기 위한변수

	private String className; //20240725 supi 구분,공장품번
	private String factoryNo;
	
	private String otherSaleType; //20250513 yoonsang 추가
	
	private float saleRate; //250628 yoonsang 할인율 추가
	private String stockRackCode;  //250628 yoonsang 다른할인율을 랙별로 적용하기위해 랙코드 추가
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
	public String getPcReqNo() {
		return pcReqNo;
	}
	public void setPcReqNo(String pcReqNo) {
		this.pcReqNo = pcReqNo;
	}
	public String getReqSeq() {
		return reqSeq;
	}
	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public String getGvPlaceNo() {
		return gvPlaceNo;
	}
	public void setGvPlaceNo(String gvPlaceNo) {
		this.gvPlaceNo = gvPlaceNo;
	}
	public String getGvPlaceSeq() {
		return gvPlaceSeq;
	}
	public void setGvPlaceSeq(String gvPlaceSeq) {
		this.gvPlaceSeq = gvPlaceSeq;
	}
	public String getInMemo1() {
		return inMemo1;
	}
	public void setInMemo1(String inMemo1) {
		this.inMemo1 = inMemo1;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
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
	public String getItemNameEn() {
		return itemNameEn;
	}
	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public BigDecimal getSaleUnitPrice() {
		return saleUnitPrice;
	}
	public void setSaleUnitPrice(BigDecimal saleUnitPrice) {
		this.saleUnitPrice = saleUnitPrice;
	}
	public BigDecimal getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}
	public BigDecimal getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
	}
	public String getSupplyCustCode() {
		return supplyCustCode;
	}
	public void setSupplyCustCode(String supplyCustCode) {
		this.supplyCustCode = supplyCustCode;
	}
	public String getRcvCustCode() {
		return rcvCustCode;
	}
	public void setRcvCustCode(String rcvCustCode) {
		this.rcvCustCode = rcvCustCode;
	}
	public String getRcvCustName() {
		return rcvCustName;
	}
	public void setRcvCustName(String rcvCustName) {
		this.rcvCustName = rcvCustName;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public String getDlvType() {
		return dlvType;
	}
	public void setDlvType(String dlvType) {
		this.dlvType = dlvType;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getStockQty() {
		return stockQty;
	}
	public void setStockQty(String stockQty) {
		this.stockQty = stockQty;
	}
	public int getGvQty() {
		return gvQty;
	}
	public void setGvQty(int gvQty) {
		this.gvQty = gvQty;
	}
	public String getGvMemo1() {
		return gvMemo1;
	}
	public void setGvMemo1(String gvMemo1) {
		this.gvMemo1 = gvMemo1;
	}
	public String getProcStep() {
		return procStep;
	}
	public void setProcStep(String procStep) {
		this.procStep = procStep;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public String getOutSalePrice() {
		return outSalePrice;
	}
	public void setOutSalePrice(String outSalePrice) {
		this.outSalePrice = outSalePrice;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getRejectMemo() {
		return rejectMemo;
	}
	public void setRejectMemo(String rejectMemo) {
		this.rejectMemo = rejectMemo;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public String getProcUserName() {
		return procUserName;
	}
	public void setProcUserName(String procUserName) {
		this.procUserName = procUserName;
	}
	public String getRcvLogisCode() {
		return rcvLogisCode;
	}
	public void setRcvLogisCode(String rcvLogisCode) {
		this.rcvLogisCode = rcvLogisCode;
	}
	public int getLogisRackId() {
		return logisRackId;
	}
	public void setLogisRackId(int logisRackId) {
		this.logisRackId = logisRackId;
	}
	public String getStorConsignCustCode() {
		return storConsignCustCode;
	}
	public void setStorConsignCustCode(String storConsignCustCode) {
		this.storConsignCustCode = storConsignCustCode;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	public String getOtherSaleType() {
		return otherSaleType;
	}
	public void setOtherSaleType(String otherSaleType) {
		this.otherSaleType = otherSaleType;
	}
	public float getSaleRate() {
		return saleRate;
	}
	public void setSaleRate(float saleRate) {
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
		return "PcReqItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", pcReqNo=" + pcReqNo + ", reqSeq=" + reqSeq + ", gvComCode="
				+ gvComCode + ", gvPlaceNo=" + gvPlaceNo + ", gvPlaceSeq=" + gvPlaceSeq + ", inMemo1=" + inMemo1
				+ ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified="
				+ modified + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", cnt="
				+ cnt + ", makerCode=" + makerCode + ", itemId=" + itemId + ", saleUnitPrice=" + saleUnitPrice
				+ ", unitPrice=" + unitPrice + ", sumPrice=" + sumPrice + ", supplyCustCode=" + supplyCustCode
				+ ", rcvCustCode=" + rcvCustCode + ", rcvCustName=" + rcvCustName + ", salePrice=" + salePrice
				+ ", dlvType=" + dlvType + ", storageName=" + storageName + ", storageCode=" + storageCode
				+ ", rackName=" + rackName + ", rackCode=" + rackCode + ", stockQty=" + stockQty + ", gvQty=" + gvQty
				+ ", gvMemo1=" + gvMemo1 + ", procStep=" + procStep + ", centerPrice=" + centerPrice + ", outSalePrice="
				+ outSalePrice + ", makerName=" + makerName + ", rejectMemo=" + rejectMemo + ", orderNo=" + orderNo
				+ ", orderStatus=" + orderStatus + ", procUserName=" + procUserName + ", rcvLogisCode=" + rcvLogisCode
				+ ", logisRackId=" + logisRackId + ", storConsignCustCode=" + storConsignCustCode + ", className="
				+ className + ", factoryNo=" + factoryNo + ", otherSaleType=" + otherSaleType + ", saleRate=" + saleRate
				+ ", stockRackCode=" + stockRackCode + "]";
	}
	
	
 
	
	
}
