var img = ["img/img1.png", "img/img2.png", "img/img3.png", "img/img4.png", "img/img5.png", "img/img6.png", "img/img7.png", "img/img8.png", "img/img9.png", "img/img10.png", "img/img11.png", "img/img12.png", "img/img13.png", "img/img14.png", "img/img15.png", "img/img16.png", "img/img17.png", "img/img18.png", "img/img19.png", "img/img20.png", "img/img21.png"]
var tileSelect = [];
var countMoves = 0;
var countHits = 0;
var moveAbility = true;

function shuffle(arr) {
    var i;
    for (i = arr.length-1 ; i > 0 ; i --) {
        var swap = Math.floor(Math.random()*i);
        var tmp = arr[i];
        arr[i] = arr[swap];
        arr[swap] = tmp;
    }
}



function setTiles(arr) {
    var i;
    var board = $('.board');
    for (i = 0 ; i < 2*img.length ; i ++) {
        var tile = $('<div class="tile"></div>');
        board.append(tile);
        tile.data('tileType', arr[i]);
        tile.data('index', i);

        tile.css({
            left : 5+(tile.width()+5)*(i%7)
        });
        tile.css({
            top : 5+(tile.height()+5)*(Math.floor(i/7))
        });

        tile.bind('click',function() {
            tileClick($(this))

        });
    }
}

function tileClick(tile) {

    if(moveAbility) {

        if(!tileSelect[0] || (tileSelect[0].data('index') != tile.data('index'))) {

            tile.fadeOut(0);
            tileSelect.push(tile);
            tile.css({'background-image' : 'url('+img[tile.data('tileType')]+')'});
            tile.show('slow');
        }
        if(tileSelect.length == 2) {
            moveAbility = false;
            if(tileSelect[0].data('tileType') == tileSelect[1].data('tileType')) {
                setTimeout('removeTiles()', 1200);
            }
            else {
                setTimeout('hideTiles()', 1200);
            }
            countMoves++;
            $('.moves').html('Moves: ' + countMoves);
        }

    }
}

function removeTiles() {
    $(tileSelect[0]).animate({width:0}, 300);
    $(tileSelect[1]).animate({width:0}, 300);
    tileSelect[0].fadeOut(function () {

        $(this).remove;
    })
    tileSelect[1].fadeOut(function () {
        $(this).remove;
    })
    moveAbility = true;
    countHits ++;
    if (countHits == img.length) {
        win();

    }
    tileSelect = [];
}

function hideTiles() {
    tileSelect[0].css({'background-image':'url(back.png)'})
    tileSelect[1].css({'background-image':'url(back.png)'})
    tileSelect = [];
    moveAbility = true;
}

function start() {
    $('.board').css({'background' : ''})
    $('.moves').html('Moves: 0');
    $('.start').hide('slow');
    tileSelect = [];
    countHits = 0;
    countMoves = 0;
    moveAbility = true;
    var tiles = [];
    var tilesAmount = 2*img.length;
    for (var i = 0 ; i < tilesAmount ; i ++) {
        tiles.push(Math.floor(i/2));
    }
    shuffle(tiles);
    setTiles(tiles);

}

function win() {
    $('.start').show('slow');
    $('.board').css({'background' : 'url("win.png") center center no-repeat'});
    $('.moves').html('You win with ' + countMoves + ' moves!');
}

function foo() {

        $('.start').click(function() {
            start();
        });
}

foo();