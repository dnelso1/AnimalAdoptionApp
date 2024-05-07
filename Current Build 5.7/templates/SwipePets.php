<?php
// PHP code to fetch pet data
$pets = array(); // Array to hold pet data

// Logic to fetch pet data from JSON or database
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swipe Pets</title>
    <!-- Add your CSS stylesheets and other dependencies here -->
</head>
<body>
    <div class="swipeCards">
        <div class="swipeCards__container">
            <?php foreach ($pets as $pet): ?>
                <div class="swipe">
                    <div class="card" style="background-image: url(images/<?php echo $pet['image']; ?>)">
                        <h2 class="text-3xl"><?php echo $pet['name']; ?></h2>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
