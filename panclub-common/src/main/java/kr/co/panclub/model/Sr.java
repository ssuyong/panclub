package kr.co.panclub.model;

import java.util.ArrayList;

public class Sr {
	private String db_resultCode;
	private String db_resultMsg;
	private String workingType;
	
	private String srIdx;
	private String comCode;
	private String srType;
	private String srType_origin;
	private String srCode;
	private String srName;
	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;	
	
	private ArrayList<Sr> srAdd;
	private ArrayList<Sr> srUpdate;
	private ArrayList<Sr> srUpdateItem;
	private ArrayList<Sr> srRemove;
	
	//2023.07.13 hsg 추가
	private String branchCode;  //지점코드
	private String branchName;  //지점명
	private String srTypeName;  //영업대표그룹코드명
	private String validYN;  //사용여부
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
	public String getWorkingType() {
		return workingType;
	}
	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}
	public String getSrIdx() {
		return srIdx;
	}
	public void setSrIdx(String srIdx) {
		this.srIdx = srIdx;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getSrType() {
		return srType;
	}
	public void setSrType(String srType) {
		this.srType = srType;
	}
	public String getSrType_origin() {
		return srType_origin;
	}
	public void setSrType_origin(String srType_origin) {
		this.srType_origin = srType_origin;
	}
	public String getSrCode() {
		return srCode;
	}
	public void setSrCode(String srCode) {
		this.srCode = srCode;
	}
	public String getSrName() {
		return srName;
	}
	public void setSrName(String srName) {
		this.srName = srName;
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
	public ArrayList<Sr> getSrAdd() {
		return srAdd;
	}
	public void setSrAdd(ArrayList<Sr> srAdd) {
		this.srAdd = srAdd;
	}
	public ArrayList<Sr> getSrUpdate() {
		return srUpdate;
	}
	public void setSrUpdate(ArrayList<Sr> srUpdate) {
		this.srUpdate = srUpdate;
	}
	public ArrayList<Sr> getSrUpdateItem() {
		return srUpdateItem;
	}
	public void setSrUpdateItem(ArrayList<Sr> srUpdateItem) {
		this.srUpdateItem = srUpdateItem;
	}
	public ArrayList<Sr> getSrRemove() {
		return srRemove;
	}
	public void setSrRemove(ArrayList<Sr> srRemove) {
		this.srRemove = srRemove;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getSrTypeName() {
		return srTypeName;
	}
	public void setSrTypeName(String srTypeName) {
		this.srTypeName = srTypeName;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	@Override
	public String toString() {
		return "Sr [db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg + ", workingType=" + workingType
				+ ", srIdx=" + srIdx + ", comCode=" + comCode + ", srType=" + srType + ", srType_origin="
				+ srType_origin + ", srCode=" + srCode + ", srName=" + srName + ", regUserId=" + regUserId
				+ ", created=" + created + ", uptUserId=" + uptUserId + ", modified=" + modified + ", srAdd=" + srAdd
				+ ", srUpdate=" + srUpdate + ", srUpdateItem=" + srUpdateItem + ", srRemove=" + srRemove
				+ ", branchCode=" + branchCode + ", branchName=" + branchName + ", srTypeName=" + srTypeName
				+ ", validYN=" + validYN + "]";
	}
	

	
	
	
}
