package kr.co.panclub.model;

import java.util.ArrayList;

public class RoItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String roNo;
	private String roSeq;
	private String roReqNo;                // -- 요청번호
	private String roReqSeq;                //  --요청순번
	private long itemId;                //  -- 품목ID,  
	private int roUnitPrice;                //  --판매단가
	private int cnt;                //  -- 수량
	private String memo1;                //  -- 메모1
	private String memo2;                // 
	private String regUserId;                // 
	private String regYmd;                // --등록일
	private String regHms;                //  --등록시
	private String uptUserId;                //  --수정자
	private String uptYmd;                // --수정일
	private String uptHms;                // --수정시
	
	private String odArr;
	private String odSeqArr;
	private String plArr;
	private String plSeqArr;
	
	private String reqNoArr;
	private String reqSeqArr;
	private String storCdArr;
	private String memo1Arr;
	private String memo2Arr;
	
	private String roUnitPriceArr;
	private String roCntArr;
	private String roNoArr;
	private String roSeqArr;
	
	private String riNo;
	private String riSeq;
	
	private String orderGroupId;
	private String orderNo;
	private String orderSeq;
	private String placeNo;				//2023.04.23 yoonsang 추가 청구구분
	private String placeSeq;			//2023.04.23 yoonsang 추가 청구구분
	
	private String custCode;
	private String storageCode;
	
	private String claimType;				//2023.04.23 yoonsang 추가 청구구분

	private String itemNo;					//2023.04.24 yoonsang 추가 청구구분	
	private String itemName;
	private String itemNameEn;
	private String placeCustCode;
	private String placeCustName;
	private int reqCnt;
	
	private String roYmd; //반출일자 2023.06.13 bk 
	private int penaltyPrice; //페널티 금액 2023.06.13 bk 
	private String custOrderNo; //거래처 주문번호2023.06.13 bk
	private String placeDmdYmd; //발주일자 2023.06.13 bk
	private String carNo; //차량번호 2023.06.13 bk
	private String supplyCustCode; //주문처 2023.06.13 bk
	
	private String branchCode; //2023.06.30 bk 

	private String placeWhYmd;//발주처입고일자 2023.07.10 yoonsang
	private String custRoNo ;//발주처반출거래번호 2023.08.01 bk
	private String makerCode;//제조사2023.10.19 bk

	private ArrayList<RoItem> roItemUpdate;//2023.06.14 bk

	private String gvComCode;
	
	private String makerName;
	private String className;
	private String factoryNo;
	
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

	public String getRoNo() {
		return roNo;
	}

	public void setRoNo(String roNo) {
		this.roNo = roNo;
	}

	public String getRoSeq() {
		return roSeq;
	}

	public void setRoSeq(String roSeq) {
		this.roSeq = roSeq;
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

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public int getRoUnitPrice() {
		return roUnitPrice;
	}

	public void setRoUnitPrice(int roUnitPrice) {
		this.roUnitPrice = roUnitPrice;
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

	public String getOdArr() {
		return odArr;
	}

	public void setOdArr(String odArr) {
		this.odArr = odArr;
	}

	public String getOdSeqArr() {
		return odSeqArr;
	}

	public void setOdSeqArr(String odSeqArr) {
		this.odSeqArr = odSeqArr;
	}

	public String getPlArr() {
		return plArr;
	}

	public void setPlArr(String plArr) {
		this.plArr = plArr;
	}

	public String getPlSeqArr() {
		return plSeqArr;
	}

	public void setPlSeqArr(String plSeqArr) {
		this.plSeqArr = plSeqArr;
	}

	public String getReqNoArr() {
		return reqNoArr;
	}

	public void setReqNoArr(String reqNoArr) {
		this.reqNoArr = reqNoArr;
	}

	public String getReqSeqArr() {
		return reqSeqArr;
	}

	public void setReqSeqArr(String reqSeqArr) {
		this.reqSeqArr = reqSeqArr;
	}

	public String getStorCdArr() {
		return storCdArr;
	}

	public void setStorCdArr(String storCdArr) {
		this.storCdArr = storCdArr;
	}

	public String getMemo1Arr() {
		return memo1Arr;
	}

	public void setMemo1Arr(String memo1Arr) {
		this.memo1Arr = memo1Arr;
	}

	public String getMemo2Arr() {
		return memo2Arr;
	}

	public void setMemo2Arr(String memo2Arr) {
		this.memo2Arr = memo2Arr;
	}

	public String getRoUnitPriceArr() {
		return roUnitPriceArr;
	}

	public void setRoUnitPriceArr(String roUnitPriceArr) {
		this.roUnitPriceArr = roUnitPriceArr;
	}

	public String getRoCntArr() {
		return roCntArr;
	}

	public void setRoCntArr(String roCntArr) {
		this.roCntArr = roCntArr;
	}

	public String getRoNoArr() {
		return roNoArr;
	}

	public void setRoNoArr(String roNoArr) {
		this.roNoArr = roNoArr;
	}

	public String getRoSeqArr() {
		return roSeqArr;
	}

	public void setRoSeqArr(String roSeqArr) {
		this.roSeqArr = roSeqArr;
	}

	public String getRiNo() {
		return riNo;
	}

	public void setRiNo(String riNo) {
		this.riNo = riNo;
	}

	public String getRiSeq() {
		return riSeq;
	}

	public void setRiSeq(String riSeq) {
		this.riSeq = riSeq;
	}

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
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

	public String getPlaceNo() {
		return placeNo;
	}

	public void setPlaceNo(String placeNo) {
		this.placeNo = placeNo;
	}

	public String getPlaceSeq() {
		return placeSeq;
	}

	public void setPlaceSeq(String placeSeq) {
		this.placeSeq = placeSeq;
	}

	public String getCustCode() {
		return custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}

	public String getStorageCode() {
		return storageCode;
	}

	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}

	public String getClaimType() {
		return claimType;
	}

	public void setClaimType(String claimType) {
		this.claimType = claimType;
	}

	public String getItemNo() {
		return itemNo;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemNameEn() {
		return itemNameEn;
	}

	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
	}

	public String getPlaceCustCode() {
		return placeCustCode;
	}

	public void setPlaceCustCode(String placeCustCode) {
		this.placeCustCode = placeCustCode;
	}

	public String getPlaceCustName() {
		return placeCustName;
	}

	public void setPlaceCustName(String placeCustName) {
		this.placeCustName = placeCustName;
	}

	public int getReqCnt() {
		return reqCnt;
	}

	public void setReqCnt(int reqCnt) {
		this.reqCnt = reqCnt;
	}

	public String getRoYmd() {
		return roYmd;
	}

	public void setRoYmd(String roYmd) {
		this.roYmd = roYmd;
	}

	public int getPenaltyPrice() {
		return penaltyPrice;
	}

	public void setPenaltyPrice(int penaltyPrice) {
		this.penaltyPrice = penaltyPrice;
	}

	public String getCustOrderNo() {
		return custOrderNo;
	}

	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
	}

	public String getPlaceDmdYmd() {
		return placeDmdYmd;
	}

	public void setPlaceDmdYmd(String placeDmdYmd) {
		this.placeDmdYmd = placeDmdYmd;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getSupplyCustCode() {
		return supplyCustCode;
	}

	public void setSupplyCustCode(String supplyCustCode) {
		this.supplyCustCode = supplyCustCode;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getPlaceWhYmd() {
		return placeWhYmd;
	}

	public void setPlaceWhYmd(String placeWhYmd) {
		this.placeWhYmd = placeWhYmd;
	}

	public String getCustRoNo() {
		return custRoNo;
	}

	public void setCustRoNo(String custRoNo) {
		this.custRoNo = custRoNo;
	}

	public String getMakerCode() {
		return makerCode;
	}

	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}

	public ArrayList<RoItem> getRoItemUpdate() {
		return roItemUpdate;
	}

	public void setRoItemUpdate(ArrayList<RoItem> roItemUpdate) {
		this.roItemUpdate = roItemUpdate;
	}

	public String getGvComCode() {
		return gvComCode;
	}

	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}

	public String getMakerName() {
		return makerName;
	}

	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getFactoryNo() {
		return factoryNo;
	}

	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}

	@Override
	public String toString() {
		return "RoItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", roNo=" + roNo + ", roSeq=" + roSeq + ", roReqNo=" + roReqNo
				+ ", roReqSeq=" + roReqSeq + ", itemId=" + itemId + ", roUnitPrice=" + roUnitPrice + ", cnt=" + cnt
				+ ", memo1=" + memo1 + ", memo2=" + memo2 + ", regUserId=" + regUserId + ", regYmd=" + regYmd
				+ ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms
				+ ", odArr=" + odArr + ", odSeqArr=" + odSeqArr + ", plArr=" + plArr + ", plSeqArr=" + plSeqArr
				+ ", reqNoArr=" + reqNoArr + ", reqSeqArr=" + reqSeqArr + ", storCdArr=" + storCdArr + ", memo1Arr="
				+ memo1Arr + ", memo2Arr=" + memo2Arr + ", roUnitPriceArr=" + roUnitPriceArr + ", roCntArr=" + roCntArr
				+ ", roNoArr=" + roNoArr + ", roSeqArr=" + roSeqArr + ", riNo=" + riNo + ", riSeq=" + riSeq
				+ ", orderGroupId=" + orderGroupId + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", placeNo="
				+ placeNo + ", placeSeq=" + placeSeq + ", custCode=" + custCode + ", storageCode=" + storageCode
				+ ", claimType=" + claimType + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn="
				+ itemNameEn + ", placeCustCode=" + placeCustCode + ", placeCustName=" + placeCustName + ", reqCnt="
				+ reqCnt + ", roYmd=" + roYmd + ", penaltyPrice=" + penaltyPrice + ", custOrderNo=" + custOrderNo
				+ ", placeDmdYmd=" + placeDmdYmd + ", carNo=" + carNo + ", supplyCustCode=" + supplyCustCode
				+ ", branchCode=" + branchCode + ", placeWhYmd=" + placeWhYmd + ", custRoNo=" + custRoNo
				+ ", makerCode=" + makerCode + ", roItemUpdate=" + roItemUpdate + ", gvComCode=" + gvComCode
				+ ", makerName=" + makerName + ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}

	
}
