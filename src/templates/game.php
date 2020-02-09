<!-- Gauge -->
<link rel="stylesheet" href= "public/css/gauge.css">
<script src="public/js/gauge.min.js"></script>

<h1>Fire Emblem: Three Houses</h1>

<div class="row">
    <div class="col-6">
        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg" />
    </div>
    <div class="col-6">

    </div>
</div>

<div class="row">
    <div class="col-2">
        <div id="gauge1" class="gauge-container three"></div>
        <h2 style="text-align:center; ">Story</h2>
    </div>
    <div class="col-2">
        <div id="gauge2" class="gauge-container three"></div>
        Gameplay
    </div>
    <div class="col-2">
        <div id="gauge3" class="gauge-container three"></div>
        Art/Music
    </div>
    <div class="col-2">
        <div id="gauge4" class="gauge-container three"></div>
        Difficulty    
    </div>
    
</div>

<script>
  let gauge1 = Gauge(document.getElementById("gauge1"), {color: () => {return "blue"}});
  let gauge2 = Gauge(document.getElementById("gauge2"), {color: () => {return "red"}});
  let gauge3 = Gauge(document.getElementById("gauge3"), {color: () => {return "green"}});
  let gauge4 = Gauge(document.getElementById("gauge4"), {color: () => {return "yellow"}});

  gauge1.setValueAnimated(60,1);
  gauge2.setValueAnimated(78,1.1);
  gauge3.setValueAnimated(21,1.2);
  gauge4.setValueAnimated(72,1.3);
</script>
