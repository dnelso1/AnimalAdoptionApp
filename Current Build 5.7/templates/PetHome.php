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
    <title>Pet Home</title>
    <!-- Add your CSS stylesheets and other dependencies here -->
</head>
<body>
    <div class="w-full h-full" style="background-image: url(../../images/pets.jpg); background-position: center; background-size: cover; background-repeat: no-repeat;">
        <section class="p-8 max-w-7xl mx-auto">
            <div class="flex flex-col text-center">
                <h1 class="flex items-center justify-center text-slate-800 text-center px-5 text-3xl font-bold lg:text-5xl">
                    PetMatch
                </h1>
                <form class="my-8 max-w-xl mx-auto" autocomplete="off">
                    <input type="text" name="search" id="search" placeholder="Search for a pet..." class="py-2 px-4 rounded shadow w-full" />
                </form>
                <a href="#">
                    <button class="inline-block bg-slate-300 py-2 px-6 rounded mt-8 hover:bg-slate-400 transition-all duration-200">
                        Swipe
                    </button>
                </a>
            </div>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-6 lg:my-10">
                <?php foreach ($pets as $pet): ?>
                    <a href="<?php echo $pet['id'] . '/' . $pet['name']; ?>" class="bg-slate-200 p-4 rounded hover:bg-slate-100 transition-all duration-200">
                        <!-- Include PHP code to render pet cards here -->
                    </a>
                <?php endforeach; ?>
            </div>
        </section>
    </div>
</body>
</html>
