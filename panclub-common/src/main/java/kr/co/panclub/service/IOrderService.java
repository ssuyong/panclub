package kr.co.panclub.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.Cl;
import kr.co.panclub.model.ClGroup;
import kr.co.panclub.model.ClGroupMemo;
import kr.co.panclub.model.ClItem;
import kr.co.panclub.model.ClReq;
import kr.co.panclub.model.ClReqItem;
import kr.co.panclub.model.CtReq;
import kr.co.panclub.model.CtReqItem;
import kr.co.panclub.model.CtStorageRackQty;
import kr.co.panclub.model.EstiExcel;
import kr.co.panclub.model.EstiImportCalc;
import kr.co.panclub.model.EstiStorageUse;
import kr.co.panclub.model.Estimate;
import kr.co.panclub.model.EstimateItem;
import kr.co.panclub.model.EstimateItemPlaceStock;
import kr.co.panclub.model.Insurance;
import kr.co.panclub.model.NoCl;
import kr.co.panclub.model.NoClItem;
import kr.co.panclub.model.Order;
import kr.co.panclub.model.OrderExcel;
import kr.co.panclub.model.OrderGroup;
import kr.co.panclub.model.OrderGroupItem;
import kr.co.panclub.model.OrderImportCalc;
import kr.co.panclub.model.OrderItem;
import kr.co.panclub.model.OrderItemPlaceStock;
import kr.co.panclub.model.OrderStorageUse;
import kr.co.panclub.model.PcReq;
import kr.co.panclub.model.PcReqItem;
import kr.co.panclub.model.Place;
import kr.co.panclub.model.PlaceItem;
import kr.co.panclub.model.PlaceReq;
import kr.co.panclub.model.PlaceReqItem;
import kr.co.panclub.model.StorMvReq;
import kr.co.panclub.model.StorMvReqItem;
import kr.co.panclub.model.StorageUseReq;
import kr.co.panclub.model.StorageUseReqItem;
import kr.co.panclub.model.UptOrderCnt;



public interface IOrderService {

	public Estimate estiAdd(HashMap<String, Object> params);   // 등록
	public List<Estimate> estiList(HashMap<String, Object> params);       //리스팅   
	public Estimate estiOne(HashMap<String, Object> params);     // 1개 조회
	public List<EstimateItem> estiItemList(HashMap<String, Object> params);       //견적품목리스트   
	public EstimateItem estiItemAdd(HashMap<String, Object> params);            //견적품목등록
	
	public Order orderAdd(HashMap<String, Object> params);   // 등록
	public List<Order> orderList(HashMap<String, Object> params);       //리스팅   
	public Order orderOne(HashMap<String, Object> params);     // 1개 조회
	public List<OrderItem> orderItemList(HashMap<String, Object> params);       //품목리스트   
	public OrderItem orderItemAdd(HashMap<String, Object> params);            //품목등록
	
	public List<OrderGroup> orderGroupList(HashMap<String, Object> params);       //리스팅   
	public List<OrderGroupItem> orderGroupItemList(HashMap<String, Object> params);       //품목리스트   

	public EstimateItemPlaceStock estiItemPlaceStockAdd(HashMap<String, Object> params);   // 재고확인정보등록
	public List<EstimateItemPlaceStock> estiStockItemList(HashMap<String, Object> params);       //.재고확인견적품목리스트  
	
	public EstiImportCalc estiImportCalcAdd(HashMap<String, Object> params);   // 수입계산 등록
	public List<EstiImportCalc> estiImportCalcList(HashMap<String, Object> params);       //수입계산 리스트   
	
	public OrderItemPlaceStock orderItemPlaceStockAdd(HashMap<String, Object> params);   // 재고확인정보등록
	public List<OrderItemPlaceStock> orderStockItemList(HashMap<String, Object> params);       //.재고확인견적품목리스트   
	
	public OrderImportCalc orderImportCalcAdd(HashMap<String, Object> params);   // 수입계산 등록
	public List<OrderImportCalc> orderImportCalcList(HashMap<String, Object> params);       //수입계산 리스트   
	
	public PlaceReq placeReqAdd(HashMap<String, Object> params);   // 등록
	public PlaceReqItem placeReqItemAdd(HashMap<String, Object> params);   // 등록
	public List<PlaceReqItem> placeReqItemList(HashMap<String, Object> params);       //품목리스트
	
	public Place placeAdd(HashMap<String, Object> params);   // 등록
	public List<Place> placeList(HashMap<String, Object> params);       //리스팅   
	public List<PlaceItem> placeItemList(HashMap<String, Object> params);       //품목리스트   
	public PlaceItem placeItemAdd(HashMap<String, Object> params);            //품목등록
	
	public Place placeOne(HashMap<String, Object> i_param); //  1개조회
	


	//창고사용
	public StorageUseReq storageUseReqAdd(HashMap<String, Object> params);   // 등록
	public StorageUseReqItem storageUseReqItemAdd(HashMap<String, Object> params);   // 등록
	
	//견적 창고수량확인
	public EstiStorageUse estiStorageUseAdd(HashMap<String, Object> params);   //  등록
	public List<EstiStorageUse> estiStorageUseList(HashMap<String, Object> params);       //리스트   

	//주문 창고수량확인
	public OrderStorageUse orderStorageUseAdd(HashMap<String, Object> params);   //  등록
	public List<OrderStorageUse> orderStorageUseList(HashMap<String, Object> params);       //리스트   

