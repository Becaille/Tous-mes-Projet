<?php include "inc/header.php" ?>

		<main class="container">
			<h1>Contact us</h1>
			<p class="select">If your want to make a reservation, please complete this form.</p>
			<p class="mandatory">Fields with <abbr title="(required)" aria-hidden="true">*</abbr> are required.</p>
			<form action="#" method="post">
				<div>
					<fieldset>
						<legend>Reservation</legend>
						<label for="date"><abbr title="(required)" aria-hidden="true">*</abbr> Date</label>
						<input type="date" id="date" required>
						<label for="time"><abbr title="(required)" aria-hidden="true">*</abbr> Time</label>
						<input type="time" id="time" required>
						<label for="guests"><abbr title="(required)" aria-hidden="true">*</abbr> Number of guests</label>
						<input type="number" id="guests" required>
					</fieldset>
					<fieldset>
						<legend>Details</legend>
						<label for="name"><abbr title="(required)" aria-hidden="true">*</abbr> Name</label>
						<input type="text" id="name" required>
						<label for="email">Email</label>
						<input type="email" id="email">
						<label for="tel"><abbr title="(required)" aria-hidden="true">*</abbr> Telephone</label>
						<input type="tel" id="tel" required>
					</fieldset>
				</div>
				<label for="request" class="request">Further request</label>
				<textarea id="request"></textarea>
				<p><input type="submit" value="Reserve"></p>
			</form>
			<div class="map">
				<h2>Our location</h2>
				<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-74.00132596492769%2C40.73365735272384%2C-73.99950206279756%2C40.73476096226166&amp;layer=mapnik"></iframe>
			</div><!-- end of .map --> 
		</main>
<?php include "inc/footer.php" ?>
