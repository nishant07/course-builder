function dropItem(a, href, unit, lesson) {
    var lessonFind = $("#dropTable").find('[name="lesson"][value="'+ unit + '.' + lesson +'"]');

    var tr = $('<tr></tr>').append($('<td></td>').attr('style', "border-right: none").append($('<a></a>').text(a).attr('href', href))).
            append($('<td></td>').attr('style', "border-left: none").append($('<a></a>').attr('type', 'button').addClass('icon-remove pull-right')).
                    append($('<input>').attr('type', 'hidden').attr('name', 'lesson').attr('value', unit + "." + lesson)));

    if (lessonFind.length == 0) {
        $( "#dropTable tbody" ).append(tr);
    }
}

$(document).ready(function(){
    $('#droppedItems').on('click', '.icon-remove', function(){
        $(this).closest ('tr').remove ();
    });

    $( "#accordian" ).accordion();

    $("#.root li ul li a").draggable({
        appendTo: "body",
        helper: "clone"
    });

    $("#droppedItems").droppable({
        activeClass:"ui-state-default",
        hoverClass:"ui-state-hover",
        accept:":not(.ui-sortable-helper)",
        drop: function(event, ui) {
            var a = ui.draggable.text();
            var href = ui.draggable.attr('href');
            var unit = ui.draggable.attr('unit');
            var lesson = ui.draggable.attr('lesson');
            dropItem(a, href, unit, lesson);

            $('.checked_icon').each(function(index) {
                var a = $(this).parent('li').find('a').text();
                var href = $(this).parent('li').find('a').attr('href');
                var unit = $(this).parent('li').find('a').attr('unit');
                var lesson = $(this).parent('li').find('a').attr('lesson');

                dropItem(a, href, unit, lesson);
            });
        }
    });

    $("#droppedItems tbody").sortable();

    $('#submitForm').submit(function() {
        var count = 0;
        $('#dropTable > tbody  > tr').each(function() {
            $(this).find('input[name="lesson"]').attr('name', 'lesson.' + count);
            count++;
        });

        $('#total').attr('value', count);
    });

    $('#save').click(function(event) {
        event.preventDefault();
        $('#submitForm').submit();
    });

    $('#start').click(function() {
        if (!$(this).hasClass('disabled'))
            window.location = "unitplaylist";
    });

    $('#clear').click(function(event) {
        event.preventDefault();
        $('#start').addClass('disabled');
        $('#dropTable > tbody  > tr').each(function() {
            $(this).remove();
        });

    });

    $('#myCollapsible').collapse({
        toggle: false
    })
});

$(document).ready(function(){
    $( '.root ul' ).hide();
    $( 'li.branch > a:not(:first)' ).append( '<i class="icon-chevron-down pull-right" style="margin-top: 10px"></i>' );

    $( 'li.branch > a' ).click( function ( event ) {
        event.preventDefault();

        var leaves = $( this ).parent( 'li' ).children( 'ul' );

        if ( leaves.is( ':visible' ) ) {
            $( 'i.icon-chevron-up', this ).removeClass( 'icon-chevron-up' ).addClass( 'icon-chevron-down' );
            leaves.slideUp();
        }
        else {
            $( 'i.icon-chevron-down', this ).removeClass( 'icon-chevron-down' ).addClass( 'icon-chevron-up' );
            leaves.slideDown();
        }
    });

    $( '.inner_a, .checked_icon, .check_icon' ).click( function ( event ) {
        event.preventDefault();
        var leaves = $( this ).parent( 'li' ).find( 'i' );
        if (leaves.hasClass('check_icon')) {
            leaves.removeClass( 'check_icon' ).addClass('checked_icon');
        } else {
            leaves.removeClass( 'checked_icon' ).addClass('check_icon');
        }

        if ($('.checked_icon').length > 0) {
            $('.grey_arrow_icon').removeClass('grey_arrow_icon').addClass('green_arrow_icon');
        } else {
            $('.green_arrow_icon').removeClass('green_arrow_icon').addClass('grey_arrow_icon');
        }

        $('.green_arrow_icon').click(function(event) {
            $('.checked_icon').each(function(index) {
                var a = $(this).parent('li').find('a').text();
                var href = $(this).parent('li').find('a').attr('href');
                var unit = $(this).parent('li').find('a').attr('unit');
                var lesson = $(this).parent('li').find('a').attr('lesson');

                dropItem(a, href, unit, lesson);
            });
        });
    } );

    $('.green_arrow_icon').click(function(event) {
        $('.checked_icon').each(function(index) {
            var a = $(this).parent('li').find('a').text();
            var href = $(this).parent('li').find('a').attr('href');
            var unit = $(this).parent('li').find('a').attr('unit');
            var lesson = $(this).parent('li').find('a').attr('lesson');

            dropItem(a, href, unit, lesson);
        });
    });
});