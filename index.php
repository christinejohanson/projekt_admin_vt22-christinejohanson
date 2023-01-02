<?php
//Christine Johanson chjo2104  Miun Webbutveckling III - Projektuppgift 2022
?>
<?php
include("includes/header.php");

//kolla om anv är inloggad o skicka till adminsidan
if (isset($_SESSION["admin"])) {
    header("Location: admin.php");
}

//om något skickas med i usernam
if (isset($_POST['usernam'])) {
    $usernam = $_POST['usernam'];
    $password = $_POST['password'];

    //kontrollera så något faktiskt är ifyllt 
    if (empty($usernam) || empty($password)) {
        $felmess = "<p class='fel'>Fyll i både användarnamn och lösenord!</p>";
        //om det är ifyllt
    } else {

        //Om användarnamn och lösenord är ifyllda, kontrollera att uppgifterna stämmer
        //POST med curl
        /* LOCAL HOST$url4 = 'http://localhost/projekt_webservice_vt22-christinejohanson/adminapi.php'; */
        $url4 = 'https://studenter.miun.se/~chjo2104/writeable/projekt_webservice_vt22-christinejohanson/adminapi.php'; //instans av ny curlsession
        $curl = curl_init();
        //array
        $user = array("usernam" => $usernam, "password" => $password);
        //omvandlar till json
        $json_string = json_encode($user);
        //inställningar för curl
        curl_setopt($curl, CURLOPT_URL, $url4);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $json_string);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        //Response och status
        $data = json_decode(curl_exec($curl), true);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        //Om anv o lösen stämmer hårdkodat
        if ($httpcode === 200) {
            $_SESSION['admin'] = $usernam;

            header("Location: admin.php");
        } else {
            $felmess = "<p class='fel'>Felaktigt användarnamn eller lösenord!</p>";
        }
    }
}
?>
<div class="container">
    <section class="firstone">
        <?php
        if (isset($felmess)) {
            echo $felmess;
        }
        ?>
        <form action="index.php" method="post" id="loggain">
            <label for="usernam">Användarnamn:</label><br>
            <input type="text" name="usernam" id="usernam"><br>
            <label for="password">Lösen:</label><br>
            <input type="password" name="password" id="password"><br>
            <input type="submit" value="Loggain" id="submitbutton"><br>
        </form>
    </section>

    <section class="firstone">
        <p>Har du problem att logga in? Ring supporten på 060-112233</p>
    </section>


    <?php
    include("includes/footer.php");
    ?>