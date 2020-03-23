$(function(){ 
function buildHTML(message){
  if ( message.image ) {
    var html =
     `<div class="main__message-list__box">
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
        <img src=${message.image} >
      </div>`
    return html;
  } else {
    var html =
     `<div class="main__message-list__box">
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
      return html;
    };
  }

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
})
});