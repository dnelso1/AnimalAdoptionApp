<?php
// PHP code to fetch pet data
$pet = array(
    'id' => '', // Insert pet ID here
    'name' => '', // Insert pet name here
    'image' => '', // Insert pet image path here
    'description' => '', // Insert pet description here
    'animalType' => '', // Insert pet animal type here
    'breed' => '', // Insert pet breed here
    'isBoy' => '', // Insert pet gender here (true for Male, false for Female)
    'age' => '', // Insert pet age here
    'isAdopted' => '', // Insert pet adoption status here (true for Adopted, false for Available)
);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pet Detail</title>
    <!-- Add your CSS stylesheets and other dependencies here -->
</head>
<body>
    <section class="max-w-5xl mx-auto flex items-center justify-center h-screen">
        <div class="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
            <article>
                <img
                    src="../../images/<?php echo $pet['image']; ?>"
                    alt="<?php echo $pet['name']; ?>"
                    class="rounded md:h-255 w-full object-cover"
                />
            </article>
            <article>
                <h1 class="text-3xl font-bold mb-8 lg:text-5xl"><?php echo $pet['name']; ?></h1>
                <p class="text-slate-500 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed"><?php echo $pet['description']; ?></p>
                <ul class="text-sm text-slate-600 leading-loose lg:text-base lg:leading-relaxed">
                    <li>
                        <span class="font-bold text-slate-700">Species: </span>
                        <?php echo $pet['animalType']; ?>
                    </li>
                    <li>
                        <span class="font-bold text-slate-700">Breed: </span>
                        <?php echo $pet['breed']; ?>
                    </li>
                    <li>
                        <span class="font-bold text-slate-700">Gender: </span>
                        <?php echo $pet['isBoy'] ? "Male" : "Female"; ?>
                    </li>
                    <li>
                        <span class="font-bold text-slate-700">Age: </span>
                        <?php echo $pet['age']; ?>
                    </li>
                    <li>
                        <span class="font-bold text-slate-700">Status: </span>
                        <?php echo $pet['isAdopted'] ? "Adopted" : "Available"; ?>
                    </li>
                </ul>
                <a href="/" class="inline-block bg-slate-300 py-2 px-6 rounded mt-8 hover:bg-slate-400 transition-all duration-200">&larr; Back</a>
            </article>
        </div>
    </section>
</body>
</html>
