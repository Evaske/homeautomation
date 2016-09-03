// Socket Toggle
$('.toggle-wrapper').on('click', function () {
  var nodeID = $(this).parent().attr('data-nodeid');

  if($(this).hasClass('off')) {
    $(this).addClass('on').removeClass('off');
    $.ajax({
      type: 'POST',
      url: '/api/nodes/' + nodeID,
      data: { action: 'on' }
    });
  } else {
    $(this).addClass('off').removeClass('on');
    $.ajax({
      type: 'POST',
      url: '/api/nodes/' + nodeID,
      data: { action: 'off' }
    });
  }
});

// Node Delete
$('.delete-node').on('click', function () {
  $.ajax({
    type: 'DELETE',
    url: '/api/nodes/',
    success: function() {
      $('.notification').slideDown().text('Please unpair the node using the device button').delay(2000).slideUp();
    }
  });
});

// Node Add
$('#addNode').on('click', function (event) {
  var name = $('#nodeName').val();
  var room = $('#nodeLocation').val();
  var type = $('#nodeType').val();

  $.ajax({
    type: 'POST',
    url: '/api/nodes/',
    data: {name: name, room: room, type: type },
    success: function() {
      $('.notification').slideDown().text('Please pair the node using the device button').delay(2000).slideUp();
    }
  });
  event.preventDefault();
});

// Room Delete
$('.room-delete').on('click', function () {
  var slug = $(this).parent().attr('data-roomid');
  $.ajax({
    type: 'DELETE',
    url: '/api/rooms/',
    data: { slug: slug },
    success: function() {
      window.location.replace("/settings/rooms/");
    }
  });
});

// Room Add
$('#addRoom').on('click', function (event) {
  var name = $('#roomName').val();
  var slug = $('#roomSlug').val();
  var icon = $('#roomIcon').val();

  $.ajax({
    type: 'POST',
    url: '/api/rooms/',
    data: {name: name, slug: slug, icon: icon },
    success: function() {
      window.location.replace("/settings/rooms/");
    }
  });
  event.preventDefault();
});

// Room Update
$('#updateRoom').on('click', function (event) {
  var name = $('#roomName').val();
  var slug = $('#roomSlug').val();
  var icon = $('#roomIcon').val();
  var slugOld = $('#roomSlugOld').val();

  $.ajax({
    type: 'PUT',
    url: '/api/rooms/',
    data: {slugold: slugOld, name: name, slug: slug, icon: icon },
    success: function() {
      $('.notification').slideDown().text('Room successfully updated').delay(2000).slideUp();
      setTimeout(function() {
        window.location.replace("/settings/rooms-edit/" + slug);
      }, 2000);
    }
  });
  event.preventDefault();
});

$('.mobile-menu').on('click', function () {
  if($(this).hasClass('open')) {
    $('.mobile-dropdown').animate({'left':'-100%'});
    $(this).removeClass('open');
  } else {
    $('.mobile-dropdown').animate({'left':'0'});
    $(this).addClass('open');
  }
});

$('.close-menu').on('click', function () {
  if($('.mobile-menu').hasClass('open')) {
    $('.mobile-dropdown').animate({'left':'-100%'});
    $('.mobile-menu').removeClass('open');
  } else {
    $('.mobile-dropdown').animate({'left':'0'});
    $('.mobile-menu').addClass('open');
  }
});

document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

$('select').selectBox();
