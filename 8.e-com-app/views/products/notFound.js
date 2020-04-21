const header = require('../layouts/header');
const footer = require('../layouts/footer');

module.exports = () => {
  const headerBlock = header();
  const footerBlock = footer();

  return `
      ${headerBlock}
      <section class="content has-text-centered">
        <div className="container">
        <h1>404 Error</h1>
        <h3>Page Not Found!</h3>
        </div>
      </section>  
      ${footerBlock}
    `;
};
