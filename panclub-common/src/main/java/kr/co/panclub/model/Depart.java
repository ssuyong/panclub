package kr.co.panclub.model;

import java.util.ArrayList;

public class Depart {
	private String db_resultCode;
	private String db_resultMsg;
	private String workingType;
	
	private String comCode;
	private String dept1Code_origin;
	private String dept1Code; 
	private String dept1Name; 
	
	private String dept2Code_origin;
	private String dept2Code; 
	private String dept2Name; 
	
	private String dept3Code_origin;
	private String dept3Code; 
	private String dept3Name;
	
	private ArrayList<Depart> deptAdd;
	// 수정 행 리스트
	private ArrayList<Depart> deptUpdate;
	// 삭제 행 리스트
	private ArrayList<Depart> deptRemove;
	
	private ArrayList<Depart> dept1Add;
	// 수정 행 리스트
	private ArrayList<Depart> dept1Update;
	// 삭제 행 리스트
	private ArrayList<Depart> dept1Remove;
	
	private ArrayList<Depart> dept2Add;
	// 수정 행 리스트
	private ArrayList<Depart> dept2Update;
	// 삭제 행 리스트
	private ArrayList<Depart> dept2Remove;
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
	public String getWorkingType() {
		return workingType;
	}
	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getDept1Code_origin() {
		return dept1Code_origin;
	}
	public void setDept1Code_origin(String dept1Code_origin) {
		this.dept1Code_origin = dept1Code_origin;
	}
	public String getDept1Code() {
		return dept1Code;
	}
	public void setDept1Code(String dept1Code) {
		this.dept1Code = dept1Code;
	}
	public String getDept1Name() {
		return dept1Name;
	}
	public void setDept1Name(String dept1Name) {
		this.dept1Name = dept1Name;
	}
	public String getDept2Code_origin() {
		return dept2Code_origin;
	}
	public void setDept2Code_origin(String dept2Code_origin) {
		this.dept2Code_origin = dept2Code_origin;
	}
	public String getDept2Code() {
		return dept2Code;
	}
	public void setDept2Code(String dept2Code) {
		this.dept2Code = dept2Code;
	}
	public String getDept2Name() {
		return dept2Name;
	}
	public void setDept2Name(String dept2Name) {
		this.dept2Name = dept2Name;
	}
	public String getDept3Code_origin() {
		return dept3Code_origin;
	}
	public void setDept3Code_origin(String dept3Code_origin) {
		this.dept3Code_origin = dept3Code_origin;
	}
	public String getDept3Code() {
		return dept3Code;
	}
	public void setDept3Code(String dept3Code) {
		this.dept3Code = dept3Code;
	}
	public String getDept3Name() {
		return dept3Name;
	}
	public void setDept3Name(String dept3Name) {
		this.dept3Name = dept3Name;
	}
	public ArrayList<Depart> getDeptAdd() {
		return deptAdd;
	}
	public void setDeptAdd(ArrayList<Depart> deptAdd) {
		this.deptAdd = deptAdd;
	}
	public ArrayList<Depart> getDeptUpdate() {
		return deptUpdate;
	}
	public void setDeptUpdate(ArrayList<Depart> deptUpdate) {
		this.deptUpdate = deptUpdate;
	}
	public ArrayList<Depart> getDeptRemove() {
		return deptRemove;
	}
	public void setDeptRemove(ArrayList<Depart> deptRemove) {
		this.deptRemove = deptRemove;
	}
	public ArrayList<Depart> getDept1Add() {
		return dept1Add;
	}
	public void setDept1Add(ArrayList<Depart> dept1Add) {
		this.dept1Add = dept1Add;
	}
	public ArrayList<Depart> getDept1Update() {
		return dept1Update;
	}
	public void setDept1Update(ArrayList<Depart> dept1Update) {
		this.dept1Update = dept1Update;
	}
	public ArrayList<Depart> getDept1Remove() {
		return dept1Remove;
	}
	public void setDept1Remove(ArrayList<Depart> dept1Remove) {
		this.dept1Remove = dept1Remove;
	}
	public ArrayList<Depart> getDept2Add() {
		return dept2Add;
	}
	public void setDept2Add(ArrayList<Depart> dept2Add) {
		this.dept2Add = dept2Add;
	}
	public ArrayList<Depart> getDept2Update() {
		return dept2Update;
	}
	public void setDept2Update(ArrayList<Depart> dept2Update) {
		this.dept2Update = dept2Update;
	}
	public ArrayList<Depart> getDept2Remove() {
		return dept2Remove;
	}
	public void setDept2Remove(ArrayList<Depart> dept2Remove) {
		this.dept2Remove = dept2Remove;
	}
	@Override
	public String toString() {
		return "Depart [db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg + ", workingType="
				+ workingType + ", comCode=" + comCode + ", dept1Code_origin=" + dept1Code_origin + ", dept1Code="
				+ dept1Code + ", dept1Name=" + dept1Name + ", dept2Code_origin=" + dept2Code_origin + ", dept2Code="
				+ dept2Code + ", dept2Name=" + dept2Name + ", dept3Code_origin=" + dept3Code_origin + ", dept3Code="
				+ dept3Code + ", dept3Name=" + dept3Name + ", deptAdd=" + deptAdd + ", deptUpdate=" + deptUpdate
				+ ", deptRemove=" + deptRemove + ", dept1Add=" + dept1Add + ", dept1Update=" + dept1Update
				+ ", dept1Remove=" + dept1Remove + ", dept2Add=" + dept2Add + ", dept2Update=" + dept2Update
				+ ", dept2Remove=" + dept2Remove + "]";
	}
	
	

    
}
