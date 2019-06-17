/* CÁC BIẾN TOÀN CỤC */
var default_min = 20;
var default_sec = 0;
var default_quests_num = 149;
var default_delaytime = 800;
var default_rock_arr = [
    [467, 1], [671, 1], [263, 103], [467, 103], [773, 103], [875, 103],
    [977, 103], [875, 205], [1181, 205], [263, 307], [365, 307], [569, 307],
    [671, 307], [569, 409], [875, 409], [977, 409], [1079, 409], [365, 511],
    [569, 511], [977, 511]
];
var default_enm_arr = [
    [569, 1], [773, 1], [365, 103], [1079, 103], [569, 205], [773, 307],
    [977, 307], [671, 409], [467, 511], [1079, 511]
];
var default_quests_arr = [
    ["q1", "b"], ["q2", "b"], ["q3", "d"], ["q4", "b"], ["q5", "b"], ["q6", "d"], ["q7", "e"], ["q8", "c"], ["q9", "a"], ["q10", "c"],
    ["q11", "d"], ["q12", "d"], ["q13", "d"], ["q14", "c"], ["q15", "b"], ["q16", "b"], ["q17", "a"], ["q18", "e"], ["q19", "e"], ["q20", "c"],
    ["q21", "d"], ["q22", "e"], ["q23", "d"], ["q24", "c"], ["q25", "d"], ["q26", "c"], ["q27", "a"], ["q28", "c"], ["q29", "c"], ["q30", "b"],
    ["q31", "d"], ["q32", "d"], ["q33", "d"], ["q34", "a"], ["q35", "b"], ["q36", "a"], ["q37", "c"], ["q38", "a"], ["q39", "b"], ["q40", "b"],
    ["q41", "d"], ["q42", "b"], ["q43", "b"], ["q44", "d"], ["q45", "c"], ["q46", "b"], ["q47", "e"], ["q48", "c"], ["q49", "b"], ["q50", "e"],
    ["q51", "d"], ["q52", "d"], ["q53", "b"], ["q54", "b"], ["q55", "d"], ["q56", "d"], ["q57", "a"], ["q58", "a"], ["q59", "d"], ["q60", "d"],
    ["q61", "a"], ["q62", "c"], ["q63", "b"], ["q64", "b"], ["q65", "b"], ["q66", "e"], ["q67", "b"], ["q68", "b"], ["q69", "c"], ["q70", "b"],
    ["q71", "c"], ["q72", "c"], ["q73", "a"], ["q74", "e"], ["q75", "d"], ["q76", "e"], ["q77", "d"], ["q78", "d"], ["q79", "d"], ["q80", "c"],
    ["q81", "c"], ["q82", "c"], ["q83", "a"], ["q84", "d"], ["q85", "d"], ["q86", "d"], ["q87", "b"], ["q88", "b"], ["q89", "c"], ["q90", "d"],
    ["q91", "a"], ["q92", "b"], ["q93", "d"], ["q94", "c"], ["q95", "e"], ["q96", "a"], ["q97", "d"], ["q98", "b"], ["q99", "e"], ["q100", "a"],
    ["q101", "d"], ["q102", "c"], ["q103", "d"], ["q104", "c"], ["q105", "a"], ["q106", "d"], ["q107", "b"], ["q108", "e"], ["q109", "c"], ["q110", "d"],
    ["q111", "e"], ["q112", "c"], ["q113", "a"], ["q114", "b"], ["q115", "d"], ["q116", "e"], ["q117", "c"], ["q118", "a"], ["q119", "e"], ["q120", "c"],
    ["q121", "c"], ["q122", "b"], ["q123", "a"], ["q124", "d"], ["q125", "d"], ["q126", "b"], ["q127", "a"], ["q128", "d"], ["q129", "b"], ["q130", "c"],
    ["q131", "d"], ["q132", "d"], ["q133", "b"], ["q134", "a"], ["q135", "c"], ["q136", "d"], ["q137", "e"], ["q138", "c"], ["q139", "d"], ["q140", "b"],
    ["q141", "d"], ["q142", "b"], ["q143", "d"], ["q144", "e"], ["q145", "d"], ["q146", "e"], ["q147", "d"], ["q148", "a"], ["q149", "b"]
];


