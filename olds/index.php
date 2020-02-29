<?php 
    require_once("src/config.php");
    require_once(TEMPLATES_PATH . "/header.php");

    # Colors
    $c1 = "#f7bd00";
    $c2 = "#0099f7";
    $c3 = "#ae00ff";
    $c4 = "#db2100";
    $c5 = "#11c24c";

    # Medal Colors
    $gold = "#cfcb00";
    $silver = "#adadad";
    $bronze = "#8a7849";
?>
<link rel="stylesheet" href= "public/css/index.css">

<div class="jumbotron" style="
    background-image: url('https://cdn2.unrealengine.com/Diesel%2Fblog%2Fepic-games-store-update%2FEGS_Social_Update_News-2560x1440-128a69890d92407b815582c1deba54450e5645f9.jpg');
    background-repeat: repeat;
    background-attachment: none;
    background-size: cover;
    color: white;
">
    <div class="container">
        <h1 style="font-weight: bold; text-shadow: 4px 4px black;">So Many Games, So Little Time</h1>
        <a class="btn btn-success btn-game" href="game.php">Take me to a game</a>
    </div>
</div>
<div class="container">
    <h1>Leaderboards</h1>
    <hr>
    <div class="row" style="text-align:center;">
        <div class="col-6 container">
            <?php 
            $category = "Best Story";
            $cat_color = $c1;
            $cat_icon = "fa fa-book";
            $first = "Shadow of the Colossus";
            $sec = "The Legend of Zelda: Wind Waker";
            $thr = "God of War";
            include TEMPLATES_PATH . "/homepage/ranking.php"
            ?>
        </div>
        <div class="col-6 container">
            <?php 
                $category = "Best Gameplay";
                $cat_color = $c2;
                $cat_icon = "fa fa-gamepad";
                $first = "The Legend of Zelda: Breath of the Wild";
                $sec = "Bloodborne";
                $thr = "Dark Souls";
                include TEMPLATES_PATH . "/homepage/ranking.php"
            ?>
        </div>
    </div>
    <div class="row" style="text-align:center;">
        <div class="col-6 container">
            <?php 
                $category = "Best Art/Music";
                $cat_color = $c3;
                $cat_icon = "fa fa-paint-brush";
                $first = "Persona 5";
                $sec = "Sekiro";
                $thr = "Okami";
                include TEMPLATES_PATH . "/homepage/ranking.php"
            ?>
        </div>
        <div class="col-6 container">
            <?php 
                $category = "Most Difficult";
                $cat_color = $c4;
                $cat_icon = "fa fa-bolt";
                $first = "Dark Souls";
                $sec = "Bloodborne";
                $thr = "Sekiro";
                include TEMPLATES_PATH . "/homepage/ranking.php"
            ?>
        </div>
    </div>
    <div class="row" style="text-align:center;">
        <div class="col-12">
            <?php 
                $category = "Best Value";
                $cat_color = $c5;
                $cat_icon = "fa fa-money";
                $first = "Skyrim";
                $sec = "Subnautica";
                $thr = "Super Smash Bros. Ultimate";
                include TEMPLATES_PATH . "/homepage/ranking.php"
            ?>
        </div>
    </div>
    <?php
        require_once(TEMPLATES_PATH . "/footer.php");
    ?>
</div>
