<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="description" content="Freshly Restaurant, your new favourite restaurant !">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		<title>Freshly Restaurant - Home</title>
		<link rel="icon" href="favicon.png">
		<link href="https://fonts.googleapis.com/css?family=Athiti:500|Merienda:400,700&display=swap" rel="stylesheet">
		
    <!-- css du plugin slick-->
		<link rel="stylesheet" href="modules/slick/slick.css">
		<link rel="stylesheet" href="modules/slick/slick-theme.css">
		
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/fontawesome.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/brands.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/solid.min.css">
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<header>
			<div class="container">
				<a href="index.php" class="logo">
					<img src="img/logo.png" alt="Logo for Freshly Restaurant">
					<strong>Freshly Restaurant</strong>
				</a>
				<nav>
					<ul>
						<li><a href="index.php" <?php  if(basename($_SERVER['SCRIPT_NAME']) == 'index.php') { echo 'class="active" '; }  ?> >Home</a></li>
						<li><a href="about.php" <?php  if(basename($_SERVER['SCRIPT_NAME']) == 'about.php') { echo 'class="active" '; }  ?>>About</a></li>
						<li><a href="menus.php" <?php  if(basename($_SERVER['SCRIPT_NAME']) == 'menus.php') { echo 'class="active" '; }  ?>>Menus</a></li>
						<li><a href="contact.php" <?php  if(basename($_SERVER['SCRIPT_NAME']) == 'contact.php') { echo 'class="active" '; }  ?>>Contact</a></li>
					</ul>
				</nav>
			</div> <!-- end of .container -->
		</header>
