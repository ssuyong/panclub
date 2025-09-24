package kr.co.panclub.model;

import java.util.ArrayList;

public class Rl {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;	
	
	private String comCode;
	private String rlNo;               //  --번호
	private String custCode;               //--구매처처코드
	private String rlYmd;               // --입고일
	private String custOrderNo;               // --구매처주문번호
	private String memo1;               //--비고1
	private int price;               //--공급가액
	private int taxPrice;               //--세액
	private int sumPrice;               //--합계
	private String regUserId;               //--등록자
	private String regYmd;               //--등록일
	private String regHms;               // --등록시
	private String uptUserId;               // --수정자
	private String uptYmd;               //--수정일
	private String uptHms;               //--수정시	
	
	private int itemCnt;
	private int cnt;
	private String custName;
	private String payYmd;
	private String storageCode;
	private String storageName;  
	
	private String orderGroupId;   		//2023.04.10 yoonsang  추가
	private String carNo;   		//2023.04.10 yoonsang  추가
	private String makerCode;   		//2023.04.10 yoonsang  추가
	private String carType;   		//2023.04.10 yoonsang  추가
	private String rlWay;   		//2023.04.10 yoonsang  추가
	private String rlMgr;   		//2023.04.10 yoonsang  추가
	
	private String orderTypeName;   		//2023.04.11 yoonsang  추가
	private String custMgrName;   		//2023.04.11 yoonsang  추가
	private String custMgrPhone;   		//2023.04.11 yoonsang  추가
	private String vinNo;   		//2023.04.11 yoonsang  추가
	
	//2023.05.20 hsg
	private String rackCode;
	private String rackName;
	
	//2023.05.23 bk
	private String branchCode; //지점코드
	private String branchName; //지점명 
	private String outDead; //2023.06.07 마감일 bokyung
	
	private String memo1Arr; //2023.06.27 누락추가 yoonsang
	private String memo2Arr; //2023.06.27 누락추가 yoonsang
	
	private String rlSeqArr; //2023.06.27 출고순번추가 yoonsang
	private String rlSalePriceArr; //2023.06.30 출고판매단가 yoonsang

	private String stdClType; //2023.07.05 청구구분 yoonsang
	
	//2023.07.13 hsg
	private String srCode;  //sr코드
	private String srName;  //sr명
	
	// 추가 행 리스트
	private ArrayList<RlItem> rlItemAdd;
	// 수정 행 리스트
	private ArrayList<RlItem> rlItemUpdate;
	// 삭제 행 리스트
	private ArrayList<RlItem> RlItemRemove;
	
	private String clGroupId;  //230727 yoonsang
	private String regUserName;  //230802 yoonsang
	private String clType;  //230802 yoonsang
	
	private int deliveryFee; //20230919 bk 배송비
	private String deliveryYN; //20230919 bk 배송비 적용여부 
	private String gvComCode;
	private String colorCode; //20231010 bk 컬러코드
	
	private String supplyCustCode; //20231013
	private String supplyCustName; //20231013 
	private String supplyMgrName; //20231013 
	private String supplyMgrPhone; //20231013 
	
