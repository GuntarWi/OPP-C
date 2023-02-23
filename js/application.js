


tableau.extensions.initializeAsync().then(function () {
    // Get the worksheet named "work1"
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === 'work1');
  
    // Get the data from the worksheet


    function LoadGameExample(){
      worksheet.getSummaryDataAsync().then(function (sumdata) {
        const data = sumdata.data;
        const rowData = [];
        const Uniqueidentifier = [];
        const RoundExamples = [];
        let Banker = 0;
        let Player = 0;
    //    $('#my-table').DataTable().clear().destroy();
        $(".butoon-container").empty();
        $(".UserData").empty();
        // Loop through each row of data and convert to an object
        for (let i = 0; i < data.length; i++) {
  
          if (!Uniqueidentifier.some(obj => obj.Uniqueidentifier === data[i][2].value + data[i][3].value)) {
              Uniqueidentifier.push({ Uniqueidentifier: data[i][2].value + data[i][3].value, UniqueGroup: String.fromCharCode(65 + Uniqueidentifier.length) });
  /*
              var button = $("<button/>", {
                "data-Uniqueidentifier": data[i][2].value + data[i][3].value,
                //text: String.fromCharCode(65 + Uniqueidentifier.length),
                text: data[i][2].value + " " +data[i][3].value,
                "data-UniqueGroup": String.fromCharCode(65 + Uniqueidentifier.length),
                id: "333"
  
              });
  */

              var button = $("<button/>", {
                "data-Uniqueidentifier": data[i][2].value + data[i][3].value,
                "data-UniqueGroup": String.fromCharCode(65 + Uniqueidentifier.length),
                id: "333"
              }).append(
                '<a href="#_" class="inline-flex overflow-hidden text-white bg-gray-900 rounded group">\n' +
                '  <span class="px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center">\n' +
                '    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>\n' +

                '<p class="margin-l"> '+data[i][3].value+'</p>\n' +
                '  </span>\n' +
                '  <span class="pl-4 pr-5 py-2.5">'+data[i][2].value+'</span>\n' +
                '</a>'
              );
              
              $(".butoon-container").append(button);
            }

  
            if(data[i][8].value == "BANKER"){
              Banker += data[i][10].value;
            }else if (data[i][8].value == "PLAYER"){
              Player += data[i][10].value;
            }
  
          const rowObj = {
              Createdate: data[i][0].formattedValue,
              Gameid: data[i][1].value,
              Partner: data[i][2].value,
              SubPartner: data[i][3].value,
              UserId: data[i][4].value,
              UserName: data[i][5].value,
              TableType: data[i][6].value,
              TableId: data[i][7].value,
              BetPosition: data[i][8].value,
              Currency: data[i][9].value,
              Amount: data[i][10].value,
              Net: data[i][11].value,
              UniqueGroup: "no",
              Uniqueidentifier: data[i][2].value + data[i][3].value
          };
    
          // Add the row object to the array
  
          for(let Y = 0; Y < Uniqueidentifier.length; Y++){
              if(data[i][2].value + data[i][3].value == Uniqueidentifier[Y].Uniqueidentifier){
                  rowObj.UniqueGroup = Uniqueidentifier[Y].UniqueGroup
              }
          }
  
  
          rowData.push(rowObj);
  

        }
  
        console.log(rowData)
  
     //   console.log(Uniqueidentifier)


function PlayerExampleGenerator(){
  const uniqueGameIds = [...new Set(rowData.map(item => item.Gameid))];
  const resultArray = [];
  
  uniqueGameIds.forEach(gameId => {
    const gameData = { gameId: gameId };
    const playersInGame = [];
  
    rowData.forEach(item => {
      if (item.Gameid === gameId) {
        const betPosition = item.BetPosition;
        gameData[betPosition] = (gameData[betPosition] || 0) + item.Amount;
        playersInGame.push(item.UserId);
      }
    });
  
    gameData.players = [...new Set(playersInGame)];
    gameData.difference = (gameData.BANKER || 0) - (gameData.PLAYER || 0);
    gameData.differencePercentage = ((gameData.BANKER || 0) - (gameData.PLAYER || 0)) / (gameData.PLAYER || 1) * 100;
    resultArray.push(gameData);
  });
  
  const filteredArray = [];
  
  resultArray.forEach(gameData => {
    gameData.players.forEach(playerName => {
      const existingData = filteredArray.find(item => item.UserId === playerName);
      if (!existingData && gameData.differencePercentage <= 45) {
        filteredArray.push({
          UserId: playerName,
          gameId: gameData.gameId,
          BANKER: gameData.BANKER || 0,
          PLAYER: gameData.PLAYER || 0,
          difference: gameData.difference || 0,
          differencePercentage: gameData.differencePercentage || 0
        });
      }
    });
  });
  
const matchingRows = rowData.filter(row => filteredArray.some(filteredRow => filteredRow.gameId === row.Gameid));

console.log(resultArray);
console.log(filteredArray);
console.log(matchingRows);

GenerateHtmalTable(matchingRows)
}
    

//PlayerExampleGenerator()


    
function GenerateHtmalTable(matchingRows){

        var data = matchingRows || rowData;

       $('#my-table').DataTable().clear().destroy();
          // Add the row data to the HTML table
          const table = document.getElementById("my-table");
          const tbody = table.getElementsByTagName("tbody")[0];
      
          for (let i = 0; i < data.length; i++) {
            const row = tbody.insertRow();
      
            const Createdate = row.insertCell(0);
            Createdate.innerHTML = data[i].Createdate;
      
            const Gameid = row.insertCell(1);
            Gameid.innerHTML = data[i].Gameid;
    
            const Partner = row.insertCell(2);
            Partner.innerHTML = data[i].Partner;
            //Partner.classList.add("category");
            Partner.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            Partner.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            Partner.setAttribute("data-Partner", data[i].Partner);
    
    
            const SubPartner = row.insertCell(3);
            SubPartner.innerHTML = data[i].SubPartner;
            SubPartner.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            SubPartner.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            SubPartner.setAttribute("data-SubPartner", data[i].SubPartner);
    
            const UserId = row.insertCell(4);
            UserId.innerHTML = data[i].UserId;
            UserId.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            UserId.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            UserId.setAttribute("data-UserId", data[i].UserId);
    
            const UserName = row.insertCell(5);
            UserName.innerHTML = data[i].UserName;
            UserName.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            UserName.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            UserName.setAttribute("data-UserName", data[i].UserName);
    
            const TableType = row.insertCell(6);
            TableType.innerHTML = data[i].TableType;
    
            const TableId = row.insertCell(7);
            TableId.innerHTML = data[i].TableId;
    
            const BetPosition = row.insertCell(8);
            BetPosition.innerHTML = data[i].BetPosition;
    
            const Currency = row.insertCell(9);
            Currency.innerHTML = data[i].Currency;
    
    
            const Amount = row.insertCell(10);
            Amount.innerHTML = data[i].Amount;
    
    
            const Net = row.insertCell(11);
            Net.innerHTML = data[i].Net;
    
    
    
    
    
    
    
          }
}
  
GenerateHtmalTable()

  $(".banker").html(Banker)
  $(".player").html(Player)

  $("#example-btn").on("click", function() {
  //  $(".butoon-container").empty()
  PlayerExampleGenerator()
  });

  
  
  
  $('button[data-Uniqueidentifier]').click(function() {
    var clickedUniqueId = $(this).attr('data-Uniqueidentifier');
    $('td[data-Uniqueidentifier]').each(function() {
      var tdUniqueId = $(this).attr('data-Uniqueidentifier');
      if (tdUniqueId !== clickedUniqueId) {
       // $(this).html($(this).attr("data-UniqueGroup"));
      //  console.log($(this).attr("data-UniqueGroup"))
  
     // console.log($(this).html($(this).attr("data-UniqueGroup")))
  
     if($(this).is('[data-userid]')){
  
      let UserIdY = $(this).attr('data-userid')
        console.log(UserIdY)
        $(this).html("User ID " + $(this).attr("data-uniquegroup"))
  
  
     }else if($(this).is('[data-partner]')){
      $(this).html("Partner " + $(this).attr("data-uniquegroup"))
     }else if($(this).is('[data-subpartner]')){
      $(this).html("subpartner " + $(this).attr("data-uniquegroup"))
     }else if($(this).is('[data-username]')){
      $(this).html("UserName  " + $(this).attr("data-uniquegroup"))
     }
      }else{
        if($(this).is('[data-userid]')){
  
          let UserIdY = $(this).attr('data-userid')
            console.log(UserIdY)
            $(this).html($(this).attr('data-userid'))
      
      
         }else if($(this).is('[data-partner]')){
          $(this).html($(this).attr('data-partner'))
         }else if($(this).is('[data-subpartner]')){
          $(this).html($(this).attr('data-subpartner'))
         }else if($(this).is('[data-username]')){
          $(this).html($(this).attr('data-username'))
         }
      }
    });
  });
  
  
  
      });
    }


    $("#load").on("click", function() {
      $(".butoon-container").empty()
      LoadGameExample()
    });
  });




  function LoadDataTables(){
    $('#my-table').DataTable({
      "searching": false,
      "bPaginate": false,
      "ordering": false,
      stateSave: true,
    "bDestroy": true,
      dom: 'Bfrtip',
      buttons: [{
        extend: 'excelHtml5',
        title: '',
        text: 'Excel',
        
        customize: function(xlsx) {
          var sheet = xlsx.xl.worksheets['sheet1.xml'];

          // jQuery selector to add a border
          $('row c[r]', sheet).attr('s', ['25','51']);
          $('row:first c', sheet).attr('s', '47');
        },
      }]

    });
  }

  $("#export-btn").on("click", function() {
    
    LoadDataTables()
    $(".buttons-excel").trigger("click");
 //   $('#my-table').DataTable().clear().destroy();
  });




