package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class ClGroup {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String clGroupId;	
	private String clType;          //  --판매구분 1:직영 2:대행
	private String clYmd;          //   --청구일
	private String clReqYmd;          //    --청구요청일
	private String orderGroupId;          // 

	private BigDecimal saleAmt;          //   --공급가액
	private BigDecimal taxAmt;          //     --세액
	private BigDecimal centerAmt;          //  --센터가합계
	private BigDecimal sumAmt;          //  --센터가합계
	private BigDecimal clAmt;          //  as (insure1ClAmt  + insure2ClAmt )    --청구액 합

	private String insure1Code;          // 
	private String insure1Name; 
	private String insure1MgrName;          // 
	private String insure1MgrPhone;          // 
	private String insure1Fax;          // --보험1팩스
	private String insure1AcceptNo;          // --보험1접수번호
	private String insure1AcciRate;          // --보험1과실
	private BigDecimal insure1ClAmt;          //   --보험1 청구금액

	private String insure2Code;          // 
	private String insure2Name; 
	private String insure2MgrName;          // 
	private String insure2MgrPhone;          // 	
	private String insure2Fax;          // --보험2팩스
	private String insure2AcceptNo;          // --보험2접수번호
	private String insure2AcciRate;          // --보험2과실
	private BigDecimal insure2ClAmt;          //   --보험2 청구금액

	private String regUserId;          // 
	private String regYmd;          // 
	private String regHms;          // 
	private String uptUserId;          // 
	private String uptYmd;          // 
	private String uptHms;          // 
	
	private String insure1ＭgrName;          // -- 보험1이름 //20230503 bk 
	private String insure1ＭgrPhone;          // -- 보험1핸드폰 //20230503 bk 
	private String insure2ＭgrPhone;          // -- 보험2이름 ///20230503 bk 
	private String insure2ＭgrName;          // -- 보험2핸드폰 //20230503 bk 
	private String insure1MgrFax;          // -- 보험1팩스 //20230503 bk 
	private String insure2MgrFax;          // -- 보험2팩스 //20230503 bk  	
	private String vinNo; //20230503 bk
	private String makerCode; //20230503 bk
	private String carType; //20230503 bk
	private String orderYmd; //20230503 bk
	private String resUserName;	//20230503 bk
	private String ins1DcDsp;          // -- 보험1할인율 //20230503 bk 
	private String ins2DcDsp;          // -- 보험2할인율 //20230503 bk 
	private String custCode; //20230503 bk 
	private String custName;               //납품처//20230503 bk 
	private String procStep;          // --처리단계	//20230503 bk 
	private String collectRegUserId;          // --수금완료//20230503 bk 
	private Date collectDate;          //  --수금완료일자//20230503 bk 
	private String carNo; //20230503 bk
	private String regUserName;  //20230503 bk
	private String reqArr; //20230504 bk
	
	//기결 관련  20230504
	private String confYN; //기결여부
	private Date confDate;   //기결일자
	private String confChkRegUserId;

	//입금관련 20230508
	private String insure1CollAmt;
	private String insure2CollAmt;
	private String capitalAmt; //기타입금액
	private String collectAmt; //총 입금액
	
	private String rdoInsure; //보험사 1/2구분 20230515 bk

	//aos관련 20230516 
	private String bizNo; 
	private String custName2; 
	private String phone;
	
	private String insureAcceptNo;
	private String branchCode; //20230630 bk
	private String chkDate2; //20230710 bk
	
	private String taxBillNo; //20230712 yoonsang
	
	private String expType; //20230718 bk 일반건 증빙유형
	private String billPubli; //20230718 bk 계산서 발행유무
	private String custName5; //20230718 bk AOS용 custname
	
	private ArrayList<ClReqItem> clReqItemAdd;
	// 수정 행 리스트
	private ArrayList<ClReqItem> clReqItemUpdate;
	// 삭제 행 리스트
	private ArrayList<ClReqItem> clReqItemRemove;
	
	private ArrayList<ClReqItem> clReqItemAll;
	
	private String clYm; //20230725 yoonsang 월청구
	private String clRlYmd; //20230802 yoonsang 청구내출고일
	private String clReqType; //20230808 bk 요청구분
	private String memo; //20230808 bk 요청구분
	
	private String pMemo2; //20231227 yoonsang 보험사2인쇄시 메모 추가	
	
	private String taxBillRegDate; //20240105 yoonsang 세금계산서 등록일

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

	public String getClGroupId() {
		return clGroupId;
	}

	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}

	public String getClType() {
		return clType;
	}

	public void setClType(String clType) {
		this.clType = clType;
	}

	public String getClYmd() {
		return clYmd;
	}

	public void setClYmd(String clYmd) {
		this.clYmd = clYmd;
	}

	public String getClReqYmd() {
		return clReqYmd;
	}

	public void setClReqYmd(String clReqYmd) {
		this.clReqYmd = clReqYmd;
	}

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}

	public BigDecimal getSaleAmt() {
		return saleAmt;
	}

	public void setSaleAmt(BigDecimal saleAmt) {
		this.saleAmt = saleAmt;
	}

	public BigDecimal getTaxAmt() {
		return taxAmt;
	}

	public void setTaxAmt(BigDecimal taxAmt) {
		this.taxAmt = taxAmt;
	}

	public BigDecimal getCenterAmt() {
		return centerAmt;
	}

	public void setCenterAmt(BigDecimal centerAmt) {
		this.centerAmt = centerAmt;
	}

	public BigDecimal getSumAmt() {
		return sumAmt;
	}

	public void setSumAmt(BigDecimal sumAmt) {
		this.sumAmt = sumAmt;
	}

	public BigDecimal getClAmt() {
		return clAmt;
	}

	public void setClAmt(BigDecimal clAmt) {
		this.clAmt = clAmt;
	}

	public String getInsure1Code() {
		return insure1Code;
	}

	public void setInsure1Code(String insure1Code) {
		this.insure1Code = insure1Code;
	}

	public String getInsure1Name() {
		return insure1Name;
	}

	public void setInsure1Name(String insure1Name) {
		this.insure1Name = insure1Name;
	}

	public String getInsure1MgrName() {
		return insure1MgrName;
	}

	public void setInsure1MgrName(String insure1MgrName) {
		this.insure1MgrName = insure1MgrName;
	}

	public String getInsure1MgrPhone() {
		return insure1MgrPhone;
	}

	public void setInsure1MgrPhone(String insure1MgrPhone) {
		this.insure1MgrPhone = insure1MgrPhone;
	}

	public String getInsure1Fax() {
		return insure1Fax;
	}

	public void setInsure1Fax(String insure1Fax) {
		this.insure1Fax = insure1Fax;
	}

	public String getInsure1AcceptNo() {
		return insure1AcceptNo;
	}

	public void setInsure1AcceptNo(String insure1AcceptNo) {
		this.insure1AcceptNo = insure1AcceptNo;
	}

	public String getInsure1AcciRate() {
		return insure1AcciRate;
	}

	public void setInsure1AcciRate(String insure1AcciRate) {
		this.insure1AcciRate = insure1AcciRate;
	}

	public BigDecimal getInsure1ClAmt() {
		return insure1ClAmt;
	}

	public void setInsure1ClAmt(BigDecimal insure1ClAmt) {
		this.insure1ClAmt = insure1ClAmt;
	}

	public String getInsure2Code() {
		return insure2Code;
	}

	public void setInsure2Code(String insure2Code) {
		this.insure2Code = insure2Code;
	}

	public String getInsure2Name() {
		return insure2Name;
	}

	public void setInsure2Name(String insure2Name) {
		this.insure2Name = insure2Name;
	}

	public String getInsure2MgrName() {
		return insure2MgrName;
	}

	public void setInsure2MgrName(String insure2MgrName) {
		this.insure2MgrName = insure2MgrName;
	}

	public String getInsure2MgrPhone() {
		return insure2MgrPhone;
	}

	public void setInsure2MgrPhone(String insure2MgrPhone) {
		this.insure2MgrPhone = insure2MgrPhone;
	}

	public String getInsure2Fax() {
		return insure2Fax;
	}

	public void setInsure2Fax(String insure2Fax) {
		this.insure2Fax = insure2Fax;
	}

	public String getInsure2AcceptNo() {
		return insure2AcceptNo;
	}

	public void setInsure2AcceptNo(String insure2AcceptNo) {
		this.insure2AcceptNo = insure2AcceptNo;
	}

	public String getInsure2AcciRate() {
		return insure2AcciRate;
	}

	public void setInsure2AcciRate(String insure2AcciRate) {
		this.insure2AcciRate = insure2AcciRate;
	}

	public BigDecimal getInsure2ClAmt() {
		return insure2ClAmt;
	}

	public void setInsure2ClAmt(BigDecimal insure2ClAmt) {
		this.insure2ClAmt = insure2ClAmt;
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

	public String getInsure1ＭgrName() {
		return insure1ＭgrName;
	}

	public void setInsure1ＭgrName(String insure1ＭgrName) {
		this.insure1ＭgrName = insure1ＭgrName;
	}

	public String getInsure1ＭgrPhone() {
		return insure1ＭgrPhone;
	}

	public void setInsure1ＭgrPhone(String insure1ＭgrPhone) {
		this.insure1ＭgrPhone = insure1ＭgrPhone;
	}

	public String getInsure2ＭgrPhone() {
		return insure2ＭgrPhone;
	}

	public void setInsure2ＭgrPhone(String insure2ＭgrPhone) {
		this.insure2ＭgrPhone = insure2ＭgrPhone;
	}

	public String getInsure2ＭgrName() {
		return insure2ＭgrName;
	}

	public void setInsure2ＭgrName(String insure2ＭgrName) {
		this.insure2ＭgrName = insure2ＭgrName;
	}

	public String getInsure1MgrFax() {
		return insure1MgrFax;
	}

	public void setInsure1MgrFax(String insure1MgrFax) {
		this.insure1MgrFax = insure1MgrFax;
	}

	public String getInsure2MgrFax() {
		return insure2MgrFax;
	}

	public void setInsure2MgrFax(String insure2MgrFax) {
		this.insure2MgrFax = insure2MgrFax;
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

	public String getResUserName() {
		return resUserName;
	}

	public void setResUserName(String resUserName) {
		this.resUserName = resUserName;
	}

	public String getIns1DcDsp() {
		return ins1DcDsp;
	}

	public void setIns1DcDsp(String ins1DcDsp) {
		this.ins1DcDsp = ins1DcDsp;
	}

	public String getIns2DcDsp() {
		return ins2DcDsp;
	}

	public void setIns2DcDsp(String ins2DcDsp) {
		this.ins2DcDsp = ins2DcDsp;
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

	public String getProcStep() {
		return procStep;
	}

	public void setProcStep(String procStep) {
		this.procStep = procStep;
	}

	public String getCollectRegUserId() {
		return collectRegUserId;
	}

	public void setCollectRegUserId(String collectRegUserId) {
		this.collectRegUserId = collectRegUserId;
	}

	public Date getCollectDate() {
		return collectDate;
	}

	public void setCollectDate(Date collectDate) {
		this.collectDate = collectDate;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getRegUserName() {
		return regUserName;
	}

	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}

	public String getReqArr() {
		return reqArr;
	}

	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}

	public String getConfYN() {
		return confYN;
	}

	public void setConfYN(String confYN) {
		this.confYN = confYN;
	}

	public Date getConfDate() {
		return confDate;
	}

	public void setConfDate(Date confDate) {
		this.confDate = confDate;
	}

	public String getConfChkRegUserId() {
		return confChkRegUserId;
	}

	public void setConfChkRegUserId(String confChkRegUserId) {
		this.confChkRegUserId = confChkRegUserId;
	}

	public String getInsure1CollAmt() {
		return insure1CollAmt;
	}

	public void setInsure1CollAmt(String insure1CollAmt) {
		this.insure1CollAmt = insure1CollAmt;
	}

	public String getInsure2CollAmt() {
		return insure2CollAmt;
	}

	public void setInsure2CollAmt(String insure2CollAmt) {
		this.insure2CollAmt = insure2CollAmt;
	}

	public String getCapitalAmt() {
		return capitalAmt;
	}

	public void setCapitalAmt(String capitalAmt) {
		this.capitalAmt = capitalAmt;
	}

	public String getCollectAmt() {
		return collectAmt;
	}

	public void setCollectAmt(String collectAmt) {
		this.collectAmt = collectAmt;
	}

	public String getRdoInsure() {
		return rdoInsure;
	}

	public void setRdoInsure(String rdoInsure) {
		this.rdoInsure = rdoInsure;
	}

	public String getBizNo() {
		return bizNo;
	}

	public void setBizNo(String bizNo) {
		this.bizNo = bizNo;
	}

	public String getCustName2() {
		return custName2;
	}

	public void setCustName2(String custName2) {
		this.custName2 = custName2;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getInsureAcceptNo() {
		return insureAcceptNo;
	}

	public void setInsureAcceptNo(String insureAcceptNo) {
		this.insureAcceptNo = insureAcceptNo;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getChkDate2() {
		return chkDate2;
	}

	public void setChkDate2(String chkDate2) {
		this.chkDate2 = chkDate2;
	}

	public String getTaxBillNo() {
		return taxBillNo;
	}

	public void setTaxBillNo(String taxBillNo) {
		this.taxBillNo = taxBillNo;
	}

	public String getExpType() {
		return expType;
	}

	public void setExpType(String expType) {
		this.expType = expType;
	}

	public String getBillPubli() {
		return billPubli;
	}

	public void setBillPubli(String billPubli) {
		this.billPubli = billPubli;
	}

	public String getCustName5() {
		return custName5;
	}

	public void setCustName5(String custName5) {
		this.custName5 = custName5;
	}

	public ArrayList<ClReqItem> getClReqItemAdd() {
		return clReqItemAdd;
	}

	public void setClReqItemAdd(ArrayList<ClReqItem> clReqItemAdd) {
		this.clReqItemAdd = clReqItemAdd;
	}

	public ArrayList<ClReqItem> getClReqItemUpdate() {
		return clReqItemUpdate;
	}

	public void setClReqItemUpdate(ArrayList<ClReqItem> clReqItemUpdate) {
		this.clReqItemUpdate = clReqItemUpdate;
	}

	public ArrayList<ClReqItem> getClReqItemRemove() {
		return clReqItemRemove;
	}

	public void setClReqItemRemove(ArrayList<ClReqItem> clReqItemRemove) {
		this.clReqItemRemove = clReqItemRemove;
	}

	public ArrayList<ClReqItem> getClReqItemAll() {
		return clReqItemAll;
	}

	public void setClReqItemAll(ArrayList<ClReqItem> clReqItemAll) {
		this.clReqItemAll = clReqItemAll;
	}

	public String getClYm() {
		return clYm;
	}

	public void setClYm(String clYm) {
		this.clYm = clYm;
	}

	public String getClRlYmd() {
		return clRlYmd;
	}

	public void setClRlYmd(String clRlYmd) {
		this.clRlYmd = clRlYmd;
	}

	public String getClReqType() {
		return clReqType;
	}

	public void setClReqType(String clReqType) {
		this.clReqType = clReqType;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getpMemo2() {
		return pMemo2;
	}

	public void setpMemo2(String pMemo2) {
		this.pMemo2 = pMemo2;
	}

	public String getTaxBillRegDate() {
		return taxBillRegDate;
	}

	public void setTaxBillRegDate(String taxBillRegDate) {
		this.taxBillRegDate = taxBillRegDate;
	}

	@Override
	public String toString() {
		return "ClGroup [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", clGroupId=" + clGroupId + ", clType=" + clType + ", clYmd="
				+ clYmd + ", clReqYmd=" + clReqYmd + ", orderGroupId=" + orderGroupId + ", saleAmt=" + saleAmt
				+ ", taxAmt=" + taxAmt + ", centerAmt=" + centerAmt + ", sumAmt=" + sumAmt + ", clAmt=" + clAmt
				+ ", insure1Code=" + insure1Code + ", insure1Name=" + insure1Name + ", insure1MgrName=" + insure1MgrName
				+ ", insure1MgrPhone=" + insure1MgrPhone + ", insure1Fax=" + insure1Fax + ", insure1AcceptNo="
				+ insure1AcceptNo + ", insure1AcciRate=" + insure1AcciRate + ", insure1ClAmt=" + insure1ClAmt
				+ ", insure2Code=" + insure2Code + ", insure2Name=" + insure2Name + ", insure2MgrName=" + insure2MgrName
				+ ", insure2MgrPhone=" + insure2MgrPhone + ", insure2Fax=" + insure2Fax + ", insure2AcceptNo="
				+ insure2AcceptNo + ", insure2AcciRate=" + insure2AcciRate + ", insure2ClAmt=" + insure2ClAmt
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", insure1ＭgrName=" + insure1ＭgrName
				+ ", insure1ＭgrPhone=" + insure1ＭgrPhone + ", insure2ＭgrPhone=" + insure2ＭgrPhone + ", insure2ＭgrName="
				+ insure2ＭgrName + ", insure1MgrFax=" + insure1MgrFax + ", insure2MgrFax=" + insure2MgrFax + ", vinNo="
				+ vinNo + ", makerCode=" + makerCode + ", carType=" + carType + ", orderYmd=" + orderYmd
				+ ", resUserName=" + resUserName + ", ins1DcDsp=" + ins1DcDsp + ", ins2DcDsp=" + ins2DcDsp
				+ ", custCode=" + custCode + ", custName=" + custName + ", procStep=" + procStep + ", collectRegUserId="
				+ collectRegUserId + ", collectDate=" + collectDate + ", carNo=" + carNo + ", regUserName="
				+ regUserName + ", reqArr=" + reqArr + ", confYN=" + confYN + ", confDate=" + confDate
				+ ", confChkRegUserId=" + confChkRegUserId + ", insure1CollAmt=" + insure1CollAmt + ", insure2CollAmt="
				+ insure2CollAmt + ", capitalAmt=" + capitalAmt + ", collectAmt=" + collectAmt + ", rdoInsure="
				+ rdoInsure + ", bizNo=" + bizNo + ", custName2=" + custName2 + ", phone=" + phone + ", insureAcceptNo="
				+ insureAcceptNo + ", branchCode=" + branchCode + ", chkDate2=" + chkDate2 + ", taxBillNo=" + taxBillNo
				+ ", expType=" + expType + ", billPubli=" + billPubli + ", custName5=" + custName5 + ", clReqItemAdd="
				+ clReqItemAdd + ", clReqItemUpdate=" + clReqItemUpdate + ", clReqItemRemove=" + clReqItemRemove
				+ ", clReqItemAll=" + clReqItemAll + ", clYm=" + clYm + ", clRlYmd=" + clRlYmd + ", clReqType="
				+ clReqType + ", memo=" + memo + ", pMemo2=" + pMemo2 + ", taxBillRegDate=" + taxBillRegDate + "]";
	}
	

	

}
