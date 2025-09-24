package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class ClReq {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;          //   --회사코드
	private String clReqNo;          // --발주요청번호
	private String orderGroupId;          // --주문그룹ID
	private String clType;          //  -- --청구구분: 보험/일반
	private String memo;          //  --메모
	private String procStep;          // --처리단계
	private String regUserId;          // -- 등록자
	private String regUserName;          // -- 등록자 이름 //20230420 bk 
	private String regYmd;          // 
	private String regHms;          // 
	private String uptUserId;          // --수정자
	private String uptYmd;          // 
	private String uptHms;          // 
	private String chkRegUserId;          // --청구진행
	private Date chkDate;          //   --청구진행
	private String collectRegUserId;          // --수금완료
	private Date collectDate;          //  --수금완료일자
	
	private String reqArr;
	
	private String carNo;               //차번
	private String custName;               //납품처
	private String billPubli;               //청구구분
	private String insure1Name;               //보험사
	private String insure1AcceptNo;               //접수번호
	private float insure1AcciRate;               //과실
	private String insure2Name;               //보험사
	private String insure2AcceptNo;               //접수번호
	private float insure2AcciRate;               //과실
	private BigDecimal insure1CollAmt;               //보험사1수금액
	private BigDecimal insure2CollAmt;               //보험사2수금액
	private BigDecimal riAmt;               //반입
	private BigDecimal extraAmt;               //부대비용
	private BigDecimal primeAmt;                // 원가
	private BigDecimal saleAmt;               //판매가
	private BigDecimal clAmt;             //청구금액
	private BigDecimal collectAmt;          //수금액
	private BigDecimal capitalAmt;     //캐피탈수금액
	private BigDecimal centerAmt;     //센터가 
	private BigDecimal sumAmt;     //센터가 
	
	private String insure1ＭgrName;          // -- 보험1이름 //20230420 bk 
	private String insure1ＭgrPhone;          // -- 보험1핸드폰 //20230420 bk 
	private String insure2ＭgrPhone;          // -- 보험2이름 //20230420 bk 
	private String insure2ＭgrName;          // -- 보험2핸드폰 //20230420 bk 
	private String insure1MgrFax;          // -- 보험1팩스 //20230420 bk 
	private String insure2MgrFax;          // -- 보험2팩스 //20230420 bk 
	
	
	private String insure1Code;          // -- 보험1코드 //20230424 bk 
	private String insure2Code;          // -- 보험2 코드 //20230424 bk 
	private String ins1DcDsp;          // -- 보험1할인율 //20230424 bk 
	private String ins2DcDsp;          // -- 보험2할인율 //20230424 bk 
	private String ins1DcLC;          //  2023.05.03 yoonsang 히든처리
	private String ins1DcWS;          // 
	private String ins2DcLC;          // 
	private String ins2DcWS;          //
		
	//기 요청된건 체크용도. hsg. 2023.04.12 
	private String ordArr;
	private String seqArr;
	
	//주문정보 display 용도. hsg 2023.04.13
	private String orderTypeName;
	private String vinNo;
	private String makerCode;
	private String carType;
	private String orderYmd;
	private String resUserName;
	
	//청구단계용
	private String chkYN;  //진행여부
	private String collectYN; //기결여부 
	private String clYmd;  //청구일자
	
	//AOS 보험청구 엑셀에 부품업체명 등이 들어가야해서 추가. 2023.04.20 hsg '팬오토'
	private String comName;
	private String comBizNo;
	private String comPhone;
	
	private String clGroupId;       //청구그룹ID.hsg. 2023.04.24
	private String clReqYmd;       //2023.04.25 hsg
	private BigDecimal taxAmt;
	private String insure1MgrName;
	private String insure2MgrName;
	private String insure1MgrPhone;
	private String insure1Fax;
	private BigDecimal insure1ClAmt;
	private String insure2MgrPhone;
	private String insure2Fax;
	private BigDecimal insure2ClAmt;

	private BigDecimal salePrice;
	private BigDecimal taxPrice;
	
	private String custCode; //20230502 거래처코드 bk
	private String confYN; //20230504 기결여부 bk
	private String clReqType; //20230510 청구요청유형 bk
	private String chkDate2;          //   --청구진행 2023.05.12 bk
	
	private String oriClGroupId; //20230525 청구전환시 근본청구그룹아이디 저장 yoonsang
	
	private String branchCode; 

	private String taxBillNo; //20230710 세금계산서번호 yoonsang
	
	private String expType; //20230717 증빙유형 bk
	
	private String dataComCode;   //데이터체크용 . 2023.07.21 hsg
	
	private ArrayList<ClReqItem> clReqItemAdd;
	// 수정 행 리스트
	private ArrayList<ClReqItem> clReqItemUpdate;
	// 삭제 행 리스트
	private ArrayList<ClReqItem> clReqItemRemove;

	private ArrayList<ClReqItem> clReqItemAll;
	
	private String clYm;   // 230725 yoonsang 청구월 구분 

	private String insure1CollDate;   // 230731 bk 보험사1 입금일 
	private String insure2CollDate;   // 230731 bk 보험사2 입금일
	private String capitalDate;   // 230731 bk 캐피탈 입금일
	private String depositDate;   // 230731 bk 입금일자
	
	private String pMemo2;   // 20231227 yoonsang 보험사2인쇄시메모

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

	public String getClReqNo() {
		return clReqNo;
	}

	public void setClReqNo(String clReqNo) {
		this.clReqNo = clReqNo;
	}

	public String getOrderGroupId() {
		return orderGroupId;
	}

	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}

	public String getClType() {
		return clType;
	}

	public void setClType(String clType) {
		this.clType = clType;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getProcStep() {
		return procStep;
	}

	public void setProcStep(String procStep) {
		this.procStep = procStep;
	}

	public String getRegUserId() {
		return regUserId;
	}

	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}

	public String getRegUserName() {
		return regUserName;
	}

	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
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

	public String getChkRegUserId() {
		return chkRegUserId;
	}

	public void setChkRegUserId(String chkRegUserId) {
		this.chkRegUserId = chkRegUserId;
	}

	public Date getChkDate() {
		return chkDate;
	}

	public void setChkDate(Date chkDate) {
		this.chkDate = chkDate;
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

	public String getReqArr() {
		return reqArr;
	}

	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getBillPubli() {
		return billPubli;
	}

	public void setBillPubli(String billPubli) {
		this.billPubli = billPubli;
	}

	public String getInsure1Name() {
		return insure1Name;
	}

	public void setInsure1Name(String insure1Name) {
		this.insure1Name = insure1Name;
	}

	public String getInsure1AcceptNo() {
		return insure1AcceptNo;
	}

	public void setInsure1AcceptNo(String insure1AcceptNo) {
		this.insure1AcceptNo = insure1AcceptNo;
	}

	public float getInsure1AcciRate() {
		return insure1AcciRate;
	}

	public void setInsure1AcciRate(float insure1AcciRate) {
		this.insure1AcciRate = insure1AcciRate;
	}

	public String getInsure2Name() {
		return insure2Name;
	}

	public void setInsure2Name(String insure2Name) {
		this.insure2Name = insure2Name;
	}

	public String getInsure2AcceptNo() {
		return insure2AcceptNo;
	}

	public void setInsure2AcceptNo(String insure2AcceptNo) {
		this.insure2AcceptNo = insure2AcceptNo;
	}

	public float getInsure2AcciRate() {
		return insure2AcciRate;
	}

	public void setInsure2AcciRate(float insure2AcciRate) {
		this.insure2AcciRate = insure2AcciRate;
	}

	public BigDecimal getInsure1CollAmt() {
		return insure1CollAmt;
	}

	public void setInsure1CollAmt(BigDecimal insure1CollAmt) {
		this.insure1CollAmt = insure1CollAmt;
	}

	public BigDecimal getInsure2CollAmt() {
		return insure2CollAmt;
	}

	public void setInsure2CollAmt(BigDecimal insure2CollAmt) {
		this.insure2CollAmt = insure2CollAmt;
	}

	public BigDecimal getRiAmt() {
		return riAmt;
	}

	public void setRiAmt(BigDecimal riAmt) {
		this.riAmt = riAmt;
	}

	public BigDecimal getExtraAmt() {
		return extraAmt;
	}

	public void setExtraAmt(BigDecimal extraAmt) {
		this.extraAmt = extraAmt;
	}

	public BigDecimal getPrimeAmt() {
		return primeAmt;
	}

	public void setPrimeAmt(BigDecimal primeAmt) {
		this.primeAmt = primeAmt;
	}

	public BigDecimal getSaleAmt() {
		return saleAmt;
	}

	public void setSaleAmt(BigDecimal saleAmt) {
		this.saleAmt = saleAmt;
	}

	public BigDecimal getClAmt() {
		return clAmt;
	}

	public void setClAmt(BigDecimal clAmt) {
		this.clAmt = clAmt;
	}

	public BigDecimal getCollectAmt() {
		return collectAmt;
	}

	public void setCollectAmt(BigDecimal collectAmt) {
		this.collectAmt = collectAmt;
	}

	public BigDecimal getCapitalAmt() {
		return capitalAmt;
	}

	public void setCapitalAmt(BigDecimal capitalAmt) {
		this.capitalAmt = capitalAmt;
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

	public String getInsure1Code() {
		return insure1Code;
	}

	public void setInsure1Code(String insure1Code) {
		this.insure1Code = insure1Code;
	}

	public String getInsure2Code() {
		return insure2Code;
	}

	public void setInsure2Code(String insure2Code) {
		this.insure2Code = insure2Code;
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

	public String getIns1DcLC() {
		return ins1DcLC;
	}

	public void setIns1DcLC(String ins1DcLC) {
		this.ins1DcLC = ins1DcLC;
	}

	public String getIns1DcWS() {
		return ins1DcWS;
	}

	public void setIns1DcWS(String ins1DcWS) {
		this.ins1DcWS = ins1DcWS;
	}

	public String getIns2DcLC() {
		return ins2DcLC;
	}

	public void setIns2DcLC(String ins2DcLC) {
		this.ins2DcLC = ins2DcLC;
	}

	public String getIns2DcWS() {
		return ins2DcWS;
	}

	public void setIns2DcWS(String ins2DcWS) {
		this.ins2DcWS = ins2DcWS;
	}

	public String getOrdArr() {
		return ordArr;
	}

	public void setOrdArr(String ordArr) {
		this.ordArr = ordArr;
	}

	public String getSeqArr() {
		return seqArr;
	}

	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}

	public String getOrderTypeName() {
		return orderTypeName;
	}

	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
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

	public String getChkYN() {
		return chkYN;
	}

	public void setChkYN(String chkYN) {
		this.chkYN = chkYN;
	}

	public String getCollectYN() {
		return collectYN;
	}

	public void setCollectYN(String collectYN) {
		this.collectYN = collectYN;
	}

	public String getClYmd() {
		return clYmd;
	}

	public void setClYmd(String clYmd) {
		this.clYmd = clYmd;
	}

	public String getComName() {
		return comName;
	}

	public void setComName(String comName) {
		this.comName = comName;
	}

	public String getComBizNo() {
		return comBizNo;
	}

	public void setComBizNo(String comBizNo) {
		this.comBizNo = comBizNo;
	}

	public String getComPhone() {
		return comPhone;
	}

	public void setComPhone(String comPhone) {
		this.comPhone = comPhone;
	}

	public String getClGroupId() {
		return clGroupId;
	}

	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}

	public String getClReqYmd() {
		return clReqYmd;
	}

	public void setClReqYmd(String clReqYmd) {
		this.clReqYmd = clReqYmd;
	}

	public BigDecimal getTaxAmt() {
		return taxAmt;
	}

	public void setTaxAmt(BigDecimal taxAmt) {
		this.taxAmt = taxAmt;
	}

	public String getInsure1MgrName() {
		return insure1MgrName;
	}

	public void setInsure1MgrName(String insure1MgrName) {
		this.insure1MgrName = insure1MgrName;
	}

	public String getInsure2MgrName() {
		return insure2MgrName;
	}

	public void setInsure2MgrName(String insure2MgrName) {
		this.insure2MgrName = insure2MgrName;
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

	public BigDecimal getInsure1ClAmt() {
		return insure1ClAmt;
	}

	public void setInsure1ClAmt(BigDecimal insure1ClAmt) {
		this.insure1ClAmt = insure1ClAmt;
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

	public BigDecimal getInsure2ClAmt() {
		return insure2ClAmt;
	}

	public void setInsure2ClAmt(BigDecimal insure2ClAmt) {
		this.insure2ClAmt = insure2ClAmt;
	}

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public BigDecimal getTaxPrice() {
		return taxPrice;
	}

	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}

	public String getCustCode() {
		return custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}

	public String getConfYN() {
		return confYN;
	}

	public void setConfYN(String confYN) {
		this.confYN = confYN;
	}

	public String getClReqType() {
		return clReqType;
	}

	public void setClReqType(String clReqType) {
		this.clReqType = clReqType;
	}

	public String getChkDate2() {
		return chkDate2;
	}

	public void setChkDate2(String chkDate2) {
		this.chkDate2 = chkDate2;
	}

	public String getOriClGroupId() {
		return oriClGroupId;
	}

	public void setOriClGroupId(String oriClGroupId) {
		this.oriClGroupId = oriClGroupId;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
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

	public String getDataComCode() {
		return dataComCode;
	}

	public void setDataComCode(String dataComCode) {
		this.dataComCode = dataComCode;
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

	public String getInsure1CollDate() {
		return insure1CollDate;
	}

	public void setInsure1CollDate(String insure1CollDate) {
		this.insure1CollDate = insure1CollDate;
	}

	public String getInsure2CollDate() {
		return insure2CollDate;
	}

	public void setInsure2CollDate(String insure2CollDate) {
		this.insure2CollDate = insure2CollDate;
	}

	public String getCapitalDate() {
		return capitalDate;
	}

	public void setCapitalDate(String capitalDate) {
		this.capitalDate = capitalDate;
	}

	public String getDepositDate() {
		return depositDate;
	}

	public void setDepositDate(String depositDate) {
		this.depositDate = depositDate;
	}

	public String getpMemo2() {
		return pMemo2;
	}

	public void setpMemo2(String pMemo2) {
		this.pMemo2 = pMemo2;
	}

	@Override
	public String toString() {
		return "ClReq [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", clReqNo=" + clReqNo + ", orderGroupId=" + orderGroupId
				+ ", clType=" + clType + ", memo=" + memo + ", procStep=" + procStep + ", regUserId=" + regUserId
				+ ", regUserName=" + regUserName + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId="
				+ uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", chkRegUserId=" + chkRegUserId
				+ ", chkDate=" + chkDate + ", collectRegUserId=" + collectRegUserId + ", collectDate=" + collectDate
				+ ", reqArr=" + reqArr + ", carNo=" + carNo + ", custName=" + custName + ", billPubli=" + billPubli
				+ ", insure1Name=" + insure1Name + ", insure1AcceptNo=" + insure1AcceptNo + ", insure1AcciRate="
				+ insure1AcciRate + ", insure2Name=" + insure2Name + ", insure2AcceptNo=" + insure2AcceptNo
				+ ", insure2AcciRate=" + insure2AcciRate + ", insure1CollAmt=" + insure1CollAmt + ", insure2CollAmt="
				+ insure2CollAmt + ", riAmt=" + riAmt + ", extraAmt=" + extraAmt + ", primeAmt=" + primeAmt
				+ ", saleAmt=" + saleAmt + ", clAmt=" + clAmt + ", collectAmt=" + collectAmt + ", capitalAmt="
				+ capitalAmt + ", centerAmt=" + centerAmt + ", sumAmt=" + sumAmt + ", insure1ＭgrName=" + insure1ＭgrName
				+ ", insure1ＭgrPhone=" + insure1ＭgrPhone + ", insure2ＭgrPhone=" + insure2ＭgrPhone + ", insure2ＭgrName="
				+ insure2ＭgrName + ", insure1MgrFax=" + insure1MgrFax + ", insure2MgrFax=" + insure2MgrFax
				+ ", insure1Code=" + insure1Code + ", insure2Code=" + insure2Code + ", ins1DcDsp=" + ins1DcDsp
				+ ", ins2DcDsp=" + ins2DcDsp + ", ins1DcLC=" + ins1DcLC + ", ins1DcWS=" + ins1DcWS + ", ins2DcLC="
				+ ins2DcLC + ", ins2DcWS=" + ins2DcWS + ", ordArr=" + ordArr + ", seqArr=" + seqArr + ", orderTypeName="
				+ orderTypeName + ", vinNo=" + vinNo + ", makerCode=" + makerCode + ", carType=" + carType
				+ ", orderYmd=" + orderYmd + ", resUserName=" + resUserName + ", chkYN=" + chkYN + ", collectYN="
				+ collectYN + ", clYmd=" + clYmd + ", comName=" + comName + ", comBizNo=" + comBizNo + ", comPhone="
				+ comPhone + ", clGroupId=" + clGroupId + ", clReqYmd=" + clReqYmd + ", taxAmt=" + taxAmt
				+ ", insure1MgrName=" + insure1MgrName + ", insure2MgrName=" + insure2MgrName + ", insure1MgrPhone="
				+ insure1MgrPhone + ", insure1Fax=" + insure1Fax + ", insure1ClAmt=" + insure1ClAmt
				+ ", insure2MgrPhone=" + insure2MgrPhone + ", insure2Fax=" + insure2Fax + ", insure2ClAmt="
				+ insure2ClAmt + ", salePrice=" + salePrice + ", taxPrice=" + taxPrice + ", custCode=" + custCode
				+ ", confYN=" + confYN + ", clReqType=" + clReqType + ", chkDate2=" + chkDate2 + ", oriClGroupId="
				+ oriClGroupId + ", branchCode=" + branchCode + ", taxBillNo=" + taxBillNo + ", expType=" + expType
				+ ", dataComCode=" + dataComCode + ", clReqItemAdd=" + clReqItemAdd + ", clReqItemUpdate="
				+ clReqItemUpdate + ", clReqItemRemove=" + clReqItemRemove + ", clReqItemAll=" + clReqItemAll
				+ ", clYm=" + clYm + ", insure1CollDate=" + insure1CollDate + ", insure2CollDate=" + insure2CollDate
				+ ", capitalDate=" + capitalDate + ", depositDate=" + depositDate + ", pMemo2=" + pMemo2 + "]";
	}
	
	

	
		
}
