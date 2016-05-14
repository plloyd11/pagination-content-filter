(function($) {
    var pagination = $('<div class="pagination"><ul></ul></div>');
    var studentsPerPage = 10;
    var studentsTotal = $('.student-item').length;

    // Part 1: Pagination

    // Create Pagination Nav Items
    (function() {
        $('.page').append(pagination);
        var pagesNeeded = Math.ceil(studentsTotal / studentsPerPage);
        for (var i = 0; i < pagesNeeded; i++) {
            var navItems = '<li><a href=#> ' + (i + 1) + '</a></li>';
            $('.pagination ul').append(navItems);
        }
        $('.student-list li').hide();
    })();

    var navBinder = function(array) {
      // Add first 10 list items to an array and remove them from the available list
      // Think about creating a callback function (navBinder) that can automatically bind arrays to bottom nav
      // This function would be called in the click handler for the bottom nav
   };

    var studentsToShow = function() {
        var currentPageList;
        // cache student list items
        var studentItems = document.getElementsByClassName('student-item');
        // Array to store current students on page
        var students = jQuery.makeArray(studentItems);

        // forEach, if indexOf is less than 10, add to array that is bound to first list item

    };


    studentsToShow();

})(jQuery);
