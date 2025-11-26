// === FUNCIONALIDADES DA TELA DE LOGIN ===

class LoginManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupPasswordToggle();
        this.setupModal();
        this.checkRememberMe();
    }

    setupEventListeners() {
        // Formulário de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Esqueci senha
        const forgotPasswordLink = document.getElementById('forgotPassword');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => this.showForgotPasswordModal(e));
        }

        // Modal de esqueci senha
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }

        // Botões sociais
        const googleBtn = document.querySelector('.google-btn');
        const microsoftBtn = document.querySelector('.microsoft-btn');
        
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.handleSocialLogin('google'));
        }
        
        if (microsoftBtn) {
            microsoftBtn.addEventListener('click', () => this.handleSocialLogin('microsoft'));
        }

        // Criar conta
        const signUpLink = document.getElementById('signUpLink');
        if (signUpLink) {
            signUpLink.addEventListener('click', (e) => this.handleSignUp(e));
        }

        // Fechar modal
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.hideForgotPasswordModal());
        }

        // Fechar modal clicando fora
        const modal = document.getElementById('forgotPasswordModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideForgotPasswordModal();
                }
            });
        }

        // Enter nos campos
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    passwordInput.focus();
                }
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleLogin(e);
                }
            });
        }
    }

    setupFormValidation() {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail());
            emailInput.addEventListener('input', () => this.clearFieldError(emailInput));
        }

        if (passwordInput) {
            passwordInput.addEventListener('blur', () => this.validatePassword());
            passwordInput.addEventListener('input', () => this.clearFieldError(passwordInput));
        }
    }

    setupPasswordToggle() {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');

        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                const icon = togglePassword.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-feather', type === 'password' ? 'eye' : 'eye-off');
                    feather.replace();
                }
            });
        }
    }

    setupModal() {
        // Modal já configurado nos event listeners
    }

    checkRememberMe() {
        const rememberMe = document.getElementById('rememberMe');
        const emailInput = document.getElementById('email');

        if (rememberMe && emailInput) {
            const savedEmail = localStorage.getItem('rememberedEmail');
            if (savedEmail) {
                emailInput.value = savedEmail;
                rememberMe.checked = true;
            }
        }
    }

    // === VALIDAÇÕES ===
    validateEmail() {
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showFieldError(emailInput, 'E-mail é obrigatório');
            return false;
        }

        if (!emailRegex.test(email)) {
            this.showFieldError(emailInput, 'E-mail inválido');
            return false;
        }

        this.clearFieldError(emailInput);
        return true;
    }

    validatePassword() {
        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;

        if (!password) {
            this.showFieldError(passwordInput, 'Senha é obrigatória');
            return false;
        }

        if (password.length < 6) {
            this.showFieldError(passwordInput, 'Senha deve ter pelo menos 6 caracteres');
            return false;
        }

        this.clearFieldError(passwordInput);
        return true;
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 12px;
            margin-top: 4px;
            animation: fadeIn 0.3s ease-out;
        `;

        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#ef4444';
        input.style.background = '#fef2f2';
    }

    clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        input.style.borderColor = '';
        input.style.background = '';
    }

    // === HANDLERS ===
    async handleLogin(e) {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const rememberMe = document.getElementById('rememberMe');
        const loginBtn = document.getElementById('loginBtn');

        // Validações
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            this.showNotification('Por favor, corrija os erros no formulário', 'error');
            return;
        }

        // Mostrar loading
        this.setLoadingState(loginBtn, true);

        try {
            // Simular autenticação (substituir por API real)
            const loginData = {
                email: emailInput.value.trim(),
                password: passwordInput.value
            };

            const result = await this.authenticateUser(loginData);

            if (result.success) {
                // Salvar dados se "lembrar de mim" estiver marcado
                if (rememberMe.checked) {
                    localStorage.setItem('rememberedEmail', loginData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                // Salvar token de autenticação
                localStorage.setItem('authToken', result.token);
                localStorage.setItem('userData', JSON.stringify(result.user));

                this.showNotification('Login realizado com sucesso!', 'success');
                
                // Redirecionar após um breve delay
                setTimeout(() => {
                    window.location.href = 'pages/dashboard.html';
                }, 1500);

            } else {
                this.showNotification(result.message || 'Credenciais inválidas', 'error');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            this.showNotification('Erro interno. Tente novamente.', 'error');
        } finally {
            this.setLoadingState(loginBtn, false);
        }
    }

    async authenticateUser(loginData) {
        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simular validação (substituir por chamada real à API)
        const validCredentials = {
            'admin@sistema.com': '123456',
            'user@sistema.com': '123456',
            'demo@sistema.com': 'demo123'
        };

        const { email, password } = loginData;

        if (validCredentials[email] && validCredentials[email] === password) {
            return {
                success: true,
                token: 'mock-jwt-token-' + Date.now(),
                user: {
                    id: 1,
                    name: email.split('@')[0],
                    email: email,
                    role: email === 'admin@sistema.com' ? 'admin' : 'user'
                }
            };
        } else {
            return {
                success: false,
                message: 'E-mail ou senha incorretos'
            };
        }
    }

    handleForgotPassword(e) {
        e.preventDefault();
        this.showForgotPasswordModal();
    }

    async handleForgotPassword(e) {
        e.preventDefault();

        const emailInput = document.getElementById('recoveryEmail');
        const email = emailInput.value.trim();

        if (!email) {
            this.showNotification('Por favor, digite seu e-mail', 'warning');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('E-mail inválido', 'error');
            return;
        }

        try {
            // Simular envio de email de recuperação
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showNotification('Instruções de recuperação enviadas para seu e-mail!', 'success');
            this.hideForgotPasswordModal();
            emailInput.value = '';

        } catch (error) {
            this.showNotification('Erro ao enviar e-mail. Tente novamente.', 'error');
        }
    }

    handleSocialLogin(provider) {
        this.showNotification(`Login com ${provider} em desenvolvimento`, 'info');
        
        // Aqui você implementaria a integração real com OAuth
        // Por exemplo: Google OAuth, Microsoft OAuth, etc.
    }

    handleSignUp(e) {
        e.preventDefault();
        this.showNotification('Funcionalidade de cadastro em desenvolvimento', 'info');
        
        // Aqui você redirecionaria para a página de cadastro
        // window.location.href = 'signup.html';
    }

    // === MODAL ===
    showForgotPasswordModal() {
        const modal = document.getElementById('forgotPasswordModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focar no campo de email
            setTimeout(() => {
                const emailInput = document.getElementById('recoveryEmail');
                if (emailInput) {
                    emailInput.focus();
                }
            }, 100);
        }
    }

    hideForgotPasswordModal() {
        const modal = document.getElementById('forgotPasswordModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // === UTILITÁRIOS ===
    setLoadingState(button, isLoading) {
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');

        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            button.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            button.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            success: 'check-circle',
            error: 'x-circle',
            warning: 'alert-triangle',
            info: 'info'
        };

        notification.innerHTML = `
            <i data-feather="${icons[type] || 'info'}"></i>
            <div class="notification-content">
                <div class="notification-title">${this.getNotificationTitle(type)}</div>
                <div class="notification-message">${message}</div>
            </div>
        `;

        container.appendChild(notification);
        feather.replace();

        // Auto remove após 5 segundos
        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    getNotificationTitle(type) {
        const titles = {
            success: 'Sucesso!',
            error: 'Erro!',
            warning: 'Atenção!',
            info: 'Informação'
        };
        return titles[type] || 'Notificação';
    }
}

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});

// === ANIMAÇÃO DE SAÍDA DA NOTIFICAÇÃO ===
const style = document.createElement('style');
style.textContent = `
    @keyframes notificationSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
