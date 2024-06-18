        //상자깡 이미지


                document.getElementById('openBox').addEventListener('click', function() {
                    getRandomSkins();
                    
                    var count = document.getElementById('count');
                    count.innerText= '횟수: ' + boxCount;
                    
                        var boxResultImage = document.getElementById('resultImage');
                        var boxResultText = document.getElementById('boxResultText');
                        
                        var tempImg = new Image();
            tempImg.src = randomSkins[boxCount -1].imageUrl;
            tempImg.onload = function() {
                boxResultImage.style.backgroundImage = "url(" + randomSkins[boxCount -1].imageUrl + ")";
                boxResultText.innerText = randomSkins[boxCount -1].name;
            };
                    
                    

                    document.getElementById('boxImage').src = '../img/boxOpening.gif';

      setTimeout(function() {
        var myModal = new bootstrap.Modal(document.getElementById('testModal'));
        myModal.show();
      }, 1900); 

    });

    
    
    document.getElementById('btn-close').addEventListener('click',function(){
      
      document.getElementById('boxImage').src = '../img/Masterwork_Chest.gif';
                      //결과목록에 추가
                      var ul = document.getElementById('resultUl');

             
var Img = new Image();
Img.src =  randomSkins[boxCount -1].tiles;
Img.onload = function() {
ul.insertAdjacentHTML('beforeend', '<li><img src="' + randomSkins[boxCount -1].tiles + '">' + randomSkins[boxCount -1].name+ '</li>');
};
    });
    
    document.getElementById('reset').addEventListener('click', function() {
        document.location.reload();

    });
    

    document.getElementById('getAllSkin').addEventListener('click', function() {

                      //결과목록에 추가
                      var ul = document.getElementById('allSkin');

             

for (let i = 0; i < allSkins.length; i++) {

    var Img = new Image();
Img.src =  allSkins[i].tiles;
Img.onload = function() {
ul.insertAdjacentHTML('beforeend', '<li><img src="' + allSkins[i].tiles + '">' + allSkins[i].name+ '</li>');
}


            }
        var skinModal = new bootstrap.Modal(document.getElementById('skinModal'));
        skinModal.show();
    });
    

// 롤 api
var urlAPI = "https://ddragon.leagueoflegends.com/cdn/14.10.1/data/ko_KR/champion.json";
        var allSkins = [];
        const randomSkins = [];
        let boxCount = 0;

        
        $.ajax({
            type: "GET",
            url: urlAPI,
            dataType: "json",
            async: false, // 동기 상태 => ajax는 기본적으로 비동기다.
            success: function (data) {
                const champions = data.data;

                // 모든 챔피언에 대해 개별 요청
                for (const key in champions) {
                    if (champions.hasOwnProperty(key)) {
                        const champion = champions[key];
                        //console.log("key=" + key);
                        fetchChampionSkins(champion.id);
                        
                    }
                    
                }
                
            },
            error: function (request, status, error) {
                console.log("code:" + request.status);
                console.log("message:" + request.responseText);
                console.log("error:" + error);
            },
        });

        function fetchChampionSkins(championId) {
            var championDetailAPI = `https://ddragon.leagueoflegends.com/cdn/14.10.1/data/ko_KR/champion/${championId}.json`;

            $.ajax({
                type: "GET",
                url: championDetailAPI,
                dataType: "json",
                async: false,
                success: function (data) {
                    const championData = data.data[championId];
                    const skins = championData.skins;

                    // 각 스킨 이미지 URL 생성 및 출력
                    skins.forEach(skin => {
                        const skinImageUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${championId}_${skin.num}.jpg`;
                        const skinTilesImageUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${championId}_${skin.num}.jpg`;
                        
                        if(skin.num != 0){
                        allSkins.push({
                            name: skin.name,
                            imageUrl: skinImageUrl,
                            tiles: skinTilesImageUrl
                        });
                    }
                    });
                },
                error: function (request, status, error) {
                    console.log("code:" + request.status);
                    console.log("message:" + request.responseText);
                    console.log("error:" + error);
                },
            });
        }
        function getRandomSkins() {
            
            const skinCount = allSkins.length;

            for (let i = 0; i < 1; i++) {
                const randomIndex = Math.floor(Math.random() * skinCount);
                randomSkins.push(allSkins[randomIndex]);

                boxCount++
                

                console.log("count: " + boxCount);
                console.log("skin: " + allSkins[randomIndex].name);
            }
                
        }

        