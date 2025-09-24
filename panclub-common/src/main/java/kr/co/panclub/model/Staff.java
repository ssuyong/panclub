package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class Staff {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String comCode; 
	private String empNo_origin;
	private String empNo; 
	private String dutyCode; 
	private String positionCode; 
	private String classCode; 
	private String branchCode; 
	private String deptCode; 
	private String imageRoot; 
	private String name; 
	private String ename; 
	private String gender; 
	private String phone1; 
	private String phone2; 
	private String birth; 
	private String offMail; 
	private String mail; 
	private String addr1; 
	private String zipCode; 
	private String startYmd; 
	private String finYmd; 
	private String panclubUserId; 
	private String regUserId; 
	private String created; 
	private String uptUserId; 
	private String modified;
	
	// 수정 행 리스트
	private ArrayList<Staff> staffUpdateList;

	// 추가 행 리스트
	private ArrayList<Staff> staffAddList;
		
	// 삭제 행 리스트
	private ArrayList<Staff> staffRemoveList;

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

	public String getEmpNo_origin() {
		return empNo_origin;
	}

	public void setEmpNo_origin(String empNo_origin) {
		this.empNo_origin = empNo_origin;
	}

	public String getEmpNo() {
		return empNo;
	}

	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

	public String getDutyCode() {
		return dutyCode;
	}

	public void setDutyCode(String dutyCode) {
		this.dutyCode = dutyCode;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}

	public String getClassCode() {
		return classCode;
	}

	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getImageRoot() {
		return imageRoot;
	}

	public void setImageRoot(String imageRoot) {
		this.imageRoot = imageRoot;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getOffMail() {
		return offMail;
	}

	public void setOffMail(String offMail) {
		this.offMail = offMail;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getAddr1() {
		return addr1;
	}

	public void setAddr1(String addr1) {
		this.addr1 = addr1;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getStartYmd() {
		return startYmd;
	}

	public void setStartYmd(String startYmd) {
		this.startYmd = startYmd;
	}

	public String getFinYmd() {
		return finYmd;
	}

	public void setFinYmd(String finYmd) {
		this.finYmd = finYmd;
	}

	public String getPanclubUserId() {
		return panclubUserId;
	}

	public void setPanclubUserId(String panclubUserId) {
		this.panclubUserId = panclubUserId;
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

	public ArrayList<Staff> getStaffUpdateList() {
		return staffUpdateList;
	}

	public void setStaffUpdateList(ArrayList<Staff> staffUpdateList) {
		this.staffUpdateList = staffUpdateList;
	}

	public ArrayList<Staff> getStaffAddList() {
		return staffAddList;
	}

	public void setStaffAddList(ArrayList<Staff> staffAddList) {
		this.staffAddList = staffAddList;
	}

	public ArrayList<Staff> getStaffRemoveList() {
		return staffRemoveList;
	}

	public void setStaffRemoveList(ArrayList<Staff> staffRemoveList) {
		this.staffRemoveList = staffRemoveList;
	}

	@Override
	public String toString() {
		return "Staff [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", empNo_origin=" + empNo_origin + ", empNo=" + empNo
				+ ", dutyCode=" + dutyCode + ", positionCode=" + positionCode + ", classCode=" + classCode
				+ ", branchCode=" + branchCode + ", deptCode=" + deptCode + ", imageRoot=" + imageRoot + ", name="
				+ name + ", ename=" + ename + ", gender=" + gender + ", phone1=" + phone1 + ", phone2=" + phone2
				+ ", birth=" + birth + ", offMail=" + offMail + ", mail=" + mail + ", addr1=" + addr1 + ", zipCode="
				+ zipCode + ", startYmd=" + startYmd + ", finYmd=" + finYmd + ", panclubUserId=" + panclubUserId
				+ ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified="
				+ modified + ", staffUpdateList=" + staffUpdateList + ", staffAddList=" + staffAddList
				+ ", staffRemoveList=" + staffRemoveList + "]";
	}


	
	
}
