package kr.co.panclub.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.LogisRack;
import kr.co.panclub.model.Ri;
import kr.co.panclub.model.RiItem;
import kr.co.panclub.model.RiReq;
import kr.co.panclub.model.RiReqItem;
import kr.co.panclub.model.Rl;
import kr.co.panclub.model.RlItem;
import kr.co.panclub.model.RlReq;
import kr.co.panclub.model.RlReqItem;
import kr.co.panclub.model.Ro;
import kr.co.panclub.model.RoItem;
import kr.co.panclub.model.RoReq;
import kr.co.panclub.model.RoReqItem;
import kr.co.panclub.model.SaleItemQty;
import kr.co.panclub.model.Stock;
import kr.co.panclub.model.StockActions;
import kr.co.panclub.model.StockChk;
import kr.co.panclub.model.StockItem;
import kr.co.panclub.model.StockItemOuterNonDsp;
import kr.co.panclub.model.StockRack;
import kr.co.panclub.model.StockWr;
import kr.co.panclub.model.StockWrExcel;
import kr.co.panclub.model.StockWrItem;
import kr.co.panclub.model.StockYM;
import kr.co.panclub.model.StorMv;
import kr.co.panclub.model.StorMvItem;
import kr.co.panclub.model.StorMvReq;
import kr.co.panclub.model.StorMvReqItem;
import kr.co.panclub.model.StorageUse;
import kr.co.panclub.model.StorageUseItem;
import kr.co.panclub.model.StorageUseReq;
import kr.co.panclub.model.StorageUseReqItem;
import kr.co.panclub.model.Wh;
import kr.co.panclub.model.WhItem;
import kr.co.panclub.model.cCustPurRate;
import kr.co.panclub.model.cCustSaleDcRate;



public interface ILogisService {

	public List<StorageUseReq> storageUseReqList(HashMap<String, Object> params);       //창고사용요청 마스터 리스트   
	public List<StorageUseReqItem> storageUseReqItemList(HashMap<String, Object> params);       //품목리스트   

	public List<StorageUse> storageUseList(HashMap<String, Object> params);       //창고사용 마스터 리스트   
	public List<StorageUseItem> storageUseItemList(HashMap<String, Object> params);       //품목리스트   

	
	public List<StorMvReq> storMvReqList(HashMap<String, Object> params);       //이동 요청 마스터 리스트   
	public List<StorMvReqItem> storMvReqItemList(HashMap<String, Object> params);       //품목리스트   

	public List<StorMv> storMvList(HashMap<String, Object> params);       //이동 마스터 리스트   
	public List<StorMvItem> storMvItemList(HashMap<String, Object> params);       //품목리스트   

	//입고
	public Wh whAdd(HashMap<String, Object> params);   // 등록
	public List<Wh> whList(HashMap<String, Object> params);       //리스팅   
	public List<WhItem> whItemList(HashMap<String, Object> params);       //품목리스트   
	public WhItem whItemAdd(HashMap<String, Object> params);            //품목등록
	
	//출고요청
	public RlReq rlReqAdd(HashMap<String, Object> params);   // 등록
	public RlReqItem rlReqItemAdd(HashMap<String, Object> params);   // 등록
	public List<RlReq> rlReqList(HashMap<String, Object> params);       // 마스터 리스트   
	public List<RlReqItem> rlReqItemList(HashMap<String, Object> params);       //품목리스트  
	public RlReq reqOne(HashMap<String, Object> i_param); //출고요청인쇄

	//출고
	public Rl rlAdd(HashMap<String, Object> params);   // 등록
	public List<Rl> rlList(HashMap<String, Object> params);       //리스팅   
	public List<RlItem> rlItemList(HashMap<String, Object> params);       //품목리스트   
	public RlItem rlItemAdd(HashMap<String, Object> params);            //품목등록
	public Rl rlOne(HashMap<String, Object> i_param); //출고인쇄
	
	//반입요청
	public RiReq riReqAdd(HashMap<String, Object> params);   // 등록
	public RiReqItem riReqItemAdd(HashMap<String, Object> params);   // 등록
	public List<RiReq> riReqList(HashMap<String, Object> params);       // 마스터 리스트   
	public List<RiReqItem> riReqItemList(HashMap<String, Object> params);       //품목리스트   
	
	//반입
	public Ri riAdd(HashMap<String, Object> params);   // 등록
	public List<Ri> riList(HashMap<String, Object> params);       //리스팅   
	public List<RiItem> riItemList(HashMap<String, Object> params);       //품목리스트   
	public RiItem riItemAdd(HashMap<String, Object> params);            //품목등록
	public RiReq rireqOne(HashMap<String, Object> i_param); //1개조회
		
