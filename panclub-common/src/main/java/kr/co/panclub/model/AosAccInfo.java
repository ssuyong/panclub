package kr.co.panclub.model;

import java.math.BigDecimal;

public class AosAccInfo {
	private String workingType;
	private String logComCode;  //로그인한 회사코드
	private String logUserId;   //로그인한 사용자
	 
	private String reqbizno; //청구서 요청업체 사업자번호 
	private String wrhsyssn; // aos 내부키
	
	
	private String reqregtymd; //요청작성날짜
	private String reqmemo;    //요청메모
	private String accymd;     //사고날짜
	private String carbdynum;  //차대번호(vinno)
	private String mdlnm; //모델
	private String carnum; //차량번호
	private String autbiznm; //정비공장명
	private String autbizno; //정비공장 사업자번호
	private int fltrt;   //과실율
	private String noinspay;  //미결
	
	private int odr;  //회차
	private BigDecimal dcspay;  //청구금액
	private BigDecimal aunpatsum; //순정부품소계
	private BigDecimal snhpatsum; //중고부품소계
	private BigDecimal glssum;    //유리부품소계
	private String  vatrt;     // 부가세율
	private BigDecimal vat;    // 부가세
	private BigDecimal patsum; // 부품합계금액
	private BigDecimal lassum; 
	private BigDecimal inpinspay;
	private String inpinspayymd;
	
	
	//보험사정보
	private String accno;   //사고접수번호
	private String carnm;   //차량명
	private String esaopstusnm;  //상태
	private String cstnemail;   //보험사담당자이메일
	private String cstnnm;      //보험사직원명
	private String inscd;   //보험사코드
	private String insnm;   //보험사코드
	private String ipscarnum;   //피보험자차량
	private String ipsownnm;    //피보험자명
	
	private int ordrank;    //서열
	private String mrtgnm;  //담보
	private String reqymd; //청구일자
	private String reqtm;  //청구시간
	private int reqsn;   //순번
	
	//엑셀 업로드용
	private String custCode;
	
	//조회 추가정보
	private String custName;

