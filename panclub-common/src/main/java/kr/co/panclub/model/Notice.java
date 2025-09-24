package kr.co.panclub.model;

import java.util.ArrayList;

public class Notice {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private int noticeNo;
	private String comCodeArr;
	private String title;
	private String contents;
	private String regYmd;
	private String regHms;
	private String regUserId;
	private String regUserName;
	private int readCnt;
	private String validYN;
	private String delYN;
	private String startYmd;
	private String endYmd;
	private String attFileNameOrigin;
	private String attFileName;
	private String fixYN;
	private int fixSeq;
	private String popYN;
	private String popDate;
	private String notiYmd;  //공지일자. 외부노출용
	private String uptUserId;
	private String uptYmd;
	private String uptHms;
	private String logUserId;
	private String fixYNCode; //구분코드
	private String fixYNName;//구분명

	private ArrayList<Notice> noticeUpdateList;

	private ArrayList<Notice> noticeAddList;
		
	private ArrayList<Notice> noticeRemoveList;

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

	public int getNoticeNo() {
		return noticeNo;
	}

	public void setNoticeNo(int noticeNo) {
		this.noticeNo = noticeNo;
	}

	public String getComCodeArr() {
		return comCodeArr;
	}

	public void setComCodeArr(String comCodeArr) {
		this.comCodeArr = comCodeArr;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
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

	public int getReadCnt() {
		return readCnt;
	}

	public void setReadCnt(int readCnt) {
		this.readCnt = readCnt;
	}

	public String getValidYN() {
		return validYN;
	}

	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}

	public String getDelYN() {
		return delYN;
	}

	public void setDelYN(String delYN) {
		this.delYN = delYN;
	}

	public String getStartYmd() {
		return startYmd;
	}

	public void setStartYmd(String startYmd) {
		this.startYmd = startYmd;
	}

	public String getEndYmd() {
		return endYmd;
	}

	public void setEndYmd(String endYmd) {
		this.endYmd = endYmd;
	}

	public String getAttFileNameOrigin() {
		return attFileNameOrigin;
	}

	public void setAttFileNameOrigin(String attFileNameOrigin) {
		this.attFileNameOrigin = attFileNameOrigin;
	}

	public String getAttFileName() {
		return attFileName;
	}

	public void setAttFileName(String attFileName) {
		this.attFileName = attFileName;
	}

	public String getFixYN() {
		return fixYN;
	}

	public void setFixYN(String fixYN) {
		this.fixYN = fixYN;
	}

	public int getFixSeq() {
		return fixSeq;
	}

	public void setFixSeq(int fixSeq) {
		this.fixSeq = fixSeq;
	}

	public String getPopYN() {
		return popYN;
	}

	public void setPopYN(String popYN) {
		this.popYN = popYN;
	}

	public String getPopDate() {
		return popDate;
	}

	public void setPopDate(String popDate) {
		this.popDate = popDate;
	}

	public String getNotiYmd() {
		return notiYmd;
	}

	public void setNotiYmd(String notiYmd) {
		this.notiYmd = notiYmd;
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

	public String getLogUserId() {
		return logUserId;
	}

	public void setLogUserId(String logUserId) {
		this.logUserId = logUserId;
	}

	public String getFixYNCode() {
		return fixYNCode;
	}

	public void setFixYNCode(String fixYNCode) {
		this.fixYNCode = fixYNCode;
	}

	public String getFixYNName() {
		return fixYNName;
	}

	public void setFixYNName(String fixYNName) {
		this.fixYNName = fixYNName;
	}

	public ArrayList<Notice> getNoticeUpdateList() {
		return noticeUpdateList;
	}

	public void setNoticeUpdateList(ArrayList<Notice> noticeUpdateList) {
		this.noticeUpdateList = noticeUpdateList;
	}

	public ArrayList<Notice> getNoticeAddList() {
		return noticeAddList;
	}

	public void setNoticeAddList(ArrayList<Notice> noticeAddList) {
		this.noticeAddList = noticeAddList;
	}

	public ArrayList<Notice> getNoticeRemoveList() {
		return noticeRemoveList;
	}

	public void setNoticeRemoveList(ArrayList<Notice> noticeRemoveList) {
		this.noticeRemoveList = noticeRemoveList;
	}

	@Override
	public String toString() {
		return "Notice [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", noticeNo=" + noticeNo + ", comCodeArr=" + comCodeArr + ", title=" + title
				+ ", contents=" + contents + ", regYmd=" + regYmd + ", regHms=" + regHms + ", regUserId=" + regUserId
				+ ", regUserName=" + regUserName + ", readCnt=" + readCnt + ", validYN=" + validYN + ", delYN=" + delYN
				+ ", startYmd=" + startYmd + ", endYmd=" + endYmd + ", attFileNameOrigin=" + attFileNameOrigin
				+ ", attFileName=" + attFileName + ", fixYN=" + fixYN + ", fixSeq=" + fixSeq + ", popYN=" + popYN
				+ ", popDate=" + popDate + ", notiYmd=" + notiYmd + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd
				+ ", uptHms=" + uptHms + ", logUserId=" + logUserId + ", fixYNCode=" + fixYNCode + ", fixYNName="
				+ fixYNName + ", noticeUpdateList=" + noticeUpdateList + ", noticeAddList=" + noticeAddList
				+ ", noticeRemoveList=" + noticeRemoveList + "]";
	}
	
	
}
