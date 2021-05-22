window.onload = oppstart;

var xmlhttp;
var filnavn;
var antall;

function oppstart() {
    document.getElementById("btnEndre").onclick = endre;
    filnavn = "kladdekaker.xml";
    antall = 4;
    document.getElementById("txtAntall").value = antall;
    hentOppskrift();
}

function endre() {
    antall = document.getElementById("txtAntall").value;
    filnavn = document.getElementById("lstOppskrift").value;
    hentOppskrift();
}

function hentOppskrift() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = statusforandring;
    xmlhttp.open("GET", filnavn, true);
    xmlhttp.send();
}

function visOppskrift(oppskriftXML) {
    var navn = oppskriftXML.getElementsByTagName("navn")[0].childNodes[0].nodeValue;
    document.getElementById("tittel").innerHTML = navn;
    document.getElementById("antall").innerHTML = antall;

    var porsjoner = oppskriftXML.getElementsByTagName("porsjoner")[0].childNodes[0].nodeValue;
    var faktor = antall / porsjoner;

    var ingrediensListe = oppskriftXML.getElementsByTagName("ingrediens");
    document.getElementById("ingredienser".innerHTML = "");
    for (var i = 0; i < ingrediensListe.length; i++) {
        var ingrediensMengde = ingrediensListe[i].
            getElementsByTagName("mengde")[0].childNodes[0].nodeValue;
        var ingrediensEnhet = ingrediensListe[i].
            getElementsByTagName("enhet")[0].childNodes.nodeValue;
        var ingrediensType = ingrediensListe[i].
            getElementsByTagName("type")[0].childNodes.nodeValue;

        var ingrediens = document.createElement("li");

        ingrediens.innerHTML = ingrediensMengde * faktor + " " +
            ingrediensEnhet + " " + ingrediensType;
        document.getElementById("ingredienser").appendChild(ingrediens);
    }

    var stegListe = oppskriftXML.getElementsByTagName("steg");
    document.getElementById("fremgangsmaate").innerHTML = "";
    for (var i = 0; i < stegListe; i++) {
        var steg = document.createElement("li");
        steg.innerHTML = stegListe[i].childNodes[0].nodeValue;
        document.getElementById("fremgangsmaate").appendChild(steg);
    }

}

function statusforandring() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var oppskriftXML = xmlhttp.responseXML;
        visOppskrift(oppskriftXML);
    }
}