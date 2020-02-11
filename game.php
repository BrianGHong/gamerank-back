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
    $r5 = 100;
    $r_usercount = 1432;

    # Game Information
    $g_title = "Fire Emblem: Three Houses";
    $g_dor = "July 25th, 2019";
    $g_dev = "Intelligent Systems, Nintendo";
    $g_plat = "Nintendo Switch";
    $g_genre = "Adventure, RPG, Tactics, Turn-Based Strategy";
    $g_summary = "Here, order is maintained by the Church of Seiros, which hosts the prestigious Officer’s Academy within its headquarters. You are invited to teach one of its three mighty houses, each comprised of students brimming with personality and represented by a royal from one of three territories. As their professor, you must lead your students in their academic lives and in turn-based, tactical RPG battles wrought with strategic, new twists to overcome. Which house, and which path, will you choose? ";

    $g_favcount = 2340;

    $g_thumbnail = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg";
    $g_background = "https://images.igdb.com/igdb/image/upload/t_screenshot_big/ynbji1swyqkg0co3cgag.jpg";
    $g_trailer = "https://www.youtube.com/watch?v=pIUTKOvPc4I";
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
    background-image: url(<?php echo $g_background?>);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    
    ">
    <div class="container detail-card"><br>
        <div class="row">
            <div class="col-xl-3 col-lg-4 col-4">
                <!-- Thumbnail -->
                <a href="<? echo $g_trailer ?>" class="trailer-link" target="_blank">
                    <div class="trailer-img-wrap">
                        <img class="trailer-img" src="<?php echo $g_thumbnail ?>" />
                        <p class="watch-trailer"><i class="fa fa-play"></i><br>Watch Trailer!</p>
                    </div>
                </a>
            </div>
            <div class="col-xl-9 col-lg-8 col-8">
                <h1 class="game-title"><?php echo $g_title?></h1>
                
                <!-- Favorite -->
                <form>
                    <button class="btn btn-danger" style="border-radius: 20px;">
                        <i class="fa fa-heart"></i>
                            Favorite
                    </button>
                    <span style="margin-left: 10px;"><?php echo $g_favcount ?> favorite(s)!</span>
                </form>

                <!-- Details -->
                <!-- Desktop -->
                <div class="d-none d-md-block">
                    <div class="quick-deets">
                        <h5>Released: <span class="detail-card-info"><?php echo $g_dor ?></span></h5>
                        <h5>Developer(s): <span class="detail-card-info"><?php echo $g_dev ?></span></h5>
                        <h5>Platform(s): <span class="detail-card-info"><?php echo $g_plat ?></span></h5>
                        <h5>Genre(s): <span class="detail-card-info"><?php echo $g_genre ?></span></h5>
                    </div>

                    <!-- Summary -->
                    <div class="details-summary">
                        <p><?php echo $g_summary?><span><a href="https://www.igdb.com/games/fire-emblem-three-houses">Read more...</a></span></p>
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
                        <h5>Released: <span class="detail-card-info"><?php echo $g_dor ?></span></h5>
                        <h5>Developer(s): <span class="detail-card-info"><?php echo $g_dev ?></span></h5>
                        <h5>Platform(s): <span class="detail-card-info"><?php echo $g_plat ?></span></h5>
                        <h5>Genre(s): <span class="detail-card-info"><?php echo $g_genre ?></span></h5>
                    </div>
                </div>
                <div id="summ" class="tab-pane fade">
                    <div class="details-summary">
                        <p><?php echo $g_summary?><span><a href="https://www.igdb.com/games/fire-emblem-three-houses">Read more...</a></span></p>
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
        <p class="d-none d-md-block col-12" style="text-align:center; margin-top:10px; font-style:italic;">Scored by <?php echo $r_usercount?> users</p>
        
    </div><br>
    <form style="text-align:center;">
        <input class="btn btn-success rating-button" type="submit" value="Leave a Rating!"/>
    </form><br>

    <h1>Comments</h1>
    <hr style="background:white;">
    <form class="form-group">
        <textarea name="comment" class="form-control" placeholder="Enter comment here..."></textarea><br>
        <input class="btn btn-success" type="submit">
    </form>
    <br>

    <?php
        $username = "BrianGH";
        $postdate = "1/21/2020";
        $text = "Hey! I am just testing the functionality of the comment system :)";
        $likecount = 4;
        include TEMPLATES_PATH . "/gamepage/comment.php" 
    ?>
    <?php
        $username = "MZucc";
        $postdate = "2/1/2020";
        $text = "My favorite type of data is user data :p";
        $likecount = 0;
        include TEMPLATES_PATH . "/gamepage/comment.php" 
    ?>

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