package kr.co.panclub.model;

import java.math.BigDecimal;

public class RoReqAtt {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String roReqNo;
	private String attaSeq;
	private String attaFile;             // -- 첨부파일명
	private String attaFileOri;             // --  첨부파일원본명
	
	private String regUserId;             //--등록자
	private String regYmd;             //--등록일
	private String regHms;             // --등록시
	private String uptUserId;             // --수정자
	private String uptYmd;             //--수정일
	private String uptHms;             //--수정시
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
	public String getAttaSeq() {
		return attaSeq;
	}
	public void setAttaSeq(String attaSeq) {
		this.attaSeq = attaSeq;
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
	@Override
	public String toString() {
		return "RoReqAtt [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", roReqNo=" + roReqNo + ", attaSeq=" + attaSeq
				+ ", attaFile=" + attaFile + ", attaFileOri=" + attaFileOri + ", regUserId=" + regUserId + ", regYmd="
				+ regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms="
				+ uptHms + "]";
	}
	
	
	
	
}