	//이동요청
	public StorMvReq storMvReqAdd(HashMap<String, Object> params);   // 등록
	public StorMvReqItem storMvReqItemAdd(HashMap<String, Object> params);   // 서브등록	
	
	//청구요청
	public ClReq clReqAdd(HashMap<String, Object> params);   // 등록
	public ClReqItem clReqItemAdd(HashMap<String, Object> params);   // 등록
	public List<ClReq> clReqList(HashMap<String, Object> params);       // 마스터 리스트   
	public List<ClReqItem> clReqItemList(HashMap<String, Object> params);       //품목리스트   
	public ClGroupMemo clMemoAdd(HashMap<String, Object> params); //메모등록 2023.04.25 bk
	public List<ClGroupMemo> clMemoList(HashMap<String, Object> i_param); // 메모조회 2023.04.25 bk
	public ClGroup clGroupOne(HashMap<String, Object> i_param); //1개 조회 2023.05.12 bk
	
	//청구
	public Cl clAdd(HashMap<String, Object> params);   // 등록
	public List<Cl> clList(HashMap<String, Object> params);       //리스팅   
	public List<ClItem> clItemList(HashMap<String, Object> params);       //품목리스트   
	public ClItem clItemAdd(HashMap<String, Object> params);            //품목등록
	public List<ClGroup> clGroupList(HashMap<String, Object> i_param); //리스팅
	
	//견적 엑셀 업로드
	public HashMap<String, Object> estiAddExcel(EstiExcel estiExcel, File destFile) throws Exception;
	//주문 엑셀 업로드
	public HashMap<String, Object> orderAddExcel(OrderExcel orderExcel, File destFile) throws Exception;
	public int orderItemCheck(HashMap<String, Object> checkParams);
	public int placeItemCheck(HashMap<String, Object> checkParams);
	public ClGroup clGroupAdd(HashMap<String, Object> params); //2023.04.26 yoonsang 청구그룹수정
	
	//미청구
	public List<NoClItem> noClItemList(HashMap<String, Object> params);       //품목리스트  
	
	public OrderGroup orderGroupOne(HashMap<String, Object> i_param); //주문그룹 1개조회 2023.07.11 bk
	
	// 주문접수내역 조회
	public List<PcReq> pcReqList(HashMap<String, Object> i_param); //주문접수내역 2023.08.21 bk 
	public List<PcReqItem> pcReqItemList(HashMap<String, Object> i_param); //품목리스트 2023.08.21 bk  

	public PcReq pcReqAdd(HashMap<String, Object> params);
	//보험현황 
	public List<Insurance> insuranceList(HashMap<String, Object> i_param);//보험현황 2023.08.30 bk
	
	public OrderGroup orderGroupChange(HashMap<String, Object> params); //2023.10.11 bk 주문그룹변경

	//출고요청대상 리스팅 2023.11.22  hsg
	public List<OrderGroupItem> rlReqItemTgList(HashMap<String, Object> params);     
	
	public List<NoCl> noClList(HashMap<String, Object> params);       //미청구내역. 2023.12.05 hsg
	
	public List<OrderGroupItem> plReqItemTgList(HashMap<String, Object> params);    //발주요청대상 리스팅 2023.11.22  hsg
	public List<OrderGroupItem> riReqItemTgList(HashMap<String, Object> params);    //반입요청대상 리스팅 2023.11.22  hsg
	public List<OrderGroupItem> roReqItemTgList(HashMap<String, Object> params);    //반출요청대상 리스팅 2023.11.22  hsg
	public List<OrderGroupItem> clReqItemTgList(HashMap<String, Object> params);    //청구요청대상 리스팅 2023.11.22  hsg
	public List<UptOrderCnt> orderCntUptList(HashMap<String, Object> i_param);
	public UptOrderCnt orderCntUpt(HashMap<String, Object> params);
	
	//회수 관련 
	public HashMap<String, Object>  ctReqAdd(HashMap<String, Object> params); // 회수요청 마스터 및 디테일 등록&수정
	public HashMap<String, Object>  ctReqDel(HashMap<String, Object> params); // 회수요청 디테일 삭제 (디테일이 0개인 마스터도 삭제)
	public List<CtReq> ctReqList(HashMap<String, Object> i_param); // 회수요청 마스터리스트 조회
	public List<CtReqItem> ctReqItemList(HashMap<String, Object> i_param); // 회수요청 디테일 리스트 조회  
	public List<CtStorageRackQty> ctStoRackList(HashMap<String, Object> i_param); // 회수요청 디테일들 or 아이템id배열의 창고,랙,수량 검색  
	public HashMap<String, Object> ctProcess(HashMap<String, Object> i_param); // 회수요청 실제 처리
	public List<HashMap<String, Object>> stockInReqItemList(HashMap<String, Object> i_param); // 2024.07.17 supi 재고투입내역 조회
	public HashMap<String, Object> stockInReqItemAdd(HashMap<String, Object> i_param); // 2024.07.17 supi 재고투입요청
	public HashMap<String, Object> ctProcCancel(HashMap<String, Object> i_param); // 2024.07.23 supi 회수완료취소
	public List<OrderItem> clIgnItemList(HashMap<String, Object> i_param);	//240912 yoonsang 청구제외품목리스트

}
