/* jslint browser:true */


alert("js loaded");
var id = null;
var firstTime = -1;
var currentCache = 0;

//var loc1 = { lat: 43.772838, lon: -79.509847, desc: "vanier college"};
//var loc2 = { lat: 43.773773, lon: -79.505156, desc: "stadium"};
//var loc3 = { lat: 43.774165, lon: -79.507836, desc: "gym"};

function updateCache()
{
  //alert("inside updateCache");
  //alert(currentCache);
  currentCache = (currentCache +1) % 3;
  //alert(currentCache);
  showCache();
  //alert("done showCache");
}

function showCache()
{
  //alert("inside showCache");
  var target = document.getElementById("target");
  var loc1 = { lat: 43.772838, lon: -79.509847, desc: "calumet res"};
  var loc2 = { lat: 43.773773, lon: -79.505156, desc: "cse building"};
  var loc3 = { lat: 43.774165, lon: -79.507836, desc: "gym"};
  var cacs = [loc1, loc2, loc3];
  var target_u_coord = interpolate(-79.505962, -79.503306, 550, 800, parseFloat(cacs[currentCache].lon));
  var target_v_coord = interpolate(43.773415, 43.773065, 250, 300, parseFloat(cacs[currentCache].lat));

  //alert(target_u_coord);
  //alert(target_v_coord);
  target.style.left = target_u_coord + "px";
  target.style.top = target_v_coord + "px";
}

function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation)
    {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
    case error.PERMISSION_DENIED:
        errorstr = "Permission deined";
        break;
    case error.POSITION_UNAVAILABLE:
        errorstr = "Permission unavailable";
        break;
    case error.TIMEOUT:
        errorstr = "Timeout";
        break;
    case error.UNKNOWN_ERROR:
        error = "Unknown error";
        break;
    }
    alert("GPS error " + error);
}


function showPosition(position)
{
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");

    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;

    var u_coord = interpolate(-79.50562, -79.503066, 300, 200, parseFloat(position.coords.longitude));
    var v_coord = interpolate(43,773415, 43.773065, 250, 300, parseFloat(position.coords.latitude));
    var target = document.getElementById("target");
    var me = document.getElementById("me");
    me.style.top= u_coord + "px";
    me.style.left= v_coord + "px";
    var debug = document.getElementById("debug");
    debug.innerHTML = "(" + parseInt(u_coord) + "," + parseInt(v_coord) + ")";
    if (firstTime < 0)
    {
      firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;
}


function interpolate(gps1, gps2, u1, u2, gps)
{
      return u1+ (u2-u1)*(gps-gps1)/(gps2-gps1);
      //return(gps - gps1)*1/((gps2-gps1)/(u2-u1)) + u1;
}
