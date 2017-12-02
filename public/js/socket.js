
     $(function (){
        var socket = io();

        $(window).on('mousemove', function(e){
            // console.log(e.pageX, e.pageY);
            // socket.emit('position', [e.pageX, e.pageY]);
          });

        let room = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

        $('form').submit(function(){
          socket.emit('chat message', {text: $('#m').val(), url: room});
          
          $.post('chatMsg',{'msg': $('#m').val(), 'room': room}, function(){});

          $('#m').val('');
          return false;
        });

        socket.on('chat message', function(msg){
          console.log(msg);
          if(msg.url == room){
            $('#messages').append($('<li>').text(msg.text));
            window.scrollTo(0, document.body.scrollHeight);
          }else{
            $(`#${msg.url}`).text(msg.text);
            console.log(msg);
          }
        });

        socket.on('typing', function(msg){
          console.log(msg);
          if(msg.url == room){
            
          }else{
            $(`#${msg.url}`).text(msg.text);
          }
        });

        $('form').keyup(() => {
          console.log("KEYUP");
          socket.emit('typing', {text: $('#m').val(), url: room});
        })

        socket.emit('start', {text: "testing", url: room});

        // $('form').submit(function(){
        //   socket.emit('chat message', $('#m').val());
        //   $('#m').val('');
        //   return false;
        // });
        // socket.on('chat message', function(msg){
        //   addDonut();
        //   $('#messages').append($('<li>').text(msg));
        //   window.scrollTo(0, document.body.scrollHeight);
        // });

        // $(window).click(function(e){
        //   addDonut();
        // })

      });