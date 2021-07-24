// content.js
var win_ = window;
if(localStorage.getItem("ch1") == null) {
    localStorage.setItem("ch1", 0)
}

const OPEN_NEW_WINDOW = false;
// Код для оптимизации времени на аккаунт
//localStorage.setItem("ch", '{"posts": []}')

//function add_post(name, time, time_wait) {
//  let lastItem = JSON.parse(localStorage.getItem("ch"))
//  dict = {"name": name, "time": time, "wait": time_wait}
//  lastItem.posts.push(dict)
//  localStorage.setItem("ch", JSON.stringify(lastItem))
//}

//function remove_post(name) {
//  let lastItem = JSON.parse(localStorage.getItem("ch"))
//  for (let i = 0; i++; lastItem.posts.length < i) {
//    if(lastItem.posts[i].name == name) {lastItem.posts.splice(i); break;}
//  };
//};

//function get_posts() {
//  return JSON.parse(localStorage.getItem("ch"))
//};

//console.log(get_posts())
//add_post("nn", 1, 1)
//console.log(get_posts())
//remove_post("nn")
//console.log(get_posts())



// YOBIT //
if(document.URL.includes("yobit.net/ru/cryptotalk/") || document.URL.includes("yobit.net/ru/paybyposts/")) {
  // Обработка ошибки при отправке хуйни
  function doAffSig4SendEarnedToBalance()
  {
    var csrf_token = $('#csrf_token').val();
    $.ajax({
        url: '/ajax/system_affiliate_signature4.php', cache: !1, type: 'POST',
        data: {action:'send_earned_to_balance', csrf_token:csrf_token},
        dataType: 'json',
        success: function(data)
        {
            if(data.result == "OK")
            {
              window.location.reload();
            }
            else //if(data.error == 1)
            {
              message = '{"error": '+data.error+', "error_log: '+data.error_log+'}'
              if (document.querySelector('div[class="claim-info"]') == null) {
                // Вставка нового элемента
                let b = document.querySelector('input[onclick="doAffSig4SendEarnedToBalance();"]')
                b.insertAdjacentHTML('afterEnd', '<div class="claim-info">' + message + '</div>');
              } else {
                // Смена текста.
                document.querySelector('div[class="claim-info"]').textContent = message;
              }
            }
        },
        error: function()
        {
        }
      });
  }






  document.querySelector('span[class="red"]').textContent = "" // убрать лишний 0
  let urlParams = new URLSearchParams(window.location.search);
  let posts = parseInt(urlParams.get('posts'));
  if (isNaN(posts) == false) {
    let timestamp = parseInt(urlParams.get('timestamp'));
    let p_posts = parseInt(document.querySelectorAll('span[style="color:#0aadef"]')[1].innerText)
    let p__posts = p_posts + posts

    let now_ts = Math.floor(Date.now() / 1000)
    let raz = parseInt((now_ts - timestamp) / 180)
    if((posts*3) - raz > 0) {
      var time_post = (posts*3) - raz
      p__posts = p__posts - parseInt(raz/3)
    } else {
      var time_post = 0
      p__posts = 0
    }

    document.querySelectorAll('span[style="color:#0aadef"]')[1].innerText = p_posts + " + ["+p__posts+"] (~"+time_post+" мин.)"

    let table = document.querySelectorAll('table[class="big_table big_table_top dataTable no-footer"]')[1]
    let last_posts = table.querySelectorAll('td')[1].innerText
    let plus_posts = parseInt(last_posts) + parseInt(posts)
    table.querySelectorAll('td')[1].innerText = '['+plus_posts+']'+last_posts

  }
}
// YOBIT //


function add_post() {
  let lastItem = parseInt(localStorage.getItem("ch1"))
  localStorage.setItem("ch1", lastItem+1)
}
function remove_post() {
  let lastItem = parseInt(localStorage.getItem("ch1"))
  localStorage.setItem("ch1", lastItem-1)
};
function get_posts() {
  return parseInt(localStorage.getItem("ch1"))
};

// Обработка параметров 
if(document.URL.includes("cryptotalk.org")) {
  let urlParams = new URLSearchParams(window.location.search);
  let send = parseInt(urlParams.get('send'));
  if (isNaN(send) == false) {
    setTimeout(() => { document.querySelector('button[class="ipsButton ipsButton_primary"]').click(); }, 5000);
  };
};
// Отбработка закончена!!







// CRYPTOTALK //

var button_minus = "<button type=\"button\" class=\"minus-button\" data-quantity=\"minus\" data-field=\"quantity\" onclick=\"localStorage.setItem('ch1', parseInt(localStorage.getItem('ch1'))-1); document.querySelector('span[class=\'by-text\'].innerText = 'В процессе отправки '+parseInt(localStorage.getItem('ch1'))+' постов (~'+3*parseInt(localStorage.getItem('ch1'))+' мин.)')\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>"
var button_plus = "<button type=\"button\" class=\"plus-button\" data-quantity=\"plus\" data-field=\"quantity\" onclick=\"localStorage.setItem('ch1', parseInt(localStorage.getItem('ch1'))+1); document.querySelector('span[class=\'by-text\'].innerText = 'В процессе отправки '+parseInt(localStorage.getItem('ch1'))+' постов (~'+3*parseInt(localStorage.getItem('ch1'))+' мин.)')\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>"

