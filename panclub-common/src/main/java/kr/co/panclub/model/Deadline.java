package kr.co.panclub.model;

import java.util.ArrayList;

public class Deadline {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;


	private String deadIdx;
	private String comCode;
	private String inDead;
	private String outDead;
	private String depositDead;
	private String withdrawDead;
	private String memo;
	
	private ArrayList<Deadline> deadUpdateList;

	private ArrayList<Deadline> deadAddList;
		
	private ArrayList<Deadline> deadRemoveList;

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

	public String getDeadIdx() {
		return deadIdx;
	}

	public void setDeadIdx(String deadIdx) {
		this.deadIdx = deadIdx;
	}

	public String getComCode() {
		return comCode;
	}

	public void setComCode(String comCode) {
		this.comCode = comCode;
	}

	public String getInDead() {
		return inDead;
	}

	public void setInDead(String inDead) {
		this.inDead = inDead;
	}

	public String getOutDead() {
		return outDead;
	}

	public void setOutDead(String outDead) {
		this.outDead = outDead;
	}

	public String getDepositDead() {
		return depositDead;
	}

	public void setDepositDead(String depositDead) {
		this.depositDead = depositDead;
	}

	public String getWithdrawDead() {
		return withdrawDead;
	}

	public void setWithdrawDead(String withdrawDead) {
		this.withdrawDead = withdrawDead;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public ArrayList<Deadline> getDeadUpdateList() {
		return deadUpdateList;
	}

	public void setDeadUpdateList(ArrayList<Deadline> deadUpdateList) {
		this.deadUpdateList = deadUpdateList;
	}

	public ArrayList<Deadline> getDeadAddList() {
		return deadAddList;
	}

	public void setDeadAddList(ArrayList<Deadline> deadAddList) {
		this.deadAddList = deadAddList;
	}

	public ArrayList<Deadline> getDeadRemoveList() {
		return deadRemoveList;
	}

	public void setDeadRemoveList(ArrayList<Deadline> deadRemoveList) {
		this.deadRemoveList = deadRemoveList;
	}

	@Override
	public String toString() {
		return "Deadline [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", deadIdx=" + deadIdx + ", comCode=" + comCode + ", inDead=" + inDead + ", outDead="
				+ outDead + ", depositDead=" + depositDead + ", withdrawDead=" + withdrawDead + ", memo=" + memo
				+ ", deadUpdateList=" + deadUpdateList + ", deadAddList=" + deadAddList + ", deadRemoveList="
				+ deadRemoveList + "]";
	}
	
	
}
