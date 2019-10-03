var turn = 0;

var p1_name;
var p1_shots = [];
var p1_hit_count = 0;
var p1_miss_count = 0;

var p1_aircraft_coor = [];
var p1_battleship_coor = [];
var p1_submarine_coor = [];

var p1_aircraft_sunk = false;
var p1_battleship_sunk = false;
var p1_submarine_sunk = false;


var p2_name;
var p2_shots = [];
var p2_hit_count = 0;
var p2_miss_count = 0;

var p2_aircraft_coor = [];
var p2_battleship_coor = [];
var p2_submarine_coor = [];

var p2_aircraft_sunk = false;
var p2_battleship_sunk = false;
var p2_submarine_sunk = false;


var default_tile = "•";


document.addEventListener("DOMContentLoaded", function (event) {

    if (localStorage.getItem("perfect_score") == null || localStorage.getItem("score_history") == null) {
        var sc = [];
        localStorage.setItem("score_history", JSON.stringify(sc));
        localStorage.setItem("perfect_score", 0);
    }


    ////////////////////////////////////////////////////////////////////////////////

    var mainBoard = document.getElementById("battleship_panel");

    //////////////////////////////////////////////////////////////////////////////

    var turn_switch_panel = document.getElementById("turn_switch_panel");
    var turn_player_one_name = document.getElementById("turn_p1_name");
    var turn_player_two_name = document.getElementById("turn_p2_name");

    var turn_player_one_hit = document.getElementById("turn_p1_hit");
    var turn_player_two_hit = document.getElementById("turn_p2_hit");
    var turn_player_one_miss = document.getElementById("turn_p1_miss");
    var turn_player_two_miss = document.getElementById("turn_p2_miss");
    var turn_banner = document.getElementById("turn_name_indicator");
    var turn_btn = document.getElementById("btn_switch_turn");
    turn_btn.addEventListener("click", nextTurn);



    //////////////////////////////////////////////////////////////////////////////


    var init_board = document.getElementById("init_panel_board");
    var init_panel = document.getElementById("init_panel_entry");

    var gamePanel = document.getElementById("gamePanel");

    var input_aircraft_holder = document.getElementById("aircraft_carrier_coor_holder");
    var input_battleship_holder = document.getElementById("battleship_coor_holder");
    var input_submarine_holder = document.getElementById("sub_coor_holder");

    var input_aircraft = document.getElementById("aircraft_carrier_coor");
    var input_battleship = document.getElementById("battleship_coor");
    var input_submarine = document.getElementById("sub_coor");

    var input_name = document.getElementById("name_entry");

    input_aircraft.setAttribute("pattern", regex_aircraft);
    input_battleship.setAttribute("pattern", regex_battleship);
    input_submarine.setAttribute("pattern", regex_submarine);


    var btn_confirm = document.getElementById("confirm");
    btn_confirm.setAttribute("disabled", true);
    btn_confirm.addEventListener("click", confirm);


    input_name.addEventListener("input", liveUpdateGrid);
    input_aircraft.addEventListener("input", liveUpdateGrid);
    input_battleship.addEventListener("input", liveUpdateGrid);
    input_submarine.addEventListener("input", liveUpdateGrid);



    var gameboard = document.getElementById("battleship_panel");


    buildGameBoard("N");
    buildGameBoard("S");



    buildConfigurationScreen();

    //////////////////////////////////////////////////////////////////////////////

    function liveUpdateGrid(item) {

        if (turn == 0) p1_name = input_name.value;
        else p2_name = input_name.value;

        if (isValidFilled()) btn_confirm.removeAttribute("disabled");
        else btn_confirm.setAttribute("disabled", true);

        if (item.srcElement.validity.valid && item.srcElement.value.length > 0) {


            var parsed = String(item.srcElement.value).replace(";", "");
            var shortForm = parsed.substr(2);
            var longForm = parsed.substring(2, parsed.length - 1);

            switch (item.srcElement.id) {
                case input_aircraft.id:
                    if (turn == 0) {
                        if (p1_aircraft_coor[0] != null) {
                            p1_aircraft_coor.forEach(function (item) {
                                item.firstChild.textContent = default_tile;
                            });
                        }
                        if (!parsed.includes("(")) p1_aircraft_coor = buildCoorArray(shortForm, p1_battleship_coor, p1_submarine_coor, input_aircraft);
                        else p1_aircraft_coor = buildCoorArray(longForm, p1_battleship_coor, p1_submarine_coor, input_aircraft_holder);
                    }
                    else {
                        if (p2_aircraft_coor[0] != null) {
                            p2_aircraft_coor.forEach(function (item) {
                                item.firstChild.textContent = default_tile;
                            });
                        }
                        p2_aircraft_coor.forEach(function (item) {
                            item.firstChild.textContent = default_tile;
                        });
                        if (!parsed.includes("(")) p2_aircraft_coor = buildCoorArray(shortForm, p2_battleship_coor, p2_submarine_coor, input_aircraft);
                        else p2_aircraft_coor = buildCoorArray(longForm, p2_battleship_coor, p2_submarine_coor, input_aircraft);
                    }
                    break;
                case input_battleship.id:
                    if (turn == 0) {
                        if (p1_battleship_coor[0] != null) {
                            p1_battleship_coor.forEach(function (item) {
                                item.firstChild.textContent = default_tile;
                            });
                        }
                        if (!parsed.includes("(")) p1_battleship_coor = buildCoorArray(shortForm, p1_aircraft_coor, p1_submarine_coor, input_battleship);
                        else p1_battleship_coor = buildCoorArray(longForm, p1_aircraft_coor, p1_submarine_coor, input_battleship);
                    }
                    else {
                        if (p2_battleship_coor[0] != null) {
                            p2_battleship_coor.forEach(function (item) {
                                item.firstChild.textContent = default_tile;
                            });
                        }
                        if (!parsed.includes("(")) p2_battleship_coor = buildCoorArray(shortForm, p2_aircraft_coor, p2_submarine_coor, input_battleship);
                        else p2_battleship_coor = buildCoorArray(longForm, p2_aircraft_coor, p2_submarine_coor, input_battleship);
                    }
                    break;
                case input_submarine.id:
                    if (turn == 0) {
                        if (p1_submarine_coor[0] != null) {
                            p1_submarine_coor.forEach(function (item) {
                                item.firstChild.textContent = default_tile;
                            });
                        }
                        if (!parsed.includes("(")) p1_submarine_coor = buildCoorArray(shortForm, p1_aircraft_coor, p1_battleship_coor, input_submarine);
                        else p1_submarine_coor = buildCoorArray(longForm, p1_aircraft_coor, p1_battleship_coor, input_submarine);
                    }
                    else {
                        if (p2_submarine_coor[0] != null) {
                            p2_submarine_coor.forEach(function (item) {
                                item.firstChild.textContent = default_tile;
                            });
                        }
                        if (!parsed.includes("(")) p2_submarine_coor = buildCoorArray(shortForm, p2_aircraft_coor, p2_battleship_coor, input_submarine);
                        else p2_submarine_coor = buildCoorArray(longForm, p2_aircraft_coor, p2_battleship_coor, input_submarine);
                    }
                    break;
            }
        }
        else {
            switch (item.srcElement.id) {
                case input_aircraft.id:
                    if (turn == 0 && p1_aircraft_coor[0] != null) {
                        p1_aircraft_coor.forEach(function (c) {
                            c.firstChild.textContent = default_tile;
                        });
                        p1_aircraft_coor = [];
                    }
                    else if (p2_aircraft_coor[0] != null) {
                        p2_aircraft_coor.forEach(function (c) {
                            c.firstChild.textContent = default_tile;
                        });
                        p2_aircraft_coor = [];
                    }
                    break;
                case input_battleship.id:
                    if (turn == 0 && p1_battleship_coor[0] != null) {
                        p1_battleship_coor.forEach(function (c) {
                            c.firstChild.textContent = default_tile;
                        });
                        p1_battleship_coor = [];
                    }
                    else if (p2_battleship_coor[0] != null) {
                        p2_battleship_coor.forEach(function (c) {
                            c.firstChild.textContent = default_tile;
                        });
                        p2_battleship_coor = [];
                    }
                    break;
                case input_submarine.id:
                    if (turn == 0 && p1_submarine_coor[0] != null) {
                        p1_submarine_coor.forEach(function (c) {
                            c.firstChild.textContent = default_tile;
                        });
                        p1_submarine_coor = [];
                    }
                    else if (p1_submarine_coor[0] != null) {
                        p2_submarine_coor.forEach(function (c) {
                            c.firstChild.textContent = default_tile;
                        });
                        p2_submarine_coor = [];
                    }
                    break;
            }
        }

        updateShip(input_aircraft.validity.valid && (input_aircraft.value.length > 0), p1_aircraft_coor, p2_aircraft_coor, "A");
        updateShip(input_battleship.validity.valid && (input_battleship.value.length > 0), p1_battleship_coor, p2_battleship_coor, "B");
        updateShip(input_submarine.validity.valid && (input_submarine.value.length > 0), p1_submarine_coor, p2_submarine_coor, "S");

    }

    function updateShip(valid_state, p1_array, p2_array, ship_letter) {
        var temp = [];
        if (turn == 0) temp = p1_array;
        else temp = p2_array;

        if (valid_state) {
            temp.forEach(function (item) {
                item.firstChild.textContent = ship_letter;
            });
        }
    }

    function buildCoorArray(coor, array1, array2, input) {


        var test = coor.split("-");

        //var start = coor.substring(0,2);
        //var end = coor.substring(3);

        var start = test[0];
        var end = test[1];


        var numDiff = parseInt(end.substring(1)) - parseInt(start.substring(1)) + 1;
        var letterDiff = end.charCodeAt(0) - start.charCodeAt(0) + 1;
        var coorArray = [];


        if (start.charAt(0) == end.charAt(0)) {
            for (var i = 0; i < numDiff; i++) {
                coorArray.push(document.getElementById(start.charAt(0) + (i + parseInt(start.charAt(1)))));
            }
        }
        else {
            var nextChar = start.charAt(0);
            for (var z = 0; z < letterDiff; z++) {
                coorArray.push(document.getElementById(nextChar + start.substring(1)));
                nextChar = String.fromCharCode(nextChar.charCodeAt(0) + 1);
            }
        }

        var cross = 0;

        coorArray.forEach(function (x) {

            array1.forEach(function (y) {
                if (y.id === x.id) cross += 1;
            });

            array2.forEach(function (z) {
                if (z.id === x.id) cross += 1;
            });

        });



        if (cross > 0 && input.validity.valid) {
            alert("Overlaping coordinates are not allowed, clearing overlapping coordinates");
            input.value = "";

            return [];
        }
        else {
            return coorArray;
        }

    }

    function buildConfigurationScreen() {
        var rowID = ['HEADER', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'FOOTER'];

        for (var i = 0; i < 12; i++) {
            var row = document.createElement("div");
            row.id = rowID[i];
            row.classList.add("mdl-grid");
            row.classList.add("row");

            gamePanel.appendChild(row);
            populateInitRow(rowID[i], row);
        }

        var footer = document.createElement("div");
        footer.classList.add("mdl-grid");
        footer.classList.add("boardHeader");
        footer.classList.add("row");

    }

    function populateInitRow(pos, row) {
        var positionID = "p";
        for (var z = 0; z < 12; z++) {
            var tile = document.createElement("div");
            tile.classList.add("mdl-cell");
            tile.classList.add("mdl-cell--1-col");


            if (z == 0 || z == 11 || pos == 'HEADER' || pos == 'FOOTER') {
                tile.classList.add("edge");

            }
            else {
                tile.id = pos + z;
                tile.classList.add("tile");
            }

            tile.classList.add("mdl-grid");
            tile.classList.add("center-items");

            row.appendChild(tile);

            var tileContent = document.createElement("p");

            if (pos == 'HEADER' && z > 0 && z < 11) {
                tileContent.textContent = z;
                tile.appendChild(tileContent);
            }
            else if (z == 0 && pos !== 'HEADER' && pos !== "FOOTER") {
                tileContent.textContent = pos;
                tile.appendChild(tileContent);
            }
            else if (z > 0 && z < 11 && pos != "FOOTER") {
                tileContent.textContent = default_tile;
                tile.appendChild(tileContent);
            }

        }
    }

    function isValidFilled() {

        return input_aircraft.validity.valid && input_battleship.validity.valid && input_submarine.validity.valid &&
            input_name.value.length >= 1 && input_aircraft.value.length >= 1 && input_battleship.value.length >= 1 && input_submarine.value.length >= 1;
    }

    function clearForm() {

        p1_aircraft_coor.forEach(cleanShip);
        p1_battleship_coor.forEach(cleanShip);
        p1_submarine_coor.forEach(cleanShip);


        function cleanShip(item) {
            var element = document.getElementById(item);
            element.firstElementChild.textContent = default_tile;
        }

        input_name.value = "";

        input_aircraft.value = "";
        input_aircraft_holder.classList.remove("is-invalid");
        input_aircraft_holder.classList.remove("is-upgraded");
        input_aircraft_holder.classList.remove("is-dirty");
        input_aircraft_holder.classList.remove("is-invalid");
        input_aircraft_holder.classList.remove("is-focused");

        input_battleship.value = "";
        input_battleship_holder.classList.remove("is-invalid");
        input_battleship_holder.classList.remove("is-upgraded");
        input_battleship_holder.classList.remove("is-dirty");
        input_battleship_holder.classList.remove("is-invalid");
        input_battleship_holder.classList.remove("is-focused");

        input_submarine.value = "";
        input_submarine_holder.classList.remove("is-invalid");
        input_submarine_holder.classList.remove("is-upgraded");
        input_submarine_holder.classList.remove("is-dirty");
        input_submarine_holder.classList.remove("is-invalid");
        input_submarine_holder.classList.remove("is-focused");

        btn_confirm.setAttribute("disabled", true);
    }

    function confirm() {
        if (turn == 0) {
            turn += 1;
            var s = 0;

            p1_aircraft_coor.forEach(function (item) {
                item.firstChild.textContent = default_tile;
                p1_aircraft_coor[s] = item.id;
                s++;
            });
            s = 0;
            p1_battleship_coor.forEach(function (item) {
                item.firstChild.textContent = default_tile;
                p1_battleship_coor[s] = item.id;
                s++;
            });
            s = 0;
            p1_submarine_coor.forEach(function (item) {
                item.firstChild.textContent = default_tile;
                p1_submarine_coor[s] = item.id;
                s++;
            });

            clearForm();

            document.getElementById("setup_name").textContent = "Player 2";
        }
        else {

            var s = 0;
            p2_aircraft_coor.forEach(function (item) {
                item.firstChild.textContent = default_tile;
                p2_aircraft_coor[s] = item.id;
                s++;
            });
            s = 0;
            p2_battleship_coor.forEach(function (item) {
                item.firstChild.textContent = default_tile;
                p2_battleship_coor[s] = item.id;
                s++;
            });
            s = 0;
            p2_submarine_coor.forEach(function (item) {
                item.firstChild.textContent = default_tile;
                p2_submarine_coor[s] = item.id;
                s++;
            });


            init_board.classList.add("hidden");
            init_panel.classList.add("hidden");
            turn = 0;
            showTurnSwitch();

        }
    }

    //////////////////////////////////////////////////////////////////////////////

    /*
        Called each turn switch
     */
    function nextTurn() {
        turn_switch_panel.classList.add("hidden");
        mainBoard.classList.remove("hidden");
        paintBoard();
    }

    function showTurnSwitch() {
        if (!mainBoard.classList.contains("hidden")) {
            mainBoard.classList.add("hidden");
            var hits = document.querySelectorAll("p.hit");
            hits.forEach(function (item) {
                item.classList.remove("hit");
            });

            var miss = document.querySelectorAll("p.miss");
            miss.forEach(function (item) {
                item.classList.remove("miss");
            });


            var badTiles = document.querySelectorAll("div.mdl-cell--1-col.g_tile.mdl-typography--text-center");
            badTiles.forEach(function (item) {
                var child = item.firstChild;
                if (child.textContent === "A" || child.textContent === "B" || child.textContent === "S")
                    child.textContent = default_tile;
            });

        }
        turn_switch_panel.classList.remove("hidden");

        if (turn == 0) {
            turn_banner.textContent = p1_name;
        }
        else {
            turn_banner.textContent = p2_name;
        }

        turn_player_one_name.textContent = p1_name;
        turn_player_one_hit.textContent = p1_hit_count;
        turn_player_one_miss.textContent = p1_miss_count;


        turn_player_two_name.textContent = p2_name;
        turn_player_two_hit.textContent = p2_hit_count;
        turn_player_two_miss.textContent = p2_miss_count;

    }

    function paintBoard() {


        if (turn == 0) {

            p1_aircraft_coor.forEach(function (item) {
                var info = "S" + item;
                var tile = document.getElementById(info);
                tile.firstChild.textContent = "A";
            });
            p1_battleship_coor.forEach(function (item) {
                var info = "S" + item;
                var tile = document.getElementById(info);
                tile.firstChild.textContent = "B";
            });
            p1_submarine_coor.forEach(function (item) {
                var info = "S" + item;
                var tile = document.getElementById(info);
                tile.firstChild.textContent = "S";
            });
            p1_shots.forEach(function (item) {

                var jsonObj = JSON.parse(item);

                var info = "N" + jsonObj.pos;

                var tile = document.getElementById(info).firstChild;
                if (jsonObj.hit) {
                    tile.classList.add("hit")
                }
                else {
                    tile.classList.add("miss")
                }

            });

            p2_shots.forEach(function (item) {
                //var info = "N"+item;
                //var tile = document.getElementById(info);
                var jsonObj = JSON.parse(item);
                var info = "S" + jsonObj.pos;
                var tile = document.getElementById(info).firstChild;

                if (jsonObj.hit) {
                    tile.classList.add("hit")
                }
                else {
                    tile.classList.add("miss")
                }
            });
        }
        else {

            p2_aircraft_coor.forEach(function (item) {
                var info = "S" + item;
                var tile = document.getElementById(info);
                tile.firstChild.textContent = "A";
            });
            p2_battleship_coor.forEach(function (item) {
                var info = "S" + item;
                var tile = document.getElementById(info);
                tile.firstChild.textContent = "B";
            });
            p2_submarine_coor.forEach(function (item) {
                var info = "S" + item;
                var tile = document.getElementById(info);
                tile.firstChild.textContent = "S";
            });

            p2_shots.forEach(function (item) {
                var jsonObj = JSON.parse(item);
                var info = "N" + jsonObj.pos;
                var tile = document.getElementById(info).firstChild;
                if (jsonObj.hit) {
                    tile.classList.add("hit")
                }
                else {
                    tile.classList.add("miss")
                }
            });
            p1_shots.forEach(function (item) {
                //var info = "N"+item;
                //var tile = document.getElementById(info);
                var jsonObj = JSON.parse(item);
                var info = "S" + jsonObj.pos;
                var tile = document.getElementById(info).firstChild;

                if (jsonObj.hit) {
                    tile.classList.add("hit")
                }
                else {
                    tile.classList.add("miss")
                }
            });
        }


    }

    function fire(c) {
        if (turn == 0) {

            var loc = c.substring(1);

            if (p2_aircraft_coor.indexOf(loc) > -1)
                paintHit(c, p2_aircraft_coor, p1_shots, "Aircraft Carrier", 5);
            else if (p2_battleship_coor.indexOf(loc) > -1)
                paintHit(c, p2_battleship_coor, p1_shots, "Battleship", 4);
            else if (p2_submarine_coor.indexOf(loc) > -1)
                paintHit(c, p2_submarine_coor, p1_shots, "Submarine", 3);
            else
                paintMiss(c, p1_shots);
        }
        else {
            var loc = c.substring(1);

            if (p1_aircraft_coor.indexOf(loc) > -1)
                paintHit(c, p1_aircraft_coor, p2_shots, "Aircraft Carrier", 5);
            else if (p1_battleship_coor.indexOf(loc) > -1)
                paintHit(c, p1_battleship_coor, p2_shots, "Battleship", 4);
            else if (p1_submarine_coor.indexOf(loc) > -1)
                paintHit(c, p1_submarine_coor, p2_shots, "Submarine", 3);
            else
                paintMiss(c, p2_shots);
        }

        if (turn == 0) turn = 1;
        else turn = 0;

        if (p1_aircraft_sunk && p1_battleship_sunk && p1_submarine_sunk) {
            win(1);
        }
        else if (p2_aircraft_sunk && p2_battleship_sunk && p2_submarine_sunk) {
            win(2);
        }
        else {
            setTimeout(function () { showTurnSwitch(); }, 500);
        }

    }

    function paintHit(c, array, shots, shipName, shipSize) {
        document.getElementById(c).firstChild.classList.add("hit");

        var obj = '{'
            + '"pos" : "' + c.substring(1) + '",'
            + '"hit" : ' + true
            + '}';

        shots.push(obj);


        var concentratedHits = 0;
        array.forEach(function (point) {

            var check = '{'
                + '"pos" : "' + point + '",'
                + '"hit" : ' + true
                + '}';

            if (shots.indexOf(check) > -1) {
                concentratedHits += 1;
            }
        });

        if (concentratedHits == shipSize) {
            if (turn == 0) {
                switch (shipSize) {
                    case 5:
                        p1_aircraft_sunk = true;
                        break;
                    case 4:
                        p1_battleship_sunk = true;
                        break;
                    case 3:
                        p1_submarine_sunk = true;
                        break;
                }
            }
            else {
                switch (shipSize) {
                    case 5:
                        p2_aircraft_sunk = true;
                        break;
                    case 4:
                        p2_battleship_sunk = true;
                        break;
                    case 3:
                        p2_submarine_sunk = true;
                        break;
                }
            }
            alert("Direct hit captain! You sunk the enemy's " + shipName);

        }
        else
            alert("Hit!");


        if (turn == 0) {
            p1_hit_count += 1;
        }
        else {
            p2_hit_count += 1;
        }
    }

    function paintMiss(c, shots) {
        document.getElementById(c).firstChild.classList.add("miss");

        var obj = '{'
            + '"pos" : "' + c.substring(1) + '",'
            + '"hit" : ' + false
            + '}';


        shots.push(obj);

        alert("Miss, better luck next time");



        if (turn == 0) {
            p1_miss_count += 1;
        }
        else {
            p2_miss_count += 1;
        }
    }

    //////////////////////////////////////////////////////////////////////////////

    function buildGameBoard(direction) {

        var subBoard = document.createElement("div");

        if (direction === "N") {
            subBoard.classList.add("mdl-shadow--8dp");
            subBoard.classList.add("north-board");
        }
        else {
            subBoard.classList.add("mdl-shadow--2dp");
            subBoard.classList.add("south-board");
        }

        gameboard.appendChild(subBoard);

        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        for (var i = 0; i < 12; i++) {

            var row = document.createElement("div");
            row.classList.add("mdl-grid");
            row.classList.add("no-margin-padding");
            row.classList.add("g_row");
            subBoard.appendChild(row);


            if (i == 0) {
                for (var x = 0; x < 12; x++) {
                    var gTileX = document.createElement("div");
                    gTileX.classList.add("mdl-cell--1-col");
                    if (x == 0 || x == 11) {
                        gTileX.classList.add("g_edge");
                        row.appendChild(gTileX);
                    }
                    else {
                        gTileX.classList.add("g_edge_head");
                        gTileX.classList.add("mdl-typography--text-center");
                        row.appendChild(gTileX);
                        var letterLabelX = document.createElement("p");
                        letterLabelX.textContent = x;
                        gTileX.appendChild(letterLabelX);

                    }
                }
            }
            else if (i > 0 && i < 11) {
                for (var y = 0; y < 12; y++) {
                    var gTileY = document.createElement("div");
                    gTileY.classList.add("mdl-cell--1-col");

                    if (y == 0) {
                        gTileY.classList.add("g_edge");
                        gTileY.classList.add("mdl-typography--text-center");
                        var axisLabel = document.createElement("p");
                        axisLabel.textContent = letters[i - 1];
                        row.appendChild(gTileY);
                        gTileY.appendChild(axisLabel);

                    }
                    else if (y == 11) {
                        gTileY.classList.add("g_edge");
                        row.appendChild(gTileY);
                    }
                    else {
                        gTileY.classList.add("g_tile");
                        gTileY.classList.add("mdl-typography--text-center");
                        gTileY.id = direction + letters[i - 1] + y;
                        row.appendChild(gTileY);
                        var letterLabel = document.createElement("p");
                        letterLabel.textContent = default_tile;
                        gTileY.appendChild(letterLabel);

                    }
                    if (direction == "N") {
                        gTileY.addEventListener("click", function (item) {
                            if (item.srcElement.tagName === "P") {
                                if (!item.srcElement.classList.contains("hit") &&
                                    !item.srcElement.classList.contains("miss")) {
                                    // console.log(item.srcElement.parentNode.id);
                                    fire(item.srcElement.parentNode.id);
                                }

                            }
                            else if (item.srcElement.children.length == 1 && item.srcElement.classList.contains("g_tile")) {
                                if (!item.srcElement.firstChild.classList.contains("hit") &&
                                    !item.srcElement.firstChild.classList.contains("miss"))

                                    fire(item.srcElement.id);
                            }
                            else {
                                // console.log(item.srcElement);
                            }
                        });
                    }
                }
            }
        }

    }


    //////////////////////////////////////////////////////////////////////////////

    function win(player) {

        var winner_score = 24;
        var winner_name;

        if (player == 1) {
            winner_score = winner_score - (2 * p2_hit_count);
            winner_name = p1_name;
        }
        else {
            winner_score = winner_score - (2 * p1_hit_count);
            winner_name = p2_name;
        }

        var score_history = JSON.parse(localStorage.getItem("score_history"));
        var perfect_score = localStorage.getItem("perfect_score");



        if (perfect_score < 10) {


            var entry = JSON.parse('{ "name": ' + '"' + winner_name + '", "score": ' + winner_score + "}");


            if (winner_score == 24) {
                var new_score = parseInt(perfect_score);
                new_score += 1;
                localStorage.setItem("perfect_score", new_score);
            }

            score_history.push(entry);

            score_history.sort(function (a, b) {
                return parseInt(b.score) - parseInt(a.score);
            });

            if (score_history.length > 10) {
                score_history.pop();
            }

            localStorage.setItem("score_history", JSON.stringify(score_history));

        }

        var leaderboard = document.getElementById("leader_board");

        var holder = 0;

        score_history.forEach(function (item) {
            var name = document.getElementById(holder + "_name");
            var score = document.getElementById(holder + "_score");
            name.textContent = item.name;
            score.textContent = item.score;
            holder++;
        });
        mainBoard.classList.add("hidden");
        leaderboard.classList.remove("hidden");

        alert(winner_name + " won the game!");

    }

});