package kr.co.panclub.model;

import java.util.Date;

public class PlaceReq {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;          //   --회사코드
	private String placeReqNo;          //  --발주요청번호
	private String orderGroupId;          //  --주문그룹ID
	private String placeDmdYmd;          //  --발주처발주요청일
	private String whSchYmd;          //  --입고예상일
	private String placeMgr;          //  발주담당
	private String memo;          //   --메모 
	private String regUserId;          //  -- 등록자
	private Date created;          //   
	private String uptUserId;          //  --수정자
	private Date modified;          //  

	private String drShipYN; //직송유형
	private int drShipExp; //직송비
	
	private String orderReqYN; //주문요청여부

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

	public String getPlaceReqNo() {
		return placeReqNo;
	}

	public void setPlaceReqNo(String placeReqNo) {
		this.placeReqNo = placeReqNo;
	}

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}

	public String getPlaceDmdYmd() {
		return placeDmdYmd;
	}

	public void setPlaceDmdYmd(String placeDmdYmd) {
		this.placeDmdYmd = placeDmdYmd;
	}

	public String getWhSchYmd() {
		return whSchYmd;
	}

	public void setWhSchYmd(String whSchYmd) {
		this.whSchYmd = whSchYmd;
	}

	public String getPlaceMgr() {
		return placeMgr;
	}

	public void setPlaceMgr(String placeMgr) {
		this.placeMgr = placeMgr;
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

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public String getUptUserId() {
		return uptUserId;
	}

	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}

	public Date getModified() {
		return modified;
	}

	public void setModified(Date modified) {
		this.modified = modified;
	}

	public String getDrShipYN() {
		return drShipYN;
	}

	public void setDrShipYN(String drShipYN) {
		this.drShipYN = drShipYN;
	}

	public int getDrShipExp() {
		return drShipExp;
	}

	public void setDrShipExp(int drShipExp) {
		this.drShipExp = drShipExp;
	}

	public String getOrderReqYN() {
		return orderReqYN;
	}

	public void setOrderReqYN(String orderReqYN) {
		this.orderReqYN = orderReqYN;
	}

	@Override
	public String toString() {
		return "PlaceReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", placeReqNo=" + placeReqNo + ", orderGroupId="
				+ orderGroupId + ", placeDmdYmd=" + placeDmdYmd + ", whSchYmd=" + whSchYmd + ", placeMgr=" + placeMgr
				+ ", memo=" + memo + ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", modified=" + modified + ", drShipYN=" + drShipYN + ", drShipExp=" + drShipExp + ", orderReqYN="
				+ orderReqYN + "]";
	}
	
	

    
    
}
