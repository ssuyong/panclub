package kr.co.panclub.model;

import java.util.ArrayList;

public class Code {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String rowID;
	private String comCode;
	private String mCode;  // char(4) not null,  --마스터코드
	private String mCodeName;  //  varchar(50) not null,  --마스터코드명
	private int codeIdx;
	private String code;  //  varchar(20) not null,  --서브코드
	private String codeName;  //  varchar(50) not null, -- 서브코드명
	private int mCodeOrderBy;  //  smallint not null, --마스터코드정렬순서
	private int codeOrderBy;  //  smallint not null, --코드정렬순서
	private String value1;  //  varchar(50),--구분1
	private String value2;  //  varchar(50),--구분2
	private String value3;  //  varchar(50),--구분3
	private String validYN;  //  varchar(1)  not null-- 사용여부
	
	
	// 추가 행 리스트
	private ArrayList<Code> codeAdd;
	// 수정 행 리스트
	private ArrayList<Code> codeUpdate;
	// 삭제 행 리스트
	private ArrayList<Code> codeRemove;
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
	public String getRowID() {
		return rowID;
	}
	public void setRowID(String rowID) {
		this.rowID = rowID;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getmCode() {
		return mCode;
	}
	public void setmCode(String mCode) {
		this.mCode = mCode;
	}
	public String getmCodeName() {
		return mCodeName;
	}
	public void setmCodeName(String mCodeName) {
		this.mCodeName = mCodeName;
	}
	public int getCodeIdx() {
		return codeIdx;
	}
	public void setCodeIdx(int codeIdx) {
		this.codeIdx = codeIdx;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public int getmCodeOrderBy() {
		return mCodeOrderBy;
	}
	public void setmCodeOrderBy(int mCodeOrderBy) {
		this.mCodeOrderBy = mCodeOrderBy;
	}
	public int getCodeOrderBy() {
		return codeOrderBy;
	}
	public void setCodeOrderBy(int codeOrderBy) {
		this.codeOrderBy = codeOrderBy;
	}
	public String getValue1() {
		return value1;
	}
	public void setValue1(String value1) {
		this.value1 = value1;
	}
	public String getValue2() {
		return value2;
	}
	public void setValue2(String value2) {
		this.value2 = value2;
	}
	public String getValue3() {
		return value3;
	}
	public void setValue3(String value3) {
		this.value3 = value3;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public ArrayList<Code> getCodeAdd() {
		return codeAdd;
	}
	public void setCodeAdd(ArrayList<Code> codeAdd) {
		this.codeAdd = codeAdd;
	}
	public ArrayList<Code> getCodeUpdate() {
		return codeUpdate;
	}
	public void setCodeUpdate(ArrayList<Code> codeUpdate) {
		this.codeUpdate = codeUpdate;
	}
	public ArrayList<Code> getCodeRemove() {
		return codeRemove;
	}
	public void setCodeRemove(ArrayList<Code> codeRemove) {
		this.codeRemove = codeRemove;
	}
	@Override
	public String toString() {
		return "Code [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", rowID=" + rowID + ", comCode=" + comCode + ", mCode=" + mCode + ", mCodeName="
				+ mCodeName + ", codeIdx=" + codeIdx + ", code=" + code + ", codeName=" + codeName + ", mCodeOrderBy="
				+ mCodeOrderBy + ", codeOrderBy=" + codeOrderBy + ", value1=" + value1 + ", value2=" + value2
				+ ", value3=" + value3 + ", validYN=" + validYN + ", codeAdd=" + codeAdd + ", codeUpdate=" + codeUpdate
				+ ", codeRemove=" + codeRemove + "]";
	}

	
	
	

	
	
	
}