	public String getWorkingType() {
		return workingType;
	}

	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}

	public String getLogComCode() {
		return logComCode;
	}

	public void setLogComCode(String logComCode) {
		this.logComCode = logComCode;
	}

	public String getLogUserId() {
		return logUserId;
	}

	public void setLogUserId(String logUserId) {
		this.logUserId = logUserId;
	}

	public String getReqbizno() {
		return reqbizno;
	}

	public void setReqbizno(String reqbizno) {
		this.reqbizno = reqbizno;
	}

	public String getWrhsyssn() {
		return wrhsyssn;
	}

	public void setWrhsyssn(String wrhsyssn) {
		this.wrhsyssn = wrhsyssn;
	}

	public String getReqregtymd() {
		return reqregtymd;
	}

	public void setReqregtymd(String reqregtymd) {
		this.reqregtymd = reqregtymd;
	}

	public String getReqmemo() {
		return reqmemo;
	}

	public void setReqmemo(String reqmemo) {
		this.reqmemo = reqmemo;
	}

	public String getAccymd() {
		return accymd;
	}

	public void setAccymd(String accymd) {
		this.accymd = accymd;
	}

	public String getCarbdynum() {
		return carbdynum;
	}

	public void setCarbdynum(String carbdynum) {
		this.carbdynum = carbdynum;
	}

	public String getMdlnm() {
		return mdlnm;
	}

	public void setMdlnm(String mdlnm) {
		this.mdlnm = mdlnm;
	}

	public String getCarnum() {
		return carnum;
	}

	public void setCarnum(String carnum) {
		this.carnum = carnum;
	}

	public String getAutbiznm() {
		return autbiznm;
	}

	public void setAutbiznm(String autbiznm) {
		this.autbiznm = autbiznm;
	}

	public String getAutbizno() {
		return autbizno;
	}

	public void setAutbizno(String autbizno) {
		this.autbizno = autbizno;
	}

	public int getFltrt() {
		return fltrt;
	}

	public void setFltrt(int fltrt) {
		this.fltrt = fltrt;
	}

	public String getNoinspay() {
		return noinspay;
	}

	public void setNoinspay(String noinspay) {
		this.noinspay = noinspay;
	}

	public int getOdr() {
		return odr;
	}

	public void setOdr(int odr) {
		this.odr = odr;
	}

	public BigDecimal getDcspay() {
		return dcspay;
	}

	public void setDcspay(BigDecimal dcspay) {
		this.dcspay = dcspay;
	}

	public BigDecimal getAunpatsum() {
		return aunpatsum;
	}

	public void setAunpatsum(BigDecimal aunpatsum) {
		this.aunpatsum = aunpatsum;
	}

	public BigDecimal getSnhpatsum() {
		return snhpatsum;
	}

	public void setSnhpatsum(BigDecimal snhpatsum) {
		this.snhpatsum = snhpatsum;
	}

	public BigDecimal getGlssum() {
		return glssum;
	}

	public void setGlssum(BigDecimal glssum) {
		this.glssum = glssum;
	}

	public String getVatrt() {
		return vatrt;
	}

	public void setVatrt(String vatrt) {
		this.vatrt = vatrt;
	}

	public BigDecimal getVat() {
		return vat;
	}

	public void setVat(BigDecimal vat) {
		this.vat = vat;
	}

	public BigDecimal getPatsum() {
		return patsum;
	}

	public void setPatsum(BigDecimal patsum) {
		this.patsum = patsum;
	}

	public BigDecimal getLassum() {
		return lassum;
	}

	public void setLassum(BigDecimal lassum) {
		this.lassum = lassum;
	}

	public BigDecimal getInpinspay() {
		return inpinspay;
	}

	public void setInpinspay(BigDecimal inpinspay) {
		this.inpinspay = inpinspay;
	}

	public String getInpinspayymd() {
		return inpinspayymd;
	}

	public void setInpinspayymd(String inpinspayymd) {
		this.inpinspayymd = inpinspayymd;
	}

	public String getAccno() {
		return accno;
	}

	public void setAccno(String accno) {
		this.accno = accno;
	}

	public String getCarnm() {
		return carnm;
	}

	public void setCarnm(String carnm) {
		this.carnm = carnm;
	}

	public String getEsaopstusnm() {
		return esaopstusnm;
	}

	public void setEsaopstusnm(String esaopstusnm) {
		this.esaopstusnm = esaopstusnm;
	}

	public String getCstnemail() {
		return cstnemail;
	}

	public void setCstnemail(String cstnemail) {
		this.cstnemail = cstnemail;
	}

	public String getCstnnm() {
		return cstnnm;
	}

	public void setCstnnm(String cstnnm) {
		this.cstnnm = cstnnm;
	}

	public String getInscd() {
		return inscd;
	}

	public void setInscd(String inscd) {
		this.inscd = inscd;
	}

	public String getInsnm() {
		return insnm;
	}

	public void setInsnm(String insnm) {
		this.insnm = insnm;
	}

	public String getIpscarnum() {
		return ipscarnum;
	}

	public void setIpscarnum(String ipscarnum) {
		this.ipscarnum = ipscarnum;
	}

	public String getIpsownnm() {
		return ipsownnm;
	}

	public void setIpsownnm(String ipsownnm) {
		this.ipsownnm = ipsownnm;
	}

	public int getOrdrank() {
		return ordrank;
	}

	public void setOrdrank(int ordrank) {
		this.ordrank = ordrank;
	}

	public String getMrtgnm() {
		return mrtgnm;
	}

	public void setMrtgnm(String mrtgnm) {
		this.mrtgnm = mrtgnm;
	}

	public String getReqymd() {
		return reqymd;
	}

	public void setReqymd(String reqymd) {
		this.reqymd = reqymd;
	}

	public String getReqtm() {
		return reqtm;
	}

	public void setReqtm(String reqtm) {
		this.reqtm = reqtm;
	}

	public int getReqsn() {
		return reqsn;
	}

	public void setReqsn(int reqsn) {
		this.reqsn = reqsn;
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

	@Override
	public String toString() {
		return "AosAccInfo [workingType=" + workingType + ", logComCode=" + logComCode + ", logUserId=" + logUserId
				+ ", reqbizno=" + reqbizno + ", wrhsyssn=" + wrhsyssn + ", reqregtymd=" + reqregtymd + ", reqmemo="
				+ reqmemo + ", accymd=" + accymd + ", carbdynum=" + carbdynum + ", mdlnm=" + mdlnm + ", carnum="
				+ carnum + ", autbiznm=" + autbiznm + ", autbizno=" + autbizno + ", fltrt=" + fltrt + ", noinspay="
				+ noinspay + ", odr=" + odr + ", dcspay=" + dcspay + ", aunpatsum=" + aunpatsum + ", snhpatsum="
				+ snhpatsum + ", glssum=" + glssum + ", vatrt=" + vatrt + ", vat=" + vat + ", patsum=" + patsum
				+ ", lassum=" + lassum + ", inpinspay=" + inpinspay + ", inpinspayymd=" + inpinspayymd + ", accno="
				+ accno + ", carnm=" + carnm + ", esaopstusnm=" + esaopstusnm + ", cstnemail=" + cstnemail + ", cstnnm="
				+ cstnnm + ", inscd=" + inscd + ", insnm=" + insnm + ", ipscarnum=" + ipscarnum + ", ipsownnm="
				+ ipsownnm + ", ordrank=" + ordrank + ", mrtgnm=" + mrtgnm + ", reqymd=" + reqymd + ", reqtm=" + reqtm
				+ ", reqsn=" + reqsn + ", custCode=" + custCode + ", custName=" + custName + "]";
	}

	

	
}
