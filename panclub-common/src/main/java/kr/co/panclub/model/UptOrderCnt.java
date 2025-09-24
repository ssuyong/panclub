package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class UptOrderCnt {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String orderNo;
	private String orderSeq;
	private String placeReqNo;
	private String placeReqSeq;
	
	int oiCnt;
	int priCnt;
	int sumPriCnt;
	int sumRlCnt;
	
	int uptCnt;
	
	private String custName;	
	private String carNo;
	
	private String rlCheckYN;

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

	public String getPlaceReqNo() {
		return placeReqNo;
	}

	public void setPlaceReqNo(String placeReqNo) {
		this.placeReqNo = placeReqNo;
	}

	public String getPlaceReqSeq() {
		return placeReqSeq;
	}

	public void setPlaceReqSeq(String placeReqSeq) {
		this.placeReqSeq = placeReqSeq;
	}

	public int getOiCnt() {
		return oiCnt;
	}

	public void setOiCnt(int oiCnt) {
		this.oiCnt = oiCnt;
	}

	public int getPriCnt() {
		return priCnt;
	}

	public void setPriCnt(int priCnt) {
		this.priCnt = priCnt;
	}

	public int getSumPriCnt() {
		return sumPriCnt;
	}

	public void setSumPriCnt(int sumPriCnt) {
		this.sumPriCnt = sumPriCnt;
	}

	public int getSumRlCnt() {
		return sumRlCnt;
	}

	public void setSumRlCnt(int sumRlCnt) {
		this.sumRlCnt = sumRlCnt;
	}

	public int getUptCnt() {
		return uptCnt;
	}

	public void setUptCnt(int uptCnt) {
		this.uptCnt = uptCnt;
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

	public String getRlCheckYN() {
		return rlCheckYN;
	}

	public void setRlCheckYN(String rlCheckYN) {
		this.rlCheckYN = rlCheckYN;
	}

	@Override
	public String toString() {
		return "UptOrderCnt [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", placeReqNo=" + placeReqNo
				+ ", placeReqSeq=" + placeReqSeq + ", oiCnt=" + oiCnt + ", priCnt=" + priCnt + ", sumPriCnt="
				+ sumPriCnt + ", sumRlCnt=" + sumRlCnt + ", uptCnt=" + uptCnt + ", custName=" + custName + ", carNo="
				+ carNo + ", rlCheckYN=" + rlCheckYN + "]";
	}
	
	
	

	
	
}
