package kr.co.panclub.model;

import java.util.ArrayList;

public class CustManagerSet {
	// 수정 행 리스트
	private ArrayList<CustManager> update;
	
	// 추가 행 리스트
	private ArrayList<CustManager> add;
	
	// 삭제 행 리스트
	private ArrayList<CustManager> remove;

	public ArrayList<CustManager> getUpdate() {
		return update;
	}

	public void setUpdate(ArrayList<CustManager> update) {
		this.update = update;
	}

	public ArrayList<CustManager> getAdd() {
		return add;
	}

	public void setAdd(ArrayList<CustManager> add) {
		this.add = add;
	}

	public ArrayList<CustManager> getRemove() {
		return remove;
	}

	public void setRemove(ArrayList<CustManager> remove) {
		this.remove = remove;
	}





}
