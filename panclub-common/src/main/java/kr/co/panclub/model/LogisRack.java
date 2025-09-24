package kr.co.panclub.model;

import java.util.ArrayList;

public class LogisRack {

	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private int logisRackId;    //  int identity not null primary key,
	private String comCode;    //  varchar(20) not null, 
	private String logisCode;    //  varchar(20) not null,  --기초코드의 물류센터코드
	private String logisName; 
	private String logisRackName;    //  varchar(30) not null,   --좌표. 랙명 coordinate
	private String memo;    //  varchar(200) ,
	private String validYN;    //  varchar(1) not null default 'Y',
	private String regUserId;    //  varchar(50) not null,
	private String created;    //  datetime default getdate(),
	private String uptUserId;    //  varchar(50) not null,
	private String modified;    //  datetime default getDATE()
	
    private ArrayList<LogisRack> logisRackUpdate;
    private ArrayList<LogisRack> logisRackAdd;	
    private ArrayList<LogisRack> logisRackRemove;
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
	public int getLogisRackId() {
		return logisRackId;
	}
	public void setLogisRackId(int logisRackId) {
		this.logisRackId = logisRackId;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getLogisCode() {
		return logisCode;
	}
	public void setLogisCode(String logisCode) {
		this.logisCode = logisCode;
	}
	public String getLogisName() {
		return logisName;
	}
	public void setLogisName(String logisName) {
		this.logisName = logisName;
	}
	public String getLogisRackName() {
		return logisRackName;
	}
	public void setLogisRackName(String logisRackName) {
		this.logisRackName = logisRackName;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
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
	public ArrayList<LogisRack> getLogisRackUpdate() {
		return logisRackUpdate;
	}
	public void setLogisRackUpdate(ArrayList<LogisRack> logisRackUpdate) {
		this.logisRackUpdate = logisRackUpdate;
	}
	public ArrayList<LogisRack> getLogisRackAdd() {
		return logisRackAdd;
	}
	public void setLogisRackAdd(ArrayList<LogisRack> logisRackAdd) {
		this.logisRackAdd = logisRackAdd;
	}
	public ArrayList<LogisRack> getLogisRackRemove() {
		return logisRackRemove;
	}
	public void setLogisRackRemove(ArrayList<LogisRack> logisRackRemove) {
		this.logisRackRemove = logisRackRemove;
	}
	@Override
	public String toString() {
		return "LogisRack [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", logisRackId=" + logisRackId + ", comCode=" + comCode + ", logisCode=" + logisCode
				+ ", logisName=" + logisName + ", logisRackName=" + logisRackName + ", memo=" + memo + ", validYN="
				+ validYN + ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", modified=" + modified + ", logisRackUpdate=" + logisRackUpdate + ", logisRackAdd=" + logisRackAdd
				+ ", logisRackRemove=" + logisRackRemove + "]";
	}

    
    
    
    
    
}
