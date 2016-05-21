(function($) {
    // Content to be added in dynamically (Progressive Enhancement)
    var pagination = $('<div class="pagination"><ul></ul></div>');
    var searchBox = $('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
    var students = $('.student-list li').toArray(); // Array of students

    // Create Pagination Nav Items & Search Box so they are loaded initially
    (function() {
        var studentsPerPage = 10;
        var pagesNeeded = Math.ceil($(students).length / studentsPerPage);
        $('.page').append(pagination);
        $('.page-header').append(searchBox);
        for (var i = 0; i < pagesNeeded; i++) {
            var navItems = '<li><a href=#> ' + (i + 1) + '</a></li>';
            $('.pagination ul').append(navItems);
        }
        // Hide all students in the array except for the initial 10
        $(students).hide().slice(0, 10).show();
        // Add active class to first link in pagination
        $('.pagination').find('a').first().addClass('active');
    }());

    // Determine which list items to load
    function itemsOnPage(mainArray, emptyArray, start, end) {
        emptyArray = mainArray.slice(start, end);
        $(mainArray).hide();
        $(emptyArray).show();
    }

    // Add active class to pagination nav item
    function pagClick(active) {
        $('.pagination').find('a').removeClass('active');
        $(active).addClass('active');
    }

    // Bind 'active' class to click event handler
    pagination.on('click', 'a', function(e) {
        e.preventDefault();
        // store reference of user click
        var clicked = e.target;
        // store number that corresponds to pagination nav item
        var filter = $(clicked).html();
        var studentsPerPage = 10;
        var startSlice = (filter * studentsPerPage) - studentsPerPage;
        var endSlice = startSlice + studentsPerPage;
        var currentPage = [];

        pagClick(clicked);
        itemsOnPage(students, currentPage, startSlice, endSlice);

    });

    // Search IIFE

    (function() {
        var names = $('.student-item');
        var search = $('.student-search').find('input');
        var tempStudent = [];

        // Loop through each students details & store container element, email address & name
        names.each(function() {
            tempStudent.push({
                element: this,
                email: $(this).find('span').html().trim(),
                text: $(this).find('h3').html().trim()
            });
        });

        // Filter through all the items in the tempStudent Array
        function filter() {
            // Store the search results
            var query = this.value.trim().toLowerCase();

            // For all the student items
            tempStudent.forEach(function(name) {
                var index = 0;
                if (query) {
                    index = name.text.indexOf(query);
                }
                name.element.style.display = index === -1 ? 'none' : '';
            });
            if (query.length === 0) {
                $(students).hide().slice(0, 10).show();
            }
        }

        if ('oninput' in search[0]) {
            search.on('input', filter);
        } else {
            search.on('keyup', filter);
        }

    }());

})(jQuery);
