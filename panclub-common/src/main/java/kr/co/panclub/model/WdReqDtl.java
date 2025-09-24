package kr.co.panclub.model;

import java.math.BigDecimal;

public class WdReqDtl {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;	
	
	private String comCode;
	private String wdReqNo;                //  --요청번호
	private String reqSeq;                //  --순번
	private String jobNo;                //   --발주번호/입고번호
	private String regUserId;                //
	private String regYmd;                //
	private String regHms;                //
	private String uptUserId;                //
	private String uptYmd;                //
	private String uptHms;                //
	
	private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private int salePrice;
	
	private String jobArr;
	private String reqArr;
	private String seqArr;
	
	private String orderGroupId; //2023.04.07 bokyung 추가
	
	private BigDecimal sumPrice;  // --발주(입고)단가합계 2023.04.07 bokyung 추가
	private int cnt;  //  -- 수량 2023.04.07 bokyung 추가 
	private String memo1;  //  -- 메모1 2023.04.07 bokyung 추가
	private String userName; //2023.04.07 bokyung 추가
	
	private String ledgArr; //2023.06.29 bokyung 추가

	private String makerName;
	private String className;
	private String factoryNo;
	
	private BigDecimal taxPrice;  // 240805 yoonsang 추가
	private BigDecimal sumPriceTax;  // 240805 yoonsang 추가
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
	public String getWdReqNo() {
		return wdReqNo;
	}
	public void setWdReqNo(String wdReqNo) {
		this.wdReqNo = wdReqNo;
	}
	public String getReqSeq() {
		return reqSeq;
	}
	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
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
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
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
	public int getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(int salePrice) {
		this.salePrice = salePrice;
	}
	public String getJobArr() {
		return jobArr;
	}
	public void setJobArr(String jobArr) {
		this.jobArr = jobArr;
	}
	public String getReqArr() {
		return reqArr;
	}
	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}
	public String getSeqArr() {
		return seqArr;
	}
	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public BigDecimal getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getLedgArr() {
		return ledgArr;
	}
	public void setLedgArr(String ledgArr) {
		this.ledgArr = ledgArr;
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
	public BigDecimal getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}
	public BigDecimal getSumPriceTax() {
		return sumPriceTax;
	}
	public void setSumPriceTax(BigDecimal sumPriceTax) {
		this.sumPriceTax = sumPriceTax;
	}
	@Override
	public String toString() {
		return "WdReqDtl [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", wdReqNo=" + wdReqNo + ", reqSeq=" + reqSeq + ", jobNo="
				+ jobNo + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId="
				+ uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", itemId=" + itemId + ", itemNo=" + itemNo
				+ ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", salePrice=" + salePrice + ", jobArr="
				+ jobArr + ", reqArr=" + reqArr + ", seqArr=" + seqArr + ", orderGroupId=" + orderGroupId
				+ ", sumPrice=" + sumPrice + ", cnt=" + cnt + ", memo1=" + memo1 + ", userName=" + userName
				+ ", ledgArr=" + ledgArr + ", makerName=" + makerName + ", className=" + className + ", factoryNo="
				+ factoryNo + ", taxPrice=" + taxPrice + ", sumPriceTax=" + sumPriceTax + "]";
	}
	

	
}
