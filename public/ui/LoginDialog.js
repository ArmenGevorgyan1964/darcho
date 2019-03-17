export class Application {
  constructor() {
    this.gotoLogin = this.gotoLogin.bind(this);
    this.gotoRegister = this.gotoRegister.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.container = document.body;
    this.loader = document.getElementById('root');
    this.loginDialog = new LoginDialog({
      parent: this.container,
      title: "Login",
      onLogin: this.doLogin,
      onRegister: this.gotoRegister
    });
    this.registerDialog = new RegisterDialog({
      parent: this.container,
      onRegister: this.doRegister,
      onLogin: this.gotoLogin
    });
  }

  start() {
    this.container.removeChild(this.loader);
    delete this.loader;
    this.loginDialog.show();
  }

  async doLogin(username, password) {
    let res = await fetch(`/elastic/darch/_doc/${username}`);
    let body = await res.json();
    if (body._source) {
      if (body._source.password === password) {
        console.info("DO LOGIN", username, password, body._source);
      } else {
        this.loginDialog.displayError('Invalid Password');
      }
    } else {
      this.loginDialog.displayError('User Not Found');
    }
  }

  doRegister(username, password) {
    console.info("DO REGISTER", username, password);
  }

  gotoLogin() {
    this.loginDialog.show();
    this.registerDialog.hide();
  }

  gotoRegister() {
    this.loginDialog.hide();
    this.registerDialog.show();
  }
}

export class LoginDialog {

  constructor(options) {

    this.container = options.parent;
    this.element = document.createElement('div');

    this.titleField = document.createElement('div');
    this.titleField.innerText = options.title || "Login Dialog";

    this.errorField = document.createElement('div');
    this.errorField.style.display = 'none';

    this.loginInput = document.createElement('input');
    this.loginInput.setAttribute('placeholder', 'Login');

    this.passwordInput = document.createElement('input');
    this.passwordInput.setAttribute('placeholder', 'Password');

    this.submitButton = document.createElement('button');
    this.submitButton.innerText = 'Login';

    this.registerButton = document.createElement('button');
    this.registerButton.innerText = 'Register';

    this.element.appendChild(this.titleField);
    this.element.appendChild(this.errorField);
    this.element.appendChild(this.loginInput);
    this.element.appendChild(this.passwordInput);
    this.element.appendChild(this.submitButton);
    this.element.appendChild(this.registerButton);
    this.submitButton.onclick = () => {
      this.clearError();
      options.onLogin(this.loginInput.value, this.passwordInput.value);
    };
    this.registerButton.onclick = () => {
      options.onRegister();
    }
  }

  displayError(message) {
    this.errorField.innerText = message;
    this.errorField.style.display = 'block';
  }

  clearError() {
    this.errorField.innerText = '';
    this.errorField.style.display = 'none';
  }

  show() {
    this.container.appendChild(this.element);
  }

  hide() {
    this.container.removeChild(this.element);
  }
}

export class RegisterDialog {
  constructor(options) {
    this.container = options.parent;
    this.element = document.createElement('div');

    this.titleField = document.createElement('div');
    this.titleField.innerText = "Register Dialog";

    this.loginInput = document.createElement('input');
    this.loginInput.setAttribute('placeholder', 'Login');

    this.passwordInput = document.createElement('input');
    this.passwordInput.setAttribute('placeholder', 'Password');

    this.submitButton = document.createElement('button');
    this.submitButton.innerText = 'Register';

    this.loginButton = document.createElement('button');
    this.loginButton.innerText = 'Login';

    this.element.appendChild(this.titleField);
    this.element.appendChild(this.loginInput);
    this.element.appendChild(this.passwordInput);
    this.element.appendChild(this.submitButton);
    this.element.appendChild(this.loginButton);

    this.submitButton.onclick = () => {
      options.onRegister(
        this.loginInput.value,
        this.passwordInput.value
      );
    };
    this.loginButton.onclick = () => {
      options.onLogin();
    }
  }

  show() {
    this.container.appendChild(this.element);
  }

  hide() {
    this.container.removeChild(this.element);
  }
}