	private String orderUserId; //240108 yoonsang

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
	public String getRlNo() {
		return rlNo;
	}
	public void setRlNo(String rlNo) {
		this.rlNo = rlNo;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getRlYmd() {
		return rlYmd;
	}
	public void setRlYmd(String rlYmd) {
		this.rlYmd = rlYmd;
	}
	public String getCustOrderNo() {
		return custOrderNo;
	}
	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(int taxPrice) {
		this.taxPrice = taxPrice;
	}
	public int getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(int sumPrice) {
		this.sumPrice = sumPrice;
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
	public int getItemCnt() {
		return itemCnt;
	}
	public void setItemCnt(int itemCnt) {
		this.itemCnt = itemCnt;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getPayYmd() {
		return payYmd;
	}
	public void setPayYmd(String payYmd) {
		this.payYmd = payYmd;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
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
	public String getRlWay() {
		return rlWay;
	}
	public void setRlWay(String rlWay) {
		this.rlWay = rlWay;
	}
	public String getRlMgr() {
		return rlMgr;
	}
	public void setRlMgr(String rlMgr) {
		this.rlMgr = rlMgr;
	}
	public String getOrderTypeName() {
		return orderTypeName;
	}
	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
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
	public String getVinNo() {
		return vinNo;
	}
	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
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
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getOutDead() {
		return outDead;
	}
	public void setOutDead(String outDead) {
		this.outDead = outDead;
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
	public String getRlSeqArr() {
		return rlSeqArr;
	}
	public void setRlSeqArr(String rlSeqArr) {
		this.rlSeqArr = rlSeqArr;
	}
	public String getRlSalePriceArr() {
		return rlSalePriceArr;
	}
	public void setRlSalePriceArr(String rlSalePriceArr) {
		this.rlSalePriceArr = rlSalePriceArr;
	}
	public String getStdClType() {
		return stdClType;
	}
	public void setStdClType(String stdClType) {
		this.stdClType = stdClType;
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
	public ArrayList<RlItem> getRlItemAdd() {
		return rlItemAdd;
	}
	public void setRlItemAdd(ArrayList<RlItem> rlItemAdd) {
		this.rlItemAdd = rlItemAdd;
	}
	public ArrayList<RlItem> getRlItemUpdate() {
		return rlItemUpdate;
	}
	public void setRlItemUpdate(ArrayList<RlItem> rlItemUpdate) {
		this.rlItemUpdate = rlItemUpdate;
	}
	public ArrayList<RlItem> getRlItemRemove() {
		return RlItemRemove;
	}
	public void setRlItemRemove(ArrayList<RlItem> rlItemRemove) {
		RlItemRemove = rlItemRemove;
	}
	public String getClGroupId() {
		return clGroupId;
	}
	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getClType() {
		return clType;
	}
	public void setClType(String clType) {
		this.clType = clType;
	}
	public int getDeliveryFee() {
		return deliveryFee;
	}
	public void setDeliveryFee(int deliveryFee) {
		this.deliveryFee = deliveryFee;
	}
	public String getDeliveryYN() {
		return deliveryYN;
	}
	public void setDeliveryYN(String deliveryYN) {
		this.deliveryYN = deliveryYN;
	}
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public String getColorCode() {
		return colorCode;
	}
	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
	}
	public String getSupplyCustCode() {
		return supplyCustCode;
	}
	public void setSupplyCustCode(String supplyCustCode) {
		this.supplyCustCode = supplyCustCode;
	}
	public String getSupplyCustName() {
		return supplyCustName;
	}
	public void setSupplyCustName(String supplyCustName) {
		this.supplyCustName = supplyCustName;
	}
	public String getSupplyMgrName() {
		return supplyMgrName;
	}
	public void setSupplyMgrName(String supplyMgrName) {
		this.supplyMgrName = supplyMgrName;
	}
	public String getSupplyMgrPhone() {
		return supplyMgrPhone;
	}
	public void setSupplyMgrPhone(String supplyMgrPhone) {
		this.supplyMgrPhone = supplyMgrPhone;
	}
	public String getOrderUserId() {
		return orderUserId;
	}
	public void setOrderUserId(String orderUserId) {
		this.orderUserId = orderUserId;
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
		return "Rl [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg
				+ ", comCode=" + comCode + ", rlNo=" + rlNo + ", custCode=" + custCode + ", rlYmd=" + rlYmd
				+ ", custOrderNo=" + custOrderNo + ", memo1=" + memo1 + ", price=" + price + ", taxPrice=" + taxPrice
				+ ", sumPrice=" + sumPrice + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms
				+ ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", itemCnt=" + itemCnt
				+ ", cnt=" + cnt + ", custName=" + custName + ", payYmd=" + payYmd + ", storageCode=" + storageCode
				+ ", storageName=" + storageName + ", orderGroupId=" + orderGroupId + ", carNo=" + carNo
				+ ", makerCode=" + makerCode + ", carType=" + carType + ", rlWay=" + rlWay + ", rlMgr=" + rlMgr
				+ ", orderTypeName=" + orderTypeName + ", custMgrName=" + custMgrName + ", custMgrPhone=" + custMgrPhone
				+ ", vinNo=" + vinNo + ", rackCode=" + rackCode + ", rackName=" + rackName + ", branchCode="
				+ branchCode + ", branchName=" + branchName + ", outDead=" + outDead + ", memo1Arr=" + memo1Arr
				+ ", memo2Arr=" + memo2Arr + ", rlSeqArr=" + rlSeqArr + ", rlSalePriceArr=" + rlSalePriceArr
				+ ", stdClType=" + stdClType + ", srCode=" + srCode + ", srName=" + srName + ", rlItemAdd=" + rlItemAdd
				+ ", rlItemUpdate=" + rlItemUpdate + ", RlItemRemove=" + RlItemRemove + ", clGroupId=" + clGroupId
				+ ", regUserName=" + regUserName + ", clType=" + clType + ", deliveryFee=" + deliveryFee
				+ ", deliveryYN=" + deliveryYN + ", gvComCode=" + gvComCode + ", colorCode=" + colorCode
				+ ", supplyCustCode=" + supplyCustCode + ", supplyCustName=" + supplyCustName + ", supplyMgrName="
				+ supplyMgrName + ", supplyMgrPhone=" + supplyMgrPhone + ", orderUserId=" + orderUserId + ", gvComName="
				+ gvComName + ", doubleClickYN=" + doubleClickYN + "]";
	}
	

	
	
	
	
}