	//반출요청
	public RoReq roReqAdd(HashMap<String, Object> params);   // 등록
	public RoReqItem roReqItemAdd(HashMap<String, Object> params);   // 등록
	public List<RoReq> roReqList(HashMap<String, Object> params);       // 마스터 리스트   
	public List<RoReqItem> roReqItemList(HashMap<String, Object> params);       //품목리스트 
	public RoReq roReqOne(HashMap<String, Object> i_param); //1개조회
	public Ri riOne(HashMap<String, Object> i_param);//1개조회
	
	
	//반출
	public Ro roAdd(HashMap<String, Object> params);   // 등록
	public List<Ro> roList(HashMap<String, Object> params);       //리스팅   
	public List<RoItem> roItemList(HashMap<String, Object> params);       //품목리스트   
	public RoItem roItemAdd(HashMap<String, Object> params);            //품목등록
	
	//재고
	public List<Stock> stockList(HashMap<String, Object> params);       //재고리스팅   
	public List<StockRack> stockRackList(HashMap<String, Object> params);       //재고위치리스팅
	//public List<StockWr> stockWrList(HashMap<String, Object> params);       //재고입출고 리스팅 //--2023.09.01 아래것과 중복되어 주석처리.
	
	//재고실사
	public StockChk stockChkAdd(HashMap<String, Object> params);   // 등록
	public List<StockChk> stockChkList(HashMap<String, Object> params);       //리스트   
	

	//재고목록 
	public List<StockItem> stockItemList(HashMap<String, Object> params);       //리스팅. 2023.05.08 hsg   
	//재고수동처리
	public StockItem stockItemAdd(HashMap<String, Object> params);   // 등록. 2023.05.12 hsg
	//재고이력
	public List<StockActions> stockActionsList(HashMap<String, Object> params);       //리스팅. 2023.05.16 hsg
		
	//월별 재고원가 생성
	public StockYM stockYMAdd(HashMap<String, Object> params);   // 등록

	//재고입출고처리. 2023.09.01 
	public HashMap<String, Object> stockWrAdd(HashMap<String, Object> params);   // 등록
	public List<StockWr> stockWrList(HashMap<String, Object> params);       //리스팅   
	public List<StockWrItem> stockWrItemList(HashMap<String, Object> params);       //품목리스트   
	//public HashMap<String, Object> stockWrItemAdd(HashMap<String, Object> params);            //품목등록
	public StockWrItem stockWrItemAdd(HashMap<String, Object> params);            //품목등록	
	//재고수동처리 엑셀 업로드
	public HashMap<String, Object>  stockWrAddExcel(StockWrExcel stockWrExcel, File destFile) throws Exception;
	//재고 한개만 조회
	public StorageUseReq storageReqOne(HashMap<String, Object> i_param); //한개조회 2023.10.04 bk
	public cCustPurRate cCustPurRateAdd(HashMap<String, Object> params);
	public List<cCustPurRate> cCustPurRatelist(HashMap<String, Object> i_param);
	public cCustPurRate cCustPurMakerRateAdd(HashMap<String, Object> params);
	public cCustPurRate cCustPurItemRateAdd(HashMap<String, Object> params);
	
	//  20231123 supi 출고부품수량조회
	public List<SaleItemQty> rlStockList (HashMap<String,Object> i_param);
	public List<cCustSaleDcRate> cCustSaleDcRateList(HashMap<String, Object> i_param);
	public HashMap<String, Object> cCustSaleDcRateAdd(HashMap<String, Object> params); 
	
	public List<StockItemOuterNonDsp> stockItemOuterNonDspList(HashMap<String, Object> params);       //외부비노출리스팅. 2024.04.29 hsg
	public HashMap<String, Object> stockItemOuterNonDspAdd(HashMap<String, Object> params);   // 등록 

	public HashMap<String, Object> barcodeItem(HashMap<String, Object> params);   //  2024.05.10 supi  -주문회수창고사용출고에서 부품바코드 스캔시 해당 정보 조회용 통신
	public HashMap<String, Object> barcodeAdd(HashMap<String, Object> params);   // 2024.05.13 supi  - 최초작성	  -바코드 발행 통신 
	
	public List<LogisRack> logisRackList(HashMap<String, Object> params);       //룸류센터별기본랙 리스팅 hsg
	public LogisRack logisRackReg(HashMap<String, Object> params);   // 룸류센터별기본랙  등록 hsg
	
	public List<HashMap<String, Object>> stockRackItemFind(HashMap<String, Object> params);
	public List<HashMap<String, Object>> inventoryPayment(HashMap<String, Object> params);
}