/*----------------------------------------------------------------------------*/
/* LOAD MAP */
function loadingMap(){
    if(sessionStorage.length != 0){
        document.getElementById("character").style.left = sessionStorage.getItem("x") + "px";
        document.getElementById("character").style.top = sessionStorage.getItem("y") + "px";
        setTime(sessionStorage.getItem("min"), sessionStorage.getItem("sec"), null);
        document.getElementById("process").innerHTML = sessionStorage.getItem("process") + "/10";
        setHp(sessionStorage.getItem("hp"));
        hideDefeatedEnemies(sessionStorage.getItem("hidden_id_str"));
    }
    else{
        document.getElementById("character").style.left = "263px";
        document.getElementById("character").style.top = "1px";
        setTime(default_min, default_sec, null);
        sessionStorage.setItem("process", 0);
        sessionStorage.setItem("hp", 3);
    }
}


/*----------------------------------------------------------------------------*/
/* LOAD QUESTION */
function loadingQuest(){
    setTime(sessionStorage.getItem("min"), sessionStorage.getItem("sec"), null);
}


/*----------------------------------------------------------------------------*/
/* LOAD SCORES */
function loadingScores(){
	if(sessionStorage.getItem("process") > 0)
    	var scores = 100 * (parseInt(sessionStorage.getItem("process")) + parseInt(sessionStorage.getItem("hp")));
    else var scores = 0;
    document.getElementById("scores").innerHTML = "<strong>Scores: " + scores + "</strong>";
}


/*----------------------------------------------------------------------------*/
/* CÁC HÀM PHỤ TRỢ */
function setTime(m, s, timeout){
    if (s === -1){
        m -= 1;
        s = 59;
    }
    if (m === -1){
        clearTimeout(timeout);
        alert('Thật đáng tiếc, hết giờ mất rồi ~');
        // Điều hướng đến file LOSE.html
        window.location = "./lose.html";
        return false;
    }
    // Hiển thị đồng hồ
    document.getElementById('m').innerText = m.toString();
    document.getElementById('s').innerText = s.toString();

    // Đếm ngược
    timeout = setTimeout(function(){
        s--;
        setTime(m, s--, timeout);
    }, 1000);
}

function setHp(_hp){
    switch(_hp){
        case "2": {
            document.getElementById("hp3").style.visibility = "hidden";
            break;
        }
        case "1": {
            document.getElementById("hp2").style.visibility = "hidden";
            document.getElementById("hp3").style.visibility = "hidden";
            break;
        }
    }
}

function checkRocksOnRoad(_char_pos, _target_pos){
    var f = true;

    for(var i in default_rock_arr){
        if(_char_pos[0] === default_rock_arr[i][0] && _target_pos[0] === default_rock_arr[i][0]){
            if(_char_pos[1] < default_rock_arr[i][1] && _target_pos[1] > default_rock_arr[i][1]){
                f = false;
            }
            if(_char_pos[1] > default_rock_arr[i][1] && _target_pos[1] < default_rock_arr[i][1]){
                f = false;
            }
        }
        if(_char_pos[1] === default_rock_arr[i][1] && _target_pos[1] === default_rock_arr[i][1]){
            if(_char_pos[0] < default_rock_arr[i][0] && _target_pos[0] > default_rock_arr[i][0]){
                f = false;
            }
            if(_char_pos[0] > default_rock_arr[i][0] && _target_pos[0] < default_rock_arr[i][0]){
                f = false;
            }
        }
    }
    return f;
}

function isEnemy(_pos){
    var f = false;

    for(var i in default_enm_arr){
        if(_pos[0] === default_enm_arr[i][0] && _pos[1] === default_enm_arr[i][1]){
            f = true;
            break;
        }
    }
    return f;
}

function moveToPos(_char_pos, _target_pos){
    if(_char_pos[0] === _target_pos[0] || _char_pos[1] === _target_pos[1]){
        document.getElementById("character").style.left = _target_pos[0] + "px";
        document.getElementById("character").style.top = _target_pos[1] + "px";
        document.getElementById("character").style.transition = default_delaytime + "ms";
    }
}

function hideDefeatedEnemies(_str){
    // Tách chuỗi
    var id_arr = _str.split(',');
    
    // Ẩn quái
    for(var i = 0; i < id_arr.length; i++){
        document.getElementById(id_arr[i]).innerHTML = "";
    }
}

function isDefeatedEnemiesPos(_str, _id){
    if(_str !== null){
        if(_str.indexOf(_id) !== -1) return true;
        else return false;
    }
    else return false;
}


