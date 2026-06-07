import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function loginForm(req, res) {
    res.render('auth/login')
}

export async function login(req, res) {
    const { email, password } = req.body;
    const mail = email.trim();
    const pass = password.trim();

    if (!mail || !pass) {
        res.status(400).render('auth/login', {
            alert: {
                status: "Error",
                text: "Complete todos los campos"
            },
            formValues: req.body
        })
        return
    }

    try {
        const user = await User.findOne({
            where: {
                email: mail
            }
        });
        if (!user) {
            res.status(400).render('auth/login', {
                alert: {
                    status: "error",
                    text: "Usuario o contrasena incorrecta."
                },
                formValues: req.body
            })
            return;
        }

        const isValidated = await bcrypt.compare(pass, user.passwordHash);

        if (!isValidated) {
            res.status(400).render('auth/login', {
                alert: {
                    status: "error",
                    text: "Usuario o contrasena incorrecta."
                },
                formValues: req.body
            })
            return;
        }

        req.session.user = {
            id: user.idUser,
        };

        res.redirect('/home')
    } catch (error) {
        console.log('[!] Error en login: ', error);
        res.status(500).render('auth/login', {
            alert: {
                status: "error",
                text: "Hubo un error al iniciar sesion"
            },
            formValues: req.body
        })
        return;
    }
}

export async function registerForm(req, res) {
    res.render('auth/register')
}

export async function register(req, res) {
    const { user, email, password, password2, lastName, name } = req.body;
    const userr = user.trim();
    const emaill = email.trim();
    const pass1 = password.trim();
    const pass2 = password2.trim();
    const lastNamee = lastName.trim();
    const namee = name.trim();

    if (!userr || !emaill || !pass1 || !pass2 || !lastNamee || !namee) {
        res.status(400).render('auth/register', {
            alert: {
                status: "Error",
                text: "Complete todos los campos"
            },
            formValues: req.body
        })
        return
    }

    if (pass1 !== pass2) {
        res.status(400).render('auth/register', {
            alert: {
                status: "Error",
                text: "Las contraseñas no coinciden."
            },
            formValues: req.body
        })
        return
    }

    try {
        const existEmail = await User.findOne({
            where: {
                email: emaill
            }
        });
        if (existEmail) {
            res.status(400).render('auth/register', {
                alert: {
                    status: "Error",
                    text: "El email ya está registrado. Intente ingresar sesión."
                },
                formValues: req.body
            })
            return;
        }

        const existUser = await User.findOne({
            where: {
                userName: userr
            }
        });

        if (existUser) {
            res.status(400).render('auth/register', {
                alert: {
                    status: "Error",
                    text: "El nombre de Usuario ya existe. Intente nuevamente."
                },
                formValues: req.body
            })
            return;
        }

        const passwordHash = await bcrypt.hash(pass1, 10);

        await User.create({
            userName: userr,
            name: namee,
            lastName: lastNamee,
            email: emaill,
            passwordHash,
        });
    } catch (error) {
        console.log('[!] Error en register: ', error);
        res.status(500).render('auth/register', {
            alert: {
                status: "Error",
                text: "Hubo un error al registrar usuario."
            },
            formValues: req.body
        })
        return;
    }

    res.redirect('/')
}

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};