var rodada = 1;
var matriz_game = Array(3);

matriz_game['a'] = Array(3);
matriz_game['b'] = Array(3);
matriz_game['c'] = Array(3);

matriz_game['a'][1] = 0;
matriz_game['a'][2] = 0;
matriz_game['a'][3] = 0;   

matriz_game['b'][1] = 0;
matriz_game['b'][2] = 0;
matriz_game['b'][3] = 0;

matriz_game['c'][1] = 0;
matriz_game['c'][2] = 0;
matriz_game['c'][3] = 0;

$(document).ready(function(){

    $('#btn-start').click(function(){

        if($('#jogador_1').val() == ''){
            alert('Apelido do jogador 1 não foi preenchido')
            return false;
        }

        if($('#jogador_2').val() == ''){
            alert('Apelido do jogador 2 não foi preenchido')
            return false;
        }

        $('#nome_1').html($('#jogador_1').val());
        $('#nome_2').html($('#jogador_2').val());

        $('.inicio').addClass('hide');
        $('.game').removeClass('hide');
    });

    $('.btn-back').click(function(){
        $('.game').addClass('hide');
        $('.inicio').removeClass('hide');
    });

    $('.game .col-4').click(function(){
        var gridID = this.id;
        $('#'+gridID).off();
        round(gridID);
    });

    function round(id){
        var icon = '';
        var point = 0;

        if((rodada % 2) == 1){
            icon = 'url("imagens/marcacao_1.png")';
            point = -1;
        }else{
            icon = 'url("imagens/marcacao_2.png")';
            point = 1;
        }
        rodada++;

        //Coloca o ícone em cada jogada.
        $('#'+id).css({'background-image': icon, 'background-size': 'cover' });

        var lineCol = id.split('-');

        matriz_game[lineCol[0]][lineCol[1]] = point;

        setTimeout(function(){
            check_combination();
        },300)
        

    }

    function check_combination(){
        
        //verifica na horizontal
        var points = 0;
        for(var i = 1; i <= 3; i++){
            points = points + matriz_game['a'][i];
        }
        winning(points);

        var points = 0;
        for(var i = 1; i <= 3; i++){
            points = points + matriz_game['b'][i];
        }
        winning(points);

        var points = 0;
        for(var i = 1; i <= 3; i++){
            points = points + matriz_game['c'][i];
        }
        winning(points);

        //verifica na vertical

        for(var l = 1; l <= 3; l++){
            points = 0;
            points += matriz_game['a'][l];
            points += matriz_game['b'][l];
            points += matriz_game['c'][l];

            winning(points);
        }

        //verifica na diagonal
        points = matriz_game['a'][1] + matriz_game['b'][2] + matriz_game['c'][3];
        winning(points);

        points = matriz_game['a'][3] + matriz_game['b'][2] + matriz_game['c'][1];
        winning(points);

    }

    function winning(points){
        if(points == -3){
            var nome_1 = $('#nome_1').html();
            alert( nome_1 + ' venceeeu! :D');
            $('.col-4').off();
        }else if(points == 3){
            var nome_2 = $('#nome_2').html();
            alert( nome_2 + ' venceeeu! :D');
            $('.col-4').off();
        }
    }

    $('.btn-reset').click(function(){
        location.reload();
    })

});