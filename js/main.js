(function($) {
    // Content to be added in dynamically (Progressive Enhancement)
    var pagination = $('<div class="pagination"><ul></ul></div>');
    var searchBox = $('<div class="student-search"><input placeholder="Search for students..."><button>Restart Search</button></div>');
    var students = $('.student-list li').toArray(); // Array of students
    var currentPage = [];

    // Give focus to search input field automatically
    window.onload = function() {
        $('.student-search input').focus();
    }

    // Part 1: Pagination

    // Immediately add dyanmically generated content
    (function() {
        $('.page').append(pagination);
        $('.page-header').append(searchBox);
        // Hide all students in the array except for the initial 10
        $(students).hide().slice(0, 10).show();
    }());

    // Function to create proper number of pages based on total number of students
    function determinePages(array) {
        $(".pagination ul li").remove();
        var arrayLength = array.length;
        var studentsPerPage = 10;
        var pagesNeeded = Math.ceil(arrayLength / studentsPerPage);
        for (var i = 0; i < pagesNeeded; i++) {
            var navItems = '<li><a href=#> ' + (i + 1) + '</a></li>';
            $('.pagination ul').append(navItems);
        }
        // Add active class to first link in pagination
        $('.pagination').find('a').first().addClass('active');
    }
    determinePages(students);

    // Determine which list items to load
    function itemsOnPage(mainArray, currentArray, start, end) {
        currentArray = mainArray.slice(start, end);
        $(mainArray).hide();
        $(currentArray).fadeIn(500, 'swing');
    }

    // Add active class to pagination nav item
    function pagClick(active) {
        $('.pagination').find('a').removeClass('active');
        $(active).addClass('active');
    }

    // Bind 'active' class to click event handler
    function clickNav(array, newArray) {
        pagination.on('click', 'a', function(e) {
            e.preventDefault();
            // store reference of user click
            var clicked = e.target;
            // store number that corresponds to pagination nav item
            var filter = $(clicked).html();
            var studentsPerPage = 10;
            // Take number of pagination item clicked on and use that to start filter
            var startSlice = (filter * studentsPerPage) - studentsPerPage;
            // Take number of pagination item and add number of students per page
            var endSlice = startSlice + studentsPerPage;
            // Add active class to the page clicked
            pagClick(clicked);
            // Display current page items
            itemsOnPage(array, newArray, startSlice, endSlice);
        });
    }

    clickNav(students, currentPage);

    // Part 2: Search

    function searchPage() {
        var names = $('.student-item');
        var search = $('.student-search').find('input');
        students = [];

        // Loop through each students details & store container element, email address & name
        names.each(function() {
            students.push({
                element: this,
                email: $(this).find('span').html().trim(),
                text: $(this).find('h3').html().trim()
            });
        });
        // Filter through all the items in the new students array
        function filter() {
            // Store the search results in real time
            var query = this.value.trim().toLowerCase();
            var searchPag = [];

            // For all the student items
            students.forEach(function(name) {
                var index = 0;
                // If any character is typed into input field
                if (query) {
                    // Find the value of that character and give it to the index variable
                    index = name.text.indexOf(query);
                    index = name.email.indexOf(query);
                }
                // Hide all items that do not have matching characters
                if (index === -1) {
                    $(name.element).fadeOut(200).addClass('hide-results');
                } else {
                    // If the element contains a character typed into search field, show it
                    $(name.element).fadeIn(200).removeClass('hide-results');
                }
                // If the element does NOT have the class 'hide-results'
                if (!$(name.element).hasClass('hide-results')) {
                    // Push results to searchPag array
                    searchPag.push(name.element);
                    // If query is typed into search...
                    if (searchPag) {
                        $(searchPag).hide().slice(0, 10).show();
                        $('.student-list').find('li').filter('.hide-results').hide();
                        // Remove list elements from DOM that need to be hidden
                        $(pagination).find('a').addClass('remove-me');
                        $(pagination).find('a').attr('class', 'remove-me').parent().remove();
                        // Determine pages needed
                        determinePages(searchPag);
                        // Determinte what students to load on subsequent pages
                        clickNav(searchPag, students);
                    }
                }
                // If the search input is empty, show the first 10 results by default and reset active class
                if (query.length === 0) {
                    $(students).hide().slice(0, 10).show();
                    $('.pagination').find('a').removeClass('active');
                    $('.pagination').find('a').first().addClass('active');
                    location.reload();
                }
            });
            // IIFE for appending warning message if no results are found
            (function() {
                var hiding = $('.hide-results').length;
                var keepSearching = $('<div class="search-warning"><img src="img/warning.svg"><p>No matches found for ' + query + '.' + '<br>' + ' Please restart your search.</p></div>');
                if (hiding === students.length) {
                    $(pagination).hide();
                    $('.student-list').html(keepSearching);
                    (function() {
                        $('.student-search').on('click', 'button', function() {
                            location.reload();
                        });
                    }());
                }
            }());
            // Hide pagination if only one page
            if ($('.pagination ul li').length === 1) {
                $('.pagination').hide();
            }
        } // End filter function
        if ('oninput' in search[0]) {
            search.on('input', filter);
        } else {
            search.on('keyup', filter);
        }
    }
    searchPage();
})(jQuery);
