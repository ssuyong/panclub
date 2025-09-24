package kr.co.panclub.model;

public class SiReq {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String orderNo;
	private String orderSeq;
	private int cnt;
	private String memo1;
	private String memo2;
	private String chkUserId;
	private String chkDate;
	private String regUserId;
	private String regYmd;
	private String regHms;
	private String uptUserId;
	private String uptYmd;
	private String uptHms;
	private String roReqNo;
	private String roReqSeq;
	private String stockInUserId;
	private String stockInDate;
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
	public String getMemo2() {
		return memo2;
	}
	public void setMemo2(String memo2) {
		this.memo2 = memo2;
	}
	public String getChkUserId() {
		return chkUserId;
	}
	public void setChkUserId(String chkUserId) {
		this.chkUserId = chkUserId;
	}
	public String getChkDate() {
		return chkDate;
	}
	public void setChkDate(String chkDate) {
		this.chkDate = chkDate;
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
	public String getRoReqNo() {
		return roReqNo;
	}
	public void setRoReqNo(String roReqNo) {
		this.roReqNo = roReqNo;
	}
	public String getRoReqSeq() {
		return roReqSeq;
	}
	public void setRoReqSeq(String roReqSeq) {
		this.roReqSeq = roReqSeq;
	}
	public String getStockInUserId() {
		return stockInUserId;
	}
	public void setStockInUserId(String stockInUserId) {
		this.stockInUserId = stockInUserId;
	}
	public String getStockInDate() {
		return stockInDate;
	}
	public void setStockInDate(String stockInDate) {
		this.stockInDate = stockInDate;
	}
	@Override
	public String toString() {
		return "SiReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", cnt="
				+ cnt + ", memo1=" + memo1 + ", memo2=" + memo2 + ", chkUserId=" + chkUserId + ", chkDate=" + chkDate
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", roReqNo=" + roReqNo + ", roReqSeq=" + roReqSeq
				+ ", stockInUserId=" + stockInUserId + ", stockInDate=" + stockInDate + "]";
	}
	
	
}
