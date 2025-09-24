package kr.co.panclub.model;

public class ForCarNotification {
	private int idx;
	private String title;
	private String contents;
	private String linkUrl;
	
	
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
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
	public String getLinkUrl() {
		return linkUrl;
	}
	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
	@Override
	public String toString() {
		return "ForCarNotification [idx=" + idx + ", title=" + title + ", contents=" + contents + ", linkUrl=" + linkUrl
				+ "]";
	}
	
}
