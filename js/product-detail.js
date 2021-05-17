/*
const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);
*/
var data1 = [];
var data2 = [];
const urls= [
    "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/1/public/full?alt=json",
    "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/2/public/full?alt=json"
  ];




urls.forEach(url => {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    
    //console.log(data);
    if (url == "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/1/public/full?alt=json") {
        //console.log("url1");
        data1 = (data.feed.entry);
        //console.log(data1.length);
        document.getElementById("totalPerson").innerHTML = data1.length;
    } else if (url == "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/2/public/full?alt=json") {
        //console.log("url2");
        data2 = (data.feed.entry);
        //console.log(data2.length);
        document.getElementById("totalTeam").innerHTML = data2.length;
    }
    
    }
    
    request.send();
});

/*

$(document).ready(function(){
    $("#PersonSubmit").click(function(){
        console.log("ok");
        
        data1.forEach(id => {
            if (id.gsx$id.$t == ($("#PersonId").val()) ) {
                console.log(id.gsx$name.$t);
                document.getElementById("PersonName").innerHTML = id.gsx$name.$t;
                document.getElementById("PersonYOB").innerHTML = ("Năm sinh: " + id.gsx$yob.$t);
                document.getElementById("PersonPosition").innerHTML = ("Chức vụ: " + id.gsx$position.$t);
                document.getElementById("PersonAction").innerHTML = ("Thành tích: " + id.gsx$action.$t);
                document.getElementById("PersonTopic").innerHTML = ("Mô hình giải pháp: " + id.gsx$topic.$t);
            }
        });
    });
});
*/

$(document).ready(function(){
    $("#PersonId").on("keyup", function() {
        var searchFieldPerson = $(this).val().toLowerCase();
        if(searchFieldPerson === '')  {
            document.getElementById("PersonName").innerHTML = ("HỌ VÀ TÊN");
            document.getElementById("PersonYOB").innerHTML = ("Năm sinh: ");
            document.getElementById("PersonPosition").innerHTML = ("Chức vụ: ");
            document.getElementById("PersonAction").innerHTML = ("Thành tích: ");
            document.getElementById("PersonTopic").innerHTML = ("Mô hình giải pháp: ");
            document.getElementById("PersonImg").src = ("./images/person.PNG");
            return;
        }
        var regexPerson = new RegExp(searchFieldPerson, "i");

        $.each(data1, function(key, val){
            if (val.gsx$name.$t.search(regexPerson) != -1) {
                //console.log(val.gsx$name.$t);
                document.getElementById("PersonName").innerHTML = val.gsx$name.$t;
                document.getElementById("PersonYOB").innerHTML = ("Năm sinh: " + val.gsx$yob.$t);
                document.getElementById("PersonPosition").innerHTML = ("Chức vụ: " + val.gsx$position.$t);
                document.getElementById("PersonAction").innerHTML = ("Thành tích: " + val.gsx$action.$t);
                document.getElementById("PersonTopic").innerHTML = ("Mô hình giải pháp: " + val.gsx$topic.$t);
                document.getElementById("PersonImg").src = val.gsx$pic.$t;
                ///console.log(val.gsx$pic.$t);
            }
          });
    });

    $("#TeamId").on("keyup", function() {
        var searchFieldTeam = $(this).val().toLowerCase();
        if(searchFieldTeam === '')  {
            document.getElementById("TeamName").innerHTML = ("HỌ VÀ TÊN");
            document.getElementById("TeamTopic").innerHTML = ("Thành tích");
            document.getElementById("TeamImg").src = ("./images/group.PNG");
            return;
        }
        var regexTeam = new RegExp(searchFieldTeam, "i");

        $.each(data2, function(key, val){
            if (val.gsx$org.$t.search(regexTeam) != -1) {
                //console.log(val.gsx$org.$t);
                document.getElementById("TeamName").innerHTML = val.gsx$org.$t;
                document.getElementById("TeamTopic").innerHTML = ("Thành tích: " + val.gsx$topic.$t);
                document.getElementById("TeamImg").src = val.gsx$pic.$t;
                ///console.log(val.gsx$pic.$t);
            }
          });
    });

});
