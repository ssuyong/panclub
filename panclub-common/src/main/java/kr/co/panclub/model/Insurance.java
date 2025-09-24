package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Insurance {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	private String db_resultSeq;

	private String comCode;
	private String orderGroupId; //주문그룹아이디
	private String orderYmd; //주문일자
	private String rlYmd; //출고일자
	private String custCode; //거래처코드
	private String custName; //거래처명
	private String carNo; //차량번호
	private String makerCode; 
	private String makerName;
	private String carType; //차종
	private String ogRegUserId; //주문그룹담당자
	private String ogRegUserName; //담당자이름
	private String clReqType; //청구요청여부
	private BigDecimal orderAmt; //주문금액
	private BigDecimal rlAmt; //출고금액
	private BigDecimal rlRiAmt; //출고-반입금액
	private int rlQty; //출고수량
	private BigDecimal clAmt; //청구금액 (센터가)
	private BigDecimal insureClPrice; //청구금액 (실청구가)
	private int clQty; //청구수량
	private String clConfYN; //기결여부	
	private BigDecimal depositAmt; //입금금액
	private String clGroupId; //청구그룹아이디
	private String clChkDate; //청구일자
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
	public String getDb_resultSeq() {
		return db_resultSeq;
	}
	public void setDb_resultSeq(String db_resultSeq) {
		this.db_resultSeq = db_resultSeq;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getOrderYmd() {
		return orderYmd;
	}
	public void setOrderYmd(String orderYmd) {
		this.orderYmd = orderYmd;
	}
	public String getRlYmd() {
		return rlYmd;
	}
	public void setRlYmd(String rlYmd) {
		this.rlYmd = rlYmd;
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
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
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
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getOgRegUserId() {
		return ogRegUserId;
	}
	public void setOgRegUserId(String ogRegUserId) {
		this.ogRegUserId = ogRegUserId;
	}
	public String getOgRegUserName() {
		return ogRegUserName;
	}
	public void setOgRegUserName(String ogRegUserName) {
		this.ogRegUserName = ogRegUserName;
	}
	public String getClReqType() {
		return clReqType;
	}
	public void setClReqType(String clReqType) {
		this.clReqType = clReqType;
	}
	public BigDecimal getOrderAmt() {
		return orderAmt;
	}
	public void setOrderAmt(BigDecimal orderAmt) {
		this.orderAmt = orderAmt;
	}
	public BigDecimal getRlAmt() {
		return rlAmt;
	}
	public void setRlAmt(BigDecimal rlAmt) {
		this.rlAmt = rlAmt;
	}
	public BigDecimal getRlRiAmt() {
		return rlRiAmt;
	}
	public void setRlRiAmt(BigDecimal rlRiAmt) {
		this.rlRiAmt = rlRiAmt;
	}
	public int getRlQty() {
		return rlQty;
	}
	public void setRlQty(int rlQty) {
		this.rlQty = rlQty;
	}
	public BigDecimal getClAmt() {
		return clAmt;
	}
	public void setClAmt(BigDecimal clAmt) {
		this.clAmt = clAmt;
	}
	public BigDecimal getInsureClPrice() {
		return insureClPrice;
	}
	public void setInsureClPrice(BigDecimal insureClPrice) {
		this.insureClPrice = insureClPrice;
	}
	public int getClQty() {
		return clQty;
	}
	public void setClQty(int clQty) {
		this.clQty = clQty;
	}
	public String getClConfYN() {
		return clConfYN;
	}
	public void setClConfYN(String clConfYN) {
		this.clConfYN = clConfYN;
	}
	public BigDecimal getDepositAmt() {
		return depositAmt;
	}
	public void setDepositAmt(BigDecimal depositAmt) {
		this.depositAmt = depositAmt;
	}
	public String getClGroupId() {
		return clGroupId;
	}
	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}
	public String getClChkDate() {
		return clChkDate;
	}
	public void setClChkDate(String clChkDate) {
		this.clChkDate = clChkDate;
	}
	@Override
	public String toString() {
		return "Insurance [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", db_resultSeq=" + db_resultSeq + ", comCode=" + comCode + ", orderGroupId="
				+ orderGroupId + ", orderYmd=" + orderYmd + ", rlYmd=" + rlYmd + ", custCode=" + custCode
				+ ", custName=" + custName + ", carNo=" + carNo + ", makerCode=" + makerCode + ", makerName="
				+ makerName + ", carType=" + carType + ", ogRegUserId=" + ogRegUserId + ", ogRegUserName="
				+ ogRegUserName + ", clReqType=" + clReqType + ", orderAmt=" + orderAmt + ", rlAmt=" + rlAmt
				+ ", rlRiAmt=" + rlRiAmt + ", rlQty=" + rlQty + ", clAmt=" + clAmt + ", insureClPrice=" + insureClPrice
				+ ", clQty=" + clQty + ", clConfYN=" + clConfYN + ", depositAmt=" + depositAmt + ", clGroupId="
				+ clGroupId + ", clChkDate=" + clChkDate + "]";
	}

	
}
