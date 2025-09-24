/*document.addEventListener("DOMContentLoaded", function() {
	setTimeout(function() {
		window.print();
	}, 100);

	var imgYN = $("#estiNo").val();

});*/

var url = window.location.href;

// Parse the URL to get its query string
var queryString = url.split("?")[1];

// Split the query string into an array of key-value pairs
var params = queryString.split("&");

// Loop through the parameters and find the value of "imgYN"
var imgYN;
for (var i = 0; i < params.length; i++) {
	var param = params[i].split("=");
	if (param[0] === "imgYN") {
		imgYN = param[1];
		break;
	}
}

/*하나로 출력*/
/*function downImg(){
	 html2canvas($("#wrapper")[0]).then(function(canvas){
		 var myImage = canvas.toDataURL();
		  var link = document.createElement('a');
   link.download = '견적서.png';
   link.href = myImage;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
	 });
 }       */
 
 
 /*나누어 출력*/
function downImg() {

  // A4 paper width and height in pixels
  const a4Width = 1200;
  const a4Height = 1490;

  // Get the wrapper element
  const wrapper = document.getElementById('page');

  // Loop through the content and add pages as needed
  let position = 0;
  let page = 1;
  let orderNo = '';
   orderNo = "원장_"+document.getElementById('printOrderNo').value;
      //estiNo = "견적서_";
  while (position < wrapper.offsetHeight) {
    // Create a canvas element for each page
    const canvas = document.createElement('canvas');
    canvas.width = a4Width;
    canvas.height = a4Height;

    // Draw the content to the canvas
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff'; // Set the background color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(0, -position);
    html2canvas(wrapper, { canvas: canvas }).then(function(canvas) {
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL('image/png');

      // Create a link element with the download attribute
      const link = document.createElement('a');
     
      //link.download = `견적서_'+estiNo+'${page}.png`;
      link.download = orderNo+`_${page}.png`;
      
      //link.download = `견적서_${page}.png`;
      link.href = dataURL;

      // Click the link to download the image
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Move to the next page
    position += a4Height;
    page++;
  }

    // Move to the next page
    position += a4Height;
    page++;
  }

 
 
 
 
if (imgYN == 'Y') {
	console.log("Y");
	downImg();
	//downloadPng();
	//ac();

} else {
	console.log("N");
	setTimeout(function() {
		window.print();
	}, 100);
	// 이어올리기 아닌 경우 그리드 reset 한 다음에 처리
}
