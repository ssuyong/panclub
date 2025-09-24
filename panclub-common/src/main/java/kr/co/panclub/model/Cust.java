package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class Cust {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
    private String comCode; 
    private String custCode; 
    private String formalName; 
    private String custName; 
    private String bizNo; 
    private String bzType; 
    private String bzItems; 
    private String custType; 
    private String ceoName; 
    private String custAddress1; 
    private String custAddress2; 
    private String phone; 
    private String fax;
    private String taxType; 
    private String taxTypeName;
    private String cashType;
    private String cashTypeName;
    private String balanceDspType;
    private String balanceDspTypeName;
    private int payDay; 
    private String payType; 
    private String accNum; 
    private String validYN; 
    private long releasePriceType;
    private long warehousePriceType;
    private float marginRate;
    private float warehouseRate;
    private int releaseLimit;
    private int depositLimitDay; 
    private String memo;
    private String regUserld;
    private String regUserName;
    private String created; 
    private String uptUserId; 
    private String uptUserName; 
    private String modified; 
    private String admGroupCode;  // 관리그룹
    private String admEmpNo;      // 관리자
    private String admEmpName;    //관리지명
    private String admGroupName;    //SR담당자명 23.02.16 김보경추가
    private String admGroupSepName;    //SR담당자명 23.02.17 김보경추가
    private String srCustShareRate;    //SR비율 23.02.17 김보경추가
    private String taxMobile;
    private String taxEmail;
    private String placeYN ;   //발주업체 여부 23.02.17 김보경추가
    private String supplyYN ;  //납품업체 여부 23.02.17 김보경추가
    private String custTypeName;
    private String outsideCode;
    private String centerYN; //로컬/외부재고 여부 23.04.24 bk 
    private String mainCustCode; //주 거래처코드 2023.07.13 bk
    private String mainCustName; //주 거래처명 2023.07.13 bk

    private String linkGvKey; //발급할 연동키 20230811 bk
    private String linkTkKey; //발급된 연동키 20230811 bk
    private String attaFileOri; //20230816 첨부파일 이름
    private String attaFile; // 20230816 bk 첨부파일 변환이름
     
    private String custManager; // 20231207 yoonsang
    private String paymentDay; // 20231212 yoonsang
    
	// 수정 행 리스트
	private ArrayList<CustManager> mgrUpdate;
	
	// 추가 행 리스트
	private ArrayList<CustManager> mgrAdd;
	
	// 삭제 행 리스트
	private ArrayList<CustManager> mgrRemove;

	// 수정 행 리스트
	private ArrayList<CustAdmin> admUpdate;
	
	// 추가 행 리스트
	private ArrayList<CustAdmin> admAdd;
	
	// 삭제 행 리스트
	private ArrayList<CustAdmin> admRemove;
	
	
	private String salePriceType;  // 20240202 supi 판매가격 유형

	//aos 보험사코드 2024.08.06
	private String aos_inscd;  
	private String aos_insnm;
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
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getFormalName() {
		return formalName;
	}
	public void setFormalName(String formalName) {
		this.formalName = formalName;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getBizNo() {
		return bizNo;
	}
	public void setBizNo(String bizNo) {
		this.bizNo = bizNo;
	}
	public String getBzType() {
		return bzType;
	}
	public void setBzType(String bzType) {
		this.bzType = bzType;
	}
	public String getBzItems() {
		return bzItems;
	}
	public void setBzItems(String bzItems) {
		this.bzItems = bzItems;
	}
	public String getCustType() {
		return custType;
	}
	public void setCustType(String custType) {
		this.custType = custType;
	}
	public String getCeoName() {
		return ceoName;
	}
	public void setCeoName(String ceoName) {
		this.ceoName = ceoName;
	}
	public String getCustAddress1() {
		return custAddress1;
	}
	public void setCustAddress1(String custAddress1) {
		this.custAddress1 = custAddress1;
	}
	public String getCustAddress2() {
		return custAddress2;
	}
	public void setCustAddress2(String custAddress2) {
		this.custAddress2 = custAddress2;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public String getTaxTypeName() {
		return taxTypeName;
	}
	public void setTaxTypeName(String taxTypeName) {
		this.taxTypeName = taxTypeName;
	}
	public String getCashType() {
		return cashType;
	}
	public void setCashType(String cashType) {
		this.cashType = cashType;
	}
	public String getCashTypeName() {
		return cashTypeName;
	}
	public void setCashTypeName(String cashTypeName) {
		this.cashTypeName = cashTypeName;
	}
	public String getBalanceDspType() {
		return balanceDspType;
	}
	public void setBalanceDspType(String balanceDspType) {
		this.balanceDspType = balanceDspType;
	}
	public String getBalanceDspTypeName() {
		return balanceDspTypeName;
	}
	public void setBalanceDspTypeName(String balanceDspTypeName) {
		this.balanceDspTypeName = balanceDspTypeName;
	}
	public int getPayDay() {
		return payDay;
	}
	public void setPayDay(int payDay) {
		this.payDay = payDay;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getAccNum() {
		return accNum;
	}
	public void setAccNum(String accNum) {
		this.accNum = accNum;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public long getReleasePriceType() {
		return releasePriceType;
	}
	public void setReleasePriceType(long releasePriceType) {
		this.releasePriceType = releasePriceType;
	}
	public long getWarehousePriceType() {
		return warehousePriceType;
	}
	public void setWarehousePriceType(long warehousePriceType) {
		this.warehousePriceType = warehousePriceType;
	}
	public float getMarginRate() {
		return marginRate;
	}
	public void setMarginRate(float marginRate) {
		this.marginRate = marginRate;
	}
	public float getWarehouseRate() {
		return warehouseRate;
	}
	public void setWarehouseRate(float warehouseRate) {
		this.warehouseRate = warehouseRate;
	}
	public int getReleaseLimit() {
		return releaseLimit;
	}
	public void setReleaseLimit(int releaseLimit) {
		this.releaseLimit = releaseLimit;
	}
	public int getDepositLimitDay() {
		return depositLimitDay;
	}
	public void setDepositLimitDay(int depositLimitDay) {
		this.depositLimitDay = depositLimitDay;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getRegUserld() {
		return regUserld;
	}
	public void setRegUserld(String regUserld) {
		this.regUserld = regUserld;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
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
	public String getUptUserName() {
		return uptUserName;
	}
	public void setUptUserName(String uptUserName) {
		this.uptUserName = uptUserName;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public String getAdmGroupCode() {
		return admGroupCode;
	}
	public void setAdmGroupCode(String admGroupCode) {
		this.admGroupCode = admGroupCode;
	}
	public String getAdmEmpNo() {
		return admEmpNo;
	}
	public void setAdmEmpNo(String admEmpNo) {
		this.admEmpNo = admEmpNo;
	}
	public String getAdmEmpName() {
		return admEmpName;
	}
	public void setAdmEmpName(String admEmpName) {
		this.admEmpName = admEmpName;
	}
	public String getAdmGroupName() {
		return admGroupName;
	}
	public void setAdmGroupName(String admGroupName) {
		this.admGroupName = admGroupName;
	}
	public String getAdmGroupSepName() {
		return admGroupSepName;
	}
	public void setAdmGroupSepName(String admGroupSepName) {
		this.admGroupSepName = admGroupSepName;
	}
	public String getSrCustShareRate() {
		return srCustShareRate;
	}
	public void setSrCustShareRate(String srCustShareRate) {
		this.srCustShareRate = srCustShareRate;
	}
	public String getTaxMobile() {
		return taxMobile;
	}
	public void setTaxMobile(String taxMobile) {
		this.taxMobile = taxMobile;
	}
	public String getTaxEmail() {
		return taxEmail;
	}
	public void setTaxEmail(String taxEmail) {
		this.taxEmail = taxEmail;
	}
	public String getPlaceYN() {
		return placeYN;
	}
	public void setPlaceYN(String placeYN) {
		this.placeYN = placeYN;
	}
	public String getSupplyYN() {
		return supplyYN;
	}
	public void setSupplyYN(String supplyYN) {
		this.supplyYN = supplyYN;
	}
	public String getCustTypeName() {
		return custTypeName;
	}
	public void setCustTypeName(String custTypeName) {
		this.custTypeName = custTypeName;
	}
	public String getOutsideCode() {
		return outsideCode;
	}
	public void setOutsideCode(String outsideCode) {
		this.outsideCode = outsideCode;
	}
	public String getCenterYN() {
		return centerYN;
	}
	public void setCenterYN(String centerYN) {
		this.centerYN = centerYN;
	}
	public String getMainCustCode() {
		return mainCustCode;
	}
	public void setMainCustCode(String mainCustCode) {
		this.mainCustCode = mainCustCode;
	}
	public String getMainCustName() {
		return mainCustName;
	}
	public void setMainCustName(String mainCustName) {
		this.mainCustName = mainCustName;
	}
	public String getLinkGvKey() {
		return linkGvKey;
	}
	public void setLinkGvKey(String linkGvKey) {
		this.linkGvKey = linkGvKey;
	}
	public String getLinkTkKey() {
		return linkTkKey;
	}
	public void setLinkTkKey(String linkTkKey) {
		this.linkTkKey = linkTkKey;
	}
	public String getAttaFileOri() {
		return attaFileOri;
	}
	public void setAttaFileOri(String attaFileOri) {
		this.attaFileOri = attaFileOri;
	}
	public String getAttaFile() {
		return attaFile;
	}
	public void setAttaFile(String attaFile) {
		this.attaFile = attaFile;
	}
	public String getCustManager() {
		return custManager;
	}
	public void setCustManager(String custManager) {
		this.custManager = custManager;
	}
	public String getPaymentDay() {
		return paymentDay;
	}
	public void setPaymentDay(String paymentDay) {
		this.paymentDay = paymentDay;
	}
	public ArrayList<CustManager> getMgrUpdate() {
		return mgrUpdate;
	}
	public void setMgrUpdate(ArrayList<CustManager> mgrUpdate) {
		this.mgrUpdate = mgrUpdate;
	}
	public ArrayList<CustManager> getMgrAdd() {
		return mgrAdd;
	}
	public void setMgrAdd(ArrayList<CustManager> mgrAdd) {
		this.mgrAdd = mgrAdd;
	}
	public ArrayList<CustManager> getMgrRemove() {
		return mgrRemove;
	}
	public void setMgrRemove(ArrayList<CustManager> mgrRemove) {
		this.mgrRemove = mgrRemove;
	}
	public ArrayList<CustAdmin> getAdmUpdate() {
		return admUpdate;
	}
	public void setAdmUpdate(ArrayList<CustAdmin> admUpdate) {
		this.admUpdate = admUpdate;
	}
	public ArrayList<CustAdmin> getAdmAdd() {
		return admAdd;
	}
	public void setAdmAdd(ArrayList<CustAdmin> admAdd) {
		this.admAdd = admAdd;
	}
	public ArrayList<CustAdmin> getAdmRemove() {
		return admRemove;
	}
	public void setAdmRemove(ArrayList<CustAdmin> admRemove) {
		this.admRemove = admRemove;
	}
	public String getSalePriceType() {
		return salePriceType;
	}
	public void setSalePriceType(String salePriceType) {
		this.salePriceType = salePriceType;
	}
	public String getAos_inscd() {
		return aos_inscd;
	}
	public void setAos_inscd(String aos_inscd) {
		this.aos_inscd = aos_inscd;
	}
	public String getAos_insnm() {
		return aos_insnm;
	}
	public void setAos_insnm(String aos_insnm) {
		this.aos_insnm = aos_insnm;
	}
	@Override
	public String toString() {
		return "Cust [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", custCode=" + custCode + ", formalName=" + formalName
				+ ", custName=" + custName + ", bizNo=" + bizNo + ", bzType=" + bzType + ", bzItems=" + bzItems
				+ ", custType=" + custType + ", ceoName=" + ceoName + ", custAddress1=" + custAddress1
				+ ", custAddress2=" + custAddress2 + ", phone=" + phone + ", fax=" + fax + ", taxType=" + taxType
				+ ", taxTypeName=" + taxTypeName + ", cashType=" + cashType + ", cashTypeName=" + cashTypeName
				+ ", balanceDspType=" + balanceDspType + ", balanceDspTypeName=" + balanceDspTypeName + ", payDay="
				+ payDay + ", payType=" + payType + ", accNum=" + accNum + ", validYN=" + validYN
				+ ", releasePriceType=" + releasePriceType + ", warehousePriceType=" + warehousePriceType
				+ ", marginRate=" + marginRate + ", warehouseRate=" + warehouseRate + ", releaseLimit=" + releaseLimit
				+ ", depositLimitDay=" + depositLimitDay + ", memo=" + memo + ", regUserld=" + regUserld
				+ ", regUserName=" + regUserName + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", uptUserName=" + uptUserName + ", modified=" + modified + ", admGroupCode=" + admGroupCode
				+ ", admEmpNo=" + admEmpNo + ", admEmpName=" + admEmpName + ", admGroupName=" + admGroupName
				+ ", admGroupSepName=" + admGroupSepName + ", srCustShareRate=" + srCustShareRate + ", taxMobile="
				+ taxMobile + ", taxEmail=" + taxEmail + ", placeYN=" + placeYN + ", supplyYN=" + supplyYN
				+ ", custTypeName=" + custTypeName + ", outsideCode=" + outsideCode + ", centerYN=" + centerYN
				+ ", mainCustCode=" + mainCustCode + ", mainCustName=" + mainCustName + ", linkGvKey=" + linkGvKey
				+ ", linkTkKey=" + linkTkKey + ", attaFileOri=" + attaFileOri + ", attaFile=" + attaFile
				+ ", custManager=" + custManager + ", paymentDay=" + paymentDay + ", mgrUpdate=" + mgrUpdate
				+ ", mgrAdd=" + mgrAdd + ", mgrRemove=" + mgrRemove + ", admUpdate=" + admUpdate + ", admAdd=" + admAdd
				+ ", admRemove=" + admRemove + ", salePriceType=" + salePriceType + ", aos_inscd=" + aos_inscd
				+ ", aos_insnm=" + aos_insnm + "]";
	}
	


	
	

}