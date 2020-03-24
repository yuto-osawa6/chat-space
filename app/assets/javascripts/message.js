$(function() {
  
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="main__message-list__box" data-message-id= ${message.id}>
        <div class="uppaer-info">
          <p class="uppaer-info__talker">
            ${message.user_name}
          </p>
          <p class="uppaer-info__date">
            ${message.created_at}
          </p>
        </div>
        <p class="message-text"></p>
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src="${message.image}" class="lower-message__image" >
      </div>`
    } else if (message.content) {
      var html = `<div class="main__message-list__box" data-message-id=${message.id}>
        <div class="uppaer-info">
          <p class="uppaer-info__talker">
            ${message.user_name}
          </p>
          <p class="uppaer-info__date">
            ${message.created_at}
          </p>
        </div>
        <p class="message-text"></p>
          <p class="lower-message__content">
            ${message.content}
            </p>
      </div>`
    } else if (message.image) {
      var html = `<div class="main__message-list__box" data-message-id= ${message.id}>
        <div class="uppaer-info">
          <p class="uppaer-info__talker">
            ${message.user_name}
          </p>
          <p class="uppaer-info__date">
            ${message.created_at}
          </p>
        </div>
        <p class="message-text"></p>
          <img src="${message.image}" class="lower-message__image" >
        </p>
      </div>`
    };
    return html;
  };



  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
       .done(function(data){
         var html = buildHTML(data);
         $('.main__message-list').append(html);      
         $('form')[0].reset();
         $('.main__message-list').animate({ scrollTop: $('.main__message-list')[0].scrollHeight});
       })
       .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
    return false;
  });

  
  
  
    var reloadMessages = function() {
      var last_message_id = $('.main__message-list__box:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main__message-list').append(insertHTML);
      $('.main__message-list').animate({ scrollTop: $('.main__message-list')[0].scrollHeight});
      }
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
  });