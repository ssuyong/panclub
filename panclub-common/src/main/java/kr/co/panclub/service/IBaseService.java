package kr.co.panclub.service;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.xml.crypto.dsig.keyinfo.KeyInfo;

import kr.co.panclub.model.AccountHistory;
import kr.co.panclub.model.C_cust;
import kr.co.panclub.model.Code;
import kr.co.panclub.model.CommonResult;
import kr.co.panclub.model.Config;
import kr.co.panclub.model.Cust;
import kr.co.panclub.model.CustAdmin;
import kr.co.panclub.model.CustManager;
import kr.co.panclub.model.Deadline;
import kr.co.panclub.model.Depart;
import kr.co.panclub.model.Deposit;
import kr.co.panclub.model.ExchangeRate;
import kr.co.panclub.model.InsurDcRate;
import kr.co.panclub.model.Item;
import kr.co.panclub.model.ItemExcel;
import kr.co.panclub.model.ItemMemo;
import kr.co.panclub.model.ItemOe;
import kr.co.panclub.model.LogisCode;
import kr.co.panclub.model.Menu;
import kr.co.panclub.model.Notice;
import kr.co.panclub.model.Rack;
import kr.co.panclub.model.Sr;
import kr.co.panclub.model.SrCust;
import kr.co.panclub.model.StockShare;
import kr.co.panclub.model.Storage;
import kr.co.panclub.model.TaxBill;
import kr.co.panclub.model.User;
import kr.co.panclub.model.Withdraw;
import kr.co.panclub.model.menuStructure;
import kr.co.panclub.model.Permission;
import kr.co.panclub.model.PermissionTemplate;



public interface IBaseService {
	public Code codeAdd(HashMap<String, Object> params);   // 코드 등록
	public List<Code> codeList(HashMap<String, Object> params);       //코드 리스팅
	
	public Cust custAdd(HashMap<String, Object> params);   // 거래처 등록
	public List<Cust> custList(HashMap<String, Object> params);       //거래처 리스팅
	public Cust custOne(HashMap<String, Object> params);     //거래처 1개 조회
	public List<CustManager> custMgrList(HashMap<String, Object> params);       //거래처 담당자 리스팅
	public List<CustAdmin> custAdmList(HashMap<String, Object> params);       //거래처 관리자 리스팅
	public CustManager custMgrAdd(HashMap<String, Object> params);            //거래처담당자 등록
	public CustAdmin custAdmAdd(HashMap<String, Object> params);            //거래처관리자 등록
	
	public Item itemAdd(HashMap<String, Object> params);   // 상품 등록
	public List<Item> itemList(HashMap<String, Object> params);       //상품 리스팅   
	public Item itemOne(HashMap<String, Object> params);     //상품 1개 조회
	
	public List<Menu> menuList(HashMap<String, Object> params);       // 메뉴목록 리스팅 정동근 추가
	public int menuAdd(HashMap<String, Object> params);				//메뉴추가 정동근 추가
	
	public List<Storage> storageList(HashMap<String, Object> params);       // 창고 리스팅 정동근 추가
	public int storageAdd(HashMap<String, Object> params);				//창고추가 정동근 추가
	
	public List<Rack> rackList(HashMap<String, Object> params);       // 랙 리스팅 정동근 추가
	public int rackAdd(HashMap<String, Object> params);				//랙추가 정동근 추가
	//rackAdd를 아래로 변경 아래에 하나로 처리. 2023.11.24 hsg
	public Rack rackReg(HashMap<String, Object> params);   // 랙 등록
	
	
	public List<Depart> deptList(HashMap<String, Object> params);       //부서리스팅  
	public int deptAdd(HashMap<String, Object> params);
	
	public List<InsurDcRate> insurDcList(HashMap<String, Object> params);
	public CommonResult insurDcAdd(HashMap<String, Object> params);
	
	public List<Sr> srList(HashMap<String, Object> params);
	public List<SrCust> srCustList(HashMap<String, Object> params);
	public int srAdd(HashMap<String, Object> params);
	public int srCustAdd(HashMap<String, Object> params);
	
	public List<Deadline> deadlineList(HashMap<String, Object> params);
	public Deadline deadlineAdd(HashMap<String, Object> params);
	
