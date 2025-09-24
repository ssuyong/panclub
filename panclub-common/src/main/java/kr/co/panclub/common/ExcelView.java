package kr.co.panclub.common;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import kr.co.panclub.model.ClGroup;
import kr.co.panclub.model.ClReqItem;

public class ExcelView extends AbstractExcelPOIView {
	    @SuppressWarnings("unchecked")
	    @Override
	    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request, HttpServletResponse response) throws Exception {
	 
	        String target = model.get("target").toString();
	        
            //Sheet 생성
            Sheet sheet = workbook.createSheet(target);
            Row row = null;
            int rowCount = 0;
            int cellCount = 0;
            Cell cell = null;
            
            String insureName = model.get("insureName").toString();
        	
        	//List<ClReq> reqList = (List<ClReq>) model.get("reqList");
        	List<ClGroup> reqList = (List<ClGroup>) model.get("reqList");
            List<ClReqItem> reqItemList = (List<ClReqItem>) model.get("reqItemList");       
            String dcYN = (String) model.get("dcYN"); //2023.08.09 bk
            
	        //target에 따라서 엑셀 문서 작성을 분기한다.
	        if(target.equals("AOS_std")){  //AOS 표준
	            //Object로 넘어온 값을 각 Model에 맞게 형변환 해준다.
	        	//ClReq req = (ClReq) model.get("reqList");
	        	
	        	//눈금선 없애기
	        	//sheet.setDisplayGridlines(false);
	        	
	            // 폰트	
	        	/*
	            XSSFFont  font = (XSSFFont) workbook.createFont();
	            font.setFontHeightInPoints((short)24);
	            font.setFontName("Courier New");
	            font.setItalic(true);
	            font.setStrikeout(true);
	            font.setBoldweight((short)700);
	            */
	        	//베이스폰트설정
	        	XSSFFont  fontBase = (XSSFFont) workbook.createFont(); // 폰트
		        fontBase.setFontHeight((short)(14*14)); //사이즈
		        fontBase.setFontName("Arial");
		        
		        
	            
	            //마스터필수셀제목 : 얇은테두리+회색배경+왼쪽정렬
	            XSSFCellStyle cellStyleMT = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMT.setFont(fontBase);
	            cellStyleMT.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());  //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleMT.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleMT.setAlignment(HorizontalAlignment.LEFT);
	            cellStyleMT.setVerticalAlignment(VerticalAlignment.CENTER);	        
	            cellStyleMT.setBorderRight(BorderStyle.THIN);
	            cellStyleMT.setBorderLeft(BorderStyle.THIN);
	            cellStyleMT.setBorderTop(BorderStyle.THIN); 
	            cellStyleMT.setBorderBottom(BorderStyle.THIN); 

	            //마스터필수셀제목 : 얇은테두리+노란색배경+왼쪽정렬
	            XSSFCellStyle cellStyleMMT = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMMT.setFont(fontBase);
	            cellStyleMMT.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex()); //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleMMT.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleMMT.setAlignment(HorizontalAlignment.LEFT);
	            cellStyleMMT.setVerticalAlignment(VerticalAlignment.CENTER);	           
	            cellStyleMMT.setBorderRight(BorderStyle.THIN);  
	            cellStyleMMT.setBorderLeft(BorderStyle.THIN);    
	            cellStyleMMT.setBorderTop(BorderStyle.THIN);     
	            cellStyleMMT.setBorderBottom(BorderStyle.THIN);     
	            
	            //마스터필수셀제목 : 양식변경용 선홍 스타일
	            XSSFCellStyle cellStyleMMT2 = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMMT2.setFont(fontBase);
	            cellStyleMMT2.setFillForegroundColor(IndexedColors.TAN.getIndex()); //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleMMT2.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleMMT2.setAlignment(HorizontalAlignment.LEFT);
	            cellStyleMMT2.setVerticalAlignment(VerticalAlignment.CENTER);	           
	            cellStyleMMT2.setBorderRight(BorderStyle.THIN);  
	            cellStyleMMT2.setBorderLeft(BorderStyle.THIN);    
	            cellStyleMMT2.setBorderTop(BorderStyle.THIN);     
	            cellStyleMMT2.setBorderBottom(BorderStyle.THIN);    
	            
	          //마스터필수셀제목 : 양식변경용 파란색 스타일
	            XSSFCellStyle cellStyleMMT3 = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMMT3.setFont(fontBase);
	            cellStyleMMT3.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.getIndex()); //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleMMT3.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleMMT3.setAlignment(HorizontalAlignment.LEFT);
	            cellStyleMMT3.setVerticalAlignment(VerticalAlignment.CENTER);	           
	            cellStyleMMT3.setBorderRight(BorderStyle.THIN);  
	            cellStyleMMT3.setBorderLeft(BorderStyle.THIN);    
	            cellStyleMMT3.setBorderTop(BorderStyle.THIN);     
	            cellStyleMMT3.setBorderBottom(BorderStyle.THIN);     

	            //마스터필수셀내용 : 얇은테두리+노란색배경+오른쪽정렬
	            XSSFCellStyle cellStyleMMC = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMMC.setFont(fontBase);
	            cellStyleMMC.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());  //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleMMC.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleMMC.setAlignment(HorizontalAlignment.RIGHT);
	            cellStyleMMC.setVerticalAlignment(VerticalAlignment.CENTER);		            
	            cellStyleMMC.setBorderRight(BorderStyle.THIN);   
	            cellStyleMMC.setBorderLeft(BorderStyle.THIN);      
	            cellStyleMMC.setBorderTop(BorderStyle.THIN);      
	            cellStyleMMC.setBorderBottom(BorderStyle.THIN);   
	            
	            //마스터중요셀제목 : 얇은테두리+배경색없음+왼쪽정렬
	            XSSFCellStyle cellStyleMST = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMST.setFont(fontBase);
	            cellStyleMST.setAlignment(HorizontalAlignment.LEFT);  
	            cellStyleMST.setVerticalAlignment(VerticalAlignment.CENTER);		            
	            cellStyleMST.setBorderRight(BorderStyle.THIN); 
	            cellStyleMST.setBorderLeft(BorderStyle.THIN); 
	            cellStyleMST.setBorderTop(BorderStyle.THIN); 
	            cellStyleMST.setBorderBottom(BorderStyle.THIN); 
	            
	            //마스터중요셀제목 : 얇은테두리+배경색없음+오른쪽정렬
	            XSSFCellStyle cellStyleMSC = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMSC.setFont(fontBase);
	            cellStyleMSC.setAlignment(HorizontalAlignment.RIGHT);  
	            cellStyleMSC.setVerticalAlignment(VerticalAlignment.CENTER);	        
	            cellStyleMSC.setBorderRight(BorderStyle.THIN);     
	            cellStyleMSC.setBorderLeft(BorderStyle.THIN);    
	            cellStyleMSC.setBorderTop(BorderStyle.THIN);     
	            cellStyleMSC.setBorderBottom(BorderStyle.THIN);               
	            
	            //헤더부분셀 : 얇은테두리+회색배경
	            XSSFCellStyle cellStyleHeader = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleHeader.setFont(fontBase);
	            cellStyleHeader.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());  //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleHeader.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleHeader.setAlignment(HorizontalAlignment.CENTER);   
	            cellStyleHeader.setVerticalAlignment(VerticalAlignment.CENTER);	            
	            cellStyleHeader.setBorderRight(BorderStyle.THIN);   
	            cellStyleHeader.setBorderLeft(BorderStyle.THIN);   
	            cellStyleHeader.setBorderTop(BorderStyle.THIN);   
	            cellStyleHeader.setBorderBottom(BorderStyle.THIN);   
	            /*
	            cellStyleHeader.setAlignment(HSSFCellStyle.ALIGN_CENTER);                     //스타일인스턴스의 속성 셑팅           
	            //cellStyle.setFillForegroundColor(HSSFCellStyle.GREY_25_PERCENT);        //셀에 색깔 채우기   
	            cellStyleHeader.setFillBackgroundColor((short) 44);
	            cellStyleHeader.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);   
	            cellStyleHeader.setBorderRight(HSSFCellStyle.BORDER_MEDIUM);              //테두리 설정   
	            cellStyleHeader.setBorderLeft(HSSFCellStyle.BORDER_MEDIUM);   
	            cellStyleHeader.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);   
	            cellStyleHeader.setBorderBottom(HSSFCellStyle.BORDER_MEDIUM);
	            */
	            //데이타 : 얇은 테두리   
	            XSSFCellStyle cellStyle0 = (XSSFCellStyle) workbook.createCellStyle();                           
	            //cellStyle0.setAlignment(HSSFCellStyle.ALIGN_CENTER);   
	            cellStyle0.setFont(fontBase);
	            cellStyle0.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle0.setBorderRight(BorderStyle.THIN);   
	            cellStyle0.setBorderLeft(BorderStyle.THIN);   
	            cellStyle0.setBorderTop(BorderStyle.THIN);   
	            cellStyle0.setBorderBottom(BorderStyle.THIN);   
	               
	            //얇은 테두리를 위한 스타일 인스턴스 생성   
	            XSSFCellStyle cellStyle1 = (XSSFCellStyle) workbook.createCellStyle();           
	            cellStyle1.setFont(fontBase);
	            cellStyle1.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle1.setBorderRight(BorderStyle.THIN);   
	            cellStyle1.setBorderLeft(BorderStyle.THIN);   
	            cellStyle1.setBorderTop(BorderStyle.THIN);   
	            cellStyle1.setBorderBottom(BorderStyle.THIN);   
	            
	            XSSFCellStyle cellStyleMoney = (XSSFCellStyle) workbook.createCellStyle(); 
	            cellStyleMoney.setFont(fontBase);
	            cellStyleMoney.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleMoney.setBorderRight(BorderStyle.THIN);   
	            cellStyleMoney.setBorderLeft(BorderStyle.THIN);   
	            cellStyleMoney.setBorderTop(BorderStyle.THIN);   
	            cellStyleMoney.setBorderBottom(BorderStyle.THIN);   
	            cellStyleMoney.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0"));
	            
	            XSSFCellStyle cellStyleNone = (XSSFCellStyle) workbook.createCellStyle(); 
	            cellStyleNone.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleNone.setFont(fontBase);
	            
	            
	            XSSFFont  fontBase2 = (XSSFFont) workbook.createFont(); // 폰트
		        fontBase2.setFontHeight((short)(14*14)); //사이즈
		        fontBase2.setFontName("Arial");
		        fontBase2.setColor(IndexedColors.BLUE.getIndex());
		        fontBase2.setBold(true);
	            XSSFCellStyle cellStyleNone2 = (XSSFCellStyle) workbook.createCellStyle(); 
	            cellStyleNone2.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleNone2.setFont(fontBase2);
	             
	            XSSFFont  fontBase3 = (XSSFFont) workbook.createFont(); // 폰트
	            fontBase3.setFontHeight((short)(14*14)); //사이즈
	            fontBase3.setFontName("Arial");
	            fontBase3.setColor(IndexedColors.BLUE.getIndex());
	            fontBase3.setBold(false);
	            XSSFCellStyle cellStyleNone3 = (XSSFCellStyle) workbook.createCellStyle(); 
	            cellStyleNone3.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleNone3.setFont(fontBase3);
	            
	      
	            XSSFCellStyle cellStylePercent = (XSSFCellStyle) workbook.createCellStyle();
	            cellStylePercent.setFont(fontBase);
	            cellStylePercent.setAlignment(HorizontalAlignment.RIGHT);  
	            cellStylePercent.setVerticalAlignment(VerticalAlignment.CENTER);	        
	            cellStylePercent.setBorderRight(BorderStyle.THIN);     
	            cellStylePercent.setBorderLeft(BorderStyle.THIN);    
	            cellStylePercent.setBorderTop(BorderStyle.THIN);     
	            cellStylePercent.setBorderBottom(BorderStyle.THIN);    
	            cellStylePercent.setDataFormat(workbook.createDataFormat().getFormat("0%"));
	            
	            
	            //마스터정보생성
