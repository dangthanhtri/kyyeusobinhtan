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
const urls= ["https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/1/public/full?alt=json","https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/2/public/full?alt=json"];
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
            //CONSTRUCTION OF ROWS HAVING
            // DATA FROM JSON OBJECT
            person += '<tr>';
            person += '<td>' + 
                value.gsx$id.$t + '</td>';
            person += '<td>' + 
                value.gsx$name.$t + '</td>';
            person += '<td>' + 
                value.gsx$position.$t + '</td>';
            person += '<td>' + 
                value.gsx$yob.$t + '</td>';
            person += '</tr>';
        });
        //INSERTING ROWS INTO TABLE 
        $('#personTable').append(person);
        highlight_row_person();
        
    } else if (url == "https://spreadsheets.google.com/feeds/list/1ic-Kuy8TWAEc6u0IsareNm-wsZCgYtxJ-QHJbo_VIcw/2/public/full?alt=json") {
        //console.log("url2");
        data2 = (data.feed.entry);
        //console.log(data2.length);
        document.getElementById("totalTeam").innerHTML = data2.length;

        var team = '';
        // ITERATING THROUGH OBJECTS
        $.each(data2, function (key, value) {
            //CONSTRUCTION OF ROWS HAVING
            // DATA FROM JSON OBJECT
            team += '<tr>';
            team += '<td>' + 
                value.gsx$id.$t + '</td>';
            team += '<td>' + 
                value.gsx$org.$t + '</td>';
            team += '</tr>';
        });
        //INSERTING ROWS INTO TABLE 
        $('#teamTable').append(team);
        highlight_row_team();
    }
    }
    request.send();

    $("#PersonInput").on("keyup", function() {
        var value1 = $(this).val().toLowerCase();
        $("#personTable tr").filter(function() {
          $(this).toggle($(this).text()
          .toLowerCase().indexOf(value1) > -1)
        });
    });
    
    $("#TeamInput").on("keyup", function() {
        var value2 = $(this).val().toLowerCase();
        $("#teamTable tr").filter(function() {
          $(this).toggle($(this).text()
          .toLowerCase().indexOf(value2) > -1)
        });
    });
    
});




function highlight_row_person() {
    var table1 = document.getElementById('personTable');
    var cells = table1.getElementsByTagName('td');
    
    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;
            var rowSelected = table1.getElementsByTagName('tr')[rowId];
            rowSelected.className += " selected";
            var personId = rowSelected.cells[0].innerHTML;
            $.each(data1, function(key, val){
                if ((val.gsx$id.$t) == (personId - 1)) {                 
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
            //openPersonScr();
            switchView('personScr');
        }
    }
}

function highlight_row_team() {
    var table2 = document.getElementById('teamTable');
    var cells = table2.getElementsByTagName('td');
    
    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;
            var rowSelected = table2.getElementsByTagName('tr')[rowId];
            rowSelected.className += " selected";
            var teamId = rowSelected.cells[0].innerHTML;
            $.each(data2, function(key, val){
                if ((val.gsx$id.$t) == (teamId - 1)) {                 
                    document.getElementById("TeamName").innerHTML = val.gsx$org.$t;
                    document.getElementById("TeamImg").src = val.gsx$pic.$t;
                    document.getElementById("TeamTopic").innerHTML = ("Thành tích: " + val.gsx$topic.$t);
                    $("#TeamInput").val('');
                }
            });
            switchView('teamScr');
        }
    }
}

/*
$(document).ready(function(){
    $("#PersonId").on("keyup", function() {

        var searchFieldPerson = $(this).val().toLowerCase();
        if(searchFieldPerson === '')  {
            document.getElementById("PersonName").innerHTML = ("HỌ VÀ TÊN");
            document.getElementById("PersonYOB").innerHTML = ("Năm sinh");
            document.getElementById("PersonPosition").innerHTML = ("Chức vụ");
            document.getElementById("PersonAction").innerHTML = ("");
            document.getElementById("PersonTopic").innerHTML = ("");
            document.getElementById("PersonImg").src = ("./images/person.PNG");
            return;
        }
        var regexPerson = new RegExp(searchFieldPerson, "i");

        $.each(data1, function(key, val){
            if (val.gsx$name.$t.search(regexPerson) != -1) {
                document.getElementById("PersonName").innerHTML = val.gsx$name.$t;
                document.getElementById("PersonYOB").innerHTML = ("Năm sinh: " + val.gsx$yob.$t);
                document.getElementById("PersonPosition").innerHTML = ("Chức vụ: " + val.gsx$position.$t);
                if ((val.gsx$topic.$t) != -1) {
                    document.getElementById("PersonTopic").innerHTML = "";
                } else document.getElementById("PersonTopic").innerHTML = ("Mô hình giải pháp: " + val.gsx$topic.$t);
                $( "#PersonSubmit" ).click(function() {
                    document.getElementById("PersonImg").src = val.gsx$pic.$t;
                    document.getElementById("PersonAction").innerHTML = ("Thành tích: " + val.gsx$action.$t);
                    $("#PersonId").val('');
                  });
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
                document.getElementById("TeamName").innerHTML = val.gsx$org.$t;
                $( "#TeamSubmit" ).click(function() {
                    document.getElementById("TeamImg").src = val.gsx$pic.$t;
                    document.getElementById("TeamTopic").innerHTML = ("Thành tích: " + val.gsx$topic.$t);
                    $("#TeamId").val('');
                  });
            }
          });
    });

});
*/