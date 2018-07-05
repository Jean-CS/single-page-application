window.addEventListener('load', () => {
  const el = $('#app');

  // Compile Handlebar Templates
  const errorTemplate = Handlebars.compile($('#error-template').html());
  const ratesTemplate = Handlebars.compile($('#rates-template').html());
  const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
  const historicalTemplate = Handlebars.compile($('#historical-template').html());

  // router declaration
  const router = new Router({ // Router declared in index.html scripts tag
    mode: 'history',
    page404: (path) => {
      const html = errorTemplate({
        color: 'yellow',
        title: 'Error 404 - Page NOT Found!',
        message: `The path '/${path}' does not exist on this site`
      });

      el.html(html);
    }
  });

  router.add('/', () => {
    let html = ratesTemplate();
    el.html(html);
  });

  router.add('/exchange', () => {
    let html = exchangeTemplate();
    el.html(html);
  });

  router.add('/historical', () => {
    let html = historicalTemplate();
    el.html(html);
  });

  // navigate app to current url
  router.navigateTo(window.location.pathname);

  // highlight active menu on refresh/page load
  const link =  $(`a[href$='${window.location.pathname}']`);
  link.addClass('active');

  $('a').on('click', (event) => {
    // block browser page load
    event.preventDefault();

    // highlight active menu on click
    const target = $(event.target);
    $('.item').removeClass('active');
    target.addClass('active');

    // navigate to clicked url
    const href = target.attr('href');
    const path = href.substr(href.lastIndexOf('/'));
    console.log(path);
    router.navigateTo(path);
  });

});
