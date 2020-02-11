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
        <a class="btn btn-primary btn-game" href="game.php">Random</a>
    </div>
</div>
<div class="container">
    <!-- <h1>Dashboard</h1> -->
    <div class="row" style="text-align:center;">
        <div class="col-4 container">
            <h2 id="r1head" class="rating-header"><i class="fa fa-book" style="color: <?php echo $c1?>"></i> Best Story</h2>
            <img src="https://images-na.ssl-images-amazon.com/images/I/61i4yn1Jc7L._SY355_.png" width="180px" style="margin-bottom: 10px;">
        </div>
        <div class="col-4 container">
            <h2 id="r5head" class="rating-header"><i class="fa fa-money" style="color: <?php echo $c5?>"></i> Most Worth</h2>
            <img src="https://images-na.ssl-images-amazon.com/images/I/61i4yn1Jc7L._SY355_.png" width="180px" style="margin-bottom: 10px;">
        </div>
        <div class="col-4 container">
            <h2 id="r4head" class="rating-header" style="font-size: 30px;"><i class="fa fa-bolt" style="color: <?php echo $c4?>"></i> Most Difficult</h2>
            <img src="https://images-na.ssl-images-amazon.com/images/I/61i4yn1Jc7L._SY355_.png" width="180px" style="margin-bottom: 10px;">
        </div>
    </div>
    <div class="row" style="text-align:center;">
        <div class="col-6 container">
            <h2 id="r2head" class="rating-header"><i class="fa fa-gamepad" style="color: <?php echo $c2?>"></i> Best Gameplay</h2>
            <img src="https://images-na.ssl-images-amazon.com/images/I/61i4yn1Jc7L._SY355_.png" width="180px" style="margin-bottom: 10px;">
        </div>
        <div class="col-6 container">
            <h2 id="r3head" class="rating-header"><i class="fa fa-paint-brush" style="color: <?php echo $c3?>"></i> Best Art/Music</h2>
            <img src="https://images-na.ssl-images-amazon.com/images/I/61i4yn1Jc7L._SY355_.png" width="180px" style="margin-bottom: 10px;">
        </div>
    </div>
    <?php
        require_once(TEMPLATES_PATH . "/footer.php");
    ?>
</div>
