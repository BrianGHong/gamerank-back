<?php 
    require_once("src/config.php");
    require_once(TEMPLATES_PATH . "/header.php");

    # Colors
    $c1 = "#f7bd00";
    $c2 = "#0099f7";
    $c3 = "#ae00ff";
    $c4 = "#db2100";
    $c5 = "#11c24c";
?>
<div class="container"><br>
    <!-- Make a Search -->
    <form class="form-inline" action="game.php">
        <div class="btn-toolbar">    
            <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-success my-2 my-sm-0" type="submit" style="margin-right: 10px;">Search</button> -->
            <div class="dropdown">
                <button class="btn btn-info dropdown-toggle" type="button" id="filterButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter
                </button>
                <div class="dropdown-menu" aria-labelledby="filterButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div>
    </form><br>

    <!-- Search Results -->
    <?php
    $g_title = "Fire Emblem: Three Houses";
    $g_pic = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1n8t.jpg";
    $r1 = 68; $r2 = 84; $r3 = 76; $r4 = 45; $r5 = 94;
    include TEMPLATES_PATH . "/searchpage/gamecard.php"
    ?>
    <?php
    $g_title = "Sekiro: Shadows Die Twice";
    $g_pic = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1j0g.jpg";
    $r1 = 68; $r2 = 84; $r3 = 76; $r4 = 45; $r5 = 94;
    include TEMPLATES_PATH . "/searchpage/gamecard.php"
    ?>
    <?php
    $g_title = "Subnautica";
    $g_pic = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1iqw.jpg";
    $r1 = 68; $r2 = 84; $r3 = 76; $r4 = 45; $r5 = 94;
    include TEMPLATES_PATH . "/searchpage/gamecard.php"
    ?>
    <?php
    $g_title = "Super Smash Bros. Ultimate";
    $g_pic = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8b.jpg";
    $r1 = 68; $r2 = 84; $r3 = 76; $r4 = 45; $r5 = 94;
    include TEMPLATES_PATH . "/searchpage/gamecard.php"
    ?>
    <?php
    $g_title = "Undertale";
    $g_pic = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnr.jpg";
    $r1 = 68; $r2 = 84; $r3 = 76; $r4 = 45; $r5 = 94;
    include TEMPLATES_PATH . "/searchpage/gamecard.php"
    ?>
    

    <?php
        require_once(TEMPLATES_PATH . "/footer.php");
    ?>
</div>
