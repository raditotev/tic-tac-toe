var count = 0;
var player =  {
                turn: false,
                token: "",
                class: ""
              };
var computer = {            
                token: "",
                class: ""
              }

var startGame = function (){
                  var token = $(this).attr("id");
                  player.class = token;
                  player.token = $(this).html();    
                  player.turn = Math.random() < 0.5 ? true : false;
                  computer.token = token == "times" ? '<i class="fa fa-circle-o" aria-hidden="true"></i>':
                                                      '<i class="fa fa-times" aria-hidden="true"></i>';
                  computer.class = player.class == "times" ? "circle" : "times";
                  $('#select-token').fadeOut();
                  $('#table').fadeIn();
                  if (!player.turn){
                    play();
                  }
                }

var newGame = function(){       
                $('td').removeAttr( "class" );  
                $('td').empty(); 
                $('#game-over').fadeOut();    
                count = 0;  
                if (!player.turn){
                  play();
                }
              }

var placeToken = function(selector){
                  $(selector).html(computer.token);
                  $(selector).addClass(computer.class); 
                }

var checkWinDefeat = function(arg){
                        var one = $('#1').hasClass(arg);
                        var two = $('#2').hasClass(arg);
                        var three = $('#3').hasClass(arg);
                        var four = $('#4').hasClass(arg);
                        var five = $('#5').hasClass(arg);
                        var six = $('#6').hasClass(arg);
                        var seven = $('#7').hasClass(arg);
                        var eight = $('#8').hasClass(arg);
                        var nine = $('#9').hasClass(arg);                        

                        if ( ((two && three) || (four && seven) || (five && nine)) && $('#1').is(':empty') ){
                          placeToken('#1');                          
                        }else if ( ((one && three) || (five && eight)) && $('#2').is(':empty') ){
                          placeToken('#2');                          
                        }else if ( ((one && two) || (six && nine) || (five && seven)) && $('#3').is(':empty') ){
                          placeToken('#3');                          
                        }else if ( ((one && seven) || (five && six)) && $('#4').is(':empty') ){
                         placeToken('#4');                          
                        }else if ( ((one && nine) || (two && eight) || (three && seven) || (four && six)) && $('#5').is(':empty') ){
                          placeToken('#5');                          
                        }else if (( (four && five) || (three && nine)) && $('#6').is(':empty') ){
                          placeToken('#6');                         
                        }else if ( ((one && four) || (three && five) || (eight && nine)) && $('#7').is(':empty') ){
                         placeToken('#7');                          
                        }else if ( ((seven && nine) || (two && five)) && $('#8').is(':empty') ){
                          placeToken('#8');                          
                        }else if ( ((one && five) || (three && six) || (seven && eight)) && $('#9').is(':empty') ){
                          placeToken('#9');                          
                        }else{
                          return false;
                        }                        
                        checkForWinner();
                        return true;                        
                      }

var nextMove = function(){
                if ($('#5').is(':empty')){
                  placeToken('#5');
                }else if ( $('#1').hasClass(player.class) && !$('#5').is(':empty') && $('#9').hasClass(player.class) ){
                  if ( $('#2').is(':empty') ){
                    placeToken('#2');
                  }else if( $('#8').is(':empty') ){
                    placeToken('#8');
                  }else if( $('#4').is(':empty') ){
                    placeToken('#4');
                  }else if( $('#6').is(':empty') ){
                    placeToken('#6');
                  }                  
                }else if ( $('#3').hasClass(player.class) && !$('#5').is(':empty') && $('#7').hasClass(player.class) ){
                  if ( $('#2').is(':empty') ){
                    placeToken('#2');
                  }else if( $('#8').is(':empty') ){
                    placeToken('#8');
                  }else if( $('#4').is(':empty') ){
                    placeToken('#4');
                  }else if( $('#6').is(':empty') ){
                    placeToken('#6');
                  }   
                }else if ( $('#7').hasClass(player.class) && !$('#5').is(':empty') && $('#3').is(':empty') ){
                  placeToken('#3');
                }else if ( $('#9').hasClass(player.class) && !$('#5').is(':empty') && $('#1').is(':empty') ){
                  placeToken('#1');
                }else if ( $('#1').is(':empty') ){
                  placeToken('#1');
                }else if ( $('#3').is(':empty') ){
                  placeToken('#3');
                }else if ( $('#7').is(':empty') ){
                  placeToken('#7');
                }else if ( $('#9').is(':empty') ){
                  placeToken('#9');
                }else{
                  placeToken('td:empty:first');
                }                 
              }

var play = function() {  
            
              if (player.turn){
                if ($(this).is(':empty')){
                  $(this).html(player.token);
                  $(this).addClass(player.class);     
                  player.turn = false;
                  play();
                }               
              }else{
                if ( !(checkWinDefeat(computer.class) || checkWinDefeat(player.class)) ){
                  nextMove();                
                }               
                player.turn = true;
              }      
              count++;              

            if (count == 9){   
              $('#game-over h1').text("It's a draw.")
              $('#game-over').fadeIn();                 
            }

            checkForWinner();              
          }

var checkForWinner = function() {                        
                        var token = ["circle", "times"];
                        for (var i = 0; i < token.length; i++){
                          if ( // Horizontal
                              ($('#1').attr('class') == token[i] && $('#2').attr('class') == token[i] && $('#3').attr('class') == token[i]) ||
                              ($('#4').attr('class') == token[i] && $('#5').attr('class') == token[i] && $('#6').attr('class') == token[i]) ||
                              ($('#7').attr('class') == token[i] && $('#8').attr('class') == token[i] && $('#9').attr('class') == token[i])||
                              // Vertical
                              ($('#1').attr('class') == token[i] && $('#4').attr('class') == token[i] && $('#7').attr('class') == token[i])||
                              ($('#2').attr('class') == token[i] && $('#5').attr('class') == token[i] && $('#8').attr('class') == token[i])||
                              ($('#3').attr('class') == token[i] && $('#6').attr('class') == token[i] && $('#9').attr('class') == token[i])||
                              // Diagonals
                              ($('#1').attr('class') == token[i] && $('#5').attr('class') == token[i] && $('#9').attr('class') == token[i])||
                              ($('#3').attr('class') == token[i] && $('#5').attr('class') == token[i] && $('#7').attr('class') == token[i])
                             ){
                            
                            var winningToken = token[i];
                            var whoWon = "";
                            if (player.class == winningToken){
                              whoWon  = 'You won!';
                              player.turn = true;
                            } else {
                              whoWon = 'Computer won.';
                              player.turn = false;
                            }
                            $('#game-over h1').text(whoWon);
                            $('#game-over').fadeIn();                              
                          }
                        }                       
                      }

$(function(){     
  setTimeout(function(){ 
    $('#welcome-screen').animate({'top': '20px', 'transform' : 'none'}, 1000); 
    setTimeout(function(){ $('#select-token').show(); }, 1000);    
  }, 1500);  
  $('#select-token span').click(startGame);
  $('td').click(play); 
  $('button').click(newGame);
});