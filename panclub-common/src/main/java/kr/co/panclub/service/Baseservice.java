package kr.co.panclub.service;

import java.io.File;
import java.math.BigDecimal;
 
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.xml.crypto.dsig.keyinfo.KeyInfo;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.panclub.common.ExcelRead;
import kr.co.panclub.common.ExcelReadOption;
import kr.co.panclub.dao.IBaseDao;
import kr.co.panclub.dao.IBizDao;
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

@Service
public class Baseservice implements IBaseService {
	@Autowired
	private HttpSession session;

	@Autowired
	private IBaseDao baseDao;

	@Autowired
	private IBizDao bizDao;

	@Override
	
	public Cust custAdd(HashMap<String, Object> params) {

		return baseDao.custAdd(params);
	}

	@Override
	public List<Cust> custList(HashMap<String, Object> params) {
		

		return baseDao.custList(params);
	}

	@Override
	public Cust custOne(HashMap<String, Object> params) {

		return baseDao.custOne(params);
	}

	@Override
	public List<CustManager> custMgrList(HashMap<String, Object> params) {

		return baseDao.custMgrList(params);
	}

	@Override
	public List<CustAdmin> custAdmList(HashMap<String, Object> params) {

		return baseDao.custAdmList(params);
	}

	@Override
	public CustManager custMgrAdd(HashMap<String, Object> params) {

		return baseDao.custMgrAdd(params);
	}

	@Override
	public CustAdmin custAdmAdd(HashMap<String, Object> params) {

		return baseDao.custAdmAdd(params);
	}

	@Override
	public Code codeAdd(HashMap<String, Object> params) {

		return baseDao.codeAdd(params);
	}

	@Override
	public List<Code> codeList(HashMap<String, Object> params) {

		return baseDao.codeList(params);
	}

	@Override
	public Item itemAdd(HashMap<String, Object> params) {

		return baseDao.itemAdd(params);
	}

	@Override
	public List<Item> itemList(HashMap<String, Object> params) {

		return baseDao.itemList(params);
	}

	@Override
	public Item itemOne(HashMap<String, Object> params) {

		return baseDao.itemOne(params);
	}

	@Override
	public List<Menu> menuList(HashMap<String, Object> params) {

		return baseDao.menuList(params);
	}

	@Transactional
	@Override
	public int menuAdd(HashMap<String, Object> params) {

		String workingType = (String) params.get("workingType");

		if (("ADD").equals(workingType)) {
			
			return baseDao.menuAdd(params);

		} else if (("DEL").equals(workingType)) {
			return baseDao.menuDel(params);

		} else {
			
			return baseDao.menuUpt(params);
		}
	}

	@Override
	public List<Storage> storageList(HashMap<String, Object> params) {
		// params.get(params) 여기부터
		return baseDao.storageList(params);
	}

	@Override//2023.07.14 bk 수정 comCode
	public int storageValCheck(HashMap<String, Object> params) { // 230315 장윤상 유효성검사위해 추가
		//System.out.println("hi");
		//System.out.println("params"+params);
		List<Storage> checkList = baseDao.storageList2(params);
		int result = 0;
		if ((params.get("workingType")).equals("checkAdd")) {
			
			for (int i = 0, len = checkList.size(); i < len; i++) {
				if ((params.get("logComCode")).equals(checkList.get(i).getComCode())
						&& (params.get("storageCode")).equals(checkList.get(i).getStorageCode())) {
					result = -1;
					break;
				} else if ((params.get("logComCode")).equals(checkList.get(i).getComCode())
						&& ((params.get("storageName")).equals(checkList.get(i).getStorageName())
								&& (params.get("storType")).equals(checkList.get(i).getStorType()))) {
					result = -2;
					break;
				}
			}
		} else if ((params.get("workingType")).equals("checkUpt")) {
			
			for (int i = 0, len = checkList.size(); i < len; i++) {
				if (((params.get("logComCode")).equals(checkList.get(i).getComCode())
						&& !(params.get("storageCode")).equals(checkList.get(i).getStorageCode()))
						&& ((params.get("storageName")).equals(checkList.get(i).getStorageName())
								&& (params.get("storType")).equals(checkList.get(i).getStorType()))) {
					result = -2;
					break;
				}
			}
		}
		return result;
	}

