package kr.co.panclub.model;

import java.util.ArrayList;

public class InsurDcRate {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;


	private String comCode;
	private String insurIdx;
	private String insurCode;
	private String insurName;
	private String makerCode;
	private String makerName;
	private String custTypeCode;
	private String custTypeName;
	private float dcRate;
	private float dcRate_origin;
	private String startYmd;
	private String endYmd;
	private String memo;
	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;

 
	
	private String curInsurDcRateYN;
	private String regUserName;
	private String uptUserName;
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
	public String getInsurIdx() {
		return insurIdx;
	}
	public void setInsurIdx(String insurIdx) {
		this.insurIdx = insurIdx;
	}
	public String getInsurCode() {
		return insurCode;
	}
	public void setInsurCode(String insurCode) {
		this.insurCode = insurCode;
	}
	public String getInsurName() {
		return insurName;
	}
	public void setInsurName(String insurName) {
		this.insurName = insurName;
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
	public String getCustTypeCode() {
		return custTypeCode;
	}
	public void setCustTypeCode(String custTypeCode) {
		this.custTypeCode = custTypeCode;
	}
	public String getCustTypeName() {
		return custTypeName;
	}
	public void setCustTypeName(String custTypeName) {
		this.custTypeName = custTypeName;
	}
	public float getDcRate() {
		return dcRate;
	}
	public void setDcRate(float dcRate) {
		this.dcRate = dcRate;
	}
	public float getDcRate_origin() {
		return dcRate_origin;
	}
	public void setDcRate_origin(float dcRate_origin) {
		this.dcRate_origin = dcRate_origin;
	}
	public String getStartYmd() {
		return startYmd;
	}
	public void setStartYmd(String startYmd) {
		this.startYmd = startYmd;
	}
	public String getEndYmd() {
		return endYmd;
	}
	public void setEndYmd(String endYmd) {
		this.endYmd = endYmd;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public String getCurInsurDcRateYN() {
		return curInsurDcRateYN;
	}
	public void setCurInsurDcRateYN(String curInsurDcRateYN) {
		this.curInsurDcRateYN = curInsurDcRateYN;
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
	@Override
	public String toString() {
		return "InsurDcRate [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", insurIdx=" + insurIdx + ", insurCode=" + insurCode
				+ ", insurName=" + insurName + ", makerCode=" + makerCode + ", makerName=" + makerName
				+ ", custTypeCode=" + custTypeCode + ", custTypeName=" + custTypeName + ", dcRate=" + dcRate
				+ ", dcRate_origin=" + dcRate_origin + ", startYmd=" + startYmd + ", endYmd=" + endYmd + ", memo="
				+ memo + ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", modified=" + modified + ", curInsurDcRateYN=" + curInsurDcRateYN + ", regUserName=" + regUserName
				+ ", uptUserName=" + uptUserName + "]";
	}

	
	
}
