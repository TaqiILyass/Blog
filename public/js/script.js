document.addEventListener('DOMContentLoaded', () => {

    // Fetch variables
    const allButtons = document.querySelectorAll('.searchBtn')
    const searchBar = document.querySelector('.searchBar')
    const searchInput = document.querySelectorAll('#searchInput')
    const searchClose = document.querySelector('#searchClose')

    // Loop on Search Button in header
    for (let i = 0; i < allButtons.length; i++) {

        // Add Class Open On Search Bar in search
        allButtons[i].addEventListener('click', (event) => {
          searchBar.style.visibility = 'visible';
          searchBar.classList.add('open');
          event.currentTarget.setAttribute('aria-expanded', 'true');
          searchInput[i].focus();
        });
      }

      // Remove Class OPen on Search Bar in search
      searchClose.addEventListener('click', (event) => {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        event.currentTarget.setAttribute('aria-expanded', 'false');
      });
      

})