//	            row = sheet.createRow(rowCount++);
//	            cell = row.createCell(cellCount++);  cell.setCellValue("화면:");   cell.setCellStyle(cellStyleMT);
//	            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMT);
//	            sheet.addMergedRegion(new CellRangeAddress(0,1,2,2));  //셀병합
	            //HSSFRow mergeRow = sheet.getRow(1);
//	            cell = row.createCell(cellCount++); cell.setCellValue("* 불필요 : 문서관리번호 등");  cell.setCellStyle(cellStyleNone);	 
	            
	            cellCount = 0;
//	            row = sheet.createRow(rowCount++);
//	            cell = row.createCell(cellCount++); cell.setCellValue("차량관리번호:");    cell.setCellStyle(cellStyleMT);
//	            cell = row.createCell(cellCount++); cell.setCellValue("");    cell.setCellStyle(cellStyleMT);
//	            
	            for (ClGroup clGroup : reqList) {
	            	
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("차량번호:");     cell.setCellStyle(cellStyleMMT2);
		            cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getCarNo()); cell.setCellStyle(cellStyleMMC);
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (필수) : 사고차량 번호"); cell.setCellStyle(cellStyleNone);	 
		            cell = row.createCell(cellCount++); cell.setCellValue("* 사고차량 번호"); cell.setCellStyle(cellStyleNone2);	 
		            
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("차량종류:");   cell.setCellStyle(cellStyleMST);
//		            cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getCarType()); cell.setCellStyle(cellStyleMSC);
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (중요) : 차종, 외산차부품AOS에서 청구하는 동안 선택가능"); cell.setCellStyle(cellStyleNone);	 
		            
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("주보험사:"); cell.setCellStyle(cellStyleMMT);
		            cell = row.createCell(cellCount++); cell.setCellValue("보험사:"); cell.setCellStyle(cellStyleMMT2);
		            //cell = row.createCell(cellCount++); cell.setCellValue(req.getCarType()); cell.setCellStyle(cellStyleMMC);	           
		            cell = row.createCell(cellCount++); cell.setCellValue(insureName); cell.setCellStyle(cellStyleMMC);
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (필수) : 주보험사, 우측 선택"); cell.setCellStyle(cellStyleNone);	 
		            cell = row.createCell(cellCount++); cell.setCellValue("* 보험사"); cell.setCellStyle(cellStyleNone2);	 
		            
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("(LOCAL) 할인할증율:"); cell.setCellStyle(cellStyleMMT2);
		            //cell = row.createCell(cellCount++); cell.setCellValue(req.getCarType());  cell.setCellStyle(cellStyleMSC);	            
		            cell = row.createCell(cellCount++); cell.setCellValue(0);  cell.setCellStyle(cellStylePercent);   
		            cell = row.createCell(cellCount++); cell.setCellValue("* 매입구분 \"LOCAL\"만 적용, 할증 적용 시 ( - ) 값 사용"); cell.setCellStyle(cellStyleNone2);	
		            
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("부보험사:"); cell.setCellStyle(cellStyleMST);
		            //cell = row.createCell(cellCount++); cell.setCellValue(req.getCarType());  cell.setCellStyle(cellStyleMSC);	            
