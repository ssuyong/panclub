package kr.co.panclub.model;

import java.util.ArrayList;

public class StorageUseReq {
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
	
	private String chkStatus;    //처리상태 2023.03.29 hsg 
	
	private String orderTypeName;
	private String carNo;
	private String vinNo;
	private String makerCode;
	private String carType; 
	private String orderYmd; 
	private String regUserName;
	private String branchCode; //2023.06.30
	
	private String custCode; //2023.10.05
	private String custName; //2023.10.05

	private String ctReject;  //2024.01.31 supi 조회시 마스터의 디테일에 불가 갯수
	private String ctItemCount; //2024.02.16 supi 창고사용요청과 연결된 회수요청품목수
	
	private String pcReqNo; // 2024.05.03 supi 주문접수요청으로 생성된 창고사용요청의 경우 연결된 주문번호
	
	private String itemCnt; // 20240625 supi pda 아이템수 노출을 위한 변수
	// 추가 행 리스트
	private ArrayList<StorageUseReqItem> storageUseReqItemAdd;
	// 수정 행 리스트
	private ArrayList<StorageUseReqItem> storageUseReqItemUpdate;
	// 삭제 행 리스트
	private ArrayList<StorageUseReqItem> storageUseReqItemRemove;
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
	public String getChkStatus() {
		return chkStatus;
	}
	public void setChkStatus(String chkStatus) {
		this.chkStatus = chkStatus;
	}
	public String getOrderTypeName() {
		return orderTypeName;
	}
	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getVinNo() {
		return vinNo;
	}
	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getOrderYmd() {
		return orderYmd;
	}
	public void setOrderYmd(String orderYmd) {
		this.orderYmd = orderYmd;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public ArrayList<StorageUseReqItem> getStorageUseReqItemAdd() {
		return storageUseReqItemAdd;
	}
	public void setStorageUseReqItemAdd(ArrayList<StorageUseReqItem> storageUseReqItemAdd) {
		this.storageUseReqItemAdd = storageUseReqItemAdd;
	}
	public ArrayList<StorageUseReqItem> getStorageUseReqItemUpdate() {
		return storageUseReqItemUpdate;
	}
	public void setStorageUseReqItemUpdate(ArrayList<StorageUseReqItem> storageUseReqItemUpdate) {
		this.storageUseReqItemUpdate = storageUseReqItemUpdate;
	}
	public ArrayList<StorageUseReqItem> getStorageUseReqItemRemove() {
		return storageUseReqItemRemove;
	}
	public void setStorageUseReqItemRemove(ArrayList<StorageUseReqItem> storageUseReqItemRemove) {
		this.storageUseReqItemRemove = storageUseReqItemRemove;
	}
	public String getCtReject() {
		return ctReject;
	}
	public void setCtReject(String ctReject) {
		this.ctReject = ctReject;
	}
	public String getCtItemCount() {
		return ctItemCount;
	}
	public void setCtItemCount(String ctItemCount) {
		this.ctItemCount = ctItemCount;
	}
	public String getPcReqNo() {
		return pcReqNo;
	}
	public void setPcReqNo(String pcReqNo) {
		this.pcReqNo = pcReqNo;
	}
	public String getItemCnt() {
		return itemCnt;
	}
	public void setItemCnt(String itemCnt) {
		this.itemCnt = itemCnt;
	}
	@Override
	public String toString() {
		return "StorageUseReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", storageUseReqNo=" + storageUseReqNo + ", storageMgr="
				+ storageMgr + ", memo1=" + memo1 + ", useDmdYmd=" + useDmdYmd + ", moveSchYmd=" + moveSchYmd
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", orderGroupId=" + orderGroupId + ", chkStatus="
				+ chkStatus + ", orderTypeName=" + orderTypeName + ", carNo=" + carNo + ", vinNo=" + vinNo
				+ ", makerCode=" + makerCode + ", carType=" + carType + ", orderYmd=" + orderYmd + ", regUserName="
				+ regUserName + ", branchCode=" + branchCode + ", custCode=" + custCode + ", custName=" + custName
				+ ", ctReject=" + ctReject + ", ctItemCount=" + ctItemCount + ", pcReqNo=" + pcReqNo + ", itemCnt="
				+ itemCnt + ", storageUseReqItemAdd=" + storageUseReqItemAdd + ", storageUseReqItemUpdate="
				+ storageUseReqItemUpdate + ", storageUseReqItemRemove=" + storageUseReqItemRemove + "]";
	}
	

	
	
	
}
