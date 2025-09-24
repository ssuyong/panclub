package kr.co.panclub.model;

import java.util.ArrayList;

public class StorMvReq {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String reqNo;         //  --요청번호
	private String sBranchCode;         //  --출발지점
	private String eBranchCode;         //  --도착지점
	private String memo1;         //   --메모
	private String memo2;         //   --메모
	private String dmdYmd;         //  --출발요청일
	private String schYmd;         //   --도착예정일
	private String mvWay;         //   --이동방법
	private String orderGroupId;         //  
	private String regUserId;         // 
	private String regYmd;         //  
	private String regHms;         //  
	private String uptUserId;         // 
	private String uptYmd;         // 
	private String uptHms;         //  
	
	private String sBranchName;
	private String eBranchName;
	private String regUserName;
	private String uptUserName;
	
	// 추가 행 리스트
	private ArrayList<StorMvReqItem> storMvReqItemAdd;
	// 수정 행 리스트
	private ArrayList<StorMvReqItem> storMvReqItemUpdate;
	// 삭제 행 리스트
	private ArrayList<StorMvReqItem> storMvReqItemRemove;
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
	public String getReqNo() {
		return reqNo;
	}
	public void setReqNo(String reqNo) {
		this.reqNo = reqNo;
	}
	public String getsBranchCode() {
		return sBranchCode;
	}
	public void setsBranchCode(String sBranchCode) {
		this.sBranchCode = sBranchCode;
	}
	public String geteBranchCode() {
		return eBranchCode;
	}
	public void seteBranchCode(String eBranchCode) {
		this.eBranchCode = eBranchCode;
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
	public String getDmdYmd() {
		return dmdYmd;
	}
	public void setDmdYmd(String dmdYmd) {
		this.dmdYmd = dmdYmd;
	}
	public String getSchYmd() {
		return schYmd;
	}
	public void setSchYmd(String schYmd) {
		this.schYmd = schYmd;
	}
	public String getMvWay() {
		return mvWay;
	}
	public void setMvWay(String mvWay) {
		this.mvWay = mvWay;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
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
	public String getsBranchName() {
		return sBranchName;
	}
	public void setsBranchName(String sBranchName) {
		this.sBranchName = sBranchName;
	}
	public String geteBranchName() {
		return eBranchName;
	}
	public void seteBranchName(String eBranchName) {
		this.eBranchName = eBranchName;
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
	public ArrayList<StorMvReqItem> getStorMvReqItemAdd() {
		return storMvReqItemAdd;
	}
	public void setStorMvReqItemAdd(ArrayList<StorMvReqItem> storMvReqItemAdd) {
		this.storMvReqItemAdd = storMvReqItemAdd;
	}
	public ArrayList<StorMvReqItem> getStorMvReqItemUpdate() {
		return storMvReqItemUpdate;
	}
	public void setStorMvReqItemUpdate(ArrayList<StorMvReqItem> storMvReqItemUpdate) {
		this.storMvReqItemUpdate = storMvReqItemUpdate;
	}
	public ArrayList<StorMvReqItem> getStorMvReqItemRemove() {
		return storMvReqItemRemove;
	}
	public void setStorMvReqItemRemove(ArrayList<StorMvReqItem> storMvReqItemRemove) {
		this.storMvReqItemRemove = storMvReqItemRemove;
	}
	@Override
	public String toString() {
		return "StorMvReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", reqNo=" + reqNo + ", sBranchCode=" + sBranchCode
				+ ", eBranchCode=" + eBranchCode + ", memo1=" + memo1 + ", memo2=" + memo2 + ", dmdYmd=" + dmdYmd
				+ ", schYmd=" + schYmd + ", mvWay=" + mvWay + ", orderGroupId=" + orderGroupId + ", regUserId="
				+ regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd="
				+ uptYmd + ", uptHms=" + uptHms + ", sBranchName=" + sBranchName + ", eBranchName=" + eBranchName
				+ ", regUserName=" + regUserName + ", uptUserName=" + uptUserName + ", storMvReqItemAdd="
				+ storMvReqItemAdd + ", storMvReqItemUpdate=" + storMvReqItemUpdate + ", storMvReqItemRemove="
				+ storMvReqItemRemove + "]";
	}

	
	
	
	

	
	
}