//		            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleMSC);
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (중요) : 부보험사, 우측 선택"); cell.setCellStyle(cellStyleNone);	
		            
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("VinCode"); cell.setCellStyle(cellStyleMMT2); 
		            cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getVinNo()); cell.setCellStyle(cellStyleMMC);	            
		            cell = row.createCell(cellCount++); cell.setCellValue("* 사고차량의 차대번호 17자리 입력"); cell.setCellStyle(cellStyleNone2);
		            
		            
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("도매 합계"); cell.setCellStyle(cellStyleMMT3); 
		            cell = row.createCell(cellCount++); cell.setCellValue("-");  cell.setCellStyle(cellStyleMSC);
		            cell = row.createCell(cellCount++); cell.setCellValue(""); cell.setCellStyle(cellStyleNone); 
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("LOCAL 합계"); cell.setCellStyle(cellStyleMMT3); 
		            cell = row.createCell(cellCount++); cell.setCellValue("-");  cell.setCellStyle(cellStyleMSC);
		            cell = row.createCell(cellCount++); cell.setCellValue(""); cell.setCellStyle(cellStyleNone); 
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("해외직구 합계"); cell.setCellStyle(cellStyleMMT3); 
		            cell = row.createCell(cellCount++); cell.setCellValue("-");  cell.setCellStyle(cellStyleMSC);
		            cell = row.createCell(cellCount++); cell.setCellValue(""); cell.setCellStyle(cellStyleNone); 
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("기타 합계"); cell.setCellStyle(cellStyleMMT3); 	  
		            cell = row.createCell(cellCount++); cell.setCellValue("-");  cell.setCellStyle(cellStyleMSC);
		            cell = row.createCell(cellCount++); cell.setCellValue(""); cell.setCellStyle(cellStyleNone); 
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("총 청구액:"); cell.setCellStyle(cellStyleMMT3);  
		            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleMSC);
		            cell = row.createCell(cellCount++); cell.setCellValue("* 부품 청구내역서의 청구가격 합산금액(임의 산식 적용으로 담당자 재검산 필수)"); cell.setCellStyle(cellStyleNone3); 
		           
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("정비업체:");  cell.setCellStyle(cellStyleMST);
//		            //cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getCustName());  cell.setCellStyle(cellStyleMSC);	        
//		            cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getCustName5());  cell.setCellStyle(cellStyleMSC);	 
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (중요) : 정비공장명, 외산차부품AOS에서 청구하는 동안 선택가능"); cell.setCellStyle(cellStyleNone);	 
//	
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("사고일자:");  cell.setCellStyle(cellStyleMMT);
//		            cell = row.createCell(cellCount++); cell.setCellValue(""); cell.setCellStyle(cellStyleMMC);	            
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (필수) : 사고일자, YYYY-MM-DD 형식 입력"); cell.setCellStyle(cellStyleNone);	 
//		            
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("입고일자: "); cell.setCellStyle(cellStyleMMT);
//		            cell = row.createCell(cellCount++); cell.setCellValue(""); cell.setCellStyle(cellStyleMMC);	            
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (필수) : 공장입고일자, YYYY-MM-DD 형식 입력"); cell.setCellStyle(cellStyleNone);	 
//		            
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("수리완료:");  cell.setCellStyle(cellStyleMST);
//		            cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getRegYmd()); cell.setCellStyle(cellStyleMSC);	            
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (중요) : 수리완료일자, YYYY-MM-DD 형식 입력"); cell.setCellStyle(cellStyleNone);	 
//		            
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("청구일자:"); cell.setCellStyle(cellStyleMST);
//		            cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getRegYmd()); cell.setCellStyle(cellStyleMSC);	            
//		            cell = row.createCell(cellCount++); cell.setCellValue("* (중요) : 수리완료일자, YYYY-MM-DD 형식 입력"); cell.setCellStyle(cellStyleNone);	 
//		            
//		            cellCount = 0;
//		            row = sheet.createRow(rowCount++);
//		            cell = row.createCell(cellCount++); cell.setCellValue("총 청구금액:");  cell.setCellStyle(cellStyleMST);
//		            cell = row.createCell(cellCount++); cell.setCellValue(clGroup.getSaleAmt().add(clGroup.getTaxAmt()).longValue()); cell.setCellStyle(cellStyleMoney);	            
//		            cell = row.createCell(cellCount++); cell.setCellValue("* 부품 청구내역서의 청구가격 합산금액(sum함수 이용 가능)"); cell.setCellStyle(cellStyleNone);	 
		            
		            	 
	            }
	            
	            
	            // 제목 Cell 생성
	            cellCount = 0;
	            row = sheet.createRow(rowCount++);	 
	            //cell.setCellStyle(cellStyle1); 
	            //row.createCell(cellCount++).setCellValue("부품번호");
	            cell = row.createCell(cellCount++);	            cell.setCellValue("부품번호");	            cell.setCellStyle(cellStyleHeader);
	            cell = row.createCell(cellCount++);	            cell.setCellValue("부품명");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("수량");	            cell.setCellStyle(cellStyleHeader);	            
