$(function() {
  $('.comment').on('click', function(e) {
    var $elm = $(this)
    var toId = $elm.data('tid')
    var commentId = $elm.data('cid')

    if($('#toId').length > 0) {
      $('#toId').val(toId)
    } else {
      $('<input>').attr({
        type: 'hidden',
        name: 'comment[tid]',
        id: 'toId',
        value: toId
      }).appendTo('#commentForm')
    }

    if($('#commentId').length > 0) {
      $('#commentId').val(commentId)
    } else {
      $('<input>').attr({
        type: 'hidden',
        name: 'comment[cid]',
        id: 'commentId',
        value: commentId
      }).appendTo('#commentForm')
    }


  })
})