	@Override
	public int storageAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
		int result = 0;
		if (("ADD").equals(workingType)) {
			try {
				if ((params.get("errCode")).equals("Err1")) {
					result = -1;
					
				}else if((params.get("errCode")).equals("Err2")) {
					result = -2;			
					
				}else {
					result = baseDao.storageAdd(params);
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return result;

		} else if (("DEL").equals(workingType)) {
			return baseDao.storageDel(params);

		} else {
			
			try {
				if ((params.get("errCode")).equals("Err2")) {
					result = -2;
					
				}else {
					result = baseDao.storageUpt(params);
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			//System.out.println("result"+result);
			return result;
			

		}
	}

	@Override
	public List<Rack> rackList(HashMap<String, Object> params) {
		return baseDao.rackList(params);
	}

	@Override
	public int rackValCheck(HashMap<String, Object> valParams) {
		List<Rack> checkList = baseDao.rackList(valParams);
		int result = 0;
		
		if ((valParams.get("workingType")).equals("checkAdd")) {
			for (int i = 0, len = checkList.size(); i < len; i++) {
				if ((valParams.get("comCode")).equals(checkList.get(i).getComCode())
						&& (valParams.get("rackCode")).equals(checkList.get(i).getRackCode())) {
					result = -1;
					break;
				} else if ((valParams.get("comCode")).equals(checkList.get(i).getComCode())
						&& ((valParams.get("storageName")).equals(checkList.get(i).getStorageCode())
								&& (valParams.get("rackName")).equals(checkList.get(i).getRackName()))) {
					result = -2;
					break;
				} else if ((valParams.get("comCode")).equals(checkList.get(i).getComCode())
						&& (valParams.get("barcode")).equals(checkList.get(i).getBarcode())) {
					result = -3;
					break;
				}
			}

		} else if ((valParams.get("workingType")).equals("checkUpt")) {
		
			for (int i = 0, len = checkList.size(); i < len; i++) {
				if ((valParams.get("comCode")).equals(checkList.get(i).getComCode())
						&& !(valParams.get("rackCode")).equals(checkList.get(i).getRackCode())
						&& ((valParams.get("storageName")).equals(checkList.get(i).getStorageCode())
								&& (valParams.get("rackName")).equals(checkList.get(i).getRackName()))) {
					result = -2;
					break;
				} else if ((valParams.get("comCode")).equals(checkList.get(i).getComCode())
						&& !(valParams.get("rackCode")).equals(checkList.get(i).getRackCode())
						&& (valParams.get("barcode")).equals(checkList.get(i).getBarcode())) {
					result = -3;
					break;
				}
			}
		}

		return result;
	}

	@Transactional
	@Override
	public int rackAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
		
		int result = 0;

		if (("ADD").equals(workingType)) {
			
			try {
				if ((params.get("errCode")).equals("Err1")) {
					result = -1;
					
				}else if((params.get("errCode")).equals("Err2")) {
					result = -2;			
					
				}else if((params.get("errCode")).equals("Err3")) {
					result = -3;
					
				}else {
					result = baseDao.rackAdd(params);
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return result; 
			
		} else if (("DEL").equals(workingType)) {
			
			return baseDao.rackDel(params);

		} else {
			try {
				if ((params.get("errCode")).equals("Err2")) {
					result = -2;
					
				}else if((params.get("errCode")).equals("Err3")) {
					result = -3;
					
				}else {
					
					result = baseDao.rackUpt(params);
					
				}
				
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return result;
		}
	}

	@Override
	public List<Depart> deptList(HashMap<String, Object> params) {
		return baseDao.deptList(params);
	}

	@Override
	public int deptAdd(HashMap<String, Object> params) {
	
		// String o_depart = (String) params.get("comCode");
		// Depart o_depart = (Depart) params.get("depart");
		// String workingType = o_depart.getWorkingType();
		/*
		 * String workingType = params.get("workingType");
		 * 
		 * 
		 * if (("ADD").equals(workingType)) { return baseDao.deptAdd(params); }else
		 * if(("DEL").equals((workingType)) { return baseDao.deptDel(params); }
		 */
		String workingType = (String) params.get("workingType");
		if (("ADD").equals(workingType)) {
			return baseDao.deptAdd(params);
		} else if (("DEL").equals(workingType)) {
			return baseDao.deptDel(params);
		} else {
			return baseDao.deptUpt(params);
		}

		/*
		 * else if(("DEL").equals(workingType)){ return baseDao.deptDel(params); }
		 * 
		 * else if(("UPT").equals(workingType)){ return baseDao.deptUpt(params); }
		 */

	}

	@Override
	public List<InsurDcRate> insurDcList(HashMap<String, Object> params) {
		return baseDao.insurDcList(params);
	}

	@Override
	public CommonResult insurDcAdd(HashMap<String, Object> params) { 
		return baseDao.insurDcAdd(params);
 
	}

	@Override
	public List<Sr> srList(HashMap<String, Object> params) {
		return baseDao.srList(params);
	}

	@Override
	public List<SrCust> srCustList(HashMap<String, Object> params) {
		return baseDao.srCustList(params);

	}

	@Override
	public int srAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
		if (("ADD").equals(workingType)) {
			return baseDao.srAdd(params);
		}
		if (("UPT").equals(workingType)) {
			return baseDao.srUpt(params);
		}
		if (("DEL").equals(workingType)) {
			return baseDao.srDel(params);
		} else {
			return 0;
		}
	}

	@Override
	public int srCustAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
		if (("ADD").equals(workingType)) {
			return baseDao.srCustAdd(params);
		}
		if (("UPT").equals(workingType)) {
			return baseDao.srCustUpt(params);
		}
		if (("DEL").equals(workingType)) {
			return baseDao.srCustDel(params);
		} else {
			return 0;
		}
	}

	@Override
	public List<Deadline> deadlineList(HashMap<String, Object> params) {
		return baseDao.deadlineList(params);
	}

	/*
	 * @Override public Deadline deadlineAdd(HashMap<String, Object> params) {
	 * String workingType = (String) params.get("workingType"); if
	 * (("UPT").equals(workingType)) { return baseDao.deadlineUpt(params); } if
	 * (("ADD").equals(workingType)) { return baseDao.deadlineAdd(params); } else {
	 * return 0; } }
	 */
	
	@Override
	public Deadline deadlineAdd(HashMap<String, Object> params) {
		return baseDao.deadlineAdd(params);
	}

	@Override
	public List<Deposit> depositList(HashMap<String, Object> params) {
		return baseDao.depositList(params);
	}

	@Override
	public int depositAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
		if (("ADD").equals(workingType)) {
			return baseDao.depositAdd(params);
		}
		if (("UPT").equals(workingType)) {
			return baseDao.depositUpt(params);
		}
		if (("DEL").equals(workingType)) {
			return baseDao.depositDel(params);
		} if (("CHK").equals(workingType)) {
			return baseDao.depositAdd(params);
		} 		
		else {
			return 0;
		}
	}

	@Override
	public int depositCdPayAdd(HashMap<String, Object> params) {
		return baseDao.depositCdPayAdd(params);
	}

	@Override
	public int depositDel(HashMap<String, Object> params) {
		Deposit temp = (Deposit) params.get("deposit");
		String accCode = temp.getAccCode();

		Integer result1 = baseDao.depositDel(params);
		Integer result2 = 0;
		if (("N").equals(accCode) && result1 == 1) {
			result2 = baseDao.depositUpt1(params);

			if (result2 >= 1) {
				return result2;
			} else {
				return -2;
			}
		} else {
			return result1;
		}

	}

	@Override
	public List<Withdraw> withdrawList(HashMap<String, Object> i_param) {
		return baseDao.withdrawList(i_param);
	}

	@Override
	public int withdrawAdd(HashMap<String, Object> params) {
		String workingType = (String) params.get("workingType");
		
		if (("ADD").equals(workingType)) {
			return baseDao.withdrawAdd(params);
		}
		else if (("UPT").equals(workingType)) {
			return baseDao.withdrawUpt(params);
		}else if (("CHK").equals(workingType)) {
			return baseDao.withdrawChk(params);
		} else {
			return 0;
		}
		
	}

	@Override
	public List<AccountHistory> accHisList(HashMap<String, Object> i_param) {
		return baseDao.accHisList(i_param);
	}

	@Override
	public List<AccountHistory> accHisList2(HashMap<String, Object> i_param) {
		return baseDao.accHisList2(i_param);
	}

	@Override
	public int withdrawDel(HashMap<String, Object> params) {
		return baseDao.withdrawDel(params);
	}

	@Override
	public List<TaxBill> taxBillList(HashMap<String, Object> i_param) {
		return baseDao.taxBillList(i_param);
	}

	@Override
	public TaxBill taxBillAdd(HashMap<String, Object> params) {
		return baseDao.taxBillAdd(params);
	}

	@Override
	public int taxBillFind(HashMap<String, Object> params) {
		return baseDao.taxBillFind(params);
	}

	@Override
	public int taxBillReset(HashMap<String, Object> params) {
		return baseDao.taxBillReset(params);
	}

	@Override
	public List<KeyInfo> taxKeyLsit(HashMap<String, Object> i_param) {
		return baseDao.taxKeyLsit(i_param);
	}

	@Override
	public List<Notice> noticeList(HashMap<String, Object> params) {
		return baseDao.noticeList(params);
	}

	@Override
	public Notice noticeAdd(HashMap<String, Object> params) {
		return baseDao.noticeAdd(params);
	}

	@Override
	public List<ExchangeRate> exRateList(HashMap<String, Object> i_param) {
		// TODO Auto-generated method stub

		return baseDao.exRateList(i_param);
	}

	/*
	 * 23.03.07 장윤상 부품 센터가 엑셀 업로드
	 */
	@Override
	public HashMap<String, Object> itemAddExcel(ItemExcel itemExcel, File destFile) {

		ExcelReadOption excelReadOption = new ExcelReadOption();
		excelReadOption.setFilePath(destFile.getAbsolutePath());

		String article_itemNo = "";
		String article_itemName = "";
		BigDecimal article_centerPrice = new BigDecimal("0.00");
		String article_makerCode = "";
		String article_classCode = "";

		String articleA = itemExcel.getXls_itemNo();
		String articleB = itemExcel.getXls_itemName();
		String articleC = itemExcel.getXls_centerPrice();
		String articleD = itemExcel.getXls_makerCode();
		String articleE = itemExcel.getXls_classCode();
		int sRow = itemExcel.getXls_sRow();

		excelReadOption.setOutputColumns("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
				"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");

		excelReadOption.setStartRow(sRow);
		
		//IOUtils.setByteArrayMaxOverride(200000000);
		
		List<Map<String, String>> excelContent = ExcelRead.read(excelReadOption);
		int rowNum = excelContent.size();

		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();

		List<Item> itemList = new ArrayList<Item>();
		int count = 0;

		String logComCode = (String) session.getAttribute("comCode");
		String logUserId = (String) session.getAttribute("userId");
		int newSessionTime = 86400;
		session.setMaxInactiveInterval(newSessionTime);
		
		for (Map<String, String> article : excelContent) {
			Item item = new Item();

			if (("").equals(article.get(articleA)) || article.get(articleA) == null) {
				rowNum = rowNum - 1;
				//System.out.println("rowNo:"+rowNum);
				continue;
			} else {
				article_itemNo = article.get(articleA);
			}
			item.setItemNo(article_itemNo);// 품번
			
			if (("").equals(article.get(articleB)) || article.get(articleB) == null) {
				article_itemName = "";
			} else {
				article_itemName = article.get(articleB);
			}
			item.setItemName(article_itemName);// 부품명

			if (("").equals(article.get(articleC)) || article.get(articleC) == null) {
				article_centerPrice = BigDecimal.valueOf(0.01);
			} else if (NumberUtils.isParsable(article.get(articleC))) {
				article_centerPrice = new BigDecimal(String.format("%.0f", Double.parseDouble(article.get(articleC))));
			} else {
				break; // exit the loop
			}
			item.setCenterPrice(article_centerPrice); // 센터가
			item.setSalePrice(article_centerPrice); // 230721 yoonsang 판매가추가저장 

			if (("").equals(article.get(articleD)) || article.get(articleD) == null) {
				article_makerCode = "";
			} else {
				article_makerCode = article.get(articleD);
			}
			item.setMakerCode(article_makerCode); // 제조사

			if (("").equals(article.get(articleE)) || article.get(articleE) == null) {
				article_classCode = "";
			} else {
				article_classCode = article.get(articleE);
			}
			item.setClassCode(article_classCode); // 클래스

			params.put("workingType", "EXCEL_UPT");
			params.put("comCode", logComCode);
			params.put("userId", logUserId);
			params.put("item", item);

			Item o_item = new Item();

			o_item = baseDao.itemAdd(params);
			//itemList.add(o_item);

			if (("OK").equals(o_item.getDb_resultCode())) {
				count++;
			} else {
				break;
			}

		}
		

		if (rowNum == count) {
			map.put("result_code", "OK");
			map.put("result_msg", "성공");
		} else {
			map.put("result_code", "ERR");
			map.put("result_msg", count + 1 + "번째 행에서 실패하였습니다.");
		}

		return map;

	}

	@Override
	public Config configOne(HashMap<String, Object> params) {
		
		return baseDao.configOne(params);
	}

	@Override
	public Config configAdd(HashMap<String, Object> params) {
		
		return baseDao.configAdd(params);
	}

	@Override
	public List<StockShare> stockShareList(HashMap<String, Object> params) {
		
		return baseDao.stockShareList(params);
	}
	
	@Override
	public ItemOe itemOeAdd(HashMap<String, Object> params) {
		return baseDao.itemOeAdd(params);
	}

	@Override
	public List<ItemOe> itemOeList(HashMap<String, Object> i_params) {
		return baseDao.itemOeList(i_params);
	}

	@Override
	public ItemMemo itemMemoAdd(HashMap<String, Object> params) {
		return baseDao.itemMemoAdd(params);
	}

	@Override
	public List<ItemMemo> itemMemoList(HashMap<String, Object> i_param) {
		return baseDao.itemMemoList(i_param);
	}

	@Override
	public Rack rackReg(HashMap<String, Object> params) {
		
		return baseDao.rackReg(params);
	}
	
	@Override // 20240228 supi 기초코드중 수령물류센터 목록 받아오는 통신
	public List<LogisCode> logisCodeList(HashMap<String, Object> i_param) {
		
		return baseDao.logisCodeList(i_param);
	}	
	@Override //20240711 supi 팝업등록
	public String popupReg(HashMap<String, Object> i_param) {
		
		return baseDao.popupReg(i_param);
	}	
	@Override //20240712 supi 팝업조회
	public List<HashMap<String, Object>> popupList(HashMap<String, Object> i_param) {
	
		return  baseDao.popupList(i_param);
	}	

	@Override // 20240911 supi 권한조회
	public List<Permission> permissionList(HashMap<String, Object> params)
	{
		return baseDao.permissionList(params);
	}
	
	@Override // 20240911 supi 권한 cud 
	public CommonResult permissionAdd(HashMap<String, Object> params)
	{
		return baseDao.permissionAdd(params);
	}
	@Override
	public List<PermissionTemplate> permissionTemplateList(HashMap<String, Object> params)
	{
		return baseDao.permissionTemplateList(params);
	}
	@Override
	public List<Permission> permissionTemplateDetail(HashMap<String, Object> params)
	{
		return baseDao.permissionTemplateDetail(params);
	}
	
	@Override  
	public CommonResult permissionTemplateAdd(HashMap<String, Object> params)
	{
		return baseDao.permissionTemplateAdd(params);
	}
	@Override 
	public List<C_cust> permissionCustList(HashMap<String, Object> params)
	{
		return baseDao.permissionCustList(params);
	}
	@Override 
	public List<C_cust> getParentComInfo(HashMap<String, Object> params)
	{
		return baseDao.getParentComInfo(params);
	}
	@Override 

	public List<C_cust> getChildComInfoList(HashMap<String, Object> params)
	{
		return baseDao.getChildComInfoList(params);
	}
	 
	@Override
	public List<Permission> permissionCustDetail(HashMap<String, Object> params)
	{
		return baseDao.permissionCustDetail(params);
	}
	@Override
	public CommonResult permissionCustAdd(HashMap<String, Object> params)
	{
		return baseDao.permissionCustAdd(params);
	}
	@Override
	public List<User> permissionUserList(HashMap<String, Object> params)
	{
		return baseDao.permissionUserList(params);
	}
	@Override
	public List<Permission> permissionUserDetail(HashMap<String, Object> params)
	{
		return baseDao.permissionUserDetail(params);
	}
	@Override
	public CommonResult permissionUserAdd(HashMap<String, Object> params)
	{
		return baseDao.permissionUserAdd(params);
	} 
	@Override 
	public boolean isErpOperate(HashMap<String, Object> params)
	{
		return baseDao.isErpOperate(params);
	}
	@Override 
	public List<Permission> menuViewList(HashMap<String, Object> params)
	{
		return baseDao.menuViewList(params);
	}
	@Override 
	public Date getPermissionModified(HashMap<String, Object> params)
	{
		return baseDao.getPermissionModified(params);
	}
	@Override 
	public List<String> hiddenMenuCodeList()
	{
		return baseDao.hiddenMenuCodeList();
	}
	@Override 
	public List<menuStructure> menuStructureList()
	{
		return baseDao.menuStructureList();
	}
	@Override 
	public CommonResult menuStructureAdd(HashMap<String, Object> params)
	{
		return baseDao.menuStructureAdd(params);
	} 
	@Override
	public void bugReport(HashMap<String, Object> params)
	{
		baseDao.bugReport(params);
	}
}
