<?php 
    require_once("src/config.php");
    require_once(TEMPLATES_PATH . "/header.php");

    # Colors
    $c1 = "#f7bd00";
    $c2 = "#0099f7";
    $c3 = "#ae00ff";
    $c4 = "#db2100";
    $c5 = "#11c24c";

    # Ratings
    $r1 = 60;
    $r2 = 78;
    $r3 = 21;
    $r4 = 72;
    $r5 = 89;
?>
<div style="display:none;">
    <var id="c1"><?php echo $c1?></var>
    <var id="c2"><?php echo $c2?></var>
    <var id="c3"><?php echo $c3?></var>
    <var id="c4"><?php echo $c4?></var>
    <var id="c5"><?php echo $c5?></var>

    <var id="r1"><?php echo $r1?></var>
    <var id="r2"><?php echo $r2?></var>
    <var id="r3"><?php echo $r3?></var>
    <var id="r4"><?php echo $r4?></var>
    <var id="r5"><?php echo $r5?></var>
</div>


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
            <div class="col-xl-3 col-lg-4 col-4">
                <!-- Thumbnail -->
                <a href="https://www.youtube.com/watch?v=pIUTKOvPc4I" class="trailer-link" target="_blank">
                    <div class="trailer-img-wrap">
                        <img class="trailer-img" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg" />
                        <p class="watch-trailer"><i class="fa fa-play"></i><br>Watch Trailer!</p>
                    </div>
                </a>
            </div>
            <div class="col-xl-9 col-lg-8 col-8">
                <h1 class="game-title">Fire Emblem: Three Houses</h1>
                
                <!-- Favorite -->
                <form>
                    <button class="btn btn-danger">
                        <i class="fa fa-heart"></i>
                            Favorite
                    </button>
                    <span style="margin-left: 10px;">2213 favorites!</span>
                </form>

                <!-- Details -->
                <!-- Desktop -->
                <div class="d-none d-md-block">
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
            </div>
        </div>
        <!-- Details -->
        <!-- Mobile -->
        <div class="container row d-block d-md-none"><br>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#rates">Ratings</a>
                </li>    
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#deet">Details</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#summ">Summary</a>
                </li>
            </ul>
            <div class="tab-content">
                <div id="rates" class="tab-pane active">
                    <div class="rates">
                        <div class="row">
                            <!-- Mobile -->
                            <!-- <div class="col-1"></div> -->
                            <div class="col-2 d-md-none mobile-rating" style="color: <?php echo $c1 ?>">
                                <h2 id="r1head" class="rating-header"><i class="fa fa-book"></i><br><?php echo $r1?></h2>
                            </div>
                            <div class="col-2 d-md-none mobile-rating" style="color: <?php echo $c2 ?>">
                                <h2 id="r2head" class="rating-header"><i class="fa fa-gamepad"></i><br><?php echo $r2?></h2>
                            </div>
                            <div class="col-2 d-md-none mobile-rating" style="color: <?php echo $c3 ?>">
                                <h2 id="r3head" class="rating-header"><i class="fa fa-paint-brush"></i><br><?php echo $r3?></h2>
                            </div>
                            <div class="col-2 d-md-none mobile-rating" style="color: <?php echo $c4 ?>">
                                <h2 id="r4head" class="rating-header"><i class="fa fa-bolt"></i><br><?php echo $r4?></h2>
                            </div>
                            <div class="col-2 d-md-none mobile-rating" style="color: <?php echo $c5 ?>">
                                <h2 id="r5head" class="rating-header"><i class="fa fa-money"></i><br><?php echo $r5?></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="deet" class="tab-pane fade">
                    <div class="quick-deets">
                        <h5>Released: <span class="detail-card-info">July 25th, 2019</span></h5>
                        <h5>Developer(s): <span class="detail-card-info">Intelligent Systems, Nintendo</span></h5>
                        <h5>Platform(s): <span class="detail-card-info">Nintendo Switch</span></h5>
                        <h5>Genre(s): <span class="detail-card-info">Adventure, RPG, Tactics, Turn-Based Strategy</span></h5>
                    </div>
                </div>
                <div id="summ" class="tab-pane fade">
                    <div class="details-summary">
                        <p>Here, order is maintained by the Church of Seiros, which hosts the prestigious Officer’s Academy within its headquarters. You are invited to teach one of its three mighty houses, each comprised of students brimming with personality and represented by a royal from one of three territories. As their professor, you must lead your students in their academic lives and in turn-based, tactical RPG battles wrought with strategic, new twists to overcome. Which house, and which path, will you choose? <span><a href="https://www.igdb.com/games/fire-emblem-three-houses">Read more...</a></span></p>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</div>

