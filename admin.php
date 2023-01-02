<?php
//Christine Johanson chjo2104  Miun Webbutveckling III - Projektuppgift 2022
?>
<?php
include("includes/header.php");

if (!isset($_SESSION["admin"])) {
    header("Location: index.php");
}
?>
<div class="container">

    <?php
    //Om användaren klickat på logga ut 
    if (isset($_GET["logout"])) {
        session_destroy();
        header("Location: index.php");
    }
    ?>
    <!--för att skriva ut meddelande-->
    <span id="message"></span>
    <!-- first section with the bookings -->
    <section class="thirdone">
        <h2>BOKNINGAR</h2>
        <p>Gör justeringar i textfälten, bekräfta sedan med "Uppdatera", eller "Radera" för att ta bort en bokning.</p>
        <div style="overflow-x:auto;">
            <table id="bookingTable">
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Epost</th>
                        <th>Datum</th>
                        <th>Tid</th>
                        <th>Antal</th>
                        <th>Ändra</th>
                        <th>Radera</th>
                    </tr>
                </thead>
                <tbody id="bookList2">
               
                </tbody>
            </table>
        </div>
    </section>

    <section class="secondone">
        <h2>LÄGG TILL NYA SAKER PÅ MENYN</h2>
        <!-- formulär för att lägga till saker på menyn-->
        <form id="menuForm">

            <label for="menuname">Namn:</label><br>
            <input type="text" name="name" id="menuname">
            <br>
            <label for="description">Beskrivning:</label><br>
            <input type="text" name="description" id="description">
            <br>
            <label for="price">Pris:</label><br>
            <input type="number" name="price" id="price">
            <br>
            <label for="category">Kategori:</label><br>

            <select id="category" name="category">
                <option value="Huvudrätt">Huvudrätt</option>
                <option value="Efterrätt">Efterrätt</option>
                <option value="Dryck">Dryck</option>
            </select>
            <br>
            <input type="submit" value="Lägg till" id="submitMenu">
        </form>
    </section>


    <!--skriver ut all data i menu. för användaren att radera eller uppdatera-->
    <section class="thirdone">
        <h2>MENY</h2>
        <p>Gör justeringar i textfälten, bekräfta sedan med "Uppdatera", eller "Radera" för att ta bort en bokning.</p>
        <div style="overflow-x:auto;">
            <table id="foodTable">
                <thead>
                    <tr>
                        <th>Vad?</th>
                        <th>Beskrivning</th>
                        <th>Pris</th>
                        <th>Kategori</th>
                        <th>Uppdatera</th>
                        <th>Radera</th>
                    </tr>
                </thead>
                <tbody id="courseList2">
                </tbody>
            </table>
        </div>
    </section>
    <br>
    <!-- knapp för att logga ut -->
    <a class="button" href="admin.php?logout">Logga ut</a>

    <!-- inkluderar footern -->
    <?php
    include("includes/footer.php");
    ?>