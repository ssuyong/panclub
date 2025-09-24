package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class StorageUse {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String storageUseReqNo;    // --창고사용번호
	private String storageMgr;    // --창고담당
	private String memo1;    //  --메모
	private String useDmdYmd;    // --요청일
	private String moveSchYmd;    //  --창고이동일
	private String regUserId;    //
	private String regYmd;    // 
	private String regHms;    // 
	private String uptUserId;    //
	private String uptYmd;    //
	private String uptHms;    //
	private String orderGroupId;
	
	private String carNo;
	private String carType;
	private String makerCode;
	private String supplyCustName;
	private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private BigDecimal salePrice; 

	private String orderNo;
	private String orderSeq;

	private String storageCode;   //  --발주처
	private int useCnt;      // --수량
	private String storageName;   // --창고명
	private String chkYmd;
	private Date chkDate;
	private String reqSeq;
	private String orderInfo;
	
	private String orderCnt;
	
	//2023.03.30. hsg - 마스터의 메모와 구분하기 위해 추가
	private String subMemo1;
	private String subMemo2;
	private String branchCode; // 2023.06.30 bk
	
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
	public String getStorageUseReqNo() {
		return storageUseReqNo;
	}
	public void setStorageUseReqNo(String storageUseReqNo) {
		this.storageUseReqNo = storageUseReqNo;
	}
	public String getStorageMgr() {
		return storageMgr;
	}
	public void setStorageMgr(String storageMgr) {
		this.storageMgr = storageMgr;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public String getUseDmdYmd() {
		return useDmdYmd;
	}
	public void setUseDmdYmd(String useDmdYmd) {
		this.useDmdYmd = useDmdYmd;
	}
	public String getMoveSchYmd() {
		return moveSchYmd;
	}
	public void setMoveSchYmd(String moveSchYmd) {
		this.moveSchYmd = moveSchYmd;
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
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getSupplyCustName() {
		return supplyCustName;
	}
	public void setSupplyCustName(String supplyCustName) {
		this.supplyCustName = supplyCustName;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
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
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
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
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public int getUseCnt() {
		return useCnt;
	}
	public void setUseCnt(int useCnt) {
		this.useCnt = useCnt;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	public String getChkYmd() {
		return chkYmd;
	}
	public void setChkYmd(String chkYmd) {
		this.chkYmd = chkYmd;
	}
	public Date getChkDate() {
		return chkDate;
	}
	public void setChkDate(Date chkDate) {
		this.chkDate = chkDate;
	}
	public String getReqSeq() {
		return reqSeq;
	}
	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}
	public String getOrderInfo() {
		return orderInfo;
	}
	public void setOrderInfo(String orderInfo) {
		this.orderInfo = orderInfo;
	}
	public String getOrderCnt() {
		return orderCnt;
	}
	public void setOrderCnt(String orderCnt) {
		this.orderCnt = orderCnt;
	}
	public String getSubMemo1() {
		return subMemo1;
	}
	public void setSubMemo1(String subMemo1) {
		this.subMemo1 = subMemo1;
	}
	public String getSubMemo2() {
		return subMemo2;
	}
	public void setSubMemo2(String subMemo2) {
		this.subMemo2 = subMemo2;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
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
		return "StorageUse [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", storageUseReqNo=" + storageUseReqNo + ", storageMgr="
				+ storageMgr + ", memo1=" + memo1 + ", useDmdYmd=" + useDmdYmd + ", moveSchYmd=" + moveSchYmd
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", orderGroupId=" + orderGroupId + ", carNo=" + carNo
				+ ", carType=" + carType + ", makerCode=" + makerCode + ", supplyCustName=" + supplyCustName
				+ ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn
				+ ", salePrice=" + salePrice + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", storageCode="
				+ storageCode + ", useCnt=" + useCnt + ", storageName=" + storageName + ", chkYmd=" + chkYmd
				+ ", chkDate=" + chkDate + ", reqSeq=" + reqSeq + ", orderInfo=" + orderInfo + ", orderCnt=" + orderCnt
				+ ", subMemo1=" + subMemo1 + ", subMemo2=" + subMemo2 + ", branchCode=" + branchCode + ", makerName="
				+ makerName + ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}
	
	
}