var button_yobit = "<button class=\"Yo\" onclick=\"window.open('https://yobit.net/ru/cryptotalk/?posts='+localStorage.getItem('ch1')+'&timestamp='+Math.floor(Date.now() / 1000), '_about');\">Yobit</button>"

let posts_count = get_posts()
var by_text = "<span class=\"by-text\" style=\"color: #34c0eb; font-size: 20px; font-weight: bold; margin-right: 20px; text-shadow: 1px 0 0 #656bad, -1px 0 0 #656bad, 0 1px 0 #656bad, 0 -1px 0 #656bad, 1px 1px #656bad, -1px -1px 0 #656bad, 1px -1px 0 #656bad, -1px 1px 0 #656badb;\">В процессе отправки "+posts_count+" постов (~"+posts_count*3+" мин.)</span>"
if(win_.document.URL.includes("cryptotalk.org")) {
  win_.document.querySelector('div[class="focus-nav"]').insertAdjacentHTML('AfterEnd', by_text);
  win_.document.querySelector('span[class="by-text"]').insertAdjacentHTML('AfterEnd', button_yobit);
}
//win_.document.querySelector('span[class="by-text"]').insertAdjacentHTML('AfterEnd', button_minus);
//win_.document.querySelector('button[class="minus-button"]').insertAdjacentHTML('AfterEnd', button_plus);

var button_down = "<button name=\"button-down\" onclick=\"document.getElementById('replyForm').scrollIntoView();\">Пролистать вниз</button>"
var button_up = "<button name=\"button-up\" style=\"width: 200px; margin-top: 5px; margin-left: 36%;\" onclick=\"document.getElementById('cUserLink').scrollIntoView();\">Пролистать вверх</button>"

if (win_.document.URL.includes("topic")) {
  win_.document.querySelector('button[class="Yo"]').insertAdjacentHTML('AfterEnd', button_down);
  win_.document.getElementById('replyForm').insertAdjacentHTML('AfterEnd', button_up);
}



// text settings
var ERROR_TEXT = "{ color: red; font-size: 25px; font-weight: bold; }";
var INFO_TEXT = "{ color: #DA621A; font-size: 25px; font-weight: bold; }";
var SUCCESS_TEXT = "{ color: green; font-size: 40px; font-weight: bold; }";
var MSGS_INFO = "{ color: #e649e3; font-size: 14px; font-weight: bold; }";
win_.document.body.insertAdjacentHTML('beforeEnd', '<style class="abuztrade-style">.text-information-by-abuztrade'+INFO_TEXT+' .error-info'+ERROR_TEXT+' .success-info'+SUCCESS_TEXT+' .msgs-info'+MSGS_INFO+'</style>');

var NOTICE = true;
var SET180 = true;

// Вставка [НЕ ОПЛАЧИВАЕТСЯ] в неоплачивыемые топики (оффтопик, баунти) 
if (win_.document.URL == "https://cryptotalk.org/") {
  var threads = win_.document.querySelectorAll('h4[class="ipsDataItem_title ipsType_large ipsType_break"]')
  threads[4].innerHTML = threads[4].innerHTML.replace('Bounties', 'Bounties [НЕ ОПЛАЧИВАЕТСЯ]')
  threads[18].innerHTML = threads[18].innerHTML.replace('Off Topic', 'Off Topic [НЕ ОПЛАЧИВАЕТСЯ]')
  threads[23].innerHTML = threads[23].innerHTML.replace('Баунти кампании', 'Баунти кампании [НЕ ОПЛАЧИВАЕТСЯ]')
  threads[38].innerHTML = threads[38].innerHTML.replace('Оффтопик', 'Оффтопик [НЕ ОПЛАЧИВАЕТСЯ]')
}

// Классы поста, чтобы находить его на странице
var post_classes = "cke_wysiwyg_div cke_reset cke_enable_context_menu cke_editable cke_editable_themed cke_contents_ltr"

// info element
// var text_info = win_.document.querySelector('label[for="check_auto_follow_toggle"]');
var text_info = win_.document.querySelector('div[class="ipsGrid ipsGrid_collapsePhone ipsPager ipsClearfix ipsSpacer_top ipsContained"]');

