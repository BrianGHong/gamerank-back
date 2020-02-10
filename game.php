<?php 
    require_once("src/config.php");
    require_once(TEMPLATES_PATH . "/header.php");
?>

<link rel="stylesheet" href= "public/css/gamepage.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.0.1/magnific-popup.min.css" rel="stylesheet">

<!-- Gauge -->
<link rel="stylesheet" href= "public/css/gauge.css">
<script src="public/js/gauge.min.js"></script>

<div style="
    background-image: url('https://images.igdb.com/igdb/image/upload/t_screenshot_big/ynbji1swyqkg0co3cgag.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    
    ">
    <div class="container detail-card"><br>
        <div class="row">
            <div class="col-3">
                <!-- Thumbnail -->
                <a href="https://www.youtube.com/watch?v=pIUTKOvPc4I" class="trailer-link" target="_blank">
                    <div class="trailer-img-wrap">
                        <img class="trailer-img" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg" />
                        <p class="watch-trailer"><i class="fa fa-play"></i><br>Watch Trailer!</p>
                    </div>
                </a>
            </div>
            <div class="col-9">
                <h1>Fire Emblem: Three Houses</h1>
                
                <!-- Favorite -->
                <form>
                    <button class="btn btn-danger">
                        <i class="fa fa-heart"></i>
                            Favorite
                    </button>
                    <span style="margin-left: 10px;">2213 people favorited this game!</span>
                </form>

                <!-- Details -->
                <div class="quick-deets">
                    <h5>Released: <span class="detail-card-info">July 25th, 2019</span></h5>
                    <h5>Developer(s): <span class="detail-card-info">Intelligent Systems, Nintendo</span></h5>
                    <h5>Platform(s): <span class="detail-card-info">Nintendo Switch</span></h5>
                    <h5>Genre(s): <span class="detail-card-info">Adventure, RPG, Tactics, Turn-Based Strategy</span></h5>
                </div>

                <!-- Summary -->
                <div class="details-summary">
                    <p>Here, order is maintained by the Church of Seiros, which hosts the prestigious Officer’s Academy within its headquarters. You are invited to teach one of its three mighty houses, each comprised of students brimming with personality and represented by a royal from one of three territories. As their professor, you must lead your students in their academic lives and in turn-based, tactical RPG battles wrought with strategic, new twists to overcome. Which house, and which path, will you choose? <span><a href="https://www.igdb.com/games/fire-emblem-three-houses">Read more...</a></span></p>
                </div>
            </div>
        </div><br>
    </div>
</div>

<div class="container">
    
    <br>
    <div class="row">
        <div class="col-1"></div>
        <div class="col-2" style="background-color: none;">
            <div id="gauge1" class="gauge-container three">
                <h2 id="r1head" class="rating-header"><i class="fa fa-book"></i> Story</h2>
            </div>
        </div>
        <div class="col-2" style="background-color: none;">
            <div id="gauge2" class="gauge-container three">
                <h2 id="r2head" class="rating-header"><i class="fa fa-gamepad"></i> <span style="font-size: 30px;">Gameplay</span></h2>
            </div>
        </div>
        <div class="col-2" style="background-color: none;">
            <div id="gauge3" class="gauge-container three">
                <h2 id="r3head" class="rating-header"><i class="fa fa-paint-brush"></i> Art/Music</h2>
            </div> 
        </div>
        <div class="col-2" style="background-color: none;">
            <div id="gauge4" class="gauge-container three">
                <h2 id="r4head" class="rating-header"><i class="fa fa-bolt"></i> Difficulty</h2>
            </div>
        </div>
        <div class="col-2" style="background-color: none;">
            <div id="gauge5" class="gauge-container three">
                <h2 id="r5head" class="rating-header"><i class="fa fa-money"></i> Worth It?</h2>
            </div>
        </div>
    </div>
    <br>
    <p style="text-align:center; margin:0; font-style:italic;">Scored by 2391 users</p>
    <br>
    <form style="text-align:center;">
        <input class="btn btn-success rating-button" type="submit" value="Leave a Rating!"/>
    </form>

    <h1>Comments</h1>
    <hr style="background:white;">
    <form class="form-group">
        <textarea name="comment" class="form-control">Enter comment here...</textarea><br>
        <input class="btn btn-success" type="submit">
    </form>
    <br>

    <!-- SAMPLE COMMENT -->
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10">
                    <h4 class="card-title">DemonSlayer6969 <span class="comment-date">(1/2/2020)</span></h4>
                    <p class="card-text">Best Fire Emblem game I've ever played since Awakening!</p>
                </div>
                <div class="col-2"><br>
                    <form style="text-align:center;">
                        <button class="btn btn-primary" type="submit">
                            <i class="fa fa-thumbs-up"></i>
                            Like
                        </button>
                        <p class="comment-like-num"><b>10</b> likes</p>
                    </form>
                </div>
            </div>
        </div>
    </div><br>

    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10">
                    <h4 class="card-title">YaBoi2004 <span class="comment-date">(1/19/2020)</span></h4>
                    <p class="card-text">This story completely blows Fire Emblem Fates' out of the water!!</p>
                </div>
                <div class="col-2"><br>
                    <form style="text-align:center;">
                        <button class="btn btn-primary" type="submit">
                            <i class="fa fa-thumbs-up"></i>
                            Like
                        </button>
                        <p class="comment-like-num"><b>4</b> likes</p>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <br>
    <?php 
        require_once(TEMPLATES_PATH . "/footer.php");
    ?>
</div>

<script>
    const c1 = "#f7bd00";
    const c2 = "#0099f7";
    const c3 = "#ae00ff";
    const c4 = "#db2100";
    const c5 = "#11c24c";

    // Set colors of each rating
    document.getElementById("r1head").setAttribute("style", "color: " + c1);
    document.getElementById("r2head").setAttribute("style", "color: " + c2);
    document.getElementById("r3head").setAttribute("style", "color: " + c3);
    document.getElementById("r4head").setAttribute("style", "color: " + c4);
    document.getElementById("r5head").setAttribute("style", "color: " + c5);

    // Set colors of each gauge
    let gauge1 = Gauge(document.getElementById("gauge1"), {color: () => {return c1}});
    let gauge2 = Gauge(document.getElementById("gauge2"), {color: () => {return c2}});
    let gauge3 = Gauge(document.getElementById("gauge3"), {color: () => {return c3}});
    let gauge4 = Gauge(document.getElementById("gauge4"), {color: () => {return c4}});
    let gauge5 = Gauge(document.getElementById("gauge5"), {color: () => {return c5}});

    // Gauge animations
    gauge1.setValueAnimated(60,1);
    gauge2.setValueAnimated(78,1.1);
    gauge3.setValueAnimated(21,1.2);
    gauge4.setValueAnimated(72,1.3);
    gauge5.setValueAnimated(89,1.4);

    // Trailer Popup Functionality
    $(document).ready(function() {
        $('#gameTrailerLink').magnificPopup({
            type:'inline',
            midClick: true
        });         
    });
</script>