package kr.co.panclub.model;

import java.math.BigDecimal;

public class ClItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;      //  --회사코드
	private String clNo;      // --요청번호
	private String clSeq;      //   --순번
	private String orderNo;      // --주문q번호
	private String orderSeq;      //  --주문순번
	private String itemId;      //  
	private int cnt;      //  --수량
	private BigDecimal unitPrice;      //  --단가
	private BigDecimal sumPrice;      // 	 --합계
	private String memo1;      // 
	private String memo2;      //  
	private String regUserId;      // -- 등록자
	private String regYmd;      //  
	private String regHms;      // 
	private String uptUserId;      // --수정자
	private String uptYmd;      // 
	private String uptHms;      // 
	
	private String reqArr;

	private String clReqNo;
	private String reqSeq;
	private String orderGroupId;
	private String custCode;
	
	private String clType;  // 청구구분이 디테일단에 존해해야해서 추가. hsg 2023.04.12 

	private BigDecimal centerPrice;   //센터가 . 2023.04.24
	private String clGroupId;       //청구그룹ID.hsg. 2023.04.24
	
	private String plCustCenterYN;   //2023.04.26 발주처센터여부:보험청구시에만 Y, N  일반인경우 공백

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

	public String getClNo() {
		return clNo;
	}

	public void setClNo(String clNo) {
		this.clNo = clNo;
	}

	public String getClSeq() {
		return clSeq;
	}

	public void setClSeq(String clSeq) {
		this.clSeq = clSeq;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderSeq() {
		return orderSeq;
	}

	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
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

	public String getMemo1() {
		return memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public String getMemo2() {
		return memo2;
	}

	public void setMemo2(String memo2) {
		this.memo2 = memo2;
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

	public String getReqArr() {
		return reqArr;
	}

	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}

	public String getClReqNo() {
		return clReqNo;
	}

	public void setClReqNo(String clReqNo) {
		this.clReqNo = clReqNo;
	}

	public String getReqSeq() {
		return reqSeq;
	}

	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}

	public String getCustCode() {
		return custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}

	public String getClType() {
		return clType;
	}

	public void setClType(String clType) {
		this.clType = clType;
	}

	public BigDecimal getCenterPrice() {
		return centerPrice;
	}

	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}

	public String getClGroupId() {
		return clGroupId;
	}

	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}

	public String getPlCustCenterYN() {
		return plCustCenterYN;
	}

	public void setPlCustCenterYN(String plCustCenterYN) {
		this.plCustCenterYN = plCustCenterYN;
	}

	@Override
	public String toString() {
		return "ClItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", clNo=" + clNo + ", clSeq=" + clSeq + ", orderNo=" + orderNo
				+ ", orderSeq=" + orderSeq + ", itemId=" + itemId + ", cnt=" + cnt + ", unitPrice=" + unitPrice
				+ ", sumPrice=" + sumPrice + ", memo1=" + memo1 + ", memo2=" + memo2 + ", regUserId=" + regUserId
				+ ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd
				+ ", uptHms=" + uptHms + ", reqArr=" + reqArr + ", clReqNo=" + clReqNo + ", reqSeq=" + reqSeq
				+ ", orderGroupId=" + orderGroupId + ", custCode=" + custCode + ", clType=" + clType + ", centerPrice="
				+ centerPrice + ", clGroupId=" + clGroupId + ", plCustCenterYN=" + plCustCenterYN + "]";
	}
	
	



	
	
	
}
