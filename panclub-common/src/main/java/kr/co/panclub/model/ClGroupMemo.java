package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class ClGroupMemo {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;      //  --회사코드
	private String clGroupId;      //  --청구그룹번호
	private String memo;      //  --메모
	private String regUserId;      //  --등록아이디
	private String regYmd;      //  --등록일자
	private String regHms;      //  --등록시간
	private String uptUserId;      //  --수정자
	private String uptYmd;      //  --수정일자
	private String uptHms;      //  --수정시간 
	private long idx;      //  
	
	private String dataComCode;   //데이터체크용 . 2023.07.21 hsg
	
	// 추가 행 리스트
	private ArrayList<ClGroupMemo> clMemoAdd;
	// 수정 행 리스트
	private ArrayList<ClGroupMemo> clMemoUpdate;
	// 삭제 행 리스트
	private ArrayList<ClGroupMemo> clMemoRemove;
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
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
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
	public long getIdx() {
		return idx;
	}
	public void setIdx(long idx) {
		this.idx = idx;
	}
	public String getDataComCode() {
		return dataComCode;
	}
	public void setDataComCode(String dataComCode) {
		this.dataComCode = dataComCode;
	}
	public ArrayList<ClGroupMemo> getClMemoAdd() {
		return clMemoAdd;
	}
	public void setClMemoAdd(ArrayList<ClGroupMemo> clMemoAdd) {
		this.clMemoAdd = clMemoAdd;
	}
	public ArrayList<ClGroupMemo> getClMemoUpdate() {
		return clMemoUpdate;
	}
	public void setClMemoUpdate(ArrayList<ClGroupMemo> clMemoUpdate) {
		this.clMemoUpdate = clMemoUpdate;
	}
	public ArrayList<ClGroupMemo> getClMemoRemove() {
		return clMemoRemove;
	}
	public void setClMemoRemove(ArrayList<ClGroupMemo> clMemoRemove) {
		this.clMemoRemove = clMemoRemove;
	}
	@Override
	public String toString() {
		return "ClGroupMemo [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", clGroupId=" + clGroupId + ", memo=" + memo + ", regUserId="
				+ regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd="
				+ uptYmd + ", uptHms=" + uptHms + ", idx=" + idx + ", dataComCode=" + dataComCode + ", clMemoAdd="
				+ clMemoAdd + ", clMemoUpdate=" + clMemoUpdate + ", clMemoRemove=" + clMemoRemove + "]";
	}
	

	
	
	
	
}
