package kr.co.panclub.model;

import java.util.Date;

public class StockWrItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String wrNo;
	private String wrSeq;
	private long itemId;
	private int qty;
	private String rackCode;
	private String moveRackCode;
	private String uptUserId;   //  --최종수정자
	private Date modified;
	private String itemNo;
	private String itemName;
	private String rackName;
	private String moveRackName;
	private String storCode;
	private String storName;
	private String moveStorCode;
	private String moveStorName;
	private String memo1;	
	private String chkUserId;
	private String chkUserName;
	private Date chkDate;
	private String uptUserName;
	
	private String seqArr;
	private String rackArr;
	private String moveRackArr;
	
	private String chkDateString;
	private int stockQty;
	private String storConsignCustCode; // 바코드 출력용 입고 창고 업체 기반한 업체코드
	
	private String makerCode; // supi 20240604 pda화면에서 제조사 코드 불러오기 위해 필요하여 추가
	private String consignCustCode; // supi 20240604  수동입출고에서 사용
	private String consignCustName; // supi 20240604  수동입출고에서 사용

	private int logisRackId;  //supi 20240611 물류센터정보 매개변수
	private int moveLogisRackId; //supi 20240619 pda 이동에서 사용
	
	private String makerName;
	private String className;
	private String factoryNo;
	
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
	public String getWrNo() {
		return wrNo;
	}
	public void setWrNo(String wrNo) {
		this.wrNo = wrNo;
	}
	public String getWrSeq() {
		return wrSeq;
	}
	public void setWrSeq(String wrSeq) {
		this.wrSeq = wrSeq;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getMoveRackCode() {
		return moveRackCode;
	}
	public void setMoveRackCode(String moveRackCode) {
		this.moveRackCode = moveRackCode;
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
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public String getMoveRackName() {
		return moveRackName;
	}
	public void setMoveRackName(String moveRackName) {
		this.moveRackName = moveRackName;
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
	public String getMoveStorCode() {
		return moveStorCode;
	}
	public void setMoveStorCode(String moveStorCode) {
		this.moveStorCode = moveStorCode;
	}
	public String getMoveStorName() {
		return moveStorName;
	}
	public void setMoveStorName(String moveStorName) {
		this.moveStorName = moveStorName;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public String getChkUserId() {
		return chkUserId;
	}
	public void setChkUserId(String chkUserId) {
		this.chkUserId = chkUserId;
	}
	public String getChkUserName() {
		return chkUserName;
	}
	public void setChkUserName(String chkUserName) {
		this.chkUserName = chkUserName;
	}
	public Date getChkDate() {
		return chkDate;
	}
	public void setChkDate(Date chkDate) {
		this.chkDate = chkDate;
	}
	public String getUptUserName() {
		return uptUserName;
	}
	public void setUptUserName(String uptUserName) {
		this.uptUserName = uptUserName;
	}
	public String getSeqArr() {
		return seqArr;
	}
	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}
	public String getRackArr() {
		return rackArr;
	}
	public void setRackArr(String rackArr) {
		this.rackArr = rackArr;
	}
	public String getMoveRackArr() {
		return moveRackArr;
	}
	public void setMoveRackArr(String moveRackArr) {
		this.moveRackArr = moveRackArr;
	}
	public String getChkDateString() {
		return chkDateString;
	}
	public void setChkDateString(String chkDateString) {
		this.chkDateString = chkDateString;
	}
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public String getStorConsignCustCode() {
		return storConsignCustCode;
	}
	public void setStorConsignCustCode(String storConsignCustCode) {
		this.storConsignCustCode = storConsignCustCode;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getConsignCustCode() {
		return consignCustCode;
	}
	public void setConsignCustCode(String consignCustCode) {
		this.consignCustCode = consignCustCode;
	}
	public String getConsignCustName() {
		return consignCustName;
	}
	public void setConsignCustName(String consignCustName) {
		this.consignCustName = consignCustName;
	}
	public int getLogisRackId() {
		return logisRackId;
	}
	public void setLogisRackId(int logisRackId) {
		this.logisRackId = logisRackId;
	}
	public int getMoveLogisRackId() {
		return moveLogisRackId;
	}
	public void setMoveLogisRackId(int moveLogisRackId) {
		this.moveLogisRackId = moveLogisRackId;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
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
	@Override
	public String toString() {
		return "StockWrItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", wrNo=" + wrNo + ", wrSeq=" + wrSeq + ", itemId=" + itemId
				+ ", qty=" + qty + ", rackCode=" + rackCode + ", moveRackCode=" + moveRackCode + ", uptUserId="
				+ uptUserId + ", modified=" + modified + ", itemNo=" + itemNo + ", itemName=" + itemName + ", rackName="
				+ rackName + ", moveRackName=" + moveRackName + ", storCode=" + storCode + ", storName=" + storName
				+ ", moveStorCode=" + moveStorCode + ", moveStorName=" + moveStorName + ", memo1=" + memo1
				+ ", chkUserId=" + chkUserId + ", chkUserName=" + chkUserName + ", chkDate=" + chkDate
				+ ", uptUserName=" + uptUserName + ", seqArr=" + seqArr + ", rackArr=" + rackArr + ", moveRackArr="
				+ moveRackArr + ", chkDateString=" + chkDateString + ", stockQty=" + stockQty + ", storConsignCustCode="
				+ storConsignCustCode + ", makerCode=" + makerCode + ", consignCustCode=" + consignCustCode
				+ ", consignCustName=" + consignCustName + ", logisRackId=" + logisRackId + ", moveLogisRackId="
				+ moveLogisRackId + ", makerName=" + makerName + ", className=" + className + ", factoryNo=" + factoryNo
				+ "]";
	}
	
}