/*----------------------------------------------------------------------------*/
/* CÁC SỰ KIỆN CHÍNH */
function execAction(x, y, id){
    // Lấy tọa độ của nhân vật
    var char_pos = [
        parseInt(document.getElementById("character").style.left),
        parseInt(document.getElementById("character").style.top)
    ];
    // Lấy tọa độ đích đến
    var target_pos = [x, y];
    // Kiểm tra có đá trên đường, nếu ko có thì di chuyển
    if(checkRocksOnRoad(char_pos, target_pos)) moveToPos(char_pos, target_pos);

    // Lưu trạng thái trước khi load quest
    sessionStorage.setItem("x", target_pos[0]);
    sessionStorage.setItem("y", target_pos[1]);

    setTimeout(function(){
        sessionStorage.setItem("min", document.getElementById('m').innerHTML);
        sessionStorage.setItem("sec", document.getElementById('s').innerHTML);
    }, default_delaytime);
    // Lấy id tọa độ của quái (để ẩn khi trả lời đúng)
    if(isEnemy(target_pos)) sessionStorage.setItem("id", id);

    // Kiểm tra đích đếm có phải quái hoặc có lại quái đã bị thu phục hay ko, nếu có thì chuyển tab quest
    if(isEnemy(target_pos) && !isDefeatedEnemiesPos(sessionStorage.getItem("hidden_id_str"), id)){
        setTimeout(function(){
            var q = Math.floor((Math.random() * default_quests_num) + 1);
            window.location="./q" + q + ".html";
            sessionStorage.setItem("q", 'q' + q); // Lưu mã quest
        }, default_delaytime);
    }
}

function sendAnswer(){
    // Lấy lựa chọn của người chơi
    var choose_value;
    var choose = document.getElementsByName("txtChoose");
    for(var i = 0; i < choose.length; i++){
        if(choose[i].checked) choose_value = choose[i].value;
    }
    // Kiểm tra đáp án
    var q = sessionStorage.getItem("q");
    var answer = "false";
    for(var i in default_quests_arr){
        if(q === default_quests_arr[i][0] && choose_value === default_quests_arr[i][1]){
            answer = "true";
            break;
        }
    }

    // Xử lí giao diện sau khi trả lời
    var process = parseInt(sessionStorage.getItem("process"));
    var hp = parseInt(sessionStorage.getItem("hp"));
    var id = sessionStorage.getItem("id");
    var hidden_id_str;
    if(answer === "true"){
        // Tăng process
        process ++;
        // lưu chuỗi các id để ẩn quái khi load map
        if(process === 1){
            hidden_id_str = id;
        }
        else{
            hidden_id_str = sessionStorage.getItem("hidden_id_str") + ',' + id;
        }
        // Thông báo
        alert("Chính xác ! ~ (*≧∀≦)/");
    }
    else{
        // Giảm hp
        hp --;
        // lưu chuỗi các id để ẩn quái khi load map
        if(process > 0){
            hidden_id_str = sessionStorage.getItem("hidden_id_str");
        }
        // Thông báo
        alert("Rất tiếc, kết quả sai mất rồi ~ (╥_╥)");
    }


    // Lấy trạng thái giao diện sau xử lí câu trả lời và trc load map
    sessionStorage.setItem("min", document.getElementById('m').innerHTML);
    sessionStorage.setItem("sec", document.getElementById('s').innerHTML);

    sessionStorage.setItem("hp", hp);
    sessionStorage.setItem("process", process);

    sessionStorage.setItem("hidden_id_str", hidden_id_str);

    // Kiểm tra nếu hp == 0 --> lose.html
    if(hp === 0){
        alert("Bạn đã hết thể lực ~ ミ(ノ_ _)ノ");
        window.location = "./lose.html";
    }

    // Kiểm tra nếu process == 10 --> win.html
    if(process === 10){
        alert("Bạn đã thu phục được toàn bộ quái trên bản đồ ~ (ノ￣ω￣)ノ");
        window.location = "./win.html";
    }

    // Nếu ko vào các trường hợp trên --> map.html
    if(hp !== 0 && process !== 10) window.location = "./map.html";
}

function backToMenu(){
    // Set sessionStorage về giá trị mặc định
    sessionStorage.setItem("x", 263);
    sessionStorage.setItem("y", 1);
    sessionStorage.setItem("min", default_min);
    sessionStorage.setItem("sec", default_sec);
    sessionStorage.setItem("hp", 3);
    sessionStorage.setItem("process", 0);
    sessionStorage.setItem("id", '');
    sessionStorage.setItem("hidden_id_str", '');

    // Điều hướng về menu
    if(confirm("Bạn sẽ quay trở lại menu, chắc chắn chứ ?")) window.location = "../MathMaze.html";
}
