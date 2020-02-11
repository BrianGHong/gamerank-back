<!-- COMMENT 

$username - user's name... not much else to say
$postdate - date the comment was posted
$text - message of the comment
$likecount - number of likes the comment has

-->
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-10">
                <h4 class="card-title"><?php echo $username ?> <span class="comment-date">(<?php echo $postdate ?>)</span></h4>
                <p class="card-text"><?php echo $text ?></p>
            </div>
            <div class="col-2"><br>
                <form style="text-align:center;">
                    <button class="btn btn-primary" type="submit">
                        <i class="fa fa-thumbs-up"></i>
                    </button>
                    <p class="comment-like-num"><b><?php echo $likecount ?></b> like(s)</p>
                </form>
            </div>
        </div>
    </div>
</div><br>