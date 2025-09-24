package kr.co.panclub.model;

public class CtReq {
	private String comCode;
	private String custName;
	private String ctReqNo;
	private String reqCustCode;
	private String reqMgr;
	private String reqMemo1;
	private int reqMaxSeq;
	private String procStep;
	private String procUserId;
	private String procDate;
	private String inMemo1;
	private String regUserId;
	private String regYmd;
	private String regHmsg;
	private String uptUserId;
	private String uptYmd;
	private String uptHmsg;
	private String rejectCount;
	private String deliWay;
	private String deliPayType;
	private String rcvLogisCode;
	
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getCtReqNo() {
		return ctReqNo;
	}
	public void setCtReqNo(String ctReqNo) {
		this.ctReqNo = ctReqNo;
	}
	public String getReqCustCode() {
		return reqCustCode;
	}
	public void setReqCustCode(String reqCustCode) {
		this.reqCustCode = reqCustCode;
	}
	public String getReqMgr() {
		return reqMgr;
	}
	public void setReqMgr(String reqMgr) {
		this.reqMgr = reqMgr;
	}
	public String getReqMemo1() {
		return reqMemo1;
	}
	public void setReqMemo1(String reqMemo1) {
		this.reqMemo1 = reqMemo1;
	}
	public int getReqMaxSeq() {
		return reqMaxSeq;
	}
	public void setReqMaxSeq(int reqMaxSeq) {
		this.reqMaxSeq = reqMaxSeq;
	}
	public String getProcStep() {
		return procStep;
	}
	public void setProcStep(String procStep) {
		this.procStep = procStep;
	}
	public String getProcUserId() {
		return procUserId;
	}
	public void setProcUserId(String procUserId) {
		this.procUserId = procUserId;
	}
	public String getProcDate() {
		return procDate;
	}
	public void setProcDate(String procDate) {
		this.procDate = procDate;
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
	public String getRegYmd() {
		return regYmd;
	}
	public void setRegYmd(String regYmd) {
		this.regYmd = regYmd;
	}
	public String getRegHmsg() {
		return regHmsg;
	}
	public void setRegHmsg(String regHmsg) {
		this.regHmsg = regHmsg;
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
	public String getUptHmsg() {
		return uptHmsg;
	}
	public void setUptHmsg(String uptHmsg) {
		this.uptHmsg = uptHmsg;
	}
	public String getUptTime() {  //수정일자를 포멧화 해서 반환받기 위한 get함수 
		
		if(uptYmd==null) return "";
		StringBuffer sb = new StringBuffer();
		sb.append(uptYmd);
		sb.insert(4, "-");
		sb.insert(7, "-"); 
		
		return sb.toString();
	}
	public String getRejectCount() {
		return rejectCount;
	}
	public void setRejectCount(String rejectCount) {
		this.rejectCount = rejectCount;
	}
	public String getDeliWay() {
		return deliWay;
	}
	public void setDeliWay(String deliWay) {
		this.deliWay = deliWay;
	}
	public String getDeliPayType() {
		return deliPayType;
	}
	public void setDeliPayType(String deliPayType) {
		this.deliPayType = deliPayType;
	}
	public String getRcvLogisCode() {
		return rcvLogisCode;
	}
	public void setRcvLogisCode(String rcvLogisCode) {
		this.rcvLogisCode = rcvLogisCode;
	}
	@Override
	public String toString() {
		return "CtReq [comCode=" + comCode + ", custName=" + custName + ", ctReqNo=" + ctReqNo + ", reqCustCode="
				+ reqCustCode + ", reqMgr=" + reqMgr + ", reqMemo1=" + reqMemo1 + ", reqMaxSeq=" + reqMaxSeq
				+ ", procStep=" + procStep + ", procUserId=" + procUserId + ", procDate=" + procDate + ", inMemo1="
				+ inMemo1 + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHmsg=" + regHmsg + ", uptUserId="
				+ uptUserId + ", uptYmd=" + uptYmd + ", uptHmsg=" + uptHmsg + ", rejectCount=" + rejectCount
				+ ", deliWay=" + deliWay + ", deliPayType=" + deliPayType + ", rcvLogisCode=" + rcvLogisCode + "]";
	}
	
	
	
	
}