	public List<Deposit> depositList(HashMap<String, Object> params);
	public int depositAdd(HashMap<String, Object> params);
	
	public int depositCdPayAdd(HashMap<String, Object> params);
	public int depositDel(HashMap<String, Object> params);
	public List<Withdraw> withdrawList(HashMap<String, Object> i_param);
	public int withdrawAdd(HashMap<String, Object> params);
	public List<AccountHistory> accHisList(HashMap<String, Object> i_param);
	public List<AccountHistory> accHisList2(HashMap<String, Object> i_param);
	public int withdrawDel(HashMap<String, Object> params);
	public List<TaxBill> taxBillList(HashMap<String, Object> i_param);
	public TaxBill taxBillAdd(HashMap<String, Object> params);
	public int taxBillFind(HashMap<String, Object> params);
	public int taxBillReset(HashMap<String, Object> params);
	public List<KeyInfo> taxKeyLsit(HashMap<String, Object> i_param);
	
	public List<Notice> noticeList(HashMap<String, Object> i_param);	
	public Notice noticeAdd(HashMap<String, Object> params); //공지사항 등록 김보경 추가
	public List<ExchangeRate> exRateList(HashMap<String, Object> i_param); //환율 조회 김보경 추가
	public HashMap<String, Object> itemAddExcel(ItemExcel itemExcel, File destFile);

	public int storageValCheck(HashMap<String, Object> params); 
	public int rackValCheck(HashMap<String, Object> valParams);
	
	public Config configOne(HashMap<String, Object> params);     // 환경설정 2023.04.27 hsg
	public Config configAdd(HashMap<String, Object> params);
	
	public List<StockShare> stockShareList(HashMap<String, Object> params);       //공유재고 2023.06.08 hsg
	
	public ItemOe itemOeAdd(HashMap<String, Object> params); // 아이템 정품번호 20230620 bk
	public List<ItemOe> itemOeList(HashMap<String, Object> i_params); //아이템 정품품번 조회 bk
	
	public ItemMemo itemMemoAdd(HashMap<String, Object> params);//부품메모등록 2023.06.23 bk
	public List<ItemMemo> itemMemoList(HashMap<String, Object> i_param); //부품메모리스트 2023.06.23 bk
	
	public List<LogisCode> logisCodeList(HashMap<String, Object> i_param); //기초코드중 수령물류센터 코드 받아오는 통신 20240228 sup
	
	public String popupReg(HashMap<String, Object> i_param); //20240711 supi 팝업등록
	
	public List<HashMap<String, Object>> popupList(HashMap<String, Object> i_param); //20240712 supi 팝업조회
	
	public List<Permission> permissionList(HashMap<String, Object> params); // 20240911 supi 권한조회
	public CommonResult permissionAdd(HashMap<String, Object> params); // 20240911 supi 권한 cud
	public List<PermissionTemplate> permissionTemplateList(HashMap<String, Object> params);
	public List<Permission> permissionTemplateDetail(HashMap<String, Object> params); 
	public CommonResult permissionTemplateAdd(HashMap<String, Object> params); 
	public List<C_cust> permissionCustList(HashMap<String, Object> params); 
	public List<C_cust> getParentComInfo(HashMap<String, Object> params); 
	public List<C_cust> getChildComInfoList(HashMap<String, Object> params);  
	public List<Permission> permissionCustDetail(HashMap<String, Object> params); 
	public CommonResult permissionCustAdd(HashMap<String, Object> params); 
	public List<User> permissionUserList(HashMap<String, Object> params);  
	public List<Permission> permissionUserDetail(HashMap<String, Object> params); 
	public CommonResult permissionUserAdd(HashMap<String, Object> params);   
	public boolean isErpOperate(HashMap<String, Object> params);
	public List<Permission> menuViewList(HashMap<String, Object> params);
	public Date getPermissionModified(HashMap<String, Object> params);
	public List<String> hiddenMenuCodeList();
	public List<menuStructure> menuStructureList();
	public CommonResult menuStructureAdd(HashMap<String, Object> params); 
	public void bugReport(HashMap<String, Object> params);
}
