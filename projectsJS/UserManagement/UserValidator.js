export class UserValidator {
  constructor(fname, lname, email, password) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
  }
  // Static method to validate a name using a regular expression
  static validateName(name) {
    return /^[a-zA-Zא-ת]+$/.test(name);
  }
  // Static method to validate an email using a regular expression
  static validateEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  // Static method to validate a password
  static validatePassword(password) {
    return password.length > 5;
  }
  // Static method to validate a user object 
  static validateUser(user) {
    return (
      this.validateName(user.fname) &&
      this.validateName(user.lname) &&
      this.validateEmail(user.email) &&
      this.validatePassword(user.password)
    );
  }
}
