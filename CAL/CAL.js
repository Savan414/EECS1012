function updatePage()
{

	 var d = new Date();
   var day = d.getDay();
   var hour = d.getHours();
   var minutes = d.getMinutes();
   var e = document.getElementById("info");
   if (minutes < 30)
     hour = hour - 1;
   var block = day + ":" + hour;
   e.innerHTML = "My Schedule";
   var c = document.getElementById(block);
   c.style.background = "red";
	 var c = document.getElementById(block);

	 if ((lastTime != null) && (lastTime != c))
	 {
		 lastTime.style.background = 'white';
	 }

var lastTime = null;

 if (c != null)
 {
	 c.style.background = 'red';
	 lastTime = c;
 }


}
function startUpdate()
{

  updatePage();

  window.setInterval(updatePage, 10 * 1000);

}




window.onload=startUpdate;
