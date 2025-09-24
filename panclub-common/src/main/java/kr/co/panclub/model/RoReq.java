package kr.co.panclub.model;

import java.math.BigDecimal;

public class RoReq {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String roReqNo;             //  --요청번호
	private String storageCode;             // -- 창고코드
	private String custCode;             //--구매처처코드
	private String dmdYmd;             // --출고요청일
	private String dmdTime;             // --요청시간
	private String receiver;             // --수신자
	private String memo1;             //--비고1
	private String attaFile;             // -- 첨부파일명
	private String attaFileOri;             // --  첨부파일원본명
	private String roWay;             //  --출고방법
	private String orderGroupId;             //
	private String regUserId;             //--등록자
	private String regYmd;             //--등록일
	private String regHms;             // --등록시
	private String uptUserId;             // --수정자
	private String uptYmd;             //--수정일
	private String uptHms;             //--수정시
	
	private String carNo;             //2023.04.20 yoonsang 추가
	private String procStatus;        //2023.04.20 yoonsang 추가
	private String vinNo;        //2023.04.20 yoonsang 추가
	private String orderTypeName;        //2023.04.20 yoonsang 추가
	private String makerCode;        //2023.04.20 yoonsang 추가
	private String carType;        //2023.04.20 yoonsang 추가
	
	private String saleCustCode;        //2023.04.20 yoonsang 추가
	private String saleCustName;        //2023.04.20 yoonsang 추가
	private String custMgrName;        //2023.04.20 yoonsang 추가
	private String custMgrPhone;        //2023.04.20 yoonsang 추가
	
	//2023.05.24 hsg
	private String storageName;
	private String rackCode;
	private String rackName;

	//2032.06.30 bk
	private String branchCode;
	//2023.07.10 bk 
	private BigDecimal roSumPrice; //2023.07.10 bk 공급가액
	private BigDecimal roTaxPrice; //2023.07.10 bk 세액
	private BigDecimal roSumPriceTax; //2023.07.10 bk 합계금액
	
	private String gvComCode;
	private String gvComName;
	private String doubleClickYN;
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
	public String getRoReqNo() {
		return roReqNo;
	}
	public void setRoReqNo(String roReqNo) {
		this.roReqNo = roReqNo;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getDmdYmd() {
		return dmdYmd;
	}
	public void setDmdYmd(String dmdYmd) {
		this.dmdYmd = dmdYmd;
	}
	public String getDmdTime() {
		return dmdTime;
	}
	public void setDmdTime(String dmdTime) {
		this.dmdTime = dmdTime;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public String getAttaFile() {
		return attaFile;
	}
	public void setAttaFile(String attaFile) {
		this.attaFile = attaFile;
	}
	public String getAttaFileOri() {
		return attaFileOri;
	}
	public void setAttaFileOri(String attaFileOri) {
		this.attaFileOri = attaFileOri;
	}
	public String getRoWay() {
		return roWay;
	}
	public void setRoWay(String roWay) {
		this.roWay = roWay;
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
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getProcStatus() {
		return procStatus;
	}
	public void setProcStatus(String procStatus) {
		this.procStatus = procStatus;
	}
	public String getVinNo() {
		return vinNo;
	}
	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}
	public String getOrderTypeName() {
		return orderTypeName;
	}
	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
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
	public String getSaleCustCode() {
		return saleCustCode;
	}
	public void setSaleCustCode(String saleCustCode) {
		this.saleCustCode = saleCustCode;
	}
	public String getSaleCustName() {
		return saleCustName;
	}
	public void setSaleCustName(String saleCustName) {
		this.saleCustName = saleCustName;
	}
	public String getCustMgrName() {
		return custMgrName;
	}
	public void setCustMgrName(String custMgrName) {
		this.custMgrName = custMgrName;
	}
	public String getCustMgrPhone() {
		return custMgrPhone;
	}
	public void setCustMgrPhone(String custMgrPhone) {
		this.custMgrPhone = custMgrPhone;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public BigDecimal getRoSumPrice() {
		return roSumPrice;
	}
	public void setRoSumPrice(BigDecimal roSumPrice) {
		this.roSumPrice = roSumPrice;
	}
	public BigDecimal getRoTaxPrice() {
		return roTaxPrice;
	}
	public void setRoTaxPrice(BigDecimal roTaxPrice) {
		this.roTaxPrice = roTaxPrice;
	}
	public BigDecimal getRoSumPriceTax() {
		return roSumPriceTax;
	}
	public void setRoSumPriceTax(BigDecimal roSumPriceTax) {
		this.roSumPriceTax = roSumPriceTax;
	}
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public String getGvComName() {
		return gvComName;
	}
	public void setGvComName(String gvComName) {
		this.gvComName = gvComName;
	}
	public String getDoubleClickYN() {
		return doubleClickYN;
	}
	public void setDoubleClickYN(String doubleClickYN) {
		this.doubleClickYN = doubleClickYN;
	}
	@Override
	public String toString() {
		return "RoReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", roReqNo=" + roReqNo + ", storageCode=" + storageCode
				+ ", custCode=" + custCode + ", dmdYmd=" + dmdYmd + ", dmdTime=" + dmdTime + ", receiver=" + receiver
				+ ", memo1=" + memo1 + ", attaFile=" + attaFile + ", attaFileOri=" + attaFileOri + ", roWay=" + roWay
				+ ", orderGroupId=" + orderGroupId + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms="
				+ regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", carNo=" + carNo
				+ ", procStatus=" + procStatus + ", vinNo=" + vinNo + ", orderTypeName=" + orderTypeName
				+ ", makerCode=" + makerCode + ", carType=" + carType + ", saleCustCode=" + saleCustCode
				+ ", saleCustName=" + saleCustName + ", custMgrName=" + custMgrName + ", custMgrPhone=" + custMgrPhone
				+ ", storageName=" + storageName + ", rackCode=" + rackCode + ", rackName=" + rackName + ", branchCode="
				+ branchCode + ", roSumPrice=" + roSumPrice + ", roTaxPrice=" + roTaxPrice + ", roSumPriceTax="
				+ roSumPriceTax + ", gvComCode=" + gvComCode + ", gvComName=" + gvComName + ", doubleClickYN="
				+ doubleClickYN + "]";
	}
	

	
}
