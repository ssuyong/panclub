package kr.co.panclub.model;

public class TaxContact {
	private String name;
	private String email;
	private String cell;
	private String phone;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCell() {
		return cell;
	}
	public void setCell(String cell) {
		this.cell = cell;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Override
	public String toString() {
		return "TaxContact [name=" + name + ", email=" + email + ", cell=" + cell + ", phone=" + phone + "]";
	}
	
	
	
}
