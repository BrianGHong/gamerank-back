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
<div><br>

    <?php
        //include TEMPLATES_PATH . "/user/login.php";
        include TEMPLATES_PATH . "/user/userpage.php";

        require_once(TEMPLATES_PATH . "/footer.php");
    ?>
</div>
