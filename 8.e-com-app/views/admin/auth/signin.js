const layout = require('../layout');

module.exports = () => {
  return layout({
    content: `
      <div>
        <h2>Sign in:</h2>
        <form method="POST">
          <input name="email" type="text" placeholder="email" />
          <input name="password" type="text" placeholder="password" />
          <button>Submit</button>
        </form>
      </div>
    `,
  });
};
