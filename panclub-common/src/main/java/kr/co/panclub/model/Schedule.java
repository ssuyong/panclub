package kr.co.panclub.model;

import java.util.ArrayList;

public class Schedule {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String schNo;
	private String title; 
	private String category;
	private ArrayList<String> memberList;
	private String member;
	private String startYmd;
	private String endYmd;
	private String allDayCheck;
	private String contents;
	
	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;
	private int outerPerson;  //2024.07.23 supi 외부인원
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
	public String getSchNo() {
		return schNo;
	}
	public void setSchNo(String schNo) {
		this.schNo = schNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public ArrayList<String> getMemberList() {
		return memberList;
	}
	public void setMemberList(ArrayList<String> memberList) {
		this.memberList = memberList;
	}
	public String getMember() {
		return member;
	}
	public void setMember(String member) {
		this.member = member;
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
	public String getAllDayCheck() {
		return allDayCheck;
	}
	public void setAllDayCheck(String allDayCheck) {
		this.allDayCheck = allDayCheck;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
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
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public int getOuterPerson() {
		return outerPerson;
	}
	public void setOuterPerson(int outerPerson) {
		this.outerPerson = outerPerson;
	}
	@Override
	public String toString() {
		return "Schedule [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", schNo=" + schNo + ", title=" + title + ", category="
				+ category + ", memberList=" + memberList + ", member=" + member + ", startYmd=" + startYmd
				+ ", endYmd=" + endYmd + ", allDayCheck=" + allDayCheck + ", contents=" + contents + ", regUserId="
				+ regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified=" + modified
				+ ", outerPerson=" + outerPerson + "]";
	}
	
	
		
	
	
}
