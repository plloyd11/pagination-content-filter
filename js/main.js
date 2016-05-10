// Since only 10 students should be shown at a time, your programming needs to
// calculate the number of pages needed and add the appropriate number of
// links to the bottom of the page.

$(document).ready(function() {
    var pagination = $('<div class="pagination"><ul></ul></div>');
    var studentsPerPage = 10;
    var studentsTotal = $('.student-item').length;
    var pagesNeeded = Math.ceil(studentsTotal / studentsPerPage);
    // Part 1: Pagination
      // Hide full student list
      $('.student-list').hide();
      // Add pagination to the bottom of page
      $('.page').append(pagination);
      // Create list items

      // Each page needs to show 10 students per page - perhaps a switch statement?
      // Page 6 will show 51 - 55
});
