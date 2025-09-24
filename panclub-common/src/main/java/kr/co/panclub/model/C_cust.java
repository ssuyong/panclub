package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class C_cust {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String custCode;
	private String masterId;
	private String validYN;
	private Date created;
	private String regUserId;
	private Date modified;
	private String uptUserId;
	
	private String custName;	
	
	// 수정 행 리스트
	private ArrayList<C_cust> c_custUpdate;	
	// 추가 행 리스트
	private ArrayList<C_cust> c_custAdd;	
	// 삭제 행 리스트
	private ArrayList<C_cust> c_custRemove;
	
	private String erpYN; // 2023.10.27 erp사용업체
	private String consignYN; // 2023.10.27 erp사용업체
	
	private String templateIdx; // 지정된 권한 템플릿 인덱스
	private String templateName; // 지정된 권한템플릿
	private int permissionCount; // 권한 수
	private String parentComCode; //  관리업체코드
	private String parentComName; //  관리업체명
	private boolean childValid; //    피관리업체 유효성
	private boolean permissionValid; // 권한보유 여부
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
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getMasterId() {
		return masterId;
	}
	public void setMasterId(String masterId) {
		this.masterId = masterId;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public ArrayList<C_cust> getC_custUpdate() {
		return c_custUpdate;
	}
	public void setC_custUpdate(ArrayList<C_cust> c_custUpdate) {
		this.c_custUpdate = c_custUpdate;
	}
	public ArrayList<C_cust> getC_custAdd() {
		return c_custAdd;
	}
	public void setC_custAdd(ArrayList<C_cust> c_custAdd) {
		this.c_custAdd = c_custAdd;
	}
	public ArrayList<C_cust> getC_custRemove() {
		return c_custRemove;
	}
	public void setC_custRemove(ArrayList<C_cust> c_custRemove) {
		this.c_custRemove = c_custRemove;
	}
	public String getErpYN() {
		return erpYN;
	}
	public void setErpYN(String erpYN) {
		this.erpYN = erpYN;
	}
	public String getConsignYN() {
		return consignYN;
	}
	public void setConsignYN(String consignYN) {
		this.consignYN = consignYN;
	}
	public String getTemplateIdx() {
		return templateIdx;
	}
	public void setTemplateIdx(String templateIdx) {
		this.templateIdx = templateIdx;
	}
	public String getTemplateName() {
		return templateName;
	}
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	public int getPermissionCount() {
		return permissionCount;
	}
	public void setPermissionCount(int permissionCount) {
		this.permissionCount = permissionCount;
	}
	public String getParentComCode() {
		return parentComCode;
	}
	public void setParentComCode(String parentComCode) {
		this.parentComCode = parentComCode;
	}
	public String getParentComName() {
		return parentComName;
	}
	public void setParentComName(String parentComName) {
		this.parentComName = parentComName;
	}
	public boolean isChildValid() {
		return childValid;
	}
	public void setChildValid(boolean childValid) {
		this.childValid = childValid;
	}
	public boolean isPermissionValid() {
		return permissionValid;
	}
	public void setPermissionValid(boolean permissionValid) {
		this.permissionValid = permissionValid;
	}
	@Override
	public String toString() {
		return "C_cust [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", custCode=" + custCode + ", masterId=" + masterId + ", validYN=" + validYN
				+ ", created=" + created + ", regUserId=" + regUserId + ", modified=" + modified + ", uptUserId="
				+ uptUserId + ", custName=" + custName + ", c_custUpdate=" + c_custUpdate + ", c_custAdd=" + c_custAdd
				+ ", c_custRemove=" + c_custRemove + ", erpYN=" + erpYN + ", consignYN=" + consignYN + ", templateIdx="
				+ templateIdx + ", templateName=" + templateName + ", permissionCount=" + permissionCount
				+ ", parentComCode=" + parentComCode + ", parentComName=" + parentComName + ", childValid=" + childValid
				+ ", permissionValid=" + permissionValid + "]";
	}
	
	
}