//	            cell = row.createCell(cellCount++);	            cell.setCellValue("소비자가격");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("청구단가");	            cell.setCellStyle(cellStyleHeader);	            
//	            cell = row.createCell(cellCount++);	            cell.setCellValue("부품공급일자");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("할인할증율");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("매입구분");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("청구금액");	            cell.setCellStyle(cellStyleHeader);	            
	            
	            //칼럼길이 설정
	            //sheet.setDefaultColumnWidth(300);
	            
	            sheet.setColumnWidth(0, 5000);  //1000이 열 너비 3.14   1000 이 행높이 50
	            sheet.setColumnWidth(1, 8000);
	            sheet.setColumnWidth(2, 3000);
	            sheet.setColumnWidth(3, 3000);
	            sheet.setColumnWidth(4, 4000);
	            sheet.setColumnWidth(5, 4000);
	            sheet.setColumnWidth(6, 5000);
	            	            
/*	            for (int i=0;i<16;i++) //autuSizeColumn after setColumnWidth setting!! 
	            { 
	            sheet.autoSizeColumn(i);
	            sheet.setColumnWidth(i, (sheet.getColumnWidth(i))+512 ); //이건 자동으로 조절 하면 너무 딱딱해 보여서 자동조정한 사이즈에 (short)512를 추가해 주니 한결 보기 나아졌다.
	            }
	            row.setHeight((short)512);*/

	            // 데이터 Cell 생성
	            for (ClReqItem clReqItem : reqItemList) {
	                row = sheet.createRow(rowCount++);
	                cellCount = 0;
	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getItemNo());	                cell.setCellStyle(cellStyle0); //부품번호
	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getItemName());	                cell.setCellStyle(cellStyle0);   //부품명
	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getCnt());	                cell.setCellStyle(cellStyleMoney);    //수량
	               if ("Y".equals(dcYN)) {
//	            	   cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getInsureClPrice().longValue()/clReqItem.getCnt()); 	                cell.setCellStyle(cellStyleMoney);   //소비자가력
	            	   cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getInsureClPrice().longValue()/clReqItem.getCnt() ); 	                cell.setCellStyle(cellStyleMoney); //청구가격	            	   
	               }else {
//	            	   cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getUnitPrice().longValue() ); 	                cell.setCellStyle(cellStyleMoney);   //소비자가력
	            	   cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getUnitPrice().longValue() ); 	                cell.setCellStyle(cellStyleMoney); //청구가격	        
	               }