<div class="container">
    
    <br>
    <div class="row">
        <div class="col-1"></div>
        <div class="col-2" style="color: <?php echo $c1 ?>">
            <!-- Desktop -->
            <div id="gauge1" class="gauge-container three d-none d-md-block">
                <h2 id="r1head" class="rating-header"><i class="fa fa-book"></i> Story</h2>
            </div>
        </div>
        <div class="col-2" style="color: <?php echo $c2 ?>">
            <!-- Desktop -->
            <div id="gauge2" class="gauge-container three d-none d-md-block">
                <h2 id="r2head" class="rating-header"><i class="fa fa-gamepad"></i> Gameplay</h2>
            </div>
        </div>
        <div class="col-2" style="color: <?php echo $c3 ?>">
            <!-- Desktop -->
            <div id="gauge3" class="gauge-container three d-none d-md-block">
                <h2 id="r3head" class="rating-header"><i class="fa fa-paint-brush"></i> Art/Music</h2>
            </div>
        </div>
        <div class="col-2" style="color: <?php echo $c4 ?>">
            <!-- Desktop -->
            <div id="gauge4" class="gauge-container three d-none d-md-block">
                <h2 id="r4head" class="rating-header"><i class="fa fa-bolt"></i> Difficulty</h2>
            </div>
        </div>
        <div class="col-2" style="color: <?php echo $c5 ?>">
            <!-- Desktop -->
            <div id="gauge5" class="gauge-container three d-none d-md-block">
                <h2 id="r5head" class="rating-header"><i class="fa fa-money"></i> Worth It?</h2>
            </div>
        </div>
        <p class="d-none d-md-block col-12" style="text-align:center; margin-top:10px; font-style:italic;">Scored by 2391 users</p>
        
    </div><br>
    <form style="text-align:center;">
        <input class="btn btn-success rating-button" type="submit" value="Leave a Rating!"/>
    </form><br>

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
    $(document).ready(function() {
        // Get PHP properties
        const c1 = document.getElementById("c1").innerHTML;
        const c2 = document.getElementById("c2").innerHTML;
        const c3 = document.getElementById("c3").innerHTML;
        const c4 = document.getElementById("c4").innerHTML;
        const c5 = document.getElementById("c5").innerHTML;

        let r1 = parseInt(document.getElementById("r1").innerHTML);
        let r2 = parseInt(document.getElementById("r2").innerHTML);
        let r3 = parseInt(document.getElementById("r3").innerHTML);
        let r4 = parseInt(document.getElementById("r4").innerHTML);
        let r5 = parseInt(document.getElementById("r5").innerHTML);

        // Set colors of each gauge
        let gauge1 = Gauge(document.getElementById("gauge1"), {color: () => {return c1}});
        let gauge2 = Gauge(document.getElementById("gauge2"), {color: () => {return c2}});
        let gauge3 = Gauge(document.getElementById("gauge3"), {color: () => {return c3}});
        let gauge4 = Gauge(document.getElementById("gauge4"), {color: () => {return c4}});
        let gauge5 = Gauge(document.getElementById("gauge5"), {color: () => {return c5}});

        // Gauge animations
        gauge1.setValueAnimated(r1,1);
        gauge2.setValueAnimated(r2,1.1);
        gauge3.setValueAnimated(r3,1.2);
        gauge4.setValueAnimated(r4,1.3);
        gauge5.setValueAnimated(r5,1.4);
    });

    
    
    
</script>