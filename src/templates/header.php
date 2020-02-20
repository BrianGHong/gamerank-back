<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">
 
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/c1f4924127.js" crossorigin="anonymous"></script>

    <!-- Jquery -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
    crossorigin="anonymous"></script>


    <title>GameGauge</title>
    <link rel="shortcut icon" type="image/ico" href="public/icons/gg-logo.ico">
</head>

<nav class="navbar navbar-expand-lg navbar-dark" style="background:#ff4900;">
    <div class="container inline-block">
        <a class="navbar-brand" href="/">
            <h3 style="margin: 0;">
                <img class="d-inline-block align-top" src="public/img/gg-logo-long.png" height="40" style="padding: 0; margin: 0;"/>
            </h3>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse nav-item" id="navbarToggler">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li>
                    <form class="form-inline" action="search.php">
                        <div class="input-group" role="group">
                            <input class="form-control" style="border-top-left-radius: 20px; border-bottom-left-radius: 20px;" type="search" placeholder="Search" aria-label="Search">
                            <div class="input-group-append">
                                <button class="btn btn-outline-light" style="border-top-right-radius: 20px; border-bottom-right-radius: 20px;" type="submit"><i class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                </li>
            </ul>
            <a class="nav-item btn btn-outline-light" style="margin-top: 2px; border-radius: 20px;" href="/user.php">
                <i class="fa fa-user"></i> Login
            </a>
        </div>
    </div>
</nav>