//	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getRegYmd()); 	                cell.setCellStyle(cellStyle0);  //부품공급일자
	                cell = row.createCell(cellCount++);	                cell.setCellValue("");    	                cell.setCellStyle(cellStyle0);   //할인할증율
	                cell = row.createCell(cellCount++);	                cell.setCellValue("LOCAL");    	                cell.setCellStyle(cellStyle0);   //구매유형
	                cell = row.createCell(cellCount++);	                cell.setCellValue("");    	                cell.setCellStyle(cellStyle0);   //청구금액
	            }
	 
	        }
	        
	        else if(target.equals("AOS_ssf")){  //AOS 삼성화재
	        	
	        	//눈금선 없애기
	        	sheet.setDisplayGridlines(false);
	        	
	        	//베이스폰트설정
	        	XSSFFont  fontBase = (XSSFFont) workbook.createFont(); // 폰트
		        //fontBase.setFontHeightInPoints((short)11);
		        fontBase.setFontHeight((short)(14*14)); //사이즈
		        
	        	//마스터필수셀제목 : 얇은테두리+회색배경+왼쪽정렬
	            XSSFCellStyle cellStyleT = (XSSFCellStyle) workbook.createCellStyle();
	            XSSFFont  fontT = (XSSFFont) workbook.createFont(); // 폰트
	            fontT.setFontHeightInPoints((short)18);
	            cellStyleT.setFont(fontT);	            
	            cellStyleT.setAlignment(HorizontalAlignment.CENTER); 
	            cellStyleT.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleT.setBorderRight(BorderStyle.THICK);    
	            cellStyleT.setBorderLeft(BorderStyle.THICK);       
	            cellStyleT.setBorderTop(BorderStyle.THICK);    
	            cellStyleT.setBorderBottom(BorderStyle.THICK);              	

	            //마스터필수셀제목 : 얇은테두리+노란색배경+가운데정렬
	            XSSFCellStyle cellStyleMT = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMT.setFont(fontBase);
	            cellStyleMT.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());  //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleMT.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleMT.setAlignment(HorizontalAlignment.CENTER);   
	            cellStyleMT.setVerticalAlignment(VerticalAlignment.CENTER);	 
	            cellStyleMT.setBorderRight(BorderStyle.THIN);     
	            cellStyleMT.setBorderLeft(BorderStyle.THIN);   
	            cellStyleMT.setBorderTop(BorderStyle.THIN);     
	            cellStyleMT.setBorderBottom(BorderStyle.THIN);   
	            
	            //마스터필수셀내용 : 얇은테두리+배경없음+가운데정렬
	            XSSFCellStyle cellStyleMC = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleMC.setFont(fontBase);
	            cellStyleMC.setAlignment(HorizontalAlignment.CENTER);   
	            cellStyleMC.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleMC.setBorderRight(BorderStyle.THIN);  
	            cellStyleMC.setBorderLeft(BorderStyle.THIN);  
	            cellStyleMC.setBorderTop(BorderStyle.THIN);    
	            cellStyleMC.setBorderBottom(BorderStyle.THIN);     
	            
	            //헤더부분셀 : 얇은테두리+회색배경
	            XSSFCellStyle cellStyleHeader = (XSSFCellStyle) workbook.createCellStyle();
	            cellStyleHeader.setFont(fontBase);
	            cellStyleHeader.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());  //셀색깔채우기: 아래라인도 같이 있어야 반영이 됨.  
	            cellStyleHeader.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	            cellStyleHeader.setAlignment(HorizontalAlignment.CENTER);      
	            cellStyleHeader.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleHeader.setBorderRight(BorderStyle.THIN);     
	            cellStyleHeader.setBorderLeft(BorderStyle.THIN);  
	            cellStyleHeader.setBorderTop(BorderStyle.THIN);  
	            cellStyleHeader.setBorderBottom(BorderStyle.THIN);   
		            
	            //데이타 : 얇은 테두리   
	            XSSFCellStyle cellStyle0 = (XSSFCellStyle) workbook.createCellStyle();         
	            cellStyle0.setFont(fontBase);
	            //cellStyle0.setAlignment(HSSFCellStyle.ALIGN_CENTER);   
	            cellStyle0.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle0.setBorderRight(BorderStyle.THIN);    
	            cellStyle0.setBorderLeft(BorderStyle.THIN);     
	            cellStyle0.setBorderTop(BorderStyle.THIN);     
	            cellStyle0.setBorderBottom(BorderStyle.THIN);     
	               
	            //테두리없음   
	            XSSFCellStyle cellStyle1 = (XSSFCellStyle) workbook.createCellStyle();  
	            cellStyle1.setFont(fontBase);
	            cellStyle1.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle1.setBorderRight(BorderStyle.NONE);
	            cellStyle1.setBorderLeft(BorderStyle.NONE);
	            cellStyle1.setBorderTop(BorderStyle.NONE);
	            cellStyle1.setBorderBottom(BorderStyle.NONE);
	            
	            //테두리없음 -fontColor -darkRed   
	            XSSFCellStyle cellStyle1FontRed = (XSSFCellStyle) workbook.createCellStyle();  
	            XSSFFont  fontR = (XSSFFont) workbook.createFont(); // 폰트
	            fontR.setColor(IndexedColors.DARK_RED.getIndex());
	            fontR.setBold(true); //볼드 (굵게)
	            fontR.setFontHeight((short)(14*14));
	            cellStyle1FontRed.setFont(fontR);
	            cellStyle1FontRed.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle1FontRed.setBorderRight(BorderStyle.NONE);
	            cellStyle1FontRed.setBorderLeft(BorderStyle.NONE);
	            cellStyle1FontRed.setBorderTop(BorderStyle.NONE); 
	            cellStyle1FontRed.setBorderBottom(BorderStyle.NONE); 

	            //왼쪽만테두리없음   
	            XSSFCellStyle cellStyle2 = (XSSFCellStyle) workbook.createCellStyle();   
	            cellStyle2.setFont(fontBase);
	            cellStyle2.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle2.setBorderRight(BorderStyle.THIN);  
	            cellStyle2.setBorderLeft(BorderStyle.NONE);
	            cellStyle2.setBorderTop(BorderStyle.THIN); 
	            cellStyle2.setBorderBottom(BorderStyle.THIN);   
	
	            //왼쪽만테두리없음 -fontColor -darkRed   
	            XSSFCellStyle cellStyle2FontRed = (XSSFCellStyle) workbook.createCellStyle();  
	            XSSFFont  fontP = (XSSFFont) workbook.createFont(); // 폰트
	            fontP.setColor(IndexedColors.DARK_RED.getIndex());
	            fontP.setBold(true); //볼드 (굵게)
	            fontP.setFontHeight((short)(14*14));
	            cellStyle2FontRed.setFont(fontP);
	            cellStyle2FontRed.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle2FontRed.setBorderRight(BorderStyle.THIN);   
	            cellStyle2FontRed.setBorderLeft(BorderStyle.NONE);   
	            cellStyle2FontRed.setBorderTop(BorderStyle.NONE);   
	            cellStyle2FontRed.setBorderBottom(BorderStyle.NONE);   
	            
	            //천단위 쉼표, 금액
	            XSSFCellStyle cellStyleMoney = (XSSFCellStyle) workbook.createCellStyle(); 
	            cellStyleMoney.setFont(fontBase);
	            cellStyleMoney.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyleMoney.setBorderRight(BorderStyle.THIN);
	            cellStyleMoney.setBorderLeft(BorderStyle.THIN); 
	            cellStyleMoney.setBorderTop(BorderStyle.THIN);  
	            cellStyleMoney.setBorderBottom(BorderStyle.THIN);  
	            cellStyleMoney.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0"));
	            
	            //마스터정보생성
	            row = sheet.createRow(rowCount++);
	            
	            cellCount = 0;
	            row = sheet.createRow(rowCount++);
	            sheet.addMergedRegion(new CellRangeAddress(1,1,0,7));  //셀병합  시작열,종료열,시작칼럼,종료칼럼
	            cell = row.createCell(cellCount++); cell.setCellValue("보험청구서");  cell.setCellStyle(cellStyleT);
	            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleT);
	            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleT);
	            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleT);
	            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleT);
	            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleT);
	            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleT);
	            cell = row.createCell(cellCount++); cell.setCellValue("");  cell.setCellStyle(cellStyleT);
	            
	            long totalSum = 0;
	            for (ClReqItem clReqItem : reqItemList) {
	            	if ("Y".equals(dcYN)) {
	            		long itemSum = clReqItem.getInsureClPrice().longValue() ;
	            		totalSum += itemSum;
	            }else {
	            		long itemSum = clReqItem.getSumPrice().longValue() ;
	            		totalSum += itemSum;
	            	}                
	            }
	            

	            for (ClGroup clGroup : reqList) {
	            	cellCount = 0;
	            	row = sheet.createRow(rowCount++);
	            	sheet.addMergedRegion(new CellRangeAddress(2,2,0,1));  //셀병합  시작열,종료열,시작칼럼,종료칼럼
		            cell = row.createCell(cellCount++);  cell.setCellValue("사고번호");  cell.setCellStyle(cellStyleMT);
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("차량번호");   cell.setCellStyle(cellStyleMT);
		            cell = row.createCell(cellCount++);  cell.setCellValue(clGroup.getCarNo());   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("차명/모델");   cell.setCellStyle(cellStyleMT);
		            cell = row.createCell(cellCount++);  cell.setCellValue(clGroup.getMakerCode() + " " + clGroup.getCarType());   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);
		            
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            sheet.addMergedRegion(new CellRangeAddress(3,3,0,1));  //셀병합  시작열,종료열,시작칼럼,종료칼럼
		            cell = row.createCell(cellCount++);  cell.setCellValue("부품업체명");   cell.setCellStyle(cellStyleMT);
		            cell = row.createCell(cellCount++);  cell.setCellValue(clGroup.getCustName2());   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue(clGroup.getCustName2());   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("사업자번호");   cell.setCellStyle(cellStyleMT);
		            cell = row.createCell(cellCount++);  cell.setCellValue(clGroup.getBizNo());   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("연락처");   cell.setCellStyle(cellStyleMT);
		            cell = row.createCell(cellCount++);  cell.setCellValue(clGroup.getPhone());   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);
		            
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            sheet.addMergedRegion(new CellRangeAddress(4,4,0,1));  //셀병합  시작열,종료열,시작칼럼,종료칼럼
		            cell = row.createCell(cellCount++);  cell.setCellValue("주 소");   cell.setCellStyle(cellStyleMT);
		            sheet.addMergedRegion(new CellRangeAddress(4,4,2,3));  //셀병합  시작열,종료열,시작칼럼,종료칼럼
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);		            
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyleMC);
		            cell = row.createCell(cellCount++); cell.setCellValue("총 청구금액");  cell.setCellStyle(cellStyleMT);
		            cell = row.createCell(cellCount++); cell.setCellValue(totalSum); cell.setCellStyle(cellStyleMoney);
		            cell = row.createCell(cellCount++);  cell.setCellValue("");   cell.setCellStyle(cellStyle2);
		            
		            cellCount = 0;
		            row = sheet.createRow(rowCount++);
		            cell = row.createCell(cellCount++); cell.setCellValue("");    cell.setCellStyle(cellStyle1);
		            cell = row.createCell(cellCount++); cell.setCellValue("");    cell.setCellStyle(cellStyle1);
		            cell = row.createCell(cellCount++); cell.setCellValue("");    cell.setCellStyle(cellStyle1);
		            cell = row.createCell(cellCount++); cell.setCellValue("");    cell.setCellStyle(cellStyle1);
		            cell = row.createCell(cellCount++); cell.setCellValue("");    cell.setCellStyle(cellStyle1);
		            cell = row.createCell(cellCount++); cell.setCellValue("※총 청구금액은");    cell.setCellStyle(cellStyle1FontRed);
		            cell = row.createCell(cellCount++); cell.setCellValue("단가에 부가세가");    cell.setCellStyle(cellStyle1FontRed);
		            cell = row.createCell(cellCount++); cell.setCellValue("포함되어 계산됩니다.");    cell.setCellStyle(cellStyle2FontRed);
	            
	            }
	            
	            
	            // 제목 Cell 생성
	            cellCount = 0;
	            row = sheet.createRow(rowCount++);	 
	            //cell.setCellStyle(cellStyle1); 
	            //row.createCell(cellCount++).setCellValue("부품번호");
	            cell = row.createCell(cellCount++);	            cell.setCellValue("No");	            cell.setCellStyle(cellStyleHeader);
	            cell = row.createCell(cellCount++);	            cell.setCellValue("품번");	            cell.setCellStyle(cellStyleHeader);
	            cell = row.createCell(cellCount++);	            cell.setCellValue("품명");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("수량");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("단 가(부가세미포함)");	cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("금  액");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("구매유형");	            cell.setCellStyle(cellStyleHeader);	            
	            cell = row.createCell(cellCount++);	            cell.setCellValue("딜러가격(단가)");	    cell.setCellStyle(cellStyleHeader);	            
	            
	            //칼럼길이 설정
	            //sheet.setDefaultColumnWidth(300);
	            
	            sheet.setColumnWidth(0, 1500);  //1000이 열 너비 3.14   1000 이 행높이 50
	            sheet.setColumnWidth(1, 3000);
	            sheet.setColumnWidth(2, 6000);
	            sheet.setColumnWidth(3, 3000);
	            sheet.setColumnWidth(4, 5000);
	            sheet.setColumnWidth(5, 4000);
	            sheet.setColumnWidth(6, 4000);
	            sheet.setColumnWidth(7, 5000);
	            	            
