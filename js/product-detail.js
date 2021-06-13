var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
const urls= ["https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/1/public/full?alt=json",
"https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/2/public/full?alt=json",
"https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/3/public/full?alt=json",
"https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/4/public/full?alt=json",];
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
        //console.log(data1);
        
        var person = '';
        // ITERATING THROUGH OBJECTS
        $.each(data1, function (key, value) {
            const card = document.createElement('div');
            card.setAttribute('class', 'show-card');
            card.setAttribute('onclick', 'ct05PersonDetail(this.id)');
            card.setAttribute('id', value.gsx$name.$t);
            const img = document.createElement('img');
            img.src = value.gsx$pic.$t;
            const h1 = document.createElement('h1');
            h1.setAttribute('class', 'title-card');
            h1.textContent = value.gsx$name.$t;
            document.getElementById("ct05-person").appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
        });
    } else if (url == "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/2/public/full?alt=json") {
        //console.log("url2");
        data2 = (data.feed.entry);
        //console.log(data2.length);
        document.getElementById("totalTeam").innerHTML = data2.length;

        var team = '';
        // ITERATING THROUGH OBJECTS
        $.each(data2, function (key, value) {
            const card = document.createElement('div');
            card.setAttribute('class', 'show-card');
            card.setAttribute('onclick', 'ct05TeamDetail(this.id)');
            card.setAttribute('id', value.gsx$org.$t);
            const img = document.createElement('img');
            img.src = value.gsx$pic.$t;
            const h1 = document.createElement('h1');
            h1.setAttribute('class', 'title-card');
            h1.textContent = value.gsx$org.$t;
            document.getElementById("ct05-team").appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
        });
    } 
    else if (url == "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/3/public/full?alt=json") {
        data3 = (data.feed.entry);
        $.each(data3, function (key, value) {
            const card = document.createElement('div');
            card.setAttribute('class', 'show-card-news');
            card.setAttribute('onclick', 'newsDetail(this.id)');
            card.setAttribute('id', value.gsx$id.$t);
            const h1 = document.createElement('h1');
            h1.setAttribute('class', 'title-card');
            h1.textContent = value.gsx$title.$t;
            document.getElementById("newsItem").appendChild(card);
            card.appendChild(h1);
        });
    }
    else if (url == "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/4/public/full?alt=json") {
        data4 = (data.feed.entry);
        var videos = '';
        $.each(data4, function (key, value) {
            var x = document.createElement("IFRAME");
            x.setAttribute("src", value.gsx$link.$t);
            x.setAttribute("width", "320");
            x.setAttribute("height", "240");
            x.setAttribute("allowFullScreen", "false")
            document.getElementById('videosDiv').appendChild(x);
        });
    }
    }
    request.send();    
});


function ct05PersonSearch() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("ct05_PersonInput");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("ct05-person");
    cards = cardContainer.getElementsByClassName("show-card");
    for (i = 0; i < cards.length; i++) {
      title = cards[i].querySelector(".title-card");
      if (title.innerText.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }

function ct05PersonDetail(id) {
    $.each(data1, function (key, val) {
        if ((val.gsx$name.$t) == id) {
            document.getElementById("PersonName").innerHTML = val.gsx$name.$t;
            document.getElementById("PersonYOB").innerHTML = ("Năm sinh: " + val.gsx$yob.$t);
            document.getElementById("PersonPosition").innerHTML = ("Chức vụ: " + val.gsx$position.$t);
            document.getElementById("PersonImg").src = val.gsx$pic.$t;
            document.getElementById("PersonAction").innerHTML = ("Thành tích: " + val.gsx$action.$t);
            $("#PersonInput").val('');
            if ((val.gsx$topic.$t) != -1) {
                document.getElementById("PersonTopic").innerHTML = "";
            } else document.getElementById("PersonTopic").innerHTML = ("Mô hình giải pháp: " + val.gsx$topic.$t);
        }
    });
    switchView('personScr');
}

function ct05TeamSearch() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("ct05_TeamInput");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("ct05-team");
    cards = cardContainer.getElementsByClassName("show-card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".title-card");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function ct05TeamDetail(id) {
    $.each(data2, function(key, val){
      if ((val.gsx$org.$t) == id) {                 
        document.getElementById("TeamName").innerHTML = val.gsx$org.$t;
        document.getElementById("TeamImg").src = val.gsx$pic.$t;
        document.getElementById("TeamTopic").innerHTML = ("Thành tích: " + val.gsx$topic.$t);
        $("#TeamInput").val('');
      }
      });
      switchView('teamScr');
}

function newsDetail(id) {
    var y = document.getElementById('newsDiv');
    var elements = y.getElementsByTagName("iframe");
    while (elements.length) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    $.each(data3, function(key, val){
      if (val.gsx$id.$t == id) {                 
          console.log(val.gsx$link.$t);
        var x = document.createElement("IFRAME");
            x.setAttribute("src", val.gsx$link.$t);
            document.getElementById('newsDiv').appendChild(x);
      }
      });
      switchView('newsScr');
}