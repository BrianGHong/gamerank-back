<!-- RANKING

$category - story, gameplay, etc.
$cat_icon - icon of category
$cat_color - color of category
$first - 1st place
$sec - 2nd place
$thr - 3rd place

-->
<style>
@media (max-width: 800px) {
    h1 { font-size: 20px; }
    h2 { font-size: 20px; }
    h3 { font-size: 20px; }
}
</style>
<h2 id="r1head" class="rating-header"><i class="<?php echo $cat_icon?>" style="color: <?php echo $cat_color?>"></i> <?php echo $category;?></h2>
<div>
    <a href=""><h1 style="color: <?php echo $gold ?>"><i class="fa fa-award"></i> <?php echo $first?></h1></a>
    <a href=""><h2 style="color: <?php echo $silver ?>"><i class="fa fa-award"></i> <?php echo $sec?></h2></a>
    <a href=""><h3 style="color: <?php echo $bronze ?>"><i class="fa fa-award"></i> <?php echo $thr?></h3></a>
</div><br>