/*	            for (int i=0;i<16;i++) //autuSizeColumn after setColumnWidth setting!! 
	            { 
	            sheet.autoSizeColumn(i);
	            sheet.setColumnWidth(i, (sheet.getColumnWidth(i))+512 ); //이건 자동으로 조절 하면 너무 딱딱해 보여서 자동조정한 사이즈에 (short)512를 추가해 주니 한결 보기 나아졌다.
	            }
	            row.setHeight((short)512);*/

	            // 데이터 Cell 생성
	            int i =1;
	            for (ClReqItem clReqItem : reqItemList) {
	                row = sheet.createRow(rowCount++);
	                cellCount = 0;
	                cell = row.createCell(cellCount++);	                cell.setCellValue(i);	                cell.setCellStyle(cellStyleMC); //부품번호
	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getItemNo());	                cell.setCellStyle(cellStyle0); //부품번호
	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getItemName());	                cell.setCellStyle(cellStyle0);   //부품명
	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getCnt());	                cell.setCellStyle(cellStyleMoney);    //수량
	                if ("Y".equals(dcYN)) {
		            	   cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getInsureClPrice().longValue() / clReqItem.getCnt());	                cell.setCellStyle(cellStyleMoney);   //소비자가력
		            	   cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getInsureClPrice().longValue() ); 	                cell.setCellStyle(cellStyleMoney); //청구가격	            	   
		               }else {
		            	   cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getUnitPrice().longValue());	                cell.setCellStyle(cellStyleMoney);   //소비자가력
			                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getSumPrice().longValue() ); 	                cell.setCellStyle(cellStyleMoney); //청구가격 
		               }	               
	                cell = row.createCell(cellCount++);	               cell.setCellValue("2.Local");                cell.setCellStyle(cellStyleMC);  //구매유형
	                cell = row.createCell(cellCount++);	                cell.setCellValue(clReqItem.getUnitPrice().longValue());	                cell.setCellStyle(cellStyleMoney);   //딜러가격
	                i = i + 1; 
	            }        	
	        	
	        }
	        
	 
	    }
	    
	    @Override
	    protected Workbook createWorkbook() {
	        return new XSSFWorkbook();
	    }
	 
}
