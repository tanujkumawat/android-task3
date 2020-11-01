// This code must be wrapped in an anonymous function which is done in JavaScriptDetector.kt to allow for dynamic changes before wrapping.

function loginFormDetected() {
    try {
        LoginDetection.loginDetected();
    } catch (error) {}
}

function inputVisible(input) {
    return !(input.offsetWidth === 0 && input.offsetHeight === 0) && !input.ariaHidden && !input.hidden && input.value !== "";
}

function checkIsLoginForm(form) {
    LoginDetection.log("checking form " + form);

    var inputs = form.getElementsByTagName("input");
    if (!inputs) {
        return;
    }

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs.item(i);
        if (input.type == "password" && inputVisible(input)) {
            LoginDetection.log("found password in form " + form);
            loginFormDetected();
            return true;
        }
    }

    LoginDetection.log("no password field in form " + form);
    return false;
}

function submitHandler(event) {
    checkIsLoginForm(event.target);
}

function scanForForms() {
    LoginDetection.log("Scanning for forms");

    var forms = document.forms;
    if (!forms || forms.length === 0) {
        LoginDetection.log("No forms found");
        return;
    }

    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        form.removeEventListener("submit", submitHandler);
        form.addEventListener("submit", submitHandler);
        LoginDetection.log("adding form handler " + i);
    }
}

function scanForPasswordField() {
    LoginDetection.log("Scanning for password");

    var forms = document.forms;
    if (!forms || forms.length === 0) {
        LoginDetection.log("No forms found");
        return;
    }

    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        var found = checkIsLoginForm(form);
        if (found) {
            return found;
        }
    }
}