// error element
var error_info = win_.document.querySelector('div[data-role="replyArea"]'); 
// Подсчет текста
function text_infomation() {

  // Достаем текст из поста, удаляя блоки с quote.
  var my_post = win_.document.getElementsByClassName(post_classes)
  if (my_post.length >= 1) {
    my_post = my_post[0].innerHTML.replace(/<div[\S\W\D]+div>/g, '').replace(/<[/\w]+>/g, '').replace(/&nbsp;/g, ' ').replace(/<[\W\S\D]+>/g, ')');
  } else {
    return
  }

  // Формируем сообщение.
  var message = " Длина поста " + my_post.length + " word. Без пробелов: " + my_post.replace(/[\s]+/g, '').length + "";
  if (my_post.length % 10 == 1) { message = message.replace("word", "символ") } else if ([2,3,4].indexOf( my_post.length % 10 ) != -1) { message = message.replace("word", "символа") } else { message = message.replace("word", "символов")}
  

  // Если элемент есть, то заменяем текст, если нет, создаем.
  if (win_.document.querySelector('span[class="text-information-by-abuztrade"]') == null) {
    // Вставка нового элемента
    text_info.insertAdjacentHTML('beforeBegin', '<h1><span class="text-information-by-abuztrade">' + message + '</span></h1>');
  } else {
    // Смена текста.
    win_.document.querySelector('span[class="text-information-by-abuztrade"]').textContent = message;
  }
}


// Запускаем код 1 раз
setTimeout(text_infomation(), 0);


// При нажатии на любую кнопку внутри поста, будет срабатывать функция
win_.document.body.addEventListener('keyup', event => {
  if (event.target.className != post_classes) {
    return
  }
  setTimeout(text_infomation(), 0);
});


// Код для отправки сообщения 
elem = win_.document.querySelector('button[class="ipsButton ipsButton_primary"]')
if(elem != null) {
  elem.onclick = function() {
    setTimeout(() => { check_error(); text_infomation();}, 7000);
    error_info.insertAdjacentHTML('beforeBegin', '<h2><span class="error-info">Ожидание 7 секунд перед проверкой ошибок...</span></h2>'); win_.document.title = 'Проверка';
  };
};

function check_error() {
  // если поле с ошибкой не существует, то ниче не делать
  try {
    error = win_.document.querySelector('div[data-role="commentFormError"]').innerText
      
  } catch(er) {
    error_info.insertAdjacentHTML('beforeBegin', '<h2><span class="neitral-info">Текст отправлен без ошибок.</span></h2>');
    
    setTimeout(() => { win_.document.querySelector('span[class="neitral-info"]').remove(); }, 5000)

    win_.document.querySelector('span[class="error-info"]').remove()
    
    console.log("Текст отправлен без ошибок.")

    return
  }

  // Если ошибка != ошибке пустого поля
  if (error != "This field is required.") {
    // seconds = Количество секунд ожидания
    var urlParams = new URLSearchParams(window.location.search);
    var send = parseInt(urlParams.get('send'));
    if (isNaN(send) && OPEN_NEW_WINDOW == true) {
      win_.open(win_.location+'?send=1', '_about')
    } else {

      if (SET180 == true) {
        seconds = 186 // + 180*get_posts()
      } else {
        seconds = error.replace(/\D+/g, "")
        seconds = parseInt(seconds)
        seconds = seconds.toString()
      }
      add_post()
      
      //**************** Таймер ****************
      msg = 'Попытка повторно отправить сообщение через ' + (parseInt(seconds) - 6) + ' сек.'
      
      // Если элемент есть, то заменяем текст, если нет, создаем.
      if (win_.document.querySelector('span[class="error-info"]') == null) {
        // Вставка нового элемента
        error_info.insertAdjacentHTML('beforeBegin', '<h2><span class="error-info">' + msg + '</span></h2>');

          } else {
        // Смена текста.
        win_.document.querySelector('span[class="error-info"]').textContent = msg;

      }
      setTimeout(() => { 
        sl = 0 
        for (let i = (parseInt(seconds) - 7); i > 0; i--) {                         
          setTimeout(() => { win_.document.querySelector('span[class="error-info"]').textContent = 'Попытка повторно отправить сообщение через ' + i + ' сек.'; win_.document.title = i;
          }, sl)
          sl += 1000 
        }
      }, 0)
      //**************** Таймер ****************
      

      // Задержка в seconds-7 сек и нажатие на кнопку Отправить
      setTimeout(() => { win_.document.querySelector('button[class="ipsButton ipsButton_primary"]').click(); error_info.insertAdjacentHTML('beforeBegin', '<h2><span class="success-info">Сообщение отправлено.</span></h2>');  remove_post();}, ((parseInt(seconds) - 7) * 1000));
        //check_error()
        setTimeout(() => { win_.document.querySelector('span[class="success-info"]').remove(); check_error() ;if (NOTICE == true) { win_.document.title = "Done!" }; }, ((parseInt(seconds) + 7) * 1000));

        setTimeout(() => { win_.document.querySelector('span[class="error-info"]').remove(); }, (parseInt(seconds) - 6) * 1000);
    }
  } else {
    // Ошибка, поле пусто.
    win_.document.querySelector('span[class="error-info"]').remove(); 
    return
  } 
}
