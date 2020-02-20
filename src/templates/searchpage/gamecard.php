<!-- GAMECARD

$g_title - game's name... not much else to say
$g_genre - game's genre
$r1 - story rating
$r2 - gameplay rating
$r3 - artmusic rating
$r4 - difficulty rating
$r5 - value rating

-->
<style>
.gamecard {
    color: black;
    text-decoration: none;
    transition: transform .2s;
}

.gamecard:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
    -ms-transform: scale(1.02); /* IE 9 */
    -webkit-transform: scale(1.02); /* Safari 3-8 */
    transform: scale(1.02);
}

.game-img {
    display: block;
    width: 100%;
    border-radius: 5px;
    margin: 0;
}

.ri {
    padding-top: 5px;
    font-size: 100%;
}

.rates {
    font-size: 25px;
    margin-left: 10px;
}

.genres {
    font-size: 20px; 
    margin-left: 10px;
}

.gamecard p {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
}

.progress-bar {
    font-size: 100%;
}

@media (max-width: 500px) {
    h2 {
        font-size: 22px;
    }
    .rates {
        font-size: 20px;
        margin-left: 1px;
    }
    .ri {
        margin: 0 4px;
    }
    .genres {
        font-size: 16px; 
        margin-left: 1px;
    }
}

</style>

<a class="card gamecard" href="game.php">
    <div class="row">
        <div class="col-lg-2 col-md-3 col-4">
            <img class="game-img" src="<?php echo $g_pic;?>">
        </div>
        <div class="col-lg-10 col-md-9 col-8" style="margin-top: 10px;">
            <h2 style="word-wrap:break-word;"><?php echo $g_title; ?></h2>
            <div class="rates row">

                <div class="col-sm-1 col-2 ri" style="background: gray; color: <?php echo $c1 ?>;">
                    <div class="row">
                        <i class="fa fa-book"></i>
                        <span style="background: blue; border: 0; margin: 0;"><?php echo $r2; ?></span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100" style="background: <?php echo $c1 ?>; width:<?php echo $r1; ?>%;">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1 col-2 ri">
                    <i class="fa fa-gamepad" style="color: <?php echo $c2 ?>"> <p><?php echo $r2; ?></p></i>
                </div>
                <div class="col-sm-1 col-2 ri">
                    <i class="fa fa-paint-brush" style="color: <?php echo $c3 ?>"> <p><?php echo $r3; ?></p></i>
                </div>
                <div class="col-sm-1 col-2 ri">
                    <i class="fa fa-bolt" style="color: <?php echo $c4 ?>"> <p><?php echo $r4; ?></p></i>
                </div>
                <div class="col-sm-1 col-2 ri">
                    <i class="fa fa-money" style="color: <?php echo $c5 ?>"> <p><?php echo $r5; ?></p></i>
                </div>
                <div class="col-sm-7">
                </div>
            </div>
            <div class="genres row">
                <?php echo $g_genre ?>
            </div>
        </div>
    </div>
</a><br>
