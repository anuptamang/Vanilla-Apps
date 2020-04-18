const layout = require('../layout');

module.exports = ({ req }) => {
  return layout({
    content: `
      <div>
        <h2>Sign Up:</h2>
        <form method="POST">
          <input name="email" type="text" placeholder="email" />
          <input name="password" type="text" placeholder="password" />
          <input name="passwordConfirmation" type="text" placeholder="password confirmation" />
          <button>Submit</button>
        </form>
      </div>
    `,
  });
};
