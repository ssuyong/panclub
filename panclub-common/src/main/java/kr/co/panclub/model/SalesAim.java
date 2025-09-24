package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class SalesAim {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;           // varchar(50) not null,
	private String stdYYYY;           //  varchar(7) not null,   --기준년도
	private int admType;           //  tinyint not null,
	private String admCode;           //  varchar(20) not null, --부서/지점/부서원 코드
	private String admName; 
	private int m1;           //  int not null, --1월
	private int m2;           //  int not null, --2월
	private int m3;           //  int not null, --3월
	private int m4;           //  int not null, --4월
	private int m5;           //  int not null, --5월
	private int m6;           //  int not null, --6월
	private int m7;           //  int not null, --7월
	private int m8;           //  int not null, --8월
	private int m9;           //  int not null, --9월
	private int m10;           //  int not null, --10월
	private int m11;           //  int not null, --11월
	private int m12;           //  int not null, --12월
	private int sumAim;           //  as m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8 + m9 + m10 + m11 + m12   --합계
	private String regUserId;
	private String uptUserId;
	private Date created;
	private Date modified;
	
	// 추가 행 리스트
	private ArrayList<SalesAim> salesAimAdd;
	// 수정 행 리스트
	private ArrayList<SalesAim> salesAimUpdate;
	// 삭제 행 리스트
	private ArrayList<SalesAim> salesAimRemove;
	
	
	
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
	public String getStdYYYY() {
		return stdYYYY;
	}
	public void setStdYYYY(String stdYYYY) {
		this.stdYYYY = stdYYYY;
	}
	public int getAdmType() {
		return admType;
	}
	public void setAdmType(int admType) {
		this.admType = admType;
	}
	public String getAdmCode() {
		return admCode;
	}
	public void setAdmCode(String admCode) {
		this.admCode = admCode;
	}
	public String getAdmName() {
		return admName;
	}
	public void setAdmName(String admName) {
		this.admName = admName;
	}
	public int getM1() {
		return m1;
	}
	public void setM1(int m1) {
		this.m1 = m1;
	}
	public int getM2() {
		return m2;
	}
	public void setM2(int m2) {
		this.m2 = m2;
	}
	public int getM3() {
		return m3;
	}
	public void setM3(int m3) {
		this.m3 = m3;
	}
	public int getM4() {
		return m4;
	}
	public void setM4(int m4) {
		this.m4 = m4;
	}
	public int getM5() {
		return m5;
	}
	public void setM5(int m5) {
		this.m5 = m5;
	}
	public int getM6() {
		return m6;
	}
	public void setM6(int m6) {
		this.m6 = m6;
	}
	public int getM7() {
		return m7;
	}
	public void setM7(int m7) {
		this.m7 = m7;
	}
	public int getM8() {
		return m8;
	}
	public void setM8(int m8) {
		this.m8 = m8;
	}
	public int getM9() {
		return m9;
	}
	public void setM9(int m9) {
		this.m9 = m9;
	}
	public int getM10() {
		return m10;
	}
	public void setM10(int m10) {
		this.m10 = m10;
	}
	public int getM11() {
		return m11;
	}
	public void setM11(int m11) {
		this.m11 = m11;
	}
	public int getM12() {
		return m12;
	}
	public void setM12(int m12) {
		this.m12 = m12;
	}
	public int getSumAim() {
		return sumAim;
	}
	public void setSumAim(int sumAim) {
		this.sumAim = sumAim;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public ArrayList<SalesAim> getSalesAimAdd() {
		return salesAimAdd;
	}
	public void setSalesAimAdd(ArrayList<SalesAim> salesAimAdd) {
		this.salesAimAdd = salesAimAdd;
	}
	public ArrayList<SalesAim> getSalesAimUpdate() {
		return salesAimUpdate;
	}
	public void setSalesAimUpdate(ArrayList<SalesAim> salesAimUpdate) {
		this.salesAimUpdate = salesAimUpdate;
	}
	public ArrayList<SalesAim> getSalesAimRemove() {
		return salesAimRemove;
	}
	public void setSalesAimRemove(ArrayList<SalesAim> salesAimRemove) {
		this.salesAimRemove = salesAimRemove;
	}
	@Override
	public String toString() {
		return "SalesAim [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", stdYYYY=" + stdYYYY + ", admType=" + admType + ", admCode="
				+ admCode + ", admName=" + admName + ", m1=" + m1 + ", m2=" + m2 + ", m3=" + m3 + ", m4=" + m4 + ", m5="
				+ m5 + ", m6=" + m6 + ", m7=" + m7 + ", m8=" + m8 + ", m9=" + m9 + ", m10=" + m10 + ", m11=" + m11
				+ ", m12=" + m12 + ", sumAim=" + sumAim + ", regUserId=" + regUserId + ", uptUserId=" + uptUserId
				+ ", created=" + created + ", modified=" + modified + ", salesAimAdd=" + salesAimAdd
				+ ", salesAimUpdate=" + salesAimUpdate + ", salesAimRemove=" + salesAimRemove + "]";
	}
	
	
	

	

	
	
}
